// #37 killercreeper_55 — día 60, 24/05/2020 20:43. Verified: wiki (Ender Quantum Creeper; tótem "No Equipado
// (Equipaba su medalla en la mano derecha por la falta de slots, pero en el ultimo segundo se puso el escudo…)") + clip
// (GersoonSG 23:00–23:10): night storm, a long storage hall (stone bricks, light-blue ice, dark log pillars, rows of
// chests, plank beams); golden apple, then "Medalla de Superviviente" in his right hand (offhand = teal blocked item);
// a pale-blue shimmering see-through figure appears by a log pillar at the far end and walks toward him; he switches
// to the shield ("Shield" tooltip ~0.2 s before death) -> "was blown up by Ender Quantum Creeper", full health.
// His words (subs + Rubik's documentary): "Ah, mira, un creeper. Hala." / "Ah, mira, otro creeper."
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, armor, groundAt, PX } from './common.js';
import { text } from '../engine.js';
import { pixBox } from '../mobs.js';
import { qFuse, legs, hotbar, tooltip } from './lib_d31_d39.js';

const BAR = [{ k: 'x' }, { k: 'sword', c: '#a050e0' }, { k: 'pick', c: '#a050e0' }, { k: 'bow', glint: true }, { k: 'gapple' }, { k: 'medal' }, { k: 'shield', c: '#8a3ad8' }, { k: 'diamond' }, { k: 'x' }];

function chest() {
  const g = new THREE.Group();
  const b = pixBox(16, 15, 15, (f, i, j) => (j === 5 || j === 6) ? [70, 44, 20] : (i === 0 || i === 15 || j === 0 || j === 14) ? [92, 60, 28] : [162, 108, 48]);
  b.scale.setScalar(1 / 16); b.position.y = 15 / 32; g.add(b);
  const l = new THREE.Mesh(new THREE.BoxGeometry(.14, .22, .06), new THREE.MeshLambertMaterial({ color: '#b8b8b8' })); l.position.set(0, .56, 15 / 32 + .02); g.add(l);
  return g;
}

export default {
  n: 37, player: 'killer', name: 'KillerCreeper55', ign: 'killercreeper_55', day: 60, date: '24/05/2020 · 20:43',
  sfx: 'explosion', impact: 3.3, dur: 5.0, storm: true,
  slow: [{ t: 1.65, d: .65, f: .4 }, { t: 2.75, d: .55, f: .28 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de killercreeper_55. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['KillerCreeper55, Más conocido como el jugador permabaneado', '#aaaaaa'],
    ['[MIEMBRO] killercreeper_55 ☠ was blown up by Ender Quantum Creeper', '#ffffff'],
  ],
  build(assets) {
    const w = new World(40, 12, 14, [-20, -2, -7]);
    w.fill(-20, -2, -7, 19, 8, 6, 'stone_bricks');
    w.fill(-18, 0, -4, 18, 5, 4, 0); // the hall
    w.fill(-18, 2, -5, 18, 5, -5, 'packed_ice'); w.fill(-18, 2, 5, 18, 5, 5, 'packed_ice'); // ice walls above the chests
    w.fill(18, 0, -4, 18, 5, 4, 'packed_ice'); w.fill(-18, 1, -4, -18, 5, 4, 'ice');
    for (let x = -16; x <= 16; x += 6) { w.fill(x, 0, -4, x, 5, -4, 'log'); w.fill(x, 0, 4, x, 5, 4, 'log'); }
    w.fill(1, 0, 1, 1, 5, 1, 'log'); w.fill(-9, 0, -2, -9, 5, -2, 'log'); // dark log pillars in the hall
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#050508');
    scene.add(w.build());
    // rows of double chests (two high) along both walls
    for (let x = -17; x <= 17; x++) { if ((x + 16) % 6 === 0) continue; for (const [z, ry] of [[-3.5, 0], [4.5 - 1, Math.PI]]) for (let y = 0; y < 2; y++) { const c = chest(); c.position.set(x + .5, y, z + (ry ? .5 : 0)); c.rotation.y = ry; scene.add(c); } }
    // diagonal spruce beams overhead
    const beamM = new THREE.MeshLambertMaterial({ color: '#6b4a2a' });
    for (let x = -15; x <= 15; x += 5) for (const s of [-1, 1]) { const b = new THREE.Mesh(new THREE.BoxGeometry(.35, .35, 6.2), beamM); b.position.set(x + .5, 4.9, .5); b.rotation.y = s * .55; scene.add(b); }
    scene.add(new THREE.HemisphereLight('#d8e0f0', '#404048', 1.25));
    for (let x = -14; x <= 14; x += 7) { const l = new THREE.PointLight('#ffc070', 9, 10, 1.2); l.position.set(x, 3.6, .5); scene.add(l); const lan = new THREE.Mesh(new THREE.BoxGeometry(.3, .35, .3), new THREE.MeshBasicMaterial({ color: '#ffc870' })); lan.position.set(x, 4.3, -3.2); scene.add(lan); }
    const p = player(assets, 'killer'); armor(p, 'purple'); scene.add(p);
    const apple = hold(p, pixBox(4, 4, 4, () => [240, 200, 60]), { rx: -.3 });
    const medal = hold(p, pixBox(6, 8, 1, (f, i, j) => j < 3 ? [150, 110, 60] : (i > 1 && i < 4) ? [70, 160, 70] : [120, 86, 44]), { rx: -1.1 }); medal.visible = false;
    const sh = hold(p, pixBox(1, 12, 10, (f, i, j) => (i === 0 || j === 0 || i === 9 || j === 11) && (f === 'px' || f === 'nx') ? [60, 26, 90] : [138, 58, 216]), { rx: -.2 }); sh.position.set(-2, -8, -4); sh.visible = false;
    hold(p, pixBox(2, 8, 2, () => [42, 166, 160]), { rx: -.9, left: true }); // offhand: the teal blocked-slot item
    const qc = M.quantumCreeper(); qc.scale.multiplyScalar(PX); scene.add(qc);
    const tp = M.particlesCube('#bfe8ff', 18, .6, .08); scene.add(tp);
    const boom = M.puffs(30); scene.add(boom); const flash = M.burst(); scene.add(flash);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 120);
    const I = 3.3, AP = 1.68, FS = 2.72, SH = 3.06, Z = -.5;
    const pxAt = t => lerp(-13, -6.4, clamp((t - 1.0) / 1.5));
    const qxAt = t => lerp(1.3, -4.95, ease.out(clamp((t - AP) / (FS + .05 - AP))));
    const v = new THREE.Vector3();
    return {
      scene, ink: { skyA: '#0e1018', skyB: '#1c2030', tint: '#e8eef8', lineW: 2.3 },
      cues: [{ t: AP, type: 'sfx', kind: 'teleport', gain: .35 }, { t: FS, type: 'sfx', kind: 'hiss', dur: .6, gain: .14 }],
      hearts: lt => ({ v: 10 }),
      notes: [
        { t0: 1.17, t1: 2.57, text: 'medalla en mano (falta de slots)', x: 120, y: 270, size: 48, to: () => medal.getWorldPosition(v).clone(), bend: -50 },
        { t0: 1.69, t1: 2.8, text: 'ender quantum creeper', x: 1200, y: 250, size: 50, circle: () => qc.position.clone().add(new THREE.Vector3(0, .9, 0)), r: 80 },
        { t0: 2.3, t1: 3.3, text: 'vida completa… un solo golpe', x: 110, y: 640, size: 50, to: [870, 880], bend: 60 },
        { t0: 2.62, t1: 3.3, text: 'escudo… demasiado tarde', x: 1240, y: 700, size: 50, to: () => sh.getWorldPosition(v).clone(), bend: -40 },
      ],
      overlay(ctx, lt) {
        if (lt >= I) return;
        text(ctx, '01:46:31 para obtener Life Orb', 960, 150, { font: '32px VT', color: '#ffaa00', stroke: '#000', strokeW: 4 });
        const sel = lt < 1.15 ? 4 : lt < SH ? 5 : 6;
        hotbar(ctx, BAR, { sel, off: { k: 'x' } });
        if (lt < .7) tooltip(ctx, 'Golden Apple', '#55ffff');
        else if (lt > 1.15 && lt < 1.95) tooltip(ctx, 'Medalla de Superviviente', '#ffaa00');
        else if (lt >= SH) tooltip(ctx, 'Shield');
        const q = lt < 1.05 ? '«Ah, mira, un creeper. Hala.»' : lt > 1.2 && lt < 2.25 ? '«Ah, mira, otro creeper.»' : null;
        if (q) text(ctx, q, 960, 780, { font: 'italic 700 40px Cinzel', color: '#f3e6d0', stroke: 'rgba(0,0,0,.8)', strokeW: 6 });
      },
      update(lt, T) {
        const px = pxAt(lt), walking = lt > 1.0 && lt < 2.5;
        p.position.set(px, groundAt(w, px, Z, 4), Z);
        face(p, px + 10, lt < 1.0 ? Z + 1.5 : Z);
        pose(p, { idle: T * 2, walk: T * 9, swing: walking ? .55 : 0, armRaise: lt >= SH ? 1.1 : lt < 1.15 ? .7 : .55, headPitch: lt < 1.0 ? -.55 : 0 });
        apple.visible = lt < 1.15; medal.visible = lt >= 1.15 && lt < SH; sh.visible = lt >= SH && lt < I;
        // the Ender Quantum Creeper: appears by the pillar, walks straight at him, flashes and swells
        const qx = qxAt(lt);
        qc.position.set(qx, groundAt(w, qx, Z + .25, 4), Z + .25); face(qc, px, Z); qc.userData.shimmer(T); legs(qc, T, lt < FS);
        qFuse(qc, lt, FS, I);
        qc.visible = lt > AP && lt < I;
        tp.visible = lt > AP - .05 && lt < AP + .45; tp.position.set(1.3, 0, Z + .25); M.animParticles(tp, (lt - AP) * 2.5, { rise: .5, spread: .6 });
        boom.position.set(qx, 1, Z + .25); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - I, { radius: 2.6, size: .5 }); M.animBurst(flash, lt - I, 2.4);
        p.visible = lt < I;
        if (lt < 1.0) return cam(camera, [px + 3.1, 1.15, 2.5], [px - .4, 2.2, Z - .6], 60); // looking up at the ice walls and beams, golden apple
        if (lt < AP) return cam(camera, [px + 1.2, 2.2, 3.4], [px + 1.4, 1.2, Z], 52); // down the hall; the medal in his right hand
        if (lt < 2.75) return cam(camera, [px - 2.6, 2.35, Z + 1.3], [px + 6, 1, Z], 54); // over his shoulder: a shimmering figure by the far pillar comes at him
        if (lt < I) { const k = (lt - 2.75) / (I - 2.75); return cam(camera, [lerp(-5.3, -5.6, k), 2.2, lerp(4.0, 3.7, k)], [-5.65, 1.1, Z], 50); } // side-on: fuse, the shield comes up too late
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(px - 3, px - 6, k), lerp(2.5, 4.3, k), lerp(2.5, 3.3, k)], [px + 1, .5, Z], 56);
      },
    };
  },
};
