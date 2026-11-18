import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { playMusic } from '../music';
import { getSettings, setSetting } from '../settings';
import { ACHIEVEMENTS, checkAchievements, loadStats, saveStats, type Stats } from '../stats';
import { ACHIEVEMENT_TOKENS, addTokens, completeStep, kaijuMastery, pinnedAchievement, recordMatch, type Receipt } from '../meta';
import { clearTaps, consumeTap, injectTap, listDevices, readSlot, slotLabel, type Slot } from '../input';
import { CUTLERY_LEN, fitInside, hasArt, kaijuKey } from '../render/art';
import { ArtRenderer } from '../render/artRender';
import { drawCutleryShape, drawKaiju, drawTableLive } from '../render/draw';
import { body, display, popIn, withShadow } from '../render/fonts';
import { Button, FocusNav } from '../render/ui';
import { BotBrain, type Difficulty } from '../sim/bot';
import { P, SPECIES, TABLE, VIEW } from '../sim/constants';
import { CUTLERY } from '../sim/cutlery';
import { angleDiff } from '../sim/math';
import { MODE_RULES, modeDef, type GameMode } from '../sim/modes';
import { POWER_DEFS, POWERUPS } from '../sim/powerups';
import { MUTATOR_RULES, twistBlurb, twistName, type Mutator } from '../sim/mutators';
import { NO_INPUT, World, type GameEvent, type PlayerInput } from '../sim/world';
import { chapterRivals, starsFor } from '../story/chapters';
import { COURSES, saveDessert } from '../story/dessert';
import { addToShelf, cupShelf, FINAL_MULTIPLIER, cupGames, placePoints } from '../cup';
import { GAUNTLET, GAUNTLET_PERKS, gauntletBest, gauntletTables, runGrade, runScore, saveGauntletBest, waveCourse, waveSetup } from '../gauntlet';
import { shopOwned } from '../meta';
import { recordTrial, TRIAL_TOKENS, TRIALS } from '../trials';
import { enabledMutators } from '../sim/mutators';
import { owned } from '../story/unlocks';
import { currentHat, HAT_FIT, HAT_SCALE, hatArtKey, HATS, HATS_ENABLED } from '../hats';
import { COLOURS, currentColour, parseLook, seatColours } from '../colours';
import { KITS, powerCooldown } from '../sim/powers';
import { PRACTICE, PRACTICE_STEPS } from '../practice';
import { DAILY, dailySetup, loadDaily, recordDaily } from '../daily';
import { REPLAY, ReplayBuffer } from '../replay';
import { randomTip } from '../tips';
import { CALLOUTS } from '../callouts';
import { rumble } from '../rumble';
import { BOT_EMOTE_CHANCE, EMOTE_COOLDOWN, EMOTE_KEYS, EMOTE_TIME, EMOTES } from '../emotes';
import type { NetGuest, NetHost, NetMsg } from '../net/net';
import { applySnapshot, extrapolate, makeSnapshot, type Snapshot } from '../net/snapshot';
import { isTouchDevice, setTouchHud, setTouchMode } from '../touch';

const STEP = 1 / 120;
/** ⏩ When every human is knocked out for the rest of the round, the bots finish it this many times faster. EASY TO CHANGE (1 = off). */
export const FAST_FORWARD = 3;
/** Keep showing the STOMP coach until a player has gone KAIJU this many times (always in Story chapters 1–2). */
const STOMP_COACH_UNTIL = 5;
/** Story chapters 1–2: hazards wait this many extra seconds (learn the basics first). EASY TO CHANGE. */
export const STORY_CALM = 12;
/** 🌶️ Spicy replays: rivals start every round with this much belly (100 = ready to go KAIJU). EASY TO CHANGE. */
export const SPICY_START_BELLY = 55;
const POWER_ICON_SCALE = 1.6; // size of condiment power-ups on the table
const TOUCH_ASSIST_ANGLE = 0.45; // radians either side of facing

interface Particle { x: number; y: number; vx: number; vy: number; life: number; max: number; color: number; size: number; grav: number }
interface Ring { x: number; y: number; r: number; t: number; max: number; color: number }
interface Popup { text: Phaser.GameObjects.Text; vy: number; life: number }

export interface GameData {
  slots: Slot[];
  difficulty: Difficulty;
  species?: number[]; // which kaiju each slot picked
  tables?: number[] | null; // table pool (null/empty = all)
  rounds?: number; // first to this many round wins
  botLevels?: (Difficulty | null)[]; // per-seat bot level (story mode)
  mode?: GameMode; // party mode (Free Play)
  powerups?: boolean; // condiment power-ups (Free Play; default POWERUPS.enabled, never in Story)
  hazards?: boolean; // table hazards (hand, wind, cleaver…); default on
  mutator?: Mutator; // Free Play / Online rule twist
  mutator2?: Mutator; // ⚡⚡ a stacked second twist (local play)
  trial?: { id: string; bosses: number[] }; // 🎯 a Trial (src/trials.ts)
  lab?: boolean; // 🥋 Move Lab: practice with a belly that never empties (try KAIJU powers)
  hats?: string[]; // online: each seat's hat id ('' = none)
  gauntlet?: { wave: number; bosses: number[]; perks?: string[]; lives?: number; kos?: number; startBest?: number }; // startBest = best wave before this run (for NEW BEST) // kos = knockouts earlier in the run (for the score) // Gauntlet: seat 0 is you, one round per wave; perks picked between waves
  from?: string; // scene to go back to (practice: 'help' or 'gallery')
  daily?: { date: string }; // Daily Challenge: seat 0 is you
  party?: boolean; // started from the PARTY MODES setup (go back there afterwards)
  attract?: boolean; // title-screen demo: any input goes back to the title
  dessert?: { course: number; bosses: number[] }; // 🍰 Dessert Course (index into COURSES)
  cup?: { game: number; points: number[] }; // 🏆 Party Cup: which game of the cup, points so far
  story?: { chapter: number; bosses: number[]; spicy?: boolean; campaign?: 'main' | 'seconds'; mutator?: Mutator; bossBelly?: number; helping?: boolean }; // story chapter: seat 0 is you; bosses start rounds with a full belly
  net?: { role: 'host'; host: NetHost } | { role: 'guest'; guest: NetGuest; seat: number };
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
  /** Levels to restore when the pause menu's MUSIC / SOUND are switched back on. */
  static lastMusic = 0.35;
  static lastVolume = 0.75;
  private ffText: Phaser.GameObjects.Text | null = null;
  private pauseUi: { nav: FocusNav; objs: Button[]; dim: Phaser.GameObjects.Graphics } | null = null;
  private initData!: GameData;
  /** Per-match tallies for the end-of-match awards. */
  private tally = { crumbs: [] as number[], kaiju: [] as number[], falls: [] as number[], deaths: [] as number[], powers: [] as number[] };
  private awardsText!: Phaser.GameObjects.Text;
  private emoteBubbles: { text: Phaser.GameObjects.Text; t: number }[] = [];
  private emotePrev: boolean[] = [];
  private emoteCd: number[] = [];
  private emoteNext: number[] = [];
  private guestEmote = false;
  private attractWake = false;
  private tip = '';
  private callout = { first: false, recent: [] as number[][], streak: [] as number[], nemesis: [] as (number | null)[] };
  private attractText: Phaser.GameObjects.Text | null = null;
  private replayBuf = new ReplayBuffer();
  private replay: { frames: { t: number; s: Snapshot }[]; t: number; world: World; label: Phaser.GameObjects.Text } | null = null;
  private practice: { done: boolean[]; moved: number; lx: number; ly: number; text: Phaser.GameObjects.Text; g: Phaser.GameObjects.Graphics } | null = null;
  private padPrevStart = false;

  private baseG!: Phaser.GameObjects.Graphics;
  private tableG!: Phaser.GameObjects.Graphics;
  private dynG!: Phaser.GameObjects.Graphics;
  private overG!: Phaser.GameObjects.Graphics;
  private art!: ArtRenderer;
  private net: GameData['net'];
  private netAcc = 0;
  private netEvents: GameEvent[] = [];
  private inbox: { s: Snapshot; ev: GameEvent[] }[] = [];
  private netNotice = '';
  private species: number[] = [];
  /** Scoreboard panel geometry: 4 roomy panels, or 6 slimmer ones when more than 4 play. */
  private get hudW(): number { return this.slots.length > 4 ? 210 : 246; }
  private hudX(i: number): number { return (this.slots.length > 4 ? 5 : 16) + i * this.hudW; }
  private get hudText(): number { return this.slots.length > 4 ? 42 : 48; }
  private tables: number[] | null = null;
  private rounds = 5;
  private story: GameData['story'];
  private colors: number[] = [];
  private css: string[] = [];
  private scoreTexts: Phaser.GameObjects.Text[] = [];
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
  private mode: GameMode = 'classic';
  private powerups = false;
  private hazards = true;
  private modeText!: Phaser.GameObjects.Text;
  private tagTexts: Phaser.GameObjects.Text[] = [];
  private hatImgs: Phaser.GameObjects.Image[] = [];
  private seatCols: string[] = [];
  private twistG!: Phaser.GameObjects.Graphics;
  private twistChip: Phaser.GameObjects.Text | null = null;
  private rampage: Record<number, number> = {}; // KOs during the current KAIJU form, per seat
  private perkUi: Button[] = [];
  private badgeTexts: Phaser.GameObjects.Text[] = [];
  private shareBtn: HTMLButtonElement | null = null;
  private stats: Stats | null = null; // lifetime stats (null for online guests)
  /** 🧾 this match, for the human seat: what they did and how they went out (receipt + 'why you lost'). */
  private mine = { kos: 0, kaijus: 0, crumbs: 0, rounds: 0, parries: 0, out: {} as Record<string, number> };
  private receipt: Receipt | null = null;
  private receiptText!: Phaser.GameObjects.Text;
  private receiptG!: Phaser.GameObjects.Graphics;
  /** Free Play / Party losses in a row against bots (for the mercy tip). */
  static lossRun = 0;
  private trialResult: { stars: number; gained: number } | null = null;
  private bossPhase2 = false;
  /** The first Giant Hand warning aimed at a person explains itself (once per session). */
  private handExplained = false;

  constructor() {
    super('game');
  }

  init(data: GameData): void {
    this.initData = data;
    this.pauseUi = null;
    this.slots = data.slots;
    this.tally = { crumbs: data.slots.map(() => 0), kaiju: data.slots.map(() => 0), falls: data.slots.map(() => 0), deaths: data.slots.map(() => 0), powers: data.slots.map(() => 0) };
    this.difficulty = data.difficulty;
    const seed = data.seed ?? Math.floor(Math.random() * 1e9);
    this.species = this.slots.map((_, i) => data.species?.[i] ?? i);
    this.tables = data.tables?.length ? data.tables : null;
    this.colors = this.species.map(s => SPECIES[s].color);
    this.css = this.species.map(s => SPECIES[s].css);
    this.rounds = data.rounds ?? 5;
    this.mode = data.mode ?? 'classic';
    this.powerups = data.story ? false : data.powerups ?? POWERUPS.enabled;
    this.hazards = data.story ? true : data.hazards ?? true;
    this.world = new World({ players: this.species.map(s => ({ name: SPECIES[s].name, species: s })), kaijuPowers: getSettings().kaijuPowers, catchUp: getSettings().catchUp && !data.story && !data.gauntlet && !data.daily && !data.dessert && !data.trial, calmStart: data.story && (data.story.campaign ?? 'main') === 'main' && data.story.chapter < 2 && !data.story.spicy ? STORY_CALM : 0, seed, layouts: this.tables ?? undefined, target: this.rounds, mode: this.mode, powerups: this.powerups, hazards: this.hazards, mutator: data.story ? data.story.mutator ?? 'none' : data.dessert || data.daily ? 'none' : data.gauntlet ? data.mutator ?? 'none' : data.mutator, mutator2: data.story || data.dessert || data.daily || data.gauntlet || data.net ? 'none' : data.mutator2 });
    this.story = data.story;
    this.practice = null;
    this.callout = { first: false, recent: data.slots.map(() => []), streak: data.slots.map(() => 0), nemesis: data.slots.map(() => null) };
    this.replayBuf = new ReplayBuffer();
    this.replay = null;
    this.bots = this.slots.map((s, i) => (s.kind === 'bot' && this.mode !== 'practice' ? new BotBrain(i, data.botLevels?.[i] ?? this.difficulty, seed + i * 101) : null));
    this.net = data.net;
    this.netAcc = 0;
    this.netEvents = [];
    this.inbox = [];
    this.netNotice = '';
    this.setupNet(data, seed);
    this.acc = 0;
    this.t = 0;
    this.paused = false;
    this.parts = [];
    this.rings = [];
    this.feed = [];
    this.popups = [];
  }

  create(): void {
    this.resultBtns = []; // Phaser reuses this scene object: forget buttons from the last match
    this.perkUi = [];
    this.rampage = {};
    this.stompCoach = [];
    this.mine = { kos: 0, kaijus: 0, crumbs: 0, rounds: 0, parries: 0, out: {} };
    this.receipt = null;
    this.trialResult = null;
    this.bossPhase2 = false;
    this.coachStomp = (this.story?.chapter ?? 99) <= 2 || loadStats().kaijuForms < STOMP_COACH_UNTIL;
    clearTaps();
    this.baseG = this.add.graphics().setDepth(-2.5);
    this.tableG = this.add.graphics().setDepth(-1);
    this.twistG = this.add.graphics().setDepth(-0.9);
    this.twistChip = this.world.mutator !== 'none' ? withShadow(this.add.text(VIEW.w - 14, VIEW.h - 8, `⚡ ${twistName(this.world.mutator, this.world.mutator2)}`, display(15, '#8dd8ff', { strokeThickness: 4 })).setOrigin(1, 1).setDepth(6), 2) : null;
    this.dynG = this.add.graphics().setDepth(0);
    this.overG = this.add.graphics().setDepth(3.6);
    this.fxG = this.add.graphics().setDepth(3.8);
    this.hudG = this.add.graphics().setDepth(5);
    // 🎨 colour styles: yours on your seats (online: everyone's), and duplicate kaiju get told apart
    this.seatCols = seatColours(this.species, this.slots.map((_, i) => (this.net ? parseLook(this.initData.hats?.[i]).colour : this.isHuman(i) ? currentColour().id : undefined)));
    this.art = new ArtRenderer(this, this.baseG, this.tableG, { species: this.species, colors: this.colors, bosses: this.bossSeats(), colours: this.seatCols });
    this.art.setupTable(this.world.layout, this.world.players.map(p => ({ x: p.x, y: p.y, color: this.colors[p.id] })));
    this.hudIcons = this.species.map((sp, i) => (hasArt(`kaiju-${sp}`) ? fitInside(this.add.image(this.hudX(i) + 18, 40, kaijuKey(this, sp, this.seatCols[i])), 38, 42).setDepth(6) : null));
    this.hudHeld = this.slots.map((_, i) => (hasArt('cut-fork') ? this.add.image(this.hudX(i) + this.hudW - 40, 18, 'cut-fork').setDepth(6).setRotation(-0.35) : null));

    this.nameTexts = [];
    this.ffText = withShadow(this.add.text(640, 96, '⏩ FAST FORWARD ×' + FAST_FORWARD + '  ·  only bots left', display(22, '#8dd8ff', { strokeThickness: 5 })).setOrigin(0.5).setDepth(40).setVisible(false), 3);
    this.scoreTexts = this.slots.map(() => this.add.text(0, 0, '', display(15, '#ffe9c7', { strokeThickness: 3 })).setDepth(6));
    this.infoTexts = [];
    this.slots.forEach((s, i) => {
      const x = this.hudX(i), six = this.slots.length > 4;
      const ml = this.isHuman(i) && !this.net ? kaijuMastery(this.species[i]) : 0; // 🎖 mastery rewards: ⭐ at Lv 3, gold name at Lv 4
      this.nameTexts.push(withShadow(this.add.text(x + this.hudText, 7, (ml >= 3 ? '⭐' : '') + SPECIES[this.species[i]].name, display(six ? 17 : 20, ml >= 4 ? '#ffd24a' : this.css[i], { strokeThickness: 4 })).setDepth(6), 2));
      this.infoTexts.push(this.add.text(x + this.hudText, 53, slotLabel(s), body(six ? 12 : 13, '#d9c7b3', 800)).setDepth(6));
    });
    if (this.slots.length > 4) {
      this.roundText = this.add.text(14, 708, '', display(14, '#ffcf8a', { strokeThickness: 3 })).setOrigin(0, 1).setDepth(6);
    } else {
      this.roundText = this.add.text(VIEW.w - 16, 11, '', display(16, '#ffcf8a', { align: 'right', strokeThickness: 3 })).setOrigin(1, 0).setDepth(6);
      if (!isTouchDevice) this.add.text(VIEW.w - 16, 58, 'Esc / P pause', body(12, '#9c8a78', 700)).setOrigin(1, 0).setDepth(6);
    }
    this.feedTexts = [0, 1].map(i => this.add.text(VIEW.w / 2, 672 + i * 23, '', body(14, '#fff', 900, { stroke: '#140b05', strokeThickness: 4 })).setOrigin(0.5, 0).setDepth(6));
    playMusic('battle');
    this.hatImgs = this.world.players.map(() => this.add.image(0, 0, '__MISSING').setOrigin(0.5, 1).setDepth(2.6).setVisible(false));
    this.badgeTexts = this.world.players.map((_, i) => this.add.text(0, 0, `P${i + 1}`, display(16, '#ffffff', { strokeThickness: 4, stroke: '#000000', padding: { x: 4, y: 1 } })).setOrigin(0.5, 0).setDepth(3.9).setVisible(false));
    this.events.once('shutdown', () => { this.shareBtn?.remove(); this.shareBtn = null; });
    this.tagTexts = this.world.players.map((_, i) => withShadow(this.add.text(0, 0, SPECIES[this.species[i]].name, display(14, this.css[i], { strokeThickness: 4 })).setOrigin(0.5, 1).setDepth(3.9).setVisible(false), 2));
    this.modeText = withShadow(this.add.text(VIEW.w / 2, 96, '', display(26, '#ffe9c7', { strokeThickness: 5 })).setOrigin(0.5, 0).setDepth(6), 3);
    this.banner = withShadow(this.add.text(VIEW.w / 2, VIEW.h / 2 - 20, '', display(90, '#ffe9c7', { strokeThickness: 13, align: 'center', padding: { x: 10, y: 10 } })).setOrigin(0.5).setDepth(10), 8);
    this.bannerSub = withShadow(this.add.text(VIEW.w / 2, VIEW.h / 2 + 50, '', body(22, '#ffffff', 900, { stroke: '#2a1408', strokeThickness: 5, align: 'center' })).setOrigin(0.5).setDepth(10), 3);
    if (this.mode === 'practice' && this.initData.lab) {
      // 🥋 Move Lab: a hint, and the belly refills (see update)
      withShadow(this.add.text(VIEW.w / 2, 96, `🥋 MOVE LAB: ${SPECIES[this.species[0]].full}: STOMP to go KAIJU, then THROW / SWIPE for ${KITS[this.species[0]]?.power ?? 'your power'} · Esc to leave`, body(16, '#8dd8ff', 900, { stroke: '#140b05', strokeThickness: 4 })).setOrigin(0.5, 0).setDepth(8), 2);
    } else if (this.mode === 'practice') {
      const g = this.add.graphics().setDepth(9);
      const text = this.add.text(18, VIEW.h - 5, '', body(13, '#f1e4d2', 800, { lineSpacing: 1, wordWrap: { width: 420 } })).setOrigin(0, 1).setDepth(10);
      const p0 = this.world.players[0];
      this.practice = { done: PRACTICE_STEPS.map(() => false), moved: 0, lx: p0.x, ly: p0.y, text, g };
    }
    this.emoteBubbles = this.world.players.map(() => ({ text: this.add.text(0, 0, '', body(34, '#ffffff', 900, { backgroundColor: '#ffffffee', padding: { x: 8, y: 4 } })).setOrigin(0.5, 1).setDepth(8).setVisible(false), t: 0 }));
    this.emotePrev = this.world.players.map(() => false);
    this.emoteCd = this.world.players.map(() => 0);
    this.emoteNext = this.world.players.map((_, i) => i % EMOTES.length);
    this.attractWake = false;
    this.attractText = null;
    if (this.initData.attract) {
      this.attractText = withShadow(this.add.text(VIEW.w / 2, VIEW.h - 30, 'DEMO  ·  PRESS ANY KEY OR TAP TO PLAY', display(24, '#ffe9c7', { strokeThickness: 5 })).setOrigin(0.5, 1).setDepth(12), 3);
      this.tweens.add({ targets: this.attractText, alpha: { from: 1, to: 0.4 }, yoyo: true, repeat: -1, duration: 700 });
      this.input.on('pointerdown', () => { this.attractWake = true; });
      this.input.keyboard?.on('keydown', () => { this.attractWake = true; });
    }
    this.receiptG = this.add.graphics().setDepth(10);
    this.receiptText = this.add.text(36, VIEW.h - 84, '', body(getSettings().kidMode ? 18 : 15, '#f1e4d2', 800, { lineSpacing: 4, wordWrap: { width: getSettings().kidMode ? 380 : 330 } })).setOrigin(0, 1).setDepth(11);
    this.awardsText = withShadow(this.add.text(VIEW.w / 2 + 60, VIEW.h - 22, '', body(17, '#ffd24a', 900, { stroke: '#2a1408', strokeThickness: 4, align: 'center', wordWrap: { width: 900 } })).setOrigin(0.5, 1).setDepth(10), 2);
    this.handleEvents(this.world.drainEvents());
  }

  // ---------------------------------------------------------------- pause menu
  private bossSeats(): number[] {
    return this.story?.bosses ?? this.initData?.gauntlet?.bosses ?? this.initData?.dessert?.bosses ?? this.initData?.trial?.bosses ?? [];
  }

  /** Builds the GameData for a Gauntlet wave (you keep your kaiju; rivals and table are random). */
  /** fresh = a new run starting at this wave (wave 1, or a course checkpoint). */
  static gauntletWave(wave: number, pick: number, slot: Slot, fresh = wave === 1): GameData {
    const ws = waveSetup(wave);
    const pool = owned().kaiju.filter(k => k !== pick);
    const rivals: number[] = [];
    while (rivals.length < ws.rivals && pool.length) rivals.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    const tables = gauntletTables(owned().tables);
    return {
      slots: [slot, ...rivals.map((): Slot => ({ kind: 'bot', index: 0 }))],
      difficulty: 'normal',
      species: [pick, ...rivals],
      tables: [tables[Math.floor(Math.random() * tables.length)]],
      rounds: 1,
      botLevels: [null, ...ws.levels],
      mode: GAUNTLET.mode,
      powerups: GAUNTLET.powerups,
      gauntlet: { wave, bosses: ws.boss ? [1] : [], ...(fresh ? GameScene.runStart() : {}) },
      mutator: wave >= GAUNTLET.twistFrom && wave % 2 === 1 ? (() => { const m = enabledMutators(); return m[Math.floor(Math.random() * m.length)]?.id ?? 'none'; })() : 'none',
    };
  }
  /** A new run: 🛒 Pantry items (Lifeline = +1 life, Lunchbox = a free starting perk). */
  static runStart(): { lives: number; perks: string[]; startBest: number } {
    const free = GAUNTLET_PERKS.filter(p => !p.once);
    return { startBest: gauntletBest(), lives: GAUNTLET.lives + (shopOwned('lifeline') ? 1 : 0), perks: shopOwned('lunchbox') ? [free[Math.floor(Math.random() * free.length)].id] : [] };
  }

  private setPaused(on: boolean, focus = 0): void {
    this.paused = on;
    if (!on) { this.closePause(); return; }
    if (this.pauseUi) return;
    const dim = this.add.graphics().setDepth(11);
    dim.fillStyle(0x0d0805, 0.6); dim.fillRect(0, 0, VIEW.w, VIEW.h);
    const s = getSettings();
    const items: [string, () => void][] = [
      ['▶ RESUME', () => this.setPaused(false)],
      ['↻ RESTART', () => { this.closePause(); this.scene.restart(this.initData); }],
      [`🎵 MUSIC: ${s.music > 0 ? 'ON' : 'OFF'}`, () => { const m = getSettings().music; if (m > 0) GameScene.lastMusic = m; setSetting('music', m > 0 ? 0 : GameScene.lastMusic); this.closePause(); this.setPaused(true, 2); }],
      [`🔊 SOUND: ${s.volume > 0 ? 'ON' : 'OFF'}`, () => { const v = getSettings().volume; if (v > 0) GameScene.lastVolume = v; setSetting('volume', v > 0 ? 0 : GameScene.lastVolume); this.closePause(); this.setPaused(true, 3); }],
      ['✖ QUIT', () => { this.closePause(); this.leave(); }],
    ];
    const objs = items.map(([label, fn], i) => new Button(this, VIEW.w / 2, 300 + i * 74, { w: 360, h: 60, label, size: 24, onClick: fn }, 12));
    const nav = new FocusNav(objs, 1);
    nav.index = focus;
    this.pauseUi = { nav, objs, dim };
  }

  private closePause(): void {
    if (!this.pauseUi) return;
    for (const b of this.pauseUi.objs) { b.g.destroy(); b.label.destroy(); b.sub?.destroy(); b.zone.destroy(); }
    this.pauseUi.dim.destroy();
    this.pauseUi = null;
  }

  // ---------------------------------------------------------------- loop
  update(_time: number, delta: number): void {
    const dt = Math.min(0.1, delta / 1000);
    this.t += dt;

    if (this.initData.attract) {
      const any = this.attractWake || listDevices().some(d => { const i = readSlot(d); return i.throw || i.dash || i.start || i.swipe; });
      if (any || this.world.phase === 'matchEnd') { this.attractWake = false; clearTaps(); this.scene.start('title'); return; }
    }
    if (!this.perkUi.length && consumeTap('Escape')) {
      if (this.net || this.world.phase === 'matchEnd') { this.leave(); return; }
      if (!this.replay) this.setPaused(!this.paused);
    }
    if (consumeTap('KeyP') && this.world.phase !== 'matchEnd' && !this.net && !this.replay) this.setPaused(!this.paused);
    const anyStart = this.slots.some(s => s.kind === 'pad' && readSlot(s).start);
    if (anyStart && !this.padPrevStart && this.world.phase !== 'matchEnd' && !this.net && !this.replay) this.setPaused(!this.paused);
    if (this.pauseUi && this.pauseUi.nav.update(dt) === 'back') this.setPaused(false);
    if (this.story && this.world.phase === 'matchEnd' && (this.world.phaseT > 2.8 || consumeTap('Digit1') || consumeTap('Space') || consumeTap('Enter'))) {
      const me = this.world.players[0], won = this.world.winner === 0;
      this.scene.start('story', { result: { chapter: this.story.chapter, won, stars: won ? starsFor(this.world.round - me.score) : 0, spicy: !!this.story.spicy, campaign: this.story.campaign, myRounds: me.score, myKos: me.kos, myKaiju: this.tally.kaiju[0] ?? 0, myOut: Object.entries(this.mine.out).sort((a, b) => b[1] - a[1])[0]?.[0], receipt: this.receipt?.lines.slice(0, 2) } });
      return;
    }
    const cup = this.initData.cup;
    if (cup && this.net?.role !== 'guest' && this.world.phase === 'matchEnd' && (consumeTap('Digit1') || (anyStart && !this.padPrevStart))) {
      this.padPrevStart = anyStart;
      const games = cupGames(this.slots.length), pts = this.cupTotals();
      if (cup.game + 1 < games.length) {
        const g = games[cup.game + 1];
        const next = { game: cup.game + 1, points: pts };
        const net = this.net;
        if (net?.role === 'host') {
          const names = this.world.players.map(p => p.name);
          this.slots.forEach((sl, i) => { if (sl.kind === 'remote') net.host.send(sl.index, { t: 'start', species: this.species, names, seat: i, tables: this.tables, rounds: g.rounds, mode: g.mode, powerups: this.powerups, hazards: this.hazards, mutator: this.initData.mutator, hats: this.initData.hats, cup: next }); });
        }
        this.scene.restart({ ...this.initData, mode: g.mode, rounds: g.rounds, cup: next });
      } else if (!this.net) { const g0 = games[0]; sfx.go(); this.scene.restart({ ...this.initData, mode: g0.mode, rounds: g0.rounds, cup: { game: 0, points: [] } }); } // a new Cup
      else this.leave();
      return;
    }
    const ds = this.initData.dessert;
    if (ds && this.world.phase === 'matchEnd' && this.world.winner !== 0) {
      // lost a Dessert course: RETRY it (1 / Enter / Space / click) or go back to the map (Esc / MENU)
      if (this.world.phaseT > 0.8 && (consumeTap('Digit1') || consumeTap('Space') || consumeTap('Enter'))) { sfx.go(); this.scene.restart(GameScene.dessertData(ds.course, this.species[0])); return; }
      if (consumeTap('Escape')) { this.scene.start('story'); return; }
    } else if (ds && this.world.phase === 'matchEnd' && (this.world.phaseT > 3.5 || consumeTap('Digit1') || consumeTap('Space') || consumeTap('Enter'))) {
      const won = this.world.winner === 0;
      if (won && ds.course + 1 < COURSES.length) this.scene.restart(GameScene.dessertData(ds.course + 1, this.species[0]));
      else this.scene.start('story');
      return;
    }
    const gw = this.initData.gauntlet;
    this.updateResultButtons(dt);
    if (this.perkUi.length) { consumeTap('Escape'); for (const b of this.perkUi) b.update(dt); this.perkKeys?.(); return; }
    if (gw && this.world.phase === 'matchEnd' && this.world.winner !== 0 && (gw.lives ?? GAUNTLET.lives) > 1 && (this.world.phaseT > 2.4 || consumeTap('Space') || consumeTap('Enter') || consumeTap('Digit1'))) {
      this.retryGauntletWave(gw);
      return;
    }
    if (gw && this.world.phase === 'matchEnd' && this.world.winner === 0 && (this.world.phaseT > 1.6 || consumeTap('Space') || consumeTap('Enter'))) {
      if (!this.perkUi.length) this.offerPerks(gw);
      return;
    }
    // the run is over: give the summary (score + grade) a moment before a key can start a new run
    if (gw && this.world.phase === 'matchEnd' && this.world.winner !== 0 && this.world.phaseT > 1.5 && (consumeTap('Digit1') || consumeTap('Space') || consumeTap('Enter'))) { this.newGauntletRun(); return; }
    if (!this.story && !gw && !cup && this.world.phase === 'matchEnd' && this.net?.role !== 'guest' && (consumeTap('Digit1') || (anyStart && !this.padPrevStart) || (this.world.phaseT > 1.5 && (consumeTap('Enter') || consumeTap('Space'))))) {
      this.rematch();
      return;
    }
    const emoteTaps = { kb0: consumeTap(EMOTE_KEYS[0]), kb1: consumeTap(EMOTE_KEYS[1]), touch: consumeTap('TouchEmote') };
    if (this.net?.role === 'guest') { if (emoteTaps.kb0 || emoteTaps.kb1 || emoteTaps.touch) this.guestEmote = true; this.padPrevStart = anyStart; clearTaps(); this.syncTouchUi(); this.guestFrame(dt); return; }
    this.padPrevStart = anyStart;
    clearTaps();
    this.syncTouchUi();

    if (this.replay) { this.tickReplay(dt); return; }
    if (!this.paused) {
      const human: PlayerInput[] = this.slots.map((s, i) => {
        if (s.kind === 'bot') return { mx: 0, my: 0, throw: false, swipe: false, dash: false, stomp: false };
        if (s.kind === 'remote') { const ri = this.net?.role === 'host' ? this.net.host.inputOf(s.index) ?? NO_INPUT : NO_INPUT; return this.world.tw('mirror') ? { ...ri, mx: -ri.mx, my: -ri.my } : ri; }
        const inp: PlayerInput = readSlot(s);
        if (s.kind === 'touch' || (s.kind === 'local' && isTouchDevice)) this.touchAimAssist(i, inp);
        if (s.kind === 'kb' && (s.index === 0 ? emoteTaps.kb0 : emoteTaps.kb1)) inp.emote = true;
        if (s.kind === 'touch' && emoteTaps.touch) inp.emote = true;
        if (s.kind === 'local' && (emoteTaps.kb0 || emoteTaps.kb1 || emoteTaps.touch)) inp.emote = true;
        if (this.world.tw('mirror')) { inp.mx = -inp.mx; inp.my = -inp.my; }
        return inp;
      });
      this.checkEmotes(human, dt);
      const ff = this.onlyBotsLeft();
      this.ffText?.setVisible(ff).setAlpha(0.75 + 0.25 * Math.sin(this.time.now / 150));
      if (this.initData.lab) { const lp = this.world.players[0]; if (lp.alive && lp.kaijuT <= 0 && lp.meter < 100) lp.meter = 100; } // Move Lab: belly always full
      this.acc += dt * (this.world.tw('turbo') ? MUTATOR_RULES.turboSpeed : 1) * (ff ? FAST_FORWARD : 1) * ((window as unknown as { __kkSpeed?: number }).__kkSpeed ?? 1);
      let n = 0;
      while (this.acc >= STEP && n < 16 * ((window as unknown as { __kkSpeed?: number }).__kkSpeed ?? 1)) {
        const inputs = this.slots.map((_, i) => this.bots[i]?.decide(this.world, STEP) ?? human[i]);
        this.world.step(STEP, inputs);
        this.replayBuf.record(this.world, STEP);
        this.handleEvents(this.world.drainEvents());
        this.acc -= STEP;
        n++;
      }
      this.updateFx(dt);
      this.updateEmotes(dt);
      this.hostBroadcast(dt);
    }
    this.render();
  }

  /** True when people are playing but all of them are out until the next round, so only bots are left fighting. */
  private onlyBotsLeft(): boolean {
    const w = this.world;
    if (FAST_FORWARD <= 1 || w.phase !== 'play' || this.mode === 'practice') return false;
    const people = this.slots.map((sl, i) => (sl.kind === 'bot' ? -1 : i)).filter(i => i >= 0);
    if (!people.length) return false; // attract mode / all-bot matches play at normal speed
    return people.every(i => { const pl = w.players[i]; return pl && !pl.alive && !(pl.respawnT > 0); }) && w.alivePlayers().length > 1;
  }

  /** Gauntlet: after a cleared wave, pick 1 of 3 perks that last the rest of the run. */
  private offerPerks(gw: NonNullable<GameData['gauntlet']>): void {
    const lives = gw.lives ?? GAUNTLET.lives;
    const pool = GAUNTLET_PERKS.filter(pk => pk.id !== 'heart' || lives < GAUNTLET.maxLives).sort(() => Math.random() - 0.5).slice(0, 3);
    const go = (id: string) => {
      for (const b of this.perkUi) { b.g.destroy(); b.label.destroy(); b.sub?.destroy(); b.zone.destroy(); }
      this.perkUi = [];
      sfx.go();
      const next = GameScene.gauntletWave(gw.wave + 1, this.species[0], this.slots[0]);
      next.gauntlet = { ...next.gauntlet!, kos: (gw.kos ?? 0) + this.world.players[0].kos, perks: id === 'heart' ? gw.perks ?? [] : [...(gw.perks ?? []), id], lives: id === 'heart' ? lives + 1 : lives };
      this.scene.restart(next);
    };
    this.perkUi = pool.map((pk, k) => new Button(this, VIEW.w / 2 + (k - 1) * 340, 470, { w: 320, h: 96, label: pk.name, sub: pk.desc, size: 22, accent: 0x8dff6a, onClick: () => go(pk.id) }, 14));
    const keys = ['Digit1', 'Digit2', 'Digit3'];
    this.perkKeys = () => { const k = keys.findIndex(c => consumeTap(c)); if (k >= 0 && pool[k]) go(pool[k].id); };
    this.popup(VIEW.w / 2, 392, 'PICK A PERK FOR THE NEXT WAVE (1 / 2 / 3)', '#8dff6a', 22);
  }
  private perkKeys: (() => void) | null = null;

  /** Twists you can see: an icy sheen for Ice Rink, rubber bumpers for Bouncy Castle (others: the ⚡ chip + round-start banner). */
  private renderTwist(t: number): void {
    const g = this.twistG, wd = this.world, { x, y, w, h } = TABLE;
    g.clear();
    if (wd.tw('ice')) {
      g.fillStyle(0xbfeaff, 0.34); g.fillRoundedRect(x, y, w, h, 18);
      g.lineStyle(3, 0x8fd8ff, 0.9); g.strokeRoundedRect(x + 4, y + 4, w - 8, h - 8, 16); // frosty rim
      g.lineStyle(4, 0xffffff, 0.5);
      for (let k = 0; k < 16; k++) { const sx = x + 30 + ((k * 173 + t * 20) % (w - 120)), sy = y + 30 + ((k * 97) % (h - 120)); g.lineBetween(sx, sy, sx + 70, sy + 70); }
      g.fillStyle(0xffffff, 0.5);
      for (let k = 0; k < 18; k++) { const px = x + ((k * 197) % w), py = y + ((k * 113) % h), tw = 0.5 + 0.5 * Math.sin(t * 3 + k); g.fillCircle(px, py, 1.5 + tw * 2); }
    }
    if (wd.tw('bouncy')) {
      for (let k = 0; k < 4; k++) {
        const c = Math.floor(t * 4 + k) % 2 ? 0xff7ad9 : 0xffd24a;
        g.lineStyle(10, c, 0.75);
        if (k === 0) g.lineBetween(x + 10, y + 5, x + w - 10, y + 5);
        if (k === 1) g.lineBetween(x + 10, y + h - 5, x + w - 10, y + h - 5);
        if (k === 2) g.lineBetween(x + 5, y + 10, x + 5, y + h - 10);
        if (k === 3) g.lineBetween(x + w - 5, y + 10, x + w - 5, y + h - 10);
      }
    }
  }
  /** Lost a wave but still have a life: same wave again, perks kept. */
  private retryGauntletWave(gw: NonNullable<GameData['gauntlet']>): void {
    sfx.go();
    const again: GameData = { ...this.initData, gauntlet: { ...gw, kos: (gw.kos ?? 0) + this.world.players[0].kos, perks: gw.perks ?? [], lives: (gw.lives ?? GAUNTLET.lives) - 1 } }; // the same table and rivals
    this.scene.restart(again);
  }
  private newGauntletRun(): void { sfx.go(); this.scene.restart(GameScene.gauntletWave(1, this.species[0], this.slots[0])); }
  private resultBtns: Button[] = [];
  /** 🦖 STOMP coach: a sticky "BELLY FULL! Press STOMP" over humans until they learn it. */
  private stompCoach: Phaser.GameObjects.Text[] = [];
  private coachStomp = false;
  private stompKeyName(i: number): string {
    const s = this.slots[i];
    if (!s || s.kind === 'touch') return 'tap STOMP';
    if (s.kind === 'pad') return 'press Y';
    if (s.kind === 'local') return 'press E / Y';
    if (s.kind === 'kb') return s.index === 1 ? 'press .' : 'press E';
    return 'press STOMP';
  }
  private renderStompCoach(): void {
    const w = this.world;
    w.players.forEach((p, i) => {
      const show = this.coachStomp && this.isHuman(i) && p.alive && p.meter >= 100 && p.kaijuT <= 0 && w.phase === 'play';
      let tx = this.stompCoach[i];
      if (!show) { tx?.setVisible(false); return; }
      if (!tx) tx = this.stompCoach[i] = withShadow(this.add.text(0, 0, '', display(20, '#ffd24a', { strokeThickness: 5 })).setOrigin(0.5, 1).setDepth(7), 3);
      tx.setText(`BELLY FULL! ${this.stompKeyName(i).toUpperCase()} → KAIJU`);
      const bob = Math.abs(Math.sin(this.t * 5)) * 6, above = p.y - p.r - 34 - bob, half = tx.width / 2 + 12;
      // keep it on screen and clear of the top HUD: flip below the kaiju near the top edge
      tx.setPosition(Math.max(half, Math.min(VIEW.w - half, p.x)), above - tx.height < 96 ? p.y + p.r + 44 + tx.height - bob : above).setVisible(true);
    });
  }

  /** Results screens: clickable REMATCH / CONTINUE and MENU (keys still work). */
  private updateResultButtons(dt: number): void {
    const gLost = !!this.initData.gauntlet && this.world.winner !== 0 && (this.initData.gauntlet.lives ?? GAUNTLET.lives) <= 1;
    const show = this.world.phase === 'matchEnd' && !this.replay && !this.story && (!this.initData.gauntlet || gLost) && (!this.initData.dessert || this.world.winner !== 0) && !this.initData.attract && this.net?.role !== 'guest' && this.world.phaseT > 1;
    if (show && !this.resultBtns.length) {
      const cupNext = !!this.initData.cup;
      this.resultBtns = [
        new Button(this, VIEW.w / 2 - 130, VIEW.h - 96, { w: 230, h: 56, label: gLost ? '↻ NEW RUN' : this.initData.dessert || this.initData.trial ? '↻ RETRY' : cupNext ? (this.initData.cup!.game + 1 >= cupGames(this.slots.length).length ? '↻ NEW CUP' : '▶ CONTINUE') : '↻ REMATCH', size: 20, accent: 0xff9a3c, onClick: () => (gLost ? this.newGauntletRun() : injectTap('Digit1')) }, 12),
        new Button(this, VIEW.w / 2 + 130, VIEW.h - 96, { w: 230, h: 56, label: '☰ MENU', size: 20, onClick: () => this.leave() }, 12),
      ];
    }
    for (const b of this.resultBtns) b.update(dt);
  }

  // ---------------------------------------------------------------- online
  private setupNet(data: GameData, seed: number): void {
    const net = data.net;
    if (!net) return;
    if (net.role === 'host') {
      // a friend who drops out mid-match is taken over by a bot
      net.host.onGuestLeave = g => {
        const i = this.slots.findIndex(s => s.kind === 'remote' && s.index === g);
        if (i >= 0) { this.bots[i] = new BotBrain(i, this.difficulty, seed + i); this.feed.unshift({ text: `${this.world.players[i].name} left: a bot takes over`, color: '#ffffff', t: 4 }); }
      };
      net.host.onGuestJoin = () => {}; // no joining mid-match
    } else {
      net.guest.onMsg = (m: NetMsg) => {
        if (m.t === 'snap') this.inbox.push({ s: m.s, ev: m.ev });
        if (m.t === 'start') {
          const slots = m.species.map((_, i) => (i === m.seat ? { kind: 'local' as const, index: 0 } : { kind: 'remote' as const, index: i }));
          this.scene.restart({ slots, difficulty: this.difficulty, species: m.species, tables: m.tables, rounds: m.rounds, mode: m.mode as GameMode | undefined, powerups: m.powerups, hazards: m.hazards, mutator: m.mutator as Mutator | undefined, hats: m.hats, cup: m.cup, net: { role: 'guest', guest: net.guest, seat: m.seat } });
        }
      };
      net.guest.onClosed = reason => { this.netNotice = reason; this.time.delayedCall(2500, () => this.scene.start('menu', { difficulty: this.difficulty })); };
    }
  }

  private leave(): void {
    if (this.story) { this.scene.start('story', { campaign: this.story.campaign }); return; }
    if (this.initData.gauntlet || this.initData.daily) { this.scene.start('title'); return; }
    if (this.mode === 'practice') { this.scene.start(this.initData.from ?? 'help', this.initData.lab ? { show: this.species[0] } : undefined); return; }
    if (this.initData.dessert) { this.scene.start('story'); return; }
    if (this.initData.trial) { this.scene.start('trials'); return; }
    if (this.net?.role === 'host') this.net.host.close();
    if (this.net?.role === 'guest') this.net.guest.close();
    if (this.net) { this.scene.start('title'); return; }
    this.scene.start('menu', { slots: this.net ? [] : this.slots, difficulty: this.difficulty, species: this.net ? [] : this.species, botLevels: this.initData.botLevels ?? undefined, tables: this.tables, rounds: this.rounds, mode: this.mode, powerups: this.powerups, hazards: this.hazards, mutator: this.initData.mutator, party: this.initData.party || this.mode !== 'classic' || !!this.initData.cup });
  }

  private rematch(): void {
    const data: GameData = { slots: this.slots, difficulty: this.difficulty, species: this.species, tables: this.tables, net: this.net, rounds: this.rounds, mode: this.mode, powerups: this.powerups, hazards: this.hazards, daily: this.initData.daily, botLevels: this.initData.botLevels, mutator: this.initData.mutator, mutator2: this.initData.mutator2, trial: this.initData.trial, hats: this.initData.hats };
    const net = this.net;
    if (net?.role === 'host') {
      const names = this.world.players.map(p => p.name);
      this.slots.forEach((sl, i) => { if (sl.kind === 'remote') net.host.send(sl.index, { t: 'start', species: this.species, names, seat: i, tables: this.tables, rounds: this.rounds, mode: this.mode, powerups: this.powerups, hazards: this.hazards, mutator: this.initData.mutator, hats: this.initData.hats }); });
    }
    this.scene.restart(data);
  }

  /** Host: send the game state to friends ~20 times a second. */
  private hostBroadcast(dt: number): void {
    if (this.net?.role !== 'host') return;
    this.netAcc += dt;
    // ~20 updates/s; ~13/s when a friend is on the (slower) backup route so it never falls behind
    if (this.netAcc < (this.net.host.hasBackupGuests ? 0.075 : 0.05)) return;
    this.netAcc = 0;
    this.net.host.broadcast({ t: 'snap', s: makeSnapshot(this.world), ev: this.netEvents.splice(0, 60) });
    this.netEvents = [];
  }

  /** Guest: send my input, show the host's game. */
  private guestFrame(dt: number): void {
    if (this.net?.role !== 'guest') return;
    const seat = this.net.seat;
    const inp: PlayerInput = readSlot({ kind: 'local', index: 0 });
    if (isTouchDevice) this.touchAimAssist(seat, inp);
    if (this.guestEmote) inp.emote = true;
    this.netAcc += dt;
    if (this.netAcc >= (this.net.guest.route === 'backup' ? 1 / 15 : 1 / 30)) { this.netAcc = 0; this.net.guest.send({ t: 'in', i: inp }); this.guestEmote = false; }
    this.updateEmotes(dt);
    if (this.inbox.length) {
      for (const m of this.inbox.splice(0)) {
        if (applySnapshot(this.world, m.s)) this.art.setupTable(this.world.layout, this.world.players.map(p => ({ x: p.x, y: p.y, color: this.colors[p.id] })));
        this.handleEvents(m.ev.filter(e => e.type !== 'roundStart'));
      }
    } else {
      extrapolate(this.world, dt);
    }
    this.updateFx(dt);
    this.render();
  }

  // ---------------------------------------------------------------- touch
  private syncTouchUi(): void {
    const ti = this.slots.findIndex(s => s.kind === 'touch' || (s.kind === 'local' && isTouchDevice));
    if (this.world.phase === 'matchEnd') { setTouchMode(this.story ? 'watch' : 'end'); return; }
    setTouchMode(ti >= 0 ? 'game' : 'watch');
    if (ti < 0) setTouchHud({ canPause: !this.net });
    if (ti >= 0) {
      const p = this.world.players[ti];
      setTouchHud({ stompReady: p.alive && p.meter >= 100 && p.kaijuT <= 0, armed: p.alive && p.holding !== null, canPause: !this.net });
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
    if (this.net?.role === 'host') this.netEvents.push(...events);
    const w = this.world;
    for (const e of events) {
      this.track(e);
      switch (e.type) {
        case 'roundStart':
          this.replayBuf.reset();
          if (e.round === 1 && this.bossSeats().length) this.time.delayedCall(150, () => this.bossCard());
          if (w.mutator !== 'none') { this.time.delayedCall(e.round === 1 && this.bossSeats().length ? 1600 : 250, () => this.popup(VIEW.w / 2, TABLE.y + 70, `⚡ TWIST: ${twistName(w.mutator, w.mutator2)}`, '#8dd8ff', 24)); }
          this.tip = getSettings().tips && !this.initData.attract && !this.practice ? randomTip(this.mode, w.layout, w.mutator === 'ice') : '';
          this.art.setupTable(w.layout, this.world.players.map(p => ({ x: p.x, y: p.y, color: this.colors[p.id] })));
          for (const b of this.bossSeats()) if (w.players[b]) w.players[b].meter = this.story?.bossBelly ?? 100;
          // 👑 Story boss PHASE 2: once a boss has lost a round it comes back faster and shielded (each later round)
          if (this.story) for (const b of this.bossSeats()) { const bp = w.players[b]; if (bp && e.round > 1 && bp.score < e.round - 1) { bp.speedT = Math.max(bp.speedT, 60); bp.shieldT = Math.max(bp.shieldT, 60); if (!this.bossPhase2) { this.bossPhase2 = true; this.time.delayedCall(400, () => { sfx.roar(this.species[b]); this.shake(0.01, 300); this.popup(VIEW.w / 2, TABLE.y + 110, `👑 PHASE 2! ${bp.name} is FURIOUS: faster, and shielded from the first hit!`, '#ff8a7a', 24); }); } } }
          for (const pk of this.initData.gauntlet?.perks ?? []) GAUNTLET_PERKS.find(q => q.id === pk)?.apply(w.players[0]); // bosses can go KAIJU straight away
          if (this.story?.helping && w.players[0]) { w.players[0].meter = 100; w.players[0].shieldT = Math.max(w.players[0].shieldT, 60); } // 🍀 helping hand: start ready to go KAIJU, with a shield
          if (this.story?.spicy) w.players.forEach((p, k) => { if (k > 0 && p.meter < 100) p.meter = SPICY_START_BELLY; }); // 🌶️ rivals start half-full
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
        case 'dash': sfx.dash(); if (this.isHuman(e.id) && !this.net && kaijuMastery(this.species[e.id]) >= 2) { const dp = this.world.players[e.id]; this.burst(dp.x, dp.y, 0xffe27a, 10, 160, 0.45); } break;
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
          rumble(this.mySlot(e.id), 'kaiju');
          sfx.roar(this.species[e.id]);
          this.shake(0.012, 350);
          this.popup(e.x, e.y - 60, 'KAIJU!', this.css[e.id], 40);
          this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 160, color: this.colors[e.id] });
          { const kit = this.world.players[e.id]?.kit; if (kit && this.isHuman(e.id)) this.popup(e.x, e.y - 22, `THROW / SWIPE: ${kit.power.toUpperCase()}`, '#ffffff', 18); }
          break;
        case 'stomp':
          sfx.stomp();
          this.shake(0.005, 120);
          this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: e.r, color: 0xffffff });
          this.burst(e.x, e.y, 0x8a5a32, 10, 200, 0.4);
          break;
        case 'shrink': { sfx.shrink(); const sp = this.world.players[e.id]; if (sp && this.slots.some((_, i) => i !== e.id && this.isHuman(i))) this.popup(sp.x, sp.y - 40, '💫 DIZZY! HIT IT NOW!', '#ffffff', 20); break; }
        case 'power': {
          const kit = this.world.players[e.id]?.kit, col = this.colors[e.id];
          sfx.stomp();
          this.shake(0.006, 140);
          if (kit) this.popup(e.x, e.y - 70, kit.power.toUpperCase() + '!', this.css[e.id], 26);
          if (e.kind === 'burst' || e.kind === 'zone' || e.kind === 'blink') this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: Math.max(60, e.r), color: col });
          if (e.kind === 'cone') for (let k = -2; k <= 2; k++) this.rings.push({ x: e.x + Math.cos(e.angle + k * 0.18) * e.r * 0.6, y: e.y + Math.sin(e.angle + k * 0.18) * e.r * 0.6, r: 0, t: 0, max: 34, color: col });
          this.burst(e.x, e.y, col, 14, 260, 0.45);
          break;
        }
        case 'parry': sfx.clink(); this.shake(0.004, 100); this.popup(e.x, e.y - 30, '⚔ PARRY!', this.css[e.id], 24); this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 50, color: 0xffffff }); break;
        case 'spoonGrab': sfx.pickup(); this.popup(e.x, e.y - 40, '🥄 GOT IT!', this.css[e.id], 22); this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 60, color: 0xffd24a }); break;
        case 'spoonDrop': this.popup(e.x, e.y - 30, '🥄 DROPPED!', '#ffd24a', 22); break;
        case 'frenzy': sfx.meterFull(); this.popup(VIEW.w / 2, 150, '🍽 FEEDING FRENZY! Bellies are filling up…', '#ffd24a', 26); break;
        case 'minePop': sfx.bump(); this.shake(0.005, 120); this.burst(e.x, e.y, 0x4a6aff, 16, 240, 0.45); this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 70, color: 0x4a6aff }); break;
        case 'stunned': break;
        case 'ko':
          this.onKO(e);
          if (this.net?.role !== 'guest' || e.id === this.net.seat) rumble(this.mySlot(e.id), 'ko');
          if (e.by !== null && e.by !== e.id) rumble(this.mySlot(e.by), 'hit');
          this.announce(e);
          this.replayBuf.markKo();
          if (e.by !== null && e.by !== e.id && this.net?.role !== 'guest' && this.slots[e.by]?.kind === 'bot' && Math.random() < BOT_EMOTE_CHANCE) this.time.delayedCall(250, () => this.handleEvents([{ type: 'emote', id: e.by!, n: Math.floor(Math.random() * EMOTES.length) }]));
          if (this.initData.gauntlet && e.id === 0 && w.phase === 'play') w.endRound(w.alivePlayers().slice(0, 1)); // one life: the wave is lost
          break;
        case 'handWarn': sfx.handWarn(); if (!this.handExplained && e.target !== null && this.isHuman(e.target)) { this.handExplained = true; const tp = this.world.players[e.target]; this.popup(tp.x, tp.y - 60, '✋ THE GIANT HAND WANTS YOU: it grabs the fullest belly! Move or STOMP!', '#ffb347', 20); } break;
        case 'handSweep': sfx.handSweep(); this.shake(0.006, 400); break;
        case 'windWarn': sfx.windWarn(); this.popup(640, 140, 'GUST INCOMING!', '#ffffff', 26); break;
        case 'windGust': sfx.windGust(); this.shake(0.003, 1300); break;
        case 'cleaverWarn': sfx.cleaverWarn(); break;
        case 'burnerWarn': sfx.burnerWarn(); break;
        case 'spatulaWarn': sfx.cleaverWarn(); break;
        case 'spatulaFlip': this.rumbleAll('blast'); sfx.cleaverChop(); this.shake(0.012, 240); this.burst(e.x, e.y, 0xf4c27a, 26, 300, 0.6); break;
        case 'cheeseWarn': sfx.toasterWarn(); break;
        case 'cheeseSplat': sfx.bump(); this.shake(0.004, 140); this.burst(e.x, e.y, 0xffd24a, 22, 240, 0.5); this.burst(e.x, e.y, 0xfff1a0, 10, 160, 0.4); break;
        case 'blenderWarn': sfx.burnerWarn(); this.popup(640, 300, 'BLENDER WARMING UP!', '#ff8a7a', 24); break;
        case 'blenderSpin': sfx.windGust(); this.shake(0.004, 2400); break;
        case 'bumper': sfx.boing(); this.burst(e.x, e.y, 0xff4fa0, 10, 200, 0.35); break;
        case 'toasterWarn': sfx.toasterWarn(); break;
        case 'toasterPop': sfx.toasterPop(); this.burst(e.x, e.y, 0xe8b060, 10, 160, 0.4); break;
        case 'toastBreak': sfx.thwock(); this.burst(e.x, e.y, 0xe0a050, 18, 220, 0.5, 200); break;
        case 'burnerFlare': sfx.burnerFlare(); this.shake(0.006, 300); this.burst(e.x, e.y, 0xff7a1a, 30, 260, 0.6); this.burst(e.x, e.y, 0xffd040, 16, 180, 0.5); break;
        case 'cleaverChop': this.rumbleAll('blast'); sfx.cleaverChop(); this.shake(0.014, 260); this.burst(e.x, 380, 0x8a5a32, 30, 300, 0.6); break;
        case 'powerSpawn': sfx.spawn(); this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 40, color: POWER_DEFS[e.kind].color }); break;
        case 'powerup':
          sfx.meterFull();
          this.popup(e.x, e.y - 40, POWER_DEFS[e.kind].name + '!', POWER_DEFS[e.kind].css, 20);
          this.burst(e.x, e.y, POWER_DEFS[e.kind].color, 18, 200, 0.5);
          break;
        case 'shieldPop':
          sfx.clink();
          this.popup(e.x, e.y - 40, 'BLOCKED!', '#ffd24a', 20);
          this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 70, color: 0xffd24a });
          this.burst(e.x, e.y, 0xf2c418, 16, 220, 0.4);
          break;
        case 'emote': this.showEmote(e.id, e.n); break;
        case 'respawn': sfx.spawn(); this.burst(e.x, e.y, this.colors[e.id], 20, 180, 0.5); this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 60, color: this.colors[e.id] }); break;
        case 'hotGive':
          sfx.steal();
          this.popup(e.x, e.y - 50, e.from === null ? 'HOT DUMPLING!' : 'TAG! HOT!', '#ff9a3c', 22);
          break;
        case 'hotBoom':
          this.rumbleAll('blast');
          sfx.burnerFlare();
          this.shake(0.016, 380);
          this.burst(e.x, e.y, 0xfff1d6, 40, 420, 0.8);
          this.burst(e.x, e.y, 0xff7a1a, 30, 320, 0.7);
          this.rings.push({ x: e.x, y: e.y, r: 0, t: 0, max: 140, color: 0xffd24a });
          break;
        case 'spawnCutlery': sfx.spawn(); this.burst(e.x, e.y, 0xffffff, 14, 140, 0.5); break;
        case 'roundEnd':
          sfx.roundWin();
          this.maybeReplay();
          break;
        case 'matchEnd':
          sfx.matchWin();
          this.celebrate(e.winner);
          break;
      }
    }
  }

  /** Lifetime stats + achievements for the humans on this device. */
  private isHuman(id: number | null): boolean {
    const s = id === null ? undefined : this.slots[id];
    return !!s && s.kind !== 'bot' && s.kind !== 'remote';
  }

  /** Fun end-of-match awards (only ones somebody actually earned). EASY TO CUSTOMISE: edit the list. */
  private awards(): string {
    const w = this.world, T = this.tally, name = (i: number) => w.players[i].name;
    const top = (a: number[], min = 1) => { const m = Math.max(...a); return m >= min && a.filter(v => v === m).length === 1 ? a.indexOf(m) : -1; };
    const low = (a: number[]) => { const m = Math.min(...a); return a.filter(v => v === m).length === 1 ? a.indexOf(m) : -1; };
    const list: [string, number, string][] = [
      ['🍴 Most KOs', top(w.players.map(p => p.kos)), ''],
      ['🍪 Crumb Monster', top(T.crumbs, 5), ' crumbs'],
      ['🦖 Kaiju Lover', top(T.kaiju, 2), '× KAIJU'],
      ['🧈 Butterfingers', top(T.falls, 2), ' falls'],
      ['🛡️ Survivor', w.players.length > 2 ? low(T.deaths) : -1, ''],
      ['🌶️ Condiment Hoarder', top(T.powers, 2), ' power-ups'],
    ];
    const vals: Record<string, number[]> = { '🍴 Most KOs': w.players.map(p => p.kos), '🍪 Crumb Monster': T.crumbs, '🦖 Kaiju Lover': T.kaiju, '🧈 Butterfingers': T.falls, '🌶️ Condiment Hoarder': T.powers };
    const got = list.filter(([, i]) => i >= 0).map(([title, i, unit]) => `${title}: ${name(i)}${unit && vals[title] ? ` (${vals[title][i]}${unit})` : ''}`);
    return got.slice(0, 4).join('   ·   ');
  }

  /** A human won: the winner is human, or (Team Feast) a human is on the winning team. */
  private humanWon(winner: number | null): boolean {
    if (winner === null) return false;
    if (this.mode !== 'teams') return this.isHuman(winner);
    const tm = this.world.players[winner].team;
    return this.slots.some((_, i) => this.isHuman(i) && this.world.players[i].team === tm);
  }

  // ---------------------------------------------------------------- share
  /** A small 📸 SHARE button on the results screen: shares (phones) or downloads (computers) a screenshot. */
  private updateShareButton(): void {
    const show = this.world.phase === 'matchEnd' && !this.replay;
    if (show && !this.shareBtn) {
      const b = document.createElement('button');
      b.textContent = '📸 SHARE';
      b.style.cssText = 'position:fixed;left:calc(1.5vmin + env(safe-area-inset-left));bottom:calc(1.5vmin + env(safe-area-inset-bottom));z-index:30;padding:1.4vmin 2.2vmin;border-radius:2vmin;border:3px solid #ffd24a;background:#2a1408e6;color:#ffe9c7;font:900 2.4vmin Nunito,sans-serif;cursor:pointer';
      b.addEventListener('click', () => this.share());
      document.body.appendChild(b);
      this.shareBtn = b;
    } else if (!show && this.shareBtn) { this.shareBtn.remove(); this.shareBtn = null; }
  }

  private share(): void {
    this.game.renderer.snapshot(img => {
      const c = document.createElement('canvas'), el = img as HTMLImageElement;
      c.width = el.width; c.height = el.height;
      c.getContext('2d')!.drawImage(el, 0, 0);
      c.toBlob(async blob => {
        if (!blob) return;
        const file = new File([blob], 'kitchen-kaiju.png', { type: 'image/png' });
        const nav = navigator as Navigator & { canShare?: (d: object) => boolean };
        try {
          if (nav.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: 'Kitchen Kaiju', text: 'Dinner is served 🍴 #KitchenKaiju' }); return; }
        } catch { /* cancelled */ }
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = 'kitchen-kaiju.png'; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        this.popup(VIEW.w / 2, 640, 'SCREENSHOT SAVED', '#8dff6a', 18);
      }, 'image/png');
    });
  }

  // ---------------------------------------------------------------- instant replay
  private maybeReplay(): void {
    if (!REPLAY.enabled || !getSettings().replays || this.net || this.mode === 'crumbRush' || this.mode === 'practice' || this.world.players.length < REPLAY.minPlayers) return;
    const frames = this.replayBuf.clip();
    if (!frames.length) return;
    const world = new World({ players: this.world.players.map(p => ({ name: p.name })), mode: this.mode, layout: this.world.layoutIndex, target: this.world.opts.target });
    const label = withShadow(this.add.text(VIEW.w / 2, 104, '⏪ INSTANT REPLAY', display(30, '#ffffff', { strokeThickness: 6 })).setOrigin(0.5, 0).setDepth(12), 3);
    this.add.tween({ targets: label, alpha: { from: 1, to: 0.55 }, yoyo: true, repeat: -1, duration: 420 });
    this.replay = { frames, t: frames[0].t, world, label };
  }

  private tickReplay(dt: number): void {
    const r = this.replay!;
    const skip = consumeTap('Space') || consumeTap('Enter') || consumeTap('Digit1') || this.slots.some(s => s.kind !== 'bot' && s.kind !== 'remote' && readSlot(s).throw);
    r.t += dt * REPLAY.speed;
    const f = r.frames.find(x => x.t >= r.t) ?? r.frames[r.frames.length - 1];
    applySnapshot(r.world, f.s);
    const live = this.world;
    this.world = r.world;
    this.updateFx(dt * REPLAY.speed);
    this.render();
    this.world = live;
    if (skip || r.t >= r.frames[r.frames.length - 1].t) this.endReplay();
  }

  private endReplay(): void {
    if (!this.replay) return;
    this.replay.label.destroy();
    this.replay = null;
    clearTaps();
  }

  /** The slot of seat `id` if it is played on this device (online guests: only their own seat). */
  private mySlot(id: number): Slot | undefined {
    if (this.net?.role === 'guest') return id === this.net.seat ? { kind: 'local', index: 0 } : undefined;
    const s = this.slots[id];
    return s && s.kind !== 'bot' && s.kind !== 'remote' ? s : undefined;
  }

  private rumbleAll(kind: 'blast'): void {
    this.slots.forEach((_, i) => { if (this.world.players[i]?.alive) rumble(this.mySlot(i), kind); });
  }

  // ---------------------------------------------------------------- celebrations
  /** Winner's kaiju (KAIJU-mode art) slides in big beside the results, with confetti. */
  private celebrate(winner: number): void {
    if (this.initData.attract || this.mode === 'practice') return;
    const sp = this.species[winner], key = kaijuKey(this, sp, this.seatCols[winner], hasArt(`kaiju-${sp}-rage`));
    if (hasArt(key)) {
      const img = fitInside(this.add.image(VIEW.w + 200, 470, key), 280, 280).setDepth(9.5);
      this.tweens.add({ targets: img, x: VIEW.w - 170, duration: 650, ease: 'Back.easeOut', delay: 300 });
      this.tweens.add({ targets: img, angle: { from: -4, to: 4 }, yoyo: true, repeat: -1, duration: 900, ease: 'Sine.easeInOut', delay: 950 });
    }
    if (getSettings().reducedFx) return;
    const cols = [this.colors[winner], 0xffd24a, 0xffffff, 0xff7ad9, 0x4fd1ff];
    for (let k = 0; k < 90; k++) {
      this.parts.push({ x: Math.random() * VIEW.w, y: -20 - Math.random() * 200, vx: (Math.random() - 0.5) * 80, vy: 120 + Math.random() * 160, life: 3.5, max: 3.5, color: cols[k % cols.length], size: 3 + Math.random() * 3, grav: 30 });
    }
  }

  /** A big intro card for boss fights. */
  private bossCard(): void {
    const b = this.bossSeats()[0];
    if (b === undefined) return;
    const sp = this.species[b];
    const t = withShadow(this.add.text(VIEW.w / 2, 205, `👑 BOSS: ${SPECIES[sp].full.toUpperCase()}`, display(40, this.css[b], { strokeThickness: 7 })).setOrigin(0.5).setDepth(11), 4);
    popIn(this, t, 1.6, 420);
    sfx.kaiju();
    this.tweens.add({ targets: t, alpha: 0, delay: 1700, duration: 400, onComplete: () => t.destroy() });
  }

  // ---------------------------------------------------------------- announcer
  private announce(e: Extract<GameEvent, { type: 'ko' }>): void {
    if (!CALLOUTS.enabled || this.mode === 'practice' || this.initData.attract) return;
    const C = this.callout, by = e.by;
    C.streak[e.id] = 0;
    if (by !== null) C.nemesis[e.id] = by;
    if (by === null || by === e.id) return;
    const words: string[] = [];
    if (!C.first) { C.first = true; words.push(CALLOUTS.first); }
    const now = this.t, list = (C.recent[by] = [...(C.recent[by] ?? []).filter(t => now - t < CALLOUTS.multiWindow), now]);
    if (list.length >= 2) words.push(CALLOUTS.multi[Math.min(list.length, CALLOUTS.multi.length - 1)]);
    C.streak[by] = (C.streak[by] ?? 0) + 1;
    if (CALLOUTS.streak[C.streak[by]]) words.push(CALLOUTS.streak[C.streak[by]]);
    if (C.nemesis[by] === e.id) { words.push(CALLOUTS.revenge); C.nemesis[by] = null; }
    const word = words[words.length - 1];
    if (!word) return;
    const p = this.world.players[by];
    this.time.delayedCall(120, () => { this.popup(p.x, p.y - 70, word, this.css[by], 30); if (words.length > 1 || list.length >= 2) sfx.meterFull(); });
  }

  // ---------------------------------------------------------------- emotes
  /** Rising edge of each player's emote button (local or remote) → an 'emote' event (also sent to guests). */
  private checkEmotes(inputs: PlayerInput[], dt: number): void {
    inputs.forEach((inp, i) => {
      this.emoteCd[i] = Math.max(0, (this.emoteCd[i] ?? 0) - dt);
      const on = !!inp.emote;
      if (on && !this.emotePrev[i] && this.emoteCd[i] <= 0 && this.world.players[i]?.alive) {
        this.emoteCd[i] = EMOTE_COOLDOWN;
        const n = this.emoteNext[i];
        this.emoteNext[i] = (n + 1) % EMOTES.length;
        this.handleEvents([{ type: 'emote', id: i, n }]);
      }
      this.emotePrev[i] = on;
    });
  }

  private showEmote(id: number, n: number): void {
    const b = this.emoteBubbles[id];
    if (!b) return;
    b.text.setText(EMOTES[n % EMOTES.length]).setVisible(true);
    b.t = EMOTE_TIME;
    popIn(this, b.text, 1.5, 220);
    sfx.chirp(this.species[id]);
  }

  private updateEmotes(dt: number): void {
    this.emoteBubbles.forEach((b, i) => {
      if (b.t <= 0) return;
      b.t -= dt;
      const p = this.world.players[i];
      if (!p.alive) b.t = 0;
      b.text.setPosition(p.x, p.y - p.r * (p.kaijuT > 0 ? 3.4 : 2.6) - 10).setAlpha(Math.min(1, b.t * 3)).setVisible(b.t > 0);
    });
  }

  /** Party Cup points including the match that just finished. */
  private cupTotals(): number[] {
    const cup = this.initData.cup;
    if (!cup) return [];
    const add = this.cupAdd();
    return this.world.players.map((_, i) => (cup.points[i] ?? 0) + add[i]);
  }
  /** Points this game adds (×FINAL_MULTIPLIER in the last game). */
  private cupAdd(): number[] {
    const cup = this.initData.cup;
    if (!cup || this.world.phase !== 'matchEnd') return this.world.players.map(() => 0);
    const last = cup.game + 1 >= cupGames(this.world.players.length).length;
    return placePoints(this.world.players, this.world.mode === 'teams').map(v => v * (last ? FINAL_MULTIPLIER : 1));
  }

  /** Static helper: GameData for a 🍰 Dessert Course fight (you play your Story pick). */
  static dessertData(course: number, pick: number): GameData {
    const c = COURSES[course], rivals = chapterRivals(c, pick);
    return {
      slots: [{ kind: 'local', index: 0 }, ...rivals.map((): Slot => ({ kind: 'bot', index: 0 }))], difficulty: 'normal',
      species: [pick, ...rivals.map(r => r.species)], tables: [c.table], rounds: c.rounds, botLevels: [null, ...rivals.map(r => r.level)],
      powerups: false, dessert: { course, bosses: rivals.map((r, k) => (r.boss ? k + 1 : -1)).filter(k => k > 0) },
    };
  }

  /** Static helper: GameData for today's Daily Challenge. */
  /** 🎯 GameData for a Trial. */
  static trialData(id: string): GameData {
    const t = TRIALS.find(q => q.id === id) ?? TRIALS[0];
    return {
      slots: [{ kind: 'local', index: 0 }, ...t.rivals.map((): Slot => ({ kind: 'bot', index: 0 }))], difficulty: 'normal',
      species: [t.you, ...t.rivals.map(r => r.species)], tables: [t.table], rounds: t.rounds, botLevels: [null, ...t.rivals.map(r => r.level)],
      mode: 'classic', powerups: true, mutator: t.mutator ?? 'none', mutator2: t.mutator2 ?? 'none',
      trial: { id: t.id, bosses: t.rivals.map((r, k) => (r.boss ? k + 1 : -1)).filter(k => k > 0) },
    };
  }

  /** 🥋 Move Lab: you + 2 dummies, belly always full, so you can try your KAIJU power as often as you like. */
  static labData(species: number): GameData {
    const d = GameScene.practiceData(species);
    return { ...d, lab: true, from: 'gallery' };
  }

  static dailyData(): GameData {
    const d = dailySetup();
    return {
      slots: [{ kind: 'local', index: 0 }, ...d.rivals.map((): Slot => ({ kind: 'bot', index: 0 }))], difficulty: 'normal',
      species: [d.you, ...d.rivals], tables: [d.table], rounds: DAILY.rounds, botLevels: [null, ...DAILY.levels], mode: d.mode, powerups: DAILY.powerups, daily: { date: d.date },
    };
  }

  /** Static helper: GameData for Practice (you vs a dummy). */
  static practiceData(pick: number): GameData {
    return { slots: [{ kind: 'local', index: 0 }, { kind: 'bot', index: 0 }], difficulty: 'easy', species: [pick, pick === PRACTICE.dummySpecies ? (pick + 1) % SPECIES.length : PRACTICE.dummySpecies], tables: [PRACTICE.table], rounds: 99, mode: 'practice', powerups: PRACTICE.powerups, hazards: PRACTICE.hazards };
  }

  private updatePractice(): void {
    const P0 = this.practice;
    if (!P0) return;
    const p = this.world.players[0];
    if (p.alive) { P0.moved += Math.hypot(p.x - P0.lx, p.y - P0.ly); P0.lx = p.x; P0.ly = p.y; }
    PRACTICE_STEPS.forEach((st, i) => { if (!P0.done[i] && st.done({ type: 'go' }, P0.moved)) this.tick(i); });
    const next = P0.done.indexOf(false);
    const all = next < 0, doneN = P0.done.filter(Boolean).length;
    // two short lines in the strip below the table (TABLE ends at y 670), so it never covers the action
    P0.text.setText(all ? `PRACTICE ${doneN}/${PRACTICE_STEPS.length}  🎉 All done!\nEsc → pause → QUIT` : `PRACTICE ${doneN}/${PRACTICE_STEPS.length}  👉 ${PRACTICE_STEPS[next].text}\n${PRACTICE_STEPS[next].keys}`);
    const bx = 10, by = TABLE.y + TABLE.h + 3, bw = Math.min(440, P0.text.width + 16), bh = VIEW.h - by - 3;
    P0.g.clear(); P0.g.fillStyle(0x0d0805, 0.78); P0.g.fillRoundedRect(bx, by, bw, bh, 10);
    P0.g.lineStyle(2, all ? 0x8dff6a : 0xffb347, 1); P0.g.strokeRoundedRect(bx, by, bw, bh, 10);
  }

  private tick(i: number): void {
    if (!this.practice || this.practice.done[i]) return;
    this.practice.done[i] = true;
    sfx.meterFull();
    const p = this.world.players[0];
    this.popup(p.x, p.y - 50, '✔ ' + PRACTICE_STEPS[i].text.toUpperCase(), '#8dff6a', 18);
    if (this.practice.done.every(Boolean)) this.time.delayedCall(900, () => this.practiceDone());
  }

  /** 🎓 Practice finished: a proper end card with where to go next. */
  private practiceDone(): void {
    if (this.perkUi.length) return;
    const s = completeStep('practice');
    sfx.matchWin();
    this.popup(VIEW.w / 2, 300, `🎓 PRACTICE COMPLETE!${s ? `  +${s.reward} 🪙` : ''}`, '#8dff6a', 34);
    const go = (k: number) => {
      for (const b of this.perkUi) { b.g.destroy(); b.label.destroy(); b.sub?.destroy(); b.zone.destroy(); }
      this.perkUi = [];
      if (k === 0) this.scene.start('menu', { slots: [this.slots[0].kind === 'local' ? { kind: 'kb', index: 0 } : this.slots[0], { kind: 'bot', index: 1 }], species: [this.species[0], 1], difficulty: 'easy', rounds: 3 });
      else if (k === 1) this.scene.start('story');
      else this.scene.start('title');
    };
    const opts: [string, string][] = [['▶ FIRST MATCH', 'vs one EASY bot · first to 3'], ['📖 STORY', 'Chapter 1: The First Course'], ['☰ MENU', 'back to the title']];
    this.perkUi = opts.map(([l, sub], k) => new Button(this, VIEW.w / 2 + (k - 1) * 340, 470, { w: 320, h: 96, label: l, sub, size: 24, accent: k === 0 ? 0x8dff6a : 0xffb347, onClick: () => go(k) }, 14));
    const keys = ['Digit1', 'Digit2', 'Digit3'];
    this.perkKeys = () => { const k = keys.findIndex(c => consumeTap(c)); if (k >= 0) go(k); else if (consumeTap('Enter') || consumeTap('Space')) go(0); };
  }

  private track(e: GameEvent): void {
    if (this.initData.attract || this.initData.lab) return; // demo matches and the Move Lab don't count
    if (this.practice) { PRACTICE_STEPS.forEach((st, i) => { if (!this.practice!.done[i] && st.done(e, this.practice!.moved)) this.tick(i); }); return; } // practice doesn't count towards stats
    const T = this.tally;
    if (e.type === 'eat') T.crumbs[e.id]++;
    if (e.type === 'kaiju') T.kaiju[e.id]++;
    if (e.type === 'powerup') T.powers[e.id]++;
    if (e.type === 'ko') { T.deaths[e.id]++; if (e.cause === 'fall' || e.cause === 'wind') T.falls[e.id]++; }
    if (e.type === 'matchEnd') { this.awardsText.setText(this.awards()).setFontSize(17).setWordWrapWidth(0); for (let f = 17; this.awardsText.width > 1000 && f > 11;) this.awardsText.setFontSize(--f); if (this.awardsText.width > 1000) this.awardsText.setWordWrapWidth(1000); }
    if (e.type === 'matchEnd' && this.initData.cup && this.initData.cup.game + 1 >= cupGames(this.slots.length).length && this.net?.role !== 'guest') {
      const tot = this.cupTotals(), lead = tot.indexOf(Math.max(...tot)), d = new Date();
      addToShelf({ date: `${d.getDate()}/${d.getMonth() + 1}`, name: this.world.players[lead].name, species: this.species[lead], pts: tot[lead] });
    }
    if (e.type === 'matchEnd' && this.initData.trial) {
      const t = TRIALS.find(q => q.id === this.initData.trial!.id), me = this.world.players[0], won = e.winner === 0;
      const stars = !won || !t ? 0 : me.score === this.world.round ? (me.kos >= t.kos ? 3 : 2) : 1;
      const gained = recordTrial(this.initData.trial.id, stars);
      if (gained) addTokens(gained * TRIAL_TOKENS);
      this.trialResult = { stars, gained };
    }
    if (e.type === 'matchEnd' && this.initData.daily) recordDaily(this.world.players[0].score, this.humanWon(e.winner), this.initData.daily.date);
    if (e.type === 'matchEnd' && this.initData.dessert && e.winner === 0) saveDessert(this.initData.dessert.course + 1);
    if (e.type === 'roundStart' && this.initData.dessert && e.round === 1) { const q = COURSES[this.initData.dessert.course].quip; this.time.delayedCall(200, () => this.popup(VIEW.w / 2, 150, q, '#ffd9a0', 18)); }
    if (e.type === 'matchEnd' && this.initData.gauntlet) {
      const reached = this.initData.gauntlet.wave - (e.winner === 0 ? 0 : 1);
      saveGauntletBest(reached);
      if (e.winner !== 0 && reached > (this.initData.gauntlet.startBest ?? 0) && (this.initData.gauntlet.lives ?? GAUNTLET.lives) <= 1) this.time.delayedCall(600, () => { sfx.matchWin(); this.popup(VIEW.w / 2, 140, '🏅 NEW BEST!', '#ffd24a', 30); });
    }
    if (this.net?.role === 'guest' || !this.slots.some((_, i) => this.isHuman(i))) return;
    this.tallyEvent(e);
    const st = (this.stats ??= loadStats()), w = this.world;
    switch (e.type) {
      case 'roundStart': if (!st.tables.includes(w.layoutIndex)) st.tables.push(w.layoutIndex); break;
      case 'ko': if (e.by !== null && e.by !== e.id && this.isHuman(e.by)) { st.kos++; if (w.players[e.by]?.kaijuT > 0) { this.rampage[e.by] = (this.rampage[e.by] ?? 0) + 1; st.bestRampage = Math.max(st.bestRampage ?? 0, this.rampage[e.by]); } if (e.cause === 'blend') st.blends = (st.blends ?? 0) + 1; } if (e.cause === 'boom' && !this.isHuman(e.id)) st.pops++; break;
      case 'eat': if (this.isHuman(e.id)) st.crumbs++; break;
      case 'kaiju': if (this.isHuman(e.id)) { st.kaijuForms++; this.rampage[e.id] = 0; const s = completeStep('kaiju'); if (s) this.popup(VIEW.w / 2, 150, `🍽 FIRST SERVICE: ${s.text} ✔ +${s.reward} 🪙`, '#8dff6a', 20); } break;
      case 'roundEnd': if (this.humanWon(e.winner)) st.roundsWon++; break;
      case 'matchEnd': {
        if (this.initData.gauntlet) st.gauntlet = Math.max(st.gauntlet ?? 0, this.initData.gauntlet.wave - (e.winner === 0 ? 0 : 1));
        st.matches++;
        if (this.initData.cup && this.initData.cup.game + 1 >= cupGames(this.slots.length).length) { const tot = this.cupTotals(), best = Math.max(...tot); if (tot.some((v, i) => v === best && this.isHuman(i))) st.cups = (st.cups ?? 0) + 1; }
        this.slots.forEach((_, i) => { if (this.isHuman(i)) st.kaijuPlays[this.species[i]] = (st.kaijuPlays[this.species[i]] ?? 0) + 1; });
        if (this.humanWon(e.winner)) {
          if (w.opts.target >= 3 && e.winner !== null && w.players[e.winner].score === w.round) st.flawless = (st.flawless ?? 0) + 1;
          st.wins++;
          st.streak++;
          st.bestStreak = Math.max(st.bestStreak, st.streak);
          st.modeWins[this.mode] = (st.modeWins[this.mode] ?? 0) + 1;
          if (this.world.mutator !== 'none') st.twistWins = (st.twistWins ?? 0) + 1;
          st.kaijuWins[this.species[e.winner]] = (st.kaijuWins[this.species[e.winner]] ?? 0) + 1;
        } else st.streak = 0;
        const got = checkAchievements(st);
        if (got.length) addTokens(got.length * ACHIEVEMENT_TOKENS);
        got.forEach((a, k) => this.time.delayedCall(1200 + k * 1600, () => {
          sfx.meterFull();
          const col = COLOURS.find(c => c.unlock === a.id);
          this.popup(VIEW.w / 2, 0, `🏆 ${a.name.toUpperCase()}: ${a.desc} · +${ACHIEVEMENT_TOKENS} 🪙${col ? `  ·  🎨 ${col.name} colour!` : ''}`, '#ffd24a', 17);
        }));
        break;
      }
    }
    if (e.type === 'matchEnd' || e.type === 'roundEnd') saveStats(st);
  }

  private tallyEvent(e: GameEvent): void {
    const me = this.slots.findIndex((_, i) => this.isHuman(i)), t = this.mine, w = this.world;
    if (me < 0 || this.mode === 'practice') return;
    if (e.type === 'ko') {
      if (e.by === me && e.id !== me) t.kos++;
      if (e.id === me) { const k = e.by !== null && e.by !== me && w.players[e.by]?.kaijuT > 0 ? 'kaiju' : e.cause; t.out[k] = (t.out[k] ?? 0) + 1; }
    }
    if (e.type === 'kaiju' && e.id === me) t.kaijus++;
    if (e.type === 'eat' && e.id === me) t.crumbs++;
    if (e.type === 'parry' && e.id === me) t.parries++;
    if (e.type === 'roundEnd' && this.humanWon(e.winner)) t.rounds++;
    if (e.type !== 'matchEnd') return;
    const won = this.humanWon(e.winner), vsBots = this.slots.filter(s => s.kind !== 'bot').length === 1;
    if (!this.story && !this.initData.gauntlet && !this.initData.daily && !this.initData.dessert && vsBots) GameScene.lossRun = won ? 0 : GameScene.lossRun + 1;
    this.firstService(won);
    this.receipt = recordMatch({
      species: this.species[me], won, kos: t.kos, kaijus: t.kaijus, crumbs: t.crumbs, roundsWon: t.rounds, parries: t.parries,
      mode: this.mode, party: this.mode !== 'classic',
      waves: this.initData.gauntlet && won ? 1 : 0,
      storyClear: !!this.story && won,
      daily: this.initData.daily ? { won, flawless: won && w.players[me].score === w.round, date: this.initData.daily.date } : undefined,
    });
  }

  /** 🍽 First Service checklist steps that a finished match can tick (each pays tokens once, see src/meta.ts). */
  private firstService(won: boolean): void {
    const done: string[] = [];
    const tickStep = (id: string) => { const s = completeStep(id); if (s) done.push(`🍽 FIRST SERVICE: ${s.text} ✔ +${s.reward} 🪙`); };
    if (!this.story && !this.initData.gauntlet && !this.initData.daily && !this.initData.dessert && this.mode === 'classic' && !this.initData.cup) tickStep('match');
    if (this.mode !== 'classic' || this.initData.cup) tickStep('party');
    if (this.story && won && this.story.chapter === 0 && (this.story.campaign ?? 'main') === 'main') tickStep('story');
    done.forEach((d, k) => this.time.delayedCall(600 + k * 1500, () => this.popup(VIEW.w / 2, 150, d, '#8dff6a', 20)));
  }

  /** 🧾 The receipt card (bottom-left of the results): tokens, mastery, orders, and how you were knocked out. */
  private renderReceipt(): void {
    const w = this.world, r = this.receipt, show = !!r && w.phase === 'matchEnd' && !this.replay && w.phaseT > 0.5 && !this.perkUi.length;
    this.receiptG.clear();
    if (!show || !r) { this.receiptText.setVisible(false); return; }
    const lines = [...r.lines];
    const pin = pinnedAchievement(), pa = pin ? ACHIEVEMENTS.find(a => a.id === pin) : null, st = this.stats;
    if (pa && st && !st.achieved.includes(pa.id) && pa.progress) { const [h, n] = pa.progress(st); lines.push(`📌 ${pa.name}: ${Math.min(h, n)}/${n}`); }
    const OUT: Record<string, string> = { cutlery: '🍴 cutlery', swipe: '👋 swipe', squash: '🦶 stomp', kaiju: '🦖 a KAIJU', fall: '⬇ fell off', hand: '✋ the Giant Hand', wind: '💨 wind', chop: '🔪 cleaver', burn: '🔥 burner', toast: '🍞 toaster', boom: '🥟 dumpling pop', blend: '🥤 blender', cheese: '🧀 hot cheese', flip: '🍳 spatula' };
    const outs = Object.entries(this.mine.out).sort((a, b) => b[1] - a[1]);
    if (outs.length) lines.push('Knocked out by: ' + outs.map(([k, n]) => (OUT[k] ?? k) + (n > 1 ? ' x' + n : '')).join(', '));
    if (outs.length && !this.humanWon(w.winner)) {
      const top = outs[0][0];
      const tip: Record<string, string> = { fall: 'Stay away from the edges, and DASH back to the middle.', cutlery: 'DASH sideways when you see a charge line, or SWIPE to parry it back.', kaiju: 'Step out of the ring before each stomp, then hit them while they are dizzy.', squash: 'Step out of the ring before each stomp, then hit them while they are dizzy.', hand: 'The Giant Hand goes for the fullest belly: STOMP before it reaches you.' };
      if (tip[top]) lines.push('💡 ' + tip[top]);
    }
    if (GameScene.lossRun >= 2 && !this.humanWon(w.winner)) lines.push('💡 Tough bots? Set BOT LEVEL to EASY, or switch on COMEBACK HELP in Settings.');
    this.receiptText.setText(['🧾 THIS MATCH', ...lines].join('\n')).setVisible(true);
    const b = this.receiptText.getBounds();
    this.receiptG.fillStyle(0x1a0d06, 0.88).fillRoundedRect(b.x - 12, b.y - 10, b.width + 24, b.height + 20, 14).lineStyle(2, 0xffb347, 0.9).strokeRoundedRect(b.x - 12, b.y - 10, b.width + 24, b.height + 20, 14);
  }

  private onKO(e: Extract<GameEvent, { type: 'ko' }>): void {
    const names = this.world.players.map(p => p.name);
    const victim = names[e.id], killer = e.by !== null ? names[e.by] : null;
    const x = Phaser.Math.Clamp(e.x, TABLE.x, TABLE.x + TABLE.w), y = Phaser.Math.Clamp(e.y, TABLE.y, TABLE.y + TABLE.h);
    if (e.cause === 'fall' || e.cause === 'wind') sfx.fall(); else sfx.ko();
    sfx.cry(this.species[e.id]);
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
      case 'toast': text = `${victim} got TOASTED`; break;
      case 'boom': text = `The HOT DUMPLING popped on ${victim}!`; break;
      case 'cheese': text = `${victim} got SMOTHERED in hot cheese`; break;
      case 'flip': text = killer ? `${killer} served ${victim} to the SPATULA` : `${victim} got FLIPPED like a pancake`; break;
      case 'blend': text = killer ? `${killer} sent ${victim} into the BLENDER` : `${victim} got BLENDED into a smoothie`; break;
    }
    if (e.by === null && e.cause === 'cutlery') text = `${victim} skewered themselves`;
    if (this.isHuman(e.id)) this.popup(x, Math.max(TABLE.y + 40, y - 70), `💥 ${text.replace(victim, 'YOU').replace(/^YOU skewered themselves$/, 'You hit yourself!')}`, '#ff8a7a', 24);
    this.feed.unshift({ text, color: this.css[e.by ?? e.id], t: 4 });
    if (this.feed.length > 2) this.feed.pop();
  }

  // ---------------------------------------------------------------- fx helpers
  private burst(x: number, y: number, color: number, n: number, speed: number, life: number, grav = 0): void {
    if (getSettings().reducedFx) n = Math.ceil(n / 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = Math.random() * speed;
      this.parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: life * (0.5 + Math.random() * 0.5), max: life, color, size: 2 + Math.random() * 3, grav });
    }
  }

  private popup(x: number, y: number, text: string, color: string, size = 22): void {
    const t = withShadow(this.add.text(x, y, text, display(size + 2, color, { strokeThickness: 5 })).setOrigin(0.5).setDepth(7), 3);
    // never on top of another pop-up: keep it on screen (below the HUD), then step down past any live one it would cover
    const half = t.width / 2 + 8;
    t.setX(Math.max(half, Math.min(VIEW.w - half, x)));
    let ty = Math.max(84 + t.height / 2, Math.min(VIEW.h - t.height / 2 - 4, y));
    for (let k = 0; k < 6; k++) {
      const hit = this.popups.find(p => p.text.active && Math.abs(p.text.y - ty) < (p.text.height + t.height) / 2 && Math.abs(p.text.x - t.x) < (p.text.width + t.width) / 2);
      if (!hit) break;
      ty = hit.text.y + (hit.text.height + t.height) / 2 + 2;
    }
    t.setY(Math.min(VIEW.h - t.height / 2 - 4, ty));
    popIn(this, t, 1.8, 260);
    this.popups.push({ text: t, vy: -50, life: 1 });
  }

  private shake(intensity: number, ms: number): void {
    if (!getSettings().shake) return;
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
    this.renderTwist(t);
    this.twistChip?.setVisible(!this.replay);
    this.renderModeFx();
    this.updateShareButton();
    this.updatePractice();
    const tags = getSettings().nameTags, badges = getSettings().badges;
    w.players.forEach((p, i) => this.badgeTexts[i]?.setVisible(badges && p.alive).setPosition(p.x, p.y + p.r * 0.95).setBackgroundColor(this.css[i]));
    this.nameTexts.forEach((t, i) => t.setText(badges ? `P${i + 1} ${SPECIES[this.species[i]].name}` : SPECIES[this.species[i]].name));
    w.players.forEach((p, i) => this.tagTexts[i]?.setVisible(tags && p.alive).setPosition(p.x, p.y - p.r * (p.kaijuT > 0 ? 2.6 : 1.6) - 6));

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
    this.renderReceipt();
  }

  /** Team rings under kaiju, the hot dumpling over its carrier, power-ups and their effects. */
  private renderModeFx(): void {
    const w = this.world, o = this.overG, t = this.t;
    for (const it of w.items) {
      const d = POWER_DEFS[it.kind], bob = Math.sin(t * 4 + it.id) * 3, x = it.x, y = it.y + bob, S = POWER_ICON_SCALE;
      const fade = it.t > POWERUPS.lifetime - 3 ? 0.4 + 0.6 * Math.abs(Math.sin(t * 10)) : 1;
      o.fillStyle(d.color, 0.28 * fade); o.fillCircle(x, y, (22 + Math.sin(t * 5) * 3) * S);
      o.fillStyle(0x000000, 0.25 * fade); o.fillEllipse(it.x + 3, it.y + 16 * S, 26 * S, 8 * S);
      if (it.kind === 'gravy') {
        o.fillStyle(0xf2ece0, fade); o.fillEllipse(x, y + 4 * S, 30 * S, 16 * S);
        o.fillStyle(0xf2ece0, fade); o.fillTriangle(x + 13 * S, y, x + 24 * S, y - 4 * S, x + 13 * S, y + 6 * S);
        o.fillStyle(d.color, fade); o.fillEllipse(x, y + S, 24 * S, 10 * S);
        o.lineStyle(2, 0x5a3a20, fade); o.strokeEllipse(x, y + 4 * S, 30 * S, 16 * S);
      } else if (it.kind === 'sugar') {
        o.fillStyle(0xffffff, fade); o.fillRoundedRect(x - 10 * S, y - 10 * S, 20 * S, 20 * S, 3 * S);
        o.lineStyle(2, 0xc0b8d8, fade); o.strokeRoundedRect(x - 10 * S, y - 10 * S, 20 * S, 20 * S, 3 * S);
        o.fillStyle(0xffd24a, fade); o.fillCircle(x + 14 * S * Math.cos(t * 6), y - 16 * S + 4 * Math.sin(t * 6), 2.5 * S);
      } else {
        o.fillStyle(d.color, fade); o.fillRoundedRect(x - 8 * S, y - 10 * S, 16 * S, 24 * S, 5 * S);
        o.fillStyle(it.kind === 'hotsauce' ? 0x2f8a2f : 0xd8281e, fade); o.fillRect(x - 4 * S, y - 18 * S, 8 * S, 9 * S);
        o.fillStyle(0xffffff, 0.45 * fade); o.fillRect(x - 5 * S, y - 6 * S, 3 * S, 14 * S);
        o.lineStyle(2, 0x3a2412, fade); o.strokeRoundedRect(x - 8 * S, y - 10 * S, 16 * S, 24 * S, 5 * S);
      }
    }
    // hats on the people playing on this device (sprite top ≈ 2.1 radii above the centre)
    for (const p of w.players) {
      const img = this.hatImgs[p.id];
      img?.setVisible(false);
      if (!p.alive) continue;
      if (!HATS_ENABLED) break;
      const id = this.net ? parseLook(this.initData.hats?.[p.id]).hat : this.isHuman(p.id) ? currentHat().id : '';
      const hat = id ? HATS.find(h => h.id === id) : undefined;
      if (!hat || hat.id === 'none') continue;
      const head = this.art.heads[p.id] ?? { x: p.x, y: p.y - p.r * 2.05, rot: 0 };
      const key = hatArtKey(hat);
      if (img && hasArt(key)) {
        const [fw, dy] = HAT_FIT[hat.id] ?? [1.3, 0.3];
        const float = hat.id === 'halo' ? Math.sin(t * 3) * 3 : 0;
        img.setTexture(key).setVisible(true);
        const hs = head.size ?? 1;
        img.setFlipX(!!head.flip).setScale((fw * HAT_SCALE * p.r * hs) / img.width).setRotation(head.rot).setPosition(head.x, head.y + dy * p.r * hs + float).setAlpha(p.invT > 0 && Math.sin(t * 30) > 0 ? 0.5 : 1);
      } else hat.draw(o, head.x, head.y + p.r * 0.2, p.r * 0.9, t);
    }
    for (const p of w.players) {
      if (!p.alive) continue;
      if (p.kaijuT > 0) {
        const R = p.r * 2.25, k = Math.min(1, p.kaijuT / P.kaijuTime);
        o.lineStyle(6, 0x000000, 0.35); o.strokeCircle(p.x, p.y, R);
        o.lineStyle(5, k < 0.3 ? 0xff5a4a : 0xffd24a, 0.95); o.beginPath(); o.arc(p.x, p.y, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k, false); o.strokePath();
        if (p.kit && this.isHuman(p.id)) {
          const ready = p.powerCD <= 0, cd = powerCooldown(p.kit);
          o.fillStyle(ready ? 0x8dff6a : 0x5a4a3e, 1); o.fillCircle(p.x, p.y - R, 9);
          if (!ready) { o.lineStyle(3, 0x8dff6a, 1); o.beginPath(); o.arc(p.x, p.y - R, 9, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - p.powerCD / cd), false); o.strokePath(); }
          else if (Math.sin(this.t * 10) > 0) { o.lineStyle(2, 0xffffff, 1); o.strokeCircle(p.x, p.y - R, 12); }
        }
      }
      if (p.shieldT > 0) { o.lineStyle(3, 0xffd24a, 0.55 + 0.3 * Math.sin(t * 8)); o.strokeCircle(p.x, p.y, p.r * (p.kaijuT > 0 ? 2.2 : 1.35)); o.fillStyle(0xffd24a, 0.12); o.fillCircle(p.x, p.y, p.r * (p.kaijuT > 0 ? 2.2 : 1.35)); }
      if (p.speedT > 0 && Math.random() < 0.5) this.parts.push({ x: p.x + (Math.random() - 0.5) * p.r, y: p.y + p.r * 0.6, vx: -p.vx * 0.2, vy: -30 - Math.random() * 40, life: 0.35, max: 0.35, color: Math.random() < 0.5 ? 0xff5a1a : 0xffd040, size: 3, grav: 0 });
      if (p.sugarT > 0 && Math.random() < 0.3) this.parts.push({ x: p.x + (Math.random() - 0.5) * p.r * 2, y: p.y - p.r, vx: 0, vy: -40, life: 0.5, max: 0.5, color: 0xffffff, size: 2, grav: 0 });
    }
    if (w.mode === 'teams') {
      for (const p of w.players) {
        if (!p.alive) continue;
        o.lineStyle(4, MODE_RULES.teams.colors[p.team] ?? 0xffffff, 0.9);
        o.strokeEllipse(p.x, p.y + p.r * 0.7, p.r * 2.4, p.r * 0.9);
      }
    }
    if (w.mode === 'crumbRush') {
      for (const p of w.players) if (p.alive && p.invT > 0) { o.lineStyle(3, 0xffffff, 0.4 + 0.4 * Math.sin(t * 20)); o.strokeCircle(p.x, p.y, p.r + 8); }
    }
    // 👑 Legend crown aura (Mastery Lv 6)
    for (const p of w.players) if (p.alive && this.isHuman(p.id) && !this.net && kaijuMastery(this.species[p.id]) >= 6) { o.lineStyle(3, 0xffd24a, 0.35 + 0.25 * Math.sin(t * 4)); o.strokeCircle(p.x, p.y, p.r + 14); }
    // 🦖 stomp telegraph: a ring fills in before each KAIJU stomp so rivals can step out
    for (const p of w.players) {
      if (!p.alive || p.kaijuT <= 0) continue;
      const k = 1 - Math.max(0, Math.min(1, p.stepT / P.stompEvery));
      // a person inside the ring: it turns red, thicker, and their kaiju flashes red too ("step out!")
      const near = w.players.filter(q => q !== p && q.alive && q.kaijuT <= 0 && this.isHuman(q.id) && Math.hypot(q.x - p.x, q.y - p.y) < P.stompRadius + q.r);
      o.lineStyle(near.length ? 5 : 3, near.length ? 0xff3b30 : this.colors[p.id], near.length ? 0.6 + 0.4 * k : 0.25 + 0.45 * k); o.strokeCircle(p.x, p.y, P.stompRadius);
      for (const q of near) { o.lineStyle(4, 0xff3b30, 0.5 + 0.5 * Math.sin(t * 22)); o.strokeCircle(q.x, q.y, q.r + 10); }
      o.fillStyle(this.colors[p.id], 0.05 + 0.12 * k); o.fillCircle(p.x, p.y, P.stompRadius * (0.3 + 0.7 * k));
      if (p.kaijuT < 1.2) { o.lineStyle(2, 0xffffff, 0.5 + 0.4 * Math.sin(t * 18)); o.strokeCircle(p.x, p.y, p.r + 12); } // about to shrink
    }
    if (w.mode === 'goldenSpoon' && w.spoon && w.phase === 'play') {
      // 🥄 the Golden Spoon: lies on the table (glowing) or floats over its holder
      const sp = w.spoon, h = sp.holder !== null ? w.players[sp.holder] : null;
      const x = h ? h.x : sp.x, y = h ? h.y - h.r - 30 + Math.sin(t * 5) * 3 : sp.y, pulse = 0.5 + 0.5 * Math.sin(t * 6);
      o.fillStyle(0xffd24a, h ? 0.18 : 0.22 + 0.2 * pulse); o.fillCircle(x, y, (h ? 20 : 30) + pulse * 6);
      if (!h) { o.lineStyle(3, 0xffd24a, 0.5 + 0.4 * pulse); o.strokeCircle(x, y, 38 + pulse * 8); }
      const a = h ? -0.5 : t * 0.8, ca = Math.cos(a), sa = Math.sin(a);
      o.lineStyle(7, 0xb8860b, 1); o.lineBetween(x - ca * 18, y - sa * 18, x + ca * 10, y + sa * 10);
      o.lineStyle(4, 0xffe27a, 1); o.lineBetween(x - ca * 18, y - sa * 18, x + ca * 10, y + sa * 10);
      o.fillStyle(0xffd24a, 1); o.fillEllipse(x + ca * 18, y + sa * 18, 20, 14);
      o.fillStyle(0xfff4c2, 0.9); o.fillEllipse(x + ca * 16 - 2, y + sa * 16 - 2, 7, 5);
      if (h) { o.lineStyle(3, 0xffd24a, 0.6 + 0.3 * pulse); o.strokeCircle(h.x, h.y, h.r + 10); }
    }
    if (w.mode === 'goldenSpoon') {
      for (const p of w.players) if (p.alive && p.invT > 0) { o.lineStyle(3, 0xffffff, 0.4 + 0.4 * Math.sin(t * 20)); o.strokeCircle(p.x, p.y, p.r + 8); }
    }
    if (w.mode === 'hotDumpling' && w.hot && w.phase === 'play') {
      const h = w.players[w.hot.id];
      if (h?.alive) {
        const fuse = w.hot.fuse, rate = fuse < 3 ? 14 : fuse < 6 ? 8 : 4;
        const x = h.x, y = h.y - h.r - 28 + Math.sin(t * 6) * 3, pulse = 0.5 + 0.5 * Math.sin(t * rate);
        o.fillStyle(0xff5a1a, 0.25 + 0.35 * pulse); o.fillCircle(x, y, 22 + pulse * 6);
        o.fillStyle(0xfff1d6, 1); o.fillEllipse(x, y + 3, 34, 24);
        o.fillStyle(0xf0dcb4, 1); o.fillTriangle(x - 8, y - 6, x + 8, y - 6, x, y - 16);
        o.lineStyle(2, 0x7a4a24, 1); o.strokeEllipse(x, y + 3, 34, 24);
        o.lineStyle(2, 0xffffff, 0.6);
        for (let k = -1; k <= 1; k++) { const sx = x + k * 8, sy = y - 20 - ((t * 30 + k * 10) % 18); o.lineBetween(sx, sy, sx + 3, sy - 6); }
      }
    }
  }

  private renderHud(): void {
    const w = this.world, g = this.hudG, t = this.t;
    this.renderStompCoach();
    g.clear();
    g.fillStyle(0x0d0805, 0.85);
    g.fillRect(0, 0, VIEW.w, 80);
    w.players.forEach((p, i) => {
      const x = this.hudX(i), pw = this.hudW - 10;
      g.fillStyle(0xffffff, p.alive ? 0.06 : 0.02);
      g.fillRoundedRect(x - 4, 6, pw, 68, 10);
      const icon = this.hudIcons[i];
      if (icon) fitInside(icon.setAlpha(p.alive ? 1 : 0.35).setTexture(kaijuKey(this, this.species[i], this.seatCols[i], p.kaijuT > 0 && hasArt(`kaiju-${this.species[i]}-rage`))), 40, 44);
      else drawKaiju(g, { x: x + 20, y: 40, r: 17, aim: Math.PI / 2, kaiju: false, species: this.species[i], color: this.colors[i] }, t, p.alive ? 1 : 0.35);
      // round stars (second row, right of the belly meter)
      if (w.opts.target > 5) {
        g.fillStyle(this.colors[i], 1);
        const sx = x + pw - 76, sy = 41, pts: { x: number; y: number }[] = [];
        for (let k = 0; k < 10; k++) { const r = k % 2 ? 2.8 : 6.5, a = (k / 10) * Math.PI * 2 - Math.PI / 2; pts.push({ x: sx + Math.cos(a) * r, y: sy + Math.sin(a) * r }); }
        g.fillPoints(pts as unknown as Phaser.Math.Vector2[], true);
      }
      this.scoreTexts[i]?.setText(w.opts.target > 5 && w.mode !== 'practice' ? `${p.score}/${w.opts.target}` : '').setPosition(x + pw - 66, 33);
      for (let s = 0; s < (w.opts.target > 5 ? 0 : w.opts.target); s++) {
        const sx = x + pw - 76 + s * 14, sy = 41;
        g.fillStyle(s < p.score ? this.colors[i] : 0x3a2c22, 1);
        const pts: { x: number; y: number }[] = [];
        for (let k = 0; k < 10; k++) {
          const r = k % 2 ? 2.8 : 6.5, a = (k / 10) * Math.PI * 2 - Math.PI / 2;
          pts.push({ x: sx + Math.cos(a) * r, y: sy + Math.sin(a) * r });
        }
        g.fillPoints(pts as unknown as Phaser.Math.Vector2[], true);
      }
      // belly meter
      const bx = x + this.hudText, by = 36, bw = pw - this.hudText - 84;
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
      } else if (held && p.alive) drawCutleryShape(g, held.kind, x + pw - 30, 18, -0.35, 0.85);
      this.nameTexts[i].setAlpha(p.alive ? 1 : 0.4);
      const status = !p.alive ? 'KNOCKED OUT' : p.kaijuT > 0 ? 'KAIJU MODE!' : full ? 'STOMP READY!' : held ? CUTLERY[held.kind].name : 'unarmed';
      let info = `${status} · KOs ${p.kos}`;
      if (w.mode === 'crumbRush') info = !p.alive && p.respawnT > 0 ? `BACK IN ${Math.ceil(p.respawnT)} · 🍪 ${p.pts}` : `🍪 ${p.pts} crumbs · KOs ${p.kos}`;
      if (w.mode === 'teams') info = `${MODE_RULES.teams.names[p.team] ?? ''} · ${status}`;
      if (w.mode === 'goldenSpoon') info = !p.alive && p.respawnT > 0 ? `BACK IN ${Math.ceil(p.respawnT)} · 🥄 ${Math.floor(p.pts)}/${MODE_RULES.goldenSpoon.holdToWin}` : `${w.spoon?.holder === p.id ? '🥄 HOLDING! ' : '🥄 '}${Math.floor(p.pts)}/${MODE_RULES.goldenSpoon.holdToWin}s · KOs ${p.kos}`;
      if (w.mode === 'hotDumpling' && w.hot?.id === p.id && p.alive && w.phase === 'play') info = '🥟 HOT! PASS IT!';
      const buffs = (p.speedT > 0 ? POWER_DEFS.hotsauce.short : '') + (p.shieldT > 0 ? POWER_DEFS.mustard.short : '') + (p.sugarT > 0 ? POWER_DEFS.sugar.short : '');
      if (buffs && p.alive) info = `${buffs} ${info}`;
      this.infoTexts[i].setText(info);
      if (w.mode === 'teams') { g.fillStyle(MODE_RULES.teams.colors[p.team] ?? 0xffffff, 0.9); g.fillRoundedRect(x - 4, 70, pw, 4, 2); }
    });
    this.roundText.setText(this.initData.gauntlet ? `GAUNTLET ${'❤'.repeat(Math.max(0, this.initData.gauntlet.lives ?? GAUNTLET.lives))}\nWAVE ${this.initData.gauntlet.wave} · ${w.layout.name.toUpperCase()}` : `${w.mode !== 'classic' ? modeDef(w.mode).name + '\n' : ''}ROUND ${w.round} · ${w.layout.name.toUpperCase()}`);
    if (this.slots.length <= 4) { const room = VIEW.w - 16 - (this.hudX(this.slots.length - 1) + this.hudW) - 8; this.roundText.setScale(Math.min(1, room / Math.max(1, this.roundText.width / this.roundText.scaleX))); }
    const left = w.timeLeft();
    let mt = '';
    if (left !== null && (w.phase === 'play' || w.phase === 'countdown')) mt = `⏱ ${Math.ceil(left)}`;
    if (w.mode === 'hotDumpling' && w.hot && w.phase === 'play') mt = `🥟 ${w.players[w.hot.id].name} HAS THE HOT DUMPLING`;
    if (w.mode === 'goldenSpoon' && w.spoon && w.phase === 'play') mt = w.spoon.holder !== null ? `⏱ ${Math.ceil(left ?? 0)} · 🥄 ${w.players[w.spoon.holder].name} HAS THE GOLDEN SPOON` : `⏱ ${Math.ceil(left ?? 0)} · 🥄 GRAB THE GOLDEN SPOON!`;
    this.modeText.setText(this.replay ? '' : mt).setColor(left !== null && left < 10 ? '#ff8a7a' : '#ffe9c7'); // hidden under the INSTANT REPLAY label
    const over = w.phase === 'matchEnd';
    this.roundText.setVisible(!over);
    this.awardsText.setVisible(over);
    this.feedTexts.forEach((tx, i) => {
      const f = this.feed[i];
      tx.setText(f ? f.text : '');
      if (f) tx.setColor(f.color).setAlpha(over ? 0 : Math.min(1, f.t));
    });
  }

  private renderBanner(): void {
    const w = this.world;
    if (this.replay) { this.banner.setText(''); this.bannerSub.setText(''); return; }
    let main = '', sub = '', color = '#ffe9c7';
    if (this.netNotice) {
      main = 'DISCONNECTED';
      sub = this.netNotice + '\nBack to the menu…';
    } else if (this.paused) {
      main = 'PAUSED';
      sub = '';
    } else if (w.phase === 'countdown') {
      const n = Math.ceil((1.6 - w.phaseT) / (1.6 / 3));
      main = String(Math.max(1, n));
      sub = `${w.mode !== 'classic' ? modeDef(w.mode).name + ' · ' : ''}${w.mutator !== 'none' ? '⚡ ' + twistName(w.mutator, w.mutator2) + ' · ' : ''}Round ${w.round} · ${w.layout.name}`;
      if (this.initData.cup) { const n = cupGames(w.players.length).length, fin = this.initData.cup.game + 1 >= n; sub = `🏆 PARTY CUP · GAME ${this.initData.cup.game + 1}/${n}${fin ? ` · FINAL: ×${FINAL_MULTIPLIER} POINTS` : ''} · ${modeDef(w.mode).name} · ${w.layout.name}`; }
      if (this.initData.dessert) { const c = COURSES[this.initData.dessert.course]; sub = `🍰 DESSERT COURSE ${this.initData.dessert.course + 1}/${COURSES.length} · ${c.title.toUpperCase()} · ${w.layout.name}`; }
      if (this.initData.daily) sub = `📅 DAILY CHALLENGE · win this match to clear today and keep your 🔥 streak · ${w.layout.name}`;
      if (this.initData.gauntlet) sub = `GAUNTLET · ${waveCourse(this.initData.gauntlet.wave)} · WAVE ${this.initData.gauntlet.wave}${this.initData.gauntlet.wave % GAUNTLET.bossEvery === 0 ? ' (COURSE BOSS)' : ''} · ❤ ${this.initData.gauntlet.lives ?? GAUNTLET.lives} · ${w.players.length - 1} rival${w.players.length > 2 ? 's' : ''}${this.bossSeats().length ? ' + 👑 BOSS' : ''} · ${w.layout.name}`;
      if (w.mutator !== 'none') sub += `\n⚡ TWIST: ${twistName(w.mutator, w.mutator2)} — ${twistBlurb(w.mutator, w.mutator2)}`;
      if (this.tip) sub += `\n\n💡 ${this.tip}`;
    } else if (w.phase === 'play' && this.bannerT > 0) {
      main = 'DIG IN!';
    } else if (w.phase === 'roundEnd') {
      if (w.winner !== null && w.mode === 'teams') { const tm = w.players[w.winner].team; main = `TEAM ${MODE_RULES.teams.names[tm]} WINS THE ROUND`; color = MODE_RULES.teams.css[tm]; }
      else if (w.winner !== null && w.mode === 'goldenSpoon') { main = `${w.players[w.winner].name} KEPT THE GOLDEN SPOON!`; color = this.css[w.winner]; }
      else if (w.winner !== null && w.mode === 'crumbRush') { main = `${w.players[w.winner].name} ATE THE MOST!`; color = this.css[w.winner]; }
      else if (w.winner !== null) { main = `${w.players[w.winner].name} WINS THE ROUND`; color = this.css[w.winner]; }
      else { main = w.mode === 'crumbRush' || w.mode === 'goldenSpoon' ? 'A TIE! NO POINT' : 'NOBODY SURVIVED DINNER'; }
      // scores: at most 3 kaiju per line so 6 players still fit on screen
      const scores = w.players.map(p => (w.opts.target > 5 ? `${p.name} ★ ${p.score}/${w.opts.target}` : `${p.name} ${'★'.repeat(Math.max(0, p.score))}${'☆'.repeat(Math.max(0, w.opts.target - p.score))}`));
      sub = chunk(scores, 3).map(r => r.join('      ')).join('\n');
    } else if (w.phase === 'matchEnd' && this.initData.cup) {
      const cup = this.initData.cup, games = cupGames(w.players.length), last = cup.game + 1 >= games.length;
      const add = this.cupAdd(), tot = this.cupTotals();
      const order = w.players.map((p, i) => i).sort((a, b) => tot[b] - tot[a]);
      const lead = order[0];
      const gw = w.winner !== null ? (w.mode === 'teams' ? `TEAM ${MODE_RULES.teams.names[w.players[w.winner].team]}` : w.players[w.winner].name) : 'NOBODY';
      main = last ? `🏆 ${w.players[lead].name}\nWINS THE PARTY CUP!` : `GAME ${cup.game + 1}/${games.length}: ${gw} WINS!`;
      color = last ? this.css[lead] : w.winner !== null ? this.css[w.winner] : '#ffd24a';
      const rows = order.map((i, k) => `${k === 0 ? '🏆' : k === 1 ? '🥈' : k === 2 ? '🥉' : `${k + 1}.`} ${w.players[i].name}  ${tot[i]} pts${add[i] ? `  (+${add[i]})` : ''}`);
      const shelf = last ? cupShelf().slice(0, 4).map(s => `${s.name} (${s.date})`).join(' · ') : '';
      const table = (last ? '' : 'STANDINGS\n') + rows.join('\n') + (shelf ? `\n\n🏆 Cup Shelf: ${shelf}` : '');
      const nextName = last ? '' : modeDef(games[cup.game + 1].mode).name;
      sub = table + (this.net?.role === 'guest'
        ? (last ? '\n\nEsc to leave' : `\n\nNext: ${nextName} · waiting for the host…`)
        : (last ? '\n\n1 / START: a new Cup · Esc menu' : `\n\nNext: ${nextName}${cup.game + 2 >= games.length ? ` (FINAL · ×${FINAL_MULTIPLIER} POINTS)` : ''} · 1 / START to continue`));
    } else if (w.phase === 'matchEnd' && this.initData.dessert) {
      const n = this.initData.dessert.course, last = n === COURSES.length - 1;
      if (w.winner === 0) { main = last ? 'CLEAN PLATE!' : `COURSE ${n + 1} CLEARED!`; color = '#ffd24a'; sub = last ? 'You finished the whole Dessert Course! 🍰' : `Next: ${COURSES[n + 1].title}`; }
      else { main = 'TOO MUCH DESSERT'; color = '#ff8a7a'; sub = `Beaten on course ${n + 1}. Your progress is saved.\n\n↻ RETRY: 1 / ENTER / click   ·   Esc: back to the map`; }
    } else if (w.phase === 'matchEnd' && this.initData.gauntlet) {
      const wave = this.initData.gauntlet.wave;
      const lives = this.initData.gauntlet.lives ?? GAUNTLET.lives;
      if (w.winner === 0) { main = `WAVE ${wave} CLEARED!`; color = '#8dff6a'; sub = `Next: wave ${wave + 1} · ${'❤'.repeat(Math.max(0, lives))}`; }
      else if (lives > 1) { main = 'LIFE LOST!'; color = '#ffb347'; sub = `${'❤'.repeat(Math.max(0, lives - 1))} left · trying wave ${wave} again with your perks…`; }
      else {
        const reached = wave - 1, prev = this.initData.gauntlet.startBest ?? 0, best = Math.max(prev, reached);
        main = 'GAUNTLET OVER'; color = '#ff8a7a';
        const perks = (this.initData.gauntlet.perks ?? []).map(id => GAUNTLET_PERKS.find(q => q.id === id)?.name ?? id);
        const score = runScore(reached, (this.initData.gauntlet.kos ?? 0) + this.world.players[0].kos);
        sub = `You cleared ${reached} wave${reached === 1 ? '' : 's'} (reached ${waveCourse(wave)})${reached > prev ? ' · 🏅 NEW BEST!' : ` · best ${best}`}\nScore ${score} · GRADE ${runGrade(score)}   (grades: ${GAUNTLET.grades.slice(0, -1).reverse().map(([n, g]) => `${g} ${n}`).join(' · ')})${perks.length ? `\nPerks: ${perks.join(', ')}` : ''}`;
      }
    } else if (w.phase === 'matchEnd' && this.initData.trial) {
      const t = TRIALS.find(q => q.id === this.initData.trial!.id)!, r = this.trialResult ?? { stars: 0, gained: 0 };
      main = r.stars ? `TRIAL CLEAR ${'★'.repeat(r.stars)}${'☆'.repeat(Math.max(0, 3 - r.stars))}` : 'TRIAL FAILED';
      color = r.stars ? '#ffd24a' : '#ff8a7a';
      sub = `🎯 ${t.name}\n★ win · ★★ without losing a round · ★★★ also ${t.kos}+ knockouts (you: ${w.players[0].kos})${r.gained ? `\n+${r.gained * TRIAL_TOKENS} 🪙 for ${r.gained} new star${r.gained > 1 ? 's' : ''}!` : ''}\n\n1 / START retry · Esc trials`;
    } else if (w.phase === 'matchEnd' && this.story) {
      main = w.winner === 0 ? 'CHAPTER CLEAR!' : 'DEFEATED';
      color = w.winner === 0 ? '#ffd24a' : '#ff8a7a';
      sub = '';
    } else if (w.phase === 'matchEnd' && w.winner !== null) {
      main = `${SPECIES[this.species[w.winner]].full.toUpperCase()}\nRULES THE TABLE`;
      color = this.css[w.winner];
      if (w.mode === 'teams') { const tm = w.players[w.winner].team; main = `TEAM ${MODE_RULES.teams.names[tm]}\nRULES THE TABLE`; color = MODE_RULES.teams.css[tm]; }
      const ranked = w.players.slice().sort((a, b) => b.score - a.score || b.kos - a.kos);
      const solo = this.slots.filter(sl => sl.kind !== 'bot').length === 1; // one person playing: mark them as YOU
      const lines = ranked.map((p, i) => `${i + 1}. ${p.name}${solo && this.isHuman(p.id) ? ' (YOU)' : ''}  —  ${p.score} round${p.score === 1 ? '' : 's'} · ${p.kos} KO${p.kos === 1 ? '' : 's'}`);
      // one column (two columns of centred text ran into each other); the font shrinks for 5–6 players
      let table = lines.join('\n');
      if (this.initData.daily) {
        const d = loadDaily(), won = this.humanWon(w.winner);
        main = won ? 'DAILY CHALLENGE\nCOMPLETE!' : 'DAILY CHALLENGE\nFAILED';
        color = won ? '#8dff6a' : '#ff8a7a';
        table = `📅 Today: ${d.won ? 'won ✔' : 'not won yet'} · best ${d.best} round${d.best === 1 ? '' : 's'} · tries ${d.tries} · win streak ${d.streak} day${d.streak === 1 ? '' : 's'}\n\n${table}`;
      }
      sub = table + (this.net?.role === 'guest' ? '\n\nWaiting for the host to start a rematch… · Esc to leave' : '\n\n1 / START rematch · Esc menu');
    }
    if (main !== this.lastBanner) { this.lastBanner = main; if (main) popIn(this, this.banner, 1.5, 380); }
    this.banner.setText(main).setColor(color).setFontSize(main.length > 14 ? 58 : 90);
    this.bannerSub.setText(sub).setFontSize(w.players.length > 4 && w.phase === 'matchEnd' ? 17 : w.players.length > 4 && w.phase === 'roundEnd' ? 20 : 22);
    if (this.paused && !this.netNotice) {
      this.banner.setY(200);
    } else if (w.phase === 'matchEnd') {
      // title near the top, the ranking starts just below it (never overlapping)
      this.banner.setY(185);
      this.bannerSub.setOrigin(0.5, 0).setY(185 + this.banner.displayHeight / 2 + 12);
    } else {
      this.banner.setY(VIEW.h / 2 - 20);
      this.bannerSub.setOrigin(0.5, 0).setY(this.banner.y + (main ? this.banner.displayHeight / 2 - 4 : 30)); // starts just under the big text, never on it
    }
  }
}

function chunk<T>(a: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < a.length; i += n) out.push(a.slice(i, i + n));
  return out;
}
