// 🛠 Custom tables built in the Table Workshop. Saved on the device and added to the end of LAYOUTS at start-up,
// so Free Play, Party Cup and Gauntlet can use them (Online, Story and the Daily never do).
// EASY TO CUSTOMISE: PROPS (what can be placed), HAZARD_CHOICES, MAX_CUSTOM.
import { LAYOUTS, type HazardKind, type Layout, type ObstacleStyle } from './sim/layouts';

export const MAX_CUSTOM = 6;
export const MAX_PROPS = 20;
/** Props you can place: [style, radius]. 'gumdrop' is a bouncy bumper. */
export const PROPS: [ObstacleStyle, number][] = [
  ['cup', 30], ['bowl', 36], ['candle', 22], ['teapot', 34], ['cake', 44], ['gift', 30], ['cupcake', 28], ['melon', 36],
  ['pancakes', 38], ['sundae', 30], ['pineapple', 34], ['cheesewheel', 36], ['pot', 40], ['gumdrop', 32], ['lollipop', 26], ['tomato', 28],
];
export const HAZARD_CHOICES: (HazardKind | 'none')[] = ['none', 'hand', 'wind', 'cleaver', 'cheese', 'spatula'];
export const HAZARD_NAMES: Record<string, string> = { none: 'No hazard', hand: 'Giant hand', wind: 'Wind gusts', cleaver: 'Cleaver', cheese: 'Hot cheese', spatula: 'Spatula' };
/** 💬 What each hazard does (shown in the Workshop). EASY TO CUSTOMISE. */
export const HAZARD_INFO: Record<string, string> = {
  none: 'No hazard: a pure fight.',
  hand: 'Giant hand: sweeps a row of the table and flicks off whoever has the fullest belly (DASH as it arrives to dodge).',
  wind: 'Wind gusts: every few seconds the whole table gets blown one way. Stay off the downwind edge.',
  cleaver: 'Cleaver: a red line warns, then a cleaver chops down across it.',
  cheese: 'Hot cheese: blobs drop near kaiju; a growing shadow shows where. Anyone under it is knocked out, and it leaves a sticky puddle.',
  spatula: 'Spatula: a marked square gets flipped, launching anyone standing on it.',
};
/** 💬 What a prop does when you pick it. Every prop is a solid block; size changes how much cover it gives. */
export function propInfo(style: string, r: number): string {
  if (style === 'gumdrop') return 'BUMPER: kicks any kaiju that touches it away hard (great near edges)';
  if (style === 'pancakes') return '🥞 SYRUP STACK: sticky! Kaiju touching it slow right down';
  if (style === 'cupcake') return '🧁 CUPCAKE: bakes a crumb next to itself every few seconds';
  if (style === 'tomato') return '🍅 TOMATO: a soft bumper that splats kaiju back a little';
  return `${style.toUpperCase()}: a solid ${r <= 28 ? 'small' : r <= 36 ? 'medium' : 'big'} block. Cutlery and kaiju bounce off it, so it's cover from throws`;
}

/** Same six spawn points for every custom table (props can't be placed on them). */
export const SPAWNS: [number, number][] = [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 382], [1120, 382]];

export interface CustomTable {
  name: string;
  surface: number; // index of a base table whose surface art to use
  hazard: HazardKind | 'none';
  props: { style: ObstacleStyle; x: number; y: number; r: number }[];
  spawns?: [number, number][]; // 📍 your own six start spots (default SPAWNS)
}

/** The six start spots a custom table uses. */
export const spawnsOf = (c: CustomTable): [number, number][] => (Array.isArray(c.spawns) && c.spawns.length === SPAWNS.length ? c.spawns : SPAWNS);

const KEY = 'kk-custom-tables';
/** How many tables are built in (custom ones come after these). */
export const BASE_COUNT = LAYOUTS.filter(l => !l.custom).length;

export function loadCustom(): CustomTable[] {
  try { return (JSON.parse(localStorage.getItem(KEY) ?? '[]') as CustomTable[]).slice(0, MAX_CUSTOM); } catch { return []; }
}

export function saveCustom(list: CustomTable[]): void {
  try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX_CUSTOM))); } catch { /* blocked */ }
  applyCustomTables();
}

export function toLayout(c: CustomTable): Layout {
  const base = LAYOUTS[c.surface] ?? LAYOUTS[0];
  return {
    name: c.name, table: base.table, hazards: c.hazard === 'none' ? [] : [c.hazard], custom: true,
    blurb: `Your own table (${HAZARD_NAMES[c.hazard]}).`,
    obstacles: c.props.map(p => ({ shape: 'circle', x: p.x, y: p.y, r: p.r, style: p.style })),
    spawns: spawnsOf(c).map(s => [s[0], s[1]] as [number, number]),
  };
}

/** Rebuilds the custom part of LAYOUTS from the save (safe to call any time). */
export function applyCustomTables(): void {
  LAYOUTS.splice(BASE_COUNT);
  try { for (const c of loadCustom()) LAYOUTS.push(toLayout(c)); } catch { /* no storage (tests) */ }
}

export const isCustomTable = (i: number): boolean => !!LAYOUTS[i]?.custom;

/** ⭐ Featured tables to play or remix (Workshop ▸ ⭐ FEATURED). EASY TO ADD MORE. */
export const FEATURED: CustomTable[] = [
  { name: 'Pinball Pantry', surface: 0, hazard: 'none', props: [
    { style: 'gumdrop', x: 400, y: 250, r: 32 }, { style: 'gumdrop', x: 880, y: 250, r: 32 }, { style: 'gumdrop', x: 400, y: 515, r: 32 }, { style: 'gumdrop', x: 880, y: 515, r: 32 },
    { style: 'gumdrop', x: 640, y: 382, r: 32 }, { style: 'tomato', x: 520, y: 382, r: 28 }, { style: 'tomato', x: 760, y: 382, r: 28 } ] },
  { name: 'Syrup Swamp', surface: 0, hazard: 'hand', props: [
    { style: 'pancakes', x: 460, y: 300, r: 38 }, { style: 'pancakes', x: 820, y: 300, r: 38 }, { style: 'pancakes', x: 460, y: 470, r: 38 }, { style: 'pancakes', x: 820, y: 470, r: 38 },
    { style: 'cupcake', x: 640, y: 382, r: 28 } ] },
  { name: 'Bake Off', surface: 0, hazard: 'wind', props: [
    { style: 'cupcake', x: 360, y: 382, r: 28 }, { style: 'cupcake', x: 920, y: 382, r: 28 }, { style: 'cake', x: 640, y: 250, r: 44 }, { style: 'cake', x: 640, y: 520, r: 44 } ] },
  { name: 'Teapot Fortress', surface: 0, hazard: 'cleaver', props: [
    { style: 'teapot', x: 560, y: 300, r: 34 }, { style: 'teapot', x: 720, y: 300, r: 34 }, { style: 'teapot', x: 560, y: 465, r: 34 }, { style: 'teapot', x: 720, y: 465, r: 34 },
    { style: 'cup', x: 380, y: 382, r: 30 }, { style: 'cup', x: 900, y: 382, r: 30 } ] },
];
