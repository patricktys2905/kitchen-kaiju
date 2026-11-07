// Keyboard + gamepad + touch reading, independent of Phaser so it maps straight onto PlayerInput.
import type { PlayerInput } from './sim/world';
import { readTouch } from './touch';
import { EMOTE_PAD_BUTTONS } from './emotes';

export type Slot = { kind: 'kb' | 'pad' | 'touch' | 'local' | 'remote'; index: number } | { kind: 'bot'; index: number };

export interface DeviceInput extends PlayerInput {
  start: boolean;
}

export const KEYMAPS: { name: string; up: string; down: string; left: string; right: string; throw: string[]; swipe: string[]; dash: string[]; stomp: string[]; hint: string }[] = [
  {
    name: 'Keyboard Left',
    up: 'KeyW', down: 'KeyS', left: 'KeyA', right: 'KeyD',
    throw: ['Space'], swipe: ['KeyF'], dash: ['ShiftLeft'], stomp: ['KeyE'],
    hint: 'WASD move · SPACE throw · F swipe · L-SHIFT dash · E stomp',
  },
  {
    name: 'Keyboard Right',
    up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight',
    throw: ['Enter', 'Numpad0'], swipe: ['Slash', 'Numpad1'], dash: ['ShiftRight', 'Numpad2'], stomp: ['Period', 'Numpad3'],
    hint: 'ARROWS move · ENTER throw · / swipe · R-SHIFT dash · . stomp  (or Numpad 0-3)',
  },
];

const keys: Record<string, boolean> = {};
const tapped = new Set<string>();
const BLOCK = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Slash', 'Tab']);

export function initInput(onFirstGesture: () => void): void {
  window.addEventListener('keydown', e => {
    onFirstGesture();
    keys[e.code] = true;
    if (!e.repeat) tapped.add(e.code);
    if (BLOCK.has(e.code)) e.preventDefault();
  });
  window.addEventListener('keyup', e => { keys[e.code] = false; });
  window.addEventListener('pointerdown', onFirstGesture);
  window.addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
}

/** Lets on-screen buttons trigger the same one-shot actions as keyboard shortcuts. */
export function injectTap(code: string): void {
  tapped.add(code);
}

/** True once per physical key press (consumes it). */
export function consumeTap(code: string): boolean {
  return tapped.delete(code);
}
export function clearTaps(): void {
  tapped.clear();
}

function pads(): (Gamepad | null)[] {
  return navigator.getGamepads ? Array.from(navigator.getGamepads()) : [];
}

export function readSlot(s: Slot): DeviceInput {
  const out: DeviceInput = { mx: 0, my: 0, throw: false, swipe: false, dash: false, stomp: false, start: false };
  if (s.kind === 'touch') return { ...readTouch(), start: false };
  if (s.kind === 'remote') return out; // filled in from the network by GameScene
  if (s.kind === 'local') {
    // Online: one player per device, so any keyboard/gamepad/touch on this device drives them.
    const all = [{ ...readTouch(), start: false }, readSlot({ kind: 'kb', index: 0 }), readSlot({ kind: 'kb', index: 1 }),
      ...pads().map((g, i) => (g ? readSlot({ kind: 'pad', index: i }) : null)).filter((x): x is DeviceInput => !!x)];
    for (const d of all) {
      out.mx += d.mx; out.my += d.my;
      out.throw ||= d.throw; out.swipe ||= d.swipe; out.dash ||= d.dash; out.stomp ||= d.stomp; out.start ||= d.start; out.emote ||= d.emote;
      if (d.aimX !== undefined && out.aimX === undefined) { out.aimX = d.aimX; out.aimY = d.aimY; }
    }
    return out;
  }
  if (s.kind === 'kb') {
    const m = KEYMAPS[s.index];
    out.mx = (keys[m.right] ? 1 : 0) - (keys[m.left] ? 1 : 0);
    out.my = (keys[m.down] ? 1 : 0) - (keys[m.up] ? 1 : 0);
    out.throw = m.throw.some(k => keys[k]);
    out.swipe = m.swipe.some(k => keys[k]);
    out.dash = m.dash.some(k => keys[k]);
    out.stomp = m.stomp.some(k => keys[k]);
  } else if (s.kind === 'pad') {
    const gp = pads()[s.index];
    if (!gp) return out;
    const b = (i: number) => !!gp.buttons[i]?.pressed;
    let mx = gp.axes[0] ?? 0, my = gp.axes[1] ?? 0;
    if (Math.hypot(mx, my) < 0.25) { mx = 0; my = 0; }
    if (b(14)) mx = -1;
    if (b(15)) mx = 1;
    if (b(12)) my = -1;
    if (b(13)) my = 1;
    out.mx = mx;
    out.my = my;
    const ax = gp.axes[2] ?? 0, ay = gp.axes[3] ?? 0;
    if (Math.hypot(ax, ay) > 0.45) { out.aimX = ax; out.aimY = ay; }
    out.throw = b(0) || b(7);
    out.swipe = b(2);
    out.dash = b(1) || b(5);
    out.stomp = b(3) || b(4);
    out.start = b(9);
    out.emote = EMOTE_PAD_BUTTONS.some(b);
  }
  return out;
}

/** Every device that could join right now. */
export function listDevices(): Slot[] {
  const list: Slot[] = [{ kind: 'kb', index: 0 }, { kind: 'kb', index: 1 }];
  pads().forEach((g, i) => { if (g) list.push({ kind: 'pad', index: i }); });
  return list;
}

export function slotLabel(s: Slot): string {
  if (s.kind === 'kb') return KEYMAPS[s.index].name;
  if (s.kind === 'pad') return `Gamepad ${s.index + 1}`;
  if (s.kind === 'touch') return 'Touch screen';
  if (s.kind === 'local') return 'This device';
  if (s.kind === 'remote') return 'Online';
  return 'Bot';
}

export const sameDevice = (a: Slot, b: Slot) => a.kind === b.kind && a.index === b.index;
