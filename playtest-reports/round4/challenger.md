# Playtest evaluation — The Challenge Seeker (challenger)

**Fun score: 6 / 10** (Combat and the stomp -> KAIJU power loop are fun and the hard content bites, but the challenge modes are thin, the rules for dying are opaque, and there was little to chase after a loss.)

## What I did
- Gauntlet x3 attempts (~25 /act calls): best run 3 waves (score 310), second run died in wave 2, third restarted by accident. Perks used: Mustard Coat x2, Full Belly, tried Hot Feet.
- Daily Challenge (Hot Dumpling, Fondue Night, first to 3): 2 tries, lost both (best 2 rounds vs 3 needed). Used /act?cmd=auto:hard for many rounds there; this stands in for time passing and I could not micro-manage each one.
- Free Play, 5 players, all bots HARD: 2 matches/many rounds, 0 match wins.
- Story: opened the chapter screen only. Spicy replays are locked behind clearing each chapter (0/12 spicy), and Dessert Course was not reachable. I did not play story chapters (autoplay started Free Play instead of Story, harness quirk).
- Records: 9 matches, 4 won, Gauntlet best wave 3, 4/33 achievements. About 100 curl calls, 7 screenshots. /errors: none.

## What matched my goals / what was fun
- Gauntlet is a clean hook: waves add rivals, perk pick between waves, and the end screen says "NEW BEST". The perk choice (Full Belly / Mustard Coat / Hot Feet) is quick to read.
- Hard bots are actually threatening. They rush cutlery within seconds and chain KAIJU squashes, so I could not coast.
- The stomp-then-power moment is strong; Seed Spray into a fall KO felt great. Hot Dumpling in the Daily is a fun, different rule set.
- Next-up goals on the title ("Clear 5 Gauntlet waves -> Midnight colour (60%)") give me a target.
- Daily fail screen is informative (ranking, rounds, KOs, tries, streak).

## What took too long / was tedious
- Gauntlet only has "first to 1" per wave, so the whole run is 1 round per wave and can end in seconds; a wave 4 loss ended a 3-wave run instantly with no retry/continue.
- Daily is first to 3 rounds, up to 8+ rounds with 4 players; one try is long and I lost both times, with no sense that the second try was different.

## What was over too quickly / too shallow
- Gauntlet waves 1-3 were trivial (1-2 rivals, I won in ~10 seconds each), then wave 4 jumped to 3 rivals on a hazard table and I died. Difficulty feels like a cliff rather than a ramp.
- Perks do not seem to stack meaningfully (picked Mustard Coat twice, then still died instantly to cheese). Only 3 perk options, same every time, so no build variety.
- No Dessert Course or Spicy reachable early for a challenge seeker; the hardest content is gated behind full story clearing.

## Confusing or unclear
- Dying to the Fondue cheese hazard twice (once in Gauntlet with a Mustard Coat, once in Daily) with no warning. /state showed `dangers: []` and edgeDistance 41 when I was near it, so the cheese is not flagged as a danger in the data and I had little way of reading it. The shield perk's text says it "blocks one hit" but not hazards.
- The "you" seat: in the Daily, my player was shown as GOBZILLA in HUD at first and then BUBBLEGUMBO; event text uses both "YOU" and my kaiju name, so who I am in a 4-way is unclear.
- Free Play showed two MOTHBALLs in a result list (auto game 1) - duplicate kaiju in one match is odd.
- The Gauntlet-over screen sometimes had no buttons in /look/shot, only text ("Esc menu" hints not shown on Gauntlet over after the second run). First run showed NEW RUN / MENU buttons; second run showed none and I had to press Enter (which restarted instantly) or Escape.
- Hot Dumpling: bot (auto:hard) kept being "boomed" holding the dumpling; the passing rule ("touch a rival") is easy to miss under pressure.

## Bugs found
- Gauntlet over screen: after losing wave 2 (second run), the NEW RUN / MENU buttons were not rendered (shot art-src/.playtest4/7108/shot-4.png); clicking where they were did nothing; Enter restarted a new run, Escape paused it. First run (shot-3.png) showed them. Repro: lose gauntlet while a rival is still in KAIJU mode / killed by squash, after a prior gauntlet over.
- Free Play result screen once listed "MOTHBALL" twice as separate players (duplicate kaiju seats).
- /errors: none.

## Top 3 changes that would raise my score
1. Make Gauntlet a real ramp and a real run: more than one round per wave (or a lives/HP bar), a smoother 4 -> 5 -> 6 rival climb, bigger perk pool with stacking and rarity, and a run-end screen with a clear "try again" button.
2. Telegraph hazards (fondue cheese edge, dumpling timer) and make the shield perk cover them, so deaths feel earned rather than random.
3. Give challenge seekers reachable hard content: unlock Spicy/Dessert Course sooner or via Gauntlet milestones, and give Daily a reason to retry (varying modifiers, shorter match, or a visible target score).
