// Shared three.js renderer + "ink & wash" NPR pipeline used by the death retellings.
import * as THREE from '../vendor/three.module.js';
import { W, H } from './engine.js';

export { THREE };

export const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(1);
renderer.setSize(W, H, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Plain beauty render straight to the renderer canvas (used by the intro).
export function renderPlain(scene, camera) {
  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
  return renderer.domElement;
}

// ---------------------------------------------------------------- ink pass
const rt = new THREE.WebGLRenderTarget(W, H, {
  samples: 0, type: THREE.UnsignedByteType, colorSpace: THREE.SRGBColorSpace,
  minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
});
rt.depthTexture = new THREE.DepthTexture(W, H);
rt.depthTexture.type = THREE.FloatType;

const inkMat = new THREE.ShaderMaterial({
  uniforms: {
    tColor: { value: rt.texture },
    tDepth: { value: rt.depthTexture },
    res: { value: new THREE.Vector2(W, H) },
    boil: { value: 0 },
    near: { value: .1 }, far: { value: 1000 },
    paper: { value: new THREE.Color('#efe3c8') },
    ink: { value: new THREE.Color('#1b120c') },
    tint: { value: new THREE.Color('#ffffff') },
    lineW: { value: 2.2 },
    hatch: { value: 1 },
    sat: { value: .78 },
    redKeep: { value: 1 },
    skyWash: { value: new THREE.Color('#d9c7a2') },
    skyWash2: { value: new THREE.Color('#efe3c8') },
    invert: { value: 0 },
    flash: { value: 0 },
    washAmt: { value: 1 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }`,
  fragmentShader: /* glsl */`
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D tColor, tDepth;
    uniform vec2 res; uniform float boil, near, far, lineW, hatch, sat, redKeep, invert, flash, washAmt;
    uniform vec3 paper, ink, tint, skyWash, skyWash2;

    float h21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
    float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
      return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*vnoise(p); p*=2.03; a*=.5; } return s; }

    float linZ(float d){ float z=d*2.-1.; return 2.*near*far/(far+near-z*(far-near)); }
    float Z(vec2 uv){ return linZ(texture2D(tDepth, uv).x); }

    vec3 C(vec2 uv){ return pow(texture2D(tColor, uv).rgb, vec3(1./2.2)); }

    // Kuwahara: painterly flattening that keeps edges (turns block textures into washes)
    vec3 kuwa(vec2 uv, vec2 px, float s){
      vec3 m[4]; float v[4];
      for (int q=0;q<4;q++){
        vec2 dir = vec2(q==0||q==2 ? -1. : 1., q<2 ? -1. : 1.);
        vec3 sum=vec3(0.), sq=vec3(0.);
        for (int j=0;j<4;j++) for (int i=0;i<4;i++){
          vec3 c = C(uv + dir*vec2(float(i),float(j))*px*s);
          sum+=c; sq+=c*c;
        }
        sum/=16.; sq/=16.;
        vec3 var = abs(sq - sum*sum);
        m[q]=sum; v[q]=var.r+var.g+var.b;
      }
      vec3 best=m[0]; float bv=v[0];
      for (int q=1;q<4;q++){ if (v[q]<bv){ bv=v[q]; best=m[q]; } }
      return best;
    }

    float edgeAt(vec2 uv, vec2 px, float lw){
      vec2 o = px*lw;
      float z0 = Z(uv);
      float zl=Z(uv-vec2(o.x,0.)), zr=Z(uv+vec2(o.x,0.)), zd=Z(uv-vec2(0.,o.y)), zu=Z(uv+vec2(0.,o.y));
      float zlu=Z(uv+vec2(-o.x,o.y)), zrd=Z(uv+vec2(o.x,-o.y)), zru=Z(uv+o), zld=Z(uv-o);
      float gx = (zr+.5*zru+.5*zrd)-(zl+.5*zlu+.5*zld);
      float gy = (zu+.5*zlu+.5*zru)-(zd+.5*zld+.5*zrd);
      float g = sqrt(gx*gx+gy*gy)/max(z0,.001);
      float lap = abs(zl+zr+zu+zd-4.*z0)/max(z0,.001);
      float e = smoothstep(.02,.06,g);
      e = max(e, smoothstep(.0025,.008,lap));
      vec3 cl=C(uv-vec2(o.x,0.)), cr=C(uv+vec2(o.x,0.)), cd=C(uv-vec2(0.,o.y)), cu=C(uv+vec2(0.,o.y));
      float ce = length(cr-cl)+length(cu-cd);
      e = max(e, smoothstep(.5,.9,ce)*.45);
      return e;
    }

    void main(){
      vec2 px = 1./res;
      vec2 bo = vec2(boil*1.37, boil*2.71);
      // hand-drawn wobble: the whole drawing re-rolls a few times a second
      vec2 wob = (vec2(vnoise(vUv*7.+bo), vnoise(vUv*7.+bo+17.3))-.5) * px * 7.;
      vec2 uv = vUv + wob;
      bool sky = texture2D(tDepth, uv).x > .99999;

      // ---- ink: main line + a lighter offset "sketch" line
      float lw = lineW * (.7 + .7*vnoise(vUv*30.+bo));
      float e1 = edgeAt(uv, px, lw);
      vec2 wob2 = (vec2(vnoise(vUv*5.+bo+3.1), vnoise(vUv*5.+bo+9.7))-.5) * px * 9.;
      float e2 = edgeAt(vUv + wob2, px, lw*.7) * .45;
      float dry = smoothstep(.1,.5, vnoise(vUv*vec2(140.,80.)+bo*3.)+.3);
      float edge = max(e1*dry, e2);

      // ---- colour: painterly flatten, lift into a light wash on paper
      vec3 c0 = C(vUv + wob*.4);
      vec3 c = kuwa(vUv + wob*.4, px, 1.6);
      float l0 = dot(c0, vec3(.299,.587,.114));
      float l = dot(c, vec3(.299,.587,.114));
      bool hot = c.r > .5 && c.r > c.g*1.4 && c.r > c.b*1.8;
      vec3 hue = c / max(l, .04);
      float lift = pow(l, .55);
      float bands = floor(lift*5.+.4)/5.;
      lift = mix(lift, bands, .5);
      vec3 washC = mix(vec3(lift), clamp(hue*lift, 0., 1.4), sat);
      float pool = fbm(vUv*vec2(5.,3.)+bo*.03);
      washC *= .88 + .24*pool;
      vec3 col = paper * mix(vec3(1.), washC, washAmt);
      if (hot) col = mix(col, vec3(.8,.12,.05)*(.8+.4*l), .6*redKeep);

      // ---- hatching in shadows (driven by true darkness)
      vec2 sp = gl_FragCoord.xy + wob*res*.5;
      float hn = vnoise(sp*.015+bo)*7.;
      float h1 = abs(fract((sp.x*.8+sp.y+hn)/8.)-.5);
      float h2 = abs(fract((sp.x-sp.y*.8+hn)/8.)-.5);
      float h3 = abs(fract((sp.y+hn*.5)/6.)-.5);
      float dark = 1.-l;
      float ha = 0.;
      ha = max(ha, smoothstep(.55,.65,dark) * smoothstep(.17,.06,h1));
      ha = max(ha, smoothstep(.72,.8,dark) * smoothstep(.17,.06,h2));
      ha = max(ha, smoothstep(.86,.92,dark) * smoothstep(.2,.08,h3));
      ha *= hatch * (.55+.45*vnoise(sp*.04+bo));
      if (hot) ha *= .2;
      col = mix(col, ink, ha*.75);

      if (sky) {
        float gy2 = vUv.y + (fbm(vUv*3.+bo*.02)-.5)*.15;
        col = mix(skyWash, skyWash2, smoothstep(.1,.9,gy2)) * (.93+.1*fbm(vUv*vec2(8.,5.)));
      }
      col *= tint;
      col = mix(col, ink, clamp(edge,0.,1.));

      // paper fibre + grain + stains
      float fib = fbm(gl_FragCoord.xy*vec2(.35,.02)) * .07 + fbm(gl_FragCoord.xy*.8)*.06;
      col *= 1. - fib + .035;
      float stain = smoothstep(.62,.8, fbm(vUv*vec2(2.3,1.6)+11.));
      col *= 1. - stain*.12;
      // burnt page edges
      vec2 q = vUv-.5; float r = length(q*vec2(1.,.8));
      float burn = smoothstep(.42,.75, r + (fbm(vUv*5.)-.5)*.18);
      col = mix(col, col*vec3(.55,.38,.24), burn*.85);
      if (invert > .5) { float k = dot(col, vec3(.3,.59,.11)); col = vec3(1.)-vec3(step(.5,k)*.9); col = mix(col, vec3(.85,.05,.03), step(.5, 1.-k)*.0); }
      col = mix(col, vec3(1.), flash);
      gl_FragColor = vec4(col,1.);
    }`,
  depthTest: false, depthWrite: false,
});
const quadScene = new THREE.Scene();
const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
quadScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), inkMat));

export function renderInk(scene, camera, t, opts = {}) {
  const u = inkMat.uniforms;
  u.boil.value = Math.floor(t * 8);
  u.near.value = camera.near; u.far.value = camera.far;
  const raw = (k, v) => u[k].value.setStyle(v, THREE.LinearSRGBColorSpace);
  raw('tint', opts.tint || '#ffffff');
  raw('skyWash', opts.skyA || '#cdb892');
  raw('skyWash2', opts.skyB || '#efe3c8');
  raw('paper', opts.paper || '#efe3c8');
  raw('ink', opts.ink || '#1b120c');
  u.lineW.value = opts.lineW ?? 2.2;
  u.hatch.value = opts.hatch ?? 1;
  u.sat.value = opts.sat ?? .78;
  u.invert.value = opts.invert ? 1 : 0;
  u.flash.value = opts.flash || 0;
  u.washAmt.value = opts.washAmt ?? 1;
  renderer.setRenderTarget(rt);
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  renderer.render(quadScene, quadCam);
  return renderer.domElement;
}
