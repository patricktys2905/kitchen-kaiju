// Online lobby: host a room (4-letter code) or join one. HTML panel on top of the canvas so typing a
// code works the same on phones and computers.
import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps, consumeTap, type Slot } from '../input';
import { MAX_GUESTS, NetGuest, NetHost, type LobbySeat, type NetMsg } from '../net/net';
import { hasArt } from '../render/art';
import { drawFloor } from '../render/draw';
import { DIFFICULTIES, type Difficulty } from '../sim/bot';
import { DEFAULT_ROUNDS, ROUND_CHOICES, SPECIES } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { setTouchMode } from '../touch';
import { playMusic } from '../music';
import { owned, type Owned } from '../story/unlocks';
import { enabledModes, modeDef, type GameMode } from '../sim/modes';
import { POWERUPS } from '../sim/powerups';
import { currentHat } from '../hats';
import { currentColour, lookOf } from '../colours';
import { cupGames } from '../cup';
import qrcode from 'qrcode-generator';

/** Link that opens the game and joins room `code` straight away (shown as a QR code to the host). */
export function joinLink(code: string): string {
  return `${location.origin}${location.pathname}?join=${code}`;
}

function qrDataUrl(text: string): string {
  const q = qrcode(0, 'M');
  q.addData(text);
  q.make();
  return q.createDataURL(5, 2);
}
import { enabledMutators, mutatorDef, type Mutator } from '../sim/mutators';

const CSS = `
#lobby { position: fixed; inset: 0; z-index: 15; display: flex; align-items: center; justify-content: center; font-family: Nunito, Arial, sans-serif; font-weight: 800; color: #f1e4d2; }
#lobby .panel { background: #2a1408f2; border: 4px solid #ffcf8a; border-radius: 24px; padding: 22px 30px; width: min(720px, 92vw); max-height: 92vh; overflow: auto; box-shadow: 0 10px 0 #140b05; }
#lobby h1 { font-family: 'Luckiest Guy', 'Arial Black', sans-serif; font-weight: 400; letter-spacing: 0.04em; color: #ffb347; margin: 0 0 6px; font-size: 40px; text-shadow: 0 4px 0 #140b05; }
#lobby p { margin: 6px 0; line-height: 1.4; }
#lobby .muted { color: #cdb9a3; font-weight: 700; font-size: 15px; }
#lobby .row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 14px; align-items: center; }
#lobby button { font-family: 'Luckiest Guy', 'Arial Black', sans-serif; font-weight: 400; letter-spacing: 0.04em; font-size: 18px; padding: 9px 16px; border-radius: 14px;
  border: 3px solid #ffcf8a; background: #3a1f0e; color: #ffe9c7; cursor: pointer; }
#lobby button.go { background: #ff9a3c; color: #2a1408; }
#lobby button:disabled { opacity: 0.4; cursor: default; }
#lobby input { font-family: 'Luckiest Guy', 'Arial Black', sans-serif; font-size: 34px; letter-spacing: 0.3em; width: 7em; text-transform: uppercase; text-align: center;
  padding: 8px; border-radius: 12px; border: 3px solid #ffcf8a; background: #fff3dc; color: #2a1408; }
#lobby input.name { font-size: 20px; letter-spacing: 0.02em; width: 9em; font-family: Nunito, Arial, sans-serif; font-weight: 800; }
#lobby .code { font-family: 'Luckiest Guy', 'Arial Black', sans-serif; font-size: 64px; letter-spacing: 0.25em; color: #fff3dc; text-shadow: 0 5px 0 #140b05; margin: 4px 0; }
#lobby .seat { display: flex; align-items: center; gap: 12px; padding: 8px 12px; margin-top: 8px; border-radius: 14px; background: #0006; border: 3px solid transparent; }
#lobby .seat img { width: 46px; height: 46px; object-fit: contain; }
#lobby .seat .k { font-family: 'Luckiest Guy', 'Arial Black', sans-serif; font-size: 22px; flex: 1; }
#lobby .seat .who { color: #cdb9a3; font-size: 15px; }
#lobby .seat button { font-size: 16px; padding: 6px 12px; }
#lobby .status { margin-top: 12px; font-size: 16px; }
#lobby .status.bad { color: #ff8a7a; }

#lobby .coderow { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
#lobby .qr { display: flex; align-items: center; gap: 12px; }
#lobby .qr img { width: 96px; height: 96px; image-rendering: pixelated; border-radius: 8px; background: #fff; }
#lobby .qr span { font-size: 15px; opacity: 0.85; max-width: 180px; text-align: left; }
`;

export class LobbyScene extends Phaser.Scene {
  private root: HTMLElement | null = null;
  private host: NetHost | null = null;
  private guest: NetGuest | null = null;
  private seats: LobbySeat[] = [];
  private mySeat = 0;
  private table = -1;
  private difficulty: Difficulty = 'normal';
  private rounds = DEFAULT_ROUNDS;
  private mode: GameMode = 'classic';
  private powerups = POWERUPS.enabled;
  private hazards = true;
  private mutator: Mutator = 'none';
  private cup = false; // 🏆 play a Party Cup instead of one match
  private tvMode = false; // 📺 the host screen only shows the game; everyone plays on their own phone
  private own: Owned = { kaiju: [], tables: [] }; // the HOST's unlocks apply to the whole room
  private fillTo: 0 | 4 | 6 = 4; // bots fill empty seats up to this many players (0 = no bots)
  private status = '';
  private statusOk = true;
  private view: 'choose' | 'host' | 'join' = 'choose';
  private leaving = false;

  constructor() {
    super('lobby');
  }

  init(data: { difficulty?: Difficulty; rounds?: number }): void {
    this.difficulty = data.difficulty ?? 'normal';
    this.rounds = data.rounds ?? DEFAULT_ROUNDS;
    this.own = owned();
    this.own.tables = this.own.tables.filter(i => !LAYOUTS[i]?.custom); // custom tables are local-only
    this.view = 'choose';
    this.host = this.guest = null;
    this.seats = [];
    this.status = '';
    this.leaving = false;
  }

  create(): void {
    clearTaps();
    setTouchMode('off');
    playMusic('menu');
    const g = this.add.graphics();
    if (hasArt('bg-menu')) this.add.image(640, 360, 'bg-menu').setDisplaySize(1280, 720).setDepth(-2);
    else drawFloor(g);
    g.fillStyle(0x0d0805, 0.55).fillRect(0, 0, 1280, 720);
    if (!document.getElementById('lobby-css')) {
      const st = document.createElement('style');
      st.id = 'lobby-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    this.root = document.createElement('div');
    this.root.id = 'lobby';
    document.body.appendChild(this.root);
    this.events.once('shutdown', () => { this.root?.remove(); this.root = null; });
    this.render();
    // opened from a QR code / join link: go straight into the room
    const join = new URLSearchParams(location.search).get('join');
    if (join && /^[A-Za-z]{4}$/.test(join) && !this.registry.get('joinedFromLink')) {
      this.registry.set('joinedFromLink', true);
      history.replaceState(null, '', location.pathname);
      this.view = 'join';
      this.joinRoom(join.toUpperCase(), localStorage.getItem('kk-name') ?? '');
    }
  }

  update(): void {
    if (consumeTap('Escape')) this.back();
    clearTaps();
  }

  // ---------------------------------------------------------------- actions
  private back(): void {
    if (this.leaving) return;
    this.leaving = true;
    this.host?.close();
    this.guest?.close();
    this.scene.start('title');
  }

  private startHosting(): void {
    const host = new NetHost();
    this.host = host;
    this.view = 'host';
    this.mySeat = 0;
    this.seats = [{ who: 'host', name: 'You (host)', species: 0, hat: lookOf(currentHat().id, currentColour().id) }];
    host.onStatus = (t, ok) => { this.status = t; this.statusOk = ok; this.render(); };
    host.onGuestJoin = (g, name, route, hat) => {
      const free = this.own.kaiju.filter(k => !this.seats.some(s => s.species === k));
      this.seats.push({ who: 'guest', guest: g, name, species: free[0] ?? 0, route, hat });
      sfx.join(this.seats.length);
      this.syncLobby();
    };
    host.onGuestLeave = g => { this.seats = this.seats.filter(s => s.guest !== g); sfx.leave(); this.syncLobby(); };
    host.onPick = (g, dir) => { const i = this.seats.findIndex(s => s.guest === g); if (i >= 0) this.cycle(i, dir); };
    this.status = 'Opening a room…';
    host.open();
    this.render();
  }

  private joinRoom(code: string, name: string): void {
    if (!/^[A-Z]{4}$/i.test(code)) { this.status = 'Room codes are 4 letters.'; this.statusOk = false; this.render(); return; }
    localStorage.setItem('kk-name', name);
    this.guest?.close();
    const guest = new NetGuest();
    guest.hat = lookOf(currentHat().id, currentColour().id);
    this.guest = guest;
    guest.onStatus = (t, ok) => { this.status = t; this.statusOk = ok; this.render(); };
    guest.onClosed = reason => { this.status = reason; this.statusOk = false; this.seats = []; this.guest = null; this.render(); };
    guest.onMsg = (m: NetMsg) => {
      if (m.t === 'lobby') { this.seats = m.seats; this.mySeat = m.you; this.table = m.table; this.difficulty = m.difficulty as Difficulty; this.rounds = m.rounds ?? DEFAULT_ROUNDS; this.mode = (m.mode as GameMode) ?? 'classic'; this.powerups = m.powerups ?? false; this.hazards = m.hazards ?? true; this.mutator = (m.mutator as Mutator) ?? 'none'; this.render(); }
      if (m.t === 'start') this.launchGuest(m);
    };
    guest.join(code, name || 'Friend');
  }

  private cycle(i: number, dir: number): void {
    const taken = new Set(this.seats.filter((_, k) => k !== i).map(s => s.species));
    const list = this.own.kaiju;
    let at = list.indexOf(this.seats[i].species);
    for (let n = 0; n < list.length; n++) {
      at = (at + dir + list.length) % list.length;
      if (!taken.has(list[at])) break;
    }
    this.seats[i].species = list[at] ?? this.seats[i].species;
    sfx.pickup();
    this.syncLobby();
  }

  /** Host: tell every guest the current lobby (each sees their own seat). */
  private syncLobby(): void {
    if (!this.host) return;
    this.seats.forEach((s, i) => {
      if (s.who === 'guest' && s.guest !== undefined) this.host!.send(s.guest, { t: 'lobby', seats: this.seats, you: i, table: this.table, difficulty: this.difficulty, rounds: this.rounds, mode: this.mode, powerups: this.powerups, hazards: this.hazards, mutator: this.mutator });
    });
    this.render();
  }

  private startMatch(): void {
    const host = this.host;
    if (!host) return;
    const seats = this.tvMode ? this.seats.filter(s => s.who !== 'host') : this.seats.slice();
    const target = Math.max(2, seats.length, this.fillTo);
    while (seats.length < target) {
      const free = this.own.kaiju.filter(k => !seats.some(s => s.species === k));
      seats.push({ who: 'bot', name: 'Bot', species: free[Math.floor(Math.random() * free.length)] });
    }
    const g0 = this.cup ? cupGames(seats.length)[0] : null;
    const mode = g0 ? g0.mode : this.mode, rounds = g0 ? g0.rounds : this.rounds, cup = g0 ? { game: 0, points: [] as number[] } : undefined;
    const species = seats.map(s => s.species);
    const names = seats.map(s => s.name);
    const tables = this.table < 0 ? this.own.tables.slice() : [this.table];
    seats.forEach((s, i) => { if (s.who === 'guest' && s.guest !== undefined) host.send(s.guest, { t: 'start', species, names, seat: i, tables, rounds, mode, powerups: this.powerups, hazards: this.hazards, mutator: this.mutator, hats: seats.map(s => s.hat ?? ''), cup }); });
    const slots: Slot[] = seats.map(s => (s.who === 'host' ? { kind: 'local', index: 0 } : s.who === 'guest' ? { kind: 'remote', index: s.guest! } : { kind: 'bot', index: 0 }));
    this.leaving = true;
    this.scene.start('game', { slots, difficulty: this.difficulty, species, tables, rounds, mode, powerups: this.powerups, hazards: this.hazards, mutator: this.mutator, hats: seats.map(s => s.hat ?? ''), cup, net: { role: 'host', host } });
  }

  private launchGuest(m: Extract<NetMsg, { t: 'start' }>): void {
    if (!this.guest) return;
    const slots: Slot[] = m.species.map((_, i) => (i === m.seat ? { kind: 'local', index: 0 } : { kind: 'remote', index: i }));
    this.leaving = true;
    this.scene.start('game', { slots, difficulty: this.difficulty, species: m.species, tables: m.tables, rounds: m.rounds, mode: m.mode as GameMode | undefined, powerups: m.powerups, hazards: m.hazards, mutator: m.mutator as Mutator | undefined, hats: m.hats, cup: m.cup, net: { role: 'guest', guest: this.guest, seat: m.seat } });
  }

  // ---------------------------------------------------------------- UI
  private render(): void {
    const root = this.root;
    if (!root) return;
    const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
    const statusHtml = this.status ? `<div class="status ${this.statusOk ? '' : 'bad'}">${esc(this.status)}</div>` : '';
    const seatsHtml = this.seats.map((s, i) => {
      const sp = SPECIES[s.species];
      const mine = i === this.mySeat || (this.host && s.who === 'host');
      const img = `art/kaiju-${s.species}.webp`;
      return `<div class="seat" style="border-color:${sp.css}">
        <img src="${img}" alt="">
        <div class="k" style="color:${sp.css}">${sp.full}<div class="who">${esc(s.name)}${mine ? ' (you)' : ''}${this.tvMode && s.who === 'host' ? ' · 📺 watching, not playing' : ''}${s.route === 'backup' ? ' · backup route (slower)' : s.route === 'direct' ? ' · direct link' : ''}</div></div>
        ${mine ? `<button data-pick="-1">◀</button><button data-pick="1">▶</button>` : ''}
      </div>`;
    }).join('');
    let html = '';
    if (this.view === 'choose') {
      html = `<h1>Play online</h1>
        <p>Play with friends on their own phones or computers, from anywhere. One person hosts and shares a 4-letter room code.</p>
        <p class="muted">Uses a free public matchmaking server to connect you; the game itself goes directly between your devices.</p>
        <div class="row"><button class="go" data-act="host">Host a game</button><button data-act="joinview">Join a game</button><button data-act="back">Back</button></div>`;
    } else if (this.view === 'host') {
      const tl = this.table < 0 ? `All ${this.own.tables.length} (rotate)` : LAYOUTS[this.table].name;
      const guests = this.seats.filter(s => s.who === 'guest').length;
      html = `<h1>Your room</h1>
        <div class="coderow"><div class="code">${this.host?.code || '····'}</div>${this.host?.code ? `<div class="qr"><img alt="QR code to join" src="${qrDataUrl(joinLink(this.host.code))}"><span>Scan with a phone camera to join</span></div>` : ''}</div>
        <p class="muted">Friends tap ONLINE → Join a game and type this code. Up to ${MAX_GUESTS} friends.</p>
        ${seatsHtml}
        <div class="row">
          <button data-act="bots">${this.fillTo ? `Bots fill up to ${this.fillTo} players` : 'No bots'}</button>
          <button data-act="diff">Bots: ${this.difficulty}</button>
          <button data-act="table">Table: ${esc(tl)}</button>
          <button data-act="rounds">First to ${this.rounds} round${this.rounds === 1 ? '' : 's'}</button>
          <button data-act="mode">Mode: ${modeDef(this.mode).name}</button>
          <button data-act="powerups">Power-ups: ${this.powerups ? 'ON' : 'OFF'}</button>
          <button data-act="hazards">Hazards: ${this.hazards ? 'ON' : 'OFF'}</button>
          <button data-act="mutator">Twist: ${mutatorDef(this.mutator).name}</button>
          <button data-act="cup">${this.cup ? '🏆 Party Cup: ON' : '🏆 Party Cup: OFF'}</button>
          <button data-act="tv">${this.tvMode ? '📺 TV mode: ON (you just watch)' : '📺 TV mode: OFF (you play too)'}</button>
        </div>
        <p class="muted">${esc(modeDef(this.mode).blurb)}</p>
        <div class="row"><button class="go" data-act="start" ${guests ? '' : 'disabled'}>Start match</button><button data-act="back">Close room</button></div>
        ${guests ? '' : '<p class="muted">Waiting for at least one friend to join…</p>'}
        ${statusHtml}`;
    } else {
      const saved = localStorage.getItem('kk-name') ?? '';
      html = this.seats.length
        ? `<h1>You're in!</h1>${seatsHtml}<p class="muted">Pick your kaiju with ◀ ▶. The host starts the match · ${modeDef(this.mode).name} · first to ${this.rounds} round${this.rounds === 1 ? '' : 's'} · power-ups ${this.powerups ? 'on' : 'off'}.</p>${statusHtml}
           <div class="row"><button data-act="back">Leave</button></div>`
        : `<h1>Join a game</h1>
           <p>Room code from your host:</p>
           <div class="row"><input id="lb-code" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABCD">
             <input id="lb-name" class="name" maxlength="12" placeholder="Your name" value="${esc(saved)}"></div>
           <div class="row"><button class="go" data-act="join">Join</button><button data-act="back">Back</button></div>${statusHtml}`;
    }
    root.innerHTML = `<div class="panel">${html}</div>`;
    root.querySelectorAll<HTMLButtonElement>('button[data-act]').forEach(b => b.addEventListener('click', () => this.act(b.dataset.act!)));
    root.querySelectorAll<HTMLButtonElement>('button[data-pick]').forEach(b => b.addEventListener('click', () => {
      const dir = Number(b.dataset.pick);
      if (this.host) this.cycle(this.mySeat, dir);
      else this.guest?.send({ t: 'pick', dir });
    }));
    const code = root.querySelector<HTMLInputElement>('#lb-code');
    code?.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') this.act('join'); });
    root.querySelector<HTMLInputElement>('#lb-name')?.addEventListener('keydown', e => e.stopPropagation());
  }

  private act(a: string): void {
    sfx.pickup();
    if (a === 'back') { this.back(); return; }
    if (a === 'host') this.startHosting();
    if (a === 'joinview') { this.view = 'join'; this.status = ''; this.render(); setTimeout(() => this.root?.querySelector<HTMLInputElement>('#lb-code')?.focus(), 50); }
    if (a === 'join') {
      const code = (this.root?.querySelector<HTMLInputElement>('#lb-code')?.value ?? '').trim().toUpperCase();
      const name = (this.root?.querySelector<HTMLInputElement>('#lb-name')?.value ?? '').trim();
      this.joinRoom(code, name);
    }
    if (a === 'bots') { this.fillTo = this.fillTo === 4 ? 6 : this.fillTo === 6 ? 0 : 4; this.render(); }
    if (a === 'diff') { this.difficulty = DIFFICULTIES[(DIFFICULTIES.indexOf(this.difficulty) + 1) % DIFFICULTIES.length]; this.syncLobby(); }
    if (a === 'rounds') { this.rounds = ROUND_CHOICES[(ROUND_CHOICES.indexOf(this.rounds) + 1) % ROUND_CHOICES.length] ?? DEFAULT_ROUNDS; this.syncLobby(); }
    if (a === 'table') { const later = this.own.tables.filter(t => t > this.table); this.table = later.length ? later[0] : -1; this.syncLobby(); }
    if (a === 'mode') { const list = enabledModes().map(m => m.id); this.mode = list[(list.indexOf(this.mode) + 1) % list.length] ?? 'classic'; this.syncLobby(); }
    if (a === 'powerups') { this.powerups = !this.powerups; this.syncLobby(); }
    if (a === 'hazards') { this.hazards = !this.hazards; this.syncLobby(); }
    if (a === 'tv') { this.tvMode = !this.tvMode; this.render(); }
    if (a === 'cup') { this.cup = !this.cup; this.render(); }
    if (a === 'mutator') { const l = enabledMutators().map(m => m.id); this.mutator = l[(l.indexOf(this.mutator) + 1) % l.length] ?? 'none'; this.syncLobby(); }
    if (a === 'start') this.startMatch();
  }
}
