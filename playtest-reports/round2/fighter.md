# Playtest evaluation — The Fighter

**Fun score: 6.5 / 10** (fast, readable, brutally lethal one-hit rounds with good "oh no I missed" tension; but power/KAIJU depth is hard to feel, and 5-second kaiju vs. one-hit-KO makes skill expression thin.)

## What I did
- Title -> Free Play; joined seat 1, added 2 bots. ~5 matches/partial matches: Gobzilla Jr. (Seed Spray) normal bots, Crabbage (ClawSnap) vs HARD bots, Bubblegumbo (GumBubble) vs HARD bots, plus 2 autoplay matches (hard: lost 3-5 rounds; normal: won as Crabbage).
- Tables seen: Pancake Stack, Dinner for Four, Smoothie Bar, Chef's Board. Hazards seen: spatula, giant hand, blender, wind. 6 screenshots, ~75 calls. /errors: none.
- Round wins by me directly: ~3; KOs ~8 total across my own play.

## What matched my goals / what was fun
- One-hit KOs with cutlery that STICKS where it lands: a miss leaves you unarmed, so every throw is a commitment. That is a genuinely good risk/reward loop and the best bit of the game.
- Rounds are short (5-15 s), so losing is never a slog. Visuals are clear and charming (Pancake Stack screenshot read perfectly: spatula warning lane, coloured spawn slabs, belly bars, KO ticker "BLOBLIN skewered YOU").
- Hard bots are legitimately dangerous: they grab ammo, swipe at close range, and use the table (shoves, falls, wind). Beating them felt earned (double KO round as Crabbage).
- Crumb -> STOMP -> KAIJU pacing gives a clear mid-round goal; Bubblegumbo hit 100 belly mid-round and I could plan around it.
- Round-end awards (Crumb Monster, Kaiju Lover, Survivor) are a nice touch for tracking a style.

## What took too long / was tedious
- Crumb farming to reach 100 belly eats ~6-8 s of a round that often only lasts 10 s; by the time you're full the fight is over. Bots seem to fill faster than I could.
- Nothing else; match length (first to 5) is fine.

## What was over too quickly / too shallow
- KAIJU form lasts only ~5 s (kaijuSecs 5.4) and the power needs a target in range. I stomped as Gobzilla, fired Seed Spray at a rival 565 px away (wasted), then got KO'd right after the form expired, so KAIJU felt like a short, mostly cosmetic window, not a comeback or power fantasy. I never saw a kaiju power produce a KO.
- Early deaths: in two rounds I was knocked out within ~2-5 s of the round starting (Gobzilla R1, R2) by a bot that had already grabbed a spoon. Little counter-play for a player who spawned unarmed/far away.
- Skill ceiling: with one-hit kills everywhere, best strategy appears to be "grab ammo, throw at closest, hide behind someone else". I didn't find a deep tactical layer (dodging/parrying) in the time I had.

## Confusing or unclear
- Whether you can dodge/block a thrown cutlery is not obvious; deaths often felt sudden ("knocked out by SALMONSTER (cutlery)" with no warning in my state feed).
- Kaiju-power range/targeting isn't explained: when is a power worth firing, and what does Seed Spray / ClawSnap / GumBubble actually do mechanically? The menu one-liner (e.g. "Spits strawberry seeds that shove rivals in front") is good but short.
- Belly 99 vs 100: one crumb short of stomp with no clear feedback in my harness state (probably fine on screen).
- Falling off the table (edge) and wind hazard are hard to read while also fighting.

## Bugs found
- Possible: stomp is accepted after the round has ended (phase roundEnd) and spends the full belly: "YOU went KAIJU" with belly 0 / kaijuSecs 5.4 at round end, then the next round started with belly 0. Repro: fill belly, win the round, press stomp during the round-over screen. Possibly intentional celebration, but the belly is wasted.
- Harness-adjacent (not necessarily game bugs): "crumbs" repeatedly stalled at the same spot (x=170,y=364 near a spawn slab) and the kaiju stopped moving; could indicate the crumb-seek AI/pathing getting stuck against a slab. Not reproduced by manual move.
- /errors: none.

## Top 3 changes that would raise my score
1. Make KAIJU a real payoff: lengthen the form or give it a tankiness/size advantage and a longer-range or auto-aimed power, so going giant is a decisive moment, not a ~5 s gamble.
2. Add a spawn-protection / counter-play window and a clearer incoming-throw telegraph (dodge cue, brief block with swipe) so 2-second deaths feel avoidable and skill-based.
3. Speed up crumb gathering (denser crumbs near spawn, or bigger belly gains from KOs) so the belly -> KAIJU loop fits inside a 10 s round, and expose per-kaiju power details/range on the setup screen.
