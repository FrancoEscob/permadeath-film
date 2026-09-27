// #26 Alkapone (Leyville) — día 38, 02/05/2020 04:07. Verified: wiki (Caída, tótems consumidos) + clip
// (GersoonSG 16:40–17:32): End City among dozens of endermen (hitbox lines on), invisible; two totems pop
// (causes not visible); gliding toward a chorus island with an End City; high above it he opens his inventory
// (Invisibility 7:39) and by 17:32.0 all four armour slots — elytra (Mending, Unbreaking III) and the Feather
// Falling IV boots included — are empty; he lands at full health beside an enderman -> "Leyville fell from a
// high place". Why he did it: unknown (not stated anywhere) — the retelling does not suggest a reason.
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { pixBox } from '../mobs.js';
import { player, face, cam, pose, clamp, lerp, ease, ghostify, totemPop, hurt, PX } from './common.js';
import { safeWander, isle, chorus, endTower, wander, walkOn, ender, groundFoot, noteBlock } from './lib_end_d23_27.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
// timeline (sim s): S1 End City + two totems · S2 glide · S3 inventory mid-air · fall · I landing = death
const T1 = .35, T2 = 1.9, S2 = 2.6, S3 = 4.3, OFF = [4.45, 4.62, 4.95, 5.1], TIP = [4.74, 4.95], CLOSE = 5.4;
const FALL0 = OFF[2], Y0 = 11, VY0 = 6, G = 16; // elytra off -> free fall from y0 (body centre)
const I = FALL0 + (-VY0 + Math.sqrt(VY0 * VY0 + 4 * G * (Y0 - 1))) / (2 * G);
const SLOW = [{ t: 4.4, d: .95, f: .38 }, { t: 5.38, d: I - 5.38 + .02, f: .4 }];

// ------------------------------------------------------------------ Minecraft inventory screen (2D overlay)
const ICON = {
  helmet: ['........', '.PPPPPP.', 'PPppppPP', 'PpPPPPpP', 'PP....PP', 'PP....PP', '........', '........'],
  elytra: ['GG....GG', 'GgG..GgG', 'GggGGggG', 'GgggggG.', '.GgggG..', '.GggG...', '..GG....', '........'],
  legs: ['PPPPPPPP', 'PpppppPP', 'PPP..PPP', 'PP....PP', 'PP....PP', 'PP....PP', 'pP....Pp', '........'],
  boots: ['........', '........', '.PP..PP.', '.PP..PP.', '.PP..PP.', 'PPP.PPP.', 'PpP.PpP.', '........'],
  chest: ['PP....PP', 'PPPPPPPP', 'PpPPPPpP', '.PPPPPP.', '.PPppPP.', '.PPPPPP.', '.PPPPPP.', '........'],
  totem: ['..YYYY..', '..YGGY..', 'YYYYYYYY', 'Y.YYYY.Y', '..YyyY..', '..YYYY..', '..Y..Y..', '........'],
  carrot: ['......GG', '.....GG.', '....OO..', '...OOO..', '..OOO...', '.OOO....', 'OO......', '........'],
  pearl: ['........', '..TTTT..', '.TtTTTT.', '.TTtTTT.', '.TTTTTT.', '..TTTT..', '........', '........'],
  rocket: ['....ww..', '...RRw..', '..RRR...', '.RwR....', '.RR.....', 'b.......', '........', '........'],
  sword: ['......DD', '.....DD.', '....DD..', '.b.DD...', '..bD....', '.bbb....', 'b..b....', '........'],
  bow: ['...bbbb.', '..b...s.', '.b...s..', 'b...s...', 'b..s....', 'b.s.....', '.s......', '........'],
  echest: ['KKKKKKKK', 'KkkkkkkK', 'KkkEEkkK', 'KKKEEKKK', 'KkkkkkkK', 'KkkkkkkK', 'KKKKKKKK', '........'],
  potion: ['...ww...', '...ww...', '..wLLw..', '.wLLLLw.', '.wLLLLw.', '.wLLLLw.', '..wwww..', '........'],
  endstone: ['EeEEEeEE', 'EEEeEEEE', 'eEEEEEeE', 'EEeEEEEE', 'EEEEeEEe', 'eEEEEEEE', 'EEEeEEeE', '........'],
};
const COL = { P: '#7a3ad0', p: '#c08af2', G: '#8d8fa6', g: '#b39ad6', Y: '#f2c44c', y: '#c98a2a', O: '#f08a1c', T: '#1f6b5a', t: '#63d8c0', R: '#c8261e', w: '#f2f2f2', b: '#6b4a2a', D: '#5fe0d8', s: '#dddddd', K: '#1c2a2a', k: '#2f4a44', E: '#e4e2a8', e: '#c9c68a', L: '#b58ad8' };
const GHOST = { // empty armour-slot outlines
  helmet: ['........', '.xxxxxx.', 'x......x', 'x.xxxx.x', 'xx....xx', '........', '........', '........'],
  chest: ['xx....xx', 'x.xxxx.x', 'x......x', '.x....x.', '.x....x.', '.xxxxxx.', '........', '........'],
  legs: ['xxxxxxxx', 'x......x', 'x..xx..x', 'x.x..x.x', 'x.x..x.x', 'xxx..xxx', '........', '........'],
  boots: ['........', '........', '.xx..xx.', '.x.x.x.x', 'x..xx..x', 'xxx.xxx.', '........', '........'],
};
function icon(ctx, name, x, y, s, alpha = 1, pal = COL) { // 8x8 art filling a 16x16 GUI slot (s = screen px per GUI px)
  const a = ICON[name] || GHOST[name]; if (!a) return;
  ctx.save(); ctx.globalAlpha *= alpha;
  for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { const c = a[j][i]; if (c === '.') continue; ctx.fillStyle = pal[c] || '#9a9a9a'; ctx.fillRect(x + i * 2 * s, y + j * 2 * s, 2 * s + .5, 2 * s + .5); }
  ctx.restore();
}
function slot(ctx, X, Y, s, gx, gy) { // 18x18 vanilla slot: dark top-left, white bottom-right, #8b8b8b inside
  ctx.fillStyle = '#373737'; ctx.fillRect(X + gx * s, Y + gy * s, 18 * s, 18 * s);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(X + (gx + 1) * s, Y + (gy + 1) * s, 17 * s, 17 * s);
  ctx.fillStyle = '#8b8b8b'; ctx.fillRect(X + (gx + 1) * s, Y + (gy + 1) * s, 16 * s, 16 * s);
}
function count(ctx, X, Y, s, gx, gy, n) {
  ctx.font = `${Math.round(7 * s)}px MC`; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#3f3f3f'; ctx.fillText(n, X + (gx + 18) * s, Y + (gy + 18) * s);
  ctx.fillStyle = '#ffffff'; ctx.fillText(n, X + (gx + 17) * s, Y + (gy + 17) * s);
}
// grid contents seen in the clip (spare purple SNetherite pieces, totems, golden carrots, pearls, rockets…)
const GRID = [['chest', 0, 0], ['totem', 1, 0, ''], ['echest', 5, 0], ['potion', 6, 0], ['endstone', 8, 0, '2'], ['sword', 0, 1, ''], ['carrot', 1, 1, '35'], ['pearl', 3, 1, '15'], ['potion', 4, 1], ['rocket', 5, 1, '57'], ['totem', 6, 1], ['endstone', 8, 1, '19'],
  ['potion', 0, 2], ['carrot', 1, 2, '16'], ['pearl', 2, 2, '4'], ['totem', 3, 2], ['chest', 5, 2], ['echest', 7, 2], ['rocket', 8, 2, '10']];
const HOTBAR = [['sword', 0], ['bow', 1], ['sword', 2], ['carrot', 3, '55'], ['pearl', 4, '15'], ['rocket', 5, '28'], ['totem', 6], ['potion', 7], ['endstone', 8, '46']];
const DEST = [[2, 0], [3, 0], [4, 0], [7, 0]]; // where each removed armour piece lands in the grid (helmet, elytra, legs, boots)
function inventory(ctx, x0, y0, s, lt, k) {
  ctx.save(); ctx.globalAlpha = k;
  const X = x0, Y = y0, Wp = 176 * s, Hp = 166 * s;
  // panel with the vanilla bevel: black rim, white top-left, dark grey bottom-right
  ctx.fillStyle = '#000000'; ctx.fillRect(X + 2 * s, Y, Wp - 4 * s, Hp); ctx.fillRect(X, Y + 2 * s, Wp, Hp - 4 * s); ctx.fillRect(X + s, Y + s, Wp - 2 * s, Hp - 2 * s);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(X + s, Y + s, Wp - 3 * s, Hp - 3 * s);
  ctx.fillStyle = '#555555'; ctx.fillRect(X + 3 * s, Y + 3 * s, Wp - 4 * s, Hp - 4 * s);
  ctx.fillStyle = '#c6c6c6'; ctx.fillRect(X + 3 * s, Y + 3 * s, Wp - 6 * s, Hp - 6 * s);
  // armour column: helmet, chest (elytra), legs, boots — emptying one by one
  const pieces = ['helmet', 'elytra', 'legs', 'boots'], ghosts = ['helmet', 'chest', 'legs', 'boots'];
  const offT = [OFF[3], OFF[2], OFF[1], OFF[0]]; // helmet last, elytra third, legs second, boots first
  pieces.forEach((pc, i) => {
    slot(ctx, X, Y, s, 7, 7 + i * 18);
    const gone = lt > offT[i];
    if (!gone) icon(ctx, pc, X + 8 * s, Y + (8 + i * 18) * s, s);
    else icon(ctx, ghosts[i], X + 8 * s, Y + (8 + i * 18) * s, s, 1, { x: '#a9a9a9' });
  });
  slot(ctx, X, Y, s, 76, 61); icon(ctx, 'boots', X + 77 * s, Y + 62 * s, s, 0); // offhand (empty: shield outline)
  ctx.strokeStyle = '#a9a9a9'; ctx.lineWidth = s; ctx.strokeRect(X + 80 * s, Y + 64 * s, 9 * s, 11 * s);
  // player preview: black box; the invisible player shows only as a faint shape + the worn armour
  ctx.fillStyle = '#373737'; ctx.fillRect(X + 25 * s, Y + 7 * s, 52 * s, 72 * s); ctx.fillStyle = '#ffffff'; ctx.fillRect(X + 26 * s, Y + 8 * s, 51 * s, 71 * s);
  ctx.fillStyle = '#000000'; ctx.fillRect(X + 26 * s, Y + 8 * s, 50 * s, 70 * s);
  const bx = X + 51 * s, by = Y + 14 * s;
  ctx.fillStyle = '#161616'; ctx.fillRect(bx - 4 * s, by, 8 * s, 8 * s); ctx.fillRect(bx - 4 * s, by + 8 * s, 8 * s, 12 * s); ctx.fillRect(bx - 8 * s, by + 8 * s, 4 * s, 12 * s); ctx.fillRect(bx + 4 * s, by + 8 * s, 4 * s, 12 * s); ctx.fillRect(bx - 4 * s, by + 20 * s, 8 * s, 12 * s);
  if (lt < offT[1]) { ctx.fillStyle = '#8d8fa6'; ctx.fillRect(bx - 9 * s, by + 9 * s, 5 * s, 14 * s); ctx.fillRect(bx + 4 * s, by + 9 * s, 5 * s, 14 * s); }
  ctx.fillStyle = '#7a3ad0';
  if (lt < offT[0]) ctx.fillRect(bx - 5 * s, by - s, 10 * s, 5 * s);
  if (lt < offT[2]) ctx.fillRect(bx - 4.5 * s, by + 19 * s, 9 * s, 8 * s);
  if (lt < offT[3]) ctx.fillRect(bx - 4.5 * s, by + 28 * s, 9 * s, 4.5 * s);
  // 2x2 crafting, arrow, result, recipe book
  ctx.font = `${Math.round(7 * s)}px MC`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#404040'; ctx.fillText('Crafting', X + 97 * s, Y + 13 * s);
  for (const [gx, gy] of [[97, 17], [115, 17], [97, 35], [115, 35]]) slot(ctx, X, Y, s, gx, gy);
  ctx.fillStyle = '#8b8b8b'; ctx.fillRect(X + 135 * s, Y + 32 * s, 10 * s, 3 * s); ctx.beginPath(); ctx.moveTo(X + 144 * s, Y + 28 * s); ctx.lineTo(X + 150 * s, Y + 33.5 * s); ctx.lineTo(X + 144 * s, Y + 39 * s); ctx.fill();
  slot(ctx, X, Y, s, 153, 27);
  ctx.fillStyle = '#2f7a3a'; ctx.fillRect(X + 104 * s, Y + 61 * s, 20 * s, 18 * s); ctx.fillStyle = '#5fcf6a'; ctx.fillRect(X + 106 * s, Y + 63 * s, 16 * s, 14 * s); ctx.fillStyle = '#e8e0c0'; ctx.fillRect(X + 109 * s, Y + 66 * s, 10 * s, 8 * s);
  // main grid + hotbar
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) slot(ctx, X, Y, s, 7 + c * 18, 83 + r * 18);
  for (let c = 0; c < 9; c++) slot(ctx, X, Y, s, 7 + c * 18, 141);
  GRID.forEach(([nm, c, r, n]) => { icon(ctx, nm, X + (8 + c * 18) * s, Y + (84 + r * 18) * s, s); if (n) count(ctx, X, Y, s, 7 + c * 18, 83 + r * 18, n); });
  HOTBAR.forEach(([nm, c, n]) => { icon(ctx, nm, X + (8 + c * 18) * s, Y + 142 * s, s); if (n) count(ctx, X, Y, s, 7 + c * 18, 141, n); });
  // removed pieces: dragged from their slot to the grid (short move), then they sit there
  pieces.forEach((pc, i) => {
    const t0 = offT[i], kk = clamp((lt - t0) / .09); if (lt < t0) return;
    const [dc, dr] = DEST[i];
    const sx = X + 8 * s, sy = Y + (8 + i * 18) * s, ex = X + (8 + dc * 18) * s, ey = Y + (84 + dr * 18) * s;
    icon(ctx, pc, lerp(sx, ex, ease.inOut(kk)), lerp(sy, ey, ease.inOut(kk)), s);
  });
  // hover tooltip over the chest (elytra) slot
  if (lt > TIP[0] && lt < TIP[1]) {
    const tx = X + 20 * s, ty = Y + 14 * s, tw = 78 * s, th = 33 * s;
    ctx.fillStyle = 'rgba(16,0,16,.94)'; ctx.fillRect(tx, ty, tw, th);
    ctx.strokeStyle = '#5000ff'; ctx.lineWidth = s; ctx.strokeRect(tx + 1.5 * s, ty + 1.5 * s, tw - 3 * s, th - 3 * s);
    ctx.font = `${Math.round(7.5 * s)}px MC`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#55ffff'; ctx.fillText('Elytra', tx + 4 * s, ty + 11 * s);
    ctx.fillStyle = '#aaaaaa'; ctx.fillText('Mending', tx + 4 * s, ty + 21 * s); ctx.fillText('Unbreaking III', tx + 4 * s, ty + 30 * s);
  }
  // mouse pointer
  const mp = lt < TIP[0] ? [X + 16 * s, Y + (66 - (lt - S3) * 60) * s] : lt < OFF[2] ? [X + 16 * s, Y + 30 * s] : [X + 16 * s, Y + 12 * s];
  ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(mp[0], mp[1]); ctx.lineTo(mp[0], mp[1] + 26); ctx.lineTo(mp[0] + 7, mp[1] + 19); ctx.lineTo(mp[0] + 17, mp[1] + 19); ctx.closePath(); ctx.fill(); ctx.stroke();
  // effect box on the left: Invisibility 7:39
  const ex = X - 124 * s, ey = Y;
  ctx.fillStyle = '#1b1b1b'; ctx.fillRect(ex, ey, 120 * s, 32 * s); ctx.strokeStyle = '#5a5a5a'; ctx.lineWidth = s; ctx.strokeRect(ex + s, ey + s, 118 * s, 30 * s);
  ctx.fillStyle = '#e8e2b0'; ctx.beginPath(); ctx.arc(ex + 16 * s, ey + 16 * s, 7 * s, 0, 7); ctx.fill(); ctx.fillStyle = '#7fb8e0'; ctx.fillRect(ex + 13 * s, ey + 9 * s, 6 * s, 4 * s);
  ctx.font = `${Math.round(7.5 * s)}px MC`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#ffffff'; ctx.fillText('Invisibility', ex + 30 * s, ey + 14 * s);
  ctx.fillStyle = '#7f7f7f'; ctx.fillText('7:39', ex + 30 * s, ey + 25 * s);
  ctx.restore();
}

export default {
  n: 26, player: 'alkapone', name: 'Alkapone', ign: 'Leyville', day: 38, date: '02/05/2020 · 04:07',
  sfx: 'hit', impact: I, dur: I + 1.6, slow: SLOW,
  tags: ['INVISIBLE'],
  chat: [
    ['Leyville ha consumido un tótem. (Probabilidad: 0 != 99)', '#ffff55'],
    ['Este es el comienzo del sufrimiento eterno de Leyville. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['MYMALK4PON3, MYM: Malo Y Muerto', '#aaaaaa'],
    ['[MIEMBRO] Leyville fell from a high place', '#ffffff'],
  ],
  build(assets) {
    const w = new World(100, 64, 100, [-50, -22, -50]);
    // A: End City island where it starts (top y=10); B: big chorus island with an End City (top y=0)
    isle(w, { cx: -16, cz: -14, r: 12, top: 10, depth: 8, seed: 2 });
    endTower(w, -26, 10, -24, { h: 12, s: 7 });
    w.fill(-19, 10, -21, -9, 15, -20, 'purpur'); w.fill(-19, 16, -21, -9, 16, -20, 'end_bricks'); // long End City wall he backs along
    for (let x = -18; x <= -10; x += 3) w.set(x, 13, -20, 0);
    const LS = V(9.2, 0, 6.2); // landing spot on B, beside an enderman
    isle(w, { cx: 14, cz: 12, r: 14, top: 0, depth: 11, seed: 5, terr: 1, keep: (x, z) => Math.hypot(x - LS.x, z - LS.z) < 5 });
    endTower(w, 20, 0, 18, { h: 11, s: 6 }); endTower(w, 25, 0, 8, { h: 7, s: 5 });
    let sd = 20;
    for (const [x, z, h] of [[6, 14, 5], [12, 2, 6], [16, 12, 4], [3, 9, 4], [10, 19, 6], [20, 3, 5], [5, 20, 4], [22, 22, 5], [15, -1, 4], [1, 4, 3], [-22, -10, 4], [-18, -6, 3]]) { let y = 24; while (y > -20 && !w.get(x, y - 1, z)) y--; if (y > -20) chorus(w, x, y, z, h, sd++); }
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0a0610');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#d8c8f0', '#2a2030', 1.25));
    const dl = new THREE.DirectionalLight('#fff4e6', .5); dl.position.set(4, 12, 6); scene.add(dl);

    // player: invisible outline; the purple SNetherite pieces and the elytra still render (vanilla)
    const rig = new THREE.Group(); rig.rotation.order = 'YXZ'; scene.add(rig);
    const p = player(assets, 'alkapone'); rig.add(p);
    ghostify(p, { color: '#ffffff', t: .5 });
    const u = p.userData;
    const purple = (w0, h0, d0) => pixBox(w0, h0, d0, (f, i, j, r) => hex(r() < .3 ? '#6a2ab8' : '#8a4ad8'));
    const helm = purple(9, 4.5, 9); helm.position.y = 6.4; u.head.add(helm);
    const legs = [u.legR, u.legL].map(l => { const m = purple(4.6, 8, 4.6); m.position.y = -3.5; l.add(m); return m; });
    const belt = purple(8.8, 3, 4.8); belt.position.y = -10.6; u.body.add(belt);
    const boots = [u.legR, u.legL].map(l => { const m = purple(4.8, 4, 4.8); m.position.y = -10.2; l.add(m); return m; });
    const ely = M.elytra(); ely.position.set(0, 23, -2.5); p.add(ely);

    // endermen: crowd at the End City (hitbox lines were on in his client), one tipped over and dying; more on B
    const hitbox = () => { const g = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ color: '#ffffff' }), bw = 9.6, bh = 46.4, t = .45; const bar = (a, b, c, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(a, b, c), mat); m.position.set(x, y, z); g.add(m); }; for (const sx of [-1, 1]) for (const sz of [-1, 1]) bar(t, bh, t, sx * bw / 2, bh / 2, sz * bw / 2); for (const y of [0, bh]) for (const s of [-1, 1]) { bar(bw, t, t, 0, y, s * bw / 2); bar(t, t, bw, s * bw / 2, y, 0); } return g; };
    const crowdA = [[-10, -15, 1.5, 1, .45, 0], [-9, -11, 1.2, 1.4, .5, 2], [-12, -9, 1.4, .8, .4, 4], [-7, -14, 1, 1.5, .55, 1], [-10, -7, 1.2, 1, .5, 3], [-7, -10, 1, 1.2, .45, 5], [-13, -13, .8, 1.2, .5, 6]].map(([cx, cz, rx, rz, sp, ph]) => { const e = ender(); e.add(hitbox()); scene.add(e); return { e, f: safeWander(w, cx, cz, rx, rz, sp, ph) }; });
    const dying = ender(); dying.add(hitbox()); scene.add(dying); dying.position.set(-8.6, 10.25, -12.4); dying.rotation.set(0, .7, Math.PI / 2); hurt(dying, .45);
    const onB = [[14, 10, 2.5, 2, .4, 0], [8, 12, 2, 1.5, .5, 1], [18, 13, 1.5, 2.5, .45, 3], [12, 16, 2, 1.2, .5, 5], [17, 4, 1.5, 1.5, .4, 2], [6, 2, 1.5, 1, .5, 4]].map(([cx, cz, rx, rz, sp, ph]) => { const e = ender(); scene.add(e); return { e, f: safeWander(w, cx, cz, rx, rz, sp, ph) }; });
    const beside = ender(); scene.add(beside); beside.position.set(LS.x + 1.3, 0, LS.z + .9); face(beside, LS.x, LS.z);
    const pop1 = totemPop(scene), pop2 = totemPop(scene);
    const camera = new THREE.PerspectiveCamera(56, 16 / 9, .05, 260);

    // S1: he backs along the wall (POV); S2 glide toward B; S3 dive with the inventory open; then free fall
    const eye = lt => V(lerp(-13.5, -15.5, ease.inOut(clamp((lt - .9) / 1.6))), 11.62, -18.6);
    const glide = new THREE.CatmullRomCurve3([V(-8, 14, -7), V(-2, 16.5, -2), V(4, 18.5, 2.5), V(7.4, 19.4, 4.6)], false, 'centripetal');
    const body = lt => {
      if (lt < S3) return glide.getPoint(clamp((lt - S2) / (S3 - S2)));
      if (lt < FALL0) { const k = clamp((lt - S3) / (FALL0 - S3)); return V(lerp(7.4, LS.x, k), lerp(19.4, Y0, ease.in(k) * .6 + k * .4), lerp(4.6, LS.z, k)); }
      const tau = lt - FALL0; return V(LS.x, Math.max(1, Y0 - VY0 * tau - G * tau * tau), LS.z);
    };
    const X0 = 640, Y0S = 262, SC = 3.1; // inventory placement (left-centre; he stays in the right third)
    return {
      scene, ink: { skyA: '#140a1e', skyB: '#3a2452', tint: '#f2ecff', lineW: 2.3 },
      cues: [{ t: T1, type: 'sfx', kind: 'totem' }, { t: T2, type: 'sfx', kind: 'totem' }, { t: S2 + .1, type: 'sfx', kind: 'whoosh', dur: 1.5, gain: .3 }, { t: FALL0, type: 'sfx', kind: 'whoosh', dur: .6, gain: .3 }],
      hearts: lt => ({ v: lt < T1 ? 10 : lt < T2 ? 1 : lt < S2 ? 1.5 : 10, blink: (lt > T1 && lt < T1 + .2) || (lt > T2 && lt < T2 + .2) }),
      overlay(ctx, lt) { const k = clamp((lt - S3) / .06) * (1 - clamp((lt - CLOSE) / .05)); if (k > 0) inventory(ctx, X0, Y0S, SC, lt, k); },
      notes: [
        ...noteBlock(.4, 2.75, ['dos tótems seguidos', 'no se ve la causa'], 1240, 330, { slow: SLOW }),
        ...noteBlock(2.65, 4.5, ['planea hacia otra end city'], 1180, 250, { to: () => V(23, 14, 21), bend: -40, slow: SLOW }),
        ...noteBlock(S3 + .05, CLOSE + .05, ['se quita la armadura en pleno vuelo'], 640, 200, { size: 46, to: [X0 + 16 * SC, Y0S + 26 * SC], bend: 25, ax: 700, ay: 228, slow: SLOW }),
        ...noteBlock(CLOSE, I + 1.3, ['cae junto a un enderman', 'con la vida llena'], 1180, 230, { slow: SLOW }),
      ],
      update(lt, T) {
        // ---- player rig
        const pos = lt < S2 ? eye(lt).add(V(0, -.62, 0)) : body(lt);
        rig.position.copy(pos);
        const prone = lt < S2 ? 0 : lt < FALL0 ? Math.PI / 2 : lerp(Math.PI / 2, .25, clamp((lt - FALL0) / .2));
        const b0 = body(lt - .03), b1 = body(lt + .03);
        const yaw = lt < S2 ? 0 : Math.atan2(b1.x - b0.x, b1.z - b0.z) || 0.9;
        const pitch = lt < S2 || lt > FALL0 ? 0 : clamp(-Math.atan2(b1.y - b0.y, Math.hypot(b1.x - b0.x, b1.z - b0.z)) * .5, -.4, .9);
        rig.rotation.set(pitch, lt < FALL0 ? yaw : .9, lt > FALL0 ? Math.sin(lt * 3) * .15 : 0);
        p.rotation.x = prone; p.position.set(0, -Math.cos(prone), -Math.sin(prone));
        const gliding = lt >= S2 && lt < FALL0;
        pose(p, { idle: T * 2, armRaise: lt > FALL0 ? 2.4 : 0, headPitch: gliding ? -1.1 : 0 });
        if (lt > FALL0) { u.armL.rotation.x = -2.4; u.legR.rotation.x = .3; u.legL.rotation.x = -.2; }
        ely.userData.L.rotation.set(gliding ? .35 : .1, 0, gliding ? .62 : -.1); ely.userData.R.rotation.set(gliding ? .35 : .1, 0, gliding ? -.62 : .1);
        // armour pieces leave in the order seen in the inventory: boots, leggings, elytra, helmet
        boots.forEach(m => m.visible = lt < OFF[0]); legs.forEach(m => m.visible = lt < OFF[1]); belt.visible = lt < OFF[1];
        ely.visible = lt < OFF[2]; helm.visible = lt < OFF[3];
        rig.visible = lt >= S2 && lt < I;
        // ---- endermen
        crowdA.forEach((o, i) => { walkOn(o.e, w, o.f, T * .8 + i * 1.3, { from: 30 }); });
        onB.forEach((o, i) => walkOn(o.e, w, o.f, T * .8 + i * 1.7));
        beside.position.y = groundFoot(w, beside.position.x, beside.position.z); pose(beside, { idle: T, headYaw: Math.sin(T * .6) * .3 });
        // ---- camera
        let c;
        if (lt < S2) { const e = eye(lt); c = cam(camera, [e.x, e.y, e.z], [e.x + 6, e.y - .9, e.z + 4.5 - lt * .3], 64); } // his view: endermen at the End City; two totems
        else if (lt < S3) { const d = V(Math.sin(yaw), 0, Math.cos(yaw)), sd = V(d.z, 0, -d.x); c = cam(camera, [pos.x - d.x * 4.2 + sd.x * 1.6, pos.y + 2.4, pos.z - d.z * 4.2 + sd.z * 1.6], [pos.x + d.x * 7, pos.y - 4.5, pos.z + d.z * 7], 60); } // gliding toward the chorus island
        else if (lt < CLOSE) c = cam(camera, [pos.x - 5, pos.y + 2.5, pos.z - 1], [pos.x + 3, pos.y - 3, pos.z - 3.5], 60); // inventory open, the ground coming up
        else if (lt < I) c = cam(camera, [LS.x - 4.5, 2.2, LS.z + 4], [LS.x + .4, lerp(4, 1.2, clamp((lt - CLOSE) / (I - CLOSE))), LS.z], 58); // falling beside the enderman
        else { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(LS.x - 5, LS.x - 9, k), lerp(2, 7, k), lerp(LS.z - 4, LS.z - 8, k)], [LS.x, 0, LS.z], 55); }
        pop1(camera, lt < T2 ? lt - T1 : -1); pop2(camera, lt - T2);
        return c;
      },
    };
  },
};
