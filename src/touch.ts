// On-screen touch controls (HTML overlay above the canvas so buttons stay thumb-sized at any scale).
// Game: floating joystick (left) + THROW (hold = charge, drag = aim, release = throw), SWIPE, DASH, STOMP.
// Menu / match end: big buttons that inject the same "taps" the keyboard shortcuts use.

export const isTouchDevice =
  new URLSearchParams(location.search).has('touch') || 'ontouchstart' in window || navigator.maxTouchPoints > 0;

type Btn = 'throw' | 'swipe' | 'dash' | 'stomp';
export type TouchMode = 'off' | 'menu' | 'game' | 'watch' | 'end';

const held: Record<Btn, boolean> = { throw: false, swipe: false, dash: false, stomp: false };
const latched: Record<Btn, boolean> = { throw: false, swipe: false, dash: false, stomp: false }; // quick taps between frames
let mx = 0, my = 0;
let aim: { x: number; y: number } | null = null;
let aimClearTimer = 0;
let inject: (code: string) => void = () => {};

export interface TouchRead {
  mx: number; my: number; aimX?: number; aimY?: number;
  throw: boolean; swipe: boolean; dash: boolean; stomp: boolean;
}

/** Current touch controller state (call once per frame). */
export function readTouch(): TouchRead {
  const out: TouchRead = { mx, my, throw: false, swipe: false, dash: false, stomp: false };
  for (const b of ['throw', 'swipe', 'dash', 'stomp'] as Btn[]) {
    out[b] = held[b] || latched[b];
    latched[b] = false;
  }
  if (aim) { out.aimX = aim.x; out.aimY = aim.y; }
  return out;
}

const CSS = `
#tc { position: fixed; inset: 0; pointer-events: none; z-index: 10; font-family: 'Luckiest Guy', 'Arial Black', Impact, sans-serif; letter-spacing: 0.04em; }
#tc .layer { position: absolute; inset: 0; display: none; }
#tc .layer.on { display: block; }
#tc .btn { position: absolute; pointer-events: auto; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: #fff; text-shadow: 0 2px 0 #0008; border: 3px solid #fff6; background: #0006; touch-action: none; box-sizing: border-box; }
#tc .btn.down { background: #fff4; transform: scale(0.94); }
#tc .btn.dim { opacity: 0.35; }
#tc #b-throw { width: 21vmin; height: 21vmin; right: calc(3vmin + env(safe-area-inset-right)); bottom: 4vmin; font-size: 3.6vmin; border-color: #ffcf8a; background: #ff9a3c55; }
#tc #b-dash  { width: 14vmin; height: 14vmin; right: calc(27vmin + env(safe-area-inset-right)); bottom: 3vmin; font-size: 2.8vmin; }
#tc #b-swipe { width: 14vmin; height: 14vmin; right: calc(6vmin + env(safe-area-inset-right)); bottom: 28vmin; font-size: 2.8vmin; }
#tc #b-stomp { width: 13vmin; height: 13vmin; right: calc(23vmin + env(safe-area-inset-right)); bottom: 21vmin; font-size: 2.6vmin; opacity: 0.4; }
#tc #b-stomp.ready { opacity: 1; border-color: #ff3b3b; background: #ff3b3b88; animation: kkpulse 0.5s infinite alternate; }
@keyframes kkpulse { from { transform: scale(1); } to { transform: scale(1.1); } }
#tc #aim { position: absolute; left: 50%; top: 50%; width: 46%; height: 6px; margin-top: -3px; background: #ffcf8a; border-radius: 3px;
  transform-origin: 0 50%; display: none; }
#tc #joyzone { position: absolute; left: 0; bottom: 0; width: 48%; height: 78%; pointer-events: auto; touch-action: none; }
#tc #joybase { position: absolute; width: 26vmin; height: 26vmin; margin: -13vmin 0 0 -13vmin; border-radius: 50%;
  border: 3px solid #fff5; background: #0004; display: none; }
#tc #joyknob { position: absolute; left: 50%; top: 50%; width: 11vmin; height: 11vmin; margin: -5.5vmin 0 0 -5.5vmin; border-radius: 50%; background: #fffa; }
#tc #joyhint { position: absolute; left: calc(4vmin + env(safe-area-inset-left)); bottom: 5vmin; color: #fff7; font-size: 2.6vmin; pointer-events: none; }
#tc .small { position: absolute; pointer-events: auto; padding: 1.2vmin 2vmin; border-radius: 1.5vmin; background: #000a; color: #fff;
  border: 2px solid #fff5; font-size: 2.6vmin; touch-action: none; }
#tc .row { position: absolute; left: 0; right: 0; bottom: calc(2vmin + env(safe-area-inset-bottom)); display: flex; justify-content: center; gap: 2vmin; }
#tc .row .pill { pointer-events: auto; padding: 2vmin 2.2vmin; border-radius: 2vmin; background: #2a1408e6; color: #ffe9c7; border: 3px solid #ffcf8a;
  font-size: 2.6vmin; touch-action: none; white-space: nowrap; }
#tc .row { gap: 1.4vmin; }
#tc .row .pill.go { background: #ff9a3c; color: #2a1408; }
#tc .row .pill.down { transform: scale(0.95); filter: brightness(1.3); }
#tc-rotate { position: fixed; inset: 0; z-index: 20; background: #140e0a; color: #ffe9c7; display: none; align-items: center; justify-content: center;
  flex-direction: column; font-family: 'Luckiest Guy', 'Arial Black', Impact, sans-serif; letter-spacing: 0.04em; font-size: 6vw; text-align: center; gap: 4vw; }
@media (orientation: portrait) { body.touch #tc-rotate { display: flex; } }
`;

let layers: Record<Exclude<TouchMode, 'off'>, HTMLElement> | null = null;
let stompBtn: HTMLElement, throwBtn: HTMLElement, joinPill: HTMLElement, diffPill: HTMLElement, tablePill: HTMLElement, aimEl: HTMLElement;

function el(tag: string, parent: HTMLElement, attrs: Record<string, string> = {}, text = ''): HTMLElement {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (text) e.textContent = text;
  parent.appendChild(e);
  return e;
}

let triedFullscreen = false;
function goFullscreen(): void {
  if (triedFullscreen) return;
  triedFullscreen = true;
  const d = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => void };
  try {
    const p = d.requestFullscreen ? d.requestFullscreen() : (d.webkitRequestFullscreen?.(), undefined);
    Promise.resolve(p)
      .then(() => (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> }).lock?.('landscape'))
      .catch(() => {});
  } catch { /* iOS Safari: no fullscreen API for pages; Add to Home Screen instead */ }
}

/** A hold-able game button. */
function holdButton(b: HTMLElement, key: Btn): void {
  b.addEventListener('pointerdown', e => {
    e.preventDefault();
    b.setPointerCapture(e.pointerId);
    held[key] = true;
    latched[key] = true;
    b.classList.add('down');
    goFullscreen();
  });
  const up = () => { held[key] = false; b.classList.remove('down'); };
  b.addEventListener('pointerup', up);
  b.addEventListener('pointercancel', up);
}

/** A tap button that injects a keyboard-style tap code. */
function tapButton(b: HTMLElement, code: string | (() => void)): void {
  b.addEventListener('pointerdown', e => {
    e.preventDefault();
    b.classList.add('down');
    goFullscreen();
  });
  const up = () => b.classList.remove('down');
  b.addEventListener('pointerup', () => { up(); if (typeof code === 'string') inject(code); else code(); });
  b.addEventListener('pointercancel', up);
}

export function initTouch(injectTap: (code: string) => void): void {
  inject = injectTap;
  if (!isTouchDevice) return;
  document.body.classList.add('touch');
  el('style', document.head).textContent = CSS;
  const rot = el('div', document.body, { id: 'tc-rotate' });
  el('div', rot, {}, '↻');
  el('div', rot, {}, 'Turn your phone sideways');
  const root = el('div', document.body, { id: 'tc' });

  // ---- game layer
  const game = el('div', root, { class: 'layer' });
  const zone = el('div', game, { id: 'joyzone' });
  const base = el('div', zone, { id: 'joybase' });
  const knob = el('div', base, { id: 'joyknob' });
  el('div', game, { id: 'joyhint' }, 'drag here to move');
  let joyId: number | null = null, jx = 0, jy = 0;
  const R = () => Math.min(innerWidth, innerHeight) * 0.13;
  zone.addEventListener('pointerdown', e => {
    if (joyId !== null) return;
    e.preventDefault();
    zone.setPointerCapture(e.pointerId);
    joyId = e.pointerId;
    const r = zone.getBoundingClientRect();
    jx = e.clientX; jy = e.clientY;
    base.style.left = `${e.clientX - r.left}px`;
    base.style.top = `${e.clientY - r.top}px`;
    base.style.display = 'block';
    knob.style.transform = 'translate(0,0)';
    goFullscreen();
  });
  zone.addEventListener('pointermove', e => {
    if (e.pointerId !== joyId) return;
    let dx = e.clientX - jx, dy = e.clientY - jy;
    const d = Math.hypot(dx, dy), r = R();
    if (d > r) { dx = (dx / d) * r; dy = (dy / d) * r; }
    knob.style.transform = `translate(${dx}px,${dy}px)`;
    const k = Math.hypot(dx, dy) / r;
    if (k < 0.15) { mx = 0; my = 0; } else { mx = dx / r; my = dy / r; }
  });
  const joyEnd = (e: PointerEvent) => {
    if (e.pointerId !== joyId) return;
    joyId = null; mx = 0; my = 0;
    base.style.display = 'none';
  };
  zone.addEventListener('pointerup', joyEnd);
  zone.addEventListener('pointercancel', joyEnd);

  throwBtn = el('div', game, { class: 'btn', id: 'b-throw' }, 'THROW');
  aimEl = el('div', throwBtn, { id: 'aim' });
  // THROW: hold to charge; drag away from the button to aim; release to throw.
  let tId: number | null = null, tx = 0, ty = 0;
  throwBtn.addEventListener('pointerdown', e => {
    e.preventDefault();
    throwBtn.setPointerCapture(e.pointerId);
    tId = e.pointerId; tx = e.clientX; ty = e.clientY;
    held.throw = true; latched.throw = true;
    clearTimeout(aimClearTimer);
    aim = null;
    throwBtn.classList.add('down');
    goFullscreen();
  });
  throwBtn.addEventListener('pointermove', e => {
    if (e.pointerId !== tId) return;
    const dx = e.clientX - tx, dy = e.clientY - ty;
    if (Math.hypot(dx, dy) > 16) {
      aim = { x: dx, y: dy };
      aimEl.style.display = 'block';
      aimEl.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    }
  });
  const throwEnd = (e: PointerEvent) => {
    if (e.pointerId !== tId) return;
    tId = null;
    held.throw = false;
    throwBtn.classList.remove('down');
    aimEl.style.display = 'none';
    // keep the dragged aim alive for the release frame(s), then hand aiming back to movement
    aimClearTimer = window.setTimeout(() => { aim = null; }, 150);
  };
  throwBtn.addEventListener('pointerup', throwEnd);
  throwBtn.addEventListener('pointercancel', throwEnd);

  holdButton(el('div', game, { class: 'btn', id: 'b-dash' }, 'DASH'), 'dash');
  holdButton(el('div', game, { class: 'btn', id: 'b-swipe' }, 'SWIPE'), 'swipe');
  stompBtn = el('div', game, { class: 'btn', id: 'b-stomp' }, 'STOMP');
  holdButton(stompBtn, 'stomp');

  // ---- pause/menu (shown while playing or watching)
  const top = el('div', root, { class: 'layer' });
  const pause = el('div', top, { class: 'small', style: 'right: calc(1.5vmin + env(safe-area-inset-right)); top: 12.5vh;' }, '❚❚ PAUSE');
  tapButton(pause, 'KeyP');
  const quit = el('div', top, { class: 'small', style: 'right: calc(1.5vmin + env(safe-area-inset-right)); top: 21vh;' }, '✕ MENU');
  tapButton(quit, 'Escape');

  // ---- menu layer
  const menu = el('div', root, { class: 'layer' });
  const row = el('div', menu, { class: 'row' });
  joinPill = el('div', row, { class: 'pill' }, 'JOIN');
  tapButton(joinPill, 'TouchJoin');
  tapButton(el('div', row, { class: 'pill' }, 'KAIJU ▶'), 'TouchKaiju');
  tapButton(el('div', row, { class: 'pill' }, '+ BOT'), 'KeyB');
  tapButton(el('div', row, { class: 'pill' }, '− BOT'), 'KeyN');
  diffPill = el('div', row, { class: 'pill' }, 'BOTS: NORMAL');
  tapButton(diffPill, 'TouchDiff'); // own code: 'KeyD' is also "next kaiju" for Keyboard Left
  tablePill = el('div', row, { class: 'pill' }, 'TABLE: ALL');
  tapButton(tablePill, 'KeyM');
  tapButton(el('div', row, { class: 'pill go' }, '▶ PLAY'), 'Digit1');

  // ---- match end
  const end = el('div', root, { class: 'layer' });
  const erow = el('div', end, { class: 'row' });
  tapButton(el('div', erow, { class: 'pill go' }, '↻ REMATCH'), 'Digit1');
  tapButton(el('div', erow, { class: 'pill' }, 'MENU'), 'Escape');

  layers = { menu, game, watch: top, end }; // 'game' also turns on the pause/menu buttons (see setTouchMode)
}

let currentMode: TouchMode = 'off';
export function setTouchMode(mode: TouchMode): void {
  if (!layers || mode === currentMode) return;
  currentMode = mode;
  for (const l of Object.values(layers)) l.classList.remove('on');
  held.throw = held.swipe = held.dash = held.stomp = false;
  mx = my = 0;
  aim = null;
  if (mode === 'off') return;
  layers[mode].classList.add('on');
  if (mode === 'game') layers.watch.classList.add('on');
}

let lastHud = '';
export function setTouchHud(h: { stompReady?: boolean; armed?: boolean; joined?: boolean; difficulty?: string; table?: string }): void {
  if (!layers) return;
  const key = JSON.stringify(h);
  if (key === lastHud) return;
  lastHud = key;
  if (h.stompReady !== undefined) stompBtn.classList.toggle('ready', h.stompReady);
  if (h.armed !== undefined) throwBtn.classList.toggle('dim', !h.armed);
  if (h.joined !== undefined) joinPill.textContent = h.joined ? 'LEAVE' : 'JOIN';
  if (h.table !== undefined) tablePill.textContent = `TABLE: ${h.table}`;
  if (h.difficulty !== undefined) diffPill.textContent = `BOTS: ${h.difficulty.toUpperCase()}`;
}
