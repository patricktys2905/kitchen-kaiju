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
};

export const COLORS = [0xff5a7a, 0x4fd1ff, 0xffd24a, 0x8dff6a];
export const COLOR_CSS = ['#ff5a7a', '#4fd1ff', '#ffd24a', '#8dff6a'];

export const SPECIES = [
  { name: 'GOBZILLA', full: 'Gobzilla Jr.' },
  { name: 'SQUIDGEON', full: 'Squidgeon' },
  { name: 'CRABBAGE', full: 'Crabbage' },
  { name: 'BLOBLIN', full: 'Bloblin' },
];
