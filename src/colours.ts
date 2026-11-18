// 🎨 Kaiju colour styles (replace hats as the cosmetic). Each style recolours every kaiju's sprite.
// EASY TO CUSTOMISE: name, recipe (see src/render/recolor.ts) and which achievement unlocks it (null = free).
import type { Recipe } from './render/recolor';

export interface Colour { id: string; name: string; unlock: string | null; recipe: Recipe | null }

export const COLOURS: Colour[] = [
  { id: 'classic', name: 'Classic', unlock: null, recipe: null },
  { id: 'mango', name: 'Mango', unlock: null, recipe: { hue: 32, sat: 1.1 } },
  { id: 'lime', name: 'Lime', unlock: 'first-win', recipe: { hue: 100, sat: 1.05 } },
  { id: 'ocean', name: 'Ocean', unlock: 'wins-10', recipe: { hue: 200 } },
  { id: 'grape', name: 'Grape', unlock: 'kos-25', recipe: { hue: 275 } },
  { id: 'bubblegum', name: 'Bubblegum', unlock: 'teams', recipe: { hue: 325, sat: 0.9, light: 1.12 } },
  { id: 'golden', name: 'Golden', unlock: 'dessert', recipe: { hue: 45, sat: 1.25, light: 1.05, glow: 0.6 } },
  { id: 'midnight', name: 'Midnight', unlock: 'gauntlet-5', recipe: { hue: 235, sat: 0.55, light: 0.62 } },
  { id: 'ghost', name: 'Ghost', unlock: 'spicy-1', recipe: { sat: 0.12, light: 1.25 } },
  { id: 'toasty', name: 'Toasty', unlock: 'story-3', recipe: { hue: 26, sat: 0.75, light: 0.82 } },
  { id: 'cherry', name: 'Cherry', unlock: 'flawless', recipe: { hue: 352, sat: 1.25, light: 0.92 } },
  { id: 'mint', name: 'Mint', unlock: 'daily-3', recipe: { hue: 150, sat: 0.8, light: 1.12 } },
  { id: 'lemon', name: 'Lemon', unlock: 'spoon', recipe: { hue: 56, sat: 1.15, light: 1.1 } },
  { id: 'sky', name: 'Sky', unlock: 'hot', recipe: { hue: 192, sat: 0.8, light: 1.15 } },
  { id: 'lava', name: 'Lava', unlock: 'kaiju-10', recipe: { hue: 14, sat: 1.3, light: 0.85 } },
  // 🛒 bought in the Pantry with Chef Tokens (unlock 'shop:<item id>', see SHOP in src/meta.ts)
  { id: 'toffee', name: 'Toffee', unlock: 'shop:toffee', recipe: { hue: 30, sat: 0.6, light: 0.78 } },
  { id: 'lilac', name: 'Lilac', unlock: 'shop:lilac', recipe: { hue: 270, sat: 0.45, light: 1.15 } },
  { id: 'peach', name: 'Peach', unlock: 'shop:peach', recipe: { hue: 18, sat: 0.7, light: 1.18 } },
  { id: 'berry', name: 'Blueberry', unlock: 'shop:berry', recipe: { hue: 245, sat: 1.1, light: 0.85 } },
  { id: 'matcha', name: 'Matcha', unlock: 'shop:matcha', recipe: { hue: 80, sat: 0.55, light: 1.0 } },
  { id: 'chrome', name: 'Silverware', unlock: 'shop:chrome', recipe: { sat: 0.05, light: 1.05, glow: 0.4 } },
];

/** Kaiju whose main body colour isn't picked up automatically (e.g. a bright belly wins): their body hue in degrees. */
export const BODY_HUE: Record<number, number> = { 7: 168, 14: 210 };
export const colourById = (id: string | undefined): Colour => COLOURS.find(c => c.id === id) ?? COLOURS[0];

// ---------------------------------------------------------------- your chosen colour (saved on this device)
import { loadStats } from './stats';
import { shopOwned } from './meta';
const KEY = 'kk-colour';
export const colourUnlocked = (c: Colour): boolean => !c.unlock || (c.unlock.startsWith('shop:') ? shopOwned(c.unlock.slice(5)) : loadStats().achieved.includes(c.unlock));
export function currentColour(): Colour {
  let id: string | null = null;
  try { id = localStorage.getItem(KEY); } catch { /* blocked */ }
  const c = colourById(id ?? 'classic');
  return colourUnlocked(c) ? c : COLOURS[0];
}
export function setColour(id: string): void {
  try { localStorage.setItem(KEY, id); } catch { /* blocked */ }
}

/** What a player brings online: "hatId|colourId" in the existing hat field. */
export const lookOf = (hatId: string, colourId: string) => `${hatId}|${colourId}`;
export const parseLook = (s: string | undefined): { hat: string; colour: string } => { const [hat = '', colour = 'classic'] = (s ?? '').split('|'); return { hat, colour }; };

/**
 * Colour for every seat: people on this device use theirs; anyone else keeps Classic — except that when two
 * seats play the same kaiju, the later ones get a different style so you can tell them apart.
 */
export function seatColours(species: number[], mine: (string | undefined)[]): string[] {
  const out: string[] = [];
  const auto = ['ocean', 'mango', 'grape', 'lime', 'bubblegum', 'midnight'];
  species.forEach((sp, i) => {
    let c = mine[i] ?? 'classic';
    const taken = new Set(out.filter((_, j) => species[j] === sp));
    if (taken.has(c)) c = auto.find(a => !taken.has(a)) ?? c;
    out.push(c);
  });
  return out;
}
