// Frame-by-frame renderer: headless Chromium draws each frame, ffmpeg encodes.
// usage:
//   node render.mjs --stills 0,120,900          -> out/stills/f_000120.png
//   node render.mjs --workers 6 [--from a --to b] -> out/segments + out/video_noaudio.mp4
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(ROOT, '../out');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, arr) => {
  if (v.startsWith('--')) a.push([v.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]);
  return a;
}, []));

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  protocolTimeout: 0,
  args: ['--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-gpu', '--allow-file-access-from-files',
    '--autoplay-policy=no-user-gesture-required', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'],
});

async function openPage() {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warn' || args.verbose) console.log('[page]', m.type(), m.text()); });
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  await page.goto('file://' + ROOT + '/index.html?render=1' + (args.only ? '&only=' + args.only : ''));
  await page.waitForFunction('window.FILM && window.FILM.ready === true', { timeout: 900000 });
  return page;
}

async function grab(page, f, fmt = 'png') {
  const b64 = await page.evaluate(async (f, fmt) => {
    await window.FILM.renderFrame(f);
    const url = window.FILM.canvas.toDataURL(fmt === 'png' ? 'image/png' : 'image/jpeg', .96);
    return url.slice(url.indexOf(',') + 1);
  }, f, fmt);
  return Buffer.from(b64, 'base64');
}

if (args.stills) {
  const page = await openPage();
  const SD = args.dir || (OUT + '/stills');
  fs.mkdirSync(SD, { recursive: true });
  const info = await page.evaluate(() => ({ frames: window.FILM.frames }));
  const list = String(args.stills).split(',').map(s => s.includes('s') ? Math.round(parseFloat(s) * 30) : +s);
  for (const f of list) {
    const t0 = Date.now();
    const buf = await grab(page, f);
    const name = `${SD}/f_${String(f).padStart(6, '0')}.png`;
    fs.writeFileSync(name, buf);
    console.log(name, `${Date.now() - t0}ms`, `/${info.frames}`);
  }
  await browser.close();
  process.exit(0);
}

// Full render
const workers = +(args.workers || 6);
const probe = await openPage();
const total = await probe.evaluate(() => window.FILM.frames);
await probe.close();
const from = +(args.from || 0), to = +(args.to || total);
const segDir = args.segdir || (OUT + '/segments');
fs.mkdirSync(segDir, { recursive: true });
const chunk = Math.ceil((to - from) / workers);
console.log(`rendering frames ${from}..${to} (${to - from}) with ${workers} workers`);
const t0 = Date.now();
let done = 0;
const jobs = [];
const pages = [];
for (let w = 0; w < workers; w++) { if (from + w * chunk < to) { pages.push(await openPage()); console.log('page', w, 'ready'); } }
for (let w = 0; w < workers; w++) {
  const a = from + w * chunk, b = Math.min(to, a + chunk);
  if (a >= b) break;
  jobs.push((async () => {
    const page = pages[w];
    const seg = `${segDir}/seg_${String(w).padStart(2, '0')}.mp4`;
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', '30', seg], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = a; f < b; f++) {
      const buf = await grab(page, f, 'jpeg');
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      done++;
      if (done % 60 === 0) {
        const el = (Date.now() - t0) / 1000;
        console.log(`${done}/${to - from} frames  ${(done / el).toFixed(1)} fps  eta ${((to - from - done) / (done / el) / 60).toFixed(1)} min`);
      }
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
    await page.close();
    return seg;
  })());
}
const segs = await Promise.all(jobs);
await browser.close();
fs.writeFileSync(segDir + '/list.txt', segs.map(s => `file '${s}'`).join('\n'));
await new Promise(r => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', segDir + '/list.txt', '-c', 'copy', args.outname || (OUT + '/video_noaudio.mp4')], { stdio: 'inherit' }).on('close', r));
console.log('video done in', ((Date.now() - t0) / 60000).toFixed(1), 'min ->', args.outname || (OUT + '/video_noaudio.mp4'));
