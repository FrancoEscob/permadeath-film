// Tiny orchestral/trailer synth on top of (Offline)AudioContext. No samples: every
// sound is oscillators, noise and filters.
import { rng } from '../engine.js';

export const midi = n => 440 * Math.pow(2, (n - 69) / 12);
const NOTE = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
export const n = s => { const m = s.match(/^([A-G][#b]?)(-?\d)$/); return (+m[2] + 1) * 12 + NOTE[m[1]]; };

export class Synth {
  constructor(ctx, { bare = false } = {}) {
    this.ctx = ctx;
    const c = ctx;
    this.master = c.createGain(); this.master.gain.value = .8;
    if (bare) this.master.connect(c.destination); // chunked render: dynamics applied later by ffmpeg
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -14; comp.knee.value = 8; comp.ratio.value = 4; comp.attack.value = .004; comp.release.value = .18;
    const lim = c.createDynamicsCompressor();
    lim.threshold.value = -2; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = .001; lim.release.value = .05;
    if (!bare) { this.master.connect(comp); comp.connect(lim); lim.connect(c.destination); }
    // buses
    this.dry = c.createGain(); this.dry.connect(this.master);
    this.verb = c.createConvolver(); this.verb.buffer = this.impulse(4.2, 2.4);
    this.verbIn = c.createGain(); this.verbIn.gain.value = 1;
    const verbOut = c.createGain(); verbOut.gain.value = .55;
    this.verbIn.connect(this.verb); this.verb.connect(verbOut); verbOut.connect(this.master);
    this.shortVerb = c.createConvolver(); this.shortVerb.buffer = this.impulse(1.2, 3);
    this.shortIn = c.createGain(); const so = c.createGain(); so.gain.value = .4;
    this.shortIn.connect(this.shortVerb); this.shortVerb.connect(so); so.connect(this.master);
    this.noiseBuf = this.makeNoise(4);
    this.distCurve = this.curve(3.5);
  }
  impulse(sec, decay) {
    const c = this.ctx, len = Math.floor(sec * c.sampleRate);
    const b = c.createBuffer(2, len, c.sampleRate), r = rng(7);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (r() * 2 - 1) * Math.pow(1 - i / len, decay) * (i < 200 ? i / 200 : 1);
    }
    return b;
  }
  makeNoise(sec) {
    const c = this.ctx, len = Math.floor(sec * c.sampleRate);
    const b = c.createBuffer(2, len, c.sampleRate), r = rng(3);
    for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = r() * 2 - 1; }
    return b;
  }
  curve(k) {
    const N = 2048, cv = new Float32Array(N);
    for (let i = 0; i < N; i++) { const x = i / (N - 1) * 2 - 1; cv[i] = Math.tanh(k * x) / Math.tanh(k); }
    return cv;
  }
  out(node, { dry = 1, verb = .3, short = 0, pan = 0 } = {}) {
    const c = this.ctx;
    const p = c.createStereoPanner(); p.pan.value = pan;
    node.connect(p);
    if (dry) { const g = c.createGain(); g.gain.value = dry; p.connect(g); g.connect(this.dry); }
    if (verb) { const g = c.createGain(); g.gain.value = verb; p.connect(g); g.connect(this.verbIn); }
    if (short) { const g = c.createGain(); g.gain.value = short; p.connect(g); g.connect(this.shortIn); }
    return p;
  }
  env(g, t, a, peak, d, sus = 0, rel = 0, hold = 0) {
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    if (hold) g.gain.setValueAtTime(peak, t + a + hold);
    g.gain.setTargetAtTime(sus, t + a + hold, d / 3);
    if (rel) g.gain.setTargetAtTime(0, t + a + hold + d, rel / 3);
  }
  noise(t, dur, { type = 'lowpass', f0 = 800, f1 = f0, q = .7, gain = .5, a = .005, verb = .3, pan = 0, short = 0 } = {}) {
    const c = this.ctx;
    const s = c.createBufferSource(); s.buffer = this.noiseBuf; s.loop = true;
    const f = c.createBiquadFilter(); f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + a);
    g.gain.setTargetAtTime(0, t + a, Math.max(.01, (dur - a) / 3));
    s.connect(f); f.connect(g); this.out(g, { verb, pan, short });
    s.start(t, (t * 7.13) % 3); s.stop(t + dur + .5);
  }
  // cinematic taiko / kick
  drum(t, { f0 = 140, f1 = 42, dec = .5, gain = 1, verb = .35, click = .3, pan = 0 } = {}) {
    const c = this.ctx;
    const o = c.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dec * .35);
    const g = c.createGain(); this.env(g, t, .002, gain, dec);
    const ws = c.createWaveShaper(); ws.curve = this.curve(1.8);
    o.connect(ws); ws.connect(g); this.out(g, { verb, pan });
    o.start(t); o.stop(t + dec * 2 + .1);
    if (click) this.noise(t, .06, { type: 'bandpass', f0: 1800, f1: 600, q: .8, gain: click, verb: verb * .5, pan });
  }
  // the big trailer hit
  boom(t, gain = 1) {
    this.drum(t, { f0: 90, f1: 28, dec: 2.8, gain: 1.1 * gain, verb: .6, click: .5 * gain });
    this.drum(t, { f0: 220, f1: 60, dec: .6, gain: .5 * gain, verb: .5, click: 0 });
    this.noise(t, 2.4, { type: 'lowpass', f0: 3000, f1: 80, gain: .45 * gain, verb: .9 });
    this.noise(t, .25, { type: 'highpass', f0: 3000, f1: 6000, gain: .25 * gain, verb: .6 });
  }
  // brass "braam": stacked detuned saws, distorted, filter swell
  braam(t, dur, notes, gain = .5) {
    const c = this.ctx;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 2;
    f.frequency.setValueAtTime(120, t); f.frequency.exponentialRampToValueAtTime(1400, t + .35); f.frequency.exponentialRampToValueAtTime(300, t + dur);
    const ws = c.createWaveShaper(); ws.curve = this.distCurve;
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + .08); g.gain.setTargetAtTime(0, t + dur * .6, dur * .25);
    for (const nn of notes) for (const d of [-9, -3, 4, 10]) {
      const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = midi(nn); o.detune.value = d;
      const og = c.createGain(); og.gain.value = .12;
      o.connect(og); og.connect(ws); o.start(t); o.stop(t + dur + 1);
    }
    ws.connect(f); f.connect(g); this.out(g, { verb: .55 });
  }
  // string / synth pad
  pad(t, dur, notes, { gain = .18, a = 1.2, r = 1.5, cutoff = 1400, verb = .6, type = 'sawtooth', pan = 0 } = {}) {
    const c = this.ctx;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cutoff; f.Q.value = .5;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + a);
    g.gain.setValueAtTime(gain, t + Math.max(a, dur - r)); g.gain.linearRampToValueAtTime(0, t + dur);
    notes.forEach((nn, i) => {
      for (const d of [-7, 6]) {
        const o = c.createOscillator(); o.type = type; o.frequency.value = midi(nn); o.detune.value = d + i;
        const lfo = c.createOscillator(); lfo.frequency.value = 4.5 + i * .3; const lg = c.createGain(); lg.gain.value = 4;
        lfo.connect(lg); lg.connect(o.detune); lfo.start(t); lfo.stop(t + dur + .1);
        const og = c.createGain(); og.gain.value = .5 / notes.length;
        o.connect(og); og.connect(f); o.start(t); o.stop(t + dur + .1);
      }
    });
    f.connect(g); this.out(g, { verb, pan });
  }
  // choir "aah": sawtooth + vibrato through vowel formants
  choir(t, dur, notes, { gain = .22, a = 1.5, r = 2, vowel = 'a' } = {}) {
    const c = this.ctx;
    const F = { a: [[800, 1], [1150, .5], [2900, .25]], o: [[450, 1], [800, .4], [2830, .15]], u: [[325, 1], [700, .3], [2530, .1]] }[vowel];
    const sum = c.createGain();
    notes.forEach((nn, i) => {
      for (const d of [-12, -4, 5, 13]) {
        const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = midi(nn); o.detune.value = d;
        const lfo = c.createOscillator(); lfo.frequency.value = 5 + ((i * 3 + d) % 7) * .1; const lg = c.createGain(); lg.gain.value = 9;
        lfo.connect(lg); lg.connect(o.detune); lfo.start(t); lfo.stop(t + dur + .2);
        const og = c.createGain(); og.gain.value = .25 / notes.length;
        o.connect(og); og.connect(sum); o.start(t); o.stop(t + dur + .2);
      }
    });
    const g = c.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + a);
    g.gain.setValueAtTime(gain, t + Math.max(a, dur - r)); g.gain.linearRampToValueAtTime(0, t + dur);
    for (const [fr, amp] of F) {
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = fr; bp.Q.value = 6;
      const bg = c.createGain(); bg.gain.value = amp * 2.2;
      sum.connect(bp); bp.connect(bg); bg.connect(g);
    }
    this.out(g, { verb: .9, dry: .6 });
  }
  // funeral bell: inharmonic partials, long decay
  bell(t, nn, gain = .35, pan = 0) {
    const c = this.ctx; const f0 = midi(nn);
    for (const [ratio, amp, dec] of [[.5, .5, 6], [1, 1, 4.5], [1.19, .45, 3], [1.5, .35, 2.6], [2, .4, 2.2], [2.74, .25, 1.6], [3.76, .15, 1.1], [5.4, .08, .7]]) {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f0 * ratio;
      const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain * amp, t + .004); g.gain.setTargetAtTime(0, t + .004, dec / 3);
      o.connect(g); this.out(g, { verb: .7, pan }); o.start(t); o.stop(t + dec * 2.5);
    }
  }
  // soft felt piano
  piano(t, nn, gain = .25, dec = 2.4, pan = 0) {
    const c = this.ctx; const f0 = midi(nn);
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(f0 * 7, t); f.frequency.exponentialRampToValueAtTime(f0 * 1.6, t + dec);
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + .006); g.gain.setTargetAtTime(0, t + .01, dec / 3);
    for (const [h, a, type] of [[1, 1, 'triangle'], [2, .35, 'sine'], [3, .12, 'sine'], [4.01, .06, 'sine']]) {
      const o = c.createOscillator(); o.type = type; o.frequency.value = f0 * h; o.detune.value = h > 1 ? 2 : 0;
      const og = c.createGain(); og.gain.value = a; o.connect(og); og.connect(f); o.start(t); o.stop(t + dec * 2.5);
    }
    f.connect(g); this.out(g, { verb: .55, pan });
  }
  // staccato low strings (ostinato)
  pluck(t, nn, { gain = .2, dec = .18, cutoff = 1800, pan = 0, verb = .2 } = {}) {
    const c = this.ctx;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 3;
    f.frequency.setValueAtTime(cutoff, t); f.frequency.exponentialRampToValueAtTime(200, t + dec * 1.5);
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + .005); g.gain.setTargetAtTime(0, t + .01, dec / 2.5);
    for (const d of [-6, 6]) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = midi(nn); o.detune.value = d; o.connect(f); o.start(t); o.stop(t + dec * 3); }
    f.connect(g); this.out(g, { verb, pan, short: .3 });
  }
  sub(t, dur, nn, gain = .35) {
    const c = this.ctx;
    const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = midi(nn);
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + .03); g.gain.setValueAtTime(gain, t + dur - .1); g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(g); this.out(g, { verb: 0 }); o.start(t); o.stop(t + dur + .1);
  }
  drone(t, dur, nn, gain = .2) {
    const c = this.ctx;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 380; f.Q.value = 4;
    const lfo = c.createOscillator(); lfo.frequency.value = .09; const lg = c.createGain(); lg.gain.value = 160;
    lfo.connect(lg); lg.connect(f.frequency); lfo.start(t); lfo.stop(t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + 2.5); g.gain.setValueAtTime(gain, t + dur - 2); g.gain.linearRampToValueAtTime(0, t + dur);
    for (const [m, d] of [[0, 0], [0, 7], [12, -5], [-12, 3], [7, 2]]) {
      const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = midi(nn + m); o.detune.value = d;
      const og = c.createGain(); og.gain.value = .2; o.connect(og); og.connect(f); o.start(t); o.stop(t + dur);
    }
    f.connect(g); this.out(g, { verb: .7 });
  }
  riser(t, dur, gain = .35) {
    this.noise(t, dur, { type: 'bandpass', f0: 200, f1: 7000, q: 2, gain, a: dur * .95, verb: .5 });
    const c = this.ctx;
    const o = c.createOscillator(); o.type = 'sawtooth';
    o.frequency.setValueAtTime(90, t); o.frequency.exponentialRampToValueAtTime(900, t + dur);
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 2500;
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain * .25, t + dur); g.gain.linearRampToValueAtTime(0, t + dur + .03);
    o.connect(f); f.connect(g); this.out(g, { verb: .4 }); o.start(t); o.stop(t + dur + .1);
  }
  whoosh(t, dur = .7, gain = .3, pan = 0) {
    this.noise(t, dur, { type: 'bandpass', f0: 400, f1: 3500, q: 1.5, gain, a: dur * .5, verb: .3, pan });
  }
  heartbeat(t, gain = .6) {
    this.drum(t, { f0: 70, f1: 38, dec: .35, gain, verb: .15, click: 0 });
    this.drum(t + .22, { f0: 60, f1: 35, dec: .3, gain: gain * .7, verb: .15, click: 0 });
  }
  thunder(t, gain = .6, pan = 0) {
    this.noise(t, .15, { type: 'highpass', f0: 2000, f1: 900, gain: gain * .6, verb: .4, pan });
    this.noise(t + .05, 4.5, { type: 'lowpass', f0: 900, f1: 60, q: .5, gain, a: .05, verb: .8, pan });
    this.noise(t + .3, 3.5, { type: 'lowpass', f0: 250, f1: 40, q: 1, gain: gain * .8, a: .4, verb: .6, pan: -pan });
  }
  rain(t, dur, gain = .12) {
    const c = this.ctx;
    const s = c.createBufferSource(); s.buffer = this.noiseBuf; s.loop = true;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2500; f.Q.value = .4;
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + 1.5); g.gain.setValueAtTime(gain, t + dur - 1.5); g.gain.linearRampToValueAtTime(0, t + dur);
    s.connect(f); f.connect(g); this.out(g, { verb: .2 }); s.start(t); s.stop(t + dur + .1);
  }
  tick(t, gain = .15, f = 2400) {
    const c = this.ctx;
    const o = c.createOscillator(); o.type = 'square'; o.frequency.value = f;
    const g = c.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(.0001, t + .04);
    const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1500;
    o.connect(hp); hp.connect(g); this.out(g, { verb: .1 }); o.start(t); o.stop(t + .05);
  }
  // reversed swell into a hit
  swell(t, dur, gain = .3) {
    const c = this.ctx;
    const s = c.createBufferSource(); s.buffer = this.noiseBuf; s.loop = true;
    const f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.setValueAtTime(6000, t); f.frequency.exponentialRampToValueAtTime(900, t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + dur); g.gain.linearRampToValueAtTime(0, t + dur + .02);
    s.connect(f); f.connect(g); this.out(g, { verb: .5 }); s.start(t); s.stop(t + dur + .1);
  }
  // 8-bit blip for UI moments (death message typing etc.)
  blip(t, nn, gain = .08, dur = .06) {
    const c = this.ctx;
    const o = c.createOscillator(); o.type = 'square'; o.frequency.value = midi(nn);
    const g = c.createGain(); g.gain.setValueAtTime(gain, t); g.gain.setTargetAtTime(0, t + dur * .5, dur / 3);
    o.connect(g); this.out(g, { verb: .15 }); o.start(t); o.stop(t + dur * 2);
  }
  // fireball / explosion "crunch"
  explosion(t, gain = .8) {
    this.noise(t, 1.6, { type: 'lowpass', f0: 5000, f1: 90, q: .6, gain, a: .005, verb: .6 });
    this.drum(t, { f0: 110, f1: 30, dec: 1.2, gain: gain * .9, verb: .4, click: .4 });
  }
  // dragon-ish roar made from scratch: detuned saw growl with FM wobble + a swept noise throat
  roar(t, dur = 1.8, gain = .5) {
    const c = this.ctx;
    const ws = c.createWaveShaper(); ws.curve = this.curve(6);
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2;
    f.frequency.setValueAtTime(420, t); f.frequency.exponentialRampToValueAtTime(900, t + .25); f.frequency.exponentialRampToValueAtTime(160, t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + .12); g.gain.setTargetAtTime(0, t + dur * .55, dur * .2);
    for (const [base, det] of [[62, 0], [64, 9], [93, -7]]) {
      const o = c.createOscillator(); o.type = 'sawtooth';
      o.frequency.setValueAtTime(base * 1.4, t); o.frequency.exponentialRampToValueAtTime(base, t + .3); o.frequency.exponentialRampToValueAtTime(base * .7, t + dur);
      o.detune.value = det;
      const lfo = c.createOscillator(); lfo.frequency.value = 23; const lg = c.createGain(); lg.gain.value = base * .35;
      lfo.connect(lg); lg.connect(o.frequency); lfo.start(t); lfo.stop(t + dur + .1);
      const og = c.createGain(); og.gain.value = .3; o.connect(og); og.connect(ws); o.start(t); o.stop(t + dur + .1);
    }
    ws.connect(f); f.connect(g); this.out(g, { verb: .6 });
    this.noise(t, dur * .8, { type: 'bandpass', f0: 1200, f1: 250, q: 2, gain: gain * .5, a: .08, verb: .6 });
  }
  // fast bowed tremolo (strings) on a chord, cresc with rising filter
  tremolo(t, dur, notes, gain = .12) {
    const c = this.ctx;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 1;
    f.frequency.setValueAtTime(500, t); f.frequency.exponentialRampToValueAtTime(3200, t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + dur); g.gain.linearRampToValueAtTime(0, t + dur + .05);
    const am = c.createGain(); am.gain.value = .5;
    const lfo = c.createOscillator(); lfo.type = 'square'; lfo.frequency.setValueAtTime(9, t); lfo.frequency.linearRampToValueAtTime(16, t + dur);
    const lg = c.createGain(); lg.gain.value = .5; lfo.connect(lg); lg.connect(am.gain); lfo.start(t); lfo.stop(t + dur + .1);
    notes.forEach(nn => { for (const d of [-8, 7]) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = midi(nn); o.detune.value = d; const og = c.createGain(); og.gain.value = .5 / notes.length; o.connect(og); og.connect(am); o.start(t); o.stop(t + dur + .1); } });
    am.connect(f); f.connect(g); this.out(g, { verb: .4 });
  }
  // timpani roll: dense low drum hits, crescendo
  timpRoll(t, dur, gain = .5, f0 = 110) {
    const n = Math.floor(dur / .055);
    for (let i = 0; i < n; i++) { const k = i / n; this.drum(t + i * .055, { f0: f0 * (1 + (i % 2) * .03), f1: f0 * .55, dec: .35, gain: gain * (.2 + .8 * k * k), verb: .35, click: .05 }); }
  }
  crash(t, gain = .35) {
    this.noise(t, 2.8, { type: 'highpass', f0: 6000, f1: 3000, gain, a: .005, verb: .7 });
    this.noise(t, 1.2, { type: 'bandpass', f0: 4000, f1: 2500, q: .8, gain: gain * .6, verb: .5 });
  }
  hurt(t, gain = .3) { // generic flesh-hit thud, not the game's sound
    this.drum(t, { f0: 260, f1: 90, dec: .12, gain, verb: .1, click: .35 });
    this.noise(t, .12, { type: 'bandpass', f0: 900, f1: 400, q: 2, gain: gain * .6, verb: .1 });
  }
}
