# Playtest evaluation — The Achiever (round 10, port 7101)

**Fun score: 7.5 / 10** (Records is clear and the token/achievement loop is generous, but the grind has no tooling, achievement toasts get swallowed, and some goals can't be ground or tracked.)

## What I did
- About 108 harness commands. Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r10-7101\` (shot-1 to shot-42). I opened every one.
- Screens visited: Title, Records (all 3 pages, first visit and twice more mid-progress), Free Play setup, Gallery (colour swatches), Pantry, CHALLENGES popup, Gauntlet wave 1, Daily (Hot Dumpling), Party Modes setup (Team Feast, Crumb Rush, Hot Dumpling, Golden Spoon, Classic), Table Workshop (by accident), Story map, Story ch 1 and ch 2.
- Matches: about 27 played, 11 won. Played by hand: Free Play Normal (won 3-1), Gauntlet wave 1 (won), Daily Hot Dumpling (lost, then won), Crumb Rush (won), Golden Spoon (won), Team Feast (lost), Story ch 1 (3★) and ch 2 (cleared). The rest was `/autoplay` (normal and hard).
- Time cost: autoplay runs about 45–55 s per match (6 matches 4m47s, 7 matches 5m15s, 4 matches 2m44s). Progress went from 0/37 to 9/37 achievements plus 3 more at the end. Chef Rank went Dishwasher → Line Cook → Sous Chef → Head Chef, and tokens went 0 → 1255, spending about 410 on colours.
- `/errors`: "none" at start, middle and end.

## What worked for me
- Records is the best-looking screen in the game. The 2×9 grid shows lock icons, progress bars with n/N, and the reward colour right in the description line ("Win a match · 🎨 Lime"). The fraction on every row answers "how far am I".
- The footer follows my pin. After I clicked Crumb Muncher it read "📌 Pinned: Crumb Muncher (0%)". When I finished it, the footer fell back to "👉 Next up: Rampage (67%)", then "Second Breakfast (95%)", then "Spoon Fed Up (82%)". That means I always have a target, which is exactly what I want. The pinned goal also showed on the post-match panel ("📌 Crumb Muncher: 17/100").
- The Gallery locked-colour tap is excellent. Tapping a locked swatch gives the exact way to earn it: `🔒 Ocean: "Regular Diner": Win 10 matches (4/10)`. Coin-priced ones say `Toffee: buy it in the 🛒 PANTRY for 40 🪙`. 🪙 balance and `🎨 5/21` sit in the header.
- Post-match "THIS MATCH" panel lists tokens, XP, achievements and colours earned. Seeing "🏆 Spoon Fed +30 🪙 · 🎨 Lemon colour!" is satisfying.
- Token economy is generous and quick (about 50–160 per match, Crumb Rush and Golden Spoon about 155). Weekly Orders gave me real progress bars and "✔ paid".
- The Chef's Pass line in CHALLENGES shows the live count: "0/12 Trial ★ or Gauntlet wave 0/8".
- Mode achievements stack well. One Golden Spoon match paid Regular Diner, Spoon Fed Up, Spoon Fed and Clean Sweep together (+120 🪙, 2 colours).
- The Daily end screen shows the open medals: "Today's medal: 🥉 · still open: 🥈 win +20 🪙 · 🥇 win without losing a round +40 🪙". The Daily intro banner also lists all three medals.
- The KAIJU warning ring is visible and filling (shot-9: a yellow arc fills inside a pink ring).

## 🧾 Exactly what would make this a 9/10 for me
1. **Show every achievement earned at match end, not just the first.**
   - **What:** a post-match achievement list or stacked toast queue.
   - **Where:** match end overlay and the top-right toast.
   - **How it should behave:** in shot-35 four achievements were earned (Regular Diner, Spoon Fed Up, Spoon Fed, Clean Sweep). Only a single toast, "🏆 Regular Diner! +30", was visible over the board. The THIS MATCH panel did list them, but at 14 px in a corner. Queue the toasts (1.5 s each, up to 4), and add a "🏆 4 ACHIEVEMENTS" heading to the panel with the colour swatch chip next to each. Tapping the panel should open Records on the first one.
   - **Score impact:** +0.4
2. **Let me grind everything with the autoplay or a "quick play" path, and say which modes it won't cover.**
   - **What:** `/autoplay` (the harness stand-in for a player who leaves matches to a bot) never continued Gauntlet or Story. After Gauntlet wave 1, matches 2–8 silently became ordinary 4-player Free Play. Story ch 1 via autoplay produced a Free Play match too. There is no in-game way to say "run my Gauntlet" or "bot-play this chapter". In the real game the equivalent is a long manual session.
   - **Where:** Gauntlet, Story, Daily, Party Cup.
   - **How it should behave:** add a Settings toggle "🤖 Auto-pilot (watch a bot play your seat)" that works in every mode, with a clear "X of Y matches left" bar. At minimum, rematch inside Gauntlet should continue the run.
   - **Score impact:** +0.4
3. **Make the Records list sortable and filterable.**
   - **What:** a filter row: ALL · CLOSE TO DONE · BY MODE · NEEDS COLOUR.
   - **Where:** Records, above the grid.
   - **How it should behave:** "Close to done" sorts by percent descending and shows the 3 closest (today it only shows one "Next up" line). Each row shows an estimate such as "~3 matches" ("Second Breakfast 379/400: about 1 match at your pace").
   - **Score impact:** +0.4
4. **Fix the three-page layout.**
   - **What:** page 3 holds exactly one achievement ("Dinner Party Animal", shot-3). 37 = 18 + 18 + 1. Either fit all 37 on 2 pages (20 per page, smaller rows) or reflow to 19/18.
   - **Where:** Records.
   - **How it should behave:** no near-empty last page. Also show "PAGE 1/3" on the button, because "PAGE ▶" gives no idea how many there are. The page also persisted between visits, so I landed on page 1 by accident the second time.
   - **Score impact:** +0.2
5. **Make requirements explicit and trackable for no-progress-bar achievements.**
   - **What:** "Speed Eater" (Win a Crumb Rush match), "Smoothie Operator", "Plot Twist", "Daily Special", "Cup Champion" and "Table Maker" show no bar and no hint of how or where. Win-in-a-row ones show 3/5 but not whether the streak is alive.
   - **Where:** Records rows.
   - **How it should behave:** every row gets a jump button, so tapping a locked achievement shows "▶ GO: Party Modes → Crumb Rush". Streak rows show "streak: 0 (best 3)". The row for "Table Maker" shows "Workshop → SAVE".
   - **Score impact:** +0.4
6. **Make Chef Rank and per-kaiju Mastery rank names distinct.**
   - **What:** the post-match panel says "Mastery Lv 4 Head Chef" while Records says "Chef Rank: Sous Chef · Next: Head Chef 27/36" at the same time. Two different ladders share the same names.
   - **Where:** match recap, Records, Gallery.
   - **How it should behave:** Mastery levels use a different word set (e.g. "Rookie → Cook → Master", or a number only) and Chef Rank keeps the chef titles.
   - **Score impact:** +0.2
7. **Show the real achievement rewards honestly.**
   - **What:** the Records footer says "Each achievement pays 30 🪙" but the tokens for a first-clear (+50 for ch 1) and mode wins (+155) dwarf that.
   - **Where:** Records footer and recap panel.
   - **How it should behave:** show the biggest reward (the colour) first. Tokens are fine as is.
   - **Score impact:** +0.1
8. **Fix the "armed purchase" confusion in the Pantry.**
   - **What:** tapping four different items once each leaves all four reading "Toffee colour? tap again to buy for 40" (shot-18). Tapping a second time on a non-last one did nothing (shot-19: purchase did not happen, balance stayed 573). Only consecutive taps on the same item bought it.
   - **Where:** Pantry.
   - **How it should behave:** only one item at a time shows "tap again". Others revert to normal immediately.
   - **Score impact:** +0.2
9. **A completion tracker for colours and kaiju in one place.**
   - **What:** Gallery says "Collection 54%", "🎨 5/21". I couldn't see which colours are still earnable versus buyable without tapping 21 swatches one by one (I did, 15 commands).
   - **Where:** Gallery colour row.
   - **How it should behave:** label swatches by name on hover, or group them as "Achievements (10) / Pantry (6) / Other". Locked swatches show a small icon for "🏆" or "🪙" instead of a generic padlock.
   - **Score impact:** +0.3
10. **Daily achievement and mode-win synergy needs a nudge.**
    - **What:** "Not It!" (win Hot Dumpling) and "Daily Special" (win Daily) both could be satisfied by today's Daily, which is Hot Dumpling. Nothing said so.
    - **Where:** Daily intro banner.
    - **How it should behave:** add "🏆 also counts for: Daily Special · Not It!" on the banner.
    - **Score impact:** +0.1
11. **Autoplay seat naming.**
    - **What:** during autoplay the recap shows "SALMONSTER (YOU)" and another "SALMONSTER" in the same match (shot-30), so I couldn't tell which row was me without "(YOU)". My kaiju also changed between matches (Gobzilla → Avocadrake, not yet unlocked in the Gallery → Bluebeary) with no explanation.
    - **How it should behave:** unique kaiju per match or a "#2" suffix. Gallery shows "???" for Avocadrake while I'd already played it in match 6.
    - **Score impact:** +0.1

Total if all done: about 9.0 to 9.2.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Match end | Four achievements unlocked but only one toast ("🏆 Regular Diner! +30") appears over the board; the rest are in a small panel | shot-35 | Queue toasts, add a clear achievement list on the recap |
| 2 | major | Autoplay and Gauntlet | After Gauntlet wave 1 cleared, the next autoplay matches were ordinary Free Play; Gauntlet progress did not advance (Gauntlet best wave stayed 1) | shot-24, shot-25 | Make rematch continue the Gauntlet; autoplay should follow the mode |
| 3 | major | Autoplay and Story | `/autoplay` after opening a Story chapter started a Free Play match instead (shot-38 vs. the chapter's 1 rival); Story ch 3 achievement "Leftovers Cleared" can't be ground | shot-38 | Autoplay should run the selected Story chapter |
| 4 | major | Records | No way to tell how to earn no-bar achievements (Speed Eater, Smoothie Operator, Plot Twist, Cup Champion, Table Maker, Daily Special) beyond the one-line text | shot-2 | Jump-to-mode button or "how to" line on tap |
| 5 | minor | Records | Page 3 contains exactly one achievement ("Dinner Party Animal") | shot-3 | Rebalance to 2 pages or 19/18 |
| 6 | minor | Records | The button just says "PAGE ▶", no page count; page also persists between visits so I landed on page 1 after a stale click | shot-31 | Show "PAGE 1/3" |
| 7 | minor | Records | Pinned achievement that was completed (Crumb Muncher) keeps a blue highlight border after unlock, next to gold unlocked rows | shot-14, shot-27 | Drop the pin highlight when it completes |
| 8 | minor | Records | Footer text is two sentences in one wrapped line ("📌 Pinned: Crumb Muncher (0%) — Eat 100 crumbs · Click any locked one to 📌 pin it …") and gets long; the pin hint is repeated on every visit | shot-2 | Split into two lines; show the hint only when nothing is pinned |
| 9 | minor | Records | Chef Rank is hard to compute: "Rank pts: 2 per achievement + 1 per kaiju Mastery level" and "Sous Chef · 20/24" with 6 achievements at that time (12 pts) means 8 pts came from Mastery, not obvious | shot-27 | Show a breakdown "12 from achievements + 8 from mastery" |
| 10 | minor | Recap and Records | Chef Rank ladder (Dishwasher / Line Cook / Sous Chef / Head Chef) and per-kaiju "Mastery Lv 4 Head Chef" use the same words | shot-11, shot-27, shot-14 | Rename one ladder |
| 11 | minor | Pantry | Tapping several items once each leaves all of them showing "tap again to buy" but only the last one actually buys; tapping an earlier one did nothing | shot-18, shot-19 | Disarm others when one is armed |
| 12 | minor | Gallery | The 21 colour swatches have no names or earn-icons; locked ones are all identical padlocks; the hint line is at 12 px at the far right | shot-15, shot-16 | Group and label swatches |
| 13 | minor | Gallery | The "Avocadrake" tile still showed "???" after I had played a match as Avocadrake in autoplay | shot-15 | Unlock when first used, or restrict autoplay to unlocked kaiju |
| 14 | minor | Match recap (autoplay) | Two players with the same kaiju name in one match: "SALMONSTER (YOU)" and "SALMONSTER" | shot-30 | Add a suffix or avoid duplicates |
| 15 | minor | Match recap | Crumb Rush and Golden Spoon recaps rank by rounds and KOs only; no crumbs held or spoon seconds shown on the ranking rows | shot-34, shot-35 | Show the mode's own score on each row |
| 16 | minor | Golden Spoon intro | Round-1 tip is the generic "giant hand goes for whoever has the fullest belly"; the mode's own rule is not explained (Crumb Rush gets its own tip) | (look output, no shot) | Give each mode its own first tip |
| 17 | minor | Daily end | Title "DAILY CHALLENGE FAILED" although a 🥉 bronze was earned | shot-29 | Say "BRONZE MEDAL" and show a try-again prompt |
| 18 | minor | Daily intro | Intro paragraph wraps oddly ("…win to keep your 🔥 streak · Picnic Blanket" then "Medals:") over a busy picnic pattern; medals row is hard to read | shot-28 | Put the medals on their own lines on a dark plate |
| 19 | minor | In-match KAIJU burst | When a bot goes KAIJU, "KAIJU!", "BERRY MINES!" and "CLANK!" labels stack on top of each other and over three overlapping rings (red, yellow, blue) | shot-8 | Stagger or reduce labels; one ring per kaiju |
| 20 | minor | Story chapter intro | A skippable chat starts after pressing NEXT, and my action commands did nothing until I skipped it (S key). No on-screen hint of how long it lasts beyond "SKIP CHAT (S)" | shot-41 | Fine; add "SPACE to continue" prominence |
| 21 | polish | Story map | Opening cutscene auto-plays on top of the map the first time I enter Story; SKIP is small at top-right | shot-36, shot-37 | Fine, but a "don't show again" option |
| 22 | polish | Free Play setup | "tables owned 13/18" vs Records "Tables visited 0/18" at the same time look like the same counter | shot-4, shot-1 | Name them differently ("unlocked" vs "played on") |
| 23 | polish | Challenges | Chef's Pass line is 11–12 px and has no progress bar | shot-22 | Add a bar |
| 24 | polish | Records | "Each achievement pays 30" in a footer at the bottom; the actual size of rewards is not what the text suggests | shot-1 | Reword |
| 25 | polish | Match recap | "NEW KAIJU: Chocomunch (Gallery)" and "NEW TABLE" lines mention the Gallery but there's no button to go there | shot-11, shot-24 | Add a "View" chip |

No blockers.

## 🔠 Text and layout check

- Title screen: OK (text lists only; the NEXT UP line is long but fits).
- Records page 1/2/3: OK. No overlap, no cut-off. Small text (footer, 12 px) is readable but tiny. Page 3: mostly empty (not a layout bug). `shot-1`, `shot-2`, `shot-3`, `shot-14`, `shot-27`, `shot-31`.
- Free Play setup: OK. `shot-4`, `shot-26`.
- Party Modes setup: OK; 11 buttons in one row are tight but not overlapping. `shot-32`.
- Gallery: OK; the hint text at the right is small (about 12 px) and wraps on 2 lines. `shot-15`, `shot-16`.
- Pantry: OK, except the "tap again to buy" state stuck on 4 items (see #11). `shot-17`, `shot-18`, `shot-19`, `shot-20`, `shot-21`.
- CHALLENGES popup: OK; the Chef's Pass line is at the bottom edge but inside the box. `shot-22`.
- Table Workshop: OK (reached by accident; "Table code copied" message and long code fits). `shot-13`.
- In-match HUD: OK. `shot-5`, `shot-24`.
- KAIJU burst: PROBLEM, overlapping "KAIJU! / BERRY MINES! / CLANK!" text and rings. `shot-8`. `shot-9`: OK.
- Match recap (2, 3, 4 players): OK. Panels and "SHARE" button don't collide with the board's text; the bottom stat line fits. `shot-11`, `shot-12`, `shot-29`, `shot-30`, `shot-34`, `shot-35`, `shot-38`.
- Daily intro banner: PROBLEM, hard-to-read overlap on a checkered background (the text sits right on the picnic pattern and ants lane). `shot-28`.
- Story map: OK. Chapter-clear modal OK. Rival chat OK. `shot-36`, `shot-37`, `shot-39`, `shot-40`, `shot-41`, `shot-42`.

I checked on desktop only. I did not try Kid Mode or phone mode.

## The single biggest structural problem
There is no way to see and work toward a whole set of goals at once, and the real grind isn't automatable inside the game. The Records screen tells me my one "next up" achievement, but nothing combines "what's closest", "what's blocked by a mode I haven't touched", and "what I can do in one more session". As an achiever I spent my budget guessing which mode could unlock several goals together (Golden Spoon was the jackpot: four at once). Meanwhile the grind itself (Gauntlet, Story chapters, Daily) can't be run on a bot, and the Gauntlet/Story run didn't even continue, so long goals ("Gauntlet Master: clear 10 waves", "Ghost Pepper: clear all 12 chapters on Spicy", "Bottomless Belly 1000 crumbs") become hours of manual play with no plan.

The second half of the problem is feedback. Four unlocks in one match produced one visible toast. When a match grants several rewards, the player should see all of them clearly, because that is the dopamine hit the achiever came for.

## Big change proposals (2–3, most important first)

### Proposal 1: "Goal Board" with a recommended next session
- **Problem it solves:** with 37 achievements, 21 colours and several mode-specific goals, I can't see which one action gets me the most progress.
- **How it would work (detailed design):** add a tab to Records called 🎯 GOALS above the grid. It shows 3 cards.
  - Card 1, "CLOSEST": the 3 achievements with the highest percent (e.g. Second Breakfast 95%, Spoon Fed Up 82%, Too Hot To Handle 3/5), each with a "~N matches" estimate computed from my average per match (crumbs/KOs/wins per match).
  - Card 2, "TWO-FOR-ONE": modes that would advance several at once ("Golden Spoon: Spoon Fed, Spoon Fed Up, Clean Sweep"). Computed from the unmet requirements by mode.
  - Card 3, "PINNED": my pin, with a ▶ GO button that jumps to the right mode screen and pre-sets it (mode, bot level).
  - A "PLAN MY NEXT 10 MINUTES" button picks the set that clears most goals and starts the first mode.
- **Example moment:** I open Records, see "Golden Spoon wins: Spoon Fed + Clean Sweep + Spoon Fed Up", press ▶ GO and I'm on the Golden Spoon setup with Normal bots selected.
- **Rewards / progression hooks:** completing a Goal Board "session" (3 goals) pays a one-time +25 🪙 "Plan done" bonus; show a streak of sessions.
- **Risks and edge cases:** estimates are wrong early (use "?" below 3 matches); too many cards clutter the screen, so keep it to 3 cards of 2 lines each.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 2: Auto-pilot that works in every mode, with a time budget
- **Problem it solves:** grinding Gauntlet, Story chapters and long counters (1,000 crumbs, 250 KOs) is slow and my autoplay silently fell back to Free Play.
- **How it would work (detailed design):** add "🤖 AUTO-PILOT" to the pause menu and the end-of-match screen. Options: bot level (EASY/NORMAL/HARD), "play N matches" (1/3/5/10) or "until I unlock something". It follows the current mode: Gauntlet continues waves and stops at the first loss, Story replays the chapter, Daily replays the Daily, Party Cup runs the next game. A small banner reads "🤖 Auto-pilot: match 3/5 · +120 🪙 so far · ⏹ STOP". It never spends tokens or changes settings, and it stops with a summary of everything earned ("2 achievements, 1 colour").
- **Example moment:** at Gauntlet wave 5 I choose AUTO-PILOT, 3 matches, HARD. It clears waves 5–7, stops on a loss, and shows "Reached wave 7 (best 7). +180 🪙. Chef's Pass: wave 7/8".
- **Rewards / progression hooks:** auto-pilot earns tokens and mastery XP at 50% (so it never beats real play) and does not count for "win without losing a round" medals.
- **Risks and edge cases:** some players will feel it cheapens achievements; make Daily medals and Gauntlet checkpoints count only for human play.
- **Size:** L
- **Score impact for me:** +0.6

### Proposal 3: Reward reveal at the end of every match
- **Problem it solves:** four unlocks were hidden behind one toast and a small panel, so the payoff of finishing a goal is muted.
- **How it would work (detailed design):** after the standings, slide in a "WHAT YOU EARNED" card for 2.5 s (tap to skip): one row per reward with its icon: 🏆 achievement name (+30 🪙), 🎨 colour swatch, 🎁 kaiju/table. Rows animate in 0.3 s apart with a coin tick. A "Go to Records" chip appears on any row. If nothing was earned, the card shows the pinned goal's progress bar ticking up ("Crumb Muncher 17 → 35 / 100").
- **Example moment:** I win Golden Spoon and see four stacked rows, each landing with a sound, then my pinned goal bar fills.
- **Rewards / progression hooks:** none extra; it is purely presentation, but it makes every goal visible.
- **Risks and edge cases:** keep it skippable; don't delay the rematch button (show the card while the buttons are active).
- **Size:** S
- **Score impact for me:** +0.4

## How this round's new features felt
- **Records footer follows the pin (7):** works well. Pin showed on the footer and the post-match panel; on completion it fell back to the closest achievement. The one blemish is the leftover blue pin border on a completed row (#7). The hint sentence is also long.
- **Gallery locked-colour tap (6):** very good. Exact requirement plus current progress ("4/10") appears. Missing: a jump to Records or Pantry from that line. The 🪙 balance in the header is helpful. I did not buy a Shiny (needs Mastery Lv 3 and 300 🪙; the Gobzilla tile said "needs Lv 3" and I'm Lv 2 on it), so I didn't see the banner or sparkles.
- **Chef's Pass (3):** the line in CHALLENGES shows "0/12 Trial ★ or Gauntlet wave 0/8". Clear and useful. The Story map also says "finish the Feast or 🎟 Chef's Pass" on the Dessert button and "🌶️ SPICY: clear it (or 🎟 Chef's Pass)". I reached Gauntlet wave 1 only; the wave-clear preview, "Next: wave 2 · 1 rival (NORMAL) · ❤❤❤" (shot-24), reads well. I could not get beyond wave 1 because autoplay didn't continue the run (#2).
- **Daily medals (11):** good. "Today's medal: 🥉 · still open: 🥈 win +20 🪙 · 🥇 win without losing a round +40 🪙" tells me exactly what's left. The "FAILED" title is harsh after earning bronze (#17).
- **KAIJU warning (1):** the filling ring on my own kaiju is readable (shot-9). When a bot goes KAIJU several rings and labels overlap (shot-8). I got through the 1.8 s bot wait without noticing any problem: the first bot attack came after I had already thrown.
- **Party Cup (4):** I didn't touch it (Cup was OFF); the setup shows "PARTY CUP OFF" and "CUP LENGTH 6 GAMES". I judged only the setup text, which fits.
- **First-timer (8), Kid Mode (5), Twist picker (9), Workshop (10):** not covered by this profile; I touched the Workshop by accident only (shot-13) and saw no prop-explanation text because I never picked a prop.
- **Text and layout (12):** one overlap found in a KAIJU burst (shot-8), one busy-background text issue in the Daily intro (shot-28).

## Bugs that block play
- None. `/errors` stayed "none" throughout. Closest to a blocker is that autoplay doesn't follow Gauntlet or Story (issues #2, #3), which blocks grinding those goals with the harness but not manual play.
