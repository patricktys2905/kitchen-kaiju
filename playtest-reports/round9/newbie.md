# Playtest evaluation — The First-Timer (newbie)

**Fun score: 7.5 / 10** (Charming, readable, and fun within about 3 minutes thanks to Practice and the forgiving first match. I lose points for unclear seat and "you" labelling in Free Play, several inconsistent counters, a Practice hint that goes stale, and a tutorial that is mostly a wall of small text.)

> Screenshot paths below are relative to `C:\Users\Pat\kitchen-kaiju\` (folder `art-src\.playtest\r9-7104\`, files `shot-N.png`).

## What I did
About 105 harness commands, roughly 25 minutes of play, from the title screen with no prior knowledge. `/errors` returned `none` at the start, middle and end.
- **Title** (shot-1): read the NEXT UP box, clicked "👋 NEW HERE? 1-MINUTE PRACTICE".
- **Practice** (shots 2–4): completed all 8 steps. Got "PRACTICE COMPLETE! +20" with FIRST MATCH / STORY / MENU buttons.
- **FIRST MATCH** (shots 5–9): easy bot, first to 3. Lost round 1, won the match 3–2. Got +51 tokens, First Bite, Lime colour, and a 🎁 NEW KAIJU: Chocomunch toast. Saw the Giant Hand and the "REVENGE IS SWEET" instant replay.
- **Help** (shots 12–15): all four tabs (BASICS, CUTLERY, TABLES, MODES).
- **Free Play setup** (shots 10, 16, 19, 55, 56): bot level cycling, KEYS overlay, joining seats, and pressing PLAY with nobody joined.
- **Free Play matches**: one 1v1 (BLOBLIN) with a Pause/Quit test (shot-18), and one 4-player match (won 3 rounds, shot-21).
- **Gallery and Move Lab** (shots 22–26): locked-kaiju hint, colour lock hint, Move Lab KAIJU power.
- **Records** (shot-27), **Pantry** (shots 28–31, bought Toffee with the two-tap confirm and checked the "need 232 more" refusal), **Settings** (shot-32).
- **Story** (shots 33–45): opening cutscene, ch1 cleared with ★★★, ch2 lost twice (Defeated screen with a "What beat you" tip).
- **Party Modes** setup and 📱 PHONES AS PADS room (shots 46–47).
- **Daily** (Hot Dumpling, shots 48–51): lost, got the Daily result screen.
- **Challenges** popup (shot-52), **Table Workshop** (shot-53), **Online** popup (shot-54).

Matches played: 5 completed plus 3 Story attempts. Won: Free Play ×2, Story ch1. Lost: ch2 ×2, Daily.

## What worked for me
- The big **"👋 NEW HERE? 1-MINUTE PRACTICE ▶"** button on the title is exactly what a first-timer needs. It is the first thing the eye finds after the logo.
- The **title NEXT UP** box ("FIRST SERVICE 0/6", "Win a match → Lime colour") gives instant, concrete goals.
- **Practice** teaches walk, throw, pick up, knock out, swipe and stomp with a live "PRACTICE n/8 👉" line and ✔ pop-ups. It ends with +20 🪙 and a clear next step.
- **FIRST MATCH** being easy bot, first to 3, is a kind on-ramp. The win pays out Lime, Chocomunch and a Free Play goal in one go (shot-9).
- **Round-end banner** says exactly how I went out: "💥 You went out at 9s: falling off (SQUIDGEON)" (shot-8). This is excellent feedback.
- **Free Play bot level text** ("🤖 EASY: slow, misses a lot, rarely dodges") is clear. Pressing PLAY with no seats joined auto-creates me plus a bot instead of erroring.
- **Defeat screen** (shot-44) is kind: "So close! You took a round off them." and "What beat you: thrown cutlery... DASH sideways from a charge line." It gives +60 🪙 even on a loss.
- **Gallery** locked entries say exactly how to unlock them with progress ("Play 3 matches in any mode (you have 2/3)").
- **Pantry** two-tap buy ("tap again to buy for 40 🪙") and the refusal reason ("need 232 more 🪙") both work. Weekly orders show their payout.
- **KEYS overlay** in Free Play setup (shot-56) is the clearest controls reference in the game, with key-cap styling and the THROW join / DASH leave line.
- **Story** map, chapter card, star rules ("★★★ no rounds lost") and Crabbage's post-clear line are charming.
- The **Move Lab** lets me try a kaiju power safely.

## 🧾 Exactly what would make this a 9/10 for me
1. **Mark which seat is "YOU" on Free Play and Party setup.**
   - **What:** a "YOU · P1" badge on my card.
   - **Where:** Free Play and Party Modes seat cards (shots 10, 19).
   - **How:** my card shows "YOU · Keys: WASD + SPACE". My card must never say "Bot: EASY (tap)". In shot-10 both seats read "Bot: EASY (tap)", including the one I was about to play, which is confusing. Only bot cards show the level.
   - **Impact:** +0.4
2. **Make Practice hints match the current step, and show the full checklist.**
   - **What:** the hint line stayed "SWIPE up close F / X / SWIPE" while the counter went 4/8, 5/8, 6/8 and 7/8 (shots 3, 4). I could not tell what I was supposed to do (swipe? stomp? go KAIJU?).
   - **Where:** Practice bottom bar.
   - **How:** the hint text must change with every step (stomp step: "Eat crumbs until belly is full, then press E"). Add a tiny checklist of 8 ticks. Steps that auto-complete from bot actions must not leave a stale prompt.
   - **Impact:** +0.4
3. **Fix the unlock/count inconsistencies a new player will notice.**
   - **What:** Help › TABLES lists 15 tables with Fondue Night locked ("Play 8 matches... you have 1/8"), yet my FIRST MATCH was played on Fondue Night. Free Play says "TABLE: ALL 13 · 5 more to unlock" (18 total) while Help shows 15. The Gallery says "13/20 kaiju" at the start (7 locked), while the brief and the new-save promise are 4 locked.
   - **How:** one source of truth for table and kaiju counts, and a scripted first match that either stays on an unlocked table or states "Fondue Night preview".
   - **Impact:** +0.3
4. **Make the tutorial text readable.**
   - **What:** Help › BASICS (shot-12) is a 14-line wall at about 14 px, with TWISTS in an even smaller font (shot-15).
   - **How:** split BASICS into 5 cards with an icon and a one-line rule each (THROW, SWIPE, DASH, STOMP, KAIJU). Show the controls as key-caps like the KEYS overlay. Enlarge the TWISTS list to at least 16 px or move it to its own tab. Raise contrast on locked-table text (grey on dark, shot-14).
   - **Impact:** +0.4
5. **Explain GAUNTLET, TRIALS and "MODES" labels.**
   - **What:** the Challenges popup (shot-52) says "GAUNTLET: pick where your run starts" but never says what a Gauntlet is. The "◀ MODES" button on Free Play and Party Modes returns to the title, which is the Main Menu, not "Party Modes".
   - **How:** a one-sentence blurb ("Survive endless waves with 3 hearts") and rename the button "◀ TITLE" or "◀ BACK".
   - **Impact:** +0.2
6. **Warn before QUIT and fix where Quit/Menu lands.**
   - **What:** pausing and pressing ✖ QUIT left the match instantly (no confirm) and dropped me on the Free Play setup. "☰ MENU" after a Free Play match also lands on setup, not the title. Closing the Phones-as-Pads room went to the title instead of Party setup.
   - **How:** one tap shows "Really quit? Progress is lost" (the brief says a confirm exists); MENU always means title; Close Room returns to where it was opened.
   - **Impact:** +0.3
7. **Make the match-end star row unambiguous.**
   - **What:** the round banner shows "GOBZILLA ★★★ SQUIDGEON ★★★" in shot-8, but in `/look` it was "★☆☆ vs ★★☆". Filled and hollow stars look nearly identical at banner size, so a newbie cannot tell the score.
   - **How:** filled gold vs dark outlined stars, or just the digits "1 – 2".
   - **Impact:** +0.2
8. **Explain the hot dumpling and mode rules at the start of a party round.**
   - **What:** Daily Hot Dumpling (shot-48) shows only the Daily banner, with no rule hint.
   - **How:** a 2-line "HOT DUMPLING: touch a rival to pass it before it pops" card during the countdown, first time only.
   - **Impact:** +0.2
9. **Keep the new-kaiju toasts consistent.**
   - **What:** 🎁 NEW KAIJU: Chocomunch appeared after match 1, but later gains had no toast. The kaiju count went 13 to 14 without telling me which one. Tokens read 143 on Records and 168 on Pantry, a hidden +25 with no explanation (probably the "Play any Party Mode ✔ +25" goal).
   - **How:** every unlock and every goal payout gets a toast or result-card line; token totals identical everywhere.
   - **Impact:** +0.3
10. **Tell me the first-time time budget.**
    - **What:** I could not tell that Story ch2 is a 3-way free-for-all (I lost twice with the default "attack" style). A newbie should be warned, or ch2 should be gentler for a first clear.
    - **How:** a "Tip: this chapter has 2 rivals" line on the chapter card plus an auto-offered "easier" option after 2 defeats.
    - **Impact:** +0.3

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Free Play setup | My own seat card reads "Bot: EASY (tap)" like the bot, with no "YOU" marker | shot-10 | Add "YOU · P1" badge, show controls instead of bot level |
| 2 | major | Practice | Hint stays "SWIPE up close F / X / SWIPE" while counter advances 4/8 to 7/8 | shot-3, shot-4 | Per-step hint text |
| 3 | major | Help › Tables vs Free Play | Table counts disagree: Help lists 15 (5 locked), Free Play says "ALL 13 · 5 more" (18), Gallery 13/18 | shot-14, shot-10, shot-22 | Single source of truth |
| 4 | major | FIRST MATCH | Played on Fondue Night, which Help lists as locked ("Play 8 matches... 1/8") | shot-5, shot-14 | Pick an unlocked table for the scripted match |
| 5 | minor | Records vs Pantry | Chef Tokens 143 on Records but 168 on Pantry, +25 with no toast | shot-27, shot-28 | Show payouts in toasts, keep totals identical |
| 6 | minor | Free Play / Party | Button "◀ MODES" at top right goes back to the title, not to a modes screen | shot-10, shot-46 | Rename "◀ TITLE" / "◀ BACK" |
| 7 | minor | Pause | ✖ QUIT leaves the match with no confirmation, landing on Free Play setup | shot-18 | Add confirm; return to title |
| 8 | minor | After Free Play match | "☰ MENU" lands on Free Play setup, not the title | shot-9 | Make Menu return to title, add separate "SETUP" button |
| 9 | minor | Phones-as-Pads room | "Close Room" returns to the title instead of Party Modes setup | shot-47 | Return to caller |
| 10 | minor | Phones-as-Pads room | Panel fills the full 720 px height; "Waiting for at least one friend to join..." sits about 8 px from the bottom edge; text says "Up to 5 friends" while button says "BOTS FILL UP TO 4 PLAYERS" | shot-47 | Add margin; reconcile numbers |
| 11 | minor | Round-end banner | Star row "★★★ vs ★★★" ambiguous at banner size (look says ★☆☆ vs ★★☆) | shot-8 | Clear filled/hollow or digits |
| 12 | minor | Help › Basics | 14-line wall of tiny text; hard for a first-timer | shot-12 | Split into cards with icons |
| 13 | minor | Help › Modes | TWISTS list is a very small, dense paragraph | shot-15 | Own tab, larger font |
| 14 | polish | Help › Tables | Locked table names and unlock text are dim grey on dark; thumbnails almost black | shot-14 | Raise contrast |
| 15 | minor | Challenges popup | No explanation of what a Gauntlet or Trials are | shot-52 | One-line blurbs |
| 16 | minor | Free Play setup | Changing BOT LEVEL silently changes "FIRST TO" from 3 to 5 at HARD | shot-56 | Show a note or keep rounds independent |
| 17 | minor | Gallery | Mastery Rewards ladder is icons only ("Rewards: ✔✨ 🔒⭐ 🔒🪙 ...") with no text on what each is | shot-22 | Label each step or tooltip |
| 18 | polish | Gallery | 7 kaiju silhouettes are "???" at the start (13/20), more than the "4 locked" new-save promise | shot-22 | Align with the design or message |
| 19 | polish | Results panel | "THIS MATCH" box on Daily is tall (8 lines) and covers part of the table; the "FAILED" headline nearly touches the standings panel | shot-51 | Compact or two-column the box |
| 20 | polish | Results | Headline "GOBZILLA JR. RULES THE TABLE" vs HUD name "GOBZILLA": name differs between screens | shot-9, shot-3 | One name everywhere |
| 21 | polish | Results headline | Title overlaps a popsicle prop and the table art, still readable | shot-9 | Dim the table behind the headline |
| 22 | minor | Story | After ch1 clear and NEXT, a cutscene plus a chat each needs its own SKIP (S pressed twice) with no on-screen hint about the second | shot-36, shot-37 | One skip for both |
| 23 | polish | Story map | Chapter order snakes (4 ➜ 5 on the right, then 6, 7, 8 leftward), which reads backwards on rows 2 | shot-34 | Left-to-right on every row, or draw arrows |
| 24 | polish | Story map | "Story 1% complete" after the clear still shows "7%": a 12-chapter bar that jumps in odd steps | shot-40 | Show "1/12 chapters" |
| 25 | minor | Story ch2 | First chapter with a 3-way free-for-all: lost twice with the default attack style; no warning on the card | shot-44, shot-45 | Show rivals count; offer help after 2 defeats |
| 26 | polish | Story retry | RETRY skips the intro, with no "round 1" countdown hint on what changed; fine, but the defeat card disappears after a few seconds on the table | shot-45 | Keep the card until dismissed |
| 27 | polish | Title | NEXT UP box text 14 px and wraps in 3 lines with an emoji-heavy first line; it changes content between visits without explanation | shot-1 | Slightly larger text |
| 28 | polish | Match HUD | Practice bottom-left hint box is small (about 13 px) and overlaps the table edge | shot-2 | Increase font |
| 29 | polish | Daily | Locked kaiju (Sloba) appears as a bot before I have unlocked him; spoils the Story-ch2 reward | shot-48 | Fine but note |
| 30 | minor | Records | "Times gone KAIJU 0" although I went KAIJU in Practice and Move Lab; Practice and Move Lab are not counted, with no label | shot-27 | Note "Practice not counted" |
| 31 | polish | Records | Achievement progress bars tiny (about 60 px) and hard to read at distance | shot-27 | Wider bars |
| 32 | polish | Move Lab | "SEED SPRAY!" callout sits on top of the kaiju sprite | shot-26 | Offset the label |
| 33 | polish | Pause | Pause menu has no controls reminder; a newbie cannot recall the keys mid-match | shot-18 | Add "KEYS" button |
| 34 | polish | Practice | FIRST MATCH / STORY / MENU buttons overlay the live table, and a fading "✔ SWIPE UP CLOSE" appears behind | shot-4 | Dim the table or clear the toast |
| 35 | polish | Settings | NAME TAGS: OFF by default; a newbie in a 4-6 kaiju scrum cannot tell who is who by colour only | shot-32 | Default ON for new saves |
| 36 | polish | Countdown | The "2" countdown shows at the table centre while I can already walk (Practice) | shot-2 | Hold input until DIG IN! |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- **Title:** OK. Nothing overlaps, buttons are separate, version tag bottom-right is tiny but fine. NEXT UP is small but legible (shot-1).
- **Practice:** hint box bottom-left is small (13 px) but not cut off (shot-2, shot-3). "PRACTICE COMPLETE" panel OK with three clear buttons (shot-4).
- **In-match HUD (1v1 / 4-player):** OK. Names, weapon and KO counts do not collide. 4-player HUD fits (shot-21).
- **Round-end banner:** OK, no overlap; the star row is ambiguous (shot-8).
- **Match-end results:** OK. The THIS MATCH box overlaps the table art but no text collides; the 8-line box on Daily is large (shot-51, shot-9, shot-21).
- **Free Play setup:** OK. 8 pills fit in one row; bottom hint text OK (shots 10, 16, 19). With the KEYS overlay open the pills are hidden, as intended (shot-56).
- **Party Modes setup:** OK. 11 pills in one row with small labels but no overlap (shot-46).
- **Phones-as-Pads room:** no overlap, but the panel touches the top and bottom screen edges (shot-47).
- **Help (all 4 tabs):** BASICS text tiny but no overlap or cut-off (shot-12). CUTLERY OK (shot-13). TABLES OK, low contrast locked text (shot-14). MODES OK, the TWISTS paragraph is very small (shot-15).
- **Gallery:** OK. Rewards icons are small (shots 22, 23, 24).
- **Records:** OK (shot-27).
- **Pantry:** OK (shots 28, 30, 31).
- **Settings:** OK (shot-32).
- **Story map:** OK. The SCENE button sits very close to "Not cleared yet" but does not overlap (shot-34).
- **Story chat overlay:** OK, but the spoon sprite crosses chapter cards behind the dialog (shot-37).
- **Chapter Clear / Defeated cards:** OK (shots 40, 44).
- **Pause menu:** OK (shot-18).
- **Daily countdown and in-match HUD:** OK, the long Daily banner fits on one line (shot-48, shot-49).
- **Challenges popup:** OK (shot-52).
- **Table Workshop:** OK, small prop labels (about 11 px) but readable (shot-53).
- **Online popup:** OK (shot-54).

No text overlap or cut-off found beyond the notes above.

## The single biggest structural problem
The first 3 minutes are great, but the game does not connect the pieces for a newcomer after that. The title offers six big cards plus six small links with no recommended order after Practice, so the NEXT UP box does a lot of the work. It also changes between visits. The numbers I trusted (tables, kaiju, tokens) did not agree across screens. Practice itself mis-prompts mid-way. Together these make the game feel less trustworthy than it is.

Second, the knowledge a newbie needs lives in text walls (Help) rather than in play. The best teaching happened in Practice and in the defeat card's "What beat you" tip. Story ch2 is the first spike (3-way free-for-all), and I was beaten twice before any adaptive help.

## Big change proposals (2–3, most important first)
### Proposal 1: "Your First Hour" guided path
- **Problem it solves:** after Practice a newbie must choose between Story, Free Play, Party and Daily without guidance.
- **How it would work (detailed design):**
  - The title's Practice button becomes a single "CONTINUE ▶" card that always shows the next step: Practice, First Match, Story ch1, ch2, Win a Party mode, Daily.
  - Each step is one screen with a 1-line goal and a reward chip (e.g. "+30 🪙 · 🎨 Lime").
  - Finishing a step shows a 2-second banner "Step 3/6 done, next: Story ch2".
  - The other cards stay available.
  - After step 6 the card turns back into "NEW HERE?" for friends (shared device) and a "Skip guide" link appears at step 1.
- **Example moment:** I win the First Match, the banner says "Step 2/6 done! Chocomunch joins your roster. Next: Story ch1", and the Story button glows.
- **Rewards / progression hooks:** each step pays tokens and ties to a colour or kaiju; the final step awards a "Regular Diner" badge.
- **Risks and edge cases:** shared devices (a second player is not a newbie), players who skip steps, localisation of the step names.
- **Size:** M
- **Score impact for me:** +0.5

### Proposal 2: Interactive tutorial cards in place of the Help wall
- **Problem it solves:** the BASICS tab (shot-12) is a text wall; the TWISTS list is tiny.
- **How it would work (detailed design):**
  - Replace BASICS with five tappable cards: THROW, SWIPE, DASH, STOMP/KAIJU, EDGE and HAZARDS.
  - Each card has a 3-second looping animation (same sprites as in match), a one-line rule at 20 px, and the key-caps for keyboard/gamepad/phone.
  - A "TRY IT" button opens a 20-second Move Lab-style sandbox focused on that move.
  - Put TWISTS in its own tab with an icon per twist and a "try in Free Play" shortcut.
- **Example moment:** I tap DASH, watch a kaiju dodge a fork, press TRY IT, and dodge a real fork in the sandbox.
- **Rewards / progression hooks:** tick each card once tried; completing all five grants +20 🪙 and the "Fast Learner" achievement.
- **Risks and edge cases:** animation asset cost; phone layout of five cards.
- **Size:** L
- **Score impact for me:** +0.5

### Proposal 3: Adaptive story help after repeated defeats
- **Problem it solves:** Story ch2 beat me twice and the only help was a text tip.
- **How it would work (detailed design):**
  - After two defeats in a chapter the Defeated card gains a third button, "TRY EASIER (keeps ★)", which drops rival level by one step and gives the player a starting belly bonus.
  - After three defeats it suggests "Practice this table" in the Move Lab with the same rivals.
  - Stars earned with help are capped at ★★.
- **Example moment:** I lose ch2 twice, then press TRY EASIER and clear it with ★★.
- **Rewards / progression hooks:** token payout stays at the normal rate; the goal "Clear Story ch 2 → Sloba" still completes.
- **Risks and edge cases:** hard-mode purists, star cap fairness, and the Kid Mode overlap (it already makes bots easy).
- **Size:** S
- **Score impact for me:** +0.4

## How this round's new features felt
- **Fairness / 1.4 s bot grace:** I never got hit in the first seconds of a round in either match. It felt fair, though I cannot isolate the exact timing from outside.
- **Round-end banner ("You went out at 9s: falling off (SQUIDGEON)"):** excellent and exactly what a newbie needs. The star row in that banner is ambiguous (issue 11).
- **Free Play BOT LEVEL explanations:** clear and friendly (EASY, NORMAL, TOUGH, HARD). I would add them to the pill itself.
- **Daily countdown naming rivals' levels:** "3 rivals (normal, easy, easy)" is clear. It felt gentle as promised, though I still lost the Hot Dumpling Daily (the dumpling stuck with me, a rule I was never told).
- **Story ch3 gentler / Giant Hand dodge:** not reached for ch3. I saw the hand once in shot-7; the "giant hand goes for whoever has the fullest belly" tip appeared on the countdown, which helped.
- **🏆 Achievement toasts:** I saw "🏆 First Bite +30 🪙" in the results box, and a 🎁 NEW KAIJU: Chocomunch toast top-right (shot-9). The latter was great. Later unlocks (count 13 to 14) had no toast (issue in checklist 9).
- **🎁 NEW TABLE toasts:** none seen in about 6 matches, so I cannot judge them.
- **Pantry orders payout and two-tap buys:** both work well. "tap again to buy for 40 🪙" and "need 232 more 🪙" are clear.
- **🌱 New saves start with locked kaiju/tables:** the concept feels good (the First Match win unlocking Chocomunch was a real hit). The numbers (13/20, 18 tables, 4-vs-7 locked) were confusing (issues 3 and 18).
- **🗯 Story comic panels (ch4/ch8):** not reached. The ch1 and ch2 chat overlays are charming.
- **📱 PHONES AS PADS:** opens a clean room with a big code and QR (shot-47). The text "Friends tap ONLINE → Join a game and type this code" is unclear next to the QR, and the panel is flush with the screen edges. I could not test a real phone.
- **Gallery power reach and cooldown:** "reach 207 · every 1.6 s" is shown and useful. The Rewards ladder is icon-only, so I cannot tell what the ✨ steps are.
- **Fixes from last round:** the quit confirmation was not shown (issue 7); Practice SWIPE step completes (the 7/8 step finished after shove plus swipe), but its hint is stale (issue 2).
- **Text/layout audit:** no overlap or cut-off found; the closest calls are noted above.

## Bugs that block play
- None. `/errors` stayed `none` all session. The nearest things to blockers are the stale Practice hint (could strand a player on step 4 to 7 without knowing what to do) and the inconsistent table and kaiju counts.
