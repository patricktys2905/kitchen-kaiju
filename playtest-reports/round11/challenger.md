# Playtest evaluation — The Challenge Seeker (challenger), round 11

**Fun score: 7.6 / 10** (the Gauntlet boss waves, perks and checkpoints are the best challenge loop yet, but the ladder tops out too early for a skilled player, Trials and Daily have no mastery curve, and several result screens have overlaps and silent failures)

> Screenshot folder: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r11-7108\` (shot-N.png). Harness commands used: about 105. JS errors at start, middle and end: none.

## What I did
- Title → CHALLENGES popup (shot-14) → Gauntlet from STARTERS. Played the whole run with the `attack` assist, waves 1-12, about 55 harness commands. Cleared waves 1-11 (lives lost at waves 5, 6, 8 twice, 9, 10, and the wave-12 boss ended the run). Final screen: GAUNTLET OVER, "cleared 11 waves, NEW BEST, Score 1380, GRADE A" (shot-10).
- Pressed NEW RUN: it started at wave 9 DESSERTS from my checkpoint (shot-11). Pause menu QUIT needs a second press (good).
- Trials list (shot-15), played **Brutal Bot** twice (0-3 loss with the attack assist, then 1 KO with auto:hard, "SO CLOSE"). 0 stars earned.
- Daily card (shot-19), played the **SPICY DAILY** (Crumb Rush, Smoothie Bar, HARD/TOUGH/NORMAL rivals) to a win: 8+ rounds, about 15 harness commands (shot-22, shot-24).
- Story: Opening cutscene, Dessert Course 1/4 (lost once, then cleared, shot-26/28). Chapter 1 normal (3 stars), Spicy toggle test, then Spicy chapter 1 cleared ("Feeling Spicy!").
- Records (stats + GOALS, shot-30/31), Pantry (shot-32/34; bought Lifeline and Lunchbox for the Gauntlet), Gallery (Gobzilla and Chocomunch, shot-35/36).
- Matches: Gauntlet 17 round-sets, Trials 2, Daily 1 (won), Dessert 2 (1 lost, 1 won), Story 2 (both won). Roughly 35-40 min of game time.

## What worked for me
- **Boss waves feel like bosses at wave 8 and 12.** Wave 8 Toastbat (spatula plus KAIJU squash) beat me twice; the "BOSS: TOASTBAT" intro card (shot-8) and "+30 🪙 and a ❤" reward are the pull I want.
- **Perk pick after each wave** (3 options, keys 1/2/3) gives a build feel; the end screen lists all perks. Shield perk is a good panic button.
- **Checkpoints and NEW RUN from the checkpoint** work (shot-11). NEW BEST is real (shot-10), with a grade and printed thresholds (C 350 · B 650 · A 1000 · S 1500).
- **Weekly Gauntlet best** shows "🗓 This week: 11 (beat it: +25 🪙)".
- **The Giant Hand is telegraphed** (in-run tip plus "Knocked out by: ✋ the Giant Hand" on the receipt). I died to it twice and it read as fair.
- **Spicy Daily** card is clear: "HARD rivals · +40 🪙" and a medal ladder.
- **Records ▸ GOALS** (shot-31) is excellent: collections with "next:" lines, the 4 closest achievements with PIN.
- **Pantry buys** ask "tap again to buy" one item at a time (shot-34). Lifeline/Lunchbox are real Gauntlet power buys.
- Receipts list everything earned, including orders, achievements and unlocks (shot-5, shot-6, shot-24).

## 🧾 Exactly what would make this a 9/10 for me
1. **Make the top of the Gauntlet a wall with a long tail.** Where: Gauntlet waves 1-12 and SECONDS (locked until "clear wave 12"). Waves 1-7 fell to one assist command per round. How: add a BRUTAL rival from wave 10, an endless wave 13+ with a new modifier each wave, and a boss every 4th wave that always starts with KAIJU ready. The wave 4 boss (Chocomunch) died in about 8 s with no KAIJU use. Impact +0.6.
2. **Give Trials a visible reason to return.** Where: CHALLENGES → TRIALS. Show best result/time/KOs and attempts on every card, a "next star" hint ("3 more KOs for ★★★"), 1-key retry, and a reward step at 6/12/18/24 stars (colour, title, Gauntlet perk). The loss card says "(you: 0)" but not the margin (rounds 0-3). Impact +0.5.
3. **Fix silent/unclear locks.** The Spicy toggle on an uncleared chapter does nothing and says nothing (3 clicks, shot-38), while the Challenges banner says "Spicy works on every chapter you've reached". Show "🔒 clear this chapter first" or make it work. Impact +0.3.
4. **Pay the weekly best once.** I got "New best this week: wave N! +25 🪙" at waves 5, 9, 10 and 11 in one run (100 🪙). Pay once per week (or per tier) and show the target to beat on the end screen. Impact +0.3.
5. **Cap the Spicy Daily length.** Crumb Rush "first to 3" against 3 bots ran about 9 rounds / 285 crumbs because bots KO each other and stars split 3-2-1-1. Cap rounds (best of 5) and add "⏱ ≈ N min" to the Daily card (Party setup already has it). Impact +0.4.
6. **Give Daily and Spicy a score.** "Today: won ✔ · best 3 rounds" is not a number I can beat tomorrow. Add a points score with a personal best and friends comparison. Impact +0.4.
7. **Fix the end-of-wave overlaps** (receipt over perk card 1, shot-6; Pantry toast over shop cards, shot-32). Impact +0.2.
8. **Give Dessert Course a receipt.** Course 1 cleared with only "COURSE 1 CLEARED! Next: Brain Freeze" and no tokens/XP/stars (shot-28). Impact +0.2.
9. **Boss intro should name the threat.** "BOSS: TOASTBAT" should add its KAIJU power and a counter hint. Impact +0.2.
10. **Order the loss causes.** "Knocked out by: ⬇ fell off, 👋 swipe, 🍴 cutlery" loses the order and round. Show per round. Impact +0.1.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Story map, uncleared chapter 1 | "🌶️ SPICY: OFF" does nothing and gives no message when clicked; banner says "Spicy works on every chapter you've reached". After clearing ch1 it toggled to "SPICY: ON (tougher rivals)". | shot-38, shot-43 | Show "🔒 clear this chapter first", or reword the banner. |
| 2 | major | Gauntlet wave-clear | The "🧾 THIS MATCH" receipt overlaps perk card 1: "THIS MATC" is cut by the card border and the tokens line is hidden behind it. | shot-6 | Move receipt out of the perk row or shrink it. |
| 3 | major | Gauntlet wave 4 boss | Boss CHOCOMUNCH never used KAIJU and died in about 8 s; it is easier than waves 5-6 and than the wave 8 boss. Brief says boss waves are the hardest of the course. | shot-4, shot-5 | Boss starts near KAIJU, plus 1 HARD bot. |
| 4 | major | Gauntlet / weekly | "New best this week: wave N! +25 🪙" paid 4 times in one run. | wave-clear receipts | Pay once per week or cap it. |
| 5 | major | Daily SPICY | Crumb Rush first-to-3 took about 9 rounds; the card shows no ETA. | shot-19, shot-24 | Add ⏱ and a round cap. |
| 6 | major | Dessert Course clear | "COURSE 1 CLEARED! Next: Brain Freeze" with no receipt, tokens or XP and no NEXT/MAP buttons. | shot-28 | Add a receipt and buttons like Story. |
| 7 | minor | Pantry | First-visit toast "🍽 FIRST SERVICE ✔ Visit the 🛒 Pantry: +25 🪙" sits mid-screen with no backing, overlapping the orders progress bar and Peach/Blueberry text, and stayed for several actions. | shot-32 | Anchor it top-right and time it out. |
| 8 | minor | Gauntlet perk picker | "PICK A PERK FOR THE NEXT WAVE (1 / 2 / 3)" sits on the player kaiju and pancake, hard to read on busy tables. | shot-3, shot-5 | Dark pill behind the heading. |
| 9 | minor | Gauntlet perk picker | Big KAIJU art at right overlaps the border of perk card 3. | shot-5, shot-6 | Draw art behind the cards. |
| 10 | minor | Gauntlet wave clear | Text "Next: wave 9 ... ❤❤ +❤ for the boss!" after clearing a boss is ambiguous; ❤❤ text vs ❤4 on the HUD. | shot-9 | "❤ 2 (+1 on boss clear)". |
| 11 | minor | Gauntlet intro | Info block ("GAUNTLET · 🍖 MAINS · WAVE 8 (COURSE BOSS) · ❤ 4 · 3 rivals + 👑 BOSS · Pancake Stack") crosses the pancake and the countdown "1". | shot-8, shot-11 | Move below the countdown. |
| 12 | minor | Gauntlet intro | Faded "TWIST: SNACK ATTACK" banner drawn over the ketchup bottle, nearly unreadable. | shot-11 | Solid pill. |
| 13 | minor | Gauntlet perk picker | Offered perks reshuffle each wave and sit in different slots, so pressing a remembered key picks a different perk. | shot-5, shot-6 | Fixed order by type. |
| 14 | minor | Gauntlet over | Perks line ("🍪 Full Belly, 🍪 Full Belly, 🟡 Mustard Coat, ...") is one 1100 px line nearly touching both panel edges, duplicates ungrouped. | shot-10 | Group as "Full Belly ×2". |
| 15 | minor | Gauntlet over | Receipt panel (bottom-left) crowds the NEW RUN/MENU row. | shot-10 | Reflow. |
| 16 | minor | Trials | No best result/attempts on the cards; loss says "(you: 0)" not the margin. Trial forced Norigon, unclear whether my kaiju choice is ignored. | shot-15, shot-16, shot-17 | "Last: 0-3, 0 KOs"; show which kaiju is used. |
| 17 | minor | Trial result | Receipt shows "Play a Free Play match ✓ +20 🪙" and "Mastery Lv 1 Rookie" (jumped from Lv 4 in Gauntlet: mastery is per kaiju, not labelled). | shot-17 | Label "Norigon Mastery". |
| 18 | minor | Trial result | Dark-on-dark card text and the pink mascot clip the panel's right side; tip text small. | shot-17 | Raise contrast. |
| 19 | minor | Daily card | 🌶️ SPICY button is taller (two lines) than START/BACK; no mention whether Spicy has its own medals. | shot-19 | Align heights, add medal info. |
| 20 | minor | Daily result | Title "DAILY CHALLENGE COMPLETE!" wraps to two lines; the semi-transparent panel sits on a busy arena. | shot-24 | Opaque panel. |
| 21 | minor | Daily result | "Today's medal: 🥈 · still open: 🥇 win without losing a round" while Crumb Rush rounds/stars are different things; unclear definition. | shot-24 | One-line definition. |
| 22 | minor | Daily in-match | "STOLEN!" text and the ⏱ timer overlap table items at the arena edge. | shot-22 | Put timer in the HUD. |
| 23 | minor | Dessert intro | "Velvaroo: ..." taunt line at the top of the table is nearly invisible on candy stripes. | shot-26 | Dark box behind dialogue. |
| 24 | polish | Dessert Course | Clicking "🍰 DESSERT 1/4" starts the match with no preview card. | shot-26 | Add a card (rivals, rules, reward). |
| 25 | polish | Story map | 🎬 SCENE button straddles the bottom border of the chapter panel, next to "Not cleared yet". | shot-38 | Move inside. |
| 26 | polish | Story | Opening cutscene, chapter scene and head chef chat each need separate SKIP presses. | shot-25, shot-39 | One SKIP. |
| 27 | polish | Chapter clear | "📜 Meanwhile…" line is tiny and repeats unchanged on REPLAY. | shot-42 | Bigger, first clear only. |
| 28 | polish | Records | "Tables played on 10/18" vs Goals "Tables 14/18". | shot-30, shot-31 | Unify or label. |
| 29 | polish | Records GOALS | No challenge rows (Gauntlet S grade, Trial ★, Daily streak). | shot-31 | Add them with "next:" text. |
| 30 | polish | Gallery | Gobzilla shows "You vs it: 1–0" (vs itself) and "GOBZILLA JR." vs tile "GOBZILLA". | shot-35 | Hide self record, unify name. |
| 31 | polish | Gallery | Chocomunch panel: last Rewards line ("gold frame · crown · Shiny") reaches the panel bottom edge; "Win 1 match in any mode (you have 1/1)" shown though already unlocked. | shot-36 | Taller panel, hide once done. |
| 32 | polish | Title | CHALLENGES tile wraps to two lines ("Gauntlet (best 11) · 🎯 Trials 0★") and its label shifts up versus siblings. | shot-14 | Shorten. |
| 33 | polish | Pause (Gauntlet) | "RESTART" meaning in a run unclear (wave or run?). | shot-12 | "RESTART WAVE". |
| 34 | polish | Life Lost | The receipt text exists in /look but is not drawn in the screenshot. | shot-7 | Draw it or remove it. |

## 🔠 Text and layout check
- **Title** (shot-1): OK. CHALLENGES tile wraps to two lines (shot-14, minor).
- **Challenges popup** (shot-14): OK.
- **Gauntlet intro cards** (shot-2, shot-4, shot-8, shot-11): countdown digit overlaps the info block and the pancake; faded twist banner unreadable (shot-11).
- **Wave-clear + perk picker** (shot-3, shot-5, shot-6, shot-9): PROBLEM. Receipt overlaps perk card 1 (shot-6); heading over players; art over card 3.
- **Life Lost** (shot-7): OK.
- **Gauntlet over** (shot-10): dense, text spans nearly the full width; otherwise OK.
- **Pause menu** (shot-12): OK.
- **Trials list** (shot-15): OK. **Trial result** (shot-17): mascot clips the panel edge, small tip text.
- **Daily card** (shot-19): OK, button heights differ. **Daily in-match** (shot-22): STOLEN! and timer overlap items. **Daily result** (shot-24): crowded.
- **Dessert intro/clear** (shot-26, shot-28): taunt near-invisible; bare clear screen.
- **Records** (shot-30): OK. **Goals** (shot-31): OK.
- **Pantry** (shot-32, shot-34): PROBLEM, toast overlap (shot-32).
- **Gallery** (shot-35, shot-36): tight at the bottom on Chocomunch.
- **Story map** (shot-38): SCENE button breaks the panel border. **Chapter clear** (shot-41, shot-42): OK, Meanwhile line small.
- Phone and Kid Mode not checked (desktop harness).

## The single biggest structural problem
The challenge content has a **ceiling and no tail**. Gauntlet waves 1-8 are trivial for a competent player, waves 9-12 are the real game, and after the wave-12 boss there is nothing (SECONDS is locked behind it and still ends). Trials are 8 fixed fights with stars but no best times and no reward step until all 24 stars. The Daily gives a medal but no number to beat.

A challenge seeker finishes the whole "hard" list in one sitting (11 waves in about 12 minutes of game time with an assist) and is left with "beat 11", a weekly faucet and Spicy chapters. A 9 needs an escalating, scored, effectively endless ladder with a weekly hook.

## Big change proposals (2-3, most important first)

### Proposal 1: Endless Gauntlet "SECONDS" with weekly mutators
- **Problem it solves:** no content after wave 12; the weekly best is a faucet.
- **How it would work (detailed design):** After the wave 12 boss the run continues as SECONDS (waves 13+). Each wave adds one stackable mutator from about 12 (Giant Hand every 15 s, shrinking floor, rivals start KAIJU-ready, sticky pancakes, only 2 cutlery, rival shields). Every 4th wave is a boss that starts with KAIJU on. Perks continue, capped at 3 copies. A weekly seed fixes the mutator order so everyone plays the same run. Score = waves × 100 + KO bonus − hearts used × 50, graded C to SS.
- **Example moment:** Wave 14, "Mutator 2/5: HAND EVERY 15 s"; I pick Mustard Coat and survive a boss that goes KAIJU on spawn.
- **Rewards / progression hooks:** weekly payout once per tier (wave 12, 16, 20), "S-chef" frame, a Gallery shiny at SS.
- **Risks and edge cases:** stacked-mutator balance; long runs need a bank-and-exit option at each boss.
- **Size:** L
- **Score impact for me:** +0.8

### Proposal 2: Trials 2.0 (par times, ghosts, loss breakdown)
- **Problem it solves:** Trials have 3 stars and no depth; losing gives no margin.
- **How it would work (detailed design):** Each card shows best result (rounds, KOs, time), a par time and an attempt counter. A 4th gold goal (par time) unlocks at ★★★. Loss screen shows the per-round cause ("Round 2: squashed by KAIJU Bubblegumbo at 0:41") and a 1-key retry with a ghost of your best run. Star rewards at 6/12/18/24 pay a colour, a title and a Gauntlet perk slot.
- **Example moment:** Brutal Bot: "Last: 0-3. Par 1:40. Next star: win 1 round."
- **Rewards / progression hooks:** "Trial Master" HUD title, ghost sharing by code.
- **Risks and edge cases:** ghosts need an input log; keep optional.
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: Daily with a score and a streak ladder
- **Problem it solves:** the Daily is a win/lose medal with a 25-minute worst case.
- **How it would work (detailed design):** Daily gets a points score (rounds, KOs, crumbs, time bonus) and a round cap (best of 5 for Crumb Rush). The card shows ⏱ ≈ N min, today's score vs your best, and a 7-day streak ladder (3/5/7 days pay 🪙 and a Gauntlet perk). SPICY multiplies the score ×1.5 with its own medal row. Online codes compare scores with friends.
- **Example moment:** "Today 840 pts · Spicy ×1.5 = 1260 · beat yesterday (1120)".
- **Rewards / progression hooks:** 7-day chest, weekly friends ranking.
- **Risks and edge cases:** timezone rollover; everyone plays the same kaiju set.
- **Size:** M
- **Score impact for me:** +0.5

## How this round's new features felt
- **Boss waves hardest, +30 🪙:** good at waves 8 and 12, weak at wave 4 (issue 3). Receipt shows "👑 Boss wave cleared! +30 🪙". The "+❤ for the boss!" copy is confusing (issue 10).
- **Gauntlet NEW BEST, NEW RUN from checkpoint, boss ❤:** all work (shot-10, shot-11).
- **🗓 Weekly Gauntlet best (+25 🪙):** works, but pays on every improvement within a run (issue 4).
- **🌶️ SPICY DAILY (+40 🪙):** great concept; receipt says "🌶️ SPICY DAILY beaten! +40 🪙". Duration is the problem (issue 5).
- **Daily preview card:** present and readable (shot-19).
- **Giant Hand warns every time:** the indicator and tip made deaths feel fair.
- **Pantry one item at a time, first visit +25 🪙:** works; the +25 toast overlaps the shop (issue 7).
- **KAIJU 7 s, shorter dizzy, 1.4 s shield:** rounds felt fair; HUD showed "KAIJU 3s!" in the Dessert clear (shot-28).
- **Gallery 📊 record, mastery bar, ✨ Shiny:** visible, no longer blank (shot-35/36); self record odd (issue 30).
- **Records ▸ GOALS:** best new feature for completionists; add challenge rows (issue 29).
- **Story "📜 Meanwhile…", tip on card, "Chapters N/12":** all present; Meanwhile line small and repeated on replay.
- **Round 10 fixes:** the receipt lists multiple achievements and unlocks (shot-6, shot-24). TRY IT and the Cup were not touched.
- **Dessert Course:** fair but the clear screen is bare (issue 6).
- **Party, Help, Phones/Kid Mode, Workshop:** not touched in this profile.

## Bugs that block play
- None. No JS errors (/errors: none at start, middle, end). One silent-failure UX bug: the Spicy toggle on an uncleared chapter (issue 1).
