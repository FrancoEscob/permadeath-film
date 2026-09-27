// Minecraft-style survival inventory, drawn in 2D with pixel icons made in code.
// Used to replicate ElRichMC's real inventory (frames 20:15–20:19 of the GersoonSG compilation).
const C = {
  bg: '#c6c6c6', hi: '#ffffff', lo: '#555555', slot: '#8b8b8b', slotHi: '#373737', slotLo: '#ffffff', text: '#404040',
};
// tiny pixel icons (16x16 logical, painted as rect groups)
function px(ctx, x, y, s, rects) { for (const [c, i, j, w = 1, h = 1] of rects) { ctx.fillStyle = c; ctx.fillRect(x + i * s, y + j * s, w * s, h * s); } }
const ICON = {
  diamond: [['#1a9a92', 3, 4, 10, 2], ['#6fe3dc', 4, 3, 8, 1], ['#a8fff6', 5, 4, 3, 1], ['#3fc9c0', 4, 6, 8, 2], ['#2aa89f', 5, 8, 6, 2], ['#1a8a82', 6, 10, 4, 2], ['#157a73', 7, 12, 2, 1]],
  elytra: [['#9a86c8', 3, 2, 4, 11], ['#9a86c8', 9, 2, 4, 11], ['#bcaee0', 4, 3, 2, 8], ['#bcaee0', 10, 3, 2, 8], ['#6a5a9a', 3, 12, 4, 1], ['#6a5a9a', 9, 12, 4, 1], ['#6a5a9a', 7, 2, 2, 2]],
  block: c => [[c, 2, 2, 12, 12], ['rgba(255,255,255,.25)', 2, 2, 12, 2], ['rgba(0,0,0,.25)', 2, 12, 12, 2]],
  rocket: [['#e8e8e8', 7, 5, 3, 9], ['#d02020', 7, 3, 3, 3], ['#8a1010', 8, 1, 1, 2], ['#b0b0b0', 7, 12, 3, 2]],
  totem: [['#6a3c10', 5, 1, 6, 1], ['#f2c44c', 5, 2, 6, 4], ['#3fd46a', 6, 3, 1, 1], ['#3fd46a', 9, 3, 1, 1], ['#f2c44c', 1, 6, 14, 2], ['#c98a2a', 1, 8, 3, 1], ['#c98a2a', 12, 8, 3, 1], ['#f2c44c', 6, 8, 4, 5], ['#2fbf8a', 7, 9, 2, 1], ['#c98a2a', 5, 13, 6, 1]],
  shield: [['#b8a8d8', 4, 2, 8, 12], ['#8a78b8', 4, 2, 8, 1], ['#8a78b8', 4, 13, 8, 1]],
  arrow: [['#e0e0e0', 3, 11, 2, 2], ['#6b4a2a', 5, 5, 1, 7], ['#6b4a2a', 6, 4, 1, 1], ['#a0a0a0', 10, 2, 3, 3], ['#6b4a2a', 7, 6, 3, 3]],
  sign: [['#b8945f', 2, 3, 12, 7], ['#6b4a2a', 7, 10, 2, 4], ['#1a1a1a', 4, 5, 8, 1], ['#1a1a1a', 4, 7, 6, 1]],
  gapple: [['#f6d33b', 4, 5, 8, 8], ['#fff29a', 5, 6, 2, 2], ['#c9a020', 4, 12, 8, 1], ['#6b4a2a', 7, 3, 2, 2], ['#3fa03f', 9, 2, 3, 2]],
  potion: c => [['#d8d8e8', 7, 2, 2, 3], ['#8a6a4a', 7, 1, 2, 1], [c, 4, 6, 8, 7], ['rgba(255,255,255,.5)', 5, 7, 2, 2], ['#d8d8e8', 4, 5, 8, 1]],
  bottle: [['#d8d8e8', 7, 2, 2, 3], ['#c86a4a', 7, 1, 2, 1], ['rgba(220,230,240,.7)', 4, 6, 8, 7]],
  sword: c => [[c, 9, 2, 3, 3], [c, 7, 4, 3, 3], [c, 5, 6, 3, 3], ['#6b4a2a', 3, 10, 2, 2], ['#3a2a1a', 2, 9, 5, 1], ['#3a2a1a', 4, 8, 1, 5]],
  axe: [['#8a4ad8', 8, 2, 5, 5], ['#6b4a2a', 4, 6, 2, 8], ['#6b4a2a', 6, 5, 2, 2]],
  pick: [['#5fe0d8', 3, 2, 10, 2], ['#5fe0d8', 2, 3, 2, 2], ['#5fe0d8', 12, 3, 2, 2], ['#6b4a2a', 7, 4, 2, 10]],
  bow: [['#7a5530', 4, 2, 2, 12], ['#7a5530', 6, 1, 2, 2], ['#7a5530', 6, 13, 2, 2], ['#e8e8e8', 9, 3, 1, 10], ['#b070ff', 4, 6, 2, 2]],
  pearl: [['#1f6b5a', 4, 4, 8, 8], ['#2f9a82', 5, 5, 4, 3], ['#0f3a30', 4, 11, 8, 1]],
  carrot: [['#f2b400', 6, 4, 4, 9], ['#ffe066', 7, 5, 2, 3], ['#3fa03f', 8, 1, 3, 3]],
  chest: [['#8a1a4a', 3, 2, 10, 11], ['#5a0a2a', 3, 2, 3, 3], ['#5a0a2a', 10, 2, 3, 3], ['#b02a6a', 5, 5, 6, 6]],
  helmet: [['#8a1a4a', 3, 4, 10, 5], ['#5a0a2a', 3, 9, 3, 2], ['#5a0a2a', 10, 9, 3, 2]],
  legs: [['#8a1a4a', 3, 2, 10, 4], ['#8a1a4a', 3, 6, 4, 8], ['#8a1a4a', 9, 6, 4, 8]],
  boots: [['#8a1a4a', 3, 7, 4, 6], ['#8a1a4a', 9, 7, 4, 6], ['#5a0a2a', 2, 12, 5, 2], ['#5a0a2a', 9, 12, 5, 2]],
  book: [['#3a8a3a', 2, 3, 12, 10], ['#8ad08a', 3, 4, 10, 8], ['#1a5a1a', 2, 12, 12, 1]],
};
const icon = (k, arg) => typeof ICON[k] === 'function' ? ICON[k](arg) : ICON[k];

function bevel(ctx, x, y, w, h, fill, hi, lo, t = 3) {
  ctx.fillStyle = fill; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = hi; ctx.fillRect(x, y, w, t); ctx.fillRect(x, y, t, h);
  ctx.fillStyle = lo; ctx.fillRect(x, y + h - t, w, t); ctx.fillRect(x + w - t, y, t, h);
}
function slot(ctx, x, y, s) { bevel(ctx, x, y, 18 * s, 18 * s, C.slot, C.slotHi, C.slotLo, s); }

// items: map "row,col" -> {k, arg, n, bar}; rows 0..2 = main grid, 3 = hotbar
// armor: [helmet, chest, legs, boots] booleans; offhand: item or null
export function drawInventory(ctx, { x, y, s = 3, items = {}, armor = [1, 1, 1, 1], offhand = { k: 'totem' }, preview = null, tooltip = null, highlight = null, alpha = 1 }) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.imageSmoothingEnabled = false;
  const W = 176 * s, H = 166 * s;
  bevel(ctx, x, y, W, H, C.bg, C.hi, C.lo, 2 * s);
  // armour column
  const armorIcons = ['helmet', 'chest', 'legs', 'boots'];
  for (let i = 0; i < 4; i++) {
    slot(ctx, x + 7 * s, y + (7 + i * 18) * s, s);
    if (armor[i]) px(ctx, x + 8 * s, y + (8 + i * 18) * s, s, icon(armorIcons[i]));
    else { ctx.strokeStyle = '#5a5a5a'; ctx.lineWidth = s; ctx.strokeRect(x + 11 * s, y + (11 + i * 18) * s, 9 * s, 9 * s); }
  }
  // player preview
  ctx.fillStyle = '#000'; ctx.fillRect(x + 26 * s, y + 8 * s, 49 * s, 70 * s);
  if (preview) preview(ctx, x + 26 * s, y + 8 * s, 49 * s, 70 * s);
  // offhand
  slot(ctx, x + 76 * s, y + 61 * s, s);
  if (offhand) px(ctx, x + 77 * s, y + 62 * s, s, icon(offhand.k, offhand.arg));
  // crafting
  ctx.fillStyle = C.text; ctx.font = `${7 * s}px MC`; ctx.textBaseline = 'top'; ctx.fillText('Crafting', x + 97 * s, y + 6 * s);
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) slot(ctx, x + (97 + i * 18) * s, y + (17 + j * 18) * s, s);
  ctx.fillStyle = '#8b8b8b'; ctx.fillRect(x + 136 * s, y + 31 * s, 10 * s, 3 * s);
  ctx.beginPath(); ctx.moveTo(x + 146 * s, y + 28 * s); ctx.lineTo(x + 151 * s, y + 32.5 * s); ctx.lineTo(x + 146 * s, y + 37 * s); ctx.fill();
  slot(ctx, x + 153 * s, y + 27 * s, s);
  // recipe book button
  bevel(ctx, x + 104 * s, y + 61 * s, 20 * s, 18 * s, '#c6c6c6', '#fff', '#373737', s);
  px(ctx, x + 106 * s, y + 62 * s, s, icon('book'));
  // grid + hotbar
  const cell = (r, c) => [x + (7 + c * 18) * s, y + (r < 3 ? 83 + r * 18 : 141) * s];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) {
    const [cx, cy] = cell(r, c); slot(ctx, cx, cy, s);
    const it = items[`${r},${c}`]; if (!it) continue;
    px(ctx, cx + s, cy + s, s, icon(it.k, it.arg));
    if (it.bar) { ctx.fillStyle = '#000'; ctx.fillRect(cx + 3 * s, cy + 14 * s, 13 * s, 2 * s); ctx.fillStyle = '#2ce02c'; ctx.fillRect(cx + 3 * s, cy + 14 * s, 13 * s * it.bar, s); }
    if (it.n) { ctx.font = `${7 * s}px MC`; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#3f3f3f'; ctx.fillText(String(it.n), cx + 18 * s, cy + 17.5 * s); ctx.fillStyle = '#ffffff'; ctx.fillText(String(it.n), cx + 17 * s, cy + 16.5 * s); ctx.textAlign = 'left'; }
  }
  if (highlight) {
    const [cx, cy] = highlight.armor != null ? [x + 7 * s, y + (7 + highlight.armor * 18) * s] : cell(...highlight.cell);
    ctx.strokeStyle = highlight.color || '#e0141a'; ctx.lineWidth = 3 * s * .8;
    const r = 15 * s, k = highlight.k ?? 1;
    ctx.beginPath(); ctx.ellipse(cx + 9 * s, cy + 9 * s, r, r * .9, -.2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2.1 * k); ctx.stroke();
  }
  if (tooltip) {
    const [tx, ty] = tooltip.at;
    ctx.font = `${8 * s}px MC`;
    const lines = tooltip.lines; const tw = Math.max(...lines.map(l => ctx.measureText(l[0]).width)) + 8 * s, th = lines.length * 10 * s + 6 * s;
    ctx.fillStyle = 'rgba(16,0,16,.94)'; ctx.fillRect(tx, ty, tw, th);
    ctx.strokeStyle = '#2d0a63'; ctx.lineWidth = s; ctx.strokeRect(tx + s, ty + s, tw - 2 * s, th - 2 * s);
    ctx.textBaseline = 'top';
    lines.forEach(([t, c], i) => { ctx.fillStyle = c; ctx.fillText(t, tx + 4 * s, ty + 4 * s + i * 10 * s); });
  }
  ctx.restore();
  return { cell, W, H };
}

// ElRichMC's inventory as seen at 20:15 (chest still equipped) — contents from the frame
export const RICH_ITEMS = {
  '0,0': { k: 'diamond' }, '0,1': { k: 'elytra', bar: .9 }, '0,2': { k: 'block', arg: '#a57ea5' }, '0,3': { k: 'rocket', n: 21 },
  '0,4': { k: 'block', arg: '#161616', n: 8 }, '0,5': { k: 'block', arg: '#5a4326', n: 22 }, '0,6': { k: 'totem' }, '0,7': { k: 'totem' }, '0,8': { k: 'totem' },
  '1,0': { k: 'shield', bar: .8 }, '1,1': { k: 'arrow', n: 4 }, '1,2': { k: 'block', arg: '#dfe3a8', n: 3 }, '1,3': { k: 'sign', n: 3 },
  '1,4': { k: 'block', arg: '#a37ea3' }, '1,5': { k: 'gapple', n: 45 }, '1,7': { k: 'potion', arg: '#e060c0' }, '1,8': { k: 'totem' },
  '2,0': { k: 'sword', arg: '#5fe0d8' }, '2,1': { k: 'arrow' }, '2,2': { k: 'axe' }, '2,3': { k: 'block', arg: '#5a4326', n: 64 },
  '2,4': { k: 'block', arg: '#7a7a7a', n: 15 }, '2,5': { k: 'block', arg: '#5a4326', n: 64 }, '2,6': { k: 'pearl', n: 16 }, '2,7': { k: 'potion', arg: '#e060c0' }, '2,8': { k: 'totem' },
  '3,0': { k: 'sword', arg: '#5fe0d8' }, '3,1': { k: 'bow' }, '3,2': { k: 'pick' }, '3,3': { k: 'rocket', n: 58 }, '3,4': { k: 'carrot', n: 52 },
  '3,5': { k: 'bottle' }, '3,6': { k: 'pearl', n: 16 }, '3,7': { k: 'potion', arg: '#e060c0' }, '3,8': { k: 'totem' },
};
