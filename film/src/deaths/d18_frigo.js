// #18 FrigoAdri — día 30, 24/04/2020 18:22. Verified: wiki (Ender Creeper, tótem no activado 1%) + clip
// (GersoonSG 10:37–10:48): the End during the modified dragon fight (boss bar "PERMADEATH DEMON"), endermen
// everywhere, teammates in enchanted armour ([STRAT] Crisgreen, [STRAT] killercreeper55, [DPS] Mikecrack);
// full hearts; he turns away from the group toward a line of endermen; no creeper on screen; a tall figure
// flashing red at the upper left -> "ha explotado por Creeper". His words: "No se me ha activado el tótem."
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, endIsland, armor, hurt, bossBar, hop, groundAt, stand, shake, PX } from './common.js';

// Minecraft-style name plate drawn over a 3D position (projected with the frame's camera)
const V = new THREE.Vector3();
function namePlate(ctx, camera, pos, prefix, pcol, name) {
  V.copy(pos).project(camera);
  if (V.z > 1 || Math.abs(V.x) > 1.1 || Math.abs(V.y) > 1.1) return;
  const x = (V.x + 1) / 2 * 1920, y = (1 - V.y) / 2 * 1080;
  const d = camera.position.distanceTo(pos), s = clamp(9 / d, .45, 1.1);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.font = '30px MC'; ctx.textBaseline = 'middle';
  const w1 = ctx.measureText(prefix + ' ').width, w2 = ctx.measureText(name).width, W = w1 + w2 + 16;
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-W / 2, -20, W, 40);
  ctx.textAlign = 'left'; ctx.fillStyle = pcol; ctx.fillText(prefix, -W / 2 + 8, 1); ctx.fillStyle = '#ffffff'; ctx.fillText(name, -W / 2 + 8 + w1, 1);
  ctx.restore();
}

export default {
  n: 18, player: 'frigo', name: 'FrigoAdri', ign: 'FrigoAdri', day: 30, date: '24/04/2020 · 18:22',
  sfx: 'explosion', impact: 3.0, dur: 4.8, storm: true,
  slow: [{ t: 2.4, d: .6, f: .3 }],
  note: 'EL CREEPER NO APARECE EN CÁMARA',
  chat: [
    ['Este es el comienzo del sufrimiento eterno de FrigoAdri. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['FrigoAdri, Se ha quedado congelado', '#aaaaaa'],
    ['[CONTROL+] FrigoAdri ha explotado por Creeper', '#ffffff'],
  ],
  build(assets) {
    const w = new World(80, 44, 80, [-40, -12, -40]);
    endIsland(w, { r: 34, depth: 10 });
    w.fill(-7, -1, 4, -4, -1, 6, 'bricks'); // the patch of red blocks
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + .4, px = Math.round(Math.sin(a) * 26), pz = Math.round(Math.cos(a) * 26); w.fill(px - 1, 0, pz - 1, px + 1, 16 + (i * 5) % 12, pz + 1, 'obsidian'); }
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0a0610');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#d8c8f0', '#2a2030', 1.25));
    const d = new THREE.DirectionalLight('#fff4e6', .6); d.position.set(4, 12, 6); scene.add(d);
    const p = player(assets, 'frigo'); armor(p, 'purple'); scene.add(p);
    hold(p, M.sword('diamond'), { rx: -1.3 });
    hold(p, M.totem(), { rx: -1.2, left: true }).scale.setScalar(.8);
    // teammates: [skin, prefix, colour, name]
    const mates = [['crisgreen', '[STRAT]', '#ff55ff', 'Crisgreen'], ['killer', '[STRAT]', '#ff55ff', 'killercreeper55'], ['mikecrack', '[DPS]', '#ff5555', 'Mikecrack']].map(([id, ...tag]) => {
      const m = player(assets, id); armor(m, 'purple'); scene.add(m); hold(m, M.sword('diamond'), { rx: -1.3 }); m.userData.tag = tag; return m;
    });
    const mk = () => { const e = M.enderman(); e.scale.multiplyScalar(PX); scene.add(e); return e; };
    // the two endermen the team is fighting, wanderers, and the line he turns toward
    const foes = [mk(), mk()];
    const wander = [[-12, -8], [-9, 9], [2, -11], [-15, 1], [6, 9], [-4, -13], [13, -9], [-18, -6]].map(([x, z], i) => ({ e: mk(), x, z, r: 1.6 + i % 3, sp: .25 + (i % 4) * .08, ph: i * 1.7 }));
    const line = [-5.5, -3.4, -1.3, .8, 2.9, 5].map((z, i) => ({ e: mk(), x: 11 + (i % 2) * .8, z }));
    const red = mk(); hurt(red, 0);
    const sparks = M.particlesCube('#e8f4ff', 14, .9, .09); scene.add(sparks);
    const boom = M.puffs(28); scene.add(boom);
    const flash = M.burst(); scene.add(flash);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 220);
    const I = 3.0, SPOT = new THREE.Vector3();
    const walkE = (e, x, z, nx, nz, T, moving) => { stand(e, w, x, z); face(e, nx, nz); pose(e, { walk: T * 4, swing: moving ? .35 : 0, idle: T }); };
    const plate = new THREE.Vector3(), tmp = new THREE.Vector3();
    let now = 0;
    const POV = 2.25, WIDE = 2.7;
    const HIDE = () => camera.position.clone().addScaledVector(camera.getWorldDirection(tmp), -5); // behind the camera = not drawn
    const when = (ok, fn) => () => ok() ? fn() : HIDE();
    // his path: fights beside the team, moves among them, then turns away toward the line of endermen
    const path = lt => {
      if (lt < 1.3) return [-.8 + Math.sin(lt * 5) * .25, .4];
      if (lt < 2.4) { const k = ease.inOut((lt - 1.3) / 1.1); return [lerp(-.8, 2.6, k), lerp(.4, -.4, k)]; }
      return [lerp(2.6, 3.4, clamp((lt - 2.4) / .6)), -.4];
    };
    return {
      scene, ink: { skyA: '#140a1e', skyB: '#3a2452', tint: '#f2ecff', lineW: 2.3 },
      cues: [{ t: .6, type: 'thunderlow' }, { t: 1.8, type: 'sfx', kind: 'hiss', dur: 1, gain: .12 }],
      hearts: lt => ({ v: 10 }),
      notes: [
        { t0: .1, t1: 2.35, text: 'con su equipo,\ncontra la dragona', x: 1260, y: 225, size: 50, to: when(() => now < POV, () => p.position.clone().add(new THREE.Vector3(0, 2.3, 0))), bend: -40 },
        { t0: 1.3, t1: 2.7, text: 'se aleja hacia\nlos endermen', x: 1260, y: 420, size: 50, to: when(() => now < WIDE, () => line[2].e.position.clone().add(new THREE.Vector3(0, 2.2, 0))), bend: 40 },
        { t0: 2.3, t1: 3.0, text: 'figura alta en rojo', x: 600, y: 300, size: 50, circle: () => red.position.clone().add(new THREE.Vector3(0, 1.9, 0)), r: 120 },
        { t0: 2.2, t1: 3.0, text: 'vida completa… y un solo golpe', x: 1120, y: 720, size: 50, to: [1010, 872], bend: -30 },
        { t0: 3.2, t1: 5.7, text: '«no se me ha activado el tótem»', x: 1080, y: 250, size: 48 },
      ],
      overlay(ctx, lt) {
        if (lt < I) bossBar(ctx, 'PERMADEATH DEMON', .62);
        if (lt < POV) mates.forEach(m => { plate.set(m.position.x, m.position.y + 2.45, m.position.z); namePlate(ctx, camera, plate, ...m.userData.tag); });
      },
      update(lt, T) {
        const [px, pz] = path(lt);
        stand(p, w, px, pz);
        if (lt < 1.3) face(p, foes[0].position.x, foes[0].position.z); else face(p, 12, -.3);
        const swingP = lt < 1.3 && Math.sin(T * 11) > .4;
        pose(p, { idle: T * 2, walk: T * 10, swing: lt > 1.3 && lt < 2.6 ? .6 : 0, armRaise: swingP ? 1.9 : .5 });
        // the team: running, jumping, swinging at the endermen
        const fx = [[-2.0 + Math.sin(T * .9) * .4, -1.9], [-7.6 + Math.sin(T * .7 + 1) * .4, -.4]];
        foes.forEach((e, i) => { walkE(e, fx[i][0], fx[i][1], i ? -6.4 : -.8, i ? 1.4 : .4, T + i, true); });
        const mp = [
          [-1.0 + Math.sin(T * 2.2) * .4, -3.7 + Math.cos(T * 2.2) * .3, 0, 0, .9],
          [-4.6 + Math.cos(T * 1.6) * .8, -1.6 + Math.sin(T * 1.6) * .8, 0, .55, 1],
          [-6.4 + Math.sin(T * 2.6 + 1) * .4, 1.4 + Math.cos(T * 1.3) * .3, 2, .7, .8],
        ];
        mates.forEach((m, i) => {
          const [x, z, foe, hp, jh] = mp[i];
          stand(m, w, x, z, hp ? hop(T + i * .3, hp, jh) : 0);
          face(m, foes[foe === 2 ? 1 : foe].position.x, foes[foe === 2 ? 1 : foe].position.z);
          pose(m, { idle: T * 2 + i, walk: T * 11 + i, swing: .6, armRaise: Math.sin(T * 10 + i * 2) > .3 ? 1.9 : .4 });
        });
        sparks.position.set(-1.8, 1.4, -1.8); M.animParticles(sparks, T * 1.5, { rise: .5, spread: 2.2 });
        wander.forEach(o => { const a = T * o.sp + o.ph, x = o.x + Math.cos(a) * o.r, z = o.z + Math.sin(a) * o.r; walkE(o.e, x, z, x - Math.sin(a), z + Math.cos(a), T + o.ph, true); });
        line.forEach((o, i) => { const s = Math.sin(T * .8 + i) * .3; walkE(o.e, o.x + s, o.z, px, pz, T + i, Math.abs(Math.cos(T * .8 + i)) > .5); });
        // the tall figure flashing red, upper left of his view (knocked up just before the blast)
        const rk = clamp((lt - 2.55) / .45);
        now = lt;
        stand(red, w, 7.4 - rk * .5, -4.3 + rk * .3, ease.out(rk) * 2.2); face(red, px, pz);
        pose(red, { idle: T, headYaw: .3 }); red.userData.legR.rotation.x = rk * .5; red.userData.legL.rotation.x = -rk * .3;
        red.visible = lt > 2.2;
        hurt(red, lt > 2.4 && Math.floor(lt * 14) % 2 === 0 ? 1.2 : 0);
        // the blast comes from off camera (behind-left of him); the creeper is never shown
        if (lt < I) SPOT.set(px - 1.4, .8, pz - 1.2);
        boom.position.copy(SPOT); flash.position.copy(SPOT);
        M.animPuffs(boom, lt - I, { radius: 2.6, size: .55 }); M.animBurst(flash, lt - I, 1.1);
        p.visible = lt < POV || (lt >= WIDE && lt < I);
        if (lt < 1.3) return cam(camera, [lerp(-2.6, -3.2, lt / 1.3), 3, 7.6], [-3.6, 1.1, -.4], 56); // the fight with the team, endermen everywhere
        if (lt < POV) return cam(camera, [px - 3.2, 2.4, pz + 3], [lerp(4, 10, (lt - 1.3) / 1.1), 1.6, -1], 56); // he turns away, toward the line of endermen
        if (lt < WIDE) return cam(camera, [px, groundAt(w, px, pz) + 1.62, pz], [11, 2.1, -1.8], 64); // his view: full hearts; a red-flashing figure
        if (lt < I) { const [sx, sy] = shake(T, lt > 2.9 ? .03 : 0); return cam(camera, [8.8 + sx, 3.1 + sy, 5.6], [5.2, 2.3, -2.2], 58); } // 3/4: him, the figure knocked up beside him; the blast comes from off camera
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(px + 2.5, px + 4.5, k), lerp(3.5, 8, k), lerp(pz + 5, pz + 9, k)], [SPOT.x, 0, SPOT.z], 55);
      },
    };
  },
};
