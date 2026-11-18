# Playtest evaluation — The Collector

**Fun score: 7 / 10** (the collection loop is genuinely motivating and the gallery/rewards screens are lovely, but unlocks are tightly gated to Story with no sense of "next unlock" outside the Rewards panel, and the 3-star/30-star grind is opaque)

## What I did
- Title -> Kaiju Gallery (start: 16/20 kaiju, 2 colours of 9, 0/29 achievements) -> Records (0/29) -> Story.
- Played Story chapters 1-12 with the hard bot standing in for me (/autoplay); chapters needed: ch1-3 first try, ch4 boss 2 tries, ch6 2 tries, ch7 ~3 tries, ch8 boss 3 tries, ch9 3 tries, ch10 2, ch11 2, ch12 final boss 2. Roughly 32 matches total (Records says 32 played, 16 won, 50%), plus a handful of accidental Free Play matches when autoplay started Free Play for me.
- Unlock tally after 32 matches / all 12 chapters cleared (1-3 stars each): 2 extra kaiju (Minturtle ch5-ish, Pengwhip, Velvaroo => 3 new kaiju: gallery shows 19/20), 3 new tables (Freezer Shelf, Candy Shop, Chef's Nightmare), Rewards 6/7. Final mystery kaiju needs "30 stars in Story" (I have 20/36). Achievements 8/29 with colour styles Lime, Ocean, Grape unlocked quickly (Records says 5 colour swatches open in Gallery at that point).
- Checked Gallery colour switching (Lime applies to the big preview), Records page 1, Rewards panel, Story map. Screenshots: art-src/.playtest2/7105/shot-2, 11, 17, 19, 20, 23.
- /errors: none at the end.

## What matched my goals / what was fun
- The Gallery is a great collector screen: silhouettes with "???" for locked kaiju, a roster of 20, per-kaiju Matches/Wins, and a big dual-form preview (small and KAIJU) that re-tints live when you pick a colour.
- The Story Rewards panel (🎁 6/7) clearly states exactly which chapter gives which kaiju/table ("Beat Story chapter 10: Proving the Dough"). It is the best part of the unlock design: a visible checklist with a concrete goal each.
- Pacing of the first hour is good: a new kaiju or table about every 2-3 chapters, and achievements (First Bite, Regular Diner, Forked Up, Crumb Muncher, Size Matters, On a Roll, World Tour) popped quickly, each with a colour or progress bar. Records shows progress bars (942/1000 crumbs, 3/5 streak) and a "Next up" hint, which feeds the "one more match" urge.
- Story chapters teach mechanics and have boss "kaiju at start" rules; the stage art (picnic blanket, sushi bar, etc.) looks charming in screenshots.
- "SECOND HELPINGS" and Spicy toggles appear, promising a second collection layer.

## What took too long / was tedious
- The last mystery kaiju needs 30 Story stars, but nothing on the chapter screen tells me how stars are earned (I got 1 star on several clearances by winning). I could not tell if it's rounds lost, time, or KOs. That gate felt like grinding in the dark.
- Bosses with a hard bot at my seat: boss chapters took 2-3 tries; between tries there are cutscene/dialogue/tip screens that each need Space/Enter (3-6 presses per attempt). Repeated retries make the loop slow. A "skip intro on retry" would help.
- Colour styles: 7 of 9 are tied to achievements like "Win 10 Gauntlet waves", "Win a Hot Dumpling match" and "Watch 10 Hot Dumplings pop". A collector must play every mode; fine, but those are only reachable by playing modes I did not grind here.

## What was over too quickly / too shallow
- Story clear unlocked 3 kaiju + 3 tables in only ~30 matches. The base collection is therefore finished fast, with the only remaining mid-term goals being stars, Spicy (0/12), Second Helpings and the 29 achievements.
- Unlocked colours are just a flat tint of the same art (Lime = green strawberry); good but they read more like palette swaps than "collectibles".
- Records page 1 shows only 14 of 29 achievements and needs a PAGE button; there's no single overall "collection %" figure across kaiju/tables/colours/achievements.

## Confusing or unclear
- No indication in the post-match "CHAPTER CLEAR!" screen of what new stuff I just earned (it said "Chapter N unlocked!" but the kaiju/table reward appeared only inside the Rewards panel; I had to go looking). A "NEW: Pengwhip unlocked!" banner would make unlocks feel rewarding.
- How stars are awarded; whether Free Play wins count toward story stars.
- Table collection: Records says 17/18 tables visited, Free Play says "ALL 17, 1 more to unlock in Story" - the two counts disagree a little (17 vs 18) at first glance.
- /autoplay silently starts Free Play when not on a setup screen, which then counts in stats (harness note).

## Bugs found
- Gallery "YOUR COLOUR" swatch row: after colours unlock, the unlocked swatches rendered as empty dark squares in two screenshots (shot-20, shot-21, shot-23). They did show the tinted mini-kaiju in the very first screenshot (shot-2) when only 2 were unlocked. Clicking them works (Lime/Mango applied and the large preview re-tinted, text says "Lime (wearing)"), so only the thumbnails are blank. Repro: unlock 3+ colours, open Kaiju Gallery, look at the YOUR COLOUR row. Possibly a thumbnail-cache issue; may be harness-related.
- Records screen: the "Next up: ..." line overlaps the "ACHIEVEMENTS 8/29" heading (shot-19), making both hard to read.
- Chapter 3/ch-select "Best:" stars on the detail panel sometimes lagged a chapter (showed the previously cleared chapter's stars on a new selection) - minor, not 100% sure.
- /errors: none.

## Top 3 changes that would raise my score
1. Show the unlock moment: a "NEW KAIJU / NEW TABLE / NEW COLOUR" celebration on the chapter-clear and achievement screens, plus a single Collection % on the title/Gallery.
2. Explain stars (e.g. 3 explicit objectives per chapter) so the 30-star kaiju goal is plannable, and let retries skip the intro/dialogue.
3. Add more mid-game collectables (per-kaiju skins or hats, Spicy/Second Helpings rewards) and fix the blank colour thumbnails, so the collection has depth beyond the first ~35 matches.
