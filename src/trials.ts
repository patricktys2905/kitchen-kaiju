// 🎯 Trials: fixed hard scenarios, each with 3 stars. Always unlocked (no Story needed).
// ★ win · ★★ win without losing a round · ★★★ win without losing a round AND hit the extra goal.
// EASY TO CUSTOMISE: add/edit trials here. Species/tables/twists use the same ids as everywhere else.
import type { Difficulty } from './sim/bot';
import type { Mutator } from './sim/mutators';

export interface Trial {
  id: string; name: string; desc: string;
  you: number; // your kaiju
  rivals: { species: number; level: Difficulty; boss?: boolean }[];
  table: number; rounds: number;
  mutator?: Mutator; mutator2?: Mutator;
  kos: number; // ★★★ needs at least this many knockouts in the match
}

// Species: 0 Gobzilla 1 Squidgeon 2 Crabbage 3 Bloblin 4 Mothball 5 Toastbat 6 Dumplord 7 Norigon 8 Chocomunch 9 Bubblegumbo
//          10 Bluebeary 11 Pizzaraptor 12 Sloba 13 Avocadrake 14 Salmonster 15 Hotchog
export const TRIALS: Trial[] = [
  { id: 'duel', name: 'Hard Duel', desc: 'One HARD rival, one table, first to 3.', you: 0, rivals: [{ species: 11, level: 'hard' }], table: 0, rounds: 3, kos: 4 },
  { id: 'ice', name: 'Thin Ice', desc: 'Ice Rink + Turbo. Two rivals. Keep your footing.', you: 1, rivals: [{ species: 7, level: 'normal' }, { species: 10, level: 'normal' }], table: 2, rounds: 2, mutator: 'ice', mutator2: 'turbo', kos: 4 },
  { id: 'fists', name: 'Bare Knuckles', desc: 'Fists Only. No cutlery: shove, swipe, stomp.', you: 8, rivals: [{ species: 2, level: 'hard' }, { species: 9, level: 'normal' }], table: 1, rounds: 2, mutator: 'fists', kos: 3 },
  { id: 'boss', name: 'Two Crowns', desc: 'Two bosses who start every round ready to go KAIJU.', you: 3, rivals: [{ species: 6, level: 'normal', boss: true }, { species: 15, level: 'normal', boss: true }], table: 6, rounds: 2, kos: 3 },
  { id: 'crowd', name: 'Dinner Rush', desc: 'Five rivals at once. Survive the crowd.', you: 5, rivals: [2, 4, 9, 12, 14].map(s => ({ species: s, level: 'normal' as Difficulty })), table: 4, rounds: 2, kos: 6 },
  { id: 'tiny', name: 'Pocket Monsters', desc: 'Mini Kaiju + Kaiju Frenzy. Tiny, quick and huge.', you: 13, rivals: [{ species: 0, level: 'hard' }, { species: 3, level: 'hard' }], table: 8, rounds: 2, mutator: 'tiny', mutator2: 'frenzy', kos: 4 },
  { id: 'brutal', name: 'Brutal Bot', desc: 'One BRUTAL rival. The hardest bot in the game.', you: 7, rivals: [{ species: 9, level: 'brutal' }], table: 3, rounds: 3, kos: 4 },
  { id: 'gauntlet', name: 'Chef\'s Table', desc: 'Three HARD rivals and a boomerang twist.', you: 4, rivals: [{ species: 11, level: 'hard' }, { species: 12, level: 'hard' }, { species: 10, level: 'hard' }], table: 10, rounds: 2, mutator: 'boomerang', mutator2: 'giant', kos: 5 },
];

export const TRIAL_TOKENS = 20; // per new star
const KEY = 'kk-trials-v1';
export function trialStars(): Record<string, number> { try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, number>; } catch { return {}; } }
/** Saves a result; returns how many NEW stars it earned. */
export function recordTrial(id: string, stars: number): number {
  const all = trialStars(), before = all[id] ?? 0;
  if (stars <= before) return 0;
  all[id] = stars;
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* blocked */ }
  return stars - before;
}
export const totalTrialStars = () => Object.values(trialStars()).reduce((a, b) => a + b, 0);
