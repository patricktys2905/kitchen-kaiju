import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps, consumeTap, readSlot, slotLabel, type Slot } from '../input';
import { drawCrumbs, drawCutlery, drawCutleryShape, drawHand, drawKaiju, drawPlayer, drawTable, drawTableLive } from '../render/draw';
import { BotBrain, type Difficulty } from '../sim/bot';
import { COLORS, COLOR_CSS, P, SPECIES, TABLE, VIEW } from '../sim/constants';
import { CUTLERY } from '../sim/cutlery';
import { angleDiff } from '../sim/math';
import { World, type GameEvent, type PlayerInput } from '../sim/world';
import { isTouchDevice, setTouchHud, setTouchMode } from '../touch';

const STEP = 1 / 120;
const FONT = 'Arial Black, Impact, sans-serif';
const TOUCH_ASSIST_ANGLE = 0.45; // radians either side of facing
const HUD_X = (i: number) => 16 + i * 246; // panel left edge; panels are 236 wide

interface Particle { x: number; y: number; vx: number; vy: number; life: number; max: number; color: number; size: number; grav: number }
interface Ring { x: number; y: number; r: number; t: number; max: number; color: number }
interface Popup { text: Phaser.GameObjects.Text; vy: number; life: number }

export interface GameData {
  slots: Slot[];
  difficulty: Difficulty;
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

  private tableG!: Phaser.GameObjects.Graphics;
  private dynG!: Phaser.GameObjects.Graphics;
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
  private eatSfxT = 0;

  constructor() {
    super('game');
  }

  init(data: GameData): void {
    this.slots = data.slots;
    this.difficulty = data.difficulty;
    const seed = data.seed ?? Math.floor(Math.random() * 1e9);
    this.world = new World({ players: this.slots.map((_, i) => ({ name: SPECIES[i].name })), seed });
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
    this.tableG = this.add.graphics().setDepth(0);
    this.dynG = this.add.graphics().setDepth(1);
    this.fxG = this.add.graphics().setDepth(2);
    this.hudG = this.add.graphics().setDepth(3);
    drawTable(this.tableG, this.world.layout);

    this.nameTexts = [];
    this.infoTexts = [];
    this.slots.forEach((s, i) => {
      const x = HUD_X(i);
      this.nameTexts.push(this.add.text(x + 48, 8, SPECIES[i].name, { fontFamily: FONT, fontSize: '18px', color: COLOR_CSS[i], stroke: '#140b05', strokeThickness: 4 }).setDepth(4));
      this.infoTexts.push(this.add.text(x + 48, 54, slotLabel(s), { fontFamily: 'Arial', fontSize: '13px', color: '#d9c7b3' }).setDepth(4));
    });
    this.roundText = this.add.text(VIEW.w - 16, 12, '', { fontFamily: FONT, fontSize: '14px', color: '#ffcf8a', align: 'right' }).setOrigin(1, 0).setDepth(4);
    if (!isTouchDevice) this.add.text(VIEW.w - 16, 34, 'P pause · Esc menu', { fontFamily: 'Arial', fontSize: '12px', color: '#9c8a78' }).setOrigin(1, 0).setDepth(4);
    this.feedTexts = [0, 1].map(i => this.add.text(VIEW.w / 2, 682 + i * 19, '', { fontFamily: FONT, fontSize: '15px', color: '#fff', stroke: '#140b05', strokeThickness: 4 }).setOrigin(0.5, 0).setDepth(4));
    this.banner = this.add.text(VIEW.w / 2, VIEW.h / 2 - 20, '', { fontFamily: FONT, fontSize: '84px', color: '#ffe9c7', stroke: '#2a1408', strokeThickness: 12, align: 'center' }).setOrigin(0.5).setDepth(10);
    this.bannerSub = this.add.text(VIEW.w / 2, VIEW.h / 2 + 50, '', { fontFamily: 'Arial', fontSize: '22px', color: '#ffffff', stroke: '#2a1408', strokeThickness: 5, align: 'center' }).setOrigin(0.5).setDepth(10);
    this.handleEvents(this.world.drainEvents());
  }

  // ---------------------------------------------------------------- loop
  update(_time: number, delta: number): void {
    const dt = Math.min(0.1, delta / 1000);
    this.t += dt;

    if (consumeTap('Escape')) { this.scene.start('menu', { slots: this.slots, difficulty: this.difficulty }); return; }
    if (consumeTap('KeyP') && this.world.phase !== 'matchEnd') this.paused = !this.paused;
    const anyStart = this.slots.some(s => s.kind === 'pad' && readSlot(s).start);
    if (anyStart && !this.padPrevStart && this.world.phase !== 'matchEnd') this.paused = !this.paused;
    if (this.world.phase === 'matchEnd' && (consumeTap('Digit1') || (anyStart && !this.padPrevStart))) {
      this.scene.restart({ slots: this.slots, difficulty: this.difficulty });
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
          drawTable(this.tableG, w.layout);
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
          if (e.stolenFrom !== null) { sfx.steal(); this.popup(e.x, e.y - 20, 'STOLEN!', COLOR_CSS[e.id]); }
          else sfx.pickup();
          break;
        case 'catch':
          sfx.catch();
          if (e.from !== e.id) this.popup(e.x, e.y - 20, 'CAUGHT!', COLOR_CSS[e.id]);
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
          this.popup(p.x, p.y - 34, 'STOMP READY!', COLOR_CSS[e.id], 18);
          break;
        }
        case 'kaiju':
          sfx.kaiju();
          this.shake(0.012, 350);
          this.popup(e.x, e.y - 60, 'KAIJU!', COLOR_CSS[e.id], 40);
          this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 160, color: COLORS[e.id] });
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
    const victim = SPECIES[e.id].name, killer = e.by !== null ? SPECIES[e.by].name : null;
    const x = Phaser.Math.Clamp(e.x, TABLE.x, TABLE.x + TABLE.w), y = Phaser.Math.Clamp(e.y, TABLE.y, TABLE.y + TABLE.h);
    if (e.cause === 'fall') sfx.fall(); else sfx.ko();
    this.shake(0.008, 180);
    this.burst(x, y, COLORS[e.id], 36, 360, 0.9, 300);
    this.burst(x, y, 0xffffff, 12, 260, 0.6, 300);
    this.burst(x, y, 0xe0b06a, 10, 200, 0.7, 300);
    let text: string;
    switch (e.cause) {
      case 'cutlery': text = `${killer} skewered ${victim}`; break;
      case 'swipe': text = `${killer} swiped ${victim}`; break;
      case 'squash': text = `${killer} SQUASHED ${victim}`; break;
      case 'fall': text = killer ? `${killer} shoved ${victim} off the table` : `${victim} fell off the table`; break;
      case 'hand': text = `${victim} got flicked by the GIANT HAND`; break;
    }
    if (e.by === null && e.cause === 'cutlery') text = `${victim} skewered themselves`;
    this.feed.unshift({ text, color: COLOR_CSS[e.by ?? e.id], t: 4 });
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
    const t = this.add.text(x, y, text, { fontFamily: FONT, fontSize: `${size}px`, color, stroke: '#140b05', strokeThickness: 5 }).setOrigin(0.5).setDepth(6);
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
    drawTableLive(g, w.layout, t);
    drawCrumbs(g, w.crumbs, t);
    if (w.hand && w.hand.state === 'warn') drawHand(g, w.hand, t);
    for (const c of w.cutlery) if (c.state !== 'held' && c.state !== 'flying') drawCutlery(g, c, COLORS, t);
    const order = w.players.slice().sort((a, b) => a.r - b.r);
    for (const p of order) {
      drawPlayer(g, p, p.id, COLORS[p.id], t);
      const held = w.cutleryById(p.holding);
      if (held && p.alive) drawCutlery(g, held, COLORS, t);
    }
    for (const c of w.cutlery) if (c.state === 'flying') drawCutlery(g, c, COLORS, t);
    if (w.hand && w.hand.state === 'sweep') drawHand(g, w.hand, t);

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
      drawKaiju(g, { x: x + 20, y: 40, r: 17, aim: Math.PI / 2, kaiju: false, species: i, color: COLORS[i] }, t, p.alive ? 1 : 0.35);
      // round stars (second row, right of the belly meter)
      for (let s = 0; s < w.opts.target; s++) {
        const sx = x + 160 + s * 14, sy = 41;
        g.fillStyle(s < p.score ? COLORS[i] : 0x3a2c22, 1);
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
      if (held && p.alive) drawCutleryShape(g, held.kind, x + 206, 18, -0.35, 0.85);
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
      if (w.winner !== null) { main = `${SPECIES[w.winner].name} WINS THE ROUND`; color = COLOR_CSS[w.winner]; }
      else { main = 'NOBODY SURVIVED DINNER'; }
      sub = w.players.map(p => `${p.name} ${'★'.repeat(p.score)}${'☆'.repeat(w.opts.target - p.score)}`).join('     ');
    } else if (w.phase === 'matchEnd' && w.winner !== null) {
      main = `${SPECIES[w.winner].full.toUpperCase()}\nRULES THE TABLE`;
      color = COLOR_CSS[w.winner];
      const ranked = w.players.slice().sort((a, b) => b.score - a.score || b.kos - a.kos);
      sub = ranked.map((p, i) => `${i + 1}. ${p.name}  ${p.score} rounds · ${p.kos} KOs`).join('\n') + '\n\n1 / START rematch · Esc menu';
    }
    this.banner.setText(main).setColor(color).setFontSize(main.length > 14 ? 54 : 84);
    this.banner.setY(w.phase === 'matchEnd' ? 210 : VIEW.h / 2 - 20);
    this.bannerSub.setText(sub).setY(w.phase === 'matchEnd' ? 380 : VIEW.h / 2 + 50);
  }
}
