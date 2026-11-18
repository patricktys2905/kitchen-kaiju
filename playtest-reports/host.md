# Playtest evaluation — The Party Host

**Fun score: 7.0 / 10** (the Party Cup is a genuine game-night centrepiece and the modes are readable and varied, but the Cup has no quit/resume safety, the cross-game flow is long and opaque, and the screens between games sit on top of live action and hide key rules/scoring)

> Screenshots live in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r7-7106\` (shot-N.png). Referred to below as `shot-N`.

## What I did
- About 100 harness commands, one session (~1 full Party Cup of 6 games + extras). Profile id `host`, port 7106.
- Title (shot-1) → PARTY MODES setup (shot-2, shot-3) with 6 seats of Team Feast → clicked 🏆 PARTY CUP, which launched immediately.
- **Played one full 6-game Party Cup with /act (no autoplay):** G1 Classic (Dinner for Four), G2 Crumb Rush, G3 Hot Dumpling (5 rounds), G4 Team Feast, G5 Golden Spoon, G6 Final Classic (9 rounds, first to 3). I looked at every between-game screen (shot-6, 8, 12, 15, 16) and the Cup final (shot-21). Result: PIZZARAPTOR won the Cup, I (GOBZILLA) finished 5th with 11 pts.
- NEW CUP button, Pause menu mid-Cup (shot-23), QUIT mid-Cup back to setup.
- Setup extras: CUP LENGTH (6 → 3 games), MODE cycling through all five modes (subtitles checked), remove-bot key (N) down to 2 players to test Team Feast imbalance messages, 🎲 RANDOM present, ⌨ KEYS overlay (shot-27), 💾 HOUSE RULES (shot-25, 26) with a save to Slot 1, cycled the TWIST button through all 18 states (singles + 8 ⚡⚡ doubles) to see the order.
- Online lobby: Host a Game (room code + QR, shot-30), toggled Party Cup ON and TV mode ON (shot-31), Close Room.
- Daily Challenge (Hot Dumpling) played to completion with /act, shot-35 results.
- Challenges card (shot-36), Records pages 1 and 2 (shot-37, 38), Settings (shot-39), Free Play setup (shot-41).
- Played a Golden Spoon match with Player Numbers + Name Tags turned on, plus TURBO twist (shot-40).
- /errors checked at start, middle, end: **none** all session.
- Matches played: 7 (Cup = 6 games + 1 Daily, + 1 extra Golden Spoon). Won: 2 (Team Feast in the Cup, Daily).

## What worked for me
- **The Party Cup concept is exactly what game night needs.** Six different games, running standings after each, "GAME 2/6: PIZZARAPTOR WINS!" banners with a coloured headline per game, and a trophy finale. The final being worth ×2 (+10 for the winner) gave a real comeback moment: AVOCADRAKE led the whole Cup until the Final.
- Between-game card tells you **what is next** ("Next: CRUMB RUSH · 1 / START to continue") and the in-match intro always shows "PARTY CUP · GAME 3/6 · HOT DUMPLING · Ice Cream Parlour" plus a one-line tip. Excellent orientation.
- Team Feast in the Cup keeps teams visible: HUD underlines "RED/BLUE · Spoon" and the tip "In Team Feast your cutlery passes straight through teammates."
- Setup screen is clear: coloured team pills, "RED 2 vs BLUE 1 (add a player or bot to even it up)" warning, "3 at the table · click empty seats to add bots · press ▶ PLAY" helper text, and every pill reads like a setting. Mode subtitle text is great ("Pass the steaming dumpling before it pops").
- HOUSE RULES (3 slots + code copy/paste) is a real host feature; KEYS overlay lists keyboard, gamepad and *hotkeys for every setup option* (G mode, C party cup, 2 bot level...). Great for a host with a keyboard.
- Online lobby has a giant room code, a QR code, TV mode ("You just watch" for a host on a big screen), bot fill. This is the right design for a party host.
- The fast-forward "only bots left" and instant replay keep a 6-player knockout round from dragging when you are out.
- Records/receipts: tokens, mastery XP, achievements named in the receipt feel good.
- No JavaScript errors anywhere.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make PARTY CUP a proper setup step with a confirmation + rules card, not a one-click launcher.**
   - **Where:** Party Modes setup, the `🏆 PARTY CUP` pill (199,512).
   - **How it should behave:** The pill is currently an *action*, not a setting: clicking it instantly starts game 1 (I never pressed PLAY, with Team Feast still selected as the "mode"). It should toggle `CUP: ON/OFF` like every other pill, grey out/ignore MODE and FIRST TO while ON (replace with "CUP: 6 GAMES ▸ show list"), and only start on ▶ PLAY. Add a one-line "who is playing" + the 6-game list with icons. A 4-second "THE PARTY CUP: 6 games · points 5/3/2/1 · FINAL ×2 · best total wins" card before game 1.
   - **Score impact:** +0.5
2. **Quit/Restart protection and resumable Cup.**
   - **Where:** Pause menu (shot-23) and the Cup flow.
   - **How:** QUIT from the pause menu mid-Cup dumped me straight back to setup with *zero confirmation and the whole standings lost* (I was on game 1 of a new Cup, but the same would apply to game 5). Add "QUIT THE CUP? Standings are lost." Yes/No, plus a "RESUME CUP (game 3/6)" button on the setup screen for 1 hour/session. A host who bumps Esc during game 5 would ruin the night.
   - **Score impact:** +0.5
3. **Between-game card must not sit on the live game; make it a clean scoreboard.**
   - **Where:** "GAME n/6: X WINS!" screens (shot-6, 8, 12, 15, 16).
   - **How:** The standings text is drawn straight over the replay table with a loud tiled/checked background (picnic gingham, red table), plus a giant kaiju sprite on the right, so the white outlined text competes with busy art. Put the standings on a dark panel (80% opaque) in the middle, with the six kaiju's portraits and a points bar, the "(+5)" deltas in a clearly separate column, and "Next: CRUMB RUSH" in a button-like strip. Stop the background action while the card shows or dim it by 60%.
   - **Score impact:** +0.4
4. **Make the Cup shorter or tunable at the *game* level, and be consistent about first-to.**
   - **Where:** Cup flow. Game 1/5/others are first-to-2 but the Final is first-to-3 (9 rounds with 6 players ran long; the Hot Dumpling game alone was 5 rounds). A whole Cup took ~45 harness calls of play.
   - **How:** Give the Cup a **target time** option: "QUICK (~12 min): 4 games, first-to-1 · STANDARD (~25 min): 6 games · EPIC". Show the estimate on the setup pill. Make the Final "first to 2" by default (still ×2 points) and cap the Hot Dumpling game at 3 rounds. Announce the round target in the game intro ("FIRST TO 2").
   - **Score impact:** +0.4
5. **Cup scoring needs to be understandable at a glance.**
   - **Where:** Standings lines (shot-8, 12, 15, 16, 21).
   - **How:** Team Feast gave +5 to *every* red player and +3 to blue ones (shot-15) — not explained and not the "5/3/2/1 per placement" the setup says. Ties are ordered arbitrarily (AVOCADRAKE 13 vs SLOBA 13 vs PIZZARAPTOR 13 in shot-15; two 10s in shot-12) with no tiebreak label. "1 pts" / "0 pt" grammar. Show a mini legend ("Game win +5 · 2nd +3 · 3rd +2 · rest +1"), state the tiebreak ("tie → more game wins"), and fix plural.
   - **Score impact:** +0.3
6. **Turn on Player Numbers + Name Tags by default in 3+ human/Party games (or when 5+ kaiju are on the table).**
   - **Where:** Settings (both OFF by default, shot-39); in a 6-kaiju match (shot-4) nothing marks which one is "me", and the top HUD says GOBZILLA while the setup said "GOBZILLA JR.". With P1–P6 badges and names (shot-40) the table is instantly readable, which a host with a room full of people absolutely needs.
   - **How:** Auto-enable for Party/Cup, or ask once on first Party entry.
   - **Score impact:** +0.3
7. **Explain each mode's rules on its intro, not just a cutlery tip.**
   - **Where:** Pre-game countdown overlay. Hot Dumpling's intro (shot-9) says "Spoons and Pizza Cutters bounce off walls: aim at the edges." — nothing about passing the dumpling. In Crumb Rush the countdown tip was a cutlery tip too. A friend who has never played would not know the goal.
   - **How:** Each mode gets a 2-line rule card, first time per session: "HOT DUMPLING: Don't be holding it when it pops. Touch a rival to pass it." The tip line stays.
   - **Score impact:** +0.3
8. **Records & Cup Shelf integration.**
   - **Where:** Records (shot-37, 38) and the Cup final (shot-21).
   - **How:** The final says "Cup Shelf: PIZZARAPTOR (19/11)" — what do 19 and 11 mean? (wins/…?) Unexplained. Records has no Party Cup stats at all (cups played, cups won, best cup score), and "Cup Champion" is just a 30-token achievement. Add a Cup Shelf page: kaiju portraits with trophy counts, plus "your cups: played / won", and a plain label "19 cups won / 11 ...".
   - **Score impact:** +0.2
9. **Fix naming consistency (GOBZILLA JR. vs GOBZILLA).**
   - **Where:** setup/seat cards say "GOBZILLA JR.", in-game HUD, standings, banners say "GOBZILLA". Pick one.
   - **Score impact:** +0.1
10. **Hide or merge the stacked "FAST FORWARD ×3" and "⏪ INSTANT REPLAY" banners.**
    - **Where:** top-centre of the match (shot-18): the two banners sit 8px apart and say opposite things at once (fast forward + replay).
    - **Score impact:** +0.1
11. **Online lobby: show the Cup list and the host's player count; fix wording.**
    - **Where:** Online "Your Room" (shot-30, 31): turning Party Cup ON leaves "FIRST TO 5 ROUNDS" and a still-live "Mode: TEAM FEAST" pill that no longer means anything; "YOU (HOST) (YOU)" says "you" twice; "Up to 5 friends" while the title says up to 6; no "copy code / share link" button, only a QR; no list of connected friends until someone joins. Add COPY CODE + COPY LINK, a roster with ping dots, and make the mode/first-to pills read "CUP: ..." when the Cup is on.
    - **Score impact:** +0.3
12. **Mid-Cup standings visible without finishing a game.**
    - **Where:** In-match HUD and pause. Add a compact CUP TABLE on the pause menu (shot-23 shows only Resume/Restart/Music/Sound/Quit) so players can check who needs what for the Final.
    - **Score impact:** +0.2

(Doing 1–5 plus 6 and 7 is, for me, the 9. The rest are polish on top.)

## 🔍 Every issue I saw (exhaustive)
Severity: **blocker / major / minor / polish**.

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Party Modes setup | The `🏆 PARTY CUP` pill is an action, not a toggle: one click starts Cup game 1 immediately (with Team Feast listed as the mode and the room not yet confirmed). Every other pill on that row is a setting; this one launches. | shot-2/3, shot-4 | Make it `CUP: ON/OFF` toggle; start only with ▶ PLAY. |
| 2 | major | Pause menu in Cup | QUIT goes straight to the setup, Cup standings gone forever, no confirmation, no resume. A single stray Esc+click ends game night. | shot-23, shot-24 | Confirm dialog + "RESUME CUP" on the setup screen. |
| 3 | major | Between-game card | The standings sit on top of live gameplay art with a busy gingham/red/checker background; letters have only a thin outline; small kaiju/cutlery props cross the text lines (e.g. dumpling and pizza cutter behind "SLOBA 3 pts" in shot-8). Harder to read than it should be for a room across a couch. | shot-6, 8, 12, 15, 16 | Dark panel, portraits, bigger rows, dim the background. |
| 4 | major | Cup scoring | Points do not follow the "5/3/2/1" the setup promises: Team Feast gave Red players +5 each and Blue players +3, ties between kaiju (13/13/13, 10/10) have no tiebreak shown, and the delta in brackets sometimes does not match placement (shot-8: PIZZARAPTOR +5 as game winner is listed 2nd overall, fine, but SLOBA "+1" 4th and SALMONSTER "+3" 5th with equal 3 pts look inverted). | shot-8, 12, 15 | Show legend, tiebreak and sort order rule. |
| 5 | major | Cup length | Final game is "first to 3" (9 rounds, ~7 harness calls of pure play at 6 players) while earlier games are first-to-2; the stated "First to 3 rounds" on the setup became "First to 2" silently after Cup start. Hot Dumpling ran 5 rounds. A full 6-game cup is too long for a casual night with no time estimate. | shot-20, shot-24 | Length presets with minutes; Final first-to-2. |
| 6 | major | Settings defaults | PLAYER NUMBERS and NAME TAGS are OFF by default; in a 6-kaiju brawl you can't tell which kaiju is you or who is on which team (teams only show as thin underlines in the HUD). With them ON (shot-40) the table is perfectly readable. | shot-4, shot-39, shot-40 | Default ON for Party/Cup/6 kaiju, or prompt once. |
| 7 | minor | Mode intro | Hot Dumpling countdown tip doesn't mention the dumpling: "Spoons and Pizza Cutters bounce off walls: aim at the edges." Crumb Rush intro the same. New friends won't know the rules. | shot-9 | Per-mode rule card on first play. |
| 8 | minor | Naming | Seat card says "GOBZILLA JR." everywhere on setup; match HUD, standings and receipts say "GOBZILLA". | shot-3 vs shot-4/6 | Pick one name. |
| 9 | minor | Cup final | "Cup Shelf: PIZZARAPTOR (19/11)" — no explanation of 19/11. | shot-21 | Label "(19 cups won of 11 ...)" or use icons; link to a Cup Shelf screen. |
| 10 | minor | Records | No Party Cup stats (cups played/won), Cup Shelf is not visible on the Records pages; "Cup Champion — Win a Party Cup" is the only link. | shot-37, 38 | Add Cup section. |
| 11 | minor | Standings text | Grammar: "DUMPLORD 1 pts (+1)", "6. SALMONSTER 3 pt"; the first entry has trophy 🏆 icon but 4th+ use "4." and different indentation, so rows do not align. | shot-8, 12 | Plural helper, align rows. |
| 12 | minor | Match banners | "⏩ FAST FORWARD ×3 · only bots left" and "⏪ INSTANT REPLAY" are stacked ~8px apart at the top centre, saying opposite things at once. | shot-18 | Show one at a time. |
| 13 | minor | Online lobby | "YOU (HOST) (YOU)" duplicates "(you)"; "Up to 5 friends" but only 4 bots/6 total unclear; no COPY CODE / COPY LINK button (just a QR); Party Cup ON leaves "FIRST TO 5 ROUNDS" + "Mode: TEAM FEAST" on-screen even though the Cup overrides them. | shot-30, 31 | Copy buttons, clean text, cup-aware pills. |
| 14 | minor | Online lobby layout | The room panel fills the whole height with ~14px margins at top and bottom; if a few friends join (roster rows) it must scroll or overflow. | shot-30 | Test with 5 friends; allow scroll. |
| 15 | minor | Team Feast with Cup | Team Feast inside a 6-player Cup: individual standings use team results (+5 to all of Red), so a bad player is rewarded for their team; not stated anywhere. | shot-15 | Explain or use team points. |
| 16 | minor | Party Modes setup | The RED/BLUE team pills overlap the top of every kaiju sprite (ears, bat wings, sloth pole) once a kaiju is picked. | shot-3, 27 | Move sprite 14px down or the pill up. |
| 17 | minor | TWIST button | One-direction only: cycling to a given ⚡⚡ combo from NONE takes up to 19 clicks (8 singles, 8 doubles, NONE); no back, no list, no way to see what a combo does. For a host choosing a twist for the group this is slow. | (clicks only) | Right-click / hold for back, or a picker grid with descriptions. |
| 18 | minor | HOUSE RULES slot | Saved slot reads "SLOT 1: PARTY · TEAMS · FIRST TO 2 · NORMAL BOTS" — doesn't include the Party Cup on/off, cup length, twist, seats/kaiju. | shot-26 | Include cup + twist + player count in the label. |
| 19 | minor | /look readability | The Online lobby, House Rules and Keys overlays return no text in /look (empty `texts`, shot-29/30) — they are DOM overlays, so screen readers and text-extraction see nothing. | shot-29 | Expose DOM text/ARIA. |
| 20 | minor | Daily result | Small kaiju sprite sits on top of the "Today: won ✓ · best 3 rounds..." line's left edge (calendar icon + salmon fish overlapping at ~x=380,y=260). | shot-35 | Move the sprite or the text. |
| 21 | minor | Daily replay | After winning the daily the button reads "↻ REMATCH" and the daily tile on the title is "Done today ✔" but there is no explanation of what REMATCH is (a free play rematch?). | shot-35 | Label "PRACTICE AGAIN (no daily credit)". |
| 22 | minor | Receipt box | THIS MATCH box overlaps the table's bottom-left corner and the achievement lines wrap mid-phrase ("Bubblegum / colour!"); box hugs the CONTINUE button (≈25px gap). | shot-15, 21 | Slightly narrower receipt, line-break on separators. |
| 23 | polish | Title | "PARTY MODES" button subtitle "Teams · Rush · Dumpling" wraps to three lines ("Teams · Rush · / Dumpling") and is tighter than neighbours. | shot-1 | Shorten to "Teams · Rush · Cup". |
| 24 | polish | Title | The 🍽 FIRST SERVICE "NEXT UP" block is tiny, centred over artwork with the fork/spoon behind it, 12px text. | shot-1 | Panel behind it. |
| 25 | polish | Title | `Finish the 1-minute Practice (+20 🪙)` is still the first suggestion after playing 7 matches including 1 Daily and 6 Cup games. | (look text) | Mark Practice optional once a match is played. |
| 26 | polish | "STOMP READY" popups | In multi-kaiju brawls popups ("STOMP READY! KAIJU! STEAM BURST!") stack in the middle of the table near the dumpling and overlap game objects. | (look text, shot-18) | Offset per player. |
| 27 | polish | "GOT IT!" popup | Next to the CHOCOMUNCH name tag with the spoon icon; the two labels touch. | shot-40 | Offset the popup. |
| 28 | polish | Cup final | Title wraps to two lines "PIZZARAPTOR / WINS THE PARTY CUP!" with the second line touching the standings (≈20px). Tight but fits. | shot-21 | Reduce font 10%. |
| 29 | polish | Pause menu in Cup | Pause screen doesn't show "Cup game n/6" or the Cup standings. | shot-23 | Add header. |
| 30 | polish | Crumb Rush | "Crumb Monster: GOBZILLA (52 crumbs)" in the stats strip while PIZZARAPTOR won the game — fine, but the card doesn't say that crumbs *reset when you are knocked out*. | shot-8 | One-line rule. |
| 31 | polish | Records | "Next rank: Sous Chef at 24 pts (15)" is cryptic (15 what?). | shot-37 | "Sous Chef at 24 pts (you have 15)". |
| 32 | polish | Records stats | "Times gone KAIJU 0" after 7 matches while I only used the attack cmd; stat is correct but achievement "Size Matters" (0/10) for a party host never nudges the player to stomp. | shot-37 | Tip in the match HUD when belly full ("BELLY FULL! PRESS E → KAIJU" shows but disappears quickly). |

## 🔠 Text and layout check
Checked screens (screenshots opened and viewed):
- **Title** — OK except "Teams · Rush · Dumpling" wrapping to 3 lines (issue 23) and the small First Service block over art (24). shot-1
- **Party Modes setup (empty)** — OK; no overlaps; text all readable; buttons in one row not stacked. shot-2
- **Party Modes setup (full, Team Feast)** — Team pills overlap the kaiju sprite tops (16); otherwise OK. shot-3
- **Intro countdown (Classic, Hot Dumpling, Team Feast, Golden Spoon)** — countdown number, "PARTY CUP · GAME n/6 · MODE · table" and tip all centred and readable, though the tip lines sit over table props (cup/plate) with outlines only. shot-4, 9, 13, 16
- **In-match HUD (6 players)** — names and cutlery icons fit; stars readable; `GOBZILLA` is red-on-dark and hard to read when dimmed/knocked-out (greyed). OK. shot-6, 7, 40
- **Game over / between-game card (Classic, Crumb Rush, Hot Dumpling, Team Feast, Golden Spoon)** — standings text overlaps game art and is visually cluttered (issue 3); the title text fits; receipt box tight to table edge and CONTINUE button (22). shot-6, 8, 12, 15
- **Party Cup final** — fits; title wraps to 2 lines and sits close to the first standings row (28). shot-21
- **Pause menu** — OK, five full-width stacked buttons, nothing overlaps. shot-23
- **HOUSE RULES modal** — OK; slots and buttons align. shot-25, 26
- **KEYS overlay** — OK; the CLOSE KEYS button covers the bottom-left corner of the "N add / remove bot" row slightly but no text hidden. shot-27
- **Online (intro dialog)** — OK. shot-29
- **Online (Your Room)** — fits; tight top/bottom margins (14); "(you)" duplication (13). shot-30, 31
- **Match HUD with Player Numbers/Name Tags ON** — OK, though "GOT IT!" touches the name tag (27). shot-40
- **Instant replay / fast-forward** — two banners crowd each other at the top (12). shot-18
- **Daily result** — kaiju sprite overlaps the "Today: won" line (20). shot-35
- **Challenges card** — OK; buttons evenly spaced. shot-36
- **Records p1 and p2** — OK; text fits within boxes; progress bars and counters aligned. shot-37, 38
- **Settings** — OK; all 11 toggles and descriptions fit; no overlap. shot-39
- **Free Play setup** — OK; eight pills fit in one row. shot-41

No text ran off screen edges that I could see at 1280×720 and no two buttons stacked.

## The single biggest structural problem
**The Party Cup flow is not safe or predictable enough to run a night around.** It starts from a pill that acts as a launch button, it uses its own rules (first-to-2 / first-to-3, team points handed out per team, unlabelled ties), it can be thrown away with one mis-click (Pause → QUIT, no resume), and the screens between games carry the standings on top of live art. The Cup is the one feature that makes this a "game night" product, yet the host gets no estimate of how long it takes (~45 minutes for me), no way to see the Cup table during play, and no recovery if someone leaves.

A secondary structural gap is **identity in 6-kaiju brawls**: nothing tells a group of friends which kaiju is whose (Player Numbers / Name Tags default OFF), and team membership is only a thin underline in the HUD. The online lobby has the right bones (code, QR, TV mode) but mixes in Cup-incompatible pills.

## Big change proposals (2–3, most important first)
### Proposal 1: Cup Night — a resumable, time-boxed Party Cup
- **Problem it solves:** Issues 1, 2, 4, 5, 9, 12. The Cup is long, unexplained, fragile and visually unclear.
- **How it would work (detailed design):**
  1. **Setup:** the pill becomes `CUP: OFF / QUICK / STANDARD / EPIC`. QUICK = 4 games (Classic, Crumb Rush, Hot Dumpling, Final) ~12 min; STANDARD = the current 6 games ~25 min; EPIC = 8 with two Final rounds. The estimate is printed on the pill ("~25 min"). While ON, MODE and FIRST TO collapse into "CUP RULES ▸" (opens the card). PLAY starts it.
  2. **Rules card (4 s, skippable):** list of the games with icons, "5/3/2/1 per game · FINAL ×2 · ties broken by most game wins".
  3. **Per game:** first-to-2 (Hot Dumpling first-to-2 with a max of 3 rounds), Final first-to-2 with ×2 points. A thin Cup bar in the HUD corner: "CUP 3/6 · you 8 pts (4th)".
  4. **Between games:** dark panel scoreboard, six rows with portrait, pts bar and animated "+5". The game's mode title stays on top. The background is frozen, blurred and dimmed.
  5. **Pause menu:** shows the Cup table; QUIT asks "End the Cup?" with "SAVE & EXIT" (resume later) or "END CUP".
  6. **Setup screen:** a banner "RESUME CUP — game 4/6 · 3 players" for 24 h.
  7. **Cup final:** keep the current trophy screen; show the 19/11 as "Cups won / Cups played", add a Cup Shelf screen in Records with portraits.
- **Example moment:** The host's friend leans on Esc → QUIT during game 5; the game asks "End the Cup?", they say no, the Cup continues. In the final the bar reads "FINAL ×2 · AVOCADRAKE 21, PIZZARAPTOR 15", and the scoreboard shows who can still catch up.
- **Rewards / progression hooks:** Cup stats in Records (played/won/best score), "Cup Champion" achievement pays tokens, Cup Shelf trophies with the kaiju's silhouette, +tokens for finishing a Cup you did not win.
- **Risks and edge cases:** Online mode (state sync, host disconnect), save format, a player leaving mid-Cup (bot takes over), odd team counts in Team Feast.
- **Size:** L
- **Score impact for me:** +1.2

### Proposal 2: Table identity pack (who is who at a glance)
- **Problem it solves:** Issues 6, 8, 15, 26, 27 — in 4–6 kaiju matches nothing says who is who or which team.
- **How it would work (detailed design):**
  - In Party/Cup/Online, force-on Player Numbers + Name Tags (P1…P6 under each kaiju with the seat colour) and a coloured team ring/hat on every Red/Blue kaiju; show the same colours in the HUD strip (already has the underline).
  - Per-seat colour chosen on the setup card (the setup already has a colour per kaiju), and a seat shows its controls ("WASD" / "Gamepad 2") so that a group knows who is playing where.
  - "Which one am I?" pulse: for 1.2 s at the round start the human-controlled kaiju gets an arrow and a "P1" bounce.
  - Use one consistent name (Gobzilla) everywhere.
- **Example moment:** Six friends on a couch: when the countdown shows "3", each friend's arrow bounces over their kaiju with their name; no one asks "which one's mine?".
- **Rewards / progression hooks:** cosmetic hats per Chef Rank, shown on the arrow.
- **Risks and edge cases:** clutter on small phones, colour-blind players (shapes/hats as well as colours).
- **Size:** S–M
- **Score impact for me:** +0.5

### Proposal 3: Online Party Cup lobby as a host console
- **Problem it solves:** Issues 13, 14, 19 — the online room lacks copy-link, roster, and cup-aware settings.
- **How it would work (detailed design):** one screen with (a) the 4-letter code with COPY CODE / COPY LINK / QR, (b) a roster list with avatars, ready ticks, and a kick/bot-swap per row, (c) the same CUP selector as the local setup, replacing MODE and FIRST TO when the Cup is on, (d) a "START when everyone is ready" gate with a countdown, (e) TV mode explained as "this screen is the TV; players use phones as controllers".
- **Example moment:** Host puts the lobby on a TV, friends scan the QR, their icons pop into the roster, the host hits START and the Cup rules card plays.
- **Rewards / progression hooks:** "Hosted a 4+ player Cup" achievement.
- **Risks and edge cases:** network drops, host migration, latency fairness.
- **Size:** L
- **Score impact for me:** +0.4

## How this round's new features felt
- **🏆 Party Cup (main feature I touched):** Strong idea and the biggest reason I would host game night. Per-game winners are named in the banner ("GAME 4/6: TEAM RED WINS!"), the ×2 final (+10) is a real comeback beat, and the NEW CUP button after the trophy screen starts a fresh Cup with a single click. What is missing is safety (quit protection), time-boxing, a clean scoreboard and clarity about scoring (issues 1–5, 9). The champion on a "Cup Shelf" is a great hook but only appears as text with unexplained numbers.
- **First Service checklist:** I saw it on the title (it moved 0/6 → 1/6 after the Daily). It is helpful but small and still suggests "Finish the 1-minute Practice" for a player who has already finished seven matches.
- **CHALLENGES card:** clean (shot-36); Trials 0★ and locked Gauntlet courses are clearly communicated. I did not play them as a host.
- **Achievements / Records / Chef rank:** receipts list new achievements with 30 🪙 and colours ("First Bite +30 · Lime colour!"), which feels rewarding after each Cup game, but Records has no Cup information.
- **⚡⚡ Double twists:** work (8 combos after the singles), but in a host setup the only way through is forward-only clicking (about 19 presses to get from NONE to the last combo).
- **Settings → KID MODE / Name tags / Player numbers:** all present and clear; I would default Player Numbers/Name Tags ON for Party.
- **Workshop / Move Lab / Trials:** not touched by this profile.
- **Text and layout:** no overlaps that break anything; the issues are clutter (between-game card on live art) and a couple of near-touches (listed above).

## Bugs that block play
- None. /errors reported `none` at the start, middle and end of the session; no screen froze, no button was unresponsive. The nearest thing to a blocker is the unprotected QUIT in the middle of a Party Cup (issue 2), which silently destroys the Cup's standings.
