// "LOS JUGADORES": every participant, real skin, standing in a ring of pillars
// around a lava well. The camera cuts from player to player on the beat.
import { THREE, renderPlain } from '../gl.js';
import { World } from '../voxel.js';
import { buildPlayer, pose, setGlow } from '../skin3d.js';
import { W, H, text, clamp, ease, lerp, hash2, measure } from '../engine.js';
import { embers, glow, face } from '../fx2d.js';

export function playersScene(assets, players, { shot = 1.2, intro = 3.2, outro = 5.5, beat = .6 } = {}) {
  const N = players.length;
  const R = Math.max(14, N * 1.25); // ring radius in blocks
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#070203');
  scene.fog = new THREE.FogExp2('#0b0303', .011);

  // ---- voxel arena
  const S = Math.ceil(R + 8);
  const w = new World(S * 2 + 1, 14, S * 2 + 1, [-S, -8, -S]);
  for (let x = -S; x <= S; x++) for (let z = -S; z <= S; z++) {
    const d = Math.hypot(x, z);
    if (d > S) continue;
    w.fill(x, -8, z, x, -2, z, 'blackstone');
    if (d < 4.5) { w.fill(x, -3, z, x, -2, z, 'lava'); continue; }
    if (Math.abs(d - (R - 3)) < .7) w.set(x, -2, z, 'lava');
    else if (d < R + 3) w.set(x, -1, z, (Math.floor(d) % 3 === 0) ? 'nether_bricks' : 'blackstone');
    else w.fill(x, -1, z, x, Math.floor(hash2(x, z) * 3), z, 'blackstone');
  }
  scene.add(w.build());

  // ---- players on pedestals, facing the centre
  const models = players.map((p, i) => {
    const a = i / N * Math.PI * 2;
    const m = buildPlayer(assets.skins[p.id], { slim: p.slim ?? null, emissive: '#ffffff' });
    m.scale.setScalar(1 / 16);
    const px = Math.sin(a) * R, pz = Math.cos(a) * R;
    m.position.set(px, 0, pz);
    m.rotation.y = a + Math.PI; // face the centre
    scene.add(m);
    return { m, a, px, pz };
  });

  scene.add(new THREE.HemisphereLight('#c8c0d0', '#2a1a1a', 1.5));
  const lavaLight = new THREE.PointLight('#ff4a10', 25, 30, 1.4); lavaLight.position.set(0, 1, 0); scene.add(lavaLight);
  const fill = new THREE.DirectionalLight('#ffffff', 1.6); scene.add(fill); scene.add(fill.target);
  const top = new THREE.DirectionalLight('#fff0e0', .9); top.position.set(0, 40, 10); scene.add(top);
  const spot = new THREE.SpotLight('#fff8f0', 1400, 30, .5, .5, 1.6); spot.castShadow = true;
  spot.shadow.mapSize.set(1024, 1024);
  scene.add(spot); scene.add(spot.target);
  const rim = new THREE.PointLight('#ff2a10', 45, 10, 1.6); scene.add(rim);
  const cam = new THREE.PerspectiveCamera(32, W / H, .1, 400);

  const total = intro + N * shot + outro;
  const cues = [];
  for (let i = 0; i < N; i++) cues.push({ t: intro + i * shot, type: 'player', i });
  cues.push({ t: intro + N * shot, type: 'players_all' });

  return {
    id: 'players', dur: total, cues,
    draw(ctx, lt, env) {
      const T = env.t;
      models.forEach(({ m }, i) => {
        pose(m, { idle: T * 1.6 + i, headYaw: Math.sin(T * .7 + i) * .15, headPitch: Math.sin(T * .5 + i * 2) * .05 });
        setGlow(m, 0);
      });
      lavaLight.intensity = 60 + Math.sin(T * 7) * 8;
      let cur = -1;
      if (lt < intro) {
        // establishing: slow crane over the ring
        const k = lt / intro;
        cam.fov = 40; cam.updateProjectionMatrix();
        cam.position.set(Math.sin(k * .6) * (R + 18), lerp(26, 12, ease.inOut(k)), Math.cos(k * .6) * (R + 18));
        cam.lookAt(0, 0, 0);
        spot.intensity = 0;
        fill.position.copy(cam.position); fill.target.position.set(0, 0, 0);
      } else if (lt < intro + N * shot) {
        cur = Math.floor((lt - intro) / shot);
        const st = (lt - intro) - cur * shot;
        const { m, a, px, pz } = models[cur];
        setGlow(m, clamp(.12 - st * .2, 0, .12));
        const style = cur % 4;
        const dist = [5.2, 4.8, 5.6, 5.0][style];
        const off = [.35, -.45, .15, -.25][style];
        const h = [1.5, .7, 2.3, 1.1][style];
        const ang = a + Math.PI + off + st * .12 * (style % 2 ? 1 : -1);
        const push = 1 - ease.out(clamp(st / shot)) * .18;
        cam.fov = 33; cam.updateProjectionMatrix();
        cam.position.set(px + Math.sin(ang) * dist * push, h + st * .15, pz + Math.cos(ang) * dist * push);
        cam.lookAt(px, 1.12, pz);
        fill.position.copy(cam.position); fill.target.position.set(px, 1, pz);
        spot.position.set(px, 9, pz); spot.target.position.set(px, 0, pz); spot.intensity = 900;
        rim.position.set(px - Math.sin(a) * 2.5, 2.2, pz - Math.cos(a) * 2.5);
      } else {
        // all together: pull back and up, everyone glows
        const k = clamp((lt - intro - N * shot) / outro);
        cam.fov = 42; cam.updateProjectionMatrix();
        const ang = k * .8 + 2.2;
        cam.position.set(Math.sin(ang) * lerp(8, R + 26, ease.out(k)), lerp(2, 32, ease.inOut(k)), Math.cos(ang) * lerp(8, R + 26, ease.out(k)));
        cam.lookAt(0, lerp(1.5, 0, k), 0);
        spot.intensity = 0;
        fill.position.copy(cam.position); fill.target.position.set(0, 0, 0);
        models.forEach(({ m }) => setGlow(m, .12));
      }
      ctx.drawImage(renderPlain(scene, cam), 0, 0);
      embers(ctx, T, { n: 160, seed: 11, alpha: .8 });

      // ---- overlays
      if (lt < intro) {
        const k = clamp((lt - .3) / 1);
        text(ctx, 'LOS JUGADORES', W / 2, H / 2 - 20, { font: '900 120px Cinzel', color: '#f3e6d0', spacing: 18, alpha: k * (1 - clamp((lt - intro + .5) / .5)), shadow: '#ff2a10', shadowBlur: 40 });
        text(ctx, `${N} creadores · una sola vida`, W / 2, H / 2 + 70, { font: '28px Pixel', color: '#ff5a3a', alpha: clamp((lt - .9) / .6) * (1 - clamp((lt - intro + .5) / .5)) });
      } else if (cur >= 0) {
        const p = players[cur];
        const st = (lt - intro) - cur * shot;
        const k = ease.outExpo(clamp(st / .25));
        const out = clamp((st - shot + .12) / .12);
        const x = 150 + (1 - k) * -80;
        ctx.save(); ctx.globalAlpha = 1 - out;
        // index
        text(ctx, String(cur + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0'), x, H - 300, { font: '22px Pixel', color: '#ff4a2a', align: 'left' });
        // name
        const nameFont = `900 ${p.name.length > 12 ? 84 : 104}px Cinzel`;
        text(ctx, p.name.toUpperCase(), x, H - 215, { font: nameFont, color: '#fff4e2', align: 'left', spacing: 4, shadow: 'rgba(0,0,0,.9)', shadowBlur: 20 });
        const nw = measure(ctx, p.name.toUpperCase(), nameFont, 4);
        ctx.fillStyle = '#d0101a'; ctx.fillRect(x, H - 150, nw * k, 6);
        if (p.user) text(ctx, p.user, x, H - 112, { font: p.cardOnly ? '16px Pixel' : '24px Pixel', color: p.cardOnly ? '#9a8a80' : '#cbb89a', align: 'left' });
        if (p.tag) text(ctx, p.tag, x, H - 72, { font: '400 30px Oswald', color: '#ff8a6a', align: 'left', spacing: 3 });
        ctx.restore();
      } else {
        const k = clamp((lt - intro - N * shot - .6) / 1.2);
        text(ctx, `${N}`, W / 2, H / 2 - 60, { font: '900 220px Cinzel', color: '#fff', alpha: k, shadow: '#ff2a10', shadowBlur: 50 });
        text(ctx, 'ENTRARON', W / 2, H / 2 + 90, { font: '900 64px Cinzel', color: '#f3e6d0', spacing: 30, alpha: k });
      }
    },
    fx(lt) {
      const inShots = lt >= intro && lt < intro + N * shot;
      const st = inShots ? (lt - intro) % shot : 1;
      return { ca: inShots ? .003 + clamp(.01 - st * .05, 0, .01) : .002, flash: inShots ? clamp(.35 - st * 3, 0, .35) : 0, flashCol: [1, .85, .8], vig: .5, letterbox: .1 };
    },
  };
}
