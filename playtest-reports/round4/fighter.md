# Playtest evaluation — The Fighter

**Fun score: 6.5 / 10** (feels chaotic-fun and readable with great presentation, but normal bots already beat me for most of a long match, and the strategy depth is hard to see; kaiju power use and parry mastery are under-signposted)

## What I did
- Title -> Free Play, joined as GOBZILLA JR. (Seed Spray) vs 3 bots (MOTHBALL, SQUIDGEON, TOASTBAT) on NORMAL, first to 5.
- Played ~12 rounds manually and with auto:normal / auto:hard handing over. Won rounds 6 and 8 (score 2); bots Squidgeon/Mothball reached 4 stars.
- Went KAIJU 3 times, used Seed Spray (it knocked a rival off the table), took screenshots of Diner Griddle, Banquet Lazy Susan and Leftovers tables. ~75 calls total. Only one kaiju tried (didn't get to a second match).

## What matched my goals / what was fun
- Rounds are fast and decisive: 10-20 s. Cutlery pickups, falls off the edge and "STOLEN!" / "BLOCKED!" popups are punchy and readable.
- Seed Spray in KAIJU mode ejected Squidgeon off the edge for the round win: a satisfying "power as finisher" moment.
- Tips on loading screens ("KAIJU mode makes you immune to cutlery. Squash, don't throw.") taught me the key rule. Table variety (15 tables, hazards like burner, spatula, giant hand, blender, wind) keeps each round different.
- Bots play KAIJU well: stomp + power + squash. They feel like real opponents, even on normal.
- Instant replay / fast-forward when only bots remain is a nice touch.

## What took too long / was tedious
- After I'm knocked out the round keeps running (bots grinding, up to 37 s in R11); the fast-forward helps, but being eliminated early is mostly spectating.
- First-to-5 matches ran 11+ rounds because wins get split across 3 bots: a whole match is long for a party game.

## What was over too quickly / too shallow
- Many deaths happen in the first 3 seconds from range with no counterplay: an unarmed player at spawn gets cutlery-sniped (R7, R9). Early game is partly luck of who grabbed a throwable first.
- Once a rival goes KAIJU (immune to cutlery) the only answers are flee, edge-pushes or going KAIJU yourself; Squidgeon/Mothball KAIJU powers knock you off from far away (R2, R11 "fall"). Counterplay isn't obvious and I couldn't see a way to fight a kaiju beyond running.
- Power seems to fire several times per KAIJU stint when spammed (YOU used a KAIJU power x3 in R1) but only one hit mattered; cooldown/usage rules aren't clear.

## Confusing or unclear
- It is not clear from the UI when a kaiju stint's power is ready and how long it lasts; no clear "run!" warning when a rival stomps (the harness says state, but on screen the only cue is a banner).
- "YOU knocked out (flip)" in R3 right after I used the power near a spatula hazard: unclear whether I killed myself with the power or a hazard did.
- Parry (swipe timed on incoming cutlery) wasn't something I could test well with coarse commands; it's hard to know how skill-expressive it is.

## Bugs found
- No JavaScript errors seen so far (/errors checked at the end, see below).
- Possible bug: in R4 and R9 my character stood still at the screen edge (x~1110) for several attack/crumbs commands with a fork ~64 px away and did not pick it up (belly and position unchanged for 4 calls, then killed). May be a harness/pathing quirk with the edge, or the player being stuck on a table-edge placemat zone. Repro: start of round on the right/top-right seat, `/act?cmd=attack&secs=0.8` several times.

## Top 3 changes that would raise my score
1. Give players counterplay to a rival KAIJU (visible telegraph/warning on stomp, a short window where kaiju are vulnerable, or a way to stun it) and a clearer on-screen "power ready/active" indicator.
2. Soften the opening: a brief spawn shield or guaranteed starting weapon so that the first 3 seconds aren't decided by who gets sniped; and shorter matches (first to 3 by default in Free Play).
3. Make hard-bot mastery rewarding: show parry/swipe timing feedback and skill rewards (e.g., parry counter streak), and let eliminated players do something (annoy with crumbs / throw items) so spectating isn't dead time.

## Addendum (end of session, ~95 calls)
- Match 1 result: I WON 5-4 (comeback from 0-4 early). Winning pattern: skip crumbs, grab cutlery and `attack` in 0.8 s steps; R14 was a clean 3-KO in 4 s. Auto:hard bot "handoff" then taking over at KAIJU stomp worked well. Confirms the game rewards aggression over hoarding crumbs, and that KAIJU is a finisher, not an opener.
- Match 2 (CRABBAGE, Claw Snap, hard bots): in R1 I stomped KAIJU (belly 100 at ~6 s), used Claw Snap 3 times and it hit nothing (no rival in range, nearest ~430 px away) and then the Sunday Roast giant hand picked me (fullest belly) and killed me during KAIJU. KAIJU with a short-range power is a gamble; the harness "power at nearest" didn't close distance, which is a command quirk, but the Giant Hand fullest-belly rule plus fast stomp felt punishing and stomping at 100 belly into a hand zone is a trap players would not see coming.
- /errors: none at end of both matches. Post-match screen (stats, awards "Crumb Monster", "Butterfingers", REMATCH/MENU) is charming and clear.
- Score stays at 6.5/10: strong moment-to-moment feel and presentation, but 14-round matches, early-spawn snipes and kaiju counterplay gaps hold it back for months-long play.
