# Playtest evaluation — The Challenge Seeker

**Fun score: 6.0 / 10** (the hard modes exist and the course-boss idea is good, but I hit my first boss within about 8 minutes and found nothing past it to aim at: no ladder, no rising stakes, no reason to run it a tenth time.)

## What I did
- About 55 harness commands on a fresh save (3 achievements, 0% Story).
- **Gauntlet, 2 runs:**
  - Run 1: waves 1 to 3 cleared, died in wave 4, grade C, score 360 (shot-4.png).
  - Run 2: died on the wave-4 COURSE BOSS, grade C, score 350 (shot-21.png).
  - I picked perks on every wave (Extra Life, Full Belly twice). Waves were mostly piloted by `auto:hard`. By hand I won wave 1 and lost a life on wave 2 (shot-3.png).
- **Daily Challenge:** played to completion (Hot Dumpling, Fondue Night). Won over 6 rounds, got a Silver medal and a streak of 1 (shot-9.png).
- **Free Play:** BRUTAL bots plus the KAIJU FRENZY twist, 3 players. I lost the two rounds I played by hand. Then an 8-match autoplay on hard went 3 wins, 5 losses.
- **Other screens:** Pantry (shot-5.png), Records (shot-18.png), Story select (shot-10.png, shot-11.png).
- **Not reachable on a fresh save:** Spicy chapters ("SPICY: clear it first"), chapters 5 to 12 and the Dessert Course. As a challenge-seeker I could not touch them.
- About 30 matches in total. Tokens ended at 738.
- /errors was "none" at the start, middle and end.

## What worked for me (briefly)
- The Gauntlet frame is right: three lives, a perk pick after each wave, a course boss on wave 4 ("3 rivals + 👑 BOSS"), and a score with a letter grade. Seeing grade C told me better grades exist.
- The receipt card's "Knocked out by: 🦖 a KAIJU" plus a tip ("Step out of the ring before each stomp, then hit them while they are dizzy") is the best part of this round. It turned a loss into a lesson, and the tip changed between runs.
- Daily results are clear: a 4-seat standings list, a streak and a medal. The Pantry is easy to read.
- "💫 DIZZY! HIT IT NOW!" fired at the right moment.
- BRUTAL bots are properly hard. They go KAIJU and use powers constantly.

## The single biggest structural problem
**Every challenge mode is a one-shot score attempt with no ladder above it, no way to set a target, and nothing carried between runs.**

I went straight for the hardest content. Gauntlet gave me "GRADE C" and "NEW BEST!" twice (the second time with a lower score, 350 against 360, which looks like a bug). Nothing told me what a B or an A needs, or what lies beyond the course boss. I only ever saw "🥗 STARTERS", and the twist waves from wave 5 were beyond my reach, so the run ended before the interesting part. The only carry-over is the Pantry (Lunchbox 250, Lifeline 350), and those make the run easier rather than giving me a harder goal. I finished with 738 unspent tokens and nothing that mattered to buy.

The Daily has the same shape. I won, got Silver, and the screen does not say what Gold takes (shot-9.png). There is one daily mode per day and no difficulty tiers. Spicy chapters and the Dessert Course are gated behind normal clears, so for a challenger the hard content is a long detour behind easy content.

My loop was: try, die at the boss, see grade C, close the app. Failure gives me a tip but no milestone and no next step.

## Big change proposals (2–3, most important first)

### Proposal 1: Gauntlet Ladder (named grade targets, course gates, Marks track)
- **Problem it solves:** I scored 360 and 350 and was told only "GRADE C". There was no stated goal, no visible course map, and nothing carried across runs. The Starters boss at wave 4 stopped me twice, and the run just ended.
- **How it would work (detailed design):**
  - **Course map screen.** Tapping GAUNTLET on the title opens a vertical course map before the run: Starters (waves 1 to 4, boss), Mains (5 to 8, boss), Desserts (9 to 12, boss), Seconds (13+, endless, a boss every 4th wave). Each course shows locked or unlocked and the best grade.
  - **Grade thresholds, shown before and during the run.** Publish the table: C = 250, B = 600, A = 1200, S = 2200. Show the next threshold in the HUD under the wave counter ("B at 600 · you: 360"). The results screen says how far the next grade was.
  - **Checkpoints.** Killing a course boss earns a Gauntlet Ticket (hold up to 3). A ticket lets a new run start at the next course, with 2 lives and no perks, so it is a fair shortcut and not a free ride.
  - **Marks and modifiers.** After each run, award Marks: 1 per wave cleared, 3 per boss, 5 for an S. Spend Marks on a 10-node tree of harder-run options (2 lives only, faster stomp cycle, bosses with a second kaiju). Each raises the score multiplier, up to x2.0. This lets a challenger make the Gauntlet harder, not easier.
  - **Results screen.** The receipt keeps its tokens and mastery lines. Add a "NEXT GOAL" row: "Reach wave 6 for B grade (+150 pts)".
- **Example moment:** I die on the wave-4 boss with 360 points. The results screen says "Starters boss: 1 hit short. B grade needs 600." I press NEW RUN, see "B at 600" in the HUD, and play wave 3 faster to bank points. This time I kill the boss, earn a ticket and a Mark, and the next run offers "Start at Mains".
- **Rewards / progression hooks:** grade medals per course (a 12-slot grid in Records), Marks for the modifier tree, tickets, a Gauntlet line on Chef Rank. The reason to return is a visible next step on every run.
- **Risks and edge cases:** tickets could cheapen runs, so cap them at 3 and cost one per use. Modifiers need a clear label showing the score multiplier. On phones the course map must scroll vertically. Online is not affected.
- **Size:** L. Touches Gauntlet results and HUD, Records, the title menu, save data and the Pantry.
- **Score impact for me:** +1.5. It turns "grade C" into a ladder, which is what a challenge-seeker lacks.

### Proposal 2: Daily Challenge tiers with a visible medal rule
- **Problem it solves:** I won the Daily and got "Silver daily medal" (shot-9.png) with no rule shown. One daily per day with a single win condition takes 5 minutes, then nothing until tomorrow. The screen offers REMATCH but does not say whether a retry counts.
- **How it would work (detailed design):**
  - **Three tiers per day, same seed, same mode.** Bronze: win the match (what exists now). Silver: win and meet one extra condition (for example "lose 0 rounds" or "go KAIJU twice"). Gold: win on BRUTAL bots with a stated condition.
  - **Medal rule shown before the match.** The pre-match card lists all three tiers: "Bronze ✔ · Silver: lose no rounds · Gold: BRUTAL, no rounds lost". Today it only says "win this match to clear today and keep your streak".
  - **Results screen.** Say which condition was met or missed ("Silver: lost 2 rounds, needed 0").
  - **Retries.** Unlimited per day. Only the best medal counts. The card keeps "tries N".
  - **Streak and calendar.** The streak counts any medal. A 7-day grid on the title screen shows medal colours. 5 Golds in a week earns a Pantry colour.
- **Example moment:** I open the Daily and see "Hot Dumpling · Gold: BRUTAL, no rounds lost". I win on NORMAL, see Silver, then retry on BRUTAL. I lose, retry, and get Gold on try 4.
- **Rewards / progression hooks:** medals feed Records and Chef Rank. A weekly order "earn 5 Golds" gives a week-long goal. The aim changes each day, which brings players back.
- **Risks and edge cases:** Hot Dumpling is luck-heavy (I won partly because bots eliminated each other, shot-7.png), so a Gold rule must be checked per mode. Use a fixed UTC reset.
- **Size:** M. Touches the Daily setup card, results, Records and save data.
- **Score impact for me:** +1.0.

### Proposal 3: TRIALS (fixed, handcrafted hard scenarios, ungated)
- **Problem it solves:** On a fresh save, "SPICY: clear it first" and chapters 5 to 12 were locked (shot-10.png). The only hard content I could open was BRUTAL Free Play, which has no goal and no reward.
- **How it would work (detailed design):**
  - A new tile on the Modes screen: TRIALS, 12 fixed scenarios, each a short match with a special rule and a pass condition. Examples: "Survive 60s vs 3 BRUTAL bots", "Win with no weapon pickups", "KO 3 rivals only while they are DIZZY".
  - 3 stars each (time or lives). The first 4 trials are open at once. Each further row of 4 opens at 6 stars.
  - Rewards: 30 / 50 / 80 tokens per star tier, and a colour at each 12-star milestone.
  - Built from existing systems (twists, bot level, Giant Hand, stomp rings). Weekly Orders can add "Earn 6 Trial stars".
- **Example moment:** I pick "Dizzy Hunter". I stay outside the red ring, wait for "💫 DIZZY! HIT IT NOW!", dash in, and KO the shrinking kaiju. I repeat for 3 KOs, earn 2 stars, and retry for the third.
- **Rewards / progression hooks:** colours and tokens, plus a Records line "Trials 14/36 ★". It rewards the stomp-ring skill the game now teaches.
- **Risks and edge cases:** each trial needs balancing. Hazard randomness needs a fixed seed. Keep the scenarios in data so they are cheap to extend.
- **Size:** L (content-heavy). Touches mode select, match setup rule hooks, results and Records.
- **Score impact for me:** +1.0.

## How the new features from this round felt
- **Chef Tokens, Mastery, Pantry:** tokens flowed fast (738 after about 30 matches) and Mastery reached Lv 4 quickly. But the shop is shallow: 6 items, and the Gauntlet ones make runs easier. I ended with 738 tokens and no use for them. It needs a lasting sink: harder-run options, tiered Lunchbox and Lifeline, weekly stock (see Proposal 1). Weekly Orders (Knock out 20, Win 5, Go KAIJU 8) are identical for everyone and easy for a challenger.
- **Receipt card:** the best new feature. "Knocked out by" and the tip changed with each death. It would be stronger with a "Try this" link to practice.
- **Gauntlet:** Courses, the wave-4 boss, 3 lives and a perk pick every wave work. "LIFE LOST! ❤❤❤ left · trying wave 2 again with your perks…" was clear. Missing: grade thresholds and a view of what is next. I never reached wave 5, so I cannot judge the twist waves. Full Belly stacked twice with no note about stacking.
- **BRUTAL bots:** properly hard. With KAIJU FRENZY, bots went KAIJU and used powers within the first 4 seconds, and I lost both my rounds. Together these removed the build-up phase, so it felt harsh, not clever. There is no reward for beating BRUTAL.
- **Daily medals:** Silver was shown but the rule was not (Proposal 2).
- **COMEBACK HELP / mercy tip:** the Gauntlet defeat tip said "Tough bots? Set BOT LEVEL to EASY, or switch on COMEBACK HELP in Settings." Gauntlet has no BOT LEVEL setting, so that advice does not apply.
- **House Rules:** I saw the 💾 HOUSE RULES button but did not use it.
- **Story clarity:** "DIZZY! HIT IT NOW!" appeared at the right moment. I did not reach Story fights, so I cannot judge "What beat you" on defeat cards or the rivals' reactions.

## Bugs that block play
- None blocking. /errors was "none" throughout.
- **"NEW BEST!" on a worse run.** Run 1: score 360, "NEW BEST!" (shot-4.png). Run 2: score 350, "NEW BEST!" (shot-21.png). It may be tracking waves, not score, but it reads wrong next to a lower score.
- **Text overlap, Daily complete (shot-9.png):** the hint "1 / START rematch · Esc menu" is drawn on top of the "DAILY SPECIAL: Win a Daily Challenge" line near [640,515], so neither reads. The bottom awards line wraps to two lines at y=660 to 690 and runs into the table border.
- **Text overlap, Gauntlet wave-clear (shot-2.png):** the receipt card ("THIS MATCH, +20 Chef Tokens, Mastery") is partly covered by the first perk card ("Mustard Coat"), so it reads "THIS MATC" and "+20 Chef T". This is the screen where the player picks perks.
- **Tight fit, Gauntlet over (shot-21.png):** the receipt card (three text blocks) reaches the NEW RUN button's left edge. Readable, but close.

## Small notes (max 5, one line each)
- The mercy tip on a Gauntlet defeat refers to BOT LEVEL, which Gauntlet does not have.
- After results, MENU and then clicking GAUNTLET landed me in Free Play setup once, so I played a Free Play match by accident.
- "You cleared 3 waves" appeared after dying in wave 4; say whether the dying wave counts.
- Records shows "Gauntlet best wave 3" but not best score or grade.
- Pantry items do not say whether Lunchbox and Lifeline are one-time or per-run in the card text.
