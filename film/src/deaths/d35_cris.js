// #35 CrisGreen — día 60, 24/05/2020 15:32. Verified: wiki (Ender Quantum Creeper, tótem "No Equipado (Por falta de
// slots)") + clip (GersoonSG 22:05–22:11, multi-POV 02yEAFKWuKA): a long corridor with white/sand walls, gravel edges,
// stepping blocks and a water channel ends in an obsidian Nether portal; Cris (purple shield up, offhand slot = teal
// blocked item) stands inside it face to face with Shadoune, who eats a golden apple and switches items; a
// translucent shimmering blue-white figure with a gold "Ende…" tag appears right next to Cris; one hit from full
// health; debris and a splash fly down the corridor. Shadoune's totem pops in the same blast (his POV).
// Rubik's documentary: a creeper teleported in while they crossed the portal; Cris couldn't hold a totem (slots locked).
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, armor, groundAt, hurt, totemPop, PX } from './common.js';
import { text } from '../engine.js';
import { pixBox } from '../mobs.js';
import { qFuse, legs, hotbar, offXY } from './lib_d31_d39.js';

function tagSprite(parts, w = 3.4) {
  const c = document.createElement('canvas'); c.width = 640; c.height = 72;
  const x = c.getContext('2d'); x.font = '44px VT'; x.textBaseline = 'middle';
  const tw = parts.reduce((a, [s]) => a + x.measureText(s).width, 0) + 30;
  x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect((640 - tw) / 2, 0, tw, 72);
  let px = (640 - tw) / 2 + 15; parts.forEach(([s, col]) => { x.fillStyle = col; x.fillText(s, px, 38); px += x.measureText(s).width; });
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true })); sp.scale.set(w, w * 72 / 640, 1); return sp;
}
const BAR = [{ k: 'sword', c: '#a050e0' }, { k: 'shield', c: '#8a3ad8' }, { k: 'item', c: '#7a5a3a', n: 61 }, { k: 'item', c: '#f0a030', n: 51 }, { k: 'gapple', n: 52 }, { k: 'diamond' }, { k: 'pick', c: '#a050e0' }, { k: 'x' }, { k: 'x' }];

export default {
  n: 35, player: 'crisgreen', name: 'CrisGreen', ign: 'Crisgreen', day: 60, date: '24/05/2020 · 15:32',
  sfx: 'explosion', impact: 2.9, dur: 4.7, storm: true,
  slow: [{ t: 1.95, d: 1.1, f: .35 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de Crisgreen. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['Ahora por fin descansa en paz.', '#aaaaaa'],
    ['[MIEMBRO] Crisgreen ☠ was blown up by Ender Quantum Creeper', '#ffffff'],
  ],
  build(assets) {
    const w = new World(44, 14, 14, [-22, -4, -7]);
    w.fill(-22, -4, -7, 21, 9, 6, 'sand');
    w.fill(-20, 0, -2, 11, 4, 2, 0); // the corridor
    w.fill(-20, -1, -2, 11, -1, 2, 'gravel');
    w.fill(-20, -1, 0, 11, -1, 0, 'water'); // the water channel
    w.fill(12, -1, -2, 12, 4, 2, 'obsidian'); w.fill(12, 0, -1, 12, 3, 1, 0); // the portal frame (interior z -1..1, y 0..3)
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0a0808');
    scene.add(w.build());
    // stepping blocks on the gravel and in the channel
    const slabM = new THREE.MeshLambertMaterial({ color: '#8a7456' });
    for (let x = -19; x <= 10; x += 2) for (const z of [-1.5, 1.5]) { const m = new THREE.Mesh(new THREE.BoxGeometry(.7, .22, .7), slabM); m.position.set(x + .5 + (z > 0 ? 1 : 0), .11, z + .5); scene.add(m); }
    for (let x = -18; x <= 10; x += 3) { const m = new THREE.Mesh(new THREE.BoxGeometry(.7, .22, .7), slabM); m.position.set(x + .5, -.1, .5); scene.add(m); }
    // a couple of signs and skull pictures on the walls
    const picM = new THREE.MeshLambertMaterial({ color: '#3a2a2a' }), sgnM = new THREE.MeshLambertMaterial({ color: '#b8945f' });
    for (const x of [-12, -4, 4]) { const a = new THREE.Mesh(new THREE.BoxGeometry(.9, .9, .05), picM); a.position.set(x, 3.6, -1.97); scene.add(a); const b = new THREE.Mesh(new THREE.BoxGeometry(1, .5, .05), sgnM); b.position.set(x + 2, 1.6, 2.97); scene.add(b); }
    const portal = new THREE.Mesh(new THREE.BoxGeometry(.12, 4, 3), new THREE.MeshBasicMaterial({ color: '#7a3ae0', transparent: true, opacity: .5, depthWrite: false })); portal.position.set(12.82, 2, .5); scene.add(portal);
    const swirl = M.particlesCube('#c080ff', 30, 1.3, .09); swirl.position.set(12.5, 0, .5); scene.add(swirl);
    scene.add(new THREE.HemisphereLight('#ffffff', '#555544', 1.35));
    const pl = new THREE.PointLight('#a060ff', 10, 8, 1.2); pl.position.set(11, 2, .5); scene.add(pl);
    // Cris (purple shield up) and Shadoune, face to face inside the portal
    const p = player(assets, 'crisgreen'); armor(p, 'purple'); scene.add(p);
    const sh = hold(p, pixBox(1, 12, 10, (f, i, j) => (i === 0 || j === 0 || i === 9 || j === 11) && (f === 'px' || f === 'nx') ? [60, 26, 90] : [138, 58, 216]), { rx: -.2 }); sh.position.set(-2, -8, -4);
    hold(p, pixBox(2, 8, 2, () => [42, 166, 160]), { rx: -.9, left: true }); // offhand: the teal blocked-slot item
    const sha = player(assets, 'shadoune'); armor(sha, 'purple'); scene.add(sha);
    const apple = hold(sha, pixBox(4, 4, 4, () => [240, 200, 60]), { rx: -.3 });
    const swd = hold(sha, M.sword('diamond'), { rx: -1.3 }); swd.traverse(o => { if (o.isMesh) o.material.forEach?.(m => m.color && m.color.set('#b070ff')); });
    const qc = M.quantumCreeper(); qc.scale.multiplyScalar(PX); scene.add(qc);
    const tagQ = tagSprite([['Ender Quantum Creeper', '#ffaa00']], 2.4); scene.add(tagQ);
    const tp = M.particlesCube('#d070ff', 22, .7, .09); scene.add(tp);
    const boom = M.puffs(34); scene.add(boom); const flash = M.burst(); scene.add(flash);
    const debris = M.particlesCube('#8a6a3a', 18, 1.4, .22); scene.add(debris);
    const splash = M.puffs(18, '#9fc8ff'); scene.add(splash);
    const popS = totemPop(scene, { overlay: false }); // Shadoune's totem: seen from Cris's side, world particles only
    const camera = new THREE.PerspectiveCamera(58, 16 / 9, .05, 120);
    const I = 2.9, TP = 2.05, FS = 2.28;
    const CP = [12.35, 1.2], SP = [12.35, -.2], QP = [11.3, 2.35];
    return {
      scene, ink: { skyA: '#1a1414', skyB: '#2a2020', tint: '#f6efe8', lineW: 2.3 },
      cues: [{ t: TP, type: 'sfx', kind: 'teleport', gain: .5 }, { t: FS, type: 'sfx', kind: 'hiss', dur: .6, gain: .14 }, { t: I + .02, type: 'sfx', kind: 'totem', gain: .5 }],
      hearts: lt => ({ v: 10 }),
      notes: [
        { t0: .1, t1: 2.08, text: 'en el portal, con shadoune', x: 1150, y: 230, size: 52, to: () => sha.position.clone().add(new THREE.Vector3(0, 2.2, 0)), bend: 40 },
        { t0: .9, t1: 2.45, text: 'sin tótem: slots bloqueados', x: 110, y: 800, size: 48, to: () => offXY().map((v, i) => v - [0, 36][i]), bend: -40 },
        { t0: 2.05, t1: 2.9, text: 'aparece un ender quantum creeper', x: 1060, y: 230, size: 48, circle: () => qc.position.clone().add(new THREE.Vector3(0, .9, 0)), r: 95 },
        { t0: 2.1, t1: 2.9, text: 'vida completa… y un solo golpe', x: 110, y: 640, size: 50, to: [860, 878], bend: 60 },
        { t0: 2.92, t1: 5.1, text: 'a shadoune le salta el tótem', x: 1180, y: 230, size: 50, to: () => sha.position.clone().add(new THREE.Vector3(0, 1.4, 0)), bend: -40 },
      ],
      overlay(ctx, lt) {
        if (lt >= I) return;
        text(ctx, `06:57:${String(24 - Math.floor(lt * 1.7)).padStart(2, '0')} para obtener Life Orb`, 960, 150, { font: '32px VT', color: '#ffaa00', stroke: '#000', strokeW: 4 });
        text(ctx, 'Quedan 04:34:02 de tormenta', 960, 840, { font: '28px VT', color: '#ffffff', stroke: '#000', strokeW: 4 });
        hotbar(ctx, BAR, { sel: 1, off: { k: 'x' } });
      },
      update(lt, T) {
        p.position.set(CP[0], groundAt(w, CP[0], CP[1], 3), CP[1]); face(p, CP[0], -5);
        sha.position.set(SP[0], groundAt(w, SP[0], SP[1], 3), SP[1]); face(sha, SP[0], 5);
        const eat = lt > .85 && lt < 1.7;
        pose(p, { idle: T * 2, armRaise: lt < 1.2 || lt > 1.9 ? 1.05 : .55 });
        pose(sha, { idle: T * 2, armRaise: eat ? 1.35 + Math.sin(T * 14) * .18 : .45, headPitch: eat ? .15 : 0 });
        apple.visible = lt < 1.7; swd.visible = lt >= 1.7;
        M.animParticles(swirl, T, { rise: 1, spread: 1.3 });
        pl.intensity = 10 + Math.sin(T * 6) * 2;
        // the Ender Quantum Creeper teleports in right beside Cris, flashes, swells
        qc.position.set(QP[0], groundAt(w, QP[0], QP[1], 3), QP[1]); face(qc, CP[0], CP[1]); qc.userData.shimmer(T); legs(qc, T, false);
        qFuse(qc, lt, FS, I);
        qc.visible = lt > TP && lt < I;
        tagQ.visible = qc.visible; tagQ.position.set(qc.position.x, qc.position.y + 1.95, qc.position.z);
        tp.visible = lt > TP - .05 && lt < TP + .5; tp.position.set(QP[0], 0, QP[1]); M.animParticles(tp, (lt - TP) * 2.5, { rise: .5, spread: .7 });
        boom.position.set(QP[0] + .3, 1.2, QP[1] - .4); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - I, { radius: 2.8, size: .5 }); M.animBurst(flash, lt - I, 2.8);
        debris.visible = lt > I && lt < I + 1.1; debris.position.set(9.5, .8, .5); M.animParticles(debris, (lt - I) * 2, { rise: .8, spread: 2.2 });
        splash.position.set(9, 0, .5); M.animPuffs(splash, lt - I - .05, { radius: 1.6, size: .35 });
        hurt(sha, lt > I && lt < I + .35 ? 1 : 0);
        popS(camera, lt - I - .02, sha.position.clone().add(new THREE.Vector3(0, 1.1, 0)));
        p.visible = lt < I;
        if (lt < .95) { const k = ease.inOut(lt / .95); return cam(camera, [lerp(-9, -2, k), 2.3, .6], [12.4, 1.4, .5], 48); } // down the water-channel corridor to the portal
        if (lt < TP) return cam(camera, [10.1, 2.25, 3.1], [12.4, 1.35, .45], 50); // inside the portal: shield up, Shadoune eats a golden apple
        if (lt < I) { const k = (lt - TP) / (I - TP); return cam(camera, [lerp(8.6, 9.0, k), lerp(2.5, 2.3, k), lerp(-1.5, -1.3, k)], [12, 1.1, 1.0], 52); } // it appears right next to Cris
        const k = ease.out(clamp((lt - I) / 1.8));
        return cam(camera, [lerp(7.5, 4.5, k), lerp(3.4, 4.4, k), lerp(-1.2, -1.4, k)], [11, .6, .3], 56); // debris and a splash down the corridor; Shadoune survives
      },
    };
  },
};
