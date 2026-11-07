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
