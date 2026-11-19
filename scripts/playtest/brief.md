# Playtest brief (round 8): read this fully before playing

You are an AI playtester for **Kitchen Kaiju**, a couch party brawler. Food kaiju throw cutlery, shove each other off a table,
eat crumbs to fill their belly, then STOMP to go giant (KAIJU mode, with a per-kaiju power).
The game has:
- **Story:** The Grand Feast (12 chapters), Second Helpings (6), then the Dessert Course.
- **Free Play** and **Party Modes:** Team Feast, Crumb Rush, Hot Dumpling, Golden Spoon, and the Party Cup.
- **CHALLENGES:** Gauntlet with course checkpoints, and Trials.
- **Daily**, Spicy chapters, and Online.
- **Extras:** Gallery (with Move Lab), Records, Pantry (shop + weekly orders), Settings, Table Workshop.

## How you play
You play the REAL built game through a local HTTP harness. The game is frozen between your commands.
- Your server: `http://localhost:<PORT>` (your port is in your task). Start with `curl -s "http://localhost:<PORT>/help"`.
- `/look` lists every visible text with [x,y] positions. In phone mode it also lists `phoneControls`.
- `/shot` saves a screenshot. **Open EVERY screenshot with your Read tool and look closely**, especially at text and buttons.
- Use `/act` to drive matches, and `/autoplay` to grind progress you need for your goals.
- Phone mode only: use `/tap?label=...` for the on-screen controls.
- Check `/errors` at the start, middle and end.
- **Budget: 90–130 harness commands.** Play like your profile would, but cover a lot: this is the most thorough round yet.
- Do NOT edit any game files and do NOT stop or restart the server. Only write your report file.

## New since the last round (round 8: judge these in depth where your profile would touch them)
1. **Difficulty and fairness:**
   - New **TOUGH** bot level between NORMAL and HARD.
   - The **Giant Hand can be dodged**: DASH just as it reaches you.
   - Hand KOs now count for whoever hit you last.
   - **Kid Mode** gives easy bots in Free Play, Party and the Daily.
2. **✨ Shiny forms:** 300 🪙 each and Mastery Lv 3. Buy them in the Gallery panel; they show in matches. There are also new in-between grind achievements.
3. **Party Cup:**
   - The 🏆 PARTY CUP button is an **ON/OFF switch**; PLAY starts the Cup when it's ON.
   - Quitting a Cup or Gauntlet asks twice.
   - The final is first-to-2 and worth ×2.
4. **Story:**
   - **📜 STORY LOG** on the map.
   - Locked Second Helpings and Dessert tabs say how to open them.
   - Boss **PHASE 2** shows on the boss's HUD card with a red aura.
   - The chapter 4 boss is gentler.
5. **Tinkering:**
   - The **TWIST** button opens a picker with every single and ⚡⚡ double twist.
   - Workshop **UNDO**, and the surface and hazard show on the preview.
6. **Phone:** in matches the table sits at the left edge, so the on-screen buttons have their own space on the right.
7. **From last round, still worth judging:**
   - YOU marker.
   - Tap wording on phones.
   - Plates behind result text.
   - Receipts carry achievements and First Service.
   - Move Lab: Esc leaves.
   - BRUTAL retuned.
   - Mastery cosmetics, Trials, Move Lab, Pantry.
8. **Text and layout:** audited on desktop AND phone again. **Prove us wrong:** report any overlap, cut-off text or stacked buttons with the screenshot path.

## What we want from you: EXTREME, SPECIFIC feedback aimed at 9/10
The goal is **9/10 from every profile**. Your report must make it obvious exactly what stands between the game and a 9 for you.
- Fill in **"Exactly what would make this a 9/10 for me"** as a complete checklist.
- Fill in **"Every issue I saw"** as an exhaustive table: no cap, every screen, every small thing.
- Do the **text and layout check** on every screen you visit.
- Give **2–3 big proposals** with full designs, grounded in what you actually saw.

## Your report
Write it to `C:\Users\Pat\kitchen-kaiju\playtest-reports\<profile-id>.md`. Follow
`C:\Users\Pat\kitchen-kaiju\scripts\playtest\sheet-template.md` exactly. Score honestly; the release bar is 9.0.
When done, reply with:
- your score
- your top 5 "what would make it 9" items
- your count of issues by severity
- any text or layout problems you found, with screenshot paths
