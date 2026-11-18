# Playtest round 1 — 10 Sonnet agents (2026-11-18)

Each agent played the real build through `scripts/playtest/server.mjs` as one profile from `scripts/playtest/profiles.md`. Full sheets are in this folder. Release bar (the post's rule): **every profile at 9.0 or higher**.

| Profile | Score | Main complaint |
|---|---|---|
| Tinkerer | 8 | Setup options are hidden behind keyboard keys; the Workshop needs more hazards and props |
| Kid | 7 | Bots too easy early; too much waiting between fights |
| First-Timer | 7 | Can't click or tap to join on the setup screen; confusing labels; Escape quits with no confirm |
| Party Host | 7 | Party matches too long; phones-as-controllers hidden; no Cup preview |
| Story Fan | 7 | Norigon boss too long or hard; little story payoff; Second Helpings hard to find |
| Collector | 6.5 | Colour unlocks not explained; reward pop-ups missing; last kaiju behind a slow 30-star gate |
| QA Tester | 6.5 | State leaks between modes; Escape and pause; overlapping elements (12 bugs with repro steps) |
| Achiever | 6 | Doesn't say where mode-specific achievements are earned; grind too long; no unlock pop-ups |
| Fighter | 6 | KAIJU form too short and fragile; unclear deaths; difficulty jump from Normal to Hard |
| Challenge Seeker | 6 | Gauntlet waves 1–8 too easy; Daily has no identity; Spicy only slightly harder |

**Average: 6.7 / 10.** No JavaScript errors in any run.

## Themes (how many profiles raised each)
1. **Unclear feedback (6):** you don't see what killed you, what an achievement unlocks, KAIJU time or power cooldown, Cup standings, or where to earn things.
2. **Difficulty curve (5):** Normal bots, early chapters and early Gauntlet are too easy; Hard and the Norigon boss jump too steeply; Spicy is barely harder.
3. **KAIJU form too short or fragile (3):** about 4 s, and it's knocked out quickly.
4. **Mouse/touch and setup discoverability (4):** clicking a seat doesn't join; twists, hazards and power-ups are keyboard-only; labels like "2 bots" (actually difficulty) and the "Z" dice symbol are unclear.
5. **Pacing (4):** party matches too long; dialogue and cutscenes can't be skipped on retry; waiting between fights.
6. **Bugs (QA):**
   - Escape from Daily or Practice goes to the wrong screen, and their settings leak into Free Play.
   - Escape quits matches with no confirm, and Escape on the pause menu quits instead of resuming.
   - The pause menu's sound toggles overwrite saved volumes.
   - Overlaps: the round label on the 4th HUD card, the replay banner over pause, the results ticker under SHARE, and the Practice checklist over the dummy.
7. **Daily and Second Helpings presentation (2):** Daily doesn't say it's daily and has no streak; Second Helpings is only a small corner button.

## Harness caveats
- Agents control the game with coarse commands, so their verdicts on combat feel are rough.
- The headless browser probably can't play the cutscene videos (the Story Fan saw stills only).
- Achievement stats don't count while a bot drives your seat (autoplay).
