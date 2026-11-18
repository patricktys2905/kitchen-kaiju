# Playtest evaluation: The 9-Year-Old (kid)

**Fun score: 7.0 / 10** (silly characters, quick matches and big wins are great, but wall-of-text screens, a long skip-less intro and a few overlaps would lose a 9-year-old fast)

> Bar is 9/10 from every profile. All screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r7-7109\` (shot-N.png).

## What I did
- About 105 harness commands, roughly 40 minutes of game time. Port 7109, profile "kid".
- **Title** (shot-1): the 1-minute Practice. It ended with the card FIRST MATCH / STORY / MENU (shot-3). Practice took about 8 acts and I won easily.
- **Settings** (shot-5): turned KID MODE on (shot-6).
- **Story ch 1 and 2** (Grand Feast):
  - Saw the opening cutscene and the intro chat (shot-4, shot-8).
  - Played ch 1: 3 stars, Lime colour and First Bite unlocked.
  - Played ch 2: 2 stars, I lost one round.
  - Result cards: shot-14, shot-16.
- **Free Play** (shot-18): the 🎲 RANDOM button, cycled all twists including the new ⚡⚡ doubles (12 clicks), then a Mini Kaiju + Bouncy Castle match on Sushi Bar (shot-19, shot-24). I LOST that match (lost round 1 and the match). Used the pause menu (shot-21).
- **Party Modes** (shot-22): joined as RED, ran a full 6-game Party Cup. The games were Classic, Crumb Rush, Hot Dumpling, Team Feast, Golden Spoon and the ×2 Final. Pizzaraptor beat me 28 to 26 (shot-26, shot-28, shot-30).
- **Records** (shot-31): pinned "Forked Up" (shot-32).
- **Pantry** (shot-33): bought the 40🪙 Toffee colour (shot-34).
- **Gallery** (shot-35): opened the **Move Lab** and used Seed Spray (shot-37, shot-38).
- **Challenges** (shot-39): Gauntlet course buttons and the Trials list (shot-40). Played the Trial "Dinner Rush" (5 rivals) and FAILED it (shot-43).
- **Help** (shot-44) and **Daily** (Hot Dumpling, shot-46).
- Matches: about 10 real (Practice, 2 Story, 1 Free Play, 6 Cup games, 1 Trial, 1 Daily round), plus 5 bot-played autoplays. Won about 5.
- /errors checked at the start, middle and end: always "none".

## What worked for me
- The cast is great. The strawberry lizard, the Crabbage and the Pizzaraptor are exactly what a kid likes. The big victory pop-up art (Gobzilla roaring, Pizzaraptor with exploding cheese, shot-26 and shot-28) feels like a trophy.
- Matches are short and each round ends fast, so I never got bored.
- KID MODE one-line chats really are one line ("Four cups, two of us, one of you. Do the maths!"). That is funny and short.
- Practice is a great first minute: it tells you what to press with a little "PRACTICE 6/8" prompt and ends with +20 🪙.
- The Practice end card (FIRST MATCH / STORY / MENU) tells me what to do next.
- Rewards come fast. First win gave me Lime, a trophy and +30 🪙 within 5 minutes. The Pantry daily deal (30% off Lifeline) is easy to spot.
- 🎲 RANDOM on the setup screen is perfect for a kid who does not want to choose.
- The double twists (⚡⚡ ICE RINK + TURBO, ⚡⚡ MINI KAIJU + BOUNCY CASTLE) are funny and the names read well.
- The Party Cup flow is clear: "GAME 1/6: GOBZILLA WINS!" plus a standings list.
- Records achievements show progress bars (17/25), which a kid understands. The pin works and then appears on the title.
- Gallery's cards are lovely, and Move Lab let me try my power without being hunted.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make losing less frustrating and more fun.** (Free Play, Party, Trials, all result screens.) I lost the Free Play match on NORMAL bots and failed the 5-rival Trial. The only feedback was a hard "TRIAL FAILED" with a one-line tip. Suggested behaviour:
   - Replace "TRIAL FAILED" with a friendly line plus an animation of the winner (for example "SO CLOSE! Mothball got you. One more try?").
   - After 2 losses in a row on one mode, offer a pop-up: "Want it easier? EASY BOTS ▶".
   - Make the default Free Play bot level EASY when KID MODE is on (it stayed at NORMAL).
   - Score impact +0.6.
2. **Fix the text-wall screens for readers who don't like reading.** (Help, Trials, Settings, result receipts.) The Help text is 2 to 4 line paragraphs in small type (shot-44). Trials shows 8 cards of 3 lines each at about 13 px (shot-40). Behaviour:
   - Help: 5 picture cards with one short sentence each plus an icon. Example: a fork icon and "THROW: hold, then let go".
   - Trials: icon + name + 1 line + stars. Move the long rival list into a "details" pop-up.
   - Score impact +0.5.
3. **Make KID MODE "bigger result text" actually bigger and shorter.** (Story result card.) On the Chapter Clear card the chef lines and rewards are about 14 px, two sentences long (shot-14, shot-16). In KID MODE use 22 px or more, with one sentence ("Next: Leftovers!"), and show reward icons without the "(141) · Mastery Lv 2 Line Cook · 21/100 XP" string. Score impact +0.4.
4. **Fix every overlap I found.** (Details in the table below.) The receipt panel overlaps CONTINUE/RETRY (shot-28, shot-43), the FIRST SERVICE toast sits behind the winner title (shot-17), SEED SPRAY! overlaps the Move Lab banner (shot-37). Score impact +0.4.
5. **Add a skip/shortcut on the first-time Story opening so it starts right away.** (Story opening cutscene.) The 🎬 OPENING plays slow typewriter text from black (shot-4, shot-7), and I needed to find SKIP ▶▶ in the corner. Behaviour: show SKIP bigger (at least 120 x 44 px) and with a hint "tap anywhere to speed up"; remember "seen" so it never auto-plays again. Score impact +0.3.
6. **Explain ties and cryptic numbers.** (Party Cup standings, Cup Shelf.)
   - GAME 2/6 shows GOBZILLA 7 pts above PIZZARAPTOR 7 pts with no tie-break text (shot-28).
   - "Cup Shelf: PIZZARAPTOR (19/11)" is not understandable (shot-30).
   - Behaviour: "TIE! Gobzilla first (more KOs)" and "Cup Shelf: Pizzaraptor has 19 cups from 11 ... " or just show 🏆 x19.
   - Score impact +0.3.
7. **Unify the "ranks".** (Records, Gallery, Pantry.) "Chef Rank: Line Cook" (Records, Pantry) and "Mastery Lv 3 Sous Chef" (Gallery, receipts) use the same names for two different ladders. In the same session I was "Line Cook" (Chef Rank) and "Sous Chef" (Mastery) at once (shot-31, shot-35). Rename one (for example Mastery: Rookie > Tasty > Spicy > Legend), and show what the next unlock is on the result receipt. Score impact +0.3.
8. **Make the Party Cup obvious on the title and give the end screen real buttons.** The cup end screen says "1 / START: a new Cup · Esc menu" (shot-30), with no NEW CUP button, even though the brief says there should be one. A kid with a mouse/touch needs a button: "🏆 NEW CUP" and "☰ MENU". Score impact +0.3.
9. **One consistent kaiju name.** The Story/Party setups say "GOBZILLA JR." (shot-35, Records) but in the match HUD and result lines it is just "GOBZILLA" (shot-2, shot-26). Pick one. Score impact +0.1.
10. **Hot Dumpling clarity.** (Round banner, shot-46.) The "☆☆☆" lines under "PIZZARAPTOR WINS THE ROUND" wrap awkwardly onto a second row, and I could not tell what the Hot Dumpling actually is from the screen. Add a one-time "Don't hold the dumpling when it pops!" with a picture, and fix the star row layout. Score impact +0.2.
11. **Pantry should show what a colour looks like.** A swatch/preview on each Pantry item (shot-33), not just emoji and "Warm caramel brown". Score impact +0.2.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Match result (Party Cup, Trial, Free Play) | The 🧾 THIS MATCH receipt panel (x 24-418) overlaps the CONTINUE / RETRY button (x 395-625). The tip line "DASH sideways when you see a charge line…" runs under the button edge ("charge" cut). | shot-28, shot-43 | Cap the receipt at x<=380, or move buttons right. |
| 2 | major | Trial result | "TRIAL FAILED" is a harsh, huge banner for a 9-year-old who just played 6 rounds. | shot-43 | "SO CLOSE!" style text + encouragement. |
| 3 | major | Free Play / Party setup | KID MODE does not lower default bot level (still "BOT LEVEL NORMAL"). I lost a 4-player match. | shot-18, shot-22 | Default EASY when KID MODE on. |
| 4 | major | Story result cards in KID MODE | Brief says "bigger result text"; the Chef lines are about 14 px and two sentences ("Next time, eat those crumbs and STOMP: KAIJU wins fights. Next course: Leftovers. Toastbat is already sharpening the cutlery…"). | shot-14, shot-16 | 22 px+, one sentence. |
| 5 | major | Help (How to Play) | Wall of small text, no pictures (4 paragraphs on Basics). A kid will not read it. | shot-44 | Illustrated cards, 1 line each. |
| 6 | major | Trials list | 8 cards x 3 lines of about 13 px text. Cards have mixed heights. Needs reading rival lists like "SQUIDGEON vs NORIGON (normal), BLUEBEARY (normal) · ★★★: 4+ KOs". | shot-40 | Icons + short line, details on tap. |
| 7 | minor | Story opening cutscene | Starts from black with slow typewriter text "ONE TA…" and the small SKIP ▶▶ top-right. Opening plays on every first entry and is not dismissable by tapping anywhere. | shot-4, shot-7 | Bigger skip, tap to speed up. |
| 8 | minor | Story intro chat | "Tonight the Head Chef hosts the GRAND FEAST. Rule every table in the kitchen, and the legendary GOLDEN S…" is two long sentences even in KID MODE (it should be one line). | shot-8 | KID MODE: "Win the Golden Spoon!" |
| 9 | minor | Story map | The big spoon art sits on top of chapter 2's label ("Dinner for Four" shows as "…her for Four"); chapter tiles are laid out in a snake with 8 left of 7 and 4 right of 3, so numbers run in odd directions. | shot-8 | Keep chapter numbers in a plain left-to-right order or draw arrows. |
| 10 | minor | Match result (Free Play) | The FIRST SERVICE toast "🍽 FIRST S… +20" sits behind the huge winner title "AVOCADRAKE RULES THE TABLE" and is half hidden. | shot-17 | Delay the toast or place it below. |
| 11 | minor | Party Cup standings | Tied points (GOBZILLA 7, PIZZARAPTOR 7) listed with no tie-break explanation; the trophy goes to the first. | shot-28 | "TIE: more KOs wins". |
| 12 | minor | Party Cup end screen | "🏆 Cup Shelf: PIZZARAPTOR (19/11)": meaning of 19/11 is unclear. | shot-30 | Show "🏆 x19" or label. |
| 13 | minor | Party Cup end screen | Only "1 / START: a new Cup · Esc menu" as text; no NEW CUP button on screen (brief says there should be one). | shot-30 | Add NEW CUP / MENU buttons. |
| 14 | minor | Match HUD | Move Lab "SEED SPRAY!" callout overlaps the Move Lab banner at the top. | shot-37 | Move the callout away from y=96-110. |
| 15 | minor | Move Lab | Banner says "Esc to leave", but Esc opens the Pause menu (RESUME/RESTART/QUIT); I pressed Esc 3 times and toggled pause, and had to click QUIT. | shot-38 | Esc in Move Lab goes straight to the Gallery. |
| 16 | minor | Match countdown tip | Crumb Rush game shows "Shove rivals off the table edge with a dash." tip. It is irrelevant to the mode. | shot-27 | Mode-specific tip. |
| 17 | minor | Round-over replay | "FAST FORWARD x3 · only bots left" and "INSTANT REPLAY" banners are stacked with no gap, and "STOMP READY!" text still shows next to a KNOCKED OUT player. | shot-24 | Gap of at least 10 px, hide the label when out. |
| 18 | minor | Hot Dumpling round banner | The row of stars wraps: "SALMONSTER ☆☆☆ PIZZARAPTOR ★☆☆ SLOBA ☆☆☆" then "DUMPLORD ☆☆☆" below, overlapping the dumpling/table art and colliding with the title. | shot-46 | Fit 4 players on one row or stack all. |
| 19 | minor | Hot Dumpling | No visible hint what the dumpling is (I never saw one in the screens I checked). | shot-45, shot-46 | One-time explainer. |
| 20 | minor | Name consistency | "GOBZILLA JR." (Records, Gallery, Story map, Party seat) vs "GOBZILLA" in HUD and results; Gallery card says "GOBZILLA", detail title "GOBZILLA JR.". | shot-2, shot-35 | Pick one name. |
| 21 | minor | Ranks | Records/Pantry "Chef Rank: Line Cook, next Sous Chef at 24 pts (you have 15)" vs Gallery/receipt "Mastery Lv 3 Sous Chef" at the same time. | shot-31, shot-35 | Rename one ladder. |
| 22 | minor | Records | "Sous Chef at 24 pts (15)" hides what "pts" are and how to earn them. | shot-31 | "15 / 24 chef points: win matches, clear Story". |
| 23 | polish | Records | Footer line "👉 Next up: Forked Up (68%) — Score 25 knockouts · Click any locked one to 📌 pin it… Each achievement pays 30" is one very long line at about 12 px, close to the bottom edge. | shot-31 | Split in 2 lines, larger type. |
| 24 | polish | Pantry | No swatches/previews for colours (Toffee, Lilac...). Kid cannot see what they buy. | shot-33 | Preview of the colour on my kaiju. |
| 25 | polish | Pantry | Completed weekly orders show ✔ with no "claim" feedback; the token count rose by +25 (643 to 668) with no explanation. | shot-33 | Show "+40" pop-up. |
| 26 | polish | Pantry | Weekly orders text "New orders every Monday. Each one pays 40" is small; the left panel text is about 12 px. | shot-33 | Larger. |
| 27 | polish | Title | NEXT UP / FIRST SERVICE block is 3 small centred lines over the fork art; the fork shaft crosses the text "Win a match → Lime colour". | shot-1 | Add a plate behind the block or move it. |
| 28 | polish | Title | After the first hour the NEXT UP block changes to a pinned achievement text, long and clipped on one line ("📌 Forked Up: Score 25 knockouts (17/25) Clear Story ch 4…"). | (look output) | Truncate cleanly. |
| 29 | polish | Challenges pop-up | "wave", "Checkpoints", "boss wave" jargon; Trials subtext is tiny. | shot-39 | Simpler words. |
| 30 | polish | Trials | "total ★ 0/24" and "20 🪙 per new star" are in a tiny 12 px line at the top. | shot-40 | Larger. |
| 31 | polish | Settings | 12 toggles with 1-line descriptions of 12 px; KID MODE is in the 2nd column, 6th row, easy to miss for a parent. | shot-5 | KID MODE at the top; also offer it on first launch. |
| 32 | polish | Gallery | Locked kaiju "???" cards give no hint how to unlock; 4 locked tiles. | shot-35 | "Win Story ch 8" under each. |
| 33 | polish | Gallery | The detail text "Mastery ★★★★★★★ Lv 3 Sous Chef (108/160 XP) · next: 🟡 Gold name in matches" wraps with "name in matches" alone on the last line. | shot-35 | Tighten wording. |
| 34 | polish | Free Play setup | The settings row labels ("BOT LEVEL NORMAL", "FIRST TO 3") are 11 px bold in tiny pills. Several buttons are small for a child's hand. | shot-18 | Taller pills. |
| 35 | polish | Match HUD (6 players) | In the Trials 6-seat HUD the table name "ROUND 1 · BIRTHDAY BASH" is moved to the bottom-left at tiny size. | shot-41 | Keep top right. |
| 36 | polish | In-match | The twist label "⚡ MINI KAIJU + BOUNCY CASTLE" is about 10 px at bottom right and easy to miss. | shot-19 | Show for the first 3 s centred. |
| 37 | polish | Pause menu | Fine, but there is no "How to play" link in pause. | shot-21 | Add it. |
| 38 | polish | Free Play | The "Mini Kaiju + Bouncy Castle" match was run on "SUSHI BAR" while the setup said "TABLE: ALL 15 (a different one every round)", and the table stayed Sushi Bar in round 2. Round 1 and 2 had the same table. | shot-19, shot-21 | Confirm the table-rotation rule. |
| 39 | polish | Story results | Same wording on every card, "X is already sharpening the cutlery…". It repeats and is long. | shot-14, shot-16 | Vary and shorten. |

## 🔠 Text and layout check

| Screen | Result | Screenshot |
|---|---|---|
| Title | OK, but the fork art crosses the NEXT UP text (polish) | shot-1 |
| Practice match + Practice card | OK. Faint "...CLOSE" prompt text behind the card is readable but ghosted | shot-2, shot-3 |
| Story opening cutscene | OK, fades in from black. SKIP is small | shot-4, shot-7 |
| Story map + intro chat | Problem: spoon art covers chapter 2 label | shot-8 |
| Story result card (ch1, ch2) | OK layout, small text | shot-14, shot-16 |
| Settings | OK, small descriptions | shot-5 |
| Free Play setup | OK | shot-18 |
| In match (Sushi Bar, pause) | OK, pause menu clean | shot-19, shot-21 |
| Round end banner, replay | Banners stacked tight | shot-24 |
| Party Modes setup | OK | shot-22 |
| Party Cup game results | **Problem:** receipt overlaps CONTINUE | shot-26 (OK), shot-28 (overlap) |
| Party Cup final | OK, no NEW CUP button | shot-30 |
| Free Play winner screen | **Problem:** FIRST SERVICE toast behind the title | shot-17 |
| Records | OK, bottom line small | shot-31, shot-32 |
| Pantry | OK | shot-33, shot-34 |
| Gallery | OK | shot-35 |
| Move Lab | **Problem:** SEED SPRAY! overlaps the banner | shot-37 |
| Pause in Move Lab | OK | shot-38 |
| Challenges pop-up | OK | shot-39 |
| Trials | Crowded small text, no overlap | shot-40 |
| Trial result | **Problem:** receipt overlaps RETRY | shot-43 |
| Help | OK, but a wall of text | shot-44 |
| Hot Dumpling (Daily) round banner | **Problem:** star row wraps, collides with the title | shot-46 |

## The single biggest structural problem
Losing and reading. The game is delightful when I am winning, but the moment I lose, the screens go cold: "TRIAL FAILED", a tip I did not read, and the same bot level again. Combine that with tiny paragraph text (Help, Trials, receipts) and a 9-year-old with a short attention span drifts away. KID MODE only changes the Story rivals and chat; it does not change Free Play, Party, Trials, Help or the size of text across most screens. A single "kid-first" pass (easier default, shorter, bigger, friendlier) would take this to 9.

## Big change proposals (2–3, most important first)
### Proposal 1: KID MODE everywhere ("Little Chef" mode)
- **Problem it solves:** KID MODE currently only touches Story. I still got NORMAL bots, "TRIAL FAILED", tiny text in Help, Trials and receipts.
- **How it would work (detailed design):**
  - The Settings toggle becomes a first-launch question: "Who's playing? 🧒 Little Chef / 🧑 Big Chef". It is also at the top of Settings.
  - Little Chef applies to every mode:
    - Default bots EASY in Free Play, Party and Daily; Trials show an "easy version" (bots one level lower, star goals -1 KO).
    - All result text at least 22 px and no more than 12 words.
    - A "Try again!" tone instead of FAILED.
    - Help screen replaced by 5 picture cards.
  - After 2 straight losses a pop-up: "Make bots easier? ▶ YES (big button) / No".
- **Example moment:** I fail Dinner Rush. The screen says "SO CLOSE! Mothball won. Try again?" with a big RETRY and a smaller "EASIER BOTS" button. I tap EASIER BOTS and win.
- **Rewards / progression hooks:** An "Easy win" still gives full coins, but earning a Trial star on the easy version gives a bronze (half) star, so I still have a reason to try the real one later.
- **Risks and edge cases:** Parents may want KID MODE on a shared profile without affecting a sibling who plays hard; make it a per-profile switch on the title. Bronze stars need a UI icon.
- **Size:** M
- **Score impact for me:** +0.9

### Proposal 2: Picture-first Help and Trials
- **Problem it solves:** Both screens are walls of 12-13 px text (shot-40, shot-44).
- **How it would work (detailed design):**
  - Help: 5 big cards (GOAL, THROW, SWIPE, DASH, STOMP). Each card has an icon or short looping animation (about 2 s) and at most 8 words. The existing text is kept behind a "More" button.
  - Trials: a 4 x 2 grid of tiles. Each tile shows the player's kaiju, the rival faces (small portraits instead of names) and ☆☆☆. Tapping a tile opens a pop-up with the details and a PLAY button.
- **Example moment:** I open Help, see a fork flying at a crab with "THROW: hold, then let go!", and I get it in 3 seconds.
- **Rewards / progression hooks:** Completing the Help cards counts as a FIRST SERVICE step (+10 🪙).
- **Risks and edge cases:** More art to produce (about 10 icons); rival portraits need to fit in 6-rival Trials ("Dinner Rush" uses 5).
- **Size:** M
- **Score impact for me:** +0.5

### Proposal 3: Party Cup finale that celebrates the kid
- **Problem it solves:** My cup end screen is only text and lacks buttons (shot-30), the shelf line is cryptic and my 26-point silver finish earned no special moment.
- **How it would work (detailed design):**
  - End screen: a podium with the three kaiju at their rank, trophy on the winner, a confetti burst and a button row "🏆 NEW CUP / ☰ MENU / 📷 SHARE".
  - 2nd place gets a "SO CLOSE!" ribbon and a rematch button that keeps the same seats.
  - Replace "(19/11)" with a Cup Shelf row of mini trophies, one per cup won (max 10, "+9" beyond).
  - Standing ties show "TIE, more KOs wins".
- **Example moment:** Pizzaraptor takes the trophy; I get the silver ribbon and a big "REMATCH" button, and play again right away.
- **Rewards / progression hooks:** +10 🪙 for every cup finished, plus a "Silver Spoon" achievement for 2nd-place finishes.
- **Risks and edge cases:** Needs layout for 2 to 6 players on the podium; ties for first.
- **Size:** M
- **Score impact for me:** +0.4

## How this round's new features felt
- **Progression (mastery, Chef Rank, achievements, daily deal):**
  - Achievements are great: progress bars, pins and +30🪙 are easy for a kid to understand.
  - Mastery vs Chef Rank share names (Line Cook, Sous Chef) and confused me.
  - I got Mastery Lv 2 in ch 2 but the receipt only said "⬆ Mastery Lv 2 Line Cook". It did not say what I unlocked. The Gallery showed it later ("next: Gold name in matches").
  - The daily 30%-off Lifeline tag in the Pantry is clear (blue outline + "TODAY 30% OFF (was 350)").
  - Cheap colours (Toffee 40🪙) are a good first buy, but there is no preview.
- **🍽 First Service:** It was a good guide ("NEXT UP", +20, +25 pop-ups) and I liked the coin hits. The toast clashed with the winner title (shot-17).
- **Practice card (FIRST MATCH / STORY / MENU):** Excellent. The best onboarding moment I had.
- **CHALLENGES / Trials / Move Lab:**
  - The Challenges pop-up is simple and clear.
  - Trials are tough: I failed my first one and could not tell why other than "you: 6" kills but not the win.
  - The Trial text is too small and long for a kid.
  - Move Lab is fun (my kaiju went giant straight away and the power fired), but the banner says Esc leaves when it only pauses, and the SEED SPRAY! callout overlapped the banner.
- **⚡⚡ Double twists:** Hilarious. Mini Kaiju + Bouncy Castle was the funniest thing I played. The twist name shows only at the very bottom right, in tiny text.
- **🏆 Party Cup:** Each game names its winner, the final says ×2 and the cup finale shows "WINS THE PARTY CUP!". There is no NEW CUP button, the Cup Shelf label is cryptic, and the receipt overlaps CONTINUE.
- **Story (PHASE 2, KID MODE):**
  - I did not reach a boss (only ch 1 and 2), so I could not judge PHASE 2.
  - KID MODE chat is one line and funny, but the result text is not noticeably bigger.
- **Workshop:** Not visited (kids would likely skip it).
- **Text and layout audit:** 5 real overlaps found (receipt vs buttons x2, toast vs title, SEED SPRAY vs banner, Hot Dumpling star row) plus the spoon covering a Story map label. These are listed above with screenshots.

## Bugs that block play
- None. No blockers; /errors was "none" at the start, middle and end. Esc in Move Lab opens Pause rather than leaving, and I needed 4 key presses and a click on QUIT to leave (minor, not blocking).
