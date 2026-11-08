// How hard is each story chapter? A fixed "reference" bot plays every chapter many times.
import { BotBrain } from '../src/sim/bot';
import { SPECIES } from '../src/sim/constants';
import { World } from '../src/sim/world';
import { CHAPTERS as MAIN, chapterRivals } from '../src/story/chapters';
import { SECONDS_CHAPTERS } from '../src/story/seconds';
// CAMPAIGN=seconds RUNS=100 npx vite-node scripts/story-balance.ts
const CHAPTERS = process.env.CAMPAIGN === 'seconds' ? SECONDS_CHAPTERS : MAIN;
const DT = 1 / 120, RUNS = Number(process.env.RUNS ?? 30), PICK = 0;
for (const [ci, ch] of CHAPTERS.entries()) {
  const rivals = chapterRivals(ch, PICK);
  let wins = 0;
  for (let run = 0; run < RUNS; run++) {
    const w = new World({ players: [PICK, ...rivals.map(r => r.species)].map(s => ({ name: SPECIES[s].name, species: s })), kaijuPowers: process.env.POWERS !== '0', seed: 1000 + run * 7 + ci, layout: ch.table, target: ch.rounds, mutator: ch.mutator ?? 'none' });
    const bots = [new BotBrain(0, 'reference', run), ...rivals.map((r, k) => new BotBrain(k + 1, r.level, run * 13 + k))];
    const boostBosses = () => rivals.forEach((r, k) => { if (r.boss) w.players[k + 1].meter = 100; });
    boostBosses();
    let t = 0;
    while (w.phase !== 'matchEnd' && t < 900) {
      w.step(DT, bots.map(b => b.decide(w, DT)));
      for (const e of w.drainEvents()) if (e.type === 'roundStart') boostBosses();
      t += DT;
    }
    if (w.winner === 0) wins++;
  }
  console.log(`${String(ci + 1).padStart(2)}. ${ch.title.padEnd(22)} ${rivals.length} rival${rivals.length > 1 ? 's' : ' '}${ch.boss ? ' +boss' : '      '}  reference wins ${String(Math.round((100 * wins) / RUNS)).padStart(3)}%`);
}
