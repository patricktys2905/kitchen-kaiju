# Playtest round 2 — 10 Sonnet agents (2026-11-18), after the round 1 fixes

Round 1 reports and summary are in `round1/`. Release bar: every profile at **9.0 or higher**.

| Profile | Round 1 | Round 2 | Main remaining ask |
|---|---|---|---|
| Tinkerer | 8 | 7.5 | Twist/power-up/hazard picker with descriptions; deeper Workshop; a Kaiju Lab to try powers |
| Kid | 7 | 7 | Less waiting after being knocked out; harder chapters 1–2; a simpler setup with a big PLAY button |
| First-Timer | 7 | 7 | A simpler Free Play setup with one big PLAY button; shorter Free Play matches; offer Practice on first launch |
| Party Host | 7 | 7 | Matches dragging (17 rounds); a visible mode picker; a Party Cup preview |
| Story Fan | 7 | 7 | Difficulty cliffs (Grand Feast ch7, Second Helpings ch3); KAIJU rarely happens in Story |
| Collector | 6.5 | 7 | A celebration screen for new unlocks; a collection %; explain how stars are earned |
| QA Tester | 6.5 | 7 | Small layout bugs (all fixed after round 2, see below) |
| Achiever | 6 | 6.5 | Less grind; more skill-based achievements |
| Fighter | 6 | 6.5 | KAIJU should matter more and happen more; fewer deaths in the first 2 seconds |
| Challenge Seeker | 6 | 6 | Stakes for Gauntlet and Daily (upgrades, rewards, a leaderboard); Spicy chapter 1 still too easy |

**Average: 6.7 → 6.85.** No JavaScript errors in either round.

## Verified fixed by the QA tester (round 2)
- Escape and pause behave.
- Daily, Practice and Story return to the right screens.
- The pause menu's sound toggles keep your saved levels.
- The round label no longer collides with the player cards.
- The results ticker no longer runs under SHARE.

## Fixed right after round 2 (from these reports)
- **Party matches dragging:** Crumb Rush tie rounds gave nobody a point, so close matches could repeat forever. Tied leaders now all score. Every match also ends after `target × RULES.maxRoundsPer` (2.4) rounds, with the leader winning (ties play on).
- **STOMP after a round ended** used up your full belly. It now only works mid-round.
- **Belly stuck at 99:** a crumb now adds 10 (10 crumbs = full), so it no longer stalls one short of full.
- **Gallery colour swatches** were blank on a second visit (a stale cache). Fixed.
- **Records:** the "Next up" line moved below the list, so it no longer overlaps the header.
- **Gauntlet HUD** now says "GAUNTLET · WAVE n" instead of "ROUND 1".
- **Results:** shown in one column, so it no longer collides on 6-player/Team Feast screens, and your kaiju is marked "(YOU)" when one person is playing. Same for the Party Cup standings.
- **Practice panel:** two short lines in the strip below the table, so it covers nothing.
- **Second Helpings intro:** no longer claims the Golden Spoon is already yours (it opens after chapter 6).

## Biggest themes still keeping scores around 7
1. **KAIJU form is rare and short** (Fighter, Story, Tinkerer, Challenger): bellies rarely fill before rounds end.
2. **Setup screen too cluttered for beginners** (Kid, First-Timer): they want one big PLAY button and the key legend hidden.
3. **No stakes or rewards for hard modes** (Challenger, Achiever): Gauntlet upgrades, Daily rewards, more skill-based achievements.
4. **Unlocks don't feel like an event** (Collector): a "NEW KAIJU / TABLE / COLOUR" celebration screen and a collection %.
5. **Story difficulty cliffs:** Grand Feast chapter 7 and Second Helpings chapter 3.

## Harness caveats
- Agents act in coarse turns, so combat feel and reaction-time complaints are rough.
- The headless browser may not play cutscene videos.
- A key rebind didn't stick for one agent (probably harness timing; unconfirmed).
