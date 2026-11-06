# Task: make Kitchen Kaiju story cutscene clips in Google Flow

You drive the user's own Chrome (Claude in Chrome tools). Project folder: `C:\Users\Pat\kitchen-kaiju`.
The user asked for these clips. Their Google AI Pro plan covers them: Veo 3.1 Lite costs 10 credits per clip.

## Inputs
- Stills: `art-src/raw/<key>.png` (16:9 Gemini images).
- Prompts: `art-src/flow-cutscenes.json`. The full prompt for a key is `_base` with `{X}` replaced by the text under that key.
- Keys, in order: cut-7

For each key, skip it if `art-src/clips-raw/<key>.mp4` already exists.

## How Google Flow works (learned in earlier sessions)
1. Open https://labs.google/fx/tools/flow (or flow.google.com) in a NEW tab. The user is already signed in.
2. Use the agent chat / prompt box. In the settings, pick the video model **Veo 3.1 - Lite**, x1 output, 16:9.
   Flow resets the model to "Omni" between sessions, so check it every time.
3. Put the still on the clipboard from PowerShell:
   `Add-Type -AssemblyName System.Windows.Forms,System.Drawing; [System.Windows.Forms.Clipboard]::SetImage([System.Drawing.Image]::FromFile('C:\Users\Pat\kitchen-kaiju\art-src\raw\<key>.png'))`
   Then click into Flow's prompt box and paste with Ctrl+V. Wait until the image shows as attached.
4. Type the full prompt, then send it.
   - If Flow asks to confirm before generating, click **Approve**.
   - Never choose "Always approve".
   - Accept the "rights to use this image" notice if it appears (the user accepted it before).
5. Wait for the clip to finish (about 1–3 minutes).
6. Download it:
   - Use the video's download icon, then choose **720p**. The menu position moves, so find it in the page, not by fixed coordinates.
   - It lands in `C:\Users\Pat\Downloads` with an automatic name.
   - Reload the clip's page before each download, because Chrome may block repeat downloads otherwise.
7. Move the NEWEST `.mp4` in Downloads to `C:\Users\Pat\kitchen-kaiju\art-src\clips-raw\<key>.mp4` (PowerShell `Move-Item`).
   Do one key at a time, so files can't get mixed up.
8. If Flow refuses a prompt, retry it once. Simplify the wording if needed: drop words like "furious", "menacingly" or "villain". If it still refuses, skip that key and note it.

## Rules
- After each clip downloads, look at it: grab frames (e.g. open it in a tab) and check that no new characters appeared, nobody changed shape, and NO character grew a nose, nostrils or a snout (zoom in on faces). If it drifted badly, generate it ONE more time and keep the better one. Do at most 1 such retry in the whole run (credit budget). Save the retry as `<key>.mp4` and the other as `<key>-alt.mp4`.
- Only generate the listed keys. One output each. Don't buy credits or change plan or account settings.
- If you run out of credits, or a sign-in or captcha is needed, stop and report it.
- At the end, print one line per key: `<key>: saved` / `skipped (exists)` / `failed: <reason>`, plus the credits remaining if shown.

## If screenshots of the Flow tab freeze ("renderer may be frozen")
The user is away from the PC. Nobody can click for you, so fix it yourself with PowerShell:
- Bring the user's Chrome to the front and maximise it:
  `Add-Type 'using System;using System.Runtime.InteropServices;public class W{[DllImport("user32.dll")]public static extern bool ShowWindow(IntPtr h,int c);[DllImport("user32.dll")]public static extern bool SetForegroundWindow(IntPtr h);}'; $p = Get-Process chrome | ? { $_.MainWindowTitle -and $_.MainWindowTitle -notmatch 'Gemini' } | select -First 1; [W]::ShowWindow($p.MainWindowHandle,3); [W]::SetForegroundWindow($p.MainWindowHandle)`
- Make sure the Flow tab is the active tab in that window (switch to it).
- Wait a few seconds, then try the screenshot again. Reloading the tab once after that is fine.
- Only stop if it is still frozen after a few tries.
