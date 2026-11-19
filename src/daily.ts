// Daily Challenge: one fixed match per calendar day (same for everyone on the same version).
// EASY TO CUSTOMISE: change DAILY (modes, rival count, levels, rounds) or how dailySetup() picks things.
import type { Difficulty } from './sim/bot';
import { SPECIES } from './sim/constants';
import { LAYOUTS } from './sim/layouts';
import type { GameMode } from './sim/modes';
import { Rng } from './sim/rng';

export const DAILY = {
  modes: ['classic', 'classic', 'crumbRush', 'hotDumpling', 'teams'] as GameMode[], // picked by the date (classic twice as likely)
  rivals: 3,
  levels: ['normal', 'easy', 'easy'] as Difficulty[],
  spicyLevels: ['hard', 'tough', 'normal'] as Difficulty[], // 🌶️ SPICY DAILY: the same match, tougher rivals
  spicyTokens: 40, // 🪙 for winning the Spicy Daily (once a day)
  rounds: 3,
  powerups: true,
};

export interface DailySetup {
  date: string; // YYYY-MM-DD (local time)
  mode: GameMode;
  table: number;
  you: number; // your kaiju today
  rivals: number[];
}

export const todayKey = (d = new Date()): string => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Deterministic from the date. Uses only the base roster and base tables so everyone can play it. */
export function dailySetup(date = todayKey()): DailySetup {
  const seed = [...date].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rng = new Rng(seed);
  const kaiju = SPECIES.map((_, i) => i).filter(i => i < 16);
  const tables = LAYOUTS.map((_, i) => i).filter(i => !LAYOUTS[i].locked && !LAYOUTS[i].custom);
  const pool = rng.shuffle(kaiju.slice());
  return { date, mode: rng.pick(DAILY.modes), table: rng.pick(tables), you: pool[0], rivals: pool.slice(1, 1 + DAILY.rivals) };
}

export interface DailyRecord { date: string; best: number; won: boolean; tries: number; streak: number; lastWin: string }
const KEY = 'kk-daily-v1';
export function loadDaily(): DailyRecord {
  try { return { date: '', best: 0, won: false, tries: 0, streak: 0, lastWin: '', ...(JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<DailyRecord>) }; } catch { return { date: '', best: 0, won: false, tries: 0, streak: 0, lastWin: '' }; }
}

/** Records today's attempt; rounds = rounds you won. Returns the updated record. */
export function recordDaily(rounds: number, won: boolean, date = todayKey()): DailyRecord {
  const r = loadDaily();
  if (r.date !== date) Object.assign(r, { date, best: 0, won: false, tries: 0 });
  r.tries++;
  r.best = Math.max(r.best, rounds);
  if (won && !r.won) {
    const y = new Date(date + 'T12:00:00'); y.setDate(y.getDate() - 1);
    r.streak = r.lastWin === todayKey(y) ? r.streak + 1 : 1;
    r.lastWin = date;
  }
  r.won = r.won || won;
  try { localStorage.setItem(KEY, JSON.stringify(r)); } catch { /* blocked */ }
  return r;
}

/** 🌶️ Spicy Daily: won today? (its 🪙 pays once a day) */
export const spicyWonToday = (date = todayKey()): boolean => { try { return localStorage.getItem('kk-daily-spicy') === date; } catch { return false; } };
export function markSpicyWin(date = todayKey()): void { try { localStorage.setItem('kk-daily-spicy', date); } catch { /* blocked */ } }
