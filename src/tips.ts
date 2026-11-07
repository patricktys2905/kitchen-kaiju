// Quick tips shown under the countdown before each round. EASY TO CUSTOMISE: add, remove or reword freely.
// A tip can be limited to a mode (mode: 'teams') or to tables with a feature (table: 'blender', 'ice', …).
import type { Layout } from './sim/layouts';
import type { GameMode } from './sim/modes';

export interface Tip { text: string; mode?: GameMode; table?: 'blender' | 'cheese' | 'ice' | 'hand' | 'bumper' | 'spatula' }

export const TIPS: Tip[] = [
  { text: 'Dash INTO a flying fork to catch it. Free cutlery!' },
  { text: 'A miss sticks where it lands. Steal rivals\' cutlery while they walk over to it.' },
  { text: 'Swipe knocks flying cutlery out of the air.' },
  { text: 'KAIJU mode makes you immune to cutlery. Squash, don\'t throw.' },
  { text: 'Spoons and Pizza Cutters bounce off walls: aim at the edges.' },
  { text: 'Hold THROW longer for a faster, farther throw. You walk slower while charging.' },
  { text: 'Shove rivals off the table edge with a dash.' },
  { text: 'Chopsticks throw two at once: one of them vanishes when it lands.' },
  { text: 'The Ladle and Rolling Pin keep going after a hit: line up two rivals.' },
  { text: 'Mustard Shield blocks one hit, but not a fall off the table.' },
  { text: 'The giant hand goes for whoever has the fullest belly.', table: 'hand' },
  { text: 'In Team Feast your cutlery passes straight through teammates.', mode: 'teams' },
  { text: 'Hot Dumpling: pass it on by touching a rival. Don\'t hold it when the fuse runs out!', mode: 'hotDumpling' },
  { text: 'Crumb Rush: getting knocked out drops half your crumbs. Grab them back!', mode: 'crumbRush' },
  { text: 'On ice, start turning early: you keep sliding.', table: 'ice' },
  { text: 'Cheese shadows grow before the splat. Step out of the ring!', table: 'cheese' },
  { text: 'When the blender rumbles, run for the edge of the table.', table: 'blender' },
  { text: 'Gumdrops fling you away. Bounce rivals into them!', table: 'bumper' },
  { text: 'Red square = spatula incoming. Shove someone in and step out!', table: 'spatula' },
];

/** A random tip that fits this mode and table. */
export function randomTip(mode: GameMode, layout: Layout, iceMutator = false): string {
  const has = (t: NonNullable<Tip['table']>) =>
    t === 'spatula' ? layout.hazards.includes('spatula') : t === 'blender' ? !!layout.blender : t === 'cheese' ? layout.hazards.includes('cheese') : t === 'ice' ? !!layout.slippery || iceMutator
      : t === 'hand' ? layout.hazards.includes('hand') : layout.obstacles.some(o => o.style === 'gumdrop');
  const ok = TIPS.filter(t => (!t.mode || t.mode === mode) && (!t.table || has(t.table)));
  const special = ok.filter(t => t.mode || t.table);
  const pool = special.length && Math.random() < 0.6 ? special : ok; // prefer a tip about this mode/table
  return pool[Math.floor(Math.random() * pool.length)]?.text ?? '';
}
