# Playtest evaluation — The Party Host

**Fun score: 7.5 / 10** (great party-night structure and presentation; I'd host it, but a few sharp edges in group setup/flow keep it from a 9)

## What I did
- Title -> Party Modes setup screen; joined as seat 1, tapped empty seats to add bots (up to 6 total); toggled modes via MODE button; used RANDOM; looked at BOT LEVEL on a seat.
- Team Feast: first tried with 1 human + 1 bot (accidentally 1v1), then 3v3 with 5 bots; played a full match (first to 3, won).
- Hot Dumpling: ~2 rounds (1 manual-ish with "attack", rest auto). Crumb Rush: ~4 rounds, abandoned mid-match.
- Full Party Cup (5 games, 6 players): Classic -> Crumb Rush -> Team Feast -> Hot Dumpling -> Classic. Finished with a cup winner screen.
- Online: Host a Game screen (room code, QR, options), then closed the room. Could not test joining.
- ~75 curl calls, 14 screenshots. /errors: none.

## What matched my goals / what was fun
- Setup is genuinely quick: click seats to add bots, Play. Seats/teams persist between matches (rematch and Esc-to-menu keep the roster), which is perfect for game night.
- Mode descriptions are one clear line each ("Pass the steaming dumpling before it pops", "Eat the most crumbs before time runs out"). Each mode feels distinct: Team Feast with teammates' cutlery passing through, Dumpling with tag/steal popups, Crumb Rush with respawns ("BACK IN 2") and a countdown.
- Round-start tips on every countdown ("Cheese shadows grow before the splat. Step out of the ring!") teach newcomers without a tutorial.
- End-of-match screen is a highlight: ranked list plus silly awards (Crumb Monster, Kaiju Lover, Butterfingers, Survivor), SHARE button, giant kaiju portrait. Fits party banter perfectly.
- Party Cup: points table (5/3/2/1) after each game, clear "Next: CRUMB RUSH" preview, five varied games in ~10 min. Great fit for an evening.
- Online lobby is exactly what a host wants: 4-letter code, QR to scan with phone, TV mode ("you play too" off), Party Cup toggle, bots fill to N, mode/twist/hazards options.
- "FAST FORWARD x3 - only bots left" after I got knocked out keeps eliminated players from waiting. Excellent for 6-player rounds.
- Art/readability: 6 kaiju are distinct, player strips across the top are clear, big KAIJU! callouts with power name.

## What took too long / was tedious
- Crumb Rush as a standalone "first to 3" match: each round ~50s plus intermissions, so 4+ rounds is 4-5 minutes; fine for a mode, but a friend knocked out early in Classic/Team Feast waits for round reset anyway.
- Classic rounds in a 6-player free-for-all can drag when two survivors hide/dance for ages (watched several 20-40s endings, though fast-forward helps if only bots remain).
- Party Cup games each need a 1/START press on the interstitial (see confusing).

## What was over too quickly / too shallow
- Team Feast with 1v1 (the default when you add just one bot) ends in 10 seconds and has no point; the game should warn or auto-balance.
- Early Classic/Team Feast rounds can end in ~10-15s when everyone rushes the edge; a 6-player table sometimes seemed chaotic more than tactical.
- Dumpling: a pop is sudden and mostly luck; fun for a party but shallow for repeat play.

## Confusing or unclear
- Add-a-player flow: clicking an already-joined bot's seat cycles its difficulty (silently turned SLOBA to HARD for me) while clicking empty seats adds bots. Not obvious without reading the tiny "(tap)" label.
- Team Feast with no even teams shows "(add a player or bot to even it up)" but still lets you PLAY; with 1v1 it also quietly filled nothing.
- Party Cup tie-break: final standings had three players tied on 12 pts, with BLUEBEARY declared winner and MOTHBALL (+5 last game) 3rd. No explanation of the tie-break, which will cause arguments among friends.
- The MODE button cycles in a different order than the arrows beside the mode label (Dumpling -> Classic -> Team -> Crumb) and the arrow keys; fine but slightly odd.
- "Online" says "Up to 5 friends" but "Bots fill up to 4 players" default; can't tell if the 6-seat local limit applies online.
- Interstitial/results screens only say "1 / START to continue" and clicking/tapping the screen did not advance (tested at the text); a phone/mouse-only host has no obvious button. (May be a harness quirk for taps; keyboard Digit1 worked, Enter did not.)
- Clicking Party Cup immediately starts the cup using the current roster, with no confirm; at least the explanation text is visible beforehand.

## Bugs found
- None from /errors ("none").
- Minor: Party Cup standings put players with equal points in an order that doesn't match podium icons (e.g. 3 tied at 12 shown with trophy/silver/bronze but "(+5)" player third) - see above.
- Online lobby screen reports no texts to /look (DOM overlay, likely harness only).
- Screenshots: art-src/.playtest3/7106/shot-9.png (cup interstitial), shot-12.png (cup winner), shot-14.png (online room).

## Top 3 changes that would raise my score
1. Make Team Feast safe: auto-balance (a bot fills the short team) or block Play with an uneven/1v1 roster, and explain Party Cup tie-breaks on the final screen (or play a sudden-death round).
2. Add clickable CONTINUE / REMATCH / MENU buttons on every interstitial and results screen (not only "1 / START"), so a TV host with a mouse or phone can drive the party; separate "add bot" from "change bot level" on seat tiles.
3. Keep rounds snappy for 6 players: a stalemate shrinker (table edge closing in or a hurry-up timer) in Classic/Team Feast, and shorter standalone Crumb Rush (first to 2) so a game night can chain modes quickly.
