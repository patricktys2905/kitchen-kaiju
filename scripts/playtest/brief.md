# Playtest brief (round 10): read this fully before playing

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

## New since the last round (round 10: judge these in depth where your profile would touch them)
1. **🦖 KAIJU warning:** a kaiju that just went KAIJU grows for 0.5 s. A pulsing red ring shows its reach, and it can't squash until the ring fills. Bots also wait 1.8 s before attacking each round.
2. **🏁 Gauntlet:** the first 8 waves ramp gently (one more bot or one level at a time). Twists start at wave 7. A cleared wave previews the next one.
3. **🎟 Chef's Pass:** 12 Trial ★ OR reaching Gauntlet wave 8 opens 🌶️ Spicy on any reached chapter and the 🍰 Dessert Course early. Progress shows in CHALLENGES and Trials.
4. **🏆 Party Cup:**
   - Places now count the mode's own score (crumbs HELD, spoon seconds) before KOs.
   - Standings show points per game (G1 +5, G2 +0 …), a points-table line and how the mode places you.
   - With the Cup ON, setup greys out MODE / FIRST TO.
5. **🧸 Kid Mode:** genuinely bigger text everywhere.
6. **📖 Gallery:**
   - 🪙 balance in the header.
   - Buying a Shiny shows a banner and sparkles.
   - Tapping a locked colour highlights how to earn it.
7. **🏅 Records:** the footer follows your 📌 pinned achievement.
8. **🎓 First-timer:**
   - Your seat says 👤 YOU.
   - Practice shows the current step with its keys, plus the next one.
   - Table counts agree everywhere.
   - Quick key taps never get lost.
9. **⚡ Twist picker:** switch on 🧪 TRY IT, then tap a twist for 1 quick round vs an EASY bot.
10. **🛠 Workshop:** picking a prop or cycling the hazard explains what it does.
11. **📅 Daily:** shows which medals are still open today and what they pay.
12. **Text and layout:** audited on desktop, phone AND Kid Mode. **Prove us wrong:** report any overlap, cut-off text or stacked buttons with the screenshot path.

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
