# Playtest evaluation — The Phone Player (profile 11 "phone", port 7111, landscape 1000x462 touch)

**Fun score: 7.0 / 10** (the core loop and nearly every menu work without a keyboard and look good; the party/cup setup misbehaves, hint text still speaks keyboard, and a lot of secondary text is too small for a real phone)

All screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r10-7111\` (shot-N.png).

## What I did
About 130 harness commands, 40 screenshots, every screenshot opened.
- Title (shot-1), then the 1-Minute Practice (shots 2-6): reached step 7/8 and left through PAUSE → QUIT. Saw the "tap QUIT again" confirm.
- Story: opening cutscene, chapter-1 intro cutscene and dialogue, played chapter 1 (lost one round, won the match), CHAPTER CLEAR panel with token, colour and kaiju rewards (shots 8-13).
- Party Modes setup (shots 14-16): joined, added a bot, toggled CUP, tried MODE and ROUNDS while the Cup was ON, opened the twist picker (shot 17).
- Twist picker with 🧪 TRY IT: ON → TURBO, played the 1-round match, lost (shots 18-21).
- Party Cup: played Game 1 (Classic, won) and Game 2 (Crumb Rush, 3rd) and read both standings screens (shots 22-25).
- CHALLENGES (shot 26): Gauntlet Starters, waves 1-2, perk pick, preview of the next wave, GAUNTLET OVER (shots 27-29).
- Gallery: shiny purchase and a locked colour tapped (shots 31-33).
- Pantry (34), Records plus pinning an achievement (35-36), Daily Hot Dumpling (37), Settings (39), Table Workshop (40). Help and Kid Mode were not opened (budget).
- 3 matches played to a result by seat bot (chapter 1 won, free-play twist lost, Cup game 1 won); 2 more matches unfinished (Cup game 2 finished, Gauntlet finished, Daily abandoned in round 4).
- Phone note: the STOMP, THROW (hold) and SWIPE `/tap` calls did not register while `/act stomp` did. I treat that as a harness limit (the game is frozen during a tap), not a game bug. The on-screen buttons themselves look correct: STOMP lights red with "BELLY FULL! TAP STOMP → KAIJU" (shot-3).

## What worked for me
- Landscape phone layout of the match is clean: top HUD cards, right-hand column PAUSE/MENU/EMOTE/FULL SCREEN, bottom-right THROW (big) / SWIPE / DASH / STOMP. Nothing covers the table's playable area (shot-2, 18).
- STOMP greys out until the belly is full and turns red when ready, with a big on-table prompt. It teaches itself (shot-3).
- The 🦖 KAIJU warning is easy to read: a pulsing ring around the grown kaiju shows its reach (shot-4).
- "▼ YOU" marker appears over my kaiju in play (shot-18) and the setup card says "👤 YOU · Touch · KAIJU ▶".
- Pause menu is big, tappable and has a quit confirmation (shot-6, 38).
- Story map, chapter card and dialogue boxes are readable; dialogue has SKIP CHAT and every cutscene has SKIP ▶▶ (shots 9, 11).
- CHAPTER CLEAR panel lists every reward on one card (shot-12). Gauntlet wave clear previews the next wave ("Next: wave 2 · 1 rival (NORMAL) · ❤❤") and offers a three-perk pick (shot-28).
- Party Cup standings show per-game points "(G1 +5, G2 +2)", the points table, how the mode places you, and what comes next ("Next: HOT DUMPLING · tap ▶ continue") (shots 23-24).
- Gallery header now shows 🪙 balance, the shiny banner appears, and a locked colour shows how to earn it (shots 32-33). Records footer follows the pinned achievement (shot-36).
- Everything in a whole session (title → Story → Party → Challenges → Gallery → Pantry → Records → Daily → Settings → Workshop) was reachable by tapping, with no keyboard.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make the Party Cup actually lock MODE / ROUNDS (FIRST TO) when ON.**
   - what: with 🏆 CUP: ON the MODE and ROUNDS pills must grey out and ignore taps. Today they still work.
   - where: Party Modes setup (shots 15-16).
   - how: the pill is dimmed with a 🔒, tapping it flashes "Cup picks the modes: 6 games, each mode once", the subtitle line always says "PARTY CUP: 6 GAMES · each mode once", and the "First to N rounds" line becomes "Rounds set per game by the Cup".
   - impact: +0.5
2. **Remove all keyboard wording from phone play.**
   - what: practice steps read "SPACE / A / THROW", "F / X / SWIPE", "WASD / stick / drag left side"; the Gauntlet perk screen says "PICK A PERK FOR THE NEXT WAVE (1 / 2 / 3)"; the setup screen shows a keyboard-style legend; Settings has "⌨ KEYBOARD CONTROLS".
   - where: Practice banner (shot-3, 4, 6), Gauntlet perk (shot-28), setup legend (shot-14).
   - how: detect touch and show only "THROW", "SWIPE", "tap a card". Hide the keys entirely on phones.
   - impact: +0.4
3. **Raise the smallest text to a phone-safe floor (about 14 css px, ~28 px in my 2x screenshots).**
   - what: sub-lines under the title buttons, DESSERT/SECOND HELPINGS pills, Spicy pill, "★★★ no rounds lost..." line, the end-of-match ticker, Workshop prop names, locked-colour hint, Gallery details, twist picker descriptions, Challenges footer lines.
   - where: Story (shot-9), twist picker (shot-17), Workshop (shot-40), Gallery (shot-31), end screens (shot-23/24), Challenges (shot-26).
   - how: one shared "phone min size" token; wrap rather than shrink; move the ticker to two lines or a tap-to-expand strip.
   - impact: +0.5
4. **Make the colour dots and other tiny taps finger-sized.**
   - what: the 21 colour dots in the Gallery are ~25 css px, below a safe 44 px tap target. The twist cards, Workshop prop tiles and UNDO/CLEAR are also small and close together.
   - where: Gallery (shot-31), Workshop (shot-40).
   - how: horizontal scrolling strip of 44 px dots with a bigger selection ring, or 2 rows of 11; add 8 px gaps between UNDO and CLEAR.
   - impact: +0.3
5. **Fix the setup bleed after TRY IT.**
   - what: after TRY IT I landed on the Free Play setup with BOTS: EASY, ROUNDS: 1, TABLE: SUNDAY ROAST and TWIST: TURBO, not on the screen I came from (shot-21).
   - how: TRY IT should snapshot and restore the previous setup, and return to the screen it was launched from.
   - impact: +0.3
6. **Make MENU/return paths consistent.**
   - what: finishing a Gauntlet run from CHALLENGES and pressing MENU drops me on the Party Modes setup (Cup ON, no joined seat) rather than the title or CHALLENGES. A first tap on MENU right after Cup game 2 did nothing and needed a second tap.
   - how: MENU always returns to where the match was launched from; buttons active the instant the panel appears.
   - impact: +0.3
7. **Fix the 🪙 totals so every screen agrees.**
   - what: Gallery header said 🪙 9 after the shiny (309 - 300), Pantry and Records say 34.
   - how: one balance source, refreshed on screen open; or show the +25 pending reward on the match-end card.
   - impact: +0.2
8. **Make the Cup standings text mode-aware and unobscured.**
   - what: the "Points per game" line always includes "Team Feast: every teammate gets the team's place" even in non-team games; the winning kaiju mascot sits on top of the last lines (shot-24).
   - how: show only the line for the mode just played; keep the mascot behind the panel or move it to the corner.
   - impact: +0.2
9. **Give the twist and Hot Dumpling rounds real context.**
   - what: the Daily countdown tip is "The giant hand goes for whoever has the fullest belly", which says nothing about Hot Dumpling (shot-37); the TRY IT twist match never says "EASY bot, 1 round".
   - how: mode-specific tips in the countdown; a small "TRY IT · EASY · 1 round" chip.
   - impact: +0.2
10. **Show the active twist in play at a readable size.** "⚡ TURBO" is a 9 px label at the bottom right next to DASH/THROW (shot-18). Put it under the round title at the top.
   - impact: +0.1
11. **Practice step order and feedback.** The 8-step practice does not progress in the order it names (a swipe or dash counted when it was asking for THROW, step 3/8 appeared after crumbs only). Show a ✓ per step and check off the real action.
   - impact: +0.2

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Party setup, Cup ON | MODE: CRUMB RUSH and ROUNDS: 5 still change when tapped with 🏆 CUP: ON, and they look un-greyed; brief says they should be greyed | shot-16 | Disable and dim both pills while the Cup is on |
| 2 | major | Party setup, Cup ON | Subtitle says "Eat the most crumbs before time runs out" (the single-mode description), and the info line says "First to 5 rounds", while the header says "PARTY CUP: 6 GAMES" | shot-16 | Cup-specific description and rules line |
| 3 | major | Free Play setup after TRY IT | Setup left on TWIST: TURBO, BOTS: EASY, ROUNDS: 1, TABLE: SUNDAY ROAST; returned to Free Play instead of Party Modes where TRY IT was opened | shot-21 | Restore previous setup and screen |
| 4 | major | Practice | Hints show keyboard keys on a phone: "SPACE / A / THROW", "F / X / SWIPE", "WASD / stick / drag left side" | shot-3, 6 | Touch-only wording on phones |
| 5 | major | Gauntlet perk screen | "PICK A PERK FOR THE NEXT WAVE (1 / 2 / 3)" is a keyboard instruction | shot-28 | "Tap a perk" |
| 6 | major | Gallery colour dots | 21 colour dots are about 25 css px each; hard to hit with a thumb | shot-31 | 44 px targets or a scroll strip |
| 7 | minor | Story chapter card | DESSERT pill is three lines of tiny text ("finish the Feast or 🎟 Chef's Pass"); SECOND HELPINGS sub-line is tiny | shot-9 | Larger text, shorter wording ("Locked: finish ch 12 or Chef's Pass") |
| 8 | minor | Story chapter card | The "★★★ no rounds lost · ★★ lost one · ★ any win" line is cramped between the SCENE button and the panel border; SCENE button touches the card's bottom border | shot-9 | Add 10 px spacing, move the legend into the star row |
| 9 | minor | Story chapter card | "🌶️ SPICY: clear it (or 🎟 Chef's Pass)" pill text is small | shot-9 | Bigger pill, two lines |
| 10 | minor | Twist picker | Card descriptions are very small (e.g. "No cutlery at all: swipe, shove and stomp", "Left is right and up is down (players only)") | shot-17 | Shorten descriptions, bigger type |
| 11 | minor | Twist picker | Panel's bottom border runs behind the setup pill row (TWIST/CUP/PHONES AS PADS buttons overlap the frame) | shot-17 | Shrink the panel or hide the pills while open |
| 12 | minor | Party setup | "TWIST: NONE" pill still says NONE while the picker is open on top; with TRY IT the twist never appears in the Party pill | shot-17 | Update pill on select |
| 13 | minor | In match, TURBO | "⚡ TURBO" label is tiny and at the bottom right, hidden near THROW/DASH | shot-18 | Move under round title, larger |
| 14 | minor | Match end panel | Bottom ticker "Most KOs / Crumb Monster / Kaiju Lover / Butterfingers" is about 9 px and runs almost the full width | shot-23, 24 | Two-line or rotating ticker, bigger |
| 15 | minor | Cup standings | "Points per game" line mentions "Team Feast: every teammate gets the team's place" in a Classic game and Crumb Rush game | shot-23, 24 | Mode-aware line |
| 16 | minor | Cup standings | The Dumplord mascot overlaps the last standings lines ("teammate gets the", "a knockout drops half") | shot-24 | Draw mascot behind panel or smaller |
| 17 | minor | Cup standings | I tied on 7 pts with Dumplord yet was listed 1st; no tie-break explanation | shot-24 | Show the tie-break ("most KOs") |
| 18 | minor | Match end (all) | Persistent 📷 SHARE button is jammed in the bottom-left corner next to the THIS MATCH card, and the THIS MATCH card sits on top of table props | shot-12, 20, 23 | Place SHARE inside the card |
| 19 | minor | Match end | First tap on ☰ MENU after Cup game 2 did nothing and a second tap was needed (could be harness, noting it) | n/a | Make buttons live instantly |
| 20 | minor | Gauntlet over → MENU | MENU returns to Party Modes setup (Cup ON, my seat empty, "RED 0 vs BLUE 0") instead of CHALLENGES or the title | shot-30 | Return to launch screen |
| 21 | minor | Coin totals | Gallery header 🪙 9 vs Pantry/Records 🪙 34 after buying the shiny | shot-33, 34, 35 | One source of truth |
| 22 | minor | Daily countdown | Two lines of medals text sit on the busy red-white picnic cloth with only an outline; hard to read | shot-37 | Dark backing plate |
| 23 | minor | Daily countdown | Tip "The giant hand goes for whoever has the fullest belly" is generic, not about Hot Dumpling | shot-37 | Mode tips |
| 24 | minor | Daily countdown | Medals text does not mark which medals are still open vs done | shot-37 | ✓ / open markers |
| 25 | minor | Practice | Steps named in the banner and the real count do not match the action (swipe/dash advanced "THROW your cutlery" step); STOMP step is not listed in the visible two lines | shot-3, 4 | Per-step ✓ list |
| 26 | minor | Practice | The banner box (top-left) covers the top-left of the table, partly hiding a grown kaiju at the top edge | shot-4 | Move to top centre |
| 27 | minor | Gallery | Locked-colour hint is 3 tiny lines in the right corner ("🔒 Bubblegum: \"Better Together\": Win a Team Feast match"), the selected lock is only faintly highlighted | shot-32 | Larger, put under the dot row |
| 28 | minor | Gallery | Shiny banner "✨ SHINY GOBZILLA!" covers the second roster row | shot-33 | Put it over the detail panel |
| 29 | minor | Gallery | Shiny button says "300 🪙 · needs Lv 3" while I already am Lv 3; reads like a blocker | shot-32 | "Requires Lv 3 ✓" |
| 30 | minor | Pantry | Weekly orders: nothing says whether an order is claimable or auto-pays | shot-34 | "Pays on completion" tag |
| 31 | minor | Records | Page footer text ("Next up: ... Tap any locked one to pin it ...") is two lines of small text with an orphan wrap | shot-35, 36 | Shorter wording |
| 32 | minor | Records | YOUR STATS heading crowds the first row ("Matches played") | shot-35 | Add spacing |
| 33 | minor | Workshop | Prop names (CUP, BOWL, ...) are about 7 css px; UNDO and CLEAR touch | shot-40 | Larger labels, gap |
| 34 | polish | Setup (Party/Free Play) | Control legend "LEFT SIDE drag to move · THROW hold, drag to aim..." is useful but small and sits over busy artwork | shot-14 | Dark backing strip |
| 35 | polish | Setup | "📱 PHONES AS PADS" is shown on a phone that is already the controller; confusing | shot-14 | Hide on touch devices or relabel "Join from other phones" |
| 36 | polish | Setup | Pill row is 11 pills across plus a second row with 3: very wide for one thumb, "LEAVE" sits at the far-left edge | shot-14 | Group into Players / Rules rows |
| 37 | polish | Setup | Info lines (bot difficulty, rounds, kaiju count, table) are on the busy plate art and slightly low-contrast | shot-14 | Dark backing |
| 38 | polish | Title | "🎯 NEXT UP" box is a 4-line paragraph at small size | shot-1 | Show only the first goal |
| 39 | polish | Title | The 6 top-right pills have text of about 8 css px | shot-1 | Bigger icons with text below |
| 40 | polish | Settings | Option descriptions are small, and "Saved on this device · tap to change" sits on the very bottom edge | shot-39 | Add bottom padding |
| 41 | polish | Challenges | "Checkpoints..." and "CHEF'S PASS: 0/12 ..." lines are tiny and the Pass line spans almost the full width of the modal | shot-26 | Two lines, bigger |
| 42 | polish | Pause menu | Match controls (STOMP/SWIPE/THROW) keep drawing on top of a paused game | shot-6 | Dim or hide them while paused |
| 43 | polish | FULL SCREEN button | Sits at top-left on menus over the title/logo area and at the right column on matches; on Story/Gallery it overlaps nothing but is large | shot-1, 9 | Fine; move into a corner icon |

## 🔠 Text and layout check
- **Title (shot-1):** OK. Pills small (#39), NEXT UP box dense (#38). No overlaps.
- **Practice (shots 2-6):** banner overlaps the table corner (#26); keys shown (#4). No cut-offs.
- **Pause menu (shot-6):** OK, big buttons.
- **Story map + chapter card (shots 9, 11):** cramped bottom of chapter card (#8), tiny pills (#7, #9). Dialogue box (shot-11) OK.
- **Cutscene (shot-10):** OK. Captions big, SKIP visible.
- **Chapter clear (shot-12):** OK; SHARE button at corner (#18).
- **Party Modes setup (shots 14-16):** no overlaps; wide pill row (#36); text on art (#37); Cup bug (#1-2).
- **Twist picker (shot-17):** panel border behind pills (#11); tiny descriptions (#10).
- **In match, turbo (shot-18):** TURBO label small (#13).
- **Match end, Free Play (shot-20):** OK except SHARE/card placement (#18).
- **Cup standings (shots 23, 24):** mascot over text (#16); long ticker (#14).
- **Challenges modal (shot-26):** OK, small footers (#41).
- **Gauntlet wave clear (shot-28):** perk text for card 3 nearly touches the card edge; mascot overlaps card 3's right edge slightly; keyboard hint (#5).
- **Gauntlet over (shot-29):** OK.
- **Gallery (shots 31-33):** dots small (#6), banner over roster (#28), hint small (#27).
- **Pantry (shot-34):** OK. Readable, no overlap.
- **Records (shots 35-36):** OK apart from #31, #32.
- **Daily countdown (shot-37):** medals text hard to read on the cloth (#22).
- **Settings (shot-39):** OK, small descriptions (#40).
- **Workshop (shot-40):** tiny labels, tight buttons (#33).
- **Not checked:** Help, Online, Spicy chapters, Dessert Course, Kid Mode.

## The single biggest structural problem
On a phone the game still behaves like a desktop game that was scaled down. The input is fully touch (that part is good), but the language is keyboard (SPACE / A, 1 / 2 / 3, KEYBOARD CONTROLS, PHONES AS PADS on a phone) and a lot of the secondary text is sized for a monitor. A phone player holds a 6-inch screen at arm's length, so text under about 14 css px is effectively invisible, and the game has many such lines (end-of-match ticker, twist descriptions, chapter pills, Gallery details, Workshop labels). There is no phone-specific text scale at all unless Kid Mode is switched on.

The second thing capping my score is that the new Party Cup setup contradicts itself: the Cup banner says one thing while the MODE/ROUNDS pills (and subtitle) still act as if the Cup is off. For a host passing a phone around this is the screen where trust is won or lost.

## Big change proposals

### Proposal 1: Phone Text Scale + touch language pass
- **Problem it solves:** tiny text and keyboard wording on phones (#3-#10, #13, #14, #27, #33, #34, #37).
- **How it would work:** add one global "phone" layout flag (touch + short side under 600 px). When set: (a) minimum font 14 css px for any body or caption text, 11 px only for decorative labels; (b) all hints go through a `controlWord('throw')` helper that returns "THROW" on touch and "SPACE / A" on keyboard, so Practice, tips, Gauntlet perk cards ("Tap a perk"), and the setup legend are generated per input; (c) any line longer than ~60 characters is split into two lines or truncated with a tap-to-expand "i"; (d) text on art gets a dark rounded plate (50-70% black) behind it; (e) the end-of-match ticker becomes a rotating single line (3 s each).
- **Example moment:** on the Gauntlet perk card I read "Tap a perk" and see three big cards with 16 px descriptions, instead of "1 / 2 / 3".
- **Rewards / progression hooks:** none; this is readability.
- **Risks and edge cases:** longer layouts could push buttons off screen on the 462 px height; test every screen at 1000x462 (including Kid Mode, which is already larger).
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: One source of truth for setup (Cup, TRY IT, return paths)
- **Problem it solves:** #1, #2, #3, #19, #20, #21.
- **How it would work:** the setup screen keeps a single `setupState` per entry point (Free Play, Party, Cup, Challenges). The pills are generated from it and each pill has a `lockedBy` reason. With Cup on, MODE/ROUNDS are `lockedBy: "cup"`, drawn dim with a 🔒 and a toast on tap ("The Cup picks every mode: 6 games"). TRY IT saves a copy of the setup, plays, and restores it on return, going back to the screen it came from. Every match-end MENU button returns to the launching screen (title for Challenges, setup for Party, map for Story). The coin balance is read from one store and refreshed on each screen enter.
- **Example moment:** I switch the Cup on, tap MODE by habit, and see "🔒 The Cup picks the modes" and the mode label does not change; I play a TRY IT twist and land back on my Cup setup with my seats still joined.
- **Rewards / progression hooks:** none.
- **Risks and edge cases:** saved seats and bot counts must survive; handle a player leaving during TRY IT; online lobbies must ignore it.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 3: Thumb-first tap targets
- **Problem it solves:** #6, #33, small pills and dots.
- **How it would work:** all interactive items on touch get a min 44 css px hit-area, even if the art is smaller (invisible padding). Gallery colours become a 2-row grid (11 + 10) with 44 px dots; Workshop prop tiles get a name line at 12 px; UNDO and CLEAR get a 12 px gap; the title's top pills become icons with a caption below.
- **Example moment:** I pick the 17th colour without hitting its neighbour.
- **Risks and edge cases:** denser grids need scrolling; keep the selection ring clear.
- **Size:** S-M
- **Score impact for me:** +0.4

## How this round's new features felt
1. **🦖 KAIJU warning:** works and is easy to read. The red reach ring and the growing sprite are obvious on a phone (shot-4). I could not time a real squash because the harness freezes the game, but the ring is large enough to dodge visually. The bot 1.8 s wait was not measurable. Positive.
2. **🏁 Gauntlet:** waves 1 and 2 were one rival each (NORMAL), no twist; the "Next: wave 2 · 1 rival (NORMAL) · ❤❤" preview after a clear is excellent and readable (shot-28). Heart count shown in the header ("GAUNTLET ❤❤ WAVE 2"). I lost 2 hearts across 2 waves to single rivals, which feels fair but not gentle. Perk pick is nice; fix the keyboard wording.
3. **🎟 Chef's Pass:** the progress line "CHEF'S PASS: 0/12 Trial ★ or Gauntlet wave 0/8 → opens 🌶️ Spicy on any reached chapter + the 🍰 Dessert Course early" is clear but tiny on the Challenges card (shot-26). It also shows on the Story pills, which is good. Not unlocked this session (best wave 1/8).
4. **🏆 Party Cup:** standings with per-game points and the next-mode line are very good (shots 23, 24). However, the setup does not grey out MODE / FIRST TO as promised (shot-16, bug #1), and the standings "Points per game" line still mentions Team Feast in non-team games. The mode's own score does place you (my 7 crumbs in Crumb Rush earned 3rd place, +2); this reads correctly. The tied standings had no tie-break wording.
5. **🧸 Kid Mode:** not tested this round; Settings describes "bigger text" (shot-39). As a phone player I would want that as a "BIG TEXT" setting without the easy bots.
6. **📖 Gallery:** 🪙 balance in the header is there; buying a Shiny shows the banner and a ✔ state (shot-33); tapping a locked colour shows the requirement (shot-32) but the text is small and the selected lock barely stands out. Coin total then disagrees with Pantry/Records (#21).
7. **🏅 Records:** pinning "Too Hot to Handle" changed the footer to "📌 Pinned: Too Hot to Handle (20%) — Win 5 matches in a row" (shot-36). Works.
8. **🎓 First-timer:** "▼ YOU" shows over my kaiju during play and on the setup card. Practice shows current step with keys and the next one, but keys are keyboard keys (#4); step order is loose (#25). Quick taps via the harness were not reliable, so I cannot judge that.
9. **⚡ Twist picker / TRY IT:** the picker is a good idea and fast to use (2 taps to a match, shot-17/18), but its text is small, the panel overlaps the setup pills, and returning from it overwrote the Free Play setup (#3, #11).
10. **🛠 Workshop:** picking a prop explains it ("CUP: a solid medium block. Cutlery and kaiju bounce off it, so it's cover from throws · tap the table to place it...", shot-40). Clear and useful. I did not cycle the hazard.
11. **📅 Daily:** the countdown card lists "Medals: 🥉 play +10 🪙 · 🥈 win +20 🪙 · 🥇 win without losing a round +40" (shot-37). It is hard to read on the cloth and does not mark which are open (#22, #24).
12. **Text and layout:** no hard overlaps of two buttons found, no cut-off text at the screen edge. The recurring problems are small text and text on busy art (see table).

## Bugs that block play
- None found that stop a full session. `/errors` returned "none" at the start, middle (after Cup) and end (after Workshop).
- Not blocking but worth knowing: with 🏆 CUP: ON the MODE and ROUNDS pills still change (#1); and TRY IT overwrites the Free Play setup (#3).
- Harness limit (not counted as a game bug): STOMP, hold-THROW and SWIPE via `/tap` did not register in frozen time; `/act` actions did.
