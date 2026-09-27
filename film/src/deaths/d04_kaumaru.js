// #4 Kaumaru — día 10, 04/04/2020 16:50. NO FOOTAGE. Sources: wiki (Araña de Cueva) + his own
// spoken account in his explanation video (GersoonSG 1:55–2:59, auto-subs) + Rubik's documentary:
// in a well-lit area with cave-spider spawners he removed a block, a dark gap opened and a cave
// spider spawned in it, with strength and speed; he couldn't outrun it. Drawn as a pencil sketch.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, spawnerCage, PX } from './common.js';

export default {
  n: 4, player: 'kaumaru', name: 'Kaumaru', ign: 'Kaumaru', day: 10, date: '04/04/2020 · 16:50',
  sfx: 'hit', impact: 3.2, dur: 4.7, noclip: true,
  slow: [{ t: .95, d: .7, f: .35 }],
  note: 'SIN CLIP · SEGÚN SU PROPIO RELATO',
  chat: [
    ['Kaumaru ha sido PERMABANEADO', '#ff5555'],
    ['Muerte por ARAÑA DE CUEVA', '#ffffff'],
  ],
  build(assets) {
    const w = new World(34, 12, 24, [-17, -3, -12]);
    w.fill(-17, -3, -12, 16, 8, 11, 'stone');
    w.fill(-12, 0, -4, 12, 4, 4, 0);
    w.fill(-12, -1, -4, 12, -1, 4, 'cobble');
    w.fill(2, 0, -5, 3, 1, -5, 'stone');
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0a0a0a');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#ffffff', '#666666', 1.6));
    for (let x = -10; x <= 10; x += 4) { const t = torch(); t.scale.setScalar(PX); t.position.set(x, 1.5, -3.6); scene.add(t); const l = new THREE.PointLight('#ffd090', 6, 7, 1.3); l.position.set(x, 2.3, -3); scene.add(l); }
    const cages = [[-6, 0, 3], [7, 0, 3]].map(([x, y, z]) => { const c = spawnerCage('#3aa8a0'); c.position.set(x, y, z); scene.add(c); return c; });
    const p = player(assets, 'kaumaru'); scene.add(p);
    hold(p, M.sword('diamond'), { rx: -1.3 });
    const gap = new THREE.Mesh(new THREE.BoxGeometry(1.02, 1.02, 1.02), new THREE.MeshBasicMaterial({ color: '#050505' })); gap.position.set(2.5, .5, -4.51); scene.add(gap);
    const block = new THREE.Mesh(new THREE.BoxGeometry(1.03, 1.03, 1.03), new THREE.MeshLambertMaterial({ color: '#8a8a8a' })); block.position.copy(gap.position); scene.add(block);
    const sp = M.spider({ cave: true }); sp.scale.multiplyScalar(PX); scene.add(sp);
    const trail = M.particlesCube('#9fd0ff', 14, .6, .08); scene.add(trail);
    const camera = new THREE.PerspectiveCamera(55, 16 / 9, .05, 100);
    const I = 3.2;
    return {
      scene, ink: { skyA: '#2a2622', skyB: '#3a342c' },
      notes: [
        { t0: .2, t1: 1.0, text: 'zona de spawners de arañas de cueva,\n"perfectamente iluminada"', x: 110, y: 830, size: 46 },
        { t0: 1.0, t1: 1.9, text: 'quita un bloque… en el hueco oscuro\naparece una araña de cueva', x: 1100, y: 230, size: 48, circle: () => new THREE.Vector3(2.5, .5, -4.5), r: 90 },
        { t0: 1.9, t1: 3.3, text: 'con fuerza y velocidad:\nno pudo huir', x: 1200, y: 230, size: 52, to: () => sp.position.clone().add(new THREE.Vector3(0, .5, 0)) },
      ],
      update(lt, T) {
        const mined = lt > 1.0;
        block.visible = !mined; gap.visible = mined && lt < 1.3;
        const run = clamp((lt - 1.7) / (I - 1.7));
        p.position.set(lerp(2.5, -6, run), 0, lerp(-2.6, -1, run));
        face(p, lt < 1.7 ? 2.5 : -12, lt < 1.7 ? -5 : 0);
        pose(p, { idle: T * 2, walk: T * 16, swing: lt > 1.7 ? .9 : 0, armRaise: lt < 1 ? .9 + Math.sin(T * 16) * .5 : .4 });
        sp.visible = lt > 1.1;
        const st = clamp((lt - 1.1) / (I - 1.1));
        sp.position.set(lerp(2.5, p.position.x + .9, ease.in(st)), 0, lerp(-4.2, p.position.z, st));
        face(sp, p.position.x, p.position.z);
        sp.userData.legs.forEach((l, i) => l.rotation.x = Math.sin(T * 30 + i) * .3);
        trail.position.copy(sp.position); M.animParticles(trail, T * 3, { rise: .3 });
        trail.visible = sp.visible;
        p.visible = lt < I;
        if (lt < 1.7) return cam(camera, [5.5, 2.2, 1.5], [2.5, .8, -4], 50); // mining the block; the dark gap
        if (lt < I) return cam(camera, [-8.5, 1.8, 2.8], [p.position.x + 2, .8, -1.5], 52); // he runs, it's faster
        const k = ease.out(clamp((lt - I) / 1.5));
        return cam(camera, [lerp(-8, -9, k), lerp(2, 5, k), lerp(3, 5, k)], [-6, 0, -1], 55);
      },
    };
  },
};
