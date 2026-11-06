# Kitchen Kaiju

Tiny monsters brawl on a giant dinner table with throwable cutlery. Up to 6 players: on one screen (2 keyboards, gamepads, touch) or online with friends; bots fill empty seats.

## Play

Double-click `start.cmd`, or:

```
npm install
npm run dev      # opens on http://localhost:5180
```

`?demo=4` in the URL starts a bot-only match (attract mode).

### On a phone or tablet (same Wi-Fi as the PC)

1. On the PC run `npm run dev` (or `start.cmd`). The terminal prints a **Network:** address, e.g. `http://192.168.68.200:5180/`. Allow Node through Windows Firewall (private networks) if asked.
2. Open that address on the phone and hold it sideways.
3. Touch controls: drag anywhere on the **left half** to move · **THROW**: hold to charge, drag away from the button to aim, let go to throw (without dragging it aims at the rival you're facing) · **SWIPE**, **DASH**, **STOMP** (glows when your belly is full) · PAUSE / MENU top right.
4. Menu buttons: JOIN/LEAVE (touch), + BOT, − BOT, bot difficulty, PLAY.

Full screen: tap the ⛶ FULL SCREEN button (top-left on the menu, under MENU in game). Where the browser can't (iPhone Safari), it shows how to Add to Home Screen, which always opens full screen. Android Chrome also goes fullscreen on the first tap. On iPhone, use Share → **Add to Home Screen** for a full-screen launch. Bluetooth gamepads paired to the phone work too. Add `?touch=1` on a PC to try the touch UI with a mouse.

## Controls

| Action | Keyboard Left | Keyboard Right | Gamepad |
|---|---|---|---|
| Move | WASD | Arrows | Left stick / D-pad |
| Aim | (move direction) | (move direction) | Right stick |
| Throw (hold = charge) | Space | Enter / Numpad 0 | A / RT |
| Swipe | F | / / Numpad 1 | X |
| Dash | Left Shift | Right Shift / Numpad 2 | B / RB |
| Stomp (meter full) | E | . / Numpad 3 | Y / LB |

Menu: THROW joins, DASH leaves, B/N add/remove bot, 2 bot difficulty, M table, R rounds to win (1/3/5/7/10), O online, 1 or START begins. In game: P pause, Esc menu.

## Modes

The game opens on a title screen (cover art) with mode cards: **Story**, **Free Play**, **Online** (and a placeholder for more). New modes = one more card in `src/scenes/TitleScene.ts`. `?mode=free|story|online` jumps straight to a mode.

### Story: The Grand Feast (solo)

12 chapters, one per table (`src/story/chapters.ts`): a rival dialogue and a tip before each match, bosses (👑, start every round able to go KAIJU) in chapters 4, 8 and 12, 1–3 stars per chapter (3 = never lost a round), progress saved on the device (`kk-story-v1`), and an ending with the Golden Spoon. Pick your kaiju on the map; rivals never duplicate it. `npm run story-balance` simulates every chapter to check the difficulty ramp.

**Story rewards** (`src/story/unlocks.ts`): 4 kaiju and 3 tables start locked in Free Play and Online, and are earned in Story. Minturtle (beat chapter 4), Freezer Shelf table (chapter 6, slippery ice), Pengwhip (chapter 8), Candy Shop table (chapter 10, bouncy gumdrop bumpers), Velvaroo + Chef's Nightmare table (chapter 12, burners + toasters + the hand), Tacowl (30 stars). The map's 🎁 REWARDS button lists them; the results screen celebrates new ones. Online uses the host's unlocks. `node scripts/shots-unlocks.mjs` screenshots them.

**Cutscenes** (`src/story/cutscenes.ts`): an opening, one punny clip per chapter (auto-plays the first time; 🎬 SCENE replays it) and an ending. Pipeline: `node scripts/make-cut-jobs.mjs` (ref sheets + Gemini still jobs + Flow prompts) → `npm run art:gen -- art-src/jobs-cutscenes.json` → `npm run art` (stills become `public/art/cut-*.webp`, also the offline fallback) → Google Flow, Veo 3.1 Lite, image-to-video (`art-src/flow-task.md`, raw clips in `art-src/clips-raw`) → `node scripts/encode-clips.mjs` (trims drifting clips via KEEP, fades out) → `public/video/*.mp4` (streamed, not precached). Captions are drawn by the game.

## Online with friends

Menu → **ONLINE** (or press O). One person taps **Host a game** and gets a 4-letter room code; friends tap **Join a game** on their own phone or computer, anywhere, and type the code. Everyone picks a kaiju in the lobby, the host picks bots/table and starts. Up to 6 players (host + 5 friends); bots can fill empty seats up to 4 or 6 players.

- The host's device runs the match; friends send their controls and receive the game ~20 times a second (PeerJS/WebRTC; the free public PeerJS server only introduces the devices).
- If a friend drops out, a bot takes over their kaiju. If the host leaves, friends are sent back to the menu. Only the host can start a rematch; pausing is off online.
- Needs an internet connection (the rest of the game works offline).

## Kaiju and tables

16 base food kaiju to pick from (incl. Sloba, Hotchog) (each player picks a different one; LEFT/RIGHT on your controller, or KAIJU ▶ on touch): Gobzilla Jr. (strawberry lizard), Squidgeon (blue jelly octopus), Crabbage (cheese crab), Bloblin (lime jelly), Mothball (ube marshmallow moth), Toastbat (toast bat), Dumplord (dumpling), Norigon (sushi-roll dragon), Chocomunch (chocolate golem), Bubblegumbo (bubblegum elephant), Bluebeary (blueberry muffin bear), Pizzaraptor (pizza raptor), Grapehound (grape hound), Avocadrake (avocado dragon), Salmonster (salmon sea monster), Onigori (rice-ball gorilla). All play the same for now.

12 tables (M / gamepad Y / TABLE button; default rotates through all):
- Sunday Roast, Dinner for Four, Leftovers: the giant hand
- Sushi Bar: a conveyor belt carries players, loose cutlery and crumbs sideways (plus the hand)
- Birthday Bash: warned gusts of wind push everyone towards one edge; walk into the wind
- Chef's Board: the cleaver chops a marked vertical lane
- Diner Griddle: burners glow, then flare and grill anyone standing on them
- Ice Cream Parlour: melted puddles are slippery (plus the hand)
- Picnic Blanket: an ant trail marches down the middle carrying everything (plus the hand)
- Bakery Bench: sticky dough patches slow you to half speed (plus the hand)
- Banquet Lazy Susan: a big turntable in the middle spins everything on it (plus the hand)
- Breakfast Rush: toasters shake, then fire toast across their lane

## Rules (phases 1–2)

- Cutlery sticks where it lands. Anyone can pick up loose cutlery (stealing!). After 4s it slides back to its unarmed owner.
- Fork, Spoon (one ricochet; can hit you), Butter Knife (fast, short), Chopsticks (two at once), Ladle (slow, plows through), Spork (rare pickup, boomerangs).
- Swipe has a short telegraphed wind-up and parries flying cutlery.
- Dash bumps rivals (and off the table edge); dash into enemy cutlery while unarmed to catch it.
- Crumbs fill the belly meter → Stomp → 5s KAIJU: huge, immune to cutlery, squashes on contact, shockwave steps.
- The giant hand sweeps a lane (1.4s warning) aimed at the biggest kaiju / fullest belly. After 45s it comes much more often.
- First to 5 round wins by default; choose 1, 3, 5, 7 or 10 with R / the ROUNDS button (host sets it online).

## Code layout

- `src/sim/` — pure TypeScript rules engine (no Phaser). `world.ts` is the simulation, `bot.ts` the AI, `constants.ts` all tuning numbers.
- `src/render/draw.ts` — shapes-first art (swap for sprites later).
- `src/scenes/` — Phaser menu + game scenes (HUD, effects, sound hooks).
- `src/input.ts`, `src/audio.ts` — keyboard/gamepad and synth SFX.

## Art (Gemini)

All sprites and backgrounds were generated with Gemini and live in `public/art/` (WebP + `manifest.json`).
The game draws anything missing with the built-in shapes, so art can be added or replaced piece by piece.

1. Prompts are in `art-src/jobs-*.json` (one Gemini chat per file keeps a set consistent). Sprites use a flat
   magenta background; characters face right; props are top-down.
2. Start Chrome with `--remote-debugging-port=9333 --user-data-dir=C:\Users\Pat\ff-qa\gemini-profile` (signed in to Gemini),
   then `npm run art:gen -- art-src/jobs-props.json [start] [count]` → raw images in `art-src/raw/`.
3. `npm run art` removes backgrounds, trims, resizes and writes `public/art/` + the manifest.
   `node scripts/art-preview.mjs [regex]` makes `art-src/preview.png` to check cut-outs.

Names the game looks for: `kaiju-0..7`, `kaiju-0..7-rage`, `cut-<fork|spoon|knife|chopstick|ladle|spork>`, `ob-<style>` for every obstacle style in `src/sim/layouts.ts`, `hand`, `cleaver`, `crumb-0..2` (from `crumbs`), table surfaces `bg-table|bg-sushi|bg-party|bg-board`, `bg-floor`, `bg-menu`.
To keep new art consistent, `node scripts/ref-sheet.mjs out.png kaiju-0 kaiju-1 ...` builds a reference image; add it as `"refs"` in a job and it is pasted into Gemini with the prompt.

## Checks

```
npm test          # rules tests incl. full 4-bot matches
npm run build     # typecheck + production build
npm run smoke     # headless browser playthrough + screenshots (needs Edge/Chrome)
npm run update-check # installed copy picks up a newly deployed version on the menu
npm run banner-check # 6-player round-end / match-end screens: all text on screen, nothing overlapping
npm run smoke:story  # title -> story -> chapter 1 -> dialogue -> win -> stars + unlock (desktop and phone)
npm run smoke:online-backup # same, with the friend forced onto the backup route
npm run smoke:online # two browsers play online over the real matchmaking server (needs internet)
npm run smoke:phone  # emulated phone with multi-touch: menu, joystick, aim-drag throw, dash, rotate prompt
npm run balance   # simulate 12 bot matches: pacing + KO-cause mix  (args: easy|normal|hard, players)
npx vite-node scripts/accuracy.ts   # how hard each bot level is to survive against
```
