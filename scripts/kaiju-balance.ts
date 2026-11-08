// Does any kaiju win too often (or too rarely) with its power + trait? Every kaiju plays 4-player free-for-alls
// against random rivals, all normal bots, on all tables. Fair share = 25%.
// Usage: RUNS=60 npx vite-node scripts/kaiju-balance.ts   (POWERS=0 for the Classic baseline)
import { BotBrain } from '../src/sim/bot';
import { LAYOUTS } from '../src/sim/layouts';
import { SPECIES } from '../src/sim/constants';
import { Rng } from '../src/sim/rng';
import { World } from '../src/sim/world';
import { KITS } from '../src/sim/powers';
const DT = 1 / 120, RUNS = Number(process.env.RUNS ?? 40), POWERS = process.env.POWERS !== '0';
const tables = LAYOUTS.map((_, i) => i).filter(i => !LAYOUTS[i].locked || true);
const rows: [string, number, number][] = [];
for (let s = 0; s < SPECIES.length; s++) {
  let wins = 0, powerUses = 0;
  const rng = new Rng(9000 + s);
  for (let run = 0; run < RUNS; run++) {
    const others = rng.shuffle(SPECIES.map((_, i) => i).filter(i => i !== s)).slice(0, 3);
    const seat = run % 4, lineup = others.slice(); lineup.splice(seat, 0, s);
    const w = new World({ players: lineup.map(sp => ({ name: SPECIES[sp].name, species: sp })), kaijuPowers: POWERS, seed: 500 + run * 31 + s, layout: tables[run % tables.length], target: 3 });
    const bots = lineup.map((_, k) => new BotBrain(k, 'normal', run * 17 + k + s));
    let t = 0;
    while (w.phase !== 'matchEnd' && t < 900) {
      w.step(DT, bots.map(b => b.decide(w, DT)));
      for (const e of w.drainEvents()) if (e.type === 'power' && e.id === seat) powerUses++;
      t += DT;
    }
    if (w.winner === seat) wins++;
  }
  rows.push([`${SPECIES[s].full} (${KITS[s].power})`, Math.round((100 * wins) / RUNS), Math.round(powerUses / RUNS * 10) / 10]);
}
rows.sort((a, b) => b[1] - a[1]);
for (const [n, wr, pu] of rows) console.log(`${n.padEnd(34)} wins ${String(wr).padStart(3)}%   powers/match ${pu}`);
