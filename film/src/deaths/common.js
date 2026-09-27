// Helpers for the death retellings.
import { THREE } from '../gl.js';
import { buildPlayer, pose } from '../skin3d.js';
import { pixBox } from '../mobs.js';
import { clamp, lerp, ease } from '../engine.js';

export const PX = 1 / 16; // model pixel -> block

export function player(assets, id, { slim = null } = {}) {
  const p = buildPlayer(assets.skins[id], { slim });
  p.scale.setScalar(PX);
  return p;
}
// attach an item to the right hand (item modelled in pixel units, pointing up +y)
export function hold(p, item, { rx = -Math.PI / 2, ry = 0, rz = 0, left = false } = {}) {
  const arm = left ? p.userData.armL : p.userData.armR;
  const g = new THREE.Group();
  g.position.set(0, -10, -1);
  g.rotation.set(rx, ry, rz);
  g.add(item);
  arm.add(g);
  return g;
}
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
export function torch() {
  const g = new THREE.Group();
  const stick = pixBox(2, 10, 2, () => hex('#6b4a2a')); stick.position.y = 5; g.add(stick);
  const flame = pixBox(2, 2, 2, () => hex('#ffd24a'), { emissive: true }); flame.position.y = 11; g.add(flame);
  return g;
}
export function item(color, w = 2, h = 10, d = 2) { return pixBox(w, h, d, () => hex(color)); }
export function pearl() { return pixBox(4, 4, 4, (f, i, j) => (i + j) % 3 ? hex('#1f6b5a') : hex('#2f9a82'), { emissive: true }); }
export function waterBucket() {
  const g = new THREE.Group();
  const b = pixBox(6, 6, 6, (f, i, j) => (f === 'py' && i > 0 && i < 5 && j > 0 && j < 5) ? hex('#3f76e4') : hex('#b8b8b8')); g.add(b);
  return g;
}

// look-at on the Y axis only (models face +z)
export function face(obj, x, z) { obj.rotation.y = Math.atan2(x - obj.position.x, z - obj.position.z); }

// Camera helper: set position + target + fov + optional roll
export function cam(c, pos, target, fov = 45, roll = 0) {
  c.position.set(...pos);
  c.up.set(Math.sin(roll), Math.cos(roll), 0);
  c.lookAt(...target);
  if (c.fov !== fov) { c.fov = fov; c.updateProjectionMatrix(); }
  return c;
}
// ballistic fall helper
export const fall = (y0, y1, t, g = 26) => Math.max(y1, y0 - .5 * g * t * t);
export const shake = (t, amp) => [Math.sin(t * 91) * amp, Math.cos(t * 73) * amp, Math.sin(t * 57) * amp];
// generic "hurt" red tint on a model
export function hurt(model, k) {
  model.traverse(o => { if (o.isMesh) { const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach(m => { if (m.emissive) { m.emissive.set('#ff0000'); m.emissiveIntensity = k * .8; } }); } });
}
export { pose, clamp, lerp, ease };

// ---------------------------------------------------------------- shared props / fx
import * as M from '../mobs.js';
export function fireBits(n = 6, spread = 1.2) {
  const g = new THREE.Group();
  const cols = ['#ffd24a', '#f88b1c', '#ff5a10'];
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(.14, .32, .14), new THREE.MeshBasicMaterial({ color: cols[i % 3] }));
    m.position.set(Math.sin(i * 2.4) * spread * ((i * 7) % 10) / 10, .25, Math.cos(i * 2.4) * spread * ((i * 3) % 10) / 10);
    m.userData.ph = i * .37;
    g.add(m);
  }
  g.userData.anim = t => g.children.forEach(m => { const k = (Math.sin(t * 13 + m.userData.ph * 9) + 1) / 2; m.scale.set(1, .6 + k * .9, 1); m.position.y = .1 + k * .12; });
  return g;
}
// wooden sign with real text lines (seen in the clip)
export function sign(lines) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = '#b8945f'; x.fillRect(0, 0, 256, 128);
  x.fillStyle = '#9a7a48'; for (let i = 0; i < 8; i++) x.fillRect(0, i * 16 + 15, 256, 2);
  x.fillStyle = '#1a1a1a'; x.font = '22px VT'; x.textAlign = 'center'; x.textBaseline = 'middle';
  lines.forEach((l, i) => x.fillText(l, 128, 18 + i * 30));
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const g = new THREE.Group();
  const board = new THREE.Mesh(new THREE.BoxGeometry(1, .5, .08), [0, 0, 0, 0, 0, 0].map((_, i) => new THREE.MeshLambertMaterial(i === 4 ? { map: tex } : { color: '#9a7a48' })));
  board.position.y = 1.05; g.add(board);
  const post = new THREE.Mesh(new THREE.BoxGeometry(.08, .8, .08), new THREE.MeshLambertMaterial({ color: '#6b4a2a' })); post.position.y = .4; g.add(post);
  return g;
}
// Totem of undying. The in-game animation is a screen-space overlay, so the vignette draws it in 2D
// (see TOTEM + drawTotemOverlay). Here we only add the world-space particle burst around the camera target.
export const TOTEM = { dt: -1 };
export function totemPop(scene, { overlay = true } = {}) { // overlay:false for totems seen from ANOTHER player's POV
  const parts = new THREE.Group(); scene.add(parts);
  const cols = ['#3cb043', '#8fe04a', '#f5d547', '#ffe98a', '#2e8a3a'];
  const mats = cols.map(c => new THREE.MeshBasicMaterial({ color: c }));
  for (let i = 0; i < 90; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mats[i % mats.length]);
    const a = i * 2.39996, e = Math.asin(((i * 37) % 100) / 50 - 1);
    m.userData.d = new THREE.Vector3(Math.cos(a) * Math.cos(e), Math.sin(e) * .6 + .45, Math.sin(a) * Math.cos(e));
    m.userData.sp = 1.4 + ((i * 53) % 10) / 6;
    m.userData.sz = .035 + ((i * 17) % 10) / 260;
    parts.add(m);
  }
  parts.visible = false;
  const v = new THREE.Vector3();
  return (camera, dt, at) => {
    const on = dt >= 0 && dt < 1.8;
    if (on && overlay) TOTEM.dt = Math.max(TOTEM.dt, dt);
    parts.visible = on;
    if (!on) return;
    if (at) parts.position.copy(at);
    else { camera.getWorldDirection(v); parts.position.copy(camera.position).addScaledVector(v, 2.6); parts.position.y -= .35; }
    const k = clamp(dt / 1.8);
    parts.children.forEach((m, i) => {
      const r = m.userData.sp * .8 * (1 - Math.exp(-dt * 2.6));
      const sw = dt * 3 + i;
      m.position.copy(m.userData.d).multiplyScalar(r);
      m.position.x += Math.sin(sw) * .15 * dt; m.position.z += Math.cos(sw) * .15 * dt;
      m.position.y -= dt * dt * .35;
      m.rotation.set(dt * 4 + i, dt * 3, 0);
      m.scale.setScalar(Math.max(.001, m.userData.sz * (1 - k * k)));
    });
  };
}
// 16x16 totem of undying, drawn for this film
const TOTEM_PX = [
  '................',
  '.....oooooo.....',
  '....oWYYYYYo....',
  '....oYGYYGYo....',
  '....oYYYYYYo....',
  '.....oyYYyo.....',
  '.ooooYYYYYYoooo.',
  'oWYYYoYYYYoYYYyo',
  'oyyyo.oYYo.oyyyo',
  '.ooo..oYEYo.ooo.',
  '......oYYYo.....',
  '.....oYYYYYo....',
  '.....oyYYYyo....',
  '.....oyyyyyo....',
  '......ooooo.....',
  '................',
];
const TOTEM_C = { o: '#6a3c10', Y: '#f2c44c', y: '#c98a2a', W: '#fff2b0', G: '#3fd46a', E: '#2fbf8a' };
export function drawTotemOverlay(ctx, dt, W = 1920, H = 1080) {
  if (dt < 0 || dt > 1.8) return;
  // particles first (behind the item)
  for (let i = 0; i < 70; i++) {
    const a = i * 2.39996, sp = 380 + ((i * 97) % 100) * 6;
    const d = sp * (1 - Math.exp(-dt * 3));
    const x = W / 2 + Math.cos(a) * d, y = H * .47 + Math.sin(a) * d * .75 + dt * dt * 120;
    const s = (10 + (i % 5) * 5) * (1 - clamp(dt / 1.8));
    ctx.fillStyle = ['#3cb043', '#8fe04a', '#f5d547', '#ffe98a'][i % 4];
    ctx.save(); ctx.translate(x, y); ctx.rotate(dt * 5 + i); ctx.fillRect(-s / 2, -s / 2, s, s); ctx.restore();
  }
  const rise = ease.outBack(clamp(dt / .45));
  const shrink = clamp((dt - 1.05) / .7);
  const scale = lerp(.35, 1, rise) * (1 - ease.in(shrink) * .95);
  const cy = lerp(H * 1.05, H * .47, ease.out(clamp(dt / .45))) - shrink * 40;
  const ang = dt * Math.PI * 2.2;
  const sx = Math.cos(ang), flip = sx < 0;
  const px = 30 * scale;
  ctx.save();
  ctx.globalAlpha = 1 - clamp((dt - 1.55) / .25);
  ctx.translate(W / 2, cy); ctx.scale(Math.max(.06, Math.abs(sx)) * (flip ? -1 : 1), 1);
  for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) {
    const c = TOTEM_PX[j][i]; if (c === '.') continue;
    let col = TOTEM_C[c];
    if (flip && c === 'Y') col = '#d9a83a';
    ctx.fillStyle = col;
    ctx.fillRect((i - 8) * px, (j - 8) * px, Math.ceil(px) + .5, Math.ceil(px) + .5);
  }
  ctx.restore();
}
// HUD-ish ring of an Ender Ghast projectile (magenta ring sprite seen in the clips)
export function ring(color = '#d23ad8') {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color });
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const m = new THREE.Mesh(new THREE.BoxGeometry(.18, .18, .18), mat); m.position.set(Math.cos(a) * .35, Math.sin(a) * .35, 0); g.add(m); }
  return g;
}
export function endIsland(w, { r = 24, seed = 1, cx = 0, cz = 0, top = 0, depth = 8 } = {}) {
  for (let x = -r - 3; x <= r + 3; x++) for (let z = -r - 3; z <= r + 3; z++) {
    const d = Math.hypot(x, z);
    const rr = r + Math.sin(x * .3 + seed) * 1.5 + Math.cos(z * .25 + seed) * 1.5;
    if (d < rr) { const dd = Math.floor((1 - d / rr) * depth) + 1; w.fill(cx + x, top - dd, cz + z, cx + x, top - 1, cz + z, 'end_stone'); }
  }
}

// Minecraft "glowing" effect: white outline shell
export function glowOutline(root, color = '#ffffff') {
  const mat = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
  const add = [];
  root.traverse(o => { if (o.isMesh) add.push(o); });
  add.forEach(o => { const s = new THREE.Mesh(o.geometry, mat); s.scale.setScalar(1.22); o.add(s); });
}
// armor pieces as slightly inflated boxes on the player parts
export function armor(p, kind = 'diamond', pieces = ['head', 'body', 'legR', 'legL', 'armR', 'armL']) {
  const col = { diamond: ['#5fe0d8', '#3fb8b0'], iron: ['#d8d8d8', '#b0b0b0'], netherite: ['#4a4448', '#3a3438'], gold: ['#f6d33b', '#d8b52a'], purple: ['#8a4ad8', '#6a2ab8'] }[kind];
  const u = p.userData;
  const box = (w, h, d, y) => { const m = pixBox(w, h, d, (f, i, j, r) => hex(r() < .3 ? col[1] : col[0])); m.position.y = y; return m; };
  const aw = u.slim ? 3 : 4;
  if (pieces.includes('head')) u.head.add(box(9, 4, 9, 6.5));
  if (pieces.includes('body')) u.body.add(box(9, 12.5, 5, -6));
  if (pieces.includes('armR')) u.armR.add(box(aw + 1, 5, 5, -1.5));
  if (pieces.includes('armL')) u.armL.add(box(aw + 1, 5, 5, -1.5));
  if (pieces.includes('legR')) u.legR.add(box(4.6, 12.5, 4.6, -6));
  if (pieces.includes('legL')) u.legL.add(box(4.6, 12.5, 4.6, -6));
}
export function rails(len, dir = 'x') {
  const g = new THREE.Group();
  const iron = new THREE.MeshLambertMaterial({ color: '#8a8a8a' }), wood = new THREE.MeshLambertMaterial({ color: '#6b4a2a' });
  for (let i = 0; i < len * 3; i++) { const t = new THREE.Mesh(new THREE.BoxGeometry(.18, .04, .8), wood); t.position.set(i / 3, .02, 0); g.add(t); }
  for (const z of [-.3, .3]) { const r = new THREE.Mesh(new THREE.BoxGeometry(len, .06, .07), iron); r.position.set(len / 2, .05, z); g.add(r); }
  if (dir === 'z') g.rotation.y = -Math.PI / 2;
  return g;
}
export function cobweb() {
  const g = new THREE.Group(); const mat = new THREE.MeshBasicMaterial({ color: '#f0f0f0', transparent: true, opacity: .6, side: THREE.DoubleSide });
  for (const r of [Math.PI / 4, -Math.PI / 4]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1), mat); m.rotation.y = r; g.add(m); }
  return g;
}
export function spawnerCage(flame = '#ffb030') {
  const g = new THREE.Group();
  const bar = new THREE.MeshLambertMaterial({ color: '#2a2a3a' });
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const b = new THREE.Mesh(new THREE.BoxGeometry(.06, 1, .06), bar); const a = i * Math.PI / 2; b.position.set(Math.cos(a) * .47 + (j - 1) * .3 * Math.sin(a), .5, Math.sin(a) * .47 + (j - 1) * .3 * Math.cos(a)); g.add(b); }
  for (const y of [0, 1]) { const f = new THREE.Mesh(new THREE.BoxGeometry(1, .06, 1), bar); f.position.y = y; g.add(f); }
  const fl = new THREE.Mesh(new THREE.BoxGeometry(.3, .3, .3), new THREE.MeshBasicMaterial({ color: flame })); fl.position.y = .5; g.add(fl);
  return g;
}
export function shieldItem() { return M.shield(); }

// Invisible mob with the Glowing effect: only white edge lines (thick, so the ink pass keeps them)
export function ghostify(root, { color = '#ffffff', t = .7, eyes = null } = {}) {
  const mat = new THREE.MeshBasicMaterial({ color });
  const meshes = [];
  root.traverse(o => { if (o.isMesh && o.geometry.parameters && o.geometry.parameters.width) meshes.push(o); });
  for (const o of meshes) {
    const { width: w, height: h, depth: d } = o.geometry.parameters;
    const ms = Array.isArray(o.material) ? o.material : [o.material];
    ms.forEach(m => { m.visible = false; });
    const g = new THREE.Group();
    for (const sy of [-1, 1]) for (const sz of [-1, 1]) { const b = new THREE.Mesh(new THREE.BoxGeometry(w + t, t, t), mat); b.position.set(0, sy * h / 2, sz * d / 2); g.add(b); }
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const b = new THREE.Mesh(new THREE.BoxGeometry(t, h + t, t), mat); b.position.set(sx * w / 2, 0, sz * d / 2); g.add(b); }
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) { const b = new THREE.Mesh(new THREE.BoxGeometry(t, t, d + t), mat); b.position.set(sx * w / 2, sy * h / 2, 0); g.add(b); }
    o.add(g);
  }
  if (eyes && root.userData.head) {
    const em = new THREE.MeshBasicMaterial({ color: '#ff2020' });
    for (const [x, y] of eyes) { const e = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1), em); e.position.set(x, y, 8.2); root.userData.head.add(e); }
  }
}
export function chickenFlock(scene, n, cx, cz, r) {
  const list = [];
  for (let i = 0; i < n; i++) { const c = M.chicken(); c.scale.multiplyScalar(PX); c.position.set(cx + Math.sin(i * 2.4) * r * ((i % 3 + 1) / 3), 0, cz + Math.cos(i * 2.4) * r * ((i % 3 + 1) / 3)); scene.add(c); list.push(c); }
  return list;
}

// Minecraft-like toast (advancement popup), top-right
export function toast(ctx, title, sub, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha;
  const x = 1920 - 560, y = 150;
  ctx.fillStyle = '#212121'; ctx.fillRect(x, y, 480, 96);
  ctx.strokeStyle = '#555'; ctx.lineWidth = 4; ctx.strokeRect(x + 2, y + 2, 476, 92);
  ctx.font = '30px VT'; ctx.fillStyle = '#d98eff'; ctx.textBaseline = 'middle'; ctx.fillText(title, x + 90, y + 32);
  ctx.fillStyle = '#ffffff'; ctx.fillText(sub, x + 90, y + 64);
  ctx.fillStyle = '#e8b52a'; ctx.fillRect(x + 26, y + 28, 40, 40);
  ctx.restore();
}
// boss bar (seen during the dragon event: "PERMADEATH DEMON")
export function bossBar(ctx, name, frac = 1, color = '#e0209a') {
  ctx.save();
  ctx.font = '30px VT'; ctx.textAlign = 'center'; ctx.fillStyle = '#ff55ff'; ctx.fillText(name, 960, 150);
  ctx.fillStyle = '#2a0a20'; ctx.fillRect(960 - 364, 164, 728, 14);
  ctx.fillStyle = color; ctx.fillRect(960 - 364, 164, 728 * frac, 14);
  ctx.restore();
}


// ---------------------------------------------------------------- creepers: approach, flash white, swell, boom
export function creeperFuse(cr, t, fuseStart, fuseEnd) {
  if (!cr.userData.fuseMats) {
    cr.userData.fuseMats = [];
    cr.traverse(o => { if (o.isMesh) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { if (m.emissive) cr.userData.fuseMats.push(m); }); });
    cr.userData.baseScale = cr.scale.x;
  }
  const k = clamp((t - fuseStart) / Math.max(.01, fuseEnd - fuseStart));
  const on = t >= fuseStart && t < fuseEnd;
  const rate = lerp(3, 9, k);
  const white = on && Math.floor((t - fuseStart) * rate * 2) % 2 === 0;
  cr.userData.fuseMats.forEach(m => { m.emissive.set('#ffffff'); m.emissiveIntensity = white ? .95 : 0; });
  const sw = on ? 1 + ease.in(k) * .22 : 1;
  const b = cr.userData.baseScale;
  cr.scale.set(b * sw, b * (1 + (sw - 1) * .6), b * sw);
  if (cr.userData.legs) cr.userData.legs.forEach((l, i) => { l.rotation.x = 0; });
  return { flashing: on, white };
}
export function walkCreeper(cr, T, moving) { if (cr.userData.legs) cr.userData.legs.forEach((l, i) => { l.rotation.x = moving ? Math.sin(T * 10 + (i % 2) * Math.PI) * .45 : 0; }); }

// ---------------------------------------------------------------- ground contact
// top of the highest solid (non-liquid) block under (x,z), searching down from `from`
export function groundAt(world, x, z, from = 40, { liquids = false } = {}) {
  const ix = Math.floor(x), iz = Math.floor(z);
  for (let y = from; y > -40; y--) {
    const b = world.get(ix, y, iz);
    if (!b) continue;
    const name = BLOCK_NAME[b];
    if (!liquids && (name === 'water' || name === 'lava')) continue;
    if (name === 'leaves' || name === 'portal' || name === 'glass') continue;
    return y + 1;
  }
  return 0;
}
export function stand(obj, world, x, z, lift = 0, from = 40) { obj.position.set(x, groundAt(world, x, z, from) + lift, z); return obj; }
import { BLOCK } from '../voxel.js';
const BLOCK_NAME = Object.fromEntries(Object.entries(BLOCK).map(([k, v]) => [v, k]));
// jumping arc for a player, period `p` seconds, height `h` blocks
export const hop = (t, p = .5, h = 1.1) => { const ph = (t % p) / p; return 4 * h * ph * (1 - ph); };
