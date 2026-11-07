# New features log

Everything added in the "keep building" session, newest last. Nothing existing was removed.
Each section says **where to customise it**.

## 1. Party modes (Team Feast, Crumb Rush, Hot Dumpling)

- **Where:** Title screen → **PARTY MODES** card (was the disabled "More modes" card), or Free Play → **[G] mode** (touch: **MODE** pill).
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
