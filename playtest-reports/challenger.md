# Playtest evaluation — The Challenge Seeker (challenger), round 10, port 7108

**Fun score: 7.0 / 10** (Gauntlet ramp and the next-wave preview are now fair and readable, but the hearts economy, flat hard-wave variety, and Spicy/Dessert/Seconds staying out of reach keep the "hard but fair, come back tomorrow" loop from reaching 9.)

> Screenshots: C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r10-7108\shot-N.png

## What I did
- About 110 harness commands, roughly 45 min of game time. Screens visited: Title, CHALLENGES popup, Gauntlet (5 runs, waves 1-7), Wave-cleared and Perk screen, Gauntlet Over (x4), Trials list, Trial "Hard Duel" (2 attempts, both lost), Daily (Hot Dumpling, 2 attempts, both lost), Story chapter map (Spicy / Dessert / Second Helpings locks), Opening cutscene.
- Gauntlet runs: (1) Starters -> cleared 5, died wave 6. (2) Mains start (wave 5) -> cleared 6, died wave 7 (Fists Only twist). (3) Starters -> cleared 4. (4) Starters -> cleared 2. (5) Mains -> cleared 6, died wave 7. Best wave 6, never reached 8, so Chef's Pass stayed 0/12 and 6/8. I never opened Spicy or Dessert.
- Matches: about 30 individual wave/round matches, about 20 won; Hard Duel 0/2 wins, Daily 0/2 wins. /errors was `none` at start, middle and end.
- Played mostly with `attack`, `auto:hard`, and a few `shove` at the Fists Only wave. I also used one `/autoplay?n=4&level=hard`, which exceeded the 120 s tool timeout, went to the background and spilled into a normal Free Play match after the Gauntlet ended.

## What worked for me
- The Gauntlet ramp is now genuinely gentle: wave 1 (1 rival), 2 (1 NORMAL), 3 (2 NORMAL/EASY), 4 boss (TOUGH+EASY), 5, 6 (3 rivals), twist at 7. I never felt cheated on waves 1-4.
- "WAVE N CLEARED! Next: wave 7 · 3 rivals (HARD, TOUGH, NORMAL) · twist wave · hearts" is exactly what a challenger wants: I know the difficulty mix and the heart count before I choose the perk (shot-5, shot-7).
- Perk pick (Full Belly / Sugar Rush / Mustard Coat / Ghost Start / Extra Life) gives real decisions, and the run-over screen lists perks taken.
- Gauntlet Over screen is excellent for a challenger: score, GRADE with the thresholds (C 350 · B 650 · A 1000 · S 1500), and the death tip tied to the actual killer ("Knocked out by: the Giant Hand · STOMP first, or DASH as it reaches you", shot-12; "Step out of the ring before each stomp" shot-8). The tip is the best teaching moment in the game.
- Pre-round banner shows the twist and a tip ("TWIST: FISTS ONLY - No cutlery at all", shot-15), so a twist wave is announced.
- Trials screen (shot-16) is clean: 8 fixed fights, three star conditions spelled out with the KO goal per trial, Chef's Pass progress under the header. Retry screen "SO CLOSE! TRY AGAIN?" shows "(you: 2)" KOs vs the goal of 4+ (shot-17). Quick `1 / START retry` is great.
- Daily result panel (shot-21) answers the new feature goal: "Today's medal: bronze · still open: silver win +20 · gold win without losing a round +40", and the countdown banner lists the same medals up front (shot-20).
- Course checkpoints work: the CHALLENGES popup flipped MAINS from locked to "start at wave 5" after I beat the wave-4 boss (shot-10).

## 🧾 Exactly what would make this a 9/10 for me
1. **Make hard waves hard in more ways than "more bots + a twist" and stop the 1-heart death spiral.**
   - What: waves 6-7 are where every run ended (5 of 5 runs). I enter wave 6 or 7 with 1 heart most of the time, so one mistake in a 3-rival free-for-all ends a long climb.
   - Where: Gauntlet, wave 5+.
   - Behaviour: grant +1 heart (max 3) on every boss-cleared wave (4, 8, 12), and offer Extra Life as a guaranteed slot every 4th wave instead of a random roll. Show hearts in the Next-wave line with a "+1 heart after boss" hint.
   - Impact: +0.6.
2. **Let Chef's Pass open the actual hard content for a challenger who never clears the Story.**
   - What: Story shows "SPICY: clear it (or Chef's Pass)" and "DESSERT finish the Feast or Chef's Pass", but the Pass says "any reached chapter", so on a fresh save only chapter 1 would open. The challenger gets 1 Spicy chapter, not a challenge route.
   - Behaviour: a Pass should open Spicy on chapters 1-6 and the Dessert Course's first 3 chapters at once, and the lock label should say "Pass: opens ch 1 only (you have reached 1)" so the reward is not a surprise.
   - Impact: +0.5.
3. **Make the Gauntlet reason-to-return richer than "beat your best wave".**
   - What: NEW BEST fires every run even when the score is lower (issue 4); no weekly seed, no leaderboard, no ghost of my best run, no per-run reward ladder.
   - Behaviour: Weekly Gauntlet seed (same table, twists and perks for everyone, resets Monday), a 3-row ladder (best wave, best score, best grade) per course, a coin payout per wave cleared past your best (wave 6 +30, 7 +40, 8 +60). Fix the NEW BEST badge so it only fires on a true best.
   - Impact: +0.6.
4. **Make boss waves real bosses.**
   - What: the wave-4 boss ("BOSS wave · TOUGH, EASY") played easier than wave 5-6 (no special rule, no boss name; TOUGH+EASY is weaker than the later HARD/TOUGH/NORMAL mixes). A boss wave that is among the easiest of the first eight breaks the promise.
   - Behaviour: boss waves get a named bot with a real mechanic (starts KAIJU-ready, as in Two Crowns), a banner "BOSS: DUMPLORD" and a heart reward.
   - Impact: +0.4.
5. **Daily should offer a pre-start card and a harder tier for a returning challenger.**
   - What: Daily dropped me straight into a 3-rival Hot Dumpling countdown from the title with no preview; I lost twice (0 rounds) and the only advice was "win to keep your streak".
   - Behaviour: pre-start card: today's mode, bots (normal/easy/easy), medals with open/earned ticks, best-ever rounds, and a "Try again, same seed" button. Add a 4th medal "win the Hard variant" unlocked after gold.
   - Impact: +0.4.
6. **Fix navigation traps in the challenge loop.**
   - What: "NEW RUN" restarts at wave 1 of Starters even after I unlocked Mains, and "MENU" from a Trial result goes back to the Trials list rather than the title (and clicking Daily at (954,640) there silently does nothing).
   - Behaviour: NEW RUN keeps the course I just played (or asks "Start from MAINS (wave 5)?"); MENU always returns to the title.
   - Impact: +0.3.
7. **Show the wave-8 target everywhere.** "Gauntlet wave 6/8" is ambiguous (best wave cleared or reached?). Say "clear wave 8" and add a progress bar. Impact +0.2.
8. **Trial feedback after a loss.** After two Hard Duel losses, say what to change, for example "You lost both rounds to the HARD bot's charge: practice the parry." Impact +0.2.

## 🔍 Every issue I saw (exhaustive)
| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Gauntlet waves 5-7 | I ended 5 of 5 runs at wave 6 or 7 with 1 heart left; no way to regain hearts except a random Extra Life perk. A single slip ends the run | shot-8, shot-12 | +1 heart per boss clear; guaranteed Extra Life every 4th wave |
| 2 | major | Gauntlet wave 4 "BOSS wave" | Boss wave is "(TOUGH, EASY)", weaker than waves 5-7; no boss mechanic or name | shot-7 | Named boss with KAIJU-ready start and visible reward |
| 3 | major | NEW RUN button / Gauntlet Over | NEW RUN restarts at Starters (wave 1) even though Mains is unlocked; I had to go Menu -> Title -> CHALLENGES -> MAINS each time (4 extra clicks) | shot-8, shot-13 | Keep last course or ask |
| 4 | major | Gauntlet Over | "NEW BEST! Score 470 · GRADE C" shown right after a 670 run, and again for "Score 230 · GRADE D" after 2 waves; the NEW BEST badge fires every run (or is per-course without saying so) | shot-13 | Only show on a true best, and say "best for Starters" if it is per course |
| 5 | major | Chef's Pass / Story lock labels | Pass opens "Spicy on any reached chapter"; on a fresh save that means chapter 1 only. Lock text "SPICY: clear it (or Chef's Pass)" does not say how many chapters the Pass opens | shot-24 | Show "Pass opens ch 1-N" in the lock text |
| 6 | minor | Chef's Pass line (CHALLENGES popup, Trials) | "Gauntlet wave 6/8" is ambiguous: cleared or reached? | shot-10, shot-16 | Reword to "clear wave 8" and add a progress bar |
| 7 | minor | Twist banner on light tables | "TWIST: FISTS ONLY" at top of Bakery Bench is pale on pale table, nearly invisible; the countdown subtext is readable only thanks to the outline | shot-15 | Add dark pill behind the twist label |
| 8 | minor | Gauntlet Over perks line | The perks list runs to the right edge of the translucent box at 4 perks ("Mustard Coat" flush with the box edge) | shot-8 | Wrap onto a second line or widen the box |
| 9 | minor | Wave-cleared perk cards | The big kaiju art overlaps the right-hand perk card (card 3) at its edge; the label stays readable but the art covers the card border | shot-5, shot-7 | Move the kaiju art up or draw it behind the card |
| 10 | minor | Daily result | The "THIS MATCH" reward box overlaps the bottom-left of the standings panel (box x24-368, panel starts x165) | shot-21 | Shift the panel right or shrink the box |
| 11 | minor | Daily start | Straight from title click to countdown: no pre-start card, no rules before "2". Rules show only in a countdown tip | shot-20 | Pre-start card with medals, mode rules, retry-same-seed |
| 12 | minor | Daily match HUD | My seat is marked only by "▼ YOU" in the countdown and "(YOU)" in the final standings; the top roster has no YOU tag during play | shot-20, shot-21 | Keep a YOU tag in the top roster |
| 13 | minor | Trials result / pause | "MENU" from a Trial result returns to the Trials list, not the title; pressing Escape twice during an active Trial match left screen "game" with no visible pause menu in /look | shot-19 | Make Menu go to the title; show a pause menu |
| 14 | minor | Title, CHALLENGES tile | Subtitle "Gauntlet (best 5) · Trials 0★" wraps to two lines and crowds the button's lower edge | shot-10 | Shorten: "Best wave 5 · Trials 0★" |
| 15 | minor | Story map | The DESSERT lock text ("finish the Feast or Chef's Pass") is tiny (about 8 px) and hard to read | shot-23 | Increase font or use two lines |
| 16 | minor | `/autoplay` while in a Gauntlet | `autoplay n=4 level=hard` spilled out of the Gauntlet into regular Free Play matches (summary showed BLUEBEARY, 4 bots) and counted toward other progress | (none) | Stop autoplay when the Gauntlet ends |
| 17 | polish | Gauntlet Over perks | Perks stack duplicates ("Sugar Rush, Ghost Start, Sugar Rush, Mustard Coat") with no stack count; unclear if duplicates stack | shot-8 | Show "Sugar Rush x2" and say what stacking does |
| 18 | polish | Wave-cleared screen | No wave-time or score tally on the cleared screen; only the next-wave preview | shot-5 | Add "+120 pts · clear time 0:42" |
| 19 | polish | Trials | No trial shows my best attempt or round record before I start (all empty stars), and no hint on which trial is easiest for reaching 12 stars | shot-16 | Recommended-order tag or a "closest to a star" marker |
| 20 | polish | Death screen | "Knocked out by: cutlery x3" / "fell off x2, a KAIJU" is good, but there is no replay button for the deciding moment | shot-17 | Offer a 5 s "Watch how" replay |

## 🔠 Text and layout check
- Title: OK (shot-1). "NEXT UP" card fits. The CHALLENGES tile subtitle wraps (issue 14).
- CHALLENGES popup: OK, no overlap; the Chef's Pass line is just inside the box edge (shot-10).
- Gauntlet countdown (Starters/Mains): OK; the twist banner is hard to read on light tables (issue 7, shot-15).
- Wave-cleared / perk pick: kaiju art overlaps the right perk card edge (issue 9, shot-5, shot-7). All card text readable.
- Gauntlet Over: perk line runs to the box edge (issue 8, shot-8); otherwise OK (shot-12, shot-13).
- Trials list: OK, no overlap (shot-16). Trials result "SO CLOSE": OK (shot-17).
- Daily countdown: OK (shot-20). Daily result: the THIS MATCH box overlaps the panel corner (issue 10, shot-21).
- Story chapter map: OK but the DESSERT lock text is tiny (issue 15, shot-23). Opening cutscene: OK (shot-22).
- In-match HUD (all runs): OK; roster slots fit up to 4 players.

## The single biggest structural problem
The Gauntlet is a one-heart-pool climb where the interesting content (Dessert, Seconds, Spicy via the Pass) sits behind waves I cannot reliably reach, and there is no recovery mechanic. Every run I had died by wave 6 or 7 with 1 heart. After a death the NEW RUN button returns me to wave 1, so the challenge loop is a long replay of the easy part. The ramp is now gentle (good), but the difficulty cliff at waves 6-7 (3 rivals including a HARD, plus a twist) arrives exactly when the heart pool is empty.

This makes the hard content feel gated by attrition, not skill. A challenger wants to reach the hard stuff quickly and fail in it: Pass progress should be reachable by skill in short bursts (Trial stars are the right shape, but Hard Duel already beat me twice with no stars to show), not a marathon of easy waves.

## Big change proposals (2–3, most important first)
### Proposal 1: Heart recovery and a boss-wave ladder
- **Problem it solves:** 5 of 5 runs ended at wave 6-7 on 1 heart; wave 4 "boss" is weaker than later waves; NEW RUN restarts at wave 1.
- **How it would work (detailed design):** Hearts max 3. Each boss wave (4, 8, 12) is a named bot ("BOSS: DUMPLORD, starts KAIJU-ready, first to 3") and clearing it restores +1 heart and saves the checkpoint. The perk pick always includes Extra Life as a fixed slot after waves 4/8/12 (no RNG). Failing a wave costs a heart but the retry offers a free perk reroll. NEW RUN asks "Start from MAINS (wave 5)? [Yes] [Wave 1]".
- **Example moment:** I clear the wave-4 boss, see "BOSS CLEARED +1 heart (3/3) · checkpoint saved", and reach waves 6-7 with 2-3 hearts, so I can learn the twist wave instead of dying on first contact.
- **Rewards / progression hooks:** each boss clear pays +40 / +80 / +120 coins and adds a stamp on the CHALLENGES popup.
- **Risks and edge cases:** too forgiving if heart gain stacks with Extra Life; cap at 3 total.
- **Size:** S-M
- **Score impact for me:** +0.9

### Proposal 2: Weekly Gauntlet seed with a ladder and ghost
- **Problem it solves:** no reason to come back except a personal best wave; NEW BEST badge fires on every run.
- **How it would work (detailed design):** CHALLENGES gets a 5th tile "WEEKLY": a fixed 12-wave seed (same bots, tables, twists and perk offers for everyone), resets Monday. After the run: wave reached, score, grade, your top 5 results, plus a ghost marker "your best: died on wave 8 (Chef's Board)". Each week has a rotating modifier (no power-ups, bots +1 level, all twists).
- **Example moment:** "Weekly #47 · Modifier: HARD BOTS · you cleared 7 (best 9) · beat your best by 2 waves = +80 coins".
- **Rewards / progression hooks:** a weekly stamp card (3 stamps = a Shiny colour) and Weekly-only titles.
- **Risks and edge cases:** the game is mostly offline, so the ladder is local best-5 unless Online is hooked in.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 3: Challenge Board with exact Pass rewards
- **Problem it solves:** the Pass says "any reached chapter" and I cannot tell what I will unlock; hard content stays hidden.
- **How it would work (detailed design):** one "CHALLENGE BOARD" page listing every hard goal as rows with progress bars: Trial stars (0/12), Gauntlet wave (6/8), Spicy chapters (0/12), Daily medals (bronze today), Dessert Course (locked: needs Pass or Feast). Each row shows the exact reward and a "Play this" button that jumps in. The Story lock labels say "Pass opens ch 1-N (you have reached N)".
- **Example moment:** I see "Gauntlet wave 6/8 · 2 more waves -> Pass: opens Spicy ch 1 + Dessert ch 1-3", and press Play straight into Mains wave 5.
- **Rewards / progression hooks:** completing a row pops a banner and pays coins.
- **Risks and edge cases:** duplicates the existing popups; replace them rather than add a third list.
- **Size:** M
- **Score impact for me:** +0.5

## How this round's new features felt
- **Gauntlet ramp:** big improvement. Waves 1-4 are easy-but-engaging (1 rival NORMAL, then 2 NORMAL/EASY), waves 5-6 jump to 3 rivals which felt like a wall with 1 heart; the wave-7 twist (Fists Only on a light table) was announced clearly in the banner. The cleared-wave preview with bot levels and heart count is the best new thing for me.
- **KAIJU warning:** I died to freshly stomped KAIJUs (DUMPLORD at the end of run 1, CHOCOMUNCH in run 2), and the death tip "Step out of the ring before each stomp, then hit them while they are dizzy" was teachable and accurate; I could see the red ring around CHOCOMUNCH in shot-12. Bots visibly waited before attacking at round start. It only mattered from wave 6 on.
- **Chef's Pass:** the progress line shows in CHALLENGES, Trials and the Story locks, which is great. But "wave 6/8" is ambiguous and "any reached chapter" undersells the reward (issues 5, 6). I never got far enough to see an unlock.
- **Daily:** the open-medals line is exactly what I asked for. Nice that the bronze auto-pays on a loss. Missing a pre-start card and any harder tier (issue 11).
- **Trials:** clean, but Hard Duel (one HARD rival, first to 3) beat me twice with 1 and 2 KOs and gave no stars; no partial progress toward the 12 stars. A single star for "win a round" would soften the gate.
- **Party Cup, Kid Mode, Gallery, Records, First-timer, Twist picker, Workshop:** not touched as the challenger (Spicy and Dessert were locked, so I could not test them).

## Bugs that block play
- None blocking. `/errors` returned `none` at start, middle and end.
- Non-blocking: NEW BEST badge fires every run (issue 4); `/autoplay` spills out of a Gauntlet into free play (issue 16); NEW RUN ignores the unlocked Mains checkpoint (issue 3).
