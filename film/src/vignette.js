// Wrapper shared by every death retelling: ink render of the 3D action, impact
// frame, the real in-game "¡Permadeath!" title, chat lines, and the day ribbon.
import { renderInk } from './gl.js';
import { W, H, text, clamp, ease, lerp, hash2, measure } from './engine.js';
import { splat, face, rain, bolt, heartRow } from './fx2d.js';
import { TOTEM, drawTotemOverlay } from './deaths/common.js';

export const DAYS = 60;

// Bottom ribbon: day 0..60, fallen players marked, current day lit.
export function dayRibbon(ctx, day, deaths, { alpha = 1, now = null, assets, t = 0 } = {}) {
  const x0 = 150, x1 = W - 150, y = H - 58;
  ctx.save(); ctx.globalAlpha *= alpha;
  ctx.fillStyle = 'rgba(10,4,3,.55)'; ctx.fillRect(x0 - 40, y - 34, x1 - x0 + 80, 70);
  ctx.strokeStyle = 'rgba(240,220,190,.35)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  const X = d => lerp(x0, x1, d / DAYS);
  for (let d = 0; d <= DAYS; d += 5) {
    ctx.fillStyle = d % 10 === 0 ? 'rgba(240,220,190,.8)' : 'rgba(240,220,190,.35)';
    ctx.fillRect(X(d) - 1, y - (d % 10 === 0 ? 10 : 6), 2, d % 10 === 0 ? 20 : 12);
    if (d % 10 === 0) text(ctx, String(d), X(d), y + 22, { font: '14px Pixel', color: 'rgba(240,220,190,.6)' });
  }
  ctx.fillStyle = '#d0101a'; ctx.fillRect(x0, y - 2, X(Math.min(day, DAYS)) - x0, 4);
  // fallen so far
  const stack = {};
  for (const dth of deaths) {
    if (dth.dayF > day + 1e-6) continue;
    const k = stack[dth.day] = (stack[dth.day] || 0) + 1;
    const s = 16;
    const px = X(dth.day) - s / 2, py = y - 16 - k * (s + 2);
    face(ctx, assets.skins[dth.player], px, py, s, { gray: dth === now ? 0 : .85, alpha: dth === now ? 1 : .8 });
  }
  // cursor
  const cx = X(Math.min(day, DAYS));
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(cx, y + 6); ctx.lineTo(cx - 7, y + 16); ctx.lineTo(cx + 7, y + 16); ctx.fill();
  ctx.restore();
}

// spec: { player, name, day, dayF, date, msg, joke, impact, dur, build(assets) -> {scene, ink, update(lt)->camera} }
export function vignette(assets, spec, all) {
  let _built = null;
  const B = () => _built || (_built = spec.build(assets)); // built lazily: each render worker only builds its own scenes
  // slow motion: spec.slow = [{ t, d, f }] in scene ("sim") time: from t, for d seconds, play at speed f
  const SLOW = (spec.slow || []).slice().sort((a, b) => a.t - b.t);
  const sim2real = st => { let r = st; for (const sg of SLOW) if (st > sg.t) r += (Math.min(st, sg.t + sg.d) - sg.t) * (1 / sg.f - 1); return r; };
  const real2sim = rt => { let a = 0, b = rt; for (let i = 0; i < 40; i++) { const m = (a + b) / 2; if (sim2real(m) < rt) a = m; else b = m; } return (a + b) / 2; };
  const slowAt = st => SLOW.find(sg => st >= sg.t && st < sg.t + sg.d);
  const durSim = (spec.dur ?? 4.6) + (spec.revived ? .6 : 1.0); // extra hold after death so the chat can be read
  const dur = sim2real(durSim);
  const I = sim2real(spec.impact ?? durSim * .56);
  const baseCues = [{ t: 0, type: 'vig_start', spec }, { t: I, type: 'impact', spec }, spec.revived ? { t: I + .45, type: 'bell', note: 'A4', gain: .18 } : { t: I + .45, type: 'permadeath', spec }];
  return {
    id: 'death_' + spec.n + '_' + spec.player, dur, spec,
    get cues() { return baseCues.concat((B().cues || []).map(c => ({ ...c, t: sim2real(c.t) })), SLOW.map(sg => ({ t: sim2real(sg.t), type: 'slowmo', dur: sim2real(sg.t + sg.d) - sim2real(sg.t) }))); },
    transIn: { mode: 1, dur: .45 },
    draw(ctx, lt, env) {
      const built = B();
      TOTEM.dt = -1;
      const st = real2sim(lt), Tsim = env.t - lt + st;
      const cam = built.update(st, Tsim);
      const after = lt - I;
      const inv = after >= 0 && after < .1;
      const flash = after >= 0 ? clamp(1 - after / .18) * .7 : 0;
      const sketch = spec.noclip ? { washAmt: .28, sat: .25, paper: '#f3eee2', lineW: 1.8, hatch: 1.3, tint: '#fbf8f0' } : {};
      const img = renderInk(built.scene, cam, env.t, { ...built.ink, ...sketch, invert: inv, flash });
      ctx.drawImage(img, 0, 0);
      if (built.overlay) built.overlay(ctx, st, env);
      if (TOTEM.dt >= 0) drawTotemOverlay(ctx, TOTEM.dt);
      // hand-drawn explanations: text is written stroke by stroke, then arrows / circles are drawn on
      cam.updateMatrixWorld();
      const toScreen = v => { if (Array.isArray(v)) return v; const q = v.clone().project(cam); return q.z > 1 ? null : [(q.x + 1) / 2 * W, (1 - q.y) / 2 * H]; };
      (built.notes || []).forEach(n => {
        const r0 = sim2real(n.t0), r1 = n.t1 != null ? sim2real(n.t1) : Infinity;
        const d = lt - r0; if (d < 0 || lt > r1) return;
        const fade = 1 - clamp((lt - r1 + .25) / .25);
        const bo = Math.floor(env.t * 8);
        const jx = (hash2(bo, 3) - .5) * 1.6, jy = (hash2(bo, 7) - .5) * 1.6;
        const size = n.size || 52, col = n.color || (spec.noclip ? '#2a1a10' : '#fff1c8');
        ctx.save(); ctx.globalAlpha = fade; ctx.translate(jx, jy);
        ctx.font = `${size}px Hand`; ctx.textAlign = n.align || 'left'; ctx.textBaseline = 'middle';
        const lines = (n.text || '').split('\n');
        const cps = n.cps || 30; let shown = d * cps, typedAll = true;
        if (!spec.noclip && n.text) { // dark marker halo so it reads over the ink drawing
          ctx.lineWidth = 9; ctx.strokeStyle = 'rgba(20,8,4,.85)'; ctx.lineJoin = 'round';
        }
        lines.forEach((l, i) => {
          const k = Math.max(0, Math.min(l.length, Math.floor(shown))); shown -= l.length;
          if (k < l.length) typedAll = false;
          const str = l.slice(0, k); if (!str) return;
          const yy = n.y + i * size * 1.05;
          if (!spec.noclip) ctx.strokeText(str, n.x, yy);
          ctx.fillStyle = col; ctx.fillText(str, n.x, yy);
        });
        const textDone = (n.text || '').replace(/\n/g, '').length / cps;
        const k2 = ease.out(clamp((d - textDone) / .45));
        const target = n.to ? toScreen(typeof n.to === 'function' ? n.to() : n.to) : null;
        if (target && k2 > 0) {
          const [x2, y2] = [target[0] + (n.dx || 0), target[1] + (n.dy || 0)];
          const x1 = n.ax ?? (n.x + (n.align === 'right' ? -40 : 60)), y1 = n.ay ?? (n.y + lines.length * size * 1.05 - size * .3);
          const cx = (x1 + x2) / 2 + (n.bend ?? 60), cy = (y1 + y2) / 2 - (n.bend ?? 60);
          const bez = t => [(1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2, (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2];
          ctx.lineCap = 'round'; ctx.lineJoin = 'round';
          for (const [lw, sc] of spec.noclip ? [[5, col]] : [[11, 'rgba(20,8,4,.85)'], [5, col]]) {
            ctx.strokeStyle = sc; ctx.lineWidth = lw; ctx.beginPath();
            for (let i = 0; i <= 24; i++) { const [px, py] = bez(i / 24 * k2); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
            ctx.stroke();
            if (k2 > .95) { const [ex, ey] = bez(1), [bx, by] = bez(.9); const ang = Math.atan2(ey - by, ex - bx);
              ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 26 * Math.cos(ang - .5), ey - 26 * Math.sin(ang - .5)); ctx.moveTo(ex, ey); ctx.lineTo(ex - 26 * Math.cos(ang + .5), ey - 26 * Math.sin(ang + .5)); ctx.stroke(); }
          }
        }
        if (n.circle && k2 > 0) { // circle something (world point or screen point) with radius r (px)
          const c = toScreen(typeof n.circle === 'function' ? n.circle() : n.circle);
          if (c) for (const [lw, sc] of spec.noclip ? [[5, col]] : [[11, 'rgba(20,8,4,.85)'], [5, col]]) {
            ctx.strokeStyle = sc; ctx.lineWidth = lw; ctx.beginPath();
            ctx.ellipse(c[0], c[1], n.r || 80, (n.r || 80) * .85, -.25, -1.2, -1.2 + Math.PI * 2.15 * k2); ctx.stroke();
          }
        }
        if (n.underline && typedAll) { ctx.strokeStyle = col; ctx.lineWidth = 4; const w = ctx.measureText(lines[0]).width; ctx.beginPath(); ctx.moveTo(n.x, n.y + size * .55); ctx.lineTo(n.x + w * k2, n.y + size * .55); ctx.stroke(); }
        ctx.restore();
      });
      // situation tags seen in the clip (e.g. INVISIBLE · SIN ARMADURA)
      (spec.tags || []).forEach((tg, i) => {
        const k = ease.outBack(clamp((lt - .3 - i * .15) / .3));
        if (k <= 0 || lt > I + .3) return;
        ctx.save(); ctx.translate(W - 90, 130 + i * 58); ctx.scale(k, k);
        ctx.font = '26px MC'; const w = ctx.measureText(tg).width + 36;
        ctx.fillStyle = 'rgba(16,0,16,.9)'; ctx.fillRect(-w, -24, w, 48);
        ctx.strokeStyle = '#5a1ab8'; ctx.lineWidth = 4; ctx.strokeRect(-w + 2, -22, w - 4, 44);
        ctx.fillStyle = '#ffffff'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillText(tg, -18, 2);
        ctx.restore();
      });
      if (built.hearts && lt < I) { const h = built.hearts(st); if (h) heartRow(ctx, h.v, { variant: h.variant || 'red', blink: h.blink, y: H - 196, n: h.n || 10 }); }

      // red wash after death (like the vanilla death screen tint)
      if (after > .1 && !spec.revived) {
        const k = clamp((after - .1) / .5);
        ctx.save(); ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = `rgba(200,30,20,${.55 * k})`; ctx.fillRect(0, 0, W, H); ctx.restore();
        splat(ctx, spec.n * 97, W * (.3 + .4 * hash2(spec.n, 3)), H * (.35 + .2 * hash2(spec.n, 4)), 90, { color: 'rgba(120,6,6,.85)', grow: ease.outExpo(clamp(after / .35)) });
      }

      // header stamp: day + player
      const hk = ease.outExpo(clamp(lt / .35));
      ctx.save(); ctx.translate(90 - (1 - hk) * 60, 110); ctx.globalAlpha = hk * (1 - clamp((lt - dur + .25) / .25));
      text(ctx, `DÍA ${spec.day}`, 0, 0, { font: '900 64px Cinzel', color: '#1b120c', align: 'left', base: 'alphabetic', stroke: 'rgba(239,227,200,.9)', strokeW: 8 });
      text(ctx, (spec.date || '') + (spec.date && !spec.date.includes('hora') ? ' UTC' : ''), 4, 36, { font: '18px Pixel', color: '#6b1a12', align: 'left', stroke: 'rgba(239,227,200,.9)', strokeW: 5 });
      face(ctx, assets.skins[spec.player], 4, 58, 44);
      text(ctx, spec.name, 60, 82, { font: '700 40px Cinzel', color: '#1b120c', align: 'left', stroke: 'rgba(239,227,200,.9)', strokeW: 7 });
      if (!spec.revived) text(ctx, `#${String(spec.n).padStart(2, '0')}`, 0, -62, { font: '20px Pixel', color: '#8e0d0d', align: 'left', stroke: 'rgba(239,227,200,.9)', strokeW: 5 });
      ctx.restore();

      // the real in-game title: "¡Permadeath!" / "<player> ha muerto"
      const tt = after - .45;
      if (tt > 0 && spec.revived) {
        const k = ease.outBack(clamp(tt / .3));
        ctx.save(); ctx.translate(W / 2, H * .42); ctx.rotate(-.12); ctx.scale(lerp(2.4, 1, k), lerp(2.4, 1, k)); ctx.globalAlpha = clamp(tt / .12);
        ctx.strokeStyle = '#1a6a2a'; ctx.lineWidth = 10; ctx.strokeRect(-430, -70, 860, 140);
        text(ctx, 'MUERTE ANULADA', 0, 4, { font: '64px Pixel', color: '#1a6a2a' });
        ctx.restore();
        text(ctx, spec.revivedText || '', W / 2, H * .42 + 130, { font: '700 40px Cinzel', color: '#1b120c', stroke: 'rgba(239,227,200,.9)', strokeW: 8, alpha: clamp((tt - .3) / .3) });
      }
      if (tt > 0 && !spec.revived) {
        const k = clamp(tt / .25);
        const s = lerp(1.6, 1, ease.outExpo(k));
        ctx.save(); ctx.translate(W / 2, H * .4); ctx.scale(s, s);
        text(ctx, '¡Permadeath!', 6, 6, { font: '92px Pixel', color: '#3a0000', alpha: k });
        text(ctx, '¡Permadeath!', 0, 0, { font: '92px Pixel', color: '#ff2020', alpha: k });
        ctx.restore();
        text(ctx, `${spec.ign || spec.name} ha muerto`, W / 2 + 3, H * .4 + 93, { font: '34px Pixel', color: '#3a3a3a', alpha: clamp((tt - .15) / .2) });
        text(ctx, `${spec.ign || spec.name} ha muerto`, W / 2, H * .4 + 90, { font: '34px Pixel', color: '#ffffff', alpha: clamp((tt - .15) / .2) });
      }
      // chat: only the lines actually seen in the clip (spec.chat), typed in order
      const ct = after - .35;
      const chat = spec.chat || [];
      if (ct > 0 && chat.length) {
        const y0 = H - 150 - chat.length * 38;
        let acc = 0;
        chat.forEach(([s, c], i) => {
          const lt2 = ct - acc;
          acc += Math.min(.5, s.length / 110) + .05;
          if (lt2 <= 0) return;
          const n = Math.min(s.length, Math.floor(lt2 * 110));
          const w = measure(ctx, s, '34px VT') + 24;
          ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(60, y0 + i * 38 - 18, w, 36);
          text(ctx, s.slice(0, n), 72, y0 + i * 38, { font: '34px VT', color: c, align: 'left' });
        });
      }
      if (spec.note) text(ctx, spec.note, W - 70, 70, { font: '18px Pixel', color: '#6b1a12', align: 'right', stroke: 'rgba(239,227,200,.9)', strokeW: 5, alpha: clamp(lt / .4) });
      // storm after death ("Death Train")
      if (after > .6 && spec.storm) {
        const k = clamp((after - .6) / .5);
        rain(ctx, env.t, { alpha: .35 * k, n: 500, seed: spec.n });
        const lb = (after * 3.1) % 1.7;
        if (lb < .08) bolt(ctx, spec.n * 31 + Math.floor(after * 3.1 / 1.7), W * (.2 + .6 * hash2(spec.n, 9)), -20, W * (.3 + .4 * hash2(spec.n, 11)), H * .75, { width: 5, alpha: 1 - lb / .08 });
      }
      if (all) dayRibbon(ctx, spec.dayF ?? spec.day, all, { now: spec, assets, t: env.t, alpha: .95 });
    },
    fx(lt) {
      const after = lt - I;
      const sg = slowAt(real2sim(lt));
      const sh = after >= 0 && after < .5 ? (1 - after / .5) * .012 : 0;
      return {
        ca: .0022 + (after >= 0 && after < .3 ? .012 : 0),
        shake: [Math.sin(lt * 90) * sh, Math.cos(lt * 71) * sh],
        zoom: after >= 0 && after < .4 ? 1 + (1 - after / .4) * .06 : sg ? 1.03 : 1,
        vig: sg ? .62 : .45, grain: .05, mono: sg ? .35 : 0, letterbox: sg ? .09 : 0,
      };
    },
  };
}
