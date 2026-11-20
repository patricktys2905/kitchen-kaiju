# Playtest evaluation — The 9-Year-Old (profile "kid", round 11)

**Fun score: 7.5 / 10** (the creatures, art, reveals and win-feel are great; too much small text, a couple of overlaps, and a surprise loss streak in Story ch 2 even in Kid Mode keep it below a 9)

## What I did
- About 118 harness commands. KID MODE switched on in Settings first (Settings screenshot: art-src/.playtest/r11-7109/shot-2.png).
- Screens visited: Title, Settings, 1-minute Practice, Free Play setup, Story map (opening cutscene, ch 1 cutscene, chef chat), Story Log, Gallery (+ Move Lab with Squidgeon), Help (BASICS, EXTRAS), Pantry (bought Toffee with two-tap confirm), Party Modes (Team Feast), Daily card + Crumb Rush Daily, Records + GOALS, Challenges + Gauntlet wave 1/2 + Pause/Quit, Table Workshop (placed 2 tomatoes + pancakes, played it).
- Matches: Practice (complete, +20), first Free Play match (won 3-1), Story ch 1 (won 2-0, 3 stars), Story ch 2 (lost once, used HELPING HAND, won with 2 stars), Team Feast 1v1 (won 3-0), Daily Crumb Rush (won, silver), Gauntlet wave 1 (cleared) + wave 2 (quit), Workshop table (1 KO). Roughly 7 wins out of 8 finished matches/chapters, 1 loss.
- /errors: "none" at start, middle and end.

## What worked for me
- The cast is hilarious. Gobzilla Jr. (strawberry lizard), Sloba (sloth on a bubble-tea straw), Squidgeon (jelly octopus with a teacup hat) all made me grin. The NEW KAIJU reveal for Sloba (shot-20.png) is the best moment in the game.
- Practice is short (8 steps), shows what to do in one line at the bottom, and pays +20 immediately. The "PRACTICE COMPLETE" card offers "FIRST MATCH vs one EASY bot" which is exactly what a kid wants.
- Kid Mode bots really are slow; I won the first match 3-1 with almost no thinking (shot-8.png).
- Defeat screen offers a green "🍀 HELPING HAND" button first (shot-18.png): I got a STOMP READY start and won the next try. This removes the frustration of losing.
- Cutscenes are charming (ch 1 Crabbage on a roast chicken, ch 2 Squidgeon juggling cutlery).
- The results screens with giant celebrating kaiju and "TEAM RED RULES THE TABLE" feel rewarding; awards like "Butterfingers: TOASTBAT (4 falls)" are funny.
- Move Lab dummy stands right next to you; Ink Cloud demo worked instantly (shot-26.png).
- Help BASICS is now five picture cards with 1-line text, much better than a wall (shot-27.png).
- Table Workshop is great for a kid: big icon tiles, tomatoes and pancakes look fun (shot-44/45/46.png).
- Pantry buy asks one item at a time with "tap again to buy for 28 🪙", and the first-visit +25 is announced.

## 🧾 Exactly what would make this a 9/10 for me
1. **What:** Make Kid Mode text really at least 18 px everywhere, and fix the places that are still tiny. **Where:** Title top-right buttons (SETTINGS/HELP/KAIJU/RECORDS/PANTRY/WORKSHOP, ~11 px), Gallery detail panel (~13 px), lock pills on Story map ("finish the Feast or Chef's Pass"), Free Play and Party pill buttons ("BOT LEVEL EASY", ~13 px), "click to join" seat labels, Records "Rank pts" line, Help CONTROLS block. **How:** in Kid Mode enforce 18 px floor, make title menu buttons icon + word at 18 px and allow two rows. **Impact:** +0.5.
2. **What:** Kid-mode Story difficulty: I still lost ch 2 (first to 2 vs 2 easy bots) because a bot went KAIJU and squashed me. **Where:** Story ch 2-6 in Kid Mode. **How:** in Kid Mode, rivals cannot go KAIJU in the first 20 s of a round, and after one lost round the next round auto-gives a STOMP-READY / shield start (like HELPING HAND but automatic). Never show DEFEATED twice in a row on the same chapter. **Impact:** +0.4.
3. **What:** Fix the overlaps on the results screen. **Where:** Match results with receipt (Daily result shot-38.png: the "THIS MATCH" receipt covers the start of "Today's medal:" line; Free Play result shot-9.png receipt covers bottom-left table). **How:** push the receipt to its own side panel or put it under the result card; keep it at most 4 lines with a "more" tap; also hide the "1 / START rematch · Esc menu" keyboard text when on-screen REMATCH / MENU buttons exist. **Impact:** +0.4.
4. **What:** Replace text walls with pictures for a kid: Help EXTRAS (shot-28.png), Records GOALS (shot-40.png), Challenges footer (shot-41.png), Story Log. **How:** each power-up / hazard / twist is an icon tile with a 4-word caption (like BASICS); GOALS uses big progress rings with 1 emoji + number and a single "next step" line per ring; Challenges footer becomes 3 icon chips (checkpoint, weekly, Chef's Pass). **Impact:** +0.4.
5. **What:** Show the "📜 Meanwhile…" mystery line. **Where:** Chapter Clear card and Story Log. I cleared ch 1 and ch 2 and saw no Meanwhile line anywhere (shot-16.png, shot-21.png, shot-22.png). **How:** show it as a 1-line comic caption under the rival quote with a small picture (e.g. the Head Chef's golden spoon glowing). **Impact:** +0.3.
6. **What:** Make cutscene captions readable and faster. **Where:** Opening and ch 1 cutscenes: caption is small, centred over the plate, typed one word at a time ("CRABBAGE IS FEEL", shot-14.png) and the Head Chef box in the Story map text typed out mid-sentence ("GOLDEN S", shot-15.png). **How:** 24 px captions on a dark strip, full sentence shown at once, tap = next, SKIP always large. **Impact:** +0.3.
7. **What:** Fix the Gallery detail panel overflow. **Where:** Gallery card for kaiju with a 2-line power description (Squidgeon, shot-24.png): "gold frame · crown · Shiny" is cut off by the panel's bottom border. **How:** reduce text or enlarge panel; move "Rewards" to a separate row of icons. **Impact:** +0.2.
8. **What:** Party Modes empty setup: 6 empty "click or THROW to join" seats and no obvious first action (shot-31.png). **How:** auto-seat the player and 1 bot per team with a big "ADD A BOT" and show "PLAY" disabled until both teams have someone, with a hint. **Impact:** +0.2.
9. **What:** Pantry toast overlap. The "FIRST SERVICE ✔ Visit the Pantry: +25" banner is drawn on top of the Peach item and the "3/5" progress number (shot-29.png). **How:** show goal toasts at the top or bottom edge of the screen, never mid-screen. **Impact:** +0.2.
10. **What:** DEFEATED card: the tip "A KAIJU flattened you!" is not a tip (shot-18.png) and the card is mostly empty. **How:** show a real hint ("Run away from the red circle!") with a tiny picture of the red ring, and put the three buttons closer to the text. **Impact:** +0.2.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Title | Top-right buttons (⚙ SETTINGS, ❓ HELP, 📖 KAIJU, 🏆 RECORDS, 🛒 PANTRY, 🛠 WORKSHOP) are ~11 px text even with Kid Mode ON | shot-3.png (title), shot-41.png | 18 px floor in Kid Mode, bigger buttons, 2 rows if needed |
| 2 | major | Story map | Kid Mode loss in ch 2 (first to 2 vs 2 easy bots) from a bot's KAIJU squash; frustrating loss streak risk | shot-18.png | Auto shield/stomp start after a lost round; no bot KAIJU in first 20 s in Kid Mode |
| 3 | major | Results (Daily) | "THIS MATCH" receipt covers the left end of "Today's medal: 🥈" line | shot-38.png | Move receipt away from result card |
| 4 | major | Gallery | Detail panel last line "…gold frame · crown · Shiny" runs past bottom border (2-line power text) | shot-24.png | Shorten/relayout panel |
| 5 | major | Gallery | Detail text ~13 px, below the 18 px Kid Mode promise | shot-23.png | Bigger text, fewer words |
| 6 | major | Story | "📜 Meanwhile…" line not shown after ch 1 or ch 2 clear, nor in Story Log | shot-16.png, shot-21.png, shot-22.png | Show on Chapter Clear card and in log |
| 7 | major | Pantry | Goal toast "🍽 FIRST SERVICE ✔ Visit the 🛒 Pantry: +25 🪙" is drawn across the middle covering Peach price and the "3/5" order number | shot-29.png | Place toasts at top edge |
| 8 | minor | Story map | Bottom hint "arrows choose · ENTER play · Q / E kaiju · Esc back" is overlapped/cut by the REWARDS button on the left ("arrows choose" clipped) | shot-13.png | Right-align hint, hide on touch/Kid Mode |
| 9 | minor | Story map | Locked pills "DESSERT / finish the Feast or Chef's Pass" text is ~10 px | shot-13.png | Bigger text or icon+lock only |
| 10 | minor | Story cutscenes | Caption is tiny and types out one word at a time ("one", "CRABBAGE IS FEEL") over the plate | shot-12.png/14.png (shot-11/14) | Full sentence, bigger, dark strip |
| 11 | minor | Story chat | Chef chat box text typed out and cut mid-word at capture ("GOLDEN S") and is 2+ lines in Kid Mode ("1-line chats" promised) | shot-15.png | Honour 1-line in Kid Mode |
| 12 | minor | Defeat card | Tip "💡 A KAIJU flattened you!" is a statement, not advice; large empty area | shot-18.png | Real tip + picture |
| 13 | minor | Chapter Clear | Text lines ("5 knockouts! The whole kitchen is talking. ✅ Chapter 3 unlocked: Leftovers. Toastbat is already sharpening the cutlery…") are long, wrap to 2 lines | shot-21.png | One line each |
| 14 | minor | Results | "1 / START rematch · Esc menu" keyboard text shown while REMATCH / MENU buttons are on screen | shot-9.png, shot-33.png | Show only on keyboard play |
| 15 | minor | Results | Receipt shows "Mastery Lv 1 Rookie · 46/60 XP" etc: plain text wall, many 🏆 lines (up to 6) | shot-38.png | Collapse to icons |
| 16 | minor | Results (Team Feast) | No crumbs eaten / spoon seconds shown (only in Crumb Rush Daily); fine, but Team Feast also has no "team score" recap besides "3 rounds · 3 KOs" | shot-33.png | Add RED–BLUE final score line |
| 17 | minor | Party Modes setup | 6 empty seats with "click or THROW to join", no default player; "Red vs Blue... RED 0 vs BLUE 0" confusing | shot-31.png | Auto-seat the player |
| 18 | minor | Free Play / Party | Setup pills ("BOT LEVEL EASY 🧸", "TABLE ALL", "FIRST TO 3") are ~13 px and info lines sit directly on the busy background art (low contrast) | shot-10.png, shot-31.png | Dark strip behind info lines, 18 px pills |
| 19 | minor | Settings | KAIJU POWERS subtitle "Each kaiju's own power in KAIJU form (off = Classic: all the same)" touches the left edge of its box | shot-2.png | Shorten text |
| 20 | minor | Help BASICS | CONTROLS block is a 4-line text wall of small text under the cards | shot-27.png | Picture of keyboard / pad, tabs per device |
| 21 | minor | Help EXTRAS | Pure text wall (power-ups, hazards, twists) with ~14 px lines | shot-28.png | Icon tiles |
| 22 | minor | Records | "Rank pts: 2 per achievement + 1 per kaiju Mastery level." starts left of the stats panel and runs outside its border | shot-39.png | Wrap inside the panel |
| 23 | minor | Records | Right-column values (Chef Rank "Line Cook", "Sous Chef · 17/24") use a different font from the numbers; looks mismatched | shot-39.png | One font |
| 24 | minor | Records GOALS | Hint lines ("next: Beat Story chapter 4…") appear under the bar but look like they belong to the next heading; some hints are tiny; text-heavy | shot-40.png | More spacing, icons |
| 25 | minor | Records GOALS | "Trial stars" hint reads "CHALLENGES → TRIALS" in caps, unlike other hints | shot-40.png | Same style, plain sentence |
| 26 | minor | Title | After the Daily is done the DAILY button wraps "Done today ✔ · 1🔥 streak" into two lines and the 🔥 touches the edge | shot-41.png | Shorter: "Done ✔ 1🔥" |
| 27 | minor | Challenges | Footer text is a dense 3-line paragraph ("Checkpoints: clear a course's boss wave once…") | shot-41.png | Icon chips |
| 28 | polish | Gauntlet wave-clear | "Next: wave 2 · 1 rival (NORMAL) · ♥♥♥" banner sits on top of coffee cups; heading "PICK A PERK FOR THE NEXT WAVE (1 / 2 / 3)" has low contrast on the wood | shot-42.png | Dark backing strip |
| 29 | polish | Gauntlet | Chef Tokens receipt appears mid-Gauntlet ("Order done: Knock out 20 rivals") covering table | shot-42.png | Delay until the run ends |
| 30 | polish | Workshop | ✏ NAME button did nothing visible via the harness (no text box seen) | shot-45.png | Show an on-screen keyboard / name picker with funny presets |
| 31 | polish | Workshop | "SLOT 1/6: My Table 1 · Sunday Roast surface · No hazard · 0/12 props" is long grey-white text at ~16 px | shot-44.png | Icons |
| 32 | polish | Practice | Bottom task bar ("PRACTICE 6/8 👉 Eat crumbs until your belly is full: walk over crumbs then: STOMP…") is long and the last "(+4 more)" is cryptic; done steps fade over the table ("✓ WALK AROUND THE TABLE" faint on wood) | shot-4.png | Shorter text, a checklist of 8 icons |
| 33 | polish | Practice | Practice step "eat crumbs" took several commands with belly not rising at times (belly stuck at 60 across a few acts); a kid may feel it is slow | n/a | Make practice crumbs spawn closer |
| 34 | polish | Match | Kid Mode match HUD names/numbers are still ~16–20 px in the top bar; "unarmed · KOs 3" is small | shot-8.png | Bigger HUD in Kid Mode |
| 35 | polish | Story map | Top-left caption "Chapters 0/12 · 1% of everything · ★ 0/36 · 🌶️ 0/12 · 🎁 1/13" is a lot of numbers for a kid | shot-13.png | Just ★ count and a progress bar |

## 🔠 Text and layout check
- Title: top-right buttons far too small for Kid Mode (shot-3.png). Main buttons OK. "NEXT UP" box text ~18 px OK.
- Settings: OK except the tight KAIJU POWERS subtitle (shot-2.png).
- Practice (in match): bottom bar OK but long; completion card OK (shot-5.png).
- Free Play setup: no overlap, small pill text, info lines low contrast (shot-10.png).
- Story map: hint bottom-right overlaps REWARDS button; tiny lock pills (shot-13.png).
- Story cutscenes / chef chat: small typed captions (shot-12/14/15).
- Chapter Clear / Defeated / New Kaiju: OK, no overlap (shot-16, 18, 20, 21).
- Story Log: OK (shot-22.png).
- Gallery: detail text small; overflow of last line on Squidgeon card (shot-23/24.png).
- Move Lab: OK (shot-26.png).
- Help BASICS: OK (shot-27.png). EXTRAS: text wall (shot-28.png).
- Pantry: toast overlaps Peach item and "3/5" (shot-29.png).
- Party Modes: OK, no overlap; empty seats (shot-31.png).
- In-match Team Feast: OK, RED–BLUE score visible at top (shot-32.png).
- Results (Free Play / Team Feast / Daily): receipt overlaps the result card on Daily (shot-38.png); OK on the others (shot-9.png, shot-33.png).
- Daily card: OK (shot-34.png).
- Records: "Rank pts" line out of panel (shot-39.png). GOALS: dense but no overlap (shot-40.png).
- Challenges: OK but dense footer (shot-41.png).
- Gauntlet wave clear: banner on cups (shot-42.png). Pause: OK (shot-43.png).
- Table Workshop: OK (shot-44/45/46.png).

## The single biggest structural problem
Kid Mode promises "bigger text, easier Story, 1-line chats" but only partly delivers: many screens (title menu buttons, Gallery, Help EXTRAS, Records GOALS, Challenges footer, results receipts) are still dense, small-text screens that a 9-year-old will skip. The game's strongest assets are pictures (kaiju, reveals, giant-kaiju results), and the weakest are walls of 12–14 px text with emoji.

The second problem is that I still lost in Story ch 2 even in Kid Mode, because bots go KAIJU and squash you. HELPING HAND fixes it after the loss, but a kid has to lose first. A gentle automatic catch-up would remove the one moment that makes a kid quit.

## Big change proposals (2–3, most important first)
### Proposal 1: Real Kid Mode UI ("Little Chef skin")
- **Problem it solves:** Text-heavy, small-text screens even in Kid Mode (issues 1, 5, 18, 20, 21, 24, 27).
- **How it would work:** When KID MODE is on, a global layout pass applies: (a) 18 px minimum, 22 px for buttons; (b) title top-bar becomes 6 big icon buttons (gear, ?, book, cup, cart, hammer) with a word underneath, in two rows of three if needed; (c) every info paragraph (Help EXTRAS, GOALS hints, Challenges footer) is replaced by icon tiles with at most 4 words; (d) results receipt becomes a row of reward icons (coin +51, trophy, colour swatch, new kaiju face) with a "see more" tap; (e) setup screens drop the grey info lines and keep only the big PLAY and 3 big pills.
- **Example moment:** I finish a match, see big confetti kaiju and a row "🪙 +51  🏆 First Bite  🎨 Lime  🎁 Chocomunch", tap the 🎁 to see Chocomunch. No reading.
- **Rewards / progression hooks:** Icon rewards animate into the Pantry coin counter.
- **Risks and edge cases:** Needs a layout audit on phone Kid Mode; localisation of captions.
- **Size:** L
- **Score impact for me:** +0.8

### Proposal 2: Automatic "Cheering Crowd" catch-up in Kid Mode
- **Problem it solves:** Loss streaks and frustration (issue 2).
- **How it would work:** In Kid Mode, if you lose a round, your next round starts with the mustard shield and a half belly; after two lost rounds in a match you get STOMP READY. Bots in Kid Mode cannot start KAIJU in the first 15 s. A crowd of tiny kaiju cheer in the corner and a speech bubble says "You've got this!". A defeat shows a real, picture-based tip (e.g. red ring + arrow "RUN!").
- **Example moment:** I get squashed in ch 2, the next round starts with a shield glowing, I win it and the chapter with 2 stars without ever seeing DEFEATED.
- **Rewards / progression hooks:** Stars are still earned by rounds lost; but "Cheered on" has no penalty to the stars so ★★★ stays honest (mark "helped" with a small heart, like Helping Hand today).
- **Risks and edge cases:** Do not give kids an easy path to 3 stars, so mark helped wins; competitive friends in Party use their own rules.
- **Size:** M
- **Score impact for me:** +0.5

### Proposal 3: Picture Story (cutscene captions and Meanwhile comic)
- **Problem it solves:** Small typed captions, missing "Meanwhile…" line (issues 6, 10, 11, 13).
- **How it would work:** Each chapter ends with a one-panel comic card: the rival's picture, a 1-line speech bubble at 28 px, and below it a "📜 Meanwhile…" strip with a silhouette of the mystery (the Head Chef's spoon, shadow of a big kaiju). Tapping the strip adds a piece to a "Mystery Board" in the Story Log (12 pieces). Cutscene captions show the whole sentence at once, 24 px on a dark strip.
- **Example moment:** After ch 2 the strip says "Meanwhile… someone is polishing the golden spoon" and a piece of the Mystery Board lights up.
- **Rewards / progression hooks:** Completing the Mystery Board at ch 12 unlocks a colour.
- **Risks and edge cases:** Art needed for 18 strips (12 + 6).
- **Size:** M
- **Score impact for me:** +0.4

## How this round's new features felt
- **TRY IT / Move Lab:** Excellent. The dummy stands right next to you and the power fires on the first try (shot-26.png). KAIJU did not run out before I used the power. Squidgeon's Ink Cloud looked great. Loved it.
- **Gallery detail panel / Shiny tag:** The panel is no longer blank and shows "✨ SHINY 300 🪙 · needs Lv 3" (shot-23.png), but it is small, and overflows at the bottom on 2-line power text (shot-24.png). The "📊 You vs it: 2–1" line is there on Squidgeon: I like seeing it, but it is tiny.
- **Receipt shows every unlock:** Yes. Free Play receipt listed tokens, Mastery, First Bite, Lime colour, new kaiju Chocomunch, and the Free Play goal. Daily receipt listed 4 trophies + a new kaiju. Great, but it is a wall of text and it overlaps on Daily.
- **Daily preview card:** Clear and short (shot-34.png). SPICY button with "HARD rivals · +40" is easy to read. Good.
- **Giant Hand warning:** The countdown tip "The giant hand goes for whoever has the fullest belly" appeared each round. OK and funny.
- **Pantry one-at-a-time buy and first-visit +25:** Works ("tap again to buy for 28 🪙") but the +25 toast covers part of the screen (shot-29.png).
- **KAIJU 7 s with seconds in HUD:** The HUD shows "KAIJU 7s!" (shot-5.png), easy to read. Short enough not to be dizzy. I like it.
- **1.4 s shield at round start:** I couldn't clearly see it in a screenshot; the swirl around the kaiju appears on the Practice screenshot only. Did not feel unfair.
- **Gauntlet:** Wave clear with perk choice 1/2/3 is nice for a kid (big cards) (shot-42.png). Quit asks to tap twice, good (shot-43.png).
- **Story chapter card tip, "Chapters N/12":** Tip is on the card ("Hold THROW to charge…") and the progress reads "Chapters 1/12" (shot-13.png). Good. **"📜 Meanwhile…":** not seen at all.
- **Records ▸ GOALS:** Clear path to 100% with PIN buttons, but dense. Mastery bar in the Gallery is a nice small touch.
- **Party:** Setup shows "⏱ ≈ 2 min", good. Daily/Crumb Rush results show crumbs eaten (136 eaten) and Team Feast shows the RED–BLUE live score (shot-32.png). Phones-as-Pads not tested.
- **Help:** BASICS picture cards are much better (shot-27.png). EXTRAS tab is useful but a text wall (shot-28.png).
- **Kid Mode:** Easy bots and 1-line cards help, but text is not yet 18 px everywhere (see issues 1, 5, 18).
- **Workshop:** Tomatoes/pancakes placed fine and played fine; 6 slots shown; ✏ NAME gave no visible result in the harness (issue 30).

## Bugs that block play
- None found. No JavaScript errors (/errors returned "none" at start, middle and end). The only oddities: ✏ NAME in the Workshop showed no prompt in the harness (may be a harness limit), and Practice crumb eating sometimes stalled at belly 60 for a few seconds (shot-4.png context).
