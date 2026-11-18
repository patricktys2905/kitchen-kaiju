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

/** Wave 1: one easy bot (warm-up) … then quickly more and tougher bots (max 5 rivals). */
export function waveSetup(wave: number): WaveSetup {
  const rivals = Math.min(5, 1 + Math.floor(wave / 2)); // 1, 2, 2, 3, 3, 4 …
  const levels: Difficulty[] = Array.from({ length: rivals }, (_, i) => {
    const heat = wave - 1 - i * 2; // later seats lag behind the first one
    return heat >= 6 ? 'hard' : heat >= 2 ? 'normal' : 'easy'; // normal from wave 3, hard from wave 7
  });
  return { rivals, levels, boss: wave % GAUNTLET.bossEvery === 0 };
}

/** 🎁 Perks you pick between Gauntlet waves; they stack and last the whole run. EASY TO CUSTOMISE. */
export interface Perk { id: string; name: string; desc: string; apply: (p: { meter: number; shieldT: number; speedT: number; sugarT: number }) => void }
export const GAUNTLET_PERKS: Perk[] = [
  { id: 'belly', name: '🍪 Full Belly', desc: 'Start each wave 40% nearer KAIJU', apply: p => { p.meter = Math.min(100, p.meter + 40); } },
  { id: 'shield', name: '🟡 Mustard Coat', desc: 'A shield that blocks one hit', apply: p => { p.shieldT = 60; } },
  { id: 'speed', name: '🌶️ Hot Feet', desc: 'Move faster every wave', apply: p => { p.speedT = 60; } },
  { id: 'sugar', name: '🍬 Sugar Rush', desc: 'Dash and swipe recharge fast', apply: p => { p.sugarT = 60; } },
];

/** Which tables a wave can use (any you own). */
export const gauntletTables = (owned: number[]): number[] => (owned.length ? owned : LAYOUTS.map((_, i) => i));

const KEY = 'kk-gauntlet-best';
export const gauntletBest = (): number => Number(localStorage.getItem(KEY) ?? 0) || 0;
export function saveGauntletBest(wave: number): boolean {
  if (wave <= gauntletBest()) return false;
  try { localStorage.setItem(KEY, String(wave)); } catch { /* blocked */ }
  return true;
}
