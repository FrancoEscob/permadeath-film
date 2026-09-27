// #7 ReventXzz — día 11, 05/04/2020 17:28. Verified: wiki (Araña de Cueva) + clip (GersoonSG 4:19–4:35):
// abandoned mineshaft — oak supports, cobwebs, a rail track down a dark tunnel, reddish blocks;
// diamond sword + shield; a cave spider runs up the rails at him, leaps at his face, he swings twice
// -> "ha sido víctima de Araña de cueva", one-shot from full health.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, rails, cobweb, groundAt, PX } from './common.js';

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mottle = cols => r => { const v = r(); return hex(cols[v < .45 ? 0 : v < .75 ? 1 : v < .92 ? 2 : 3]); };

export default {
  n: 7, player: 'revent', name: 'ReventXzz', ign: 'ReventXzz', day: 11, date: '05/04/2020 · 17:28',
  sfx: 'hit', impact: 3.4, dur: 5.0, storm: true,
  slow: [{ t: 2.1, d: .5, f: .35 }, { t: 2.75, d: .65, f: .35 }],
  chat: [
    ['El comienzo del sufrimiento infinito de ReventXzz ha comenzado. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['G2Reven, Partida equivalente a un AFK en el LoL', '#aaaaaa'],
    ['[MIEMBRO] ReventXzz ha sido víctima de Araña de cueva', '#ffffff'],
  ],
  build(assets) {
    // floor top along the tunnel: flat at the top, a 3-block rail ramp, then flat into the dark
    const floorAt = x => x < 3 ? 0 : x < 4 ? -1 : x < 5 ? -2 : -3;
    const railY = x => x < 3 ? 0 : x < 6 ? -(x - 3) : -3;
    const w = new World(40, 14, 16, [-8, -8, -8]);
    w.fill(-8, -8, -8, 31, 5, 7, 'stone');
    w.fill(-4, 0, -3, 2, 3, 3, 0); // the room at the top of the rail tunnel
    for (let x = 3; x <= 29; x++) { const f = floorAt(x + .5); w.fill(x, f, -1, x, Math.max(f + 2, x < 6 ? 2 : f + 2), 1, 0); }
    for (let x = -4; x <= 29; x++) for (let z = -4; z <= 4; z++) for (let y = -6; y <= 4; y++) { const h = Math.sin(x * 12.9898 + z * 78.233 + y * 37.7) * 43758.5453, r = h - Math.floor(h); if (w.get(x, y, z) && r < .08) w.set(x, y, z, r < .05 ? 'gravel' : 'cobble'); }
    // oak supports: fence posts (meshes) + a plank beam (blocks)
    const oak = new THREE.MeshLambertMaterial({ color: '#b08a55' });
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#030303');
    const supports = [2, 8, 12, 16, 20, 24, 28];
    for (const x of supports) {
      const f = floorAt(x + .5), top = x === 2 ? 2 : f + 2;
      w.fill(x, top, -1, x, top, 1, 'planks');
      for (const z of [-.82, .82]) { const post = new THREE.Mesh(new THREE.BoxGeometry(.26, top - f, .26), oak); post.position.set(x + .5, (top + f) / 2, z); scene.add(post); }
    }
    scene.add(w.build());
    // reddish speckled blocks (granite-like) beside the rail ramp
    const granTex = [0, 1, 2].map(i => M.pixBox(16, 16, 16, (f, a, b, r) => mottle(['#9a7666', '#aa8474', '#86665a', '#c4a696'])(r)));
    const gran = [[3, -2, -1], [4, -3, -1], [3, -1, -2], [4, -2, -2], [4, -1, -2], [5, -3, -2], [2, -1, -1]];
    gran.forEach(([x, y, z], i) => { const b = granTex[i % 3].clone(); b.scale.setScalar(PX * 1.006); b.position.set(x + .5, y + .5, z + .5); scene.add(b); });
    const r1 = rails(6.5); r1.position.set(-3.5, 0, 0); scene.add(r1);
    const r2 = rails(Math.hypot(3, 3)); r2.position.set(3, 0, 0); r2.rotation.z = -Math.PI / 4; scene.add(r2);
    const r3 = rails(24); r3.position.set(6, -3, 0); scene.add(r3);
    for (const [x, y, z, s] of [[2.75, 2.5, 1.5, .7], [-3.3, 3.2, -2.4, .9], [9.2, -1.5, .75, 1], [16.5, -1.4, -.75, 1]]) { const c = cobweb(); c.position.set(x, y, z); c.scale.setScalar(s); scene.add(c); }
    scene.add(new THREE.HemisphereLight('#a0a0b0', '#202020', .75));
    const tAt = (x, y, z, rx, li) => { const t = torch(); t.scale.setScalar(PX); t.position.set(x, y, z); t.rotation.x = rx; scene.add(t); const l = new THREE.PointLight('#ffc070', li, 8, 1.3); l.position.set(x, y + 1, z + Math.sin(rx) * 1.2); scene.add(l); };
    tAt(-3.5, 1.2, -2.95, .45, 9); tAt(2.5, 1.1, -2.95, .45, 8); tAt(9.5, -2, -.95, .45, 7); tAt(17.5, -2, .95, -.45, 6);

    const P = [1.9, .35];
    const p = player(assets, 'revent'); p.position.set(P[0], groundAt(w, ...P, 2), P[1]); scene.add(p);
    const sw = hold(p, M.sword('diamond'), { rx: -1.3 });
    const sh = hold(p, M.shield(), { rx: -.1, left: true }); sh.position.set(1, -8, -2);
    const sp = M.spider({ cave: true }); sp.scale.multiplyScalar(PX); scene.add(sp);
    const camera = new THREE.PerspectiveCamera(58, 16 / 9, .05, 100);
    const I = 3.4, RUN = .9, LEAP = 2.15, LAND = 2.55;
    const face0 = new THREE.Vector3(P[0] + .45, 1.5, P[1]);
    const perch = [4.1, -.62];
    const V = (o, y) => () => o.position.clone().add(new THREE.Vector3(0, y, 0));
    return {
      scene, ink: { skyA: '#0e0d0c', skyB: '#181614', tint: '#eeeae2', lineW: 2.3 },
      cues: [{ t: 2.85, type: 'sfx', kind: 'whoosh', dur: .25, gain: .2 }, { t: 3.15, type: 'sfx', kind: 'whoosh', dur: .25, gain: .2 }],
      notes: [
        { t0: .05, t1: .95, text: 'mina abandonada', x: 1250, y: 230, size: 52 },
        { t0: .95, t1: 2.1, text: 'una araña de cueva\nsube por los raíles', x: 1180, y: 640, size: 50, to: V(sp, .5), bend: -50 },
        { t0: 2.1, t1: 2.6, text: 'salta a su cara', x: 1250, y: 230, size: 54, to: V(sp, .4), bend: 50 },
        { t0: 2.62, t1: 3.4, text: 'dos espadazos', x: 1250, y: 230, size: 54, circle: V(sp, .3), r: 90 },
        { t0: 3.45, t1: 5.9, text: 'un solo golpe, con vida completa', x: 1100, y: 190, size: 46 },
      ],
      update(lt, T) {
        face(p, 20, P[1] - .3);
        const lookDown = ease.inOut(clamp((lt - LAND) / .2));
        const sl = t0 => { const k = (lt - t0) / .22; return k > 0 && k < 1 ? Math.sin(k * Math.PI) : 0; };
        const slash = Math.max(sl(2.78), sl(3.1));
        pose(p, { idle: T * 2, armRaise: .5 + slash * 1.6, headPitch: lerp(.12, .75, lookDown) });
        p.userData.armR.rotation.z = -.04 - slash * .6;
        p.userData.armL.rotation.x = -.35;
        // the cave spider runs up the rails, leaps at his face, drops onto the reddish blocks and scuttles
        let x, y, z, pitch = 0;
        if (lt < LEAP) {
          const k = clamp((lt - RUN) / (LEAP - RUN));
          x = lerp(19, 3.6, k * .55 + .45 * k * k); z = Math.sin(lt * 7) * .12; y = x < 3 ? 0 : x < 6 ? railY(x) : -3;
          pitch = x > 3 && x < 6 ? -Math.PI / 4 : 0; // climbing the ramp
        } else if (lt < LAND) { // the leap: up to his face, then down onto the blocks beside the ramp
          const k = (lt - LEAP) / (LAND - LEAP);
          const up = ease.out(clamp(k / .45)), dn = ease.in(clamp((k - .45) / .55));
          x = lerp(lerp(3.6, face0.x + .5, up), perch[0], dn); z = lerp(lerp(0, face0.z, up), perch[1], dn);
          y = lerp(lerp(-.6, face0.y - .45, up), floorAt(perch[0]), dn); pitch = lerp(-.9, .5, k);
        } else if (lt < 3.25) {
          const k = (lt - LAND) / (3.25 - LAND);
          x = perch[0] - Math.sin(k * 9) * .35 - k * .5; z = perch[1] + Math.cos(k * 7) * .22; y = groundAt(w, x, z, 1) ; y = Math.max(y, railY(x));
        } else { // last lunge
          const k = clamp((lt - 3.25) / .15);
          x = lerp(perch[0] - .5, face0.x + .55, k); z = lerp(perch[1], face0.z - .1, k); y = lerp(-1, face0.y - .8, ease.out(k)); pitch = -.6 * k;
        }
        sp.position.set(x, y, z);
        face(sp, lt < LEAP ? P[0] : face0.x, lt < LEAP ? P[1] : face0.z);
        sp.rotation.x = pitch;
        sp.userData.legs.forEach((l, i) => l.rotation.x = Math.sin(T * 34 + i * 1.3) * (lt > LEAP && lt < LAND ? .1 : .35));
        const dead = lt >= I;
        p.visible = !dead && !(lt > RUN + .05 && lt < LEAP); sp.visible = lt > RUN - .1;
        if (lt < RUN + .05) return cam(camera, [lerp(-2.2, -1.9, lt), 2.4, 2.0], [7, -1.6, -.3], 55); // top of the rail tunnel: oak beams, a cobweb on the right
        if (lt < LEAP) return cam(camera, [P[0] + .15, 1.62, P[1] - .05], [Math.min(11, sp.position.x), Math.max(-2.6, sp.position.y + .35), sp.position.z * .5 + .15], 54); // his view: it comes up the rails at him
        if (lt < LAND) return cam(camera, [lerp(5.4, 5.5, (lt - LEAP) / .4), .5, 1.3], [2.6, lerp(.7, 1.0, (lt - LEAP) / .4), .25], 60); // side on: it leaps at his face
        if (lt < I) { const k = (lt - LAND) / (I - LAND); return cam(camera, [lerp(6.5, 6.3, k), -.35, lerp(-.5, -.4, k)], [2.9, lerp(.05, .25, k), .05], 58); } // he looks down: it's on the reddish blocks; two swings
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(-.5, -1.8, k), lerp(2.5, 3.4, k), lerp(2.3, 2.6, k)], [3.2, -1.2, -.4], 55);
      },
    };
  },
};
