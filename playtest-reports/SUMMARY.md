# Playtest round 7 — 11 Sonnet agents (2026-11-19): extreme-feedback template, new Phone Player

Earlier rounds are in `round1/`–`round6/`. Release bar: every profile at **9.0 or higher**.

Each tester used about 95–200 commands, opened every screenshot, and filled in an exhaustive issue table plus a "what would make it 9" checklist. In total they logged about **470 issues: 1 blocker, about 60 major**, and the rest minor or polish. There were no JavaScript errors in any run.

| Profile | R5 | R6 | R7 |
|---|---|---|---|
| Achiever | 6.5 | 6 | **7.5** |
| Story Fan | 6.5 | 6.5 | **7** |
| First-Timer | 6.5 | 7.5 | **7.5** |
| Party Host | 6.5 | 6.5 | **7** |
| Tinkerer | 6.5 | 6.5 | **7.5** |
| Kid | 7 | 7 | 7 |
| QA Tester | 7.5 | 7 | **7.5** |
| Fighter | 6.5 | 6.5 | 6.5 |
| Collector | 6.5 | 6.5 | **7.5** |
| Challenge Seeker | 5.5 | 6 | **7** |
| Phone Player (new) | – | – | 7 |
| **Average** | **6.6** | **6.6** | **7.2** |

This is the highest average yet, and no profile went down.

## Fixed right after round 7 (in the next build)
- **Phone blocker:**
  - Workshop → PLAY IT → quit → Free Play left a phone with a keyboard-only seat and no controls. Phones now always get the touch seat.
  - Quick taps on STOMP/THROW/SWIPE/DASH could be lost on frames with no game step. Taps now count for 120 ms.
- **Phone wording:** "1 / START", "Esc …" and "Click" become tap wording on touch, and Challenges / House Rules get ✖ close buttons.
- **Overlaps and readability:**
  - First Service toasts no longer land behind the result title; they go on the receipt.
  - Result buttons appear right away and moved right, clear of the receipt.
  - A dark plate sits behind round and result text over busy tables.
  - The Move Lab banner moved to the bottom, and Esc leaves the Move Lab.
  - FAST FORWARD is hidden during INSTANT REPLAY.
  - The double-twist button label is short ("ICE + TURBO").
  - Help tabs no longer show two highlighted at once.
  - The Gallery counter is bigger.
  - NEXT UP on the title has a plate.
  - Pantry deal and Lifeline text are shorter.
  - Chapter-clear card: the receipt and unlock no longer go under the buttons.
  - Story star row is clear of SCENE, and "TIP" no longer appears twice.
  - GAUNTLET OVER: the perk line wraps and the duplicate NEW BEST is gone.
  - Title card subs shrink before they wrap.
- **New player:**
  - A "▼ YOU" marker shows over your kaiju for the first seconds of each round.
  - Name tags are on by default.
  - Practice → FIRST MATCH starts the match straight away.
  - Help explains parry, charge lines and the Giant Hand.
- **Story:**
  - Boss Phase 2 stays visible: a "👑 PHASE 2: FURIOUS!" HUD line and a red aura.
  - The chapter 4 boss starts at 70% belly instead of 85%.
  - Kid Mode: a one-sentence defeat card in big text, and Helping Hand after the first loss.
  - The Spicy rival card shows the tougher level.
- **Economy:**
  - The receipt total includes achievement payouts, and Rank points are explained.
  - The daily deal no longer jumps to another item when you buy something.
  - "30 stars" now says it means Grand Feast stars.
- **Party:** the Cup final is first-to-2 (worth ×2), "Past champions" shows real dates, and "1 pt" uses the right grammar.
- **Fighter:** BRUTAL bots were weaker than HARD (the reference bot won 32% against BRUTAL vs 22% against HARD). They're now level with HARD (23%).
- **Records** shows Trial stars.

## The remaining gaps to 9 (by how many profiles asked)
1. **A difficulty curve and fairness** (Fighter, Story, Kid, Achiever):
   - a level between NORMAL and HARD
   - a Giant Hand you can dodge, with KOs credited to the last attacker
   - a grace window after a KAIJU ends
   - Kid Mode easy bots everywhere
2. **Depth after 1–2 hours** (Collector, Achiever, Challenger):
   - Shiny / Golden kaiju forms
   - a token sink after the Pantry is bought out
   - tiered grind achievements with ETAs
   - Trial / Daily / Spicy ladders and a weekly Trial
3. **Party night polish** (Host): a CUP ON/OFF toggle that starts on PLAY, quit protection and "resume cup", a scoreboard panel, and length presets.
4. **Story as a campaign** (Story): a Second Helpings / Dessert hub, a story log, and boss set pieces.
5. **Tinkering** (Tinkerer): a twist picker you can go back through, building your own doubles, and a Workshop that shows the surface and hazard, with undo and drag.
6. **Phone** (Phone): a reserved thumb zone so on-screen buttons never cover table mats or labels, and bigger swatches and tap targets.
