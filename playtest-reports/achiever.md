# Playtest evaluation — The Achiever

**Fun score: 7.0 / 10** (The Records screen, pinning, achievement payouts and colour rewards are a good loop, but requirements are hidden in the Gallery, progress is not shown after matches, several achievements are trivial or hours-long, and the Practice step 6 SWIPE would not complete for me.)

> Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r9-7101\` (shot-N.png). Harness commands used: about 112.

## What I did
- Title screen, then Records (all 3 pages of 37 achievements, pinned Crumb Muncher), back to title to check the pin showed in NEXT UP.
- Free Play setup (1 player + bot), played 1 match by hand with /act (won 3-0 vs Pizzaraptor, earned First Bite + Clean Sweep), then `/autoplay n=3` (took about 2 minutes, roughly 40 s per match) and `/autoplay n=1` (54 s). The autoplay matches were 4-player random-kaiju games with my seat moving to a different kaiju each time.
- 1-minute Practice: reached step 6/8 (SWIPE up close) and could not get past it in about 20 attempts. Quit via the pause menu.
- Story: opening cutscene, ch1 (2 stars, Crabbage), ch2 (lost once with a bot at the controls, then won 3 stars, unlocked Sloba + New Kaiju reveal), Story map, Rewards counter.
- Pantry (weekly orders, shop second-tap buy of Toffee), Gallery (kaiju grid, locked kaiju hint, colour row, Mastery ladder), Challenges popup, Daily (Hot Dumpling, lost, 6 rounds).
- Roughly 9 matches played, 4 won. Records at the end: 5 matches / 1 win after the first batch, 12/18 tables visited after 5 matches.
- /errors checked at start, middle and end: none.

## What worked for me
- Records is clear: 3 pages, each row has a progress bar, count, colour reward, and the footer says "Each achievement pays 30 🪙". (shot-2/3/5)
- 📌 Pin works: clicking a locked achievement highlights it and puts it on the title NEXT UP and the post-match "THIS MATCH" panel with live progress (Crumb Muncher 22/100, then 71/100). This is the best thing for me. (shot-5, shot-11, shot-12)
- Post-match panel lists every 🏆 achievement earned with token payout and the unlocked colour. (shot-11, shot-19)
- NEW KAIJU reveal after Story ch2 plus "UNLOCKED: SLOBA" on the Chapter Clear card is a satisfying reward moment. (shot-30, shot-31)
- Locked kaiju in the Gallery say exactly how to unlock them with progress: "Win 5 matches in any mode (you have 3/5)". (shot-36)
- Pantry second-tap buying ("Silverware colour? tap again to buy for 400") shows price and works; owned items turn green with ✔ OWNED. (shot-34)
- Defeat card explains "What beat you" and gives a tip. (shot-27)
- Story chapter clear card with stars, rival quote and next-chapter unlock. (shot-23)

## 🧾 Exactly what would make this a 9/10 for me
1. **Show requirements for every locked colour in the Gallery.**
   - **What:** the 21-swatch "YOUR COLOUR" row shows 15 padlocks with no text.
   - **Where:** Gallery.
   - **How:** hovering or selecting a locked swatch shows "🔒 Lime — Win a match (0/1)" with the same progress bar as Records, plus a "go to Records" link.
   - **Score impact:** +0.6
2. **A visible progress bar and "how long" estimate for grind achievements.**
   - **What:** 1,000 crumbs, 250 knockouts, 50 wins, 25 matches, 10 Gauntlet waves have only "0/1000".
   - **Where:** Records and the post-match panel.
   - **How:** after every match show a "+N" delta on pinned goals (e.g. "Crumb Muncher 71/100 (+49)") and in Records show "about 3 more matches at your average" for numeric goals. Autoplay should show a running ETA.
   - **Score impact:** +0.5
3. **Make Records "Next up" respect the pin and surface more than one goal.**
   - **What:** after pinning Crumb Muncher the footer still said "Next up: First Bite (0%)" and later "Forked Up (40%)".
   - **Where:** Records footer.
   - **How:** footer shows the pinned goal first, then the nearest unpinned. Allow 3 pins.
   - **Score impact:** +0.3
4. **Fix the Practice SWIPE step so it can be finished (or auto-skip after 3 tries).**
   - **What:** stuck at "PRACTICE 6/8 SWIPE up close F / X / SWIPE" for about 20 attempts, even though a rival was in range, and the title goal "Finish the 1-minute Practice (+20 🪙)" never completed.
   - **Where:** Practice.
   - **How:** accept SWIPE any time the swipe animation fires, regardless of target. After 20 s on one step show "SKIP STEP ▶".
   - **Score impact:** +0.5 (a blocked starter goal is the worst thing for an achiever)
5. **Fix trivial or misleading achievements.**
   - **What:** "Clean Sweep" (win first-to-3+ without losing a round) was earned in the first 1-bot match; "World Tour: Play on 12 different tables" was earned after 5 matches because Free Play rotates tables each round; "Plot Twist" and "Cup Champion" have no hint at all.
   - **Where:** Records.
   - **How:** Clean Sweep needs at least 3 rivals (or Normal+ bots). World Tour should count only tables you won on, or 12 distinct matches. Add subtitle hints to the hint-less ones.
   - **Score impact:** +0.4
6. **Show several achievement toasts, not only the last.**
   - **What:** a match earned 3 achievements (Crumb Muncher, Size Matters, World Tour) but only "Crumb Muncher! +30" appeared top-right at match end. The panel lists them, but the top-right toast shows one.
   - **Where:** Match-end screen.
   - **How:** stack up to 3 toasts (the brief says max 3 pop-ups) with a small "+2 more" chip.
   - **Score impact:** +0.3
7. **Make autoplay fit grinding.**
   - **What:** `/autoplay` runs at about 40-55 s per match and ignores which mode I set up (I started in Story ch1 and it ran a 4-player Free Play). With 1,000 crumbs as a goal this is very slow.
   - **Where:** Free Play / Story.
   - **How:** a "Grind" speed ×3, or an on-screen FAST button for bot-only matches, plus the ability to choose "play as: bot" for a given mode.
   - **Score impact:** +0.3
8. **Show how and when YOU went out on the banner.**
   - **What:** the result screen lists "Knocked out by: 🦖 a KAIJU x4, 🍴 cutlery" only in the small bottom-left panel, no timestamps. The brief promises "how and when".
   - **Where:** Match end.
   - **How:** a line under the title: "You went out in round 2 at 0:41 to a KAIJU stomp".
   - **Score impact:** +0.2
9. **Name the achievement rewards, not just the colour name.**
   - **What:** Records rows show "🎨 Lime" but not what it is.
   - **Where:** Records.
   - **How:** a 12-px swatch of the colour next to the name, and a "Wear it" button on the earned row.
   - **Score impact:** +0.2
10. **Fix the Daily result length.**
    - **What:** a Daily (Hot Dumpling, 3 rivals) went to 6+ rounds and about 40 harness seconds, and I lost with "best 1 round".
    - **Where:** Daily.
    - **How:** first to 2 for Daily, or cap at 5 rounds.
    - **Score impact:** +0.2

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Practice | Step stays at "PRACTICE 6/8 👉 SWIPE up close F / X / SWIPE" even with a rival nearby and F pressed repeatedly; goal "Finish the 1-minute Practice (+20 🪙)" can't be completed (brief says SWIPE step was fixed; it may be a harness input limit, but a real player would also see no feedback) | shot-15, shot-16 | Count any swipe; add skip step button after 20 s |
| 2 | major | Gallery | Locked colour swatches in "YOUR COLOUR" show only 🔒 with no requirement text; clicking one gives nothing | shot-35 | Tooltip / detail text with requirement + progress |
| 3 | major | Records | After pinning Crumb Muncher, footer "👉 Next up: First Bite (0%)" ignores the pin | shot-5 | Pinned goal first in the footer |
| 4 | minor | Records | Footer later says "Next up: Forked Up (40%)" while the pinned goal and other goals are closer or equal | n/a (look text) | Sort by closeness and show pinned |
| 5 | major | Match end | 3 achievements earned in one match (Crumb Muncher, Size Matters, World Tour) but only one toast "🏆 Crumb Muncher! +30" shown top-right | shot-19 | Stack up to 3 toasts |
| 6 | minor | Match end | Earlier match: First Bite and Clean Sweep both earned, toast shows only "Clean Sweep! +30" | shot-11 | Same as #5 |
| 7 | major | Records | "Clean Sweep: Win a first-to-3+ match without losing a round" earned in my very first 1-bot match | shot-11 | Require 3+ rivals or Normal+ |
| 8 | major | Records | "World Tour: Play on 12 different tables" unlocked after 5 matches (12/18 tables visited), because Free Play rotates a new table every round | shot-20, shot-19 | Count tables won on, or only the match's first table |
| 9 | minor | Records | Page 3 holds a single achievement (Dinner Party Animal) and there is no "1/3" page indicator; PAGE button just wraps | shot-4 | Show "Page 3/3" and use 19 per page or rebalance |
| 10 | minor | Records | No hint text for "Cup Champion", "Plot Twist", "Table Maker" beyond one line; "Smoothie Operator: Shove a rival into the blender" doesn't say which table has the blender | shot-3 | Add table name / mode hint |
| 11 | minor | Records | Grind goals (1,000 crumbs, 250 KOs) have no time estimate | shot-2 | Show average-per-match and ETA |
| 12 | minor | Records | "Chef Rank: Dishwasher; Next rank: Prep Cook · 0/6" and "Rank pts: 2 per achievement + 1 per Mastery level" are cramped at the bottom of the stats panel (tiny grey text) | shot-2 | Larger text, put rank on its own row |
| 13 | polish | Records | Stats panel values are right-aligned but the numbers sit lower than their labels (e.g. "Matches played" at y=161 vs "0" at y=167) | shot-2 | Align baselines |
| 14 | major | Title | "NEXT UP · FIRST SERVICE 4/6" shows only 3 lines; hides the other 2 goals, and Practice stays listed even though it is blocked by #1 | shot-37 | Tap to expand the full list |
| 15 | minor | Match end | Kaiju name inconsistent: top bar "GOBZILLA", banner "GOBZILLA JR. RULES THE TABLE", Gallery grid "GOBZILLA" and detail "GOBZILLA JR." | shot-11, shot-35 | Pick one name |
| 16 | minor | Match end | "How and when YOU went out" not visible as a banner line; only "Knocked out by: 🦖 a KAIJU x4, 🍴 cutlery" in the small panel, no times | shot-12, shot-42 | Add a banner line with round and time |
| 17 | minor | Match end | Bottom-left THIS MATCH panel (up to 8 lines) nearly touches the SHARE button and covers a table corner | shot-19, shot-42 | Move panel up or scroll |
| 18 | minor | Match end | The bottom awards strip ("🍴 Most KOs … 🛡️ Survivor") runs through the table's border line and the full line was cut off in /look at 4 awards | shot-12 | Wrap onto two lines or use a darker strip |
| 19 | polish | Match end | The 😂 emote sticks over the banner area on a stale frame | shot-12 | Clear emotes at match end |
| 20 | major | Free Play / Autoplay | `/autoplay` after starting a Story chapter ran a 4-player Free Play match, and my seat's kaiju changed each match (Gobzilla, Dumplord, Pizzaraptor, …) | shot-13, shot-19 | Keep the picked kaiju and mode |
| 21 | minor | Free Play | Setup text "12/20 kaiju (play & Story unlock more)" and "TABLE: ALL 13 · 5 more to unlock" are small and crammed at y=424-452; unlock goals are not named | shot-7 | Show the next unlock ("Win 1 match → Lime") |
| 22 | minor | Free Play | Bot level explanation only appears at the bottom line ("🤖 NORMAL: fair aim, dodges sometimes") in 11-px text after a seat is clicked | shot-7 | Larger text near the BOT LEVEL pill |
| 23 | minor | Story | Opening cutscene plays automatically the first time I open Story, with only a small SKIP ▶▶ at top right, and its caption "THE GRAND FEAST" sits low over the strawberry's face | shot-17 | Fine, but make skip bigger |
| 24 | minor | Story map | SCENE button at (1172,560) extends past the right panel border (right edge 1248 vs panel 1250), and sits right next to "Not cleared yet" | shot-18 | Add margin |
| 25 | minor | Story map | Title strip says "Story 2% complete · ★ 0/36 · 🌶️ 0/12 · 🎁 2/13" in 14-px text that is hard to read against the busy background | shot-18 | Add a darker plate |
| 26 | polish | Story map | Locked chapter 4/8/12 boss tiles have red outlines but no crown hint until you read the name | shot-18 | Fine; label "BOSS" |
| 27 | minor | Story pre-match | Squidgeon's dialogue panel covers the map and the right-hand "PLAY" button; the speaker's art overlaps chapter tile 7/8 text | shot-24 | Dim the map more |
| 28 | minor | Defeat card | Large empty gap between the "DEFEATED" title and the text (y=140-270) | shot-27 | Put the rival art or stars there |
| 29 | polish | Chapter Clear | Reward line "UNLOCKED: SLOBA" icon is tiny next to the New Kaiju reveal that already appeared | shot-31 | Fine; add "see in Gallery" |
| 30 | polish | NEW KAIJU reveal | Chapter Clear card is still visible dimmed behind the reveal (shows "NEXT / REPLAY / MAP" ghosted behind SLOBA's art) | shot-30 | Fade the card fully before the reveal |
| 31 | minor | Pantry | Lifeline shows "🪙 245 🏷 −30% today" but never the original price, so the discount is unverifiable | shot-34 | Show the strike-through price |
| 32 | minor | Pantry | Weekly orders: "New orders every Monday" but no countdown ("resets in 3 days") | shot-32 | Add timer |
| 33 | minor | Pantry | Buying Toffee colour gave no Chef Rank progress and no toast; the shop doesn't say colours are cosmetic only | shot-34 | Show a "+1 colour" toast |
| 34 | polish | Pantry | "✔ OWNED" card loses its description and swatch preview | shot-34 | Keep the preview |
| 35 | polish | Pantry | Chef Rank text at left bottom uses the heading font at small size, harder to read than the rest | shot-32 | Use body font |
| 36 | major | Gallery | Mastery reward ladder is only icons: "Rewards: ✔✨ 🔒⭐ 🔒🪙 🔒🍽 🔒👑 🔒✨" with no level numbers or names, so I can't tell what Lv 3 or Lv 5 give | shot-35 | Label each rung with level and reward |
| 37 | minor | Gallery | "Matches: 4 · Wins: 3" for Gobzilla but Records showed 5 played; per-kaiju counts exclude Practice and Free Play seat changes without saying so | shot-35 | Footnote |
| 38 | minor | Gallery | Collection line "Collection 59% 🐉 15/20 · 🍽 14/18 · 🎨 6/21" is tiny and top-right (small font at 1250,52) | shot-35 | Larger |
| 39 | minor | Gallery | After clicking a locked kaiju the colour row still shows classic swatch (wearing) for the "???" kaiju | shot-36 | Hide colour row for locked kaiju |
| 40 | minor | Daily | Starting Daily jumps straight into the match; no countdown screen listing the rivals' levels was visible beyond the in-match banner "3 rivals (normal, easy, easy)" | shot-38 | Add the intro screen |
| 41 | minor | Daily | In-match intro banner "📅 DAILY · 3 rivals … Picnic Blanket" is white text on the red-checked table and overlaps the spawn pad on the left | shot-38 | Add a dark backing plate |
| 42 | major | Daily | Hot Dumpling Daily lasted 6+ rounds (my harness time about 40 s); "best 1 round · tries 1 · win streak 0 days" | shot-42 | First to 2 |
| 43 | minor | Daily result | "🥉 Bronze daily medal (for playing today: win for 🥈)" wraps awkwardly, medal emoji on one line, "win for 🥈 )" with a stray space | shot-42 | Reword |
| 44 | minor | Title | "NEW HERE? 1-MINUTE PRACTICE ▶" button overlaps the middle kaiju art and sits very close to the big six mode buttons | shot-1 | Move higher |
| 45 | polish | Title | Top-right buttons (SETTINGS, HELP, KAIJU, RECORDS, PANTRY, WORKSHOP) use 11-px text | shot-1 | Bigger |
| 46 | polish | Title | After Challenges popup closes, background is dimmed and the NEXT UP box is cut behind the popup | shot-37 | Fine |
| 47 | polish | Pause | Pause menu "QUIT" went straight to title with no confirmation in Practice (brief mentions the quit confirmation) | shot-16 | Check confirmation exists in all modes |
| 48 | minor | Records | Pin has no way to un-pin that is visible (no tooltip) and the pinned row looks like a hover highlight (blue outline) | shot-5 | Show "📌 pinned" label |

## 🔠 Text and layout check
- **Title**: OK, but the NEXT UP box is tight and 11-px top buttons (shot-1). Practice button sits close to the mode buttons.
- **Records pages 1 / 2 / 3**: OK, no overlap; the footer wraps to two lines but stays inside; page 3 mostly empty (shot-2, shot-3, shot-4, shot-5).
- **Free Play setup**: OK; the unlock text is small (shot-7).
- **In-match (Picnic Blanket, Sunday Roast)**: OK; countdown tip text sits over the table (shot-8). Daily banner overlaps spawn pad (shot-38).
- **Match end (1v1, 4-player, Daily)**: no overlap, but the THIS MATCH panel is crammed against SHARE and the awards strip runs through the table border (shot-11, shot-12, shot-19, shot-42).
- **Pause menu**: OK (shot-16).
- **Story map**: SCENE button touches the panel edge (shot-18); dialogue overlay covers the map (shot-24).
- **Chapter Clear / Defeated cards**: OK; empty gap on Defeated (shot-23, shot-27, shot-31).
- **NEW KAIJU reveal**: ghosted card behind (shot-30).
- **Pantry**: OK (shot-32, shot-34).
- **Gallery**: OK; reward ladder is icon-only, collection line small (shot-35, shot-36).
- **Challenges popup**: OK (shot-37).
- **Cutscene**: caption small (shot-17).
- No text overlapping other text, no stacked buttons found.

## The single biggest structural problem
Achievements are a good system on paper, but the player can't plan around them. Colour rewards are hidden in the Gallery, grind goals give no ETA, and the main grind tool (autoplay) is slow and loses my mode and kaiju. A few achievements are too easy (Clean Sweep, World Tour) and so feel meaningless, while others are huge with no pacing. Add a blocked starter goal (Practice step 6) and the new-save "NEXT UP" list feels broken at its start.

## Big change proposals (2-3, most important first)
### Proposal 1: Achievement Planner
- **Problem it solves:** I can't see what to chase, how long it takes, or what colour I'm earning.
- **How it would work (detailed design):** Records gets a "PLAN" tab. Rows are grouped Easy (under 3 matches), Medium (3-10), Grind (10+), each with estimated matches from my own averages. Pins allow 3 goals. Each row shows the colour swatch it unlocks. Post-match panel shows deltas ("+49 crumbs"). Gallery swatches link back to the row.
- **Example moment:** I finish a match, the panel says "Crumb Muncher 71/100 (+49) · about 1 match left" and the Gallery swatch for Lime shows "Win a match 0/1".
- **Rewards / progression hooks:** Completing 3 pinned goals in a day gives a bonus 50 🪙 "Planner" order in Pantry.
- **Risks and edge cases:** Estimates need an average of at least 3 matches.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: Grind Mode (Fast bot match)
- **Problem it solves:** Autoplay takes 40-55 s per match and changes the setup.
- **How it would work (detailed design):** A "⏩ GRIND" toggle on Free Play and Story setup runs matches at ×3 with a bot in your seat, same kaiju and mode, then shows one summary ("5 matches, 3 wins, +212 🪙, 2 achievements"). Caps at 10 matches per run; Daily and Gauntlet are excluded so skill still matters there.
- **Example moment:** I pin Bottomless Belly (0/1000), press GRIND ×10, come back to a summary with 380 crumbs and a toast row.
- **Rewards / progression hooks:** Grind matches pay 50% tokens to keep real play valuable.
- **Risks and edge cases:** Needs to be blocked from Online; half pay avoids exploit.
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: Achievement tiers and fixes
- **Problem it solves:** Some achievements are trivial and the others have no mid-way rewards.
- **How it would work (detailed design):** Make Clean Sweep and World Tour harder as above, then give every numeric goal Bronze / Silver / Gold steps (e.g. crumbs 100 / 400 / 1,000 already exist as separate rows, so fold them into one row with 3 ticks). Gold gives the colour.
- **Example moment:** One Crumb row, one bar with three notches, the third gives Lava.
- **Rewards / progression hooks:** 10 / 30 / 60 🪙 per tier.
- **Risks and edge cases:** Existing saves need migrating to tiers.
- **Size:** L
- **Score impact for me:** +0.5

## How this round's new features felt
- **🏆 Achievement toasts:** the toast is fast and readable ("🏆 Clean Sweep! +30 🪙", top right, not overlapping), but only one is shown per match even when 3 were earned. The panel lists all, which is good. Feels 7/10.
- **🎁 NEW KAIJU toast:** the reveal is lovely; a ghosted Chapter Clear card behind it is the only blemish.
- **🌱 4 kaiju / 2 tables locked:** works. The Gallery shows exact requirements for kaiju ("Win 5 matches in any mode (you have 3/5)"), and Free Play says "12/20 kaiju" and "5 more to unlock". For an achiever this is the best-explained part of the game. Unlocks came quick (Sloba after ch2). The locked tables don't say how to unlock.
- **Pantry orders show payout:** yes ("Knock out 20 rivals · 40 🪙", "✔ ... +40 🪙 paid"). Weekly timer missing.
- **SHINY / Pantry second tap:** works and shows price; I did not hit a refusal message (I had enough tokens). The Gallery SHINY button says "300 🪙 · needs Lv 3" which is a clear refusal reason.
- **Fairness: bots don't attack first 1.4 s, round-end banner:** the banner says nothing about when I went out on screen; only the panel line "Knocked out by: …". Partial.
- **Daily rivals' levels:** the in-match banner names them ("normal, easy, easy"), good, but the Daily is too long.
- **Gallery power reach/cooldown:** shown ("reach 207 · every 1.6 s"). Mastery ladder is icon-only.
- **Practice SWIPE step:** blocked for me at 6/8.
- **At most 3 pop-ups:** I never saw more than 1.

## Bugs that block play
- Practice step 6/8 "SWIPE up close" does not complete, so the "Finish the 1-minute Practice (+20 🪙)" goal on the title can't be finished (shot-15). Could be harness-specific, but there was no visible feedback on what was missing.
- `/autoplay` after starting a Story chapter ran a different mode and kaiju (shot-13, shot-19).
