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
    { mode: 'classic', rounds: 3 }, // the final
  ] as { mode: GameMode; rounds: number }[],
  points: [5, 3, 2, 1, 0, 0], // 1st, 2nd, 3rd…
};

/** The games this group can play (skips modes that need more players than there are). */
export const cupGames = (players: number) => CUP.games.filter(g => players >= modeDef(g.mode).minPlayers);

/** Points for each player from a finished match: ranked by round wins, then KOs; ties share the better place. */
export function placePoints(players: { score: number; kos: number }[]): number[] {
  const key = (p: { score: number; kos: number }) => p.score * 1000 + p.kos;
  return players.map(p => {
    const better = players.filter(q => key(q) > key(p)).length;
    return CUP.points[better] ?? 0;
  });
}
