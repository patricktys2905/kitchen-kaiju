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

export class TitleScene extends Phaser.Scene {
  private nav!: FocusNav;
  private t = 0;
  private art: Phaser.GameObjects.Image | null = null;

  constructor() {
    super('title');
  }

  create(): void {
    clearTaps();
    setTouchMode('title');
    if (hasArt('bg-title')) this.art = this.add.image(640, 360, 'bg-title').setDisplaySize(1300, 731).setDepth(-2);
    else drawFloor(this.add.graphics());
    // darken the bottom so the mode cards read well
    const g = this.add.graphics().setDepth(-1);
    for (let i = 0; i < 12; i++) { g.fillStyle(0x0d0805, 0.06 * i); g.fillRect(0, 520 + i * 17, 1280, 17); }
    g.fillStyle(0x0d0805, 0.35); g.fillRect(0, 0, 1280, 8);

    const title = this.add.text(320, 70, 'KITCHEN KAIJU', display(68, '#ffe9c7', { strokeThickness: 11, padding: { x: 8, y: 8 } })).setOrigin(0.5).setDepth(2);
    withShadow(withGradient(title, '#fff6cf', '#ffb347'), 8);
    popIn(this, title, 1.3, 700);
    withShadow(this.add.text(320, 124, 'Tiny monsters. Giant dinner.', body(19, '#ffd9a0', 900)).setOrigin(0.5).setDepth(2), 3);

    const save = loadStory();
    const storySub = save.stars.some(s => s) ? `Chapter ${Math.min(save.unlocked, CHAPTERS.length)}/${CHAPTERS.length} · ★ ${totalStars(save)}/${CHAPTERS.length * 3}` : 'Solo campaign · 12 chapters';
    const go = (key: string, data: object = {}) => { sfx.go(); this.time.delayedCall(80, () => this.scene.start(key, data)); };
    const MODES: { label: string; sub: string; accent: number; scene?: string; disabled?: boolean }[] = [
      { label: 'STORY', sub: storySub, accent: 0xff9a3c, scene: 'story' },
      { label: 'FREE PLAY', sub: 'Up to 6 players · bots · any table', accent: 0x4fd1ff, scene: 'menu' },
      { label: 'ONLINE', sub: 'Play with friends anywhere', accent: 0x8dff6a, scene: 'lobby' },
      { label: 'MORE MODES', sub: 'Coming soon!', accent: 0x8a7a6a, disabled: true },
    ];
    const buttons = MODES.map((m, i) => new Button(this, 170 + i * 313, 640, {
      w: 290, h: 104, label: m.label, sub: m.sub, accent: m.accent, size: 32, disabled: m.disabled,
      onClick: () => { if (m.scene) go(m.scene); },
    }));
    this.nav = new FocusNav(buttons, buttons.length);
    this.add.text(1272, 712, `v${__APP_VERSION__}`, body(11, '#a89680', 700)).setOrigin(1, 1).setDepth(5);
    this.add.text(640, 574, '◀ ▶ choose   ·   ENTER / A / tap to start', body(15, '#f1e4d2', 800)).setOrigin(0.5).setDepth(2).setAlpha(0.85);

    // ?demo=N skips straight into a bot match (attract mode / tests)
    if (Number(new URLSearchParams(location.search).get('demo') ?? 0) >= 2 && !this.registry.get('demoStarted')) this.scene.start('menu');
  }

  update(_t: number, delta: number): void {
    const dt = delta / 1000;
    this.t += dt;
    applyPendingUpdate();
    this.art?.setScale(this.art.scaleX * 0 + (1300 / this.art.width) * (1 + Math.sin(this.t * 0.25) * 0.008)); // slow breathing zoom
    this.nav.update(dt);
    clearTaps();
  }
}
