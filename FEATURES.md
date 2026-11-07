# New features log

Everything added in the "keep building" session, newest last. Nothing existing was removed.
Each section says **where to customise it**.

## 1. Party modes (Team Feast, Crumb Rush, Hot Dumpling)

- **Where:** Title screen → **PARTY MODES** card (was the disabled "More modes" card), or Free Play → **[G] mode** (touch: **MODE** pill).
- **Team Feast:** seats alternate RED / BLUE. Cutlery, swipes and kaiju-squash pass through teammates. The last team standing scores a point for everyone on it.
- **Crumb Rush:** 45-second rounds. Every crumb eaten is a point, shown as 🍪 in the scoreboard with a ⏱ timer at the top. Knocked-out kaiju drop half their crumbs and come back after 2.5 s with a short shield. Most crumbs wins the round; a tie scores nobody.
- **Hot Dumpling:** one kaiju carries a steaming dumpling, shown above its head and pulsing faster as the fuse gets shorter. Touch a rival to pass it on. When the fuse runs out it POPS, knocking out the carrier. Last one standing wins. Needs 3+ players, so bots are added automatically.
- Bots understand all three modes:
  - **Team Feast:** they don't target teammates.
  - **Hot Dumpling:** the carrier chases rivals and everyone else runs from the carrier.
  - **Crumb Rush:** they chase crumbs.
- **Customise:** `src/sim/modes.ts`
  - Names, one-line blurbs, how-to text.
  - `enabled: false` hides a mode.
  - All the numbers: round time, respawn delay, crumb rate, fuse range, pass cooldown, carrier speed, team names and colours, friendly fire.
- **Not yet:** Online play still uses Classic only.
- **Tests:** `tests/world.test.ts` → "party modes". Screenshots: `node scripts/shots-modes.mjs`. Demo URL: `?mode=free&demo=4&gmode=teams|crumbRush|hotDumpling`.
