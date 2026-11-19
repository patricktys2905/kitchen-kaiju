# Playtest evaluation — The Story Fan (profile "story", port 7103)

**Fun score: 7.0 / 10** (the story framing, boss comic panel, defeat coaching and unlock toasts are charming. The result-card layout bugs, an unclear Second Helpings lock, a very long and uneven early ch3, and a bare-bones story log keep it under 9.)

> NOTE: the harness server on 7103 was restarted by mistake mid-session (about command 65). The browser save was reset, so Story progress went back to a fresh save. I replayed ch1-4 with /autoplay (hard) to reach the ch4 boss again. All "first time" observations (ch1-ch4 loss/win) come from the first run. The ch4 comic panel, ch5-6 and the Rewards/Story Log screens come from the second run.

## What I did
- Roughly 105 harness commands in total, across two saves.
- Title screen, then Story map (opening comic, chapter card, Rewards, Story Log, Scene button, Spicy and Dessert/Second Helpings locks), pause menu and quit.
- Save 1, played manually with /act:
  - ch1 won 3 stars. 2 rounds, about 1 minute.
  - ch2 won (NEW KAIJU Sloba).
  - ch3 lost once to a stack of Giant Hand KOs and two easy bots (7 rounds), then won on retry with 1 star after another very long match (about 6 rounds).
  - ch4 boss (Norigon) lost twice.
  - Server was then restarted.
- Save 2, played with /autoplay hard:
  - ch1 (first tried at "normal" and LOST to easy Crabbage with 0 KOs), ch2, ch3, ch4 boss (2 stars, comic panel seen), ch5 (lost once, then won 1 star), ch6 (2 stars, Freezer Shelf unlocked).
- Matches: about 14 total, 8 won.
- Screens checked with Read: shots 1-13 in each save (`C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r9-7103\`; the numbering restarted after the server restart, so the shot-N paths below are from save 2 unless marked "(save 1)").
- Errors: `/errors` returned "none" at start, middle and end.
- Not reached: ch7-12, Second Helpings, Dessert, Spicy (locked). I could not see the ch8 comic panel.

## What worked for me
- The opening and chapter dialogue is charming. The Golden Spoon with a bow, Crabbage's "Not even ONE round for me?!" and Squidgeon's "Do the maths!" give each rival a voice.
- The ch1 tip is delivered by the Head Chef right before the match.
- The DEFEATED card is the best teaching moment in the game. It says "What beat you: The Giant Hand got you. It grabs the fullest belly: STOMP first, or DASH just as it arrives". For the boss: "A KAIJU flattened you. Step out of the ring before each stomp". It also repeats the chapter hint.
- The ch4 boss comic panel ("MEANWHILE, ON THE CONVEYOR BELT… Norigon is on a roll. Downhill. Salmonster can't believe it…") is a big payoff. It is a full-screen comic illustration with a good caption and a SKIP button. The boss intro banner "👑 BOSS: NORIGON" and the crown above him are also good.
- NEW KAIJU and NEW TABLE splash screens feel rewarding, and the in-match toast "🎁 NEW KAIJU: Bubblegumbo!" works.
- Chapter-clear cards combine stars, a rival quote, unlocks, tokens, mastery XP and NEXT/REPLAY/MAP. "Chapter N unlocked … is already sharpening the cutlery…" is nice flavour.
- The Story Log recaps each chapter with the rival's line.
- Pause menu is clean and legible (shot-9).
- No JS errors anywhere.

## 🧾 Exactly what would make this a 9/10 for me
1. **Fix the chapter-clear card overlaps (+0.4).**
   - What and where: the Chapter Clear result card on the Story map.
   - Overlap 1: "🏆 Leftovers Cleared!" prints on top of the "Chapter 4 unlocked…" line (save 1, ch3 clear).
   - Overlap 2: the ch6 card's long "Chapter 7 unlocked…" line wraps to two lines and nearly touches the buttons (shot-12).
   - How it should behave: stack the lines with a fixed min gap of 8 px and let the card grow, or put achievements in the 🏆 toast only.
2. **Make ch3 and ch5 reliably fair, and shorten them (+0.6).**
   - What: ch3 ("gentler") took me 7 rounds, then about 6 on retry, against 2 EASY bots, first to 3. A 3-way free-for-all against two easy bots can drag to 7+ rounds.
   - Why: the Giant Hand kept KO'ing me ("YOU knocked out (hand)") while I was just collecting cutlery. Ch5 also beat me once with hard-level autoplay.
   - How it should behave: ch1-3 should be first to 2 with a 3-round cap, or award the win by points after round 5. The first "hand" of a chapter should show a warning arrow for 1.5 s. The target for a competent new player is about 90 s per easy chapter.
3. **Make the ch4 and ch8 boss fights telegraphed, and give them a PHASE 2 beat I can see (+0.5).**
   - What: Norigon goes KAIJU about 5 s into round 1 ("starts every round ready to go KAIJU") and squashes me. I lost twice in a row to "flattened by KAIJU (squash)".
   - How it should behave: a boss intro that shows the 3 safe actions (one-line cards), a floating "STOMP INCOMING" ring where the stomp lands for 0.8 s, and a visible boss belly meter so I know when it will go KAIJU. I did not see the big PHASE 2 banner in the matches I played, so it is unverified for me. Make it unmissable.
4. **Fix the Second Helpings / Dessert lock messaging (+0.3).**
   - What: after clearing ch6, the map still says "🔒 SECOND HELPINGS — clear chapter 6 to open" (shot-13). The Chapter Clear card said "Chapter 7 unlocked". It either did not unlock, or the label did not refresh, or the hint text is wrong.
   - How it should behave: either unlock at ch6, or say "Finish all 12 chapters" if that is the real rule. Add a "NEW: Second Helpings opened!" toast when it does.
5. **Fix the Story Rewards panel overflow and clipping (+0.3).**
   - What: the bottom row of cards (Bubblegumbo, Sloba) hangs past the bottom of the panel's frame, and the list has no scroll hint (shot-10).
   - How it should behave: clip the list inside the panel, with a scrollbar or "scroll for more", or paginate 8 per page.
6. **Turn the Story Log into a real story page (+0.4).**
   - What: today it is one dense 5-line paragraph of small bold text with 60% empty space (shot-11).
   - How it should behave: one card per chapter with the boss portrait, the star row, the rival quote at a larger size, and a "replay scene" button. Locked chapters show a silhouette.
7. **Put the player's kaiju in the story (+0.4).**
   - What: the ch4 comic shows only Norigon and Salmonster. Gobzilla never speaks. Between chapters I only hear the rivals.
   - How it should behave: give my kaiju one reaction line per chapter clear, and show my kaiju in at least one comic panel per boss.
8. **Add a second boss panel for the ch8 and Second Helpings ch4 bosses, and a per-chapter 1-line "what's new" on the chapter card (+0.2).** I could not test them in this session.
9. **Stop the translucent unlock splash from letting the card behind bleed through (+0.1).** "SMOOTHIE BAR" and "Sloba" text overlaps the ghosted card text behind it (save 1, shot-8). Make the backdrop fully opaque.
10. **Make the earliest difficulty consistent (+0.3).** Autoplay at "normal" lost to easy Crabbage in ch1 with 0 KOs. A bot at normal skill should not lose to the tutorial rival in the first chapter. Ch1 should be nearly unlosable.

## 🔍 Every issue I saw (exhaustive)
| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Chapter Clear card (ch3, save 1) | "🏆 Leftovers Cleared!" overlaps "✅ Chapter 4 unlocked: Boss of the Belt. Norigon is already sharpening the cutlery…" | shot-9 (save 1) | Stack with a fixed gap, or show achievements only as toasts |
| 2 | minor | Chapter Clear card (ch6) | The long "Chapter 7 unlocked… sharpening the cutlery…" wraps to 2 lines and crowds the NEXT/REPLAY/MAP buttons. The "5 knockouts!" line sits tight above it. | shot-12 | Shorten the text and add 12 px padding above the buttons |
| 3 | major | Story map header | "🔒 SECOND HELPINGS — clear chapter 6 to open" still shows after ch6 is cleared | shot-13 | Unlock at ch6, or fix the hint to the real rule |
| 4 | major | Story Rewards panel | The bottom row (Bubblegumbo/Sloba) overflows the panel border. The list extends past y=720 (look shows y up to 862) with no scroll cue. | shot-10 | Clip and scroll inside the panel, or paginate |
| 5 | minor | Story Rewards panel | The first reward card is the already-earned Minturtle and the order is odd (earned and locked mixed). | shot-10 | Sort by locked-next first, earned collapsed |
| 6 | minor | Story Rewards panel | Wording inconsistent: "Beat Story chapter 8: The Big Melt (5/8 cleared)" reads as if 5 of 8 were beaten. It is a single-chapter requirement. | shot-10 | "Clear ch 8 (you're on 5)" |
| 7 | minor | Story Rewards | The Chocomunch card says "Playable now" although I had not cleared its chapter in a way I could see (I got Bubblegumbo via "win 1" goal). The unlock source is unclear. | shot-10 | Add "unlocked by: win a match" text |
| 8 | minor | Story Log | A wall of small text, 60% of the panel empty | shot-11 | Per-chapter cards with portraits |
| 9 | polish | Story Log | The star glyphs are inline in prose ("★★★: you beat…") and the "★" (1-star ch5) is easy to miss | shot-11 | Right-aligned star column |
| 10 | major | Story ch3 | A first-to-3 match against two easy bots needed 7 rounds, then about 6 on retry | n/a | First to 2, or cap rounds |
| 11 | major | Story ch3 / ch4 | The Giant Hand KO'd me repeatedly ("YOU knocked out (hand)") and the lose card says "STOMP first, or DASH just as it arrives", but the hand's arrival is not signposted enough while I'm grabbing cutlery | shot-7 (save 1) | Warning arrow and screen-edge flash 1.5 s before the grab |
| 11b | minor | Defeat card | The DEFEATED card does not say how many rounds I won vs. needed ("So close!" appears even after a 7-round loss) | shot-7 (save 1) | "You won 2 of 3 rounds" line |
| 12 | major | Story ch4 boss | Norigon starts at about 70% belly, goes KAIJU about 5 s into round 1 and squashes me. I lost twice. | shot-10 (save 1) | Telegraph the stomp, show a boss belly meter |
| 13 | minor | Story ch4 boss | The brief says "Norigon starts every round ready to go KAIJU", but the belly bar is at about 70%, not 100%. The hint wording and actual behaviour differ. | shot-10 (save 1) | Align the wording with the numbers |
| 14 | minor | Story ch4 boss intro | The "👑 BOSS: NORIGON" banner sits over the top-edge table items (a cup/plate) in the countdown | shot-10 (save 1) | Move the banner to y≈150 |
| 15 | minor | Boss comic panel | The caption types out slowly and the first Space skips the WHOLE comic and goes straight to the New Kaiju splash, so it is hard to read the full caption without waiting | shot-5 | First Space = finish text, second Space = next |
| 16 | polish | Boss comic panel | The player's kaiju is absent from the panel | shot-5 | Add Gobzilla in a corner or a reaction line |
| 17 | polish | Boss comic panel | The caption font is bold white with an outline and sits close to the bottom edge, with limited margin | shot-5 | Add a gradient strip behind it |
| 18 | minor | Unlock splash (NEW KAIJU/TABLE) | The backdrop is not fully opaque, so the ghosted result card text bleeds through and touches the name label ("SMOOTHIE BAR" over "7 knockouts…") | shot-8 (save 1) | Fully opaque backdrop |
| 19 | minor | Chapter Clear card | The "🎁 UNLOCKED: Freezer Shelf (table)" thumbnail is a plain pale blue rectangle with no table art | shot-12 | Render a real table thumbnail |
| 20 | minor | Chapter-clear in-match overlay | The big "CHAPTER CLEAR!" appears over the match with an extra "THIS MATCH" panel and SHARE button, then a second Chapter Clear card follows. Two clear screens in a row feels redundant. | shot-2 | One clear flow |
| 21 | minor | Match-end screen | The 🏆 achievement toast is at top right and fine, but it stacks with the "NEW KAIJU" toast. The 🏆 text is also repeated inside the "THIS MATCH" panel, so one achievement shows 3 times. | shot-2, shot-3 | Show once |
| 22 | minor | Autoplay / bot level | Autoplay "normal" lost ch1 to easy Crabbage with 0 KOs ("Tough one! Every rival can be beaten") | n/a | Tune ch1 (also see the new-player tutorial) |
| 23 | polish | Chapter card | Rival names under the portraits are partly hidden by the chapter result card when it overlays the map (e.g. "…STBAT easy", "…RAPTOR normal") | shot-7 (save 1) | The overlay is the cause. Dim the map more |
| 24 | polish | Story map | The Spicy button reads "🌶️ SPICY: clear it first" before clear, then "SPICY: OFF". It is unclear why a chapter must be cleared before spicy appears. | shot-2 (save 1) | Add a tooltip line |
| 25 | polish | Defeat card | The same tip is shown twice (the "what beat you" tip, then the chapter hint in quotes) with a lot of vertical space | shot-7 (save 1) | Tighten spacing |
| 26 | polish | Chapter Clear | The result card lost its "+tokens/XP" line on the ch3 clear (it shows a table unlock, a thumbnail and the 🏆 line, but no tokens line) | shot-9 (save 1) | Always show the token/XP line |
| 27 | polish | Title screen | The "NEXT UP" box lists "FIRST SERVICE 0/6" but the text is small (about 13 px) and the box has 3 lines of tiny text | shot-1 | Bigger text, one goal at a time |
| 28 | polish | Harness / save | The server restart wiped the whole save (progress, unlocks). This is probably a harness artifact, not the game, but note: there is no cloud/export backup of a Story save. | n/a | Consider a "save code" export |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- **Title screen:** OK. Menu buttons are clear. The "NEXT UP" box has small text but no overlap (`C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r9-7103\shot-1.png`, save 1).
- **Story map (chapter 1, locked grid):** OK, nothing cut off. The right chapter panel is tidy (`shot-2.png`, save 1).
- **Opening dialogue (Head Chef):** OK. The text types out and the box is readable (`shot-3.png`, save 1).
- **Round countdown (ch1/ch5):** OK. "Round 2 · Sunday Roast" and the hint line do not overlap (`shot-4.png`, `shot-7.png`).
- **Boss countdown (ch4):** minor, the banner is close to the table items (issue 14) (`shot-10.png`, save 1).
- **Chapter Clear card (ch1):** OK, tight but readable (`shot-5.png`, save 1).
- **Chapter Clear card (ch3):** PROBLEM, text overlap (issue 1) (`shot-9.png`, save 1).
- **Chapter Clear card (ch6):** minor, a 2-line wrap near the buttons (`shot-12.png`).
- **New Kaiju / New Table splash:** minor, backdrop bleed-through (`shot-6.png`, `shot-8.png`, save 1).
- **Defeat card:** OK, a lot of space but nothing overlaps (`shot-7.png`, `shot-11.png`, save 1).
- **In-match "Chapter Clear" overlay:** OK, but busy (`shot-2.png`).
- **Boss comic panel:** OK. The caption is cut off only while typing (`shot-5.png`).
- **Pause menu:** OK (`shot-9.png`).
- **Story Rewards:** PROBLEM, cards overflow the panel (issue 4) (`shot-10.png`).
- **Story Log:** OK, but sparse and dense (`shot-11.png`).
- **Second Helpings / Dessert locks (top bar):** text fits, but the hint is wrong (`shot-13.png`).
- Everything else (Free Play, Party, Gallery, Pantry, Records, Online, phones) was not visited. I stayed in Story.

## The single biggest structural problem
**Story difficulty is uneven and the early chapters are too long for the reward.** Ch1 is trivial for a competent player, but ch3 (a three-way free-for-all, first to 3) and the ch4 boss both swung hard and felt random. The Giant Hand and a boss KAIJU stomp decide rounds, not my choices. As a story fan I want to see the next scene, so a 7-round slog against two easy bots, followed by a boss that squashes me within 5 seconds, breaks the "one more chapter" loop right at the point where the first big comic payoff is supposed to land.

The game does the coaching well after a loss (the defeat card). It needs the same clarity before the dangerous moment, so the lesson arrives before the loss instead of after. A second structural issue is that the story rewards live in separate panels (Rewards, Story Log, clear card, splash screens) that don't tell one connected story.

## Big change proposals (2–3, most important first)
### Proposal 1: Telegraphed boss fights with a visible "Boss Plan"
- **Problem it solves:** the ch4 boss squashed me twice, with the stomp arriving about 5 s in and no way to read it (shot-10 in save 1, `shot-10.png`). Also issue 12/13.
- **How it would work (detailed design):**
  - Pre-fight "BOSS PLAN" card (3 s, skippable) with 3 icons: "He stomps every 12 s", "Stand OFF the ring", "Hit him while dizzy".
  - Boss gets a visible belly meter under his name and a "STOMP IN 3…2…1" ring on the table (0.8 s).
  - After each stomp the boss is "dizzy" for 2.5 s with a glowing weak spot.
  - Phase 2 at 1 round left: a full-screen "PHASE 2" banner and a faster stomp rate (-20%).
  - Kid Mode: stomp every 20 s.
- **Example moment:** Norigon's ring flashes, I dash out, he lands, stars spin, I throw a fork and take the round.
- **Rewards / progression hooks:** "Dodged 3 stomps" achievement. A bonus star for a no-squash win.
- **Risks and edge cases:** too easy for the Hard-mode fans (make the ring 0.5 s on Hard). A mismatch between Chapter 4 and Chapter 8 patterns, so each boss needs its own plan.
- **Size:** M
- **Score impact for me:** +0.5

### Proposal 2: Story Book (merge Log, Rewards and comics into one scrapbook)
- **Problem it solves:** the Story Log (shot-11) and Rewards (shot-10) are bland or broken. Comic panels vanish after one viewing.
- **How it would work (detailed design):**
  - A "📖 STORY BOOK" button on the map opens a two-page spread.
  - Left page: chapter list with a portrait, stars and a rival quote.
  - Right page: the chapter's comic panel or opening scene, replayable.
  - Rewards appear as stickers on the chapter page: kaiju, table and colour, each with its unlock condition.
  - Locked pages show a silhouette and a one-line hint.
  - Page-turn with ◀ ▶ and the keyboard.
  - A progress ring "Story 33%" at the top.
- **Example moment:** after beating Norigon I open the Story Book, see his comic panel pinned on page 4 with his quote and the new Minturtle sticker.
- **Rewards / progression hooks:** completing a spread gives a sticker. All stickers give a "Scrapbook Complete" colour.
- **Risks and edge cases:** art cost for chapter thumbnails (reuse the comic art and a table thumbnail). Make sure scrolling and clipping work.
- **Size:** L
- **Score impact for me:** +0.6

### Proposal 3: Chapter length and fairness guard rails
- **Problem it solves:** issues 10, 11 and 22: 6-7 round slogs against easy bots and Giant Hand losses.
- **How it would work (detailed design):**
  - Chapters 1-3: first to 2, and a "sudden death" at round 4 (the Hand is removed and the table shrinks).
  - A 2.0 s "HAND INCOMING" arrow and screen-edge flash.
  - After 2 consecutive losses in the same chapter, offer "🍰 Easier helping" (a free, one-time assist: bots -1 level for this chapter, no star penalty beyond ★ cap 2).
  - The defeat card shows "Rounds won 2/3".
- **Example moment:** I lose ch3 twice, tap Easier helping, win in 3 rounds and see the Smoothie Bar splash.
- **Rewards / progression hooks:** ★★★ is still locked to the normal mode.
- **Risks and edge cases:** players may feel patronised, so keep the prompt optional. Tune so it doesn't undercut Hard-mode fans.
- **Size:** S
- **Score impact for me:** +0.4

## How this round's new features felt
- **Story ch3 gentler:** not gentle enough for me. It was still a 6-7 round match against two easy bots, and the Giant Hand dominated the KOs. I did win on the second try at 1 star.
- **Giant Hand / KAIJU can't be flicked:** I never saw this arrive "in time to dash". The defeat card tells me to DASH, which is good, but I had no signpost on the table.
- **Round-end banner says how you went out:** the defeat card does this ("What beat you: A KAIJU flattened you / The Giant Hand got you"). It's the best feature I saw. It could also say how many rounds I won.
- **Bots don't attack for 1.4 s:** I could not perceive it directly. The countdown was calm.
- **Achievement toasts (🏆):** show top right ("🏆 Leftovers Cleared! +30 🪙", "🏆 Forked Up! +30 🪙"). They are readable but duplicate the "THIS MATCH" panel text.
- **NEW KAIJU / NEW TABLE toasts and splashes:** great feeling (Sloba, Minturtle, Smoothie Bar, Bubblegumbo), apart from backdrop bleed-through (issue 18).
- **New saves start with 4 kaiju and 2 tables locked:** it felt good in Story. Sloba after ch2, Bubblegumbo and Minturtle early, Smoothie Bar after ch3, Freezer Shelf after ch6. The Rewards panel shows the rest, but its overflow bug (issue 4) hurts it.
- **Story comic panels (ch4):** seen once and I loved it. The art is strong and the caption is funny. It needs the full-caption skip fix (issue 15) and Gobzilla in the frame (issue 16). Ch8 and Second Helpings ch4 were not reached.
- **PHASE 2 banner:** not seen, so I can't judge it.
- **Kid Mode calm starts:** not tested.
- **Phones as pads, Party Cup, Gallery mastery ladder, Pantry:** not tested (Story profile).
- **Fixes from last round (quit confirmation):** pausing and quitting worked (two clicks on QUIT returned to the Story map) (`shot-9.png`).

## Bugs that block play
- None that block play outright. Possible confusion: Second Helpings still shows "clear chapter 6 to open" after ch6 is cleared (issue 3).
- The harness restart wiped the save mid-session. This was caused by the coordinator, not the game, but there is no in-game way to recover.
