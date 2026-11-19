# Playtest evaluation — The QA Tester

**Fun score: 7.0 / 10** (stable, zero JS errors, charming and very readable; but Story Rewards overflows its frame, Quit has no confirmation, and a few overlaps/inconsistencies stop it feeling fully polished)

> Screenshot folder: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r9-7110\` (files `shot-N.png`; the harness prints them as relative `art-src/.playtest/r9-7110/shot-N.png`).

## What I did
- About 120 harness commands, roughly 25 minutes of play. `/errors` checked at start, middle and end: **"none" every time** (no JS errors at all, even after fast screen switching and Escape mid-match).
- Screens visited: Title, Challenges modal (Gauntlet starters/locked courses + Trials button), Trials list, Pantry (+ refused-buy message), Settings (all 13 toggles listed), Keyboard Controls, Back up / Move save modal, Help (all 4 tabs: Basics, Cutlery, Tables, Modes), Gallery (grid, locked kaiju, Shiny confirm + refusal, Move Lab), Records (3 pages), Table Workshop (props, hazard, surface, undo, clear, copy code, save, Play It), Free Play setup (Bot level, Table, First to, Twist picker incl. a double, Power-ups, Hazards, Random, Online), Online modal (Host/Join, empty code error), Party Modes setup (mode, Party Cup ON, Cup Length, PHONES AS PADS room with QR), Daily, Story map, Story Log, Story Rewards, opening cutscene, chapter 1 cutscene, chapter 1 match, Chapter Clear.
- Matches: Move Lab (practice), Workshop "Play It" custom table (quit), Team Feast (1v1, quit at 2-1), Daily Hot Dumpling (won, 3 rounds), Story ch1 (cleared, 2 stars). 0 to 1 wins before the Daily, so I judged the new-save experience.
- Odd sequences tried: Escape from Trials, Escape twice from Challenges, clicking buttons behind an open modal (Story Log), clicking Quit via mouse and via keyboard (ArrowUp+Enter), clicking Play with zero players seated in Party Modes, clicking Play It on an empty Workshop table, joining an online room with an empty code.
- Did NOT test: phone mode (harness is desktop), Gauntlet run itself, Trials fights, Spicy, Dessert, Second Helpings (locked), Story comic panels (need ch4/ch8), Online host with a real friend.

## What worked for me
- **Stability is excellent.** Zero JS errors, no soft-locks, every Escape returned somewhere sensible, nothing double-fired when I spammed clicks.
- Refusal messages are clear: Pantry "need 15 more 🪙", Shiny "needs Mastery Lv 3", Join "Room codes are 4 letters."
- Shiny two-tap confirm works ("BUY SHINY? tap again: 300 🪙").
- Free Play setup now explains each bot level in a single line at the bottom ("HARD: leads its throws, dodges and parries").
- Daily countdown names rival levels ("3 rivals (normal, easy, easy)").
- Results/Chapter-Clear screens are information-rich (tokens, mastery, achievements, medals) and mostly well laid out.
- Twist picker is clear and the double-twist labels explain themselves in the footer line after selection.
- Party Cup / Phones-as-Pads flow is quick and the QR room is easy to understand.
- Workshop is simple, fun to poke, and saving it awarded an achievement toast ("Table Maker unlocked!").
- Gallery power info now shows reach and cooldown ("reach 207 · every 1.6 s").

## 🧾 Exactly what would make this a 9/10 for me
1. **Fix Story Rewards overflow** (Story map → 🎁 REWARDS). What: the modal has 13 entries but only ~10 fit; the bottom rows spill outside the modal frame and off-screen. Where: Story Rewards modal. How: make the list scroll (mouse wheel, touch drag, Up/Down keys) inside a fixed-height frame, or use 2 pages with PAGE ▶; keep the frame bottom padding at 24 px. Score impact **+0.6**.
2. **Make QUIT ask for confirmation** (Pause → ✖ QUIT). What: one click or Up+Enter drops a match in progress straight to the setup menu, with no confirm, in Free Play/Party/Workshop matches. The brief says a quit confirmation exists. How: first tap turns the button into "QUIT? tap again" (reset when resuming or after 3 s); same for Restart. Score impact **+0.5**.
3. **Fix the Story pre-match cutscene SKIP**. What: pressing SKIP ▶▶ on the chapter-1 intro dumped me back to the story map, so I had to press PLAY again (the match then started with Enter). How: SKIP should skip straight into the match. Score impact **+0.3**.
4. **Fix remaining overlaps** (see issue table #4–#12): Results "THIS MATCH" panel over the ranking box, Story "SCENE" button over the panel border and "Not cleared yet", Workshop hazard/surface chips over start-spot circles, Party Modes ribbon over the seated kaiju heads, Your Room panel touching top and bottom of the screen. Score impact **+0.5**.
5. **Make the "FIRST SERVICE" counter honest** (Title). It rose from 0/6 to 1/6 after I only opened Settings/Back-up and never did anything the list names; the three lines shown ("Finish the Practice", "Clear ch2", "Win a match") don't say which goal moved. How: show the 6 goals as ticks or tell the player what was just completed with a toast. Score impact **+0.3**.
6. **Keep the bot-level explanation visible when a twist is chosen** (Free Play). It is replaced by the twist text, so the new BOT LEVEL explanation disappears exactly when a tinkerer is changing options. How: show both lines or put the twist text above. Score impact **+0.2**.
7. **Make locked content consistent**: Sloba (a kaiju locked behind Story ch2) appears as a Daily rival, which reveals the lock and contradicts "Clear Story ch 2 → Sloba" on the title. Table counts differ (Party Modes "ALL 14", Online room "ALL 13"), and the empty "My Table 1" sits in the "ALL" rotation. Score impact **+0.3**.
8. **Reduce font-size jitter and tiny text**: twist picker descriptions shrink to ~10 px on Fists Only / Mirror Moves; Help → Modes twist paragraph is ~11 px; Gallery rewards ladder is only tiny icons with no ✔/legend; Setup button labels like "MY TABLE 1" are small. How: use a consistent minimum of 14 px, wrap rather than shrink. Score impact **+0.3**.
9. **Make the Gallery Mastery ladder readable**: show each reward as icon plus label (e.g. "Lv2 ✨ Spark colour") with ✔/🔒 and the level number beneath. Score impact **+0.2**.
10. **Add a toast when a party/Cup option is silently overridden**: with Party Cup ON, the MODE button still reads TEAM FEAST but the Cup plays Classic → Golden → Classic. How: grey the Mode button and label it "Cup picks modes". Score impact **+0.2**.

## 🔍 Every issue I saw (exhaustive)
| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | **major** | Story → 🎁 REWARDS | "STORY REWARDS" modal overflows: the last two rows (Play 3 matches / Beat chapter 2, and more below) hang outside the modal frame and are cut off by the screen bottom; 13 rewards cannot all be seen, no scroll. | art-src/.playtest/r9-7110/shot-102.png | Scrollable list or paging; increase frame height. |
| 2 | **major** | Pause menu → ✖ QUIT | Quit takes effect on the first click/Enter with no confirmation (tried mouse and ArrowUp+Enter, in Workshop match and Team Feast round 4 at 2-1). Contradicts "quit confirmation resets when you resume". | art-src/.playtest/r9-7110/shot-49.png (pause), shot-80.png (landed on Party menu) | Two-step "QUIT? tap again". |
| 3 | **minor** | Story chapter intro | SKIP ▶▶ on the chapter-1 cutscene returned to the map instead of starting the match; needed a second PLAY. | art-src/.playtest/r9-7110/shot-106.png | Skip into the match. |
| 4 | **minor** | Daily results ("DAILY CHALLENGE COMPLETE!") | Bottom-left "📋 THIS MATCH" panel (x 24–320) overlaps the left edge of the ranking text box (x from ~306). The panel is also 14 lines tall in the corner and crowds the SHARE button. | art-src/.playtest/r9-7110/shot-94.png | Move the panel left/lower, or shrink the ranking box. |
| 5 | **minor** | Story map, chapter panel | "🎬 SCENE" button (x ~1097–1247) touches/overlaps the panel's right border and sits on the same row as "Not cleared yet", crowding the "★★★ no rounds lost" legend directly below it. | art-src/.playtest/r9-7110/shot-98.png | Put SCENE under the rival list, or reduce its width. |
| 6 | **minor** | Workshop | Hazard chip ("✋ Giant hand", top right) covers the top-right white start-spot circle; the bottom-left surface label ("🍽 Sunday Roast") covers the bottom-left start spot; the middle-left/right start spots are half under the tablecloth edge. | art-src/.playtest/r9-7110/shot-41.png | Move chips outside the table rectangle. |
| 7 | **minor** | Party Modes with seats filled | The "BLUE TEAM" pill overlaps the top of the seated kaiju's head (Dumplord, Gobzilla ears). | art-src/.playtest/r9-7110/shot-86.png | Lower the sprite 10 px or shrink the pill. |
| 8 | **minor** | PHONES AS PADS → "YOUR ROOM" | The panel runs to y=3 at the top and y=716 at the bottom (touching screen edges); "Waiting for at least one friend to join..." is 4 px from the bottom edge. TV mode has no explanation. | art-src/.playtest/r9-7110/shot-88.png | Reduce vertical padding or shrink the QR/code row; add a one-line TV mode hint. |
| 9 | **minor** | Free Play setup, twist chosen | The BOT LEVEL explanation line is replaced by the twist text, so the new fairness explainer disappears. | art-src/.playtest/r9-7110/shot-61.png | Show both lines. |
| 10 | **minor** | Twist picker | Card text sizes jump: "FISTS ONLY" and "MIRROR MOVES" descriptions shrink to ~10 px while neighbours are ~14 px; big dead space below the grid. Double names like "⚡⚡ KAIJU + CASTLE" abbreviate the real combo (Mini Kaiju + Bouncy Castle) and the same short label shows on the setup button ("KAIJU + CASTLE"), which reads as "Kaiju Frenzy"? | art-src/.playtest/r9-7110/shot-57.png | Fixed font size with wrapping; use full names. |
| 11 | **minor** | In-match intro text | The tip line ("💡 The Ladle and Rolling Pin keep going…" / "In Team Feast your cutlery passes…") and the Daily line sit on top of cups, ice-cream cups and the watermelon; text still readable thanks to its outline but visually noisy; in the Daily the countdown "2" overlaps the ant trail. | art-src/.playtest/r9-7110/shot-31.png, shot-74.png, shot-90.png | Put intro text in a dark strip. |
| 12 | **minor** | Round end (Team Feast round 2) | "⏪ INSTANT REPLAY" banner overlaps a toaster at top; "REVENGE IS SWEET!" popup is pinned to x=25 (left screen edge) and sits next to a faded "DUMPLORD skewered YOU" ghost line, so two messages overlap in the same band. | art-src/.playtest/r9-7110/shot-78.png | Stack popups, limit to one per band. |
| 13 | **minor** | Title "NEXT UP" | "FIRST SERVICE 1/6" moved from 0/6 after I only opened Settings → Back up, never starting Practice; the goal shown doesn't reveal which of the 6 goals moved. Box also overlaps the fork art. | art-src/.playtest/r9-7110/shot-15.png (title after) | Show tick list / toast. |
| 14 | **minor** | Daily | Sloba, a kaiju locked behind Story ch2 ("Clear Story ch 2 → Sloba" on the title), appears as a Daily rival. | art-src/.playtest/r9-7110/shot-90.png | Don't field locked kaiju, or call it a preview. |
| 15 | **minor** | Party Modes / Online room | Table counts disagree: "TABLE: ALL 14" vs online room "TABLE: ALL 13 (ROTATE)". The empty custom "My Table 1" was picked in the rotation for round 4 of Team Feast. | art-src/.playtest/r9-7110/shot-73.png, shot-88.png | Exclude empty workshop tables from ALL, make counts match. |
| 16 | **minor** | Party Modes | With Party Cup ON, the MODE button/header still says TEAM FEAST although the Cup plays CLASSIC → GOLDEN → CLASSIC. Cup length default flips between 6 and 3 games with no reason (6 shown with Cup OFF, "3 games" after enabling). | art-src/.playtest/r9-7110/shot-86.png | Grey the Mode button while Cup is ON. |
| 17 | **minor** | Party Modes | Pressing PLAY with nobody seated auto-adds P1 plus one bot (a 1v1 "Team Feast"); no warning that a team mode is only 1v1. | art-src/.playtest/r9-7110/shot-74.png | Prompt "Add more players?" |
| 18 | **polish** | Party Modes / Free Play | Back button says "◀ MODES" even when reached from the Free Play card or after Quit from a Workshop match; Closing the PHONES AS PADS room sends you to the title, not back to setup, losing the setup context. | art-src/.playtest/r9-7110/shot-56.png | Return to previous screen. |
| 19 | **polish** | Story modals | While Story Log is open, clicking the REWARDS button behind it moves the focus ring to that background button (visible in the screenshot) even though the modal stays. | art-src/.playtest/r9-7110/shot-100.png | Block focus/pointer behind modals. |
| 20 | **polish** | Settings | Two columns are very tight: left column last row (NAME TAGS) bottom edge is ~4 px from the KEYBOARD CONTROLS / BACK UP buttons; 13 toggles in one grid is dense. | art-src/.playtest/r9-7110/shot-9.png | Group into Audio / Gameplay / Accessibility sections. |
| 21 | **polish** | Trials | The focused first card draws a larger outline than the others so the left column looks mis-aligned. 8 cards leave empty space at the bottom while the star rule line at the top is tiny (~13 px). | art-src/.playtest/r9-7110/shot-3.png | Equal focus ring; larger rule text. |
| 22 | **polish** | Records | Last page contains a single achievement ("Dinner Party Animal"); stat values in the left panel sit lower and bigger than their labels (baseline mismatch); all 18 per page cards identical size for 37 items so page 3 is almost empty. | art-src/.playtest/r9-7110/shot-36.png | 19 per page or 12 per page; align baselines. |
| 23 | **polish** | Gallery | Mastery rewards ladder is a row of tiny emoji with locks and no labels or ✔ marks (brief said ✔/🔒); can't tell what Lv3 gives other than Shiny. | art-src/.playtest/r9-7110/shot-24.png | Labelled steps. |
| 24 | **polish** | Gallery colours row | 21 colour swatches in one row; locked ones are identical padlocks, so you can't tell which colour is which. | art-src/.playtest/r9-7110/shot-24.png | Show faint swatch colour and name on hover. |
| 25 | **polish** | Help → Basics | The MOVES block is a dense 8-line paragraph at ~13 px with no icons. Help → Modes twist paragraph is ~11 px. | art-src/.playtest/r9-7110/shot-16.png, shot-22.png | Split into cards. |
| 26 | **polish** | Help → Tables | Locked tables' descriptions wrap to 2 lines at ~13 px grey on dark; low contrast. | art-src/.playtest/r9-7110/shot-21.png | Brighter text. |
| 27 | **polish** | Move Lab | The Move Lab "tryable power" hint events log the KAIJU power twice ("YOU used a KAIJU power" ×2 in one 2 s window); Escape returns to Gallery without remembering the selected kaiju's position. | (harness log of /act power; screenshot art-src/.playtest/r9-7110/shot-30.png) | De-duplicate event. |
| 28 | **polish** | Harness / accessibility | `/look` returns an empty `texts` list for Online/Join lobby and for the Back up modal, so screen readers/automated checks can't read them. | art-src/.playtest/r9-7110/shot-67.png | Expose DOM text. |
| 29 | **polish** | Chapter Clear | The "✅ Chapter 2 unlocked…" line is centered as a block but the check emoji pushes the first line off-centre vs. the "A hard-fought plate" line above. | art-src/.playtest/r9-7110/shot-111.png | Centre both lines. |
| 30 | **polish** | New-save pacing | Daily win gave +175 🪙 and 3 achievement payouts in one match (coins 25 → 245) while the shop's first item costs 40: first win shows huge rewards, then Story ch1 only +22. Reward scale is inconsistent. | art-src/.playtest/r9-7110/shot-94.png, shot-111.png | Smooth the reward curve. |

## 🔠 Text and layout check (do this on EVERY screen you visit)
| Screen | Result | Screenshot |
|---|---|---|
| Title | OK (NEXT UP box overlaps fork art but no text overlap) | shot-1.png, shot-15.png |
| Challenges modal | OK | shot-2.png |
| Trials | OK (focus ring size difference only) | shot-3.png |
| Pantry | OK, refusal text OK | shot-6.png, shot-7.png |
| Settings | OK but very tight bottom rows | shot-9.png |
| Keyboard Controls | OK | shot-10.png |
| Back up / Move save | OK | shot-12.png |
| Help Basics | OK, small text | shot-16.png |
| Help Cutlery | OK | shot-20.png |
| Help Tables | OK, low contrast locked text | shot-21.png |
| Help Modes | OK, twist paragraph tiny | shot-22.png |
| Gallery (unlocked kaiju) | OK; ladder icons tiny | shot-24.png |
| Gallery Shiny confirm / refusal | OK | shot-25.png, shot-29.png |
| Gallery locked kaiju | OK | shot-26.png |
| Move Lab | Tip text over table props | shot-30.png, shot-31.png |
| Records (pages 1-3) | OK, last page nearly empty | shot-34.png, shot-36.png |
| Workshop | Chips over start spots (#6) | shot-38.png, shot-41.png, shot-45.png, shot-46.png |
| Pause menu | OK | shot-49.png |
| Free Play setup | OK; bot explainer replaced by twist text | shot-56.png, shot-59.png, shot-61.png, shot-66.png |
| Twist picker | Font-size jitter, tiny text (#10) | shot-57.png |
| Online modal / Join modal | OK | shot-67.png, shot-68.png, shot-70.png |
| Party Modes setup | Ribbon over heads when seated (#7) | shot-73.png, shot-86.png |
| Phones as Pads room | Panel touches top/bottom edges (#8) | shot-88.png |
| Team Feast round | Intro text over props | shot-74.png |
| Round end popups | Overlapping banners (#12) | shot-78.png |
| Daily countdown | Text over table props | shot-90.png |
| Daily results | THIS MATCH panel overlaps ranking box (#4) | shot-94.png |
| Story map | SCENE button crowding (#5) | shot-98.png |
| Story Log | OK (empty state friendly) | shot-99.png |
| Story Rewards | **CUT OFF / overflow (#1)** | shot-102.png |
| Opening cutscene | Caption small but OK | shot-96.png |
| Chapter 1 cutscene | OK | shot-105.png |
| Chapter Clear | OK | shot-111.png |

## The single biggest structural problem
There is no consistent "modal/panel container" system: several screens place content by absolute coordinates and the content simply grows past its frame (Story Rewards overflow, THIS MATCH panel over the ranking box, SCENE button on the panel border, Your Room touching the screen edges, Workshop chips over start spots). Every new feature (a new reward, a longer achievement list, a new chip) risks the same breakage, and I found five instances in one session. Alongside that, destructive actions are not guarded consistently (Quit has no confirm) and feedback about progress ("FIRST SERVICE 1/6") isn't tied to a visible cause.

A shared container with padding, scrolling/paging and focus trapping would fix the whole family at once, and the QA bar of 9.0 would then be defensible.

## Big change proposals (2–3, most important first)
### Proposal 1: Shared scrollable panel component
- **Problem it solves:** Story Rewards overflow (#1), results panel overlap (#4), Your Room edges (#8), Records near-empty last page (#22).
- **How it would work (detailed design):** One `Panel` with fixed padding of 24 px, header, a scroll body (wheel, touch drag, Up/Down, PgUp/PgDn) and a footer bar. Body items measured at layout time; if the content exceeds the body height show a thin scrollbar and a "▼ more" hint. Focus is trapped: while a panel is open, nothing behind it can take focus or clicks. Use it for Story Rewards, Story Log, Records, Your Room, Results side-panels.
- **Example moment:** Open Story → REWARDS: 13 cards with a scrollbar; scroll with arrow keys; Close is always visible at the bottom.
- **Rewards / progression hooks:** none; pure polish, but collection screens feel complete.
- **Risks and edge cases:** gamepad/phone scrolling; make sure /look exposes the text.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 2: Guarded destructive actions with a "tap again" pattern
- **Problem it solves:** Quit with no confirm (#2), Restart, Shiny/Pantry already do it right.
- **How it would work:** Reuse the Shiny "tap again" button: first tap changes the label to "QUIT? tap again" (amber), second tap within 3 s confirms, anything else (Resume, 3 s, Escape) resets it. Apply to Quit, Restart, "Close room" (online/party), Workshop CLEAR, Workshop NEXT SLOT when unsaved.
- **Example moment:** Mid-match at 2-1, I press Esc → Quit by accident; the button turns amber and I back out.
- **Rewards / progression hooks:** protects Story/Gauntlet progress and Party Cup runs.
- **Risks and edge cases:** keyboard users need Enter-Enter; phone users need a larger hit area.
- **Size:** S
- **Score impact for me:** +0.5

### Proposal 3: "What just changed" progress toasts and a goal checklist
- **Problem it solves:** the unexplained FIRST SERVICE 0/6 → 1/6 (#13), huge reward spike (#30), hidden unlocks.
- **How it would work:** On the title, replace the 3-line NEXT UP box with a 6-item checklist (✔ done, ○ pending) that tooltips the reward. Any time a goal completes, show a top-right toast "FIRST SERVICE 1/6 — Visited Settings (+10 🪙)". Smooth rewards: first match +60, later matches +20–40.
- **Example moment:** After I close the Back up modal: "✔ Backed up your save · FIRST SERVICE 1/6".
- **Rewards / progression hooks:** adds a gentle tutorial path and a sense of progress for new saves.
- **Risks and edge cases:** toast cap of 3 on screen must still apply.
- **Size:** M
- **Score impact for me:** +0.4

## How this round's new features felt
- **Fairness (1.4 s bot grace, bot-level explainers, Daily rivals):** Bot-level explainer in Free Play is clear and easy to find (bottom line), but disappears when a twist is active. Daily countdown line showing rival levels works but the line is very long and sits over table props. I could not verify the 1.4 s grace precisely via polling. No round-end "how you went out" banner appeared on the Daily/Team Feast screens I inspected (only the "DUMPLORD skewered GOBZILLA" caption), so it may only show in some modes.
- **Feedback (toasts, pantry payouts, second-tap buys):** Pantry orders show "· 40 🪙" payouts, buy messages are great. I saw achievement lines inside the results panel (First Bite +30, Not It! +30, Daily Special +30) but did not catch the top-right toasts because the game is frozen between commands.
- **New-save locks (4 kaiju, 2 tables):** Gallery shows 12/20 kaiju and 13/18 tables with clear "Unlock: Win 1 match in any mode (you have 0/1)" text. It feels good and gives goals. I also noticed Daily still fields a locked kaiju (Sloba).
- **Story comic panels / Phase 2 banner / Kid Mode:** Not reached (they need ch4/ch8).
- **PHONES AS PADS:** Fast and clear, big QR, code, "Everyone on the couch: scan with your phone camera". Layout is cramped at the screen top and bottom (#8); TV mode toggle lacks explanation. Party Cup toggle ON/OFF works, hint line updates ("Party Cup = 3 games: CLASSIC → GOLDEN → CLASSIC · final ×2 · ON: PLAY starts the Cup").
- **Gallery reach/cooldown + Mastery ladder:** Reach and cooldown are shown ("reach 207 · every 1.6 s"). The ladder is only icons, no ✔ in a fresh save; unclear and tiny.
- **Fixes from last round:** "Quit confirmation resets when you resume" could not be validated because there is no confirmation at all (#2). Kid mode, practice swipe and phone twist button not touched. "At most 3 pop-ups" held in the round-end I saw (2 pop-ups + replay banner but overlapping, #12). Team Feast results grouped by team: not reached (quit before the results).
- **Text/layout audit:** Desktop is mostly clean, but I found the overlaps in the table above that the audit missed.

## Bugs that block play
- None block play. Highest-impact bugs: Story Rewards overflow (cannot see all rewards), Quit with no confirmation (can lose a match or Cup progress by accident), and Story chapter intro SKIP returning to the map.
