// Mutators: one wacky rule twist for Free Play / Online. EASY TO CUSTOMISE: names, blurbs and numbers here;
// set enabled: false to hide one. The simulation reads MUTATOR_RULES; menus read MUTATORS.

export type Mutator = 'none' | 'frenzy' | 'turbo' | 'boomerang' | 'giant' | 'ice' | 'snack' | 'fists' | 'bouncy' | 'mirror' | 'tiny';

export const MUTATORS: { id: Mutator; name: string; blurb: string; enabled: boolean }[] = [
  { id: 'none', name: 'NONE', blurb: 'Normal rules', enabled: true },
  { id: 'frenzy', name: 'KAIJU FRENZY', blurb: 'Everyone starts each round ready to go KAIJU', enabled: true },
  { id: 'turbo', name: 'TURBO', blurb: 'The whole game runs faster', enabled: true },
  { id: 'boomerang', name: 'BOOMERANGS', blurb: 'Every throw comes back to you', enabled: true },
  { id: 'giant', name: 'GIANT CUTLERY', blurb: 'Bigger hit areas on all cutlery', enabled: true },
  { id: 'ice', name: 'ICE RINK', blurb: 'Every table is slippery', enabled: true },
  { id: 'snack', name: 'SNACK ATTACK', blurb: 'Crumbs fill your belly 3× faster', enabled: true },
  { id: 'fists', name: 'FISTS ONLY', blurb: 'No cutlery at all: swipe, shove and stomp', enabled: true },
  { id: 'bouncy', name: 'BOUNCY CASTLE', blurb: 'The table edges bounce you back: nobody falls off', enabled: true },
  { id: 'mirror', name: 'MIRROR MOVES', blurb: 'Left is right and up is down (players only)', enabled: true },
  { id: 'tiny', name: 'MINI KAIJU', blurb: 'Everyone is tiny and quick: harder to hit', enabled: true },
];

export const MUTATOR_RULES = {
  turboSpeed: 1.3, // game speed multiplier
  giantRadius: 1.6, // cutlery hit radius multiplier
  snackMultiplier: 3, // belly per crumb multiplier
  tinySize: 0.72, // Mini Kaiju: size multiplier
  tinySpeed: 1.12, // Mini Kaiju: speed multiplier
  bounce: 0.85, // Bouncy Castle: how much speed a wall bounce keeps
};

export const enabledMutators = () => MUTATORS.filter(m => m.enabled);

/** ⚡⚡ Double twists: pairs you can pick from the TWIST button after the single twists. EASY TO CUSTOMISE. */
export const MUTATOR_COMBOS: [Mutator, Mutator][] = [['ice', 'turbo'], ['tiny', 'bouncy'], ['boomerang', 'giant'], ['frenzy', 'snack'], ['fists', 'ice'], ['mirror', 'turbo'], ['tiny', 'frenzy'], ['bouncy', 'boomerang']];
/** Every twist choice in order: none, singles, then combos. Each is [first, second]. */
export const twistChoices = (): [Mutator, Mutator][] => [...enabledMutators().map((m): [Mutator, Mutator] => [m.id, 'none']), ...MUTATOR_COMBOS];
export const twistName = (a: Mutator, b: Mutator = 'none'): string => (b === 'none' ? mutatorDef(a).name : `${mutatorDef(a).name} + ${mutatorDef(b).name}`);
export const twistBlurb = (a: Mutator, b: Mutator = 'none'): string => (b === 'none' ? mutatorDef(a).blurb : `${mutatorDef(a).blurb}. ${mutatorDef(b).blurb}`);
export const mutatorDef = (id: Mutator) => MUTATORS.find(m => m.id === id) ?? MUTATORS[0];
