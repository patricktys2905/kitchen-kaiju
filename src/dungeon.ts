// 🗝 DINNER DUNGEON: a roguelike run through three courses of rooms.
// Pick a path on the map, fight bot rooms one life at a time, collect relics that change how your kaiju plays,
// spend coins in the shop, rest to heal, beat the boss of each course. Lose all your lives and the run is over.
// The run is saved after every room, so you can leave and CONTINUE later. EASY TO CUSTOMISE: DUNGEON + RELICS.
import type { CutleryKind } from './sim/cutlery';
import type { Difficulty } from './sim/bot';

export type RoomKind = 'fight' | 'elite' | 'treasure' | 'shop' | 'rest' | 'boss';

export interface Room { id: number; col: number; row: number; rows: number; kind: RoomKind; next: number[] }

export interface DungeonRun {
  seed: number;
  pick: number; // your kaiju
  floor: number; // 0..2
  rooms: Room[]; // this floor's map
  at: number | null; // the room you last cleared (null = the floor's start)
  lives: number;
  coins: number;
  relics: string[];
  kos: number;
  cleared: number; // fights won this run
  shop?: { offers: string[]; bought: string[]; healed: boolean }; // the shop you're standing in
  treasure?: string[]; // relic choices you're picking from
  over?: 'won' | 'lost';
  pending?: number; // the fight room you walked into (still set = you closed the game mid-fight: it counts as lost)
}

export const DUNGEON = {
  floors: ['🥗 STARTER', '🍖 MAIN COURSE', '🍰 DESSERT'],
  cols: 6, // columns of rooms per floor; the last is the boss
  lives: 3,
  maxLives: 5,
  coins: { fight: 12, elite: 30, boss: 50, ko: 3 },
  prices: { relic: 45, heal: 30 },
  tokens: { floor: 40, win: 200 }, // 🪙 paid out when the run ends
  // bot rooms by floor: rival levels (one entry per rival)
  fights: [['easy', 'normal'], ['normal', 'normal', 'tough'], ['tough', 'tough', 'hard']] as Difficulty[][],
  elites: [['normal', 'tough', 'tough'], ['tough', 'hard', 'hard'], ['hard', 'hard', 'brutal']] as Difficulty[][],
  bosses: [['tough', 'normal'], ['hard', 'tough'], ['brutal', 'hard', 'tough']] as Difficulty[][], // first seat is the 👑 boss
};

export const ROOM_INFO: Record<RoomKind, { icon: string; name: string; desc: string }> = {
  fight: { icon: '⚔', name: 'FIGHT', desc: 'Bots. One life. Win for coins.' },
  elite: { icon: '💀', name: 'ELITE', desc: 'Tougher bots and a twist. Win a relic and big coins.' },
  treasure: { icon: '🎁', name: 'PANTRY', desc: 'Pick one of three relics. Free!' },
  shop: { icon: '🛒', name: 'SHOP', desc: 'Spend coins on relics or a life.' },
  rest: { icon: '🍲', name: 'SOUP BREAK', desc: 'Get one life back.' },
  boss: { icon: '👑', name: 'BOSS', desc: 'The head chef of this course.' },
};

/** What a relic can change. Applied to your kaiju at the start of every room. */
export interface RelicFx {
  speed?: number; throwSpeed?: number; dashCD?: number; weight?: number; grip?: number; reach?: number; // kaiju traits (multipliers; reach is +px)
  belly?: number; shield?: boolean; ghost?: number; hot?: boolean; sugar?: boolean; // start-of-room boosts
  cutlery?: CutleryKind; // start holding this
  coinMult?: number; koCoins?: number; bossHeal?: boolean; // run economy
}
export interface Relic { id: string; name: string; desc: string; fx: RelicFx }

export const RELICS: Relic[] = [
  { id: 'boots', name: '🧈 Butter Boots', desc: 'Move 12% faster', fx: { speed: 1.12 } },
  { id: 'arm', name: '💪 Pitching Arm', desc: 'Throw 18% faster', fx: { throwSpeed: 1.18 } },
  { id: 'claws', name: '🦞 Long Claws', desc: 'Longer swipe reach', fx: { reach: 12 } },
  { id: 'soda', name: '🥤 Fizzy Soda', desc: 'Dash recharges 30% faster', fx: { dashCD: 0.7 } },
  { id: 'gravy', name: '⚓ Heavy Gravy', desc: 'Much harder to shove', fx: { weight: 0.75 } },
  { id: 'mitts', name: '🧤 Oven Mitts', desc: 'No sliding on slippery tables', fx: { grip: 1.8 } },
  { id: 'breakfast', name: '🍪 Second Breakfast', desc: 'Start each room 40% to KAIJU', fx: { belly: 40 } },
  { id: 'mustard', name: '🟡 Mustard Coat', desc: 'A shield blocks the first hit in each room', fx: { shield: true } },
  { id: 'ghost', name: '👻 Ghost Pepper', desc: 'Untouchable for the first 3 s of each room', fx: { ghost: 3 } },
  { id: 'hotfeet', name: '🌶️ Hot Feet', desc: 'A burst of speed at the start of each room', fx: { hot: true } },
  { id: 'sugar', name: '🍬 Sugar Rush', desc: 'Dash and swipe recharge fast in each room', fx: { sugar: true } },
  { id: 'holster', name: '🍢 Skewer Holster', desc: 'Start each room holding a Skewer (goes through props)', fx: { cutlery: 'skewer' } },
  { id: 'scoopbelt', name: '🍨 Scoop Belt', desc: 'Start each room holding an Ice Cream Scoop (lobbed splat)', fx: { cutlery: 'scoop' } },
  { id: 'whisky', name: '🥄 Whisk Wrist', desc: 'Start each room holding a Whisk (curves)', fx: { cutlery: 'whisk' } },
  { id: 'piggy', name: '🐷 Piggy Bank', desc: '+50% coins from rooms', fx: { coinMult: 1.5 } },
  { id: 'magnet', name: '🧲 Crumb Magnet', desc: '+5 coins for every knockout', fx: { koCoins: 5 } },
  { id: 'doggybag', name: '🥡 Doggy Bag', desc: 'Get a life back after every boss', fx: { bossHeal: true } },
];
export const relic = (id: string): Relic | undefined => RELICS.find(r => r.id === id);

/** All relic effects added up (multipliers multiply, the rest add or switch on). */
export function relicFx(ids: string[]): RelicFx {
  const out: RelicFx = {};
  for (const id of ids) {
    const fx = relic(id)?.fx;
    if (!fx) continue;
    for (const k of ['speed', 'throwSpeed', 'dashCD', 'weight', 'grip', 'coinMult'] as const) if (fx[k]) out[k] = (out[k] ?? 1) * fx[k]!;
    for (const k of ['reach', 'belly', 'ghost', 'koCoins'] as const) if (fx[k]) out[k] = (out[k] ?? 0) + fx[k]!;
    for (const k of ['shield', 'hot', 'sugar', 'bossHeal'] as const) if (fx[k]) out[k] = true;
    if (fx.cutlery) out.cutlery = fx.cutlery; // the newest holster wins
  }
  return out;
}

// ---------------------------------------------------------------- map
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Builds one floor: columns of 2-3 rooms, each joined to 1-2 rooms in the next column, ending at the boss. */
export function makeFloor(seed: number, floor: number): Room[] {
  const r = rng(seed * 31 + floor * 977 + 1);
  const rooms: Room[] = [];
  const cols: Room[][] = [];
  for (let c = 0; c < DUNGEON.cols; c++) {
    const n = c === DUNGEON.cols - 1 ? 1 : c === 0 ? 2 : r() < 0.5 ? 2 : 3;
    const col: Room[] = [];
    for (let i = 0; i < n; i++) {
      let kind: RoomKind = 'fight';
      if (c === DUNGEON.cols - 1) kind = 'boss';
      else if (c > 0) { const x = r(); kind = x < 0.42 ? 'fight' : x < 0.62 ? 'elite' : x < 0.74 ? 'treasure' : x < 0.87 ? 'shop' : 'rest'; }
      const room: Room = { id: rooms.length, col: c, row: i, rows: n, kind, next: [] };
      rooms.push(room); col.push(room);
    }
    cols.push(col);
  }
  // guarantees: a pantry mid-floor, a soup break or shop right before the boss
  const mid = cols[2], pre = cols[DUNGEON.cols - 2];
  if (!mid.some(x => x.kind === 'treasure')) mid[Math.floor(r() * mid.length)].kind = 'treasure';
  if (!pre.some(x => x.kind === 'rest' || x.kind === 'shop')) pre[Math.floor(r() * pre.length)].kind = floor % 2 ? 'shop' : 'rest';
  if (!cols[1].some(x => x.kind === 'fight')) cols[1][0].kind = 'fight';
  // paths: each room goes to the nearest room(s) below it; every room has a way in
  for (let c = 0; c < DUNGEON.cols - 1; c++) {
    const a = cols[c], b = cols[c + 1];
    const pos = (x: Room) => (x.row + 0.5) / x.rows;
    for (const x of a) {
      const sorted = b.slice().sort((p, q) => Math.abs(pos(p) - pos(x)) - Math.abs(pos(q) - pos(x)));
      x.next.push(sorted[0].id);
      if (sorted[1] && r() < 0.45) x.next.push(sorted[1].id);
    }
    for (const y of b) if (!a.some(x => x.next.includes(y.id))) a.slice().sort((p, q) => Math.abs(pos(p) - pos(y)) - Math.abs(pos(q) - pos(y)))[0].next.push(y.id);
  }
  return rooms;
}

/** Rooms you can enter now. */
export function openRooms(run: DungeonRun): Room[] {
  if (run.over) return [];
  if (run.at === null) return run.rooms.filter(x => x.col === 0);
  const from = run.rooms[run.at];
  return from.next.map(id => run.rooms[id]);
}

export function newRun(pick: number, seed = Math.floor(Math.random() * 1e9)): DungeonRun {
  return { seed, pick, floor: 0, rooms: makeFloor(seed, 0), at: null, lives: DUNGEON.lives, coins: 0, relics: [], kos: 0, cleared: 0 };
}

/** Three relics you don't have yet (seeded by where you are, so reloading can't reroll them). */
export function relicChoices(run: DungeonRun, salt: number, n = 3): string[] {
  const r = rng(run.seed + run.floor * 101 + salt * 7919);
  const pool = RELICS.map(x => x.id).filter(id => !run.relics.includes(id));
  const out: string[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(r() * pool.length), 1)[0]);
  return out;
}

/** Coins for winning a room. */
export function roomCoins(run: DungeonRun, kind: RoomKind, kos: number): number {
  const fx = relicFx(run.relics);
  const base = kind === 'boss' ? DUNGEON.coins.boss : kind === 'elite' ? DUNGEON.coins.elite : DUNGEON.coins.fight;
  return Math.round(base * (fx.coinMult ?? 1)) + kos * (DUNGEON.coins.ko + (fx.koCoins ?? 0));
}

/** You finished a fight room. Returns a line for the map. */
export function finishFight(run: DungeonRun, roomId: number, won: boolean, kos: number): string {
  const room = run.rooms[roomId];
  run.kos += kos;
  if (!won) {
    run.lives--;
    if (run.lives <= 0) { run.over = 'lost'; return '💀 Out of lives. The kitchen wins this time.'; }
    return `💔 Lost the room. ${run.lives} ${run.lives === 1 ? 'life' : 'lives'} left. Try a different path?`;
  }
  run.cleared++;
  run.at = roomId;
  const coins = roomCoins(run, room.kind, kos);
  run.coins += coins;
  let line = `✅ Room cleared! +${coins} 🪙`;
  if (room.kind === 'elite') { run.treasure = relicChoices(run, roomId + 50); line += ' · 💀 Elite: pick a relic!'; }
  if (room.kind === 'boss') {
    if (relicFx(run.relics).bossHeal && run.lives < DUNGEON.maxLives) { run.lives++; line += ' · 🥡 +1 life'; }
    if (run.floor >= DUNGEON.floors.length - 1) { run.over = 'won'; return `🏆 DINNER DUNGEON CLEARED! +${coins} 🪙`; }
    run.floor++;
    run.rooms = makeFloor(run.seed, run.floor);
    run.at = null;
    line = `👑 Boss beaten! On to ${DUNGEON.floors[run.floor]}. +${coins} 🪙`;
  }
  return line;
}

/** Enter a non-fight room (pantry / shop / soup break). */
export function enterRoom(run: DungeonRun, roomId: number): string {
  const room = run.rooms[roomId];
  run.at = roomId;
  if (room.kind === 'treasure') { run.treasure = relicChoices(run, roomId); return '🎁 The pantry! Pick one relic.'; }
  if (room.kind === 'shop') { run.shop = { offers: relicChoices(run, roomId + 20), bought: [], healed: false }; return '🛒 The shop is open.'; }
  if (room.kind === 'rest') { const before = run.lives; run.lives = Math.min(DUNGEON.maxLives, run.lives + 1); return run.lives > before ? '🍲 Soup break: +1 life.' : '🍲 Soup break: you were already full.'; }
  return '';
}

export function takeRelic(run: DungeonRun, id: string): void {
  if (!run.relics.includes(id)) run.relics.push(id);
  run.treasure = undefined;
}

export function buy(run: DungeonRun, what: string): boolean {
  if (!run.shop) return false;
  if (what === 'heal') {
    if (run.shop.healed || run.coins < DUNGEON.prices.heal || run.lives >= DUNGEON.maxLives) return false;
    run.coins -= DUNGEON.prices.heal; run.lives++; run.shop.healed = true; return true;
  }
  if (run.shop.bought.includes(what) || !run.shop.offers.includes(what) || run.coins < DUNGEON.prices.relic) return false;
  run.coins -= DUNGEON.prices.relic; run.shop.bought.push(what); run.relics.push(what); return true;
}

/** 🪙 Tokens for the whole run (paid once when it ends). */
export const runTokens = (run: DungeonRun): number => run.floor * DUNGEON.tokens.floor + (run.over === 'won' ? DUNGEON.tokens.win : 0) + run.cleared * 5;

/** The bots for a fight room: levels per rival, and which seat is the boss. */
export function roomFoes(run: DungeonRun, kind: RoomKind): { levels: Difficulty[]; boss: boolean; twist: boolean } {
  const f = Math.min(2, run.floor);
  if (kind === 'boss') return { levels: DUNGEON.bosses[f], boss: true, twist: false };
  if (kind === 'elite') return { levels: DUNGEON.elites[f], boss: false, twist: true };
  return { levels: DUNGEON.fights[f], boss: false, twist: false };
}

// ---------------------------------------------------------------- save
const KEY = 'kk-dungeon-v1';
const BEST = 'kk-dungeon-best';
export function loadRun(): DungeonRun | null { try { const s = JSON.parse(localStorage.getItem(KEY) ?? 'null') as DungeonRun | null; return s && !s.over ? s : null; } catch { return null; } }
export function saveRun(run: DungeonRun | null): void { try { if (run && !run.over) localStorage.setItem(KEY, JSON.stringify(run)); else localStorage.removeItem(KEY); } catch { /* blocked */ } }
/** Best result: floors reached (3 = cleared). */
export const dungeonBest = (): number => Number(localStorage.getItem(BEST) ?? 0) || 0;
export function saveDungeonBest(run: DungeonRun): boolean {
  const v = run.over === 'won' ? DUNGEON.floors.length : run.floor;
  if (v <= dungeonBest()) return false;
  try { localStorage.setItem(BEST, String(v)); } catch { /* blocked */ }
  return true;
}
