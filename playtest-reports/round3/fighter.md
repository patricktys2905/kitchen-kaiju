# Playtest evaluation — The Fighter

**Fun score: 6 / 10** (chaotic and readable fun, but fights feel more like timing/luck lotteries than mastery; KAIJU is exciting but too short and too easy to waste)

## What I did
- Title -> Kaiju Gallery (checked Gobzilla's power text) -> Free Play with 3 bots.
- Match 1: Gobzilla Jr. (Seed Spray) vs Salmonster/Hotchog/Pizzaraptor, NORMAL bots, first to 5. Played rounds 1-7 by hand (/act), then handed over to auto:hard for rounds 8-12. Finished 3rd (2 rounds, 9 KOs); Salmonster won 5.
- Match 2: switched to Squidgeon (Ink Cloud) by clicking the seat, set bots HARD, first to 10 (accidentally, the toggle cycles 5/7/10). Played 3 rounds by hand, 0 wins.
- About 15 rounds, ~85 calls. Used 5 screenshots; /errors = none.

## What matched my goals / what was fun
- One-hit KOs make every throw matter; knocking Salmonster out with a thrown knife in round 4 and 7 felt great.
- Seed Spray knocked a rival off the table edge (fall KO) from KAIJU: satisfying, and falls are a real second win condition.
- The crumb -> STOMP -> KAIJU -> power loop is a clear, readable arc. Seat scoreboard stars and the end-of-match screen (Crumb Monster, Kaiju Lover, Butterfingers awards, instant replay, "fast forward, only bots left") are charming and polished.
- Bots use KAIJU powers sensibly and punish mistakes (Hotchog's Spike Out knocked me off the edge from ~100px away). Difficulty feels like a real opponent.
- Round variety (hazards: blender, cleaver, giant hand, toaster, falling cheese, spatula; different tables) keeps rounds from feeling the same.

## What took too long / was tedious
- Eating crumbs to 100 belly takes ~4-6s while rounds are only ~10-20s long; bots get KAIJU at about the same time, so first-KAIJU often decides the round.
- First to 5/7/10 matches ran 12 rounds; the death-wait between rounds (spectating after an early KO) is dead time, especially when you die in the first 1-2 seconds.

## What was over too quickly / too shallow
- KAIJU lasts only ~5.5s and the power has a long cooldown; I got maybe 2 power uses per transformation. Rivals simply kite a (slow) kaiju, so I turned back to small right when they were close, and was then squashed instantly (round 4 and 6). Rewards getting KAIJU first less than it should.
- Little visible skill depth: no block/dodge beyond dashing, so outcomes after a thrown knife are almost binary. Hard to learn "strategies" beyond "grab knife, throw first".
- Kaiju powers are not clearly differentiated in what they do to positioning; I couldn't tell the range/aim of Seed Spray or Ink Cloud from state or text.

## Confusing or unclear
- Hazards appear only as a name ("blender", "giant hand") in /state with no position/telegraph that I could read from the data; I died to a blender in round 2 and a giant hand as a KAIJU in match 2 (a hazard killing a full kaiju feels cheap).
- STOMP needs exactly 100 belly; at 95 it silently did nothing, and I died waiting (match 2 round 2). A visible "belly full" prompt would help (the UI does show STOMP READY on the HUD, but I only saw it after the fact).
- Spawn fairness: on HARD in match 2 round 1, Salmonster started ~114px from me and killed me within ~1s of the round starting; in other rounds starts were 233px or 900px apart. Feels random, not skill.
- Bot level toggle cycles through first-to targets 5->7->10 with no "3"; easy to overshoot.

## Bugs found
- None from /errors ("none").
- Possible quirk: using "attack" while already holding cutlery with a spoon/knife nearby repeated "YOU pickup" for several turns instead of throwing (round 7, match 1). May just be harness-coarse.
- Hazard kills on KAIJU players ("YOU knocked out (hand)") might be intended but feels bad.

## Top 3 changes that would raise my score
1. Make KAIJU longer or refundable (extend on KO, or a "last stand" shrink-back warning) so the transformation isn't wasted and the revert-to-small squash doesn't decide rounds; show power range/aim clearly.
2. Add a small skill layer to cutlery fights: a dodge/block with a cooldown, or telegraphed throws, so hard bots can be beaten by reading rather than luck; and fairer starting spawns (min distance from rivals).
3. Make hazards readable (clear ground telegraph, no hazard kills during the first seconds or on KAIJU), and speed up crumb-eating or let KOs feed belly so the opening isn't a race.
