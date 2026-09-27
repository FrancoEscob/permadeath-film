// #28 Hardyluski — día 44, 08/05/2020 14:10. Verified: wiki (Gato Supernova, tótem no activado 3%) + clip
// (GersoonSG 18:15–18:27 + Shem K1Hh8JZSTIE): night, rain, flying high over desert, plains and a river with a
// trident (riptide) and then firework rockets, climbing to Y≈250; 8/8 hearts, totem in the offhand the whole
// time; hard cut -> "ha explotado por Gato", "consumido dos tótem (Probabilidad: 97 >= 97)".
// The Gato Supernova is never seen — so it isn't drawn.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, PX } from './common.js';
import { noise2 } from '../engine.js';
import { rain } from '../fx2d.js';
import { pixBox } from '../mobs.js';

export default {
  n: 28, player: 'hardy', name: 'Hardyluski', ign: 'Hardyluski', day: 44, date: '08/05/2020 · 14:10',
  sfx: 'explosion', impact: 3.0, dur: 4.8, storm: true,
  slow: [{ t: .15, d: .6, f: .4 }, { t: 2.5, d: .5, f: .35 }],
  note: 'EL GATO SUPERNOVA NUNCA SE VIO',
  chat: [
    ['Hardyluski ha consumido dos tótem. (Probabilidad: 97 >= 97)', '#ffff55'],
    ['Este es el comienzo del sufrimiento eterno de Hardyluski. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['Hardyluski. Más bien EZylusky', '#aaaaaa'],
    ['[MIEMBRO] Hardyluski ha explotado por Gato', '#ffffff'],
  ],
  build(assets) {
    const w = new World(128, 12, 128, [-64, -8, -64]);
    for (let x = -64; x < 64; x++) for (let z = -64; z < 64; z++) {
      const river = Math.abs(x * .6 - Math.sin(z * .07) * 14) < 3;
      const desert = noise2(x * .03, z * .03, 3) > 0;
      const h = Math.floor(noise2(x * .06, z * .06, 1) * 2);
      if (river) { w.fill(x, -8, z, x, -2, z, 'sand'); w.set(x, -1, z, 'water'); continue; }
      w.fill(x, -8, z, x, h, z, desert ? 'sand' : 'dirt'); if (!desert) w.set(x, h, z, 'grass');
    }
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#05070f');
    const ground = w.build(); ground.position.set(20, -34, 0); scene.add(ground); // he's very high up
    const far = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), new THREE.MeshLambertMaterial({ color: '#4a6a38' })); far.rotation.x = -Math.PI / 2; far.position.set(20, -34.6, 0); scene.add(far);
    scene.fog = new THREE.Fog('#10162a', 40, 140);
    scene.add(new THREE.HemisphereLight('#8a98c8', '#202030', 1.4));
    const moon = new THREE.DirectionalLight('#aab8ff', .6); moon.position.set(-8, 20, -6); scene.add(moon);
    const p = player(assets, 'hardy'); scene.add(p);
    const tri = hold(p, pixBox(1, 22, 1, (f, i, j) => j < 5 ? [120, 220, 230] : [60, 150, 170]), { rx: -1.4 });
    const rocket = hold(p, pixBox(3, 9, 3, (f, i, j) => j < 3 ? [200, 40, 40] : [230, 230, 230]), { rx: -1.2 }); rocket.visible = false;
    const ely = M.elytra(); ely.position.set(0, 23, -2.5); p.add(ely);
    hold(p, M.totem(), { rx: -1.2, left: true }).scale.setScalar(.8);
    const swirl = new THREE.Group(); for (let i = 0; i < 28; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(.1, .1, .55), new THREE.MeshBasicMaterial({ color: i % 2 ? '#8fe8ff' : '#dffcff' })); m.userData.a = i / 28 * Math.PI * 4; swirl.add(m); } scene.add(swirl);
    const sparks = M.particlesCube('#ffcc66', 12, .2, .08); scene.add(sparks);
    const boom = M.puffs(30); scene.add(boom); const flash = M.burst(); scene.add(flash);
    const camera = new THREE.PerspectiveCamera(58, 16 / 9, .05, 400);
    const I = 3.0;
    return {
      scene, ink: { skyA: '#0a0e1c', skyB: '#26304c', tint: '#d0d8ee', lineW: 2.2 },
      cues: [{ t: .1, type: 'sfx', kind: 'whoosh', dur: .8, gain: .35 }, { t: 1.5, type: 'sfx', kind: 'whoosh', dur: 1.2, gain: .25 }, { t: 0, type: 'rain', dur: 3, gain: .1 }],
      hearts: lt => ({ v: 8, n: 8 }),
      overlay(ctx, lt, env) { if (lt < I) rain(ctx, env.t, { alpha: .4, n: 600, seed: 28 }); },
      notes: [
        { t0: .1, t1: 1.3, text: 'de noche, bajo la lluvia:\nse impulsa con el tridente', x: 1180, y: 230, size: 50, to: () => p.position.clone().add(new THREE.Vector3(0, 1, 0)) },
        { t0: 1.45, t1: 2.9, text: 'después, élitra y cohetes:\ncada vez más alto', x: 1180, y: 230, size: 50, to: () => p.position.clone() },
        { t0: 2.2, t1: 3.0, text: 'vida completa y tótem en la mano', x: 1060, y: 780, size: 46, to: [1000, 890], ax: 1100, ay: 800 },
        { t0: 3.3, t1: 5.6, text: 'el tótem falló: "97 >= 97" (3%)', x: 1200, y: 200, size: 48 },
      ],
      update(lt, T) {
        // phase 1: two riptide launches (spin around the travel axis), phase 2: elytra + firework climb
        const launches = [0, .7];
        let pos, dir, spin = 0, riptide = false;
        if (lt < 1.4) {
          const i = lt < .7 ? 0 : 1, lk = (lt - launches[i]) / .7;
          const start = i === 0 ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(7, 9, 0);
          dir = new THREE.Vector3(1, 1.3, i ? .15 : -.1).normalize();
          const d = 11.5 * ease.out(Math.min(1, lk * 1.4));
          pos = start.clone().addScaledVector(dir, d);
          riptide = lk < .75; spin = lk * Math.PI * 8;
        } else {
          const k = clamp((lt - 1.4) / (I - 1.4));
          dir = new THREE.Vector3(1, .75, .05).normalize();
          pos = new THREE.Vector3(7 + 7.6 * 1 + k * 16, 18 + k * 13, 1.2 + Math.sin(k * 3) * 1.2);
        }
        p.position.copy(pos);
        const qa = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        if (riptide) { p.quaternion.copy(new THREE.Quaternion().setFromAxisAngle(dir, spin).multiply(qa)); }
        else {
          // prone elytra flight: body along the direction, belly down
          const flat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          p.quaternion.copy(flat);
        }
        pose(p, { idle: T * 2, armRaise: riptide ? 3.0 : .2 });
        if (!riptide && lt >= 1.4) { p.userData.armR.rotation.x = -2.6; p.userData.armL.rotation.x = 0; }
        tri.visible = lt < 1.4; rocket.visible = lt >= 1.4 && lt < I;
        ely.visible = lt >= 1.4; ely.userData.L.rotation.z = -.95; ely.userData.R.rotation.z = .95;
        swirl.visible = riptide; swirl.position.copy(pos).addScaledVector(dir, .9);
        swirl.quaternion.copy(qa);
        swirl.children.forEach((m, i) => { const a = m.userData.a + T * 14; const r = .9 + (i % 2) * .25; m.position.set(Math.cos(a) * r, (i % 4) * .35 - .6, Math.sin(a) * r); m.rotation.set(0, -a, 0); });
        sparks.visible = lt > 1.4 && lt < I; sparks.position.copy(pos).addScaledVector(dir, -1.2); M.animParticles(sparks, T * 4, { rise: -.4, spread: .3 });
        boom.position.copy(pos).addScaledVector(dir, 1); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - I, { radius: 3.5, size: .8 }); M.animBurst(flash, lt - I, 5);
        p.visible = lt < I;
        if (lt < I) return cam(camera, [pos.x - 3.8, pos.y + 1.9, pos.z + 4.4], [pos.x + 1.2, pos.y - .4, pos.z], 58);
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [pos.x - lerp(3.5, 10, k), pos.y + lerp(1.2, 5, k), pos.z + lerp(7.5, 12, k)], [pos.x, pos.y, pos.z], 55);
      },
    };
  },
};
