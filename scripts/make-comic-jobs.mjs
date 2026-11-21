// 🗯 Builds Gemini jobs for the Story "comic panels": one still after each mid-campaign boss is beaten.
// Usage: node scripts/make-comic-jobs.mjs -> art-src/jobs-comic.json, then node scripts/gem-gen.mjs art-src/jobs-comic.json
// Rules learned on the cutscenes: at most 2 kaiju, every face fully visible, each kaiju only once, no noses, no people.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

export const COMIC_SCENES = [
  { key: 'comic-ch4', cast: [7, 14], table: 'bg-sushi',
    still: 'a sushi bar after a big fight: the SUSHI-ROLL DRAGON boss sits dazed on the conveyor belt with little cartoon stars circling its head, its small gold crown has fallen off and lies on a plate beside it; the SALMON fish kaiju stands next to it with its mouth open in shock; both faces fully visible' },
  { key: 'comic-ch8', cast: [3, 4], table: 'bg-parlour',
    still: 'an ice cream parlour counter after a big fight: the lime-JELLY BLOB boss (one smooth rounded jelly dome, whipped cream, cherry and a lime slice on top, no arms) sits sulking with a little frown, its small gold crown tipped sideways on its cream; the purple marshmallow MOTH kaiju hovers beside it patting its cream gently to comfort it; both faces fully visible' },
  { key: 'comic-s4', cast: [17, 16], table: 'bg-freezer',
    still: 'an icy freezer shelf after a big fight: the cookies-and-cream PENGUIN boss has slipped and sits on the ice with its flippers out, dizzy, its small gold crown sliding away across the ice; the mint-choc-chip TURTLE kaiju (mint ice cream scoop shell in a waffle-cone bowl, dark teal body) offers it a flipper to help it up; both faces fully visible' },
  // 🌙 The Night Market + 📕 side stories (2026-11-21)
  { key: 'night-open', cast: [0], table: 'bg-picnic',
    still: 'a cosy food NIGHT MARKET after dark, strung with warm paper lanterns and little food stalls; in the middle stands an EMPTY golden display stand with a tiny velvet cushion where a golden spoon should be; a trail of yellow mustard drops leads away between the stalls; the STRAWBERRY LIZARD kaiju stands next to the empty stand with its mouth wide open in shock; its face fully visible' },
  { key: 'night-end', cast: [0, 15], table: 'bg-nightmare',
    still: 'a happy NIGHT MARKET party under warm paper lanterns and fairy lights, confetti in the air; the STRAWBERRY LIZARD kaiju proudly holds a shiny golden spoon high above its head; next to it the HOT-DOG HEDGEHOG kaiju (a sausage in a bun with mustard zigzag and spiky quills) looks sheepish and offers it a little hot dog as an apology; both faces fully visible' },
  { key: 'comic-night4', cast: [19, 12], table: 'bg-board',
    still: 'a night market at night: the TACO OWL kaiju sits on top of a short lamp post happily counting a stack of small mustard jars (its bribe), with big round pleased eyes; below the lamp post the BUBBLE-TEA SLOTH kaiju is fast asleep hugging the post, with little Z letters NOT drawn (no text); both faces fully visible' },
  { key: 'side-norigon', cast: [7], table: 'bg-sushi',
    still: 'a sushi bar conveyor belt at evening: the SUSHI-ROLL DRAGON kaiju bows politely and proudly, holding a pair of chopsticks like a samurai holds a sword, little plates of sushi passing by on the belt behind it; heroic, funny, its face fully visible' },
  { key: 'side-bloblin', cast: [3, 17], table: 'bg-freezer',
    still: 'an icy freezer shelf with frost and ice cubes: the lime-JELLY BLOB kaiju (one smooth rounded jelly dome, whipped cream, cherry and a lime slice on top, no arms) slides across the ice looking worried, with a little frosty sparkle; behind it the cookies-and-cream PENGUIN kaiju wears a tiny gold crown and points at it bossily; both faces fully visible' },
  { key: 'side-mothball', cast: [4], table: 'bg-party',
    still: 'a birthday party table at night with a big cake and glowing candles: the purple MARSHMALLOW MOTH kaiju hovers in front of one candle flame, staring at it with huge dreamy sparkly eyes and a happy smile, warm glow on its fluffy body; its face fully visible' },
  { key: 'side-pizza', cast: [11], table: 'bg-breakfast',
    still: 'a busy breakfast diner counter: the PIZZA RAPTOR kaiju sprints along the counter wearing a little red delivery cap, carrying a stack of three pizza boxes, with speed lines behind it and a big confident grin; its face fully visible' },
];

const STYLE = 'Keep this EXACT art style and these EXACT character designs: bold chunky cartoon, thick dark-brown outlines, flat bright colours with soft cel shading, funny expressions. The characters are tiny food monsters ("kaiju") from my party game. Every kaiju has exactly the body, limbs and face shown in the reference: no extra arms or legs, and NO nose (only the eyes and mouth as drawn).';

fs.mkdirSync('art-src/cut-refs', { recursive: true });
const jobs = [];
for (const s of COMIC_SCENES) {
  const sheet = `art-src/cut-refs/${s.key}.png`;
  execFileSync(process.execPath, ['scripts/ref-sheet.mjs', sheet, ...s.cast.map(c => `kaiju-${c}`)]);
  const t = `art-src/cut-refs/${s.table}.png`;
  if (!fs.existsSync(t)) await sharp(`public/art/${s.table}.webp`).png().toFile(t);
  jobs.push({
    name: s.key, newChat: true, refs: [sheet, t],
    prompt: `Generate an image. The first attached picture shows characters from my game Kitchen Kaiju. The second shows the table they are on. ${STYLE} Draw a WIDE 16:9 LANDSCAPE cartoon scene, like one big panel from a funny comic: ${s.still}. Bright comic lighting, a clear readable composition with space at the bottom. No text, no letters, no logos, no speech bubbles. Landscape 16:9. IMPORTANT: each kaiju appears ONLY ONCE (no extra small copies anywhere), there are NO people or hands, and the kaiju are BIG and clear: each one is about a third of the picture height, in the foreground, apart from each other with nothing in front of their faces.`,
  });
}
fs.writeFileSync('art-src/jobs-comic.json', JSON.stringify(jobs, null, 2));
console.log(`${jobs.length} comic panel jobs`);
