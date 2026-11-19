# Playtest evaluation: The First-Timer (newbie)

**Fun score: 7.0 / 10** (charming art, readable HUD and generous rewards, but a new player is thrown between three different "how do I start" paths, the 1-minute Practice does not finish cleanly, and several small clarity and text-collision problems keep it below the 9.0 bar.)

> Screenshot paths below are relative to `C:\Users\Pat\kitchen-kaiju\` (folder `art-src\.playtest\r8-7104\`, files `shot-N.png`).

## What I did
- About 118 harness commands over a fresh save, acting as someone who has never seen the game. Port 7104. `/errors` checked at the start, middle and end: always "none".
- **Title** (shot-1): read the NEXT UP box, then opened **HELP** and read all five tabs: BASICS, CUTLERY, TABLES, MODES, PRACTICE (shot-2..5).
- **1-minute Practice** (shot-6..11): walked, ate crumbs, picked cutlery up, KO'd the dummy, went KAIJU, used the power. Reached 7/8. The step "SWIPE up close" never ticked in the harness (see issue #6). Paused (Esc) and QUIT; this dropped me on the HELP screen.
- **Free Play** (shot-13..20): joined by clicking a seat, added 2 bots, cycled BOT LEVEL, played a full 3-player match on EASY (lost 2 rounds, won 1, final place 2nd). Result screen and match receipt (shot-18, 20). Later played a 1v1 vs SQUIDGEON on NORMAL (shot-50..53), including my own stomp then power. Stopped after round 6 because the 1v1 had gone to "first to 5".
- **Story** (shot-21..27): opening video, chapter 1 intro cutscene, Head Chef chat, played chapter 1 (won 3 stars, +75 tokens, Mastery Lv 2), Chapter Clear screen, then the 📜 STORY LOG.
- **Gallery** (shot-28), **Move Lab** (shot-29, 30), **Records** (shot-31), **Pantry** (shot-32, 33: bought Toffee colour), **Settings** (shot-34), **Table Workshop** (shot-35).
- **Party Modes** (shot-36..39): turned PARTY CUP ON, started it, paused, and used the double-QUIT confirm.
- **Daily** (shot-41..46): played a full Hot Dumpling Daily and lost (FAILED screen).
- **Challenges** popup (shot-47), **Online** dialog (shot-48), title again (shot-49).
- Matches: 5 started (1 Free Play 3P, 1 Story chapter, 1 Daily, 1 Free Play 1v1 unfinished, plus Practice and Move Lab). 2 won (Free Play 3P round-level loss, Story ch 1 won). Roughly 35 minutes of game time.

## What worked for me
- **Art and tone are excellent.** The title (shot-1), the cutscenes (shot-21, 23), kaiju portraits (shot-28) and the result-screen kaiju shouting at the camera (shot-20, 46) all feel like a finished product and made me want to keep going.
- **The YOU marker** (`▼ YOU` over my kaiju, shot-7 and shot-51) solved "which one am I?" instantly in matches.
- **Practice step prompts** at the bottom-left (`PRACTICE 4/8 👉 Knock out the dummy`) are short, clear and tick off with a `✔` banner next to the action. The "BELLY FULL! PRESS E / Y → KAIJU" prompt over my kaiju (shot-9) is exactly what a beginner needs.
- **Pre-round tips** ("Red square = spatula incoming. Shove someone in and step out!") teach table hazards at the moment they matter (shot-16).
- **Match receipt** (shot-20) is great: tokens earned, Mastery progress, the First Service step I ticked, "Knocked out by", and a coaching tip ("Step out of the ring before each stomp").
- **Chapter 1 is a real tutorial**: easy rival (Crabbage), a spoken tip, 3 stars on the first try, generous +75 tokens, clear "Chapter 2 unlocked" (shot-26).
- **Locked things say how to open them** (TABLES help tab: "Beat Story chapter 6...", Second Helpings: "clear chapter 6 to open").
- **Quit-twice** on a Party Cup works and tells me why ("QUIT (ends the Cup / run)" then "Tap QUIT again to really end it", shot-39).
- **Records**: achievements show progress bars (4/25, 27/100) and the footer tells me the next-closest one (Rampage 67%).
- No JS errors at all across ~118 commands.

## 🧾 Exactly what would make this a 9/10 for me
1. **One clear "start here" path that always works.** WHERE: title screen. WHAT: Make the first launch show ONE highlighted big button, "▶ PLAY: 1-MINUTE PRACTICE", and keep it (not remove it) until Practice is genuinely finished. Today the `NEW HERE?` button disappears after one visit (shot-49 vs shot-1) while NEXT UP still says "Finish the 1-minute Practice" (still unfinished). HOW: Practice button stays until 8/8; after finishing, auto-promote "STORY ch 1" with a pulse. Hide the other 6 buttons' sub-labels' density on first run. SCORE IMPACT: +0.5.
2. **Make Practice finish-able and forgiving.** WHERE: Practice. WHAT: Step 7/8 "SWIPE up close" never ticked for me even when 36 px from the dummy with F pressed (could be harness key timing, but a real first-timer will have the same "nothing happens" feeling if the window is narrow). HOW: tick SWIPE if a swipe is pressed within ~250 px of any rival or the dummy; show a small "hold to charge / tap to swipe" icon animation; after 20 s on one step show a bigger hint ("Press F next to the dummy"). Also make QUIT from Practice return to the title (it currently dumps me in HELP) and show "Practice 7/8: come back anytime". SCORE IMPACT: +0.6.
3. **Collapse the Story start into one skippable flow.** WHERE: Story → PLAY. WHAT: On a fresh save I hit an opening video (shot-21), then a chapter 1 intro video (shot-23, subtitle typing "CRABBAGE IS"), then the Head Chef dialogue box (shot-24), then the match. Three screens before any play. HOW: play opening only once, ever; chapter intro cutscenes become a single ~8 s card with a visible `START ▶` that goes straight to the countdown; SKIP CHAT should also be `SKIP ALL`. First chapter 1 should start within 2 clicks of PLAY. SCORE IMPACT: +0.5.
4. **Fix text collisions in the match HUD.** WHERE: in-match banners. WHAT: at the top-left of shot-42 the stacked pop-ups ("STOMP READY!", "SLOBA swiped you", "HOT DUMPLING!", "FIRST BITE!", "DOUBLE SKEWER!", "KAIJU!") overlap each other and are unreadable; at the top (shot-42, 44) "FAST FORWARD ×3 · only bots left" overlaps "SLOBA HAS THE HOT DUMPLING" / "INSTANT REPLAY" with ~1 px gap. HOW: queue pop-ups in a single vertical stack with 28 px spacing and max 2 visible; put banner messages in separate fixed lanes (y=96 hot-dumpling, y=124 fast-forward). SCORE IMPACT: +0.4.
5. **Explain the round/star score line.** WHERE: HUD cards and the round result (`GOBZILLA ☆☆☆ AVOCADRAKE ★★☆`). WHAT: I never learned that the stars are round wins toward "first to 3" and that the 1v1 target silently becomes 5 (shot-51: five star slots, lobby says "First to 3"). HOW: round-start tip "First to 3 round wins"; make the lobby text say "First to 3 (1v1: first to 5)" or make 1v1 consistent; the HUD tooltip/legend on round 1: "★ = rounds won". SCORE IMPACT: +0.4.
6. **Say what each screen is FOR in one short line.** WHERE: Challenges popup, Daily, Party Modes, Records. WHAT: CHALLENGES says "GAUNTLET: pick where your run starts" but never says what a Gauntlet is (shot-47). DAILY drops me straight into a match as a random kaiju with no setup card and ends in "DAILY CHALLENGE FAILED" (shot-46), which is harsh for a first-timer. HOW: each entry gets a one-line plain description ("Gauntlet: survive waves of bots with a few lives. Starters = easy."), Daily shows a pre-match card ("Hot Dumpling today. You play as Salmonster. Win 1 match for the Silver medal."), and the loss screen says "NOT YET: try again, no penalty". SCORE IMPACT: +0.4.
7. **Name consistency and plain wording.** WHERE: everywhere. WHAT: my kaiju is "GOBZILLA JR." in lobby and Story/Gallery but "GOBZILLA" in HUD, result and Records; "Chef Tokens", "🪙", "Mastery Lv 2 Line Cook", "KAIJU power", "STOMP", "belly" are never glossed in one place for a new player; the result footer says "1 / START rematch · Esc menu" on a mouse screen. HOW: one name everywhere; first-run glossary card on Help BASICS with 6 icons (belly, STOMP, KAIJU, crumbs, tokens, mastery). SCORE IMPACT: +0.3.
8. **Keep tiny text readable.** WHERE: title top buttons (⚙ SETTINGS / ❓ HELP… about 10 px, shot-1), NEXT UP box (shot-1), Help BASICS body (shot-2), Help MODES twists (shot-5), Pantry footnote (shot-32), pause "Tap QUIT again" (shot-39, red on dark), Story Log lines (shot-27). HOW: minimum 14 px body, 16 px for buttons; Help BASICS and TWISTS split into two pages instead of tiny walls of text. SCORE IMPACT: +0.3.
9. **Shop clarity and safety.** WHERE: Pantry. WHAT: a single click bought Toffee for 40 🪙 (177 → 137) with no confirm and no "equip" hint (shot-32/33); two different outline colours (yellow, blue, green) are unexplained. HOW: confirm ("Buy Toffee for 40? YES/NO") and, after buying, "Equip in Gallery" button; a legend "yellow = you can afford it, blue = on sale". SCORE IMPACT: +0.2.
10. **Gauntlet/Kid Mode/Settings copy up to date.** WHERE: Settings. WHAT: KID MODE still reads "Story: easier rivals, 1-line chats, bigger result text" but the round brief says it also eases Free Play, Party and Daily. HOW: update the sub-line to list every mode it affects. SCORE IMPACT: +0.1.

## 🔍 Every issue I saw (exhaustive)
Severity: blocker / major / minor / polish.

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Title, first run | `👋 NEW HERE? 1-MINUTE PRACTICE ▶` is the only beginner pointer; it vanishes after one visit even though Practice is unfinished, while NEXT UP still says "Finish the 1-minute Practice (+20 🪙)". | shot-1, shot-49 | Keep until Practice 8/8; promote Story ch 1 afterwards. |
| 2 | major | Title | NEXT UP box is a dense 3-line block of ~12 px text mixing a 6-step checklist ("FIRST SERVICE 0/6"), a story goal and a colour goal. A first-timer cannot tell which is the instruction. | shot-1 | One big line only: the very next step. |
| 3 | minor | Title | The row of top-right buttons (⚙ SETTINGS, ❓ HELP, 📖 KAIJU…) uses ~10 px text, much smaller than the bottom buttons. | shot-1 | Bigger font or icon + label stacking. |
| 4 | minor | Title | The hint "◀ ▶ choose · ENTER / A / tap to start" is faint grey on a busy art background, sits right above PLAY buttons. | shot-1 | Raise contrast, add a plate behind it. |
| 5 | minor | Help BASICS | MOVES paragraph is a wall of ~13 px text (7 lines) and cuts across 3 ideas; CONTROLS block also long. | shot-2 | Split into pages with icons; larger text. |
| 6 | major | Practice | Step 7/8 `SWIPE up close F / X / SWIPE` never completed for me (F pressed 4 times next to the dummy, 36 px away); I could not finish the Practice and get its +20 🪙. May be harness-key timing, but a real beginner will hit "nothing happens" with no extra hint. | shot-10 | Widen the swipe hit window, add a hint after 20 s, animate the F key. |
| 7 | minor | Practice | The dummy re-arms and respawns during step 4-6, making it unclear what exactly counts ("Knock out the dummy"; I KO'd it 5+ times before the step ticked). | shot-9 | Tick on first KO; show a big "✔". |
| 8 | minor | Practice | Pause → QUIT returns to the HELP screen (not the title); no "Practice not finished" note. | shot-12 | Return to where the player came from; say "Practice 7/8, resume anytime". |
| 9 | polish | Practice | The bottom-left `PRACTICE 0/8 👉 Walk around the table WASD / stick / drag left side` box is small (~13 px) and sits hard against the table frame. | shot-6 | Larger box, centred at bottom. |
| 10 | minor | Free Play setup | The back button is labelled `◀ MODES` but goes to the title screen, not a "modes" screen. | shot-13 | Rename to `◀ BACK` or `◀ TITLE`. |
| 11 | minor | Free Play setup | Empty seats say "click or THROW to join": THROW is jargon before the player has learned it. | shot-13 | "click a seat to join" for mouse; show key only on keyboard. |
| 12 | minor | Free Play setup | After joining, the seat shows `Keys left · A / D` which is not explained (it is the colour/kaiju swap key). | shot-14 | "A / D: change kaiju". |
| 13 | minor | Free Play setup | `BOT LEVEL` button cycles NORMAL→TOUGH→HARD→BRUTAL→EASY→NORMAL on click; going "down" to EASY takes 4 clicks and I accidentally overshot to BRUTAL. No right-click/left-click reverse and no difficulty descriptions. | shot-15 | Left/right arrows or a dropdown with 1-line text ("EASY: bots rarely aim"). |
| 14 | major | Free Play | Lobby shows `First to 3 rounds` but a 2-player match is `firstTo 5` (5 star slots on the HUD). Unexplained rule difference. | shot-51 | Say so in the lobby text, or keep first-to-3. |
| 15 | minor | Free Play | Kaiju name inconsistency: lobby/Story/Gallery show `GOBZILLA JR.`, HUD, results and Records show `GOBZILLA`. | shot-14 vs shot-16 | Use one name. |
| 16 | minor | In match | Pre-round tip text sits over a busy blueberry/pancake area; hard to read (white text with thin outline over dark berries). | shot-16 | Dark plate behind tips. |
| 17 | minor | Match HUD | Round score `☆☆☆ / ★★☆` stars are never explained (round wins). | shot-18 | Round-1 legend: "★ = rounds won". |
| 18 | major | In match | Top-left pop-up stack ("STOMP READY! / SLOBA swiped you / HOT DUMPLING! / FIRST BITE! / DOUBLE SKEWER! / KAIJU!") overlaps itself and is unreadable. | shot-42 | Single queue, max 2 visible, 28 px spacing. |
| 19 | minor | In match | `⏩ FAST FORWARD ×3 · only bots left` overlaps / touches `SLOBA HAS THE HOT DUMPLING` and `⏪ INSTANT REPLAY` (1 px gap). | shot-42, shot-44 | Give each banner its own lane. |
| 20 | polish | Move Lab | The `YOU` marker is hidden behind the big `SEED SPRAY!` label above my kaiju. | shot-30 | Move the marker, or fade it behind power text. |
| 21 | polish | Result screen | Result footer `1 / START rematch · Esc menu` is keyboard-only wording on a screen with clickable REMATCH / MENU buttons. | shot-20, shot-46 | Hide on mouse/touch; show only keys that apply. |
| 22 | minor | Result screen | The bottom "Most KOs / Crumb Monster / Kaiju Lover / Butterfingers" ticker runs along the table edge at ~12 px and is cut by the 3D frame. | shot-20 | Move into the results panel. |
| 23 | polish | Result screen | THIS MATCH receipt text is ~13 px and wraps tightly; "Knocked out by: 🦖 a KAIJU, ✋ the Giant Hand, 👋 swipe" is not obviously a coaching list. | shot-20, shot-46 | Larger text, section headings. |
| 24 | minor | Story | Three sequential intros before the first fight: opening video, chapter intro video, Head Chef chat; each needs its own SKIP. | shot-21, 23, 24 | One flow, one skip. |
| 25 | minor | Story map | The `🎬 SCENE` button crosses the right edge of the chapter panel and sits right next to "Not cleared yet"/"Best: ★★★". | shot-22 | Re-lay out; move SCENE to the panel header. |
| 26 | polish | Story map | Back button labelled `◀ MODES` (goes to the title). Keyboard hint at the bottom (`arrows choose · ENTER play · Q / E kaiju · Esc back`) is tiny grey text. | shot-22 | Rename to BACK; larger hint. |
| 27 | polish | Story Log | Only one short entry at the top of a huge empty panel with ~13 px text. | shot-27 | Smaller panel or a "Chapter 1 ✔ / Chapter 2 …" timeline with portraits. |
| 28 | minor | Gallery | `Collection 58%` on a fresh save and `16/20 kaiju` unlocked read oddly: I have done nothing yet. Mastery line `★★★★★★★ Lv 2 Line Cook (4/100 XP) · next: ⭐ Star on your HUD card` is one run-on sentence. | shot-28 | Explain what counts; split into two lines. |
| 29 | polish | Gallery | `MOVE LAB try its power` button has 11 px sub-label; SHINY button has no price/Mastery requirement shown until pressed. | shot-28 | Show "300 🪙 · Mastery 3". |
| 30 | minor | Records | "Next rank: PREP COOK AT 6 PTS (YOU: 3)" is large display font, crowds the label, and the label/value rows are tightly stacked (about 33 px). | shot-31 | Smaller value font, or move to its own line. |
| 31 | polish | Records | The "👉 Next up: Rampage (67%) … Click any locked one to 📌 pin it …" footer is two long ~12 px lines at the very bottom. | shot-31 | Break into two lines or a tip chip. |
| 32 | minor | Pantry | Clicking an item buys it immediately (40 🪙, 177→137) with no confirm and no "equip" prompt. | shot-32, 33 | Confirm dialog + "wear it" button. |
| 33 | minor | Pantry | Outline colours (yellow on Lilac and Peach, blue on Lifeline, green on Toffee after buying) are unexplained; the bottom note is faint. | shot-32, 33 | Add a legend; raise contrast. |
| 34 | polish | Pantry | Token total changed 152 → 177 between Chapter Clear / Records and the Pantry without a visible reason (25 🪙 from a First Service step, not announced at the time). | shot-26, 32 | Toast "+25 🪙 First Service step". |
| 35 | minor | Settings | Rows are packed with no gap; wide helper text ("Free Play / Party: whoever is behind starts rounds with a fuller belly") fills the full button width. | shot-34 | More row spacing; shorten text. |
| 36 | minor | Settings | KID MODE sub-line says only "Story: easier rivals, 1-line chats, bigger result text" although it also eases Free Play, Party and Daily. | shot-34 | Update copy. |
| 37 | polish | Settings | Bottom hint "Saved on this device · ENTER / tap to change" is only ~12 px. | shot-34 | Bigger. |
| 38 | polish | Workshop | "PROPS: tap one, then tap the table" label above the grid is ~12 px yellow, easy to miss; slot label line is small. | shot-35 | Larger helper text. |
| 39 | minor | Party Modes | The Party Cup help line "🏆 Party Cup = 6 games: CLASSIC → CRUMB RUSH → … final ×2 · switch it ON, then PLAY" runs at y≈660 and nearly touches the KEYS / HOUSE RULES buttons (≈670); it also wraps across almost the full screen width. | shot-36 | Move it above PLAY or into a tooltip. |
| 40 | minor | Party Modes | `MODE ▶ TEAM FEAST` shown but Party Cup ON starts with CLASSIC game 1/6; the Mode button is silently ignored. | shot-36, shot-38 | Grey out MODE when Cup is ON. |
| 41 | polish | Pause (Cup) | `Tap QUIT again to really end it` is red on dark at the very bottom edge. | shot-39 | Move under the QUIT button with higher contrast. |
| 42 | major | Daily | Starts instantly without a setup/rules card, and I am assigned a random kaiju (SALMONSTER). Result headline `DAILY CHALLENGE FAILED` feels punishing for a loss. | shot-41, 46 | Pre-match card; kinder loss wording. |
| 43 | minor | Daily banner | Daily + tip text is two long lines of overlay across the table (`📅 DAILY CHALLENGE · win this match to clear today and keep your 🔥 streak · Picnic Blanket` over the pads). | shot-41 | One line, plate behind. |
| 44 | minor | Challenges | The popup says "GAUNTLET: pick where your run starts" but never says what Gauntlet is; Mains/Desserts/Seconds locked with "clear wave 4/8/12" but no hint of lives or waves. | shot-47 | Add a one-line definition. |
| 45 | polish | Challenges | Trials card: "8 fixed hard fights · 3 stars each · you have 0★" mixes jargon with a tiny reward statement; Checkpoints footnote is small. | shot-47 | Bigger footnote. |
| 46 | polish | Online | The Play Online dialog uses a different font/style from the rest of the game and is invisible to `/look` (DOM overlay), so text layout cannot be audited by the harness. | shot-48 | Use the game's own dialog styling. |
| 47 | minor | Help TABLES | Locked tables show the unlock rule in tiny, dim grey (`Beat Story chapter 6: On the Chopping Block (0/6 cleared)`). | shot-4 | Larger/brighter text. |
| 48 | minor | Help MODES | TWISTS paragraph is one small-font wall of text; last line "Play these from the PARTY MODES card (...[G] or tap the mode to change)" is dim and tiny. | shot-5 | Split into a 2-column list. |

## 🔠 Text and layout check
- **Title** (shot-1, shot-49): top-right buttons small text, NEXT UP dense (issues 2, 3, 4). No overlaps. OK otherwise.
- **Help BASICS** (shot-2): no overlap or cut-off; text small and dense (issue 5).
- **Help CUTLERY** (shot-3): OK, readable, icons aligned.
- **Help TABLES** (shot-4): no overlap; locked descriptions dim (issue 47).
- **Help MODES** (shot-5): OK but small (issue 48).
- **Practice** (shot-6..9, 10, 11): OK; hint box small (issue 9). Pause menu OK (shot-11).
- **Free Play setup** (shot-13, 14, 15): no overlaps; wording issues (10-13).
- **In-match HUD** (shot-16, 17, 18, 19, 41, 43, 44, 51): top-left pop-up stack overlaps (shot-42, issue 18); fast-forward/replay banners touching (shot-42, 44). Everything else OK.
- **Round-end** (shot-18): OK; the bottom feed lines sit on the table edge, readable.
- **Match end** (shot-20, 46): OK, no overlaps; small receipt text and ticker (issues 22, 23).
- **Story cutscenes** (shot-21, 23): subtitle text OK; Head Chef box (shot-24) OK, the spoon art intentionally overlaps the map.
- **Story map** (shot-22): SCENE button crosses panel edge (issue 25); otherwise OK.
- **Chapter Clear** (shot-26): OK, clean.
- **Story Log** (shot-27): OK, mostly empty.
- **Gallery** (shot-28): OK; detail panel tight but nothing cut off.
- **Move Lab** (shot-29, 30): OK; `YOU` marker hidden under POWER label (issue 20).
- **Records** (shot-31): OK; "Next rank" row tight (issue 30).
- **Pantry** (shot-32, 33): OK; footnote faint (issue 33).
- **Settings** (shot-34): OK; rows tight (issue 35).
- **Workshop** (shot-35): OK.
- **Party Modes** (shot-36): help line almost touching bottom buttons (issue 39).
- **Pause with QUIT confirm** (shot-39): OK; confirm text low contrast (issue 41).
- **Daily** (shot-41, 46): OK; banner long (issue 43).
- **Challenges** (shot-47): OK.
- **Online** (shot-48): OK; different style (issue 46).
- Nothing was cut off at the screen edge and no two buttons stacked on each other. The only true text-on-text overlaps are issue 18 and 19 (shot-42, 44).

## The single biggest structural problem
The first ten minutes have no single guided path. Practice is optional, hard to finish, and the button to restart it disappears; Story opens with up to three cutscenes before the first fight; Daily, Gauntlet and Party Modes each throw a different rule set at you with no one-line explanation; and the HUD never teaches that the stars are "round wins to 3 (5 in a 1v1)". A first-timer cannot answer "what should I press next, and what am I trying to win?" without reading the Help tabs, and the Help tabs are dense walls of small text. That gap, not the game itself (which is fun once I understood it), keeps me from scoring a 9.

The other cap is polish: small things like the overlapping pop-up stack, "◀ MODES" meaning "back", inconsistent kaiju names, 10-13 px text in many panels, and one-click purchases add up to a product that looks great in screenshots but feels slightly rough when you read it closely.

## Big change proposals (2-3, most important first)
### Proposal 1: "First Service" guided ribbon
- **Problem it solves:** the unclear start path (issues 1, 2, 6, 7, 8, 24).
- **How it would work (detailed design):**
  - On first launch the title screen shows a single big button, `▶ START HERE: 1-MINUTE PRACTICE`, with the other six buttons dimmed to 60 % and a small "you can skip this" link.
  - Practice becomes a 3-screen flow: (1) 20 s "move + crumbs", (2) 20 s "throw + swipe", (3) 20 s "stomp + KAIJU". Each step ticks at the first valid action and the checklist at the bottom-left uses 18 px text. After 20 s on one step a hint animates the key.
  - On completion: a full-screen "PRACTICE DONE +20 🪙" card with two buttons: `▶ STORY CH 1` (pulsing) and `FREE PLAY`.
  - Quitting Practice returns to the title with a "Resume 7/8" button.
  - The "FIRST SERVICE" 0/6 checklist moves into a collapsible ribbon on the title (one line, tap to expand), not three lines of text.
- **Example moment:** I open the game, press START HERE, ~50 s later I get "+20 🪙" and a pulsing STORY button; I never have to read HELP.
- **Rewards / progression hooks:** +20 🪙 for Practice, plus the existing First Service rewards shown as toasts the moment they tick.
- **Risks and edge cases:** keyboard vs touch hints must switch; players who skip Practice should still see a nudge once.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 2: Mode explainer cards and a plain-language setup
- **Problem it solves:** issues 6, 11-14, 40, 42, 44: Daily/Gauntlet/Party have no explanation and defaults are confusing.
- **How it would work (detailed design):**
  - Every mode entry (Daily, Gauntlet/Trials, each Party Mode, Cup) shows a 2-line "card" before the match: one line "What it is", one line "How to win", plus a `PLAY` and `BACK` button. First time only; later a small `?` button.
  - Daily's card names the kaiju I will play, the table, the rule, and the medals ("Bronze for playing, Silver for winning"). The fail screen says "Not yet: try again" and shows tokens/progress, not "FAILED".
  - Free Play setup gets plain-language bot levels with one-line descriptions on hover/tap and left/right arrows; lobby text reads `First to 3 rounds (1v1: first to 5)` or the 1v1 uses 3 too.
  - Party Cup ON greys out MODE and shows the 6-game list in a small panel above PLAY instead of a long line near the bottom buttons.
- **Example moment:** I tap DAILY, see "Hot Dumpling · You: Salmonster · Win once for Silver", press PLAY, lose, and see "Not yet! Bronze earned (+20 🪙). Try again?".
- **Rewards / progression hooks:** none new; this removes friction.
- **Risks and edge cases:** extra click before every Daily; make the card skippable after the first view.
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: HUD banner lanes and text-size pass
- **Problem it solves:** issues 3-5, 16-23, 28-31, 35, 37, 38, 41, 47, 48 (collisions and tiny text).
- **How it would work (detailed design):**
  - In matches: fixed lanes for banners: y=96 mode status (hot dumpling / golden spoon), y=124 system banner (fast-forward / replay), y=150-260 left column for event pops with a queue of 2 and 28 px spacing. Pop-ups older than 1.5 s fade out before a third appears.
  - Global minimum text size: 14 px for helper copy, 16 px for buttons, 18 px for step hints. Help BASICS and MODES split into two pages each. Title top-right buttons use the same size as the bottom buttons.
  - Move the Most KOs / Crumb Monster ticker inside the result panel, and the "1 / START rematch" key hint is shown only when a keyboard was used last.
  - Buying in the Pantry gets a confirm + "equip" step.
- **Example moment:** Hot Dumpling round: "SLOBA HAS THE HOT DUMPLING" sits at the top, "FAST FORWARD" below it, and my KAIJU/STOMP pops queue neatly on the left.
- **Rewards / progression hooks:** none.
- **Risks and edge cases:** some panels (Settings, Records) need layout rework to fit larger text.
- **Size:** M
- **Score impact for me:** +0.6

## How this round's new features felt
- **TOUGH bot level:** it appears in the BOT LEVEL cycle (NORMAL → TOUGH → HARD → BRUTAL → EASY); I cannot judge fairness as a newbie, but the cycle order is confusing (shot-15) and there is no description of any level. EASY bots still beat me in the 3-player match (as a player who was driven by the harness's "attack" command), so EASY is a reasonable default for a first match, but I want the game to default to EASY for new saves (it defaulted to NORMAL).
- **Giant Hand dodge:** I got knocked out by the Giant Hand ("GOBZILLA got flicked by the GIANT HAND", shot-18) in my first Free Play match, and the Help BASICS text explains "DASH just as it reaches you". Good that it is documented, but nothing in the match warned me visually in the screenshots I took; a first-timer will assume it is random.
- **Kid Mode:** I did not enable it. The Settings sub-line (shot-34) still only mentions Story, which contradicts the new behaviour (issue 36).
- **Shiny forms:** the SHINY button in the Gallery exists (shot-28) but shows no price or Mastery requirement on the button; with 177 tokens and Mastery Lv 2 I could not tell why I could not buy it. Add "300 🪙 · Mastery 3" to the button.
- **Party Cup ON/OFF:** the switch is clear (PARTY CUP OFF/ON, shot-36), and starting the Cup with Team Feast selected silently starts with Classic (issue 40). The long Cup description near the bottom buttons is cramped (issue 39). The double-quit works and the text explains it, but the second prompt is tiny and red (issue 41).
- **Story log:** a nice idea (shot-27) but it is almost empty after chapter 1 and the text is small. Locked Second Helpings/Dessert tabs say "clear chapter 6 to open" / "finish the Grand Feast" which is exactly what I needed.
- **Boss phase 2 / chapter 4 gentler / TWIST picker / Workshop UNDO:** did not reach a boss or use TWIST; the Workshop screen shows UNDO and HAZARD/SURFACE buttons clearly (shot-35).
- **YOU marker:** works well (shot-7, 51).
- **Plates behind result text:** the results panel on a busy picnic cloth (shot-46) stays readable; the daily tip text in shot-41 has no plate and is harder to read.
- **Receipts with achievements and First Service:** very good (shot-20, 46), the best onboarding element in the game. They should be bigger.
- **Move Lab:** Esc leaves as promised; the label at the bottom explains what to press (shot-29, 30).
- **Mastery cosmetics:** I only saw "next: ⭐ Star on your HUD card" in the Gallery; the star never appeared on my HUD during my matches because Mastery 1 to 2 earns the star only for Lv 2+ (the HUD had a pink ★ at the first card in shot-7, which is probably it).
- **Pantry / weekly orders:** clear, with progress bars (shot-32); the one-click purchase (issue 32) is my only complaint.

## Bugs that block play
- None blocking. No JavaScript errors (`/errors` returned "none" at the start, middle and end).
- Possibly blocking for a real first-timer: Practice step 7/8 `SWIPE up close` never completed during my session (issue 6), which prevented finishing the 1-minute Practice and its +20 🪙; I could not tell whether this was a harness limitation with keyboard input or a real window problem.
