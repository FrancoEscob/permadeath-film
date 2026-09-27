import { THREE, renderer, renderInk, renderPlain } from '../gl.js';
import { World } from '../voxel.js';
import { buildPlayer, pose } from '../skin3d.js';
import * as M from '../mobs.js';
import { W, H, text } from '../engine.js';

export function testMobs(assets) {
  const w = new World(80, 10, 30, [-40, -5, -15]);
  w.fill(-40, -5, -15, 39, -1, 14, 'grass'); w.fill(-40, -5, -15, 39, -2, 14, 'dirt');
  const scene = new THREE.Scene(); scene.add(w.build());
  const mobs = [M.creeper(), M.ghast(), M.spider(), M.skeleton(), M.skeleton({ wither: true }), M.zombie(), M.enderman(), M.piglin(), M.vex(), M.phantom(), M.blaze(), M.slime({ magma: true }), M.pillager(), M.witch(), M.skeleton({ stray: true })];
  mobs.forEach((m, i) => { m.scale.multiplyScalar(1 / 16); m.position.set(-28 + i * 4, 0, 0); scene.add(m); });
  mobs[1].position.y = 3; mobs[1].userData.faceOpen(true); mobs[8].position.y = 1.5; mobs[9].position.y = 2; mobs[10].position.y = .5;
  const p = buildPlayer(assets.skins.b); p.scale.setScalar(1 / 16); p.position.set(-32, 0, 0); scene.add(p);
  scene.add(new THREE.HemisphereLight('#ffffff', '#445533', 1.6));
  const key = new THREE.DirectionalLight('#fff', 1.4); key.position.set(10, 20, 15); scene.add(key);
  const cam = new THREE.PerspectiveCamera(40, W / H, .1, 300);
  return { id: 'mobs', dur: 2, draw(ctx, lt, env) {
    cam.position.set(-4 + lt, 5, 22); cam.lookAt(-4 + lt, 2, 0);
    ctx.drawImage(renderInk(scene, cam, env.t, { skyA: '#9fb3c8', skyB: '#efe3c8' }), 0, 0);
  } };
}
export { testMobs as default };
