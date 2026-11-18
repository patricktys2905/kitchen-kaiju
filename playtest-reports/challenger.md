# Playtest evaluation: The Challenge Seeker (challenger)

**Fun score: 5.5 / 10** (the challenge content is thin, has no scoring depth, and gives me almost no reason to return after one session)

## What I did
- Title screen, then Gauntlet run 1 (hard bot in my seat): cleared wave 1, lost a life on wave 2, retried and cleared it, cleared wave 3 on the last heart, then GAUNTLET OVER ("You cleared 3 waves, NEW BEST, Score 300").
- Daily Challenge (today = HOT DUMPLING, Fondue Night): 1 try, FAILED ("best 0 rounds, tries 1, win streak 0 days"). Looked at the failed screen (shot-6).
- Story: opened chapter 1 (cutscene, skipped with S), cleared it (2 stars), then replayed it with SPICY ON and got "SPICY CLEAR! Feeling Spicy!" (but Story stars stayed at 2).
- Gauntlet run 2: reached wave 4 cleared, died on wave 5 (3 lives, hearts went 3 -> 2 -> 2 -> 1 -> 1, "You cleared 4 waves, NEW BEST, Score 410"). I chose Ghost Start, Extra Life and Full Belly.
- Records screen (10 matches played, 5 won, ACHIEVEMENTS 4/34).
- About 55 harness commands. /errors was empty at start, middle and end.
- Never reached Dessert Course (locked behind 18 story chapters), and Spicy ch 2+ is locked behind clearing them first.

## What worked for me (briefly)
- Lives are a good idea: "LIFE LOST! 2 left, trying wave 2 again with your perks" is clear, and a failed wave no longer ends a 10-minute run.
- The perk draft between waves (PICK A PERK 1/2/3, shot-2) is the best moment in the mode. Ghost Start / Extra Life / Sugar Rush / Full Belly are legible choices.
- Spicy toggle per chapter ("SPICY: ON (tougher rivals)") is a clean, opt-in difficulty switch, and the Story map shows a separate 0/12 spicy counter.
- The Daily recap shows a ranked list of the 4 participants with rounds and KOs; that is a good template.

## The single biggest structural problem
**Challenges are a flat, unscored, unrewarded ladder with nothing to chase after the first attempt.** I went straight to the hardest content as a challenge seeker would. The Gauntlet gave me 100 points per wave and a "Best wave 3" tag on the title screen, nothing else: no currency, no star, no unlock, no leaderboard, no run history, no modifiers to make a second run different from the first. The Daily is a single Hot Dumpling match that I lost, and the result screen says "Today: not won yet, tries 1, win streak 0 days" with the only prize being a streak counter. Spicy ch 1 gave an achievement but no star (Story stayed at "2/36"), and its difficulty was trivially beaten by a hard bot, so it never felt "tough". The hard content is also silo'd: Gauntlet, Daily and Spicy each live on a different screen and none feeds the others or the Gallery. A challenger needs a clear skill ceiling, a visible "how good was this run" number, and something to unlock for being good. Today the loop is "play, die at wave 4, see 'NEW BEST', go away".

## Big change proposals (2–3, most important first)

### Proposal 1: Gauntlet rebuild into "The Endless Banquet" (scored, modifiable, rewarded roguelite runs)
- **Problem it solves:** Gauntlet run 1 ended "Score 300", run 2 "Score 410". The scoring is basically 100 per wave plus a tiny KO bonus; there was no way to tell a great run from a lucky one. Waves 1-3 are the same loop (1 rival, 2 rivals, 3 rivals, all just "more bots"). The perk offers repeated (Ghost Start came up in 3 drafts; Mustard Coat in 3) with no stacking or synergy, so run 2 felt identical to run 1. Extra Life was offered at waves 1, 2, 3 but not always, which feels like luck, not skill.
- **How it would work (detailed design):**
  - **Run structure:** a run is 12 waves in 3 "courses" of 4 (Starters, Mains, Desserts). Every 4th wave is a boss wave (a single KAIJU-mode champion with a unique pattern, e.g. a "Head Chef" that throws a pan every 4 s, a "Giant Hand" table that slides). Waves 1-3 of a course stay the existing "1, 2, 3 rivals" shape, but every wave carries one **wave rule** from a deck of ~12 (e.g. "Slippery Table: low friction", "Hot Soup: rim hazard", "Double Crumbs", "No Dash", "Rivals start KAIJU-ready"). The rule is announced on the intro card (where the tip text sits now, shot-5 style) so skill, not RNG, decides.
  - **Score formula (shown live in the HUD and in a breakdown on GAUNTLET OVER):** 100 per wave, +25 per KO, +50 flawless wave (no hit taken), +10 per second left on a 60 s par timer, +200 boss, x(1.0 + 0.25 per life still unspent) at end. Show a letter grade (D to S) with thresholds (S = 4,000+ for a full 12-wave run).
  - **Perks:** draft remains 3-of-N, but split into 3 categories (Offence, Defence, Utility) with one of each always offered, and **perks stack to level 3** (Ghost Start 3 s / 4 s / 5 s; Mustard Coat blocks 1 / 2 / 3 hits). Add 2-3 synergy perks ("Sugar Dash": dash shoves rivals; "Spicy Belly": full belly adds 10 s of KAIJU). Add a **reroll** token (1 per run, 2 with the Records "Gourmet" achievement).
  - **Lives:** keep the 3 lives, but a lost wave retry keeps the same rivals and rule (in run 1 wave 2 changed from MOTHBALL+BLOBLIN to SQUIDGEON+BLUEBEARY on retry, which made "retry" feel like a coin flip, not a lesson). Extra Life is removed from the perk pool and instead awarded after each boss.
  - **Between runs:** a **Gauntlet Pantry** screen (reachable from the Gauntlet card and GAUNTLET OVER) shows best score per course, best grade, total runs, and a "Chef Level" (XP = run score / 10). Chef levels 1-20 unlock new perks into the pool, new wave rules, and cosmetic "Chef Hat" frames in the Gallery.
- **Example moment:** Wave 7 card: "COURSE 2 · WAVE 3 · DOUBLE TROUBLE · rule: SLIPPERY TABLE". I take the Defence perk "Mustard Coat II" and the Offence perk "Sugar Dash". I clear the wave without a hit (+50 flawless, par timer +140), the HUD ticks up "2,310 · Rank A". Boss at wave 8 telegraphs a pan slam with a red ring; I dodge it and win. GAUNTLET OVER shows a breakdown, "A rank, Chef XP +230, Level 4 reached: unlocked perk Spicy Belly".
- **Rewards / progression hooks:** Chef Level unlocks perks/rules; first-time S rank per course gives a colour style (e.g. "Flambe" for course 1) so it plugs into the Gallery and the "NEXT UP" ticker on the title; a weekly "best run" display for the device; personal run history (last 10 with seeds).
- **Risks and edge cases:** more content to balance; stacking perks can break (Ghost Start at 5 s on a 4-rival wave); needs a seed so a run can be shared and replayed. Phones: cards must fit the 3-card perk row (they do today). Online: keep solo-only; local-only run history is enough.
- **Size:** L (Gauntlet mode, perk system, new wave-rule hooks into table/hazard code, boss AI, result screen, Records/Gallery hooks).
- **Score impact for me:** +2.0. This is the single change that turns "dies at wave 4, shrug" into "one more run".

### Proposal 2: A real Daily/Weekly challenge system with a rotating ruleset, rewards and a local ladder
- **Problem it solves:** The Daily was one Hot Dumpling match with a 4-line scoreboard; "FAILED" gave me "Today: not won yet, best 0 rounds, tries 1, win streak 0 days" and "1 / START rematch" with nothing at stake. It showed me in a kaiju I did not choose (BUBBLEGUMBO) with unknown bots, so I could not plan or practise. The result list also confusingly ranks "3. BUBBLEGUMBO (YOU) 0 rounds, 4 KOs" below a bot with 1 round and 0 KOs, with no explanation of why I lost the "match" while holding the most KOs. There is no reason to open Daily more than once.
- **How it would work (detailed design):**
  - **Daily card on the title** (replaces "Today: HOT DUMPLING") shows 3 tiers as chips: Bronze "Win", Silver "Win without losing a round", Gold "Win with today's **Objective**" (e.g. "Win using only thrown cutlery", "Win with 0 falls", "Win in under 90 s"). Rules, table, mutator, kaiju and bot level are fixed per date (seeded) and shown on a pre-match briefing screen with the objective and a 10 s "practice" button.
  - **Weekly Gauntlet-style ladder:** a "This Week" strip: 7 daily seeds; completing tiers earns "Daily Tokens" (Bronze 1, Silver 2, Gold 3). The 7-day streak calendar (each day a plate that fills) pays: 3 days = 1 colour crate, 7 days = a weekly exclusive style ("Weekly Gold Fork").
  - **Retries:** unlimited, but only the best result counts; each try shows a delta "your best: Silver; this try: Bronze".
  - **Local + (optional) online ladder:** local top-5 per day on this device, plus a share code ("KK-1118-GOLD-72s") a family can compare; an online leaderboard is a later add-on.
  - **Result screen:** replace the generic 4-row list with a tier banner, objective check marks ("Win ✓, No falls ✗, Under 90 s ✓"), tokens earned and a "Try again for Gold" button.
- **Example moment:** I open the title. The Daily card says "TODAY: HOT DUMPLING · Gold: pass it on 5 times and never hold it at 0 s · streak 3". I read the briefing, press Practice for 10 s, then play. I win with the fuse going off on a bot but I held it at 0 s once: Silver, 2 tokens. The result screen says "Gold needs a clean run: try again?" and I hit it until I get Gold.
- **Rewards / progression hooks:** tokens spent in a small "Pantry shop" for cosmetic colours (ties to the Gallery's locked-colour progress) and Gauntlet perks; streak calendar; weekly exclusive.
- **Risks and edge cases:** the seed must be deterministic (check Hot Dumpling and Golden Spoon with the same RNG seed); time zone rollovers; if the player has not unlocked the daily's kaiju or table the daily must lend them (it already did: I was given Bubblegumbo). Not offering a daily every mode (e.g. Online) to avoid empty days.
- **Size:** M (Daily mode data, objective checkers, title card, result screen, token store, Records).
- **Score impact for me:** +1.2. It adds a reliable daily hook, but it only pays off once Proposal 1 has given tokens somewhere to go.

### Proposal 3: Spicy and Dessert Course as a unified "Hard Mode ladder" with a Master Chef rank
- **Problem it solves:** Spicy ch 1 ("tougher rivals") was beaten by a hard bot at the same pace as normal, and returned "SPICY CLEAR!" plus an achievement but no Story-star change ("Story stars ★ 2" before and after; the Story header says "🌶️ 0/12"). The title's NEXT UP ticker points me at "Story ch 4", so a challenger is steered to the easiest chapters. Dessert Course is behind 18 chapters, so a challenger cannot reach it in one session. I could not tell what "tougher" meant (more rivals? smarter? faster?) before pressing play.
- **How it would work (detailed design):**
  - **Spicy has 3 heat levels** (🌶️, 🌶️🌶️, 🌶️🌶️🌶️), shown on the chapter card with an explicit list of changes: Heat 1 = rivals one bot level up and +1 rival; Heat 2 = + a chapter mutator (e.g. "Greasy Floor") and rivals start with 25% belly; Heat 3 = + boss gets a second phase and you have a **no-checkpoint** rule (lose a round, lose the "no rounds lost" requirement, but still can finish).
  - Each heat level gives 1 spicy star (so 36 normal + 36 spicy = 72), and totals feed a **Master Chef rank** (Apprentice, Line Cook, Sous, Head Chef, Master Chef) shown on the Story header and Records. Ranks unlock gear: apron/hat overlays in the Gallery, a Master Chef title on the Daily scoreboard.
  - **Early Dessert Trial:** unlock a 3-match "Dessert Trial" (a mini-boss rush) after clearing Story ch 4 so a challenger gets a hard-feeling endcap early, and it points the NEXT UP ticker at it.
  - **Retry help for hard content:** after 2 losses on a Spicy chapter offer a "Chef's Tip" card listing the boss's pattern and which of the player's kaiju counters it, so hard is fair.
- **Example moment:** I clear chapter 4 on normal and the NEXT UP ticker says "Dessert Trial unlocked: 3 bosses, 3 lives". I choose Heat 2 on chapter 5: the card says "Rivals start half-full, Greasy Floor". I lose one round, the retry tip tells me "BLOBLIN's KAIJU ring takes 1 s to fill: step out", I win and get 🌶️🌶️ and a Line Cook rank-up toast.
- **Rewards / progression hooks:** a spicy star counter next to ★, Master Chef ranks, exclusive colour styles per Heat 3 chapter clear, a "Spicy 36/36" achievement.
- **Risks and edge cases:** bot-difficulty tuning (a hard bot already beat Heat 1 at the same speed as normal: stats need real numbers); more content to write for 12 chapters x 3 heats; players who never touch Story won't see it.
- **Size:** M-L (Story data, chapter card UI, bot difficulty tables, mutators, ranks, Gallery rewards).
- **Score impact for me:** +1.0. It gives the existing Spicy toggle meaning and makes the hardest content reachable earlier.

## How the new features from this round felt
- **STOMP coach:** I only saw the Gauntlet and Daily through the bot, so I could not judge the prompt visually; `/look` showed "STOMP READY!" in the HUD instead. In Story ch 1 the HUD shows the state text, so the coach seems to work. No further comment.
- **KAIJU counterplay (ring before the stomp, shrink warning, 0.75 s dizzy):** I could not read it through the bot-driven runs (I only saw "KAIJU MODE!" status text, with rival rings visible in shot-6). It is a great idea for a Gauntlet boss (bosses with telegraphed stomp rings are exactly the "hard but fair" pattern I want). It needs to be the base of boss waves: see Proposal 1.
- **Gallery progress:** not visited, so no opinion.
- **Gauntlet lives:** works and reads clearly (LIFE LOST! 2 left). The weakness is that the retry re-rolls rivals (wave 2 first MOTHBALL+BLOBLIN, then SQUIDGEON+BLUEBEARY), and Extra Life shows up as just another perk instead of a reward. Ghost Start and Extra Life are good but the pool is tiny (about 7 perks seen: Extra Life, Mustard Coat, Hot Feet, Ghost Start, Sugar Rush, Full Belly), with repeats within the same draft sequence. A bigger version is Proposal 1.
- **Party / Golden Spoon / Cup length:** not visited (not my profile).

## Bugs that block play
- None blocking. /errors was "none" at start, middle and end.
- Possibly confusing (not blocking): in the Daily results screen (shot-6) I was ranked 3rd with "0 rounds, 4 KOs" despite having the most KOs, and the banner just says "DAILY CHALLENGE FAILED" with no reason. The scoreboard says "3 rounds . 3 KOs" for GOBZILLA, which is the bot seat, and the screen shows two GOBZILLA sprites, so it was hard to tell who I was.

## Small notes (max 5, one line each)
- Gauntlet title card says only "Best wave 3": show best score and grade too.
- Perk draft repeated Ghost Start / Mustard Coat across drafts; filter out perks already owned (or stack them visibly).
- Spicy chapter toggle text "tougher rivals" should list exactly what changes.
- Cutscene dialogue box hides the chapter map and the "SKIP CHAT (S)" hint is small; first Story launch from the PLAY button needed a click plus S.
- The NEXT UP ticker only ever points at Story ch 4 for a challenger; add Gauntlet/Daily goals to it.
