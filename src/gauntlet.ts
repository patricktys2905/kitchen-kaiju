// Gauntlet: solo survival. A few lives (❤); each wave is a single round against more (and tougher) bots. Lose a wave = lose a life and retry it.
// EASY TO CUSTOMISE: change waveSetup() or the numbers in GAUNTLET.
import type { Difficulty } from './sim/bot';
import { RULES } from './sim/constants';
import { LAYOUTS } from './sim/layouts';

export const GAUNTLET = {
  powerups: true, // condiments on the table
  mode: 'classic' as const,
  bossEvery: 4, // every 4th wave (the end of each course) one rival starts each round able to go KAIJU (crowned)
  twistFrom: 7, // from wave 7 on, odd waves get a random twist
  courses: ['🥗 STARTERS', '🍖 MAINS', '🍰 DESSERTS', '🍽 SECONDS'], // 4 waves each; Seconds goes on forever
  grades: [[1500, 'S'], [1000, 'A'], [650, 'B'], [350, 'C'], [0, 'D']] as [number, string][], // run score → grade
  lives: 3, // ❤ per run: losing a wave costs one and retries the same wave
  maxLives: 5,
  bossTokens: 30, // 🪙 bonus for clearing a boss wave
  weeklyTokens: 25, // 🪙 for beating this week's best wave
  bossHeart: true, // ❤ +1 life (up to maxLives) for clearing each boss wave (4, 8, 12 …)
};

export interface WaveSetup {
  rivals: number; // how many bots
  levels: Difficulty[]; // one per bot
  boss: boolean;
}

/** The first 8 waves, hand-tuned so each step is a small one (EASY TO CUSTOMISE). Boss waves (4, 8) keep the count down. */
export const OPENING_WAVES: Difficulty[][] = [
  ['easy'], // 1: warm-up
  ['normal'], // 2: a fair duel
  ['normal', 'easy'], // 3: first two-on-one
  ['tough', 'normal'], // 4: 👑 boss (end of Starters): the hardest wave so far
  ['tough', 'normal', 'easy'], // 5
  ['hard', 'normal', 'easy'], // 6
  ['hard', 'tough', 'normal'], // 7: first twist
  ['hard', 'hard', 'tough'], // 8: 👑 boss (end of Mains)
];

/** Wave 1: one easy bot (warm-up) … a gentle ramp through OPENING_WAVES, then more and tougher bots (max 5 rivals). */
export function waveSetup(wave: number): WaveSetup {
  const open = OPENING_WAVES[wave - 1];
  const rivals = open ? open.length : Math.min(5, 3 + Math.floor((wave - 7) / 3)); // 3, 4 (wave 10), 5 (wave 13)
  const levels: Difficulty[] = open ? [...open] : Array.from({ length: rivals }, (_, i) => {
    const heat = wave - 1 - i * 2; // later seats lag behind the first one
    return heat >= 11 ? 'brutal' : heat >= 6 ? 'hard' : heat >= 3 ? 'tough' : heat >= 1 ? 'normal' : 'easy'; // BRUTAL in Seconds (wave 12+)
  });
  return { rivals, levels, boss: wave % GAUNTLET.bossEvery === 0 };
}

/** One line previewing a wave (shown after you clear the one before). */
export function wavePreview(wave: number): string {
  const ws = waveSetup(wave);
  return `Next: wave ${wave} · ${ws.rivals} rival${ws.rivals === 1 ? '' : 's'} (${ws.levels.map(l => l.toUpperCase()).join(', ')})${ws.boss ? ' · 👑 BOSS wave' : ''}${wave >= GAUNTLET.twistFrom && wave % 2 === 1 ? ' · ⚡ twist wave' : ''}`;
}

/** 🎁 Perks you pick between Gauntlet waves; they stack and last the whole run. EASY TO CUSTOMISE. */
export interface Perk { id: string; name: string; desc: string; apply: (p: { meter: number; shieldT: number; speedT: number; sugarT: number; invT: number }) => void; once?: boolean /* picked again? no: one-off perks like an extra life */ }
export const GAUNTLET_PERKS: Perk[] = [
  { id: 'belly', name: '🍪 Full Belly', desc: 'Start each wave 40% nearer KAIJU', apply: p => { p.meter = Math.min(100, p.meter + 40); } },
  { id: 'shield', name: '🟡 Mustard Coat', desc: 'A shield that blocks one hit', apply: p => { p.shieldT = 60; } },
  { id: 'speed', name: '🌶️ Hot Feet', desc: 'Move faster every wave', apply: p => { p.speedT = 60; } },
  { id: 'sugar', name: '🍬 Sugar Rush', desc: 'Dash and swipe recharge fast', apply: p => { p.sugarT = 60; } },
  { id: 'ghost', name: '👻 Ghost Start', desc: 'Untouchable for the first 3 s of each wave', apply: p => { p.invT = Math.max(p.invT, RULES.countdown + 3); } }, // applied at the countdown, so add its length
  { id: 'heart', name: '❤ Extra Life', desc: 'One more life for this run', apply: () => { /* counted in the run, see GameScene */ }, once: true },
];

/** Which course a wave is in (4 waves per course). */
export const waveCourse = (wave: number): string => GAUNTLET.courses[Math.min(GAUNTLET.courses.length - 1, Math.floor((wave - 1) / GAUNTLET.bossEvery))];
/** Run score: 100 per cleared wave + 10 per knockout. */
export const runScore = (cleared: number, kos: number): number => cleared * 100 + kos * 10;
export const runGrade = (score: number): string => GAUNTLET.grades.find(([min]) => score >= min)?.[1] ?? 'D';

/** Which tables a wave can use (any you own). */
export const gauntletTables = (owned: number[]): number[] => { const base = owned.filter(i => !LAYOUTS[i]?.custom); return base.length ? base : LAYOUTS.map((_, i) => i).filter(i => !LAYOUTS[i].custom); }; // Workshop tables stay out of runs

const KEY = 'kk-gauntlet-best';
export const gauntletBest = (): number => Number(localStorage.getItem(KEY) ?? 0) || 0;
export function saveGauntletBest(wave: number): boolean {
  if (wave <= gauntletBest()) return false;
  try { localStorage.setItem(KEY, String(wave)); } catch { /* blocked */ }
  return true;
}

/** The furthest course start you've unlocked (a boss wave cleared once = the next course is a checkpoint). */
export function checkpointWave(): number {
  const best = gauntletBest();
  let k = 0;
  while (k + 1 < GAUNTLET.courses.length && best >= (k + 1) * GAUNTLET.bossEvery) k++;
  return 1 + k * GAUNTLET.bossEvery;
}

/** 🗓 This week's Gauntlet best (resets every Monday). Beating it pays GAUNTLET.weeklyTokens. */
const WEEK_KEY = 'kk-gauntlet-week';
function weekId(d = new Date()): string { const t = new Date(d); t.setHours(0, 0, 0, 0); t.setDate(t.getDate() - ((t.getDay() + 6) % 7)); return t.toISOString().slice(0, 10); }
export function weeklyBest(): number { try { const r = JSON.parse(localStorage.getItem(WEEK_KEY) ?? '{}') as { week?: string; best?: number }; return r.week === weekId() ? r.best ?? 0 : 0; } catch { return 0; } }
/** Saves a run; returns true if it beat this week's best. */
export function saveWeeklyBest(reached: number): boolean {
  if (reached <= weeklyBest()) return false;
  try { localStorage.setItem(WEEK_KEY, JSON.stringify({ week: weekId(), best: reached })); } catch { /* blocked */ }
  return true;
}
