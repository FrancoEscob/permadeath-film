// #9 Ander (4andeR) — día 18, 12/04/2020 22:46. Verified: wiki (Araña, tótem consumido) + clip
// (GersoonSG 5:35–5:48): night, a grassy hill above a river, a camp with fires, phantoms overhead;
// he shoots them with an enchanted bow; a white-outlined spider comes in from the left, one hit takes
// him from 10 to ~4.5 hearts, the totem pops, and ~1.4 s later "ha sido víctima de Araña".
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, fireBits, glowOutline, totemPop, armor, groundAt, hurt, PX } from './common.js';
import { noise2 } from '../engine.js';

export default {
  n: 9, player: 'ander', name: 'Ander', ign: '4andeR', day: 18, date: '12/04/2020 · 22:46',
  sfx: 'hit', impact: 3.75, dur: 5.3,
  slow: [{ t: 2.0, d: 1.75, f: .38 }],
  chat: [
    ['[MIEMBRO] 4andeR ha alcanzado el objetivo [Post mortem]', '#55ff55'],
    ['Este es el comienzo del sufrimiento eterno de 4andeR. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['G2Ander, No es cortés irse antes de tiempo', '#aaaaaa'],
    ['[MIEMBRO] 4andeR ha sido víctima de Araña', '#ffffff'],
  ],
  build(assets) {
    const w = new World(60, 24, 60, [-30, -8, -30]);
    for (let x = -30; x < 30; x++) for (let z = -30; z < 30; z++) {
      const h = Math.floor(3 - z * .18 + noise2(x * .1, z * .1, 2) * 1.5);
      if (z > 8) { w.fill(x, -8, z, x, -3, z, 'sand'); w.fill(x, -2, z, x, -2, z, 'water'); continue; }
      w.fill(x, -8, z, x, h - 1, z, 'dirt'); w.set(x, h, z, z > 5 ? 'sand' : 'grass');
    }
    const top = (x, z) => groundAt(w, x, z, 15);
    // the tall dark (obsidian-looking) structure at the camp
    { const b = Math.min(top(7.5, 5.5), top(8.5, 5.5)); w.fill(7, b - 1, 5, 8, b + 5, 5, 'obsidian'); }
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#070b1a');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#6a78a8', '#101018', .85));
    const moon = new THREE.DirectionalLight('#aab8ff', .7); moon.position.set(-8, 20, -6); scene.add(moon);
    const campL = new THREE.PointLight('#ff9a40', 20, 12, 1.2); campL.position.set(5, top(5, 6.5) + 1.5, 6.5); scene.add(campL);
    const fires = [[5.5, 6.3], [3.6, 6.9], [6.3, 7.6]].map(([x, z]) => { const f = fireBits(6, .45); f.position.set(x, top(x, z), z); scene.add(f); return f; });
    const stars = new THREE.Group(); for (let i = 0; i < 140; i++) { const s = new THREE.Mesh(new THREE.BoxGeometry(.25, .25, .25), new THREE.MeshBasicMaterial({ color: '#ffffff' })); const a = i * 2.39, e = .12 + (i % 7) / 9; s.position.set(Math.cos(a) * 80 * Math.cos(e), 16 + Math.sin(e) * 60, Math.sin(a) * 80 * Math.cos(e)); stars.add(s); } scene.add(stars);

    const A0 = [-1, 1.5];
    const gy = top(...A0);
    const p = player(assets, 'ander'); p.position.set(A0[0], gy, A0[1]); scene.add(p);
    hold(p, M.bow(), { rx: -1.5 });
    const off = hold(p, M.totem(), { rx: -1.2, left: true }); off.scale.setScalar(.8);
    // teammate in diamond armour at the camp (his nametag is not legible in the clip)
    const mate = player(assets, 'nobody'); armor(mate, 'diamond'); mate.position.set(4.2, top(4.2, 7.3), 7.3); face(mate, A0[0], A0[1]); scene.add(mate);
    hold(mate, M.sword('diamond'), { rx: -1.3 });
    const phantom = M.phantom(); phantom.scale.multiplyScalar(PX * 1.9); scene.add(phantom);
    const phL = new THREE.PointLight('#c8d4ff', 14, 7, 1.2); scene.add(phL);
    const sp = M.spider(); sp.scale.multiplyScalar(PX); glowOutline(sp); scene.add(sp);
    const bat = new THREE.Group(); const bb = new THREE.Mesh(new THREE.BoxGeometry(.25, .2, .2), new THREE.MeshLambertMaterial({ color: '#3a2a22' })); bat.add(bb);
    for (const s of [-1, 1]) { const wg = new THREE.Mesh(new THREE.BoxGeometry(.3, .03, .18), bb.material); wg.position.x = s * .25; wg.name = 'w'; bat.add(wg); }
    glowOutline(bat); scene.add(bat);
    const arrows = [0, 1].map(() => { const a = M.arrow(); a.scale.setScalar(PX * 1.3); scene.add(a); return a; });
    const pop = totemPop(scene);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 200);
    const I = 3.75, TURN = 1.3, HIT = 2.3, TOT = 2.85;
    const deg = d => d * Math.PI / 180;
    const S0 = [4.5, -5], STOP = [A0[0] + Math.sin(deg(108)) * 1.35, A0[1] + Math.cos(deg(108)) * 1.35];
    const phantomAt = t => new THREE.Vector3(1.5 + (t - .9) * 5 * .42, gy + 6.3 + Math.sin(t * 1.7) * .4, 7 + (t - .9) * 5 * .91);
    const V = (o, y) => () => o.position.clone().add(new THREE.Vector3(0, y, 0));
    return {
      scene, ink: { skyA: '#0d1226', skyB: '#2a3456', tint: '#d8def0', lineW: 2.3 },
      cues: [{ t: .45, type: 'sfx', kind: 'bow' }, { t: .95, type: 'sfx', kind: 'bow' }, { t: HIT, type: 'sfx', kind: 'hurt', gain: .5 }, { t: TOT, type: 'sfx', kind: 'totem' }],
      hearts: lt => ({ v: lt < HIT ? 10 : lt < 2.62 ? 4.5 : lt < TOT ? 3.5 : 1, blink: lt > HIT && lt < TOT + .3 }),
      notes: [
        { t0: .05, t1: 1.28, text: 'de noche, dispara a los fantasmas', x: 1000, y: 220, size: 48, to: V(phantom, 0), bend: -40 },
        { t0: 1.3, t1: 2.3, text: 'araña con contorno blanco', x: 1130, y: 250, size: 50, to: V(sp, .7), bend: 50 },
        { t0: 2.32, t1: 2.85, text: 'un golpe: de 10 a 4,5 corazones', x: 1060, y: 230, size: 48 },
        { t0: 2.87, t1: 3.75, text: 'salta el tótem...\ny muere 1,4 s después', x: 1260, y: 640, size: 48 },
      ],
      update(lt, T) {
        // facing: up at the phantoms -> turns left -> the hit jerks the view toward the camp
        let th;
        if (lt < TURN) th = deg(25);
        else if (lt < HIT) th = lerp(deg(25), deg(105), ease.inOut(clamp((lt - TURN) / .45)));
        else th = lerp(deg(105), deg(52), ease.out(clamp((lt - HIT) / .12)));
        p.rotation.y = th;
        const drawn = lt < TURN - .1;
        pose(p, { idle: T * 2, armRaise: drawn ? 1.9 : lt < HIT ? 1.3 : .5, headPitch: drawn ? -.75 : .15 });
        p.userData.armL.rotation.x = drawn ? -1.6 : lt < HIT ? -1.1 : 0;
        hurt(p, lt > HIT && lt < HIT + .25 ? 1 : 0);
        off.visible = lt < TOT;
        const ph = phantomAt(lt); phantom.position.copy(ph); phantom.lookAt(phantomAt(lt + .1)); phL.position.copy(ph).add(new THREE.Vector3(0, -2.5, 0));
        phantom.userData.wL.rotation.z = Math.sin(T * 8) * .5; phantom.userData.wR.rotation.z = -Math.sin(T * 8) * .5;
        arrows.forEach((a, i) => {
          const t0 = .45 + i * .5, k = (lt - t0) / .45; a.visible = k > 0 && k < 1;
          const from = new THREE.Vector3(A0[0], gy + 1.5, A0[1]), to = phantomAt(t0 + .45).add(new THREE.Vector3(i ? 0 : -1.5, i ? 0 : 1, 0));
          a.position.lerpVectors(from, to, clamp(k)); a.lookAt(to);
        });
        // the outlined spider comes over the grass from his left, right up to him
        const sk = ease.inOut(clamp((lt - .9) / (HIT - .15 - .9)));
        let sx = lerp(S0[0], STOP[0], sk), sz = lerp(S0[1], STOP[1], sk);
        if (lt > HIT) { const k = clamp((lt - HIT) / 1.2); sx += Math.sin(k * 5) * .35; sz += k * .6; }
        sp.position.set(sx, top(sx, sz), sz);
        face(sp, A0[0], A0[1]);
        sp.userData.legs.forEach((l, i) => l.rotation.x = Math.sin(T * 22 + i) * .28);
        const bt = T * 1.3; bat.position.set(A0[0] - 2 + Math.sin(bt * 2) * 2.2, gy + 2.6 + Math.sin(bt * 5) * .4, A0[1] - 1.5 + Math.cos(bt * 1.7) * 1.8);
        bat.children.forEach(c => { if (c.name === 'w') c.rotation.z = Math.sin(T * 30) * .7 * Math.sign(c.position.x); });
        fires.forEach(f => f.userData.anim(T));
        campL.intensity = 20 + Math.sin(T * 11) * 3;
        const dead = lt >= I;
        p.visible = !dead;
        let c;
        const jolt = lt > HIT && lt < HIT + .25 ? (1 - (lt - HIT) / .25) * .25 : 0;
        if (lt < TURN) { const k = lt / TURN; c = cam(camera, [lerp(-7.9, -7.4, k), gy + 2.2, lerp(8.0, 7.6, k)], [lerp(.2, .5, k), gy + 3.4, lerp(4.2, 4.4, k)], 55); } // low angle: up on the hill he shoots at the phantoms
        else if (lt < HIT) { const k = (lt - TURN) / (HIT - TURN); c = cam(camera, [lerp(2.0, 1.6, k), gy + 1.9, lerp(4.9, 4.5, k)], [lerp(1.6, .2, k), gy + .7, lerp(-2.2, .2, k)], 54); } // the outlined spider crosses the grass toward him
        else if (lt < TOT) c = cam(camera, [.9 + Math.sin(lt * 80) * jolt, gy + 1.8 + Math.cos(lt * 70) * jolt, 3.9], [-.3, gy + .9, 1.1], 52); // one hit: 10 -> 4.5 hearts
        else if (lt < I) { const k = (lt - TOT) / (I - TOT); c = cam(camera, [lerp(-4.6, -4.3, k), gy + 1.9, lerp(5.6, 5.4, k)], [1.4, gy - .4, 3.9], 58); } // totem pops; the camp and his teammate behind it
        else { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(2, 4, k), gy + lerp(2.5, 6, k), lerp(4.5, 7.5, k)], [A0[0], gy, A0[1]], 55); }
        pop(camera, lt < I ? lt - TOT : -1);
        return c;
      },
    };
  },
};
