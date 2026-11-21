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
- 53. Second Helpings has its own music
- 54. Fast forward when only bots are left
- 55. Clear teams on the Team Feast setup screen
- 56. Kaiju powers: every kaiju plays differently
- 57. Hats sit on each kaiju's actual head
- 58. Colour styles (replace hats)
- 59. Playtest fixes (round 1)
- 60. Playtest round 2 themes
- 61. Combat depth, goals, readable twists, more story

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

## 53. Second Helpings has its own music

- The Second Helpings map plays `story2`: a minor-key "midnight snack" version of the Story tune, a bit faster with a busier beat. The Grand Feast keeps `story`.
- **Customise:** `TRACKS.story2` in `src/music.ts` (notes, tempo, drums, wave). StoryScene chooses the track by campaign.

## 54. Fast forward when only bots are left

- Once every person playing is knocked out for the rest of the round, the bots finish it **3× faster**, with a "⏩ FAST FORWARD" banner. Normal speed comes back at the next round.
- It doesn't happen in Practice, in Crumb Rush while you're waiting to respawn, or in all-bot attract matches.
- **Customise:** `FAST_FORWARD` at the top of `src/scenes/GameScene.ts` (1 = off).

## 55. Clear teams on the Team Feast setup screen

- In Team Feast, every seat card shows a big **RED TEAM / BLUE TEAM** tag, a red or blue tint and a thick team-coloured border. The header shows the count (e.g. "RED 2 vs BLUE 2") and suggests adding a player or bot when the teams are uneven.
- Teams alternate by seat, the same as in the match.
- **Customise:** team names and colours are in `MODE_RULES.teams` in `src/sim/modes.ts`; the card drawing is in `MenuScene.draw()`.

## 56. Kaiju powers: every kaiju plays differently

Everyday play is the same for everyone. In **KAIJU form**, pressing **THROW or SWIPE** fires that kaiju's own signature power (about a 1.6 s cooldown, so roughly 3 uses per KAIJU). Each kaiju also has one small everyday trait.

| Kaiju | KAIJU power | Trait |
|---|---|---|
| Gobzilla Jr. | Seed Spray: shoves rivals in front | Balanced |
| Squidgeon | Ink Cloud: sticky puddle ahead | Longer swipe reach |
| Crabbage | Claw Snap: short, very strong, bats away cutlery | Quick |
| Bloblin | Wobble Wave: knockback ring that dazes | Hard to shove |
| Mothball | Flutter: instant long hop | Light and quick |
| Toastbat | Pop-Up: hop that lands with a shove | Shorter dash cooldown |
| Dumplord | Steam Burst: big push ring | Heavy |
| Norigon | Sushi Roll: fast roll that flattens | Faster dash |
| Chocomunch | Choc Melt: big sticky puddle underfoot | Heaviest, slow |
| Bubblegumbo | Gum Bubble: projectile that traps (dazes) | Longer swipe reach |
| Bluebeary | Berry Mines: four mines that pop | Shorter dash cooldown |
| Pizzaraptor | Slice Toss: boomerang pizza slice | Stronger throws |
| Sloba | Pearl Spill: slippery pearls all around | Slow but hard to shove |
| Avocadrake | Stone Toss: hard straight shove | A little heavier |
| Salmonster | Upstream: surge with a slippery trail | Grip on slippery tables |
| Hotchog | Spike Out: ring that dazes | Swipes reach further |
| Minturtle | Shell Spin: push ring that bats away cutlery | Hard to shove, slow |
| Pengwhip | Belly Slide: long slide that flattens | Grip on ice |
| Velvaroo | Big Kick: huge short-range launch | Shorter dash cooldown |
| Tacowl | Screech: huge ring that dazes | Faster throws |

- **Dazed** rivals can't move or act briefly (spinning stars).
- Bots use powers when a rival is in reach.
- Story bosses use their powers too; Second Helpings was re-tuned to 93 / 91 / 86 / 50 / 64 / 40%.
- Works online.
- Shown on the kaiju pickers (🌟 power name), in the Gallery (power and trait) and in How to Play.
- **Classic rules:** Settings → KAIJU POWERS: OFF makes every kaiju the same.
- **Art:** Gemini sprites for the projectiles, mines and puddles (`public/art/pw-*.webp`, `pz-*.webp`; jobs in `art-src/jobs-powers.json`; set by `art` in `KITS`). Without them, plain shapes are drawn.
- **Customise:** `src/sim/powers.ts`: `KITS` (power type, numbers, trait multipliers), `KAIJU_POWERS.cooldown`. Balance check: `RUNS=150 npx vite-node scripts/kaiju-balance.ts` (`POWERS=0` for the Classic baseline; at 150 runs, ±8% is just luck).

## 57. Hats sit on each kaiju's actual head

- Every kaiju (normal and KAIJU form) has its own head spot and head size, so hats sit on the head instead of on the top of the picture: on Norigon's and Pizzaraptor's heads, not their backs; on Toastbat's head, not its toast wings; on Sloba, not its straw. Hats flip with the kaiju when it faces left, and are sized to the head. The Gallery preview uses the same spots.
- **Customise:** `src/render/heads.json`: `[x across 0..1, y down 0..1 to the top of the head, size]` for each `kaiju-N` and `kaiju-N-rage` (facing right). Check every kaiju with `node scripts/hat-sheet.mjs party,chef,top,crown` (add `RAGE=1` for KAIJU form) and look at `art-src/.hats-sheet.png`. Per-hat fit is still `HAT_FIT` in `src/hats.ts`.

## 58. Colour styles (replace hats)

- Hats are switched off; every kaiju can be worn in a **colour style** instead: Classic, Mango, Lime, Ocean, Grape, Bubblegum, Golden (shiny), Midnight and Ghost.
- Only the kaiju's main body colour changes. Outlines, eyes, cream, cherries, buns and other parts stay as drawn, so the face never changes.
- **Choose it:** Gallery → YOUR COLOUR. The swatches show the selected kaiju in each style, and the pick works on every kaiju. It shows in matches, KAIJU form, the HUD, the victory card, the setup cards and online.
- **Unlocks:** Classic and Mango are free. Lime = First Bite (win a match), Ocean = Regular Diner (10 wins), Grape = Forked Up (25 KOs), Bubblegum = Better Together (win Team Feast), Golden = Clean Plate (Dessert Course), Midnight = Gauntlet Runner (5 waves), Ghost = Feeling Spicy (a Spicy clear).
- **Twins:** when two seats play the same kaiju, the later ones automatically get a different colour so you can tell them apart.
- Recoloured pictures are made on the device the first time they're needed (no extra download).
- **Customise:**
  - `src/colours.ts`: `COLOURS` (name, unlock, recipe: target hue, saturation, lightness, glow), plus `BODY_HUE` for kaiju whose main colour isn't picked up automatically (Norigon, Salmonster).
  - `src/render/recolor.ts`: `RANGE` / `RANGE_FADE` (how far from the main colour still recolours).
  - Preview every kaiju × style: `npx vite-node scripts/colour-sheet.ts` (add `rage` for KAIJU form) → `art-src/.colours.png`.
  - Hats come back with `HATS_ENABLED = true` in `src/hats.ts`.

## 59. Playtest fixes (round 1 of the AI playtest: batches 1–4)

From the 10 Sonnet playtester reports in `playtest-reports/`.

- **Bugs:**
  - Escape now opens the pause menu (and closes it) instead of quitting the match.
  - Leaving Daily or Gauntlet returns to the title, and Practice returns to Help. Their roster and rounds no longer leak into Free Play; that leak was the "First to 99 rounds" bug.
  - The pause menu's MUSIC and SOUND toggles restore your previous levels.
  - You can't pause during an instant replay (the replay banner used to sit on the pause menu), and the replay shows the right number of round pips.
  - The top-right round label shrinks onto two lines so it never runs into the 4th player's card.
  - The results ticker wraps clear of the 📸 SHARE button.
  - The Practice checklist is a compact panel at the bottom-left, so it no longer hides the dummy.
- **Mouse and touch setup:**
  - Click an empty seat to join (then click more seats to add bots). Click your own seat to change kaiju, and a bot's seat to change its level.
  - Every key chip in the footer is clickable. Labels are clearer: "bot level", "🎲 random".
- **Feedback:**
  - When you're knocked out, a big "💥 … YOU" line appears where it happened.
  - A KAIJU shows a ring counting down its time. Your own KAIJU also shows a power dot that fills as the power recharges and flashes when it's ready.
  - Achievement pop-ups say which colour they unlock.
  - Records shows each achievement's colour reward and a "👉 Next up" line for your closest achievement.
  - Gallery colour swatches show 🔒 when locked, and hovering one tells you what unlocks it.
  - The title's Daily card shows "Today: <mode> · 🔥 streak", and the Story card says when Second Helpings is open.
- **Difficulty:**
  - Normal bots are tougher and hard bots slightly gentler. The reference bot now wins 76% of rounds against easy, 52% against normal and 32% against hard (was about 68–85 / 56–62 / 23–27).
  - The Gauntlet ramps sooner: 2 bots from wave 2, normal bots from wave 3, hard from wave 7.
  - 🌶️ Spicy rivals also start every round with a 55% belly (`SPICY_START_BELLY`).
  - Story chapters 1–2 hold table hazards back 12 extra seconds (`STORY_CALM`).
  - The first bosses (Norigon, and Pengwhip in Second Helpings) start each round at an 85% belly instead of 100%. The new `bossBelly` setting on a chapter controls this.
  - The Norigon chapter is first-to-2. Ramps: Grand Feast 96 → 27%, Second Helpings 93 → 39%.
- **Pacing:**
  - KAIJU form lasts 6 s (was 5).
  - 🍽 **Feeding frenzy:** in Classic and Team Feast, after 45 s everyone's belly fills (`RULES.frenzyFill`), so stand-offs end in KAIJU fights.
  - Party Modes default to first-to-3 (`PARTY_ROUNDS`).
  - Story retries skip the intro chat once you've seen it in this session.
- **After round 2:**
  - Crumb Rush ties score for all tied leaders, and matches end after `target × RULES.maxRoundsPer` rounds, with the leader winning.
  - You can't STOMP after a round has ended.
  - A crumb adds 10 belly.
  - Gallery swatches redraw on every visit, and the Records "Next up" line sits below the list.
  - The Gauntlet HUD shows WAVE.
  - Results are one column, with "(YOU)" for a solo player.
  - The Practice panel sits below the table.
  - The Second Helpings intro text is fixed.
- **Playtest loop:** `scripts/playtest/server.mjs` (harness), `profiles.md` and `sheet-template.md` next to it, and reports in `playtest-reports/` (`round1/` + round 2 + `SUMMARY.md`).

## 60. Playtest round 2 themes (all five)

1. **KAIJU happens most rounds:**
   - Everyone starts each round with a 25% belly (`RULES.startBelly`).
   - A knockout feeds the winner 30 belly (`RULES.koBelly`).
   - Crumbs refill faster and more of them stay on the table (`crumbEvery 0.4`, `maxCrumbs 26`).
   - Result: KAIJU now appears in about 89% of rounds (about 1.4 per round, about 2 power uses). Measure with `npx vite-node scripts/kaiju-rate.ts`.
2. **Cleaner setup (computers):**
   - A row of big clickable setting buttons: mode, party cup, bot level, table, rounds, twist, power-ups, hazards, 🎲 random, online.
   - A big ▶ PLAY button and a one-line hint (Party Modes also lists the Party Cup's games and points).
   - The full key legend and rules are behind **⌨ KEYS** (Escape closes it).
   - Party Modes default to first-to-3 and Free Play to first-to-5, every time.
   - First launch: the title offers **👋 NEW HERE? 1-MINUTE PRACTICE** until you've played a match or tried it. Quitting Practice from there returns to the title.
3. **Stakes:**
   - **Gauntlet perks:** after every cleared wave, pick 1 of 3 (Full Belly, Mustard Coat shield, Hot Feet, Sugar Rush; keys 1/2/3 or click). Perks stack for the run. Defined in `GAUNTLET_PERKS` in `src/gauntlet.ts`.
   - New skill achievements: **Clean Sweep** (win first-to-3+ without losing a round) unlocks the **Cherry** colour, **Rampage** (3 KOs in one KAIJU form), and **Regular** (win the Daily 3 days running) unlocks the **Mint** colour.
   - The Daily match states its goal: win it to clear today and keep your 🔥 streak.
4. **Unlocks feel like an event:**
   - New Story kaiju or tables get a full-screen 🎉 **NEW KAIJU! / NEW TABLE!** moment, with the art, name and KAIJU power.
   - The Gallery shows **Collection %** (kaiju, tables, colours).
   - The Story panel explains stars (★★★ no rounds lost · ★★ lost one · ★ any win).
5. **Story curve smoothed:**
   - Grand Feast: chapter 7 (Crabbage) and chapter 9 (Avocadrake) eased; the finale toughened (Pizzaraptor hard). Now 97 → 53–58% → 41%.
   - Second Helpings: chapter 3 (Bluebeary) eased; the Pengwhip boss starts at a 90% belly. Now 94 / 79 / 81 / 67 / 50 / 38%.
- **After round 3:**
  - Story: ⏩ SKIP CHAT (S), faster typing, defeat text that matches the score, a 🍀 HELPING HAND retry after 2 losses (`StoryScene.losses`), and the celebration shows right away.
  - Gauntlet: Escape is safe on the perk picker.
  - Setup: PLAY with nobody seats you, Team Feast evens up teams, and Free Play and Party Modes keep separate settings (`MenuScene.lastParty`).
  - Results screens have clickable REMATCH/CONTINUE and MENU buttons.
  - Kaiju powers rebalanced for frequent KAIJU.

## 61. Combat depth, goals, readable twists, more story (from the round 3 playtest)

1. **Combat depth:**
   - ⚔ **Parry:** a swipe timed on incoming cutlery sends it back where you aim (it becomes yours, a little faster: `RULES.parrySpeed`), with a "⚔ PARRY!" pop-up. Hard bots parry sometimes too.
   - **Spawn safety:** everyone is untouchable for 1 s when a round starts (`RULES.spawnShield`).
   - Throws already show a dotted charge line as a warning.
2. **Long-term goals:**
   - The title shows **🎯 NEXT UP**: your nearest Story unlock and your closest colour reward (with %). See `src/goals.ts`.
   - New early reward: clearing Story chapter 3 (**Leftovers Cleared**) unlocks the **Toasty** colour.
   - **Gauntlet recap:** "GAUNTLET OVER" shows waves cleared, 🏅 NEW BEST, a score (waves × 100 + KOs × 10) and your perks, with **↻ NEW RUN** and **☰ MENU** buttons.
3. **Readable twists:**
   - Every twist gets a "⚡ TWIST: name — what it does" banner at each round start, plus a ⚡ chip in the corner.
   - **Ice Rink** puts an icy sheen with frost streaks and sparkles on the table.
   - **Bouncy Castle** shows flashing striped bumpers along the edges.
4. **More story:** after a chapter clear, the 👨‍🍳 Head Chef reacts to how you played (a flawless run, lots of KOs, going KAIJU, or a nudge to STOMP) and teases the next course and its first rival.
- **After round 4:**
  - REMATCH/MENU buttons reset every match, so they always appear.
  - S skips the Story chat.
  - The NEW KAIJU celebration is opaque and takes all keys until closed.
  - The twist explanation sits in the countdown text, and the Ice Rink sheen is much stronger.
  - The Second Helpings intro is reworded.

## 62. The five big asks from the round 4 playtest

1. **Teaching STOMP / KAIJU:**
   - A bouncing **"BELLY FULL! PRESS E → KAIJU"** prompt (the key matches your controls: E, ".", Y on a pad, or "tap STOMP") follows any human whose belly is full.
   - It always shows in Story chapters 1–2, and elsewhere until you have gone KAIJU 5 times (`STOMP_COACH_UNTIL` in GameScene).
   - It stays on screen and flips below your kaiju near the top edge.
2. **Collecting:**
   - Every locked Gallery item shows progress, e.g. "Collect 30 Story stars (you have 12/30)", "Beat chapter 8 (3/8 cleared)", and colour achievements as "(4/10)".
   - **3 new early colours:** 🍋 Lemon (win a Golden Spoon match: new **Spoon Fed** achievement), Sky (win Hot Dumpling), Lava (go KAIJU 10 times).
   - The swatch row now squeezes to fit any number of colours (`colStep`).
   - Ghost Pepper and Second Helpings achievements show progress bars.
3. **Fighting a rival KAIJU:**
   - **Stomp telegraph:** a ring the size of the stomp fills in before every KAIJU stomp, so you can step out. A flashing ring warns when a KAIJU is about to shrink.
   - **Dizzy punish:** when KAIJU ends, the kaiju is dizzy for 0.75 s with no safety shield (`P.shrinkDizzy`, `P.shrinkInvuln = 0`). That is your moment to hit back.
   - Story balance is unchanged within noise: 100-run checks with and without dizzy.
4. **Gauntlet runs:**
   - **3 lives ❤❤❤** per run (`GAUNTLET.lives`, max 5). Losing a wave costs a life and retries the same wave, keeping your perks. GAUNTLET OVER only comes when the last life is gone.
   - Hearts show in the HUD and on the results screen.
   - **New perks:** 👻 Ghost Start (untouchable for the first 3 s of each wave) and ❤ Extra Life (+1 life, offered only below the max).
5. **Party:**
   - **🥄 GOLDEN SPOON**, a new party mode. Touch the spoon to grab it, and every second you hold it scores. The holder is 10% slower; knocking them out drops it, with a short no-grab moment.
   - The spoon always sits on open table, never inside a centre obstacle.
   - The first to 15 s held wins the round; after 60 s the longest holder wins. Knocked-out kaiju come back after 2.2 s.
   - Bots chase the spoon, and the holder runs. Works online (snapshot field `gs`).
   - Tuning lives in `MODE_RULES.goldenSpoon`. In bot tests, rounds last about 29 s with lots of steals.
   - **Party Cup length:** a new **CUP LENGTH** button (L) switches between the full Cup (6 games, now including Golden Spoon) and a short 3-game Cup (Classic → Golden Spoon → Classic final). It is saved on the device (`cupLength()` in `src/cup.ts`).
- Second Helpings chapter 5 (Sugar High) eased: Bloblin is now easy (30% → 41% for the reference bot).
- **Playtest reports** now focus on big structural feedback: `scripts/playtest/sheet-template.md` asks for the single biggest structural problem and 2–3 detailed redesign proposals (rules, flow, numbers, example moment, rewards, risks, size, score impact), with small nits capped at 5 one-liners.

## 63. Round 5 themes: progression, challenge runs, party night, story, onboarding, house rules

1. **Long-term progression** (`src/meta.ts`, saved as `kk-meta-v1`; every number is in `META`, `MASTERY`, `ORDERS` and `SHOP`):
   - 🪙 **Chef Tokens** come from every match: playing, winning, KOs, going KAIJU, Gauntlet waves, Daily medals, orders and mastery levels.
   - **Kaiju Mastery:** XP per kaiju and 6 levels (Rookie → Legend). It shows in each kaiju's Gallery card, and each level pays tokens.
   - 📋 **Weekly Orders:** 3 goals a week from a pool of 10, the same for everyone, paying 40 🪙 each.
   - 🛒 **THE PANTRY** (a new title button, `PantryScene`): the orders with progress bars, plus a shop.
     - 4 colours: Peach, Blueberry, Matcha, Silverware.
     - 🍱 Lunchbox: Gauntlet runs start with a free perk.
     - ❤ Lifeline: Gauntlet runs start with +1 life.
   - 🧾 **Match receipt:** a card on every results screen showing tokens, mastery, orders done, the Daily medal and how you were knocked out, with a tip.
   - Records shows the **Chef Rank** and Chef Tokens, and progress bars on every counter achievement.
   - Story results show the token and mastery lines.
2. **Challenge runs:**
   - The **Gauntlet has courses** (🥗 Starters, 🍖 Mains, 🍰 Desserts, 🍽 Seconds), with a course boss every 4th wave.
   - Odd waves from wave 5 on get a random twist.
   - Bots ramp faster (normal from wave 2, hard from 5, the new **BRUTAL** level in Seconds).
   - Runs end with a score, a **grade** (S–D) and knockouts counted across the whole run.
   - **Daily medals:** 🥉 for playing, 🥈 for winning, 🥇 for winning without dropping a round. Each pays tokens once a day.
   - A new **BRUTAL** bot level (above HARD) appears in BOT LEVEL.
3. **Party and mercy:**
   - **COMEBACK HELP** (Settings, on by default): in Free Play and Party, a kaiju behind on rounds starts the next round with +20 belly per round behind (`RULES.catchUpBelly`).
   - A mercy tip appears after 2 lost matches in a row against bots.
4. **Story:**
   - Defeat cards say **"What beat you"** with a matching tip.
   - Rivals' clear lines react to a 3-star or 1-star win.
   - Dumplord, the final boss, is foreshadowed in chapters 4 and 8.
   - Losing a Dessert course now offers **↻ RETRY** (1 / Enter / click) or the map.
   - Stray keys can't press result or ending buttons for 1.2 s.
5. **Onboarding:**
   - Your first 3 matches default to first-to-3.
   - The first Giant Hand warning aimed at you explains it ("it grabs the fullest belly").
   - KAIJU stomp rings turn **red** when a person is inside, and a shrinking KAIJU shows "💫 DIZZY! HIT IT NOW!".
6. **💾 House Rules** (Free Play and Party setup, `src/houseRules.ts`):
   - 3 save slots for a whole setup (mode, rounds, twist, power-ups, hazards, table, bots, comeback help).
   - **Share codes** (`KK1-…`) to copy, plus an "enter a friend's code" option.
7. **Text always fits** (after reports of overrunning text):
   - Every button shrinks and stacks its label and sub line to fit inside itself (`Button.fit()` in `src/render/ui.ts`).
   - How to Play → MODES flows and shrinks to fit the screen.
   - Locked table hints are capped at 2 lines.
   - Records achievement cards put the progress bar on the title row, and the description shrinks to one line.
   - Pop-ups never cover each other and stay on screen.
   - The knockout feed is spaced out, and the countdown lines sit below the big number.
   - The mode line hides during instant replays, and the KEYS panel hides the House Rules button.
   - **`npm run audit:text`** (`scripts/text-audit.mjs`) visits about 95 screens and states. It flags text off screen, text wider than its box, and text overlapping other text, saving screenshots to `art-src/.audit/` (`ALL=1` saves every screen).

## 64. Round 6 themes: rewards that matter, a challenge ladder, Cup night, boss phases, Kid Mode, Rule Lab

1. **Progression that means something** (`src/meta.ts`):
   - **Mastery rewards** for each kaiju (`MASTERY.rewards`):
     - Lv 2: ✨ dash sparkles
     - Lv 3: ⭐ star on your HUD card
     - Lv 4: 🟡 gold name
     - Lv 5: 🖼 gold Gallery frame
     - Lv 6: 👑 crown aura
     
     The Gallery shows the next reward.
   - **Chef Rank ladder** with thresholds (`RANKS`): Records and the Pantry show "Next: Line Cook at 14 pts".
   - **Achievements pay 30 🪙** each (`ACHIEVEMENT_TOKENS`).
   - **📌 Pin** any locked achievement in Records by clicking it. Its progress then shows on the title (NEXT UP) and on every receipt.
   - **🏷 Daily deal:** one Pantry item is 30% off each day (`dailyDeal`). There are two cheap colours (Toffee 40, Lilac 70).
2. **🍽 First Service** (`FIRST_SERVICE`): a 6-step first-hour checklist on the title, paying 135 🪙 in total.
   - The steps: Practice, a match, KAIJU, Story ch1, a Party Mode, the Pantry.
   - Practice now ends with a proper **end card**: ▶ FIRST MATCH (vs an easy bot), 📖 STORY or ☰ MENU.
3. **Challenge ladder:**
   - The title's **CHALLENGES** card (replacing GAUNTLET) opens a chooser.
   - **Gauntlet checkpoints:** start a run from any course you've reached (Starters / Mains / Desserts / Seconds).
   - **🎯 TRIALS** (`src/trials.ts`, `TrialsScene`): 8 fixed hard fights with ★ / ★★ / ★★★.
     - ★ is a win, ★★ is a win without losing a round, ★★★ adds a knockout goal.
     - Each new star pays 20 🪙.
     - They use double twists, bosses and the BRUTAL bot.
   - **🥋 MOVE LAB** (Gallery, top left): practise any kaiju with a belly that never empties, to learn its KAIJU power. It doesn't count for stats.
4. **⚡⚡ Double twists** (`MUTATOR_COMBOS` in `src/sim/mutators.ts`):
   - The TWIST button cycles the singles, then 8 combos (e.g. ICE RINK + TURBO, MINI KAIJU + BOUNCY CASTLE).
   - The simulation checks twists with `world.tw(id)`.
   - Combos are saved in House Rules (and its codes) and used in Trials. Local play only.
5. **🏆 Party Cup night** (`src/cup.ts`):
   - After each game the screen names that game's winner, then the standings.
   - The **final is worth ×2 points** (`FINAL_MULTIPLIER`), and the countdown says so.
   - The final shows the champion and the **🏆 Cup Shelf** (the last 8 winners on this device), with a **↻ NEW CUP** button.
6. **Story:**
   - **👑 Boss Phase 2:** once a Story boss has lost a round, it comes back each later round faster and shielded from the first hit, with a "PHASE 2!" roar.
   - **🧸 KID MODE** (Settings): Story rivals one level easier (`KID_EASE`), one-line chats and bigger receipt text.
7. **Workshop share codes:** 📋 COPY CODE and 📥 PASTE CODE (`KKT1-…`) to swap tables with friends; then SAVE to keep one.
8. **Settings** rows shrink to fit, so the action buttons stay on screen. The text audit covers the new screens too (Trials, the Challenges chooser, a Trial result, the Cup final, the Move Lab and the Practice end card).

## 65. Layout pass for phone and desktop (after "lots of windows of text overlapping")

- **`npm run audit:text` is now much stricter**, and `TOUCH=1` runs it as a **phone**: a landscape phone-sized screen with touch and the real on-screen controls. It checks:
  - text × text
  - **button × button** (two clickable things stacked)
  - text that half-crosses a button edge
  - text that's off screen or wider than its box
  - **phone controls** (FULL SCREEN, THROW/SWIPE/DASH/STOMP, EMOTE, pills) covering game text or buttons, or each other
  
  Scenes are restarted cleanly and the audit waits until each screen has drawn, so it never checks an empty screen. `ALL=1` saves every screenshot for an eyeball pass, and both modes cover about 103 states.
- **Fixed:**
  - Gallery 🥋 MOVE LAB sat on top of BACK on phones. It now lives in the kaiju panel and only shows for kaiju you own.
  - Story map title under FULL SCREEN on phones.
  - Workshop BACK under FULL SCREEN.
  - In-match FULL SCREEN covering EMOTE and the HUD (it now sits on the right, below PAUSE / MENU / EMOTE).
  - STOMP clipping THROW.
  - Practice checklist under your thumb on phones (it moves to the top-left).
  - The version text under the phone pills.
  - Achievement toasts landing on result titles (they now go on the receipt card).
  - Pop-ups growing or drifting off screen or into the HUD.
  - Emote bubbles going off the top.
  - Team tags crossing the card edge.
  - Long button sub lines (they wrap first, then shrink).
  - The 5-rival Trial line.
  - The "Tough bots?" tip only shows in Free Play / Party.
- **Playtest harness phone mode:** `TOUCH=1 node scripts/playtest/server.mjs <port> <dir>`. `/look` lists `phoneControls`, and `/tap?label=THROW` taps them. There is a new **Phone Player** profile (#11), and the report template asks for an exhaustive issue table plus a "what would make it 9/10" checklist.

## 66. Round 7 fixes (11 testers, about 470 issues logged)
- **Phone:**
  - A keyboard seat on a touch device becomes the touch seat (menu and match), so a phone is never left without controls.
  - Taps on THROW/SWIPE/DASH/STOMP count for 120 ms (`TAP_HOLD` in `src/touch.ts`).
  - Keyboard hints become tap wording on touch, and Challenges / House Rules have ✖ close buttons.
- **Layout:**
  - A dark plate behind round and result text.
  - Result buttons right away, moved clear of the receipt.
  - First Service ticks and achievements go on the receipt.
  - Move Lab banner at the bottom, and Esc leaves the Move Lab.
  - FAST FORWARD hidden during replays.
  - Short double-twist labels (`twistShort`).
  - Help tabs show one highlight.
  - Bigger Gallery counter, and a NEXT UP plate.
  - Shorter shop texts.
  - Chapter-clear card never runs under its buttons.
  - Story star row clear of SCENE.
  - GAUNTLET OVER lines wrap.
  - Button sub lines shrink before they wrap.
  - Help Basics fits above CONTROLS.
- **New player:**
  - A "▼ YOU" marker for the first 4 s of each round.
  - Practice → FIRST MATCH starts a match.
  - Help explains parry, charge lines and the Giant Hand.
- **Story:**
  - Phase 2 shows on the boss's HUD card with a red aura.
  - The chapter 4 boss starts at 70% belly.
  - Kid Mode: a one-sentence big defeat card, and Helping Hand from the first loss.
  - The Spicy rival card shows the tougher level, and "TIP" no longer appears twice.
- **Economy:**
  - The receipt total includes achievement payouts, and rank points are explained.
  - The daily deal is stable when you buy things.
  - The Tacowl unlock says "Grand Feast stars".
- **Party:** the Cup final is first-to-2, "Past champions" shows dates, and "pt/pts" grammar is fixed.
- **Bots:** BRUTAL retuned so it's no longer easier than HARD.
- **Records:** shows Trial stars. "Knocked out by" only shows after a loss.

## 67. The six "gaps to 9" from round 7
1. **Difficulty and fairness:**
   - A new **TOUGH** bot level between NORMAL and HARD (`DIFFICULTIES` in `src/sim/bot.ts`).
   - **Dodge the Giant Hand:** a DASH within 0.4 s of the hand reaching you slips under it (`RULES.handDodge`).
   - Hand knockouts now count for whoever hit you last.
   - **Kid Mode** starts Free Play / Party with EASY bots and makes the Daily's bots easy.
   - The hints teach the dodge.
2. **Depth after the first hours:**
   - **✨ Shiny forms:** each kaiju's golden shimmer costs 300 🪙 and needs Mastery Lv 3 (`SHINY` in `src/meta.ts`). Buy it from the Gallery panel (next to MOVE LAB); it shows in matches. With 20 kaiju that's 6,000 tokens to spend.
   - **In-between grind achievements:** House Favourite (25 wins), Spoon Fed Up (100 KOs), Second Breakfast (400 crumbs).
3. **Party Cup night:**
   - The 🏆 PARTY CUP button is an **ON/OFF switch** (`MenuScene.cupOn`), and PLAY starts the Cup when it is ON.
   - **Quitting a Cup or a Gauntlet run asks twice.**
   - The rules line explains the place points and the ×2 final.
4. **Story:**
   - **📜 STORY LOG** (map, bottom left): every chapter you've cleared, who you beat, what they said, and who's next.
   - Locked **🔒 SECOND HELPINGS** and **🔒 DESSERT** tabs say what opens them.
5. **Tinkering:**
   - The **TWIST** button opens a **picker** with all single twists and ⚡⚡ doubles, each with its blurb (the X key still cycles).
   - The Workshop shows the surface name and a hazard badge on the preview, and has **↶ UNDO**.
   - Setup panels swallow clicks between their buttons.
6. **Phone thumb zone:** in matches on wide phones the table sits at the left edge, so THROW/SWIPE/DASH/STOMP sit in the free space on the right instead of over mats and labels.

## 68. Round 8 fixes
- **Shiny:** the button shows the price and level needed, a second tap confirms, and a "✨ SHINY" badge shows on owned forms.
- **Pantry:** a second tap confirms, and items you can't afford say how many 🪙 are missing.
- **Quit confirm:** it resets on resume and expires after 4 s, the warning is big and yellow, and Cup-standings MENU asks too.
- **Double twists** survive returning to the menu.
- **Kid Mode:** easy bots every time in Free Play, Party and the Daily, shown as EASY in setup.
- **Practice:** SWIPE works without cutlery in Practice (the step can be finished), and the title's Practice button stays until it's done.
- **Giant Hand:** a KAIJU is too big for it to flick.
- **Gentler difficulty:** Story ch3 Mothball is easy, and the Daily bots are normal / easy / easy.
- **Phone:** the TWIST pill opens the picker, and keyboard hints become tap wording on the title, Settings and Story.
- **Layout:**
  - At most 3 pop-ups at once, and pop-ups fade at round end.
  - FAST FORWARD sits below INSTANT REPLAY.
  - The Rewards close button is at the top.
  - Help placeholders are fixed.
  - The trial-loss wording depends on the score.

## 69. Round 8 "do all" polish
- **Fair starts:** bots don't throw, swipe, dash or stomp for the first 1.4 s of each round (`RULES.botGrace`).
- **"Why you lost":** the round-end banner says how and when you went out (e.g. "💥 You went out at 4s: thrown cutlery (BLOBLIN)").
- **🏆 Achievement toasts:** shown top-right after a match, one at a time, and the receipt still lists them. Pantry orders show their 40 🪙 payout.
- **Bot levels explained:** Free Play setup shows what the current BOT LEVEL is like (`BOT_INFO`). The Daily countdown says how many rivals and their levels.
- **Gallery:**
  - Each power shows its reach and cooldown.
  - The full Mastery reward ladder shows ✔/🔒 for every reward plus Shiny.
- **Records:** Party Cups won, a shorter next-rank value, and tighter rows.
- **Party:** Team Feast results are grouped by team. The Cup hint shows the ON state and points to phones-as-controllers (ONLINE → HOST).
- **Story:**
  - Boss Phase 2 gets a big centre banner.
  - Kid Mode gives calm starts (hazards wait) in every Story chapter.
- **Readability:**
  - Trials cards are 2 short lines.
  - The Help twist list is at least 13 px.
  - Title links are 13 px.
  - The setup hint wraps inside the screen.

## 70. The last three pieces
1. **📱 PHONES AS PADS** (Party Modes setup, last button):
   - Opens a room straight away in couch mode with your current mode and Cup setting.
   - Shows a **big QR code**: everyone on the couch scans it with their phone camera and the phone becomes their controller. The host plays on the TV/computer too, and TV mode can still be switched on.
   - The lobby no longer says "You (host) (you)".
2. **🗯 Comic panels:** a funny "after the fight" still shows once after you beat each mid-campaign boss: Norigon (ch4), Bloblin (ch8) and Pengwhip (Second Helpings ch4).
   - The art is generated with Gemini from the real sprites (`scripts/make-comic-jobs.mjs`) and checked for faces and limbs.
   - Captions live in `COMICS` in `src/story/cutscenes.ts`. The two final bosses already have ending cutscenes.
3. **🌱 More to earn for new players** (new saves only: a save that already has stats or Story progress keeps everything, using the `kk-fresh-start` flag):
   - Chocomunch: win a match.
   - Bubblegumbo: play 3 matches.
   - Sloba: clear Story ch2.
   - Avocadrake: win 5 matches.
   - Smoothie Bar: clear Story ch3.
   - Fondue Night: play 8 matches.
   
   Unlocks earned by playing pop up as a "🎁 NEW KAIJU / NEW TABLE" toast after the match. The Gallery, NEXT UP and setup screens show the progress.
- Party setup: PLAY is a little smaller and the hint sits clear of it. The Cup route uses short mode names.

## 71. Round 9 fixes
- **Story Rewards:** the panel switches to 3 columns when there are more than 8 rewards, and CLOSE sits at the top, so every reward fits on a 720 px screen.
- **Quit confirm:** every match except Practice and Move Lab asks "tap again to quit". The prompt resets when you resume and expires after 4 s.
- **Practice:** a step stuck for 30 s is skipped, so Practice always finishes.
- **Chapter Clear card:** the achievement line flows below the unlock line instead of on top of it.
- **SECOND HELPINGS:** the map button turns live ("now open!") as soon as the campaign unlocks.
- **Unlocks:**
  - Listed on the match receipt as well as in toasts.
  - Toasts now last 4 s.
- **Comic panels:** they can't be skipped in their first 2 s.
- **Bots:**
  - They don't STOMP in the first 4 s of a round (`RULES.botStompGrace`).
  - Story ch3 Leftovers is first to 2 rounds.
- **Phone:**
  - The Cup pill shows ON/OFF.
  - The TWIST pill shows the short double-twist name.
  - Party setup has a 📱 PHONES AS PADS pill.
  - The bot-level explainer shows in the info line.
- **Setup:**
  - The bot explainer stays alongside a twist blurb.
  - Kid Mode's bot level reads "EASY 🧸".
  - Perks are labelled "1 · name".
  - The first match uses owned tables.
  - Daily's countdown names its rival levels.
- **HUD:**
  - The YOU marker hides while the STOMP coach shows.
  - Free-for-all text moved to y 168.
  - At most 3 pop-ups, kept below the HUD.
- **Gallery:** mastery rewards are listed in words: "Rewards (Lv 2-6): ✔ sparkles · 🔒 HUD star · … · 🔒 Shiny".
- **Couch lobby:** a smaller QR code (150 px) and a compact panel.
- **Text audit:** now includes the Story Rewards panel.

## 72. Round 9 "gaps to 9" (build all)
- **🦖 KAIJU warning:** a fresh KAIJU spends 0.5 s growing (`RULES.kaijuGrow`).
  - While growing, a pulsing red ring with a filling timer shows where its body will reach.
  - It shoves but can't squash until the ring fills.
  - The "knocked out by squash" tip explains the ring.
- **Fair starts:** bots wait 1.8 s before attacking (`RULES.botGrace`, was 1.4).
- **🏁 Gauntlet ramp:** the first 8 waves are hand-tuned in `OPENING_WAVES` (`src/gauntlet.ts`).
  - Each wave adds at most one bot or one bot level.
  - Boss waves keep the count down.
  - Twists start at wave 7 (was 5).
  - Wave 9+ ramps by formula, including the TOUGH level.
  - A cleared wave previews the next one: rivals, levels, boss and twist.
- **🎟 Chef's Pass** (`src/challengePass.ts`): 12 Trial ★ OR reaching Gauntlet wave 8 gives you:
  - 🌶️ Spicy on any chapter you've reached.
  - The 🍰 Dessert Course before the ending.
  - Progress shows on the Trials screen and in the CHALLENGES chooser.
- **🏆 Party Cup:**
  - Placing is now rounds won, then the mode's own points (crumbs HELD in Crumb Rush, spoon seconds), then KOs.
  - Standings show every player's points per game (G1 +5 · G2 +3 …), a rules line (points table, final ×2, teams) and what the mode places you by.
  - With the Cup ON, Party setup greys out MODE / FIRST TO ("CUP PICKS" / "CUP SETS IT") and the header shows the Cup.
  - The awards say "crumbs eaten".
- **🧸 Kid Mode bigger text:** body text under 16 px grows to at least 16 px (`KID_MIN` in `src/render/fonts.ts`).
  - The text audit has a `KID=1` pass.
- **📖 Gallery:**
  - 🪙 balance in the header.
  - Buying a Shiny shows a big banner and a sparkle burst, and ✨ marks the kaiju's tile.
  - Tapping a locked colour makes its "how to earn it" line jump.
- **🏅 Records:** the footer follows your 📌 pinned achievement.
- **🎓 First-timer fixes:**
  - Your own seat says "👤 YOU" when you're the only human; bot seats say "🤖 Bot".
  - Practice shows the current step with its keys, plus the step after it.
  - Table counts come from one place (`tableCount()`): Help shows "You own N/M tables", and Free Play and the Gallery match.
- **⌨ Quick taps:** a key pressed and released between two frames still counts (`KEY_LATCH` 90 ms in `src/input.ts`).
- **⚡ Twist TRY IT:** in the twist picker, switch on 🧪 TRY IT and tap a twist for 1 quick round against an EASY bot.
- **🛠 Workshop:** picking a prop says what it does (size and cover, or bumper kick), and cycling the hazard explains it (`HAZARD_INFO`, `propInfo` in `src/custom.ts`).
- **📅 Daily:** the countdown and result show the medals still open today, with their 🪙 (🥉 play · 🥈 win · 🥇 win without losing a round).

## 73. Round 10 fixes
The full list is in `playtest-reports/round10/SUMMARY.md` ("Fixed straight after round 10"). Key points:
- **TRY IT** (`GameData.tryout`): holds the menu setup to return to; the match counts for nothing.
- **Gallery:** `build()` resets `shown` and `detail`; the shiny tag is drawn after the reset; `shinyBlock()` in `src/meta.ts`.
- **Receipt:** achievements and unlocks go through `achEarned` + `mergeAch()`, so they land on the right match's receipt.
- **Gauntlet:**
  - `startBest` is carried between waves.
  - `GAUNTLET.bossHeart`.
  - `checkpointWave()` for NEW RUN.
- **Daily:** `TitleScene.dailyCard()` preview.
- **Cup:**
  - MODE and FIRST TO are locked while the Cup is ON.
  - `cupRules(teams)`.
  - No winner art or long receipt between games.
- **Kid Mode:** `KID_MIN` 18.
- **Rules:**
  - `RULES.spawnShield` 1.4.
  - Story ch0–2 calm start.
  - The Hand warns every time.
- **Move Lab:** the dummy is placed close by, and KAIJU is held.
- **Practice:** `touch` wording per step.
- **Records:** `PAGES` and `PER` even paging.
- **Pantry:** `disarm()`.
- **Lobby:** takes `powerups` / `hazards` / `mutator`; a couch room can start with bots.

## 74. Round 10 "gaps to 9" (build all)
- **🥊 Fighter:**
  - KAIJU lasts 7 s (was 6), and the after-daze is 0.5 s (was 0.75).
  - 📊 Your win/loss record against each rival kaiju (`Stats.vs`, solo matches vs bots) shows in its Gallery card.
- **🏁 Challenge Seeker:**
  - Boss waves are the hardest wave of their course (`OPENING_WAVES` 4 and 8).
  - Clearing a boss wave pays +30 🪙 (`GAUNTLET.bossTokens`).
  - 🗓 This week's best wave resets on Mondays; beating it pays +25 🪙 (`weeklyBest` / `saveWeeklyBest`). It shows in CHALLENGES.
  - 🌶️ SPICY DAILY on the Daily card: the same match vs HARD / TOUGH / NORMAL rivals, +40 🪙 once a day (`DAILY.spicyLevels`, `spicyTokens`).
- **📱 Phone / 🧸 Kid / 🎓 First-timer:**
  - Phones get a minimum body text size (`PHONE_MIN` 16 in `src/render/fonts.ts`, about 12.5 css px).
  - Help ▸ BASICS is five picture cards (THROW, SWIPE, DASH, EAT, STOMP), with phone-only controls on phones.
- **📖 Story Fan:**
  - Each Grand Feast chapter has a `meanwhile` line: a running mystery about the quiet one in the steamer, shown on the Chapter Clear card.
  - The Head Chef no longer repeats the chapter tip before every fight (it's on the chapter card).
  - The progress line reads "Chapters 6/12 · 35% of everything".
- **🏆 Collector / Achiever:**
  - The 🎯 GOALS board in Records shows each collection with a bar and its next step, plus the 4 closest achievements with 📌 PIN buttons.
  - The Gallery mastery line has a ▰▰▱ progress bar.
  - "Tables played on" in Records (it was "visited").
- **🎉 Party Host:**
  - Setup shows ⏱ ≈ N min (`estMinutes`, including the whole Cup).
  - Results show crumbs eaten (Crumb Rush) and spoon seconds (Golden Spoon).
  - Team Feast shows "🔴 RED 1 – 0 BLUE 🔵" during play.
- **🛠 Tinkerer:**
  - Workshop props with behaviours (Workshop tables only, so the built-in tables are unchanged):
    - 🥞 PANCAKES: sticky syrup.
    - 🧁 CUPCAKE: bakes crumbs.
    - 🍅 TOMATO: a soft bumper.
    - Gumdrop: the BUMPER.
  - 6 Workshop slots (was 3).
  - ✏ NAME a table.
  - Help ▸ EXTRAS explains every power-up, twist and hazard.

## 75. Round 11 fixes
The full list is in `playtest-reports/round11/SUMMARY.md` ("Fixed straight after round 11"). Key points:
- **Input:** `inputTick()` in `src/input.ts` holds a pressed key for one game update.
- **Panels:** `PanelScene.closeTop()` closes an open overlay on Esc; `afterBuild()` / `init({show})` let the Gallery return to the same kaiju.
- **Bots:**
  - World option `kid` (Kid Mode, or Grand Feast ch1–6) means bots wait `RULES.kidStompGrace` (15 s) before going KAIJU.
  - The first 3 matches ever use `STORY_CALM`.
- **Setup:**
  - `MenuScene.toggleBots()` is the BOT LEVEL picker.
  - `estMinutes` uses per-mode round times.
  - `cupLength()` defaults to short.
- **Stats:** `parries` and `brutalWins` feed the achievements `parry-10` and `brutal-win`.
- **Prices:** `SHINY.cost` is 200.
- **Daily:** `DAILY.rounds` is 2.
- **Gauntlet:** the perk screen gets an END RUN button; the weekly-best payout happens at the end of the run only.

## 76. Outside review (another AI's 10-tester panel) — what was still true, now fixed
These came from an outside review of build 073e404. Some of its points were already fixed by then:
- Story SKIP CHAT (S) checked in a real browser: it goes straight into the match.
- Locked kaiju are already silhouettes in the Gallery.

Built:
- **✋ Giant Hand:** it waits until someone's belly is at least `RULES.handMinBelly` (35) full, or someone is KAIJU. Ties were already random. No more 8-second ambush in a quiet 1v1.
- **😜 Emotes:** no white box; a big emoji with a soft shadow.
- **🍽 Free Play TABLE:** opens a picture grid of your tables plus 🎲 ALL (`MenuScene.toggleTables`). The M key still steps through them.
- **🎯 Trials:** "🐉 YOUR KAIJU" lets you play any trial with your own kaiju (`TrialsScene.pick`, `trialData(id, pick)`).
- **🔗 Online:** the host room has "Copy invite link" (the `?join=CODE` link the QR code already uses).
- **🛠 Workshop:** ◀ SLOT / SLOT ▶, and up to 20 props (`MAX_PROPS`).
- **🔊 Audio:**
  - 10-step volume levels (`LEVELS`).
  - **M** mutes or unmutes sound and music during a match.
- **🎓 Story ch1** (first time through): a step-by-step coach at the bottom of the screen (THROW → SWIPE → EAT → STOMP, `storyCoach`).
- **👑 Story bosses** quip when they go KAIJU or knock you out (`BOSS_QUIPS`).
- **🏁 Gauntlet Over** shows total knockouts and this week's best.
- **📅 Daily card:** "Last 7 days: ✔ ✖ · …" (`weekStrip`; kept on this device, since the game has no server for a global board).

Not done, and why:
- Global Daily leaderboard and public rooms: they need a server; the game is peer-to-peer and offline-first.
- Gamepad remapping: a bigger job, left for later.

## 77. 🎮 Gamepad button remapping
- **Settings ▸ KEYBOARD CONTROLS ▸ 🎮 GAMEPAD** (`PadControlsScene`): pick Throw, Swipe, Dash, Stomp or Emote, then press any button on any pad.
- A button already in use swaps over.
- One layout for every gamepad, saved as `kk-pad-v1` (`PAD_MAP`, `bindPad`, `resetPadBinds` in `src/input.ts`).
- START and the D-pad stay fixed.
- Help ▸ BASICS shows your current gamepad buttons (`padHint`).

## 78. Outside review, round 2 (build 1e60ed0 → the last pieces)
- **Story SKIP CHAT:** S, the label or the last line goes straight into the match. A "🍴 ROUND 1…" card covers the moment before the game starts, so the chapter map never flashes up (`launching`). It already started the match; testers saw the map for one frame.
- **Locked kaiju:** they show their KAIJU power, trait and your record against them (dark silhouette art, as before).
- **Settings:**
  - ⚠ HIGH-CONTRAST HAZARDS (`contrast`): a thick yellow-and-black outline on every hazard warning (`hcRect` / `hcCircle` / `hcPoly` in `src/render/draw.ts`).
  - ⛶ FULL SCREEN button.
  - The footer notes that M mutes in a match.
- **Pantry:** items are tagged 🎨 colour / 🏁 Gauntlet, and the footer says where the other colours come from.
- **Online:** 📶 connection badges on lobby seats (ping/pong with timestamps, `rttOf`, guest `rtt`), refreshed every 2 s.
- **Gauntlet:** 🧼 PURE RUN toggle in CHALLENGES (no Pantry Lifeline / Lunchbox; its own best, `pureBest`). The end screen says PURE RUN.
- **Workshop:**
  - 📍 SPOTS: move the six start spots (`CustomTable.spawns`, `spawnsOf`).
  - ▦ SNAP: a 40-px grid.
  - ⭐ FEATURED: four curated tables to play or remix (`FEATURED` in `src/custom.ts`).
- **Daily:** 📋 COPY MY RESULT puts a result line on the clipboard to compare with friends (a global board needs a server).

Not done: public rooms / quick-match and a global leaderboard (they need a server).

## 79. 📚 Story expansion: the Night Market, side stories and new chapter goals
- **🎯 Chapter goals** (`Chapter.goal`, `GOALS` in `src/story/chapters.ts`): a Story round can be won by more than "last kaiju standing".
  - 🍪 **crumbs:** Crumb Rush.
  - 🥄 **spoon:** Golden Spoon.
  - 🥟 **dumpling:** Hot Dumpling.
  - 🤝 **team:** a bot ALLY on your side (`Rival.ally`, Team Feast teams).
  - ⏱ **survive:** last `surviveFor` seconds on the table. This is a new World option, `survive`: you win the round when the clock runs out, and lose it if you're knocked out.
  - The chapter card shows the goal; allies are tagged 🤝 ALLY.
  - Story wins count an ally's win in team chapters.
- **🌙 THE NIGHT MARKET** (`src/story/night.ts`): an 8-chapter campaign.
  - The Golden Spoon is stolen, and a mustard trail leads to the market.
  - Every chapter uses a different goal.
  - Bosses: 🦉 Tacowl (ch4, with a comic panel) and the Midnight Muncher, 🌭 Hotchog (ch8).
  - "Meanwhile…" lines thread the mystery.
  - Opens after the Grand Feast (or Second Helpings) ending.
  - Saved as `kk-story3-v1`.
- **📕 Side stories** (`src/story/side.ts`): 3 chapters each.
  - Norigon's Revenge.
  - Bloblin on Ice.
  - Mothball and the Light.
  - Pizzaraptor's Rush Hour.
  - Each mixes goals, and each has a hero ally or boss.
  - They open once Grand Feast ch4 is cleared.
- **📚 CAMPAIGNS** button on the Story map (replaces the Second Helpings / Grand Feast switch). It lists every campaign with progress, 🔒 reasons and the side-story heroes, and glows "✨ something new to play" when there's a new one.
- **Achievements:**
  - 🌙 Night Shift: finish the Night Market.
  - 📕 Side Dishes: finish 2 side stories.
- **Art:** new Gemini stills (from the real sprites), each checked for faces and limbs.
  - `night-open`, `night-end`.
  - `comic-night4`.
  - `side-norigon`, `side-bloblin`, `side-mothball`, `side-pizza`.
- **Tests:** every chapter of every campaign is checked (goal fits its mode's player count, team chapters have an ally and enemies, speakers exist), and SURVIVE rounds are tested.

## 80. Outside review round 3 (build 7128e60)
- **🔒 Locked kaiju are real silhouettes everywhere:** Gallery grid, Gallery detail, Story rewards and the campaign picker. `silhouetteKey()` in `src/render/art.ts` makes a dark copy of the art. `setTint` is ignored by Phaser's Canvas renderer, so in some browsers locked kaiju showed in full colour. Locked colour swatches and locked tables now fade (alpha) instead of being tinted.
- **⚡⚡ Double-twist labels** use one chosen word per twist (`TWIST_WORD` in `src/sim/mutators.ts`): "FISTS + ICE", "MIRROR + TURBO", "FRENZY + SNACKS" (they were "ONLY + RINK" and similar).
- **📱 Phones as Pads:** CLOSE ROOM goes back to Party Modes with the same setup, not the title.
- **📺 TV MODE:** the host card hides its ◀ ▶ kaiju arrows while the host only watches.
- **Typo:** "boomerang twist" (Trials ▸ Chef's Table).

## 81. 📚 Story expansion 2: Room Service, the steamer mystery, 4 more side stories, 2 new goals
- **New chapter goals** (`ChapterGoal` in `src/story/chapters.ts`):
  - 👑 **zone** (KING OF THE PLATE): score seconds standing ALONE in a gold circle; a crowd scores nothing. First to `zoneHold` seconds wins the round, otherwise the most after `RULES.zoneTime` (60 s). This is the World option `zone`; bots head for the circle. The HUD shows 👑 seconds, and the circle glows in the scoring kaiju's colour.
  - 🛡 **protect**: a team chapter where your ally (green ring) must stay on the table, or your team loses the round. This is the World option `vip`.
- **🛎 ROOM SERVICE** (`src/story/room.ts`): an 8-chapter 4th campaign in the Grand Hotel, floor by floor.
  - Goals across the chapters: zone, crumbs, protect, survive, zone, protect.
  - Bosses: 🐟 Salmonster at the pool (ch4, with a comic) and a two-boss finale, the Night Manager 🍞 Toastbat with Velvaroo.
  - Opens after the Night Market. Saved as `kk-story4-v1`.
- **🔎 Grand Feast mystery payoff:**
  - Comic scenes after ch6 (eyes in the steamer), ch9 (a shadow tries on a crown) and ch11 (the steamer bursts: it was DUMPLORD).
  - The Story Log has a **🔎 CLUES n/11** view: every "Meanwhile…" clue in order, with ❓ and the chapter that reveals the missing ones. The log itself no longer repeats them.
- **📕 4 more side stories:**
  - Toastbat: Toast of the Town.
  - Squidgeon's Big Day.
  - Velvaroo's Pouch.
  - Tacowl's Night Shift.
  - There are now 8 side stories.
- **Achievements:**
  - 🛎 Five-Star Service: finish Room Service.
  - 📚 Bookworm: finish all 8 side stories.
- **Art:** 10 new Gemini stills, each checked.
  - `room-open`, `room-end`, `comic-room4`.
  - `comic-ch6`, `comic-ch9`, `comic-ch11`.
  - `side-toastbat`, `side-squidgeon`, `side-velvaroo`, `side-tacowl`.
- **Tests:** zone and protect rounds are tested, and the all-campaign chapter check covers the new goals.

## 82. Outside review round 4: links, rotation, new twist, awards, boss sulks
- **🛠 Workshop:**
  - 🔗 LINK copies a `?table=KKT1-…` link. Opening it goes straight to the Workshop with that table loaded into a free slot, ready to PLAY IT or 💾 SAVE. The title screen hands it over via `sessionStorage`.
  - **Tap a placed prop to turn it 90°** (`rot`, quarter turns, drawn rotated in matches too).
  - 🗑 ERASE switches taps to removing props instead.
- **⚡ NEW TWIST** on Free Play / Party results: a rematch with a random single or double twist (not the one just played). Not shown in Story, Cup, Gauntlet, Daily, Trials or online.
- **🏅 New awards:**
  - ⚔ Fork Deflector: most parries.
  - ✋ Giant Hand Survivor: escaped the hand most.
  - 🔥 Comeback Chef: won after being 2+ rounds behind.
  - The award order is shuffled, so each match shows a different mix.
- **👑 Story bosses sulk** when they drop a round ("Lucky shot!", "My crown slipped!"), alongside the existing quips when they go KAIJU or knock you out.
- **🤖 Per-seat bot levels** (already working) are now explained: the BOT LEVEL picker has a "💡 Mix levels" tip, and bot seat cards read "🤖 EASY · tap: this bot's level".

## 83. Every Story rival talks; the Workshop help line matches its tools
- **💬 Mid-match lines for every Story rival**, not only bosses (`storyCoach` in GameScene). Each rival says at most one line per round.
  - When a rival goes KAIJU: "Dinner time!", "Run, champ, run!".
  - After a rival takes a round: "Too slow!", "One-nil to me!".
  - After you take a round: "Beginner's luck!", "I slipped!".
- **Round-end lines play at the next countdown** (`quipNext`, `bossSulk`): pop-ups fade at round end so the banner owns the screen, which also hid last update's boss round-loss quips. Now they're seen.
- **🛠 Workshop:** the help line under the table now says "🔄 tap a placed prop to turn it · 🗑 ERASE removes". It still said "tap a prop to remove it" after tap-to-turn shipped.

## 84. Friend Board, speech bubbles, replay tidy-up
- **👥 Daily Friend Board** (`src/friendBoard.ts`, Daily card ▸ 👥 FRIEND BOARD). It needs no server:
  - Everyone plays the same Daily.
  - 📋 COPY MY RESULT now includes your name (asked once, the same name Online uses).
  - Friends paste each other's lines with 📥 PASTE A FRIEND.
  - The board ranks today's group: a win, then the medal, Spicy, then rounds.
  - Yesterday's lines and junk are refused. It's kept per day on this device; 🗑 CLEAR empties it.
- **💬 Story quips are now speech bubbles** (`speak()`): a cream bubble that follows the kaiju for about 3 s.
  - Pop-ups faded in about 1 s and were capped at 3, so testers missed the quips.
  - The bubbles hide during the Instant Replay.
- **⏪ Instant Replay:** the 🎓 Story ch1 tutorial strip hides while the replay runs (it sat on the KO feed).

## 85. Big expansion, phase 1: three new party modes (incl. co-op)
- **👑 KING OF THE PLATE** (`king`): a gold circle sits on the most open spot of each table.
  - Seconds standing ALONE in it score; a crowd scores nothing.
  - First to 15 s wins the round (or the most after 60 s). Knocked-out kaiju come back.
  - It uses the same zone rules as the Story goal; `World.zone` now covers both.
- **⚽ FOOD FIGHT FOOTBALL** (`football`): RED vs BLUE with a meatball (`World.ball`, `updateBall`).
  - Bump it, SWIPE it (a kick along your aim, harder as KAIJU) or hit it with thrown cutlery.
  - It bounces off edges and props.
  - Into the right-hand goal scores for RED, the left for BLUE, and a goal wins the round. No goal in 75 s: nobody scores.
  - Bots get behind the ball and run it at the goal. Knocked-out kaiju come back.
- **🛡 HORDE (CO-OP)** (`horde`): every person on one team (PEOPLE) against the bots (THE HORDE).
  - Bots respawn; people don't. Last 75 s with anyone standing to win the round.
  - Each round survived, every bot gets one level tougher.
  - Setup adds 3 bots if there are none.
- All three work in Free Play / Party setup (seat tags show RED/BLUE, or 🛡 YOUR TEAM / 🤖 THE HORDE).
  - Team checks now cover every team mode (`TEAM_MODES` in `src/sim/modes.ts`).
  - The mode line shows "⚽ RED 1 – 0 BLUE" or "🛡 WAVE n".
  - Numbers live in `MODE_RULES.king / football / horde`.
- **Tests:** the KING circle and respawn, a FOOTBALL goal for the right team, and HORDE losing when the people fall while bots respawn.
- **Fixes found by the audit:**
  - The party setup screen crashed in HORDE when a seat was empty. Empty seats now get no team tag.
  - The Help → MODES page no longer repeats the twists list, which ran off the screen in Kid Mode and phone mode. It now points to the EXTRAS tab.

## 86. Story scenes check: chapter stills for the Night Market + Room Service, real side-story endings
- **Check:** all 50 Story scenes (openings, chapter scenes, endings, comics, side stories) were played in a browser and screenshotted. Every scene has its still, and its clip where it uses one.
- **Chapter scenes:** 🌙 THE NIGHT MARKET and 🛎 ROOM SERVICE now have a scene before each of their 8 chapters, like the Grand Feast and Second Helpings.
  - These are Gemini stills with a slow zoom and a punny caption.
  - Data: `NIGHT_CUTS` in `src/story/night.ts`, `ROOM_CUTS` in `src/story/room.ts`.
  - Art: `night-c0..7`, `room-c0..7`.
- **Side-story endings:** each 📕 side story ends on its own picture that shows the payoff:
  - Mothball's spoon night-light.
  - Tacowl's "Partner" badge.
  - Velvaroo's cupcake joey.
  - Toastbat's cooking show, and so on.
  - `sideCut()` uses `<still>-end`.
- **Captions:** a caption that wraps to two lines no longer touches its gold heading; the heading moves up to fit.
- **EASY TO CUSTOMISE:**
  - Captions live in the `*_CUTS` arrays.
  - Scene prompts live in `scripts/make-comic-jobs.mjs` (`COMIC_SCENES`).
  - New keys go in the `CUTS` list in `scripts/process-art.mjs`.

## 87. Big expansion, phase 2: four new cutlery types
Each one flies in a new way. They're rare table pickups; `RARE_CHANCE` went from 0.25 to 0.4 so you actually meet them.
- **🥄 Whisk:** curves to the right as it flies (`curve` 1.4 rad/s), so you can bend it round props.
- **🍢 Skewer:** very fast, and flies straight through props (`pierce`); it still stops at the table edge.
- **🍨 Ice Cream Scoop:** lobbed over every kaiju and prop. It lands at the end of its range and SPLATS everyone within 52 px (`lob`). It draws bigger mid-air (`lobLift`).
- **🧀 Cheese Grater:** sprays 3 short shards in a wide fan (`split` 3, `spread` 0.24).
- **Under the hood:**
  - New optional fields on `CutleryDef` (`curve`, `pierce`, `lob`, `spread`) plus a one-line `CUTLERY_NOTE` per kind for Help.
  - Online snapshot kinds are appended, so older clients still work.
  - For now they're drawn as vector shapes; Gemini sprites (`cut-whisk` etc.) come later.
- **Help → CUTLERY:** now a 3-column grid with a picture for every kind.
- **Tests:** a skewer goes through the gravy boat where a fork sticks; a whisk curls; a scoop flies over one kaiju and splats the next; a grater throws 3.
- **EASY TO CUSTOMISE:** all the numbers live in `src/sim/cutlery.ts`.

## 88. Big expansion, phase 5: 🗝 DINNER DUNGEON (roguelike)
**Where:** Title → 🏁 CHALLENGES → 🗝 DINNER DUNGEON. The button shows CONTINUE when a run is saved.

**How a run works:**
- Pick a kaiju and walk three floors: 🥗 STARTER, 🍖 MAIN COURSE, 🍰 DESSERT.
- Each floor is a branching map of 6 columns (`makeFloor`, seeded). You choose the path; the last column is the 👑 BOSS.
- **Rooms:**
  - ⚔ FIGHT: bots, ONE round, ONE life.
  - 💀 ELITE: tougher bots plus a random twist; winning one gives a relic choice.
  - 🎁 PANTRY: pick 1 of 3 relics, or skip for coins.
  - 🛒 SHOP: relics for 45 🪙, or +1 life for 30 🪙.
  - 🍲 SOUP BREAK: +1 life.
  - 👑 BOSS: a boss seat plus a rival.
- Every floor has a pantry in the middle and a soup break or shop just before the boss.

**Lives and coins:**
- You start with ❤ 3 lives (5 at most).
- Losing a room costs a life, and you can pick another path. At 0 lives the run is over.
- Quitting a room, or closing the game mid-fight, counts as losing it.
- Coins come from rooms you win plus every knockout.

**🎒 17 relics:**
- They stack, and are applied to your kaiju at the start of every room (`GameScene.applyRelics`, on a copy of its kit).
- Traits: speed, throw speed, dash cooldown, weight, grip, reach.
- Start-of-room boosts: belly, shield, ghost, hot feet, sugar rush.
- Start holding a Skewer, Scoop or Whisk.
- Economy: Piggy Bank, Crumb Magnet, Doggy Bag (heals a life after each boss).

**Saving and rewards:**
- The run saves after every room (`kk-dungeon-v1`).
- When it ends it pays 🪙 tokens: 40 per floor reached, +5 per room won, +200 for clearing.
- It keeps your best (`kk-dungeon-best`).

**Code:**
- `src/dungeon.ts`: rules, map, relics, save. It has no Phaser, so it's unit-tested in `tests/dungeon.test.ts`.
- `src/scenes/DungeonScene.ts`: the map, pantry, shop and end screens.
- `GameData.dungeon`: GameScene runs one-life rooms and comes back to the map by itself.

**EASY TO CUSTOMISE:** `DUNGEON` (floors, lives, coins, prices, bot levels per floor) and `RELICS`.

## 89. Big expansion, phase 6: 🏅 SEASONS & RANKED
**Where:** Title → 🏁 CHALLENGES → 🏅 RANKED, which opens the SEASON & RANKED screen.

**Seasons:**
- A season is one calendar month (device clock).
- Each month has a theme name, e.g. 🍂 GRAVY TRAIN in November (`THEMES`).

**🎟 Season track:**
- Every finished match earns season XP: +10 play, +20 win, +2 per KO, +15 extra in Ranked.
- 20 tiers of 100 XP. Each tier pays 30 🪙 once, and every 5th tier pays 100 🪙.
- The receipt shows a line for it.

**🏅 Ranked:**
- You against 3 bots, best of 3, on a random table you own.
- The ladder: 🥉 BRONZE SPOON → 🥈 SILVER SPOON → 🥇 GOLD SPOON → 🍽 PLATINUM PLATE → 💎 DIAMOND DISH → 👑 MASTER CHEF (0 / 100 / 250 / 450 / 700 / 1000 RP).
- Your rank sets the bots' levels, from easy + normal up to hard + brutal.
- RP: win +25 (+40 in your first 3 placement games, plus up to +15 for a streak); lose −15 (nothing to lose at the very bottom).
- The results screen shows RANKED WIN / LOSS with the RP change and ⬆ PROMOTED. ▶ NEXT RANKED queues another; MENU goes back to the Season screen.

**New season:**
- It starts from half your RP.
- It pays a bonus for the best rank you reached (50 to 500 🪙).
- It adds the old season to your history.
- The Season screen shows "Last season you reached …" once.

**Code:**
- `src/seasons.ts`: no Phaser; tested in `tests/seasons.test.ts`. Saved under `kk-season-v1`.
- `src/scenes/SeasonScene.ts`: the screen.
- `GameData.ranked`.

**EASY TO CUSTOMISE:** `SEASON` (XP, tiers, rewards, RP), `RANKS` (names, thresholds, bot levels, season bonus) and `THEMES`.

## 90. Big expansion, phase 3: four new kaiju (24 in all)
You chose these from 32 Gemini concepts (sheets in `art-src/new-kaiju-options{,-2,-3}.png`).

| Kaiju | KAIJU power | Trait | Unlock |
|---|---|---|---|
| 🐝 **HONEYBUZZ** (honey bee) | *Honey Glaze*: a big sticky honey puddle in front of it (`pz-honey`) | buzzes a bit faster | reach floor 2 of the 🗝 Dinner Dungeon |
| 🥯 **BAGELBEAGLE** (bagel puppy) | *Zoomies*: a long wild sprint that flattens anyone in the way | shorter dash cooldown | 24 Grand Feast stars |
| 🍨 **SCOOPOTAMUS** (ice-cream hippo) | *Belly Flop*: hops forward and lands with a huge splat | heavy | reach 🥈 SILVER SPOON in 🏅 Ranked |
| 🍑 **PEACHICK** (peach chick) | *Peach Pit*: spits its stone, which dazes the first rival it hits (`pw-pit`) | light and quick | 15 stars |

**Details:**
- Every power reuses an existing power type (zone, charge, blink, shot), so there's no new physics.
- New unlock kinds: `{ dungeon: floors }` and `{ rank: RP }` (`bestRp()` in seasons.ts).
- Player colours were picked to pass the colour-distance test against all 24: violet, blue, magenta-pink, green.
- Each has its own voice.
- The Gallery is now 12 per row, with "An ice-cream hippo" grammar.
- Hat positions are in `heads.json` (hats are switched off, `HATS_ENABLED = false`); `scripts/hat-sheet.mjs` now covers every kaiju.
- `dungeonBest()` no longer throws when storage is blocked.

**Art (all Gemini):**
- Standard and KAIJU-mode sprites for all four. Bagelbeagle is your original pick, with its nose. Scoopotamus is your pick with the nostrils removed. Peachick had its white sticker border removed.
- Sprites for whisk, skewer, scoop and grater (they replace the vector drawings).
- The last 7 Story still redos: Night Market ch5, Room Service ch1 (now Sloba asleep in the hotel queue; Crabbage kept growing extra claws) and ch4, plus the Norigon, Bloblin, Toastbat and Tacowl endings.

## 91. Big expansion, phase 4: eight new tables (26 in all)
You picked all eight from the concept sheet (`art-src/new-table-options.png`). Each re-uses an existing hazard with its own look, so the rules stay familiar but every table feels new.

| # | Table | Hazard (re-skinned) | Unlock |
|---|---|---|---|
| 18 | 🚚 **Food Truck** | the serving HATCH slams down (cleaver → `ob-hatch`) | free |
| 19 | 🍣 **Sushi Boat** | a blue water channel across the middle carries you along (belt, water palette) + the Giant Hand | free |
| 20 | 🥐 **Bakery Oven** | hot air blasts out of the oven, always towards the far edge (wind, `windDir: 0`) | 18 stars |
| 21 | 🫖 **Tea Party** | a giant spinning CAKE STAND (turntable → `ob-cakestand`) + the Giant Hand | free |
| 22 | 🔥 **BBQ Grill** | flare-up hot spots (burners) | free |
| 23 | 🍜 **Noodle Shop** | the giant RAMEN BOWL whirlpool slurps everyone in (blender → `ob-ramenbowl`) | reach DESSERT in the 🗝 Dinner Dungeon |
| 24 | 🍿 **Cinema Snack Bar** | popcorn machines fire hot popcorn (toaster → `ob-kernel`) | 27 stars |
| 25 | 🍫 **Chocolate Fountain** | melted chocolate splats down, leaving sticky puddles (cheese drops, chocolate palette) | reach 🥇 GOLD SPOON in 🏅 Ranked |

**New:**
- `Layout.skins` swaps a shared hazard's art per table. `ArtRenderer.sk()` falls back to the normal art if a skin isn't drawn yet.
- `Layout.palette` holds colours for the hazards drawn in code (cheese, belt).
- `Layout.windDir` fixes the wind's direction.
- 15 new props: napkin box, food boat, oven, bread tray, macarons, sausage, corn, chopstick jar, popcorn machine, popcorn tub, soda cup, candy box, chocolate fountain, marshmallows, wafers.
- Each table has its own surface and place mat (Gemini art), plus vector fallback colours.

**Screens that had to grow:**
- Help → TABLES switches to 4 columns once there are more than 18 tables.
- The PICK A TABLE grid sizes itself to the list. It used to hide anything past 24.

**Test:** the Bakery Oven wind always blows to the right.

**EASY TO CUSTOMISE:** each table is one entry at the end of `LAYOUTS` in `src/sim/layouts.ts`.

## 92. Outside review round 5: paste box, tutorial strip, Workshop MIRROR, Online NEW TWIST + ready ticks
- **👥 Friend Board 📥 PASTE A FRIEND:**
  - It reads the clipboard first. If that's blocked or empty (iOS Safari, installed apps), an in-page paste box opens (`src/pasteBox.ts`: a textarea over the game, Enter or ➕ ADD, Esc or CANCEL).
  - The board shows a status line: "✅ Added Sam: WON 🥇 · best 3", or why the line wasn't added. No more `window.prompt` / `alert`.
- **🎓 Story ch. 1 tutorial strip:** now hidden during the round-end and match-end banners too, not just the ⏪ replay, so it never pops back over the fading KO line.
- **↔ MIRROR in the Table Workshop:**
  - Every prop you place gets a twin mirrored across the centre line, if there's room. Erasing a prop removes its twin.
  - All Workshop toggles (SPOTS, SNAP, ERASE, MIRROR) now start OFF on every visit, matching their buttons.
- **🌐 Online ⚡ NEW TWIST:** the host gets the NEW TWIST rematch. Both twists are now sent to friends (`start.mutator2`).
- **🌐 Online ✓ ready ticks:**
  - Each friend's phone sends `{ t: 'ready' }` once its results screen is up.
  - The host's results screen shows "READY: ✓ Sam  … Bo".
  - Ticks reset when the next match or Cup game starts.
  - Covered by `npm run smoke:online`.
- **💬 Mid-match Story quips** (suggested again): already in from §83/§84. Rivals and bosses speak when they go KAIJU, and on round results at the next countdown (round-end pop-ups fade before they can be read).
- **Also fixed:**
  - The 🎁 STORY REWARDS grid grows with the list (4 columns and a wider panel past 15 rewards). The new kaiju and table unlocks had pushed cards off the bottom.
  - The Party Cup final keeps its match receipt short (2 lines in Kid Mode, 4 otherwise) so it never touches the standings.

## 93. Outside review round 6: no clipboard popup, Workshop mirror guide
- **📥 PASTE A FRIEND:** opens the in-page paste box straight away. It no longer calls `clipboard.readText()`, so Chrome never asks "wants to see text copied to the clipboard". You paste with Ctrl+V or long-press → Paste.
  - A wrong line is explained inside the box ("That isn't a 📋 COPY MY RESULT line…" or "That result is from 2026-11-21, not today's Daily") and the box stays open.
  - A good line closes it, and the board shows "✅ Added Sam…". `pasteBox()` takes an optional `check()`.
- **↔ MIRROR guide:** with MIRROR on, the Workshop table shows a dashed purple centre line, plus a faint band 30 px either side (`MIRROR_CENTRE`).
  - A tap inside the band places ONE prop exactly on the line instead of two overlapping twins.
- **Online ⚡ NEW TWIST + ✓ READY:** suggested again, but already live since §92 (e57a731). It's on the host's results screen online and checked by `npm run smoke:online`.
