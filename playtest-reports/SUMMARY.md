# Playtest round 10: 11 Sonnet agents (2026-11-19), after the "gaps to 9" build (FEATURES §72)

Earlier rounds are in `round1/` to `round9/`. Release bar: every profile at **9.0 or higher**.

| Profile | R8 | R9 | R10 |
|---|---|---|---|
| Achiever | 6.5 | 7 | **7.5** |
| Story Fan | 6.5 | 7 | **7.5** |
| First-Timer | 7 | 7.5 | 7.5 |
| Party Host | 7 | 6.5 | **7** |
| Tinkerer | 7 | 7 | 7 |
| Kid | 7 | 7.5 | 7 |
| QA Tester | 7 | 7 | 7 |
| Fighter | 6.5 | 6.5 | 6.5 |
| Collector | 6.5 | 7.5 | 7 |
| Challenge Seeker | 6.5 | 6.5 | **7** |
| Phone Player | 7.5 | 7.5 | 7 |
| **Average** | **6.8** | **≈7.05** | **≈7.1** |

There were 0 blockers and no JavaScript errors in any session.

## What worked
- The KAIJU warning ring is readable.
- The Gauntlet ramp and next-wave preview are good.
- Chef's Pass is clear.
- The Records pin and the Gallery colour hints are great.
- The Cup is "strong" for the Party Host.

## Fixed straight after round 10 (FEATURES §73)
- **🧪 TRY IT:** returns to your exact setup, and doesn't pay rewards or count for stats (it was leaking EASY bots, the table, the twist and emptied seats, and paying ~79 🪙).
- **📖 Gallery:**
  - The detail panel no longer comes back blank after visiting a match or the Pantry (stale state on a reused scene).
  - The ✨ SHINY tag on the detail panel now shows (it was destroyed as soon as it was drawn).
  - SHINY says why it can't be bought before asking to confirm.
- **🏆 Achievements and unlocks:** every one earned in a match is now on the receipt (they were added before that match's receipt existed, so most were lost).
- **🛒 Pantry:**
  - The first visit's hidden +25 🪙 FIRST SERVICE reward is now announced (this was every "coin mismatch" report).
  - Only one item asks "tap again" at a time.
- **🏆 Party Cup:**
  - With the Cup ON, MODE and FIRST TO are locked, and the subtitle and info line match.
  - Standings get the room: no winner art between games, a one-line receipt, and a shorter rules line (the teams note only in Team Feast).
- **📱 Phones as Pads lobby:** keeps Power-ups, Hazards and the twist, and a couch room can start with bots only.
- **🏁 Gauntlet:**
  - NEW BEST only shows for a real best (the run's starting best was dropped between waves).
  - ❤ +1 life for each boss wave cleared.
  - NEW RUN starts at your furthest checkpoint.
- **📅 Daily:** opens a preview card first (mode, rivals, table, medals, streak) with START / BACK.
- **Fairness:**
  - The Giant Hand warns you EVERY time it targets you ("STOMP NOW!" when full).
  - Story ch3 gets the calm start.
  - The spawn shield is 1.4 s (was 1.0).
  - The HUD shows KAIJU seconds left.
- **🥋 Move Lab:** the dummy starts close by, and KAIJU never runs out.
- **🎓 Practice:**
  - Going KAIJU in Practice ticks FIRST SERVICE's step.
  - Phone wording instead of keys.
  - No ghost step call-outs behind the complete card.
- **🧸 Kid Mode:**
  - Small body text grows to at least 18 px.
  - Settings redraws as soon as Kid Mode is switched on.
- **Smaller fixes:**
  - Help > Tables no longer overflows when you have Workshop tables.
  - Table counts match ("ALL 13 + 1 WORKSHOP · 5 more to unlock").
  - Records pages are even ("PAGE 1/3").
  - The quit warning sits clear of the pause menu.
  - The Team Feast setup tag no longer covers the kaiju.
  - "1 crumb".
  - Table Maker needs a prop.
  - The unlock source is shown correctly.
  - Reward card names fit.

## Still between us and 9 (the top asks)
1. **Fighter:**
   - Longer, more readable HARD rounds.
   - KAIJU as a real decision (duration, less daze punish).
   - A death replay or matchup stats learning loop.
2. **Challenge Seeker:**
   - Boss waves that feel like bosses.
   - A weekly Gauntlet seed or ladder with rewards for a new best.
   - A harder Daily tier.
3. **Kid / Phone / First-Timer:**
   - Help as picture cards instead of a text wall.
   - Phone-safe minimum text (~14 css px) across the secondary text.
   - Bigger Gallery colour dots and Workshop tap targets.
4. **Story Fan:**
   - The chapter tip shown once (not three times).
   - More story between fights, with bosses as events.
   - An honest progress % label.
5. **Collector / Achiever:**
   - A collection or goal tracker ("path to 100%", the 3 closest goals with jump buttons).
   - Mastery bars.
   - Lock autoplay to one kaiju.
6. **Party Host:**
   - Predictable party length (first-to scaled by player count, a "≈ N min" estimate).
   - Mode-specific results (crumbs and spoon seconds), and a team scoreboard in play.
7. **Tinkerer:**
   - Workshop props with different behaviours (sticky, spawner, bounce).
   - More Workshop slots and renaming.
   - Help for power-ups, hazards and twists.
