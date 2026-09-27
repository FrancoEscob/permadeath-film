// Official @PermadeathSMP tweets, recreated as cards (text copied verbatim from the archived tweets).
import { W, H, text, clamp, ease, lerp, measure } from '../engine.js';
import { embers, glow, fog, rain } from '../fx2d.js';

function wrap(ctx, str, font, maxW) {
  ctx.save(); ctx.font = font;
  const out = [];
  for (const para of str.split('\n')) {
    const words = para.split(' '); let cur = '';
    for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; }
    out.push(cur);
  }
  ctx.restore(); return out;
}

function tweetBox(ctx, x, y, w, body, date, { alpha = 1, scale = 1, highlight, size = 34 } = {}) {
  const font = `400 ${size}px Oswald`;
  const lines = wrap(ctx, body, font, w - 80);
  const h = 130 + lines.length * (size + 12);
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.scale(scale, scale);
  ctx.fillStyle = 'rgba(12,8,8,.92)'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = 'rgba(208,16,26,.8)'; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -h / 2, w, h);
  // avatar: a stylised skull glyph (our own drawing)
  ctx.fillStyle = '#d8d0c8'; ctx.beginPath(); ctx.arc(-w / 2 + 60, -h / 2 + 58, 30, 0, 7); ctx.fill();
  ctx.fillStyle = '#1a0a0a'; ctx.fillRect(-w / 2 + 46, -h / 2 + 50, 9, 9); ctx.fillRect(-w / 2 + 65, -h / 2 + 50, 9, 9); ctx.fillRect(-w / 2 + 55, -h / 2 + 68, 10, 6);
  text(ctx, 'Permadeath', -w / 2 + 110, -h / 2 + 44, { font: '700 30px Oswald', color: '#ffffff', align: 'left' });
  text(ctx, '@PermadeathSMP · ' + date, -w / 2 + 110, -h / 2 + 76, { font: '400 24px Oswald', color: '#9a8a80', align: 'left' });
  lines.forEach((l, i) => text(ctx, l, -w / 2 + 40, -h / 2 + 130 + i * (size + 12), { font, color: highlight && l.includes(highlight) ? '#ff5a3a' : '#efe3c8', align: 'left' }));
  ctx.restore();
  return h;
}

// A sequence of official tweets sliding in, one after another.
export function tweetsScene({ id, dur, items, title, storm = false }) {
  const cues = items.map(it => ({ t: it.t, type: 'decree_item' }));
  return {
    id, dur, cues, transIn: { mode: 2, dur: .6 },
    draw(ctx, lt, env) {
      ctx.fillStyle = '#070303'; ctx.fillRect(0, 0, W, H);
      glow(ctx, W / 2, H * .45, 900, 'rgba(140,15,8,.35)', 1);
      if (storm) { fog(ctx, env.t, { y: H * .7, h: 400, color: '50,20,25', alpha: .5 }); rain(ctx, env.t, { alpha: .22 }); }
      embers(ctx, env.t, { n: 90, seed: 3, alpha: .6 });
      if (title) text(ctx, title, W / 2, 110, { font: '900 64px Cinzel', color: '#f1e3cc', spacing: 12, alpha: clamp(lt / .4), shadow: '#ff2a10', shadowBlur: 30 });
      items.forEach((it, i) => {
        const d = lt - it.t; if (d < 0) return;
        const k = ease.outExpo(clamp(d / .5));
        const out = it.out != null ? clamp((lt - it.out) / .35) : 0;
        tweetBox(ctx, it.x ?? W / 2, (it.y ?? H / 2) + (1 - k) * 60, it.w ?? 1100, it.body, it.date, { alpha: k * (1 - out), scale: lerp(.96, 1, k), highlight: it.hl, size: it.size || 34 });
      });
    },
    fx() { return { vig: .55, grain: .06, ca: .002 }; },
  };
}
