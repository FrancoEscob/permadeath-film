// #1 Alvaro845 — día 0, 25/03/2020 19:15. Verified: wiki "Muertes" (Creeper) + clip
// (GersoonSG compilation 0:06–0:22): flooded cave, his water turned the lava to obsidian,
// torch in hand, spider in the water ahead, a creeper drops in from the upper right -> dead.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, torch, face, cam, fall, pose, clamp, lerp, ease, groundAt, creeperFuse, PX } from './common.js';

export default {
  n: 1, player: 'alvaro', name: 'Alvaro845', ign: 'Alvaro845', day: 0, date: '25/03/2020 · 19:15',
  sfx: 'explosion', impact: 2.9, dur: 4.7,
  slow: [{ t: 1.95, d: .95, f: .33 }],
  chat: [
    ['El comienzo del sufrimiento infinito de Alvaro845 ha comenzado. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['[MIEMBRO] Alvaro845 was blown up by Creeper', '#ffffff'],
  ],
  build(assets) {
    // where things stand (x, z)
    const P = [.6, 3.4], SP = [-1.3, -.6], CR = [1.75, 2.35];
    const mk = crater => {
      const w = new World(34, 16, 34, [-17, -3, -17]);
      w.fill(-17, -3, -17, 16, 12, 16, 'stone');
      // chamber with irregular walls
      for (let x = -10; x <= 10; x++) for (let z = -11; z <= 8; z++) for (let y = 0; y <= 7; y++) {
        const wob = Math.sin(x * .7 + z * .3) * .8 + Math.cos(z * .9 - y * .5) * .7;
        const r = Math.max(Math.abs(x) / (9.5 + wob), Math.abs(z + 1.5) / (9 + wob), y / (6.5 + wob * .6));
        if (r < 1) w.set(x, y, z, 0);
      }
      for (let i = 0; i < 140; i++) { const x = Math.round(Math.sin(i * 7.1) * 11), y = (i * 3) % 8, z = Math.round(Math.cos(i * 3.3) * 11) - 1; if (w.get(x, y, z)) w.set(x, y, z, i % 3 ? 'dirt' : 'gravel'); }
      // a crevice in the ceiling right above him: the creeper comes down out of it
      w.fill(1, 4, 1, 3, 10, 3, 0); w.fill(2, 4, 2, 2, 10, 2, 0);
      for (const [x, y, z] of [[1, 8, 0], [3, 7, 4], [0, 6, 2], [4, 6, 1]]) w.set(x, y, z, 'dirt');
      // lava pool on the right; the part his water reached is now obsidian
      w.fill(3, -1, -9, 8, -1, -1, 'lava');
      w.fill(0, -1, -6, 4, -1, 1, 'obsidian');
      w.fill(-2, -1, 0, 4, -1, 5, 'obsidian');
      // lava fall at the back left
      w.fill(-5, 0, -10, -4, 6, -10, 'lava');
      w.fill(-6, -1, -9, -3, -1, -8, 'lava');
      if (crater) for (let x = -3; x <= 6; x++) for (let z = -1; z <= 6; z++) for (let y = -2; y <= 3; y++)
        if (Math.hypot(x + .5 - CR[0], (y + .5) * 1.3, z + .5 - CR[1]) < 2.4) w.set(x, y, z, 0);
      return w;
    };
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#050505');
    const wI = mk(false), wB = mk(true);
    const intact = wI.build(), broken = wB.build();
    scene.add(intact, broken); broken.visible = false;
    const gy = (x, z) => groundAt(wI, x, z, 5);
    // shallow flowing water over the left half (a translucent sheet, like MC flowing water)
    const water = new THREE.Mesh(new THREE.PlaneGeometry(8, 9), new THREE.MeshLambertMaterial({ color: '#3f6fd8', transparent: true, opacity: .62 }));
    water.rotation.x = -Math.PI / 2; water.position.set(-3, .22, -2.5); scene.add(water);
    scene.add(new THREE.HemisphereLight('#c8c8d8', '#303030', 1.3));
    const lavaL = new THREE.PointLight('#ff7a30', 14, 10, 1.4); lavaL.position.set(5, 2, -4); scene.add(lavaL);
    const torchL = new THREE.PointLight('#ffc880', 14, 11, 1.2); scene.add(torchL);
    const wallT = torch(); wallT.scale.setScalar(PX); wallT.position.set(-8.6, 2, -2); wallT.rotation.z = -.4; scene.add(wallT);
    const wallL = new THREE.PointLight('#ffc880', 8, 9, 1.3); wallL.position.set(-8, 2.8, -2); scene.add(wallL);

    const p = player(assets, 'alvaro'); p.position.set(P[0], gy(...P), P[1]); scene.add(p);
    face(p, SP[0], SP[1]);
    hold(p, torch(), { rx: -1.2 });
    const spider = M.spider(); spider.scale.multiplyScalar(PX); spider.position.set(SP[0], gy(...SP), SP[1]); face(spider, P[0], P[1]); scene.add(spider);
    const creeper = M.creeper(); creeper.scale.multiplyScalar(PX); scene.add(creeper);
    const crGround = gy(...CR);
    const smoke = M.puffs(28); smoke.position.set(CR[0], crGround + .9, CR[1]); scene.add(smoke);
    const flash = M.burst(); flash.position.set(CR[0], crGround + 1, CR[1]); scene.add(flash);
    const dust = M.puffs(8, '#8a7a6a'); dust.position.set(CR[0], crGround + .1, CR[1]); scene.add(dust);
    const camera = new THREE.PerspectiveCamera(50, 16 / 9, .05, 120);
    const I = 2.9, DROP = 1.95, LAND = DROP + Math.sqrt(2 * 5.2 / 40);

    const V = (o, y) => () => o.position.clone().add(new THREE.Vector3(0, y, 0));
    return {
      scene, ink: { skyA: '#1a1714', skyB: '#2a241e', tint: '#f6efe4', lineW: 2.3 },
      notes: [
        { t0: .05, t1: 1.0, text: 'cueva inundada, antorcha en mano', x: 1050, y: 240, size: 48 },
        { t0: 1.02, t1: 1.8, text: 'una araña en el agua', x: 1150, y: 640, size: 50, to: V(spider, .6), bend: 50 },
        { t0: 1.82, t1: 2.46, text: 'le cae un creeper desde arriba', x: 1120, y: 200, size: 50, to: V(creeper, 1.7), bend: 60 },
        { t0: 2.48, t1: 2.9, text: 'justo a su lado', x: 1260, y: 330, size: 52, circle: V(creeper, .9), r: 120 },
        { t0: 2.95, t1: 5.5, text: 'un solo golpe, con vida completa', x: 1100, y: 190, size: 46 },
      ],
      cues: [{ t: DROP + .1, type: 'sfx', kind: 'whoosh', dur: .4, gain: .25 }, { t: LAND, type: 'sfx', kind: 'hiss', dur: I - LAND, gain: .18 }],
      update(lt, T) {
        const look = lt > LAND + .05 ? clamp((lt - LAND - .05) / .2) : 0; // he only starts to turn his head
        pose(p, { idle: T * 2, headPitch: lt < 1.2 ? .1 : .3 - look * .2, headYaw: -look * .7, armRaise: .5 });
        spider.userData.legs.forEach((l, i) => l.rotation.x = Math.sin(T * 9 + i) * .12);
        spider.position.y = gy(SP[0], SP[1]);
        torchL.position.set(p.position.x - .4, 1.6, p.position.z - .5);
        lavaL.intensity = 14 + Math.sin(T * 6) * 3;
        // the creeper falls out of the ceiling crevice, lands right beside him, flashes and swells
        const ct = lt - DROP;
        creeper.visible = ct > 0 && lt < I;
        creeper.position.set(CR[0], fall(crGround + 5.2, crGround, Math.max(0, ct), 40), CR[1]);
        face(creeper, P[0], P[1]);
        creeperFuse(creeper, lt, LAND, I);
        const dead = lt >= I;
        p.visible = !dead;
        intact.visible = !dead; broken.visible = dead;
        M.animPuffs(dust, lt - LAND, { radius: .9, size: .25 });
        M.animPuffs(smoke, lt - I, { radius: 2.6, size: .6 });
        M.animBurst(flash, lt - I, 3.6);

        if (lt < 1.0) { // wide: the flooded cave, the obsidian his water made, the lava fall
          const k = lt / 1.0;
          return cam(camera, [lerp(5.2, 4.6, k), lerp(3.4, 3.1, k), lerp(5.3, 5.0, k)], [-1.5, .9, -3], 52);
        }
        if (lt < DROP) { // over his shoulder: a spider in the water ahead
          const k = (lt - 1.0) / (DROP - 1.0);
          return cam(camera, [lerp(2.9, 2.6, k), lerp(2.5, 2.35, k), lerp(5.4, 5.1, k)], [lerp(-.6, -.9, k), .7, lerp(-.2, -.4, k)], 50);
        }
        if (lt < I) { // medium side shot: it drops out of the crevice right beside him, flashes, swells
          const k = ease.inOut(clamp((lt - DROP) / (LAND - DROP + .05)));
          const push = ease.in(clamp((lt - LAND) / (I - LAND))) * .5;
          return cam(camera, [lerp(-3.5, -2.9, push * 2), lerp(2.4, 1.9, k), lerp(.8, 1.1, push * 2)], [1.1, lerp(3.0, 1.15, k), 2.8], 54);
        }
        const k = ease.out(clamp((lt - I) / 1.8)); // spectator drifts up over the crater
        return cam(camera, [lerp(-2.5, -3.5, k), lerp(2.2, 4.6, k), lerp(-1, -2.5, k)], [CR[0], 0, CR[1]], 52);
      },
    };
  },
};
