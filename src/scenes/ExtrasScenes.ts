// Extra screens reached from the title: Settings, How to Play, Kaiju Gallery and Records.
// All text lives in this file or in the data files it reads (settings.ts, stats.ts, modes.ts, cutlery.ts, layouts.ts).
import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps } from '../input';
import { playMusic } from '../music';
import { fitInside, hasArt } from '../render/art';
import { drawFloor } from '../render/draw';
import { body, display, withShadow } from '../render/fonts';
import { Button, FocusNav } from '../render/ui';
import { KITS } from '../sim/powers';
import HEADS from '../render/heads.json';
import { getSettings, LEVELS, setSetting, SETTINGS_ROWS, type Settings } from '../settings';
import { SPECIES } from '../sim/constants';
import { CUTLERY, RARE_KINDS, type CutleryKind } from '../sim/cutlery';
import { LAYOUTS } from '../sim/layouts';
import { enabledModes } from '../sim/modes';
import { enabledMutators } from '../sim/mutators';
import { ACHIEVEMENTS, loadStats } from '../stats';
import { loadStory, totalStars } from '../story/save';
import { needText, owned, UNLOCKS } from '../story/unlocks';
import { isTouchDevice, setTouchMode } from '../touch';
import { currentHat, HAT_FIT, hatArtKey, hatUnlocked, HATS, setHat } from '../hats';
import { GameScene } from './GameScene';
import { exportSave, importSave } from '../backup';
import { ACTIONS, bind, keyFor, keyHint, keyLabel, RESERVED, resetKeybinds, type Action } from '../keybinds';

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
  }

  protected back(): void {
    sfx.leave();
    this.scene.start('title');
  }

  update(_t: number, delta: number): void {
    const dt = delta / 1000;
    this.t += dt;
    if (this.nav.update(dt) === 'back') { this.back(); return; }
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
    SETTINGS_ROWS.forEach((row, i) => {
      const b = new Button(this, 340 + (i % 2) * 600, 132 + Math.floor(i / 2) * 82, { w: 560, h: 72, label: '', sub: row.help, size: 26, onClick: () => { this.cycle(row.key, row.kind); b.setText(this.label(row.key, row.kind, row.label)); } }, 6);
      b.setText(this.label(row.key, row.kind, row.label));
      this.buttons.push(b);
    });
    this.buttons.push(new Button(this, 440, 132 + Math.ceil(SETTINGS_ROWS.length / 2) * 82 - 6, { w: 360, h: 52, label: '⌨ KEYBOARD CONTROLS', size: 20, accent: 0x4fd1ff, onClick: () => { sfx.go(); this.scene.start('controls'); } }, 6));
    this.buttons.push(new Button(this, 840, 132 + Math.ceil(SETTINGS_ROWS.length / 2) * 82 - 6, { w: 360, h: 52, label: '💾 BACK UP / MOVE SAVE', size: 20, accent: 0x8dff6a, onClick: () => this.backupPanel() }, 6));
    this.add.text(640, 706, 'Saved on this device · ENTER / tap to change', body(15, '#cdb9a3', 800)).setOrigin(0.5).setDepth(5);
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
      <div>Your progress (story, stats, unlocks, hats, settings) lives on this device. Copy this code to keep it safe, or paste it on another device.</div>
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
    return `${name}:  ${'■'.repeat(lvl)}${'□'.repeat(LEVELS.length - 1 - lvl)}${lvl === 0 ? '  OFF' : ''}`;
  }

  private cycle(key: keyof Settings, kind: 'level' | 'toggle'): void {
    const v = getSettings()[key];
    if (kind === 'toggle') setSetting(key, !v as never);
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
    this.note = this.add.text(640, 696, 'Pick an action, then press the key you want.', body(15, '#e9dccb', 800)).setOrigin(0.5).setDepth(5);
    this.refresh();
  }

  private refresh(): void {
    ACTIONS.forEach((a, i) => { for (let p = 0; p < 2; p++) this.buttons[i * 2 + p]?.setText(`${a.label}:  ${keyLabel(keyFor(p, a.id))}`); });
  }
}

// ------------------------------------------------------------------ How to play
type HelpPage = 'controls' | 'cutlery' | 'tables' | 'modes';

export class HelpScene extends PanelScene {
  protected title = '❓ HOW TO PLAY';
  protected cols = 4;
  private content: Phaser.GameObjects.GameObject[] = [];
  constructor() { super('help'); }

  protected build(): void {
    const tabs: [HelpPage, string][] = [['controls', 'BASICS'], ['cutlery', 'CUTLERY'], ['tables', 'TABLES'], ['modes', 'MODES']];
    tabs.forEach(([id, name], i) => this.buttons.push(new Button(this, 340 + i * 200, 118, { w: 180, h: 50, label: name, size: 20, onClick: () => this.show(id) }, 6)));
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
      head(90, 170, 'THE GOAL');
      txt(90, 204, 'Be the last kaiju standing on the dinner table. Win rounds to win the match.');
      head(90, 250, 'MOVES');
      txt(90, 284, [
        'THROW: hold to charge, let go to fling your cutlery. A miss STICKS where it lands, so go and grab it (or steal it!).',
        'SWIPE: a close-range smack. It also knocks flying cutlery out of the air.',
        'DASH: a quick dodge. Dash into a rival to shove them; dash into incoming cutlery to catch it.',
        'STOMP: eat crumbs to fill your belly, then STOMP to go KAIJU: giant, unstoppable, squashes everyone. While KAIJU, THROW or SWIPE fires your kaiju\'s own power (see the Gallery).',
        'Shove rivals off the edge, and watch out for each table\'s hazard!',
      ].join('\n'));
      head(90, 470, 'CONTROLS');
      txt(90, 504, [
        `Keyboard left:  ${keyHint(0)}`,
        `Keyboard right: ${keyHint(1)}`,
        'Gamepad: left stick move · right stick aim · A throw · X swipe · B dash · Y stomp · LT/BACK emote',
        'Phone: drag the left side to move · hold THROW and drag to aim · SWIPE / DASH / STOMP buttons · 😜 EMOTE',
      ].join('\n'), 16, '#e9dccb');
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
      const own = owned().tables;
      LAYOUTS.forEach((l, i) => {
        const per = Math.ceil(LAYOUTS.length / 3), col = Math.floor(i / per), row = i % per, x = 40 + col * 410, y = 168 + row * 84;
        const locked = !own.includes(i);
        if (hasArt(l.table)) {
          const img = this.add.image(x + 34, y + 24, l.table).setDisplaySize(64, 36).setDepth(5);
          if (locked) img.setTint(0x333333);
          this.content.push(img);
        }
        this.content.push(this.add.text(x + 76, y + 2, `${locked ? '🔒 ' : ''}${l.name}`, display(17, locked ? '#a89680' : '#ffe9c7', { strokeThickness: 3 })).setDepth(5));
        const u = UNLOCKS.find(q => q.kind === 'table' && q.index === i);
        txt(x + 76, y + 26, locked && u ? needText(u) : l.blurb, 13, locked ? '#a89680' : '#e9dccb', 315);
      });
    } else {
      enabledModes().forEach((m, i) => {
        const y = 160 + i * 92;
        head(90, y, m.name);
        txt(90, y + 34, `${m.blurb}. ${m.howTo}${m.minPlayers > 2 ? ` (${m.minPlayers}+ players; bots fill in.)` : ''}`, 17);
      });
      head(90, 540, 'TWISTS (Free Play / Party Modes [X] · online lobby)');
      txt(90, 572, enabledMutators().filter(m => m.id !== 'none').map(m => `${m.name}: ${m.blurb}`).join(' · '), 13, '#e9dccb');
      txt(90, 694, 'Play these from the PARTY MODES card on the title screen ([G] or tap the mode to change).', 13, '#cdb9a3');
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
  private previewW = 180;
  private previewH = 200;
  constructor() { super('gallery'); }

  protected build(): void {
    const own = owned().kaiju;
    SPECIES.forEach((sp, i) => {
      const x = 104 + (i % 10) * 119, y = 160 + Math.floor(i / 10) * 132;
      const b = new Button(this, x, y, { w: 108, h: 118, label: '', size: 12, accent: sp.color, onClick: () => { this.nav.index = i; this.showDetail(i, true); } }, 6);
      this.buttons.push(b);
      if (hasArt(`kaiju-${i}`)) {
        const img = fitInside(this.add.image(x, y - 6, `kaiju-${i}`), 86, 80).setDepth(8);
        if (!own.includes(i)) img.setTint(0x1a1410);
      }
      this.add.text(x, y + 44, own.includes(i) ? sp.name : '???', body(11, own.includes(i) ? sp.css : '#a89680', 900)).setOrigin(0.5).setDepth(8);
    });
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
        this.hatPreview.setTexture(hatArtKey(cur)).setVisible(true).setScale((fw * 64 * hs) / this.hatPreview.width).setPosition(280 + (hd[0] - 0.5) * this.previewW, this.previewTop + hd[1] * this.previewH + dy * 64 * hs + (cur.id === 'halo' ? Math.sin(this.t * 3) * 3 : 0));
      } else cur.draw(g, 280, 494, 46, this.t);
    }
  }

  private showDetail(i: number, click: boolean): void {
    if (click) sfx.pickup();
    this.shown = i;
    for (const o of this.detail) o.destroy();
    this.detail = [];
    const sp = SPECIES[i], got = owned().kaiju.includes(i), st = loadStats();
    const g = this.add.graphics().setDepth(5);
    g.fillStyle(0x2a1408, 0.95); g.fillRoundedRect(140, 440, 1000, 250, 24);
    g.lineStyle(4, got ? sp.color : 0x5a4a3e, 1); g.strokeRoundedRect(140, 440, 1000, 250, 24);
    this.detail.push(g);
    for (const [k, x] of [[`kaiju-${i}`, 280], [`kaiju-${i}-rage`, 470]] as const) {
      if (!hasArt(k)) continue;
      const img = fitInside(this.add.image(x, 565, k), 180, 200).setDepth(6);
      if (x === 280) { this.previewTop = 565 - img.displayHeight / 2; this.previewW = img.displayWidth; this.previewH = img.displayHeight; }
      if (!got) img.setTint(0x1a1410);
      this.detail.push(img);
    }
    this.detail.push(withShadow(this.add.text(600, 470, got ? sp.full.toUpperCase() : '??? (LOCKED)', display(36, got ? sp.css : '#a89680', { strokeThickness: 6 })).setDepth(6), 3));
    const u = UNLOCKS.find(q => q.kind === 'kaiju' && q.index === i);
    const lines = got
      ? [`A ${sp.food}.`, `🌟 KAIJU power: ${KITS[i].power} — ${KITS[i].blurb}`, `Trait: ${KITS[i].trait}`, '', `Your matches as ${sp.full}: ${st.kaijuPlays[i] ?? 0}`, `Your wins as ${sp.full}: ${st.kaijuWins[i] ?? 0}`, u ? '🎁 Story reward' : '']
      : [u ? `Unlock: ${needText(u)}` : 'Locked', '', 'Left: normal look · right: KAIJU MODE'];
    this.detail.push(this.add.text(600, 525, lines.join('\n'), body(19, '#f1e4d2', 800, { lineSpacing: 6 })).setDepth(6));
  }
}

// ------------------------------------------------------------------ Records + achievements
const PER_PAGE = 18; // achievements per page (2 columns)

export class RecordsScene extends PanelScene {
  protected title = '🏆 RECORDS';
  constructor() { super('records'); }

  protected build(): void {
    const s = loadStats(), story = loadStory();
    const g = this.add.graphics().setDepth(4);
    g.fillStyle(0x2a1408, 0.92); g.fillRoundedRect(40, 100, 420, 590, 22);
    g.lineStyle(3, 0xffb347, 1); g.strokeRoundedRect(40, 100, 420, 590, 22);
    const fav = Object.entries(s.kaijuPlays).sort((a, b) => b[1] - a[1])[0];
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
      ['Tables visited', `${s.tables.length}/${LAYOUTS.length}`],
      ['Favourite kaiju', fav ? SPECIES[Number(fav[0])].full : '–'],
      ['Story stars', `★ ${totalStars(story)}`],
    ];
    withShadow(this.add.text(70, 120, 'YOUR STATS', display(24, '#ffd24a', { strokeThickness: 4 })).setDepth(5), 2);
    rows.forEach(([k, v], i) => {
      this.add.text(70, 160 + i * 41, k, body(18, '#e9dccb', 800)).setDepth(5);
      this.add.text(430, 160 + i * 41, String(v), display(20, '#ffe9c7', { strokeThickness: 3 })).setOrigin(1, 0).setDepth(5);
    });
    this.add.text(250, 670, 'Counts people on this device (not bots).', body(13, '#a89680', 800)).setOrigin(0.5, 1).setDepth(5);

    const done = ACHIEVEMENTS.filter(a => s.achieved.includes(a.id)).length;
    withShadow(this.add.text(500, 108, `ACHIEVEMENTS ${done}/${ACHIEVEMENTS.length}`, display(24, '#ffd24a', { strokeThickness: 4 })).setDepth(5), 2);
    this.drawAch(s, 0);
    if (ACHIEVEMENTS.length > PER_PAGE) this.buttons.push(new Button(this, 1170, 108, { w: 170, h: 40, label: 'PAGE ▶', size: 16, onClick: () => { this.page = (this.page + 1) % Math.ceil(ACHIEVEMENTS.length / PER_PAGE); sfx.pickup(); this.drawAch(s, this.page); } }, 6));
  }

  private page = 0;
  private achObjs: Phaser.GameObjects.GameObject[] = [];
  private drawAch(s: ReturnType<typeof loadStats>, page: number): void {
    for (const o of this.achObjs) o.destroy();
    this.achObjs = [];
    const g = this.add.graphics().setDepth(4);
    this.achObjs.push(g);
    const add = <T extends Phaser.GameObjects.GameObject>(o: T): T => { this.achObjs.push(o); return o; };
    ACHIEVEMENTS.slice(page * PER_PAGE, (page + 1) * PER_PAGE).forEach((a, i) => {
      const col = i % 2, row = Math.floor(i / 2), x = 500 + col * 380, y = 146 + row * 54;
      const got = s.achieved.includes(a.id);
      g.fillStyle(got ? 0x3a2412 : 0x1c1714, 0.95); g.fillRoundedRect(x, y, 365, 48, 12);
      g.lineStyle(2, got ? 0xffd24a : 0x4a3e34, 1); g.strokeRoundedRect(x, y, 365, 48, 12);
      add(this.add.text(x + 12, y + 24, got ? a.icon : '🔒', body(22, '#ffffff', 800)).setOrigin(0, 0.5).setDepth(5).setAlpha(got ? 1 : 0.6));
      add(this.add.text(x + 56, y + 5, a.name, display(15, got ? '#ffe9c7' : '#a89680', { strokeThickness: 3 })).setDepth(5));
      add(this.add.text(x + 56, y + 27, a.desc, body(12, got ? '#8dff6a' : '#a89680', 800)).setDepth(5));
      const pr = !got && a.progress ? a.progress(s) : null;
      if (pr && pr[0] > 0) {
        const k = Math.min(1, pr[0] / pr[1]);
        g.fillStyle(0x000000, 0.5); g.fillRoundedRect(x + 250, y + 30, 100, 8, 4);
        g.fillStyle(0xffb347, 1); g.fillRoundedRect(x + 250, y + 30, Math.max(8, 100 * k), 8, 4);
        add(this.add.text(x + 300, y + 8, `${Math.min(pr[0], pr[1])}/${pr[1]}`, body(12, '#ffcf8a', 900)).setOrigin(0.5, 0).setDepth(5));
      }
    });
  }
}
