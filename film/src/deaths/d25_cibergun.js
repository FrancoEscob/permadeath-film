// #25 Cibergun — día 36, 30/04/2020 19:55. Verified: wiki (Ender Ghast, tótem consumido) + clip (GersoonSG
// 16:06–16:24): the End, a wide flat end-stone island, endermen; he's INVISIBLE with no armour (inventory shows
// Invisibilidad, empty armour slots), cooked cod in hand, totem in the offhand. An enderman walks right up to
// him; the totem pops from full health (cause not visible); he holds a slow-falling potion, ~3.5 hearts, walks
// toward a low ledge -> "ha explotado por Ender Ghast". No ghast is ever on screen. His words afterwards:
// "se me ha pasado la poción hablando".
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, ghostify, totemPop, fireBits, PX } from './common.js';
import { pixBox } from '../mobs.js';
import { noise2 } from '../engine.js';
import { safeWander, isle, chorus, wander, walkOn, ender, potion, groundFoot, noteBlock } from './lib_end_d23_27.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const SLOW = [{ t: 2.45, d: .7, f: .35 }, { t: 4.6, d: .4, f: .4 }];

export default {
  n: 25, player: 'cibergun', name: 'Cibergun', ign: 'cibergun', day: 36, date: '30/04/2020 · 19:55',
  sfx: 'explosion', impact: 4.8, dur: 6.4, storm: true, slow: SLOW,
  note: 'NINGÚN GHAST APARECE EN CÁMARA',
  tags: ['INVISIBLE', 'SIN ARMADURA'],
  chat: [
    ['cibergun ha consumido un tótem. (Probabilidad: 47 != 99)', '#ffff55'],
    ['<[MIEMBRO] Hardyluski> NO', '#ffffff'],
    ['Este es el comienzo del sufrimiento eterno de cibergun. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['[MIEMBRO] cibergun ha explotado por Ender Ghast', '#ffffff'],
  ],
  build(assets) {
    const w = new World(90, 30, 90, [-45, -12, -45]);
    // wide flat end-stone plain (end_midlands): gentle organic terraces off to the sides, flat where he walks
    isle(w, { r: 38, depth: 8, seed: 4, terr: 1, keep: (x, z) => (x / 26) ** 2 + (z / 11) ** 2 < 1 + .35 * noise2(x * .12, z * .12, 9) });
    // the low ledge ahead: the plain drops one block from x ≈ 9 on (ragged edge)
    for (let x = 8; x < 30; x++) for (let z = -16; z <= 16; z++) if (x >= 9 + Math.round(noise2(0, z * .3, 4) * 1.2 + Math.abs(z) * .15) && w.get(x, -1, z) && !w.get(x, 0, z)) w.set(x, -1, z, 0);
    let sd = 3;
    for (const [x, z, h] of [[-24, -22, 6], [16, -27, 5], [27, -16, 7], [-30, 10, 5], [22, 24, 6], [-8, -32, 4], [4, 30, 5]]) { let y = -1; while (w.get(x, y, z)) y++; chorus(w, x, y, z, h, sd++); }
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0a0610');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#d8c8f0', '#2a2030', 1.25));
    const dl = new THREE.DirectionalLight('#fff4e6', .45); dl.position.set(-4, 10, 6); scene.add(dl);

    const p = player(assets, 'cibergun'); scene.add(p);
    ghostify(p, { color: '#ffffff', t: .6 }); // invisible, no armour: only an outline (held items still show, added after)
    const cod = hold(p, pixBox(3, 8, 2, (f, i, j) => j < 2 ? [120, 90, 60] : [200, 150, 100]), { rx: -1.2 }); cod.scale.setScalar(1.3);
    const pot = hold(p, potion('#b58ad8'), { rx: -.5 }); pot.scale.setScalar(1.15); pot.visible = false;
    const tot = hold(p, M.totem(), { rx: -1.2, left: true }); tot.scale.setScalar(.8);

    // endermen wander over the plain; one walks straight at him
    const walkers = [[-2, -8, 3, 1.5, .4, 0], [9, 7, 2.5, 2, .45, 2], [-11, 6, 2, 2.5, .5, 4], [15, -8, 2, 2, .35, 1], [-15, -10, 2.5, 1.5, .4, 3], [3, 12, 3, 1.2, .5, 5]].map(([cx, cz, rx, rz, sp, ph]) => ({ e: ender(), f: safeWander(w, cx, cz, rx, rz, sp, ph) }));
    walkers.forEach(o => scene.add(o.e));
    const stalker = ender(); scene.add(stalker);
    const pop = totemPop(scene);
    const boom = M.puffs(28); scene.add(boom); const flash = M.burst(); scene.add(flash);
    const smoke = M.puffs(18, '#bdbdbd'); scene.add(smoke);
    const fires = [[.6, .4], [-.5, .7], [.2, -.8], [-.7, -.4]].map(([x, z]) => { const f = fireBits(4, .45); f.userData.o = [x, z]; scene.add(f); return f; });
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 220);
    const I = 4.8, TT = 2.6, STOP = 2.35, GO = 3.3;
    // walk across the plain, stop when the enderman is in his face, then on toward the ledge
    const X = lt => lt < STOP ? lerp(-9, -1.6, lt / STOP) : lt < GO ? -1.6 : lerp(-1.6, 7.4, clamp((lt - GO) / (I - GO)));
    const walking = lt => lt < STOP - .05 || lt > GO;
    const A0 = .9, A1 = 2.5; // stalker approach window
    const stalk = lt => {
      if (lt < TT + .15) { const k = ease.out(clamp((lt - A0) / (A1 - A0))); return [lerp(4.5, X(A1) + 1.05, k), lerp(-5.5, 0, k)]; }
      const k = clamp((lt - TT - .15) / 1.6); return [lerp(X(A1) + 1.05, -1.2, k), lerp(0, -4.8, k)]; // walks off to the far side, out of his path and away from the camera
    };
    const chest = () => p.position.clone().add(V(0, 1.25, 0));
    return {
      scene, ink: { skyA: '#140a1e', skyB: '#3a2452', tint: '#f2ecff', lineW: 2.3 },
      cues: [{ t: TT, type: 'sfx', kind: 'totem' }],
      hearts: lt => ({ v: lt < TT ? 10 : lerp(2.5, 3.5, clamp((lt - TT) / .8)), blink: lt > TT && lt < TT + .25 }),
      notes: [
        ...noteBlock(.15, 2.1, ['invisible y sin armadura'], 1180, 330, { to: chest, bend: -70 }),
        ...noteBlock(2.0, 3.0, ['un enderman se le acerca'], 1170, 250, { to: () => stalker.position.clone().add(V(0, 2.75, 0)), bend: 40, slow: SLOW }),
        ...noteBlock(2.62, 4.2, ['tótem con la vida llena', 'no se ve qué le golpea'], 1230, 560, { slow: SLOW }),
        ...noteBlock(3.4, 4.8, ['poción de caída lenta'], 1160, 300, { to: () => pot.getWorldPosition(V(0, 0, 0)), bend: 50 }),
      ],
      update(lt, T) {
        const px = X(lt);
        p.position.set(px, groundFoot(w, px, 0), 0);
        face(p, 20, 0);
        const wk = walking(lt);
        pose(p, { idle: T * 2, walk: lt * 9, swing: wk ? .6 : 0, armRaise: lt > GO ? .75 : .4 });
        cod.visible = lt < TT; pot.visible = lt >= 3.0 && lt < I; tot.visible = lt < TT;
        const [sx, sz] = stalk(lt);
        stalker.position.set(sx, groundFoot(w, sx, sz), sz);
        const [nx, nz] = stalk(lt + .05);
        if (lt < A1 || lt > TT + .15) stalker.rotation.y = Math.hypot(nx - sx, nz - sz) > 1e-4 ? Math.atan2(nx - sx, nz - sz) : stalker.rotation.y;
        if (lt >= A1 && lt <= TT + .15) face(stalker, px, 0);
        const moving = (lt > A0 && lt < A1 - .05) || lt > TT + .2;
        pose(stalker, { idle: T, walk: lt * 5.5, swing: moving ? .32 : 0 });
        walkers.forEach((o, i) => walkOn(o.e, w, o.f, T * .8 + i * 1.3));
        // death: blown up where he stands (the ghast itself is never seen)
        boom.position.set(px + .2, 1.1, 0); flash.position.copy(boom.position); smoke.position.set(px, .5, 0);
        M.animPuffs(boom, lt - I, { radius: 2.4, size: .6 }); M.animBurst(flash, lt - I, 3.6);
        M.animPuffs(smoke, lt - I - .08, { radius: 3.2, size: .5 });
        fires.forEach(f => { f.visible = lt > I; const fx = px + f.userData.o[0], fz = f.userData.o[1]; f.position.set(fx, groundFoot(w, fx, fz), fz); f.userData.anim(T); });
        p.visible = lt < I && !(lt > 1.9 && lt < GO);
        let c;
        if (lt < 1.9) c = cam(camera, [px - 3.4, 2.3, 4.4], [px + 3, 1.1, -1.2], 54); // an outline carrying cod across the end stone
        else if (lt < GO) { const hy = 1.62 + (wk ? Math.abs(Math.sin(lt * 9)) * .04 : 0); c = cam(camera, [px, hy, 0], [lerp(sx, px + 3, clamp((lt - TT - .3) / .5)), lerp(1.9, 2.6, clamp((lt - 1.9) / .6)), lerp(sz, 0, clamp((lt - TT - .3) / .5))], 64); } // his view: the enderman walks right up; totem
        else if (lt < I) c = cam(camera, [px - 2.5, 2.1, 3.5], [px + 3.4, .8, -.6], 55); // slow-falling potion, walking to the low ledge
        else { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(px - 3, px - 7, k), lerp(2.5, 7, k), lerp(3, 7, k)], [px, 0, 0], 55); }
        pop(camera, lt - TT);
        return c;
      },
    };
  },
};
