// Online play over WebRTC (PeerJS). The free public PeerJS server only introduces devices to each
// other ("matchmaking"); game data then flows directly between the host and each friend.
import { Peer, type DataConnection } from 'peerjs';
import type { GameEvent, PlayerInput } from '../sim/world';
import type { Snapshot } from './snapshot';

const ID_PREFIX = 'kitchen-kaiju-room-';
const CODE_LETTERS = 'BCDFGHJKLMNPQRSTVWXZ'; // no vowels: no accidental words
export const MAX_GUESTS = 3;

export interface LobbySeat {
  who: 'host' | 'guest' | 'bot';
  guest?: number; // guest number (host-side id)
  name: string;
  species: number;
}

export type NetMsg =
  | { t: 'hello'; name: string }
  | { t: 'pick'; dir: number }
  | { t: 'lobby'; seats: LobbySeat[]; you: number; table: number; difficulty: string }
  | { t: 'start'; species: number[]; names: string[]; seat: number; tables: number[] | null }
  | { t: 'in'; i: PlayerInput }
  | { t: 'snap'; s: Snapshot; ev: GameEvent[] }
  | { t: 'bye'; reason: string };

export function makeCode(): string {
  return Array.from({ length: 4 }, () => CODE_LETTERS[Math.floor(Math.random() * CODE_LETTERS.length)]).join('');
}

function errorText(e: unknown): string {
  const type = (e as { type?: string })?.type;
  if (type === 'peer-unavailable') return 'Room not found. Check the code with your host.';
  if (type === 'unavailable-id') return 'That room code is taken, trying another…';
  if (type === 'network' || type === 'server-error' || type === 'socket-error' || type === 'socket-closed') return 'Could not reach the matchmaking server. Check your internet connection.';
  if (type === 'browser-incompatible') return 'This browser does not support online play.';
  return 'Connection problem: ' + (type ?? String(e));
}

/** Host side: owns the room, collects friends' inputs, broadcasts snapshots. */
export class NetHost {
  peer: Peer | null = null;
  code = '';
  private conns = new Map<number, DataConnection>();
  private nextGuest = 1;
  private inputs = new Map<number, PlayerInput>();
  onGuestJoin: (guest: number, name: string) => void = () => {};
  onGuestLeave: (guest: number) => void = () => {};
  onPick: (guest: number, dir: number) => void = () => {};
  onStatus: (text: string, ok: boolean) => void = () => {};

  open(): void {
    this.code = makeCode();
    const peer = new Peer(ID_PREFIX + this.code);
    this.peer = peer;
    peer.on('open', () => this.onStatus(`Room ${this.code} is open. Share the code!`, true));
    peer.on('error', e => {
      if ((e as { type?: string }).type === 'unavailable-id') { peer.destroy(); this.open(); return; }
      this.onStatus(errorText(e), false);
    });
    peer.on('connection', conn => {
      if (this.conns.size >= MAX_GUESTS) { conn.on('open', () => { conn.send({ t: 'bye', reason: 'Room is full.' }); setTimeout(() => conn.close(), 300); }); return; }
      const g = this.nextGuest++;
      conn.on('data', raw => {
        const m = raw as NetMsg;
        if (m.t === 'hello') { this.conns.set(g, conn); this.onGuestJoin(g, (m.name || 'Friend').slice(0, 12)); }
        else if (m.t === 'in') this.inputs.set(g, m.i);
        else if (m.t === 'pick') this.onPick(g, m.dir);
      });
      const gone = () => { if (this.conns.delete(g)) { this.inputs.delete(g); this.onGuestLeave(g); } };
      conn.on('close', gone);
      conn.on('error', gone);
    });
  }

  get guestCount(): number {
    return this.conns.size;
  }
  isConnected(g: number): boolean {
    return this.conns.has(g);
  }
  inputOf(g: number): PlayerInput | undefined {
    return this.inputs.get(g);
  }
  send(g: number, m: NetMsg): void {
    const c = this.conns.get(g);
    if (c?.open) c.send(m);
  }
  broadcast(m: NetMsg): void {
    for (const c of this.conns.values()) if (c.open) c.send(m);
  }
  close(): void {
    this.broadcast({ t: 'bye', reason: 'The host left the game.' });
    setTimeout(() => this.peer?.destroy(), 200);
    this.conns.clear();
  }
}

/** Guest side: connects to a room code, sends inputs, receives snapshots. */
export class NetGuest {
  peer: Peer | null = null;
  conn: DataConnection | null = null;
  onMsg: (m: NetMsg) => void = () => {};
  onStatus: (text: string, ok: boolean) => void = () => {};
  onClosed: (reason: string) => void = () => {};
  private closedByUs = false;

  join(code: string, name: string): void {
    const peer = new Peer();
    this.peer = peer;
    this.onStatus('Connecting…', true);
    peer.on('error', e => this.onStatus(errorText(e), false));
    peer.on('open', () => {
      const conn = peer.connect(ID_PREFIX + code.toUpperCase(), { reliable: true });
      this.conn = conn;
      conn.on('open', () => { conn.send({ t: 'hello', name } satisfies NetMsg); this.onStatus('Connected! Waiting for the host to start…', true); });
      conn.on('data', raw => {
        const m = raw as NetMsg;
        if (m.t === 'bye') { this.closedByUs = true; this.onClosed(m.reason); return; }
        this.onMsg(m);
      });
      conn.on('close', () => { if (!this.closedByUs) this.onClosed('Lost connection to the host.'); });
    });
  }

  send(m: NetMsg): void {
    if (this.conn?.open) this.conn.send(m);
  }
  close(): void {
    this.closedByUs = true;
    this.conn?.close();
    setTimeout(() => this.peer?.destroy(), 200);
  }
}
