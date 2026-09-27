// #20 Paracetamor — día 32, 26/04/2020 20:58. NO FOOTAGE (off-stream). Sources: wiki (Caer al Vacío) + ban card +
// her tweets ("He tirado una enderpearl al portal y he caído al vacío, justo después de la muerte de @FolagoR") +
// her own account in Rubik's documentary (~25:30): in the End, heading back after Folagor died, "me hice mi
// escalerita, tiro una enderpearl y … mi personaje se hizo teleport pero cayendo al vacío"; narration: "al lanzar un
// ender pearl a través de un gateway se bugueó". Drawn as a storyboard sketch with hand-written notes.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, pearl, endIsland, PX } from './common.js';

export default {
  n: 20, player: 'paracetamor', name: 'Paracetamor', ign: 'Paracetamor', day: 32, date: '26/04/2020 · 20:58',
  sfx: 'void', impact: 4.2, dur: 5.4, noclip: true,
  slow: [{ t: 2.2, d: .8, f: .4 }],
  note: 'SIN CLIP · SEGÚN SU PROPIO RELATO',
  chat: [
    ['"He tirado una enderpearl al portal y he caído al vacío"', '#ffffff'],
    ['Parecetamor ha sido PERMABANEADA · Muerte por CAER AL VACÍO', '#ff5555'],
  ],
  build(assets) {
    const w = new World(40, 50, 40, [-20, -34, -20]);
    endIsland(w, { r: 7, cx: -8, cz: 0, top: 0, depth: 6, seed: 4 });
    // her little staircase toward the gateway
    for (let i = 0; i < 4; i++) w.fill(-2 + i, i, -1, -2 + i, i, 0, 'end_stone');
    // End gateway: bedrock frame floating in the void
    w.fill(7, 6, -1, 7, 8, 1, 'bedrock'); w.set(7, 7, 0, 0);
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#e8e4ec');
    scene.add(w.build());
    const core = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: '#0a0620' })); core.position.set(7.5, 7.5, .5); scene.add(core);
    const beam = new THREE.Mesh(new THREE.BoxGeometry(.3, 14, .3), new THREE.MeshBasicMaterial({ color: '#b48aff', transparent: true, opacity: .5 })); beam.position.set(7.5, 15, .5); scene.add(beam);
    scene.add(new THREE.HemisphereLight('#ffffff', '#666666', 1.6));
    const p = player(assets, 'paracetamor'); scene.add(p);
    const inHand = hold(p, pearl(), { rx: 0 });
    const thrown = pearl(); thrown.scale.setScalar(PX * 1.4); scene.add(thrown);
    const trail = M.particlesCube('#6a4aa8', 14, .3, .07); scene.add(trail);
    const tp = M.particlesCube('#b070ff', 20, .6, .08); scene.add(tp);
    const camera = new THREE.PerspectiveCamera(50, 16 / 9, .05, 200);
    const I = 4.2, THROW = 1.5, TP = 2.4;
    return {
      scene, ink: { skyA: '#cfc8d8', skyB: '#f1ecf4' },
      cues: [{ t: THROW, type: 'sfx', kind: 'pearl' }, { t: TP, type: 'sfx', kind: 'teleport' }, { t: TP + .2, type: 'sfx', kind: 'whoosh', dur: 1.6, gain: .3 }],
      notes: [
        { t0: .3, t1: THROW, text: 'vuelve del End tras la muerte\nde Folagor: hace una escalerita', x: 110, y: 860, size: 50 },
        { t0: THROW, t1: TP + .1, text: 'tira una perla\na través del gateway', x: 1300, y: 220, size: 54, to: [1330, 380], ax: 1420, ay: 300 },
        { t0: TP + .3, t1: I + .2, text: 'el teleport la deja\ncayendo al vacío', x: 1180, y: 700, size: 56 },
      ],
      update(lt, T) {
        let pos;
        const stairY = x => (x < -2 ? 0 : Math.min(4, Math.floor(x + 2) + 1));
        if (lt < THROW) { const k = ease.inOut(clamp(lt / THROW)); const x = lerp(-5, 1.5, k); pos = [x, stairY(x), -.5]; }
        else if (lt < TP) pos = [1.5, 4, -.5];
        else { const ft = lt - TP; pos = [6 + ft * 1.2, 4 - .5 * 18 * ft * ft, 3.5]; }
        p.position.set(...pos);
        face(p, 8, 0);
        p.rotation.x = lt > TP ? Math.min(1.3, (lt - TP) * 1.5) : 0;
        pose(p, { idle: T * 2, walk: T * 9, swing: lt < THROW ? .6 : 0, armRaise: lt > THROW - .4 && lt < THROW + .2 ? 1.8 : lt > TP ? 2.4 : .4, headPitch: lt > TP ? -.9 : -.2 });
        inHand.visible = lt < THROW;
        const pt = clamp((lt - THROW) / (TP - THROW));
        thrown.visible = lt > THROW && lt < TP;
        thrown.position.set(lerp(1.8, 7.5, pt), lerp(4.6, 7.5, pt) + Math.sin(pt * Math.PI) * 1.5, lerp(-.5, .5, pt));
        trail.visible = thrown.visible; trail.position.copy(thrown.position); M.animParticles(trail, T * 3, { rise: .2 });
        tp.visible = lt > TP - .1 && lt < TP + .6; tp.position.set(6, pos[1] + .5, 3.5); M.animParticles(tp, (lt - TP) * 3, { rise: .5 });
        p.visible = lt < I;
        if (lt < TP) return cam(camera, [-1, 6, 18], [2, 5, 0], 52); // the island edge, her stairs, the gateway
        const k = ease.out(clamp((lt - TP) / 1.8));
        return cam(camera, [lerp(-2, 12, k), lerp(8, pos[1] + 6, k), lerp(12, 12, k)], [pos[0], pos[1], pos[2]], 55); // she falls into the void
      },
    };
  },
};
