# Playtest evaluation — The Phone Player

**Fun score: 7.0 / 10** (looks great and almost everything is tappable, but the moment I used Workshop/Daily/Big Buttons the on-screen controls covered game text and a spawn mat, and one path (Workshop → Free Play) left me with NO touch controls at all)

> Screenshot folder for every path below: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r7-7111\shot-N.png` (abbreviated `shot-N`).

## What I did
- Phone mode (landscape, port 7111), about 115 harness commands, 43 screenshots, every one opened with Read.
- Title (shot-1) → Story (opening cutscene shot-2/3, map shot-4, chapter intro, dialogue shot-8) → played Story ch1 (won 2-1, 2 stars, chapter-clear card shot-12) → Free Play setup (seat tap, + BOT x2, TWIST cycling, BOTS/ROUNDS pills, shots 14/16) → started a Snack Attack match (shot-17), PAUSE menu (shot-18) → Party Modes (Team Feast, JOIN, mode pill cycled through all 5 modes, shots 19/20) → Party Cup game 1/6 with 6 players (won, shots 21/23) → Gallery (shot-25, locked kaiju shot-30) → Move Lab (shots 26/27/29) → Pantry (shot-31, bought Toffee) → Records both pages + pinned an achievement (shots 33/34) → Challenges popup (shot-35) → Trials list (shot-36) → played Trial 1 "Hard Duel" and failed it (shot-38) → Settings (shot-39; turned BIG TOUCH BUTTONS and KID MODE on) → Workshop (shot-40) → "PLAY IT" (shot-41) → Free Play from there (shot-42) → Daily (shot-43).
- Matches: about 6 played (Story ch1 won, Party Cup game 1 won, Move Lab practice, Trial lost, 2 abandoned). `/errors` returned "none" at start, middle and end.

## What worked for me
- The phone control layout is clean: the joystick zone is labelled "DRAG HERE TO MOVE", PAUSE / MENU / EMOTE / FULL SCREEN sit in a right-hand column OUTSIDE the table, and FULL SCREEN lives in the letterbox so it never covers a game button on menu screens.
- Setup screens work without a keyboard. Seats are tappable, and the pills (`+ BOT`, `− BOT`, `BOTS`, `TABLE`, `ROUNDS`, `MODE`, `TWIST`, `🏆 CUP`, `▶ PLAY`) are big, readable and wrap to two rows when there are many, with nothing overlapping (shots 16, 19, 20).
- The result cards are great on a small screen: "CHAPTER CLEAR!" (shot-12) has big stars, a readable quote and three large NEXT / REPLAY / MAP buttons.
- Records, Pantry, Trials and Settings are well laid out. Cards fit, text stays inside its boxes, and the Pantry shows a 30% off tag and "(not enough yet)" clearly.
- STOMP greys out until the belly is full and glows red when ready. That is a good phone affordance.
- Chef Tokens, mastery XP and the pinned 📌 achievement show up in "THIS MATCH" receipts, and the pin shows on the title's NEXT UP line. Nice loop.
- Daily Challenge starts in one tap and has full touch controls.

## 🧾 Exactly what would make this a 9/10 for me
1. **Workshop "PLAY IT" (and the Free Play menu afterwards) must keep a touch seat on phones.** Where: Workshop → PLAY IT → quit → Free Play. How: after Workshop the first seat reads "Keys left · A / D", the pill row shows JOIN instead of LEAVE, tapping JOIN does nothing, and the match has no THROW/SWIPE/DASH/STOMP/EMOTE (shots 41/42). On a phone the player must always get a "Touch" seat in phone mode, and JOIN must work. Impact **+0.8**.
2. **The on-screen buttons must never cover the table's start mats or HUD text.** Where: every match. How: in default size, DASH sits on the bottom-right spawn mat (shots 17, 21: Sloba/Hotchog's seat is half-hidden). With BIG TOUCH BUTTONS ON, STOMP crosses the Daily banner line "…streak · Picnic Blanket" and DASH covers the Pizzaraptor mat (shot-43). Fix: shrink the table to the safe area (reserve about 18% of width on the right and the bottom-left for the stick), or move spawn mats away from the control corner, or fade controls to 40% for the 3-2-1 countdown. Impact **+0.5**.
3. **Remove every keyboard word on phone screens.** Where: "BELLY FULL! PRESS E / Y → KAIJU" (shot-27) must say "TAP STOMP"; "Next: CRUMB RUSH · 1 / START to continue" (shot-23) and "1 / START retry · Esc trials" (shot-38) must show "Tap CONTINUE / RETRY"; the Move Lab banner "Esc to leave" (shot-26) must say "MENU → QUIT"; Challenges says "Esc closes" with no close button (shot-35); the title says "◀ ▶ choose · ENTER / A / tap to start"; Story says "arrows choose · ENTER play · Q / E kaiju · Esc back"; Records says "Click any locked one to pin"; Settings says "ENTER / tap to change". Impact **+0.5**.
4. **Make the STOMP tap reliably go KAIJU, and explain it.** Where: Move Lab. How: with belly at 100, `/tap?label=STOMP` (tap and 1 s hold, twice) did not trigger KAIJU, but `/act stomp` did (shot-27/28/29). If this is a real touch bug it is a blocker for phone players, and it needs a human re-test. Also give the HUD hint ("STOMP READY!") a pulse so a phone player knows what to tap. Impact **+0.4**.
5. **Add a close "✕" button to the Challenges popup and a visible back path in every full-screen overlay.** Impact **+0.3**.
6. **Enlarge the Gallery colour swatches and the MOVE LAB button, and make locked swatches tell you how to unlock.** Where: Gallery (shot-25). How: the 21 swatches are about 38 game px wide, the MOVE LAB label is about 11 px, and tapping a locked swatch shows nothing. Make swatches at least 56 px, put a tooltip line "🔒 Win 10 matches" under the row when tapped, and double the MOVE LAB button. Impact **+0.3**.
7. **Give text over busy art a plate.** Where: result screens ("STANDINGS" over the checkered cloth and giant kaiju, shot-23; "TRIAL FAILED" star lines over the gravy boat, shot-38; the Daily banner over the tablecloth, shot-43). How: add a dark 70% rounded backing behind the 3-6 lines. Impact **+0.2**.
8. **Fix small cosmetic overlaps on Story and Pantry** (see issues table 5-9, 13). Impact **+0.2**.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | blocker | Workshop → PLAY IT → Free Play | Seat 1 becomes "Keys left · A / D", pill shows JOIN (no LEAVE), tapping JOIN doesn't change it; the match has only PAUSE/MENU/FULL SCREEN, no THROW/SWIPE/DASH/STOMP/EMOTE. A phone player cannot play. | shot-41, shot-42 | In phone mode always create a Touch seat for the local player, and make JOIN assign one |
| 2 | major | Match, any setup | DASH button (bottom right) sits on top of the corner spawn mat (a kaiju stands under it) in 4- and 6-player games | shot-17, shot-21 | Move the control corner, or move mats away from it |
| 3 | major | Match, BIG TOUCH BUTTONS ON | STOMP crosses the Daily banner text ("Picnic Blanket" runs through the button) and DASH covers the Pizzaraptor spawn mat | shot-43 | Re-flow banner to max-width 70% and keep mats clear |
| 4 | major | Match HUD | The twist label "⚡ SNACK ATTACK" at the bottom right is hidden under the DASH ring | shot-17, shot-18 | Move twist label to top bar |
| 5 | major | Move Lab (and any match with a full belly) | Prompt "BELLY FULL! PRESS E / Y → KAIJU" shows keyboard/gamepad keys on a phone | shot-27 | Show "TAP STOMP" in phone mode |
| 6 | major | Move Lab | `/tap STOMP` with belly 100 didn't make Gobzilla go KAIJU (twice); `/act stomp` did. Possibly a touch-handling bug | shot-27/28 | Re-test on a real phone; make STOMP trigger on touchstart |
| 7 | major | Move Lab | Banner says "Esc to leave" but a phone has no Esc; the MENU button only opens PAUSE (needs a second tap on QUIT) | shot-26, shot-29 | Say "MENU → QUIT to leave"; add a visible "✕ LEAVE LAB" button |
| 8 | major | Challenges popup | Footer says "Esc closes" but there is no close button; had to know to tap elsewhere | shot-35 | Add ✕ button and tap-outside-to-close |
| 9 | minor | Results (Party Cup) | "Next: CRUMB RUSH · 1 / START to continue" keyboard text under the standings | shot-23 | "Tap CONTINUE" |
| 10 | minor | Results (Trial) | "1 / START retry · Esc trials" keyboard text | shot-38 | "Tap RETRY / MENU" |
| 11 | minor | Results (Party Cup) | STANDINGS list (6 lines) sits over the checkered cloth, giant kaiju art and crumbs, so rows 5-6 clash with a green pea and the kaiju claw | shot-23 | Dark backing plate |
| 12 | minor | Results (Trial) | The "★ win · ★★ without losing a round · ★★★ also 4+ knockouts (you: 1)" line is over the cream runner and the gravy boat; hard to read | shot-38 | Dark backing plate |
| 13 | minor | Story map | The "SCENE" button hangs over the panel's right edge and its bottom border, and "Not cleared yet" sits right next to it; the right panel's bottom border touches the PLAY button | shot-4 | Move SCENE into the panel with 12 px padding |
| 14 | minor | Story map | Kaiju picker card: "🌟 Seed Spray" text touches the ▶ arrow | shot-4 | Shorten text or widen the card |
| 15 | minor | Story map | Chapter 1 thumbnail is a blank white bar (placeholder art) | shot-4 | Add the ch1 picture |
| 16 | minor | Story map | Footer "arrows choose · ENTER play · Q / E kaiju · Esc back" is keyboard text on a phone | shot-4 | Hide in phone mode |
| 17 | minor | Story dialogue | Title says "TIP" and the line says "TIP: Hold THROW…" (doubled); "⏩ SKIP CHAT (S)" is small and has a key hint; the golden spoon art covers part of the map behind | shot-8 | Remove the word in the text; "SKIP CHAT" bigger and without "(S)" |
| 18 | minor | Story opening | Opening cutscene letters are tiny and slow with SKIP ▶▶ as the only control; multi-beat so needs many skips (I tapped it 4 times in total) | shot-2, shot-3 | Single "SKIP ALL" for the scene |
| 19 | minor | Title | "◀ ▶ choose · ENTER / A / tap to start" is faint (about 35% opacity) and keyboard-flavoured | shot-1 | Hide on touch |
| 20 | minor | Title | The NEXT UP list ("Win a match → 🎨 Lime colour") is 12 px with a thin stroke over the fork and background; hard to read | shot-1 | Plate or bigger text |
| 21 | minor | Title | PARTY MODES subtitle wraps to two lines ("Teams · Rush · / Dumpling") while others have one line | shot-1 | Shorten to "Teams · Rush · Cup" |
| 22 | minor | Title | The top-right pill labels (SETTINGS, HELP, KAIJU, RECORDS, PANTRY, WORKSHOP) are about 10 px tall; small to tap and read | shot-1 | Icons-first with larger pills |
| 23 | minor | Free Play / Party setup | Pill row has an unlabelled 🎲 pill (not clear what it does) | shot-16, shot-20 | Label "RANDOM" |
| 24 | minor | Free Play / Party setup | "Bot: EASY (tap)" and "tap to join" captions are about 12 px | shot-14, shot-20 | Larger |
| 25 | minor | Free Play setup | State leaks: the Workshop table stays selected ("TABLE: MY TABLE 1") and the seat type changes without telling me | shot-42 | Reset TABLE to ALL |
| 26 | minor | Party setup | After a Party Cup the setup says "First to 2 rounds" while the pill says ROUNDS: 3 earlier; cup silently changes the setting | shot-24 | Restore or show a cup note |
| 27 | minor | Party Cup match | "ROUND 1 · BANQUET LAZY SUSAN" moves to the bottom-left in 6-player games, away from the other matches | shot-21 | Keep in same place |
| 28 | minor | Pantry | Lifeline card text "245 🏷 TODAY 30% OFF (was 350) (not enough yet)" wraps to 2 lines hugging the card edge, tag icon tiny | shot-31 | Put the discount on its own line |
| 29 | minor | Pantry | "Earn 🪙 Chef Tokens…" paragraph and footer "Colours you buy appear…" are about 11 px | shot-31 | Larger or shorten |
| 30 | minor | Records | "YOUR STATS" header sits right on the first row ("Matches played") with no gap | shot-33 | Add spacing |
| 31 | minor | Records | "Click any locked one to 📌 pin it" says "click" and footer text is about 11 px | shot-33 | "Tap" |
| 32 | minor | Records p2 | "Clean Sweep" description shrinks to about 9 px to fit ("Win a first-to-3+ match without losing a round · Cherry") | shot-34 | Shorten the text |
| 33 | minor | Gallery | Colour swatches (21) are about 38 game px and the unlocked ones are tiny; tapping a locked one gives no hint | shot-25 | Bigger, with an unlock tooltip |
| 34 | minor | Gallery | MOVE LAB button is small with about 11 px "try its power" caption; this is the button I most wanted to tap | shot-25 | Double size |
| 35 | minor | Trials | Card text is 12-13 px and long ("You: GOBZILLA vs PIZZARAPTOR (hard) · ★★★: 4+ KOs"); two-to-three lines wrap tightly in boxes | shot-36 | Split into "You / Rivals / 3★ goal" lines |
| 36 | polish | Settings | Rows are stacked with almost no gap, and "Saved on this device · ENTER / tap to change" is at the very bottom edge | shot-39 | Add gaps, remove "ENTER" |
| 37 | polish | Workshop | The "PROPS (tap one, then tap the table)" label touches the top of the CUP tile | shot-40 | Add 8 px padding |
| 38 | polish | Workshop | Prop labels (CUP, BOWL, CANDLE…) about 10 px | shot-40 | Larger labels |
| 39 | polish | Trials result | "THIS MATCH" box overlaps the giant kaiju image and part of the ring | shot-38 | Reposition |
| 40 | polish | Results | "SHARE" button sits alone in the bottom-left letterbox, easy to miss | shot-23 | Put next to CONTINUE |

## 🔠 Text and layout check
- **Title** (shot-1): OK except #19-22 (faint hint, small NEXT UP text, small top pills, wrapping Party subtitle). No overlaps with FULL SCREEN, which sits in the letterbox.
- **Story opening cutscene** (shot-2, shot-3): text OK, SKIP is reachable; tiny type, #18.
- **Story map** (shot-4): problems #13-16. Buttons do not stack, but SCENE crowds the panel border.
- **Story dialogue** (shot-8): doubled "TIP", small SKIP CHAT, #17.
- **Match HUD, 2 players** (shot-9, shot-11): the tip line runs into a coffee cup (cosmetic) and DASH / STOMP lie on the table's lower-right corner. Problem #2.
- **Match, 4 and 6 players** (shot-17, shot-21): DASH over a spawn mat, twist label covered (#2, #4).
- **Pause** (shot-18, shot-29): OK, big buttons.
- **Chapter clear** (shot-12): OK.
- **Free Play setup** (shot-14, shot-16): OK; pills wrap cleanly, #23-25 small.
- **Party Modes setup** (shot-19, shot-20): OK, #23, #24.
- **Party Cup result** (shot-23): #9, #11, #40. Text not cut off.
- **Gallery** (shot-25, shot-30): #33, #34; locked-kaiju panel is clear and gives a real unlock hint.
- **Move Lab** (shot-26, shot-27, shot-29): #5, #7.
- **Pantry** (shot-31): #28, #29.
- **Records p1 / p2** (shot-33, shot-34): #30-32.
- **Challenges popup** (shot-35): no close button (#8); text OK.
- **Trials** (shot-36): #35.
- **Trial result** (shot-38): #10, #12, #39.
- **Settings** (shot-39): #36; no cut-off text.
- **Workshop** (shot-40): #37, #38; COPY CODE / PASTE CODE fit.
- **Workshop match / Free Play match** (shot-41, shot-42): no touch controls at all (#1).
- **Daily match** (shot-43): #3.
- Not reached (budget): Help, Online lobby, Spicy chapters, Dessert Course, Gauntlet run, Share sheet.

## The single biggest structural problem
The controls layer and the game layer don't know about each other. The touch controls are drawn over the table while the game places spawn mats, HUD banners and twist labels in the same corners, so on a phone the player's own buttons hide the game: DASH hides a spawn mat, STOMP hides the Daily banner, DASH hides the twist label. The Workshop path is the worst case: the game forgets it is in phone mode and gives the player a keyboard seat, which leaves a phone player stranded in a match they cannot control.

A phone-first fix is a reserved "thumb zone" (about 18% of the width on the right and the bottom-left corner) that the table, spawn mats and banners never use in phone mode, plus one place (`ensureTouchSeat()`) that every mode (Free Play, Party, Workshop, Daily, Trials, Move Lab) calls before it starts. That would also make Big Touch Buttons safe.

## Big change proposals (2–3, most important first)
### Proposal 1: Thumb-zone safe layout and one touch-seat rule
- **Problem it solves:** controls covering mats, banners and twist labels (#2-4), and the keyboard seat after the Workshop (#1).
- **How it would work (detailed design):** In phone mode the playfield gets a fixed safe rectangle that excludes (a) the right 18% column (PAUSE/MENU/EMOTE/FULL SCREEN and the four action buttons) and (b) a 22%x35% bottom-left joystick zone. The table is scaled to fit inside the rectangle (about 6% smaller than now) and spawn mats are placed only inside it. HUD banners (round tips, DAILY CHALLENGE, twist labels) are placed in the top strip below the player cards, max width 70%. During the 3-2-1 countdown the action buttons fade to 35% so the board is readable; they come back to full opacity on "DIG IN!". A single `ensureTouchSeat()` runs in every match start in phone mode and assigns "Touch" to seat 1 when there is no seat with a device; JOIN uses the same function.
- **Example moment:** I tap Workshop → PLAY IT, and a seat labelled "Touch" is already there with all four buttons; the board is smaller but the corner mats are clear.
- **Rewards / progression hooks:** none; it's a polish and trust fix, and removes all #2-4 issues.
- **Risks and edge cases:** smaller table means smaller kaiju; test with 6 players on a 5.5-inch phone. Tablets and desktop must keep the full-size table.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: "Phone text pass": every instruction reads from the current input
- **Problem it solves:** keyboard words everywhere (#5, #7-10, #16, #19, #31, #36) and small text (#20, #22, #24, #29, #35).
- **How it would work (detailed design):** Introduce one helper, `hint('confirm')`, that returns "TAP", "ENTER" or "A" depending on the last input device. All strings in Story, Results, Challenges, Settings, Move Lab and the belly-full prompt use it. Set a phone minimum of 14 game px for body text and 12 px for captions; anything that cannot fit becomes two lines instead of shrinking. Challenges and all overlays get a visible ✕ close button.
- **Example moment:** at belly 100 the prompt says "BELLY FULL! TAP STOMP" and the STOMP button pulses. After Trial failed, the card says "Tap RETRY".
- **Rewards / progression hooks:** none; it supports First Service (the checklist assumes a new player understands the controls).
- **Risks and edge cases:** hybrid devices (phone with a gamepad) need the "last used device" rule; localisation lengths.
- **Size:** S-M
- **Score impact for me:** +0.6

### Proposal 3: Gallery and results as phone cards
- **Problem it solves:** tiny colour swatches, hidden Move Lab (#33, #34), results text on busy art (#11, #12, #39, #40).
- **How it would work (detailed design):** Gallery: swatches become a horizontally scrolling strip of 56 px chips with the 3 most useful first (equipped, next to unlock, cheapest in shop); tapping any chip fills a line "🔒 Win 10 matches" or "Equip". MOVE LAB becomes a full-width 64 px button on the detail panel. Result screens put STANDINGS / goal text in a dark 70% rounded card, CONTINUE / MENU / SHARE in one row of three 160x64 buttons.
- **Example moment:** after a Party Cup game I read the 6 standings on a plain plate and share in one tap.
- **Rewards / progression hooks:** surfaces unlock goals (collection 3/21 colours) right where a collector looks, which could push more Pantry and Records visits.
- **Risks and edge cases:** more screen estate used on result cards; check Kid Mode's bigger result text still fits.
- **Size:** M
- **Score impact for me:** +0.4

## How this round's new features felt
- **Progression (mastery, Chef Rank, achievements, pin, daily deal, receipts):** good. The receipt ("+54 Chef Tokens, Mastery Lv 2 Line Cook · 42/100 XP") reads fine on phone. Pinning by tapping a locked achievement worked, and the pin showed up on the title's NEXT UP line and in the Trial receipt ("📌 Regular Diner: 2/10"). Chef Rank "Prep Cook at 6 pts (you have 3)" is clear. The 30% off Lifeline tag is the one text that gets cramped (#28). I could not see the dash sparkles or crown aura during my play (too early).
- **🍽 First Service checklist:** the title's NEXT UP line shows "FIRST SERVICE 4/6" and updates as I play. It's small and faint on phone (#20). I did not run the 1-minute Practice, so I can't judge its end card.
- **CHALLENGES popup + Trials:** the popup is clear, but it has no close button on phone (#8). Trials list is readable but dense (#35). The trial fail card has keyboard text (#10). Trial 1 (Hard Duel vs a hard Pizzaraptor) is hard even for an auto-bot, which is the right feel.
- **🥋 MOVE LAB:** the idea is perfect for a phone player, but the entry button is small (#34), the prompt uses keys (#5, #7), and my STOMP tap didn't go KAIJU through the harness (#6).
- **⚡⚡ Double twists:** TWIST cycles easily from one pill; I cycled KAIJU FRENZY, TURBO, BOOMERANGS, GIANT CUTLERY, ICE RINK, SNACK ATTACK (single twists only before I ran out of budget). The twist's in-match label is hidden by DASH (#4).
- **🏆 Party Cup:** the 🏆 CUP pill is easy to find, game 1/6 named its winner ("GAME 1/6: GOBZILLA WINS!") and standings with points were clear. Layout problems #9, #11. I did not finish all six games or reach the ×2 final / Cup Shelf.
- **Story PHASE 2 / KID MODE:** only toggled KID MODE on (Settings reads well); did not reach a boss, so PHASE 2 is untested.
- **Workshop COPY / PASTE CODE:** both buttons fit and are reachable; I didn't test pasting (no clipboard in the harness). The Workshop's "PLAY IT" path breaks phone play (#1).
- **Text and layout audit claim ("nothing overlaps"):** mostly true on menus; false for in-match controls over mats/banners (#2-4) and a few result screens (#11, #12).

## Bugs that block play
- **Workshop → PLAY IT → quit → Free Play: the player has a keyboard seat ("Keys left · A / D"), JOIN does nothing, and the match shows no THROW/SWIPE/DASH/STOMP/EMOTE.** On a phone this is unplayable (shot-41, shot-42). Workaround: none found; Party Modes and Daily did give me touch controls.
- **STOMP tap through `/tap` did not trigger KAIJU in the Move Lab with belly at 100** (possible; needs a real-phone retest).
