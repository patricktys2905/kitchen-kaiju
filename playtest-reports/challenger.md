# Playtest evaluation — challenger ("The Challenge Seeker")

**Fun score: 6 / 10** (Daily and Gauntlet have a great shape, perks and a boss, but the first 4 waves and the Spicy replay I tried were far too easy for a hard-content seeker, and the 1-life Gauntlet start felt unfair.)

## What I did
- Gauntlet x3. Run 1 and 2 died in wave 1 (0 waves cleared). Run 3 cleared 4 waves, chose 4 perks, and lost to the wave-5 BOSS (Mothball went KAIJU and squashed me). Best 4.
- Daily Challenge (Hot Dumpling, Fondue Night, 4 players, first to 3). Try 1: lost after 8 rounds. Try 2: won; I played the first 4 rounds myself and used auto:hard (time passing) to finish the rest. Streak 1 day.
- Story: fresh profile. Chapter 1 normal (3 stars, 2-0), then chapter 1 Spicy (tougher rivals) won 2-0. Confirmed that Chapter 12 is locked until the previous chapter is cleared, so Spicy and the late chapters are not reachable quickly.
- Party Modes screen: cycled modes (Classic, Crumb Rush, Hot Dumpling, Team Feast), bot level Easy/Normal/Hard, and played one Crumb Rush round against a bot. There is no obvious "Dessert Course" entry. It may be a table or story unlock I could not reach.
- About 90 curl calls, around 25 matches or rounds sets, 13 screenshots. /errors: none.

## What matched my goals / what was fun
- Daily Challenge result screen is excellent: leaderboard of rounds and KOs, tries counter, win streak, rematch on key 1. Gives a clear "one more try" hook.
- Gauntlet perk pick between waves (Sugar Rush, Mustard Coat shield, Hot Feet, Full Belly) is a good roguelite layer. Wave size scales 1, 2, 3 rivals then a boss at wave 5.
- The tension of belly at 100 vs the giant hand/spatula (the fullest belly gets targeted) is a real, readable risk/reward rule.
- Boss wave going KAIJU and squashing me felt like a proper fair-feeling wall.
- Hot Dumpling in a 4-way is chaotic and funny ("TAG! HOT!", instant replay, fast-forward when only bots remain).

## What took too long / was tedious
- The Daily Hot Dumpling match went 8 rounds (first to 3 with 4 players and sudden-death-ish dumpling pops). Try 1 was long and mostly luck. Rounds have a dead 4-5 s roundEnd + countdown each time.
- Gauntlet waves 1-4 are rubber-stamp wins: the bot walks into thrown cutlery. Several minutes before it gets interesting.
- Story gating: a challenger must clear chapters 1-12 before most Spicy content opens.

## What was over too quickly / too shallow
- Wave 1 of Gauntlet is a first-to-1 round, so a single hazard hit ends the whole run with "cleared 0 waves". Two of my three runs ended this way (giant hand at belly 95-100; spatula flip at belly 95). That feels like a coin flip, not skill.
- Spicy chapter 1 ("tougher rivals") was still Crabbage "easy", knocked out in one throw each round. Spicy needs to be noticeably harder from the first chapter.
- Gauntlet end screen only shows "cleared 4 waves · best 4". No recap of perks taken, no reward, no leaderboard or seed to compare. Weak payoff for a run.
- Hard bots in Gauntlet/Story: I could not choose bot level for Gauntlet; the bots felt normal-or-below.

## Confusing or unclear
- Hot Dumpling: I could not tell from the HUD (I only had text) when I was holding it or how long the fuse was; I was popped ("boom") right after a kaiju stomp. In Kaiju mode I also died to the dumpling pop, which feels harsh. Worth a clearer fuse indicator on the holder.
- Why a stomp-to-KAIJU at belly 100 right after a giant hand warning is not safer: kaiju form still got flipped/popped.
- Escape in a match opens a Pause menu (fine), but Escape on the end screens returns to a menu without a clear "retry" for Gauntlet (needed to go back to the title).
- Perk screen appears only after the next /act following the clear overlay; fine, but "Next: wave N" with no hint what the wave contains (boss) until it loads.
- "Dessert Course" - I never found where it is.

## Bugs found
- None of the JavaScript kind: /errors returned "none" after all runs.
- Possible design bug: in Crumb Rush I was repeatedly KO'd by "cheese" hazard (events: "YOU knocked out (cheese)" 4 times in one 45 s round). Respawning into it is a bit punishing; may be the Fondue Night table hazard. Screenshot: C:\Users\Pat\kitchen-kaiju\art-src\.playtest3\7108\shot-13.png
- Gauntlet run 1 end screen: Gauntlet Over after wave 1 with no "retry" button visible via /look (only the Share button), had to leave to the title. (May be a harness-only gap.)
- Screenshots: shot-9 (daily result), shot-11 (gauntlet over), shot-6 (story map with Spicy toggle), all in C:\Users\Pat\kitchen-kaiju\art-src\.playtest3\7108\

## Top 3 changes that would raise my score
1. Make hard content actually hard: Spicy and Gauntlet bots should out-think a thrown-knife trade (dodging, counter-throws, using KAIJU on time); add a "bot level" choice or scaling for Gauntlet waves 1-4.
2. Soften the wave-1 Gauntlet coin flip: either give a free shield/extra life on wave 1, or use first-to-2 early, and make hazards (giant hand, spatula) telegraph longer for a player at belly 100. Then give runs a real payoff: recap screen with perks taken, a score, and a daily/weekly seed leaderboard.
3. Shorten and clarify Hot Dumpling/Daily: first to 2 rounds or a faster round timer, an on-screen fuse bar over the holder, and a one-button retry at the end of Daily/Gauntlet. Also surface where Dessert Course and the later Spicy chapters unlock (a visible "next unlock" goal).
