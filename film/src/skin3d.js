// Builds a Minecraft player model from a raw skin texture (64x64 or legacy 64x32).
import * as THREE from '../vendor/three.module.js';

// UV rect helper: box of size (w,h,d) whose texture net starts at (u,v).
function net(u, v, w, h, d) {
  return {
    px: [u + d + w, v + d, d, h], // character's left side
    nx: [u, v + d, d, h],         // character's right side
    py: [u + d, v, w, d],
    ny: [u + d + w, v, w, d],
    pz: [u + d, v + d, w, h],     // front
    nz: [u + d + w + d, v + d, w, h], // back
  };
}

function boxWithUV(w, h, d, uvNet, texW, texH, inflate = 0, mirror = false) {
  const g = new THREE.BoxGeometry(w + inflate * 2, h + inflate * 2, d + inflate * 2);
  const uv = g.attributes.uv;
  const order = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];
  let faces = order.map(k => uvNet[k]);
  if (mirror) { // legacy 64x32 skins mirror the right limb for the left one
    faces = [uvNet.nx, uvNet.px, uvNet.py, uvNet.ny, uvNet.pz, uvNet.nz];
  }
  for (let f = 0; f < 6; f++) {
    let [x, y, rw, rh] = faces[f];
    for (let i = 0; i < 4; i++) {
      const idx = f * 4 + i;
      let u = uv.getX(idx), v = uv.getY(idx);
      if (mirror) u = 1 - u;
      if (f === 3) v = 1 - v; // bottom faces are stored flipped
      const U = (x + u * rw) / texW;
      const V = 1 - (y + (1 - v) * rh) / texH;
      uv.setXY(idx, U, V);
    }
  }
  uv.needsUpdate = true;
  return g;
}

export function detectSlim(img) {
  // Slim skins leave pixels (54..55, 20..31) transparent on the right arm.
  if (img.height !== 64) return false;
  const c = document.createElement('canvas'); c.width = 64; c.height = 64;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const d = x.getImageData(54, 20, 2, 12).data;
  for (let i = 3; i < d.length; i += 4) if (d[i] > 0) return false;
  return true;
}

function hatHasAlpha(img) {
  const c = document.createElement('canvas'); c.width = 64; c.height = img.height;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const d = x.getImageData(32, 0, 32, 16).data;
  for (let i = 3; i < d.length; i += 4) if (d[i] < 128) return true;
  return false;
}

export function buildPlayer(img, { slim = null, emissive = 0 } = {}) {
  const legacy = img.height === 32;
  // Minecraft's "Notch transparency hack": a fully opaque legacy hat layer is ignored.
  const legacyHat = legacy && hatHasAlpha(img);
  if (slim === null) slim = detectSlim(img);
  const tex = new THREE.Texture(img);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  const TW = 64, TH = legacy ? 32 : 64;
  const base = new THREE.MeshStandardMaterial({ map: tex, roughness: .85, metalness: 0, transparent: false, emissive: new THREE.Color(emissive), emissiveMap: tex, emissiveIntensity: 0 });
  const over = new THREE.MeshStandardMaterial({ map: tex, roughness: .85, metalness: 0, transparent: true, alphaTest: .35, side: THREE.DoubleSide, depthWrite: true, emissive: new THREE.Color(emissive), emissiveMap: tex, emissiveIntensity: 0 });

  const root = new THREE.Group();
  const aw = slim ? 3 : 4;
  const part = (name, w, h, d, uvBase, uvOver, pivot, offset, mirror = false) => {
    const g = new THREE.Group();
    g.position.set(...pivot);
    const m = new THREE.Mesh(boxWithUV(w, h, d, net(...uvBase, w, h, d), TW, TH, 0, mirror), base);
    m.position.set(...offset);
    g.add(m);
    if (uvOver && !legacy) {
      const inf = name === 'head' ? .5 : .25;
      const o = new THREE.Mesh(boxWithUV(w, h, d, net(...uvOver, w, h, d), TW, TH, inf), over);
      o.position.set(...offset);
      g.add(o);
    }
    if (name === 'head' && legacyHat) {
      const o = new THREE.Mesh(boxWithUV(w, h, d, net(32, 0, w, h, d), TW, TH, .5), over);
      o.position.set(...offset); g.add(o);
    }
    root.add(g);
    return g;
  };
  // Model units: 1 = one skin pixel. Feet at y=0, facing +z.
  const head = part('head', 8, 8, 8, [0, 0], [32, 0], [0, 24, 0], [0, 4, 0]);
  const body = part('body', 8, 12, 4, [16, 16], [16, 32], [0, 24, 0], [0, -6, 0]);
  const armR = part('armR', aw, 12, 4, [40, 16], [40, 32], [-(4 + aw / 2), 22, 0], [0, -4, 0]);
  const armL = legacy
    ? part('armL', aw, 12, 4, [40, 16], null, [4 + aw / 2, 22, 0], [0, -4, 0], true)
    : part('armL', aw, 12, 4, [32, 48], [48, 48], [4 + aw / 2, 22, 0], [0, -4, 0]);
  const legR = part('legR', 4, 12, 4, [0, 16], [0, 32], [-2, 12, 0], [0, -6, 0]);
  const legL = legacy
    ? part('legL', 4, 12, 4, [0, 16], null, [2, 12, 0], [0, -6, 0], true)
    : part('legL', 4, 12, 4, [16, 48], [0, 48], [2, 12, 0], [0, -6, 0]);
  root.userData = { head, body, armR, armL, legR, legL, mats: [base, over], slim };
  root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return root;
}

// Simple procedural poses.
export function pose(p, { walk = 0, swing = 0, headYaw = 0, headPitch = 0, armRaise = 0, idle = 0 } = {}) {
  const u = p.userData;
  const s = Math.sin(walk) * swing;
  u.legR.rotation.x = s; u.legL.rotation.x = -s;
  u.armR.rotation.x = -s * .9 - armRaise; u.armL.rotation.x = s * .9;
  u.armR.rotation.z = -.04 - Math.sin(idle) * .03; u.armL.rotation.z = .04 + Math.sin(idle) * .03;
  u.head.rotation.y = headYaw; u.head.rotation.x = headPitch;
}

export function setGlow(p, k, color) {
  for (const m of p.userData.mats) {
    m.emissiveIntensity = k;
    if (color) m.emissive.set(color);
  }
}
