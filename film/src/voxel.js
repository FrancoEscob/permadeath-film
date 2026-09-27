// Voxel worlds with procedurally painted 16x16 block textures (no downloaded assets).
import { THREE } from './gl.js';
import { rng } from './engine.js';

const T = 16, COLS = 16, ROWS = 4;
const atlas = document.createElement('canvas');
atlas.width = T * COLS; atlas.height = T * ROWS;
const actx = atlas.getContext('2d');
const tiles = {};
let nextTile = 0;

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
function paint(name, fn, seed = name.length * 977) {
  const idx = nextTile++;
  const ox = (idx % COLS) * T, oy = Math.floor(idx / COLS) * T;
  const img = actx.createImageData(T, T);
  const r = rng(seed);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const c = fn(x, y, r);
    const i = (y * T + x) * 4;
    img.data[i] = c[0]; img.data[i + 1] = c[1]; img.data[i + 2] = c[2]; img.data[i + 3] = c[3] ?? 255;
  }
  actx.putImageData(img, ox, oy);
  tiles[name] = idx;
  return idx;
}
const speck = (base, dark, light, pd = .25, pl = .15) => (x, y, r) => {
  const v = r();
  const c = v < pd ? dark : v > 1 - pl ? light : base;
  return mix(c, [0, 0, 0], r() * .08);
};

paint('stone', speck(hex('#7f7f7f'), hex('#6c6c6c'), hex('#8f8f8f'), .3, .15));
paint('cobble', (x, y, r) => {
  const cx = Math.floor((x + (y >> 2) % 2 * 2) / 4), cy = Math.floor(y / 4);
  const edge = (x + (y >> 2) % 2 * 2) % 4 === 0 || y % 4 === 0;
  const base = mix(hex('#8a8a8a'), hex('#5f5f5f'), ((cx * 7 + cy * 13) % 5) / 8);
  return edge ? hex('#4a4a4a') : mix(base, [0, 0, 0], r() * .12);
});
paint('dirt', speck(hex('#866043'), hex('#6b4a31'), hex('#9b7653'), .3, .15));
paint('grass_top', speck(hex('#62a13a'), hex('#4f8a2c'), hex('#79b84d'), .3, .2));
paint('grass_side', (x, y, r) => {
  const edge = 3 + ((x * 7) % 3 === 0 ? 1 : 0);
  if (y < edge) return mix(hex('#62a13a'), [0, 0, 0], r() * .15);
  return speck(hex('#866043'), hex('#6b4a31'), hex('#9b7653'))(x, y, r);
});
paint('netherrack', (x, y, r) => {
  const v = r();
  return v < .25 ? hex('#5e2424') : v > .82 ? hex('#8e4242') : mix(hex('#6f2e2e'), hex('#7b3434'), r());
});
paint('nether_bricks', (x, y, r) => {
  const row = Math.floor(y / 4), off = row % 2 ? 4 : 0;
  const mortar = y % 4 === 3 || (x + off) % 8 === 7;
  return mortar ? mix(hex('#140709'), hex('#210c10'), r()) : mix(hex('#2f1418'), hex('#44202a'), r() * .8);
});
paint('lava', (x, y, r) => {
  const w = Math.sin(x * .7 + Math.sin(y * .9) * 2) + Math.sin(y * .5 - x * .3);
  return w > .6 ? hex('#ffd24a') : w > -.2 ? hex('#f88b1c') : hex('#d2500e');
});
paint('obsidian', (x, y, r) => {
  const v = r();
  return v < .12 ? hex('#3b2a5c') : v < .2 ? hex('#261a3d') : mix(hex('#0f0b18'), hex('#17121f'), r());
});
paint('soul_sand', (x, y, r) => {
  const face = ((x - 3) ** 2 + (y - 5) ** 2 < 3) || ((x - 11) ** 2 + (y - 5) ** 2 < 3) || (y > 9 && y < 12 && x > 4 && x < 12);
  return face ? hex('#2d2018') : mix(hex('#51402f'), hex('#5f4b38'), r());
});
paint('basalt', (x, y, r) => mix(hex('#4a4a52'), hex('#5c5c66'), ((x * 3 + Math.floor(r() * 2)) % 5) / 5));
paint('blackstone', speck(hex('#2b2629'), hex('#1d191c'), hex('#3a3437'), .3, .2));
paint('glowstone', (x, y, r) => r() < .3 ? hex('#ffe9a6') : r() < .5 ? hex('#c4944f') : hex('#e8c276'));
paint('gravel', speck(hex('#837e7c'), hex('#5f5a58'), hex('#a39f9d'), .35, .25));
paint('sand', speck(hex('#dbd3a0'), hex('#c9bf8a'), hex('#e8e0b0'), .25, .2));
paint('planks', (x, y, r) => {
  const line = y % 4 === 3 || (x === (Math.floor(y / 4) * 5) % 16 && true);
  return line ? hex('#6b5530') : mix(hex('#a2824e'), hex('#b8945f'), r() * .6);
});
paint('log', (x, y, r) => mix(hex('#5a4326'), hex('#6f5431'), (x * 5 + Math.floor(r() * 3)) % 3 / 3));
paint('log_top', (x, y, r) => { const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)); return d > 6.5 ? hex('#5a4326') : Math.floor(d) % 2 ? hex('#9b7c4a') : hex('#b8955c'); });
paint('leaves', (x, y, r) => r() < .18 ? [0, 0, 0, 0] : mix(hex('#3b7a26'), hex('#2e6320'), r()));
paint('water', (x, y, r) => [...mix(hex('#2f5fc9'), hex('#4a7ce8'), (Math.sin(x * .8 + y * .3) + 1) / 2), 170]);
paint('end_stone', speck(hex('#dbe0a2'), hex('#c5ca8c'), hex('#eaeebc'), .3, .15));
paint('bedrock', (x, y, r) => { const v = r(); return v < .33 ? hex('#333333') : v < .66 ? hex('#575757') : hex('#7b7b7b'); });
paint('deepslate', (x, y, r) => mix(hex('#47474e'), hex('#5a5a60'), ((y + Math.floor(r() * 2)) % 4) / 4));
paint('magma', (x, y, r) => { const crack = (x + y * 3) % 7 === 0 || (x * 2 + y) % 9 === 0; return crack ? hex('#ffb13b') : mix(hex('#6b2410'), hex('#8e3313'), r()); });
paint('crimson_nylium', speck(hex('#8b1d1d'), hex('#6e1414'), hex('#a82a2a'), .3, .2));
paint('warped_nylium', speck(hex('#2b7a73'), hex('#1f5c56'), hex('#3a998f'), .3, .2));
paint('snow', speck(hex('#f2f7f7'), hex('#e0e8ea'), hex('#ffffff'), .2, .2));
paint('iron', (x, y, r) => (x % 16 === 0 || y % 16 === 0 || x === 15 || y === 15) ? hex('#a0a0a0') : mix(hex('#dcdcdc'), hex('#c8c8c8'), r()));
paint('gold', (x, y, r) => (x === 0 || y === 0 || x === 15 || y === 15) ? hex('#b8931c') : mix(hex('#f6d33b'), hex('#e6c02a'), r()));
paint('diamond', (x, y, r) => (x === 0 || y === 0 || x === 15 || y === 15) ? hex('#2b9c93') : mix(hex('#6fe3dc'), hex('#58d0c8'), r()));
paint('glass', (x, y) => (x === 0 || y === 0 || x === 15 || y === 15) ? [220, 235, 240, 255] : (x === y + 3 || x === y + 4) && x < 10 ? [255, 255, 255, 140] : [200, 225, 235, 30]);
paint('crying_obsidian', (x, y, r) => { const v = r(); return v < .15 ? hex('#7a1fd6') : v < .25 ? hex('#3b1d6b') : mix(hex('#0f0b18'), hex('#17121f'), r()); });
paint('quartz', speck(hex('#ece6df'), hex('#ddd4c9'), hex('#f7f3ee'), .2, .2));
paint('tnt_side', (x, y) => (y > 5 && y < 10) ? (x > 1 && x < 14 ? hex('#e6e6e6') : hex('#c9c9c9')) : (x % 4 === 0 ? hex('#8e2a14') : hex('#db3b1e')));
paint('tnt_top', (x, y, r) => ((x - 7.5) ** 2 + (y - 7.5) ** 2 < 5 ? hex('#3a3a3a') : mix(hex('#cc3a22'), hex('#a82e1a'), r())));
paint('mossy', speck(hex('#6b7a4a'), hex('#566339'), hex('#8a9c5f'), .3, .2));
paint('sculk', (x, y, r) => r() < .12 ? hex('#1f8a8e') : mix(hex('#0b1a22'), hex('#10252e'), r()));
paint('bricks', (x, y, r) => { const row = Math.floor(y / 4), off = row % 2 ? 4 : 0; const m = y % 4 === 3 || (x + off) % 8 === 7; return m ? hex('#9c9285') : mix(hex('#96492f'), hex('#a8583b'), r()); });
paint('purpur', (x, y, r) => (x % 8 === 0 || y % 8 === 0) ? hex('#8a5f8a') : mix(hex('#a97ca9'), hex('#b58bb5'), r()));
paint('ice', (x, y, r) => [...mix(hex('#8fb3f5'), hex('#a8c6f7'), r()), 220]);
paint('packed_ice', (x, y, r) => (x === 0 || y === 0) ? hex('#7fa6d9') : mix(hex('#a6c4ef'), hex('#b8d2f5'), r()));
paint('stone_bricks', (x, y, r) => { const row = Math.floor(y / 4), off = row % 2 ? 4 : 0; const m = y % 8 === 7 || y % 8 === 3 && false || (x + off) % 8 === 7 || y % 4 === 3; return m ? hex('#5a5a5a') : mix(hex('#7a7a7a'), hex('#8a8a8a'), r()); });
paint('end_bricks', (x, y, r) => { const row = Math.floor(y / 4), off = row % 2 ? 4 : 0; const m = y % 4 === 3 || (x + off) % 8 === 7; return m ? hex('#b8bb80') : mix(hex('#dfe3a8'), hex('#e8ecb6'), r()); });
paint('portal', (x, y, r) => [...mix(hex('#5a1ab8'), hex('#9a4aff'), (Math.sin(x * .9 + y * .4) + 1) / 2), 200]);
paint('white_tile', (x, y, r) => (x % 8 === 0 || y % 8 === 0) ? hex('#4fa8a0') : mix(hex('#eef2f2'), hex('#f8fafa'), r()));
paint('hay', (x, y, r) => (y % 6 === 0) ? hex('#8a6a1a') : mix(hex('#c9a832'), hex('#d8b83c'), r()));
paint('farmland', speck(hex('#5a3d22'), hex('#4a3018'), hex('#6b4a2a'), .3, .2));
paint('prismarine', speck(hex('#5fa89a'), hex('#4a8a7e'), hex('#7ac2b3'), .3, .2));
paint('pink', speck(hex('#e88aad'), hex('#d4769a'), hex('#f5a8c4'), .3, .2));
paint('seagrass_bed', speck(hex('#c9bf8a'), hex('#3a7a3a'), hex('#dbd3a0'), .25, .2));

export const atlasTexture = new THREE.CanvasTexture(atlas);
atlasTexture.magFilter = THREE.NearestFilter;
atlasTexture.minFilter = THREE.NearestFilter;
atlasTexture.generateMipmaps = false;
atlasTexture.colorSpace = THREE.SRGBColorSpace;
export const atlasCanvas = atlas;
export const TILES = tiles; export const TILE = T, TILE_COLS = COLS;

// block id -> textures + flags
const DEF = [];
const ID = {};
function def(name, top, side = top, bottom = top, flags = {}) {
  const id = DEF.length;
  DEF[id] = { name, top: tiles[top], side: tiles[side], bottom: tiles[bottom], ...flags };
  ID[name] = id;
}
DEF.push(null);
def('stone', 'stone'); def('cobble', 'cobble'); def('dirt', 'dirt'); def('grass', 'grass_top', 'grass_side', 'dirt');
def('netherrack', 'netherrack'); def('nether_bricks', 'nether_bricks'); def('lava', 'lava', 'lava', 'lava', { glow: 1, liquid: 1 });
def('obsidian', 'obsidian'); def('soul_sand', 'soul_sand'); def('basalt', 'basalt'); def('blackstone', 'blackstone');
def('glowstone', 'glowstone', 'glowstone', 'glowstone', { glow: .9 }); def('gravel', 'gravel'); def('sand', 'sand');
def('planks', 'planks'); def('log', 'log_top', 'log', 'log_top'); def('leaves', 'leaves', 'leaves', 'leaves', { cutout: 1 });
def('water', 'water', 'water', 'water', { liquid: 1, trans: 1 }); def('end_stone', 'end_stone'); def('bedrock', 'bedrock');
def('deepslate', 'deepslate'); def('magma', 'magma', 'magma', 'magma', { glow: .6 }); def('crimson', 'crimson_nylium', 'netherrack', 'netherrack');
def('warped', 'warped_nylium', 'netherrack', 'netherrack'); def('snow', 'snow'); def('iron', 'iron'); def('gold', 'gold'); def('diamond', 'diamond');
def('glass', 'glass', 'glass', 'glass', { cutout: 1 }); def('crying_obsidian', 'crying_obsidian', 'crying_obsidian', 'crying_obsidian', { glow: .3 });
def('quartz', 'quartz'); def('tnt', 'tnt_top', 'tnt_side', 'tnt_top'); def('mossy', 'mossy'); def('sculk', 'sculk');
def('bricks', 'bricks'); def('purpur', 'purpur'); def('ice', 'ice', 'ice', 'ice', { trans: 1 });
def('packed_ice', 'packed_ice'); def('stone_bricks', 'stone_bricks'); def('end_bricks', 'end_bricks');
def('portal', 'portal', 'portal', 'portal', { glow: .8, trans: 1 }); def('white_tile', 'white_tile'); def('hay', 'hay');
def('farmland', 'farmland'); def('prismarine', 'prismarine'); def('pink', 'pink'); def('seagrass_bed', 'seagrass_bed');
export const BLOCK = ID;

// directions: normal, u axis, v axis
const FACES = [
  { n: [1, 0, 0], u: [0, 0, -1], v: [0, 1, 0], k: 'side' },
  { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0], k: 'side' },
  { n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, -1], k: 'top' },
  { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1], k: 'bottom' },
  { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0], k: 'side' },
  { n: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0], k: 'side' },
];
const AO = [.42, .62, .8, 1];

export class World {
  constructor(sx, sy, sz, origin = [0, 0, 0]) {
    this.sx = sx; this.sy = sy; this.sz = sz; this.o = origin;
    this.d = new Uint8Array(sx * sy * sz);
  }
  idx(x, y, z) { x -= this.o[0]; y -= this.o[1]; z -= this.o[2]; if (x < 0 || y < 0 || z < 0 || x >= this.sx || y >= this.sy || z >= this.sz) return -1; return (y * this.sz + z) * this.sx + x; }
  get(x, y, z) { const i = this.idx(x, y, z); return i < 0 ? 0 : this.d[i]; }
  set(x, y, z, b) { const i = this.idx(x, y, z); if (i >= 0) this.d[i] = typeof b === 'string' ? ID[b] : b; }
  fill(x0, y0, z0, x1, y1, z1, b) {
    for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++)
      for (let z = Math.min(z0, z1); z <= Math.max(z0, z1); z++)
        for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) this.set(x, y, z, b);
  }
  solidForAO(x, y, z) { const b = this.get(x, y, z); return b && !DEF[b].trans && !DEF[b].liquid ? 1 : 0; }

  build({ lavaTex = null } = {}) {
    const groups = { opaque: [], glow: [], trans: [] };
    for (const g in groups) groups[g] = { pos: [], nor: [], uv: [], col: [], idx: [] };
    const { sx, sy, sz, o } = this;
    for (let y = 0; y < sy; y++) for (let z = 0; z < sz; z++) for (let x = 0; x < sx; x++) {
      const b = this.d[(y * sz + z) * sx + x];
      if (!b) continue;
      const D = DEF[b];
      const wx = x + o[0], wy = y + o[1], wz = z + o[2];
      const grp = D.glow ? groups.glow : (D.trans || D.cutout) ? groups.trans : groups.opaque;
      for (const F of FACES) {
        const nb = this.get(wx + F.n[0], wy + F.n[1], wz + F.n[2]);
        if (nb) { const N = DEF[nb]; if (!(N.trans || N.cutout || (N.liquid && !D.liquid)) || nb === b) continue; }
        const tile = D[F.k];
        const tu = (tile % COLS) * T, tv = Math.floor(tile / COLS) * T;
        const base = grp.pos.length / 3;
        const aos = [];
        const lift = D.liquid && F.n[1] === 1 ? -.12 : 0;
        for (const [u, v] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
          const px = wx + .5 + F.n[0] * .5 + F.u[0] * (u - .5) + F.v[0] * (v - .5);
          const py = wy + .5 + F.n[1] * .5 + F.u[1] * (u - .5) + F.v[1] * (v - .5) + lift;
          const pz = wz + .5 + F.n[2] * .5 + F.u[2] * (u - .5) + F.v[2] * (v - .5);
          grp.pos.push(px, py, pz);
          grp.nor.push(...F.n);
          grp.uv.push((tu + u * T) / atlas.width, 1 - (tv + (1 - v) * T) / atlas.height);
          const su = u ? 1 : -1, sv = v ? 1 : -1;
          const ox = wx + F.n[0], oy = wy + F.n[1], oz = wz + F.n[2];
          const s1 = this.solidForAO(ox + F.u[0] * su, oy + F.u[1] * su, oz + F.u[2] * su);
          const s2 = this.solidForAO(ox + F.v[0] * sv, oy + F.v[1] * sv, oz + F.v[2] * sv);
          const c = this.solidForAO(ox + F.u[0] * su + F.v[0] * sv, oy + F.u[1] * su + F.v[1] * sv, oz + F.u[2] * su + F.v[2] * sv);
          const ao = D.glow ? 3 : (s1 && s2 ? 0 : 3 - (s1 + s2 + c));
          aos.push(ao);
          const k = AO[ao];
          grp.col.push(k, k, k);
        }
        if (aos[0] + aos[2] < aos[1] + aos[3]) grp.idx.push(base + 1, base + 2, base + 3, base + 1, base + 3, base);
        else grp.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
      }
    }
    const root = new THREE.Group();
    const mk = (g, mat) => {
      if (!g.idx.length) return;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(g.pos, 3));
      geo.setAttribute('normal', new THREE.Float32BufferAttribute(g.nor, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(g.uv, 2));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(g.col, 3));
      geo.setIndex(g.idx);
      const m = new THREE.Mesh(geo, mat);
      m.castShadow = true; m.receiveShadow = true;
      root.add(m);
    };
    mk(groups.opaque, new THREE.MeshLambertMaterial({ map: atlasTexture, vertexColors: true }));
    mk(groups.glow, new THREE.MeshBasicMaterial({ map: atlasTexture, vertexColors: true }));
    mk(groups.trans, new THREE.MeshLambertMaterial({ map: atlasTexture, vertexColors: true, transparent: true, alphaTest: .1, side: THREE.DoubleSide }));
    return root;
  }
}
