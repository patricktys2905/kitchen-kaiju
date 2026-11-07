// 🍰 Dessert Course: a post-game run of 4 tougher fights, unlocked after the Story ending.
// EASY TO CUSTOMISE: edit COURSES (table index, rivals, quips). Rival species clash with your pick is handled
// the same way as Story (a free kaiju steps in).
import type { Chapter } from './chapters';

export interface Course extends Pick<Chapter, 'title' | 'table' | 'rounds' | 'rivals'> {
  quip: string; // shown when the course starts
}

// kaiju: 3 Bloblin 6 Dumplord 7 Norigon 8 Chocomunch 9 Bubblegumbo 11 Pizzaraptor 12 Sloba 13 Avocadrake
//        15 Hotchog 16 Minturtle 17 Pengwhip 18 Velvaroo 19 Tacowl · tables: 12 Freezer 13 Candy 14 Nightmare 15 Smoothie
export const COURSES: Course[] = [
  {
    title: 'Sugar Crash', table: 13, rounds: 3,
    rivals: [{ species: 9, level: 'hard' }, { species: 18, level: 'normal' }, { species: 8, level: 'normal' }],
    quip: 'Velvaroo: "Hop on the bumpers, sweetheart. We\'ll bounce you right off."',
  },
  {
    title: 'Brain Freeze', table: 12, rounds: 3,
    rivals: [{ species: 16, level: 'normal' }, { species: 17, level: 'normal' }, { species: 3, level: 'hard' }],
    quip: 'Pengwhip: "Dessert is served… on ice. Mind your footing."',
  },
  {
    title: 'Blended', table: 15, rounds: 3,
    rivals: [{ species: 12, level: 'hard' }, { species: 13, level: 'hard' }, { species: 19, level: 'normal' }],
    quip: 'Sloba: "The blender\'s on… I\'m too lazy to run. Are you?"',
  },
  {
    title: "The Chef's Nightmare", table: 14, rounds: 3,
    rivals: [{ species: 6, level: 'hard', boss: true }, { species: 7, level: 'hard' }, { species: 11, level: 'normal' }, { species: 15, level: 'normal' }],
    quip: 'Dumplord: "You took my spoon. Now I take… DESSERT."',
  },
];

const KEY = 'kk-dessert-v1';
/** How many courses you have cleared (0..COURSES.length). */
export const dessertBest = (): number => Number(localStorage.getItem(KEY) ?? 0) || 0;
export function saveDessert(cleared: number): void {
  if (cleared <= dessertBest()) return;
  try { localStorage.setItem(KEY, String(cleared)); } catch { /* blocked */ }
}
