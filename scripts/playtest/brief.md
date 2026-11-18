# Playtest brief (round 6): read this fully before playing

You are an AI playtester for **Kitchen Kaiju**, a couch party brawler. Food kaiju throw cutlery, shove each other off a table,
eat crumbs to fill their belly, then STOMP to go giant (KAIJU mode, with a per-kaiju power).
It has these parts:
- **Story:** The Grand Feast (12 chapters), then Second Helpings (6), then the Dessert Course.
- **Free Play** and **Party Modes:** Team Feast, Crumb Rush, Hot Dumpling and the NEW Golden Spoon, plus the Party Cup.
- **Challenges:** Gauntlet, Daily Challenge and Spicy chapters.
- **Extras:** Gallery (kaiju plus colour styles), Records/achievements, Settings, Table Workshop and Online.

## How you play
You play the REAL built game through a local HTTP harness. The game is frozen between your commands.
- Your server: `http://localhost:<PORT>` (your port is in your task). Start with `curl -s "http://localhost:<PORT>/help"`.
- `/look` lists every visible text with [x,y] positions. `/shot` saves a screenshot: open it with your Read tool. Use
  screenshots often; the visuals matter.
- To drive a match, use `/act` with a command. Use `/autoplay` to grind progress you need for your goals.
- Check `/errors` at least at the start, middle and end.
- Budget: about 60–90 harness commands. Play like your profile would: go where they would go and skip what they'd skip.
- Do NOT edit any game files and do NOT stop or restart the server. Only write your report file.

## New this round (round 6: judge these in depth, if your profile would touch them)
1. **Progression:**
   - 🪙 Chef Tokens from every match.
   - Kaiju Mastery levels (shown in each kaiju's Gallery card).
   - 📋 Weekly Orders and the 🛒 PANTRY shop (title screen, top right).
   - A 🧾 receipt card on every results screen: tokens, mastery, orders, how you were knocked out, and a tip.
   - Chef Rank in Records.
2. **Gauntlet:**
   - Courses (Starters, Mains, Desserts, Seconds) with a course boss every 4th wave.
   - Twist waves from wave 5.
   - A score and grade at the end.
   - The new BRUTAL bot level.
   - Pantry items: Lunchbox and Lifeline.
   - 3 lives (from last round).
3. **Daily medals:** Bronze, Silver and Gold.
4. **COMEBACK HELP** (Settings, on by default): whoever is behind on rounds starts the next one with a fuller belly. There is also a mercy tip after repeated losses.
5. **💾 HOUSE RULES** on the Free Play and Party setup screens: 3 save slots plus share codes.
6. **Story:**
   - "What beat you" on defeat cards.
   - Rivals react to how you won.
   - Final-boss foreshadowing.
   - Retry after losing a Dessert course.
7. **Clarity:**
   - First matches are shorter.
   - The Giant Hand explains itself the first time.
   - KAIJU stomp rings turn RED when you're inside, with a "DIZZY! HIT IT NOW!" call when a KAIJU shrinks.
8. **Text fit:** every screen was audited so text stays inside its boxes. If you see ANY text that overruns its box, overlaps other text, or is cut off, report it under "Bugs" with the screenshot path.

Last round's additions are still there: STOMP coach, Golden Spoon, CUP LENGTH, Gallery progress, Gauntlet lives.

## What we want from you: BIG, STRUCTURAL feedback
The game has had five rounds of playtesting and fixes. Small fixes no longer move scores, so we need your best thinking on **big and complex
changes**, such as:
- missing systems or modes
- broken or shallow loops
- progression and pacing
- reasons to come back
- how modes hold up over many sessions
- what would make this a 9/10 for your profile

For each big idea, give a **detailed design**:
- the rules and the flow screen by screen
- concrete numbers
- an example moment of play
- rewards and hooks
- risks and edge cases
- size
- the expected score impact

Polish nits are capped at 5 one-line bullets at the end.
Ground every proposal in something you actually saw or did while playing (cite screens, screenshots, events).

## Your report
Write it to `C:\Users\Pat\kitchen-kaiju\playtest-reports\<profile-id>.md`. Follow
`C:\Users\Pat\kitchen-kaiju\scripts\playtest\sheet-template.md` exactly: every section, every proposal field.
Score honestly out of 10 for your profile; the release bar is 9.0.
When done, reply with your score, your single biggest structural problem, and your proposal names (3–6 lines).
