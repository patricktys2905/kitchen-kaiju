// 🏆 Party Cup: a series of short matches in different modes; points for where you finish each one.
// EASY TO CUSTOMISE: the game list, rounds per game and the points table.
import type { GameMode } from './sim/modes';
import { modeDef } from './sim/modes';

export const CUP = {
  games: [
    { mode: 'classic', rounds: 2 },
    { mode: 'crumbRush', rounds: 1 },
    { mode: 'hotDumpling', rounds: 2 },
    { mode: 'teams', rounds: 2 },
    { mode: 'goldenSpoon', rounds: 1 },
    { mode: 'classic', rounds: 3 }, // the final
  ] as { mode: GameMode; rounds: number }[],
  points: [5, 3, 2, 1, 0, 0], // 1st, 2nd, 3rd…
};

/** Cup length: 'short' = 3 games (classic, Golden Spoon, final) or 'full'. Saved on this device. EASY TO CHANGE. */
export type CupLength = 'short' | 'full';
export function cupLength(): CupLength { try { return localStorage.getItem('kk-cup-length') === 'short' ? 'short' : 'full'; } catch { return 'full'; } }
export function setCupLength(v: CupLength): void { try { localStorage.setItem('kk-cup-length', v); } catch { /* blocked */ } }

/** The games this group can play (skips modes that need more players than there are). */
export const cupGames = (players: number, len: CupLength = cupLength()) => {
  const all = CUP.games.filter(g => players >= modeDef(g.mode).minPlayers);
  return len === 'short' ? [all[0], all.find(g => g.mode === 'goldenSpoon') ?? all[1], all[all.length - 1]] : all;
};

/** Points for each player from a finished match: ranked by round wins, then KOs; ties share the better place. */
/** Cup points by finishing place. In Team Feast (teams = true) every teammate gets their TEAM's place. */
export function placePoints(players: { score: number; kos: number; team?: number }[], teams = false): number[] {
  if (teams) {
    const ids = [...new Set(players.map(p => p.team ?? 0))];
    const tkey = (t: number) => { const m = players.filter(p => (p.team ?? 0) === t); return Math.max(...m.map(p => p.score)) * 1000 + m.reduce((a, p) => a + p.kos, 0); };
    return players.map(p => CUP.points[ids.filter(t => tkey(t) > tkey(p.team ?? 0)).length] ?? 0);
  }
  const key = (p: { score: number; kos: number }) => p.score * 1000 + p.kos;
  return players.map(p => {
    const better = players.filter(q => key(q) > key(p)).length;
    return CUP.points[better] ?? 0;
  });
}
