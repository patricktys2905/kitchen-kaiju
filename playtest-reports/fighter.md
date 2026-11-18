# Playtest evaluation: The Fighter

**Fun score: 6.5 / 10** (the core brawl is readable and the stomp, dizzy and power loop is a good idea, but there is no ladder of skill to climb, no way to practise a KAIJU power, and the only "hard" content is bots that run the same script.)

## What I did
- Title, Free Play setup (bot level cycling NORMAL / HARD / BRUTAL / EASY, per-seat bot level, kaiju cycling), Gallery (mastery line), Pantry (weekly orders and shop), Gauntlet, results receipts. About 55 harness commands.
- Free Play 1v1 as Gobzilla vs a NORMAL Avocadrake: lost the match 1-3. I tried the stomp early at belly 100 and was chopped by the Chef's Board cleaver within 1.5 s of going KAIJU (shot-3). Later I won one round with auto:hard.
- Free Play 3-seat as Squidgeon vs one BRUTAL and one EASY bot (Avocadrake and Salmonster): won 3-2 (shot-7). Receipt: +48 tokens, Mastery Lv 2.
- Gauntlet: cleared waves 1 to 3 (perk picks: Full Belly, Sugar Rush, Mustard Coat), then lost all 3 lives on wave 4, the Starters course boss (3 rivals plus a boss). Score 350, GRADE C (shot-10).
- Short manual test with stomp then `power`: KAIJU lasted about 4.3 s and the power fired 3 times (a charge-like use per ~1 s).
- `/errors` was "none" at start, middle and end.
- My `attack` command never stomps, so most of my skill-based testing went through the harness's blunt controls. Take my reads on depth with that in mind.

## What worked for me (briefly)
- Matches are fast (a round is about 10 to 20 s), so each loss costs little and I wanted "one more".
- The receipt card says how I died ("cutlery, cleaver, a KAIJU") and gives a one-line tip (shot-4, shot-10). This is the best fighter-facing feature added this round.
- Comeback belly worked: I started rounds 2 and 3 with 45 to 65 belly when behind.
- KAIJU stomp rings, the "Step out of the ring before each stomp, then hit them while dizzy" tip, and the kill feed ("SALMONSTER SQUASHED AVOCADRAKE", "DOUBLE SKEWER!") make fights readable.
- The Gallery card shows Mastery stars, Lv and XP, which gives a long-term number to chase.

## The single biggest structural problem
There is no way to get better at the game and have the game recognise it. Every bot level plays the same scripted game, only faster and more accurately. I could set BRUTAL, but the Free Play setup gives me no reason to: a win vs BRUTAL paid +48 tokens, and my NORMAL win and my loss paid +10 (the loss) to similar amounts. There is no ranked ladder, no per-kaiju matchup information and no way to practise a KAIJU power without playing a full match. The 20 kaiju each have a one-line power in the Gallery ("Seed Spray: Spits strawberry seeds that shove rivals in front"), but I have no way to see its range, its cooldown, its dizzy window or how it counters other kaiju. For a fighter, the depth of 20 kaiju is invisible unless I memorise it by dying.

What made it worse: the Gauntlet wave 4 boss killed me three times in a row on the same table (Leftovers), and the only feedback was "Knocked out by a KAIJU" plus a generic tip. I cannot tell whether the boss was beatable by a better line or whether the 3-lives pool plus 3 rivals plus boss was a wall. A fighter needs to know whether the failure was skill or tuning, and the game gives no practice tool or replay to find out.

## Big change proposals (2-3, most important first)

### Proposal 1: Dojo (Training Room plus Kaiju Move Lab)
- **Problem it solves:** I could not learn a KAIJU power outside a match. In my manual test the stomp, three powers and a kill all happened inside about 8 seconds; in shot-3 I died to the Chef's Board cleaver 1.5 s after stomping because I did not know the table was mid-hazard. Learning is by dying. The Gallery card has a single sentence per power.
- **How it would work (detailed design):**
  - New title tile "DOJO" (or a button in the Gallery card: "TRY IT" next to the kaiju). Two parts.
  - **Part A: Move Lab (opened from each Gallery card).** A 20-second sandbox on the plain table with: infinite belly (always KAIJU-ready, press STOMP at will), a passive dummy (idle, then "walks" or "throws" on a toggle), a cutlery spawner button, and an on-screen overlay with the power's numbers: range in tiles, windup, KAIJU seconds, dizzy seconds after, knockback strength. A "slow-mo" toggle (50% speed) and "show hitboxes" toggle. 3 challenge cards per kaiju: "Knock 3 dummies off in one power", "Hit a dizzy rival", "Counter a stomp by dashing out of the ring". Completing each gives a 🥄 (up to 3 per kaiju, 60 total). Tutorial mastery XP only the first time (no farming).
  - **Part B: Sparring (Training Room).** Choose your kaiju and a bot kaiju (any unlocked) and a level (EASY to BRUTAL). Infinite rounds, no score. A running side panel shows: Damage taken by source (cutlery, hazard, KAIJU, fall), stomps landed, dizzy windows punished (Y of X), average belly time to stomp. Two buttons: "Reset positions" and "Replay last KO (slow)".
  - Flow: Title, DOJO, grid of unlocked kaiju, pick (opens Move Lab), tabs "LAB / SPAR / DRILLS" at top.
  - Numbers: dummy knockback tuned so a power that hits 3 dummies in a row (spaced 120 px) is possible but needs aim; drills reset in 20 s.
- **Example moment:** I pick Gobzilla, the Lab shows Seed Spray: range 6 tiles, windup 0.3 s, shoves 90 px per seed, 3 seeds per power. I try "knock 3 dummies off", miss twice, switch hitboxes on, see the spray cone is narrower than the sprite, adjust, hit, earn the first 🥄. Then I click SPAR, choose BRUTAL Avocadrake, and the side panel tells me I only punished 1 of 4 dizzy windows. I go for a second session.
- **Rewards / progression hooks:** 3 🥄 per kaiju (60 total) feeds Collection % in the Gallery and unlocks a "Sensei" tag or a colour at 20 🥄 / 45 🥄 / 60 🥄. First clear of each drill pays 15 tokens (max 900 total). Spar stats feed a "Fighter profile" on the Records screen.
- **Risks and edge cases:** Keyboard and gamepad flow must work with one player; phone controllers (Online) probably skip this. Balance data on screen can go stale if powers change: generate the overlay from the same config table as the game. A dummy with a toggle needs very clear on-screen text so text does not overflow on small Gallery cards.
- **Size:** L. New scene, dummy bot, per-power metadata table (20 entries), challenge checks, stats panel. Touches Gallery, Records, Pantry rewards, and the bot AI (a "passive" mode).
- **Score impact for me:** +1.0. It turns the 20-power roster from a hidden system into something I can master, which is the whole fantasy for a fighter.

### Proposal 2: Ranked Ladder with bot archetypes and fighter ratings (the "Brawl League")
- **Problem it solves:** Bot level is a single dial (EASY to BRUTAL) and my BRUTAL win in shot-7 paid +48 tokens, just like an easy win would. There is no persistent "I am better now" signal and no variety in how the opponent fights. A 1v1 vs NORMAL was a loss, then a win. I could not tell whether it was luck or skill.
- **How it would work (detailed design):**
  - New Party Modes tile "LEAGUE". 1v1 best-of-3 (or best-of-5 in higher tiers). Tiers: Bronze, Silver, Gold, Platinum, Chef Legend. 5 divisions each. A player starts in Bronze 5 with 0 League Points (LP).
  - Each match is vs a named "Chef" opponent: a persistent bot with an archetype and a kaiju. Archetypes (8): Rusher (shoves early, weak on hazards), Turtle (hoards crumbs, stomps on timer), Sniper (throws from range), Hazard Baiter (lures you onto hazards), Stomper (rushes belly to 100 first), Parry Wall (swipes back thrown cutlery), Thief (steals cutlery), Boss-like Brutal (adaptive: copies what you did last round).
  - Win = +20 LP (+5 for a flawless 2-0, +5 if you beat a higher-tier archetype), loss = -10 LP (not below the tier floor in Bronze). Each tier is 5 divisions x 100 LP. Promotion match at the top of a division: best-of-5 vs that tier's "Gatekeeper" chef.
  - Pre-match screen: shows the opponent chef card with archetype name, one-line tell ("Stomps the instant belly hits 100: dash out and punish") and your head-to-head record. Lets you ban 1 table out of 3 offered (adds a small skill/choice layer).
  - Post-match: the existing receipt card gets a "LEAGUE" row: LP change, a streak, and the lesson line, e.g. "You lost 2 rounds to cleaver + KAIJU: next time, don't stomp while the cleaver is charging."
  - Weekly reset: soft reset down by one division, season rewards at the end of each 4-week season (colour, title, 300 tokens).
  - Daily "League Trial" is a 3-match mini-ladder vs three archetypes, once a day, that pays tokens in proportion to LP gained.
- **Example moment:** I load League at Silver 3 (62 LP). The Chef card says "Chef Pepper, Sniper, Pizzaraptor. Tell: keeps distance, throws two at once". I ban "Chef's Board" (the cleaver table that killed me earlier), win 2-1, see +20 LP and a banner "Silver 2". The receipt says "Dizzy windows punished: 3/4".
- **Rewards / progression hooks:** Season titles ("Silver Spoon"), a league-only colour per tier, a banner in the Gallery card per kaiju ("Gold with Gobzilla"). Per-kaiju LP (shown on each Gallery card as a rank) so players want to learn every kaiju, not only one main.
- **Risks and edge cases:** Matchmaking is bot-only, so rank is bot-relative; label it clearly and do not call it "online ranking". Archetype AI must be genuinely different (not just speed) or the ladder feels the same; plan for 8 AI profiles built on the existing bot code with different weights. Avoid LP loss feeling punishing: cap at -10 and add the tip. Do not use the Gauntlet 3-lives idea here.
- **Size:** L. New mode tile, 8 bot archetype profiles, LP and tier storage, pre-match card, receipt row, season reset. Touches bots, Party Modes menu, Gallery, Records, Pantry rewards.
- **Score impact for me:** +1.0. It gives a skill-measuring goal and variety to the fights.

### Proposal 3: Gauntlet "Course" structure with checkpoints, boss kits and a loadout
- **Problem it solves:** My Gauntlet run: waves 1-3 were easy with auto:hard, then wave 4 (the Starters boss with 3 rivals plus a boss) took 3 lives in a row on the same table, ended at "GAUNTLET OVER, Score 350, GRADE C". The three perks I got (Full Belly, Sugar Rush, Mustard Coat) were random; the result was luck of the perk pick plus a wall. After a loss, "NEW RUN" restarts from wave 1, so the next attempt must replay the 3 easy waves just to retry the boss.
- **How it would work (detailed design):**
  - Each course (Starters waves 1-4, Mains 5-8, Desserts 9-12, Seconds 13-16+) becomes a **checkpoint**. Clearing a course boss saves the checkpoint for the run's "Resume" button on the Gauntlet tile: "Continue from MAINS (wave 5)" with a fresh set of 3 lives and the perks you had at that point. A run that restarts from a checkpoint is flagged "Resumed" and its leaderboard grade is capped at B (so top grades need a full run).
  - **Boss kits:** each course boss has a signature, visible mechanic (a short telegraph line on the wave card): e.g. Starters boss "Pizzaraptor, stomps every 12 s, ring turns red 1 s before", Mains boss "Hotchog, hot-oil puddles that grow", Desserts boss "Bubblegumbo, sticky floor that slows non-KAIJU". 3 phases at 100/66/33% of rival HP-equivalent (KO counts).
  - **Loadout:** before the run, choose 1 of 3 offered "Gauntlet kit" cards (e.g. "Duelist: start with a knife, shorter dash cooldown", "Tank: +1 hit shield per wave, slower", "Gourmand: belly fills 30% faster, rivals steal more crumbs"). Pantry Lunchbox and Lifeline remain on top of this.
  - **Perk draft:** after each wave choose 1 of 3 as now but with a visible "synergy tag" (e.g. DASH, BELLY, SHIELD) and at 3 tags matching you get a bonus (e.g. 3 DASH perks: dash leaves a damaging trail). Reroll costs 15 tokens once per run.
  - **Result screen:** the existing "GRADE C" gets a breakdown: waves, no-damage waves, boss time, perks used, plus "Why you lost: Starters boss, 3 of 3 lives lost to the stomp (ring red)".
- **Example moment:** I reach wave 4, lose a life to the stomp, the card says "Pizzaraptor stomps every 12 s: be out of the ring when it turns red". I clear it on life 2. A banner shows "STARTERS CLEARED: checkpoint saved". On the next day I press "Continue from MAINS" and try the Hotchog boss with the Tank kit.
- **Rewards / progression hooks:** Course medals (Starters, Mains, Desserts, Seconds) and a first-clear token bonus per course (50 / 100 / 150 / 250), a weekly Gauntlet Order ("Clear a course boss without losing a life"), best-grade shown per course on the tile.
- **Risks and edge cases:** Checkpointing could reduce challenge; the B cap and "Resumed" flag guard that. Boss kits need AI scripts: reuse existing hazards (stomp ring, cleaver, hot oil) to keep them cheap. Four courses x 4 waves is a lot of content; ship Starters and Mains first.
- **Size:** L. Boss scripts, checkpoint storage, loadout cards, results breakdown. Touches Gauntlet, Pantry (Lunchbox, Lifeline), Records, Weekly Orders.
- **Score impact for me:** +0.7. Fighters need a fair wall with a clear lesson. This makes the wall readable and the retry affordable.

## How the new features from this round felt
- **Chef Tokens and receipt card:** The receipt is the best new thing for me. "Knocked out by: cutlery, cleaver, a KAIJU" plus a relevant tip is useful. It is shallow: it says what hit me but not what I could have done (when, where, which action). Bigger version: add a timeline of the round ("0:07 stomped too early, cleaver 0:08") and a "Try this" button that opens the Dojo drill for that cause. Token income felt flat: loss +10, win +48, gauntlet wave +47 or +22, last loss +5. My 218 tokens after 4 matches buy a colour or nothing.
- **Kaiju Mastery:** Visible in the Gallery (shot-12: "Mastery ★★★☆☆☆ Lv 3 Sous Chef (19/160 XP)"). It is only a number: it gives no gameplay reward. Bigger version: each level unlocks a small, optional kaiju "style" (e.g. a skin pattern, a taunt, a custom KAIJU colour trail), and Lv 5 / Lv 10 unlock a mastery challenge (see Dojo).
- **Weekly Orders and Pantry:** Orders (Knock out 20 rivals, Win 5 matches, Go KAIJU 8 times, 40 tokens each) are simple volume tasks. The Pantry is clean (shot-11) but only 4 colours and 2 Gauntlet boosts. For a fighter there is nothing to spend on that helps combat skill, which is right, but nothing to aim for either. Orders should include skill goals ("Punish 5 dizzy windows", "Win a round without picking up cutlery").
- **Gauntlet courses, boss, twists, BRUTAL, score and grade:** The course label, boss tag and the "3 rivals + BOSS" hint appear in the wave card, which is clear. The boss wave was where I lost 3 lives in a row, and my kills were being stolen by Pizzaraptor in KAIJU form ("STOLEN!"). Grade C for 3 waves is fair but I do not know how it was computed. BRUTAL is selectable in the setup (I confirmed it cycles) but I could not feel a different personality; it just played well. I never reached wave 5 so I did not see twist waves.
- **Daily medals:** Not played (not my profile's focus).
- **Comeback help:** It worked: I started rounds with 45, 55 and 65 belly when behind. As a fighter I like it for a mercy rule but I want an option to turn it off per lobby for ranked-style play (it is in Settings, not on the house rules).
- **House Rules slots:** Only seen as a button on the Free Play setup; not used.
- **Story clarity:** Not played.
- **KAIJU stomp rings (red) and "DIZZY! HIT IT NOW!":** The red ring is clear (shot-3) and I understood the lesson from the tip. In the 1v1 test I stomped while a cleaver lane was charging and died in 1.5 s, so the stomp is not clearly telegraphed against hazards. The dizzy window was too short for my harness control to punish; real players may do better.

## Bugs that block play
- None that block play. `/errors` returned "none" at start, middle and end.
- Text overrun (not blocking): on the Free Play results screen, the bottom awards line wraps to 2 lines and overlaps the bottom edge of the REMATCH and MENU buttons and extends beyond the table. Repro: finish a 1v1 match where all three awards are long, e.g. "Most KOs: AVOCADRAKE · Crumb Monster: GOBZILLA (25 crumbs) · Kaiju Lover: GOBZILLA (2x KAIJU)". Screenshot: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r6-7102\shot-4.png` (the second line "(2x KAIJU)" sits under the buttons at y~686).
- Text overrun (minor): in `shot-7.png` the awards line fits but sits tight to the lower border; the receipt card on the bottom left covers part of the table and overlaps the tablecloth art. In shot-4, the receipt card's text fills the box with a 2-line tip at the box's edge (just fits).
- The Gauntlet-over screen's second info line "Score 350 · GRADE C · perks: Full Belly, Sugar Rush, Mustard Coat" runs about 830 px wide (x 225 to 1055). It fits but would likely overflow with 4+ perks (`shot-10.png`).

## Small notes (max 5, one line each)
- The `attack` command never goes KAIJU, but real players need a "stomp when ready" prompt: a pulse on the belly bar at 100 would help.
- Clicking your own seat on the Free Play setup silently cycles your kaiju, which looks like a toggle for something else; label it "tap to change kaiju".
- The bot level button cycles NORMAL, HARD, BRUTAL, EASY, NORMAL: BRUTAL then EASY in one click is jarring, add a back-step or sort by difficulty.
- The Gauntlet mode starts immediately with no pre-run screen (kit, best score, lives, active Pantry boosts), so the player cannot confirm Lunchbox or Lifeline took effect.
- Loss receipts say "+5 Chef Tokens" for a lost Gauntlet run after 3 cleared waves, which feels stingy next to +47 for a single wave earlier.
