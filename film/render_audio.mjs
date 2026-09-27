// Chunked, parallel score render: K pages each synthesize a time window (events that start in it, full tails),
// node sums them sample-exactly, then ffmpeg applies compression + limiting -> out/score.wav
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(ROOT, '../out');
const K = +(process.argv[2] || 10), SR = 48000;
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true, protocolTimeout: 0, args: ['--allow-file-access-from-files', '--enable-gpu', '--ignore-gpu-blocklist', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
const open = async () => {
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  await page.goto('file://' + ROOT + '/index.html?render=1');
  await page.waitForFunction('window.FILM && window.FILM.ready === true', { timeout: 900000 });
  return page;
};
const t0 = Date.now();
const p0 = await open();
const dur = await p0.evaluate(() => window.FILM.duration);
const cues = await p0.evaluate(() => window.FILM.cuesJSON());
console.log('duration', dur.toFixed(1), 's, cues', JSON.parse(cues).length, 'in', ((Date.now() - t0) / 1000).toFixed(0), 's');
const pages = [p0]; for (let i = 1; i < K; i++) pages.push(await open());
const step = Math.ceil((dur + 1) / K), TAIL = 22;
const total = new Float32Array(Math.ceil((dur + 4) * SR) * 2);
await Promise.all(pages.map(async (page, k) => {
  const from = k * step, to = Math.min(dur + 1, (k + 1) * step);
  const len = await page.evaluate((a, b, c) => window.FILM.renderAudioChunk(a, b, c), from, to, cues);
  let b64 = ''; const N = 8_000_000;
  for (let i = 0; i * N < len; i++) b64 += await page.evaluate((i, n) => window.FILM.chunkPart(i, n), i, N);
  const buf = Buffer.from(b64, 'base64');
  const f = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
  const off = Math.round(from * SR) * 2;
  for (let i = 0; i < f.length && off + i < total.length; i++) total[off + i] += f[i];
  console.log(`chunk ${k} [${from}-${to}] done at ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}));
await browser.close();
let peak = 0; for (const v of total) peak = Math.max(peak, Math.abs(v));
const g = peak > 0 ? .98 / peak : 1;
const pcm = Buffer.alloc(total.length * 2);
for (let i = 0; i < total.length; i++) pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, total[i] * g)) * 32767), i * 2);
const h = Buffer.alloc(44); h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
fs.writeFileSync(OUT + '/score_raw.wav', Buffer.concat([h, pcm]));
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', OUT + '/score_raw.wav', '-af', 'acompressor=threshold=-18dB:ratio=3:attack=5:release=180:makeup=2,alimiter=limit=0.89:attack=2:release=60,atrim=0:' + (dur + 2).toFixed(2), OUT + '/score.wav']);
console.log('score.wav written in', ((Date.now() - t0) / 1000).toFixed(0), 's; raw peak', peak.toFixed(3));
