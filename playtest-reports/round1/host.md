# Playtest evaluation — The Party Host

**Fun score: 7 / 10** (Setup is quick and charming, and the Party Cup is a great game-night wrapper. Round-to-round pacing and score feedback hold it back.)

## What I did
- Title -> Party Modes. Joined as P1, added bots (B), played Team Feast 2v2 (full match, 9 rounds, Blue won 5-4), Hot Dumpling (6 players, 2+ rounds), Crumb Rush (started, manual play, Kaiju Frenzy twist tried).
- Ran a full 5-game Party Cup (Classic, Crumb Rush, Hot Dumpling, Team Feast, Classic) with 3 bots; Salmonster won 21 pts.
- Looked at Online -> Host a Game (room code, QR, mode/bot/twist/Party Cup/TV mode toggles). Closed room.
- Played manually with crumbs/stomp/power/attack. About 70 calls, ~12 screenshots. /errors: none.

## What matched my goals / what was fun
- Setup is fast: Party Modes shows 6 big seat cards, "THROW to join", B adds a bot, 1 starts. Hotkey bar (G mode, C Party Cup, X twist, M table, R rounds) is on screen. I had a 4-player game in about 4 keypresses.
- Party Cup is the host's dream: pressing C starts a 5-game playlist with points, medals and a "Next: CRUMB RUSH" preview. It mixes modes automatically so I don't have to referee choices.
- Team Feast with no friendly fire is a good fit for mixed-skill groups. Hot Dumpling (pass the dumpling, "STOLEN!", "TAG! HOT!") is a genuinely different party mood.
- End-of-round awards (Most KOs, Crumb Monster, Kaiju Lover, Survivor) and instant replay/fast forward are crowd-pleasing. The art is lovely and readable on a TV-sized frame.
- Online host panel is clear: big 4-letter code, QR for phone join, "up to 5 friends", TV mode toggle (host doesn't play), bots fill to 4.

## What took too long / was tedious
- Team Feast to 5 rounds took 9 rounds when teams were even. That is a long night for a 10-second-round game; I'd default teams to first-to-3.
- Hot Dumpling inside the Party Cup seemed to run ~5+ rounds on one table (Lazy Susan, round 5). A cup game should be capped (e.g. 3 rounds).
- When knocked out, I spend a while spectating ("fast forward only bots left" helps). With 6 friends, early-out players wait; Hot Dumpling and Crumb Rush are better for that, so the Cup should bias toward them.
- Whole Party Cup is ~25 rounds; fine for a hosted evening but I'd like a "short cup (3 games)" option.

## What was over too quickly / too shallow
- Rounds are often over in 8-12 seconds. With bots it felt like random cutlery luck; a single bot (Salmonster) won repeatedly, which suggests some kaiju feel stronger than others at Normal.
- Setup screen doesn't show the Party Cup's game list or the points system before starting.

## Confusing or unclear
- Scoreboard in Team Feast HUD doesn't show team score (red 4 / blue 5) during play; only stars on cards. A host with a TV needs a big team score.
- Pressing C starts the cup instantly with whoever has joined; no confirmation or preview, easy to trigger by accident.
- Mode list: G cycles only 4 modes (Team Feast, Crumb Rush, Hot Dumpling, Classic) - the title card says "Teams / Rush / Dumpling", fine, but the Party Modes screen name lists no more modes than that; I expected more variety for a game night.
- Setup: keyboard-left and keyboard-right both listed; joining a 3rd/4th human on one keyboard is cramped. For TV play the phone-controller story isn't visible on this screen (only on Online -> QR); I would like "phones as controllers" surfaced in Party Modes.
- Bots' seats show "Bot: NORMAL (tap)" - not obvious that tapping cycles difficulty; kaiju selection for bots isn't obvious.
- On the Online lobby /look reports no text (DOM overlay), harness quirk only.

## Bugs found
- Crumb Rush: after pressing X to pick the "KAIJU FRENZY" twist (header showed "... · ⚡ KAIJU FRENZY"), /state in-match reported `"twist": "none"`. Steps: Party Modes -> G to Crumb Rush -> X -> Z -> 1. Might be a state-reporting quirk or the twist not applying; couldn't verify visually.
- Crumb Rush: after pressing Z (random table), "First to 3 rounds" replaced "First to 5"; probably intended per mode, not a bug.
- /errors: none. Screenshots: art-src/.playtest/7106/shot-2.png (setup), shot-10.png (cup standings), shot-17.png (online host room).

## Top 3 changes that would raise my score
1. Shorten and cap rounds/matches for party play (Team Feast default first-to-3, cap each Party Cup game at ~3 rounds, offer a short 3-game cup), and show a big team/cup score on the HUD.
2. Surface a "phones as controllers / TV mode" path on the Party Modes screen so 6 people on one TV don't fight over two keyboards.
3. Balance and show more of the Party Cup upfront (list of the games and points on the setup screen) and look at bot/kaiju balance so one monster doesn't keep winning.
