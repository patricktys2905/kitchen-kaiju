// The start screen: cover art + mode selection. New modes = one more card in MODES.
import * as Phaser from 'phaser';
import { sfx } from '../audio';
import { clearTaps, consumeTap } from '../input';
import { applyPendingUpdate } from '../pwa';
import { hasArt } from '../render/art';
import { drawFloor } from '../render/draw';
import { body, display, popIn, withGradient, withShadow } from '../render/fonts';
import { Button, FocusNav } from '../render/ui';
import { loadStory, totalStars } from '../story/save';
import { CHAPTERS } from '../story/chapters';
import { secondsUnlocked } from '../story/campaigns';
import { isTouchDevice, setTouchMode } from '../touch';
import { playMusic } from '../music';
import { GAUNTLET, gauntletBest, pureBest, weeklyBest } from '../gauntlet';
import { totalTrialStars, TRIALS } from '../trials';
import { chefsPass, chefsPassText } from '../challengePass';
import { dailyMedalLine, loadMeta, stepsDone } from '../meta';
import { getSettings } from '../settings';
import { SPECIES } from '../sim/constants';
import { LAYOUTS } from '../sim/layouts';
import { DAILY, dailySetup, loadDaily, spicyWonToday, todayKey, weekStrip } from '../daily';
import { addFriend, clearFriends, loadFriends, playerName, resultLine, score, setPlayerName, type FriendResult } from '../friendBoard';
import { modeDef } from '../sim/modes';
import { GameScene } from './GameScene';
import { owned } from '../story/unlocks';
import { loadStats } from '../stats';
import { nextGoals } from '../goals';

function dailySub(): string {
  const d = loadDaily(), today = d.date === todayKey();
  if (today && d.won) return `Done today ✔ · ${d.streak}🔥 streak`;
  return `Today: ${modeDef(dailySetup().mode).name}${d.streak && d.lastWin ? ` · ${d.streak}🔥` : ''}`;
}

/** Attract mode: after this many idle seconds on the title, a bot demo plays (0 = never). */
export const ATTRACT_AFTER = 40;

export class TitleScene extends Phaser.Scene {
  private extraBtns: Button[] = [];
  private nav!: FocusNav;
  private idle = 0;
  private t = 0;
  private art: Phaser.GameObjects.Image | null = null;

  constructor() {
    super('title');
  }

  create(): void {
    const tbl = new URLSearchParams(location.search).get('table');
    if (tbl) { try { sessionStorage.setItem('kk-shared-table', tbl); } catch { /* blocked */ } history.replaceState(null, '', location.pathname); this.scene.start('workshop'); return; } // 🔗 a shared Workshop table
    this.extraBtns = [];
    this.challengeUi = [];
    this.idle = 0;
    const wake = () => { this.idle = 0; };
    this.input.on('pointerdown', wake);
    this.input.keyboard?.on('keydown', wake);
    clearTaps();
    setTouchMode('title');
    playMusic('menu');
    if (hasArt('bg-title')) this.art = this.add.image(640, 360, 'bg-title').setDisplaySize(1300, 731).setDepth(-2);
    else drawFloor(this.add.graphics());
    // darken the bottom so the mode cards read well
    const g = this.add.graphics().setDepth(-1);
    for (let i = 0; i < 12; i++) { g.fillStyle(0x0d0805, 0.06 * i); g.fillRect(0, 520 + i * 17, 1280, 17); }
    g.fillStyle(0x0d0805, 0.35); g.fillRect(0, 0, 1280, 8);

    const title = this.add.text(372, 76, 'KITCHEN KAIJU', display(94, '#ffe9c7', { strokeThickness: 14, padding: { x: 8, y: 8 } })).setOrigin(0.5).setDepth(2);
    withShadow(withGradient(title, '#fff6cf', '#ffb347'), 8);
    popIn(this, title, 1.3, 700);
    withShadow(this.add.text(372, 150, 'Tiny monsters. Giant dinner.', body(24, '#ffd9a0', 900)).setOrigin(0.5).setDepth(2), 3);
    const goals = nextGoals();
    if (goals.length) { const nt = withShadow(this.add.text(372, 196, '🎯 NEXT UP\n' + goals.join('\n'), body(14, '#fff1d6', 900, { align: 'center', lineSpacing: 3 })).setOrigin(0.5, 0).setDepth(2), 3); const b = nt.getBounds(); this.add.graphics().setDepth(1.5).fillStyle(0x0d0805, 0.72).fillRoundedRect(b.x - 14, b.y - 8, b.width + 28, b.height + 16, 12); }

    const save = loadStory();
    const storySub = secondsUnlocked() ? `Ch ${Math.min(save.unlocked, CHAPTERS.length)}/${CHAPTERS.length} · 🍽 Seconds open!` : save.stars.some(s => s) ? `Ch ${Math.min(save.unlocked, CHAPTERS.length)}/${CHAPTERS.length} · ★ ${totalStars(save)}` : `${CHAPTERS.length} chapters`;
    const go = (key: string, data: object = {}) => { if (key === 'challenges') { this.challenges(save.pick); return; } if (key === 'daily') { this.dailyCard(); return; } sfx.go(); this.time.delayedCall(80, () => this.scene.start(key, data)); };
    const MODES: { label: string; sub: string; accent: number; scene?: string; disabled?: boolean; data?: object }[] = [
      { label: 'STORY', sub: storySub, accent: 0xff9a3c, scene: 'story' },
      { label: 'FREE PLAY', sub: 'Up to 6 · bots', accent: 0x4fd1ff, scene: 'menu' },
      { label: 'ONLINE', sub: 'Play with friends', accent: 0x8dff6a, scene: 'lobby' },
      { label: 'PARTY MODES', sub: '5 party games', accent: 0xffd24a, scene: 'menu', data: { mode: 'teams', party: true } },
      { label: 'DAILY', sub: dailySub(), accent: 0x8dff6a, scene: 'daily' }, // 📅 opens a preview card first
      { label: 'CHALLENGES', sub: `Gauntlet${gauntletBest() ? ` (best ${gauntletBest()})` : ''} · 🎯 Trials ${totalTrialStars()}★`, accent: 0xff5a7a, scene: 'challenges' },
    ];
    const n = MODES.length, cw = Math.min(290, (1240 - (n - 1) * 14) / n);
    const buttons = MODES.map((m, i) => new Button(this, 20 + cw / 2 + i * (cw + 14), 640, {
      w: cw, h: 104, label: m.label, sub: m.sub, accent: m.accent, size: n > 4 ? 26 : 32, disabled: m.disabled,
      onClick: () => { if (m.scene) go(m.scene, m.data); },
    }));
    // small extras row (top right): keyboard ↑ from the mode cards reaches it
    const EXTRAS: [string, string][] = [['⚙ SETTINGS', 'settings'], ['❓ HELP', 'help'], ['📖 KAIJU', 'gallery'], ['🏆 RECORDS', 'records'], ['🛒 PANTRY', 'pantry'], ['🛠 WORKSHOP', 'workshop']];
    const extras = EXTRAS.map(([label, key], i) => new Button(this, 1228 - (EXTRAS.length - 1 - i) * 96, 32, { w: 90, h: 40, label, size: 13, accent: 0xcdb9a3, onClick: () => go(key) }, 6));
    this.nav = new FocusNav([...extras, ...buttons], extras.length);
    this.nav.index = extras.length; // start on STORY
    this.add.text(1272, 712, `v${__APP_VERSION__}`, body(11, '#a89680', 700)).setOrigin(1, 1).setDepth(5);
    const hint = this.add.text(640, 574, isTouchDevice ? 'tap a card to start' : '◀ ▶ choose   ·   ENTER / A / click to start', body(15, '#f1e4d2', 800)).setOrigin(0.5).setDepth(2).setAlpha(0.85);
    // first time here: offer the 1-minute Practice (until you've finished a match or tried it)
    let tried = false;
    try { tried = !!localStorage.getItem('kk-practice-tried'); } catch { /* blocked */ }
    if (!stepsDone().includes('practice') && (!tried || loadStats().matches < 5)) { // stays until Practice is really finished (or you've clearly moved on)
      const pb = new Button(this, 640, 520, { w: 420, h: 50, label: '👋 NEW HERE?  1-MINUTE PRACTICE ▶', size: 18, accent: 0x8dff6a, onClick: () => { try { localStorage.setItem('kk-practice-tried', '1'); } catch { /* blocked */ } sfx.go(); this.scene.start('game', { ...GameScene.practiceData(loadStory().pick), from: 'title' }); } }, 6);
      this.extraBtns.push(pb);
      hint.setVisible(false); // the Practice button takes that spot
      popIn(this, pb.label, 1.2, 500);
    }

    // ?demo=N skips straight into a bot match (attract mode / tests)
    if (Number(new URLSearchParams(location.search).get('demo') ?? 0) >= 2 && !this.registry.get('demoStarted')) this.scene.start('menu');
  }

  /** 📅 DAILY preview: what today's match is, what the medals pay, then START or close. */
  private dailyCard(): void {
    if (this.challengeUi.length) { this.challenges(0); return; } // (shares the overlay list; closing works the same)
    sfx.pickup();
    const d = dailySetup(), md = modeDef(d.mode), rec = loadDaily(), kid = getSettings().kidMode;
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x000000, 0.6).fillRect(0, 0, 1280, 720).fillStyle(0x140b05, 1).fillRoundedRect(240, 140, 800, 440, 22).lineStyle(3, 0x8dff6a, 1).strokeRoundedRect(240, 140, 800, 440, 22);
    const t = withShadow(this.add.text(640, 178, '📅 DAILY CHALLENGE', display(34, '#8dff6a', { strokeThickness: 6 })).setOrigin(0.5).setDepth(31), 3);
    const lines = [
      `Today: ${md.name}: ${md.blurb}`,
      `You play ${SPECIES[d.you].name} vs ${d.rivals.map((r, k) => `${SPECIES[r].name} (${kid ? 'easy' : DAILY.levels[k] ?? 'easy'})`).join(', ')}`,
      `Table: ${LAYOUTS[d.table].name} · first to ${DAILY.rounds} rounds · the same match for everyone today`,
      dailyMedalLine(d.date),
      `Last 7 days: ${weekStrip()}   (✔ won · ✖ played · · missed)`,
      rec.date === d.date ? `Today so far: ${rec.won ? 'won ✔' : 'not won yet'} · tries ${rec.tries} · win streak ${rec.streak} 🔥` : `Win streak: ${rec.streak} 🔥 (win today to keep it)`,
    ];
    const info = this.add.text(640, 222, lines.join('\n'), body(16, '#f1e4d2', 800, { align: 'center', wordWrap: { width: 720 }, lineSpacing: 8 })).setOrigin(0.5, 0).setDepth(31);
    for (let f = 16; info.y + info.height > 436 && f > 11;) info.setFontSize(--f); // always above COPY MY RESULT
    this.challengeUi.push(g, t, info);
    this.challengeUi.push(this.add.zone(640, 360, 1280, 720).setInteractive().setDepth(30)); // swallows clicks behind the card
    const start = new Button(this, 440, 528, { w: 220, h: 60, label: '▶ START', size: 24, accent: 0x8dff6a, onClick: () => { sfx.go(); this.scene.start('game', GameScene.dailyData()); } }, 31);
    const spicy = new Button(this, 670, 528, { w: 220, h: 60, label: '🌶️ SPICY', sub: spicyWonToday(d.date) ? 'beaten today ✔' : `HARD rivals · +${DAILY.spicyTokens} 🪙`, size: 20, accent: 0xff5a1a, onClick: () => { sfx.go(); this.scene.start('game', GameScene.dailyData(true)); } }, 31);
    const back = new Button(this, 880, 528, { w: 170, h: 60, label: '✖ BACK', size: 22, onClick: () => this.challenges(0) }, 31);
    // 📋 compare with friends: everyone plays the same Daily, so a pasted result line is a mini leaderboard
    const mine = (): FriendResult => { const r = loadDaily(), today = r.date === d.date; return { name: playerName() || 'You', date: d.date, won: today && r.won, medal: loadMeta().dailyMedal.date === d.date ? loadMeta().dailyMedal.medal : 0, best: today ? r.best : 0, streak: r.streak, spicy: spicyWonToday(d.date), you: true }; };
    const ensureName = (): boolean => { if (playerName()) return true; const n = window.prompt('Your name on the friend board (up to 14 letters):', '')?.trim(); if (!n) return false; setPlayerName(n); return true; };
    // 📋 compare with friends: everyone plays the same Daily, so a pasted result line is a mini leaderboard
    const copy: Button = new Button(this, 520, 462, { w: 230, h: 40, label: '📋 COPY MY RESULT', size: 16, accent: 0x8dd8ff, onClick: () => {
      if (!ensureName()) return;
      const line = resultLine(mine(), md.name, weekStrip());
      void navigator.clipboard?.writeText(line).catch(() => {}); sfx.pickup(); copy.setText('✔ COPIED', 'paste it to friends');
    } }, 31);
    const board = new Button(this, 760, 462, { w: 230, h: 40, label: '👥 FRIEND BOARD', size: 16, accent: 0xffd24a, onClick: () => { this.closeCard(); this.friendBoard(); } }, 31);
    this.challengeUi.push(board); this.extraBtns.push(board);
    this.challengeUi.push(start, spicy, back, copy); this.extraBtns.push(start, spicy, back, copy);
  }

  /** 👥 today's Daily, ranked: you plus every friend line pasted in (kept on this device). */
  /** Closes whatever card/overlay is open (never opens CHALLENGES the way the toggle would). */
  private closeCard(): void { if (this.challengeUi.length) this.challenges(0); }

  private friendBoard(): void {
    const d = dailySetup();
    this.closeCard(); // close the Daily card (shares the overlay list)
    sfx.pickup();
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x000000, 0.65).fillRect(0, 0, 1280, 720).fillStyle(0x140b05, 1).fillRoundedRect(240, 110, 800, 500, 22).lineStyle(3, 0xffd24a, 1).strokeRoundedRect(240, 110, 800, 500, 22);
    this.challengeUi.push(g, this.add.zone(640, 360, 1280, 720).setInteractive().setDepth(30));
    this.challengeUi.push(withShadow(this.add.text(640, 146, `👥 TODAY'S FRIEND BOARD · ${d.date}`, display(28, '#ffd24a', { strokeThickness: 5 })).setOrigin(0.5).setDepth(31), 3));
    const r = loadDaily(), today = r.date === d.date;
    const me: FriendResult = { name: playerName() || 'You', date: d.date, won: today && r.won, medal: loadMeta().dailyMedal.date === d.date ? loadMeta().dailyMedal.medal : 0, best: today ? r.best : 0, streak: r.streak, spicy: spicyWonToday(d.date), you: true };
    const all = [me, ...loadFriends(d.date)].sort((a, b) => score(b) - score(a));
    const medals = ['', '🥉', '🥈', '🥇'];
    const rows = all.map((f, k) => `${k === 0 ? '🏆' : `${k + 1}.`} ${f.name}${f.you ? ' (you)' : ''}  ·  ${f.won ? 'WON' : 'not won'} ${medals[f.medal] ?? ''}  ·  best ${f.best}  ·  🔥${f.streak}${f.spicy ? '  ·  🌶️' : ''}`);
    const t = this.add.text(640, 196, all.length > 1 ? rows.join('\n') : rows[0] + '\n\nNo friends on the board yet. Ask them to play today\'s Daily, press 📋 COPY MY RESULT and send you the line, then 📥 PASTE it here.', body(17, '#f1e4d2', 800, { align: 'center', wordWrap: { width: 720 }, lineSpacing: 8 })).setOrigin(0.5, 0).setDepth(31);
    for (let f = 17; t.height > 300 && f > 11;) t.setFontSize(--f);
    this.challengeUi.push(t);
    const paste = new Button(this, 440, 556, { w: 230, h: 54, label: '📥 PASTE A FRIEND', size: 17, accent: 0x8dff6a, onClick: () => {
      const line = window.prompt("Paste a friend's 📋 COPY MY RESULT line:", '');
      if (!line) return;
      const why = addFriend(line, d.date);
      if (why) { sfx.thwock(); window.alert(why); return; }
      sfx.matchWin(); this.closeCard(); this.friendBoard();
    } }, 31);
    const clear = new Button(this, 670, 556, { w: 180, h: 54, label: '🗑 CLEAR', size: 17, onClick: () => { clearFriends(d.date); sfx.thwock(); this.closeCard(); this.friendBoard(); } }, 31);
    const back = new Button(this, 870, 556, { w: 180, h: 54, label: '◀ DAILY', size: 18, onClick: () => { this.closeCard(); this.dailyCard(); } }, 31);
    this.challengeUi.push(paste, clear, back); this.extraBtns.push(paste, clear, back);
  }

  /** 🏁 CHALLENGES: start the Gauntlet (from any course you've reached = checkpoints) or open the Trials. */
  private challengeUi: (Button | Phaser.GameObjects.GameObject)[] = [];
  private challenges(pick: number): void {
    if (this.challengeUi.length) { for (const u of this.challengeUi) { if (u instanceof Button) { u.g.destroy(); u.label.destroy(); u.sub?.destroy(); u.zone.destroy(); } else u.destroy(); } this.challengeUi = []; this.extraBtns = this.extraBtns.filter(b => b.zone.active); return; }
    sfx.pickup();
    const g = this.add.graphics().setDepth(30);
    g.fillStyle(0x000000, 0.6).fillRect(0, 0, 1280, 720).fillStyle(0x140b05, 1).fillRoundedRect(190, 150, 900, 480, 22).lineStyle(3, 0xff5a7a, 1).strokeRoundedRect(190, 150, 900, 480, 22);
    const t = withShadow(this.add.text(640, 186, '🏁 CHALLENGES', display(34, '#ffcf8a', { strokeThickness: 6 })).setOrigin(0.5).setDepth(31), 3);
    const info = this.add.text(640, 548, `Checkpoints: clear a course's boss wave once, and later runs can start at the next course.\nBest wave: ${gauntletBest()}   ·   🗓 This week: ${weeklyBest()} (beat it: +${GAUNTLET.weeklyTokens} 🪙)   ·   👑 boss waves: +${GAUNTLET.bossTokens} 🪙 and a ❤`, body(14, '#cdb9a3', 800)).setOrigin(0.5).setDepth(31);
    const pass = this.add.text(640, 594, chefsPassText(), body(14, chefsPass() ? '#8dff6a' : '#ffcf8a', 900, { align: 'center', wordWrap: { width: 840 } })).setOrigin(0.5).setDepth(31);
    this.challengeUi.push(g, t, info, pass);
    this.challengeUi.push(this.add.zone(640, 360, 1280, 720).setInteractive().setDepth(30)); // swallows clicks between the buttons
    const close = new Button(this, 1050, 186, { w: 60, h: 44, label: '✖', size: 20, onClick: () => this.challenges(pick) }, 31);
    this.challengeUi.push(close); this.extraBtns.push(close);
    this.challengeUi.push(this.add.text(640, 236, 'GAUNTLET: pick where your run starts', body(16, '#ffd9a0', 900)).setOrigin(0.5).setDepth(31));
    const best = gauntletBest(), starts = GAUNTLET.courses.map((c, k) => ({ c, wave: 1 + k * GAUNTLET.bossEvery, open: k === 0 || best >= k * GAUNTLET.bossEvery }));
    starts.forEach((s, k) => {
      const b = new Button(this, 640 + (k - (starts.length - 1) / 2) * 205, 312, { w: 190, h: 100, label: s.c, sub: !s.open ? `🔒 clear wave ${s.wave - 1}` : s.wave === 1 ? 'from wave 1' : `start at wave ${s.wave}`, size: 17, accent: 0xff5a7a, disabled: !s.open, onClick: () => { sfx.go(); this.scene.start('game', GameScene.gauntletWave(s.wave, pick, { kind: 'local', index: 0 }, true)); } }, 31);
      this.challengeUi.push(b); this.extraBtns.push(b);
    });
    const pureLabel = () => `🧼 PURE RUN: ${GameScene.pureRun ? 'ON' : 'OFF'}`;
    const pb: Button = new Button(this, 640, 382, { w: 400, h: 36, label: pureLabel(), sub: '', size: 15, accent: 0x8dd8ff, onClick: () => { GameScene.pureRun = !GameScene.pureRun; sfx.pickup(); pb.setText(pureLabel(), GameScene.pureRun ? `no Pantry items · pure best ${pureBest()}` : ''); } }, 31);
    this.challengeUi.push(pb); this.extraBtns.push(pb);
    const tr = new Button(this, 640, 460, { w: 520, h: 84, label: '🎯 TRIALS', sub: `${TRIALS.length} fixed hard fights · 3 stars each · you have ${totalTrialStars()}★`, size: 26, accent: 0x8dd8ff, onClick: () => { sfx.go(); this.scene.start('trials'); } }, 31);
    this.challengeUi.push(tr); this.extraBtns.push(tr);
  }

  /** A bot-only demo match on a random table; any input returns to the title (see GameScene attract). */
  private startAttract(): void {
    const own = owned();
    const pool = own.kaiju.slice().sort(() => Math.random() - 0.5).slice(0, 4);
    this.scene.start('game', {
      slots: pool.map(() => ({ kind: 'bot', index: 0 })), difficulty: 'normal', species: pool,
      tables: [own.tables[Math.floor(Math.random() * own.tables.length)]], rounds: 3, powerups: true, attract: true,
    });
  }

  update(_t: number, delta: number): void {
    const dt = delta / 1000;
    this.t += dt;
    applyPendingUpdate();
    this.art?.setScale(this.art.scaleX * 0 + (1300 / this.art.width) * (1 + Math.sin(this.t * 0.25) * 0.008)); // slow breathing zoom
    if (this.challengeUi.length) { for (const b of this.extraBtns) b.update(dt); if (consumeTap('Escape')) this.challenges(0); clearTaps(); return; }
    this.nav.update(dt);
    for (const b of this.extraBtns) b.update(dt);
    this.idle += dt;
    if (navigator.getGamepads && Array.from(navigator.getGamepads()).some(g => g?.buttons.some(b => b.pressed))) this.idle = 0;
    if (ATTRACT_AFTER > 0 && this.idle > ATTRACT_AFTER) { this.idle = 0; this.startAttract(); return; }
    clearTaps();
  }
}
