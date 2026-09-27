// Helpers used only by d31, d34, d35, d37, d38, d39 (second pass).
import { THREE } from '../gl.js';
import { clamp, lerp, ease } from '../engine.js';

// ---------------------------------------------------------------- Ender Quantum Creeper fuse
// quantumCreeper() is drawn with a translucent MeshBasicMaterial (no emissive), so common.creeperFuse can only swell it.
// This one also flashes it white: the body turns opaque white and a white shell blinks around it, faster and faster.
export function qFuse(qc, t, fs, fe) {
  const u = qc.userData;
  if (!u.qf) {
    const mats = new Set(), parts = [];
    qc.traverse(o => { if (o.isMesh && o.geometry.parameters && o.geometry.parameters.width >= 4) { parts.push(o); mats.add(o.material); } });
    const shellMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: .55, side: THREE.BackSide, depthWrite: false });
    const shells = parts.map(o => { const s = new THREE.Mesh(o.geometry, shellMat); s.scale.setScalar(1.18); s.visible = false; o.add(s); return s; });
    u.qf = { mats: [...mats], cols: [...mats].map(m => m.color.clone()), shells, base: qc.scale.x };
  }
  const q = u.qf;
  const k = clamp((t - fs) / Math.max(.01, fe - fs));
  const on = t >= fs && t < fe;
  const rate = lerp(3, 10, k);
  const white = on && Math.floor((t - fs) * rate * 2) % 2 === 0;
  q.mats.forEach((m, i) => { if (white) { m.color.set('#ffffff'); m.opacity = .97; } else m.color.copy(q.cols[i]); });
  q.shells.forEach(s => { s.visible = white; });
  const sw = on ? 1 + ease.in(k) * .26 : 1;
  qc.scale.set(q.base * sw, q.base * (1 + (sw - 1) * .6), q.base * sw);
  if (u.legs && on) u.legs.forEach(l => { l.rotation.x = 0; });
  return { flashing: on, white };
}
// creeper legs while walking (quantum creepers are creepers underneath)
export function legs(cr, T, moving, speed = 10) { if (cr.userData.legs) cr.userData.legs.forEach((l, i) => { l.rotation.x = moving ? Math.sin(T * speed + (i === 0 || i === 3 ? 0 : Math.PI)) * .5 : 0; }); }

// ---------------------------------------------------------------- 2D Minecraft-ish hotbar (only what the clips show)
// items: array of 9 entries: null | { k, c?, n?, glint? } ; k in sword pick bow shield gapple totem medal x potion carrot diamond milk item apple
export const HB = { x: 960, y: 920, s: 58 };
export const slotXY = i => [HB.x - 4.5 * HB.s + (i + .5) * HB.s, HB.y + HB.s / 2];
export const offXY = () => [HB.x - 4.5 * HB.s - HB.s * 1.35, HB.y + HB.s / 2];
function icon(ctx, it, cx, cy, s) {
  const u = s / 16; const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(cx + x * u, cy + y * u, w * u, h * u); };
  const c = it.c;
  switch (it.k) {
    case 'sword': case 'pick': {
      for (let i = 0; i < 8; i++) R(-1 + i * .9 - 3, 3 - i * .9 - 1, 2, 2, c || '#5fe0d8');
      if (it.k === 'pick') for (let i = -3; i <= 3; i++) R(2 + i * .8, -5 + Math.abs(i) * .6, 1.6, 1.6, c || '#5fe0d8');
      R(-5, 3, 2.4, 2.4, '#6b4a2a'); if (it.k === 'sword') R(-3.5, 1, 3, 1.2, '#3a2a1a');
      break;
    }
    case 'bow': ctx.strokeStyle = '#7a5530'; ctx.lineWidth = 2.2 * u; ctx.beginPath(); ctx.arc(cx - 3 * u, cy + 3 * u, 8 * u, -1.5, .0); ctx.stroke();
      ctx.strokeStyle = '#e8e8e8'; ctx.lineWidth = .8 * u; ctx.beginPath(); ctx.moveTo(cx - 3 * u, cy - 5 * u); ctx.lineTo(cx + 5 * u, cy + 3 * u); ctx.stroke(); break;
    case 'shield': R(-4, -6, 8, 12, '#3a3a3a'); R(-3, -5, 6, 10, c || '#8a6a3a'); break;
    case 'gapple': case 'apple': R(-4, -3, 8, 7, it.k === 'gapple' ? '#f2c33a' : '#d02020'); R(-3, -4, 2, 2, it.k === 'gapple' ? '#fff0a0' : '#ff8080'); R(0, -6, 1, 3, '#5a3a1a'); break;
    case 'totem': case 'medal': { const a = it.k === 'totem' ? ['#f2c44c', '#3fd46a', '#c98a2a'] : ['#8a6a3a', '#4aa84a', '#5a4020'];
      R(-2, -7, 4, 4, a[0]); R(-1.5, -6, 1, 1, a[1]); R(.5, -6, 1, 1, a[1]); R(-6, -2, 12, 2, a[0]); R(-2, -3, 4, 8, a[2]); R(-2, 5, 4, 2, a[0]); break; }
    case 'x': R(-7, -7, 14, 14, '#1f7a78'); R(-6, -6, 12, 12, '#2aa6a0'); ctx.strokeStyle = '#0b3a3a'; ctx.lineWidth = 2.2 * u;
      ctx.beginPath(); ctx.moveTo(cx - 5 * u, cy - 5 * u); ctx.lineTo(cx + 5 * u, cy + 5 * u); ctx.moveTo(cx + 5 * u, cy - 5 * u); ctx.lineTo(cx - 5 * u, cy + 5 * u); ctx.stroke(); break;
    case 'potion': R(-1, -7, 2, 3, '#c8c8c8'); R(-4, -4, 8, 9, c || '#f070c0'); break;
    case 'carrot': for (let i = 0; i < 6; i++) R(-4 + i * 1.3, 4 - i * 1.3, 2.4, 2.4, '#f2b01e'); R(3, -5, 2, 2, '#4aa84a'); break;
    case 'diamond': ctx.fillStyle = '#5fe0d8'; ctx.beginPath(); ctx.moveTo(cx, cy - 6 * u); ctx.lineTo(cx + 6 * u, cy); ctx.lineTo(cx, cy + 6 * u); ctx.lineTo(cx - 6 * u, cy); ctx.fill(); break;
    case 'milk': R(-5, -4, 10, 9, '#b8b8b8'); R(-4, -4, 8, 3, '#ffffff'); break;
    default: R(-5, -5, 10, 10, c || '#8a8a8a');
  }
  if (it.glint) { ctx.fillStyle = 'rgba(190,110,255,.28)'; ctx.fillRect(cx - 7 * u, cy - 7 * u, 14 * u, 14 * u); }
  if (it.n) { ctx.font = `${Math.round(s * .42)}px VT`; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#3a3a3a'; ctx.fillText(it.n, cx + s * .47, cy + s * .47); ctx.fillStyle = '#ffffff'; ctx.fillText(it.n, cx + s * .44, cy + s * .44); }
}
export function hotbar(ctx, items, { sel = 0, off = null, alpha = 1 } = {}) {
  const { x, y, s } = HB;
  ctx.save(); ctx.globalAlpha *= alpha;
  const x0 = x - 4.5 * s;
  ctx.fillStyle = 'rgba(20,20,20,.72)'; ctx.fillRect(x0 - 4, y - 4, 9 * s + 8, s + 8);
  for (let i = 0; i < 9; i++) { ctx.strokeStyle = 'rgba(140,140,140,.9)'; ctx.lineWidth = 3; ctx.strokeRect(x0 + i * s + 2, y + 2, s - 4, s - 4); if (items[i]) icon(ctx, items[i], x0 + i * s + s / 2, y + s / 2, s * .8); }
  if (off) { const ox = x0 - s * 1.35 - s / 2; ctx.fillStyle = 'rgba(20,20,20,.72)'; ctx.fillRect(ox - 4, y - 4, s + 8, s + 8); ctx.strokeStyle = 'rgba(140,140,140,.9)'; ctx.lineWidth = 3; ctx.strokeRect(ox + 2, y + 2, s - 4, s - 4); icon(ctx, off, ox + s / 2, y + s / 2, s * .8); }
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 5; ctx.strokeRect(x0 + sel * s - 1, y - 1, s + 2, s + 2);
  ctx.restore();
}
// item name tooltip above the hotbar (the game shows it when switching slots)
export function tooltip(ctx, str, color = '#ffffff', italic = false) {
  ctx.save(); ctx.font = `${italic ? 'italic ' : ''}34px VT`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#1a1a1a'; ctx.fillText(str, 963, HB.y - 70 + 3); ctx.fillStyle = color; ctx.fillText(str, 960, HB.y - 70); ctx.restore();
}
