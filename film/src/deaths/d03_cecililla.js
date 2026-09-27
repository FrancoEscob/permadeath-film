// #3 Cecililla — día 0, 25/03/2020 21:29. Verified: wiki (Creeper) + clip (GersoonSG 1:17–1:36):
// cave with granite, dirt and an obsidian floor with a torch standing on it; she faces a dirt wall
// in a dark corner cycling torch / water bucket / stone, full hearts... then "¡Has muerto!".
// The creeper never appears on camera — so it doesn't appear here either (only the blast, from behind).
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, torch, waterBucket, stand, PX } from './common.js';
import { pixBox } from '../mobs.js';

const STOP = 4.3; // where she stops: open floor, ~3.5 blocks short of the dark dirt corner

export default {
  n: 3, player: 'cecililla', name: 'Cecililla', ign: 'Cecililla', day: 0, date: '25/03/2020 · 21:29',
  sfx: 'explosion', impact: 3.1, dur: 4.8,
  slow: [{ t: 2.1, d: 1.0, f: .35 }],
  note: 'EL CREEPER NUNCA APARECIÓ EN CÁMARA',
  chat: [
    ['El comienzo del sufrimiento infinito de Cecililla ha comenzado. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['[MIEMBRO] Cecililla ha explotado por Creeper', '#ffffff'],
  ],
  build(assets) {
    const w = new World(30, 12, 30, [-15, -3, -15]);
    w.fill(-15, -3, -15, 14, 9, 14, 'stone');
    for (let x = -9; x <= 8; x++) for (let z = -8; z <= 8; z++) for (let y = 0; y <= 5; y++) {
      const r = Math.max(Math.abs(x + .5) / (8 + Math.sin(z) * .6), Math.abs(z) / (7.5 + Math.cos(x) * .6), y / (5 + Math.sin(x + z) * .5));
      if (r < 1) w.set(x, y, z, 0);
    }
    w.fill(-8, -1, -6, 5, -1, 6, 'obsidian');
    // granite (pinkish) + dirt walls; the dark corner she ends up facing
    for (let i = 0; i < 160; i++) { const x = Math.round(Math.sin(i * 5.3) * 9.5), y = i % 6, z = Math.round(Math.cos(i * 2.9) * 8.5); if (w.get(x, y, z)) w.set(x, y, z, i % 2 ? 'bricks' : 'dirt'); }
    w.fill(8, 0, -3, 9, 4, 3, 'dirt'); w.fill(7, 0, 2, 7, 3, 3, 'dirt'); w.fill(7, 0, -3, 7, 2, -2, 'dirt');
    w.fill(6, -1, -3, 8, -1, 3, 'gravel');
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#050505');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#b8b8c8', '#2a2a2a', 1.3));
    const t1 = torch(); t1.scale.setScalar(PX); stand(t1, w, -2, 1, 0, 1); scene.add(t1); // a torch standing on the obsidian floor
    const l1 = new THREE.PointLight('#ffc070', 12, 10, 1.2); l1.position.set(-2, 1, 1); scene.add(l1);
    const hand = new THREE.PointLight('#ffc070', 5, 6, 1.3); scene.add(hand);

    const p = player(assets, 'cecililla'); scene.add(p);
    const sh = hold(p, M.shield(), { rx: -.1, left: true }); sh.position.set(1, -8, -2); // shield in the offhand
    const items = [hold(p, torch(), { rx: -1.2 }), hold(p, waterBucket(), { rx: -1.2 }), hold(p, pixBox(6, 6, 6, () => [125, 125, 125]), { rx: -1.2 })];
    const boom = M.puffs(28); scene.add(boom);
    const flash = M.burst(); scene.add(flash);
    const camera = new THREE.PerspectiveCamera(55, 16 / 9, .05, 100);
    const I = 3.1;
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    return {
      scene, ink: { skyA: '#141210', skyB: '#221e18', tint: '#f4efe6', lineW: 2.3 },
      hearts: () => ({ v: 10 }), // 10/10 right up to the death
      notes: [
        { t0: .1, t1: 2.15, text: 'busca diamantes: «es como más seguro»', x: 1010, y: 220, size: 50 },
        { t0: 1.75, t1: 2.95, text: 'mira a un rincón de tierra', x: 1180, y: 600, size: 50, to: () => V(8, 1.6, .2), ax: 1330, ay: 560, bend: -40 },
        { t0: 2.15, t1: 3.1, text: 'el creeper nunca aparece en cámara', x: 1010, y: 220, size: 50 },
        { t0: 2.3, t1: 3.1, text: 'vida completa… y un solo golpe', x: 1150, y: 760, size: 50, to: [1120, 878], ax: 1300, ay: 790, bend: -30 },
        { t0: 3.7, t1: 5.8, text: '«¿cómo morí?»', x: 1380, y: 230, size: 58 },
      ],
      update(lt, T) {
        const walkK = clamp(lt / 1.7);
        const x = lerp(-5, STOP, ease.inOut(walkK));
        stand(p, w, x, 0, 0, 1); // search down from y=1 (cave roof above)
        face(p, 12, 0);
        const moving = walkK < .97;
        pose(p, { idle: T * 2, walk: T * 10, swing: moving ? .7 * Math.min(1, (1 - walkK) * 6) : 0, armRaise: .45, headPitch: lt > 1.7 ? .12 : 0 });
        p.userData.armL.rotation.x = -.35; // shield held low in front
        const cyc = lt < 1.7 ? 0 : Math.floor((lt - 1.7) * 3) % 3; // torch / water bucket / stone
        items.forEach((it, i) => it.visible = i === cyc);
        hand.position.set(x + .3, 1.3, -.3); hand.intensity = cyc === 0 ? 5 : 0;
        boom.position.set(x - 1.6, 1, .9); flash.position.copy(boom.position); // from behind her: the creeper itself is never seen
        M.animPuffs(boom, lt - I, { radius: 2.6, size: .5 });
        M.animBurst(flash, lt - I, 2.4);
        p.visible = lt < I;
        if (lt < 1.7) return cam(camera, [-7.5, 3.2, 5.5], [x + 2, .6, -.5], 55); // over the obsidian floor
        if (lt < 2.1) return cam(camera, [x - 3.2, 2.2, 2.0], [8.5, 1.3, -.2], 55); // from behind: facing the dark dirt corner
        if (lt < I) { const k = ease.inOut(clamp((lt - 2.1) / 1.0)); return cam(camera, [lerp(.6, 1.3, k), lerp(3.1, 2.8, k), lerp(4.6, 4.1, k)], [6.4, 1.0, -.7], 50); } // 3/4 from behind: open floor all around her, nothing there
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [lerp(x - 3, x - 5.5, k), lerp(2.8, 4.0, k), lerp(4.2, 5.8, k)], [x - .5, .3, 0], 55); // spectator drift over the spot
      },
    };
  },
};
