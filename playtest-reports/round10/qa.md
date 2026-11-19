# Playtest evaluation — The QA Tester (profile 10, round 10, port 7110)

**Fun score: 7.0 / 10** (stable, no JS errors anywhere, but several real layout overlaps, a few state/number inconsistencies, and some rewards-exploit and dead-end edge cases a QA pass keeps tripping over)

## What I did
- About 56 shell invocations containing roughly 190 individual HTTP harness requests (I over-ran the 90-130 budget by batching several curls per shell call). `/errors` checked at start, middle, end and after the Cup: always `none`.
- Screens visited: Title, Story chapter select (via Enter), Online overlay, Table Workshop, Free Play setup, Twist picker (TRY IT), Gallery (+ Move Lab), Records (2 pages), Pantry, Settings, Keyboard Controls, Help (Basics / Tables / Modes), 1-minute Practice, Party Modes setup, Party Cup (3-game cup played start to finish), Challenges overlay, Daily.
- Matches: Workshop table 4-player match (partial, Escape/Pause/Restart/Quit tested), TRY IT Turbo 1v1 (won), Move Lab, Practice (complete), Team Feast 1v1 (partial), Party Cup 3 games (won, 20 pts), Daily (started only).
- QA tricks tried: Escape on title / sub-menus / mid-match, P twice, Pause > RESTART, Pause > QUIT double-tap, 7 rapid toggles on a Settings button, 3 rapid taps on a Pantry buy button, 14 rapid taps filling the Workshop past the 12-prop cap, hazard cycling, key rebind with a conflicting key, PLAY with zero joined players, clicking a greyed MODE button with Party Cup ON, clicking locked Gallery colours / locked kaiju / Shiny button, clicking where there are no buttons on the Cup final screen.

## What worked for me
- Zero JavaScript errors across the whole session including rapid toggles, rapid buys, Pause/Restart/Quit and Escape mid-match.
- Double-tap-to-confirm QUIT is clear ("Tap QUIT again to leave this match"); Restart resets cleanly; Escape in Move Lab leaves without a pause menu (as the banner says).
- Pantry buy is safe against spam: 3 taps on Toffee charged 40 once (144 -> 104) and then showed "OWNED".
- Workshop: prop cap message "That's the most props (12). Tap one to remove it." is clear; every hazard cycle shows a real explanation ("Hot cheese: blobs drop near kaiju; a growing shadow shows where..."); picking a prop explains it.
- Keyboard rebinding: conflicting key swaps ("A key already in use swaps over") and RESET TO DEFAULT works.
- Party Cup standings now show per-game points (G1 +5, G2 +5, G3 +10), a points-table line, and the Golden Spoon placing line. Spoon seconds clearly beat KOs (Crabbage 12 s ranked above Pizzaraptor 0 s / 1 KO).
- Practice HUD shows the current step with its keys and the next one; it advances quickly and the end card (FIRST MATCH / STORY / MENU) is good.
- Records footer follows the pinned achievement ("Pinned: Too Hot to Handle (20%)").
- Gallery header shows the coin balance; locked colour shows how to earn it ("Grape: 'Forked Up': Score 25 knockouts (2/25)").
- Fast-forward banner ("FAST FORWARD x3, only bots left") when I was KO'd; good.

## 🧾 Exactly what would make this a 9/10 for me
1. **Fix the post-match panel overlap in Party Cup standings (and any result screen with a long standings box).** Where: Party Cup game-over screen (`shot-46.png`). The "THIS MATCH" reward panel (bottom-left, up to 8 lines) sits on top of the standings text, hiding the start of "Points per game...", "Golden Spoon places...", and "Next: CLASSIC (FINAL x2 POINTS)". Behaviour: when the reward panel has more than 4 lines, move it into a collapsible chip ("🧾 +85 🪙  tap for details") or push the standings box up/right so the two never share pixels; keep the mascot art behind the text at <= 50 % opacity or move it out of the text column. +0.5
2. **Fix the Help > TABLES tab footer collision and clipping.** Where: Help, tab TABLES (`shot-37.png`). The yellow footer "Shown 13/18 tables (Workshop tables are extra)" is drawn on top of the "Diner Griddle" row, and the last rows (Diner Griddle description, Candy Shop) run off the bottom. Make the list 2 pages or reduce row height so all 18 + My Table fit above y=690, and put the footer in its own reserved strip. +0.4
3. **Make Kid Mode text genuinely bigger on every screen, or stop claiming it.** Where: Settings, Help, title top bar. With Kid Mode ON the Settings descriptions, Help body text and the title's top-bar buttons (SETTINGS / HELP / KAIJU... about 10 px) look identical in size to normal. Behaviour: Kid Mode multiplies body text 1.3x, top-bar button labels at least 14 px, Help body at least 20 px with scrolling pages. +0.4
4. **Stop TRY IT matches paying full rewards and unlocking achievements.** Where: Twist picker > TRY IT. One 1-round Turbo match vs EASY bot gave +79 Chef Tokens, First Bite, "Plot Twist" ("Win a match with a twist on"), a Lime colour, a NEW KAIJU (Chocomunch), and counted as a Gobzilla Mastery win. Behaviour: TRY IT = practice: label the result "TRY IT: no rewards", 0 tokens/XP/achievements/unlocks. +0.4
5. **Fix the Shiny buy button lying.** Where: Gallery, kaiju card. At Mastery Lv 1 with 119 coins, tapping "SHINY 300 coins . needs Lv 3" first changes to "BUY SHINY? tap again: 300" (`shot-19.png`), then a second tap says "needs Mastery Lv 3". Behaviour: when locked or unaffordable, the first tap should immediately say "Needs Mastery Lv 3 (you are Lv 1)" / "Need 181 more coins" and never arm a confirm. +0.3
6. **Make coin and table numbers agree across screens.** Gallery/Records showed 🪙 119 while the Pantry showed 🪙 144 at the same moment (`shot-27.png`); Weekly order "Knock out 20 rivals 1/20" while Records says Knockouts 2; Records "Tables visited 1/18" vs World Tour "2/12"; Party Modes says "TABLE: ALL 14 ... tables owned 13/18". Behaviour: one source of truth, one definition per label (owned vs visited vs pool). +0.4
7. **Give the Party Cup final screen mouse/touch buttons.** Where: Party Cup end (`shot-49.png`): only "1 / START: a new Cup . Esc menu" text; no clickable NEW CUP / MENU buttons (clicking did nothing). Add buttons like every other result screen. +0.3
8. **Make the greyed Party Cup controls inert and consistent.** Where: Party Modes with Cup ON. MODE is greyed "CUP PICKS" but clicking it still changes the hidden mode and the subtitle (it flipped from "Red vs Blue, no friendly fire" to "Eat the most crumbs before time runs out" while the Cup was ON). Also the seats still show RED TEAM / BLUE TEAM labels and "RED 1 vs BLUE 1" even though game 1 is Classic (`shot-44.png`). Behaviour: greyed = no response; with Cup ON show neutral seat labels and a subtitle "Party Cup: 3 games". +0.3
9. **Explain Party Cup tie points.** Standings show "4. CRABBAGE 2 pts (G1 +2)" directly under a rule line saying 4th = +1 (`shot-45.png`). Show "(tied 3rd)" or fix the number. +0.2
10. **Make the Quit-from-Workshop flow return to the Workshop (or tell the player).** Playing from the Workshop and Pause > QUIT drops into Free Play setup, not the Workshop; the table is still selected but the route is surprising. +0.15
11. **Remove ghost overlap text on Practice Complete.** `shot-41.png`: the fading "STOMP TO GO KAIJU AND SQUASH THE DUMMY / KAIJU! / THROW / SWIPE: SEED SPRAY" prompt is rendered underneath the "PRACTICE COMPLETE!" banner. Clear step text when the banner shows. +0.1
12. **Make the Online overlay readable to tools / screen readers.** `/look` returned `texts: []` on the Play Online overlay (visible only as a screenshot); Challenges overlay also hides the title buttons in `/look`. If it is a DOM overlay without text exposure, QA/accessibility cannot verify it. +0.15
13. **Enlarge the twist picker small print.** `shot-13.png`: "FISTS ONLY" and "MIRROR MOVES" captions shrink to ~9 px; double-twist tiles have no description at all. Give all tiles the same caption size (2 lines) and add one-line text for the doubles. +0.15

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Party Cup game-over | "THIS MATCH" panel overlaps standings text; "Points per game...", "Golden Spoon places: rounds won, then seconds holding the spoon", "Next: CLASSIC (FINAL x2 POINTS)" partly hidden; mascot art overlaps right side of text | art-src/.playtest/r10-7110/shot-46.png | Reflow: reward panel collapses or standings box shifts; text column clear of mascot |
| 2 | major | Help > TABLES | Footer "Shown 13/18 tables (Workshop tables are extra)" drawn over "Diner Griddle" row; bottom rows cut off ("Beat Story chapter 10: Proving the...", Diner Griddle description) | art-src/.playtest/r10-7110/shot-37.png | Paginate or shrink rows; reserve footer strip |
| 3 | major | Settings / Help / title (Kid Mode ON) | Kid Mode on but text sizes look the same: Settings captions, Help paragraphs, title top-bar buttons (~10 px) | shot-30.png, shot-34.png, shot-35.png | Real scale factor on all screens; min 14 px buttons |
| 4 | major | Twist picker TRY IT / results | TRY IT win paid +79 tokens, First Bite, Plot Twist achievement, Lime colour, NEW KAIJU Chocomunch, mastery win | art-src/.playtest/r10-7110/shot-16.png | No rewards in TRY IT; label as practice |
| 5 | major | Gallery Shiny | "BUY SHINY? tap again: 300" shown while locked (needs Lv 3) and unaffordable (119 coins); second tap reveals "needs Mastery Lv 3" | art-src/.playtest/r10-7110/shot-19.png | Show the blocker on the first tap; never arm confirm |
| 6 | major | Pantry vs Gallery/Records | Coins 144 in Pantry while Gallery and Records show 119 | art-src/.playtest/r10-7110/shot-27.png (vs shot-17.png / shot-24.png) | Single balance source; refresh on screen enter |
| 7 | major | Party Cup final | No clickable buttons (NEW CUP / MENU); only text "1 / START: a new Cup . Esc menu"; click at the text did nothing | art-src/.playtest/r10-7110/shot-49.png | Add buttons like other result screens |
| 8 | minor | Party Modes (Cup ON) | Greyed MODE still cycles hidden mode; subtitle changed to Crumb Rush text while Cup ON | art-src/.playtest/r10-7110/shot-44.png | Disable click; keep subtitle "Party Cup" |
| 9 | minor | Party Modes (Cup ON) | Seats still labelled RED TEAM / BLUE TEAM and header "RED 1 vs BLUE 1" while game 1 is Classic | shot-44.png | Neutral seat labels with Cup ON |
| 10 | minor | Party Modes | "TABLE: ALL 14 (a different one every round) . tables owned 13/18" (14 vs 13, brief promised agreement) | shot-42.png | Say "13 tables + My Table" or make both numbers equal |
| 11 | minor | Records vs Pantry vs World Tour | Records "Tables visited 1/18" while World Tour achievement shows 2/12; Pantry order "Knock out 20 rivals 1/20" while Records Knockouts = 2 | shot-24.png, shot-26.png, shot-27.png | Reconcile counters (what counts as a visit / KO) |
| 12 | minor | Party Cup standings | "4. CRABBAGE 2 pts (G1 +2)" while rule text says 4th = +1 and 3rd = +2; tie not explained | art-src/.playtest/r10-7110/shot-45.png | Show "T-3rd" or the rule used |
| 13 | minor | Records | "ACHIEVEMENTS 3/37" but page 1 shows only 1 unlocked; Plot Twist and Table Maker (page 2) unlocked without me pressing SAVE; confusing for first look | shot-24.png, shot-26.png | Add "unlocked on page 2" badge; unlock Table Maker only on explicit SAVE |
| 14 | minor | Practice complete | Ghost prompt text "STOMP TO GO KAIJU AND SQUASH THE DUMMY / KAIJU! / THROW / SWIPE: SEED SPRAY" visible behind the banner | art-src/.playtest/r10-7110/shot-41.png | Clear step prompts on completion |
| 15 | minor | Online overlay | `/look` returns `texts: []`; overlay only visible by screenshot | art-src/.playtest/r10-7110/shot-3.png | Expose overlay text in the scene list |
| 16 | minor | Title keyboard nav | Enter on title selected the wrong card after Escape (Escape on title is a no-op, Enter went to Story; ArrowLeft+Enter wrapped to WORKSHOP and ArrowRight x2+Enter opened ONLINE): selection state not shown after returning from submenus | shot-1.png | Persist/show focus ring on the last-used card |
| 17 | minor | Twist picker | "FISTS ONLY" and "MIRROR MOVES" captions are much smaller than neighbours; double-twist tiles have no explanation | art-src/.playtest/r10-7110/shot-13.png | Uniform caption size; add one-line doubles text |
| 18 | minor | Pause menu from Workshop match | QUIT lands on Free Play setup instead of the Workshop | art-src/.playtest/r10-7110/shot-12.png | Return to origin screen |
| 19 | minor | Team Feast (Party Modes with zero joined) | PLAY with no seats joined silently adds YOU plus 1 bot (1v1 "Team Feast"); no message that it auto-joined | art-src/.playtest/r10-7110/shot-43.png | Toast "Added you + a bot", or require 2+ |
| 20 | minor | Team Feast spawn | Both teams' mats are at top-left/top-middle, ~60 px apart, on Diner Griddle: first-second encounter is a free shove | shot-43.png | Spawn teams on opposite sides |
| 21 | polish | KAIJU banner in-match | "STOMP READY! / KAIJU! / FIRST BITE!" stacked text sits directly on the Squidgeon kaiju sprite and ring | art-src/.playtest/r10-7110/shot-10.png | Offset banner above sprite / smaller |
| 22 | polish | Title screen | Top-bar buttons (SETTINGS...WORKSHOP) have ~10 px labels, tiny next to the big bottom row | art-src/.playtest/r10-7110/shot-34.png | Bigger labels or icons only |
| 23 | polish | Title | NEXT UP box is a dense 4-line block and the pink elephant art reveals a "???" kaiju silhouette (Gallery slot) | shot-34.png | Limit to 2 lines; hide locked art |
| 24 | polish | Pantry | Footer "Colours you buy appear in the KAIJU Gallery..." is dark grey on dark brown, low contrast; ranking text bottom-left is also small | art-src/.playtest/r10-7110/shot-27.png | Lighten text |
| 25 | polish | Party Cup standings | White text on busy semi-transparent panel; the table art shows through | shot-45.png | Panel opacity 0.9 |
| 26 | polish | Practice HUD | Bottom-left objective box starts at x=10 and sits on the table border; two-line wrap is cramped | art-src/.playtest/r10-7110/shot-39.png | Move to a top-centre strip |
| 27 | polish | Match HUD (Workshop table) | Table at 4 players shows "Ladle . KOs 0" etc. but no "YOU" tag in the top bar; YOU only appears as a ▼ marker at countdown | shot-6.png | Add 👤 to own HUD card |
| 28 | polish | Settings | Sound-effects row is taller than others, giving uneven row rhythm; SOUND EFFECTS bar uses squares that are hard to tell apart (■■■■□) | art-src/.playtest/r10-7110/shot-29.png | Even row height; slider |
| 29 | polish | Workshop | CLEAR has no confirm and no undo-after-clear (cleared 12 props instantly) | shot-5.png | Confirm or allow UNDO to restore |
| 30 | polish | Challenges overlay | Escape closes the overlay and the next click on the Daily card starts a Daily match immediately with no preview/confirm | art-src/.playtest/r10-7110/shot-51.png | Add a Daily briefing screen |

## 🔠 Text and layout check
- **Title (Kid Mode ON):** top-bar labels tiny (~10 px), NEXT UP box dense but not overlapping. Problem noted; `shot-34.png`.
- **Online overlay:** OK visually (`shot-3.png`), but no text in `/look`.
- **Story chapter select:** not screenshotted; `/look` text positions showed no overlaps; "🔒 SECOND HELPINGS / clear chapter 6 to open" stacked at the top-right looked compact; text-only check (not visually verified).
- **Table Workshop:** OK, all buttons separate, hint line fits (`shot-4.png`, `shot-5.png`).
- **Match HUD (4p, 2p, Cup):** top bar OK; kaiju announcement text sits on the sprite (`shot-10.png`); countdown text OK (`shot-6.png`).
- **Pause menu:** OK in text; not shot.
- **Free Play setup:** OK (`shot-12.png`); the two-line text under the PLAY button is small but readable.
- **Twist picker:** small/shrunk captions on FISTS ONLY and MIRROR MOVES (`shot-13.png`).
- **Match end (Free Play):** OK, THIS MATCH panel clear of buttons (`shot-16.png`).
- **Gallery:** OK, header fits two lines at top-right (`shot-17.png`, `shot-18.png`, `shot-19.png`).
- **Move Lab:** OK (`shot-23.png`).
- **Records:** OK both pages (`shot-24.png`, `shot-26.png`).
- **Pantry:** OK; low-contrast footer (`shot-27.png`, `shot-28.png`).
- **Settings / Keyboard Controls:** OK (`shot-29.png`, `shot-30.png`, `shot-31.png`).
- **Help BASICS:** OK but a wall of ~10 lines of small text (`shot-35.png`). **MODES:** OK (`shot-38.png`). **TABLES:** footer overlaps a row and rows are cut off at bottom (`shot-37.png`). CUTLERY tab: opened via click (`shot-36.png`) but I did not Read it, so unverified.
- **Practice:** HUD OK (`shot-39.png`); completion ghost text overlap (`shot-41.png`).
- **Party Modes setup:** OK physically (`shot-42.png`, `shot-44.png`) but wrong labels with Cup ON.
- **Party Cup standings:** overlap between the reward panel and standings text (`shot-46.png`); game 1 is acceptable (`shot-45.png`, mild low contrast).
- **Party Cup final:** OK text layout, no buttons (`shot-49.png`).
- **Challenges overlay:** OK, no overlap; the bottom two-line Chef's Pass line fits (`shot-50.png`).
- **Daily intro:** text lines only (not visually verified beyond `shot-51.png` being taken; I did not open it with Read).
- Screenshots I took but did not open: shot-1, shot-2 (title / Story first looks), shot-36, shot-40, shot-47, shot-48, shot-51; shot-20 to shot-22, shot-25, shot-32 to shot-33 reviewed only through text. These are listed honestly as not visually verified.

## The single biggest structural problem
Information is stored and shown in too many places with different definitions: coin balance (119 vs 144), tables owned / visited / pooled (13/18, 14, 1/18, 2/12), knockouts (2 vs 1/20 weekly), and a TRY IT / Practice that grants real rewards. For a QA mind it means I can never be sure which number is true, and I found an economy exploit (practice twist matches grant full rewards and achievements) just by playing normally. A 9 needs a single stats model that every screen reads, and a clear split between "counts" and "doesn't count".

The second structural gap is result-screen layout: every end-of-match view stacks a mascot, a standings box, a reward panel and a toast over a busy table, with no collision management; the Cup screens (the most text-heavy) are where it breaks.

## Big change proposals (2–3, most important first)
### Proposal 1: One Stats Ledger + "Counts / Doesn't count" flag
- **Problem it solves:** inconsistent coins/tables/KO counters between Gallery, Records, Pantry, Party Modes; TRY IT paying full rewards; Quit/Restart edge cases changing stats unpredictably.
- **How it would work (detailed design):** a single `ledger` object (tokens, matches, wins, KOs, crumbs, tables visited set, achievements) with `commit(matchResult, {counts: true|false})`. Every screen reads from it on enter. Matches carry a `rewardClass`: `full` (Free Play, Story, Party, Daily, Gauntlet), `none` (TRY IT, Move Lab, Practice). Practice keeps its one-time +20. Result screen for `none` shows a grey chip "PRACTICE: nothing saved". Tables: define "owned" (unlocked), "visited" (played at least once); Party Modes line reads "13 of 18 tables unlocked (+ your Workshop tables)".
- **Example moment:** I try Turbo with TRY IT, win, and the result says "TRY IT: no rewards" with a Play for real button.
- **Rewards / progression hooks:** none lost; the Plot Twist achievement requires a real match.
- **Risks and edge cases:** migrating saves with already-awarded rewards; keep them.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 2: Result-screen layout system (slots instead of free-floating panels)
- **Problem it solves:** overlap in Party Cup standings, mascot over text, toast + reward panel + standings collisions.
- **How it would work (detailed design):** result screen has three fixed slots: header (title, y 90-250), standings (y 250-540, max 5 lines, auto-shrinks to 18 px min), footer strip (y 560-700). The THIS MATCH reward list becomes a one-line chip ("🪙 +85 . Lv 2 . 2 achievements") that expands into a modal on click/press. Mascot art becomes a low-opacity backdrop on the left/right gutters only. Same slot grid reused for Cup standings, Cup final, Story result, Daily result.
- **Example moment:** Cup game 2 shows the full 3-line rules text, a single reward chip, and NEXT/MENU buttons with nothing hidden.
- **Rewards / progression hooks:** more readable payoff means more feel of reward.
- **Risks and edge cases:** 6-player standings need 6 lines + tie text: need auto font shrink or two columns.
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: Real Kid/Big-text scale mode with a layout audit script
- **Problem it solves:** Kid Mode claims "bigger text" but Settings, Help and the title bar look unchanged; Help TABLES already overflows at normal size.
- **How it would work (detailed design):** a global `uiScale` (1.0 normal, 1.3 Kid) applied to all text draw calls; every screen declares a safe rect; a dev-only `/layout` harness command measures every text against its container and reports overflow/overlap so each screen is checked automatically in normal, phone and Kid modes. Help gets pages (Basics 1/2, 2/2) so large text still fits.
- **Example moment:** Kid toggles on, Help text grows, and "Page 2/3 ▶" appears instead of text cut off.
- **Rewards / progression hooks:** none; pure polish and accessibility.
- **Risks and edge cases:** more pages; button grids (setup rows) need wrapping.
- **Size:** L
- **Score impact for me:** +0.5

## How this round's new features felt
- **KAIJU warning (growth + red ring):** I saw the kaiju ring on both Gobzilla and Squidgeon (`shot-10.png`, `shot-11.png`); the ring and rival kaiju are readable. The "STOMP READY! KAIJU! FIRST BITE!" call-out sits on top of the rival sprite (polish). I did not time the 0.5 s squash lock with a stopwatch; no obvious stall.
- **Gauntlet:** only the Challenges overlay was seen (checkpoint explanation, Chef's Pass progress line "0/12 Trial ★ or Gauntlet wave 0/8"). Layout clean (`shot-50.png`). Did not play waves.
- **Chef's Pass:** progress is shown in CHALLENGES; good. Not testable to completion here.
- **Party Cup:** Points per game are visible and the mode's own score decides places (Golden Spoon seconds beat KOs). The cup played through 3 games with no errors. Issues: overlap (shot-46), tie label, greyed MODE still responds, team-labelled seats, final screen has no buttons. "FIRST TO: CUP SETS IT" greying works.
- **Kid Mode:** failed my check: text on Settings/Help/title did not look bigger. Bot level pill got a 🧸 on setup, which is nice.
- **Gallery:** 🪙 balance in header works; locked colour now shows exact earn text (good). Shiny confirm is misleading (see issues). I did not afford a Shiny so the banner and sparkles are untested.
- **Records footer follows pin:** works exactly.
- **First-timer:** "▼ YOU" marker shows at countdown and Setup shows "👤 YOU . Keys left . A / D". Practice shows current step with keys plus next. Table counts do NOT agree everywhere (14 vs 13/18 vs 1/18). Fast key taps: Escape/P pause toggles and quick actions did not drop or error.
- **Twist picker TRY IT:** works as a 1-round vs EASY bot, but pays full rewards (exploit).
- **Workshop:** picking a prop and cycling the hazard both explain themselves in the hint line. Good.
- **Daily medals:** the Daily countdown line listed "Medals: 🥉 play +10 🪙 . 🥈 win +20 🪙 . 🥇 win without..." (truncated by the harness text cap); I did not verify the "still open today" state.
- **Text and layout audit claim:** "audited on desktop, phone and Kid Mode" does not hold up: Help TABLES overlaps and Cup standings overlap are present on desktop.

## Bugs that block play
- None blocked play and `/errors` stayed `none`. Closest to blockers: Party Cup final has no mouse/touch buttons (Escape works), and Cup standings text is partially unreadable when a reward panel is open.
