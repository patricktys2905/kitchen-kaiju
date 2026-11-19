# Playtest evaluation — The 9-Year-Old (profile "kid", port 7109, KID MODE ON)

**Fun score: 7.5 / 10** (the monsters, the sloth, the giant hand and the "NEW KAIJU!" pop-ups are great and I never got stuck losing, but there is still way too much small text, the Practice SWIPE step would not complete, and there are a few overlaps.)

> Bar this round is 9/10 from every profile. Screenshot paths are relative to `C:\Users\Pat\kitchen-kaiju\` (folder `art-src\.playtest\r9-7109\`, files `shot-N.png`).

## What I did
- About 115 harness commands, roughly 40 minutes of game time. Turned **KID MODE: ON** in Settings first (shot-3), then checked the title (shot-4).
- **Title**: read NEXT UP and the 1-minute Practice. Played Practice steps 1-4 of 8. It stuck at step 4 "SWIPE up close F / X / SWIPE" and would not advance (I pressed F, X, got close, used attack, tried 6 loops). Quit via Pause > QUIT (shot-8).
- **Story**: skipped the Opening cutscene (shot-9/10), played **ch1** (won, 3 stars), **ch2** (won, 2 stars, got SLOBA), **ch3** (won, 1 star, got the Smoothie Bar table), **ch4 Boss of the Belt** (lost twice, used HELPING HAND once, won on try 3, got MINTURTLE), saw the **ch5** intro cutscene (shot-28). I never saw the ch4 comic panel (see "new features").
- **Free Play**: 3 seats (me + 2 bots), bot level cycled to HARD with Kid Mode on, played a full match via act and one via /autoplay (won, 10 KOs). Saw the results screen and an achievement toast.
- **Party Modes**: Team Feast setup, PHONES AS PADS (QR room), CRUMB RUSH, HOT DUMPLING (played ~9 seconds, saw the Giant Hand).
- **Daily**: played via autoplay and lost (countdown named the rivals "easy, easy, easy").
- **Gauntlet** Starters wave 1 (started, quit). **Challenges** panel.
- **Gallery** (Gobzilla page, SHINY two-tap buy, MOVE LAB with STOMP + power), **Records**, **Pantry** (two-tap buy of Toffee colour, the "need 68 more" refusal), **How to Play**, **Table Workshop** (placed 5 props, PLAY IT).
- `/errors` checked at start, middle and end: always `none`.

## What worked for me
- **The monsters are the star.** Sloba the sloth on a boba straw (shot-18) and the NEW KAIJU / NEW TABLE pop-ups made me want to keep going. Winning ch2 and getting a pop-up with a picture is the best moment in the whole game.
- **Kid-Mode cutscenes are the right length.** One-liners like "Not invited." over a confetti cake (shot-28) are funny and instant.
- **Kid Mode bots are really gentle**, even when the setup screen said HARD I still won 5-1 and 10 KOs. The helpful HELPING HAND on the DEFEATED screen (belly starts at 100) is a lovely idea.
- **Revenge popups** like "REVENGE IS SWEET!" and "HOT SAUCE!" are funny and big (shot-35, shot-34).
- **Hot Dumpling + the Giant Hand** is silly and obvious (shot-41). "PIZZARAPTOR HAS THE HOT DUMPLING" is huge and readable.
- **Pantry two-tap buy** works and tells me why: "tap again to buy for 40" and "need 68 more" (shot-48/49). Weekly orders show "+40 paid".
- **Table Workshop** is simple and has big pictures, I could use it without reading (shot-57).
- **Achievement toast** "Forked Up! +30" and "Crumb Muncher! +30" showed top right (shot-36/52) and did not block the action.
- **Unlock pacing**: ch1 > ch2 gave a new kaiju in about 5 minutes. That feels good.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make Kid Mode text actually bigger and shorter everywhere** (+0.6)
   - **what**: Settings says "bigger text" but Help, Records, Pantry, Gallery, the pre-match tips and the results "THIS MATCH" panel are all the same ~13-15 px text as without Kid Mode. A 9-year-old on a couch TV cannot read them.
   - **where**: Help (shot-50), Records right-hand footer (shot-47), Pantry left panel (shot-48), Gallery "Rewards" line and power text (shot-42), results panel (shot-36/52), bottom tip line in matches.
   - **how**: In Kid Mode, minimum body text 20 px on a 1280x720 canvas, max 2 lines per description, and replace the paragraph-style text with icons + 3-5 words. Help in Kid Mode becomes 5 picture cards (THROW, SWIPE, DASH, STOMP, KAIJU) with 1 line each.
2. **Fix the Practice SWIPE step so it can be finished** (+0.5)
   - **what**: Practice stuck at "4/8 SWIPE up close F / X / SWIPE" for me. Practice is the only guided thing for a new kid and "NEXT UP: Finish Practice" stays on the title forever (FIRST SERVICE shows 5/6 with Practice as the missing step).
   - **how**: Accept a swipe when the rival is within ~120 px OR when the swipe animation plays at all. Show a green arrow pointing to the nearest rival. If a step is not done after 20 s, show "SKIP THIS STEP" button.
3. **Make the results panel short and non-overlapping in Kid Mode** (+0.5)
   - **what**: the "THIS MATCH" box lists up to 8 lines (tokens, mastery, 2-3 orders, achievement, colour, "Knocked out by: dumpling pop x3, fell off x2, a KAIJU") and overlaps the left edge of the standings box (shot-52) and the table art (shot-36).
   - **how**: Kid Mode shows only 3 big icon rows: 🪙 +221, ⭐ new thing unlocked, 🎁 order done. Everything else goes behind a "MORE" button. Rename "1 / START rematch · Esc menu" to two big buttons: "AGAIN!" and "MENU".
4. **Fix the overlap on the Chapter Clear card** (+0.2)
   - **what**: "🏆 Leftovers Cleared!" is drawn on top of "✅ Chapter 4 unlocked: Boss of the Belt..." (shot-21).
   - **how**: stack with 14 px spacing, or move the achievement line into a toast.
5. **Stop truncating chat mid-sentence in Kid Mode** (+0.3)
   - **what**: Opening dialogue shows "Tonight the Head Chef hosts the GRAND FEAST. Rule every table in the kitchen, and the legendary GOLDEN SPOON" and ends with no verb (shot-12). The in-chapter cutscene line is just "Crab" (ch1) and "Two's" (ch2, truncated from "Two's company..."?).
   - **how**: Author a real 1-line version for every cutscene and dialogue in Kid Mode ("Rule every table. Win the GOLDEN SPOON!") instead of cutting the long text at N characters.
6. **Soften "DEFEATED" and "DAILY CHALLENGE FAILED" for kids** (+0.3)
   - **what**: big red DEFEATED / FAILED after a loss (shot-24, shot-52). Kid Mode already says "Tough one! Every rival can be beaten", but the title word is still harsh.
   - **how**: Kid Mode headings: "SO CLOSE!" / "TRY AGAIN!" / "DAILY: NOT YET". Keep the HELPING HAND button but add one line under it: "Start with a full belly".
7. **Say what the bot level really is in Kid Mode** (+0.2)
   - **what**: In Kid Mode the Free Play button cycles EASY > NORMAL > TOUGH > HARD and the line says "HARD: leads its throws, dodges and parries" (shot-31), but the bots behave easy. It is confusing and a bit of a lie.
   - **how**: In Kid Mode lock the button to "EASY (Kid Mode)" with a tap hint "Turn Kid Mode off in Settings for harder bots".
8. **Explain unlock goals as pictures on the title** (+0.2)
   - **what**: NEXT UP box on the title is 3 lines of 13 px text, and the third line is clipped on the title screen ("Win a match → 🎨 Lime c..." in /look, fine in shot-4 but tiny).
   - **how**: show 3 big icon cards ("1 win = 🎨", "ch2 = 🐉") with a progress bar, in Kid Mode.
9. **Unify "Chef" titles** (+0.1)
   - **what**: Records says "Chef Rank: Prep Cook" while Gobzilla shows "Mastery Lv 4 Head Chef" and the match panel says "Mastery Lv 1 Rookie". Three ranking ladders, two with chef names. A kid cannot tell which matters.
   - **how**: call the account one "CHEF RANK" and the per-kaiju one "BUDDY LEVEL", with different icons.
10. **Gallery rewards row needs words or bigger icons** (+0.1)
    - **what**: "Rewards: ✔✨ ✔⭐ ✔🪙 🔒🖼 🔒👑 🔒✨" is tiny and cryptic (shot-42). Also the button says "SHINY - 300 🪙 · needs Lv 3" when I am Lv 4, so "needs Lv 3" reads as a problem until you tap.
    - **how**: show the ladder as 6 big badges with a label under each ("Lv 2: ⭐ star"), and show "READY!" in green when affordable.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Practice | Step 4/8 "SWIPE up close F / X / SWIPE" never completes (F, X, attack close-up, 6 loops). Practice can never finish, so NEXT UP "Finish the 1-minute Practice (+20 🪙)" stays at FIRST SERVICE 5/6. | shot-6, shot-7 | Accept any swipe within ~120 px; add a skip-step button after 20 s. |
| 2 | major | Chapter Clear card (ch3) | "🏆 Leftovers Cleared!" overlaps the "✅ Chapter 4 unlocked: Boss of the Belt. Norigon is already sharpening the cutlery..." line, both unreadable where they cross. | shot-21 | Space the lines out or send the achievement to a toast. |
| 3 | major | Kid Mode (all text screens) | "KID MODE: bigger text" is not visible: Help, Records, Pantry, Gallery, tips, results text stay small (13-15 px). | shot-50, shot-47, shot-48, shot-42 | Real Kid-Mode font scale (+30%) and 2-line max text. |
| 4 | major | Story opening dialogue | Kid-Mode 1-line chat is cut mid-sentence: "…Rule every table in the kitchen, and the legendary GOLDEN SPOON" (no ending). The box is also 60% empty below it. | shot-12 | Hand-write 1-line versions; do not clip. |
| 5 | minor | Chapter intro scenes | Subtitle shows only "Crab" (ch1) and "Two's" (ch2) as cut-off words. ch5 "Not invited." is fine. | shot-16 (title card), shot-28 | Same: authored kid lines. |
| 6 | minor | Results panel "THIS MATCH" (Free Play, Daily) | Up to 8 lines in a box that overlaps the standings panel's left edge and the table art; wrapped words "XP", "colour!" and "win for 🥈)" sit alone on lines. | shot-36, shot-52 | Kid Mode: 3 icon rows + MORE; keep panel off the standings box. |
| 7 | minor | Results screen | "1 / START rematch · Esc menu" is jargon for a kid ("1 / START"). No on-screen buttons for AGAIN / MENU on desktop. | shot-36 | Two big buttons "AGAIN!" and "MENU". |
| 8 | minor | Defeat card | Big space in the middle, "DEFEATED" is harsh; "🍀 HELPING HAND" button has no explanation of what it does (it gives a full belly at start). | shot-24 | Add "start with a full belly" sub-line; friendlier title in Kid Mode. |
| 9 | minor | Daily result | "DAILY CHALLENGE FAILED" red title for a 9-year-old, and "Bronze daily medal (for playing today: win for 🥈)" is confusing. | shot-52 | "DAILY: NOT YET". "Win to get 🥈". |
| 10 | minor | Free Play setup | In Kid Mode the BOT LEVEL button still cycles up to HARD and says "HARD: leads its throws, dodges and parries" although bots are forced easy. | shot-31 | Lock to "EASY (Kid Mode)". |
| 11 | minor | Free Play / Party setup | Empty seats are dark boxes with a grey circle and 12 px "click or THROW to join"; a kid does not know to click. | shot-29, shot-37 | Big "+" with "TAP TO JOIN" at 20 px, pulsing on first visit. |
| 12 | minor | Free Play / Party setup | Two info lines at y=424/452 and a hint at y=652 are long, small, and say things like "(a different one every round) · 4 more to unlock". | shot-29 | Cut to icons: "6 players · 5 rounds · 🔒 4 tables". |
| 13 | minor | Party Modes setup | 11 pills in one row with 2-line tiny labels ("CUP LENGTH 6 GAMES", "POWER-UPS ON") and a long grey footer about the Party Cup (CLASSIC → CRUMB → HOT → TEAM → GOLDEN → CLASSIC · final ×2). | shot-37 | Group into "GAME" and "RULES" rows, drop the footer into a "?" popover. |
| 14 | minor | PHONES AS PADS room | Panel runs edge to edge, with the title at the very top and "Waiting for at least one friend to join..." touching the bottom edge. Eight pills, 4 lines of explanation. "Friends tap ONLINE → Join a game and type this code. Up to 5 friends." conflicts with "BOTS FILL UP TO 4 PLAYERS" in the same room. Not shown in /look (HTML overlay). | shot-38 | Scale the panel to 90% height; one sentence "Scan the code". Clarify 5 vs 4. |
| 15 | minor | PHONES AS PADS room | "Close Room" returns to the title screen, not to Party Modes setup, so settings picked before are re-done. | shot-39 | Return to Party Modes setup. |
| 16 | minor | Match HUD | Kaiju shows "GOBZILLA" in match, "GOBZILLA JR." in setup/Gallery/Story. | shot-6 vs shot-31, shot-42 | Use one name. |
| 17 | minor | Match HUD | Cutlery name line ("Ladle · KOs 0", "unarmed · KOs 0") is ~12 px, hard to read on a couch TV; player-name text colour dims right after a KO. | shot-17, shot-33 | Larger HUD in Kid Mode; icons instead of cutlery words. |
| 18 | minor | Practice / match hints | Bottom-left coaching box (e.g. "PRACTICE 4/8 👉 SWIPE up close F / X / SWIPE") is tiny and tucked into the corner. | shot-8 | Bigger and centred at the bottom in Kid Mode. |
| 19 | minor | Pause menu in a Cup/Gauntlet | A faded "TAP QUIT AGAIN..." warning is drawn behind the menu in very low contrast and not readable in a screenshot. The first QUIT tap in Practice went straight to the title with no confirm, but in Gauntlet it needs two taps: inconsistent. | shot-56 | Make the warning appear on the QUIT button itself ("TAP AGAIN TO QUIT") everywhere. |
| 20 | minor | Round banner (Free Play) | "MINTURTLE shoved GOBZILLA off the table" is a thin 14 px line at the bottom of the table; with INSTANT REPLAY title it competes for attention, and the "REVENGE IS SWEET!" sticker is drawn over the rival's face. | shot-35 | Larger, white banner with how you went out (icon + 4 words). |
| 21 | minor | Records | Stat labels sit ~6 px above their values (e.g. "Matches played" vs "7") so rows look misaligned. Footer "Next up: Crumb Muncher (91%)... Click any locked one to 📌 pin it..." is two lines of 13 px. | shot-47 | Align baselines; shorten footer. |
| 22 | minor | Records | Two ladders: "Chef Rank: Prep Cook" (account) vs "Mastery Lv 4 Head Chef" (kaiju). Confusing. | shot-47, shot-42 | Rename one. |
| 23 | minor | Pantry | Bottom-left explanation ("Earn 🪙 Chef Tokens from every match: playing, winning...") plus the Chef Rank text are set in the heavy display font as a paragraph; hard to read. | shot-48 | Use body font; cut to "Win, play, KO and go KAIJU to earn 🪙". |
| 24 | polish | Pantry | "Lifeline" has a blue border and "−30% today" but the other buy cards have no hint they're selectable; hover/selected styles mix (Toffee has a bright yellow ring because it is selected by default). | shot-48 | One consistent focus ring. |
| 25 | polish | Gallery | "Rewards: ✔✨ ✔⭐ ✔🪙 🔒🖼 🔒👑 🔒✨" is cryptic; the SHINY pill says "needs Lv 3" while I was Lv 4 (it only changed to "BUY SHINY?" on tap). | shot-42, shot-43 | Show labelled badges; "READY" state. |
| 26 | polish | Gallery | Power text ("Spits strawberry seeds that shove rivals in front (reach 207 · every 1.6 s)") has numbers a kid does not need. | shot-42 | Show reach/cooldown as two icons. |
| 27 | polish | Gallery | Three "???" silhouette kaiju make a good teaser but do not say how to unlock them. | shot-42 | Tap a silhouette to see "Win 8 matches". |
| 28 | polish | Title | The top-right menu pills (SETTINGS, HELP, KAIJU, RECORDS, PANTRY, WORKSHOP) have ~11 px labels; "KAIJU" for the Gallery is not obvious. Title NEXT UP box has 3 lines at 13 px. | shot-4 | Larger icons with labels under them in Kid Mode. |
| 29 | polish | Title | After I quit Practice at 4/8, the big "NEW HERE? 1-MINUTE PRACTICE" button disappeared (replaced by nothing) after I won matches, so Practice cannot be retried even though NEXT UP asks for it. | shot-53 | Keep the button until Practice is finished. |
| 30 | polish | Free Play setup | "Tiny monsters. Giant dinner." subtitle repeated on every setup screen; same tagline as the title takes space. | shot-29 | Show the mode name + 1 icon instead. |
| 31 | polish | Daily countdown | 2 lines of text drawn over a busy red/white checkered table, in the middle of a seat; hard to read quickly: "DAILY · 3 rivals (easy, easy, easy) · win to keep your 🔥 streak · Picnic Blanket". | shot-51 | Put in a dark pill. |
| 32 | polish | Daily | I (Gobzilla) was assigned Salmonster for Daily with no explanation; "3 rivals (easy, easy, easy)" is fair but I still lost, so the Daily felt a bit harsh for Kid Mode. | shot-51, shot-52 | Say "Daily kaiju: SALMONSTER" and make Kid-Mode Daily a gentler mix. |
| 33 | polish | How to Play | Wall of text under BASICS: MOVES is a 9-line paragraph, CONTROLS lists 4 devices. | shot-50 | Pictures per move, tabs per device. |
| 34 | polish | Story map | Chapter 1 card has a locked-padlock look on all others, fine, but "Story 0% complete · ★ 0/36 · 🌶️ 0/12 · 🎁 0/13" top line is dense. | shot-10 | Show just stars in Kid Mode. |
| 35 | polish | Story map | Right-hand card quote ("Hold THROW to charge...") is italic 13 px. Small. | shot-10 | Bigger. |
| 36 | polish | Harness note | `/look` did not list the PHONES AS PADS overlay or the Table Workshop tip text changes; tools reading it would miss those screens. | shot-38 | Include overlay texts in /look. |
| 37 | polish | Match | Opening 2-second countdown tip line ("Round 1 · Sunday Roast 💡 Shove rivals off the table edge with a dash.") appears under the "2" in 14 px. | shot-8 area | OK but small. |
| 38 | polish | Story | Ch4 clear: I expected the new ch4 comic panel but saw only the NEW KAIJU pop-up then the ch5 cutscene (see below). | shot-27, shot-28 | Check the comic trigger in Kid Mode. |

## 🔠 Text and layout check

| Screen | Result | Screenshot |
|---|---|---|
| Title | OK, tiny menu pill labels and 3-line NEXT UP box (too small for a kid, no overlap) | shot-1, shot-4 |
| Settings | OK, two columns, no overlap; labels small | /look list only, shot-2 taken |
| Practice (match) | OK; bottom-left coaching box small | shot-6, shot-8 |
| Pause menu | OK; Gauntlet pause warning too faint | shot-8, shot-56 |
| Story map | OK | shot-10 |
| Story opening dialogue | PROBLEM: sentence cut mid-way, huge empty space | shot-12 |
| Chapter intro cutscene | OK image; word-fragment subtitles ("Crab", "Two's") | shot-16, shot-28 |
| Chapter Clear (ch1) | OK | shot-15 |
| NEW KAIJU pop-up | OK, great | shot-18 |
| Chapter Clear (ch3) with NEW TABLE | PROBLEM: "🏆 Leftovers Cleared!" overlaps the "Chapter 4 unlocked" line | shot-21 |
| Defeat card | OK, big empty centre; HELPING HAND unexplained | shot-24 |
| Match view (Smoothie Bar, Chef's Board, Griddle) | OK | shot-33, shot-35 |
| Match results (Free Play) | PROBLEM: THIS MATCH panel crowded, orphaned words, sits over art | shot-36 |
| Free Play setup | OK, small text | shot-29, shot-31 |
| Party Modes setup | OK but crowded (11 pills) | shot-37 |
| PHONES AS PADS room | PROBLEM: panel touches top and bottom edges, dense | shot-38 |
| Hot Dumpling match | OK | shot-41 |
| Daily countdown | OK but text over busy cloth | shot-51 |
| Daily result | PROBLEM: THIS MATCH panel overlaps the left of the standings box | shot-52 |
| Gallery | OK; rewards row tiny | shot-42 |
| Records | OK, row labels slightly off baseline | shot-47 |
| Pantry | OK | shot-48 |
| How to Play (Basics) | OK, no overlap, but far too much text | shot-50 |
| Challenges panel | OK | shot-53 |
| Gauntlet wave 1 | OK | shot-54 |
| Table Workshop | OK, very clear | shot-57 |

## The single biggest structural problem
**Kid Mode changes the difficulty but not the reading load.** The game is lovely and the bots are finally gentle, but every menu, result, and tip still expects a confident reader: 8-line results panels, 9-line Help paragraphs, 13 px labels, "1 / START rematch". A 9-year-old on a couch gets joy from the monsters and then bounces off the text every time a screen changes. Because the other half of my score (frustration) is now fine, the reading burden is what keeps me from a 9.

The second weakness is the new-player path: Practice cannot be finished (SWIPE step), and the title still nags about it. For a kid with no helper, that first guided minute is the make-or-break moment.

## Big change proposals

### Proposal 1: "Picture Mode" for Kid Mode
- **Problem it solves:** Reading load (issues 3, 4, 6, 7, 9, 12, 13, 25, 33).
- **How it would work:** When KID MODE is ON, every screen swaps its text for an icon-first layout.
  - Title: the 6 mode buttons stay, NEXT UP becomes 3 big picture goals with progress bars.
  - Results: big stars/coins row (🪙 +221, ⭐ x3, 🎁 new!), two big buttons AGAIN! / MENU. A small MORE button opens the detail list.
  - Help: 5 swipeable picture cards (THROW, SWIPE, DASH, STOMP, KAIJU), each a 3-second looping image + one 5-word caption.
  - Min font 20 px, max 2 lines per description.
- **Example moment:** I win a match, a big "+221 🪙" and 3 stars pop, a sticker "NEW COLOUR!" appears, and I press AGAIN! without reading anything.
- **Rewards / progression hooks:** Sticker book page per kaiju filled by wins, shown after each match.
- **Risks and edge cases:** Needs authored short lines for ~60 strings; keep full text one tap away for parents.
- **Size:** L
- **Score impact for me:** +1.0

### Proposal 2: Guided first match that cannot get stuck
- **Problem it solves:** Practice stuck at SWIPE (issues 1, 18, 29).
- **How it would work:** Practice steps are driven by a big arrow and a character ("Sloba says: SWIPE!"). Each step has a 15 s timer, after which it auto-completes with "No worries, you can do it!" and the next step starts. After step 8, a confetti pop-up awards +20 🪙 and marks Practice done on the title; the Practice button remains until then.
- **Example moment:** I swipe near the rival, hear a "bonk", the arrow turns green and the step ticks.
- **Rewards / progression hooks:** The +20 🪙 and a "First Bite" sticker for finishing Practice.
- **Risks and edge cases:** Skipped steps must not give the reward unless all 8 were truly completed or skipped by timer.
- **Size:** S
- **Score impact for me:** +0.5

### Proposal 3: Friendly "Try again" loop
- **Problem it solves:** Harsh DEFEATED / FAILED words and the unexplained HELPING HAND (issues 8, 9).
- **How it would work:** In Kid Mode, loss screens say "SO CLOSE!" with the rival waving. Three buttons with pictures: 🍀 "FULL BELLY START", ↻ "AGAIN", 🗺 "MAP". After 2 losses on the same chapter, the first button is pre-selected and pulses.
- **Example moment:** I lose to Norigon twice, the full-belly button glows and I win on the third go.
- **Rewards / progression hooks:** "Never give up!" achievement for winning after 3 losses.
- **Risks and edge cases:** Boss stars should still require a clean run without helping hand.
- **Size:** S
- **Score impact for me:** +0.3

## How this round's new features felt
- **Fairness (1.4 s grace, how you went out):** The round-end line "MINTURTLE shoved GOBZILLA off the table" helps. It is small (14 px) and easy to miss; the results also list "Knocked out by: dumpling pop x3, fell off x2, a KAIJU" which is neat but long. Bots did not hit me in the first seconds. Free Play now explains each BOT LEVEL, but Kid Mode still shows HARD while bots are easy (issue 10).
- **Daily rivals named:** "3 rivals (easy, easy, easy)" is shown and helps, but I still lost the Daily. It does not feel "gentler" for a kid.
- **Giant Hand / KAIJU can't be flicked:** I saw the hand in Hot Dumpling (shot-41). The tip "The giant hand goes for whoever has the fullest belly" is good; I did not manage to test dodge.
- **Feedback (toasts):** 🏆 toasts top-right ("Forked Up! +30", "Crumb Muncher! +30") are clear and nice; they showed after matches. 🎁 NEW KAIJU / NEW TABLE are the best thing in the game (shot-18). Pantry orders show their payout ("+40 paid"). SHINY and Pantry buys ask for a second tap with price and say why they're refused ("need 68 more").
- **New saves with locked kaiju/tables:** It felt good. Win 1 / clear ch2 / clear ch3 each gave something within about 15 minutes. I would add a visible "next unlock" strip in the Gallery.
- **Story comic panels:** I did not see the ch4 comic panel after beating the boss (NEW KAIJU pop-up then straight to the ch5 cutscene). Could be Kid-Mode or my "tap through". Please verify. I also did not notice the PHASE 2 banner for Norigon.
- **Kid Mode calm starts:** Story rounds did start calmly, and ch1-ch3 were easy wins. Boss ch4 took me three tries on easy, but HELPING HAND then helped.
- **PHONES AS PADS:** Huge QR code is clear and the room code "RMRM" is big. Too much text and the panel crowds the edges (shot-38); closing it dumps you to the title. The PARTY CUP switch is easy to find (OFF by default).
- **Gallery power + Mastery ladder:** Power reach/cooldown shown ("reach 207 · every 1.6 s"), ladder ✔/🔒 including ✨ Shiny is there but icons only. The Shiny two-tap buy worked ("BUY SHINY? tap again: 300 🪙" then "SHINY ✔"). MOVE LAB lets me STOMP then use the power: fun and quick.
- **Fixes from last round:** The Practice SWIPE step did NOT work for me (issue 1). Quit confirmation in Gauntlet needs two taps (OK). Kid Mode bots are always easy (confirmed by play). At most 3 pop-ups: never more than 1-2 shown. Team Feast results grouped by team: not played.
- **Text and layout:** Found 3 overlaps (ch3 Chapter Clear, THIS MATCH panel x2) and several too-small texts. See the table.

## Bugs that block play
- **Practice step 4/8 (SWIPE) cannot be completed** with the harness (F, X, attack at close range, shove then F). Practice therefore stays unfinished and the title keeps asking for it. (Could be harness-timing, but a real kid on a keyboard may hit the same wall; please verify.)
- No JavaScript errors (`/errors` = none at start, middle, end). Nothing else blocked play.
