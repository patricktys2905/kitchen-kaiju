# Playtest evaluation — The Party Host

**Fun score: 7 / 10** (Setup is quick and the modes read well on a TV; the party menu only has 4 modes and the Cup runs long for a game night.)

## What I did
- Title -> Party Modes. Joined 2 seats, played a full Team Feast match (lost 1-3 to a bot, 4 rounds). Then filled all 6 seats with bots and played a full Hot Dumpling match and a full Party Cup (5 games: Classic, Crumb Rush, Hot Dumpling, Team Feast, Classic), about 45 rounds in total.
- Cycled through every mode button (Crumb Rush, Hot Dumpling, Classic, Team Feast) and looked at the table/option row.
- Opened Online -> Host a Game and read the room screen (code, QR, option buttons). I could not connect friends. I closed the room again.
- Roughly 60 harness calls. I played mostly with auto:normal because 6 bots is chaos.

## What matched my goals / what was fun
- Setup is easy: click a seat to join, click again to add a bot, one big PLAY button, and a 6-seat row. The seat count and Red/Blue team seats are obvious for a living-room group.
- The Online room is well designed for a host: 4-letter code, a QR to scan, bot fill-up, Party Cup toggle, Mode/Twist/Hazards, and a "TV mode (you don't play)" option. This is exactly what I want for a TV and phones.
- Party Cup is the best feature: a points table after each game (5/3/2/1), a "Next: CRUMB RUSH" teaser, and a "CRABBAGE WINS THE PARTY CUP!" ending. It gives a night a shape.
- The round intro tips ("Your cutlery passes straight through teammates", "Mustard Shield blocks one hit, but not a fall") are short and useful for new guests.
- Crumb Rush is the friendliest mode for non-gamers. You respawn ("BACK IN 3"), and the timer and crumb counters are readable.
- Hot Dumpling is chaotic and funny ("HOT! PASS IT!", the "popped on CHOCOMUNCH" message). Kaiju stomps, the crab and blueberry-bear art, and the "INSTANT REPLAY" with "FAST FORWARD x3 · only bots left" are nice touches.
- End-of-match awards (Butterfingers, Crumb Monster, Kaiju Lover) are the kind of thing friends laugh about.

## What took too long / was tedious
- The Party Cup's final Classic game took about 7 rounds (first to 3 with 6 players), roughly 10 minutes, after four earlier games. A full Cup looks like 30+ minutes. There is no short Cup option.
- When you are knocked out in Classic or Hot Dumpling you watch for a long time. The fast-forward only shows when just bots are left. With 4+ humans, early KOs would sit idle for ages.
- The Party Cup button is a plain toggle with no description of length.

## What was over too quickly / too shallow
- Only 4 party modes (Classic, Crumb Rush, Hot Dumpling, Team Feast). I expected more variety for a "party modes" menu (e.g. a capture-the-plate or king-of-the-table mode).
- Team Feast with an odd or small number of players is just a duel. It does not suggest "add 2 more" or balance teams.
- Hot Dumpling often ended within 5-10 seconds of a round, mostly through plain cutlery KOs rather than passing the dumpling.

## Confusing or unclear
- The mode button cycles forward only, one click at a time. Getting from Team Feast back to Classic took 3 clicks and I overshot once. The "◀ ▶" arrows in the heading looked clickable but I wasn't sure they were.
- Party Cup has no on-screen state in the setup screen text that I could see ("PARTY CUP" button looked the same on and off). I only knew it was on from the "Next:" teaser on the first game's result.
- Cup score screen text sits over a busy table and the confetti and is hard to read. Ties are shown as separate ranks (8 pts for 3rd and 4th) with no tie note.
- Bot level, round count and table are separate buttons with no preview of what they mean. There's no "recommended for 4 friends" preset.
- The Online room says "Bots fill up to 4 players" but the offline party menu allows 6. It is not clear what "Up to 5 friends" means with bots.

## Bugs found
- /errors: none ("none") at the end of the run.
- Minor: after a Hot Dumpling match, the result screen's buttons (REMATCH / MENU) did not appear in /look text the second time. Pressing Escape worked, so it may be a harness quirk. The first time they showed fine.
- Online lobby screen is an HTML overlay, so /look returns no texts there (harness gap, not a game flaw).
- Screenshots: art-src/.playtest4/7106/shot-1.png (setup), shot-4.png (Hot Dumpling), shot-6.png (Cup table), shot-7.png (Crumb Rush), shot-12/13.png (Online).

## Top 3 changes that would raise my score
1. Add Party Cup length options (3 games / 5 games, first-to-2 rounds in Cup) and show the length on the setup screen. Add a "spectate fast" speed-up when a human is KO'd.
2. Add 2-3 more party modes, and make Team Feast auto-balance teams or warn when it is lopsided.
3. Polish setup: make the mode selector a clear previous/next with a short description, show Party Cup ON clearly, and add a "4 friends on one TV" preset. Put the Cup score text on a dark panel so it stays readable.
