// #38 Luh (iLuh) — día 60, 24/05/2020 20:50. The last player alive. Verified: wiki (Ahogarse, tótem consumido) + clip
// (GersoonSG 23:33–23:51, multi-POV VM3wGy73K7M): night, heavy rain, a library/enchanting room (bookshelves, enchanting
// table, anvil, chests, red beds, pale cyan floor) on a high open platform next to a cyan beam; 4 hearts, no armour,
// totem in the offhand; a pale-blue shimmering figure comes into the room; he raises the shield and backs toward the
// open side; "Explosión"; he's thrown into the air over the rainy fields, lands in a pond (seagrass, a lime wall), the
// air bubbles drain from 10 to 0 in ~0.3 s, the totem pops, and he dies ~0.2 s later -> "iLuh se ha ahogado".
// Official day-60 rule: "te ahogas 10 veces más rápido".
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, totemPop, groundAt, hurt, PX } from './common.js';
import { text } from '../engine.js';
import { rain } from '../fx2d.js';
import { pixBox } from '../mobs.js';
import { qFuse, legs, hotbar } from './lib_d31_d39.js';

function bubbles(ctx, n) { for (let i = 0; i < 10; i++) { if (i >= n) continue; const x = 1060 + i * 30, y = 850; ctx.fillStyle = '#cfefff'; ctx.beginPath(); ctx.arc(x, y, 11, 0, 7); ctx.fill(); ctx.strokeStyle = '#1a3a6a'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(x - 5, y - 6, 3, 3); } }
const BAR = [{ k: 'sword', c: '#a050e0' }, { k: 'pick', c: '#a050e0' }, { k: 'bow', glint: true }, { k: 'shield', c: '#3a3030' }, { k: 'pick', c: '#8a50c0' }, { k: 'potion', c: '#c050e0', n: 5 }, { k: 'item', c: '#b02020', n: 32 }, { k: 'item', c: '#f0c020', n: 64 }, { k: 'item', c: '#2a2a3a', n: 15 }];
const books = () => pixBox(16, 16, 16, (f, i, j, r) => (f === 'py' || f === 'ny') ? [150, 110, 60] : (j % 8 === 0 || j % 8 === 7) ? [120, 84, 44] : [[160, 40, 40], [50, 90, 160], [60, 130, 60], [170, 140, 60]][(i >> 1) % 4 + (j > 7 ? 1 : 0) & 3]);

export default {
  n: 38, player: 'luh', name: 'Luh', ign: 'iLuh', day: 60, date: '24/05/2020 · 20:50',
  sfx: 'drown', impact: 4.6, dur: 6.4, storm: true,
  slow: [{ t: 1.8, d: .55, f: .45 }, { t: 2.35, d: 1.5, f: .45 }],
  chat: [
    ['iLuh ha consumido 93 tótem. (Probabilidad: 14 < 93)', '#ffff55'],
    ['Este es el comienzo del sufrimiento eterno de iLuh. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['HDluh, Código Luh-XD en el cementerio del server', '#aaaaaa'],
    ['[MIEMBRO] iLuh ☠ se ha ahogado', '#ffffff'],
  ],
  build(assets) {
    const w = new World(64, 40, 64, [-32, -30, -32]);
    for (let x = -32; x < 32; x++) for (let z = -32; z < 32; z++) { w.fill(x, -30, z, x, -22, z, 'dirt'); w.set(x, -21, z, 'grass'); }
    w.fill(10, -22, 8, 14, -21, 12, 'water'); // the pond (2 deep): surface at y = -20, bottom at y = -22
    for (const [x, z, r] of [[-12, 14, 2], [18, -8, 3], [-20, -4, 2]]) w.fill(x - r, -21, z - r, x + r, -21, z + r, 'water'); // other ponds in the fields
    // the high platform library (open to the sky on the +x and +z sides), on a stone pillar
    w.fill(-1, -20, -1, 1, -2, 1, 'stone_bricks');
    w.fill(-6, -1, -6, 6, -1, 6, 'packed_ice');
    w.fill(-6, 0, -6, 6, 3, -6, 'planks'); w.fill(-6, 0, -6, -6, 3, 6, 'planks');
    for (let y = -21; y < 30; y++) w.set(-10, y, -10, 'glass'); // the cyan beam
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#05070f');
    scene.add(w.build());
    const beam = new THREE.Mesh(new THREE.BoxGeometry(.8, 60, .8), new THREE.MeshBasicMaterial({ color: '#8ff0ff' })); beam.position.set(-9.5, 5, -9.5); scene.add(beam);
    // furniture: bookshelves, enchanting table, anvil, beds, chests, floor plates, item frames
    const add = (m, x, y, z, s = PX) => { m.scale.setScalar(s); m.position.set(x, y, z); scene.add(m); return m; };
    for (let x = -5; x <= -1; x++) add(books(), x + .5, .5, -5.5);
    for (let z = -4; z <= 0; z++) add(books(), -5.5, .5, z + .5);
    for (let x = -5; x <= -2; x++) add(books(), x + .5, 1.5, -5.5);
    add(pixBox(16, 12, 16, (f, i, j) => f === 'py' ? ((i + j) % 5 ? [150, 30, 40] : [80, 220, 210]) : j < 3 ? [150, 30, 40] : [30, 22, 30]), -1.5, .375, -2.5); // enchanting table
    add(pixBox(12, 12, 16, (f, i, j) => (j > 3 && j < 9 && (i < 3 || i > 8)) ? [0, 0, 0, 0] : [68, 68, 72], { transparent: true }), .5, .375, -5.2); // anvil
    for (const x of [2, 4]) { const b = new THREE.Mesh(new THREE.BoxGeometry(.95, .56, 1.95), new THREE.MeshLambertMaterial({ color: '#b02424' })); b.position.set(x + .5, .28, -4.5); scene.add(b); const pw = new THREE.Mesh(new THREE.BoxGeometry(.9, .2, .5), new THREE.MeshLambertMaterial({ color: '#eeeeee' })); pw.position.set(x + .5, .62, -5.2); scene.add(pw); }
    for (let z = 1; z <= 3; z++) { const c = pixBox(16, 15, 15, (f, i, j) => (j === 5 || j === 6) ? [70, 44, 20] : [162, 108, 48]); add(c, -5.5, .47, z + .5); }
    const plateM = new THREE.MeshLambertMaterial({ color: '#8a8a8a' });
    for (let i = 0; i < 12; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(.8, .06, .8), plateM); m.position.set(-3.5 + (i % 4) * 2.3, .03, -1 + Math.floor(i / 4) * 2.4); scene.add(m); }
    const frameM = [new THREE.MeshLambertMaterial({ color: '#7a5a3a' }), new THREE.MeshBasicMaterial({ color: '#b060ff' })];
    for (let x = -4; x <= 5; x += 2) for (const y of [2.5]) { const f = new THREE.Mesh(new THREE.BoxGeometry(.75, .75, .06), frameM[0]); f.position.set(x + .5, y, -4.96); scene.add(f); const it = new THREE.Mesh(new THREE.BoxGeometry(.35, .35, .07), frameM[1]); it.position.set(x + .5, y, -4.92); scene.add(it); }
    // the pond: seagrass, tall grass, a lime wall on one side
    const weedM = [new THREE.MeshLambertMaterial({ color: '#3a8a3a' }), new THREE.MeshLambertMaterial({ color: '#5fb04a' })];
    for (let i = 0; i < 60; i++) { const h = .5 + (i % 4) * .3; const m = new THREE.Mesh(new THREE.BoxGeometry(.1, h, .1), weedM[i % 2]); const x = 9.5 + (i * 7.3) % 6.5, z = 7.5 + (i * 5.1) % 6.5; m.position.set(x, groundAt(w, x, z, -19, { liquids: false }) + h / 2, z); m.rotation.z = (i % 5 - 2) * .1; scene.add(m); }
    const lime = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 6), new THREE.MeshLambertMaterial({ color: '#8fdc3a' })); lime.position.set(15.5, -18.5, 10.5); scene.add(lime);
    scene.add(new THREE.HemisphereLight('#7a88b8', '#101018', 1.05));
    const moon = new THREE.DirectionalLight('#aab8ff', .5); moon.position.set(-10, 25, 10); scene.add(moon);
    const lamp = new THREE.PointLight('#ffc070', 12, 12, 1.2); lamp.position.set(0, 3, 0); scene.add(lamp);
    // Luh: 4 hearts, no armour, shield in hand, totem in the offhand
    const p = player(assets, 'luh'); scene.add(p);
    const sh = hold(p, pixBox(1, 12, 10, (f, i, j) => (i === 0 || j === 0 || i === 9 || j === 11) && (f === 'px' || f === 'nx') ? [40, 40, 44] : [96, 70, 44]), { rx: -.2 }); sh.position.set(-2, -8, -4);
    const off = hold(p, M.totem(), { rx: -1.2, left: true }); off.scale.setScalar(.8);
    const qc = M.quantumCreeper(); qc.scale.multiplyScalar(PX); scene.add(qc);
    const tp = M.particlesCube('#bfe8ff', 18, .6, .08); scene.add(tp);
    const boom = M.puffs(36); scene.add(boom); const flash = M.burst(); scene.add(flash);
    const deb = M.particlesCube('#8a2020', 14, 1.5, .2); scene.add(deb);
    const splash = M.puffs(18, '#9fc8ff'); scene.add(splash);
    const bub = M.particlesCube('#cfefff', 16, .5, .09); scene.add(bub);
    const pop = totemPop(scene);
    const camera = new THREE.PerspectiveCamera(58, 16 / 9, .05, 200);
    const I = 4.6, AP = 1.0, FS = 1.8, EX = 2.35, G = 32, VY = 6;
    const L0 = new THREE.Vector3(3.6, 0, 3.4), POND = new THREE.Vector3(12.5, -20, 10.4);
    const TF = (VY + Math.sqrt(VY * VY + 2 * G * (L0.y - POND.y))) / G, SPLASH = EX + TF, TT = 4.25, AIR0 = SPLASH + .05, AIR1 = AIR0 + .3;
    const QA = new THREE.Vector3(-1.2, 0, -3.2), QB = new THREE.Vector3(2.35, 0, 2.2);
    const posAt = t => {
      if (t < 1.3) return new THREE.Vector3(1.4, 0, 1.2);
      if (t < EX) return new THREE.Vector3(1.4, 0, 1.2).lerp(L0, ease.inOut(clamp((t - 1.3) / (EX - 1.3)))); // backing toward the open side, shield up
      if (t < SPLASH) { const k = (t - EX) / TF, dt = t - EX; return new THREE.Vector3(lerp(L0.x, POND.x, k), L0.y + VY * dt - G / 2 * dt * dt, lerp(L0.z, POND.z, k)); } // thrown off the platform
      const k = ease.out(clamp((t - SPLASH) / .45)); return new THREE.Vector3(POND.x + k * .3, lerp(POND.y, -22, k), POND.z + k * .2); // sinks to the bottom of the pond
    };
    return {
      scene, ink: { skyA: '#0a0e1c', skyB: '#26304c', tint: '#d8e0f4', lineW: 2.3 },
      cues: [{ t: AP, type: 'sfx', kind: 'teleport', gain: .35 }, { t: FS, type: 'sfx', kind: 'hiss', dur: .5, gain: .14 }, { t: EX, type: 'sfx', kind: 'explosion', gain: .9 }, { t: SPLASH, type: 'sfx', kind: 'splash' }, { t: TT, type: 'sfx', kind: 'totem' }],
      hearts: lt => ({ v: lt < AIR1 ? 4 : lt < TT ? Math.max(0, 4 - Math.floor((lt - AIR1) / .08)) : 1, n: 4, blink: lt > AIR1 && lt < I }),
      notes: [
        { t0: .1, t1: 2.0, text: 'el último superviviente', x: 1150, y: 250, size: 54, to: () => p.position.clone().add(new THREE.Vector3(0, 2.1, 0)), bend: 50 },
        { t0: .55, t1: 2.2, text: 'solo 4 corazones', x: 110, y: 660, size: 50, to: [990, 878], bend: 70 },
        { t0: 1.0, t1: 2.5, text: 'entra un ender quantum creeper', x: 110, y: 300, size: 50, circle: () => qc.position.clone().add(new THREE.Vector3(0, .9, 0)), r: 80 },
        { t0: 2.38, t1: 3.62, text: 'la explosión lo lanza fuera', x: 120, y: 600, size: 52, to: () => p.position.clone().add(new THREE.Vector3(0, 1, 0)), bend: 60, dx: -30, dy: 40 },
        { t0: 3.6, t1: 5.95, text: 'día 60: "te ahogas\n10 veces más rápido"', x: 1260, y: 230, size: 50 },
      ],
      overlay(ctx, lt, env) {
        if (lt < SPLASH) rain(ctx, env.t, { alpha: .38, n: 650, seed: 38 });
        if (lt >= I) return;
        text(ctx, `01:39:${String(Math.max(27, 31 - Math.floor(lt))).padStart(2, '0')} para obtener Life Orb`, 960, 150, { font: '32px VT', color: '#ffaa00', stroke: '#000', strokeW: 4 });
        if (lt > SPLASH) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(70,110,200,.45)'; ctx.fillRect(0, 0, 1920, 1080); ctx.restore(); bubbles(ctx, lt < AIR0 ? 10 : Math.max(0, 10 - Math.ceil((lt - AIR0) / (AIR1 - AIR0) * 10))); }
        hotbar(ctx, BAR, { sel: 3, off: lt < TT ? { k: 'totem' } : null });
      },
      update(lt, T) {
        const pos = posAt(lt);
        const standing = lt < EX;
        if (standing) pos.y = groundAt(w, pos.x, pos.z, 3);
        p.position.copy(pos);
        face(p, lt < 1.3 ? -1.5 : QB.x - 3, lt < 1.3 ? -2.5 : QB.z - 3);
        if (lt >= EX) face(p, L0.x - 4, L0.z - 4);
        p.rotation.x = lt > EX && lt < SPLASH ? -(lt - EX) * 1.6 : lt >= SPLASH ? -.5 : 0;
        const back = lt > 1.3 && lt < EX;
        pose(p, { idle: T * 2, walk: -T * 6, swing: back ? .3 : 0, armRaise: back ? 1.1 : lt >= SPLASH ? .7 + Math.sin(T * 7) * .5 : .4, headPitch: lt < 1.3 ? .1 : 0 });
        if (lt > EX && lt < SPLASH) { p.userData.armL.rotation.x = -2.4; p.userData.armR.rotation.x = -2.2; }
        hurt(p, lt > AIR1 && lt < I ? .5 + .5 * Math.sin(T * 30) : lt > EX && lt < EX + .25 ? 1 : 0);
        off.visible = lt < TT;
        // the Ender Quantum Creeper: teleports in by the enchanting table, walks at him, flashes, blows up
        const qk = ease.inOut(clamp((lt - AP - .1) / (FS - AP - .05)));
        const qp = QA.clone().lerp(QB, qk); qc.position.set(qp.x, groundAt(w, qp.x, qp.z, 3), qp.z); face(qc, pos.x, pos.z);
        qc.userData.shimmer(T); legs(qc, T, lt < FS); qFuse(qc, lt, FS, EX);
        qc.visible = lt > AP && lt < EX;
        tp.visible = lt > AP - .05 && lt < AP + .45; tp.position.set(QA.x, 0, QA.z); M.animParticles(tp, (lt - AP) * 2.5, { rise: .5, spread: .6 });
        boom.position.set(QB.x, 1, QB.z); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - EX, { radius: 3.5, size: .7 }); M.animBurst(flash, lt - EX, 3);
        deb.visible = lt > EX && lt < EX + 1; deb.position.copy(boom.position); M.animParticles(deb, (lt - EX) * 2, { rise: 1.4, spread: 2 });
        splash.position.set(POND.x, -20, POND.z); M.animPuffs(splash, lt - SPLASH, { radius: 1.4, size: .4 });
        bub.visible = lt > SPLASH && lt < I + .3; bub.position.set(pos.x, pos.y + 1.4, pos.z); M.animParticles(bub, T * 1.5, { rise: .5, spread: .45 });
        p.visible = lt < I;
        let c;
        if (lt < AP) c = cam(camera, [10, 4.2, 10.5], [-.5, .8, -1], 50); // the library on the platform: rain, the cyan beam
        else if (lt < EX) { const k = (lt - AP) / (EX - AP); c = cam(camera, [lerp(6.4, 6.8, k), lerp(2.6, 2.4, k), lerp(-1.4, -.6, k)], [.4, 1, .4], 56); } // inside: it comes in, he raises the shield and backs off
        else if (lt < SPLASH) { // thrown off the platform: a camera flying alongside him, the pond coming up below
          const k = (lt - EX) / TF, dir = new THREE.Vector3(POND.x - L0.x, 0, POND.z - L0.z).normalize();
          const cp = pos.clone().add(new THREE.Vector3(dir.z * 7.5 - dir.x * 2.2, 2.4 - k * 1.2, -dir.x * 7.5 - dir.z * 2.2));
          const tg = pos.clone().addScaledVector(dir, 2).add(new THREE.Vector3(0, -1.2, 0)).lerp(POND, clamp((k - .55) / .45) * .55);
          c = cam(camera, cp.toArray(), tg.toArray(), 60); }
        else if (lt < I) c = cam(camera, [POND.x + 2.4, -20.9, POND.z + 2.2], [pos.x, pos.y + .8, pos.z], 62); // underwater: no air, the totem
        else { const k = ease.out(clamp((lt - I) / 1.8)); c = cam(camera, [lerp(POND.x + 5, POND.x + 10, k), lerp(-16, -9, k), lerp(POND.z + 5, POND.z + 10, k)], [POND.x, -21, POND.z], 55); }
        pop(camera, lt - TT, p.position.clone().add(new THREE.Vector3(0, 1.1, 0)));
        return c;
      },
    };
  },
};
