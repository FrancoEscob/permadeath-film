// #34 Kakytron — día 60, 24/05/2020 14:58. Verified: wiki (Ender Quantum Creeper, tótem "No Equipado (Por falta de
// slots)") + clip (GersoonSG 21:39–22:00, POV of an invisible spectator whose overlay is ElRichMC's): through bamboo
// into a stone-brick plaza with a sandstone path, lamp posts, dark wooden frames and pumpkin-faced posts; Kakytron in
// purple armour walks up to his house's door; next frame the whole front of the house is a crater with a cluster of
// green items in it. Rubik's documentary: an Ender Quantum Creeper hidden behind a column (visible from Rich's
// spectator POV) exploded; he had no inventory space or totem. Chat: "was blown up by Ender Quantum Creeper".
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, face, cam, pose, clamp, lerp, ease, armor, groundAt, PX } from './common.js';
import { text } from '../engine.js';
import { qFuse, legs } from './lib_d31_d39.js';

function nameTag() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 72;
  const x = c.getContext('2d'); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(0, 0, 512, 72);
  x.font = '44px VT'; x.textBaseline = 'middle'; x.fillStyle = '#55ff55'; x.fillText('[MIEMBRO]', 22, 38); x.fillStyle = '#ffffff'; x.fillText('Kakytron', 232, 38); x.fillStyle = '#ff3030'; x.fillRect(430, 22, 30, 30);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false })); s.scale.set(3.6, .5, 1); return s;
}

export default {
  n: 34, player: 'kakytron', name: 'Kakytron', ign: 'Kakytron', day: 60, date: '24/05/2020 · 14:58',
  sfx: 'explosion', impact: 3.0, dur: 4.9, storm: true,
  slow: [{ t: 2.25, d: .75, f: .35 }],
  note: 'VISTO DESDE EL ESPECTADOR INVISIBLE (RICH)',
  chat: [
    ['Este es el comienzo del sufrimiento eterno de Kakytron. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['Ahora por fin descansa en paz.', '#aaaaaa'],
    ['[MIEMBRO] Kakytron ☠ was blown up by Ender Quantum Creeper', '#ffffff'],
    ['¡Comienza el Death Train con duración de 10 horas!', '#ff5555'],
  ],
  build(assets) {
    const CR = new THREE.Vector3(3.85, 0, -15.55); // the creeper, tucked between the right column and the facade
    const mk = crater => {
      const w = new World(72, 24, 72, [-36, -4, -36]);
      w.fill(-36, -4, -36, 35, -2, 35, 'dirt'); w.fill(-36, -1, -36, 35, -1, 35, 'grass');
      w.fill(-15, -1, -28, 16, -1, 16, 'stone_bricks'); // the plaza
      w.fill(-1, -1, -16, 1, -1, 16, 'sand'); // sandstone path
      // the house: low, wide, stone brick, dark roof, rows of windows, a door on the path
      w.fill(-10, 0, -26, 11, 4, -17, 'stone_bricks'); w.fill(-9, 0, -25, 10, 3, -18, 0);
      w.fill(-11, 5, -27, 12, 5, -16, 'deepslate');
      for (let x = -9; x <= 10; x += 2) if (Math.abs(x - .5) > 2) w.fill(x, 1, -17, x, 2, -17, 'glass');
      w.fill(0, 0, -17, 0, 1, -17, 0); // door
      w.fill(-2, 0, -15, -2, 4, -15, 'stone'); w.fill(3, 0, -15, 3, 4, -15, 'stone'); // porch columns
      w.fill(-2, 4, -16, 3, 4, -16, 'stone');
      w.set(-2, 0, -13, 'log'); w.set(3, 0, -13, 'log'); // pumpkin posts
      if (crater) {
        const c = new THREE.Vector3(1.5, 1, -16.5);
        for (let x = -9; x <= 12; x++) for (let z = -24; z <= -9; z++) for (let y = -3; y <= 6; y++) {
          const d = Math.hypot((x + .5 - c.x) / 1.15, (y + .5 - c.y) * 1.25, (z + .5 - c.z) / 1.05);
          if (d < 6.2 + Math.sin(x * 3.1 + z * 1.7) * .5) w.set(x, y, z, 0);
        }
      }
      return w;
    };
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#a8b4c4');
    const W0 = mk(false), W1 = mk(true);
    const intact = W0.build(), broken = W1.build(); scene.add(intact, broken); broken.visible = false;
    scene.add(new THREE.HemisphereLight('#ffffff', '#667755', 1.3));
    const sun = new THREE.DirectionalLight('#fff4e6', .9); sun.position.set(10, 20, 10); scene.add(sun);
    // bamboo grove all around the plaza
    const bam = []; for (let i = 0; i < 520; i++) { const a = i * 2.39996, r = 19 + (i * 37 % 90) / 10; const x = .5 + Math.cos(a) * r * 1.05, z = -6 + Math.sin(a) * r * 1.15; if (z > 13 && Math.abs(x) < 3.2) continue; bam.push([x, z, 7 + (i * 13 % 60) / 10]); }
    const bamM = new THREE.InstancedMesh(new THREE.BoxGeometry(.2, 1, .2), new THREE.MeshLambertMaterial({ color: '#79b04a' }), bam.length);
    const mx = new THREE.Matrix4(); bam.forEach(([x, z, h], i) => { mx.makeScale(1, h, 1).setPosition(x, h / 2, z); bamM.setMatrixAt(i, mx); }); scene.add(bamM);
    const leafM = new THREE.InstancedMesh(new THREE.BoxGeometry(1.1, .08, .35), new THREE.MeshLambertMaterial({ color: '#5a9a3a' }), bam.length);
    bam.forEach(([x, z, h], i) => { mx.makeRotationY(i * 1.3).setPosition(x, h - .3, z); leafM.setMatrixAt(i, mx); }); scene.add(leafM);
    // lanterns on the posts, pumpkins on the posts by the door
    const lanM = new THREE.MeshBasicMaterial({ color: '#ffc860' }), lanF = new THREE.MeshLambertMaterial({ color: '#2a2a2a' });
    const postM = new THREE.MeshLambertMaterial({ color: '#4a3220' });
    const bar = (w_, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w_, h, d), postM); m.position.set(x, y, z); scene.add(m); return m; };
    for (let z = 12; z >= -12; z -= 4) for (const x of [-3, 4]) { bar(.24, 2.4, .24, x + .5, 1.2, z + .5); bar(.7, .12, .12, x + .5, 2.35, z + .5); const g = new THREE.Group(); const f = new THREE.Mesh(new THREE.BoxGeometry(.38, .42, .38), lanF); const l = new THREE.Mesh(new THREE.BoxGeometry(.28, .28, .4), lanM); g.add(f, l); g.position.set(x + .5 + (x < 0 ? .3 : -.3), 2.05, z + .5); scene.add(g); } // lamp posts with lanterns
    for (const z of [9, 1, -7]) for (const x0 of [-8.5, 9.5]) { bar(.26, 3.2, .26, x0 - 1, 1.6, z + .5); bar(.26, 3.2, .26, x0 + 1, 1.6, z + .5); bar(2.6, .26, .26, x0, 3.1, z + .5); bar(.2, 1.6, .2, x0 - .5, 2.4, z + .5).rotation.z = .8; bar(.2, 1.6, .2, x0 + .5, 2.4, z + .5).rotation.z = -.8; } // dark wooden frames
    const pumpkins = [-2, 3].map(x => { const m = new THREE.Mesh(new THREE.BoxGeometry(.9, .8, .9), [0, 0, 0, 0, 0, 0].map((_, i) => new THREE.MeshLambertMaterial({ color: i === 4 ? '#8a3a08' : '#e08a1c' }))); m.position.set(x + .5, 1.4, -12.5); scene.add(m); return m; });
    const p = player(assets, 'kakytron'); armor(p, 'purple'); scene.add(p);
    const tag = nameTag(); scene.add(tag);
    const qc = M.quantumCreeper(); qc.scale.multiplyScalar(PX); qc.position.copy(CR); qc.position.y = groundAt(W0, CR.x, CR.z, 3); scene.add(qc);
    // dropped items in the crater (bright green cluster)
    const gems = new THREE.Group(); for (let i = 0; i < 14; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(.3, .3, .3), new THREE.MeshLambertMaterial({ color: i % 3 ? '#5fe060' : '#3fbf3a' })); const x = 1 + Math.sin(i * 2.1) * 1.4, z = -15.5 + Math.cos(i * 1.7) * 1.3; m.position.set(x, groundAt(W1, x, z) + .2, z); m.userData.y = m.position.y; gems.add(m); } scene.add(gems);
    const boom = M.puffs(40); boom.position.set(CR.x - .5, 1.2, CR.z + .5); scene.add(boom);
    const flash = M.burst(); flash.position.copy(boom.position); scene.add(flash);
    const deb = M.particlesCube('#8a8a8a', 26, 3, .35); deb.position.copy(boom.position); scene.add(deb);
    const camera = new THREE.PerspectiveCamera(55, 16 / 9, .05, 200);
    const I = 3.0, FS = 2.3;
    const zAt = t => lerp(-3, -16.3, clamp(t / 3.0));
    return {
      scene, ink: { skyA: '#8a98ac', skyB: '#e8e4d8', lineW: 2.3 },
      cues: [{ t: FS, type: 'sfx', kind: 'hiss', dur: .7, gain: .14 }],
      notes: [
        { t0: .2, t1: 2.3, text: 'kakytron vuelve a su casa', x: 1150, y: 300, size: 52, to: () => p.position.clone().add(new THREE.Vector3(0, 2.1, 0)), bend: 50 },
        { t0: 1.55, t1: 3.0, text: 'un creeper escondido\ntras la columna', x: 110, y: 600, size: 52, to: () => qc.position.clone().add(new THREE.Vector3(0, 1.3, 0)), bend: -60 },
        { t0: 2.27, t1: 3.0, text: 'Ender Quantum Creeper', x: 1180, y: 250, size: 48, circle: () => qc.position.clone().add(new THREE.Vector3(0, .9, 0)), r: 70 },
        { t0: 3.1, t1: 5.3, text: 'toda la fachada: un cráter', x: 1180, y: 205, size: 50, to: () => new THREE.Vector3(1.5, 1, -17), bend: 40 },
        { t0: 3.4, t1: 5.8, text: 'no llevaba tótem:\nle faltaban slots', x: 1330, y: 282, size: 44 },
      ],
      overlay(ctx, lt) {
        const s = 46 - Math.floor(lt);
        text(ctx, `07:31:${String(Math.max(40, s)).padStart(2, '0')} para obtener Life Orb`, 960, 150, { font: '32px VT', color: '#ffaa00', stroke: '#000', strokeW: 4 });
        if (lt < I) text(ctx, 'You are invisible to other players!', 960, 880, { font: '28px VT', color: '#55ff55', stroke: '#000', strokeW: 4 });
      },
      update(lt, T) {
        const z = zAt(lt); stand(p, z);
        function stand(o, zz) { o.position.set(.5, groundAt(W0, .5, zz), zz); }
        face(p, .5, -30);
        pose(p, { idle: T * 2, walk: T * 8.5, swing: .55 });
        tag.position.set(p.position.x, p.position.y + 2.55, p.position.z); tag.visible = p.visible;
        // the creeper waits behind the column, turns to him, flashes and swells
        face(qc, p.position.x, p.position.z); qc.userData.shimmer(T); legs(qc, T, false);
        qFuse(qc, lt, FS, I);
        qc.visible = lt < I;
        const dead = lt >= I; intact.visible = !dead; broken.visible = dead; gems.visible = dead;
        pumpkins[1].visible = !dead; pumpkins[0].visible = !dead;
        gems.children.forEach((m, i) => { m.position.y = m.userData.y + Math.sin(T * 2 + i) * .06; m.rotation.y = T + i; });
        M.animPuffs(boom, lt - I, { radius: 5.5, size: 1.1 }); M.animBurst(flash, lt - I, 6);
        deb.visible = lt > I && lt < I + 1.4; M.animParticles(deb, (lt - I) * 1.6, { rise: 1.6, spread: 4 });
        p.visible = lt < I;
        if (lt < .9) { const f = ease.inOut(lt / .9); return cam(camera, [lerp(1, 1.5, f), lerp(3.2, 6, f), lerp(24, 10, f)], [.5, 1.2, -10], 55); } // pushing through the bamboo
        if (lt < FS - .05) return cam(camera, [2.2, 7.2, z + 8.5], [.5, 1, z - 5], 52); // high behind him, up the path
        if (lt < I) { const k = (lt - FS) / (I - FS); return cam(camera, [lerp(10.8, 10.2, k), lerp(4.0, 3.7, k), lerp(-11.2, -11.8, k)], [2.2, 1.1, -15.3], 42); } // 3/4: the column, the creeper behind it
        const f = ease.out(clamp((lt - I) / 1.8));
        return cam(camera, [lerp(1.5, 3, f), lerp(8.5, 10, f), lerp(-3, -1, f)], [1, 0, -16], 55); // the crater
      },
    };
  },
};
