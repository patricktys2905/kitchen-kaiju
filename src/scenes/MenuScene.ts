import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps, consumeTap, KEYMAPS, listDevices, readSlot, sameDevice, slotLabel, type Slot } from '../input';
import { CUTLERY_LEN, fitInside, hasArt } from '../render/art';
import { drawCutleryShape, drawFloor, drawKaiju } from '../render/draw';
import { DIFFICULTIES, type Difficulty } from '../sim/bot';
import { COLORS, COLOR_CSS, SPECIES } from '../sim/constants';
import { applyPendingUpdate } from '../pwa';
import { isTouchDevice, setTouchHud, setTouchMode } from '../touch';

const TITLE = { fontFamily: 'Arial Black, Impact, sans-serif', color: '#ffe9c7', stroke: '#2a1408', strokeThickness: 10 };
const BODY = { fontFamily: 'Arial, sans-serif', color: '#e9dccb' };

export interface MenuData {
  slots?: Slot[];
  difficulty?: Difficulty;
}

export class MenuScene extends Phaser.Scene {
  private slots: Slot[] = [];
  private difficulty: Difficulty = 'normal';
  private g!: Phaser.GameObjects.Graphics;
  private slotTexts: Phaser.GameObjects.Text[] = [];
  private slotSub: Phaser.GameObjects.Text[] = [];
  private diffText!: Phaser.GameObjects.Text;
  private devPrev = new Map<string, { throw: boolean; dash: boolean; start: boolean }>();
  private t = 0;
  private cardImgs: (Phaser.GameObjects.Image | null)[] = [];
  private decoImgs: Phaser.GameObjects.Image[] = [];

  constructor() {
    super('menu');
  }

  init(data: MenuData): void {
    this.slots = data.slots ?? [];
    this.difficulty = data.difficulty ?? this.difficulty;
    this.devPrev.clear();
  }

  create(): void {
    clearTaps();
    if (hasArt('bg-menu')) this.add.image(640, 360, 'bg-menu').setDisplaySize(1280, 720).setDepth(-2);
    this.g = this.add.graphics();
    this.cardImgs = [0, 1, 2, 3].map(i => (hasArt(`kaiju-${i}`) ? this.add.image(205 + i * 290, 250, `kaiju-${i}`).setDepth(1) : null));
    this.decoImgs = (['fork', 'spoon', 'knife', 'chopstick', 'ladle', 'spork'] as const)
      .filter(k => hasArt(`cut-${k}`))
      .map(k => this.add.image(0, 0, `cut-${k}`).setDepth(1).setScale((CUTLERY_LEN[k] * 1.5) / this.textures.get(`cut-${k}`).getSourceImage().width));
    this.add.text(640, 62, 'KITCHEN KAIJU', { ...TITLE, fontSize: '78px' }).setOrigin(0.5);
    this.add.text(640, 120, 'Tiny monsters. Giant dinner. Sharp cutlery.', { ...BODY, fontSize: '22px', color: '#ffcf8a' }).setOrigin(0.5);

    this.slotTexts = [];
    this.slotSub = [];
    for (let i = 0; i < 4; i++) {
      const x = 205 + i * 290;
      this.slotTexts.push(this.add.text(x, 330, '', { ...TITLE, fontSize: '24px', strokeThickness: 6, color: COLOR_CSS[i] }).setOrigin(0.5));
      this.slotSub.push(this.add.text(x, 362, '', { ...BODY, fontSize: '16px' }).setOrigin(0.5));
    }
    this.diffText = this.add.text(640, 412, '', { ...BODY, fontSize: '18px', color: '#ffcf8a' }).setOrigin(0.5);

    const lines = isTouchDevice
      ? [
          'TOUCH:  drag the LEFT side to move · hold THROW to charge, drag it to aim, let go to throw',
          'SWIPE hits up close · DASH dodges, shoves, and catches cutlery · STOMP when your belly is full',
          'Keyboards and Bluetooth gamepads also work on this device.',
        ]
      : [
          `${KEYMAPS[0].name}:  ${KEYMAPS[0].hint}`,
          `${KEYMAPS[1].name}:  ${KEYMAPS[1].hint}`,
          'Gamepad:  L-stick move · R-stick aim · A/RT throw · X swipe · B/RB dash · Y/LB stomp',
        ];
    this.add.text(640, 452, lines.join('\n'), { ...BODY, fontSize: '16px', align: 'center', lineSpacing: 6 }).setOrigin(0.5, 0);

    const rules = [
      'Hold THROW to charge, release to fling. Cutlery STICKS where it lands, so a miss leaves you unarmed.',
      'Anything loose is fair game: steal rivals\' forks. Dash INTO flying cutlery when unarmed to catch it.',
      'Eat crumbs to fill your belly, then STOMP to go KAIJU: huge, immune to cutlery, squashes everyone.',
      'Shove rivals off the table edge. And watch for the GIANT HAND: it hunts whoever is biggest.',
    ];
    this.add.text(640, 548, rules.join('\n'), { ...BODY, fontSize: '15px', align: 'center', color: '#cdb9a3', lineSpacing: 5 }).setOrigin(0.5, 0);
    if (!isTouchDevice) {
      this.add.text(640, 688, 'THROW on any controller to join · DASH to leave · B add bot · N remove bot · D bot difficulty · 1 or START to play',
        { ...BODY, fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
    }
    setTouchMode('menu');
    applyPendingUpdate();
    // First visit on a phone: seat the touch player straight away.
    if (isTouchDevice && !this.registry.get('touchSeeded')) {
      this.registry.set('touchSeeded', true);
      if (!this.slots.some(s => s.kind === 'touch')) this.slots.unshift({ kind: 'touch', index: 0 });
    }

    const demo = Number(new URLSearchParams(location.search).get('demo') ?? 0);
    if (demo >= 2 && !this.registry.get('demoStarted')) {
      this.registry.set('demoStarted', true);
      this.slots = Array.from({ length: Math.min(4, demo) }, (_, i) => ({ kind: 'bot' as const, index: i }));
      this.startGame();
    }
  }

  private startGame(): void {
    const slots = this.slots.slice();
    while (slots.length < 2) slots.push({ kind: 'bot', index: slots.length });
    this.scene.start('game', { slots, difficulty: this.difficulty });
  }

  update(_time: number, delta: number): void {
    this.t += delta / 1000;
    this.pollDevices();
    if (consumeTap('KeyB') && this.slots.length < 4) { this.slots.push({ kind: 'bot', index: this.slots.length }); sfx.join(this.slots.length); }
    if (consumeTap('KeyN')) {
      for (let i = this.slots.length - 1; i >= 0; i--) if (this.slots[i].kind === 'bot') { this.slots.splice(i, 1); sfx.leave(); break; }
    }
    if (consumeTap('KeyD')) {
      this.difficulty = DIFFICULTIES[(DIFFICULTIES.indexOf(this.difficulty) + 1) % DIFFICULTIES.length];
      sfx.pickup();
    }
    if (consumeTap('TouchJoin')) {
      const j = this.slots.findIndex(s => s.kind === 'touch');
      if (j >= 0) { this.slots.splice(j, 1); sfx.leave(); }
      else if (this.slots.length < 4) { this.slots.push({ kind: 'touch', index: 0 }); sfx.join(this.slots.length); }
    }
    if (consumeTap('Digit1')) { this.startGame(); return; }
    clearTaps();
    setTouchHud({ joined: this.slots.some(s => s.kind === 'touch'), difficulty: this.difficulty });
    this.draw();
  }

  private pollDevices(): void {
    for (const d of listDevices()) {
      const inp = readSlot(d), id = d.kind + d.index;
      const prev = this.devPrev.get(id) ?? { throw: true, dash: true, start: true };
      const joined = this.slots.findIndex(s => sameDevice(s, d));
      // Keyboards also check per-press taps so a very quick tap between frames still counts.
      const km = d.kind === 'kb' ? KEYMAPS[d.index] : null;
      const tapThrow = km ? km.throw.filter(k => consumeTap(k)).length > 0 : false;
      const tapDash = km ? km.dash.filter(k => consumeTap(k)).length > 0 : false;
      if (((inp.throw && !prev.throw) || tapThrow) && joined < 0 && this.slots.length < 4) { this.slots.push(d); sfx.join(this.slots.length); }
      if (((inp.dash && !prev.dash) || tapDash) && joined >= 0) { this.slots.splice(joined, 1); sfx.leave(); }
      this.devPrev.set(id, { throw: inp.throw, dash: inp.dash, start: inp.start });
      if (inp.start && !prev.start) { this.startGame(); return; }
    }
  }

  private draw(): void {
    const g = this.g, t = this.t;
    g.clear();
    if (hasArt('bg-menu')) {
      // keep the key art visible up top, calmer behind the seat cards and text
      g.fillStyle(0x0d0805, 0.2); g.fillRect(0, 0, 1280, 150);
      g.fillStyle(0x0d0805, 0.62); g.fillRect(0, 150, 1280, 570);
    } else {
      drawFloor(g);
    }
    // flying cutlery decoration
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
      const x = 205 + i * 290, s = this.slots[i];
      g.fillStyle(0x000000, 0.5);
      g.fillRoundedRect(x - 128, 168, 256, 216, 18);
      g.lineStyle(3, s ? COLORS[i] : 0x4a3a2e, 1);
      g.strokeRoundedRect(x - 128, 168, 256, 216, 18);
      if (s) {
        const aim = Math.sin(t * 1.5 + i) * 0.8 + Math.PI / 2;
        const img = this.cardImgs[i];
        if (img) {
          g.fillStyle(0x000000, 0.35); g.fillEllipse(x, 296, 110, 18);
          fitInside(img.setVisible(true), 130, 120).setOrigin(0.5, 1).setPosition(x, 300 - Math.abs(Math.sin(t * 3 + i)) * 6);
        } else {
          drawKaiju(g, { x, y: 250 + Math.sin(t * 4 + i) * 4, r: 44, aim, kaiju: false, species: i, color: COLORS[i] }, t);
        }
        this.slotTexts[i].setText(SPECIES[i].full.toUpperCase());
        this.slotSub[i].setText(s.kind === 'bot' ? `Bot (${this.difficulty})` : slotLabel(s));
      } else {
        this.cardImgs[i]?.setVisible(false);
        g.fillStyle(0xffffff, 0.06 + 0.04 * Math.sin(t * 3 + i));
        g.fillCircle(x, 250, 44);
        this.slotTexts[i].setText('');
        this.slotSub[i].setText(isTouchDevice ? 'empty seat (+ BOT fills it)' : 'press THROW to join');
      }
    }
    this.diffText.setText(`Bot difficulty: ${this.difficulty.toUpperCase()}   ·   First to 5 rounds`);
  }
}
