# Playtest evaluation: The QA Tester

**Fun score: 7.5 / 10** (Rock solid: zero JavaScript errors over about 75 commands of abuse. But the replay loop is thin and the progression/UX state is confusing, so it stops short of 9.)

> Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r5-7110\` (shot-1 to shot-24).

## What I did
- Title: Escape and Enter spam. Visited Story map, Free Play setup, Party Modes setup, Gallery, Records, Settings, Help, Table Workshop, Daily and Gauntlet.
- Free Play: about 3 matches (1v1 and 4-player, including the Workshop table), with pause, restart and quit mid-round.
- Party: Golden Spoon (full match, won 3-0), Daily (Hot Dumpling, lost), Gauntlet (lost all 3 lives on wave 1, then ran an autoplay batch).
- Story ch 1: opened it and played a short stretch to see the STOMP coach.
- /errors checked at start, middle and end: **always "none"**. About 75 harness commands, roughly 45 minutes.

## What worked for me (briefly)
- Very stable. Rapid Escape or P toggling, RESTART and QUIT mid-countdown, clicking locked Gallery items 12 times fast, and placing and removing Workshop props all gave no errors and no stuck state.
- The Gallery lock screens now explain themselves ("Unlock: Beat Story chapter 4 (0/4 cleared)", "Lime: First Bite: Win a match (0/1)"). Records show a "Next up: Rampage (33%)" line. This is good guidance.
- The stomp coach shows the right key for the input ("PRESS E" in a Free Play match, "PRESS STOMP" in Story ch 1, shot-24). Belly fills fast enough (4 s of `crumbs` reached 100) that a new player gets there quickly.
- The Golden Spoon HUD ("HOLDING! 3/15s", a banner "MOTHBALL HAS THE GOLDEN SPOON", shot-11) is clear. The cheese hazard and its telegraph ring are readable.

## The single biggest structural problem
**There is no meta-loop behind the matches, and the game's own progress state doesn't hold together, so I can't trust what it tells me.** After a full Golden Spoon match, and then a lost Daily and a lost Gauntlet run, the only feedback was a results card (shot-12, shot-14) and a plain "GAUNTLET OVER: cleared 0 waves, best 0". Nothing said "you progressed X", "you unlocked Y" or "here is what to try next". The title "NEXT UP" line and Records are the only goal pointers, and they disagree with other screens:
- Story says "0% complete, 0/36 stars" and the Gallery says "0/4 cleared", yet 16 of 20 kaiju and 15 of 18 tables are already unlocked ("unlock more in Story").
- Records say 18 tables, Free Play says "ALL 15" and Party says "ALL 16", and Records show "Tables visited 12/19". The count depends on the screen and on whether My Table 1 is included.
- Golden Spoon, a mode you can win by pure knock-outs (8 KOs in my win), awarded no visible "Spoon Fed" progress.

As QA I treat every number on screen as a promise. When three screens give three table counts and an unlock summary contradicts the progress page, the progression layer feels unfinished. A session of 3 to 4 matches also leaves nothing carried forward: no currency, no streak banner, no "next goal at 70%".

## Big change proposals (2-3, most important first)

### Proposal 1: Post-match "Progress Receipt" and one source of truth for unlock state
- **Problem it solves:** I played a full match (shot-12) and got a leaderboard with funny awards but no reward feedback. After the lost Gauntlet (shot-18) the card read "You cleared 0 waves. best 0 Score 0" and nothing more. Records said "Matches played 8" only after I had finished autoplay batches; there was no moment of "here is what moved". The unlock and count mismatches listed above also come from each screen computing its own totals.
- **How it would work (detailed design):**
  - One `ProgressService` computes all counts (kaiju, tables incl. Workshop slots flagged separately, colours, achievements, story stars) from the save. Title, Gallery, Free Play, Party, Records and Story all read from it. Add a debug assertion in tests that every screen's "X/Y" equals the service.
  - After every match (Free Play, Party, Daily, Gauntlet run, Story chapter) show a "Receipt" panel under the results card for 4 s, tap to skip, with at most 4 rows: (1) achievements advanced with a mini progress bar (e.g. "Crumb Muncher 10 -> 34/100"), (2) any unlock earned ("Lime colour unlocked: Wear it?" with a Yes button), (3) one "closest goal" ("Rampage: 2 of 3 KOs in one KAIJU form"), (4) streak or Daily status.
  - Each row is a button: unlocks go to Gallery with the item selected; closest-goal opens Records on that page.
  - Where there is no progress (a loss with nothing earned), show "Nothing new. Tip: <one coaching line tied to the closest goal>" so the screen is never empty.
  - Numbers: max 4 rows, row height 56 px, auto-dismiss 4 s, never blocks the Rematch button (1 / START rematch stays live under it).
- **Example moment:** I finish Golden Spoon 3-0. The receipt slides in: "Spoon Fed: Win a Golden Spoon match, DONE. Lemon colour unlocked [WEAR]. Closest: Size Matters 9/10 KAIJU." I tap WEAR, and the Gobzilla on the next match start is already yellow.
- **Rewards / progression hooks:** Makes the existing 34 achievements and 15 colours actually felt; returns players for "one more match to hit the next bar". It also fixes the trust issue because every bar is the same number everywhere.
- **Risks and edge cases:** Autoplay batches and bots must not spam receipts (only show for human seats). Local multiplayer with 4 humans needs per-seat receipts, so show the best one and a "see Records" link. Online and phone layouts need a compact one-row variant. Not to be confused with a modal that blocks the rematch hotkey.
- **Size:** M. Touches results screen for all modes, Records, Gallery, Free Play and Party setup text, title NEXT UP.
- **Score impact for me:** +0.6. Fixes the main "unfinished state" feeling and the lack of a hook after each match.

### Proposal 2: Gauntlet as a real roguelite run (map, perk shop, run summary, meta carry-over)
- **Problem it solves:** I started Gauntlet from the title and it dropped me straight into wave 1 with no intro, rules or perk explanation (shot-15). I then lost three lives in a row on a 1-rival wave 1 (once to a cheese splat, once to a Bubblegumbo cutlery hit, once to Sloba) and got "cleared 0 waves" with no perk ever offered. The new perks (Ghost Start, Extra Life) were therefore never visible to me. The retry also swapped the table and rival (Fondue Night/Sloba -> Birthday Bash/Bubblegumbo -> My Table 1/Sloba), which contradicts "retries that wave". Also, the table pool includes my own empty Workshop table.
- **How it would work (detailed design):**
  - **Run start screen:** shows 3 hearts, the rules in 3 lines, the daily seed and the best wave. Buttons: START RUN, CHOOSE STARTING PERK (pick 1 of 3 random: Ghost Start, Extra Life, Spare Belly 40%).
  - **Wave structure:** waves 1-3 are 1 rival (easy, normal, normal), waves 4-6 are 2 rivals, wave 7 has a boss (kaiju with a power), then repeat harder. A "route" screen after each wave offers 2 doors: "Quiet Table" (safe, 1 perk pick) or "Spicy Table" (hard hazard plus a bonus crumb reward).
  - **Perk draft:** after every wave pick 1 of 3 perks (Thicker Skin, Faster Belly, Ghost Start, Extra Life, Boomerang Spoon...). Show the full perk list on the pause menu.
  - **Retry rule:** a lost life retries the same table, same rival and same seed, so the player learns the wave.
  - **Run summary:** on game over, show waves cleared, the perk chain used, kills, and "Gauntlet Coins" earned (1 per wave, 3 for a boss). Coins buy permanent starting-perk unlocks in a small "Pantry" screen (e.g. Ghost Start costs 10, Extra Life costs 25).
  - Exclude user Workshop tables unless "Include my tables" is ticked.
- **Example moment:** Wave 1 on Fondue Night. I get hit by cheese and lose a life, but the retry is the same wave and I know to dodge the ring. I win wave 1, pick Faster Belly, face a fork in the road (Quiet or Spicy), and finish at wave 5 with 2 coins that unlock Ghost Start for next time.
- **Rewards / progression hooks:** Gauntlet Coins and the Pantry give a reason to come back; "Gauntlet Runner" and "best wave" become milestones; daily seed gives a shared leaderboard-like target.
- **Risks and edge cases:** Balance of the Spicy door; runs must stay under about 8 minutes for the first 6 waves; the seed must stay stable across phone and desktop; do not let a player loop easy waves for coins (cap at 12 coins a day).
- **Size:** L. Touches Gauntlet flow, perk code, table selection, Records, and adds a Pantry screen.
- **Score impact for me:** +0.6 (a loop that makes the hardest content readable and replayable).

### Proposal 3: Dedicated "Training Room" and in-match input replay for bug reports and learning
- **Problem it solves:** As QA I could not reproduce my Gauntlet wave-1 losses, and a new player has no way to practise a KAIJU power or the new counterplay (stomp ring, dizzy window) without playing a full chaotic match. The only practice is "1-MINUTE PRACTICE" for newcomers. I also hit one results overlay (shot-12) where text sits on top of live gameplay, which is hard to read.
- **How it would work (detailed design):**
  - **Training Room** reachable from Free Play ("TRAIN") and from the Gallery (button on each kaiju: "TRY THIS POWER"). One empty table, one dummy bot with 3 modes (stands still, walks, fights back), belly always full on respawn, unlimited cutlery, KAIJU power cooldown shown as a number.
  - **Checklist overlay:** 5 tasks per kaiju (use the power, KO the dummy with it, dodge a stomp ring, hit a dizzy kaiju, survive a shrink warning). Completing all 5 awards a "Trained: <kaiju>" badge in the Gallery.
  - **Replay and seed:** the last match's seed and inputs are saved (last 3 matches); Records has "Replay last" so that a QA user, or a friend, can re-watch a defeat and copy a share code.
  - Results screen text moves to a clear dark panel instead of floating over the table.
- **Example moment:** I open the Gallery, pick Gobzilla, press TRY THIS POWER, see the stomp ring fill under a dummy and step out of it, and tick off "Dodge a stomp ring" with a small star.
- **Rewards / progression hooks:** 20 "Trained" badges (one per kaiju) feed a new Records achievement "Honours Student"; the training flow doubles as a better onboarding for KAIJU counterplay.
- **Risks and edge cases:** Needs deterministic seeds (check the harness `/act` and Online play); do not allow training progress to count toward win-based achievements; touch controls on phones need a visible EXIT button.
- **Size:** M. Adds a scene reusing the match engine, plus Gallery and Records hooks.
- **Score impact for me:** +0.4.

## How the new features from this round felt
- **STOMP coach:** Works. It bounces over the kaiju, and its key hint is context-correct ("PRESS E" vs "PRESS STOMP"). Issue: in shot-1 the label sits on top of the rival's body in the middle of the table, which blocks the view of the thing I most need to see. It could sit above and slightly offset, and fade after the first full stomp in a match.
- **KAIJU counterplay:** The stomp ring is clear in shot-11 (the ring around the giant Mothball fills before impact). I did not test shrink flashes in detail because the harness is frozen between commands and the window is short. The dizzy 0.75 s is too short to notice when played through a 1-3 s harness step; a bigger visual (stars plus a "DIZZY" tag) would help.
- **Gallery progress:** Good, readable lock text (see "What worked"). The weak point is consistency with Story progress (see biggest problem) and that locked colour text is small (shot-4, right of the swatches). Lemon, Sky and Lava are explained in Records ("Win a Golden Spoon match: Lemon").
- **Gauntlet lives:** The life-lost screen ("LIFE LOST! 2 left, trying wave 1 again with your perks...") is clear, but "with your perks" is empty text when you had none; the retry changed table and rival, so it did not feel like a retry. Ghost Start and Extra Life never showed because I never won a wave.
- **Party / Golden Spoon:** The rules are clear in the HUD. As a mode it leans towards KO farming: I won 3-0 with 8 KOs and little spoon holding, because KOs drop the spoon and respawns are free. It needs a reason to hold rather than hunt (e.g. holder is slower or glows and is chased, or a KO only drops it if the holder is hit). CUP LENGTH button is present ("CUP LENGTH 6 GAMES"). I did not run a full cup.

## Bugs that block play
- **Autoplay after "NEW RUN" did not stay in Gauntlet.** Steps: Gauntlet -> lose all 3 lives -> GAUNTLET OVER card -> click NEW RUN [510,624] -> `/autoplay?n=3&level=hard`. The resulting matches were 4-player Free Play style matches (kaiju Chocomunch, Squidgeon, Norigon, Avocadrake), not Gauntlet waves, and the Gauntlet best wave stayed 0 afterwards. Either NEW RUN did not register before autoplay started, or autoplay ignores the current mode. Also, the call exceeded 120 s (3 hard matches), so the harness timed out; that is not a game bug but worth noting. /errors: none. Screenshot: shot-20.png.
- **Enter does not advance Story dialogue.** Steps: Title -> Story -> Enter on chapter 1 (opens crab dialogue) -> press Enter 3 more times: nothing changes. Only Space or tap advances ("tap / SPACE" is shown, shot-22). The map hint line says "ENTER play", so a keyboard player will think the game froze. Also the /look text dump shows no dialogue text at all, so the harness (and any screen reader) cannot read it. No JS error.
- No crashes or JavaScript errors anywhere (checked 5 times, always "none").

## Small notes (max 5, one line each)
- Story map uses a snake layout (4 is top right, 5 below it, 8 far left) and the dialogue art covers chapter 8's label in shot-22; a plain left-to-right grid reads faster.
- Table counts differ per screen: 18 (Gallery), 15 (Free Play), 16 (Party), 19 (Records tables visited).
- The Golden Spoon icon in the HUD and on the table looks like a normal grey spoon (shot-11); gold tint would sell the mode.
- Escape from the Story map and from title behave inconsistently: the first Escape right after entering Story was ignored once, then worked.
- Countdown "1" overlaps a Workshop prop (tomato) and the round-start tip text sits on top of the table runner (shot-8), making it hard to read.
