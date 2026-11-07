// Builds Gemini jobs (stills) + Flow prompts for the "Second Helpings" story cutscenes.
// Usage: node scripts/make-s2-jobs.mjs  -> art-src/jobs-s2.json, and merges the clip prompts into art-src/flow-cutscenes.json
// Rules learned the hard way: at most 3 kaiju per scene, every face fully visible, nobody behind anything, simple motion.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

// 3 Bloblin 5 Toastbat 8 Chocomunch 9 Bubblegumbo 10 Bluebeary 12 Sloba 13 Avocadrake 15 Hotchog 16 Minturtle 17 Pengwhip 18 Velvaroo 19 Tacowl
export const S2_SCENES = [
  { key: 's2-open', cast: [17, 18, 19], table: 'bg-freezer',
    still: 'the open door of a big fridge at night glowing with cold blue light; on the front edge of a fridge shelf stand three kaiju side by side, facing the viewer with cheeky challenging grins: the cookies-and-cream PENGUIN, the red-velvet KANGAROO and the taco OWL; jars and leftovers behind them',
    move: 'The fridge light hums and flickers softly, cold mist drifts out, the three kaiju stay in place and slowly lean forward with cheeky grins, the penguin taps its flipper, the owl blinks; the camera pushes in very slowly. Playful sneaky music.' },
  { key: 's2-0', cast: [12, 13], table: 'bg-smoothie',
    still: 'a colourful smoothie bar counter with fruit, straws and a big blender; the bubble-tea SLOTH kaiju lies lazily asleep on the counter right next to the blender, while the AVOCADO DRAGON kaiju hovers above it grinning cheekily; both faces fully visible',
    move: 'The blender beside them whirs and wobbles, little splashes of smoothie fly, the sloth snores and slowly opens one sleepy eye, the avocado dragon flaps its little wings and giggles; the camera stays still. Relaxed bouncy music, blender whirr.' },
  { key: 's2-1', cast: [19, 8], table: 'bg-fondue',
    still: 'a cosy fondue night table with a bubbling pot of melted cheese, bread cubes on long forks and candles; the taco OWL kaiju perches on the rim of the fondue pot, and the CHOCOLATE golem kaiju stands beside the pot holding a long fondue fork with a bread cube out to the SIDE, away from its face (the fork never crosses its face); both faces fully visible',
    move: 'The cheese bubbles and steams, the owl bobs its head and blinks, the chocolate golem dips the bread cube into the cheese and lifts it out dripping, both grin; the camera stays still. Warm silly accordion music, bubbling sounds.' },
  { key: 's2-2', cast: [15, 10, 5], table: 'bg-pancake',
    still: 'a tall stack of fluffy pancakes dripping with syrup and butter on a breakfast table; three kaiju stand side by side in a row on top of the huge pancake stack, not touching or overlapping: the HOT-DOG HEDGEHOG, the blueberry-muffin BEAR and the TOAST BAT; a giant metal spatula rests at the side of the plate; all faces fully visible',
    move: 'Syrup slowly drips down the pancakes, butter melts, the three kaiju bob gently up and down on the soft pancake top and grin, the giant spatula stays still at the side; the camera stays still. Cheerful bouncy breakfast music.' },
  { key: 's2-3', cast: [17, 16], table: 'bg-freezer',
    still: 'an icy freezer shelf with frosty walls, ice cubes and frozen peas; the cookies-and-cream PENGUIN kaiju wears a small gold crown and stands proudly on a block of ice like a king, the mint-choc-chip TURTLE kaiju stands beside it like a loyal guard (its shell is a big round scoop of pale-green mint ice cream with chocolate chips sitting in a waffle-cone bowl, its body dark teal, exactly as in the reference); both faces fully visible',
    move: 'Frost sparkles and a gentle snowfall drifts down, the crowned penguin puffs out its chest and flaps its flippers proudly, the turtle nods, both stay in place; the camera pushes in very slowly. Cool icy royal fanfare music.' },
  { key: 's2-4', cast: [9, 3, 18], table: 'bg-candy',
    still: 'a candy shop counter piled with gumdrops, lollipops, jelly beans and sweets jars; the pink bubblegum ELEPHANT kaiju blows a pink bubblegum bubble, the lime-jelly BLOB kaiju (with its lime slice, cream and cherry on top) wobbles happily on the counter between them, and the red-velvet KANGAROO kaiju stands with its arms crossed, smirking; all faces fully visible',
    move: 'The bubblegum bubble slowly grows and pops with a soft splat, the jelly blob jiggles and bounces on the gumdrop, the kangaroo chuckles and taps its foot; nobody moves away; the camera stays still. Sugary silly music, pop and boing sounds.' },
  { key: 's2-5', cast: [18, 15, 17], table: 'bg-nightmare',
    still: 'an empty steamy restaurant back kitchen at night with gas burners, pans and toasters (no people); the red-velvet KANGAROO kaiju is the boss: bigger than the others, wearing a gold crown, its belly pouch stuffed with shiny spoons; the hot-dog HEDGEHOG and the cookies-and-cream PENGUIN stand either side of it like henchmen; all faces fully visible',
    move: 'Burner flames flicker and steam rises, the crowned kangaroo grins and pats its pouch so the spoons clink, the hedgehog and penguin cross their arms and nod; everyone stays in place; the camera pushes in very slowly. Epic but silly boss music.' },
  { key: 's2-end', cast: [17, 18, 19], table: null,
    still: 'a grand dining hall at night with confetti in the air; TWO glowing golden spoons stand side by side on a silver cake stand like trophies; the PENGUIN, the KANGAROO and the taco OWL kaiju stand in a row on the table right in front of the camera, big and clear, cheering and clapping; all faces fully visible',
    move: 'Confetti rains down, the two golden spoons sparkle, the three kaiju cheer and hop on the spot, clapping; nobody moves away; the camera stays still. Triumphant happy fanfare.' },
];

const STYLE = 'Keep this EXACT art style and these EXACT character designs: bold chunky cartoon, thick dark-brown outlines, flat bright colours with soft cel shading, cheeky expressions. The characters are tiny food monsters ("kaiju") from my party game. Every kaiju has exactly the body, limbs and face shown in the reference: no extra arms or legs, and NO nose (only the eyes and mouth as drawn).';

fs.mkdirSync('art-src/cut-refs', { recursive: true });
const jobs = [];
const flow = JSON.parse(fs.readFileSync('art-src/flow-cutscenes.json', 'utf8'));
for (const s of S2_SCENES) {
  const sheet = `art-src/cut-refs/${s.key}.png`;
  execFileSync(process.execPath, ['scripts/ref-sheet.mjs', sheet, ...s.cast.map(c => `kaiju-${c}`)]);
  const refs = [sheet];
  if (s.table) {
    const t = `art-src/cut-refs/${s.table}.png`;
    if (!fs.existsSync(t)) await sharp(`public/art/${s.table}.webp`).png().toFile(t);
    refs.push(t);
  }
  jobs.push({
    name: s.key, newChat: true, refs,
    prompt: `Generate an image. The first attached picture shows characters from my game Kitchen Kaiju.${s.table ? ' The second shows the table they are on.' : ''} ${STYLE} Draw a WIDE 16:9 LANDSCAPE cinematic cartoon scene, like a frame from a funny animated film: ${s.still}. Warm cinematic lighting, depth of field, lots of food detail, a clear readable composition with space at the bottom. No text, no letters, no logos, no speech bubbles. Landscape 16:9. IMPORTANT: each kaiju appears ONLY ONCE (no extra small copies anywhere), there are NO people or hands, and the kaiju are BIG and clear: each one is about a third of the picture height, standing in the foreground, apart from each other with nothing in front of their faces.`,
  });
  flow[s.key] = s.move;
}
fs.writeFileSync('art-src/jobs-s2.json', JSON.stringify(jobs, null, 2));
fs.writeFileSync('art-src/flow-cutscenes.json', JSON.stringify(flow, null, 2));
console.log(`${jobs.length} Second Helpings cutscene jobs`);
