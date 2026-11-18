# Playtest evaluation: The Party Host (profile #6, port 7106)

**Fun score: 6.5 / 10** (the party menu and Party Cup are a good skeleton and the Online lobby is strong, but a cup has no story, no stakes and no memory. The host gets no payoff for running a whole night.)

## What I did
- Title, Party Modes setup (joined 3 seats, 2-vs-1 Team Feast preselected), House Rules modal, Online lobby (Host a game), Pantry. About 45 harness commands.
- Played a whole 6-game Party Cup (Classic, Crumb Rush, Hot Dumpling, Team Feast, Golden Spoon, Classic) with 1 human seat plus 2 bots. Used /act for the first game of each type, then auto:normal to speed up. Looked at every between-game screen (shots 3, 8, 10, 12, 13, 16).
- Result: I (Gobzilla) finished 3rd with 17 pts. Squidgeon won the cup with 23 pts. /errors was clean at start, middle and end.
- Did not touch Story, Gauntlet or Gallery, as the host profile would not.

## What worked for me (briefly)
- The Party Cup concept is exactly right for game night. The "PARTY CUP · GAME n/6" interstitial with a "Next: MODE" line and a per-mode tip (e.g. "In Team Feast your cutlery passes straight through teammates") is clear and friendly.
- The Online lobby is strong: 4-letter code, QR code, "TV MODE", Party Cup toggle, bots fill to N players.
- House Rules (3 slots plus share codes) is a good host tool.
- The receipt card ("THIS MATCH: tokens, mastery, how you died, tip") works. The 🪙 jump to +43 in Team Feast felt good, but was unexplained.
- Fast-forward when only bots are left ("FAST FORWARD x3 · only bots left") respects the host's time.

## The single biggest structural problem
**The Party Cup is a points list, not an event.** Across 6 games the only thing that carries over is a three-line score table. At every between-game screen I was shown only the cumulative leaderboard (e.g. "SQUIDGEON 13 pts (+3) / CHOCOMUNCH 11 pts (+5) / GOBZILLA 7 pts (+3)").
- The game winner is not named, and the +N column is scrambled. The crown 🏆 goes to the cumulative leader. In shot 10 Chocomunch actually won Hot Dumpling (+5) but sits in 2nd with the +5, while the crown shows "+3". A newcomer cannot tell who won the game that just ended.
- In Team Feast (shot 12), teammates got different cup points: I got +5 and Chocomunch (same team) got +3, while the losing Squidgeon got +2. The cup treats a team game as a free-for-all.
- There is no mid-cup suspense: no catch-up mechanic beyond COMEBACK HELP, and no "final game worth double".
- The cup ends on a banner with no buttons ("1 / START or Esc for the menu"), no per-game breakdown, no awards, no rematch and no cup history.
- There is nothing to carry to the next game night. For a host, the whole point is the group's story and the "rematch next Friday" hook.
- The Pantry, Records and Weekly Orders are all solo-economy. Nothing rewards hosting.

## Big change proposals (2–3, most important first)

### Proposal 1: Party Cup 2.0 ("The Banquet Tournament")
- **Problem it solves:** the shallow cup loop above (shots 3, 8, 10, 12, 13, 16). The standings screen is confusing, team games are scored per-person, and the cup ends with no ceremony.
- **How it would work (detailed design):**
  - *Between-game screen (replace the current 3-line list).* Three zones.
    - Top: "GAME 3/6 · HOT DUMPLING WINNER: CHOCOMUNCH 🥇" with the winner's portrait popping in.
    - Middle: a standings TABLE with one row per seat showing the portrait, the game-by-game points as small chips (Classic 2 · Rush 2 · Dumpling 3) and the total, with a green/red rank-change arrow (e.g. "▲1"). Rows animate-reorder over 1.5 s.
    - Bottom: "NEXT: TEAM FEAST" with a 6-second mini card (the rule in one sentence plus an icon), and the two buttons Continue and Menu. A "Ready" tick per human seat means no one is dragged into the next game before their drink is down.
  - *Points.*
    - Free-for-all games (Classic, Crumb Rush, Hot Dumpling, Golden Spoon): 5/3/2/1 as today, plus a flat +1 "Style point" for the match's best stat (Most KOs, Crumb Monster, Survivor). That is 3 extra points per game spread across seats, which keeps trailing players alive.
    - Team Feast: the winning team gets +4 each, the losing team +1 each. Tied cumulative scores are broken by the most game wins, then the most KOs.
    - The final game (game 6) is worth DOUBLE ("GRAND FINALE: 2x points", with a gold banner on the previous screen). With 6 games that makes a 12-point swing possible.
    - With 4 or more seats a swing of +10 is reachable from last place. With 2 humans the double finale still matters.
  - *Cup finale screen.* Add buttons: ▶ REMATCH CUP (same setup, same seats), 🔀 NEW CUP, ☰ MENU, 📷 SHARE. Add a per-game breakdown, 5 awards (MVP, Most KOs, Crumb Monster, Survivor, "Most Dizzy" for most stomp-stuns taken) and the cup winner's portrait standing on a podium with the 2nd and 3rd.
  - *Persistence ("The Cup Shelf").* Save the last 10 cups locally: date, seats' kaiju, winner, score. The Party Modes screen gets a small "🏆 Cup Shelf" button showing a trophy row. Win 3 cups with the same kaiju and it earns a "Cup Champion" gold trim colour style in the Gallery.
  - *Setup.* The cup button must show ON/OFF (it currently reads only "🏆 PARTY CUP" with no state). Add a "GAME LIST" editor screen under CUP LENGTH: 6 slots, each cycling through Classic, Rush, Dumpling, Team, Spoon, Random.
- **Example moment:** four friends are on game 4 of 6. Joey is last with 9 pts after getting flicked by the Giant Hand twice. The between-game screen shows "TEAM FEAST WINNER: BLUE TEAM", Joey's row with a "+1 Style (Survivor)", and a banner "GAME 6 = DOUBLE POINTS". Joey whoops, because the maths now says a win in the finale puts him in 2nd. After the final the podium plays, the awards appear ("MOST DIZZY: Joey"), and everyone taps REMATCH CUP.
- **Rewards / progression hooks:** Cup Shelf history, the "Cup Champion" colour, a +25 🪙 Chef Tokens bonus for the cup winner and +10 for finishing (so a loser is paid too), and a "Host a Cup" Weekly Order.
- **Risks and edge cases:**
  - Scores with 2 seats and bots should still use 5/3 (not 5/3/2/1).
  - A human who drops out mid-cup (Online) keeps their points and is replaced by a bot at seat level.
  - Phones are small: the table must fit at 4-6 rows. At 6 seats use row height 40 px.
  - Tie at the top after game 6: add a sudden-death one-round Classic between the tied seats.
- **Size:** M-L. Touches the cup scorer, the between-game screen, the cup-end screen, Party Modes setup, and local save data.
- **Score impact for me:** +1.5. This is the main reason a host would reach for the cup every game night.

### Proposal 2: "Game Night Host Mode" (guest seats, handicaps and a session flow)
- **Problem it solves:** setup friction and fairness at the party table. In Party Modes I had to click each seat to join, with only seat 1 getting keys ("Keys left · A / D"). A shared screen with 4-6 people cannot all use one keyboard, and the game gave me no way to say "Dave is new, give him help". The Team Feast default put me at "RED 2 vs BLUE 1" with a "(add a player or bot to even it up)" note. I had to click again to fix it, and my first click sequence started a cup match when I only meant to change settings.
- **How it would work (detailed design):**
  - *Session screen.* A new "GAME NIGHT" tile sits at the top of the Party Modes screen. It is one screen with 4 steps:
    - 1. WHO'S PLAYING (a row of 6 big avatar cards; the host taps a seat, then picks a kaiju, with a "Guest" or "Regular" toggle for each seat).
    - 2. HOW LONG (a 20 / 40 / 60 minute slider that picks the cup length and First-To automatically: 20 min = 4 games, First to 2; 40 min = 6 games; 60 min = 8 games).
    - 3. HOUSE RULES (load one of 3 slots, or "Surprise Me", which rolls the twist/hazard/power-up options within sane bounds).
    - 4. START, with a final summary line ("4 players, 6 games, ~40 min").
  - *Per-seat handicap.* A "Guest" seat gets a bigger starting belly (like COMEBACK HELP, but from round 1: +25 belly), a slower Giant Hand target priority, and an automatic "tutorial tip" line on the first death. A "Regular" gets nothing extra. COMEBACK HELP stays as a global option but becomes per-seat for the cup.
  - *Controls.* Each seat picks Keyboard (left or right half), Gamepad N, or Phone (QR). One QR on the screen onboards phones as controllers into the local game (the Online lobby already shows a QR, so the plumbing exists).
  - *Between games* the host has a "Pause for snacks" button that freezes the cup. State is saved so the cup can be resumed after a browser reload.
- **Example moment:** Priya opens the game with 5 friends. She taps GAME NIGHT, sets 40 minutes, and each friend scans the QR on their phone. Two newcomers are marked Guest. The summary says "6 players, 6 games, ~40 min". She presses START and the first match begins 20 seconds after she sat down.
- **Rewards / progression hooks:** "Game Night" streak (3 sessions in 3 weeks), a Weekly Order "Host a 4+ player cup", and a unique "Host" title in Records.
- **Risks and edge cases:** phone latency (Online uses WebRTC, so local-phone is the same path); a phone disconnect mid-round must hand the seat to a bot instantly; guest handicap must not be visible as an insult ("Guest" label can be hidden on screen and shown only as a small star).
- **Size:** L. Touches Party Modes setup, Online/lobby code, input mapping, the cup scorer and save data.
- **Score impact for me:** +1.0. The game is already pitched as a couch brawler, and this is the missing "get 6 people playing in under a minute" experience.

### Proposal 3: Mode mix depth. Make each Party Mode a real "variant family"
- **Problem it solves:** the six cup games are all one core brawl with a different win condition. In Golden Spoon (shot 13) I mostly ran auto and the result was decided by whoever got the Giant Hand's attention. In Hot Dumpling I was KO'd by cutlery in 5 s, before the dumpling mattered, so the signature mechanic was irrelevant for me (shot 9: "FAST FORWARD x3 · only bots left" took over). At 4-6 players a mode that eliminates players early leaves guests idle.
- **How it would work (detailed design):**
  - *No-sitting-out rule for every party mode.* Knocked-out players respawn as a "Pest": a small helper fork-flicker at the table's edge for 10 s. They can drop a single banana-peel hazard or nudge the Giant Hand's target, and they cannot score. Hot Dumpling and Classic get this by default. Cup rounds in Hot Dumpling become FIRST TO 3 ROUNDS of 30 s (fixed) instead of last-one-standing, so there are no 5-second rounds.
  - *Cup-only modes.* Add two short modes that only appear in a Cup: "Relay Feast" (team crumb relay: carry crumbs to your plate, 60 s) and "Spoon Roulette" (the table tilts every 10 s toward a random side, with the Giant Hand removed). That is 8 modes in rotation, which makes the 6-game cup feel different every night.
  - *Rule recap.* The "Next:" card shows a 3-icon summary (WIN BY / AVOID / TIP) so mode rules are never a surprise.
- **Example moment:** in Hot Dumpling, Marco is KO'd in 5 s. Instead of watching, he re-enters as a Pest, drops a banana peel in front of the dumpling carrier and the table roars. He finishes with 0 points but a "Best Pest" award.
- **Rewards / progression hooks:** per-mode mastery (like kaiju Mastery) with a title per mode; a "Pest MVP" award at the cup end.
- **Risks and edge cases:** Pests can feel griefy (so cap at one hazard per 10 s and make the Pest's own earlier KO count against it); balance of the 2 new modes needs testing; Online netcode must sync the Pest.
- **Size:** L. New modes, new hazard entity, rule changes across the five modes, and the cup list.
- **Score impact for me:** +0.7.

## How the new features from this round felt
- **Chef Tokens / Pantry:** the token flow felt right (+5, +8, +5, +43, +7, +15 over the cup, total 83). The Pantry itself is solo-flavoured (colours, Gauntlet perks) and offers nothing a host cares about. I would add party items ("Cup Trophy skin", "Extra House-Rules slot", "Podium confetti"). Weekly Orders (shot 21) are all solo goals; none mention party play.
- **Receipt card:** it worked and fits (shots 8, 10, 16). It said "Knocked out by: cutlery x3, a KAIJU, the Giant Hand" and gave a tip. For a party the receipt should show the whole table's cause-of-death ("Joey: 3 flicks by the Giant Hand") for banter. Right now the receipt is only about seat 1.
- **Mastery:** I went Lv 1 to Lv 2 during the cup. The "Mastery Lv 2 Line Cook" line is good but Mastery is single-player flavoured.
- **COMEBACK HELP:** I could not feel it in the cup. A losing seat's belly was not visibly fuller; a banner such as "COMEBACK: Gobzilla starts with a full belly" at the countdown would make it felt.
- **House Rules:** a very good idea (shot 18). The modal works, but I saved Slot 1 and the list refresh was not visible without reopening. Also, Cup settings (CUP LENGTH, game order) should be saved in the slot too.
- **Golden Spoon:** a nice idea (HOLDING! 15/15s). Round length 60 s was good. The banner "The giant hand goes for whoever has the fullest belly" is a good tip. Not yet deep: there is only one way to win (hold it) and nobody was ever at risk of a comeback.
- **Clarity (Giant Hand tip, stomp rings):** the "GOBZILLA got flicked by the GIANT HAND" log is clear. I did not hit a first-time explanation because earlier progress had already cleared it.
- **Text fit:** no overruns on any screen I visited. The "Next: ... · 1 / START to continue" line (shots 8, 10) sits directly over bright board art and is hard to read (see small notes).

## Bugs that block play
- None blocking. /errors was "none" at start, mid-cup and end.
- Confusing behaviour, possibly a bug: on Party Modes I clicked 3 seats, then the PARTY CUP button, then CUP LENGTH, and a match started with 3 seats and Team Feast ignored. I cannot say which click started it. It is worth checking that no setup button overlaps the start trigger. Steps: open Party Modes, click seats at (112,300), (323,300), (534,300), then (199,512), then (325,512).
- Team Feast in the cup gives teammates different points (see "single biggest problem", shot 12).

## Small notes (max 5, one line each)
- The Party Cup button shows no ON/OFF state; "MODE: TEAM FEAST" stays visible while the cup is on, which is confusing.
- The "Next: HOT DUMPLING · 1 / START to continue" line (shots 8, 10) sits over bright art with only an outline; put it on a dark pill.
- The cup finale screen (shot 16) has no buttons, only a text hint "1 / START or Esc for the menu"; mouse and touch hosts have no way to leave except Esc.
- The House Rules modal lets background buttons (MODE, RANDOM) peek out at its edges (shot 18); dim the whole screen.
- The Online lobby's Party Cup shows only ON/OFF with no CUP LENGTH, and Mode lists Classic only (no Golden Spoon in the picker); match the local setup.
