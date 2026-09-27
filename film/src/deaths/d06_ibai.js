// #6 Ibai (DONIBAILLANOS) — día 11, 05/04/2020 17:23. Verified: wiki (Creeper) + clip (GersoonSG
// 3:54–4:00): a very dark mine, wooden-plank ledge, teammate 4andeR working beside him; a creeper
// drifts in out of the darkness, right in front of him, slides out of frame; he turns left and
// scrolls to a torch -> "fue reventado/a por Creeper", one-shot from full health.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, groundAt, creeperFuse, walkCreeper, PX } from './common.js';

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function pickaxe(col = '#dcdcdc') {
  const g = new THREE.Group();
  const h = M.pixBox(1, 13, 1, () => hex('#6b4a2a')); h.position.y = 5.5; g.add(h);
  const head = M.pixBox(1, 2, 8, () => hex(col)); head.position.y = 12.5; g.add(head);
  for (const s of [-1, 1]) { const tip = M.pixBox(1, 2, 2, () => hex(col)); tip.position.set(0, 11, s * 4.5); g.add(tip); }
  return g;
}

export default {
  n: 6, player: 'ibai', name: 'Ibai', ign: 'DONIBAILLANOS', day: 11, date: '05/04/2020 · 17:23',
  sfx: 'explosion', impact: 3.0, dur: 4.7, storm: true,
  slow: [{ t: 1.55, d: 1.45, f: .35 }],
  chat: [
    ['El comienzo del sufrimiento infinito de DONIBAILLANOS ha comenzado. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['Llano estás en el server, Ebay', '#aaaaaa'],
    ['[MIEMBRO] DONIBAILLANOS fue reventado/a por Creeper', '#ffffff'],
  ],
  build(assets) {
    const P = [1.4, 1.5], A = [.2, -3.1], STOP = [2.75, 1.55];
    const mk = crater => {
      const w = new World(34, 14, 26, [-16, -4, -13]);
      w.fill(-16, -4, -13, 17, 9, 12, 'stone');
      // the mined-out room (uneven ceiling)
      for (let x = -7; x <= 5; x++) for (let z = -4; z <= 4; z++) { const top = 3 + ((x * 7 + z * 3) % 3 === 0 ? 1 : 0) - (Math.abs(z) === 4 && x % 2 ? 1 : 0); w.fill(x, 0, z, x, top, z, 0); }
      // wooden-plank ledge along the back wall, one block up: 4andeR works there
      w.fill(-5, 0, -4, 2, 0, -1, 'planks');
      w.fill(-5, 1, -4, 2, 3, -4, 0); w.fill(-5, 1, -5, 1, 2, -5, 0); // the face he is mining back into
      // a dark tunnel going off east: the creeper comes out of it
      w.fill(6, 0, 0, 16, 2, 2, 0);
      // gravel / dirt patches set into the walls (only replacing wall blocks)
      for (let x = -9; x <= 17; x++) for (let z = -7; z <= 5; z++) for (let y = 0; y <= 5; y++) {
        const h = Math.sin(x * 12.9898 + z * 78.233 + y * 37.7) * 43758.5453; const r = h - Math.floor(h);
        if (w.get(x, y, z) && r < .12) w.set(x, y, z, r < .07 ? 'gravel' : 'dirt');
      }
      if (crater) for (let x = -1; x <= 6; x++) for (let z = -2; z <= 5; z++) for (let y = -2; y <= 3; y++)
        if (Math.hypot(x + .5 - STOP[0], (y + .5) * 1.2, z + .5 - STOP[1]) < 2.3) w.set(x, y, z, 0);
      return w;
    };
    const w = mk(false), wB = mk(true);
    const intact = w.build(), broken = wB.build();
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#020202');
    scene.add(intact, broken); broken.visible = false;
    const gy = (x, z) => groundAt(w, x, z, 2);
    scene.add(new THREE.HemisphereLight('#6a6a78', '#101010', .42));
    // a single torch by the ledge: the only lit patch in the mine
    const wt = torch(); wt.scale.setScalar(PX); wt.position.set(2.55, 1, -1.5); scene.add(wt);
    const lit = new THREE.PointLight('#ffc070', 7, 7.5, 1.3); lit.position.set(2.2, 2.1, -1.4); scene.add(lit);
    const hand = new THREE.PointLight('#ffc070', 0, 6, 1.3); scene.add(hand);
    const p = player(assets, 'ibai'); p.position.set(P[0], gy(...P), P[1]); scene.add(p);
    const tool = hold(p, pickaxe('#8a8a8a'), { rx: -1.3 });
    const tch = hold(p, torch(), { rx: -1.2 }); tch.visible = false;
    const ander = player(assets, 'ander'); ander.position.set(A[0], gy(...A), A[1]); face(ander, A[0] - .3, -6); scene.add(ander);
    hold(ander, pickaxe(), { rx: -1.3 });
    // small yellow drops on the floor by the ledge
    for (let i = 0; i < 6; i++) { const d = new THREE.Mesh(new THREE.BoxGeometry(.13, .13, .13), new THREE.MeshBasicMaterial({ color: '#e8c030' })); const x = -.4 + (i % 3) * .35, z = .3 + Math.floor(i / 3) * .3; d.position.set(x, gy(x, z) + .07, z); d.rotation.y = i; scene.add(d); }
    const creeper = M.creeper(); creeper.scale.multiplyScalar(PX); scene.add(creeper);
    const boom = M.puffs(28); scene.add(boom);
    const flash = M.burst(); scene.add(flash);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 100);
    const I = 3.0, IN = 1.0, ARR = 2.05, TURN = 2.5;
    const V = (o, y) => () => o.position.clone().add(new THREE.Vector3(0, y, 0));
    return {
      scene, ink: { skyA: '#0e0d0c', skyB: '#181614', tint: '#e8e4dc', lineW: 2.3 },
      notes: [
        { t0: .05, t1: 1.0, text: 'una mina muy oscura', x: 1180, y: 800, size: 50 },
        { t0: .05, t1: 1.0, text: '4andeR, a su lado', x: 1260, y: 430, size: 50, to: V(ander, 2.1), bend: 30 },
        { t0: 1.1, t1: 2.05, text: 'sale de la oscuridad', x: 1150, y: 560, size: 50, to: V(creeper, 1.2), ax: 1250, ay: 530, bend: -60 },
        { t0: 2.08, t1: 2.5, text: 'justo delante de él', x: 1300, y: 210, size: 50, to: V(creeper, 1.75), bend: 40 },
        { t0: 2.52, t1: 3.0, text: 'se gira y saca una antorcha', x: 1080, y: 230, size: 48, to: V(p, 1.6), bend: 40 },
        { t0: 3.05, t1: 5.6, text: 'un solo golpe, con vida completa', x: 1100, y: 190, size: 46 },
      ],
      cues: [{ t: ARR, type: 'sfx', kind: 'hiss', dur: I - ARR, gain: .16 }],
      update(lt, T) {
        pose(ander, { idle: T * 2, armRaise: .9 + Math.sin(T * 14) * .5, headPitch: .35 });
        // Ibai mines toward the dark tunnel, then turns left to 4andeR and scrolls to a torch
        const turn = ease.inOut(clamp((lt - TURN) / .25));
        p.rotation.y = lerp(Math.PI / 2, Math.atan2(A[0] - P[0], A[1] - P[1]), turn);
        const mining = lt < 1.0;
        pose(p, { idle: T * 2, armRaise: mining ? .7 + Math.sin(T * 15) * .5 : .45, headPitch: lt < TURN ? .1 : .25 });
        tool.visible = lt < TURN + .15; tch.visible = lt >= TURN + .15;
        hand.intensity = lt >= TURN + .15 && lt < I ? 8 : 0; hand.position.set(P[0], 1.8, P[1] - .5);
        // the creeper drifts out of the dark tunnel and stops right in front of him
        const ck = clamp((lt - IN) / (ARR - IN));
        const cx = lerp(13, STOP[0], ease.out(ck)), cz = lerp(1.5, STOP[1], ck);
        creeper.position.set(cx, gy(cx, cz), cz);
        face(creeper, P[0], P[1]);
        walkCreeper(creeper, T, ck > 0 && ck < 1);
        creeperFuse(creeper, lt, ARR, I);
        creeper.visible = lt > IN - .2 && lt < I;
        boom.position.set(STOP[0], creeper.position.y + .9, STOP[1]); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - I, { radius: 2.4, size: .5 });
        M.animBurst(flash, lt - I, 2.4);
        const dead = lt >= I;
        intact.visible = !dead; broken.visible = dead;
        p.visible = !dead;
        if (lt < IN) return cam(camera, [lerp(4.3, 4.1, lt), 2.4, lerp(3.6, 3.4, lt)], [-.6, 1.2, -2.2], 56); // the dark mine: 4andeR on the plank ledge
        if (lt < ARR) { const k = (lt - IN) / (ARR - IN); return cam(camera, [lerp(.1, .5, k), 1.85, lerp(4.2, 4.0, k)], [lerp(7.5, 4.2, k), .85, lerp(1.2, 1.5, k)], 54); } // over his shoulder: something comes out of the dark
        if (lt < TURN) { const k = (lt - ARR) / (TURN - ARR); return cam(camera, [lerp(2.3, 2.2, k), 1.7, lerp(4.4, 4.2, k)], [lerp(2.0, 1.9, k), 1.0, lerp(1.2, 1.3, k)], 56); } // right in front of him: it flashes and swells
        if (lt < I) { const k = (lt - TURN) / (I - TURN); return cam(camera, [lerp(5.5, 5.3, k), lerp(2.6, 2.5, k), 3.8], [lerp(1.0, 1.3, k), 1.0, lerp(-1.1, -.8, k)], 58); } // he turns left to 4andeR, torch out
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(4.6, 4.2, k), lerp(2.3, 3.4, k), lerp(-2, -1.2, k)], [STOP[0], 0, STOP[1]], 58);
      },
    };
  },
};
