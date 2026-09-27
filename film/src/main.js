import { W, H, FPS, loadFonts, makeCanvas } from './engine.js';
import { renderer } from './gl.js';
import { makePost } from './post.js';
import { loadAssets } from './assets.js';
import { buildTimeline } from './timeline.js';

const params = new URLSearchParams(location.search);
const canvasA = makeCanvas(W, H), canvasB = makeCanvas(W, H);
const ctxA = canvasA.getContext('2d'), ctxB = canvasB.getContext('2d');
const post = makePost(canvasA, canvasB);

const FILM = window.FILM = { ready: false, canvas: renderer.domElement, frames: 0, scenes: [] };

function sceneAt(t) {
  const S = FILM.scenes;
  for (let i = 0; i < S.length; i++) if (t < S[i].start + S[i].dur || i === S.length - 1) return i;
  return S.length - 1;
}

function drawScene(sc, ctx, lt, t, frame) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  sc.draw(ctx, lt, { t, frame, scene: sc });
  ctx.restore();
}

FILM.renderFrame = async function (frame) {
  const t = frame / FPS;
  const i = sceneAt(t);
  const sc = FILM.scenes[i];
  const lt = t - sc.start;
  const fx = sc.fx ? sc.fx(lt) : {};
  const tr = sc.transIn;
  if (tr && i > 0 && lt < tr.dur) {
    const prev = FILM.scenes[i - 1];
    drawScene(prev, ctxA, prev.dur + lt, t, frame);
    drawScene(sc, ctxB, lt, t, frame);
    const p = lt / tr.dur;
    post.render(frame, { ...fx, trans: p, transMode: tr.mode }, true);
  } else {
    drawScene(sc, ctxA, lt, t, frame);
    post.render(frame, fx, false);
  }
};

(async () => {
  await loadFonts();
  const assets = await loadAssets();
  FILM.scenes = await buildTimeline(assets);
  if (params.get('only')) { // preview a single scene (keeps its predecessor for transitions)
    const i = FILM.scenes.findIndex(s => s.id.startsWith(params.get('only')));
    FILM.scenes = FILM.scenes.slice(Math.max(0, i), i + 1);
  }
  let t = 0;
  for (const s of FILM.scenes) { s.start = t; t += s.dur; }
  FILM.duration = t;
  FILM.frames = Math.round(t * FPS);
  document.body.appendChild(renderer.domElement);
  // cues as plain data (building every scene once), for the chunked audio renderer
  FILM.cuesJSON = () => JSON.stringify(FILM.scenes.flatMap(s => (s.cues || []).map(c => ({ ...c, t: c.t + s.start, spec: c.spec ? { sfx: c.spec.sfx } : undefined }))));
  FILM.renderAudioChunk = async (from, to, cuesJson) => {
    const { renderScore } = await import('./audio/score.js');
    const buf = await renderScore(FILM, { from, to, cues: JSON.parse(cuesJson) });
    const L = buf.getChannelData(0), R = buf.getChannelData(1);
    const inter = new Float32Array(L.length * 2);
    for (let i = 0; i < L.length; i++) { inter[i * 2] = L[i]; inter[i * 2 + 1] = R[i]; }
    const u8 = new Uint8Array(inter.buffer); let str = '';
    for (let i = 0; i < u8.length; i += 0x8000) str += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
    FILM._chunk = btoa(str); return FILM._chunk.length;
  };
  FILM.chunkPart = (i, n) => FILM._chunk.slice(i * n, (i + 1) * n);
  FILM.renderAudio = async () => {
    const { renderScore, wavChunks } = await import('./audio/score.js');
    FILM.cues = FILM.scenes.flatMap(s => (s.cues || []).map(c => ({ ...c, t: c.t + s.start })));
    const buf = await renderScore(FILM);
    FILM._wav = wavChunks(buf);
    return FILM._wav.length;
  };
  FILM.wavChunk = i => FILM._wav[i];
  FILM.ready = true;
  if (!params.has('render')) {
    // live preview mode: play in real time (no audio), ?t=seconds to start
    document.body.classList.add('preview');
    const hud = document.createElement('div'); hud.id = 'hud'; document.body.appendChild(hud);
    let start = performance.now() - (parseFloat(params.get('t') || 0) * 1000);
    const loop = async () => {
      const tt = (performance.now() - start) / 1000;
      const f = Math.floor(tt * FPS) % FILM.frames;
      await FILM.renderFrame(f);
      hud.textContent = `${(f / FPS).toFixed(2)}s  scene: ${FILM.scenes[sceneAt(f / FPS)].id}`;
      requestAnimationFrame(loop);
    };
    loop();
  }
})();
