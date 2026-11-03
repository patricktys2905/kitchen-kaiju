export type CutleryKind = 'fork' | 'spoon' | 'knife' | 'chopstick' | 'ladle' | 'spork';

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
}

export const CUTLERY: Record<CutleryKind, CutleryDef> = {
  fork:      { kind: 'fork',      name: 'Fork',         speed: 760,  range: 520, radius: 9,  bounces: 0, returns: false, split: 1, heavy: false, spin: false },
  spoon:     { kind: 'spoon',     name: 'Spoon',        speed: 700,  range: 640, radius: 10, bounces: 1, returns: false, split: 1, heavy: false, spin: false },
  knife:     { kind: 'knife',     name: 'Butter Knife', speed: 1000, range: 380, radius: 8,  bounces: 0, returns: false, split: 1, heavy: false, spin: true },
  chopstick: { kind: 'chopstick', name: 'Chopsticks',   speed: 820,  range: 560, radius: 7,  bounces: 0, returns: false, split: 2, heavy: false, spin: false },
  ladle:     { kind: 'ladle',     name: 'Ladle',        speed: 520,  range: 440, radius: 16, bounces: 0, returns: false, split: 1, heavy: true,  spin: false },
  spork:     { kind: 'spork',     name: 'Spork',        speed: 740,  range: 460, radius: 9,  bounces: 1, returns: true,  split: 1, heavy: false, spin: false },
};

/** Kinds handed out at round start (spork is a rare pickup only). */
export const STARTER_KINDS: CutleryKind[] = ['fork', 'spoon', 'knife', 'chopstick', 'ladle'];
