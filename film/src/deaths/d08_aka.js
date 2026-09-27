// #8 AKAWonder — día 12, 06/04/2020 01:17. Verified: wiki (Blaze) + clip (GersoonSG 4:49–5:22): Nether
// fortress (nether-brick floor, walls and fences inside a netherrack cave), a blaze spawner on a raised
// nether-brick area with 2–3 blazes and fire on the floor, his little setup against a netherrack wall
// (torch, sign, wooden chest, ender chest), a dark doorway. He raises a fire-resistance potion, fights with
// a diamond sword and shield, catches fire (~5:01) and burns for ~20 s (hearts 10 -> ½), ending by his
// chest wall with the regeneration potion in hand -> "se ha reducido a cenizas mientras luchaba contra Blaze".
// Compressed in time here. Blazes shooting small fireballs = generic blaze behaviour.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, fireBits, spawnerCage, sign, groundAt, stand, PX } from './common.js';
import { pixBox } from '../mobs.js';

const FENCE = new THREE.MeshLambertMaterial({ color: '#3a1418' });
// nether-brick fence run between two block centres (axis-aligned), standing on `y`
function fenceRun(scene, x0, z0, x1, z1, y) {
  const n = Math.max(Math.abs(x1 - x0), Math.abs(z1 - z0));
  const dx = Math.sign(x1 - x0), dz = Math.sign(z1 - z0);
  for (let i = 0; i <= n; i++) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(.25, 1, .25), FENCE); post.position.set(x0 + dx * i, y + .5, z0 + dz * i); scene.add(post);
    if (i < n) for (const h of [.42, .8]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(dx ? 1 : .12, .18, dz ? 1 : .12), FENCE);
      bar.position.set(x0 + dx * (i + .5), y + h, z0 + dz * (i + .5)); scene.add(bar);
    }
  }
}
// flames all over a burning player's body (player-pixel units)
function bodyFire(n = 26) {
  const g = new THREE.Group();
  const mats = ['#ffd24a', '#f88b1c', '#ff5a10', '#ffe98a'].map(c => new THREE.MeshBasicMaterial({ color: c }));
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(2.6, 5, 2.6), mats[i % 4]);
    const a = i * 2.4, r = 4 + (i % 3) * 1.2;
    m.userData = { ph: i * .37, y0: 1 + (i * 11) % 30, x: Math.cos(a) * r, z: Math.sin(a) * r * .8 };
    g.add(m);
  }
  g.userData.anim = t => g.children.forEach(m => {
    const u = m.userData, k = (Math.sin(t * 13 + u.ph * 9) + 1) / 2, rise = (t * 2.2 + u.ph) % 1;
    m.position.set(u.x, u.y0 + rise * 5, u.z); m.scale.set(1 - rise * .5, .5 + k * .9, 1 - rise * .5);
  });
  return g;
}
function potion(rgb) {
  const g = new THREE.Group(); g.scale.setScalar(.75);
  const b = pixBox(5, 5, 5, (f, i, j) => j < 1 ? [220, 220, 235] : rgb, { emissive: true }); g.add(b);
  const neck = pixBox(2, 3, 2, () => [220, 220, 235]); neck.position.y = 3.8; g.add(neck);
  return g;
}
function animBlaze(b, T, i) {
  b.userData.head.rotation.y = Math.sin(T * 1.3 + i) * .4;
  b.userData.rods.forEach((r, k) => {
    const ring = k < 4 ? 0 : k < 8 ? 1 : 2;
    const a = (k % 4) / 4 * Math.PI * 2 + T * (ring === 1 ? -2 : 2.4) + i;
    const rr = [6, 8, 5][ring];
    r.position.set(Math.cos(a) * rr, [15, 9, 3][ring] + Math.sin(T * 4 + k) * 1.2, Math.sin(a) * rr);
  });
}

export default {
  n: 8, player: 'aka', name: 'AKAWonder', ign: 'AKAWonder', day: 12, date: '06/04/2020 · 01:17',
  sfx: 'hit', impact: 3.5, dur: 5.1, storm: true,
  slow: [{ t: 1.4, d: .55, f: .35 }, { t: 3.0, d: .5, f: .35 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de AKAWonder. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['AKAWonder, De noob a doble noob', '#aaaaaa'],
    ['[MIEMBRO] AKAWonder se ha reducido a cenizas mientras luchaba contra Blaze', '#ffffff'],
  ],
  build(assets) {
    const w = new World(40, 18, 34, [-20, -5, -17]);
    w.fill(-20, -5, -17, 19, 12, 16, 'netherrack');
    w.fill(-13, 0, -12, 13, 8, 9, 0); // the netherrack cave
    w.fill(-10, 0, -13, 8, 6, -13, 0); w.fill(-12, 9, -8, 10, 9, 5, 0); w.fill(-13, 0, 10, -6, 5, 10, 0); // uneven cave walls
    w.fill(-9, -1, -10, 11, -1, 5, 'nether_bricks'); // fortress floor
    w.fill(-9, 0, -11, 11, 4, -11, 'nether_bricks'); // back wall...
    for (let x = -7; x <= 9; x += 3) w.fill(x, 2, -11, x, 3, -11, 0); // ...with fenced windows
    w.fill(-5, 0, -12, -5, 1, -11, 0); // the dark doorway
    w.fill(12, 0, -11, 12, 4, 5, 'nether_bricks'); // right wall
    w.fill(3, 0, -10, 10, 0, -4, 'nether_bricks'); // raised spawner area
    w.fill(9, 1, -10, 11, 1, -9, 'nether_bricks');
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0a0303');
    scene.add(w.build());
    for (let x = -7; x <= 9; x += 3) fenceRun(scene, x + .5, -10.5, x + .5, -10.5, 2);
    fenceRun(scene, 3.5, -3.5, 4.5, -3.5, 1); fenceRun(scene, 8.5, -3.5, 10.5, -3.5, 1); fenceRun(scene, 10.5, -3.5, 10.5, -8.5, 1);
    const doorDark = new THREE.Mesh(new THREE.BoxGeometry(.98, 1.98, .1), new THREE.MeshBasicMaterial({ color: '#050101' })); doorDark.position.set(-4.5, 1, -11.95); scene.add(doorDark);
    const door = pixBox(3, 32, 16, (f, i, j) => (j % 8 === 0 || i % 7 === 0) ? [40, 26, 14] : [74, 50, 28]); door.scale.setScalar(PX); door.position.set(-3.9, 1, -10.4); scene.add(door);
    scene.add(new THREE.HemisphereLight('#ffb890', '#502018', 1.25));
    const fl = new THREE.PointLight('#ff8a30', 26, 16, 1.2); fl.position.set(6, 3.5, -6); scene.add(fl);
    const tl = new THREE.PointLight('#ffc070', 12, 9, 1.2); tl.position.set(-11.5, 2.5, 1.8); scene.add(tl);
    const cage = spawnerCage(); cage.position.set(6.5, 1, -7.5); scene.add(cage);
    const fires = [[2.5, -2.5], [8.5, -5.5], [-1.5, -5.5], [10.5, -1.5], [4.5, -8.5], [.5, -7.5]].map(([x, z]) => { const f = fireBits(6, .45); f.scale.setScalar(1.7); f.position.set(x, groundAt(w, x, z, 5), z); scene.add(f); return f; });
    // his little setup against the netherrack wall: torch, signs, wooden chest, ender chest
    const chest = pixBox(14, 14, 14, (f, i, j) => j === 5 || j === 6 ? [70, 46, 20] : (f === 'px' && j === 6 && i > 5 && i < 9) ? [200, 200, 200] : [156, 106, 52]); chest.scale.setScalar(PX); chest.position.set(-12.5, groundAt(w, -12.5, 2.5, 5) + 7 * PX, 2.5); scene.add(chest);
    const ender = pixBox(14, 14, 14, (f, i, j) => j === 5 ? [40, 170, 150] : (i + j) % 5 ? [18, 30, 30] : [30, 48, 46]); ender.scale.setScalar(PX); ender.position.set(-12.5, groundAt(w, -12.5, 1.3, 5) + 7 * PX, 1.3); scene.add(ender);
    const t = torch(); t.scale.setScalar(PX); t.position.set(-12.8, 1.7, 3.6); t.rotation.z = -.35; scene.add(t);
    for (const [z, y] of [[1.9, 1.85], [3, 2.1]]) { const s = sign(['']); s.children[1].visible = false; s.rotation.y = Math.PI / 2; s.position.set(-12.92, y - 1.05, z); scene.add(s); }

    const p = player(assets, 'aka'); scene.add(p);
    const sw = hold(p, M.sword('diamond'), { rx: -1.3 });
    const potA = hold(p, potion([150, 60, 190]), { rx: -.2 }); // "Poción de cuerpo ignífugo"
    const potB = hold(p, potion([230, 90, 170]), { rx: -.2 }); // "Poción de regeneración"
    const sh = hold(p, M.shield(), { rx: -.1, left: true }); sh.position.set(1, -8, -2);
    const burn = bodyFire(); p.add(burn);
    const blazes = [0, 1, 2].map(() => { const b = M.blaze(); b.scale.multiplyScalar(PX); scene.add(b); return b; });
    const smokes = blazes.map(() => { const s = M.particlesCube('#161010', 7, .45, .16); scene.add(s); return s; });
    // blaze fireballs: [launch time, blaze index, hits him?]
    const shots = [[1.0, 0, 0], [1.1, 0, 0], [1.2, 0, 1], [2.0, 1, 1], [2.17, 1, 0], [2.55, 2, 1], [2.72, 1, 1], [3.05, 2, 1]];
    const balls = shots.map(() => { const b = M.fireball(5); b.scale.multiplyScalar(PX); scene.add(b); return b; });
    const hits = shots.map(() => { const s = M.puffs(8, '#ffb040'); scene.add(s); return s; });
    const ash = M.puffs(22, '#3a3434'); scene.add(ash);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 100);
    const I = 3.5, FIRE = 1.62, P1 = 1.3, P2 = 2.1, P3 = 2.95;
    const hp = [[0, 10], [FIRE, 9.5], [2.0, 8.5], [2.25, 7], [2.5, 6], [2.75, 4.5], [2.95, 3.5], [3.1, 2.5], [3.22, 2], [3.32, 1.5], [3.4, 1], [3.45, .5]];
    // his path: potion by his setup -> into the spawner room -> close fight -> backs off toward his chest wall
    const path = lt => {
      if (lt < P1) return [-10.6, 2.2];
      if (lt < P2) { const k = ease.inOut((lt - P1) / (P2 - P1)); return [lerp(-10.6, -5.6, k), lerp(2.2, -1.4, k)]; }
      if (lt < P3) return [-5.6 + Math.sin(lt * 7) * .15, -1.4];
      const k = ease.out(clamp((lt - P3) / .5)); return [lerp(-5.6, -8.6, k), lerp(-1.4, 1.1, k)];
    };
    const blazePos = (i, lt, T) => {
      const bob = Math.sin(T * 2.2 + i * 2) * .25;
      if (i === 0) return [6.5 + Math.cos(T * .9) * 1.4, 2.4 + bob, -7.5 + Math.sin(T * .9) * 1.4];
      if (i === 1) return [4 + Math.sin(T * .7) * .8, 2.9 + bob, -5.8];
      const k = ease.inOut(clamp((lt - 1.35) / .9)), k2 = ease.inOut(clamp((lt - P3) / .5));
      return [lerp(8.5, lerp(-3.9, -6.2, k2), k), lerp(3.4, 1.6, k) + bob, lerp(-4.5, lerp(-2.9, -.8, k2), k)];
    };
    const tmp = new THREE.Vector3();
    let now = 0;
    const HIDE = () => camera.position.clone().addScaledVector(camera.getWorldDirection(tmp), -5); // behind the camera = not drawn
    const when = (ok, fn) => () => ok() ? fn() : HIDE();
    return {
      scene, ink: { skyA: '#2a0e08', skyB: '#5a2414', tint: '#fff2e8', lineW: 2.3 },
      cues: [{ t: 1.0, type: 'sfx', kind: 'shoot', gain: .5 }, { t: FIRE, type: 'sfx', kind: 'hurt', gain: .3 }, { t: 2.0, type: 'sfx', kind: 'shoot', gain: .5 }, { t: 2.3, type: 'sfx', kind: 'hurt', gain: .25 }, { t: 2.8, type: 'sfx', kind: 'hurt', gain: .25 }, { t: 3.25, type: 'sfx', kind: 'hurt', gain: .2 }],
      hearts: lt => { let v = 10; for (const [t, h] of hp) if (lt >= t) v = h; return { v, blink: lt > FIRE && Math.floor(lt * 10) % 4 === 0 }; },
      notes: [
        { t0: 0, t1: 1.7, text: 'se bebe la poción ignífuga', x: 1180, y: 420, size: 50, circle: when(() => now < P1, () => potA.getWorldPosition(new THREE.Vector3())), r: 70 },
        { t0: 1.15, t1: 2.5, text: 'un blaze le lanza bolas de fuego', x: 1060, y: 215, size: 50, to: when(() => now < P2, () => blazes[0].position.clone().add(new THREE.Vector3(0, 1.5, 0))) },
        { t0: 1.62, t1: 2.92, text: '…y se prende fuego', x: 600, y: 300, size: 50, to: () => p.position.clone().add(new THREE.Vector3(0, 1.6, 0)), bend: 30 },
        { t0: 2.4, t1: 3.5, text: 'se quema: medio corazón', x: 1080, y: 740, size: 50, to: [818, 872], bend: -30 },
        { t0: 3.7, t1: 5.9, text: 'él: «si me tomé la poción, tío»', x: 1120, y: 240, size: 48 },
      ],
      update(lt, T) {
        now = lt;
        const [px, pz] = path(lt);
        stand(p, w, px, pz, 0, 5);
        const bz = blazePos(2, lt, T);
        if (lt < P1) face(p, -4, -2); else if (lt < P2) face(p, 4, -6); else if (lt < P3) face(p, bz[0], bz[2]); else face(p, -12.5, 2.2);
        const slash = lt > P2 && lt < P3 && Math.sin(T * 13) > .2;
        const walking = (lt > P1 && lt < P2) || (lt > P3 && lt < 3.4);
        pose(p, { idle: T * 2, walk: T * 10, swing: walking ? .6 : 0, armRaise: lt < P1 ? 1.5 : lt > P3 ? 1.45 : slash ? 1.9 : .45, headPitch: lt < P1 ? -.25 : lt > P3 ? .15 : -.2 });
        p.userData.armL.rotation.x = lt > P2 && lt < P3 ? -.9 : -.3; // shield up in the fight
        potA.visible = lt < P1; potB.visible = lt >= P3; sw.visible = lt >= P1 && lt < P3;
        burn.visible = lt > FIRE; burn.userData.anim(T);
        fires.forEach(f => f.userData.anim(T));
        blazes.forEach((b, i) => {
          const [x, y, z] = blazePos(i, lt, T);
          b.position.set(x, Math.max(y, groundAt(w, x, z, 5) + .35), z);
          face(b, px, pz); animBlaze(b, T, i);
          smokes[i].position.set(x, b.position.y + .6, z); M.animParticles(smokes[i], T + i, { rise: .45, spread: .45 });
        });
        shots.forEach(([t0, bi, hit], k) => {
          const b = blazes[bi], ft = (lt - t0) / .42;
          balls[k].visible = ft > 0 && ft < 1;
          const tx = hit ? px : px + 1.6 - k % 3, tz = hit ? pz : pz - 1.2 + k % 2 * 2.4, ty = hit ? 1.2 : groundAt(w, tx, tz, 5) + .1;
          balls[k].position.set(lerp(b.position.x, tx, ft), lerp(b.position.y + 1.35, ty, ft), lerp(b.position.z, tz, ft));
          balls[k].rotation.set(T * 6, T * 4, 0);
          hits[k].position.set(tx, ty, tz); M.animPuffs(hits[k], ft >= 1 ? (lt - t0 - .42) * 1.6 : -1, { radius: .5, size: .22 });
        });
        ash.position.set(px, .4, pz); M.animPuffs(ash, lt - I, { radius: 1.1, size: .45 });
        fl.intensity = 26 + Math.sin(T * 9) * 5; tl.intensity = 12 + Math.sin(T * 13) * 2;
        p.visible = lt < I;
        if (lt < P1) return cam(camera, [-7.4, 2.5, 4.7], [-10.9, 1.35, 1.9], 50); // the fire-resistance potion, raised by his setup
        if (lt < P2) { const k = (lt - P1) / (P2 - P1); return cam(camera, [lerp(-12.6, -11.8, k), 3.7, 7.6], [lerp(0, 2, k), 1.5, -4.5], 52); } // the fortress: spawner, blazes, fire; fireballs
        if (lt < P3) return cam(camera, [-1.6, 2.4, 1.6], [-4.8, 1.5, -2.1], 56); // sword & shield against the blaze, burning
        if (lt < I) return cam(camera, [-4.2, 2.3, 3.6], [-9.6, 1.35, 1.3], 54); // back by his chest wall, regeneration potion, ½ heart
        tmp.set(-8.6, .6, 1.1); const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(-5, -4, k), lerp(2.8, 6.2, k), lerp(4.2, 6.5, k)], [tmp.x, tmp.y, tmp.z], 55);
      },
    };
  },
};
