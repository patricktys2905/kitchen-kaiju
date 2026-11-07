// Gauntlet: solo survival. One life; each wave is a single round against more (and tougher) bots.
// EASY TO CUSTOMISE: change waveSetup() or the numbers in GAUNTLET.
import type { Difficulty } from './sim/bot';
import { LAYOUTS } from './sim/layouts';

export const GAUNTLET = {
  powerups: true, // condiments on the table
  mode: 'classic' as const,
  bossEvery: 5, // every 5th wave one rival starts each round able to go KAIJU (crowned)
};

export interface WaveSetup {
  rivals: number; // how many bots
  levels: Difficulty[]; // one per bot
  boss: boolean;
}

/** Wave 1: one easy bot … then more bots, then tougher ones (max 5 rivals). */
export function waveSetup(wave: number): WaveSetup {
  const rivals = Math.min(5, 1 + Math.floor((wave - 1) / 2));
  const levels: Difficulty[] = Array.from({ length: rivals }, (_, i) => {
    const heat = wave - 1 - i * 2; // later seats lag behind the first one
    return heat >= 8 ? 'hard' : heat >= 3 ? 'normal' : 'easy';
  });
  return { rivals, levels, boss: wave % GAUNTLET.bossEvery === 0 };
}

/** Which tables a wave can use (any you own). */
export const gauntletTables = (owned: number[]): number[] => (owned.length ? owned : LAYOUTS.map((_, i) => i));

const KEY = 'kk-gauntlet-best';
export const gauntletBest = (): number => Number(localStorage.getItem(KEY) ?? 0) || 0;
export function saveGauntletBest(wave: number): boolean {
  if (wave <= gauntletBest()) return false;
  try { localStorage.setItem(KEY, String(wave)); } catch { /* blocked */ }
  return true;
}
