// Difficulty changes, redesigned: rolling day odometer that slams in, then each change pops in as a
// Minecraft item tooltip with a pixel icon. Keywords: **gold**, ~~red~~. Texts come from the official
// @PermadeathSMP images (FACTS.md).
import { W, H, text, clamp, ease, lerp, hash2, rng, measure, makeCanvas } from '../engine.js';
import { embers, glow, face } from '../fx2d.js';
import { dayRibbon } from '../vignette.js';
import { atlasCanvas, TILES, TILE, TILE_COLS, World } from '../voxel.js';
import { THREE, renderPlain } from '../gl.js';
import * as M from '../mobs.js';

// ---- 8x8 pixel icons (drawn for this film)
const PAL = { k: '#111111', r: '#d0101a', R: '#ff4a3a', w: '#f0f0f0', g: '#3cb043', G: '#8fe04a', y: '#f5d547', Y: '#c98a2a', p: '#8a3ad8', P: '#c07aff', b: '#2a6ad8', B: '#8fd0ff', s: '#8a8f96', S: '#5a5f66', o: '#e88a2a', n: '#5a3a1a', m: '#2a2a2a', c: '#5fe0d8', t: '#f2c44c', e: '#3fd46a' };
const ICONS = {
  spider: ['........', 'k.k..k.k', '.kkkkkk.', 'kkrkkrkk', '.kkkkkk.', 'k.kkkk.k', '.k....k.', '........'],
  mobs: ['.gggg...', '.gkgk...', '.gggg...', '...gggg.', '...gkgk.', '...gggg.', '...gggg.', '........'],
  bed: ['........', '........', 'ww......', 'wwrrrrrr', 'wwrrrrrr', 'nnnnnnnn', 'n......n', '........'],
  moon: ['..wwww..', '.wwwwmw.', 'wwwwmmww', 'wwmwwwww', 'wwwwwmww', 'wwmwwwww', '.wwwwww.', '..wwww..'],
  angry: ['.wwwww..', '.wkwkw..', '.wwwww..', '.yyyyy..', '..rr....', '.wwwww..', 'wwwwwww.', '.y...y..'],
  skull: ['.wwwwww.', 'wwwwwwww', 'wkkwwkkw', 'wkkwwkkw', 'wwwkkwww', '.wwwwww.', '.wkwkwk.', '........'],
  phantom: ['........', 'b......b', 'bb....bb', '.bbbbbb.', '..bBBb..', '...bb...', '........', '........'],
  storm: ['..mmmm..', '.mmmmmm.', 'mmmmmmmm', '...yy...', '..yy....', '...yy...', '....y...', '...y....'],
  gslime: ['gggggggg', 'gGGGGGGg', 'gkkGGkkg', 'gkkGGkkg', 'gGGGGGGg', 'gGGkkGGg', 'gGGGGGGg', 'gggggggg'],
  magma: ['nnnnnnnn', 'noooooon', 'nyyooyyn', 'nnnnnnnn', 'noooooon', 'nnoooonn', 'noooooon', 'nnnnnnnn'],
  ghast: ['wwwwwwww', 'wwwwwwww', 'wkkwwkkw', 'wwrwwrww', 'wwwkkwww', 'wwwwwwww', 'w.w.w.w.', 'w.w.w.w.'],
  netherite: ['mm....mm', 'mmmmmmmm', 'mmmmmmmm', '.mmmmmm.', '.mmSSmm.', '.mmmmmm.', '.mmmmmm.', '.mm..mm.'],
  dragon: ['........', 'kkk.....', 'kppkk...', 'kkkkkkk.', '.kkkkkkk', '.kk.k.k.', '........', '........'],
  totem: ['..nttn..', '..tete..', '..tttt..', 'ttttttt.', 'Y.tttt.Y', '..tett..', '..tttt..', '..YYYY..'],
  creeper: ['gGgggGgg', 'gkkggkkg', 'gkkggkkg', 'gggkkggg', 'ggkkkkgg', 'ggkkkkgg', 'ggkggkgg', 'gggggggg'],
  charged: ['BgBggBgB', 'gkkggkkg', 'Bkkggkkg', 'gggkkggB', 'ggkkkkgg', 'Bgkkkkgg', 'ggkggkgB', 'gBgggBgg'],
  shulker: ['pppppppp', 'pPPPPPPp', 'pppppppp', 'ppwwwwpp', 'ppwkwkpp', 'pppppppp', 'pPPPPPPp', 'pppppppp'],
  silverfish: ['........', '........', '.ssss...', 'sSSSSss.', 'sSSSSSSs', '.ssssss.', '..s.s.s.', '........'],
  endeye: ['..gggg..', '.gGGGGg.', 'gGkkkkGg', 'gGkeekGg', 'gGkkkkGg', '.gGGGGg.', '..gggg..', '........'],
  heart: ['.rr..rr.', 'rRRrrRRr', 'rRrrrrrr', 'rrrrrrrr', '.rrrrrr.', '..rrrr..', '...rr...', '........'],
  slots: ['ssssssss', 's.s.s.ss', 'ssssssss', 's.srRs.s', 'sssRrsss', 's.srRs.s', 'ssssssss', '........'],
  cat: ['o......o', 'oo....oo', 'oooooooo', 'oeoooeoo', 'oooooooo', 'ooonnooo', '.oooooo.', '........'],
  portal: ['kkkkkkkk', 'kPpPpPpk', 'kpPwwPpk', 'kPpPwPpk', 'kpPwPpPk', 'kPpPpPpk', 'kpPwPpPk', 'kkkkkkkk'],
  pick: ['.cccccc.', 'c..nn..c', '...nn...', '...nn...', '...nn...', '...nn...', '...nn...', '........'],
  bubble: ['..BBB...', '.B...B..', '.B.w.B..', '.B...B..', '..BBB.B.', '.....B.B', '......B.', '........'],
  chicken: ['..wwww..', '..wkwk..', '..wwyy..', '..rrww..', '.wwwww..', 'wwwwwww.', '.wwwww..', '..y.y...'],
  orb: ['..rrrr..', '.rRRRRr.', 'rRwRRRRr', 'rRRRRRRr', 'rRRRRRRr', 'rRRRRRRr', '.rRRRRr.', '..rrrr..'],
  apple: ['...n....', '...ng...', '.tttttt.', 'tYttttYt', 'tttttttt', 'tttttttt', '.tttttt.', '..tttt..'],
  skeleton: ['.wwwww..', '.wkwkw..', '.wwwww..', '..www...', '.wwwww..', '.w.w.w..', '..w.w...', '..w.w...'],
};
function drawIcon(ctx, name, x, y, s) {
  const m = ICONS[name]; if (!m) return;
  for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { const c = m[j][i]; if (c === '.') continue; ctx.fillStyle = PAL[c]; ctx.fillRect(x + i * s, y + j * s, s + .5, s + .5); }
}

// rich text: **gold**, ~~red~~
function runs(str) {
  const out = []; const re = /(\*\*[^*]+\*\*|~~[^~]+~~)/g; let last = 0, m;
  while ((m = re.exec(str))) { if (m.index > last) out.push([str.slice(last, m.index), '#ffffff']); const t = m[0]; out.push([t.slice(2, -2), t[0] === '*' ? '#ffcf3a' : '#ff5555']); last = re.lastIndex; }
  if (last < str.length) out.push([str.slice(last), '#ffffff']);
  return out;
}
function wrapRuns(ctx, str, maxW) {
  const words = []; for (const [t, c] of runs(str)) t.split(/(\s+)/).forEach(w => { if (w) words.push([w, c]); });
  const lines = [[]]; let wcur = 0;
  for (const [w, c] of words) {
    const ww = ctx.measureText(w).width;
    if (wcur + ww > maxW && w.trim() && lines[lines.length - 1].length) { lines.push([]); wcur = 0; if (!w.trim()) continue; }
    lines[lines.length - 1].push([w, c]); wcur += ww;
  }
  return lines;
}

function tooltip(ctx, x, y, wMax, icon, str, k, fs) {
  ctx.font = `${fs}px MC`;
  const lines = wrapRuns(ctx, str, wMax - 150);
  const w = Math.min(wMax, 150 + Math.max(...lines.map(l => l.reduce((a, [t]) => a + ctx.measureText(t).width, 0))));
  const lh = fs * 1.3, h = Math.max(92, 40 + lines.length * lh);
  const s = lerp(.6, 1, ease.outBack(clamp(k * 1.4)));
  ctx.save(); ctx.globalAlpha = clamp(k * 3); ctx.translate(x + (1 - ease.outExpo(clamp(k))) * -120, y + h / 2); ctx.scale(s, s); ctx.translate(0, -h / 2);
  ctx.fillStyle = 'rgba(16,0,16,.94)'; ctx.fillRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#5000ff'); g.addColorStop(1, '#28007f');
  ctx.strokeStyle = g; ctx.lineWidth = 5; ctx.strokeRect(5, 5, w - 10, h - 10);
  // icon slot
  ctx.fillStyle = '#8b8b8b'; ctx.fillRect(22, h / 2 - 34, 68, 68); ctx.fillStyle = '#373737'; ctx.fillRect(22, h / 2 - 34, 68, 4); ctx.fillRect(22, h / 2 - 34, 4, 68);
  const bob = Math.sin(k * 12) * 3 * (1 - clamp(k));
  drawIcon(ctx, icon, 28, h / 2 - 28 + bob, 7);
  ctx.textBaseline = 'middle';
  lines.forEach((ln, i) => {
    let cx = 118; const cy = h / 2 + (i - (lines.length - 1) / 2) * lh;
    for (const [t, c] of ln) { ctx.fillStyle = '#3f3f3f'; ctx.fillText(t, cx + 3, cy + 3); ctx.fillStyle = c; ctx.fillText(t, cx, cy); cx += ctx.measureText(t).width; }
  });
  ctx.restore();
  return { h, w };
}

let BG = null;
function tiledBg() {
  const c = makeCanvas(W, H), x = c.getContext('2d'); x.imageSmoothingEnabled = false;
  const S = 96, r = rng(9);
  const names = ['obsidian', 'obsidian', 'blackstone', 'netherrack', 'nether_bricks', 'crying_obsidian'];
  for (let j = 0; j < Math.ceil(H / S) + 1; j++) for (let i = 0; i < Math.ceil(W / S) + 1; i++) {
    const n = names[Math.floor(r() * r() * names.length)], t = TILES[n];
    x.drawImage(atlasCanvas, (t % TILE_COLS) * TILE, Math.floor(t / TILE_COLS) * TILE, TILE, TILE, i * S, j * S, S, S);
  }
  x.fillStyle = 'rgba(6,2,4,.72)'; x.fillRect(0, 0, W, H);
  return c;
}

// ---- 3D showcase: the mob / item of the current change, spinning on an obsidian pedestal
function showcaseModel(icon) {
  const PX = 1 / 16, g = new THREE.Group();
  const add = (m, s = 1, y = 0, x = 0) => { m.scale.multiplyScalar(PX * s); m.position.set(x, y, 0); g.add(m); return m; };
  switch (icon) {
    case 'spider': { const sp = add(M.spider(), 1.6); const fx = M.particlesCube('#b070ff', 18, 1.2, .08); g.add(fx); g.userData.fx = fx; break; }
    case 'mobs': add(M.zombie(), 1, 0, -.7); add(M.skeleton(), 1, 0, .7); break;
    case 'skeleton': { add(M.spider(), 1.4); add(M.skeleton(), 1, .9); break; }
    case 'angry': { const c = add(M.chicken(), 2.2); break; }
    case 'phantom': add(M.phantom(), 3.2, 1.4); break;
    case 'gslime': add(M.slime({ size: 3 }), 1, 0, 0); break;
    case 'totem': add(M.totem(), 3, 1.2); break;
    case 'charged': { const c = add(M.creeper(), 1.4); M.chargedAura(c); break; }
    case 'creeper': add(M.creeper(), 1.4); break;
    case 'silverfish': add(M.silverfish(), 4, .1); break;
    case 'endeye': add(M.quantumCreeper(), 1.4); break;
    case 'cat': add(M.cat(), 2.4); break;
    case 'chicken': add(M.chicken(), 1.8, 0, -.7); add(M.silverfish(), 3, .1, .8); break;
    case 'netherite': case 'heart': case 'orb': case 'bubble': case 'storm': case 'moon': case 'bed': case 'portal': case 'pick':
    default: return null;
  }
  // normalise: ~1.9 blocks tall, standing centred on the pedestal
  const box = new THREE.Box3().setFromObject(g), size = box.getSize(new THREE.Vector3());
  const k = 2.0 / Math.max(size.y, size.x * .7, .01);
  const wrap = new THREE.Group(); g.scale.multiplyScalar(k);
  const b2 = new THREE.Box3().setFromObject(g), c = b2.getCenter(new THREE.Vector3());
  g.position.x -= c.x; g.position.z -= c.z; g.position.y -= b2.min.y;
  wrap.add(g); wrap.userData.fx = g.userData.fx;
  return wrap;
}

// digit wheel for the odometer
function wheel(ctx, x, y, from, to, k, fs) {
  const v = lerp(from, to, ease.inOut(k));
  const base = Math.floor(v), frac = v - base;
  ctx.save(); ctx.beginPath(); ctx.rect(x - fs * .35, y - fs * .62, fs * .7, fs * 1.24); ctx.clip();
  for (const [d, off] of [[base, 0], [base + 1, 1]]) {
    const yy = y + (off - frac) * fs * 1.1;
    text(ctx, String(((d % 10) + 10) % 10), x, yy, { font: `700 ${fs}px MC`, color: '#f3e6d0' });
  }
  ctx.restore();
}

export function decree2(assets, { day, prev = 0, date, headline = 'AUMENTO DE DIFICULTAD', quote, items, deaths, dur }) {
  BG = BG || tiledBg();
  const scene = new THREE.Scene();
  const bgTex = new THREE.CanvasTexture(BG); bgTex.colorSpace = THREE.SRGBColorSpace; bgTex.wrapS = bgTex.wrapT = THREE.RepeatWrapping;
  scene.background = bgTex;
  const ped = new World(3, 2, 3, [-1, -2, -1]); ped.fill(-1, -2, -1, 1, -1, 1, 'obsidian'); ped.set(0, -1, 0, 'crying_obsidian');
  const pedM = ped.build(); scene.add(pedM);
  scene.add(new THREE.HemisphereLight('#c8a8a8', '#200808', 1.1));
  const spot = new THREE.SpotLight('#fff0e0', 260, 20, .5, .6, 1.5); spot.position.set(0, 8, 4); spot.target.position.set(0, 0, 0); scene.add(spot, spot.target);
  const rim = new THREE.PointLight('#ff3010', 60, 10, 1.5); rim.position.set(-2.5, 2, -2.5); scene.add(rim);
  const cam3 = new THREE.PerspectiveCamera(30, W / H, .1, 100);
  const models = items.map(it => { const m = showcaseModel(it.icon); if (m) { m.visible = false; scene.add(m); } return m; });
  const T0 = quote ? 1.9 : 1.2; // items start
  const gap = .9;
  dur = dur ?? T0 + items.length * gap + 2.4;
  const ROLL = .95;
  const cues = [];
  const steps = Math.min(12, Math.max(1, day - prev));
  for (let i = 0; i < steps; i++) cues.push({ t: ROLL * (i / steps) * .95, type: 'tick' });
  cues.push({ t: ROLL, type: 'decree' });
  items.forEach((_, i) => cues.push({ t: T0 + .3 + i * gap, type: 'decree_item' }));
  return {
    id: 'decree_' + day, dur, cues, transIn: { mode: 3, dur: .35 },
    draw(ctx, lt, env) {
      // 3D showcase (the pedestal sits on the right third of the frame)
      bgTex.offset.set((env.t * .006) % 1, (env.t * .003) % 1);
      let cur = -1; items.forEach((_, i) => { if (lt >= T0 + i * gap && models[i]) cur = i; });
      models.forEach((m, i) => { if (!m) return; m.visible = i === cur; });
      if (cur >= 0) {
        const m = models[cur], d = lt - (T0 + cur * gap);
        m.scale.setScalar(ease.outBack(clamp(d / .4)));
        m.rotation.y = env.t * .9;
        m.position.y = Math.sin(env.t * 2) * .06;
        if (m.userData.fx) M.animParticles(m.userData.fx, env.t, { rise: .5, spread: 1 });
        m.traverse(o => { if (o.userData && o.userData.shimmer) o.userData.shimmer(env.t); });
      }
      pedM.visible = true;
      cam3.position.set(-4.4, 3.4, 18.5); cam3.lookAt(-4.2, .9, 0); cam3.fov = 24; cam3.updateProjectionMatrix();
      ctx.drawImage(renderPlain(scene, cam3), 0, 0);
      const pulse = lt > ROLL ? Math.exp(-(lt - ROLL) * 3) : 0;
      glow(ctx, 330, 230, 520 + pulse * 300, `rgba(200,20,10,${.35 + pulse * .4})`, 1);
      embers(ctx, env.t, { n: 120, seed: day, alpha: .8 });
      // giant ghost number behind everything
      text(ctx, String(day), W - 330, H * .58, { font: '700 620px MC', color: 'rgba(255,40,20,.06)' });
      // odometer
      const k = clamp(lt / ROLL);
      const land = lt > ROLL ? ease.outBack(clamp((lt - ROLL) / .35)) : 0;
      const sc = lt < ROLL ? 1 : lerp(1.25, 1, land);
      ctx.save(); ctx.translate(90, 245); ctx.scale(sc, sc);
      text(ctx, 'DÍA', 0, -120, { font: '700 54px MC', color: '#ff5a3a', align: 'left' });
      const d2 = [Math.floor(prev / 10), prev % 10], t2 = [Math.floor(day / 10), day % 10];
      wheel(ctx, 70, 20, prev / 10, day / 10, k, 200);
      wheel(ctx, 200, 20, prev, day, k, 200);
      ctx.restore();
      if (lt > ROLL) { // cracks where it slammed
        const r = rng(day * 7); ctx.save(); ctx.strokeStyle = `rgba(255,120,60,${.7 * Math.exp(-(lt - ROLL) * 1.5)})`; ctx.lineWidth = 3;
        for (let i = 0; i < 7; i++) { let x = 250, y = 250; ctx.beginPath(); ctx.moveTo(x, y); const a = r() * Math.PI * 2; for (let j = 0; j < 5; j++) { x += Math.cos(a + (r() - .5)) * 40; y += Math.sin(a + (r() - .5)) * 40; ctx.lineTo(x, y); } ctx.stroke(); }
        ctx.restore();
      }
      // headline (glitch-typed)
      const hk = clamp((lt - ROLL - .1) / .5);
      if (hk > 0) {
        const n = Math.floor(headline.length * hk);
        const gl = hk < 1 && Math.floor(env.t * 30) % 3 === 0 ? 6 : 0;
        text(ctx, headline.slice(0, n), 470 + gl, 190, { font: '700 64px MC', color: '#ff3b2b', align: 'left', stroke: '#1a0000', strokeW: 8 });
        text(ctx, date || '', 474, 262, { font: '30px MC', color: '#cbb89a', align: 'left', alpha: hk });
      }
      if (quote) {
        const qk = clamp((lt - ROLL - .6) / .4);
        quote.split('\n').forEach((q, i) => text(ctx, q, 474, 318 + i * 40, { font: '32px MC', color: '#ffe6b0', align: 'left', alpha: qk }));
      }
      // tooltips
      const fs = items.length > 4 ? 30 : 34;
      let y = quote ? 420 : 350;
      items.forEach((it, i) => {
        const d = lt - (T0 + i * gap);
        if (d < -.001) { ctx.font = `${fs}px MC`; y += Math.max(92, 40 + wrapRuns(ctx, it.text, 1280 - 150).length * fs * 1.3) + 16; return; }
        const kk = clamp(d / .45);
        const { h, w } = tooltip(ctx, 90, y, 1280, it.icon, it.text, kk, fs);
        if (it.face) face(ctx, assets.skins[it.face], 90 + w + 24, y + h / 2 - 44, 88, { alpha: clamp(kk * 2) });
        y += h + 16;
      });
      if (deaths) dayRibbon(ctx, day, deaths, { assets, alpha: .9 });
    },
    fx(lt) {
      const sl = lt - ROLL;
      return { ca: .003 + (sl > 0 && sl < .3 ? .02 * (1 - sl / .3) : 0), shake: sl > 0 && sl < .35 ? [Math.sin(lt * 70) * .01 * (1 - sl / .35), Math.cos(lt * 50) * .01 * (1 - sl / .35)] : [0, 0], vig: .5, flash: sl > 0 && sl < .2 ? .5 * (1 - sl / .2) : 0, flashCol: [1, .45, .3] };
    },
  };
}
