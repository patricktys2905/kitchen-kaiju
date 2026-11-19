# Playtest round 8 — 11 Sonnet agents (2026-11-19), after the six "gaps to 9" features

Earlier rounds are in `round1/`–`round7/`. Release bar: every profile at **9.0 or higher**.

| Profile | R6 | R7 | R8 |
|---|---|---|---|
| Achiever | 6 | 7.5 | 6.5 |
| Story Fan | 6.5 | 7 | 6.5 |
| First-Timer | 7.5 | 7.5 | 7 |
| Party Host | 6.5 | 7 | 7 |
| Tinkerer | 6.5 | 7.5 | 7 |
| Kid | 7 | 7 | 7 |
| QA Tester | 7 | 7.5 | 7 |
| Fighter | 6.5 | 6.5 | 6.5 |
| Collector | 6.5 | 7.5 | 6.5 |
| Challenge Seeker | 6 | 7 | 6.5 |
| Phone Player | – | 7 | **7.5** |
| **Average** | **6.6** | **7.2** | **6.8** |

The testers logged about 500 issues: **0 blockers**, about 60 major. There were no JavaScript errors.

## Why the average dipped
The new features worked, but several shipped rough, and testers marked down silent or confusing behaviour:
- **SHINY:** no price shown, no confirmation, and no visible change after buying.
- **Quit confirm:** stayed armed after you resumed.
- **Double twist:** reverted to a single after a match.
- **Kid Mode:** only applied the first time you opened setup.
- **Phone:** the TWIST button still cycled instead of opening the picker.

There was also one long-standing bug: the Practice SWIPE step couldn't be done without cutlery. The Phone Player went **up** (7.5) because the thumb zone works: on-screen buttons never covered content.

## Fixed right after round 8 (in the next build)
- **Shiny:** the button shows the price and the level needed, a second tap confirms, and owned Shiny forms show a "✨ SHINY" badge.
- **Pantry:** a second tap confirms, and items you can't afford say how many more 🪙 you need.
- **Quit confirm:**
  - It resets when you resume and expires after 4 s.
  - The warning is big, yellow and central.
  - MENU on a Cup standings screen also asks first.
- **Double twists** survive going back to the menu.
- **Kid Mode:**
  - Bots are EASY in Free Play, Party and the Daily every time, and the setup shows EASY.
  - The Settings description is updated.
- **Practice:**
  - SWIPE works without cutlery, so the step can be finished.
  - The title's Practice button stays until it's done.
- **Giant Hand:** a KAIJU is too big for it to flick.
- **Story:** chapter 3's Mothball is now easy (the ch2 → ch3 cliff).
- **Daily:** gentler bots (normal, easy, easy).
- **Phone:**
  - The TWIST button opens the picker.
  - Keyboard hints become tap wording on the title, Settings and Story (and the map footer is hidden).
- **Layout:**
  - At most 3 pop-ups on screen at once.
  - FAST FORWARD sits below INSTANT REPLAY.
  - The Story Rewards ✖ CLOSE button moved to the top.
  - Help no longer shows "[X]" and "[G]".
  - A trial loss with no rounds won says "NOT THIS TIME".

## What still stands between these scores and 9
1. **Feedback for every action** (QA, Achiever, Collector): achievement toasts during the match, order payouts shown, and refusal toasts everywhere.
2. **A fair, legible fight** (Fighter, Story, Challenger):
   - a short bot reaction delay at round start (deaths 1–3 s after GO)
   - a per-round "why you lost"
   - power stat cards
   - a bot level explainer
   - a Daily preview card
3. **Depth for collectors** (Collector, Achiever): per-kaiju cosmetic ladders, fewer free unlocks at the start, rotating shop stock, Tables and Colours tabs.
4. **Party night** (Host): phones as controllers (QR join), mode-aware results (team totals, crumbs, seconds held), and saved Cup records.
5. **Story** (Story, Kid): comic panels between bosses, a clearer boss Phase 2 (banner and HP bar), a smoother ch3–ch4 ramp, and Kid Mode visibly easier.
6. **Readability** (all): a minimum text size on Trials, Help, Records and the title links, and the remaining near-touch layouts:
   - the Party Cup hint vs KEYS
   - SCENE vs the panel edge
   - the Records next-rank value
