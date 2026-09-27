// Reusable voxel sets for the death retellings + keyframe helpers.
import { THREE } from './gl.js';
import { World } from './voxel.js';
import { hash2, hash3, noise2, clamp, lerp, ease } from './engine.js';

// ---------------------------------------------------------------- keyframes
// track([[t, v], ...], easeFn) -> f(t). v may be a number or an array.
export function track(keys, e = ease.inOut) {
  return t => {
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 0; i < keys.length - 1; i++) {
      const [t0, v0] = keys[i], [t1, v1] = keys[i + 1];
      if (t <= t1) {
        const k = e((t - t0) / (t1 - t0));
        return Array.isArray(v0) ? v0.map((a, j) => lerp(a, v1[j], k)) : lerp(v0, v1, k);
      }
    }
    return keys[keys.length - 1][1];
  };
}
export const shots = list => t => { let cur = list[0]; for (const s of list) if (t >= s.t) cur = s; return cur; };

function lights(scene, { hemiSky = '#ffffff', hemiGround = '#444444', hemi = 1.2, sun = 1.2, sunPos = [20, 30, 10] } = {}) {
  scene.add(new THREE.HemisphereLight(hemiSky, hemiGround, hemi));
  const d = new THREE.DirectionalLight('#ffffff', sun); d.position.set(...sunPos); scene.add(d);
  return d;
}

// Each builder returns { scene, world, ink } where ink = options for renderInk.
export function setCave({ seed = 1, torches = [[2, 1, -3], [-6, 1, 3]], ore = true } = {}) {
  const w = new World(40, 16, 40, [-20, -4, -20]);
  w.fill(-20, -4, -20, 19, 11, 19, 'stone');
  // carve a winding tunnel + chamber
  for (let x = -20; x < 20; x++) for (let z = -20; z < 20; z++) for (let y = 0; y < 8; y++) {
    const cx = Math.sin(z * .15 + seed) * 4;
    const r = 3.2 + noise2(x * .2, z * .2, seed) * 1.2 + (Math.hypot(x, z) < 7 ? 2.5 : 0);
    if (Math.hypot(x - cx, (y - 2) * 1.3) < r && y >= 0) w.set(x, y, z, 0);
  }
  for (let x = -20; x < 20; x++) for (let z = -20; z < 20; z++) {
    if (hash3(x, z, seed) < .05) w.set(x, -1, z, 'gravel');
    for (let y = -1; y < 10; y++) if (w.get(x, y, z) && hash3(x, y * 7 + z, seed + 3) < .04) w.set(x, y, z, ore && hash3(x, y, z) < .5 ? 'deepslate' : 'cobble');
  }
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#050505');
  scene.add(w.build());
  scene.add(new THREE.HemisphereLight('#8a8aa0', '#202020', .55));
  for (const [x, y, z] of torches) { const l = new THREE.PointLight('#ffb060', 18, 14, 1.3); l.position.set(x + .5, y + .7, z + .5); scene.add(l); }
  return { scene, world: w, ink: { skyA: '#2a2622', skyB: '#3a342c', tint: '#e8e2d8' } };
}

export function setNether({ seed = 2, bridge = false, lavaY = -6 } = {}) {
  const w = new World(64, 28, 64, [-32, -12, -32]);
  w.fill(-32, -12, -32, 31, lavaY, 31, 'lava');
  for (let x = -32; x < 32; x++) for (let z = -32; z < 32; z++) {
    const d = Math.hypot(x, z);
    const h = Math.floor(noise2(x * .08, z * .08, seed) * 6 + noise2(x * .2, z * .2, seed + 1) * 2);
    if (d > 16 || (!bridge && d < 16 && noise2(x * .1, z * .1, seed + 5) > -.1)) {
      w.fill(x, -12, z, x, (bridge ? 2 : -2) + h + (d > 22 ? 8 : 0), z, 'netherrack');
      if (hash2(x, z) < .04) w.set(x, (bridge ? 2 : -2) + h, z, 'glowstone');
      if (hash2(x + 9, z) < .08) w.set(x, (bridge ? 2 : -2) + h + (d > 22 ? 8 : 0), z, 'soul_sand');
    }
  }
  if (bridge) {
    w.fill(-32, -1, -2, 31, -1, 2, 'nether_bricks');
    w.fill(-32, 0, -2, 31, 0, -2, 'nether_bricks'); w.fill(-32, 0, 2, 31, 0, 2, 'nether_bricks');
    for (let x = -30; x < 32; x += 8) w.fill(x, -12, -1, x + 1, -2, 1, 'nether_bricks');
  }
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#000');
  scene.add(w.build());
  scene.add(new THREE.HemisphereLight('#ffb080', '#401010', 1.3));
  const d = new THREE.DirectionalLight('#ffd0b0', 1.1); d.position.set(10, 20, 8); scene.add(d);
  return { scene, world: w, ink: { skyA: '#8a3a22', skyB: '#d9a07a', tint: '#fff0e6' } };
}

export function setOverworld({ seed = 3, night = false, trees = 8, flat = false, snow = false } = {}) {
  const w = new World(64, 30, 64, [-32, -8, -32]);
  for (let x = -32; x < 32; x++) for (let z = -32; z < 32; z++) {
    const h = flat ? 0 : Math.floor(noise2(x * .06, z * .06, seed) * 3 + noise2(x * .15, z * .15, seed + 2) * 1.5);
    w.fill(x, -8, z, x, h - 3, z, 'stone');
    w.fill(x, h - 2, z, x, h - 1, z, 'dirt');
    w.set(x, h, z, snow ? 'snow' : 'grass');
  }
  for (let i = 0; i < trees; i++) {
    const tx = Math.floor((hash2(i, seed) - .5) * 56), tz = Math.floor((hash2(i, seed + 7) - .5) * 56);
    if (Math.hypot(tx, tz) < 7) continue;
    let gy = 6; while (gy > -8 && !w.get(tx, gy, tz)) gy--;
    const th = 4 + Math.floor(hash2(i, 5) * 2);
    w.fill(tx - 2, gy + th - 1, tz - 2, tx + 2, gy + th, tz + 2, 'leaves');
    w.fill(tx - 1, gy + th + 1, tz - 1, tx + 1, gy + th + 1, tz + 1, 'leaves');
    w.fill(tx, gy + 1, tz, tx, gy + th, tz, 'log');
  }
  const scene = new THREE.Scene(); scene.background = new THREE.Color(night ? '#0a0f1f' : '#9ec3ff');
  scene.add(w.build());
  if (night) {
    scene.add(new THREE.HemisphereLight('#5a6a9a', '#101018', .8));
    const m = new THREE.DirectionalLight('#9fb3ff', .6); m.position.set(-10, 25, 10); scene.add(m);
  } else lights(scene, { hemiSky: '#ffffff', hemiGround: '#556644', hemi: 1.3, sun: 1.3 });
  return { scene, world: w, ink: night ? { skyA: '#1c2438', skyB: '#4a5270', tint: '#c9d2ea' } : { skyA: '#a9bfd6', skyB: '#efe3c8' } };
}

export function setEnd({ seed = 4 } = {}) {
  const w = new World(64, 40, 64, [-32, -10, -32]);
  for (let x = -32; x < 32; x++) for (let z = -32; z < 32; z++) {
    const d = Math.hypot(x, z);
    const r = 26 + noise2(x * .1, z * .1, seed) * 3;
    if (d < r) { const depth = Math.floor((1 - d / r) * 9); w.fill(x, -depth, z, x, 0, z, 'end_stone'); }
  }
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * Math.PI * 2, px = Math.round(Math.sin(a) * 17), pz = Math.round(Math.cos(a) * 17);
    const h = 14 + (i * 7) % 12;
    w.fill(px - 1, 1, pz - 1, px + 1, h, pz + 1, 'obsidian');
  }
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#0d0714');
  scene.add(w.build());
  scene.add(new THREE.HemisphereLight('#b89adb', '#1a1022', 1.1));
  const d = new THREE.DirectionalLight('#e6d8ff', .8); d.position.set(5, 20, 5); scene.add(d);
  return { scene, world: w, ink: { skyA: '#2a1638', skyB: '#5a3a72', tint: '#efe6ff' } };
}

export function setRoom({ seed = 5, wall = 'planks', floor = 'planks', size = 7 } = {}) {
  const w = new World(40, 16, 40, [-20, -4, -20]);
  w.fill(-20, -4, -20, 19, -1, 19, 'dirt');
  w.fill(-size, -1, -size, size, -1, size, floor);
  w.fill(-size, 0, -size, size, 4, -size, wall); w.fill(-size, 0, size, size, 4, size, wall);
  w.fill(-size, 0, -size, -size, 4, size, wall); w.fill(size, 0, -size, size, 4, size, wall);
  w.fill(-size, 5, -size, size, 5, size, 'planks');
  w.fill(-1, 0, size, 0, 2, size, 0); // door
  w.fill(3, 2, -size, 4, 3, -size, 'glass');
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#9ec3ff');
  scene.add(w.build());
  scene.add(new THREE.HemisphereLight('#fff4e0', '#443322', 1.2));
  const l = new THREE.PointLight('#ffb060', 25, 18, 1.2); l.position.set(0, 3.5, 0); scene.add(l);
  return { scene, world: w, ink: { skyA: '#a9bfd6', skyB: '#efe3c8' } };
}

export function groundY(world, x, z, from = 20) {
  let y = from;
  while (y > -20 && !world.get(Math.floor(x), y, Math.floor(z))) y--;
  return y + 1;
}
