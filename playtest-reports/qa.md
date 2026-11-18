# Playtest evaluation — The QA Tester (profile 10, id "qa", port 7110)

**Fun score: 7.5 / 10** (Stable: zero JS errors across ~125 commands and every screen. Polish is the problem: no feedback on failed or blocked actions, text crowding on several cards, an overlap on the result screen, and inconsistent Esc / buttons behaviour.)

> Screenshot paths below are relative to `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r7-7110\` (file `shot-N.png`).

## What I did
- About 125 harness commands in total. `/errors` returned "none" at the start, middle and end.
- **Title:** every top button (Settings, Help, Kaiju, Records, Pantry, Workshop) and every card (Story, Free Play, Online, Party Modes, Daily, Challenges).
- **Settings:** toggled KID MODE on and off. Opened Keyboard Controls and rebound a key to one already in use (it swapped; I then reset). Opened Back Up / Move Save. Found the modal-close click-through bug (see issues).
- **Help:** all 5 tabs (Basics, Cutlery, Tables, Modes, Practice button seen).
- **Gallery:** selected a locked kaiju and a locked colour. Ran MOVE LAB with Gobzilla (stomp, power, Esc pause, restart, music toggle, quit).
- **Records:** both pages. Pinned and unpinned an achievement 3 times.
- **Pantry:** tried to buy with 25 coins (silent no-op). Later bought Toffee, Lilac and the 30%-off Lifeline. Clicked an owned item. Tried Lunchbox with too few coins.
- **Workshop:** placed 5 props, cycled Surface and Hazard, SAVE (Table Maker achievement), CLEAR, COPY CODE, PASTE CODE, NEXT SLOT, PLAY IT on an empty table.
- **Free Play setup:**
  - Cycled Bot Level 4 values, First To 5 values and all 17 tables.
  - Cycled all 20+ twists (10 singles then 10 double twists).
  - Toggled Power-ups and Hazards, filled all 6 seats, used RANDOM.
  - Opened House Rules, saved slot 1, copied a code, pressed "Enter a friend's code".
- **Party Modes:** setup screen, Team Feast 1v1 start with no one "joined", Party Cup start and game 1 results (autoplay).
- **Challenges:** modal, Trials list, started Hard Duel (autoplay, failed), retry via the 1 key.
- **Daily:** started Hot Dumpling and quit via pause.
- **Story:** map, auto-playing opening cutscene, Skip, chapter 1 intro cutscene.
- **Online:** lobby, Join a Game with an empty code, Back.
- **Matches:** about 9 matches played via `/autoplay` or `/act` (custom table, Cup game 1 plus 4 more, Trial, Daily). I won 2 of them. Pantry went from 25 to 602 coins thanks to achievement payouts.
- **Esc in many places:** results, Move Lab, Trials, Challenges modal, Online lobby, modals.

## What worked for me
- No JavaScript errors anywhere, including while swapping keys, spamming twist and table cycling, and quitting mid-match.
- Pause menu (Resume, Restart, Music, Sound, Quit) behaves correctly and is clean (shot-12). Restart works in Move Lab.
- Settings screen is tidy: all 12 toggles aligned, no overflow (shot-2).
- Keyboard rebinding with swap on conflict ("A key already in use swaps over") plus RESET TO DEFAULT is exactly right (shot-3).
- Pantry: owned state, 30%-off pricing (245 vs 350) and balance deduction are all correct (shot-44).
- Workshop SAVE fires the Table Maker achievement and pays the coins. COPY CODE prints the code on screen (shot-23).
- House Rules slots show a readable summary and the code is shown on screen with "(copied)" (shot-36).
- Trials list is clear: star rules, per-trial matchup and KO goal (shot-47). The fail screen tells you why, with a retry hint.
- First Service banners (+20 and +25 coins) show on the result screen. Party Cup results give a clear standings list (shot-42).
- Join-a-Game validates input: "Room codes are 4 letters." (shot-56).

## 🧾 Exactly what would make this a 9/10 for me
1. **Feedback for every blocked or failed action.**
   - What: a short toast or shake with a reason whenever a click does nothing.
   - Where: Pantry (unaffordable cards), Workshop PASTE CODE and Gallery locked colours, "Enter a friend's code", Records pin, SAVE failures.
   - How it should behave:
     - A 1.5 s red toast such as "Need 15 more 🪙", "Clipboard blocked: tap the box and press Ctrl+V" or "Not a valid table code".
     - The Pantry card also shakes.
     - Pinning shows "📌 Pinned: On a Roll" and the footer line changes from "Next up" to "Pinned".
   - Score impact: +0.5.
2. **Fix the modal close click-through.**
   - What: clicking CLOSE on Back Up / Move Save also toggled the Settings row underneath (COMEBACK HELP flipped ON to OFF).
   - Where: Settings, Back Up modal. Check every DOM modal (House Rules, Challenges, Online).
   - How it should behave: the modal swallows pointer events and the underlying screen ignores the click that closed it. Add a 150 ms input lock after any close.
   - Score impact: +0.4.
3. **One Esc rule everywhere.**
   - What: today Esc does these different things:
     - Pause menu opens in a match, and in Move Lab even though the banner says "Esc to leave".
     - Goes back one screen in Settings.
     - Closes House Rules and Challenges.
     - Does nothing in the Online lobby (shot-54 / shot-55).
     - On the result screen, jumps to the setup menu while the on-screen label says "Esc menu".
   - Where: all screens.
   - How it should behave: Esc always means "back one level". Lobby Esc goes back to the title. The Move Lab banner says "Esc to pause · Quit to leave", or Esc leaves directly.
   - Score impact: +0.3.
4. **Result screens: buttons from frame 1, and no text on top of the arena.**
   - What: REMATCH / RETRY / MENU / CONTINUE buttons appear 1 to 2 s after the banner. The banner says "1 / START rematch · Esc menu", so for 1 to 2 s a mouse or touch player sees no buttons (shot-28, shot-49).
   - Where: after every match (Free Play, Trials, Cup).
   - How it should behave: draw the buttons with the banner. Put the standings on a solid panel so they do not sit on the gravy boat or kaiju art.
   - Score impact: +0.4.
5. **Fix the First Service banner overlap on the result screen.**
   - What: the green "🍽 FIRST SERVICE: ... MATCH ✓ +20 🪙" banner is hidden behind the big "SQUIDGEON RULES THE TABLE" title and is unreadable (shot-28).
   - How it should behave: stack banners vertically, or move them under the title. Cap the title to two lines.
   - Score impact: +0.3.
6. **Shrunken text on the Free Play TWIST button.**
   - What: with a double twist selected ("⚡⚡ MINI KAIJU + BOUNCY CASTLE") the label shrinks to about 7 px and is unreadable (shot-30).
   - How it should behave: show "⚡⚡ MINI + BOUNCY" on the button (abbreviated names), with the full name in the strip under the buttons (it is already there). Use min 12 px.
   - Score impact: +0.3.
7. **Tiny and crowded text on small cards.** Fix these:
   - Trials cards: 3-line descriptions touch the borders (Thin Ice, Two Crowns, Chef's Table, shot-47). The header legend is about 12 px.
   - Gallery: the "Collection 56% 🐉 16/20 · 🍽 15/18 · 🎨 2/21" line is tiny and jammed into the top-right corner (shot-9).
   - Gallery colour lock hint at the far right (shot-15) is tiny.
   - Mastery line wraps and orphans the word "sparkles" (shot-9).
   - Pantry Lifeline card is 3 lines tall and touches its bottom border (shot-44).
   - Target: min 13 px, 12 px padding inside cards.
   - Score impact: +0.4.
8. **Pre-match HUD for challenge modes.**
   - What: Trials and Daily show nothing in the HUD that says you are in a Trial or what the star goal is. Trial HUD: just "ROUND 1 · SUNDAY ROAST". The goal is only visible on the fail screen after you lose (shot-48 / shot-49).
   - How it should behave: top-right shows "🎯 TRIAL: HARD DUEL · ★★★ 4+ KOs (0)" with a live KO counter.
   - Score impact: +0.3.
9. **Make Party Cup progress visible during play.**
   - What: the HUD shows only "ROUND 1 · LEFTOVERS" for Cup game 1 (shot-41). There is no points tally on the HUD, and the Cup rules line does not say the final is x2.
   - How it should behave: a pill reading "🏆 Cup 1/6 · you 2 pts · leader 5 pts", and "final ×2" in the setup rule text.
   - Score impact: +0.2.
10. **Help covers the new features.**
    - What: Help → Modes does not mention Party Cup, double twists, Trials or Move Lab. The twist paragraph is about 11 px (shot-8). The Help tab highlight is confusing: BASICS stays highlighted when CUTLERY or TABLES is selected, so two tabs look active (shot-6 / shot-7).
    - Score impact: +0.2.
11. **Safety nets on destructive buttons.**
    - What: Workshop CLEAR wipes all props with no confirm or undo. RANDOM in Free Play silently overwrites twist and table.
    - How it should behave: CLEAR shows "Tap again to confirm" for 2 s. RANDOM says what it changed.
    - Score impact: +0.2.
12. **Title screen "NEXT UP" readability.**
    - What: the 4-line NEXT UP text sits on the fork and strawberry art with no backing, and is about 13 px (shot-38). The hint "◀ ▶ choose · ENTER / A / tap to start" sits over Norigon.
    - How it should behave: put it on a dark rounded panel and cap it at 3 lines.
    - Score impact: +0.2.
13. **Daily-challenge start banner covers the start mats.** In shot-50 the full-width banner text runs across Pizzaraptor's and Dumplord's start mats. Fix by moving it up or narrowing it.
    - Score impact: +0.1.
14. **Level-up reward clarity.** The receipt says "⬆ Mastery Lv 2 Line Cook" but does not say which cosmetic unlocked (dash sparkles). Name it.
    - Score impact: +0.1.

Doing all of these takes this from 7.5 to roughly 9.0 to 9.4.

## 🔍 Every issue I saw (exhaustive)
Severity: blocker / major / minor / polish.

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Settings → Back Up / Move Save modal | Clicking CLOSE (at 533,550) also toggled the Settings row beneath: COMEBACK HELP flipped ON to OFF. The click goes through the modal. | shot-4 | Swallow pointer events on modal close; lock input for 150 ms. |
| 2 | major | Result screens (Free Play, Trials, Cup) | The banner says "1 / START rematch · Esc menu" or "1 / START retry · Esc trials", but REMATCH / RETRY / MENU buttons only appear about 1 to 2 s later. A mouse or touch player sees no buttons at first. | shot-28, shot-49 | Draw the buttons together with the banner. |
| 3 | major | Result screen (Cup game 1) | Green "🍽 FIRST SERVICE ... MATCH ✓ +20 🪙" banner is hidden behind the big title "SQUIDGEON RULES THE TABLE" (the text is cut by the title). | shot-28 | Stack banners vertically, below the title. |
| 4 | major | Pantry (unaffordable item) | Clicking a card you cannot afford gives no feedback at all (no toast, no shake). The only cue is "(not enough yet)" in the small text. | shot-21 | Toast "Need N more 🪙" and shake the card. |
| 5 | major | Workshop → PASTE CODE | Pressing it did nothing visible: no prompt, no toast, no error. Same for House Rules → "ENTER A FRIEND'S CODE". I could not tell whether the clipboard was blocked or the code was rejected. | shot-24, shot-37 | Show a text box fallback and a toast for both outcomes. |
| 6 | minor | Free Play | TWIST button label shrinks to about 7 px for double twists ("⚡⚡ MINI KAIJU + BOUNCY CASTLE"). The ⚡⚡ renders as "⚡ ⚡". | shot-30 | Use short names on the button; 12 px minimum. |
| 7 | minor | Free Play header | Double twist is shown as a single "⚡ MINI KAIJU + BOUNCY CASTLE", while the button says "⚡⚡". Inconsistent. | shot-30 | Use ⚡⚡ in both. |
| 8 | minor | Move Lab (in a match) | Banner says "Esc to leave", but Esc opens the Pause menu. You still have to click QUIT. | shot-10, shot-12 | Change the wording, or make Esc leave. |
| 9 | minor | Online lobby | Esc does nothing (stays on the lobby, with no BACK confirmation). Everywhere else Esc goes back. | shot-54, shot-55 | Esc goes back to the title. |
| 10 | minor | Result screen | After a match, Esc jumps to the Free Play setup menu instead of showing the pause or confirm menu. The Esc behaviour differs from every other screen. | shot-29 | Make the label say "Esc setup" or keep one rule. |
| 11 | minor | Match countdown overlay | The countdown number "1" and the tip lines sit directly on top of the gravy boat or soup bowl, so they compete visually. The "PARTY CUP · GAME 1/6 · CLASSIC · Leftovers" line crosses the bowl. | shot-10, shot-41 | Dark pill behind the text, or move it to the lower third. |
| 12 | minor | Daily match start | Full-width "DAILY CHALLENGE · win this match..." banner overlaps two start mats (Pizzaraptor, Dumplord). | shot-50 | Narrow it or move it to the top bar. |
| 13 | minor | Title | "NEXT UP" block (about 13 px) sits on the fork and strawberry art with no backing. "◀ ▶ choose · ENTER / A / tap to start" sits over Norigon. | shot-38 | Dark panel behind it. |
| 14 | minor | Title | "PARTY MODES" card subtitle wraps to 3 lines ("Teams · Rush · / Dumpling") and is cramped inside the box. | shot-1 | Shorten to "Teams · Rush · more". |
| 15 | minor | Title | NEXT UP string in `/look` ends in a broken character "Win 10 matches → \ud83c". May be only a harness truncation. It would be a bug if the game truncates mid-emoji. | (look text) | Truncate on code points, not UTF-16 units. |
| 16 | minor | Gallery | "Collection 56% 🐉 16/20 · 🍽 15/18 · 🎨 2/21" is tiny and jammed into the top-right corner. The meaning of 🐉 / 🍽 / 🎨 is unexplained. | shot-9 | Larger text with labels (Kaiju / Tables / Colours). |
| 17 | minor | Gallery detail | Mastery line wraps and leaves a lone word: "...next: ✨ Dash / sparkles". | shot-9 | Shorten or widen the line. |
| 18 | minor | Gallery colours | The lock hint (`🔒 Ocean: "Regular Diner": Win 10 matches (0/10)`) is tiny and at the far right (about 11 px). Colours are 21 tiny swatches with one repeated lock icon. | shot-15 | Show the hint under the row, larger. |
| 19 | minor | Gallery (locked kaiju) | "Unlock: Beat Story chapter 4: Boss of the Belt (0/4 cleared)" then a blank line then "Left: normal look · right: KAIJU MODE". The caption is meaningless for a silhouette. | shot-14 | Hide the caption when locked. |
| 20 | minor | Records | Pinned achievement is only shown by a pin icon. The footer still says "Next up: First Bite" and nothing says "Pinned: On a Roll". Toggle state is hidden. Click again unpins silently. | shot-17 | "📌 Pinned" label; toast on pin / unpin. |
| 21 | minor | Records | Hint "Click any locked one to 📌 pin it (shown on the title + after matches). Each achievement pays 30" wraps and the 🪙 ends the second line. | shot-16 | Shorter text or more width. |
| 22 | minor | Records | Progress bars with 0 progress show only a dot, so achievements without a bar (Speed Eater, Not It!) look inconsistent with those that have one. | shot-16, shot-18 | Same bar, or no bar, on all. |
| 23 | minor | Records | "Daily Special", "Cup Champion" etc. show no progress at all, so you cannot tell how far you are. | shot-18 | Show 0/1. |
| 24 | polish | Records | PAGE ▶ button is highlighted by default and pages loop 1 to 2 to 1. No "Page 1/2" indicator. | shot-16 | Show "1/2". |
| 25 | minor | Pantry | Lifeline card has 3 lines of text and the last line "enough yet)" touches the card's bottom edge. | shot-20 | Move the price to its own line; shorten. |
| 26 | polish | Pantry | Weekly orders get completed ("✓ Knock out 20 rivals 20/20") with no claim and no explicit payout line. Coins appear in the total silently. | shot-44 | Toast "+40 🪙 order complete". |
| 27 | polish | Pantry | "Colours you buy appear in the Gallery" note is about 11 px grey on a busy background. | shot-20 | Larger, higher contrast. |
| 28 | polish | Pantry | Owned card layout changes (name y 188 to 196) so the content jumps. | shot-44 | Fixed layout. |
| 29 | minor | Workshop | "PROPS (tap one, then tap the table)" label touches the top of the CUP button (label y 100, button top 107). | shot-22 | 8 px gap. |
| 30 | minor | Workshop | CLEAR is instant, with no confirm or undo. | shot-24 | Tap-twice confirm. |
| 31 | polish | Workshop | Hint says "tap a prop to remove it" but the palette also uses "tap a prop". It reads as ambiguous. | shot-22 | "tap a placed prop". |
| 32 | polish | Workshop | Code shown after COPY CODE is cut with "…" so it cannot be checked by eye. Copy toast replaces the hint line. | shot-23 | Expand on click. |
| 33 | polish | Workshop | Achievement unlock "Table Maker unlocked!" is only a one-line hint-bar message. There is no banner. | (look) | Use the standard achievement toast. |
| 34 | minor | Free Play | RANDOM silently re-rolled the twist to NONE and the table, and left Power-ups / Hazards alone, with no explanation of what changed. | shot-33 | Toast "Random: Sunday Roast · Turbo". |
| 35 | minor | Free Play | Seat 6 shows "Bot: NORMAL ✎ (tap)" with a pencil glyph, while the strip says "Bot difficulty: EASY". The two disagree and the ✎ is unexplained. | shot-33 | Explain with a legend, or drop the per-seat override. |
| 36 | polish | Free Play | The seat arrows next to Gobzilla are dim and tiny. | shot-29 | Larger. |
| 37 | polish | Free Play | "Tiny monsters. Giant dinner." tagline repeats on every setup screen. | shot-29 | Replace with the mode explainer. |
| 38 | polish | Free Play | "16/20 kaiju (unlock more in Story)" sits in a long grey strip together with 3 other facts and is easy to miss. | shot-29 | Split into two lines. |
| 39 | polish | Free Play / Party | The table description line (e.g. Fondue Night) runs almost the full width and the table thumbnail is squashed (about 55 x 25). | shot-32 | Cap length; 2 lines. |
| 40 | minor | House Rules | Slot summary omits kaiju, table and twist ("Classic · first to 1 · no power-ups · no hazards · easy bots"). Two saves can look identical. | shot-35 | Add table and twist. |
| 41 | polish | House Rules | The "Code: KK1-..." line in the modal is only about 11 px and is the only proof that COPY worked. | shot-36 | Larger and selectable. |
| 42 | minor | Party Modes | "Click a seat (or press THROW...) to join" (y 644) sits touching the bottom of the PLAY button and just above the Party Cup rules line (y 661), which sits right above KEYS / HOUSE RULES. Three lines are stacked tightly. | shot-39 | Spread or merge the lines. |
| 43 | minor | Party Modes | PLAY works with zero joined humans and starts a 1v1 bot Team Feast ("RED · Spoon" vs "BLUE · Ladle"), with no warning that nobody has joined. | shot-40 | Require a player, or say "Bots only". |
| 44 | minor | Party Modes | The 🏆 PARTY CUP button starts game 1 immediately when clicked instead of toggling a mode. It is unclear it is a start button, and the setup options (First To, Bot Level) get ignored. | shot-41 | Rename to "START PARTY CUP" or make it a toggle. |
| 45 | polish | Party Modes | The cup line says "points 5 / 3 / 2 / 1" but not that the final is x2. | shot-39 | Add "final ×2". |
| 46 | minor | Party Cup (in game) | HUD shows only "ROUND 1 · LEFTOVERS" with no "Game 1/6" or standings. | shot-41 | Add a cup pill. |
| 47 | polish | Cup result | Mastery level-up line "⬆ Mastery Lv 2 Line Cook · 2/100 XP" does not name the unlocked cosmetic. | shot-42 | Name it. |
| 48 | minor | Trials | Descriptions run to 3 lines and touch the card edge (Thin Ice, Two Crowns, Chef's Table). The title y-position varies per card. The top legend is about 12 px grey. "boom-rang" is hyphenated oddly. | shot-47 | More padding; say "boomerang". |
| 49 | minor | Trials (in game) | HUD says only "ROUND 1 · SUNDAY ROAST", with no trial name or KO goal while playing. | shot-48 | Add a trial pill with a live KO count. |
| 50 | polish | Trial fail screen | The explanation line sits on top of the gravy boat. The KAIJU-mode rival art covers its right edge. | shot-49 | Backing panel. |
| 51 | polish | Result screen | Standings text sits over live arena items and a kaiju (Norigon art and the 🔥 pickup) in some matches. | shot-43 | Panel behind the text. |
| 52 | polish | Result screen | Receipt box ("THIS MATCH") overlaps the bottom-left start mat and a kaiju sprite. | shot-28 | Offset or panel. |
| 53 | polish | Result screen | "(YOU)" is placed after the name in the standings but nowhere else. Row 2 "GOBZILLA (YOU)" is not highlighted. | shot-28 | Highlight the player row. |
| 54 | minor | Challenges modal | Behind the dim layer the title's "NEXT UP" text still ghosts through, and "Best wave: 0 · Esc closes" is about 11 px. | shot-46 | Darker scrim; larger footer. |
| 55 | polish | Help | Help → Modes: Twists paragraph is about 11 px and dense, with 10 twists in one run-on paragraph. It lacks double twists, Party Cup and Trials. | shot-8 | List form, bigger text. |
| 56 | polish | Help | Two tabs look highlighted (BASICS stays "pressed" while another is selected). | shot-6, shot-7 | Single active state. |
| 57 | polish | Help → Tables | The locked-table descriptions are dim grey on dark and hard to read ("Beat Story chapter 6: On the Chopping Block (0/6 cleared)"). | shot-7 | More contrast. |
| 58 | polish | Story map | SCENE button sits against the panel's right border, hugging "Not cleared yet", and the star legend "★★★ no rounds lost..." (about 10 px) is squeezed beneath it. | shot-52 | Move SCENE elsewhere. |
| 59 | minor | Story | The opening cutscene plays automatically on first entry (before the map), with only a small SKIP in the corner. Pressing the map's PLAY button then plays another cutscene first. Two cutscenes before the first fight. | shot-51, shot-53 | Show the skip hint and remember a "skip all" choice. |
| 60 | polish | Story cutscene | Caption "CHAPTER 1 · THE FIRST COURSE" (orange) on the cream plate is low contrast. The typewriter caption "CRABBAGE IS FE" is partly cut off mid-type (expected), but there is no tap to fast-forward hint. | shot-53 | Dark caption strip. |
| 61 | polish | Online | The lobby is DOM based and `/look` returns no text (accessibility). Fonts differ from the rest of the game (Join / Back buttons use a different face). | shot-54 | Consistent button font; ARIA labels. |
| 62 | polish | Settings → Back Up | The save code is a wall of base64 in a small box. The Copy button label is "COPY MY CODE", but the modal does not confirm it copied. | shot-4 | Toast "Copied". |
| 63 | polish | Settings | "Saved on this device · ENTER / tap to change" sits 6 px from the bottom buttons. | shot-2 | Extra spacing. |
| 64 | polish | Pause menu | Pausing and toggling MUSIC OFF inside a match persists to the whole game, but the Settings label ("MUSIC: ■■□□□") does not show it was changed. I could not confirm state sync. | shot-12 | Sync labels. |
| 65 | polish | First Service | The step "Finish the 1-minute Practice" is still pending after I played the Move Lab practice match. The Move Lab does not count and is not flagged as such. Counter was 3/6 then 4/6. | shot-38 | Say "(not Move Lab)". |
| 66 | polish | Title | The "NEW HERE? 1-MINUTE PRACTICE" button vanishes after the first match, even though the First Service step "Finish the 1-minute Practice" is unfinished. There is then no obvious way to start the step. | shot-1, shot-38 | Keep it while the step is pending. |

## 🔠 Text and layout check
- **Title (shot-1, shot-38):** problems. NEXT UP text overlaps art (#13). PARTY MODES subtitle wraps to 3 lines (#14). Hint line over Norigon (#13).
- **Settings (shot-2):** OK. The footer is tight (#63).
- **Keyboard Controls (shot-3):** OK.
- **Back Up / Move Save modal (shot-4):** OK visually. Click-through bug (#1).
- **Help Basics (shot-5):** OK.
- **Help Cutlery (shot-6):** OK. The two-tab highlight is confusing (#56).
- **Help Tables (shot-7):** OK. Locked text is low contrast (#57).
- **Help Modes (shot-8):** problem. The twist text is tiny (#55).
- **Gallery, unlocked and locked (shot-9, shot-14, shot-15):** problems. #16, #17, #18, #19.
- **Move Lab and pause (shot-10, shot-11, shot-12):** countdown over the gravy boat (#11), Esc wording (#8). Otherwise OK.
- **Records page 1 and page 2 (shot-16, shot-17, shot-18):** minor. #20, #21, #22, #23, #24.
- **Pantry (shot-20, shot-21, shot-44):** minor. #25, #26, #27, #28.
- **Workshop (shot-22, shot-23, shot-24, shot-25):** minor. #29, #30, #32.
- **Free Play setup (shot-29, shot-30, shot-32, shot-33):** problems. #6, #7, #35, #39.
- **House Rules modal (shot-34 to shot-37):** OK. #40, #41.
- **Party Modes setup (shot-39):** problem. Stacked bottom lines (#42).
- **In-match HUD, 4 players (shot-26, shot-27):** OK.
- **In-match HUD, Cup (shot-41):** OK layout. #11, #46.
- **Result screen, standard (shot-28, shot-43):** problems. #2, #3, #51, #52.
- **Cup result (shot-42):** OK except #47. Buttons CONTINUE / MENU are clean.
- **Challenges modal (shot-46):** OK. #54.
- **Trials list (shot-47):** problems. #48.
- **Trial fail (shot-49):** problem. #50.
- **Daily start (shot-50):** problem. #12.
- **Story map (shot-52):** problem. #58.
- **Story cutscenes (shot-51, shot-53):** #60.
- **Online lobby, Join a Game (shot-54, shot-55, shot-56):** OK. The validation message fits. Esc issue (#9).

## The single biggest structural problem
There is no consistent system for **feedback and confirmation**. The game is rock solid (no errors across heavy abuse), but a player who clicks something that cannot work gets silence. That covers an unaffordable Pantry card, PASTE CODE, "Enter a friend's code", Move Lab "Esc to leave", and a pin toggle you cannot see. Navigation rules (Esc, back, result buttons) vary screen to screen, and the one real functional bug (the modal click-through) comes from the same root cause: input is not owned by the topmost layer.

A single toast/shake service plus a "topmost layer owns input and Esc" rule would close roughly 15 of the 66 issues. After that the remaining work is mostly tightening small text on cards (Trials, Gallery, Pantry, Records) and giving challenge modes a HUD pill.

## Big change proposals (2–3, most important first)
### Proposal 1: One feedback and input-layer system
- **Problem it solves:** Issues 1, 4, 5, 8, 9, 10, 20, 26, 30, 34, 44, 62. Silent failures, inconsistent Esc, and click-through on modals.
- **How it would work (detailed design):**
  - A global `UI.toast(text, kind)` (kinds: info, good, bad) renders a pill at the bottom-center for 1.6 s (2.5 s for errors). It stacks at most 2 and never overlaps result buttons (y above 600).
  - A global `UI.shake(element)` for rejected presses (about 6 px, 200 ms).
  - Input layer stack: every modal, menu, pause and lobby pushes a layer. Only the top layer receives clicks and keys. When a layer is popped, input stays locked for 150 ms.
  - Esc always calls `popLayer()`, or `goBack()` when the stack is empty. In-match Esc opens Pause (layer). Pause's QUIT is the only way out. The Move Lab banner is reworded to "Esc pause · QUIT to leave".
  - Messages: Pantry "Need 15 more 🪙", PASTE "Clipboard blocked: type the code here" (opens a text field), invalid code "That table code isn't valid", pin "📌 Pinned: On a Roll" / "Unpinned", weekly order "+40 🪙 Order complete", RANDOM "Random: Sunday Roast · Turbo".
- **Example moment:** I click Lifeline with 25 coins. The card shakes and a red toast says "Need 220 more 🪙". I click COPY MY CODE; a toast says "Save code copied".
- **Rewards / progression hooks:** none needed; this is clarity. Toasts can also carry achievement and level-up lines (naming the unlocked cosmetic).
- **Risks and edge cases:** toast timing under reduced-effects, and avoiding toasts over the result buttons. Check the gamepad / phone flows use the same layer stack.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: Challenge HUD pill and Cup tracker
- **Problem it solves:** Issues 46, 49, 45, 50. Trials, Daily and Cup are the headline features, yet in play they look like any normal round.
- **How it would work (detailed design):**
  - A top-right pill under the table name:
    - Trial: "🎯 HARD DUEL · ★★★ 4+ KOs · KOs 1/4"
    - Daily: "📅 DAILY · win to keep 🔥3"
    - Cup: "🏆 CUP 2/6 · You 7 · Leader 9". The pill turns gold on the final game: "🏆 FINAL ×2".
  - The pill uses a dark background, 14 px text and a 2 s pulse when the number changes.
  - On the Trials fail screen, show three star slots with the current achievement filled, and the same text on a panel so it does not sit on the gravy boat.
  - Result screens for these modes always show REMATCH / RETRY / MENU at once (issue 2).
- **Example moment:** In Trial "Hard Duel" I knock out the raptor for the second time. The pill ticks to "KOs 2/4" and flashes; I know I am half way to three stars.
- **Rewards / progression hooks:** shows the 20 🪙 per new star on the fail screen ("1 more KO for ★★★ = +20 🪙").
- **Risks and edge cases:** the pill must not cover the right-hand HUD name or the start mats in 6-player games; keep it in the top bar band (y under 80).
- **Size:** S
- **Score impact for me:** +0.4

### Proposal 3: A "text audit" pass with enforced minimums
- **Problem it solves:** Issues 6, 14, 16 to 18, 21, 25, 27, 29, 39, 41, 48, 54, 55, 57, 58.
- **How it would work (detailed design):**
  - Set a design-system floor: 13 px body, 12 px absolute minimum for hints and none below. Cards get 12 px inner padding and a max of 2 body lines.
  - Auto-fit labels: buttons shrink text only down to 12 px and then abbreviate (the TWIST button uses `shortName` such as "MINI + BOUNCY").
  - Add a dev-only layout test (headless screenshot per screen) that flags any text bbox beyond its parent's padding box.
  - Move tiny meta lines (Gallery collection counts, Pantry footer, Challenges footer) into proper 14 px labelled rows.
  - Put dark rounded panels behind any text drawn over art (Title NEXT UP, result standings, Daily banner).
- **Example moment:** Thin Ice card shows two body lines, with the KO goal on its own right-aligned chip "★★★ 4+ KOs".
- **Rewards / progression hooks:** none; readability on phones and TVs is the benefit.
- **Risks and edge cases:** localisation will lengthen strings; the abbreviation fallback must be per-string.
- **Size:** M
- **Score impact for me:** +0.5

## How this round's new features felt
- **Progression (mastery, rank, achievements, daily deal, cheap colours):**
  - It paid out generously. 25 coins became 602 within about 8 matches, which let me test every purchase. Prices and the 30%-off Lifeline (245 vs 350) were correct.
  - Cosmetic unlocks are not named on the receipt (#47). The pin toggle has no confirmation (#20).
  - Achievements pay 30 🪙 (Table Maker did), but only the hint line announced it (#33).
- **First Service checklist:** the banner and counter work (3/6 → 4/6). But Move Lab does not count as practice (#65), and the practice button disappears while that step is still open (#66). The banner clashes with the result title (#3).
- **Challenges (Gauntlet checkpoints and Trials):**
  - The modal is clear (shot-46). The locked Mains/Desserts/Seconds tiers explain the unlock rule ("clear wave 4").
  - Trials list is informative but crowded (#48), and the in-game HUD has no trial info (#49). Fail screen text was clear.
- **Move Lab:** works (stomp, power, quit). The "Esc to leave" wording is wrong (#8). Start state "STOMP READY" is a nice touch. Dumplord dummy ran off the table, which is fine.
- **Double twists:** the cycle works (10 singles then 10 combos then NONE) with no errors. The button label is unreadable on long combos (#6, #7).
- **Party Cup:** starts instantly from one button (#44), names the winner and awards 5/3/2 points (shot-42). Needs an in-game tracker (#46) and "final ×2" in the rules text (#45).
- **Story (phase 2 bosses and Kid Mode):** I could not reach bosses in this session. Kid Mode toggled cleanly in Settings. Two cutscenes in a row before chapter 1 is slow (#59).
- **Workshop COPY / PASTE CODE:** COPY works and shows the code (shot-23). PASTE gave no feedback (#5).
- **Text and layout audit:** most screens are clean. The overlaps and tight cards I found are listed above. The biggest are #3 (result banner hidden), #6 (TWIST label) and #13 (NEXT UP on art).

## Bugs that block play
- None. Nothing crashed, nothing got stuck, `/errors` was empty throughout.
- Non-blocking functional bug: modal CLOSE click-through toggles the setting underneath (#1).
- Non-blocking: PASTE CODE and "Enter a friend's code" give no visible result (#5). Mouse or touch players briefly see no result buttons after a match (#2).
