// Typography: one chunky cartoon display face + one rounded body face, both bundled in public/fonts
// (so they work offline). Every text in the game should use these helpers.
import type * as Phaser from 'phaser';

export const DISPLAY = '"Luckiest Guy", "Arial Black", Impact, sans-serif';
export const BODY = 'Nunito, "Segoe UI", Arial, sans-serif';
export const INK = '#2a1408'; // outline / shadow colour shared by all text

type Style = Phaser.Types.GameObjects.Text.TextStyle;

/** Big chunky headline text (titles, banners, names, popups). */
export function display(size: number, color = '#ffe9c7', extra: Style = {}): Style {
  return { fontFamily: DISPLAY, fontSize: `${size}px`, color, stroke: INK, strokeThickness: Math.max(3, Math.round(size / 9)), ...extra };
}

/** Readable body text. weight: 600 regular, 700 semi-bold, 800 bold, 900 black. */
export function body(size: number, color = '#f1e4d2', weight: 600 | 700 | 800 | 900 = 800, extra: Style = {}): Style {
  return { fontFamily: BODY, fontStyle: String(weight), fontSize: `${size}px`, color, ...extra };
}

/** Soft drop shadow under any text. */
export function withShadow<T extends Phaser.GameObjects.Text>(t: T, dist = 4, blur = 0): T {
  t.setShadow(0, dist, 'rgba(20,8,2,0.75)', blur, true, true);
  return t;
}

/** Vertical gradient fill (top -> bottom). Re-apply after the text changes size. */
export function withGradient<T extends Phaser.GameObjects.Text>(t: T, top: string, bottom: string): T {
  const g = t.context.createLinearGradient(0, 0, 0, t.height);
  g.addColorStop(0.15, top);
  g.addColorStop(0.85, bottom);
  t.setFill(g);
  return t;
}

/** Bouncy "pop" entrance. */
export function popIn(scene: Phaser.Scene, t: Phaser.GameObjects.Text, from = 1.6, ms = 360): void {
  scene.tweens.killTweensOf(t);
  t.setScale(from);
  scene.tweens.add({ targets: t, scale: 1, duration: ms, ease: 'Back.easeOut' });
}

/** Resolves when the bundled fonts are ready (or after a short timeout, so the game never hangs). */
export function fontsReady(timeoutMs = 2500): Promise<void> {
  const load = Promise.all([
    document.fonts.load('40px "Luckiest Guy"'),
    document.fonts.load('800 20px Nunito'),
    document.fonts.load('600 20px Nunito'),
  ]).then(() => undefined);
  return Promise.race([load, new Promise<void>(r => setTimeout(r, timeoutMs))]).catch(() => undefined);
}
