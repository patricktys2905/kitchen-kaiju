# Playtest evaluation — The Achiever (round 11, port 7101)

**Fun score: 7.0 / 10** (The collection spine is good: Goals, pins, receipts, unlock hints. But a fresh grind is slow and opaque, and /autoplay barely earns anything.)

> Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r11-7101\` (shot-N.png). JS errors: `/errors` returned "none" at start, middle and end.

## What I did
- About 115 harness commands, roughly 12 matches (about 5 myself, 4 via /autoplay, the rest by `auto:`), on a fresh save.
- Screens visited:
  - Title.
  - Records (all 3 achievement pages and the 🎯 GOALS panel). I pinned First Bite.
  - Free Play setup, with the bot-level cycle checked.
  - Free Play matches and match results.
  - Pantry, where I bought Toffee through the tap-twice flow.
  - Gallery: Gobzilla, Norigon and two locked slots.
  - Story map, Opening video and chapter 1, including the 📜 Meanwhile card.
  - 1-minute Practice, completed.
  - Challenges card and Trials list. I played Bare Knuckles and lost.
  - Daily preview card, and a Daily Crumb Rush that I lost.
  - Party Modes setup and a Team Feast match.
  - Help (BASICS and EXTRAS) and Settings.
- Not reached: Workshop, Gauntlet, Spicy and Online.
- Timing: a full 4-player Free Play match takes about 50 s of game time. `/autoplay?n=4` took 3 min 24 s real time and gave 0 wins, 3 coins and an achievement. Chapter 1 took 2 manual commands.
- Result: matches won 1 (Story ch1, ★★★). Achievements went 0 to 5 of 37: Crumb Muncher, Size Matters, First Bite, Forked Up, plus one more. Colours 6/21, Kaiju 14/20, Tables 14/18, Chef Rank Prep Cook (still 8 of 14 pts).

## What worked for me
- 🎯 Records ▸ GOALS is exactly what an achiever wants (shot-2, shot-43):
  - Every collection has a bar and a "next:" line, e.g. "next: Beat Story chapter 4: Boss of the Belt (1/4 cleared)".
  - The 4 closest achievements are ranked by progress, each with a 📌 PIN.
  - Pinning works. The title then shows "NEXT UP … Score 25 knockouts → 🎨 Grape colour (88%)".
- Achievement list: each row shows its colour reward and a progress counter. The footer says "Each achievement pays 30 🪙".
- The receipt lists achievements and colours earned. It showed "Crumb Muncher +30", "Size Matters +30 · 🎨 Lava colour!", "Order done", "NEW KAIJU", "NEW TABLE" and "Clear Story chapter 1 ✔ +25" (shot-10, 14, 25, 33).
- Gallery locked slots say exactly how to unlock: "Unlock: Win 1 match in any mode (you have 0/1)" and "Collect 30 stars in THE GRAND FEAST (you have 0/30)". The ✨ Shiny tag and "You vs it: 0–2" show, and the detail panel is no longer blank (shot-19).
- Pantry buy is one item at a time ("tap again to buy for 28 🪙"). Weekly orders show progress and "paid".
- Story: "Chapters 1/12 · 7% of everything · ★ 3/36 · 🎁 2/13" is clear. The chapter-clear card has ★★★, a rival quip, the "📜 Meanwhile…" line, coins and Mastery (shot-26).
- Daily preview card is clear: opponents, table, medals, win streak and the 🌶️ SPICY +40 button (shot-34).
- Practice is clear, pays +20 and ends with a good three-way hand-off (shot-30). The KAIJU HUD shows "KAIJU 7s!".

## 🧾 Exactly what would make this a 9/10 for me
1. **Make /autoplay-style grinding feel rewarding and show a per-match "progress delta"**
   - **What:** after every match the receipt shows the progress each stat gained, e.g. "Win 10 matches 1→1, Crumbs 227→244, Knockouts 26→29, closest: Second Breakfast 61%". Add an "Achievements touched" line even when nothing unlocked.
   - **Where:** match receipt (Free Play, Party, Daily, Trials) and the Daily result.
   - **Behaviour:** the 📌 pinned goal is always shown with its bar (it already shows "First Bite: 0/1"). Add a second "closest" goal and "+N this match" for each counter.
   - **Impact:** +0.6
2. **Show how long each remaining achievement will take**
   - **What:** next to "Win 50 matches 1/50" and "Eat 1,000 crumbs" add "≈ N matches / ≈ N min at your pace". The player estimate comes from the last 10 matches.
   - **Where:** Records rows and the Goals panel.
   - **Behaviour:** flag a goal as ⏳ LONG above about 60 min.
   - **Impact:** +0.5
3. **Rework the 12-achievement "win/streak" bottleneck**
   - **What:** "Win 3/5 in a row", "Win 10/25/50 matches" and "Mix It Up (8 kaiju)" all depend on winning vs the default NORMAL bot. I got 0 wins in 4 autoplay matches and 0 wins as a human against NORMAL/HARD bots before I lowered bots to EASY. 1 win came from Story vs an easy rival.
   - **Behaviour:** (a) /autoplay and `auto:` should play at least as well as a decent human, or (b) add a "Rookie bots" setting that still counts for match-win achievements but caps pay at 50%. Also state on the achievement row that wins count at any bot level.
   - **Impact:** +0.5
4. **Fix the bot-level cycle**
   - **What:** the BOT LEVEL pill cycles EASY → NORMAL → TOUGH → HARD → BRUTAL on one button, and a fresh save starts at NORMAL. Reaching EASY takes 4 clicks.
   - **Behaviour:** add a long-press/right-click that cycles backwards, or show all 5 levels as chips. The receipt tip "Tough bots? Set BOT LEVEL to EASY" must not show when bots are already EASY (it did, shot-42).
   - **Impact:** +0.3
5. **Fix the Pantry banner overlap** (see issue 1). The "FIRST SERVICE ✔ Visit the Pantry: +25" banner sits on top of the Peach card and the Weekly Orders panel and does not fade (shot-15, shot-17).
   - **Behaviour:** use the same top-right toast box as achievements, with a 3 s timeout.
   - **Impact:** +0.2
6. **Chapter-clear and match receipts must be consistent**
   - **What:** the Story clear card (shot-26) omits "🏆 First Bite +30", "🎨 Lime colour", "🎁 NEW KAIJU: Chocomunch" and "Clear Story chapter 1 +25", which only flashed on the in-match receipt (shot-25).
   - **Behaviour:** the clear card gets a single "Earned" list with every item.
   - **Impact:** +0.3
7. **Tell me the unlock hint on the title "NEXT UP" and in Goals for ★ goals**
   - **What:** "Chapters 1/12" and "next: Beat Story chapter 4 (1/4 cleared)" tell me the chapter number but not which ★★★ is missing. Goals should say "Ch 2 → ★★★: win without losing a round" and offer a 📌 for any collection, not just achievements.
   - **Behaviour:** add 📌 buttons on each collection row (Kaiju, Tables, Colours, Shinies).
   - **Impact:** +0.3
8. **Add an achievement filter/sorting to Records**
   - **What:** 37 achievements over 3 pages in fixed order. Add tabs ALL / CLOSEST / LOCKED and a progress %, and show "5/37" on the page header.
   - **Impact:** +0.2
9. **Fix the Practice checklist ghost text over the playfield** (shot-30).
   - **Impact:** +0.1
10. **Bigger, clearer text on title top-bar buttons** (SETTINGS, HELP and the rest are about 11 px, shot-27).
    - **Impact:** +0.1

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Pantry (first visit) | The "🍽 FIRST SERVICE ✔ Visit the 🛒 Pantry: +25 🪙" banner has no background, sits at y≈360 across the Peach card and the Weekly Orders "Win 5 matches" row, and is still there in the next screenshot (does not fade). Covers text. | shot-15.png, shot-17.png | Put it in a top-right toast with a backing box and a 3 s timeout. |
| 2 | major | Free Play / Autoplay | `/autoplay?n=4&level=easy` took 3 m 24 s and produced 0 wins (it showed "Bot: NORMAL" seats). A grinder cannot use it to farm "Win 10/25/50" or "On a Roll". | shot-10.png | Make autoplay actually play EASY and win about 60% of the time, or document that it does not. |
| 3 | major | Free Play setup | A fresh save starts at NORMAL and the pill cycles EASY → NORMAL → TOUGH → HARD → BRUTAL in one direction. Getting to EASY takes 4 clicks, and the setup subtitle does not list the order. | shot-5.png, shot-6.png | Chips for all 5 levels, or a back-cycle. |
| 4 | minor | Match results (Free Play, Team Feast) | Tip "💡 Tough bots? Set BOT LEVEL to EASY…" shows when the bots are already EASY. | shot-42.png | Suppress it when the bot level is EASY. |
| 5 | minor | Story ▸ chapter clear | The clear card lacks the achievement, colour, new kaiju and "Clear Story chapter 1 +25" lines that flashed on the in-match receipt. Round 10 said "EVERY achievement … is on the receipt", but this receipt is missing them. | shot-25.png vs shot-26.png | Merge them into the clear card. |
| 6 | minor | Records ▸ GOALS | The modal text (the Collections/Closest lists) does not appear in `/look`, and the panel stays open until the ✖. A click on the page buttons behind it does nothing. Not a player issue, but a QA/accessibility gap. | shot-2.png, shot-43.png | List modal text in `/look`. |
| 7 | minor | Records p.1 | Rank block: "Chef Tokens 🪙 0" while the Pantry, the receipt and the title call it "Chef Tokens (557)" or just 🪙. The three names (Chef Tokens, coins, 🪙) are mixed. | shot-1.png | Pick one name. |
| 8 | minor | Records ▸ achievements | Rows show no time estimate or "how to" hint for many goals: "Win a match with a twist on", "Shove a rival into the blender", "Regular" (the Daily 3 days in a row). Some have no 0/N counter at all (e.g. "Table Maker", "Plot Twist"). | shot-4.png | Add counters or hints for every row. |
| 9 | minor | Records p.3 | "Clean Sweep" reads "Win a first-to-3+ match without losing a round · 🎨 Cherry" in a visibly smaller font than neighbouring rows. | shot-4.png | Allow 2 lines instead of shrinking. |
| 10 | minor | Records | Two achievements overlap in meaning: "Leftovers Cleared" (Clear Story chapter 3 · 🎨 Toasty) and "Room for More" (Clear chapter 3 of Second Helpings). The name suggests the wrong chapter. | shot-4.png | Rename. |
| 11 | minor | Gallery | Locked ??? slots show an unlock rule (good), but the Gallery header gives only "Collection 51%" with no list of which locked slot is closest. | shot-18.png | Add a "closest unlock" line to the Gallery header. |
| 12 | minor | Gallery / Mastery | Mastery rewards ("✔ sparkles · 🔒 HUD star · 🔒 gold name · 🔒 gold frame · 🔒 crown · 🔒 Shiny") sit in 12 px text and do not say the XP needed for each level. The bar appears only in the detail panel. | shot-19.png | Show XP needed per tier, and a mini bar on each card. |
| 13 | minor | Free Play seat 2 / Trials | In the Bare Knuckles Trial my kaiju was Chocomunch, not my picked Gobzilla. Unclear which kaiju I will be. | shot-33.png | Show "You play: X" on the Trial card with a change option. |
| 14 | minor | Practice | When the practice completes, ghost checklist text ("✓ STOMP TO GO … AND SQUASH THE DUMMY", "THROW … SEED SPRAY") is still faded on top of my kaiju and the playfield. | shot-30.png | Clear the checklist on completion. |
| 15 | minor | Title top bar | SETTINGS / HELP / KAIJU / RECORDS / PANTRY / WORKSHOP are about 11 px with tight spacing. | shot-27.png | Raise to at least 14 px, with a wider hit area. |
| 16 | minor | Daily | A Daily result says "Bronze medal … win for 🥈" but there is no rematch hint or a "try again" cost. The Daily was lost with the Crumb Rush mode while Toastbat won through 15 KOs. Crumb Rush rewards KOs more than crumbs. | shot-37.png | Make Crumb Rush score crumbs (or show the crumb score per kaiju). |
| 17 | polish | Match results | The bottom awards strip ("🍴 Most KOs · 🍪 Crumb Monster · 🛡️ Survivor") is about 12 px and runs almost edge to edge. | shot-14.png | Wrap into two lines or enlarge. |
| 18 | polish | Story map | "🔒 SECOND HELPINGS clear chapter 6 to open" and "🔒 DESSERT" labels are 10–11 px. | shot-22.png | Enlarge. |
| 19 | polish | Records | "Win 3 matches in a row 1/3" showed 1/3 after only 1 win (Story ch1) and 3 losses, so the streak counter appears to count only wins across modes. Fine, but it is not explained. | shot-43.png | Explain which modes count. |
| 20 | polish | Story opening | First Story entry plays a full-screen opening video (long) before the map. A SKIP is there, but its text is small and top right. | shot-21.png | Skip on any key. |
| 21 | polish | Party setup | "⏱ ≈ 2 min" is shown with Party Cup OFF. With the Cup ON (6 games) it should say about 12 min. I did not test the Cup ON. | shot-39.png | Confirm the estimate scales with Cup length. |

## 🔠 Text and layout check
- Title (shot-27): OK. The top-bar buttons are small (issue 15). The NEXT UP card is clear.
- Records p1 (shot-1): OK. Rank block fine, nothing overlaps.
- Records p3 (shot-4): "Clean Sweep" row text is shrunk (issue 9). Otherwise OK.
- Goals panel (shot-2, shot-43): OK. No overlap, no cut-off.
- Free Play setup (shot-5): OK. Pills are not stacked.
- Match results (shot-9, shot-14, shot-25, shot-33): OK. The receipt overlaps the tabletop art but not other text. The awards strip is tiny (issue 17).
- Pantry (shot-15, shot-17): **PROBLEM**: the banner text overlaps the Peach card and the Weekly Orders row (issue 1).
- Gallery (shot-18, shot-19): OK. Small mastery text (issue 12).
- Story map (shot-22): OK. Lock labels are small (issue 18).
- Chapter-clear card (shot-26): OK.
- Practice complete (shot-30): **PROBLEM**: faded checklist text behind the player and on the card (issue 14).
- Challenges card (shot-31): OK, but tight at the bottom. The Chef's Pass line nearly touches the card edge.
- Trials list (shot-32): OK.
- Daily preview (shot-34): OK.
- Party Modes setup (shot-39): OK. 11 pills fit in a row, but the text is small.
- Team Feast in game (shot-40): OK. RED 0 – 0 BLUE shows at the top of the table.
- Team Feast results (shot-42): OK.
- Help BASICS (shot-44): OK.
- Settings (shot-45): OK.
- Not checked: Workshop, Gauntlet, Spicy, Online. Phone and Kid Mode were not tested (desktop only).

## The single biggest structural problem
Winning drives most of the achievement tree (Win 10, 25 and 50 matches, On a Roll, Too Hot to Handle, Mix It Up, plus kaiju and table unlocks), and the tool I would use to grind it is nearly useless. `/autoplay` took over 3 minutes for 4 matches and won none of them, and a human on the default NORMAL bots loses most rounds. There is no feedback loop saying "this will take N more matches", so the long goals (1,000 crumbs, 50 wins) feel like a wall rather than a path. Goals show only the next step and the closest bars, not the time cost.

Two things are missing: a way to farm wins reliably (a lower bot level that still counts, or a better autoplay), and an ETA per goal. With both, "annoyed when one takes forever or the requirement is unclear" would no longer apply.

## Big change proposals (2–3, most important first)
### Proposal 1: Goal ETAs and per-match progress deltas
- **Problem it solves:** I cannot tell how long an achievement will take, or whether a match moved me closer. The receipt only shows the pinned goal's current count.
- **How it would work (detailed design):**
  - Keep a rolling log of the last 10 matches (minutes, wins, KOs, crumbs, KAIJU count) and compute a rate per stat.
  - Every Records row and Goals "closest" card gets "≈ 14 matches · ≈ 25 min" and a ⏳ flag above 60 min.
  - The receipt gets a "📈 PROGRESS" section with up to 3 lines: "+17 crumbs → Second Breakfast 244/400 (61%)", "+3 KOs → Forked Up 26/25 ✔", "Win streak 0/3".
  - Add a "Fastest path" button in Goals that picks the cheapest 3 goals and pins them all (max 3 pins).
- **Example moment:** I finish a match, lose, and the receipt says "Second Breakfast +17 → 244/400, about 9 more matches". I know the loss still helped.
- **Rewards / progression hooks:** the achievement coin payout (30 🪙) is unchanged. Add a one-time "+10 🪙" when a player pins three goals.
- **Risks and edge cases:** a new save has no history, so use a default of 2 min per match. ETAs must hide goals that are not rate-based (Party Cup, Workshop).
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 2: "Rookie" bot tier that counts, plus a smarter autoplay
- **Problem it solves:** the win-based achievements are gated by bot strength and my autoplay does not win.
- **How it would work (detailed design):**
  - Replace the one-way BOT LEVEL cycle with five chips (EASY / NORMAL / TOUGH / HARD / BRUTAL).
  - Add a clear label under each: "wins count for achievements; coins ×0.5 on EASY".
  - `/autoplay` and the in-game `auto:` seat get a "Pro autoplay" that uses the same logic as the Hard bot for a human seat.
  - Show an ETA bar while autoplay runs: "Match 2/4 · about 50 s each".
- **Example moment:** I pick EASY, run 4 autoplay matches in about 2 minutes, and gain 3 wins plus 120 crumbs.
- **Rewards / progression hooks:** wins on EASY count toward match-win counters but not "Mix It Up" (needs NORMAL+), so there is still a reason to move up.
- **Risks and edge cases:** farming exploits (so the 0.5 coin multiplier), and bot-level restrictions on Party Cup.
- **Size:** S–M
- **Score impact for me:** +0.5

### Proposal 3: Unified "Earned" card after every mode
- **Problem it solves:** the three result screens (match receipt, chapter clear, Trial) each show different earnings. The chapter-clear card drops achievements, colours, unlocks and the +25 order.
- **How it would work (detailed design):** one "Earned" list component (coins, Mastery XP, achievements with colour, new kaiju/table/colour, chef orders, pinned-goal delta). It is shown in the corner on the match screen and in the clear card, with the same order everywhere. Items are clickable and jump to Records or the Gallery slot.
- **Example moment:** after chapter 1 the card lists "🏆 First Bite +30 · 🎨 Lime · 🎁 Chocomunch · 🍽 +25", and "🎨 Lime" opens the Colours row.
- **Rewards / progression hooks:** none new, but it makes the existing ones visible.
- **Risks and edge cases:** a long list on a phone needs scrolling; cap at 6 lines with "+N more".
- **Size:** S
- **Score impact for me:** +0.3

## How this round's new features felt
- **🧪 TRY IT free warm-up / Move Lab:** the Move Lab button is on the Gallery card, but I did not use it.
- **Gallery detail panel / ✨ Shiny tag / 📊 record vs kaiju:** all work. "You vs it: 0–2" is a nice touch, and the mastery bar is there, but small (issues 11 and 12).
- **Receipt shows every achievement:** works for matches (Crumb Muncher, Size Matters, Forked Up and the Lava colour appeared). It is missing on the Story clear card (issue 5).
- **Daily preview card:** clear and good. The 🌶️ SPICY button is visible. The weak point is that Crumb Rush rewards KOs.
- **Pantry:** the one-item buy flow works. The first-visit +25 🪙 is announced, but the banner overlaps the UI (issue 1).
- **KAIJU 7 s with HUD seconds:** the HUD shows "KAIJU 7s!" and the count goes down. Good.
- **Round start shield:** I did not notice it. A round-1 Giant Hand still removed me at belly 65 on the first Free Play match, but the hint "The giant hand goes for whoever has the fullest belly" was shown.
- **Gauntlet / weekly / boss waves:** the Challenges card shows the "🗓 This week" and "boss waves +30" text. I did not play a Gauntlet wave.
- **Trials:** the list is clear, with 8 fixed trials and star rules. I lost Bare Knuckles with 0 KOs (hard for the first try).
- **Story "📜 Meanwhile…":** present on the clear card and charming. The tip is on the chapter card, and "Chapters 1/12" is correct.
- **Records ▸ GOALS:** the best addition of the round for an achiever. Missing: ETAs and 📌 on collections (see the checklist).
- **Party:** setup shows "⏱ ≈ 2 min". Team Feast showed a live "RED 0 – 0 BLUE" score. The results do not show crumbs eaten or spoon seconds per player, only the bottom strip. A Phones-as-Pads room with bots only was not tested.
- **Help:** BASICS is now picture cards (readable) and the new EXTRAS tab lists power-ups, hazards and twists. Good.
- **Settings:** fine. I did not test Kid Mode or phone.
- **Workshop:** not visited.

## Bugs that block play
- None. `/errors` was "none" throughout. The Pantry banner overlap (issue 1) and the autoplay slowness (issue 2) are the worst.
