import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps, consumeTap, KEYMAPS, listDevices, readSlot, sameDevice, slotLabel, type Slot } from '../input';
import { applyPendingUpdate } from '../pwa';
import { Button } from '../render/ui';
import { CUTLERY_LEN, fitInside, hasArt } from '../render/art';
import { drawCutleryShape, drawFloor, drawKaiju } from '../render/draw';
import { BODY as BODY_FONT, DISPLAY, INK, popIn, withGradient, withShadow } from '../render/fonts';
import { DIFFICULTIES, type Difficulty } from '../sim/bot';
import { DEFAULT_ROUNDS, MAX_PLAYERS, ROUND_CHOICES, SPECIES } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { isTouchDevice, setTouchHud, setTouchMode } from '../touch';
import { owned, type Owned } from '../story/unlocks';
import { enabledModes, modeDef, type GameMode } from '../sim/modes';

const TITLE = { fontFamily: DISPLAY, color: '#ffe9c7', stroke: INK, strokeThickness: 10 };
const BODY = { fontFamily: BODY_FONT, fontStyle: '800', color: '#e9dccb' };
const CARD_X = (i: number) => 112 + i * 211; // 6 seats across
const CARD_W = 198;

export interface MenuData {
  slots?: Slot[];
  difficulty?: Difficulty;
  species?: number[];
  tables?: number[] | null;
  rounds?: number;
  mode?: GameMode;
}

export class MenuScene extends Phaser.Scene {
  private slots: Slot[] = [];
  private picks: number[] = []; // kaiju species per slot
  private difficulty: Difficulty = 'normal';
  private table = -1; // -1 = rotate through all tables
  private rounds = DEFAULT_ROUNDS; // first to this many round wins
  private mode: GameMode = 'classic';
  private modeText!: Phaser.GameObjects.Text;
  private g!: Phaser.GameObjects.Graphics;
  private slotTexts: Phaser.GameObjects.Text[] = [];
  private slotSub: Phaser.GameObjects.Text[] = [];
  private slotFood: Phaser.GameObjects.Text[] = [];
  private infoText!: Phaser.GameObjects.Text;
  private tableText!: Phaser.GameObjects.Text;
  private tableThumb: Phaser.GameObjects.Image | null = null;
  private devPrev = new Map<string, { throw: boolean; dash: boolean; start: boolean; mx: number; y: boolean }>();
  private t = 0;
  private cardImgs: Phaser.GameObjects.Image[] = [];
  private decoImgs: Phaser.GameObjects.Image[] = [];
  private backBtn: Button | null = null;
  private own: Owned = { kaiju: [], tables: [] }; // kaiju/tables this player has (story unlocks)
  private bump: number[] = new Array(MAX_PLAYERS).fill(0); // little pop when a pick changes

  constructor() {
    super('menu');
  }

  init(data: MenuData): void {
    this.own = owned();
    this.slots = data.slots ?? [];
    this.picks = (data.species ?? []).slice(0, this.slots.length);
    this.difficulty = data.difficulty ?? this.difficulty;
    if (data.rounds) this.rounds = data.rounds;
    if (data.mode) this.mode = data.mode;
    if (data.tables !== undefined) this.table = data.tables && data.tables.length === 1 ? data.tables[0] : -1;
    this.devPrev.clear();
    this.fixPicks();
  }

  // ---------------------------------------------------------------- picks
  /** Every slot gets a distinct kaiju; fills gaps with the first free one. */
  private fixPicks(): void {
    const used = new Set<number>();
    this.picks = this.slots.map((_, i) => {
      let p = this.picks[i];
      if (p === undefined || used.has(p) || !this.own.kaiju.includes(p)) p = this.own.kaiju.find(k => !used.has(k) && !this.picks.slice(i + 1).includes(k)) ?? -1;
      if (p < 0) p = this.own.kaiju.find(k => !used.has(k)) ?? 0;
      used.add(p);
      return p;
    });
  }

  private addSlot(s: Slot): void {
    if (this.slots.length >= MAX_PLAYERS) return;
    this.slots.push(s);
    const taken = new Set(this.picks);
    const free = this.own.kaiju.filter(k => !taken.has(k));
    this.picks.push(s.kind === 'bot' ? free[Math.floor(Math.random() * free.length)] : free[0]);
    sfx.join(this.slots.length);
  }

  private removeSlot(i: number): void {
    this.slots.splice(i, 1);
    this.picks.splice(i, 1);
    sfx.leave();
  }

  /** Next/previous kaiju not already taken by someone else. */
  private cycle(i: number, dir: number): void {
    const taken = new Set(this.picks.filter((_, k) => k !== i));
    this.picks[i] = nextIn(this.own.kaiju, this.picks[i], dir, taken);
    this.bump[i] = 1;
    sfx.pickup();
  }

  private cycleMode(): void {
    const list = enabledModes().map(m => m.id);
    this.mode = list[(list.indexOf(this.mode) + 1) % list.length] ?? 'classic';
    sfx.pickup();
  }

  private cycleTable(): void {
    const later = this.own.tables.filter(t => t > this.table);
    this.table = later.length ? later[0] : -1; // ... then back to ALL
    sfx.pickup();
  }

  // ---------------------------------------------------------------- scene
  create(): void {
    clearTaps();
    if (hasArt('bg-menu')) this.add.image(640, 360, 'bg-menu').setDisplaySize(1280, 720).setDepth(-2);
    this.g = this.add.graphics();
    this.cardImgs = Array.from({ length: MAX_PLAYERS }, (_, i) => i).map(i => this.add.image(CARD_X(i), 250, '__MISSING').setDepth(1).setVisible(false));
    this.decoImgs = (['fork', 'spoon', 'knife', 'chopstick', 'ladle', 'spork'] as const)
      .filter(k => hasArt(`cut-${k}`))
      .map(k => this.add.image(0, 0, `cut-${k}`).setDepth(1).setScale((CUTLERY_LEN[k] * 1.5) / this.textures.get(`cut-${k}`).getSourceImage().width));
    const title = this.add.text(640, 66, 'KITCHEN KAIJU', { ...TITLE, fontSize: '92px', strokeThickness: 12, padding: { x: 8, y: 8 } }).setOrigin(0.5).setDepth(2);
    withShadow(withGradient(title, '#fff6cf', '#ffb347'), 7);
    popIn(this, title, 1.25, 600);
    withShadow(this.add.text(640, 126, 'Tiny monsters. Giant dinner.', { ...BODY, fontStyle: '900', fontSize: '23px', color: '#ffd9a0' }).setOrigin(0.5).setDepth(2), 3);

    this.slotTexts = [];
    this.slotSub = [];
    this.slotFood = [];
    for (let i = 0; i < MAX_PLAYERS; i++) {
      this.slotTexts.push(withShadow(this.add.text(CARD_X(i), 322, '', { ...TITLE, fontSize: '22px', strokeThickness: 5 }).setOrigin(0.5).setDepth(2), 3));
      this.slotFood.push(this.add.text(CARD_X(i), 346, '', { ...BODY, fontSize: '13px', fontStyle: 'italic 800', color: '#ffcf8a' }).setOrigin(0.5).setDepth(2));
      this.slotSub.push(this.add.text(CARD_X(i), 368, '', { ...BODY, fontStyle: '700', fontSize: '13px', align: 'center', color: '#d9c7b3' }).setOrigin(0.5).setDepth(2));
    }
    this.infoText = this.add.text(640, 404, '', { ...BODY, fontStyle: '900', fontSize: '17px', color: '#ffcf8a' }).setOrigin(0.5).setDepth(2);
    this.tableText = this.add.text(640, 434, '', { ...BODY, fontStyle: '900', fontSize: '16px', color: '#ffffff', align: 'center' }).setOrigin(0.5).setDepth(2);
    this.tableThumb = null;
    this.modeText = withShadow(this.add.text(640, 150, '', { ...BODY, fontStyle: '900', fontSize: '17px', color: '#ffd24a', align: 'center' }).setOrigin(0.5).setDepth(3), 2);

    // Controls as key "chips": [KEY] tokens get a keycap behind them.
    const chipG = this.add.graphics().setDepth(2);
    const lines = isTouchDevice
      ? [
          '[LEFT SIDE] drag to move   [THROW] hold, drag to aim, let go   [SWIPE] up close   [DASH] dodge & shove   [STOMP] belly full',
        ]
      : [
          'Keyboard Left   [W A S D] move  [SPACE] throw  [F] swipe  [L-SHIFT] dash  [E] stomp',
          'Keyboard Right   [ARROWS] move  [ENTER] throw  [/] swipe  [R-SHIFT] dash  [.] stomp',
          'Gamepad   [L-STICK] move  [R-STICK] aim  [A] throw  [X] swipe  [B] dash  [Y] stomp',
        ];
    lines.forEach((l, i) => this.chipLine(chipG, 640, 474 + i * 28, l, 14));
    const rules = [
      'Cutlery STICKS where it lands, so a miss leaves you unarmed, and anything loose is fair game.',
      'Eat crumbs, then STOMP to go KAIJU. Shove rivals off the edge. Every table has its own hazard.',
    ];
    this.add.text(640, 560, rules.join('\n'), { ...BODY, fontStyle: '700', fontSize: '15px', align: 'center', color: '#cdb9a3', lineSpacing: 5 }).setOrigin(0.5, 0).setDepth(2);
    if (!isTouchDevice) {
      this.chipLine(chipG, 640, 640, '[THROW] join   [◀ ▶] pick kaiju   [DASH] leave   [B] [N] add / remove bot', 15);
      this.chipLine(chipG, 640, 670, '[2] bots   [M] table   [R] rounds   [G] mode   [O] ONLINE   [1] PLAY', 15);
    }
    setTouchMode('menu');
    this.backBtn = new Button(this, 1192, 34, { w: 150, h: 44, label: '◀ MODES', size: 18, onClick: () => this.scene.start('title') }, 6);
    this.add.text(1272, 712, `v${__APP_VERSION__}`, { ...BODY, fontSize: '11px', color: '#8a7a6a' }).setOrigin(1, 1).setDepth(5);
    // First visit on a phone: seat the touch player straight away.
    if (isTouchDevice && !this.registry.get('touchSeeded')) {
      this.registry.set('touchSeeded', true);
      if (!this.slots.some(s => s.kind === 'touch')) { this.slots.unshift({ kind: 'touch', index: 0 }); this.picks.unshift(-1); this.fixPicks(); }
    }

    const demo = Number(new URLSearchParams(location.search).get('demo') ?? 0);
    if (demo >= 2 && !this.registry.get('demoStarted')) {
      this.registry.set('demoStarted', true);
      this.slots = [];
      this.picks = [];
      for (let i = 0; i < Math.min(MAX_PLAYERS, demo); i++) this.addSlot({ kind: 'bot', index: i });
      const tbl = Number(new URLSearchParams(location.search).get('table') ?? -1);
      if (tbl >= 0 && tbl < LAYOUTS.length) this.table = tbl;
      const gm = new URLSearchParams(location.search).get('gmode') as GameMode | null;
      if (gm && enabledModes().some(m => m.id === gm)) this.mode = gm;
      this.startGame();
    }
  }

  private startGame(): void {
    while (this.slots.length < Math.max(2, modeDef(this.mode).minPlayers)) this.addSlot({ kind: 'bot', index: this.slots.length });
    this.fixPicks();
    this.scene.start('game', {
      slots: this.slots.slice(), difficulty: this.difficulty, species: this.picks.slice(), tables: this.table < 0 ? this.own.tables.slice() : [this.table], rounds: this.rounds, mode: this.mode,
    });
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    this.t += dt;
    for (let i = 0; i < MAX_PLAYERS; i++) this.bump[i] = Math.max(0, this.bump[i] - dt * 5);
    applyPendingUpdate();
    this.backBtn?.update(dt);
    this.pollDevices();
    if (consumeTap('KeyB')) this.addSlot({ kind: 'bot', index: this.slots.length });
    if (consumeTap('KeyN')) {
      for (let i = this.slots.length - 1; i >= 0; i--) if (this.slots[i].kind === 'bot') { this.removeSlot(i); break; }
    }
    // Bot difficulty: '2' on a keyboard (D is the left player's "next kaiju"), or the BOTS button on touch.
    if (consumeTap('Digit2') || consumeTap('TouchDiff')) { this.difficulty = DIFFICULTIES[(DIFFICULTIES.indexOf(this.difficulty) + 1) % DIFFICULTIES.length]; sfx.pickup(); }
    if (consumeTap('KeyM')) this.cycleTable();
    if (consumeTap('KeyR') || consumeTap('TouchRounds')) {
      this.rounds = ROUND_CHOICES[(ROUND_CHOICES.indexOf(this.rounds) + 1) % ROUND_CHOICES.length] ?? DEFAULT_ROUNDS;
      sfx.pickup();
    }
    if (consumeTap('KeyG') || consumeTap('TouchMode')) this.cycleMode();
    if (consumeTap('KeyO') || consumeTap('TouchOnline')) { this.scene.start('lobby', { difficulty: this.difficulty, rounds: this.rounds }); return; }
    if (consumeTap('TouchJoin')) {
      const j = this.slots.findIndex(s => s.kind === 'touch');
      if (j >= 0) this.removeSlot(j);
      else this.addSlot({ kind: 'touch', index: 0 });
    }
    if (consumeTap('TouchKaiju')) {
      const j = this.slots.findIndex(s => s.kind === 'touch');
      if (j >= 0) this.cycle(j, 1);
    }
    if (consumeTap('Digit1')) { this.startGame(); return; }
    if (consumeTap('Escape')) { this.scene.start('title'); return; }
    clearTaps();
    setTouchHud({
      joined: this.slots.some(s => s.kind === 'touch'),
      difficulty: this.difficulty,
      table: this.table < 0 ? 'ALL' : LAYOUTS[this.table].name.toUpperCase(),
      rounds: this.rounds,
      mode: modeDef(this.mode).name,
    });
    this.draw();
  }

  private pollDevices(): void {
    for (const d of listDevices()) {
      const inp = readSlot(d), id = d.kind + d.index;
      const mxDir = inp.mx > 0.6 ? 1 : inp.mx < -0.6 ? -1 : 0;
      const yBtn = d.kind === 'pad' && inp.stomp; // Y / LB on a pad
      const prev = this.devPrev.get(id) ?? { throw: true, dash: true, start: true, mx: mxDir, y: true };
      const joined = this.slots.findIndex(s => sameDevice(s, d));
      // Keyboards also check per-press taps so a very quick tap between frames still counts.
      const km = d.kind === 'kb' ? KEYMAPS[d.index] : null;
      const tapThrow = km ? km.throw.filter(k => consumeTap(k)).length > 0 : false;
      const tapDash = km ? km.dash.filter(k => consumeTap(k)).length > 0 : false;
      const tapLeft = km ? consumeTap(km.left) : false;
      const tapRight = km ? consumeTap(km.right) : false;
      if (((inp.throw && !prev.throw) || tapThrow) && joined < 0) this.addSlot(d);
      else if (((inp.dash && !prev.dash) || tapDash) && joined >= 0) this.removeSlot(joined);
      else if (joined >= 0) {
        if (tapLeft || (mxDir === -1 && prev.mx !== -1 && !km)) this.cycle(joined, -1);
        if (tapRight || (mxDir === 1 && prev.mx !== 1 && !km)) this.cycle(joined, 1);
      }
      if (yBtn && !prev.y) this.cycleTable();
      this.devPrev.set(id, { throw: inp.throw, dash: inp.dash, start: inp.start, mx: mxDir, y: yBtn });
      if (inp.start && !prev.start) { this.startGame(); return; }
    }
  }

  private draw(): void {
    const g = this.g, t = this.t;
    g.clear();
    if (hasArt('bg-menu')) {
      g.fillStyle(0x0d0805, 0.2); g.fillRect(0, 0, 1280, 150);
      g.fillStyle(0x0d0805, 0.66); g.fillRect(0, 150, 1280, 570);
    } else {
      drawFloor(g);
    }
    const kinds = ['fork', 'spoon', 'knife', 'chopstick', 'ladle', 'spork'] as const;
    if (this.decoImgs.length) {
      this.decoImgs.forEach((img, i) => {
        const a = t * 0.6 + (i / this.decoImgs.length) * Math.PI * 2;
        img.setPosition(640 + Math.cos(a) * 520, 92 + Math.sin(a) * 40).setRotation(a * 3);
      });
    } else {
      kinds.forEach((k, i) => {
        const a = t * 0.6 + (i / kinds.length) * Math.PI * 2;
        drawCutleryShape(g, k, 640 + Math.cos(a) * 520, 92 + Math.sin(a) * 40, a * 3, 1.4);
      });
    }
    for (let i = 0; i < MAX_PLAYERS; i++) {
      const x = CARD_X(i), s = this.slots[i], img = this.cardImgs[i];
      const sp = s ? this.picks[i] : -1, col = sp >= 0 ? SPECIES[sp].color : 0x4a3a2e;
      g.fillStyle(0x000000, 0.5);
      g.fillRoundedRect(x - CARD_W / 2, 168, CARD_W, 216, 16);
      g.lineStyle(3, col, 1);
      g.strokeRoundedRect(x - CARD_W / 2, 168, CARD_W, 216, 16);
      if (s && sp >= 0) {
        // left/right arrows for players who can change their kaiju
        if (s.kind !== 'bot') {
          const pulse = 0.55 + 0.35 * Math.sin(t * 5);
          g.fillStyle(col, pulse);
          g.fillTriangle(x - 88, 250, x - 74, 238, x - 74, 262);
          g.fillTriangle(x + 88, 250, x + 74, 238, x + 74, 262);
        }
        const key = `kaiju-${sp}`;
        const pop = 1 + this.bump[i] * 0.15;
        if (hasArt(key)) {
          g.fillStyle(0x000000, 0.35); g.fillEllipse(x, 296, 96, 16);
          img.setTexture(key).setVisible(true);
          fitInside(img, 116 * pop, 112 * pop).setOrigin(0.5, 1).setPosition(x, 300 - Math.abs(Math.sin(t * 3 + i)) * 6);
        } else {
          img.setVisible(false);
          drawKaiju(g, { x, y: 250 + Math.sin(t * 4 + i) * 4, r: 38 * pop, aim: Math.sin(t * 1.5 + i) * 0.8 + Math.PI / 2, kaiju: false, species: sp, color: col }, t);
        }
        this.slotTexts[i].setText(SPECIES[sp].full.toUpperCase()).setColor(SPECIES[sp].css);
        this.slotFood[i].setText(SPECIES[sp].food);
        const how = s.kind === 'kb' ? (s.index === 0 ? 'Keys left · A / D' : 'Keys right · ← / →')
          : s.kind === 'pad' ? `${slotLabel(s)} · ◀ ▶`
          : s.kind === 'touch' ? 'Touch · KAIJU ▶' : `Bot (${this.difficulty})`;
        this.slotSub[i].setText(how);
      } else {
        img.setVisible(false);
        g.fillStyle(0xffffff, 0.06 + 0.04 * Math.sin(t * 3 + i));
        g.fillCircle(x, 250, 38);
        this.slotTexts[i].setText('');
        this.slotFood[i].setText('');
        this.slotSub[i].setText(isTouchDevice ? 'empty (+ BOT)' : 'THROW to join');
      }
    }
    const md = modeDef(this.mode);
    this.modeText.setText(`MODE: ${md.name}  ·  ${md.blurb}${isTouchDevice ? '' : '   [G] change'}`);
    this.infoText.setText(`Bot difficulty: ${this.difficulty.toUpperCase()}   ·   Up to ${MAX_PLAYERS} players   ·   First to ${this.rounds} round${this.rounds === 1 ? '' : 's'}   ·   ${this.own.kaiju.length < SPECIES.length ? `${this.own.kaiju.length}/${SPECIES.length} kaiju (unlock more in Story)` : `${SPECIES.length} kaiju`}`);
    const tl = this.table < 0 ? null : LAYOUTS[this.table];
    this.tableText.setText(tl ? `TABLE: ${tl.name.toUpperCase()}  —  ${tl.blurb}` : `TABLE: ALL ${this.own.tables.length} (a different one every round)${this.own.tables.length < LAYOUTS.length ? ` · ${LAYOUTS.length - this.own.tables.length} more to unlock in Story` : ''}`);
    // small preview of the chosen table surface
    const key = tl ? tl.table : null;
    if (key && hasArt(key)) {
      if (!this.tableThumb) this.tableThumb = this.add.image(0, 0, key).setDepth(2);
      const tw = this.tableText.width;
      this.tableThumb.setTexture(key).setVisible(true).setDisplaySize(54, 29).setPosition(640 - tw / 2 - 36, 434);
    } else {
      this.tableThumb?.setVisible(false);
    }
  }

  /** Renders a centred line where [TOKENS] become keycap chips. */
  private chipLine(g: Phaser.GameObjects.Graphics, cx: number, cy: number, line: string, size: number): void {
    const parts = line.split(/(\[[^\]]+\])/).filter(Boolean);
    const items = parts.map(part => {
      const chip = part.startsWith('[');
      const label = chip ? part.slice(1, -1) : part;
      const t = this.add.text(0, cy, label, chip
        ? { ...BODY, fontStyle: '900', fontSize: `${size}px`, color: '#2a1408' }
        : { ...BODY, fontStyle: '700', fontSize: `${size}px`, color: '#e9dccb' }).setOrigin(0, 0.5).setDepth(3);
      return { t, chip, w: t.width + (chip ? 14 : 0) };
    });
    let x = cx - items.reduce((a, it) => a + it.w + 2, 0) / 2;
    for (const it of items) {
      if (it.chip) {
        const h = size + 10;
        g.fillStyle(0x7a4a24, 1); g.fillRoundedRect(x, cy - h / 2 + 2, it.w, h, 6); // keycap edge
        g.fillStyle(0xffe1b0, 1); g.fillRoundedRect(x, cy - h / 2, it.w, h - 2, 6); // keycap face
        it.t.setX(x + 7);
      } else {
        it.t.setX(x);
      }
      x += it.w + 2;
    }
  }
}

/** Next item in `list` after `cur` (wrapping), skipping anything in `skip`. */
function nextIn(list: number[], cur: number, dir: number, skip: Set<number> = new Set()): number {
  if (!list.length) return cur;
  let i = list.indexOf(cur);
  if (i < 0) i = dir > 0 ? -1 : 0;
  for (let n = 0; n < list.length; n++) {
    i = (i + dir + list.length) % list.length;
    if (!skip.has(list[i])) return list[i];
  }
  return cur;
}
