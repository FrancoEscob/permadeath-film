// #39 OmniRich — ElRichMC's admin character, 24/05/2020 ~23:00 (wiki says 05/06, but the clip's screenshot
// filenames are 2020-05-24_22.5x and both uploads are from 25/05). Verified: wiki (Vex) + clip (Shem
// fD_eMUi4axs 0:14–2:55, Pollo XD 3M61zZRgG2c): only 2 hearts, shield raised (lower left), walking a packed-ice
// highway through a netherrack tunnel with torches (sign "Aldea de Crisgreen"); through an obsidian portal into
// daylight onto a plaza of white tiles with teal grout; he turns right and a reddish Vex dives from the upper right
// -> "[ADMIN] OmniRich was slain by Vex" in one hit. His body is never seen (it's his POV): first person only.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { cam, clamp, lerp, ease, torch, sign, PX } from './common.js';
import { pixBox } from '../mobs.js';
import { hotbar } from './lib_d31_d39.js';

const BAR = [{ k: 'diamond' }, { k: 'item', c: '#8fd8f0' }, { k: 'carrot', n: 61 }, { k: 'carrot', n: 64 }, { k: 'milk' }, null, null, null, { k: 'item', c: '#b8945f' }];

export default {
  n: 39, player: 'omnirich', name: 'OmniRich', ign: 'OmniRich', day: 60, date: '24/05/2020 · ≈20:59',
  sfx: 'hit', impact: 3.0, dur: 4.9,
  slow: [{ t: 2.45, d: .55, f: .3 }],
  note: 'PERSONAJE ADMIN DE ELRICHMC',
  chat: [
    ['Este es el comienzo del sufrimiento eterno de OmniRich. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['Ahora por fin descansa en paz.', '#aaaaaa'],
    ['[ADMIN] OmniRich was slain by Vex', '#ffffff'],
  ],
  build(assets) {
    const w = new World(80, 20, 64, [-44, -4, -32]);
    // Nether: a netherrack tunnel with the packed-ice highway (x < -3), dark slabs along its edges
    w.fill(-44, -4, -4, -3, 7, 5, 'netherrack'); w.fill(-44, 0, -2, -4, 4, 3, 0);
    w.fill(-44, -1, -1, -4, -1, 1, 'packed_ice');
    for (let x = -42; x < -4; x += 3) { w.set(x, -1, -2, 'blackstone'); w.set(x, -1, 2, 'blackstone'); }
    w.fill(-3, -1, -2, -3, 4, 3, 'obsidian'); w.fill(-3, 0, -1, -3, 3, 1, 0);
    // Overworld: a big plaza of white tiles with raised tile rows, a brick build and trees in the distance
    w.fill(0, -4, -32, 35, -2, 31, 'dirt'); w.fill(0, -1, -32, 35, -1, 31, 'white_tile');
    for (const [x0, x1, z] of [[5, 22, 6], [5, 22, -5], [12, 22, 12]]) w.fill(x0, 0, z, x1, 0, z, 'white_tile');
    w.fill(1, -1, -2, 1, 4, 2, 'obsidian'); w.fill(1, 0, -1, 1, 3, 1, 0);
    w.fill(24, 0, 14, 32, 7, 22, 'bricks'); w.fill(25, 0, 15, 31, 6, 21, 0); w.fill(24, 8, 14, 32, 8, 22, 'planks');
    for (const [x, z] of [[28, -8], [18, 24], [33, 4]]) { w.fill(x, 0, z, x, 3, z, 'log'); w.fill(x - 2, 4, z - 2, x + 2, 5, z + 2, 'leaves'); w.fill(x - 1, 6, z - 1, x + 1, 6, z + 1, 'leaves'); }
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#a9c8f0');
    scene.add(w.build());
    const portals = [-2.5, 1.5].map(x => { const m = new THREE.Mesh(new THREE.BoxGeometry(.2, 4, 3), new THREE.MeshBasicMaterial({ color: '#7a3ae0', transparent: true, opacity: .7 })); m.position.set(x, 2, .5); scene.add(m); return m; });
    for (let x = -40; x < -5; x += 6) for (const z of [-1.5, 2.5]) { const t = torch(); t.scale.setScalar(PX); t.position.set(x + .5, 0, z); scene.add(t); const l = new THREE.PointLight('#ffb060', 5, 7, 1.3); l.position.set(x + .5, 1.2, z); scene.add(l); }
    const sg = sign(['Aldea de', 'Crisgreen']); sg.position.set(-11.5, 0, 2.3); sg.rotation.y = -Math.PI / 2 - .5; scene.add(sg);
    scene.add(new THREE.HemisphereLight('#ffffff', '#886666', 1.3));
    const sun = new THREE.DirectionalLight('#fff4e6', .9); sun.position.set(10, 20, 10); scene.add(sun);
    // his raised shield (offhand), lower left of his view
    const shield = pixBox(1, 12, 10, (f, i, j) => (i === 0 || j === 0 || i === 9 || j === 11) && (f === 'px' || f === 'nx') ? [110, 110, 110] : [150, 110, 60]);
    shield.scale.setScalar(PX * 1.15); scene.add(shield);
    const vex = M.vex(); vex.scale.multiplyScalar(PX * 2.1);
    vex.traverse(o => { if (o.isMesh) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { if (m.color) m.color.set('#f0a8a0'); if (m.emissive) { m.emissive.set('#a04040'); m.emissiveIntensity = .55; } }); });
    scene.add(vex);
    const camera = new THREE.PerspectiveCamera(66, 16 / 9, .05, 200);
    const I = 3.0, P0 = 1.4, P1 = 1.85, VX = 2.45;
    const v = new THREE.Vector3(), eyeAt = new THREE.Vector3(), fw = new THREE.Vector3(), rt = new THREE.Vector3();
    const Z = .5;
    return {
      scene, ink: { skyA: '#a9bfd6', skyB: '#efe3c8', lineW: 2.3 },
      cues: [{ t: P0, type: 'sfx', kind: 'teleport' }, { t: VX, type: 'sfx', kind: 'whoosh', dur: .35, gain: .3 }, { t: I - .02, type: 'sfx', kind: 'hurt' }],
      hearts: lt => ({ v: 2, n: 2 }),
      notes: [
        { t0: .1, t1: 4.3, text: 'OmniRich: el personaje admin\nde ElRichMC, con solo 2 corazones', x: 580, y: 225, size: 46 },
        { t0: .3, t1: 2.1, text: 'escudo en alto', x: 640, y: 560, size: 52, to: () => shield.position.clone(), bend: 50 },
        { t0: 2.1, t1: 3.0, text: '2 corazones: un golpe basta', x: 1230, y: 820, size: 50, to: [985, 884], bend: -40 },
        { t0: 2.45, t1: 3.0, text: 'un vex, en picado', x: 640, y: 430, size: 54, circle: () => vex.position.clone().add(new THREE.Vector3(0, .65, 0)), r: 80 },
      ],
      overlay(ctx, lt) {
        if (lt > P0 && lt < P1) { // the portal swirl
          const k = Math.sin(clamp((lt - P0) / (P1 - P0)) * Math.PI);
          ctx.save(); ctx.globalAlpha = .85 * k; ctx.fillStyle = '#5a1ab8'; ctx.fillRect(0, 0, 1920, 1080);
          ctx.strokeStyle = 'rgba(200,140,255,.6)'; ctx.lineWidth = 6;
          for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(960 + Math.sin(i * 2.1 + lt * 3) * 500, 540 + Math.cos(i * 1.7 + lt * 2) * 300, 40 + i * 9, lt * 4 + i, lt * 4 + i + 2.2); ctx.stroke(); }
          ctx.restore();
        }
        if (lt < I) hotbar(ctx, BAR, { sel: 2, off: { k: 'shield' } });
      },
      update(lt, T) {
        let x, look;
        if (lt < P0) { x = lerp(-24, -3.2, lt / P0); look = [x + 10, 1.35, Z]; } // the ice highway through the Nether
        else if (lt < P1) { x = lerp(-3.2, 2.3, (lt - P0) / (P1 - P0)); look = [x + 10, 1.4, Z]; } // through the portal
        else { x = lerp(2.3, 4.6, clamp((lt - P1) / .8)); const tk = ease.inOut(clamp((lt - 2.2) / .35)); look = [x + 10 - tk * 4, 1.5 + tk * .2, Z + tk * 6.5]; } // out onto the white plaza, then he turns right
        const bob = Math.sin(lt * 9) * .03;
        const c = cam(camera, [x, 1.62 + bob, Z], look, 66);
        eyeAt.copy(c.position);
        c.getWorldDirection(fw); rt.crossVectors(fw, c.up).normalize();
        shield.position.copy(c.position).addScaledVector(fw, 1).addScaledVector(rt, -.62); shield.position.y -= .42;
        shield.quaternion.copy(c.quaternion); shield.rotateY(Math.PI / 2 + .25);
        shield.visible = lt < I;
        portals.forEach(m => m.material.opacity = .55 + .2 * Math.sin(T * 6));
        scene.background.set(lt < P0 + .2 ? '#1a0503' : '#a9c8f0');
        scene.fog = lt < P0 + .2 ? null : scene.fog;
        // the vex: dives out of the sky from the upper right, sword raised, wings beating
        const k0 = clamp((lt - VX) / (I - VX)), vk = k0 * .55 + k0 * k0 * .45;
        const from = eyeAt.clone().addScaledVector(fw, 10).addScaledVector(rt, 6.6).add(new THREE.Vector3(0, 3.1, 0));
        const to = eyeAt.clone().addScaledVector(fw, 1.5).add(new THREE.Vector3(0, -.85, 0));
        if (lt < I) vex.position.copy(from.lerp(to, vk));
        vex.visible = lt > VX && lt < I + .15;
        vex.rotation.set(0, Math.atan2(eyeAt.x - vex.position.x, eyeAt.z - vex.position.z), 0); vex.rotateX(.45); // upright, leaning into the dive
        vex.userData.wL.rotation.y = Math.sin(T * 34) * .6; vex.userData.wR.rotation.y = -Math.sin(T * 34) * .6;
        vex.userData.arm.rotation.x = -2.3 + vk * 1.2;
        if (lt >= I) { const k = ease.out(clamp((lt - I) / 1.8)); return cam(camera, [lerp(x, x - 3.5, k), lerp(1.7, 6.5, k), lerp(Z, Z + 6, k)], [lerp(x + 4, x, k), 0, Z], 55); } // spectator: floating up over the plaza, next to the portal
        return c;
      },
    };
  },
};
