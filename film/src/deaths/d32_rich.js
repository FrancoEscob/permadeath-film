// #32 ElRichMC — día 56, 20/05/2020 19:23. Verified: wiki (Caer al Vacío) + ban card (20-05-2020) + clip
// (GersoonSG 20:04–20:21, multi-POV p7SdaB-a9Ls, lead-up m_5s5wBMvHc): purpur hallway, red shulker box by a
// glowing block, killercreeper_55 at the far end by a ladder; he takes a Slow Falling potion from a shulker box;
// "Prefiero suicidarme. Adiós, killer." (his words, subs + Rubik's documentary); he mines a floor block and drops
// into black void, drinks Slow Falling under the islands' undersides, opens his inventory mid-fall -> "fell out
// of the world". Why exactly he did it isn't clear from the footage.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, armor, PX } from './common.js';
import { text } from '../engine.js';
import { pixBox } from '../mobs.js';
import { drawInventory, RICH_ITEMS } from './inventory2d.js';

function preview(skin, chestOn) {
  return (ctx, x, y, w, h) => {
    const s = w / 20, cx = x + w / 2 - 4 * s, top = y + h * .12;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(skin, 8, 8, 8, 8, cx, top, 8 * s, 8 * s);                 // head
    ctx.drawImage(skin, 20, 20, 8, 12, cx, top + 8 * s, 8 * s, 12 * s);    // body
    ctx.drawImage(skin, 44, 20, 4, 12, cx - 4 * s, top + 8 * s, 4 * s, 12 * s);
    ctx.drawImage(skin, 36, 52, 4, 12, cx + 8 * s, top + 8 * s, 4 * s, 12 * s);
    ctx.drawImage(skin, 4, 20, 4, 12, cx, top + 20 * s, 4 * s, 12 * s);
    ctx.drawImage(skin, 20, 52, 4, 12, cx + 4 * s, top + 20 * s, 4 * s, 12 * s);
    ctx.fillStyle = 'rgba(120,20,190,.62)'; // his purple armour (helmet, legs, boots)
    ctx.fillRect(cx - .5 * s, top - .5 * s, 9 * s, 4 * s); ctx.fillRect(cx, top + 20 * s, 8 * s, 12 * s);
    if (chestOn) { ctx.fillStyle = 'rgba(170,10,20,.8)'; ctx.fillRect(cx - 4 * s, top + 8 * s, 16 * s, 11 * s); } // Infernal Netherite Chestplate (red)
  };
}
function inv(ctx, k, lt, skin) {
  ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(8,4,12,.55)'; ctx.fillRect(0, 0, 1920, 1080); ctx.restore();
  const chestOn = lt < 3.45;
  const items = { ...RICH_ITEMS };
  if (!chestOn) items['1,6'] = { k: 'chest' };
  let tooltip = null;
  const X = 573, Y = 190, S = 4.4;
  const at = (r, c) => [X + (7 + c * 18) * S + 18 * S, Y + (r < 3 ? 83 + r * 18 : 141) * S - 10];
  if (lt < 3.45) tooltip = { at: [X + 25 * S, Y + 24 * S], lines: [['Infernal Netherite Chestplate', '#ffaa00'], ['Protection IV', '#aaaaaa'], ['Unbreakable', '#5555ff']] };
  else if (lt < 3.85) tooltip = { at: at(1, 7), lines: [['Panic Potion', '#ff55ff'], ['Instant Health V', '#5555ff']] };
  else if (lt < 4.25) tooltip = { at: at(1, 8), lines: [['Totem of Undying', '#ffff55']] };
  const hk = clamp((lt - 3.9) / .35);
  drawInventory(ctx, { x: X, y: Y, s: S, items, armor: [1, chestOn ? 1 : 0, 1, 1], offhand: { k: 'totem' }, preview: preview(skin, chestOn), tooltip, highlight: hk > 0 ? { cell: [0, 1], k: hk } : null, alpha: k });
  text(ctx, 'Slow Falling  3:5' + (8 - Math.min(4, Math.floor((lt - 2.9) * 2.5))), 90, 250, { font: '32px MC', color: '#ffffff', align: 'left', stroke: '#000', strokeW: 5, alpha: k });
  if (hk > 0) {
    ctx.save(); ctx.globalAlpha = hk; ctx.font = '58px Hand'; ctx.fillStyle = '#ffe9a0'; ctx.textAlign = 'left';
    ctx.fillText('¡la élitra estaba aquí!', X - 300, Y + 250);
    ctx.strokeStyle = '#ffe9a0'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(X - 120, Y + 290); ctx.quadraticCurveTo(X - 40, Y + 420, X + (7 + 18) * S - 2, Y + 83 * S + 6); ctx.stroke();
    ctx.restore();
  }
}

export default {
  n: 32, player: 'elrich', name: 'ElRichMC', ign: 'ElRichMC', day: 56, date: '20/05/2020 · 19:23',
  sfx: 'void', impact: 4.55, dur: 6.0, storm: true,
  slow: [{ t: 1.55, d: .6, f: .4 }],
  chat: [
    ['Este es el comienzo del sufrimiento eterno de ElRichMC. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['ElRichMC. Eso no ha sido muy ey ey ey de tu parte', '#aaaaaa'],
    ['[ADMIN] ElRichMC ☠ fell out of the world', '#ffffff'],
  ],
  build(assets) {
    const w = new World(30, 20, 20, [-15, -10, -10]);
    w.fill(-10, -1, -3, 10, 5, 3, 'purpur'); w.fill(-9, 0, -2, 9, 4, 2, 0);
    w.fill(-10, 5, -3, 10, 5, 3, 'end_bricks');
    w.set(-9, 0, 2, 'glass'); // (ladder wall end)
    const intact = new THREE.Group(), broken = new THREE.Group();
    intact.add(w.build()); w.set(1, -1, 0, 0); broken.add(w.build());
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#030205');
    scene.add(intact, broken); broken.visible = false;
    const islands = new THREE.Group(); // undersides of islands seen from the void
    for (const [x, y, z, s] of [[-14, 18, -12, 8], [12, 22, 6, 10], [0, 26, 18, 7]]) { const m = new THREE.Mesh(new THREE.BoxGeometry(s, 3, s), new THREE.MeshLambertMaterial({ color: '#8a8a70' })); m.position.set(x, y, z); islands.add(m); }
    scene.add(islands);
    const redBox = pixBox(16, 16, 16, () => [170, 40, 40]); redBox.scale.setScalar(PX); redBox.position.set(2, .5, -1.2); scene.add(redBox);
    const glowB = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: '#aef0f0' })); glowB.position.set(2, .5, 1.2); scene.add(glowB);
    scene.add(new THREE.HemisphereLight('#e6d8f4', '#3a2a48', 1.4));
    const p = player(assets, 'elrich'); scene.add(p);
    const pick = hold(p, M.sword('diamond'), { rx: -1.3 });
    const potion = hold(p, pixBox(4, 6, 4, (f, i, j) => j < 2 ? [220, 220, 230] : [240, 240, 200]), { rx: -.3 }); potion.visible = false;
    hold(p, M.totem(), { rx: -1.2, left: true }).scale.setScalar(.8);
    const killer = player(assets, 'killer'); armor(killer, 'purple'); killer.position.set(-8, 0, 0); face(killer, 1, 0); scene.add(killer);
    const debris = M.particlesCube('#b58bb5', 14, .5, .12); scene.add(debris);
    const camera = new THREE.PerspectiveCamera(58, 16 / 9, .05, 200);
    const I = 4.55;
    const skin = assets.skins.elrich;
    return {
      scene, ink: { skyA: '#050308', skyB: '#1a1024', tint: '#efe6ff', lineW: 2.3 },
      cues: [{ t: 1.3, type: 'sfx', kind: 'pop', gain: .3 }, { t: 1.9, type: 'sfx', kind: 'whoosh', dur: 2, gain: .3 }],
      notes: [
        { t0: .35, t1: 1.3, text: 'killercreeper_55', x: 1250, y: 250, size: 50, to: () => killer.position.clone().add(new THREE.Vector3(0, 2.1, 0)) },
        { t0: 1.25, t1: 1.98, text: 'pica un bloque del suelo\nde la End City', x: 1150, y: 230, size: 52, circle: () => new THREE.Vector3(1.5, -.5, .5), r: 120 },
        { t0: 2.02, t1: 2.95, text: 'cae al vacío… y bebe slow falling', x: 1080, y: 260, size: 50, to: () => p.position.clone().add(new THREE.Vector3(0, 1.4, 0)) },
      ],
      overlay(ctx, lt) {
        if (lt < 1.3) text(ctx, '«Prefiero suicidarme. Adiós, killer.»', 960, 900, { font: 'italic 700 40px Cinzel', color: '#f3e6d0', stroke: 'rgba(0,0,0,.8)', strokeW: 6, alpha: clamp(lt / .3) * (1 - clamp((lt - 1.1) / .2)) });
        const k = clamp((lt - 2.9) / .15); if (k > 0 && lt < I) inv(ctx, k, lt, skin);
        if (lt > I + .8) { ctx.save(); ctx.globalAlpha = clamp((lt - I - .8) / .4); ctx.font = '50px Hand'; ctx.fillStyle = '#ffe9a0'; ctx.textAlign = 'right';
          ctx.fillText('la élitra estaba en su inventario…', 1860, 260); ctx.fillText('no llegó a ponérsela.', 1860, 318); ctx.restore(); }
      },
      update(lt, T) {
        const mined = lt > 1.6;
        intact.visible = !mined; broken.visible = mined;
        const fallT = Math.max(0, lt - 1.75);
        p.position.set(1, -.5 * 12 * fallT * fallT, 0);
        face(p, lt < 1.1 ? -8 : 2, 0);
        pose(p, { idle: T * 2, armRaise: lt > 1.1 && lt < 1.6 ? 1 + Math.sin(T * 16) * .6 : lt > 2.2 && lt < 3 ? 1.6 : .4, headPitch: lt > 1.1 && lt < 1.8 ? 1.2 : 0 });
        pick.visible = lt < 2.2; potion.visible = lt >= 2.2 && lt < 3;
        pose(killer, { idle: T * 2 });
        debris.visible = lt > 1.6 && lt < 2.6; debris.position.set(1, -.5 - (lt - 1.6), 0); M.animParticles(debris, T * 2, { rise: -.5 });
        p.visible = lt < I && !(lt > 1.1 && lt < 1.75);
        if (lt < 1.1) return cam(camera, [5, 2.2, 1.6], [-8, 1.2, 0], 52); // the hallway, Killer at the far end
        if (lt < 1.75) return cam(camera, [1, 1.62, 0], [1.6, -.8, 0], 66); // mining the floor block
        if (lt < 3.0) { const k = clamp((lt - 1.75) / 1.2); return cam(camera, [p.position.x + 3.5, p.position.y - lerp(4, 6, k), 5], [p.position.x, p.position.y + 1.2, 0], 60); } // from below: out of the hole, into the void
        if (lt < I) return cam(camera, [p.position.x - 2.5, p.position.y + 1, 2.5], [p.position.x, p.position.y + 1, 0], 58); // inventory open mid-fall (overlay)
        const k = ease.out(clamp((lt - I) / 1.6));
        return cam(camera, [p.position.x - 3, p.position.y + lerp(1, 6, k), 3], [p.position.x, p.position.y - 5, 0], 58);
      },
    };
  },
};
