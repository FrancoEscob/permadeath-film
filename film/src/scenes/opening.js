// Cold open + title.
import { W, H, text, clamp, ease, lerp, hash2, rng, measure, makeCanvas } from '../engine.js';
import { heart, bolt, rain, embers, glow, fog, typed } from '../fx2d.js';
import { atlasCanvas } from '../voxel.js';

// Minecraft-style dirt menu background, painted once.
function dirtBg() {
  const c = makeCanvas(W, H), x = c.getContext('2d');
  const tile = makeCanvas(16, 16), tx = tile.getContext('2d');
  const r = rng(99);
  for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) {
    const v = r(); tx.fillStyle = v < .3 ? '#3b2a1e' : v > .85 ? '#4f3a2a' : '#46321f'; tx.fillRect(i, j, 1, 1);
  }
  x.imageSmoothingEnabled = false;
  for (let y = 0; y < H; y += 64) for (let xx = 0; xx < W; xx += 64) x.drawImage(tile, xx, y, 64, 64);
  x.fillStyle = 'rgba(0,0,0,.45)'; x.fillRect(0, 0, W, H);
  return c;
}

export function coldOpen({ lines, dur = 17 }) {
  const dirt = dirtBg();
  const beats = [0.6, 1.8, 3.0, 4.2]; // heartbeat times
  const cues = beats.map(t => ({ t, type: 'heartbeat' }));
  lines.forEach(l => cues.push({ t: l.t, type: 'typeline', len: l.s.length }));
  cues.push({ t: 8.4, type: 'kick' }, { t: 12.2, type: 'thunder' }, { t: 13.4, type: 'thunder' });
  return {
    id: 'coldopen', dur, cues,
    draw(ctx, lt, env) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
      // heart pulse
      if (lt < 8.4) {
        let pulse = 0;
        for (const b of beats) { const d = lt - b; if (d > 0 && d < .5) pulse = Math.max(pulse, Math.exp(-d * 9)); }
        const a = clamp(lt / .6) * (1 - clamp((lt - 7.6) / .6));
        const s = 9 + pulse * 3;
        glow(ctx, W / 2, H / 2 - 150, 220 + pulse * 80, 'rgba(200,0,0,.35)', a);
        heart(ctx, W / 2, H / 2 - 150, s, { hardcore: true, alpha: a });
        lines.forEach((l, i) => {
          const d = lt - l.t;
          if (d < 0) return;
          const fade = 1 - clamp((lt - 7.6) / .6);
          typed(ctx, l.s, W / 2, H / 2 + 20 + i * 64, d, 34, { font: l.big ? '38px Pixel' : '26px Pixel', color: l.red ? '#ff3030' : '#e8e0d0', alpha: fade });
        });
      } else if (lt < 11.6) {
        // the kick screen, recreated
        const d = lt - 8.4;
        const g = d < .15 ? 1 : 0;
        ctx.drawImage(dirt, 0, 0);
        text(ctx, 'Connection Lost', W / 2, H / 2 - 110, { font: '30px Pixel', color: '#a0a0a0' });
        text(ctx, 'Has sido PERMABANEADO', W / 2, H / 2 - 20, { font: '40px Pixel', color: '#ff4040', shadow: 'rgba(0,0,0,1)', shadowBlur: 0 });
        ctx.fillStyle = '#6b6b6b'; ctx.fillRect(W / 2 - 300, H / 2 + 90, 600, 60);
        ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.strokeRect(W / 2 - 300, H / 2 + 90, 600, 60);
        ctx.fillStyle = '#8a8a8a'; ctx.fillRect(W / 2 - 297, H / 2 + 93, 594, 6);
        text(ctx, 'Back to server list', W / 2, H / 2 + 122, { font: '22px Pixel', color: '#e0e0e0' });
        const k = clamp((d - 1.2) / .5);
        text(ctx, 'Si morías, te baneaban. Para siempre.', W / 2, H - 170, { font: '700 44px Cinzel', color: '#f3e6d0', alpha: k, shadow: '#000', shadowBlur: 20 });
        if (g) { ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(0, 0, W, H); }
      } else {
        // storm rises into the title
        const d = lt - 11.6;
        ctx.fillStyle = '#050208'; ctx.fillRect(0, 0, W, H);
        fog(ctx, env.t, { y: H * .55, h: 500, color: '60,20,30', alpha: .7 });
        rain(ctx, env.t, { alpha: .35, n: 600 });
        const L1 = 12.2 - 11.6, L2 = 13.4 - 11.6;
        for (const [lb, seed] of [[L1, 7], [L2, 12]]) {
          const e = d - lb;
          if (e > 0 && e < .25) {
            ctx.fillStyle = `rgba(200,210,255,${.35 * (1 - e / .25)})`; ctx.fillRect(0, 0, W, H);
            bolt(ctx, seed, W * (seed === 7 ? .3 : .72), -10, W * (seed === 7 ? .42 : .6), H * .8, { width: 6, alpha: 1 - e / .25 });
          }
        }
        const k = clamp((d - .1) / 1.2);
        text(ctx, 'Y cada día que pasaba, el mundo se volvía más cruel.', W / 2, H / 2, { font: '700 46px Cinzel', color: '#f3e6d0', alpha: k * (1 - clamp((d - 4.6) / .6)), shadow: '#000', shadowBlur: 20 });
      }
    },
    fx(lt) {
      const kick = lt > 8.4 && lt < 8.6;
      return { ca: kick ? .02 : .0015, glitch: kick ? .8 : (lt > 11.4 && lt < 11.62 ? .6 : 0), vig: .55, grain: .07 };
    },
  };
}

export function titleCard({ dur = 7, sub }) {
  return {
    id: 'title', dur, cues: [{ t: 0, type: 'title_hit' }],
    draw(ctx, lt, env) {
      ctx.fillStyle = '#040102'; ctx.fillRect(0, 0, W, H);
      const k = ease.outExpo(clamp(lt / .6));
      glow(ctx, W / 2, H / 2, 900, 'rgba(160,10,5,.55)', clamp(lt / .3));
      embers(ctx, env.t, { n: 260, seed: 21, alpha: .9, size: 3.5 });
      fog(ctx, env.t, { y: H * .8, h: 300, color: '90,15,10', alpha: .6 });
      const s = lerp(1.35, 1, k) + lt * .012;
      ctx.save(); ctx.translate(W / 2, H / 2 - 30); ctx.scale(s, s);
      // cracked, chiselled title
      text(ctx, 'PERMADEATH', 0, 8, { font: '900 210px Cinzel', color: '#200303', spacing: 10 });
      text(ctx, 'PERMADEATH', 0, 0, { font: '900 210px Cinzel', color: '#f1e3cc', spacing: 10, shadow: '#ff2a10', shadowBlur: 60 * (1.2 - k) + 25 });
      // crack
      const r = rng(5);
      ctx.strokeStyle = 'rgba(20,0,0,.9)'; ctx.lineWidth = 4;
      ctx.beginPath(); let x = -620, y = -40; ctx.moveTo(x, y);
      for (let i = 0; i < 24; i++) { x += 52; y += (r() - .5) * 38; ctx.lineTo(x, y); }
      ctx.globalAlpha = clamp((lt - .6) / .2); ctx.stroke();
      ctx.restore();
      text(ctx, sub, W / 2, H / 2 + 140, { font: '700 40px Cinzel', color: '#ff6a4a', spacing: 22, alpha: clamp((lt - 1.1) / .8) });
      text(ctx, 'un servidor de ElRichMC · Minecraft 1.15.2', W / 2, H / 2 + 215, { font: '20px Pixel', color: '#bda88a', alpha: clamp((lt - 1.8) / .8) });
      // fade out
      if (lt > dur - .6) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - dur + .6) / .6)})`; ctx.fillRect(0, 0, W, H); }
    },
    fx(lt) { return { ca: .004 + clamp(.02 - lt * .04, 0, .02), flash: clamp(.9 - lt * 3, 0, .9), flashCol: [1, .6, .5], shake: lt < .5 ? [Math.sin(lt * 80) * .01 * (1 - lt * 2), Math.cos(lt * 60) * .01 * (1 - lt * 2)] : [0, 0], vig: .5 }; },
  };
}
