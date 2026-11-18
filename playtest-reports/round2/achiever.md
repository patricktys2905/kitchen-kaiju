# Playtest evaluation — The Achiever

**Fun score: 6.5 / 10** (clear, well-signposted achievement list with progress bars, but grinding is slow, the "Next up" nudge is unreliable, and a few goals look like pure RNG vs bots)

## What I did
- Records screen (both pages, 29 achievements): read every requirement, noted which ones carry a colour reward (Lime, Ocean, Grape, Bubblegum, Midnight, Ghost, Golden...).
- Free Play: 1 manual match (died to the giant hand while eating crumbs), then /autoplay x5 (1 win, 12 KOs, 138 crumbs). Took ~3m40s wall-clock for 5 matches.
- Party Modes: Team Feast autoplay x2 (lost both), Hot Dumpling match (won), Crumb Rush (played ~4 rounds, lost, quit).
- Daily Challenge (Hot Dumpling, failed), Gauntlet (cleared wave 1, died wave 2), Table Workshop (placed a prop + saved), Story ch.1 (saw cutscene only).
- Final Records: 11 matches, 3 wins, 7/29 achievements (First Bite, Crumb Muncher, World Tour, Forked Up, Table Maker, + 2 others). About 70 calls.

## What matched my goals / what was fun
- Records is exactly what an achiever wants: locked/unlocked states, "x/N" progress bars, a "Next up" hint, and clear requirement text. Colour rewards are shown right in the list.
- Unlock toasts on the result screen ("Forked Up: Grape colour unlocked!", "Table Maker unlocked!") feel good.
- Variety of tables comes for free: 17/18 tables after 5 matches, so World Tour (12 tables) fell on its own.
- Table Maker is a 3-click freebie, a nice early win.
- Crumb Rush visuals/readability are good (screenshot), conveyor hazard clear.
- Cutscene art in Story is charming.

## What took too long / was tedious
- /autoplay is slow: ~44s per Free Play match, Crumb Rush rounds last ~60s of game time each. "Win 50 matches" or "Eat 1,000 crumbs" or "Score 250 KOs" would be hours at this rate. Per-match win rate for a bot-me was ~20-27%, so "Win 3/5 in a row" is mostly luck.
- Win 10 / 50 matches against normal bots with a 4-bot free-for-all (one winner of four) is a long grind with no way to bias it (no easy-bot option that I could find that still counts, no "vs 1 bot" quick match that I could confirm counts).
- Gauntlet "Clear 5/10 waves": I died in wave 2 to a single rival to the giant hand/KO; no clear indication how to prepare.
- Several party-mode achievements (Better Together, Speed Eater, Dumpling Dodger = watch 10 dumplings pop on others) are slow to get and I cannot easily tell which counts.

## What was over too quickly / too shallow
- Records counts only 29 achievements, and the first ~10 are plain counters (wins/KOs/crumbs). Little for "skill" achievers (no "win without being hit", "KO with a thrown spoon from across the table", etc).
- 1v1 rounds with a hand-of-doom ending are over in seconds; the giant hand killed me in round 1 for being fullest-belly, which felt like punishment for the exact thing the game tells you to do (eat crumbs).

## Confusing or unclear
- "Next up" nudge is odd: at 0 progress it said First Bite; later it picked "On a Roll (67%)" over closer ones like Forked Up/Crumb Muncher. Unclear how it ranks.
- Records header: the "👉 Next up..." line overlaps the "ACHIEVEMENTS 0/29" heading (see art-src/.playtest2/7101/shot-1.png and shot-2.png). Text collides visibly.
- Party Modes mode arrows: clicking left of the mode label cycled Hot Dumpling -> Classic -> Team Feast -> Crumb Rush, i.e. "Classic" appears in Party Modes and order is hard to predict. Escape from a match returns to Free Play setup and not to the mode I came from.
- After a Gauntlet loss there was no results screen via the harness; it dropped straight to title (best wave updated), so I could not see "wave reached" feedback (may be a harness quirk).
- Team Feast results screen listed individual players, not teams (could not tell if my team won).
- Do colour unlocks have a place to equip them? I did not find where to apply Lime/Grape (did not reach it; the list says unlocked but no equip hint on Records).

## Bugs found
- Records screen text overlap: "Next up" hint line renders on top of the "ACHIEVEMENTS n/29" heading (every visit). Screenshots: art-src/.playtest2/7101/shot-1.png, shot-2.png.
- /errors: none reported.

## Top 3 changes that would raise my score
1. Add a quick way to grind: a "1v1 vs bot" or shorter first-to-1 mode that counts for win/crumb/KO achievements, and/or speed up matches; show per-achievement ETA or hint ("Hot Dumpling: win with any seat").
2. Fix the Records header overlap and make "Next up" pick the closest-to-done achievement (and show equip/where-to-use for colour rewards).
3. Add more skill-based and varied achievements (flawless round, KO with each KAIJU power, per-mode streaks) and soften the giant-hand early-round death so crumb-eating is not punished.
