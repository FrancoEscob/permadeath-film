// 2D motion-graphics effects. All pure functions of time/seed.
import { W, H, hash, hash2, hash3, rng, noise1, clamp, lerp, ease, text } from './engine.js';

// ------------------------------------------------------------ pixel hearts
const HEART = [
  '.XX...XX.',
  'XRRX.XRRX',
  'XRWRXRRRX',
  'XRRRRRRRX',
  'XRRRRRRRX',
  '.XRRRRRX.',
  '..XRRRX..',
  '...XRX...',
  '....X....',
];
const HARD = [ // our hardcore variant: spiked top, darker, eye slits
  'X.X...X.X',
  'XRRX.XRRX',
  'XRWRXRRRX',
  'XRKRRRKRX',
  'XRRRRRRRX',
  '.XRRRRRX.',
  '..XRRRX..',
  '...XRX...',
  '....X....',
];
export function heart(ctx, x, y, s, { hardcore = true, fill = 1, alpha = 1, dead = false } = {}) {
  const map = hardcore ? HARD : HEART;
  ctx.save(); ctx.globalAlpha *= alpha;
  for (let j = 0; j < 9; j++) for (let i = 0; i < 9; i++) {
    const c = map[j][i];
    if (c === '.') continue;
    let col = c === 'X' ? '#1a0000' : c === 'W' ? '#ffd0d0' : c === 'K' ? '#3a0000' : '#d0101a';
    if (c !== 'X' && (i / 8 > fill || dead)) col = c === 'X' ? col : '#3a0a0a';
    ctx.fillStyle = col;
    ctx.fillRect(Math.round(x + (i - 4.5) * s), Math.round(y + (j - 4.5) * s), Math.ceil(s), Math.ceil(s));
  }
  ctx.restore();
}

// ------------------------------------------------------------ lightning
export function bolt(ctx, seed, x0, y0, x1, y1, { width = 4, alpha = 1, color = '#e8f0ff', glow = '#8fb0ff', branches = 3 } = {}) {
  const r = rng(seed);
  const seg = (ax, ay, bx, by, depth, w) => {
    const pts = [[ax, ay]];
    const n = 14;
    for (let i = 1; i < n; i++) {
      const k = i / n;
      pts.push([lerp(ax, bx, k) + (r() - .5) * 90 * (1 - Math.abs(k - .5)), lerp(ay, by, k) + (r() - .5) * 20]);
    }
    pts.push([bx, by]);
    ctx.lineWidth = w;
    ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
    if (depth > 0) for (let b = 0; b < branches; b++) {
      const p = pts[2 + Math.floor(r() * (pts.length - 4))];
      seg(p[0], p[1], p[0] + (r() - .5) * 400, p[1] + 100 + r() * 250, depth - 1, w * .5);
    }
  };
  ctx.save(); ctx.globalAlpha *= alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.shadowColor = glow; ctx.shadowBlur = 40; ctx.strokeStyle = color;
  seg(x0, y0, x1, y1, 2, width);
  ctx.shadowBlur = 0; ctx.strokeStyle = '#fff';
  const r2 = rng(seed); // redraw core thinner
  ctx.restore();
}

// ------------------------------------------------------------ rain
export function rain(ctx, t, { n = 700, alpha = .5, angle = .18, speed = 1900, len = 46, color = '180,200,230', seed = 1 } = {}) {
  ctx.save();
  ctx.strokeStyle = `rgba(${color},${alpha})`;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const sx = hash2(i, seed) * (W + 400) - 200;
    const ph = hash2(i, seed + 9);
    const sp = speed * (.75 + .5 * hash2(i, seed + 3));
    const y = ((ph * (H + 200) + t * sp) % (H + 200)) - 100;
    const x = sx - (y * angle);
    const l = len * (.6 + .8 * hash2(i, seed + 5));
    ctx.moveTo(x, y); ctx.lineTo(x - angle * l, y + l);
  }
  ctx.stroke();
  ctx.restore();
}

// ------------------------------------------------------------ embers / ash
export function embers(ctx, t, { n = 120, color = [255, 120, 40], up = 60, seed = 4, size = 3, alpha = 1, area = [0, 0, W, H] } = {}) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const [ax, ay, aw, ah] = area;
  for (let i = 0; i < n; i++) {
    const life = 3 + 4 * hash2(i, seed);
    const ph = ((t + hash2(i, seed + 1) * life) % life) / life;
    const x = ax + hash2(i, seed + 2) * aw + Math.sin(t * (.5 + hash2(i, seed + 3)) + i) * 30;
    const y = ay + ah - ph * (ah + 100) * (up / 60);
    const a = Math.sin(ph * Math.PI) * alpha * (.4 + .6 * hash2(i, seed + 4));
    const s = size * (.5 + hash2(i, seed + 5) * 1.5);
    ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${a})`;
    ctx.fillRect(x, y, s, s);
  }
  ctx.restore();
}

// ------------------------------------------------------------ ink splatter
export function splat(ctx, seed, x, y, r, { color = '#8e0d0d', alpha = 1, grow = 1 } = {}) {
  const R = rng(seed);
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = color;
  ctx.beginPath();
  const n = 26;
  for (let i = 0; i <= n; i++) {
    const a = i / n * Math.PI * 2;
    const rr = r * grow * (.75 + R() * .5);
    const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
  }
  ctx.fill();
  for (let i = 0; i < 18; i++) {
    const a = R() * Math.PI * 2, d = r * grow * (1.1 + R() * 1.6), s = r * .12 * (.3 + R());
    ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, s * grow, 0, Math.PI * 2); ctx.fill();
    if (R() < .5) { ctx.lineWidth = s * .8; ctx.strokeStyle = color; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .8 * grow, y + Math.sin(a) * r * .8 * grow); ctx.lineTo(x + Math.cos(a) * d, y + Math.sin(a) * d); ctx.stroke(); }
  }
  ctx.restore();
}

// ------------------------------------------------------------ typewriter
export function typed(ctx, str, x, y, t, cps, opts = {}) {
  const n = Math.max(0, Math.min(str.length, Math.floor(t * cps)));
  const shown = str.slice(0, n);
  text(ctx, shown, x, y, opts);
  return n;
}

// ------------------------------------------------------------ cracked / shaking text slam
export function slam(ctx, str, x, y, lt, { font, color = '#fff', dur = .35, from = 2.2, glow = '#ff2a10', spacing = 0 } = {}) {
  const k = clamp(lt / dur);
  const s = lerp(from, 1, ease.outExpo(k));
  const a = clamp(lt / (dur * .4));
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  text(ctx, str, 0, 0, { font, color, spacing, alpha: a, shadow: glow, shadowBlur: 30 * (1 - k) + 12 });
  ctx.restore();
}

// ------------------------------------------------------------ soft radial glow
export function glow(ctx, x, y, r, color, alpha = 1) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.save(); ctx.globalAlpha *= alpha; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
}

// ------------------------------------------------------------ drifting smoke/fog band
export function fog(ctx, t, { y = H * .7, h = 300, color = '40,10,10', alpha = .5, seed = 2 } = {}) {
  ctx.save();
  for (let i = 0; i < 14; i++) {
    const x = ((hash2(i, seed) * W * 1.6 + t * (20 + 30 * hash2(i, seed + 1))) % (W * 1.6)) - W * .3;
    const yy = y + (hash2(i, seed + 2) - .5) * h;
    const r = 250 + 250 * hash2(i, seed + 3);
    const g = ctx.createRadialGradient(x, yy, 0, x, yy, r);
    g.addColorStop(0, `rgba(${color},${alpha * .5})`); g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g; ctx.fillRect(x - r, yy - r, r * 2, r * 2);
  }
  ctx.restore();
}

// Draw the 8x8 face of a skin (front of head + hat layer) as crisp pixel art.
export function face(ctx, skin, x, y, size, { gray = 0, alpha = 1, hat = true } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.imageSmoothingEnabled = false;
  if (gray) ctx.filter = `grayscale(${gray}) brightness(${1 - gray * .35})`;
  ctx.drawImage(skin, 8, 8, 8, 8, x, y, size, size);
  if (hat && skin.hatOK !== false) {
    const pad = size / 16;
    ctx.drawImage(skin, 40, 8, 8, 8, x - pad, y - pad, size + pad * 2, size + pad * 2);
  }
  ctx.restore();
}

// Minecraft-style health row: value in hearts (0..10), optional colour variants
export function heartRow(ctx, value, { x = 960, y = 905, s = 3.2, n = 10, variant = 'red', alpha = 1, blink = false } = {}) {
  const map = HEART;
  const fillC = { red: '#d0101a', poison: '#8a8a1a', wither: '#2a2a2a', gold: '#f0c020', frozen: '#7ab8e8' }[variant];
  const w = 9 * s + s;
  const x0 = x - n * w / 2;
  ctx.save(); ctx.globalAlpha *= alpha;
  for (let k = 0; k < n; k++) {
    const f = Math.max(0, Math.min(1, value - k)); // 0, .5, 1
    for (let j = 0; j < 9; j++) for (let i = 0; i < 9; i++) {
      const c = map[j][i]; if (c === '.') continue;
      let col;
      if (c === 'X') col = blink ? '#ffffff' : '#1a0000';
      else if (f >= 1 || (f >= .5 && i < 4.5)) col = c === 'W' ? '#ffd0d0' : fillC;
      else col = '#3a0a0a';
      ctx.fillStyle = col;
      ctx.fillRect(Math.round(x0 + k * w + i * s), Math.round(y + j * s), Math.ceil(s), Math.ceil(s));
    }
  }
  ctx.restore();
}
