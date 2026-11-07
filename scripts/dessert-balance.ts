// How hard is each Dessert Course fight? Same method as story-balance.ts. Usage: npx vite-node scripts/dessert-balance.ts
import { BotBrain } from '../src/sim/bot';
import { SPECIES } from '../src/sim/constants';
import { World } from '../src/sim/world';
import { chapterRivals } from '../src/story/chapters';
import { COURSES } from '../src/story/dessert';
const DT = 1 / 120, RUNS = Number(process.env.RUNS ?? 30), PICK = 0;
for (const [ci, ch] of COURSES.entries()) {
  const rivals = chapterRivals(ch, PICK);
  let wins = 0;
  for (let run = 0; run < RUNS; run++) {
    const w = new World({ players: [PICK, ...rivals.map(r => r.species)].map(s => ({ name: SPECIES[s].name })), seed: 2000 + run * 7 + ci, layout: ch.table, target: ch.rounds });
    const bots = [new BotBrain(0, 'reference', run), ...rivals.map((r, k) => new BotBrain(k + 1, r.level, run * 13 + k))];
    const boost = () => rivals.forEach((r, k) => { if (r.boss) w.players[k + 1].meter = 100; });
    boost();
    let t = 0;
    while (w.phase !== 'matchEnd' && t < 900) {
      w.step(DT, bots.map(b => b.decide(w, DT)));
      for (const e of w.drainEvents()) if (e.type === 'roundStart') boost();
      t += DT;
    }
    if (w.winner === 0) wins++;
  }
  console.log(`${ci + 1}. ${ch.title.padEnd(22)} ${rivals.length} rivals  reference wins ${String(Math.round((100 * wins) / RUNS)).padStart(3)}%`);
}
