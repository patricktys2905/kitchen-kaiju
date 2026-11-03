// All tunable numbers live here so balancing never means hunting through logic.
export const VIEW = { w: 1280, h: 720 };
export const TABLE = { x: 100, y: 95, w: 1080, h: 575 };

export const P = {
  radius: 18,
  kaijuRadius: 44,
  speed: 260,
  chargeSlow: 0.55,
  maxCharge: 0.6,
  dashTime: 0.15,
  dashSpeed: 820,
  dashCD: 0.85,
  swipeWindup: 0.08, // telegraph before the swipe becomes dangerous
  swipeTime: 0.12,
  swipeCD: 0.7,
  swipeReach: 38,
  swipeArc: 0.85, // half-angle in radians (~100 deg total)
  bumpForce: 600,
  fallSpeed: 160, // knockback speed above which you can be pushed off the table
  crumbValue: 9, // meter gained per crumb (12 crumbs = full)
  kaijuTime: 5,
  kaijuSpeed: 0.65,
  stompEvery: 0.6,
  stompRadius: 150,
  stompForce: 560,
  shrinkInvuln: 0.6,
};

export const RULES = {
  countdown: 1.6,
  roundEndTime: 2.6,
  stuckReturnDelay: 4,
  returnSpeed: 170,
  startCrumbs: 12,
  maxCrumbs: 22,
  crumbEvery: 0.5,
  pickupEvery: 8,
  maxLoosePickups: 2,
  handFirst: 7,
  handWarn: 1.4,
  handSpeed: 1700,
  handBand: 130,
  handWidth: 170,
  handInterval: [8, 12] as [number, number],
  suddenDeathAt: 45,
  suddenDeathInterval: [3.5, 5] as [number, number],
  // Birthday Bash: gusts of wind
  windFirst: 6,
  windInterval: [8, 11] as [number, number],
  windWarn: 1.3,
  windGust: 1.4,
  windForce: 1150, // knockback acceleration while the gust blows
  // Chef's Board: the cleaver
  cleaverFirst: 5,
  cleaverInterval: [5.5, 8] as [number, number],
  cleaverSuddenDeath: [3, 4.5] as [number, number],
  cleaverWarn: 1.2,
  cleaverBand: 70,
  cleaverShow: 0.5,
};

/** The kaiju roster. Each player picks a different one; its colour is that player's colour. */
export const SPECIES = [
  { name: 'GOBZILLA', full: 'Gobzilla Jr.', food: 'strawberry lizard', color: 0xff5a7a, css: '#ff5a7a' },
  { name: 'SQUIDGEON', full: 'Squidgeon', food: 'jelly octopus', color: 0x4fd1ff, css: '#4fd1ff' },
  { name: 'CRABBAGE', full: 'Crabbage', food: 'cheese crab', color: 0xffd24a, css: '#ffd24a' },
  { name: 'BLOBLIN', full: 'Bloblin', food: 'lime jelly', color: 0x8dff6a, css: '#8dff6a' },
  { name: 'MOTHBALL', full: 'Mothball', food: 'marshmallow moth', color: 0xb98cff, css: '#b98cff' },
  { name: 'TOASTBAT', full: 'Toastbat', food: 'toast bat', color: 0xff9a3c, css: '#ff9a3c' },
  { name: 'DUMPLORD', full: 'Dumplord', food: 'dumpling lord', color: 0xf3e3c3, css: '#f3e3c3' },
  { name: 'NORIGON', full: 'Norigon', food: 'sushi dragon', color: 0x21c7a8, css: '#21c7a8' },
];
