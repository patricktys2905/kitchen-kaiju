# Playtest evaluation — The Party Host

**Fun score: 7 / 10** Good-looking, readable chaos with a great set-up screen; but two party modes run far too long and the Party Cup/modes feel like reskins of the same cutlery brawl.

## What I did
- Title -> Party Modes setup (filled 6 seats with bots, tried N key and seat clicks), cycled modes with G (Classic, Team Feast, Crumb Rush, Hot Dumpling).
- Team Feast: full match (8 rounds, Red won; I played via the auto bot). Hot Dumpling: ~17 rounds to a winner. Crumb Rush: 17+ rounds with no winner before I bailed. Party Cup (C key): game 1/5 Classic, played ~5 rounds. Pause menu, Online screen (Host a Game -> room code FBLP, QR, option chips; Close Room).
- About 80 calls, 16 screenshots. /errors: none.

## What matched my goals / what was fun
- Setup screen is the best bit for a host: 6 seats, red/blue team colouring, controls for keyboard-left / keyboard-right / gamepad printed right on screen, and every hotkey (mode, party cup, bots, table, rounds, power-ups, hazards, twist, random) is a clickable chip. I could start a 6-player game in ~6 actions.
- Team Feast is clear and social: team stripes on the HUD and rings under feet, "no friendly fire" stated, end screen "TEAM RED RULES THE TABLE" with awards (Most KOs, Crumb Monster, Kaiju Lover, Butterfingers) - great for table banter.
- Crumb Rush is very readable (live crumb counts in the HUD, countdown timer on a toaster, "BACK IN 2" respawn indicator).
- Tables differ a lot (Bakery Bench conveyor, Ice Cream Parlour, Dinner for Four) and art is charming; "DIG IN!" countdown, instant replay and "fast forward only bots left" are nice touches.
- Online lobby: 4-letter code, QR code, TV mode toggle (right idea for a couch host), bots fill to 4, Party Cup toggle there too.
- Party Cup (5 games, first-to-2 each, with a tip card per game) is a real "game night" structure.

## What took too long / was tedious
- Hot Dumpling match went ~17 rounds even though it says "First to 5 rounds"; scores spread 0-4 across six players so nobody gets to 5. Crumb Rush likewise reached round 17+ with no winner (autoplay reported "winner null", KOs in the 60s). With 6 players "first to N" needs to scale, or have a hard cap / leader-takes-it rule. This would kill a party night.
- Party Cup game 1 (first to 2) still took 5+ rounds with 6 players.
- Dying early in a 6-player round means waiting; fast-forward only triggers when only bots are left.

## What was over too quickly / too shallow
- Rounds are often decided in under 15 seconds by cutlery throws from the one armed bot; Team Feast rounds 1-2 were over in ~8s of play.
- Hot Dumpling and Crumb Rush still involve skewering/KOing everyone, so they feel like Classic with a score tweak rather than distinct party modes. The dumpling is easy to miss visually (small icon at the HUD; "TAG! HOT!" popups overlap the HUD names).
- Only 4 party modes (plus Classic) in the G cycle - I expected more variety given the "Teams - Rush - Dumpling" billing.

## Confusing or unclear
- On the setup screen, the N "add bot" chip did not seem to fill the seat I expected (first press seemed to do nothing visible, later one filled a seat). Clicking a seat is clearer.
- G cycles mode with no list, so I overshot Crumb Rush and had to cycle around; a visible mode picker with all modes would help.
- Pressing C starts a Party Cup immediately rather than toggling a setup - I expected to review the cup lineup first.
- Round score stars in Team Feast are per-player (all show equal stars), while the win condition is team-based; a team score banner during play would be clearer.
- Enter on the match-end screen does not rematch (text says "1 / START rematch"), Esc mid-countdown behaved oddly (needed the pause menu then QUIT).
- Win screen: "winner null" in Crumb Rush autoplay suggests the match may never officially end.

## Bugs found
- Results overlay in Team Feast: ranking lines overlap ("3. GOBZILLA 5 rounds - 1 KO" collides with "4. AVOCADRAKE ..." in the 2-column layout). Screenshot: art-src/.playtest2/7106/shot-5.png
- "TAG! HOT!" popup text overlaps the top HUD player names in Hot Dumpling (shot-8.png).
- Round-limit issue: Hot Dumpling reached round 17 and Crumb Rush round 17+ in a "first to 5" match (steps: Party Modes, G to the mode, add 6 bots, start 1, run /act?cmd=auto:normal repeatedly).
- /errors: none.

## Top 3 changes that would raise my score
1. Fix match length for Crumb Rush / Hot Dumpling (and big-lobby Party Cup games): cap rounds or win by leading when the cap is hit, so a game night never runs 15+ rounds.
2. Make the party modes feel more distinct from Classic (e.g. disable or soften cutlery KOs in Hot Dumpling, make the dumpling big and obvious, give Crumb Rush its own win beat), and add a few more modes.
3. Add a proper mode/cup picker (visible list, Party Cup preview before starting) and fix the results/HUD text overlaps.
