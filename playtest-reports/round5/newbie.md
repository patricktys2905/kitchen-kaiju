# Playtest evaluation — The First-Timer

**Fun score: 6.5 / 10** (charming and readable, but the first 10 minutes dump you into a long, flat match with no coaching about the one thing that kills you, and nothing tells you what you earned)

> Note on method: I drove the game through the harness (bots/autoplay for part of the matches), so "feel" is judged from screenshots, text and events, not hands on a pad.

## What I did
- Title screen (shot-1): read the layout, the NEXT UP line, tapped HELP and read all 5 tabs (Basics, Cutlery, Tables, Modes, Practice).
- 1-MINUTE PRACTICE: completed 8/8 (walk, throw, swipe, eat, stomp...), about 25 s of game time. Quitting dropped me back into the Help screen, not the title.
- Free Play: pressed PLAY without joining a seat (the game auto-seated me vs 1 bot, Picnic Blanket, "First to 5"). Played 9 rounds (about 4-5 min), lost 4-5 to Mothball. Then looked at the match end screen.
- Gallery (locked kaiju, locked colour progress), Records, Story chapter 1 (opening cutscene, played on Easy Crabbage, won with 2 stars), the chapter-clear screen.
- 2 matches, about 18 rounds, about 12 minutes. /errors was "none" at start, middle and end.

## What worked for me (briefly)
- The title art and tone are lovely. "Tiny monsters. Giant dinner." sells the game in one line (shot-1).
- The 1-minute practice is a genuinely good idea and the step prompt at bottom-left ("PRACTICE 4/8 👉 SWIPE up close") is clear.
- The round-start tip ("The giant hand goes for whoever has the fullest belly") and the table help text are short and funny.
- Story chapter 1 against an easy Crabbage with a cutscene and a "first to 2" format is the right size for a first win; the chapter-clear screen with a Crabbage quote and star rating feels good.
- Locked items show how far you are (e.g. "0/4 cleared", "6/25 knockouts", "68/100 crumbs"), so I always knew what to do next.

## The single biggest structural problem
**There is no guided first-hour path: the game offers 6 big doors at once and the one the game itself recommends (practice) leads to a very long, low-stakes match with no explanation of the biggest risk and no feedback on what the player gained.**

What I tried: I did practice, then went to Free Play as the profile would. Free Play opened a screen with 6 empty seats, 8 option buttons (BOT LEVEL, TABLE, FIRST TO, TWIST, POWER-UPS, HAZARDS, RANDOM, ONLINE) and "16/20 kaiju" text, and no hint about what to press. Hitting PLAY started a 1v1 that needed **9 rounds** to finish (first to 5, cut-throat, one round per ~30 s). Twice I did exactly what the new STOMP coach asked ("BELLY FULL! PRESS E → KAIJU") and was then knocked off by the Giant Hand (shot-7: the replay banner reads "You got flicked by the GIANT HAND" while the coach is still on screen; in Story ch1 I went KAIJU and died to the hand in the same breath). The hand rule exists only as a 3-second loading-screen tip, so for a first-timer the game's headline power-up looks like a trap. When the match ended (shot-11) the screen only showed placement and "REMATCH / MENU": no XP, no "you unlocked X", no pointer to the next goal, even though the title screen has a "NEXT UP" line that would have been perfect there. The Records screen showed "Matches won 1/10" etc., but I never saw that connection at the moment it happened.

Why it matters for a first-timer: the first match decides whether they ever launch a second. A long match that you lose without understanding why, with no reward moment, ends sessions.

## Big change proposals (2–3, most important first)

### Proposal 1: "First Night" guided onboarding ladder (replace the lone practice button)
- **Problem it solves:** Shot-1 shows "NEW HERE? 1-MINUTE PRACTICE" and a NEXT UP line that assumes you already know what chapter 4 and "Lime colour" are. After practice I was dropped back on the Help screen with no direction. Free Play shows 8 options with no recommended one. I lost a 9-round match without ever being told about the Giant Hand rule or what the bot level means.
- **How it would work (detailed design):**
  - A 4-step ladder shown ONLY while Matches played < 3 (stored in the save), as a banner card above the main row that replaces the NEXT UP strip: "FIRST NIGHT 1/4".
  - Step 1 Practice (existing 8 steps). On quit, route to title, never Help. Add 2 new practice steps at the end: "9/10: Giant Hand! It picks the fullest belly. Step off the red shadow" (spawn a hand against the player, pause-less, with a ring) and "10/10: KAIJU stomp ring: step out of it".
  - Step 2 "Duel an Easy bot": a pre-configured 1v1, Sunday Roast, FIRST TO 2, Easy bots, power-ups ON, hazards OFF (this is Story ch1 already; reuse it and call it by this name). Win OR lose, hand out a reward. Loss shows a one-line reason ("You were flicked by the Giant Hand: don't sit on a full belly").
  - Step 3 "Free-for-all": 3 players (you + 2 Easy bots), First to 3, hazards ON.
  - Step 4 "Pick your kaiju": opens Gallery with the first colour reward equipped.
  - Each step grants a small guaranteed reward (Lime colour on step 2, 1 new kaiju-preview on step 4), shown in a result card.
  - Free Play for a new save defaults to the above Easy settings (Bot level EASY, First to 3, Hazards OFF) with a "Recommended for you" glow on PLAY and the 8 options collapsed behind a "MORE OPTIONS" button until match 3.
- **Example moment:** Mina opens the game, taps the glowing First Night card, completes practice (about 1 min), is dumped into "Duel an Easy bot", goes KAIJU after the coach, sees the hand's red shadow appear, steps aside (thanks to practice step 9), wins 2-1 and gets a "Lime colour unlocked, wear it?" card. She taps Yes and immediately sees her lime kaiju in the next step.
- **Rewards / progression hooks:** The 4 steps give 1 colour + 1 kaiju-preview + the "First Night" achievement; after completion the ladder becomes the existing NEXT UP line. Returning players never see it.
- **Risks and edge cases:** Players who skip it must not feel nagged (a small "Skip, I know this" link on the card). Local multiplayer groups of 4 on one device should bypass the ladder automatically if 2+ seats have joined. Needs a save flag per device, not per player.
- **Size:** M. Touches title screen, practice tutorial, Free Play defaults, Story ch1 messaging, save data.
- **Score impact for me:** +1.0. It is the main reason my score isn't higher: it turns the first 10 minutes from "figure it out" to "win something".

### Proposal 2: A "round recap + what you earned" post-match layer
- **Problem it solves:** At the end of both matches I saw (shot-11) only "MOTHBALL RULES THE TABLE", placement, and REMATCH / MENU. I had progressed Records (6 KOs, 68/100 crumbs, 83% of a "World Tour" achievement) but no screen said so. NEXT UP on the title changed after my match (from "Win a match → Lime" to "Score 25 knockouts → Grape 16%") so the game DOES track this, it just hides it.
- **How it would work (detailed design):**
  - After every match, the result card gets a second page (auto-advances after 4 s, or press Enter): "THIS MATCH": a list of 3 lines max, each with a progress bar, e.g. "KOs +4 → Forked Up 10/25 🎨 Grape", "Crumbs +36 → Crumb Muncher 104/100 ✓ UNLOCKED!", "Story stars +2 → Freezer Shelf table 2/6 chapters".
  - Pick the 3 lines by "closest to completion". Newly-unlocked items get a full-screen toast with the kaiju or colour on it and an "EQUIP / SEE IN GALLERY" button.
  - Also add a "WHY YOU LOST" line to any lost round in the first 5 matches, e.g. "You were flicked by the Giant Hand (fullest belly)" or "You fell off the left edge during a toast".
  - Under the result card show the next NEXT UP line and a big "NEXT: ..." button that jumps straight there (e.g. Story ch 2).
- **Example moment:** After losing to Mothball 5-4, the card reads "Close one! KOs +4 → Forked Up 10/25. Eat 100 crumbs: DONE! 🎨 Crumb Muncher unlocked. NEXT: Story ch2 'Dinner for Four'." The loss feels productive.
- **Rewards / progression hooks:** Gives a dopamine hit on every match, shows the achievement system's depth (34 achievements) that I only discovered by opening Records, and nudges toward Story/other modes (retention).
- **Risks and edge cases:** Must not slow down party play (skip with any button, and hide the second page in 3+ human matches). Team modes need per-team lines. Only show for local profile owner.
- **Size:** S-M. Touches match-end screen, achievement/records tracker (progress deltas), NEXT UP logic.
- **Score impact for me:** +0.7.

### Proposal 3: Shorter default matches and a "Quick Match" door
- **Problem it solves:** Free Play defaults to "First to 5" even against a single bot; my match took 9 rounds and about 4-5 minutes of pure play, with the loser's last-round hope often gone by round 6 (Mothball led 3-1 early; the final was 5-4, nothing to learn from it). A first-timer's attention is gone by round 5. Story ch1 uses first to 2 and was perfect.
- **How it would work (detailed design):**
  - Add a 7th title door (or replace the redundant DAILY/GAUNTLET prominence for new saves): "QUICK MATCH 3 min". One tap = you + 2 random bots at your level, random table, FIRST TO 3, power-ups ON, hazards on at medium. Bot level auto-picks from your last 5 results (win 3 in a row: +1 level; lose 3: -1 level) so it adapts. Show a "Bot level" chip, not a menu.
  - Free Play's default FIRST TO becomes 3 (options 2 / 3 / 5 / 7); a match that has run 12 rounds ends with a sudden-death "Golden Round" instead of dragging on.
  - Show a round counter "Round 4/5" (max rounds = 2*N-1) rather than only the star row, so players can read progress at a glance. In the top HUD (shot-11) only a row of stars is shown.
- **Example moment:** After her first win, Mina taps QUICK MATCH, three bots, 3 min later she's seeing the "what you earned" card from Proposal 2, and taps it again, because it never asked her any questions.
- **Rewards / progression hooks:** Gives one repeatable "play again" button, which the current title screen lacks (every door requires choices); feeds win-streak and achievement counters faster ("Win 10 matches" is otherwise an hour-long grind).
- **Risks and edge cases:** Adaptive bot level can feel patronising: show it and let players override; for online/local groups it does not apply.
- **Size:** S-M. Touches title screen, Free Play defaults, match config, bot-level logic.
- **Score impact for me:** +0.6.

## How the new features from this round felt
- **STOMP coach:** The visual prompt is the right idea (bouncing text above the kaiju, readable on busy tables: shots 7 and 19). Problems: it says "PRESS E" in Free Play but "PRESS STOMP" in Story and practice, so it's unclear which is a keyboard prompt vs. a button name; and nothing warns that a full belly is exactly what the Giant Hand targets (I died to the hand twice with the coach still showing). The bigger version: the coach should add a context line when a hand is imminent ("Hand incoming: STOMP NOW or MOVE") and turn red when a hazard targets you.
- **KAIJU counterplay (ring, shrink warning, dizzy):** In harness play I could not read these precisely (frozen frames); I saw "YOU went KAIJU" and no event for dizzy. For a first-timer the larger issue is that the ring/warning aren't introduced anywhere: Help > Basics doesn't mention them and the practice ends with a stomp but no counterplay step (see Proposal 1).
- **Gallery progress:** Excellent for a new player: "Unlock: Beat Story chapter 4: Boss of the Belt (0/4 cleared)" and "Ocean: Win 10 matches (0/10)" tell me exactly what to do. This is the clearest guidance in the whole game, and it deserves to be on the post-match card too. Note: the save I got already had 16/20 kaiju unlocked, while Gallery said "0/4 cleared" for Story; a true first-timer would see more locked cards, so I could only judge the shape of it.
- **Gauntlet lives / Golden Spoon / CUP LENGTH:** Not touched; as a first-timer I'd skip them. Golden Spoon is described in Help > Modes in one clear sentence, which is nice. Note that Help > Modes is the only place party modes are explained before choosing them.

## Bugs that block play
- None blocking. /errors was "none" at start, middle and end.
- Soft issue: after finishing practice and choosing QUIT from the pause menu, the game returns to the Help screen (tab Practice) rather than the title/Free Play, so a first-timer must back out and find the next door alone.

## Small notes (max 5, one line each)
- Free Play lets you press PLAY with zero seats joined and silently seats you vs 1 bot, which is confusing next to "click or THROW to join".
- The Free Play options row has 8 equally weighted buttons; the key ones (BOT LEVEL, FIRST TO) should be bigger than TWIST/POWER-UPS/HAZARDS.
- Help > Controls text is cut off in /look ("...SWIPE: a close-range sm") and long: a pictogram of keys would read faster than a paragraph.
- Your kaiju is called GOBZILLA in matches but "GOBZILLA JR." in Free Play/Story seat labels; pick one name.
- The "NEXT UP" line on the title is tiny (about 12 px) and in a similar colour to the scenery; it's the best guidance in the game and is easy to miss.
