// Shrinks raw Google Flow clips for the web: art-src/clips-raw/<key>.mp4 -> public/video/<key>.mp4
// (960x540 H.264 + AAC, fast start so it streams). Usage: node scripts/encode-clips.mjs [key ...]
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';

const RAW = 'art-src/clips-raw', OUT = 'public/video';
fs.mkdirSync(OUT, { recursive: true });
const want = process.argv.slice(2);
// seconds to keep (Veo drifts off-model near the end of some clips); everything else keeps ~7.8s
// Face audit 2026-11-07: every shipped clip was checked frame by frame; trims end before any face/limb drift.
const KEEP = { 'cut-4': 4.5, 'cut-11': 3.5, 'cut-7': 4.6, 'cut-end': 6.0, 'cut-2': 2.8, 'cut-6': 5.4, 'cut-open': 5.8, 'cut-0': 7.0, 'cut-3': 7.0, 'cut-5': 4.2, 'cut-8': 3.6, 'cut-9': 3, 'cut-10': 4.5, 's2-0': 3.8, 's2-4': 2.3 };
// Frame patches: a cleaned-up image laid over part of a raw clip (e.g. to hide a face Gemini/Veo drew on a prop).
// x/y are ffmpeg expressions in raw-clip pixels (1280x720) and may use t to follow slow camera drift.
const PATCHES = {
  'cut-2': { img: 'art-src/patch-cut-2.png', x: '125-2.7*min(t,2.2)', y: '364+0.9*min(t,2.2)' }, // takeaway carton had a face
};
for (const f of fs.readdirSync(RAW).filter(f => f.endsWith('.mp4'))) {
  const key = f.replace(/\.mp4$/, '');
  if (want.length && !want.includes(key)) continue;
  if (key.endsWith('-alt')) continue;
  const t = KEEP[key] ?? 7.8, fo = (t - 0.5).toFixed(2);
  const out = `${OUT}/${key}.mp4`;
  const vf = `scale=960:540:force_original_aspect_ratio=increase,crop=960:540,fade=t=out:st=${fo}:d=0.5`, pt = PATCHES[key];
  const video = pt ? ['-i', pt.img, '-filter_complex', `[0:v][1:v]overlay=x='${pt.x}':y='${pt.y}':eval=frame,${vf}[v]`, '-map', '[v]', '-map', '0:a?'] : ['-vf', vf];
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', `${RAW}/${f}`, ...video,
    '-t', String(t), '-af', `afade=t=out:st=${fo}:d=0.5`, '-c:v', 'libx264', '-profile:v', 'main', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '96k', '-ac', '2', '-movflags', '+faststart', out]);
  console.log(`OK ${out} ${Math.round(fs.statSync(out).size / 1024)} KB`);
}
