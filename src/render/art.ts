// Gemini art: loading + a tiny per-frame sprite pool. Every draw call checks `hasArt` and falls back
// to the shape renderer in draw.ts when an image isn't present.
import * as Phaser from 'phaser';
import type { CutleryKind } from '../sim/cutlery';
import { fontsReady } from './fonts';
import { BODY_HUE, colourById } from '../colours';
import { mainHue, recolor } from './recolor';

let available = new Set<string>();
export const hasArt = (key: string) => available.has(key);

/** Loads public/art/manifest.json, then every image listed in it, then starts the menu. */
/** Lines shown while the art loads (in order as it fills). EASY TO CUSTOMISE. */
export const LOADING_LINES = ['Laying the tablecloth…', 'Polishing the cutlery…', 'Waking the kaiju…', 'Warming the toasters…', 'Sharpening the forks…', 'Dinner is almost served…'];

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
    const first = mode === 'free' ? 'menu' : mode === 'story' ? 'story' : mode === 'online' || new URLSearchParams(location.search).has('join') ? 'lobby' : 'title';
    const go = () => { void fontsReady().then(() => this.scene.start(first)); };
    if (!list.length) { go(); return; }
    // loading screen: title, bar, percentage and a rotating "setting the table" line
    const font = (size: number, color: string) => ({ fontFamily: "'Luckiest Guy', 'Arial Black', Impact, sans-serif", fontSize: `${size}px`, color, stroke: '#2a1408', strokeThickness: Math.round(size / 8) });
    this.add.text(640, 250, 'KITCHEN KAIJU', font(72, '#ffe9c7')).setOrigin(0.5);
    const label = this.add.text(640, 410, '', { fontFamily: 'Nunito, sans-serif', fontStyle: '800', fontSize: '20px', color: '#e9dccb' }).setOrigin(0.5);
    const bar = this.add.graphics();
    const lines = LOADING_LINES;
    this.load.on('progress', (v: number) => {
      bar.clear();
      bar.fillStyle(0x3a2c22, 1).fillRoundedRect(440, 350, 400, 22, 11);
      bar.fillStyle(0xffb347, 1).fillRoundedRect(440, 350, Math.max(22, 400 * v), 22, 11);
      label.setText(`${lines[Math.min(lines.length - 1, Math.floor(v * lines.length))]}  ${Math.round(v * 100)}%`);
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
export const CUTLERY_LEN: Record<CutleryKind, number> = { fork: 46, spoon: 44, knife: 46, chopstick: 50, ladle: 56, spork: 44, pizzacutter: 48, rollingpin: 62 };

/** Fits an image inside a w x h box (keeps aspect). */
export function fitInside(img: Phaser.GameObjects.Image, w: number, h: number): Phaser.GameObjects.Image {
  const s = Math.min(w / img.width, h / img.height);
  return img.setScale(s);
}

/**
 * 🎨 The texture key for a kaiju in a colour style ('classic' = the original art). The recoloured copy is made
 * once, the first time it's asked for (src/colours.ts lists the styles; src/render/recolor.ts does the pixels).
 */
export function kaijuKey(scene: Phaser.Scene, species: number, colourId: string | undefined, rage = false): string {
  const base = `kaiju-${species}${rage ? '-rage' : ''}`;
  const c = colourById(colourId);
  if (!c.recipe || !hasArt(base)) return base;
  const key = `${base}~${c.id}`;
  if (available.has(key)) return key;
  try {
    const src = scene.textures.get(base).getSourceImage() as HTMLImageElement | HTMLCanvasElement;
    const cv = document.createElement('canvas');
    cv.width = src.width; cv.height = src.height;
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    if (!ctx) return base;
    ctx.drawImage(src, 0, 0);
    const im = ctx.getImageData(0, 0, cv.width, cv.height);
    recolor(im.data, c.recipe, BODY_HUE[species] ?? mainHue(im.data));
    ctx.putImageData(im, 0, 0);
    scene.textures.addCanvas(key, cv);
    available.add(key);
    return key;
  } catch {
    return base; // e.g. canvas blocked: just show the original colours
  }
}
