// #16 OutConsumer — día 30, 24/04/2020 13:38. NO FOOTAGE. Sources: wiki (Pollo, tótem consumido; since day
// 20 all peaceful mobs are hostile) + his own spoken account (GersoonSG 8:59–9:58 and sNUN7IudvV4 subs):
// armour off (to gain XP for mending), feeding the ~10 chickens from above, he fell into the pen; they
// attacked; instead of fighting he fled upward opening a hole; the totem popped, no time for another.
// Layout, place and time of day are unknown -> drawn as a pencil sketch, kept abstract.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, chickenFlock, totemPop, hop, hurt, PX } from './common.js';

export default {
  n: 16, player: 'outconsumer', name: 'OutConsumer', ign: 'OutConsumer', day: 30, date: '24/04/2020 · 13:38',
  sfx: 'hit', impact: 3.5, dur: 5.0, noclip: true,
  slow: [{ t: .75, d: .5, f: .4 }, { t: 2.45, d: .5, f: .4 }],
  note: 'SIN CLIP · SEGÚN SU PROPIO RELATO',
  chat: [
    ['Outconsumer ha sido PERMABANEADO', '#ff5555'],
    ['Muerte por POLLO', '#ffffff'],
  ],
  build(assets) {
    const w = new World(24, 14, 24, [-12, -4, -12]);
    w.fill(-12, -4, -12, 11, -1, 11, 'dirt');
    w.fill(-4, -1, -4, 4, -1, 4, 'grass');
    w.fill(-5, -1, -5, 5, 2, -5, 'planks'); w.fill(-5, -1, 5, 5, 2, 5, 'planks'); w.fill(-5, -1, -5, -5, 2, 5, 'planks'); w.fill(5, -1, -5, 5, 2, 5, 'planks'); // pen walls
    w.fill(-5, 3, -5, 5, 3, -4, 'planks'); // the ledge he fed them from
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#e8e4d8');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#ffffff', '#777766', 1.6));
    const p = player(assets, 'outconsumer'); scene.add(p);
    const seeds = hold(p, M.pixBox ? M.pixBox(3, 3, 3, () => [90, 160, 60]) : new THREE.Group(), { rx: -1.2 });
    const chickens = chickenFlock(scene, 10, 0, 1, 3.2);
    const pop = totemPop(scene);
    const hole = new THREE.Mesh(new THREE.BoxGeometry(1.02, 1.02, .3), new THREE.MeshBasicMaterial({ color: '#1a1410' })); hole.position.set(.5, 1.5, -3.9); scene.add(hole);
    const camera = new THREE.PerspectiveCamera(55, 16 / 9, .05, 100);
    const I = 3.5;
    return {
      scene, ink: { skyA: '#d8d4c8', skyB: '#f4f0e6' },
      cues: [{ t: 1.2, type: 'sfx', kind: 'hurt', gain: .3 }, { t: 1.8, type: 'sfx', kind: 'hurt', gain: .3 }, { t: 2.45, type: 'sfx', kind: 'pop', gain: .3 }, { t: 2.6, type: 'sfx', kind: 'totem' }, { t: 3.1, type: 'sfx', kind: 'hurt', gain: .3 }],
      notes: [
        { t0: .2, t1: 1.0, text: 'sin armadura, para ganar experiencia:\nles da de comer a los pollos desde arriba', x: 110, y: 830, size: 46 },
        { t0: 1.0, t1: 2.0, text: 'se cae al corral: ~10 pollos\n(desde el día 20, agresivos)', x: 1150, y: 250, size: 48, to: () => chickens[3].position.clone().add(new THREE.Vector3(0, .6, 0)) },
        { t0: 2.0, t1: 3.3, text: 'en vez de pelear, huye:\nsalta y abre un hueco para subir', x: 1150, y: 250, size: 48, to: () => hole.position },
        { t0: 2.6, t1: 3.5, text: 'salta el tótem… no le da tiempo a poner otro', x: 110, y: 880, size: 44 },
      ],
      update(lt, T) {
        // on the ledge -> falls into the pen -> pecked -> jumps and jumps trying to climb out -> totem -> dies
        let px = 0, py = 4, pz = -4.4;
        if (lt > .8) { const k = clamp((lt - .8) / .35); py = lerp(4, 0, ease.in(k)); pz = lerp(-4.4, -3.4, k); }
        const jumping = lt > 1.9 && lt < I;
        if (jumping) { py = hop(lt - 1.9, .42, 1.2); px = Math.sin((lt - 1.9) * 3) * .4; }
        p.position.set(px, py, pz);
        face(p, 0, jumping ? -9 : 3);
        pose(p, { idle: T * 2, walk: T * 12, swing: jumping ? .5 : 0, armRaise: lt < .8 ? 1 : jumping ? 1.3 + Math.sin(T * 16) * .6 : .4, headPitch: lt < .8 ? .7 : jumping ? -.6 : .2 });
        hurt(p, lt > 1.3 && Math.floor(lt * 7) % 3 === 0 && lt < I ? 1 : 0);
        seeds.visible = lt < 1.2;
        hole.visible = lt > 2.45;
        chickens.forEach((c, i) => {
          const a = i * 2.4 + T * .6;
          const k = clamp((lt - 1.1) / .8);
          const tx = lerp(Math.sin(a) * 3, px + Math.sin(i * 2.4) * .9, k), tz = lerp(1 + Math.cos(a) * 3, pz + 1 + Math.cos(i * 2.4) * .9, k);
          c.position.set(tx, Math.max(0, Math.sin(T * 9 + i) * .35 * k), tz);
          face(c, p.position.x, p.position.z);
          c.userData.head.rotation.x = k > .5 ? Math.max(0, Math.sin(T * 14 + i)) * .8 : 0;
          c.userData.wings.forEach(wg => wg.rotation.z = Math.sin(T * 20 + i) * .4 * k);
        });
        p.visible = lt < I;
        let c;
        if (lt < 1.0) c = cam(camera, [5.5, 6.8, 5], [0, 2.6, -2.5], 50); // feeding them from above, no armour
        else if (lt < 2.0) c = cam(camera, [4.5, 3.5, 3.5], [0, .5, -2], 52); // he falls in; they attack
        else if (lt < I) c = cam(camera, [4.2, 2.6, 2.2], [0, 1.4, -3.6], 55); // jumping, opening a hole; the totem pops
        else { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(4, 6, k), lerp(4, 7, k), lerp(2, 4, k)], [0, 0, -2], 55); }
        pop(camera, lt - 2.6);
        return c;
      },
    };
  },
};
