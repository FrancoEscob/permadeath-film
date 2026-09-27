// #11 RubikYT — día 25, 19/04/2020 17:35. Verified: wiki (Araña de Cueva, tótem consumido) + clip
// (GersoonSG 6:21–6:34 + ZrrSQuVLYQA): farming a cobweb-wrapped cave-spider spawner he boxed in with
// cobblestone stairs; the day-25 spiders show only as white outlines and floating red eyes (invisible),
// some burning; hearts 9.5 -> 4 -> 1.5 (poisoned), totem pops, he fights on, looks down (only pink swirls),
// raises the purple shield -> "was slain by Cave Spider".
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, cobweb, spawnerCage, ghostify, fireBits, totemPop, hurt, stand, hop, PX } from './common.js';
import { pixBox } from '../mobs.js';

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const T_HIT = 1.4, T_TOT = 2.75, T_SH = 3.8;
const PX0 = 2.2, PZ0 = .1; // where he stands, facing the spawner nook

export default {
  n: 11, player: 'rubik', name: 'Rubik', ign: 'RubikYT', day: 25, date: '19/04/2020 · 17:35',
  sfx: 'hit', impact: 4.3, dur: 5.9,
  slow: [{ t: 2.7, d: .6, f: .35 }, { t: 3.8, d: .55, f: .3 }],
  chat: [
    ['[MIEMBRO] RubikYT has reached the goal [Postmortal]', '#55ff55'],
    ['Este es el comienzo del sufrimiento eterno de RubikYT. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['RubikYT, Muere en el PvE otra vez', '#aaaaaa'],
    ['[MIEMBRO] RubikYT was slain by Cave Spider', '#ffffff'],
  ],
  build(assets) {
    const w = new World(30, 12, 20, [-15, -3, -10]);
    w.fill(-15, -3, -10, 14, 8, 9, 'stone');
    w.fill(-10, 0, -2, 10, 3, 2, 0);
    w.fill(2, 0, -5, 8, 4, -2, 0); // spawner nook
    w.fill(-10, -1, -2, 10, -1, 2, 'gravel');
    for (let x = -10; x <= 10; x += 4) { w.fill(x, 0, -2, x, 2, -2, 'log'); w.fill(x, 0, 2, x, 2, 2, 'log'); w.fill(x, 3, -2, x, 3, 2, 'planks'); } // mineshaft timber
    w.fill(3, 0, -5, 7, 0, -3, 'cobble');                  // ledge the spawner sits on
    w.set(4, 1, -4, 'cobble'); w.set(6, 1, -4, 'cobble');   // his cobblestone "stairs" boxing it in
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#040404');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#b0b0c0', '#282828', 1.15));
    for (const x of [-6, -1.4, 8]) { const t = torch(); t.scale.setScalar(PX); t.position.set(x, 1.4, 1.7); scene.add(t); const l = new THREE.PointLight('#ffd8a8', 4.5, 8, 1.3); l.position.set(x, 2, 1.2); scene.add(l); }
    const key = new THREE.PointLight('#f0e8e0', 4, 7, 1.2); key.position.set(3.5, 2.6, 1.2); scene.add(key);
    const cage = spawnerCage('#3aa8a0'); cage.position.set(5.5, 1, -3.5); scene.add(cage);
    for (const [x, y, z, r] of [[5.5, 1.5, -2.95, 0], [4.95, 2.2, -3.5, 1.2], [6.05, 1.9, -3.4, -1.1], [5.5, 2.3, -3.6, .4]]) { const c = cobweb(); c.position.set(x, y, z); c.rotation.y = r; scene.add(c); }
    const p = player(assets, 'rubik'); scene.add(p);
    const stairs = hold(p, pixBox(6, 6, 6, (f, i, j) => (j < 3 && i > 2) ? [0, 0, 0, 0] : hex('#8a8a8a')), { rx: -1.2 });
    const sw = hold(p, M.sword('diamond'), { rx: -1.3 });
    const off = hold(p, M.totem(), { rx: -1.2, left: true }); off.scale.setScalar(.8);
    const shieldP = pixBox(1, 12, 10, (f, i, j) => (i === 0 || j === 0 || i === 9 || j === 11) && (f === 'px' || f === 'nx') ? hex('#3a1a5a') : hex('#8a3ad8'));
    const sh = hold(p, shieldP, { rx: -.2 }); sh.position.set(-1, -8, -3);
    // invisible cave spiders (Glowing + Invisibility): white outline + red eyes only. One climbs the nook wall.
    const EYES = [[-2, 1], [2, 1], [-1, 2.5], [1, 2.5]];
    const ghosts = [0, 1, 2].map(i => { const s = M.spider({ cave: true }); s.scale.multiplyScalar(PX); ghostify(s, { t: .45, eyes: EYES }); scene.add(s); return s; });
    const wallG = new THREE.Group(); wallG.rotation.x = Math.PI / 2; scene.add(wallG);
    const climber = M.spider({ cave: true }); climber.scale.multiplyScalar(PX); ghostify(climber, { t: .45, eyes: EYES }); climber.rotation.y = Math.PI; wallG.add(climber);
    const burnS = M.spider({ cave: true }); burnS.scale.multiplyScalar(PX); scene.add(burnS);
    const fire = fireBits(12, .55); burnS.add(fire); fire.scale.setScalar(18); fire.position.y = 9; // on fire
    const swirlA = M.particlesCube('#e04a8a', 14, .45, .07); scene.add(swirlA);
    const swirlB = M.particlesCube('#6ad84a', 10, .5, .06); scene.add(swirlB);
    const pop = totemPop(scene); // his own screen: the in-game totem overlay is right here
    const camera = new THREE.PerspectiveCamera(58, 16 / 9, .05, 100);
    const I = 4.3;
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const up = (o, y = .45) => () => o.position.clone().add(V(0, y, 0));
    return {
      scene, ink: { skyA: '#0e0d0c', skyB: '#181614', tint: '#eeeae2', lineW: 2.3 },
      cues: [{ t: T_HIT, type: 'sfx', kind: 'hurt', gain: .4 }, { t: 2.3, type: 'sfx', kind: 'hurt', gain: .3 }, { t: T_TOT, type: 'sfx', kind: 'totem' }],
      hearts: lt => ({ v: lt < T_HIT ? 9.5 : lt < 2.2 ? 4 : lt < T_TOT ? 1.5 : lt < 3.6 ? 2 : 1, variant: lt > 1.8 ? 'poison' : 'red', blink: (lt > T_HIT && lt < 1.6) || (lt > 2.2 && lt < 2.35) }),
      notes: [
        { t0: .05, t1: 2.7, text: 'arañas invisibles:', x: 1130, y: 200, size: 52, to: up(ghosts[1], .5), ax: 1250, ay: 235, bend: 50 },
        { t0: .65, t1: 2.7, text: 'solo se ven sus contornos', x: 1130, y: 255, size: 52 },
        { t0: 1.4, t1: 2.8, text: 'envenenado', x: 330, y: 780, size: 58, to: [800, 890], ax: 520, ay: 815, bend: 30 },
        { t0: 2.72, t1: 3.45, text: 'le salta el tótem', x: 1200, y: 240, size: 56 },
        { t0: 3.6, t1: 4.3, text: 'saca el escudo… tarde', x: 1150, y: 250, size: 54, to: () => sh.getWorldPosition(V(0, 0, 0)), ax: 1260, ay: 290, bend: 60 },
      ],
      update(lt, T) {
        stand(p, w, PX0, PZ0, 0, 2); // search below the mineshaft beams
        const look = lt < 2.0 ? [5.5, -3.5] : [3.4, -.6];
        face(p, look[0], look[1]);
        const fighting = lt > 1.5 && lt < 3.75;
        const slash = fighting && Math.sin(T * 13) > .3;
        const down = lt > 3.35;
        pose(p, { idle: T * 2, armRaise: slash ? 1.8 : lt < 1.45 ? .9 : down ? .75 : .5, headPitch: down ? .75 : lt < 1.45 ? -.1 : .1 });
        stairs.visible = lt < 1.45; sw.visible = lt >= 1.45 && lt < T_SH; sh.visible = lt >= T_SH && lt < I;
        off.visible = lt < T_TOT;
        if (sh.visible) p.userData.armR.rotation.x = -1.25; // shield raised in front
        hurt(p, (lt > T_HIT && lt < T_HIT + .15) || (lt > 2.3 && lt < 2.42) ? 1 : 0);
        // the outlines: out of the spawner, over the ledge, down to his feet; gone by the time he looks down
        ghosts.forEach((s, i) => {
          const k = ease.inOut(clamp((lt - .15 - i * .28) / 1.15));
          const x = lerp(4.6 + i * .9, [3.1, 3.3, 2.9][i], k), z = lerp(-3.4, [-1.0, .4, -.1][i] + Math.sin(T * 3 + i) * .12, k);
          stand(s, w, x, z, 0, 2);
          face(s, PX0, PZ0);
          s.userData.legs.forEach((l, j) => l.rotation.x = Math.sin(T * 24 + j + i) * .3);
          s.visible = lt < 3.35 && !(i === 2 && lt > 1.9 && lt < 3.35 && false);
        });
        wallG.position.set(3.6 + Math.sin(T * .9) * .4, 1.6 + Math.sin(T * 1.3) * .5, -4.98);
        climber.userData.legs.forEach((l, j) => l.rotation.x = Math.sin(T * 18 + j) * .3);
        climber.visible = lt < 3.35;
        // a burning spider jumping at him
        burnS.visible = lt > 1.9 && lt < 3.35;
        const bk = clamp((lt - 1.9) / .6);
        const bx = lerp(4.4, 3.05, bk), bz = lerp(-1.8, -.35, bk);
        stand(burnS, w, bx, bz, lt < 2.75 ? hop(lt - 1.9, .42, .55) : 0, 2);
        face(burnS, PX0, PZ0); fire.userData.anim(T);
        burnS.userData.legs.forEach((l, j) => l.rotation.x = Math.sin(T * 26 + j) * .3);
        // looking down: only pink swirls where the (invisible) spider is
        const sv = lt > 3.3 && lt < I + .6;
        swirlA.visible = swirlB.visible = sv;
        swirlA.position.set(3.0, 0, -.2); swirlB.position.set(2.8, 0, .3);
        M.animParticles(swirlA, T * .9, { rise: .22, spread: .45 }); M.animParticles(swirlB, T * .8 + .4, { rise: .2, spread: .5 });
        p.visible = lt < I;
        let c;
        if (lt < 1.35) { const k = ease.inOut(clamp(lt / 1.35)); c = cam(camera, [lerp(3.3, 3.6, k), 2.6, lerp(2.7, 2.55, k)], [4.3, 1.0, -2.5], 60); } // the cobweb spawner; outlines on the walls
        else if (lt < 2.0) c = cam(camera, [.4, 1.4, 1.9], [3.6, .6, -1.4], 56); // low: eyes and outlines at his feet
        else if (lt < 2.7) c = cam(camera, [5.2, 1.9, 1.7], [2.6, .8, -.3], 55); // the burning spider jumps at him
        else if (lt < 3.3) { const k = ease.inOut(clamp((lt - 2.7) / .6)); c = cam(camera, [lerp(.9, 1.2, k), 1.8, lerp(2.7, 2.55, k)], [PX0 + .5, 1.0, PZ0 - .4], 52); } // totem pops: side-on, the spiders at his feet
        else if (lt < I) { const k = ease.inOut(clamp((lt - 3.3) / 1.0)); c = cam(camera, [lerp(5.4, 5.2, k), 2.35, lerp(2.6, 2.4, k)], [2.5, .85, -.1], 52); } // looking down: only pink swirls; shield up
        else { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(5.2, 5.5, k), lerp(2.35, 3.4, k), lerp(2.4, 2.6, k)], [2.6, 0, -.8], 55); }
        pop(camera, (lt - T_TOT) * 1.8, V(p.position.x, p.position.y + 1, p.position.z)); // (compressed so it's over before the shield)
        return c;
      },
    };
  },
};
