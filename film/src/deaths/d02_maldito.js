// #2 TheGamerMaldito — día 0, 25/03/2020 19:30. Verified: wiki (Creeper) + clip (GersoonSG 0:49–1:02):
// cave with a lava fall onto cobblestone over an obsidian floor, torches; he digs with an iron
// pickaxe (shield in the offhand); a creeper is right beside him under a torch on a gravel wall,
// flashing pale (fuse); he switches to the iron sword and raises the shield -> one-shot anyway.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, groundAt, creeperFuse, PX } from './common.js';

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function pickaxe(col = '#dcdcdc') {
  const g = new THREE.Group();
  const h = M.pixBox(1, 13, 1, () => hex('#6b4a2a')); h.position.y = 5.5; g.add(h);
  const head = M.pixBox(1, 2, 8, () => hex(col)); head.position.y = 12.5; g.add(head);
  for (const s of [-1, 1]) { const tip = M.pixBox(1, 2, 2, () => hex(col)); tip.position.set(0, 11, s * 4.5); g.add(tip); }
  return g;
}

export default {
  n: 2, player: 'maldito', name: 'TheGamerMaldito', ign: 'TheGamerMaldito', day: 0, date: '25/03/2020 · 19:30',
  sfx: 'explosion', impact: 3.25, dur: 4.9, storm: true,
  slow: [{ t: 2.0, d: 1.25, f: .35 }],
  chat: [
    ['El comienzo del sufrimiento infinito de TheGamerMaldito ha comenzado. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['[MIEMBRO] TheGamerMaldito ha explotado por Creeper', '#ffffff'],
  ],
  build(assets) {
    const CR = [5.25, 3.25], P = [4.1, 1.5];
    const mk = crater => {
      const w = new World(36, 16, 30, [-18, -4, -15]);
      w.fill(-18, -4, -15, 17, 11, 14, 'stone');
      // big chamber (lava fall onto cobblestone, obsidian floor) on the left
      for (let x = -15; x <= -1; x++) for (let z = -7; z <= 7; z++) for (let y = 0; y <= 6; y++) if (Math.hypot((x + 8) / 7, z / 7, y / 7) < 1) w.set(x, y, z, 0);
      w.fill(-14, -1, -7, -2, -1, 6, 'obsidian');
      w.fill(-12, -1, -7, -9, -1, -4, 'cobble'); w.fill(-11, 0, -6, -10, 0, -5, 'cobble');
      w.fill(-11, 1, -7, -10, 6, -7, 'lava'); w.fill(-11, 1, -6, -10, 1, -6, 'lava');
      for (let i = 0; i < 70; i++) { const x = -15 + (i * 7) % 15, y = (i * 3) % 7, z = ((i * 5) % 15) - 7; if (w.get(x, y, z) && w.get(x + 1, y, z) === 0) w.set(x, y, z, i % 3 ? 'dirt' : 'gravel'); }
      // narrow tunnel east, ending at the dirt face he is digging
      w.fill(-2, 0, -1, 5, 2, 1, 0);
      w.fill(6, 0, -1, 7, 2, 1, 'dirt'); w.set(6, 2, 0, 'stone'); w.set(6, 0, -1, 'gravel');
      for (let x = -2; x <= 5; x++) for (const z of [-2, 2]) for (let y = 0; y <= 2; y++) if ((x * 5 + y * 3 + z) % 4 === 0) w.set(x, y, z, (x + y) % 2 ? 'gravel' : 'dirt');
      w.fill(1, 0, -2, 2, 2, -2, 'gravel'); // the gravel wall he puts a torch on
      // the corner to his right: one block lower, gravel walls, obsidian underfoot
      w.fill(3, -1, 2, 5, 2, 3, 0);
      w.fill(2, -1, 4, 6, 3, 4, 'gravel'); w.fill(6, -1, 2, 6, 2, 3, 'gravel'); w.fill(2, -1, 2, 2, 2, 3, 'gravel');
      w.fill(4, -2, 2, 5, -2, 3, 'obsidian');
      if (crater) for (let x = 1; x <= 8; x++) for (let z = -1; z <= 6; z++) for (let y = -3; y <= 3; y++)
        if (Math.hypot(x + .5 - CR[0], (y + .5) * 1.2, z + .5 - CR[1]) < 2.3) w.set(x, y, z, 0);
      return w;
    };
    const w = mk(false), wB = mk(true);
    const intact = w.build(), broken = wB.build();
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#050505');
    scene.add(intact, broken); broken.visible = false;
    const gy = (x, z) => groundAt(w, x, z, 2);
    scene.add(new THREE.HemisphereLight('#b8b8c8', '#2a2a2a', 1.15));
    const lavaL = new THREE.PointLight('#ff7a30', 18, 13, 1.3); lavaL.position.set(-10, 3, -5); scene.add(lavaL);
    const torchAt = (x, y, z, rx, rz, li = 8) => { const t = torch(); t.scale.setScalar(PX); t.position.set(x, y, z); t.rotation.set(rx, 0, rz); scene.add(t); const l = new THREE.PointLight('#ffc070', li, 7, 1.3); l.position.set(x, y + .9, z + Math.sin(rx) * 1.2); scene.add(l); return t; };
    torchAt(-6, 0, 2, 0, 0); torchAt(-4, 0, -4, 0, 0);
    torchAt(1.5, .9, -.95, .45, 0, 7);          // placed on the gravel wall in the tunnel
    torchAt(CR[0], .8, 3.9, -.45, 0, 10);      // on the gravel wall above the corner

    const p = player(assets, 'maldito'); scene.add(p);
    const pick = hold(p, pickaxe(), { rx: -1.3 });
    const swd = hold(p, M.sword('iron'), { rx: -1.3 }); swd.visible = false;
    const tch = hold(p, torch(), { rx: -1.2 });
    const sh = hold(p, M.shield(), { rx: -.1, left: true }); sh.position.set(1, -8, -2);
    const creeper = M.creeper(); creeper.scale.multiplyScalar(PX); creeper.position.set(CR[0], gy(...CR), CR[1]); scene.add(creeper);
    const boom = M.puffs(28); boom.position.set(CR[0], creeper.position.y + .9, CR[1]); scene.add(boom);
    const flash = M.burst(); flash.position.copy(boom.position); scene.add(flash);
    const camera = new THREE.PerspectiveCamera(55, 16 / 9, .05, 100);
    const I = 3.25, TURN = 2.0, SWORD = 2.55, BLOCK = 2.8;
    const V = (o, y) => () => o.position.clone().add(new THREE.Vector3(0, y, 0));
    return {
      scene, ink: { skyA: '#141210', skyB: '#221e18', tint: '#f4efe6', lineW: 2.3 },
      notes: [
        { t0: .05, t1: 1.95, text: 'cava con el pico,\nescudo en la otra mano', x: 90, y: 560, size: 48 },
        { t0: 2.0, t1: 2.55, text: 'un creeper a su lado,\nbajo la antorcha', x: 150, y: 720, size: 50, to: V(creeper, 1.2), bend: -40 },
        { t0: 2.57, t1: 3.25, text: 'saca la espada y sube el escudo', x: 150, y: 820, size: 48, to: () => p.position.clone().add(new THREE.Vector3(.2, 1.3, .4)), bend: -40 },
        { t0: 3.3, t1: 5.8, text: 'un solo golpe, pese al escudo', x: 1150, y: 190, size: 46 },
      ],
      cues: [{ t: TURN, type: 'sfx', kind: 'hiss', dur: I - TURN, gain: .16 }],
      update(lt, T) {
        let x, z;
        if (lt < 1.1) { const k = lt / 1.1; x = lerp(-9.5, -5, k); z = lerp(2.2, .8, k); }
        else { x = P[0]; z = P[1]; }
        p.position.set(x, gy(x, z), z);
        const turn = ease.inOut(clamp((lt - TURN) / .25));
        if (lt < 1.1) face(p, -10.5, -6.5);
        else { const a0 = Math.atan2(1, 0), a1 = Math.atan2(CR[0] - P[0], CR[1] - P[1]); p.rotation.y = lerp(a0, a1, turn); }
        const digging = lt > 1.1 && lt < TURN;
        const blocking = lt > BLOCK;
        pose(p, { idle: T * 2, walk: T * 9, swing: lt < 1.1 ? .6 : 0, armRaise: digging ? .9 + Math.sin(T * 17) * .55 : .4, headPitch: lt < 1.1 ? -.2 : lt > TURN ? .45 : .15 });
        tch.visible = lt < 1.1; pick.visible = lt >= 1.1 && lt < SWORD; swd.visible = lt >= SWORD;
        if (blocking) { // shield raised in front of the chest
          const k = ease.out(clamp((lt - BLOCK) / .12));
          p.userData.armL.rotation.x = lerp(0, -1.15, k); p.userData.armL.rotation.y = lerp(0, -.5, k);
          sh.rotation.set(lerp(-.1, 1.15, k), lerp(0, -Math.PI / 2, k), 0); sh.position.set(lerp(1, -2, k), -8, lerp(-2, 1, k));
        } else { sh.rotation.set(-.1, 0, 0); sh.position.set(1, -8, -2); p.userData.armL.rotation.y = 0; }
        face(creeper, x, z);
        creeperFuse(creeper, lt, 1.85, I);
        creeper.visible = lt < I;
        const dead = lt >= I;
        intact.visible = !dead; broken.visible = dead;
        M.animPuffs(boom, lt - I, { radius: 2.4, size: .5 });
        M.animBurst(flash, lt - I, 2.4);
        p.visible = !dead;
        if (lt < 1.1) return cam(camera, [-3.6, 2.9, 3.6], [lerp(-9, -7, lt / 1.1), 1.2, -3], 58); // lava fall onto cobblestone, obsidian floor
        if (lt < TURN) return cam(camera, [2.2, 2.1, -.45], [6, .9, .8], 56); // the narrow tunnel: digging, shield in the offhand
        if (lt < BLOCK) { const k = ease.out(clamp((lt - TURN) / (BLOCK - TURN))); return cam(camera, [lerp(5.7, 5.5, k), lerp(2.3, 2.1, k), lerp(-.7, -.4, k)], [lerp(5.2, 4.9, k), lerp(.5, .2, k), lerp(2.2, 2.7, k)], 54); } // he turns: the creeper in the corner under the torch
        if (lt < I) { const k = (lt - BLOCK) / (I - BLOCK); return cam(camera, [lerp(3.12, 3.2, k), 1.75, lerp(3.78, 3.72, k)], [4.7, lerp(.95, .85, k), 2.3], 68); } // reverse angle from the corner: sword out, shield up; it swells
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(2.4, 1.2, k), lerp(1.8, 2.6, k), lerp(0, -.5, k)], [CR[0], -.6, CR[1] - .6], 60);
      },
    };
  },
};
