export type CutleryKind = 'fork' | 'spoon' | 'knife' | 'chopstick' | 'ladle' | 'spork' | 'pizzacutter' | 'rollingpin' | 'whisk' | 'skewer' | 'scoop' | 'grater';

export interface CutleryDef {
  kind: CutleryKind;
  name: string;
  speed: number;
  range: number;
  radius: number; // hit radius
  bounces: number; // wall bounces before sticking
  returns: boolean; // flies back to thrower after max range
  split: number; // projectiles per throw
  heavy: boolean; // keeps going after a KO, shoves loose cutlery
  spin: boolean;
  curve?: number; // turns while flying (radians per second; + = clockwise): curls around props
  pierce?: boolean; // flies straight through props (still stops at the table edge)
  lob?: number; // lobbed over everything, then SPLATS everyone within this radius where it lands
  spread?: number; // angle between the shots when split > 1
}

export const CUTLERY: Record<CutleryKind, CutleryDef> = {
  fork:      { kind: 'fork',      name: 'Fork',         speed: 760,  range: 520, radius: 9,  bounces: 0, returns: false, split: 1, heavy: false, spin: false },
  spoon:     { kind: 'spoon',     name: 'Spoon',        speed: 700,  range: 640, radius: 10, bounces: 1, returns: false, split: 1, heavy: false, spin: false },
  knife:     { kind: 'knife',     name: 'Butter Knife', speed: 1000, range: 380, radius: 8,  bounces: 0, returns: false, split: 1, heavy: false, spin: true },
  chopstick: { kind: 'chopstick', name: 'Chopsticks',   speed: 820,  range: 560, radius: 7,  bounces: 0, returns: false, split: 2, heavy: false, spin: false },
  ladle:     { kind: 'ladle',     name: 'Ladle',        speed: 520,  range: 440, radius: 16, bounces: 0, returns: false, split: 1, heavy: true,  spin: false },
  pizzacutter: { kind: 'pizzacutter', name: 'Pizza Cutter', speed: 860, range: 620, radius: 11, bounces: 3, returns: false, split: 1, heavy: false, spin: true },
  rollingpin:  { kind: 'rollingpin',  name: 'Rolling Pin',  speed: 560, range: 360, radius: 18, bounces: 0, returns: false, split: 1, heavy: true,  spin: false },
  spork:     { kind: 'spork',     name: 'Spork',        speed: 740,  range: 460, radius: 9,  bounces: 1, returns: true,  split: 1, heavy: false, spin: false },
  // 🆕 Expansion cutlery (2026-11-21): each flies in a new way. EASY TO CUSTOMISE: numbers here.
  whisk:     { kind: 'whisk',     name: 'Whisk',        speed: 720,  range: 640, radius: 11, bounces: 0, returns: false, split: 1, heavy: false, spin: true,  curve: 1.4 },
  skewer:    { kind: 'skewer',    name: 'Skewer',       speed: 940,  range: 600, radius: 7,  bounces: 0, returns: false, split: 1, heavy: false, spin: false, pierce: true },
  scoop:     { kind: 'scoop',     name: 'Ice Cream Scoop', speed: 560, range: 400, radius: 12, bounces: 0, returns: false, split: 1, heavy: false, spin: true, lob: 52 },
  grater:    { kind: 'grater',    name: 'Cheese Grater', speed: 820, range: 300, radius: 7,  bounces: 0, returns: false, split: 3, heavy: false, spin: true,  spread: 0.24 },
};

/** Rare table pickups (never handed out at round start). EASY TO CUSTOMISE: add/remove kinds or change the chance. */
export const RARE_KINDS: CutleryKind[] = ['spork', 'pizzacutter', 'rollingpin', 'whisk', 'skewer', 'scoop', 'grater'];
export const RARE_CHANCE = 0.4; // share of table pickups that are rare

/** Kinds handed out at round start (spork is a rare pickup only). */
/** One line per kind for Help and the Pantry (the special part of each). */
export const CUTLERY_NOTE: Partial<Record<CutleryKind, string>> = {
  whisk: 'CURVES to the right as it flies: bend it round props',
  skewer: 'goes straight THROUGH props',
  scoop: 'LOBBED over everything, then SPLATS everyone where it lands',
  grater: 'a wide fan of cheesy shards: hard to dodge up close',
};

export const STARTER_KINDS: CutleryKind[] = ['fork', 'spoon', 'knife', 'chopstick', 'ladle'];
