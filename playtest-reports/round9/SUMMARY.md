# Playtest round 9: 11 Sonnet agents (2026-11-19), after the round 8 polish and the last three pieces

Earlier rounds are in `round1/` to `round8/`. Release bar: every profile at **9.0 or higher**.

| Profile | R7 | R8 | R9 |
|---|---|---|---|
| Achiever | 7.5 | 6.5 | 7 |
| Story Fan | 7 | 6.5 | 7 |
| First-Timer | 7.5 | 7 | 7.5 |
| Party Host | 7 | 7 | 6.5 |
| Tinkerer | 7.5 | 7 | 7 |
| Kid | 7 | 7 | 7.5 |
| QA Tester | 7.5 | 7 | 7 |
| Fighter | 6.5 | 6.5 | 6.5 |
| Collector | 7.5 | 6.5 | 7.5 |
| Challenge Seeker | 7 | 6.5 | 6.5 |
| Phone Player | 7 | 7.5 | 7.5 |
| **Average** | **7.2** | **6.8** | **≈7.05** |

There were 0 blockers and no JavaScript errors.

## Fixed straight after round 9 (FEATURES §71)
- **Story Rewards panel:** shown in 3 columns, so all 13 rewards fit on screen. CLOSE moved to the top.
- **Quit confirm:** now in every match (Workshop, Party, Story), not only in some.
- **Practice:**
  - A step that is stuck for 30 s is skipped automatically, so Practice can always finish.
  - The SWIPE step also works unarmed.
- **Chapter-clear card:** the achievement line no longer overlaps the "Chapter N unlocked" line.
- **SECOND HELPINGS:** the button opens as soon as the campaign unlocks, with no need to leave the map.
- **Feedback you can see:**
  - Unlocks are also listed on the match receipt.
  - Toasts stay on screen for 4 s.
  - Comic panels can't be skipped by accident during their first 2 s.
- **Fairness:**
  - Bots can't STOMP during the first 4 s of a round.
  - Story ch3 (Leftovers) is first to 2.
  - The YOU marker steps aside for the STOMP coach.
- **Phone:**
  - The Cup pill shows ON/OFF.
  - The TWIST pill shows the full double twist.
  - A PHONES AS PADS pill was added.
  - The bot-level explainer is shown on phones.
- **Setup:**
  - The bot explainer stays visible when a twist is picked.
  - Kid Mode shows "EASY 🧸".
  - Perk cards are numbered 1/2/3.
  - Your first match uses tables you own.
- **Other:**
  - The Gallery mastery ladder is written in words.
  - The couch lobby is more compact.
  - Daily's countdown names its bot levels.

The phone STOMP "not firing" report is a harness artifact: the game is frozen between commands. A real-time Playwright test showed one tap goes KAIJU.

## Still between us and 9 (the top asks from the reports)
1. **Fighter / Challenger:** a readable KAIJU stomp tell (a 0.5 s landing circle), a smoother Gauntlet ramp, and a challenge route to Spicy and Dessert.
2. **Party Host:** explain the Cup points (+5/+3/+2/+1) and Crumb Rush scoring, show a per-game history, and grey out the MODE pill when Cup is ON.
3. **Kid:** a real Kid Mode font scale across Help, Records, Pantry and Gallery.
4. **Collector / Achiever:**
   - Show the 🪙 balance in the Gallery.
   - Make Shiny buys sparkle.
   - Locked colour swatches should say how to earn them.
   - The Records footer should follow the pinned goal.
5. **First-Timer:**
   - Mark your own seat "YOU · P1".
   - Give each Practice step its own hint.
   - Make the table counts agree across Help, Free Play and Gallery.
6. **Tinkerer:** a twist "try it" mode, and tooltips for Workshop props and hazards.
7. **Daily:** visible medal targets and a reason to retry.
