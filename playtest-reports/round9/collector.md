# Playtest evaluation — The Collector

**Fun score: 7.5 / 10** (the unlock hooks, toasts, Gallery hints and two-tap shop are charming and clear; but the collection is gated mostly behind grinding wins that a bot-seat grind can't reach, the Gallery has no coin balance or reveal for what you bought, a Story Rewards modal overflows, and there is no single "collection checklist" tying kaiju, tables, colours and Shiny together)

Screenshot folder: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r9-7105\` (files `shot-N.png`; the harness prints them relative to `art-src/.playtest/r9-7105/`).

## What I did
- About 118 harness commands, roughly 25 minutes of play. JS `/errors` checked at start, middle and end: always `none`.
- Title (shot-1): read the NEXT UP "FIRST SERVICE 0/6" card.
- Records (shot-2): 0/37 achievements, stats panel, PAGE button, "Next up: First Bite" hint.
- Gallery (shots 3, 5, 35, 37): clicked every silhouetted kaiju to read its unlock rule, clicked colour swatches, bought Gobzilla's ✨ Shiny (two taps), opened Move Lab (shots 38-39).
- Pantry (shots 6, 7, 45, 46): read weekly orders and shop, tried a refused buy, bought Toffee and Lifeline.
- 1-Minute Practice: started it, reached step 2/8 ("THROW your cutlery"), and the harness could not get past it (see issue 22). Quit through the pause menu (shot-10).
- Free Play: setup screen (shot-11), cycled every Table and every Bot level, joined seats, played 1 full match myself and autoplayed 8 more (about 9 Free Play matches in total).
- Story: opening cutscene, map (shots 18-19), Story Rewards modal (shot-20), lost ch1 twice, got 🍀 HELPING HAND, then 3-starred ch1 and ch2 by hand. Saw the NEW KAIJU popup (Sloba, shots 32-33) and the CHAPTER CLEAR panels (shots 29, 33).
- Workshop (shot-40), Settings (shot-47), Help (shot-48).
- Not visited: Online, Party Modes, Daily, Challenges (not a Collector core path; I only read their title-card text).
- Final state: about 9 Free Play matches plus 2 Story clears; 4 wins in Gobzilla's record; 15/20 kaiju, 14/18 tables, 6/21 colours, Shiny on for Gobzilla, Toffee and Lifeline owned, 209 🪙 left.

## What worked for me
- **Locked kaiju tell you exactly how to unlock them.** In the Gallery, each "???" silhouette says "Unlock: Win 5 matches in any mode (you have 0/5)" (shot-5). This is the best Collector feature in the game.
- **Colour swatch hints are great.** Each locked swatch names the achievement and live progress: "🔒 Ocean: 'Regular Diner': Win 10 matches (4/10)", "Grape: 'Forked Up': Score 25 knockouts (22/25)".
- **The 🎉 NEW KAIJU! popup for Sloba** (shot-32) is a real reward moment: big art, power name, and "Playable now in Free Play, Party Modes and Online · tap to continue".
- **Early pacing is fast.** After 3 matches I had Lime, Lava and Cherry colours, and the early kaiju unlocks arrived quickly. A new save no longer feels empty.
- **Two-tap Shiny and Pantry buys** ("✨ BUY SHINY? tap again: 300 🪙", "tap again to buy for 40 🪙") prevent accidents. Refusals say how much is missing: "need 15 more 🪙".
- **Pantry order bars turn green with "✔ ... +40 🪙 paid"** (shot-45). Payout is visible up front: "Win 5 matches · 40 🪙".
- **Mastery ladder with Lv, XP and ✔/🔒** is visible in the Gallery (shot-37), and the Shiny reward shows ✔✨ at the end of the ladder.
- **Achievement toasts** (top right "🏆 First Bite! +30 🪙") and the post-match "🧾 THIS MATCH" box list every reward and every colour unlocked (shot-14).
- **Story Rewards modal** lists every locked kaiju and table with exact conditions. This answers the question the Free Play setup leaves open ("5 more to unlock").
- **Gallery Collection %** (58% → 59%) in the top right gives a clear running total.
- **Bot-level descriptions in Free Play setup** work well ("🤖 TOUGH: good aim, shoves you near edges").
- **🍀 HELPING HAND** appears after 2 losses; the defeat box also explains "What beat you".

## 🧾 Exactly what would make this a 9/10 for me
1. **A single "COLLECTION" checklist screen with real totals and live progress, replacing the three scattered counters.**
   - **where:** a new tab or button inside the 📖 Gallery (and reachable from Records).
   - **how:** one scrolling list in four tabs: KAIJU (20), TABLES (18), COLOURS (21), SHINY (20). Every row shows a thumbnail (silhouette if locked), its unlock rule and live progress (e.g. "Win 5 matches 4/5"). A "★ Closest to unlock" strip pins the top 3 items by % complete. Collection % in the header opens this screen.
   - **score impact:** +0.6.
2. **Tables need a Gallery home: a Tables page with art, unlock hints and a visited stamp.**
   - **where:** Gallery; Free Play TABLE picker.
   - **how:** The Gallery header says "🍽 14/18" but there is no Gallery page that shows tables at all. In the Free Play TABLE picker the line "TABLE: ALL 13 · 5 more to unlock" gives no hint how. Add a 6x3 table grid in the Gallery (thumbnail, name, hazard line, 🔒 + unlock rule) and change the Free Play line to "5 locked: see Gallery ▸ Tables". Locked table names (Freezer Shelf, Candy Shop, Chef's Nightmare, Fondue Night) are only visible in the Story Rewards modal, so show them everywhere.
   - **score impact:** +0.5.
3. **Show the coin balance and a purchase confirmation inside the Gallery.**
   - **where:** Gallery (Shiny and colour buys).
   - **how:** Add "🪙 494" to the top right next to Collection %. After a Shiny buy, flash a toast "✨ Gobzilla is now SHINY! −300 🪙" and play a sparkle on the portrait. Today the button silently changes to "✨ SHINY ✔ on in matches" with no balance change visible and no visual change on the portrait (shot-37). I could not tell whether the purchase was worth it.
   - **score impact:** +0.4.
4. **Fix the Story Rewards modal overflow.**
   - **where:** Story map ▸ 🎁 REWARDS.
   - **how:** The 13-card grid is taller than the panel. The Bubblegumbo and Sloba cards run over the panel edge and the last row ("Fondue Night") is cut off at the screen bottom (shot-20). Make the grid scroll inside the panel (with a scroll hint) or reduce to 2 columns of smaller cards, and sort "Playable now" to the bottom or into a separate "✓ Collected" group.
   - **score impact:** +0.4.
5. **Make the colour-swatch row readable.**
   - **where:** Gallery "YOUR COLOUR" row.
   - **how:** 21 swatches are 34 px chips with only a 🔒 or a tiny kaiju. The only name is a small line at the far right (shot-35). Give each swatch a name under it on hover/selection near the swatch, add an "equipped" tick, and show a counter "6/21" next to the title "YOUR COLOUR". Clicking a swatch immediately equips it with no confirmation (I switched Gobzilla to Lime by accident when I meant to read the hint).
   - **score impact:** +0.3.
6. **Slow the economy a little and add long-term coin sinks.**
   - **where:** Pantry, Gallery Shiny prices.
   - **how:** I earned about 70 🪙 per match plus 30 🪙 per achievement and 80 🪙 from two orders completed in under 10 matches. The whole colour shop (1,300 🪙 total) would be done in about 20 matches, Shiny (300 each, 20 kaiju = 6,000 🪙) is the only sink. Add either tier-2 shop items (animated colours, title cards, table skins at 600-1,500 🪙) or scale Shiny price by kaiju rarity. Otherwise collectors hit "nothing to buy" quickly.
   - **score impact:** +0.3.
7. **Don't make the grind depend on winning against escalating bots; add a "next unlock" button.**
   - **where:** Title card and Gallery.
   - **how:** The NEXT UP card on the title is the best idea in the game. Make each line clickable and jump to the screen that does it ("Win a match → 🎨 Lime colour" opens Free Play with EASY preselected). On a new save, the unlock cap of "Win 5 matches" gates a kaiju even though playing the Story also gives wins; say so in the unlock text ("Story wins count").
   - **score impact:** +0.3.
8. **Make the Mastery reward ladder legible.**
   - **where:** Gallery detail panel.
   - **how:** Today the line is "Rewards: ✔✨ ✔⭐ 🔒🪙 🔒🖼 🔒👑 ✔✨" with no legend (shot-37). Replace it with a row of 6 small labelled chips: "Lv2 +30🪙", "Lv3 ✨ Shiny", "Lv4 ⭐ Star", "Lv5 🖼 Frame", "Lv6 👑 Crown". Tapping a chip shows the exact reward.
   - **score impact:** +0.3.
9. **Show new kaiju and tables the moment you earn them in Free Play and Party, not only after Story.**
   - **where:** Match end.
   - **how:** I earned kaiju 13→15 and tables 13→14 from Free Play matches but saw no 🎁 popup in my autoplay run (only the "THIS MATCH" box listed colours, e.g. "🎨 Lime colour!"). Add the same full-screen NEW KAIJU / NEW TABLE popup after the match results (queued, max one per result screen). I saw this popup only after Story ch2.
   - **score impact:** +0.3.
10. **Tell me which collectables are still locked per mode.**
    - **where:** Free Play setup line "12/20 kaiju (play & Story unlock more)".
    - **how:** Change to "15/20 kaiju · 5 locked ▸" with a tap to open the Gallery filtered to the locked ones.
    - **score impact:** +0.2.
11. **Name duplicates in results.**
    - **where:** match-end scoreboards and the top HUD.
    - **how:** I saw "BLOBLIN" twice and "HOTCHOG" twice in one match (shots 15 and later), only the table says "(YOU)". Add player numbers or colour tags to HUD names when duplicate kaiju are in a match, or forbid duplicates in autoplay/random seats.
    - **score impact:** +0.1.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Story ▸ 🎁 REWARDS modal | 13 reward cards overflow the panel: the "✓ BUBBLEGUMBO" and "??? Beat Story chapter 2" cards stick out over the panel's lower border; the last row ("Fondue Night (table)") is off the bottom of the 720 px screen and unreachable | `shot-20.png` | Scroll inside the panel, or 2-column smaller cards; test at 720 px height |
| 2 | major | Gallery | No 🪙 Chef Token balance shown, so Shiny's 300 🪙 cost cannot be judged before or after the buy | `shot-37.png` | Add "🪙 N" in header; deduct animation |
| 3 | major | Gallery ▸ ✨ SHINY | After buying, the button just changes to "✨ SHINY ✔ on in matches". No toast, no portrait sparkle; the large preview does not look different | `shot-37.png` | Toast + sparkle + "Shiny" tag on the portrait tile |
| 4 | major | Gallery / Free Play | Tables are counted ("🍽 14/18") but there is no Gallery page for tables; Free Play says "5 more to unlock" without saying how | `shot-11.png`, `shot-35.png` | Tables tab in Gallery; link from Free Play line |
| 5 | major | Match end (Free Play) | Kaiju went 13→15 and tables 13→14 over my Free Play matches but I saw no 🎁 NEW KAIJU / NEW TABLE popup in the results (only in Story clear). The brief says toasts exist; I did not see one in the post-match box | `shot-14.png`, `shot-15.png` | Show a popup or at least a "🎁 NEW KAIJU: X" line in the 🧾 THIS MATCH box |
| 6 | major | Pantry / economy | Order "Knock out 20 rivals" and "Go KAIJU 8 times" both paid within about 8 matches; the whole 1,300 🪙 colour shop can be bought in about 20 matches, so the shop runs dry | `shot-45.png`, `shot-46.png` | Add tier-2 items, rarer prices, rotating weekly shop |
| 7 | minor | Records vs Pantry | At the very start Records showed "Chef Tokens 🪙 0" while Pantry showed "SHOP · you have 🪙 25" (the 25 token practice/new save bonus is not in Records) | `shot-2.png`, `shot-6.png` | Use one source of truth for the counter |
| 8 | minor | Gallery "YOUR COLOUR" row | 21 tiny swatches (about 34 px), unnamed; the name/hint is a small 11 px line at the far right edge ("🔒 Ghost: 'Feeling Spicy': Clear a Story chapter on Spicy") that wraps to two lines | `shot-35.png` | Bigger swatches with names, hint under the row or in a tooltip |
| 9 | minor | Gallery "YOUR COLOUR" | Clicking an unlocked swatch equips it immediately with no confirm or tick, and the equipped swatch looks only slightly different from the selected one (green border vs yellow) | `shot-35.png` | Add "✔ wearing" badge under equipped swatch |
| 10 | minor | Gallery detail panel | "Rewards: ✔✨ ✔⭐ 🔒🪙 🔒🖼 🔒👑 ✔✨" is emoji-only with no legend; I could not tell which level gives what | `shot-37.png` | Labelled chips (Lv + reward) |
| 11 | minor | Gallery header | "Collection 59% 🐉 15/20 · 🍽 14/18 · 🎨 6/21" has three tiny emoji-only counters; 🎨 colours are counted per colour across all kaiju so "21" is not obvious | `shot-3.png` | Spell out "Kaiju 15/20 · Tables 14/18 · Colours 6/21" |
| 12 | minor | Gallery | Locked slot shows "Left: normal look · right: KAIJU MODE" while the silhouettes are dark, so the line is irrelevant for locked kaiju and pushes the unlock rule below it | `shot-5.png` | Hide that line while locked |
| 13 | minor | Gallery | Locked kaiju unlock rules sit at 20 px next to enormous empty art, text is OK but the "??? (LOCKED)" panel has a large dead space below; no "pin to title" action | `shot-5.png` | Add a "📌 Track this" button that pins it to the title NEXT UP card |
| 14 | minor | Story map | Rewards button shows "🎁 REWARDS 2/13" but the modal title/help says "Earn new kaiju and tables for Free Play and Online"; kaiju also unlock via Free Play wins so the count mixes both | `shot-19.png`, `shot-20.png` | Rename "STORY REWARDS" to "UNLOCKS" and mark which are Story-only |
| 15 | minor | Story REWARDS modal | Table rewards show a blank black square instead of a silhouette or art for Freezer Shelf, Candy Shop, Chef's Nightmare | `shot-20.png` | Add a table thumbnail silhouette |
| 16 | minor | Story REWARDS modal | Unlocked "✓ CHOCOMUNCH / ✓ BUBBLEGUMBO" cards are mixed in with the locked ones in the middle of the list | `shot-20.png` | Sort locked first, collected in their own group |
| 17 | minor | Pantry | After pressing a card once ("tap again to buy"), the blue focus ring stays on the Lifeline card while the first-tapped card shows a brown highlight, so two cards look "selected" | `shot-7.png` | One focus style |
| 18 | minor | Pantry card (refused) | The refusal text "need 15 more 🪙" replaces the item description and price, so you cannot see the price or what you were buying | `shot-7.png` | Keep name/price visible and show the shortfall as a third line |
| 19 | minor | Pantry | "Lifeline 🪙 245 🏷 −30% today" does not show the original price (350) or when the sale ends | `shot-6.png` | Show strike-through old price and "ends in 9h" |
| 20 | minor | Pantry | Shop cards for colours (Toffee, Lilac, Peach...) have no colour preview swatch or kaiju preview, so "Warm caramel brown" is all I know | `shot-6.png` | Add a small swatch on the card, and preview on the Gobzilla |
| 21 | minor | Records | Achievement list is paged ("PAGE ▶") with no page number shown; I cannot tell if there are 2 or 4 pages (37 achievements, 18 shown) | `shot-2.png` | Show "PAGE 1/3" |
| 22 | major | 1-Minute Practice (harness) | At "PRACTICE 2/8 THROW your cutlery: hold & let go" the step never advanced for me even with 12+ attack/shove commands, and Space did nothing. This may be a harness limitation, but it also blocks the title "FIRST SERVICE" goal for a Collector who relies on it | `shot-9.png` | Verify a plain tap of THROW completes the step; add an on-screen "hold then release" animation |
| 23 | minor | Title | NEXT UP card text is in 14 px on a semi-transparent panel over busy art; the third line "Win a match → 🎨 Lime c..." was cut by my read but is OK on screen; low contrast against the character art | `shot-1.png` | Slightly darker panel, 16 px text |
| 24 | minor | Title | The NEXT UP card lists "Finish the 1-minute Practice (+20 🪙)" first for a returning player and stays there even after I had won matches, so it keeps asking for a tutorial | `shot-1.png` | Auto-complete Practice after 3 matches or hide it |
| 25 | minor | Title | "FIRST SERVICE 1/6" ticked after I only quit practice early (I opened it, then quit at step 2/8); unclear which step counted | `shot-10.png` | Show a ✔ list of the 6 steps instead of a bare count |
| 26 | minor | Free Play setup | "12/20 kaiju (play & Story unlock more)" does not update as unlocks happen in the same session until the screen is revisited | `shot-11.png` | Re-read counters on show |
| 27 | polish | Free Play setup | Seat tiles are empty dark boxes with a grey circle and "click or THROW to join" in 14 px, a first-time Collector cannot see which kaiju they will pick (default is silently "GOBZILLA JR.") | `shot-11.png` | Show a preview of last-used kaiju on the first seat |
| 28 | minor | Free Play setup | "TABLE" button cycles through 13 tables one tap at a time, with no list; to get to the last table needs 13 taps | `shot-11.png` | Table grid picker with thumbnails |
| 29 | polish | Free Play setup | Bot-level explanation text ("🤖 NORMAL: fair aim, dodges sometimes") is 12 px grey on busy art at the bottom | `shot-11.png` | Brighter, larger |
| 30 | minor | Match end | The "🧾 THIS MATCH" box (left) is placed over the arena, covers the table's left-bottom corner; and the tips lines wrap across 5 lines and nearly touch the SHARE button | `shot-15.png` | Move box to a side panel, shorten tips |
| 31 | minor | Match end | Final scoreboard lists duplicate kaiju names ("BLOBLIN" twice, "HOTCHOG" twice), only "(YOU)" in the results table distinguishes them; the top HUD does not | `shot-15.png` | Number duplicates or give each seat a colour tag |
| 32 | minor | Match end | At EASY bot level the end-of-match tip still says "Tough bots? Set BOT LEVEL to EASY" (autoplay forced Normal, but the tip could check the setting) | `shot-15.png` | Hide tip if level is already EASY |
| 33 | polish | Match end | "RULES THE TABLE" banner for a Free Play loss reads "NORIGON RULES THE TABLE" while the match-end box says nothing about how/when I went out (the brief says it should) | `shot-15.png` | Add "You went out in round 2 (fell off, 0:42)" under the banner |
| 34 | minor | Story ch1 | On "easy" Crabbage (ch1) a bot at Easy and Normal lost 2 times in a row in my autoplay (0 KOs the second time). Good that 🍀 HELPING HAND appears, but "HELPING HAND" has no explanation of what it does until you press it (stomp is pre-ready) | `shot-26.png` | Add subtitle "starts with STOMP ready" |
| 35 | polish | Story DEFEATED box | The defeat panel has a big empty gap between the title and the first line, and the quote below repeats the tutorial line | `shot-24.png` | Tighten layout |
| 36 | polish | Story CHAPTER CLEAR | The Chef Tokens line appears for ch1 but is missing for ch2 (the 🎁 UNLOCKED: SLOBA line replaces it) | `shot-29.png`, `shot-33.png` | Keep the line on every clear |
| 37 | polish | CHAPTER CLEAR ▸ UNLOCKED | The mini Sloba picture in "🎁 UNLOCKED: SLOBA" is tiny and is crowded between two text lines | `shot-33.png` | Larger art or move beside the text |
| 38 | polish | NEW KAIJU popup | "SLOBA" name label sits over the bottom of the glowing disc, and the grey chapter-clear text behind the dimmer still shows through ("Not a single..."/"Chapter 3 unlocked") around the portrait | `shot-32.png` | Darker dim layer |
| 39 | minor | Move Lab | Esc leaves directly back to the Gallery; there is no pause menu, and the bottom hint is only a 14 px line | `shot-39.png` | Fine, but add a visible "ESC LEAVE" button |
| 40 | polish | Move Lab | The practice dummy (DUMPLORD) holds a Ladle and never moves, so I could not see my Seed Spray hit anything | `shot-39.png` | Add a moving target |
| 41 | polish | Settings | "NAME TAGS: OFF" is alone on the last row, left aligned, making the grid lopsided | `shot-47.png` | Add a 12th option or centre it |
| 42 | polish | Help ▸ BASICS | All text is small (about 13 px) and dense; the MOVES paragraph is one block of 8 lines | `shot-48.png` | Split into bullet cards |
| 43 | polish | Workshop | Surface/Hazard/Slot controls have no preview of what My Table 1 looks like in matches; the 0/12 props counter sits in a long line | `shot-40.png` | None required |
| 44 | polish | Title | "CHALLENGES: Gauntlet · 🎯 Trials 0★" and other title cards are fine, but the tiny version tag "v2026-11-19-b4df0e2" at bottom right overlaps the table art | `shot-1.png` | Dim it |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- **Title** (`shot-1.png`): OK. No overlap. NEXT UP card text is small but not cut. Version tag is tiny but fine.
- **Records** (`shot-2.png`): OK. Long "Next up" footer fits on two lines. No overlap. Page counter missing (issue 21).
- **Gallery** (`shot-3.png`, `shot-5.png`, `shot-35.png`, `shot-37.png`): OK except the swatch hint at the far right wraps to two lines and is small (issue 8). Reward ladder emoji row is small (issue 10).
- **Pantry** (`shot-6.png`, `shot-7.png`, `shot-45.png`): OK. Text fits cards. Focus ring doubles (issue 17).
- **Free Play setup** (`shot-11.png`, `shot-13.png`): OK. Seat tiles' "click or THROW to join" text is small (issue 27).
- **Practice** (`shot-8.png`, `shot-9.png`): OK. Bottom-left prompt fits in its box.
- **Pause menu** (`shot-10.png`): OK.
- **Match end screens** (`shot-14.png`, `shot-15.png`): PROBLEM. The "🧾 THIS MATCH" box overlays the left of the arena and in `shot-15.png` its tip text wraps to 5 lines and sits close to the SHARE button (issue 30). Otherwise OK.
- **Story map** (`shot-19.png`): OK. Chapter path reads clearly.
- **Story REWARDS modal** (`shot-20.png`): PROBLEM. Cards overflow the panel's bottom border and the last row is cut off at the screen bottom (issue 1).
- **Story DEFEATED / CHAPTER CLEAR** (`shot-24.png`, `shot-26.png`, `shot-29.png`, `shot-33.png`): OK. Buttons well spaced; small unlock art (issue 37).
- **NEW KAIJU popup** (`shot-32.png`): OK, minor ghosting of the panel behind (issue 38).
- **Move Lab** (`shot-39.png`): OK.
- **Table Workshop** (`shot-40.png`): OK.
- **Settings** (`shot-47.png`): OK; lopsided last row (issue 41).
- **Help** (`shot-48.png`): OK but small text (issue 42).
- Not checked: Party Modes, Online, Daily, Challenges, phone layout.

## The single biggest structural problem
The collection has **no single source of truth and no "what's next for my collection" loop.** Kaiju, tables, colours, Shiny and Mastery levels each live on a different screen (Gallery, Story REWARDS modal, Pantry, Records) and each has a different way to see progress. The best pieces (unlock hints on "???" slots, colour swatch hints, the NEXT UP card) are excellent but are never connected: tables have no Gallery page at all, the 🎁 popups only show after Story, and the economy lets you buy out the shop in about 20 matches.

For a Collector this means that after the first hour the guided path ends and I am left to cross-reference four screens to decide what to play. A single Collection screen with "Closest to unlock" and clickable NEXT UP steps, plus a bigger long-term sink for coins, would turn the existing good parts into a loop.

## Big change proposals (2–3, most important first)
### Proposal 1: The Collection Book (one screen for everything you can own)
- **Problem it solves:** Collection progress is split across Gallery, Story REWARDS, Pantry and Records; tables have no page; locked items show hints in 4 different formats.
- **How it would work (detailed design):** Rename the Gallery to "COLLECTION BOOK" with 4 tabs: KAIJU (20), TABLES (18), COLOURS (21), SHINY/MASTERY (20). Header: "Collection 59%" + "🪙 494". Each tab is a grid; each tile shows art (silhouette if locked) and a one-line unlock rule with live progress bar. Top strip "★ CLOSEST TO UNLOCK" shows 3 items sorted by % progress and each has a "GO" button: GO opens Free Play with the right setup (EASY bots, the right table), or the right Story chapter. A "📌 TRACK" toggle pins up to 3 items to the Title NEXT UP card. Tapping a tile opens the current detail panel.
- **Example moment:** I open the Book, see "Ocean colour: Win 10 matches 4/10 · Grape colour: 25 KOs 22/25 · Sloba tracked". I press GO on Grape; Free Play opens with Easy bots on a high-KO table; 3 KOs later a toast says "🎨 Grape unlocked", and the Book strip updates.
- **Rewards / progression hooks:** Completion rings per tab (e.g. "KAIJU 15/20"); first completion of each tab awards a unique title card and 100 🪙; 100% Book awards a gold frame on the profile.
- **Risks and edge cases:** Needs the table thumbnails (18 images); tracked items must survive save migration; keep the Story REWARDS modal as a link into the Book.
- **Size:** L
- **Score impact for me:** +1.0

### Proposal 2: Reveal and reward every unlock where it happens
- **Problem it solves:** I earned kaiju and tables in Free Play with no popup (issue 5), the Shiny purchase has no payoff (issue 3), and Story's popup is the only celebration.
- **How it would work (detailed design):** Add an unlock queue consumed at the match-end screen (after the results table, before REMATCH/MENU). Each unlock gets a 2-second full-screen card (reuse the NEW KAIJU card) with a button "VIEW IN BOOK". A Shiny purchase triggers the same card style with a sparkle sweep across the portrait, the coin balance counting down, and the kaiju's tile getting a permanent ✨ corner. Colours unlocked appear as a swatch chip in the card.
- **Example moment:** After my 5th win, the results screen is replaced by "🎉 NEW KAIJU! Salmonster... tap to continue", then returns to results.
- **Rewards / progression hooks:** Each unlock also increments a "Collector Rank" shown in Records (Dishwasher → Prep Cook → ...). Collection milestones (25/50/75/100%) give +50 🪙 and a banner.
- **Risks and edge cases:** Several unlocks in one match (queue max 3, then a summary card); don't block autoplay/online rematch flow; Kid Mode should keep it short.
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: Deeper coin economy for completionists
- **Problem it solves:** The whole colour shop is buyable in about 20 matches; orders complete in under 10; after that coins have only Shiny to buy (issue 6).
- **How it would work (detailed design):** Add a second Pantry shelf "🌟 SPECIAL" (unlocks at Chef Rank Sous Chef, 24 pts): animated colours (600 🪙), kaiju victory poses (500 🪙), name-card frames (400 🪙), and a rotating "Daily Special" at -30% as today. Make weekly orders scale: 3 tiers (Easy 40 🪙, Medium 80 🪙, Hard 150 🪙) with the hard tier needing something skilled (e.g. "Win a match on TOUGH without going KAIJU"). Keep Shiny at 300 but add a "Gold" tier at Mastery Lv 6 for 800 🪙.
- **Example moment:** At rank Sous Chef I open the Pantry, see a new shelf with an animated "Tapioca Glow" for Sloba at 600 🪙, and plan which orders to do this week.
- **Rewards / progression hooks:** The Chef Rank panel shows next shelf unlock; owned specials count toward Collection %.
- **Risks and edge cases:** Existing saves with many coins — grant them a catch-up banner; keep prices reachable for casual players; shop must stay offline.
- **Size:** M
- **Score impact for me:** +0.4

## How this round's new features felt
- **Fairness (1):** I saw the bot-level descriptions in Free Play setup (excellent, clear). The round-end "how you went out" line was shown in the 🧾 box ("Knocked out by: 🦖 a KAIJU x4, ⬇ fell off, 🍴 cutlery") but not as a time/round line under the banner. I did not reach Daily, so I can't judge the Daily rival levels. Story ch1 felt gentle for me playing by hand (won 2-0 with the 🍀 HELPING HAND) but my autoplay bot lost twice to Crabbage.
- **Feedback (2):** The 🏆 toast ("First Bite! +30 🪙", "Size Matters! +30 🪙") is clear and sits cleanly top right. The 🎁 NEW KAIJU popup for Sloba after ch2 is lovely. I did not see a 🎁 popup for the Free Play unlocks (issue 5). Pantry orders show payouts ("· 40 🪙", then "+40 🪙 paid"). SHINY and Pantry buys ask for a second tap, show price and the refusal "need 15 more 🪙": all work well.
- **New saves start with 4 kaiju and 2 tables locked (3):** For a Collector this feels good. Nearly everything I earned came within 10 matches (15/20 kaiju). My only complaint is that the missing 5 tables and the rest of the kaiju have no home in the Gallery for tables, and "needs 5 wins" requires wins that bots-in-my-seat do not deliver.
- **Story comic panels (4):** Not reached (needs ch4). I saw the opening cutscene (shot-18) and the ch1/ch2 rival quotes ("Not even ONE round for me?!"), which are charming.
- **Phones as pads (5):** Not visited.
- **Gallery power info and Mastery ladder (6):** Power text with "reach 207 · every 1.6 s" is good and the ladder with ✔/🔒 and ✨ Shiny is there, but the ladder is emoji-only (issue 10). Move Lab works (shot-39) but has a passive target (issue 40).
- **Fixes from last round (7):** Pause/quit confirm worked in Practice (QUIT went straight to the title for me in 1 click; I did not test the confirmation reset). Kid Mode untouched. Team Feast not visited.
- **Text and layout (8):** Two real problems found: Story REWARDS overflow (`shot-20.png`) and the 🧾 box crowding on match end (`shot-15.png`).

## Bugs that block play
- None that blocked me. `/errors` was `none` at start, middle and end.
- Possible harness/game issue (issue 22): Practice step "THROW your cutlery" stayed on 2/8 through many `attack`/`shove` commands, so I could not finish the Practice (the title "FIRST SERVICE" goal) in the harness.
