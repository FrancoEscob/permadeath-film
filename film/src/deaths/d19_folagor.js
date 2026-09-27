// #19 Folagor — día 32, 26/04/2020 20:54. Verified: wiki (Ender Ghast, totem consumido) + clip
// (GersoonSG 11:42–12:02): End; he is in the "Editar mensaje del cartel" screen writing "DEP / Hermano. /
// Te extrañaré. / Folagor_" when an explosion pops his totem (captions "Explosión", "Tótem activado"; toast
// "¡Objetivo conseguido! Post mortem"); the totem animation plays when the menu closes; purple shield up among
// endermen and fire patches, craters, ghasts overhead, magenta ring sprites; hearts regen, suddenly drop to 1,
// a ghast opens its red mouth; he walks to the island edge (water, endermen) and dies at ~3 hearts with no
// visible impact ("ha explotado por Ender Ghast").
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, fireBits, sign, totemPop, endIsland, toast, ring, stand, groundAt, PX } from './common.js';
import { pixBox } from '../mobs.js';
import { text } from '../engine.js';

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const SIGN = ['DEP', 'Hermano.', 'Te extrañaré.', 'Folagor_'];
const T_BOOM = .45, T_TOAST = .55, T_TOT = .8, T_DROP = 2.35, T_MOUTH = 2.45, I = 3.35;

export default {
  n: 19, player: 'folagor', name: 'Folagor', ign: 'Folagoro', day: 32, date: '26/04/2020 · 20:54',
  sfx: 'explosion', impact: 3.35, dur: 5.0,
  slow: [{ t: .35, d: .95, f: .35 }, { t: 2.45, d: .95, f: .3 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de Folagoro. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['FolagoR, Failagor a partir de ahora', '#aaaaaa'],
    ['[MIEMBRO] Folagoro ha explotado por Ender Ghast', '#ffffff'],
  ],
  build(assets) {
    const w = new World(72, 50, 72, [-36, -12, -36]);
    endIsland(w, { r: 30, depth: 10 });
    // craters
    for (const [cx, cz] of [[-4, 3], [5, -5], [-7, -8], [3, 6]]) for (let x = -2; x <= 2; x++) for (let z = -2; z <= 2; z++) if (Math.hypot(x, z) < 2.2) w.set(cx + x, -1, cz + z, 0);
    // water + lava at the island edge (ahead of him)
    w.fill(9, -1, -3, 13, -1, 2, 'water'); w.fill(12, -1, 4, 14, -1, 6, 'lava');
    // obsidian pillars in the distance
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + .3, px = Math.round(Math.sin(a) * 24), pz = Math.round(Math.cos(a) * 24); w.fill(px - 1, 0, pz - 1, px + 1, 14 + (i * 7) % 14, pz + 1, 'obsidian'); }
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0b0610');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#d8c8f0', '#2a2030', 1.25));
    const d = new THREE.DirectionalLight('#fff4e6', .7); d.position.set(4, 12, 6); scene.add(d);

    const p = player(assets, 'folagor'); scene.add(p);
    const shield = pixBox(1, 12, 10, (f, i, j) => (i === 0 || j === 0 || i === 9 || j === 11) && (f === 'px' || f === 'nx') ? hex('#3a1a5a') : hex('#8a3ad8'));
    const sh = hold(p, shield, { rx: -.2, ry: 0 }); sh.position.set(-1, -8, -3);
    const sg = sign(SIGN); stand(sg, w, .5, -1.3); scene.add(sg);
    const enders = [[-3, -2], [3.5, 3], [2, -4.5], [-2.5, 4.5], [10.5, 3.5], [8, -3.6]].map(([x, z], i) => { const e = M.enderman(); e.scale.multiplyScalar(PX); stand(e, w, x, z); face(e, i % 2 ? 0 : 10, 0); scene.add(e); return e; });
    const GY = [15, 12, 15.5, 14];
    const ghasts = [[-8, 15, -12], [5, 12, -8], [3, 15.5, 11], [-11, 14, 6]].map(([x, y, z]) => { const g = M.ghast(); g.scale.multiplyScalar(PX * 4); /* ghasts are ~4 blocks */ g.position.set(x, y, z); face(g, 0, 0); scene.add(g); return g; });
    const fires = [[-4, 3], [5, -5], [-1.5, -3.5], [3, 2.5], [6.5, 1.5], [-6.5, -1], [1.5, 5.5]].map(([x, z]) => { const f = fireBits(5, 1); stand(f, w, x, z); scene.add(f); return f; });
    const rings = [0, 1, 2].map(i => { const r = ring(); scene.add(r); return r; });
    const boom0 = M.puffs(18); stand(boom0, w, 2.5, -3.5, .6); scene.add(boom0);
    const boom = M.puffs(26); scene.add(boom);
    const flash = M.burst(); scene.add(flash);
    const pop = totemPop(scene); // his own screen: the in-game totem animation
    const camera = new THREE.PerspectiveCamera(50, 16 / 9, .05, 200);
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const mouthAt = () => { ghasts[1].updateMatrixWorld(); return ghasts[1].localToWorld(V(0, -3, 8.5)); };

    return {
      scene, ink: { skyA: '#140a1e', skyB: '#3a2452', tint: '#f2ecff', lineW: 2.3 },
      cues: [{ t: T_BOOM, type: 'sfx', kind: 'explosion', gain: .45 }, { t: T_TOT, type: 'sfx', kind: 'totem' }, { t: T_DROP, type: 'sfx', kind: 'hurt', gain: .4 }, { t: T_MOUTH + .1, type: 'sfx', kind: 'shoot' }],
      hearts: lt => lt < T_TOT ? null : ({ v: lt < 1.4 ? 1.5 : lt < T_DROP ? Math.min(8, 1.5 + (lt - 1.4) * 7) : lt < 2.65 ? 1 : 3, blink: lt > T_DROP && lt < T_DROP + .15 }),
      notes: [
        { t0: .05, t1: .95, text: 'escribe un cartel', x: 1360, y: 400, size: 52, to: [1300, 470], ax: 1420, ay: 440, bend: -30 },
        { t0: .65, t1: 1.75, text: 'una explosión: salta el tótem', x: 1300, y: 540, size: 48 },
        { t0: 2.4, t1: 3.0, text: 'un ghast abre la boca', x: 1150, y: 700, size: 52, to: () => mouthAt(), ax: 1300, ay: 660, bend: 60 },
        { t0: 2.85, t1: I, text: '3 corazones', x: 470, y: 800, size: 56, to: [800, 890], ax: 640, ay: 830, bend: 30 },
        { t0: 3.5, t1: 6.0, text: 'el golpe final no se ve', x: 1150, y: 240, size: 50 },
      ],
      update(lt, T) {
        const walk = lt > 2.9 ? (lt - 2.9) : 0;
        const x = walk * 3.4, z = walk * .45;
        stand(p, w, x, z);
        face(p, lt > 2.9 ? 12 : lt < 1.35 ? .5 : -2, lt > 2.9 ? 1 : lt < 1.35 ? -3 : 2);
        const shieldUp = lt > 1.55;
        pose(p, { idle: T * 2, walk: walk * 9, swing: walk ? .6 : 0, armRaise: shieldUp ? 1.1 : .3, headPitch: lt > T_MOUTH && lt < 2.9 ? -.6 : .1, headYaw: lt > 1.35 && lt < T_MOUTH ? Math.sin(T * 1.5) * .6 : 0 });
        sh.visible = lt > 1.35;
        enders.forEach((e, i) => { pose(e, { idle: T + i, headYaw: Math.sin(T * .8 + i) * .3 }); });
        ghasts.forEach((g, i) => { g.position.y = GY[i] + Math.sin(T * 1.3 + i) * .3; g.userData.tent.forEach((t, k) => t.rotation.x = Math.sin(T * 2.5 + k) * .25); g.userData.faceOpen(i === 1 && lt > T_MOUTH && lt < 3.15); face(g, p.position.x, p.position.z); });
        fires.forEach(f => f.userData.anim(T));
        rings.forEach((r, i) => { const k = (T * .25 + i * .33) % 1; r.position.set(lerp(-5 + i * 3, 4 + i * 2, k), 3.4 + i * 1.1 + Math.sin(T + i) * .3, lerp(-1 - i * 2, -5 + i, k)); r.rotation.set(T * .7 + i, T * .5, 0); r.visible = lt > 1.35 && lt < I; });
        M.animPuffs(boom0, lt - T_BOOM, { radius: 2, size: .5 });
        boom.position.set(p.position.x, p.position.y + .8, p.position.z); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - I, { radius: 2.6, size: .6 });
        M.animBurst(flash, lt - I, 3.5);
        p.visible = lt >= T_TOT && lt < I;
        const gy = groundAt(w, x, z);
        let c;
        if (lt < T_TOT) c = cam(camera, [.1, 1.62, .4], [.5, 1.05, -1.3], 55); // his view: the sign (behind the edit screen)
        else if (lt < 1.35) { const k = ease.inOut((lt - T_TOT) / .55); c = cam(camera, [lerp(2.9, 2.6, k), 1.8, lerp(3.0, 2.7, k)], [0, 1.1, -.4], 50); } // the totem pops; endermen around
        else if (lt < T_MOUTH) { const k = (lt - 1.35) / 1.1; c = cam(camera, [lerp(-4.5, -5.2, k), 1.0, lerp(4.5, 3.8, k)], [.3, 3.6, -2], 60); } // shield up; ghasts overhead, fire, craters
        else if (lt < 3.0) { const k = ease.inOut((lt - T_MOUTH) / .55); c = cam(camera, [lerp(-1.5, -1.7, k), 1.2, lerp(2.4, 2.6, k)], [lerp(3.4, 3.7, k), 9.2, -6.2], 52); } // over his shoulder: the ghast's red mouth
        else if (lt < I) c = cam(camera, [x - 2.4, gy + 2.6, z + 4.4], [x + 3.5, gy + .8, z - .4], 52); // to the island edge, 3 hearts
        else { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(x - 2.4, x - 5, k), lerp(gy + 2.6, 8, k), lerp(z + 4.4, z + 8, k)], [x + 1, 0, z], 52); }
        pop(camera, (lt - T_TOT) * 2.2, V(p.position.x, p.position.y + 1, p.position.z)); // (compressed: over before the ghast)
        return c;
      },
      overlay(ctx, lt) {
        if (lt < T_TOT) { // "Editar mensaje del cartel" — the sign edit screen he is in when the explosion hits
          const a = 1 - clamp((lt - (T_TOT - .08)) / .08);
          ctx.save(); ctx.globalAlpha = a;
          ctx.fillStyle = 'rgba(12,6,20,.6)'; ctx.fillRect(0, 0, 1920, 1080);
          text(ctx, 'Editar mensaje del cartel', 960, 215, { font: '44px VT', color: '#ffffff', stroke: '#1a1a1a', strokeW: 5 });
          ctx.fillStyle = '#5a4020'; ctx.fillRect(612, 282, 696, 356);
          ctx.fillStyle = '#b8945f'; ctx.fillRect(620, 290, 680, 340);
          ctx.fillStyle = '#9a7a48'; for (let i = 0; i < 8; i++) ctx.fillRect(620, 290 + i * 42 + 40, 680, 3);
          const typed = Math.floor(clamp(lt / .5) * SIGN.join('').length);
          let n = typed;
          SIGN.forEach((l, i) => { const k = Math.max(0, Math.min(l.length, n)); n -= l.length; text(ctx, l.slice(0, k), 960, 345 + i * 76, { font: '54px VT', color: '#111111' }); });
          ctx.fillStyle = '#6f6f6f'; ctx.fillRect(760, 720, 400, 64); ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 4; ctx.strokeRect(760, 720, 400, 64);
          ctx.fillStyle = '#9a9a9a'; ctx.fillRect(764, 724, 392, 6);
          text(ctx, 'Aceptar', 960, 754, { font: '40px VT', color: '#ffffff', stroke: '#2a2a2a', strokeW: 3 });
          ctx.restore();
        }
        if (lt > T_TOAST && lt < 2.3) toast(ctx, '¡Objetivo conseguido!', 'Post mortem', Math.min(clamp((lt - T_TOAST) / .1), 1 - clamp((lt - 2.1) / .2)));
      },
    };
  },
};
