# Playtest evaluation — The Party Host (round 11, port 7106)

**Fun score: 7.0 / 10** — The party modes are varied and the chaos reads well with 6 kaiju, but a game-night host is let down by match lengths that are 50-100% longer than the "≈ N min" on setup, a Party Cup that is a 20+ minute commitment, a weak "who is who" display for 6 couch players, and rough edges in the Phones-as-Pads room and house-rules save.

> Bar is 9/10 from every profile. Everything below is from real play through the harness on 2026-11-20 (build v2026-11-19-b0dd6be). `/errors` was `none` at the start, middle and end.

## What I did
About 100 harness commands. Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r11-7106\` (shot-1 … shot-45).
- Title screen, then PARTY MODES setup (empty state, joining, adding bots, all 11 option pills, KEYS overlay, HOUSE RULES overlay).
- **Team Feast**, 6 kaiju (me + 5 bots): played a full match, won 3-2 on rounds (4 rounds, about 3 min). Results screen and receipt read.
- **Crumb Rush**, 6 kaiju: I played the first rounds by hand (eating crumbs, I got KO'd constantly), then a bot played the rest. The match ran 9 rounds, well over 7 minutes of game time. Won by DUMPLORD.
- **Hot Dumpling**, 6 kaiju: played 2 rounds by hand, then bot. Full match finished (SALMONSTER won 3 rounds).
- **Golden Spoon**, 6 kaiju: played into round 8 (still not finished) and used the pause menu (RESUME / RESTART / MUSIC / SOUND / QUIT, QUIT needs a second tap). I quit out at round 8.
- **Party Cup**: switched it on, toggled CUP LENGTH 6 / 3 games, started through the Phones-as-Pads room (bots only), played Game 1/6 Classic, and read the standings and "Next: CRUMB RUSH" card.
- **Phones as Pads / Online lobby**: opened the host room twice (code + QR), saw "bots fill up to N players", started with bots only, then PLAY ONLINE / JOIN A GAME screens.
- HELP (BASICS, MODES, EXTRAS tabs), RECORDS (stats + GOALS card), DAILY preview card (incl. 🌶️ SPICY), SETTINGS, PANTRY (first-visit toast), HOUSE RULES slot save.
- Totals: about 5 full or near-full matches, 1 Cup game. Not visited: Story, Gauntlet, Trials, Gallery, Workshop.

## What worked for me
- **Setup screen is fast to understand.** Click a seat to join, click an empty seat to add a bot, one big ▶ PLAY. Going from nothing to a 6-kaiju Team Feast took 3 clicks plus PLAY.
- **Team Feast is the best party mode.** Red/Blue seat colours, a live "🔴 RED 0 – 0 BLUE 🔵" line, and a clear "TEAM RED RULES THE TABLE" result. Easy to explain in one sentence.
- **Party Cup standings card is excellent** (shot-31): points per place, "+5 / +3 / +2 / +1", "ties share the better place · final ×2", and "Next: CRUMB RUSH". A host can run a tournament off this alone.
- **The Cup now locks MODE and FIRST TO** (shot-28: "MODE CUP PICKS", "FIRST TO CUP SETS IT"). This round-10 fix works and is clear.
- **HOUSE RULES** (3 slots, copy as code, enter a friend's code) is a genuinely host-friendly feature.
- **KEYS overlay** (shot-41) lists every setup hotkey (G/C/2/M/R/U/H/X/Z/1) and all three control schemes. Great for a couch.
- **Pause menu** is simple and the double-tap QUIT confirm ("⚠ Tap QUIT again to leave this match") prevented an accidental quit.
- **Per-mode HUD lines are readable at a glance**: "⏱ 42", "🥟 SALMONSTER HAS THE HOT DUMPLING", "⏱ 49 · 🥄 GRAB THE GOLDEN SPOON!", and per-kaiju "🥄 1/15s" in the top bar.
- **Records ▸ GOALS** (shot-38) is a clean "path to 100%" card with next steps and 📌 PIN. Party-flavoured goals such as "Dumpling Dodger 5/10" make party play feel counted.
- **Daily preview card** (shot-39) is clear: rivals, table, medals, streak, plus the SPICY button with its +40 🪙.
- **Chef Token receipt after every match**, plus a first-time "🎁 NEW KAIJU: Chocomunch / Bubblegumbo" reveal, rewards playing the party modes.
- Online screens (shot-32, shot-33) are plain and clear.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make match length honest and shorter for party modes.**
   - **what:** The setup line "⏱ ≈ 6 min" for Crumb Rush, Hot Dumpling and Golden Spoon (First to 3) was wrong. Crumb Rush with 6 kaiju ran 9 rounds of a 45 s timer (~8+ min), and Golden Spoon was still going in round 8 at 60 s a round (~8+ min). Cup is shown as "≈ 20 min" and would really be 40-50 min.
   - **where:** Party Modes setup, plus Daily card, plus the Cup.
   - **how:** Timed modes (Crumb Rush, Golden Spoon) should be a fixed number of rounds (best of 3, i.e. play 3 rounds and rank by total score) rather than "first to 3 round wins", because with 6 players a 3-win target needs many rounds. Show a real estimate computed from rounds × round length (+10 s per round of countdown and results). Add a "SHORT / STANDARD / LONG" length pill (1 / 3 / 5 rounds).
   - **score impact:** +0.6
2. **Make "who am I" obvious with 6 on one screen.**
   - **what:** NAME TAGS and PLAYER NUMBERS are OFF by default, so a 6-person couch sees six similar-sized sprites that differ only by a coloured ring. In shot-9 and shot-18 I could find myself only by the "▼ YOU" arrow (which appears at the countdown only).
   - **where:** All local multiplayer matches.
   - **how:** Auto-enable a small P1-P6 badge and name tag whenever 3+ humans are joined (setup can tell). Keep the OFF default for solo vs bots.
   - **score impact:** +0.4
3. **Phones-as-Pads room polish.**
   - **what:** The room panel's last line is cut off by the panel edge ("Press LJSD / ... Close the ..." in shot-29, shot-43, shot-44); a "Waiting for at least one friend to join..." line sits right above a "Start (bots fill the seats)" button and contradicts it; the room shows "Mode: Golden Spoon" or "Mode: Team Feast" while Party Cup is ON, but the Cup actually started at CLASSIC; "Bots fill up to 4 players" is the default although Party Modes supports 6 (I had to tap it to get 6); closing and reopening gave a new code with no warning.
   - **where:** 📱 PHONES AS PADS / ONLINE host room.
   - **how:** Fix the clipped line (scroll or taller panel). Replace the waiting line with "Optional: friends can join with the code; or start now with bots." When Cup is ON, show "Mode: CUP (Classic first)" and grey out MODE and FIRST TO like Party Modes does. Default the bot fill to the number of seats the mode supports (6).
   - **score impact:** +0.4
4. **Make Hot Dumpling feel like Hot Dumpling.**
   - **what:** In Hot Dumpling, normal brawling still dominates: KAIJU forms, cutlery, KOs (4-7 KOs per match) and falls decide it. The results screen shows generic stats ("Most KOs", "Crumb Monster", "Kaiju Lover") and nothing about dumplings. The hot-potato fun (pass it, panic, pop) is buried.
   - **where:** Hot Dumpling mode, results.
   - **how:** In this mode turn off KAIJU stomp and make cutlery stun (not KO) so the whole round is about passing. Add result lines like "🥟 Hot Potato: GOBZILLA held it 14 s" and "💥 Popped on: SQUIDGEON". Keep it to ~30 s per round.
   - **score impact:** +0.4
5. **Party Cup should be playable in one evening and resumable.**
   - **what:** 6 games × 5-8 min is a 40+ min commitment with no save. Menu during the Cup, and pressing Esc, took me out of the Cup (clicking ☰ MENU on the standings card did not clearly confirm).
   - **where:** Party Cup, standings card, setup.
   - **how:** Default Cup to 3 games (≈ 12 min) and label the 6-game version "GRAND CUP". Short fixed rounds inside the Cup (Crumb Rush 30 s × 2, etc.). ☰ MENU on the Cup standings should ask "Leave the Cup? (progress is saved - RESUME CUP on the Party card)" and the Party Modes screen should show "▶ RESUME CUP (game 2/6)".
   - **score impact:** +0.4
6. **Fix the Party setup's stale and misleading info.**
   - **what:** With the Cup ON and no seats joined, the seat cards still say RED TEAM / BLUE TEAM (shot-41), and the time line says "⏱ ≈ 6 min" (the Cup said ≈ 20 min with players present). The header "Red vs Blue ... RED 3 vs BLUE 3" sits on screen as a seat count, which reads like a score. Seat layout also resets to empty each time you return to Party Modes.
   - **where:** Party Modes setup.
   - **how:** Only show team colours in Team Feast. Recompute ⏱ whenever Cup/length/mode changes (including with 0 players). Word the header "3 players per team". Remember the last roster for "REMATCH" and "back to setup".
   - **score impact:** +0.3
7. **House Rules should save everything the host set.**
   - **what:** Slot 1 saved as "PARTY · teams · first to 3 · normal bots" while Party Cup was ON with 6 games. It silently dropped the Cup, the cup length, hazards, power-ups, twist and table.
   - **where:** 💾 HOUSE RULES.
   - **how:** Slot label must list every non-default pill (e.g. "CUP 3 · hard bots · no hazards · Ice Rink"). Loading it must restore all 11 pills.
   - **score impact:** +0.3
8. **Party results need a "story of the night" screen.**
   - **what:** Results show a score list, but a group wants a laugh. Team Feast's result shows per-player rounds and KOs but not the final score "RED 3 – 2 BLUE"; Crumb Rush's winner had fewer crumbs eaten than another player and nothing explains the points rule; the spoon-seconds item from the brief was only in the per-player HUD, not on the results card.
   - **where:** All party results.
   - **how:** One consistent card: big winner banner, final score line, one award per player ("Most dramatic fall", "Spoon thief"), and the mode's own stat (crumbs, spoon seconds, dumpling seconds).
   - **score impact:** +0.3
9. **Make Help's EXTRAS tab pictures, not a text wall.**
   - **what:** EXTRAS is all small 14 px text with a big empty gap between Power-ups and Hazards (shot-36), and the Twists list is duplicated on the MODES tab (shot-35, 13 px).
   - **where:** Help ▸ EXTRAS and MODES.
   - **how:** Same picture cards as BASICS: one card per power-up/hazard with its icon; delete the Twists block from MODES and link to EXTRAS.
   - **score impact:** +0.2
10. **Bigger readable "you are the ___" in-match banners for a couch (3 m away).**
    - **what:** Top-bar names and the "🥟 X HAS THE HOT DUMPLING" line are about 20 px, and the Team Feast live score line is only visible between replays.
    - **where:** In-match HUD, all party modes.
    - **how:** Add a "TV size" HUD option for the host (+40% on top bar text, permanent RED–BLUE score pill in Team Feast), on by default when 3+ humans are present.
    - **score impact:** +0.2

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Party setup, Crumb Rush / Golden Spoon / Hot Dumpling | "⏱ ≈ 6 min" is far too low; Crumb Rush ran 9 rounds (~8+ min), Golden Spoon was past round 8 (~8+ min) | shot-16, shot-27 | Compute from rounds × round length; fix round count (see checklist 1) |
| 2 | major | Party Cup | Cup is "≈ 20 min" (6 games) but real length is 40+ min; no save/resume | shot-28, shot-31 | 3-game default, RESUME CUP |
| 3 | major | Phones-as-Pads room (Your Room) | Bottom line clipped by panel edge ("Press GGGB ... Close the ...") | shot-29, shot-43, shot-44 | Taller panel/scroll |
| 4 | major | Phones-as-Pads room | Shows "Mode: GOLDEN SPOON" (shot-29) / "Mode: TEAM FEAST" (shot-43) while Party Cup is ON; the Cup actually started at CLASSIC (shot-30) | shot-29, shot-43, shot-30 | Show "CUP (Classic first)" and lock the pills |
| 5 | major | HOUSE RULES slot | Slot 1 saved as "PARTY · teams · first to 3 · normal bots" while Party Cup ON; Cup is not saved | (look text after save) | Save all pills; list them in the label |
| 6 | major | In-match (6 players) | No names/numbers on kaiju by default (NAME TAGS: OFF, PLAYER NUMBERS: OFF); hard to find yourself among 6 | shot-9, shot-18 | Auto-badge when 3+ humans |
| 7 | major | Hot Dumpling | Plays like Classic: KAIJU stomps and cutlery KOs decide it; "Last one standing" not "pass the dumpling"; results have no dumpling stats | shot-20 | Mode-specific rules/results |
| 8 | minor | Phones-as-Pads room | "Waiting for at least one friend to join..." next to a "Start (bots fill the seats)" button: contradictory | shot-29 | Reword as optional |
| 9 | minor | Phones-as-Pads room | "Bots fill up to 4 players" default though 6 are supported | shot-43 (4), shot-44 after toggle (6) | Default to mode max |
| 10 | minor | Phones-as-Pads room | Room code changes each time (GGGB, then LJSD); no "keep this room" | shot-29, shot-43 | Remember the code for the session |
| 11 | minor | Party setup (Cup ON, no players) | Seat cards still say RED TEAM / BLUE TEAM although Cup mode is not Team Feast | shot-41 | Show teams only for Team Feast |
| 12 | minor | Party setup (Cup ON, no players) | "⏱ ≈ 6 min" while Cup ON; with players it says ≈ 20 min | shot-41 vs shot-28 | Recompute on every change |
| 13 | minor | Party setup, Team Feast | Header "Red vs Blue ... RED 3 vs BLUE 3" is a seat count but reads as a score (and showed "RED 0 vs BLUE 0" before anyone joined) | shot-3, shot-2 | "3 per team" wording |
| 14 | minor | Party setup | Seats are lost when leaving to the menu and returning; must re-join everyone | shot-41 | Remember the roster |
| 15 | minor | Team Feast results | No final match score line (e.g. "RED 3 – 2 BLUE"); also the live RED–BLUE score line disappears during the instant-replay overlay | shot-7, shot-5 | Always show it |
| 16 | minor | Crumb Rush results | The winner (DUMPLORD, 191 crumbs, 3 round wins) shows fewer crumbs than GOBZILLA (194, 1 round win); the card doesn't explain it's per-round; "Crumb Monster" award goes to a player ranked 4th | shot-16 | Show per-round crumbs and the rule |
| 17 | minor | Results screens | The brief's "spoon seconds" is not on the Golden Spoon results I could reach (match abandoned at round 8); crumbs are only in the Crumb Rush card | n/a | Show the mode stat on every results card |
| 18 | minor | Results screens | The 🧾 THIS MATCH receipt box sits on top of the table art and covers a corner, and the "🏆 ...! +30 🪙" banner stays top-right over the board | shot-7, shot-16 | Move receipt to a dedicated side column |
| 19 | minor | Party Cup standings | "☰ MENU" on the standings card leaves the Cup with no warning; after clicking it the screen stayed on "game", and another Esc was needed to reach the title | shot-31 | Confirm + RESUME CUP |
| 20 | minor | Pantry | The first-visit toast "🍽 FIRST SERVICE ✓ Visit the 🛒 PANTRY: +25 🪙" is drawn over the "Win 5 matches" progress bar and hides its "1/5" | shot-45 | Move toast to the top, under the title |
| 21 | minor | Help ▸ MODES | Twists paragraph is about 13 px, dense, and duplicates EXTRAS | shot-35 | Remove, link to EXTRAS |
| 22 | minor | Help ▸ EXTRAS | Text-only, about 14 px, with a large empty gap between Power-ups and Hazards | shot-36 | Picture cards |
| 23 | minor | Help ▸ BASICS | Controls footer lines (about 15 px) are dense; the phone line wraps without a clear break | shot-34 | Make it a 4-row keycap table |
| 24 | minor | Pause menu | PAUSED panel sits over live popups ("REVENGE IS SWEET!", "DIZZY", "DROPPED!") which stay visible behind/through it and clash | shot-23 | Dim or hide popups while paused |
| 25 | minor | Pause menu | No "how to play this mode" or "controls" shortcut; a newcomer joining mid-night can't check rules | shot-23 | Add ❓ RULES button |
| 26 | minor | Records | "Matches played 4" and no party stats at all (wins per mode, Cup points, head-to-head, favourite kaiju) | shot-37 | Add a PARTY tab |
| 27 | minor | Daily card | No time estimate for today's Crumb Rush (first to 3 vs 3 bots) which is long; no way to compare scores with the family | shot-39 | Add ⏱ and "share result" |
| 28 | minor | Hot Dumpling round | Round 1 HUD shows the dumpling holder only by a line of text; the fuse countdown is not stated as a number | shot-18 | Show a fuse timer |
| 29 | minor | Golden Spoon HUD | "⏱ 49 · 🥄 GRAB THE GOLDEN SPOON!" and per-player "🥄 1/15s": the target 15 s is only readable in the small top bar | shot-23 | Show target on the central banner |
| 30 | minor | Crumb Rush | While I ate crumbs I was KO'd about 8 times in a row in the first 40 s ("YOU knocked out by ..."); rounds can be lost by someone who plays the intended "eat crumbs" strategy | n/a | Longer spawn shield for crumb-focused players in this mode |
| 31 | polish | Team Feast match | The "TEAM FEAST ROUND 1 · BIRTHDAY BASH" tag at bottom-left is about 12 px and low contrast | shot-5 | Bigger |
| 32 | polish | Party setup | KEYS and HOUSE RULES buttons are both at bottom-left; KEYS opens an overlay that covers the option pills and PLAY, with no dim background | shot-41 | Dim the screen behind it |
| 33 | polish | Online ▸ Join a Game | "A B C D" placeholder is grey on cream (low contrast); no hint that codes are 4 letters; JOIN is enabled with an empty box | shot-33 | Disable JOIN until 4 letters |
| 34 | polish | Setup pills | Pill labels such as "MODE ▶ TEAM FEAST" and "FIRST TO 3" are small (about 14 px) for a couch | shot-3 | Larger / two-line |
| 35 | polish | Party Cup receipt | Each Cup game pays its own tokens ("+112 Chef Tokens" for one game vs +11 for a full Hot Dumpling match) so token pay is inconsistent across modes | shot-31, shot-20 | Normalise by minutes played |

## 🔠 Text and layout check

| Screen | Result | Screenshot |
|---|---|---|
| Title | OK | shot-1 |
| Party Modes setup, empty and filled (desktop) | OK; the ≈ line and the bottom hint lines are long but fit; seat cards fit | shot-3, shot-28 |
| Party Modes + KEYS overlay | OK, but the overlay hides the pills and PLAY | shot-41 |
| Party Modes + HOUSE RULES | OK | shot-42 |
| In-match HUD (Team Feast, Crumb Rush, Hot Dumpling, Golden Spoon) | OK; no overlaps in the top bar; popups ("STOMP READY! / KAIJU! / SUGAR RUSH!") overlap each other and the board but are readable | shot-5, shot-9, shot-18 |
| Team Feast results | Receipt box overlaps the table art; otherwise OK | shot-7 |
| Crumb Rush results | OK; receipt is long and runs 6 lines | shot-16 |
| Party Cup standings | OK | shot-31 |
| Pause menu | Popups bleed through behind the panel | shot-23 |
| Phones-as-Pads room (Your Room) | PROBLEM: last line clipped by panel edge ("Press GGGB ... Close the ...") | shot-29, shot-43 |
| Online (Host / Join) | OK | shot-32, shot-33 |
| Help ▸ BASICS | OK (small footer text) | shot-34 |
| Help ▸ MODES | Dense, 13 px twists paragraph | shot-35 |
| Help ▸ EXTRAS | Small 14 px text, big empty gap | shot-36 |
| Records | OK | shot-37 |
| Records ▸ GOALS | OK | shot-38 |
| Daily card | OK | shot-39 |
| Settings | OK | shot-40 |
| Pantry | PROBLEM: first-visit toast covers "Win 5 matches" progress number | shot-45 |
| Phone mode and Kid Mode | Not checked (desktop run only) | n/a |

## The single biggest structural problem
**Party length and pacing.** A party host plans an evening around "how long does this take", and every estimate on screen is low. Win-by-N-rounds with 6 players makes timed modes (Crumb Rush at 45 s and Golden Spoon at 60 s per round) drag to 8-9 rounds, because points are spread across six kaiju and nobody reaches 3 wins for a long time. The Party Cup then multiplies it by six. The game is at its best in a 3-minute Team Feast, and it is at its worst around minute 6 of a 6-player Crumb Rush when the first-to-3 target still isn't close. This is the one thing that caps the party experience, however good the modes are.

## Big change proposals (2-3, most important first)

### Proposal 1: Fixed-length party rounds with a "Tonight's length" picker
- **Problem it solves:** Unpredictable match length in 6-player timed modes; wrong "≈ N min" estimates; a Cup that takes the whole evening.
- **How it would work (detailed design):**
  - Replace the FIRST TO pill, in the three non-elimination modes (Crumb Rush, Hot Dumpling, Golden Spoon), with a LENGTH pill: SHORT (2 rounds), STANDARD (3 rounds), LONG (5 rounds). Elimination modes (Classic, Team Feast) keep FIRST TO.
  - Each round awards placing points (1st 5, 2nd 3, 3rd 2, 4th 1, same as the Cup) and the match winner is the highest total after the last round. Ties go to a sudden-death 20 s round.
  - Setup computes ⏱ from rounds × (round length + 12 s) and shows it live; the Cup shows each game's estimate on the card ("G2 Crumb Rush · 2 rounds · 2 min").
  - Cup default becomes 3 games ≈ 12 min, with a 6-game "GRAND CUP" option.
- **Example moment:** A host presses PLAY on STANDARD Crumb Rush, sees "≈ 3 min", and the group wraps up with a standings card exactly when promised, then rolls on to Golden Spoon.
- **Rewards / progression hooks:** "Cup Finisher" achievement; Party Cups won already exists in Records and finally becomes a reachable number.
- **Risks and edge cases:** Players who like a long grind lose it, so keep LONG. Early leaders may feel it is decided: a final round worth ×2 fixes this.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 2: A real "Couch HUD" for 3-6 local players
- **Problem it solves:** At couch distance with 6 similar sprites, players can't tell who they are, who has the spoon/dumpling, or what the team score is.
- **How it would work (detailed design):**
  - When 3+ humans are joined, auto-switch on: P1-P6 badges and name tags under kaiju, a coloured arrow pointing at the Golden Spoon/Hot Dumpling carrier, a 40% larger top bar, and a permanent RED–BLUE score pill in Team Feast.
  - Each seat gets a colour + shape (P1 circle, P2 triangle, ...) shown on the setup seat card, the top bar, and the kaiju's feet ring, so colour-blind players are covered too.
  - Add a one-time 3-second "FIND YOURSELF" flash at round start: every kaiju pulses with its badge.
- **Example moment:** Six friends on a sofa call "I'm the triangle!" and nobody loses track of themselves during a KAIJU stomp.
- **Rewards / progression hooks:** None needed; it is a quality-of-play feature. A "Couch" Settings toggle lets the host force it on or off.
- **Risks and edge cases:** Visual clutter in small tables; tags should fade when a kaiju is near the board edge or in a replay.
- **Size:** S-M
- **Score impact for me:** +0.5

### Proposal 3: A Party Night shell (roster, resume, recap)
- **Problem it solves:** The setup screen forgets the roster and the House Rules don't save everything; the Cup can't be resumed; results do not give the group a memorable recap.
- **How it would work (detailed design):**
  - "Tonight's table" remembers seats, kaiju and bot levels until the host clears them.
  - "Save night" in House Rules stores every pill, plus roster, and the label lists non-default settings.
  - Cup progress persists between sessions: Party Modes shows "▶ RESUME CUP · game 3/6 · standings".
  - After the final Cup game, a recap card: champion, MVP per category (most dramatic fall, spoon thief, crumb hoover), a "share" image with all six kaiju.
- **Example moment:** The group stops after game 3, closes the laptop, and next Friday presses RESUME CUP.
- **Rewards / progression hooks:** "Regulars" badge for playing 3 nights; the Pantry sells a "Trophy table skin" for the Cup winner.
- **Risks and edge cases:** Saved rosters with kaiju the host later un-owns; fall back to a random owned kaiju.
- **Size:** L
- **Score impact for me:** +0.5

## How this round's new features felt
- **Round-10 fixes I touched:**
  - **Cup locks MODE / FIRST TO:** works (shot-28). Good. But the Phones-as-Pads room still shows a stale Mode label (see issue 4).
  - **Pantry first-visit +25 🪙 announced:** works, but the toast overlaps the order progress bar (issue 20).
  - **Daily opens a preview card:** works and is clear (shot-39).
  - **EVERY achievement on the receipt:** the receipts I saw listed several achievements and colours/kaiju unlocks (shot-7, shot-16). Good, though the receipt box is long and sits over the board.
  - **Giant Hand warning:** I saw a "💡 The giant hand goes for whoever has the fullest belly." tip on the Golden Spoon round 7 intro (clear), but did not see the hand itself.
- **🥊 Fighting:**
  - **KAIJU lasts 7 s and the HUD shows it:** "KAIJU 5s!" appears in the top bar (shot-5). Clear and useful.
  - **1.4 s round-start shield:** not noticeable as a player. In Crumb Rush I was KO'd about 8 times in the first 40 s while eating (issue 30), so shield or spawn safety feels too thin for the crumb-eater style.
- **🎉 Party:**
  - **Setup shows ⏱ ≈ N min:** present, but wrong for timed modes and the Cup (issues 1, 2, 12).
  - **Results show crumbs eaten and spoon seconds:** crumbs yes (shot-16, footer "Crumb Monster ... crumbs eaten"); spoon seconds not seen on a results card.
  - **Team Feast live RED–BLUE score:** shows at the top ("🔴 RED 0 – 0 BLUE 🔵"), nice. It vanishes under the replay (shot-5) and the results card has no final score line.
  - **Phones-as-Pads room with bots only:** works (Start with bots filled the seats and began the Cup), but the room panel has layout and wording problems (issues 3, 4, 8, 9).
- **❓ Help:** BASICS picture cards look great (shot-34). New EXTRAS tab is useful content but is text only with dead space (shot-36).
- **🎯 Records ▸ GOALS:** the best new feature I touched. Clear path to 100%, closest achievements, PIN buttons (shot-38). Missing party-specific stats.
- **🌶️ SPICY DAILY:** the button is on the card with "HARD rivals · +40 🪙" (shot-39). I did not play it.
- **Not touched:** Story, Gauntlet, Workshop, Gallery, Kid Mode, phone mode.

## Bugs that block play
- None. No JavaScript errors from `/errors`, and every mode was playable end to end (Cup Game 1 included). Closest to a blocker: the Phones-as-Pads room has a clipped line and a stale mode label (issues 3 and 4).
