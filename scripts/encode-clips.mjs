// Shrinks raw Google Flow clips for the web: art-src/clips-raw/<key>.mp4 -> public/video/<key>.mp4
// (960x540 H.264 + AAC, fast start so it streams). Usage: node scripts/encode-clips.mjs [key ...]
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';

const RAW = 'art-src/clips-raw', OUT = 'public/video';
fs.mkdirSync(OUT, { recursive: true });
const want = process.argv.slice(2);
// seconds to keep (Veo drifts off-model near the end of some clips); everything else keeps ~7.8s
const KEEP = { 'cut-open': 6.8, 'cut-0': 7.0, 'cut-3': 7.0, 'cut-5': 4.2, 'cut-8': 4.5, 'cut-9': 4.0, 'cut-10': 4.5 };
for (const f of fs.readdirSync(RAW).filter(f => f.endsWith('.mp4'))) {
  const key = f.replace(/\.mp4$/, '');
  if (want.length && !want.includes(key)) continue;
  if (key.endsWith('-alt')) continue;
  const t = KEEP[key] ?? 7.8, fo = (t - 0.5).toFixed(2);
  const out = `${OUT}/${key}.mp4`;
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', `${RAW}/${f}`,
    '-t', String(t), '-vf', `scale=960:540:force_original_aspect_ratio=increase,crop=960:540,fade=t=out:st=${fo}:d=0.5`, '-af', `afade=t=out:st=${fo}:d=0.5`, '-c:v', 'libx264', '-profile:v', 'main', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '96k', '-ac', '2', '-movflags', '+faststart', out]);
  console.log(`OK ${out} ${Math.round(fs.statSync(out).size / 1024)} KB`);
}
