// Headless balance report: simulate many bot matches, print pacing + how KOs happen.
import { BotBrain, type Difficulty } from '../src/sim/bot';
import { World } from '../src/sim/world';
const DT = 1 / 120;
const diff = (process.argv[2] ?? 'normal') as Difficulty;
const n = Number(process.argv[3] ?? 4);
let rounds = 0, roundTime = 0, matches = 0;
const causes: Record<string, number> = {};
let kaijus = 0, steals = 0, catches = 0, throws = 0, hands = 0, nobody = 0;
for (let seed = 1; seed <= 12; seed++) {
  const w = new World({ players: Array.from({ length: n }, (_, i) => ({ name: 'B' + i })), seed });
  const bots = w.players.map((_, i) => new BotBrain(i, diff, seed * 31 + i));
  let t = 0;
  while (w.phase !== 'matchEnd' && t < 1500) {
    w.step(DT, bots.map(b => b.decide(w, DT)));
    for (const e of w.drainEvents()) {
      if (e.type === 'ko') causes[e.cause] = (causes[e.cause] ?? 0) + 1;
      if (e.type === 'roundEnd') { rounds++; roundTime += w.roundT; if (e.winner === null) nobody++; }
      if (e.type === 'kaiju') kaijus++;
      if (e.type === 'pickup' && e.stolenFrom !== null) steals++;
      if (e.type === 'catch' && e.from !== e.id) catches++;
      if (e.type === 'throw') throws++;
      if (e.type === 'handSweep') hands++;
    }
    t += DT;
  }
  if (w.phase === 'matchEnd') matches++;
}
console.log(`${diff} x${n}: matches done ${matches}/12, rounds ${rounds}, avg round ${(roundTime / rounds).toFixed(1)}s, draws ${nobody}`);
console.log('KO causes', causes);
console.log(`per round: throws ${(throws / rounds).toFixed(1)}, kaiju ${(kaijus / rounds).toFixed(2)}, steals ${(steals / rounds).toFixed(2)}, catches ${(catches / rounds).toFixed(2)}, hand sweeps ${(hands / rounds).toFixed(2)}`);
