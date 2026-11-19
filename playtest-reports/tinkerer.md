# Playtest evaluation — The Tinkerer

**Fun score: 7 / 10** (Twists, Settings and the Workshop are a real toolbox, but I can't see what most knobs do, I can't test or share them easily, and Party / Free Play setup keeps the twist and bot-level hints hidden.)

> This round the bar is **9/10 from EVERY profile**. Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r9-7107\` (shot-N.png).

## What I did
- About 95 harness commands, roughly 40 minutes of play. JS errors: `/errors` was "none" at the start, middle and end.
- **Settings** (shot-2): changed SFX, Music and Screen Shake. Read all 14 options.
- **Keyboard Controls** (shot-3, 4):
  - Rebound P1 Move Up to T.
  - Set P2 Move Up to W, then P1 Throw to W. The "swap" works across players: P2 Up became SPACE, and the footer explained it.
  - Used RESET TO DEFAULT.
- **Free Play setup** (shot-5, 8, 9):
  - Cycled Bot Level through EASY, TOUGH, HARD and BRUTAL, with a hint for each.
  - Cycled First-To through 1, 3, 5, 7 and 10.
  - Toggled Power-ups and Hazards.
  - Stepped through every table description.
  - Opened the Twist picker (shot-7): 11 singles and 8 doubles.
- **Matches:**
  - ICE RINK + TURBO on Sunday Roast: lost in 2 s (shot-12, 13).
  - MIRROR MOVES + TURBO: won (shot-15). This gave First Bite, a Lime colour and the Plot Twist achievement.
  - Custom "My Table 2" (empty), 4 players.
  - Boomerangs on Chef's Board with hazards ON (shot-36): lost to a bot's boomerang.
- **Table Workshop** (shot-16, 17): placed 4 props (bumpers and a cupcake), cycled all 17 surfaces and all hazards, saved, copied the code, used Next Slot, tried Paste Code, and used PLAY IT.
- **Party Modes** (shot-19): cycled all five modes. Opened PHONES AS PADS (shot-20) and its room options.
- **Gallery** (shot-21): Move Lab, with the Seed Spray power (shot-22, 23).
- **Pantry** (shot-24, 26): two-tap buy flow.
- **Records** (shot-27).
- **Daily** (shot-29, 34): a Hot Dumpling Daily, lost after 9 rounds.
- **Challenges** (shot-35).
- Paused a match and quit.

## What worked for me
- The Twist picker is great: one panel with every single and double twist, plus a one-line description that also shows on the setup screen and in the countdown (shot-7, 10).
- Doubles are named and coloured differently (pink border), so it's easy to tell them apart.
- The in-match twist reminder is good: the corner tag "⚡ ICE RINK + TURBO", the countdown tip "On ice, start turning early" and the banner.
- Key rebinding swaps conflicting keys instead of refusing, and says so ("A key already in use swaps over", shot-3, 4).
- The Workshop saved, copied a share code and awarded "Table Maker". The prop grid is big and readable (shot-16).
- Move Lab is a great sandbox: STOMP, then the power, with the reach and cooldown shown in the Gallery (shot-21, 22, 23).
- The Pantry two-tap buy ("Toffee colour? tap again to buy for 40") and "need 267 more" refusal text are exactly what I wanted (shot-26). The Orders panel shows payouts (shot-24).
- The round-end banner says how I went out ("You went out at 2s: a swipe (SQUIDGEON)", shot-12). The Daily countdown lists rival levels (shot-29).
- Gallery power text gives numbers ("reach 207 · every 1.6 s").
- Settings is clear, with a sub-line under every toggle (shot-2).

## 🧾 Exactly what would make this a 9/10 for me
1. **Twist Sandbox / test room (+0.6).**
   - What: a "TRY IT" button in the Twist picker and in Free Play setup.
   - Where: Free Play setup and the picker.
   - How: it launches a 30 s Practice with the chosen twist, 1 easy bot and an Esc to return. Today I had to lose a full match on ICE RINK + TURBO to learn it's brutal.
2. **Show Bot Level hint and the twist/table hint together (+0.3).**
   - What: the single hint line at y=652 is replaced by the twist description as soon as a twist is set (shot-9), so the explanation of each BOT LEVEL disappears.
   - Where: Free Play and Party setup.
   - How: use two lines or a tooltip on the pill.
3. **Fix the stale "TWIST ⚡⚡ NONE" label (+0.2).**
   - What: after a double was chosen then cleared, the Party Modes pill shows "⚡⚡ NONE" (shot-19). Free Play showed it again later.
   - How: show only "NONE" with no bolts.
4. **Workshop props need names and what they do (+0.5).**
   - What: Bumper, Pot, Lollipop and Tomato are unexplained. Surfaces and hazards also give no preview. Sushi Bar shows no belt in the editor, and neither does Hazard "Spatula".
   - How: tap-and-hold tooltip ("BUMPER: bounces kaiju away"). Add a "hazard preview" overlay on the board (lane marks, arrows).
   - Also: stack limit feedback and a "12/12 props" warning.
5. **Workshop → Free Play flow (+0.4).**
   - What: PLAY IT launched an empty slot 2 with 4 players.
   - How: grey out PLAY IT for empty slots, and let me pick which slot to play. Show "My Tables" at the front of the Table pill, not between "Banquet" and ALL. The "ALL 16" count also quietly includes custom tables.
6. **Paste Code needs a clear result (+0.2).** Click on 📥 PASTE CODE with an empty clipboard showed nothing. Add "Pasted: <name>" or "No valid code on clipboard".
7. **Gallery Mastery ladder labels (+0.3).** The Rewards line is a row of 🔒✨⭐🪙 icons with no words (shot-21). Hover or tap each icon: "Lv 2: ✨ Shiny", "Lv 3: 300 🪙".
8. **Twist info in Records/Achievements (+0.3).** Only "Plot Twist" exists. Add a "Twist Collector" ladder (play each of the 19 twists, win with N) and a Records list "Twists tried 2/19".
9. **Results panel overlap (+0.2).** On the Daily results the "THIS MATCH" box overlaps the main results box (shot-34). Move THIS MATCH below or to the side.
10. **Mirror Moves needs a visible cue (+0.2).** The twist should flash "CONTROLS FLIPPED" with an arrow for 1.5 s at round start.
11. **Custom twist mix (+0.5).** Let me combine any 2 singles myself, not just the 8 preset doubles.
12. **Quit confirmation consistency (+0.1).** From the Pause menu, QUIT went straight out with no confirmation on the first click.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Free Play setup | With a twist selected, the bottom hint shows only the twist; the BOT LEVEL explanation ("🤖 NORMAL: fair aim...") is hidden, so the new round-9 feature disappears | shot-9 | Two hint lines, or put the bot hint next to the Bot Level pill |
| 2 | major | Free Play / Party | No way to try a twist before a match; ICE RINK + TURBO killed me in 2 s on Easy | shot-12, 13 | Add TRY IT practice |
| 3 | major | Table Workshop | Props and hazards unexplained; Bumper/Pot/Lollipop/Tomato only have names | shot-16 | Tooltips + hazard preview |
| 4 | minor | Party Modes | Twist pill reads "TWIST ⚡⚡ NONE" | shot-19 | Show plain NONE |
| 5 | minor | Free Play | Twist pill also showed "⚡⚡ NONE" on a later visit | look text `[571,512] TWIST ⚡⚡ NONE` | Same fix |
| 6 | minor | Workshop | PLAY IT on an empty slot starts a match with an empty table (4 players: me plus 3 bots) | shot-18 | Disable when 0 props, or warn |
| 7 | minor | Workshop | Sushi Bar surface shows no belt and the hazard (Spatula, etc.) shows no mark in the editor | shot-17 | Hazard preview overlay |
| 8 | minor | Workshop | PASTE CODE gives no feedback | shot-17 text | Toast on success/failure |
| 9 | minor | Workshop | "Table Maker" coin reward (+30) only credited at the end of a later match, not on save | shot-34 | Show "+30 🪙" on the save toast |
| 10 | minor | Free Play table pill | Table cycle order puts My Table 1-3 before ALL, easy to overshoot; "ALL 16" now counts custom tables | look text | Put My Tables in a separate pill or filter |
| 11 | minor | Free Play | Table description "Watch for the giant hand" still shown with HAZARDS OFF | look text (shot-8 flow) | Hide hazard text when Hazards OFF |
| 12 | minor | Match results | The "THIS MATCH" panel overlaps the results box (x 278-367) | shot-34 | Move to a corner/bottom row |
| 13 | minor | Match results (Free Play) | A giant KAIJU portrait covers the right of the board and the "THIS MATCH" box sits on the winner's circle | shot-13 | Keep the portrait out of the panel area |
| 14 | minor | Daily countdown | The "DAILY · 3 rivals (normal, easy, easy)…" text runs across the spawn pads, overlapping Pizzaraptor's and my own pad | shot-29 | Move the line off the pad row |
| 15 | minor | Twist picker | The ✖ close button touches the top row of cards (✖ y=122, first row y≈150) | shot-7 | Add 12 px padding |
| 16 | minor | Twist picker | "FISTS ONLY" and "MIRROR MOVES" descriptions are in a smaller font than the others | shot-7 | Same size, or shorten text |
| 17 | minor | Twist picker | 19 options, no search, no recommended or difficulty tag; empty area under the grid | shot-7 | Tag "Chill / Wild / Brutal" |
| 18 | minor | Gallery | Mastery reward ladder is icon-only (🔒✨🔒⭐…) with no words | shot-21 | Labels / hover |
| 19 | minor | Gallery | The Move Lab button text is tiny "try its power" (11 px) | shot-21 | Larger |
| 20 | minor | Settings | No setting for twist/hazard warnings or a "hide hint tips" per type; there is no way to see what Rumble etc. do without a gamepad | shot-2 | Group into Sound / Visual / Gameplay headings |
| 21 | minor | Settings | The grid is 14 equal tiles with no grouping; hard to scan | shot-2 | Section headers |
| 22 | minor | Settings | SOUND EFFECTS click went ■■■■□ to ■■■■■ and kept increasing; no plays-a-sample feedback | shot-2 (look) | Play a sample on change |
| 23 | polish | Settings | Footer "Saved on this device · ENTER / click to change" is small and low contrast | shot-2 | Larger |
| 24 | minor | Keyboard Controls | No visual conflict preview before key press; only a post-hoc footer | shot-4 | Highlight both swapped rows |
| 25 | polish | Keyboard Controls | Two separate keyboard layouts only (L/R); no gamepad/third key set | shot-3 | Add gamepad mapping |
| 26 | minor | Pause menu | QUIT went straight to the menu, no confirm | shot-18 | Confirm when mid-match |
| 27 | minor | Pause menu | MUSIC / SOUND are on/off only, while Settings has 5-step sliders | shot-18 | Match Settings |
| 28 | minor | Party Modes setup | 11 pills in one row with 2-line labels; small (11 px) | shot-19 | Two rows |
| 29 | minor | Party Modes | "CUP LENGTH 6 GAMES" shows even when PARTY CUP is OFF | shot-19 | Grey out |
| 30 | minor | Party Modes | Hint line at y=652 is cut to one long run: "🏆 Party Cup = 6 games: CLASSIC → CRUMB → …" | look text | Wrap |
| 31 | minor | Phones as Pads room | The "YOUR ROOM" panel fills the full height; its top is 4 px from the screen edge and the "Waiting for at least one friend to join…" line sits at the very bottom | shot-20 | Slightly smaller panel |
| 32 | minor | Phones as Pads room | Lobby shows "TABLE: ALL 13 (ROTATE)", the setup screen says ALL 16 | shot-20 vs shot-19 | Same count |
| 33 | minor | Phones as Pads room | Needs a second person to test; "Start Match" disabled with only the host, which blocks solo tinkering | shot-20 | Allow bots-only start |
| 34 | minor | Match / Mirror Moves | No visible cue that controls are flipped (harness move:1,0 still moved +x) | shot-14 (state) | Banner "CONTROLS FLIPPED" |
| 35 | minor | Records | "Times gone KAIJU 0" and "Tables visited 1/18" don't count Move Lab / My Tables | shot-27 | Explain or count |
| 36 | polish | Records | Footer text is one long line with 3 sentences, 11 px | shot-27 | Split |
| 37 | minor | Records | Only one twist-related achievement (Plot Twist) | Records page 2 | Twist ladder |
| 38 | polish | Title | The NEXT UP box text is small (≈13 px), 3 lines of tight text | shot-1 | Larger |
| 39 | minor | Title | 'v2026-11-19-b4df0e2' build string overlaps nothing but sits in the corner on every screen, over the Free Play background art | shot-5 | Fine; dim it |
| 40 | polish | Pantry | Affordable item gets a yellow outline but selected/focused item gets another; Lifeline has a blue outline: three highlight colours with no legend | shot-24 | Legend or one colour |
| 41 | polish | Pantry | "Each one pays 40 🪙" and each row "· 40 🪙" say the same thing twice | shot-24 | Remove one |
| 42 | minor | Free Play | The 12/20 kaiju and tables lock counts rose between matches (12→13→14) but I saw no NEW KAIJU toast in my snapshots | look after match | Keep toast until I dismiss |
| 43 | polish | Free Play | "FIRST TO 10" option is a very long match for casual use; no "time-limited" option | shot-8 | Add "TIMED 3 min" |
| 44 | polish | In match | The twist tag "⚡ BOOMERANGS" in the corner is small (13 px) | shot-36 | Larger |
| 45 | polish | Chef's Board | The cleaver art is huge and covers a spawn-side prop (tomato); it hides the red lane marker | shot-36 | Make the lane telegraph more visible |
| 46 | polish | Round-end banner | The "GOBZILLA ☆ SQUIDGEON ★ MOTHBALL ☆" line is a tight dark pill sitting over the title-size text | shot-12 | More spacing |
| 47 | polish | Hot Dumpling Daily | Match went 9 rounds (first to 3) with very little control for me; the "dumpling" outcome felt random | shot-34 | Shorter first-to for Daily |

## 🔠 Text and layout check

| Screen | Result | Screenshot |
|---|---|---|
| Title | OK (NEXT UP box text small) | shot-1 |
| Settings | OK, nothing overlaps; footer small | shot-2 |
| Keyboard Controls | OK | shot-3, shot-4 |
| Free Play setup | OK; bottom hint hides the bot-level line when a twist is set | shot-5, 8, 9 |
| Twist picker | ✖ touches the top row; two descriptions in smaller font | shot-7 |
| In-match countdown (Ice Rink) | OK, text readable over the cloth | shot-10 |
| In-match (fast forward banner) | OK | shot-11 |
| Round-end banner | OK, heavy but readable | shot-12 |
| Match results (Free Play) | KAIJU portrait covers the board; THIS MATCH panel on the circle | shot-13, 15 |
| Workshop | OK | shot-16, 17 |
| Pause menu | OK | shot-18 |
| Party Modes setup | OK but dense | shot-19 |
| Phones as Pads room | tight at top and bottom of the panel | shot-20 |
| Gallery | OK; reward line icon-only | shot-21 |
| Move Lab | OK | shot-22, 23 |
| Pantry | OK | shot-24, 25, 26 |
| Records | OK | shot-27 |
| Daily countdown | text overlaps spawn pads | shot-29 |
| Daily results | THIS MATCH overlaps the results box | shot-34 |
| Challenges modal | OK | shot-35 |
| Chef's Board in-match | OK | shot-36 |

## The single biggest structural problem
There is no feedback loop for tinkering. The game has 19 twists, 17 surfaces, 8+ hazards, power-ups, 16 tables and custom tables, but there is no cheap way to try a combination: a configuration screen goes straight into a full match against bots. My first experiment (ICE RINK + TURBO) was over in 2 seconds, and that was the whole lesson. The explanations are also squeezed into one line that other settings override (the twist text hides the bot-level text).

The second half is sharing and discovery. Workshop codes exist, but there is no place to browse, name or favourite combos, and the Records page doesn't reward trying them.

## Big change proposals (2–3, most important first)

### Proposal 1: Rules Lab (Try-It + Presets)
- **Problem it solves:** I can't test a twist, table or hazard without losing a real match, and I can't save or recall rule sets.
- **How it would work:**
  - A TRY IT button appears next to the TWIST pill and in the picker.
  - It starts a 45 s Practice on the chosen table and twist with 1 easy bot and instant respawn. A small panel on the right lists the active rules. Esc returns to the same setup.
  - A new "💾 PRESETS" button next to HOUSE RULES stores 6 named rule sets (bot level, table, first-to, twist, power-ups, hazards).
  - Pressing a preset loads it in one click, and the Party Cup can use presets as its games.
- **Example moment:** I pick ICE RINK + TURBO, press TRY IT, slide into the edge twice, learn "start turning early", save it as "ICE CHAOS" and bring it to game night.
- **Rewards / progression hooks:** Records "Twists tried n/19" and a "Mad Scientist" achievement for winning with 10 different twists.
- **Risks and edge cases:** Practice must not count as a win; it must restore the setup state.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 2: Workshop 2.0 (explain, preview, share)
- **Problem it solves:** props and hazards are unexplained, there is no preview, and there is no playtest flow. PLAY IT works on empty slots.
- **How it would work:**
  - Tap-and-hold on a prop shows a card ("BUMPER: bounces anything that touches it, 1.2× speed").
  - Hazard picker shows a live animated preview of the hazard on the board. Surface changes show the real belt, ice or sticky overlay.
  - PLAY IT launches the current (unsaved) table with 1 bot and an "Edit" return.
  - Name a table, then "SHARE" produces a short 8-character code instead of the long KKT1 string. Paste shows a clear result.
- **Example moment:** I place 3 bumpers, switch to Ice Cream Parlour, see puddles appear, press PLAY IT, test, and pass back to edit.
- **Rewards / progression hooks:** "Table Maker" pays on save; new achievements for 5 tables saved and 1 table played 10 times.
- **Risks and edge cases:** imported codes must be validated; limit of 12 props must stay.
- **Size:** M-L
- **Score impact for me:** +0.6

### Proposal 3: Custom Twist Mixer
- **Problem it solves:** the 8 preset doubles feel arbitrary.
- **How it would work:**
  - In the picker, a final card "MIX YOUR OWN" lets me tick up to 2 compatible singles.
  - Incompatible pairs are greyed out with the reason ("Fists Only + Boomerangs: no cutlery to throw").
  - The result shows a difficulty tag (Chill / Wild / Brutal).
- **Example moment:** SNACK ATTACK + BOUNCY CASTLE is flagged "Chill", so I pick it for the kids.
- **Rewards / progression hooks:** unlock a triple mix after 10 different twists.
- **Risks and edge cases:** balance and bot handling for unusual pairs.
- **Size:** M
- **Score impact for me:** +0.4

## How this round's new features felt
- **Fairness:**
  - The round-end banner ("You went out at 2s: a swipe") is useful and clear.
  - The Daily countdown naming rival levels ("normal, easy, easy") is useful but sits across the spawn pads (shot-29).
  - The Free Play setup shows each BOT LEVEL explanation (EASY, NORMAL, TOUGH, HARD, BRUTAL), but only when no twist is set (shot-9). In practice I lost the line as soon as I used a twist.
  - I couldn't judge the 1.4 s bot grace in detail; the ICE RINK + TURBO loss at 2 s suggests it is not long enough with TURBO on.
- **Feedback:**
  - Achievement toasts showed: "🏆 First Bite! +30 🪙" and "🏆 Plot Twist! +30 🪙" (shot-15). They overlay the top right cleanly.
  - Pantry orders show payouts. The two-tap buy and the "need 267 more" text are good (shot-26).
  - I didn't see a NEW KAIJU toast; the counter simply went 12/20 → 13/20 → 14/20.
- **New saves start locked:** it felt fine early. A tinkerer still wants every twist from the start, and no twist is locked, which I liked. The kaiju count (12/20) and tables count (13/18) were generous.
- **Phones as Pads:** the QR code room is big and readable, but is tight at the edges and needs a second device (shot-20). Its options (Bots fill, Table, First to, Mode, Power-ups, Hazards, Twist, Party Cup, TV mode) cover the useful ones.
- **Gallery:** each power shows reach and cooldown (shot-21), which I love. Mastery ladder icons are unlabelled, with Shiny at 300 🪙 and needs Lv 3.
- **Fixes from last round:** double twists are kept after a match (Rink + Turbo stayed for the rematch flow). The rest I could not exercise.

## Bugs that block play
- None blocked play, and `/errors` was empty throughout.
- Near-bugs: PLAY IT on an empty custom slot, the stale "⚡⚡ NONE" twist label, and the hidden bot-level hint when a twist is set.
