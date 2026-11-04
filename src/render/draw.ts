// Shapes-first art. Everything is drawn with Phaser Graphics so real sprites can replace it piece by piece later.
import type * as Phaser from 'phaser';
import { P, RULES, TABLE, VIEW } from '../sim/constants';
import { CUTLERY } from '../sim/cutlery';
import type { Belt, Layout, Obstacle, Toaster, Turntable, Zone } from '../sim/layouts';
import type { Burner, Cleaver, Crumb, Cutlery, Hand, Player, Toast, ToasterState, Wind } from '../sim/world';

type G = Phaser.GameObjects.Graphics;
type Pt = [number, number];

export function shade(color: number, f: number): number {
  const r = (color >> 16) & 255, g = (color >> 8) & 255, b = color & 255;
  const m = (v: number) => Math.max(0, Math.min(255, Math.round(f >= 1 ? v + (255 - v) * (f - 1) : v * f)));
  return (m(r) << 16) | (m(g) << 8) | m(b);
}

function poly(g: G, pts: Pt[], x: number, y: number, a: number, s = 1): void {
  const c = Math.cos(a), si = Math.sin(a);
  const out = pts.map(([px, py]) => ({ x: x + (px * c - py * si) * s, y: y + (px * si + py * c) * s }));
  g.fillPoints(out as unknown as Phaser.Math.Vector2[], true); // runtime only reads x/y
}

function ellipse(cx: number, cy: number, rx: number, ry: number, n = 14): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    out.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return out;
}

// ------------------------------------------------------------------ table
export function drawFloor(g: G): void {
  g.fillStyle(0x1a120d, 1);
  g.fillRect(0, 0, VIEW.w, VIEW.h);
  for (let y = 0; y < VIEW.h; y += 80) {
    for (let x = 0; x < VIEW.w; x += 80) {
      if (((x + y) / 80) % 2 === 0) {
        g.fillStyle(0x221813, 1);
        g.fillRect(x, y, 80, 80);
      }
    }
  }
}

export function drawTable(g: G, layout: Layout): void {
  g.clear();
  drawFloor(g);
  drawTableFrame(g, layout.table);
  drawTableSurface(g, layout.table);
  drawTableRim(g);
  for (const o of layout.obstacles) drawObstacle(g, o);
}

export function drawTableShadow(g: G): void {
  g.fillStyle(0x000000, 0.45);
  g.fillRoundedRect(TABLE.x + 10, TABLE.y + 16, TABLE.w, TABLE.h, 22);
}

/** Wood planks + grain + linen runner (shape fallback for the painted table). */
const SURFACE: Record<Layout['table'], number> = {
  'bg-table': 0x9a6438, 'bg-sushi': 0xd9c08a, 'bg-party': 0xf3b6cc, 'bg-board': 0xb88452,
  'bg-griddle': 0x8d939b, 'bg-parlour': 0xbfe8d6, 'bg-picnic': 0xe8a0a0,
  'bg-bakery': 0xe8d3a8, 'bg-banquet': 0xa8283a, 'bg-breakfast': 0xf6e7a0,
};
export function drawTableSurface(g: G, table: Layout['table'] = 'bg-table'): void {
  g.fillStyle(SURFACE[table], 1);
  g.fillRoundedRect(TABLE.x, TABLE.y, TABLE.w, TABLE.h, 22);
  g.lineStyle(2, 0x84522c, 1);
  for (let y = TABLE.y + 72; y < TABLE.y + TABLE.h - 10; y += 72) g.lineBetween(TABLE.x + 6, y, TABLE.x + TABLE.w - 6, y);
  g.lineStyle(1, 0x8c5a32, 0.8);
  for (let i = 0; i < 70; i++) {
    const x = TABLE.x + 20 + ((i * 157) % (TABLE.w - 80)), y = TABLE.y + 14 + ((i * 89) % (TABLE.h - 28));
    g.lineBetween(x, y, x + 30 + (i % 4) * 12, y);
  }
  g.fillStyle(0xf3e6cc, 0.12);
  g.fillRect(TABLE.x, TABLE.y + TABLE.h / 2 - 90, TABLE.w, 180);
}

/** Thin contact line where the playing surface meets the frame. */
export function drawTableRim(g: G): void {
  g.lineStyle(4, 0x000000, 0.22);
  g.strokeRoundedRect(TABLE.x + 1, TABLE.y + 1, TABLE.w - 2, TABLE.h - 2, 22);
  g.lineStyle(2, 0xffffff, 0.18);
  g.strokeRoundedRect(TABLE.x - 1, TABLE.y - 1, TABLE.w + 2, TABLE.h + 2, 23);
}

interface FrameStyle { frame: number; hi: number; lip: number; depth: number }
const FRAMES: Record<Layout['table'], FrameStyle> = {
  'bg-table': { frame: 0x6b3e20, hi: 0xa8703f, lip: 0x3e2211, depth: 16 },
  'bg-sushi': { frame: 0xc9a46a, hi: 0xeed6a4, lip: 0x8a6838, depth: 14 },
  'bg-party': { frame: 0xf0a6c0, hi: 0xffd6e4, lip: 0xc7708f, depth: 18 },
  'bg-board': { frame: 0x9b6a3c, hi: 0xcf9a62, lip: 0x5e3b1f, depth: 22 },
  'bg-griddle': { frame: 0x3d4248, hi: 0x9aa3ad, lip: 0x22262a, depth: 18 },
  'bg-parlour': { frame: 0xff9ec4, hi: 0xffd6e6, lip: 0xc96a91, depth: 14 },
  'bg-picnic': { frame: 0x6fae4a, hi: 0x9fd46e, lip: 0x4a7e2e, depth: 8 },
  'bg-bakery': { frame: 0xb08050, hi: 0xe2b27a, lip: 0x765230, depth: 18 },
  'bg-banquet': { frame: 0x3a1a10, hi: 0xd4a640, lip: 0x22100a, depth: 20 },
  'bg-breakfast': { frame: 0x5aa7d6, hi: 0x9fd2f0, lip: 0x3a7aa6, depth: 14 },
};

/** Soft floor shadow, the table's 3D front lip and its frame, styled per table. */
export function drawTableFrame(g: G, table: Layout['table']): void {
  const F = FRAMES[table], b = 12;
  // soft shadow on the floor (stacked translucent layers)
  for (let i = 0; i < 7; i++) {
    g.fillStyle(0x000000, 0.06);
    g.fillRoundedRect(TABLE.x - b - 10 + i * 3 + 8, TABLE.y - b - 4 + i * 3 + 18, TABLE.w + 2 * b + 20 - i * 6, TABLE.h + 2 * b + F.depth + 14 - i * 6, 34);
  }
  // front lip (the table's thickness)
  g.fillStyle(F.lip, 1);
  g.fillRoundedRect(TABLE.x - b, TABLE.y - b, TABLE.w + 2 * b, TABLE.h + 2 * b + F.depth, 28);
  if (table === 'bg-board') {
    // end-grain stripes on the butcher block's front face
    g.fillStyle(0x4a2e17, 0.55);
    for (let x = TABLE.x; x < TABLE.x + TABLE.w; x += 26) g.fillRect(x, TABLE.y + TABLE.h + b, 3, F.depth - 2);
  }
  // frame band + top highlight
  g.fillStyle(F.frame, 1);
  g.fillRoundedRect(TABLE.x - b, TABLE.y - b, TABLE.w + 2 * b, TABLE.h + 2 * b, 28);
  g.lineStyle(3, F.hi, 0.9);
  g.strokeRoundedRect(TABLE.x - b + 2, TABLE.y - b + 2, TABLE.w + 2 * b - 4, TABLE.h + 2 * b - 4, 26);
  if (table === 'bg-party') {
    // the tablecloth hangs over the front edge in scallops
    const y = TABLE.y + TABLE.h + b + F.depth - 6;
    for (let x = TABLE.x - b + 16; x < TABLE.x + TABLE.w + b - 8; x += 32) {
      g.fillStyle(F.lip, 1); g.fillCircle(x, y + 2, 16);
      g.fillStyle(F.frame, 1); g.fillCircle(x, y - 2, 15);
      g.fillStyle(0xffffff, 0.6); g.fillCircle(x - 4, y - 6, 3);
    }
  }
}

/** Place mat under a player's starting spot (shape fallback), rimmed in their colour. */
export function drawMat(g: G, x: number, y: number, color: number, table: Layout['table']): void {
  const fill: Record<Layout['table'], number> = {
    'bg-table': 0xd9b878, 'bg-sushi': 0x9fc26a, 'bg-party': 0xfff1f6, 'bg-board': 0x4a4e57,
    'bg-griddle': 0xf4f0e6, 'bg-parlour': 0xe8fff4, 'bg-picnic': 0xfff3a8,
    'bg-bakery': 0xf7f4ee, 'bg-banquet': 0xc0303c, 'bg-breakfast': 0xfff4c0,
  };
  g.fillStyle(0x000000, 0.18); g.fillRoundedRect(x - 54, y - 38, 112, 82, 12);
  g.fillStyle(fill[table], 0.9); g.fillRoundedRect(x - 56, y - 41, 112, 82, 12);
  g.lineStyle(3, color, 0.85); g.strokeRoundedRect(x - 56, y - 41, 112, 82, 12);
}

/** Soft drop shadow under an obstacle sprite (rounded to follow the painted shapes). */
export function drawObstacleShadow(g: G, o: Obstacle): void {
  g.fillStyle(0x000000, 0.28);
  if (o.shape === 'circle') { g.fillCircle(o.x + 5, o.y + 7, o.r); return; }
  if (o.style === 'gravy') { g.fillEllipse(o.x + o.w / 2 + 6, o.y + o.h / 2 + 8, o.w * 0.95, o.h * 0.75); return; }
  // long thin things (bottles, cones, carrots, bread) get a pill-shaped shadow
  const pill = ['bread', 'cone', 'ketchup', 'mustard', 'carrot', 'croissant', 'rollingpin'].includes(o.style);
  if (pill) {
    if (o.h > o.w) g.fillRoundedRect(o.x + o.w * 0.12 + 5, o.y + 8, o.w * 0.8, o.h - 6, (o.w * 0.8) / 2); // vertical (bread)
    else g.fillRoundedRect(o.x + 8, o.y + o.h * 0.15 + 6, o.w - 10, o.h * 0.75, (o.h * 0.75) / 2);
    return;
  }
  g.fillRoundedRect(o.x + 5, o.y + 7, o.w, o.h, Math.min(o.w, o.h) * 0.15);
}

const FALLBACK_COLORS: Partial<Record<Obstacle['style'], number>> = {
  soy: 0x3a2214, sushi: 0x24407a, teapot: 0x3f6b3a, cake: 0xff9ec4, gift: 0x4f8fe0, cupcake: 0x9ff0d0,
  tomato: 0xe8392f, onion: 0xa04a8c, carrot: 0xff8a2a, garlic: 0xf2ece0,
  ketchup: 0xd8281e, mustard: 0xf2c418, pancakes: 0xd99a4e, egg: 0xfff8e8, sundae: 0xffc4dc, shake: 0xff9ec4, cone: 0xd8a35a,
  basket: 0xb07a3e, melon: 0x4caf50, lemonade: 0xfff176, sandwich: 0xe8c27a,
  croissant: 0xe0a24a, flour: 0xf4efe6, rollingpin: 0xc8925a, cupcakes: 0xffb6d0, dumplings: 0xd8b06a, noodles: 0xf0e0b0,
  teacup: 0xe8f4e0, toaster: 0xc8d0d8, jam: 0xd8283e, cereal: 0xf0c060,
};

export function drawObstacle(g: G, o: Obstacle): void {
  if (o.shape === 'circle') {
    g.fillStyle(0x000000, 0.3);
    g.fillCircle(o.x + 5, o.y + 7, o.r);
    switch (o.style) {
      case 'cup':
        g.fillStyle(0xeee9de, 1); g.fillCircle(o.x, o.y, o.r);
        g.fillStyle(0xd8d1c2, 1); g.fillRoundedRect(o.x + o.r - 4, o.y - 6, 16, 12, 5);
        g.fillStyle(0x5a3018, 1); g.fillCircle(o.x, o.y, o.r * 0.75);
        g.fillStyle(0x7a4526, 1); g.fillCircle(o.x - o.r * 0.2, o.y - o.r * 0.2, o.r * 0.3);
        break;
      case 'shaker':
        g.fillStyle(0xdedede, 1); g.fillCircle(o.x, o.y, o.r);
        g.fillStyle(0x9a9a9a, 1); g.fillCircle(o.x, o.y, o.r * 0.7);
        g.fillStyle(0x333333, 1);
        for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; g.fillCircle(o.x + Math.cos(a) * o.r * 0.35, o.y + Math.sin(a) * o.r * 0.35, 1.8); }
        break;
      case 'bowl':
        g.fillStyle(0xf4f0e6, 1); g.fillCircle(o.x, o.y, o.r);
        g.fillStyle(0xd06a2a, 1); g.fillCircle(o.x, o.y, o.r * 0.8);
        g.fillStyle(0xe58a3f, 1); g.fillCircle(o.x - 12, o.y - 10, 10); g.fillCircle(o.x + 15, o.y + 8, 7);
        g.fillStyle(0x6f9e3b, 1); g.fillCircle(o.x + 5, o.y - 18, 5); g.fillCircle(o.x - 18, o.y + 14, 4);
        break;
      case 'candle':
        g.fillStyle(0xbfa16a, 1); g.fillCircle(o.x, o.y, o.r);
        g.fillStyle(0xfff3c4, 1); g.fillCircle(o.x, o.y, o.r * 0.65);
        g.fillStyle(0x333333, 1); g.fillCircle(o.x, o.y, 2.5);
        break;
      default: {
        const c = FALLBACK_COLORS[o.style] ?? 0xcccccc;
        g.fillStyle(shade(c, 0.7), 1); g.fillCircle(o.x, o.y, o.r);
        g.fillStyle(c, 1); g.fillCircle(o.x, o.y, o.r * 0.82);
        g.fillStyle(0xffffff, 0.35); g.fillCircle(o.x - o.r * 0.3, o.y - o.r * 0.3, o.r * 0.25);
      }
    }
  } else {
    g.fillStyle(0x000000, 0.3);
    g.fillRoundedRect(o.x + 5, o.y + 7, o.w, o.h, 8);
    switch (o.style) {
      case 'gravy':
        g.fillStyle(0xeee9de, 1); g.fillRoundedRect(o.x, o.y, o.w, o.h, 30);
        g.fillStyle(0x6b3b1c, 1); g.fillRoundedRect(o.x + 10, o.y + 10, o.w - 20, o.h - 20, 22);
        g.fillStyle(0x8a5228, 1); g.fillEllipse(o.x + o.w * 0.4, o.y + o.h * 0.4, 30, 12);
        break;
      case 'napkin':
        g.fillStyle(0xdce8f2, 1); g.fillRoundedRect(o.x, o.y, o.w, o.h, 4);
        g.lineStyle(2, 0xaec3d6, 1); g.lineBetween(o.x, o.y, o.x + o.w, o.y + o.h); g.lineBetween(o.x + o.w / 2, o.y, o.x + o.w / 2, o.y + o.h);
        break;
      case 'bread':
        g.fillStyle(0x8a5a2b, 1); g.fillRoundedRect(o.x, o.y, o.w, o.h, 14);
        g.fillStyle(0xd59a52, 1); g.fillRoundedRect(o.x + 4, o.y + 4, o.w - 8, o.h - 8, 12);
        g.lineStyle(2, 0xa86f33, 1);
        for (let y = o.y + 25; y < o.y + o.h - 10; y += 30) g.lineBetween(o.x + 8, y, o.x + o.w - 8, y - 8);
        break;
      default: {
        const c = FALLBACK_COLORS[o.style] ?? 0xcccccc;
        g.fillStyle(c, 1); g.fillRoundedRect(o.x, o.y, o.w, o.h, Math.min(o.w, o.h) / 3);
      }
    }
  }
}

/** Animated bits of the table (candle flame), drawn every frame. */
export function drawTableLive(g: G, layout: Layout, t: number): void {
  for (const o of layout.obstacles) {
    if (o.style === 'candle' && o.shape === 'circle') {
      const f = 1 + Math.sin(t * 17) * 0.15 + Math.sin(t * 7) * 0.1;
      g.fillStyle(0xffa630, 0.25); g.fillCircle(o.x, o.y - 2, 22 * f);
      g.fillStyle(0xffc84a, 1); g.fillCircle(o.x, o.y - 2, 7 * f);
      g.fillStyle(0xfff6d0, 1); g.fillCircle(o.x, o.y - 2, 3.5 * f);
    }
  }
}

// ------------------------------------------------------------------ crumbs
const CRUMB_COLORS = [0xe0b06a, 0x7fbf4a, 0xf5f1e3];
export function drawCrumbs(g: G, crumbs: Crumb[], t: number): void {
  for (const c of crumbs) {
    const bob = Math.sin(t * 3 + c.id) * 0.6;
    g.fillStyle(0x000000, 0.25);
    g.fillCircle(c.x + 1.5, c.y + 2, 4.5);
    g.fillStyle(CRUMB_COLORS[c.variant], 1);
    if (c.variant === 2) g.fillEllipse(c.x, c.y + bob, 9, 5);
    else g.fillCircle(c.x, c.y + bob, c.variant === 1 ? 4.5 : 4);
  }
}

// ------------------------------------------------------------------ cutlery
const SILVER = 0xd5dce3, SILVER_DARK = 0x8d98a3;

export function drawCutleryShape(g: G, kind: Cutlery['kind'], x: number, y: number, a: number, s = 1): void {
  switch (kind) {
    case 'fork':
      g.fillStyle(SILVER, 1);
      poly(g, [[-16, -2], [8, -2.4], [8, 2.4], [-16, 2]], x, y, a, s);
      poly(g, [[8, -5.5], [13, -5.5], [13, 5.5], [8, 5.5]], x, y, a, s);
      for (const o of [-4.6, -1.2, 2.2]) poly(g, [[13, o], [23, o], [23, o + 2.4], [13, o + 2.4]], x, y, a, s);
      break;
    case 'spoon':
      g.fillStyle(SILVER, 1);
      poly(g, [[-16, -2], [6, -2], [6, 2], [-16, 2]], x, y, a, s);
      poly(g, ellipse(14, 0, 9, 6.5), x, y, a, s);
      g.fillStyle(SILVER_DARK, 1);
      poly(g, ellipse(14, 0, 5.5, 3.5, 10), x, y, a, s);
      break;
    case 'knife':
      g.fillStyle(0x4a3628, 1);
      poly(g, [[-16, -3], [0, -3], [0, 3], [-16, 3]], x, y, a, s);
      g.fillStyle(SILVER, 1);
      poly(g, [[0, -3.5], [18, -2.5], [23, 1], [18, 3.5], [0, 3.5]], x, y, a, s);
      break;
    case 'chopstick':
      g.fillStyle(0xc9935a, 1);
      poly(g, [[-21, -1.8], [21, -1], [21, 1], [-21, 1.8]], x, y, a, s);
      g.fillStyle(0xa8352b, 1);
      poly(g, [[-21, -1.8], [-14, -1.7], [-14, 1.7], [-21, 1.8]], x, y, a, s);
      break;
    case 'ladle':
      g.fillStyle(SILVER, 1);
      poly(g, [[-24, -2.4], [4, -2.4], [4, 2.4], [-24, 2.4]], x, y, a, s);
      poly(g, ellipse(15, 0, 12, 12, 16), x, y, a, s);
      g.fillStyle(SILVER_DARK, 1);
      poly(g, ellipse(15, 0, 8, 8, 12), x, y, a, s);
      break;
    case 'spork':
      g.fillStyle(0xffcf5a, 1);
      poly(g, [[-16, -2], [6, -2], [6, 2], [-16, 2]], x, y, a, s);
      poly(g, ellipse(14, 0, 9, 6.5), x, y, a, s);
      g.fillStyle(0x9a6b10, 1);
      for (const o of [-3.2, 0, 3.2]) poly(g, [[18, o - 0.8], [23.5, o - 0.8], [23.5, o + 0.8], [18, o + 0.8]], x, y, a, s);
      break;
  }
}

/** Owner-coloured glow / ground shadow under a piece of cutlery. */
export function drawCutleryGlow(g: G, c: Cutlery, colors: number[], t: number): void {
  const owner = c.owner === null ? null : colors[c.owner];
  if (c.state === 'flying') {
    g.fillStyle(owner ?? 0xffffff, 0.3);
    g.fillCircle(c.x, c.y, 15);
    g.lineStyle(3, owner ?? 0xffffff, 0.25);
    g.lineBetween(c.x, c.y, c.x - c.vx * 0.04, c.y - c.vy * 0.04);
  } else if (c.state === 'stuck' || c.state === 'returning') {
    const pulse = 0.5 + 0.5 * Math.sin(t * 5 + c.id);
    if (owner === null) {
      g.fillStyle(0xffffff, 0.12 + 0.12 * pulse); g.fillCircle(c.x, c.y, 20);
    } else {
      g.lineStyle(2, owner, 0.35 + 0.25 * pulse); g.strokeCircle(c.x, c.y, 17);
    }
    g.fillStyle(0x000000, 0.3);
    g.fillEllipse(c.x + 2, c.y + 3, 30, 8);
  }
}

export function cutleryAngle(c: Cutlery): number {
  return c.angle + (CUTLERY[c.kind].spin ? c.spin : 0);
}

export function drawCutlery(g: G, c: Cutlery, colors: number[], t: number): void {
  drawCutleryGlow(g, c, colors, t);
  const a = cutleryAngle(c);
  if (c.kind === 'chopstick' && c.state === 'held') {
    const ox = Math.cos(a + Math.PI / 2) * 3, oy = Math.sin(a + Math.PI / 2) * 3;
    drawCutleryShape(g, c.kind, c.x - ox, c.y - oy, a, 0.8);
    drawCutleryShape(g, c.kind, c.x + ox, c.y + oy, a, 0.8);
  } else {
    drawCutleryShape(g, c.kind, c.x, c.y, a, c.state === 'held' ? 0.8 : 1);
  }
}

// ------------------------------------------------------------------ kaiju
export interface KaijuLook {
  x: number;
  y: number;
  r: number;
  aim: number;
  kaiju: boolean;
  species: number;
  color: number;
}

export function drawKaiju(g: G, look: KaijuLook, t: number, alpha = 1): void {
  const k = { ...look, species: look.species % 4 }; // shape fallback has 4 body types
  const { x, y, r, aim, color } = k;
  const dark = shade(color, 0.6), light = shade(color, 1.35);
  const back = aim + Math.PI;
  g.fillStyle(0x000000, 0.28 * alpha);
  g.fillEllipse(x + 3, y + r * 0.35, r * 2.3, r * 1.7);

  // Behind-the-body features
  g.fillStyle(dark, alpha);
  if (k.species === 0) {
    for (const o of [-0.55, 0, 0.55]) {
      const a = back + o;
      const bx = x + Math.cos(a) * r * 0.75, by = y + Math.sin(a) * r * 0.75;
      const tx = x + Math.cos(a) * r * 1.5, ty = y + Math.sin(a) * r * 1.5;
      const px = Math.cos(a + Math.PI / 2) * r * 0.28, py = Math.sin(a + Math.PI / 2) * r * 0.28;
      g.fillTriangle(bx - px, by - py, bx + px, by + py, tx, ty);
    }
    // tail
    const ta = back + Math.sin(t * 5) * 0.3;
    g.fillCircle(x + Math.cos(ta) * r * 1.25, y + Math.sin(ta) * r * 1.25, r * 0.32);
  } else if (k.species === 1) {
    for (let i = -2; i <= 2; i++) {
      const a = back + i * 0.38 + Math.sin(t * 6 + i) * 0.08;
      const rr = r * (0.95 + 0.08 * Math.sin(t * 8 + i * 2));
      g.fillCircle(x + Math.cos(a) * rr, y + Math.sin(a) * rr, r * 0.36);
    }
  } else if (k.species === 2) {
    for (const side of [-1, 1]) {
      const a = aim + side * 0.85;
      const cx = x + Math.cos(a) * r * 1.1, cy = y + Math.sin(a) * r * 1.1;
      g.fillCircle(cx, cy, r * 0.45);
      g.fillStyle(0x2a1a10, alpha);
      const na = aim + side * 0.25;
      g.fillTriangle(cx, cy, cx + Math.cos(na - 0.3) * r * 0.5, cy + Math.sin(na - 0.3) * r * 0.5, cx + Math.cos(na + 0.3) * r * 0.5, cy + Math.sin(na + 0.3) * r * 0.5);
      g.fillStyle(dark, alpha);
    }
  }

  // Body
  g.fillStyle(color, alpha);
  if (k.species === 3) {
    const pts: Pt[] = [];
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      const rr = r * (1 + 0.07 * Math.sin(t * 6 + i * 1.7) + 0.05 * Math.sin(t * 3.3 + i));
      pts.push([Math.cos(a) * rr, Math.sin(a) * rr]);
    }
    poly(g, pts, x, y, 0);
    g.fillStyle(light, 0.6 * alpha);
    g.fillCircle(x + Math.cos(back) * r * 0.75, y + Math.sin(back) * r * 0.75 + Math.sin(t * 4) * 2, r * 0.22);
  } else {
    g.fillCircle(x, y, r);
  }
  g.fillStyle(light, 0.5 * alpha);
  g.fillCircle(x - r * 0.3, y - r * 0.35, r * 0.38);

  // Species hats
  if (k.species === 1) {
    const hx = x + Math.cos(back) * r * 0.2, hy = y + Math.sin(back) * r * 0.2;
    g.fillStyle(0xf5f1e8, alpha); g.fillCircle(hx, hy, r * 0.5);
    g.fillStyle(0xc47a3a, alpha); g.fillCircle(hx, hy, r * 0.34);
    const ha = aim + Math.PI / 2;
    g.fillStyle(0xf5f1e8, alpha); g.fillCircle(hx + Math.cos(ha) * r * 0.55, hy + Math.sin(ha) * r * 0.55, r * 0.15);
  } else if (k.species === 2) {
    g.lineStyle(Math.max(1.5, r * 0.08), 0x4f8a2a, alpha);
    for (const o of [-0.5, 0, 0.5]) {
      const a = back + o;
      g.lineBetween(x, y, x + Math.cos(a) * r * 0.85, y + Math.sin(a) * r * 0.85);
    }
  }

  // Eyes
  for (const side of [-1, 1]) {
    const a = aim + side * 0.48;
    const ex = x + Math.cos(a) * r * 0.55, ey = y + Math.sin(a) * r * 0.55;
    g.fillStyle(0xffffff, alpha);
    g.fillCircle(ex, ey, r * 0.27);
    g.fillStyle(0x111111, alpha);
    g.fillCircle(ex + Math.cos(aim) * r * 0.1, ey + Math.sin(aim) * r * 0.1, r * 0.13);
    if (k.kaiju) {
      g.lineStyle(Math.max(2, r * 0.08), 0x111111, alpha);
      const bx = Math.cos(aim) * r * 0.3, by = Math.sin(aim) * r * 0.3;
      const px = Math.cos(a + Math.PI / 2) * r * 0.22 * side, py = Math.sin(a + Math.PI / 2) * r * 0.22 * side;
      g.lineBetween(ex - px, ey - py, ex + px + bx * 0.6, ey + py + by * 0.6);
    }
  }
  if (k.kaiju) {
    const mx = x + Math.cos(aim) * r * 0.8, my = y + Math.sin(aim) * r * 0.8;
    g.fillStyle(0x3a0d0d, alpha);
    g.fillCircle(mx, my, r * 0.22 + Math.sin(t * 20) * 1.5);
    g.fillStyle(0xffffff, alpha);
    g.fillTriangle(mx - 3, my - 3, mx + 3, my - 3, mx, my + 3);
  }
}

export const playerAlpha = (p: Player, t: number) => (p.invT > 0 && Math.floor(t * 20) % 2 === 0 ? 0.45 : 1);

export function drawPlayer(g: G, p: Player, species: number, color: number, t: number): void {
  if (!p.alive) return;
  drawPlayerUnder(g, p, color, t);
  drawKaiju(g, { x: p.x, y: p.y, r: p.r, aim: p.aim, kaiju: p.kaijuT > 0, species, color }, t, playerAlpha(p, t));
  drawPlayerOver(g, p, color, t);
}

/** Ground layer: shadow, colour ring, kaiju aura, charge aim dots, dash ghosts. */
export function drawPlayerUnder(g: G, p: Player, color: number, t: number, shadow = false): void {
  const alpha = playerAlpha(p, t);
  if (shadow) {
    g.fillStyle(0x000000, 0.3 * alpha);
    g.fillEllipse(p.x + 2, p.y + p.r * 0.55, p.r * 2.2, p.r * 0.9);
  }
  // colour ring
  g.lineStyle(3, color, 0.9 * alpha);
  g.strokeCircle(p.x, p.y, p.r + 6);
  if (p.kaijuT > 0) {
    g.lineStyle(4, 0xff3b3b, 0.5 + 0.4 * Math.sin(t * 14));
    g.strokeCircle(p.x, p.y, p.r + 12);
    // timer arc
    g.lineStyle(4, 0xffffff, 0.8);
    g.beginPath();
    g.arc(p.x, p.y, p.r + 18, -Math.PI / 2, -Math.PI / 2 + (p.kaijuT / P.kaijuTime) * Math.PI * 2, false);
    g.strokePath();
  }
  if (p.charging) {
    const len = 50 + (p.charge / P.maxCharge) * 120;
    const steps = Math.floor(len / 14);
    g.fillStyle(color, 0.8);
    for (let i = 1; i <= steps; i++) {
      const d = p.r + i * 14;
      g.fillCircle(p.x + Math.cos(p.aim) * d, p.y + Math.sin(p.aim) * d, 2.8);
    }
  }
  if (p.dashT > 0) {
    g.fillStyle(color, 0.25);
    g.fillCircle(p.x - p.vx * 0.03, p.y - p.vy * 0.03, p.r * 0.9);
    g.fillCircle(p.x - p.vx * 0.06, p.y - p.vy * 0.06, p.r * 0.7);
  }
}

/** Top layer: swipe arc and the belly-meter pip. */
export function drawPlayerOver(g: G, p: Player, color: number, t: number): void {
  if (p.swipeT > P.swipeTime) {
    // wind-up telegraph: outline of the incoming arc
    g.lineStyle(2, color, 0.8);
    g.beginPath();
    g.slice(p.x, p.y, p.r + P.swipeReach, p.aim - P.swipeArc, p.aim + P.swipeArc, false);
    g.strokePath();
  } else if (p.swipeT > 0) {
    const k = p.swipeT / P.swipeTime;
    g.fillStyle(0xffffff, 0.55 * k);
    g.beginPath();
    g.slice(p.x, p.y, p.r + P.swipeReach, p.aim - P.swipeArc, p.aim + P.swipeArc, false);
    g.fillPath();
  }
  // meter pip under the kaiju
  if (p.kaijuT <= 0) {
    const w = 34, h = 5, bx = p.x - w / 2, by = p.y + p.r + 10;
    g.fillStyle(0x000000, 0.5); g.fillRect(bx - 1, by - 1, w + 2, h + 2);
    g.fillStyle(p.meter >= 100 ? (Math.floor(t * 8) % 2 ? 0xffffff : 0xff3b3b) : 0xffb347, 1);
    g.fillRect(bx, by, (w * p.meter) / 100, h);
  }
}

// ------------------------------------------------------------------ giant hand
const SKIN = 0xf0c39b, SKIN_DARK = 0xc8946a;
export function drawHand(g: G, h: Hand, t: number): void {
  const band = RULES.handBand, top = h.y - band / 2;
  if (h.state === 'warn') {
    const k = h.t / RULES.handWarn;
    g.fillStyle(0xff2a2a, 0.1 + 0.12 * k + 0.08 * Math.sin(t * 20));
    g.fillRect(TABLE.x, top, TABLE.w, band);
    g.lineStyle(3, 0xff3b3b, 0.8);
    g.lineBetween(TABLE.x, top, TABLE.x + TABLE.w, top);
    g.lineBetween(TABLE.x, top + band, TABLE.x + TABLE.w, top + band);
    g.fillStyle(0xff5050, 0.55 + 0.3 * Math.sin(t * 12));
    const off = ((t * 300) % 120) * h.dir;
    for (let x = TABLE.x - 120; x < TABLE.x + TABLE.w + 120; x += 120) {
      const cx = x + off;
      if (cx < TABLE.x + 20 || cx > TABLE.x + TABLE.w - 20) continue;
      g.fillTriangle(cx - 16 * h.dir, h.y - 22, cx + 16 * h.dir, h.y, cx - 16 * h.dir, h.y + 22);
    }
    // looming shadow from the side it'll come from
    const sx = h.dir > 0 ? TABLE.x : TABLE.x + TABLE.w;
    g.fillStyle(0x000000, 0.35 * k);
    g.fillRect(h.dir > 0 ? sx : sx - 160 * k, top, 160 * k, band);
    return;
  }
  const W = RULES.handWidth, x0 = h.dir > 0 ? h.x - W : h.x, d = h.dir;
  g.fillStyle(0x000000, 0.3);
  g.fillRoundedRect(x0 + 10, top + 14, W, band, 30);
  g.fillStyle(SKIN, 1);
  g.fillRoundedRect(x0, top, W, band, 30);
  // fingers stick out ahead of the palm
  const fx = h.dir > 0 ? h.x - 20 : h.x - 50;
  for (let i = 0; i < 4; i++) {
    const fy = top + 8 + i * ((band - 16) / 4);
    g.fillStyle(SKIN, 1);
    g.fillRoundedRect(fx, fy, 70, (band - 16) / 4 - 4, 12);
    g.fillStyle(0xf7e0cc, 1);
    g.fillRoundedRect(h.dir > 0 ? fx + 52 : fx + 4, fy + 4, 14, (band - 16) / 4 - 12, 5);
  }
  g.fillStyle(SKIN_DARK, 1);
  g.fillRoundedRect(x0 + W * 0.3, top - 22, W * 0.45, 30, 14); // thumb
  g.lineStyle(2, SKIN_DARK, 1);
  g.lineBetween(x0 + W * 0.5 - 20 * d, top + 30, x0 + W * 0.5 + 20 * d, top + band - 30);
}

// ------------------------------------------------------------------ table hazards
/** Picnic ant trail: a dirt path with two lines of marching ants. */
function drawAntTrail(g: G, b: Belt, t: number): void {
  g.fillStyle(0x8a5a2e, 0.35);
  g.fillRoundedRect(b.x + 8, b.y, b.w - 16, b.h, 20);
  const vy = b.vy ?? 0, gap = 30, off = ((t * vy) % gap + gap) % gap;
  for (const lane of [b.x + b.w * 0.32, b.x + b.w * 0.68]) {
    for (let y = b.y - gap + off; y < b.y + b.h; y += gap) {
      if (y < b.y + 4) continue;
      const wob = Math.sin(t * 12 + y * 0.3) * 1.5;
      g.fillStyle(0x1a0f08, 1);
      g.fillEllipse(lane + wob, y, 7, 6);
      g.fillEllipse(lane + wob, y + 6, 6, 5);
      g.fillEllipse(lane + wob, y + 12, 8, 7);
      g.lineStyle(1, 0x1a0f08, 1);
      g.lineBetween(lane + wob - 6, y + 4, lane + wob + 6, y + 8);
      g.lineBetween(lane + wob + 6, y + 4, lane + wob - 6, y + 8);
    }
  }
}

/** Sushi Bar conveyor: dark belt with chevrons scrolling in its direction (vertical belts are ant trails). */
export function drawBelt(g: G, b: Belt, t: number): void {
  if (b.vy && !b.vx) { drawAntTrail(g, b, t); return; }
  g.fillStyle(0x2d3138, 0.92);
  g.fillRect(b.x, b.y, b.w, b.h);
  g.fillStyle(0x8a93a0, 1);
  g.fillRect(b.x, b.y - 4, b.w, 5);
  g.fillRect(b.x, b.y + b.h - 1, b.w, 5);
  const dir = Math.sign(b.vx) || 1, gap = 70, off = ((t * b.vx) % gap + gap) % gap;
  g.fillStyle(0x4a515c, 1);
  for (let x = b.x - gap + off; x < b.x + b.w + gap; x += gap) {
    if (x < b.x + 10 || x > b.x + b.w - 30) continue;
    const cy = b.y + b.h / 2;
    g.fillTriangle(x, cy - 16, x + 18 * dir, cy, x, cy + 16);
    g.fillTriangle(x - 12 * dir, cy - 16, x + 6 * dir, cy, x - 12 * dir, cy + 16);
  }
}

/** Birthday Bash wind: arrows while it builds, streaks while it blows. */
export function drawWind(g: G, w: Wind, t: number): void {
  const cx = Math.cos(w.dir), cy = Math.sin(w.dir);
  if (w.state === 'warn') {
    const k = w.t / RULES.windWarn;
    // the edge it will push towards glows red
    g.fillStyle(0xff3b3b, 0.15 + 0.25 * k);
    if (cx > 0.5) g.fillRect(TABLE.x + TABLE.w - 26, TABLE.y, 26, TABLE.h);
    if (cx < -0.5) g.fillRect(TABLE.x, TABLE.y, 26, TABLE.h);
    if (cy > 0.5) g.fillRect(TABLE.x, TABLE.y + TABLE.h - 26, TABLE.w, 26);
    if (cy < -0.5) g.fillRect(TABLE.x, TABLE.y, TABLE.w, 26);
    g.fillStyle(0x3a1f10, 0.3 + 0.25 * Math.abs(Math.sin(t * 10))); // dark so it reads on pink, wood and bamboo
    for (let ix = 0; ix < 5; ix++) {
      for (let iy = 0; iy < 3; iy++) {
        const x = TABLE.x + TABLE.w * (0.12 + ix * 0.19), y = TABLE.y + TABLE.h * (0.2 + iy * 0.3);
        const px = -cy, py = cx;
        g.fillTriangle(x + cx * 30, y + cy * 30, x - cx * 14 + px * 22, y - cy * 14 + py * 22, x - cx * 14 - px * 22, y - cy * 14 - py * 22);
      }
    }
    return;
  }
  g.lineStyle(3, 0xffffff, 0.45);
  for (let i = 0; i < 26; i++) {
    const seed = i * 97.31;
    const len = 60 + (i % 5) * 18;
    const span = cx !== 0 ? TABLE.w : TABLE.h;
    const along = ((t * 900 + seed * 13) % (span + 200)) - 100;
    const across = (seed * 7.7) % (cx !== 0 ? TABLE.h : TABLE.w);
    let x: number, y: number;
    if (Math.abs(cx) > 0.5) { x = cx > 0 ? TABLE.x + along : TABLE.x + TABLE.w - along; y = TABLE.y + across; }
    else { y = cy > 0 ? TABLE.y + along : TABLE.y + TABLE.h - along; x = TABLE.x + across; }
    g.lineBetween(x, y, x - cx * len, y - cy * len);
  }
}

/** Chef's Board cleaver: red lane while warning; a blade (shape fallback) when it chops. */
export function drawCleaverWarn(g: G, c: Cleaver, t: number): void {
  const band = RULES.cleaverBand, k = c.t / RULES.cleaverWarn;
  g.fillStyle(0xff2a2a, 0.12 + 0.15 * k + 0.08 * Math.sin(t * 22));
  g.fillRect(c.x - band / 2, TABLE.y, band, TABLE.h);
  g.lineStyle(3, 0xff3b3b, 0.85);
  for (let y = TABLE.y; y < TABLE.y + TABLE.h; y += 26) {
    g.lineBetween(c.x - band / 2, y, c.x - band / 2, y + 14);
    g.lineBetween(c.x + band / 2, y, c.x + band / 2, y + 14);
  }
  g.fillStyle(0x000000, 0.3 * k);
  g.fillRect(c.x - band / 2 + 10, TABLE.y, band, TABLE.h);
}

export function drawCleaverBlade(g: G, c: Cleaver): void {
  const band = RULES.cleaverBand;
  g.fillStyle(0x000000, 0.3);
  g.fillRect(c.x - band / 2 + 10, TABLE.y + 10, band, TABLE.h * 0.75);
  g.fillStyle(0xc9d1d9, 1);
  g.fillRect(c.x - band / 2, TABLE.y, band, TABLE.h * 0.72);
  g.fillStyle(0x5a3a22, 1);
  g.fillRoundedRect(c.x - 12, TABLE.y + TABLE.h * 0.72, 24, TABLE.h * 0.25, 8);
}

/** Scar left on the table after a chop. */
export function drawChopMark(g: G, c: Cleaver): void {
  g.lineStyle(4, 0x3a2414, 0.6 * (1 - c.t / RULES.cleaverShow));
  g.lineBetween(c.x, TABLE.y + 8, c.x, TABLE.y + TABLE.h - 8);
}

/** Ice Cream Parlour: a melted, slippery puddle (colour varies per puddle). */
const SPILL_COLORS = [0xffb3cf, 0xbff5dc, 0xfff0b3, 0xd9c2ff];
export function drawSpill(g: G, z: Zone, i: number, t: number): void {
  const c = SPILL_COLORS[i % SPILL_COLORS.length];
  g.fillStyle(shade(c, 0.85), 0.9);
  g.fillCircle(z.x + 3, z.y + 4, z.r);
  g.fillStyle(c, 0.95);
  g.fillCircle(z.x, z.y, z.r);
  for (let k = 0; k < 5; k++) {
    const a = k * 1.3 + i, rr = z.r * (0.75 + 0.15 * Math.sin(k * 2.1 + i));
    g.fillCircle(z.x + Math.cos(a) * rr, z.y + Math.sin(a) * rr, z.r * 0.32);
  }
  g.fillStyle(0xffffff, 0.45 + 0.1 * Math.sin(t * 2 + i));
  g.fillEllipse(z.x - z.r * 0.35, z.y - z.r * 0.35, z.r * 0.5, z.r * 0.22);
  g.fillEllipse(z.x + z.r * 0.2, z.y + z.r * 0.3, z.r * 0.18, z.r * 0.1);
}

/** Diner Griddle burner: dark coils at rest, glowing while it warns, roaring flames when it flares. */
export function drawBurner(g: G, z: Zone, state: Burner | null, i: number, t: number): void {
  const mine = state && state.i === i ? state : null;
  const heat = !mine ? 0 : mine.state === 'warn' ? mine.t / RULES.burnerWarn : 1;
  g.fillStyle(0x1f2226, 0.85);
  g.fillCircle(z.x, z.y, z.r);
  for (let k = 0; k < 4; k++) {
    const r = z.r * (0.28 + k * 0.2);
    const glow = heat > 0 ? Math.min(1, heat * 1.2) * (0.6 + 0.4 * Math.sin(t * 18 + k)) : 0;
    g.lineStyle(5, glow > 0 ? 0xff5a1f : 0x4a4f56, glow > 0 ? 0.4 + glow * 0.6 : 1);
    g.strokeCircle(z.x, z.y, r);
  }
  if (mine && mine.state === 'warn') {
    g.lineStyle(3, 0xff3b3b, 0.5 + 0.5 * Math.abs(Math.sin(t * 14)));
    g.strokeCircle(z.x, z.y, z.r + 4);
  }
  if (mine && mine.state === 'flare') {
    for (let k = 0; k < 14; k++) {
      const a = (k / 14) * Math.PI * 2 + t * 3, rr = z.r * (0.3 + 0.6 * ((k * 37) % 10) / 10);
      const fl = 10 + 8 * Math.abs(Math.sin(t * 25 + k));
      g.fillStyle(k % 2 ? 0xffb020 : 0xff4a1a, 0.85);
      g.fillCircle(z.x + Math.cos(a) * rr, z.y + Math.sin(a) * rr, fl);
    }
    g.fillStyle(0xfff3b0, 0.8);
    g.fillCircle(z.x, z.y, z.r * 0.35);
  }
}

/** Bakery Bench: a sticky patch of dough with a dusting of flour. */
export function drawSticky(g: G, z: Zone, i: number): void {
  g.fillStyle(0xc9a874, 0.9);
  g.fillCircle(z.x + 3, z.y + 4, z.r);
  g.fillStyle(0xf0dcb0, 1);
  g.fillCircle(z.x, z.y, z.r);
  for (let k = 0; k < 6; k++) {
    const a = k * 1.1 + i, rr = z.r * (0.7 + 0.2 * Math.sin(k * 1.7 + i));
    g.fillCircle(z.x + Math.cos(a) * rr, z.y + Math.sin(a) * rr, z.r * 0.3);
  }
  g.fillStyle(0xffffff, 0.55);
  for (let k = 0; k < 9; k++) g.fillCircle(z.x + Math.cos(k * 2.4 + i) * z.r * 0.6, z.y + Math.sin(k * 3.1 + i) * z.r * 0.55, 2 + (k % 3));
  g.lineStyle(2, 0xc9a874, 0.7);
  g.strokeCircle(z.x - z.r * 0.2, z.y + z.r * 0.1, z.r * 0.35);
}

/** Banquet Lazy Susan (shape fallback): a wooden disc with spokes, turned by angle. */
export function drawTurntable(g: G, tt: Turntable, angle: number): void {
  g.fillStyle(0x000000, 0.25); g.fillCircle(tt.x + 6, tt.y + 9, tt.r);
  g.fillStyle(0x8a5a32, 1); g.fillCircle(tt.x, tt.y, tt.r);
  g.fillStyle(0xa8703f, 1); g.fillCircle(tt.x, tt.y, tt.r - 10);
  g.lineStyle(3, 0x6b4424, 0.8);
  g.strokeCircle(tt.x, tt.y, tt.r * 0.55);
  for (let k = 0; k < 8; k++) {
    const a = angle + (k / 8) * Math.PI * 2;
    g.lineBetween(tt.x + Math.cos(a) * tt.r * 0.55, tt.y + Math.sin(a) * tt.r * 0.55, tt.x + Math.cos(a) * (tt.r - 12), tt.y + Math.sin(a) * (tt.r - 12));
  }
}

/** Arrows around the turntable rim showing which way it spins. */
export function drawTurnArrows(g: G, tt: Turntable, angle: number): void {
  g.fillStyle(0xffe1a0, 0.55);
  for (let k = 0; k < 6; k++) {
    const a = angle * 1.0 + (k / 6) * Math.PI * 2, r = tt.r + 14;
    const x = tt.x + Math.cos(a) * r, y = tt.y + Math.sin(a) * r, tx = -Math.sin(a), ty = Math.cos(a);
    g.fillTriangle(x + tx * 12, y + ty * 12, x - tx * 6 + Math.cos(a) * 7, y - ty * 6 + Math.sin(a) * 7, x - tx * 6 - Math.cos(a) * 7, y - ty * 6 - Math.sin(a) * 7);
  }
}

/** Breakfast Rush: red firing lane while a toaster is about to pop. */
export function drawToasterWarn(g: G, z: Toaster, st: ToasterState, t: number): void {
  const k = st.t / RULES.toasterWarn, ux = Math.cos(z.a), uy = Math.sin(z.a), w = RULES.toastRadius * 2 + 16;
  const len = 1400, px = -uy * w / 2, py = ux * w / 2, ex = z.x + ux * len, ey = z.y + uy * len;
  g.fillStyle(0xff2a2a, 0.12 + 0.18 * k + 0.08 * Math.sin(t * 22));
  g.fillPoints([{ x: z.x + px, y: z.y + py }, { x: ex + px, y: ey + py }, { x: ex - px, y: ey - py }, { x: z.x - px, y: z.y - py }] as unknown as Phaser.Math.Vector2[], true);
  g.fillStyle(0xffffff, 0.8);
  for (let d = 40; d < 1200; d += 80) {
    const cx = z.x + ux * d + ux * ((t * 200) % 80), cy = z.y + uy * d + uy * ((t * 200) % 80);
    g.fillTriangle(cx + ux * 10, cy + uy * 10, cx - ux * 6 + px * 0.5, cy - uy * 6 + py * 0.5, cx - ux * 6 - px * 0.5, cy - uy * 6 - py * 0.5);
  }
  // little "!" above the toaster
  g.fillStyle(0xff3b3b, 1);
  g.fillRoundedRect(z.x - ux * 40 - 4, z.y - uy * 40 - 46 + Math.sin(t * 30) * 2, 8, 20, 3);
  g.fillCircle(z.x - ux * 40, z.y - uy * 40 - 20, 4);
}

/** Flying toast (shape fallback). */
export function drawToast(g: G, ts: Toast): void {
  const pts: Pt[] = [[-15, -14], [15, -14], [15, 14], [-15, 14]];
  g.fillStyle(0x8a5a2a, 1);
  poly(g, pts, ts.x, ts.y, ts.spin, 1.08);
  g.fillStyle(0xe8b060, 1);
  poly(g, pts, ts.x, ts.y, ts.spin, 0.85);
  g.fillStyle(0xfff3b0, 1);
  g.fillCircle(ts.x, ts.y, 5);
}
