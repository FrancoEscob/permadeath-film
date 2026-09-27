// Helpers owned by the End-island deaths #23 Mikecrack, #25 Cibergun, #26 Alkapone, #27 Nia.
// (Other scenes must not depend on this file.)
import { THREE } from '../gl.js';
import * as M from '../mobs.js';
import { pixBox } from '../mobs.js';
import { groundAt, pose, PX, clamp, lerp } from './common.js';
import { noise2, fbm, hash2 } from '../engine.js';
import { BLOCK } from '../voxel.js';

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

// Organic End island: noise-warped rim, bowl-shaped underside, optional broad low terraces on top.
// keep(x,z) -> true forces that column to the base level (for paths / building plots).
export function isle(w, { cx = 0, cz = 0, r = 10, top = 0, depth = 7, seed = 1, terr = 0, keep = null, rimStep = false } = {}) {
  const R = Math.ceil(r * 1.4) + 2;
  const cols = [];
  for (let x = -R; x <= R; x++) for (let z = -R; z <= R; z++) {
    const a = Math.atan2(z, x), d = Math.hypot(x, z);
    const rr = r * (1 + .2 * noise2(Math.cos(a) * 1.4 + seed * 3.1, Math.sin(a) * 1.4 - seed, seed) + .07 * noise2(x * .35, z * .35, seed + 5));
    if (d >= rr) continue;
    const k = 1 - d / rr;
    const dd = Math.max(1, Math.round(Math.pow(k, .55) * depth + noise2(x * .45, z * .45, seed + 9) * 1.3));
    let h = 0;
    if (terr) h = clamp(Math.floor((fbm((cx + x) * .06, (cz + z) * .06, seed + 3, 3) + .35) * terr * 2.4), 0, terr);
    if (rimStep && k < .14) h -= 1;
    if (keep && keep(cx + x, cz + z)) h = 0;
    w.fill(cx + x, top - dd, cz + z, cx + x, top - 1 + h, cz + z, 'end_stone');
    cols.push([cx + x, cz + z, top + h]);
  }
  return cols;
}
// x coordinate where the island top ends when walking +x along row z (first empty column)
export function edgeX(w, x0, z, y = -1) { let x = Math.floor(x0); while (w.get(x, y, Math.floor(z)) && x < 200) x++; return x; }

// branching chorus plant (stalks + pale flowers) standing on the block below (x, y-1, z)
export function chorus(w, x, y, z, h = 5, seed = 1) {
  w.fill(x, y, z, x, y + h - 1, z, 'purpur');
  w.set(x, y + h, z, 'pink');
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const nb = 2 + Math.floor(hash2(seed, 1) * 2);
  for (let b = 0; b < nb; b++) {
    const by = y + 2 + Math.floor(hash2(seed, b + 11) * Math.max(1, h - 3));
    const [dx, dz] = dirs[(Math.floor(hash2(seed, b + 7) * 4) + b) % 4];
    const bh = 1 + Math.floor(hash2(seed, b + 3) * 2);
    w.fill(x + dx, by, z + dz, x + dx, by + bh, z + dz, 'purpur');
    w.set(x + dx, by + bh + 1, z + dz, 'pink');
  }
}
// End City tower: purpur shaft with end-brick bands, dark windows and a wider stepped cap
export function endTower(w, x, y, z, { h = 14, s = 5, cap = true } = {}) {
  w.fill(x, y, z, x + s - 1, y + h - 1, z + s - 1, 'purpur');
  for (let yy = y + 3; yy < y + h - 1; yy += 4) {
    w.fill(x, yy, z, x + s - 1, yy, z + s - 1, 'end_bricks');
    const m = x + Math.floor(s / 2), n = z + Math.floor(s / 2);
    w.set(m, yy + 2, z, 0); w.set(m, yy + 2, z + s - 1, 0); w.set(x, yy + 2, n, 0); w.set(x + s - 1, yy + 2, n, 0);
  }
  if (cap) {
    w.fill(x - 1, y + h, z - 1, x + s, y + h, z + s, 'end_bricks');
    w.fill(x - 1, y + h + 1, z - 1, x + s, y + h + 2, z + s, 'purpur');
    w.fill(x, y + h + 3, z, x + s - 1, y + h + 3, z + s - 1, 'purpur');
    w.fill(x + 1, y + h + 4, z + 1, x + s - 2, y + h + 4, z + s - 2, 'end_bricks');
  }
}

// smooth wandering loop around (cx, cz): t -> [x, z]
export const wander = (cx, cz, rx, rz, sp = .5, ph = 0) => t => [cx + rx * Math.sin(t * sp + ph), cz + rz * Math.sin(t * sp * .73 + ph * 1.7) * Math.cos(t * sp * .31 + ph)];
// highest ground under a small footprint (so feet never sink into a step they overlap)
export function groundFoot(world, x, z, r = .28, from = 40) {
  let g = -99;
  for (const [dx, dz] of [[-r, -r], [r, -r], [-r, r], [r, r]]) g = Math.max(g, groundAt(world, x + dx, z + dz, from));
  return g;
}
// place a walking mob along a path fn(t)->[x,z], snapped to terrain, facing its motion
export function walkOn(e, world, fn, t, { swing = .32, stride = 5.5, from = 40, headYaw = 0 } = {}) {
  const [x, z] = fn(t), [x2, z2] = fn(t + .06);
  const v = Math.hypot(x2 - x, z2 - z) / .06;
  e.position.set(x, groundAt(world, x, z, from), z);
  if (v > .03) e.rotation.y = Math.atan2(x2 - x, z2 - z);
  pose(e, { walk: t * stride, swing: swing * clamp(v / 1.2), idle: t, headYaw });
  return v;
}
// enderman: optional Glowing outline and a carried block (vanilla endermen pick blocks up)
export function ender({ glow = false, carry = null } = {}) {
  const e = M.enderman(); e.scale.multiplyScalar(PX);
  if (carry) { // block held in front, arms angled forward
    const b = pixBox(9, 9, 9, (f, i, j, r) => hex(r() < .3 ? '#d8d49a' : '#ecebb4'));
    b.position.set(0, 19, 12); e.add(b); e.userData.carry = b;
  }
  if (glow) glowEdges(e);
  return e;
}
// Minecraft "Glowing": white edge lines on every box, the model itself stays visible
export function glowEdges(root, { color = '#ffffff', t = .6 } = {}) {
  const mat = new THREE.MeshBasicMaterial({ color });
  const meshes = [];
  root.traverse(o => { if (o.isMesh && o.geometry.parameters && o.geometry.parameters.width && !o.userData.edge) meshes.push(o); });
  for (const o of meshes) {
    const { width: w, height: h, depth: d } = o.geometry.parameters;
    const g = new THREE.Group();
    const bar = (bw, bh, bd, x, y, z) => { const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), mat); b.userData.edge = true; b.position.set(x, y, z); g.add(b); };
    for (const sy of [-1, 1]) for (const sz of [-1, 1]) bar(w + t, t, t, 0, sy * h / 2, sz * d / 2);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) bar(t, h + t, t, sx * w / 2, 0, sz * d / 2);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) bar(t, t, d + t, sx * w / 2, sy * h / 2, 0);
    o.add(g);
  }
}
// pose an enderman arm pair for carrying (arms forward)
export function carryPose(e) { e.userData.armR.rotation.x = -.5; e.userData.armL.rotation.x = -.5; }

// firework rocket item (red/white tube, grey cone)
export function rocket() {
  const g = new THREE.Group();
  const tube = pixBox(3, 8, 3, (f, i, j) => j % 3 === 1 ? hex('#f2f2f2') : hex('#c8261e')); tube.position.y = 4; g.add(tube);
  const cone = pixBox(2, 2, 2, () => hex('#9a9a9a')); cone.position.y = 9; g.add(cone);
  const stick = pixBox(1, 3, 1, () => hex('#6b4a2a')); stick.position.y = -1.5; g.add(stick);
  return g;
}
// golden apple / splash-like potion / generic items
export function goldenApple() { return pixBox(6, 6, 6, (f, i, j) => (j === 0 && i === 3) ? hex('#5a3a1a') : hex((i + j) % 4 ? '#f2c33a' : '#fff0a0'), { emissive: true }); }
export function potion(color = '#b58ad8') {
  const g = new THREE.Group();
  const b = pixBox(5, 5, 5, (f, i, j) => j < 1 ? hex('#e8e8f0') : hex(color), { emissive: true }); b.position.y = 2.5; g.add(b);
  const n = pixBox(2, 3, 2, () => hex('#d8d8e8')); n.position.y = 6; g.add(n);
  const c = pixBox(2, 1, 2, () => hex('#8a5a2a')); c.position.y = 8; g.add(c);
  return g;
}

// firework spark trail: small bright cubes placed along recent path samples
export function sparkTrail(n = 40) {
  const g = new THREE.Group();
  const cols = ['#ffffff', '#fff2a8', '#ffd24a', '#dfe6ff'];
  for (let i = 0; i < n; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: cols[i % cols.length] })); g.add(m); }
  g.visible = false;
  return g;
}
// pts(k) -> THREE.Vector3 for k in [0,1] (0 = newest); strength 0..1
export function animTrail(g, pts, strength, T) {
  g.visible = strength > .01;
  if (!g.visible) return;
  g.children.forEach((m, i) => {
    const k = i / g.children.length;
    const p = pts(k);
    const j = .12 + .5 * k;
    m.position.set(p.x + Math.sin(i * 7.1 + T * 23) * j, p.y + Math.cos(i * 3.7 + T * 19) * j - k * .3, p.z + Math.sin(i * 5.3 + T * 17) * j);
    const s = (.11 - k * .08) * strength * (.5 + .5 * Math.abs(Math.sin(i * 1.7 + T * 31)));
    m.scale.setScalar(Math.max(.001, s));
  });
}
// flame trail behind a fireball
export function flameTrail(n = 16) { const g = sparkTrail(n); g.children.forEach((m, i) => m.material.color.set(['#ffd24a', '#f88b1c', '#ff5a10', '#fff0b0'][i % 4])); return g; }

export { clamp, lerp };

// Hand-written note block: one note object per line (robust to how the vignette splits lines).
// The arrow / circle is attached to the LAST line; later lines start once the previous one is written (~30 cps).
// slowF(t) -> playback speed at sim time t (1 outside slow segments), so line starts match the real writing speed.
export function noteBlock(t0, t1, lines, x, y, { size = 46, to, circle, r, dx, dy, bend, ax, ay, slow = [] } = {}) {
  const speedAt = t => { const sg = slow.find(s => t >= s.t && t < s.t + s.d); return sg ? sg.f : 1; };
  const out = []; let t = t0;
  lines.forEach((l, i) => {
    const last = i === lines.length - 1;
    const n = { t0: t, t1, text: l, x, y: y + i * size * 1.08, size };
    if (last) Object.assign(n, { to, circle, r, dx, dy, bend, ax, ay });
    out.push(n);
    // advance by the writing time of this line (real seconds -> sim seconds)
    let rem = l.length / 30 + .05; while (rem > 0) { const f = speedAt(t); t += .01 * f; rem -= .01; }
  });
  return out;
}

// A wander loop that only covers open end stone: shrinks the area until every column in it has end stone on top
// and the ground varies by at most one block (so walkers never climb chorus stalks, walls or huts).
export function safeWander(world, cx, cz, rx, rz, sp = .5, ph = 0) {
  const ok = (rx2, rz2) => {
    let lo = 99, hi = -99;
    for (let x = Math.floor(cx - rx2 - .4); x <= Math.floor(cx + rx2 + .4); x++) for (let z = Math.floor(cz - rz2 - .4); z <= Math.floor(cz + rz2 + .4); z++) {
      let y = 40; while (y > -40 && !world.get(x, y, z)) y--;
      if (world.get(x, y, z) !== BLOCK.end_stone) return false;
      lo = Math.min(lo, y); hi = Math.max(hi, y);
    }
    return hi - lo <= 1;
  };
  let k = 1;
  while (k > .05 && !ok(rx * k, rz * k)) k *= .8;
  if (k <= .05) return () => [cx, cz];
  return wander(cx, cz, rx * k, rz * k, sp, ph);
}
