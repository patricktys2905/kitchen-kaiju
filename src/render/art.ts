// Gemini art: loading + a tiny per-frame sprite pool. Every draw call checks `hasArt` and falls back
// to the shape renderer in draw.ts when an image isn't present.
import * as Phaser from 'phaser';
import type { CutleryKind } from '../sim/cutlery';
import { fontsReady } from './fonts';

let available = new Set<string>();
export const hasArt = (key: string) => available.has(key);

/** Loads public/art/manifest.json, then every image listed in it, then starts the menu. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }
  preload(): void {
    this.load.json('art-manifest', 'art/manifest.json');
    this.load.on('loaderror', () => { /* no art yet: shapes fallback */ });
  }
  create(): void {
    const list = (this.cache.json.get('art-manifest') as string[] | undefined) ?? [];
    // ?mode=free|story|online jumps straight to a mode (handy for tests and shortcuts)
    const mode = new URLSearchParams(location.search).get('mode');
    const first = mode === 'free' ? 'menu' : mode === 'story' ? 'story' : mode === 'online' ? 'lobby' : 'title';
    const go = () => { void fontsReady().then(() => this.scene.start(first)); };
    if (!list.length) { go(); return; }
    const bar = this.add.graphics();
    this.load.on('progress', (v: number) => {
      bar.clear();
      bar.fillStyle(0x3a2c22, 1).fillRoundedRect(440, 350, 400, 20, 10);
      bar.fillStyle(0xffb347, 1).fillRoundedRect(440, 350, 400 * v, 20, 10);
    });
    for (const k of list) this.load.image(k, `art/${k}.webp`);
    this.load.once('complete', () => {
      available = new Set(list.filter(k => this.textures.exists(k)));
      go();
    });
    this.load.start();
  }
}

/** Reuses Image objects frame to frame: begin(), take() as many as needed, end() hides the rest. */
export class SpritePool {
  private items: Phaser.GameObjects.Image[] = [];
  private used = 0;
  constructor(private scene: Phaser.Scene) {}
  begin(): void {
    this.used = 0;
  }
  take(key: string, depth: number): Phaser.GameObjects.Image {
    let img = this.items[this.used];
    if (!img) {
      img = this.scene.add.image(0, 0, key);
      this.items.push(img);
    } else if (img.texture.key !== key) {
      img.setTexture(key);
    }
    this.used++;
    return img.setVisible(true).setDepth(depth).setAlpha(1).setRotation(0).setFlipX(false).setFlipY(false).setOrigin(0.5).clearTint();
  }
  end(): void {
    for (let i = this.used; i < this.items.length; i++) this.items[i].setVisible(false);
  }
}

/** On-table length of each cutlery sprite (matches the old shape sizes). */
export const CUTLERY_LEN: Record<CutleryKind, number> = { fork: 46, spoon: 44, knife: 46, chopstick: 50, ladle: 56, spork: 44 };

/** Fits an image inside a w x h box (keeps aspect). */
export function fitInside(img: Phaser.GameObjects.Image, w: number, h: number): Phaser.GameObjects.Image {
  const s = Math.min(w / img.width, h / img.height);
  return img.setScale(s);
}
