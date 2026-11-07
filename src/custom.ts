// 🛠 Custom tables built in the Table Workshop. Saved on the device and added to the end of LAYOUTS at start-up,
// so Free Play, Party Cup and Gauntlet can use them (Online, Story and the Daily never do).
// EASY TO CUSTOMISE: PROPS (what can be placed), HAZARD_CHOICES, MAX_CUSTOM.
import { LAYOUTS, type HazardKind, type Layout, type ObstacleStyle } from './sim/layouts';

export const MAX_CUSTOM = 3;
export const MAX_PROPS = 12;
/** Props you can place: [style, radius]. 'gumdrop' is a bouncy bumper. */
export const PROPS: [ObstacleStyle, number][] = [
  ['cup', 30], ['bowl', 36], ['candle', 22], ['teapot', 34], ['cake', 44], ['gift', 30], ['cupcake', 28], ['melon', 36],
  ['pancakes', 38], ['sundae', 30], ['pineapple', 34], ['cheesewheel', 36], ['pot', 40], ['gumdrop', 32], ['lollipop', 26], ['tomato', 28],
];
export const HAZARD_CHOICES: (HazardKind | 'none')[] = ['none', 'hand', 'wind', 'cleaver', 'cheese', 'spatula'];
export const HAZARD_NAMES: Record<string, string> = { none: 'No hazard', hand: 'Giant hand', wind: 'Wind gusts', cleaver: 'Cleaver', cheese: 'Hot cheese', spatula: 'Spatula' };
/** Same six spawn points for every custom table (props can't be placed on them). */
export const SPAWNS: [number, number][] = [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 382], [1120, 382]];

export interface CustomTable {
  name: string;
  surface: number; // index of a base table whose surface art to use
  hazard: HazardKind | 'none';
  props: { style: ObstacleStyle; x: number; y: number; r: number }[];
}

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
    spawns: SPAWNS.map(s => [s[0], s[1]] as [number, number]),
  };
}

/** Rebuilds the custom part of LAYOUTS from the save (safe to call any time). */
export function applyCustomTables(): void {
  LAYOUTS.splice(BASE_COUNT);
  try { for (const c of loadCustom()) LAYOUTS.push(toLayout(c)); } catch { /* no storage (tests) */ }
}

export const isCustomTable = (i: number): boolean => !!LAYOUTS[i]?.custom;
