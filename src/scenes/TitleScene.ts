// The start screen: cover art + mode selection. New modes = one more card in MODES.
import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps } from '../input';
import { applyPendingUpdate } from '../pwa';
import { hasArt } from '../render/art';
import { drawFloor } from '../render/draw';
import { body, display, popIn, withGradient, withShadow } from '../render/fonts';
import { Button, FocusNav } from '../render/ui';
import { loadStory, totalStars } from '../story/save';
import { CHAPTERS } from '../story/chapters';
import { setTouchMode } from '../touch';
import { playMusic } from '../music';
import { gauntletBest } from '../gauntlet';
import { dailySetup, loadDaily, todayKey } from '../daily';
import { modeDef } from '../sim/modes';
import { GameScene } from './GameScene';
import { owned } from '../story/unlocks';

function dailySub(): string {
  const d = loadDaily(), today = d.date === todayKey();
  if (today && d.won) return `Done ✔ · ${d.streak}🔥`;
  return modeDef(dailySetup().mode).name;
}

/** Attract mode: after this many idle seconds on the title, a bot demo plays (0 = never). */
export const ATTRACT_AFTER = 40;

export class TitleScene extends Phaser.Scene {
  private nav!: FocusNav;
  private idle = 0;
  private t = 0;
  private art: Phaser.GameObjects.Image | null = null;

  constructor() {
    super('title');
  }

  create(): void {
    this.idle = 0;
    const wake = () => { this.idle = 0; };
    this.input.on('pointerdown', wake);
    this.input.keyboard?.on('keydown', wake);
    clearTaps();
    setTouchMode('title');
    playMusic('menu');
    if (hasArt('bg-title')) this.art = this.add.image(640, 360, 'bg-title').setDisplaySize(1300, 731).setDepth(-2);
    else drawFloor(this.add.graphics());
    // darken the bottom so the mode cards read well
    const g = this.add.graphics().setDepth(-1);
    for (let i = 0; i < 12; i++) { g.fillStyle(0x0d0805, 0.06 * i); g.fillRect(0, 520 + i * 17, 1280, 17); }
    g.fillStyle(0x0d0805, 0.35); g.fillRect(0, 0, 1280, 8);

    const title = this.add.text(372, 76, 'KITCHEN KAIJU', display(94, '#ffe9c7', { strokeThickness: 14, padding: { x: 8, y: 8 } })).setOrigin(0.5).setDepth(2);
    withShadow(withGradient(title, '#fff6cf', '#ffb347'), 8);
    popIn(this, title, 1.3, 700);
    withShadow(this.add.text(372, 150, 'Tiny monsters. Giant dinner.', body(24, '#ffd9a0', 900)).setOrigin(0.5).setDepth(2), 3);

    const save = loadStory();
    const storySub = save.stars.some(s => s) ? `Ch ${Math.min(save.unlocked, CHAPTERS.length)}/${CHAPTERS.length} · ★ ${totalStars(save)}` : `${CHAPTERS.length} chapters`;
    const go = (key: string, data: object = {}) => { sfx.go(); this.time.delayedCall(80, () => this.scene.start(key, data)); };
    const MODES: { label: string; sub: string; accent: number; scene?: string; disabled?: boolean; data?: object }[] = [
      { label: 'STORY', sub: storySub, accent: 0xff9a3c, scene: 'story' },
      { label: 'FREE PLAY', sub: 'Up to 6 · bots', accent: 0x4fd1ff, scene: 'menu' },
      { label: 'ONLINE', sub: 'Play with friends', accent: 0x8dff6a, scene: 'lobby' },
      { label: 'PARTY MODES', sub: 'Teams · Rush · Dumpling', accent: 0xffd24a, scene: 'menu', data: { mode: 'teams' } },
      { label: 'DAILY', sub: dailySub(), accent: 0x8dff6a, scene: 'game', data: GameScene.dailyData() },
      { label: 'GAUNTLET', sub: gauntletBest() ? `Best wave ${gauntletBest()}` : 'Solo survival', accent: 0xff5a7a, scene: 'game', data: GameScene.gauntletWave(1, save.pick, { kind: 'local', index: 0 }) },
    ];
    const n = MODES.length, cw = Math.min(290, (1240 - (n - 1) * 14) / n);
    const buttons = MODES.map((m, i) => new Button(this, 20 + cw / 2 + i * (cw + 14), 640, {
      w: cw, h: 104, label: m.label, sub: m.sub, accent: m.accent, size: n > 4 ? 26 : 32, disabled: m.disabled,
      onClick: () => { if (m.scene) go(m.scene, m.data); },
    }));
    // small extras row (top right): keyboard ↑ from the mode cards reaches it
    const EXTRAS: [string, string][] = [['⚙ SETTINGS', 'settings'], ['❓ HELP', 'help'], ['📖 KAIJU', 'gallery'], ['🏆 RECORDS', 'records'], ['🛠 WORKSHOP', 'workshop']];
    const extras = EXTRAS.map(([label, key], i) => new Button(this, 746 + i * 110, 32, { w: 104, h: 40, label, size: 12, accent: 0xcdb9a3, onClick: () => go(key) }, 6));
    this.nav = new FocusNav([...extras, ...buttons], extras.length);
    this.nav.index = extras.length; // start on STORY
    this.add.text(1272, 712, `v${__APP_VERSION__}`, body(11, '#a89680', 700)).setOrigin(1, 1).setDepth(5);
    this.add.text(640, 574, '◀ ▶ choose   ·   ENTER / A / tap to start', body(15, '#f1e4d2', 800)).setOrigin(0.5).setDepth(2).setAlpha(0.85);

    // ?demo=N skips straight into a bot match (attract mode / tests)
    if (Number(new URLSearchParams(location.search).get('demo') ?? 0) >= 2 && !this.registry.get('demoStarted')) this.scene.start('menu');
  }

  /** A bot-only demo match on a random table; any input returns to the title (see GameScene attract). */
  private startAttract(): void {
    const own = owned();
    const pool = own.kaiju.slice().sort(() => Math.random() - 0.5).slice(0, 4);
    this.scene.start('game', {
      slots: pool.map(() => ({ kind: 'bot', index: 0 })), difficulty: 'normal', species: pool,
      tables: [own.tables[Math.floor(Math.random() * own.tables.length)]], rounds: 3, powerups: true, attract: true,
    });
  }

  update(_t: number, delta: number): void {
    const dt = delta / 1000;
    this.t += dt;
    applyPendingUpdate();
    this.art?.setScale(this.art.scaleX * 0 + (1300 / this.art.width) * (1 + Math.sin(this.t * 0.25) * 0.008)); // slow breathing zoom
    this.nav.update(dt);
    this.idle += dt;
    if (navigator.getGamepads && Array.from(navigator.getGamepads()).some(g => g?.buttons.some(b => b.pressed))) this.idle = 0;
    if (ATTRACT_AFTER > 0 && this.idle > ATTRACT_AFTER) { this.idle = 0; this.startAttract(); return; }
    clearTaps();
  }
}
