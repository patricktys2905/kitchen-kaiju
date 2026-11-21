// 👥 Daily Friend Board: no server needed. Everyone plays the same Daily, copies a result line (📋 COPY MY RESULT),
// and friends paste each other's lines here; the board ranks today's group. Kept on this device, per day.
// EASY TO CUSTOMISE: score() decides the ranking.

export interface FriendResult { name: string; date: string; won: boolean; medal: number; best: number; streak: number; spicy: boolean; you?: boolean }

const KEY = 'kk-daily-friends';
const MEDALS = ['', '🥉', '🥈', '🥇'];

/** Your name on shared lines (the same one Online uses). */
export function playerName(): string { try { return (localStorage.getItem('kk-name') ?? '').trim(); } catch { return ''; } }
export function setPlayerName(n: string): void { try { localStorage.setItem('kk-name', n.trim().slice(0, 14)); } catch { /* blocked */ } }

/** The line 📋 COPY MY RESULT puts on the clipboard (and the board reads back). */
export function resultLine(r: Omit<FriendResult, 'you'>, mode: string, week: string): string {
  return `🍴 Kitchen Kaiju Daily ${r.date} · ${r.name || 'Chef'} (${mode}): ${r.won ? 'WON' : 'not won yet'} ${MEDALS[r.medal] ?? ''} · best ${r.best} rounds · 🔥${r.streak}${r.spicy ? ' · 🌶️ SPICY beaten' : ''} · last 7: ${week}`;
}

/** Reads a pasted line back (null if it isn't one). */
export function parseLine(line: string): FriendResult | null {
  const m = line.match(/Kitchen Kaiju Daily (\d{4}-\d{2}-\d{2}) · (.+?) \(.*?\): (WON|not won yet|not played)\s*(🥉|🥈|🥇)?.*?best (\d+) rounds.*?🔥(\d+)/);
  if (!m) return null;
  return { date: m[1], name: m[2].slice(0, 14), won: m[3] === 'WON', medal: MEDALS.indexOf(m[4] ?? ''), best: Number(m[5]), streak: Number(m[6]), spicy: /SPICY beaten/.test(line) };
}

export function loadFriends(date: string): FriendResult[] {
  try { const s = JSON.parse(localStorage.getItem(KEY) ?? '{}') as { date?: string; list?: FriendResult[] }; return s.date === date ? s.list ?? [] : []; } catch { return []; }
}
function saveFriends(date: string, list: FriendResult[]): void { try { localStorage.setItem(KEY, JSON.stringify({ date, list })); } catch { /* blocked */ } }

/** Adds (or updates) a friend's result for today. Returns why not, or null when added. */
export function addFriend(line: string, today: string): string | null {
  const r = parseLine(line);
  if (!r) return "That doesn't look like a 📋 COPY MY RESULT line.";
  if (r.date !== today) return `That result is for ${r.date}, not today's Daily.`;
  const list = loadFriends(today).filter(f => f.name.toLowerCase() !== r.name.toLowerCase());
  list.push(r);
  saveFriends(today, list.slice(-20));
  return null;
}
export function clearFriends(today: string): void { saveFriends(today, []); }

/** Higher is better: a win, then the medal, Spicy, then rounds. */
export const score = (f: FriendResult): number => (f.won ? 1000 : 0) + f.medal * 100 + (f.spicy ? 50 : 0) + f.best;
