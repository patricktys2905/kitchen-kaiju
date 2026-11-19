# Playtest evaluation — The Phone Player

**Fun score: 7.5 / 10** (a whole phone session works with no keyboard and nearly every screen is readable and tappable. Three things hold it back. The on-screen STOMP tap never put me into KAIJU. The twist, mode and Cup pills hide state. The Free Play setup has no bot-level explanation.)

> Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r9-7111\` as `shot-N.png`. Below I write just `shot-N`.

## What I did
- About 118 harness commands, all in phone mode (landscape, touch, 2000x924 screenshots). `/errors` reported "none" at the start, the middle and the end.
- **Title** (shot-1): tapped FULL SCREEN and EXIT FULL SCREEN, which work.
- **Story** (shot-3): opened ch1. Played the opening cutscene (shot-2) and the pre-match chat (shot-5), then skipped them. Played ch1 vs Crabbage and won 2-1 for 2 stars (shots 6-14). Got the "Chapter Clear" panel with NEXT, REPLAY and MAP.
- **Free Play setup** (shots 16-22): added a bot and cycled BOTS (easy, normal, tough, brutal), ROUNDS and TWIST. Opened the twist picker, picked ICE RINK, then a double twist (MINI KAIJU + KAIJU FRENZY).
- **Free Play match** with the double twist (shots 23-27): lost 0-3. Results screen shown with REMATCH and MENU.
- **Party Modes setup** (shots 29, 30, 41): Team Feast, Crumb Rush, CUP ON/OFF. Played the first game of a Party Cup (shot-39 shows "GAME 1/6: GOBZILLA WINS!" with standings), 4 players, won.
- **Pantry** (shots 43-45): did the two-tap buy on Toffee colour. **Gallery** (shots 46-48): opened a locked "???" kaiju. **Move Lab** (shots 49-50).
- **Challenges** popup (shot-52), **Trials** (shot-53), **Records** (shot-54), **Settings** (shot-55), **Daily** (shot-56).
- Matches played: 1 Story, 1 Free Play, 1 Party Cup game, plus a Move Lab practice round and a Daily start. Won 2, lost 1.
- I never tried the Online lobby, Help, Workshop or Practice.

## What worked for me
- The in-match phone layout is good (shots 6, 7, 10, 23, 33, 34). The pad sits to the right of the table.
  - THROW, SWIPE, DASH and STOMP form a thumb cluster.
  - PAUSE, MENU, EMOTE and FULL SCREEN form a column top-right.
  - "DRAG HERE TO MOVE" sits bottom-left.
  - The controls never cover the table, the HUD or the round text, and the buttons are big enough.
- The STOMP button turns red when the belly is full. That is a clear, glanceable cue.
- The setup pill bars (Free Play and Party) are large with good contrast. Every setting is reachable by thumb, and the 🎲 randomiser is there too.
- The twist picker (shot-18) fits fully above the pills and has a clear ✖. Single and double twists are readable. A double twist survives going back to setup (a fix from last round, confirmed).
- The new round-end line works: "You went out at 4s: a KAIJU stomp (TOASTBAT)". It is concrete and fair.
- The 🏆 First Bite +30 toast (top right, shot-12) and the "THIS MATCH" panel (tokens, mastery XP, achievements, unlock) are clear and not overcrowded.
- Pantry shows payouts on orders ("Each one pays 40"). The two-tap buy shows "tap again to buy for 40" (shot-44).
- Gallery shows the unlock reason for locked kaiju ("Beat Story chapter 2... (1/2 cleared)", shot-47). It also shows reach and cooldown ("reach 207 · every 1.6 s") and a Mastery reward ladder.
- Settings has a **BIG TOUCH BUTTONS** option. The Trials descriptions (stars, KO goals) are clear.
- The Story chapter panel is readable. The Chapter Clear panel (shot-14) is well laid out.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make the on-screen STOMP actually go KAIJU, and confirm it on a real phone.**
   - **What:** Tapping STOMP (via `/tap?label=STOMP`, plain and with hold=0.3, 0.4, 0.5 and 1) never triggered KAIJU. I tried it in Story, Free Play, Party and Move Lab. The belly was 100, the HUD said "STOMP READY!" and the button was lit red, but `kaijuSecs` stayed 0.
   - **Control test:** `/act?cmd=stomp` worked every time ("YOU went KAIJU", kaijuSecs 5.2).
   - **Uncertainty:** this may be a harness artifact, because the game is frozen between commands and a synthetic tap may not span a frame. It could also be a real touch-handler bug. Either way, verify on a real device and add an automated phone-STOMP test.
   - **Behaviour:** a single tap on STOMP with a full belly starts KAIJU within one frame. Show a brief press flash on the button.
   - **Where:** all match screens in phone mode.
   - **Score impact:** +0.8 if it is a real bug, +0.0 if only the harness.
2. **Show state on the setup pills.**
   - **What:** the Party pill reads "🏆 CUP ON/OFF" with no state, so I could not tell if the Cup was on. It auto-started "GAME 1/6" and a Cup standings flow I never opted into knowingly (shots 29, 41).
   - **Behaviour:** the pill should read "CUP: ON" or "CUP: OFF" and be highlighted when on. A subtitle line should say "Party Cup: 6 games" when on. Use the same style for the other pills.
   - **Where:** Party Modes setup.
   - **Score impact:** +0.4.
3. **Show the whole twist on the TWIST pill.**
   - **What:** with a double twist the subtitle shows "MINI KAIJU + KAIJU FRENZY" but the pill says only "TWIST: MINI KAIJU" (shot-22).
   - **Behaviour:** the pill should read "TWIST: ⚡⚡ MINI + FRENZY" or "TWIST: 2 ⚡".
   - **Where:** Free Play and Party setup.
   - **Score impact:** +0.2.
4. **Explain each BOT LEVEL on the phone setup (the brief says this shipped).**
   - **What:** when I cycled BOTS I saw only "Bot difficulty: TOUGH · Up to 6 players · First to 3 rounds · 13/20 kaiju" (shots 17, 19). There is no sentence on what TOUGH or BRUTAL means.
   - **Behaviour:** add one line under the bot line, such as "TOUGH: dodges, uses powers, steals your cutlery". Show it for the selected level.
   - **Where:** Free Play and Party setup, phone layout.
   - **Score impact:** +0.3.
5. **Move the Daily intro text and the "BELLY FULL! TAP STOMP" hint out of the table, or cap their width.**
   - **What:** during the countdown, "DAILY · 3 rivals (normal, easy, easy)..." sits right on top of the spawn mats and kaiju (shot-56). The hint pops over the bot lanes and the YOU marker (shots 23, 24, 33).
   - **Behaviour:** use a compact pill in the bottom-centre safe zone, under the table, and keep it off the spawn mats.
   - **Where:** Daily, Party and Story countdowns.
   - **Score impact:** +0.3.
6. **Fix the "DRAG HERE TO MOVE" contrast.**
   - **What:** the text is light grey on the cream or yellow tablecloth in Breakfast Rush and Sushi Bar (shots 24, 26). It almost disappears. It also overlaps the table's bottom-left corner.
   - **Behaviour:** give it a dark pill background. Fade it after 5 seconds of play.
   - **Where:** in-match.
   - **Score impact:** +0.2.
7. **Make the party/phone flow discoverable.**
   - **What:** the brief says "PHONES AS PADS" is the last button on Party setup. I did not see it on the phone layout (shot-29 and `phoneControls`). On a phone it may be intentionally hidden, but nothing says so.
   - **Behaviour:** either show it, or show a one-line note ("Use a bigger screen for Phones-as-pads").
   - **Score impact:** +0.1.
8. **Raise the tap size for tiny elements.**
   - **What:** the Gallery colour swatches (~35 game px, shot-46), the kaiju portrait tiles and the Rewards ladder icons are small for a thumb.
   - **Behaviour:** make swatches at least 48 px. Label the ladder icons. Let a long-press show the tooltip.
   - **Where:** Gallery.
   - **Score impact:** +0.2.
9. **Tighten the FULL SCREEN pill.**
   - **What:** it floats top-left on the title, over the game's left letterbox edge (shot-1), and covers ~60 px of the game area on Free Play and Gallery screens.
   - **Behaviour:** pin it to the dark side margin only, or move it into the Settings menu.
   - **Where:** all menu screens.
   - **Score impact:** +0.1.
10. **Add match-start guidance for touch.**
    - **What:** I never saw a "tap STOMP" tutorial until the belly was full, and that hint then overlapped the table.
    - **Behaviour:** one-time arrows from THROW, SWIPE, DASH and STOMP to a caption in the first match.
    - **Score impact:** +0.2.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | All matches (phone) | The STOMP pad tap did not trigger KAIJU in 5 attempts (hold 0 to 1 s) while the belly was 100 and "STOMP READY!" showed. `/act stomp` works. Might be harness only. | shot-34, shot-50 | Verify on a real device. Add a touch-handler test. |
| 2 | major | Party Modes setup | "🏆 CUP ON/OFF" pill shows no state. I got a Cup ("GAME 1/6") without knowing, and "Rounds" jumped from 3 to 2 on the next visit. | shot-29, shot-41 | Show "CUP: ON/OFF" and the game count. |
| 3 | minor | Free Play / Party setup | TWIST pill shows only the first twist of a double ("TWIST: MINI KAIJU") while the subtitle shows both. | shot-22 | Show both names or a ⚡⚡ marker. |
| 4 | major | Free Play / Party setup | No explanation of what each BOT LEVEL means. Only "Bot difficulty: TOUGH · ..." is shown. | shot-17, shot-19 | Add a one-line description per level. |
| 5 | minor | Free Play setup | The pill bar grows and runs to the screen edge when labels get longer ("BOTS: BRUTAL", "TWIST: ICE RINK"). The PLAY pill ends 15 px from the screen edge and LEAVE starts 12 px in. A long double-twist name would overflow. | shot-19, shot-22 | Shorten labels or split into two rows (Party already does). |
| 6 | minor | Party setup | The pill bar wraps to two rows with PLAY on the second row, alone with CUP. Primary action is not in a consistent place. | shot-29 | Keep PLAY at the same corner on every setup. |
| 7 | polish | Party setup | "PHONES AS PADS" (brief says last button) is not on the phone layout. | shot-29 | Show it or explain why not. |
| 8 | minor | Match countdown | "DAILY · 3 rivals (normal, easy, easy) · win to keep your 🔥 streak" is drawn over the spawn mats and kaiju. | shot-56 | Move to the bottom-centre safe zone. |
| 9 | minor | Match countdown | "💡 KAIJU mode makes you immune..." and other quick tips sit on cups and the gravy boat. | shot-6, shot-8 | Add a dark pill background and avoid mid-table. |
| 10 | minor | In match | "BELLY FULL! TAP STOMP → KAIJU" floats at your kaiju and overlaps the "▼ YOU" marker. It runs ~480 px wide, partly across the nearest mat, and also covers cups. | shot-23, shot-24, shot-33 | Put it near the STOMP pad (right edge) instead. |
| 11 | minor | In match | "DRAG HERE TO MOVE" is grey on cream or yellow and nearly invisible. It overlaps the table corner. | shot-24, shot-26 | Dark pill or fade out. |
| 12 | polish | In match, Move Lab | The bottom hint ("MOVE LAB: Gobzilla Jr.: STOMP to go KAIJU...") overlaps the table's bottom edge and is a long single line. | shot-50 | Two shorter lines above the pad. |
| 13 | minor | Round-end banner | The "★ ☆ ☆" score line renders filled and empty stars almost identically in the banner ("GOBZILLA ★★ CRABBAGE ★★" in the screenshot while the text says ★☆). I could not read the score from the banner. | shot-10 | Use filled and empty stars with a clear style, or numbers. |
| 14 | polish | Round-end banner / results | The Party result footer ("Most KOs ... Crumb Monster ... Survivor ... Condiment Hoarder") is tiny (~13 px) and spans nearly the full width. | shot-39 | Show 1 or 2 awards per line or paginate. |
| 15 | minor | Results (Free Play) | "THIS MATCH" panel overlaps the table plates at the bottom-left. Results text is dense. REMATCH and MENU overlay the table (shot-27). | shot-27 | Clear background or move to the right margin. |
| 16 | minor | Results | Result buttons ignored my first tap while the banner was animating (Party MENU needed two taps and a frame). | shot-40, shot-41 | Accept taps during the banner or show a "tap to continue" prompt. |
| 17 | polish | Results | The big kaiju portrait on result screens covers the playing area to the right (the winner art, ~300 px). OK for flair, but it hides the final table. | shot-12, shot-27, shot-39 | Slide it in from the pad column or lower the size. |
| 18 | minor | Story chapter panel | The "★★★ no rounds lost · ★★ lost one · ★ any win" caption is tiny (~11 px) and touches the panel border. SCENE overlaps the panel border. | shot-3 | Raise the font and spacing. |
| 19 | polish | Story map | "Seed Spray" sits against the right arrow ▶ at the bottom-left kaiju card. | shot-3 | Add padding. |
| 20 | minor | Story map | Unlock chains show 🔒 for ch2 to ch12 with a dark tint. It is hard to tell what the next goal is (the ch1 box is the only lit one). | shot-3 | Show "Next" label. |
| 21 | minor | Story opening | The pre-match dialogue types out slowly with a "SKIP CHAT" link (small) and a "▶ tap" prompt. Text typed to "GOLDEN SP" before I could read. The skip target is small. | shot-5 | Bigger skip pill. |
| 22 | polish | Story opening cutscene | First cutscene frame is almost completely black with just "THE GRAND FEAST". | shot-2 | Fade in faster. |
| 23 | minor | Title | FULL SCREEN pill overlaps the game's left edge and sits on top of the letterbox. | shot-1 | Keep in the margin. |
| 24 | polish | Title | "NEXT UP" box text is small and cut in the harness ("...Lime c") and wraps to 3 lines. | shot-1 | Truncate gracefully. |
| 25 | minor | Gallery | Colour swatches are small (~35 px) for a thumb and mostly show 🔒 with no price or unlock rule on the swatch. | shot-46 | Bigger, with an unlock caption on tap. |
| 26 | polish | Gallery | The Mastery "Rewards" ladder is tiny icons only (✔ ✨ 🔒 ⭐ 🪙 ...). Meaning is unclear without text. | shot-46 | Label each step. |
| 27 | polish | Gallery | Info box text is long and small ("reach 207 · every 1.6 s"). | shot-46 | Break into stat chips. |
| 28 | polish | Pantry | The footer note and the Chef Rank block are small and tight. Chef Rank lines are cramped. Rank uses a different font. | shot-43 | Add spacing. |
| 29 | polish | Pantry | "−30% today" tag on Lifeline is hard to see (small, next to "not enough yet"). | shot-43 | Highlight the discount. |
| 30 | polish | Trials | Cards are misaligned: left column cards at different widths because the focus ring is larger. Description text small. | shot-53 | Make equal widths. |
| 31 | polish | Records | The pin hint at the bottom wraps across two columns and its text is tiny. | shot-54 | Shorten. |
| 32 | polish | Challenges popup | "Checkpoints: clear a course's boss wave once..." is a long, tiny line. | shot-52 | Wrap to two lines. |
| 33 | minor | Daily | Daily starts straight from the title with no setup/intro screen, so I could not see my kaiju or rivals first. My own kaiju was not obvious in the first frame (no "YOU" marker before the countdown). | shot-56 | Show a short intro card with a Start button. |
| 34 | polish | Free Play setup | "Touch · KAIJU ▶" on the player card and the pill "KAIJU ▶" duplicate. Helper legend (LEFT SIDE drag...) is accurate and good. | shot-16 | Remove the duplicate. |
| 35 | polish | Free Play setup | Info lines ("Bot difficulty ... 13/20 kaiju") over the busy kaiju background are readable but low contrast. | shot-17 | Add a panel behind. |
| 36 | polish | Twist picker | Some descriptions use smaller font (Fists Only, Mirror Moves) than their neighbours. | shot-18 | Normalise. |
| 37 | polish | Twist picker | After picking a double I got the new twist but the picker closes with no confirmation (only the pill changed). Hard to tell whether a double applied. | shot-22 | Toast "⚡⚡ applied". |
| 38 | polish | Free Play match | A very harsh start for new players: with KAIJU FRENZY an Easy bot squashed me in 4 seconds. Easy bots did well against the human, which makes "Easy" feel too hard under a twist. | shot-23, shot-24 | Show a warning label on twists or reduce bot aggression under Frenzy. |
| 39 | polish | In match | With the pad on screen, the thumb zone for MOVE ("drag here") has no on-screen indicator once play begins. There is no joystick bubble. | shot-7 | Show a faint joystick ring while dragging. |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- **Title (shot-1):** OK for text overlap. FULL SCREEN pill overlaps the game's left edge slightly (no text underneath). The NEXT UP text is smaller than the buttons but readable.
- **Story map (shot-3):** OK, with problems. The caption "★★★ no rounds lost..." is tiny and touches the panel border. SCENE sits on the border. "Seed Spray" abuts the ▶ arrow.
- **Story dialogue and cutscene (shots 2, 4, 5):** OK, with two problems. The dialogue text is cut by the typewriter effect. SKIP CHAT is small. The first cutscene frame is nearly black.
- **Match HUD and controls, Story and Free Play (shots 6, 7, 10, 11, 12):**
  - Controls do **not** cover any game text, HUD or mat. This is the main goal and it passes.
  - The tip "💡 KAIJU mode makes you immune..." overlaps cups (minor).
  - "DRAG HERE TO MOVE" is low contrast on light tables.
- **Match HUD with 4 players (shots 31, 33, 34):** OK. Four player cards fit. The belly hint overlaps "▼ YOU".
- **Round-end banner and Chapter Clear (shots 10, 12, 14):** OK. The ★/☆ score is hard to read in the banner. The kaiju art covers the right half of the table in shot-12.
- **Free Play setup (shots 16-22):** OK for overlap. The pill bar reaches 12 to 15 px from the screen edge when labels get long (shot-19). A long double twist name could overflow.
- **Twist picker (shot-18):** OK. Nothing is cut off. A few descriptions use a smaller font.
- **Party Modes setup (shots 29, 30, 41):** OK, no overlap. The pills wrap to 2 rows. Cup state is invisible (not a layout problem, a content problem).
- **Results (shots 27, 39):** Dense. "THIS MATCH" overlaps table art. The bottom awards line is tiny and nearly full-width. The buttons are not cut off.
- **Pantry (shots 43, 44):** OK. Nothing overlaps or is cut off. Footer is small.
- **Gallery (shots 46, 47):** OK, with problems. The swatches are small. The rewards ladder is icons only.
- **Move Lab (shot-50):** OK. The bottom hint overlaps the table edge.
- **Challenges popup (shot-52):** OK.
- **Trials (shot-53):** OK. Uneven card widths and small text.
- **Records (shot-54):** OK. Small pin hint and a bit of crowding in the bottom text.
- **Settings (shot-55):** OK. Nothing overlaps. Every row reads well. The "Saved on this device" caption sits a few px from the bottom edge.
- **Daily countdown (shot-56):** Problem. The DAILY intro text overlaps the spawn mats and kaiju.
- **Not visited:** Online, Help, Workshop, Practice, Hot Dumpling gameplay, and the Phones-as-pads room.

## The single biggest structural problem
For a phone-only player the core verb pair "fill belly then STOMP" depends on a single tap on the STOMP pad. In my run it never worked, and nothing on screen told me why. The hint says "BELLY FULL! TAP STOMP → KAIJU", but the tap silently did nothing. If this is a real touch bug, it breaks the central power moment for all phone players. If it is only a harness artifact, the team still needs an automated check and clear visual feedback (a press flash, a haptic and a sound) so the player can tell a tap registered.

The second structural problem is "invisible state" in the setup pills. The Cup, twist and bot level are all things a player has to guess, and a phone has no room for explanatory text. Every pill should state its state and every cycle should show a one-line explanation.

## Big change proposals (2–3, most important first)
### Proposal 1: Guaranteed phone STOMP and tap feedback
- **Problem it solves:** the STOMP tap did not work in my runs and gave no feedback.
- **How it would work (detailed design):**
  - Handle STOMP on `pointerdown` (not on release). Allow a 150 ms grace window so a tap that lands a frame before the belly fills still fires when it fills.
  - Every pad button gets a 100 ms press flash, a tiny vibration (the RUMBLE setting) and a click sound.
  - If STOMP is pressed with the belly not full, shake the button and show "belly 60/100".
  - When STOMP is ready, pulse the button every 1.2 s and move the hint from the table to a caption just left of the STOMP pad.
  - Add a debug overlay (`?touchdebug`) that shows the last pad event so QA can prove taps are received.
- **Example moment:** the player's belly hits 100, STOMP pulses red, they tap it, and the screen flashes, the phone buzzes and KAIJU starts.
- **Rewards / progression hooks:** none needed. This is core reliability.
- **Risks and edge cases:** double fire on multi-touch; keep one-shot per press. Make sure a held STOMP does not repeat after KAIJU ends.
- **Size:** S
- **Score impact for me:** +0.8 (if the bug is real) to +0.3 (feedback only).

### Proposal 2: "Stateful pills" setup for phones
- **Problem it solves:** hidden state (Cup, twist, bot level) and pill bars that grow to the screen edge.
- **How it would work (detailed design):**
  - Use a two-row pill dock with fixed order. Row 1 holds PLAYERS (JOIN, KAIJU, +BOT, −BOT, BOTS). Row 2 holds RULES (TABLE, ROUNDS, MODE, POWER-UPS, HAZARDS, TWIST, CUP) and PLAY, anchored bottom-right on every setup.
  - Every pill shows its state with an on/off dot: "CUP ●", "HAZARDS ●". Pills with options show a short value: "TWIST: ⚡⚡ 2".
  - Tapping BOTS, MODE or TWIST updates a single caption line above the dock. Examples: "BRUTAL: dodges, steals, uses every power" and "ICE RINK + TURBO: slippery and fast".
  - If the dock would exceed the width, collapse to icon pills with a "MORE ▸" overflow.
- **Example moment:** the player taps CUP and the dot turns green and the caption reads "Party Cup: 6 mini-games, points carry over". They tap BOTS and read what BRUTAL means.
- **Rewards / progression hooks:** none, but it reduces wrong setups and quits.
- **Risks and edge cases:** very long translated labels; test with Kid Mode's bigger text.
- **Size:** M
- **Score impact for me:** +0.6.

### Proposal 3: Safe-zone captions (a "text lane" for phone matches)
- **Problem it solves:** tips, daily info, belly hints and Move Lab text appear on the table and overlap mats, cups and the YOU marker.
- **How it would work (detailed design):**
  - Reserve a 36 px caption lane under the table (between the table edge and the screen bottom) and a hint slot beside the STOMP pad.
  - Countdown tips, daily/mode info and Move Lab instructions go in the caption lane, on a dark pill, max two lines.
  - The "BELLY FULL!" hint goes beside the STOMP pad, not at the player.
  - Move "DRAG HERE TO MOVE" into a dark pill that fades after 5 s.
- **Example moment:** the countdown shows "3 · Hot Dumpling: pass it on by touching a rival" in the lane under the table, so the mats and kaiju stay clear.
- **Rewards / progression hooks:** none.
- **Risks and edge cases:** Kid Mode's larger text needs the lane to scale. Landscape phones with short screens (360 px high) need the lane to share space with the table margin.
- **Size:** S-M
- **Score impact for me:** +0.4.

## How this round's new features felt
- **Fairness (1.4 s grace, round-end banner):** the banner "You went out at 4s: a KAIJU stomp (TOASTBAT)" was great. I never had to guess how I lost. I did not feel the 1.4 s grace, because under KAIJU FRENZY I was squashed in about 4 s. The Daily countdown does name its rivals' levels ("normal, easy, easy"), but the text sits over the mats (shot-56). The Free Play bot-level explanation is **not** on the phone setup (issue 4). I could not test the Giant Hand dodge.
- **Feedback (toasts, orders, two-tap buys):** the 🏆 First Bite toast showed top right and did not hit the pad (shot-12). I did not trigger a NEW KAIJU toast. Pantry orders show "Each one pays 40". The two-tap buy works and states the price (shot-44). I did not try buying with too few tokens.
- **New-save locks:** the Gallery unlock hints are clear (shot-47), and the "NEXT UP" box on the title gives a goal. After one story win I had 14/20 kaiju, so progression felt quick. The Story map, in contrast, stays dark and locked, so it could make the next goal clearer.
- **Story comic panels / PHASE 2:** not reached (I only played ch1).
- **Phones as pads:** I could not find the button on the phone layout. The brief says it is the last Party button, but the phone shows "CUP ON/OFF" and "PLAY" there instead (shot-29).
- **Gallery reach/cooldown + Mastery ladder:** present ("reach 207 · every 1.6 s", plus the ✔/🔒 ladder with ✨ Shiny and the SHINY button "300 🪙 · needs Lv 3"), but small for a phone.
- **Fixes from last round:** double twists are kept after a match (confirmed). The phone TWIST button opens the picker (confirmed). Kid Mode, quit-confirmation and Practice SWIPE were not tested. Team Feast grouped results were not tested (I played Cup game 1, a classic-style match). Pop-ups never exceeded 3.
- **Text and layout:** on phone the layouts are in good shape. The main problems are overlay text on the table (tips, Daily, hints) and tiny captions on a few menus. See the check above.

## Bugs that block play
- None blocked play outright, and `/errors` stayed "none".
- **Possible blocker for real phone play:** the on-screen STOMP tap never started KAIJU in this harness (issue 1). Please verify on a real device. If the tap does not register there either, a phone player can never use KAIJU mode.
