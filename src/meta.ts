// 🪙 Long-term progression: Chef Tokens, per-kaiju Mastery, Weekly Orders, the Pantry shop and the post-match receipt.
// EASY TO CUSTOMISE: every number lives in META, MASTERY, ORDERS and SHOP below. Saved on this device ('kk-meta-v1').

export const META = {
  tokens: { play: 5, win: 10, perKo: 1, perKaiju: 2, perWave: 4, dailyBronze: 10, dailySilver: 20, dailyGold: 40, order: 40, masteryLevel: 25 },
};

/** Mastery XP per match with a kaiju, and the XP needed to REACH each level (index = level - 1). */
export const MASTERY = {
  xp: { play: 10, win: 15, perKo: 3, perKaiju: 5, perRound: 4 },
  levels: [0, 60, 160, 320, 560, 900], // Lv 1 … Lv 6 (max)
  titles: ['Rookie', 'Line Cook', 'Sous Chef', 'Head Chef', 'Master Chef', 'Legend'],
};

export type OrderStat = 'kos' | 'kaiju' | 'crumbs' | 'wins' | 'spoonWins' | 'waves' | 'parries' | 'partyWins' | 'kaijuUsed' | 'storyClears';
export interface OrderDef { id: string; text: string; stat: OrderStat; goal: number }
/** The pool Weekly Orders are drawn from (3 per week, same for everyone). */
export const ORDERS: OrderDef[] = [
  { id: 'ko20', text: 'Knock out 20 rivals', stat: 'kos', goal: 20 },
  { id: 'kaiju8', text: 'Go KAIJU 8 times', stat: 'kaiju', goal: 8 },
  { id: 'crumbs150', text: 'Eat 150 crumbs', stat: 'crumbs', goal: 150 },
  { id: 'wins5', text: 'Win 5 matches', stat: 'wins', goal: 5 },
  { id: 'spoon2', text: 'Win 2 Golden Spoon matches', stat: 'spoonWins', goal: 2 },
  { id: 'waves8', text: 'Clear 8 Gauntlet waves', stat: 'waves', goal: 8 },
  { id: 'parry5', text: 'Parry 5 throws (swipe them back)', stat: 'parries', goal: 5 },
  { id: 'party3', text: 'Win 3 Party Mode matches', stat: 'partyWins', goal: 3 },
  { id: 'variety', text: 'Win with 4 different kaiju', stat: 'kaijuUsed', goal: 4 },
  { id: 'story3', text: 'Clear 3 Story chapters', stat: 'storyClears', goal: 3 },
];

export interface ShopItem { id: string; name: string; desc: string; cost: number; kind: 'colour' | 'perk' }
/** 🛒 The Pantry: spend Chef Tokens. Colours here are extra styles (see COLOURS unlock 'shop:<id>'). */
export const SHOP: ShopItem[] = [
  { id: 'peach', name: '🍑 Peach colour', desc: 'A soft peach style for every kaiju', cost: 120, kind: 'colour' },
  { id: 'berry', name: '🫐 Blueberry colour', desc: 'Deep berry blue', cost: 180, kind: 'colour' },
  { id: 'matcha', name: '🍵 Matcha colour', desc: 'Calm green tea', cost: 240, kind: 'colour' },
  { id: 'chrome', name: '🥄 Silverware colour', desc: 'Shiny cutlery chrome', cost: 400, kind: 'colour' },
  { id: 'lunchbox', name: '🍱 Lunchbox', desc: 'Gauntlet runs start with a free perk', cost: 250, kind: 'perk' },
  { id: 'lifeline', name: '❤ Lifeline', desc: 'Gauntlet runs start with +1 life', cost: 350, kind: 'perk' },
];

export interface MetaSave {
  tokens: number; earned: number;
  xp: Record<number, number>; // species → mastery XP
  week: string; orders: Record<string, number>; done: string[]; // this week's order progress
  kaijuWonThisWeek: number[];
  owned: string[]; // shop item ids
  dailyMedal: { date: string; medal: number }; // 0 none, 1 bronze, 2 silver, 3 gold
}
const KEY = 'kk-meta-v1';
const blank = (): MetaSave => ({ tokens: 0, earned: 0, xp: {}, week: '', orders: {}, done: [], kaijuWonThisWeek: [], owned: [], dailyMedal: { date: '', medal: 0 } });
export function loadMeta(): MetaSave {
  try { return { ...blank(), ...(JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<MetaSave>) }; } catch { return blank(); }
}
export function saveMeta(m: MetaSave): void { try { localStorage.setItem(KEY, JSON.stringify(m)); } catch { /* blocked */ } }

// ---------------------------------------------------------------- mastery
export function masteryLevel(xp: number): number { let l = 1; MASTERY.levels.forEach((need, i) => { if (xp >= need) l = i + 1; }); return l; }
export function masteryInfo(xp: number): { level: number; title: string; into: number; need: number | null } {
  const level = masteryLevel(xp), next = MASTERY.levels[level];
  return { level, title: MASTERY.titles[level - 1], into: xp - MASTERY.levels[level - 1], need: next === undefined ? null : next - MASTERY.levels[level - 1] };
}
export const masteryStars = (level: number) => '★'.repeat(Math.max(0, level)) + '☆'.repeat(Math.max(0, MASTERY.levels.length - level));

// ---------------------------------------------------------------- weekly orders
/** ISO-ish week key (Monday start), local time. */
export function weekKey(d = new Date()): string {
  const m = new Date(d.getFullYear(), d.getMonth(), d.getDate()); m.setDate(m.getDate() - ((m.getDay() + 6) % 7));
  return `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-${String(m.getDate()).padStart(2, '0')}`;
}
export function weeklyOrders(week = weekKey()): OrderDef[] {
  let h = [...week].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 11);
  const pool = ORDERS.slice(), out: OrderDef[] = [];
  while (out.length < 3 && pool.length) { h = (h * 1103515245 + 12345) >>> 0; out.push(pool.splice(h % pool.length, 1)[0]); }
  return out;
}
function rollWeek(m: MetaSave): void { const wk = weekKey(); if (m.week !== wk) Object.assign(m, { week: wk, orders: {}, done: [], kaijuWonThisWeek: [] }); }

// ---------------------------------------------------------------- the match receipt
export interface MatchSummary {
  species: number; won: boolean; kos: number; kaijus: number; crumbs: number; roundsWon: number; parries: number;
  mode: string; party: boolean; waves?: number; storyClear?: boolean; daily?: { won: boolean; flawless: boolean; date: string };
}
export interface Receipt {
  tokens: number; total: number; xp: number; species: number;
  level: number; levelUp: boolean; into: number; need: number | null;
  ordersDone: string[]; medal?: number; lines: string[];
}

/** Records one finished match for the human seat and returns what moved (for the results screen). */
export function recordMatch(s: MatchSummary): Receipt {
  const m = loadMeta(); rollWeek(m);
  const T = META.tokens, X = MASTERY.xp;
  let tokens = T.play + (s.won ? T.win : 0) + s.kos * T.perKo + s.kaijus * T.perKaiju + (s.waves ?? 0) * T.perWave;
  const xp = X.play + (s.won ? X.win : 0) + s.kos * X.perKo + s.kaijus * X.perKaiju + s.roundsWon * X.perRound;
  const before = masteryLevel(m.xp[s.species] ?? 0);
  m.xp[s.species] = (m.xp[s.species] ?? 0) + xp;
  const info = masteryInfo(m.xp[s.species]);
  const levelUp = info.level > before;
  if (levelUp) tokens += T.masteryLevel * (info.level - 1);
  // weekly orders
  const add = (k: OrderStat, n: number) => { if (n > 0) m.orders[k] = (m.orders[k] ?? 0) + n; };
  add('kos', s.kos); add('kaiju', s.kaijus); add('crumbs', s.crumbs); add('parries', s.parries); add('waves', s.waves ?? 0);
  if (s.won) { add('wins', 1); if (s.mode === 'goldenSpoon') add('spoonWins', 1); if (s.party) add('partyWins', 1); if (!m.kaijuWonThisWeek.includes(s.species)) m.kaijuWonThisWeek.push(s.species); }
  m.orders.kaijuUsed = m.kaijuWonThisWeek.length;
  if (s.storyClear) add('storyClears', 1);
  const ordersDone: string[] = [];
  for (const o of weeklyOrders(m.week)) if (!m.done.includes(o.id) && (m.orders[o.stat] ?? 0) >= o.goal) { m.done.push(o.id); ordersDone.push(o.text); tokens += T.order; }
  // daily medal: bronze = played, silver = won, gold = won without losing a round
  let medal: number | undefined;
  if (s.daily) {
    medal = s.daily.won ? (s.daily.flawless ? 3 : 2) : 1;
    const prev = m.dailyMedal.date === s.daily.date ? m.dailyMedal.medal : 0;
    if (medal > prev) { tokens += [0, T.dailyBronze, T.dailySilver, T.dailyGold].slice(prev + 1, medal + 1).reduce((a, b) => a + b, 0); m.dailyMedal = { date: s.daily.date, medal }; }
  }
  m.tokens += tokens; m.earned += tokens;
  saveMeta(m);
  const lines = [`🪙 +${tokens} Chef Tokens (${m.tokens})`, `${levelUp ? '⬆ ' : ''}Mastery Lv ${info.level} ${info.title}${info.need ? ` · ${info.into}/${info.need} XP` : ' · MAX'}`];
  for (const o of ordersDone) lines.push(`📋 Order done: ${o}`);
  if (medal) lines.push(`${['', '🥉 Bronze', '🥈 Silver', '🥇 Gold'][medal]} daily medal`);
  return { tokens, total: m.tokens, xp, species: s.species, level: info.level, levelUp, into: info.into, need: info.need, ordersDone, medal, lines };
}

// ---------------------------------------------------------------- the Pantry
export const shopOwned = (id: string): boolean => loadMeta().owned.includes(id);
export function buy(id: string): boolean {
  const m = loadMeta(), item = SHOP.find(s => s.id === id);
  if (!item || m.owned.includes(id) || m.tokens < item.cost) return false;
  m.tokens -= item.cost; m.owned.push(id); saveMeta(m); return true;
}

/** 🎓 Chef Rank: one number from achievements + total mastery (shown in Records). */
export function chefRank(achieved: number): { rank: number; title: string } {
  const m = loadMeta(), mastery = Object.values(m.xp).reduce((a, x) => a + masteryLevel(x) - 1, 0);
  const pts = achieved * 2 + mastery;
  const titles = ['Dishwasher', 'Prep Cook', 'Line Cook', 'Sous Chef', 'Head Chef', 'Executive Chef', 'Kitchen Kaiju'];
  const rank = Math.min(titles.length - 1, Math.floor(pts / 12));
  return { rank: pts, title: titles[rank] };
}
