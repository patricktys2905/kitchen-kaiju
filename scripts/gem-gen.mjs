// Drive Gemini (in the remote-debug Chrome) to generate images and save them.
// Needs Chrome started with --remote-debugging-port=9333 and signed in to Gemini.
// Usage: node scripts/gem-gen.mjs art-src/jobs-x.json [startIndex] [count]
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// Output folder for raw Gemini images (processed by scripts/process-art.mjs).
const OUT = fileURLToPath(new URL('../art-src/raw', import.meta.url));
const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8').replace(/^﻿/, ''));
const start = Number(process.argv[3] ?? 0);
const count = Number(process.argv[4] ?? jobs.length);

const b = await chromium.connectOverCDP('http://127.0.0.1:9333');
const ctx = b.contexts()[0];
let page = ctx.pages().find((p) => p.url().includes('gemini.google')) || (await ctx.newPage());
await page.bringToFront();

const EDITOR = 'rich-textarea .ql-editor, div[contenteditable="true"][role="textbox"]';

async function genImages() {
  return page.evaluate(() =>
    [...document.querySelectorAll('model-response img, generated-image img, single-image img')]
      .filter((i) => i.naturalWidth > 200 && !i.closest('user-query'))
      .map((i) => i.currentSrc || i.src),
  );
}

async function busy() {
  return page.evaluate(() => !!document.querySelector('button[aria-label*="Stop" i], .stop-icon, [data-test-id="stop-button"]'));
}

for (const job of jobs.slice(start, start + count)) {
  if (job.newChat) {
    await page.goto('https://gemini.google.com/app', { waitUntil: 'domcontentloaded' });
  }
  await page.waitForSelector(EDITOR, { timeout: 30000 });
  const before = (await genImages()).length;
  const editor = page.locator(EDITOR).first();
  await editor.click();
  await page.keyboard.insertText(job.prompt);
  await page.waitForTimeout(400);
  await page.keyboard.press('Enter');
  const t0 = Date.now();
  let srcs = [];
  while (Date.now() - t0 < 240000) {
    await page.waitForTimeout(2500);
    srcs = await genImages();
    if (srcs.length > before && !(await busy())) break;
  }
  if (srcs.length <= before) {
    const text = await page.evaluate(() => [...document.querySelectorAll('model-response')].pop()?.innerText?.slice(0, 500));
    console.log(`✗ ${job.name}: no image after ${(Date.now() - t0) / 1000}s. Reply: ${JSON.stringify(text)}`);
    continue;
  }
  await page.waitForTimeout(1500);
  // Copy the newest generated image out of the page via a canvas (it's a same-origin blob).
  const dataUrl = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('model-response img')].filter((i) => i.naturalWidth > 200);
    const img = imgs[imgs.length - 1];
    if (!img) return null;
    const cv = document.createElement('canvas');
    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;
    cv.getContext('2d').drawImage(img, 0, 0);
    try { return cv.toDataURL('image/png'); } catch { return null; }
  });
  let saved = false;
  if (dataUrl) {
    const bytes = Buffer.from(dataUrl.split(',')[1], 'base64');
    for (const e of ['png', 'jpg', 'webp']) fs.rmSync(`${OUT}/${job.name}.${e}`, { force: true });
    fs.writeFileSync(`${OUT}/${job.name}.png`, bytes);
    console.log(`✓ ${job.name}.png ${(bytes.length / 1024).toFixed(0)} KB in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    saved = true;
  }
  if (!saved) {
    // Fallback: screenshot the image element.
    const img = page.locator('model-response img').last();
    await img.screenshot({ path: `${OUT}/${job.name}.png` });
    console.log(`~ ${job.name}.png saved from screenshot (download blocked)`);
  }
}
await b.close().catch(() => {});
