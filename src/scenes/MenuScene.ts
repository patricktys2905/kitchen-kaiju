import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps, consumeTap, KEYMAPS, listDevices, readSlot, sameDevice, slotLabel, type Slot } from '../input';
import { applyPendingUpdate } from '../pwa';
import { CUTLERY_LEN, fitInside, hasArt } from '../render/art';
import { drawCutleryShape, drawFloor, drawKaiju } from '../render/draw';
import { DIFFICULTIES, type Difficulty } from '../sim/bot';
import { SPECIES } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { isTouchDevice, setTouchHud, setTouchMode } from '../touch';

const TITLE = { fontFamily: 'Arial Black, Impact, sans-serif', color: '#ffe9c7', stroke: '#2a1408', strokeThickness: 10 };
const BODY = { fontFamily: 'Arial, sans-serif', color: '#e9dccb' };
const CARD_X = (i: number) => 205 + i * 290;

export interface MenuData {
  slots?: Slot[];
  difficulty?: Difficulty;
  species?: number[];
  tables?: number[] | null;
}

export class MenuScene extends Phaser.Scene {
  private slots: Slot[] = [];
  private picks: number[] = []; // kaiju species per slot
  private difficulty: Difficulty = 'normal';
  private table = -1; // -1 = rotate through all tables
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
  private bump: number[] = [0, 0, 0, 0]; // little pop when a pick changes

  constructor() {
    super('menu');
  }

  init(data: MenuData): void {
    this.slots = data.slots ?? [];
    this.picks = (data.species ?? []).slice(0, this.slots.length);
    this.difficulty = data.difficulty ?? this.difficulty;
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
      if (p === undefined || used.has(p) || p < 0 || p >= SPECIES.length) p = SPECIES.findIndex((_, k) => !used.has(k) && !this.picks.slice(i + 1).includes(k));
      if (p < 0) p = SPECIES.findIndex((_, k) => !used.has(k));
      used.add(p);
      return p;
    });
  }

  private addSlot(s: Slot): void {
    if (this.slots.length >= 4) return;
    this.slots.push(s);
    const taken = new Set(this.picks);
    const free = SPECIES.map((_, k) => k).filter(k => !taken.has(k));
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
    let p = this.picks[i];
    for (let n = 0; n < SPECIES.length; n++) {
      p = (p + dir + SPECIES.length) % SPECIES.length;
      if (!taken.has(p)) break;
    }
    this.picks[i] = p;
    this.bump[i] = 1;
    sfx.pickup();
  }

  private cycleTable(): void {
    this.table = this.table + 1 >= LAYOUTS.length ? -1 : this.table + 1;
    sfx.pickup();
  }

  // ---------------------------------------------------------------- scene
  create(): void {
    clearTaps();
    if (hasArt('bg-menu')) this.add.image(640, 360, 'bg-menu').setDisplaySize(1280, 720).setDepth(-2);
    this.g = this.add.graphics();
    this.cardImgs = [0, 1, 2, 3].map(i => this.add.image(CARD_X(i), 250, '__MISSING').setDepth(1).setVisible(false));
    this.decoImgs = (['fork', 'spoon', 'knife', 'chopstick', 'ladle', 'spork'] as const)
      .filter(k => hasArt(`cut-${k}`))
      .map(k => this.add.image(0, 0, `cut-${k}`).setDepth(1).setScale((CUTLERY_LEN[k] * 1.5) / this.textures.get(`cut-${k}`).getSourceImage().width));
    this.add.text(640, 62, 'KITCHEN KAIJU', { ...TITLE, fontSize: '78px' }).setOrigin(0.5);
    this.add.text(640, 120, 'Tiny monsters. Giant dinner. Sharp cutlery.', { ...BODY, fontSize: '22px', color: '#ffcf8a' }).setOrigin(0.5);

    this.slotTexts = [];
    this.slotSub = [];
    this.slotFood = [];
    for (let i = 0; i < 4; i++) {
      this.slotTexts.push(this.add.text(CARD_X(i), 324, '', { ...TITLE, fontSize: '24px', strokeThickness: 6 }).setOrigin(0.5).setDepth(2));
      this.slotFood.push(this.add.text(CARD_X(i), 348, '', { ...BODY, fontSize: '13px', fontStyle: 'italic', color: '#ffcf8a' }).setOrigin(0.5).setDepth(2));
      this.slotSub.push(this.add.text(CARD_X(i), 368, '', { ...BODY, fontSize: '14px', align: 'center' }).setOrigin(0.5).setDepth(2));
    }
    this.infoText = this.add.text(640, 404, '', { ...BODY, fontSize: '17px', color: '#ffcf8a' }).setOrigin(0.5).setDepth(2);
    this.tableText = this.add.text(640, 434, '', { ...BODY, fontSize: '16px', color: '#ffffff', align: 'center' }).setOrigin(0.5).setDepth(2);
    this.tableThumb = null;

    const lines = isTouchDevice
      ? [
          'TOUCH:  drag the LEFT side to move · hold THROW to charge, drag it to aim, let go to throw',
          'SWIPE hits up close · DASH dodges, shoves, catches cutlery · STOMP when your belly is full',
        ]
      : [
          `${KEYMAPS[0].name}:  ${KEYMAPS[0].hint}`,
          `${KEYMAPS[1].name}:  ${KEYMAPS[1].hint}`,
          'Gamepad:  L-stick move · R-stick aim · A/RT throw · X swipe · B/RB dash · Y/LB stomp',
        ];
    this.add.text(640, 470, lines.join('\n'), { ...BODY, fontSize: '15px', align: 'center', lineSpacing: 5 }).setOrigin(0.5, 0).setDepth(2);
    const rules = [
      'Cutlery STICKS where it lands, so a miss leaves you unarmed, and anything loose is fair game.',
      'Eat crumbs, then STOMP to go KAIJU. Shove rivals off the edge. Every table has its own hazard.',
    ];
    this.add.text(640, 556, rules.join('\n'), { ...BODY, fontSize: '15px', align: 'center', color: '#cdb9a3', lineSpacing: 5 }).setOrigin(0.5, 0).setDepth(2);
    if (!isTouchDevice) {
      this.add.text(640, 640, 'THROW on any controller to join · LEFT/RIGHT to pick your kaiju · DASH to leave',
        { ...BODY, fontSize: '16px', color: '#ffffff' }).setOrigin(0.5).setDepth(2);
      this.add.text(640, 668, 'B add bot · N remove bot · 2 bot difficulty · M (or gamepad Y) change table · 1 or START to play',
        { ...BODY, fontSize: '16px', color: '#ffffff' }).setOrigin(0.5).setDepth(2);
    }
    setTouchMode('menu');
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
      for (let i = 0; i < Math.min(4, demo); i++) this.addSlot({ kind: 'bot', index: i });
      const tbl = Number(new URLSearchParams(location.search).get('table') ?? -1);
      if (tbl >= 0 && tbl < LAYOUTS.length) this.table = tbl;
      this.startGame();
    }
  }

  private startGame(): void {
    while (this.slots.length < 2) this.addSlot({ kind: 'bot', index: this.slots.length });
    this.fixPicks();
    this.scene.start('game', {
      slots: this.slots.slice(), difficulty: this.difficulty, species: this.picks.slice(), tables: this.table < 0 ? null : [this.table],
    });
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    this.t += dt;
    for (let i = 0; i < 4; i++) this.bump[i] = Math.max(0, this.bump[i] - dt * 5);
    applyPendingUpdate();
    this.pollDevices();
    if (consumeTap('KeyB')) this.addSlot({ kind: 'bot', index: this.slots.length });
    if (consumeTap('KeyN')) {
      for (let i = this.slots.length - 1; i >= 0; i--) if (this.slots[i].kind === 'bot') { this.removeSlot(i); break; }
    }
    // Bot difficulty: '2' on a keyboard (D is the left player's "next kaiju"), or the BOTS button on touch.
    if (consumeTap('Digit2') || consumeTap('TouchDiff')) { this.difficulty = DIFFICULTIES[(DIFFICULTIES.indexOf(this.difficulty) + 1) % DIFFICULTIES.length]; sfx.pickup(); }
    if (consumeTap('KeyM')) this.cycleTable();
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
    clearTaps();
    setTouchHud({
      joined: this.slots.some(s => s.kind === 'touch'),
      difficulty: this.difficulty,
      table: this.table < 0 ? 'ALL' : LAYOUTS[this.table].name.toUpperCase(),
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
    for (let i = 0; i < 4; i++) {
      const x = CARD_X(i), s = this.slots[i], img = this.cardImgs[i];
      const sp = s ? this.picks[i] : -1, col = sp >= 0 ? SPECIES[sp].color : 0x4a3a2e;
      g.fillStyle(0x000000, 0.5);
      g.fillRoundedRect(x - 128, 168, 256, 216, 18);
      g.lineStyle(3, col, 1);
      g.strokeRoundedRect(x - 128, 168, 256, 216, 18);
      if (s && sp >= 0) {
        // left/right arrows for players who can change their kaiju
        if (s.kind !== 'bot') {
          const pulse = 0.55 + 0.35 * Math.sin(t * 5);
          g.fillStyle(col, pulse);
          g.fillTriangle(x - 112, 250, x - 96, 236, x - 96, 264);
          g.fillTriangle(x + 112, 250, x + 96, 236, x + 96, 264);
        }
        const key = `kaiju-${sp}`;
        const pop = 1 + this.bump[i] * 0.15;
        if (hasArt(key)) {
          g.fillStyle(0x000000, 0.35); g.fillEllipse(x, 296, 110, 18);
          img.setTexture(key).setVisible(true);
          fitInside(img, 130 * pop, 120 * pop).setOrigin(0.5, 1).setPosition(x, 300 - Math.abs(Math.sin(t * 3 + i)) * 6);
        } else {
          img.setVisible(false);
          drawKaiju(g, { x, y: 250 + Math.sin(t * 4 + i) * 4, r: 44 * pop, aim: Math.sin(t * 1.5 + i) * 0.8 + Math.PI / 2, kaiju: false, species: sp, color: col }, t);
        }
        this.slotTexts[i].setText(SPECIES[sp].full.toUpperCase()).setColor(SPECIES[sp].css);
        this.slotFood[i].setText(SPECIES[sp].food);
        const how = s.kind === 'kb' ? `${slotLabel(s)} · ${s.index === 0 ? 'A / D' : '← / →'} to change`
          : s.kind === 'pad' ? `${slotLabel(s)} · ◀ ▶ to change`
          : s.kind === 'touch' ? 'Touch · KAIJU ▶ to change' : `Bot (${this.difficulty})`;
        this.slotSub[i].setText(how);
      } else {
        img.setVisible(false);
        g.fillStyle(0xffffff, 0.06 + 0.04 * Math.sin(t * 3 + i));
        g.fillCircle(x, 250, 44);
        this.slotTexts[i].setText('');
        this.slotFood[i].setText('');
        this.slotSub[i].setText(isTouchDevice ? 'empty seat (+ BOT fills it)' : 'press THROW to join');
      }
    }
    this.infoText.setText(`Bot difficulty: ${this.difficulty.toUpperCase()}   ·   First to 5 rounds   ·   ${SPECIES.length} kaiju to pick from`);
    const tl = this.table < 0 ? null : LAYOUTS[this.table];
    this.tableText.setText(tl ? `TABLE: ${tl.name.toUpperCase()}  —  ${tl.blurb}` : `TABLE: ALL ${LAYOUTS.length} (a different one every round)`);
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
}
