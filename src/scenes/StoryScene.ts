// Story mode: chapter map, pre-match dialogue, results with stars, and the ending.
import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps, consumeTap, listDevices, readSlot, type Slot } from '../input';
import { fitInside, hasArt } from '../render/art';
import { drawFloor } from '../render/draw';
import { body, display, popIn, withShadow } from '../render/fonts';
import { Button } from '../render/ui';
import { SPECIES } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { CHAPTERS, chapterRivals, ENDING, SPICY_BUMP, type Line } from '../story/chapters';
import { loadStory, recordResult, recordSpicy, saveStory, totalStars, type StorySave } from '../story/save';
import { setTouchMode } from '../touch';
import { playMusic } from '../music';
import { COURSES, dessertBest } from '../story/dessert';
import { GameScene } from './GameScene';
import { CHAPTER_CUTS, ENDING_CUT, OPENING, seenId, type Cutscene } from '../story/cutscenes';
import { isEarned, needText, newlyEarned, owned, unlockName, UNLOCKS } from '../story/unlocks';

export interface StoryResult {
  chapter: number;
  won: boolean;
  stars: number;
  spicy?: boolean; // a 🌶️ Spicy replay
}

const CARD_W = 178, CARD_H = 112;
/** Chapters snake across 3 rows of 4 (left→right, right→left, left→right). */
function cardPos(i: number): { x: number; y: number } {
  const r = Math.floor(i / 4), c0 = i % 4, c = r % 2 ? 3 - c0 : c0;
  return { x: 112 + c * 200, y: 178 + r * 148 };
}

type Mode = 'map' | 'dialogue' | 'result' | 'ending' | 'cut';

export class StoryScene extends Phaser.Scene {
  private save!: StorySave;
  private sel = 0;
  private mode: Mode = 'map';
  private t = 0;
  private mapG!: Phaser.GameObjects.Graphics;
  private cardImgs: Phaser.GameObjects.Image[] = [];
  private cardTexts: Phaser.GameObjects.Text[] = [];
  private cardZones: Phaser.GameObjects.Zone[] = [];
  private panel: Phaser.GameObjects.GameObject[] = [];
  private pickImg: Phaser.GameObjects.Image | null = null;
  private pickText!: Phaser.GameObjects.Text;
  private pickFood!: Phaser.GameObjects.Text;
  private buttons: Button[] = [];
  private playBtn!: Button;
  private overlay: Phaser.GameObjects.GameObject[] = [];
  private lines: Line[] = [];
  private lineIdx = 0;
  private lineShown = 0;
  private lineText: Phaser.GameObjects.Text | null = null;
  private afterDialogue: () => void = () => {};
  private pendingResult: StoryResult | null = null;
  private padPrev = new Map<string, { mx: number; my: number; a: boolean; b: boolean; y: boolean }>();
  private overlayButtons: Button[] = [];
  private overlayFocus = 0;
  private rewardsBtn: Button | null = null;
  private spicy = false;
  private spicyBtn: Button | null = null;

  constructor() {
    super('story');
  }

  init(data: { result?: StoryResult }): void {
    this.save = loadStory();
    this.pendingResult = data.result ?? null;
    this.sel = Math.min(this.save.unlocked - 1, CHAPTERS.length - 1);
    if (this.pendingResult) this.sel = this.pendingResult.chapter;
    this.mode = 'map';
    this.cardImgs = []; this.cardTexts = []; this.cardZones = []; this.panel = []; this.buttons = []; this.overlay = []; this.overlayButtons = [];
    this.pickImg = null; // objects from a previous visit are destroyed when the scene restarts
    this.lineText = null;
    this.padPrev.clear();
  }

  create(): void {
    clearTaps();
    setTouchMode('title');
    playMusic('story');
    if (hasArt('bg-story')) this.add.image(640, 360, 'bg-story').setDisplaySize(1280, 720).setDepth(-3);
    else drawFloor(this.add.graphics().setDepth(-3));
    this.add.graphics().setDepth(-2).fillStyle(0x0d0805, 0.55).fillRect(0, 0, 1280, 720);
    withShadow(this.add.text(30, 26, 'THE GRAND FEAST', display(40, '#ffcf8a', { strokeThickness: 7 })).setDepth(5), 4);
    this.add.text(34, 78, 'Story mode · conquer every table to win the Golden Spoon', body(15, '#e9dccb', 800)).setDepth(5);
    this.mapG = this.add.graphics().setDepth(1);

    CHAPTERS.forEach((ch, i) => {
      const { x, y } = cardPos(i);
      const key = LAYOUTS[ch.table].table;
      this.cardImgs.push(this.add.image(x, y - 12, hasArt(key) ? key : '__MISSING').setDisplaySize(CARD_W - 16, 62).setDepth(2).setVisible(hasArt(key)));
      this.cardTexts.push(this.add.text(x, y + 34, '', body(13, '#ffe9c7', 900, { align: 'center' })).setOrigin(0.5).setDepth(3));
      const z = this.add.zone(x, y, CARD_W, CARD_H).setInteractive({ useHandCursor: true }).setDepth(4);
      z.on('pointerup', () => { if (this.mode !== 'map') return; if (this.sel === i && i < this.save.unlocked) this.play(); else this.select(i); });
      this.cardZones.push(z);
    });

    // your kaiju (bottom-left)
    const pg = this.add.graphics().setDepth(4);
    pg.fillStyle(0x1c120b, 0.88); pg.fillRoundedRect(18, 582, 456, 128, 18);
    pg.lineStyle(3, 0x6a4a30, 1); pg.strokeRoundedRect(18, 582, 456, 128, 18);
    pg.fillStyle(0x2e1d10, 1); pg.fillCircle(132, 652, 46);
    this.add.text(40, 592, 'YOUR KAIJU', body(13, '#cdb9a3', 900)).setDepth(5);
    this.pickText = withShadow(this.add.text(192, 640, '', display(24, '#ffe9c7', { strokeThickness: 4 })).setOrigin(0, 0.5).setDepth(5), 2);
    this.pickFood = this.add.text(193, 672, '', body(14, '#e9dccb', 800)).setOrigin(0, 0.5).setDepth(5);
    this.buttons.push(new Button(this, 52, 652, { w: 44, h: 64, label: '◀', size: 20, onClick: () => this.cyclePick(-1) }, 6));
    this.buttons.push(new Button(this, 444, 652, { w: 44, h: 64, label: '▶', size: 20, onClick: () => this.cyclePick(1) }, 6));
    this.buttons.push(new Button(this, 575, 676, { w: 170, h: 50, label: '◀ MODES', size: 20, onClick: () => this.back() }, 6));
    const earnedCount = UNLOCKS.filter(u => isEarned(u, this.save)).length;
    this.rewardsBtn = new Button(this, 775, 676, { w: 210, h: 50, label: `🎁 REWARDS ${earnedCount}/${UNLOCKS.length}`, size: 18, accent: 0xffd24a, onClick: () => this.showRewards() }, 6);
    this.buttons.push(this.rewardsBtn);
    this.add.text(1070, 712, 'arrows choose · ENTER play · Q / E kaiju · Esc back', body(12, '#a89680', 700)).setOrigin(0.5, 1).setDepth(5);

    this.playBtn = new Button(this, 1070, 640, { w: 330, h: 74, label: '▶ PLAY', size: 34, accent: 0xff9a3c, onClick: () => this.play() }, 6);
    this.drawMap();
    this.drawPanel();
    this.drawPick();

    this.buttons.push(new Button(this, 640, 50, { w: 200, h: 44, label: '🎬 OPENING', size: 18, accent: 0xffd24a, onClick: () => { if (this.mode === 'map') { sfx.pickup(); this.playCut(OPENING, () => {}); } } }, 6));
    // 🍰 Dessert Course: post-game, after the ending
    if (this.save.endingSeen) {
      const done = dessertBest(), next = done >= COURSES.length ? 0 : done;
      this.buttons.push(new Button(this, 905, 50, { w: 250, h: 44, label: `🍰 DESSERT ${done}/${COURSES.length}`, size: 17, accent: 0xff7ad9, onClick: () => {
        if (this.mode !== 'map') return;
        sfx.go();
        this.scene.start('game', GameScene.dessertData(next, this.save.pick));
      } }, 6));
    }
    this.spicyBtn = new Button(this, 1070, 518, { w: 240, h: 36, label: '', size: 15, accent: 0xff5a1a, onClick: () => this.toggleSpicy() }, 6);
    this.buttons.push(this.spicyBtn);
    this.drawPanel(); // fills in the SPICY button label
    this.buttons.push(new Button(this, 1172, 560, { w: 150, h: 38, label: '🎬 SCENE', size: 16, onClick: () => this.watchScene() }, 6));

    if (this.pendingResult) this.showResult(this.pendingResult);
    else if (!this.save.cuts.includes(seenId(OPENING))) this.time.delayedCall(250, () => this.playCut(OPENING, () => {}));
  }

  private toggleSpicy(): void {
    if (this.mode !== 'map' || !(this.save.stars[this.sel] > 0)) { sfx.thwock(); return; }
    this.spicy = !this.spicy;
    sfx.pickup();
    this.drawPanel();
  }

  /** Replays the selected chapter's cutscene (or the opening for a locked chapter). */
  private watchScene(): void {
    if (this.mode !== 'map') return;
    sfx.pickup();
    if (this.sel < this.save.unlocked) this.playCut(CHAPTER_CUTS[this.sel], () => {});
  }

  // ---------------------------------------------------------------- map
  private select(i: number): void {
    if (i === this.sel) return;
    this.sel = i;
    sfx.pickup();
    this.drawMap();
    this.drawPanel();
  }

  private cyclePick(dir: number): void {
    const own = owned(this.save).kaiju;
    const at = own.indexOf(this.save.pick);
    this.save.pick = own[((at < 0 ? 0 : at) + dir + own.length) % own.length];
    saveStory(this.save);
    sfx.pickup();
    this.drawPick();
    this.drawPanel();
  }

  private drawPick(): void {
    const sp = SPECIES[this.save.pick];
    if (!this.pickImg) this.pickImg = this.add.image(132, 652, '__MISSING').setDepth(5);
    if (hasArt(`kaiju-${this.save.pick}`)) fitInside(this.pickImg.setTexture(`kaiju-${this.save.pick}`).setVisible(true), 86, 82);
    else this.pickImg.setVisible(false);
    this.pickText.setText(sp.full.toUpperCase()).setColor(sp.css).setScale(1);
    if (this.pickText.width > 220) this.pickText.setScale(220 / this.pickText.width); // long names shrink instead of hitting the arrow
    this.pickFood.setText(sp.food);
  }

  private drawMap(): void {
    const g = this.mapG, t = this.t;
    g.clear();
    // the path between chapters
    for (let i = 0; i < CHAPTERS.length - 1; i++) {
      const a = cardPos(i), b = cardPos(i + 1), done = i + 1 < this.save.unlocked;
      g.lineStyle(10, 0x000000, 0.35); g.lineBetween(a.x, a.y + 4, b.x, b.y + 4);
      g.lineStyle(6, done ? 0xffb347 : 0x5a4a3e, 1); g.lineBetween(a.x, a.y, b.x, b.y);
    }
    CHAPTERS.forEach((ch, i) => {
      const { x, y } = cardPos(i), open = i < this.save.unlocked, stars = this.save.stars[i] ?? 0, selected = i === this.sel;
      const s = selected ? 1.06 + Math.sin(t * 5) * 0.015 : 1, W = CARD_W * s, H = CARD_H * s;
      g.fillStyle(0x000000, 0.5); g.fillRoundedRect(x - W / 2 + 4, y - H / 2 + 7, W, H, 14);
      g.fillStyle(open ? 0x2a1408 : 0x1c1714, 0.96); g.fillRoundedRect(x - W / 2, y - H / 2, W, H, 14);
      g.lineStyle(selected ? 5 : 3, selected ? 0xffe08a : ch.boss ? 0xff5a4a : open ? 0xffb347 : 0x4a3e34, 1);
      g.strokeRoundedRect(x - W / 2, y - H / 2, W, H, 14);
      this.cardImgs[i].setAlpha(open ? 1 : 0.25).setScale(this.cardImgs[i].scaleX, this.cardImgs[i].scaleY);
      // stars
      for (let k = 0; k < 3; k++) {
        const sx = x + 44 + k * 18 - 18, sy = y - H / 2 + 14;
        g.fillStyle(k < stars ? 0xffd24a : 0x3a2c22, 1);
        const pts: { x: number; y: number }[] = [];
        for (let q = 0; q < 10; q++) { const r = q % 2 ? 3 : 7.5, a = (q / 10) * Math.PI * 2 - Math.PI / 2; pts.push({ x: sx + Math.cos(a) * r, y: sy + Math.sin(a) * r }); }
        g.fillPoints(pts as unknown as Phaser.Math.Vector2[], true);
      }
      if (!open) { // padlock
        g.fillStyle(0xcdb9a3, 1); g.fillRoundedRect(x - 12, y - 18, 24, 20, 4);
        g.lineStyle(4, 0xcdb9a3, 1); g.beginPath(); g.arc(x, y - 18, 8, Math.PI, 0); g.strokePath();
      }
      this.cardTexts[i].setText(`${i + 1}. ${ch.title}${ch.boss ? '  👑' : ''}${(this.save.spicy?.[i] ?? 0) > 0 ? ' 🌶️' : ''}`).setAlpha(open ? 1 : 0.45);
    });
  }

  private drawPanel(): void {
    for (const o of this.panel) o.destroy();
    this.panel = [];
    const ch = CHAPTERS[this.sel], open = this.sel < this.save.unlocked, L = LAYOUTS[ch.table];
    const g = this.add.graphics().setDepth(4);
    g.fillStyle(0x140b05, 0.88); g.fillRoundedRect(890, 110, 360, 490, 20);
    g.lineStyle(3, ch.boss ? 0xff5a4a : 0xffb347, 1); g.strokeRoundedRect(890, 110, 360, 490, 20);
    this.panel.push(g);
    const add = <T extends Phaser.GameObjects.GameObject>(o: T) => { this.panel.push(o); return o; };
    add(this.add.text(1070, 136, `CHAPTER ${this.sel + 1}${ch.boss ? (this.sel === CHAPTERS.length - 1 ? ' · FINAL BOSS' : ' · BOSS') : ''}`, body(15, ch.boss ? '#ff8a7a' : '#ffcf8a', 900)).setOrigin(0.5).setDepth(5));
    add(withShadow(this.add.text(1070, 168, ch.title.toUpperCase(), display(28, '#ffe9c7', { strokeThickness: 5, align: 'center', wordWrap: { width: 330 } })).setOrigin(0.5, 0).setDepth(5), 3));
    add(this.add.text(1070, 214, `${L.name} · first to ${ch.rounds} rounds`, body(14, '#e9dccb', 800)).setOrigin(0.5, 0).setDepth(5));
    if (!open) {
      add(this.add.text(1070, 360, '🔒\nBeat the chapter before\nto unlock this one.', body(18, '#cdb9a3', 800, { align: 'center' })).setOrigin(0.5).setDepth(5));
      this.playBtn.disabled = true;
      return;
    }
    this.playBtn.disabled = false;
    add(this.add.text(1070, 244, 'RIVALS', body(13, '#cdb9a3', 900)).setOrigin(0.5, 0).setDepth(5));
    const rivals = chapterRivals(ch, this.save.pick);
    rivals.forEach((r, k) => {
      const x = 1070 + (k - (rivals.length - 1) / 2) * 108;
      if (hasArt(`kaiju-${r.species}`)) add(fitInside(this.add.image(x, 300, `kaiju-${r.species}`), 84, 72).setDepth(5));
      add(this.add.text(x, 344, SPECIES[r.species].name + (r.boss ? '\n👑 BOSS' : `\n${r.level}`), body(12, r.boss ? '#ff8a7a' : SPECIES[r.species].css, 900, { align: 'center' })).setOrigin(0.5, 0).setDepth(5));
    });
    add(this.add.text(1070, 392, '“' + ch.tip + '”', body(14, '#ffe9c7', 700, { align: 'center', wordWrap: { width: 320 }, fontStyle: 'italic 700' })).setOrigin(0.5, 0).setDepth(5));
    const best = this.save.stars[this.sel] ?? 0;
    const hot = this.save.spicy?.[this.sel] ?? 0;
    add(this.add.text(1000, 560, best ? `Best: ${'★'.repeat(best)}${'☆'.repeat(3 - best)}${hot ? `  🌶️${hot}` : ''}` : 'Not cleared yet', body(16, '#ffd24a', 900)).setOrigin(0.5).setDepth(5));
    this.spicyBtn?.setText(best ? `🌶️ SPICY: ${this.spicy ? 'ON (tougher rivals)' : 'OFF'}` : '🌶️ SPICY: clear it first');
    if (this.spicyBtn) this.spicyBtn.disabled = !best;
  }

  // ---------------------------------------------------------------- flow
  private back(): void {
    sfx.leave();
    this.scene.start('title');
  }

  private play(): void {
    if (this.mode !== 'map' || this.sel >= this.save.unlocked) return;
    sfx.go();
    const ch = CHAPTERS[this.sel], rivals = chapterRivals(ch, this.save.pick);
    this.lines = [...ch.intro, { speaker: 'chef', text: 'TIP: ' + ch.tip }];
    const talk = () => this.startDialogue(rivals.map(r => r.species), () => this.launch());
    const cut = CHAPTER_CUTS[this.sel];
    if (cut && !this.save.cuts.includes(seenId(cut))) this.playCut(cut, talk);
    else talk();
  }

  /** Spicy only applies to chapters you have already cleared. */
  private spicyOn(): boolean {
    return this.spicy && (this.save.stars[this.sel] ?? 0) > 0;
  }

  private launch(): void {
    const ch = CHAPTERS[this.sel], rivals = chapterRivals(ch, this.save.pick);
    const slots: Slot[] = [{ kind: 'local', index: 0 }, ...rivals.map((): Slot => ({ kind: 'bot', index: 0 }))];
    this.scene.start('game', {
      slots, difficulty: 'normal', species: [this.save.pick, ...rivals.map(r => r.species)], tables: [ch.table], rounds: ch.rounds,
      botLevels: [null, ...rivals.map(r => (this.spicyOn() ? SPICY_BUMP[r.level] : r.level))],
      story: { chapter: this.sel, bosses: rivals.map((r, k) => (r.boss ? k + 1 : -1)).filter(k => k > 0), spicy: this.spicyOn() },
    });
  }

  // ---------------------------------------------------------------- dialogue
  private speakerSpecies: number[] = [];
  private startDialogue(speakers: number[], then: () => void): void {
    this.mode = 'dialogue';
    this.speakerSpecies = speakers;
    this.afterDialogue = then;
    this.lineIdx = 0;
    this.showLine();
  }

  private clearOverlay(): void {
    for (const o of this.overlay) o.destroy();
    this.overlay = [];
    for (const b of this.overlayButtons) { b.g.destroy(); b.label.destroy(); b.sub?.destroy(); b.zone.destroy(); }
    this.overlayButtons = [];
    this.lineText = null;
  }

  private showLine(): void {
    this.clearOverlay();
    const line = this.lines[this.lineIdx];
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x0d0805, 0.55); g.fillRect(0, 0, 1280, 720);
    g.fillStyle(0x2a1408, 0.97); g.fillRoundedRect(150, 430, 980, 220, 24);
    g.lineStyle(4, 0xffb347, 1); g.strokeRoundedRect(150, 430, 980, 220, 24);
    this.overlay.push(g);
    const isChef = line.speaker === 'chef';
    const sp = isChef ? -1 : this.speakerSpecies[line.speaker as number] ?? 0;
    const key = isChef ? 'spoon' : `kaiju-${sp}`;
    if (hasArt(key)) {
      const img = fitInside(this.add.image(250, 470, key), 210, 230).setOrigin(0.5, 0.85).setDepth(31);
      this.overlay.push(img);
      popIn(this, img as unknown as Phaser.GameObjects.Text, 1.2, 300);
    }
    const name = isChef ? (line.text.startsWith('TIP:') ? 'TIP' : 'THE HEAD CHEF') : SPECIES[sp].full.toUpperCase();
    const color = isChef ? '#ffd24a' : SPECIES[sp].css;
    this.overlay.push(withShadow(this.add.text(380, 450, name, display(28, color, { strokeThickness: 5 })).setDepth(31), 3));
    this.lineText = this.add.text(380, 494, '', body(22, '#ffe9c7', 800, { wordWrap: { width: 720 }, lineSpacing: 6 })).setDepth(31);
    this.overlay.push(this.lineText);
    this.overlay.push(this.add.text(1110, 630, '▶ tap / SPACE', body(14, '#cdb9a3', 900)).setOrigin(1, 1).setDepth(31));
    const zone = this.add.zone(640, 360, 1280, 720).setInteractive().setDepth(32);
    zone.on('pointerup', () => this.advance());
    this.overlay.push(zone);
    this.lineShown = 0;
    sfx.eat();
  }

  private advance(): void {
    const line = this.lines[this.lineIdx];
    if (this.lineText && this.lineShown < line.text.length) { this.lineShown = line.text.length; return; } // finish typing first
    this.lineIdx++;
    if (this.lineIdx >= this.lines.length) { this.clearOverlay(); this.mode = 'map'; this.afterDialogue(); return; }
    this.showLine();
  }

  // ---------------------------------------------------------------- results
  private showResult(r: StoryResult): void {
    const ch = CHAPTERS[r.chapter], last = r.chapter === CHAPTERS.length - 1;
    const before = { ...this.save, stars: this.save.stars.slice() };
    const unlockedNew = r.spicy ? false : recordResult(this.save, r.chapter, r.won, r.stars);
    if (r.spicy) { recordSpicy(this.save, r.chapter, r.won, r.stars); this.spicy = true; }
    const rewards = newlyEarned(before, this.save);
    this.rewardsBtn?.setText(`🎁 REWARDS ${UNLOCKS.filter(u => isEarned(u, this.save)).length}/${UNLOCKS.length}`);
    this.drawMap();
    this.drawPanel();
    this.mode = 'result';
    this.clearOverlay();
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x0d0805, 0.7); g.fillRect(0, 0, 1280, 720);
    g.fillStyle(0x2a1408, 0.97); g.fillRoundedRect(290, 120, 700, 480, 26);
    g.lineStyle(5, r.won ? 0xffd24a : 0xff5a4a, 1); g.strokeRoundedRect(290, 120, 700, 480, 26);
    this.overlay.push(g);
    const title = withShadow(this.add.text(640, 175, r.won ? (r.spicy ? '🌶️ SPICY CLEAR!' : 'CHAPTER CLEAR!') : 'DEFEATED', display(56, r.won ? '#ffd24a' : '#ff8a7a', { strokeThickness: 9 })).setOrigin(0.5).setDepth(31), 6);
    popIn(this, title, 1.6, 500);
    this.overlay.push(title);
    if (r.won) {
      for (let k = 0; k < 3; k++) {
        const on = k < r.stars;
        const st = this.add.text(560 + k * 80, 258, on ? '★' : '☆', display(64, on ? '#ffd24a' : '#5a4a3e', { strokeThickness: 6 })).setOrigin(0.5).setDepth(31);
        this.overlay.push(st);
        if (on) this.time.delayedCall(250 + k * 220, () => { popIn(this, st, 2, 300); sfx.pickup(); });
      }
      const rivals = chapterRivals(ch, this.save.pick);
      const sp = rivals[ch.win.speaker as number]?.species ?? 0;
      if (hasArt(`kaiju-${sp}-rage`)) this.overlay.push(fitInside(this.add.image(390, 420, `kaiju-${sp}`), 130, 130).setDepth(31));
      this.overlay.push(this.add.text(470, 360, `${SPECIES[sp].full}: “${ch.win.text}”`, body(18, '#ffe9c7', 800, { wordWrap: { width: 480 } })).setDepth(31));
      if (rewards.length) {
        const label = withShadow(this.add.text(640, 452, '🎁 UNLOCKED: ' + rewards.map(u => `${unlockName(u)}${u.kind === 'table' ? ' (table)' : ''}`).join(' + '), display(22, '#ffd24a', { strokeThickness: 4 })).setOrigin(0.5).setDepth(31), 3);
        this.overlay.push(label);
        this.time.delayedCall(900, () => { popIn(this, label, 1.6, 400); sfx.meterFull(); });
        rewards.forEach((u, k) => {
          const key = u.kind === 'kaiju' ? `kaiju-${u.index}` : LAYOUTS[u.index].table;
          if (!hasArt(key)) return;
          const img = this.add.image(870 + k * 70, 420, key).setDepth(31);
          if (u.kind === 'kaiju') fitInside(img, 70, 70); else img.setDisplaySize(80, 44);
          this.overlay.push(img);
        });
      }
      if (unlockedNew && !last) this.overlay.push(this.add.text(640, 488, `Chapter ${r.chapter + 2} unlocked!`, body(17, '#8dff6a', 900)).setOrigin(0.5).setDepth(31));
    } else {
      this.overlay.push(this.add.text(640, 300, 'So close! Every rival can be beaten.\n\n“' + ch.tip + '”', body(19, '#ffe9c7', 800, { align: 'center', wordWrap: { width: 600 } })).setOrigin(0.5, 0).setDepth(31));
    }
    const btns: { label: string; act: () => void; accent?: number }[] = [];
    if (r.won && last && !this.save.endingSeen) btns.push({ label: 'THE ENDING ▶', act: () => this.showEnding(), accent: 0xffd24a });
    else if (r.won && !last) btns.push({ label: 'NEXT ▶', act: () => { this.clearOverlay(); this.mode = 'map'; this.select(r.chapter + 1); this.play(); }, accent: 0xff9a3c });
    btns.push({ label: r.won ? 'REPLAY' : 'RETRY', act: () => { this.clearOverlay(); this.mode = 'map'; this.sel = r.chapter; this.play(); }, accent: r.won ? undefined : 0xff9a3c });
    btns.push({ label: 'MAP', act: () => { this.clearOverlay(); this.mode = 'map'; } });
    btns.forEach((b, k) => this.overlayButtons.push(new Button(this, 640 + (k - (btns.length - 1) / 2) * 210, 548, { w: 190, h: 64, label: b.label, size: 24, accent: b.accent, onClick: b.act }, 33)));
    this.overlayFocus = 0;
  }

  private showRewards(): void {
    if (this.mode !== 'map') return;
    sfx.pickup();
    this.mode = 'result'; // reuse the overlay input handling
    this.clearOverlay();
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x0d0805, 0.75); g.fillRect(0, 0, 1280, 720);
    g.fillStyle(0x2a1408, 0.97); g.fillRoundedRect(190, 70, 900, 580, 26);
    g.lineStyle(5, 0xffd24a, 1); g.strokeRoundedRect(190, 70, 900, 580, 26);
    this.overlay.push(g);
    this.overlay.push(withShadow(this.add.text(640, 112, '🎁 STORY REWARDS', display(40, '#ffd24a', { strokeThickness: 7 })).setOrigin(0.5).setDepth(31), 4));
    this.overlay.push(this.add.text(640, 152, 'Earn new kaiju and tables for Free Play and Online by playing Story mode.', body(16, '#e9dccb', 800)).setOrigin(0.5).setDepth(31));
    UNLOCKS.forEach((u, k) => {
      const col = k % 2, row = Math.floor(k / 2), x = 240 + col * 420, y = 200 + row * 102;
      const got = isEarned(u, this.save);
      const card = this.add.graphics().setDepth(31);
      card.fillStyle(got ? 0x3a2412 : 0x1c1714, 1); card.fillRoundedRect(x, y, 400, 90, 14);
      card.lineStyle(3, got ? 0xffd24a : 0x4a3e34, 1); card.strokeRoundedRect(x, y, 400, 90, 14);
      this.overlay.push(card);
      const key = u.kind === 'kaiju' ? `kaiju-${u.index}` : LAYOUTS[u.index].table;
      if (hasArt(key)) {
        const img = this.add.image(x + 50, y + 45, key).setDepth(32);
        if (u.kind === 'kaiju') fitInside(img, 76, 76); else img.setDisplaySize(84, 48);
        if (!got) img.setTint(0x1a1410); // locked: a dark silhouette
        this.overlay.push(img);
      }
      const name = got ? unlockName(u) : u.kind === 'kaiju' ? '??? (mystery kaiju)' : `${unlockName(u)} (table)`;
      this.overlay.push(this.add.text(x + 100, y + 18, (got ? '✓ ' : '🔒 ') + name, display(19, got ? (u.kind === 'kaiju' ? SPECIES[u.index].css : '#ffe9c7') : '#a89680', { strokeThickness: 3 })).setDepth(32));
      this.overlay.push(this.add.text(x + 100, y + 50, got ? (u.kind === 'kaiju' ? `Playable now · ${SPECIES[u.index].food}` : 'Playable now in Free Play and Online') : needText(u), body(14, got ? '#8dff6a' : '#e9dccb', 800, { wordWrap: { width: 290 } })).setDepth(32));
    });
    this.overlayButtons.push(new Button(this, 640, 612, { w: 200, h: 54, label: 'CLOSE', size: 22, onClick: () => { this.clearOverlay(); this.mode = 'map'; } }, 33));
    this.overlayFocus = 0;
  }

  private showEnding(): void {
    this.clearOverlay();
    this.save.endingSeen = true;
    saveStory(this.save);
    this.playCut(ENDING_CUT, () => this.endingDialogue());
  }

  private endingDialogue(): void {
    sfx.matchWin();
    this.lines = ENDING;
    this.startDialogue([], () => {
      this.mode = 'ending';
      const g = this.add.graphics().setDepth(30);
      g.fillStyle(0x0d0805, 0.85); g.fillRect(0, 0, 1280, 720);
      this.overlay.push(g);
      if (hasArt('spoon')) { const sp = fitInside(this.add.image(640, 300, 'spoon'), 260, 330).setDepth(31); this.overlay.push(sp); this.tweens.add({ targets: sp, angle: { from: -6, to: 6 }, yoyo: true, repeat: -1, duration: 1400, ease: 'Sine.easeInOut' }); }
      const end = withShadow(this.add.text(640, 520, 'THE END', display(72, '#ffd24a', { strokeThickness: 10 })).setOrigin(0.5).setDepth(31), 6);
      popIn(this, end, 1.8, 700);
      this.overlay.push(end, this.add.text(640, 580, `You collected ★ ${totalStars(this.save)}/${CHAPTERS.length * 3}. Go for all 3 stars, or brawl in Free Play!`, body(18, '#ffe9c7', 800)).setOrigin(0.5).setDepth(31));
      this.overlayButtons.push(new Button(this, 640, 650, { w: 220, h: 60, label: 'BACK TO MAP', size: 22, onClick: () => { this.clearOverlay(); this.mode = 'map'; } }, 33));
    });
  }

  // ---------------------------------------------------------------- cutscenes
  private cut: Cutscene | null = null;
  private cutT = 0;
  private cutLen = 0;
  private cutCaption: Phaser.GameObjects.Text | null = null;
  private cutVid: Phaser.GameObjects.Video | null = null;
  private afterCut: () => void = () => {};

  /** Plays a story clip full screen (Veo video; the Gemini still with a slow zoom if the video can't load). */
  private playCut(cut: Cutscene, then: () => void): void {
    this.clearOverlay();
    this.mode = 'cut';
    playMusic(null); // the clip has its own soundtrack
    this.cut = cut;
    this.afterCut = then;
    this.cutT = 0;
    if (!this.save.cuts.includes(seenId(cut))) { this.save.cuts.push(seenId(cut)); saveStory(this.save); }
    const bg = this.add.graphics().setDepth(30);
    bg.fillStyle(0x000000, 1); bg.fillRect(0, 0, 1280, 720);
    this.overlay.push(bg);
    const still = hasArt(cut.key) ? this.add.image(640, 360, cut.key).setDisplaySize(1280, 720).setDepth(31) : null;
    if (still) {
      this.overlay.push(still);
      this.tweens.add({ targets: still, scaleX: still.scaleX * 1.08, scaleY: still.scaleY * 1.08, duration: 9000, ease: 'Sine.easeOut' });
    }
    this.cutLen = 20; // safety cap; the clip's 'complete' ends it sooner
    const vid = this.add.video(640, 360).setDepth(32).setVisible(false);
    this.cutVid = vid;
    this.overlay.push(vid);
    const fallback = () => { if (this.cut === cut) this.cutLen = still ? 7 : 2.5; vid.setVisible(false); };
    vid.on('textureready', () => vid.setVisible(true));
    vid.on('complete', () => { if (this.cut === cut) this.cutLen = Math.max(this.cutT + 0.6, 5.2); }); // linger so the caption can be read
    vid.on('error', fallback);
    vid.on('unsupported', fallback);
    vid.on('locked', () => { vid.setMute(true); vid.play(); }); // autoplay with sound blocked: play muted
    this.time.delayedCall(4000, () => { if (this.cut === cut && !vid.visible) fallback(); });
    if (cut.noVideo) fallback();
    else {
      vid.loadURL(`${import.meta.env.BASE_URL}video/${cut.key}.mp4`);
      vid.setVolume(0.8);
      vid.play();
    }

    // caption strip
    const g = this.add.graphics().setDepth(33);
    for (let i = 0; i < 14; i++) { g.fillStyle(0x000000, 0.055 * i); g.fillRect(0, 560 + i * 12, 1280, 12); }
    this.overlay.push(g);
    const head = this.add.text(640, 612, cut.heading, display(20, '#ffcf8a', { strokeThickness: 4 })).setOrigin(0.5).setDepth(34).setAlpha(0);
    this.cutCaption = withShadow(this.add.text(640, 656, '', display(30, '#ffffff', { strokeThickness: 6, align: 'center', wordWrap: { width: 1100 } })).setOrigin(0.5).setDepth(34), 4);
    this.tweens.add({ targets: head, alpha: 1, duration: 500, delay: 300 });
    this.overlay.push(head, this.cutCaption);
    const zone = this.add.zone(640, 360, 1280, 720).setInteractive().setDepth(34);
    zone.on('pointerup', () => { if (this.cutT > 0.4) this.endCut(); }); // tap anywhere to skip
    this.overlay.push(zone);
    this.overlayButtons.push(new Button(this, 1190, 44, { w: 140, h: 44, label: 'SKIP ▶▶', size: 18, onClick: () => this.endCut() }, 35));
    this.overlayFocus = 0;
  }

  private endCut(): void {
    if (this.mode !== 'cut') return;
    this.cut = null;
    playMusic('story');
    this.cutCaption = null;
    this.cutVid = null;
    this.clearOverlay();
    this.mode = 'map';
    this.afterCut();
  }

  // ---------------------------------------------------------------- input
  update(_t: number, delta: number): void {
    const dt = delta / 1000;
    this.t += dt;
    let dx = 0, dy = 0, go = false, back = false, next = 0;
    if (consumeTap('ArrowLeft') || consumeTap('KeyA')) dx = -1;
    if (consumeTap('ArrowRight') || consumeTap('KeyD')) dx = 1;
    if (consumeTap('ArrowUp') || consumeTap('KeyW')) dy = -1;
    if (consumeTap('ArrowDown') || consumeTap('KeyS')) dy = 1;
    if (consumeTap('Enter') || consumeTap('Space') || consumeTap('Digit1') || consumeTap('NumpadEnter')) go = true;
    if (consumeTap('Escape') || consumeTap('Backspace')) back = true;
    if (consumeTap('KeyQ')) next = -1;
    if (consumeTap('KeyE')) next = 1;
    for (const d of listDevices()) {
      if (d.kind !== 'pad') continue;
      const inp = readSlot(d), id = 'p' + d.index;
      const mx = inp.mx > 0.6 ? 1 : inp.mx < -0.6 ? -1 : 0, my = inp.my > 0.6 ? 1 : inp.my < -0.6 ? -1 : 0;
      const prev = this.padPrev.get(id) ?? { mx, my, a: true, b: true, y: true };
      if (mx && mx !== prev.mx) dx = mx;
      if (my && my !== prev.my) dy = my;
      if ((inp.throw || inp.start) && !prev.a) go = true;
      if (inp.dash && !prev.b) back = true;
      if (inp.stomp && !prev.y) next = 1;
      this.padPrev.set(id, { mx, my, a: inp.throw || inp.start, b: inp.dash, y: inp.stomp });
    }
    clearTaps();

    if (this.mode === 'cut') {
      this.cutT += dt;
      // the frame size is only known once the video decodes, so keep it filling the screen
      const v = this.cutVid?.video;
      if (this.cutVid?.visible && v?.videoWidth) this.cutVid.setScale(1280 / v.videoWidth, 720 / v.videoHeight);
      const text = this.cut?.caption ?? '';
      const shown = Math.max(0, Math.floor((this.cutT - 0.8) * 40));
      this.cutCaption?.setText(text.slice(0, shown));
      this.overlayButtons.forEach(b => b.update(dt));
      if (this.cutT > this.cutLen || ((go || back) && this.cutT > 0.4)) this.endCut();
    } else if (this.mode === 'dialogue') {
      const line = this.lines[this.lineIdx];
      if (this.lineText && line) {
        this.lineShown = Math.min(line.text.length, this.lineShown + dt * 60);
        this.lineText.setText(line.text.slice(0, Math.floor(this.lineShown)));
      }
      if (go) this.advance();
      if (back) { this.clearOverlay(); this.mode = 'map'; }
    } else if (this.mode === 'result' || this.mode === 'ending') {
      if (dx && this.overlayButtons.length) this.overlayFocus = (this.overlayFocus + dx + this.overlayButtons.length) % this.overlayButtons.length;
      this.overlayButtons.forEach((b, i) => { b.focused = i === this.overlayFocus; b.update(dt); });
      if (go) this.overlayButtons[this.overlayFocus]?.press();
      if (back) { this.clearOverlay(); this.mode = 'map'; }
    } else {
      if (dx || dy) {
        // move to the nearest card in that direction
        const here = cardPos(this.sel);
        let best = this.sel, bestD = Infinity;
        CHAPTERS.forEach((_, i) => {
          const p = cardPos(i), vx = p.x - here.x, vy = p.y - here.y;
          if (dx && Math.sign(vx) !== dx) return;
          if (dy && Math.sign(vy) !== dy) return;
          const d = (dx ? Math.abs(vx) : Math.abs(vy)) + (dx ? Math.abs(vy) * 3 : Math.abs(vx) * 3);
          if (d > 0 && d < bestD) { bestD = d; best = i; }
        });
        this.select(best);
      }
      if (next) this.cyclePick(next);
      if (go) this.play();
      if (back) this.back();
      this.drawMap();
    }
    for (const b of this.buttons) b.update(dt);
    this.playBtn.update(dt);
  }
}
