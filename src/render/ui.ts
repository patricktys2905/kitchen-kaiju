// Chunky clickable cards/buttons for the title screen and story map. Work with mouse, touch,
// keyboard (arrows + Enter/Space) and gamepads (D-pad/stick + A).
import * as Phaser from 'phaser';
import { consumeTap, listDevices, readSlot } from '../input';
import { body, display, withShadow } from './fonts';

export interface ButtonOpts {
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: number;
  size?: number;
  disabled?: boolean;
  onClick: () => void;
}

export class Button {
  readonly g: Phaser.GameObjects.Graphics;
  readonly label: Phaser.GameObjects.Text;
  readonly sub: Phaser.GameObjects.Text | null;
  readonly zone: Phaser.GameObjects.Zone;
  focused = false;
  hover = false;
  disabled: boolean;
  private pop = 0;

  constructor(scene: Phaser.Scene, public x: number, public y: number, private o: ButtonOpts, depth = 20) {
    this.disabled = !!o.disabled;
    this.g = scene.add.graphics().setDepth(depth);
    this.label = withShadow(scene.add.text(x, y - (o.sub ? 12 : 0), o.label, display(o.size ?? 30, '#ffe9c7', { strokeThickness: 5 })).setOrigin(0.5).setDepth(depth + 1), 3);
    this.sub = o.sub ? scene.add.text(x, y + 22, o.sub, body(15, '#f1e4d2', 800, { align: 'center' })).setOrigin(0.5).setDepth(depth + 1) : null;
    this.zone = scene.add.zone(x, y, o.w, o.h).setInteractive({ useHandCursor: true }).setDepth(depth + 2);
    this.zone.on('pointerover', () => { this.hover = true; });
    this.zone.on('pointerout', () => { this.hover = false; });
    this.zone.on('pointerup', () => this.press());
    this.draw();
  }

  press(): void {
    if (this.disabled) return;
    this.pop = 1;
    this.o.onClick();
  }

  setText(label: string, sub?: string): this {
    this.label.setText(label);
    if (sub !== undefined) this.sub?.setText(sub);
    return this;
  }

  setVisible(v: boolean): this {
    this.g.setVisible(v); this.label.setVisible(v); this.sub?.setVisible(v);
    if (v) this.zone.setInteractive(); else this.zone.disableInteractive();
    return this;
  }

  update(dt: number): void {
    this.pop = Math.max(0, this.pop - dt * 5);
    this.draw();
  }

  private draw(): void {
    const { w, h } = this.o, accent = this.o.accent ?? 0xffb347, g = this.g;
    const lit = (this.focused || this.hover) && !this.disabled;
    const s = 1 + (lit ? 0.04 : 0) - this.pop * 0.05;
    const W = w * s, H = h * s, x = this.x - W / 2, y = this.y - H / 2;
    g.clear();
    g.fillStyle(0x140b05, 0.85); g.fillRoundedRect(x + 3, y + 7, W, H, 18); // drop shadow
    g.fillStyle(this.disabled ? 0x2a2420 : lit ? 0x4a2812 : 0x2a1408, 0.95); g.fillRoundedRect(x, y, W, H, 18);
    g.lineStyle(lit ? 5 : 3, this.disabled ? 0x5a4a3e : accent, 1); g.strokeRoundedRect(x, y, W, H, 18);
    if (lit) { g.lineStyle(2, 0xffffff, 0.35); g.strokeRoundedRect(x + 6, y + 6, W - 12, H - 12, 13); }
    this.label.setScale(s).setAlpha(this.disabled ? 0.45 : 1);
    this.sub?.setScale(s).setAlpha(this.disabled ? 0.45 : 1);
  }
}

/** Arrow-key / D-pad focus moving across a grid of buttons. */
export class FocusNav {
  index = 0;
  private padPrev = new Map<string, { mx: number; my: number; a: boolean; b: boolean }>();
  constructor(public buttons: Button[], public cols: number) {}

  /** Returns 'back' when Esc / gamepad B was pressed. */
  update(dt: number): 'back' | null {
    let dx = 0, dy = 0, go = false, back = false;
    if (consumeTap('ArrowLeft') || consumeTap('KeyA')) dx = -1;
    if (consumeTap('ArrowRight') || consumeTap('KeyD')) dx = 1;
    if (consumeTap('ArrowUp') || consumeTap('KeyW')) dy = -1;
    if (consumeTap('ArrowDown') || consumeTap('KeyS')) dy = 1;
    if (consumeTap('Enter') || consumeTap('Space') || consumeTap('Digit1') || consumeTap('NumpadEnter')) go = true;
    if (consumeTap('Escape') || consumeTap('Backspace')) back = true;
    for (const d of listDevices()) {
      if (d.kind !== 'pad') continue;
      const inp = readSlot(d), id = 'p' + d.index;
      const mx = inp.mx > 0.6 ? 1 : inp.mx < -0.6 ? -1 : 0, my = inp.my > 0.6 ? 1 : inp.my < -0.6 ? -1 : 0;
      const prev = this.padPrev.get(id) ?? { mx, my, a: true, b: true };
      if (mx && mx !== prev.mx) dx = mx;
      if (my && my !== prev.my) dy = my;
      if ((inp.throw || inp.start) && !prev.a) go = true;
      if (inp.dash && !prev.b) back = true;
      this.padPrev.set(id, { mx, my, a: inp.throw || inp.start, b: inp.dash });
    }
    const n = this.buttons.length;
    if (n) {
      if (dx || dy) {
        let i = this.index;
        for (let tries = 0; tries < n; tries++) {
          i = dy ? (i + dy * this.cols + n) % n : (i + dx + n) % n;
          if (!this.buttons[i].disabled) break;
        }
        this.index = i;
      }
      this.buttons.forEach((b, i) => { b.focused = i === this.index; b.update(dt); });
      if (go) this.buttons[this.index]?.press();
    }
    return back ? 'back' : null;
  }
}
