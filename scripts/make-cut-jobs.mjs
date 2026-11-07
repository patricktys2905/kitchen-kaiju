// Builds reference sheets + Gemini jobs for the story cutscene stills, and the Flow (Veo) prompts.
// Usage: node scripts/make-cut-jobs.mjs  -> art-src/jobs-cutscenes.json, art-src/flow-cutscenes.json, art-src/cut-refs/*.png
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

// kaiju indices: 0 Gobzilla 1 Squidgeon 2 Crabbage 3 Bloblin 4 Mothball 5 Toastbat 6 Dumplord 7 Norigon 8 Chocomunch
// 9 Bubblegumbo 10 Bluebeary 11 Pizzaraptor 12 Sloba 13 Avocadrake 14 Salmonster 15 Hotchog
const SCENES = [
  { key: 'cut-open', cast: [0, 6, 9, 15, 11], table: null,
    still: 'a long candle-lit banquet table at night in a grand dining hall; a glowing GOLDEN SPOON stands on a silver cake stand in the centre like a trophy; the tiny food kaiju from the reference peek hungrily over plates and wine glasses at it from both sides',
    move: 'The golden spoon gleams and sparkles, candle flames flicker, the kaiju pop up one by one from behind the plates with greedy eyes, licking their lips and nudging each other, the camera slowly pushes in toward the spoon. Playful orchestral heist music and cartoon sound effects.' },
  { key: 'cut-0', cast: [2], table: 'bg-table',
    still: 'a cosy Sunday roast dinner table; the cheese CRAB kaiju from the reference stands guard on top of a big roast chicken, claws raised, next to a gravy boat, glaring grumpily at the viewer',
    move: 'The crab kaiju snaps its claws angrily, stomps its little feet, then snips a carrot in half and huffs, gravy steam rising. Comedic cartoon music, snip-snip and stomp sound effects.' },
  { key: 'cut-1', cast: [1, 3], table: 'bg-table',
    still: 'a dinner table set for four; the blue jelly OCTOPUS kaiju juggles forks, knives and spoons with its tentacles while the green lime-jelly BLOB kaiju wobbles beside it, both grinning mischievously',
    move: 'The octopus juggles the cutlery faster and faster, the jelly blob wobbles and jiggles, a spoon bonks the blob on the head and it splats and reforms, both laugh. Bouncy comedic music, boing and clink sound effects.' },
  { key: 'cut-2', cast: [5, 4], table: 'bg-table',
    still: 'inside an open fridge glowing with cold light, shelves of leftover takeaway boxes; the TOAST BAT kaiju hangs upside down from a shelf while the marshmallow MOTH kaiju bursts out of a takeaway box, both looking cheeky',
    move: 'The fridge light flickers, the toast bat flaps its crusty wings and swoops, the marshmallow moth flutters out of the takeaway box scattering noodles, both strike a tough pose. Spooky-funny music, fridge hum and flapping sound effects.' },
  { key: 'cut-3', cast: [7, 14], table: 'bg-sushi',
    still: 'a sushi bar with a conveyor belt of sushi plates; the sushi-roll DRAGON kaiju lounges on a sushi plate riding the belt like a king on a throne, wearing a small gold crown, while the navy SALMON fish kaiju stands beside it like a bodyguard with crossed fins',
    move: 'The conveyor belt rolls the crowned dragon smoothly into frame as it smirks and waves dismissively, the salmon bodyguard cracks its knuckles, soy sauce ripples. Cool swaggering mob-boss music with a Japanese twist.' },
  { key: 'cut-4', cast: [9, 8], table: 'bg-party',
    still: 'a birthday party table with a big frosted cake, candles, presents and confetti; the pink bubblegum ELEPHANT kaiju blows a gigantic pink bubblegum bubble while the CHOCOLATE golem kaiju has its face buried in the birthday cake',
    move: 'The elephant\'s bubblegum bubble grows huge and POPS, splattering pink gum over the chocolate golem who looks up from the cake covered in frosting and gum, confetti bursts. Party horn, pop and slapstick sound effects with silly party music.' },
  { key: 'cut-5', cast: [11, 13], table: 'bg-board',
    still: 'a big wooden chopping board in a kitchen with a huge cleaver stuck in the board; the PIZZA RAPTOR kaiju wields a pizza cutter like a sword, facing the round flying AVOCADO kaiju',
    move: 'The pizza raptor spins its pizza cutter and lunges, the avocado kaiju dodges with a cheeky flip as the giant cleaver chops down between them with a THUNK, both freeze and stare at the cleaver. Dramatic samurai-standoff music with comedic timing.' },
  { key: 'cut-6', cast: [10, 5, 2], table: 'bg-griddle',
    still: 'a sizzling diner griddle with flames, pancakes and bacon; the blueberry-muffin BEAR kaiju wears a tiny chef hat and flips pancakes with a spatula while the toast bat and the cheese crab sit at the counter waiting impatiently',
    move: 'The muffin bear flips a pancake high in the air, flames flare up from the griddle, the pancake lands on the crab\'s head, the toast bat bangs the counter laughing. Sizzling, ding-ding order bell, fast diner jazz music.' },
  { key: 'cut-7', cast: [3, 4], table: 'bg-parlour',
    still: 'an ice cream parlour with towering sundaes and milkshakes; a GIANT version of the green lime-jelly blob kaiju wearing a gold crown looms over the counter, frosty and furious, while the marshmallow moth hides behind a milkshake',
    move: 'The giant crowned jelly blob wobbles menacingly and roars, frost spreads across the counter, ice cream scoops start melting and dripping, the moth peeks out and gulps. Ominous-but-silly boss music, wobble and freezing sound effects.' },
  { key: 'cut-8', cast: [12, 13, 14], table: 'bg-picnic',
    still: 'a sunny checkered picnic blanket in a park with a basket, sandwiches and a watermelon, a line of ants marching across; the GRAPE HOUND kaiju chases a paper plate like a frisbee while the avocado and the salmon kaiju lounge on the blanket',
    move: 'The grape hound leaps and catches the paper plate in its mouth, grapes flying off its body, ants scatter, the avocado and salmon kaiju duck as it bounds over them. Cheerful whistling summer music, barks and boings.' },
  { key: 'cut-9', cast: [6, 10, 8], table: 'bg-bakery',
    still: 'a floury bakery bench with rising bread dough, rolling pins and croissants; the DUMPLING kaiju kneads a huge ball of dough menacingly like a villain, flour clouds around it, while the muffin bear and the chocolate golem watch nervously',
    move: 'The dumpling kaiju slams the dough down, a big puff of flour explodes, the dough swells and rises enormously, the muffin bear and chocolate golem back away slowly. Thumping villain music with comedic squelch sound effects.' },
  { key: 'cut-10', cast: [15, 7, 9], table: 'bg-banquet',
    still: 'a fancy banquet table with a big rotating lazy Susan turntable full of dishes; the cute baby ONIGIRI rice-ball gorilla kaiju sits happily in the middle of the turntable spinning round, while the sushi dragon and the bubblegum elephant look dizzy',
    move: 'The lazy Susan spins faster and faster with the happy rice-ball gorilla giggling in the middle, dishes whirl past, the sushi dragon and bubblegum elephant wobble and get dizzy, swirling stars over their heads. Merry-go-round music with whoosh sound effects.' },
  { key: 'cut-11', cast: [6, 11, 15], table: 'bg-breakfast',
    still: 'a grand breakfast feast table with popping toasters, stacks of pancakes and eggs; the DUMPLING kaiju is huge, wearing a gold crown and sitting on a throne made of toast, holding the GOLDEN SPOON like a sceptre, the pizza raptor stands beside him as his henchman',
    move: 'The crowned dumpling kaiju rises from the toast throne and points the golden spoon at the camera, toasters pop toast into the air behind him like fireworks, the pizza raptor cracks its knuckles. Epic final-boss orchestral music with toaster pops.' },
  { key: 'cut-end', cast: [0, 3, 9, 10, 15], table: null,
    still: 'the banquet hall after a huge food fight, confetti in the air; the GOLDEN SPOON is raised high in the centre glowing with light, tiny food kaiju cheer around it, and behind them stands a comically gigantic tower of dirty dishes',
    move: 'Confetti rains down, the kaiju cheer and jump, the golden spoon sparkles, then the camera slowly pans up the enormous wobbling tower of dirty dishes which teeters... and one plate drops with a clang. Triumphant fanfare that ends on a comedic sad trombone.' },
];

fs.mkdirSync('art-src/cut-refs', { recursive: true });
const STYLE = 'Keep this EXACT art style and these EXACT character designs: bold chunky cartoon, thick dark-brown outlines, flat bright colours with soft cel shading, cheeky expressions. The characters are tiny food monsters ("kaiju") from my party game.';
const jobs = [], flow = { _base: 'Make one 16:9 video using the attached image as the exact first frame (image-to-video, Veo 3.1 Lite, 1 output, 8 seconds). Lively cartoon animation of this exact picture from my own game: keep every character\'s design, colours and style exactly. {X} No new characters, no text, no speech or dialogue, no scene cut.' };
for (const [i, s] of SCENES.entries()) {
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
    prompt: `Generate an image. The first attached picture shows characters from my game Kitchen Kaiju.${s.table ? ' The second shows the table they are on.' : ''} ${STYLE} Draw a WIDE 16:9 LANDSCAPE cinematic cartoon scene, like a frame from a funny animated film: ${s.still}. The kaiju are tiny compared with the plates and cutlery around them. Warm cinematic lighting, depth of field, lots of food detail, a clear readable composition with space at the bottom. No text, no letters, no logos, no speech bubbles. Landscape 16:9.`,
  });
  flow[s.key] = s.move;
}
fs.writeFileSync('art-src/jobs-cutscenes.json', JSON.stringify(jobs, null, 2));
fs.writeFileSync('art-src/flow-cutscenes.json', JSON.stringify(flow, null, 2));
console.log(`${jobs.length} cutscene jobs`);
