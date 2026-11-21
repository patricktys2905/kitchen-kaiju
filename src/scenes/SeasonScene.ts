// 🏅 SEASON & RANKED screen: this month's season track, your rank, the ladder, and the PLAY RANKED button.
// Rules and numbers live in src/seasons.ts.
import { sfx } from '../audio';
import { gauntletTables } from '../gauntlet';
import { fitInside, hasArt, kaijuKey } from '../render/art';
import { body, display, withShadow } from '../render/fonts';
import { Button } from '../render/ui';
import { SPECIES } from '../sim/constants';
import { currentSeason, daysLeft, nextRank, rankOf, RANKS, SEASON, seasonName, takeSeasonRoll, tierOf } from '../seasons';
import { owned } from '../story/unlocks';
import { PanelScene } from './ExtrasScenes';
import type { GameData } from './GameScene';

export class SeasonScene extends PanelScene {
  protected title = '🏅 SEASON & RANKED';
  protected cols = 2;
  static pick = -1;
  constructor() { super('season'); }
  private again: number | null = null;
  init(data: { show?: number; again?: number }): void { this.startData = {}; this.again = data?.again ?? null; }

  /** A Ranked match: you + 3 bots set by your rank, best of 3, random table. */
  static rankedData(pick: number): GameData {
    const s = currentSeason(), rank = rankOf(s.rp);
    const pool = owned().kaiju.filter(k => k !== pick).sort(() => Math.random() - 0.5);
    const all = SPECIES.map((_, i) => i).filter(k => k !== pick && !pool.includes(k));
    const rivals = [...pool, ...all].slice(0, rank.bots.length);
    const tables = gauntletTables(owned().tables);
    return {
      slots: [{ kind: 'local', index: 0 }, ...rivals.map(() => ({ kind: 'bot' as const, index: 0 }))],
      difficulty: 'normal', species: [pick, ...rivals], tables: [tables[Math.floor(Math.random() * tables.length)]], rounds: 3,
      botLevels: [null, ...rank.bots], mode: 'classic', powerups: true, ranked: true,
    };
  }

  protected build(): void {
    if (this.again !== null) { const p = this.again; this.again = null; this.time.delayedCall(0, () => this.scene.start('game', SeasonScene.rankedData(p))); return; } // ▶ NEXT RANKED from the results screen
    const s = currentSeason(), roll = takeSeasonRoll();
    const own = owned().kaiju;
    if (!own.includes(SeasonScene.pick)) SeasonScene.pick = own[0] ?? 0;
    this.add.text(640, 100, `${seasonName(s.id)}  ·  season ${s.id}  ·  ${daysLeft()} day${daysLeft() === 1 ? '' : 's'} left`, body(19, '#ffd9a0', 900)).setOrigin(0.5).setDepth(5);
    if (roll) withShadow(this.add.text(640, 132, `Last season (${roll.from}) you reached ${roll.rank.icon} ${roll.rank.name}: +${roll.tokens} 🪙 paid!`, body(17, '#8dff6a', 900)).setOrigin(0.5).setDepth(5), 2);

    // ---- season track (left)
    const g = this.add.graphics().setDepth(4);
    const tier = tierOf(s.xp), into = s.xp - tier * SEASON.tierXp, done = tier >= SEASON.tiers;
    g.fillStyle(0x140b05, 0.85).fillRoundedRect(40, 160, 580, 250, 18).lineStyle(3, 0xffb347, 1).strokeRoundedRect(40, 160, 580, 250, 18);
    withShadow(this.add.text(330, 190, '🎟 SEASON TRACK', display(24, '#ffcf8a', { strokeThickness: 5 })).setOrigin(0.5).setDepth(5), 2);
    this.add.text(330, 226, done ? `TIER ${tier} · COMPLETE! 🎉` : `TIER ${tier} / ${SEASON.tiers}  ·  ${into}/${SEASON.tierXp} XP to tier ${tier + 1}`, body(17, '#f1e4d2', 800)).setOrigin(0.5).setDepth(5);
    // 20 pips (every 5th is a big reward)
    for (let i = 1; i <= SEASON.tiers; i++) {
      const x = 70 + (i - 1) * 27, big = i % 5 === 0, got = i <= tier;
      g.fillStyle(got ? 0xffd24a : 0x4a3a2e, 1).fillRoundedRect(x, big ? 254 : 260, 22, big ? 34 : 22, 6);
      if (i === tier + 1 && !done && into > 0) g.fillStyle(0x8dff6a, 1).fillRoundedRect(x, 296, 22 * Math.min(1, into / SEASON.tierXp), 6, 3);
    }
    this.add.text(330, 330, [
      `Every match you finish earns season XP (+${SEASON.xp.play} play, +${SEASON.xp.win} win, +${SEASON.xp.ko} per KO, +${SEASON.xp.ranked} in Ranked).`,
      `Each tier pays ${SEASON.tierTokens(1)} 🪙, every 5th tier ${SEASON.tierTokens(5)} 🪙. Next: ${done ? 'all paid!' : `${SEASON.tierTokens(tier + 1)} 🪙 at tier ${tier + 1}`}`,
    ].join('\n'), body(14, '#cdb9a3', 800, { align: 'center', wordWrap: { width: 540 }, lineSpacing: 4 })).setOrigin(0.5, 0).setDepth(5);

    // ---- rank card (right)
    const rank = rankOf(s.rp), next = nextRank(s.rp), best = rankOf(s.best);
    g.fillStyle(0x140b05, 0.85).fillRoundedRect(660, 160, 580, 250, 18).lineStyle(3, 0x8dd8ff, 1).strokeRoundedRect(660, 160, 580, 250, 18);
    withShadow(this.add.text(950, 200, `${rank.icon} ${rank.name}`, display(34, '#ffd24a', { strokeThickness: 6 })).setOrigin(0.5).setDepth(5), 3);
    this.add.text(950, 244, `${s.rp} RP${next ? `  ·  ${next.min - s.rp} to ${next.icon} ${next.name}` : '  ·  top of the ladder!'}`, body(17, '#f1e4d2', 800)).setOrigin(0.5).setDepth(5);
    const lo = rank.min, hi = next?.min ?? rank.min + 1, f = next ? (s.rp - lo) / (hi - lo) : 1;
    g.fillStyle(0x4a3a2e, 1).fillRoundedRect(720, 270, 460, 14, 7).fillStyle(0x8dd8ff, 1).fillRoundedRect(720, 270, Math.max(14, 460 * f), 14, 7);
    this.add.text(950, 300, [
      `This season: ${s.wins} win${s.wins === 1 ? '' : 's'} / ${s.played} played${s.streak > 1 ? ` · 🔥 ${s.streak} in a row` : ''} · best ${best.icon} ${best.name}`,
      `Your rivals at this rank: ${rank.bots.map(b => b.toUpperCase()).join(', ')} bots`,
    ].join('\n'), body(14, '#cdb9a3', 800, { align: 'center', lineSpacing: 4, wordWrap: { width: 540 } })).setOrigin(0.5, 0).setDepth(5);
    this.add.text(640, 512, `Win +${SEASON.rp.win} RP (first 3 games +${SEASON.rp.placeWin}, streaks add more) · lose ${SEASON.rp.loss} RP · season-end bonus for your best rank (${best.seasonTokens} 🪙 now) · next season starts at half your RP`, body(13, '#cdb9a3', 700, { align: 'center', wordWrap: { width: 1200 } })).setOrigin(0.5, 0).setDepth(5);

    // ---- ladder
    RANKS.forEach((r, i) => {
      const x = 120 + i * 208, here = r === rank;
      g.fillStyle(here ? 0x3a2a10 : 0x140b05, 0.85).fillRoundedRect(x - 96, 430, 192, 70, 12).lineStyle(2, here ? 0xffd24a : 0x6a5040, 1).strokeRoundedRect(x - 96, 430, 192, 70, 12);
      this.add.text(x, 450, `${r.icon} ${r.name}`, body(14, here ? '#ffd24a' : '#f1e4d2', 800)).setOrigin(0.5).setDepth(5);
      this.add.text(x, 476, `${r.min}+ RP · ${r.seasonTokens} 🪙`, body(13, '#cdb9a3', 700)).setOrigin(0.5).setDepth(5);
    });

    // ---- play
    if (hasArt(`kaiju-${SeasonScene.pick}`)) fitInside(this.add.image(250, 612, kaijuKey(this, SeasonScene.pick, undefined)), 90, 90).setDepth(5);
    this.buttons.push(new Button(this, 470, 612, { w: 300, h: 56, label: `🐉 ${SPECIES[SeasonScene.pick].name} ▶`, sub: 'your kaiju for Ranked', size: 18, accent: 0x8dd8ff, onClick: () => { const i = own.indexOf(SeasonScene.pick); SeasonScene.pick = own[(i + 1) % own.length]; sfx.pickup(); this.scene.restart({}); } }, 6));
    this.buttons.push(new Button(this, 860, 612, { w: 380, h: 84, label: '▶ PLAY RANKED', sub: `best of 3 vs ${rank.bots.length} bots · ${rank.icon} ${rank.name}`, size: 28, accent: 0xffd24a, onClick: () => { sfx.go(); this.scene.start('game', SeasonScene.rankedData(SeasonScene.pick)); } }, 6));
    if (s.history.length) this.add.text(640, 694, `Past seasons: ${s.history.slice(-4).map(h => `${h.id} ${rankOf(h.best).icon}`).join('  ·  ')}`, body(14, '#cdb9a3', 900)).setOrigin(0.5).setDepth(5);
  }
}
