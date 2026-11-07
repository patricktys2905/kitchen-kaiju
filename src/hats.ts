// Hats: cosmetic rewards worn by the people playing on this device. Drawn with simple shapes (no art files).
// EASY TO CUSTOMISE: add a hat to HATS (name, which achievement unlocks it, and a draw function).
import type * as Phaser from 'phaser';
import { loadStats } from './stats';

type G = Phaser.GameObjects.Graphics;

export interface Hat {
  id: string;
  name: string;
  unlock: string | null; // achievement id from stats.ts (null = free)
  /** Draws the hat sitting on a head at (x, y) = top of the head; s = size (≈ kaiju radius). */
  draw: (g: G, x: number, y: number, s: number, t: number) => void;
}

const outline = (g: G, w = 2) => g.lineStyle(w, 0x2a1408, 1);

export const HATS: Hat[] = [
  { id: 'none', name: 'No hat', unlock: null, draw: () => {} },
  {
    id: 'party', name: 'Party Hat', unlock: null, draw: (g, x, y, s) => {
      g.fillStyle(0xff5a7a, 1); g.fillTriangle(x - s * 0.45, y, x + s * 0.45, y, x, y - s * 1.1);
      g.fillStyle(0xffd24a, 1); g.fillTriangle(x - s * 0.22, y - s * 0.55, x + s * 0.22, y - s * 0.55, x, y - s * 1.1);
      outline(g); g.strokeTriangle(x - s * 0.45, y, x + s * 0.45, y, x, y - s * 1.1);
      g.fillStyle(0x4fd1ff, 1); g.fillCircle(x, y - s * 1.12, s * 0.13);
    },
  },
  {
    id: 'chef', name: 'Chef Hat', unlock: 'first-win', draw: (g, x, y, s) => {
      g.fillStyle(0xffffff, 1); g.fillRect(x - s * 0.4, y - s * 0.35, s * 0.8, s * 0.35);
      for (const dx of [-0.3, 0, 0.3]) g.fillCircle(x + dx * s, y - s * 0.55, s * 0.32);
      outline(g); g.strokeRect(x - s * 0.4, y - s * 0.35, s * 0.8, s * 0.35);
    },
  },
  {
    id: 'top', name: 'Top Hat', unlock: 'wins-10', draw: (g, x, y, s) => {
      g.fillStyle(0x1a1214, 1); g.fillRect(x - s * 0.6, y - s * 0.1, s * 1.2, s * 0.14); g.fillRect(x - s * 0.36, y - s * 0.95, s * 0.72, s * 0.88);
      g.fillStyle(0xd8281e, 1); g.fillRect(x - s * 0.36, y - s * 0.3, s * 0.72, s * 0.14);
      outline(g); g.strokeRect(x - s * 0.36, y - s * 0.95, s * 0.72, s * 0.88);
    },
  },
  {
    id: 'viking', name: 'Viking Helmet', unlock: 'kos-25', draw: (g, x, y, s) => {
      g.fillStyle(0xf2ece0, 1);
      g.fillTriangle(x - s * 0.5, y - s * 0.2, x - s * 0.95, y - s * 0.75, x - s * 0.35, y - s * 0.45);
      g.fillTriangle(x + s * 0.5, y - s * 0.2, x + s * 0.95, y - s * 0.75, x + s * 0.35, y - s * 0.45);
      g.fillStyle(0x9aa3ad, 1); g.slice(x, y, s * 0.55, Math.PI, 0, false); g.fillPath();
      outline(g); g.beginPath(); g.arc(x, y, s * 0.55, Math.PI, 0, false); g.strokePath();
    },
  },
  {
    id: 'propeller', name: 'Propeller Cap', unlock: 'crumbs-100', draw: (g, x, y, s, t) => {
      g.fillStyle(0x4a8aff, 1); g.slice(x, y, s * 0.5, Math.PI, Math.PI * 1.5, false); g.fillPath();
      g.fillStyle(0xffd24a, 1); g.slice(x, y, s * 0.5, Math.PI * 1.5, 0, false); g.fillPath();
      g.lineStyle(2, 0x2a1408, 1); g.lineBetween(x, y - s * 0.5, x, y - s * 0.75);
      const w = Math.cos(t * 18) * s * 0.55;
      g.fillStyle(0xff5a7a, 1); g.fillEllipse(x, y - s * 0.78, Math.abs(w) * 2 + 2, s * 0.14);
    },
  },
  {
    id: 'flower', name: 'Flower Crown', unlock: 'teams', draw: (g, x, y, s) => {
      const cols = [0xff7ad9, 0xffd24a, 0x8dff6a, 0x4fd1ff, 0xff9a3c];
      for (let i = 0; i < 5; i++) { const a = Math.PI + (i / 4) * Math.PI; g.fillStyle(cols[i], 1); g.fillCircle(x + Math.cos(a) * s * 0.5, y + Math.sin(a) * s * 0.25, s * 0.17); }
    },
  },
  {
    id: 'halo', name: 'Halo', unlock: 'hot', draw: (g, x, y, s, t) => {
      g.lineStyle(Math.max(3, s * 0.12), 0xffd24a, 0.9); g.strokeEllipse(x, y - s * 0.4 + Math.sin(t * 3) * 2, s * 0.9, s * 0.28);
    },
  },
  {
    id: 'beanie', name: 'Bobble Beanie', unlock: 'gauntlet-5', draw: (g, x, y, s) => {
      g.fillStyle(0x21c7a8, 1); g.slice(x, y, s * 0.55, Math.PI, 0, false); g.fillPath();
      g.fillStyle(0xffffff, 1); g.fillRect(x - s * 0.58, y - s * 0.12, s * 1.16, s * 0.16); g.fillCircle(x, y - s * 0.62, s * 0.16);
    },
  },
  {
    id: 'candle', name: 'Birthday Candle', unlock: 'matches-25', draw: (g, x, y, s, t) => {
      g.fillStyle(0x7aa8ff, 1); g.fillRect(x - s * 0.1, y - s * 0.7, s * 0.2, s * 0.7);
      g.fillStyle(0xffffff, 1); for (let i = 0; i < 3; i++) g.fillRect(x - s * 0.1, y - s * 0.6 + i * s * 0.22, s * 0.2, s * 0.06);
      const f = 1 + Math.sin(t * 20) * 0.15;
      g.fillStyle(0xff9a3c, 1); g.fillEllipse(x, y - s * 0.85, s * 0.18 * f, s * 0.3 * f);
      g.fillStyle(0xfff1a0, 1); g.fillEllipse(x, y - s * 0.82, s * 0.08, s * 0.14);
    },
  },
  {
    id: 'ladle', name: 'Golden Ladle', unlock: 'streak-5', draw: (g, x, y, s) => {
      g.fillStyle(0xffd24a, 1); g.slice(x, y, s * 0.45, Math.PI, 0, false); g.fillPath();
      g.fillRect(x + s * 0.35, y - s * 0.9, s * 0.1, s * 0.9);
      g.lineStyle(2, 0x8a6a10, 1); g.beginPath(); g.arc(x, y, s * 0.45, Math.PI, 0, false); g.strokePath();
    },
  },
  {
    id: 'chili', name: 'Chili Pepper', unlock: 'spicy-1', draw: (g, x, y, s) => {
      g.fillStyle(0xd8281e, 1); g.fillEllipse(x, y - s * 0.25, s * 1.1, s * 0.42);
      g.fillStyle(0xff6a4a, 1); g.fillEllipse(x - s * 0.15, y - s * 0.32, s * 0.5, s * 0.14);
      g.fillStyle(0x2f8a2f, 1); g.fillRect(x + s * 0.5, y - s * 0.4, s * 0.22, s * 0.12); g.fillRect(x + s * 0.66, y - s * 0.55, s * 0.08, s * 0.2);
    },
  },
  {
    id: 'crown', name: 'Dessert Crown', unlock: 'dessert', draw: (g, x, y, s, t) => {
      g.fillStyle(0xffd24a, 1);
      g.fillRect(x - s * 0.5, y - s * 0.3, s, s * 0.3);
      for (const dx of [-0.5, -0.17, 0.17, 0.5]) g.fillTriangle(x + (dx - 0.17) * s, y - s * 0.3, x + (dx + 0.17) * s, y - s * 0.3, x + dx * s, y - s * 0.75);
      g.fillStyle(0xff7ad9, 1); g.fillCircle(x, y - s * 0.16, s * 0.1);
      g.fillStyle(0xffffff, 0.5 + 0.5 * Math.sin(t * 4)); g.fillCircle(x - s * 0.3, y - s * 0.2, s * 0.05);
      g.lineStyle(2, 0x8a6a10, 1); g.strokeRect(x - s * 0.5, y - s * 0.3, s, s * 0.3);
    },
  },
];

/** Gemini hat art (public/art/hat-<id>.webp): [width × kaiju radius, how far it sits down into the head × radius]. EASY TO TUNE. */
export const HAT_FIT: Record<string, [number, number]> = {
  party: [1.0, 0.3], chef: [1.35, 0.3], top: [1.35, 0.3], viking: [1.7, 0.4], propeller: [1.35, 0.35], flower: [1.6, 0.35],
  halo: [1.4, -0.25], beanie: [1.3, 0.4], candle: [0.6, 0.2], ladle: [1.35, 0.4], chili: [1.5, 0.3], crown: [1.25, 0.3],
};
export const hatArtKey = (h: Hat) => `hat-${h.id}`;
/** Overall hat size in matches (1 = as in HAT_FIT). */
export const HAT_SCALE = 1.2;

const KEY = 'kk-hat';
export const hatUnlocked = (h: Hat): boolean => !h.unlock || loadStats().achieved.includes(h.unlock);
export function currentHat(): Hat {
  const id = localStorage.getItem(KEY) ?? 'none';
  const h = HATS.find(x => x.id === id) ?? HATS[0];
  return hatUnlocked(h) ? h : HATS[0];
}
export function setHat(id: string): void {
  try { localStorage.setItem(KEY, id); } catch { /* blocked */ }
}
