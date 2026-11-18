# Playtest evaluation: The First-Timer (newbie)

**Fun score: 7.5 / 10** (the first 5 minutes are well taught and charming, but the title screen gives a first-timer six equal doors and no obvious "next", the Practice drill is a one-off, and the new progression sits behind a currency I could not spend for hours.)

## What I did
- Title screen, then HELP (BASICS tab), then the 1-minute PRACTICE drill (8 steps, all completed by driving the harness, about 50 sec of game time).
- Free Play: clicked PLAY on a setup screen with zero seats claimed (it auto-seated me), played one full match vs Toastbat on Normal. Lost 2-3 (shot-10).
- Story: opening cutscene (skipped), Ch 1 (3 stars) and Ch 2 (2 stars) using the bot to drive.
- Looked at Pantry, Records, Gallery, and ran a Gauntlet (cleared wave 1, died wave 2, grade D, score 120).
- About 75 harness commands, 5 matches. /errors was "none" at start, middle and end.

## What worked for me (briefly)
- HELP is short and plain: "Be the last kaiju standing on the dinner table" is a one-line goal. Practice then teaches throw, swipe, stomp and dash in 8 ticked steps with a bottom hint ("PRACTICE 4/8 👉 ...").
- The Story Ch 1 rival tutorial line ("Hold THROW to charge...") and the in-match tips (💡 KAIJU mode makes you immune...) are well timed.
- The results receipt (🧾 tokens, mastery, "Knocked out by: cutlery x3", "DASH sideways when you see a charge line") gave me a concrete reason I lost. This is the best new thing for a newcomer.
- Chapter-clear card with a rival quote and animated stars is charming (shot-18).
- Title-screen "NEXT UP" line gives a goal.

## The single biggest structural problem
**There is no guided path from "I finished the tutorial" to "I am hooked", and the early game spreads the player across too many equal doors.** After I finished Practice (the drill ends with "All done! Esc → pause → QUIT", which dropped me on the HELP screen, not on a recommended next step), the title screen showed six big tiles (Story, Free Play, Online, Party Modes, Daily, Gauntlet) plus six small buttons (Settings, Help, Kaiju, Records, Pantry, Workshop), and the Practice button had disappeared. Nothing said "play Story Chapter 1 now". I picked Free Play and, with no explanation of seats, was dropped into a Normal-bot match where I lost 2-3 without ever using my stomp, because 50 seconds of Practice had not yet become reflex.

It matters because a first-timer's first 10 minutes decide whether they play an 11th. The game has a very good on-ramp piece (Story Ch 1 vs an "easy" Crabbage, first to 2) but it is not the default route. Meanwhile the new progression systems (tokens, mastery, orders, Pantry) are invisible to a newcomer: I had 7 tokens after a full match and the cheapest Pantry item is 120, so the economy tells me nothing for roughly 15 matches.

## Big change proposals (most important first)

### Proposal 1: "First Service": a guided first-hour onboarding ladder
- **Problem it solves:** After Practice I was dumped on a flat title screen. I chose Free Play, found 6 empty seats ("click or THROW to join"), pressed PLAY, was auto-seated against a Normal bot, and lost. No step told me what to do next or that Story Ch 1 was the gentle option. The Practice button vanished from the title once done, so I could not revisit it.
- **How it would work (detailed design):**
  - A persistent 6-step checklist card on the title screen called "FIRST SERVICE" (replaces the one-time "NEW HERE?" button; stays until all 6 are done, then collapses into Records). Steps and rewards:
    1. Do the 1-minute Practice (15 🪙).
    2. Win Story Ch 1 (25 🪙).
    3. Win a Free Play match vs EASY bots (the setup screen auto-selects EASY the first time; 25 🪙).
    4. Go KAIJU once in a real match (20 🪙).
    5. Knock someone off the table with a DASH shove (20 🪙).
    6. Try one other mode: Daily, Party or Gauntlet (30 🪙).
  - Total 135 🪙: enough to buy the cheapest colour (Peach, 120) in the first session, so the Pantry becomes meaningful immediately.
  - The title tile matching the next step gets a pulsing outline and a one-line caption ("Next: Win Story Ch 1"). Other tiles stay usable.
  - Practice ends with a proper end card ("Nice! START STORY CH 1 ▶ / Practice again / Title") instead of "Esc → pause → QUIT".
  - Free Play setup, first time only: pre-claim seat 1 for the player with a "YOU" banner, default bots to EASY with one line of explanation ("Bots are EASY. Change any time"), and first to 2 rounds.
  - Result cards of matches that complete a step show a tick ("Step 3 of 6 ✔ +25 🪙").
- **Example moment:** I finish Practice, see "Practice done +15 🪙" and a big "START STORY CH 1 ▶" button. I win Ch 1; the checklist ticks 2/6 and pulses Free Play with "Win vs EASY bots". By step 4 I have gone KAIJU and sit at about 100 🪙, hungry for the Peach colour.
- **Rewards / progression hooks:** 135 🪙 in the first hour, a first Chef Rank bump (Dishwasher to Line Cook), and the first Pantry purchase. Weekly Orders only appear on the title after the checklist is done so newcomers are not overloaded.
- **Risks and edge cases:** Veterans should not be nagged: add "I know how to play: skip" (grants nothing). Online and Party players must still reach their modes without the ladder blocking. Needs 6 save flags; infer steps for old saves from existing stats (Story stars, times gone KAIJU).
- **Size:** M (title screen, Practice end card, Free Play setup defaults, small save tracker, results hook).
- **Score impact for me:** +0.8. It fixes the exact moment I was lost and ties the token economy into session one.

### Proposal 2: Visible, fast-moving progression for new players (a first purchase inside one session)
- **Problem it solves:** The receipt said "+7 Chef Tokens (7)" after a full Free Play match and "+44" after Story Ch 1, but the cheapest Pantry item is 120 and all six read "(not enough yet)" (shot-13). Records shows rank "Dishwasher" with no next rank, threshold or bar. Gallery colour swatches are 19 nameless padlocks (shot-21). Mastery says "Lv 2 Line Cook 55/100 XP" but not what Lv 3, 5 or 10 gives.
- **How it would work (detailed design):**
  - A "NEXT GOAL" strip on the Pantry and the results receipt with a progress bar ("🪙 71/120: Peach colour"), so every match visibly moves it.
  - A cheap tier of 6 items at 20 to 60 🪙: 3 results-screen table cloths, 2 emotes, 1 title badge. Purely cosmetic; they show in Records.
  - Chef Rank ladder with thresholds shown in Records and Pantry: Dishwasher (0), Line Cook (150 lifetime 🪙), Sous Chef (500), Chef de Partie (1200), Head Chef (3000), Executive Chef (7500). Each rank grants one unlock (title, colour or Pantry slot).
  - Mastery card in Gallery lists the next 3 milestones under the bar ("Lv 3: kaiju-only colour, Lv 5: victory pose, Lv 10: gold frame").
  - Gallery colour swatches show name and unlock method on focus ("Grape: score 25 knockouts, 7/25").
- **Example moment:** After my Free Play loss the receipt says "🪙 +7 (7/40 to the Checkered Cloth)". After Story Ch 1 I have 51 and buy it on the Pantry. Then "Next: Peach 120" appears and Story feels like it is paying for something.
- **Rewards / progression hooks:** Short, medium and long goals on one screen. A losing player still sees progress, turning "I lost" into "I got closer".
- **Risks and edge cases:** Cheap items must not flatten the economy for the 120 to 400 items; trim token grants 10 to 20% if needed. Phone UI needs a one-line version of the strip. Rank thresholds need balancing against Gauntlet and Daily income.
- **Size:** M (Pantry, Records, Gallery, receipt, token tuning, 6 new items).
- **Score impact for me:** +0.6.

### Proposal 3: "Rematch Coach": adaptive first matches and a Gauntlet intro
- **Problem it solves:** I lost my Free Play match 2-3 on Normal. The receipt tip ("DASH sideways when you see a charge line") was good but came after the match, and nothing linked Story's easy opponents to Free Play's Normal default. Gauntlet started instantly with no explanation of lives, perks or courses, and I was out on wave 2 (grade D).
- **How it would work (detailed design):**
  - Track a skill estimate over the first 6 matches (rounds won/lost, KOs, KAIJU uses, falls). The Free Play setup shows "Suggested: EASY / NORMAL / HARD" with one reason line ("You lost to cutlery 3 times: try EASY").
  - After 2 consecutive losses in the first 10 matches, show a mercy card with buttons (Switch to EASY / Try Story Ch 1 / See tip), extending the existing text-only mercy tip.
  - In the first 3 matches keep the "BELLY FULL! PRESS E / Y → KAIJU" prompt on screen until pressed (it was excellent in Practice).
  - Gauntlet, first run only: an explainer card (3 lives, perk after each wave, course boss every 4th wave) and a soft cap at Starters (waves 1 to 4).
- **Example moment:** I lose my first Free Play match; the setup now reads "Suggested: EASY, because you lost 3 of 5 rounds to cutlery". I tap EASY, win 3-1 and go KAIJU for the first time.
- **Rewards / progression hooks:** +50% 🪙 for the first 5 EASY wins so EASY is never a trap; a "Graduated to NORMAL" toast.
- **Risks and edge cases:** Only active in the first 10 matches or with "Beginner help" on in Settings, so veterans are not patronised. The estimate must never leak into online matchmaking. With 4 humans in Free Play, advise the host only.
- **Size:** S to M (Free Play setup, Gauntlet intro, mercy card, stats).
- **Score impact for me:** +0.4.

## How the new features from this round felt
- **Chef Tokens / receipt card:** Works and is the strongest new thing for a first-timer. The tip line was relevant each time (charge line, step out of the stomp ring). Tokens lack a visible goal (Proposal 2).
- **Kaiju Mastery:** Visible in the Gallery card and receipt ("Lv 2 Line Cook 55/100 XP", later "Lv 3 Sous Chef"). Nothing says what each level gives; needs listed milestone rewards.
- **Weekly Orders / Pantry:** Pantry layout is clean (shot-13). The three orders (20 KOs, 5 wins, 8 KAIJU) are sensible, but nothing introduces the Pantry to a newcomer apart from the small title button.
- **Chef Rank:** Only a name in Records; no next rank or bar.
- **Gauntlet:** Instant start with no explanation; the perk picker (Sugar Rush / Full Belly / Extra Life) was clear. The end card with Score 120 and Grade D is good. Death to a KAIJU Bluebeary showed a relevant tip ("Step out of the ring before each stomp").
- **COMEBACK HELP / mercy tip:** Never saw it fire in my 5 matches, so it is invisible to a new player.
- **House Rules:** Present as a button on Free Play setup; easy for a newcomer to ignore. Not opened.
- **Story "what beat you" / rivals react:** Crabbage's "Not even ONE round for me?!" after a perfect clear is funny. I only won in Story, so I did not see a defeat card.
- **Clarity:** First matches were short and the practice flow is good. In Story Ch 2 round 1 the event log said "YOU knocked out (hand)" (the Giant Hand); the bot was driving so I did not see the first-time explanation.
- **Text fit:** two overlaps on the Gauntlet wave-clear screen and one on the title (below).

## Bugs that block play
None block play. /errors was "none" at start, middle and end.
- Overlap (Gauntlet wave-clear): the left perk card ("SUGAR RUSH") covers the "🧾 THIS MATCH" receipt card and cuts off its token line. Repro: Gauntlet, clear wave 1. Screenshot: C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r6-7104\shot-23.png
- Overlap (same screen): the achievement toast "🏆 ON A ROLL: Win 3 matches in a row" is drawn on top of the "Next: wave 2 · ❤❤❤" line (shot-23).
- Overlap (title screen): the big "KITCHEN KAIJU" logo's "JU" runs under the SETTINGS and HELP buttons, and the "NEXT UP" text sits over the fork art. Screenshot: C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r6-7104\shot-12.png
- The HOW TO PLAY MOVES and CONTROLS lines are cut at about 120 characters in /look output only; the screenshot (shot-2.png) fits, so this is harness truncation, not a bug.

## Small notes (max 5, one line each)
- Practice's last step says "Esc → pause → QUIT"; replace with an end card and keep a Practice entry on the Help screen after completion.
- Free Play setup shows 6 identical empty "click or THROW to join" seats while PLAY auto-seats you anyway; pre-claim seat 1.
- Free Play says "16/20 kaiju" unlocked while the title says "Clear Story ch 4 → Minturtle"; the unlock count confuses a brand-new player.
- Gallery colour swatches are 19 nameless padlocks; label them on focus with the unlock condition.
- The Giant Hand KO text reads "knocked out (hand)"; say "grabbed by the Giant Hand".
