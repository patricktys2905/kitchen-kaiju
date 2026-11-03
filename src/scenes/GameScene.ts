import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps, consumeTap, readSlot, slotLabel, type Slot } from '../input';
import { CUTLERY_LEN, fitInside, hasArt } from '../render/art';
import { ArtRenderer } from '../render/artRender';
import { drawCutleryShape, drawKaiju, drawTableLive } from '../render/draw';
import { body, display, popIn, withShadow } from '../render/fonts';
import { BotBrain, type Difficulty } from '../sim/bot';
import { P, SPECIES, TABLE, VIEW } from '../sim/constants';
import { CUTLERY } from '../sim/cutlery';
import { angleDiff } from '../sim/math';
import { World, type GameEvent, type PlayerInput } from '../sim/world';
import { isTouchDevice, setTouchHud, setTouchMode } from '../touch';

const STEP = 1 / 120;
const TOUCH_ASSIST_ANGLE = 0.45; // radians either side of facing
const HUD_X = (i: number) => 16 + i * 246; // panel left edge; panels are 236 wide

interface Particle { x: number; y: number; vx: number; vy: number; life: number; max: number; color: number; size: number; grav: number }
interface Ring { x: number; y: number; r: number; t: number; max: number; color: number }
interface Popup { text: Phaser.GameObjects.Text; vy: number; life: number }

export interface GameData {
  slots: Slot[];
  difficulty: Difficulty;
  species?: number[]; // which kaiju each slot picked
  tables?: number[] | null; // table pool (null/empty = all)
  seed?: number;
}

export class GameScene extends Phaser.Scene {
  private world!: World;
  private slots: Slot[] = [];
  private difficulty: Difficulty = 'normal';
  private bots: (BotBrain | null)[] = [];
  private acc = 0;
  private t = 0;
  private paused = false;
  private padPrevStart = false;

  private baseG!: Phaser.GameObjects.Graphics;
  private tableG!: Phaser.GameObjects.Graphics;
  private dynG!: Phaser.GameObjects.Graphics;
  private overG!: Phaser.GameObjects.Graphics;
  private art!: ArtRenderer;
  private species: number[] = [];
  private tables: number[] | null = null;
  private colors: number[] = [];
  private css: string[] = [];
  private hudIcons: (Phaser.GameObjects.Image | null)[] = [];
  private hudHeld: (Phaser.GameObjects.Image | null)[] = [];
  private fxG!: Phaser.GameObjects.Graphics;
  private hudG!: Phaser.GameObjects.Graphics;
  private nameTexts: Phaser.GameObjects.Text[] = [];
  private infoTexts: Phaser.GameObjects.Text[] = [];
  private roundText!: Phaser.GameObjects.Text;
  private feedTexts: Phaser.GameObjects.Text[] = [];
  private banner!: Phaser.GameObjects.Text;
  private bannerSub!: Phaser.GameObjects.Text;
  private popups: Popup[] = [];
  private parts: Particle[] = [];
  private rings: Ring[] = [];
  private feed: { text: string; color: string; t: number }[] = [];
  private bannerT = 0;
  private lastBanner = '';
  private eatSfxT = 0;

  constructor() {
    super('game');
  }

  init(data: GameData): void {
    this.slots = data.slots;
    this.difficulty = data.difficulty;
    const seed = data.seed ?? Math.floor(Math.random() * 1e9);
    this.species = this.slots.map((_, i) => data.species?.[i] ?? i);
    this.tables = data.tables?.length ? data.tables : null;
    this.colors = this.species.map(s => SPECIES[s].color);
    this.css = this.species.map(s => SPECIES[s].css);
    this.world = new World({ players: this.species.map(s => ({ name: SPECIES[s].name })), seed, layouts: this.tables ?? undefined });
    this.bots = this.slots.map((s, i) => (s.kind === 'bot' ? new BotBrain(i, this.difficulty, seed + i * 101) : null));
    this.acc = 0;
    this.t = 0;
    this.paused = false;
    this.parts = [];
    this.rings = [];
    this.feed = [];
    this.popups = [];
  }

  create(): void {
    clearTaps();
    this.baseG = this.add.graphics().setDepth(-2.5);
    this.tableG = this.add.graphics().setDepth(-1);
    this.dynG = this.add.graphics().setDepth(0);
    this.overG = this.add.graphics().setDepth(3.6);
    this.fxG = this.add.graphics().setDepth(3.8);
    this.hudG = this.add.graphics().setDepth(5);
    this.art = new ArtRenderer(this, this.baseG, this.tableG, { species: this.species, colors: this.colors });
    this.art.setupTable(this.world.layout, this.world.players.map(p => ({ x: p.x, y: p.y, color: this.colors[p.id] })));
    this.hudIcons = this.species.map((sp, i) => (hasArt(`kaiju-${sp}`) ? fitInside(this.add.image(HUD_X(i) + 20, 40, `kaiju-${sp}`), 40, 44).setDepth(6) : null));
    this.hudHeld = this.slots.map((_, i) => (hasArt('cut-fork') ? this.add.image(HUD_X(i) + 206, 18, 'cut-fork').setDepth(6).setRotation(-0.35) : null));

    this.nameTexts = [];
    this.infoTexts = [];
    this.slots.forEach((s, i) => {
      const x = HUD_X(i);
      this.nameTexts.push(withShadow(this.add.text(x + 48, 7, SPECIES[this.species[i]].name, display(20, this.css[i], { strokeThickness: 4 })).setDepth(6), 2));
      this.infoTexts.push(this.add.text(x + 48, 53, slotLabel(s), body(13, '#d9c7b3', 800)).setDepth(6));
    });
    this.roundText = this.add.text(VIEW.w - 16, 11, '', display(16, '#ffcf8a', { align: 'right', strokeThickness: 3 })).setOrigin(1, 0).setDepth(6);
    if (!isTouchDevice) this.add.text(VIEW.w - 16, 36, 'P pause · Esc menu', body(12, '#9c8a78', 700)).setOrigin(1, 0).setDepth(6);
    this.feedTexts = [0, 1].map(i => this.add.text(VIEW.w / 2, 680 + i * 19, '', body(16, '#fff', 900, { stroke: '#140b05', strokeThickness: 4 })).setOrigin(0.5, 0).setDepth(6));
    this.banner = withShadow(this.add.text(VIEW.w / 2, VIEW.h / 2 - 20, '', display(90, '#ffe9c7', { strokeThickness: 13, align: 'center', padding: { x: 10, y: 10 } })).setOrigin(0.5).setDepth(10), 8);
    this.bannerSub = withShadow(this.add.text(VIEW.w / 2, VIEW.h / 2 + 50, '', body(22, '#ffffff', 900, { stroke: '#2a1408', strokeThickness: 5, align: 'center' })).setOrigin(0.5).setDepth(10), 3);
    this.handleEvents(this.world.drainEvents());
  }

  // ---------------------------------------------------------------- loop
  update(_time: number, delta: number): void {
    const dt = Math.min(0.1, delta / 1000);
    this.t += dt;

    if (consumeTap('Escape')) { this.scene.start('menu', { slots: this.slots, difficulty: this.difficulty, species: this.species, tables: this.tables }); return; }
    if (consumeTap('KeyP') && this.world.phase !== 'matchEnd') this.paused = !this.paused;
    const anyStart = this.slots.some(s => s.kind === 'pad' && readSlot(s).start);
    if (anyStart && !this.padPrevStart && this.world.phase !== 'matchEnd') this.paused = !this.paused;
    if (this.world.phase === 'matchEnd' && (consumeTap('Digit1') || (anyStart && !this.padPrevStart))) {
      this.scene.restart({ slots: this.slots, difficulty: this.difficulty, species: this.species, tables: this.tables });
      return;
    }
    this.padPrevStart = anyStart;
    clearTaps();
    this.syncTouchUi();

    if (!this.paused) {
      const human: PlayerInput[] = this.slots.map((s, i) => {
        if (s.kind === 'bot') return { mx: 0, my: 0, throw: false, swipe: false, dash: false, stomp: false };
        const inp: PlayerInput = readSlot(s);
        if (s.kind === 'touch') this.touchAimAssist(i, inp);
        return inp;
      });
      this.acc += dt;
      let n = 0;
      while (this.acc >= STEP && n < 12) {
        const inputs = this.slots.map((_, i) => this.bots[i]?.decide(this.world, STEP) ?? human[i]);
        this.world.step(STEP, inputs);
        this.handleEvents(this.world.drainEvents());
        this.acc -= STEP;
        n++;
      }
      this.updateFx(dt);
    }
    this.render();
  }

  // ---------------------------------------------------------------- touch
  private syncTouchUi(): void {
    const ti = this.slots.findIndex(s => s.kind === 'touch');
    if (this.world.phase === 'matchEnd') { setTouchMode('end'); return; }
    setTouchMode(ti >= 0 ? 'game' : 'watch');
    if (ti >= 0) {
      const p = this.world.players[ti];
      setTouchHud({ stompReady: p.alive && p.meter >= 100 && p.kaijuT <= 0, armed: p.alive && p.holding !== null });
    }
  }

  /** Thumb aiming is coarse: when not drag-aiming, snap toward the rival closest to where you're facing. */
  private touchAimAssist(i: number, inp: PlayerInput): void {
    if (inp.aimX !== undefined) return;
    const w = this.world, p = w.players[i];
    if (!p.alive || p.holding === null) return;
    const facing = Math.hypot(inp.mx, inp.my) > 0.2 ? Math.atan2(inp.my, inp.mx) : p.aim;
    let best: number | null = null, bestDiff = TOUCH_ASSIST_ANGLE;
    for (const q of w.players) {
      if (q === p || !q.alive || Math.hypot(q.x - p.x, q.y - p.y) > 650) continue;
      const a = Math.atan2(q.y - p.y, q.x - p.x), diff = Math.abs(angleDiff(a, facing));
      if (diff < bestDiff) { bestDiff = diff; best = a; }
    }
    if (best !== null) { inp.aimX = Math.cos(best); inp.aimY = Math.sin(best); }
  }

  // ---------------------------------------------------------------- events -> juice
  private handleEvents(events: GameEvent[]): void {
    const w = this.world;
    for (const e of events) {
      switch (e.type) {
        case 'roundStart':
          this.art.setupTable(w.layout, this.world.players.map(p => ({ x: p.x, y: p.y, color: this.colors[p.id] })));
          this.parts = [];
          this.rings = [];
          break;
        case 'countdown': sfx.count(); break;
        case 'go': sfx.go(); this.bannerT = 0.6; break;
        case 'throw': sfx.throw(); break;
        case 'stick': sfx.thwock(); this.burst(e.x, e.y, 0x6b4021, 6, 120, 0.35); break;
        case 'vanish': this.burst(e.x, e.y, 0xffffff, 8, 80, 0.3); break;
        case 'bounce': sfx.clink(); this.burst(e.x, e.y, 0xffffff, 6, 160, 0.25); break;
        case 'pickup':
          if (e.stolenFrom !== null) { sfx.steal(); this.popup(e.x, e.y - 20, 'STOLEN!', this.css[e.id]); }
          else sfx.pickup();
          break;
        case 'catch':
          sfx.catch();
          if (e.from !== e.id) this.popup(e.x, e.y - 20, 'CAUGHT!', this.css[e.id]);
          break;
        case 'deflect': sfx.clink(); this.popup(e.x, e.y - 16, 'CLANK!', '#ffffff', 18); this.burst(e.x, e.y, 0xfff2a8, 12, 240, 0.3); break;
        case 'swipe': sfx.swipe(); break;
        case 'dash': sfx.dash(); break;
        case 'bump': sfx.bump(); this.shake(0.004, 90); this.burst(e.x, e.y, 0xffffff, 8, 200, 0.25); break;
        case 'eat':
          if (this.eatSfxT <= 0) { sfx.eat(); this.eatSfxT = 0.05; }
          this.burst(e.x, e.y, 0xe0b06a, 4, 80, 0.25);
          break;
        case 'meterFull': {
          sfx.meterFull();
          const p = w.players[e.id];
          this.popup(p.x, p.y - 34, 'STOMP READY!', this.css[e.id], 18);
          break;
        }
        case 'kaiju':
          sfx.kaiju();
          this.shake(0.012, 350);
          this.popup(e.x, e.y - 60, 'KAIJU!', this.css[e.id], 40);
          this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 160, color: this.colors[e.id] });
          break;
        case 'stomp':
          sfx.stomp();
          this.shake(0.005, 120);
          this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: e.r, color: 0xffffff });
          this.burst(e.x, e.y, 0x8a5a32, 10, 200, 0.4);
          break;
        case 'shrink': sfx.shrink(); break;
        case 'ko': this.onKO(e); break;
        case 'handWarn': sfx.handWarn(); break;
        case 'handSweep': sfx.handSweep(); this.shake(0.006, 400); break;
        case 'windWarn': sfx.windWarn(); this.popup(640, 140, 'GUST INCOMING!', '#ffffff', 26); break;
        case 'windGust': sfx.windGust(); this.shake(0.003, 1300); break;
        case 'cleaverWarn': sfx.cleaverWarn(); break;
        case 'burnerWarn': sfx.burnerWarn(); break;
        case 'burnerFlare': sfx.burnerFlare(); this.shake(0.006, 300); this.burst(e.x, e.y, 0xff7a1a, 30, 260, 0.6); this.burst(e.x, e.y, 0xffd040, 16, 180, 0.5); break;
        case 'cleaverChop': sfx.cleaverChop(); this.shake(0.014, 260); this.burst(e.x, 380, 0x8a5a32, 30, 300, 0.6); break;
        case 'spawnCutlery': sfx.spawn(); this.burst(e.x, e.y, 0xffffff, 14, 140, 0.5); break;
        case 'roundEnd':
          sfx.roundWin();
          break;
        case 'matchEnd':
          sfx.matchWin();
          break;
      }
    }
  }

  private onKO(e: Extract<GameEvent, { type: 'ko' }>): void {
    const names = this.world.players.map(p => p.name);
    const victim = names[e.id], killer = e.by !== null ? names[e.by] : null;
    const x = Phaser.Math.Clamp(e.x, TABLE.x, TABLE.x + TABLE.w), y = Phaser.Math.Clamp(e.y, TABLE.y, TABLE.y + TABLE.h);
    if (e.cause === 'fall' || e.cause === 'wind') sfx.fall(); else sfx.ko();
    this.shake(0.008, 180);
    this.burst(x, y, this.colors[e.id], 36, 360, 0.9, 300);
    this.burst(x, y, 0xffffff, 12, 260, 0.6, 300);
    this.burst(x, y, 0xe0b06a, 10, 200, 0.7, 300);
    let text: string;
    switch (e.cause) {
      case 'cutlery': text = `${killer} skewered ${victim}`; break;
      case 'swipe': text = `${killer} swiped ${victim}`; break;
      case 'squash': text = `${killer} SQUASHED ${victim}`; break;
      case 'fall': text = killer ? `${killer} shoved ${victim} off the table` : `${victim} fell off the table`; break;
      case 'hand': text = `${victim} got flicked by the GIANT HAND`; break;
      case 'wind': text = `${victim} got blown off the table`; break;
      case 'chop': text = `${victim} got CHOPPED by the cleaver`; break;
      case 'burn': text = `${victim} got grilled on the burner`; break;
    }
    if (e.by === null && e.cause === 'cutlery') text = `${victim} skewered themselves`;
    this.feed.unshift({ text, color: this.css[e.by ?? e.id], t: 4 });
    if (this.feed.length > 2) this.feed.pop();
  }

  // ---------------------------------------------------------------- fx helpers
  private burst(x: number, y: number, color: number, n: number, speed: number, life: number, grav = 0): void {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = Math.random() * speed;
      this.parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: life * (0.5 + Math.random() * 0.5), max: life, color, size: 2 + Math.random() * 3, grav });
    }
  }

  private popup(x: number, y: number, text: string, color: string, size = 22): void {
    const t = withShadow(this.add.text(x, y, text, display(size + 2, color, { strokeThickness: 5 })).setOrigin(0.5).setDepth(7), 3);
    popIn(this, t, 1.8, 260);
    this.popups.push({ text: t, vy: -50, life: 1 });
  }

  private shake(intensity: number, ms: number): void {
    this.cameras.main.shake(ms, intensity);
  }

  private updateFx(dt: number): void {
    this.eatSfxT -= dt;
    this.bannerT -= dt;
    for (const p of this.parts) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += p.grav * dt;
      const k = Math.pow(0.1, dt);
      p.vx *= k;
      p.vy *= k;
      p.life -= dt;
    }
    this.parts = this.parts.filter(p => p.life > 0);
    for (const r of this.rings) { r.t += dt; r.r = r.max * Math.min(1, r.t / 0.3); }
    this.rings = this.rings.filter(r => r.t < 0.5);
    for (const p of this.popups) {
      p.life -= dt;
      p.text.y += p.vy * dt;
      p.text.setAlpha(Math.min(1, p.life * 2));
      if (p.life <= 0) p.text.destroy();
    }
    this.popups = this.popups.filter(p => p.life > 0);
    for (const f of this.feed) f.t -= dt;
    this.feed = this.feed.filter(f => f.t > 0);
  }

  // ---------------------------------------------------------------- drawing
  private render(): void {
    const w = this.world, g = this.dynG, t = this.t;
    g.clear();
    this.overG.clear();
    if (!hasArt('ob-candle')) drawTableLive(g, w.layout, t);
    this.art.frame(w, t, g, this.overG);

    const fx = this.fxG;
    fx.clear();
    for (const p of this.parts) {
      fx.fillStyle(p.color, Math.max(0, p.life / p.max));
      fx.fillCircle(p.x, p.y, p.size * (0.4 + p.life / p.max));
    }
    for (const r of this.rings) {
      fx.lineStyle(5, r.color, Math.max(0, 1 - r.t / 0.5));
      fx.strokeCircle(r.x, r.y, r.r);
    }
    this.renderHud();
    this.renderBanner();
  }

  private renderHud(): void {
    const w = this.world, g = this.hudG, t = this.t;
    g.clear();
    g.fillStyle(0x0d0805, 0.85);
    g.fillRect(0, 0, VIEW.w, 80);
    w.players.forEach((p, i) => {
      const x = HUD_X(i);
      g.fillStyle(0xffffff, p.alive ? 0.06 : 0.02);
      g.fillRoundedRect(x - 6, 6, 236, 68, 10);
      const icon = this.hudIcons[i];
      if (icon) fitInside(icon.setAlpha(p.alive ? 1 : 0.35).setTexture(p.kaijuT > 0 && hasArt(`kaiju-${this.species[i]}-rage`) ? `kaiju-${this.species[i]}-rage` : `kaiju-${this.species[i]}`), 40, 44);
      else drawKaiju(g, { x: x + 20, y: 40, r: 17, aim: Math.PI / 2, kaiju: false, species: this.species[i], color: this.colors[i] }, t, p.alive ? 1 : 0.35);
      // round stars (second row, right of the belly meter)
      for (let s = 0; s < w.opts.target; s++) {
        const sx = x + 160 + s * 14, sy = 41;
        g.fillStyle(s < p.score ? this.colors[i] : 0x3a2c22, 1);
        const pts: { x: number; y: number }[] = [];
        for (let k = 0; k < 10; k++) {
          const r = k % 2 ? 2.8 : 6.5, a = (k / 10) * Math.PI * 2 - Math.PI / 2;
          pts.push({ x: sx + Math.cos(a) * r, y: sy + Math.sin(a) * r });
        }
        g.fillPoints(pts as unknown as Phaser.Math.Vector2[], true);
      }
      // belly meter
      const bx = x + 48, by = 36, bw = 100;
      g.fillStyle(0x000000, 0.6); g.fillRect(bx, by, bw, 10);
      const full = p.meter >= 100;
      g.fillStyle(p.kaijuT > 0 ? 0xff3b3b : full ? (Math.floor(t * 8) % 2 ? 0xffffff : 0xff3b3b) : 0xffb347, 1);
      g.fillRect(bx, by, p.kaijuT > 0 ? (bw * p.kaijuT) / P.kaijuTime : (bw * p.meter) / 100, 10);
      // held cutlery icon
      const held = w.cutleryById(p.holding);
      const hi = this.hudHeld[i];
      if (hi) {
        const show = !!held && p.alive && hasArt(`cut-${held.kind}`);
        hi.setVisible(show);
        if (show && held) { hi.setTexture(`cut-${held.kind}`); hi.setScale((CUTLERY_LEN[held.kind] * 0.85) / hi.width); }
      } else if (held && p.alive) drawCutleryShape(g, held.kind, x + 206, 18, -0.35, 0.85);
      this.nameTexts[i].setAlpha(p.alive ? 1 : 0.4);
      const status = !p.alive ? 'KNOCKED OUT' : p.kaijuT > 0 ? 'KAIJU MODE!' : full ? 'STOMP READY!' : held ? CUTLERY[held.kind].name : 'unarmed';
      this.infoTexts[i].setText(`${status} · KOs ${p.kos}`);
    });
    this.roundText.setText(`ROUND ${w.round} · ${w.layout.name.toUpperCase()}`);
    this.feedTexts.forEach((tx, i) => {
      const f = this.feed[i];
      tx.setText(f ? f.text : '');
      if (f) tx.setColor(f.color).setAlpha(Math.min(1, f.t));
    });
  }

  private renderBanner(): void {
    const w = this.world;
    let main = '', sub = '', color = '#ffe9c7';
    if (this.paused) {
      main = 'PAUSED';
      sub = 'P / START to resume · Esc for menu';
    } else if (w.phase === 'countdown') {
      const n = Math.ceil((1.6 - w.phaseT) / (1.6 / 3));
      main = String(Math.max(1, n));
      sub = `Round ${w.round} · ${w.layout.name}`;
    } else if (w.phase === 'play' && this.bannerT > 0) {
      main = 'DIG IN!';
    } else if (w.phase === 'roundEnd') {
      if (w.winner !== null) { main = `${w.players[w.winner].name} WINS THE ROUND`; color = this.css[w.winner]; }
      else { main = 'NOBODY SURVIVED DINNER'; }
      sub = w.players.map(p => `${p.name} ${'★'.repeat(p.score)}${'☆'.repeat(w.opts.target - p.score)}`).join('     ');
    } else if (w.phase === 'matchEnd' && w.winner !== null) {
      main = `${SPECIES[this.species[w.winner]].full.toUpperCase()}\nRULES THE TABLE`;
      color = this.css[w.winner];
      const ranked = w.players.slice().sort((a, b) => b.score - a.score || b.kos - a.kos);
      sub = ranked.map((p, i) => `${i + 1}. ${p.name}  ${p.score} rounds · ${p.kos} KOs`).join('\n') + '\n\n1 / START rematch · Esc menu';
    }
    if (main !== this.lastBanner) { this.lastBanner = main; if (main) popIn(this, this.banner, 1.5, 380); }
    this.banner.setText(main).setColor(color).setFontSize(main.length > 14 ? 58 : 90);
    this.banner.setY(w.phase === 'matchEnd' ? 210 : VIEW.h / 2 - 20);
    this.bannerSub.setText(sub).setY(w.phase === 'matchEnd' ? 380 : VIEW.h / 2 + 50);
  }
}
