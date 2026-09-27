// Final compositing pass: grain, vignette, chromatic aberration, shake, flashes,
// glitch slices, letterbox and burn/dissolve transitions between two layers.
import { THREE, renderer } from './gl.js';
import { W, H } from './engine.js';

function canvasTex(c) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter; t.generateMipmaps = false;
  return t;
}

export function makePost(canvasA, canvasB) {
  const tA = canvasTex(canvasA), tB = canvasTex(canvasB);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      tA: { value: tA }, tB: { value: tB }, res: { value: new THREE.Vector2(W, H) },
      time: { value: 0 }, frame: { value: 0 },
      ca: { value: .0 }, grain: { value: .06 }, vig: { value: .35 },
      flash: { value: 0 }, flashCol: { value: new THREE.Vector3(1, 1, 1) },
      shake: { value: new THREE.Vector2() }, zoom: { value: 1 },
      glitch: { value: 0 }, letterbox: { value: 0 },
      trans: { value: 0 }, transMode: { value: 0 }, useB: { value: 0 },
      mono: { value: 0 }, redShift: { value: 0 }, bright: { value: 1 },
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }`,
    fragmentShader: /* glsl */`
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D tA, tB; uniform vec2 res, shake;
      uniform float time, frame, ca, grain, vig, flash, zoom, glitch, letterbox, trans, transMode, useB, mono, redShift, bright;
      uniform vec3 flashCol;
      float h21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
      float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
        return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
      float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*vn(p); p*=2.; a*=.5; } return s; }
      vec3 samp(sampler2D t, vec2 uv){
        vec2 d = (uv-.5);
        float k = ca * (.4 + dot(d,d)*2.);
        return vec3(texture2D(t, uv - d*k).r, texture2D(t, uv).g, texture2D(t, uv + d*k).b);
      }
      void main(){
        vec2 uv = (vUv-.5)/zoom+.5 + shake;
        if (glitch > 0.) {
          float row = floor(vUv.y*28. + floor(frame*.5)*3.7);
          float g = step(1.-glitch*.6, h21(vec2(row, floor(frame))));
          uv.x += g * (h21(vec2(row, frame))-.5) * .12 * glitch;
        }
        vec3 a = samp(tA, uv);
        vec3 col = a;
        if (useB > .5) {
          vec3 b = samp(tB, uv);
          if (transMode < .5) { col = mix(a, b, trans); }
          else if (transMode < 1.5) {
            // burn: A burns away revealing B with glowing embers at the edge
            float n = fbm(vUv*vec2(5.,3.)) * .8 + fbm(vUv*23.)*.2;
            float p = trans*1.25 - .12;
            float e = smoothstep(p-.02, p+.02, n);
            float rim = smoothstep(.07,.0, abs(n-p));
            col = mix(b, a, e);
            col = mix(col, vec3(0.), smoothstep(.12,.0,abs(n-p-.03))*.7*e);
            col += rim * vec3(1.,.45,.1) * 1.4;
          } else if (transMode < 2.5) {
            // ink bleed: B spreads like ink in water
            float n = fbm(vUv*vec2(4.,2.5)+vec2(0.,trans*.3));
            float p = trans*1.2;
            float e = smoothstep(p-.03, p+.03, n + (1.-length(vUv-.5)*1.1)*.0);
            col = mix(b, a, e);
            col = mix(col, vec3(.05,.02,.02), smoothstep(.04,.0,abs(n-p))*.9);
          } else {
            // hard slice wipe
            float s = step(vUv.x + (h21(vec2(floor(vUv.y*14.),3.))-.5)*.15, trans*1.3-.15);
            col = mix(a, b, s);
          }
        }
        if (mono > 0.) { float l = dot(col, vec3(.299,.587,.114)); col = mix(col, vec3(l), mono); }
        if (redShift > 0.) { float l = dot(col, vec3(.299,.587,.114)); col = mix(col, vec3(l*1.2, l*.25, l*.2), redShift); }
        col *= bright;
        // vignette
        vec2 q = vUv-.5; col *= 1. - vig*smoothstep(.25,.95,length(q*vec2(1.2,1.)));
        // grain
        float gr = h21(vUv*res + fract(frame*.618)*vec2(113.,71.)) - .5;
        col += gr * grain;
        col = mix(col, flashCol, clamp(flash,0.,1.));
        // letterbox
        float lb = letterbox*.5;
        if (vUv.y < lb || vUv.y > 1.-lb) col = vec3(0.);
        gl_FragColor = vec4(clamp(col,0.,1.),1.);
      }`,
    depthTest: false, depthWrite: false,
  });
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
  const defaults = { ca: .0015, grain: .032, vig: .38, flash: 0, flashCol: [1, 1, 1], shake: [0, 0], zoom: 1, glitch: 0, letterbox: 0, trans: 0, transMode: 0, useB: 0, mono: 0, redShift: 0, bright: 1 };
  return {
    render(frame, fx = {}, hasB = false) {
      const p = { ...defaults, ...fx };
      const u = mat.uniforms;
      tA.needsUpdate = true;
      if (hasB) tB.needsUpdate = true;
      u.frame.value = frame; u.time.value = frame / 30;
      u.ca.value = p.ca; u.grain.value = p.grain * .55; u.vig.value = p.vig;
      u.flash.value = p.flash; u.flashCol.value.set(...p.flashCol);
      u.shake.value.set(p.shake[0], p.shake[1]); u.zoom.value = p.zoom;
      u.glitch.value = p.glitch; u.letterbox.value = p.letterbox;
      u.trans.value = p.trans; u.transMode.value = p.transMode; u.useB.value = hasB ? 1 : 0;
      u.mono.value = p.mono; u.redShift.value = p.redShift; u.bright.value = p.bright;
      renderer.setRenderTarget(null);
      renderer.render(scene, cam);
      return renderer.domElement;
    },
  };
}
