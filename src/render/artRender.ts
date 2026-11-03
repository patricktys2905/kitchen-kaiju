// Draws the match with Gemini sprites, falling back to the shape renderer per element when an image is missing.
import type * as Phaser from 'phaser';
import { COLORS, RULES, TABLE, VIEW } from '../sim/constants';
import type { Layout } from '../sim/layouts';
import type { Cutlery, Player, World } from '../sim/world';
import { CUTLERY_LEN, fitInside, hasArt, SpritePool } from './art';
import {
  cutleryAngle, drawCrumbs, drawCutlery, drawCutleryGlow, drawFloor, drawHand, drawKaiju, drawObstacle, drawObstacleShadow,
  drawPlayerOver, drawPlayerUnder, drawTableRim, drawTableShadow, drawTableSurface, playerAlpha,
} from './draw';

type G = Phaser.GameObjects.Graphics;

// Sprite layer depths (graphics: base -2.5, table -1, under 0, over 3.6)
const D = { floor: -3, table: -2, obstacle: -0.5, crumb: 0.5, loose: 1, player: 2, flying: 3, hand: 3.5 };

export class ArtRenderer {
  private pool: SpritePool;
  private statics: Phaser.GameObjects.Image[] = [];
  private facing: number[] = [];

  constructor(private scene: Phaser.Scene, private baseG: G, private tableG: G) {
    this.pool = new SpritePool(scene);
  }

  /** Static scenery for a round: floor, table, obstacles. */
  setupTable(layout: Layout): void {
    for (const s of this.statics) s.destroy();
    this.statics = [];
    this.baseG.clear();
    this.tableG.clear();
    if (hasArt('bg-floor')) {
      this.statics.push(this.scene.add.image(VIEW.w / 2, VIEW.h / 2, 'bg-floor').setDisplaySize(VIEW.w, VIEW.h).setDepth(D.floor));
    } else {
      drawFloor(this.baseG);
    }
    drawTableShadow(this.baseG);
    if (hasArt('bg-table')) {
      this.statics.push(this.scene.add.image(TABLE.x + TABLE.w / 2, TABLE.y + TABLE.h / 2, 'bg-table').setDisplaySize(TABLE.w, TABLE.h).setDepth(D.table));
    } else {
      drawTableSurface(this.baseG);
    }
    drawTableRim(this.tableG);
    for (const o of layout.obstacles) {
      const key = `ob-${o.style}`;
      if (!hasArt(key)) { drawObstacle(this.tableG, o); continue; }
      drawObstacleShadow(this.tableG, o);
      const img = this.scene.add.image(0, 0, key).setDepth(D.obstacle);
      if (o.shape === 'circle') {
        const k = o.style === 'cup' ? 1.5 : 1.1; // cup art includes its handle
        fitInside(img, o.r * 2 * k, o.r * 2 * k);
        img.setPosition(o.x + (o.style === 'cup' ? o.r * 0.22 : 0), o.y);
      } else {
        img.setDisplaySize(o.w * 1.08, o.h * 1.08).setPosition(o.x + o.w / 2, o.y + o.h / 2);
      }
      this.statics.push(img);
    }
  }

  /** Per-frame sprites. `under` = ground graphics, `over` = graphics drawn above sprites. */
  frame(w: World, t: number, under: G, over: G): void {
    this.pool.begin();

    for (const c of w.crumbs) {
      const key = `crumb-${c.variant}`;
      if (!hasArt(key)) { drawCrumbs(under, [c], t); continue; }
      under.fillStyle(0x000000, 0.25);
      under.fillCircle(c.x + 1.5, c.y + 2, 4.5);
      fitInside(this.pool.take(key, D.crumb), 14, 14).setPosition(c.x, c.y + Math.sin(t * 3 + c.id) * 0.6);
    }

    if (w.hand && w.hand.state === 'warn') drawHand(under, w.hand, t);

    for (const c of w.cutlery) {
      if (c.state === 'stuck' || c.state === 'returning') this.cutlery(under, over, c, t, D.loose);
    }

    const order = w.players.filter(p => p.alive).sort((a, b) => a.y - b.y);
    for (const p of order) this.player(w, p, t, under, over);

    for (const c of w.cutlery) if (c.state === 'flying') this.cutlery(under, over, c, t, D.flying);

    if (w.hand && w.hand.state === 'sweep') {
      const h = w.hand;
      if (!hasArt('hand')) {
        drawHand(over, h, t);
      } else {
        const dw = RULES.handWidth + 100, dh = RULES.handBand * 1.25;
        under.fillStyle(0x000000, 0.3);
        under.fillRoundedRect(h.x + h.dir * 50 - (h.dir > 0 ? dw : 0) + 12, h.y - dh / 2 + 16, dw, dh, 30);
        const img = this.pool.take('hand', D.hand);
        img.setScale(dw / img.width, dh / img.height).setFlipX(h.dir < 0);
        img.setPosition(h.x + h.dir * 50 - (h.dir * dw) / 2, h.y);
      }
    }
    this.pool.end();
  }

  private cutlery(under: G, over: G, c: Cutlery, t: number, depth: number): void {
    const key = `cut-${c.kind}`;
    if (!hasArt(key)) { drawCutlery(over, c, COLORS, t); return; }
    drawCutleryGlow(under, c, COLORS, t);
    const img = this.pool.take(key, depth);
    const s = (CUTLERY_LEN[c.kind] * (c.state === 'flying' ? 1.1 : 1)) / img.width;
    img.setScale(s).setRotation(cutleryAngle(c)).setPosition(c.x, c.y);
  }

  private player(w: World, p: Player, t: number, under: G, over: G): void {
    const i = p.id, color = COLORS[i];
    drawPlayerUnder(under, p, color, t, true);
    const base = `kaiju-${i}`;
    if (!hasArt(base)) {
      drawKaiju(over, { x: p.x, y: p.y, r: p.r, aim: p.aim, kaiju: p.kaijuT > 0, species: i, color }, t, playerAlpha(p, t));
      drawPlayerOver(over, p, color, t);
      return;
    }
    // face left/right with a little hysteresis so it doesn't flicker
    const c = Math.cos(p.aim);
    if (this.facing[i] === undefined) this.facing[i] = c >= 0 ? 1 : -1;
    if (c > 0.2) this.facing[i] = 1;
    else if (c < -0.2) this.facing[i] = -1;
    const f = this.facing[i];
    const rage = p.kaijuT > 0 && hasArt(`${base}-rage`);
    const depth = D.player + p.y * 0.0001;
    const img = this.pool.take(rage ? `${base}-rage` : base, depth);
    const moving = Math.hypot(p.vx, p.vy) > 30;
    const bob = moving ? Math.abs(Math.sin(t * 13 + i)) * 3.5 : Math.sin(t * 3 + i) * 1;
    const squash = p.dashT > 0 ? 1.15 : p.charging ? 0.95 : 1;
    const s = (p.r * 3.1) / img.height;
    img.setOrigin(0.5, 1).setFlipX(f < 0).setAlpha(playerAlpha(p, t));
    img.setScale(s * squash, s / squash);
    img.setRotation(moving ? Math.sin(t * 13 + i) * 0.06 : 0);
    img.setPosition(p.x, p.y + p.r * 0.85 - bob);

    const held = w.cutleryById(p.holding);
    if (held) {
      const key = `cut-${held.kind}`;
      if (!hasArt(key)) {
        drawCutlery(over, held, COLORS, t);
      } else {
        const hx = p.x + f * p.r * 0.8, hy = p.y - p.r * 0.35 - bob;
        const pull = p.charging ? -(p.charge / 0.6) * 6 : 0; // wind back while charging
        const n = held.kind === 'chopstick' ? 2 : 1;
        for (let k = 0; k < n; k++) {
          const ci = this.pool.take(key, depth + 0.00005);
          const off = n === 2 ? (k - 0.5) * 6 : 0;
          ci.setScale((CUTLERY_LEN[held.kind] * 0.8) / ci.width).setRotation(p.aim);
          ci.setPosition(hx + Math.cos(p.aim) * pull - Math.sin(p.aim) * off, hy + Math.sin(p.aim) * pull + Math.cos(p.aim) * off);
        }
      }
    }
    drawPlayerOver(over, p, color, t);
  }
}
