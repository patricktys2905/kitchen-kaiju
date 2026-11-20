# Playtest evaluation — The Collector (profile 5, round 11)

**Fun score: 7.4 / 10** (the Gallery, Goals and Pantry make collecting clear and satisfying, but the long middle is gated behind a boss I could not beat, shinies are a 6,000-coin grind, and most locked colours never say how to get them)

## What I did
- About 105 harness commands, fresh save, no keyboard. Saved to screenshots shot-1 .. shot-43 in `art-src/.playtest/r11-7105/`. All opened with Read.
- Title -> Records (3 achievement pages) -> Records GOALS popup (twice: fresh and after progress) -> Gallery (clicked locked kaiju and a locked colour; tried every locked kaiju's requirement) -> Pantry (first visit, then bought Toffee, Lilac, Peach) -> Free Play setup (cycled all unlocked tables) -> Workshop (placed 2 cupcakes, saved) -> Story map, opening cutscene, Chapters 1 to 4 -> Gallery shiny purchase -> Daily preview card -> Challenges card -> Gallery Move Lab (Sloba) -> Practice.
- Matches: 1 autoplay loss, 3 more autoplay (all losses), 1 manual-then-auto Free Play (WIN, 3-round), Story ch1 win (2 stars), ch2 win (3 stars), ch3 win, ch4 boss lost 3 times (boss Norigon + Salmonster). 5 matches won overall (4 wins counted + 1), 4 lost. Roughly 25 minutes of game time.
- Result: Kaiju 12/20 -> 15/20, Tables 13/18 -> 15/18, Colours 2/21 -> 9/21, Shinies 0/20 -> 1/20, Achievements 0/37 -> 9/37, collection 46% -> 66%.
- `/errors` checked at start, middle and end: always "none".

## What worked for me
- **Records > GOALS is excellent.** One popup with every collection bar, a "next:" line per collection (for example "next: Beat Story chapter 4: Boss of the Belt (3/4 cleared)") and the four closest achievements with PIN. This is exactly what a collector wants (shot-3, shot-39).
- **Clicking a locked kaiju silhouette tells you how to get it** ("Unlock: Play 3 matches in any mode (you have 0/3)", "Collect 30 stars in THE GRAND FEAST (you have 0/30)"). Silhouettes are a good tease.
- **The match receipt lists every achievement and unlock** (shot-17: First Bite + Lime colour, Crumb Muncher, Size Matters + Lava colour, Rampage, NEW KAIJU: Chocomunch). This was the best moment of the session.
- The NEW KAIJU reveal for Sloba after ch2 (shot-34) is a proper celebration.
- Pantry first-visit "+25 🪙" announcement is there; the buy flow asks one item at a time ("Toffee colour? tap again to buy for 28 🪙") and coin total updates immediately (shot-18).
- Colour swatch in Gallery live-recolours the big portrait (Lime applied instantly, shot-23). Gallery has the mastery bar, 📊 "You vs it" record, Rewards (Lv 2-6) list, and a clear "needs Mastery Lv 3 first" shiny gate.
- Shiny purchase has a confirm step and a banner "SHINY GOBZILLA! It sparkles in every match now" and a ✨ SHINY tag in the panel (shot-38).
- Weekly orders in Pantry pay out and show a green "paid" card (shot-18).
- Workshop: Table Maker achievement fires on first save, props have clear icons, 6 slots.
- Chapter-clear card shows "📜 Meanwhile…" line, +tokens and mastery (shot-31).

## 🧾 Exactly what would make this a 9/10 for me
1. **Tell me how to get every locked colour, in one place.** What: the 12 locked swatches in the Gallery colour row all look identical (🔒) and I must click each one to read a 12 px line at the far right. Where: Gallery "YOUR COLOUR" row and Records > GOALS "Colours 9/21 - from achievements and the Pantry". How: (a) show a small badge on each lock (🏆 achievement / 🛒 shop / ⭐ story) and the swatch's actual colour dimmed instead of a padlock; (b) the GOALS Colours line lists the 3 closest ("Grape: Score 25 knockouts 12/25", "Ocean: Win 10 matches 4/10", "Pantry: Blueberry 180 🪙"); (c) bigger text for the hint (min 16 px, 2 lines under the row). +0.6
2. **Make the 20 shinies reachable.** Shiny = Mastery Lv 3 + 300 🪙 each = 6,000 🪙 plus about 20 x ~300 XP. I earned about 520 🪙 in roughly 9 matches, so 20 shinies is 100+ matches. How: lower to 150-200 🪙 for the first 5, or add a "Shiny shard" drop from Gauntlet/Daily so it is not only coin; show "Shiny: 1/20 (next: Bubblegumbo Lv 2/3)" on GOALS. +0.5
3. **Do not hard-block kaiju/table collection behind a boss you cannot choose to skip.** Kaiju #16 (Minturtle) and table #16 both wait on Ch 4/6; Boss Norigon beat my bot 3 times, even with 🍀 HELPING HAND. How: after 2 boss losses offer "Practice the boss" (Move-Lab style, no penalty) or an alternate route ("or win 15 matches in Free Play"), and show the unlock path in the Gallery detail of the locked kaiju (it does, good) and on the Story chapter card ("Beat this -> unlocks Minturtle + Chopping Block"). +0.5
4. **Show the shiny in the Gallery.** After buying ✨ SHINY on Gobzilla the big portrait looks identical to the non-shiny, only a small "✨ SHINY" text appears. Add visible sparkle/gold rim on the card and the portrait, and in the gallery grid thumbnail. +0.4
5. **Mastery level-up rewards must be announced.** The Defeated panel (shot-35) says "⬆ Mastery Lv 3 Sous Chef" but not what Lv 3 gave (HUD star, shiny now buyable). Say "Lv 3: ✔ HUD star · ✨ Shiny now buyable (300 🪙)". +0.3
6. **A visible 100% path for tables.** Free Play table pill says "5 more to unlock" but shows no names; locked tables should appear as greyed "???" cards with how to get them. Add a table gallery row to the Gallery (or a Tables tab) with the same silhouette treatment as kaiju. +0.4
7. **Fix the Gallery detail panel overflow** (see issues #1 and #2): the "Rewards (Lv 2-6)" line touches the bottom border and "Win 1 match in any mode (you have 1/1)" is shown on an already-unlocked kaiju. +0.2
8. **Explain the speed of collection.** On the title screen "NEXT UP" gives 3 goals; add "X% to a full collection - about N hours left" in GOALS so the collector can plan. +0.2
9. **Let autoplay/bot-in-my-seat win or at least be honest.** /autoplay never won a match for me in 4 tries (hard bot in my seat vs 3 BRUTAL bots, persisted from an earlier setting). Persisted BRUTAL bot level after I only wanted NORMAL is surprising; show "Bot level: BRUTAL" prominently on the Free Play start, and remember a separate easy level for grinding. +0.2

## 🔍 Every issue I saw (exhaustive)
| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | minor | Gallery detail (Chocomunch, Bubblegumbo) | Last "Rewards (Lv 2-6)" line "gold frame · crown · Shiny" runs to the very bottom edge of the panel (y 686, panel ends 690). Line looks cut | shot-21, shot-23 | Reduce description lines or enlarge panel by 20 px |
| 2 | minor | Gallery detail (unlocked kaiju) | Unlock hint still shown after unlocking: "🎁 Win 1 match in any mode (you have 1/1)" | shot-21 | Replace with "✔ Unlocked" |
| 3 | minor | Gallery colour row | All locked colours show the same 🔒, order meaningless until clicked; hint text at right is ~12 px, wraps ("Lime: "First Bite": Win a match (0/1)") | shot-8 | Dimmed true colour + source badge, bigger 2-line hint under the row |
| 4 | minor | Gallery SHINY button | After Lv 2, text "needs Mastery Lv 3 first" wraps to 3 cramped lines inside the button | shot-23 | Shorten to "needs Lv 3" |
| 5 | polish | Gallery shiny | Shiny portrait identical to normal; only text tag changes | shot-38 | Sparkle overlay + gold rim |
| 6 | polish | Gallery shiny banner | "SHINY GOBZILLA! It sparkles in every match now" floats on top of the kaiju grid, covering Bluebeary row names for ~2 s | shot-38 | Move to above the panel |
| 7 | minor | Pantry first visit | "FIRST SERVICE ✔ Visit the 🛒 Pantry: +25 🪙" banner sits right over the shop cards and the weekly-orders "0/5" progress, hiding it | shot-9 | Place the banner at the top under the title |
| 8 | polish | Pantry | Toffee shows "🏷 −30% today" but never shows the original price (40), so the discount feels fake | shot-9 | "~~40~~ 28 🪙" |
| 9 | polish | Pantry | Cards give no preview of the colour (only an emoji) and bought colours are not marked on the card; item vanishes? (card stays, no "owned") | shot-18 | Show swatch on a kaiju + "✔ owned" |
| 10 | minor | Records GOALS | "Colours 9/21 - from achievements and the 🛒 Pantry" lists no names; "Achievements - see the closest ones on the right" is a non-answer | shot-39 | Show next 2-3 colours/shinies per row |
| 11 | minor | Records GOALS | Shinies 1/20 line says "Mastery Lv 3 + 300 🪙 each" but not which kaiju are eligible | shot-39 | "next: Gobzilla ✔ done, Bubblegumbo Lv 2/3" |
| 12 | minor | Records | "PAGE 3/3 ▶" button label shows the current page not the action, and clicking wraps to 1 | shot-5 | "NEXT PAGE ▶" |
| 13 | polish | Records | Bottom hint "Next up: First Bite (0%) ..." ends with "Each achievement pays 30" then the coin icon on a new wrapped line (two-line text, ~12 px) | shot-2 | Shorten, make 14 px |
| 14 | major | Story ch 4 boss | Boss Norigon beat my hard bot 3 times in a row; Kaiju #16 and Table #16 sit behind it with no alternate path | shot-35 | See proposal 3 / checklist #3 |
| 15 | minor | Defeated panel | Large empty band between "DEFEATED" and the text; Mastery Lv 3 reached but reward not named | shot-35 | Tighten, name the reward |
| 16 | polish | Chapter clear panel | Chef tip, "Chapter 2 unlocked", "Meanwhile" all small (~14 px) and in the middle of the card, easy to skip | shot-31 | Bigger, bullet each |
| 17 | polish | Match results | Receipt box (bottom-left) overlaps the table's corner place mat and a cutlery pickup; with 6 entries (shot-17) it reaches 340 px tall and nearly touches REMATCH | shot-17 | Cap at 5 lines + "see all" |
| 18 | polish | Match results | Achievement shown twice: toast top-right "Size Matters! +30" and also in the receipt | shot-17 | Fine but only one at a time |
| 19 | minor | Free Play setup | Table pill cycles only through unlocked tables, no teaser for the 5 locked ones | shot-24 | Locked table cards |
| 20 | minor | Free Play setup | Bot level persisted at BRUTAL and FIRST TO 5 from an earlier match, not obvious; pill text says "BOT LEVEL BRUTAL" only | shot-24 | Reset to NORMAL on a fresh visit or flag in yellow |
| 21 | minor | Free Play | Ambiguous start: clicking seat 1 then PLAY with 1 seat selected started a 4-player match with random kaiju (Crabbage) I did not choose | shot-12 | Show your kaiju pick on the seat; "random kaiju" label |
| 22 | polish | Workshop | "Saved! 🏆 Table Maker unlocked!" does not mention +30 🪙 or any reward | shot-26 | Same reward line as match receipt |
| 23 | polish | Workshop | Hint line ("CUP: a solid medium block...") ~13 px, wraps in two lines | shot-25 | 15 px |
| 24 | minor | Workshop | ✏ NAME gave no visible response in the harness (no text box seen) | n/a | Make it an in-game text entry |
| 25 | polish | Story map | Locked chapters show only a padlock; no hint which chapter gives which kaiju/table (only the Rewards 2/13 list) | shot-28 | Small reward icon on the chapter tile |
| 26 | polish | Story opening | Subtitle word-by-word at the plate leaves a single word "on" in the middle of the screen (typewriter) | shot-27 | Show full line |
| 27 | polish | Title NEXT UP | Text too small (~13 px) inside the dark box, 3 objectives packed; "Win 10 matches -> 🎨 Ocean" line cut in look output | shot-1 | 15 px, 2 lines |
| 28 | polish | Daily card | Daily forces "You play SLOBA" (a new kaiju) with no preview of the power | shot-40 | Show the power line |
| 29 | polish | Challenges card | Bottom checkpoint line ~13 px with 3 separators (·) crammed; "boss waves: +30 🪙 and a 🤍" reads like a typo | shot-41 | Split in two lines |
| 30 | polish | Move Lab | Dummy stands at distance 36 px (right on top of you); STOMP READY shown (OK) but the hint bar says "STOMP to go KAIJU, then THROW / SWIPE" even on phone | shot-42 | Increase to 120 px |
| 31 | polish | In match | HUD "KAIJU 6s!" good, but the 4-line text with "unarmed · KOs 0" on top strip uses 12 px | shot-15 | 14 px |
| 32 | polish | Colour system | Lime applies to every kaiju, so Sloba (brown) and Gobzilla look the same green; hard to identify rivals in a match | shot-43 | Colour only your own kaiju (already so?) or add outlines |
| 33 | polish | World Tour | "Play on 12 different tables" paid after only 4 matches (12 rounds), too easy and unnoticed | shot-17 | Count unique tables only |

## 🔠 Text and layout check
- Title (shot-1): OK. NEXT UP box text small but not overlapping.
- Records pages 1-3 (shot-2, shot-4, shot-5): OK; the progress count on "Clean Sweep" row ("Win a first-to-3+ match without losing a round · 🎨 Cherry") is smaller than others and tight to the box edge (shot-5).
- Records > GOALS (shot-3, shot-39): OK, but the underlying Records page shows through at the edges of the popup (the "Matches ..." column at left and "0/10" at right) - looks messy but readable.
- Gallery (shot-6, 7, 8, 21, 23, 37, 38): detail panel bottom line cramped (issue #1); SHINY button text cramped (#4); banner covers tiles (#6). Colour hint at right small (#3).
- Pantry (shot-9, shot-18): toast overlaps shop and orders (#7); otherwise OK.
- Free Play (shot-10, shot-24): OK. A big striped table icon covers the left of the TABLE line but does not overlap text.
- Workshop (shot-25, shot-26): OK.
- Story map (shot-28): OK; chef dialogue (shot-29) OK, typed text mid-line "GOLDEN SPOO".
- Chapter clear (shot-31), Defeated (shot-35), NEW KAIJU (shot-34): OK; NEW KAIJU overlay is drawn over the faded card behind it (text still readable but ghosted lines visible behind "SLOBA" text, shot-34).
- Match results (shot-12, 17, 32): receipt overlaps board corner (issue #17), otherwise OK.
- Daily (shot-40) and Challenges (shot-41): OK.
- Move Lab (shot-42, shot-43): OK.
- Phone mode and Kid Mode not tested.

## The single biggest structural problem
Collection pacing is uneven and partly invisible. The first 14 minutes are great (3 kaiju, 7 colours and a table in 5 matches), then everything else sits behind either (a) a story boss that bot-level play cannot beat reliably, or (b) 300-coin shinies and counters of 100 to 1,000 crumbs/knockouts. There is no estimated-time-left, no list of what each remaining colour needs, and no alternate path when a gate is too hard. A collector's motivation is "I can see exactly what is next and it is reachable"; the game shows it for kaiju and tables (Goals) but not for colours, shinies or the 12 locked swatches.

## Big change proposals (2–3, most important first)
### Proposal 1: Collection Book (a "Goals" that you can walk)
- **Problem it solves:** colours are anonymous locks, shinies are a number, tables have no gallery, and I cannot see what is left for 100%.
- **How it would work (detailed design):** Add a Gallery tab strip: KAIJU | COLOURS | TABLES | SHINIES. COLOURS shows 21 big swatches, locked ones dimmed in their real colour with a source badge (🏆/🛒/⭐) and a progress line ("Grape - Score 25 knockouts 12/25"). TABLES shows 18 table thumbnails (silhouette when locked, "Beat Story ch 6 (3/6)" text). SHINIES shows 20 cards with Mastery bar and price; "BUY ✨ 300 🪙" is a button there too. Each tab header has a % and "closest: ..." line. Tap a locked item to PIN it to the title NEXT UP.
- **Example moment:** I open COLOURS, see Grape at 12/25 knockouts, pin it, and the title screen says "Grape: 13 knockouts to go".
- **Rewards / progression hooks:** 100% of a tab gives a one-time reward (e.g. 100 🪙 or a title). Pins give the bonus "+10% tokens on pinned goal progress".
- **Risks and edge cases:** Spoiler-averse players: keep silhouettes optional; tab count must not push the phone layout.
- **Size:** M
- **Score impact for me:** +0.9

### Proposal 2: Boss practice and alternate unlock routes
- **Problem it solves:** the Ch 4 boss blocked kaiju #16 and a table for me after 3 losses; no way to learn the fight or sidestep.
- **How it would work (detailed design):** After 2 losses on a boss the DEFEATED card gains a third button "🥋 PRACTICE BOSS" (Move-Lab rules: no tokens, no losing, boss starts with the same tell). Also add "or win N Free Play matches" alternates to each gated unlock (e.g. Minturtle: Ch 4 clear OR 15 match wins). The Gallery locked panel lists both lines with counters.
- **Example moment:** I lose to Norigon twice, practise against it for 90 s with the reminder "step out before the stomp", then win round 2.
- **Rewards / progression hooks:** Practice pays nothing; alternate unlock still pays achievements so nothing is lost.
- **Risks and edge cases:** Do not trivialise Story stars; alternate route only unlocks the kaiju, not story clear.
- **Size:** S-M
- **Score impact for me:** +0.5

### Proposal 3: Shiny shards
- **Problem it solves:** 20 shinies x 300 🪙 is a 100-match grind with no feedback.
- **How it would work (detailed design):** Every match gives +1 shard to the kaiju you played (+2 on a win, +3 for a 3-star story clear). Shiny unlocks at Lv 3 and 15 shards or, as before, 300 🪙. Gallery card shows a shard bar. GOALS shows "Shinies 1/20, closest: Bubblegumbo 9/15 shards".
- **Example moment:** I buy nothing but Bubblegumbo's shiny pops after my 4th match with it.
- **Rewards / progression hooks:** Playing many kaiju (the collector style) is rewarded.
- **Risks and edge cases:** Coin sink drops, so tune the shop to keep colours valuable.
- **Size:** M
- **Score impact for me:** +0.5

## How this round's new features felt
- **🎯 Records > GOALS:** The best addition for me. The collections block is clear and the 4 closest achievements with PIN are useful. Missing: colour and shiny detail (issues #10, #11). Gallery mastery bar and 📊 "You vs it" record show up (shot-21: "You vs it: 0–1").
- **Gallery detail no longer blank + ✨ Shiny tag:** works (shot-38). The shiny itself does not look different (issue #5).
- **Receipt shows every achievement and unlock:** Great (shot-17). Just crowded.
- **Pantry:** one-at-a-time buy works; first-visit +25 🪙 announced but overlaps content (#7).
- **First Pantry +25 / Pantry order payout:** worked.
- **Daily preview card:** opens, clear medals and streak; Spicy daily +40 🪙 is visible (shot-40). Did not play it.
- **Fighting changes:** KAIJU HUD "KAIJU 6s!" seconds left is clear (shot-15). 1.4 s shield not noticed in my bot-driven play. Move Lab: dummy starts adjacent (dist 36) and KAIJU works (shot-43).
- **Challenges:** card readable, checkpoint, weekly best (+25 🪙) and boss +30 🪙 + ❤ explained, small text (shot-41). Did not play Gauntlet.
- **Story:** "📜 Meanwhile…" line appears after chapter clear (shot-31), tip on the chapter card (shot-28). "Chapters N/12" reads correctly after progress (Ch 4/12 on title).
- **Workshop:** 6 slots and ✏ NAME present; cupcakes and 12-prop limit visible. NAME gave no visible reaction in the harness.
- **Help, Phones, Kid Mode, Party:** not touched.

## Bugs that block play
- None. `/errors` stayed "none". The only "stuck" feeling: Ch 4 boss gating (see issue #14), which is design, not a bug.
