# Playtest evaluation — The Story Fan

**Fun score: 7 / 10** (charming cast, lovely art, great hazard-per-table idea; loses points for a first-hour difficulty spike on "easy" chapters, a cheeky late-taught core mechanic, and a bit of cutscene friction. I'd happily play the full campaign, not sure about months.)

## What I did
- Title -> Story (Grand Feast). Cleared ch1-6 (ch1 3 stars, ch2 2 stars, ch3 2, ch4 boss Norigon 2, ch5 3, ch6 2), unlocking Minturtle (boss reward) and Freezer Shelf table (ch6).
- ch1 I played myself with /act (easy win, 3 stars). ch2 I played myself three times and LOST all three ("easy" rivals, first to 2). I then let auto:normal win it. ch3-ch6 mostly auto:normal/hard as "me playing well"; ch6 took 2 hard-bot defeats before a win.
- Opened Second Helpings (unlocked after ch6, button top-right of the Story map, "SECOND HELPINGS ▶"). Cleared SH ch1 (Smoothie Operators), played SH ch2 (Say Cheese / Fondue Night) into round 3+.
- ~15 matches, ~95 calls, 11 screenshots. The harness server died near the end of SH ch2 (connection refused) so I stopped there; /errors was not retrievable at that point (it was not checked earlier either, so no JS error evidence either way).

## What matched my goals / what was fun
- The cast is genuinely charming and each has a voice: Crabbage "Snip... not bad", Squidgeon "Four cups, two of us, one of you. Do the maths!", Bubblegumbo "It's MY birthday and I'll pop who I want to!", Avocadrake "Back for seconds? Don't be pit-iful.", Sloba "Too... fast... for... me... zzz." Puns and short lines suit a party game; nothing overstays.
- Boss chapter (Norigon, "starts every round ready to go KAIJU, use the conveyor to escape") feels like a real event: dedicated tip, big-talk line, and defeat line "Take your win. The feast is only getting hotter." Reward "NEW KAIJU! Minturtle" popup looks great (art + power blurb + "Playable now in Free Play, Party Modes and Online").
- Every chapter has its own table hazard with a plain-English tip (burners flare, wind arrows, cleaver red lane, hot cheese shadow, blender rumble). Learning one thing per chapter is a good curriculum, and the art on the tables (fondue night!) is lovely.
- Chef recap lines after wins ("Not a single round dropped. Chef's kiss!", "5 knockouts! The whole kitchen is talking", "Next course: X. Y is already sharpening the cutlery") give momentum and foreshadow the next rival.
- Stars (no-rounds-lost / lost-one / any-win), Spicy mode, chapter rewards (0/7) and the title "NEXT UP" hint line give clear goals.
- The "HELPING HAND" button that appeared after two defeats in ch6 is a good, kind safety net (it started me with STOMP READY).

## What took too long / was tedious
- Cutscene/dialogue pacing: each chapter intro is a title card plus typewriter caption, then 2-3 rival lines, then a TIP that is shown twice (once typing, once full), then a countdown (3-2-1), then a hint card. Roughly 6-8 taps before every match, and every retry replays it all. Retry should skip straight to the countdown.
- Matches are first-to-2 or first-to-3 with 3-4 round chapters; with defeats the loop of defeat -> retry -> chat -> countdown adds up.

## What was over too quickly / too shallow
- The story is mostly one rival sentence in and one out; there is no arc beyond "bosses are bigger". By ch6 I couldn't tell you why I'm fighting for the feast. The Second Helpings intro line from The Head Chef says "You've made a name at the Grand Feast..." even though I'd only cleared 6/12 of the Grand Feast, so it reads as if the main story is done (or I skipped it).
- Chapter text rewards after a win are generic ("5 knockouts! Next course:...") rather than reacting to what actually happened.

## Confusing or unclear
- The core hook (eat crumbs -> STOMP -> KAIJU, immune to cutlery) is first explained as a TIP only in chapter 3. Chapters 1-2 only taught throw and dash. I did not know I was supposed to stomp in ch2, and I lost it three times; my KO count was even 4 in one loss.
- "The giant hand goes for whoever has the fullest belly" is a loading tip, but the result "YOU knocked out (hand)" feels arbitrary when you're simply trying to fill your belly to stomp. It is not clear when to stomp versus hold.
- Story chapter 2 labelled "easy" rivals (Squidgeon easy, Bloblin easy) but three-way free-for-all means I got squashed by a rival KAIJU or the hand; "easy" sets expectation of a stroll. In my non-expert play (attack/crumbs commands only) it was a wall; ch3 and ch5 were comparatively gentle, so the curve goes ch1 (trivial) -> ch2 (hard) -> ch3 (easy) -> ch6 (hard).
- The Second Helpings entry is only a small green button at the top right of the Story map; the title screen says "Ch 7/12 · Seconds open!" which helped. The rewards counter (0/7) disappears in SH, which is fine, but I couldn't tell if SH requires finishing Grand Feast.
- Map layout: the chapter path snakes (1-4 across, 5-8 right to left, 9-12 left to right). Readable but the connectors between rows are faint.
- The mid-match screenshot at game over ("DEFEATED" over the table) shows only the top row's "KNOCKED OUT" labels; it's easy to not know what just beat you (squash vs hand vs cutlery) other than the event log, which players cannot see.

## Bugs found
- No game bugs found. Harness observations only: cutscene videos appear as still images (harness limitation). Near the end the harness server at :7103 stopped answering (curl exit 7 connection refused) after I had issued many long /act loops during SH ch2; I did not restart it. I could not run /errors then; earlier in the session no visible errors.
- Minor: the intro TIP text appears twice in a row (typing state and complete state) with no change; could be just the typewriter being captured by /look.
- Minor: a first call to Play on ch1 showed the same Story map in /look while the opening cutscene faded in; just timing.

## Top 3 changes that would raise my score
1. Teach STOMP/KAIJU in chapter 1 or 2 (a scripted first-round prompt when belly hits 100) and soften chapter 2, or relabel it; the biggest hook of the game should not be introduced as a tip in ch3.
2. Tighten story pacing: Retry should skip dialogue, show each tip once, and cap pre-match taps at ~3. Add a bit more story spine (a recurring thread across chapters, and fix the Second Helpings "you've made a name" line to depend on Grand Feast progress).
3. Make chapter difficulty monotonic, and make Helping Hand available a defeat earlier (or visibly advertise it); also show on the defeat screen WHY you lost (hand/squash/fall) so the player learns instead of just retrying.
