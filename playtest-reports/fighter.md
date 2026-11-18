# Playtest evaluation — The Fighter

**Fun score: 6 / 10** (charming, readable brawl with a good skill gap between Normal and Hard bots, but the KAIJU power fantasy is too brief and deaths are hard to read, so depth is hard to feel.)

## What I did
- Title -> Free Play. Joined and added bots with keys. Digit2 cycles bot difficulty (easy/normal/hard).
- Match 1: Toastbat vs 2 Normal bots, round-by-round. Won rounds 1 and 2 in about 4s each.
- Match 2: Toastbat vs 5 Hard bots on Chef's Board. Lost the early rounds with 0 score.
- Match 3: Bobloin (Wobble Wave) 1v1 vs a Hard Squidgeon on Picnic Blanket and Smoothie Bar. Lost 5-1.
- Started a rematch (Bobloin vs Hard Squidgeon, round 1 not won).
- About 75 calls, 5 screenshots. /errors: none.

## What matched my goals / what was fun
- Normal bots are easy: I swept them with attack, then shove. Hard bots are a real step up. They out-eat me, skewer me and win rounds, so the difficulty tiers feel meaningful.
- "Cutlery sticks where it lands, a miss leaves you unarmed" is a good risk/reward rule. Grab, throw and re-arm is a clear loop.
- Tables are varied and look great (Chef's Board with giant vegetables, Smoothie Bar). Each table has its own tip and hazard (cleaver listed in dangers).
- The end-of-match screen is clear, with a crowned winner, a standings list and a rematch key. The news ticker with silly awards ("Crumb Monster", "Kaiju Lover") adds charm.
- The KAIJU power descriptions are readable ("Pops forward like toast and lands with a shove", "A jiggly ring that knocks everyone back and dazes them").

## What took too long / was tedious
- Nothing dragged. Rounds are about 5-20s, so one match is about 2 minutes.
- Hard 6-way free-for-alls feel like a lottery. Rivals kill each other and I die offscreen from a distance with no warning.

## What was over too quickly / too shallow
- KAIJU form lasts about 4s (kaijuSecs 3.9 -> 0). That is a long crumb-farm for a very short payoff.
- Twice I was knocked out within 1-2s of going KAIJU, by a small rival's fork. A kaiju should feel like a threat, so this undercuts the core fantasy.
- With the normal-bot setup, rounds are over in seconds, so there is little room to learn the power or tactics.
- The power is a once-per-form button on a short timer, which leaves little room to master each kaiju.
- Rounds against Normal bots end so fast that I never needed shoves, dodging or positioning. Normal is too passive and Hard is a big jump, so there is no gradual ramp.

## Confusing or unclear
- When I die, the cause is often not shown. In a 6-player match I lost rounds with no event or message about who or what killed me. The only cue was "SQUIDGEON skewered BLOBLIN" in the banner on round end, in the 1v1.
- Free Play setup: the bot difficulty key is "2" (the label reads "2 bots"). It cycles hard -> easy -> normal. This is easy to miss and hard to see which value you are on.
- Pressing Escape twice from a match goes all the way back to the title, losing the setup.
- Spawn positions sometimes sit at the table edge (edge distance about 70). I died within 2s of round start in round 2 of the 1v1.
- It is unclear how the stomp "STOMP READY!" window interacts with throwing. I could not tell whether a kaiju can still pick up cutlery.

## Bugs found
- Harness: the "events" array was empty for most of the 6-player match, including my own death. Events only appeared for KOs I made, in the 3-player match. If this is the game's event log rather than the harness, kills by rivals are not reported.
- Possibly mismatched scoring: the match summary said "BLOBLIN 1 round, 1 KO", which matched my state, but the in-match scoreboard showed different numbers mid-match. I am not sure it is a bug.
- No JavaScript errors from /errors.

## Top 3 changes that would raise my score
1. Make going KAIJU last longer and feel safer, or give it a clear knock-back or invulnerability window, so a stomp is a moment of power and not a 4-second window before a fork kills you.
2. Show an on-screen killer indicator and a danger telegraph, e.g. "SQUIDGEON skewered YOU" in the HUD as it happens, plus a warning for incoming cutlery, so deaths feel fair and learnable.
3. Smooth the bot difficulty ramp. Add a "Medium-hard" tier, make Normal bots more aggressive, and show the difficulty clearly in the setup screen so I can find the right challenge.
