# Playtest evaluation: The Collector

**Fun score: 7.0 / 10** (the unlock chase is charming and the reveal moments are lovely, but the Gallery detail panel goes blank, counts disagree, half the collection is a grind of random-bot autoplay wins, and the Shiny/colour goals are opaque)

> Round 10, server http://localhost:7105, screenshots in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r10-7105\`.

## What I did
About 110 harness commands, ~46 screenshots (all opened with Read).
- Title, Gallery (6 visits: locked kaiju, locked colours, Move Lab button, Shiny button), Pantry (bought Toffee, Lilac, Peach, Blueberry; Silverware showed OWNED), Records (both pages, pinned Regular Diner), Story map and Rewards panel, Challenges modal (Chef's Pass line), Daily, Free Play, Party Modes (Team Feast, Hot Dumpling), Table Workshop (opened by accident, then explored).
- Matches: 1 manual-ish Free Play, about 17 autoplay matches (Free Play hard bots, Team Feast, Hot Dumpling, Daily), Story ch 1 (3 stars) and ch 2 (2 stars) played via /act.
- Result: kaiju 12/20 to 16/20, colours 2/21 to 10/21, collection 46% to 68%, Chocomunch, Bubblegumbo, Sloba, Avocadrake, Fondue Night unlocked, Table Maker and several other achievements, 9/37 achievements.
- /errors: none at start, middle, end.

## What worked for me
- **"NEW KAIJU!" reveal** (shot-29): full-screen spotlight with the power description and "Playable now in Free Play, Party Modes and Online". It is exactly the payoff a collector wants.
- **Locked entries tell you how to earn them.** Gallery silhouettes say "Unlock: Win 5 matches (you have 0/5)", locked colours say `🔒 Ocean: "Regular Diner": Win 10 matches (0/10)`, Silverware says "buy it in the PANTRY for 400". Clear, specific, with progress.
- **Records pin (new feature)**: pinning Regular Diner changed the footer to `📌 Pinned: Regular Diner (30%)`, and after matches the results card showed "Regular Diner: 6/10". It follows the pin as promised.
- **Story Rewards panel** (shot-32): one grid showing every kaiju and table the Story gives, with "(2/12 cleared)" counters.
- **Pantry**: tap-twice-to-buy is safe and fast. Weekly orders pay out visibly (40 each, green "paid" state).
- **Gallery header coin balance (new feature)**: `Collection 68% · 🪙 91` and `🐉 16/20 · 🍽 14/18 · 🎨 10/21` is a perfect at-a-glance collector line.
- Workshop prop/hazard explanations work (shot-23, shot-24).
- Daily "still open: 🥇 win without losing a round +40" is shown on the results card (shot-45).
- Story chapter clear card and the ★★★ rule line are clear.

## 🧾 Exactly what would make this a 9/10 for me
1. **Fix the blank Gallery detail panel.** What: after leaving a match or the Pantry and opening 📖 KAIJU, the Gobzilla tile is highlighted but the whole bottom panel (name, art, power, mastery) is empty, with only MOVE LAB and SHINY floating (shots 10, 11, 37). Where: Gallery on entry. How: always render the highlighted kaiju's panel on open (default to the last-used or first kaiju). Impact +0.5.
2. **Make Shiny and Mastery a visible goal.** What: the SHINY button says "300 🪙 · needs Lv 3" yet tapping it first shows "BUY SHINY? tap again: 300" and only then "needs Mastery Lv 3". Fix: grey it out up front with "Mastery Lv 3 (you are Lv 1, 51/60 XP)", and show a mastery bar in the panel. Add a collection-wide "Shinies 0/20" counter in the header. Impact +0.4.
3. **Let me aim at an unlock.** The only way I grinded was /autoplay, which gave me random kaiju seats each match. Add a "Target" pin in the Gallery for any locked kaiju/colour that shows on the title and match results ("Chocomunch: win 1 match, 0/1") exactly like the achievement pin. Also let Free Play remember "my kaiju" so Mastery XP goes where I want. Impact +0.5.
4. **Fix count disagreements.** Party Modes says "TABLE: ALL 15 … tables owned 14/18" (shot-39); Records says "Tables visited 17/18" while Gallery says 14/18 owned. Brief item 8 says counts must agree: they do not. Make "ALL N" equal owned, and label Records "visited" distinctly (e.g. "Seen 17 of 18 tables"). Impact +0.2.
5. **Fix mislabelled unlock sources.** Gallery says Chocomunch is "Win 1 match" but its panel says "🎁 Story reward" and the Story Rewards grid lists it as a Story reward "Playable now" while Story is 7% complete. Pick one source of truth per kaiju. Impact +0.2.
6. **Stop spoiling mystery kaiju.** Silhouettes (tortoise, penguin, kangaroo, owl) are recognisable in Gallery and Story Rewards; a collector loses the surprise of "NEW KAIJU!". Use a pure black-box "?" or heavy blur for locked art. Impact +0.2.
7. **Bots must not use locked kaiju.** Sloba appeared as a Free Play bot (shot after my first autoplay) while the Gallery still showed it as ??? and Story had not unlocked it. Spoils the unlock. Impact +0.2.
8. **Make colour earning discoverable at a glance.** 21 padlocks in a row all look identical (shot-4). Tap-to-learn works but the hint text is tiny (about 11 px) at the far right. Show the hint in a bigger banner under the row, add category icons (win/KO/crumb/party/pantry) to the padlocks, and show a per-colour progress ring (e.g. 3/10). Impact +0.3.
9. **Autoplay-free ways to progress party achievements.** Win Team Feast, Hot Dumpling, Golden Spoon, Crumb Rush give colours (Bubblegum, Sky, Lemon). I could not tell if autoplay in a Party mode actually counted: after PLAY, autoplay match 2 returned to a classic-looking results screen (shot-42). Show a mode label on the results card ("TEAM FEAST: RED won") and a toast naming the colour unlocked. Impact +0.3.
10. **Show colour unlock toasts and a "NEW" badge in the Gallery.** Ten colours unlocked silently; I only noticed from the counter. Add a "NEW" dot on tiles/colours and a toast "🎨 Lime unlocked: wear it in the Gallery". Impact +0.3.
11. **Pantry colour preview.** Buying "Peach colour" shows no swatch or kaiju preview, only "A soft peach style for every kaiju". Show the current kaiju wearing the colour. Impact +0.2.
12. **Grind pacing.** 17 autoplay matches got me only 9/37 achievements and 16/20 kaiju; the rest needs Story chapters 4/8/12 and 30 stars. Add a clear "path to 100%" summary (see Proposal 1) with estimated matches remaining. Impact +0.4.
13. **Fix Team Feast results.** The results list is individual ("1. TOASTBAT (YOU) 3 rounds") with no RED/BLUE team verdict (shot-40). Impact +0.2.
14. **Fix MAP / tap-to-continue flow on Story reward modals** (clicking MAP while NEW KAIJU overlay was up sent me to the title screen). Impact +0.1.
15. **Silverware double route.** Gallery says buy for 400, and the Pantry listed it, but no achievement hint; clarify duplicates. Impact +0.1.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Gallery (after returning from match/Pantry) | Bottom detail panel empty; only MOVE LAB + SHINY buttons visible, Gobzilla tile highlighted | shot-10, shot-11, shot-37 | Always draw the selected kaiju's panel on open |
| 2 | major | Gallery | SHINY button label "300 🪙 · needs Lv 3" then tap shows "BUY SHINY? tap again: 300 🪙" before saying "needs Mastery Lv 3" | shot-13, shot-14 | Disable up front with exact requirement; do not offer confirm |
| 3 | major | Party Modes | "TABLE: ALL 15 … tables owned 14/18"; Free Play earlier said "ALL 13 … owned 13/18"; Records "Tables visited 17/18" | shot-39 | Make counts consistent, rename Records stat |
| 4 | major | Free Play bots | Sloba used as a bot before being unlocked | (autoplay result lists, e.g. match 1 of round 1 results) | Bots only pick unlocked kaiju, or hide until unlocked |
| 5 | minor | Gallery | Chocomunch unlock text says "Win 1 match" but panel says "🎁 Story reward" and shows Wins: 0 after I played | shot-12 | Single source of truth |
| 6 | minor | Gallery / Story Rewards | Locked silhouettes identifiable (tortoise, penguin, kangaroo, owl) | shot-4, shot-32 | Fully black or "?" art |
| 7 | minor | Gallery colour row | Hint text for locked colour is tiny (approx 11 px) at far right: `🔒 Lime: "First Bite": Win a match (0/1)` | shot-4 | Larger banner under row; icon per padlock |
| 8 | minor | Gallery | Collection counts for colours (10/21) give no list of which colours are earned vs bought vs locked, 21 near-identical padlocks | shot-37 | Category icons and progress |
| 9 | minor | Pantry | No colour preview for Toffee/Lilac/Peach/Blueberry | shot-36 | Show swatch on current kaiju |
| 10 | minor | Pantry | Lunchbox: "A free perk on every Gauntlet run" gives no hint which perk | shot-36 | Name the perk or the range |
| 11 | minor | Story Rewards | Reward order is shuffled (unlocked entries sink to bottom, table and kaiju mixed) | shot-32 | Sort by chapter requirement, group kaiju vs tables |
| 12 | minor | Story Rewards | Card title `CHEF'S NIGHTMARE (TABLE)` touches the card's right edge | shot-32 | Shrink-to-fit or wrap |
| 13 | minor | Story reward modal | Clicking MAP while NEW KAIJU overlay was up and then tapping continue dropped me to the title instead of the map | shot-29, shot-31 | Return to Story map |
| 14 | minor | Results screen (Team Feast) | Individual list only, no RED vs BLUE team result | shot-40 | Show team standings |
| 15 | minor | Results screen (matches with duplicate kaiju) | "1. SALMONSTER (YOU) / 2. SALMONSTER" ambiguous | shot-9 | Append seat colour or number |
| 16 | minor | Results screen | Footer awards line ("Most KOs ... Crumb Monster ...") is tiny (about 11 px) | shot-9, shot-40 | Larger or two rows |
| 17 | minor | Records | "Tables visited 17/18" while only 14/18 are owned; "Matches won 3" next to "Win 3 in a row 1/3" seems fine but "Win rate 25%" after autoplay losses is demotivating | shot-15 | Clarify wording |
| 18 | minor | Workshop | Saving an empty table (0/12 props) awards "Table Maker unlocked!" instantly (free achievement) | shot-22 | Require at least 3 props |
| 19 | minor | Title Next-up box | "Finish the 1-minute Practice (+20 🪙)" stays top item even after many matches; box text small (about 13 px) | shot-1 | Allow skip or auto-complete when matches played |
| 20 | polish | Gallery | Gallery coin total jumped 0 to 25 between first visit and next with no toast (reward for first Gallery visit?) | shot-2 vs shot-5 | Toast "+25 🪙 First look!" |
| 21 | polish | Gallery | Shiny shows "300 🪙" but my 681 🪙 was useless due to Lv 3 gate, and nothing explains how to level mastery (XP shown only on panel) | shot-14 | Add "play as this kaiju for XP" hint |
| 22 | polish | Daily intro (countdown) | Light text on a bright gingham table: readable only through the outline; medals line is two lines of long text | shot-44 | Dark text plate behind the tip |
| 23 | polish | Results | Achievement toast "Crumb Muncher! +30" top right overlaps the table edge area, fine but covers the table corner | shot-8 | OK, optional |
| 24 | polish | Autoplay | Seat kaiju changes every match, so Mastery XP spreads thin | n/a | Allow locking the kaiju |
| 25 | polish | Party Modes setup | Eleven option pills in one row, each label about 12 px tall | shot-39 | Group into two rows with headers |
| 26 | polish | Title | After "◀ MODES" from Free Play, clicking the title's ◀ MODES coordinate opened Workshop (two buttons share screen position between screens) | shot-46 | Different button positions or confirm |

## 🔠 Text and layout check
- Title (shot-1): OK. NEXT UP box text small but legible.
- Gallery (shot-2, 4, 10, 12, 14, 37): grid OK; **blank detail panel** (shots 10, 11, 37); colour hint tiny (shot-4); otherwise no overlaps.
- Pantry (shot-5, 36): OK, no overflow.
- Records (shot-15, 17): OK; footer text wraps to two lines, no cut-off.
- Story map (shot-19): OK. Rewards modal (shot-32): `CHEF'S NIGHTMARE (TABLE)` touches the card edge.
- Chapter clear modal (shot-26): OK. NEW KAIJU overlay (shot-29): OK.
- Challenges modal (shot-38): OK.
- Party Modes (shot-39): OK; pills text small.
- Results screens (shot-8, 9, 40, 42, 45): THIS MATCH panel overlaps the table art (acceptable), footer stat line very small.
- Daily intro (shot-44): readable but low contrast on gingham.
- Workshop (shot-22, 46): OK.
- Settings, Online, Help, Kid Mode: not visited.

## The single biggest structural problem
There is no way to **aim** at a collection goal. Unlocks come from play volume and Story progress, but the Gallery only tells me the requirement when I tap, there is no target pin like the one achievements have, results screens do not tell me what I just got closer to for kaiju/colours, and autoplay/free play randomises my kaiju so Mastery (needed for Shinies) barely moves. A collector wants a visible "next unlock, 3 matches away" loop. Today it is a fog of 21 identical padlocks.

## Big change proposals (2–3, most important first)
### Proposal 1: Collection Tracker with Target Pin
- **Problem it solves:** collectors cannot see or aim at the next unlock; progress is silent.
- **How it would work:**
  - A "Collection" tab inside the Gallery listing every locked kaiju, colour, table, Shiny with progress bars and a source icon (Story / Win / KO / Pantry / Party / Daily).
  - Each locked row has a 📌 button; one pinned target appears on the title (replacing/alongside NEXT UP) and on the results card ("🎯 Chocomunch: 1/1 ✓ UNLOCKED" or "Avocadrake 3/5").
  - Header gets a "Path to 100%" line: "Kaiju 4 left (needs Story ch 4, 8, 12 + 30★), Colours 11 left, Shinies 20".
  - Sort filter: "Closest first".
- **Example moment:** I win a Free Play match and the results card says "🎨 Ocean 8/10: 2 wins to go" with a tiny progress bar.
- **Rewards / progression hooks:** +50 🪙 when a pinned target is completed; "Completionist" achievement at 100%.
- **Risks:** more UI to maintain; keep the existing tap-to-learn hint as fallback.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 2: Mastery & Shiny goal loop
- **Problem it solves:** Shiny (20 kaiju x 300 🪙) is the long-tail goal but the gate (Mastery Lv 3) is invisible, and autoplay scatters XP.
- **How it would work:** Gallery panel shows a mastery bar with "Lv 1 → 2 at 60 XP" and "XP per match: 12 + 8 per win"; a "Lock my kaiju" toggle in Free Play/Party seat; Shiny button states: locked (grey, exact need), affordable (glowing, banner + sparkles as in this round), owned. A "Shinies 3/20" counter in the Gallery header. A "Mastery quest" per kaiju: "Win 3 matches as Gobzilla" (+1 mastery level).
- **Example moment:** I pick Gobzilla, win twice, Level-up toast "Gobzilla Lv 3: ✨ Shiny available (300 🪙, you have 681)".
- **Rewards:** Shiny sparkle trail, gold name at Lv 4.
- **Risks:** balance of XP rates; avoid pay-to-skip.
- **Size:** M
- **Score impact for me:** +0.5

### Proposal 3: "NEW" badges and unlock toasts everywhere
- **Problem it solves:** ten colours and five kaiju/tables unlocked silently or through tiny text.
- **How it would work:** every unlock (colour, table, kaiju) fires a 3 s toast with a mini swatch, queues up on the results screen as an "UNLOCKED THIS MATCH" strip, and leaves a pulsing "NEW" dot on the Gallery button on the title and the unlocked tile until viewed.
- **Example moment:** after First Bite I see "🎨 Lime unlocked" on the result card and a dot on 📖 KAIJU.
- **Rewards:** none needed; it is feedback.
- **Risks:** toast stacking after big wins; cap at 3 with "+2 more".
- **Size:** S
- **Score impact for me:** +0.4

## How this round's new features felt
- **Gallery coin balance (6)**: good; the header line is clear and updates after purchases (🪙 91 after buying four colours). However the panel goes blank (issue 1) and the first-visit balance (0) differed from the next visit (25) without any toast.
- **Buying a Shiny banner/sparkles**: could not trigger it. The button needs Mastery Lv 3, and I reached only Lv 2 with the best kaiju. The tap-to-confirm preceding the gate message is misleading.
- **Tapping a locked colour shows how to earn it**: works (e.g. "🔒 Golden: "Clean Plate": Finish the whole Dessert Course"). Text is small and at the far right edge of the row (shot-4). Not a highlight on the swatch itself beyond a ring.
- **Records footer follows pin (7)**: works exactly as described; also the results card shows the pinned progress (shots 17, 40, 42).
- **Chef's Pass (3)**: visible in CHALLENGES with "0/12 Trial ★ or Gauntlet wave 0/8" (shot-38) and on Story Dessert/Spicy buttons; clear. Did not earn it.
- **Daily medals (11)**: on the results card, "Today's medal: 🥈 · still open: 🥇 win without losing a round +40 🪙" (shot-45). Good. The pre-match intro also lists medal payouts but in a hard-to-read overlay.
- **Workshop explanations (10)**: working for prop and hazard.
- **Table counts agree everywhere (8)**: **not true** (14/18 vs ALL 15 vs visited 17/18).
- **Party Cup, Kid Mode, Twist picker, Gauntlet ramp, KAIJU warning ring, First-timer**: not examined in depth; I saw the red ring around Salmonster in KAIJU form (shot-45) and it looked clear.

## Bugs that block play
- None block play. Highest-impact bug: blank Gallery detail panel after returning from another screen (shots 10, 11, 37), and the table count mismatch (shot-39).
