// #5 Felipez360 (xXmineCr4fterXx) — día 10, 04/04/2020 20:19. Verified: wiki (Araña, tótem consumido)
// + clip from teammate Th3Antonio's stream (GersoonSG 3:04–3:30): stone-brick corridors with a rail
// track; Felipez in full diamond armor fights a big spider with a diamond sword (MitisyyLeDivorce, also in
// diamond, with them); at the far end of the corridor green/yellow totem particles burst around him with the
// spider flashing red at his feet; ~8 s later he backs into an oak doorway with the spider at his legs,
// flashes red, and is gone in a burst of dropped items. Death Train notice seen in killercreeper's POV.
// Not his POV: no hearts HUD and no 2D totem overlay (world particles only).
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, armor, rails, hurt, totemPop, stand, PX } from './common.js';

const Z = .5;       // centre line of the 3-wide corridor (blocks z = -1..1)
const T_TOT = 1.55; // totem pops
const DOOR = 10.55, DZ = 1.05; // where he ends: inside the oak doorway (blocks x = 10, z = 0..1)
const TB = 2.75;   // he turns to face the spider and backs into the doorway

export default {
  n: 5, player: 'felipez', name: 'Felipez360', ign: 'xXmineCr4fterXx', day: 10, date: '04/04/2020 · 20:19',
  sfx: 'hit', impact: 3.35, dur: 5.0, storm: true,
  slow: [{ t: 1.45, d: .7, f: .35 }, { t: TB, d: .65, f: .33 }],
  note: 'VISTO DESDE EL DIRECTO DE TH3ANTONIO',
  chat: [
    ['xXmineCr4fterXx left the game', '#ffff55'],
    ['Comienza el Death Train con duración de 11 horas!', '#ff5555'],
  ],
  build(assets) {
    const w = new World(36, 10, 16, [-18, -2, -8]);
    w.fill(-18, -2, -8, 17, 7, 7, 'stone_bricks');
    w.fill(-16, 0, -1, 9, 3, 1, 0);           // rail corridor
    w.fill(11, 0, -4, 16, 4, 4, 0);           // room at the end (wall x = 10)
    w.fill(10, 0, 0, 10, 1, 1, 0);            // oak doorway: 2 wide, 2 tall
    for (let x = -16; x <= -4; x += 3) { w.set(x, 0, 1, (x / 3) % 2 ? 'cobble' : 'planks'); } // blocks along the side
    w.fill(15, 0, -4, 16, 0, -3, 'planks'); // chest-ish blocks in the room
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#050505');
    scene.add(w.build());
    const r = rails(25); r.position.set(-16, 0, Z); scene.add(r);
    // open oak door leaf, against the side of the doorway (room side)
    const oak = new THREE.MeshLambertMaterial({ color: '#8a6a3a' });
    const door = new THREE.Mesh(new THREE.BoxGeometry(.9, 2, .16), oak); door.position.set(11.5, 1, .08); scene.add(door);
    scene.add(new THREE.HemisphereLight('#c8c8d8', '#303030', 1.2));
    for (let x = -12; x <= 6; x += 6) { const t = torch(); t.scale.setScalar(PX); t.position.set(x, 1.6, -.9); t.rotation.x = .4; scene.add(t); const l = new THREE.PointLight('#ffc070', 7, 8, 1.3); l.position.set(x, 2.2, -.4); scene.add(l); }
    for (const [x, z] of [[15.5, -3.8], [15.5, 3.8]]) { const l = new THREE.PointLight('#ffc070', 7, 9, 1.3); l.position.set(x, 2.4, z * .8); scene.add(l); const t = torch(); t.scale.setScalar(PX); t.position.set(x, 1.6, z); scene.add(t); }

    const p = player(assets, 'felipez'); armor(p, 'diamond'); scene.add(p);
    hold(p, M.sword('diamond'), { rx: -1.3 });
    const sp = M.spider(); sp.scale.multiplyScalar(PX * 1.12); scene.add(sp);
    const spGlow = []; sp.traverse(o => { if (o.isMesh) [].concat(o.material).forEach(m => m.emissive && spGlow.push(m)); });
    const pop = totemPop(scene, { overlay: false }); // another player's POV: only the world particles
    const linger = M.particlesCube('#3cb043', 26, 1.4, .08); scene.add(linger);
    const linger2 = M.particlesCube('#f5d547', 18, 1.4, .08); scene.add(linger2);
    const drops = new THREE.Group(); scene.add(drops);
    const dc = ['#5fe0d8', '#5fe0d8', '#8a6a3a', '#f5d547', '#dcdcdc', '#3a2a1a', '#5fe0d8', '#b8b8b8'];
    for (let i = 0; i < 18; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, .2), new THREE.MeshLambertMaterial({ color: dc[i % dc.length], emissive: dc[i % dc.length], emissiveIntensity: .25 })); m.userData.d = new THREE.Vector3(Math.sin(i * 2.4) * (.5 + (i % 3) * .3), 1, Math.cos(i * 2.4) * (.3 + (i % 2) * .2)); drops.add(m); }
    const camera = new THREE.PerspectiveCamera(58, 16 / 9, .05, 100);
    const I = 3.35;
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    let px = 0;
    return {
      scene, ink: { skyA: '#141210', skyB: '#221e18', tint: '#f2f0ea', lineW: 2.3 },
      cues: [{ t: .5, type: 'sfx', kind: 'hurt', gain: .2 }, { t: 1.0, type: 'sfx', kind: 'hurt', gain: .2 }, { t: T_TOT, type: 'sfx', kind: 'totem' }, { t: 2.4, type: 'sfx', kind: 'hurt', gain: .25 }, { t: 3.12, type: 'sfx', kind: 'hurt', gain: .3 }],
      notes: [
        { t0: .05, t1: 1.62, text: 'pelea con una araña', x: 1180, y: 250, size: 54, to: () => sp.position.clone().add(V(0, .7, 0)), ax: 1300, ay: 290, bend: 50 },
        { t0: 1.5, t1: 2.2, text: 'le salta el tótem', x: 1200, y: 260, size: 56, to: () => p.position.clone().add(V(.1, 1.5, 0)), ax: 1320, ay: 300, bend: 60 },
        { t0: 2.25, t1: 3.35, text: 'la araña, en sus piernas', x: 1120, y: 780, size: 54, to: () => sp.position.clone().add(V(.3, .5, 0)), ax: 1250, ay: 750, bend: -60 },
        { t0: 3.55, t1: 6.0, text: 'muere ~8 s después del tótem', x: 1100, y: 240, size: 50 },
      ],
      update(lt, T) {
        // A: fight down the rail corridor (spider ahead of him)  B: totem at the far end  C: back into the doorway
        if (lt < 2.2) px = lerp(-4, 3.2, lt / 2.2);
        else if (lt < TB) px = lerp(7.2, 9.8, clamp((lt - 2.2) / (TB - 2.2))); // (after the cut: ~8 s later, near the door)
        else px = lerp(9.8, DOOR, ease.out(clamp((lt - TB) / .4)));
        const fz = lt < 2.2 ? Z + .3 : lt < TB ? .9 : DZ; // offset from the spider so both read
        stand(p, w, px, fz, 0, 1);
        const backing = lt >= TB;
        face(p, backing ? px - 3 : px + 3, fz);
        const hitting = lt < 2.2 || backing;
        const armUp = hitting && Math.sin(T * 14) > .3;
        const walking = lt >= 2.2 && lt < TB + .4;
        pose(p, { idle: T * 2, walk: T * 11, swing: walking ? .8 : .35, armRaise: armUp ? 1.7 : .4 });
        // the spider: ahead of him in the corridor, then right at his feet; after the cut it chases him to the door
        const sx = lt < 2.2 ? px + (lt > 1.3 ? .95 : 1.15 + Math.sin(T * 3) * .2) : lt < TB ? px - 1.05 : Math.min(px - .66, 9.95);
        stand(sp, w, sx, (lt < 2.2 ? Z - .5 : lt < TB ? .3 : .2) + Math.sin(T * 4) * .06, 0, 1);
        sp.rotation.y = lt < 2.2 ? -Math.PI / 2 - .25 : Math.PI / 2 - (lt < TB ? 0 : .45); // at the door it turns its red eyes to us
        sp.userData.legs.forEach((l, i) => l.rotation.x = Math.sin(T * 22 + i * 1.3) * .3);
        if (lt > 3.35) sp.userData.legs.forEach((l, i) => l.rotation.x = Math.sin(T * 8 + i) * .15);
        const hitFlash = (lt > .15 && lt < .3) || (lt > .45 && lt < .6) || (lt > .75 && lt < .9) || (lt > .95 && lt < 1.1) || (lt > 1.2 && lt < 1.35) || (lt > 1.5 && lt < 1.65) || (lt > 1.9 && lt < 2.05) || (lt > 2.95 && lt < 3.05) || (lt > 3.4 && lt < 3.55);
        hurt(sp, hitFlash ? 1 : 0);
        if (!hitFlash) spGlow.forEach(m => { m.emissive.set('#5a4a3a'); m.emissiveIntensity = .35; }); // keep the dark spider readable in the dim corridor
        hurt(p, lt > 3.12 && lt < I ? 1 : 0);
        // totem: world particles around him (no 2D overlay: this is Th3Antonio's screen)
        const tv = lt > T_TOT + 1.0 && lt < 2.6; linger.visible = tv; linger2.visible = tv;
        linger.position.set(2.5, .3, Z); linger2.position.set(2.5, .3, Z);
        M.animParticles(linger, (lt - T_TOT) * .8, { rise: .45, spread: 1.4 }); M.animParticles(linger2, (lt - T_TOT) * .8 + .3, { rise: .45, spread: 1.4 });
        p.visible = lt < I;
        const dt = lt - I;
        drops.visible = dt > 0;
        drops.children.forEach((m, i) => {
          const vx = m.userData.d.x * 1.6, vz = m.userData.d.z * 1.4, t2 = Math.min(dt, .55 + (i % 4) * .08);
          m.position.set(DOOR + vx * t2, Math.max(.1, 1.0 + t2 * 3 - t2 * t2 * 9.8), DZ + vz * t2);
          m.rotation.y = T * 3 + i;
        });
        let c;
        if (lt < 1.45) c = cam(camera, [-8.5, 1.7, Z + .5], [px + 1, .9, Z], 50); // down the rail corridor
        else if (lt < 2.2) { const k = ease.inOut(clamp((lt - 1.45) / .75)); c = cam(camera, [lerp(-3.6, -3.1, k), 1.75, Z + .9], [px + .4, 1.0, Z], 40); } // medium: the far end, particles around him
        else if (lt < TB) c = cam(camera, [14.4, 1.5, 1.7], [8.6, .75, .7], 46); // from the room (Th3Antonio's spot): he comes to the door, spider at his heels
        else if (lt < I) { const k = ease.inOut(clamp((lt - TB) / .6)); c = cam(camera, [lerp(14.0, 14.3, k), 1.75, lerp(3.7, 3.4, k)], [10.2, .75, .7], 46); } // 3/4 from the room: in the doorway, the spider at his legs
        else { const k = ease.out(clamp(dt / 1.6)); c = cam(camera, [lerp(14.3, 14.8, k), lerp(1.75, 3.6, k), lerp(3.4, 3.7, k)], [10.2, .3, .8], 50); }
        pop(camera, lt < 2.2 ? lt - T_TOT : -1, V(lerp(-4, 3.2, T_TOT / 2.2), 1.0, Z + .3)); // stays where it popped; gone at the cut
        return c;
      },
    };
  },
};
