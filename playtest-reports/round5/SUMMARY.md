# Playtest round 5 — 10 Sonnet agents (2026-11-18): new "big structural feedback" template

Earlier rounds are in `round1/`–`round4/`. Release bar: every profile at **9.0 or higher**.
This round tested Golden Spoon, Cup length, the STOMP coach, KAIJU telegraph + dizzy, Gauntlet lives and Gallery progress.

| Profile | R1 | R2 | R3 | R4 | R5 |
|---|---|---|---|---|---|
| Achiever | 6 | 6.5 | 7 | 7 | 6.5 |
| Story Fan | 7 | 7 | 7 | 7 | 6.5 |
| First-Timer | 7 | 7 | 7 | 7 | 6.5 |
| Party Host | 7 | 7 | 7.5 | 7 | 6.5 |
| Tinkerer | 8 | 7.5 | 7 | 7 | 6.5 |
| Kid | 7 | 7 | 7 | 7 | 7 |
| QA Tester | 6.5 | 7 | 7 | 7 | 7.5 |
| Fighter | 6 | 6.5 | 6 | 6.5 | 6.5 |
| Collector | 6.5 | 7 | 7 | 6.5 | 6.5 |
| Challenge Seeker | 6 | 6 | 6 | 6 | 5.5 |
| **Average** | **6.7** | **6.85** | **6.85** | **6.8** | **6.6** |

There were no JavaScript errors in any run.

The new template asks testers to judge the game against a "what would make it 9/10" structure, so scores dipped slightly. The value of this round is in the detailed proposals in each report.

## Liked this round
- **Gallery progress text:** called the best addition by the Achiever, the Collector and the First-Timer.
- **Golden Spoon:** the Host's best mode.
- **The STOMP coach** works.
- **The stomp ring** reads well on a TV.

## The structural themes (most profiles converge on these)
1. **A meta-progression layer** (Achiever, Collector, Challenger, QA, Fighter):
   - per-kaiju Mastery tracks with cosmetics
   - tiered (Bronze/Silver/Gold) achievements with a Trophy Room
   - weekly orders or tokens with a cosmetic shop
   - a post-match "Progress Receipt" showing what moved
2. **Challenge structure** (Challenger, QA, Achiever):
   - a Gauntlet with courses, boss waves, grades and a perk draft
   - Daily/Weekly tiers
   - Spicy heat levels
3. **Party night arc** (Host, Kid):
   - a Game Night mode with standings between games, catch-up and handicaps
   - a finale and a night summary
   - mercy and comeback tools for losing players
4. **Story with momentum** (Story Fan, Kid):
   - a 3-act plot with player replies and reactive rival lines
   - real boss phases and a "what beat you" defeat card
   - a picture-first kids' path
5. **Onboarding and mastery** (First-Timer, Fighter):
   - a guided "First Night" ladder
   - a Dojo with drills and a ranked ladder
   - a "why you lost" breakdown
6. **Customisation** (Tinkerer): stackable twists and House Rules presets, Workshop 2.0, and a twist-ladder run.

## Fixed right after round 5 (f54b83f)
- A Gauntlet retry now replays the same table and rivals.
- Workshop tables are no longer used in Gauntlet runs.
- The STOMP coach names the right keys for Story and Practice seats.
- Enter or Space rematches Free Play.
- Table counts now ignore Workshop tables (Records).
- A test proves the dizzy window happens. The harness `/state` doesn't show it, which is why the testers couldn't see it.

## Not fixed yet
- Losing a Dessert course returns to the map without a retry button.
- A stray Space after the Story ending can start a match.
