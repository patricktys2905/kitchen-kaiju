# Playtest evaluation — The First-Timer (newbie), round 11

**Fun score: 7.6 / 10** (charming, readable and quick to get into; the first real match is unfair and confusing, and several screens use small text and jargon, so it is not yet a 9 for someone who has never played)

> Screenshots are under `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r11-7104\` (shot-N.png). Harness commands used: about 105. JavaScript errors: `/errors` returned "none" at the start, middle and end.

## What I did
- Started on the title screen (shot-1) and read the "NEXT UP / FIRST SERVICE 0/6" box. Tapped "👋 NEW HERE? 1-MINUTE PRACTICE".
- **Practice** (shot-2, shot-4): walked, threw, swiped, dashed, went KAIJU, used the power and knocked the dummy bot off. Step 7/8 ("SWIPE up close") never ticked over. I pressed F, and the game printed "Skipped this step: try it in a real match!" and completed the practice (+20 🪙).
- **First Match** from the practice-complete card. Ice Cream Parlour, vs one EASY bot, first to 3. I was flicked off by the Giant Hand 8 seconds into round 1 (shot-5). I then won 3 rounds to 2 and got the receipt (shot-8): First Bite +30, Lime colour, new kaiju Chocomunch, +51 🪙.
- **Free Play setup** (shot-9) and its ⌨ KEYS overlay (shot-10).
- **❓ Help**: BASICS (shot-11), EXTRAS (shot-12), CUTLERY (shot-13). I did not open TABLES or MODES.
- **Story**: map (shot-16), opening cutscene (shot-14), Chapter 1 cutscene (shot-18), Crabbage dialogue (shot-19), then played Chapter 1. I won 2-0 for ★★★ and got the Chapter Clear card with the "📜 Meanwhile…" line (shot-22).
- **Records** (shot-23) and **🎯 GOALS** (shot-24); I pinned "On a Roll".
- **Pantry** (shot-25, shot-26): the first-visit +25 🪙 toast, then the "tap again to buy" Toffee flow. I bought Toffee.
- **Gallery** (shot-27, shot-28) and the **Move Lab** with Squidgeon (shot-30).
- **Party Modes → Team Feast** (shot-32, shot-33, shot-35): played a full match and won 3-1.
- **Daily** preview card (shot-36) and **Challenges** card (shot-37).
- **Gauntlet Starters**: cleared waves 1 and 2, took two perk screens, then paused and quit (shot-39, shot-40, shot-41).
- **Settings** (shot-42) and **Table Workshop** (shot-43).
- Played about 6 matches and 4 Move Lab / Practice rounds, winning 5 of the 6 matches. Active play was about 12 minutes of game time.

## What worked for me
- The title screen is clear and appealing. Six big, colour-coded tiles with a one-line subtitle each, and a green "NEW HERE?" button right in the middle (shot-1).
- The 1-minute Practice has a live step counter and a reward (+20 🪙). It ends on a card that offers FIRST MATCH, STORY or MENU (shot-4). That is a good "what next" moment.
- The BASICS Help tab as five picture cards (THROW / SWIPE / DASH / EAT / STOMP) is quick to read, and the one-line goal at the top is exactly what a newcomer needs (shot-11).
- The Story is charming. The Crabbage cutscene line "Crabbage is feeling a little… crabby." (shot-18) and the clear card with a "Meanwhile…" line (shot-22) made me want chapter 2.
- The "KAIJU 2s!" countdown in the HUD (shot-30) makes the 7 s KAIJU window readable.
- Pantry buys ask one item at a time ("tap again to buy for 28 🪙", shot-26). The first-visit +25 🪙 is announced.
- The match receipt lists every achievement and unlock ("First Bite +30, Lime colour, NEW KAIJU: Chocomunch", shot-8). Winning felt rewarding very early.
- Records ▸ GOALS is a clear "path to 100%" with a next step per collection and 📌 PIN (shot-24).
- The Gallery has a mastery bar and an honest "You vs it: 1–0" line (shot-28). The Move Lab dummy was close enough to use at once.
- Title "NEXT UP" gives clear short-term goals ("Win a match → 🎨 Lime colour").
- No JS errors anywhere, including the Workshop, pause, Quit-confirm and perk screens.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make the very first real match gentle.** Where: "▶ FIRST MATCH" (vs one EASY bot) and the first 2 Free Play / Story matches. How: do not allow hazards in a player's first 3 matches (or turn the Giant Hand off, pre-set HAZARDS: OFF), or warn it with a banner at 3 s ("✋ GIANT HAND INCOMING: DASH sideways!") and make it start no earlier than 20 s. In shot-5 I lost round 1 after 8 s to a hazard I did not yet understand, in the match the game itself calls the "first match". Impact **+0.5**.
2. **Fix the Practice's stuck step and its tiny prompt box.** Where: Practice step 7/8 "SWIPE up close" (shot-2). It never completed for me even after I attacked up close several times (shot-3). Only pressing F, which printed "Skipped this step", ended it. How: complete the step on any swipe hit or swipe attempt, add a visible "press F to skip" hint after 10 s, and print the missing key for the current step in a larger box. The prompt is about 14 px at the bottom-left and uses the unexplained "(+6 more)". Impact **+0.4**.
3. **Put "how a match is won" in plain words in the first minute.** Where: Help BASICS, Practice end card, Free Play setup. How: add a sixth BASICS card "WIN ROUNDS: be last kaiju standing; first to 3 rounds wins the match" with a 3-pip picture. At present "First to 3 rounds" only appears as setup text (shot-9) and the ★★★ meter inside the match. I won 3-2 over 5 rounds without understanding why the match was not over after 3 rounds. Impact **+0.4**.
4. **Make the setup screens explain "who is YOU".** Where: Free Play setup (shot-9) and Party Modes (shot-32). The cards read "👤 YOU · 🤖 Bot: EASY (tap)", which reads like a contradiction. The empty seats say "click: add a bot" or "click or THROW to join". How: label seat 1 "YOU (human)" with a small "bot helper off" switch, label seat 2 "COMPUTER (EASY)", and add a one-line "Press ▶ PLAY to start" arrow pointing at PLAY. Impact **+0.3**.
5. **Raise the minimum text size on desktop to about 16 px on all chrome.** Where: title top-right buttons (SETTINGS / HELP / KAIJU / RECORDS / PANTRY / WORKSHOP, about 11 px, shot-1), locked Story buttons ("DESSERT / finish the Feast or Chef's Pass" about 9 px, shot-16), Help EXTRAS list (shot-12), the "THIS MATCH" receipt (shot-8), the Records "Next up" line (shot-23), practice prompt box (shot-2). Impact **+0.4**.
6. **Fix the Gallery detail-panel overflow.** Where: Gallery with Squidgeon selected (shot-28). The "Rewards (Lv 2-6): 🔒 gold frame · 🔒 crown · 🔒 Shiny" line sits on the panel's bottom border and the ink-cloud description wraps to 2 lines, pushing everything down. How: give the panel 24 px more height or drop the line spacing, and shrink the portrait pair. Impact **+0.2**.
7. **Make transient banners not sit on top of buttons and numbers.** Where: Pantry "🍽 FIRST SERVICE ✔ Visit the 🛒 Pantry: +25 🪙" banner (shot-25, shot-26) covers the "2/5" progress and the PEACH / BLUEBERRY card text. How: place it at the top under the title, auto-hide after 2.5 s. Impact **+0.2**.
8. **Teach the Giant Hand and the red ring on the match screen itself.** Where: the first 3 matches. The "💡 The giant hand goes for whoever has the fullest belly" tip appears for 3 seconds on the countdown card (shot-1 look) and is easy to miss. How: on the first Giant Hand, freeze the lane warning with a 1.5 s "✋ DASH!" arrow over the player and show the arrow every time. Impact **+0.3**.
9. **Clear up Challenges and Story-map jargon for a newcomer.** Where: the Challenges card (shot-37) and the Story header (shot-16). "CHEF'S PASS: 0/12 Trial ★ or Gauntlet wave 0/8 → opens 🌶️ Spicy on any reached chapter + the 🍰 Dessert Course early", "Checkpoints: clear a course's boss wave once…", and "1% of everything" are not understandable on first read. How: show one sentence per card ("Starters: 3 lives, beat as many waves as you can") and hide the Chef's Pass explanation until the player owns one. Impact **+0.2**.
10. **Make ☰ MENU consistently go to the title.** Where: match end screen. The Practice card says "☰ MENU: back to the title", but after a Free Play match "☰ MENU" took me to the Free Play setup (shot-9), not the title. Rename it "↩ SETUP" or send it to the title. Impact **+0.1**.
11. **Use one name per kaiju everywhere.** "GOBZILLA" in HUD and Gallery grid, "GOBZILLA JR." on the Story card and the Free Play card and the win banner ("GOBZILLA JR. RULES THE TABLE", shot-8). Impact **+0.1**.
12. **Make Esc useful on the Gauntlet perk screen.** On "PICK A PERK FOR THE NEXT WAVE" (shot-39, shot-40) Esc did nothing; the pause menu only worked once the wave had started. Add an Esc / pause there. Impact **+0.1**.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | First Match, round 1 (Ice Cream Parlour) | Giant Hand flicked me 8 s into my first ever real round ("GOBZILLA got flicked by the GIANT HAND"). With only 35 belly I had no idea why. I lost the round to a hazard before I'd learned anything. | shot-5 | No hazards for first 3 matches, or a loud 3 s warning and a later start. |
| 2 | major | Practice | Step "SWIPE up close: F / X / SWIPE" stuck at 7/8; my `attack` command and the cutlery hits never completed it. Pressing F printed "Skipped this step: try it in a real match!". The "(+6 more)" text hides what's left. | shot-3, shot-4 | Complete on any swipe or give a visible Skip button. |
| 3 | major | Free Play / Party setup | Nothing explains what "first to 3 rounds" means, or that a match is several rounds. I won 3-2 in 5 rounds without knowing the win condition. | shot-9 | Add a "WIN ROUNDS" Help card and a setup line: "Win 3 rounds to win the match". |
| 4 | minor | Free Play setup | Seat card says "👤 YOU · 🤖 Bot: EASY (tap)" for the human, which reads as a contradiction. Other seats say "click: add a bot". | shot-9 | Separate "YOU" and "bot helper" wording. |
| 5 | minor | Free Play setup | "Bot difficulty… ⏱ ≈ 2 min · 13/20 kaiju (play & Story unlock more)" line sits on a busy plate background at about 14 px and is hard to read. | shot-9 | Add a dark panel behind the info lines. |
| 6 | minor | Free Play, ⌨ KEYS overlay | The overlay covers the BOT LEVEL / TABLE / PLAY buttons completely. "CLOSE KEYS" is at the bottom-left and easy to miss. | shot-10 | Make the overlay a side panel or keep PLAY visible. |
| 7 | minor | Match end ("☰ MENU") | Takes me to the Free Play setup, not the title. Practice's own card says "☰ MENU back to the title". | shot-9 | Make behaviour consistent or relabel. |
| 8 | minor | Names | "GOBZILLA" (HUD, Gallery grid) vs "GOBZILLA JR." (Story card, Free Play card, win banner). | shot-8, shot-16, shot-27 | One name. |
| 9 | minor | Title | Top-right buttons (⚙ SETTINGS, ❓ HELP, 📖 KAIJU, 🏆 RECORDS, 🛒 PANTRY, 🛠 WORKSHOP) are about 11 px. "📖 KAIJU" for the Gallery is not obvious as a name. | shot-1 | 16 px, rename to "GALLERY". |
| 10 | minor | Title | The "NEXT UP" box is small, 3 dense lines with emoji, and sits over the busy background. | shot-1 | Bigger text, show one goal at a time. |
| 11 | minor | Story map | Header "Chapters 0/12 · 1% of everything · ★ 0/36 · 🌶️ 0/12 · 🎁 1/13" is jargon-heavy. "1% of everything" is unexplained. | shot-16 | Remove or tooltip it. |
| 12 | minor | Story map | Locked top buttons "🔒 DESSERT / finish the Feast or 🎟 Chef's Pass" and "🔒 SECOND HELPINGS / clear chapter 6 to open" are about 9–10 px. | shot-16 | Larger text, shorter wording. |
| 13 | minor | Story map | The chapter grid snakes (row 2 runs right to left: 8, 7, 6, 5), which is confusing to read. | shot-16 | Run every row left to right. |
| 14 | minor | Story map | Opening cutscene auto-plays on first visit; the SKIP ▶▶ button is only at the top-right. Pressing PLAY then replays a cutscene before the dialogue, then the dialogue, then the match: 3 skips before the first fight. | shot-14, shot-18, shot-19 | One combined skip, or "Skip all" on first press. |
| 15 | minor | Story dialogue | The dialogue box has a large empty band between the line and "⏭ SKIP CHAT (S)", and the portrait overlaps the chapter tiles on the left. | shot-19 | Tighten the box. |
| 16 | polish | Story clear card | The "NEXT / REPLAY / MAP" card has about 8 lines in 3 sizes of small text between the dialogue and the buttons. | shot-22 | Fewer lines, group them. |
| 17 | minor | Records | "Next up: On a Roll (67%) — … Click any locked one to 📌 pin it (shown on the title + after matches). Each achievement pays 30 🪙." is one 14 px run-on line at the bottom. | shot-23 | Split into two lines, bigger. |
| 18 | polish | Records | Rank names: "Chef Rank: Dishwasher · Next rank Prep Cook · 3/6" is correct but "Rank pts: 2 per achievement + 1 per kaiju Mastery level" is hard to see (about 12 px, grey). | shot-23 | Bigger text. |
| 19 | polish | Goals popup | The Goals popup "🎯 Shinies 0/20 — Mastery Lv 3 + 300 🪙 each (Gallery)" subtext is about 11 px grey on black. | shot-24 | Bigger text. |
| 20 | minor | Pantry | The "🍽 FIRST SERVICE ✔ Visit the 🛒 Pantry: +25 🪙" banner sits across the middle of the screen and hides "2/5" and the PEACH / BLUEBERRY text. It stayed there in both screenshots. | shot-25, shot-26 | Move to the top and auto-hide. |
| 21 | polish | Pantry | The "Toffee colour −30% today 🪙 28" price row is OK but the "(not enough yet)" cards give no hint of how many 🪙 are missing. | shot-25 | Say "need 34 more". |
| 22 | minor | Gallery | With Squidgeon selected the detail panel's last line ("🔒 gold frame · 🔒 crown · 🔒 Shiny") touches or overflows the panel's bottom border. | shot-28 | More panel height or shorter text. |
| 23 | polish | Gallery | "Matches: 0 · Wins: 0 · 📊 You vs it: 1–0" for Squidgeon looks contradictory (I had beaten it). | shot-28 | Explain "Matches" is as that kaiju. |
| 24 | polish | Gallery | Roughly half the grid is "???" silhouettes with no hint of how to unlock them (except via Goals). | shot-27 | Add "unlock: …" hover/selected hint. |
| 25 | polish | Help EXTRAS | Dense plain text lists (about 13 px), a big blank gap under POWER-UPS before HAZARDS, and no pictures; EXTRAS is much weaker than the picture-card BASICS. | shot-12 | Use icons and a card per item. |
| 26 | polish | Help BASICS | No card for rounds, winning the match, or the match score stars. The Giant Hand and red ring line is small grey text at about 13 px. | shot-11 | Add cards. |
| 27 | polish | Help BASICS | The controls block ("Keyboard left: W A S D move · SPACE throw…") is a dense text wall; phone line is there but keyboard is a run-on. | shot-11 | Key-cap graphics like the Free Play KEYS panel. |
| 28 | minor | Challenges card | "CHEF'S PASS: 0/12 Trial ★ or Gauntlet wave 0/8 → opens 🌶️ Spicy on any reached chapter + the 🍰 Dessert Course early" and "Checkpoints: clear a course's boss wave once, and later runs can start at the next course." are jargon, a lot of text, and about 13 px. | shot-37 | Simplify; hide until relevant. |
| 29 | polish | Challenges card | Locked "MAINS / DESSERTS / SECONDS" use "clear wave 4 / 8 / 12", while the pass counts "wave 0/8"; two different wave scales. | shot-37 | Pick one. |
| 30 | polish | Gauntlet | Wave 1 (a 1-round win vs 1 EASY bot) paid +73 🪙; wave 2 +95 🪙 plus an order and an achievement. Much more than Story (+45) for a quick fight; the economy feels uneven. | shot-39 | Review the payouts. |
| 31 | minor | Gauntlet perk screen | Esc did nothing at "PICK A PERK FOR THE NEXT WAVE (1 / 2 / 3)". Pause only worked in the next wave. | shot-40 | Esc opens pause. |
| 32 | polish | Pause menu | "✖ QUIT (ends the Cup / run)" needs two taps with a warning at the top ("⚠ Tap QUIT again to really end the Cup / run"). The warning is far from the button (y=150 vs y=596). | shot-41 | Put the warning on the button. |
| 33 | polish | In-match | The Giant Hand lane and arrows appear with a "YOU GOT FLICKED" caption fading behind the "INSTANT REPLAY" banner; the replay hides the caption. | shot-5 | Show the cause after the replay. |
| 34 | polish | Match end | The 🧾 THIS MATCH receipt text is about 13 px, 8 lines at the bottom-left over the arena and clashes with the "SHARE" button area. It is readable, but a lot to take in. | shot-8, shot-35 | Larger text, fewer lines, or an expandable receipt. |
| 35 | polish | Match end | The bottom "Most KOs / Crumb Monster / Condiment Hoarder" ticker runs the full width and sits close to the receipt and SHARE buttons. | shot-8 | Add padding. |
| 36 | polish | Team Feast | The "🔴 RED 0 – 0 BLUE 🔵" live score is in the look text but was hidden behind the Instant Replay banner (and the seat header). I could not see the score when the round ended. | shot-33 | Keep the score above the replay banner. |
| 37 | polish | Party setup | The 11-button row at the bottom is about 11–12 px text with two-line labels ("CUP LENGTH 6 GAMES"). Unclear for a newcomer that "MODE ▶ TEAM FEAST" cycles modes. | shot-32 | Mode picker as big cards. |
| 38 | polish | Party setup | With 0 players joined, PLAY is still enabled; there is no hint about how many are needed. | shot-32 | Disable PLAY or show "Join at least 1". |
| 39 | polish | Settings | Setting "NAME TAGS: OFF" is off by default; as a newcomer I could not tell which kaiju was me except by the ▼ YOU arrow at the start. | shot-42 | Default to ON for first 3 matches. |
| 40 | polish | Workshop | "PROPS: tap one, then tap the table" label is tiny yellow text at the top left; the long "CUP: a solid medium block…" help text is at the bottom in about 13 px. Tools "↶ UNDO / 🗑 CLEAR / 📂 SLOT ▶ / ✏ NAME" are small buttons. | shot-43 | Bigger. |
| 41 | polish | Harness note | `/look` does not list the Goals popup text (only the Records page behind it) so a screen-reader-like text dump misses it. | shot-24 | Add popup text to the accessibility layer. |

## 🔠 Text and layout check

| Screen | Result | Screenshot |
|---|---|---|
| Title | OK, but top-right button text is about 11 px and "NEXT UP" is small | shot-1 |
| Practice (in-match) | Bottom-left step box is small (about 14 px) | shot-2 |
| Practice complete card | OK | shot-4 |
| In-match HUD | OK; bottom message line is readable | shot-5, shot-33 |
| Match end (Free Play) | OK, no overlap; receipt text small | shot-8 |
| Match end (Team Feast) | OK; achievement toast "On a Roll! +30" at the top right is fine | shot-35 |
| Free Play setup | Info lines hard to read over a busy background; no overlap | shot-9 |
| Free Play ⌨ KEYS | Covers the buttons and PLAY (by design) | shot-10 |
| Help BASICS | OK, a little small | shot-11 |
| Help EXTRAS | Small dense text, empty gap, no overlap | shot-12 |
| Help CUTLERY | OK | shot-13 |
| Story opening / chapter cutscene | OK; subtitle is readable | shot-14, shot-18 |
| Story map | Small text on locked buttons (9–10 px); no overlap | shot-16 |
| Story dialogue | Portrait overlaps the map tiles behind it (fine, it's a modal) but large empty space in the box | shot-19 |
| Story chapter clear card | OK, many lines | shot-22 |
| Records | OK; bottom line is a long run-on | shot-23 |
| Goals popup | OK | shot-24 |
| Pantry | PROBLEM: the "FIRST SERVICE" banner covers the "2/5" and card text | shot-25, shot-26 |
| Gallery (Gobzilla) | OK | shot-27 |
| Gallery (Squidgeon) | PROBLEM: the Rewards line touches the panel's bottom border | shot-28 |
| Move Lab (in-match) | OK; "KAIJU 2s!" HUD readable | shot-30 |
| Party Modes setup | OK, small button labels | shot-32 |
| Daily card | OK | shot-36 |
| Challenges card | OK, small jargon-heavy bottom text | shot-37 |
| Gauntlet perk screen | OK | shot-39 |
| Pause menu | OK | shot-41 |
| Settings | OK | shot-42 |
| Table Workshop | OK, small labels | shot-43 |

## The single biggest structural problem
The first 5 minutes are not protected. The game hands a newcomer a hazard (the Giant Hand) in round 1 of their first "FIRST MATCH", and the only teaching of "how do I win the match" is a goal line and a round counter. I lost my first round after 8 seconds to something I had not seen explained. I won the match 3-2 over 5 rounds without being told what "first to 3" meant. Practice itself also stalled on an unclear step (7/8) that I could only exit by pressing the skip key.

The pieces that teach are good (picture-card Help, Practice, the "NEXT UP" box) but they are not connected: Practice ends and drops you into the least forgiving version of the game. A smoother first session, with a gentler first match, a 1-line win condition, and a clearer Practice would lift the score quickly, because the rest of the game (Story charm, Gallery, Goals, Pantry) is already strong.

## Big change proposals (2–3, most important first)

### Proposal 1: "First Plate" protected first three matches
- **Problem it solves:** a newcomer's first matches are random and sometimes unfair (shot-5), and nothing tells them the win condition.
- **How it would work (detailed design):**
  - Flag `newPlayer` = fewer than 3 matches played.
  - While set: hazards OFF (or Giant Hand only after 25 s with a 3 s "✋ DASH!" warning), the bot is EASY, the round countdown tip shows "Be the last one standing" instead of the hazard tip, and a small gold "FIRST PLATE 1/3" tag sits under the round counter.
  - At match start, a 2 s card: "WIN 3 ROUNDS. Last kaiju standing wins a round." At the match end, the results screen shows "Round wins: 3 / 5" with 3 stars filled.
  - After match 3 the tag becomes "🎓 FIRST PLATE COMPLETE +30 🪙" on the receipt and the hazards switch on, with a one-time "Hazards are ON now: watch for the ✋ Giant Hand" card.
- **Example moment:** I hit FIRST MATCH, the tag says "FIRST PLATE 1/3", I win a clean 3-0 against an EASY bot, and the receipt says "2 more to go".
- **Rewards / progression hooks:** +30 🪙 on finishing, a new "First Plate" achievement, and the title "NEXT UP" box showing "First Plate 1/3".
- **Risks and edge cases:** experienced players skip it (add "Skip training wheels" in Settings), and the Daily/Gauntlet stay unchanged, so keep the flag off for those.
- **Size:** S
- **Score impact for me:** +0.7

### Proposal 2: Guided Practice 2.0 with a clear end
- **Problem it solves:** Practice step 7/8 could not be completed by attacking (shot-2, shot-3), the prompt is tiny, and it ends only with a skip.
- **How it would work (detailed design):**
  - Replace the bottom-left box with a top-centre prompt about 22 px tall: "STEP 4 of 8: SWIPE a rival up close (press F)". Draw a ring on the dummy bot when the step needs it.
  - Every step completes on the first valid action or attempt (a swipe press near a rival counts) and also auto-completes after 20 s with "Skipped: you can try it in a real match".
  - Keyboard keys are drawn as key-caps matching the Free Play KEYS overlay, and the step list is shown as 8 dots.
  - At the end, the card shows what you learned ("You can throw, swipe, dash, eat, STOMP") and the three buttons (shot-4) plus a short line "Win = 3 rounds".
- **Example moment:** I miss the swipe, the dummy glows, I press F, the dot fills and the game says "Nice! 7/8".
- **Rewards / progression hooks:** the +20 🪙 payout stays; add an achievement "Graduate" for finishing with no skips.
- **Risks and edge cases:** touch layouts need the touch button names (SWIPE) in the prompt, and a restart must not pay +20 🪙 twice.
- **Size:** M
- **Score impact for me:** +0.5

### Proposal 3: Readability pass with a "Text 16" floor and plain-words jargon sweep
- **Problem it solves:** many screens have 9–13 px text or jargon (Chef's Pass, Checkpoints, "1% of everything", rank points), and two layout bugs (Pantry banner, Gallery panel).
- **How it would work (detailed design):**
  - Set a minimum of 16 px for every button/label, 14 px for secondary text, over a dark scrim whenever the text sits on a busy background (Free Play info lines, title NEXT UP).
  - Rewrite jargon with one-line plain statements and hide anything not yet relevant (Chef's Pass card only after earning the first ★ or wave).
  - Move transient banners (Pantry first-visit, "First service") to the top-centre, 2.5 s, auto-dismiss.
  - Give the Gallery detail panel 24 px more height and a fixed two-line description.
- **Example moment:** the Challenges card says "STARTERS: 3 lives, beat as many waves as you can" and nothing else until you ask.
- **Rewards / progression hooks:** none needed; it supports every other system.
- **Risks and edge cases:** longer words in other languages, and Kid Mode (18 px minimum) must stay at least as large.
- **Size:** M
- **Score impact for me:** +0.5

## How this round's new features felt
- **TRY IT (free warm-up):** I used the Move Lab "try its power" button. It started at once, did not change my setup or pay anything (tokens stayed the same), and Esc returned me to the Gallery on the same card. Good. The 🥋 line "STOMP to go KAIJU, then THROW / SWIPE for Ink Cloud" is clear (shot-30).
- **Gallery detail panel / ✨ Shiny tag:** the panel did not go blank for Gobzilla or Squidgeon, and the "✨ SHINY 300 🪙 · needs Lv 3" button shows. But Squidgeon's panel text hits the bottom border (shot-28).
- **Achievements and unlocks on the receipt:** every item showed ("First Bite +30", "Lime colour", "NEW KAIJU: Chocomunch", "Play a Free Play match ✔ +20"). The text is small but complete (shot-8, shot-35).
- **Cup locks MODE / FIRST TO:** not touched (Party Cup stayed OFF).
- **Gauntlet:** a boss wave and NEW BEST were not reached (I only cleared waves 1–2). Perks are offered one at a time and I got +1 ❤ from "Extra Life". NEW RUN from checkpoint was not tested.
- **Daily preview card:** it opens a clear card with medal values, the same-match note, a streak line and START / 🌶️ SPICY (+40 🪙) / BACK (shot-36). Very good for a newcomer.
- **Giant Hand warns every time:** the lane and arrows were visible (shot-5), but the first time it killed me within 8 s and there was no clear "dash now" prompt for a first-timer. The tip line shows only on the countdown card.
- **Pantry asks one item at a time:** worked ("Toffee colour? tap again to buy for 28 🪙", shot-26). The first-visit +25 🪙 was announced, but the banner covers the content (shot-25).
- **KAIJU 7 s and HUD seconds:** the HUD showed "KAIJU 2s!" and "KAIJU 3s!". It felt short but fair and the dizzy spell was not a problem in my games.
- **1.4 s round shield:** I did not notice it either way, which is fine.
- **Move Lab dummy close:** yes, within a second I could use the power (shot-30).
- **📊 record vs kaiju:** shown as "You vs it: 1–0" (shot-28). Fun, but "Matches: 0" next to it is confusing.
- **Challenges (boss +30, weekly best +25, Spicy Daily):** the weekly line "This week: 0 (beat it: +25 🪙)" and the boss wave "+30 🪙 and a 🤍" are on the card (shot-37). The Spicy Daily button is on the Daily card (shot-36). It is clear what they pay, but jargon-heavy.
- **Story "📜 Meanwhile…", tip on card, "Chapters N/12":** all there. The tip is on the card ("Hold THROW to charge, let go to fling…", shot-16) and the chef does not repeat it. "Meanwhile, a bamboo steamer lid lifts an inch… then quietly settles again" is a nice hook (shot-22). "1% of everything" next to "Chapters 0/12" is unclear.
- **Records ▸ GOALS:** great. The 7 collections with next step plus the 4 closest achievements and 📌 PIN make a newcomer feel there is a path (shot-24).
- **Party (setup ⏱ ≈ N min, live RED–BLUE score, results crumbs):** setup shows "⏱ ≈ 2 min" and the RED–BLUE score exists in the HUD; results showed "Most KOs / Crumb Monster: GOBZILLA (14 crumbs eaten)" (shot-35). Spoon seconds and Phones-as-Pads bot-only rooms were not tested.
- **Help BASICS cards + EXTRAS tab:** BASICS is much better (shot-11). EXTRAS is accurate but dense and plain (shot-12).
- **Phones / Kid Mode text sizes:** not touched on this desktop run.
- **Workshop (6 slots, ✏ NAME, new props):** all 16 props and the 6 slots are visible, with ✏ NAME and 📂 SLOT ▶ buttons (shot-43). I did not place props or test the sticky pancake / baking cupcake / soft tomato.

## Bugs that block play
- None blocked play, and `/errors` stayed "none".
- Near-blocker for a first-timer: Practice step 7/8 "SWIPE up close" did not complete from normal attacks and needed the F skip (shot-3, shot-4). If the skip had been missed, a newcomer would be stuck in Practice.
