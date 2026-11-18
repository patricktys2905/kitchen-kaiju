// 🎯 "What's next?" — the nearest Story unlock and the closest colour reward, for the title screen.
// EASY TO CUSTOMISE: change the wording here; unlocks live in src/story/unlocks.ts, colours in src/colours.ts.
import { COLOURS } from './colours';
import { SPECIES } from './sim/constants';
import { LAYOUTS } from './sim/layouts';
import { ACHIEVEMENTS, loadStats } from './stats';
import { CHAPTERS } from './story/chapters';
import { loadStory, totalStars } from './story/save';
import { isEarned, UNLOCKS } from './story/unlocks';

export function nextGoals(): string[] {
  const out: string[] = [];
  try {
    const story = loadStory(), st = loadStats();
    const u = UNLOCKS.filter(x => !isEarned(x, story)).sort((a, b) => ('chapter' in a.need ? a.need.chapter : 99) - ('chapter' in b.need ? b.need.chapter : 99))[0];
    if (u) {
      const prize = u.kind === 'kaiju' ? `🐉 ${SPECIES[u.index].full}` : `🍽 ${LAYOUTS[u.index].name}`;
      out.push('chapter' in u.need ? `Clear Story ch ${u.need.chapter + 1} (${CHAPTERS[u.need.chapter].title}) → ${prize}` : `${u.need.stars - totalStars(story)} more Story ★ → ${prize}`);
    }
    const col = COLOURS.filter(c => c.unlock && !st.achieved.includes(c.unlock)).map(c => ({ c, a: ACHIEVEMENTS.find(a => a.id === c.unlock) })).filter(x => x.a)
      .map(x => ({ ...x, k: x.a!.progress ? Math.min(0.99, x.a!.progress(st)[0] / x.a!.progress(st)[1]) : 0 })).sort((p, q) => q.k - p.k)[0];
    if (col) out.push(`${col.a!.desc} → 🎨 ${col.c.name} colour${col.k > 0 ? ` (${Math.round(col.k * 100)}%)` : ''}`);
  } catch { /* storage blocked */ }
  return out;
}
