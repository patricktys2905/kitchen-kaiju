// Party modes. EASY TO CUSTOMISE: change names, blurbs and numbers here; set `enabled: false` to hide a mode.
// The simulation (world.ts) reads MODE_RULES; menus read MODES.

export type GameMode = 'classic' | 'teams' | 'crumbRush' | 'hotDumpling' | 'practice';

export interface ModeDef {
  id: GameMode;
  name: string; // shown on buttons and banners
  blurb: string; // one line under the name
  howTo: string; // shown on the menu when the mode is picked
  minPlayers: number;
  enabled: boolean;
  hidden?: boolean; // not offered in mode pickers (e.g. Practice, reached from How to Play)
}

export const MODES: ModeDef[] = [
  {
    id: 'classic', name: 'CLASSIC', blurb: 'Last kaiju standing wins the round',
    howTo: 'Knock everyone out. Last one standing scores.', minPlayers: 2, enabled: true,
  },
  {
    id: 'teams', name: 'TEAM FEAST', blurb: 'Red vs Blue, no friendly fire',
    howTo: 'Seats alternate RED / BLUE. Your cutlery passes through teammates. Last team standing scores for everyone on it.', minPlayers: 2, enabled: true,
  },
  {
    id: 'crumbRush', name: 'CRUMB RUSH', blurb: 'Eat the most crumbs before time runs out',
    howTo: 'Timed rounds. Every crumb you eat is a point. Get knocked out and you drop half your crumbs, then come back.', minPlayers: 2, enabled: true,
  },
  {
    id: 'hotDumpling', name: 'HOT DUMPLING', blurb: 'Pass the steaming dumpling before it pops',
    howTo: 'One kaiju carries a HOT DUMPLING. Touch a rival to pass it on. When the fuse runs out, it POPS. Last one standing wins.', minPlayers: 3, enabled: true,
  },
  {
    id: 'practice', name: 'PRACTICE', blurb: 'Learn the moves on a harmless dummy',
    howTo: 'A training dummy that never fights back. Follow the checklist. Knocked-out kaiju come straight back.', minPlayers: 2, enabled: true, hidden: true,
  },
];

export const enabledModes = () => MODES.filter(m => m.enabled && !m.hidden);
export const modeDef = (id: GameMode) => MODES.find(m => m.id === id) ?? MODES[0];

/** Tunable numbers for each mode. */
export const MODE_RULES = {
  teams: {
    names: ['RED', 'BLUE'],
    colors: [0xff4a4a, 0x4a8aff],
    css: ['#ff6a6a', '#7aa8ff'],
    friendlyFire: false,
  },
  practice: {
    respawnDelay: 1.2,
  },
  crumbRush: {
    roundTime: 45, // seconds per round
    respawnDelay: 2.5, // seconds out after a knockout
    respawnShield: 1.5, // seconds of invincibility after coming back
    crumbEvery: 0.55, // a new crumb this often (classic: RULES.crumbEvery)
    maxCrumbs: 28,
    dropShare: 0.5, // share of your crumbs you drop when knocked out
  },
  hotDumpling: {
    fuse: [7, 12] as [number, number], // seconds until it pops (random in range)
    passCooldown: 0.7, // seconds before the new holder can pass it back
    holderSpeed: 1.12, // the holder runs a little faster
  },
};
