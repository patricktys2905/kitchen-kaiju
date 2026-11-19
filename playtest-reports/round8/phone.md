# Playtest evaluation — The Phone Player

**Fun score: 7.5 / 10** (the landscape phone layout is the best it has been: table left, buttons right, nothing covers the arena. But a few overlapping banners, keyboard-only wording on a touch device, tiny text on dense screens, and weak feedback on a couple of taps keep it under 9.)

> Shot paths are relative to `C:\Users\Pat\kitchen-kaiju\` and live in `art-src/.playtest/r8-7111/shot-N.png`. I opened every screenshot with Read.

## What I did
About 112 harness commands, phone mode (landscape, touch, 1280x720 game area, side bars on a wider screen).
- **Title** (shot-1, shot-16): checked the layout, the NEXT UP box, the practice button, the FULL SCREEN button.
- **Table Workshop** (shot-2, shot-3): placed 3 cups, cycled SURFACE and HAZARD (Giant hand), tried UNDO, SAVE (Table Maker achievement), then **PLAY IT**. A full 4-bot match on My Table 1 (shots 4-9). Result screen, then MENU, which returned to **Free Play** (shot-10).
- **Free Play** (shots 10-12): cycled BOTS (EASY, NORMAL, TOUGH, HARD), TWIST (cycles single twists on a tap), the dice pill. Played a HARD + Kaiju Frenzy round and got flattened (shots 13-15).
- **Match with on-screen controls**: tapped THROW, DASH, SWIPE, STOMP, EMOTE, PAUSE, MENU. Used /act for the actual fighting.
- **Party Modes** (shots 17-21): Team Feast screen, JOIN, + BOT, MODE (Crumb Rush), CUP ON/OFF, started a Party Cup, double-QUIT confirm.
- **Story** (shots 22-29): opening cutscene, map, STORY LOG, chapter 1 dialogue, played chapter 1 (2 stars), CHAPTER CLEAR panel.
- **Gallery** (shots 30-34): colours, locked-colour hint, SHINY, Move Lab (Esc leaves).
- **Pantry** (shots 35-36): bought Toffee colour for 40.
- **Challenges** (shots 37-41): Gauntlet picker, Trials list, played Hard Duel (1 star).
- **Records** (shot-42), **Settings** (shot-43), **Help** (shot-45), **BIG TOUCH BUTTONS ON** (shot-44), **Daily** Hot Dumpling (shots 46-47).
- Matches played about 6 (3 full: workshop table, chapter 1, Hard Duel; plus a Frenzy round, a Cup round, a Daily round). Won 3. `/errors` was "none" at start, middle and end.

## What worked for me
- **The table at the left edge fixes the phone problem.** In every match shot the buttons (PAUSE, MENU, EMOTE, FULL SCREEN, STOMP, SWIPE, DASH, THROW) sit in the dark right-hand strip. No button covers a mat, a rival or match text. Verified on the Workshop table, Sunday Roast, Ice Cream Parlour, Picnic Blanket and Chef's Board.
- **BIG TOUCH BUTTONS is a real accessibility win.** THROW grows a lot and still stops just short of the table edge (shot-44, DASH starts about 15 px right of the table).
- **STOMP greys out until the belly is full and then glows red** (shot-33). A clear "your move is ready" signal. "BELLY FULL! TAP STOMP -> KAIJU" says TAP, not press. Good phone wording.
- **YOU marker** shows over my kaiju at the start of a round (shots 21, 26, 39, 44). It makes picking my own kaiju easy.
- **Double-QUIT in a Cup**: the QUIT button changes to "QUIT (ends the Cup / run)" and "TAP QUIT AGAIN TO REALLY END IT" appears at the bottom (shot-21). It uses TAP wording.
- **Workshop to Free Play loop works**. PLAY IT, a full match, MENU lands back on Free Play with my table set (shot-10 says "TABLE: MY TABLE 1 — Your own table (Giant hand)").
- **Receipts and First Service** show on the results screen (shot-9). The receipt shows tokens, Mastery, achievements and the unlocked colour.
- **Pantry** (shot-35/36) is very readable: big cards, progress bars, a "NOT ENOUGH YET" note, OWNED state after purchase, and the -30% tag.
- **Settings** (shot-43) are all big tappable cards with short descriptions.
- **Chapter Clear** (shot-28) is clean, with NEXT / REPLAY / MAP big buttons.
- **No JavaScript errors** at all in about 112 commands.

## 🧾 Exactly what would make this a 9/10 for me
1. **Remove every keyboard word from the phone UI.**
   - **What:** replace "ENTER / A / tap to start" (title, shot-1/16), "arrows choose · ENTER play · Q / E kaiju · Esc back" (Story map, shot-23), "tap / SPACE" and "SKIP CHAT (S)" (dialogue, shot-25), "ENTER / tap to change" (Settings footer, shot-43), the Help CONTROLS block that lists 3 keyboard lines before the single phone line (shot-45), and the KEYBOARD CONTROLS button on Settings.
   - **How:** when a touch device is detected, show only the touch wording ("tap to start", "tap to skip", "tap to change"), hide the arrow/ENTER hints, and put the Phone line first in Help.
   - **Impact:** +0.5
2. **Fix stacked and overlapping banners in matches.**
   - **What:** the paused menu's "TWIST: BOOMERANGS" title sits on top of the "PAUSED" heading (shot-15). The Hot Dumpling round shows "PIZZARAPTOR HAS THE HOT DUMPLING", "STOMP READY!", "KAIJU!" and "PEARL SPILL!" piled on one spot (shot-47). "FAST FORWARD x3" and "INSTANT REPLAY" are stacked tight under each other (shot-13/14). "CAUGHT! / REVENGE IS SWEET!" spills outside the left table edge over the mat (shot-40).
   - **How:** one banner lane with a queue (max 2 visible, 0.4 s apart), keep banners inside the table rect, move the twist label above the PAUSED title with a 24 px gap (or below the buttons).
   - **Impact:** +0.5
3. **Tiny text on dense screens must hit a minimum size.**
   - **What:** Trials cards shrink their text to roughly 10 px game units on long cards (Thin Ice, Two Crowns, Chef's Table, shot-38). Records achievement rows, the Pantry footnote, the Gallery colour hint and the Chapter Clear small print are all very small on a phone. The Help body is about 11 px.
   - **How:** set a floor of 14 px game units for body text on touch; wrap to 3 lines or split the card instead of shrinking; give Trials cards a 2-line description plus a "Details" tap.
   - **Impact:** +0.5
4. **Give every tap feedback, especially locked buttons.**
   - **What:** tapping ✨ SHINY in the Gallery while locked (Mastery 3 needed, I am Lv 2) did nothing visible (shot-32 is identical to shot-31). The CUP ON/OFF pill on the Party screen has no ON/OFF state (shot-18/19), so I had to start the match to learn it was ON.
   - **How:** show a toast ("Shiny needs Mastery Lv 3 and 300 🪙") and grey the SHINY button; change the pill to "🏆 CUP: ON" / "CUP: OFF" with a lit border and add "PARTY CUP" to the header line.
   - **Impact:** +0.4
5. **Keep the SHARE button and the result text out of each other's way.**
   - **What:** on the result screens (shot-9, shot-41) SHARE sits in the bottom-left corner next to the receipt, half over the table edge and over the screen edge strip. "tap ▶ retry" (shot-41) floats over the gravy boat and there is no ▶ on the button, which says RETRY.
   - **How:** put SHARE in the right-hand strip under FULL SCREEN, and change the text to "tap RETRY to go again".
   - **Impact:** +0.3
6. **The title hides the title.** The FULL SCREEN / EXIT FULL SCREEN button covers the "K" of KITCHEN KAIJU (shot-16; the button box is x15-297, the logo starts at x250). Move the button down to the bottom-left of the strip, or shrink it to an icon.
   - **Impact:** +0.2
7. **MENU and PAUSE do the same thing.** Both open the same pause menu (shot-15). Make MENU do something else (e.g. a quick QUIT-with-confirm) or remove one. The right-hand strip would be calmer with 3 buttons, not 4.
   - **Impact:** +0.2
8. **Make the Twist picker reachable on phone.** The brief says TWIST opens a picker listing every single and ⚡⚡ double twist. On the phone pill row, each tap simply cycled to the next one (NONE, KAIJU FRENZY, TURBO, BOOMERANGS). With dozens of twists, cycling is slow on a phone. Open the picker as a grid of big touch tiles.
   - **Impact:** +0.3
9. **Keep the pill row inside a safe margin.** The Free Play pill row (LEAVE ... 🎲) runs almost edge to edge (shot-11/12: LEAVE at x20, the dice at x1980). On a phone with rounded corners or a notch, the end pills may get clipped. Wrap to two rows or add a 48 px safe-area inset. The 🎲 pill has no label.
   - **Impact:** +0.2
10. **Make the harness-observed on-screen STOMP/DASH taps reliable.** In Move Lab I tapped STOMP (with and without a hold) and the belly stayed full and kaijuSecs stayed 0; only /act stomp started KAIJU. This could be a harness limitation, but a real finger needs the same instant response, so please verify touch STOMP responds on the first tap.
   - **Impact:** +0.2 (if it is a real bug it is a blocker for phone play, see Bugs)

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Pause menu in a twist match | "⚡ TWIST: BOOMERANGS" label overlaps the big "PAUSED" heading | shot-15 | Move the twist label up 30 px or put it under the buttons |
| 2 | major | Hot Dumpling match | "PIZZARAPTOR HAS THE HOT DUMPLING", "STOMP READY!", "KAIJU!", "PEARL SPILL!" stack on top of each other, and a KAIJU form covers the HUD cards | shot-47 | Banner queue, max 2 at once, keep inside the table |
| 3 | major | Title | The FULL SCREEN button (EXIT FULL SCREEN is wider) covers the "K" in KITCHEN KAIJU | shot-16 | Move or shrink the button |
| 4 | major | Gallery | SHINY gives no feedback when locked (identical screens before and after the tap) | shot-31 vs shot-32 | Toast with the requirement; grey the button |
| 5 | major | Title / Story / Dialogue / Settings / Help | Keyboard-only hints on a phone: "ENTER / A / tap to start", "arrows choose · ENTER play · Q / E kaiju · Esc back", "tap / SPACE", "SKIP CHAT (S)", "ENTER / tap to change", keyboard lines in Help | shot-1, 23, 25, 43, 45 | Hide on touch; keep only touch wording |
| 6 | major | Trials | Text auto-shrinks to about 10 px on long cards; card heights and fonts are inconsistent (Hard Duel is larger because it is selected) | shot-38 | Min font floor; wrap; consistent sizes |
| 7 | minor | Party Modes | CUP ON/OFF pill shows no state; the header never says the Cup is on | shot-18, 19 | "CUP: ON/OFF" label and lit border |
| 8 | minor | Results | "tap ▶ retry" has no ▶ on the button (it says ↻ RETRY) and floats over the gravy boat | shot-41 | "tap RETRY" and put it on a plate |
| 9 | minor | Results | SHARE button sits at the very bottom-left over the table edge, tight against the receipt | shot-9, 41 | Move it to the right strip |
| 10 | minor | Results | The big kaiju portrait overlaps a placemat and bots keep moving behind the result text (busy backdrop) | shot-9, 41 | Dim the arena behind results |
| 11 | minor | Match (Frenzy) | "FAST FORWARD x3" and "INSTANT REPLAY" stacked right under each other, nearly touching | shot-13, 14 | One banner at a time |
| 12 | minor | Match | "CAUGHT! / REVENGE IS SWEET!" runs past the left table edge and over a placemat | shot-40 | Clamp inside the table rect |
| 13 | minor | Match | "DRAG HERE TO MOVE" hint sits permanently over the bottom-left corner and overlaps items/mats; it does not fade after the first round | shot-5, 40 | Fade out after round 1; or only show first match |
| 14 | minor | Match | MENU and PAUSE both open the same pause menu (redundant on a cramped strip) | shot-15 | Merge or differentiate |
| 15 | minor | Match | The PAUSE button stays bright and the phone controls stay lit while the game is paused; it never turns into RESUME | shot-8 | Dim controls while paused; PAUSE becomes RESUME |
| 16 | minor | Match | Round-intro tip text ("The giant hand goes for whoever has the fullest belly.") runs over a mug and a gravy boat; a long outlined line of white text over a busy picnic cloth is harder to read | shot-4, 29, 46 | Add a dark plate behind tips |
| 17 | minor | Match (Daily) | The DAILY CHALLENGE banner and tip stretch the whole table width, nearly touching both edges | shot-46 | Wrap into 2 lines with a plate |
| 18 | minor | Match (Hot Dumpling) | No YOU marker visible during play (only in the first moments) and the arena is so busy I could not find my kaiju | shot-47 | Keep a small ring + name tag on your kaiju through the round (or at least for 3 s after any big effect) |
| 19 | minor | Free Play / Party pills | Pill row runs almost edge to edge; the 🎲 pill is unlabeled; ends may be clipped on rounded or notched screens | shot-11, 12, 18 | Safe-area inset or two rows; label the dice "RANDOM" |
| 20 | minor | Free Play | Every kaiju card has the text "Bot: HARD (tap)": small and not obviously a button; "Touch · KAIJU ▶" on my own card is also tiny | shot-12 | Bigger text; a visible button look |
| 21 | minor | Free Play | TWIST cycles one twist per tap; there is no sign of the picker in phone mode | shot-11, 12 | Add the picker as a touch grid |
| 22 | minor | Free Play | "Bot difficulty: ..." and "TABLE: MY TABLE 1" lines are tiny, in thin yellow on a busy backdrop | shot-12 | Plate + larger text |
| 23 | minor | Story map | "strawberry lizard · Seed Spray" runs into the right ▶ kaiju-picker arrow (text touches the button) | shot-23 | Shorten the subtitle or add padding |
| 24 | minor | Story map | The SCENE button touches the "★★★ no rounds lost · ★★ lost one · ★ any win" line, and the PLAY button touches the panel border | shot-23 | Add 8 px of spacing |
| 25 | minor | Story map | The bottom hint "arrows choose · ENTER play · Q / E kaiju · Esc back" is very small and keyboard-only | shot-23 | Remove on touch |
| 26 | minor | Story map | The map is a 4-wide snake: 1-2-3-4, then 5-6-7-8 runs right to left, 9-12 left to right again. On a phone the order is easy to lose | shot-23 | Draw arrows or a path line, or number big |
| 27 | minor | Story map | The locked tabs ("🔒 DESSERT finish the Grand Feast", "🔒 SECOND HELPINGS clear chapter 6 to open") use about 11 px text. They do say how to unlock, which is good | shot-23 | Bigger text |
| 28 | polish | Story log | The log is a huge empty panel with one line ("Nothing yet! Clear chapter 1 and your story starts here.") | shot-24 | Show a teaser or a smaller panel |
| 29 | polish | Cutscene | The caption "THE GRAND FEAST" at the bottom of the opening scene is tiny, and the scene is auto-skipped when I tapped (no way to see all of it) | shot-22 | Bigger caption, tap to advance |
| 30 | minor | Dialogue | Dialogue box covers the map bottom-left (kaiju picker, MODES, REWARDS) which is fine, but "tap / SPACE" and "SKIP CHAT (S)" are tiny and keyboard-flavoured | shot-25 | Big SKIP button |
| 31 | minor | Chapter Clear | Reward and tip lines (Next time, Chapter 2 unlocked, +20 Chef Tokens) are small, and the panel has a lot of empty room | shot-28 | Larger text, use the spare space |
| 32 | polish | Chapter Clear | "NEXT ▶" is a good default button but the dim map behind shows half-cut text on the right | shot-28 | OK, fade more |
| 33 | minor | Gallery | The 21 colour swatches are small round chips (about 36 px game units) with an unlabeled lock; the hint text for a tapped swatch is only 2 small lines at the top right | shot-30, 31 | Bigger chips, hint in a plate above |
| 34 | minor | Gallery | Kaiju tile names (e.g. "CHOCOMUNCH") are about 10 px; the stats block ("Matches: 2 · Wins: 2 / Mastery ★★★★★★ Lv 2...") is a long wall of small text | shot-30 | Larger names; icons for stats |
| 35 | minor | Gallery | MOVE LAB "try its power" is a small sub-label; SHINY button text has no price shown while locked | shot-30 | Show "✨ SHINY · 300 🪙 · Lv 3" |
| 36 | polish | Gallery | "16/20 kaiju" in Free Play but 4 "???" silhouettes with no hint of how to unlock them | shot-30 | Tap a ??? to see the hint |
| 37 | minor | Pantry | The bottom footnote ("Colours you buy appear in the KAIJU Gallery...") is very small and grey on dark | shot-35 | Bigger or remove |
| 38 | polish | Pantry | The Toffee card changed height after purchase (OWNED vs description). A small jump, but OK | shot-36 | Keep the same height |
| 39 | polish | Records | The last rows of YOUR STATS ("Chef Rank: Prep Cook", "Next rank: Line Cook at 14 pts (you: 7)") use a different display font than the rows above, and the labels do not line up vertically with the values | shot-42 | Use one font style |
| 40 | minor | Records | The achievement list is two columns of tight, tiny rows, with a small PAGE ▶ at the top right; the "Next up" line at the bottom is long and wraps in tiny text | shot-42 | Bigger rows, 1 column on phones |
| 41 | polish | Records | "Times gone KAIJU: 0" although I went KAIJU in Move Lab and in a Frenzy twist round (Move Lab may not count) | shot-42 | Clarify that practice does not count |
| 42 | minor | Settings | "Saved on this device · ENTER / tap to change" at the very bottom edge, tiny and cut very close to the screen edge | shot-43 | Move up 20 px; touch wording |
| 43 | minor | Settings | The KEYBOARD CONTROLS button is on a phone with no keyboard | shot-43 | Hide on touch |
| 44 | minor | Help | "HOW TO PLAY" is a wall of tiny text (about 11 px). The phone line is last, after three keyboard/gamepad lines | shot-45 | Phone first; larger text; use the pictures |
| 45 | polish | Help | The PRACTICE tab is a button in the same row as the pages (BASICS, CUTLERY, TABLES, MODES) and looks like another page | shot-45 | Set it apart |
| 46 | minor | Challenges | The Gauntlet picker shows the three locked tiers MAINS/DESSERTS/SECONDS at about 11 px with a small padlock text; the checkpoint line at the bottom is tiny | shot-37 | Larger |
| 47 | minor | Workshop | The "Giant hand" hazard label covers the top-right start-spot circle on the preview | shot-3 | Move the label to the bottom-right or below the table |
| 48 | polish | Workshop | The surface changed from Sunday Roast to Dinner for Four but the table preview looks the same plain wood (only the small label changed) | shot-2 vs shot-3 | Show the surface art on the preview |
| 49 | polish | Workshop | The props palette uses 16 icons with tiny labels (about 10 px: "CHEESEWHEEL", "PINEAPPLE") | shot-2 | Bigger labels |
| 50 | polish | Workshop | The instruction line at the bottom, "Tap the table to place the selected prop · tap a prop to remove it · white circles = start spots", is very small | shot-2 | Larger, or a first-time tutorial |
| 51 | polish | Workshop | Prop count "0/12 props" and the hazard are only in the small header line | shot-2 | Show as pills |
| 52 | minor | Title | The NEXT UP box is a dense 4-line paragraph of 13 px text; the "Practice" CTA appears in a separate green pill (and disappeared after I finished the practice) | shot-1, 16 | Fine, but bigger text |
| 53 | polish | Title | The title hint ("◀ ▶ choose · ENTER / A / tap to start") is faded and sits over a kaiju and the bottom of the buttons | shot-1 | Remove on touch |
| 54 | polish | Match | The "TAP QUIT AGAIN TO REALLY END IT" text lands on the table's bottom edge, and is small | shot-21 | Put it next to the QUIT button |
| 55 | polish | Match | The EMOTE bubble (a laugh icon) is shown on a white square over my mat, which looks like a missing texture | shot-7 | Round bubble with a tail |
| 56 | polish | Match | The kaiju power popup ("BELLY FULL! TAP STOMP -> KAIJU") covers the rival's mat and nameplate area | shot-33 | Place near my own kaiju or at the top of the strip |
| 57 | polish | Match | The HUD cards (top-left) are small: weapon names and KOs are about 13 px; for 4-6 players they fill the top bar | shot-4 | Bigger on touch, or hide weapon names |
| 58 | polish | Match | The round title ("ROUND 1 · MY TABLE 1") at the top right is tiny and sits above the FULL SCREEN/PAUSE strip | shot-4 | Fine; bigger |
| 59 | minor | Results | The "THIS MATCH" receipt text is about 13 px and a lot of text for the bottom-left corner (achievement + First Service + tokens + mastery) | shot-9 | Collapse to 3 lines or tap to expand |
| 60 | polish | Results | The ranking list "1. GOBZILLA (YOU) — 3 rounds · 9 KOs 2. CRABBAGE ..." runs as a 4-line block with long separators | shot-9 | Table with columns |
| 61 | polish | FULL SCREEN | The harness tapped THROW and, after it, the FULL SCREEN button read "EXIT FULL SCREEN" (the toggle state changed without my tapping it; it may be a harness effect) | shot-5 | Check nothing in the touch layer sends a fullscreen toggle |
| 62 | polish | Settings | BIG TOUCH BUTTONS is only found 9 screens deep; a phone player should be asked about it on first launch | shot-43 | First-run prompt |

## 🔠 Text and layout check (do this on EVERY screen you visit)

| Screen | Result | Screenshot |
|---|---|---|
| Title | **Problem**: the FULL SCREEN button covers the "K" of KITCHEN; the keyboard hint is faded and overlapped by art; NEXT UP text is small | shot-1, shot-16 |
| Table Workshop | Mostly OK. Small prop labels and instruction line; the Giant hand label overlaps a start-spot circle | shot-2, shot-3 |
| Match countdown (Workshop table) | OK, buttons are in the right strip; "DRAG HERE TO MOVE" sits in the corner | shot-4 |
| Match in play | OK. Nothing covered by phone controls. A kill-feed line at the bottom is clear | shot-5, shot-6 |
| Match with EMOTE | OK, but the emote bubble is a white square | shot-7 |
| Paused | **Problem** in twist matches: the TWIST label overlaps "PAUSED" (shot-15). In a normal match it is OK (shot-8) | shot-8, shot-15 |
| Frenzy match | Banners stack (FAST FORWARD / INSTANT REPLAY) | shot-13, shot-14 |
| Results (Free Play) | Text is on a plate and readable; SHARE hugs the bottom-left corner; the kaiju portrait overlaps a mat | shot-9 |
| Free Play setup | OK; text small; pills near the screen edge, dice unlabeled | shot-10, 11, 12 |
| Party Modes (Team Feast, Crumb Rush) | OK; no overlap. The CUP pill gives no state | shot-17, 18, 19 |
| Party Cup match | OK; the "PARTY CUP GAME 1/6" banner is clear | shot-20 |
| Cup pause / quit confirm | OK; the hint at the bottom edge is small | shot-21 |
| Story opening cutscene | OK; the caption is tiny | shot-22 |
| Story map | Minor crowding: kaiju subtitle touches the ▶ arrow, SCENE/PLAY touch the panel lines; keyboard hint | shot-23 |
| Story log | OK (empty) | shot-24 |
| Story dialogue | OK; keyboard hints "tap / SPACE", "SKIP CHAT (S)" | shot-25 |
| Story match | OK; tip text over the mug is readable | shot-26, 27, 29 |
| Chapter Clear | OK; small print | shot-28 |
| Gallery | OK; small names and swatches | shot-30, 31, 32 |
| Move Lab | OK; the text at the bottom is clear and the hint says "MENU to leave" | shot-33, 34 |
| Pantry | OK | shot-35, 36 |
| Challenges picker | OK | shot-37 |
| Trials | **Problem**: tiny shrunk text on Thin Ice / Two Crowns / Chef's Table and uneven card sizes | shot-38 |
| Trial match | OK | shot-39, 40 |
| Trial result | **Problem**: "tap ▶ retry" over the gravy boat; SHARE corner | shot-41 |
| Records | Dense and tiny; the last stat rows use a different font | shot-42 |
| Settings | OK, but the footer is at the edge and has keyboard wording | shot-43 |
| Big Touch Buttons match | OK; THROW/DASH stop just short of the table | shot-44 |
| Help | Tiny text, keyboard first | shot-45 |
| Daily (Hot Dumpling) | **Problem**: wide banners; stacked popups when KAIJU/Pearl Spill fire | shot-46, shot-47 |

**Did the phone controls ever cover game text, buttons or mats?** No. In normal and BIG TOUCH layouts the table ends at about x=1528 of the screenshot and the controls begin at about x=1543 (big) or x=1622 (normal). The only controls over any content are the top-left FULL SCREEN button on menus (title logo K), and the results SHARE button in the bottom-left corner.

## The single biggest structural problem
**The phone is still a port of a keyboard-and-controller UI with a good in-match skin.** The match itself is great on a phone now, but every menu around it still speaks to a keyboard (ENTER, arrows, Q/E, Esc, SPACE, "S" to skip), keeps small desktop-sized text for lists (Trials, Records, Help, Gallery), and gives no feedback when a tap is refused. A phone-only player does not get a break between "here is the right thing to tap" and "here is a wall of 10 px text". The overlay layer (banners, popups, pause labels) also has no single owner, so four banners can land on the same spot.

The fix is a touch pass over all non-match screens: a minimum text size, touch wording, and one banner queue. None of it is a new system; it is polish at scale. That is why my score is 7.5 and not lower, but also why it is not 9.

## Big change proposals (2–3, most important first)

### Proposal 1: Touch UI pass ("phone mode text and wording contract")
- **Problem it solves:** keyboard hints on a phone (issues 5, 25, 30, 42, 43, 44, 53), tiny text on dense screens (6, 31, 33, 34, 37, 40, 44, 46, 49, 50, 57, 59), pills too close to the edge (19).
- **How it would work (detailed design):**
  1. Add one `isTouch` flag. All hint strings come from a table with `touch` and `keys` variants. Touch variants never mention ENTER, arrows, Q/E, Esc, SPACE, S or keyboard layouts.
  2. A global minimum of 14 game units for body text and 12 for captions when `isTouch`. Dense lists (Trials, Records, Help) switch to a one-column scroll layout with 56 px minimum row height, instead of shrinking to fit.
  3. Help opens on a **PHONE** tab with 6 big icon cards (Move, THROW, SWIPE, DASH, STOMP, Giant Hand) instead of the keyboard block.
  4. Settings hides KEYBOARD CONTROLS on touch. BIG TOUCH BUTTONS is offered on first launch (a one-tap prompt with a preview of both sizes).
  5. The pill row on setup screens uses a 48 px safe margin and wraps to two rows when wider than the safe area.
- **Example moment:** a new phone player opens Help, sees six picture cards, taps THROW, and sees a 2-second looping demo. They never see the word "SPACE".
- **Rewards / progression hooks:** none needed; it removes friction.
- **Risks and edge cases:** a touch laptop (is `isTouch` true?) needs a runtime switch when a key is pressed; tablets can use the same layout. Long lists need a scroll indicator.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: One banner lane and a "safe zone" for in-match overlays
- **Problem it solves:** issues 1, 2, 11, 12, 15, 16, 17, 18, 54, 56. Four different systems (round intro, twist label, event banners, kaiju popups) draw on the table at once.
- **How it would work (detailed design):**
  1. A single banner queue with 3 priorities: P1 (STOMP READY, KAIJU!, WINNER), P2 (hot dumpling, pearl spill, caught/revenge), P3 (tips, daily banner, twist label). At most 2 visible at once, each 1.2 s, 0.2 s gap. P1 may bump P3.
  2. Banners are clamped to the table rectangle and drawn on a 55% dark plate, so they read on red checkers and on mugs.
  3. The pause menu owns its own title block: PAUSED, then a twist chip below it, then buttons.
  4. During play, a 24 px ring and small name tag stays on my kaiju whenever more than 3 effects are on screen (so the YOU marker never disappears in chaos, as in the Hot Dumpling round).
  5. The PAUSE button turns into RESUME while paused and the other phone buttons dim.
- **Example moment:** Pizzaraptor gets the dumpling and Sloba goes KAIJU in the same second. The player sees "PIZZARAPTOR HAS THE HOT DUMPLING" first, then 0.4 s later "SLOBA IS KAIJU!" and never a mashed overlap.
- **Rewards / progression hooks:** none.
- **Risks and edge cases:** delaying a banner can feel late for fast events (so P1 bumps); replays should not re-queue banners.
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: Tap feedback for everything refused or stateful
- **Problem it solves:** issues 4, 7, 15, 21 and the "did my tap work?" feeling on phone (silent SHINY, CUP with no state, twist cycling with no preview).
- **How it would work (detailed design):**
  1. A tiny toast system (bottom centre, 1.8 s, 18 px text) used for refusals: "Shiny needs Mastery Lv 3 + 300 🪙 (you are Lv 2)".
  2. Every toggle pill shows its state in its label and border (CUP: ON with a gold glow; TWIST: BOOMERANGS with the icon).
  3. The twist picker opens as a full-screen grid of 72 px tiles with the single twists on one row and ⚡⚡ doubles on another, with a one-line description under the selected tile; a tap on a tile selects and closes.
  4. A light haptic pulse (if RUMBLE is on) for accepted taps and a double pulse for refused ones.
- **Example moment:** I tap SHINY too early. A toast says what I need and a lock icon appears on the button, so I know I did not miss the tap.
- **Rewards / progression hooks:** gives the Mastery grind a visible target.
- **Risks and edge cases:** toasts must not cover the phone buttons (keep inside the table / menu area); screen readers.
- **Size:** S
- **Score impact for me:** +0.4

## How this round's new features felt
- **Phone layout (table at the left edge): excellent.** In 12+ match screenshots across 6 tables, nothing was covered. This is the headline win of the round. The controls are well separated, THROW is the biggest and most central, STOMP greys out until it is usable. The only quibble: the stack of four right-strip buttons (PAUSE, MENU, EMOTE, FULL SCREEN) has two that do the same thing (issue 14).
- **BIG TOUCH BUTTONS:** very good. A noticeably larger THROW, SWIPE and DASH without touching the table (shot-44). I would turn it on by default for any screen under about 7 inches.
- **Tap wording on phones:** mixed. In matches it is right ("TAP STOMP -> KAIJU", "TAP QUIT AGAIN"). In menus and the story it still says ENTER, SPACE, S, Esc and arrows (issue 5).
- **YOU marker:** good at the start of rounds and in 2-4 player matches. It was missing in the busy Hot Dumpling round (issue 18).
- **Plates behind result text:** the results panel (shot-9, shot-41) is readable on every table I saw. The grey plate is solid. The "tap ▶ retry" line is the one exception.
- **Receipts / achievements / First Service:** very clear on the result screen. I like that the receipt told me about First Bite, +30 tokens and the Lime colour; the First Service list on the title also moved from 0/6 to 3/6 as I played (a good reason to keep going).
- **Workshop UNDO / surface and hazard on preview / PLAY IT:** UNDO worked (3 props to 2). The surface and hazard names show in the header and in a small tag on the table. The hazard label overlaps a start-spot circle (issue 47) and the surface art did not change on the preview (issue 48). PLAY IT starts the match on the saved table and returns to Free Play afterwards, which is exactly the loop I wanted.
- **TWIST picker:** not found on the phone. A tap on the pill cycled to the next twist. I could not confirm a picker or the ⚡⚡ doubles on phone (issue 21).
- **TOUGH bots:** present in the BOTS cycle (EASY, NORMAL, TOUGH, HARD). I did not play against TOUGH specifically. On HARD with Kaiju Frenzy I was out in the first seconds.
- **Giant Hand:** it removed me in my Workshop match (Giant hand hazard) while I was holding the fullest belly. I could not test the dash-dodge since the tap-DASH timing is hard to line up through the harness. The "HAND" KO is reported as "(hand)" in the event log.
- **Party Cup ON/OFF:** works (3 taps = ON, and the match said "PARTY CUP · GAME 1/6"), but the button shows no state (issue 7). The double QUIT is clear and uses tap wording.
- **Story: STORY LOG and locked tab wording:** the locked tabs now say how to open ("clear chapter 6 to open", "finish the Grand Feast"), which is good. The STORY LOG is an empty panel at chapter 0 (issue 28).
- **Chapter 1 / 4 boss / boss phase 2:** I only played chapter 1 (2 stars, with the Head Chef intro and Crabbage's good outro line). I did not reach chapter 4 or a boss.
- **Kid Mode:** it is in Settings with a clear description ("Story: easier rivals, 1-line chats, bigger result text"). I did not turn it on.
- **Shiny forms:** the SHINY button is present in the Gallery but silent when locked (issue 4).
- **Move Lab:** good. It starts a practice round with a helpful line at the bottom, and Esc leaves back to the Gallery. The instruction "MENU to leave" mentions the phone MENU button, which is correct on a phone.
- **Pantry:** clean. The weekly orders pay 40 each; I bought Toffee for 40; the tag "-30% today" on Lifeline is nice.
- **Trials:** the 8 trials read well when selected, but long cards shrink text (issue 6). Hard Duel: I got 1 star (3 KOs, not 4).

## Bugs that block play
- **None confirmed.** No JavaScript errors (`/errors` returned "none" every time).
- **Needs a real-device check:** in Move Lab the on-screen STOMP button (via the harness tap, with and without a hold) did not start KAIJU even with a full belly (state: belly 100, kaijuSecs 0). `/act?cmd=stomp` worked right away. I believe this is a harness limitation with frozen time, but if a real finger behaves the same way, phone STOMP would be a blocker. The same note applies to my DASH/SWIPE taps, where I could not see any effect in the frozen frame.
