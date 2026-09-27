import { loadImage } from './engine.js';
import { PLAYERS, EXTRA } from './data.js';

// 64x64 "skin" whose face is a pixel question mark: used where no real skin exists (OmniRich is only seen in POV).
function unknownSkin() {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64;
  const x = c.getContext('2d');
  x.fillStyle = '#2a2a2a'; x.fillRect(0, 0, 64, 64);
  x.fillStyle = '#d0d0d0';
  for (const [i, j] of [[2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [4, 3], [3, 4], [3, 6]]) x.fillRect(8 + i, 8 + j, 1, 1);
  c.hatOK = false; c.placeholder = true;
  return c;
}

export async function loadAssets() {
  const skins = {};
  const missing = [];
  for (const p of [...PLAYERS, ...EXTRA]) {
    if (!p.skin) { skins[p.id] = unknownSkin(); continue; }
    let im;
    try { im = await loadImage(p.skin); }
    catch (e) { im = unknownSkin(); missing.push(p.id); }
    // legacy 64x32 skins with a fully opaque hat layer: Minecraft ignores that layer
    if (im.height === 32) {
      const c = document.createElement('canvas'); c.width = 64; c.height = 32;
      const x = c.getContext('2d'); x.drawImage(im, 0, 0);
      const d = x.getImageData(32, 0, 32, 16).data; let alpha = false;
      for (let i = 3; i < d.length; i += 4) if (d[i] < 128) { alpha = true; break; }
      im.hatOK = alpha;
    }
    skins[p.id] = im;
  }
  if (missing.length) console.warn('MISSING SKINS: ' + missing.join(', '));
  window.MISSING_SKINS = missing;
  return { skins };
}
