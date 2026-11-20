# Playtest round 11: 11 Sonnet agents (2026-11-20), after the round 10 "gaps to 9" build (FEATURES §74)

Earlier rounds are in `round1/` to `round10/`. Release bar: every profile at **9.0 or higher**.

| Profile | R9 | R10 | R11 |
|---|---|---|---|
| QA Tester | 7 | 7 | **8.0** |
| Challenge Seeker | 6.5 | 7 | **7.6** |
| First-Timer | 7.5 | 7.5 | 7.6 |
| Story Fan | 7 | 7.5 | 7.5 |
| Kid | 7.5 | 7 | **7.5** |
| Collector | 7.5 | 7 | **7.4** |
| Tinkerer | 7 | 7 | 7.3 |
| Phone Player | 7.5 | 7 | 7.3 |
| Fighter | 6.5 | 6.5 | **7.0** |
| Party Host | 6.5 | 7 | 7.0 |
| Achiever | 7 | 7.5 | 7.0 |
| **Average** | **≈7.05** | **≈7.1** | **≈7.4** |

This is the biggest jump in five rounds. 9 of 11 profiles went up or held, and QA reached 8. There were 0 blockers and no JavaScript errors.

## What worked
The testers praised:
- The Gauntlet boss waves, checkpoints and perks ("the best challenge loop yet").
- The Daily preview card and Spicy Daily.
- Records ▸ GOALS with pins.
- The "Meanwhile…" lines.
- The Help BASICS cards.
- The Team Feast live score.
- 📊 "You vs it".
- The KAIJU seconds on the HUD.
- The Move Lab.
- TRY IT working as a free warm-up.

## Fixed straight after round 11 (FEATURES §75)
- **Keys and buttons:**
  - Esc closes the GOALS panel first.
  - Quick key taps are kept until the next game update (`inputTick`), so even a frozen or slow frame can't lose a SWIPE.
  - Workshop PLAY IT returns to the Workshop and no longer sets the Free Play table.
- **Layout:**
  - The Pantry FIRST SERVICE banner sits under the title on a dark plate (all 11 testers saw it covering the cards).
  - The Gallery detail panel shrinks text further to fit.
  - The 6-player HUD is no longer clipped.
  - The Online room fits its panel.
  - The Cup hides the RED/BLUE seat tags.
- **🌱 First matches:**
  - Your first 3 matches start calm (hazards wait).
  - Setup says "Win 3 rounds to win the match", and so does the Help goal line.
  - After a Free Play match the button says ☰ SETUP.
- **🦖 Fighting:**
  - A "🦖 STOMP!" prompt shows whenever your belly is full.
  - New achievements: ⚔ Swatter (10 parries) and 💀 Bot Breaker (beat a BRUTAL bot).
  - Back from the Move Lab, the Gallery shows the same kaiju.
- **🧸 Kid / 📖 Story:**
  - Bots don't go KAIJU in the first 15 s in Kid Mode and in Grand Feast ch1–6.
  - The Meanwhile line shows in Kid Mode and in the Story Log.
  - The defeat advice comes first.
  - The NEW KAIJU reveal is opaque.
  - The defeat card says how many rounds you took.
- **📱 Phone:**
  - The Gauntlet perk screen hides the receipt and has ☰ END RUN (tap twice).
  - Practice wording on phones.
  - BIG TOUCH BUTTONS default ON on touch screens.
  - Pause clears in-match call-outs.
- **🎉 Host:**
  - The Cup defaults to the short 3-game Cup.
  - The ⏱ estimate uses each mode's real round time.
  - Name tags and P-numbers switch on with 3+ humans.
  - The couch room wording no longer contradicts START, and bots fill to 6.
- **🏆 Achiever / Collector:**
  - BOT LEVEL opens a picker (any level, explained).
  - The "set bots to EASY" tip only shows when they aren't.
  - Shiny costs 200 🪙.
  - Clearer Shiny button text.
  - The Shiny banner no longer covers the tiles.
  - Unlocked kaiju don't show their old requirement.
  - "PAGE 1/3 · NEXT ▶".
- **🏁 Challenger:**
  - The weekly best pays once, when the run ends (it paid on every lost life).
  - No winner art over the perk cards.
  - The Daily is first to 2.

## Still between us and 9 (the top asks)
1. **Challenge Seeker:**
   - A long Gauntlet tail (BRUTAL from wave 10, endless Seconds with a twist per wave).
   - Trial cards with best / attempts / next-star hints and star milestones.
   - A scored Daily.
2. **Fighter:**
   - Telegraphed bot attacks on HARD.
   - Parry and dodge drills.
   - Real cutlery and power numbers.
   - Pick your kaiju in Trials.
3. **Achiever:**
   - A per-match progress delta and ETAs on goals.
   - A better /autoplay or a "Rookie" tier that counts.
4. **Collector:**
   - Locked colours that show their source (🏆/🛒/⭐) and progress.
   - An alternate unlock for the ch4-gated kaiju and table.
   - A table gallery.
5. **Story Fan:**
   - A mid-campaign mystery payoff (ch6/ch9 silhouette cutscene).
   - A clue tracker.
6. **Party Host:**
   - Timed modes with fixed rounds (SHORT / STANDARD / LONG).
   - Resume Cup.
   - Hot Dumpling about passing.
   - House Rules labels listing every pill.
7. **Tinkerer:**
   - Free twist combining with sliders.
   - Workshop TEST, rotate / resize / drag.
   - A Settings depth pass (sections, shake slider, colour-blind palette).
8. **Phone / Kid:**
   - Picture tiles for EXTRAS, GOALS and the receipt.
   - Bigger title top buttons.
   - A persistent "you" ring.
