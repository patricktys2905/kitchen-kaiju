// 🎯 "What's next?" — the nearest Story unlock and the closest colour reward, for the title screen.
// EASY TO CUSTOMISE: change the wording here; unlocks live in src/story/unlocks.ts, colours in src/colours.ts.
import { COLOURS } from './colours';
import { SPECIES } from './sim/constants';
import { LAYOUTS } from './sim/layouts';
import { ACHIEVEMENTS, loadStats } from './stats';
import { CHAPTERS } from './story/chapters';
import { loadStory, totalStars } from './story/save';
import { isEarned, needText, UNLOCKS } from './story/unlocks';
import { FIRST_SERVICE, nextStep, pinnedAchievement, stepsDone } from './meta';

export function nextGoals(): string[] {
  const out: string[] = [];
  try {
    const story = loadStory(), st = loadStats();
    const step = nextStep(); // 🍽 First Service checklist comes first while it lasts
    if (step) out.push(`🍽 FIRST SERVICE ${stepsDone().length}/${FIRST_SERVICE.length}: ${step.text} (+${step.reward} 🪙)`);
    const pin = pinnedAchievement(), pa = pin ? ACHIEVEMENTS.find(a => a.id === pin) : null; // 📌 the achievement you pinned in Records
    if (pa && !st.achieved.includes(pa.id)) out.push(`📌 ${pa.name}: ${pa.desc}${pa.progress ? ` (${Math.min(pa.progress(st)[0], pa.progress(st)[1])}/${pa.progress(st)[1]})` : ''}`);
    const u = UNLOCKS.filter(x => !isEarned(x, story)).sort((a, b) => ('chapter' in a.need ? a.need.chapter : 99) - ('chapter' in b.need ? b.need.chapter : 99))[0];
    if (u) {
      const prize = u.kind === 'kaiju' ? `🐉 ${SPECIES[u.index].full}` : `🍽 ${LAYOUTS[u.index].name}`;
      out.push('chapter' in u.need ? `Clear Story ch ${u.need.chapter + 1} (${CHAPTERS[u.need.chapter].title}) → ${prize}` : 'stars' in u.need ? `${u.need.stars - totalStars(story)} more Story ★ → ${prize}` : `${needText(u)} → ${prize}`);
    }
    const col = COLOURS.filter(c => c.unlock && !st.achieved.includes(c.unlock)).map(c => ({ c, a: ACHIEVEMENTS.find(a => a.id === c.unlock) })).filter(x => x.a)
      .map(x => ({ ...x, k: x.a!.progress ? Math.min(0.99, x.a!.progress(st)[0] / x.a!.progress(st)[1]) : 0 })).sort((p, q) => q.k - p.k)[0];
    if (col) out.push(`${col.a!.desc} → 🎨 ${col.c.name} colour${col.k > 0 ? ` (${Math.round(col.k * 100)}%)` : ''}`);
  } catch { /* storage blocked */ }
  return out;
}
