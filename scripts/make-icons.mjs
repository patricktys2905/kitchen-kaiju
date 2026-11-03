// Renders public/icon.svg into the PNG icons the installable app needs (uses the installed Edge/Chrome).
import { existsSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const exe = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p => existsSync(p));
const svg = readFileSync('public/icon.svg', 'utf8');
const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage();
const jobs = [
  { file: 'public/icons/icon-192.png', size: 192, pad: 0, bg: 'transparent' },
  { file: 'public/icons/icon-512.png', size: 512, pad: 0, bg: 'transparent' },
  { file: 'public/icons/maskable-512.png', size: 512, pad: 0.12, bg: '#9a6438' }, // safe zone for Android masks
  { file: 'public/icons/apple-touch-icon.png', size: 180, pad: 0, bg: '#9a6438' },
];
for (const j of jobs) {
  const inner = Math.round(j.size * (1 - j.pad * 2));
  await page.setViewportSize({ width: j.size, height: j.size });
  await page.setContent(`<html><body style="margin:0;background:${j.bg};display:flex;align-items:center;justify-content:center;width:${j.size}px;height:${j.size}px">
    <div style="width:${inner}px;height:${inner}px">${svg.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</div></body></html>`);
  await page.screenshot({ path: j.file, omitBackground: j.bg === 'transparent' });
  console.log('wrote', j.file);
}
await browser.close();
