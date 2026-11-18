# Playtest evaluation — The Challenge Seeker (challenger)

**Fun score: 7.0 / 10** (Trials, Gauntlet and the post-loss coaching are the right ingredients. But the hard content is thin: Spicy is barely tougher, the Daily is one match that never changes shape, and Records/Title don't track challenge progress. A real layout bug on GAUNTLET OVER also hurts.)

> Screenshot folder: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r7-7108\` (shot-N.png). Harness commands used: about 118.

## What I did
- **Title (shot-1, shot-33):** read First Service / NEXT UP, then opened the CHALLENGES card (shot-2) and TRIALS (shot-3).
- **Trials:**
  - Played Hard Duel (GOBZILLA vs PIZZARAPTOR hard) twice. Fail 1-3, then win 3-1 for ★☆☆ (+20 🪙 and the First Bite / Lime unlock, shot-5, shot-7).
  - Played Brutal Bot (NORIGON vs BUBBLEGUMBO brutal) and was swept 0-3 by the AI-piloted hard bot (TRIAL FAILED).
- **Daily Challenge (Hot Dumpling, Picnic Blanket, 3 hard rivals):** won 3 rounds to 2, silver medal, streak 1 (shot-10, shot-13). The match ran 7 rounds.
- **Story:**
  - Skipped the opening cutscene (shot-14, shot-15).
  - Cleared ch 1 for ★★★ (shot-17, shot-18).
  - Toggled SPICY on ch 1: first attempt lost, then won on a retry with the plain `attack` cmd (shot-19, shot-20).
  - Cleared ch 2. Ch 3 was lost once, then unlocked.
  - Story stands at Ch 3/12, ★5. I never reached Second Helpings or the Dessert Course.
- **Free Play setup (shot-16):**
  - Cycled BOT LEVEL (Easy / Normal / Hard / Brutal).
  - Cycled all ~20 TWIST values, including the ⚡⚡ doubles (e.g. ICE RINK + TURBO, FISTS ONLY + ICE RINK).
- **Records (both pages) and Pantry:**
  - Pinned "Ghost Pepper" as the achievement to chase (shot-25, shot-26, shot-27).
  - Bought Lifeline and Lunchbox for Gauntlet runs.
- **Gauntlet:**
  - Two long runs from STARTERS. Run 1 ended around wave 6-7. Run 2 reached wave 10, score 1210, GRADE A, "NEW BEST!".
  - Used the perk picker (1/2/3) over about 12 waves.
  - Checkpoints opened: MAINS "start at wave 5" and DESSERTS "start at wave 9" (shot-28 to shot-32).
- **Pause menu:** opened and tested QUIT (shot-23).
- **Matches:** about 30 (Trials, Daily, Free Play via autoplay, Story, Gauntlet waves).
- **Time:** roughly 1.5 h of harness time. `/errors` was `none` at the start, middle and end.

## What worked for me
- **Trials are the best thing in the game for a challenge seeker.**
  - Eight authored fights, each with a clear identity.
  - The 3-star rubric is simple: win / no round lost / knockout goal.
  - 20 🪙 per new star is a fair carrot.
  - The "TRIAL FAILED" card shows my KO count against the ★★★ goal ("you: 1").
- **The Brutal Bot trial is genuinely brutal.** A hard-bot-in-my-seat was swept 0-3, and kaiju-flatten deaths are readable. This is what "hard but fair" should feel like.
- **Post-loss coaching is excellent.**
  - Story defeat card (shot-20): "What beat you: A KAIJU flattened you. Step out of the ring before each stomp, then punish the dizzy shrink."
  - The receipt repeats a tip ("DASH sideways when you see a charge line…").
- **Gauntlet is moreish.**
  - The perk pick (Full Belly / Ghost Start / Extra Life) after every wave makes each run feel different.
  - Pantry perks (Lunchbox, Lifeline) feed it.
  - The grade ladder (C 350 · B 650 · A 1000 · S 1500) gives a clear target. I finished A and instantly wanted S.
  - Checkpoints let me restart at wave 5 or 9.
- **Daily result card** ranks all four fighters by rounds and KOs, shows a streak, gives a silver medal and a "Daily Special +30". A satisfying wrap-up.
- **Pin an achievement** works and surfaces on the title and in receipts ("📌 Ghost Pepper: 1/12"). Nice goal tracking.
- **Twist list is huge:** doubles, Brutal bots, and Fists Only + Ice Rink give plenty of self-made challenge options.
- **Cheap Pantry daily deal** (Lifeline 30% off) is a good nudge to come back.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make SPICY really spicy and show what it changes (+0.5).**
   - **Where:** Story chapter panel, SPICY toggle (shot-19).
   - **How:** SPICY ch 1 was beaten by the dumb `attack` cmd on the second try, with the same rival card ("CRABBAGE easy") before and after toggling.
   - Replace the toggle's "(tougher rivals)" with a visible list. Example: "CRABBAGE hard · +1 rival · first to 3 · Spicy twist: Boomerangs".
   - Update the RIVALS row live when toggled.
   - Each Spicy chapter should also carry a unique modifier, not just a bot-level bump.
   - Reward: a bigger payout (e.g. x2 🪙) and a flame badge on the chapter node.
2. **Add a Challenge Ladder on the Challenges card: Daily Streak, Trial stars, Gauntlet grades, Spicy count (+0.5).**
   - **Where:** CHALLENGES card and Records.
   - **How:** Records currently shows only "Gauntlet best wave 0/10" in stats (shot-25). It shows nothing about Trials, Daily streak/medals or Spicy chapters.
   - Add a "CHALLENGES" stats block: Trials ★ x/24, Daily streak and best streak, medals (bronze/silver/gold), Spicy clears 1/12, Gauntlet best score + grade.
   - Add achievements for these: "Trial Tamer" at 12★, "Perfect Eight" at 24★, "Gauntlet S-grade", "Brutal Slayer".
   - Currently the only challenge achievements are Gauntlet Runner/Master, Daily Special/Regular, Ghost Pepper and Feeling Spicy. None cover Trials.
3. **Fix the GAUNTLET OVER perks overflow and the stacked text (+0.4).**
   - **Where:** Gauntlet result, shot-31.
   - **How:** the "Perks: …" line is a single unwrapped line that runs off BOTH screen edges ("rks: 🌶️ Hot Feet, …" and "…Full Be"). "🏅 NEW BEST!" is hidden behind the GAUNTLET OVER title, which is a text-over-text overlap.
   - Group perks as chips with counts ("👻 Ghost Start x3 · 🌶️ Hot Feet x2 …") on two lines max.
   - Place NEW BEST below the title.
4. **A real Daily with a reason to return (+0.5).**
   - **Where:** Title DAILY tile, Daily start, Daily result.
   - **How:** Today's Daily was a plain Hot Dumpling fixed 4-player match. The start banner is one line ("📅 DAILY CHALLENGE · win this match…") over the ant column (shot-10).
   - Add a daily modifier banner ("Today: Hot Dumpling + Ice Rink · 3 hard rivals").
   - Give a 3-tier medal goal (bronze win / silver no-round-lost / gold also 5+ KOs).
   - Show a streak calendar (7 flame icons), a streak bonus (+10 🪙 per day up to 70), and a "tomorrow's twist" teaser.
   - Add a daily rematch cap or leaderboard so a hard player cares about score. The result today only says "tries 1".
5. **Extend the Trials (+0.4).**
   - **Where:** Trials screen (shot-3).
   - **How:** only 8 trials and 24★. Add a Weekly Trial (rotating, 4★), and "Trial Rush" (all 8 in a row on 3 lives). Show best time/KOs on each card.
   - Display the star you earned and what's missing next to each card, e.g. "★★ no round lost: 1 round dropped".
   - Allow tapping a card to show a preview and a "Practice" button with an easier bot.
6. **Make the ★★★ condition clearer and consistent (+0.3).**
   - **Where:** Trial result (shot-7).
   - **How:** I won 3 rounds with only 2 KOs because rounds can end by a rival falling. The text "also 4+ knockouts" is ambiguous (match or round KOs?).
   - Show a live KO counter/target in the HUD during Trials.
   - The card also says "Knocked out by: 👋 swipe" on a WIN, which is confusing.
7. **Fix layout crowding on Title, Story panel and result screens (+0.3).**
   - See the issue table: title NEXT UP text over the fork art, DAILY/CHALLENGES tile text wrapping to 2-3 lines, the SCENE button clipped against the Story panel edge, and the receipt box bottom-left covering the table.
8. **Harder, differentiated high-end Gauntlet waves (+0.3).**
   - **Where:** Gauntlet waves 7+.
   - **How:** wave 1 is one rival, first to 1 (shot-28). Waves 4-5 spiked, then waves 6-10 were reachable with a plain hard bot.
   - Add Brutal bots from wave 8, named mini-bosses at 4/8/12 (with a Phase 2 like Story bosses), and an S-grade at wave 15+.
   - Show the next wave's preview ("Wave 4: BOSS · 3 rivals · Ice Rink") on the cleared card.
9. **Make Dessert Course and Second Helpings reachable for a challenge seeker (+0.3).**
   - **Where:** Story / Modes.
   - **How:** my "hardest content" path needs 12+6 chapters before the Dessert Course. Offer a "Challenge Pass": clear a Trial ★★ or Gauntlet wave 10 to unlock a Dessert Course preview chapter.
10. **Make Records' "Next rank" readable (+0.1).** Change "Head Chef at 36 pts (30)" to "Head Chef: 30/36 pts".

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | **major** | Gauntlet result | "Perks: 🌶️ Hot Feet, 🍖 Sugar Rush, 🟡 Mustard Coat, 👻 Ghost Start, 👻 Ghost Start, …" is one unwrapped line. It runs off both screen edges ("rks:" on the left, "Full Be" on the right) | shot-31 | Group perks with counts and wrap to 2 lines; clamp to table width |
| 2 | **major** | Gauntlet result | "🏅 NEW BEST!" at y=106 renders partly behind the "GAUNTLET OVER" title: text-on-text overlap | shot-31 | Put NEW BEST under the score line, and stop the title using the same space |
| 3 | **major** | Story chapter panel | SPICY toggle changes nothing visible: rival row still "CRABBAGE easy", no rounds/rivals change shown, and SPICY ch 1 was beaten with the dumb `attack` cmd on the 2nd try | shot-19 | Show spicy rival list/levels and extra modifiers; make Spicy a real step up |
| 4 | **major** | Records | No stats for Trials stars, Daily streak, Daily medals, Spicy chapters. Only "Gauntlet best wave" | shot-25 | Add a Challenges stats block (see checklist 2) |
| 5 | **major** | Records achievements | No Trials achievement at all; challenge achievements are thin (Gauntlet Runner/Master, Daily Special/Regular, Ghost Pepper). Nothing for Gauntlet grade or Brutal | shot-26 | Add Trial Tamer/Perfect Eight/S-grade/Brutal Slayer |
| 6 | minor | Title | The "🎯 NEXT UP" first-service text (13px) sits on the fork art, low contrast. A line overlaps the fork handle ("Win a Team Feast match → Bubblegum" sits over the fork) | shot-33 | Move onto a dark chip or panel, or enlarge and widen to avoid the art |
| 7 | minor | Title tiles | DAILY "Done today ✔ · 1🔥 / streak" wraps to 2 lines with a broken "streak" orphan and the tile heading shifted up. CHALLENGES "Gauntlet (best 10) · 🎯 / Trials 1★" likewise wraps. PARTY MODES wraps to 3 lines | shot-33 | Shorten: "Done ✔ 1🔥" and "Best 10 · 1★"; keep to 2 lines |
| 8 | minor | Story chapter panel | "🎬 SCENE" button's right edge sits on the panel border (x≈1248) and is jammed against "Not cleared yet" / "Best: ★★★" | shot-15, shot-19 | Move SCENE into the panel with 12px margin, or under the stars |
| 9 | minor | Story chapter panel | Kaiju named "GOBZILLA JR." on the map but "GOBZILLA" in match HUDs/trials (same character, 2 names) | shot-15, shot-4 | Use one display name everywhere |
| 10 | minor | Story clear/defeat modal | Large empty gap between title and body in DEFEATED (y 140-270). Body text is hard to find at first glance | shot-20 | Tighten vertical spacing or put an icon of the killer in it |
| 11 | minor | Trial result card | "Knocked out by: 👋 swipe" listed on a TRIAL CLEAR (a win); label reads like I lost | shot-7 | Title it "Rounds you lost to:" or hide on wins |
| 12 | minor | Trial result card | "★★★ also 4+ knockouts (you: 2)" but I won 3 rounds with 2 KOs because falls don't count. Unclear if round KOs or match KOs | shot-7 | Clarify "4+ KOs (cutlery/shove/KAIJU)" and show a live counter in the HUD |
| 13 | minor | Trial/Daily result | Receipt "THIS MATCH" box sits over the playfield bottom-left; text overlaps cutlery/coffee art and is partly covered by the SHARE button area | shot-5, shot-13 | Give the receipt an opaque panel and keep it clear of the SHARE button |
| 14 | minor | Trial result | "1 / START retry · Esc trials" is keyboard jargon; RETRY button exists below but the line is redundant | shot-7 | Remove or say "RETRY below" |
| 15 | minor | Trials list | Card heights/vertical rhythm uneven (title y=150 vs y=141 vs 269 vs 525); 2-line sub-lines in some cards wrap ("4+ / KOs" orphan) | shot-3 | Fixed card height and text clamp; wrap "KOs" with the number |
| 16 | minor | Trials list | Cards show no progress per star (just ☆☆☆), no best time or what's missing | shot-3 | Show "★★ missing: lost 1 round" on each |
| 17 | minor | Daily start | Daily banner "📅 DAILY CHALLENGE · win this match to clear today and keep your 🔥 streak · Picnic Blanket" is a single line across the table, overlapping an ant column and Dumplord's mat; no modifier or reward info | shot-10 | Show a card: rules, difficulty, reward, and keep it clear of spawn mats |
| 18 | minor | Daily result | "Today: won ✔ · best 3 rounds · tries 1 · win streak 1 day" is dense one-liner; "best 3 rounds" unclear | shot-13 | Split into labelled chips (Best / Tries / Streak) |
| 19 | minor | Daily result | Receipt line "🥈 Silver daily medal (win without dropping a round for 🥇)" wraps and is cryptic | shot-13 | "Silver. Gold needs: win with no rounds lost" |
| 20 | minor | Daily match HUD | Hot Dumpling match HUD still shows "Ladle · KOs 0" and no dumpling-holder indicator on the card until it's in the text; players can't tell who holds the dumpling at a glance | shot-10 | Add a persistent dumpling icon to the holder's HUD card |
| 21 | minor | Gauntlet in-match HUD | "GAUNTLET ❤❤ WAVE 6 · BANQUET LAZY SUSAN" is tiny and at the very bottom-left (y=708), hugging the screen edge; hearts hard to see | shot-30 | Move to top-right with larger text, show perks as icons |
| 22 | minor | Gauntlet in-match HUD | Perk icons next to the player name (🌶️🛡️🍖) are tiny and unexplained | shot-30 | Add a hover/legend or show on the wave cleared card |
| 23 | minor | Gauntlet wave cleared | Perk cards overlap the hero kaiju art on the right (Extra Life card over the strawberry) | shot-28 | Shift cards left or hide the art while choosing |
| 24 | minor | Gauntlet wave cleared | Perk-pick is easy to miss: harness `Enter` repeatedly re-showed the picker with no timeout or "press a number" cue beyond a small title | shot-28 | Make cards clickable with keys 1-3 shown on the cards |
| 25 | minor | Gauntlet balance | Wave 1 is one rival, first-to-1, and waves 6-10 felt flatter than waves 4-5 for a hard bot; no named miniboss | shot-28 | Wave boss at 4/8/12 with preview |
| 26 | minor | Gauntlet life screen | "❤❤❤❤ left · trying wave 4 again with your perks…" prints hearts without count; hard to count five hearts | shot-29 | Show "4 lives left" |
| 27 | minor | Records stats | "Next rank: Head Chef at 36 pts (30)" parenthesis unclear; Pantry says "(you have 30)" | shot-25, shot-27 | "30/36 pts" |
| 28 | minor | Records | "Gauntlet best wave 0" is listed after a run; stat only updates after a run ends (it showed 0 until I finished a run) | shot-25 | Update live, or label as "this device" |
| 29 | minor | Records achievements | "Rampage 2/3", "Mix it Up 4/8" progress bars sit above the text; "Dumpling Dodger" bar overlaps the title when titles are long | shot-25 | Right-align progress away from title |
| 30 | polish | Records | "Counts people on this device (not bots)." footnote is tiny (≈11px) | shot-25 | Raise size or remove |
| 31 | polish | Pantry | Footnote "Colours you buy appear in the KAIJU Gallery. Gauntlet items work on every new run." tiny (≈11px), low contrast | shot-27 | Larger or move into the cards |
| 32 | polish | Pantry | Completed weekly orders show "✔ 20/20" but no claimed/paid state or collect button; unclear if the 40 🪙 was paid | shot-27 | Show "+40 🪙 paid" |
| 33 | polish | Pantry | Lifeline deal "🏷 TODAY 30% OFF (was 350)" fits but label crowds the price line | shot-27 | Put the deal tag on a separate line |
| 34 | polish | Title | First Service lists "Finish the 1-minute Practice" first for a returning veteran; NEXT UP stays at 5/6 with a ton of rows beyond what I can see | shot-33 | Collapse completed steps and show only the next two |
| 35 | polish | Free Play setup | Hard/Brutal bot levels are only on a small BOT LEVEL pill; no per-bot difficulty hint for the challenge seeker | shot-16 | Show a difficulty colour per bot seat |
| 36 | polish | Free Play setup | "16/20 kaiju (unlock more in Story)" and "TABLE: ALL 15 … 3 more to unlock" two grey lines of dense text | shot-16 | Merge into one line with icons |
| 37 | polish | Pause menu | PAUSED menu: RESTART in a Trial/Gauntlet gives no confirmation of consequences (life lost? new run?) | shot-23 | Add a one-line note per mode |
| 38 | polish | Story (first entry) | Opening cutscene plays on first entry and the first frame is nearly black (shot-14), with only SKIP visible and "THE GRAND FEAST" | shot-14 | Fade in faster or show title art immediately |
| 39 | polish | Trial fail card | "+11 Chef Tokens" on a fail while 0 shown for "★": the player is told nothing about the best attempt | shot-5 | Show "Best: ☆☆☆" and attempts |
| 40 | polish | Defeat card | Story defeat gives "+51 Chef Tokens" and the full chapter win could be tuned lower, making failure pay almost like winning | shot-20 | Scale loss payout lower than win payout |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- **Title (shot-1, shot-33):**
  - NEXT UP text overlaps the fork art, low contrast, small (issue 6).
  - DAILY and CHALLENGES tiles wrap to 2 lines with orphans, and PARTY MODES wraps to 3 lines (issue 7).
  - Nothing is cut off at the screen edge.
- **Challenges card (shot-2):** OK. Text fits its buttons, the lock states are clear, and nothing overlaps.
- **Trials list (shot-3):** OK for overflow, but card heights are uneven and "KOs" orphans on some cards (issues 15 and 16).
- **Trial intro / match HUD (shot-4):** the tip line "Hold THROW longer…" runs across the full table width over the tablecloth and a coffee cup. It is readable but a little busy.
- **Trial result, fail and clear (shot-5, shot-7):**
  - The receipt box overlaps the table art.
  - The long ★ rule line is wide but within the screen.
  - The gravy boat sits behind the "1 / START retry" line.
  - Nothing is cut off.
- **Daily start (shot-10):** banner overlaps the ant column and Dumplord's mat (issue 17).
- **Daily result (shot-13):** OK on edges. The receipt wraps in a long box over the table, and the bottom award bar is close to both edges.
- **Story map (shot-15, shot-19):** SCENE button crowds the panel edge and "Not cleared yet" (issue 8). The kaiju selector arrow ▶ sits right against the "Seed Spray" text.
- **Chapter clear modal (shot-18):** OK. Spacing is clear.
- **Defeat modal (shot-20):** OK, with a big empty gap (issue 10).
- **Free Play setup (shot-16):** OK. The dense bottom lines are readable.
- **Pause menu (shot-23):** OK.
- **Records both pages (shot-25, shot-26):** OK. The footers are small (issue 30) and the progress bars sit close to the titles (issue 29).
- **Pantry (shot-27):** OK. The deal tag is tight and the footnote is tiny (issues 31 and 33).
- **Gauntlet cleared and perk picker (shot-28):** perk cards overlap the hero art and are crowded with the receipt (issue 23). Otherwise readable.
- **Gauntlet Life Lost (shot-29):** OK.
- **Gauntlet in-match HUD (shot-30):** the small bottom-left wave label hugs the edge (issue 21).
- **GAUNTLET OVER (shot-31):** FAIL. The perks line is cut off at both edges and NEW BEST overlaps the title (issues 1 and 2).
- **Challenges card after progress (shot-32):** OK.

## The single biggest structural problem
The hard content is a pile of good fights that don't connect to anything. Trials, Gauntlet, Daily and Spicy each reward me on their own (stars, grade, medal, ghost-pepper), but nothing tells me my overall standing as a challenger. Records has no Trials/Daily/Spicy stats, the title shows only a tiny line per tile, and Spicy mode, which should be the hardest tier, is a toggle with no visible changes and fell to a basic bot on the second try. So even after Gauntlet wave 10 grade A, I had no "next big goal" beyond "get more stars".

Second, the repeat loop is thin. The Daily is a different mode each day but one match. Trials are 8 fixed fights. Gauntlet has no S-grade guidance beyond a score number. A challenge seeker wants a ladder with named rungs and a weekly rotation.

## Big change proposals (2–3, most important first)
### Proposal 1: Challenger Ladder (unified rank and hub)
- **Problem it solves:** challenge content is scattered and unrewarded as a whole. Players cannot see progress across Trials, Gauntlet, Daily and Spicy.
- **How it would work (detailed design):**
  - Add a "CHALLENGER RANK" ladder (Bronze to Silver to Gold to Platinum to Brutal Chef) fed by Trial stars (1 pt each), Gauntlet grade (C=2, B=4, A=6, S=10 per best), Daily gold medals (1 pt each), and Spicy chapters (2 pts each).
  - The CHALLENGES card becomes a hub with four rows, each with its progress bar and rank points. Tapping a row jumps to that mode.
  - Records gets a matching "CHALLENGES" stats panel. The Pantry sells challenger-only cosmetics (e.g. a flame aura, a "Hard Mode" title) at rank thresholds.
  - The title tile shows "RANK: GOLD · 38 pts" instead of the wrapped Gauntlet/Trials line.
- **Example moment:** I clear Trial 5 with ★★★, the receipt says "+1 Challenger pt → 24/30 for PLATINUM". I open CHALLENGES and see the next thing to chase: "Gauntlet S-grade = +10 pts".
- **Rewards / progression hooks:** crown aura on the title card, a gold-framed Gallery entry per rank, a 150 🪙 rank-up payout.
- **Risks and edge cases:** point values must be tuned so Spicy and Gauntlet matter equally. Needs migrating existing saves.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 2: Spicy 2.0, a real hard mode with its own modifiers
- **Problem it solves:** Spicy ch 1 fell to a plain `attack` bot, and the toggle shows no changes. It should be the pinnacle of the Story.
- **How it would work (detailed design):**
  - Each Spicy chapter shows a preview strip: "Rivals +1 level · +1 rival (first to 3) · Twist: <named twist>".
  - Chapters 4/8/12 bosses get a "PHASE 3" and start every round with KAIJU ready.
  - Spicy chapters pay 2x tokens and award a flame frame on the map node and a unique spicy colour at 3, 6 and 12.
  - Rival cards update when toggled. A "Spicy Ladder" in Records lists 12 flames.
- **Example moment:** I toggle SPICY on chapter 4. The panel flips to "BOSS OF THE BELT 🔥: Phase 3, +1 minion, Ice Rink". The Play button says "PLAY 🔥".
- **Rewards / progression hooks:** Ghost Pepper achievement becomes a chain (3/6/12), plus a "Spicy Chef" Chef Rank multiplier.
- **Risks and edge cases:** tuning with kid mode (it should be off by default there). Needs Spicy balance passes per boss.
- **Size:** L
- **Score impact for me:** +0.7

### Proposal 3: Daily Gauntlet + weekly Trial rotation
- **Problem it solves:** the Daily is one match, and Trials never change, so there is little reason to return daily.
- **How it would work (detailed design):**
  - Daily becomes a 3-match "Daily Run": match 1 is the Hot Dumpling (or other) mode, match 2 a Trial-style fight with a rotating twist, match 3 a boss. Score = rounds + KOs, shown on a local board with a streak calendar.
  - Medals: bronze win, silver no rounds lost, gold hit the KO goal. A 7-day streak gives a gold frame.
  - Weekly: a "Trial of the Week" built from a random kaiju + twist combo, worth 4★ and 60 🪙. The Daily tile previews tomorrow's mode.
- **Example moment:** the title DAILY tile says "Today: Ice Rink Run · 🔥3 · gold chance". I finish and see "Gold medal! 4/7 days this week".
- **Rewards / progression hooks:** a daily cosmetic piece (one per week), a streak shield for one missed day, weekly chest of 100 🪙.
- **Risks and edge cases:** needs a deterministic seed per date, offline-safe (device clock). Time-zone rollover edge case.
- **Size:** M
- **Score impact for me:** +0.6

## How this round's new features felt
- **Progression (mastery, chef rank, achievements, pin, daily deal):**
  - Mastery levels climbed fast. I was Lv 6 Legend and MAX after about 30 matches, so the cosmetic ladder has no long-term pull for a challenger.
  - Chef Rank (Sous Chef, 30/36) reads clearly in Pantry.
  - Achievements pay 30 🪙. Pinning works and surfaces on the title and in receipts, which is great.
  - The Daily 30%-off deal is a nice hook.
  - Receipts list achievements well ("🏆 Not It! +30", "🏆 First Bite +30").
- **🍽 First Service:**
  - The title checklist showed 4/6 then 5/6, and the "Clear ch 4 → Minturtle" prompts gave direction.
  - It uses small text over the art (issue 6).
  - As a veteran I never needed the 1-minute practice, so one step stays pending.
- **CHALLENGES card:** a good consolidation. The Gauntlet and Trials split is clear and the checkpoint rule is understandable. The title tile text wraps (issue 7).
- **🎯 Trials:**
  - The best part for me. Distinct fights, clear rubric, 20 🪙 per star.
  - Needs live KO counters, per-star progress, and more than 8 trials.
- **⚡⚡ Double twists:** the TWIST button cycles through singles first, then doubles. It's easy to find in Free Play. Combos like Fists Only + Ice Rink are fun, though the button label length is long on the setup pills.
- **🏆 Party Cup / 🥋 Move Lab / Workshop codes / 🧸 Kid Mode:** not touched this session (outside my profile's hard-content path).
- **Boss PHASE 2:** not reached (I stopped at Story ch 3 and never fought a boss).
- **Text/layout audit claim:** mostly true, but the GAUNTLET OVER perk line overflows both screen edges (shot-31), and several title/Story texts crowd their boxes (shots 33 and 15).

## Bugs that block play
- None blocked play, and `/errors` was `none` at the start, middle and end.
- Non-blocking oddities:
  - The `/autoplay` harness sometimes reported "left the match screen" after a Story chapter defeat (the Defeat modal is not a game screen).
  - A Free Play match began when I clicked PLAY at (1070,640) on the Story map in some states.
  - These look like harness sequencing, not game bugs, but they should be re-checked with a real mouse.
