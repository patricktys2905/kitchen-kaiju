// Player settings, saved on the device. EASY TO CUSTOMISE: change DEFAULTS, or add a field here,
// then add a row for it in SETTINGS_ROWS (the Settings screen builds itself from that list).

export interface Settings {
  volume: number; // sound effects 0..1
  music: number; // background music 0..1 (0 = off)
  shake: boolean; // camera shake on hits and explosions
  reducedFx: boolean; // fewer particles and flashes
  nameTags: boolean; // show each kaiju's name above it during matches
  replays: boolean; // slow-motion replay of each round's final knockout
  badges: boolean; // P1–P6 number badges under kaiju (easier than colour alone)
}

export const DEFAULTS: Settings = { volume: 0.75, music: 0.35, shake: true, reducedFx: false, nameTags: false, replays: true, badges: false };

const KEY = 'kk-settings-v1';
let cache: Settings | null = null;
const listeners: ((s: Settings) => void)[] = [];

export function getSettings(): Settings {
  if (cache) return cache;
  try { cache = { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<Settings>) }; } catch { cache = { ...DEFAULTS }; }
  return cache;
}

export function setSetting<K extends keyof Settings>(k: K, v: Settings[K]): void {
  const s = { ...getSettings(), [k]: v };
  cache = s;
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage blocked */ }
  for (const f of listeners) f(s);
}

export function onSettings(f: (s: Settings) => void): void {
  listeners.push(f);
}

/** Rows shown on the Settings screen. 'level' rows step through LEVELS, 'toggle' rows flip on/off. */
export const LEVELS = [0, 0.15, 0.35, 0.55, 0.75, 1];
export const SETTINGS_ROWS: { key: keyof Settings; label: string; kind: 'level' | 'toggle'; help: string }[] = [
  { key: 'volume', label: 'SOUND EFFECTS', kind: 'level', help: 'Throws, clanks, splats' },
  { key: 'music', label: 'MUSIC', kind: 'level', help: 'Background tunes (0 = off)' },
  { key: 'shake', label: 'SCREEN SHAKE', kind: 'toggle', help: 'Shake on big hits and explosions' },
  { key: 'reducedFx', label: 'REDUCED EFFECTS', kind: 'toggle', help: 'Fewer particles and flashes' },
  { key: 'replays', label: 'INSTANT REPLAYS', kind: 'toggle', help: 'Slow-mo replay of the last knockout of each round' },
  { key: 'badges', label: 'PLAYER NUMBERS', kind: 'toggle', help: 'P1–P6 badges under kaiju (colour-blind friendly)' },
  { key: 'nameTags', label: 'NAME TAGS', kind: 'toggle', help: 'Show every kaiju\'s name above it in matches' },
];
