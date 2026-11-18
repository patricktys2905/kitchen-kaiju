# Playtest evaluation — The 9-Year-Old (kid)

**Fun score: 7 / 10** (the monsters are hilarious and the rounds are snappy, but the first match dragged, I died to dumb stuff I didn't understand, and Chapter 2 beat me twice on "easy")

## What I did
- Title screen, Free Play (picked Bloblin the jelly because it's the silliest, with Chocomunch and Hotchog bots), 1 full match (11 rounds, won 5-3), Story chapters 1-3 (ch1 3-star first try, ch2 lost twice then cleared, ch3 unlocked), Kaiju Gallery, Records. Roughly 30-40 minutes of play-time.
- Mashed attack, shove, stomp, crumbs and power. Skipped the story text with Space.

## What matched my goals / what was fun
- The kaiju are great: strawberry lizard, jelly with a cherry, hot-dog hedgehog, chocolate golem, pizza raptor, sloth. I picked on looks and no kaiju felt like a "boring" pick.
- Going KAIJU (giant, glowing, "KAIJU!" popup) is the best moment. Getting killed by a giant hedgehog is still funny.
- Funny death captions: "BLOBLIN skewered themselves", "got flicked by the GIANT HAND", "STOLEN!" pop-ups. The giant hand flicking people made me laugh.
- Tables look different and fun (pancake stack with blueberries, soup, griddle). Chapter-clear screen with 3 big stars, Crabbage's sulky quote and "Chapter 2 unlocked!" feels rewarding.
- Gallery is the best screen: big colourful portraits, silhouettes of "???" kaiju I want to unlock, colour skins with locks. Makes me want to win to unlock stuff.
- Story cutscenes (the crab on the turkey, golden spoon with a bow) are charming.
- Winning a match gives a big "BLOBLIN RULES THE TABLE" screen with silly awards (Crumb Monster, Kaiju Lover).

## What took too long / was tedious
- "First to 5 rounds" with 3 players took 11 rounds. That's way too long for a kid; it felt like a never-ending match. First to 3 would be better by default.
- Rounds where I died early: I just watch (there's a fast-forward, which is good) but I'm still stuck for 10+ seconds.
- The story intro and each chapter's intro talk. The dialogue box types slowly ("Tonight the Head Chef hosts the GRAND FEAST. Rule every table in the...") and needs several Space taps. I'd skip it every time. First-time opening cutscene plus dialogue plays before the very first chapter.
- Setting up Free Play: click seats, cycle kaiju with tiny arrows, lots of buttons (Bot level, Table, First to, Twist, Power-ups, Hazards...). A kid just wants a big PLAY.

## What was over too quickly / too shallow
- Chapter 1 vs Crabbage was a total pushover (won both rounds in a few seconds) - fine for a tutorial but I never felt in danger.
- Not much to do in a round beyond grab fork, throw, repeat; the special moves (shove, power) seemed less useful than just spamming throws.

## Confusing or unclear
- Dying instantly in round 1 with "YOU knocked out (cutlery)" / "BLOBLIN skewered themselves" - I had no idea why I died. Looked like I hit myself? A kid would think the game is broken or cheating.
- Dying to the giant hand ("hand goes for whoever has the fullest belly") - nobody explained that eating makes you the hand's target, so a kid keeps eating crumbs and gets flicked.
- Chapter 2 is labelled "easy" but I lost twice to Squidgeon and Bloblin, the second time 1-2 or worse. Frustrating for a beginner right after the pushover chapter 1; the jump is big and the loss screen only says "DASH into a rival near the edge..." (a hint, but I didn't read it).
- On the Story chapter panel, the "🎬 SCENE" button sits on top of the star-rules text ("★★ lost one · ★ any w..." is cut off).
- It's not obvious when the game thinks I've "won" vs when an opponent has the star count - the match end took a while to arrive after the last round.
- After clicking a menu on the title bar, the menu buttons (Settings/Help/Kaiju/Records) are tiny emoji-labelled links; I clicked "RECORDS" when I wanted Kaiju.

## Bugs found
- No JavaScript errors (/errors returned "none").
- Visual nit: SCENE button overlaps the star legend on the Story chapter panel (screenshot art-src/.playtest3/7109/shot-13.png).
- Possible clarity bug: own-kill "BLOBLIN skewered themselves" on the very first round with no visible cause (shot-6.png, Free Play round 1 Pancake Stack, in the first 3 seconds, while my character did the attack command). May be an own-throw reflecting, may just be harness bot behaviour.

## Top 3 changes that would raise my score
1. Shorter matches: default "first to 3", and make the round-over / fast-forward after I'm knocked out quicker so I'm not just watching.
2. Make the first losses explain themselves (why you died: "the hand got you because your belly was full", "you stabbed yourself") and soften Chapter 2 so an "easy" chapter really is easy.
3. Cut the talking: skippable/auto-advancing story text and a one-tap "PLAY WITH A RANDOM KAIJU" button on Free Play.
