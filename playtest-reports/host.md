# Playtest evaluation: The Party Host

**Fun score: 6.5 / 10** (Golden Spoon and the online lobby are a real step up, but there is no "run an evening" layer: no persistent party, no lineup memory, no handicap or spectator tools, and the Party Cup is thin.)

> Caveat: I only have a bot-in-my-seat harness, so I judged social fun from the setup flow, 6-player HUD readability and match structure, not from real friends.

## What I did
- Title -> Party Modes. Joined seats, cycled all five modes (Team Feast, Crumb Rush, Hot Dumpling, Golden Spoon, Classic). Saw the Team Feast text "RED 2 vs BLUE 1 (add a player or bot to even it up)".
- Played Golden Spoon 6-player (1 human + 5 bots): ~25 s manually, then autoplayed the rest (SLOBA won 3 rounds to 2; results screen art-src/.playtest/r5-7106/shot-5.png).
- Toggled CUP LENGTH (6 -> 3 games) and PARTY CUP; started it ("PARTY CUP · GAME 1/3 · CLASSIC · Chef's Board"). /autoplay n=3 ran three matches with different winners, and I ended on the Free Play setup screen with no cup standings seen at any point (shot-8.png).
- Played a Hot Dumpling round (shot-13.png). Opened Online -> Host a Game: room code WTPT plus QR (shot-10.png). Wandered into Story select by accident (menu click layouts differ between screens).
- About 35 harness commands, 0 JS errors across the session.

## What worked for me (briefly)
- Online host lobby is good: 4-letter code, QR for phone cameras, "TV mode" toggle, bot fill-to-N, and the same mode/twist/cup options as local. Right shape for game night.
- Golden Spoon is readable at 6 players: "SQUIDGEON HAS THE GOLDEN SPOON" banner, per-player "9/15s", "HOLDING!", "STOLEN!" popups, "BACK IN 3" respawn timers. Cumulative (not consecutive) hold time keeps everyone in the fight.
- Party Cup blurb on setup states lineup and 5/3/2/1 points; CUP LENGTH 3 vs 6 is the right knob.
- Results-screen awards (Crumb Monster, Butterfingers, Survivor, Condiment Hoarder) are good banter fuel.

## The single biggest structural problem
**The Party Cup, the host's "game night" product, is a black box with no shared drama.** I turned it on, played, and never saw a cup scoreboard, between-game standings, a "next game is X" card or a final trophy ceremony. The setup footer promises points 5/3/2/1 across six games, but in my (autoplay-driven, possibly unrepresentative) session the results screen looked identical to Free Play ("1 / START rematch · Esc menu") and the cup context was lost: I was dropped on Free Play afterwards (shot-8.png). Even if the real flow shows standings, the cup is a fixed list of the same modes with no stakes between games.

For a host with 4-6 friends the whole value is the arc of an evening: who is winning overall, who is about to get robbed, what rule is coming next. Each match is an isolated first-to-3 with nothing carried over, and the 6-player free-for-all modes are very chaotic: in Golden Spoon one SQUIDGEON went KAIJU and KO'd three rivals within seconds (shot-4.png), so results feel luck-driven for the weaker players. There is also no catch-up or handicap tool for mixed skill (kids, partners, newcomers), which is the number-one host problem.

## Big change proposals (2-3, most important first)

### Proposal 1: Game Night mode (a persistent evening with a leaderboard)
- **Problem it solves:** Party Cup has no arc and no memory; after a cup there is no reason to play "one more" or return next week. Every session starts from a blank setup screen and I had to click-join every seat again after leaving the menu.
- **How it would work (detailed design):**
  - New tile "GAME NIGHT" on the Party Modes screen (the PARTY CUP button becomes one episode type).
  - Setup: each seat has a NAME (typed, or one of 12 silly presets, saved locally) and a kaiju. A saved "Crew" of up to 8 names is restored next time with one tap ("Same crew as last time?").
  - Night structure: LENGTH = Quick (3 games, ~15 min) / Standard (6, ~30 min) / Marathon (10, ~50 min). PLAYLIST = Classic mix, Chaos mix, Teams-only, Bot-friendly, or Custom (reorder with arrows). The default mix never repeats a mode back-to-back and ends on a FINALE.
  - Between games: a 6-second STANDINGS screen with podium bars, points earned (5/3/2/1 for 4 players; 6/4/3/2/1/1 for 6), leader crown, a "Next up: HOT DUMPLING (Teams)" card with a one-line rule, and a 10 s "swap seats / sit out" prompt for handing over controllers.
  - FINALE is worth DOUBLE points, announced at game 1, optionally with a harder twist.
  - Catch-up: last place at standings gets a one-use "Comeback Crumb" token (start the next game with a full belly), shown as a tag on their HUD. Cap one per player per night, never given to the leader.
  - End of night: shareable summary card (reusing SHARE) with titles ("Spoon Tyrant", "Butterfingers of the Night"), MVP, total KOs, and a podium using each player's kaiju and colour.
  - Results feed Records: "Nights hosted", "Nights won", and a per-name lifetime leaderboard under a "THE CREW" tab on the title screen.
- **Example moment:** Four friends, Quick night. After game 2 standings read Dad 8, Mei 8, Jun 3, Aunt 3. Next-up card: "GOLDEN SPOON, DOUBLE POINTS FINALE". Aunt gets a Comeback Crumb, hunts the spoon with a full belly, wins it, and the room yells.
- **Rewards / progression hooks:** lifetime crew leaderboard; night titles as Records achievements (new colours "Podium Gold", "Wooden Spoon"); a table "Banquet Hall" unlocked after 3 nights hosted. Saved crew makes returning 2 taps.
- **Risks and edge cases:** online (cup state lives on host, names sync); 1 human + bots (bots recorded as "Chef Bot", not persistent); mid-night quit (offer RESUME on title); seat swapping with one keyboard; catch-up token balance.
- **Size:** L. Touches Party Modes setup, results screen, cup state, Records, SHARE card, online lobby sync.
- **Score impact for me:** +1.5. Turns a good mode list into a reason to host; fixes the biggest problem directly.

### Proposal 2: Mixed-skill fairness kit (handicaps, team auto-balance, rubber-banding)
- **Problem it solves:** In the 6-player Golden Spoon one giant KO'd three players in seconds (shot-4.png) and bots dominated the ranking; Team Feast only warns "RED 2 vs BLUE 1" in text. The only difficulty knob is per-bot; humans cannot be handicapped.
- **How it would work (detailed design):**
  - Per-seat HANDICAP chip on each joined seat: NONE / CUSHION (+25% shove resistance and a 3 s spawn shield after each KO, reusing the shield icon) / SUGAR RUSH (+10% speed, belly fills 40% faster) / TANK (two-hit mustard shield at round start) / for experts SPICY (-15% grab range, belly fills 20% slower, skull tag).
  - AUTO-BALANCE on Team Feast: sorts seats into teams using a per-name rating (win rate over the last 20 matches, from Proposal 1; default 1.0). On an uneven split, a one-tap "ADD EASY BOT TO BLUE" replaces the text warning, and PLAY is blocked until resolved.
  - CATCH-UP setting: OFF / GENTLE / WILD. GENTLE: last place gets belly fill x1.3. WILD: the leader's belly fill x0.7 and, in Golden Spoon, the current leader's spoon hold accrues 20% slower.
  - GIANT COUNTER: in 5+ player matches, while one player is KAIJU all others fill belly 25% faster, with a "GIANT ALERT" HUD tag, so a second giant can answer.
- **Example moment:** Three adults and a 9-year-old. Kid on SUGAR RUSH, adults on SPICY. In Crumb Rush the kid hits STOMP first, the "BELLY FULL" coach bounces, adults circle to avoid the ring; kid finishes 2nd and is thrilled.
- **Rewards / progression hooks:** "Fair Fight" achievement (win a night with all seats within 2 points); Records tracks "handicap-free wins" to keep experts honest.
- **Risks and edge cases:** handicaps can feel patronising, so use fun names not "EASY"; online: host sets them and all clients see them; stacking with bot level must be capped.
- **Size:** M. Touches setup seat cards, player modifiers, Team Feast balance, results awards.
- **Score impact for me:** +1.0. Lets mixed families and friend groups enjoy it together.

### Proposal 3: Couch spectator layer (KO haunting and phone audience)
- **Problem it solves:** KO'd players sit idle. In Hot Dumpling round 1 three of four were already out (shot-13.png) and the spoon HUD showed "BACK IN 3" waits. The online lobby already has a phone QR but no audience role, so friends beyond 6 or waiting players are dead weight.
- **How it would work (detailed design):**
  - HAUNT: when KO'd in any party mode, your HUD card switches to HAUNT: 3 uses (10 s recharge) of non-lethal mischief: drop a banana peel (0.5 s slow), nudge a spatula warning, or send a boo emote. Credited by name.
  - AUDIENCE slot in the room lobby (up to 10 phones). Three buttons: CHEER (crowd emote over a chosen kaiju), BET (pick a round winner pre-round; correct = audience points), and FOOD DROP (audience votes at 8 s into the round between three power-ups that spawn at table centre).
  - Audience leaderboard shows on Game Night standings. TV MODE (already exists) pairs naturally: host machine is only the TV.
- **Example moment:** Six friends plus two on the sofa with phones. Golden Spoon; Jun is KO'd at 6 s and haunts a banana under the spoon holder; the audience vote spawns Hot Sauce; a correct bet gives "+3".
- **Rewards / progression hooks:** "Best Backseat Chef" title per night; achievement for 10 correct bets lifetime.
- **Risks and edge cases:** phone latency (forgiving timing); griefing (caps, name credit); netcode must carry a non-player role; spectator flood; needs an off switch in lobby.
- **Size:** L. Touches online lobby/netcode, HUD, results, mode rules.
- **Score impact for me:** +0.6. Helps big groups and dead time but is expensive and less certain.

## How the new features from this round felt
- **Golden Spoon:** best new mode for me. Cumulative 15 s makes comebacks possible and the HUD is clear. Weakness: with KAIJU powers on, one giant cleared three players in seconds (shot-4.png), and the spoon rarely stayed put more than a couple of seconds, so it reads as chaotic rather than tactical. Bigger version: spoon holder is slower and glows, plus the rubber-banding and giant-counter in Proposal 2.
- **CUP LENGTH button:** exactly right and easy to find, but its value is wasted because I never saw cup standings (biggest problem).
- **STOMP coach:** barely noticed in a 4-6 seat party since I was KO'd often; the "STOMP READY!" text in the top HUD card already works for a TV. It should be mutable per seat in setup (kids on, adults off).
- **KAIJU counterplay:** the SQUIDGEON stomp ring (pale circle plus yellow progress arc, shot-4.png) reads clearly at TV distance, but in a crowded 6-seat melee the warning is not enough to avoid three KOs.
- **Gallery progress and Gauntlet lives:** not touched in this profile.

## Bugs that block play
- Possible: starting a Party Cup then /autoplay n=3 ended on the Free Play screen with the cup state gone and no standings (shot-8.png). May be an autoplay artefact; I could not confirm the cup carries state between games. Steps: Party Modes -> PARTY CUP -> PLAY -> /autoplay?n=3 -> /click MENU.
- /errors: "none" at start, middle and end.

## Small notes (max 5, one line each)
- Seats need a one-tap "FILL WITH BOTS" (I clicked every seat to join).
- The Party Cup footer text is cut off at "GOL..." on the setup screen.
- The Party Modes title tile says "Teams · Rush · Dumpling" and omits Golden Spoon and the Cup.
- Team Feast "RED 2 vs BLUE 1" is only a text warning; PLAY should block or auto-fill a bot.
- PARTY CUP button starts the cup immediately with no lineup confirmation.
