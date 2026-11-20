# Playtest evaluation — The Story Fan (profile 3, "story"), round 11

**Fun score: 7.5 / 10** (the story presentation is charming and the new "Meanwhile" lines land, but chapters 2, 4, 5 and 6 spike hard for a player who just cleared "easy" chapter 1, the Story Log ignores the new mystery, and there is no real narrative payoff or throughline yet in the first 6 chapters)

> Port 7103, screenshots in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r11-7103\` (shot-1 … shot-32). About 125 harness commands. JS errors checked at start, middle and end: `none` every time.

## What I did
- Title screen (shot-1), STORY map (shot-4), OPENING cutscene (shot-2; typewriter text mid-sentence).
- Played The Grand Feast chapters 1 to 6 in order (plus a replay of 4 and replays of 2, 5, 6 after defeats).
  - Ch1 The First Course: won 2-0 by hand (attack cmd), 3 stars.
  - Ch2 Dinner for Four: lost 3 times (2 by hand, 1 by auto:normal), cleared on the 4th try with auto:hard, 2 stars.
  - Ch3 Leftovers: cleared 3 stars first try (auto:hard).
  - Ch4 Boss of the Belt (Norigon): lost the first attempt (round 3), cleared on attempt 2, 2 stars; replayed for 3 stars.
  - Ch5 Party Crashers: first to 3. Lost once, cleared 3 stars on attempt 2.
  - Ch6 On the Chopping Block: first to 3. Lost twice, cleared on attempt 3; "Freezer Shelf" table unlocked. Chapter 7 now open.
- Read: pre-match chef dialogue (every chapter), boss intro cutscene (shot-20), "Meanwhile…" cutscene after the boss (shot-23), chapter-clear cards (shots 15-19, 27), defeat cards (shots 10, 32), 📜 STORY LOG (shot-25), 🎁 REWARDS (shot-26), the new-kaiju / new-table popups (shots 16, 18, 24).
- One accidental Free Play match (my `/autoplay` after a RETRY click that landed on the map started Free Play); used it to read the 4-player results screen (shot-11) and the pause menu / QUIT confirm.
- Roughly 25 matches' worth of rounds, ~35 minutes of game time; 125 commands. I did NOT reach Second Helpings (locked until ch6; it opens now but I ran out of budget), Dessert, or Spicy chapters.

## What worked for me
- The cast is charming: every chapter opens with a rival speaking to you in a big portrait card ("Four cups, two of us, one of you. Do the maths!", "Hot, cheesy, and FAST. Try to keep up!"), and every clear ends with a rival's sign-off line ("Ink-credible… We'll be back. Probably wobblier.").
- 📜 "Meanwhile…" lines are a genuinely good addition. The mystery thread (a "newcomer is clearing tables" whisper, a single dumpling crumb left on every cleared table, an unsigned note "Impressive. Keep going." from the steamer) made me want to see chapter 7 (shot-17, shot-19, shot-27).
- The boss chapter is a real event: a full-screen cutscene ("Norigon runs this joint."), a "👑 BOSS: NORIGON" banner, "PHASE 2: FURIOUS!" on the HUD, and a second "MEANWHILE, ON THE CONVEYOR BELT…" cutscene afterwards where Norigon is dizzy and the crown rolls on the floor (shot-20, shot-22, shot-23). Best moment of the session.
- The chapter card now holds the tip, and the chef does not repeat it. "Chapters N/12 · N% of everything · ★ · 🌶️ · 🎁" progress line reads clearly.
- Defeat card is helpful: "🔎 What beat you: Thrown cutlery got you. DASH sideways…" teaches (shots 10, 32). RETRY is focused by default.
- 🎁 REWARDS grid (shot-26) is excellent: each reward names its exact condition and my progress ("Win 5 matches in any mode (you have 4/5)", "Beat Story chapter 8: The Big Melt (4/8 cleared)"). Silhouettes of mystery kaiju are a strong hook.
- Match receipt now lists everything earned in a match: tokens, mastery, achievement "🏆 First Bite +30 🪙", "🎨 Lime colour!", "🎁 NEW KAIJU: Chocomunch (Gallery)", "🍽 Clear Story chapter 1 ✓ +25 🪙" (shot-7). That fix works.
- New-kaiju and new-table popups ("🎉 NEW KAIJU! SLOBA — Pearl Spill…") feel like real rewards.
- Fast-forward banner "⏩ FAST FORWARD ×3 · only bots left" and the live "KAIJU 5s!" countdown on the HUD are good readable feedback.
- Round-1 shield and the 1.4 s intro gave me a fair start every time.

## 🧾 Exactly what would make this a 9/10 for me
1. **Flatten the ch2 to ch6 difficulty spike.** What: chapters labelled "easy" must be winnable by a first-time Story player. Where: Ch2 Dinner for Four (2 "easy" bots, free-for-all, first to 2), Ch5 and Ch6 (first to 3, labelled "normal"). How: in ch2 make the easy bots not go KAIJU before ~25 s and not chain cutlery on a player who just spawned; keep "first to 3" for ch5 and ch6 but start those chapters at one bot "easy" + one "normal", or make a bot KO'd by a rival's KAIJU count as a bot loss so the player is not always the one flattened. Target: a median player clears ch1-3 first try, ch4 in 2 tries, ch5-6 in 2 tries. I lost ch2 three times in a row to "easy" rivals, ch5 once and ch6 twice. +0.6
2. **Make the story thread visible in the Story Log.** What: add the "📜 Meanwhile…" line to each chapter entry of 📜 STORY LOG, and a "mystery tracker" header ("Clues found: 3/12"). Where: Story map ▸ STORY LOG (shot-25 currently shows only "you beat X & Y. X: '…'"). How: one extra line per chapter in a lighter colour; a pinned "Who left the dumpling crumbs?" line that fills in. +0.5
3. **Give a real payoff to the mystery.** What: after chapter 6 (the 50% mark) show a story beat that connects the crumb / unsigned note / "newcomer clearing tables" lines (e.g. a silhouetted figure at the end of the Chopping Block clear card). Where: ch6 clear and ch9 clear. How: a 5-second cutscene card with the silhouette plus one line. Without a payoff by the midpoint the "Meanwhile" lines read as flavour only. +0.4
4. **Chef-dialogue variety per chapter, per outcome.** What: the rival sign-off line should not be reused across chapters or mashed with another rival's line. Where: clear card after REPLAY. How: bug in shot-27 (see issues) must be fixed; add a "second time you beat me" line variant. +0.3
5. **Make the clear/defeat card show stars needed and what a 3rd star requires.** What: "★★ lost one round — replay for ★★★" button hint. Where: Chapter clear card (shot-17 shows ★★☆ with no hint). How: a one-line grey hint under the stars: "Win without losing a round for ★★★". +0.2
6. **Defeat card wording matches the situation.** What: "So close! You took a round off them." was shown on both a 2-1 loss and a 2-3 loss, and also after a loss in which I took no round. Where: Defeat card. How: pick the line from the real score (0 rounds → "They had your number…", 1 less than target → "So close!"). Remove the stale tip repeat or make it new text. +0.2
7. **Overlay bleed-through.** What: the NEW KAIJU / NEW TABLE popup is semi-transparent, so the card text behind shows through under the portrait name (shot-16, shot-18). Make the backdrop opaque (alpha 0.96+) or blur it. +0.2
8. **RETRY / PLAY reliability.** What: clicking RETRY at (535,608) sometimes returned to the map instead of restarting (twice), and other times restarted correctly. Where: Defeat card. How: RETRY must always start the same chapter's pre-match with the chosen kaiju, and not hide behind the card's 2-second fade (the card seemed to accept clicks before it was ready). +0.2
9. **Show the boss reward on the receipt.** The brief says boss waves pay +30 🪙; I could not see "+30 🪙 boss bonus" anywhere on the ch4 clear card (shot-27 shows only "+141 Chef Tokens (645)" total). Itemise it. +0.1
10. **Readable "Meanwhile" line.** It is the same small size and colour as the rest of the three-line footer on the clear card (shot-17, shot-19, shot-27). Give it its own row, 16 px minimum, in a distinct colour so it reads as the story beat. +0.1

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Story ch2 "Dinner for Four" | Two "easy" rivals beat me three times in a row (round 3 deciders). Rivals go KAIJU around 15-20 s and squash the player; the tip "Eat crumbs to fill your belly" only appears in ch3, one chapter AFTER the first KAIJU threat | shot-9, shot-12 | Move the KAIJU tip to ch2, delay easy-bot stomps, or make ch2 a 1v1 |
| 2 | major | Story ch5 / ch6 | First to 3 with "normal" rivals: I lost ch5 once (2-3) and ch6 twice. Matches are 4-6 rounds, ~2 min. Big jump from ch4 (first to 2) | shot-32 | Keep "first to 2" until ch6, or add a mid-chapter checkpoint (carry the round score on retry) |
| 3 | major | Chapter map ▸ Story Log | The 📜 STORY LOG omits every "Meanwhile…" line, which is the new mystery thread. The log only repeats clear-card sign-offs | shot-25 | Add the line to each chapter entry |
| 4 | minor | Chapter clear card (replay) | On replay of ch4 the rival line is "Norigon: “…Impossible. Take your win. The feast is only getting hotter. …Not even ONE round for me?!”" — Mothball's 3-star line is appended to Norigon's line | shot-27 | The 3-star suffix should be a general "…Not even ONE round for me?!" attached to the rival's own line only once and not stacked, or use per-rival variants |
| 5 | minor | Defeat card | "So close! You took a round off them." shown on a loss where I had won 2 of 5 rounds in a first-to-3, and a loss where I won 1. Text does not match the result | shot-10, shot-32 | Pick wording from the actual round score |
| 6 | minor | Defeat card | Large empty gap between "DEFEATED" and "So close!" (about 130 px) while the body text is crowded into the bottom half; the quoted tip is a repeat of the chapter-card tip the brief said was moved | shot-10, shot-32 | Tighten layout; either drop the quote or put a new tip |
| 7 | minor | New Kaiju / New Table popup | Backdrop is translucent; the text of the card behind ("Squidgeon…be back. Probably wobbl…", "Chapter 4 unlocked…", "SMOOTHIE BAR" colliding with "Meanwhile, someone has…") shows through the popup | shot-16, shot-18 | Opaque backdrop |
| 8 | minor | Defeat card | RETRY at (535,608) sometimes returns to the Story map (twice, then it started the match on the third click) so a quick tap seems ignored | shot-32 | Make the card accept RETRY only after fade-in, or make RETRY always start the match |
| 9 | minor | Chapter clear card | Receipt on the card (+141 Chef Tokens, Mastery) does not itemise the boss +30 🪙 the brief says exists; also no list of achievements earned in the chapter beyond a single "🏆 Leftovers Cleared!" line | shot-27, shot-19 | Itemise like the in-match receipt (shot-7) |
| 10 | minor | Chapter clear card | "Meanwhile…" line is same size and weight as the other footer lines; on small/phone widths it wraps to two lines "…Odd." | shot-19 | Dedicated row, distinct colour |
| 11 | minor | Boss intro in-match banner | "👑 BOSS: NORIGON" banner is drawn on top of the table's soy-sauce dish and a crumb, so the "O" and "R" overlap objects. Readable but busy | shot-21 | Add a dark strip behind it |
| 12 | minor | Cutscene text | Typewriter text is slow and cut-off mid-sentence in a still ("ONE TABLE. ONE GOLDEN SPOON. D" / "NORIGON RUNS T"); no "click to finish line" hint, and only SKIP ▶▶ top right | shot-2, shot-20 | Show a "SPACE: next" hint; first press completes the line |
| 13 | minor | Story map | After a clear, pressing Enter on the map opens the next chapter's chef dialogue; Enter then S then Enter pattern is needed to start (dialog, skip chat, match). Three different keys to start a chapter is confusing | shot-4 | One press starts, S skips dialogue |
| 14 | minor | Story map | Clicking PLAY with a previously cleared chapter selected silently replays it (I replayed ch4 for 3 stars by accident) with no warning | shot-27 | Always select the first uncleared chapter after a clear |
| 15 | polish | Story map | "Second Helpings" and "Dessert" lock labels are two tiny lines (about 10 px) at the top; the lock text "clear chapter 6 to open" is hard to read | shot-4 | 12+ px or tooltips |
| 16 | polish | Story map | Chapter thumbnails are grey placeholder bars (a white bar on a wood strip for ch1-3) rather than scene art | shot-4 | Add small scene images or the rival portrait |
| 17 | polish | Match, Chapter Clear overlay | "CHAPTER CLEAR!" in-match banner overlaps the table while the receipt panel and the SHARE button crowd the bottom-left; the receipt covers the Smoothie-corner mat | shot-7, shot-15 | Move the receipt up/right or fade the banner |
| 18 | polish | Free Play results (accidental) | "Mastery Lv 1 Rookie · 29/60 XP" after story showed "Lv 4 Head Chef": mastery is per-kaiju but the label doesn't say which kaiju | shot-11 | Prefix with the kaiju name |
| 19 | polish | In-match HUD | When a rival is KAIJU the top strip shows "KAIJU 3s!" in small text; easy to miss in the middle of a fight | shot-29 | Add a ring timer on the rival |
| 20 | polish | Chapter card (map) | Rival lines at "easy"/"normal" are tiny (about 11 px) under the portraits and the difficulty wording clips with the SPICY button below at 1280×720 when the dialog overlay is open | shot-8 | Raise to 13 px |
| 21 | polish | Gameplay, harness | `STOLEN!` marker with a mini kaiju sits on the bottom-right mat and the "REVENGE IS SWEET! BELLY FULL! PRESS E / Y → KAIJU" text sits next to it, so the two overlap the table corner | shot-13 | Offset the prompt |
| 22 | polish | Reward grid | "??? (mystery kaiju)" silhouettes are nearly black on dark brown; the hint of shape is lost on dim monitors | shot-26 | Lift silhouette brightness |

## 🔠 Text and layout check
- **Title** (shot-1): OK. "NEXT UP" box text is small (~13 px) but not clipped; long "FIRST SERVICE 0/6" line fits.
- **Story map** (shot-4, shot-8): chapter-card text fine; lock lines on SECOND HELPINGS / DESSERT very small (issue 15); chapter thumbnails are placeholders (issue 16). The SPICY button clips behind the dialogue overlay while open, which is expected.
- **Pre-match dialogue** (shot-4, shot-8): OK; portrait overlaps the map behind but nothing clipped.
- **Opening / boss / Meanwhile cutscenes** (shot-2, shot-20, shot-23): OK; caption legible, partial typewriter text only mid-animation.
- **In-match HUD / banners** (shot-13, shot-21, shot-29, shot-31): OK. BOSS banner overlaps table props (issue 11). HUD "KAIJU 3s!" small (issue 19).
- **In-match Chapter Clear + receipt** (shot-6, shot-7, shot-15): receipt panel and SHARE button sit on top of table mats but do not overlap any text (issue 17).
- **Chapter Clear card** (shot-17, shot-19, shot-27): OK, footer lines wrap but do not clip; Meanwhile line small (issue 10).
- **New Kaiju / New Table popups** (shot-16, shot-18, shot-24): PROBLEM: text from the card behind shows through (issue 7).
- **Defeat card** (shot-10, shot-32): OK in terms of overflow; awkward vertical gap (issue 6).
- **Story Log** (shot-25): OK but a dense wall of 13 px text; no overflow.
- **Rewards** (shot-26): OK. All text fits its card; two-line conditions fit.
- **Free Play results** (shot-11): OK, receipt and 4-row ranking fit.
- **Pause menu**: OK ("⚠ Tap QUIT again to leave this match" confirm is clear).
- Not visited (budget): Records, Gallery, Pantry, Party, Challenges, Settings, Workshop, Help, Kid Mode, phone mode.

## The single biggest structural problem
The campaign's first third is not paced for a story player: chapter 1 is trivial (two rounds, one easy crab), then chapter 2 (three players, two "easy" bots, first to 2) is a free-for-all where I lost three times in a row because bots go KAIJU and squash you, and chapters 5 and 6 jump to "first to 3" with normal bots and 4-6 round matches. The difficulty label on the chapter card ("easy") does not match what the player feels. As a Story fan I want to read the next beat, and every defeat sends me back through a chef dialogue and a retry with no partial progress. The narrative reward (the "Meanwhile…" thread) is good but is hidden in a footer and not logged, so failing doesn't feel like it's going anywhere.

The second problem is the story thread has no payoff in sight. After six chapters I have a dumpling crumb on every table, an unsigned note and a whisper about a newcomer, but no connective beat. The midpoint (ch6) should show the first silhouette or clue, otherwise the mystery reads as flavour text.

## Big change proposals (2–3, most important first)
### Proposal 1: Story Assist ramp ("Sous-Chef's Help")
- **Problem it solves:** the ch2 to ch6 spike (issues 1-2) and the dead-end feeling of defeat.
- **How it would work (detailed design):**
  - Track consecutive losses per chapter. After 2 losses show a card on DEFEATED: "🍳 The Sous-Chef offers help" with a button "ACCEPT: rivals −1 level for this chapter".
  - Accepting lowers all bots one step (normal → easy, easy → "gentle": no KAIJU before 30 s), and caps the match at first-to-2.
  - A chapter cleared with help gets a "🍳 Assisted" tag next to the stars and can't give ★★★, but unlocks the next chapter and the Meanwhile line. Replaying without help still gives ★★★.
  - Retry carries over round wins after a loss in a boss chapter (checkpoint: a boss starts at round 2 of 3 if you won round 1 last time, once).
- **Example moment:** I lose ch2 twice, the card says "Want a hand? Rivals will be gentler. No ★★★ this time." I accept, win, and still read Squidgeon's sign-off and the Meanwhile line.
- **Rewards / progression hooks:** assisted clears still pay tokens at 75%; unassisted replay pays the ★★★ bonus.
- **Risks and edge cases:** achievements for "no assists" must check the flag; keep assists off in Spicy and Dessert.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 2: The Case of the Missing Dumpling (mystery tracker)
- **Problem it solves:** the "Meanwhile…" lines are great but forgotten (issues 3, 10); no payoff.
- **How it would work (detailed design):**
  - New tab on Story map: "🔎 CLUES" showing each Meanwhile line as a clue card (✓ found, ? not found), with a corkboard background, string between cards, and a silhouette that sharpens with each clue (ch3 crumb, ch4 steamer note, ch6 first glimpse, ch9 second, ch12 reveal).
  - After ch6 and ch9, a 4-second silhouette cutscene ("A shape slips out of the pantry window. It's carrying a dumpling.").
  - Reveal at ch12: the culprit is a hidden kaiju and the unlock for the mystery kaiju slot already shown as "??? Collect 30 stars" in REWARDS.
  - Clues also appear in 📜 STORY LOG.
- **Example moment:** after clearing ch6 the Clues tab pulses; I open it and see three cards and a half-lit silhouette, and I know three chapters away it pays off.
- **Rewards / progression hooks:** "Detective" achievement (all clues), a Gallery entry for the culprit.
- **Risks and edge cases:** must work if the player replays chapters out of order (clue per chapter, not per play); phone width: cards stack 2 per row.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 3: Chapter-clear card redesign
- **Problem it solves:** the clear card crams five different things into one footer (issues 4, 5, 9, 10, 14).
- **How it would work (detailed design):**
  - Top: stars + "★★ — lost 1 round. Win clean for ★★★" hint.
  - Middle: rival portrait + sign-off line (never reused across chapters; per-rival).
  - Rewards row: each earned item as a chip (🪙 +141, 🏆 Leftovers Cleared, 🎁 table, 👑 Boss +30).
  - Dedicated "📜 Meanwhile" panel with a paper texture and 16 px text.
  - Buttons: NEXT / REPLAY / MAP, with NEXT auto-selecting the first uncleared chapter.
- **Example moment:** I read one clean card instead of a four-line footer.
- **Rewards / progression hooks:** none; pure clarity.
- **Risks and edge cases:** long Kid Mode text, so test at 18 px.
- **Size:** S
- **Score impact for me:** +0.4

## How this round's new features felt
- **📖 "Meanwhile…" mystery line:** the best new addition for me. Charming and just cryptic enough. Needs its own row, a spot in the Story Log, and a payoff (proposals 2 and issue 3/10).
- **Tip on chapter card, not repeated by the chef:** works on the map card (shot-4, shot-8). The defeat card still quotes the tip again (issue 6).
- **Progress "Chapters N/12":** clear and accurate: "Chapters 4/12 · 23% of everything · ★ 10/36 · 🌶️ 0/12 · 🎁 6/13".
- **EVERY achievement and unlock on the receipt:** confirmed in shot-7 (First Bite, Lime, Chocomunch, Clear Story chapter 1). The chapter-clear card does not carry the same itemised list (issue 9).
- **KAIJU 7 s with seconds shown / shorter dizzy:** the HUD countdown ("KAIJU 3s!", "KAIJU 6s!") is readable; KAIJU still feels decisive in a 1v1 chain, and I still lost a lot of rounds to a rival's KAIJU stomp while dazed (shot-12 text: "A KAIJU flattened you").
- **1.4 s round-start shield:** I never lost a round in the first 2 s; good.
- **Boss waves hardest of their course / +30 🪙:** the Norigon fight is clearly the hardest of ch1-4 and "PHASE 2: FURIOUS!" is a great tell. I could not see the +30 on screen (issue 9).
- **Story rewards 🎁 grid:** excellent (shot-26).
- **Defeat card diagnosis:** helpful ("What beat you…").
- **Fast-forward banner when only bots are left:** good.
- Did not touch: Records ▸ GOALS, Gauntlet / Daily / Spicy, Party, Help, Phones, Kid Mode, Workshop (out of profile and budget).

## Bugs that block play
- None that block. JS errors: `none` at start, middle and end.
- Non-blocking: RETRY click sometimes lands on the Story map (issue 8); replay clear card appends another rival's catch-phrase (issue 4).
