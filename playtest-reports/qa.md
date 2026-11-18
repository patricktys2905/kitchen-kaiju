# Playtest evaluation: The QA Tester (profile 10, port 7110)

**Fun score: 7.0 / 10.** Stable (0 JS errors across ~85 commands, no hard blocks), but several text-fit failures remain on the results and Gauntlet screens, which the brief says were audited, and the long-term loop is still thin.

All screenshots are under `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r6-7110\` (shot-N.png).

## What I did
- Title, Settings, Keyboard Controls (rebind and reset), How to Play (Basics, Modes tabs), Records, Gallery, Pantry (bought Peach), Workshop (placed past the 12-prop cap, PLAY IT), Online lobby (opens, DOM-based so /look is empty).
- Free Play: pressed PLAY with zero seats joined (works, the game assigns a human plus a bot); 6-seat setup; House Rules (saved slot 1, copied code; "Enter a friend's code" has no testable text field via the harness).
- Matches: Free Play 1 match won (3-2); Story ch1 lost, retried, cleared (2 stars); Gauntlet waves 1-4 cleared (including the wave-4 boss Salmonster), then deliberately lost lives; Daily (Hot Dumpling) played to a loss; Party Modes setup viewed only.
- Odd inputs: Escape mid-match, P mid-match (pause toggles fine), 5+ Escapes in a row from nested screens, Space spam through the opening cutscene, Digit1/Digit2 spam on perk and life-lost screens, 14 rapid taps in the Workshop, rebinding W to SPACE.
- /errors: "none" at start, middle and end.

## What worked for me (briefly)
- Pause/Resume/Quit and Escape back-navigation are solid; no softlocks from spamming Escape or Space.
- The Pantry works: buying Peach took 264 to 144 tokens, "OWNED" state shows, the weekly order completed (5/5) and paid.
- House Rules slots save and load, and the share code is generated and copied.
- Rebinding swaps conflicting keys rather than duplicating them, and RESET TO DEFAULT restores them.
- Defeat card "What beat you" (Story ch1) is clear and useful.

## The single biggest structural problem
**Results and in-between screens are built as stacked overlays on top of live gameplay, with no layout system to stop them colliding.** The receipt card, perk picker, achievement toasts, "most KOs" footer, standings and the giant kaiju portrait are all absolutely positioned over the table. Every new feature this round (receipt, medals, perks, orders) added another overlay, and they now collide. See "Bugs". In Gauntlet the player must read and act on exactly the screen where overlaps are worst (perk choice plus rewards).

Separately, the receipt is only visible briefly on loss: on the Story defeat the 🧾 receipt (+5 tokens, mastery, "knocked out by") is shown for a moment on the table, then the harness-time advances and the DEFEATED modal replaces it with no tokens or mastery line. The modal never shows the receipt, so the new progression loop is invisible exactly when a frustrated player most needs a reward cue.

## Big change proposals (2–3, most important first)

### Proposal 1: One unified "Results Flow" screen (replace overlays-on-the-table)
- **Problem it solves:** Overlaps seen in shot-31 and shot-32 (perk cards covering the receipt), shot-35 and shot-45 (footer stat line wrapping onto the table frame), shot-45 (standings text over a busy tablecloth, receipt box overlapping table art), and the Story defeat modal (shot-27) dropping the receipt entirely.
- **How it would work (detailed design):** After every match or Gauntlet wave, fade the table to 40% and show a single full-screen panel (1280x720, 24px safe margin) with fixed zones: header (verdict + stars/medal, y 40-150), left column Standings (max 6 rows, each 1 line, name truncated at 14 chars with ellipsis), right column RECEIPT (tokens, mastery bar, orders, "what beat you" plus tip), bottom row of awards (max 3 chips, any extra chips in a "+2 more" chip that opens on tap), and a bottom button row (NEXT / REMATCH / MENU; in Gauntlet the 3 perk cards live in the bottom row instead of the table). Every text box has a max width and a measured-wrap helper that shrinks font 2 steps before truncating. Achievement toasts queue in a corner stack (top right) and never touch the verdict zone. The same component serves Free Play, Party, Daily, Story and Gauntlet with a different header and button set. Add an automated overflow test: render each results variant with the longest names (CHOCOMUNCH, BUBBLEGUMBO), all 6 players, 3 awards and 3 achievements, and assert every text bounds is inside its zone.
- **Example moment:** Gauntlet wave 4 boss clear: the panel shows "WAVE 4 CLEARED · BOSS DOWN", receipt on the right (+23 tokens, Mastery 97/160), three perk cards across the bottom, and the "ON A ROLL" achievement slides in top right. Nothing overlaps; the player reads the receipt while choosing a perk.
- **Rewards / progression hooks:** Makes tokens, mastery and orders readable on every end screen, so the whole progression layer (the focus of this round) becomes visible. An "Orders" mini-bar on the receipt shows progress ticking up each match, a hook to play one more.
- **Risks and edge cases:** Phones (small screens, so use rem-based scaling and cap text at 2 lines); 6-player standings height; localisation later; slower flow, so keep a 1-tap "skip to next" and let the panel auto-focus the primary button; replay/screenshot SHARE must still capture the table, so keep the table visible behind the 40% dim.
- **Size:** M (one results component, replaces 5 ad-hoc overlays; touches Free Play/Party/Daily/Story/Gauntlet end states and the receipt code).
- **Score impact for me:** +1.0. This is the largest QA-visible polish gap and it also lifts first-impression for everyone.

### Proposal 2: Automated UI-fit and state QA harness built into the game (debug "Screen Tour")
- **Problem it solves:** The brief says every screen was audited, yet I found about 6 overlaps in 85 commands. Manual audits do not survive the next feature. Also unclear states (Extra Life not raising the heart count, see Bugs) go unnoticed.
- **How it would work (detailed design):** Add a hidden `/tour` route (and a `?qa=1` URL flag) that walks a fixed script: every menu screen, every results variant (win/loss x each mode x 1/2/4/6 players), every modal, with worst-case data presets (longest kaiju name, 99,999 tokens, 6 achievements queued, Spicy and Gauntlet ON). For each text object the game exposes bounds (it already prints `[x,y]` in /look); the tour checks bounds against the parent box and against each other, writes `overflow-report.json` (screen, element, overlap %), and saves a shot per screen. Run it in CI on every commit. Add a pre-set "stress save" (all unlocked, huge numbers, Gauntlet wave 25 with all perks) so end-game screens are tested without playing 10 hours.
- **Example moment:** A developer adds a 4th perk line; CI fails with "Gauntlet perk card 2 overlaps receipt (34% area)" and links the screenshot.
- **Rewards / progression hooks:** None for players; protects every future release (the next four rounds of features).
- **Risks and edge cases:** Overlap by design (HUD over table) must be allow-listed; animated text needs a settled frame; emoji width differs per platform, so measure with the real renderer and a fallback font.
- **Size:** M (harness plus bounds API, no gameplay change).
- **Score impact for me:** +0.5.

### Proposal 3: Gauntlet "Run Summary and Season" (make failed runs rewarding and varied)
- **Problem it solves:** I lost three lives on wave 5 (Giant Hand, wind) and the run simply reset to wave 1 with fresh lives and no summary screen I could find (state looked restarted at WAVE 1 with 3 hearts; see Bugs). The Records stat "Gauntlet best wave" is the only trace. The brief promises a score and grade, but I never reached or saw a final screen because the flow restarted.
- **How it would work (detailed design):** On the last life lost, show a Run Summary: wave reached, score (waves x 100 + KOs x 10 + boss bonus 250), grade D-S, course reached (Starters, Mains, Desserts, Seconds), perks collected, "what beat you" counts, tokens earned, and a personal best and the weekly best. Buttons: RUN AGAIN, CHANGE LOADOUT, MENU. Add a weekly "Gauntlet Season" with a fixed seed so every player sees the same 12 waves; a ladder against your own past 5 runs; and 3 season milestones (wave 8, 12, 16) paying 60/100/160 tokens plus a Season colour. Lunchbox/Lifeline from the Pantry appear in the loadout row (equipped items listed, with a clear "Lifeline +1 life" heart count).
- **Example moment:** Wave 6 (Mains course) the Giant Hand takes my last life. Summary: "Grade B, Wave 6, 1,240 pts, best this week 1,810. Beat by: Giant Hand x2, wind x1. Tip: stay off the edge when the hand's shadow appears. +54 tokens." I tap RUN AGAIN with my Lunchbox perk pre-selected.
- **Rewards / progression hooks:** Weekly seeded Season, personal-best ladder, milestone colours, Pantry items that matter.
- **Risks and edge cases:** Seeded runs with random perks need a seeded RNG; ties; offline play; players with the Lifeline item must see the extra life reflected.
- **Size:** M-L (Gauntlet flow, Records, Pantry, new summary screen).
- **Score impact for me:** +0.5.

## How the new features from this round felt
- **Chef Tokens / Pantry / Weekly Orders:** Works and feels good; buying a colour is instant. But the ladder is slow: 264 tokens after about 10 matches, the Lifeline costs 350. Chef Rank still reads "Dishwasher" after Mastery Lv 3 and 264 tokens earned; it is not clear what moves it (the Records screen and Pantry both show it as static). Needs a visible "next rank at X" line.
- **Kaiju Mastery:** Gallery card shows `Mastery ★☆☆☆☆☆ Lv 1 Rookie (0/60 XP)`; levelled to Lv 3 Sous Chef. Level-ups show ⬆ on the receipt. Good, but it is not obvious what a level gives.
- **Receipt card:** Good idea, but poorly placed (see Bugs). On a win it listed "Knocked out by: cutlery" even though I won the match (Story ch1 clear, shot-28): the line reads as a contradiction; label it "Rounds lost to".
- **Gauntlet:** Courses, boss wave (Salmonster, "BOSS" banner) and perk pick work. Perk picker overlaps the receipt. Wave 3 clear had no perk prompt until a moment later. The Extra Life perk did not change the hearts (see Bugs).
- **Daily medals:** A "Bronze daily medal" was awarded on a screen titled "DAILY CHALLENGE FAILED" and "Today: not won yet": mixed message. Also the standings list "BUBBLEGUMBO (YOU)" while the harness's /state shows me as GOBZILLA (daily forces seat 1 Bubblegumbo; verify who the player actually is).
- **Comeback Help:** Not observable in a 2-player 3-2 match; nothing visible told me it triggered. Needs an on-screen cue ("Comeback bonus: fuller belly") for it to be felt.
- **House Rules:** Slots and code work. The code is a base64 of mode/first-to/twist/bots only (`KK1-…`): it drops the roster and the table, so "share your setup" shares only part of it. The overlay is translucent: the setup's seat captions ("Bot: NORMAL (tap)") ghost through the slots (shot-21).
- **Story:** Defeat card with "What beat you" and Retry is good; opening cinematic + Space-skip works. Chapter-clear card is clean (shot-29).
- **Clarity:** DIZZY! HIT IT NOW! appeared and was readable (Gauntlet wave 3). Giant Hand explained itself on the life-lost card ("The Giant Hand goes for the fu…", truncated in /look, see Small notes).

## Bugs that block play
No hard blocks and no JS errors (`/errors` returned "none" at start, middle and end). Seriously harmful or likely-confusing problems, in order:

1. **Gauntlet perk cards overlap the receipt card (text overlap / cut off).** Repro: Title > GAUNTLET > win wave 1 (or any wave) > "WAVE N CLEARED!" screen. The bottom-left 🧾 THIS MATCH card is partly covered by the first perk card, so "+20 Chef T…" and the mastery/orders/"Knocked out by" lines are cut off. Screenshots: `art-src\.playtest\r6-7110\shot-31.png`, `shot-32.png`.
2. **Footer awards line overflows the table frame (wraps to 2 lines and runs through the bottom edge).** Repro: win wave 3 in Gauntlet with 4 awards ("Most KOs · Crumb Monster · Kaiju Lover · Survivor"), or finish any multi-award match in Daily/Party. Screenshots: `shot-35.png`, `shot-45.png`. Text crosses the table border and the first line is clipped at the table edge in shot-45.
3. **Receipt overlays/overlaps other content.** The bottom-left receipt box covers a table prop and the standings sit directly over tablecloth patterns (low contrast, hard to read the "Today: not won yet" line). Screenshots: `shot-15.png`, `shot-45.png`.
4. **Achievement toast crowds "Next: wave 3 · ❤❤❤".** The "🏆 ON A ROLL" banner sits directly under it with no gap (touching). Screenshot: `shot-32.png`.
5. **Gauntlet Extra Life perk does not increase the heart count.** Repro: Gauntlet, pick "❤ Extra Life" after wave 2. HUD continues to show ❤❤❤ at wave 3, wave 4 and in "Next: wave 4 · ❤❤❤". Either the hearts display is capped at 3 or the perk is lost (could not confirm further). Screenshot: `shot-32.png` then wave header in `shot-33.png`.
6. **Gauntlet appeared to restart from wave 1 with 3 hearts after losing lives at wave 5 (possible).** Repro attempt: let waves play with `flee`, press Digit1 on each "LIFE LOST!" card. The second LIFE LOST card said "❤❤ left · trying wave 1 again" and the next screen was "WAVE 1 · DINER GRIDDLE" with ❤❤❤, i.e. a new run began without a Run Summary (my Digit1 presses may have triggered it; unconfirmed). I never saw a final score/grade screen. No screenshot of the restart; see `shot-37.png` for the pause on the restarted run.
7. **Story defeat modal lacks the receipt.** The 🧾 THIS MATCH box (tokens, mastery) appears on the table for a moment on a loss (`shot-25.png`) but not on the DEFEATED card (`shot-27.png`).
8. **House Rules overlay is see-through**, so setup captions ghost behind the slot buttons and "Esc closes" overlaps a ghosted PLAY button. Screenshot: `shot-21.png`.

## Small notes (max 5, one line each)
- Daily "FAILED" screen also grants a "Bronze daily medal": reword or order it (shot-45).
- Receipt "Knocked out by:" shows on a win (shot-28): rename to "Rounds lost to".
- Chef Rank never changed in 10+ matches; add "next rank at N tokens" on Records/Pantry.
- Defeat card in Gauntlet truncates the Giant Hand tip ("The Giant Hand goes for the fu…"): wrap to 2 lines.
- Workshop's "PROPS (tap one, then tap the table)" heading sits tight against the top row of tiles (shot-41).
