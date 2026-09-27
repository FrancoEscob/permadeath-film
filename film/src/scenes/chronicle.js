// Chronicle pieces between deaths: difficulty decrees, AFK bans, day jumps, memorial.
import { W, H, text, clamp, ease, lerp, hash2, rng, measure, makeCanvas } from '../engine.js';
import { embers, glow, fog, face, rain, bolt, splat } from '../fx2d.js';
import { dayRibbon } from '../vignette.js';

function wrap(ctx, str, font, maxW) {
  ctx.save(); ctx.font = font;
  const words = str.split(' '); const lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur); ctx.restore(); return lines;
}

// Stone background with carved feel
function stoneBg() {
  const c = makeCanvas(W, H), x = c.getContext('2d'); const r = rng(42);
  x.fillStyle = '#120c0b'; x.fillRect(0, 0, W, H);
  for (let i = 0; i < 2600; i++) { const s = 8 + r() * 30; x.fillStyle = `rgba(${40 + r() * 30},${30 + r() * 20},${28 + r() * 18},${.12 + r() * .2})`; x.fillRect(r() * W, r() * H, s, s); }
  x.strokeStyle = 'rgba(0,0,0,.5)'; x.lineWidth = 3;
  for (let y = 0; y < H; y += 90) { x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke(); for (let xx = (y / 90 % 2) * 90; xx < W; xx += 180) { x.beginPath(); x.moveTo(xx, y); x.lineTo(xx, y + 90); x.stroke(); } }
  return c;
}
let STONE = null;

// A difficulty change: "DÍA 20" slams, then each change is carved in.
export function decree(assets, { day, date, items, dur, deaths, headline }) {
  STONE = STONE || stoneBg();
  dur = dur ?? Math.max(4, 2 + items.length * .9);
  const cues = [{ t: 0, type: 'decree' }];
  items.forEach((_, i) => cues.push({ t: 1.1 + i * .8, type: 'decree_item' }));
  return {
    id: 'decree_' + day, dur, cues, transIn: { mode: 3, dur: .35 },
    draw(ctx, lt, env) {
      ctx.drawImage(STONE, 0, 0);
      glow(ctx, W / 2, H * .35, 800, 'rgba(170,20,5,.35)', 1);
      embers(ctx, env.t, { n: 140, seed: day, alpha: .8 });
      const k = ease.outExpo(clamp(lt / .4));
      const s = lerp(2.2, 1, k);
      ctx.save(); ctx.translate(W / 2, 250); ctx.scale(s, s);
      text(ctx, `DÍA ${day}`, 0, 6, { font: '900 170px Cinzel', color: '#000', alpha: k });
      text(ctx, `DÍA ${day}`, 0, 0, { font: '900 170px Cinzel', color: '#f1e3cc', shadow: '#ff2a10', shadowBlur: 40, alpha: k });
      ctx.restore();
      text(ctx, headline || 'LA DIFICULTAD CAMBIA', W / 2, 375, { font: '700 30px Cinzel', color: '#ff6a4a', spacing: 14, alpha: clamp((lt - .4) / .4) });
      if (date) text(ctx, date, W / 2, 420, { font: '18px Pixel', color: '#bda88a', alpha: clamp((lt - .5) / .4) });
      const n = items.length;
      const fs = n > 5 ? 34 : 40;
      let y = 500;
      items.forEach((it, i) => {
        const d = lt - (1.1 + i * .8);
        if (d < 0) return;
        const a = clamp(d / .25);
        const lines = wrap(ctx, it, `400 ${fs}px Oswald`, 1300);
        const xo = (1 - ease.outExpo(clamp(d / .4))) * 60;
        ctx.save(); ctx.globalAlpha = a;
        ctx.fillStyle = '#d0101a'; ctx.fillRect(290 - xo, y - 8, 16, 16);
        lines.forEach((ln, j) => text(ctx, ln, 330 - xo, y + j * (fs + 8), { font: `400 ${fs}px Oswald`, color: '#efe3c8', align: 'left' }));
        ctx.restore();
        y += lines.length * (fs + 8) + 18;
      });
      if (deaths) dayRibbon(ctx, day, deaths, { assets, alpha: .9 });
    },
    fx(lt) { return { ca: .003 + clamp(.02 - lt * .06, 0, .02), shake: lt < .3 ? [Math.sin(lt * 70) * .008, Math.cos(lt * 50) * .008] : [0, 0], vig: .55, flash: clamp(.5 - lt * 2.5, 0, .5), flashCol: [1, .5, .3] }; },
  };
}

// AFK / inactivity bans: no death happened in-game, so no retelling — just the ban.
export function banCard(assets, { day, date, list, dur = 3.2, deaths, note, title = 'PERMABANEADOS POR INACTIVIDAD', stamp = 'BANEADO', id }) {
  const cues = [{ t: 0, type: 'ban' }];
  list.forEach((_, i) => cues.push({ t: .5 + i * .35, type: 'ban_stamp' }));
  return {
    id: id || ('ban_' + day + '_' + list[0].player), dur, cues, transIn: { mode: 3, dur: .3 },
    draw(ctx, lt, env) {
      ctx.fillStyle = '#0c0707'; ctx.fillRect(0, 0, W, H);
      glow(ctx, W / 2, H / 2, 700, 'rgba(90,10,10,.5)', 1);
      text(ctx, `DÍA ${day}`, W / 2, 150, { font: '700 96px MC', color: '#f1e3cc', alpha: clamp(lt / .3), stroke: '#1a0000', strokeW: 10 });
      if (date) text(ctx, date, W / 2, 215, { font: '28px MC', color: '#bda88a', alpha: clamp(lt / .3) });
      text(ctx, title, W / 2, 280, { font: '700 44px MC', color: '#ff3b2b', alpha: clamp((lt - .2) / .3), stroke: '#1a0000', strokeW: 8 });
      const n = list.length;
      const size = n > 3 ? 150 : 190;
      const gap = size + 110;
      const x0 = W / 2 - (n - 1) * gap / 2;
      list.forEach((b, i) => {
        const d = lt - (.5 + i * .35);
        const x = x0 + i * gap, y = H / 2 + 40;
        ctx.save(); ctx.globalAlpha = clamp(d / .2 + .3);
        face(ctx, assets.skins[b.player], x - size / 2, y - size / 2, size, { gray: d > 0 ? 1 : .5 });
        ctx.restore();
        text(ctx, b.name, x, y + size / 2 + 45, { font: '700 34px MC', color: '#efe3c8' });
        if (d > 0) {
          const k = ease.outBack(clamp(d / .25));
          ctx.save(); ctx.translate(x, y); ctx.rotate(-.25); ctx.scale(lerp(2.5, 1, k), lerp(2.5, 1, k)); ctx.globalAlpha = clamp(d / .1);
          ctx.strokeStyle = '#d0101a'; ctx.lineWidth = 7; ctx.strokeRect(-size * .62, -34, size * 1.24, 68);
          text(ctx, stamp, 0, 2, { font: `${size > 160 ? (stamp.length > 8 ? 26 : 34) : 26}px Pixel`, color: '#e0141a' });
          ctx.restore();
        }
      });
      if (note) text(ctx, note, W / 2, H - 200, { font: '30px MC', color: '#cbb89a', alpha: clamp((lt - 1) / .4) });
      if (deaths) dayRibbon(ctx, day, deaths, { assets, alpha: .9 });
    },
    fx(lt) { return { ca: .003, vig: .5, glitch: lt < .12 ? .6 : 0 }; },
  };
}

// Final wall: every player, in order of death, fading to grey one by one.
export function memorial(assets, { entries, dur = 16, lines }) {
  const n = entries.length;
  const cols = Math.min(13, n), rows = Math.ceil(n / cols);
  const cues = [{ t: 0, type: 'memorial' }];
  entries.forEach((_, i) => cues.push({ t: 1.5 + i * .12, type: 'mem_face', i }));
  return {
    id: 'memorial', dur, cues, transIn: { mode: 2, dur: 1.2 },
    draw(ctx, lt, env) {
      ctx.fillStyle = '#070404'; ctx.fillRect(0, 0, W, H);
      glow(ctx, W / 2, H / 2, 900, 'rgba(120,15,10,.3)', 1);
      embers(ctx, env.t, { n: 90, seed: 77, alpha: .5, color: [200, 200, 220] });
      const size = 96, gx = 128, gy = 170;
      const x0 = W / 2 - (cols - 1) * gx / 2, y0 = H / 2 - (rows - 1) * gy / 2 - 40;
      entries.forEach((e, i) => {
        const d = lt - (1.5 + i * .12);
        const c = i % cols, r = Math.floor(i / cols);
        const x = x0 + c * gx, y = y0 + r * gy;
        const a = clamp((lt - .2 - i * .03) / .5);
        const g = clamp((d - .3) / .4);
        face(ctx, assets.skins[e.player], x - size / 2, y - size / 2, size, { gray: g, alpha: a });
        text(ctx, e.short || e.name, x, y + size / 2 + 22, { font: '15px Pixel', color: '#cbb89a', alpha: a });
        text(ctx, e.ban ? `DÍA ${e.day} · ban` : `DÍA ${e.day}`, x, y + size / 2 + 46, { font: '14px Pixel', color: e.ban ? '#8a8a8a' : '#c0302a', alpha: a * g });
      });
      (lines || []).forEach((l, i) => {
        const d = lt - l.t;
        if (d < 0) return;
        text(ctx, l.s, W / 2, H - 130 + i * 0, { font: l.font || '700 44px Cinzel', color: l.color || '#f1e3cc', alpha: clamp(d / .6) * (1 - clamp((lt - (lines[i + 1]?.t ?? dur) + .3) / .3)) });
      });
      if (lt > dur - 1) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - dur + 1) / 1)})`; ctx.fillRect(0, 0, W, H); }
    },
    fx() { return { vig: .6, grain: .07, ca: .002 }; },
  };
}

// Plain card with a few lines (used for act titles / epilogue).
export function card({ id, dur, lines, bg = '#050203', cues = [], storm = false, transIn }) {
  return {
    id, dur, cues, transIn,
    draw(ctx, lt, env) {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      if (storm) { fog(ctx, env.t, { y: H * .6, h: 400, color: '50,20,25', alpha: .6 }); rain(ctx, env.t, { alpha: .3 }); }
      else embers(ctx, env.t, { n: 80, seed: 5, alpha: .5 });
      lines.forEach(l => {
        const d = lt - l.t; if (d < 0) return;
        const out = l.out != null ? clamp((lt - l.out) / .4) : 0;
        text(ctx, l.s, W / 2, l.y ?? H / 2, { font: l.font || '700 50px Cinzel', color: l.color || '#f1e3cc', spacing: l.spacing || 0, alpha: clamp(d / (l.fade || .5)) * (1 - out), shadow: l.glow, shadowBlur: l.glow ? 30 : 0 });
      });
    },
    fx() { return { vig: .55, grain: .065 }; },
  };
}
