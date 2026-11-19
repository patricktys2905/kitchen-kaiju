# Playtest evaluation: The Achiever (profile 1, port 7101)

**Fun score: 6.5 / 10** (the achievement list itself is clear and generous, but unlocks are silent, wins are slow to farm, several achievements hide their requirement behind a mode the harness/Party flow could not reliably start, and money/progress rewards are unannounced.)

## What I did
- About 110 harness commands, roughly 35 minutes of wall time (autoplay is ~36 s per match, so grinding is slow).
- Screens visited: Title, Records (all 3 pages, pinning), Free Play setup, Party Modes setup, Settings, Pantry (bought Toffee colour), Gallery (kaiju, colour swatches, locked kaiju, Shiny), Challenges panel, Gauntlet (3 runs, best wave 4), Pause menu with QUIT twice, Help > Practice (completed), Story map, Opening cutscene, chapter dialogue, Story Log, Chapter 1 and 2 clears.
- Matches: ~35 played (autoplay NORMAL ~20, Gauntlet waves ~12, Story 3 tries, Practice). Records ended at 35 matches / 12 wins, 9/37 achievements, Sous Chef rank, ~1170 tokens.
- Not reached: Daily, Workshop, Online, Spicy, Trials (budget spent on grinding).
- /errors: "none" at start, middle, end.

## What worked for me
- Records page is excellent for an achiever: locked cards show progress bars, 0/N counters, the colour reward, and "👉 Next up: X (68%)" at the bottom.
- Pinning works and shows on the title NEXT UP card ("📌 First Bite: Win a match (0/1)") (shot-5, shot-6).
- First Service checklist on the title and its entry in the post-match receipt ("🍽 Clear Story chapter 1 ✔ +25 🪙", shot-39) feel great.
- Locked-colour and locked-kaiju hints in the Gallery say exactly how to unlock ("Ocean: Regular Diner: Win 10 matches (3/10)", "Collect 30 stars in THE GRAND FEAST (you have 0/30)") (shot-23).
- Gauntlet perks, grade ladder ("C 350 · B 650 · A 1000 · S 1500") and checkpoints are clear (shot-26).
- Quit-twice works: pause > QUIT shows "TAP QUIT AGAIN TO REALLY END IT" (shot-29).
- Story chapter-clear panel with stars, quip, unlock line, tokens is charming (shot-43). Story Log works (shot-44).

## 🧾 Exactly what would make this a 9/10 for me
1. **Loud achievement-unlock moment.** What: toast/banner + receipt row for every achievement unlock. Where: in-match banner and every result receipt (Free Play, Party, Gauntlet, Story). How: "🏆 ACHIEVEMENT: Crumb Muncher +30 🪙 · 🎨 Lime unlocked" slides in for 3 s and is listed on the receipt with a "view" link to Records. Today I earned 9 achievements and never once saw one announced (receipt shot-9, shot-11, shot-14 show nothing; tokens just jump, e.g. 616 to 887 to 912 unexplained). +1.0
2. **Make win-based achievements farmable.** What: NORMAL autoplay bots won me only 18% of matches (3/17), so "Win 10 / 25 / 50 matches", "On a Roll (3 in a row)", "Too Hot to Handle (5 in a row)" take hours. How: add an "Achievement Tuning" difficulty (EASY bots count at x1) or show clearly on the achievement card which bot level counts; add a Records "how long will this take" hint (e.g. "~25 matches at your win rate"). +0.7
3. **Unreachable/hidden requirement fixes.** What: title NEXT UP says "Finish the 1-minute Practice (+20 🪙)" but the "NEW HERE? 1-MINUTE PRACTICE" button disappears after your first match; it is only reachable via HELP > PRACTICE tab (shot-32). How: keep a small "PRACTICE" button on the title while First Service step is incomplete, or make the NEXT UP line clickable. +0.4
4. **Per-achievement "where to do it" shortcut.** What: clicking a locked card only pins it. How: add a "GO" button (Win a Hot Dumpling match opens Party Modes with Hot Dumpling preselected; Clear Gauntlet waves opens Challenges). +0.5
5. **Party Modes keep their mode.** What: after a Party match, ESC goes to FREE PLAY and a following rematch/autoplay reverted /state mode to "classic" (Crumb Rush state was "crumbRush" for the first match only). If real, Team Feast/Hot Dumpling/Golden Spoon achievements are hard to farm. How: rematch keeps mode, ESC returns to PARTY MODES. +0.4
6. **Fix inconsistent counters.** What: Records says "Tables visited 18/18" while Free Play says "TABLE: ALL 15 · 3 more to unlock in Story"; World Tour says "12 different tables". How: count only unlocked tables (15/15 or 15/18) and say so. +0.2
7. **Show price and confirmation on Shiny and give a visible result.** What: Gallery "✨ SHINY" button shows no cost, spends 300 🪙 instantly with no confirm (802 to 502), and the preview did not visibly change (shot-22). How: "✨ SHINY 🪙300 (Lv3 ✔)" with a confirm, and a sparkle preview. +0.4
8. **Records layout polish.** "Next rank" value ("SOUS CHEF AT 24 PTS (YOU: 19)") crowds the label (shot-17); 3rd achievements page has 1 card with no page indicator ("PAGE ▶" only). Add "PAGE 1/3" and filters (Locked / Close to done / by mode). +0.3
9. **Rank/points breakdown.** Rank pts "2 per achievement + 1 per Mastery level" is good, but add a rank-ladder view (all ranks and their point costs). +0.2
10. **Grind speed.** Autoplay ~36 s/match; add a faster "turbo" option or shorter match presets for farming achievements (First to 1 is not offered, FIRST TO cycles up to 5). +0.4

## 🔍 Every issue I saw (exhaustive)
| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Match result receipt | No achievement unlock shown (9 earned, none announced; receipts only list tokens/XP/First Service) | art-src/.playtest/r8-7101/shot-9.png, shot-11.png, shot-14.png | Add unlock rows + in-match toast |
| 2 | major | Title | NEXT UP says "Finish the 1-minute Practice" but the practice button is gone after the first match | shot-30.png, shot-31.png | Keep PRACTICE button until done / clickable NEXT UP |
| 3 | major | Party Modes after a match | ESC from a Party match lands on FREE PLAY; /state mode reverted to "classic" for later matches | shot-14.png | Return to Party Modes, keep mode on rematch |
| 4 | major | Gallery SHINY button | Costs 300 🪙 silently on click; no price on button, no confirm; preview shows no visible shiny change | shot-21.png, shot-22.png | Show cost + confirm + visible preview |
| 5 | major | Win achievements | NORMAL-level wins only ~18% in my sample; "Win 10/25/50", streak achievements need many matches at ~36 s each | shot-17.png | Clarify bot level used; tuning options |
| 6 | minor | Records | "Tables visited 18/18" vs Free Play "ALL 15 · 3 more to unlock" | shot-17.png, shot-7.png | Make counters agree |
| 7 | minor | Records | "Next rank" value crowds into its label ("SOUS CHEF AT 24 PTS (YOU: 19)") | shot-17.png | Shorten text or right-align on separate line |
| 8 | minor | Records | 3rd page has one achievement; "PAGE ▶" has no page number | shot-4.png | "PAGE 1/3", or fit 37 on 2 pages |
| 9 | minor | Records | Pinned card keeps blue outline after it completes (First Bite shows gold unlocked + blue outline) | shot-17.png | Auto-unpin on completion |
| 10 | minor | Records | No achievement unlock dates, no sort/filter, no "close to done" list | shot-3.png | Add filters |
| 11 | minor | Pantry | Weekly orders show ✔ complete but I never saw the 40 🪙 paid; token total moved 887 to 912 without explanation | shot-19.png | Receipt line "Order done +40" |
| 12 | minor | Pantry | Locked/owned shop items fine, but no shiny/mastery info or total remaining | shot-20.png | Add "bought 2/8" |
| 13 | minor | Settings | KID MODE description says only "Story: easier rivals..." though it now also affects Free Play/Party/Daily | shot-18.png | Update description |
| 14 | minor | Pause menu | "TAP QUIT AGAIN TO REALLY END IT" is dark red on dark, at the bottom edge far from the button, not in /look text | shot-29.png | Put it on the button ("TAP AGAIN TO QUIT"), higher contrast |
| 15 | minor | Pause menu | Free Play pause says "QUIT (ends the Cup / run)" even outside a Cup | shot-28.png | Context-aware label |
| 16 | minor | Gauntlet perk screen | Giant Gobzilla art overlaps the right edge of the "Ghost Start" card | shot-26.png | Draw kaiju behind cards or move |
| 17 | minor | Gauntlet game over | Digit1 after GAUNTLET OVER silently starts a new run (1-heart "GAUNTLET ❤ WAVE 1" state seen) without confirming | shot-27.png | Show RETRY / MENU buttons explicitly |
| 18 | minor | Result screen | Duplicate kaiju names with "(YOU)" on only one ("NORIGON (YOU)" vs "NORIGON") | shot-9.png | Add P1 badges / colour tag on result list |
| 19 | minor | Result screen (Crumb Rush) | Ranking shows rounds, while header shows crumbs; winner CHOCOMUNCH 24 crumbs vs my 16, but "Crumb Monster: GOBZILLA (153 crumbs)" confuses what wins | shot-15.png | Show mode-specific win condition |
| 20 | minor | Result receipt | Bottom-left receipt overlaps part of the arena art and a stray white fork/knife icon box appears at [222,484] | shot-9.png | Clean stray icon |
| 21 | minor | Chapter CLEAR banner (in match) | No stars shown on the in-match banner; stars only appear on the map panel (shot-43) | shot-39.png | Show ★ earned |
| 22 | minor | Story chapter 2 | Chat auto-started; Space skipped one line but unclear whether S skips all | shot-40.png | Consistent skip |
| 23 | minor | Story | After DEFEATED, Digit1 is not RETRY (nothing happens); Retry only by click | shot-38.png | Bind Enter to the focused button |
| 24 | minor | Story Log | Lots of empty space, small text; only 2 lines | shot-44.png | Larger text, icons per chapter |
| 25 | polish | Title top buttons | SETTINGS/HELP/KAIJU/RECORDS/PANTRY/WORKSHOP labels are tiny (~10 px) | shot-6.png | Larger labels |
| 26 | polish | Party Modes setup | Bottom hint "🏆 Party Cup = 6 games..." sits ~8 px above KEYS / HOUSE RULES buttons; very cramped | shot-13.png | Add spacing |
| 27 | polish | Party Modes | FIRST TO button cycles 3 to 5 with no 1 or 2; I accidentally made a 5-round match | shot-13.png | Offer 1/2/3 and show cycle |
| 28 | polish | Gallery | Mastery line "Mastery ★★★★★★★ Lv 3 Sous Chef (69/160 XP) · next: Gold name in matches" wraps tight to the bottom edge of the panel | shot-21.png | More padding |
| 29 | polish | Gallery | Locked kaiju silhouettes show "???" with no hint until clicked; no unlock list overview | shot-21.png | Show hint line on hover |
| 30 | polish | Gallery | "Matches: 5 · Wins: 0" for Gobzilla while I won a Story chapter with Gobzilla (Gallery stats not updated live or only counts Free Play) | shot-21.png | Check counters |
| 31 | polish | Challenges panel | Locked course cards only say "clear wave 4", "wave 8", "wave 12"; fine, but Gauntlet Runner (5 waves) and these thresholds are not linked | shot-24.png | Link to achievements |
| 32 | polish | Defeated panel | Large empty gap between title and body | shot-38.png | Tighten |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- Title: OK, but top nav labels are very small (shot-6). NEXT UP card text fits.
- Records page 1/2/3: OK; minor crowding on "Next rank" row (shot-17).
- Free Play setup: OK (shot-7).
- Party Modes setup: hint text close to bottom buttons (shot-13).
- Settings: OK, all text fits (shot-18).
- Pantry: OK (shot-19, shot-20).
- Gallery: OK, bottom panel text tight (shot-21, shot-23).
- Challenges panel: OK (shot-24).
- In match HUD / countdown: OK (shot-8).
- Match results (Free Play, Crumb Rush, Gauntlet): receipt overlaps arena art; stray icon in shot-9; Giant kaiju overlaps a perk card in shot-26.
- Pause menu: low-contrast confirm text (shot-29).
- Story map, chapter panel, defeat panel, clear panel, Story Log: OK (shot-35, 38, 43, 44).
- Help (Practice): OK; Practice complete panel OK (shot-33).
- Not checked: Daily, Workshop, Online, Spicy, Trials.

## The single biggest structural problem
Achievements are not a *felt* system. I unlocked 9 without a single moment of celebration, the receipts do not mention them, and the requirements that matter (win counts, streaks, each Party mode) are slow to farm: autoplay costs ~36 s per match with an 18% win rate at NORMAL, and Party matches do not keep their mode between rematches. The achiever loop needs: do thing, see banner, see reward, see next goal, all within seconds.

## Big change proposals (2–3, most important first)
### Proposal 1: Achievement toasts + "Trophy Receipt"
- **Problem it solves:** silent unlocks, unexplained token jumps.
- **How it would work:** whenever an achievement completes, a gold banner slides from the top for 3 s ("🏆 CRUMB MUNCHER · +30 🪙 · 🎨 Lime colour"), the receipt gets a "🏆 Achievements" section with the same lines, and the Records card flashes NEW on next visit. Multiple unlocks queue. A "Next up" pin shows progress ("Win 10 matches 4/10 (+1)") on every receipt even when nothing unlocked.
- **Example moment:** I win my 10th match; the banner says "🏆 REGULAR DINER +30 🪙 · 🎨 Ocean unlocked", the receipt lists it, and "Next: House Favourite 10/25".
- **Rewards / progression hooks:** shows rank points gained; "2 pts: Sous Chef in 9 pts".
- **Risks and edge cases:** banner overlapping HUD (place under top bar), many unlocks at once (queue max 3 and collapse).
- **Size:** S
- **Score impact for me:** +1.0

### Proposal 2: "GO" shortcuts and a Goals tab
- **Problem it solves:** achiever must figure out which mode satisfies each requirement; Practice button vanishes; party mode resets.
- **How it would work:** Records gets a "GOALS" tab sorted by closest to done; every card has GO which opens the right setup screen with mode/bot level preset (e.g. "Win a Hot Dumpling match" opens Party Modes with Hot Dumpling selected). Party rematch keeps mode. Pinned goal also gets a title button.
- **Example moment:** I pin "Speed Eater", press GO, land on Party Modes with CRUMB RUSH selected, press PLAY.
- **Rewards / progression hooks:** completing all in a category gives a bonus colour.
- **Risks and edge cases:** locked modes; show lock reason.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 3: Farming helpers (Quick Match / Achievement Mode)
- **Problem it solves:** hours of 36 s matches at an 18% win rate for streak and win-count achievements.
- **How it would work:** "QUICK MATCH" preset: First to 1 round, EASY or KID bots, 1 rival; count toward win/streak achievements at full weight (or announce clearly that it counts). Records shows "est. matches to go".
- **Example moment:** "Too Hot to Handle: 3/5, ~2 minutes with Quick Match".
- **Rewards / progression hooks:** none extra, just time saved.
- **Risks and edge cases:** devalues achievements; limit knockouts/KAIJU counts to normal weight.
- **Size:** M
- **Score impact for me:** +0.6

## How this round's new features felt
- **Shiny forms:** Mastery Lv 3 + 300 🪙 purchase works but is silent and nothing visibly changes in the Gallery preview or on my Gobzilla in matches (shot-22, shot-26). No price on the button. This is the least clear new feature for an achiever.
- **Party Cup ON/OFF:** the switch exists (shot-13) and the hint line explains it clearly, but I could not play a full Cup in my budget.
- **Quit asks twice:** works (shot-28, 29) but the confirm text is hard to see.
- **Story Log / locked tabs:** "clear chapter 6 to open" and "finish the Grand Feast" are clear (shot-35); Log works but sparse (shot-44).
- **Kid Mode settings text:** stale (Story-only wording).
- **Receipts carry achievements and First Service:** First Service yes ("Clear Story chapter 1 ✔ +25 🪙", shot-39), but achievements do not appear in receipts at all.
- **Tough/Hard bots:** autoplay NORMAL lost 82% of matches; auto:hard won Story chapters 1 and 2 reliably, so the labels may not match difficulty feel (I can't confirm the in-game TOUGH level).
- **Tiny Practice:** needed SWIPE (key F) to finish step 8; there is no hint that the harness's /act cannot swipe, but in-game prompt "SWIPE up close F / X / SWIPE" is clear (shot-33).
- **Not touched:** Giant Hand dodge, Workshop UNDO, TWIST picker, phone layout.

## Bugs that block play
- None blocking. Possible: Party Modes mode not kept on rematch/after ESC (to confirm outside the harness), and title NEXT UP asks for Practice after the title button disappears (workaround exists via HELP > PRACTICE).
