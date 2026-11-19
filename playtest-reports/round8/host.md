# Playtest evaluation: The Party Host (profile 6, port 7106)

**Fun score: 7.0 / 10.** The party setup is quick and the Party Cup is a real "game night" structure with a good final. What holds it back is that the game never answers "who wins the night?" with team grouping, crumb counts or a saved Cup record. A 6-person couch also has no controller story: there are no phone controllers, and a keyboard seats two players.

> Screenshot paths are relative to `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r8-7106\` (files `shot-N.png`).

## What I did
- About 100 harness commands, roughly 70 minutes of game time (Golden Spoon first-to-3 alone was around 4 minutes).
- Screens visited:
  - Title.
  - Party Modes setup (seats, MODE, PARTY CUP, CUP LENGTH, BOT LEVEL, TABLE, FIRST TO, TWIST picker, POWER-UPS, HAZARDS, RANDOM, KEYS panel, HOUSE RULES with save and code).
  - In-match pause menu and the Cup double-quit.
  - Online (Host a Game lobby with room code, QR, mode, Party Cup, TV mode, then Close Room).
  - Daily Challenge.
  - Settings (Kid Mode).
  - Records.
  - Pantry.
- Modes played:
  - Party Cup: 3-game Cup (CLASSIC, GOLDEN SPOON, CLASSIC final x2) with 6 seats, played to the end.
  - Crumb Rush: full match.
  - Hot Dumpling: full match.
  - Golden Spoon: full match, 4 players, first to 3.
  - Team Feast: full match, 3v3, Hard bots.
  - Daily (Hot Dumpling): 1 match.
- Matches: 7 or more full matches, plus an aborted Cup (I quit it to test the double-quit). I won the Team Feast (my team, Red) and the other results went to bots.
- Because /act with `auto:` and `attack` is a bot driving my seat, I judged feel mostly from the between-game screens and HUD. I did play a few rounds by hand (Hot Dumpling "flee" got me knocked out in 3 seconds; Golden Spoon "shove").
- `/errors` was `none` at start, middle and end.

## What worked for me
- **Setup is fast.** One tap per seat joins a kaiju (or adds a bot), and PLAY works with a partial table. Six seats are filled in 6 taps. Seat cards are big and readable (shot-3).
- **The Party Cup is a good idea.** The ON/OFF switch plus a "CUP = 6 games: CLASSIC → CRUMB RUSH → ..., places score 5/3/2/1, final x2" line at the bottom explains the whole format on the setup screen. CUP LENGTH 3/6 is a very useful option (3 games fits a lunch break).
- **Between-game screens are good.**
  - A STANDINGS plate shows points and deltas, e.g. "BUBBLEGUMBO 5 pts (+5)".
  - "Next: GOLDEN SPOON · 1 / START to continue" tells the room what is coming. The final is announced as "Next: CLASSIC (FINAL · x2 POINTS)" (shot-7).
  - The Cup end screen has a big winner banner and "Past champions: NORIGON on 19 Nov" (shot-9).
  - The trophy and giant kaiju art make it a ceremony.
- **The Cup double-quit works.** The pause menu says "QUIT (ends the Cup / run)" and then "Tap QUIT again to really end it" (shot-11). Nobody loses a 30-minute Cup to a mis-tap.
- **Twist picker is clear.** It has singles and double twists in color-coded tiles (shot-21).
- **HOUSE RULES slots and a share code** are exactly what a host wants (shot-22/23).
- **Team Feast shows teams well.** The HUD has a red/blue underline plus "RED · Fork", the table has team rings, and there is a "▼ YOU" marker (shot-42).
- **Hot Dumpling's instant replay and fast-forward** ("FAST FORWARD x3 · ONLY BOTS LEFT") keeps eliminated friends engaged (shot-19). The "Giant Hand" tips and the post-match receipt tips are useful.
- **Online has a QR code and a TV mode** ("you just watch"), which is the right answer for a host who also runs the screen (shot-28).
- **The Pantry is fine.** Weekly orders and the −30% daily sale are good (shot-41).

## 🧾 Exactly what would make this a 9/10 for me
1. **Phone controllers for the couch (+0.8).**
   - What: let friends join a local game by scanning a QR code on the Party Modes screen. The phone becomes a gamepad (THROW/SWIPE/DASH/STOMP, joystick), the same way the Online lobby does. No "Online" matchmaking, only the local-network or same-room code.
   - Where: Party Modes seat row. Add a "📱 JOIN WITH PHONE" tile with a QR code and room code on empty seats.
   - Behavior: scan, enter a name, pick a kaiju on the phone, and the seat card shows "Sam 📱".
   - Why: keyboard shows only 2 key sets (shot-24) and gamepads are the only other way to reach 4-6 humans. Today a 6-human party is not really possible without buying controllers.
2. **Team Feast results grouped by team (+0.5).**
   - What: the results plate should show "RED TEAM 3 rounds" and "BLUE TEAM 1 round", then members under each team in team colors.
   - Where: Team Feast match-end screen (shot-43). Currently it lists 6 individuals ranked by rounds ("1. TOASTBAT 3 rounds · 6 KOs, 2. GOBZILLA (YOU) 3 rounds, 3. PIZZARAPTOR 3 rounds, ...") with no team colors, and a single-player row looks like a team result.
   - Fix: color-code each row, add a team subtotal, and put the winning team's color border on the plate. Also in the Party Cup standings, if a Cup contains Team Feast, show team points.
3. **Crumb Rush and Hot Dumpling results must show the mode's own score (+0.5).**
   - What: Crumb Rush's setup line says "Eat the most crumbs before time runs out", but the result plate ranks by "rounds · KOs" (shot-17). The "Crumb Monster: GOBZILLA (84 crumbs)" footer shows I had the most crumbs yet ranked 6th. A group will argue about what counts.
   - Fix: Crumb Rush results show crumbs per round and total. Hot Dumpling shows "dumplings survived/popped on". Golden Spoon shows "seconds held". Drop or de-emphasize KOs in modes where KOs are not the point. Add one line under the mode name on the setup screen: "Winner = most rounds; round winner = most crumbs".
4. **Persist the Party Cup (+0.4).**
   - What: a Cup progress tracker and a long-term Cup record.
   - Where: Records screen has no Party/Cup stats at all (shot-40). Add "Cups played / won", "Best Cup score", and a "Party Cup hall of fame" listing last 5 winners with player names (today the end screen shows "NORIGON on 19 Nov", a kaiju name, not a person).
   - Also add a cup progress strip during matches: "Cup 2/3 · you 5th · 8 pts".
5. **Make Kid Mode and bot level honest on the setup screen (+0.3).**
   - What: with Kid Mode ON the Party setup still reads "BOT LEVEL TOUGH" and "Bot difficulty: TOUGH" (shot-39), while the brief says Kid Mode forces easy bots. Hosts will think the bots are Tough.
   - Fix: show "BOT LEVEL KID-EASY (Kid Mode)" in orange. Update Settings text, which still says "Story: easier rivals, 1-line chats, bigger result text" and omits Party, Free Play and Daily (shot-37).
6. **Shorter default for a 6-player game night (+0.3).**
   - What: Golden Spoon first-to-3 took roughly 4 minutes of real time for 4 players. Team Feast first-to-3 across rounds plus the replays was the same. The Cup's third-game "first to 2" is good.
   - Fix: add a per-Cup "party length" button (Quick 25 min, Standard 45 min, Long) that picks CUP LENGTH and FIRST TO together with an estimated minutes label. Show "est. 12 min" beside PLAY.
7. **Mid-Cup seat and team handling (+0.3).**
   - What: allow one-tap "swap kaiju / drop out / add player" between games. Today the only seat controls are on the setup screen, which the Cup skips.
   - Where: the CONTINUE screen between games. Add "+ JOIN" and "✖ DROP" for latecomers and bathroom breaks.
8. **Standings plate readability (+0.2).**
   - What: the standings plate is translucent over a busy table. Cheese blobs and berries bleed through it (shot-7), and the ant trail in the Daily plate crosses text (shot-36). Make the plate more opaque (about 85%) and add a thin border.
9. **Online lobby: seat cards and Cup length (+0.2).**
   - What: the lobby is missing a CUP LENGTH button and kaiju picks for friends, and it shows "YOU (HOST) (YOU)" (double YOU) (shot-27).
   - Fix: remove the duplicate, add CUP LENGTH when Party Cup is ON, and explain "First to 5 rounds" versus Cup rules.
10. **Fix the unreadable HOUSE RULES slot names and codes (+0.1).**
    - What: slot text shows raw ids "HOTDUMPLING · FIRST TO 2 · ⚡ FRENZY" (shot-23). The code is a long base64 string that is hard to read aloud.
    - Fix: friendly names ("Hot Dumpling · first to 2 · Kaiju Frenzy"), and include Party Cup / Cup length in the saved setup (today it does not). Add a short 6-character code.

## 🔍 Every issue I saw (exhaustive)
| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Party Modes / Keys | The keyboard panel lists only Keyboard Left and Keyboard Right plus Gamepad. A 6-person party needs 4+ gamepads. No phone join exists for local play. | shot-24 | Local QR phone controllers; show "needs N controllers" warning when seats exceed input devices. |
| 2 | major | Team Feast end screen | Results list 6 individuals by rounds with no team colors and no team total ("1. TOASTBAT 3 rounds · 6 KOs 2. GOBZILLA (YOU) 3 rounds ..."). The banner says "TEAM RED" but the table shows rounds per person like a free-for-all. | shot-43 | Group by team with colored rows and a team round total. |
| 3 | major | Crumb Rush end screen | Result ranks by "rounds · KOs" but the mode is "Eat the most crumbs". "Crumb Monster: GOBZILLA (84 crumbs)" ranks 6th. No crumb count shown on the plate. | shot-17 | Show crumbs per row; rank per mode scoring. |
| 4 | major | Party Cup end | No Cup stats persist: Records has no "Cups won/played". Past champion is a kaiju ("NORIGON on 19 Nov"), not a person. | shot-9, shot-40 | Add Cup stats and named champions (seat names/nicknames). |
| 5 | major | Party setup + Kid Mode | With KID MODE ON the screen shows "BOT LEVEL TOUGH" and "Bot difficulty: TOUGH" with no note that bots will actually be easy. Settings text for Kid Mode only mentions Story. | shot-39, shot-37 | Show "KID-EASY (Kid Mode)"; update Settings description. |
| 6 | major | Pacing | Golden Spoon first-to-3 with 4 players took about 4 min real time; Team Feast first-to-3 plus replays similar. A 6-game Cup at those lengths would be over 1 hour. | shot-34 | Estimated time label and a "Quick" preset. |
| 7 | minor | Party Modes, Cup ON | With PARTY CUP ON, the mode label still reads "◀ TEAM FEAST ▶" and the seats still show RED/BLUE TEAM, yet game 1 played as CLASSIC free-for-all. Confusing which mode applies. | shot-3, shot-4 | When Cup is ON grey out MODE and teams, show "CUP: 3 games" in the header. |
| 8 | minor | Party Modes setup | The Cup route line at the bottom is one long truncated sentence at y=652. With 6 games it is cut off by the screen edge: "...places score 5/3/2/1 · final x2 · switch it ON, then PLAY". Also it still says "switch it ON, then PLAY" when it is already ON. | shot-3 | Two lines; change the wording based on switch state. |
| 9 | minor | Cup game 1 banner | Banner "🏆 PARTY CUP · GAME 1/3 · CLASSIC · Pancake Stack" and tip line sit in the middle of the table, over the stack and the plate, partially hiding the "1" countdown. | shot-4 | Move to a plate under the countdown or into the top bar. |
| 10 | minor | Between-game screen | Receipt, standings, banner and SHARE all compete. "Next: GOLDEN SPOON · 1 / START to continue" suggests a keyboard key while a mouse CONTINUE button exists. Touch/mouse hosts get a keyboard-only hint. | shot-5 | Use "Next: GOLDEN SPOON" and leave the key hint to the keys panel. |
| 11 | minor | Between-game screen | The Standings heading shows a stray dark dot "STANDINGS 🏆" (emoji missing/ratio box) in the look text; the heading itself is plain. | shot-5 | Add trophy icon or remove. |
| 12 | minor | Between-game screen | Receipt on Cup games only says "Play any Party Mode ✔ +25 🪙". No Cup-specific reward (no coins for finishing a Cup). Rewards for 3 games +8, +9, +12. | shot-5, shot-9 | A Cup-completion bonus line on the final receipt. |
| 13 | minor | Cup end | Standings show "(+10)" for the winner but the x2 final bonus is not explained in the final plate. Unclear why the delta is 10. | shot-9 | Add "final x2" tag on the deltas. |
| 14 | minor | Pause menu | "Tap QUIT again to really end it" is at the very bottom (y=690), low contrast on wood, 100px below the button. Easy to miss. | shot-11 | Put the message inside the QUIT button ("QUIT: tap again to confirm"). |
| 15 | minor | Hot Dumpling | Top banners "FAST FORWARD x3 · ONLY BOTS LEFT" and "INSTANT REPLAY" stack right on top of each other and cover the table top edge. | shot-19 | One banner at a time. |
| 16 | minor | Hot Dumpling | In round 1 I was knocked out in about 3 seconds of fleeing (HOT PASS) and spent the rest of the round watching. Eliminated humans have nothing to do except watch. | shot-19 | A spectator action (taunt, throw cutlery from the rail). |
| 17 | minor | Hot Dumpling / Crumb Rush tips | The Crumb Rush countdown tip says "Shove rivals off the table edge with a dash." which has nothing to do with crumbs. The Daily's tip "Dash INTO a flying fork to catch it" shows for a Hot Dumpling match. | shot-14 | Mode-specific tips. |
| 18 | minor | Golden Spoon | The Golden Spoon on the table is hard to see in the open (a pale oval at the center, no marker). Only the top banner says who holds it. | shot-30 | A gold pulsing ring and an off-screen arrow. |
| 19 | minor | Golden Spoon HUD | HUD shows "🥄 0/15s" tiny; the "HOLDING! 12/15s" is red on dark and in a 12px font. | shot-30, shot-6 | Larger, add a progress ring on the kaiju. |
| 20 | minor | Twist picker | Tile text sizes are inconsistent: "FISTS ONLY" and "MIRROR MOVES" descriptions are much smaller than the others. Double-twist titles are abbreviations ("KAIJU + CASTLE" means MINI KAIJU + BOUNCY CASTLE; "MOVES + TURBO"). | shot-21 | Same font size; use the full names in the title line. |
| 21 | minor | Twist picker | No selected-tile marker apart from a green border on NONE; it is easy to miss which twist is chosen when reopened. The picker has no description of how many twists can stack. | shot-21 | Checkmark on selected. |
| 22 | minor | House Rules | Slot labels show raw/uppercased ids ("HOTDUMPLING", "⚡ FRENZY"). Party Cup/cup length isn't part of a saved setup. The code is a long base64 string. | shot-23 | Friendly names; include Cup; short code. |
| 23 | minor | House Rules | Footer "Esc closes" is shown while the ✖ button exists. Touch players do not have Esc. | shot-22 | "Tap ✖ to close". |
| 24 | minor | Keys panel | The panel covers all the setup buttons including PLAY, with only "CLOSE KEYS" in the bottom-left. Its closed state is the same button position as KEYS; OK, but the panel is dense. | shot-24 | Fine as is; lighten the "joins/leave" row. |
| 25 | minor | Party Modes | "BOT LEVEL" cycles NORMAL, TOUGH, HARD, BRUTAL, EASY. After BRUTAL, a single tap on RANDOM or table also changed settings. BRUTAL for a party is a trap with a single tap. | shot-25 | Warn on BRUTAL ("not for parties"). |
| 26 | minor | Party Modes | RANDOM button also randomizes BOT LEVEL (it set BRUTAL for me, then EASY on the next visit). A host pressing 🎲 for fun gets brutal bots. | shot-25 | Exclude bot level from RANDOM or cap at NORMAL. |
| 27 | minor | Party Modes | Setup is not remembered when returning from the title: seats are emptied each time (6 taps again) although MODE, BOT LEVEL and TABLE persist. Hosts who replay lose their roster. | shot-3 | Remember last roster ("SAME AS LAST TIME"). |
| 28 | minor | Online lobby | "YOU (HOST) (YOU)" shows twice; with TV mode, "YOU (HOST) (YOU) • 📺 WATCHING, NOT PLAYING". | shot-27/28 | Single label. |
| 29 | minor | Online lobby | Panel runs from y=15 to y=705 with a tight top and bottom (almost the whole 720px screen). No Cup length. "Bots fill up to 4 players" first, but "Up to 5 friends" text; the interplay between bots/friends/6 isn't explained. | shot-27 | Compact layout; one sentence on seats. |
| 30 | minor | Online lobby | /look returns no texts (DOM overlay), so screen-reader/automation can't read it. Mode "Team Feast" description doesn't change when Party Cup is ON ("Red vs Blue, no friendly fire"). | shot-28 | Cup note under the description. |
| 31 | minor | Records | "Matches won 0 / Win rate 0%" while Rounds won 3, after Team Feast and Cup results; there is no Party record (Cups won, team wins). | shot-40 | Party section in stats. |
| 32 | polish | Records | "Next rank: LINE COOK AT 14 PTS (YOU: 7)" is set in the big title font and nearly touches the panel edge. | shot-40 | Use body font. |
| 33 | polish | Pantry | Token count here (281) differed from Records (256) a few clicks earlier with no match between. Possibly a pending achievement payout. | shot-41, shot-40 | Single source of truth. |
| 34 | polish | Team Feast HUD | Teams are interleaved by seat (RED, BLUE, RED, BLUE...), so teammates aren't adjacent in the HUD. | shot-42 | Group HUD cards by team. |
| 35 | polish | Team Feast / lobby | "▼ YOU" marker only for local player; with 6 humans (when controllers exist) every seat needs a name or number, and Name Tags and Player Numbers default OFF. | shot-42, shot-37 | Default player numbers ON when 3+ humans. |
| 36 | polish | Settings | The Settings screen is 2 columns of 6 and the bottom row sits at 666; fine but the highlighted first button "SOUND EFFECTS" shows a stale focus ring after returning. | shot-37 | n/a |
| 37 | polish | Daily results | "Today: not won yet · best 1 round · tries 1 · win streak 0 days" is a run-on; the tip "Tough bots? Set BOT LEVEL to EASY" can't apply to the Daily (fixed bots). | shot-36 | Remove the tip for Daily. |
| 38 | polish | Hot Dumpling end screen | Ranks by "rounds · KOs", with no dumpling stats. | shot-20 | Show pops. |
| 39 | polish | Standings plate | The ant trail on the Daily table and cheese blobs show through the translucent plate. | shot-36, shot-7 | More opaque. |
| 40 | polish | Title | The "NEXT UP" line is a single long truncated string, cut at the right ("... 🎨 L"). | (title /look) | Wrap or ellipsis. |

## 🔠 Text and layout check
- **Title screen:** the NEXT UP string at [372,196] is one very long line that is truncated ("... 🎨 L"). Not able to screenshot every title state; nothing else overlapping. Mostly OK, with issue #40.
- **Party Modes (empty seats):** OK. Seat cards, 10 buttons and PLAY don't overlap. The route line at the bottom is long but readable (shot-2).
- **Party Modes (3 seated, Cup ON):** OK except the long Cup line and the stale TEAM FEAST label (shot-3).
- **Countdown with Cup banner:** the Cup banner and tip are over the table center and cover the countdown number (shot-4).
- **Match HUD (6 players):** OK; the top cards are tight but legible (shot-6, shot-8).
- **Between-game standings:** text readable. Plate is translucent with bleed-through (shot-5, shot-7). Receipt panel, SHARE button and kaiju art all fit.
- **Cup final screen:** OK. The footer stats row is very close to the table edge but not cut (shot-9).
- **Pause menu and double-quit:** OK. The confirmation line is low contrast and far from the button (shot-11).
- **Hot Dumpling:** two banners stacked at the top (shot-19).
- **Twist picker:** no overlap, but inconsistent text size and a hidden title area (shot-21).
- **House Rules modal:** OK (shot-22/23).
- **Keys panel:** OK, dense but not overlapping, hides the setup buttons by design (shot-24).
- **Crumb Rush, Hot Dumpling, Golden Spoon and Team Feast result screens:** OK for overlap (shot-17, shot-20, shot-34, shot-43).
- **Daily result:** OK (shot-36).
- **Settings:** OK (shot-37).
- **Records (page 1):** OK. The "Next rank" value is large and tight (shot-40).
- **Pantry:** OK (shot-41).
- **Online menu and lobby:** OK; the lobby fills the full height (shot-26/27/28).

## The single biggest structural problem
There is no way to get 4-6 humans into the room without a pile of gamepads. A Party Host's whole job is "the room joins in 30 seconds", and Kitchen Kaiju offers keyboard seats for 2 and gamepads, while Online is a separate matchmaking flow where everyone needs their own device and nobody shares a screen. Every other host-facing improvement matters less if the room can't join.

Second, the scoring is too diffuse to feel like a competition. The Cup standings, per-mode round counts, KOs and team results all use different scoring, and the final screens don't give you a "who won the night" moment beyond a bot's name.

## Big change proposals (2-3, most important first)
### Proposal 1: Same-room phone controllers ("Join with your phone")
- **Problem it solves:** a 6-person game night needs 6 inputs. There is no local phone joining.
- **How it would work (detailed design):**
  1. On the Party Modes screen, empty seats read "click or THROW to join" (shot-2). Add a "📱 JOIN WITH PHONE" button next to KEYS that opens a panel with a QR code and a 4-letter code (reuse the Online room code system).
  2. Phones open a controller page that has a left joystick, THROW, SWIPE, DASH, STOMP and EMOTE, plus a name field. The phone picks the first free seat and shows a kaiju carousel (same ◀ ▶ as the seat card).
  3. The seat card shows "Sam 📱" instead of "Bot: NORMAL (tap)"; a bot can fill any seat not claimed. The host can kick a phone from the card.
  4. Input is relayed to the host over the existing online transport. The host's screen remains the only game view.
  5. When the Cup is ON, phones show the standing and a "Ready for game 2" button.
- **Example moment:** the host puts the laptop on a TV, shows the QR, and 5 friends scan. In 20 seconds all 6 seats have names.
- **Rewards / progression hooks:** a "Party of 6" achievement; per-phone nicknames in the Cup hall of fame.
- **Risks and edge cases:** latency on weak Wi-Fi; phone sleep; a late joiner mid-Cup (needs the "+ JOIN" button between games); the rule that the host must stay on the page.
- **Size:** XL
- **Score impact for me:** +0.8

### Proposal 2: One "Game Night" scoreboard and per-mode results
- **Problem it solves:** the Cup has standings, but each mode ends with different scoring and the Cup's results lose context (no crumb count, no team grouping, no named champions).
- **How it would work (detailed design):**
  1. A single result plate template: heading with winner, then rows with 3 columns (rank, name/team, mode-specific stat). Crumb Rush: crumbs. Golden Spoon: seconds held. Hot Dumpling: dumplings survived. Team Feast: team-colored groups with a team total.
  2. A persistent mini-strip across the top during Cup matches: "CUP 2/3 · 5th place · 8 pts".
  3. A final Cup screen that has a per-game table (game 1/2/3 placement per player, x2 on the final), a MVP line ("Most wins", "Biggest comeback"), and a saved "Past champions: Sam (Norigon) 19 Nov".
  4. Records gets a "PARTY" tab: Cups played/won, best Cup score, favourite mode, team wins.
- **Example moment:** after the final, the plate reads "SAM wins the Cup: 1st, 3rd, 1st(x2) = 18 pts; Dana was robbed in game 2 by 1 crumb".
- **Rewards / progression hooks:** Party achievements ("Win a Cup without a first place", "Win 3 Cups"), a trophy shelf in the Gallery.
- **Risks and edge cases:** names for bots versus phones; ties; storage size.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 3: "Game Night" presets with time estimates
- **Problem it solves:** the host must configure 10 buttons and doesn't know how long the night will take.
- **How it would work (detailed design):** a row of preset tiles above the setup buttons: "Quick (3 games, about 15 min)", "Standard (6 games, about 35 min)", "Chaos (random twist each game, Hard bots)", "Kids' night (Kid Mode, no hazards, EASY)". Each preset sets MODE, CUP LENGTH, FIRST TO, TWIST, BOT LEVEL and shows an "est. X min" label next to PLAY. Remember the last roster and offer "SAME AS LAST TIME". The setup is saved in House Rules automatically.
- **Example moment:** a parent picks "Kids' night", hits PLAY, and the Kid Mode bot override is labeled on the screen.
- **Rewards / progression hooks:** a "Game Night streak" tied to Daily.
- **Risks and edge cases:** presets conflicting with a manual twist; time estimates needing playtest data.
- **Size:** S
- **Score impact for me:** +0.5

## How this round's new features felt
- **Party Cup ON/OFF switch and the double-quit:** clear and good. The switch reads "PARTY CUP ON" and the bottom line explains the order. The double-quit works as described, but its confirmation message sits far from the button and is easy to miss (shot-11). The Cup route line is long and does not update when the switch is on.
- **Final first-to-2 worth x2:** works and is announced on the standings screen ("Next: CLASSIC (FINAL · x2 POINTS)"). The final's delta, "(+10)", isn't explained on the end plate. The final felt like a real climax. Making the final the only x2 is the right amount of drama.
- **TOUGH bot level:** it appears between NORMAL and HARD in the cycle. Hard bots in Team Feast were no problem for the auto-play. I couldn't judge the fairness by hand. Kid Mode, however, doesn't show that it overrides the bot level on the setup screen (shot-39).
- **TWIST picker:** a big upgrade over cycling. Singles and doubles in color tiles are clear. Issues: inconsistent text size, abbreviated double-twist names (shot-21).
- **Kid Mode in Party:** it works, silently; the setup screen and Settings text don't mention Party/Daily.
- **Giant Hand dodge and hand KO credit:** I saw "Knocked out by: ✋ the Giant Hand x3" and a tip "STOMP first, or DASH as it reaches you" on the Daily receipt. Good, but I did not dodge by hand.
- **YOU marker:** visible in team feast and crumb rush (e.g. "▼ YOU" at [1087,557]); it's helpful. With 6 local humans, a per-seat marker or number will be needed.
- **Receipts:** good (achievements, First Bite lime colour, Better Together bubblegum, orders). One Team Feast receipt gave +217 coins in one go (orders plus achievements), a nice surprise.
- **Instant replay and fast-forward:** fun in Hot Dumpling, though the two banners stack (shot-19).
- **Online lobby with QR and TV mode:** a standout for hosts. It lacks Cup length and shows a duplicated "(YOU)".
- **Not touched (not host-relevant this round):** Story log, Shiny forms, Move Lab, Workshop, Gauntlet, Trials, Phone layout.

## Bugs that block play
- None blocked play. No JavaScript errors (`/errors` was `none` at start, middle and end).
- Functional oddity (not blocking): with Party Cup ON and Team Feast selected, the first Cup game ran as Classic free-for-all and the team seats were ignored (shot-3, shot-4). It is confusing rather than broken.
