// #12 Zeling (MitisyyLeDivorce) — día 26, 20/04/2020 01:58. Verified: wiki (Magma Cube; "aplastada por un
// Giga Magmacube") + clip (GersoonSG 6:58–7:11): no totem left ("Me han quitado el tótem"), Nether plain
// full of fire patches, lavafalls and a lava lake; zombie pigmen; magma cubes hopping; one right in front hits
// her; a huge orange mass fills the bottom of the screen, black smoke; hearts ~6 -> 1 -> "víctima de Cubo de magma".
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, fireBits, hurt, groundAt, stand, PX } from './common.js';
import { noise2 } from '../engine.js';
import { pixBox } from '../mobs.js';

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const T_SMALL = 1.7, T_LAND = 2.55, I = 3.1;

export default {
  n: 12, player: 'zeling', name: 'Zeling', ign: 'MitisyyLeDivorce', day: 26, date: '20/04/2020 · 01:58',
  sfx: 'hit', impact: 3.1, dur: 4.8,
  slow: [{ t: 2.25, d: .9, f: .33 }],
  chat: [
    ['<[MIEMBRO] Shadoune666> QUE ESTA PASABNDO', '#ffffff'],
    ['[MIEMBRO] MitisyyLeDivorce ha sido víctima de Cubo de magma', '#ffffff'],
  ],
  build(assets) {
    const w = new World(70, 26, 50, [-35, -8, -25]);
    for (let x = -35; x < 35; x++) for (let z = -25; z < 25; z++) {
      if (x > 8 && z > -8 && z < 10) { w.fill(x, -8, z, x, -2, z, 'lava'); continue; } // lava lake (right)
      const h = Math.floor(noise2(x * .12, z * .12, 5) * 1.2);
      w.fill(x, -8, z, x, h - 1, z, 'netherrack');
      if (Math.abs(x) > 26 || Math.abs(z) > 20) w.fill(x, h, z, x, h + 10 + Math.floor(noise2(x * .2, z * .2, 1) * 4), z, 'netherrack');
    }
    for (const [x, z] of [[-10, -12], [4, -15], [-18, 6]]) w.fill(x, 0, z, x + 1, 9, z + 1, 'netherrack'); // pillars
    w.fill(-26, 0, -14, -26, 9, -14, 'lava'); w.fill(20, 0, -20, 20, 9, -20, 'lava'); // lavafalls
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#1a0503');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#ffb080', '#401010', 1.3));
    const lav = new THREE.PointLight('#ff7a30', 30, 30, 1.1); lav.position.set(14, 3, 0); scene.add(lav);
    const fires = []; for (let i = 0; i < 30; i++) { const f = fireBits(4, .35); const x = -20 + (i * 37) % 30 + .5, z = -14 + (i * 23) % 26 + .5; stand(f, w, x, z, -.1); if (Math.abs(z - lerp(-2, 1.5, (x + 8) / 13)) > 1.2 || x > 8) { scene.add(f); fires.push(f); } }
    const p = player(assets, 'zeling'); scene.add(p);
    hold(p, pixBox(5, 5, 2, (f, i, j) => (i + j) % 3 ? hex('#f2c44c') : hex('#c98a2a')), { rx: -1.2 }); // the gold item she holds (x31)
    const pig = [[-3, -9], [-1.5, -10.5], [-4.5, -11]].map(([x, z]) => { const m = M.piglin({ zombified: true }); m.scale.multiplyScalar(PX); stand(m, w, x, z); face(m, 0, 0); scene.add(m); return m; });
    const smalls = [0, 1, 2, 3].map(i => { const m = M.slime({ magma: true, size: 2 }); m.scale.multiplyScalar(PX); scene.add(m); return m; });
    const giga = M.slime({ magma: true, size: 10 }); giga.scale.multiplyScalar(PX); scene.add(giga);
    const smoke = M.puffs(18, '#2a2a2a'); scene.add(smoke);
    const smoke2 = M.puffs(18, '#2a2a2a'); scene.add(smoke2);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 200);
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    let px = 0, pz = 0, gy = 0;
    // a magma cube hop: ground-snapped, squash when it lands
    const hopSlime = (m, x, z, t, period, h, base) => {
      const ph = ((t % period) + period) % period / period;
      const air = ph < .7 ? Math.sin(ph / .7 * Math.PI) : 0;
      stand(m, w, x, z, air * h);
      const sq = ph >= .7 ? Math.sin((ph - .7) / .3 * Math.PI) * .25 : 0;
      m.scale.set(base * (1 + sq * .6), base * (1 - sq), base * (1 + sq * .6));
    };
    return {
      scene, ink: { skyA: '#3a0e08', skyB: '#8a3a20', tint: '#fff0e6', lineW: 2.3 },
      cues: [{ t: T_SMALL, type: 'sfx', kind: 'hurt', gain: .4 }, { t: 1.95, type: 'sfx', kind: 'hurt', gain: .35 }, { t: T_LAND, type: 'sfx', kind: 'hurt', gain: .5 }],
      hearts: lt => ({ v: lt < T_SMALL ? 6.5 : lt < T_LAND ? 6 : 1, blink: (lt > T_SMALL && lt < 1.85) || (lt > 1.95 && lt < 2.05) || (lt > T_LAND && lt < 2.75) }),
      notes: [
        { t0: .05, t1: 2.5, text: 'sin tótem: «me han quitado el tótem»', x: 980, y: 210, size: 50 },
        { t0: .8, t1: 2.4, text: 'cubos de magma', x: 200, y: 700, size: 56, to: () => smalls[0].position.clone().add(V(0, .6, 0)), ax: 330, ay: 735, bend: -50 },
        { t0: 2.2, t1: I, text: 'le cae un cubo de magma gigante', x: 1000, y: 330, size: 52, to: () => giga.position.clone().add(V(-1, 4.2, 0)), ax: 1150, ay: 365, bend: 40 },
        { t0: 2.5, t1: I, text: 'de 6 corazones a 1', x: 330, y: 800, size: 52, to: [800, 890], ax: 560, ay: 830, bend: 30 },
      ],
      update(lt, T) {
        const run = clamp(lt / 2.4);
        px = lerp(-8, 4.6, run); pz = lerp(-2, 1.3, run);
        stand(p, w, px, pz);
        face(p, lt < 2.4 ? 12 : 9, lt < 2.4 ? 3.2 : 3.5);
        const running = lt < 2.45;
        pose(p, { idle: T * 2, walk: T * 15, swing: running ? .9 : 0, armRaise: .4, headPitch: lt > 2.2 && lt < I ? -.45 : 0 });
        hurt(p, (lt > T_SMALL && lt < 1.85) || (lt > 1.95 && lt < 2.05) || (lt > T_LAND && lt < 2.75) || (lt > 3.0 && lt < I) ? 1 : 0);
        fires.forEach(f => f.userData.anim(T));
        pig.forEach((m, i) => pose(m, { idle: T + i, headYaw: Math.sin(T * .7 + i) * .3 })); // standing around
        // small magma cubes hopping among the fires; #0 right in front of her
        smalls.forEach((m, i) => {
          const SP = [null, [-2, 3.8], [1.5, 5.8], [7, -2.5]]; // the others roam off her path (and out of the wide shot's line of sight)
          const bx = i === 0 ? px + 1.7 : SP[i][0] + Math.sin(T * .6 + i) * .6, bz = i === 0 ? pz + .5 : SP[i][1];
          hopSlime(m, bx, bz, T + i * .37, .9 + i * .1, i === 0 ? .9 : 1.3, PX);
          face(m, px, pz);
        });
        // the Giga Magma Cube: one big hop onto her, a bounce, and down again
        giga.visible = lt > 1.25;
        const gx0 = 7.6, gz0 = -4.6, gx1 = 5.0, gz1 = 1.6; // from the shore ahead-left, onto her
        if (lt < 2.0) { giga.position.set(gx0, 0, gz0); gy = 0; }
        else if (lt < T_LAND) { const k = (lt - 2.0) / (T_LAND - 2.0); giga.position.set(lerp(gx0, gx1, k), 0, lerp(gz0, gz1, k)); gy = 5.5 * Math.sin(k * Math.PI); }
        else if (lt < I) { const k = (lt - T_LAND) / (I - T_LAND); giga.position.set(gx1 - .2 * k, 0, gz1); gy = 1.9 * Math.sin(k * Math.PI); }
        else { giga.position.set(gx1 - .2, 0, gz1); gy = 0; }
        giga.position.y = groundAt(w, giga.position.x, giga.position.z) + gy;
        face(giga, px, pz);
        const land = Math.max(clamp(1 - Math.abs(lt - T_LAND) / .12), clamp(1 - Math.abs(lt - I) / .12));
        giga.scale.set(PX * (1 + land * .12), PX * (1 - land * .2), PX * (1 + land * .12));
        smoke.position.set(px, groundAt(w, px, pz) + .5, pz); M.animPuffs(smoke, lt - T_LAND, { radius: 2.4, size: .55 });
        smoke2.position.set(px, groundAt(w, px, pz) + .5, pz); M.animPuffs(smoke2, lt - I, { radius: 2.8, size: .6 });
        p.visible = lt < I;
        const gy0 = groundAt(w, px, pz);
        if (lt < 1.3) return cam(camera, [px - 5, gy0 + 3.3, pz - 5.5], [px + 4, gy0 + .8, pz + 2], 55); // running across the burning plain
        if (lt < 2.2) return cam(camera, [px - 1.6, gy0 + 1.9, pz - 2.2], [px + 3, gy0 + .6, pz + .8], 58); // a magma cube right in front
        if (lt < I) { const k = ease.inOut(clamp((lt - 2.2) / .9)); return cam(camera, [lerp(px - 7.6, px - 7.0, k), gy0 + 1.5, lerp(pz - 5.2, pz - 4.8, k)], [px + 1.4, gy0 + 3.0, pz + .6], 60); } // wide: the huge one comes down on her
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(px - 7.0, px - 10, k), gy0 + lerp(1.5, 7, k), lerp(pz - 4.8, pz - 9, k)], [px + 1, gy0 + 1.5, pz], 58);
      },
    };
  },
};
