import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps, consumeTap, injectTap, KEYMAPS, listDevices, readSlot, sameDevice, slotLabel, type Slot } from '../input';
import { applyPendingUpdate } from '../pwa';
import { Button } from '../render/ui';
import { CUTLERY_LEN, fitInside, hasArt, kaijuKey } from '../render/art';
import { drawCutleryShape, drawFloor, drawKaiju } from '../render/draw';
import { BODY as BODY_FONT, body, DISPLAY, INK, popIn, withGradient, withShadow } from '../render/fonts';
import { DIFFICULTIES, type Difficulty } from '../sim/bot';
import { DEFAULT_ROUNDS, MAX_PLAYERS, ROUND_CHOICES, SPECIES } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { isTouchDevice, setTouchHud, setTouchMode } from '../touch';
import { owned, type Owned } from '../story/unlocks';
import { playMusic } from '../music';
import { keyFor, keyLabel } from '../keybinds';
import { POWERUPS } from '../sim/powerups';
import { cupGames, cupLength, setCupLength } from '../cup';
import { loadStats } from '../stats';
import { loadRules, parseCode, rulesCode, rulesSummary, saveRules, SLOTS, type HouseRules } from '../houseRules';
import { getSettings, setSetting } from '../settings';
import { enabledMutators, mutatorDef, type Mutator } from '../sim/mutators';
import { enabledModes, MODE_RULES, modeDef, type GameMode } from '../sim/modes';
import { KITS } from '../sim/powers';
import { currentColour, seatColours } from '../colours';

const TITLE = { fontFamily: DISPLAY, color: '#ffe9c7', stroke: INK, strokeThickness: 10 };
const BODY = { fontFamily: BODY_FONT, fontStyle: '800', color: '#e9dccb' };
/** Party Modes start at first-to-this (Free Play uses DEFAULT_ROUNDS). EASY TO CHANGE. */
const PARTY_ROUNDS = 3;
/** New players get first-to-3 matches until they have played this many. */
const FIRST_MATCHES = 3;
const CARD_X = (i: number) => 112 + i * 211; // 6 seats across
const CARD_W = 198;

export interface MenuData {
  slots?: Slot[];
  difficulty?: Difficulty;
  species?: number[];
  tables?: number[] | null;
  rounds?: number;
  botLevels?: (Difficulty | null)[];
  mode?: GameMode;
  party?: boolean; // opened from the PARTY MODES card: show the mode picker (Free Play is Classic only)
  powerups?: boolean;
  hazards?: boolean;
  mutator?: Mutator;
}

export class MenuScene extends Phaser.Scene {
  private slots: Slot[] = [];
  private picks: number[] = []; // kaiju species per slot
  private difficulty: Difficulty = 'normal';
  private botLevels: (Difficulty | null)[] = []; // per-seat override (null = use the global difficulty)
  private table = -1; // -1 = rotate through all tables
  private rounds = DEFAULT_ROUNDS; // first to this many round wins
  private mode: GameMode = 'classic';
  private powerups = POWERUPS.enabled;
  private hazards = true;
  private mutator: Mutator = 'none';
  private modeText!: Phaser.GameObjects.Text;
  private g!: Phaser.GameObjects.Graphics;
  private slotTexts: Phaser.GameObjects.Text[] = [];
  private slotSub: Phaser.GameObjects.Text[] = [];
  private teamTags: Phaser.GameObjects.Text[] = [];
  private slotFood: Phaser.GameObjects.Text[] = [];
  private infoText!: Phaser.GameObjects.Text;
  private setBtns: Button[] = [];
  private playBtn: Button | null = null;
  private keysBtn: Button | null = null;
  private rulesBtn: Button | null = null;
  private rulesUi: (Button | Phaser.GameObjects.GameObject)[] = [];
  private keysShown = false;
  static lastParty: boolean | null = null;
  private keysToggle: ((v: boolean) => void) | null = null;
  private hintText: Phaser.GameObjects.Text | null = null;
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
    this.botLevels = (data.botLevels ?? []).slice(0, this.slots.length);
    this.party = !!data.party;
    // Free Play and Party Modes keep their own twist/power-up choices (they used to leak into each other)
    if (data.mutator === undefined && MenuScene.lastParty !== null && MenuScene.lastParty !== this.party) { this.mutator = 'none'; this.powerups = POWERUPS.enabled; this.hazards = true; this.table = -1; }
    MenuScene.lastParty = this.party;
    this.rounds = data.rounds ?? (this.party || loadStats().matches < FIRST_MATCHES ? PARTY_ROUNDS : DEFAULT_ROUNDS); // party nights and your first few matches: shorter
    if (data.mode) this.mode = data.mode;
    if (!this.party) this.mode = 'classic';
    else if (this.mode === 'classic') this.mode = enabledModes().find(m => m.id !== 'classic')?.id ?? 'classic';
    if (data.powerups !== undefined) this.powerups = data.powerups;
    if (data.hazards !== undefined) this.hazards = data.hazards;
    if (data.mutator) this.mutator = data.mutator;
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
    this.botLevels.splice(i, 1);
    sfx.leave();
  }

  /** Next/previous kaiju not already taken by someone else. */
  private cycle(i: number, dir: number): void {
    const taken = new Set(this.picks.filter((_, k) => k !== i));
    this.picks[i] = nextIn(this.own.kaiju, this.picks[i], dir, taken);
    this.bump[i] = 1;
    sfx.pickup();
  }

  /** 🎲 Random mode, table and twist (from what you own / what is enabled). */
  private shuffle(): void {
    const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
    if (this.party) this.mode = pick(enabledModes().map(m => m.id).filter(m => m !== 'classic'));
    this.table = pick(this.own.tables);
    this.mutator = Math.random() < 0.5 ? 'none' : pick(enabledMutators().map(m => m.id));
    for (let i = 0; i < MAX_PLAYERS; i++) this.bump[i] = 1;
    sfx.meterFull();
  }

  private party = false;
  private tagline!: Phaser.GameObjects.Text;

  private cycleMode(): void {
    if (!this.party) return;
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
    this.cardImgs = Array.from({ length: MAX_PLAYERS }, (_, i) => i).map(i => this.add.image(CARD_X(i), 266, '__MISSING').setDepth(1).setVisible(false));
    this.decoImgs = (['fork', 'spoon', 'knife', 'chopstick', 'ladle', 'spork'] as const)
      .filter(k => hasArt(`cut-${k}`))
      .map(k => this.add.image(0, 0, `cut-${k}`).setDepth(0.5).setAlpha(0.55).setScale((CUTLERY_LEN[k] * 1.5) / this.textures.get(`cut-${k}`).getSourceImage().width));
    const title = this.add.text(640, 54, this.party ? 'PARTY MODES' : 'FREE PLAY', { ...TITLE, fontSize: '80px', strokeThickness: 11, padding: { x: 8, y: 8 } }).setOrigin(0.5).setDepth(2);
    withShadow(withGradient(title, '#fff6cf', '#ffb347'), 7);
    popIn(this, title, 1.25, 600);
    this.tagline = withShadow(this.add.text(640, 112, 'Tiny monsters. Giant dinner.', { ...BODY, fontStyle: '900', fontSize: '20px', color: '#ffd9a0' }).setOrigin(0.5).setDepth(2), 3);

    this.slotTexts = [];
    this.slotSub = [];
    // Team Feast: a RED TEAM / BLUE TEAM tag on top of each seat card (teams alternate by seat, like in the match)
    this.teamTags = Array.from({ length: MAX_PLAYERS }, (_, i) => this.add.text(CARD_X(i), 184, '', { ...BODY, fontStyle: '900', fontSize: '15px', color: '#ffffff' }).setOrigin(0.5).setDepth(3).setVisible(false));
    this.slotFood = [];
    for (let i = 0; i < MAX_PLAYERS; i++) {
      this.slotTexts.push(withShadow(this.add.text(CARD_X(i), 338, '', { ...TITLE, fontSize: '22px', strokeThickness: 5 }).setOrigin(0.5).setDepth(2), 3));
      this.slotFood.push(this.add.text(CARD_X(i), 362, '', { ...BODY, fontSize: '13px', fontStyle: 'italic 800', color: '#ffcf8a' }).setOrigin(0.5).setDepth(2));
      this.slotSub.push(this.add.text(CARD_X(i), 384, '', { ...BODY, fontStyle: '700', fontSize: '13px', align: 'center', color: '#d9c7b3' }).setOrigin(0.5).setDepth(2));
    }
    this.infoText = this.add.text(640, 424, '', { ...BODY, fontStyle: '900', fontSize: '17px', color: '#ffcf8a' }).setOrigin(0.5).setDepth(2);
    this.tableText = this.add.text(640, 452, '', { ...BODY, fontStyle: '900', fontSize: '16px', color: '#ffffff', align: 'center' }).setOrigin(0.5).setDepth(2);
    this.tableThumb = null;
    // tap / click a bot's card to change just that bot's difficulty
    for (let i = 0; i < MAX_PLAYERS; i++) {
      this.add.zone(CARD_X(i), 292, CARD_W, 216).setInteractive({ useHandCursor: true }).setDepth(4).on('pointerup', () => {
        const sl = this.slots[i];
        if (!sl) {
          const human = this.slots.some(q => q.kind !== 'bot');
          this.addSlot(human ? { kind: 'bot', index: this.slots.length } : isTouchDevice ? { kind: 'touch', index: 0 } : { kind: 'kb', index: 0 });
          this.fixPicks();
          return;
        }
        if (sl.kind !== 'bot') { this.cycle(i, 1); this.bump[i] = 1; sfx.pickup(); return; }
        const cur = this.botLevels[i] ?? this.difficulty;
        this.botLevels[i] = DIFFICULTIES[(DIFFICULTIES.indexOf(cur) + 1) % DIFFICULTIES.length];
        this.bump[i] = 1;
        sfx.pickup();
      });
    }
    this.modeText = withShadow(this.add.text(640, 143, '', { ...BODY, fontStyle: '900', fontSize: '17px', color: '#ffd24a', align: 'center' }).setOrigin(0.5).setDepth(3), 2);
    if (this.party) this.modeText.setInteractive({ useHandCursor: true }).on('pointerup', () => this.cycleMode()); // tap the mode line to change mode

    // Controls as key "chips": [KEY] tokens get a keycap behind them.
    const chipG = this.add.graphics().setDepth(2);
    const lines = isTouchDevice
      ? [
          '[LEFT SIDE] drag to move   [THROW] hold, drag to aim, let go   [SWIPE] up close   [DASH] dodge & shove   [STOMP] belly full',
        ]
      : [
          ...[0, 1].map(p => { const k = (a: Parameters<typeof keyFor>[1]) => keyLabel(keyFor(p, a)); return `Keyboard ${p ? 'Right' : 'Left'}   [${k('up')} ${k('left')} ${k('down')} ${k('right')}] move  [${k('throw')}] throw  [${k('swipe')}] swipe  [${k('dash')}] dash  [${k('stomp')}] stomp  [${k('emote')}] emote`; }),
          'Gamepad   [L-STICK] move  [R-STICK] aim  [A] throw  [X] swipe  [B] dash  [Y] stomp  [LT] emote',
        ];
    // desktop: the full key legend lives behind a ⌨ KEYS button (beginners found it cluttered)
    const before = this.children.list.length;
    const keyG = isTouchDevice ? chipG : this.add.graphics().setDepth(2);
    lines.forEach((l, i) => this.chipLine(keyG, 640, (isTouchDevice ? 494 : 500) + i * 27, l, 14));
    const rules = [
      'Cutlery STICKS where it lands, so a miss leaves you unarmed, and anything loose is fair game.',
      'Eat crumbs, then STOMP to go KAIJU. Shove rivals off the edge. Every table has its own hazard.',
    ];
    if (!isTouchDevice) this.add.text(640, 586, rules.join('\n'), { ...BODY, fontStyle: '700', fontSize: '14px', align: 'center', color: '#cdb9a3', lineSpacing: 4 }).setOrigin(0.5, 0).setDepth(2);
    if (!isTouchDevice) {
      this.chipLine(keyG, 640, 640, '[THROW] join   [◀ ▶] pick kaiju   [DASH] leave   [B] [N] add / remove bot', 15);
      this.chipLine(keyG, 640, 672, this.party ? '[G] mode  [C] party cup  [2] bot level  [M] table  [R] rounds  [U] power-ups  [H] hazards  [X] twist  [Z] 🎲 random  [1] PLAY' : '[2] bot level  [M] table  [R] rounds  [U] power-ups  [H] hazards  [X] twist  [Z] 🎲 random  [O] online  [1] PLAY', 15);
    }
    if (!isTouchDevice) {
      // everything in the key legend becomes a hidden panel (shown with ⌨ KEYS)
      const keyObjs = this.children.list.slice(before) as (Phaser.GameObjects.GameObject & { setVisible: (v: boolean) => unknown; setDepth: (d: number) => unknown })[];
      const panel = this.add.graphics().setDepth(19);
      panel.fillStyle(0x0d0805, 0.97).fillRoundedRect(8, 474, 1264, 240, 18).lineStyle(3, 0xffb347, 1).strokeRoundedRect(8, 474, 1264, 240, 18);
      keyObjs.push(panel as never);
      for (const o of keyObjs) if (o !== (panel as never)) o.setDepth(20);
      const show = (v: boolean) => { this.keysShown = v; this.rulesBtn?.setVisible(!v); for (const o of keyObjs) o.setVisible(v); this.keysBtn?.setText(v ? '✖ CLOSE KEYS' : '⌨ KEYS'); };
      // big, clickable setup: settings row + PLAY
      const W = this.party ? 118 : 130, items: [string, string][] = this.party
        ? [['mode', 'KeyG'], ['cup', 'KeyC'], ['cuplen', 'KeyL'], ['bots', 'Digit2'], ['table', 'KeyM'], ['rounds', 'KeyR'], ['twist', 'KeyX'], ['power', 'KeyU'], ['haz', 'KeyH'], ['dice', 'KeyZ']]
        : [['bots', 'Digit2'], ['table', 'KeyM'], ['rounds', 'KeyR'], ['twist', 'KeyX'], ['power', 'KeyU'], ['haz', 'KeyH'], ['dice', 'KeyZ'], ['online', 'KeyO']];
      const x0 = 640 - ((items.length - 1) * (W + 8)) / 2;
      this.setBtns = items.map(([id, code], k) => { const b = new Button(this, x0 + k * (W + 8), 512, { w: W, h: 54, label: '', size: 14, onClick: () => { if (!this.keysShown) injectTap(code); } }, 6); (b as Button & { id?: string }).id = id; b.label.setAlign('center').setLineSpacing(-2); return b; });
      this.playBtn = new Button(this, 640, 596, { w: 320, h: 70, label: '▶ PLAY', size: 32, accent: 0xff9a3c, onClick: () => { if (!this.keysShown) injectTap('Digit1'); } }, 6);
      this.hintText = this.add.text(640, 652, '', { ...BODY, fontStyle: '800', fontSize: '14px', color: '#cdb9a3', align: 'center' }).setOrigin(0.5).setDepth(2);
      this.keysBtn = new Button(this, 92, 690, { w: 150, h: 40, label: '⌨ KEYS', size: 16, onClick: () => show(!this.keysShown) }, 21);
      this.rulesBtn = new Button(this, 262, 690, { w: 170, h: 40, label: '💾 HOUSE RULES', size: 15, onClick: () => this.toggleRules() }, 21);
      this.keysToggle = show;
      show(false);
    }
    setTouchMode('menu');
    playMusic('menu');
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
      if (gm && enabledModes().some(m => m.id === gm)) { this.mode = gm; this.party = gm !== 'classic'; }
      this.startGame();
    }
  }

  /** 🏆 Party Cup with the current seats (bots fill to 3 so every mode works). */
  /** 💾 House Rules panel: 3 save slots + share codes (src/houseRules.ts). */
  private toggleRules(): void {
    if (this.rulesUi.length) { for (const u of this.rulesUi) { if (u instanceof Button) { u.g.destroy(); u.label.destroy(); u.sub?.destroy(); u.zone.destroy(); } else u.destroy(); } this.rulesUi = []; return; }
    const cur = (): HouseRules => ({ party: this.party, mode: this.mode, rounds: this.rounds, mutator: this.mutator, powerups: this.powerups, hazards: this.hazards, table: this.table, difficulty: this.difficulty, catchUp: getSettings().catchUp });
    const apply = (r: HouseRules) => {
      if (r.catchUp !== undefined) setSetting('catchUp', r.catchUp);
      sfx.go();
      this.scene.restart({ slots: this.slots, species: this.picks, difficulty: r.difficulty as Difficulty, party: r.party, mode: r.mode as GameMode, rounds: r.rounds, mutator: r.mutator as Mutator, powerups: r.powerups, hazards: r.hazards, tables: r.table >= 0 && r.table < LAYOUTS.length ? [r.table] : null });
    };
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x0d0805, 0.97).fillRoundedRect(140, 150, 1000, 470, 20).lineStyle(3, 0xffb347, 1).strokeRoundedRect(140, 150, 1000, 470, 20);
    this.rulesUi.push(g);
    const t = this.add.text(640, 186, '💾 HOUSE RULES: save this setup, load one, or share it as a code', body(20, '#ffd24a', 900)).setOrigin(0.5).setDepth(31);
    this.rulesUi.push(t);
    const rules = loadRules();
    for (let k = 0; k < SLOTS; k++) {
      const r = rules[k], y = 250 + k * 90;
      const load = new Button(this, 520, y, { w: 680, h: 70, label: r ? `SLOT ${k + 1}: ${r.party ? 'PARTY · ' : ''}${rulesSummary(r)}` : `SLOT ${k + 1}: (empty)`, size: 16, accent: r ? 0x8dff6a : 0x6a5a4a, onClick: () => { if (r) apply(r); else sfx.thwock(); } }, 31);
      const save = new Button(this, 990, y, { w: 200, h: 70, label: '💾 SAVE HERE', size: 16, accent: 0xffd24a, onClick: () => { saveRules(k, cur()); sfx.pickup(); this.toggleRules(); this.toggleRules(); } }, 31);
      this.rulesUi.push(load, save);
    }
    const code = rulesCode(cur());
    const share = new Button(this, 420, 545, { w: 380, h: 56, label: '📋 COPY THIS SETUP AS A CODE', size: 16, onClick: () => { try { void navigator.clipboard?.writeText(code); } catch { /* blocked */ } info.setText(`Code: ${code}  (copied)`); sfx.pickup(); } }, 31);
    const paste = new Button(this, 860, 545, { w: 380, h: 56, label: '📥 ENTER A FRIEND\'S CODE', size: 16, onClick: () => { const c = window.prompt('Paste a House Rules code (KK1-…)'); const r = c ? parseCode(c) : null; if (r) apply(r); else if (c) { info.setText('That code didn\'t work. Check it and try again.'); sfx.thwock(); } } }, 31);
    const info = this.add.text(640, 596, 'Esc closes', body(13, '#cdb9a3', 800)).setOrigin(0.5).setDepth(31);
    this.rulesUi.push(share, paste, info);
  }

  private startCup(): void {
    while (this.slots.length < 3) this.addSlot({ kind: 'bot', index: this.slots.length });
    this.fixPicks();
    const g = cupGames(this.slots.length)[0];
    this.scene.start('game', {
      slots: this.slots.slice(), difficulty: this.difficulty, species: this.picks.slice(), botLevels: this.slots.map((s, i) => (s.kind === 'bot' ? this.botLevels[i] ?? null : null)),
      tables: this.table < 0 ? this.own.tables.slice() : [this.table], rounds: g.rounds, mode: g.mode, powerups: this.powerups, hazards: this.hazards, mutator: this.mutator, party: true, cup: { game: 0, points: [] },
    });
  }

  private startGame(): void {
    if (!this.registry.get('demoStarted') && !this.slots.some(s => s.kind !== 'bot')) { this.slots.unshift(isTouchDevice ? { kind: 'touch', index: 0 } : { kind: 'kb', index: 0 }); this.picks.unshift(-1); this.fixPicks(); }
    while (this.slots.length < Math.max(2, modeDef(this.mode).minPlayers)) this.addSlot({ kind: 'bot', index: this.slots.length });
    if (this.mode === 'teams' && this.slots.length % 2 === 1 && this.slots.length < MAX_PLAYERS) this.addSlot({ kind: 'bot', index: this.slots.length }); // even teams
    this.fixPicks();
    this.scene.start('game', {
      slots: this.slots.slice(), difficulty: this.difficulty, species: this.picks.slice(), botLevels: this.slots.map((s, i) => (s.kind === 'bot' ? this.botLevels[i] ?? null : null)), tables: this.table < 0 ? this.own.tables.slice() : [this.table], rounds: this.rounds, mode: this.mode, powerups: this.powerups, hazards: this.hazards, mutator: this.mutator, party: this.party,
    });
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    this.t += dt;
    for (let i = 0; i < MAX_PLAYERS; i++) this.bump[i] = Math.max(0, this.bump[i] - dt * 5);
    applyPendingUpdate();
    this.backBtn?.update(dt);
    for (const b of this.setBtns) b.update(dt);
    this.playBtn?.update(dt);
    this.keysBtn?.update(dt);
    this.rulesBtn?.update(dt);
    for (const u of this.rulesUi) if (u instanceof Button) u.update(dt);
    if (this.rulesUi.length && consumeTap('Escape')) { this.toggleRules(); clearTaps(); return; }
    if (this.keysShown && consumeTap('Escape')) this.keysToggle?.(false);
    this.pollDevices();
    if (consumeTap('KeyB')) this.addSlot({ kind: 'bot', index: this.slots.length });
    if (consumeTap('KeyN')) {
      for (let i = this.slots.length - 1; i >= 0; i--) if (this.slots[i].kind === 'bot') { this.removeSlot(i); break; }
    }
    // Bot difficulty: '2' on a keyboard (D is the left player's "next kaiju"), or the BOTS button on touch.
    if (consumeTap('Digit2') || consumeTap('TouchDiff')) { this.difficulty = DIFFICULTIES[(DIFFICULTIES.indexOf(this.difficulty) + 1) % DIFFICULTIES.length]; this.botLevels = []; sfx.pickup(); }
    if (consumeTap('KeyM')) this.cycleTable();
    if (consumeTap('KeyR') || consumeTap('TouchRounds')) {
      this.rounds = ROUND_CHOICES[(ROUND_CHOICES.indexOf(this.rounds) + 1) % ROUND_CHOICES.length] ?? DEFAULT_ROUNDS;
      sfx.pickup();
    }
    if (consumeTap('KeyG') || consumeTap('TouchMode')) this.cycleMode();
    if (consumeTap('KeyU') || consumeTap('TouchPowerups')) { this.powerups = !this.powerups; sfx.pickup(); }
    if (consumeTap('KeyH') || consumeTap('TouchHazards')) { this.hazards = !this.hazards; sfx.pickup(); }
    if (consumeTap('KeyX') || consumeTap('TouchMutator')) { const l = enabledMutators().map(m => m.id); this.mutator = l[(l.indexOf(this.mutator) + 1) % l.length] ?? 'none'; sfx.pickup(); }
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
    if (this.party && (consumeTap('KeyC') || consumeTap('TouchCup'))) { this.startCup(); return; }
    if (this.party && consumeTap('KeyL')) setCupLength(cupLength() === 'short' ? 'full' : 'short');
    if (consumeTap('KeyZ') || consumeTap('TouchShuffle')) this.shuffle();
    if (consumeTap('Escape')) { this.scene.start('title'); return; }
    clearTaps();
    setTouchHud({
      joined: this.slots.some(s => s.kind === 'touch'),
      difficulty: this.difficulty,
      table: this.table < 0 ? 'ALL' : LAYOUTS[this.table].name.toUpperCase(),
      rounds: this.rounds,
      mode: modeDef(this.mode).name,
      party: this.party,
      powerups: this.powerups,
      hazards: this.hazards,
      mutator: mutatorDef(this.mutator).name,
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
        img.setPosition(640 + Math.cos(a) * 560, 80 + Math.sin(a) * 30).setRotation(a * 3);
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
      const team = this.mode === 'teams' ? i % 2 : -1, tcol = team >= 0 ? MODE_RULES.teams.colors[team] : 0;
      g.fillStyle(0x000000, 0.5);
      g.fillRoundedRect(x - CARD_W / 2, 184, CARD_W, 216, 16);
      if (team >= 0) {
        g.fillStyle(tcol, s ? 0.28 : 0.12); g.fillRoundedRect(x - CARD_W / 2, 184, CARD_W, 216, 16);
        g.lineStyle(6, tcol, s ? 1 : 0.5); g.strokeRoundedRect(x - CARD_W / 2, 184, CARD_W, 216, 16);
        g.fillStyle(tcol, 1); g.fillRoundedRect(x - 66, 171, 132, 28, 14);
        g.lineStyle(2, 0xffffff, 0.8); g.strokeRoundedRect(x - 66, 171, 132, 28, 14);
        this.teamTags[i].setText(`${MODE_RULES.teams.names[team]} TEAM`).setVisible(true);
      } else {
        this.teamTags[i].setVisible(false);
        g.lineStyle(3, col, 1);
        g.strokeRoundedRect(x - CARD_W / 2, 184, CARD_W, 216, 16);
      }
      if (s && sp >= 0) {
        // left/right arrows for players who can change their kaiju
        if (s.kind !== 'bot') {
          const pulse = 0.55 + 0.35 * Math.sin(t * 5);
          g.fillStyle(col, pulse);
          g.fillTriangle(x - 88, 266, x - 74, 254, x - 74, 278);
          g.fillTriangle(x + 88, 266, x + 74, 254, x + 74, 278);
        }
        const key = `kaiju-${sp}`;
        const pop = 1 + this.bump[i] * 0.15;
        if (hasArt(key)) {
          g.fillStyle(0x000000, 0.35); g.fillEllipse(x, 312, 96, 16);
          img.setTexture(kaijuKey(this, sp, seatColours(this.slots.map((_, j) => this.picks[j]), this.slots.map(q => (q.kind === 'bot' ? undefined : currentColour().id)))[i])).setVisible(true);
          fitInside(img, 116 * pop, 112 * pop).setOrigin(0.5, 1).setPosition(x, 316 - Math.abs(Math.sin(t * 3 + i)) * 6);
        } else {
          img.setVisible(false);
          drawKaiju(g, { x, y: 266 + Math.sin(t * 4 + i) * 4, r: 38 * pop, aim: Math.sin(t * 1.5 + i) * 0.8 + Math.PI / 2, kaiju: false, species: sp, color: col }, t);
        }
        this.slotTexts[i].setText(SPECIES[sp].full.toUpperCase()).setColor(SPECIES[sp].css);
        this.slotFood[i].setText(getSettings().kaijuPowers ? `🌟 ${KITS[sp].power}` : SPECIES[sp].food);
        const how = s.kind === 'kb' ? (s.index === 0 ? 'Keys left · A / D' : 'Keys right · ← / →')
          : s.kind === 'pad' ? `${slotLabel(s)} · ◀ ▶`
          : s.kind === 'touch' ? 'Touch · KAIJU ▶' : `Bot: ${(this.botLevels[i] ?? this.difficulty).toUpperCase()}${this.botLevels[i] ? ' ✎' : ''} (tap)`;
        this.slotSub[i].setText(how);
      } else {
        img.setVisible(false);
        g.fillStyle(0xffffff, 0.06 + 0.04 * Math.sin(t * 3 + i));
        g.fillCircle(x, 266, 38);
        this.slotTexts[i].setText('');
        this.slotFood[i].setText('');
        this.slotSub[i].setText(isTouchDevice ? 'tap to join' : this.slots.some(q => q.kind !== 'bot') ? 'click: add a bot' : 'click or THROW to join');
      }
    }
    if (this.setBtns.length) {
      const tl0 = this.table < 0 ? null : LAYOUTS[this.table];
      const label: Record<string, string> = {
        mode: `MODE ▶\n${modeDef(this.mode).name}`, cup: '🏆 PARTY\nCUP', cuplen: `CUP LENGTH\n${cupGames(Math.max(3, this.slots.length)).length} GAMES`, bots: `BOT LEVEL\n${this.difficulty.toUpperCase()}`, table: `TABLE\n${tl0 ? tl0.name.toUpperCase() : 'ALL'}`,
        rounds: `FIRST TO\n${this.rounds}`, twist: `TWIST\n${this.mutator === 'none' ? 'NONE' : mutatorDef(this.mutator).name}`, power: `POWER-UPS\n${this.powerups ? 'ON' : 'OFF'}`, haz: `HAZARDS\n${this.hazards ? 'ON' : 'OFF'}`, dice: '🎲\nRANDOM', online: '🌐\nONLINE',
      };
      for (const b of this.setBtns) { const id = (b as Button & { id?: string }).id ?? ''; b.setText(label[id] ?? ''); b.label.setScale(Math.min(1, (this.party ? 106 : 118) / Math.max(1, b.label.width / b.label.scaleX))); }
      const people = this.slots.filter(q => q.kind !== 'bot').length;
      this.hintText?.setText(people ? `${this.slots.length} at the table · click empty seats to add bots · press ▶ PLAY` : 'Click a seat (or press THROW on a keyboard / gamepad) to join');
      if (this.mutator !== 'none' && this.hintText) this.hintText.setText(`⚡ ${mutatorDef(this.mutator).name}: ${mutatorDef(this.mutator).blurb}`);
      if (this.party && this.hintText) { const g = cupGames(Math.max(3, this.slots.length)); this.hintText.setText(`${this.hintText.text}
🏆 Party Cup = ${g.length} games: ${g.map(x => modeDef(x.mode).name).join(' → ')} · points 5 / 3 / 2 / 1`); }
    }
    const md = modeDef(this.mode);
    this.modeText.setFontSize(this.party ? 18 : 16).setY(143);
    const seats = this.slots.map((_, i) => i % 2), red = seats.filter(t => t === 0).length, blue = seats.length - red;
    this.tagline.setText(this.mode === 'teams' ? `${md.blurb}   ·   RED ${red}  vs  BLUE ${blue}${red !== blue ? '  (add a player or bot to even it up)' : ''}` : this.party ? md.blurb : 'Tiny monsters. Giant dinner.');
    this.modeText.setText(`${this.party ? `◀ ${md.name} ▶` : 'CLASSIC'}   ·   POWER-UPS: ${this.powerups ? 'ON' : 'OFF'}   ·   HAZARDS: ${this.hazards ? 'ON' : 'OFF'}${this.mutator !== 'none' ? `   ·   ⚡ ${mutatorDef(this.mutator).name}` : ''}`);
    this.infoText.setText(`Bot difficulty: ${this.difficulty.toUpperCase()}   ·   Up to ${MAX_PLAYERS} players   ·   First to ${this.rounds} round${this.rounds === 1 ? '' : 's'}   ·   ${this.own.kaiju.length < SPECIES.length ? `${this.own.kaiju.length}/${SPECIES.length} kaiju (unlock more in Story)` : `${SPECIES.length} kaiju`}`);
    const tl = this.table < 0 ? null : LAYOUTS[this.table];
    this.tableText.setText(tl ? `TABLE: ${tl.name.toUpperCase()}  —  ${tl.blurb}` : `TABLE: ALL ${this.own.tables.length} (a different one every round)${this.own.tables.length < LAYOUTS.length ? ` · ${LAYOUTS.length - this.own.tables.length} more to unlock in Story` : ''}`);
    // small preview of the chosen table surface
    const key = tl ? tl.table : null;
    if (key && hasArt(key)) {
      if (!this.tableThumb) this.tableThumb = this.add.image(0, 0, key).setDepth(2);
      const tw = this.tableText.width;
      this.tableThumb.setTexture(key).setVisible(true).setDisplaySize(54, 29).setPosition(640 - tw / 2 - 36, 452);
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
      const code = CHIP_KEYS[label];
      const t = this.add.text(0, cy, label, chip
        ? { ...BODY, fontStyle: '900', fontSize: `${size}px`, color: '#2a1408' }
        : { ...BODY, fontStyle: '700', fontSize: `${size}px`, color: '#e9dccb' }).setOrigin(0, 0.5).setDepth(3);
      if (chip && code) t.setPadding(7, 5, 7, 5).setInteractive({ useHandCursor: true }).on('pointerup', () => injectTap(code));
      return { t, chip, w: t.width + (chip ? 14 : 0) - (chip && code ? 14 : 0) };
    });
    let x = cx - items.reduce((a, it) => a + it.w + 2, 0) / 2;
    for (const it of items) {
      if (it.chip) {
        const h = size + 10;
        g.fillStyle(0x7a4a24, 1); g.fillRoundedRect(x, cy - h / 2 + 2, it.w, h, 6); // keycap edge
        g.fillStyle(0xffe1b0, 1); g.fillRoundedRect(x, cy - h / 2, it.w, h - 2, 6); // keycap face
        it.t.setX(x + (CHIP_KEYS[it.t.text] ? 0 : 7));
      } else {
        it.t.setX(x);
      }
      x += it.w + 2;
    }
  }
}

/** Footer key chips you can click (label → key code). */
const CHIP_KEYS: Record<string, string> = { G: 'KeyG', C: 'KeyC', '2': 'Digit2', M: 'KeyM', R: 'KeyR', U: 'KeyU', H: 'KeyH', X: 'KeyX', Z: 'KeyZ', O: 'KeyO', '1': 'Digit1', B: 'KeyB', N: 'KeyN' };

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
