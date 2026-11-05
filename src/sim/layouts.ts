export type ObstacleStyle =
  | 'cup' | 'shaker' | 'bowl' | 'candle' | 'napkin' | 'bread' | 'gravy'
  | 'soy' | 'sushi' | 'teapot' | 'cake' | 'gift' | 'cupcake' | 'tomato' | 'onion' | 'carrot' | 'garlic'
  | 'ketchup' | 'mustard' | 'pancakes' | 'egg' | 'sundae' | 'shake' | 'cone' | 'basket' | 'melon' | 'lemonade' | 'sandwich'
  | 'croissant' | 'flour' | 'rollingpin' | 'cupcakes' | 'dumplings' | 'noodles' | 'teacup' | 'toaster' | 'jam' | 'cereal'
  | 'icetray' | 'peas' | 'popsicle' | 'tub' | 'gumdrop' | 'lollipop' | 'candyjar' | 'knifeblock' | 'pot' | 'pan';

export type Obstacle =
  | { shape: 'circle'; x: number; y: number; r: number; style: ObstacleStyle }
  | { shape: 'rect'; x: number; y: number; w: number; h: number; style: ObstacleStyle };

export type HazardKind = 'hand' | 'wind' | 'cleaver' | 'burner' | 'toaster';

/** A conveyor strip: anything sitting on it is carried sideways at vx px/s. */
export interface Belt {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy?: number; // vertical belts (the picnic ant trail)
}

/** Breakfast Rush toaster: fires toast from (x,y) along angle a (radians). */
export interface Toaster {
  x: number;
  y: number;
  a: number;
}

/** Banquet Lazy Susan: a turntable that spins everything on it. */
export interface Turntable {
  x: number;
  y: number;
  r: number;
  spin: number; // rad/s
}

/** A circular zone (Ice Cream Parlour puddles, Diner Griddle burners). */
export interface Zone {
  x: number;
  y: number;
  r: number;
}

export interface Layout {
  name: string;
  /** Art key of the table surface. */
  table: 'bg-table' | 'bg-sushi' | 'bg-party' | 'bg-board' | 'bg-griddle' | 'bg-parlour' | 'bg-picnic' | 'bg-bakery' | 'bg-banquet' | 'bg-breakfast'
    | 'bg-freezer' | 'bg-candy' | 'bg-nightmare';
  hazards: HazardKind[];
  belts?: Belt[];
  spills?: Zone[]; // slippery: you slide instead of stopping
  burners?: Zone[]; // Diner Griddle burners (hazard 'burner')
  stickies?: Zone[]; // Bakery dough: slows you down
  turntable?: Turntable; // Banquet Lazy Susan
  toasters?: Toaster[]; // Breakfast Rush (hazard 'toaster')
  slippery?: boolean; // Freezer Shelf: the whole table is ice
  /** Unlocked in Story mode (see src/story/unlocks.ts). */
  locked?: boolean;
  obstacles: Obstacle[];
  spawns: [number, number][];
  blurb: string;
}

// Table spans x 100..1180, y 95..670 (centre 640, 382).
// Append new tables at the END (tests and saved choices refer to indices).
export const LAYOUTS: Layout[] = [
  {
    name: 'Sunday Roast',
    table: 'bg-table',
    hazards: ['hand'],
    blurb: 'The classic. Watch for the giant hand.',
    obstacles: [
      { shape: 'rect', x: 575, y: 345, w: 130, h: 75, style: 'gravy' },
      { shape: 'circle', x: 330, y: 250, r: 34, style: 'cup' },
      { shape: 'circle', x: 950, y: 515, r: 34, style: 'cup' },
      { shape: 'circle', x: 330, y: 515, r: 18, style: 'shaker' },
      { shape: 'circle', x: 950, y: 250, r: 18, style: 'shaker' },
    ],
    spawns: [[180, 170], [1100, 595], [1100, 170], [180, 595], [160, 382], [1120, 382]],
  },
  {
    name: 'Dinner for Four',
    table: 'bg-table',
    hazards: ['hand'],
    blurb: 'Four cups, one candle, no mercy.',
    obstacles: [
      { shape: 'circle', x: 400, y: 270, r: 30, style: 'cup' },
      { shape: 'circle', x: 880, y: 270, r: 30, style: 'cup' },
      { shape: 'circle', x: 400, y: 495, r: 30, style: 'cup' },
      { shape: 'circle', x: 880, y: 495, r: 30, style: 'cup' },
      { shape: 'circle', x: 640, y: 382, r: 22, style: 'candle' },
      { shape: 'rect', x: 615, y: 140, w: 50, h: 70, style: 'napkin' },
      { shape: 'rect', x: 615, y: 555, w: 50, h: 70, style: 'napkin' },
    ],
    spawns: [[170, 160], [1110, 605], [1110, 160], [170, 605], [160, 382], [1120, 382]],
  },
  {
    name: 'Leftovers',
    table: 'bg-table',
    hazards: ['hand'],
    blurb: 'Hide behind the bread. Mind the soup.',
    obstacles: [
      { shape: 'rect', x: 300, y: 190, w: 44, h: 180, style: 'bread' },
      { shape: 'rect', x: 936, y: 395, w: 44, h: 180, style: 'bread' },
      { shape: 'circle', x: 640, y: 382, r: 60, style: 'bowl' },
      { shape: 'circle', x: 500, y: 565, r: 16, style: 'shaker' },
      { shape: 'circle', x: 780, y: 200, r: 16, style: 'shaker' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 382], [1120, 382]],
  },
  {
    name: 'Sushi Bar',
    table: 'bg-sushi',
    hazards: ['hand'],
    blurb: 'A conveyor belt carries everything (and everyone) sideways.',
    belts: [{ x: 100, y: 342, w: 1080, h: 82, vx: 130 }],
    obstacles: [
      { shape: 'circle', x: 330, y: 215, r: 22, style: 'soy' },
      { shape: 'circle', x: 950, y: 215, r: 34, style: 'sushi' },
      { shape: 'circle', x: 330, y: 552, r: 34, style: 'sushi' },
      { shape: 'circle', x: 950, y: 552, r: 30, style: 'teapot' },
      { shape: 'circle', x: 640, y: 205, r: 18, style: 'soy' },
      { shape: 'circle', x: 640, y: 560, r: 18, style: 'soy' },
    ],
    spawns: [[170, 160], [1110, 605], [1110, 160], [170, 605], [470, 140], [810, 625]],
  },
  {
    name: 'Birthday Bash',
    table: 'bg-party',
    hazards: ['wind'],
    blurb: 'Gusts of wind try to blow everyone off the table. Brace!',
    obstacles: [
      { shape: 'circle', x: 640, y: 382, r: 68, style: 'cake' },
      { shape: 'rect', x: 255, y: 175, w: 72, h: 64, style: 'gift' },
      { shape: 'rect', x: 953, y: 526, w: 72, h: 64, style: 'gift' },
      { shape: 'circle', x: 290, y: 560, r: 22, style: 'cupcake' },
      { shape: 'circle', x: 990, y: 205, r: 22, style: 'cupcake' },
    ],
    spawns: [[180, 380], [1100, 380], [640, 150], [640, 615], [170, 160], [1110, 605]],
  },
  {
    name: "Chef's Board",
    table: 'bg-board',
    hazards: ['cleaver'],
    blurb: 'The cleaver chops down marked lanes. Get out of the red!',
    obstacles: [
      { shape: 'circle', x: 420, y: 255, r: 32, style: 'tomato' },
      { shape: 'circle', x: 860, y: 510, r: 30, style: 'onion' },
      { shape: 'rect', x: 560, y: 560, w: 160, h: 36, style: 'carrot' },
      { shape: 'circle', x: 900, y: 235, r: 18, style: 'garlic' },
      { shape: 'circle', x: 380, y: 520, r: 18, style: 'garlic' },
    ],
    spawns: [[170, 160], [1110, 605], [1110, 160], [170, 605], [160, 382], [1120, 382]],
  },
  {
    name: 'Diner Griddle',
    table: 'bg-griddle',
    hazards: ['burner'],
    blurb: 'Burners glow, then FLARE. Do not be standing on one.',
    burners: [{ x: 385, y: 255, r: 60 }, { x: 895, y: 255, r: 60 }, { x: 385, y: 510, r: 60 }, { x: 895, y: 510, r: 60 }],
    obstacles: [
      { shape: 'circle', x: 640, y: 382, r: 46, style: 'pancakes' },
      { shape: 'rect', x: 585, y: 150, w: 110, h: 36, style: 'ketchup' },
      { shape: 'rect', x: 585, y: 580, w: 110, h: 36, style: 'mustard' },
      { shape: 'circle', x: 195, y: 382, r: 28, style: 'egg' },
      { shape: 'circle', x: 1085, y: 382, r: 28, style: 'egg' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [450, 130], [830, 632]],
  },
  {
    name: 'Ice Cream Parlour',
    table: 'bg-parlour',
    hazards: ['hand'],
    blurb: 'Melted puddles are slippery: you slide right off them.',
    spills: [{ x: 420, y: 300, r: 72 }, { x: 860, y: 470, r: 72 }, { x: 640, y: 585, r: 52 }, { x: 640, y: 175, r: 52 }],
    obstacles: [
      { shape: 'circle', x: 640, y: 382, r: 40, style: 'sundae' },
      { shape: 'circle', x: 300, y: 520, r: 26, style: 'shake' },
      { shape: 'circle', x: 980, y: 245, r: 26, style: 'shake' },
      { shape: 'rect', x: 240, y: 205, w: 120, h: 40, style: 'cone' },
      { shape: 'rect', x: 920, y: 530, w: 120, h: 40, style: 'cone' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 382], [1120, 382]],
  },
  {
    name: 'Picnic Blanket',
    table: 'bg-picnic',
    hazards: ['hand'],
    blurb: 'An ant trail marches down the middle, carrying everything with it.',
    belts: [{ x: 598, y: 95, w: 84, h: 575, vx: 0, vy: 115 }],
    obstacles: [
      { shape: 'rect', x: 250, y: 300, w: 130, h: 90, style: 'basket' },
      { shape: 'circle', x: 1000, y: 255, r: 44, style: 'melon' },
      { shape: 'circle', x: 975, y: 540, r: 30, style: 'lemonade' },
      { shape: 'rect', x: 330, y: 540, w: 64, h: 64, style: 'sandwich' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 382], [1120, 382]],
  },
  {
    name: 'Bakery Bench',
    table: 'bg-bakery',
    hazards: ['hand'],
    blurb: 'Sticky dough slows you to a crawl. Easy pickings!',
    stickies: [{ x: 420, y: 275, r: 66 }, { x: 860, y: 490, r: 66 }, { x: 860, y: 215, r: 46 }, { x: 420, y: 550, r: 46 }],
    obstacles: [
      { shape: 'circle', x: 640, y: 382, r: 44, style: 'flour' },
      { shape: 'rect', x: 560, y: 590, w: 160, h: 32, style: 'rollingpin' },
      { shape: 'rect', x: 270, y: 395, w: 100, h: 44, style: 'croissant' },
      { shape: 'circle', x: 1010, y: 360, r: 34, style: 'cupcakes' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 300], [1120, 470]],
  },
  {
    name: 'Banquet Lazy Susan',
    table: 'bg-banquet',
    hazards: ['hand'],
    blurb: 'A giant turntable spins everything on it. Ride it, or get flung!',
    turntable: { x: 640, y: 382, r: 205, spin: 0.7 },
    obstacles: [
      { shape: 'circle', x: 300, y: 205, r: 34, style: 'dumplings' },
      { shape: 'circle', x: 980, y: 560, r: 36, style: 'noodles' },
      { shape: 'circle', x: 300, y: 560, r: 20, style: 'teacup' },
      { shape: 'circle', x: 980, y: 205, r: 20, style: 'teacup' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 382], [1120, 382]],
  },
  {
    name: 'Breakfast Rush',
    table: 'bg-breakfast',
    hazards: ['toaster'],
    blurb: 'Toasters shake, then fire hot toast across the table. Duck!',
    toasters: [{ x: 188, y: 296, a: 0 }, { x: 1092, y: 496, a: Math.PI }, { x: 640, y: 160, a: Math.PI / 2 }],
    obstacles: [
      { shape: 'rect', x: 116, y: 270, w: 70, h: 52, style: 'toaster' },
      { shape: 'rect', x: 1094, y: 470, w: 70, h: 52, style: 'toaster' },
      { shape: 'rect', x: 610, y: 105, w: 60, h: 52, style: 'toaster' },
      { shape: 'circle', x: 640, y: 420, r: 28, style: 'jam' },
      { shape: 'circle', x: 380, y: 560, r: 36, style: 'cereal' },
      { shape: 'circle', x: 900, y: 230, r: 36, style: 'cereal' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 400], [1120, 330]],
  },
  {
    name: 'Freezer Shelf',
    table: 'bg-freezer',
    hazards: ['hand'],
    locked: true,
    blurb: 'The whole table is ICE. Every step slides. (Story unlock)',
    slippery: true,
    obstacles: [
      { shape: 'rect', x: 560, y: 340, w: 160, h: 84, style: 'icetray' },
      { shape: 'rect', x: 300, y: 205, w: 96, h: 70, style: 'peas' },
      { shape: 'rect', x: 884, y: 490, w: 96, h: 70, style: 'peas' },
      { shape: 'circle', x: 330, y: 540, r: 40, style: 'tub' },
      { shape: 'rect', x: 860, y: 215, w: 120, h: 36, style: 'popsicle' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 382], [1120, 382]],
  },
  {
    name: 'Candy Shop',
    table: 'bg-candy',
    hazards: ['hand'],
    locked: true,
    blurb: 'Gumdrop bumpers fling anyone who bumps into them. Pinball! (Story unlock)',
    obstacles: [
      { shape: 'circle', x: 640, y: 382, r: 36, style: 'gumdrop' },
      { shape: 'circle', x: 420, y: 250, r: 30, style: 'gumdrop' },
      { shape: 'circle', x: 860, y: 250, r: 30, style: 'gumdrop' },
      { shape: 'circle', x: 420, y: 515, r: 30, style: 'gumdrop' },
      { shape: 'circle', x: 860, y: 515, r: 30, style: 'gumdrop' },
      { shape: 'circle', x: 640, y: 175, r: 26, style: 'lollipop' },
      { shape: 'circle', x: 640, y: 590, r: 34, style: 'candyjar' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 382], [1120, 382]],
  },
  {
    name: "Chef's Nightmare",
    table: 'bg-nightmare',
    hazards: ['hand', 'burner', 'toaster'],
    locked: true,
    blurb: 'Burners, toasters AND the giant hand. Good luck. (Story unlock)',
    burners: [{ x: 420, y: 260, r: 56 }, { x: 860, y: 505, r: 56 }],
    toasters: [{ x: 188, y: 520, a: 0 }, { x: 1092, y: 245, a: Math.PI }],
    obstacles: [
      { shape: 'rect', x: 116, y: 494, w: 70, h: 52, style: 'toaster' },
      { shape: 'rect', x: 1094, y: 219, w: 70, h: 52, style: 'toaster' },
      { shape: 'circle', x: 640, y: 382, r: 44, style: 'pot' },
      { shape: 'rect', x: 600, y: 140, w: 80, h: 56, style: 'knifeblock' },
      { shape: 'circle', x: 860, y: 260, r: 32, style: 'pan' },
      { shape: 'circle', x: 420, y: 505, r: 32, style: 'pan' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615], [160, 382], [1120, 382]],
  },
];
