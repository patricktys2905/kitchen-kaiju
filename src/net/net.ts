// Online play. Joining first tries a DIRECT link (WebRTC via PeerJS: fastest). If that can't open —
// many home routers and mobile networks block direct links between different networks — it falls back
// to the BACKUP ROUTE (public MQTT message server over a secure WebSocket: slower, works anywhere).
// The host listens on both at once. The free public PeerJS server only introduces devices.
import type { MqttClient } from 'mqtt';
import { Peer, type DataConnection } from 'peerjs';
import type { GameEvent, PlayerInput } from '../sim/world';
import { connectRelay, decode, encode, relayTopics } from './relay';
import type { Snapshot } from './snapshot';

const ID_PREFIX = 'kitchen-kaiju-room-';
const CODE_LETTERS = 'BCDFGHJKLMNPQRSTVWXZ'; // no vowels: no accidental words
export const MAX_GUESTS = 5; // host + 5 friends = 6 players
const DIRECT_WAIT_MS = 7000; // give the direct link this long before switching to the backup route
const SILENCE_MS = 8000; // no messages for this long = connection lost

export interface LobbySeat {
  who: 'host' | 'guest' | 'bot';
  guest?: number; // guest number (host-side id)
  name: string;
  species: number;
  route?: 'direct' | 'backup';
}

export type NetMsg =
  | { t: 'hello'; name: string }
  | { t: 'pick'; dir: number }
  | { t: 'lobby'; seats: LobbySeat[]; you: number; table: number; difficulty: string; rounds?: number }
  | { t: 'start'; species: number[]; names: string[]; seat: number; tables: number[] | null; rounds?: number }
  | { t: 'in'; i: PlayerInput }
  | { t: 'snap'; s: Snapshot; ev: GameEvent[] }
  | { t: 'ping' }
  | { t: 'bye'; reason: string };

/** For testing: ?net=backup forces friends onto the backup route. */
const FORCE_BACKUP = typeof location !== 'undefined' && new URLSearchParams(location.search).get('net') === 'backup';

export function makeCode(): string {
  return Array.from({ length: 4 }, () => CODE_LETTERS[Math.floor(Math.random() * CODE_LETTERS.length)]).join('');
}

function peerErrorType(e: unknown): string | undefined {
  return (e as { type?: string })?.type;
}

/** One connected friend, over either route. */
interface Channel {
  route: 'direct' | 'backup';
  send(m: NetMsg): void;
  close(): void;
  lastHeard: number;
}

/** Host side: owns the room, collects friends' inputs, broadcasts snapshots. */
export class NetHost {
  peer: Peer | null = null;
  relay: MqttClient | null = null;
  code = '';
  private chans = new Map<number, Channel>();
  private relayIds = new Map<string, number>(); // backup-route guest id -> guest number
  private nextGuest = 1;
  private inputs = new Map<number, PlayerInput>();
  private watchdog = 0;
  private directReady = false;
  private backupReady = false;
  onGuestJoin: (guest: number, name: string, route: 'direct' | 'backup') => void = () => {};
  onGuestLeave: (guest: number) => void = () => {};
  onPick: (guest: number, dir: number) => void = () => {};
  onStatus: (text: string, ok: boolean) => void = () => {};

  open(): void {
    this.code = makeCode();
    this.openDirect();
    this.openBackup();
    this.watchdog = window.setInterval(() => this.checkSilence(), 1000);
  }

  private reportReady(): void {
    if (this.directReady || this.backupReady) this.onStatus(`Room ${this.code} is open. Share the code!`, true);
  }

  private openDirect(): void {
    const peer = new Peer(ID_PREFIX + this.code);
    this.peer = peer;
    peer.on('open', () => { this.directReady = true; this.reportReady(); });
    peer.on('error', e => {
      if (peerErrorType(e) === 'unavailable-id') { peer.destroy(); this.relay?.end(true); clearInterval(this.watchdog); this.open(); return; }
      if (!this.backupReady) this.onStatus('Direct links unavailable here; friends will use the backup route.', true);
    });
    peer.on('connection', conn => {
      let g = 0;
      const chan: Channel = { route: 'direct', send: m => { if (conn.open) conn.send(m); }, close: () => conn.close(), lastHeard: Date.now() };
      conn.on('data', raw => {
        chan.lastHeard = Date.now();
        const m = raw as NetMsg;
        if (m.t === 'hello' && !g) {
          if (this.chans.size >= MAX_GUESTS) { chan.send({ t: 'bye', reason: 'Room is full.' }); setTimeout(() => conn.close(), 300); return; }
          g = this.nextGuest++;
          this.chans.set(g, chan);
          this.onGuestJoin(g, (m.name || 'Friend').slice(0, 12), 'direct');
        } else if (g) this.handle(g, m);
      });
      const gone = () => { if (g) this.drop(g); };
      conn.on('close', gone);
      conn.on('error', gone);
    });
  }

  private openBackup(): void {
    const code = this.code;
    connectRelay().then(client => {
      if (this.code !== code) { client.end(true); return; } // room was re-made meanwhile
      this.relay = client;
      client.subscribe(relayTopics.toHost(code), { qos: 0 }, () => { this.backupReady = true; this.reportReady(); });
      client.on('message', (_t, buf) => {
        const env = decode<{ from: string; m: NetMsg }>(buf);
        if (!env?.from || !env.m) return;
        let g = this.relayIds.get(env.from);
        if (env.m.t === 'hello' && g === undefined) {
          const topic = relayTopics.toGuest(code, env.from);
          if (this.chans.size >= MAX_GUESTS) { client.publish(topic, encode({ t: 'bye', reason: 'Room is full.' })); return; }
          g = this.nextGuest++;
          this.relayIds.set(env.from, g);
          this.chans.set(g, { route: 'backup', send: m => client.publish(topic, encode(m)), close: () => {}, lastHeard: Date.now() });
          this.onGuestJoin(g, (env.m.name || 'Friend').slice(0, 12), 'backup');
          return;
        }
        if (g === undefined) return;
        const chan = this.chans.get(g);
        if (chan) chan.lastHeard = Date.now();
        this.handle(g, env.m);
      });
    }).catch(() => { if (!this.directReady) this.onStatus('Could not reach the online servers. Check your internet connection.', false); });
  }

  private handle(g: number, m: NetMsg): void {
    if (m.t === 'in') this.inputs.set(g, m.i);
    else if (m.t === 'pick') this.onPick(g, m.dir);
    else if (m.t === 'bye') this.drop(g);
  }

  private drop(g: number): void {
    if (!this.chans.delete(g)) return;
    this.inputs.delete(g);
    for (const [id, n] of this.relayIds) if (n === g) this.relayIds.delete(id);
    this.onGuestLeave(g);
  }

  private checkSilence(): void {
    const now = Date.now();
    for (const [g, c] of this.chans) {
      c.send({ t: 'ping' });
      if (now - c.lastHeard > SILENCE_MS) this.drop(g);
    }
  }

  get guestCount(): number {
    return this.chans.size;
  }
  /** Any friend on the backup route? (the host then sends a little less often) */
  get hasBackupGuests(): boolean {
    for (const c of this.chans.values()) if (c.route === 'backup') return true;
    return false;
  }
  routeOf(g: number): 'direct' | 'backup' | undefined {
    return this.chans.get(g)?.route;
  }
  isConnected(g: number): boolean {
    return this.chans.has(g);
  }
  inputOf(g: number): PlayerInput | undefined {
    return this.inputs.get(g);
  }
  send(g: number, m: NetMsg): void {
    this.chans.get(g)?.send(m);
  }
  broadcast(m: NetMsg): void {
    for (const c of this.chans.values()) c.send(m);
  }
  close(): void {
    this.broadcast({ t: 'bye', reason: 'The host left the game.' });
    clearInterval(this.watchdog);
    const peer = this.peer, relay = this.relay;
    setTimeout(() => { peer?.destroy(); relay?.end(true); }, 300);
    this.chans.clear();
    this.relayIds.clear();
    this.directReady = this.backupReady = false;
  }
}

/** Guest side: joins by room code, sends inputs, receives snapshots. */
export class NetGuest {
  private peer: Peer | null = null;
  private conn: DataConnection | null = null;
  private relay: MqttClient | null = null;
  private relayId = '';
  private code = '';
  private name = '';
  route: 'direct' | 'backup' | null = null;
  private lastHeard = 0;
  private watchdog = 0;
  private directTimer = 0;
  private done = false;
  onMsg: (m: NetMsg) => void = () => {};
  onStatus: (text: string, ok: boolean) => void = () => {};
  onClosed: (reason: string) => void = () => {};

  join(code: string, name: string): void {
    this.code = code.toUpperCase();
    this.name = name;
    this.onStatus(`Looking up room ${this.code}…`, true);
    if (FORCE_BACKUP) { this.useBackup('test'); return; }
    const peer = new Peer();
    this.peer = peer;
    peer.on('error', e => {
      if (peerErrorType(e) === 'peer-unavailable') { this.fail('Room not found. Check the code with your host (and that their game is still on the Online screen).'); return; }
      if (!this.route) this.useBackup('error'); // matchmaking unreachable or direct link failed
    });
    peer.on('open', () => {
      this.onStatus('Found the matchmaking server. Connecting to the host…', true);
      const conn = peer.connect(ID_PREFIX + this.code, { reliable: true });
      this.conn = conn;
      this.directTimer = window.setTimeout(() => { if (!this.route) this.useBackup('timeout'); }, DIRECT_WAIT_MS);
      conn.on('open', () => {
        if (this.route) { conn.close(); return; }
        clearTimeout(this.directTimer);
        this.route = 'direct';
        conn.send({ t: 'hello', name } satisfies NetMsg);
        this.connected();
      });
      conn.on('data', raw => { if (this.route === 'direct') this.receive(raw as NetMsg); });
      conn.on('close', () => { if (this.route === 'direct' && !this.done) this.lost('Lost connection to the host.'); });
      conn.on('error', () => { if (!this.route) this.useBackup('error'); });
    });
  }

  private useBackup(why: string): void {
    if (this.route || this.done) return;
    this.route = 'backup';
    clearTimeout(this.directTimer);
    try { this.conn?.close(); this.peer?.destroy(); } catch { /* ignore */ }
    this.onStatus(why === 'test' ? 'Connecting through the backup route…' : 'Your network blocks direct links, so switching to the backup route…', true);
    this.relayId = Math.random().toString(36).slice(2, 10);
    connectRelay().then(client => {
      if (this.done) { client.end(true); return; }
      this.relay = client;
      client.subscribe(relayTopics.toGuest(this.code, this.relayId), { qos: 0 }, () => {
        client.on('message', (_t, buf) => { const m = decode<NetMsg>(buf); if (m) this.receive(m); });
        this.send({ t: 'hello', name: this.name });
        // the host answers with the lobby; no answer means the room isn't open
        window.setTimeout(() => { if (!this.lastHeard && !this.done) this.fail(`No answer from room ${this.code}. Check the code, and that the host's game is still on the Online screen.`); }, 9000);
      });
    }).catch(() => this.fail('Could not reach the online servers. Check your internet connection.'));
  }

  private connected(): void {
    this.lastHeard = Date.now();
    this.onStatus(this.route === 'direct' ? 'Connected! Waiting for the host to start…' : 'Connected through the backup route (a bit slower). Waiting for the host to start…', true);
    clearInterval(this.watchdog);
    this.watchdog = window.setInterval(() => {
      this.send({ t: 'ping' });
      if (this.lastHeard && Date.now() - this.lastHeard > SILENCE_MS) this.lost('Lost connection to the host.');
    }, 1000);
  }

  private receive(m: NetMsg): void {
    const first = !this.lastHeard;
    this.lastHeard = Date.now();
    if (first && this.route === 'backup') this.connected();
    if (m.t === 'bye') { this.done = true; this.cleanup(); this.onClosed(m.reason); return; }
    if (m.t === 'ping') return;
    this.onMsg(m);
  }

  private fail(reason: string): void {
    if (this.done) return;
    this.done = true;
    this.cleanup();
    this.onStatus(reason, false);
    this.onClosed(reason);
  }

  private lost(reason: string): void {
    if (this.done) return;
    this.done = true;
    this.cleanup();
    this.onClosed(reason);
  }

  private cleanup(): void {
    clearInterval(this.watchdog);
    clearTimeout(this.directTimer);
    const conn = this.conn, peer = this.peer, relay = this.relay;
    setTimeout(() => { try { conn?.close(); peer?.destroy(); relay?.end(true); } catch { /* ignore */ } }, 200);
  }

  send(m: NetMsg): void {
    if (this.route === 'direct' && this.conn?.open) this.conn.send(m);
    else if (this.route === 'backup' && this.relay?.connected) this.relay.publish(relayTopics.toHost(this.code), encode({ from: this.relayId, m }));
  }

  close(): void {
    if (this.done) return;
    this.send({ t: 'bye', reason: 'left' });
    this.done = true;
    this.cleanup();
  }
}
