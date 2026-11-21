// 🗝 DINNER DUNGEON screen: start a run, walk the map, pick relics, shop, rest, and launch fight rooms.
// Every change saves the run and rebuilds the screen (scene.restart), so the layout always matches the save.
// Rules and numbers live in src/dungeon.ts.
import { sfx } from '../audio';
import {
  buy, DUNGEON, dungeonBest, enterRoom, finishFight, loadRun, newRun, openRooms, relic, roomFoes, ROOM_INFO, runTokens,
  saveDungeonBest, saveRun, takeRelic, type DungeonRun, type Room,
} from '../dungeon';
import { gauntletTables } from '../gauntlet';
import { addTokens } from '../meta';
import { fitInside, hasArt, kaijuKey } from '../render/art';
import { body, display, withShadow } from '../render/fonts';
import { Button } from '../render/ui';
import { SPECIES } from '../sim/constants';
import { enabledMutators } from '../sim/mutators';
import { owned } from '../story/unlocks';
import { PanelScene } from './ExtrasScenes';
import type { GameData } from './GameScene';

const COL_X = (c: number) => 150 + c * 196;
const ROW_Y = (r: Room) => 196 + ((r.row + 0.5) / r.rows) * 300;

export class DungeonScene extends PanelScene {
  protected title = '🗝 DINNER DUNGEON';
  protected cols = 3;
  static pick = -1;
  private msg = '';
  private result: { room: number; won: boolean; kos: number } | null = null;
  private ended: DungeonRun | null = null;
  private abandonArmed = false;

  constructor() { super('dungeon'); }

  init(data: { show?: number; result?: { room: number; won: boolean; kos: number }; msg?: string; ended?: DungeonRun }): void {
    this.startData = {};
    this.result = data?.result ?? null;
    this.msg = data?.msg ?? '';
    this.ended = data?.ended ?? null;
    this.abandonArmed = false;
  }

  /** Save + redraw. */
  private refresh(run: DungeonRun | null, msg = ''): void {
    if (run?.over) { this.finish(run, msg); return; }
    saveRun(run);
    this.scene.restart({ msg });
  }

  /** The run is over: pay out, keep the best, show the summary. */
  private finish(run: DungeonRun, msg: string): void {
    const tokens = runTokens(run);
    if (tokens > 0) addTokens(tokens);
    const best = saveDungeonBest(run);
    saveRun(null);
    this.scene.restart({ ended: run, msg: `${msg}\n+${tokens} 🪙 tokens${best ? ' · ⭐ NEW BEST' : ''}` });
  }

  protected build(): void {
    let run = loadRun();
    // back from a fight room (or the game was closed mid-fight: that counts as a loss)
    if (run && (this.result || run.pending !== undefined)) {
      const r = this.result ?? { room: run.pending!, won: false, kos: 0 };
      run.pending = undefined;
      const line = finishFight(run, r.room, r.won, r.kos);
      this.result = null;
      if (r.won) sfx.matchWin(); else sfx.leave?.();
      if (run.over) { this.time.delayedCall(0, () => this.finish(run!, line)); return; }
      saveRun(run);
      this.msg = line;
    }
    if (this.ended) { this.drawEnded(this.ended); return; }
    if (!run) { this.drawStart(); return; }
    this.drawMap(run);
    if (run.treasure) this.drawTreasure(run);
    else if (run.shop) this.drawShop(run);
  }

  // ---------------------------------------------------------------- start
  private drawStart(): void {
    const own = owned().kaiju;
    if (!own.includes(DungeonScene.pick)) DungeonScene.pick = own[0] ?? 0;
    const sp = SPECIES[DungeonScene.pick];
    this.add.text(640, 120, 'A roguelike run through three courses: 🥗 STARTER · 🍖 MAIN COURSE · 🍰 DESSERT', body(18, '#ffd9a0', 900)).setOrigin(0.5).setDepth(5);
    this.add.text(640, 232, [
      '🗺 Pick your path on each floor\'s map. Every fight room is ONE round with ONE life.',
      `❤ You start with ${DUNGEON.lives} lives. Lose a room: lose a life (try another path). Lose them all: the run ends.`,
      '🎒 Relics change how your kaiju plays (faster, heavier, start holding a Skewer…) and they stack.',
      '⚔ FIGHT · 💀 ELITE (relic!) · 🎁 PANTRY · 🛒 SHOP · 🍲 SOUP BREAK · 👑 BOSS at the end of each floor.',
      '💾 The run saves after every room: leave any time and CONTINUE later.',
    ].join('\n'), body(17, '#f1e4d2', 800, { align: 'center', lineSpacing: 8, wordWrap: { width: 1100 } })).setOrigin(0.5).setDepth(5);
    if (hasArt(`kaiju-${DungeonScene.pick}`)) fitInside(this.add.image(640, 420, kaijuKey(this, DungeonScene.pick, undefined)), 110, 110).setDepth(5);
    const kb: Button = new Button(this, 640, 510, { w: 420, h: 48, label: `🐉 YOUR KAIJU: ${sp.name} ▶`, size: 18, accent: 0x8dd8ff, onClick: () => { const i = own.indexOf(DungeonScene.pick); DungeonScene.pick = own[(i + 1) % own.length]; sfx.pickup(); this.scene.restart({}); } }, 6);
    const go = new Button(this, 640, 596, { w: 420, h: 76, label: '▶ START THE DUNGEON', sub: dungeonBest() ? `best: ${dungeonBest() >= DUNGEON.floors.length ? 'CLEARED 🏆' : `reached ${DUNGEON.floors[dungeonBest()]}`}` : 'good luck, chef', size: 26, accent: 0xff9a3a, onClick: () => { sfx.go(); this.refresh(newRun(DungeonScene.pick), `${DUNGEON.floors[0]}: pick a room to start.`); } }, 6);
    this.buttons.push(kb, go);
  }

  private drawEnded(run: DungeonRun): void {
    const won = run.over === 'won';
    withShadow(this.add.text(640, 170, won ? '🏆 DUNGEON CLEARED!' : '💀 RUN OVER', display(48, won ? '#ffd24a' : '#ff8a7a', { strokeThickness: 7 })).setOrigin(0.5).setDepth(5), 4);
    if (hasArt(`kaiju-${run.pick}`)) fitInside(this.add.image(640, 290, kaijuKey(this, run.pick, undefined)), 120, 120).setDepth(5);
    const relics = run.relics.map(id => relic(id)?.name ?? id).join(' · ') || 'none';
    this.add.text(640, 430, [
      this.msg,
      `Reached: ${won ? 'the end of DESSERT' : DUNGEON.floors[run.floor]} · rooms won: ${run.cleared} · knockouts: ${run.kos}`,
      `🎒 ${relics}`,
    ].join('\n'), body(18, '#f1e4d2', 800, { align: 'center', lineSpacing: 8, wordWrap: { width: 1100 } })).setOrigin(0.5).setDepth(5);
    this.buttons.push(new Button(this, 520, 620, { w: 240, h: 64, label: '↻ NEW RUN', size: 22, accent: 0xff9a3a, onClick: () => { sfx.go(); this.scene.restart({}); } }, 6));
    this.buttons.push(new Button(this, 780, 620, { w: 240, h: 64, label: '☰ MENU', size: 22, onClick: () => this.back() }, 6));
  }

  // ---------------------------------------------------------------- map
  private drawMap(run: DungeonRun): void {
    const open = openRooms(run).map(r => r.id);
    const relics = run.relics.map(id => relic(id)?.name ?? id);
    this.add.text(640, 104, `${DUNGEON.floors[run.floor]} (floor ${run.floor + 1}/${DUNGEON.floors.length})   ·   ${'❤'.repeat(run.lives)}${'🤍'.repeat(Math.max(0, DUNGEON.maxLives - run.lives))}   ·   🪙 ${run.coins}   ·   🐉 ${SPECIES[run.pick].name}`, body(19, '#ffd9a0', 900)).setOrigin(0.5).setDepth(5);
    // paths
    const g = this.add.graphics().setDepth(4);
    for (const r of run.rooms) for (const n of r.next) {
      const to = run.rooms[n], hot = (run.at === r.id && open.includes(n));
      g.lineStyle(hot ? 6 : 3, hot ? 0xffd24a : 0x6a5040, hot ? 1 : 0.8);
      g.lineBetween(COL_X(r.col) + 78, ROW_Y(r), COL_X(to.col) - 78, ROW_Y(to));
    }
    for (const r of run.rooms) {
      const info = ROOM_INFO[r.kind], isOpen = open.includes(r.id), here = run.at === r.id, past = run.at !== null && r.col <= run.rooms[run.at].col && !here;
      const b = new Button(this, COL_X(r.col), ROW_Y(r), {
        w: 156, h: 66, label: `${info.icon} ${info.name}`, sub: here ? '📍 you are here' : isOpen ? 'tap to enter' : past ? '' : '', size: 17,
        accent: here ? 0x8dff6a : r.kind === 'boss' ? 0xff5a7a : r.kind === 'elite' ? 0xc98aff : isOpen ? 0xffd24a : 0x6a5a4a,
        disabled: !isOpen, onClick: () => this.enter(run, r),
      }, 6);
      if (past) b.g.setAlpha(0.45);
      this.buttons.push(b);
    }
    const desc = open.length ? openRooms(run).map(r => `${ROOM_INFO[r.kind].icon} ${ROOM_INFO[r.kind].name}: ${ROOM_INFO[r.kind].desc}`).filter((v, i, a) => a.indexOf(v) === i).join('\n') : '';
    if (this.msg) withShadow(this.add.text(640, 548, this.msg, display(22, /^(💔|💀)/u.test(this.msg) ? '#ffb347' : '#8dff6a', { strokeThickness: 5 })).setOrigin(0.5).setDepth(5), 3);
    this.add.text(640, 590, desc, body(15, '#cdb9a3', 900, { align: 'center' })).setOrigin(0.5, 0).setDepth(5);
    const rt = this.add.text(640, 668, `🎒 RELICS (${relics.length}): ${relics.join(' · ') || 'none yet: win an ELITE room or find a PANTRY'}`, body(15, '#ffcf8a', 800, { align: 'center', wordWrap: { width: 900 } })).setOrigin(0.5).setDepth(5);
    for (let f = 15; rt.height > 44 && f > 11;) rt.setFontSize(--f);
    const ab: Button = new Button(this, 1160, 668, { w: 190, h: 40, label: '✖ ABANDON RUN', size: 14, accent: 0x8a4a3a, onClick: () => {
      if (!this.abandonArmed) { this.abandonArmed = true; ab.setText('⚠ TAP AGAIN', 'ends the run'); this.time.delayedCall(3500, () => { this.abandonArmed = false; ab.setText('✖ ABANDON RUN'); }); return; }
      run.over = 'lost'; this.finish(run, 'You hung up your apron.');
    } }, 6);
    this.buttons.push(ab);
  }

  private enter(run: DungeonRun, room: Room): void {
    if (room.kind === 'fight' || room.kind === 'elite' || room.kind === 'boss') {
      sfx.go();
      run.pending = room.id;
      saveRun(run);
      this.scene.start('game', DungeonScene.roomData(run, room));
      return;
    }
    sfx.pickup();
    const line = enterRoom(run, room.id);
    this.refresh(run, line);
  }

  /** The match for a fight room: you + its bots, one round. */
  static roomData(run: DungeonRun, room: Room): GameData {
    const foes = roomFoes(run, room.kind);
    const pool = owned().kaiju.filter(k => k !== run.pick);
    const all = SPECIES.map((_, i) => i).filter(k => k !== run.pick && !pool.includes(k));
    const rivals: number[] = [];
    while (rivals.length < foes.levels.length) {
      const src = pool.length ? pool : all;
      rivals.push(src.splice(Math.floor(Math.random() * src.length), 1)[0]);
    }
    const tables = gauntletTables(owned().tables);
    const muts = enabledMutators().filter(m => m.id !== 'none');
    return {
      slots: [{ kind: 'local', index: 0 }, ...rivals.map(() => ({ kind: 'bot' as const, index: 0 }))],
      difficulty: 'normal', species: [run.pick, ...rivals], tables: [tables[Math.floor(Math.random() * tables.length)]], rounds: 1,
      botLevels: [null, ...foes.levels], mode: 'classic', powerups: true,
      mutator: foes.twist && muts.length ? muts[Math.floor(Math.random() * muts.length)].id : 'none',
      dungeon: { room: room.id, kind: room.kind, floor: run.floor, relics: run.relics.slice(), bosses: foes.boss ? [1] : [] },
    };
  }

  // ---------------------------------------------------------------- pantry + shop overlays
  private panel(title: string, sub: string): void {
    const g = this.add.graphics().setDepth(20);
    g.fillStyle(0x000000, 0.7).fillRect(0, 0, 1280, 720).fillStyle(0x140b05, 1).fillRoundedRect(160, 150, 960, 460, 22).lineStyle(3, 0xffd24a, 1).strokeRoundedRect(160, 150, 960, 460, 22);
    this.add.zone(640, 360, 1280, 720).setInteractive().setDepth(20); // nothing behind it can be clicked
    withShadow(this.add.text(640, 196, title, display(34, '#ffcf8a', { strokeThickness: 6 })).setOrigin(0.5).setDepth(21), 3);
    this.add.text(640, 240, sub, body(17, '#ffd9a0', 900, { align: 'center' })).setOrigin(0.5).setDepth(21);
    for (const b of this.buttons) b.disabled = true;
    this.buttons.length = 0; // only the panel's buttons take focus
  }

  private drawTreasure(run: DungeonRun): void {
    this.panel('🎁 PICK A RELIC', 'It lasts the whole run, and relics stack.');
    run.treasure!.forEach((id, k) => {
      const r = relic(id);
      if (!r) return;
      this.buttons.push(new Button(this, 340 + k * 300, 380, { w: 280, h: 150, label: r.name, sub: r.desc, size: 20, accent: 0xffd24a, onClick: () => { sfx.pickup(); takeRelic(run, id); this.refresh(run, `🎒 Got ${r.name}!`); } }, 22));
    });
    this.buttons.push(new Button(this, 640, 540, { w: 260, h: 48, label: 'SKIP (+10 🪙)', size: 17, onClick: () => { run.treasure = undefined; run.coins += 10; this.refresh(run, 'Skipped. +10 🪙'); } }, 22));
  }

  private drawShop(run: DungeonRun): void {
    const shop = run.shop!;
    this.panel('🛒 THE SHOP', `You have 🪙 ${run.coins}  ·  relic ${DUNGEON.prices.relic} 🪙  ·  ❤ +1 life ${DUNGEON.prices.heal} 🪙`);
    shop.offers.forEach((id, k) => {
      const r = relic(id), sold = shop.bought.includes(id);
      if (!r) return;
      this.buttons.push(new Button(this, 340 + k * 300, 370, { w: 280, h: 140, label: sold ? `✔ ${r.name}` : r.name, sub: sold ? 'bought' : `${r.desc}\n${DUNGEON.prices.relic} 🪙`, size: 19, accent: 0xffd24a, disabled: sold || run.coins < DUNGEON.prices.relic, onClick: () => { if (buy(run, id)) { sfx.pickup(); this.refresh(run, `🎒 Bought ${r.name}!`); } } }, 22));
    });
    this.buttons.push(new Button(this, 500, 530, { w: 260, h: 56, label: shop.healed ? '✔ ❤ LIFE BOUGHT' : `❤ +1 LIFE (${DUNGEON.prices.heal} 🪙)`, size: 17, accent: 0xff7a8a, disabled: shop.healed || run.coins < DUNGEON.prices.heal || run.lives >= DUNGEON.maxLives, onClick: () => { if (buy(run, 'heal')) { sfx.pickup(); this.refresh(run, '❤ +1 life'); } } }, 22));
    this.buttons.push(new Button(this, 780, 530, { w: 260, h: 56, label: 'LEAVE THE SHOP ▶', size: 18, onClick: () => { run.shop = undefined; this.refresh(run, 'Pick your next room.'); } }, 22));
  }
}
