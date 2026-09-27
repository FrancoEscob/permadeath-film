// #23 Mikecrack — día 35, 29/04/2020 22:49. Verified: wiki (Ender Ghast, tótem consumido) + clip
// (GersoonSG 13:27–15:02): End outer islands, elytra + rockets, enchanted bow against white ghasts,
// totem in the offhand; he lands on an island among endermen, a big fireball comes in from the
// top-left, explosion + totem pop, he pours water, looks over the edge (a purple ring sprite
// nearby) and dies ~2.7 s later: "was blown up by Ender Ghast" (the last hit isn't visible).
import { THREE } from '../gl.js';
import { World } from '../voxel.js';
import * as M from '../mobs.js';
import { player, hold, face, cam, pose, clamp, lerp, ease, totemPop, ring, waterBucket, hurt, fireBits, PX } from './common.js';
import { safeWander, isle, edgeX, chorus, wander, walkOn, ender, rocket, sparkTrail, animTrail, flameTrail, groundFoot, noteBlock } from './lib_end_d23_27.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
// timeline (sim seconds): A flight 0–TA · B bow TA–TB · landing TB–TL · fireball TF–TX · totem TT · water TD/TW · edge TE · death I
const TA = 1.9, TB = 3.0, TL = 3.26, TF = 3.3, TX = 3.6, TT = 3.62, TD = 3.95, TW = 4.02, TE = 4.35, TG = 4.4, I = 5.6;
const SLOW = [{ t: 3.3, d: 1.0, f: .4 }, { t: 5.0, d: .6, f: .38 }];

export default {
  n: 23, player: 'mikecrack', name: 'Mikecrack', ign: 'Mikecrack', day: 35, date: '29/04/2020 · 22:49',
  sfx: 'explosion', impact: I, dur: 7.2, slow: SLOW,
  chat: [
    ['Mikecrack ha consumido un tótem. (Probabilidad: 56 != 99)', '#ffff55'],
    ['Este es el comienzo del sufrimiento eterno de Mikecrack. ¡HA SIDO PERMABANEADO!', '#ff5555'],
    ['MikecrackYT, El diamantito le sirvió de poco', '#aaaaaa'],
    ['[MIEMBRO] Mikecrack was blown up by Ender Ghast', '#ffffff'],
  ],
  build(assets) {
    const w = new World(110, 60, 110, [-55, -25, -55]);
    // L = the island he lands on (flat top y=0); B = big chorus island crowded with endermen; outer islets
    isle(w, { cx: 1, cz: 0, r: 8, top: 0, depth: 7, seed: 3 });
    isle(w, { cx: -9, cz: -17, r: 8, top: 3, depth: 9, seed: 7, terr: 1 });
    isle(w, { cx: 20, cz: -24, r: 6, top: -5, depth: 6, seed: 9 });
    isle(w, { cx: -12, cz: 20, r: 5, top: 9, depth: 5, seed: 11 });
    for (const [x, y, z, r, s] of [[14, 6, 13, 2.5, 2], [28, 3, -4, 3, 4], [-28, 5, 2, 3, 5], [8, 19, -42, 2.5, 6], [-30, -3, -30, 3.5, 8], [-22, 14, -38, 2, 12]]) isle(w, { cx: x, cz: z, r, top: y, depth: 3, seed: s });
    const g0 = (x, z) => { for (let y = 30; y > -25; y--) if (w.get(x, y, z)) return y + 1; return null; };
    let seed = 1;
    for (const [x, z, h] of [[-9, -17, 6], [-5, -21, 5], [-13, -13, 5], [-12, -21, 4], [-4, -14, 4], [-8, -11, 3], [19, -24, 5], [21, -21, 3], [-12, 20, 4]]) { const y = g0(x, z); if (y != null) chorus(w, x, y, z, h, seed++); }
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0a0610');
    scene.add(w.build());
    scene.add(new THREE.HemisphereLight('#d8c8f0', '#2a2030', 1.25));
    const dl = new THREE.DirectionalLight('#fff4e6', .6); dl.position.set(4, 12, 6); scene.add(dl);

    // player inside a flight rig: rig = body centre, yaw/pitch/bank; p is laid prone inside it
    const rig = new THREE.Group(); rig.rotation.order = 'YXZ'; scene.add(rig);
    const p = player(assets, 'mikecrack'); rig.add(p);
    const ely = M.elytra(); ely.position.set(0, 23, -2.5); p.add(ely);
    const rk = hold(p, rocket(), { rx: -1.3 });
    const bowG = hold(p, M.bow(), { rx: -1.5 });
    const totG = hold(p, M.totem(), { rx: -1.2, left: true }); totG.scale.setScalar(.8);
    const bucket = hold(p, waterBucket(), { rx: -1.2 });
    const trail = sparkTrail(44); scene.add(trail);

    // endermen: wandering on L and on B, one looming right beside the landing spot
    const onL = [[-2, -2, 2.2, 1.5, .45, 0], [-3, 3, 1.6, 1.2, .5, 2], [2, -4, 2, 1, .4, 4], [-1, 5.5, 1.8, .8, .55, 1]].map(([cx, cz, rx, rz, sp, ph]) => ({ e: ender(), f: safeWander(w, cx, cz, rx, rz, sp, ph) }));
    const onB = [[-9, -15, 3, 2, .4, 0], [-6, -19, 2, 2.5, .5, 1], [-12, -18, 2, 2, .45, 3], [-10, -21, 2.5, 1.2, .5, 5], [-7, -13, 1.5, 1.5, .6, 2], [-13, -14, 1.8, 1.5, .4, 6]].map(([cx, cz, rx, rz, sp, ph]) => ({ e: ender(), f: safeWander(w, cx, cz, rx, rz, sp, ph) }));
    const loom = ender();
    [...onL, ...onB].forEach(o => scene.add(o.e)); scene.add(loom);

    // ghasts: A = bow target (flashes red when hit), B = fires the big fireball from his top-left
    const ghastA = M.ghast(); ghastA.scale.multiplyScalar(PX * 2.4); ghastA.position.set(10, 7, -2.5); scene.add(ghastA);
    const ghastB = M.ghast(); ghastB.scale.multiplyScalar(PX * 2.4); ghastB.position.set(13, 10.5, -10); scene.add(ghastB);
    const ghastC = M.ghast(); ghastC.scale.multiplyScalar(PX * 2.2); ghastC.position.set(-22, 16, -12); scene.add(ghastC);
    const arrow = M.arrow(); arrow.scale.setScalar(PX * 2.4); scene.add(arrow);
    const crit = sparkTrail(14); scene.add(crit);
    const small = M.fireball(5); small.scale.multiplyScalar(PX); scene.add(small);
    const ball = M.fireball(13); ball.scale.multiplyScalar(PX); scene.add(ball);
    const flame = flameTrail(18); scene.add(flame);
    const HIT = V(5.2, .5, -.8); // where the big fireball explodes (ground in front-left of him)
    const boom = M.puffs(26); boom.position.copy(HIT); scene.add(boom);
    const flash = M.burst(); flash.position.copy(HIT); scene.add(flash);
    const fires = [[5, -1], [6, -.2], [4.5, -.4], [5.8, -1.6]].map(([x, z]) => { const f = fireBits(4, .5); f.position.set(x, 0, z); scene.add(f); return f; });
    const boom2 = M.puffs(24); scene.add(boom2);
    const flash2 = M.burst(); scene.add(flash2);
    const rng = ring(); scene.add(rng);
    const water = new THREE.Mesh(new THREE.BoxGeometry(1, .8, 1), new THREE.MeshLambertMaterial({ color: '#3f6fd8', transparent: true, opacity: .75 })); scene.add(water);
    const pop = totemPop(scene);
    const camera = new THREE.PerspectiveCamera(55, 16 / 9, .05, 250);

    // flight: shot A banks left around island B with rocket boost; shot B glides east, bow drawn at ghast A
    const curveA = new THREE.CatmullRomCurve3([V(16, 12, -33), V(2, 12.5, -32), V(-10, 12, -30), V(-21, 11, -24), V(-24, 10, -11), V(-18, 9, -2)], false, 'centripetal');
    const curveB = new THREE.CatmullRomCurve3([V(-16, 6.5, 2.4), V(-9, 5.5, 1.8), V(-3, 4, 1.2)], false, 'centripetal');
    const LAND = V(3.2, 0, 1);
    const EDGE = edgeX(w, LAND.x, LAND.z) - .6; // walk to the rim, look over it
    const body = lt => { // body centre while airborne
      if (lt < TA) return curveA.getPoint(clamp(lt / TA) * .96);
      if (lt < TB) return curveB.getPoint(clamp((lt - TA) / (TB - TA)));
      const k = clamp((lt - TB) / (TL - TB));
      return V(lerp(-3, LAND.x, ease.out(k)), lerp(4, 1, k * k), lerp(1.2, LAND.z, k));
    };
    const feetX = lt => lerp(LAND.x, EDGE, ease.inOut(clamp((lt - TG) / .4)));
    const heading = lt => { const a = body(lt - .02), b = body(lt + .02); return Math.atan2(b.x - a.x, b.z - a.z); };
    const unwrap = a => Math.atan2(Math.sin(a), Math.cos(a));
    const at3 = (o, y = 0) => () => o.position.clone().add(V(0, y, 0));

    return {
      scene, ink: { skyA: '#140a1e', skyB: '#3a2452', tint: '#f2ecff', lineW: 2.3 },
      cues: [{ t: .1, type: 'sfx', kind: 'whoosh', dur: 1.4, gain: .35 }, { t: 2.0, type: 'sfx', kind: 'shoot', gain: .5 }, { t: 2.3, type: 'sfx', kind: 'bow' }, { t: TF, type: 'sfx', kind: 'shoot' }, { t: TX, type: 'sfx', kind: 'explosion', gain: .6 }, { t: TT, type: 'sfx', kind: 'totem' }, { t: TW + .05, type: 'sfx', kind: 'splash' }],
      hearts: lt => lt < TT ? { v: 10 } : { v: lerp(1, 3.5, clamp((lt - TT - .2) / 1.4)), blink: lt < TT + .2 },
      notes: [
        ...noteBlock(.1, 2.3, ['vuela con elytra y cohetes'], 1180, 250, { to: at3(rig, .2), bend: -60 }),
        ...noteBlock(2.05, 3.6, ['arco contra los ghasts'], 1260, 520, { to: at3(ghastA, -.2), bend: 50, slow: SLOW }),
        ...noteBlock(3.3, 4.1, ['bola de fuego enorme'], 1230, 240, { to: at3(ball), bend: -50, slow: SLOW }),
        ...noteBlock(3.62, 4.62, ['explota: salta el tótem'], 1240, 620, { slow: SLOW }),
        ...noteBlock(4.4, 5.6, ['un anillo morado flota abajo'], 1150, 250, { circle: () => rng.position.clone(), r: 70, slow: SLOW }),
      ],
      update(lt, T) {
        const airborne = lt < TL;
        // ---- rig: position, heading, climb pitch, bank into the turns
        let pos, yaw, pitch = 0, bank = 0, prone;
        if (airborne) {
          pos = body(lt);
          yaw = heading(Math.min(lt, TL - .06));
          const a = body(lt - .03), b = body(lt + .03);
          pitch = clamp(-Math.atan2(b.y - a.y, Math.hypot(b.x - a.x, b.z - a.z)), -.5, .5);
          if (lt < TB) bank = clamp(-unwrap(heading(lt + .08) - heading(lt - .08)) * 4.5, -1, 1);
          prone = lt < TB ? Math.PI / 2 : lerp(Math.PI / 2, 0, ease.inOut(clamp((lt - TB) / .24)));
          if (lt > TB) pitch *= 1 - clamp((lt - TB) / .2);
        } else {
          const x = feetX(lt);
          pos = V(x, groundFoot(w, x, LAND.z) + 1, LAND.z);
          yaw = Math.PI / 2; prone = 0;
        }
        rig.position.copy(pos); rig.rotation.set(pitch, yaw, bank);
        p.rotation.x = prone; p.position.set(0, -Math.cos(prone), -Math.sin(prone));
        const flying = lt < TB + .05;
        // wings: spread in a flat V while gliding, folded on the back when standing
        const spread = flying ? .62 + Math.sin(T * 7) * .03 : lerp(.62, -.1, clamp((lt - TB - .05) / .2));
        ely.userData.L.rotation.set(flying ? .35 : .1, 0, spread); ely.userData.R.rotation.set(flying ? .35 : .1, 0, -spread);
        // ---- body pose
        const aiming = lt > TA && lt < TB - .05;
        const walkE = lt > TG && lt < TG + .4;
        pose(p, { idle: T * 2, walk: walkE ? T * 9 : 0, swing: walkE ? .5 : 0, armRaise: aiming ? Math.PI - .15 : flying ? 0 : lt > TD && lt < TG ? .9 : .35, headPitch: flying ? -1.1 : lt > TG + .3 ? .85 : 0 });
        const u = p.userData;
        if (flying) { u.legR.rotation.x = 0; u.legL.rotation.x = 0; u.armR.rotation.z = aiming ? -.08 : -.14; u.armL.rotation.z = .14; }
        if (aiming) { u.armL.rotation.x = -Math.PI + .35; u.armL.rotation.z = -.25; }
        rk.visible = lt < TA || lt > TG; bowG.visible = lt >= TA && lt < TD; bucket.visible = lt >= TD && lt <= TG; totG.visible = lt < TT;
        // ---- firework spark trail while boosting
        const boostK = clamp(lt / .12) * (1 - clamp((lt - (TA - .35)) / .25));
        const fwd = V(Math.sin(yaw), 0, Math.cos(yaw));
        animTrail(trail, k => body(Math.max(0, lt - k * .2)).addScaledVector(fwd, -1.25), boostK * 1.6, T);
        // ---- endermen walk; one looms beside the landing spot
        onL.forEach((o, i) => walkOn(o.e, w, o.f, T * .9 + i, {}));
        onB.forEach((o, i) => walkOn(o.e, w, o.f, T * .9 + i * 1.7, {}));
        loom.position.set(4.3, groundFoot(w, 4.3, -2.1), -2.1); face(loom, 3.2, 1); pose(loom, { idle: T, headYaw: Math.sin(T * .7) * .3 });
        const hk = lt > TX && lt < TX + .25 ? .55 : 0;
        [loom, onL[0].e, onL[2].e].forEach(e => hurt(e, hk));
        // ---- ghasts drift, open their mouths when firing
        [ghastA, ghastB, ghastC].forEach((g, i) => { g.userData.tent.forEach((t, k) => t.rotation.x = Math.sin(T * 2.5 + k + i) * .25); g.position.y += Math.sin(T * 1.2 + i) * .003; face(g, rig.position.x, rig.position.z); });
        ghastA.userData.faceOpen(lt > 1.95 && lt < 2.22);
        ghastB.userData.faceOpen(lt > TF - .12 && lt < TF + .25);
        hurt(ghastA, lt > 2.55 && lt < 2.8 ? .7 : 0);
        // small fireball from ghast A flies past him (misses); his arrow hits ghast A
        const sk = clamp((lt - 2.02) / .6);
        small.visible = lt > 2.02 && lt < 2.62;
        small.position.lerpVectors(ghastA.position, V(-14, 7.5, 3.8), sk);
        const at = clamp((lt - 2.3) / .25);
        arrow.visible = lt > 2.3 && lt < 2.55;
        const from = body(2.3).add(V(0, .2, 0));
        arrow.position.lerpVectors(from, ghastA.position, at); arrow.lookAt(ghastA.position);
        animTrail(crit, k => V().lerpVectors(from, ghastA.position, Math.max(0, at - k * .3)), arrow.visible ? 1 : 0, T);
        // big fireball from ghast B (top-left of his view) -> explosion + totem
        const ft = clamp((lt - TF) / (TX - TF));
        ball.visible = lt > TF && lt < TX; ball.rotation.set(T * 3, T * 4, 0);
        ball.position.lerpVectors(ghastB.position, HIT, ft);
        animTrail(flame, k => V().lerpVectors(ghastB.position, HIT, Math.max(0, ft - k * .22)), ball.visible ? 1.8 : 0, T);
        M.animPuffs(boom, lt - TX, { radius: 2.2, size: .55 });
        M.animBurst(flash, lt - TX, 3.2);
        fires.forEach((f, i) => { f.visible = lt > TX + .02 && lt < TW + .15 + i * .06; f.userData.anim(T); });
        // he pours water on the burning ground
        const wk = clamp((lt - TW) / .25);
        water.visible = lt > TW && lt < I;
        water.scale.set(lerp(.6, 2.2, wk), lerp(.3, .1, wk), lerp(.6, 2.2, wk)); water.position.set(5.1, .06, -.6);
        // purple ring sprite in the void below the rim
        const rk2 = clamp((lt - (TG + .2)) / 1);
        rng.visible = lt > TG + .2 && lt < I;
        rng.position.set(EDGE + 2.6 + rk2 * .5, -1 + rk2 * .4, LAND.z + 1.6 - rk2 * .3); rng.scale.setScalar(lerp(1.4, 2.6, rk2)); rng.lookAt(camera.position);
        // death: blown up where he stands
        boom2.position.set(rig.position.x, 1, rig.position.z); flash2.position.copy(boom2.position);
        M.animPuffs(boom2, lt - I, { radius: 2.2, size: .55 });
        M.animBurst(flash2, lt - I, 3);
        rig.visible = lt < I;
        // ---- camera
        let c;
        const px = rig.position.x, py = rig.position.y, pz = rig.position.z;
        if (lt < TA) { // chase cam behind and above (wings seen from above), rolling with his bank
          const back = fwd.clone().multiplyScalar(-2.5), side = V(Math.cos(yaw), 0, -Math.sin(yaw));
          c = cam(camera, [px + back.x + side.x * 2.3, py + 2.5, pz + back.z + side.z * 2.3], [px + fwd.x * 1.2, py - .3, pz + fwd.z * 1.2], 58, -bank * .25);
        } else if (lt < TB) { // over his shoulder: bow drawn at the white ghast
          c = cam(camera, [px - 3.6, py + 1.3, pz + 2.2], [lerp(px + 4, ghastA.position.x, .6), lerp(py, ghastA.position.y, .6), lerp(pz, ghastA.position.z, .6)], 56);
        } else if (lt < TD) { // landed among endermen; the fireball comes from the top-left (3/4 view in slow motion)
          const k = ease.inOut(clamp((lt - TB) / (TL - TB + .1)));
          c = cam(camera, [LAND.x - 3.4, 2.2, LAND.z + 2.4], [lerp(px, LAND.x + 5, k), lerp(py, 3.4, k), lerp(pz, LAND.z - 2.6, k)], 64);
        } else if (lt < TE) { // pouring water on the fire
          c = cam(camera, [LAND.x + 3.6, 2.3, LAND.z + 2.8], [LAND.x + 2.4, .6, LAND.z - 1.4], 58);
        } else if (lt < I) { // looking over the rim into the void
          c = cam(camera, [px - 1.6, 3.3, pz + 3.1], [px + 3.6, -1.6, pz - 1.1], 60);
        } else { const k = ease.out(clamp((lt - I) / 1.6)); c = cam(camera, [lerp(px - 3, px - 7, k), lerp(3, 8, k), lerp(pz + 4, pz + 9, k)], [px, 0, pz], 52); }
        pop(camera, lt - TT);
        return c;
      },
    };
  },
};
