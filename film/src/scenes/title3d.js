// Title: "PERMADEATH" built from blocks, rising out of a lava sea under lightning.
import { THREE, renderPlain } from '../gl.js';
import { World } from '../voxel.js';
import { W, H, text, clamp, ease, lerp, hash2 } from '../engine.js';
import { bolt, embers, glow } from '../fx2d.js';

function glyphMap(str) {
  const c = document.createElement('canvas'); c.width = 8 * str.length + 8; c.height = 10;
  const x = c.getContext('2d'); x.fillStyle = '#fff'; x.font = '8px Pixel'; x.textBaseline = 'top';
  x.fillText(str, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height).data;
  return (i, j) => d[(j * c.width + i) * 4 + 3] > 110;
}

export function title3d({ dur = 7, sub }) {
  const word = 'PERMADEATH';
  const on = glyphMap(word);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#2a0806');
  scene.fog = new THREE.Fog('#2a0806', 40, 140);
  // lava sea + cliffs
  const sea = new World(140, 12, 90, [-70, -8, -60]);
  sea.fill(-70, -8, -60, 69, -3, 29, 'lava');
  for (let x = -70; x < 70; x++) for (let z = -60; z < 30; z++) {
    const edge = Math.abs(x) > 52 || z < -46;
    if (edge) sea.fill(x, -8, z, x, -2 + Math.floor(hash2(x >> 2, z >> 2) * 10), z, 'netherrack');
  }
  scene.add(sea.build());
  // one voxel mesh per letter so they can rise one after another
  const letters = [];
  for (let k = 0; k < word.length; k++) {
    const w = new World(8, 10, 3, [0, 0, 0]);
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) if (on(k * 8 + i, j)) {
      for (let z = 0; z < 3; z++) w.set(i, 8 - j, z, z === 0 && (i + j) % 3 === 0 ? 'crying_obsidian' : j < 2 ? 'nether_bricks' : 'obsidian');
    }
    const m = w.build(); const row = k < 5 ? 1 : 0; m.userData.base = [-20 + (k % 5) * 8, 2 + row * 11]; m.position.set(m.userData.base[0], 0, -20); scene.add(m); letters.push(m);
  }
  scene.add(new THREE.HemisphereLight('#6a3030', '#ff5020', .9));
  const lavaGlow = new THREE.PointLight('#ff5a10', 900, 70, 1.3); lavaGlow.position.set(0, -1, -8); scene.add(lavaGlow);
  const key = new THREE.DirectionalLight('#ffd8c0', 1.4); key.position.set(10, 30, 30); scene.add(key);
  const front = new THREE.PointLight('#ff9a60', 1400, 60, 1.2); front.position.set(0, 12, 4); scene.add(front);
  const flashL = new THREE.DirectionalLight('#dfe8ff', 0); flashL.position.set(-20, 60, 20); scene.add(flashL);
  const cam = new THREE.PerspectiveCamera(40, W / H, .5, 400);
  const strikes = [1.1, 2.35, 4.6];
  return {
    id: 'title', dur, cues: [{ t: 0, type: 'riser', dur: 2.3, gain: .3 }, { t: 2.35, type: 'title_hit' }, { t: 1.1, type: 'thunderlow' }, { t: 4.6, type: 'thunderlow' }],
    draw(ctx, lt, env) {
      letters.forEach((m, k) => {
        const s = .15 + k * .19;
        const kk = ease.outBack(clamp((lt - s) / .9));
        m.position.y = lerp(-24, m.userData.base[1], kk) + (lt > 2.35 && lt < 2.6 ? Math.sin(lt * 80) * .3 : 0);
      });
      lavaGlow.intensity = 900 + Math.sin(env.t * 5) * 120;
      let fl = 0; for (const t of strikes) { const d = lt - t; if (d > 0 && d < .25) fl = Math.max(fl, 1 - d / .25); }
      flashL.intensity = fl * 4;
      const k = ease.inOut(clamp(lt / 3.2));
      cam.position.set(lerp(-30, 0, k), lerp(2, 10, k), lerp(30, 44, k) - lt * .7);
      cam.lookAt(lerp(-12, 0, k), lerp(4, 11, k), -20);
      ctx.drawImage(renderPlain(scene, cam), 0, 0);
      embers(ctx, env.t, { n: 220, seed: 21, alpha: .9, size: 3.5 });
      for (const [t, seed, x0] of [[strikes[0], 7, .25], [strikes[1], 12, .7], [strikes[2], 19, .45]]) {
        const d = lt - t;
        if (d > 0 && d < .22) { ctx.fillStyle = `rgba(210,220,255,${.3 * (1 - d / .22)})`; ctx.fillRect(0, 0, W, H); bolt(ctx, seed, W * x0, -10, W * (x0 + .08), H * .55, { width: 7, alpha: 1 - d / .22 }); }
      }
      const tk = clamp((lt - 3.0) / .8);
      text(ctx, sub, W / 2, H * .8, { font: '900 48px Cinzel', color: '#ffd8b0', spacing: 22, alpha: tk, stroke: 'rgba(20,0,0,.9)', strokeW: 8 });
      text(ctx, 'un servidor de ElRichMC · Minecraft 1.15.2', W / 2, H * .8 + 66, { font: '22px Pixel', color: '#ffffff', alpha: clamp((lt - 3.6) / .8), stroke: '#000', strokeW: 6 });
      if (lt > dur - .6) { ctx.fillStyle = `rgba(0,0,0,${clamp((lt - dur + .6) / .6)})`; ctx.fillRect(0, 0, W, H); }
    },
    fx(lt) {
      const hit = lt - 2.35;
      return { ca: .003 + (hit > 0 && hit < .4 ? .015 * (1 - hit / .4) : 0), shake: hit > 0 && hit < .5 ? [Math.sin(lt * 80) * .01 * (1 - hit * 2), Math.cos(lt * 60) * .01 * (1 - hit * 2)] : [0, 0], vig: .5, flash: hit > 0 && hit < .3 ? .5 * (1 - hit / .3) : 0, flashCol: [1, .6, .4], letterbox: .1 };
    },
  };
}
