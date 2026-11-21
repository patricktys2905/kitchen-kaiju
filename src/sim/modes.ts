// Party modes. EASY TO CUSTOMISE: change names, blurbs and numbers here; set `enabled: false` to hide a mode.
// The simulation (world.ts) reads MODE_RULES; menus read MODES.

export type GameMode = 'classic' | 'teams' | 'crumbRush' | 'hotDumpling' | 'goldenSpoon' | 'king' | 'football' | 'horde' | 'practice';

/** Modes where kaiju are on teams (RED / BLUE, or you vs the bots in HORDE). */
export const TEAM_MODES: GameMode[] = ['teams', 'football', 'horde'];

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
    id: 'goldenSpoon', name: 'GOLDEN SPOON', blurb: 'Grab the Golden Spoon and hold on',
    howTo: 'Touch the Golden Spoon to grab it. Every second you hold it scores. Knock out the holder to make them drop it. First to the target wins the round; knocked-out kaiju come back.', minPlayers: 2, enabled: true,
  },
  {
    id: 'king', name: 'KING OF THE PLATE', blurb: 'Stand ALONE in the gold circle to score',
    howTo: 'A gold circle sits on the table. Every second you stand in it ALONE scores; two or more in it and nobody scores. First to the target wins the round; knocked-out kaiju come back.', minPlayers: 2, enabled: true,
  },
  {
    id: 'football', name: 'FOOD FIGHT FOOTBALL', blurb: 'Shove the meatball into the other goal',
    howTo: 'Red vs Blue. Push, SWIPE or throw cutlery at the meatball to knock it into the other team\'s goal (RED shoots right, BLUE shoots left). A goal wins the round; knocked-out kaiju come back.', minPlayers: 2, enabled: true,
  },
  {
    id: 'horde', name: 'HORDE (CO-OP)', blurb: 'Everyone vs endless bots: hold the table',
    howTo: 'All the people are on ONE team against the bots. Knocked-out bots keep coming back; people don\'t. Last until the clock runs out to win the round together.', minPlayers: 2, enabled: true,
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
  goldenSpoon: {
    holdToWin: 15, // seconds of holding to win the round
    roundTime: 60, // after this, whoever held it longest wins
    holderSpeed: 0.9, // the holder is a little slower
    respawnDelay: 2.2,
    respawnShield: 1.5,
    grabCooldown: 0.6, // after a drop, nobody can grab it for this long
  },
  king: {
    holdToWin: 15, // seconds alone in the circle to win the round
    roundTime: 60,
    radius: 115,
    respawnDelay: 2.2,
    respawnShield: 1.5,
  },
  football: {
    roundTime: 75, // no goal by then: nobody scores
    ballRadius: 26,
    goalHalf: 110, // half the height of each goal mouth
    friction: 0.6, // share of ball speed kept per second
    kick: 820, // a SWIPE on the ball
    push: 260, // bumping into it
    respawnDelay: 2,
    respawnShield: 1.2,
  },
  horde: {
    roundTime: 75, // last this long (any person standing) to win the round
    respawnDelay: 3, // bots come back this fast
    respawnShield: 1,
  },
  hotDumpling: {
    fuse: [7, 12] as [number, number], // seconds until it pops (random in range)
    passCooldown: 0.7, // seconds before the new holder can pass it back
    holderSpeed: 1.12, // the holder runs a little faster
  },
};
