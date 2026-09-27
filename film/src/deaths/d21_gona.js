// #21 Gona89 — día 34, 28/04/2020 17:03. Verified: wiki (Shulker Explosivo, tótem no activado 1%) +
// clip (GersoonSG 12:41–12:56): inside an End City tower, a narrow purpur shaft, shulkers on the
// walls; he drops down step by step, switches to the diamond sword, looks up at two open shulkers,
// grey smoke swells around the upper-left one, camera swings down -> "Gona89_YT ha explotado" from full health.
// Drawn as a cutaway of the tower (front wall removed) so the shaft can be read from outside.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, groundAt, PX } from './common.js';
import { pixBox } from '../mobs.js';

// shulker stuck to a surface: 'floor' | 'nx' (left wall, opens toward +x) | 'px' (right wall) | 'nz' (back wall, opens toward +z)
function wallShulker(scene, x, y, z, side, ph) {
  const s = M.shulker(); s.scale.multiplyScalar(PX);
  const g = new THREE.Group(); g.add(s); g.position.set(x, y, z);
  if (side === 'nx') g.rotation.z = -Math.PI / 2;
  if (side === 'px') g.rotation.z = Math.PI / 2;
  if (side === 'nz') g.rotation.x = Math.PI / 2;
  scene.add(g);
  return { g, s, ph };
}

export default {
  n: 21, player: 'gona', name: 'Gona89', ign: 'Gona89_YT', day: 34, date: '28/04/2020 · 17:03',
  sfx: 'explosion', impact: 2.8, dur: 4.6,
  slow: [{ t: 1.95, d: .85, f: .3 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de Gona89_YT. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['Verdaderamente lamentable', '#aaaaaa'],
    ['[MIEMBRO] Gona89_YT ha explotado', '#ffffff'],
  ],
  build(assets) {
    const w = new World(28, 42, 28, [-14, -8, -14]);
    for (let x = -14; x < 14; x++) for (let z = -14; z < 14; z++) { const d = Math.hypot(x, z); if (d < 13 + Math.sin(x * .7) * 1.2) w.fill(x, -8, z, x, -4 - (d > 10 ? 1 : 0), z, 'end_stone'); }
    // the tower: purpur walls, end-brick bands, open at the front (+z) = cutaway
    w.fill(-3, -3, -3, 3, 26, 2, 'purpur');
    w.fill(-2, -2, -2, 2, 26, 2, 0); // the shaft (interior 5 x 4)
    w.fill(-2, -3, -2, 2, -3, 1, 'end_bricks'); // shaft floor
    for (const y of [4, 12, 20]) { w.fill(-3, y, -3, -3, y, 2, 'end_bricks'); w.fill(3, y, -3, 3, y, 2, 'end_bricks'); w.fill(-3, y, -3, 3, y, -3, 'end_bricks'); }
    w.fill(-4, 26, -4, 4, 27, 3, 'purpur'); w.fill(-2, 26, -2, 2, 27, 1, 0); // wider cap at the top
    // ledges spiralling down the walls
    const ledges = [[2, 16, -2], [1, 16, -2], [-2, 14, -1], [-2, 14, 0], [1, 12, -2], [2, 12, -2], // above
      [2, 9, -1], [2, 9, 0], [1, 8, -2], [0, 7, -2], [-1, 7, -2], [-2, 6, -2], [-2, 6, -1], [-2, 5, 0], [-2, 5, 1], // his way down
      [1, 2, -2], [2, 2, -2], [2, 0, 1]];
    ledges.forEach(([x, y, z]) => w.set(x, y, z, 'purpur'));
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#120b18');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#ece0fa', '#3a2a48', 1.45));
    const inner = new THREE.PointLight('#f0e4ff', 14, 16, 1.2); inner.position.set(0, 9, 1); scene.add(inner);
    const fill = new THREE.DirectionalLight('#f4ecff', 1.0); fill.position.set(4, 14, 16); scene.add(fill);

    const p = player(assets, 'gona'); scene.add(p);
    const sword = hold(p, M.sword('diamond'), { rx: -1.3 });
    const block = hold(p, pixBox(6, 6, 6, (f, i, j) => (i === 0 || j === 0) ? [138, 95, 138] : [175, 130, 175]), { rx: -.3 }); block.position.y -= 2;
    hold(p, M.totem(), { rx: -1.2, left: true }).scale.setScalar(.8);
    // shulkers on the walls, opening and closing
    const shs = [
      wallShulker(scene, -2, 10.5, .5, 'nx', 0), // A: upper left (the smoke)
      wallShulker(scene, .5, 11.5, -2, 'nz', 1.1), // B: upper, back wall
      wallShulker(scene, 1.5, -2, -.5, 'floor', 2.3), // C: on the floor below
      wallShulker(scene, 3, 3.5, -.5, 'px', 3.1), // D: right wall, low
      wallShulker(scene, -.5, 15.5, -2, 'nz', 4.2), // E: high up
      wallShulker(scene, 3, 13.5, .5, 'px', 5.0), // F
    ];
    const smoke = M.puffs(26, '#8e8e8e'); smoke.position.set(-1.3, 10.9, .5); scene.add(smoke);
    smoke.children.forEach(m => { m.material.opacity = .7; });
    const boom = M.puffs(26); scene.add(boom);
    const flash = M.burst(); scene.add(flash);
    const camera = new THREE.PerspectiveCamera(60, 16 / 9, .05, 120);
    const I = 2.8, SWORD = 1.62;
    // ledge stops [x, z] and the drops between them (start time)
    const stops = [[2.5, .1], [1.5, -1.5], [-.2, -1.5], [-1.5, -1.2], [-1.5, .9]];
    const drops = [.55, .82, 1.09, 1.36];
    const DT = .24;
    const top = (x, z, yHint) => groundAt(w, x, z, Math.round(yHint));
    const Y = stops.map((s, i) => top(s[0], s[1], 11 - i));
    const where = lt => {
      let i = 0; while (i < drops.length && lt >= drops[i] + DT) i++;
      if (i < drops.length && lt >= drops[i]) {
        const k = (lt - drops[i]) / DT, [x0, z0] = stops[i], [x1, z1] = stops[i + 1];
        return [lerp(x0, x1, k), lerp(Y[i], Y[i + 1], k) + Math.sin(k * Math.PI) * .45, lerp(z0, z1, k)];
      }
      return [stops[i][0], Y[i], stops[i][1]];
    };
    const A = shs[0].g.position, B = shs[1].g.position, tmp = new THREE.Vector3();
    let now = 0;
    const SWING = 2.45;
    const HIDE = () => camera.position.clone().addScaledVector(camera.getWorldDirection(tmp), -5); // behind the camera = not drawn
    const when = (ok, fn) => () => ok() ? fn() : HIDE();
    return {
      scene, ink: { skyA: '#1a1024', skyB: '#3a2a4a', tint: '#efe6ff', lineW: 2.2 },
      cues: [...drops.map(t => ({ t: t + DT, type: 'sfx', kind: 'pop', gain: .12 })), { t: 2.05, type: 'sfx', kind: 'hiss', dur: .6 }],
      hearts: lt => ({ v: 10 }),
      notes: [
        { t0: .05, t1: 2.05, text: 'dentro de una torre del end', x: 1150, y: 230, size: 50 },
        { t0: .6, t1: 2.2, text: 'baja de repisa en repisa', x: 1150, y: 330, size: 50, to: () => p.position.clone().add(new THREE.Vector3(0, 1.1, 0)), bend: -40 },
        { t0: 1.62, t1: 2.6, text: 'mira arriba:\ndos shulkers abiertos', x: 1120, y: 480, size: 50, to: when(() => now < SWING, () => B.clone().add(new THREE.Vector3(0, 0, .5))), bend: 50 },
        { t0: 1.98, t1: 2.8, text: 'humo gris alrededor de uno', x: 600, y: 250, size: 50, circle: when(() => now < SWING + .08, () => A.clone().add(new THREE.Vector3(.5, .3, 0))), r: 110 },
        { t0: 3.0, t1: 5.5, text: 'llevaba tótem: no se activó (1%)', x: 1100, y: 240, size: 48 },
      ],
      update(lt, T) {
        now = lt;
        const [x, y, z] = where(lt);
        p.position.set(x, y, z);
        const looking = lt > 1.62;
        if (lt < .55) face(p, 0, -1); else if (!looking) { const nx = stops[Math.min(4, drops.filter(d => lt > d - .1).length)]; face(p, nx[0], nx[1]); } else face(p, A.x + .2, A.z - .6);
        pose(p, { idle: T * 2, walk: T * 9, swing: lt > .5 && lt < 1.62 ? .3 : 0, headPitch: lt < .55 ? -.8 : looking ? -1.05 : .45, armRaise: lt > SWORD && lt < 2.45 ? .9 : .4 });
        sword.visible = lt >= SWORD; block.visible = lt < SWORD;
        shs.forEach(({ s, ph }, i) => {
          let k = clamp(Math.sin(T * 1.3 + ph) * 1.4 + .4);
          if (i < 2 && lt > 1.55) k = Math.max(k, clamp((lt - 1.55) / .3)); // the two above him: open
          s.userData.open(k);
          s.userData.head.rotation.y = Math.sin(T * .9 + ph) * .5;
        });
        // grey smoke swelling around the upper-left shulker
        M.animPuffs(smoke, lt > 2.0 ? (lt - 2.0) * .5 : -1, { radius: 1.0, size: .95 });
        boom.position.set(x - .6, y + 1.1, z); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - I, { radius: 1.8, size: .5 });
        M.animBurst(flash, lt - I, 1.2);
        p.visible = lt < SWING;
        if (lt < .55) return cam(camera, [lerp(1.2, .6, lt / .55), 11.2, 16.5], [0, 9, -.5], 48); // the End City tower in section: purpur shaft, shulkers
        if (lt < 1.7) return cam(camera, [lerp(3.2, 1.6, (lt - .55) / 1.15), y + 2.3, 8.5], [lerp(1.2, -.8, (lt - .55) / 1.15), y + .9, -1], 50); // he drops down ledge by ledge
        if (lt < SWING) return cam(camera, [lerp(3.9, 3.5, (lt - 1.7) / .75), 6.4, 8.2], [-.8, 8.7, -.4], 55); // 3/4 cutaway: sword out, he looks up at two open shulkers; grey smoke
        if (lt < I) { const k = ease.inOut(clamp((lt - SWING) / .3)); return cam(camera, [-1.1, 7.75, 1.7], [lerp(-1.7, 1, k), lerp(10.8, -2, k), lerp(0, -.8, k)], 64); } // his view swings down: another shulker below
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(2.5, 4.5, k), lerp(8.5, 11.5, k), lerp(7, 12, k)], [-1.2, 6.2, .2], 55);
      },
    };
  },
};
