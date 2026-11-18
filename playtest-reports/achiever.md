# Playtest evaluation — The Achiever

**Fun score: 6.0 / 10** (the achievement list is clear and well-rewarded in shape, but grinding it is slow, and the new token/mastery/orders layer is a shallow side system that doesn't connect to the 34 achievements I actually care about.)

## What I did
- Title -> Records (both pages), Free Play, /autoplay x4 (about 10 minutes of wall-clock for 4 normal matches), Pantry, Gallery, Gauntlet (manual perk picks, auto-bot fights, 2 runs), Daily (Hot Dumpling, won), Records again, bought Lifeline in the Pantry.
- About 13 matches played, 5 won (the rest were autoplay losses in a seat with a random kaiju). Records went 0/34 -> 8/34 achievements; tokens 0 -> 430 -> 80 after the Lifeline purchase; Chef Rank Dishwasher -> Prep Cook. /errors was "none" at the start, middle and end.
- Screenshots (all in C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r6-7101\): shot-1 (Records), shot-3/4 (results receipt), shot-6 (Pantry), shot-7 (Gallery), shot-9 (Gauntlet wave clear), shot-15 (Daily result).

## What worked for me (briefly)
- Records is a good achievement board: every row shows requirement, progress bar and colour reward, and the footer "Next up: Rampage (67%) — Knock out 3 rivals in one KAIJU form" always names the next target.
- Achievements that unlock colours (Lime, Grape, Lava...) are a good hook; the Gallery shows a colour strip with padlocks (shot-7).
- Gauntlet pays well (+45 tokens for wave 1) and ends with a grade ("Score 260 · GRADE D").
- Pantry is clean and readable (shot-6); Weekly Orders show progress bars.

## The single biggest structural problem
**There is no way to make achievement progress faster than the slowest, dullest route, and the new systems don't feed the achievement list.** I wanted to grind. /autoplay ran 4 matches in roughly 10 minutes and put me in a random kaiju each time (Favourite kaiju became Squidgeon while I "started" as Gobzilla; I won 1 of 4). "Score 250 knockouts" stood at 25/250 after about 13 matches (roughly 2 KOs a match), so it needs 100+ matches: more than 4 hours of autoplay. "Eat 1,000 crumbs" was 139/1000; "Win 50 matches" was 5/50. Records tells me the numbers but not how long the rest takes, and nothing (an order, a token item, a Mastery level) speeds up or targets an achievement. Chef Tokens, Mastery, Chef Rank, Weekly Orders and the Pantry are a second progression track running in parallel, so the Achiever now has two lists to chase and neither feeds the other. For a player whose whole fantasy is "100% completion", that caps the score.

## Big change proposals (2–3, most important first)

### Proposal 1: Achievement Contracts (targeted, tiered way to chase achievements)
- **Problem it solves:** Records shows 34 achievements with raw counters (25/250 KOs, 139/1000 crumbs, 5/50 wins) but no efficient route. I got about +2 KOs or +10 crumbs per match with no control. Autoplay is slow, random-kaiju, and cannot aim at anything. Weekly Orders (Knock out 20 / Win 5 / Go KAIJU 8) are generic and rarely line up with what I'm missing.
- **How it would work (detailed design):**
  - Records gets a "CONTRACTS" button beside PAGE. The player pins up to 3 achievements as Active Contracts by clicking a row (a pin icon appears on it).
  - Each pinned achievement becomes a Contract card with tiers finishable in a few matches. Cutlery Drawer (250 KOs) gets 5 tiers: 25 / 50 / 100 / 175 / 250 KOs, paying 25 / 40 / 60 / 90 / 150 tokens; tier badges show on the Records row. Counters over 100 get 5 tiers, 10-99 get 3, one-shots get none.
  - A thin contract tracker line sits under the round banner during matches ("Cutlery Drawer 27/50 · Belly 139/250").
  - The results receipt gets one line per contract: "Cutlery Drawer +3 (30/50)". It replaces the second tip (which currently says "Tough bots? Set BOT LEVEL to EASY" even after a win).
  - Free Play setup gets a "CONTRACT MODE" toggle: bot count, level, table and mode auto-pick to favour the contract (KO contracts: Hard bots, small table; crumb contracts: Crumb Rush; streak contracts: Easy bots, first to 3).
  - "AUTO-GRIND 5" button on the contract card plays up to 5 matches with the player's chosen kaiju (not a random one) at 3x time-scale (about 1 minute total instead of about 12), then shows a summary table.
- **Example moment:** I pin Cutlery Drawer, Bottomless Belly and On a Roll. In-match the HUD reads "Cutlery 25/50 · Belly 139/250 · Streak 0/3". I get 4 KOs and 31 crumbs; the receipt says "Cutlery Drawer +4 (29/50) · Bottomless Belly +31 (170/250)". After 6 more matches: "CONTRACT TIER: 50 KOs · +25 tokens" and a tier medal appears on the row.
- **Rewards / hooks:** tier tokens (about 365 across the Cutlery tiers), tier medals on Records, a "Contract Closer" achievement for 10 finished contracts. Gives steady visible progress in place of a 4-hour wall.
- **Risks and edge cases:** token inflation (cap tier payouts, aim for about +30% session income); online matches should count but not change online rules; mode-specific achievements (Golden Spoon, Team Feast) need the toggle to jump into that mode; autoplay losses must not count as wins unless the bot actually won.
- **Size:** M. Touches Records, receipt, match HUD, Free Play setup, autoplay, token economy.
- **Score impact for me:** +1.2. Turns the main complaint (unclear, endless grinds) into a visible ladder.

### Proposal 2: Mastery Trophy Wall (give Mastery, tokens, Chef Rank and orders a destination)
- **Problem it solves:** Tokens, Mastery (Lv 1 Rookie, Lv 2 Line Cook), Chef Rank and Weekly Orders exist, but the Pantry has only 6 items (4 colours at 120-400, Lunchbox 250, Lifeline 350). After about 15 minutes I had 430 tokens and spent 350 on the Lifeline in one click with no confirm. The Gallery card says "Mastery ★☆☆☆☆☆ Lv 1 Rookie (46/60 XP)" but I can't see what the other stars give. Rank names show no thresholds.
- **How it would work (detailed design):**
  - Mastery rewards per kaiju, one per level (6 levels): Lv2 portrait frame, Lv3 victory pose line, Lv4 a kaiju-exclusive colour (20 extra Gallery colours), Lv5 alternate KAIJU-form aura, Lv6 gold name plate on the match HUD. The Gallery card shows six slots with the next one named ("Lv 3 victory pose: 14 XP to go").
  - Chef Rank ladder shown in full on Records: 8 ranks (Dishwasher, Prep Cook, Line Cook, Sous Chef, Chef de Partie, Head Chef, Executive Chef, Kaiju Chef) with lifetime-token thresholds 0 / 300 / 800 / 1,800 / 3,500 / 6,500 / 10,000 / 15,000, each paying a one-time bonus and unlocking higher Pantry tiers.
  - Pantry gets three tabs: COLOURS (4 now plus 8 more, 120-600), BOOSTS (Lunchbox, Lifeline, plus "Second Helping" = retry one Gauntlet wave, "Spare Fork" = one extra Daily try), DECOR (table cloths, results-card frames, title backdrops, 100-500). Every purchase asks for a confirm tap.
  - Weekly Orders become 5, scaled to rank; one is an "ACHIEVEMENT ORDER" tied to the nearest unfinished Records row, paying 80 instead of 40.
  - Title "NEXT UP" line can also say "15 XP to Gobzilla Lv 3 (victory pose)".
- **Example moment:** In the Gallery I see Gobzilla at Lv 2 with "Lv 3 victory pose: 47 XP". I choose Gobzilla for two matches instead of a random seat, hit Lv 3, the receipt says "MASTERY Lv 3: unlocked Victory Pose" and the pose plays at round end. I then spend the 430 tokens on a colour.
- **Rewards / hooks:** 120 mastery rewards (20 kaiju x 6) and an 8-step rank ladder are a long tail for completionists.
- **Risks and edge cases:** mastery colours dilute achievement-only colours (mark them separately in the Gallery strip); Gauntlet paid +45 per wave versus 8-18 per normal match, so rebalance or cap daily tokens; palette-swap art cost for 20 colours.
- **Size:** L. Touches Gallery, Pantry, Records, receipt, match HUD, save format.
- **Score impact for me:** +1.0.

### Proposal 3: Achievement Atlas with categories, how-to and ETA
- **Problem it solves:** Records is one flat 34-item list over two pages (PAGE button, no page indicator). Requirements like "Shove a rival into the blender", "Watch 10 Hot Dumplings pop on someone else" or "Clear a Story chapter on Spicy" carry no hint of which mode or table, and no time estimate.
- **How it would work (detailed design):**
  - Category tabs on Records: ALL / COMBAT / PARTY / STORY / CHALLENGE / COLLECT. Clicking a row opens a side panel: description, "How to get it" (mode and best settings), recommended kaiju, and an ETA from the player's own average ("About 40 matches at your pace: 25/250 KOs at 2.1 per match"). Hide the ETA until 5+ matches.
  - A "JUMP TO IT" button launches the right mode with preset rules (Free Play on the blender table with 2 bots, Spicy chapter 1, Hot Dumpling with 4 bots).
  - Title screen badge row: "4/19 colours · 8/34 achievements · Chef Rank Prep Cook".
  - Completed rows show the date unlocked.
- **Example moment:** I tap "Smoothie Operator". The panel says "Shove a rival into the blender. Table: a blender table (Free Play, 2 bots). ETA: 1-3 matches." I tap JUMP and I'm in that match 3 seconds later.
- **Rewards / hooks:** no new rewards; makes existing ones reachable. Also serves the Collector.
- **Risks and edge cases:** wild ETAs with little data; online-only achievements need a "needs friends" tag.
- **Size:** M. Touches Records, setup screens (preset launch), title screen.
- **Score impact for me:** +0.8.

## How the new features from this round felt
- **Chef Tokens:** fast and visible (+18 for a win, +8 for a loss, +45 for a Gauntlet wave). Gauntlet pays 2-5x a normal match, so tokens push you to the hardest mode. 430 tokens in about 15 minutes against only 6 shop items means the shop is near-empty already (Proposal 2).
- **Kaiju Mastery:** visible only in the Gallery card and the receipt ("Mastery Lv 2 Line Cook · 53/100 XP"). I can't see any reward for levels, so it reads as a bare number.
- **Weekly Orders:** clean cards, but 3 generic orders at 40 tokens each. "Go KAIJU 8 times" reached 6/8 from incidental play; they don't link to achievements.
- **Receipt card:** useful on Free Play and Gauntlet results, but absent on the Daily result (shot-15: no receipt, no token line). The tip line is not always relevant ("Tough bots? Set BOT LEVEL to EASY" appeared after a WIN on a Gauntlet wave).
- **Chef Rank:** only a label in Records and Pantry; no thresholds.
- **Gauntlet:** courses and grade work ("GAUNTLET OVER. You cleared 2 waves (reached STARTERS) · NEW BEST! Score 260 · GRADE D · perks: Mustard Coat, Full Belly"). Waves 1-2 were fine; wave 3 (Breakfast Rush) took all 3 lives against a Normal bot. I did not reach the wave-4 course boss or wave-5 twists.
- **Daily medals:** I could not find a Bronze/Silver/Gold medal anywhere; the result says only "Today: won ✔ · best 3 rounds · tries 1 · win streak 1 day". The Daily was Hot Dumpling, so the mode of the day changes the challenge a lot.
- **Comeback help / House Rules / Clarity:** House Rules button is on the Free Play setup (not tried). The countdown tip "The giant hand goes for whoever has the fullest belly" shows. Not deeply tested.
- **Text fit:** see Bugs.

## Bugs that block play
None blocked play; /errors was "none" throughout. Text-fit and display issues (non-blocking):
1. **Results awards line overruns.** On results the bottom line "Most KOs... · Crumb Monster... · Butterfingers... · Survivor..." wraps to two lines and the second line overlaps the table edge and the area under the REMATCH/MENU buttons. Screenshots: shot-4.png, shot-15.png.
2. **Receipt card text is long for its box.** In shot-4.png the card grows upward over the table; /look shows the knocked-out line and tip running on ("...👋 swipe 💡 DASH sideways whe..."), so tips are close to the card edge.
3. **Gauntlet wave-clear: perk cards cover the receipt card.** In shot-9.png the three perk cards (Mustard Coat / Ghost Start / Hot Feet) are drawn over "THIS MATCH / +45 Chef Tokens / Mastery Lv 2" so it reads "THIS MATC", "+45 Chef T" and the tip is hidden.
4. **Daily results have no receipt or medal** (shot-15.png); the "Today: won ✔ ..." line crosses red tablecloth stripes and is hard to read.
5. **Duplicate names on results:** shot-4.png lists "3. BUBBLEGUMBO (YOU)" and "4. BUBBLEGUMBO" (two of the same kaiju in one match, from autoplay seat assignment).

## Small notes (max 5, one line each)
- /autoplay is slow (about 2.5 min per match) and ignores the kaiju you picked; add a speed-up and keep the chosen kaiju.
- Pantry purchases complete on a single click with no confirm (Lifeline 350 bought instantly).
- The "Tough bots? Set BOT LEVEL to EASY..." tip shows after wins and wave clears; only show it after repeated losses.
- Chef Rank names (Dishwasher, Prep Cook) don't show their thresholds anywhere.
- Records page 2 hides behind a PAGE button with no "1/2" indicator.
