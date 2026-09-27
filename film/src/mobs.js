// Procedural box-model mobs (textures painted in code, Minecraft pixel units: 16 = 1 block).
import { THREE } from './gl.js';
import { rng } from './engine.js';

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function faceTex(w, h, fn, seed) {
  const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h));
  const x = c.getContext('2d'); const img = x.createImageData(c.width, c.height); const r = rng(seed);
  for (let j = 0; j < c.height; j++) for (let i = 0; i < c.width; i++) {
    const col = fn(i, j, r, c.width, c.height);
    const k = (j * c.width + i) * 4;
    img.data[k] = col[0]; img.data[k + 1] = col[1]; img.data[k + 2] = col[2]; img.data[k + 3] = col[3] ?? 255;
  }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
// painter(face, i, j, r, W, H) ; faces: 'px','nx','py','ny','pz'(front),'nz'
let seedC = 1;
export function pixBox(w, h, d, painter, { emissive = false, transparent = false } = {}) {
  const dims = { px: [d, h], nx: [d, h], py: [w, d], ny: [w, d], pz: [w, h], nz: [w, h] };
  const mats = ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map(f => {
    const tex = faceTex(dims[f][0], dims[f][1], (i, j, r, W, H) => painter(f, i, j, r, W, H), seedC++ * 131);
    return emissive ? new THREE.MeshBasicMaterial({ map: tex, transparent, alphaTest: transparent ? .3 : 0 })
      : new THREE.MeshLambertMaterial({ map: tex, transparent, alphaTest: transparent ? .3 : 0, side: transparent ? THREE.DoubleSide : THREE.FrontSide });
  });
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
const mottle = (cols, weights) => (r) => { let v = r(), acc = 0; for (let i = 0; i < cols.length; i++) { acc += weights[i]; if (v < acc) return cols[i]; } return cols[cols.length - 1]; };
// part = pivot group with a box offset inside it
function part(parent, box, pivot, offset = [0, 0, 0]) {
  const g = new THREE.Group(); g.position.set(...pivot); box.position.set(...offset); g.add(box); parent.add(g); return g;
}
function finish(root, parts, height) {
  root.userData = { ...parts, height };
  root.traverse(o => { if (o.isMesh) { o.castShadow = true; } });
  return root;
}

// ---------------------------------------------------------------- creeper
export function creeper() {
  const G = [hex('#4f9a3e'), hex('#3a7a2b'), hex('#6dbb57'), hex('#9ccf88'), hex('#2e5e22')];
  const skin = mottle(G, [.35, .25, .2, .08, .12]);
  const face = new Set(['1,2', '2,2', '1,3', '2,3', '5,2', '6,2', '5,3', '6,3', '3,4', '4,4', '3,5', '4,5', '2,5', '5,5', '2,6', '3,6', '4,6', '5,6', '2,7', '5,7']);
  const root = new THREE.Group();
  const head = part(root, pixBox(8, 8, 8, (f, i, j, r) => (f === 'pz' && face.has(`${i},${j}`)) ? hex('#0d0d0d') : skin(r)), [0, 18, 0], [0, 4, 0]);
  const body = part(root, pixBox(8, 12, 4, (f, i, j, r) => skin(r)), [0, 6, 0], [0, 6, 0]);
  const legs = [[-2, 4], [2, 4], [-2, -4], [2, -4]].map(([x, z]) => part(root, pixBox(4, 6, 4, (f, i, j, r) => j > 4 && f !== 'py' ? hex('#1d3a15') : skin(r)), [x, 6, z], [0, -3, 0]));
  return finish(root, { head, body, legs }, 26);
}

// ---------------------------------------------------------------- ghast
export function ghast() {
  const W = [hex('#f2f2f2'), hex('#e3e3e3'), hex('#d4d4d4'), hex('#c8c8c8')];
  const skin = mottle(W, [.5, .25, .15, .1]);
  const mk = (open) => (f, i, j, r) => {
    if (f === 'pz') {
      if (!open) { if (j === 6 && ((i >= 3 && i <= 5) || (i >= 10 && i <= 12))) return hex('#3a3a3a'); if (j === 11 && i >= 6 && i <= 9) return hex('#555555'); }
      else {
        if ((j >= 4 && j <= 6) && ((i >= 3 && i <= 5) || (i >= 10 && i <= 12))) return hex('#1a1a1a');
        if (j >= 7 && j <= 12 && (i === 4 || i === 11)) return hex('#b01f1f');
        if (j >= 9 && j <= 12 && i >= 6 && i <= 9) return hex('#1a1a1a');
      }
    }
    return skin(r);
  };
  const root = new THREE.Group();
  const bodyC = pixBox(16, 16, 16, mk(false));
  const bodyO = pixBox(16, 16, 16, mk(true)); bodyO.visible = false;
  const body = part(root, bodyC, [0, 0, 0]); body.add(bodyO);
  const tent = [];
  for (let k = 0; k < 9; k++) {
    const x = (k % 3 - 1) * 5 + (k === 4 ? 1 : 0), z = (Math.floor(k / 3) - 1) * 5;
    const len = 9 + (k * 5) % 6;
    tent.push(part(root, pixBox(2, len, 2, (f, i, j, r) => skin(r)), [x, -8, z], [0, -len / 2, 0]));
  }
  root.userData = { body, tent, faceOpen: v => { bodyC.visible = !v; bodyO.visible = v; }, height: 16 };
  return root;
}

// ---------------------------------------------------------------- spider
export function spider({ cave = false } = {}) {
  const base = cave ? [hex('#12383d'), hex('#0c2a2e'), hex('#1b4a50')] : [hex('#3b3029'), hex('#2a211c'), hex('#4a3d33')];
  const skin = mottle(base, [.5, .3, .2]);
  const eyes = new Set(['1,2', '2,2', '5,2', '6,2', '2,4', '5,4', '3,1', '4,1']);
  const root = new THREE.Group();
  const head = part(root, pixBox(8, 8, 8, (f, i, j, r) => f === 'pz' && eyes.has(`${i},${j}`) ? hex('#d41d1d') : skin(r)), [0, 9, 3], [0, 0, 4]);
  const neck = part(root, pixBox(6, 6, 6, (f, i, j, r) => skin(r)), [0, 9, 0], [0, 0, 0]);
  const abd = part(root, pixBox(10, 8, 12, (f, i, j, r) => (f === 'py' && (i + j) % 5 === 0) ? hex('#6b1414') : skin(r)), [0, 9, -3], [0, 1, -6]);
  const legs = [];
  for (let k = 0; k < 8; k++) {
    const side = k < 4 ? 1 : -1, z = 2 - (k % 4) * 1.5;
    const g = part(root, pixBox(16, 2, 2, (f, i, j, r) => skin(r)), [side * 3, 9, z], [side * 8, 0, 0]);
    g.rotation.z = -side * .62; g.rotation.y = side * ((k % 4) - 1.5) * .38;
    legs.push(g);
  }
  if (cave) root.scale.setScalar(.7);
  return finish(root, { head, neck, abd, legs }, 12);
}

// ---------------------------------------------------------------- humanoid mobs
function humanoid({ head, body, arm, leg, armW = 4, legW = 4, armLen = 12, legLen = 12, bodyH = 12 }) {
  const root = new THREE.Group();
  const hy = legLen + bodyH;
  const h = part(root, pixBox(8, 8, 8, head), [0, hy, 0], [0, 4, 0]);
  const b = part(root, pixBox(8, bodyH, 4, body), [0, hy, 0], [0, -bodyH / 2, 0]);
  const aR = part(root, pixBox(armW, armLen, armW, arm), [-(4 + armW / 2), hy - 2, 0], [0, -armLen / 2 + 2, 0]);
  const aL = part(root, pixBox(armW, armLen, armW, arm), [4 + armW / 2, hy - 2, 0], [0, -armLen / 2 + 2, 0]);
  const lR = part(root, pixBox(legW, legLen, legW, leg), [-2, legLen, 0], [0, -legLen / 2, 0]);
  const lL = part(root, pixBox(legW, legLen, legW, leg), [2, legLen, 0], [0, -legLen / 2, 0]);
  return finish(root, { head: h, body: b, armR: aR, armL: aL, legR: lR, legL: lL }, hy + 8);
}
export function skeleton({ wither = false, stray = false } = {}) {
  const bone = wither ? [hex('#2b2b2b'), hex('#1f1f1f'), hex('#3a3a3a')] : [hex('#c9c9c9'), hex('#b3b3b3'), hex('#dedede')];
  const sk = mottle(bone, [.5, .25, .25]);
  const dark = wither ? hex('#0a0a0a') : hex('#3a3a3a');
  const faceP = (f, i, j, r) => {
    if (f === 'pz') { if ((j === 3 || j === 4) && (i === 1 || i === 2 || i === 5 || i === 6)) return dark; if (j === 5 && (i === 3 || i === 4)) return dark; if (j === 6 && i >= 1 && i <= 6) return i % 2 ? dark : sk(r); }
    if (stray && j < 3) return hex('#6d8f8a');
    return sk(r);
  };
  const ribs = (f, i, j, r) => (f === 'pz' || f === 'nz') ? ((j % 2 === 0 && j < 9) || i === 3 || i === 4 ? (stray ? hex('#6d8f8a') : sk(r)) : [0, 0, 0, 0]) : (i % 3 === 1 ? sk(r) : [0, 0, 0, 0]);
  const m = humanoid({ head: faceP, body: ribs, arm: (f, i, j, r) => stray && j > 8 ? hex('#5c7a76') : sk(r), leg: (f, i, j, r) => stray && j < 6 ? hex('#5c7a76') : sk(r), armW: 2, legW: 2 });
  m.userData.body.children[0].material.forEach(mt => { mt.transparent = true; mt.alphaTest = .3; mt.side = THREE.DoubleSide; });
  if (wither) m.scale.setScalar(1.2);
  return m;
}
export function zombie() {
  const skin = mottle([hex('#5c8a45'), hex('#4c7a38'), hex('#6c9a52')], [.5, .3, .2]);
  return humanoid({
    head: (f, i, j, r) => f === 'pz' && j === 4 && (i === 1 || i === 2 || i === 5 || i === 6) ? hex('#1c2a14') : f === 'py' || j < 2 ? hex('#2f4a22') : skin(r),
    body: (f, i, j, r) => j > 10 ? hex('#3b3a6b') : mottle([hex('#2d8a8a'), hex('#267777'), hex('#339999')], [.5, .3, .2])(r),
    arm: (f, i, j, r) => j < 4 ? hex('#2d8a8a') : skin(r),
    leg: (f, i, j, r) => j > 9 ? hex('#3a3a3a') : mottle([hex('#463a8a'), hex('#3a307a')], [.6, .4])(r),
  });
}
export function enderman() {
  const sk = mottle([hex('#161616'), hex('#0d0d0d'), hex('#1f1f1f')], [.5, .3, .2]);
  const m = humanoid({
    head: (f, i, j, r) => f === 'pz' && j === 4 && (i <= 2 || i >= 5) ? (i === 1 || i === 6 ? hex('#e079fa') : hex('#cc00fa')) : sk(r),
    body: (f, i, j, r) => sk(r), arm: (f, i, j, r) => sk(r), leg: (f, i, j, r) => sk(r),
    armW: 2, legW: 2, armLen: 30, legLen: 30,
  });
  return m;
}
export function piglin({ zombified = false } = {}) {
  const pink = zombified ? mottle([hex('#d99a8f'), hex('#6b9e5a'), hex('#c98b80')], [.5, .25, .25]) : mottle([hex('#e3a598'), hex('#d4958a'), hex('#eab3a8')], [.5, .3, .2]);
  return humanoid({
    head: (f, i, j, r) => f === 'pz' && j >= 5 && i >= 2 && i <= 5 ? (j === 6 && (i === 3 || i === 4) ? hex('#6b3a33') : hex('#f0b8ad')) : f === 'pz' && j === 3 && (i === 1 || i === 6) ? hex('#1a1a1a') : pink(r),
    body: (f, i, j, r) => j < 8 ? mottle([hex('#6b4a2a'), hex('#5a3e22')], [.6, .4])(r) : hex('#8a6a3a'),
    arm: (f, i, j, r) => pink(r),
    leg: (f, i, j, r) => j > 8 ? hex('#3a2a1a') : hex('#6b4a2a'),
  });
}
export function pillager() {
  const sk = mottle([hex('#9aa0a0'), hex('#8a9090')], [.6, .4]);
  return humanoid({
    head: (f, i, j, r) => f === 'pz' && j === 3 && (i === 2 || i === 5) ? hex('#1b1b1b') : f === 'pz' && j === 1 ? hex('#3a3a3a') : sk(r),
    body: (f, i, j, r) => mottle([hex('#4a4a52'), hex('#3a3a42'), hex('#6b5a3a')], [.45, .45, .1])(r),
    arm: (f, i, j, r) => hex('#4a4a52'), leg: (f, i, j, r) => hex('#2a2a32'),
  });
}
export function witch() {
  return humanoid({
    head: (f, i, j, r) => f === 'pz' && j === 4 && (i === 2 || i === 5) ? hex('#2a8a2a') : f === 'pz' && j >= 5 && i >= 3 && i <= 4 ? hex('#8a6a5a') : hex('#b08a74'),
    body: (f, i, j, r) => mottle([hex('#4a2a5a'), hex('#3a204a')], [.6, .4])(r),
    arm: (f, i, j, r) => hex('#4a2a5a'), leg: (f, i, j, r) => hex('#3a204a'),
  });
}

// ---------------------------------------------------------------- flyers
export function vex() {
  const root = new THREE.Group();
  const sk = mottle([hex('#8fa7c4'), hex('#7a93b3'), hex('#a8bdd6')], [.5, .3, .2]);
  const head = part(root, pixBox(8, 8, 8, (f, i, j, r) => f === 'pz' && j === 4 && (i === 2 || i === 5) ? hex('#1a1a2a') : sk(r)), [0, 10, 0], [0, 4, 0]);
  const body = part(root, pixBox(8, 10, 4, (f, i, j, r) => sk(r)), [0, 10, 0], [0, -5, 0]);
  const wingP = (f, i, j, r) => (i + j) % 3 === 0 ? [220, 230, 245, 200] : [200, 215, 235, 120];
  const wL = part(root, pixBox(1, 12, 10, wingP, { transparent: true }), [2, 9, -2], [0, 0, -5]);
  const wR = part(root, pixBox(1, 12, 10, wingP, { transparent: true }), [-2, 9, -2], [0, 0, -5]);
  const arm = part(root, pixBox(3, 8, 3, (f, i, j, r) => sk(r)), [-5, 8, 0], [0, -4, 0]);
  const sword = part(arm, pixBox(1, 12, 2, (f, i, j) => j > 8 ? hex('#6b4a2a') : hex('#d8d8e0')), [0, -8, 1], [0, -2, 5]);
  sword.rotation.x = Math.PI / 2;
  root.scale.setScalar(.6);
  return finish(root, { head, body, wL, wR, arm }, 10);
}
export function phantom() {
  const root = new THREE.Group();
  const sk = mottle([hex('#3a4a7a'), hex('#2e3c66'), hex('#4a5c8e')], [.5, .3, .2]);
  const body = part(root, pixBox(5, 3, 9, (f, i, j, r) => sk(r)), [0, 0, 0]);
  const head = part(root, pixBox(7, 3, 5, (f, i, j, r) => f === 'pz' && j === 1 && (i === 1 || i === 5) ? hex('#6bff6b') : sk(r)), [0, 0, 5.5], [0, 0, 2]);
  const wL = part(root, pixBox(10, 1, 7, (f, i, j, r) => (i === 9 ? hex('#8a9ab8') : sk(r))), [2.5, 1, 0], [5, 0, 0]);
  const wR = part(root, pixBox(10, 1, 7, (f, i, j, r) => (i === 0 ? hex('#8a9ab8') : sk(r))), [-2.5, 1, 0], [-5, 0, 0]);
  const tail = part(root, pixBox(3, 2, 6, (f, i, j, r) => sk(r)), [0, 0, -4.5], [0, 0, -3]);
  return finish(root, { body, head, wL, wR, tail }, 4);
}
export function blaze() {
  const root = new THREE.Group();
  const y = mottle([hex('#f2c33a'), hex('#e0a21e'), hex('#f7dc6b')], [.5, .3, .2]);
  const head = part(root, pixBox(8, 8, 8, (f, i, j, r) => f === 'pz' && j === 3 && (i === 1 || i === 2 || i === 5 || i === 6) ? hex('#2a1a0a') : f === 'pz' && j === 5 && i > 1 && i < 6 ? hex('#8a4a0a') : y(r), { emissive: true }), [0, 20, 0], [0, 4, 0]);
  const rods = [];
  for (let k = 0; k < 12; k++) rods.push(part(root, pixBox(2, 8, 2, (f, i, j, r) => y(r), { emissive: true }), [0, 0, 0]));
  return finish(root, { head, rods }, 28);
}
export function slime({ magma = false, size = 2 } = {}) {
  const root = new THREE.Group();
  const s = size * 4;
  const cell = (i, j, W, H) => [Math.floor(i * 8 / W), Math.floor(j * 8 / H)];
  let outer;
  if (magma) {
    const col = mottle([hex('#3a1208'), hex('#5a1e0c'), hex('#6b240f')], [.4, .35, .25]);
    outer = pixBox(s * 2, s * 2, s * 2, (f, i, j, r, W, H) => {
      const [ci, cj] = cell(i, j, W, H);
      if (f === 'pz' && cj === 3 && (ci === 1 || ci === 2 || ci === 5 || ci === 6)) return ci === 2 || ci === 5 ? hex('#ffe066') : hex('#ff4a10');
      if (cj === 4 || (cj === 1 && ci % 3 === 0) || (cj === 6 && (ci + 1) % 3 === 0)) return mottle([hex('#ff8a1c'), hex('#ffb13b'), hex('#d8420c')], [.4, .3, .3])(r);
      return col(r);
    }, { emissive: true });
  } else {
    outer = pixBox(s * 2, s * 2, s * 2, (f, i, j, r, W, H) => {
      const [ci, cj] = cell(i, j, W, H);
      if (f === 'pz') {
        if ((ci === 1 || ci === 2) && (cj === 2 || cj === 3)) return ci === 1 && cj === 2 ? hex('#6a8a5a') : hex('#1f3a1a');
        if ((ci === 5 || ci === 6) && (cj === 2 || cj === 3)) return ci === 6 && cj === 2 ? hex('#6a8a5a') : hex('#1f3a1a');
        if (ci === 4 && cj === 5) return hex('#1f3a1a');
      }
      return [...mottle([hex('#7ed36a'), hex('#6cc25a'), hex('#8fe07a')], [.5, .3, .2])(r), 200];
    }, { transparent: true });
    const inner = pixBox(s * 1.5, s * 1.5, s * 1.5, (f, i, j, r) => mottle([hex('#5aa84a'), hex('#4c9a3c')], [.6, .4])(r));
    inner.position.y = 0;
    outer.add(inner);
  }
  const body = part(root, outer, [0, s, 0]);
  return finish(root, { body }, s * 2);
}

// ---------------------------------------------------------------- props
export function arrow() {
  const g = new THREE.Group();
  const shaft = pixBox(.6, .6, 10, () => hex('#6b4a2a')); g.add(shaft);
  const tip = pixBox(1.2, 1.2, 2, () => hex('#9a9a9a')); tip.position.z = 5.5; g.add(tip);
  const fl = pixBox(2.4, .3, 2, () => hex('#e8e8e8')); fl.position.z = -4.5; g.add(fl);
  return g;
}
export function fireball(size = 6) {
  const g = new THREE.Group();
  const core = pixBox(size, size, size, (f, i, j, r) => mottle([hex('#ffd24a'), hex('#f88b1c'), hex('#d2500e')], [.3, .4, .3])(r), { emissive: true });
  g.add(core);
  g.userData.core = core;
  return g;
}
export function totem() {
  const g = new THREE.Group();
  const P = new Set(['1,0', '2,0', '1,1', '2,1', '0,2', '1,2', '2,2', '3,2', '1,3', '2,3', '1,4', '2,4', '0,5', '3,5']);
  const m = pixBox(4, 6, .5, (f, i, j) => (f === 'pz' || f === 'nz') ? (P.has(`${i},${j}`) ? (j < 2 ? hex('#f5d547') : j === 2 ? hex('#3cb043') : hex('#e8b52a')) : [0, 0, 0, 0]) : hex('#e8b52a'), { emissive: true, transparent: true });
  m.scale.setScalar(2.2);
  g.add(m);
  return g;
}
export function tntBlock() {
  return pixBox(16, 16, 16, (f, i, j, r) => (f === 'py' || f === 'ny') ? ((i - 7.5) ** 2 + (j - 7.5) ** 2 < 5 ? hex('#3a3a3a') : hex('#cc3a22')) : (j > 5 && j < 10 ? (i > 1 && i < 14 ? hex('#e6e6e6') : hex('#c9c9c9')) : (i % 4 === 0 ? hex('#8e2a14') : hex('#db3b1e'))));
}

// ---------------------------------------------------------------- more mobs
export function silverfish() {
  const root = new THREE.Group();
  const sk = mottle([hex('#8a8f96'), hex('#6f747a'), hex('#a3a8ae')], [.5, .3, .2]);
  const segs = [];
  const dims = [[3, 2, 2], [4, 3, 2], [6, 4, 3], [3, 3, 3], [2, 2, 3], [2, 1, 2], [1, 1, 2]];
  let z = 0;
  dims.forEach(([w, h, d], i) => {
    const g = part(root, pixBox(w, h, d, (f, a, b, r) => sk(r)), [0, h / 2, z - d / 2]);
    if (i >= 1 && i <= 3) for (const sx of [-1, 1]) { const leg = pixBox(1, 1.5, 1, () => hex('#5a5f66')); leg.position.set(sx * (w / 2 + .3), -h / 2, 0); g.add(leg); }
    segs.push(g); z -= d;
  });
  for (const sx of [-1, 1]) { const ant = pixBox(.5, .5, 3, () => hex('#5a5f66')); ant.position.set(sx * 1, 1.2, 2.2); ant.rotation.y = sx * .4; segs[0].add(ant); }
  return finish(root, { segs }, 4);
}
export function shulker({ color = 'yellow' } = {}) {
  const root = new THREE.Group();
  const pal = color === 'yellow' ? ['#c9c24a', '#a8a236', '#e0da6a', '#7a7424'] : ['#9a6a9a', '#7a4f7a', '#b58ab5', '#5a3a5a'];
  const shellP = (f, i, j, r, W, H) => {
    if (f === 'py' || f === 'ny') return hex((i + j) % 5 === 0 ? pal[3] : pal[0]);
    if (j === 0 || j === H - 1) return hex(pal[3]);
    if (j % 3 === 1) return hex(pal[2]);
    return mottle([hex(pal[0]), hex(pal[1])], [.7, .3])(r);
  };
  const base = part(root, pixBox(16, 8, 16, shellP), [0, 4, 0]);
  const core = part(root, pixBox(14, 6, 14, () => hex('#5a2a6a')), [0, 9, 0]);
  const lid = part(root, pixBox(16, 12, 16, shellP), [0, 8, 0], [0, 6, 0]);
  const head = part(root, pixBox(6, 6, 6, (f, i, j) => f === 'pz' && j === 2 && (i === 1 || i === 4) ? hex('#1a1a1a') : f === 'pz' && j === 4 && i > 1 && i < 4 ? hex('#8a6a4a') : hex('#efe2a8')), [0, 8, 0], [0, 3, 0]);
  root.userData = { base, lid, head, core, height: 16, open: k => { lid.position.y = 8 + k * 6; lid.rotation.x = -k * .15; head.position.y = 8 + k * 2.5; } };
  root.userData.open(0);
  return root;
}
export function chicken() {
  const root = new THREE.Group();
  const wht = mottle([hex('#f4f4f4'), hex('#e2e2e2')], [.7, .3]);
  const body = part(root, pixBox(6, 6, 8, (f, i, j, r) => wht(r)), [0, 8, 0]);
  const head = part(root, pixBox(4, 6, 3, (f, i, j, r) => f === 'pz' && j === 1 && (i === 0 || i === 3) ? hex('#111111') : wht(r)), [0, 9, 4], [0, 3, 1]);
  part(head, pixBox(4, 2, 2, () => hex('#f2a93a')), [0, 4, 3.5]);
  part(head, pixBox(2, 2, 2, () => hex('#d02020')), [0, 2, 3]);
  const legs = [-1.5, 1.5].map(x => part(root, pixBox(1, 5, 1, () => hex('#f2a93a')), [x, 5, 0], [0, -2.5, 0]));
  const wings = [-3.5, 3.5].map(x => part(root, pixBox(1, 4, 6, (f, i, j, r) => wht(r)), [x, 10, 0], [0, -2, 0]));
  return finish(root, { body, head, legs, wings }, 12);
}
export function cat({ color = '#e8a33c' } = {}) {
  const root = new THREE.Group();
  const fur = mottle([hex(color), hex('#c9852a'), hex('#f5c26b')], [.5, .3, .2]);
  const body = part(root, pixBox(4, 5, 14, (f, i, j, r) => fur(r)), [0, 7, 0]);
  const head = part(root, pixBox(5, 4, 5, (f, i, j, r) => f === 'pz' && j === 1 && (i === 1 || i === 3) ? hex('#2aa82a') : fur(r)), [0, 9, 8], [0, 0, 0]);
  const legs = [[-1, 5], [1, 5], [-1, -5], [1, -5]].map(([x, z]) => part(root, pixBox(2, 6, 2, (f, i, j, r) => fur(r)), [x, 5, z], [0, -3, 0]));
  const tail = part(root, pixBox(1, 8, 1, (f, i, j, r) => fur(r)), [0, 9, -7], [0, 4, 0]);
  tail.rotation.x = -.9;
  return finish(root, { body, head, legs, tail }, 10);
}
// translucent "charged" shell around a creeper
export function chargedAura(target) {
  const mat = new THREE.MeshBasicMaterial({ color: '#8fc8ff', transparent: true, opacity: .35, wireframe: false, depthWrite: false, blending: THREE.AdditiveBlending });
  const g = new THREE.Group();
  const add = (w, h, d, y) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.y = y; g.add(m); };
  add(10, 10, 10, 22); add(10, 14, 6, 12); add(10, 8, 12, 3);
  target.add(g);
  return g;
}
export function particlesCube(color = '#b04aff', n = 20, spread = 10, size = 1) {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color });
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), mat);
    m.userData.seed = i;
    g.add(m);
  }
  g.userData.spread = spread;
  return g;
}
export function animParticles(g, t, { rise = 6, spread } = {}) {
  const S = spread ?? g.userData.spread;
  g.children.forEach((m, i) => {
    const ph = (t * .7 + i * .137) % 1;
    const a = i * 2.39;
    m.position.set(Math.cos(a) * S * (.3 + .7 * ((i * 7) % 10) / 10), ph * rise * 4, Math.sin(a) * S * (.3 + .7 * ((i * 3) % 10) / 10));
    m.scale.setScalar(1 - ph);
  });
}
export function elytra() {
  const g = new THREE.Group();
  const col = mottle([hex('#8a8fa8'), hex('#767b94'), hex('#a0a5bd')], [.5, .3, .2]);
  const L = part(g, pixBox(10, 20, 2, (f, i, j, r) => col(r)), [2, 0, 0], [5, -10, 0]);
  const R = part(g, pixBox(10, 20, 2, (f, i, j, r) => col(r)), [-2, 0, 0], [-5, -10, 0]);
  g.userData = { L, R };
  return g;
}
export function sword(kind = 'diamond') {
  const blade = { diamond: '#5fe0d8', netherite: '#4a4448', iron: '#dcdcdc', stone: '#8a8a8a', gold: '#f6d33b' }[kind];
  const g = new THREE.Group();
  part(g, pixBox(1, 11, 2, () => hex(blade)), [0, 0, 0], [0, 7, 0]);
  part(g, pixBox(1, 1, 5, () => hex('#3a2a1a')), [0, 1.5, 0]);
  part(g, pixBox(1, 3, 1, () => hex('#6b4a2a')), [0, -.5, 0]);
  return g;
}
export function shield() {
  return pixBox(1, 12, 10, (f, i, j, r) => (i === 0 || j === 0 || i === 9 || j === 11) && (f === 'px' || f === 'nx') ? hex('#8a8a8a') : mottle([hex('#8a6a3a'), hex('#7a5a2a')], [.6, .4])(r));
}
export function bow() {
  const g = new THREE.Group();
  for (let k = -3; k <= 3; k++) { const m = pixBox(1, 2, 1, () => hex('#7a5530')); m.position.set(0, k * 2, -Math.abs(k) * .8 + 2); g.add(m); }
  const s = pixBox(.3, 12, .3, () => hex('#e8e8e8')); s.position.z = -1.5; g.add(s);
  return g;
}

// explosion smoke: white/grey cubes that burst outwards and fade
export function puffs(n = 26, color = '#e8e8e8') {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: i % 3 ? color : '#9a9a9a', transparent: true, opacity: 1 }));
    m.userData.dir = new THREE.Vector3(Math.sin(i * 2.39) * Math.cos(i * 1.3), Math.abs(Math.sin(i * 1.7)) * .8 + .2, Math.cos(i * 2.39) * Math.cos(i * 1.3)).normalize();
    m.userData.sp = .6 + ((i * 37) % 10) / 10;
    g.add(m);
  }
  g.visible = false;
  return g;
}
export function animPuffs(g, t, { radius = 3.2, size = .9 } = {}) {
  if (t < 0) { g.visible = false; return; }
  g.visible = true;
  g.children.forEach((m, i) => {
    const k = 1 - Math.exp(-t * 4 * m.userData.sp);
    m.position.copy(m.userData.dir).multiplyScalar(radius * k * m.userData.sp);
    m.position.y += t * .6;
    const s = size * .7 * (1 + t * 1.1) * (1 - Math.min(1, t / 1.6));
    m.scale.setScalar(Math.max(.001, s));
    m.material.opacity = Math.max(0, 1 - t / 1.6);
  });
}
// flash burst (emissive sphere-ish cube cluster) for explosions / fireballs
export function burst(color = '#fff4c0') {
  const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color, transparent: true }));
  m.visible = false; return m;
}
export function animBurst(m, t, r = 4) {
  if (t < 0 || t > .35) { m.visible = false; return; }
  m.visible = true; const k = t / .35;
  m.scale.setScalar(r * (.3 + k)); m.material.opacity = 1 - k; m.rotation.set(t * 3, t * 5, 0);
}

// Ender Quantum Creeper as seen in the day-60 clips: a pale blue-white, translucent, shimmering blocky figure
export function quantumCreeper() {
  const c = creeper();
  const mat = new THREE.MeshBasicMaterial({ color: '#cfeaff', transparent: true, opacity: .55, depthWrite: true });
  c.traverse(o => { if (o.isMesh) o.material = mat; });
  const sparks = new THREE.Group();
  const sm = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  for (let i = 0; i < 18; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), sm); m.userData.p = i; sparks.add(m); }
  c.add(sparks);
  c.userData.shimmer = t => {
    mat.opacity = .4 + .25 * Math.abs(Math.sin(t * 9));
    sparks.children.forEach((m, i) => { const ph = (t * 1.3 + i * .17) % 1; m.position.set(Math.sin(i * 2.4) * 7, ph * 30, Math.cos(i * 2.4) * 7); m.scale.setScalar(1 - ph); });
  };
  return c;
}
