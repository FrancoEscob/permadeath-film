// Kakytron's FIRST death — día 40, 04/05/2020, time unknown, NOT recorded, and reversed. Sources: his own words in
// Rubik's documentary (~44:40): "me protegí con obsidiana … arriba del todo me hice un edificio … con una torre de
// obsidiana y me encerré allí rollo búnker … cuando me conecté … por algún fallo del script se ve que el bloque de
// abajo se desapareció y me caí … no fue culpa mía, fue culpa del script … y me revivió". Rubik: on day 40 players
// went up to the maximum height on obsidian platforms because of the Supernova Cats; Kaky joined off-stream and died
// of a fall. Height and time unknown -> storyboard sketch with hand-written notes.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import { player, face, cam, pose, clamp, lerp, ease, PX } from './common.js';

export default {
  n: 33.5, player: 'kakytron', name: 'Kakytron', ign: 'Kakytron', day: 40, date: '04/05/2020 · hora desconocida',
  sfx: 'hit', impact: 3.9, dur: 5.0, noclip: true, revived: true,
  slow: [{ t: 1.8, d: .7, f: .35 }],
  note: 'SIN CLIP · SEGÚN SU PROPIO RELATO',
  revivedText: 'No fue culpa suya: fue el plugin. Lo revivieron.',
  build(assets) {
    const TOP = 30;
    const w = new World(24, 44, 24, [-12, -4, -12]);
    w.fill(-12, -4, -12, 11, -1, 11, 'grass');
    for (let x = -12; x < 12; x += 3) for (let z = -12; z < 12; z += 4) if ((x * 7 + z) % 5 === 0) w.fill(x, 0, z, x, 2, z, 'log');
    w.fill(-3, 0, -3, -3, TOP - 1, -3, 'obsidian'); // obsidian pillar up to the maximum height
    w.fill(-3, TOP, -3, 2, TOP, 2, 'obsidian'); // platform in the air
    w.fill(-3, TOP + 1, -3, 2, TOP + 3, -3, 'obsidian'); w.fill(-3, TOP + 1, -3, -3, TOP + 3, 2, 'obsidian'); w.fill(2, TOP + 1, -3, 2, TOP + 3, 2, 'obsidian');
    w.fill(-3, TOP + 3, -3, 2, TOP + 3, 2, 'obsidian'); // the bunker (front left open: cutaway)
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#e8e4d8');
    const intact = w.build(); w.set(0, TOP, 0, 0); const holed = w.build();
    scene.add(intact, holed); holed.visible = false;
    scene.add(new THREE.HemisphereLight('#ffffff', '#777766', 1.6));
    const mark = new THREE.Mesh(new THREE.BoxGeometry(1.08, 1.08, 1.08), new THREE.MeshBasicMaterial({ color: '#d0101a', wireframe: true }));
    mark.position.set(.5, TOP + .5, .5); scene.add(mark);
    const p = player(assets, 'kakytron'); scene.add(p);
    const camera = new THREE.PerspectiveCamera(50, 16 / 9, .05, 300);
    const I = 3.9, GONE = 1.9;
    return {
      scene, ink: { skyA: '#d8d4c8', skyB: '#f4f0e6' },
      notes: [
        { t0: .2, t1: 1.3, text: 'día 40: por los Gatos Supernova,\nse encierra en un búnker de obsidiana\narriba de una torre', x: 110, y: 820, size: 46 },
        { t0: 1.3, t1: GONE + .9, text: 'se conecta… y un fallo del script\nhace desaparecer el bloque de abajo', x: 1020, y: 230, size: 48, circle: () => new THREE.Vector3(.5, TOP + .5, .5), r: 70 },
        { t0: GONE + .9, t1: I + .3, text: 'cae', x: 1150, y: 640, size: 90 },
      ],
      update(lt, T) {
        const gone = lt > GONE; intact.visible = !gone; holed.visible = gone;
        mark.visible = lt > 1.4 && lt < GONE + .6 && Math.floor(lt * 6) % 2 === 0;
        const ft = Math.max(0, lt - GONE - .1);
        p.position.set(.5, Math.max(0, TOP + 1 - .5 * 30 * ft * ft), .5);
        face(p, 0, 5);
        p.rotation.x = ft > 0 ? Math.min(.6, ft) : 0;
        pose(p, { idle: T * 2, armRaise: ft > 0 ? 2.4 : .3, headPitch: lt > 1.4 && lt < GONE + .2 ? .8 : 0 });
        p.visible = lt < I;
        if (lt < 1.2) { const k = ease.inOut(lt / 1.2); return cam(camera, [lerp(26, 9, k), lerp(16, TOP + 3, k), lerp(34, 11, k)], [0, lerp(15, TOP + 1.5, k), 0], 50); } // the tower, then the bunker
        if (lt < GONE + .3) return cam(camera, [5.5, TOP + 2.8, 11], [0, TOP + 1, 0], 44); // inside the bunker (cutaway): the floor block
        if (lt < I) return cam(camera, [12, lerp(TOP + 2, 8, clamp((lt - GONE - .3) / 1.6)), 16], [0, p.position.y + 1, 0], 55); // he falls, past the pillar
        const k = ease.out(clamp((lt - I) / 1.4));
        return cam(camera, [lerp(9, 12, k), lerp(6, 12, k), lerp(12, 15, k)], [.5, 1, .5], 55);
      },
    };
  },
};
