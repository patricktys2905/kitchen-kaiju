# Playtest evaluation — The Party Host

**Fun score: 6.5 / 10** (the Party Cup is a fun game-night spine and Phones-as-Pads is a great idea. But the setup has confusing rules, the results screens don't explain scoring, there is no one-tap "run my game night" flow, and a human-only Cup feels bot-dominated.)

> This round the bar is **9/10 from EVERY profile**. Give an **extreme amount of feedback**:
> - Leave nothing out.
> - Be specific: name the screen, the button, the exact text, and the screenshot path.
> - Big structural ideas need full designs.
> - Small issues ALSO matter now: list every one you see. There is no cap.

(Screenshot paths below are relative to `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r9-7106\`.)

## What I did
- About 80 harness commands, desktop mode, one session (~25 min of game time).
- Title, then Party Modes setup. Cycled through all 5 modes (Team Feast, Crumb Rush, Hot Dumpling, Golden Spoon, Classic). Opened KEYS and HOUSE RULES (saved slot 1) and PHONES AS PADS ("YOUR ROOM" with QR). Closed the room. Also tried Online > Host a Game (second room, "VTCZ").
- **Played a full Party Cup (6 games, 4 seats: me + 3 bots).** The games were Classic, Crumb Rush, Hot Dumpling, Team Feast, Golden Spoon, Classic final ×2. I finished 4th (12 pts). DUMPLORD (a bot) won it with 29 pts.
- Played one standalone 6-seat Team Feast (first to 1) with `auto:hard`; my team lost.
- Started the Daily (Hot Dumpling), paused, and quit.
- Visited Pantry (tried the two-tap buy prompt), Records (page 1), Gallery and Move Lab, Settings, and the Free Play setup.
- Matches played: 7 (6 Cup games + 1 Team Feast). Won: 0 on paper (my record shows "Matches won 0"). `/errors` was "none" at start, middle and end.

## What worked for me
- **Party Cup is the right idea for game night.** The format is CLASSIC, CRUMB, HOT, TEAM, GOLDEN, CLASSIC. The banner "GAME 4/6", the standings between games and "Next: GOLDEN SPOON · final ×2 POINTS" give it a real rhythm. The final-game double points keep it open to the end.
- The tip line on each countdown names the mode ("🏆 PARTY CUP · GAME 2/6 · CRUMB RUSH · Sushi Bar" plus a tip). I always knew where I was in the Cup.
- Party Modes setup is a clear one-screen row of pills. Each mode has a one-line tagline ("Pass the steaming dumpling before it pops"). Seat cards show the kaiju power ("Seed Spray") and team colours.
- 📱 PHONES AS PADS opens a big room with a 4-letter code, a QR and "Everyone on the couch: scan with your phone camera" (`shot-3.png`). That is exactly what a host wants. The text is readable.
- HOUSE RULES (3 save slots, copy/enter a code) is a great host feature, and the Esc-to-close hint is clear.
- KEYS overlay (`shot-32.png`) lists every hotkey for the setup screen, including per-seat controls.
- The round-end banner says exactly how I went out: "💥 You went out at 4s: falling off (NORIGON)" (`shot-13.png`).
- Team Feast results are grouped by team, with "RED · SQUIDGEON (YOU) — 0 rounds · 0 KOs" (`shot-44.png`).
- The post-match "THIS MATCH" card (tokens, mastery XP, "Knocked out by", a tip) is useful and quick.
- The Pantry second-tap ("tap again to buy for 40 🪙") works and orders show payouts (40 🪙). Settings is clean and readable.

## 🧾 Exactly what would make this a 9/10 for me
1. **One-tap "GAME NIGHT" start, with a lobby that keeps people in.** *What:* a single card on Party Modes that sets Cup ON, shows the seat plan, and starts. *Where:* Party Modes setup and the 📱 room. *How it behaves:* room code and QR stay on a corner strip of the setup and results screens. A big "x/6 joined" counter shows who is ready. Joined phones appear as named seat cards, and PLAY unlocks once everyone taps READY. Add a "fill empty seats with bots" toggle with a count. *Impact:* +0.6.
2. **Make the Party Cup scoring legible.** *What:* explain how points are awarded. Show the points table (1st +5, 2nd +3, 3rd +2, 4th +1; final ×2) on the setup screen and show a running scoreboard per game with a column per game (G1 G2 G3...) plus total. Also fix the Crumb Rush mismatch: "🍪 Crumb Monster: GOBZILLA (38 crumbs)" appears under a standings table where GOBZILLA was last (3 pts). Say it plainly: "Crumb Rush scores the crumbs you hold at the end; knockouts drop half." *Impact:* +0.5.
3. **Fix Party Cup / Mode controls conflict.** With 🏆 PARTY CUP ON, the "MODE ▶ TEAM FEAST" pill and "◀ TEAM FEAST ▶ · POWER-UPS ON" header still look active, and the Party Cup button remains a toggle. Disable or relabel (e.g. "MODE ▶ (Cup runs all 5)"). Also FIRST TO reads 3 but the Cup runs first to 2 (state `firstTo:2`). Show "Cup: first to 2 per game" or stop silently changing it. *Impact:* +0.4.
4. **Make Cup results about the humans.** With 1 human and 3 bots I came 4th and the trophy line is "Past champions: DUMPLORD on 19 Nov". A host wants to see PLAYER names, wins, a Cup record per profile and "Past champions" as people, not bots. Show bot champions in a different style, and give the human with the highest total a "Best human" tag. *Impact:* +0.4.
5. **Make the between-game screen unmissable and clickable.** Standings shows "Next: CRUMB RUSH · 1 / START to continue" with no on-screen button for the first ~3 s (the CONTINUE and MENU buttons appeared only later, e.g. `shot-14.png` has none; `shot-21.png` has them). For phone players "1 / START" means nothing. Show CONTINUE from frame 1, and add "Any player: tap READY". *Impact:* +0.3.
6. **Explain BOT LEVEL on Party Modes.** Free Play shows "🤖 TOUGH: good aim, shoves you near edges" under the seats; Party Modes does not. A host who clicks BOT LEVEL sees only EASY/NORMAL/TOUGH with no explanation. The level also persisted from Party to Free Play silently (I set TOUGH in Party and Free Play opened on TOUGH). Show the same one-liner and per-bot level. *Impact:* +0.3.
7. **Fix the text collision of FAST FORWARD over INSTANT REPLAY / mode banners** (`shot-12.png`, `shot-18.png`). *Impact:* +0.2.
8. **Win feedback and kaiju/table unlock moments in the Cup.** I went 12/20 to 13/20 kaiju during the Cup and never saw a "🎁 NEW KAIJU" toast, and I saw no 🏆 achievement toast after any of the 7 matches. If they fired, they were too quick to notice. Hold toasts 3 s and stack them on the results screen. *Impact:* +0.3.
9. **Bots should not run away with a Cup where humans are learning.** DUMPLORD won all 6 Cup games on Normal (game 3 NORIGON). Add a catch-up: Comeback Help already exists but Cup standings show I got +1/+2 pts every time. Offer a "Casual Cup" with Easy bots as a pill. *Impact:* +0.3.
10. **Add team-total scores to Team Feast results and winner-first ordering.** `shot-44.png` lists RED first though BLUE won, and does not show team totals (e.g. "BLUE 2 rounds · RED 0"). *Impact:* +0.2.
11. **Setup screen text size and join prompt.** "click or THROW to join" is tiny (about 13 px) on a TV-distance setup screen, and so is the footer help text. Make the seat prompts and footer larger and brighter. *Impact:* +0.2.
12. **Close Room should return to where you came from.** From Party Modes "📱 PHONES AS PADS" > Close Room dumped me on the title screen (I lost my seat setup). *Impact:* +0.2.
13. **Quit confirmation.** One click on QUIT in the pause menu left the match immediately (Daily match, Hot Dumpling round 1). A host with 5 friends will mis-tap. Ask "Quit? Tap again" like the Pantry. *Impact:* +0.2.

## 🔍 Every issue I saw (exhaustive)
One row per issue. Severity: **blocker / major / minor / polish**.

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Party Cup standings (Crumb Rush) | Bottom strip says "Crumb Monster: GOBZILLA (38 crumbs)" yet I finished 4th with 3 pts; points are for crumbs held at the end, and knockouts drop half. Looks like a scoring bug. | shot-17.png | Explain "crumbs held at the end"; show held and eaten counts per player |
| 2 | major | Party Cup standings | Points table (+5/+3/+2/+1) is not explained anywhere; there is no per-game history, so you can't tell why PIZZARAPTOR (0 round wins in game 1) got +2 | shot-14.png | Per-game column table + rules line |
| 3 | major | Party Modes setup with Cup ON | MODE ▶ pill and "◀ TEAM FEAST ▶" header stay active but are meaningless in a Cup; FIRST TO shows 3 but the Cup plays first to 2 | shot-30.png | Grey out / relabel; show "Cup: first to 2" |
| 4 | major | Cup winner screen | "Past champions: DUMPLORD on 19 Nov" lists a bot; "Party Cups won 0" in Records; no human/profile accountability for friends | shot-28.png | Cup history by player/seat names |
| 5 | major | Between-game standings | No on-screen CONTINUE button at first ("Next: CRUMB RUSH · 1 / START to continue"); buttons only appear on some screens/time | shot-14.png, shot-17.png vs shot-21.png | Always show CONTINUE; hide keyboard text on touch |
| 6 | minor | Round/instant-replay overlay | "⏩ FAST FORWARD ×3 · only bots left" sits on top of "⏪ INSTANT REPLAY" and, in Hot Dumpling, on top of "PIZZARAPTOR HAS THE HOT DUMPLING" — overlapping text | shot-12.png, shot-18.png | Move the fast-forward label below banners or stack them |
| 7 | minor | Hot Dumpling in-game | A mode-label pop-up "SUSHI ROLL!" overlaps the banner area and the top-left text region at the same time as the dumpling banner | shot-18.png | Cap simultaneous banners at 2 |
| 8 | minor | Phones as Pads (room) | Two different rooms: the party room has a large QR with "Everyone on the couch..." but the Online room has a small QR and a different blurb "Scan with a phone camera to join". Inconsistent, and the Online room's QR is half the size | shot-3.png, shot-34.png | Reuse the same big-QR layout |
| 9 | minor | Phones as Pads (room) | Panel text at the bottom ("Waiting for at least one friend to join...") sits 22 px from the screen edge and the room panel is flush with top and bottom (panel border touching top edge) | shot-3.png | Shrink panel or scroll |
| 10 | minor | Phones as Pads (room) | Room options (Mode, Party Cup, Bots...) are different from the Party Modes setup (First to 5 rounds vs 3; "BOTS FILL UP TO 4 PLAYERS") — values reset when you open the room | shot-3.png, shot-34.png | Inherit setup values into the room |
| 11 | minor | Room > Close Room | Returns to the title screen, not Party Modes; seat setup is lost | (title output after click) | Return to the screen you came from |
| 12 | minor | Room option "TV MODE: OFF (YOU PLAY TOO)" | Clicking it did nothing visible; no explanation of what TV mode is | shot-35.png | Explain in a sub-line: "Host screen only shows the table" |
| 13 | minor | Room > Party Cup: ON + Mode: CRUMB RUSH | Both selectable at once; explanation line still says "Eat the most crumbs..." | shot-35.png | Same fix as #3 |
| 14 | minor | Party Modes / Free Play | BOT LEVEL has no explanation in Party Modes (Free Play shows "🤖 TOUGH: good aim, shoves you near edges"); the level persisted from Party to Free Play without notice | shot-30.png, shot-48.png | Same line in Party, and per-bot labels |
| 15 | minor | Party Modes setup | Joining a seat is a click on a dim card; "click or THROW to join" is about 13 px, low contrast over the dark card | shot-5.png | Larger, brighter prompt; pulse the first empty seat |
| 16 | minor | Party Modes footer | Footer line "🏆 Party Cup = 6 games: CLASSIC → CRUMB → HOT → TEAM → GOLDEN → CLASSIC · final ×2 · switch it ON, then PLAY" is long and small and is clipped to ~560 px in the look text | shot-5.png | Larger, two lines |
| 17 | minor | Party Modes setup | The 11 pills each hold two-line labels at about 12 px ("CUP LENGTH 6 GAMES") — hard to read from a couch | shot-5.png | Larger font, group "Cup" pills |
| 18 | minor | House Rules | Saved slot reads "SLOT 1: PARTY · teams · first to 2 · tough bots" but does not mention Party Cup or twist; loading it did not obviously restore seats (I had "2 at the table" afterwards) | shot-31.png | List Cup state and seat count; confirm on load |
| 19 | minor | Team Feast results | Teams are grouped but the order is RED then BLUE even though BLUE won, and there are no team totals | shot-44.png | Winner first plus totals |
| 20 | minor | Team Feast (Cup) standings | Cup standings after a team game list individual points ("DUMPLORD 18 pts (+5), NORIGON 16 pts (+5)") but the headline says "TEAM BLUE WINS": my red teammate got +3, red got +3/+3 — unclear how team points map | shot-23.png | Show team column and rule |
| 21 | minor | Hot Dumpling | The tip under the countdown ("Hold THROW longer for a faster, farther throw...") is irrelevant for the mode; the Giant Hand banner "wants you (fullest belly)!" shown in Hot Dumpling too | shot-18.png, shot-19.png | Mode-specific tips; and hide the Hand message there if irrelevant |
| 22 | minor | In-match prompt | "BELLY FULL! PRESS E → KAIJU" shows the keyboard key (Move Lab shows "E / Y"); no touch/pad variant in this mode and it hugs the right edge | shot-46.png | Use the active device's label |
| 23 | minor | Results panel overlap | The big kaiju portrait on the right overlaps the standings panel's edge ("STANDINGS" has a pizza kaiju sprite under the heading; table/stat card are cluttered) | shot-17.png, shot-44.png | Dim the board behind results more; keep the portrait clear of the text |
| 24 | polish | Title | The "NEXT UP" box is cut off with "…" and truncated text ("Win a match → 🎨 Lime c") in the look text; box looks fine on screen | shot-1.png | Make sure all three goals show fully |
| 25 | polish | Records | "Matches won 0" after the Party Cup shows that a Cup win/podium counts for nothing; there is no Cup stat apart from "Party Cups won" | shot-42.png | Add "Cups played / podiums" |
| 26 | polish | Gallery | The Mastery "Rewards" ladder is a row of tiny icons ("✔✨ 🔒⭐ 🔒🪙 🔒🍽 🔒👑 🔒✨") with no labels, so you can't tell what each step gives | shot-45.png | Label each reward with level and name |
| 27 | polish | Gallery | "Collection 47% 🐉 13/20 · 🍽 13/18 · 🎨 2/21" at the top-right is tiny and the emoji meanings are not explained | shot-45.png | Larger, with words |
| 28 | polish | Cup standings | Ties are shown with the same score but different rank ("3. GOBZILLA 2 pts / 4. PIZZARAPTOR 2 pts"), and no tie-break line | shot-14.png | Say "tie broken by KOs" |
| 29 | polish | Daily countdown | "DAILY · 3 rivals (normal, easy, easy)" names the levels but not which rival has which | shot-36.png | "SALMONSTER (normal)..." |
| 30 | polish | Pause menu | QUIT leaves instantly with no confirmation | shot-37.png | Two-tap confirm |
| 31 | polish | Cup result card | "🏆 DUMPLORD WINS THE PARTY CUP!" gives my own placing only in the standings; no "You came 4th" line | shot-28.png | Add one line for the local player(s) |
| 32 | polish | Move Lab | Escape returned directly to the Gallery with no pause menu, which differs from other modes | shot-47.png | Fine, but note it for consistency |
| 33 | polish | Seat reset | Re-entering Party Modes after a Cup resets the seats (4 players became 2) but keeps FIRST TO 2 and Team Feast selected | shot-29.png | Keep the whole setup (or clearly reset it) |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- **Title** (`shot-1.png`): OK. NEXT UP box fits; six menu buttons align; nothing overlaps the characters badly.
- **Party Modes setup, all 5 modes** (`shot-2.png`, `shot-5/6/7/8.png`, `shot-30.png`): OK, with small text (seat prompt, footer and pill labels are small). No overlap.
- **Party Modes with 4 seats** (`shot-10.png`): OK.
- **HOUSE RULES** (`shot-31.png`): OK.
- **KEYS overlay** (`shot-32.png`): OK, but it hides all setup pills while open (by design).
- **Phones as Pads room** (`shot-3.png`): OK but the panel touches the top and bottom of the screen and the last line is only ~20 px from the edge.
- **Online menu** (`shot-33.png`): OK.
- **Online host room** (`shot-34.png`, `shot-35.png`): OK; smaller QR than the party room.
- **Match countdown with banners** (`shot-15.png`, `shot-22.png`, `shot-36.png`): OK; the tip lines overlap table art but stay readable.
- **In-match, Instant Replay + Fast Forward** (`shot-12.png`): PROBLEM. "⏩ FAST FORWARD ×3 · only bots left" overlaps "⏪ INSTANT REPLAY" so both are partly unreadable.
- **In-match, Hot Dumpling banner** (`shot-18.png`): PROBLEM. FAST FORWARD text overlaps "PIZZARAPTOR HAS THE HOT DUMPLING", and the "SUSHI ROLL!" tag crowds the same area.
- **In-match, Giant Hand warning** (`shot-19.png`): OK; the red arrow strip crosses the table but the text stays readable.
- **Golden Spoon in-match** (`shot-24.png`): OK. The HUD row is a few pixels higher than in other modes (names at y=19 vs 21), not an issue.
- **Round-end banner** (`shot-13.png`): OK.
- **Game standings (Cup)** (`shot-14.png`, `shot-17.png`, `shot-21.png`, `shot-23.png`, `shot-25.png`): minor PROBLEM. The kaiju portrait and bottom-left card crowd the table, and `shot-17.png` has a kaiju sprite behind the "STANDINGS" heading. All text is readable.
- **Cup winner screen** (`shot-28.png`): OK; the "THIS MATCH" card runs to the bottom-left corner and the SHARE button is flush to it.
- **Team Feast results** (`shot-44.png`): OK; the portrait overlaps the board edge only.
- **Pause menu** (`shot-37.png`): OK.
- **Pantry** (`shot-39.png`): OK.
- **Records** (`shot-42.png`): OK.
- **Gallery** (`shot-45.png`): OK, but the Rewards icon row and the collection header are very small.
- **Move Lab** (`shot-46.png`): OK; the "BELLY FULL!" label is close to the right edge.
- **Settings** (`shot-49.png`): OK.
- **Free Play setup** (`shot-48.png`, not opened in an image): text list looked fine.

## The single biggest structural problem
There is no real "host" path. Running game night means: pick Party Modes, flip the Cup switch, click each seat, set bots, choose first-to, press PLAY, and only then (separately) open "📱 PHONES AS PADS", whose room is a second, different setup screen that loses the first one. The Cup itself is solid, but nothing tells friends how scoring works, which of them are winning, or what the next game will need. For a host, the missing system is a **lobby that persists across the whole evening**: who is here, which phones are joined, the Cup scoreboard across games, and the next game's name and rules, in one place.

On top of that, the points rules are hidden, so results feel arbitrary: "Crumb Monster: GOBZILLA (38 crumbs)" next to 4th place is a good example.

## Big change proposals (2–3, most important first)
### Proposal 1: Game Night Lobby (one room, whole evening)
- **Problem it solves:** the setup, the phone room and the Cup are three separate flows, and a host loses setup on Close Room (issues 8–11, 33).
- **How it would work (detailed design):**
  1. Party Modes gets a top button "🎉 START GAME NIGHT". Pressing it opens ONE screen: left half is the room code + big QR (as in `shot-3.png`), right half is the 6 seat cards.
  2. Joined phones appear as named seat cards ("Mia's phone") with a READY check. Host can tap an empty seat for a bot and set per-bot level (with the explanation line).
  3. A rules strip under the seats shows Cup ON, number of games, "first to 2", and the points table (+5/+3/+2/+1, final ×2).
  4. PLAY unlocks when every human seat is READY (host can override with a long-press).
  5. Between games, the standings screen keeps the room code in a corner strip and shows "READY 3/4" for the next game. The host can auto-advance after 10 s.
  6. After the Cup, "NEW CUP" keeps the same seats and rotates who is Player 1.
- **Example moment:** four friends scan the QR, pick kaiju on their phones, tap READY; the TV shows "READY 4/4 — Game 1: CLASSIC".
- **Rewards / progression hooks:** a Cup history per seat name (wins, podiums), and a "Game Night streak" badge for 3 Cups in one session.
- **Risks and edge cases:** a phone drops mid-Cup (replace it with a bot and rejoin on the same seat); a host closes the room by mistake (confirm).
- **Size:** L
- **Score impact for me:** +0.9

### Proposal 2: Cup Scoreboard that explains itself
- **Problem it solves:** issues 1, 2, 4, 20, 28 — hidden points, an unclear Crumb Rush result, bots taking the trophy with no context.
- **How it would work (detailed design):** after each game show a table with one row per player and columns G1–G6 and TOTAL. Each cell shows the points and a tiny reason icon (🥇 win, 🍪 crumbs, 🥟 survived, ⚔ KOs). A rules line under the table reads "Crumb Rush: crumbs held at the end". The final shows "Final ×2" in the header. Add a "Best human" tag and a "Comeback pick": the lowest-ranked human gets a small advantage (fuller belly) in the next game, labelled on the next countdown. The Cup winner screen shows each human's placing ("You came 4th").
- **Example moment:** after Crumb Rush the row for GOBZILLA reads "5 held (38 eaten, 33 dropped)", and the rule line explains why.
- **Rewards / progression hooks:** Cup history keyed to the player name; "Cup podium" and "Cup comeback" achievements with 30 🪙.
- **Risks and edge cases:** screen space with 6 players (use two columns of three); long names (truncate).
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: Casual Cup (a gentler party format)
- **Problem it solves:** with Normal bots, a mostly-human table can't win a Cup (DUMPLORD took all 6 games and the title), and a first-timer friend feels bad (issues 9, 28).
- **How it would work (detailed design):** add a "CUP STYLE" pill with CASUAL (bots Easy, first to 1, 4 games, no hazards in the final), STANDARD (current) and TOUGH. Show the explanation line under the pill. In Casual, bots never fill empty seats beyond the human count + 1. Time per game is capped (about 90 s) so the whole Cup takes ~10 minutes.
- **Example moment:** a six-friend game night ends in 12 minutes with a clear winner and a short results card.
- **Rewards / progression hooks:** a "Casual Cup" win pays half tokens, so people still pick STANDARD for tokens.
- **Risks and edge cases:** token farming by casual play (cap payout per day).
- **Size:** S
- **Score impact for me:** +0.4

## How this round's new features felt
- **📱 Phones as Pads:** the best new feature for me. The QR and big room code are clear and "Everyone on the couch: scan with your phone camera, your phone becomes your controller" explains it in one sentence. I could not test a real phone, so I can't judge latency or controls. Problems: the room opens a second setup that ignores my Party Modes settings, "Close Room" drops me on the title, and "TV MODE: OFF (YOU PLAY TOO)" is unexplained. Matches in the room had no "who joined" counter I could see (only "Waiting for at least one friend to join...").
- **🏆 Party Cup switch (ON/OFF):** the switch is easy to find and the footer explains the order of games. Playing it is fun and paced well, with a "final ×2" for drama. However, the mode pill conflict, first-to-2 override, hidden scoring and bot-heavy results hurt (see the issues table).
- **Fairness: 1.4 s bot grace, "how you went out" banner:** the banner is great ("You went out at 4s: falling off (NORIGON)"). I could not feel the grace period directly at the start of rounds; I was KO'd by a cleaver at about 4 s in round 1 of the Cup.
- **Free Play bot-level explanation:** useful ("TOUGH: good aim, shoves you near edges") but missing in Party Modes. The Daily countdown naming "(normal, easy, easy)" is good but doesn't say which rival is which.
- **Giant Hand / DASH hint:** "THE GIANT HAND WANTS YOU (fullest belly)! STOMP, or DASH as it arrives!" is clear and a nice warning, with a red arrow strip as the telegraph. In Hot Dumpling it felt a bit crowded with other banners.
- **Feedback (toasts):** I never noticed a 🏆 achievement or 🎁 NEW KAIJU toast after 7 matches, even though my kaiju count rose from 12/20 to 13/20 and the Records show 0/37 achievements (so possibly none fired). If toasts exist, they were not visible in my screenshots after matches. Pantry: orders show payout (40 🪙), the second-tap buy prompt works ("Toffee colour? tap again to buy for 40 🪙") and unaffordable items say "(not enough yet)".
- **Gallery power info:** "reach 207 · every 1.6 s" is good. The Mastery ladder is icon-only and tiny. I can't tell what each reward is.
- **Team Feast results grouped by team:** works, but order and totals are lacking (`shot-44.png`).
- **Quit confirmation reset:** QUIT from pause left at once, so I could not see a confirmation at all.
- **New-save lock:** after 6 matches I'd unlocked 1 kaiju. The "4 locked kaiju" start is not very visible on Party Modes: "12/20 kaiju (play & Story unlock more)" is tiny.

## Bugs that block play
- None blocking. `/errors` returned "none" at start, middle and end.
- Non-blocking but serious for a host: Close Room (Phones as Pads) returns to the title and drops the setup; the Crumb Rush "Crumb Monster" stat contradicts the standings.
