// #33 EsVandal — día 59, 23/05/2020 22:58. Verified: ban card (23-05-2020, WITHER SKELETON EMPERADOR) + wiki
// + clip (GersoonSG 21:10–21:20): a very dark Nether nether-brick walkway, fire on a higher netherrack ledge,
// a glowing teal humanoid holding a bow beside the fire, a pale pink one with a dark sword at the right, a
// burning figure above; he catches fire, the totem pops (13 hearts -> 1 + absorption), burns ~3 s ->
// "ha muerto por un flechazo de Esqueleto Wither". The arrows are never seen in the clip; Rubik's documentary
// says a first arrow nearly killed him and a second finished him while he fled, so both are drawn here as
// coming from the bow-holder (the most likely archer; which figure was the Emperor is unknown).
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, fireBits, totemPop, groundAt, stand, PX } from './common.js';
import { heartRow } from '../fx2d.js';

function tint(root, color, k = .9) { root.traverse(o => { if (o.isMesh) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { if (m.emissive) { m.emissive.set(color); m.emissiveIntensity = k; } }); }); }
// flames all over a burning body (model-pixel units)
function bodyFire(n = 24, h = 30) {
  const g = new THREE.Group();
  const mats = ['#ffd24a', '#f88b1c', '#ff5a10', '#ffe98a'].map(c => new THREE.MeshBasicMaterial({ color: c }));
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(2.6, 5, 2.6), mats[i % 4]);
    const a = i * 2.4, r = 4 + (i % 3) * 1.2;
    m.userData = { ph: i * .37, y0: 1 + (i * 11) % h, x: Math.cos(a) * r, z: Math.sin(a) * r * .8 };
    g.add(m);
  }
  g.userData.anim = t => g.children.forEach(m => {
    const u = m.userData, k = (Math.sin(t * 13 + u.ph * 9) + 1) / 2, rise = (t * 2.2 + u.ph) % 1;
    m.position.set(u.x, u.y0 + rise * 5, u.z); m.scale.set(1 - rise * .5, .5 + k * .9, 1 - rise * .5);
  });
  return g;
}
// a flaming arrow (skeletons shooting from a burning spot / wither skeletons with bows fire flaming arrows)
function fireArrow() {
  const g = M.arrow(); g.scale.setScalar(PX * 1.6);
  const f = new THREE.Group(); const mats = ['#ffd24a', '#f88b1c', '#ff5a10'].map(c => new THREE.MeshBasicMaterial({ color: c }));
  for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 2.4), mats[i % 3]); m.position.set(Math.sin(i * 2) * .9, Math.cos(i * 2) * .9, 2 - i * 1.6); f.add(m); }
  g.add(f); return g;
}

export default {
  n: 33, player: 'vandal', name: 'EsVandal', ign: 'EsVandal', day: 59, date: '23/05/2020 · 22:58',
  sfx: 'arrow', impact: 3.45, dur: 5.1, storm: true,
  slow: [{ t: 1.05, d: .6, f: .35 }, { t: 2.9, d: .55, f: .3 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de EsVandal. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['EsVandal, Has sido promocionado al rango boomer', '#aaaaaa'],
    ['[MIEMBRO] EsVandal ☠ ha muerto por un flechazo de Esqueleto Wither', '#ffffff'],
  ],
  build(assets) {
    const w = new World(48, 24, 30, [-24, -10, -15]);
    w.fill(-24, -10, -15, 23, 13, 14, 'netherrack');
    w.fill(-22, -9, -13, 22, 10, 12, 0); // the cavern
    w.fill(-22, -9, -13, 22, -9, 12, 'lava');
    w.fill(-22, -1, -1, 9, -1, 1, 'nether_bricks'); // the fortress walkway
    for (const x of [-16, -8, 0, 8]) w.fill(x - 1, -8, -1, x, -2, 1, 'nether_bricks'); // its pillars
    w.fill(10, -8, -8, 16, 2, 7, 'netherrack'); // the higher ledge ahead
    w.fill(14, 3, -1, 16, 5, 3, 'netherrack'); // and a higher one above it
    w.fill(17, -8, -13, 22, 10, 12, 'netherrack');
    w.set(10, 2, 3, 'glowstone'); w.set(10, 1, 4, 'glowstone');
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#060101');
    scene.add(w.build());
    const gy = (x, z) => groundAt(w, x, z, 9);
    scene.add(new THREE.HemisphereLight('#c08070', '#2a0806', .95));
    const fl = new THREE.PointLight('#ff8a30', 30, 16, 1.2); fl.position.set(11.5, 5, -2.5); scene.add(fl);
    const gl = new THREE.PointLight('#ffd890', 14, 10, 1.2); gl.position.set(9, 3, 3.5); scene.add(gl);
    const lavaL = new THREE.PointLight('#ff6a20', 20, 22, 1.2); lavaL.position.set(-2, -5, 4); scene.add(lavaL);
    const pl = new THREE.PointLight('#ffb080', 9, 7, 1.2); scene.add(pl); // soft fill so he reads in the dark
    const fire = fireBits(8, .6); fire.scale.setScalar(1.8); fire.position.set(11.5, gy(11.5, -2.5), -2.5); scene.add(fire);
    const p = player(assets, 'vandal'); scene.add(p);
    hold(p, M.bow(), { rx: -1.5 });
    const off = hold(p, M.totem(), { rx: -1.2, left: true }); off.scale.setScalar(.8);
    const burn = bodyFire(); p.add(burn); burn.visible = false;
    const skel = (col, k) => { const s = M.skeleton({ wither: true }); s.scale.multiplyScalar(PX); tint(s, col, k); scene.add(s); return s; };
    const teal = skel('#2ad8d0', 1); const tb = new THREE.Group(); tb.add(M.bow()); teal.userData.armR.add(tb); tb.position.set(0, -10, -1); tb.rotation.x = -1.5;
    const pink = skel('#f0b4dc', .8); const ps = new THREE.Group(); ps.add(M.sword('netherite')); pink.userData.armR.add(ps); ps.position.set(0, -10, -1); ps.rotation.x = -1.3;
    const burner = skel('#c8a8e8', .6); const bf = bodyFire(14, 20); bf.position.y = 14; burner.add(bf);
    const arrows = [fireArrow(), fireArrow()]; arrows.forEach(a => scene.add(a));
    const smoke = M.particlesCube('#6a6a6a', 10, 1.2, .18); smoke.position.set(11.5, 3.6, -2.5); scene.add(smoke);
    const pop = totemPop(scene);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 150);
    const I = 3.45, A1 = [1.15, 1.5], A2 = [2.82, 3.42];
    const TEAL = [11.6, -4.6];
    const px = lt => lt < A1[1] ? lerp(-6, -1.2, ease.out(clamp(lt / 1.4))) : lt < 1.9 ? -1.2 : lerp(-1.2, -6.5, clamp((lt - 1.9) / 1.55));
    const aim = new THREE.Vector3(), from = new THREE.Vector3(), at = new THREE.Vector3(), tmp = new THREE.Vector3();
    let now = 0;
    const HIDE = () => camera.position.clone().addScaledVector(camera.getWorldDirection(tmp), -5); // behind the camera = not drawn
    const when = (ok, fn) => () => ok() ? fn() : HIDE();
    const up = (o, h) => () => o.position.clone().add(new THREE.Vector3(0, h, 0));
    return {
      scene, ink: { skyA: '#1a0604', skyB: '#3a100a', tint: '#fff0e6', lineW: 2.3 },
      cues: [{ t: A1[0], type: 'sfx', kind: 'bow' }, { t: A1[1], type: 'sfx', kind: 'hurt', gain: .6 }, { t: A1[1] + .05, type: 'sfx', kind: 'totem' }, { t: A2[0], type: 'sfx', kind: 'bow' }],
      notes: [
        { t0: .15, t1: 1.5, text: 'figura turquesa con arco', x: 1150, y: 610, size: 50, to: up(teal, 2.3) },
        { t0: 0, t1: 1.45, text: 'otra rosa, con espada', x: 1330, y: 250, size: 50, to: when(() => now < A1[0], up(pink, 2.4)), bend: -40 },
        { t0: 1.12, t1: 2.4, text: 'un flechazo: se prende fuego', x: 620, y: 250, size: 50, to: up(p, 1.5), bend: -50 },
        { t0: 1.55, t1: 3.25, text: 'salta el tótem:\n1 corazón + absorción', x: 1180, y: 690, size: 50, to: [905, 848], bend: -40 },
        { t0: 2.45, t1: 3.45, text: 'huyendo, otra flecha lo remata', x: 560, y: 250, size: 50, to: when(() => now > 2.85 && now < 3.42, () => arrows[1].position.clone()), bend: -40 },
      ],
      overlay(ctx, lt) {
        if (lt >= I) return;
        // 13 hearts (10 + a second row of 3); after the totem: 1 red + 4 gold absorption, burning
        let v = 13, gold = 0;
        if (lt > A1[1]) { v = 1; gold = 4; }
        if (lt > 2.0) v = 2;
        if (lt > 2.5) { v = 1.5; gold = 3; }
        if (lt > 3.0) { v = 1; gold = 2; }
        const blink = (lt > A1[1] && lt < A1[1] + .35) || (lt > 2.5 && lt < 2.65) || (lt > 3.0 && lt < 3.15);
        const y = 884, x0 = 800, wd = 32;
        heartRow(ctx, Math.min(v, 10), { x: 960, y, n: 10, blink });
        heartRow(ctx, Math.max(0, v - 10), { x: x0 + 3 * wd / 2, y: y - 30, n: 3, blink });
        if (gold) heartRow(ctx, gold, { x: x0 + 3 * wd + gold * wd / 2, y: y - 30, n: gold, variant: 'gold' });
      },
      update(lt, T) {
        now = lt;
        const x = px(lt);
        stand(p, w, x, 0, 0, 9);
        const fleeing = lt > 1.9;
        if (fleeing) face(p, -20, .3); else face(p, TEAL[0], TEAL[1]);
        pose(p, { idle: T * 2, walk: T * (fleeing ? 13 : 8), swing: lt < A1[1] ? .45 : fleeing ? .8 : 0, armRaise: fleeing ? .3 : 1.5, headPitch: fleeing ? 0 : -.3 });
        burn.visible = lt > A1[1]; burn.userData.anim(T); fire.userData.anim(T); bf.userData.anim(T);
        off.visible = lt < A1[1] + .05;
        M.animParticles(smoke, T * .6, { rise: .6, spread: 1.2 });
        // the three figures up on the ledges, facing him
        stand(teal, w, TEAL[0], TEAL[1], 0, 9);
        const px2 = 12.6 + Math.sin(T * 1.1) * .6; stand(pink, w, px2, 4.3, 0, 9);
        const bx = 15.2 + Math.sin(T * 1.9) * .6, bz = 1 + Math.cos(T * 1.5) * .8; stand(burner, w, bx, bz, 0, 9);
        [teal, pink, burner].forEach((m, i) => face(m, x, 0));
        const drawing = (lt > .55 && lt < A1[0]) || (lt > 2.45 && lt < A2[0]);
        pose(teal, { idle: T * 2, armRaise: drawing ? 1.6 : 1.35, headPitch: .25 }); teal.userData.armL.rotation.x = -1.45;
        pose(pink, { idle: T + 1, walk: T * 6, swing: .4, armRaise: .5 });
        pose(burner, { idle: T + 2, walk: T * 9, swing: .7, armRaise: .2 });
        // the two flaming arrows from the teal bow-holder
        [A1, A2].forEach(([t0, t1], k) => {
          const a = arrows[k], f = (lt - t0) / (t1 - t0);
          a.visible = f > 0 && f < 1;
          from.set(TEAL[0] - .4, teal.position.y + 1.9, TEAL[1] + .2);
          aim.set(px(t1), 1.25, 0);
          a.position.lerpVectors(from, aim, clamp(f)); a.position.y += Math.sin(clamp(f) * Math.PI) * .6;
          a.lookAt(aim);
        });
        fl.intensity = 30 + Math.sin(T * 9) * 5; pl.position.set(x - 1.5, 3, 2); pl.intensity = lt > A1[1] ? 14 + Math.sin(T * 11) * 3 : 9;
        p.visible = lt < I;
        at.set(x, 1.1, 0);
        let c;
        if (lt < A1[0]) c = cam(camera, [x - 4.2, 3.1, 1.9], [9, 2.4, -.6], 50); // the walkway; fire, a teal bow-holder, a pink one, a burning one above
        else if (lt < A1[1] + .05) c = cam(camera, [3.5, 3.4, 9.5], [5, 2, -1.8], 60); // the teal one shoots: a flaming arrow
        else if (lt < 2.55) c = cam(camera, [x + 3.4, 2.1, 2.6], [x - .2, 1.2, 0], 56); // on fire; the totem pops
        else if (lt < I) c = cam(camera, [x + 3.8, 3.3, 9.2], [x + 4.6, 1.9, -1.2], 60); // he flees, burning; the second arrow chases him
        else { const k = ease.out(clamp((lt - I) / 1.6)); const dx = px(I); c = cam(camera, [lerp(dx - 3.5, dx - 6, k), lerp(2.6, 5.5, k), lerp(3, 5, k)], [dx + 1, .2, 0], 55); }
        pop(camera, lt - A1[1] - .05, at);
        return c;
      },
    };
  },
};
