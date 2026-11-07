// Keyboard remapping. Overrides are saved on the device and applied on top of KEYMAPS / EMOTE_KEYS.
// EASY TO CUSTOMISE: RESERVED keys can't be bound (they drive menus); ACTIONS lists what can be remapped.
import { EMOTE_KEYS } from './emotes';
import { KEYMAPS } from './input';

export type Action = 'up' | 'down' | 'left' | 'right' | 'throw' | 'swipe' | 'dash' | 'stomp' | 'emote';
export const ACTIONS: { id: Action; label: string }[] = [
  { id: 'up', label: 'Move up' }, { id: 'down', label: 'Move down' }, { id: 'left', label: 'Move left' }, { id: 'right', label: 'Move right' },
  { id: 'throw', label: 'Throw' }, { id: 'swipe', label: 'Swipe' }, { id: 'dash', label: 'Dash' }, { id: 'stomp', label: 'Stomp' }, { id: 'emote', label: 'Emote' },
];
// menu shortcuts: Esc back, P pause, 1 play, 2 bots, B/N bots, M table, R rounds, G mode, U power-ups, H hazards, O online, C cup, X twist
export const RESERVED = new Set(['Escape', 'KeyP', 'Digit1', 'Digit2', 'Tab', 'KeyB', 'KeyN', 'KeyM', 'KeyR', 'KeyG', 'KeyU', 'KeyH', 'KeyO', 'KeyC', 'KeyX']);

const KEY = 'kk-keys-v1';
type Overrides = Record<number, Partial<Record<Action, string>>>;
const DEFAULTS = KEYMAPS.map(m => ({ up: m.up, down: m.down, left: m.left, right: m.right, throw: [...m.throw], swipe: [...m.swipe], dash: [...m.dash], stomp: [...m.stomp] }));
const DEFAULT_EMOTES = [...EMOTE_KEYS];

function load(): Overrides {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Overrides; } catch { return {}; }
}

/** Current key for an action (the first key when an action has several). */
export function keyFor(player: number, a: Action): string {
  if (a === 'emote') return EMOTE_KEYS[player];
  const m = KEYMAPS[player];
  return a === 'up' || a === 'down' || a === 'left' || a === 'right' ? m[a] : m[a][0];
}

/** Applies saved overrides to KEYMAPS and EMOTE_KEYS (call once at start, and after changes). */
export function applyKeybinds(): void {
  const o = load();
  KEYMAPS.forEach((m, i) => {
    const d = DEFAULTS[i], ov = o[i] ?? {};
    m.up = ov.up ?? d.up; m.down = ov.down ?? d.down; m.left = ov.left ?? d.left; m.right = ov.right ?? d.right;
    m.throw = ov.throw ? [ov.throw] : [...d.throw];
    m.swipe = ov.swipe ? [ov.swipe] : [...d.swipe];
    m.dash = ov.dash ? [ov.dash] : [...d.dash];
    m.stomp = ov.stomp ? [ov.stomp] : [...d.stomp];
    EMOTE_KEYS[i] = ov.emote ?? DEFAULT_EMOTES[i];
  });
}

/** Binds a key. If another action (either keyboard player) already uses it, that action swaps to the old key. */
export function bind(player: number, a: Action, code: string): void {
  const o = load();
  const old = keyFor(player, a);
  for (let p = 0; p < KEYMAPS.length; p++) {
    for (const x of ACTIONS) {
      if ((p !== player || x.id !== a) && keyFor(p, x.id) === code) (o[p] ??= {})[x.id] = old;
    }
  }
  (o[player] ??= {})[a] = code;
  try { localStorage.setItem(KEY, JSON.stringify(o)); } catch { /* blocked */ }
  applyKeybinds();
}

export function resetKeybinds(): void {
  try { localStorage.removeItem(KEY); } catch { /* blocked */ }
  applyKeybinds();
}

/** Short on-screen name for a key code ('KeyW' -> 'W', 'ShiftLeft' -> 'L-SHIFT'). */
export function keyLabel(code: string): string {
  const named: Record<string, string> = {
    Space: 'SPACE', Enter: 'ENTER', ShiftLeft: 'L-SHIFT', ShiftRight: 'R-SHIFT', ControlLeft: 'L-CTRL', ControlRight: 'R-CTRL', AltLeft: 'L-ALT', AltRight: 'R-ALT',
    ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→', Slash: '/', Period: '.', Comma: ',', Semicolon: ';', Quote: "'", BracketLeft: '[', BracketRight: ']',
    Backslash: '\\', Minus: '-', Equal: '=', Backquote: '`', Backspace: 'BKSP',
  };
  if (named[code]) return named[code];
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  if (code.startsWith('Numpad')) return 'NUM ' + code.slice(6);
  return code.toUpperCase();
}

/** One-line controls hint for a keyboard player, e.g. "W A S D move · SPACE throw · …". */
export function keyHint(p: number): string {
  const k = (a: Action) => keyLabel(keyFor(p, a));
  return `${k('up')} ${k('left')} ${k('down')} ${k('right')} move · ${k('throw')} throw · ${k('swipe')} swipe · ${k('dash')} dash · ${k('stomp')} stomp · ${k('emote')} emote`;
}
