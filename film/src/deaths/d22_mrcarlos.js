// #22 MrCarlosNoob — día 34, 28/04/2020 17:23. Verified: wiki (Caída escapando de una Araña de Cueva; tótem
// "No Activado (1%)") + clip (GersoonSG 13:11–13:16): Overworld cave with netherrack patches, fences and floor
// torches, storm timer "Quedan 10:47:31 de tormenta", a cave spider with a glowing outline up a slope, green swirl
// particles, olive (poisoned) hearts, totem in his offhand; he turns, runs down the tunnel, selects netherrack,
// then an ender pearl, looks down a steep gravel slope, throws the pearl -> ~0.3 s later "hit the ground too hard
// whilst trying to escape Cave Spider". (Where exactly he fell isn't visible.)
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, pearl, glowOutline, groundAt, PX } from './common.js';
import { pixBox } from '../mobs.js';
import { text } from '../engine.js';

const floorAt = x => { x = Math.floor(x); return x > 4 ? Math.floor((x - 4) * .6) : x < -5 ? -Math.floor((-5 - x) * 1.1) : 0; };
const T_TURN = 1.05, T_THROW = 2.62, I = 2.95, EDGE = -5.4;

export default {
  n: 22, player: 'mrcarlos', name: 'MrCarlosNoob', ign: 'MrCarlosnoob', day: 34, date: '28/04/2020 · 17:23',
  sfx: 'hit', impact: 2.95, dur: 4.8, storm: true,
  slow: [{ t: .6, d: .5, f: .35 }, { t: 2.45, d: .55, f: .3 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de MrCarlosnoob. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['CarlosLagaron, Para esto se esclavizó por 18 horas', '#aaaaaa'],
    ['[INVITADO] MrCarlosnoob hit the ground too hard whilst trying to escape Cave Spider', '#ffffff'],
  ],
  hud: 'Quedan 10:47:31 de tormenta',
  build(assets) {
    const w = new World(40, 24, 24, [-20, -12, -12]);
    w.fill(-20, -12, -12, 19, 11, 11, 'stone');
    // tunnel along x, with a rising slope at +x (spider) and a steep gravel drop at -x
    for (let x = -20; x <= 19; x++) {
      const floor = floorAt(x);
      w.fill(x, floor, -2, x, floor + 4 + (x < -5 ? 3 : 0), 2, 0);
      w.fill(x, floor - 1, -2, x, floor - 1, 2, x < -5 ? 'gravel' : (x % 5 === 0 ? 'gravel' : 'stone'));
      if (x > 6 && x < 12) w.fill(x, floor - 1, -2, x, floor - 1, 2, 'netherrack');
      if (x % 6 === 0 && x > -5) { w.fill(x, floor, -2, x, floor + 3, -2, 'planks'); w.fill(x, floor, 2, x, floor + 3, 2, 'planks'); w.fill(x, floor + 4, -2, x, floor + 4, 2, 'planks'); }
    }
    w.fill(7, 1, 2, 9, 2, 3, 'netherrack');
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#050505');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#a8a8b8', '#202020', .9));
    const gnd = (x, z) => groundAt(w, x, z, floorAt(x) + 2); // below the tunnel roof / timber beams
    const torches = [[-.8, -1.8], [2, 1.7], [-7.5, 1.4], [5, -1.7]];
    torches.forEach(([x, z]) => { const t = torch(); t.scale.setScalar(PX); t.position.set(x, gnd(x, z), z); scene.add(t); const l = new THREE.PointLight('#ffc070', 8, 8, 1.3); l.position.set(x, gnd(x, z) + .8, z); scene.add(l); });
    // oak fences along the drop
    const fenceM = new THREE.MeshLambertMaterial({ color: '#8a6a3a' });
    for (const [x, z] of [[-6.5, -1.6], [-7.5, -1.6], [-8.5, -1.6]]) { const f = new THREE.Mesh(new THREE.BoxGeometry(.25, 1.5, .25), fenceM); f.position.set(x, gnd(x, z) + .75, z); scene.add(f); }

    const p = player(assets, 'mrcarlos'); scene.add(p);
    const swordG = hold(p, M.sword('diamond'), { rx: -1.3 });
    const rackG = hold(p, pixBox(6, 6, 6, (f, i, j) => (i + j) % 3 ? [110, 30, 30] : [150, 50, 45]), { rx: -1.2 }); // netherrack
    const pearlG = hold(p, pearl(), { rx: 0 });
    const totemG = hold(p, M.totem(), { rx: -1.2, left: true }); totemG.scale.setScalar(.8); // totem in the offhand
    const spider = M.spider({ cave: true }); spider.scale.multiplyScalar(PX * 1.15); glowOutline(spider); scene.add(spider);
    const swirl = M.particlesCube('#5ad84a', 12, .6, .09); scene.add(swirl);
    const bats = [0, 1].map(i => { const b = new THREE.Group(); const body = new THREE.Mesh(new THREE.BoxGeometry(.25, .25, .25), new THREE.MeshLambertMaterial({ color: '#3a2a22' })); b.add(body); [-1, 1].forEach(s => { const wg = new THREE.Mesh(new THREE.BoxGeometry(.4, .04, .25), new THREE.MeshLambertMaterial({ color: '#2a1a14' })); wg.position.x = s * .3; b.add(wg); }); glowOutline(b); scene.add(b); return b; });
    const thrown = pearl(); thrown.scale.setScalar(PX); scene.add(thrown);
    const camera = new THREE.PerspectiveCamera(55, 16 / 9, .05, 100);
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    // pearl flight: from his hand, down the gravel slope, landing at the moment of death
    const P0 = V(EDGE - .5, 1.55, .15), LX = -9.3, P1 = V(LX, gnd(LX, 0) + .1, .1);
    const pearlAt = t => { const k = clamp(t / (I - T_THROW)); return V(lerp(P0.x, P1.x, k), lerp(P0.y, P1.y, k) + 4 * 1.2 * k * (1 - k), lerp(P0.z, P1.z, k)); };
    let px = 2.5;
    return {
      scene, ink: { skyA: '#141210', skyB: '#221e18', tint: '#f4efe6', lineW: 2.2 },
      cues: [{ t: .75, type: 'sfx', kind: 'hurt', gain: .3 }, { t: T_THROW, type: 'sfx', kind: 'pearl' }],
      hearts: lt => ({ v: lt < .75 ? 3.5 : lt < 1.6 ? 2.5 : lt < 2.3 ? 1.5 : 1, variant: lt > .75 ? 'poison' : 'red', blink: lt > .75 && lt < .9 }),
      notes: [
        { t0: .05, t1: 1.1, text: 'una araña de cueva', x: 1150, y: 230, size: 56, to: () => spider.position.clone().add(V(0, .7, 0)), ax: 1280, ay: 270, bend: 50 },
        { t0: .7, t1: 1.9, text: 'envenenado', x: 420, y: 790, size: 58, to: [800, 890], ax: 620, ay: 825, bend: 30 },
        { t0: 1.9, t1: I, text: 'huye… y tira una perla de ender', x: 1050, y: 240, size: 52, to: () => thrown.visible ? thrown.position.clone() : pearlG.getWorldPosition(V(0, 0, 0)), ax: 1250, ay: 280, bend: 60 },
        { t0: 3.15, t1: 5.8, text: 'tenía tótem… y no se activó (1%)', x: 1000, y: 230, size: 50 },
      ],
      update(lt, T) {
        spider.userData.legs.forEach((l, i) => l.rotation.x = Math.sin(T * 22 + i) * .3);
        bats.forEach((b, i) => { b.position.set(lt < 2.1 ? 6 + Math.sin(T * 2 + i * 3) * 1.5 : -7.5 + Math.sin(T * 2 + i * 3) * 1.2, (lt < 2.1 ? 4 : 2.8) + Math.sin(T * 5 + i) * .3 + i * .5, Math.cos(T * 2.2 + i) * 1); b.children.slice(1).forEach(wg => wg.rotation.z = Math.sin(T * 30) * .6 * (wg.position.x > 0 ? 1 : -1)); });
        // he faces the spider up the slope, turns and runs down the tunnel to the gravel drop
        px = lt < T_TURN ? 2.5 : Math.max(EDGE, 2.5 - (lt - T_TURN) * 6.4);
        p.position.set(px, gnd(px, 0), 0);
        face(p, lt < T_TURN ? 9 : -20, 0);
        const running = lt > T_TURN && px > EDGE + .05;
        const throwing = lt > T_THROW - .15 && lt < T_THROW + .2;
        pose(p, { idle: T * 2, walk: T * 14, swing: running ? .9 : 0, armRaise: throwing ? 1.9 : lt < T_TURN ? .7 : .4, headPitch: lt > 2.2 ? .75 : 0 });
        swordG.visible = lt < 1.6; rackG.visible = lt >= 1.6 && lt < 2.0; pearlG.visible = lt >= 2.0 && lt < T_THROW;
        // the glowing cave spider: down the slope to him, then after him down the tunnel
        const sx = lt < T_TURN ? lerp(9, 4.1, ease.inOut(clamp(lt / .95))) : Math.max(px + 2.2, lerp(4.1, -1.3, clamp((lt - T_TURN) / 1.3))); // stays up the tunnel, behind the last camera
        spider.position.set(sx, gnd(sx, 0), Math.sin(T * 3) * .15);
        face(spider, px, 0);
        swirl.visible = lt < 2.2; swirl.position.set(sx, gnd(sx, 0) + .2, 0); M.animParticles(swirl, T * .8, { rise: .3, spread: .6 });
        const pt = lt - T_THROW;
        thrown.visible = pt > 0 && lt < I + .5;
        if (thrown.visible) thrown.position.copy(pearlAt(pt));
        p.visible = lt < I;
        if (lt < T_TURN) { const k = ease.inOut(clamp(lt / T_TURN)); return cam(camera, [lerp(-.9, -.4, k), 2.2, lerp(1.6, 1.3, k)], [8, 2.0, 0], 55); } // behind him, facing the glowing cave spider
        if (lt < 2.15) return cam(camera, [px - 3.4, 1.8, .9], [px + 1.5, 1.1, 0], 58); // he runs at us, the spider after him
        if (lt < I) { const k = ease.inOut(clamp((lt - 2.15) / .8)); return cam(camera, [lerp(EDGE + 2.9, EDGE + 2.5, k), 2.5, lerp(1.4, 1.2, k)], [EDGE - 4.5, -2.6, -.1], 58); } // behind him, down the gravel drop
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(EDGE + 2.5, EDGE + 2.0, k), lerp(2.5, 3.6, k), lerp(1.2, 1.5, k)], [EDGE - 3.8, -2.8, 0], 55);
      },
      overlay(ctx, lt) { // HUD line seen in the clip, above the hotbar (and above the hearts)
        if (lt < I) text(ctx, 'Quedan 10:47:31 de tormenta', 960, 845, { font: '30px VT', color: '#ffffff', stroke: '#000', strokeW: 4 });
      },
    };
  },
};
