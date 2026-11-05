// Story-mode rewards: extra kaiju and tables that stay locked in Free Play / Online until earned.
import { SPECIES } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { CHAPTERS } from './chapters';
import { loadStory, totalStars, type StorySave } from './save';

export interface Unlock {
  kind: 'kaiju' | 'table';
  index: number; // species index or table index
  need: { chapter: number } | { stars: number }; // chapter = 0-based chapter to clear
}

export const UNLOCKS: Unlock[] = [
  { kind: 'kaiju', index: 16, need: { chapter: 3 } }, // Minturtle: beat the first boss
  { kind: 'table', index: 12, need: { chapter: 5 } }, // Freezer Shelf
  { kind: 'kaiju', index: 17, need: { chapter: 7 } }, // Swirlsnail: beat the second boss
  { kind: 'table', index: 13, need: { chapter: 9 } }, // Candy Shop
  { kind: 'kaiju', index: 18, need: { chapter: 11 } }, // Cherrantula: beat the final boss
  { kind: 'table', index: 14, need: { chapter: 11 } }, // Chef's Nightmare
  { kind: 'kaiju', index: 19, need: { stars: 30 } }, // Sherbetoad: 30 stars
];

const lockedKaiju = new Set(UNLOCKS.filter(u => u.kind === 'kaiju').map(u => u.index));
const lockedTables = new Set(UNLOCKS.filter(u => u.kind === 'table').map(u => u.index));

export function isEarned(u: Unlock, s: StorySave): boolean {
  return 'chapter' in u.need ? (s.stars[u.need.chapter] ?? 0) > 0 : totalStars(s) >= u.need.stars;
}

export function needText(u: Unlock): string {
  if ('stars' in u.need) return `Collect ${u.need.stars} stars in Story mode`;
  const ch = u.need.chapter;
  return `Beat Story chapter ${ch + 1}: ${CHAPTERS[ch].title}`;
}

export function unlockName(u: Unlock): string {
  return u.kind === 'kaiju' ? SPECIES[u.index].full : LAYOUTS[u.index].name;
}

/** Which kaiju / tables this player can use (base roster + earned rewards). */
export interface Owned {
  kaiju: number[];
  tables: number[];
}

export function owned(s: StorySave = loadStory()): Owned {
  const earned = new Set(UNLOCKS.filter(u => isEarned(u, s)).map(u => `${u.kind}:${u.index}`));
  return {
    kaiju: SPECIES.map((_, i) => i).filter(i => !lockedKaiju.has(i) || earned.has(`kaiju:${i}`)),
    tables: LAYOUTS.map((_, i) => i).filter(i => !lockedTables.has(i) || earned.has(`table:${i}`)),
  };
}

/** Rewards earned between two save states (for the "UNLOCKED!" celebration). */
export function newlyEarned(before: StorySave, after: StorySave): Unlock[] {
  return UNLOCKS.filter(u => !isEarned(u, before) && isEarned(u, after));
}
