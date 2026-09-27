// #17 RanguGamer — día 30, 24/04/2020 17:20. Verified: wiki (Silverfish de la Muerte) + clip (GersoonSG
// 10:03–10:19): a stronghold (stone bricks, mossy/cracked, oak doors, a chest), torches on the floor,
// storm timer "Quedan 03:37:0x de tormenta"; the silverfish are never visible — only small white outlines
// on the walls; one unseen hit takes him from 10 to ~4.5 hearts, he spins around, switches to the bow ->
// "ha sido víctima de Silverfish de la Muerte".
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, ghostify, groundAt, hurt, PX } from './common.js';
import { text } from '../engine.js';
import { pixBox } from '../mobs.js';

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function oakDoor() {
  const g = new THREE.Group();
  const d = pixBox(16, 32, 2, (f, i, j) => {
    if ((f === 'pz' || f === 'nz') && j >= 3 && j <= 12 && (i >= 2 && i <= 6 || i >= 9 && i <= 13)) return hex('#3a2a18'); // two window panes
    if ((f === 'pz' || f === 'nz') && j === 18 && i >= 12 && i <= 13) return hex('#4a4a4a'); // handle
    return i % 4 === 0 || j % 8 === 0 ? hex('#7a5a30') : hex('#a4804c');
  });
  d.position.set(8, 16, 0); g.add(d); g.scale.setScalar(PX); return g; // hinge at the group origin
}
function chest() {
  const g = new THREE.Group();
  const col = (f, i, j) => (i === 0 || i === 13) ? hex('#5a3a18') : hex(j % 4 === 0 ? '#8a5a26' : '#a8702e');
  const base = pixBox(14, 10, 14, col); base.position.y = 5; g.add(base);
  const lid = new THREE.Group(); lid.position.set(0, 10, -7); g.add(lid);
  const l = pixBox(14, 5, 14, col); l.position.set(0, 2.5, 7); lid.add(l);
  const latch = pixBox(2, 4, 1, () => hex('#c8c8c8')); latch.position.set(0, 1, 14.5); lid.add(latch);
  g.userData.lid = lid; g.scale.setScalar(PX); return g;
}
// invisible silverfish with the Glowing effect: a small wiggling white outline, crawling on a surface
function crawler(scene) {
  const s = M.silverfish(); ghostify(s, { t: 1.0 });
  const wrap = new THREE.Group(); wrap.add(s); s.scale.setScalar(PX * .66); scene.add(wrap);
  return {
    wrap,
    // n: surface normal ('y' floor, '+z' / '-z' walls, '-x' wall); heading in the surface plane
    at(pos, n, heading, T, ph = 0) {
      wrap.position.copy(pos);
      wrap.rotation.set(n === '+z' ? Math.PI / 2 : n === '-z' ? -Math.PI / 2 : 0, 0, n === '-x' ? Math.PI / 2 : 0);
      s.rotation.y = heading;
      s.userData.segs.forEach((g, k) => { g.position.x = Math.sin(T * 17 - k * .9 + ph) * 1.1; g.rotation.y = Math.cos(T * 17 - k * .9 + ph) * .4; });
    },
  };
}

export default {
  n: 17, player: 'rangu', name: 'RanguGamer', ign: 'RanguGamer', day: 30, date: '24/04/2020 · 17:20',
  sfx: 'hit', impact: 3.25, dur: 4.9, storm: true,
  slow: [{ t: 1.8, d: 1.45, f: .32 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de RanguGamer. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['RanguGamer, Comer niños no le confirió vida eterna', '#aaaaaa'],
    ['[CONTROL] RanguGamer ha sido víctima de Silverfish de la Muerte', '#ffffff'],
  ],
  build(assets) {
    const w = new World(30, 10, 20, [-15, -2, -10]);
    w.fill(-15, -2, -10, 14, 7, 9, 'stone_bricks');
    w.fill(-10, 0, -1, 3, 2, 1, 0);   // corridor
    w.fill(5, 0, -4, 11, 3, 4, 0);    // the room with the chest
    w.fill(4, 0, 0, 4, 1, 0, 0);      // doorway
    // mossy and cracked-looking bricks here and there (walls/floor only)
    for (let x = -12; x <= 13; x++) for (let z = -6; z <= 6; z++) for (let y = -1; y <= 4; y++) {
      const h = Math.sin(x * 12.9898 + z * 78.233 + y * 37.7) * 43758.5453, r = h - Math.floor(h);
      if (w.get(x, y, z) && r < .16) w.set(x, y, z, r < .08 ? 'mossy' : 'cobble');
    }
    w.fill(4, 0, 0, 4, 1, 0, 0);
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#050505');
    scene.add(w.build());
    const g = (x, z) => groundAt(w, x, z, 1);
    // oak door, swung open into the room
    const door = oakDoor(); door.position.set(4.0, 0, .93); scene.add(door);
    const ch = chest(); ch.position.set(9.5, 0, -3.45); scene.add(ch);
    scene.add(new THREE.HemisphereLight('#c0c0cc', '#303030', 1.0));
    const floorTorch = (x, z, li = 7) => { const t = torch(); t.scale.setScalar(PX); t.position.set(x, g(x, z), z); scene.add(t); const l = new THREE.PointLight('#ffc070', li, 7, 1.3); l.position.set(x, 1, z); scene.add(l); return [t, l]; };
    floorTorch(7.2, 2.2); floorTorch(10.6, 1.5); floorTorch(-4, .4); floorTorch(-8.5, .6);
    const [newT, newL] = floorTorch(1.6, 1.4, 8); // the one he places on his way back

    const p = player(assets, 'rangu'); scene.add(p);
    const tch = hold(p, torch(), { rx: -1.2 });
    const bw = hold(p, M.bow(), { rx: -1.5 }); bw.visible = false;
    const sh = hold(p, M.shield(), { rx: -.1, left: true }); sh.position.set(1, -8, -2);
    const F = [0, 1, 2, 3].map(() => crawler(scene));
    const camera = new THREE.PerspectiveCamera(58, 16 / 9, .05, 100);
    const I = 3.25, OUT = 1.2, HIT = 2.2, BOW = 2.7;
    const clock = lt => { const s = lt < HIT ? 608 + lt * 7.25 / HIT : 615.25 + (lt - HIT) * 2.95 / (I - HIT); const r = Math.round(13026 - (s - 606)); return `Quedan 03:${String(Math.floor((r % 3600) / 60)).padStart(2, '0')}:${String(r % 60).padStart(2, '0')} de tormenta`; };
    const V3 = (a, b, c) => new THREE.Vector3(a, b, c);
    const V = (o, y) => () => o.position.clone().add(V3(0, y, 0));
    return {
      scene, ink: { skyA: '#0e0d0c', skyB: '#181614', tint: '#eeeae2', lineW: 2.3 },
      cues: [{ t: HIT, type: 'sfx', kind: 'hurt', gain: .5 }, { t: BOW, type: 'sfx', kind: 'bow', gain: .3 }],
      hearts: lt => ({ v: lt < HIT ? 10 : 4.5, blink: lt > HIT && lt < HIT + .3 }),
      overlay(ctx, lt) { if (lt < I) text(ctx, clock(lt), 960, 850, { font: '30px VT', color: '#ffffff', stroke: '#000', strokeW: 4 }); },
      notes: [
        { t0: .05, t1: 1.2, text: 'fortaleza: abre un cofre', x: 1180, y: 220, size: 50 },
        { t0: .35, t1: 1.2, text: 'un contorno blanco', x: 1260, y: 660, size: 50, to: () => F[0].wrap.position.clone(), bend: -50 },
        { t0: 1.25, t1: 2.2, text: 'solo se ven los contornos', x: 1150, y: 230, size: 50, to: () => F[1].wrap.position.clone(), bend: 50 },
        { t0: 2.2, t1: 2.7, text: 'golpe invisible:\nde 10 a 4,5 corazones', x: 1200, y: 230, size: 48 },
        { t0: 2.72, t1: 3.25, text: 'saca el arco... y muere', x: 1150, y: 230, size: 50 },
      ],
      update(lt, T) {
        // at the chest -> back through the door into the corridor, placing a torch
        let x, z;
        if (lt < OUT) { x = 9.4; z = -2.35; }
        else { const k = ease.inOut(clamp((lt - OUT) / (HIT - OUT))); x = lerp(9.0, .6, k); z = lerp(-1.6, .45, clamp(k * 2.2)) ; if (k > .45) z = .45; }
        p.position.set(x, g(x, z), z);
        const walking = lt > OUT && lt < HIT;
        if (lt < OUT) face(p, 9.5, -3.5);
        else if (lt < HIT) face(p, x - 3, .45);
        else if (lt < BOW) p.rotation.y = -Math.PI / 2 + ease.inOut(clamp((lt - HIT) / (BOW - HIT))) * Math.PI * 3; // spins around looking for it
        else p.rotation.y = Math.PI / 2; // toward the doorway
        const lookDown = lt > HIT && lt < BOW ? Math.sin((lt - HIT) / (BOW - HIT) * Math.PI * 2) * .6 : 0;
        pose(p, { idle: T * 2, walk: T * 10, swing: walking ? .6 : 0, armRaise: lt >= BOW ? 1.45 : lt < OUT ? .8 + Math.sin(lt * 5) * .15 : .5, headPitch: lt < OUT ? .45 : lt > BOW ? .35 : lookDown });
        hurt(p, (lt > HIT && lt < HIT + .2) || lt > I - .08 ? 1 : 0);
        tch.visible = lt < BOW; bw.visible = lt >= BOW;
        ch.userData.lid.rotation.x = -ease.inOut(clamp(Math.sin(clamp(lt / 1.05) * Math.PI) * 1.4)) * 1.25; // opens and closes it
        newT.visible = newL.visible = lt > 1.75;
        // the silverfish: tiny wiggling outlines crawling toward him
        F[0].at(V3(lerp(8.2, 8.9, (Math.sin(lt * 1.3) + 1) / 2), .02, -2.7 + Math.sin(lt * 2) * .25), 'y', Math.PI / 2 + Math.cos(lt * 1.3) * .8, T, 0); // by the chest
        const wk = clamp((lt - OUT) / 1.6);
        F[1].at(V3(lerp(-1.2, x - .8, wk), 1.7 - wk * .6 + Math.sin(lt * 3) * .1, -.98), '+z', Math.PI / 2 - .3, T, 1); // on the corridor wall
        F[2].at(V3(lerp(-3.0, x - 2.0, wk), .6 + Math.sin(lt * 2) * .2, 1.98), '-z', Math.PI / 2 + .4, T, 2); // on the other wall
        const fk = clamp((lt - 1.5) / (HIT - 1.5));
        const f3 = lt < HIT ? V3(lerp(-2.4, x - .45, fk), .02, lerp(1.4, z + .2, fk)) : V3(x - .5 + Math.sin((lt - HIT) * 9) * .5, .02, z + .35 + Math.cos((lt - HIT) * 7) * .45);
        if (lt > I - .15) f3.lerp(V3(x - .2, .02, z + .1), clamp((lt - (I - .15)) / .15));
        F[3].at(f3, 'y', lt < HIT ? Math.PI / 2 : (lt - HIT) * 9, T, 3); // on the floor, right up to him
        const dead = lt >= I;
        p.visible = !dead;
        if (lt < OUT) return cam(camera, [lerp(6.2, 6.0, lt), 2.3, lerp(2.9, 2.7, lt)], [9.2, .7, -2.9], 56); // the chest room; a white outline near the chest
        if (lt < HIT) { const k = (lt - OUT) / (HIT - OUT); return cam(camera, [lerp(-3.4, -3.0, k), 2.05, 1.05], [lerp(4.5, 1.5, k), 1.05, lerp(-.2, .1, k)], 58); } // corridor; outlines crawl along the walls
        const j = lt > HIT && lt < HIT + .25 ? (1 - (lt - HIT) / .25) * .22 : 0;
        if (lt < BOW) return cam(camera, [x - 3.1 + Math.sin(lt * 90) * j, 1.9 + Math.cos(lt * 77) * j, 1.55], [x + .2, .75, .35], 60); // hit from nowhere; he spins
        if (lt < I) return cam(camera, [x + 2.7, 1.75, 1.6], [x - .1, .75, .3], 60); // bow up; the outline at his feet
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(x + 2.7, x + 3.2, k), lerp(1.8, 2.7, k), lerp(1.6, 1.5, k)], [x, .2, .3], 60);
      },
    };
  },
};
