// 🛠 Table Workshop: build up to 3 custom tables (surface + hazard + props) for local play.
import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { BASE_COUNT, HAZARD_CHOICES, HAZARD_INFO, HAZARD_NAMES, propInfo, loadCustom, MAX_CUSTOM, MAX_PROPS, PROPS, saveCustom, SPAWNS, spawnsOf, FEATURED, type CustomTable } from '../custom';
import { clearTaps, consumeTap } from '../input';
import { playMusic } from '../music';
import { fitInside, hasArt } from '../render/art';
import { drawFloor } from '../render/draw';
import { body, display, withShadow } from '../render/fonts';
import { Button } from '../render/ui';
import { TABLE } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { owned } from '../story/unlocks';
import { isTouchDevice, setTouchMode } from '../touch';
import { checkAchievements, loadStats, saveStats } from '../stats';

// the table preview is drawn scaled down on the right
const PS = 0.72, PX = 470, PY = 150;
const toScreen = (x: number, y: number) => ({ x: PX + (x - TABLE.x) * PS, y: PY + (y - TABLE.y) * PS });
const toTable = (sx: number, sy: number) => ({ x: TABLE.x + (sx - PX) / PS, y: TABLE.y + (sy - PY) / PS });

export class WorkshopScene extends Phaser.Scene {
  private list: CustomTable[] = [];
  private slot = 0;
  private pick = 0;
  private spotMode = false; // 📍 taps move start spots instead of placing props
  private snap = false; // ▦ place on a 40-px grid
  private erase = false; // 🗑 taps remove props (otherwise a tap turns a prop 90°)
  private featured = 0;
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
    let shared: string | null = null;
    try { shared = sessionStorage.getItem('kk-shared-table'); sessionStorage.removeItem('kk-shared-table'); } catch { /* blocked */ }
    if (hasArt('bg-menu')) this.add.image(640, 360, 'bg-menu').setDisplaySize(1280, 720).setDepth(-3);
    else drawFloor(this.add.graphics().setDepth(-3));
    this.add.graphics().setDepth(-2).fillStyle(0x0d0805, 0.75).fillRect(0, 0, 1280, 720);
    withShadow(this.add.text(640, 40, '🛠 TABLE WORKSHOP', display(40, '#ffcf8a', { strokeThickness: 7 })).setOrigin(0.5).setDepth(5), 4);
    this.note = this.add.text(PX + TABLE.w * PS / 2, 588, '', body(15, '#e9dccb', 800, { align: 'center', wordWrap: { width: TABLE.w * PS + 40 } })).setOrigin(0.5, 0).setDepth(5);
    const btn = (x: number, y: number, w: number, label: string, fn: () => void, accent?: number) => {
      const b = new Button(this, x, y, { w, h: 46, label, size: 17, accent, onClick: fn }, 6);
      this.buttons.push(b);
      return b;
    };
    btn(isTouchDevice ? 250 : 92, 40, 150, '◀ BACK', () => { sfx.leave(); this.scene.start('title'); });
    // palette
    this.add.text(40, 84, 'PROPS: tap one, then tap the table', body(13, '#ffd24a', 900)).setDepth(5);
    PROPS.forEach(([style], i) => {
      const x = 70 + (i % 4) * 96, y = 150 + Math.floor(i / 4) * 92;
      const z = this.add.zone(x, y, 88, 84).setInteractive({ useHandCursor: true }).setDepth(7);
      z.on('pointerup', () => { this.pick = i; sfx.pickup(); this.redraw(`👉 ${propInfo(PROPS[i][0], PROPS[i][1])}`); });
    });
    const tableZone = this.add.zone(PX + (TABLE.w * PS) / 2, PY + (TABLE.h * PS) / 2, TABLE.w * PS, TABLE.h * PS).setInteractive({ useHandCursor: true }).setDepth(7);
    tableZone.on('pointerup', (p: Phaser.Input.Pointer) => this.tapTable(p.x, p.y));
    btn(110, 548, 180, '◀ SURFACE ▶', () => this.cycleSurface(), 0x4fd1ff);
    btn(310, 548, 180, '⚠ HAZARD ▶', () => this.cycleHazard(), 0xff8a7a);
    btn(55, 604, 72, '↶ UNDO', () => { const c = this.cur(); if (c.props.length) { c.props.pop(); sfx.pickup(); } else sfx.thwock(); this.redraw(); });
    btn(133, 604, 72, '🗑 CLEAR', () => { this.cur().props = []; sfx.thwock(); this.redraw(); });
    btn(213, 604, 72, '◀ SLOT', () => { this.slot = (this.slot + MAX_CUSTOM - 1) % MAX_CUSTOM; sfx.pickup(); this.redraw(); });
    btn(291, 604, 72, 'SLOT ▶', () => { this.slot = (this.slot + 1) % MAX_CUSTOM; sfx.pickup(); this.redraw(); });
    btn(370, 604, 72, '📝 NAME', () => { // ✏ rename this table (SAVE to keep it)
      const n = window.prompt('Name this table (up to 18 letters):', this.cur().name)?.trim().slice(0, 18);
      if (n) { this.cur().name = n; sfx.pickup(); this.redraw('Renamed! Press 💾 SAVE to keep it.'); } else sfx.thwock();
    });
    const spotBtn = btn(64, 500, 96, '📍 SPOTS', () => { this.spotMode = !this.spotMode; sfx.pickup(); spotBtn.setText(this.spotMode ? '📍 SPOTS ✔' : '📍 SPOTS'); this.redraw(this.spotMode ? '📍 Tap the table: the nearest start spot moves there. Tap 📍 again to go back to props.' : ''); }, 0xffd24a);
    const snapBtn = btn(164, 500, 96, '▦ SNAP', () => { this.snap = !this.snap; sfx.pickup(); snapBtn.setText(this.snap ? '▦ SNAP ✔' : '▦ SNAP'); this.redraw(this.snap ? '▦ Props and spots snap to a grid.' : ''); }, 0x8dd8ff);
    const eraseBtn = btn(264, 500, 96, '🗑 ERASE', () => { this.erase = !this.erase; sfx.pickup(); eraseBtn.setText(this.erase ? '🗑 ERASE ✔' : '🗑 ERASE'); this.redraw(this.erase ? '🗑 Tap a prop to remove it.' : '🔄 Tap a prop to turn it 90°.'); }, 0xff8a7a);
    btn(364, 500, 96, '⭐ FEATURED', () => { const f = FEATURED[this.featured++ % FEATURED.length]; this.list[this.slot] = { ...JSON.parse(JSON.stringify(f)), surface: this.surfaces.includes(f.surface) ? f.surface : this.surfaces[0] ?? 0 }; sfx.matchWin(); this.redraw(`⭐ Loaded "${f.name}" into this slot: PLAY IT, remix it, or 💾 SAVE to keep it.`); }, 0xff7ad9);
    btn(75, 660, 124, '💾 SAVE', () => this.save(), 0x8dff6a);
    btn(205, 660, 124, '▶ PLAY IT', () => this.playIt(), 0xffd24a);
    btn(335, 660, 124, '🔗 LINK', () => { // a link that opens this table in anyone's Workshop
      const link = `${location.origin}${location.pathname}?table=${encodeURIComponent('KKT1-' + btoa(JSON.stringify(this.cur())))}`;
      void navigator.clipboard?.writeText(link).catch(() => {}); sfx.pickup();
      this.note.setText('🔗 Table link copied! Anyone who opens it gets this table in their Workshop.');
    }, 0x8dd8ff);
    // 📋 share codes: copy this table as a code, or load a friend's (then SAVE to keep it)
    btn(1000, 40, 170, '📋 COPY CODE', () => {
      const code = 'KKT1-' + btoa(JSON.stringify(this.cur()));
      try { void navigator.clipboard?.writeText(code); } catch { /* blocked */ }
      this.note.setText('Table code copied: send it to a friend!\n' + (code.length > 70 ? code.slice(0, 70) + '…' : code)); sfx.pickup();
    }, 0x8dd8ff);
    btn(1182, 40, 170, '📥 PASTE CODE', () => {
      const c = window.prompt('Paste a table code (KKT1-…)');
      if (!c) return;
      try {
        const t = JSON.parse(atob(c.trim().replace(/^KKT1-/, ''))) as CustomTable;
        if (!t || !Array.isArray(t.props) || typeof t.surface !== 'number') throw new Error('bad');
        t.props = t.props.filter(q => PROPS.some(([st]) => st === q.style)).slice(0, MAX_PROPS);
        t.name = String(t.name ?? 'Shared table').slice(0, 24);
        if (t.spawns && !(Array.isArray(t.spawns) && t.spawns.length === SPAWNS.length && t.spawns.every(s => Array.isArray(s) && s.every(v => typeof v === 'number')))) delete t.spawns;
        if (!this.surfaces.includes(t.surface)) t.surface = this.surfaces[0] ?? 0;
        this.list[this.slot] = t; sfx.matchWin(); this.redraw();
        this.note.setText('Loaded a shared table! Press 💾 SAVE to keep it.');
      } catch { sfx.thwock(); this.note.setText("That code didn't work. Check it and try again."); }
    }, 0x8dd8ff);
    this.redraw();
    if (shared) this.loadShared(shared);
  }

  /** 🔗 a table from a share link: goes into a free slot (or the current one), ready to PLAY or 💾 SAVE. */
  private loadShared(code: string): void {
    try {
      const t = JSON.parse(atob(code.trim().replace(/^KKT1-/, ''))) as CustomTable;
      if (!t || !Array.isArray(t.props) || typeof t.surface !== 'number') throw new Error('bad');
      t.props = t.props.filter(q => PROPS.some(([st]) => st === q.style)).slice(0, MAX_PROPS);
      t.name = String(t.name ?? 'Shared table').slice(0, 24);
      if (!this.surfaces.includes(t.surface)) t.surface = this.surfaces[0] ?? 0;
      this.slot = this.list.length < MAX_CUSTOM ? this.list.length : this.slot;
      this.list[this.slot] = t; sfx.matchWin(); this.redraw();
      this.note.setText(`🔗 Opened "${t.name}" from a link! ▶ PLAY IT, or 💾 SAVE to keep it.`);
    } catch { sfx.thwock(); this.note.setText("That table link didn't work."); }
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
    this.redraw(`⚠ ${HAZARD_INFO[c.hazard] ?? ''}`);
  }

  private tapTable(sx: number, sy: number): void {
    const c = this.cur(), t = toTable(sx, sy);
    if (this.snap) { t.x = Math.round(t.x / 40) * 40; t.y = Math.round(t.y / 40) * 40; }
    if (this.spotMode) { this.moveSpot(c, t.x, t.y); return; }
    const hit = c.props.findIndex(p => Math.hypot(p.x - t.x, p.y - t.y) < p.r);
    if (hit >= 0) {
      if (this.erase) { c.props.splice(hit, 1); sfx.thwock(); this.redraw('Removed.'); return; }
      c.props[hit].rot = ((c.props[hit].rot ?? 0) + 1) % 4; sfx.pickup(); this.redraw('🔄 Turned 90°. (Switch on 🗑 ERASE to remove props instead.)'); return; // tap a prop to turn it
    }
    if (this.erase) { sfx.thwock(); this.redraw('🗑 ERASE is on: tap a prop to remove it.'); return; }
    const [style, r] = PROPS[this.pick];
    if (c.props.length >= MAX_PROPS) { sfx.thwock(); this.redraw(`That's the most props (${MAX_PROPS}). Tap one to remove it.`); return; }
    if (t.x < TABLE.x + r + 10 || t.x > TABLE.x + TABLE.w - r - 10 || t.y < TABLE.y + r + 10 || t.y > TABLE.y + TABLE.h - r - 10) { sfx.thwock(); this.redraw('Too close to the edge.'); return; }
    if (spawnsOf(c).some(s => Math.hypot(s[0] - t.x, s[1] - t.y) < r + 70)) { sfx.thwock(); this.redraw('Keep the start spots (circles) clear.'); return; }
    if (c.props.some(p => Math.hypot(p.x - t.x, p.y - t.y) < p.r + r + 8)) { sfx.thwock(); this.redraw('Too close to another prop.'); return; }
    c.props.push({ style, x: Math.round(t.x), y: Math.round(t.y), r });
    sfx.spawn();
    this.redraw();
  }

  /** 📍 move the start spot nearest the tap (kept on the table, off props, apart from the others). */
  private moveSpot(c: CustomTable, x: number, y: number): void {
    const spots = spawnsOf(c).map(s => [s[0], s[1]] as [number, number]);
    let k = 0; spots.forEach((s, i) => { if (Math.hypot(s[0] - x, s[1] - y) < Math.hypot(spots[k][0] - x, spots[k][1] - y)) k = i; });
    const m = 40;
    if (x < TABLE.x + m || x > TABLE.x + TABLE.w - m || y < TABLE.y + m || y > TABLE.y + TABLE.h - m) { sfx.thwock(); this.redraw('Too close to the edge for a start spot.'); return; }
    if (c.props.some(p => Math.hypot(p.x - x, p.y - y) < p.r + 40)) { sfx.thwock(); this.redraw('A start spot can\'t sit on a prop.'); return; }
    if (spots.some((s, i) => i !== k && Math.hypot(s[0] - x, s[1] - y) < 90)) { sfx.thwock(); this.redraw('Keep start spots apart (or kaiju start on top of each other).'); return; }
    spots[k] = [Math.round(x), Math.round(y)];
    c.spawns = spots;
    sfx.spawn();
    this.redraw(`📍 Start spot ${k + 1} moved. Press 💾 SAVE to keep it.`);
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
      slots: [isTouchDevice ? { kind: 'touch', index: 0 } : { kind: 'kb', index: 0 }, { kind: 'bot', index: 0 }, { kind: 'bot', index: 0 }, { kind: 'bot', index: 0 }],
      difficulty: 'easy', species: owned().kaiju.slice(0, 4), tables: [index], rounds: 3, from: 'workshop', // back to the Workshop after (Free Play keeps its own table)
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
      { const t = add(this.add.text(x, y + 30, style === 'gumdrop' ? 'BUMPER' : style.toUpperCase(), body(10, '#cdb9a3', 900)).setOrigin(0.5).setDepth(5)); if (t.width > 80) t.setScale(80 / t.width); }
    });
    // table preview
    const W = TABLE.w * PS, H = TABLE.h * PS, key = LAYOUTS[c.surface]?.table;
    g.fillStyle(0x000000, 0.4).fillRoundedRect(PX - 10, PY - 10, W + 20, H + 20, 18);
    if (key && hasArt(key)) add(this.add.image(PX + W / 2, PY + H / 2, key).setDisplaySize(W, H).setDepth(4));
    else g.fillStyle(0xc89a64, 1).fillRect(PX, PY, W, H);
    const g2 = add(this.add.graphics().setDepth(6));
    // the chosen surface and hazard, shown ON the preview
    add(this.add.text(PX + 10, PY + H - 10, `🍽 ${LAYOUTS[c.surface]?.name ?? ''}`, body(14, '#ffffff', 900, { backgroundColor: '#0d0805cc', padding: { x: 8, y: 4 } })).setOrigin(0, 1).setDepth(7));
    if (c.hazard !== 'none') { const icon: Record<string, string> = { hand: '✋', wind: '💨', cleaver: '🔪', cheese: '🧀', spatula: '🍳' }; add(this.add.text(PX + W - 10, PY + 10, `${icon[c.hazard] ?? '⚠'} ${HAZARD_NAMES[c.hazard]}`, body(16, '#ffb347', 900, { backgroundColor: '#0d0805cc', padding: { x: 8, y: 4 } })).setOrigin(1, 0).setDepth(7)); }
    spawnsOf(c).forEach((s, k) => { const p = toScreen(s[0], s[1]); g2.lineStyle(this.spotMode ? 3 : 2, this.spotMode ? 0xffd24a : 0xffffff, this.spotMode ? 1 : 0.5).strokeCircle(p.x, p.y, 18); if (this.spotMode) add(this.add.text(p.x, p.y, String(k + 1), body(14, '#ffd24a', 900)).setOrigin(0.5).setDepth(7)); });
    for (const pr of c.props) {
      const p = toScreen(pr.x, pr.y);
      if (hasArt(`ob-${pr.style}`)) add(fitInside(this.add.image(p.x, p.y, `ob-${pr.style}`), pr.r * 2 * PS * 1.25, pr.r * 2 * PS * 1.25).setDepth(6).setRotation(((pr.rot ?? 0) % 4) * Math.PI / 2));
      else g2.fillStyle(0xffffff, 0.8).fillCircle(p.x, p.y, pr.r * PS);
    }
    add(this.add.text(PX, PY - 46, `SLOT ${this.slot + 1}/${MAX_CUSTOM}: ${c.name}  ·  ${LAYOUTS[c.surface]?.name ?? ''} surface  ·  ${HAZARD_NAMES[c.hazard]}  ·  ${c.props.length}/${MAX_PROPS} props`, body(15, '#ffe9c7', 900)).setDepth(5));
    this.note.setText(msg || `👉 ${propInfo(PROPS[this.pick][0], PROPS[this.pick][1])} · tap the table to place it · 🔄 tap a placed prop to turn it · 🗑 ERASE removes · white circles = start spots`);
  }

  update(_t: number, delta: number): void {
    for (const b of this.buttons) b.update(delta / 1000);
    if (consumeTap('Escape')) { this.scene.start('title'); return; }
    clearTaps();
  }
}
