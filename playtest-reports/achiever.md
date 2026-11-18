# Playtest evaluation — The Achiever

**Fun score: 7.5 / 10** (Records, pins, receipts and colour hints are a good completionist loop, but the grind is slow, rank points are unexplained, and several achievements/quests lack clear payoff moments)

> Bar this round: 9/10 from EVERY profile. Screenshot root: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r7-7101\` (shot-N.png).

## What I did
- About 95 harness commands, roughly 35 minutes of game time (autoplay dominated: ~3m for 3 matches, ~3.5m for 5 matches).
- Screens visited: Title, Records (both pages), Pantry (twice, bought Toffee and Lifeline), Gallery (colour tooltip, Move Lab), Challenges popup, Trials, Settings, Story map + opening cutscene, Free Play setup, Party Modes setup, Workshop, Daily, 1-minute Practice, plus match result screens.
- Matches: 1-minute Practice (completed), Free Play (1 win, 3 autoplay losses), Trials Hard Duel x2 (both failed, 0 KOs), Story ch1 (cleared 3 stars via bot), Team Feast (lost), Party Cup game 1 + 5 autoplayed games, Daily Hot Dumpling (won, silver).
- Pinned "Plot Twist", won it first match (twist TURBO). End state: Records 6/34 on page check, then Table Maker, Not It!, Daily Special added = about 9/34; 15+ matches played, 3 wins; Chef Rank Line Cook, Mastery Lv 2; First Service 5/6.
- `/errors` at start, middle and end: none.

## What worked for me
- Pin system: clicking a locked achievement pinned it and it immediately showed on the title NEXT UP and again on the result receipt (shot-10, shot-14). This is exactly the achiever hook.
- Locked colour swatches in Gallery tell me the exact unlock ("Ocean: Regular Diner: Win 10 matches (1/10)").
- Records page has progress bars with counts (0/250, 271/1000) and a live "Next up" line (shot-16, shot-35).
- Receipt "THIS MATCH" lists each new achievement with +30 and the colour won (shot-14, shot-27, shot-40).
- Daily starts instantly (no setup), gives a medal, and tells me what gets gold.
- Pantry weekly orders have clear bars and green completion state; 30%-off deal is clearly tagged.
- Practice complete card with three next-step buttons is clear and well laid out (shot-9).
- Workshop save gave an instant "Table Maker unlocked!" (but see issues).
- Move Lab works and is a great way to test a power with no stakes.

## 🧾 Exactly what would make this a 9/10 for me
1. **Shorten/clarify grind time for big counters.** Where: Records + autoplay-pace equivalent in normal play. Cutlery Drawer (250 KOs) and Bottomless Belly (1000 crumbs) took ~35 min to reach 29 and 271. Add a visible estimate on the progress line ("~34 more matches at your pace") and lower the top counters (e.g. 150 KOs, 600 crumbs) or add mid-tier achievements (50 KOs, 500 crumbs) so there is a payoff every ~10 minutes. Impact +0.6.
2. **Explain Chef Rank points.** Where: Records "Next rank: Sous Chef at 24 pts (15)" and Pantry footer. Add a "How rank points work" line/popup ("+1 per match, +2 per win, +3 per achievement...") and show a progress bar. Right now "pts" has no source. Impact +0.5.
3. **A real achievement unlock moment.** Where: everywhere. Unlock when it happens (toast with sound and the colour swatch), not only in the next receipt. Table Maker was announced in Workshop in small grey text, then paid +30 in a Daily receipt 8 commands later; the token total in the receipt is shown before the achievement payout (receipt said 106, Records said 166). Show the real final total. Impact +0.5.
4. **Records usability for completionists.** Add filters/sort (In progress / Locked / Done), show unlocked date, show the 30 🪙 and the colour reward on every row, and show which achievements need a mode (Team Feast, Crumb Rush, Golden Spoon) with a "PLAY IT" button that jumps straight into that mode with sensible settings. Impact +0.6.
5. **Make achievements reachable without luck.** "Win 3/5 in a row", "Win a match" etc. depend on bot RNG. Provide a way to farm them: e.g. a Free Play "Achievement mode" with a rivals-EASY button on the Records row. In my run I lost 5 of 6 unassisted matches at NORMAL. Impact +0.5.
6. **Trials need a clearer ramp and a first win.** Hard Duel (the first Trial) beat me twice with 0 KOs at the bot's hand; first Trial should be winnable by a new player. Also Trials give no Records achievement; add "Earn 5/12/24 Trial stars" achievements. Impact +0.4.
7. **Fix overlaps on result screens.** First Service banner is hidden behind the winner title (shot-14, shot-32). Impact +0.3.
8. **Duplicate kaiju/name confusion.** Results show "SLOBA / SLOBA (YOU)" and "GOBZILLA" vs "GOBZILLA JR." — achievers read these screens. Unique names per match, one name per kaiju. Impact +0.2.
9. **Hint text matches reality.** Practice hint stuck on "SWIPE up close" while steps went 4/8 to 7/8; Move Lab says "Esc to leave" but Esc opens a PAUSE menu. Impact +0.2.
10. **Pantry deal clarity.** After buying the 30%-off Lifeline, the deal silently moved to another item (Matcha 168, was 240). State "New deal after each purchase" or make it per-day fixed. Impact +0.2.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Records | Grind pace: 15 matches gave 29 KOs and 271 crumbs, so Cutlery Drawer (250) / Bottomless Belly (1000) need ~100+ matches; no ETA anywhere | shot-35 | Mid-tier achievements, lower targets, ETA text |
| 2 | major | Records, Pantry | "Next rank: Prep Cook at 6 pts (0)" / "Sous Chef at 24 pts (15)": no explanation of what a point is or how earned | shot-2, shot-35, shot-36 | Add rank points breakdown + progress bar |
| 3 | major | Match result (Free Play) | First Service banner ("FIRST SERVICE: PLAY ANY PARTY MODE ✓ +25") is behind the big winner title text, unreadable | shot-14, shot-32 | Move banner below title or to the top bar, or queue it after |
| 4 | major | Trials | First Trial "Hard Duel" is too hard: lost twice with 0 KOs vs a HARD Pizzaraptor, even with a bot playing; no easier entry | shot-23 | Sort Trials by difficulty; make #1 NORMAL |
| 5 | major | Receipt / Pantry | Token total in the receipt excludes the achievement payouts shown in the same box ("+21 Chef Tokens (106)" then Records says 166) | shot-14, shot-16 | Show final total after bonuses |
| 6 | minor | Achievement unlock timing | Table Maker unlock in Workshop appears only as small grey line; payout appears later in a Daily receipt | shot-38, shot-40 | Toast at unlock, pay immediately, show it once |
| 7 | minor | Records | Pinned achievement not marked as pinned on its row on page 2 except via pin icon replacing lock; and the "Next up" footer still names First Bite, not the pinned one | shot-4 | Footer should show the pinned achievement |
| 8 | minor | Records | No filter/sort; unlocked and locked mixed in fixed order, page 1/2 only via PAGE button with no page indicator ("1/2") | shot-2, shot-3 | Add page counter and filter tabs |
| 9 | minor | Records | Achievement rows show colour reward but not the 30 🪙 per row; only a footnote says each pays 30 | shot-2 | Show +30 on each row |
| 10 | minor | Records | Footer text "Click any locked one to 📌 pin it (shown on the title + after matches). Each achievement pays 30 🪙." wraps to 2 lines close to bottom pill area and is small | shot-2 | Shorten, put in header |
| 11 | minor | Records | Achievements with no progress bar (Better Together, Speed Eater, Not It!, Daily Special) give no clue how to try them | shot-2 | Add "PLAY" shortcut |
| 12 | minor | Title | NEXT UP block text is small and sits directly over character art (fork/elephant) with only a drop shadow; low contrast, hard to read | shot-1, shot-10 | Add a dark panel behind it |
| 13 | minor | Title | NEXT UP line is truncated in `/look` ("...→ 🎨 L") and in 4 lines wraps over lines of art; text uneven width | shot-10 | Fixed-size panel with 3 rows |
| 14 | minor | Practice | Hint "SWIPE up close F / X / SWIPE" stayed for steps 4/8 to 7/8 even though I had swiped; unclear what step 7 wanted (belly fill and stomp, per the later completion) | shot-8 | Update hint per step |
| 15 | minor | Practice | Practice never ends by itself; rival has 0 KOs forever and I got 8 KOs; unclear when "done" | shot-8 | Show step list |
| 16 | minor | Free Play setup | "FIRST TO" cycles 3, 5, 7, 10, 1 (a wrap): getting to 1 takes 4 clicks, no reverse | shot-13 | Left/right click or arrows |
| 17 | minor | Free Play setup | Bot difficulty line "Bot difficulty: NORMAL · Up to 6 players..." sits on busy background art; readable but crowded | shot-11 | Dark strip behind |
| 18 | minor | Free Play setup | Settings do not reset/are remembered silently (autoplay reused 4 seats, Brutal bot level) so my "Normal" run was Brutal | shot-13 | Show a summary on PLAY |
| 19 | minor | Gallery | Kaiju name "GOBZILLA JR." in detail card vs "GOBZILLA" on grid, HUD, results; "Matches: 1 · Wins: 1" fine | shot-17 | Pick one name |
| 20 | polish | Gallery | "Mastery ★★★★★★★ Lv 1 Rookie (37/60 XP) · next: ✨ Dash sparkles" wraps; stars row long | shot-17 | Compact to "Lv 1 / next: Sparkles" |
| 21 | minor | Move Lab | Banner says "Esc to leave" but Esc opens PAUSED menu (need QUIT as a second step) | shot-19, shot-20 | Make Esc leave, or fix banner |
| 22 | polish | Move Lab | Banner sits on the table edge, text over the board's top rail | shot-19 | Push below top bar |
| 23 | minor | Challenges popup | Tile says "🔒 clear wave 4" but footer says "reach a course's boss wave"; inconsistent rule | shot-21 | One wording |
| 24 | polish | Challenges popup | Title and tiles from the title screen are visible dimmed through the popup, "KITCHEN KAIJU" bleeding behind | shot-21 | Dim more |
| 25 | minor | Trials | Descriptions are 3-line dense ("You: ... vs ... · ★★★: 4+ KOs"), the ★★★ requirement wraps to a new line mid-phrase; "boom-rang twist" odd hyphen | shot-22 | Structure into separate lines |
| 26 | minor | Trials | No Records achievement for Trial stars; 24★ total has no reward beyond 20 🪙/star | shot-22 | Add Trial achievements |
| 27 | minor | Trial Failed | Result text ("★ win · ★★ without losing a round · ★★★ also 4+ knockouts (you: 0)") runs across the gravy boat and table edge, full width | shot-23 | Put on a panel |
| 28 | minor | Story map | SCENE button overlaps/touches "Not cleared yet" and the stars legend; panel feels crammed | shot-26 | Move SCENE button |
| 29 | minor | Story map | Snake layout: row 2 runs right to left (8..5) and row 3 left to right; hard to follow; chapter 12 sits under 4 | shot-26 | Keep left-to-right or draw arrows |
| 30 | minor | Story | Opening cutscene plays on first Story open (fine) but PLAY click during it was swallowed and my autoplay then started Free Play | shot-25 | Ignore clicks only on SKIP, or autoplay should respect Story |
| 31 | minor | Result (Free Play) | Duplicate kaiju in one match: "SLOBA", "SLOBA (YOU)" listed as two different seats | shot-27 | Unique kaiju per match |
| 32 | polish | Result | Emote 👋 appears over the title text edge | shot-27 | Keep emotes inside the table |
| 33 | polish | Party Cup standings | "1 pts" grammar; medal icons 2/3/4 covered by kaiju sprite | shot-34 | "1 pt"; icons in a column |
| 34 | minor | Party Cup | PARTY CUP pill from the Party Modes setup starts the cup immediately in some flows without a confirmation; CUP LENGTH click then lands in the game | shot-33 | Confirm / keep setup |
| 35 | minor | Party Cup | Autoplay of a cup went to Free Play-style results by game 5 ("BLOBLIN RULES THE TABLE", no cup final shown), so I could not verify the final x2 or Cup Shelf | shot-34 | Check autoplay/cup state |
| 36 | minor | Pantry | After buying the 30%-off Lifeline the deal moved to Lunchbox then Matcha; players cannot plan | shot-5, shot-36 | Fix per-day deal |
| 37 | minor | Pantry | Lifeline card text ("245 🏷 TODAY 30% OFF (was 350) (not enough yet)") wraps to 3 lines and is cramped | shot-5 | Separate price tag line |
| 38 | polish | Pantry | Weekly order completion shows green check but no "+40 paid" text | shot-36 | Show payout |
| 39 | polish | Pantry | Footer line "Colours you buy appear in the KAIJU Gallery" is small, grey on dark | shot-5 | Lighten |
| 40 | polish | Workshop | "Saved! 🏆 Table Maker unlocked!" message is small, grey, below the table | shot-38 | Toast |
| 41 | minor | Daily result | "Silver daily medal (win without dropping a round for 🥇)" while "best 3 rounds" line is also shown; unclear how a first-to-3 win has "dropping a round" | shot-40 | Plain wording |
| 42 | polish | Settings | Rows are packed with ~2px gap; OK but dense; KEYBOARD CONTROLS and BACK UP buttons close to bottom hint | shot-24 | Add spacing |
| 43 | polish | Free Play setup | "16/20 kaiju (unlock more in Story)" but title/brief says 20 kaiju; Gallery shows 4 ??? silhouettes with no unlock hint | shot-17 | Show how to unlock |
| 44 | polish | Gallery | 21 colour slots mostly locked padlocks; need to click each to learn the rule | shot-17 | Show hints on hover list |

## 🔠 Text and layout check
- Title: NEXT UP text low contrast over art (shot-1, shot-10); buttons OK; "Teams · Rush · Dumpling" wraps to 2 lines inside PARTY MODES button but fits.
- Records page 1 and 2: OK, no overlaps; footer small (shot-2, shot-3, shot-4, shot-16, shot-35).
- Pantry: Lifeline card crowded (shot-5); rest OK (shot-36).
- Gallery: OK; detail text wraps to the card bottom edge (shot-17).
- Move Lab: banner on board edge (shot-19). Pause menu OK (shot-20).
- Challenges popup: OK; inconsistent wording (shot-21).
- Trials: dense but not overflowing (shot-22).
- Trial Failed: text over table, no panel (shot-23).
- Settings: OK (shot-24).
- Story map: SCENE button touches status text (shot-26). Opening cutscene: caption "THE GRAND FEAST" over plate OK (shot-25).
- Free Play / Party Modes setup: info text over art; Party Cup footnote close to HOUSE RULES pill but no overlap (shot-11, shot-13, shot-31).
- Result screens: First Service banner hidden by title (shot-14, shot-32); emote over title (shot-27); standings OK (shot-34); Daily receipt panel OK but wraps heavily (shot-40).
- Workshop: OK (shot-38).
- Practice HUD and in-match HUD: OK (shot-7, shot-8, shot-9).

## The single biggest structural problem
The achiever loop has no pacing control. Big counters (250 KOs, 1000 crumbs, 50 wins) are 100+ matches away, there is no mid-tier reward, no estimate, and no means of steering toward a specific achievement. The only accelerator, autoplay, is a harness tool; a real player must play each match by hand, and I still lost most at NORMAL. The result is a long flat stretch between early instant unlocks and the late ones, with the Chef Rank points hiding the one sense of progress that could fill it.

## Big change proposals

### Proposal 1: Goal Tracker with live ETA and "Play for this"
- **Problem it solves:** unclear/slow requirements (issues 1, 2, 7, 11), unreachable achievements.
- **How it would work:** Records gets a left filter strip (All / In progress / Locked / Done). Every row shows reward (+30 🪙 and colour swatch) and a PLAY button for mode-based ones. Pinned achievement shows a big card at the top: bar, "about N matches left at your pace" (average from last 10 matches), and a "PLAY FOR THIS" button which starts a mode with the right settings (Team Feast, Crumb Rush, EASY bots, First to 1 for quick wins, etc.). Rank points get their own header with a legend popup.
- **Example moment:** I pin Bottomless Belly, see "729 crumbs left ~ 18 matches", press PLAY FOR THIS, Crumb Rush starts, and the receipt says "+41 of 729".
- **Rewards / progression hooks:** bonus +10 🪙 for completing the pinned one; streak for completing pins.
- **Risks and edge cases:** ETA with little data (hide until 5 matches); mode-specific settings colliding with House Rules.
- **Size:** M
- **Score impact for me:** +0.9

### Proposal 2: Instant unlock toasts + final receipt totals
- **Problem it solves:** issues 3, 5, 6, 38.
- **How it would work:** any achievement/order/rank-up fires an in-game toast (top centre, 2 s) with icon, name, +30 🪙 and colour swatch; coins are added at that moment. Receipt lists all items and a single final total ("Chef Tokens 166"). First Service steps use the same toast style and never sit behind the winner title.
- **Example moment:** I save a Workshop table: toast "Table Maker +30 🪙" and the coin counter ticks.
- **Rewards / progression hooks:** collectible toast history ("Recent") on Records.
- **Risks and edge cases:** multiple unlocks at once need a queue; reduced-effects setting should shorten.
- **Size:** S
- **Score impact for me:** +0.5

### Proposal 3: Mid-tier ladder for every counter
- **Problem it solves:** the flat grind between unlocks (issue 1).
- **How it would work:** each counter gets tiers (KOs 25/100/250/500; crumbs 100/400/1000; wins 1/10/25/50; Trials ★ 6/12/24). Each tier is a separate achievement with a coin reward (30/40/60) and a small cosmetic (badge, frame colour). Tiers show on a single row as pips.
- **Example moment:** at 100 KOs I get a badge halfway to Cutlery Drawer.
- **Rewards / progression hooks:** badges on Gallery frames and result screen names.
- **Risks and edge cases:** coin inflation; keep Pantry prices in step.
- **Size:** M
- **Score impact for me:** +0.6

## How this round's new features felt
- **Progression (mastery, rank, achievements, pin, daily deal, receipts):** pin and receipts are great. Mastery: I reached Lv 2 Line Cook in ~15 matches and saw "next: Dash sparkles", which is clear. Chef Rank is the weak point: "pts" is never explained. Achievements pay 30 🪙; since a single colour costs 40-400, the loop makes sense. The 30% deal moved after I bought it. Cheap colours (40/70) are nice early targets.
- **First Service:** helpful on title (2/6 then 4/6 then 5/6) but I did not find where it listed all 6 steps; the banner hid behind the winner title. I did not complete the 6th step (not reached) in this run.
- **Challenges / Trials / Move Lab:** Trials screen is well laid out; difficulty is steep (lost twice). Move Lab is excellent but Esc behaviour conflicts with banner. Gauntlet checkpoint tiles are locked and the lock wording is inconsistent.
- **Double twists:** only saw TWIST cycle singles (NONE, KAIJU FRENZY, TURBO); did not reach combos in my 3 clicks.
- **Party Cup:** standings screen is nice; "1 pts" grammar. Could not verify the final x2 / Cup Shelf / NEW CUP because autoplay drifted out of the cup.
- **Story:** opening cutscene looks great, but click-swallowing and the SCENE button crowd the chapter panel. Boss phase 2 and Kid Mode not tested (KID MODE toggle exists in Settings with a clear description).
- **Workshop:** COPY CODE / PASTE CODE visible and tidy; saving is an easy achievement.
- **Text/layout audit:** mostly clean; the overlaps I found are listed above.

## Bugs that block play
- None blocking. No JavaScript errors in `/errors` at start, middle or end.
- Near-bug: Story PLAY click during the opening cutscene was swallowed, then `/autoplay` launched Free Play rather than the Story (issue 30).
- Near-bug: Party Cup via autoplay did not appear to continue through the six games (issue 35).
