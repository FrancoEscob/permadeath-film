// Core helpers: deterministic randomness, easing, noise, asset loading.
// Everything the film draws must be a pure function of time, so frames can
// be rendered out of order and in parallel.

export const W = 1920, H = 1080, FPS = 30;

export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const inv = (a, b, x) => clamp((x - a) / (b - a));
export const smooth = t => t * t * (3 - 2 * t);
export const ease = {
  inOut: t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out: t => 1 - Math.pow(1 - t, 3),
  in: t => t * t * t,
  outExpo: t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inExpo: t => (t <= 0 ? 0 : Math.pow(2, 10 * t - 10)),
  outBack: t => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  outElastic: t => (t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - .75) * (2 * Math.PI / 3)) + 1),
};

// integer hash -> [0,1)
export function hash(n) {
  n = (n | 0) ^ 0x9e3779b9;
  n = Math.imul(n ^ (n >>> 16), 0x85ebca6b);
  n = Math.imul(n ^ (n >>> 13), 0xc2b2ae35);
  n ^= n >>> 16;
  return (n >>> 0) / 4294967296;
}
export const hash2 = (a, b) => hash(Math.imul(a | 0, 73856093) ^ Math.imul(b | 0, 19349663));
export const hash3 = (a, b, c) => hash(Math.imul(a | 0, 73856093) ^ Math.imul(b | 0, 19349663) ^ Math.imul(c | 0, 83492791));

export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 1D value noise, smooth, in [-1,1]
export function noise1(x, seed = 0) {
  const i = Math.floor(x), f = x - i;
  const a = hash2(i, seed) * 2 - 1, b = hash2(i + 1, seed) * 2 - 1;
  return lerp(a, b, smooth(f));
}
export function noise2(x, y, seed = 0) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const a = hash3(ix, iy, seed), b = hash3(ix + 1, iy, seed);
  const c = hash3(ix, iy + 1, seed), d = hash3(ix + 1, iy + 1, seed);
  const u = smooth(fx), v = smooth(fy);
  return lerp(lerp(a, b, u), lerp(c, d, u), v) * 2 - 1;
}
export function fbm(x, y, seed = 0, oct = 4) {
  let s = 0, amp = .5, f = 1;
  for (let i = 0; i < oct; i++) { s += amp * noise2(x * f, y * f, seed + i * 17); f *= 2; amp *= .5; }
  return s;
}

// "Line boil": hand-drawn jitter that re-rolls a few times per second.
export const BOIL_FPS = 8;
export const boilFrame = t => Math.floor(t * BOIL_FPS);

export function loadImage(src) {
  return new Promise((res, rej) => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => rej(new Error('image failed: ' + src));
    im.src = src;
  });
}

export async function loadFonts() {
  const faces = [
    ['Pixel', 'fonts/pixel.woff2'],
    ['Cinzel', 'fonts/cinzel900.woff2', { weight: '900' }],
    ['Cinzel', 'fonts/cinzel700.woff2', { weight: '700' }],
    ['Fraktur', 'fonts/fraktur.woff2'],
    ['VT', 'fonts/vt323.woff2'],
    ['Oswald', 'fonts/oswald700.woff2', { weight: '700' }],
    ['Oswald', 'fonts/oswald400.woff2', { weight: '400' }],
    ['MC', 'fonts/monocraft.ttf'],
    ['MC', 'fonts/monocraft-bold.ttf', { weight: '700' }],
    ['Hand', 'fonts/caveat700.woff2'],
    ['Marker', 'fonts/marker.woff2'],
  ];
  for (const [fam, url, desc] of faces) {
    const f = new FontFace(fam, `url(${url})`, desc || {});
    await f.load();
    document.fonts.add(f);
  }
}

export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

// Text with letter spacing (canvas letterSpacing is supported in Chromium).
export function text(ctx, str, x, y, { font, color = '#fff', align = 'center', base = 'middle', spacing = 0, alpha = 1, stroke, strokeW = 0, shadow, shadowBlur = 0 } = {}) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = base;
  ctx.letterSpacing = spacing + 'px';
  if (shadow) { ctx.shadowColor = shadow; ctx.shadowBlur = shadowBlur; }
  if (stroke) { ctx.lineJoin = 'round'; ctx.strokeStyle = stroke; ctx.lineWidth = strokeW; ctx.strokeText(str, x, y); }
  ctx.fillStyle = color;
  ctx.fillText(str, x, y);
  ctx.restore();
}

export function measure(ctx, str, font, spacing = 0) {
  ctx.save(); ctx.font = font; ctx.letterSpacing = spacing + 'px';
  const w = ctx.measureText(str).width; ctx.restore();
  return w;
}
