// Draws the match with Gemini sprites, falling back to the shape renderer per element when an image is missing.
import type * as Phaser from 'phaser';
import { RULES, SPECIES, TABLE, VIEW } from '../sim/constants';
import { KITS } from '../sim/powers';
import HEADS from './heads.json';
import type { Layout } from '../sim/layouts';
import type { Cutlery, Player, World } from '../sim/world';
import { CUTLERY_LEN, fitInside, hasArt, SpritePool } from './art';
import {
  cutleryAngle, drawBelt, drawBlender, drawBurner, drawCheesePuddle, drawCheeseWarn, drawSpatula, drawSpill, drawSticky, drawToast, drawToasterWarn, drawTurnArrows, drawTurntable, drawChopMark, drawCleaverBlade, drawCleaverWarn, drawCrumbs, drawCutlery, drawCutleryGlow, drawFloor,
  drawHand, drawKaiju, drawObstacle, drawObstacleShadow, drawMat, drawPlayerOver, drawPlayerUnder, drawTableFrame, drawTableRim,
  drawTableSurface, drawWind, playerAlpha,
} from './draw';

/** Which kaiju each player is, and their colour. */
export interface Looks {
  species: number[];
  colors: number[];
  bosses?: number[]; // story bosses wear a crown
}

type G = Phaser.GameObjects.Graphics;

// Sprite layer depths (graphics: base -2.5, table -1, under 0, over 3.6)
const D = { floor: -3, table: -2, mat: -1.5, obstacle: -0.5, light: 3.7, crumb: 0.5, loose: 1, player: 2, flying: 3, hand: 3.5 };

export class ArtRenderer {
  /** Top-centre of each kaiju sprite this frame (for hats), with its tilt. */
  heads: ({ x: number; y: number; rot: number; size?: number; flip?: boolean } | undefined)[] = [];
  private pool: SpritePool;
  private statics: Phaser.GameObjects.Image[] = [];
  private facing: number[] = [];

  constructor(private scene: Phaser.Scene, private baseG: G, private tableG: G, private looks: Looks) {
    this.pool = new SpritePool(scene);
    this.addLighting();
  }

  /** Warm pool of light over the table + darker corners (generated once, no image files). */
  private addLighting(): void {
    const tex = this.scene.textures;
    if (!tex.exists('kk-vignette')) {
      const t = tex.createCanvas('kk-vignette', 640, 360);
      if (t) {
        const c = t.getContext();
        const g = c.createRadialGradient(320, 185, 70, 320, 185, 400);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(0.55, 'rgba(10,4,0,0.06)');
        g.addColorStop(1, 'rgba(10,4,0,0.5)');
        c.fillStyle = g;
        c.fillRect(0, 0, 640, 360);
        t.refresh();
      }
    }
    if (!tex.exists('kk-glow')) {
      const t = tex.createCanvas('kk-glow', 320, 180);
      if (t) {
        const c = t.getContext();
        const g = c.createRadialGradient(160, 90, 0, 160, 90, 170);
        g.addColorStop(0, 'rgba(255,214,150,0.55)');
        g.addColorStop(1, 'rgba(255,214,150,0)');
        c.fillStyle = g;
        c.fillRect(0, 0, 320, 180);
        t.refresh();
      }
    }
    if (tex.exists('kk-glow')) {
      this.scene.add.image(TABLE.x + TABLE.w / 2, TABLE.y + TABLE.h / 2, 'kk-glow')
        .setDisplaySize(TABLE.w * 1.1, TABLE.h * 1.2).setBlendMode('ADD').setAlpha(0.32).setDepth(D.light - 0.01);
    }
    if (tex.exists('kk-vignette')) this.scene.add.image(VIEW.w / 2, VIEW.h / 2, 'kk-vignette').setDisplaySize(VIEW.w, VIEW.h).setDepth(D.light);
  }

  /** Static scenery for a round: floor, table, obstacles. */
  setupTable(layout: Layout, starts: { x: number; y: number; color: number }[] = []): void {
    for (const s of this.statics) s.destroy();
    this.statics = [];
    this.baseG.clear();
    this.tableG.clear();
    if (hasArt('bg-floor')) {
      this.statics.push(this.scene.add.image(VIEW.w / 2, VIEW.h / 2, 'bg-floor').setDisplaySize(VIEW.w, VIEW.h).setDepth(D.floor));
    } else {
      drawFloor(this.baseG);
    }
    drawTableFrame(this.baseG, layout.table);
    if (hasArt(layout.table)) {
      this.statics.push(this.scene.add.image(TABLE.x + TABLE.w / 2, TABLE.y + TABLE.h / 2, layout.table).setDisplaySize(TABLE.w, TABLE.h).setDepth(D.table));
    } else {
      drawTableSurface(this.baseG, layout.table);
    }
    drawTableRim(this.tableG);
    // place mats under each player's starting spot
    const matKey = layout.table.replace('bg-', 'mat-');
    starts.forEach((st, i) => {
      if (!hasArt(matKey)) { drawMat(this.tableG, st.x, st.y + 6, st.color, layout.table); return; }
      const rot = ((i * 37) % 9 - 4) * 0.02;
      this.tableG.fillStyle(0x000000, 0.18);
      this.tableG.fillRoundedRect(st.x - 54, st.y - 30, 116, 84, 14);
      const img = this.scene.add.image(st.x, st.y + 6, matKey).setDepth(D.mat).setRotation(rot);
      fitInside(img, 118, 88);
      this.statics.push(img);
      const ring = this.scene.add.graphics().setDepth(D.mat + 0.01);
      ring.lineStyle(3, st.color, 0.8);
      ring.strokeRoundedRect(st.x - img.displayWidth / 2 - 3, st.y + 6 - img.displayHeight / 2 - 3, img.displayWidth + 6, img.displayHeight + 6, 12);
      ring.setRotation(0);
      this.statics.push(ring as unknown as Phaser.GameObjects.Image);
    });
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
    for (const b of w.layout.belts ?? []) drawBelt(under, b, t);
    (w.layout.spills ?? []).forEach((z, i) => drawSpill(under, z, i, t));
    (w.layout.stickies ?? []).forEach((z, i) => drawSticky(under, z, i));
    const tt = w.layout.turntable;
    if (tt) {
      if (hasArt('lazysusan')) {
        under.fillStyle(0x000000, 0.25); under.fillCircle(tt.x + 6, tt.y + 9, tt.r);
        const img = this.pool.take('lazysusan', D.mat);
        img.setDisplaySize(tt.r * 2.05, tt.r * 2.05).setRotation(w.turnAngle).setPosition(tt.x, tt.y);
      } else {
        drawTurntable(under, tt, w.turnAngle);
      }
      drawTurnArrows(under, tt, w.turnAngle * 1.5);
    }
    if (w.toaster) { const z = w.layout.toasters?.[w.toaster.i]; if (z) drawToasterWarn(under, z, w.toaster, t); }
    (w.layout.burners ?? []).forEach((z, i) => drawBurner(under, z, w.burner, i, t));
    w.puddles.forEach((z, i) => drawCheesePuddle(under, z, i));
    for (const z of w.powerZones) {
      const key = KITS[z.species]?.art;
      if (key && hasArt(key)) { const fade = Math.min(1, z.t / 0.6); this.pool.take(key, D.mat).setDisplaySize(z.r * 2.2, z.r * 2.2).setPosition(z.x, z.y).setRotation((z.x * 0.37 + z.y * 0.11) % 6.28).setAlpha(0.82 * fade); }
      else drawPowerZone(under, z, t);
    }
    for (const q of w.powerShots) if (q.mine) this.powerShot(under, q, t);
    if (w.spatula) drawSpatula(w.spatula.state === 'warn' ? under : over, w.spatula, RULES.spatulaSize, Math.min(1, w.spatula.t / RULES.spatulaWarn), t);
    for (const d of w.cheeseDrops) drawCheeseWarn(over, d.x, d.y, Math.min(1, d.t / RULES.cheeseWarn), RULES.cheeseRadius, t);
    const bz = w.layout.blender;
    if (bz) {
      const art = hasArt('ob-blender');
      if (art) fitInside(this.pool.take('ob-blender', D.mat), (bz.r + 26) * 2, (bz.r + 26) * 2).setPosition(bz.x + (w.blender?.state === 'warn' ? Math.sin(t * 60) * 2 : 0), bz.y).setRotation(w.blender ? w.bladeAngle : 0);
      drawBlender(under, bz, w.blender?.state ?? null, w.bladeAngle, t, RULES.blenderRange, !art);
    }

    for (const c of w.crumbs) {
      const key = `crumb-${c.variant}`;
      if (!hasArt(key)) { drawCrumbs(under, [c], t); continue; }
      under.fillStyle(0x000000, 0.25);
      under.fillCircle(c.x + 1.5, c.y + 2, 4.5);
      fitInside(this.pool.take(key, D.crumb), 14, 14).setPosition(c.x, c.y + Math.sin(t * 3 + c.id) * 0.6);
    }

    if (w.hand && w.hand.state === 'warn') drawHand(under, w.hand, t);
    if (w.cleaver) (w.cleaver.state === 'warn' ? drawCleaverWarn : drawChopMark)(under, w.cleaver, t);
    if (w.wind && w.wind.state === 'warn') drawWind(under, w.wind, t);

    for (const c of w.cutlery) {
      if (c.state === 'stuck' || c.state === 'returning') this.cutlery(under, over, c, t, D.loose);
    }

    const order = w.players.filter(p => p.alive).sort((a, b) => a.y - b.y);
    for (const p of order) this.player(w, p, t, under, over);

    for (const c of w.cutlery) if (c.state === 'flying') this.cutlery(under, over, c, t, D.flying);
    for (const q of w.powerShots) if (!q.mine) this.powerShot(over, q, t);
    for (const p of order) if (p.stunT > 0) drawDazed(over, p.x, p.y - p.r - 10, t);

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
    if (w.wind && w.wind.state === 'gust') drawWind(over, w.wind, t);
    for (const ts of w.toasts) {
      if (!hasArt('toast')) { drawToast(over, ts); continue; }
      fitInside(this.pool.take('toast', D.flying), 40, 40).setRotation(ts.spin).setPosition(ts.x, ts.y);
    }
    if (w.cleaver && w.cleaver.state === 'chop') {
      const c = w.cleaver, k = Math.min(1, c.t / 0.08); // slams down fast
      if (!hasArt('cleaver')) {
        drawCleaverBlade(over, c);
      } else {
        const img = this.pool.take('cleaver', D.hand);
        // stretch the blade to exactly cover the lane it chops (width) and the table (height)
        const grow = 1.25 - 0.25 * k;
        img.setScale(((RULES.cleaverBand * 1.45) / img.width) * grow, ((TABLE.h * 0.95) / img.height) * grow);
        img.setAlpha(Math.min(1, 1.6 - c.t / 0.5)).setPosition(c.x, TABLE.y + TABLE.h / 2 - (1 - k) * 40);
      }
    }
    this.pool.end();
  }

  /** Kaiju power projectile or mine: Gemini sprite (spinning in flight) with a shadow, or a plain shape. */
  private powerShot(g: G, q: World['powerShots'][number], t: number): void {
    const key = KITS[q.species]?.art;
    if (!key || !hasArt(key)) { drawPowerShot(g, q, t); return; }
    const size = q.mine ? q.r * 1.5 : q.r * 2.6, bob = q.mine ? 1 + 0.06 * Math.sin(t * 8 + q.x) : 1;
    g.fillStyle(0x000000, 0.25); g.fillEllipse(q.x + 3, q.y + size * 0.42, size * 0.8, size * 0.3);
    if (q.mine) { g.lineStyle(2, 0xff4a4a, 0.5 + 0.4 * Math.sin(t * 8 + q.x)); g.strokeCircle(q.x, q.y, q.r); }
    const spin = q.mine ? 0 : key === 'pw-gum' ? 0 : t * 14;
    this.pool.take(key, q.mine ? D.loose : D.flying).setDisplaySize(size * bob, size * bob).setPosition(q.x, q.y).setRotation(spin);
  }

  private cutlery(under: G, over: G, c: Cutlery, t: number, depth: number): void {
    const key = `cut-${c.kind}`;
    if (!hasArt(key)) { drawCutlery(over, c, this.looks.colors, t); return; }
    drawCutleryGlow(under, c, this.looks.colors, t);
    const img = this.pool.take(key, depth);
    const s = (CUTLERY_LEN[c.kind] * (c.state === 'flying' ? 1.1 : 1)) / img.width;
    img.setScale(s).setRotation(cutleryAngle(c)).setPosition(c.x, c.y);
  }

  private player(w: World, p: Player, t: number, under: G, over: G): void {
    const i = p.id, color = this.looks.colors[i], sp = this.looks.species[i];
    drawPlayerUnder(under, p, color, t, true);
    const base = `kaiju-${sp}`;
    if (!hasArt(base)) {
      drawKaiju(over, { x: p.x, y: p.y, r: p.r, aim: p.aim, kaiju: p.kaijuT > 0, species: sp, color }, t, playerAlpha(p, t));
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
    // hat spot: per-sprite head position (src/render/heads.json), mirrored when facing left
    const hd = (HEADS as unknown as Record<string, number[]>)[rage ? `${base}-rage` : base] ?? (HEADS as unknown as Record<string, number[]>)[base];
    const dw = img.width * s * squash, dh = (p.r * 3.1) / squash, top = p.y + p.r * 0.85 - bob - dh;
    this.heads[i] = hd ? { x: p.x + (hd[0] - 0.5) * dw * f, y: top + hd[1] * dh, rot: img.rotation, size: hd[2] ?? 1, flip: f < 0 } : { x: p.x, y: top, rot: img.rotation, size: 1, flip: f < 0 };

    const held = w.cutleryById(p.holding);
    if (held) {
      const key = `cut-${held.kind}`;
      if (!hasArt(key)) {
        drawCutlery(over, held, this.looks.colors, t);
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
    if (this.looks.bosses?.includes(i)) {
      // a little gold crown floating above the boss
      const cx = p.x, cy = p.y + p.r * 0.85 - bob - p.r * 3.1 - 10 + Math.sin(t * 4) * 2, w2 = 13;
      over.fillStyle(0x7a4a10, 1);
      over.fillPoints([{ x: cx - w2 - 2, y: cy + 9 }, { x: cx + w2 + 2, y: cy + 9 }, { x: cx + w2 + 2, y: cy - 7 }, { x: cx + 6, y: cy + 1 }, { x: cx, y: cy - 11 }, { x: cx - 6, y: cy + 1 }, { x: cx - w2 - 2, y: cy - 7 }] as unknown as Phaser.Math.Vector2[], true);
      over.fillStyle(0xffd24a, 1);
      over.fillPoints([{ x: cx - w2, y: cy + 7 }, { x: cx + w2, y: cy + 7 }, { x: cx + w2, y: cy - 4 }, { x: cx + 6, y: cy + 3 }, { x: cx, y: cy - 8 }, { x: cx - 6, y: cy + 3 }, { x: cx - w2, y: cy - 4 }] as unknown as Phaser.Math.Vector2[], true);
      over.fillStyle(0xff3b3b, 1); over.fillCircle(cx, cy + 3, 2.5);
    }
    drawPlayerOver(over, p, color, t);
  }
}

// ---------------------------------------------------------------- kaiju powers (simple shapes in the kaiju's colour)
function drawPowerZone(g: G, z: World['powerZones'][number], t: number): void {
  const col = SPECIES[z.species]?.color ?? 0xffffff, fade = Math.min(1, z.t / 0.6);
  if (z.zone === 'sticky') {
    g.fillStyle(col, 0.38 * fade);
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * Math.PI * 2 + z.x * 0.01;
      g.fillCircle(z.x + Math.cos(a) * z.r * 0.45, z.y + Math.sin(a) * z.r * 0.45, z.r * 0.55);
    }
    g.lineStyle(3, 0x2a1408, 0.35 * fade); g.strokeCircle(z.x, z.y, z.r * 0.98);
  } else {
    g.fillStyle(0xcff3ff, 0.32 * fade); g.fillCircle(z.x, z.y, z.r);
    g.fillStyle(col, 0.22 * fade); g.fillCircle(z.x, z.y, z.r * 0.8);
    g.fillStyle(0xffffff, 0.55 * fade);
    for (let k = 0; k < 9; k++) { const a = k * 2.4 + z.y * 0.02; g.fillCircle(z.x + Math.cos(a) * z.r * 0.6, z.y + Math.sin(a) * z.r * 0.6, 4 + 2 * Math.sin(t * 4 + k)); }
  }
}

function drawPowerShot(g: G, q: World['powerShots'][number], t: number): void {
  const col = SPECIES[q.species]?.color ?? 0xffffff;
  if (q.mine) {
    const pulse = 0.7 + 0.3 * Math.sin(t * 8 + q.x);
    g.fillStyle(0x000000, 0.25); g.fillCircle(q.x + 2, q.y + 3, q.r * 0.6);
    g.fillStyle(col, 1); g.fillCircle(q.x, q.y, q.r * 0.55);
    g.lineStyle(3, 0x2a1408, 1); g.strokeCircle(q.x, q.y, q.r * 0.55);
    g.lineStyle(2, 0xff4a4a, pulse); g.strokeCircle(q.x, q.y, q.r * (0.8 + 0.2 * pulse));
    return;
  }
  g.fillStyle(0x000000, 0.25); g.fillCircle(q.x + 3, q.y + 5, q.r);
  g.fillStyle(col, 1); g.fillCircle(q.x, q.y, q.r);
  g.lineStyle(4, 0x2a1408, 1); g.strokeCircle(q.x, q.y, q.r);
  g.fillStyle(0xffffff, 0.7); g.fillCircle(q.x - q.r * 0.35 + Math.sin(t * 12) * 2, q.y - q.r * 0.35, q.r * 0.25);
}

function drawDazed(g: G, x: number, y: number, t: number): void {
  for (let k = 0; k < 3; k++) {
    const a = t * 5 + (k / 3) * Math.PI * 2, sx = x + Math.cos(a) * 18, sy = y + Math.sin(a) * 6;
    g.fillStyle(0xffd24a, 1); g.fillTriangle(sx, sy - 7, sx - 6, sy + 4, sx + 6, sy + 4); g.fillTriangle(sx, sy + 7, sx - 6, sy - 4, sx + 6, sy - 4);
    g.lineStyle(1.5, 0x2a1408, 1); g.strokeCircle(sx, sy, 6);
  }
}
