// 🛠 Table Workshop: build up to 3 custom tables (surface + hazard + props) for local play.
import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { BASE_COUNT, HAZARD_CHOICES, HAZARD_NAMES, loadCustom, MAX_CUSTOM, MAX_PROPS, PROPS, saveCustom, SPAWNS, type CustomTable } from '../custom';
import { clearTaps, consumeTap } from '../input';
import { playMusic } from '../music';
import { fitInside, hasArt } from '../render/art';
import { drawFloor } from '../render/draw';
import { body, display, withShadow } from '../render/fonts';
import { Button } from '../render/ui';
import { TABLE } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { owned } from '../story/unlocks';
import { setTouchMode } from '../touch';
import { checkAchievements, loadStats, saveStats } from '../stats';

// the table preview is drawn scaled down on the right
const PS = 0.72, PX = 470, PY = 150;
const toScreen = (x: number, y: number) => ({ x: PX + (x - TABLE.x) * PS, y: PY + (y - TABLE.y) * PS });
const toTable = (sx: number, sy: number) => ({ x: TABLE.x + (sx - PX) / PS, y: TABLE.y + (sy - PY) / PS });

export class WorkshopScene extends Phaser.Scene {
  private list: CustomTable[] = [];
  private slot = 0;
  private pick = 0;
  private objs: Phaser.GameObjects.GameObject[] = [];
  private buttons: Button[] = [];
  private surfaces: number[] = [];
  private note!: Phaser.GameObjects.Text;

  constructor() {
    super('workshop');
  }

  create(): void {
    clearTaps();
    setTouchMode('title');
    playMusic('menu');
    this.buttons = [];
    this.surfaces = owned().tables.filter(i => i < BASE_COUNT);
    this.list = loadCustom();
    if (hasArt('bg-menu')) this.add.image(640, 360, 'bg-menu').setDisplaySize(1280, 720).setDepth(-3);
    else drawFloor(this.add.graphics().setDepth(-3));
    this.add.graphics().setDepth(-2).fillStyle(0x0d0805, 0.75).fillRect(0, 0, 1280, 720);
    withShadow(this.add.text(640, 40, '🛠 TABLE WORKSHOP', display(40, '#ffcf8a', { strokeThickness: 7 })).setOrigin(0.5).setDepth(5), 4);
    this.note = this.add.text(PX + TABLE.w * PS / 2, 588, '', body(15, '#e9dccb', 800, { align: 'center' })).setOrigin(0.5, 0).setDepth(5);
    const btn = (x: number, y: number, w: number, label: string, fn: () => void, accent?: number) => {
      const b = new Button(this, x, y, { w, h: 46, label, size: 17, accent, onClick: fn }, 6);
      this.buttons.push(b);
      return b;
    };
    btn(92, 40, 150, '◀ BACK', () => { sfx.leave(); this.scene.start('title'); });
    // palette
    this.add.text(40, 92, 'PROPS (tap one, then tap the table)', body(14, '#ffd24a', 900)).setDepth(5);
    PROPS.forEach(([style], i) => {
      const x = 70 + (i % 4) * 96, y = 150 + Math.floor(i / 4) * 92;
      const z = this.add.zone(x, y, 88, 84).setInteractive({ useHandCursor: true }).setDepth(7);
      z.on('pointerup', () => { this.pick = i; sfx.pickup(); this.redraw(); });
    });
    const tableZone = this.add.zone(PX + (TABLE.w * PS) / 2, PY + (TABLE.h * PS) / 2, TABLE.w * PS, TABLE.h * PS).setInteractive({ useHandCursor: true }).setDepth(7);
    tableZone.on('pointerup', (p: Phaser.Input.Pointer) => this.tapTable(p.x, p.y));
    btn(110, 548, 180, '◀ SURFACE ▶', () => this.cycleSurface(), 0x4fd1ff);
    btn(310, 548, 180, '⚠ HAZARD ▶', () => this.cycleHazard(), 0xff8a7a);
    btn(110, 604, 180, '🗑 CLEAR', () => { this.cur().props = []; sfx.thwock(); this.redraw(); });
    btn(310, 604, 180, '📂 NEXT SLOT', () => { this.slot = (this.slot + 1) % MAX_CUSTOM; sfx.pickup(); this.redraw(); });
    btn(110, 660, 180, '💾 SAVE', () => this.save(), 0x8dff6a);
    btn(310, 660, 180, '▶ PLAY IT', () => this.playIt(), 0xffd24a);
    this.redraw();
  }

  private cur(): CustomTable {
    if (!this.list[this.slot]) this.list[this.slot] = { name: `My Table ${this.slot + 1}`, surface: this.surfaces[0] ?? 0, hazard: 'none', props: [] };
    return this.list[this.slot];
  }

  private cycleSurface(): void {
    const c = this.cur(), i = this.surfaces.indexOf(c.surface);
    c.surface = this.surfaces[(i + 1) % this.surfaces.length];
    sfx.pickup();
    this.redraw();
  }

  private cycleHazard(): void {
    const c = this.cur();
    c.hazard = HAZARD_CHOICES[(HAZARD_CHOICES.indexOf(c.hazard) + 1) % HAZARD_CHOICES.length];
    sfx.pickup();
    this.redraw();
  }

  private tapTable(sx: number, sy: number): void {
    const c = this.cur(), t = toTable(sx, sy);
    const hit = c.props.findIndex(p => Math.hypot(p.x - t.x, p.y - t.y) < p.r);
    if (hit >= 0) { c.props.splice(hit, 1); sfx.thwock(); this.redraw('Removed.'); return; }
    const [style, r] = PROPS[this.pick];
    if (c.props.length >= MAX_PROPS) { sfx.thwock(); this.redraw(`That's the most props (${MAX_PROPS}). Tap one to remove it.`); return; }
    if (t.x < TABLE.x + r + 10 || t.x > TABLE.x + TABLE.w - r - 10 || t.y < TABLE.y + r + 10 || t.y > TABLE.y + TABLE.h - r - 10) { sfx.thwock(); this.redraw('Too close to the edge.'); return; }
    if (SPAWNS.some(s => Math.hypot(s[0] - t.x, s[1] - t.y) < r + 70)) { sfx.thwock(); this.redraw('Keep the start spots (circles) clear.'); return; }
    if (c.props.some(p => Math.hypot(p.x - t.x, p.y - t.y) < p.r + r + 8)) { sfx.thwock(); this.redraw('Too close to another prop.'); return; }
    c.props.push({ style, x: Math.round(t.x), y: Math.round(t.y), r });
    sfx.spawn();
    this.redraw();
  }

  private save(): void {
    this.cur();
    saveCustom(this.list.filter(Boolean));
    this.list = loadCustom();
    sfx.meterFull();
    const st = loadStats(), got = checkAchievements(st);
    saveStats(st);
    this.redraw(got.length ? `Saved! 🏆 ${got.map(a => a.name).join(', ')} unlocked!` : 'Saved! Pick it in Free Play with [M] / TABLE.');
  }

  private playIt(): void {
    this.save();
    const index = BASE_COUNT + Math.min(this.slot, this.list.length - 1);
    sfx.go();
    this.scene.start('game', {
      slots: [{ kind: 'kb', index: 0 }, { kind: 'bot', index: 0 }, { kind: 'bot', index: 0 }, { kind: 'bot', index: 0 }],
      difficulty: 'easy', species: owned().kaiju.slice(0, 4), tables: [index], rounds: 3,
    });
  }

  private redraw(msg = ''): void {
    for (const o of this.objs) o.destroy();
    this.objs = [];
    const add = <T extends Phaser.GameObjects.GameObject>(o: T): T => { this.objs.push(o); return o; };
    const c = this.cur(), g = add(this.add.graphics().setDepth(4));
    // palette
    PROPS.forEach(([style], i) => {
      const x = 70 + (i % 4) * 96, y = 150 + Math.floor(i / 4) * 92;
      g.fillStyle(i === this.pick ? 0x4a2812 : 0x1c1714, 1).fillRoundedRect(x - 44, y - 42, 88, 84, 12);
      g.lineStyle(3, i === this.pick ? 0xffd24a : 0x4a3e34, 1).strokeRoundedRect(x - 44, y - 42, 88, 84, 12);
      if (hasArt(`ob-${style}`)) add(fitInside(this.add.image(x, y - 6, `ob-${style}`), 60, 56).setDepth(5));
      add(this.add.text(x, y + 30, style === 'gumdrop' ? 'BUMPER' : style.toUpperCase(), body(10, '#cdb9a3', 900)).setOrigin(0.5).setDepth(5));
    });
    // table preview
    const W = TABLE.w * PS, H = TABLE.h * PS, key = LAYOUTS[c.surface]?.table;
    g.fillStyle(0x000000, 0.4).fillRoundedRect(PX - 10, PY - 10, W + 20, H + 20, 18);
    if (key && hasArt(key)) add(this.add.image(PX + W / 2, PY + H / 2, key).setDisplaySize(W, H).setDepth(4));
    else g.fillStyle(0xc89a64, 1).fillRect(PX, PY, W, H);
    const g2 = add(this.add.graphics().setDepth(6));
    for (const s of SPAWNS) { const p = toScreen(s[0], s[1]); g2.lineStyle(2, 0xffffff, 0.5).strokeCircle(p.x, p.y, 18); }
    for (const pr of c.props) {
      const p = toScreen(pr.x, pr.y);
      if (hasArt(`ob-${pr.style}`)) add(fitInside(this.add.image(p.x, p.y, `ob-${pr.style}`), pr.r * 2 * PS * 1.25, pr.r * 2 * PS * 1.25).setDepth(6));
      else g2.fillStyle(0xffffff, 0.8).fillCircle(p.x, p.y, pr.r * PS);
    }
    add(this.add.text(PX, PY - 46, `SLOT ${this.slot + 1}/${MAX_CUSTOM}: ${c.name}  ·  ${LAYOUTS[c.surface]?.name ?? ''} surface  ·  ${HAZARD_NAMES[c.hazard]}  ·  ${c.props.length}/${MAX_PROPS} props`, body(15, '#ffe9c7', 900)).setDepth(5));
    this.note.setText(msg || 'Tap the table to place the selected prop · tap a prop to remove it · white circles = start spots');
  }

  update(_t: number, delta: number): void {
    for (const b of this.buttons) b.update(delta / 1000);
    if (consumeTap('Escape')) { this.scene.start('title'); return; }
    clearTaps();
  }
}
