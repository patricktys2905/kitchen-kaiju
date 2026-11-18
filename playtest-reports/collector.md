# Playtest evaluation — The Collector

**Fun score: 6.5 / 10** (the collection loop is clear and the reveals are lovely, but the first unlocks come slowly in play-time, hard story chapters need many long matches, and colours are gated behind big grinds)

## What I did
- Title, Records (33 achievements, page 1 read), Kaiju Gallery (checked locked kaiju and colour unlock hints), Story map, ~17 matches total.
- Story ch1-6 cleared (ch1/2 first try, ch3 lost twice then won after "Helping Hand", ch4 boss lost a couple of times, ch5 lost once, ch6 won after a very long match). Tried ch7 (lost once), then the harness server went down (connection refused) so I stopped at about call 80. Not caused by anything I did that I can tell, but I could not check /errors afterwards.
- One Free Play match via /autoplay (it started Free Play, not the Story chapter I had queued).
- Approx. matches per unlock: Minturtle (ch4 boss) took about 9 matches; table Freezer Shelf (ch6) about 14; Lime colour should have come from the first win but I did not confirm in the Gallery. Matches ran 2-7 rounds long, each 1-2+ real minutes of bot time.

## What matched my goals / what was fun
- The title's "NEXT UP" line (next kaiju + next colour with % progress) is exactly what a collector wants. Great.
- Gallery shows 16/20 kaiju, 15/18 tables, 2/12 colours on first launch, with the exact unlock requirement per locked item (ch8, ch12, 30 stars...). Clear targets.
- "NEW KAIJU!" popup for Minturtle is a proper reward moment: big art, power description, "playable now in Free Play, Party Modes and Online".
- Stars (3 per chapter), spicy variants, 7 chapter rewards, achievements with colour rewards give several parallel collection tracks.
- "Helping Hand" after repeated losses is a kind safety net.

## What took too long / was tedious
- Colours: 10 of 12 are locked behind things like 25 KOs, 10 wins, Gauntlet waves, Team Feast wins. Spread across modes, fine, but "Win 50 matches" / "Cutlery Drawer 250 KOs" are long grinds with a small payoff shown in Records.
- Long matches: at higher chapters 3-player rounds went to round 5-7 before anyone reached the win target, which makes failing a chapter costly (several minutes per retry) when I'm just trying to unlock the next thing.
- Four of 12 kaiju need chapter 8/12 or 30 stars: reasonable, but there is no progress indicator for "30 stars" in the Gallery, only on the Story map (10/36 at the time).

## What was over too quickly / too shallow
- Starting with 16/20 kaiju and 15/18 tables already open takes away much of the "chase". Only 4 kaiju and 3 tables are story-locked, so the collecting is mostly colours.
- The achievement reward text only names the colour for some achievements (First Bite -> Lime, Regular Diner -> Ocean) and none for others, so I can't tell which achievements feed the Gallery.

## Confusing or unclear
- The Story screen opens on the last-selected chapter, not the next uncleared one, so "Story -> PLAY" can silently replay a cleared chapter (I replayed ch6 by accident).
- Clicking a chapter tile appears to start its cutscene immediately; unclear whether that's intended.
- Locked Gallery swatches: clicking showed the same hint text for several colours (may be a harness click issue, not sure).

## Bugs found
- Harness server stopped responding (connection refused on 7105) after about 20 minutes of play; /errors unreachable. Probably not a game flaw, but unverified.
- /errors was not checked before that (never called) so I cannot confirm zero JS errors.
- Screenshots: art-src/.playtest4/7105/shot-3.png (Gallery), shot-2.png (Records), shot-9.png (new kaiju popup).

## Top 3 changes that would raise my score
1. Show a per-item progress bar/counter in the Gallery for every locked colour and kaiju (e.g. "Stars 10/30", "KOs 14/25") and which achievement gives which colour.
2. Open Story on the next uncleared chapter and shorten the retry loop (auto-offer a quick RETRY, cap very long rounds) so a failed boss doesn't cost minutes.
3. Lock a few more kaiju/tables behind early play (or add more colour variants/cosmetics) so the first hour feels like collecting rather than starting at 66%.
