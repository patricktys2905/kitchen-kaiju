// Per-difficulty bot report from mixed matches: throw hit rate, KOs dealt, round wins.
// Seat 0 is a "human stand-in" (normal bot) so we see how hard each bot level is to survive against.
import { BotBrain, type Difficulty } from '../src/sim/bot';
import { World } from '../src/sim/world';
const DT = 1 / 120;
const lineup: Difficulty[] = ['normal', 'easy', 'easy', 'easy'];
const levels = (process.argv[2] ?? 'easy,normal,hard').split(',') as Difficulty[];
for (const lvl of levels) {
  lineup[1] = lineup[2] = lineup[3] = lvl;
  let throws = 0, hits = 0, deaths0 = 0, rounds = 0, wins0 = 0, cutleryDeaths0 = 0;
  const causes0: Record<string, number> = {};
  for (let seed = 1; seed <= 10; seed++) {
    const w = new World({ players: lineup.map((_, i) => ({ name: 'P' + i })), seed });
    const bots = lineup.map((d, i) => new BotBrain(i, d, seed * 17 + i));
    let t = 0;
    while (w.phase !== 'matchEnd' && t < 1200) {
      w.step(DT, bots.map(b => b.decide(w, DT)));
      for (const e of w.drainEvents()) {
        if (e.type === 'throw' && e.id !== 0) throws++;
        if (e.type === 'ko' && e.cause === 'cutlery' && e.by !== null && e.by !== 0) hits++;
        if (e.type === 'ko' && e.id === 0) { deaths0++; causes0[e.cause] = (causes0[e.cause] ?? 0) + 1; if (e.cause === 'cutlery') cutleryDeaths0++; }
        if (e.type === 'roundEnd') { rounds++; if (e.winner === 0) wins0++; }
      }
      t += DT;
    }
  }
  console.log(`${lvl.padEnd(6)} bots: hit rate ${(100 * hits / throws).toFixed(1)}% of throws | stand-in wins ${(100 * wins0 / rounds).toFixed(0)}% of rounds (fair share 25%) | stand-in died ${deaths0}x in ${rounds} rounds:`, causes0);
}
