// Mutators: one wacky rule twist for Free Play / Online. EASY TO CUSTOMISE: names, blurbs and numbers here;
// set enabled: false to hide one. The simulation reads MUTATOR_RULES; menus read MUTATORS.

export type Mutator = 'none' | 'frenzy' | 'turbo' | 'boomerang' | 'giant' | 'ice' | 'snack';

export const MUTATORS: { id: Mutator; name: string; blurb: string; enabled: boolean }[] = [
  { id: 'none', name: 'NONE', blurb: 'Normal rules', enabled: true },
  { id: 'frenzy', name: 'KAIJU FRENZY', blurb: 'Everyone starts each round ready to go KAIJU', enabled: true },
  { id: 'turbo', name: 'TURBO', blurb: 'The whole game runs faster', enabled: true },
  { id: 'boomerang', name: 'BOOMERANGS', blurb: 'Every throw comes back to you', enabled: true },
  { id: 'giant', name: 'GIANT CUTLERY', blurb: 'Bigger hit areas on all cutlery', enabled: true },
  { id: 'ice', name: 'ICE RINK', blurb: 'Every table is slippery', enabled: true },
  { id: 'snack', name: 'SNACK ATTACK', blurb: 'Crumbs fill your belly 3× faster', enabled: true },
];

export const MUTATOR_RULES = {
  turboSpeed: 1.3, // game speed multiplier
  giantRadius: 1.6, // cutlery hit radius multiplier
  snackMultiplier: 3, // belly per crumb multiplier
};

export const enabledMutators = () => MUTATORS.filter(m => m.enabled);
export const mutatorDef = (id: Mutator) => MUTATORS.find(m => m.id === id) ?? MUTATORS[0];
