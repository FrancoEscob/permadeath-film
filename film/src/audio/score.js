// The score, generated from the film's own scene list + cues so every hit lands on its frame.
import { Synth, n, midi } from './synth.js';
import { hash2 } from '../engine.js';

const BEAT = .5; // 120 BPM
const PROG = [ // one chord per bar (2 s): root for bass, voicing for pads
  { bass: 'D2', pad: ['D3', 'F3', 'A3'] },
  { bass: 'Bb1', pad: ['D3', 'F3', 'Bb3'] },
  { bass: 'F2', pad: ['C3', 'F3', 'A3'] },
  { bass: 'C2', pad: ['C3', 'E3', 'G3'] },
  { bass: 'D2', pad: ['D3', 'F3', 'A3'] },
  { bass: 'Bb1', pad: ['D3', 'F3', 'Bb3'] },
  { bass: 'G1', pad: ['D3', 'G3', 'Bb3'] },
  { bass: 'A1', pad: ['C#3', 'E3', 'A3'] },
];
const DARK = [ // act III: lower, harsher
  { bass: 'D2', pad: ['D3', 'F3', 'A3'] },
  { bass: 'Eb2', pad: ['Eb3', 'G3', 'Bb3'] },
  { bass: 'D2', pad: ['D3', 'F3', 'A3'] },
  { bass: 'C#2', pad: ['C#3', 'E3', 'A3'] },
];

// Renders the events that START inside [from, to) (times shifted by -from), plus a long tail so every
// event finishes inside its own chunk. Chunks are summed afterwards -> exact linear mix.
export async function renderScore(FILM, { sampleRate = 48000, from = 0, to = Infinity, tail = 22, cues } = {}) {
  to = Math.min(to, FILM.duration + 1);
  const ctx = new OfflineAudioContext(2, Math.ceil((to - from + tail) * sampleRate), sampleRate);
  const raw = new Synth(ctx, { bare: true });
  const S = new Proxy(raw, { get(target, prop) {
    const v = target[prop];
    if (typeof v !== 'function') return v;
    return (t, ...rest) => { if (typeof t !== 'number' || t < from || t >= to) return; return v.call(target, t - from, ...rest); };
  } });
  FILM = { ...FILM, cues: cues || FILM.cues };
  const scenes = FILM.scenes;
  const find = pre => scenes.filter(s => s.id.startsWith(pre));

  // ------------------------------------------------ mute windows (silence around deaths)
  const mutes = [];
  for (const c of FILM.cues) if (c.type === 'impact') mutes.push([c.t - .05, c.t + 1.6]);
  for (const c of FILM.cues) if (c.type === 'slowmo') mutes.push([c.t, c.t + c.dur]);
  const muted = t => mutes.some(([a, b]) => t > a && t < b);

  // ------------------------------------------------ cold open
  const co = find('coldopen')[0];
  if (co) {
    S.drone(co.start, co.dur + 1, n('D1'), .16);
    S.pad(co.start + 11.6, 6, [n('D2'), n('A2')], { gain: .12, a: 3, cutoff: 700 });
    S.riser(co.start + co.dur - 3.2, 3.2, .4);
    S.swell(co.start + co.dur - 1.6, 1.6, .35);
  }
  const ti = find('title')[0];
  if (ti) {
    S.drone(ti.start, ti.dur + 2, n('D1'), .18);
    S.choir(ti.start + .1, ti.dur, [n('D3'), n('A3'), n('D4'), n('F4')], { gain: .2, a: .8, r: 2.5 });
    S.pad(ti.start, ti.dur, [n('D2'), n('A2'), n('D3')], { gain: .14, a: .4, cutoff: 900 });
    S.riser(ti.start + ti.dur - 2, 2, .3);
  }

  // ------------------------------------------------ driving sections (players + chronicle)
  const drive = scenes.filter(s => s.id === 'players' || s.id.startsWith('death_') || s.id.startsWith('decree') || s.id.startsWith('ban_') || s.id.startsWith('act') || s.id.startsWith('rollback'));
  const decreeStarts = scenes.filter(s => s.id.startsWith('decree_')).map(s => s.start);
  const stage = t => decreeStarts.filter(d => d <= t).length; // 0..7 difficulty stage
  const inDecree = t => scenes.some(s => s.id.startsWith('decree_') && t >= s.start && t < s.start + s.dur);
  if (drive.length) {
    const t0 = drive[0].start, t1 = drive[drive.length - 1].start + drive[drive.length - 1].dur;
    const actIII = scenes.find(s => s.id === 'act3');
    const darkFrom = actIII ? actIII.start : Infinity;
    for (let bar = 0; t0 + bar * 2 < t1; bar++) {
      const tb = t0 + bar * 2;
      const P = stage(tb) >= 5 ? DARK[bar % DARK.length] : PROG[bar % PROG.length];
      const inPlayers = scenes.find(s => s.id === 'players' && tb >= s.start && tb < s.start + s.dur);
      const st = stage(tb), dec = inDecree(tb + 1);
      const intensity = inPlayers ? 1 : dec ? 1.05 : Math.min(1, .7 + st * .05);
      // pad
      if (!muted(tb + 1)) S.pad(tb, 2.05, P.pad.map(n), { gain: .09 * intensity, a: .3, r: .4, cutoff: 1100 + 500 * intensity });
      // sub bass on the bar
      if (!muted(tb)) S.sub(tb, 1.9, n(P.bass), .22);
      // ostinato: 16ths in players / act III, 8ths otherwise
      const step = intensity >= 1 ? BEAT / 4 : BEAT / 2;
      for (let s = 0; s < 2 / step; s++) {
        const t = tb + s * step;
        if (muted(t)) continue;
        const pat = [0, 12, 7, 12, 0, 12, 10, 12];
        const note = n(P.bass) + 12 + pat[s % pat.length];
        S.pluck(t, note, { gain: (s % 4 === 0 ? .13 : .08) * intensity, dec: .14, cutoff: 1400 + 800 * intensity, pan: s % 2 ? .25 : -.25 });
      }
      // drums: kick on 1 & 3, taiko rolls on bar 4 of 4
      for (let b = 0; b < 4; b++) {
        const t = tb + b * BEAT;
        if (muted(t)) continue;
        if (b % 2 === 0) S.drum(t, { f0: 120, f1: 45, dec: .45, gain: .55 * intensity, verb: .25, click: .15 });
        else S.noise(t, .12, { type: 'bandpass', f0: 2200, f1: 900, q: 1, gain: .12 * intensity, verb: .3 });
      }
      if (dec || stage(tb) >= 4) for (let b = 0; b < 8; b++) { const t = tb + b * BEAT / 2; if (!muted(t)) S.drum(t, { f0: b % 2 ? 95 : 70, f1: 40, dec: .3, gain: (dec ? .38 : .22) * (b % 4 === 0 ? 1.3 : .8), verb: .35, click: .08, pan: b % 2 ? .35 : -.35 }); }
      if (dec && !muted(tb)) S.choir(tb, 2.1, P.pad.map(x => n(x) + 12), { gain: .07, a: .3, r: .5, vowel: 'a' });
      if (bar % 4 === 3) for (let k = 0; k < 4; k++) { const t = tb + 1 + k * BEAT / 2; if (!muted(t)) S.drum(t, { f0: 180 - k * 15, f1: 70, dec: .35, gain: .3 + k * .08, verb: .4, click: .2, pan: k % 2 ? .3 : -.3 }); }
    }
  }

  // ------------------------------------------------ cue-driven hits
  let lastBlip = -1, decreeItem = 0;
  for (const c of FILM.cues) {
    const t = c.t;
    switch (c.type) {
      case 'heartbeat': S.heartbeat(t, .75); break;
      case 'typeline': for (let i = 0; i < c.len; i += 2) { const tt = t + i / 34; if (tt > lastBlip + .05) { S.blip(tt, 76 + (i % 5), .035, .03); lastBlip = tt; } } break;
      case 'kick': S.boom(t, .7); S.noise(t, .4, { type: 'highpass', f0: 1200, f1: 6000, gain: .3, verb: .2 }); break;
      case 'thunder': S.thunder(t, .7, (hash2(t * 100 | 0, 3) - .5)); break;
      case 'title_hit': S.boom(t, 1.2); S.braam(t, 5, [n('D1'), n('A1'), n('D2')], .5); S.bell(t + .02, n('D4'), .25); break;
      case 'player': S.drum(t, { f0: 160, f1: 55, dec: .55, gain: .75, verb: .4, click: .35, pan: (c.i % 2 ? .2 : -.2) }); S.whoosh(t - .25, .3, .12); if (c.i % 4 === 0) S.bell(t, n('A4'), .08); break;
      case 'players_all': S.boom(t, 1); S.braam(t, 4, [n('D1'), n('F2'), n('A2')], .45); S.choir(t, 5, [n('D3'), n('F3'), n('A3'), n('D4')], { gain: .22, a: .4 }); break;
      case 'vig_start': {
        S.whoosh(t - .35, .45, .22); S.noise(t - .1, .5, { type: 'lowpass', f0: 3000, f1: 300, gain: .12, verb: .3 }); S.tick(t + .05, .08, 1800);
        const imp = FILM.cues.find(x => x.type === 'impact' && x.t > t);
        if (imp) {
          const span = imp.t - t;
          S.tremolo(t + .2, span - .25, [n('D2'), n('A2'), n('D3')], .1);
          S.timpRoll(imp.t - Math.min(1.6, span * .5), Math.min(1.6, span * .5), .55, 95);
        }
        break;
      }
      case 'impact': {
        const sfx = c.spec.sfx || 'hit';
        S.riser(t - 1.2, 1.2, .18);
        if (sfx === 'explosion' || sfx === 'fireball') { S.explosion(t, .95); S.boom(t, .7); }
        else if (sfx === 'void') { S.noise(t - .6, 1.4, { type: 'bandpass', f0: 2000, f1: 150, q: 1.5, gain: .35, a: .3, verb: .8 }); S.boom(t, .6); }
        else if (sfx === 'drown') { for (let k = 0; k < 8; k++) S.blip(t - .8 + k * .09, 60 + (k * 7) % 12, .05, .05); S.boom(t, .6); }
        else if (sfx === 'arrow') { S.noise(t - .15, .15, { type: 'highpass', f0: 3000, f1: 6000, gain: .2, verb: .2 }); S.hurt(t, .45); S.boom(t, .75); }
        else { S.hurt(t, .45); S.boom(t, .8); }
        S.noise(t, .05, { type: 'highpass', f0: 5000, f1: 8000, gain: .2, verb: .1 });
        S.braam(t + .02, 2.6, [n('D1'), n('A1'), n('D2'), n('F2')], .42);
        S.choir(t + .02, 2.4, [n('D3'), n('A3'), n('D4')], { gain: .16, a: .04, r: 1.6, vowel: 'a' });
        S.crash(t, .3);
        break;
      }
      case 'permadeath': {
        // synthesized roar + tolling bell + choir swell
        S.roar(t, 1.9, .42);
        S.bell(t + .05, n('D3'), .32);
        S.choir(t + .1, 2.2, [n('D3'), n('A3'), n('F4')], { gain: .14, a: .5, r: 1.2, vowel: 'o' });
        break;
      }
      case 'decree': {
        S.riser(t - 1.0, 1.0, .35); S.swell(t - .6, .6, .3);
        S.boom(t, 1.3); S.crash(t, .4);
        S.braam(t, 3.2, [n('D1'), n('A1'), n('D2'), n('F2')], .5);
        S.choir(t, 3.4, [n('D3'), n('F3'), n('A3'), n('D4')], { gain: .24, a: .05, r: 2, vowel: 'a' });
        S.bell(t + .02, n('D3'), .3);
        decreeItem = 0;
        break;
      }
      case 'slowmo': {
        S.whoosh(t - .15, .4, .2);
        const c2 = S.ctx; // descending "time slows down" tone
        for (let k = 0; k * .55 < c.dur; k++) S.heartbeat(t + .1 + k * .55, .55);
        S.noise(t, c.dur, { type: 'lowpass', f0: 900, f1: 120, q: 1.5, gain: .12, a: .2, verb: .6 });
        S.sub(t, c.dur, n('D1'), .16);
        break;
      }
      case 'tick': S.tick(t, .09, 2600); S.drum(t, { f0: 400, f1: 200, dec: .05, gain: .12, verb: .05, click: .1 }); break;
      case 'decree_item': {
        const steps = ['D2', 'F2', 'G2', 'A2', 'C3'];
        const root = n(steps[decreeItem % steps.length]); decreeItem++;
        S.braam(t, .7, [root - 12, root, root + 7], .3);
        S.drum(t, { f0: 150, f1: 55, dec: .5, gain: .7, verb: .4, click: .3 });
        S.noise(t, .25, { type: 'highpass', f0: 3000, f1: 6000, gain: .12, verb: .3 });
        S.tick(t, .06, 3200);
        break;
      }
      case 'ban': S.noise(t, .25, { type: 'highpass', f0: 800, f1: 4000, gain: .25, verb: .2 }); S.sub(t, .6, n('D1'), .3); break;
      case 'ban_stamp': S.drum(t, { f0: 90, f1: 40, dec: .3, gain: .7, verb: .2, click: .5 }); break;
      case 'memorial': {
        const mel = ['A4', 'F4', 'E4', 'D4', 'E4', 'F4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C#4', 'D4'];
        const chords = [['D3', 'A3'], ['Bb2', 'F3'], ['F2', 'C3'], ['A2', 'E3']];
        mel.forEach((m, i) => S.piano(t + 1 + i * 1.0, n(m), .2, 3, .1));
        for (let i = 0; i < 4; i++) { chords[i].forEach(ch => S.piano(t + 1 + i * 3.25, n(ch), .14, 4, -.15)); }
        S.pad(t, 15, [n('D3'), n('F3'), n('A3')], { gain: .06, a: 3, r: 4, cutoff: 900 });
        S.choir(t + 6, 10, [n('D4'), n('A4')], { gain: .1, a: 3, r: 4, vowel: 'u' });
        break;
      }
      case 'boom': S.boom(t, c.gain ?? 1); break;
      case 'braam': S.braam(t, c.dur ?? 3, (c.notes || ['D1', 'A1']).map(n), c.gain ?? .4); break;
      case 'riser': S.riser(t, c.dur ?? 2, c.gain ?? .3); break;
      case 'bell': S.bell(t, n(c.note || 'D4'), c.gain ?? .25); break;
      case 'piano': S.piano(t, n(c.note), c.gain ?? .2, c.dec ?? 2.5); break;
      case 'choir': S.choir(t, c.dur ?? 4, (c.notes || ['D3', 'A3']).map(n), { gain: c.gain ?? .15 }); break;
      case 'thunderlow': S.thunder(t, .5, 0); break;
      case 'rain': S.rain(t, c.dur ?? 4, c.gain ?? .1); break;
      case 'sfx': {
        if (c.kind === 'hurt') S.hurt(t, c.gain ?? .3);
        if (c.kind === 'explosion') S.explosion(t, c.gain ?? .6);
        if (c.kind === 'whoosh') S.whoosh(t, c.dur ?? .6, c.gain ?? .25);
        if (c.kind === 'totem') { S.bell(t, n('E5'), .12); S.bell(t + .08, n('B5'), .1); S.noise(t, .6, { type: 'highpass', f0: 3000, f1: 9000, gain: .15, verb: .6 }); }
        if (c.kind === 'hiss') S.noise(t, c.dur ?? 1.2, { type: 'highpass', f0: 2500, f1: 4000, q: .5, gain: c.gain ?? .12, a: .1, verb: .1 });
        if (c.kind === 'shoot') { S.noise(t, .5, { type: 'lowpass', f0: 1500, f1: 300, gain: .25, verb: .4 }); S.drum(t, { f0: 90, f1: 50, dec: .3, gain: .3, verb: .3, click: .1 }); }
        if (c.kind === 'pop') S.drum(t, { f0: 400, f1: 150, dec: .1, gain: .25, verb: .1, click: .2 });
        if (c.kind === 'splash') S.noise(t, .8, { type: 'lowpass', f0: 2500, f1: 400, gain: .3, verb: .3 });
        if (c.kind === 'teleport') S.noise(t, .5, { type: 'bandpass', f0: 3000, f1: 300, q: 4, gain: .2, verb: .4 });
        if (c.kind === 'bow') { S.noise(t, .12, { type: 'highpass', f0: 2000, f1: 4000, gain: .2, verb: .2 }); S.drum(t, { f0: 300, f1: 180, dec: .08, gain: .15, click: .1 }); }
        if (c.kind === 'pearl') S.whoosh(t, .5, .2);
        break;
      }
    }
  }
  const buf = await ctx.startRendering();
  return buf;
}

// 16-bit PCM WAV, returned as base64 chunks to keep CDP messages small.
export function wavChunks(buf, chunkSec = 20) {
  const sr = buf.sampleRate, L = buf.getChannelData(0), R = buf.getChannelData(1);
  const out = [];
  const header = new ArrayBuffer(44), v = new DataView(header);
  const N = L.length, bytes = N * 4;
  const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); v.setUint32(4, 36 + bytes, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
  v.setUint16(22, 2, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true);
  w(36, 'data'); v.setUint32(40, bytes, true);
  const b64 = u8 => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
  out.push(b64(new Uint8Array(header)));
  const step = Math.floor(sr * chunkSec);
  for (let a = 0; a < N; a += step) {
    const b = Math.min(N, a + step);
    const pcm = new Int16Array((b - a) * 2);
    for (let i = a; i < b; i++) {
      pcm[(i - a) * 2] = Math.max(-1, Math.min(1, L[i])) * 32767;
      pcm[(i - a) * 2 + 1] = Math.max(-1, Math.min(1, R[i])) * 32767;
    }
    out.push(b64(new Uint8Array(pcm.buffer)));
  }
  return out;
}
