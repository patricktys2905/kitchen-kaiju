# Playtest round 3 — 10 Sonnet agents (2026-11-18), after the round 2 themes

Earlier rounds are in `round1/` and `round2/`. Release bar: every profile at **9.0 or higher**.

| Profile | R1 | R2 | R3 |
|---|---|---|---|
| Party Host | 7 | 7 | **7.5** |
| Achiever | 6 | 6.5 | **7** |
| QA Tester | 6.5 | 7 | 7 |
| Collector | 6.5 | 7 | 7 |
| Story Fan | 7 | 7 | 7 |
| First-Timer | 7 | 7 | 7 |
| Kid | 7 | 7 | 7 |
| Tinkerer | 8 | 7.5 | 7 |
| Fighter | 6 | 6.5 | 6 |
| Challenge Seeker | 6 | 6 | 6 |
| **Average** | **6.7** | **6.85** | **6.85** |

No JavaScript errors in any of the 30 runs. The QA tester confirmed every earlier bug fix holds.

## The scores have plateaued at about 7, and that is a signal in itself
Three rounds of fixes removed every concrete bug and most complaints. Yet each profile's score barely moves, because each agent re-scores from its profile's wish-list, which keeps growing:
- the Fighter wants dodge/block depth
- the Challenge Seeker wants leaderboards
- the Tinkerer wants a bigger Workshop
- the Story Fan wants more narrative

These are content and feature asks, not polish. The harness also limits what the agents can feel: they act in coarse turns, so the combat-feel profiles (Fighter, Challenge Seeker) are the most pessimistic. A 9+ from them probably needs real players.

## Fixed right after round 3 (from these reports)
- **Story:**
  - The SCENE button no longer overlaps the star legend.
  - ⏩ SKIP CHAT (S) skips the whole intro, and dialogue types faster.
  - The defeat card fits the score ("You took a round off them" vs "Tough one").
  - After 2 defeats on a chapter, a 🍀 **HELPING HAND** retry starts each round ready to go KAIJU, with a shield.
  - The NEW KAIJU celebration appears at once, so a quick NEXT can't skip it.
- **Gauntlet:** Escape no longer abandons the run on the perk picker, and achievement toasts no longer sit under the perk cards.
- **Setup:**
  - PLAY with nobody joined seats you instead of starting a bots-only match.
  - Team Feast adds a bot to even up odd teams.
  - Free Play and Party Modes no longer share twist, power-up, hazard or table settings.
- **Results screens:** clickable ↻ REMATCH / ▶ CONTINUE and ☰ MENU buttons.
- **Kaiju balance** with frequent KAIJU (100-run check):
  - The fast-slide powers (Salmonster, Pengwhip, Norigon) were toned down.
  - Squidgeon's Ink Cloud now dazes, and Bloblin, Hotchog, Minturtle, Sloba, Velvaroo and Bluebeary (5 mines) were buffed.
  - Bots now use Mothball's Flutter.
  - The spread is now 15–33%, which matches pure luck (18–34%).
- `smoke:phone` waits for the menu instead of a fixed 0.9 s.

## What would move scores further (bigger features, not fixes)
1. **Combat depth** (Fighter, Challenger): a dodge/parry window, readable throw telegraphs, and spawn protection.
2. **Stakes and long-term goals** (Challenger, Achiever, Collector): a Gauntlet run recap and score, a "next unlock" tracker, earlier Story unlocks, more cosmetics.
3. **Twist readability** (Tinkerer): visible ice/bouncy surfaces, and a twist banner at round start.
4. **More story** (Story Fan): callbacks, more lines per chapter, between-chapter scenes.
5. **Real human playtests:** the agents can't judge feel well, and that's where a 9 lives.
