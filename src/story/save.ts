// Story progress, saved on the device.
import { CHAPTERS } from './chapters';

const KEY = 'kk-story-v1';

export interface StorySave {
  unlocked: number; // how many chapters are open (1..12)
  stars: number[]; // best stars per chapter (0 = not cleared)
  pick: number; // your kaiju
  endingSeen: boolean;
  spicy: number[]; // best stars per chapter on 🌶️ Spicy (0 = not cleared)
  cuts: string[]; // cutscenes already watched (auto-play only the first time)
}

export function loadStory(): StorySave {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<StorySave> | null;
    if (s && typeof s.unlocked === 'number') {
      return { unlocked: Math.max(1, Math.min(CHAPTERS.length, s.unlocked)), stars: s.stars ?? [], pick: s.pick ?? 0, endingSeen: !!s.endingSeen, cuts: Array.isArray(s.cuts) ? s.cuts : [], spicy: Array.isArray(s.spicy) ? s.spicy : [] };
    }
  } catch { /* fresh start */ }
  return { unlocked: 1, stars: [], pick: 0, endingSeen: false, cuts: [], spicy: [] };
}

export function saveStory(s: StorySave): void {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage full or blocked */ }
}

/** Records a chapter result; returns true if this unlocked the next chapter. */
export function recordResult(s: StorySave, chapter: number, won: boolean, stars: number): boolean {
  if (!won) return false;
  s.stars[chapter] = Math.max(s.stars[chapter] ?? 0, stars);
  const before = s.unlocked;
  s.unlocked = Math.max(s.unlocked, Math.min(CHAPTERS.length, chapter + 2));
  saveStory(s);
  return s.unlocked > before;
}

/** Records a 🌶️ Spicy replay (never unlocks chapters). */
export function recordSpicy(s: StorySave, chapter: number, won: boolean, stars: number): void {
  if (!won) return;
  s.spicy[chapter] = Math.max(s.spicy[chapter] ?? 0, stars);
  saveStory(s);
}

export const totalSpicy = (s: StorySave) => (s.spicy ?? []).reduce((a, b) => a + (b ?? 0), 0);

export const totalStars = (s: StorySave) => s.stars.reduce((a, b) => a + (b ?? 0), 0);
