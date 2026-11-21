// 🗯 Builds Gemini jobs for the Story "comic panels": one still after each mid-campaign boss is beaten.
// Usage: node scripts/make-comic-jobs.mjs -> art-src/jobs-comic.json, then node scripts/gem-gen.mjs art-src/jobs-comic.json
// Rules learned on the cutscenes: at most 2 kaiju, every face fully visible, each kaiju only once, no noses, no people.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ONLY1 = 'This kaiju is the ONLY living character in the picture: no other creatures, mascots or food with faces.';
const ONLY2 = 'These two kaiju are the ONLY living characters in the picture: no other creatures, mascots or food with faces.';

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
  // 🛎 Room Service + 🔎 Grand Feast mystery + 📕 more side stories (2026-11-21)
  { key: 'room-open', cast: [0], table: 'bg-banquet',
    still: 'the grand front desk of a fancy hotel kitchen: a shiny brass service bell, a little golden key on a hook and a rack of plates; the STRAWBERRY LIZARD kaiju stands at the desk ringing the bell with an excited, determined grin; its face fully visible. This kaiju is the ONLY living character in the picture: no other creatures, mascots or food with faces.' },
  { key: 'room-end', cast: [0, 5], table: 'bg-pancake',
    still: 'the top floor of a fancy hotel kitchen at night, city lights through big windows: the STRAWBERRY LIZARD kaiju proudly holds up a shiny golden key card; next to it the TOAST BAT kaiju (a slice of toast with little bat wings) wears a tiny manager bow tie and bows politely to hand over the job; both faces fully visible' },
  { key: 'comic-room4', cast: [14, 1], table: 'bg-parlour',
    still: 'a hotel pool party: the SALMON fish kaiju lies sulking on an inflatable pool float with a grumpy face; the JELLY OCTOPUS kaiju gently pushes the float around with its tentacles, smiling kindly; bright pool water, a beach ball; both faces fully visible' },
  { key: 'comic-ch6', cast: [6], table: 'bg-banquet',
    still: 'close-up of a big bamboo steamer basket on a dinner table, wisps of steam; the lid is lifted just a crack and ONLY the two round eyes of the DUMPLING kaiju peek out from the dark gap, watching; the rest of it is hidden inside the steamer; mysterious, funny. This kaiju is the ONLY living character in the picture: no other creatures, mascots or food with faces.' },
  { key: 'comic-ch9', cast: [6], table: 'bg-banquet',
    still: 'a dark pantry at night lit by one beam of light from a door: the DUMPLING kaiju is drawn as a dark round SILHOUETTE (no details, no face, just its shape) holding a small golden crown above its head, about to put it on; jars on the shelves; mysterious, funny. This kaiju is the ONLY living character in the picture: no other creatures, mascots or food with faces.' },
  { key: 'comic-ch11', cast: [6], table: 'bg-banquet',
    still: 'a grand banquet table: a bamboo steamer has burst open with a big puff of steam, and the DUMPLING kaiju stands on top of it wearing a small gold crown, arms out in a dramatic villain pose with a smug grin; dramatic lighting; its face fully visible. This kaiju is the ONLY living character in the picture: no other creatures, mascots or food with faces.' },
  { key: 'side-toastbat', cast: [5], table: 'bg-breakfast',
    still: 'a breakfast counter turned into a little stage with a spotlight: the TOAST BAT kaiju (a slice of toast with little bat wings) strikes a proud superstar pose in the spotlight, wings spread, big showbiz grin; its face fully visible. This kaiju is the ONLY living character in the picture: no other creatures, mascots or food with faces.' },
  { key: 'side-squidgeon', cast: [1], table: 'bg-party',
    still: 'a birthday party table with balloons, streamers and a cake: the JELLY OCTOPUS kaiju wears a little party hat and holds a bunch of balloons in several tentacles, beaming with joy; its face fully visible. This kaiju is the ONLY living character in the picture: no other creatures, mascots or food with faces.' },
  { key: 'side-velvaroo', cast: [18], table: 'bg-candy',
    still: 'a candy shop table: the RED-VELVET KANGAROO kaiju holds its pouch closed with both paws, looking left and right secretively, a soft warm glow coming from inside the pouch; funny and sneaky; its face fully visible. This kaiju is the ONLY living character in the picture: no other creatures, mascots or food with faces.' },
  { key: 'side-tacowl', cast: [19], table: 'bg-board',
    still: 'a dark kitchen at night: the TACO OWL kaiju on night watch holds a small flashlight with its wing, the beam lighting up a cutting board, a shiny badge on its chest, big alert round eyes; its face fully visible. This kaiju is the ONLY living character in the picture: no other creatures, mascots or food with faces.' },
  // 🎬 Per-chapter scenes for the Night Market + Room Service, and side-story ending stills (2026-11-21)
  { key: 'night-c0', cast: [11, 9], table: 'bg-picnic',
    still: 'a NIGHT MARKET free-sample stall under paper lanterns: the PIZZA RAPTOR kaiju leans over a tray of tiny sample snacks with a cheeky challenging grin; the BUBBLEGUM ELEPHANT kaiju blows a big pink bubble with its trunk while munching crumbs; a little trail of yellow mustard drops on the ground; both faces fully visible. ' + ONLY2 },
  { key: 'night-c1', cast: [10, 4], table: 'bg-party',
    still: 'behind a balloon stall at a night market: the BLUEBERRY BEAR kaiju peeks out from behind a bunch of balloons and whispers secretively with one paw beside its mouth; the purple MARSHMALLOW MOTH kaiju hovers nearby, distracted and staring dreamily at a glowing paper lantern; both faces fully visible. ' + ONLY2 },
  { key: 'night-c2', cast: [8, 13], table: 'bg-banquet',
    still: 'a spinning lazy susan banquet table at a night market: the CHOCOLATE-BAR GOLEM kaiju triumphantly grabs a golden spoon from the middle; the AVOCADO DRAGON kaiju (an avocado with little bat wings) points at the spoon and smirks, because the spoon is obviously a cheap fake with its gold paint peeling off; both faces fully visible. ' + ONLY2 },
  { key: 'night-c3', cast: [19], table: 'bg-board',
    still: 'a night market at night under a lamp post: the TACO OWL kaiju on night watch puffs up its chest and stares down suspiciously with one eyebrow raised, a little night-watch badge on its chest, a lantern glowing beside it; its face fully visible. ' + ONLY1 },
  { key: 'night-c4', cast: [14, 2], table: 'bg-griddle',
    still: 'hot sizzling grill stalls at a night market at midnight: the SALMON kaiju (dark-blue fish head and tail fins, a salmon-pink fillet body with white stripes, a lemon slice on its head, exactly as in the reference) and the CABBAGE CRAB kaiju (a YELLOW crab with EXACTLY TWO big claws, both raised up high, and six thin pointed legs underneath with NO pincers on them, a green cabbage leaf on top of its head like a hat, exactly as in the reference) frantically toss a steaming hot dumpling back and forth between them like a hot potato, sweating and panicking; puffs of steam; both faces fully visible. The market is EMPTY: no crowd, no people, no silhouettes of people in the background. No signs or banners with writing.' + ONLY2 },
  { key: 'night-c5', cast: [17, 16], table: 'bg-parlour',
    still: 'a slippery ice cream stall at a night market at night: the cookies-and-cream PENGUIN kaiju and the mint-choc-chip TURTLE kaiju stand side by side blocking the way, arms crossed like tough bouncers, trying to look scary but looking cute; melting ice cream puddles on the counter; both faces fully visible. The market is EMPTY: no crowd, no people, no silhouettes of people in the background. No signs or banners with writing.' + ONLY2 },
  { key: 'night-c6', cast: [1, 18], table: 'bg-fondue',
    still: 'a fondue stall at a night market with a bubbling cheese pot: the JELLY OCTOPUS kaiju salutes bravely with one tentacle, ready for a team fight; across the table the RED-VELVET KANGAROO kaiju shows off its pouch stuffed full of shiny silver spoons, smug; both faces fully visible. The market is EMPTY: no crowd, no people, no silhouettes of people in the background. No signs or banners with writing.' + ONLY2 },
  { key: 'night-c7', cast: [15], table: 'bg-nightmare',
    still: 'the dark back corner of a night market by the grills, lit by one glowing lantern: the HOT-DOG HEDGEHOG kaiju (a sausage in a bun with a mustard zigzag and spiky quills) sits on a pile of stolen snacks, cuddling a shiny GOLDEN SPOON, with a smug villain grin and mustard on its cheeks; its face fully visible. ' + ONLY1 },
  { key: 'room-c0', cast: [2, 12], table: 'bg-table',
    still: 'the front desk of a fancy hotel with a brass service bell: the CABBAGE CRAB kaiju (a YELLOW crab with exactly TWO claws and little legs, a green cabbage leaf on top of its head like a hat) holds up a small blank paper ticket in one claw and looks impatient, first in the queue; behind it the BUBBLE-TEA SLOTH kaiju is asleep standing up in the queue next to a suitcase; both faces fully visible. No numbers or writing anywhere.' + ONLY2 },
  { key: 'room-c1', cast: [11, 8], table: 'bg-breakfast',
    still: 'a hotel all-you-can-eat breakfast buffet with trays of pancakes, eggs and toast: the PIZZA RAPTOR kaiju piles a tower of food onto one tiny plate; the CHOCOLATE-BAR GOLEM kaiju stuffs a whole waffle in its mouth; both look competitive; both faces fully visible. ' + ONLY2 },
  { key: 'room-c2', cast: [16, 5], table: 'bg-bakery',
    still: 'a hotel corridor with a housekeeping cart full of fluffy towels and sheets: the mint-choc-chip TURTLE kaiju wears a tiny cleaning cap and pushes the cart very slowly; the TOAST BAT kaiju (a slice of toast with little bat wings) flies past cheekily throwing a towel in the air; both faces fully visible. ' + ONLY2 },
  { key: 'room-c3', cast: [14], table: 'bg-parlour',
    still: 'a sunny hotel swimming pool deck with sun loungers and a beach ball: the SALMON kaiju (dark-blue fish head and tail fins, a salmon-pink fillet body, a lemon slice on its head) sits on a tall white pool chair wearing tiny sunglasses and a whistle, pointing bossily at the water as the pool rule-keeper; bright blue pool water; its face fully visible.' + ONLY1 },
  { key: 'room-c4', cast: [13, 17], table: 'bg-table',
    still: 'inside a small fancy hotel elevator with brass doors and floor buttons: the AVOCADO DRAGON kaiju (an avocado with little bat wings) and the cookies-and-cream PENGUIN kaiju stand squashed together, staring straight ahead awkwardly in total silence, elevator etiquette; both faces fully visible. ' + ONLY2 },
  { key: 'room-c5', cast: [18, 0], table: 'bg-party',
    still: 'a hotel wedding reception with a towering white tiered wedding cake on the table and flower decorations: the RED-VELVET KANGAROO kaiju wears a little bow tie as best man and stands on tiptoe guarding the cake; the STRAWBERRY LIZARD kaiju sneaks up beside the cake with a determined grin; both faces fully visible. ' + ONLY2 },
  { key: 'room-c6', cast: [9, 15], table: 'bg-griddle',
    still: 'a busy hotel room-service kitchen: the BUBBLEGUM ELEPHANT kaiju carefully carries a silver room-service tray with a domed lid on its back, looking nervous; behind it the HOT-DOG HEDGEHOG kaiju (a sausage in a bun with mustard zigzag and spiky quills) sneaks after the tray with grabby paws and a hungry grin; both faces fully visible. ' + ONLY2 },
  { key: 'room-c7', cast: [5, 18], table: 'bg-pancake',
    still: 'the top-floor penthouse suite of a fancy hotel at night, city lights through tall windows: the TOAST BAT kaiju (a slice of toast with little bat wings) wears a manager bow tie and a tiny gold crown and spreads its wings dramatically like a villain; the RED-VELVET KANGAROO kaiju, also wearing a tiny gold crown, lounges in a velvet armchair with a smug grin; both faces fully visible. ' + ONLY2 },
  { key: 'side-norigon-end', cast: [7], table: 'bg-sushi',
    still: 'a sushi bar at closing time with a warm glow: the SUSHI-ROLL DRAGON kaiju (TEAL-GREEN dragon whose body is made of round sushi roll segments with white rice and a salmon-orange belly, pink ginger spikes on its back, exactly as in the reference) happily hangs a small BLANK wooden sign on the wall and holds out a plate of sushi as if offering to share, friendly smile; its face fully visible. No writing or letters anywhere, no banners.' + ONLY1 },
  { key: 'side-bloblin-end', cast: [3], table: 'bg-freezer',
    still: 'just outside an open freezer door in a kitchen: the lime-JELLY BLOB kaiju (one smooth rounded jelly dome, whipped cream, cherry and a lime slice on top, no arms) sits wrapped in a cosy knitted scarf, a little frost still on its cream and a few tiny icicles hanging off it, smiling with relief, a warm mug beside it; its face fully visible. No writing, letters or labels on any box, jar or packaging.' + ONLY1 },
  { key: 'side-mothball-end', cast: [4], table: 'bg-party',
    still: 'a cosy dark kitchen corner at night: the purple MARSHMALLOW MOTH kaiju sleeps peacefully curled up in a teacup bed, next to a tiny glowing night-light shaped like a golden spoon, soft warm glow on its fluffy body, eyes closed with a content smile. ' + ONLY1 },
  { key: 'side-pizza-end', cast: [11], table: 'bg-breakfast',
    still: 'a pizza kitchen counter: the PIZZA RAPTOR kaiju proudly presents a giant pizza piled with extra melty cheese and a little paper flag stuck in the middle, chef pose, huge proud grin, cheese strings everywhere; its face fully visible. ' + ONLY1 },
  { key: 'side-toastbat-end', cast: [5], table: 'bg-breakfast',
    still: 'a bright TV cooking-show set with studio lights and a camera on a tripod: the TOAST BAT kaiju (a toast-coloured round body with two bat WINGS and NO hands or arms, a pat of butter on its head, exactly as in the reference, NO nose) stands behind the cooking counter wearing a tiny chef hat, a spatula lying on the counter in front of it, wings spread like a TV star, beaming; its face fully visible.' + ONLY1 },
  { key: 'side-squidgeon-end', cast: [1], table: 'bg-party',
    still: 'a kitchen wall after a party with streamers: the JELLY OCTOPUS kaiju hangs up a picture frame (the picture inside shows only colourful party confetti, no characters) and gives a thumbs-up with several tentacles at once, big happy smile; its face fully visible. ' + ONLY1 },
  { key: 'side-velvaroo-end', cast: [18], table: 'bg-candy',
    still: 'a candy shop table: the RED-VELVET KANGAROO kaiju holds its pouch open with a proud, loving smile, and a TINY round red-velvet cupcake with a swirl of cream frosting peeks out of the pouch (just a cupcake, no face, no eyes); soft warm glow; its face fully visible. ' + ONLY1 },
  { key: 'side-tacowl-end', cast: [19], table: 'bg-board',
    still: 'a kitchen at dawn with soft morning light (no boxes, jars or packaging with writing anywhere): the TACO OWL kaiju proudly shows off a big shiny gold star badge on its chest and holds out a second smaller handmade star badge (wonky, cut out of cardboard) as a gift, wings out, beaming; its face fully visible. ' + ONLY1 },
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
