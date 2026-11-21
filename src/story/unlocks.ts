// Story-mode rewards: extra kaiju and tables that stay locked in Free Play / Online until earned.
import { SPECIES } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { CHAPTERS } from './chapters';
import { loadStory, totalStars, type StorySave } from './save';
import { loadStats } from '../stats';
import { dungeonBest } from '../dungeon';
import { bestRp } from '../seasons';

export interface Unlock {
  kind: 'kaiju' | 'table';
  index: number; // species index or table index
  need: { chapter: number } | { stars: number } | { wins: number } | { matches: number } | { dungeon: number } | { rank: number }; // dungeon = Dinner Dungeon floors reached; rank = best Ranked RP // chapter = 0-based chapter to clear; wins / matches = any mode
}

export const UNLOCKS: Unlock[] = [
  { kind: 'kaiju', index: 16, need: { chapter: 3 } }, // Minturtle: beat the first boss
  { kind: 'table', index: 12, need: { chapter: 5 } }, // Freezer Shelf
  { kind: 'kaiju', index: 17, need: { chapter: 7 } }, // Pengwhip: beat the second boss
  { kind: 'table', index: 13, need: { chapter: 9 } }, // Candy Shop
  { kind: 'kaiju', index: 18, need: { chapter: 11 } }, // Velvaroo: beat the final boss
  { kind: 'table', index: 14, need: { chapter: 11 } }, // Chef's Nightmare
  { kind: 'kaiju', index: 19, need: { stars: 30 } }, // Tacowl: 30 stars
  { kind: 'kaiju', index: 20, need: { dungeon: 1 } }, // Honeybuzz: reach floor 2 of the Dinner Dungeon
  { kind: 'kaiju', index: 21, need: { stars: 24 } }, // Bagelbeagle: 24 stars
  { kind: 'kaiju', index: 22, need: { rank: 100 } }, // Scoopotamus: reach 🥈 SILVER SPOON in Ranked
  { kind: 'kaiju', index: 23, need: { stars: 15 } }, // Peachick: 15 stars
  { kind: 'table', index: 20, need: { stars: 18 } }, // Bakery Oven: 18 stars
  { kind: 'table', index: 23, need: { dungeon: 2 } }, // Noodle Shop: reach the DESSERT floor of the Dinner Dungeon
  { kind: 'table', index: 24, need: { stars: 27 } }, // Cinema Snack Bar: 27 stars
  { kind: 'table', index: 25, need: { rank: 250 } }, // Chocolate Fountain: reach 🥇 GOLD SPOON in Ranked
  // 🌱 NEW SAVES ONLY (saves that existed before this was added keep everything): early goals, so there's more to earn in the first hours
  ...(freshSave() ? ([
    { kind: 'kaiju', index: 8, need: { wins: 1 } }, // Chocomunch: win any match
    { kind: 'kaiju', index: 9, need: { matches: 3 } }, // Bubblegumbo: play 3 matches
    { kind: 'kaiju', index: 12, need: { chapter: 1 } }, // Sloba: clear Story chapter 2
    { kind: 'kaiju', index: 13, need: { wins: 5 } }, // Avocadrake: win 5 matches
    { kind: 'table', index: 15, need: { chapter: 2 } }, // Smoothie Bar: clear Story chapter 3
    { kind: 'table', index: 16, need: { matches: 8 } }, // Fondue Night: play 8 matches
  ] as Unlock[]) : []),
];

/** True for a save that started after the 🌱 early unlocks were added (decided once, then remembered). */
function freshSave(): boolean {
  try {
    let v = localStorage.getItem('kk-fresh-start');
    if (v === null) {
      const played = !!localStorage.getItem('kk-stats-v1') || !!localStorage.getItem('kk-story-v1');
      v = played ? '0' : '1';
      localStorage.setItem('kk-fresh-start', v);
    }
    return v === '1';
  } catch { return false; }
}

const lockedKaiju = new Set(UNLOCKS.filter(u => u.kind === 'kaiju').map(u => u.index));
const lockedTables = new Set(UNLOCKS.filter(u => u.kind === 'table').map(u => u.index));

export function isEarned(u: Unlock, s: StorySave): boolean {
  if ('chapter' in u.need) return (s.stars[u.need.chapter] ?? 0) > 0;
  if ('stars' in u.need) return totalStars(s) >= u.need.stars;
  if ('dungeon' in u.need) return dungeonBest() >= u.need.dungeon;
  if ('rank' in u.need) return bestRp() >= u.need.rank;
  const st = loadStats();
  return 'wins' in u.need ? st.wins >= u.need.wins : st.matches >= u.need.matches;
}

export function needText(u: Unlock, s: StorySave = loadStory()): string {
  if ('dungeon' in u.need) return `Reach floor ${u.need.dungeon + 1} of the 🗝 DINNER DUNGEON (Challenges)`;
  if ('rank' in u.need) return `Reach ${u.need.rank} RP in 🏅 RANKED (Challenges): you have ${Math.min(bestRp(), u.need.rank)}`;
  if ('wins' in u.need) return `Win ${u.need.wins} match${u.need.wins > 1 ? 'es' : ''} in any mode (you have ${Math.min(loadStats().wins, u.need.wins)}/${u.need.wins})`;
  if ('matches' in u.need) return `Play ${u.need.matches} matches in any mode (you have ${Math.min(loadStats().matches, u.need.matches)}/${u.need.matches})`;
  if ('stars' in u.need) return `Collect ${u.need.stars} stars in THE GRAND FEAST (you have ${Math.min(totalStars(s), u.need.stars)}/${u.need.stars}): replay chapters for ★★★`;
  const ch = u.need.chapter, done = s.stars.filter(x => (x ?? 0) > 0).length;
  return `Beat Story chapter ${ch + 1}: ${CHAPTERS[ch].title} (${Math.min(done, ch + 1)}/${ch + 1} cleared)`;
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

/** Built-in tables you own / that exist (Workshop tables are extra and not counted). Used by every screen that shows a count. */
export function tableCount(s: StorySave = loadStory()): { own: number; all: number } {
  return { own: owned(s).tables.filter(i => !LAYOUTS[i]?.custom).length, all: LAYOUTS.filter(l => !l.custom).length };
}

/** Rewards earned between two save states (for the "UNLOCKED!" celebration). */
export function newlyEarned(before: StorySave, after: StorySave): Unlock[] {
  return UNLOCKS.filter(u => !isEarned(u, before) && isEarned(u, after));
}
