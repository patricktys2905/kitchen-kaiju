# Playtest evaluation — The Story Fan

**Fun score: 7 / 10** (charming, readable campaign with a good unlock drip and some genuinely tense rounds; held back by a very uneven difficulty curve and thin, repetitive story beats)

## What I did
- Title -> Story. Watched the opening still (headless: no video), skipped it, read every pre-chapter dialogue and result line.
- Played Grand Feast chapters 1-6 (plus ch.4 boss Norigon) and then reached Second Helpings (opened after ch.6, advertised on the title card as "Ch 7/12 - Seconds open!"); cleared Second Helpings ch.1 (Smoothie Bar, Sloba/Avocadrake).
- About 20 matches, ~14 won. Mostly manual `attack`; `auto:hard` for part of ch.5/6. Losses: ch.5 x4 (3 with auto:hard, 1 manual), ch.6 x2 (one manual, one auto:hard)... then wins on the next manual tries.
- Screens seen: title, story map (both campaigns), dialogue, in-game, chapter clear, defeat, new-kaiju unlock popup, reward unlock (Freezer Shelf table). /errors: none.

## What matched my goals / what was fun
- Story map is clear and pretty: 12 nodes, stars, boss crowns, rival portraits, a one-line hint per chapter (wind arrows, cleaver lane, blender rumble). Each chapter introduces ONE hazard with a TIP in the dialogue and a matching in-match hint - lovely teaching.
- Rival one-liners are cute ("Four cups, two of us, one of you. Do the maths!", "Don't be pit-iful", "Worst. Birthday. Ever. *pop*"). The Head Chef framing is simple and clear.
- Ch.3 went to 7 rounds with a 2-2-2 three-way tie and I won the last one - best moment of the session. Free-for-all tension is real.
- Unlocks feel good: Minturtle after the boss, a table after ch.6, "Playable now in Free Play..." tells you where it goes. Second Helpings opening is signposted twice.
- In-match "knocked out, fast forward x3 / instant replay" keeps downtime short.

## What took too long / was tedious
- Retrying a defeated chapter replays the full intro/dialogue-less restart ok, but after a loss there's a generic "So close! Every rival can be beaten." even on a 0-3 loss; repeated retries feel unrewarding with no new info.
- Round-end -> result flow needs a few taps each time; fine for a human, many screens in sequence.

## What was over too quickly / too shallow
- Ch.1-3 and the boss: plain "grab and throw at nearest" wins in 2-3 seconds per round, ch.4 boss Norigon (billed as dangerous, "starts every round ready to go KAIJU") was beaten 2-1 with barely any effort. Boss felt like a regular chapter.
- Story is very thin: dialogue is 1-2 lines per rival, no running thread between chapters, no reaction to what happened in the match. Second Helpings opens with a good "back of the fridge" line but then plays like ch.1 again (easy).
- Rewards 2/7 by ch.6: nice, but cosmetic-ish table/kaiju only.

## Confusing or unclear
- Difficulty curve is jagged: ch.1-4 trivial, ch.5 (Birthday Bash, Bubblegumbo) beat me four times in a row, then a plain manual attack won 3-0; ch.6 took 3 tries. Variance seems to come from three-way free-for-all luck more than skill. A new player would not know why they lost.
- `auto:hard` bot (representing "playing well") lost more than naive `attack`, which suggests hard-bot strategy and the real optimal play differ; I never learned what a good player should do differently (no loss analysis).
- "So close!" defeat text ignores the actual score.
- Story-map layout: the SCENE button overlaps the star legend ("no rounds lost / lost one / any win") at the bottom of the right panel. Clicking "Second Helpings" is only a small green tab top-right; the ◀ MODES button goes back to the title, not to campaign choice, which is confusing.
- Pressing Q/E changes your kaiju and I swapped by accident; the header showed Squidgeon but results said GOBZILLA (probably just my harness read - not sure).

## Bugs found
- Layout overlap: story map, right panel, "SCENE" button covers the star legend text (screenshot: art-src/.playtest3/7103/shot-9.png).
- No JavaScript errors (/errors = none).
- Harness caveat (not a game flaw): opening/cutscenes appear as a still with a SKIP button.

## Top 3 changes that would raise my score
1. Smooth the difficulty curve: make ch.5-6 fairer (or give a hint/assist after 2 losses, e.g. a rival-specific tip) and make the ch.4 boss and Second Helpings opener actually hard/special.
2. Give the story more through-line: short reactions to the last match, a rival who returns, a mid-campaign twist, and a defeat line that reflects what happened.
3. Tell the player WHY they lost (who got the KOs, kaiju timing) and fix small UI snags (SCENE button overlap, clearer campaign switcher).
