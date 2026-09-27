// #31 BriiHD (ElBrean) — día 50, 14/05/2020 07:59. Verified: wiki (Ghast Demoníaco, sin tótem: "No Equipado (Por
// falta de slots)") + clip (GersoonSG 19:32–19:45): a huge circular arena in the Nether (grey speckled ring wall, dark
// red floor with a grid of small light dots and long thin grey lines), dozens of zombie pigmen in diamond armour
// swarming the central build, arrows stuck everywhere; he stands high on the build and shoots his bow "Barret .50" at
// the wall; a small flame hangs above the far wall; he looks down at the swarm; a giant fireball fills the screen ->
// "was blown up by Ghast Demoníaco" from 10/10 hearts. HUD: totem in hotbar slot 7, offhand = teal blocked-slot item.
// Rubik's documentary: it was his gold farm; with no free slot he had no offhand totem; one fireball killed him.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, armor, groundAt, PX } from './common.js';
import { hotbar, tooltip, slotXY, offXY } from './lib_d31_d39.js';

const BAR = [{ k: 'sword' }, { k: 'pick' }, { k: 'potion', c: '#f070c0' }, { k: 'item', c: '#5a1a1a' }, { k: 'x', n: 32 }, { k: 'gapple' }, { k: 'totem' }, { k: 'bow', glint: true }, { k: 'carrot', n: 59 }];

export default {
  n: 31, player: 'brii', name: 'BriiHD', ign: 'ElBrean', day: 50, date: '14/05/2020 · 07:59',
  sfx: 'fireball', impact: 3.15, dur: 4.9, storm: true,
  slow: [{ t: 1.72, d: .5, f: .35 }, { t: 2.45, d: .7, f: .3 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de ElBrean. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['Ahora por fin descansa en paz...', '#aaaaaa'],
    ['[MIEMBRO] ElBrean was blown up by Ghast Demoníaco', '#ffffff'],
  ],
  build(assets) {
    const R = 24;
    const w = new World(58, 24, 58, [-29, -4, -29]);
    for (let x = -29; x < 29; x++) for (let z = -29; z < 29; z++) {
      const d = Math.hypot(x + .5, z + .5);
      if (d > R + 2.5) continue;
      w.fill(x, -3, z, x, -1, z, 'netherrack');
      if (d > R) w.fill(x, 0, z, x, 5, z, 'stone'); // the grey speckled ring wall
    }
    // the central build (centre at .5,.5): two stone-brick steps, a wooden column, a plank top with a few blocks
    w.fill(-4, 0, -4, 4, 0, 4, 'stone_bricks'); w.fill(-3, 1, -3, 3, 1, 3, 'stone_bricks');
    w.fill(-1, 2, -1, 1, 6, 1, 'planks'); for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) w.fill(x, 2, z, x, 6, z, 'log');
    w.fill(-2, 7, -2, 2, 7, 2, 'planks');
    w.set(2, 8, 2, 'quartz'); w.set(-2, 8, 2, 'purpur'); w.set(-2, 8, 1, 'quartz'); w.set(2, 8, 1, 'glowstone'); // behind him
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#3a0a08');
    scene.fog = new THREE.Fog('#3a0a08', 26, 70);
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#fff2ea', '#5a2a24', 1.45));
    const key = new THREE.DirectionalLight('#ffe0c8', .6); key.position.set(8, 20, 12); scene.add(key);
    // floor: grid of small light dots + long thin grey lines
    const dotG = new THREE.BoxGeometry(.16, .03, .16), dotM = new THREE.MeshBasicMaterial({ color: '#e8d2c0' });
    const pts = []; for (let x = -R; x <= R; x += 2) for (let z = -R; z <= R; z += 2) if (Math.hypot(x, z) < R - .6 && Math.max(Math.abs(x - .5), Math.abs(z - .5)) > 5) pts.push([x, z]);
    const dots = new THREE.InstancedMesh(dotG, dotM, pts.length); const mx = new THREE.Matrix4();
    pts.forEach(([x, z], i) => { mx.makeTranslation(x, .015, z); dots.setMatrixAt(i, mx); }); scene.add(dots);
    for (const [a, off] of [[.35, -6], [-.5, 9], [1.3, 3]]) { const l = new THREE.Mesh(new THREE.BoxGeometry(.07, .04, 2 * R), new THREE.MeshLambertMaterial({ color: '#9a9a9a' })); l.rotation.y = a; l.position.set(Math.cos(a) * off, .02, -Math.sin(a) * off); scene.add(l); }
    // arrows stuck in the floor
    for (let i = 0; i < 46; i++) { const a = M.arrow(); a.scale.setScalar(PX); const r = 6 + (i * 37 % 16), an = i * 2.39; a.position.set(.5 + Math.cos(an) * r, .2, .5 + Math.sin(an) * r); a.rotation.order = 'YXZ'; a.rotation.set(1.05 + (i % 3) * .15, i * 1.7, 0); scene.add(a); }

    // Brii on top of the build, bow drawn
    const C = [.5, .5];
    const p = player(assets, 'brii'); scene.add(p);
    p.position.set(C[0], groundAt(w, C[0], C[1]), C[1]);
    const bowG = hold(p, M.bow(), { rx: -1.5 });
    // zombie pigmen in diamond armour: on both steps and all over the floor around the build
    const pig = [];
    const ring = (n, d, ph) => Array.from({ length: n }, (_, i) => { const a = ph + i / n * Math.PI * 2, c = Math.cos(a), s = Math.sin(a), k = d / Math.max(Math.abs(c), Math.abs(s)); return [C[0] + c * k, C[1] + s * k]; });
    const spots = [...ring(8, 2.5, .3), ...ring(12, 4.0, .1)];
    for (let i = 0; i < 20; i++) { const a = i * 2.39996 + .4, r = 6 + (i * 53 % 70) / 10; spots.push([C[0] + Math.cos(a) * r, C[1] + Math.sin(a) * r]); }
    for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * .22, r = 14 + (i * 7 % 5); spots.push([C[0] + Math.cos(a) * r, C[1] + Math.sin(a) * r]); } // scattered out towards the far wall
    spots.forEach(([x, z], i) => {
      const m = M.piglin({ zombified: true }); armor(m, 'diamond'); m.scale.multiplyScalar(PX);
      if (i % 3 === 0) hold(m, M.sword('gold'), { rx: -1.3 });
      m.userData.home = [x, z]; m.position.set(x, groundAt(w, x, z, 6), z); face(m, C[0], C[1]); scene.add(m); pig.push(m);
    });
    const pigA = pig[10], pigB = pig[pig.length - 1];
    // his arrows (three shots at the ring wall)
    const shots = [1.5, 1.85, 2.2].map((t0, i) => { const a = M.arrow(); a.scale.setScalar(PX * 1.6); a.rotation.order = 'YXZ'; scene.add(a); return { a, t0, to: new THREE.Vector3(-4 + i * 4, 3 + i, -Math.sqrt(R * R - 16) + .6) }; });
    // the Ghast Demoníaco's fireball: a small flame above the far wall, then point-blank
    const ball = M.fireball(26); ball.scale.multiplyScalar(PX); scene.add(ball);
    const trail = [0, 1, 2, 3].map(i => { const f = M.fireball(14 - i * 3); f.scale.multiplyScalar(PX); scene.add(f); return f; });
    [ball, ...trail].forEach(g => g.traverse(o => { if (o.isMesh) (Array.isArray(o.material) ? o.material : [o.material]).forEach(mm => { mm.fog = false; }); }));
    const boom = M.puffs(32); scene.add(boom); const flash = M.burst('#ffd070'); scene.add(flash);
    const camera = new THREE.PerspectiveCamera(58, 16 / 9, .05, 200);
    const I = 3.15, FB0 = 1.72;
    const P0 = new THREE.Vector3(5, 17, -46), P1 = new THREE.Vector3(C[0], p.position.y + 1.7, C[1] - .1);
    const ballAt = t => P0.clone().lerp(P1, clamp((t - FB0) / (I - FB0)));
    const eye = () => new THREE.Vector3(C[0], p.position.y + 1.62, C[1]);
    const bowAt = new THREE.Vector3();
    let shot = 1;
    return {
      scene, ink: { skyA: '#4a0e08', skyB: '#8a3020', tint: '#fff4ec', lineW: 2.3 },
      cues: [{ t: 1.5, type: 'sfx', kind: 'bow' }, { t: 1.85, type: 'sfx', kind: 'bow' }, { t: 2.2, type: 'sfx', kind: 'bow' }, { t: 2.3, type: 'sfx', kind: 'shoot' }],
      hearts: lt => ({ v: 10 }),
      notes: [
        { t0: .12, t1: 2.0, text: 'pigmen con armadura de diamante', x: 1150, y: 400, size: 50, to: () => (shot === 1 ? pigA : pigB).position.clone().add(new THREE.Vector3(0, 2.1, 0)), bend: -40 },
        { t0: 1.45, t1: 2.4, text: 'arco "Barret .50"', x: 150, y: 560, size: 50, to: () => bowAt.clone(), bend: 50 },
        { t0: 1.75, t1: 2.75, text: 'la bola del Ghast Demoníaco', x: 1120, y: 560, size: 48, circle: () => ball.position.clone(), r: 50, to: () => ball.position.clone(), dy: 58, bend: -30 },
        { t0: 2.3, t1: 3.15, text: 'vida completa… y un solo golpe', x: 110, y: 660, size: 50, to: [880, 880], bend: 60 },
        { t0: 2.45, t1: 3.15, text: 'sin tótem: no le quedaban slots', x: 1200, y: 760, size: 46, to: () => slotXY(6).map((v, i) => v - [0, 30][i]), bend: -50 },
      ],
      overlay(ctx, lt) {
        if (lt >= I) return;
        const sel = lt > 1.18 && lt < 1.42 ? 6 : 7;
        hotbar(ctx, BAR, { sel, off: { k: 'x' } });
        if (sel === 6) tooltip(ctx, 'Totem of Undying', '#ffff55');
        else if (lt > 1.42 && lt < 2.3) tooltip(ctx, 'Barret .50', '#55ffff', true);
      },
      update(lt, T) {
        // Brii: faces the far wall, bow drawn while shooting, then looks straight down at the swarm
        face(p, C[0], -30);
        const aim = lt < 2.35;
        pose(p, { idle: T * 2, armRaise: aim ? 1.55 : .5, headPitch: aim ? -.05 : .95 });
        p.userData.armL.rotation.x = aim ? -1.45 : -.2; p.userData.armL.rotation.z = aim ? -.35 : .04;
        bowG.getWorldPosition(bowAt);
        // pigmen: shuffling and pushing against the build, feet always on the block under them
        pig.forEach((m, i) => {
          const [hx, hz] = m.userData.home, k = Math.sin(T * 3 + i * 1.3) * .12;
          const dx = C[0] - hx, dz = C[1] - hz, dl = Math.hypot(dx, dz) || 1;
          const x = hx + dx / dl * k, z = hz + dz / dl * k;
          m.position.set(x, groundAt(w, x, z, 6), z); face(m, C[0], C[1]);
          pose(m, { idle: T + i, walk: T * 7 + i, swing: .35, armRaise: (i % 3 === 0) ? .9 + Math.sin(T * 5 + i) * .4 : .2, headPitch: -.35 * Math.min(1, 6 / dl) });
        });
        shots.forEach(({ a, t0, to }) => {
          const from = new THREE.Vector3(C[0] + .3, p.position.y + 1.35, C[1] - .8);
          const k = clamp((lt - t0) / .42);
          a.visible = lt > t0;
          a.position.copy(from).lerp(to, k);
          const d = to.clone().sub(from).normalize(); a.rotation.set(-Math.asin(d.y), Math.atan2(d.x, d.z), 0);
        });
        const bp = ballAt(lt);
        ball.visible = lt > FB0 && lt < I; ball.position.copy(bp); ball.rotation.set(T * 2, T * 3, 0);
        const dir = P1.clone().sub(P0).normalize();
        trail.forEach((f, i) => { f.visible = ball.visible; f.position.copy(bp).addScaledVector(dir, -(i + 1) * .9 - Math.sin(T * 20 + i) * .1); f.rotation.set(T * 5 + i, T * 4, 0); });
        boom.position.copy(P1); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - I, { radius: 3, size: .6 }); M.animBurst(flash, lt - I, 4);
        p.visible = lt < I;
        const E = eye();
        if (lt < 1.45) { shot = 1; const k = lt / 1.45; return cam(camera, [lerp(15, 11, k), lerp(13, 12, k), lerp(15, 18, k)], [0, 4, 0], 55); } // the arena, the swarm, him on top
        shot = 2;
        if (lt < 2.35) return cam(camera, [C[0] + 2.4, E.y + 2.1, C[1] + 5.2], [C[0] - .5, 5, -20], 62); // over his shoulder: shooting the ring wall; a flame far above it
        if (lt < 2.72) { const k = (lt - 2.35) / .37; return cam(camera, [20, 10, lerp(-1, -2.5, k)], [0, 9, -10], 58); } // wide, from the side: he looks down, the fireball comes over the wall
        if (lt < 3.05) { const k = (lt - 2.72) / .33; return cam(camera, [lerp(7.5, 6.8, k), 12.5, lerp(4.5, 4, k)], [0, 10, -4], 55); } // closer: it's on him
        if (lt < I) return cam(camera, [E.x, E.y, E.z], [C[0], 8.8, -3], 70); // his view: it fills the screen
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(5, 11, k), lerp(13, 16, k), lerp(6, 13, k)], [0, 7, 0], 55);
      },
    };
  },
};
