# Guide for agents working on the death retellings (second pass)

The film is `index.html` + ES modules in `src/`. Every frame is a pure function of time. Each death is one file,
`src/deaths/dNN_<player>.js`, exporting a spec that `src/vignette.js` wraps (ink shader, "¡Permadeath!" title, chat,
day ribbon, totem overlay, notes, tags). **Read 2–3 existing death files first** (e.g. `d19_folagor.js`,
`d23_mikecrack.js`, `d38_luh.js`) — copy their structure.

## Hard rules
1. **Facts.** Only depict what the footage/sources show. The per-death beat sheets with timestamps are in
   `research/parts/{00_alvaro,A,B,C,D,E,Z_omnirich}.md`. Look at real frames yourself before redrawing a scene:
   `python3 tools/vframes.py /tmp/verify/<name>.jpg research/clips/gersoon_all_v480.mp4 label:SECONDS label:SECONDS ...`
   (paths relative to `/home/franescob/Gaming`; the compilation timestamps in the notes are m:ss → convert to seconds).
   Do **not** change `chat`, `date`, `day`, `name`, `ign`, `n`, `sfx` fields or add events/mobs that aren't in the notes.
   Generic game behaviour is fine (a creeper flashes & swells before exploding, a blaze shoots small fireballs,
   endermen walk, a ghast opens its mouth when it fires).
2. **Files.** Only edit the death files assigned to you. Do NOT edit `common.js`, `mobs.js`, `voxel.js`, `vignette.js`,
   `gl.js`, `timeline.js`, `main.js` (shared; others are working in parallel). If you need a new helper or mob,
   write it inside your own file (or `src/deaths/lib_<yourname>.js`).
3. **Timing.** Keep each scene's `impact` (moment of death) and roughly its `dur` (±0.8 s is OK). The vignette adds
   1 s of hold after `dur` automatically. After `impact` the player must be invisible (dead) and the camera does a
   slow "spectator" drift over the spot.

## Coordinates & units
- 1 unit = 1 block. Player models are built in skin pixels and scaled by `PX = 1/16` (a player is 2 blocks tall,
  feet at y = 0 of its group). Mobs from `mobs.js` are also in pixels: always `m.scale.multiplyScalar(PX)`.
- `World(sx, sy, sz, [ox, oy, oz])` voxel grid; `w.set(x,y,z,'name')`, `w.fill(x0,y0,z0,x1,y1,z1,'name'|0)`,
  `w.get(x,y,z)`, `w.build()` → mesh. A block at integer (x,y,z) occupies [x,x+1]×[y,y+1]×[z,z+1]; standing on
  top of it means feet at y+1. Block names: stone cobble dirt grass netherrack nether_bricks lava obsidian soul_sand
  basalt blackstone glowstone gravel sand planks log leaves water end_stone bedrock deepslate magma crimson warped snow
  iron gold diamond glass crying_obsidian quartz tnt mossy sculk bricks purpur ice packed_ice stone_bricks end_bricks
  portal white_tile hay farmland prismarine.
- **Ground contact (the #1 complaint): never hand-type y for actors on terrain.** Use
  `stand(obj, world, x, z)` or `obj.position.y = groundAt(world, x, z)` every frame (keep the `world` object from
  your builder). Liquids are skipped by default. Check mobs too (spiders, slimes, creepers, endermen).
  Don't let anything walk through walls — check your path against the blocks you placed.

## Useful helpers
`src/deaths/common.js`: `player(assets,id)`, `hold(p,item,{rx,ry,rz,left})`, `pose(p,{walk,swing,headYaw,headPitch,armRaise,idle})`,
`face(obj,x,z)` (turn to look at x,z), `cam(camera,[pos],[target],fov,roll)` (returns camera — `update()` must return it),
`fall`, `hop(t,period,height)` (jump arc), `hurt(model,k)` (red damage tint), `armor(p,'diamond'|'iron'|'netherite'|'gold'|'purple')`,
`totemPop(scene)` → `pop(camera, lt - tTotem, atVector3?)` call EVERY frame (it also triggers the 2D in-game totem overlay),
`creeperFuse(cr, lt, fuseStart, fuseEnd)` (white flashing + swelling; call every frame), `walkCreeper(cr,T,moving)`,
`groundAt`, `stand`, `ghostify(mob,{t,eyes})` (invisible mob = white outline only), `glowOutline(mob)` (Glowing effect),
`fireBits`, `sign([...lines])`, `endIsland(w,{r,cx,cz,top,depth,seed})`, `rails(len)`, `cobweb()`, `spawnerCage()`,
`torch()`, `pearl()`, `waterBucket()`, `toast(ctx,title,sub)`, `bossBar(ctx,name,frac)`.
`src/mobs.js`: `creeper() spider({cave}) skeleton({wither,stray}) zombie() enderman() piglin({zombified}) blaze()
ghast() (userData.faceOpen(bool), .tent) slime({magma,size}) shulker() (userData.open(0..1)) silverfish() phantom() vex()
chicken() cat() quantumCreeper() (userData.shimmer(T)) elytra() sword(kind) shield() bow() arrow() fireball(size) totem()
puffs()/animPuffs(g, dt, {radius,size}) (explosion smoke) burst()/animBurst(m, dt, r) (flash) particlesCube()/animParticles()`.
Spider legs: `s.userData.legs[i].rotation.x` for scuttling. Creeper legs: `walkCreeper`.

## Spec fields (see vignette.js)
`build(assets)` returns `{ scene, ink:{skyA,skyB,tint,lineW,...}, cues:[{t,type:'sfx',kind}], hearts(lt)->{v,n,variant,blink},
overlay(ctx,lt,env) (2D HUD drawn over the ink render, e.g. Minecraft HUD text), notes:[{t0,t1,text,x,y,size,arrow:[x,y],ax,ay}]
(hand-written storyboard notes), update(lt,T) -> camera }`. Spec may also have `tags:['INVISIBLE']` (small labels top-right).
Audio cue kinds: hurt, explosion, whoosh, totem, hiss, shoot, pop, splash, teleport, bow, pearl.

## Look & camera
Scenes are redrawn "as if retold in a comic": 3–4 clear shots, readable silhouettes, camera not inside walls, subject
framed in the middle third, mobs clearly identifiable. Prefer medium/wide third-person shots, plus at most one POV
shot when the clip is POV and it helps. Keep lighting bright enough that the ink shader shows shapes.

## Verify (mandatory)
`tools/preview.sh death_<n>_ 0.5,1.5,2.5,3.0,3.5,4.5 /tmp/verify/<you>_<n>.jpg` then look at the image with Read.
Iterate until: nothing floats or clips, mobs upright and on the ground, the action reads, the death moment reads.
Report which files you changed and anything you could not fix. Work at medium depth: 2–4 preview iterations per scene.

## NEW (second request from the director): hand-drawn explanations + slow motion in EVERY death
The director loves the storyboard-style explanations and wants them in all deaths.
- `notes: [ ... ]` returned from `build()`. Each note: `{ t0, t1, text, x, y, size?, to?, circle?, r?, dx?, dy?, ax?, ay?, bend?, align?, underline?, cps? }`.
  `text` is written live by hand (≈30 chars/s), then an arrow is drawn from the text to `to` (a `[x,y]` screen point or a
  function returning a `THREE.Vector3` world point, e.g. `to: () => creeper.position.clone().add(new THREE.Vector3(0, 1.6, 0))`),
  and/or a circle is drawn around `circle` (same kinds of value) with radius `r` px. `\n` makes a second line.
  Times `t0/t1` are in the scene's own (sim) time, like everything else in `update()`.
- Content rules: short factual Spanish lines in lower case, like a person annotating the clip ("le cae un creeper desde arriba",
  "vida completa… y un solo golpe", "el tótem no estaba equipado"), taken ONLY from the research notes / death message / what the
  footage shows. 3–5 notes per death. Max ~40 characters per line, max 2 lines. No invented causes or motives.
- Layout: keep notes in empty areas (usually right half, y 180–700). Never over the header (x<560, y<170), nor the day ribbon
  (y>990). Notes must not overlap each other. After `impact` the centre shows "¡Permadeath!" and the chat appears bottom-left:
  end notes at `impact` (t1 ≤ impact) unless placed top-right.
- Give each note enough time: t1 − t0 ≥ text length / 30 + 1.3 s (in real time — slow motion helps).
- `slow: [{ t, d, f }]` on the SPEC (next to `impact`), in sim seconds: from `t`, for `d` seconds, play at speed `f` (0.3–0.4).
  Use 1–2 segments at the key moments (the fuse flash, the hit, the totem pop, the fall) so the action and notes can be read.
  The vignette remaps everything (audio cues, notes, impact) automatically and gives the slow part a desaturated letterboxed look.
  Scenes may become longer — that's wanted. Choose camera angles in the slow part that EXPLAIN the action (clear 3/4 view).
