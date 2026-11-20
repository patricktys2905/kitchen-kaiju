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
    { mode: 'classic', rounds: 2 }, // the final (worth ×2 points)
  ] as { mode: GameMode; rounds: number }[],
  points: [5, 3, 2, 1, 0, 0], // 1st, 2nd, 3rd…
};

/** Cup length: 'short' = 3 games (classic, Golden Spoon, final) or 'full'. Saved on this device. EASY TO CHANGE. */
export type CupLength = 'short' | 'full';
export function cupLength(): CupLength { try { return localStorage.getItem('kk-cup-length') === 'full' ? 'full' : 'short'; } catch { return 'short'; } } // short by default (≈ 3 games)
export function setCupLength(v: CupLength): void { try { localStorage.setItem('kk-cup-length', v); } catch { /* blocked */ } }

/** The games this group can play (skips modes that need more players than there are). */
export const cupGames = (players: number, len: CupLength = cupLength()) => {
  const all = CUP.games.filter(g => players >= modeDef(g.mode).minPlayers);
  return len === 'short' ? [all[0], all.find(g => g.mode === 'goldenSpoon') ?? all[1], all[all.length - 1]] : all;
};

/** The last game of a Cup is worth this many times the points. EASY TO CHANGE. */
export const FINAL_MULTIPLIER = 2;

/** One line that explains Cup scoring (shown on every standings screen). */
export const cupRules = (teams = false): string => `Points: ${CUP.points.filter(v => v > 0).map((v, k) => `${['1st', '2nd', '3rd', '4th', '5th'][k]} +${v}`).join(' · ')} · ties share the better place · final ×${FINAL_MULTIPLIER}${teams ? ' · teammates share their team\'s place' : ''}`;

/** What a game mode ranks you by (shown under Cup standings so the points make sense). */
export const RANKED_BY: Partial<Record<GameMode, string>> = {
  crumbRush: 'Crumb Rush places: round winner, then most crumbs HELD at the end (a knockout drops half)',
  goldenSpoon: 'Golden Spoon places: rounds won, then seconds holding the spoon',
  hotDumpling: 'Hot Dumpling places: rounds survived, then knockouts',
};

/** 🏆 Cup Shelf: the last few Cup winners on this device. */
export interface ShelfEntry { date: string; name: string; species: number; pts: number }
export function cupShelf(): ShelfEntry[] { try { return JSON.parse(localStorage.getItem('kk-cup-shelf') ?? '[]') as ShelfEntry[]; } catch { return []; } }
export function addToShelf(e: ShelfEntry): void { const s = [e, ...cupShelf()].slice(0, 8); try { localStorage.setItem('kk-cup-shelf', JSON.stringify(s)); } catch { /* blocked */ } }

/** Cup points by finishing place. In Team Feast (teams = true) every teammate gets their TEAM's place. */
export function placePoints(players: { score: number; kos: number; pts?: number; team?: number }[], teams = false): number[] {
  if (teams) {
    const ids = [...new Set(players.map(p => p.team ?? 0))];
    const tkey = (t: number) => { const m = players.filter(p => (p.team ?? 0) === t); return Math.max(...m.map(p => p.score)) * 1000 + m.reduce((a, p) => a + p.kos, 0); };
    return players.map(p => CUP.points[ids.filter(t => tkey(t) > tkey(p.team ?? 0)).length] ?? 0);
  }
  // rounds won first, then the mode's own points (crumbs held, spoon seconds), then knockouts
  const key = (p: { score: number; kos: number; pts?: number }) => p.score * 1e7 + Math.floor((p.pts ?? 0) * 10) * 100 + p.kos;
  return players.map(p => {
    const better = players.filter(q => key(q) > key(p)).length;
    return CUP.points[better] ?? 0;
  });
}
