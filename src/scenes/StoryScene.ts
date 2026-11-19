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
import { chapterRivals, KID_EASE, SPICY_BUMP, type Line } from '../story/chapters';
import { CAMPAIGNS, loadCampaign, secondsUnlocked, type Campaign, type CampaignId } from '../story/campaigns';
import { checkAchievements, loadStats, saveStats } from '../stats';
import { loadStory, recordResult, recordSpicy, saveStory, totalStars, type StorySave } from '../story/save';
import { isTouchDevice, setTouchMode } from '../touch';
import { playMusic } from '../music';
import { KITS } from '../sim/powers';
import { getSettings } from '../settings';
import { COURSES, dessertBest } from '../story/dessert';
import { chefsPass } from '../challengePass';
import { GameScene } from './GameScene';
import { seenId, type Cutscene, COMICS } from '../story/cutscenes';
import { isEarned, needText, newlyEarned, owned, unlockName, UNLOCKS } from '../story/unlocks';

export interface StoryResult {
  chapter: number;
  won: boolean;
  stars: number;
  spicy?: boolean; // a 🌶️ Spicy replay
  campaign?: CampaignId;
  myRounds?: number; // rounds you won (for the defeat card)
  myKos?: number; // your knockouts this match (for the Head Chef's comment)
  myKaiju?: number; // times you went KAIJU
  myOut?: string; // what knocked you out most (KO cause, or 'kaiju')
  receipt?: string[]; // 🪙 tokens + mastery lines from the match
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

  init(data: { result?: StoryResult; campaign?: CampaignId }): void {
    this.camp = CAMPAIGNS[data.campaign ?? data.result?.campaign ?? 'main'];
    this.save = loadCampaign(this.camp);
    this.pendingResult = data.result ?? null;
    this.sel = Math.min(this.save.unlocked - 1, this.camp.chapters.length - 1);
    if (this.pendingResult) this.sel = this.pendingResult.chapter;
    this.mode = 'map';
    this.cardImgs = []; this.cardTexts = []; this.cardZones = []; this.panel = []; this.buttons = []; this.overlay = []; this.overlayButtons = [];
    this.pickImg = null; // objects from a previous visit are destroyed when the scene restarts
    this.lineText = null;
    this.padPrev.clear();
  }

  create(): void {
    this.closeCelebration = null;
    clearTaps();
    setTouchMode('title');
    playMusic(this.main ? 'story' : 'story2');
    this.spicyBtn = null; // Phaser reuses this object: drop buttons from the previous visit before redrawing
    this.rewardsBtn = null;
    if (hasArt('bg-story')) this.add.image(640, 360, 'bg-story').setDisplaySize(1280, 720).setDepth(-3);
    else drawFloor(this.add.graphics().setDepth(-3));
    this.add.graphics().setDepth(-2).fillStyle(0x0d0805, 0.55).fillRect(0, 0, 1280, 720);
    withShadow(this.add.text(isTouchDevice ? 190 : 30, 26, this.camp.title, display(isTouchDevice ? 32 : 40, '#ffcf8a', { strokeThickness: 7 })).setDepth(5), 4);
    this.progressText = this.add.text(isTouchDevice ? 194 : 34, 78, '', body(15, '#e9dccb', 800)).setDepth(5);
    this.updateProgress();
    this.mapG = this.add.graphics().setDepth(1);

    this.camp.chapters.forEach((ch, i) => {
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
    const earnedCount = UNLOCKS.filter(u => isEarned(u, loadStory())).length;
    this.rewardsBtn = null;
    if (this.main) {
      this.buttons.push(new Button(this, 745, 50, { w: 150, h: 44, label: '📜 STORY LOG', size: 15, accent: 0xcdb9a3, onClick: () => this.showLog() }, 6));
      this.rewardsBtn = new Button(this, 775, 676, { w: 210, h: 50, label: `🎁 REWARDS ${earnedCount}/${UNLOCKS.length}`, size: 18, accent: 0xffd24a, onClick: () => this.showRewards() }, 6);
      this.buttons.push(this.rewardsBtn);
    }
    if (!isTouchDevice) this.add.text(1070, 712, 'arrows choose · ENTER play · Q / E kaiju · Esc back', body(12, '#a89680', 700)).setOrigin(0.5, 1).setDepth(5);

    this.playBtn = new Button(this, 1070, 640, { w: 330, h: 74, label: '▶ PLAY', size: 34, accent: 0xff9a3c, onClick: () => this.play() }, 6);
    this.drawMap();
    this.drawPanel();
    this.drawPick();

    this.buttons.push(new Button(this, 585, 50, { w: 150, h: 44, label: '🎬 OPENING', size: 15, accent: 0xffd24a, onClick: () => { if (this.mode === 'map') { sfx.pickup(); this.playCut(this.camp.opening, () => {}); } } }, 6));
    // 🍰 Dessert Course: post-game, after the ending
    // campaign switch: The Grand Feast ⇄ Second Helpings
    if (this.main && secondsUnlocked()) this.buttons.push(new Button(this, 1135, 50, { w: 260, h: 44, label: '🍽 SECOND HELPINGS ▶', size: 16, accent: 0x8dff6a, onClick: () => { if (this.mode === 'map') { sfx.go(); this.scene.restart({ campaign: 'seconds' }); } } }, 6));
    if (this.main && !secondsUnlocked()) { const sh = new Button(this, 1135, 50, { w: 260, h: 44, label: '🔒 SECOND HELPINGS', sub: 'clear chapter 6 to open', size: 15, accent: 0x6a5a4a, onClick: () => { if (secondsUnlocked() && this.mode === 'map') { sfx.go(); this.scene.restart({ campaign: 'seconds' }); } else sfx.thwock(); } }, 6); this.buttons.push(sh); this.time.addEvent({ delay: 500, loop: true, callback: () => { if (secondsUnlocked()) sh.setText('🍽 SECOND HELPINGS ▶', 'now open!'); } }); }
    if (this.main && !this.save.endingSeen && !chefsPass()) this.buttons.push(new Button(this, 910, 50, { w: 165, h: 44, label: '🔒 DESSERT', sub: "finish the Feast or 🎟 Chef's Pass", size: 15, accent: 0x6a5a4a, disabled: true, onClick: () => {} }, 6));
    if (!this.main) this.buttons.push(new Button(this, 1135, 50, { w: 260, h: 44, label: '◀ THE GRAND FEAST', size: 16, accent: 0xffcf8a, onClick: () => { if (this.mode === 'map') { sfx.go(); this.scene.restart({ campaign: 'main' }); } } }, 6));
    if (this.main && (this.save.endingSeen || chefsPass())) { // 🎟 the Chef's Pass opens it early
      const done = dessertBest(), next = done >= COURSES.length ? 0 : done;
      this.buttons.push(new Button(this, 910, 50, { w: 165, h: 44, label: `🍰 DESSERT ${done}/${COURSES.length}`, size: 17, accent: 0xff7ad9, onClick: () => {
        if (this.mode !== 'map') return;
        sfx.go();
        this.scene.start('game', GameScene.dessertData(next, this.save.pick));
      } }, 6));
    }
    this.spicyBtn = new Button(this, 1070, 518, { w: 240, h: 36, label: '', size: 15, accent: 0xff5a1a, onClick: () => this.toggleSpicy() }, 6);
    this.buttons.push(this.spicyBtn);
    this.drawPanel(); // fills in the SPICY button label
    this.buttons.push(new Button(this, 1172, 560, { w: 150, h: 38, label: '🎬 SCENE', size: 16, onClick: () => this.watchScene() }, 6));

    if (this.pendingResult) {
      // 🗯 beat a mid-campaign boss for the first time: a comic panel first, then the result card
      const r = this.pendingResult, comic = r.won && !r.spicy ? COMICS[`${this.camp.id}:${r.chapter}`] : undefined;
      if (comic && hasArt(comic.key) && !this.save.cuts.includes(seenId(comic))) this.playCut(comic, () => this.showResult(r));
      else this.showResult(r);
    }
    else if (!this.save.cuts.includes(seenId(this.camp.opening))) this.time.delayedCall(250, () => this.playCut(this.camp.opening, () => {}));
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
    if (this.sel < this.save.unlocked) this.playCut(this.camp.cuts[this.sel], () => {});
  }

  private camp: Campaign = CAMPAIGNS.main;
  /** Chapters whose intro chat you have already seen this session (retries go straight in). */
  static talked = new Set<string>();
  private overlayAt = 0; // when the result/ending overlay appeared (stray keys right after are ignored)
  /** Defeats per chapter this session (2+ offers the 🍀 HELPING HAND retry). */
  static losses = new Map<string, number>();
  private helping = false;
  private closeCelebration: (() => void) | null = null;
  private get main(): boolean { return this.camp.id === 'main'; }
  private progressText!: Phaser.GameObjects.Text;
  /** Overall progress line: chapters, stars, spicy clears, dessert, rewards → one completion %. EASY TO CUSTOMISE: the weights. */
  private updateProgress(): void {
    const cleared = this.save.stars.filter(x => x > 0).length, stars = totalStars(this.save), spicyN = (this.save.spicy ?? []).filter(x => x > 0).length;
    const dessertN = this.main ? dessertBest() : 0, rewardsN = this.main ? UNLOCKS.filter(u => isEarned(u, this.save)).length : 0;
    const n = this.camp.chapters.length;
    const pct = this.main ? Math.round(100 * (cleared / n * 0.35 + stars / (n * 3) * 0.25 + spicyN / n * 0.2 + dessertN / COURSES.length * 0.1 + rewardsN / UNLOCKS.length * 0.1))
      : Math.round(100 * (cleared / n * 0.5 + stars / (n * 3) * 0.3 + spicyN / n * 0.2));
    if (!this.main) { this.progressText.setText(`${this.camp.tagline}  ·  ${pct}% complete  ·  ★ ${stars}/${n * 3}  ·  🌶️ ${spicyN}/${n}`); return; }
    this.progressText.setText(`Story ${pct}% complete  ·  ★ ${stars}/${this.camp.chapters.length * 3}  ·  🌶️ ${spicyN}/${this.camp.chapters.length}${this.save.endingSeen ? `  ·  🍰 ${dessertN}/${COURSES.length}` : ''}  ·  🎁 ${rewardsN}/${UNLOCKS.length}`);
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
    const own = owned().kaiju; // kaiju you own come from The Grand Feast
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
    this.pickFood.setText(getSettings().kaijuPowers ? `${sp.food} · 🌟 ${KITS[this.save.pick].power}` : sp.food);
    { const t = this.pickFood; t.setScale(1); if (t.width > 222) t.setScale(222 / t.width); }
  }

  private drawMap(): void {
    const g = this.mapG, t = this.t;
    g.clear();
    // the path between chapters
    for (let i = 0; i < this.camp.chapters.length - 1; i++) {
      const a = cardPos(i), b = cardPos(i + 1), done = i + 1 < this.save.unlocked;
      g.lineStyle(10, 0x000000, 0.35); g.lineBetween(a.x, a.y + 4, b.x, b.y + 4);
      g.lineStyle(6, done ? 0xffb347 : 0x5a4a3e, 1); g.lineBetween(a.x, a.y, b.x, b.y);
    }
    this.camp.chapters.forEach((ch, i) => {
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
      { const t = this.cardTexts[i]; t.setScale(1); if (t.width > 172) t.setScale(172 / t.width); } // long titles (and Kid Mode's bigger text) stay inside the card
    });
  }

  private drawPanel(): void {
    for (const o of this.panel) o.destroy();
    this.panel = [];
    const ch = this.camp.chapters[this.sel], open = this.sel < this.save.unlocked, L = LAYOUTS[ch.table];
    const g = this.add.graphics().setDepth(4);
    g.fillStyle(0x140b05, 0.88); g.fillRoundedRect(890, 110, 360, 490, 20);
    g.lineStyle(3, ch.boss ? 0xff5a4a : 0xffb347, 1); g.strokeRoundedRect(890, 110, 360, 490, 20);
    this.panel.push(g);
    const add = <T extends Phaser.GameObjects.GameObject>(o: T) => { this.panel.push(o); return o; };
    add(this.add.text(1070, 136, `CHAPTER ${this.sel + 1}${ch.boss ? (this.sel === this.camp.chapters.length - 1 ? ' · FINAL BOSS' : ' · BOSS') : ''}`, body(15, ch.boss ? '#ff8a7a' : '#ffcf8a', 900)).setOrigin(0.5).setDepth(5));
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
      add(this.add.text(x, 344, SPECIES[r.species].name + (r.boss ? '\n👑 BOSS' : `\n${this.spicyOn() ? `🌶️ ${SPICY_BUMP[r.level]}` : getSettings().kidMode ? KID_EASE[r.level] : r.level}`), body(12, r.boss ? '#ff8a7a' : SPECIES[r.species].css, 900, { align: 'center' })).setOrigin(0.5, 0).setDepth(5));
    });
    add(this.add.text(1070, 392, '“' + ch.tip + '”', body(14, '#ffe9c7', 700, { align: 'center', wordWrap: { width: 320 }, fontStyle: 'italic 700' })).setOrigin(0.5, 0).setDepth(5));
    const best = this.save.stars[this.sel] ?? 0;
    const hot = this.save.spicy?.[this.sel] ?? 0;
    add(this.add.text(1000, 552, best ? `Best: ${'★'.repeat(Math.max(0, best))}${'☆'.repeat(Math.max(0, 3 - best))}${hot ? `  🌶️${hot}` : ''}` : 'Not cleared yet', body(16, '#ffd24a', 900)).setOrigin(0, 0.5).setDepth(5)).setX(918).setY(560).setFontSize(14);
    const legend = add(this.add.text(1070, 588, '★★★ no rounds lost · ★★ lost one · ★ any win', body(11, '#cdb9a3', 800)).setOrigin(0.5).setDepth(5));
    if (legend.width > 300) legend.setScale(300 / legend.width); // stays inside the panel, above PLAY
    const canSpicy = best > 0 || (chefsPass() && this.sel < this.save.unlocked); // 🎟 Chef's Pass: any reached chapter
    this.spicyBtn?.setText(canSpicy ? `🌶️ SPICY: ${this.spicy ? 'ON (tougher rivals)' : 'OFF'}` : "🌶️ SPICY: clear it (or 🎟 Chef's Pass)");
    if (this.spicyBtn) this.spicyBtn.disabled = !canSpicy;
  }

  // ---------------------------------------------------------------- flow
  private back(): void {
    sfx.leave();
    this.scene.start('title');
  }

  private play(): void {
    if (this.mode !== 'map' || this.sel >= this.save.unlocked) return;
    sfx.go();
    const ch = this.camp.chapters[this.sel], rivals = chapterRivals(ch, this.save.pick);
    this.lines = getSettings().kidMode ? [ch.intro[0]] : [...ch.intro, { speaker: 'chef', text: ch.tip }]; // 🧸 Kid Mode: one line
    // retries skip the chat: you've heard it already this session
    const key = `${this.camp.id}:${this.sel}`;
    if (StoryScene.talked.has(key)) { this.launch(); return; }
    StoryScene.talked.add(key);
    const talk = () => this.startDialogue(rivals.map(r => r.species), () => this.launch());
    const cut = this.camp.cuts[this.sel];
    if (cut && !this.save.cuts.includes(seenId(cut))) this.playCut(cut, talk);
    else talk();
  }

  /** Spicy only applies to chapters you have already cleared. */
  private spicyOn(): boolean {
    return this.spicy && ((this.save.stars[this.sel] ?? 0) > 0 || chefsPass());
  }

  private launch(): void {
    const ch = this.camp.chapters[this.sel], rivals = chapterRivals(ch, this.save.pick);
    const slots: Slot[] = [{ kind: 'local', index: 0 }, ...rivals.map((): Slot => ({ kind: 'bot', index: 0 }))];
    this.scene.start('game', {
      slots, difficulty: 'normal', species: [this.save.pick, ...rivals.map(r => r.species)], tables: [ch.table], rounds: ch.rounds,
      botLevels: [null, ...rivals.map(r => (this.spicyOn() ? SPICY_BUMP[r.level] : getSettings().kidMode ? KID_EASE[r.level] : r.level))],
      story: { chapter: this.sel, bosses: rivals.map((r, k) => (r.boss ? k + 1 : -1)).filter(k => k > 0), spicy: this.spicyOn(), campaign: this.camp.id, mutator: ch.mutator, bossBelly: ch.bossBelly, helping: this.helping },
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
    this.overlay.push(this.add.text(1110, 630, isTouchDevice ? '▶ tap' : '▶ click / SPACE', body(14, '#cdb9a3', 900)).setOrigin(1, 1).setDepth(31));
    const skip = this.add.text(380, 630, isTouchDevice ? '⏩ SKIP CHAT' : '⏩ SKIP CHAT (S)', body(15, '#ffd24a', 900)).setOrigin(0, 1).setDepth(33).setInteractive({ useHandCursor: true });
    skip.on('pointerup', (_p: unknown, _x: unknown, _y: unknown, ev: { stopPropagation?: () => void }) => { ev?.stopPropagation?.(); this.skipChat(); });
    this.overlay.push(skip);
    const zone = this.add.zone(640, 360, 1280, 720).setInteractive().setDepth(32);
    zone.on('pointerup', () => this.advance());
    this.overlay.push(zone);
    this.lineShown = 0;
    sfx.eat();
  }

  /** Jump straight past the rest of the chat. */
  private skipChat(): void {
    if (this.mode !== 'dialogue') return;
    this.lineIdx = this.lines.length - 1;
    this.lineShown = 1e9;
    this.advance();
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
    const ch = this.camp.chapters[r.chapter], last = r.chapter === this.camp.chapters.length - 1;
    const before = { ...this.save, stars: this.save.stars.slice() };
    const unlockedNew = r.spicy ? false : recordResult(this.save, r.chapter, r.won, r.stars);
    if (r.spicy) { recordSpicy(this.save, r.chapter, r.won, r.stars); this.spicy = true; }
    const rewards = this.main ? newlyEarned(before, this.save) : [];
    // story achievements (e.g. Second Helpings clears) are checked here, after the save updates
    const st = loadStats(), gotAch = checkAchievements(st);
    if (gotAch.length) saveStats(st);
    this.updateProgress();
    this.rewardsBtn?.setText(`🎁 REWARDS ${UNLOCKS.filter(u => isEarned(u, this.save)).length}/${UNLOCKS.length}`);
    this.drawMap();
    this.drawPanel();
    this.mode = 'result'; this.overlayAt = this.time.now;
    this.clearOverlay();
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x0d0805, 0.7); g.fillRect(0, 0, 1280, 720);
    // result card layout (EASY TO TUNE): CARD = top/height; lines below the quote stack with GAP between them
    const CARD = { y: 50, h: 620 }, GAP = 14, BTN_Y = CARD.y + CARD.h - 62;
    g.fillStyle(0x2a1408, 0.97); g.fillRoundedRect(270, CARD.y, 740, CARD.h, 26);
    g.lineStyle(5, r.won ? 0xffd24a : 0xff5a4a, 1); g.strokeRoundedRect(270, CARD.y, 740, CARD.h, 26);
    let y = CARD.y + 210; // next free line below title + stars
    this.overlay.push(g);
    const title = withShadow(this.add.text(640, CARD.y + 62, r.won ? (r.spicy ? '🌶️ SPICY CLEAR!' : 'CHAPTER CLEAR!') : 'DEFEATED', display(56, r.won ? '#ffd24a' : '#ff8a7a', { strokeThickness: 9 })).setOrigin(0.5).setDepth(31), 6);
    popIn(this, title, 1.6, 500);
    this.overlay.push(title);
    if (r.won) {
      for (let k = 0; k < 3; k++) {
        const on = k < r.stars;
        const st = this.add.text(560 + k * 80, CARD.y + 150, on ? '★' : '☆', display(64, on ? '#ffd24a' : '#5a4a3e', { strokeThickness: 6 })).setOrigin(0.5).setDepth(31);
        this.overlay.push(st);
        if (on) this.time.delayedCall(250 + k * 220, () => { popIn(this, st, 2, 300); sfx.pickup(); });
      }
      const rivals = chapterRivals(ch, this.save.pick);
      const sp = rivals[ch.win.speaker as number]?.species ?? 0;
      const react = r.stars === 3 ? ' …Not even ONE round for me?!' : r.stars === 1 ? ' …That was close, though. Next time!' : '';
      const quote = this.add.text(460, y, `${SPECIES[sp].full}: “${ch.win.text}${react}”`, body(19, '#ffe9c7', 800, { wordWrap: { width: 500 }, lineSpacing: 4 })).setDepth(31);
      const qh = Math.max(120, quote.height);
      quote.setY(y + (qh - quote.height) / 2);
      this.overlay.push(quote);
      if (hasArt(`kaiju-${sp}`)) this.overlay.push(fitInside(this.add.image(370, y + qh / 2, `kaiju-${sp}`), 120, 120).setDepth(31));
      y += qh + GAP + 6;
      if (rewards.length) {
        this.time.delayedCall(350, () => { if (this.mode === 'result') this.celebrate(rewards); });
        const label = withShadow(this.add.text(640, y + 14, '🎁 UNLOCKED: ' + rewards.map(u => `${unlockName(u)}${u.kind === 'table' ? ' (table)' : ''}`).join(' + '), display(22, '#ffd24a', { strokeThickness: 4, align: 'center', wordWrap: { width: 660 } })).setOrigin(0.5, 0).setDepth(31), 3);
        label.setY(y);
        this.overlay.push(label);
        y += label.height + 8;
        const shown = rewards.filter(u => hasArt(u.kind === 'kaiju' ? `kaiju-${u.index}` : LAYOUTS[u.index].table));
        this.time.delayedCall(900, () => { popIn(this, label, 1.6, 400); sfx.meterFull(); });
        shown.forEach((u, k) => {
          const key = u.kind === 'kaiju' ? `kaiju-${u.index}` : LAYOUTS[u.index].table;
          const img = this.add.image(640 + (k - (shown.length - 1) / 2) * 96, y + 36, key).setDepth(31);
          if (u.kind === 'kaiju') fitInside(img, 70, 70); else img.setDisplaySize(80, 44);
          this.overlay.push(img);
        });
        if (shown.length) y += 72;
        y += GAP;
      }
      // 👨‍🍳 the Head Chef reacts to how you played, then teases the next course
      const nextCh = this.camp.chapters[r.chapter + 1], nextRival = nextCh ? SPECIES[nextCh.rivals[0].species].full : '';
      const praise = r.stars === 3 ? "Not a single round dropped. Chef's kiss! 🤌" : (r.myKos ?? 0) >= 4 ? `${r.myKos} knockouts! The whole kitchen is talking.` : (r.myKaiju ?? 0) >= 2 ? `You went KAIJU ${r.myKaiju} times. The table is still shaking.` : (r.myKaiju ?? 0) === 0 ? 'Next time, eat those crumbs and STOMP: KAIJU wins fights.' : 'A hard-fought plate. Well served.';
      const unlockLine = unlockedNew && !last ? `
✅ Chapter ${r.chapter + 2} unlocked: ${nextCh?.title ?? ''}. ${nextRival} is already sharpening the cutlery…` : nextCh ? `
Next course: ${nextCh.title}. ${nextRival} is already sharpening the cutlery…` : '';
      const chef = this.add.text(640, y, `👨‍🍳 ${praise}${unlockLine}`, body(15, '#ffd9a0', 800, { align: 'center', wordWrap: { width: 640 } })).setOrigin(0.5, 0).setDepth(31);
      this.overlay.push(chef);
      y += chef.height + 10;
      if (r.receipt?.length && y + 22 < BTN_Y - 44) { const rc = this.add.text(640, y, r.receipt.join('   ·   '), body(14, '#cdb9a3', 800)).setOrigin(0.5, 0).setDepth(31); this.overlay.push(rc); y += rc.height + 6; }
      if (gotAch.length) { const at = this.add.text(640, y, `🏆 ${gotAch.map(a => a.name).join(', ')}!`, body(17, '#ffd24a', 900)).setOrigin(0.5, 0).setDepth(31); this.overlay.push(at); y += at.height + 6; }
      // never under the buttons: squeeze everything above them if a big unlock made the card too tall
      const over = y - (BTN_Y - 44);
      if (over > 0) for (const o of this.overlay) { const tt = o as Phaser.GameObjects.Text & { y: number }; if (typeof tt.y === 'number' && tt.y > CARD.y + 120) tt.y -= over * ((tt.y - CARD.y - 120) / Math.max(1, y - CARD.y - 120)); }
    } else {
      const lostKey = `${this.camp.id}:${r.chapter}`;
      StoryScene.losses.set(lostKey, (StoryScene.losses.get(lostKey) ?? 0) + 1);
      const head = (r.myRounds ?? 0) > 0 ? 'So close! You took a round off them.' : 'Tough one! Every rival can be beaten.';
      const BEAT: Record<string, string> = { fall: 'You kept falling off the table. Stay near the middle and DASH back from the edge.', cutlery: 'Thrown cutlery got you. DASH sideways from a charge line, or SWIPE to parry it.', swipe: 'You were swiped up close. Keep your distance, or swipe first.', kaiju: 'A KAIJU flattened you. Step out of the ring before each stomp, then punish the dizzy shrink.', squash: 'A KAIJU flattened you. Step out of the ring before each stomp, then punish the dizzy shrink.', hand: 'The Giant Hand got you. It grabs the fullest belly: STOMP first, or DASH just as it arrives to slip under it.' };
      const beat = r.myOut ? BEAT[r.myOut] ?? 'Watch the table hazard: its warning shows before it strikes.' : '';
      const kid = getSettings().kidMode;
      this.overlay.push(this.add.text(640, (CARD.y + 150 + BTN_Y - 40) / 2, kid ? `${head}\n\n💡 ${(beat || ch.tip).split('. ')[0].replace(/\.$/, '')}!` : head + (beat ? '\n\n🔎 What beat you: ' + beat : '') + '\n\n“' + ch.tip + '”', body(kid ? 30 : 23, '#ffe9c7', 800, { align: 'center', wordWrap: { width: 620 }, lineSpacing: 6 })).setOrigin(0.5).setDepth(31));
      if (r.receipt?.length) this.overlay.push(this.add.text(640, BTN_Y - 52, r.receipt.join('   ·   '), body(13, '#cdb9a3', 800)).setOrigin(0.5).setDepth(31)); // losses still pay tokens + mastery
    }
    const btns: { label: string; act: () => void; accent?: number }[] = [];
    if (gotAch.length && !r.won) this.overlay.push(this.add.text(640, Math.min(y, BTN_Y - 66), `🏆 ${gotAch.map(a => a.name).join(', ')}!`, body(18, '#ffd24a', 900)).setOrigin(0.5, 0).setDepth(31));
    if (r.won && last && !this.save.endingSeen) btns.push({ label: 'THE ENDING ▶', act: () => this.showEnding(), accent: 0xffd24a });
    else if (r.won && !last) btns.push({ label: 'NEXT ▶', act: () => { this.clearOverlay(); this.mode = 'map'; this.select(r.chapter + 1); this.play(); }, accent: 0xff9a3c });
    btns.push({ label: r.won ? 'REPLAY' : 'RETRY', act: () => { this.clearOverlay(); this.mode = 'map'; this.sel = r.chapter; this.helping = false; this.play(); }, accent: r.won ? undefined : 0xff9a3c });
    if (!r.won && (StoryScene.losses.get(`${this.camp.id}:${r.chapter}`) ?? 0) >= (getSettings().kidMode ? 1 : 2) && !r.spicy) btns.unshift({ label: '🍀 HELPING HAND', act: () => { this.clearOverlay(); this.mode = 'map'; this.sel = r.chapter; this.helping = true; this.play(); }, accent: 0x8dff6a });
    btns.push({ label: 'MAP', act: () => { this.clearOverlay(); this.mode = 'map'; } });
    btns.forEach((b, k) => this.overlayButtons.push(new Button(this, 640 + (k - (btns.length - 1) / 2) * 210, BTN_Y, { w: 190, h: 64, label: b.label, size: 24, accent: b.accent, onClick: b.act }, 33)));
    this.overlayFocus = 0;
  }

  /** 🎉 Full-screen "NEW KAIJU / NEW TABLE" moment for Story unlocks (tap anywhere to close). */
  private celebrate(rewards: ReturnType<typeof newlyEarned>): void {
    const objs: Phaser.GameObjects.GameObject[] = [];
    const g = this.add.graphics().setDepth(40);
    g.fillStyle(0x0d0805, 0.97); g.fillRect(0, 0, 1280, 720);
    objs.push(g);
    const kaiju = rewards.some(u => u.kind === 'kaiju');
    const head = withShadow(this.add.text(640, 120, kaiju ? '🎉 NEW KAIJU!' : '🎉 NEW TABLE!', display(72, '#ffd24a', { strokeThickness: 10 })).setOrigin(0.5).setDepth(41), 6);
    popIn(this, head, 1.8, 500);
    objs.push(head);
    rewards.forEach((u, k) => {
      const x = 640 + (k - (rewards.length - 1) / 2) * 340, key = u.kind === 'kaiju' ? `kaiju-${u.index}` : LAYOUTS[u.index].table;
      for (let r = 0; r < 3; r++) { const ring = this.add.circle(x, 360, 60 + r * 40, 0xffd24a, 0.08).setDepth(41); objs.push(ring); this.tweens.add({ targets: ring, scale: 1.5, alpha: 0, duration: 1400, delay: r * 300, repeat: -1 }); }
      if (hasArt(key)) {
        const img = this.add.image(x, 360, key).setDepth(42);
        if (u.kind === 'kaiju') fitInside(img, 260, 260); else img.setDisplaySize(320, 170);
        const sc = img.scaleX; img.setScale(0); this.tweens.add({ targets: img, scale: sc, duration: 600, ease: 'Back.easeOut' });
        objs.push(img);
      }
      objs.push(withShadow(this.add.text(x, 520, unlockName(u).toUpperCase(), display(34, u.kind === 'kaiju' ? SPECIES[u.index].css : '#ffe9c7', { strokeThickness: 6 })).setOrigin(0.5).setDepth(42), 4));
      if (u.kind === 'kaiju') objs.push(this.add.text(x, 560, `🌟 ${KITS[u.index].power}: ${KITS[u.index].blurb}`, body(16, '#ffe9c7', 800, { align: 'center', wordWrap: { width: 320 } })).setOrigin(0.5, 0).setDepth(42));
    });
    objs.push(this.add.text(640, 680, 'Playable now in Free Play, Party Modes and Online  ·  tap to continue', body(16, '#cdb9a3', 800)).setOrigin(0.5).setDepth(42));
    sfx.matchWin?.();
    const zone = this.add.zone(640, 360, 1280, 720).setInteractive().setDepth(43);
    objs.push(zone);
    const close = () => { for (const o of objs) o.destroy(); this.closeCelebration = null; };
    zone.once('pointerup', close);
    this.closeCelebration = close;
    this.overlay.push(...objs);
  }

  private showRewards(): void {
    if (this.mode !== 'map') return;
    sfx.pickup();
    this.mode = 'result'; this.overlayAt = this.time.now; // reuse the overlay input handling
    this.clearOverlay();
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x0d0805, 0.75); g.fillRect(0, 0, 1280, 720);
    g.fillStyle(0x2a1408, 0.97); g.fillRoundedRect(190, 70, 900, 580, 26);
    g.lineStyle(5, 0xffd24a, 1); g.strokeRoundedRect(190, 70, 900, 580, 26);
    this.overlay.push(g);
    this.overlay.push(withShadow(this.add.text(640, 112, '🎁 STORY REWARDS', display(40, '#ffd24a', { strokeThickness: 7 })).setOrigin(0.5).setDepth(31), 4));
    this.overlay.push(this.add.text(640, 152, 'Earn new kaiju and tables for Free Play and Online by playing Story mode.', body(16, '#e9dccb', 800)).setOrigin(0.5).setDepth(31));
    UNLOCKS.forEach((u, k) => {
      // 3 columns once there are many rewards (new saves have 13), so every card fits inside the panel
      const cols = UNLOCKS.length > 8 ? 3 : 2, cw = cols === 3 ? 282 : 400, ch = cols === 3 ? 84 : 90, col = k % cols, row = Math.floor(k / cols), x = 205 + col * (cw + 12), y = 180 + row * (ch + 8);
      const got = isEarned(u, this.save);
      const card = this.add.graphics().setDepth(31);
      card.fillStyle(got ? 0x3a2412 : 0x1c1714, 1); card.fillRoundedRect(x, y, cw, ch, 14);
      card.lineStyle(3, got ? 0xffd24a : 0x4a3e34, 1); card.strokeRoundedRect(x, y, cw, ch, 14);
      this.overlay.push(card);
      const key = u.kind === 'kaiju' ? `kaiju-${u.index}` : LAYOUTS[u.index].table;
      if (hasArt(key)) {
        const img = this.add.image(x + 40, y + ch / 2, key).setDepth(32);
        if (u.kind === 'kaiju') fitInside(img, 64, 64); else img.setDisplaySize(68, 40);
        if (!got) img.setTint(0x1a1410); // locked: a dark silhouette
        this.overlay.push(img);
      }
      const name = got ? unlockName(u) : u.kind === 'kaiju' ? '??? (mystery kaiju)' : `${unlockName(u)} (table)`;
      { const t = this.add.text(x + 82, y + 10, (got ? '✓ ' : '🔒 ') + name, display(cols === 3 ? 15 : 19, got ? (u.kind === 'kaiju' ? SPECIES[u.index].css : '#ffe9c7') : '#a89680', { strokeThickness: 3 })).setDepth(32); if (t.width > cw - 96) t.setScale((cw - 96) / t.width); this.overlay.push(t); } // long names stay inside the card
      this.overlay.push(this.add.text(x + 82, y + 36, got ? (u.kind === 'kaiju' ? `Playable now · ${SPECIES[u.index].food}` : 'Playable now in Free Play and Online') : needText(u), body(cols === 3 ? 11 : 14, got ? '#8dff6a' : '#e9dccb', 800, { wordWrap: { width: cw - 92 } })).setDepth(32));
      { const t = this.overlay[this.overlay.length - 1] as Phaser.GameObjects.Text; for (let f = Number(String(t.style.fontSize).replace('px', '')); t.y + t.height > y + ch - 4 && f > 9;) t.setFontSize(--f); } // stays inside its card
    });
    this.overlayButtons.push(new Button(this, 990, 112, { w: 150, h: 48, label: '✖ CLOSE', size: 20, onClick: () => { this.clearOverlay(); this.mode = 'map'; } }, 33));
    this.overlayFocus = 0;
  }

  /** 📜 Story so far: every chapter you've cleared, as a little storybook (title, who you beat, what they said). */
  private showLog(): void {
    if (this.mode !== 'map') return;
    sfx.pickup();
    this.mode = 'result'; this.overlayAt = this.time.now;
    this.clearOverlay();
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x0d0805, 0.8).fillRect(0, 0, 1280, 720).fillStyle(0x2a1408, 0.98).fillRoundedRect(150, 60, 980, 600, 26).lineStyle(5, 0xcdb9a3, 1).strokeRoundedRect(150, 60, 980, 600, 26);
    this.overlay.push(g);
    this.overlay.push(withShadow(this.add.text(640, 100, `📜 ${this.camp.title}: THE STORY SO FAR`, display(32, '#ffd9a0', { strokeThickness: 6 })).setOrigin(0.5).setDepth(31), 3));
    const done = this.camp.chapters.map((ch, i) => ({ ch, i })).filter(({ i }) => (this.save.stars[i] ?? 0) > 0);
    const lines = done.length ? done.map(({ ch, i }) => {
      const rv = chapterRivals(ch, this.save.pick), sp = rv[ch.win.speaker as number]?.species ?? rv[0].species;
      return `${i + 1}. ${ch.title} ${'★'.repeat(this.save.stars[i] ?? 0)}: you beat ${rv.map(r => SPECIES[r.species].name).join(' & ')}. ${SPECIES[sp].name}: “${ch.win.text}”`;
    }) : ['Nothing yet! Clear chapter 1 and your story starts here.'];
    const next = this.camp.chapters[done.length];
    if (next && done.length) lines.push(`👉 Next: ${next.title}. ${SPECIES[next.rivals[0].species].full} is waiting…`);
    const t = this.add.text(190, 140, lines.join('\n'), body(15, '#f1e4d2', 800, { wordWrap: { width: 900 }, lineSpacing: 6 })).setDepth(31);
    for (let f = 15; t.height > 430 && f > 10;) t.setFontSize(--f);
    this.overlay.push(t);
    this.overlayButtons.push(new Button(this, 640, 620, { w: 200, h: 54, label: 'CLOSE', size: 22, onClick: () => { this.clearOverlay(); this.mode = 'map'; } }, 33));
    this.overlayFocus = 0;
  }

  private showEnding(): void {
    this.clearOverlay();
    this.save.endingSeen = true;
    saveStory(this.save);
    this.playCut(this.camp.endingCut, () => this.endingDialogue());
  }

  private endingDialogue(): void {
    sfx.matchWin();
    this.lines = this.camp.ending;
    this.startDialogue([], () => {
      this.mode = 'ending'; this.overlayAt = this.time.now;
      const g = this.add.graphics().setDepth(30);
      g.fillStyle(0x0d0805, 0.85); g.fillRect(0, 0, 1280, 720);
      this.overlay.push(g);
      if (hasArt('spoon')) { const sp = fitInside(this.add.image(640, 300, 'spoon'), 260, 330).setDepth(31); this.overlay.push(sp); this.tweens.add({ targets: sp, angle: { from: -6, to: 6 }, yoyo: true, repeat: -1, duration: 1400, ease: 'Sine.easeInOut' }); }
      const end = withShadow(this.add.text(640, 520, 'THE END', display(72, '#ffd24a', { strokeThickness: 10 })).setOrigin(0.5).setDepth(31), 6);
      popIn(this, end, 1.8, 700);
      this.overlay.push(end, this.add.text(640, 580, `You collected ★ ${totalStars(this.save)}/${this.camp.chapters.length * 3}. Go for all 3 stars, or brawl in Free Play!`, body(18, '#ffe9c7', 800)).setOrigin(0.5).setDepth(31));
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
    playMusic(this.main ? 'story' : 'story2');
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
    const skipKey = this.mode === 'dialogue' && consumeTap('KeyS'); // S = skip the chat (elsewhere it's 'down')
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
    // 🎉 the celebration takes every key until it closes (Space used to hit the card underneath too)
    if (this.closeCelebration) { if (go || back) this.closeCelebration(); return; }

    if (this.mode === 'cut') {
      this.cutT += dt;
      // the frame size is only known once the video decodes, so keep it filling the screen
      const v = this.cutVid?.video;
      if (this.cutVid?.visible && v?.videoWidth) this.cutVid.setScale(1280 / v.videoWidth, 720 / v.videoHeight);
      const text = this.cut?.caption ?? '';
      const shown = Math.max(0, Math.floor((this.cutT - 0.8) * 40));
      this.cutCaption?.setText(text.slice(0, shown));
      this.overlayButtons.forEach(b => b.update(dt));
      if (this.cutT > this.cutLen || ((go || back) && this.cutT > (this.cut?.noVideo ? 2 : 0.4))) this.endCut(); // stills (comic panels) stay long enough to see
    } else if (this.mode === 'dialogue') {
      const line = this.lines[this.lineIdx];
      if (this.lineText && line) {
        this.lineShown = Math.min(line.text.length, this.lineShown + dt * 90);
        if (skipKey) { this.skipChat(); return; }
        this.lineText.setText(line.text.slice(0, Math.floor(this.lineShown)));
      }
      if (go) this.advance();
      if (back) { this.clearOverlay(); this.mode = 'map'; }
    } else if (this.mode === 'result' || this.mode === 'ending') {
      if (dx && this.overlayButtons.length) this.overlayFocus = (this.overlayFocus + dx + this.overlayButtons.length) % this.overlayButtons.length;
      this.overlayButtons.forEach((b, i) => { b.focused = i === this.overlayFocus; b.update(dt); });
      if (go && this.time.now - this.overlayAt > 1200) this.overlayButtons[this.overlayFocus]?.press(); // a stray key from the match/ending can't press it
      if (back) { this.clearOverlay(); this.mode = 'map'; }
    } else {
      if (dx || dy) {
        // move to the nearest card in that direction
        const here = cardPos(this.sel);
        let best = this.sel, bestD = Infinity;
        this.camp.chapters.forEach((_, i) => {
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
