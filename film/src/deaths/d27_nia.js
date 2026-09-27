// #27 Nia (Lakshart) — día 38, 02/05/2020 18:22. Verified: wiki (Ender Ghast, tótem consumido) + clip
// (GersoonSG 17:44–18:00): End outer island (low end-stone terraces, chorus), End City tower, dozens of
// glowing-outlined endermen, toast "¡Desafío completado! Sin piedad"; a pale cloud, the totem pops, a small
// white ghast upper right; golden apple, totem in the main hand, an ender pearl; she sprints past a small pool,
// a pale cube and a wooden structure; switches to the bow at ~6.5 hearts -> "ha explotado por Ender Ghast".
// The clip cuts before the last hit; per the director the retelling shows the ghast firing (the death message
// names the Ender Ghast as the killer).
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, totemPop, toast, fireBits, pearl as pearlItem, PX } from './common.js';
import { noise2 } from '../engine.js';
import { safeWander, isle, chorus, endTower, wander, walkOn, ender, carryPose, goldenApple, groundFoot, flameTrail, animTrail, noteBlock } from './lib_end_d23_27.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
// timeline (sim s)
const TC = 2.0, TT = 2.3, S2 = 2.2, S3 = 3.7, APPLE = [3.7, 4.0], PEARL = [4.0, 4.3], BOW = 5.0, FIRE = 5.25, I = 5.8;
const SLOW = [{ t: 2.2, d: .7, f: .38 }, { t: 5.2, d: .62, f: .35 }];

export default {
  n: 27, player: 'nia', name: 'Nia', ign: 'Lakshart', day: 38, date: '02/05/2020 · 18:22',
  sfx: 'explosion', impact: I, dur: I + 1.6, storm: true, slow: SLOW,
  chat: [
    ['Lakshart ha consumido un tóten. (Probabilidad: 32 != 99)', '#ffff55'],
    ['Dice nyasu pero no tiene 7 vidas', '#aaaaaa'],
    ['[MIEMBRO] Lakshart ha explotado por Ender Ghast', '#ffffff'],
  ],
  build(assets) {
    const w = new World(96, 44, 96, [-48, -16, -48]);
    // organic outer island: broad low terraces from noise, flat along her route and around the little base
    const blobs = [[-9, 0, 6.5], [-2, 1.5, 6], [5, 1, 6.5], [12, 2, 7]]; // flat ground where she walks: a chain of round, noisy patches
    const keep = (x, z) => blobs.some(([bx, bz, r]) => Math.hypot(x - bx, z - bz) < r * (1 + .25 * noise2(x * .18, z * .18, 3)));
    isle(w, { r: 33, depth: 10, seed: 6, terr: 1, keep, rimStep: true });
    const top = (x, z) => { let y = 16; while (y > -16 && !w.get(x, y - 1, z)) y--; return y; };
    // End City tower (top-left of her first view), on a foundation so it never floats
    const tx = -24, tz = -16, ts = 6; let ty = -20; for (let x = tx; x < tx + ts; x++) for (let z = tz; z < tz + ts; z++) ty = Math.max(ty, top(x, z));
    for (let x = tx; x < tx + ts; x++) for (let z = tz; z < tz + ts; z++) w.fill(x, top(x, z), z, x, ty - 1, z, 'purpur');
    endTower(w, tx, ty, tz, { h: 15, s: ts }); endTower(w, tx + 1, ty + 19, tz + 1, { h: 5, s: 4, cap: false });
    // small water pool, a pale cube and a little wooden hut next to her route
    w.fill(6, -1, 2, 8, -1, 4, 'water');
    w.set(11, 0, -2, 'quartz');
    w.fill(13, 0, 3, 16, 2, 6, 'planks'); w.fill(14, 0, 4, 15, 1, 5, 0); w.fill(14, 0, 3, 14, 1, 3, 0);
    for (const [x, z] of [[13, 3], [16, 3], [13, 6], [16, 6]]) w.fill(x, 0, z, x, 2, z, 'log');
    let sd = 40;
    for (const [x, z, h] of [[-12, -10, 5], [-6, -14, 6], [-16, 8, 4], [-3, 11, 5], [4, -12, 4], [19, -12, 6], [22, 12, 5], [-26, 2, 6], [-9, 17, 4], [9, 15, 5], [26, -3, 4], [-20, -4, 5], [0, -20, 5], [14, -20, 4]]) chorus(w, x, top(x, z), z, h, sd++);
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0a0610');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#d8c8f0', '#2a2030', 1.25));
    const dl = new THREE.DirectionalLight('#fff4e6', .45); dl.position.set(-5, 12, 7); scene.add(dl);

    const p = player(assets, 'nia'); scene.add(p);
    const offTot = hold(p, M.totem(), { rx: -1.2, left: true }); offTot.scale.setScalar(.8);
    const mainTot = hold(p, M.totem(), { rx: -1.2 }); mainTot.scale.setScalar(.8);
    const apple = hold(p, goldenApple(), { rx: -1.2 });
    const pearlH = hold(p, pearlItem(), { rx: -1.2 });
    const bw = hold(p, M.bow(), { rx: -1.5 });
    const pearl = new THREE.Mesh(new THREE.BoxGeometry(.22, .22, .22), new THREE.MeshBasicMaterial({ color: '#2f9a82' })); scene.add(pearl);

    // endermen, all glowing: walking at different paces, some idle, one carrying a block, heads turning
    const spots = [[-10, -4, 2.5, 1.5, .4], [-6, 6, 2, 2, .5], [-14, 2, 1.5, 2.5, .35], [-2, -7, 3, 1, .45], [3, 8, 2.5, 1.5, .55], [8, -8, 2, 2, .4], [-18, -9, 2, 1.5, .5], [12, 10, 1.5, 1.2, .45], [-8, 12, 2.5, 1.2, .3], [18, -5, 1.5, 2, .5], [0, 14, 2, 1.5, .4], [-22, 8, 1.8, 1.8, .45], [6, -15, 2, 1.2, .35], [20, 6, 1.2, 1.5, .5]];
    const enders = spots.map(([cx, cz, rx, rz, sp], i) => {
      const idle = i % 4 === 3, carry = i === 4 || i === 9;
      const e = ender({ glow: true, carry: carry ? true : null }); e.scale.multiplyScalar(.96 + (i * 37 % 9) / 100);
      scene.add(e);
      return { e, idle, carry, f: idle ? (() => { const x = cx, z = cz; return () => [x, z]; })() : safeWander(w, cx, cz, rx, rz, sp, i * 1.9), yaw: i * 2.3 };
    });
    const passer = ender({ glow: true }); scene.add(passer); // walks right past the camera after the totem
    const ghast = M.ghast(); ghast.scale.multiplyScalar(PX * 1.7); scene.add(ghast);
    const GH = V(17, 13, -11), GF = V(15, 9.5, -8); // drifts lower before it fires
    const cloud = M.puffs(16, '#dfefff'); scene.add(cloud);
    const pop = totemPop(scene);
    const ball = M.fireball(9); ball.scale.multiplyScalar(PX); scene.add(ball);
    const flame = flameTrail(16); scene.add(flame);
    const boom = M.puffs(28); scene.add(boom); const flash = M.burst(); scene.add(flash);
    const fires = [[.6, .5], [-.5, .8], [.3, -.7]].map(([x, z]) => { const f = fireBits(4, .45); f.userData.o = [x, z]; scene.add(f); return f; });
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 220);

    // her route along z ≈ .5: walk, pause for the totem, then sprint past the pool, the cube and the hut
    const X = lt => lt < TT ? lerp(-9, -3.2, lt / TT) : lt < S3 ? -3.2 + (lt - TT) * .6 : lt < PEARL[1] ? lerp(-2.36, 0, clamp((lt - S3) / (PEARL[1] - S3))) : lerp(0, 9, ease.out(clamp((lt - PEARL[1]) / (BOW + .25 - PEARL[1]))));
    const Z = lt => lt < PEARL[1] ? .5 : .5 + Math.sin(clamp((lt - PEARL[1]) / 1) * Math.PI) * .25;
    const her = () => p.position.clone().add(V(0, 1.1, 0));
    return {
      scene, ink: { skyA: '#140a1e', skyB: '#3a2452', tint: '#f2ecff', lineW: 2.3 },
      cues: [{ t: TT, type: 'sfx', kind: 'totem' }, { t: PEARL[0] + .1, type: 'sfx', kind: 'pearl' }, { t: FIRE, type: 'sfx', kind: 'shoot' }],
      hearts: lt => ({ v: lt < TT ? 10 : lt < APPLE[1] ? 3 : lerp(3, 6.5, clamp((lt - APPLE[1]) / 1)), blink: lt > TT && lt < TT + .2 }),
      overlay(ctx, lt) { if (lt < 2.05) toast(ctx, '¡Desafío completado!', 'Sin piedad', clamp(lt / .2) * (1 - clamp((lt - 1.85) / .2))); },
      notes: [
        ...noteBlock(.25, 2.3, ['decenas de endermen brillantes'], 1100, 330, { to: () => enders[3].e.position.clone().add(V(0, 2.6, 0)), bend: 50, slow: SLOW }),
        ...noteBlock(2.25, 3.2, ['tótem con la vida llena'], 1240, 620, { slow: SLOW }),
        ...noteBlock(2.45, 3.7, ['un ghast pequeño arriba'], 1150, 380, { circle: () => ghast.position.clone(), r: 75, slow: SLOW }),
        ...noteBlock(3.75, 5.0, ['manzana, perla… tótem en mano'], 1120, 250, { to: her, bend: -40, slow: SLOW }),
        ...noteBlock(5.0, I, ['un ender ghast le dispara'], 560, 330, { to: () => ghast.position.clone().add(V(-.9, -.3, 0)), ax: 1080, ay: 345, bend: 30, slow: SLOW }),
      ],
      update(lt, T) {
        const px = X(lt), pz = Z(lt);
        p.position.set(px, groundFoot(w, px, pz), pz);
        face(p, px + 10, pz + (lt > PEARL[1] ? .3 : 0));
        const sprint = lt > PEARL[1] && lt < BOW + .2, walkA = lt < TT - .05;
        pose(p, { idle: T * 2, walk: lt * (sprint ? 15 : 9), swing: sprint ? .95 : walkA ? .55 : 0, armRaise: lt > APPLE[0] && lt < APPLE[1] ? 1.9 : lt > PEARL[0] && lt < PEARL[1] ? lerp(2.4, .6, clamp((lt - PEARL[0]) / .15)) : lt > BOW ? 1.4 : .4, headPitch: lt > APPLE[0] && lt < APPLE[1] ? .25 : 0 });
        if (lt > BOW) { p.userData.armL.rotation.x = -1.4; p.userData.armL.rotation.z = -.3; }
        offTot.visible = lt < TT; apple.visible = lt >= APPLE[0] && lt < APPLE[1]; pearlH.visible = lt >= PEARL[0] && lt < PEARL[0] + .12;
        mainTot.visible = lt >= PEARL[1] && lt < BOW; bw.visible = lt >= BOW && lt < I;
        // thrown pearl arcs away
        const pk = clamp((lt - PEARL[0] - .12) / .6); pearl.visible = lt > PEARL[0] + .12 && lt < PEARL[0] + .72;
        pearl.position.set(-.9 + pk * 9, 1.5 + pk * 3 - pk * pk * 4, .5 + pk * 1.5);
        // endermen
        enders.forEach((o, i) => {
          walkOn(o.e, w, o.f, T * .75 + i * 1.3, { headYaw: Math.sin(T * .6 + i) * .45 });
          if (o.idle) o.e.rotation.y = o.yaw + Math.sin(T * .3 + i) * .4;
          if (o.carry) carryPose(o.e);
        });
        const pk2 = clamp((lt - 2.5) / 1.0); const pxs = lerp(-3.8, 1.2, pk2), pzs = lerp(3.4, 1.9, pk2);
        passer.position.set(pxs, groundFoot(w, pxs, pzs), pzs); passer.rotation.y = Math.atan2(5, -1.5); pose(passer, { walk: T * 5.5, swing: .3, idle: T });
        // ghast: small, upper right; opens its red mouth and fires at her
        ghast.position.lerpVectors(GH, GF, ease.inOut(clamp((lt - 4.5) / .6))).add(V(Math.sin(T * .7) * .4, Math.sin(T * 1.1) * .25, 0));
        face(ghast, px, pz); ghast.userData.tent.forEach((t, k) => t.rotation.x = Math.sin(T * 2.5 + k) * .25);
        ghast.userData.faceOpen(lt > FIRE - .12 && lt < FIRE + .3);
        const target = V(X(I), 1.1, Z(I));
        const fk = clamp((lt - FIRE) / (I - FIRE));
        ball.visible = lt > FIRE && lt < I; ball.rotation.set(T * 3, T * 4, 0);
        ball.position.lerpVectors(ghast.position, target, fk);
        animTrail(flame, k => V().lerpVectors(ghast.position, target, Math.max(0, fk - k * .2)), ball.visible ? 1.6 : 0, T);
        // pale cloud, explosion at her
        cloud.position.set(-4.5, .4, -2.2); M.animPuffs(cloud, lt - TC, { radius: 1.1, size: .38 });
        boom.position.set(px, 1, pz); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - I, { radius: 2.4, size: .6 }); M.animBurst(flash, lt - I, 3.2);
        fires.forEach(f => { f.visible = lt > I; const fx = px + f.userData.o[0], fz = pz + f.userData.o[1]; f.position.set(fx, groundFoot(w, fx, fz), fz); f.userData.anim(T); });
        p.visible = lt < I && !(lt > S2 && lt < S3);
        let c;
        if (lt < S2) c = cam(camera, [px - 4.2, 2.6, 4.6], [px + 2.5, 1.9, -3.2], 56); // among glowing endermen, the End City tower behind
        else if (lt < S3) { c = cam(camera, [px, 1.62, pz], [px + 6, 3.6, pz - 7], 64); } // her view: totem pops; the small white ghast upper right
        else if (lt < BOW) c = cam(camera, [px - 1.5, 2.3, pz + 5.2], [px + 2.2, .9, pz - .5], 55); // apple, pearl, sprinting past pool / cube / hut
        else c = cam(camera, [px + 1.5, 2.8, pz + 7.5], [px + 2, 3, pz - 4.5], 62); // side view: the ghast (upper right) fires at her
        if (lt >= I) { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(px - 4, px - 8, k), lerp(2.5, 7, k), lerp(pz - 3, pz - 7, k)], [px, 0, pz], 55); }
        pop(camera, lt - TT);
        return c;
      },
    };
  },
};
