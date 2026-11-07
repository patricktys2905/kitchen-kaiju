# New features log

Everything added in the "keep building" session, newest last. Nothing existing was removed.
Each section says **where to customise it**.

## Quick index

- 1. Party modes (Team Feast, Crumb Rush, Hot Dumpling)
- 2. Settings screen
- 3. Background music
- 4. Stats and achievements
- 5. How to Play
- 6. Kaiju Gallery
- 7. Condiment power-ups
- 8. Party modes and power-ups online
- 9. Pause menu
- 10. End-of-match awards
- 11. Gauntlet (solo survival)
- 12. Hazards on/off
- 13. Hats (cosmetic rewards)
- 14. Practice (guided tutorial)
- 15. Daily Challenge
- 16. Title screen layout
- 17. Emotes
- 18. New rare cutlery: Pizza Cutter and Rolling Pin (Gemini art)
- 19. 🌶️ Spicy Story replays (hard mode)
- 20. Instant replay
- 21. Player numbers (accessibility) and 📸 Share
- 22. New table: Smoothie Bar (new Blender hazard, Gemini art)
- 23. Remappable keyboard controls
- 24. Attract mode (title demo)
- 25. 🍰 Dessert Course (post-game)
- 26. Per-bot difficulty (Free Play)
- 27. 🏆 Party Cup
- 28. New table: Fondue Night (new Hot Cheese hazard, Gemini art)
- 29. Mutators ("twists")
- 30. Quick tips, Smoothie Operator, two-column Settings
- 31. Hats online
- 32. Achievement progress and pages
- 33. Loading screen
- 34. Kaiju voices
- 35. 📺 TV mode (phones as controllers)
- 36. QR code to join
- 37. Announcer callouts
- 38. Victory screen and boss intro
- 39. Big touch buttons
- 40. Story progress line
- 41. New table: Pancake Stack (Spatula hazard)
- 42. Back up / move your save
- 43. Fix: Kaiju Gallery taps
- 44. Rumble
- 45. 🎲 Shuffle
- 46. Party Cup online
- 47. 🛠 Table Workshop
- 48. Free Play and Party Modes separated
- 49. Gemini hats
- 50. Four more twists
- 51. 12 more Gemini hats
- 52. Second Helpings: a second Story campaign

**Where to find things:** title screen cards (Story · Free Play · Online · Party Modes · Daily · Gauntlet), the top-right row (Settings · How to Play · Kaiju · Records), and Free Play keys (G mode · U power-ups · H hazards · X twist · C cup).

## 1. Party modes (Team Feast, Crumb Rush, Hot Dumpling)

- **Where:** Title screen → **PARTY MODES** card (was the disabled "More modes" card); change mode with **[G]**, the **MODE** pill, or by tapping the mode name. (Free Play itself is Classic only, see 48.)
- **Team Feast:** seats alternate RED / BLUE. Cutlery, swipes and kaiju-squash pass through teammates. The last team standing scores a point for everyone on it.
- **Crumb Rush:** 45-second rounds. Every crumb eaten is a point, shown as 🍪 in the scoreboard with a ⏱ timer at the top. Knocked-out kaiju drop half their crumbs and come back after 2.5 s with a short shield. Most crumbs wins the round; a tie scores nobody.
- **Hot Dumpling:** one kaiju carries a steaming dumpling, shown above its head and pulsing faster as the fuse gets shorter. Touch a rival to pass it on. When the fuse runs out it POPS, knocking out the carrier. Last one standing wins. Needs 3+ players, so bots are added automatically.
- Bots understand all three modes:
  - **Team Feast:** they don't target teammates.
  - **Hot Dumpling:** the carrier chases rivals and everyone else runs from the carrier.
  - **Crumb Rush:** they chase crumbs.
- **Customise:** `src/sim/modes.ts`
  - Names, one-line blurbs, how-to text.
  - `enabled: false` hides a mode.
  - All the numbers: round time, respawn delay, crumb rate, fuse range, pass cooldown, carrier speed, team names and colours, friendly fire.
- **Not yet:** Online play still uses Classic only.
- **Tests:** `tests/world.test.ts` → "party modes". Screenshots: `node scripts/shots-modes.mjs`. Demo URL: `?mode=free&demo=4&gmode=teams|crumbRush|hotDumpling`.

## 2. Settings screen

- **Where:** Title → **⚙ SETTINGS** (top-right row).
- **Options:**
  - Sound effects volume.
  - Music volume (0 = off).
  - Screen shake on/off.
  - Reduced effects: about a third of the particles.
  - Name tags: each kaiju's name floats above it in matches.
- Saved on the device (`kk-settings-v1`).
- **Customise:** `src/settings.ts`. Change `DEFAULTS`, or add a field plus one line in `SETTINGS_ROWS`; the screen builds itself from that list.

## 3. Background music

- Three looping tunes, synthesised live, so there are no audio files and it still works offline:
  - `menu`: title, Free Play, Online lobby and the extras screens.
  - `battle`: matches.
  - `story`: the Story map.
- Music pauses during Story cutscene videos, which have their own sound.
- **Customise:** `src/music.ts` → `TRACKS`. Each track is a tempo plus note lists (`'C5'`, `'G#3'`, `'-'` = rest, one per 8th note) for lead, bass and drums (`k` kick, `s` snare, `h` hat). Add a track and call `playMusic('name')` from any scene.

## 4. Stats and achievements

- Lifetime stats for people on this device (bots don't count): matches, wins, win rate, rounds, KOs, crumbs, times gone KAIJU, best win streak, tables visited, favourite kaiju, and Story stars.
- **17 achievements**, e.g.:
  - First Bite: win a match.
  - Too Hot to Handle: 5 wins in a row.
  - World Tour: play 12 tables.
  - Not It!: win Hot Dumpling.
  - Mix It Up: win with 8 kaiju.
- A 🏆 pop-up appears at the end of the match that earns one.
- **Where:** Title → **🏆 RECORDS**.
- **Customise:** `src/stats.ts` → `ACHIEVEMENTS`. Each one is an icon, name, description and a one-line test on the stats.

## 5. How to Play

- **Where:** Title → **❓ HOW TO PLAY**. Four tabs:
  - **Basics:** goal, moves and controls for keyboard, gamepad and phone.
  - **Cutlery:** every cutlery type with art; traits are worked out from the real numbers in `src/sim/cutlery.ts`, so they stay correct when you tune them.
  - **Tables:** every table with its picture and blurb, and what unlocks the locked ones.
  - **Modes:** every enabled party mode.
- **Customise:** text in `src/scenes/ExtrasScenes.ts` (HelpScene). Table blurbs live in `src/sim/layouts.ts`, mode text in `src/sim/modes.ts`.

## 6. Kaiju Gallery

- **Where:** Title → **📖 KAIJU**. All 20 kaiju; locked ones show as silhouettes with "???".
- Selecting one shows its normal and KAIJU-mode art, food description, your matches and wins as it, and how to unlock it if locked.
- Screenshots of all the extras: `node scripts/shots-extras.mjs`.

## 7. Condiment power-ups

- **Four pick-ups** appear on the table every 9–15 s, at most 2 at a time. They flash, then fizzle out if nobody grabs them within 12 s.
  - **🌶️ Hot Sauce:** 40% faster for 6 s; you leave a flame trail.
  - **🛡️ Mustard Shield:** a golden bubble that blocks the next hit (cutlery, swipe, squash, cleaver, burner, toast). It doesn't save you from falls, wind, the giant hand or a popping Hot Dumpling.
  - **🍲 Gravy Boat:** +50% belly, towards KAIJU.
  - **🍬 Sugar Rush:** dash and swipe almost without cooldown for 6 s.
- Active buffs show as icons in the scoreboard. Bots go for nearby power-ups.
- **Where:** Free Play → **[U] power-ups** (touch: **POWER-UPS** pill). On by default; never in Story, so chapter difficulty is unchanged.
- **Customise:** `src/sim/powerups.ts`.
  - Names, colours, descriptions; `enabled` per kind.
  - Spawn rate, cap and lifetime.
  - Every duration and strength.
  - `POWERUPS.enabled` sets the default.
  - Icon size: `POWER_ICON_SCALE` in `src/scenes/GameScene.ts`.

## 8. Party modes and power-ups online

- The online lobby host now has **Mode** and **Power-ups** buttons, and friends see the choice.
- Snapshots carry teams, crumb points, respawn timers, buffs, power-ups on the table and the hot dumpling, so every mode plays online.

## 9. Pause menu

- Pressing **P**, gamepad START or the phone's **❚❚ PAUSE** opens a menu with **Resume**, **Restart** (same match setup, Story chapter or Gauntlet wave), **Music on/off**, **Sound on/off** and **Quit**. It works with mouse, touch, arrows or a gamepad.
- Esc still goes straight back to the menu, as before.
- **Customise:** the `items` list in `setPaused()` in `src/scenes/GameScene.ts`.

## 10. End-of-match awards

- A gold line under the final standings, listing up to 4 awards someone actually earned:
  - 🍴 Most KOs
  - 🍪 Crumb Monster
  - 🦖 Kaiju Lover
  - 🧈 Butterfingers (most falls)
  - 🛡️ Survivor (fewest knockouts)
  - 🌶️ Condiment Hoarder
- **Customise:** `awards()` in `src/scenes/GameScene.ts`. Each award is a title, who earned it, and an optional unit.

## 11. Gauntlet (solo survival)

- **Where:** Title → **GAUNTLET** card, now the 5th card; it shows your best wave.
- **How it works:**
  - You play as your Story pick. Each wave is one round on a random owned table, with power-ups on.
  - Wave 1 is 1 easy bot. Every 2 waves adds a bot, up to 5, and they get tougher.
  - Every 5th wave has a 👑 boss that can go KAIJU straight away.
  - One life: get knocked out and the run ends right away.
- Best wave is saved. "NEW BEST!" pops up when you beat it. It also shows in Records, with two new achievements (clear 5 / 10 waves).
- **Customise:** `src/gauntlet.ts` → `waveSetup()` (bots and levels per wave), `GAUNTLET` (power-ups, mode, boss frequency).

## 12. Hazards on/off

- Free Play → **[H] hazards** (touch: **HAZARDS** pill); online lobby → **Hazards** button. Turns off the giant hand, wind, cleaver, burners and toasters for a pure brawl. Terrain stays: belts, ice, sticky dough, the turntable, bumpers.
- Story always has hazards.

## 13. Hats (cosmetic rewards)

- 10 hats drawn in code (no art files). The kaiju of people on this device wear the chosen hat in matches.
- **Where:** Kaiju Gallery → **YOUR HAT** row. Locked hats say which achievement unlocks them.

| Hat | Unlocked by |
|---|---|
| Party Hat | free |
| Chef Hat | First Bite |
| Top Hat | Regular Diner |
| Viking Helmet | Forked Up |
| Propeller Cap (it spins) | Crumb Muncher |
| Flower Crown | Better Together |
| Halo | Not It! |
| Bobble Beanie | Gauntlet Runner |
| Birthday Candle (it flickers) | Dinner Party Animal |
| Golden Ladle | Too Hot to Handle |

- **Customise:** `src/hats.ts` → `HATS`. Each hat is a name, an achievement id, and a small draw function.

## 14. Practice (guided tutorial)

- **Where:** How to Play → **▶ PRACTICE** (top right).
- You, as your Story pick, against a training dummy (Dumplord) that never moves or fights back, on Sunday Roast with no hazards.
- **8-step checklist**, top right: walk, throw, pick up, knock out the dummy, swipe, dash, fill your belly, stomp to go KAIJU. The current step shows its controls for keyboard, gamepad and touch. Each step ticks with a ✔ pop-up, and "All done!" shows at the end.
- Knocked-out kaiju come back after 1.2 s and rounds never end. Practice doesn't count towards stats.
- **Customise:** `src/practice.ts`. `PRACTICE_STEPS` holds the text, the controls hint, and a one-line test on game events; `PRACTICE` holds the dummy kaiju, table, hazards and power-ups. The mode itself is `practice` in `src/sim/modes.ts`, hidden from mode pickers.

## 15. Daily Challenge

- **Where:** Title → **DAILY** card. It shows today's mode, or "Done ✔" with your streak.
- The calendar date picks one fixed match: the mode (Classic is twice as likely), a base table, your kaiju and 3 rival kaiju (normal / normal / easy bots). First to 3 rounds, power-ups on. Only base kaiju and tables are used, so everyone can play it.
- The end screen says COMPLETE / FAILED and shows today's best rounds, tries and your **win streak in days**. Rematch retries the same daily. New achievement: 📅 Daily Special.
- **Customise:** `src/daily.ts` → `DAILY` (mode list, rival levels, rounds, power-ups) and `dailySetup()`.

## 16. Title screen layout

- Six mode cards now: Story · Free Play · Online · Party Modes · Daily · Gauntlet. Their size adjusts automatically to the number of cards, so adding a mode is one more line in `MODES` in `src/scenes/TitleScene.ts`.
- Small row top-right: Settings · How to Play · Kaiju · Records.

## 17. Emotes

- Quick taunts in a speech bubble over your kaiju: 😂 😤 👋 🔥 😱 🍴 😋 💪. Each press shows the next one in the list.
- **Keys:** Keyboard Left **Q** · Keyboard Right **;** · Gamepad **LT/L2** or **BACK/SELECT** · phone **😜 EMOTE** button (under PAUSE / MENU).
- Works online: guests' emotes show for everyone. Bots sometimes gloat after a knockout (25%).
- **Customise:** `src/emotes.ts` (emote list, keys, pad buttons, bot gloat chance, bubble time, cooldown).

## 18. New rare cutlery: Pizza Cutter and Rolling Pin (Gemini art)

- **Pizza Cutter:** quick, long range, bounces off walls **3 times**, spins.
- **Rolling Pin:** slow, short range, big and **HEAVY**: it keeps going after a hit and shoves loose cutlery.
- Both are rare table pickups, like the Spork (25% of table pickups are rare). Never handed out at round start. They show in How to Play → Cutlery, and work online.
- **Customise:**
  - `src/sim/cutlery.ts`: each one's speed, range, size, bounces and heavy flag; `RARE_KINDS` and `RARE_CHANCE`.
  - Art: `public/art/cut-pizzacutter.webp`, `cut-rollingpin.webp`, from `art-src/jobs-cutlery2.json`.
  - New kinds must be **appended** to `KINDS` in `src/net/snapshot.ts`.

## 19. 🌶️ Spicy Story replays (hard mode)

- **Where:** Story map → the **🌶️ SPICY** button on the chapter panel, for chapters you've already cleared.
- Replays the chapter with every rival one level tougher (easy→normal, normal→hard). Spicy wins are saved separately, shown as "🌶️ 3" on the panel and a 🌶️ on the chapter card. They never change normal stars or unlocks.
- New achievements: 🌶️ Feeling Spicy (clear 1 on Spicy) and 🔥 Ghost Pepper (all 12). New hat: **Chili Pepper** (from Feeling Spicy).
- **Customise:** `SPICY_BUMP` in `src/story/chapters.ts` (how much tougher).

## 20. Instant replay

- At the end of each round, the last knockout plays again in **slow motion** (⏪ INSTANT REPLAY), from about 1.6 s before it to 0.5 s after, at 40% speed. Press throw, Enter or Space to skip.
- Not shown in online matches, Crumb Rush (rounds end on time) or Practice.
- **Settings → INSTANT REPLAYS** turns it off.
- **Customise:** `src/replay.ts` → `REPLAY` (on/off, how long before/after, speed, frame rate).

## 21. Player numbers (accessibility) and 📸 Share

- **Settings → PLAYER NUMBERS:** shows a P1–P6 badge in each player's colour under every kaiju, and puts the number in front of names in the scoreboard. Makes players easy to tell apart without relying on colour.
- **📸 SHARE:** a small button in the bottom-left of the final results screen. On phones it opens the share sheet (send the screenshot to a chat); on computers it saves `kitchen-kaiju.png`.
- **Customise:** share text in `share()` in `src/scenes/GameScene.ts`.

## 22. New table: Smoothie Bar (new Blender hazard, Gemini art)

- A mint-and-cream smoothie counter with smoothie cups, a pineapple, bananas and strawberries. Free (not locked), so it's in Free Play, Online, Party modes and the Daily rotation. Story is unchanged.
- **The Blender** in the middle:
  - It rumbles and shakes with a red warning ring and "BLENDER WARMING UP!" for 1.6 s.
  - Then it spins for 2.6 s, swirling and **sucking** kaiju, crumbs and all towards the blades. Reach the blades and you're BLENDED.
  - KAIJU-sized kaiju are only half as affected. Shoving someone in counts as your knockout.
- Bots run from it while it warms up or spins, and sometimes dash out.
- **Customise:** `RULES.blender*` in `src/sim/constants.ts` (timings, reach, pull strength); the table itself is the last entry in `src/sim/layouts.ts`. Art in `art-src/jobs-smoothie.json`.

## 23. Remappable keyboard controls

- **Where:** Settings → **⌨ KEYBOARD CONTROLS**. Both keyboard players' moves (up/down/left/right, throw, swipe, dash, stomp, emote) can be rebound: pick an action, press a key.
- Choosing a key that's already used swaps the two actions, so nothing is ever left unbound. **↺ RESET TO DEFAULT** restores everything.
- Keys the menus need can't be used: Esc, P, 1, 2, Tab, and the Free Play shortcuts B N M R G U H O.
- The Free Play menu and How to Play show your current keys. Saved on the device (`kk-keys-v1`).
- **Customise:** `src/keybinds.ts` (`RESERVED`, `ACTIONS`); the defaults are still `KEYMAPS` in `src/input.ts`.

## 24. Attract mode (title demo)

- After **40 s idle** on the title screen, a 4-bot demo match plays on a random owned table with "DEMO · PRESS ANY KEY OR TAP TO PLAY". Any key, tap or gamepad button goes back to the title, as does the end of the demo match. Demo matches don't count towards stats.
- **Customise:** `ATTRACT_AFTER` in `src/scenes/TitleScene.ts` (seconds; 0 = never).

## 25. 🍰 Dessert Course (post-game)

- **Where:** Story map → **🍰 DESSERT x/4** (top). It appears once you've seen the Story ending.
- Four tougher fights back to back, playing as your Story pick, each with a rival quip at the start:
  1. **Sugar Crash** (Candy Shop)
  2. **Brain Freeze** (Freezer Shelf)
  3. **Blended** (Smoothie Bar)
  4. **The Chef's Nightmare**: Dumplord boss plus 3 rivals.
- Win and you go straight to the next course. Lose and progress is saved; the button carries on from your next uncleared course.
- Measured with `npx vite-node scripts/dessert-balance.ts`: the reference bot wins 73% → 57% → 37% → 27%.
- Finishing all four earns 🍰 **Clean Plate** and the **Dessert Crown** hat.
- **Customise:** `src/story/dessert.ts` → `COURSES` (table, rivals and levels, boss, rounds, quip).

## 26. Per-bot difficulty (Free Play)

- Tap or click a bot's card to cycle just that bot between EASY / NORMAL / HARD; it's marked ✎ when changed. The **2** key (touch: **BOTS**) still sets every bot at once and clears the per-bot choices.
- Kept for rematches and when you come back to the menu.

## 27. 🏆 Party Cup

- **Where:** Free Play → **[C] CUP** (touch: **🏆 CUP** pill). Uses whoever has joined, and fills with bots up to 3.
- Five games in a row: Classic (first to 2) → Crumb Rush (1 round) → Hot Dumpling (first to 2) → Team Feast (first to 2) → Classic final (first to 3). Modes needing more players are skipped.
- Points per game by placing: 5 / 3 / 2 / 1. Ties share the better place, and team members share their team's place. Standings show after each game ("1 / START to continue"); the last one crowns the cup winner.
- New achievement: 🏆 **Cup Champion**.
- **Customise:** `src/cup.ts` → `CUP.games` (order, modes, rounds) and `CUP.points`.

## 28. New table: Fondue Night (new Hot Cheese hazard, Gemini art)

- A cosy alpine table: a red fondue pot in the middle, a checkered runner, bread cubes, a cheese wheel and grapes. Free (not locked).
- **Hot cheese:** every 1.6–2.6 s a cheese blob drops near a random kaiju. A growing shadow and ring warn you for 1.3 s; then it SPLATS, knocking out anyone under it, and leaves a **sticky cheese puddle** for 7 s that slows you like dough. Drops come faster in sudden death.
- Bots dodge the shadows and avoid puddles. Works online.
- Themed place mats for Fondue Night and Smoothie Bar (`art-src/jobs-mats6.json`).
- **Customise:** `RULES.cheese*` in `src/sim/constants.ts`; the table is the last entry in `src/sim/layouts.ts`. Art: `art-src/jobs-fondue.json`.

## 29. Mutators ("twists")

- **Where:** Free Play → **[X] twist** (touch: **TWIST** pill); online lobby host → **Twist** button. One twist at a time; shown on the menu and the countdown banner (⚡).
  - **Kaiju Frenzy:** everyone starts every round with a full belly.
  - **Turbo:** the whole game runs 30% faster.
  - **Boomerangs:** every throw flies back to you.
  - **Giant Cutlery:** 60% bigger hit areas.
  - **Ice Rink:** every table is slippery.
  - **Snack Attack:** crumbs fill your belly 3× faster.
- Never applied in Story, Gauntlet, Dessert Course or the Daily Challenge. Works with party modes, power-ups and the Party Cup.
- **Customise:** `src/sim/mutators.ts` (names, blurbs, `enabled`, and the numbers in `MUTATOR_RULES`).

## 30. Quick tips, Smoothie Operator, two-column Settings

- **Quick tips:** a 💡 tip under the countdown before each round. Tips fit the mode and table (blender tips on the Smoothie Bar, dumpling tips in Hot Dumpling, and so on). Turn them off in Settings → QUICK TIPS. **Customise:** `src/tips.ts` (add tips; tag one with `mode` or `table` to show it only there).
- New achievement 🥤 **Smoothie Operator**: shove a rival into the blender.
- Settings is now two columns, so every option and its help text fits.

## 31. Hats online

- Everyone's chosen hat now shows in online matches. Each friend's device sends its hat when joining, and the host shares all hats at the start and on rematches. Bots never wear hats.

## 32. Achievement progress and pages

- Locked count-style achievements (wins, KOs, crumbs, streaks, tables, kaiju, Gauntlet waves, matches) show a progress bar such as "340/1000" in Records.
- 25 achievements now, so the list has pages: **PAGE ▶** (18 per page).
- **Customise:** add `progress: s => [current, goal]` to any achievement in `src/stats.ts`; `PER_PAGE` in `src/scenes/ExtrasScenes.ts`.

## 33. Loading screen

- First load (or a slow connection) shows "KITCHEN KAIJU", a progress bar with a percentage, and playful lines: "Laying the tablecloth… Polishing the cutlery… Waking the kaiju…".
- **Customise:** `LOADING_LINES` in `src/render/art.ts`.

## 34. Kaiju voices

- Every kaiju has its own synth voice (pitch, wave, wobble): a **cry** when knocked out, a **roar** when it goes KAIJU, and a **chirp** for emotes. You can tell who just got splatted by ear.
- **Customise:** `VOICES` in `src/audio.ts` (one entry per kaiju, in SPECIES order).

## 35. 📺 TV mode (phones as controllers)

- Online lobby (host) → **📺 TV mode: ON**. The host's screen (laptop or TV) just shows the match, and everyone plays on their own phone through the normal online join (room code). Bots still fill empty seats.
- Perfect for a living room: put the host on the TV, and friends join from their phones and play on the big screen. Each phone also shows the game.

## 36. QR code to join

- The online host lobby shows a **QR code** next to the room code. Scan it with a phone camera and the game opens and joins the room straight away, no typing. Pairs nicely with 📺 TV mode.
- The link is `…/kitchen-kaiju/?join=CODE`, so it can also be sent in a chat.
- Uses the small `qrcode-generator` library (works offline).

## 37. Announcer callouts

- Big pop-up words in the scorer's colour for great moments:
  - **FIRST BITE!** for the first knockout of the match.
  - **DOUBLE SKEWER! / TRIPLE TREAT! / QUAD-RUPLE DIP! / FULL BUFFET!!** for knockouts within 2.2 s of each other.
  - **ON A ROLL! / UNSTOPPABLE APPETITE! / KITCHEN NIGHTMARE!** for 3 / 5 / 8 knockouts without being knocked out.
  - **REVENGE IS SWEET!** when you knock out whoever last got you.
- **Customise:** `src/callouts.ts` (all the words, the multi-KO window, streak thresholds, on/off).

## 38. Victory screen and boss intro

- **Victory:** at the end of a match the winner's KAIJU-mode art swings in big on the right of the results, with a shower of confetti in their colour. Reduced Effects turns the confetti off.
- **Boss intro:** boss fights (Story bosses, Gauntlet every 5th wave, the Dessert Course finale) open with a "👑 BOSS: NAME" card.

## 39. Big touch buttons

- **Settings → BIG TOUCH BUTTONS:** makes the phone THROW / SWIPE / DASH / STOMP buttons about 25% bigger, with spacing to match. Changes straight away.
- **Customise:** the `body.bigbtns` CSS rules in `src/touch.ts`.

## 40. Story progress line

- Under "THE GRAND FEAST" on the Story map: **Story N% complete · ★ stars · 🌶️ Spicy clears · 🍰 Dessert (after the ending) · 🎁 rewards**. It updates as soon as a chapter result comes in.
- The % weighs chapters 35%, stars 25%, Spicy 20%, Dessert 10% and rewards 10%. **Customise:** `updateProgress()` in `src/scenes/StoryScene.ts`.

## 41. New table: Pancake Stack (new Spatula hazard, Gemini art)

- A sunny pancake-house counter with a pancake stack, maple syrup jugs, butter and berries, plus its own place mats. Free (not locked).
- **The Spatula:** a red square appears around a kaiju and flashes faster for 1.5 s; then a giant spatula SLAMS down and FLIPS anyone inside (knockout) and scatters the crumbs. Shove someone in to claim it. It comes faster in sudden death.
- Bots step out of the square by its nearest side. Works online. It has its own tip.
- **Customise:** `RULES.spatula*` in `src/sim/constants.ts` (timings, square size); the table is the last entry in `src/sim/layouts.ts`. Art: `art-src/jobs-pancake.json`.

## 42. Back up / move your save

- **Settings → 💾 BACK UP / MOVE SAVE:** shows a single code holding all your progress (story, stars, unlocks, stats, achievements, hats, settings, keys, Daily, Gauntlet, Dessert). Copy it somewhere safe; on another device or browser, paste it and press **Load this save**.
- **Customise:** `src/backup.ts` (it includes every saved item whose name starts with `kk-`).

## 43. Fix: Kaiju Gallery taps (reported)

- Tapping or clicking a kaiju in the Gallery used to show it for a moment and then jump back to the first kaiju, so only the arrow keys worked. Fixed: tapping now selects that kaiju, on phones and PCs.
- On phones the BACK button on the extra screens no longer sits under the FULL SCREEN button, and the hat name no longer overlaps the hat row.
- Test reliability: the main browser test now waits for the menu and walks towards the middle of the table. It passed 10 out of 10 runs.

## 44. Rumble

- Gamepads vibrate (and phones buzz, where the browser allows) when you're knocked out, when you knock someone out, when you go KAIJU, and on big blasts (cleaver, spatula, hot dumpling pop). Online, you only feel your own kaiju.
- **Settings → RUMBLE** turns it off. **Customise:** strengths and lengths in `src/rumble.ts`.

## 45. 🎲 Shuffle (Free Play)

- **[Z]** (touch: **🎲** pill) picks a random mode, table and (half the time) twist from what you own. Press again until you like it.

## 46. Party Cup online

- Online lobby (host) → **🏆 Party Cup: ON**. The whole five-game cup plays online. After each game the host presses 1 / START to continue, and every friend's device moves on together with the same points and standings. Friends see "waiting for the host…".

## 47. 🛠 Table Workshop (build your own tables)

- **Where:** Title → **🛠 WORKSHOP** (top-right row).
- Build up to **3 custom tables**:
  - Pick a **surface** (any table you own).
  - Pick a **hazard** (none, giant hand, wind, cleaver, hot cheese, spatula).
  - Place up to **12 props**: tap a prop, then tap the table; tap a placed prop to remove it. **BUMPER** gumdrops bounce kaiju away. Start spots (white circles) are kept clear.
- **💾 SAVE** keeps it; **▶ PLAY IT** jumps straight into a match on it.
- Custom tables show up in Free Play's TABLE picker (and the rotation, Party Cup and Gauntlet), named "My Table 1-3". They're local only, never online, in Story or in the Daily.
- **Customise:** `src/custom.ts` (which props, hazards, limits).

## 48. Free Play and Party Modes are now separate (requested)

- **FREE PLAY** (title card) is **Classic only**: the screen is titled FREE PLAY and has no mode option. Power-ups, hazards, twists, shuffle and Online stay.
- **PARTY MODES** (title card) opens its own **PARTY MODES** setup. The mode is shown big under the title (◀ TEAM FEAST ▶; tap it or press **[G]** to change) with its description, and the **🏆 Party Cup** lives here (**[C]**).
- Leaving a match returns you to whichever of the two you came from. On phones the MODE and CUP buttons only appear in Party Modes.

## 49. Gemini hats (requested)

- All 12 hats are now proper illustrations in the game's art style, drawn in Gemini:
  - Party Hat with sprinkles, Chef Hat, Top Hat with a fork in the band, Viking Helmet with breadstick horns, Propeller Cap, Flower Crown, golden Halo (floats and bobs), Bobble Beanie, Birthday Candle.
  - Golden Ladle (worn as a helmet), Chili Pepper beret, and the Dessert Crown with cherries.
- They sit on the head and follow the kaiju's bob and tilt in matches, online included. The Gallery's hat row and preview use the new art. The old drawn-in-code hats stay as a fallback.
- **Customise:** `HAT_FIT` (size and how low each sits) and `HAT_SCALE` (overall size) in `src/hats.ts`. Art: `public/art/hat-*.webp`, from `art-src/jobs-hats.json`.

## 50. Four more twists

- **Fists Only:** no cutlery anywhere. Swipe bare-handed, dash-shove and stomp. Bots get up close and swipe.
- **Bouncy Castle:** the table edges bounce you back with a boing, so nobody falls off. Cutlery and hazards still knock you out.
- **Mirror Moves:** players' movement is reversed (bots aren't affected, so it's a handicap for the brave). Aiming stays normal.
- **Mini Kaiju:** everyone is about 30% smaller and 12% faster, so harder to hit.
- Bot sims: every twist plays out to normal-length rounds of 20–29 s.
- **Customise:** `src/sim/mutators.ts` (`tinySize`, `tinySpeed`, `bounce`, names, `enabled`).

## 51. 12 more Gemini hats (25 in total) and 2 new achievements

| Hat | Unlocked by |
|---|---|
| Sushi Topper | Speed Eater |
| Teacup | Daily Special |
| Pirate Hat (crossed-forks emblem) | Cutlery Drawer |
| Wizard Hat | World Tour |
| Cowboy Hat | Cup Champion |
| Bunny Ears | Mix It Up |
| Smoothie Cup | Smoothie Operator |
| Knight Helmet | Gauntlet Master |
| Noodle Bowl | Bottomless Belly |
| Hard Hat | **Table Maker** (new: save a Workshop table) |
| Jester Hat | **Plot Twist** (new: win with a twist on) |
| Spoon Crown | Head of the Table |

- The Gallery hat picker now has pages (**▶** button). Locked hats show as dark silhouettes, and the label says which achievement unlocks them.
- **Customise:** the new hats are at the end of `HATS` in `src/hats.ts` (name and unlocking achievement); size and fit are in `HAT_FIT`. Art: `art-src/jobs-hats3.json`.

## 52. Second Helpings: a second Story campaign

A 6-chapter post-game story. It opens once **chapter 6 of The Grand Feast** is cleared: a **🍽 SECOND HELPINGS ▶** button appears top-right on the Story map, and **◀ THE GRAND FEAST** switches back.

| # | Chapter | Table | Rivals | Extra |
|---|---|---|---|---|
| 1 | Smoothie Operators | Smoothie Bar | Sloba, Avocadrake | |
| 2 | Say Cheese | Fondue Night | Tacowl, Chocomunch | |
| 3 | Flipping Out | Pancake Stack | Hotchog, Bluebeary, Toastbat | twist: **Mini Kaiju** |
| 4 | Cold Shoulder | Freezer Shelf | **Pengwhip (boss)**, Minturtle | |
| 5 | Sugar High | Candy Shop | Bubblegumbo, Bloblin, Velvaroo | twist: **Snack Attack** |
| 6 | Second Helpings | Chef's Nightmare | **Velvaroo (final boss)**, Hotchog, Pengwhip | |

- Each chapter has its own Gemini still and Google Flow clip, punny captions, rival dialogue, stars, 🌶️ Spicy replays and its own opening and ending.
- It has its **own save** (`kk-story2-v1`), so it never touches Grand Feast progress. Kaiju you own still come from The Grand Feast. The Rewards and Dessert buttons only show on The Grand Feast.
- Balance (reference bot, 100 runs): 97 / 89 / 83 / 67 / 71 / 38% win.
- New achievements and hats: **Room for More** (clear chapter 3) unlocks the **Ice Cream Cone** hat, and **Second Helpings** (finish it) unlocks the **Pancake Stack** hat. That makes 27 hats.
- Story chapters can now carry a twist (`mutator` on a chapter). The Grand Feast doesn't use any.
- Also fixed a latent crash when re-entering the Story map after a result card.
- **Customise:**
  - Chapters, dialogue, tips and captions: `src/story/seconds.ts`.
  - Campaign list, titles, save keys and the unlock rule (`SECONDS_AFTER_CHAPTER`): `src/story/campaigns.ts`.
  - Cutscene art and clip prompts: `scripts/make-s2-jobs.mjs`, which writes `art-src/jobs-s2.json` and the `s2-*` keys in `art-src/flow-cutscenes.json`.
  - Balance check: `CAMPAIGN=seconds RUNS=100 npx vite-node scripts/story-balance.ts`.
