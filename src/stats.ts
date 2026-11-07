// Lifetime stats for the people playing on this device (bots don't count), plus achievements.
// EASY TO CUSTOMISE: add/edit achievements in ACHIEVEMENTS; each one is a test on the stats.
import type { GameMode } from './sim/modes';
import { loadStory } from './story/save';

export interface Stats {
  matches: number; // matches finished with at least one human playing
  wins: number; // matches won by a human
  roundsWon: number;
  kos: number; // knockouts scored by humans
  crumbs: number;
  kaijuForms: number; // times a human went KAIJU
  pops: number; // Hot Dumplings that popped on someone else while a human was playing
  streak: number; // current win streak
  bestStreak: number;
  gauntlet: number; // best Gauntlet wave cleared
  modeWins: Partial<Record<GameMode, number>>;
  kaijuWins: Record<number, number>; // species -> match wins
  kaijuPlays: Record<number, number>; // species -> matches played
  tables: number[]; // table indices played on
  achieved: string[]; // achievement ids
}

const KEY = 'kk-stats-v1';
const fresh = (): Stats => ({
  matches: 0, wins: 0, roundsWon: 0, kos: 0, crumbs: 0, kaijuForms: 0, pops: 0, streak: 0, bestStreak: 0, gauntlet: 0,
  modeWins: {}, kaijuWins: {}, kaijuPlays: {}, tables: [], achieved: [],
});

export function loadStats(): Stats {
  try { return { ...fresh(), ...(JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<Stats>) }; } catch { return fresh(); }
}

export function saveStats(s: Stats): void {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage blocked */ }
}

export interface Achievement {
  id: string;
  icon: string;
  name: string;
  desc: string;
  test: (s: Stats) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-win', icon: '🥇', name: 'First Bite', desc: 'Win a match', test: s => s.wins >= 1 },
  { id: 'wins-10', icon: '🍽️', name: 'Regular Diner', desc: 'Win 10 matches', test: s => s.wins >= 10 },
  { id: 'wins-50', icon: '👑', name: 'Head of the Table', desc: 'Win 50 matches', test: s => s.wins >= 50 },
  { id: 'kos-25', icon: '🍴', name: 'Forked Up', desc: 'Score 25 knockouts', test: s => s.kos >= 25 },
  { id: 'kos-250', icon: '🔪', name: 'Cutlery Drawer', desc: 'Score 250 knockouts', test: s => s.kos >= 250 },
  { id: 'crumbs-100', icon: '🍪', name: 'Crumb Muncher', desc: 'Eat 100 crumbs', test: s => s.crumbs >= 100 },
  { id: 'crumbs-1000', icon: '🥐', name: 'Bottomless Belly', desc: 'Eat 1,000 crumbs', test: s => s.crumbs >= 1000 },
  { id: 'kaiju-10', icon: '🦖', name: 'Size Matters', desc: 'Go KAIJU 10 times', test: s => s.kaijuForms >= 10 },
  { id: 'streak-3', icon: '🔥', name: 'On a Roll', desc: 'Win 3 matches in a row', test: s => s.bestStreak >= 3 },
  { id: 'streak-5', icon: '🌶️', name: 'Too Hot to Handle', desc: 'Win 5 matches in a row', test: s => s.bestStreak >= 5 },
  { id: 'teams', icon: '🤝', name: 'Better Together', desc: 'Win a Team Feast match', test: s => (s.modeWins.teams ?? 0) >= 1 },
  { id: 'rush', icon: '⏱️', name: 'Speed Eater', desc: 'Win a Crumb Rush match', test: s => (s.modeWins.crumbRush ?? 0) >= 1 },
  { id: 'hot', icon: '🥟', name: 'Not It!', desc: 'Win a Hot Dumpling match', test: s => (s.modeWins.hotDumpling ?? 0) >= 1 },
  { id: 'pops-10', icon: '💥', name: 'Dumpling Dodger', desc: 'Watch 10 Hot Dumplings pop on someone else', test: s => s.pops >= 10 },
  { id: 'tables-all', icon: '🗺️', name: 'World Tour', desc: 'Play on 12 different tables', test: s => s.tables.length >= 12 },
  { id: 'kaiju-8', icon: '🎭', name: 'Mix It Up', desc: 'Win with 8 different kaiju', test: s => Object.keys(s.kaijuWins).length >= 8 },
  { id: 'gauntlet-5', icon: '⚔️', name: 'Gauntlet Runner', desc: 'Clear 5 Gauntlet waves', test: s => s.gauntlet >= 5 },
  { id: 'gauntlet-10', icon: '🏰', name: 'Gauntlet Master', desc: 'Clear 10 Gauntlet waves', test: s => s.gauntlet >= 10 },
  { id: 'daily', icon: '📅', name: 'Daily Special', desc: 'Win a Daily Challenge', test: () => { try { return JSON.parse(localStorage.getItem('kk-daily-v1') ?? '{}').won === true || !!JSON.parse(localStorage.getItem('kk-daily-v1') ?? '{}').lastWin; } catch { return false; } } },
  { id: 'spicy-1', icon: '🌶️', name: 'Feeling Spicy', desc: 'Clear a Story chapter on Spicy', test: () => safeSpicy() >= 1 },
  { id: 'spicy-12', icon: '🔥', name: 'Ghost Pepper', desc: 'Clear all 12 Story chapters on Spicy', test: () => safeSpicy() >= 12 },
  { id: 'dessert', icon: '🍰', name: 'Clean Plate', desc: 'Finish the whole Dessert Course', test: () => { try { return Number(localStorage.getItem('kk-dessert-v1') ?? 0) >= 4; } catch { return false; } } },
  { id: 'matches-25', icon: '🍲', name: 'Dinner Party Animal', desc: 'Finish 25 matches', test: s => s.matches >= 25 },
];

/** How many chapters are cleared on Spicy (0 when storage is unavailable, e.g. tests). */
function safeSpicy(): number {
  try { return loadStory().spicy.filter(x => x > 0).length; } catch { return 0; }
}

/** Marks any newly earned achievements; returns them. */
export function checkAchievements(s: Stats): Achievement[] {
  const fresh = ACHIEVEMENTS.filter(a => !s.achieved.includes(a.id) && a.test(s));
  for (const a of fresh) s.achieved.push(a.id);
  return fresh;
}
