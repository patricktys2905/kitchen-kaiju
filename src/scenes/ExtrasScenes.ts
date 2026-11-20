// Extra screens reached from the title: Settings, How to Play, Kaiju Gallery and Records.
// All text lives in this file or in the data files it reads (settings.ts, stats.ts, modes.ts, cutlery.ts, layouts.ts).
import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps } from '../input';
import { playMusic } from '../music';
import { fitInside, hasArt, kaijuKey } from '../render/art';
import { drawFloor } from '../render/draw';
import { body, display, popIn, withShadow } from '../render/fonts';
import { Button, FocusNav } from '../render/ui';
import { KITS, powerCooldown, powerReach } from '../sim/powers';
import HEADS from '../render/heads.json';
import { getSettings, LEVELS, setSetting, SETTINGS_ROWS, type Settings } from '../settings';
import { SPECIES } from '../sim/constants';
import { CUTLERY, RARE_KINDS, type CutleryKind } from '../sim/cutlery';
import { LAYOUTS } from '../sim/layouts';
import { enabledModes } from '../sim/modes';
import { enabledMutators } from '../sim/mutators';
import { POWER_DEFS } from '../sim/powerups';
import { HAZARD_INFO } from '../custom';
import { ACHIEVEMENTS, loadStats } from '../stats';
import { loadStory, totalStars } from '../story/save';
import { isEarned, needText, owned, UNLOCKS, tableCount } from '../story/unlocks';
import { isTouchDevice, setTouchMode } from '../touch';
import { currentHat, HAT_FIT, HAT_SCALE, hatArtKey, hatUnlocked, HATS, HATS_ENABLED, setHat } from '../hats';
import { colourUnlocked, COLOURS, currentColour, setColour } from '../colours';
import { GameScene } from './GameScene';
import { exportSave, importSave } from '../backup';
import { totalTrialStars, TRIAL_TOKENS, TRIALS, trialStars } from '../trials';
import { chefsPass, chefsPassText } from '../challengePass';
import { buy, buyShiny, shinyBlock, isShiny, SHINY, chefRank, completeStep, dailyDeal, loadMeta, MASTERY, masteryInfo, pinAchievement, pinnedAchievement, priceOf, SHOP, weeklyOrders, type OrderStat } from '../meta';
import { ACTIONS, bind, keyFor, keyHint, keyLabel, RESERVED, resetKeybinds, type Action } from '../keybinds';
import { bindPad, PAD_MAP, PAD_NAMES, padButtonsDown, padHint, resetPadBinds, type PadAction } from '../input';

/** Shared backdrop, title, BACK button and keyboard/pad focus handling. */
abstract class PanelScene extends Phaser.Scene {
  protected nav!: FocusNav;
  protected buttons: Button[] = [];
  protected t = 0;

  protected abstract title: string;
  protected cols = 1;
  protected abstract build(): void;

  create(): void {
    clearTaps();
    setTouchMode('title');
    playMusic('menu');
    this.buttons = [];
    const bg = hasArt('bg-story') ? 'bg-story' : hasArt('bg-menu') ? 'bg-menu' : null;
    if (bg) this.add.image(640, 360, bg).setDisplaySize(1280, 720).setDepth(-3);
    else drawFloor(this.add.graphics().setDepth(-3));
    this.add.graphics().setDepth(-2).fillStyle(0x0d0805, 0.72).fillRect(0, 0, 1280, 720);
    withShadow(this.add.text(640, 46, this.title, display(44, '#ffcf8a', { strokeThickness: 7 })).setOrigin(0.5).setDepth(5), 4);
    const back = new Button(this, isTouchDevice ? 250 : 92, 46, { w: 150, h: 48, label: '◀ BACK', size: 20, onClick: () => this.back() }, 6);
    this.build();
    this.nav = new FocusNav([...this.buttons, back], this.cols);
    this.afterBuild();
  }
  protected afterBuild(): void { /* screens can pick a starting focus */ }
  protected startData: { show?: number } = {};
  init(data: { show?: number }): void { this.startData = data ?? {}; }

  protected back(): void {
    sfx.leave();
    this.scene.start('title');
  }

  /** An open overlay on this screen closes first on Esc / BACK. Return true if one was closed. */
  protected closeTop(): boolean { return false; }

  update(_t: number, delta: number): void {
    const dt = delta / 1000;
    this.t += dt;
    if (this.nav.update(dt) === 'back') { if (!this.closeTop()) this.back(); return; }
    this.tick(dt);
    clearTaps();
  }

  protected tick(_dt: number): void { /* optional per-frame work */ }
}

// ------------------------------------------------------------------ Settings
export class SettingsScene extends PanelScene {
  protected title = '⚙ SETTINGS';
  protected cols = 2;
  constructor() { super('settings'); }

  protected build(): void {
    // rows shrink to fit however many settings there are (the action buttons + footer always stay on screen)
    const rows = Math.ceil(SETTINGS_ROWS.length / 2), step = Math.min(82, 540 / rows), top = 100;
    SETTINGS_ROWS.forEach((row, i) => {
      const b = new Button(this, 340 + (i % 2) * 600, top + step / 2 + Math.floor(i / 2) * step, { w: 560, h: step - 8, label: '', sub: row.help, size: 26, onClick: () => { this.cycle(row.key, row.kind); b.setText(this.label(row.key, row.kind, row.label)); } }, 6);
      b.setText(this.label(row.key, row.kind, row.label));
      this.buttons.push(b);
    });
    this.buttons.push(new Button(this, 440, top + rows * step + 26, { w: 360, h: 48, label: '⌨ KEYBOARD CONTROLS', size: 20, accent: 0x4fd1ff, onClick: () => { sfx.go(); this.scene.start('controls'); } }, 6));
    this.buttons.push(new Button(this, 840, top + rows * step + 26, { w: 360, h: 48, label: '💾 BACK UP / MOVE SAVE', size: 20, accent: 0x8dff6a, onClick: () => this.backupPanel() }, 6));
    this.add.text(640, 706, isTouchDevice ? 'Saved on this device · tap to change' : 'Saved on this device · ENTER / click to change', body(15, '#cdb9a3', 800)).setOrigin(0.5).setDepth(5);
  }

  /** A small HTML panel: copy your save code, or paste one from another device. */
  private backupPanel(): void {
    sfx.pickup();
    if (document.getElementById('kk-backup')) return;
    const code = exportSave();
    const box = document.createElement('div');
    box.id = 'kk-backup';
    box.style.cssText = 'position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;background:#0d0805cc;font:800 16px Nunito,sans-serif;color:#ffe9c7';
    box.innerHTML = `<div style="background:#2a1408;border:4px solid #8dff6a;border-radius:20px;padding:20px 24px;width:min(640px,92vw)">
      <div style="font:28px 'Luckiest Guy',sans-serif;color:#8dff6a;margin-bottom:6px">💾 Back up / move your save</div>
      <div>Your progress (story, stats, unlocks, colours, settings) lives on this device. Copy this code to keep it safe, or paste it on another device.</div>
      <textarea id="kk-bk-code" readonly style="width:100%;height:90px;margin:10px 0;border-radius:10px;font:12px monospace">${code}</textarea>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button id="kk-bk-copy">Copy my code</button></div>
      <div style="margin-top:14px">Paste a code from another device:</div>
      <textarea id="kk-bk-in" placeholder="KK1-…" style="width:100%;height:70px;margin:8px 0;border-radius:10px;font:12px monospace"></textarea>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button id="kk-bk-load">Load this save</button><button id="kk-bk-close">Close</button></div>
      <div id="kk-bk-msg" style="margin-top:8px;color:#ffd24a"></div></div>`;
    document.body.appendChild(box);
    box.querySelectorAll('button').forEach(b => { b.style.cssText = "font:18px 'Luckiest Guy',sans-serif;padding:8px 16px;border-radius:12px;border:3px solid #ffcf8a;background:#4a2812;color:#ffe9c7;cursor:pointer"; });
    box.querySelectorAll('textarea').forEach(t => t.addEventListener('keydown', e => e.stopPropagation()));
    const msg = box.querySelector('#kk-bk-msg') as HTMLElement;
    const close = () => box.remove();
    this.events.once('shutdown', close);
    (box.querySelector('#kk-bk-close') as HTMLElement).onclick = close;
    (box.querySelector('#kk-bk-copy') as HTMLElement).onclick = async () => {
      const ta = box.querySelector('#kk-bk-code') as HTMLTextAreaElement;
      ta.select();
      try { await navigator.clipboard.writeText(code); msg.textContent = 'Copied! Keep it somewhere safe (a note or a message to yourself).'; } catch { msg.textContent = 'Select the code above and copy it.'; }
    };
    (box.querySelector('#kk-bk-load') as HTMLElement).onclick = () => {
      const n = importSave((box.querySelector('#kk-bk-in') as HTMLTextAreaElement).value);
      if (!n) { msg.textContent = 'That is not a Kitchen Kaiju save code.'; return; }
      msg.textContent = `Loaded ${n} saved items. Restarting…`;
      setTimeout(() => location.reload(), 900);
    };
  }

  private label(key: keyof Settings, kind: 'level' | 'toggle', name: string): string {
    const v = getSettings()[key];
    if (kind === 'toggle') return `${name}:  ${v ? 'ON' : 'OFF'}`;
    let lvl = 0;
    LEVELS.forEach((l, k) => { if (Math.abs(l - (v as number)) < Math.abs(LEVELS[lvl] - (v as number))) lvl = k; });
    return `${name}:  ${'■'.repeat(Math.max(0, lvl))}${'□'.repeat(Math.max(0, LEVELS.length - 1 - lvl))}${lvl === 0 ? '  OFF' : ''}`;
  }

  private cycle(key: keyof Settings, kind: 'level' | 'toggle'): void {
    const v = getSettings()[key];
    if (kind === 'toggle') { setSetting(key, !v as never); if (key === 'kidMode') { sfx.pickup(); this.scene.restart(); return; } } // 🧸 redraw so the bigger text shows straight away
    else {
      // nearest level, so odd saved values still step up instead of jumping to OFF
      let i = 0;
      LEVELS.forEach((l, k) => { if (Math.abs(l - (v as number)) < Math.abs(LEVELS[i] - (v as number))) i = k; });
      setSetting(key, LEVELS[(i + 1) % LEVELS.length] as never);
    }
    sfx.pickup();
  }
}

// ------------------------------------------------------------------ Keyboard controls
export class ControlsScene extends PanelScene {
  protected title = '⌨ KEYBOARD CONTROLS';
  protected cols = 2;
  private waiting: { p: number; a: Action; b: Button } | null = null;
  private note!: Phaser.GameObjects.Text;
  private onKey = (e: KeyboardEvent) => {
    if (!this.waiting) return;
    e.preventDefault();
    e.stopImmediatePropagation(); // keep the game input from also seeing this key
    const w = this.waiting;
    this.waiting = null;
    if (e.code === 'Escape') { this.refresh(); this.note.setText('Cancelled.'); return; }
    if (RESERVED.has(e.code)) { this.refresh(); this.note.setText(`${keyLabel(e.code)} is used by the menus. Pick another key.`); sfx.thwock(); return; }
    bind(w.p, w.a, e.code);
    sfx.pickup();
    this.refresh();
    this.note.setText(`${w.p ? 'Right' : 'Left'} player ${w.a.toUpperCase()} = ${keyLabel(e.code)}. A key already in use swaps over.`);
  };
  constructor() { super('controls'); }

  protected back(): void {
    sfx.leave();
    this.scene.start('settings');
  }

  protected build(): void {
    window.addEventListener('keydown', this.onKey, true);
    this.events.once('shutdown', () => window.removeEventListener('keydown', this.onKey, true));
    ['KEYBOARD LEFT', 'KEYBOARD RIGHT'].forEach((h, p) => withShadow(this.add.text(380 + p * 520, 104, h, display(22, '#ffd24a', { strokeThickness: 4 })).setOrigin(0.5).setDepth(5), 2));
    ACTIONS.forEach((a, i) => {
      for (let p = 0; p < 2; p++) {
        const b = new Button(this, 380 + p * 520, 150 + i * 54, { w: 440, h: 46, label: '', size: 18, accent: p ? 0xff9a3c : 0x4fd1ff, onClick: () => {
          this.refresh();
          this.waiting = { p, a: a.id, b };
          b.setText(`${a.label}:  press a key…`);
          this.note.setText('Press the new key (Esc to cancel).');
        } }, 6);
        this.buttons.push(b);
      }
    });
    // grid order is row-major: [L0, R0, L1, R1, …] matches cols = 2
    this.buttons.push(new Button(this, 640, 650, { w: 300, h: 50, label: '↺ RESET TO DEFAULT', size: 18, onClick: () => { resetKeybinds(); sfx.pickup(); this.refresh(); this.note.setText('Back to the default keys.'); } }, 6));
    this.buttons.push(new Button(this, 1050, 650, { w: 240, h: 50, label: '🎮 GAMEPAD ▶', size: 18, accent: 0x8dff6a, onClick: () => { sfx.go(); this.scene.start('padcontrols'); } }, 6));
    this.note = this.add.text(640, 696, 'Pick an action, then press the key you want.', body(15, '#e9dccb', 800)).setOrigin(0.5).setDepth(5);
    this.refresh();
  }

  private refresh(): void {
    ACTIONS.forEach((a, i) => { for (let p = 0; p < 2; p++) this.buttons[i * 2 + p]?.setText(`${a.label}:  ${keyLabel(keyFor(p, a.id))}`); });
  }
}

// ------------------------------------------------------------------ 🎮 Gamepad button remapping
export class PadControlsScene extends PanelScene {
  protected title = '🎮 GAMEPAD BUTTONS';
  protected cols = 1;
  private waiting: { a: PadAction; b: Button; needRelease: boolean } | null = null;
  private note!: Phaser.GameObjects.Text;
  private rows: { a: PadAction; label: string; b?: Button }[] = [
    { a: 'throw', label: '🍴 Throw (hold to charge)' }, { a: 'swipe', label: '👋 Swipe / parry' }, { a: 'dash', label: '💨 Dash' }, { a: 'stomp', label: '🦖 Stomp (go KAIJU)' }, { a: 'emote', label: '😜 Emote' },
  ];
  constructor() { super('padcontrols'); }
  protected back(): void { sfx.leave(); this.scene.start('controls'); }

  protected build(): void {
    this.add.text(640, 106, 'One layout for every gamepad. Move with the left stick or D-pad, aim with the right stick. START = pause / play.', body(16, '#cdb9a3', 800)).setOrigin(0.5).setDepth(5);
    this.rows.forEach((r, i) => {
      r.b = new Button(this, 640, 176 + i * 70, { w: 640, h: 58, label: '', size: 20, accent: 0x8dff6a, onClick: () => {
        this.refresh();
        this.waiting = { a: r.a, b: r.b!, needRelease: true };
        r.b!.setText(`${r.label}:  press a gamepad button…`);
        this.note.setText('Press the new button on any gamepad (Esc to cancel).');
      } }, 6);
      this.buttons.push(r.b);
    });
    this.buttons.push(new Button(this, 640, 560, { w: 300, h: 50, label: '↺ RESET TO DEFAULT', size: 18, onClick: () => { resetPadBinds(); this.waiting = null; sfx.pickup(); this.refresh(); this.note.setText('Back to the default buttons.'); } }, 6));
    this.note = this.add.text(640, 640, navigator.getGamepads && Array.from(navigator.getGamepads()).some(Boolean) ? 'Pick an action, then press the button you want.' : 'No gamepad found: plug one in (or press any of its buttons) to remap.', body(16, '#e9dccb', 800, { align: 'center', wordWrap: { width: 900 } })).setOrigin(0.5).setDepth(5);
    this.refresh();
  }

  private refresh(): void {
    for (const r of this.rows) r.b?.setText(`${r.label}:  ${PAD_MAP[r.a].map(n => PAD_NAMES[n] ?? `#${n}`).join(' / ')}`);
  }

  protected tick(): void {
    const w = this.waiting;
    if (!w) return;
    const down = padButtonsDown().filter(n => n !== 9 && (n < 12 || n > 15));
    if (w.needRelease) { if (!padButtonsDown().length) w.needRelease = false; return; } // let go of the button that opened this first
    if (!down.length) return;
    bindPad(w.a, down[0]);
    this.waiting = null;
    sfx.pickup();
    this.refresh();
    this.note.setText(`${w.a.toUpperCase()} = ${PAD_NAMES[down[0]] ?? '#' + down[0]}. A button already in use swaps over.`);
  }
}

// ------------------------------------------------------------------ How to play
type HelpPage = 'controls' | 'cutlery' | 'tables' | 'modes' | 'extras';

export class HelpScene extends PanelScene {
  protected title = '❓ HOW TO PLAY';
  protected cols = 4;
  private content: Phaser.GameObjects.GameObject[] = [];
  constructor() { super('help'); }

  protected build(): void {
    const tabs: [HelpPage, string][] = [['controls', 'BASICS'], ['cutlery', 'CUTLERY'], ['tables', 'TABLES'], ['modes', 'MODES'], ['extras', 'EXTRAS']];
    tabs.forEach(([id, name], i) => this.buttons.push(new Button(this, 300 + i * 150, 118, { w: 140, h: 50, label: name, size: 20, onClick: () => { this.nav.index = i; this.show(id); } }, 6)));
    this.buttons.push(new Button(this, 1140, 118, { w: 210, h: 50, label: '▶ PRACTICE', size: 20, accent: 0x8dff6a, onClick: () => { sfx.go(); this.scene.start('game', GameScene.practiceData(loadStory().pick)); } }, 6));
    this.show('controls');
  }

  private show(p: HelpPage): void {
    sfx.pickup();
    for (const o of this.content) o.destroy();
    this.content = [];
    const txt = (x: number, y: number, s: string, size = 18, color = '#f1e4d2', w = 1100) =>
      this.content.push(this.add.text(x, y, s, body(size, color, 800, { wordWrap: { width: w }, lineSpacing: 6 })).setDepth(5));
    const head = (x: number, y: number, s: string, color = '#ffd24a') =>
      this.content.push(withShadow(this.add.text(x, y, s, display(22, color, { strokeThickness: 4 })).setDepth(5), 2));
    if (p === 'controls') {
      txt(90, 158, '🎯 Be the LAST kaiju on the table to win a ROUND. Win enough rounds ("first to 3") to win the MATCH!', 18, '#ffd24a');
      // five picture cards: one move each, one short line
      const CARDS: [string, string, string][] = [
        ['🍴', 'THROW', 'Hold, then let go to fling your cutlery. Go grab it back!'],
        ['👋', 'SWIPE', 'Smack up close. Swipe a flying fork to send it back!'],
        ['💨', 'DASH', 'Zoom! Dodge, or shove a rival.'],
        ['🍪', 'EAT', 'Crumbs fill your belly.'],
        ['🦖', 'STOMP', 'Belly full? Go GIANT and squash everyone!'],
      ];
      const g = this.add.graphics().setDepth(4); this.content.push(g);
      CARDS.forEach(([icon, name, line], k) => {
        const x = 90 + k * 222, y = 196;
        g.fillStyle(0x2a1408, 0.95).fillRoundedRect(x, y, 206, 200, 18).lineStyle(3, 0xffb347, 1).strokeRoundedRect(x, y, 206, 200, 18);
        this.content.push(this.add.text(x + 103, y + 42, icon, body(48, '#ffffff', 900)).setOrigin(0.5).setDepth(5));
        this.content.push(withShadow(this.add.text(x + 103, y + 92, name, display(24, '#ffd24a', { strokeThickness: 4 })).setOrigin(0.5).setDepth(5), 2));
        const t = this.add.text(x + 103, y + 116, line, body(15, '#f1e4d2', 800, { align: 'center', wordWrap: { width: 186 } })).setOrigin(0.5, 0).setDepth(5);
        for (let f = Number(String(t.style.fontSize).replace('px', '')); t.height > 78 && f > 11;) t.setFontSize(--f);
        this.content.push(t);
      });
      txt(90, 410, '✋ The Giant Hand grabs the fullest belly: STOMP first, or DASH as it arrives.   ·   🔴 A red ring = a KAIJU growing: get clear!', 15, '#cdb9a3');
      head(90, 470, 'CONTROLS');
      txt(90, 504, (isTouchDevice ? ['📱 Drag the LEFT side to move', '🍴 Hold THROW (drag to aim), let go to throw', '👋 SWIPE · 💨 DASH · 🦖 STOMP: tap the buttons on the right', '😜 EMOTE: the little face button'] : [
        `Keyboard left:  ${keyHint(0)}`,
        `Keyboard right: ${keyHint(1)}`,
        padHint(),
        'Phone: drag the left side to move · hold THROW and drag to aim · SWIPE / DASH / STOMP buttons · 😜 EMOTE',
      ]).join('\n'), 16, '#e9dccb');
    } else if (p === 'cutlery') {
      (Object.keys(CUTLERY) as CutleryKind[]).forEach((k, i) => {
        const d = CUTLERY[k], x = 110 + (i % 2) * 560, y = 172 + Math.floor(i / 2) * 128;
        if (hasArt(`cut-${k}`)) this.content.push(fitInside(this.add.image(x + 40, y + 44, `cut-${k}`).setRotation(-0.6), 84, 84).setDepth(5));
        head(x + 110, y + 8, d.name.toUpperCase());
        const traits = [
          d.speed >= 900 ? 'very fast' : d.speed <= 560 ? 'slow' : 'quick',
          d.range >= 600 ? 'long range' : d.range <= 400 ? 'short range' : 'medium range',
          d.split > 1 ? `throws ${d.split} at once` : '',
          d.bounces ? `bounces ${d.bounces}× off walls` : '',
          d.returns ? 'comes back like a boomerang' : '',
          d.heavy ? 'HEAVY: keeps going after a hit and shoves loose cutlery' : '',
          RARE_KINDS.includes(k) ? 'rare pickup only' : '',
        ].filter(Boolean).join(' · ');
        txt(x + 110, y + 44, traits, 16, '#e9dccb', 400);
      });
    } else if (p === 'tables') {
      const own = owned().tables, tc = tableCount();
      this.content.push(this.add.text(40, 690, `🍽 You own ${tc.own}/${tc.all} tables (Workshop tables are extra)`, body(15, '#ffd24a', 900)).setOrigin(0, 0.5).setDepth(5));
      const built = LAYOUTS.map((l, i) => ({ l, i })).filter(q => !q.l.custom); // Workshop tables live in the Workshop (they'd add a row that runs off screen)
      built.forEach(({ l, i }, n) => {
        const per = Math.ceil(built.length / 3), col = Math.floor(n / per), row = n % per, x = 40 + col * 410, y = 168 + row * 84;
        const locked = !own.includes(i);
        if (hasArt(l.table)) {
          const img = this.add.image(x + 34, y + 24, l.table).setDisplaySize(64, 36).setDepth(5);
          if (locked) img.setTint(0x333333);
          this.content.push(img);
        }
        this.content.push(this.add.text(x + 76, y + 2, `${locked ? '🔒 ' : ''}${l.name}`, display(17, locked ? '#a89680' : '#ffe9c7', { strokeThickness: 3 })).setDepth(5));
        const u = UNLOCKS.find(q => q.kind === 'table' && q.index === i);
        txt(x + 76, y + 26, locked && u ? needText(u) : l.blurb, 13, locked ? '#a89680' : '#e9dccb', 315);
        { const d = this.content[this.content.length - 1] as Phaser.GameObjects.Text; for (let f = 13; d.height > 50 && f > 10;) d.setFontSize(--f); } // max 2 lines per table
      });
    } else if (p === 'extras') {
      // ⚡ power-ups, twists and hazards, each in one line
      head(60, 160, '🎁 POWER-UPS (switch on in setup)');
      txt(60, 194, Object.values(POWER_DEFS).filter(d => d.enabled).map(d => `${d.short} ${d.name}: ${d.desc}`).join('\n'), 15, '#f1e4d2', 560);
      head(60, 360, '⚠ HAZARDS (one per table)');
      txt(60, 394, ['hand', 'wind', 'cleaver', 'cheese', 'spatula'].map(h => HAZARD_INFO[h]).join('\n'), 14, '#f1e4d2', 560);
      head(660, 160, '⚡ TWISTS (one wacky rule; ⚡⚡ = two)');
      txt(660, 194, enabledMutators().filter(m => m.id !== 'none').map(m => `${m.name}: ${m.blurb}`).join('\n'), 14, '#f1e4d2', 560);
      { const last = this.content[this.content.length - 1] as Phaser.GameObjects.Text; for (let f = 14; last.y + last.height > 690 && f > 10;) last.setFontSize(--f); }
      { const hz = this.content[this.content.length - 3] as Phaser.GameObjects.Text; for (let f = 14; hz.y + hz.height > 690 && f > 10;) hz.setFontSize(--f); }
    } else {
      // flows top to bottom; if it would run off the screen, everything is laid out again a size smaller
      for (let size = 17; size >= 11; size--) {
        for (const o of this.content) o.destroy();
        this.content = [];
        let y = 160;
        const flow = (o: Phaser.GameObjects.Text, gap: number) => { o.setY(y); y += o.height + gap; };
        for (const m of enabledModes()) {
          const h = withShadow(this.add.text(90, y, m.name, display(size + 3, '#ffd24a', { strokeThickness: 4 })).setDepth(5), 2); this.content.push(h); flow(h, 2);
          const t = this.add.text(90, y, `${m.blurb}. ${m.howTo}${m.minPlayers > 2 ? ` (${m.minPlayers}+ players; bots fill in.)` : ''}`, body(size, '#f1e4d2', 800, { wordWrap: { width: 1100 }, lineSpacing: 3 })).setDepth(5); this.content.push(t); flow(t, 8);
        }
        y += 4;
        const th = withShadow(this.add.text(90, y, 'TWISTS (Free Play / Party Modes: the TWIST button)', display(size + 3, '#ffd24a', { strokeThickness: 4 })).setDepth(5), 2); this.content.push(th); flow(th, 2);
        const tw = this.add.text(90, y, enabledMutators().filter(m => m.id !== 'none').map(m => `${m.name}: ${m.blurb}`).join(' · '), body(Math.max(13, size - 3), '#e9dccb', 800, { wordWrap: { width: 1100 }, lineSpacing: 3 })).setDepth(5); this.content.push(tw); flow(tw, 6);
        const ft = this.add.text(90, y, 'Play these from the PARTY MODES card on the title screen (MODE ▶ changes the mode).', body(Math.max(11, size - 4), '#cdb9a3', 800)).setDepth(5); this.content.push(ft); flow(ft, 0);
        if (y <= 708) break;
      }
    }
  }
}

// ------------------------------------------------------------------ Kaiju gallery
const HAT_SLOTS = 13; // hats per page in the Gallery

export class GalleryScene extends PanelScene {
  protected title = '📖 KAIJU GALLERY';
  protected cols = 10;
  private detail: Phaser.GameObjects.GameObject[] = [];
  private shown = -1;
  private hatG!: Phaser.GameObjects.Graphics;
  private hatLabel!: Phaser.GameObjects.Text;
  private hatIcons: (Phaser.GameObjects.Image | null)[] = [];
  private hatPage = 0;
  private slotHat(k: number) { return HATS[this.hatPage * HAT_SLOTS + k]; }
  private hatPreview: Phaser.GameObjects.Image | null = null;
  private previewTop = 470;
  private balText: Phaser.GameObjects.Text | null = null; // 🪙 balance in the header (Shiny costs tokens)
  private previewW = 180;
  private previewH = 200;
  constructor() { super('gallery'); }

  protected afterBuild(): void { const s = this.startData.show; if (s !== undefined && s >= 0 && s < SPECIES.length) this.nav.index = s; }
  protected build(): void {
    this.shown = -1; this.detail = []; // the scene is reused: forget the last visit, or the detail panel never redraws (it showed blank)
    const own = owned().kaiju;
    // collection progress: kaiju, tables and colour styles
    const { all: tAll, own: tOwn } = tableCount(), cOwn = COLOURS.filter(colourUnlocked).length;
    const pct = Math.round(100 * (own.length + tOwn + cOwn) / (SPECIES.length + tAll + COLOURS.length));
    this.balText = this.add.text(1250, 52, `Collection ${pct}% · 🪙 ${loadMeta().tokens}\n🐉 ${own.length}/${SPECIES.length} · 🍽 ${tOwn}/${tAll} · 🎨 ${cOwn}/${COLOURS.length}`, body(17, '#ffd24a', 900, { align: 'right' })).setOrigin(1, 0.5).setDepth(6);
    SPECIES.forEach((sp, i) => {
      const x = 104 + (i % 10) * 119, y = 160 + Math.floor(i / 10) * 132;
      const b = new Button(this, x, y, { w: 108, h: 118, label: '', size: 12, accent: (loadMeta().xp[i] ?? 0) >= MASTERY.levels[4] ? 0xffd24a : sp.color, /* 🖼 gold frame at Mastery Lv 5 */ onClick: () => { this.nav.index = i; this.showDetail(i, true); } }, 6);
      this.buttons.push(b);
      if (hasArt(`kaiju-${i}`)) {
        const img = fitInside(this.add.image(x, y - 6, `kaiju-${i}`), 86, 80).setDepth(8);
        if (!own.includes(i)) img.setTint(0x1a1410);
      }
      { const t = this.add.text(x, y + 44, own.includes(i) ? `${isShiny(i) ? '✨' : ''}${sp.name}` : '???', body(11, own.includes(i) ? sp.css : '#a89680', 900)).setOrigin(0.5).setDepth(8); if (t.width > 100) t.setScale(100 / t.width); } // long names (and Kid Mode text) stay on the tile
    });
    if (!HATS_ENABLED) { this.buildColours(); this.addLabBtn(); return; }
    // hat picker (cosmetic rewards from achievements)
    this.add.text(60, 398, 'YOUR HAT', display(18, '#ffd24a', { strokeThickness: 3 })).setOrigin(0, 0.5).setDepth(6);
    this.hatLabel = this.add.text(1240, 364, '', body(14, '#e9dccb', 800)).setOrigin(1, 0.5).setDepth(6);
    this.hatG = this.add.graphics().setDepth(8);
    this.hatIcons = Array.from({ length: HAT_SLOTS }, (_, k) => this.add.image(210 + k * 76, 398, '__MISSING').setDepth(8).setVisible(false));
    this.hatPreview = this.add.image(0, 0, '__MISSING').setOrigin(0.5, 1).setDepth(7).setVisible(false);
    for (let k = 0; k < HAT_SLOTS; k++) {
      const b = new Button(this, 210 + k * 76, 398, { w: 66, h: 58, label: '', size: 12, accent: 0xffd24a, onClick: () => {
        const h = this.slotHat(k);
        if (!h) return;
        this.nav.index = SPECIES.length + k;
        if (!hatUnlocked(h)) { sfx.thwock(); return; }
        setHat(h.id); sfx.pickup(); this.showDetail(this.shown < 0 ? 0 : this.shown, false);
      } }, 6);
      this.buttons.push(b);
    }
    const pages = Math.ceil(HATS.length / HAT_SLOTS);
    if (pages > 1) this.buttons.push(new Button(this, 1210, 398, { w: 64, h: 58, label: '▶', size: 22, onClick: () => { this.hatPage = (this.hatPage + 1) % pages; sfx.pickup(); } }, 6));
  }

  protected tick(): void {
    const i = this.nav.index;
    if (i < SPECIES.length && i !== this.shown) this.showDetail(i, false);
    if (!HATS_ENABLED) { this.tickColours(i); return; }
    // hat icons (animated) + label for the focused hat
    const g = this.hatG, cur = currentHat();
    g.clear();
    for (let k = 0; k < HAT_SLOTS; k++) {
      const h = this.slotHat(k), x = 210 + k * 76, icon = this.hatIcons[k];
      icon?.setVisible(false);
      if (!h) continue;
      if (h.id === cur.id) { g.lineStyle(3, 0x8dff6a, 1); g.strokeRoundedRect(x - 36, 366, 72, 64, 14); }
      const got = hatUnlocked(h);
      if (icon && hasArt(hatArtKey(h))) fitInside(icon.setTexture(hatArtKey(h)).setVisible(true), 52, 46).setTint(got ? 0xffffff : 0x2a2420);
      else if (got) h.draw(g, x, 414, 22, this.t);
      else { g.fillStyle(0x5a4a3e, 1); g.fillCircle(x, 398, 8); }
    }
    const pageCount = Math.ceil(HATS.length / HAT_SLOTS);
    const hk = i - SPECIES.length;
    const focus = (hk >= 0 && hk < HAT_SLOTS ? this.slotHat(hk) : undefined) ?? cur;
    const u = focus.unlock ? ACHIEVEMENTS.find(a => a.id === focus.unlock) : null;
    this.hatLabel.setText(`${pageCount > 1 ? `Hats ${this.hatPage + 1}/${pageCount} · ` : ''}${hatUnlocked(focus) ? `${focus.name}${focus.id === cur.id ? ' (wearing)' : ''}` : `🔒 ${focus.name}: unlock with "${u?.name}" (${u?.desc})`}`);
    this.hatPreview?.setVisible(false);
    if (this.shown >= 0 && hatUnlocked(cur) && cur.id !== 'none') {
      if (this.hatPreview && hasArt(hatArtKey(cur))) {
        const [fw, dy] = HAT_FIT[cur.id] ?? [1.3, 0.3];
        const hd = (HEADS as unknown as Record<string, number[]>)[`kaiju-${this.shown}`] ?? [0.5, 0.13, 1], hs = hd[2] ?? 1;
        this.hatPreview.setTexture(hatArtKey(cur)).setVisible(true).setScale((fw * HAT_SCALE * (this.previewH / 3.1) * hs) / this.hatPreview.width).setPosition(280 + (hd[0] - 0.5) * this.previewW, this.previewTop + hd[1] * this.previewH + dy * (this.previewH / 3.1) * hs + (cur.id === 'halo' ? Math.sin(this.t * 3) * 3 : 0));
      } else cur.draw(g, 280, 494, 46, this.t);
    }
  }

  /** 🥋 MOVE LAB: try the shown kaiju's KAIJU power with a belly that never empties. */
  private labBtn: Button | null = null;
  private shinyBtn: Button | null = null;
  private shinyArm = -1;
  private addLabBtn(): void {
    this.buttons.push(this.labBtn = new Button(this, 1045, 488, { w: 150, h: 42, label: '🥋 MOVE LAB', sub: 'try its power', size: 15, accent: 0x8dd8ff, onClick: () => {
      const sp = this.shown < 0 ? 0 : this.shown;
      if (!owned().kaiju.includes(sp)) { sfx.thwock(); return; }
      sfx.go(); this.scene.start('game', GameScene.labData(sp));
    } }, 6));
    // ✨ buy this kaiju's Shiny form (a token sink once the Pantry is bought out)
    this.buttons.push(this.shinyBtn = new Button(this, 1045, 640, { w: 150, h: 46, label: '✨ SHINY', sub: `${SHINY.cost} 🪙 · needs Lv ${SHINY.level}`, size: 15, accent: 0xffe27a, onClick: () => {
      const sp = this.shown < 0 ? 0 : this.shown;
      if (isShiny(sp)) { sfx.thwock(); return; }
      const why = shinyBlock(sp); // say why up front, instead of asking to confirm a buy that can't happen
      if (why !== 'ok') { sfx.thwock(); this.shinyBtn?.setText('✨ SHINY', why === 'level' ? `Mastery Lv ${SHINY.level} first` : `${SHINY.cost - loadMeta().tokens} 🪙 short`); return; }
      if (this.shinyArm !== sp) { this.shinyArm = sp; sfx.pickup(); this.shinyBtn?.setText('✨ BUY SHINY?', `tap again: ${SHINY.cost} 🪙`); return; } // a second tap confirms
      this.shinyArm = -1;
      const r = buyShiny(sp);
      if (r === 'ok') { sfx.matchWin(); this.showDetail(sp, false); this.celebrateShiny(sp); return; }
      sfx.thwock();
      this.shinyBtn?.setText('✨ SHINY', r === 'level' ? `needs Mastery Lv ${SHINY.level}` : r === 'tokens' ? `need ${SHINY.cost} 🪙` : 'yours!');
    } }, 6));
  }

  /** ✨ a visible payoff for buying a Shiny: banner, sparkle burst, fresh balance. */
  private celebrateShiny(sp: number): void {
    this.balText?.setText(this.balText.text.replace(/🪙 \d+/, `🪙 ${loadMeta().tokens}`));
    const t = withShadow(this.add.text(640, 560, `✨ SHINY ${SPECIES[sp].name.toUpperCase()}! ✨\nIt sparkles in every match now`, display(30, '#ffe27a', { align: 'center', strokeThickness: 6 })).setOrigin(0.5).setDepth(30), 4);
    popIn(this, t, 1.8, 420);
    this.tweens.add({ targets: t, alpha: 0, delay: 2200, duration: 500, onComplete: () => t.destroy() });
    for (let k = 0; k < 26; k++) {
      const a = (k / 26) * Math.PI * 2, s = this.add.text(280, 560, '✦', display(14 + (k % 3) * 6, k % 2 ? '#ffe27a' : '#ffffff', { strokeThickness: 2 })).setOrigin(0.5).setDepth(29);
      this.tweens.add({ targets: s, x: 280 + Math.cos(a) * (120 + (k % 4) * 30), y: 560 + Math.sin(a) * (90 + (k % 4) * 22), alpha: 0, duration: 900 + (k % 5) * 120, ease: 'Cubic.easeOut', onComplete: () => s.destroy() });
    }
  }

  // ---------------------------------------------------------------- 🎨 colour styles (replaced hats)
  private colIcons: Phaser.GameObjects.Image[] = [];
  private colLocks: Phaser.GameObjects.Text[] = [];
  private colLabel!: Phaser.GameObjects.Text;
  private colG!: Phaser.GameObjects.Graphics;
  private colFor = -1; // which kaiju the swatches currently show
  /** Swatch spacing shrinks as more colours are added so the row never runs into the label. */
  private colStep = Math.min(70, 760 / Math.max(1, COLOURS.length - 1));
  private colX = (k: number) => 214 + k * this.colStep;

  private buildColours(): void {
    this.add.text(60, 398, 'YOUR COLOUR', display(18, '#ffd24a', { strokeThickness: 3 })).setOrigin(0, 0.5).setDepth(6);
    this.colLabel = this.add.text(1036, 398, '', body(13, '#e9dccb', 800, { wordWrap: { width: 210 } })).setOrigin(0, 0.5).setDepth(6);
    this.colG = this.add.graphics().setDepth(8);
    this.colFor = -1; // new images on every visit: draw the swatches again
    this.colIcons = COLOURS.map((_, k) => this.add.image(this.colX(k), 398, '__MISSING').setDepth(8).setVisible(false));
    this.colLocks = COLOURS.map((_, k) => this.add.text(this.colX(k), 398, '🔒', body(this.colStep < 64 ? 18 : 22, '#ffffff', 900)).setOrigin(0.5).setDepth(9).setVisible(false));
    COLOURS.forEach((c, k) => {
      const zone = this.add.zone(this.colX(k), 398, this.colStep - 6, 58).setInteractive().setDepth(10);
      zone.on('pointerover', () => { this.nav.index = SPECIES.length + k; });
      zone.on('pointerup', () => { this.nav.index = SPECIES.length + k; if (!colourUnlocked(c)) { sfx.thwock(); this.flashColLabel(); return; } setColour(c.id); sfx.pickup(); this.showDetail(this.shown < 0 ? 0 : this.shown, false); });
      this.buttons.push(new Button(this, this.colX(k), 398, { w: this.colStep - 6, h: 58, label: '', size: 12, accent: 0xffd24a, onClick: () => {
        this.nav.index = SPECIES.length + k;
        if (!colourUnlocked(c)) { sfx.thwock(); this.flashColLabel(); return; }
        setColour(c.id); sfx.pickup(); this.showDetail(this.shown < 0 ? 0 : this.shown, false);
      } }, 6));
    });
  }

  /** A locked swatch was tapped: make the 'how to earn it' line jump so it's noticed. */
  private flashColLabel(): void {
    this.tweens.killTweensOf(this.colLabel);
    this.colLabel.setScale(1.12).setColor('#ffcf8a');
    this.tweens.add({ targets: this.colLabel, scale: 1, duration: 380, ease: 'Back.easeOut', onComplete: () => this.colLabel.setColor('#e9dccb') });
  }

  private tickColours(i: number): void {
    const cur = currentColour(), sp = this.shown < 0 ? 0 : this.shown;
    if (this.colFor !== sp) {
      this.colFor = sp;
      COLOURS.forEach((c, k) => { if (hasArt(`kaiju-${sp}`)) fitInside(this.colIcons[k].setTexture(kaijuKey(this, sp, c.id)).setVisible(true), Math.min(50, this.colStep - 14), 44); });
    }
    const g = this.colG;
    g.clear();
    COLOURS.forEach((c, k) => {
      const got = colourUnlocked(c);
      this.colIcons[k].setTint(got ? 0xffffff : 0x2a2420);
      if (c.id === cur.id) { g.lineStyle(3, 0x8dff6a, 1); g.strokeRoundedRect(this.colX(k) - this.colStep / 2 + 1, 366, this.colStep - 2, 64, 12); }
      this.colLocks[k]?.setVisible(!got);
    });
    const ck = i - SPECIES.length, focus = ck >= 0 && ck < COLOURS.length ? COLOURS[ck] : cur;
    const u = focus.unlock ? ACHIEVEMENTS.find(a => a.id === focus.unlock) : null;
    const prog = u?.progress ? u.progress(loadStats()) : null;
    const shop = focus.unlock?.startsWith('shop:') ? SHOP.find(it => it.id === focus.unlock!.slice(5)) : null;
    if (shop && !colourUnlocked(focus)) { this.colLabel.setText(`🔒 ${focus.name}: buy it in the 🛒 PANTRY for ${shop.cost} 🪙`); return; }
    this.colLabel.setText(colourUnlocked(focus) ? `${focus.name}${focus.id === cur.id ? ' (wearing)' : ''} · works on every kaiju` : `🔒 ${focus.name}: "${u?.name}": ${u?.desc}${prog ? ` (${Math.min(prog[0], prog[1])}/${prog[1]})` : ''}`);
  }

  private showDetail(i: number, click: boolean): void {
    this.labBtn?.setVisible(i < SPECIES.length && owned().kaiju.includes(i)); // 🥋 only for kaiju you own
    if (click) sfx.pickup();
    this.shown = i;
    for (const o of this.detail) o.destroy();
    this.detail = [];
    if (this.shinyBtn && i < SPECIES.length) { const own = owned().kaiju.includes(i), sh = isShiny(i); this.shinyBtn.setVisible(own); this.shinyBtn.setText(sh ? '✨ SHINY ✔' : '✨ SHINY', sh ? 'on in matches' : `${SHINY.cost} 🪙 · needs Lv ${SHINY.level}`); this.shinyArm = -1; if (sh) this.detail.push(withShadow(this.add.text(600, 444, '✨ SHINY', display(16, '#ffe27a', { strokeThickness: 4 })).setDepth(7), 2)); }
    const sp = SPECIES[i], got = owned().kaiju.includes(i), st = loadStats();
    const g = this.add.graphics().setDepth(5);
    g.fillStyle(0x2a1408, 0.95); g.fillRoundedRect(140, 440, 1000, 250, 24);
    g.lineStyle(4, got ? sp.color : 0x5a4a3e, 1); g.strokeRoundedRect(140, 440, 1000, 250, 24);
    this.detail.push(g);
    for (const [k, x] of [[`kaiju-${i}`, 280], [`kaiju-${i}-rage`, 470]] as const) {
      if (!hasArt(k)) continue;
      const img = fitInside(this.add.image(x, 595, got ? kaijuKey(this, i, currentColour().id, k.endsWith('-rage')) : k), 180, 160).setDepth(6); // leaves room above for a hat
      if (x === 280) { this.previewTop = 595 - img.displayHeight / 2; this.previewW = img.displayWidth; this.previewH = img.displayHeight; }
      if (!got) img.setTint(0x1a1410);
      this.detail.push(img);
    }
    this.detail.push(withShadow(this.add.text(600, 470, got ? sp.full.toUpperCase() : '??? (LOCKED)', display(36, got ? sp.css : '#a89680', { strokeThickness: 6 })).setDepth(6), 3));
    const u = UNLOCKS.find(q => q.kind === 'kaiju' && q.index === i);
    const lines = got
      ? [`A ${sp.food}.`, `🌟 KAIJU power: ${KITS[i].power} — ${KITS[i].blurb} (reach ${Math.round(powerReach(KITS[i]))} · every ${powerCooldown(KITS[i]).toFixed(1)} s)`, `Trait: ${KITS[i].trait}`, `Matches: ${st.kaijuPlays[i] ?? 0}  ·  Wins: ${st.kaijuWins[i] ?? 0}${st.vs?.[i] ? `  ·  📊 You vs it: ${st.vs[i][0]}–${st.vs[i][1] - st.vs[i][0]}` : ''}${u ? `  ·  🎁 ${got ? 'unlocked by playing' : needText(u)}` : ''}`, (() => { const mi = masteryInfo(loadMeta().xp[i] ?? 0); const words = ['sparkles', 'HUD star', 'gold name', 'gold frame', 'crown']; const ladder = words.map((r, k) => `${k + 2 <= mi.level ? '✔' : '🔒'}${r}`).join(' · '); const fill = mi.need ? Math.round(8 * mi.into / mi.need) : 8; return `Mastery Lv ${mi.level} ${mi.title} ${'▰'.repeat(fill)}${'▱'.repeat(8 - fill)}${mi.need ? ` (${mi.into}/${mi.need} XP)` : ' MAX'}\nRewards (Lv 2-6): ${ladder} · ${isShiny(i) ? '✔' : '🔒'}Shiny`; })()]
      : [u ? `Unlock: ${needText(u)}` : 'Locked', '', 'Left: normal look · right: KAIJU MODE'];
    // fit inside the panel (x 600..1115, y 518..680): wrap to the width, then shrink the font until it fits
    const W = 355, H = 156; // right side of the panel holds MOVE LAB + SHINY (a little margin above the border)
    let size = 19;
    const info = this.add.text(600, 518, lines.join('\n'), body(size, '#f1e4d2', 800, { lineSpacing: 5, wordWrap: { width: W } })).setDepth(6);
    while (info.height > H && size > 10) { size--; info.setFontSize(size); if (size <= 13) info.setLineSpacing(2); }
    this.detail.push(info);
  }
}


// ------------------------------------------------------------------ Records + achievements
const PER_PAGE = 18; // most achievements per page (2 columns)
const PAGES = Math.ceil(ACHIEVEMENTS.length / PER_PAGE);
const PER = Math.ceil(ACHIEVEMENTS.length / PAGES); // spread evenly, so no page is nearly empty

export class RecordsScene extends PanelScene {
  protected title = '🏆 RECORDS';
  constructor() { super('records'); }

  protected build(): void {
    const s = loadStats(), story = loadStory();
    const g = this.add.graphics().setDepth(4);
    g.fillStyle(0x2a1408, 0.92); g.fillRoundedRect(40, 100, 420, 590, 22);
    g.lineStyle(3, 0xffb347, 1); g.strokeRoundedRect(40, 100, 420, 590, 22);
    const rows: [string, string | number][] = [
      ['Matches played', s.matches],
      ['Matches won', s.wins],
      ['Win rate', s.matches ? `${Math.round((s.wins / s.matches) * 100)}%` : '–'],
      ['Rounds won', s.roundsWon],
      ['Knockouts', s.kos],
      ['Crumbs eaten', s.crumbs],
      ['Times gone KAIJU', s.kaijuForms],
      ['Best win streak', s.bestStreak],
      ['Gauntlet best wave', s.gauntlet ?? 0],
      ['Trial stars', `★ ${totalTrialStars()}/${TRIALS.length * 3}`],
      ['Party Cups won', s.cups ?? 0],
      ['Tables played on', `${s.tables.filter(i => !LAYOUTS[i]?.custom).length}/${LAYOUTS.filter(l => !l.custom).length}`],
      ['Story stars', `★ ${totalStars(story)}`],
      ['Chef Rank', chefRank(s.achieved.length).title],
      ['Next rank', (() => { const r = chefRank(s.achieved.length); return r.next ? `${r.next} · ${r.rank}/${r.need}` : 'MAX'; })()],
      ['Chef Tokens', `🪙 ${loadMeta().tokens}`],
    ];
    withShadow(this.add.text(70, 120, 'YOUR STATS', display(24, '#ffd24a', { strokeThickness: 4 })).setDepth(5), 2);
    rows.forEach(([k, v], i) => {
      this.add.text(70, 152 + i * 31, k, body(15, '#e9dccb', 800)).setDepth(5);
      this.add.text(430, 152 + i * 31, String(v), display(20, '#ffe9c7', { strokeThickness: 3 })).setOrigin(1, 0).setDepth(5);
    });
    { const t = this.add.text(250, 670, 'Rank pts: 2 per achievement + 1 per kaiju Mastery level.', body(13, '#a89680', 800)).setOrigin(0.5, 1).setDepth(5); if (t.width > 390) t.setScale(390 / t.width); } // inside the stats panel

    const done = ACHIEVEMENTS.filter(a => s.achieved.includes(a.id)).length;
    withShadow(this.add.text(500, 108, `ACHIEVEMENTS ${done}/${ACHIEVEMENTS.length}`, display(24, '#ffd24a', { strokeThickness: 4 })).setDepth(5), 2);
    this.drawAch(s, 0);
    this.buttons.push(new Button(this, 975, 108, { w: 190, h: 40, label: '🎯 GOALS', size: 16, accent: 0x8dff6a, onClick: () => this.toggleGoals() }, 6));
    if (PAGES > 1) { const pb: Button = new Button(this, 1170, 108, { w: 170, h: 40, label: `PAGE 1/${PAGES} · NEXT ▶`, size: 16, onClick: () => { this.page = (this.page + 1) % PAGES; sfx.pickup(); pb.setText(`PAGE ${this.page + 1}/${PAGES} · NEXT ▶`); this.drawAch(s, this.page); } }, 6); this.buttons.push(pb); }
  }

  /** 🎯 GOALS board: the path to 100% (what's left in each collection, and the next step), plus the 3 closest achievements. */
  private goalsUi: (Button | Phaser.GameObjects.GameObject)[] = [];
  protected closeTop(): boolean { if (!this.goalsUi.length) return false; this.toggleGoals(); return true; }
  private toggleGoals(): void {
    if (this.goalsUi.length) { for (const u of this.goalsUi) { if (u instanceof Button) { u.g.destroy(); u.label.destroy(); u.sub?.destroy(); u.zone.destroy(); } else u.destroy(); } this.goalsUi = []; this.buttons.splice(0, this.buttons.length, ...this.buttons.filter(b => b.zone.active)); return; }
    sfx.pickup();
    const s = loadStats(), story = loadStory(), m = loadMeta(), own = owned(), tc = tableCount();
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x000000, 0.65).fillRect(0, 0, 1280, 720).fillStyle(0x140b05, 1).fillRoundedRect(100, 110, 1080, 570, 22).lineStyle(3, 0x8dff6a, 1).strokeRoundedRect(100, 110, 1080, 570, 22);
    const add = <T extends Phaser.GameObjects.GameObject>(o: T): T => { this.goalsUi.push(o); return o; };
    this.goalsUi.push(g, this.add.zone(640, 360, 1280, 720).setInteractive().setDepth(30));
    add(withShadow(this.add.text(640, 140, '🎯 GOALS: your path to 100%', display(30, '#8dff6a', { strokeThickness: 5 })).setOrigin(0.5).setDepth(31), 3));
    const bar = (x: number, y: number, w: number, k: number, col: number) => { g.fillStyle(0x3a2a1e, 1).fillRoundedRect(x, y, w, 10, 5); if (k > 0) g.fillStyle(col, 1).fillRoundedRect(x, y, Math.max(10, w * Math.min(1, k)), 10, 5); };
    const nextLocked = (kind: 'kaiju' | 'table') => UNLOCKS.find(u => u.kind === kind && !isEarned(u, story));
    const colHave = COLOURS.filter(colourUnlocked).length, shinies = (m.shiny ?? []).length, achN = s.achieved.length;
    const rows: [string, number, number, string][] = [
      ['🐉 Kaiju', own.kaiju.length, SPECIES.length, (() => { const u = nextLocked('kaiju'); return u ? `next: ${needText(u)}` : 'all found!'; })()],
      ['🍽 Tables', tc.own, tc.all, (() => { const u = nextLocked('table'); return u ? `next: ${needText(u)}` : 'all found!'; })()],
      ['🎨 Colours', colHave, COLOURS.length, 'from achievements and the 🛒 Pantry'],
      ['✨ Shinies', shinies, SPECIES.length, `Mastery Lv ${SHINY.level} + ${SHINY.cost} 🪙 each (Gallery)`],
      ['🏆 Achievements', achN, ACHIEVEMENTS.length, 'see the closest ones on the right'],
      ['🎯 Trial stars', totalTrialStars(), TRIALS.length * 3, 'CHALLENGES → TRIALS'],
      ['📖 Story stars', totalStars(story), 36, '★★★ = win without losing a round'],
    ];
    add(this.add.text(140, 178, 'COLLECTIONS', display(20, '#ffd24a', { strokeThickness: 3 })).setDepth(31));
    rows.forEach(([name, have, all, hint], k) => {
      const y = 214 + k * 64;
      add(this.add.text(140, y, `${name}  ${have}/${all}`, body(17, have >= all ? '#8dff6a' : '#f1e4d2', 900)).setDepth(31));
      bar(140, y + 26, 420, have / Math.max(1, all), have >= all ? 0x8dff6a : 0xffb347);
      const h = add(this.add.text(140, y + 40, hint, body(13, '#cdb9a3', 800)).setDepth(31)); if (h.width > 440) h.setScale(440 / h.width);
    });
    add(this.add.text(640, 178, 'CLOSEST ACHIEVEMENTS', display(20, '#ffd24a', { strokeThickness: 3 })).setDepth(31));
    const close = ACHIEVEMENTS.filter(a => !s.achieved.includes(a.id) && a.progress).map(a => ({ a, p: a.progress!(s) })).sort((x, y) => y.p[0] / y.p[1] - x.p[0] / x.p[1]).slice(0, 4);
    close.forEach(({ a, p }, k) => {
      const y = 214 + k * 108;
      add(this.add.text(640, y, `${a.icon} ${a.name}  ${Math.min(p[0], p[1])}/${p[1]}`, body(18, '#f1e4d2', 900)).setDepth(31));
      bar(640, y + 28, 390, p[0] / p[1], 0x8dd8ff);
      add(this.add.text(640, y + 44, a.desc, body(14, '#cdb9a3', 800, { wordWrap: { width: 500 } })).setDepth(31));
      const pin = new Button(this, 1100, y + 12, { w: 100, h: 34, label: pinnedAchievement() === a.id ? '📌 PINNED' : '📌 PIN', size: 13, accent: 0x8dd8ff, onClick: () => { pinAchievement(a.id); sfx.pickup(); this.toggleGoals(); this.toggleGoals(); } }, 31);
      this.goalsUi.push(pin); this.buttons.push(pin);
    });
    const x = new Button(this, 1130, 140, { w: 60, h: 44, label: '✖', size: 20, onClick: () => this.toggleGoals() }, 31);
    this.goalsUi.push(x); this.buttons.push(x);
  }

  private page = 0;
  private nextText: Phaser.GameObjects.Text | null = null;
  private achObjs: Phaser.GameObjects.GameObject[] = [];
  private drawAch(s: ReturnType<typeof loadStats>, page: number): void {
    for (const o of this.achObjs) o.destroy();
    this.achObjs = [];
    const g = this.add.graphics().setDepth(4);
    this.achObjs.push(g);
    const add = <T extends Phaser.GameObjects.GameObject>(o: T): T => { this.achObjs.push(o); return o; };
    // the closest unearned achievement you're working towards
    const pin = ACHIEVEMENTS.find(a => a.id === pinnedAchievement() && !s.achieved.includes(a.id));
    const next = pin ? { a: pin, k: pin.progress ? Math.min(1, pin.progress(s)[0] / pin.progress(s)[1]) : 0 } : ACHIEVEMENTS.filter(a => !s.achieved.includes(a.id) && a.progress).map(a => ({ a, k: a.progress!(s)[0] / a.progress!(s)[1] })).sort((p, q) => q.k - p.k)[0];
    this.nextText?.destroy();
    this.nextText = next ? this.add.text(500, 642, `${pin ? '📌 Pinned' : '👉 Next up'}: ${next.a.name} (${Math.round(next.k * 100)}%) — ${next.a.desc}   ·   ${isTouchDevice ? "Tap" : "Click"} any locked one to 📌 pin it (shown on the title + after matches). Each achievement pays 30 🪙.`, body(13, '#ffcf8a', 900, { wordWrap: { width: 740 } })).setOrigin(0, 0).setDepth(5) : null;
    ACHIEVEMENTS.slice(page * PER, (page + 1) * PER).forEach((a, i) => {
      const col = i % 2, row = Math.floor(i / 2), x = 500 + col * 380, y = 146 + row * 54;
      const got = s.achieved.includes(a.id), pinned = pinnedAchievement() === a.id;
      g.fillStyle(got ? 0x3a2412 : pinned ? 0x2a2a12 : 0x1c1714, 0.95); g.fillRoundedRect(x, y, 365, 48, 12);
      g.lineStyle(pinned ? 3 : 2, pinned ? 0x8dd8ff : got ? 0xffd24a : 0x4a3e34, 1); g.strokeRoundedRect(x, y, 365, 48, 12);
      if (!got) { const z = add(this.add.zone(x + 182, y + 24, 365, 48).setInteractive({ useHandCursor: true }).setDepth(6)); z.on('pointerup', () => { pinAchievement(pinned ? null : a.id); sfx.pickup(); this.drawAch(s, page); }); }
      add(this.add.text(x + 12, y + 24, got ? a.icon : pinned ? '📌' : '🔒', body(22, '#ffffff', 800)).setOrigin(0, 0.5).setDepth(5).setAlpha(got ? 1 : 0.6));
      const pr = !got && a.progress ? a.progress(s) : null;
      const name = add(this.add.text(x + 56, y + 5, a.name, display(15, got ? '#ffe9c7' : '#a89680', { strokeThickness: 3 })).setDepth(5));
      const nameRoom = pr ? 176 : 296; // leave room for the progress bar on the title row
      if (name.width > nameRoom) name.setScale(nameRoom / name.width);
      const reward = COLOURS.find(c => c.unlock === a.id);
      // the description always fits inside the card: one line that shrinks, or 2 small lines as a last resort
      const desc = add(this.add.text(x + 56, y + 26, `${a.desc}${reward ? `  ·  🎨 ${reward.name}` : ''}`, body(12, got ? '#8dff6a' : '#a89680', 800)).setDepth(5));
      for (let fsz = 12; desc.width > 298 && fsz > 9;) desc.setFontSize(--fsz);
      if (desc.width > 298) desc.setWordWrapWidth(298).setY(y + 21).setLineSpacing(-3);
      if (pr) { // progress: a small bar + count on the title row, right side
        const k = Math.min(1, pr[0] / pr[1]);
        g.fillStyle(0x000000, 0.5); g.fillRoundedRect(x + 238, y + 12, 70, 7, 3);
        g.fillStyle(0xffb347, 1); g.fillRoundedRect(x + 238, y + 12, Math.max(7, 70 * k), 7, 3);
        const ct = add(this.add.text(x + 356, y + 6, `${Math.min(pr[0], pr[1])}/${pr[1]}`, body(11, '#ffcf8a', 900)).setOrigin(1, 0).setDepth(5));
        if (ct.width > 44) ct.setScale(44 / ct.width);
      }
    });
  }
}

// ------------------------------------------------------------------ 🛒 Pantry: Chef Tokens, Weekly Orders and the shop
export class PantryScene extends PanelScene {
  protected title = '🛒 THE PANTRY';
  protected cols = 2;
  constructor() { super('pantry'); }
  private objs: Phaser.GameObjects.GameObject[] = [];
  private armed = '';
  private disarm: (() => void) | null = null; // puts the previously asked item's label back

  protected build(): void {
    const step = completeStep('pantry');
    if (step) this.time.delayedCall(300, () => { sfx.meterFull(); this.drawShop(); const t = withShadow(this.add.text(640, 92, `🍽 FIRST SERVICE ✔ ${step.text}: +${step.reward} 🪙`, display(18, '#8dff6a', { strokeThickness: 4, backgroundColor: '#0d0805', padding: { x: 10, y: 4 } })).setOrigin(0.5).setDepth(40), 3); popIn(this, t, 1.6, 360); this.tweens.add({ targets: t, alpha: 0, delay: 3500, duration: 500, onComplete: () => t.destroy() }); }); // say where the tokens came from
    const m = loadMeta();
    const g = this.add.graphics().setDepth(4);
    g.fillStyle(0x2a1408, 0.92).fillRoundedRect(40, 100, 470, 590, 22).lineStyle(3, 0xffb347, 1).strokeRoundedRect(40, 100, 470, 590, 22);
    withShadow(this.add.text(70, 118, '📋 WEEKLY ORDERS', display(24, '#ffd24a', { strokeThickness: 4 })).setDepth(5), 2);
    this.add.text(70, 156, 'New orders every Monday. Each one pays 40 🪙.', body(14, '#cdb9a3', 800)).setDepth(5);
    const thisWeek = m.week === undefined ? {} : m.orders;
    weeklyOrders().forEach((o, k) => {
      const y = 196 + k * 100, have = Math.min(o.goal, (thisWeek as Record<OrderStat, number>)[o.stat] ?? 0), done = m.done.includes(o.id);
      g.fillStyle(done ? 0x2f4a1a : 0x1c1714, 0.95).fillRoundedRect(64, y, 422, 84, 14).lineStyle(2, done ? 0x8dff6a : 0x4a3e34, 1).strokeRoundedRect(64, y, 422, 84, 14);
      this.add.text(84, y + 12, (done ? '✔ ' : '') + o.text + (done ? '  +40 🪙 paid' : '  · 40 🪙'), body(18, done ? '#8dff6a' : '#ffe9c7', 900, { wordWrap: { width: 380 } })).setDepth(5);
      g.fillStyle(0x000000, 0.5).fillRoundedRect(84, y + 56, 300, 12, 6).fillStyle(done ? 0x8dff6a : 0xffb347, 1).fillRoundedRect(84, y + 56, Math.max(10, 300 * have / o.goal), 12, 6);
      this.add.text(400, y + 50, `${have}/${o.goal}`, body(16, '#ffcf8a', 900)).setDepth(5);
    });
    this.add.text(70, 520, 'Earn 🪙 Chef Tokens from every match: playing, winning, knockouts, going KAIJU, Gauntlet waves, Daily medals, orders and kaiju Mastery levels.', body(14, '#e9dccb', 800, { wordWrap: { width: 420 }, lineSpacing: 4 })).setDepth(5).setData('fit', 80);
    { const t = this.children.list[this.children.list.length - 1] as Phaser.GameObjects.Text; for (let f = Number(t.style.fontSize.toString().replace('px', '')); t.height > 80 && f > 11;) t.setFontSize(--f); } // max ~3 lines, so it never runs into Chef Rank
    { const r = chefRank(loadStats().achieved.length); this.add.text(70, 606, `Chef Rank: ${r.title}${r.next ? `\nNext: ${r.next} at ${r.need} pts (you have ${r.rank})
(2 pts per achievement, 1 per Mastery level)` : ''}`, display(16, '#ffcf8a', { strokeThickness: 3, lineSpacing: 2 })).setDepth(5); }
    this.drawShop();
  }

  private drawShop(): void {
    for (const o of this.objs) o.destroy();
    this.objs = [];
    for (const b of this.buttons) { b.g.destroy(); b.label.destroy(); b.sub?.destroy(); b.zone.destroy(); }
    this.buttons.length = 0;
    this.disarm = null; this.armed = '';
    const m = loadMeta();
    this.objs.push(withShadow(this.add.text(560, 118, `SHOP · you have 🪙 ${m.tokens}`, display(24, '#ffd24a', { strokeThickness: 4 })).setDepth(5), 2));
    SHOP.forEach((it, k) => {
      const x = 720 + (k % 2) * 360, y = 206 + Math.floor(k / 2) * 112, own = m.owned.includes(it.id), cost = priceOf(it.id), deal = dailyDeal()?.id === it.id, afford = m.tokens >= cost;
      const sub = own ? '✔ OWNED' : `${it.desc}\n🪙 ${cost}${deal ? `  🏷 −30% today` : ''}${afford ? '' : '  (not enough yet)'}`;
      const b = new Button(this, x, y, { w: 340, h: 100, label: `${it.name}`, sub, size: 18, accent: own ? 0x8dff6a : deal ? 0x8dd8ff : afford ? 0xffd24a : 0x6a5a4a, onClick: () => {
        if (own) { sfx.thwock(); return; }
        if (m.tokens < cost) { sfx.thwock(); b.setText(it.name, `need ${cost - m.tokens} more 🪙`); return; }
        if (this.armed !== it.id) { this.disarm?.(); this.armed = it.id; sfx.pickup(); b.setText(`${it.name}?`, `tap again to buy for ${cost} 🪙`); this.disarm = () => b.setText(it.name, sub); return; } // only one item asks at a time
        this.armed = '';
        if (buy(it.id)) { sfx.matchWin(); this.drawShop(); } else sfx.thwock();
      } }, 6);
      this.buttons.push(b);
    });
    this.objs.push(this.add.text(900, 650, 'Colours you buy appear in the 📖 KAIJU Gallery. Gauntlet items work on every new run.', body(13, '#a89680', 800, { align: 'center', wordWrap: { width: 700 } })).setOrigin(0.5).setDepth(5));
    if (this.nav) this.nav = new FocusNav([...this.buttons], 2);
  }
}

// ------------------------------------------------------------------ 🎯 Trials: fixed hard scenarios with 3 stars each
export class TrialsScene extends PanelScene {
  static pick = -1; // -1 = each trial's own kaiju
  protected title = '🎯 TRIALS';
  protected cols = 2;
  constructor() { super('trials'); }
  protected build(): void {
    const stars = trialStars();
    this.add.text(640, 92, `★ win  ·  ★★ win without losing a round  ·  ★★★ also hit the knockout goal  ·  ${TRIAL_TOKENS} 🪙 per new star  ·  total ★ ${totalTrialStars()}/${TRIALS.length * 3}`, body(15, '#cdb9a3', 800)).setOrigin(0.5).setDepth(5);
    this.add.text(640, 120, chefsPassText(), body(14, chefsPass() ? '#8dff6a' : '#ffcf8a', 900, { align: 'center', wordWrap: { width: 1100 } })).setOrigin(0.5).setDepth(5);
    TRIALS.forEach((t, k) => {
      const x = 340 + (k % 2) * 600, y = 196 + Math.floor(k / 2) * 118, s = stars[t.id] ?? 0;
      this.buttons.push(new Button(this, x, y, { w: 570, h: 104, label: `${t.name}   ${'★'.repeat(s)}${'☆'.repeat(Math.max(0, 3 - s))}`, sub: `${t.desc}\n★★★ = win without losing a round + ${t.kos} KOs`, size: 22, accent: s === 3 ? 0xffd24a : s ? 0x8dff6a : 0xffb347, onClick: () => { sfx.go(); this.scene.start('game', GameScene.trialData(t.id, TrialsScene.pick)); } }, 6));
    });
    // 🐉 pick your kaiju for every trial (or keep each trial's own pick)
    const own = owned().kaiju, label = () => (TrialsScene.pick < 0 ? "🐉 YOUR KAIJU: THE TRIAL'S PICK ▶" : `🐉 YOUR KAIJU: ${SPECIES[TrialsScene.pick].name} ▶`);
    const kb: Button = new Button(this, 640, 668, { w: 460, h: 44, label: label(), size: 17, accent: 0x8dd8ff, onClick: () => { const i = own.indexOf(TrialsScene.pick); TrialsScene.pick = i + 1 >= own.length ? -1 : own[i + 1]; sfx.pickup(); kb.setText(label()); } }, 6);
    this.buttons.push(kb);
  }
}
