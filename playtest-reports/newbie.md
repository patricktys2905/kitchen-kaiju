# Playtest evaluation: The First-Timer (profile "newbie", port 7104)

**Fun score: 7.5 / 10** (charming art, great feedback after matches and an excellent practice card, but the first 3 minutes hide who "I" am, the hazard that kills new players is explained only AFTER they die, and several menu/label choices assume prior knowledge.)

> Screenshots live in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r7-7104\shot-N.png` (referred to below as shot-N).

## What I did
- About 105 harness commands, roughly 40 minutes of simulated play, never played before.
- Title screen (shot-21): read the NEXT UP text, hit HELP and read all 5 tabs (BASICS, CUTLERY, TABLES, MODES, PRACTICE) (shots 4, 3, 5, 6).
- Did the 1-minute Practice (8 steps, shots 7 to 11), got "PRACTICE COMPLETE! +20" and the 3-choice card, picked FIRST MATCH.
- Landed on Free Play setup (shot-12), pressed PLAY, played 2 Free Play matches vs Squidgeon (EASY): lost the first 2-3 (killed by the Giant Hand twice), won the rematch 3-1 (shots 16, 17, 19, 20).
- Story: Opening cutscene (shot-22), chapter 1 chat (shot-23), won chapter 1 on 2 stars (shot-27).
- Records pages 1 and 2, pinned World Tour (shots 28 to 30).
- Pantry: bought Toffee colour (shots 31, 32). Gallery (shot-33) and Move Lab (shots 34 to 36). Settings (shot-37).
- Party Modes setup (shot-38), played a 1v1 Team Feast round (shots 39, 40).
- CHALLENGES popup (shot-41) and Trials list (shot-42). Table Workshop: placed 2 props, saved, copied code (shots 43, 44).
- Daily (Hot Dumpling): won 3 rounds to 2 (shots 45 to 48). Online popup (shot-49).
- Free Play twist cycling through all singles and the first double (shots 50, 51). One ICE RINK + TURBO match, went KAIJU (shot-52).
- Checked `/errors` at the start, middle and end: always "none".
- Matches played: 6 (Free Play 3 incl. twist match, Story 1, Team Feast 1, Daily 1). Won 3.

## What worked for me
- **The Practice is excellent.** 8 short steps, each says exactly what to press, and my first kill happens within ~20 seconds (shot-10). The "PRACTICE COMPLETE! +20" card with three clear next steps (shot-11) is exactly what a new player needs.
- **The post-match receipt tip is the best teaching tool in the game.** After I died to the Giant Hand it told me: "The Giant Hand goes for the fullest belly: STOMP before it reaches you." (shot-19). It turned a confusing death into a lesson.
- The art is lovely and the characters are charming. Title (shot-21), Gallery (shot-33) and result screens look polished.
- Pre-round tip lines ("Swipe knocks flying cutlery out of the air.") are well written and short.
- Records is clear: progress bars, reward colours listed on each row, pin feature works (shot-29).
- Pantry is simple and readable (shot-31). Buying is instant and the OWNED state is obvious (shot-32).
- Settings has plain-English descriptions for each toggle (shot-37).
- Free Play rematches are quick, and "Esc / P pause" is always visible.
- No JavaScript errors anywhere.

## 🧾 Exactly what would make this a 9/10 for me
1. **Mark "YOU" in every match.** Where: all match screens, especially Daily/Party with 3-6 kaiju (shot-45, shot-46). How: a "YOU" / "P1" arrow or label above my kaiju for the first 5 seconds of every round, and keep a small coloured ring plus name tag permanently on the human player even when NAME TAGS is OFF. Also turn NAME TAGS ON by default for the first 10 matches. In the Daily I was assigned SALMONSTER at random and could only tell it was me via `/state`. Score impact: **+0.5**.
2. **Warn about the Giant Hand BEFORE it kills.** Where: Sunday Roast, Picnic Blanket and any table with the hand (shots 17, 19, 24). How: when belly passes 80%, show a pulsing HUD line "THE HAND IS COMING FOR YOU: PRESS STOMP!" plus a red hand shadow on the table 1.5 s before the flick. The current tip is only shown as a 3-second countdown line before round start or in the post-match receipt. A first-timer who does what the game asks (eat crumbs) is punished by the hazard. I died twice to it in one match. Score impact: **+0.5**.
3. **Make "STOMP READY" impossible to miss.** Where: in-match HUD (shot-17 shows only small "STOMP READY!" text inside the HUD card). How: when belly hits 100, show a big pulsing "PRESS E / STOMP" badge near the kaiju and flash the HUD bar. I sat at belly 100 for 6 seconds in my first Free Play match and then died to the hand without ever stomping. Score impact: **+0.4**.
4. **Make the first match start immediately after Practice.** Where: Practice card "FIRST MATCH vs one EASY bot, first to 3" (shot-11) leads to the Free Play setup screen (shot-12) where I must press PLAY again, with a different kaiju label ("GOBZILLA JR.") than the practice used ("GOBZILLA"). How: the button must start the match directly (as it promises) and pass through the same kaiju name. Score impact: **+0.3**.
5. **Fix the kaiju name inconsistency.** Where: HUD ("GOBZILLA") vs setup/gallery/win title ("GOBZILLA JR.", shots 12, 20, 33). A new player thinks these are two different characters. Use one name everywhere. Score impact: **+0.2**.
6. **Explain the point system and ranks in plain words.** Where: Records "Next rank: Prep Cook at 6 pts (3)" (shot-28) and Pantry "Chef Rank: Dishwasher Next: Prep Cook at 6 pts (you have 3)" (shot-31). How: say what a "pt" is ("1 pt per achievement, 1 per story star...") and show the reward for the rank. Score impact: **+0.3**.
7. **Add a one-line explanation to every title card/menu entry a new player would be afraid to press.** Where: CHALLENGES (what is "Gauntlet"?), DAILY ("Today: HOT DUMPLING" gives no hint), PARTY MODES ("Teams · Rush · Dumpling"), ONLINE. How: a hover/selected-state caption under the cards at (640,574) replacing the generic "◀ ▶ choose · ENTER / A / tap to start" line, e.g. "DAILY: one special match a day, win it for a streak." Score impact: **+0.3**.
8. **Daily and Party should warn a first-timer.** Where: pressing DAILY dumped me straight into a 4-player Hot Dumpling round with no preview (shot-45). Pressing PARTY MODES then PLAY gave a "Team Feast" with only me and one bot (no teammates, shot-40). How: a one-time "this is a 4-player Hot Dumpling game, rules in 1 line, GO" card for Daily, and a disabled PLAY with message "Add at least 2 more players or bots" for Team Feast. Score impact: **+0.3**.
9. **Make "Esc to leave" actually leave in Move Lab.** Where: Move Lab banner "Esc to leave" opens the Pause menu (shot-36); need QUIT, then I landed in the Gallery. How: Esc in Move Lab goes straight back to the Gallery, or change the banner to "Esc, then QUIT". Score impact: **+0.1**.
10. **Fix the HELP tab highlight.** Where: How to Play tabs (shots 3, 5, 6) all show BASICS highlighted together with the active tab, so it looks like two tabs are selected. How: only the active tab gets the filled style. Score impact: **+0.1**.
11. **Tighten a few overlapping/ghosted texts** (see issue table: practice card ghost text, Daily title icon overlapping "COMPLETE!", FIRST SERVICE toast faint behind the match title). Score impact: **+0.2**.
12. **Get a first win into the first 3 minutes.** My first Free Play match was lost to hazards, not skill. How: for the first 3 matches, give "First Match" a friendlier setup: no Giant Hand on tables, bot throws slower. Score impact: **+0.3**.
13. **Show the first-match goal on screen.** The only place the goal "last kaiju standing" appears is HELP > BASICS. How: a 3-second banner at round 1 of the first match "KNOCK THE OTHER KAIJU OFF THE TABLE" with the first-to-N score. Score impact: **+0.2**.

Total if all done: roughly +4.0 gross, realistically landing at 9.0 to 9.3.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Match HUD (Daily, Free Play, Party) | No marker showing which kaiju is mine. In the Daily my kaiju was random (Salmonster); name tags are OFF by default, nothing says "YOU" | shot-45, shot-46 | "YOU" arrow for first seconds each round, ring always on; NAME TAGS ON by default for new players |
| 2 | major | Sunday Roast / Picnic Blanket match | Giant Hand killed me twice in one match (Knocked out by: Giant Hand x2). The only warning is a 3 s pre-round line, then a receipt line after dying | shot-17, shot-19 | Pulsing on-screen warning + shadow when belly > 80% |
| 3 | major | Match HUD | "STOMP READY!" appears only as small text in the HUD card; I sat at belly 100 without noticing, then got flicked by the hand | shot-17 | Big pulsing STOMP badge by the kaiju when belly = 100 |
| 4 | major | Practice complete card to Free Play | "FIRST MATCH vs one EASY bot, first to 3" opens the Free Play setup screen instead of starting the match (an extra PLAY press, and I could have changed settings unprepared) | shot-11, shot-12 | Start the match directly |
| 5 | major | Daily start | Pressing DAILY dumps me in a 4-kaiju Hot Dumpling round with no intro; rules only appear in the 3 s countdown line | shot-45 | One-time intro card with 1-line rules and a GO button |
| 6 | major | Party Modes to PLAY | Team Feast started with 1 human vs 1 bot (RED vs BLUE, one each); "teams" are meaningless and nothing warned me | shot-38, shot-40 | Require 4+ seats or auto-fill bots, with a message |
| 7 | minor | Name consistency | HUD says "GOBZILLA" while setup/gallery/win banner say "GOBZILLA JR." ("GOBZILLA JR. RULES THE TABLE" but the ranking line says "GOBZILLA (YOU)") | shot-12, shot-20, shot-33 | Pick one name |
| 8 | minor | Records / Pantry | "Prep Cook at 6 pts (3)" and "you have 3": "pts" is undefined and "(3)" cryptic | shot-28, shot-31 | Define points; show "3 / 6 points" bar |
| 9 | minor | Title, NEXT UP text | The 4-line NEXT UP block is tiny (about 13 px) and low contrast over the busy background; easy for a first-timer to miss the most important guidance | shot-21 | Larger text on a dark pill; show only the next single step |
| 10 | minor | Title | FIRST SERVICE counter says "2/6" but I had done 3 things (practice, first match, story clear); counting rules not shown. Practice stomp did not count towards "Go KAIJU" | shot-21, shot-41 | Show the 6 steps as a checklist in Records or a tooltip; count Practice stomp or explain it does not |
| 11 | minor | Title (cards) | CHALLENGES/GAUNTLET unexplained; DAILY says "Today: HOT DUMPLING" with no description | shot-21 | Caption on focus, see 9/10 item 7 |
| 12 | minor | CHALLENGES popup | "GAUNTLET: pick where your run starts" assumes I know what a Gauntlet is; the locked rows say "clear wave 4" with no explanation of waves | shot-41 | Add "Survive endless waves of bots" line |
| 13 | minor | Trials list | Header says "★ win · ★★ win without losing a round..." in small 13 px text; card "stars" show as hollow outlines that are hard to read; Trials available to brand-new players (BRUTAL BOT) with no recommended-level hint | shot-42 | Bigger star legend, "recommended after chapter X" tag |
| 14 | minor | Trials list | Card sizes/alignments uneven: left column cards are wider/taller than right ones (Hard Duel vs Thin Ice) and descriptions run 3 lines in some cards | shot-42 | Fixed card heights, shorten "You: X vs Y (hard)" lines |
| 15 | minor | Move Lab | Banner says "Esc to leave" but Esc opens the Pause menu; QUIT needed (2 steps) | shot-36 | Esc leaves directly |
| 16 | polish | HELP tabs | BASICS tab stays highlighted when another tab is chosen (two tabs look selected) | shot-3, shot-5, shot-6 | Single selected state |
| 17 | polish | HELP BASICS | Large text wall; the CONTROLS rows are about 14 px, tight line spacing | shot-4 | Split into a picture of keys, bigger font |
| 18 | polish | HELP MODES | TWISTS paragraph is a single 12 px dense line; very hard to read | shot-6 | Make it a 2-column list |
| 19 | polish | HELP TABLES | Locked tables show a dark placeholder swatch; text "Beat Story chapter 6... (0/6 cleared)" is dim | shot-5 | Brighten lock text |
| 20 | polish | Practice complete card | Ghost of the final tutorial hint ("STOMP TO GO KAIJU...", "THROW / SWIPE: SEED SPRAY") is visible faintly behind the card, overlapping the top of the kaiju | shot-11 | Clear the tutorial hint before the card |
| 21 | polish | Match end (first match) | The faint "FIRST SERVICE: Play a Free Play match" toast overlaps the big winner title area and is hard to read | shot-19 | Move toast to the receipt box |
| 22 | polish | Match end (Daily) | The calendar icon sticks out behind the "C" of "COMPLETE!" and the result lines overlap the ant-trail background, making the line "Today: won..." busy | shot-48 | Place the icon left of the title with a margin; dark backing panel behind the result list |
| 23 | polish | Match end | The big kaiju portrait (Squidgeon/Salmonster/Gobzilla) overlaps the table and a rankings backdrop; fine visually but it hides the mat and loose cutlery | shot-19, shot-48 | Fine, optional |
| 24 | polish | Replay | "YOU GOT FLICKED BY THE GIANT HAND" text sits right over the player kaiju and the ant trail; slightly hard to read against stripes | shot-17 | Add a dark backing to kill text |
| 25 | polish | Story cutscene | Caption "THE GRAND FEAST" at the bottom is small and partly hidden behind the plate rim | shot-22 | Larger caption on dark strip |
| 26 | polish | Story chat | Typewriter text is cut mid-word ("the legendary GOLDE") while printing, with only "tap / SPACE" to skip; pressing Space 3 times also skipped straight into the match (skipped the rest of the chat unintentionally) | shot-23 | Space finishes the line first, then advances |
| 27 | polish | Story map | Rows run 1-2-3-4 then 5-6-7-8 right-to-left (snake order); 8 appears below 1 which looks like it follows 1 | shot-23 | Draw arrows between nodes |
| 28 | polish | Free Play setup | Instructions "Keys left · A / D" under my kaiju is meaningless to a newcomer | shot-12 | "Move: W A S D" |
| 29 | polish | Free Play setup | Subtitle "Tiny monsters. Giant dinner." repeated on Free Play and Daily; title text on Free Play does not tell what a screen is for | shot-12 | Replace with "Pick opponents, then press PLAY" |
| 30 | polish | Free Play setup | Empty seat tiles show only a dark circle; "click: add a bot" is small 12 px grey. My click at the middle of the tile did nothing (needs the bottom label?) | shot-12, shot-51 | Make the whole tile clickable with a big + icon |
| 31 | polish | Free Play setup | Setting "FIRST TO 3" changed to "FIRST TO 5" and the opponent changed from Squidgeon to Salmonster after I visited other modes; I never changed these | shot-12 vs shot-51 | Verify settings do not leak between modes (unconfirmed cause) |
| 32 | polish | Free Play | Both of my first two matches started on Smoothie Bar round 1 even though the setting says "a different one every round" | shot-13 | Randomise the first table |
| 33 | polish | Free Play | The "Bot difficulty: EASY" bot dies within 2 seconds in round 1 and then beats me in rounds 2 and 3: skill spike feels random | shot-14 | Smooth easy-bot behaviour |
| 34 | polish | Records | "Counts people on this device (not bots)." under stats is confusing | shot-28 | Remove or rephrase |
| 35 | polish | Records | "Next up: World Tour (75%)" stays shown after pinning (looks unchanged); no pin confirmation text | shot-29 | Show "Pinned: World Tour" |
| 36 | polish | Pantry | Lifeline entry: "245 TODAY 30% OFF (was 350) (not enough yet)" wraps to 3 lines and is cramped within its card | shot-31 | Put the discount on its own line |
| 37 | polish | Pantry | No confirm before purchase; clicking Toffee immediately spent 40 | shot-32 | Add confirm or undo for first purchase |
| 38 | polish | Pantry vs Records | Token numbers differ between screens in the same moment (Records/chapter 171, Pantry 196) because an achievement paid out silently (Table Maker +30) | shot-31 | Show a toast when tokens change |
| 39 | polish | Gallery | "Collection 59% 16/20 15/18 4/21" at the top-right is about 12 px and the icons are tiny | shot-33 | Larger, with labels |
| 40 | polish | Gallery | Locked kaiju "???" give no hint how to unlock them | shot-33 | Show unlock hint on hover |
| 41 | polish | Workshop | "PROPS (tap one, then tap the table)" header sits very tight over the first prop row | shot-43 | Add 8 px spacing |
| 42 | polish | Workshop | Copy code shows a long truncated code message ("KKT1-eyJuYW1lIjoi...") that is the only feedback | shot-44 | Show "Copied!" |
| 43 | polish | Online | The Play Online popup uses a different heading font and is not readable through `/look` (no texts listed). Also says "free public matchmaking server" with no safety info for kids | shot-49 | Match fonts; check accessibility labels |
| 44 | polish | Party Modes | Bottom lines ("Click a seat...", "Party Cup = 6 games... points 5 / 3 / 2 / 1") sit tightly stacked above the KEYS buttons and are about 12 px; "points 5 / 3 / 2 / 1" unexplained | shot-38 | Add spacing and a clear label |
| 45 | polish | Party Modes | "MODE ▶ TEAM FEAST" button and "◀ TEAM FEAST ▶" header both change the mode; unclear which to press | shot-38 | One control |
| 46 | polish | Table art | Fondue Night uses a photo-realistic wood and cloth look unlike the other cartoon tables | shot-40 | Style match |
| 47 | polish | Match (twist) | Pancake Stack with ICE RINK + TURBO is very busy visually (blueberries, tiles, slide marks); hard to find the players | shot-52 | Reduce clutter on twist tables |
| 48 | polish | Pause menu | In Move Lab the banner stays over the paused screen top and overlaps the "PAUSED" scrim | shot-36 | Hide banner when paused |
| 49 | polish | Match end | "1 / START rematch · Esc menu" hint is white 14 px text over the busy table; harder to read than the buttons below it | shot-19 | Dark backing |
| 50 | polish | Match flow | "FAST FORWARD x3 only bots left" appears after I die, a good idea but it is a surprise to a newcomer who can't tell the match is still running | shot-52 look | Add "You are out: watching" banner |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- **Title** (shot-21): no overlaps; NEXT UP text is very small (issue 9); bottom 6 cards fit; "Teams · Rush · Dumpling" wraps to 2 lines but stays inside its card. OK except small text.
- **Help BASICS** (shot-4): no overlap; text small but within the screen. OK.
- **Help CUTLERY** (shot-3): OK. Tab highlight bug on BASICS.
- **Help TABLES** (shot-5): OK; three-column text fits; lock text dim.
- **Help MODES** (shot-6): OK but TWISTS paragraph very small (12 px).
- **Practice match** (shots 7 to 10): OK; bottom-left tutorial box fits.
- **Practice complete** (shot-11): three buttons OK; ghost tutorial text visible behind card (issue 20).
- **Free Play setup** (shot-12, shot-51): OK; no overlap, all 8 pills fit. Bottom hint small.
- **Round start / in-match HUD** (shots 13, 24, 40, 45): OK. Top HUD cards fit with long names.
- **Replay** (shots 16, 17): "REVENGE IS SWEET!" overlaps the player's mat slightly; hand text over player (issue 24). Readable.
- **Match end** (shots 19, 20, 48): receipt panel fits; Daily title icon overlaps (issue 22). Buttons not overlapping each other.
- **Story cutscene** (shot-22): caption small; OK.
- **Story chat** (shot-23): text fits the box; mid-typing cut is expected.
- **Chapter clear** (shot-27): OK, nothing overlaps.
- **Records p1/p2** (shots 28 to 30): OK; reward text fits; bottom hint wraps to 2 lines within the screen.
- **Pantry** (shots 31, 32): OK, Lifeline card text wraps to 3 lines (issue 36).
- **Gallery** (shot-33): OK; top-right collection text tiny.
- **Move Lab** (shots 35, 36): banner OK; overlaps pause scrim.
- **Settings** (shot-37): OK, 11 rows plus 2 buttons all fit.
- **Party Modes setup** (shot-38): OK, bottom lines tight.
- **Team Feast match** (shot-40): OK.
- **CHALLENGES popup** (shot-41): OK.
- **Trials** (shot-42): OK; uneven card sizes; text small.
- **Workshop** (shots 43, 44): OK.
- **Online popup** (shot-49): OK visually; different font; no text exposed to `/look`.
- **Pause menu** (shot-36): all 5 buttons fit, no overlap.

No hard cut-off text or stacked buttons found on any screen.

## The single biggest structural problem
A first-timer is taught the controls well (Practice, Help) but is **not taught who they are and what is killing them while playing a real match**. In my first Free Play match I could not easily tell my kaiju from the bot at a glance, I ate crumbs as the game asked until my belly was full, I did not notice STOMP READY, and the Giant Hand then killed me (twice) as a punishment for doing the "right" thing. The explanation exists ("The Giant Hand goes for the fullest belly: STOMP before it reaches you") but it arrives in a small receipt after the loss. The loop "eat, then stomp" is the heart of the game and it needs a loud on-screen prompt in the moment.

Second, the title offers six big cards with little explanation, and the ones that look equal (DAILY, PARTY MODES, CHALLENGES) are very different in difficulty. For someone who has never played, the first-hour path is not obvious beyond the tiny NEXT UP text.

## Big change proposals (2–3, most important first)
### Proposal 1: "Coach Spoon" live hints for the first 5 matches
- **Problem it solves:** First-timers die to the Giant Hand/stomp rules and cannot tell which kaiju is theirs (issues 1 to 3).
- **How it would work (detailed design):** For the first 5 matches (counted via save data), a small "Coach Spoon" bubble (the golden spoon from the story) pops up bottom-centre for 3 seconds at the following moments: round start ("That's YOU: look for the arrow!" with an arrow above the player's kaiju); first time belly reaches 60% ("Keep eating crumbs!"); belly 100% ("Press E / STOMP: go KAIJU!" with the key icon and a pulsing ring); hand incoming (2 s warning "Hand targets the fullest belly: STOMP NOW or run!"); first time hit by cutlery ("Dash into cutlery to catch it"). Each hint appears once per match, never over the action centre, and can be turned off with Settings > QUICK TIPS. The existing "Quick tips" line becomes the data source.
- **Example moment:** I fill my belly to 100 on Picnic Blanket. A bubble says "STOMP! (E)" and a ring pulses around me. I press E and go KAIJU 2 seconds before the hand arrives, and it flicks at nothing.
- **Rewards / progression hooks:** Completing the 5 coached matches gives a "Coach's Pet" achievement (+30) and ticks the First Service checklist.
- **Risks and edge cases:** Hints must be suppressed in Online and Party games with humans. Phone layouts need the bubble above the on-screen buttons.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: Smart title: single "PLAY" path for new players
- **Problem it solves:** 6 equal cards and a tiny NEXT UP text (issues 9, 11, 12, 5).
- **How it would work (detailed design):** Until First Service reaches 6/6, the title highlights ONE big card ("▶ CONTINUE: Story Chapter 2" or "▶ FIRST MATCH") with a pulsing border and a label "Start here". Other cards remain but have a one-line caption that appears under the selected card, for example "DAILY: one special match each day. Win it to keep a streak." and "CHALLENGES: harder fights for stars. Try after Story chapter 4." The NEXT UP text becomes a 2-line banner with bigger text and a progress bar "3 / 6". DAILY shows a one-time intro card before starting.
- **Example moment:** I arrive at the title, the Story card pulses with "Start here: Chapter 2", and I press ENTER without reading anything.
- **Rewards / progression hooks:** Checklist completion gives the existing +20 per step plus a cosmetic hat at 6/6.
- **Risks and edge cases:** Veterans should not see the pulsing path (hide when First Service is complete or Records shows 10+ matches).
- **Size:** S to M
- **Score impact for me:** +0.5

### Proposal 3: Friendlier first match (training wheels)
- **Problem it solves:** The first real match is decided by hazards and easy-bot swings rather than the player's actions (issues 33, 2).
- **How it would work (detailed design):** Matches 1 to 3 of a new save use "Gentle table" rules: Giant Hand disabled, easy bot throws 25% slower and misses more, and the bot never goes KAIJU before the player has done it once. A subtle "Gentle mode" pill appears on the setup screen and can be switched off. Matches 4+ revert automatically.
- **Example moment:** I win my first Free Play match 2-1 after two close rounds, and the receipt says "Nice! Tables get harder from here".
- **Rewards / progression hooks:** "First Bite" achievement lands within the first 3 minutes for nearly everyone.
- **Risks and edge cases:** Players who skip the Practice should still get it; fairness in Online/Party is not affected.
- **Size:** S
- **Score impact for me:** +0.4

## How this round's new features felt
- **Progression (Mastery, Chef Rank, achievements, pin, daily deal, receipts):** The receipts that list new achievements (shot-48) are rewarding and clear: "Not It! +30, Table Maker +30" made the game feel generous. Mastery levels appear on the receipt ("Mastery Lv 2 Line Cook") and the Gallery, but I never saw what Lv 2 gave me until I read "next: Star on your HUD card" in the Gallery. The pin works (shot-29) but gives no confirmation line. Chef Rank "Dishwasher" is charming, but "pts" is unexplained. The daily 30% deal on Lifeline is visible but wrapped (shot-31).
- **First Service checklist:** A good idea; the title line is too small and the counting felt odd (Practice stomp did not count as "Go KAIJU"). The step "Clear Story ch 4 -> Minturtle" is a strong goal and motivating.
- **Practice card:** Excellent (shot-11), except the FIRST MATCH button sends me to a setup screen rather than a match, and the ghost text behind the card.
- **CHALLENGES (Gauntlet checkpoints, Trials):** The popup is clean (shot-41) but offers no explanation of the Gauntlet for newcomers. Trials are clear in structure (8 fights, 3 stars, goals in each card) but the list is dense and available to a brand-new player including "BRUTAL BOT" (shot-42). Not something I would try in the first hour.
- **Move Lab:** A great discovery tool; stomp instantly then throw to see "SEED SPRAY!" (shot-35). The "Esc to leave" wording is wrong (it pauses).
- **Double twists:** Cycling the TWIST button reached "ICE RINK + TURBO" after 11 presses (shot-51); the description line at the bottom explains it well. A first-timer would not find these unless they cycle; 11 presses is a lot (consider a dropdown). The twist game itself looked clutter-heavy on Pancake Stack (shot-52).
- **Party Cup:** Only saw the setup line ("Party Cup = 6 games: CLASSIC -> CRUMB RUSH -> ... points 5 / 3 / 2 / 1") on shot-38; I did not play it. The line is promising but tiny and tight above the KEYS button.
- **Story (Phase 2 bosses, Kid Mode):** Chapter 1 was charming (shots 22, 23, 27). Chapter-clear card with a tip ("Next time, eat those crumbs and STOMP: KAIJU wins fights") is great for a newcomer. I did not reach a boss. Kid Mode exists in Settings with a clear description (shot-37).
- **Workshop COPY/PASTE CODE:** Copy gave a "Table code copied: send it to a friend!" message with a long code (shot-44). Saving unlocked "Table Maker" right away: a nice surprise. I did not test paste.
- **Text and layout audit:** Mostly holds up. No cut-off or stacked buttons. Only small issues: tiny help text, ghost text behind the practice card, icon overlapping the Daily result title, uneven Trials cards.

## Bugs that block play
- None. No blockers and no JavaScript errors (`/errors` returned "none" at the start, middle and end).
- Possible leak (unconfirmed): Free Play "FIRST TO" changed from 3 to 5 and the bot changed from Squidgeon to Salmonster after visiting other modes without me changing them (shot-12 vs shot-51).
