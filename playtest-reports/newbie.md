# Playtest evaluation — The First-Timer (newbie)

**Fun score: 7 / 10** (gorgeous, instantly readable, short punchy rounds; the first-timer path works, but I never really felt my own skill, and the tutorial doesn't teach charge/aim, so my fun was partly the bot doing the playing)

## What I did
- Title screen -> HELP (read Basics) -> PRACTICE (8-step guided tutorial; completed all 8 steps incl. throw, knockout, swipe, stomp/KAIJU, power) -> Pause -> QUIT (dropped me back on the Help screen, not the title).
- Free Play: 1v1 vs bot (won 5-1 on first to 5), then 5-player match (played 3 rounds, won 1).
- Story ch1 "The First Course" (won 2-1, 2 stars) and ch2 "Dinner for Four" (lost a round in a 3-way, did not finish).
- About 60 calls, 21 screenshots. No JS errors (/errors = none).
- Note: I used the harness's "attack" bot for moment-to-moment play (can't do real mouse/keyboard timing), so my feel for charge-aim throws is limited.

## What matched my goals / what was fun
- Title screen looks fantastic: big readable logo, cute characters holding cutlery, and a clearly highlighted "NEW HERE? 1-MINUTE PRACTICE" button. I knew where to start instantly.
- Practice tutorial is great: one instruction at a time at the bottom, with a progress counter (1/8...8/8), "All done!" at the end. Taught me the loop (throw, grab missed cutlery, swipe, eat crumbs -> stomp -> KAIJU).
- Core idea is understood in seconds: knock people off the table. Rounds are about 5-15 seconds, so losing never stings.
- Art, tables (Breakfast Rush, Sushi Bar, Chef's Board) and round-win banners are charming. Little feedback lines ("GOBZILLA skewered DUMPLORD") are funny and clear.
- Story map is clear: locked chapters, star goals explained (no rounds lost = 3 stars), a "NEXT UP" hint on the title screen, and the chapter-clear screen has NEXT / REPLAY / MAP.
- Free Play setup is easy: click seats to add bots, big PLAY button.
- KAIJU transformation and cutscene-style character intros give personality.

## What took too long / was tedious
- Story ch1 start: the opening cinematic, then a chapter intro cinematic, then a dialogue box, each needing SKIP/Space presses before I could play. About 4 clicks to reach the first match; I clicked PLAY twice because the first click seemed to do nothing visible.
- 3-2-1 countdown plus round-end banner plus waiting between rounds adds up when rounds are only 5s.
- In a 5-player free-for-all, long stretches where I was out and just watching (with "fast forward, only bots left").

## What was over too quickly / too shallow
- Rounds over in seconds; a 1v1 vs a Normal bot felt like a coin flip, with little room to show skill.
- Practice ends with a lone dummy; never practised charging a throw for distance or dodging hazards, which the loading tip mentions.
- Chapter 1 gives only one easy rival and finishes in about 3 rounds.

## Confusing or unclear
- Title: six mode tiles (Story / Free Play / Online / Party Modes / Daily / Gauntlet) with only tiny subtitles; I'd want to know which is "the real game". The tile hint line "ENTER / A / tap to start" is small and faint.
- Practice QUIT sends you to the Help page, not the title, which feels odd.
- Free Play 1v1 started with just 1 bot after I clicked only one seat; "2 at the table" text is at the very bottom and small.
- Help "MOVES" text is a dense wall at small size; a picture/diagram of the buttons would help. Stomp requires a full belly but I only learned that from the practice prompt.
- On a 5-player table the kaiju colours/names in the top bar are tiny and it's hard to tell which creature is me (a ring helps, but only a faint one).
- Dialogue box covered the story screen and the "tap / SPACE" prompt is small.
- Why did a chapter I won 2-1 give only 2 stars? The explanation is on screen, but it is easy to miss.

## Bugs found
- No JS errors from /errors.
- Minor UX: from Story, clicking PLAY while an opening cinematic overlay is active seems to be swallowed (needed to click SKIP then PLAY again). Repro: Story screen first visit, click PLAY at [1070,640].
- Minor: Pause -> QUIT in Practice lands on Help screen instead of title.
- Screenshots: art-src/.playtest4/7104/shot-15.png (opening cinematic), shot-18.png (dialogue overlay), shot-14.png (5-player table).

## Top 3 changes that would raise my score
1. Cut the friction before the first story match: one skippable intro, remember "skip" choices, and make the first PLAY click always start the match.
2. Extend practice with a charge-throw/aim target and a hazard-dodge step, plus a one-line "what is each mode" on the title tiles so a new player knows where to go after practice.
3. Make rounds feel more skill-driven for beginners (easier default bot / aim-assist in early chapters) and make my own kaiju stand out more in multi-player rounds (bigger ring, name tag over head).
