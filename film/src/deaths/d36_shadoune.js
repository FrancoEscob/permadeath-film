// #36 Shadoune666 — día 60, 24/05/2020 15:37. Verified: wiki (Ahogarse, tótem consumido) + clip (GersoonSG
// 22:40–22:49, frames checked 1360–1367 s): minutes after CrisGreen died in the portal, he comes back through the
// Nether portal into his base — a flooded area with an obsidian portal, a glass-grid tower, pink blocks, water
// everywhere; white explosion smoke with crescents and purple debris; 1 heart; the totem pops ("ha consumido 93
// tótem (Probabilidad: 27 < 93)"); he ends up underwater among seagrass and drowns ~2 s later. Rubik's documentary:
// he dodged one creeper, another blew up behind him, the totem worked, he fell into the water a few blocks from his
// base and "el conduit no funcionó" (his own words). Official day-60 rule: "Te ahogas 10 veces más rápido".
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, armor, totemPop, groundAt, creeperFuse, walkCreeper, PX } from './common.js';
import { text } from '../engine.js';

function airBar(ctx, n) {
  for (let i = 0; i < 10; i++) {
    const x = 1010 + i * 30, y = 850;
    if (i < n) { ctx.fillStyle = '#cfefff'; ctx.beginPath(); ctx.arc(x, y, 11, 0, 7); ctx.fill(); ctx.strokeStyle = '#1a3a6a'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(x - 5, y - 6, 3, 3); }
  }
}

export default {
  n: 36, player: 'shadoune', name: 'Shadoune', ign: 'Shadoune666', day: 60, date: '24/05/2020 · 15:37',
  sfx: 'drown', impact: 4.3, dur: 5.6, storm: true,
  slow: [{ t: 1.3, d: 1.0, f: .35 }],
  chat: [
    ['Shadoune666 ha consumido 93 tótem. (Probabilidad: 27 < 93)', '#ffff55'],
    ['Este es el comienzo del sufrimiento eterno de Shadoune666. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['Shadoune666, Oui, oui, la baguette est bien mort', '#aaaaaa'],
    ['[MIEMBRO] Shadoune666 ☠ drowned', '#ffffff'],
  ],
  build(assets) {
    const w = new World(56, 26, 56, [-28, -10, -28]);
    w.fill(-28, -10, -28, 27, -9, 27, 'sand');
    w.fill(-28, -8, -28, 27, -1, 27, 'water');
    // his base: a pier/platform with the obsidian portal and pink blocks, a glass-grid tower
    w.fill(-4, -8, -3, 5, 0, 3, 'pink'); w.fill(-3, -8, -2, 4, 0, 2, 'stone_bricks');
    w.fill(-1, 1, -3, -1, 5, 2, 'obsidian'); w.fill(-1, 2, -2, -1, 4, 1, 0); // portal frame facing +x
    w.fill(4, 1, -3, 5, 2, -3, 'pink'); w.fill(-4, 1, 2, -3, 1, 3, 'pink');
    for (let y = 1; y < 16; y++) { for (const [x, z] of [[8, -8], [11, -8], [8, -5], [11, -5]]) w.set(x, y, z, 'glass'); if (y % 3 === 0) w.fill(8, y, -8, 11, y, -5, 'glass'); }
    w.fill(8, -8, -8, 11, 0, -5, 'stone_bricks');
    for (const [x, z, h] of [[14, 6, 7], [-12, -10, 9]]) w.fill(x, -8, z, x, h, z, 'obsidian'); // obsidian pillars
    w.fill(18, -8, 10, 26, 1, 20, 'stone_bricks'); w.fill(19, 2, 11, 25, 5, 19, 'planks'); // the base, a few blocks away
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0a0e1c');
    scene.add(w.build());
    const portal = new THREE.Mesh(new THREE.BoxGeometry(.25, 3, 4), new THREE.MeshBasicMaterial({ color: '#7a3ae0', transparent: true, opacity: .7 }));
    portal.position.set(-.5, 3.5, 0); scene.add(portal);
    const weeds = new THREE.Group();
    for (let i = 0; i < 70; i++) { const h = .6 + (i % 4) * .35; const m = new THREE.Mesh(new THREE.BoxGeometry(.12, h, .12), new THREE.MeshLambertMaterial({ color: i % 3 ? '#3a8a3a' : '#2f6f2f' })); m.position.set(6 + (i * 7.3) % 12, -9 + h / 2, -6 + (i * 5.1) % 14); weeds.add(m); }
    scene.add(weeds);
    // the conduit (he said it didn't work)
    const conduit = new THREE.Group(); const cm = new THREE.Mesh(new THREE.BoxGeometry(.4, .4, .4), new THREE.MeshBasicMaterial({ color: '#d8b070' })); conduit.add(cm);
    const eye = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, .2), new THREE.MeshBasicMaterial({ color: '#2a8aa8' })); eye.position.z = .21; conduit.add(eye);
    conduit.position.set(9.5, -4.5, -1.5); scene.add(conduit);
    scene.add(new THREE.HemisphereLight('#7a8ab8', '#101018', 1.1));
    const moon = new THREE.DirectionalLight('#aab8ff', .7); moon.position.set(-10, 25, 10); scene.add(moon);
    const pl = new THREE.PointLight('#a060ff', 14, 8, 1.2); pl.position.set(.5, 3.5, 0); scene.add(pl);

    const p = player(assets, 'shadoune'); armor(p, 'purple'); scene.add(p);
    const sh = hold(p, M.shield(), { rx: -.2 }); sh.position.set(-2, -8, -4);
    const off = hold(p, M.totem(), { rx: -1.2, left: true }); off.scale.setScalar(.8);
    const qa = M.quantumCreeper(); qa.scale.multiplyScalar(PX); scene.add(qa);
    const qb = M.quantumCreeper(); qb.scale.multiplyScalar(PX); scene.add(qb);
    const boom = M.puffs(32); scene.add(boom); const flash = M.burst(); scene.add(flash);
    const deb = M.particlesCube('#9a5ae0', 18, 1.5, .16); scene.add(deb);
    const bubbles = M.particlesCube('#cfefff', 16, .5, .09); scene.add(bubbles);
    const pop = totemPop(scene);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 160);
    const I = 4.3, EX = 1.55, TT = 1.95, SPLASH = 2.3;
    const proj = new THREE.Vector3();
    const qbAt = new THREE.Vector3();
    const path = t => {
      if (t < .5) return [lerp(-.5, .8, t / .5), 1, 0];
      if (t < EX) { const k = (t - .5) / (EX - .5); return [lerp(.8, 3.6, k), 1, lerp(0, 1.3, k)]; }
      if (t < SPLASH) { const k = (t - EX) / (SPLASH - EX); return [lerp(3.6, 6.8, k), 1 + Math.sin(k * Math.PI) * 1.6 - k * 1.5, lerp(1.3, 1.6, k)]; } // thrown by the blast
      const k = clamp((t - SPLASH) / (I - SPLASH)); return [lerp(6.8, 8, k), lerp(-.5, -8.2, ease.out(k)), lerp(1.6, 1, k)];
    };
    return {
      scene, ink: { skyA: '#0a0e1c', skyB: '#26304c', tint: '#d8e0f4', lineW: 2.3 },
      cues: [{ t: .05, type: 'sfx', kind: 'teleport' }, { t: .9, type: 'sfx', kind: 'hiss', dur: .6, gain: .14 }, { t: EX, type: 'sfx', kind: 'explosion', gain: .7 }, { t: TT, type: 'sfx', kind: 'totem' }, { t: SPLASH, type: 'sfx', kind: 'splash' }],
      hearts: lt => (lt > EX ? { v: lt < TT ? .5 : 1 } : null),
      notes: [
        { t0: .2, t1: 1.2, text: 'vuelve por el portal a su base inundada', x: 110, y: 820, size: 50 },
        { t0: .9, t1: 1.45, text: 'esquiva un creeper…', x: 1250, y: 200, size: 50, to: () => qa.position.clone().add(new THREE.Vector3(0, 1.8, 0)) },
        { t0: 1.3, t1: 2.2, text: '…y otro le explota por la espalda', x: 1080, y: 300, size: 50, to: () => new THREE.Vector3(qbAt.x, 1.6, qbAt.z) },
        { t0: 1.95, t1: 2.6, text: 'el tótem le salva: 1 corazón', x: 110, y: 820, size: 50 },
        { t0: 2.35, t1: 3.7, text: 'cae al agua', x: 1250, y: 250, size: 56, to: () => p.position.clone().add(new THREE.Vector3(0, 1, 0)) },
      ],
      overlay(ctx, lt) {
        if (lt < I) text(ctx, '06:52:54 para obtener Life Orb', 960, 150, { font: '32px VT', color: '#ffaa00', stroke: '#000', strokeW: 4 });
        if (lt > SPLASH && lt < I) {
          ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(60,100,200,.5)'; ctx.fillRect(0, 0, 1920, 1080); ctx.restore();
          airBar(ctx, Math.max(0, 10 - Math.floor((lt - SPLASH - .15) / .12)));
        }
        if (lt > SPLASH + .3 && lt < I) { ctx.save(); ctx.font = '46px Hand'; ctx.fillStyle = '#ffe9a0'; ctx.fillText('día 60: "te ahogas 10 veces más rápido"', 110, 330); ctx.restore(); }
        if (lt > SPLASH + .3 && lt < I && proj.z < 1) {
          const sx = (proj.x + 1) / 2 * 1920, sy = (1 - proj.y) / 2 * 1080;
          ctx.save(); ctx.font = '48px Hand'; ctx.fillStyle = '#ffe9a0'; ctx.strokeStyle = '#ffe9a0'; ctx.lineWidth = 5; ctx.lineCap = 'round';
          ctx.fillText('conduit', sx + 110, sy - 70);
          ctx.beginPath(); ctx.moveTo(sx + 120, sy - 55); ctx.quadraticCurveTo(sx + 60, sy - 40, sx + 22, sy - 12); ctx.stroke(); ctx.restore();
        }
        if (lt > I + 1.0) text(ctx, '«El conduit no funcionó.»', 960, 740, { font: 'italic 700 44px Cinzel', color: '#f3e6d0', stroke: 'rgba(0,0,0,.8)', strokeW: 6, alpha: clamp((lt - I - 1.0) / .3) });
      },
      update(lt, T) {
        const pos = path(lt); p.position.set(...pos);
        face(p, pos[0] + 5, pos[2] + .3);
        p.rotation.x = lt > EX && lt < SPLASH ? (lt - EX) * 2.2 : lt >= SPLASH ? .5 : 0;
        pose(p, { idle: T * 2, walk: T * 9, swing: lt < EX ? .5 : .15, armRaise: lt < EX ? 1 : lt > SPLASH ? .6 + Math.sin(T * 6) * .5 : .3 });
        off.visible = lt < TT;
        // creeper A: he dodges it; creeper B: blows up behind him
        qa.position.set(2.2, 1, -1.8); face(qa, pos[0], pos[2]); qa.userData.shimmer(T); walkCreeper(qa, T, false);
        const bk = clamp((lt - .6) / (EX - .6));
        qb.position.set(lerp(-3, pos[0] - 1.2, bk), 1, lerp(2.5, pos[2] + .4, bk)); face(qb, pos[0], pos[2]); qb.userData.shimmer(T); walkCreeper(qb, T, lt < EX - .35);
        creeperFuse(qb, lt, EX - .45, EX);
        if (lt < EX) qbAt.copy(qb.position);
        qb.visible = lt < EX; qa.visible = lt < I;
        boom.position.set(qb.position.x, 1.8, qb.position.z); flash.position.copy(boom.position);
        M.animPuffs(boom, lt - EX, { radius: 2.4, size: .38 }); M.animBurst(flash, lt - EX, 2.2);
        deb.visible = lt > EX && lt < EX + 1; deb.position.copy(boom.position); M.animParticles(deb, (lt - EX) * 2, { rise: 1, spread: 2 });
        bubbles.visible = lt > SPLASH && lt < I + .5; bubbles.position.set(pos[0], pos[1] + 1.2, pos[2]); M.animParticles(bubbles, T * 1.5, { rise: 1.2, spread: .5 });
        cm.rotation.y = T * 1.5;
        pl.intensity = 14 + Math.sin(T * 7) * 3;
        weeds.children.forEach((m, i) => m.rotation.z = Math.sin(T * 1.5 + i) * .15);
        p.visible = lt < I;
        let c;
        if (lt < .9) c = cam(camera, [6.5, 3.6, 5.5], [0, 2.2, 0], 52); // out of the portal, onto the flooded platform
        else if (lt < EX) c = cam(camera, [pos[0] + 3.5, 2.8, pos[2] + 4.5], [pos[0] - 1.5, 1.6, pos[2] - .5], 54); // one creeper dodged, another comes from behind
        else if (lt < SPLASH) c = cam(camera, [pos[0] + 5, 3.2, pos[2] + 6], [pos[0], pos[1] + 1, pos[2]], 56); // blast, totem
        else if (lt < I) c = cam(camera, [pos[0] + 3.4, -6.2, pos[2] + 4.2], [pos[0], pos[1] + .6, pos[2] - .5], 58); // underwater, seagrass, the conduit
        else { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(pos[0] + 3, pos[0] + 7, k), lerp(-5, 7, k), lerp(pos[2] + 6, pos[2] + 10, k)], [pos[0], -4, pos[2]], 56); }
        pop(camera, lt - TT, lt < SPLASH ? new THREE.Vector3(pos[0], pos[1] + 1, pos[2]) : null);
        c.updateMatrixWorld(); proj.copy(conduit.position).project(c);
        return c;
      },
    };
  },
};
