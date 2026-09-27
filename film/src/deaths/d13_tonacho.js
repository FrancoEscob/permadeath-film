// #13 Tonacho — día 26, 20/04/2020 14:30. Verified: wiki (Slime, "GigaSlime", tótem consumido) + clip
// (GersoonSG 7:32–7:50): swamp at dawn (pink horizon, moon), sprinting along a stream; taking damage
// (creepers around, "combo flecha" per his words); a giant slime looms, hearts crash to ½, the totem pops,
// two giant slimes side by side with a creeper at the lower left -> "was slain by Slime".
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, totemPop, groundAt, hurt, creeperFuse, walkCreeper, hop, PX } from './common.js';
import { noise2 } from '../engine.js';

export default {
  n: 13, player: 'tonacho', name: 'Tonacho', ign: 'tonacho', day: 26, date: '20/04/2020 · 14:30',
  sfx: 'hit', impact: 3.55, dur: 5.1,
  slow: [{ t: 2.25, d: .6, f: .35 }, { t: 3.1, d: .45, f: .35 }],
  chat: [
    ['[MIEMBRO] tonacho has reached the goal [Postmortal]', '#55ff55'],
    ['tonacho, Le han puesto mirando a Cuenca', '#aaaaaa'],
    ['[MIEMBRO] tonacho was slain by Slime', '#ffffff'],
    ['<[MIEMBRO] Kakytron> LOL', '#ffffff'],
  ],
  build(assets) {
    const streamZ = x => Math.sin(x * .12) * 3;
    const w = new World(70, 22, 50, [-35, -8, -25]);
    for (let x = -35; x < 35; x++) for (let z = -25; z < 25; z++) {
      const stream = Math.abs(z + .5 - streamZ(x + .5)) < 1.6;
      const h = Math.floor(noise2(x * .09, z * .09, 8) * 1.5);
      w.fill(x, -8, z, x, stream ? -2 : h - 1, z, 'dirt');
      if (stream) w.set(x, -1, z, 'water'); else w.set(x, h, z, 'grass');
    }
    for (let i = 0; i < 14; i++) {
      const tx = -30 + (i * 17) % 60, tz = (i % 2 ? 1 : -1) * (8 + (i * 7) % 14); if (tz < 0 && tx > -22 && tx < 14) continue; let gy = 5; while (gy > -6 && !w.get(tx, gy, tz)) gy--;
      w.fill(tx, gy + 1, tz, tx, gy + 5, tz, 'log'); w.fill(tx - 2, gy + 5, tz - 2, tx + 2, gy + 6, tz + 2, 'leaves');
      for (let v = -2; v <= 2; v += 2) w.fill(tx + v, gy + 3, tz - 2, tx + v, gy + 4, tz - 2, 'leaves'); // drooping vines
    }
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#2a3050');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#c8a8c8', '#20202a', 1.1));
    const sun = new THREE.DirectionalLight('#ffb0a0', .8); sun.position.set(30, 6, 0); scene.add(sun);
    const moon = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 1), new THREE.MeshBasicMaterial({ color: '#f0f0e0' })); moon.position.set(-30, 26, 60); moon.lookAt(0, 0, 0); scene.add(moon);
    const g = (x, z) => groundAt(w, x, z, 12);
    const bank = x => streamZ(x) - 2.6; // he runs along the near bank, the stream on his right
    const p = player(assets, 'tonacho'); scene.add(p);
    hold(p, M.sword('diamond'), { rx: -1.3 });
    const off = hold(p, M.totem(), { rx: -1.2, left: true }); off.scale.setScalar(.8);
    const slimeA = M.slime({ size: 7 }); slimeA.scale.multiplyScalar(PX); scene.add(slimeA);
    const slimeB = M.slime({ size: 7 }); slimeB.scale.multiplyScalar(PX); scene.add(slimeB);
    const crHill = M.creeper(); crHill.scale.multiplyScalar(PX); scene.add(crHill);
    const cr = M.creeper(); cr.scale.multiplyScalar(PX); scene.add(cr);
    const boom = M.puffs(22); scene.add(boom); const flash = M.burst(); scene.add(flash);
    const pop = totemPop(scene);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 200);
    const I = 3.55, STOPX = 2.2, TOT = 2.3, TWO = 2.8, BOOM = 3.2;
    const hp = [[0, 10], [.5, 8.5], [.8, 7], [1.1, 5.5], [1.5, 4], [1.9, 1.5], [2.1, .5], [2.3, 1], [BOOM, .5]];
    const hits = [.5, .8, 1.1, 1.5, 1.9, 2.1, 3.5];
    const A = [6.4, bank(6.4) - .6], B = [6.9, bank(6.9) - 5.2];
    const crHillAt = [-1.5, 7.2], crStart = [-1.6, bank(-1.6) + .9], crEnd = [3.6, bank(3.6) - 2.9];
    const V = (o, y) => () => o.position.clone().add(new THREE.Vector3(0, y, 0));
    // slimes turn brownish when hit (red damage flash over green)
    const tint = (o, k) => o.traverse(m => { if (m.isMesh) (Array.isArray(m.material) ? m.material : [m.material]).forEach(mt => { if (mt.emissive) { mt.emissive.set('#7a4212'); mt.emissiveIntensity = k; } }); });
    const C = (x, y, z) => [x, Math.max(p.position.y, g(x, z)) + y, z];
    const setSlime = (s, x, z, t, lean) => {
      const j = hop(t, .9, .55);
      s.position.set(x, g(x, z) + j, z);
      const sq = 1 + (j < .05 ? .12 : -.06);
      s.scale.set(PX * sq, PX / sq, PX * sq);
      face(s, p.position.x, p.position.z);
    };
    return {
      scene, ink: { skyA: '#1f2440', skyB: '#e0a0a8', tint: '#f2eaf2', lineW: 2.3 },
      cues: [{ t: .5, type: 'sfx', kind: 'hurt', gain: .25 }, { t: .8, type: 'sfx', kind: 'hurt', gain: .25 }, { t: 1.05, type: 'sfx', kind: 'hiss', dur: .8, gain: .12 }, { t: 1.9, type: 'sfx', kind: 'hurt', gain: .45 }, { t: TOT, type: 'sfx', kind: 'totem' }, { t: BOOM, type: 'sfx', kind: 'explosion', gain: .3 }],
      hearts: lt => { let v = 10; for (const [t, h] of hp) if (lt >= t) v = h; return { v, blink: Math.floor(lt * 8) % 2 === 0 && lt > .5 && lt < 2.2 }; },
      notes: [
        { t0: .05, t1: 1.25, text: 'pantano, al amanecer', x: 1180, y: 230, size: 52 },
        { t0: 1.3, t1: 2.25, text: 'un slime gigante', x: 1250, y: 250, size: 52, to: V(slimeA, 3.2), bend: -40 },
        { t0: 2.27, t1: 2.85, text: 'salta el tótem', x: 1300, y: 250, size: 54 },
        { t0: 2.87, t1: 3.55, text: 'dos slimes gigantes\ny un creeper', x: 1230, y: 230, size: 50, to: V(cr, 1.4), bend: 60 },
        { t0: 3.6, t1: 6.0, text: 'medio corazón... y el slime', x: 1120, y: 190, size: 46 },
      ],
      update(lt, T) {
        // he sprints along the bank, then stops and fights
        const run = clamp(lt / 1.9);
        const px = lerp(-12, STOPX, ease.out(run) * .35 + run * .65);
        const pz = bank(px);
        p.position.set(px, g(px, pz), pz);
        const fighting = lt > 1.9;
        face(p, fighting ? A[0] : px + 4, fighting ? A[1] : bank(px + 4));
        const sw = t0 => { const k = (lt - t0) / .2; return k > 0 && k < 1 ? Math.sin(k * Math.PI) : 0; };
        const slash = Math.max(sw(1.05), sw(1.6), sw(1.95), sw(2.6), sw(3.0));
        pose(p, { idle: T * 2, walk: T * 16, swing: fighting ? 0 : .9, armRaise: .5 + slash * 1.5 });
        hurt(p, hits.some(h => lt > h && lt < h + .15) ? 1 : 0);
        off.visible = lt < TOT;
        // giant slimes on the ground, hopping at him; they flash brownish when he hits them
        setSlime(slimeA, lerp(A[0] + 1.5, A[0], clamp((lt - 1.2) / 1.5)), A[1], lt + .3);
        tint(slimeA, (sw(1.6) + sw(1.95) + sw(2.6)) > .5 ? .7 : 0);
        slimeA.visible = lt > 1.0;
        setSlime(slimeB, B[0], B[1], lt + .75); slimeB.visible = lt > TWO - .3;
        tint(slimeB, sw(3.0) > .5 ? .7 : 0);
        // a creeper up on the far hill; another on his path that he hits, and that follows him to the slimes
        crHill.position.set(crHillAt[0], g(...crHillAt), crHillAt[1]); face(crHill, px, pz);
        const W1 = [3.2, bank(3.2) + 1.2], k1 = clamp((lt - 1.3) / .9), k2 = clamp((lt - 2.3) / .5), ck = k1 * (1 - k2) + k2;
        const cx = lt < 2.3 ? lerp(crStart[0], W1[0], k1) : lerp(W1[0], crEnd[0], k2), cz = lt < 2.3 ? lerp(crStart[1], W1[1], k1) : lerp(W1[1], crEnd[1], k2);
        cr.position.set(cx, g(cx, cz), cz); face(cr, px, pz);
        walkCreeper(cr, T, ck > 0 && ck < 1);
        hurt(cr, sw(1.05) > .4 ? .9 : 0);
        if (lt > 2.6) creeperFuse(cr, lt, 2.6, BOOM);
        cr.visible = lt < BOOM;
        boom.position.set(crEnd[0], g(...crEnd) + .9, crEnd[1]); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - BOOM, { radius: 2, size: .5 }); M.animBurst(flash, lt - BOOM, 2.2);
        p.visible = lt < I;
        const gy = p.position.y;
        let c;
        if (lt < 1.3) c = cam(camera, C(px - 3.4, 2.3, pz - 5.2), [px + 2.5, gy + 1.2, pz + 3], 56); // dawn run along the stream; a creeper up on the far hill
        else if (lt < TOT) { const k = (lt - 1.3) / (TOT - 1.3); c = cam(camera, C(lerp(px - 3.4, px - 3.0, k), 1.3, pz - 2.6), [A[0], g(...A) + lerp(2.4, 2.0, k), A[1] - .3], 58); } // the giant slime looms
        else if (lt < TWO) c = cam(camera, C(px - 1.9, 1.9, pz - 1.1), [A[0], g(...A) + 1.8, A[1]], 60); // totem pops, the slime keeps pressing in
        else if (lt < I) { const k = (lt - TWO) / (I - TWO); c = cam(camera, C(lerp(px - 4.2, px - 3.8, k), 2.4, lerp(pz + 1.4, pz + 1.1, k)), [lerp(5.2, 5.4, k), gy + 1.4, pz - 2.6], 58); } // two giant slimes side by side, a creeper at the lower left
        else { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(px - 4, px - 7, k), gy + lerp(2.5, 6, k), lerp(pz + 1.4, pz + 4, k)], [px + 2, gy + .5, pz - 1.5], 55); }
        pop(camera, lt < I ? lt - TOT : -1);
        return c;
      },
    };
  },
};
