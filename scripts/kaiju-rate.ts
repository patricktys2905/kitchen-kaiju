// How often does KAIJU happen? Reference bot vs 3 normal bots over many rounds. Usage: npx vite-node scripts/kaiju-rate.ts
import { BotBrain } from '../src/sim/bot';
import { SPECIES } from '../src/sim/constants';
import { World } from '../src/sim/world';
const DT = 1 / 120, RUNS = Number(process.env.RUNS ?? 40);
let rounds = 0, roundsWithKaiju = 0, kaijuTotal = 0, powers = 0, roundTime = 0;
for (let run = 0; run < RUNS; run++) {
  const sp = [0, 1, 2, 3].map(k => (run * 4 + k) % 20);
  const w = new World({ players: sp.map(s => ({ name: SPECIES[s].name, species: s })), kaijuPowers: true, seed: 300 + run, target: 3 });
  const bots = sp.map((_, k) => new BotBrain(k, k === 0 ? 'reference' : 'normal', run * 7 + k));
  let t = 0, thisRound = 0;
  while (w.phase !== 'matchEnd' && t < 900) {
    w.step(DT, bots.map(b => b.decide(w, DT)));
    for (const e of w.drainEvents()) {
      if (e.type === 'kaiju') { kaijuTotal++; thisRound++; }
      if (e.type === 'power') powers++;
      if (e.type === 'roundEnd') { rounds++; if (thisRound) roundsWithKaiju++; thisRound = 0; roundTime += w.roundT; }
    }
    t += DT;
  }
}
console.log(`rounds ${rounds} · rounds with a KAIJU ${Math.round(100 * roundsWithKaiju / rounds)}% · KAIJU per round ${(kaijuTotal / rounds).toFixed(2)} · powers per round ${(powers / rounds).toFixed(2)} · avg round ${(roundTime / rounds).toFixed(1)}s`);
