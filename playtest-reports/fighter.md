# Playtest evaluation: The Fighter

**Fun score: 6.5 / 10** (the moment-to-moment brawl and the KAIJU spectacle look great, but I found no mastery ladder: no way to learn, measure or prove skill beyond "bot level HARD, first to 5".)

> Scope note: I played through a blunt harness (`attack`, `crumbs`, `stomp`, `power`, `auto:*`, 1-4 s steps), not real controls. My judgements on feel and readability come from the screenshots and event logs, not from hands on a stick. Where I say "fair" or "unfair" I mean what the logs and visuals showed.

## What I did
- Title, Free Play setup (set BOT LEVEL to HARD, joined one seat, 1v1 vs BUBBLEGUMBO), about 2.5 matches (lost 2-5 and 0-5, third match unfinished in the log), roughly 10 rounds.
- Went KAIJU twice by hand (`crumbs` to belly 100, `stomp`, `power`), and watched `auto:hard` do it twice.
- KAIJU Gallery: read the power text for Gobzilla, Squidgeon, Crabbage, Bobloin, Mothball, Toastbat, Dumplord and two locked entries (collection 62%, 16/20 kaiju).
- Gauntlet: wave 1 won (earned the Lime colour and a perk screen), picked Extra Life, wave 2 (3-way free-for-all) lost, got the LIFE LOST retry screen. Wandered into the Workshop by accident and Escaped out.
- `/errors` checked at start, middle and end: always "none".
- About 55 harness commands.

## What worked for me (briefly)
- The KAIJU transformation reads well. Shot-7 shows a big range ring, a yellow charge ring and a dust ring. I could see the stomp zone before it landed (new counterplay ring works as a read).
- KAIJU vs KAIJU is a real moment: shot-8 shows two giants colliding with overlapping rings and the "GOBZILLA got FLIPPED like a pancake" caption plus an automatic instant replay. That is the best-looking beat in the game.
- Kaiju roster powers are distinct on paper (Ink Cloud blind, Claw Snap short and strong, Wobble Wave ring, Flutter long blink, Pop-Up forward shove, Steam Burst push-away). Traits (Longer swipe reach, Hard to shove, Light and quick) give each one an identity.
- Hazards that kill KAIJU and non-KAIJU alike (cheese, the giant hand "goes for whoever has the fullest belly") are a clever anti-snowball idea.
- Gauntlet's perk draft (Ghost Start / Hot Feet / Extra Life) and "retrying wave with your perks" is the right skeleton for a roguelite run.

## The single biggest structural problem
**There is no combat mastery loop: nothing teaches, measures or rewards getting better at fighting.** I was trying to do what a fighting-game player does: learn the rules of the engine, then climb. The game gave me exactly one knob (BOT LEVEL: easy / normal / hard) and one structure (first to 5 rounds). On HARD I lost 2-5 and 0-5 by doing the obvious thing, and the match-end screen only told me "BUBBLEGUMBO RULES THE TABLE" plus a KO and crumb count. It never told me why I lost: no breakdown of how I died (cutlery / fall / hazard / KAIJU squash), no stat on my KAIJU timing, no hint at what the bot did better. Of my five round losses in the logs, four were `knocked out by cutlery` or `fall` while I was on a plain tap-to-crumb plan, which is exactly the lesson a trainer should teach ("you were eating while a rival was armed").

It matters for a Fighter because the game's surface is rich (15 tables, 20 kaiju, 6+ powers, twists, hazards) but all of that variety is an unlabelled sandbox. There is no place where I learn how a dash trades with a swipe, how to bait a stomp ring, how to punish the 0.75 s dizzy, or which kaiju counters which. And there is no endgame for someone who beats HARD: HARD is the ceiling, so after winning a handful of matches the Fighter has nothing left to chase except achievements.

## Big change proposals (2-3, most important first)

### Proposal 1: Dojo + Ladder ("Kaiju Dojo"): a skill-based ranked solo ladder with a built-in trainer
- **Problem it solves:** Everything above: no teaching, no post-fight feedback, no difficulty above HARD, no reason to keep fighting bots once you can win. Seen in the match-end screen (shot-4: just a podium and two awards) and in my repeated identical losses with no signal.
- **How it would work (detailed design):**
  - New title tile "DOJO" (replace nothing; fits beside Gauntlet). Three tabs: TRAINING, LADDER, REPLAYS.
  - **TRAINING (12 short drills, each 30-60 s, pass/fail with 3 medals).** Examples with numbers: "Step out of the stomp ring" (a scripted bot goes KAIJU 6 times; dodge all 6 by leaving the ring; gold = 6/6), "Punish the dizzy" (a bot ends KAIJU; land a hit inside the 0.75 s window 5 times), "Edge control" (shove a bot off in under 20 s using only dash), "Disarm" (steal 3 cutlery without throwing), "Throw lead" (hit a moving bot with 5 of 8 throws), "Hazard bait" (get the bot hit by the cleaver 3 times), plus one drill per power archetype (blink, cone, ring, push, blind).
  - **LADDER (solo, 1v1, fixed rules: first to 3, fixed table pool, no random power-ups).** A rating called **Spice Rank** with 8 tiers (Crumb, Bun, Roll, Fork, Blade, Cleaver, Chef, Grand Chef). Each win vs a bot of the tier's strength gives +20, a loss -15, bots are hard-coded personalities ("Camper", "Rusher", "Thrower", "KAIJU-rusher", "Thief") with their own named tells, so beating a Rusher needs different play than beating a Camper. Above HARD, add two new bot levels, BRUTAL (reads dashes, baits stomp rings) and MASTER (perfect timing, only mistake-prone in KAIJU mode). Promotion = best-of-3 (5-round sets are too long to repeat).
  - **Post-fight breakdown screen** after every ladder match (and Free Play with a toggle): a card with (a) "How you died": icons and counts for cutlery / fall / hazard / KAIJU squash / hand, (b) "KAIJU report": times you went KAIJU, seconds used, KOs while giant, times you were caught during the 0.75 s dizzy, (c) "Missed opportunities": number of rounds where the rival was dizzy or unarmed and you did not hit them (computed from state), and (d) one **coach tip chosen from the data** ("3 of your 4 deaths were to thrown cutlery while eating: try grabbing a knife first").
  - **Replays tab:** the last 10 matches as auto-saved instant replays (the game already makes one, "INSTANT REPLAY" in shot-2 and shot-8). Add scrub and a "show hitboxes and rings" toggle so a Fighter can study why a throw missed.
- **Example moment:** I lose a ladder match 1-3 to a "Rusher" bot. The breakdown says "Deaths: 2 cutlery, 1 fall. You crumb-ate with a rival armed 6 times. Tip: grab cutlery first when the rival is the Rusher." I tap "Drill: Disarm" from the card, clear it in 20 s, go back, win 3-2, and get +20 Spice Rank. Over a week I climb from Bun to Blade because I can see what I fixed.
- **Rewards / progression hooks:** Spice Rank tier badges, one new colour style per two tiers (ties into the Gallery's existing achievement-gated colours, seen locked in the Gallery as 2/15), a profile card ("Cleaver, 71% win vs Rushers, best drill streak"), and a visible "next promotion in X points". Drill medals unlock a dojo-only table. Brings the Fighter back daily because rank decays slowly if you stop (soft -10 per week above Blade).
- **Risks and edge cases:** Ladder needs bots with distinct, readable behaviour; MASTER must not be unfair (cap reaction time at about 250 ms). Coach tips can be wrong or nagging: show one tip, never block the screen, allow "don't show again". 2-6 player couches are unaffected (ladder is solo only). Phones: drills need a touch-friendly stomp button and ring visibility; keep drill count to 12 to limit tuning.
- **Size:** L. Touches: bot AI (new personality profiles and two levels), match-end screen, stats tracking (death-cause counters already exist as the event log shows `knockedoutby...(cutlery|fall|squash|hand|flip)`), a new menu scene, achievements, and the Gallery.
- **Score impact for me:** +1.5. This is the system that turns "a fun brawl" into "a game I can master".

### Proposal 2: KAIJU rock-paper-scissors rework + "Counter Window" stat layer
- **Problem it solves:** In my two KAIJU matches the outcome was decided by who stomped first, not by a read. Event logs: (1) I went KAIJU, then "BUBBLEGUMBO went KAIJU" in the same step; (2) next step both used powers and I got "knocked out (flip)" immediately; (3) in Gauntlet wave 2 I used my power twice, then "knocked out by NORIGON (squash)". KAIJU vs KAIJU looks superb (shot-8) but plays as a coin flip with a ring I cannot meaningfully react to when the other giant is already on top of me. Also the Gauntlet hand KO'd me at the moment I went KAIJU ("YOU went KAIJU" then "knocked out (hand)"): the fullest-belly rule punishes the action the coach just told me to do.
- **How it would work (detailed design):**
  - Give every kaiju power one of **three classes**, shown by icon in the Gallery and above the kaiju: **Zone** (Wobble Wave, Steam Burst, Seed Spray: ring or cone that controls space), **Burst** (Claw Snap, Pop-Up, Flutter: fast, short, single-target, hard to dodge when close), **Trick** (Ink Cloud, plus new ones: decoys, swaps). Rules: Burst beats Zone (it is inside the ring before the push lands, a 0.2 s windup advantage), Zone beats Trick (the ring covers the decoy), Trick beats Burst (blind or swap makes the dash miss). Tune so each is about 65-70% against its prey class.
  - **Counter Window:** the new 0.75 s dizzy gets a pair, a 0.25 s **"perfect step-out"** reward: if you leave a stomp ring in the last 0.25 s (the flashing portion) your next dash is free and +50% distance. That makes the new ring a skill check, not just a warning.
  - **KAIJU entry changes:** going KAIJU takes a 0.6 s "roar" that you cannot be hit during but cannot move in, with the stomp ring starting to charge. A rival who is also full gets a "counter-roar" prompt: both press E inside 0.3 s and the roars clash (both bounce away, both keep KAIJU). This removes the coin flip in simultaneous transformations and gives a real "read".
  - **Hazards:** the giant hand targets the fullest belly only when that kaiju is NOT in KAIJU mode (so it threatens the stalling hoarder, not the one who just paid the cost).
  - Surface it: the Gallery entry shows class, "beats / loses to" icons, and a one-line "how to play against" tip.
- **Example moment:** NORIGON goes KAIJU with a Zone ring. I am a Claw Snap (Burst) kaiju at full belly. I do not stomp: I wait for his ring to fill, step out in the last 0.25 s (free dash), hit him inside the 0.75 s dizzy for the KO. The replay shows the ring and the dash line.
- **Rewards / progression hooks:** Per-class mastery counters ("Zone KOs 30 / 100") feed new achievements and colours; "Perfect step-out" and "Counter-roar" become Records entries; ladder (Proposal 1) uses classes for bot picks.
- **Risks and edge cases:** Three classes across 20 kaiju need a careful pass (some current powers straddle classes). A clash mechanic may confuse new players: show only after 5 KAIJU uses, like the stomp coach. Online latency: counter-roar window must be at least 0.3 s. 6-player chaos: apply class rules only between two combatants and ignore in crowd.
- **Size:** L. Touches: power definitions for 20 kaiju, KAIJU entry, hazard targeting, Gallery text, new tutorial drill hooks.
- **Score impact for me:** +1.0. Gives KAIJU depth and a reason to learn all 20 powers.

### Proposal 3: "Fight Lab" custom match rules and a persistent boss ("Head Chef") campaign for combat players
- **Problem it solves:** Free Play only exposes BOT LEVEL, TABLE, FIRST TO, TWIST, POWER-UPS, HAZARDS: I cannot construct a mirror match to test a power, cannot fight a specific bot, and I only saw 1 rival because the default seating gave me one. Gauntlet is the only "hard" mode and it is random and short (wave 1 was a single round, about 12 s) with 3 lives; there is no boss and no end.
- **How it would work (detailed design):**
  - **Fight Lab** is Free Play with: choose each bot's kaiju, bot personality and level per seat, start belly (0 / 50 / 100), start cutlery (none / random / chosen), KAIJU on/off per seat, handicap damage (50-150%). Save 6 presets. Great for the ladder drills and for sparring against a bot with your own favourite.
  - **Gauntlet v2, "The Head Chef Run":** 12 waves, boss wave on 4/8/12. Boss waves are scripted: wave 4 "The Butcher" (always KAIJU at 50 s, 2 phases), wave 8 "The Pastry Twins" (2v1 with shared health), wave 12 "Head Chef" (rotating table hazards, a 3-attack pattern the player learns). Perks scale: pick 1 of 3 each wave (new: Parry Window +0.1 s, Cutlery Magnet, Armour Crumb) and **lives refill only at boss waves** (so a bad run is punished meaningfully). Retry restores perks but resets the wave timer.
  - Record: best wave, clear time, perks used; weekly "Run Modifier" (e.g. Low Gravity, Fast Hand) with its own leaderboard and a colour reward at wave 12.
- **Example moment:** I load a Fight Lab preset (Gobzilla vs MASTER Crabbage, start belly 100) to practice the dizzy punish. Later in the Head Chef Run I reach wave 4, beat the Butcher using a step-out, pick Parry Window, and bank my lives refill.
- **Rewards / progression hooks:** New colour styles for boss clears (extends the Gallery's 2/15 colour progress), a "Head Chef clears" Records stat, weekly modifier leaderboard keeps me coming back.
- **Risks and edge cases:** Boss scripts are authoring-heavy (3 bosses). Weekly modifiers need a QA pass. Gauntlet's current "1 round per wave" is fast; bosses need 2-3 rounds. Online: boss runs solo only at first.
- **Size:** XL (bosses) with a free first slice: Fight Lab is M, Gauntlet 12 waves + perks is M, bosses L.
- **Score impact for me:** +0.8. Gives the hard-content path an ending and Fight Lab gives practice tooling.

## How the new features from this round felt
- **STOMP coach:** I saw "BELLY FULL! PRESS E → KAIJU" bounce over my kaiju at belly 100 (shot-6). Clear, readable, and exactly where the eye already is. Deep enough for a first-timer; a Fighter ignores it after two matches, which matches the "until 5 KAIJU uses" design. A bigger version would add a "timing hint" (a tiny icon when a rival is within stomp range or dizzy) so the coach becomes a mastery aid and not only a tutorial.
- **KAIJU counterplay (ring fill, shrink flash, dizzy):** The stomp ring is visible and cool (shot-7). I could not verify the shrink flash or the 0.75 s dizzy in my harness (no event named "dizzy" in my logs, and `dazed` stayed `false`), so I cannot say the window was fair or usable. The bigger version is Proposal 2: add a reward for stepping out and a hard "counter-roar" for simultaneous KAIJU so the new telegraphs create real reads.
- **Gallery progress:** The locked entries read "Beat Story chapter 8: The Big Melt (0/8 cleared)" and "Collect 30 Story stars (you have 0/30)": clear and motivating. The Fighter's lens: these are all Story gates; there is no "win 10 ladder matches on HARD" kind of unlock, which Proposal 1 would add.
- **Gauntlet lives and perks:** Lives (hearts in the HUD, a "LIFE LOST! ❤❤ left · trying wave 2 again with your perks…" screen) work and are friendly. The perk screen (Ghost Start / Hot Feet / Extra Life) is a nice choice, but Extra Life being a flat pick against two stat perks made it an obvious take. Wave 2 jumping to a 3-way free-for-all against two bots at once felt like a spike. Needs the boss-and-refill structure in Proposal 3 to feel like a run.
- **Golden Spoon / CUP LENGTH:** not touched (Party-host territory).

## Bugs that block play
- None blocking. `/errors` returned "none" at start, middle and end.
- Observation, not blocking: pressing `Enter` and `Space` on the match-end screen did not start the rematch ("START rematch" is printed on screen); I had to click ↻ REMATCH at [510,624]. Might be harness-specific.

## Small notes (max 5, one line each)
- Match-end screen says "START rematch" but Enter/Space did not trigger it in the harness; only clicking the button worked.
- The Gauntlet giant hand KO'd me in the same step I went KAIJU: the stomp coach and the hand's "fullest belly" rule contradict each other.
- HARD bot beat my `auto:hard` seat 5-0: either HARD bots get an advantage or the harness bot is weaker; worth a check that "hard" is comparable.
- Free Play defaults seat me 1v1; 6-way mixes (the pitch) need a clearer "add bots" control on the setup screen.
- Title "NEXT UP" line is great, but it only mentions Story and unlocks; add a combat goal there too.
