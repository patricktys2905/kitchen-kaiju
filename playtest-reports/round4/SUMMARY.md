# Playtest round 4 — 10 Sonnet agents (2026-11-18), after parry / goals / twist visuals / Chef lines

Earlier rounds are in `round1/`–`round3/`. Release bar: every profile at **9.0 or higher**.

| Profile | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| Achiever | 6 | 6.5 | 7 | 7 |
| Story Fan | 7 | 7 | 7 | 7* |
| First-Timer | 7 | 7 | 7 | 7 |
| Party Host | 7 | 7 | 7.5 | 7 |
| Tinkerer | 8 | 7.5 | 7 | 7 |
| Kid | 7 | 7 | 7 | 7 |
| QA Tester | 6.5 | 7 | 7 | 7 |
| Fighter | 6 | 6.5 | 6 | 6.5 |
| Collector | 6.5 | 7 | 7 | 6.5* |
| Challenge Seeker | 6 | 6 | 6 | 6 |
| **Average** | **6.7** | **6.85** | **6.85** | **6.8** |

\* Their test servers were stopped early by mistake (the reports were already written; they just played less).

No JavaScript errors in any run that checked.

## Verdict on the AI playtest loop
Four rounds and many fixes later, scores sit flat at about 7: the bugs are gone, but each profile's wish-list grows into bigger features. The latest asks are:
- more party modes
- Workshop drag/rotate
- Gauntlet lives
- more cosmetics
- earlier STOMP teaching

The combat profiles are capped by the harness (they act in coarse turns). More rounds of the same loop are unlikely to reach 9; real players are the better next signal.

## Fixed right after round 4
- **REMATCH/MENU missing on later end screens:** the scene object kept the last match's destroyed buttons. They are now reset each match (plus the perk UI and rampage counters).
- **SKIP CHAT (S) did nothing:** S was being read as "down" first. It now skips the chat in dialogue.
- **NEW KAIJU celebration:** now opaque, and it takes all keys until closed (Space used to hit the card behind it).
- **Twists:** the explanation now sits in the countdown text, and the Ice Rink sheen is much stronger (tint, frosty rim, brighter streaks).
- **Second Helpings intro** reworded for players who are only halfway through the Feast.

## Biggest remaining asks (for later)
1. Teach STOMP/KAIJU in chapters 1–2, and fix chapter 2's difficulty spike for hand players.
2. More collectables early, and progress counters on every locked Gallery item.
3. Counterplay against a rival KAIJU (a stomp telegraph or a brief vulnerable window).
4. Gauntlet lives or multi-round waves, plus a bigger perk pool.
5. Party: Cup length options and more modes.
