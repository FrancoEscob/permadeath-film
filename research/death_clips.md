# Permadeath (ElRichMC, 2020): death clips, visual beat sheets

Reference for the animator: how each death clip actually looks, moment by moment, based on the footage.
Compiled on 2026-09-26. Every death has its own section with links and exact timestamps.

## Legend (important)
- **[SEEN]**: seen directly in a frame extracted from the video and inspected (480p/360p, 1 fps overview plus 4–10 fps around the death).
- **[SUBS]**: from YouTube's Spanish auto-subtitles (ASR). Quoted verbatim, so they may contain transcription errors, and the speaker is often uncertain (voice calls).
- **[WIKI]**: from the Permadeath fandom wikis (permadeath.fandom.com/es "Muertes" and permadeath-wiki.fandom.com/es). Copies are in `wiki/`.
- **[DOC]**: narration from Rubik's documentary "La Historia Completa de Permadeath" (2026). Context only, not visual.
- Anything a batch agent *inferred* (for example "probably an Ender Quantum Creeper") is flagged as inference/uncertainty in its "Notes" block.
- Timestamps are always for the video linked on that death's "Footage" line (m:ss). Links carry `&t=`. For the GersoonSG compilation the link points at the official ban card that opens each chapter. The compilation's YouTube chapters start 3–8 s late, so trust the timestamps in this document.
- "Day" = the server day according to permadeath-wiki (day 0 = 25/03/2020, day 60 = 24/05/2020).

## Editions
- **There was only one official edition by ElRichMC: Permadeath (1st edition), 25/03/2020 → 24/05/2020, 60 days, 38 players plus "OmniRich" (Rich's admin character, who died at the very end).** It ran on Minecraft 1.15.2 hosted by KernelFreeze (the server list shows "Permadeath 1.15.2, Hospedado por @KernelFreeze"). The goal was to reach day 110, but the series ended on day 60 when the last survivor, Luh, died. [WIKI][DOC][SEEN]
- **Permadeath 2 never happened.** It was announced for 2021 (1.16/1.17), delayed to 2022 (announced 31/05/2021), and postponed indefinitely in November 2022 for lack of funding. In 2024 the official account (@PermadeathSMP) said the idea was still alive but unfunded. [DOC 1:18:48], [Bolavip 2021](https://bolavip.com/gamer/La-serie-de-Minecraft-Permadeath-2-se-retrasa-hasta-2022-20210601-0029.html). YouTube videos titled "Permadeath 2", "Permadeath Bedrock" and the like are fan servers unrelated to ElRichMC, so they are not included.

## Recurring visual elements (for animating every death consistently)
Seen repeatedly in the footage [SEEN] unless marked otherwise:
1. **Ban card** (the compilation opens each death with it): the "PERMADEATH" logo, the player's skin face, a Latin motto in script (reads roughly "Et hoc est inferum. Moritur an supergreditur."; the script is hard to read), `<Player> ha sido PERMABANEADO/A` / `DD-MM-2020 | HH:MM:SS UTC` / `Muerte por <CAUSA>`.
2. **Death screen, red, under 1 s**: vanilla `Game over!` (English client) or `¡Se acabó!` (Spanish client) with the vanilla message and `Score/Puntuación`. Variants: `Game Over`/`Puntaje` (Ibai, Latin-American Spanish), and `¡Has muerto!` with a **"Reaparecer"** button (Cecililla, the non-hardcore screen). Almost everyone clicks "Spectate/Observar mundo" immediately, so the red screen lasts 0.1–0.5 s, followed by "Joining world… / Entrando al mundo…".
3. **Big title** over the world (spectator camera, usually a different place such as the spawn or another player's base, often at night in rain): large red pixel-font **`¡Permadeath!`** with white subtitle **`<Player> ha muerto`**. [WIKI] It is heard by everyone together with a dragon roar, a "Permadeath" in Rich's voice, and the skeleton-horse death sound.
   - Quirk: **at ElRichMC's death each client showed ITS OWN name** ("Shadoune666 ha muerto", "iLuh ha muerto"…). In the other multi-POV deaths (Felipez, Gona, CrisGreen) the others saw the victim's name.
4. **Chat** (bottom left):
   - (a) From day 30 onward, when a totem saves someone: `<Player> ha consumido un tótem. (Probabilidad: 56 != 99)`. At death it can read, for example, `(Probabilidad: 97 >= 97)` (Hardy's failed totem).
   - (b) Red: `El comienzo del sufrimiento infinito de <name> ha comenzado. ¡HA SIDO PERMABANEADO!` (25/03–05/04), which later becomes **`Este es el comienzo del sufrimiento eterno de <name>. ¡HA SIDO PERMABANEADO!`** (from 06/04).
   - (c) A grey joke line personalised per player (e.g. "Ahora por fin descansa en paz.").
   - (d) The vanilla death message with the rank tag: `[MIEMBRO]`, `[INVITADO]`, `[CONTROL]`, `[CONTROL+]`, or `[ADMIN]` (Rich/OmniRich). In the final deaths (from ElRichMC, day 56, onward) a **red skull** icon follows the name.
   - (e) Sometimes `¡Comienza el Death Train con duración de N horas!` follows.
5. **Kick screen**: dirt background, `Connection Lost`/`Conexión perdida` / red `Has sido PERMABANEADO` / "Back to server list". Often a white MOJANG loading screen comes first. Variant: a `java.io.IOException: Se ha forzado la interrupción de una conexión existente por el host remoto` error instead of the ban text (TheGamerMaldito, Mikecrack, CrisGreen).
6. **Atmosphere after each death**: the "Death Train" (a forced storm for N hours). [WIKI] It shows as rain and as an action-bar countdown `Quedan HH:MM:SS de tormenta` in later clips.
7. **What the custom mobs look like on screen** (Permadeath has plugin mobs):
   - Spiders and silverfish with Invisibility + Glowing: only **white outlines and floating red eyes** (#11 Rubik, #17 Rangu).
   - Mobs outlined in white, as with Glowing (#9, #22).
   - "Ender Quantum Creeper": a **translucent, shimmering pale-blue blocky figure** (#35, #37, #38).
   - Ender Ghast attacks: explosions of **white smoke and white crescents**, and **magenta rings/spirals** in the air (#19, #23, #26, not confirmed as projectiles).
   - Totem pop: the golden totem fills the centre of the screen with green and yellow particles, hearts drop to 1 red plus gold absorption hearts, and the toast "Post mortem / Postmortal" appears.

## How this was made
- Main source: the GersoonSG compilation **"TODAS LAS MU3RT3S PERMADEATH"** (24/05/2020, 1.46M views, one chapter per death): https://www.youtube.com/watch?v=vYTcFdeAxE0. It was downloaded at 480p, contact sheets were extracted at 1 fps, and each death was checked frame by frame at 4 fps (10 fps where needed).
- Supplementary sources (multi-POV clips, the players' own streams, ElRichMC's stream for OmniRich) are cited per death.
- Representative frames are in `frames/NN_player_x_description.jpg` (NN = death number). Reference only.

## Quick index (39 entries: 32 player deaths, 6 AFK bans, and OmniRich)
The "On-screen death message" column is exactly what was **seen** on screen, in-game name included. V = vYTcFdeAxE0 (GersoonSG compilation).
Visual quality: ★★★ = the cause and the death are clearly visible; ★★ = the death is visible but the killer or final hit is off-screen; ★ = only indirect or distant; — = no footage.

| # | Player (in-game name) | Day | Date/time (UTC) | On-screen death message [SEEN] | Setting | Footage | Link |
|---|---|---|---|---|---|---|---|
| 1 | Alvaro845 | 0 | 25/03 19:15 | `Alvaro845 was blown up by Creeper` | Cave with obsidian/lava | ★★★ own stream (creeper drops from above) | [V 0:06](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=6) |
| 2 | TheGamerMaldito | 0 | 25/03 19:30 | `TheGamerMaldito ha explotado por Creeper` | Cave | ★★★ own recording (creeper flashes, shield up) | [V 0:44](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=44) |
| 3 | Cecililla | 0 | 25/03 21:29 | `Cecililla ha explotado por Creeper` | Cave | ★★ own (the creeper is never seen) | [V 1:13](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=73) |
| 4 | Kaumaru | 10 | 04/04 16:50 | — (card only: "ARAÑA DE CUEVA") | — | — not recorded; only his reconstruction | [V 1:51](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=111) |
| 5 | Felipez360 (xXmineCr4fterXx) | 10 | 04/04 20:19 | title only: `xXmineCr4fterXx ha muerto` (message hidden by the webcam) | Stone-brick base with rails | ★★ third person from Th3Antonio's stream (fight, totem, death in a doorway) | [V 3:00](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=180) |
| 6 | Ibai (DONIBAILLANOS) | 11 | 05/04 17:23 | `DONIBAILLANOS fue reventado/a por Creeper` | Dark cave | ★★ own (creeper visible for 0.25 s) | [V 3:50](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=230) |
| 7 | ReventXzz | 11 | 05/04 17:28 | `ReventXzz ha sido víctima de Araña de cueva` | Mineshaft with rails | ★★★ own (cave spider charges, one-shot) | [V 4:15](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=255) |
| 8 | AKAWonder | 12 | 06/04 01:17 | `AKAWonder se ha reducido a cenizas mientras luchaba contra Blaze` | Nether fortress, blaze spawner | ★★★ own (burns for 20 s) | [V 4:44](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=284) |
| 9 | Ander (4andeR) | 18 | 12/04 22:46 | `4andeR ha sido víctima de Araña` | Overworld, night, camp by a river | ★★★ own (spider, totem, death) | [V 5:31](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=331) |
| 10 | LiliCross | 25 | 19/04 15:03 | AFK (card "Baneada por AFK") | — | — ban card only | [V 6:08](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=368) |
| 11 | RubikYT | 25 | 19/04 17:35 | `RubikYT was slain by Cave Spider` | Cave with a cobwebbed spawner | ★★ own (invisible spiders: outlines/eyes) | [V 6:17](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=377) |
| 12 | Zeling (MitisyyLeDivorce) | 26 | 20/04 01:58 | `MitisyyLeDivorce ha sido víctima de Cubo de magma` (chat) | Nether, fire and lava | ★★ own (giant magma cube never clearly seen) | [V 6:54](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=414) |
| 13 | Tonacho | 26 | 20/04 14:30 | `tonacho was slain by Slime` | Swamp at dawn | ★★★ own (giant slimes, totem) | [V 7:27](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=447) |
| 14 | Perxitaa | 30 | 24/04 00:00 | AFK | — | — card only | [V 8:37](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=517) |
| 15 | AlexElCapo | 30 | 24/04 00:00 | AFK (voluntary) | — | — card and tweets | [V 8:46](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=526) |
| 16 | OutConsumer | 30 | 24/04 13:38 | — (card: "POLLO") | — | — **not recorded**; he tells it verbally | [V 8:55](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=535) |
| 17 | RanguGamer | 30 | 24/04 17:20 | `[CONTROL] RanguGamer ha sido víctima de Silverfish de la Muerte` | Stronghold | ★★ own (invisible silverfish: outlines) | [V 9:59](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=599) |
| 18 | FrigoAdri | 30 | 24/04 18:22 | `[CONTROL+] FrigoAdri ha explotado por Creeper` | The End, group dragon fight | ★★ own (creeper off-screen, totem failed) | [V 10:32](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=632) |
| 19 | Folagor (Folagoro) | 32 | 26/04 20:54 | `Folagoro ha explotado por Ender Ghast` | The End, main island | ★★ own (totem while writing a sign; final hit not seen) | [V 11:37](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=697) |
| 20 | Paracetamor | 32 | 26/04 20:58 | — (card: "CAER AL VACÍO") | — | — **not recorded** (only her tweets) | [V 12:17](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=737) |
| 21 | Gona89 (Gona89_YT) | 34 | 28/04 17:03 | `Gona89_YT ha explotado` | End City, purpur shaft with shulkers | ★★ own (explosion barely visible) | [V 12:37](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=757) |
| 22 | MrCarlosNoob | 34 | 28/04 17:23 | `[INVITADO] MrCarlosnoob hit the ground too hard whilst trying to escape Cave Spider` | Cave | ★★★ own (poisoned, flees, throws a pearl) | [V 13:07](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=787) |
| 23 | Mikecrack | 35 | 29/04 22:49 | `Mikecrack was blown up by Ender Ghast` | End outer islands, elytra | ★★★ own (ghast fireball, totem; final hit not seen) | [V 13:23](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=803) |
| 24 | BarbeQ | 36 | 30/04 00:00 | AFK | — | — card only | [V 15:58](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=958) |
| 25 | Cibergun | 36 | 30/04 19:55 | `cibergun ha explotado por Ender Ghast` | The End, flat island | ★★ own (invisible with no armor; ghast never seen) | [V 16:02](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=962) |
| 26 | Alkapone (Leyville) | 38 | 02/05 04:07 | `Leyville fell from a high place` | End outer islands, End City | ★★★ own (takes off armor and elytra mid-air) | [V 16:36](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=996) |
| 27 | Nia (Lakshart) | 38 | 02/05 18:22 | `Lakshart ha explotado por Ender Ghast` | End outer islands | ★★ own (totem, ghast; final hit not seen) | [V 17:40](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1060) |
| 28 | Hardyluski | 44 | 08/05 14:10 | `Hardyluski ha explotado por Gato` | Overworld sky, night, rain | ★ own (the cat never appears; instant cut) | [V 18:10](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1090) |
| 29 | Th3Antonio | 50 | 14/05 00:00 | AFK | — | — card only | [V 18:41](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1121) |
| 30 | CooLifeGame | 50 | 14/05 00:00 | AFK (minimum-hours plugin) | — | — card and tweets | [V 18:50](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1130) |
| 31 | BriiHD (ElBrean) | 50 | 14/05 07:59 | `ElBrean was blown up by Ghast Demoníaco` | Nether, arena of diamond pigmen | ★★ own (fireball fills the screen) | [V 19:28](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1168) |
| 32 | **ElRichMC** | 56 | 20/05 19:23 | `[ADMIN] ElRichMC fell out of the world` | The End: End City → void | ★★★ own + 4 POVs | [V 20:00](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1200) · [multi-POV](https://www.youtube.com/watch?v=p7SdaB-a9Ls) |
| 33 | EsVandal | 59 | 23/05 22:58 | `EsVandal ha muerto por un flechazo de Esqueleto Wither` | Nether, dark bridge with fire | ★★ own (the arrow is never seen) | [V 21:10](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1270) |
| 34 | Kakytron | 60 | 24/05 14:58 | `Kakytron was blown up by Ender Quantum Creeper` (chat) | Stone plaza in a bamboo grove, daytime | ★ third person from ElRichMC as spectator (the house explodes) | [V 21:35](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1295) |
| 35 | CrisGreen | 60 | 24/05 15:32 | `Crisgreen was blown up by Ender Quantum Creeper` (chat) | Inside a Nether portal, base corridor | ★★ own + multi-POV (shimmering figure) | [V 22:01](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1321) · [multi-POV](https://www.youtube.com/watch?v=02yEAFKWuKA&t=27) |
| 36 | Shadoune666 | 60 | 24/05 15:37 | `Shadoune666 drowned` | Night, flooded base, underwater | ★★ own (explosion, totem, underwater) | [V 22:36](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1356) |
| 37 | killercreeper_55 | 60 | 24/05 20:43 | `killercreeper_55 was blown up by Ender Quantum Creeper` | Storage hall with ice walls, night storm | ★★★ own (shimmering figure walks toward him) | [V 22:56](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1376) |
| 38 | Luh (iLuh) | 60 | 24/05 20:50 | `iLuh se ha ahogado` | Library on a platform, storm → pond | ★★★ own + multi-POV (blast launches him into water) | [V 23:29](https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1409) · [multi-POV](https://www.youtube.com/watch?v=VM3wGy73K7M&t=27) |
| 39 | OmniRich ([ADMIN] OmniRich) | 60 | 24/05 ~23:00 | `[ADMIN] OmniRich was slain by Vex` | Nether ice road → Overworld tiled plaza | ★★★ ElRichMC's stream (Vex dives at him) | [Shem 2:40](https://www.youtube.com/watch?v=fD_eMUi4axs&t=160) |

Date notes: the wiki contradicts itself for ElRichMC (15/05 vs 20/05; the ban card **shows 20-05-2020**) and EsVandal (16/05 vs 23/05). For OmniRich the wiki says 5/06, but the footage shows screenshots dated **2020-05-24 ~22:58**, and permadeath-wiki puts him on day 60.

## Days 0–18 (#1–#9)

### #1 — Alvaro845 (TheAlvaro845)
- **Wiki:** death #1, 25/03/2020 19:15:18, "Muerte por Creeper" (day 1). [WIKI]
- **Footage:** GersoonSG compilation, chapter "Alvaro": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=6 (0:06–0:50). POV = Alvaro's own Twitch stream (credited in the description as twitch.tv/thealvaro845): webcam top-right, stream overlay with a red "TIEMPO VIVO: 02H: 08M: 20S" counter bottom-left. [SEEN]
- **Exact death message [SEEN]:**
  - Game-over screen: `Game over!` / `[MIEMBRO] Alvaro845 was blown up by Creeper` / `Score: 491` (buttons "Spectate world", "Title screen").
  - Chat (red): `El comienzo del sufrimiento infinito de <name> ha comenzado. ¡HA SIDO PERMABANEADO!` then `[MIEMBRO] Alvaro845 was blown up by Creeper`.
  - Title: `¡Permadeath!` / subtitle `Alvaro845 ha muerto`.
  - Kick screen: `Connection Lost` / `Has sido PERMABANEADO` / button "Back to server list".
- **Setting [SEEN]:** Overworld, underground cave: stone, dirt and gravel walls, a lava fall and lava pool that his water has turned into a field of black obsidian, blue flowing water, a torch on the wall. Dim, torch-lit.
- **Gear/HUD [SEEN]:** full 10 hearts, armor bar about 7/10, full hunger, XP level 18. Holding a torch. Hotbar from left: bow, sword, pickaxe, other tools, water bucket, 62 cobblestone, a stack of 23, 13 torches (selected).
- **Beat sheet:**
  1. 0:06 [SEEN] He has just emptied a water bucket (tooltip "Water Bucket") onto lava. A lava fall top-left and black smoke particles as the water hits the lava.
  2. 0:08–0:13 [SEEN] He switches to a torch (tooltip "Torch") and looks around the flooded cave. The lava is turning to obsidian at his feet. [SUBS 0:10] "En el agua no spawnean mobs, ¿no? Pero bueno, por si acaso…"
  3. 0:16.0–0:16.5 [SEEN] He looks down over the obsidian and water. A spider (black body, red eyes) is in the water a few blocks ahead, facing him.
  4. 0:16.75 [SEEN] A creeper drops into frame from the upper right, right beside the camera. Its green, mottled body is blurred and huge because it is so close. His hearts are still full.
  5. 0:17.0 [SEEN] The creeper is at the lower-right edge of the screen, touching him. No damage is shown yet.
  6. 0:17.25 [SEEN] The screen cuts straight to the red "Game over!" screen, so it was a one-shot from full health. The chat death lines appear bottom-left.
  7. 0:17.75 [SEEN] "Joining world…" (he clicked Spectate). 0:18–0:19 the big red **¡Permadeath!** title and "Alvaro845 ha muerto" over a daylight Overworld view with green hills and a river.
  8. 0:19–0:22 [SEEN] Webcam: he raises both hands and grabs his head.
  9. 0:20–0:50 [SEEN] Kick screen "Connection Lost / Has sido PERMABANEADO". His overlay now reads **"DEP ALVARO845 02H: 08M: 21S"**, so the alive-timer froze at 2 h 8 min 21 s. He laughs and slumps back and forth in his chair. [SUBS 0:23] "me ha caído un creeper de arriba, tío." [SUBS 0:30] "Me ha caído un creeper de arriba." [Risas] [SUBS 0:40] "Pues ya estaría."
- **Frames:** `frames/01_alvaro_a_creeper_drops.jpg` (creeper falling in, spider in water), `frames/01_alvaro_b_gameover.jpg`, `frames/01_alvaro_c_permadeath_title.jpg`
- **Notes/uncertainties:** The creeper enters for only about 0.5 s at 4 fps, so no fuse flash or explosion frame is visible. It cuts directly to Game over.

### #2 — TheGamerMaldito
- **Wiki:** death #2, 25/03/2020 19:30:04 (day 1, about 15 min after Alvaro), "Muerte por Creeper", totem "No Equipado". [WIKI]
- **Footage:** GersoonSG compilation, chapter "TheGamerMaldito": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=44 (his memorial card 0:44–0:48, inside the index's Alvaro range; gameplay 0:49–1:12; 1:13–1:16 is Cecililla's card). POV = TheGamerMaldito's own first-person recording. There is **no webcam and no stream overlay**, only the GersoonSG watermark bottom-left. Spanish client. [SEEN]
- **Exact death message [SEEN]:**
  - Memorial card (0:44–0:48, small in the frame): `TheGamerMaldito ha sido PERMABANEADO` / `25-03-2020 | 19:30:04 UTC` / `Muerte por CREEPER`.
  - Game-over screen: `¡Se acabó!` / `[MIEMBRO] TheGamerMaldito ha explotado por Creeper` / `Puntuación: 429` (buttons "Observar mundo", "Menú principal").
  - Chat: red `El comienzo del sufrimiento infinito de TheGamerMaldito ha comenzado. ¡HA SIDO PERMABANEADO!` (name in red), then `[MIEMBRO] TheGamerMaldito ha explotado por Creeper`. There is no extra custom grey line.
  - No ¡Permadeath! title is visible in this clip; the spectator view only shows rain and the chat.
  - Disconnect screen (unusual): `Conexión perdida` / `Internal Exception: java.io.IOException: Se ha forzado la interrupción de una conexión existente por el host remoto` / "Volver a la lista de servidores". This is not the "Has sido PERMABANEADO" kick text.
  - Then a black edit card with big red serif text `HAS MUERTO` (1:09–1:12), probably added in video editing.
- **Setting [SEEN]:** Overworld, underground cave. At first a lava fall pours onto a cobblestone base, with a black obsidian floor where lava has hardened and torches placed on it. Then he's in narrow stone/dirt/gravel passages lit by torches he places on the walls. Dim and torch-lit. When he spectates after dying he sees dark blue sky with heavy rain.
- **Gear/HUD [SEEN]:** 10 full hearts the whole time, armor about 7.5/10, full hunger, XP level 17. **Shield in the offhand** (the grey-rimmed board bottom-left). Hotbar from left: iron sword, iron pickaxe (selected, tooltip "Pico de hierro"), iron shovel, bow, cobblestone (52, rising to 57 as he picks blocks up), 3 bread, a water bucket, 16 torches, 48 ladders. Earlier he holds a torch (tooltip "Antorcha" at 0:50).
- **Beat sheet:**
  1. 0:50–0:53 [SEEN] He looks at a lava fall onto cobblestone above an obsidian floor. Chat: yellow `Crisgreen left the game`, `<[MIEMBRO] xXmineCr4fterXx> kk`, `<[MIEMBRO] ElBrean> si es Javascript os puedo ayudar`. [SUBS 0:50] "en la altura 11 suele ser cómodo explorar a partir de ese punto, pero lógicamente hay margen en ese aspecto en ambas direcciones, ¿no? Hacia arriba y hacia abajo. Muchísimo, pero un poquito así."
  2. 0:54–0:56 [SEEN] He walks through a dark passage of stone, dirt and gravel and puts a torch on a gravel wall (0:56).
  3. 0:57–1:00.25 [SEEN] He switches to the iron pickaxe and digs at a dirt/stone wall in a narrow tunnel, shield visible bottom-left. At 1:00.0 a dark green shape shows at the top edge of the screen. At 1:00.3, for one frame, the screen fills with big olive and brown pixels (possibly the creeper passing right in front of the camera; not certain).
  4. 1:00.75–1:00.8 [SEEN] He turns right. A creeper is right beside him, filling the lower-right edge.
  5. 1:00.9–1:01.1 [SEEN] He faces it. The creeper stands about a block away in a corner under a torch on a gravel wall, with obsidian at the lower right. It **alternates between pale whitish-green (1:00.9, 1:01.1) and normal green (1:01.0): the fuse flash.** Hearts still 10/10. [SUBS 1:01] "así. Wow."
  6. 1:01.15 [SEEN] He switches to the iron sword (tooltip "Espada de hierro"). The creeper is still flashing pale.
  7. 1:01.22–1:01.28 [SEEN] **He raises the shield**, which covers the bottom-centre of the screen. The creeper looks squashed and swollen at the crosshair, just behind the shield's top edge.
  8. 1:01.32 [SEEN] It cuts to the **¡Se acabó!** screen, a one-shot from full health despite the raised shield. No explosion frame is visible.
  9. 1:01.35 [SEEN] "Entrando al mundo…". 1:01.5–1:02.9: spectator view of a dark blue sky with rain streaks and the chat lines.
  10. 1:03–1:08 [SEEN] Disconnect screen with the java.io.IOException text. [SUBS 1:04] "Fuck." [SUBS 1:06] "Fa fa." [SUBS 1:10] "Ah. Ah, fuck."
  11. 1:09–1:12 [SEEN] Black card "HAS MUERTO". 1:13–1:16: Cecililla's memorial card (next chapter).
- **Frames:** `frames/02_maldito_a_creeper_under_torch.jpg` (1:01.15, creeper flashing pale under the torch, sword tooltip), `frames/02_maldito_b_shield_up.jpg` (1:01.28, shield raised, creeper swollen behind it), `frames/02_maldito_c_se_acabo.jpg`
- **Notes/uncertainties:** Where the creeper came from isn't clear. There's a dark green shape at the top edge at 1:00.0, so it may have come from above or behind. The kick screen shows a connection exception instead of "Has sido PERMABANEADO".

### #3 — Cecililla
- **Wiki:** death #3, 25/03/2020 21:29:16 (day 1), "Muerte por Creeper", totem "No Equipado". [WIKI]
- **Footage:** GersoonSG compilation, chapter "Cecililla": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=73 (her memorial card 1:13–1:16, gameplay 1:17–1:36, kick screen to 1:50; index 1:19–1:58). POV = Cecililla's own stream: a purple overlay bar along the bottom ("ULTIMO TIP RonyVII – $30", "TOP TIP", "ULTIMO SUSCRIPTOR amichis", "ULTIMO SEGUIDOR annthomgamer", "ULTIMO BIT brayan7946 – 5", "TOTAL SUBS 57") and a goal widget top-right (round avatar, bar "HP: 890/2240"). **No webcam.** Spanish client. [SEEN]
- **Exact death message [SEEN]:**
  - Memorial card (1:13): `Cecililla ha sido PERMABANEADA` / `25-03-2020 | 21:29:16 UTC` / `Muerte por CREEPER`.
  - Death screen: `¡Has muerto!` / `[MIEMBRO] Cecililla ha explotado por Creeper` / `Puntuación: 897` (the middle digit is blurry) with buttons **"Reaparecer"** and "Menú principal". This is the non-hardcore respawn screen, unlike the "¡Se acabó!/Observar mundo" screens in the other clips.
  - Chat: red, on one line: `El comienzo del sufrimiento infinito de <name in red> ha comenzado. ¡HA SIDO PERMABANEADO!`, then `[MIEMBRO] Cecililla ha explotado por Creeper`. No custom grey line.
  - Title: `¡Permadeath!` / `Cecililla ha muerto`.
  - Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / "Volver a la lista de servidores".
- **Setting [SEEN]:** Overworld, underground cave: stone, pinkish granite (tooltip "Granito"), dirt, a floor of black obsidian (hardened lava) with a torch standing on it, gravel. Dim, torch-lit. It looks similar to the obsidian-floored cave in TheGamerMaldito's clip the same day, but I can't confirm it is the same place. Her spectator view after death is outside in **daylight**: a stone wall, grass, a sandy slope, oak trees and a white flower.
- **Gear/HUD [SEEN]:** 10 full hearts right up to the death, armor about 7.5/10, full hunger, XP level 23. **Shield in the offhand** (the grey-rimmed board bottom-left). Her main hand is mostly empty (bare skin-tone arm with a red sleeve), and she cycles items (tooltips "Antorcha", "Cubo con agua", "Roca"). At 1:23–1:26 she opens her inventory: armored character model with light hair, tooltips "Granito" and "Pico de hierro" ("En la mano principal: Velocidad de ataque: 1.2, Daño de ataque: 4").
- **Beat sheet:**
  1. 1:17–1:22 [SEEN] She walks through the cave over the obsidian floor, looking at stone and granite walls. [SUBS 1:17] "No sé, no no estoy entrando. O sea, he picado aquí y hay un lugar abierto, pero no sé si ir."
  2. 1:23–1:26 [SEEN] Inventory open (tooltips "Granito", "Pico de hierro"). [SUBS 1:26] "Bueno, mejor vengo contigo, ¿no?"
  3. 1:27–1:31 [SEEN] Back in the cave: a torch on the obsidian floor, then granite and dirt walls, a dark opening ahead. [SUBS 1:29] "Sí. Bueno, al menos esta mina podemos encontrar diamantes en esta altura y es como más seguro."
  4. 1:32–1:34 [SEEN] She stands facing a dirt/granite wall in a dark corner of the cave, flicking between a torch ("Antorcha"), a water bucket ("Cubo con agua") and stone ("Roca"). No mob is visible anywhere on screen.
  5. 1:34.2–1:34.6 [SEEN] Still facing the dirt wall with hearts at 10/10. Her empty hand is raised at the lower right, and the view tilts a little at 1:34.53.
  6. 1:34.63 [SEEN] It cuts straight to the red **¡Has muerto!** screen. **The creeper is never seen**: it exploded out of view (behind or beside her), a one-shot from full health.
  7. 1:34.67–1:34.97 [SEEN] "Entrando al mundo…" over the fading death screen (she clicked straight away).
  8. 1:35–1:36 [SEEN] Spectator view: a close stone wall on the left and daylight on the right (grass, sand, trees). **¡Permadeath!** / "Cecililla ha muerto" plus the chat lines.
  9. 1:37–1:50 [SEEN] Kick screen held, with the mouse cursor idle. [SUBS 1:36] "No, en serio, ¿qué ha pasado?" [SUBS 1:40] "Oh. Y, chicos, ¿cómo? Pero, ¿cómo?" [SUBS 1:45] "¿Cómo ha sido?" [SUBS 1:49] "¿Cómo morí?"
  10. 1:51–1:54 [SEEN] Kaumaru's memorial card (next chapter).
- **Frames:** `frames/03_cecililla_a_last_frame_cave.jpg` (1:34.5, the last gameplay frame: dirt wall, full hearts), `frames/03_cecililla_b_has_muerto.jpg` (1:34.63), `frames/03_cecililla_c_permadeath_title.jpg`
- **Notes/uncertainties:** No creeper, fuse flash or explosion is visible at all. The animator would have to invent the creeper's approach, and the footage only supports "it came from off-screen". Her own words ("¿Cómo morí?") confirm she didn't see it either. The score's middle digit is blurry (it reads as 897).

### #4 — Kaumaru
- **Wiki:** death #4, 04/04/2020 16:50:27, "Muerte por Araña de Cueva", totem "No Equipado". Custom line: "Has sido deleteado, titi". [WIKI]
- **Footage:** GersoonSG compilation, chapter "Kaumaru": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=111 (his memorial card 1:51–1:54, then 1:55–2:59 of him *explaining* the death; index 1:58–3:05). POV = Kaumaru's own screen recording, English-language client (tooltips "Diamond Pickaxe", "Cooked Cod"). No webcam, no stream overlay, and a small teal-bordered icon with a red symbol in the top-right corner (unidentified). [SEEN]
- **THERE IS NO DEATH FOOTAGE IN THIS CHAPTER. [SEEN]** He is alive the whole time, **10/10 hearts from 1:58 to 2:59**, armor 6/10 and XP level 44. There is no death screen, no ¡Permadeath! title, no chat death line and no spider. [SUBS 1:55] "Pues nada, señores, lo dicho. Bueno, para el que no lo tengo grabado, me sale mal. Capachado. Oh, no lo tengo grabado." In other words, he says he did not record it and reconstructs it verbally in his base.
- **Exact death message [SEEN]:** only the memorial card (1:51–1:54): `PERMADEATH` logo, his skin face, `Kaumaru ha sido PERMABANEADO` / `04-04-2020 | 16:50:27 UTC` / `Muerte por ARAÑA DE CUEVA`. No in-game death message is shown.
- **What the chapter shows [SEEN]:**
  1. 1:55–2:15: A third-person (F5) view of his character standing still, talking, in an enormous storage hall. The floor is sand-coloured with big orange-and-black stepped patterns and brown patterned patches. The walls are covered in chests and barrels with stone pillars, under a domed ceiling striped blue, orange and black. His character wears a light-blue diamond helmet and diamond leggings with a black outfit, and there's a bit of purple at his back (cape?).
  2. 2:16–2:18: He switches to first person and looks up at the dome, then walks with a diamond pickaxe (tooltip "Diamond Pickaxe").
  3. 2:19–2:40: A demonstration with **purple blocks** on the floor: he places one, then a stack of two, and mines one away (it goes transparent while breaking at 2:40). This lines up with [SUBS 2:15–2:36] "ha habido un momento en el cual he quitado un bloque, pero como lo veis, eh, o sea, un bloque así, pum, y en ese bloque, en el en la fracción de segundo, en la cual quité he quitado este bloque, se ha generado un espacio negro y en ese espacio negro se ha spawneado una araña de cueva y esa araña de cueva tenía fuerza y velocidad".
  4. 2:41–2:59: He sprints and jumps around the hall in first person with the camera whipping around (apparently acting out the chase), still on full hearts. There are small mobs or items on the floor at 2:42 and 2:44 (a red one and a grey one, too small to identify). [SUBS 2:41] "cuando me he querido dar cuenta ya estaba muerto porque sencillamente no podía huir de ella. O sea, corría pero de una forma espectacular. M era una cosa como como Naruto, pero multiplicado por 10 y encima tenía fuerza. O sea, es que me ha machacado, que, o sea, me ha machacado."
  5. 3:00–3:03: Felipez360's memorial card (next chapter).
- **His verbal account [SUBS 2:01–2:59] (the only source for the actual death):** He was in an area with cave-spider spawners ("unos spawners de arañas de cueva"), everything "perfectamente iluminado". He removed a block, a dark gap opened behind it, and in that fraction of a second a cave spider spawned there. It had **strength and speed** ("fuerza y velocidad"), he couldn't outrun it ("como Naruto, pero multiplicado por 10"), and it killed him. He also mentions the difficulty had gone up ("no aumentado la dificultad, como sabréis" is probably ASR for "ha aumentado la dificultad").
- **Frames:** `frames/04_kaumaru_a_thirdperson_base.jpg` (2:00, F5 view in the storage hall), `frames/04_kaumaru_b_block_demo.jpg` (2:21, purple block demonstration), `frames/04_kaumaru_c_memorial_card.jpg` (1:52)
- **Notes/uncertainties:** The whole chapter is a reconstruction, so nothing about the real death is visually confirmed. It's unclear whether the explanation was recorded before the ban (for example in a copy of the world), because he is clearly in-game and alive. The purple blocks might be purpur or shulker boxes. Supplementary search (`ytsearch10: muerte Kaumaru permadeath araña de cueva`) found no video with his death on screen (only the Lucas LG all-deaths compilation 09mfb7pIInk and Felipe's full streams), so none was downloaded.

### #5 — Felipez360 (in-game name xXmineCr4fterXx)
- **Wiki:** death #5, 04/04/2020 20:19:39, "Muerte por Araña", totem **"Consumido"**. Custom line: "Su estado es muerto". [WIKI]
- **Footage:**
  - GersoonSG compilation, chapter "Felipez360": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=180 (card 3:00–3:03, gameplay 3:04–3:29, aftermath to 3:49; index 3:05–3:55). **POV = teammate Th3Antonio's stream, not Felipez's**: webcam bottom-left (young man with glasses, red shirt, white-and-pink gaming chair, label "vodafonegiants"), red Twitter/Instagram tags "Th3Antonio" on the right, and a sponsor banner bottom-centre ("ONLY THE BRAVE", later a Nike logo). Spanish client. Felipez appears in third person as `[MIEMBRO] xXmineCr4fterXx`. A third player is with them, `[MIEMBRO] MitisyyLeDivorce` (the name is confirmed in the tab list below). [SEEN]
  - Supplementary: "La muerte de SoyFelipez360 en Permadeath [Vista de killercreeper55]" (channel Pabl0WL, uploaded 2020-04-07, 66 s), https://www.youtube.com/watch?v=Oi7ijuDSu2A&t=0. It is killercreeper_55's POV somewhere else. **It contains no death footage**, only the chat aftermath (see beat 13). Downloaded as `clips/felipez_killercreeper_pov.mp4`; its auto-subs are almost empty (music, a few words). [SEEN]
- **Exact death message [SEEN]:**
  - Memorial card (3:00): `Felipez360 ha sido PERMABANEADO` / `04-04-2020 | 20:19:39 UTC` / `Muerte por ARAÑA`.
  - Title on Th3Antonio's screen: `¡Permadeath!` / `xXmineCr4fterXx ha muerto`.
  - Chat on Th3Antonio's screen: almost completely hidden behind the webcam. Only the end of one line, `…Araña`, is visible beside the webcam from 3:29.
  - Supplementary (killercreeper's chat): `[MIEMBRO] killercreeper_55 joined the game`, `xXmineCr4fterXx left the game`, red `Comienza el Death Train con duración de 11 horas!`, then `<[MIEMBRO] killercreeper_55> e?`, `<[ADMIN] ElRichMC> gg`, `<[MIEMBRO] killercreeper_55> ha muerto alguien?=?!?`, `<[ADMIN] ElRichMC> acaba de morir felipez360`.
  - The vanilla death message and the red "PERMABANEADO" line are **not readable** in either video.
- **Setting [SEEN]:** Overworld, a **stone-brick** interior: corridors and rooms of stone bricks and cobblestone, a **rail track** running along the floor, wooden blocks and lecterns, chests, torches on the walls, an **oak door** frame (the kill happens in this doorway) and orange blocks with yellow speckles on either side of the path (I can't identify them). Afterwards Th3Antonio is in a room with a wooden floor, stone-brick walls and glass windows, with night and rain outside. Dim, torch-lit.
- **Gear [SEEN]:** Felipez wears **full diamond armor** and fights with a **diamond sword**. MitisyyLeDivorce is also in diamond armor. Th3Antonio holds a diamond sword with a golden, face-like item in his offhand (possibly a totem). Felipez's own hearts are not visible because this is not his POV.
- **Beat sheet (compilation timestamps):**
  1. 3:04–3:10 [SEEN] In the rail corridor, MitisyyLeDivorce walks toward the camera. Further down, Felipez (blue diamond armor) swings his sword at a spider, which flashes red as it is hit.
  2. 3:11–3:12 [SEEN] Th3Antonio briefly opens his inventory.
  3. 3:13–3:15 [SEEN] Felipez is right in front of the camera (big nametag), swinging the diamond sword. A dark spider with red eyes is in the corridor behind him, and at 3:15 he is fighting the red-flashing spider.
  4. 3:16 [SEEN] A big dark spider leaps straight at Th3Antonio's camera.
  5. 3:17–3:20 [SEEN] The spider (dark brown/black, red eyes) scuttles along the rails, with Felipez and Mitisyy chasing it. Mitisyy passes close to the camera at 3:20.
  6. **3:20.6–3:21.7 [SEEN] TOTEM POP:** at the far end of the corridor, Felipez is surrounded by a swirl of **green and yellow totem particles** while the spider, flashing red, is at his feet. Green particles still hang in the corridor at 3:22–3:23. This matches the wiki's "Consumido". The totem item animation isn't visible because that only shows on his own screen.
  7. 3:22–3:24 [SEEN] Th3Antonio turns to a room with an oak door and a chest, then back toward the corridor, where Felipez and Mitisyy stand in a far doorway.
  8. 3:25–3:26.75 [SEEN] Felipez keeps fighting the spider in the stone-brick room, and it keeps flashing red from his hits. Mitisyy is behind. [SUBS 3:25] "Aguant infinito. Tú qué pasa." [SUBS 3:26] "Te ha matado inmortal estaña." (ASR)
  9. 3:27–3:27.75 [SEEN] Felipez turns and comes toward the camera. The dark, red-eyed spider stays on him, right at his feet.
  10. 3:28–3:28.8 [SEEN] Felipez backs into the **oak doorway** next to Th3Antonio, half hidden by the door frame, with the spider clinging at his legs. [SUBS 3:29] "Vete, vete, vete."
  11. 3:28.9 [SEEN] His figure in the doorway flashes red (damage tint). 3:29.05: **he's gone and his items burst out as a scatter of drops in the doorway**, with the spider still there. 3:29.3 onward: faint, then solid, red **¡Permadeath!** / "xXmineCr4fterXx ha muerto" over Th3Antonio's view. [SUBS 3:30] "Lol." "Felipe, Felipe."
  12. 3:30–3:49 [SEEN] Th3Antonio backs into the windowed room (wooden floor, night rain outside), opens the pause menu (3:41–3:42), then stands still. Webcam: he **puts his hand over his mouth** from about 3:32 and keeps it there. [SUBS 3:37] "No, madre de Dios, chaval." [SUBS 3:43] "¿Qué acaba de pasar? Buah, qué pena. Me da pena, sobre todo porque no se ha visto mi perspectiva, que ha sido graciosa." (the speaker may be someone on call)
  13. Supplementary [SEEN]: at https://www.youtube.com/watch?v=Oi7ijuDSu2A&t=0 killercreeper stands on a stone-brick tower above an icy, snowy biome at night, then goes through the menus and server list and rejoins (0:05–0:11). At 0:11 the chat shows `xXmineCr4fterXx left the game`, at 0:15 the red **Death Train** notice, at 0:47 he asks "ha muerto alguien?=?!?", and at 0:52 ElRichMC answers "acaba de morir felipez360". The video ends on a black "F……." card (1:01–1:05). The tab list at 0:40 shows 7 online: ElRichMC, cibergun, Folagoro, FrigoAdri, killercreeper_55, MitisyyLeDivorce, Th3Antonio.
  14. 3:50–3:53 [SEEN] Ibai's memorial card (next chapter).
- **Other subtitles [SUBS 3:04–3:23]:** "Ya estaba hecho o o cu. Ah, vale, que que Felipe. Vale, estaña. Me cago en" / "No, no estaba, no estaba en nuevo, en nuevo todo eso." / "Pero, ¿qué le pasa?" / "Te mata, te mata." / "Felipe, Felipe, tú está muy chetada esa araña, ¿eh?" / "Te ha matado, loco. Alicia, sal que te mata, que te mata. Vete, vete, Alicia." These are several voices; "Alicia" is probably someone's nickname.
- **Frames:** `frames/05_felipez_a_totem_particles_spider.jpg` (3:21.1, green/yellow totem particles around Felipez, spider below), `frames/05_felipez_b_last_seen_doorway.jpg` (3:28.9, last frame of Felipez in the doorway), `frames/05_felipez_c_drops_in_doorway.jpg` (3:29.05, item drops, spider), `frames/05_felipez_d_kcpov_chat_acaba_de_morir.jpg` (supplementary, 0:56)
- **Notes/uncertainties:** This is a third-person view from a teammate, so his hearts, held item and the exact final hit can't be seen. The spider is a large (normal) spider, consistent with the wiki's "Araña". The fight lasts at least 25 s, and he dies about 8 s after the totem pops. The "Death Train" line comes from the supplementary video's chat and isn't visible in the compilation.

### #6 — Ibai (in-game name DONIBAILLANOS)
- **Wiki:** death #6, 05/04/2020 17:23:54, "Muerte por Creeper", totem "No Equipado". Custom death line listed for him: "Llano estás en el server, Ebay". [WIKI]
- **Footage:** GersoonSG compilation, chapter "Ibai": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=230 (index says 3:55–4:21; his memorial card actually runs 3:50–3:53.x and his gameplay starts at 3:54). POV = Ibai's own stream: webcam at the right edge (bearded man, headset), a "logitech G" sponsor logo top-left that later switches to "AOC". Spanish-language client. [SEEN]
- **Exact death message [SEEN]:**
  - Memorial card (3:50–3:53): `PERMADEATH` logo, his skin face, a Latin line in script (roughly "Et hoc est infernum. Moritur an supergreditur."; the cursive is hard to read), `Ibai ha sido PERMABANEADO`, `05-04-2020 | 17:23:54 UTC`, `Muerte por CREEPER`.
  - Game-over screen: `Game Over` / `[MIEMBRO] DONIBAILLANOS fue reventado/a por Creeper` / `Puntaje: 489` (buttons "Observar mundo", "Menú principal").
  - Chat (the compilation crops the left edge of the screen by a few characters): red `…l comienzo del sufrimiento infinito de <name in red, not legible> ha comenzado. ¡HA SIDO PERMABANEADO!`, then grey `baiLlanos, Llano estás en el server, Ebay`, then `[MIEMBRO] DONIBAILLANOS fue reventado/a por Creeper`.
  - Title: `¡Permadeath!` / `DONIBAILLANOS ha muerto`.
  - Kick screen: `Se perdió la conexión` / `Has sido PERMABANEADO` / button "Volver a la lista de servidores".
- **Setting [SEEN]:** Overworld, underground. A very dark cave or mine with stone walls, a wooden-plank floor or ledge and very little light. His teammate `[MIEMBRO] 4andeR` is right next to him. The creeper approaches in near-total darkness.
- **Gear/HUD [SEEN]:** full 10 hearts right up to the death, armor bar about 8/10, full hunger, XP level 18. First hotbar slot selected (a tool, probably a pickaxe; the icon is too small to be sure). He switches to a torch (tooltip "Antorcha") a fraction of a second before dying.
- **Beat sheet:**
  1. 3:54–3:55.2 [SEEN] Dark cave. 4andeR (nametag `[MIEMBRO] 4andeR`) is working beside him on a wooden-plank ledge. A dark silhouette holding a pickaxe is visible.
  2. 3:55.5–3:56.9 [SEEN] The screen is almost black. From 3:56.6 a large dark-green blocky shape (the creeper) drifts into the centre in the darkness.
  3. 3:57.13 [SEEN] The view swings into a lit patch and the creeper is directly in front of him, filling the centre of the screen. In this footage its skin looks orange-brown with green patches (probably lighting or compression, not certain). Webcam: Ibai has his mouth wide open, shouting.
  4. 3:57.2–3:57.33 [SEEN] The creeper slides to the lower right and out of frame. Hearts are still full.
  5. 3:57.4–3:57.87 [SEEN] He turns left: stone floor, 4andeR on the ledge (white/grey skin, holding a green item), small yellow item drops on the floor. The "Antorcha" tooltip appears (he scrolled to a torch). Still 10 hearts.
  6. 3:57.93 [SEEN] It cuts straight to the red **Game Over** screen, so it was a one-shot from full health. No fuse flash or explosion frame is visible.
  7. 3:58.0 [SEEN] "Entrando al mundo…" (he clicked Observar mundo). 3:58.1–4:00.25: spectator view of a night-time Overworld in rain (purple-blue rain streaks, a river, dark trees; some orange-and-black shapes in the foreground that I can't identify). The big red **¡Permadeath!** and "DONIBAILLANOS ha muerto" appear with the chat lines.
  8. 4:01–4:14 [SEEN] Kick screen. Webcam: Ibai talks to camera, leans back, then turns away and looks to the side and down (4:07–4:14).
  9. [SUBS, speaker not identifiable; these may include teammates' voices on call] 3:54 "Voy a intentar quitar el agua. Voy a intentar quitar el agua." 4:00 "no hay que irse de aquí. Se ha vuelto ahí, tío. ¿Qué ha pasado ahí?" 4:06 "¿Qué ha pasado ahí, tío? No me jodas, tío." 4:09 "Por favor, revividle, tío." 4:11 "No me jodas, tío." 4:12 "qué petardazo le ha pegado, tío."
  10. 4:15–4:18 [SEEN] ReventXzz's memorial card, which belongs to the next chapter.
- **Frames:** `frames/06_ibai_a_creeper_in_front.jpg` (3:57.13), `frames/06_ibai_b_game_over.jpg`, `frames/06_ibai_c_permadeath_title_chat.jpg`
- **Notes/uncertainties:** The creeper is only really visible for about 0.25 s (3:57.13–3:57.33). The death happens about 0.6 s later, off-screen (behind or below him). The creeper's colour in this clip is unusual (orange-brown). I'm not claiming it is a special creeper type; the wiki just says "Creeper". The ASR "revividle / petardazo" lines may be someone else in the voice call.

### #7 — ReventXzz (G2 Reven)
- **Wiki:** death #7, 05/04/2020 17:28:08 (about 4 min after Ibai), "Muerte por Araña de Cueva", totem "No Equipado". Custom line: "Equivalente a quedarse AFK en el LOL". [WIKI]
- **Footage:** GersoonSG compilation, chapter "ReventXzz": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=255 (card 4:15–4:18, gameplay 4:19–4:43; index says 4:21–4:50). POV = ReventXzz's own stream: webcam bottom-right (young man, dark hair, headset, black jacket), "AOC" then "AORUS" logo bottom-left. Spanish client. [SEEN]
- **Exact death message [SEEN]:**
  - Memorial card (4:15): `ReventXzz ha sido PERMABANEADO` / `05-04-2020 | 17:28:08 UTC` / `Muerte por ARAÑA DE CUEVA`.
  - Game-over screen: `¡Se acabó!` / `[MIEMBRO] ReventXzz ha sido víctima de Araña de cueva` / `Puntuación: 700` (buttons "Observar mundo", "Menú principal"). The cave spider's red eyes are visible through the red overlay.
  - Chat: red `El comienzo del sufrimiento infinito de ReventXzz ha comenzado. ¡HA SIDO PERMABANEADO!`, grey `G2Reven, Partida equivalente a un AFK en el LoL`, then `[MIEMBRO] ReventXzz ha sido víctima de Araña de cueva`.
  - Title: `¡Permadeath!` / `ReventXzz ha muerto`.
  - Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / "Volver a la lista de servidores".
- **Setting [SEEN]:** Overworld, abandoned mineshaft: oak-plank support beams, cobwebs, a rail track running down a dark tunnel, stone walls, some reddish speckled blocks (granite?) and a short sloped rail or stair ramp. Torch-lit, dim. Teammates: 4andeR is nearby (green nametag `[MIEMBRO] 4an…` at 4:22 and 4:27) and AKAWonder writes in chat `<[MIEMBRO] AKAWonder> buscas algo?`. A toast "¡Nuevas recetas! Mira tu libro de recetas." sits in the top-right from 4:29.
- **Gear/HUD [SEEN]:** 10 full hearts, armor 8/10, full hunger, XP level 20. Diamond sword in hand (tooltip "Espada de diamante" at 4:21), shield in the offhand (the big grey-rimmed wooden board at bottom-left). At 4:19 his inventory is open with the tooltip "Casco de hierro" (iron helmet).
- **Beat sheet:**
  1. 4:19–4:21 [SEEN] Inventory open (iron-helmet tooltip), then he walks the mineshaft with sword and shield. Webcam: calm, looking down at the screen.
  2. 4:28–4:31 [SEEN] He stands at the top of a rail tunnel looking down it. Cobweb to the right, oak beams framing the tunnel.
  3. 4:31–4:32 [SEEN] A small dark teal spider with red eyes (cave-spider colouring) appears at the far end of the tunnel and runs straight at him along the rails.
  4. 4:32.25 [SEEN] It leaps up at crosshair height right in front of him, red eyes big on screen.
  5. 4:32.75–4:33.25 [SEEN] The camera jerks. He looks down: the cave spider is on the reddish blocks beside the rail ramp, below and in front of him.
  6. 4:33.5 and 4:34.43 [SEEN] He swings the diamond sword at it (the blade sweeps across the screen). The spider scuttles around under the crosshair and toward the shield. **Hearts still 10/10 at 4:34.73.**
  7. 4:34.77 [SEEN] The HUD vanishes and the cave spider's face fills the lower-left, red eyes glowing. The red chat lines are already printing.
  8. 4:34.8 [SEEN] **¡Se acabó!** screen, so it was a one-shot from full health. [SUBS 4:36–4:43] "me ha one shoteado. … me ha one shoteado. Me ha, o sea, tenía una espada de diamante. Me ha one shoteado."
  9. 4:35–4:37 [SEEN] Spectator view: Overworld at night in rain (purple rain streaks), a forest and a lake. **¡Permadeath!** / "ReventXzz ha muerto" plus the chat lines.
  10. 4:38–4:43 [SEEN] Kick screen. Webcam: he looks down, then leans back in his chair with one arm (white sleeve of a black varsity jacket) raised up beside his head.
  11. [SUBS, before the death] 4:19 "Araña, ¿dónde oigo araña? ¿eh? Oigo araña." 4:24 "Aquí hay una ahí dentro, creo. No, vamos a por ella, Ander." 4:29 "Espera, espera, espera." 4:30 "Ahí está. Ah, está ahí, está ahí. Ah, cuidado, cuidado. Son cuántas son." 4:34 "Hay una."
- **Frames:** `frames/07_revent_a_cave_spider_closing_in.jpg` (4:32.5), `frames/07_revent_b_spider_on_ramp_full_hp.jpg` (4:34.67, still 10 hearts), `frames/07_revent_c_death_frame_spider_eyes.jpg` (4:34.77)
- **Notes/uncertainties:** No damage hearts are ever shown going down, because the HUD goes straight from 10 hearts to death. I can't tell from the video whether the cave spider hit once or several times between 4:34.73 and 4:34.77. The subtitles say "one shot". The wiki dates the card at 17:28:08 UTC.

### #8 — AKAWonder
- **Wiki:** death #8, 06/04/2020 01:17:26, "Muerte por Blaze", totem "No Equipado". Custom line: "De noob a doble noob". [WIKI]
- **Footage:** GersoonSG compilation, chapter "AKAWonder": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=284 (card 4:44–4:48, gameplay 4:49–5:30; index 4:50–5:36). POV = AKAWonder's own stream: webcam bottom-right (bearded man with long hair tied back, headset, grey hoodie with a white logo). Spanish client with **in-game sound captions** on the right side ("Blaze respira", "Blaze dispara", "Chisporroteo de fuego", "Cubo de magma apretándose", "Hombrecerdo zombi gruñe", "Objeto caído", "Jugador herido"). [SEEN]
- **Exact death message [SEEN]:**
  - Memorial card (4:44): `AKAWonder ha sido PERMABANEADO` / `06-04-2020 | 01:17:26 UTC` / `Quemado por BLAZE`.
  - Game-over screen (visible only under "Entrando al mundo…"): `¡Se acabó!` / `[MIEMBRO] AKAWonder se ha reducido a cenizas mientras luchaba contra Blaze` / `Puntuación: 4568`.
  - Chat: red `Este es el comienzo del sufrimiento eterno de AKAWonder. ¡HA SIDO PERMABANEADO!` (the name is dark red, hard to read), grey `AKAWonder, De noob a doble noob`, then `[MIEMBRO] AKAWonder se ha reducido a cenizas mientras luchaba contra Blaze`. Note that the wording has changed from the 5 April deaths ("El comienzo del sufrimiento infinito de … ha comenzado").
  - Title: `¡Permadeath!` / `AKAWonder ha muerto`.
  - Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / "Volver a la lista de servidores".
- **Setting [SEEN]:** Nether fortress: dark nether-brick floor and walls, netherrack cave walls, a **blaze spawner** (cage with a small flame inside) on a raised area with 2–3 blazes hovering around it and fire on the ground. He has a small setup against a netherrack wall: a torch, a sign, a wooden chest and a darker chest (ender chest?). A dark wooden door or opening appears early (4:52–4:58). Red-brown, dim, fire-lit.
- **Gear/HUD [SEEN]:** armor bar full (10/10), XP level 15, hunger partly down. Diamond sword (tooltip "Espada de diamante" at 4:51), shield in the offhand (grey-rimmed board bottom-left). Hotbar includes pickaxes, the sword, a sign, two potions (tooltips "Poción de cuerpo ignífugo" = fire resistance, and "Poción de regeneración") and 56 of a food item. **He is burning from about 5:01 to the end**: the first-person fire overlay covers the lower half of the screen.
- **Hearts timeline [SEEN]:** 4:59 ≈9.5 → 5:02.5 ≈8.5 → 5:04 8 → 5:06 ≈6.5 → 5:08 ≈5.5 → 5:11 ≈4.5 → 5:13 ≈3.5 → 5:17 ≈2.5 → 5:18.5 2 → 5:20 ≈1.5 → 5:21 ≈1 → 5:21.85 half a heart → dead at 5:21.9. It's a slow burn over about 20 s, not a one-shot.
- **Beat sheet:**
  1. 4:49–4:50 [SEEN] He holds up a purple potion (tooltip "Poción de cuerpo ignífugo") in the drinking pose, then switches to the diamond sword. [SUBS 5:28, after death] "si me tomé la poción, tío." I can't see effect icons, so I can't confirm the potion took effect.
  2. 4:52–4:58 [SEEN] He faces a dark door or opening in the netherrack. A blaze flickers just behind it (yellow body, black smoke) and he strikes at it through the gap.
  3. 5:00 [SEEN] Two blazes hover above the blaze spawner, with fire on the floor beside it. Hearts nearly full.
  4. 5:01–5:02 [SEEN] A blaze is right in his face, and **the fire overlay appears: he is on fire.**
  5. 5:03–5:12 [SEEN] Close-range sword fight with several blazes: yellow rods and black smoke fill the screen (5:07, and 5:09 where a blaze face with dark eyes fills the frame). Captions "Blaze respira", "Chisporroteo de fuego", "Jugador herido". Hearts drop from about 8.5 to 4.5. [SUBS 5:06] "¿por qué me quitan tanto ahora?" [SUBS 5:10] "Me quitan mucho, me quitan mucho, me quitan mucho. Sal de aquí, sal de aquí."
  6. 5:13–5:15 [SEEN] Still burning. He switches to the potions and raises them (tooltips "Poción de cuerpo ignífugo", then "Poción de regeneración"). Hearts about 3.5. [SUBS 5:14] "Sal de aquí."
  7. 5:15.25–5:16.75 [SEEN] Two blazes hover near the spawner and a torch. Fire overlay throughout.
  8. 5:17–5:19 [SEEN] Blazes close again, black smoke. Hearts 2.5 → 2. [SUBS 5:17] "Ah, me quitan mucho."
  9. 5:19.5–5:21.87 [SEEN] He looks toward his chest-and-sign wall with the pink regeneration potion in hand, still burning. Hearts 1.5 → 1 → half a heart. [SUBS 5:20] "Muero, me muero, me muero. Me morí."
  10. 5:21.9 [SEEN] The HUD disappears and the red chat lines print over a plain netherrack view.
  11. 5:21.93–5:22.1 [SEEN] The **¡Se acabó!** screen is visible only faintly behind "Entrando al mundo…", because he clicked spectate instantly.
  12. 5:22.25–5:23 [SEEN] Spectator view in the Overworld, at night or dusk in rain (caption "Llueve"): a dirt/grass overhang and a tree trunk. **¡Permadeath!** / "AKAWonder ha muerto". Captions "Blaze muere", "Jugador muere".
  13. 5:24–5:30 [SEEN] Kick screen. Webcam: he leans back in his chair and laughs widely (5:25–5:26), then calmly eats from a bowl with a spoon (5:28–5:30). A green frog emote pops up on the stream overlay (5:30). [SUBS 5:25] "No," [SUBS 5:28] "si me tomé la poción, tío."
  14. 5:31–5:34 [SEEN] Ander's memorial card (next chapter).
- **Frames:** `frames/08_akawonder_a_blazes_spawner.jpg` (5:00), `frames/08_akawonder_b_blaze_closeup_burning.jpg` (5:09), `frames/08_akawonder_c_last_half_heart.jpg` (5:21.85)
- **Notes/uncertainties:** Whether the fire-resistance potion was actually drunk or active isn't visible, although his own words say he took it. The captions mention a magma cube and zombie pigmen, but I didn't clearly see either on screen. The death message ("se ha reducido a cenizas mientras luchaba contra Blaze") is the vanilla "burned to death whilst fighting" message, so the final damage was fire, not a direct blaze hit.

### #9 — Ander (in-game name 4andeR)
- **Wiki:** death #9, 12/04/2020 22:46:29, "Muerte por Araña", totem "Consumido". Custom line: "No es cortés irse antes de tiempo". [WIKI]
- **Footage:** GersoonSG compilation, chapter "Ander": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=331 (card 5:31–5:34, gameplay 5:35–6:07; index 5:36–6:14). POV = Ander's own stream: webcam top-left (young man, dark hair, black shirt, red and blue lights behind him), sponsor logos "AOC", "AORUS" and "logitech G" in the top-right. Spanish client with in-game sound captions on the right. [SEEN]
- **Exact death message [SEEN]:**
  - Memorial card (5:31): `Ander ha sido PERMABANEADO` / `12-04-2020 | 22:46:29 UTC` / `Muerte por ARAÑA`.
  - Advancement toast top-right `¡Objetivo! Post mort…` and chat `[MIEMBRO] 4andeR ha alcanzado el objetivo [Post mortem]` (this is the totem-use advancement).
  - Game-over screen: `¡Se acabó!` / `[MIEMBRO] 4andeR ha sido víctima de Araña` / `Puntuación: 5166` (buttons "Observar mundo", "Menú principal").
  - Chat: `[MIEMBRO] 4andeR ha alcanzado el objetivo [Post mortem]`, red `Este es el comienzo del sufrimiento eterno de 4andeR. ¡HA SIDO PERMABANEADO!`, grey `G2Ander, No es cortés irse antes de tiempo`, `[MIEMBRO] 4andeR ha sido víctima de Araña`, later `<[MIEMBRO] Hardyluski> LOL` (5:49.75).
  - Title: `¡Permadeath!` / `4andeR ha muerto`.
  - Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / "Volver a la lista de servidores". Then the server list (`Multijugador`, entry "Permadeath 1.15.2, Hospedado por @KernelFreeze, 5/40").
- **Setting [SEEN]:** Overworld, **night**, starry sky. A grassy hill above a river or lake with a sandy shore. A small camp on the sand with several burning campfires or fire blocks (flames), a tall dark obsidian-looking structure, and red and brown shapes near the fires. A teammate in diamond armor stands at the camp; his nametag looks like `[MIEMBRO] MitisyyLeDivorce` (blurry here, but the name is legible in the Felipez chapter and tab list). Phantoms are around: a big dark flying mob with green eyes at 5:37–5:39, plus captions "Fantasma se acerca", "Chillido de fantasma", "Fantasma muere". Bats and the spider are drawn with **white outlines** (like the Glowing effect). He briefly swims at 5:40 (bubbles, caption "Nadando").
- **Gear/HUD [SEEN]:** 10 full hearts, armor 10/10, XP level 21, hunger about 8/10. **Totem of Undying in the offhand slot** (golden totem icon left of the hotbar). Enchanted bow selected (tooltip "Arco", purple glint). He also scrolls past the shield (tooltip "Escudo" at 5:43). Diamond sword in slot 1.
- **Beat sheet:**
  1. 5:35–5:42 [SEEN] At night on the hill he shoots arrows at phantoms (captions "Disparo de flecha", "Impacto de flecha"). A phantom passes overhead at 5:37. He splashes through water at 5:40, then walks back up the grass toward the camp. [SUBS 5:36] "Son dos que faltan." / "Oye, son muchos."
  2. 5:43–5:43.75 [SEEN] He looks over the camp (flames on the grass or burning shapes, the teammate, the dark structure), then turns left. A spider with a white outline and red eyes comes in from the left edge. [SUBS 5:40–5:43] "Me calienta. Me calient. Un momento, Ander, tu momento" / "me calientan, ¿eh? Pero no pasa nada."
  3. 5:44–5:44.75 [SEEN] The outlined spider crosses the grass toward the crosshair while an outlined bat flutters about. He has the bow up. [SUBS 5:44] "Una araña, una araña. Eh, eh, eh, me mata."
  4. 5:44.9–5:45.2 [SEEN] The spider is right in front of him at crosshair height, its red eyes and red back markings clear, legs outlined white. Hearts still 10/10.
  5. 5:45.3 [SEEN] **One hit takes him from 10 hearts to about 4.5** (caption "Jugador herido"). The camera jerks toward the camp and the spider is no longer on screen.
  6. 5:45.4 [SEEN] His inventory/crafting screen flashes open for a moment, then closes.
  7. 5:45.5–5:46.1 [SEEN] He looks toward the camp (teammate in diamond armor, campfire, an oxeye daisy in the grass). The hearts flash at about 4.5, then about 3.5. An outlined bat flies by at the left. Caption "Chillido de fantasma". [SUBS 5:46] "Lárgate, lárgate, lárgate, lárgate."
  8. 5:46.2 [SEEN] **TOTEM POPS**: the totem of undying image rises big in the centre of the screen and green and yellow particles burst around him. Captions "Tótem activado" and "Siseo de araña" (the spider is still hissing beside him). Hearts drop to 1 red heart, the rest flashing white. Chat and toast show the "Post mortem" advancement.
  9. 5:46.3–5:47.55 [SEEN] The totem animation fills the centre of the screen while green and yellow particles keep bursting. Behind it you can see the diamond-armored teammate at the upper left and the campfire. He scrolls the hotbar (a "… de diamante" tooltip, partly hidden). Hearts about 1–1.5.
  10. 5:47.6 [SEEN] **¡Se acabó!** "4andeR ha sido víctima de Araña". The totem image still shows faintly behind the red overlay. So he died about 1.4 s after the totem saved him, and the final spider hit isn't visible because the totem animation covers the screen.
  11. 5:47.8–5:49.9 [SEEN] Spectator view: first dark, then the inside of a stone-brick/cobblestone building with glass, torches, a villager, yellow blocks and a brewing stand (caption "Burbujas de un soporte para pociones"). **¡Permadeath!** / "4andeR ha muerto". Captions "Aldeano murmura", "Vagoneta rodando", "Blaze muere", "Jugador muere".
  12. 5:50–6:07 [SEEN] Kick screen, then the server list. Webcam: he stares at the screen, then puts his hand over his mouth (6:05–6:07). [SUBS 5:51] "No me lo puedo creer." [SUBS 5:54–6:01] "Lárgate, lárgate, … Muévete al agua. A nadar al agua. A nadar al agua." (speaker unclear, possibly teammates on call)
  13. 6:08–6:13 [SEEN] LiliCross's memorial card and text, which belong to the next chapter (the index starts LiliCross at 6:14).
- **Frames:** `frames/09_ander_a_spider_in_front.jpg` (5:45.2), `frames/09_ander_b_totem_pops.jpg` (5:46.6), `frames/09_ander_c_se_acabo.jpg` (5:47.65)
- **Notes/uncertainties:** The spider is a normal (large) spider. The death message says "Araña", not "Araña de cueva". Its white outline suggests the Glowing effect, but I can't see where that came from. The "burning" shapes near the camp could be fire blocks or burning mobs; I can't tell. The teammate's name is blurry. Who says "Lárgate…" and "A nadar al agua" is unclear.

---

## Days 25–30 (#10–#18)

---

### #10 — LiliCross (AFK ban)
- **Wiki:** death #10, 19/04/2020 15:03:00, "Ban por AFK". She agreed with the admin to be banned for inactivity because she would not be able to play in the coming days. It is the only AFK ban that did not happen at 00:00:00. [WIKI] Her player page says she is a nurse and left because of her COVID-19 workload. [WIKI: permadeath-wiki__Lilicross.txt]
- **Footage:** GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=368 (6:08–6:16; the index says 374–384, but 377+ is already Rubik's card). There is **no gameplay and no death**. [SEEN]
  - 6:08–6:11: ban card with a grey/white pixel skin face: `LiliCross ha sido PERMABANEADA` / `19-04-2020 | 15:03:00 UTC` / `Baneada por AFK`. [SEEN]
  - 6:12–6:16: black card with white text: `lilicross fue baneada debido a que ya no tenia tiempo para jugar por ello solicito el ban, ya que si no, iria en contra de las reglas.` [SEEN]
- **Frames:** `frames/10_lilicross_a_ban_card.jpg`, `frames/10_lilicross_b_text_card.jpg`
- **Notes/uncertainties:** Nothing to animate beyond the card. The 6:06–6:07 shot just before it (a server list with a small webcam) is the tail of the Ander chapter, not Lili.

---

### #11 — Rubik (RubikYT)
- **Wiki:** death #11, 19/04/2020 17:35:13, "Muerte por Araña de Cueva", totem "Consumido". Day 25. [WIKI] Player page: he was farming the netherite helmet from the day-25 cave spiders (5 forced potion effects) with an improvised spawner farm. While he was swapping a block for a stair, a spider got into his safe area. He panicked, lost a totem, and the poison plus a few more hits killed him. [WIKI: permadeath-wiki__RubikYT.txt]
- **Footage:**
  - Main: GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=377 (card 6:17–6:20, gameplay 6:21–6:53). POV = Rubik's own stream: webcam top-right with an "RK" logo, "META / Sub goal: 8/15" box top-left, English game UI. [SEEN]
  - Supplementary: "PERMADEATH MUERTE RUBIK + REACCIÓN HARDY Y RICH" https://www.youtube.com/watch?v=ZrrSQuVLYQA&t=0 (60 s, same POV). It adds about 35 s of lead-up before the compilation starts. Sup 0:36 ≈ compilation 6:21, and sup 0:48 = the Game over. The downloaded file shows no Hardy/Rich reaction; it ends on Rubik's ban screen. [SEEN]
- **Exact death message [SEEN]:**
  - Game-over screen (6:33.5): `Game over!` / `[MIEMBRO] RubikYT was slain by Cave Spider` / `Score: 19415`.
  - Chat (6:35): `[MIEMBRO] RubikYT has reached the goal [Postmortal]` / red `Este es el comienzo del sufrimiento eterno de RubikYT. ¡HA SIDO PERMABANEADO!` / grey `RubikYT, Muere en el PvE otra vez` / `[MIEMBRO] RubikYT was slain by Cave Spider` / `<[MIEMBRO] Kakytron> GG`.
  - Title: `¡Permadeath!` / `RubikYT ha muerto`. Kick screen: `Connection Lost` / `Has sido PERMABANEADO` / "Back to server list".
  - Ban card: `RubikYT ha sido PERMABANEADO` / `19-04-2020 | 17:35:13 UTC` / `Muerte por ARAÑA DE CUEVA`.
- **Setting [SEEN]:** Overworld, underground. Cave/mineshaft walls of stone, gravel and cobblestone, with oak planks/fence posts (mineshaft timber). A **mob spawner cage wrapped in cobwebs** sits on a ledge, with cobblestone-stair blocks he placed around it. Dim, no daylight.
- **Mobs [SEEN]:** The cave spiders are mostly **not visible as bodies**. What you see:
  - **White line-art outlines** of spiders (Glowing-effect style), several at once, clustered around the spawner and showing through walls.
  - **Clusters of small red squares** that look like spider eyes floating with no body. This is consistent with invisible spiders.
  - Green and red potion-swirl particles.
  - In the supplementary (sup 0:06), one white spider outline shows **red eyes** inside it.
  - Some spiders are **on fire** (orange flame sprites with teal cave-spider texture showing through, 6:24–6:31). They are presumably being lit by his sword, but no enchantment tooltip is visible.
- **Gear/HUD [SEEN]:** Armor bar 10/10. Hunger full. XP level 16. **Off-hand: Totem of Undying** (held in his left hand, and in the off-hand slot left of the hotbar). Hotbar from left: Diamond Pickaxe, Bow, Diamond Sword, cobblestone stairs (later empty), a purple splash potion (tooltip "Splash Potion of Healing" shows at 6:33), Golden Carrot ×39, a purple Shield, then pink/magenta potions (one is "Splash Potion of Swiftness"). In the supplementary inventory screens (sup 0:08, 0:15–0:24) a **Poison** status effect is already active. Tooltips there: "Potion of Fire Resistance", "Totem of Undying", and a Diamond Pickaxe with Efficiency IV, Mending, Silk Touch, Unbreaking III.
- **Beat sheet (compilation timestamps unless marked "sup"):**
  1. sup 0:00–0:35 [SEEN] Lead-up: he is building around the spawner with cobblestone stairs. White spider outlines crawl on the walls (sup 0:05–0:07: a big outline with red eyes right in front of him). He opens his inventory several times (Poison active, handling totems and potions) and swings his sword at a burning spider (sup 0:10–0:11). [SUBS sup 0:16] "que pasa yo por favor el miedo que pasado era porque no tenía la espada cerca ya no tenía la espada en la mano porque uso eso para el pico" [SUBS sup 0:27] "pieza de araña de coca no tengo dos cascos"
  2. 6:21.25 [SEEN] He holds cobblestone stairs and looks at the cobweb-wrapped spawner. Hearts about 9.5/10. [SUBS 6:21] "de cueva. No sabía que iba a ser tan útil." [SUBS 6:25] "Siempre está bien tener algo preparado."
  3. 6:22.0–6:22.75 [SEEN] Several spiders come out of the spawner area: white outlines, green swirl particles and a cluster of floating red eye-squares heading at him. His hearts flash (hit) and drop to about 4 by 6:23.5. He switches to the Diamond Pickaxe, then the Diamond Sword (6:23.5).
  4. 6:23.75–6:25.5 [SEEN] He fights in a narrow stone corridor: a burning spider jumps at the crosshair, big close-up flames with teal pixels (6:24.5), teal hit particles. **Hearts turn yellow-green** (poisoned), about 4 hearts.
  5. 6:26.0–6:26.5 [SEEN] More burning spiders at point-blank range. He swaps between pickaxe and sword. Hearts are down to about 1.5.
  6. **6:26.75 [SEEN] Totem pops**: a big green flash fills the right half of the screen, and the totem figure rises in the centre with green and yellow star particles (6:26.75–6:28.25). The off-hand slot is now empty. Chat: `[MIEMBRO] RubikYT has reached the goal [Postmortal]`, plus a "Goal Reached!" toast top-right.
  7. 6:28.5–6:31.75 [SEEN] He keeps swinging at burning, glowing-outlined spiders by the spawner. One burning spider fills the screen at 6:30.0–6:30.25. A dark-red heart-shaped particle floats by (6:29.25). Hearts hover around 1–2 (poison colour).
  8. 6:32.0–6:33.3 [SEEN] He looks down at the corridor floor. Only **pink/red swirl particles** are near the crosshair; no spider body is visible. He scrolls the hotbar (tooltips Diamond Pickaxe → Bow → Golden Carrot → Splash Potion of Swiftness → Shield) and raises the purple **Shield** at 6:33.0–6:33.25. About 1 heart left. [SUBS 6:31] "ay, Dios. Rubik, Rubik, Rubik, Rubik, tío." [SUBS 6:34] "No, Rubik, no, tío, no, tío."
  9. 6:33.55 [SEEN] Cut to the red **Game over!** screen. 6:33.65 "Joining world…" (Spectate).
  10. 6:34–6:35 [SEEN] **¡Permadeath!** / "RubikYT ha muerto" over a night view (location not identified): wooden dock and boardwalk with torches over dark blue water, a stone wall and a green-topped build behind. At 6:35 the webcam shows both his hands over his face.
  11. 6:36–6:53 [SEEN] Mojang loading screen, then the kick screen. Webcam: hands on his head, leaning back, then a rueful smile and looking down (6:48–6:53). [SUBS 6:40] "Rubik tenía las pociones. Estaba Rubik, tenía las pociones. Las podría haber tirado, pero me he puesto nervioso." [SUBS 6:50] "Oh, Rubik, ¿qué?" [SUBS sup 0:52] "no yo no tenía las posiciones estaba"
- **Frames:** `frames/11_rubik_a_invisible_spider_eyes.jpg` (red eye-squares and outlines at the spawner), `frames/11_rubik_b_totem_pop.jpg`, `frames/11_rubik_c_gameover.jpg`, `frames/11_rubik_d_permadeath_title.jpg`
- **Notes/uncertainties:**
  - The final hit is not visible. At the moment of death only swirl particles are on screen, consistent with an invisible spider.
  - The "white outline + red eyes, no body" reading is my interpretation: Glowing + Invisibility effects on the effect spiders.
  - ASR writes "Rubik" several times in lines where he seems to be talking in first person ("me he puesto nervioso"). The supplementary's ASR renders the same line as "no yo no tenía las posiciones". Treat the "Rubik" words as a likely ASR error or unknown speaker.
  - The mineshaft is my inference from the planks and fences. The wiki only says "granja improvisada".

---

### #12 — Zeling
- **Wiki:** death #12, 20/04/2020 01:58:13, "Muerte por Magma Cube", totem "Consumido". Day 26. [WIKI] The OmniRich page says she died "aplastada por un Giga Magmacube" and that Th3Antonio later lost her head (player head) in lava. [WIKI: pdwiki_OmniRich.txt] Totems used: 1 (Giga Magmacube). [WIKI: pdwiki_Permadeath.txt]
- **Footage:** GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=414 (card 6:54–6:57, gameplay 6:58–7:26). POV = the victim's own stream (it ends on her own ban screen):
  - female streamer webcam top-right (long brown hair, dark clothes, plush toys behind her);
  - Permadeath logo top-left;
  - overlay text "Last Sub: lakshartnia";
  - a sponsor box bottom-right (Nike, later "ozone");
  - the **F3 debug screen is open** (the_nether, Day 2190 local difficulty line, etc.);
  - Spanish UI.
  - The in-game name in every death line is **"MitisyyLeDivorce"**, not "Zeling". [SEEN]
- **Exact death message [SEEN]:**
  - No death screen is visible. It cuts straight from gameplay (7:10.0) to "Entrando al mundo…" (7:10.08).
  - Chat (7:10.6): `<[MIEMBRO] Shadoune666> QUE ESTA PASABNDO` / red `Este es el comienzo del sufrimiento eterno de [name unreadable]. ¡HA SIDO PERMABANEADO!` / grey `[name unreadable] …in descansa en paz.` / `[MIEMBRO] MitisyyLeDivorce ha sido víctima de Cubo de magma`.
  - Title (7:10.5–7:11.9): `¡Permadeath!` / `MitisyyLeDivorce ha muerto`.
  - Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / "Volver a la lista de servidores".
  - Ban card: `Zeling ha sido PERMABANEADA` / `20-04-2020 | 01:58:13 UTC` / `Muerte por MAGMA CUBE` (white skin face with small dark eyes).
- **Setting [SEEN]:** **Nether** wastes: a wide netherrack plain covered in dozens of burning fire patches, netherrack pillars, lavafalls, lava streams and a lava lake to her right. Orange glow, no sky.
- **Mobs [SEEN]:**
  - 6:58: a group of zombie pigmen with white F3 hitbox wireframes.
  - From 7:06: small **orange, flame-textured cubes with a black pixel pattern** hopping among the fires. F3 names the targeted entity `minecraft:magma_cube` at 7:07.8 and 7:08.3, so these are magma cubes.
  - A giant cube is never clearly framed (see 7:09.1).
- **Gear/HUD [SEEN]:** Armor 10/10. Hunger full. XP level 39. **No off-hand item and no totem visible.** Main hand holds a golden/yellow food-like item (stack of 31, unidentified). Hotbar from left: diamond pickaxe, diamond shovel, bow, [selected: the gold item ×31], diamond sword, 13 teal items (ender pearls?), 59 netherrack, 2 pink potions. Health about 4 hearts at 6:58.5, rising to about 6.5 by 7:01.5 (a pink swirl particle is seen at 6:59/7:01).
- **Beat sheet:**
  1. 6:57–7:01 [SUBS 6:57] "Me ha quitado el tótem. Me han quitado el tótem, tío." [SUBS 7:01] "Necesito ayuda, por favor." [SEEN] She is tunnelling and walking through netherrack at low health (about 4 → 6.5 hearts).
  2. 6:58–6:59 [SEEN] Out in the open: fires, a lavafall, zombie pigmen with hitboxes.
  3. 7:02–7:05 [SEEN] She runs across the fire-dotted netherrack plain towards the lava lake. Big fire sprites pass close to the camera. [SUBS 7:04] "Estoy yendo, pero" / "Oh, Dios, es que no se puede." [SUBS 7:08] "Si no has querido gastar, voy a morir yo ahora, pero voy ayudarte." (speaker(s) unclear; sounds like voice chat with a teammate)
  4. 7:06.25 [SEEN] A burning, black-patterned magma cube is right in front of her. Hearts flicker around 6.5.
  5. 7:07–7:08.5 [SEEN] She sprints along the lava-lake shore (lava surface to the right). F3 shows `minecraft:magma_cube` targeted.
  6. 7:08.6–7:09.0 [SEEN] A magma cube is point-blank in front of her. **Hearts flash (hit)** twice and she is at about 6 hearts.
  7. **7:09.1 [SEEN]** The lower half of the screen is filled by a big orange mass with a black pixel pattern: something large right against the camera. This matches a Giga Magmacube (per wiki), but it could be lava surface. 7:09.2–7:09.35: black smoke puffs and flames at the bottom of the screen.
  8. 7:09.4–7:09.95 [SEEN] **Hearts drop to about 1.** Bright orange blocks fill the bottom of the frame. Shadoune666's chat line appears.
  9. 7:10.0–7:10.08 [SEEN] Straight cut to "Entrando al mundo…" (Spectate), then **¡Permadeath!** over a daytime Overworld view from above: a stone-brick wall, green blocks and a vertical green beam.
  10. 7:12–7:26 [SEEN] Mojang loading screen, then the kick screen. Webcam: she puts a hand over her mouth, covers her face and looks down.
- **Frames:** `frames/12_zeling_a_nether_lava_fires.jpg`, `frames/12_zeling_b_burning_lowhp.jpg`, `frames/12_zeling_c_permadeath_title.jpg`, `frames/12_zeling_d_ban_screen.jpg`
- **Notes/uncertainties:**
  - The Giga Magmacube is never cleanly visible. The "crushed" beat rests on the wiki plus the orange mass at 7:09.1.
  - The totem was apparently lost before this clip ("Me ha quitado el tótem"). No totem pop is shown.
  - The death screen was skipped or too fast to see.
  - The custom grey line is only partly legible. The wiki lists Zeling's line as "Ahora descansa en paz".
  - The "MitisyyLeDivorce" nick vs. "Zeling" is an open point. The date, time and cause on the card match the wiki's Zeling entry.
  - **Cross-check with #5 Felipez:** `[MIEMBRO] MitisyyLeDivorce` is the diamond-armored third player next to Felipez and Th3Antonio when Felipez dies (#5). [DOC 4:30] says Felipez went to rescue "Celling [Zeling] y Antonio", and the OmniRich wiki page calls Zeling Th3Antonio's "amada". So MitisyyLeDivorce = Zeling fits everything. The blurry teammate in #9 Ander may also be her (unconfirmed).

---

### #13 — Tonacho
- **Wiki:** death #13, 20/04/2020 14:30:30, "Muerte por Slime", totem "Consumido". Day 26 ("GigaSlime"). [WIKI] Totems used: 1 (Giga Slime). [WIKI: pdwiki_Permadeath.txt]
- **Footage:** GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=447 (card 7:27–7:31, gameplay 7:32–8:36). POV = Tonacho's own stream:
  - webcam bottom-right (short dark hair, beard, light T-shirt, headset);
  - social-handle banner top-right (Twitter "@TONACHO", YouTube "TONACHO", Instagram "TONACHO69");
  - a small panel at the left edge (a list including "MARK_SPACE");
  - English UI with on-screen **sound subtitles** in the right column.
  - [SEEN]
- **Exact death message [SEEN]:**
  - Game-over screen (7:49.75): `Game over!` / `[MIEMBRO] tonacho was slain by Slime` / `Score: 14928` ("Spectate world", "Title screen").
  - Chat (7:50.6): `…has reached the goal [Postmortal]` / red `Este es el comienzo del sufrimiento eterno de [name]. ¡HA SIDO PERMABANEADO!` / grey `tonacho, Le han puesto mirando a Cuenca` / `[MIEMBRO] tonacho was slain by Slime` / `<[MIEMBRO] Kakytron> LOL`.
  - Title: `¡Permadeath!` / `tonacho ha muerto`. Kick screen: `Connection Lost` / `Has sido PERMABANEADO` / "Back to server list".
  - Card: `Tonacho ha sido PERMABANEADO` / `20-04-2020 | 14:30:30 UTC` / `Muerte por SLIME`.
- **Setting [SEEN]:** Overworld at **dawn**: dark blue sky, a pink/orange glow on the horizon, the moon visible at 7:33. Dark water channels, grass, and trees with drooping vines, consistent with a swamp. [SUBS 8:20] "En el pantano, macho." [SUBS 8:24] "Sí, amaneciendo".
- **Mobs [SEEN]:**
  - **Giant slimes**: huge green translucent cubes with dark eyes and mouth, filling half the screen. From 7:49.25 two are seen at once.
  - When hit, a slime turns **brownish**, consistent with the red damage flash on green.
  - Creepers: one on a hillside at 7:39, one on his path at 7:43.25–7:43.5, one at the left edge near the slimes at 7:47.0 and 7:49.25.
  - Sound subtitles over the clip: "Creeper hurts", "Creeper hisses", "Slime hurts", "Skeleton rattles", "Totem activates", "Water flows", "**Explosion**" (newest line at 7:49.4).
- **Gear/HUD [SEEN]:** Armor 10/10. Hunger full. XP level 14. **Off-hand: Totem of Undying** (left hand and off-hand slot). Main hand: Diamond Sword with a purple enchant glint. Hotbar from left: diamond sword, diamond sword (selected), diamond pickaxe, bow, netherrack ×64, a gold item ×52, pink potion, **a second totem (slot 8)**, pink potion. The second totem is never moved to the off-hand.
- **Beat sheet:**
  1. 7:32–7:41 [SEEN] He walks and sprints along a stream at dawn with the sword out. Full 10 hearts. A creeper is up on the right-hand hill (7:39). [SUBS 7:35] "no te mueras, no te mueras, no te mueras, no te mueras." [SUBS 7:38] "Venga. Buah, bua, la araña." [SUBS 7:42] "Bua, esa araña, chaval."
  2. 7:42–7:45.5 [SEEN] He is taking damage while moving: hearts 10 → about 8.5 (7:43.3) → 7 (7:44) → 5.5 (7:45.5). Subtitles "Creeper hurts / Creeper hisses". A creeper is on the path ahead (7:43.25). [SUBS 7:44] "Dios, Dios, Dios."
  3. 7:45.75–7:46.25 [SEEN] A **giant green slime** looms at top-left. He scrolls to the Bow, then to Netherrack (tooltip "Netherrack"). Hearts about 4. Subtitle "Slime hurts".
  4. 7:46.5–7:47.25 [SEEN] The screen is filled by a big brownish cube face (a slime flashing on hit), then a green slime face dead centre with a creeper at the left. Hearts crash to about 1.5 → 0.5. [SUBS 7:46] "No, no, no, no, no, no, no, no. Hijo de [ __ ]" [SUBS 7:49] "que me mata, me mat."
  5. **7:47.5–7:49.0 [SEEN] Totem pops**: the totem figure fills the centre with green and yellow diamond particles, "Totem activates" subtitle, chat `[MIEMBRO] tonacho has reached the goal [Postmortal]`, "Goal Postmortal" toast top-right. The off-hand slot is now empty. Hearts about 0.5–1. The slime keeps pressing in (brownish flashing face behind the totem at 7:48.5–7:49.0).
  6. 7:49.25–7:49.6 [SEEN] Two giant green slimes side by side fill the view, a creeper at the lower left. "**Explosion**" appears as the newest subtitle (7:49.4). Half a heart.
  7. 7:49.75 [SEEN] Red **Game over!** screen. The webcam shows him still looking at the screen. 7:50.0 "Joining world…".
  8. 7:50.25–7:51.75 [SEEN] Spectator view inside a stone/cobblestone room (location not identified; red block row, chests, torches, a door, a crafting table and furnace), with the **¡Permadeath!** title. The webcam shows him **throwing both hands up to his head** (7:50.75).
  9. 7:52–8:02 [SEEN] Mojang loading screen, then "Connection Lost". Hands on his head, then head down. [SUBS 7:53–8:07] "Dios, chaval. Pero qué pasada, tío. Pero qué [ __ ]… Pero qué [ __ ]"
  10. 8:03–8:36 [SEEN] Multiplayer server list (Mundo Chiquito, LebrelCraft, EliteCraft, Karnaland, PERMADEATH). He talks it over with someone. [SUBS 8:14] "Tonacho, ¿qué ha pasado?" / "¿Qué ha pasado? Pues que he muerto." [SUBS 8:20] "Un slime gordo, tío. En el pantano, macho." [SUBS 8:24] "En el pantano. Sí, amaneciendo y me han hecho combo flecha. He muerto. He muerto. He muerto como una perra. Al menos está en directo. Vale, han sido nada, llevo 5 minutos de directo."
- **Frames:** `frames/13_tonacho_a_giant_slime.jpg`, `frames/13_tonacho_b_totem_pop.jpg`, `frames/13_tonacho_c_two_slimes_lasthit.jpg`, `frames/13_tonacho_d_gameover.jpg`
- **Notes/uncertainties:**
  - No spider is visible anywhere. The ASR "la araña" lines may be mis-transcribed.
  - Sources of the early damage: "combo flecha" (skeleton arrows, per his own account, with a "Skeleton rattles" subtitle) and creepers ("Creeper hurts/hisses"). No arrow or skeleton is actually seen in frame.
  - An "Explosion" subtitle appears about 0.35 s before death, but the game credits the Slime.
  - The brown slime tint is read as a damage flash (my interpretation).

---

### #14 — Perxitaa (AFK ban)
- **Wiki:** death #14, 24/04/2020 00:00:00, "Ban por AFK" (day 30). [WIKI]
- **Footage:** https://www.youtube.com/watch?v=vYTcFdeAxE0&t=517 (8:37–8:45). **No gameplay.** [SEEN]
  - 8:37–8:40: ban card with a dark-grey/white skin face: `Perxitaa ha sido PERMABANEADO` / `24-04-2020 | 00:00:00 UTC` / `Baneado por AFK`.
  - 8:41–8:45: black card: `Perxitaa no mostro actividad asi que fue Permabaneado`.
- **Frames:** `frames/14_perxitaa_a_ban_card.jpg`, `frames/14_perxitaa_b_text_card.jpg`

---

### #15 — AlexElCapo (AFK ban)
- **Wiki:** death #15, 24/04/2020 00:00:00, "Ban por AFK" (day 30). [WIKI]
- **Footage:** https://www.youtube.com/watch?v=vYTcFdeAxE0&t=526 (8:46–8:54). **No gameplay.** [SEEN]
  - 8:46–8:49: ban card with a dark-grey skin face with white eyes: `AlexElCapo ha sido PERMABANEADO` / `24-04-2020 | 00:00:00 UTC` / `Baneado por AFK`.
  - 8:50–8:54: screenshot of three tweets by **Alexelcapo @EvilAFM**:
    - (11h) "Todos tranquilos. Entré el otro día a conseguir la armadura, podría seguir jugando pero lo hemos hablado y como no me apetece seguir que me baneen ya y listo. Me lo pasé genial los 10 primeros días, solo por eso fue worth. Ale, pasadlo biene ;)"
    - (3h) "Un par de detalles. Cuando se me invitó a este server ya dije que jugaría cuando me apeteciera, que no me gusta nada tener obligaciones y el día que empezamos en directo dije exactamente lo mismo en directo."
    - (3h) "\"Pero entonces que inviten a gente que si quiera jugar\" ya bueno pero es que a tu colega no le quiere ver nadie, que pareces tonto."
- **Frames:** `frames/15_alexelcapo_a_ban_card.jpg`, `frames/15_alexelcapo_b_tweets.jpg`
- **Notes:** A voluntary ban, per his tweet. The wiki's totem table lists 1 totem used by AlexElCapo (to a fall) earlier in the series. [WIKI: pdwiki_Permadeath.txt]

---

### #16 — OutConsumer
- **Wiki:** death #16, 24/04/2020 13:38:31, "Muerte por Pollo" (a chicken), totem "Consumido". Day 30, the day of the dragon event. [WIKI] Background rule since day 20: "Todos los mobs pacíficos son ahora agresivos". [WIKI: permadeath__Cambios_de_dificultad.txt]
- **Footage:** **No death footage exists in the compilation.** https://www.youtube.com/watch?v=vYTcFdeAxE0&t=535 (8:55–9:58). [SEEN]
  - 8:55–8:58: ban card with a white/grey skin face: `Outconsumer ha sido PERMABANEADO` / `24-04-2020 | 13:38:31 UTC` / `Muerte por POLLO`.
  - 8:59–9:58: a later stream of his playing **MLB The Show 20** (Diamond Dynasty, "HONOLULU RUPAS / OUTCONSUMER at LOS ANGELES DODGERS", Dodger Stadium). Webcam bottom-left: bearded man, headset, orange/black gaming chair. Stream alerts ("¡BlueKeldeo me sigue al fin del mundo!", "¡clon198 se ha convertido en un rupas!" with a GIF of a smiling basketball player). He talks through the death while in menus.
  - Supplementary tried: "Permadeath muerte por un pollo (Outconsumer)" https://www.youtube.com/watch?v=veU5BYpTKdA&t=0 (22 s). It is **only** a text card ("no hay clip / pero muerte por / un pollo / RIP / outconsumer", 0:00–0:07) plus the same ban card (0:08–0:21). No gameplay. [SEEN] A second video already on disk, Pabl0WL "PERMADEATH MUERTE OUTCONSUMER + EXPLICACIÓN" https://www.youtube.com/watch?v=sNUN7IudvV4 (description: "EXPLICA el como ha sido debido a que no hay clip"), was used for its transcript only; no video was viewed.
- **Exact death message:** Not seen anywhere. Only the card text "Muerte por POLLO". [SEEN]
- **His own account (for the animator; everything here is [SUBS], none of it is seen):**
  - Compilation [SUBS 8:59] "Yo estaba intentando subir dificultad, o sea, subir experiencia para esta tarde, porque teníamos que tener experiencia para encantar toda la armadura y todo."
  - [SUBS 9:06] "Iba haciendo muchas cosas, ya me he aburrido, digo, pues les voy a dar de comer a los pollos porque así por lo menos hago algo. Pero claro, me he quitado la armadura porque eh me he quitado la armadura porque así sumo más sumo más experiencia porque la armadura eh como tiene mending, pues me costa más. Entonces, me quito la armadura."
  - [SUBS 9:25] "estaba ahí dándoles de comer a los pollos y me he caído. Entonces, el momento de caer han empezado a atacarme. He huido en lugar de girarme y pegarles una [ __ ] yo".
  - [SUBS 9:37] "en lugar de girarme y matarlos, que es lo que tendría que haber hecho, pues he intentado escapar. Al estar escapando me ha saltado el tótem y nada, me han seguido pegando y me he muerto. Ya está, no tiene más."
  - [SUBS 9:50] "Había 10 y cada uno te saca, creo que son, te quita como dos corazones de cada golpe."
  - sNUN7IudvV4 [SUBS 0:01:40–0:02:26] "he ido a darle comida a los pollos de los pollos son diez pollos y os recuerdo que en la dificultad que estamos los pollos atacan … un pollo sin armadura yo creo que te quita dos corazones y medio cada ataque del pollo y había diez … llevaba el tótems y en lugar de girar me y matarlos pues mi instinto ha sido [huir] y al huir he subido y he abierto un hueco para empezar a subir pero … no he tenido tiempo de ponerme otro tótem"
  - sNUN7IudvV4 [SUBS 0:02:43] "les estaba dando la comida pero estaba como muy arriba entonces me intentado poner más cerca y he caído".
  - sNUN7IudvV4 [SUBS 0:00:17–0:00:50]: it was not a bug and he was not AFK; he had taken his armour off to repair/gain XP.
- **Frames:** `frames/16_outconsumer_a_ban_card.jpg`, `frames/16_outconsumer_b_baseball_stream_explaining.jpg`
- **Notes/uncertainties:** No visual reference exists for the death itself. Any animation would have to be built from his verbal account:
  - no armour, fell down into a chicken pen with 10 chickens;
  - fled upward by digging a hole instead of fighting;
  - the totem popped and there was no time to equip another.

  Setting, pen layout and time of day are all unknown.

---

### #17 — RanguGamer
- **Wiki:** death #17, 24/04/2020 17:20:36, "Muerte por Silverfish de la Muerte", totem "No Equipado". Day 30. [WIKI] Day-30 rule: "Los Silverfish tienen 5 efectos de la misma lista que las Arañas." [WIKI: permadeath__Cambios_de_dificultad.txt]
- **Footage:** https://www.youtube.com/watch?v=vYTcFdeAxE0&t=599 (card 9:59–10:02, gameplay 10:03–10:31). POV = Rangu's own stream:
  - webcam top-left (cap, beard, headset);
  - donation ticker top-right ("HolmesOldDarkluffi: €3…") and bottom-right ("Joshu: €1.00");
  - Spanish UI;
  - centre-screen storm timer "Quedan 03:37:08 de tormenta" counting down.
  - [SEEN]
- **Exact death message [SEEN]:**
  - Death screen (10:18.2): `¡Se acabó!` / `[CONTROL] RanguGamer ha sido víctima de Silverfish de la Muerte` / `Puntuación: 2812` (last digit hard to read).
  - Chat (10:18.75): red `Este es el comienzo del sufrimiento eterno de RanguGamer. ¡HA SIDO PERMABANEADO!` / grey `RanguGamer, Comer niños no le confirió vida eterna` / `[CONTROL] RanguGamer ha sido víctima de Silverfish de la Muerte` (mob name in yellow) / `Tu cama ya no está o se encuentra obstruida`.
  - Title: `¡Permadeath!` / `RanguGamer ha muerto`. Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / "Volver a la lista de servidores".
  - Card: `RanguGamer ha sido PERMABANEADO` / `24-04-2020 | 17:20:36 UTC` / `Muerte por SILVERFISH DE LA MUERTE`.
- **Setting [SEEN]:** Overworld **stronghold**: stone-brick, mossy and cracked stone-brick rooms and corridors, oak doors, stone-brick stairs, a chest (which he opens at 10:06), torches he places on the floor. Evenly lit by his torches.
- **Mob [SEEN]:** The silverfish body is **never visible**. Instead:
  - small **white glowing outlines** float or crawl on the walls (Glowing-effect style, as in Rubik's chapter);
  - an oval blob near the chest (10:09–10:12);
  - a spiky, segmented outline and an elongated outline on the corridor walls (10:13.5–10:15.25, 10:17, 10:18);
  - a white fuzzy particle at a wall edge (10:14).
- **Gear/HUD [SEEN]:** Armor 10/10. Full hearts at the start. Hunger full. XP level 6. **Off-hand: a plain shield (no totem)**. Holding a torch. Hotbar from left: purple-glint sword, diamond sword, pickaxe (tooltip "Pico de hierro" when selected), bow ("Arco"), cobblestone ×50, golden apples ×4, bucket, torches ×26→23 (selected), ×56 food item.
- **Beat sheet:**
  1. 10:03–10:08 [SEEN] He explores a stronghold room, opens and closes a chest, places torches. Full health. [SUBS 10:05] "Hay otro" [SUBS 10:10] "hay habitación no hay" [SUBS 10:13] "abajo, eh."
  2. 10:09–10:12 [SEEN] A small room with a door and a chest. A small **white outlined blob** floats near the chest and follows his view. He turns around and walks back through the door into a corridor, placing a torch.
  3. 10:13.5–10:15.0 [SEEN] In the corridor, white spiky and elongated outlines sit on the wall to his right. He places torches.
  4. **10:15.25 [SEEN]** One hit takes him **from 10 to about 4.5 hearts** with no visible attacker; the camera is facing a wall corner. 10:15.5 the hearts flash.
  5. 10:15.5–10:16.75 [SEEN] He spins around looking for it: down at the floor, up at the doorway. About 4.5 hearts. He switches to the pickaxe ("Pico de hierro").
  6. 10:17.0–10:18.0 [SEEN] He switches to the **bow** ("Arco") and the purple bow appears raised at the right. A white outline is visible up by the chest top and the wall.
  7. **10:18.2 [SEEN]** He dies from about 4.5 hearts. Cut to the red **¡Se acabó!** screen, instantly overlaid by "Entrando al mundo…". [SUBS 10:19] "Ah, me mató." [SUBS 10:21] "Qué mal, tío. No me dio tiempo. Me quería poner el escudo, pero me confundí."
  8. 10:18.75–10:20 [SEEN] Spectator view at night in **rain**: a grassy hillside with a torch and a stream (the storm). **¡Permadeath!** "RanguGamer ha muerto".
  9. 10:20–10:31 [SEEN] Mojang loading screen, then the kick screen. The webcam shows him laughing and talking. A donation alert pops up (anime-girl card "¡Tranquilos! La sangre es rosa / xzerxe nos ha tranquilizado", 10:28–10:31). [SUBS 10:28] "Cer la puerta." [SUBS 10:31] "Lo siento."
- **Frames:** `frames/17_rangu_a_stronghold_room.jpg`, `frames/17_rangu_e_glowing_outline_wall.jpg` (white outlines on the corridor wall), `frames/17_rangu_b_after_first_hit.jpg`, `frames/17_rangu_c_gameover.jpg`, `frames/17_rangu_d_permadeath_title_rain.jpg`
- **Notes/uncertainties:**
  - The white outlines are read as a glowing/invisible silverfish; the outline shapes are small and segmented. This is interpretation. The killing hits themselves came from off-screen or an invisible mob.
  - The first hit did about 5.5 hearts through full armour, and the second finished him.
  - The score digit is uncertain.
  - "Me quería poner el escudo": the shield was already in his off-hand, so he presumably meant raising or blocking with it (unclear).

---

### #18 — FrigoAdri
- **Wiki:** death #18, 24/04/2020 18:22:16, "Muerte por Ender Creeper", totem "**No Activado (1%)**". Day 30. [WIKI] Day-30 rules: "Los Tótems tienen un 99% de probabilidades de activarse y 1% de fallar", "Los Creepers son ahora Eléctricos", "Aparecen Ender Ghasts y Ender Creepers en el End", "La batalla contra la dragona está completamente modificada". [WIKI: permadeath__Cambios_de_dificultad.txt]
- **Footage:** https://www.youtube.com/watch?v=vYTcFdeAxE0&t=632 (card 10:32–10:36, gameplay 10:37–10:49, reaction on the ban screen 10:49–11:36). POV = FrigoAdri's own stream:
  - webcam top-right (dark hair, beard, headset);
  - "2A" logo bottom-left;
  - Spanish UI with sound subtitles in the right column;
  - boss bar "**PERMADEATH DEMON**" at the top. This is the server-wide dragon fight event; team tags [STRAT], [DPS] and [CONTROL+] appear in chat.
  - [SEEN]
- **Exact death message [SEEN]:**
  - Death screen (10:47.47): `¡Se acabó!` / `[CONTROL+] FrigoAdri ha explotado por Creeper` / `Puntuación: 73581` ("Observar mundo", "Menú principal").
  - Chat (from 10:47.40): red `Este es el comienzo del sufrimiento eterno de FrigoAdri. ¡HA SIDO PERMABANEADO!` / grey `FrigoAdri, Se ha quedado congelado` / `[CONTROL+] FrigoAdri ha explotado por Creeper` / `Tu cama ya no está o se encuentra obstruida`.
  - Title: `¡Permadeath!` / `FrigoAdri ha muerto`. Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / "Volver a la lista de servidores".
  - Card: `FrigoAdri ha sido PERMABANEADO` / `24-04-2020 | 18:22:16 UTC` / `Muerte por ENDER CREEPER`.
- **Setting [SEEN]:** **The End** main island during the modified dragon fight:
  - pale yellow end-stone ground, black void sky;
  - many **endermen** standing around;
  - a patch of red blocks on the ground;
  - several teammates in purple-glinting enchanted armour fighting nearby: nameplates "[STRAT] Crisgreen" (10:43), "[STRAT] killercreeper55" (10:45), "[DPS] Mikecrack" (10:46).
  - Sound subtitles include "Truenos" (thunder), "Explosión", "Siseo de creeper", "Creeper herido", "Creeper muere", "Dragón ruge", "Dragón aletea".
  - A storm timer "Quedan 08:39:5x de tormenta" appears after death.
- **Gear/HUD [SEEN]:** **Full 10 hearts right up to the last frame** (10:47.37). Armor full. XP level 5. **Off-hand: Totem of Undying** (left hand and off-hand slot). Hotbar from left: diamond pickaxe, diamond sword (selected), **another totem**, bow, 16 teal items, bucket, potions and misc.
- **Beat sheet:**
  1. 10:37–10:41 [SEEN] End island fight: a purple-armoured teammate swings right next to him, endermen all around, sword out, full health. Chat is full of "[¿Se acabó?]" advancement messages from other players. [SUBS 10:37] "Vale, hay una zona con rayos." [SUBS 10:42] "Vale, vale. Lo primero que hecho es mirar a un enderman. Me cago en mi [ __ ] madre." [SUBS 10:45] "Vale, tranquilo, no pasa nada."
  2. 10:43–10:46.5 [SEEN] He moves among teammates (Crisgreen, killercreeper55, Mikecrack) with glittering hit particles and endermen close by. Still 10 hearts.
  3. 10:46.6–10:47.37 [SEEN] He turns away from the group and faces open end stone with a line of endermen ahead. **No creeper is visible in frame.** Subtitle list includes "Siseo de creeper". Hearts full.
  4. **10:47.40 [SEEN]** A tall, thin figure **flashing red** (hurt tint, long dangling legs) appears at the upper left. Its identity is unclear: an enderman caught in the blast, or the Ender Creeper itself. "**Tótem activado**" appears as the newest sound subtitle and the Permaban chat lines post at the same moment.
  5. 10:47.47 [SEEN] The red **¡Se acabó!** screen appears, and "Jugador muere" is added to the subtitles. This is a one-shot from full hearts.
  6. 10:47.53–10:48 [SEEN] Spectator view: dark night in **heavy rain**, a cliff by water with a torch (not the End). **¡Permadeath!** "FrigoAdri ha muerto". [SUBS 10:47] "que los creepers frigo, frigo." (another voice)
  7. 10:49–10:52 [SEEN] "Conexión perdida" with a loading bar, then the Mojang screen.
  8. 10:53–11:36 [SEEN] Kick screen. Webcam: he stares at the screen for about 20 s, then **both hands over his face and head** (11:15–11:20), both hands over his mouth (11:21–11:28), talks, and ends with a facepalm (11:36). Meanwhile the call keeps going with other voices: [SUBS 10:50] "Oh, creeper eléctrico. Lo mato de un golpe." [SUBS 10:52] "No pasa nada, saliros los creeper." [SUBS 11:22] "Pongo golems. No, ya hay demasiados creepers, tío." [SUBS 11:26] "Cuidado con eso, cuidado. Cada uno una torre, por favor." His own line: [SUBS 11:18] "No se le" [SUBS 11:20] "**No se me ha activado el tótem.**"
- **Frames:** `frames/18_frigoadri_a_end_island_totem_offhand.jpg`, `frames/18_frigoadri_b_last_frame_full_hp.jpg` (includes the red-flashing figure and the "Tótem activado" subtitle), `frames/18_frigoadri_c_gameover.jpg`, `frames/18_frigoadri_d_permadeath_title.jpg`, `frames/18_frigoadri_e_reaction_ban_screen.jpg`
- **Notes/uncertainties:**
  - The Ender Creeper is **never identifiable on screen**; the explosion came from off-camera. The vanilla message only says "Creeper".
  - The "Tótem activado" sound subtitle at the moment of death conflicts with "totem not activated". It may be the sound of his failed 1% totem, or another player's totem nearby; I can't tell.
  - Speakers on the voice call after 10:47 are unidentified.

---

## Days 32–38 (#19–#26)

### #19 — Folagor (Folagoro in-game)
- **Wiki:** death #19, 26/04/2020 20:54:43, "Muerte por Ender Ghast"; totem: "Consumido"; custom line "Failagor a partir de ahora". [WIKI]
- **Footage:** GersoonSG compilation: https://www.youtube.com/watch?v=vYTcFdeAxE0&t=697 (11:37–12:17; the chapter index says 705, but Folagor's death card already starts at 11:37). Folagor's own stream: webcam bottom-right (red cap, headphones, red shirt), Spanish client with the closed-captions panel on the right. [SEEN]
  - 11:37–11:41 death card: `Folagor ha sido PERMABANEADO` / `26-04-2020 | 20:54:43 UTC` / `Muerte por ENDER GHAST`. [SEEN]
- **Exact death message [SEEN]:**
  - Death screen (Spanish): `¡Se acabó!` / `[MIEMBRO] Folagoro ha explotado por Ender Ghast` / `Puntuación: 41667` (buttons "Observar mundo", "Menú principal").
  - Chat: `Este es el comienzo del sufrimiento eterno de Folagoro. ¡HA SIDO PERMABANEADO!` / `FolagoR, Failagor a partir de ahora` / `[MIEMBRO] Folagoro ha explotado por Ender Ghast`.
  - Title: `¡Permadeath!` / `Folagoro ha muerto`.
  - Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / `Volver a la lista de servidores`.
  - Earlier, after the totem: toast `¡Objetivo conseguido! Post mortem` and chat `[MIEMBRO] Folagoro ha alcanzado el objetivo [Post mortem]`.
- **Setting [SEEN]:** The End, on an end-stone island. Black sky, obsidian pillars in the distance, many endermen. Several white ghasts (Ender Ghasts per the wiki) float overhead. Patches of fire and blast craters dot the end stone, and there's water and lava at the island edge (captions "Agua fluyendo", "Burbujeo de lava", "Siseo de la lava").
- **Gear/HUD [SEEN]:** XP level 35, full hunger. Held item is a purple shield. Its aqua tooltip reads `Zanazenta` (blurry; might be "Zamazenta"). Hotbar from left: diamond sword, diamond pickaxe, the purple shield (selected), empty, bow, pale item ×7, golden apple ×11, red item ×64, brown item ×21. No offhand slot shows after the totem pop. The armor bar isn't legible. After the totem a red heart status icon sits top-right.
- **Beat sheet:**
  1. 11:42–11:43.25 [SEEN] Death card cuts to him in the "Editar mensaje del cartel" (edit sign) screen. The sign reads `DEP / Hermano. / Te extrañaré. / Folagor_`, with the "Aceptar" button. The End (end stone, endermen) is dimly visible behind the menu.
  2. 11:42.75–11:43.25 [SEEN] The toast `¡Objetivo conseguido! Post mortem` pops in top-right while the sign screen is still open. The captions list shows `Chisporroteo de fuego`, `Explosión`, `Bloque roto`, `Tótem activado`, "Ghast…". [SUBS 11:44] "qué [__]"
  3. 11:43.5–11:44.0 [SEEN] Sign screen closes. Full totem-of-undying animation fills the screen (the totem spins toward the camera) with green and yellow particles. Endermen and a lava/water edge are behind him. Hearts are very low, about 1–2 red.
  4. 11:44.25–11:45.75 [SEEN] He looks around the flat end-stone field. Endermen walk around him.
  5. 11:46.0–11:47.0 [SEEN] He raises the purple shield ("Zanazenta" tooltip). Ghasts float in the sky with small orange fire objects near them. Magenta spiral/ring-shaped sprites drift in the air. At 11:46.75–11:47.0 white explosion smoke puffs burst on the ground just ahead with a magenta ring inside, and fire patches burn around. Hearts about 5 (tooltip crop at 11:46.2: 5 red hearts).
  6. 11:48.75–11:49.75 [SEEN] Endermen right next to him. One flashes red (damaged). Shield held up, purple particles, a magenta ring near an enderman.
  7. 11:50.5–11:54.75 [SEEN] He moves across end stone covered in burning patches and craters, with 3–5 ghasts overhead. Captions "Burbujeo de lava", "Enderman muere". Hearts recover to about 7–9 (regeneration after the totem).
  8. ~11:55.0 [SEEN] Hearts suddenly flash pink/empty and drop to 1 red heart. A magenta ring sprite shows on the left of the screen. [SUBS 11:54] "What?"
  9. 11:55.5–11:56.25 [SEEN] A ghast above him has its red mouth open (firing face). He is on 1 heart among flames and black smoke.
  10. 11:56.5–11:58.75 [SEEN] Hearts at 2–3. Big magenta ring/square sprites pass very close to the camera (11:57.75, 11:58.5–11:58.75). He walks toward the island edge, where endermen stand by flowing water. [SUBS 11:56–12:01] "No, no, no."
  11. 11:59.0–12:00.16 [SEEN] Standing on end stone at 3 hearts, looking at endermen near the water. At 12:00.0 a magenta bar (the edge of a ring sprite) flashes top-left. No explosion or fireball is visible in the last frames.
  12. 12:00.20 [SEEN] Cut straight to the red `¡Se acabó!` screen. He died from 3 hearts with no visible impact.
  13. 12:00.3–12:02.0 [SEEN] Spectate view: a room with rows of chests, teal walls, a grey-and-teal patterned floor, a black block hanging from the ceiling, and a large faded "…lagoro wa…" text ghosted across the screen. Then the red title **¡Permadeath! / Folagoro ha muerto**. Webcam: mouth wide open, then both hands on his forehead, yelling.
  14. 12:02–12:04 [SEEN] Mojang loading screen with red bar. 12:05–12:16 kick screen. Webcam: hands over his face, then over mouth and nose, then he stares off. [SUBS 12:12] "¿Cómo me ha visto?" [SUBS 12:15] "¿Cómo me ha visto, tío? No me lo puedo creer."
- **Frames:** `frames/19_folagor_a_totem_pop.jpg` (11:43.5), `frames/19_folagor_b_one_heart_ghast.jpg` (11:55.5), `frames/19_folagor_c_gameover.jpg` (12:00.23)
- **Notes/uncertainties:** What set off the totem at 11:43 happens while the sign menu covers the screen. Only the "Explosión" caption hints at it. The magenta spiral/ring sprites look like Minecraft's dragon-fireball sprite, but whether they are the Ender Ghasts' projectiles can't be confirmed from these frames. The killing blow isn't visible: 12:00.16 is a normal frame at 3 hearts and 12:00.20 is the death screen. Who the "DEP Hermano" sign was for isn't shown.

### #20 — Paracetamor
- **Wiki:** death #20, 26/04/2020 20:58:49, "Muerte por Caer al Vacío"; totem: "No Activado (Vacío)"; custom line "¿Dónde está el paracetamol?". [WIKI]
- **Footage:** NO death gameplay. GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=737 (12:17–12:36) shows only a death card and her tweets. [SEEN]
  - 12:17–12:21 card: `Parecetamor ha sido PERMABANEADA` / `26-04-2020 | 20:58:49 UTC` / `Muerte por CAER AL VACÍO` (the name is misspelled "Parecetamor" on the card; the icon is a blank white face). [SEEN]
  - 12:22–12:36 screenshot of two tweets by Paracetamor (@paracetamor, "26 abr."). [SEEN]
    - Tweet 1: "Ha sido una muerte muy rara intentando entrar al portal con la enderpearl y encima no estaba en directo, lo siento :( / Gracias a @ElRichMC por invitarme, ha sido divertidísimo y he conocido a gente increíble, seguiré por Minecraft a menudo ❤". It has a screenshot of her kick screen `Conexión perdida` / `Has sido PERMABANEADO` / `Volver a la lista de servidores` (95 replies, 81 RT, 1,2 mil likes).
    - Tweet 2: "He tirado una enderpearl al portal y he caído al vacío, justo después de la muerte de @FolagoR, rip :( no joke" (127 / 57 / 1 mil).
- **Supplementary (tried one):** "Permadeath muerte de paracetamor" https://www.youtube.com/watch?v=LyOlXUZ_c4A (0:00–0:21). It is only the same static death card (KineMaster watermark), with no gameplay. [SEEN]
- **Exact death message:** not shown anywhere. [SEEN]
- **Setting / Gear / Beat sheet:** none available. Her own tweet says she threw an ender pearl toward "el portal" and fell into the void, and that she wasn't streaming. Which portal isn't stated; the End is plausible because of the void, but that's unconfirmed.
- **Frames:** `frames/20_paracetamor_a_ban_card.jpg` (12:19), `frames/20_paracetamor_b_tweets.jpg` (12:30)
- **Notes/uncertainties:** No footage seems to exist because she wasn't live. Untried leads: her own explanation video "#27 EXPLICO MI MUERTE EN PERMADEATH" https://www.youtube.com/watch?v=rWOVX3sZzbo (10 min, probably narration only) and Pabl0WL's "PERMADEATH MUERTE PARACETAMOR" https://www.youtube.com/watch?v=l4_7OhR4lRY (24 s).

### #21 — Gona89 (Gona89_YT in-game)
- **Wiki:** death #21, 28/04/2020 17:03:26, "Muerte por Shulker Explosivo"; totem: "No Activado (1%)"; custom line "Verdaderamente lamentable". [WIKI]
- **Footage:** GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=757 (12:37–13:06). Gona's own stream: webcam bottom-left (dark hair, beard, glasses, grey T-shirt), **F3 debug screen open** the whole time. [SEEN]
  - 12:37–12:40 card: `Gona89 ha sido PERMABANEADO` / `28-04-2020 | 17:03:26 UTC` / `Muerte por SHULKER EXPLOSIVO`. [SEEN]
  - Supplementary multi-POV: "Muerte de Gona89 en Permadeath desde Todas las Perspectivas" https://www.youtube.com/watch?v=1qqbHzD_PFU (0:00–1:07). The same Gona footage sits top-left, plus two other players' streams (names not legible at 360p) who were in the Overworld. [SEEN]
- **Exact death message [SEEN]:**
  - Death screen: `¡Se acabó!` / `[MIEMBRO] Gona89_YT ha explotado` / `Puntuación: 51660`. No attacker is named.
  - Chat (partly behind the webcam): `…ienzo del sufrimiento eterno de … ¡HA SIDO PERMABANEADO!` / `…aderamente lamentable` [= "Verdaderamente lamentable"] / `…89_YT ha explotado`.
  - Title: `¡Permadeath!` / `Gona89_YT ha muerto`.
  - Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / `Volver a la lista de servidores`.
- **Setting [SEEN]:** The End, **inside an End City tower**. F3 shows `minecraft:the_end`, `Biome: minecraft:end_midlands`, `Local Difficulty: 3.75 // 0.88 (Day 288)`, XYZ about -1882 / 109.5→102.5 / -4102, and a "Paper" server on 1.15.2 OptiFine. He is in a narrow vertical shaft or stairwell of purpur blocks and purpur pillars (tooltip "Pilar de púrpur"), with Client Light 0, so it's dim and lavender-grey. Several **shulkers** (yellow-green shells, purple inside) are attached to the purpur walls.
- **Gear/HUD [SEEN]:** 10 full hearts, full hunger, XP level 45. **Totem of undying in the offhand** (HUD offhand slot). Hotbar from left: diamond sword, diamond pickaxe, enchanted bow, yellow item ×51, end stone ×64, purpur ×2, potion, blue item, potion. He first holds the purpur blocks (and at 12:42–12:44 an enchanted bow), then switches to the diamond sword at 12:52.75 (tooltip "Espada de diamante").
- **Beat sheet:**
  1. 12:41–12:45 [SEEN] Looking up a purpur shaft, with a pale object high above that can't be identified. [SUBS 12:42] "Vamos a ir a por el de arriba del todo, ¿vale? bloqueo."
  2. 12:45–12:50 [SEEN] Standing still at Y 109.5, looking around the purpur walls. [SUBS 12:50] "Vale, cuidado, explosiones significa que se están muriendo. Vale, gente."
  3. 12:50.25–12:53.5 [SEEN] He drops down the shaft step by step (Y 109.5 → 108 → 106.5 → 105 → 104). At 12:52.75 he switches to the diamond sword.
  4. 12:53.75–12:54.63 [SEEN] Looking up and left: at least two open shulkers on the walls above him, plus a small dark object with a pale-yellow end floating near them, unidentified (it could be a shulker bullet). Still at 10 full hearts.
  5. 12:54.66–12:54.80 [SEEN] A grey, blocky, translucent smoke cloud swells around the upper-left shulker.
  6. 12:54.83–12:55.03 [SEEN] The camera swings down: another shulker on the wall and floor below him, grey particle blur at the left edge, then purpur floor with a dark shape at bottom-right. Hearts are still full at 12:54.9 (HUD crop).
  7. 12:55.06 [SEEN] Red **¡Se acabó!** screen. He was one-shot from 10 full hearts.
  8. 12:55.25–12:56.75 [SEEN] Spectate puts him in the Overworld (F3 `minecraft:overworld`, XYZ 592.5 / 71 / 176.5): white sky, then a base with sugar cane, wheat, torches and a row of red-and-grey objects. Title **¡Permadeath! / Gona89_YT ha muerto**. Webcam: he stays nearly expressionless.
  9. 12:57–13:01 [SEEN] Mojang loading screen: both hands go up behind his head.
  10. 13:02–13:06 [SEEN] Kick screen: hands behind his head, then a hand over his mouth.
  - Multi-POV extras [SEEN, 1qqbHzD_PFU]: 0:07–0:09 the other two players see the red PERMABANEADO chat lines and the `¡Permadeath! / Gona89_YT ha muerto` title while on an Overworld grass plain. 0:10–0:13 one of them (bottom-left, bearded, headphones) raises a hand to his cheek with mouth open. [SUBS of that video are only garbled song lyrics and noise, nothing usable.]
- **Frames:** `frames/21_gona_a_shulkers.jpg` (12:54.3), `frames/21_gona_b_gameover.jpg` (12:55.1), `frames/21_gona_c_permadeath_title.jpg` (12:56.6)
- **Notes/uncertainties:** The explosion itself is hard to see: only the grey smoke near a shulker and the particle blur just before the death screen. It can't be told which shulker (or projectile) exploded. The "dark object with a yellow end" is unidentified. The totem was equipped but didn't trigger (the wiki gives a 1% fail).

### #22 — MrCarlosNoob (MrCarlosnoob / "CarlosLagaron")
- **Wiki:** death #22, 28/04/2020 17:23:34, "Muerte por Caída escapando de una Araña de Cueva"; totem: "No Activado (1%)"; custom line "Por esto hizo 18 h de esclavitud". [WIKI]
- **Footage:** GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=787 (13:07–13:22; the chapter index says 795, but the card starts at 13:07). MrCarlos's own stream: webcam top-left (beard, headphones, white-and-dark shirt), English client. [SEEN]
  - 13:07–13:11 card: `MrCarlosNoob ha sido PERMABANEADO` / `28-04-2020 | 17:23:34 UTC` / `Muerte por CAÍDA escapando de una ARAÑA DE CUEVA`. [SEEN]
- **Exact death message [SEEN]:**
  - Game-over screen: `Game over!` / `[…] MrCarlosnoob hit the ground too hard whilst trying to escape Cave Spider` / `Score: 11990` (buttons "Spectate world", "Title screen"). The tag is hidden behind the webcam.
  - Chat: `Este es el comienzo del sufrimiento eterno de MrCarlosnoob. ¡HA SIDO PERMABANEADO!` / `CarlosLagaron, Para esto se esclavizó por 18 horas` / `[INVITADO] MrCarlosnoob hit the ground too hard whilst trying to escape Cave Spider` (note the **[INVITADO]** tag, not [MIEMBRO]).
  - Title: `¡Permadeath!` / `MrCarlosnoob ha muerto`.
  - Kick screen (English): `Connection Lost` / `Has sido PERMABANEADO` / `Back to server list`.
- **Setting [SEEN]:** Overworld cave. Grey stone and light gravel-like floor, patches of red netherrack blocks, oak planks and oak fences like mineshaft supports, and torches placed on the floor. Dim. Bats fly overhead. They and the cave spider are drawn with a **white glowing outline**. A storm timer above the hotbar reads `Quedan 10:47:31 de tormenta`. After death the spectate view is outdoors at night in **heavy rain**, by a river with grass and sugar cane.
- **Gear/HUD [SEEN]:** Full armor bar (10 icons). Health is two rows: 4 dark/empty heart containers above, and a main row whose hearts are **olive/yellow-green** (poison colouring). The poison colouring fits cave-spider bites, but that's an inference. They flicker and look mostly dark by 13:13–13:14. XP level 12. **Totem of undying in the offhand**, clearly visible large in his left hand. Hotbar from left: diamond sword, diamond pickaxe, golden apple ×3, ender pearls ×13 (then 12), orange-brown food ×27, netherrack ×4, tall orange item, blue potion, potion ×6.
- **Beat sheet:**
  1. 13:11.25–13:12.5 [SEEN] Sword out, facing up a slope at a **cave spider** (small, dark teal, red eyes, glowing white outline) sitting on netherrack a few blocks away. Two outlined bats hover above. Big green swirl particles cross the screen at 13:11.75–13:12.0.
  2. 13:12.5 [SEEN] The spider is right in front of the crosshair, close. The hearts row flickers olive (poison colouring).
  3. 13:12.75–13:13.0 [SEEN] He turns away and runs. He selects netherrack (tooltip "Netherrack") while moving down a torch-lit tunnel.
  4. 13:13.25 [SEEN] Switches to ender pearls (tooltip "Ender Pearl"). A torch and falling spark in the tunnel ahead.
  5. 13:13.5–13:14.4 [SEEN] Holding an ender pearl, he looks down a steep gravel slope in the cave, past oak fences and torches. A bat flaps top-left. The heart rows look almost empty and dark. [SUBS 13:13] "No, no, no, no, no, no, no, no."
  6. ~13:14.45–13:14.76 [SEEN] The pearl leaves his hand (throw animation; the stack goes to 12). The view faces red netherrack and the stone floor close up.
  7. 13:14.8 [SEEN] English **Game over!** screen.
  8. 13:15.0 "Joining world…", 13:15.25 [SEEN] spectator view: night, rain, grass by a river, sugar cane, a torch.
  9. 13:15.5–13:16.25 [SEEN] Title **¡Permadeath! / MrCarlosnoob ha muerto**. Webcam: he jerks back in his chair and clutches his head with both hands.
  10. 13:17–13:19 [SEEN] Mojang loading screen, hands still on his head. 13:20–13:22 English kick screen; he puts a hand to his face.
- **Frames:** `frames/22_mrcarlos_a_cave_spider.jpg` (13:11.5), `frames/22_mrcarlos_b_pearl_last_frame.jpg` (13:14.45), `frames/22_mrcarlos_c_gameover.jpg` (13:14.85)
- **Notes/uncertainties:** No long fall is visible. The death screen comes about 0.3 s after he throws the pearl, and the vanilla message says fall damage ("hit the ground too hard"). Whether the damage came from the pearl teleport landing or a short drop can't be told from these frames. His health was already very low (poisoned). The cave spider is identified by its size, colour and the death message.

### #23 — Mikecrack
- **Wiki:** death #23, 29/04/2020 22:49:47, "Muerte por Ender Ghast"; totem: "Consumido"; custom line "El diamantito le sirvió de poco". [WIKI]
- **Footage:** GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=803 (13:23–15:57). One continuous POV, Mikecrack's own stream: **no webcam**. Social-handle overlay top-left (`@MIKECRACKYT` ×2, `@MIKECRACKTOK` with Instagram/Twitter/TikTok icons), plus a donation alert with his yellow dog mascot at 14:16–14:20 (`DONACIÓN` / "DOCTOR BANNER543 HA DONADO 10.42…", blurry). English client. [SEEN]
  - 13:23–13:26 card: `Mikecrack ha sido PERMABANEADO` / `29-04-2020 | 22:49:47 UTC` / `Muerte por ENDER GHAST`. [SEEN]
  - Chapter layout: 13:27–15:01 flying and ghast-fighting (his POV), 15:01.9 death, 15:02–15:04 spectate, 15:05–15:08 Mojang loading, 15:09–15:57 disconnect screen with his spoken reaction. [SEEN]
- **Exact death message [SEEN]:**
  - Game-over screen: `Game over!` / `[MIEMBRO] Mikecrack was blown up by Ender Ghast` / `Score: 84424` (buttons "Spectate world", "Title screen").
  - Chat (small, blurry): `Mikecrack ha consumido un tótem. (Probabilidad: 56 != 99)` / `Este es el comienzo del sufrimiento eterno de Mikecrack. ¡HA SIDO PERMABANEADO!` / `MikecrackYT, El diamantito le sirvió de poco` / `[MIEMBRO] Mikecrack was blown up by Ender Ghast`.
  - No ¡Permadeath! title is readable in the dark spectator frames.
  - Disconnect screen (not the usual ban text): `Connection Lost` / `Internal Exception: java.io.IOException: Se ha forzado la interrupción de una conexión existente por el host remoto` / `Back to server list`.
- **Setting [SEEN]:** The End **outer islands**. Black-purple void sky full of small floating end-stone islets, larger islands with purple chorus trees, and crowds of endermen. Many white ghasts (Ender Ghasts per the wiki), which open red mouths when firing and flash red when hit. At 13:50–13:54, 13:58 and 14:10–14:14 another player flies past on elytra (brown/orange skin, purple wings). Their name isn't legible. ElRichMC whispers in chat at 13:43 "cuantas lleváis entre tu y hardy? si lleváis 3 de 4 habl…", so this may be Hardy, but that's unconfirmed. Other chat: "Kakytron> See you guys", "ElRichMC> byeee kaky", "EsVandal> bya", "Kakytron left the game".
- **Gear/HUD [SEEN]:** 10 full hearts until the totem pop, full hunger, XP level 36. **Totem of undying in the offhand**, visible large in his left hand in most frames plus the small offhand-slot icon. He flies with elytra, boosting with firework rockets (red-and-white rocket in hand). Hotbar from left: diamond sword, **enchanted bow** (purple glint, usually selected), diamond pickaxe, firework rockets ×49, water bucket, ender pearls ×15, item ×50 (yellow-tipped, maybe arrows), golden apples ×12, end stone ×64. After the totem, two status icons show top-right (grey shield-shaped icon and red heart), with gold absorption hearts above the red row.
- **Beat sheet:**
  1. 13:27–13:53 [SEEN] Elytra flight between outer islands, firework rocket in hand, totem in the offhand. Ghasts start showing at 13:41–13:49. [SUBS 13:27] "Vamos a ir ya con más calma. Vamos a ir mirando bien que hay a nuestros alrededores, porque antes hemos fracasado por ir con mucha prisa…"
  2. 13:55–14:05 [SEEN] Shooting the enchanted bow at ghasts over a big island crowded with endermen. One ghast flashes red at 14:01, another fires (orange fire above it) at 14:02–14:03. [SUBS 13:39–13:55] "Sobre los gases, ¿cómo los vamos a derrotar? Vale, hay dos técnicas… usar las armas de server en su propia contra… si un gas dispara una bola de fuego capaz de quitar 20.000 de daño, voy a pasar entre ellos para que se autogolpeen… Otra es dispararlos"
  3. 14:07–14:41 [SEEN] More flying, bow and sword. A ghast comes right up to him at 14:27–14:28 and nearly fills the screen at 14:41. Round orange-white fireball-like objects fly past at 14:34–14:36. White smoke rings at 14:43. [SUBS 14:05–14:25] "…en movimiento es prácticamente imposible que me dé, porque cuando me dispara yo ya no estoy donde él me ha disparado… como no puede explotar la bola a mi alrededor porque no hay ninguna superficie porque estoy al aire, pues prácticamente soy inmortal." [SUBS 14:29] "Corre Mike, corre. Hay una posibilidad de que me mate, ¿vale? Que es que le rebote la la bala y estar yo muy cerca."
  4. 14:53–14:58 [SEEN] 4 fps close-up: hovering in the void, bow drawn at a single ghast. It opens its red mouth and fires (a small fireball rises above it) at 14:53.75, 14:54.0, 14:56.75 and 14:57.0. It flashes red (arrow hit) at 14:57.25–14:57.5. [SUBS 14:44] "Ahí se pegan entre ellos. Perfecto… Que se sigan matando" [SUBS 14:50] "Está tocado… le tenemos"
  5. 14:58.5–14:59.1 [SEEN] An enderman looms right beside him in the void, then he drops onto an end-stone island with endermen standing around. There's a light-blue glittering thing behind them, unidentified (possibly an End gateway). Hearts 10, the last one flickering.
  6. 14:59.13–14:59.20 [SEEN] A **large burning orange fireball** comes in from the top-left of the screen while an enderman stands right next to him.
  7. 14:59.23–14:59.33 [SEEN] Explosion: white smoke clouds, endermen flash red, fire bursts on the ground, and the **totem of undying animation** fills the screen with green and yellow particles. Hearts drop to 1 red plus 4 gold absorption hearts. Chat: "Mikecrack ha consumido un tótem…". [SUBS 15:00] "Vale, vale, vale. Corre, Mike."
  8. 14:59.5–15:00.25 [SEEN] The totem animation keeps going while flames burn around him on the island edge. He switches to the water bucket and pours water (bubble rings at 15:00.75).
  9. 15:01.0–15:01.86 [SEEN] He looks out over the island's edge into the void, underside of the island visible, rocket in hand. Hearts 3–4 red plus absorption. A **purple ring-shaped sprite** floats below the crosshair, growing and shifting (15:01.3–15:01.83). No ghast is in view.
  10. 15:01.90 [SEEN] HUD vanishes (dark frame). 15:01.93 red **Game over!** screen.
  11. 15:02.0–15:04.75 [SEEN] Spectator: black void with a floating player head (another spectator's head), then an Overworld base at night (bamboo walls, river, stone-brick building). 15:05–15:08 Mojang loading. 15:09–15:57 disconnect screen (IOException text above). He hovers "Back to server list" at 15:18 and 15:31. [SUBS 15:01] "No puede ser. No me lo puedo creer." [SUBS 15:10] "…porque no había vacío. Me he muerto por lo que dije… Por tocar suelo. Por tocar suelo. Creía que estaba encima del vacío." [SUBS 15:35] "Bueno, pues hasta aquí hemos llegado. Una pena…" [SUBS 15:50] "Se nos ha activado el tótem, cosa buena, pero bueno, ya me quedo tranquilo. Nos vemos en en compadretes, chicos."
- **Frames:** `frames/23_mikecrack_a_fireball_incoming.jpg` (14:59.15), `frames/23_mikecrack_b_totem_pop.jpg` (14:59.5), `frames/23_mikecrack_c_last_frame_ring.jpg` (15:01.83), `frames/23_mikecrack_d_gameover.jpg` (15:01.95)
- **Notes/uncertainties:** The totem-triggering hit (a big fireball) is visible. The killing hit 2.7 s later is not: the last live frame shows only the purple ring sprite near the crosshair. Whether that ring is the Ender Ghast projectile is unconfirmed; the death message says "blown up by Ender Ghast". His own explanation (SUBS) is that he was standing on ground, not over the void, so the fireball could explode next to him. "gas/gases" in the ASR = "ghast/ghasts". The ban kick text never appears; his client got an IOException disconnect instead.

### #24 — BarbeQ (AFK ban)
- **Wiki:** #24, 30/04/2020 00:00:00, "Ban por AFK". [WIKI]
- **Footage:** https://www.youtube.com/watch?v=vYTcFdeAxE0&t=958 (15:58–16:01): only the Permadeath ban card, no gameplay. [SEEN] Card: `BarbeQ ha sido PERMABANEADO` / `30-04-2020 | 00:00:00 UTC` / `Muerte por AFK`, with a black-and-white pixel skin-face icon. The next card (Cibergun) follows at 16:02.
- **Frames:** `frames/24_barbeq_a_ban_card.jpg`

### #25 — Cibergun
- **Wiki:** death #25, 30/04/2020 19:55:59, "Muerte por Ender Ghast"; totem: "Consumido"; custom line "Ahora descansa en paz". [WIKI]
- **Footage:** GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=962 (16:02–16:35; the chapter index says 970, but his card starts at 16:02). Cibergun's own stream: webcam top-right (young man with glasses, white T-shirt with a pink logo, bookshelves behind), overlay "ROGERGCX" (Twitter) and "CIBERGUN PLAY" (YouTube), **F3 debug screen open**, Spanish client. [SEEN]
  - 16:02–16:05 card: `Cibergun ha sido PERMABANEADO` / `30-04-2020 | 19:55:59 UTC` / `Muerte por ENDER GHAST`. [SEEN]
- **Exact death message [SEEN]:**
  - Death screen: `¡Se acabó!` / `[MIEMBRO] cibergun ha explotado por Ender Ghast` / `Puntuación: 53196` (buttons "Observar mundo", "Menú principal").
  - Chat: `cibergun ha consumido un tótem. (Probabilidad: 47 != 99)` / `<[MIEMBRO] Hardyluski> LOL` / `<[MIEMBRO] Hardyluski> NO` / `Este es el comienzo del sufrimiento eterno de cibergun. ¡HA SIDO PERMABANEADO!` / `Ahora por fin descansa en paz…` / `[MIEMBRO] cibergun ha explotado por Ender Ghast`.
  - Title: `¡Permadeath!` / `cibergun ha muerto`.
  - Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / `Volver a la lista de servidores`.
- **Setting [SEEN]:** The End. F3: `minecraft:the_end`, `Biome: minecraft:end_midlands`, `Local Difficulty: 3.75 // 0.88 (Day 440)`, XYZ about 1769–1799 / 57–60 / -393 to -403, "Paper" server. A wide flat end-stone island with chorus plants on the horizon, black sky, several endermen walking around. **No ghast is visible** in any frame of the clip.
- **Gear/HUD [SEEN]:** He is **invisible and wears no armor**: at 16:06 his inventory shows the "Invisibilidad" effect, four empty armor-slot outlines and a dark, see-through player preview. The tooltip "Poción de invisibilidad" is hovered. **Totem of undying in the offhand**. 10 full hearts, XP level 41. Hotbar from left: diamond sword, purple shield, bow, cooked cod ×26 (tooltip "Bacalao cocinado"), ender pearl(s), then potions and other items. After the totem he holds a purple potion (tooltip "Poción de caída lenta" = slow falling).
- **Beat sheet:**
  1. 16:06–16:07 [SEEN] Inventory open ("Fabricación"), invisibility effect active, armor slots empty. [SUBS 16:06] "A la isla donde quiero ir yo, o sea, la isla, la a la que tenía yo pensado, porque allí hay elitras." [SUBS 16:13] "No me la voy a jugar ahora por shulkers."
  2. 16:08–16:19 [SEEN] Walks across the end-stone plain holding cooked cod. Endermen stand around, one close at 16:18. [SUBS 16:16] "Pues si no si no te interesa este este en City."
  3. 16:19.75–16:20.23 [SEEN] An enderman walks straight at him until its black body and purple eyes fill most of the screen. Hearts are still 10/10 at 16:20.23.
  4. 16:20.26 [SEEN] **Totem pops** from full health: the totem animation rises from the bottom of the screen with green and yellow particles. The cause isn't visible (no fireball, no explosion sprite; only the enderman is next to him). Chat: "cibergun ha consumido un tótem. (Probabilidad: 47 != 99)". [SUBS 16:21] "No, no, no, no, no." [SUBS 16:22] "Cber, no."
  5. 16:21–16:23 [SEEN] Totem animation fades. He switches to a purple slow-falling potion. Hearts about 3.5 red plus 4 gold absorption hearts. Hardyluski writes "LOL" and "NO".
  6. 16:23.0–16:23.66 [SEEN] Walking on flat end stone toward a low ledge, endermen in the distance. A blue item appears at the bottom-right in the last frames (16:23.60–16:23.66; can't be identified). Nothing hostile is visible.
  7. 16:23.70 [SEEN] Straight to the red **¡Se acabó!** screen.
  8. 16:24–16:25 [SEEN] Spectate: an Overworld base at night in heavy rain (bamboo, stone). **¡Permadeath! / cibergun ha muerto**. Webcam: mouth open, then both hands on his head, eyes wide.
  9. 16:26–16:29 [SEEN] Mojang loading screen, hands behind his head, leaning back. 16:30–16:35 kick screen: he rubs his face. [SUBS 16:28] "Se me ha pasado la poción hablando." [SUBS 16:30] "Oh, no." [SUBS 16:32] "Lo siento, se me ha pasado la poción hablando."
- **Frames:** `frames/25_cibergun_a_inventory_invisible_no_armor.jpg` (16:06.5), `frames/25_cibergun_b_enderman_close.jpg` (16:20.13), `frames/25_cibergun_c_totem_pop.jpg` (16:20.5), `frames/25_cibergun_d_se_acabo.jpg` (16:23.71)
- **Notes/uncertainties:** Neither the totem hit nor the killing hit is visible. Both happen with no ghast or projectile on screen, and only the death message names the Ender Ghast. His own line (SUBS) "se me ha pasado la poción hablando" ("my potion ran out while I was talking") probably refers to the invisibility potion wearing off, but that's his words, not something the frames confirm. The "Cber, no" ASR line is probably a garbled word.

### #26 — Alkapone (in-game "Leyville")
- **Wiki:** death #26, 02/05/2020 04:07:22, "Muerte por Caída"; totem: "Consumido"; custom line "MYM: Malo y muerto". [WIKI]
- **Footage:** GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=996 (16:36–17:39; the chapter index says 1004, but his card starts at 16:36). Alkapone's own stream: webcam bottom-right (black cap, headphones, glasses), "CORSAIR" logo bottom-left, English client, **hitboxes shown (F3+B)**: white boxes and blue look-lines on mobs. The footage looks continuous from 16:40 to the death; the chat lines carry over. [SEEN]
  - 16:36–16:39 card: `Alkapone ha sido PERMABANEADO` / `02-05-2020 | 04:07:22 UTC` / `Muerte por CAÍDA`. [SEEN]
- **Exact death message [SEEN]:**
  - Game-over screen: `Game over!` / `[MIEMBRO] Leyville fell from a high place` / `Score: 173147` (buttons "Spectate world", "Title screen").
  - Chat: `Este es el comienzo del sufrimiento eterno de Leyville. ¡HA SIDO PERMABANEADO!` / `MYMALK4PON3, MYM: Malo Y Muerto` / `[MIEMBRO] Leyville fell from a high place`.
  - Title: `¡Permadeath!` / `Leyville ha muerto`.
  - Kick screen (English): `Connection Lost` / `Has sido PERMABANEADO` / `Back to server list`.
  - Earlier, two totems: `Leyville ha consumido un tótem. (Probabilidad: 44 != 99)` + `[MIEMBRO] Leyville has reached the goal [Postmortal]` (toast "Goal Reached! Postmortal"), then `Leyville ha consumido un tótem. (Probabilidad: 0 != 99)`.
- **Setting [SEEN]:** The End outer islands near an **End City** (purpur walls with end-stone-brick trim, tall purpur towers, chorus trees). Black-purple sky with small floating islets. Dozens of endermen stand on the island. Blue beam-like shapes by the End City. The final fall lands on a green-lit end-stone island right next to an enderman.
- **Gear/HUD [SEEN]:** At the start: 10 full hearts, XP level 80, full hunger, a totem in the offhand and a second totem in hotbar slot 9. Status icons top-right: a yellow bulb (the **Invisibility** icon, as shown later in the inventory) and a grey icon. Hotbar from left: diamond sword, enchanted bow, diamond pickaxe, golden carrots ×56 (tooltip "Golden Carrot"), ender pearls ×15, firework rockets ×15 (tooltip "Firework Rocket"), purpur blocks ×46 (tooltip "Purpur Block"). Inventory tooltips show custom purple armor: `SNetherite Helmet` (Aqua Affinity, Mending, Protection IV, Respiration III, Dyed, Unbreakable), `SNetherite Leggings` (Protection IV, Dyed, +2 Armor Toughness, +6 Armor, Unbreakable), `SNetherite Boots` (Depth Strider III, **Feather Falling IV**, Protection IV, Dyed, Unbreakable), and **`Elytra` (Mending, Unbreaking III)** in the chest slot.
- **Beat sheet:**
  1. 16:40.25–16:41.63 [SEEN] Standing on end stone beside End City purpur walls, invisible, facing a crowd of endermen with hitbox outlines. One enderman lies tipped over near him, tinted red (dying). 10 full hearts.
  2. 16:41.66 [SEEN] **First totem pops** from full hearts, with no visible cause (no projectile or explosion on screen). Totem animation with green and yellow particles, toast "Goal Reached! Postmortal", chat "…(Probabilidad: 44 != 99)". Hearts drop to 1. The invisibility icon is replaced by Absorption II and Regeneration II. [SUBS 16:41] "seguros, gey. No [__]"
  3. 16:43–16:44.75 [SEEN] He holds the spare totem (slot 9) and backs along the End City wall. Small dark mobs with hitbox lines and orange bits (unidentified) on the end stone. [SUBS 16:45] "Okay. Huye, huye, okay. Huye, huye, huye…"
  4. 16:45–16:46.4 [SEEN] Opens the inventory (Absorption II / Regeneration II shown), hovering an Ender Chest and the SNetherite Leggings.
  5. 16:46.55 [SEEN] **Second totem pops** while the inventory is closing (chat "…(Probabilidad: 0 != 99)"). Totem animation 16:46.55–16:48.0 with endermen around. Hearts about 1–2. [SUBS 16:50] "Vámonos, vámonos…"
  6. 16:48–16:52 [SEEN] View tips up to the black sky, with a blue beam and the island below. Hearts at 2–3.
  7. 16:52.5–16:54.5 [SEEN] Inventory: re-checks the SNetherite Leggings and Helmet (Regeneration II 0:38).
  8. 16:55.0 [SEEN] Magenta spiral/ring sprites and a large magenta rectangular shape pass in front of the camera, over the dark void. Can't be identified.
  9. 16:56–17:04 [SEEN] Airborne in the dark void, with an island edge far below. Eats golden carrots (17:00.5–17:02) and selects firework rockets (17:03.5). Hearts climb back to 10. [SUBS 16:57] "Oh, shit." [SUBS 17:05] "[__] sea, todo por buscar esas madres." [SUBS 17:10] [Risas]
  10. 17:05–17:09.5 [SEEN] Inventory again: drags a "Potion of Invisibility" (Invisibility 8:00). 17:09.5–17:11 drinks it (purple potion raised); the yellow Invisibility icon comes back at 17:11.5. [SUBS 17:14] "Vámonos, perros."
  11. 17:12–17:30 [SEEN] Gliding/flying toward a large chorus-covered island with an End City on top, crowded with endermen. The island grows closer and fills the view by 17:26–17:30. Chat: "Lakshart joined the game", `<[MIEMBRO] Lakshart> Vuelve a casa T_T`, `<[MIEMBRO] Shadoune666> LA VECINA`. 10 full hearts. [SUBS 17:22] "Ahí vienen a regañarme, güey. Chingado," [SUBS 17:30] "vecina, me voy a morir, vecina. No"
  12. 17:30.5–17:32.2 [SEEN] High above the island, he **opens the inventory mid-air** (Invisibility 7:40–7:39) and moves his armor. At 17:30.55 the helmet and elytra are equipped. At 17:31.72 a purple armor piece is on the cursor, the "Elytra / Mending / Unbreaking III" tooltip shows over the chest slot, and the legs and boots slots look empty. At **17:32.0–17:32.2 all four armor slots show empty outlines**. The end-stone ground behind the menu gets closer. Webcam: he smiles.
  13. 17:32.23–17:32.33 [SEEN] Inventory closed: he is right on the island surface beside an enderman (its black legs fill the left of the screen). 10 full hearts. No elytra wings or armor visible.
  14. 17:32.36 [SEEN] The red PERMABANEADO lines appear in chat. 17:32.40 **Game over!** screen "Leyville fell from a high place". He died from full health with no totem pop.
  15. 17:32.6–17:34 [SEEN] "Joining world…", then the title **¡Permadeath! / Leyville ha muerto** over a stone-brick and red-brick building with torches. Webcam: he throws his head back laughing with his mouth wide open. [SUBS 17:35] "está aterrizando el agua. No,"
  16. 17:34–17:39 [SEEN] Kick screen and Mojang loading; he covers his face with both hands.
- **Frames:** `frames/26_alkapone_a_endermen_endcity.jpg` (16:40.3), `frames/26_alkapone_b_totem_pop.jpg` (16:41.8), `frames/26_alkapone_c_inventory_elytra_tooltip.jpg` (17:31.72), `frames/26_alkapone_d_last_frame_enderman.jpg` (17:32.26), `frames/26_alkapone_e_gameover.jpg` (17:32.42)
- **Notes/uncertainties:** The key visual beat: while falling or gliding toward the island he opens his inventory, and all armor slots, including the elytra and the Feather Falling IV boots, end up empty just before he hits the ground. **Why** he did it isn't stated in the footage. One untested guess is that armor shows through invisibility. The "Leyville" = Alkapone mapping comes from the card plus the custom line "MYMALK4PON3". The causes of the two totem pops at 16:41 and 16:46 aren't visible. The magenta ring sprites at 16:55 look like the ones in the #19 and #23 footage, but their source is unknown. The ASR lines are in Mexican Spanish slang ("güey", "chingado") and may be garbled.

---

## Days 38–56 (#27–#32)

---

### #27 — Nia Lakshart (in-game name "Lakshart")
- **Wiki:** death #27, 02/05/2020 18:22:00, "Ender Ghast", totem "Consumido". Custom death line: "Dice nyasu pero no tiene 7 vidas (Nia)". [WIKI]
- **Footage:** GersoonSG compilation https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1060 (card 17:40, gameplay 17:44–18:00, kick screen to 18:09). POV = Nia's own game client. There is no webcam and no stream overlay, only a small GersoonSG logo bottom-left, so this looks like a recording rather than a stream capture. The client is in Spanish ("¡Se acabó!", "Conexión perdida"). [SEEN]
- **Exact death message [SEEN]:**
  - Ban card (17:40–17:43): `PERMADEATH` / white blocky face icon / Latin motto / `Lakshart ha sido PERMABANEADA` / `02-05-2020 | 18:22:00 UTC` / `Muerte por ENDER GHAST`.
  - Death screen (17:59, dark and only a few frames long): `¡Se acabó!`. The lines under it are too dim to read.
  - Chat (after respawn): `Lakshart ha consumido un tóten. (Probabilidad: 32 != 99)` / red `Este es el comienzo del sufrimiento eterno de` / `<name in dark red, unreadable>. ¡HA SIDO PERMABANEADO!` / `<name, unreadable>. Dice nyasu pero no tiene 7 vidas` / `[MIEMBRO] Lakshart ha explotado por Ender Ghast` ("Ender Ghast" in yellow/orange; the green rank prefix is blurry but has the shape of `[MIEMBRO]`).
  - Title: `¡Permadeath!` / `Lakshart ha muerto`.
  - Kick screen (18:06–18:09): `Conexión perdida` / `Has sido PERMABANEADO` / button `Volver a la lista de servidores`.
- **Setting [SEEN]:** The End, on an outer island. Pale yellow end stone in low terraces, purple chorus trees, a black starless sky, and floating island undersides in the distance. An End City purpur tower stands top-left (17:44–17:50), with dozens of endermen everywhere (black, lit up with white glowing outlines, likely a Glowing/spectral effect). Near the end there is a small pool of water on the end stone, a pale gray cube and a wooden structure (17:57). Lighting is flat End light.
- **Gear/HUD [SEEN]:** XP level 38, full hunger. At 17:52.0 she has 10 full hearts. Totem in the OFFHAND (visible in the left hand) until the pop. The main hand holds a dark gray curved item I can't identify. Hotbar from left: blue item, pickaxe, bow (purple enchant glint), 41 yellow food (golden apple/carrot?), 42 red item, the dark curved item (selected), 16 lilac item, Totem of Undying, 16 ender pearls (15 after one is thrown). Effect icons top-right: a feather and a light bulb, which change to a gray shield and a red heart after the totem pop.
- **Beat sheet:**
  1. 17:44–17:51 [SEEN] She walks across end stone among a crowd of glowing-outlined endermen, with a tower on the left. An advancement-style toast top-right reads `¡Desafío completado! / Sin piedad`, and chat says `Lakshart ha completado el desafío <purple text, blurred>`. [SUBS 17:46] "sin piedad. Uh." [SUBS 17:51] "Sin piedad." (Speaker unclear; the voice says her name later, so it may be a teammate on call.)
  2. 17:52.25 [SEEN] A pale blue-white particle cloud appears at ground level on the left, and endermen close in on the right. Her hearts are still full.
  3. 17:52.75 [SEEN] **Totem pop.** The totem rises in front of the camera with a burst of big green and yellow particles, and the hearts flash. Chat line: `Lakshart ha consumido un tóten. (Probabilidad: 32 != 99)`. The offhand is empty from here on.
  4. 17:53.0–17:54.25 [SEEN] The big totem face fills the centre of the screen. A small white/pale gray **ghast** (cube body with dangling tentacles) floats in the sky upper-right (clearest around 17:53.0–17:53.5, at the top edge again at 17:54.0). An enderman's legs pass very close to the camera. By 17:55.0 the HUD shows about 3 red hearts plus 4 yellow absorption hearts. [SUBS 17:52] "Mata una bien. No, no, ten cuidado. Nia,"
  5. 17:54.25–17:54.75 [SEEN] A golden apple in her main hand. 17:55.25 [SEEN] She switches to the totem slot. 17:55.75–17:56.5 [SEEN] Ender pearl in hand (the stack drops from 16 to 15). [SUBS 17:56] "nía, no. Nia,"
  6. 17:57.0–17:58.0 [SEEN] The totem is held in her MAIN hand (tooltip "Tótem de inmortalidad"). She sprints past the water pool, the pale gray cube and the wooden building. The absorption hearts are gone and about 6 red hearts remain.
  7. 17:58.5–17:58.75 [SEEN] A pink ring shape in the centre of the view (unidentified), then a cyan tooltip with ✦…✦ decorations.
  8. 17:59.0 [SEEN] **Last gameplay frame:** she has switched to the purple-enchanted bow (hotbar slot 3), so the totem is no longer in either hand. Two large endermen stand at the right edge. She has about 6.5 hearts. No ghast, fireball or explosion is visible in the last frames.
  9. 17:59.25 [SEEN] Hard cut to the dark `¡Se acabó!` death screen (only about 0.25 s).
  10. 17:59.5–18:00.9 [SEEN] She respawns as a spectator in the Overworld at night in rain: a dark blue lake, sugar cane on the banks, a dirt hill. Big red `¡Permadeath!` / `Lakshart ha muerto` with the chat lines listed above. The action bar reads `Quedan 3453 de tormenta` (a storm countdown; a colon may be lost in the blur). [SUBS 17:59] "¿qué ha pasado? No," [SUBS 18:03] "no," [SUBS 18:06] "no."
  11. 18:01–18:09 [SEEN] Mojang loading screen, then the Spanish kick screen.
- **Frames:** `frames/27_nia_a_totem_pop_ghast.jpg` (totem pop, green particles, ghast upper-right, endermen), `frames/27_nia_b_last_frame_endermen.jpg` (last frame before death, bow in hand), `frames/27_nia_c_permadeath_title_chat.jpg` (rainy lake, title, full chat block).
- **Notes/uncertainties:** The fatal explosion is not visible: the footage cuts straight from a normal frame at about 6.5 hearts to `¡Se acabó!`. The only ghast seen is the small white one right after the totem pop, and I can't tell whether it is the killer. The item held in the right hand for most of the clip is unidentified. The name in the red "¡HA SIDO PERMABANEADO!" line and in the custom line is unreadable (dark red). The ban card says "PERMABANEADA" (feminine), while chat uses "PERMABANEADO".

---

### #28 — Hardyluski
- **Wiki:** death #28, 08/05/2020 14:10:12, "Gato Supernova", totem "No Activado (3%)". Custom line: "¡Más bien EZylusky! (Hardy)". [WIKI]
- **Footage:**
  - Main: GersoonSG https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1090 (card 18:10–18:14, gameplay 18:15–18:27, reaction and kick screen to 18:40). POV = Hardyluski's stream: webcam top-right (long dark hair, headset, pink/red T-shirt) with a `SUBS 68/200` counter. F3 debug is open for most of the clip. The client is in Spanish. [SEEN]
  - Supplementary 1: Shem "PERMADEATH - MU3RT3 de HARDYLUSKI" https://www.youtube.com/watch?v=K1Hh8JZSTIE&t=3 (143 s, same POV). It has about 15 s more flight BEFORE the compilation's start and about 90 s of webcam reaction after it. Shem time ≈ compilation time − 1078.4 s. [SEEN]
  - Supplementary 2: Pabl0WL "PERMADEATH MUERTE HARDYLUSKI + REACCIÓN ELRICHMC" https://www.youtube.com/watch?v=iCMUz5x4HAE (26 s). The visuals are identical to the compilation (Pabl0WL t ≈ compilation − 1095 s), and the auto-subs match the compilation's audio. [SEEN]
- **Exact death message [SEEN]:**
  - Card (18:10–18:14): `Hardyluski ha sido PERMABANEADO` / `08-05-2020 | 14:10:12 UTC` / `Muerte por GATO SUPERNOVA` (white skull-like face icon).
  - Death screen (red tint, 18:27.4): `¡Se acabó!` / `[MIEMBRO] Hardyluski ha explotado por Gato` / `Puntuación: 155408` / buttons `Observar mundo`, `Menú principal`.
  - Chat: `Hardyluski ha consumido dos tótem. (Probabilidad: 97 >= 97)` / red `Este es el comienzo del sufrimiento eterno de` / `Hardyluski. ¡HA SIDO PERMABANEADO!` / `Hardyluski. Más bien EZylusky` / `[MIEMBRO] Hardyluski ha explotado por Gato`.
  - Title: `¡Permadeath!` / `Hardyluski ha muerto`.
  - Kick: `Conexión perdida` / `Has sido PERMABANEADO` / `Volver a la lista de servidores`.
- **Setting [SEEN]:** Overworld, NIGHT, raining (blue-white streaks). He is high in the sky: F3 shows Y ≈ 145 at 18:17 rising to Y ≈ 250.8 at 18:27.3, over savanna, desert, beach and desert_hills biomes (F3 "Biome"), facing south. F3 also shows `Day 3611` and client `1.15.2-OptiFine_HD_U_G1_pre9`. Below him (in the Shem pre-roll): sand deserts, green plains and a winding river, all seen from high up.
- **Gear/HUD [SEEN]:** 8 hearts, all full (the heart row only has 8), armor 6/10, XP 66, full hunger. Totem of Undying in the OFFHAND slot (and visible in the left hand the whole time). Hotbar: pickaxe, diamond sword, bow, trident, 15 ender pearls, pink potion, 32 golden carrots(?), water bucket, 64 then 63 firework rockets. He first holds the trident, then from 18:20 the firework rocket (tooltip `Cohete de fuegos artificiales`).
- **Beat sheet (compilation times; Shem = −1078.4 s):**
  1. (Shem 0:03–0:18) [SEEN] He flies over desert, plains and a river at night in rain, holding a light-blue trident (riptide-style flight). F3 is toggled on and off.
  2. 18:15–18:16 [SEEN] The trident is fired forward as a long light-blue beam (riptide launch). The offhand totem swings up into the top-left of the view during the spin (my reading). [SUBS 18:15] "Oh, ese sí que es mío." [SUBS 18:17] "Dios mío, cuántos gatos encontramos aún." [SUBS 18:19] "Sí, sí, sí. Madre mía, hay una barbaridad de gatos."
  3. 18:17–18:19 [SEEN] F3 is on. He still holds the trident, and Y climbs 145 → 188.
  4. 18:20–18:27.3 [SEEN] He switches to the firework rocket and keeps climbing (Y 190 → 250.8), looking into the dark rainy sky. His hearts stay full (8/8) the whole time. No mob, cat or projectile is ever visible on screen. [SUBS 18:22] "Es que he jugado, bueno, unas horas desde el último día y"
  5. 18:26.9 [SEEN] F3 is briefly hidden. Night sky, rain, totem in the left hand, firework in the right, full hearts. His webcam face is calm, looking down at the screen.
  6. 18:27.4 [SEEN] **Hard cut to the red `¡Se acabó!` screen, a one-shot from 8/8 hearts.** The totem did not save him; chat later says `(Probabilidad: 97 >= 97)`. No explosion frame is visible.
  7. 18:29–18:30 [SEEN] Webcam: both hands come up over his mouth and nose. The screen dims. [SUBS 18:29] "no. Hardy, Hardy, no," [SUBS 18:34] "¿qué ha pasado?" [SUBS 18:35] "Te ha matado el gato. Te ha matado la explosión. No, Hardy." (The speaker is probably not Hardy; the Pabl0WL title says it is ElRichMC's reaction, but I have not verified the voice.)
  8. 18:31–18:34 [SEEN] Spectator view at world spawn (F3 XYZ ≈ 807 / 71 / −197): night, rain, a river, sugar cane, a small gray stone structure. `¡Permadeath!` / `Hardyluski ha muerto`. Hands still over his mouth.
  9. 18:35–18:40 [SEEN] Mojang loading screen. Webcam: hands on top of his head, then behind his head. Kick screen.
  10. (Shem 0:42–2:11) [SEEN] A long webcam-only reaction over the kick screen: hands behind the head, leaning back, looking down, a hand over his face, a laugh, drinking from a can. Selected [SUBS Shem]: 0:54 "sí sí pero no se activó como", 0:57 "no me puedo creerlo", 1:23 "wow aquí altura y estaba muy alto estaba muy alto estaba como a 400 bloques yo creo", 1:47 "cada vez más el 3% ya no es el 1", 1:57 "97 superior 97 que está tocado justo en el último por ciento".
- **Frames:** `frames/28_hardy_a_riptide_trident.jpg` (trident beam launch over the desert), `frames/28_hardy_b_last_frame_fireworks.jpg` (last frame: F3, rain, totem + firework, full hearts), `frames/28_hardy_c_se_acabo.jpg` (red death screen with "ha explotado por Gato").
- **Notes/uncertainties:** The "Gato Supernova" is **never seen** in any of the three videos. The death arrives between two frames with nothing on screen, so the cat, explosion and fuse cannot be described from footage. The vanilla line only says "Gato". The rising altitude while holding fireworks suggests elytra flight, but no elytra is visible (the armor bar shows 6/10), so this is unconfirmed. The chat says "consumido dos tótem" even though the totem visibly stayed in the offhand, and I don't understand the plugin's wording. The "400 bloques" remark in the subs conflicts with F3's Y ≈ 250 (ASR or speaker estimate). The ASR has "harding"/"jardín" for "Hardy".

---

### #29 — Th3Antonio (AFK ban)
- **Wiki:** death #29, 14/05/2020 00:00:00, "AFK", ban by AFK. Custom line "No tuvo por ser baneado(a) por AFK (Antonio)". [WIKI]
- **Footage:** GersoonSG https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1121 (18:41–18:50). No gameplay. [SEEN]
  - 18:41–18:44.9: ban card `Th3Antonio ha sido PERMABANEADO` / `14-05-2020 | 00:00:00 UTC` / `Ban por AFK` (white skull icon). 18:45: black with a stray text fragment "nds".
  - 18:46–18:49.9 (the actual chapter start): white text on black, `Dejo de tener actividad en Permadeath por su actividad en las partidas de Legue Of Legends` (sic, "Legue").
  - At 18:50 the CooLifeGame card begins.
- **Frames:** `frames/29_antonio_a_ban_card.jpg`, `frames/29_antonio_b_caption.jpg`
- **Notes:** No death to animate. The only content is the card and a caption saying he stopped playing because of League of Legends.

---

### #30 — CooLifeGame ("Jacky / CooLifeGame") (AFK ban)
- **Wiki:** death #30, 14/05/2020 00:00:00, "AFK". The wiki's custom-message list has "No tuvo por ser baneado(a) por AFK (Jaky)", which matches his display name "Jacky". [WIKI]
- **Footage:** GersoonSG https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1130 (18:50–19:27). No gameplay; it shows a ban card and screenshots of his tweets. [SEEN]
  - 18:50–18:54.9: card `CooLifeGame ha sido PERMABANEADO` / `14-05-2020 | 00:00:00 UTC` / `Ban por AFK` (face icon: black hair, pale face).
  - 18:55–19:10: a white Twitter screenshot, three tweets by `Jacky / CooLifeGame` (@CooLifeGame · 13 may.):
    1. "Entré a Permadeath hace 2 días y hoy entré 15 minutos fuera de stream para preparar las cosas para mañana, no entiendo por qué se me baneo por AFK, pero bueno lo acepto. GG"
    2. "Obviamente no soy ni youtuber ni streamer de Minecraft, no puedo dedicarle el tiempo que me gustaría. Me esforcé mucho ya que nunca había ido al Nether, ni había matado al dragón (mi mayor logro hasta la fecha había sido conseguir diamante) (1/2)"
    3. "Lo he pasado muy bien y para mi ha sido un gran reto, un juego donde antes de logear ya me temblaban las piernas, tensión en cada segundo de gameplay! He conocido además gente impresionante! Gracias por dejarme vivir esta aventura. Estoy triste pero supongo que es lo que hay! ❤"
  - 19:11–19:27: a fourth tweet: "Y POR FAVOR, no insultéis a @ElRichMC, él no tiene nada que ver! Me baneo el plugin por no jugar un número de horas mínimas, ElRich ha sido el mejor compañero que he tenido y apostó por mi cuando le rechacé entrar en un principio. Gracias de verdad @ElRichMC!"
  - 19:28–19:31: the BriiHD card (next chapter's content, inside this chapter's range). 19:32: the first BriiHD gameplay frame.
- **Frames:** `frames/30_coolife_a_ban_card.jpg`, `frames/30_coolife_b_tweets.jpg`, `frames/30_coolife_c_tweet_elrich.jpg`
- **Notes:** No death to animate. His own tweets say the plugin banned him for not playing a minimum number of hours, so the "AFK" label covers a minimum-playtime ban.

---

### #31 — BriiHD (in-game name "ElBrean")
- **Wiki:** death #31, 14/05/2020 07:59:25, "Ghast Demoníaco", totem "No Equipado (Por falta de slots)". Custom line "Ahora por fin descansa en paz (Breen)". [WIKI]
- **Footage:** GersoonSG https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1168 (card 19:28–19:31, gameplay 19:32–19:43.6, respawn 19:43.7–19:45, kick screen to 19:59). POV = BriiHD's game client: no webcam, a tiny FPS/debug line top-left, and Minecraft accessibility **subtitles** (sound captions) bottom-right. The client is in English. [SEEN] The transcript for this section only has [SUBS 19:36] "[Música]", with no speech lines.
- **Exact death message [SEEN]:**
  - Card: `BriiHD ha sido PERMABANEADO` / `14-05-2020 | 07:59:25 UTC` / `Muerte por GHAST DEMONÍACO` (face icon with dark hair).
  - Game-over screen (19:43.65–19:43.73, very faint): `Game over!`. The lines under it are unreadable.
  - Chat: red `Este es el comienzo del sufrimiento eterno de` / `<name in dark red>. ¡HA SIDO PERMABANEADO!` / `Ahora por fin descansa en paz...` / `[MIEMBRO] ElBrean was blown up by Ghast Demoníaco` ("Ghast Demoníaco" in yellow).
  - Title: `¡Permadeath!` / `ElBrean ha muerto`.
  - Kick: `Connection Lost` / `Has sido PERMABANEADO` / `Back to server list`.
- **Setting [SEEN]:** The Nether, in a huge man-made circular **arena**. A ring wall of light-gray speckled stone (white flecks) encloses a vast flat floor of dark red blocks covered in a regular grid of small light dots, crossed by long thin gray lines. The sky is dark red fog. In the middle is a small central build (wood, gray stone, white blocks, a purple block, an orange/yellow element) that he stands on or above. **Dozens of zombie pigmen in diamond armor** (bright cyan) swarm the build and are scattered across the floor. Arrows are stuck in the floor everywhere.
- **Gear/HUD [SEEN]:** 10 full hearts, armor 10/10, XP 25, full hunger. The OFFHAND holds a dark teal item marked with an X (large at the left edge of the screen; unidentified). The totem is NOT in the offhand; it sits in hotbar slot 7, which matches the wiki's "no slots". Hotbar: diamond sword, pickaxe, pink splash potion, dark item with red, 32 teal X-marked items, golden apple, Totem of Undying, **bow** (selected, purple enchant glint, cyan italic name tooltip `Barret .50`), 59 yellow items (golden carrots?).
- **Beat sheet:**
  1. 19:32–19:35 [SEEN] Looking down from the central build at the cyan pigmen piling onto it. Captions: `Zombie Pigman dies / Something trips / Zombie Pigman hurts / Zombie Pigman grunts / Footsteps`.
  2. 19:35.0–19:35.5 [SEEN] He briefly scrolls to the totem slot (tooltip `Totem of Undying`) and then back to the bow. [SUBS 19:36] "[Música]"
  3. 19:36.5–19:41.5 [SEEN] He turns outward toward the ring wall and shoots arrow after arrow with the bow drawn (captions `Arrow fired`, `Arrow hits`, `Bee buzzes angrily`, `Bee hurts`, `Zombie Pigman angers`). Several times a tan X-shaped sprite flashes right in front of the camera (19:38.5, 19:39.8, 19:41.3). This is consistent with his own arrow seen from behind as it leaves. Hearts stay full.
  4. 19:40.5–19:41.0 and 19:42.5 [SEEN] A small orange, flame-like object hangs above the far wall at the top-centre, possibly the incoming fireball. `Ghast shoots` appears in the captions at 19:42.5. No ghast body is ever clearly visible.
  5. 19:42.75–19:43.48 [SEEN] He looks almost straight down at the central build, swarmed by diamond pigmen, with arrows everywhere. Captions: `Ghast cries / Ghast shoots`. **Hearts still 10/10.**
  6. 19:43.57 [SEEN] **A giant orange/yellow/white blocky fireball fills the whole top half of the screen**, right on the camera. A red chat line starts to appear and `Item breaks` is added to the captions.
  7. 19:43.65–19:43.73 [SEEN] A faint `Game over!` over a darkened frame, so it was a one-shot from full health. 19:43.82: black frame with the chat lines. Captions: `Explosion / Block broken / Player dies / Item breaks / Ghast cries / Ghast shoots`.
  8. 19:43.75–19:45.25 [SEEN] Spectator respawn in the Overworld at night: a grassy plateau with torches, a nether portal (purple) on the right, a small house with a door, a tall white/quartz pillar on the left, a river on the right, stars. A huge faded ghost of the text `[MIEMBRO] ElBrean was blown up by Ghast Demon…` crosses the screen, then `¡Permadeath!` / `ElBrean ha muerto`.
  9. 19:46–19:59 [SEEN] Mojang loading screen, then the kick screen.
- **Frames:** `frames/31_brii_a_pigmen_arena_bow.jpg` (the arena, pigmen, bow), `frames/31_brii_b_fireball_face.jpg` (the fireball filling the screen), `frames/31_brii_c_permadeath_title.jpg` (Overworld night, title).
- **Notes/uncertainties:** The Ghast Demoníaco itself is not identifiable in any frame, only its fireball at point-blank range and possibly a small flaming dot earlier. I can't tell what the arena floor's dots are (lights? torches?). The offhand item and the "dark item with red" in the hotbar are unidentified. The yellow 59-stack is probably golden carrots.

---

### #32 — ElRichMC (series creator) — IMPORTANT
- **Wiki:** death #32, "Caer al Vacío", totem "No Activado (Vacío)". Custom line "Eso no ha sido muy Ey Ey Ey de tu parte... (ElRichMC)". **Date conflict in the wiki:** the prose list says 15/05/2020 19:23:55, but the table says 20/05/2020 19:23:55. The compilation's ban card says **20-05-2020**. [WIKI][SEEN]
- **Footage:**
  - Main: GersoonSG https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1200 (card 20:00–20:03, gameplay 20:04.5–20:19.2, death and spectator view 20:19.2–20:21, kick screen to about 21:04). POV = ElRichMC's stream. The top overlay has a yellow progress bar ("CAPÍTULO EN …" / "MAÑANA"), `Cheerleader: Kiritowasabi 150000` and `Donuts Máximus: Wendingo1319 101€` in the top-right, a glass/cup icon with a cyan goal bar in the bottom-left, a dancing banana in the bottom-right, and "Último seguidor" scroll alerts. The webcam is not visible. The client is in English. [SEEN]
  - Supplementary A (multi-POV, required): "Muerte de ElRichMC en Permadeath Desde Todas Las Perspectivas" (channel "Zzzz ElCanal", uploaded 2021) https://www.youtube.com/watch?v=p7SdaB-a9Ls, 37 s. It is a 2×2 grid; MP time ≈ compilation time − 1204.2 s. [SEEN]
  - Supplementary B: Pabl0WL "PERMADEATH MUERTE ELRICHMC Y REACCIÓN KILLERCREEPER55" https://www.youtube.com/watch?v=m_5s5wBMvHc, 70 s. The visuals are ElRichMC's POV only, with about 37 s of lead-up footage the compilation lacks. KR time ≈ compilation time − 1168.2 s. [SEEN]
- **Exact death message [SEEN]:**
  - Card (20:00–20:03.9): `ElRichMC ha sido PERMABANEADO` / `20-05-2020 | 19:23:55 UTC` / `Muerte por CAER AL VACÍO` (dark gray skull-face icon).
  - Game-over screen (20:19.2, overlaid by `Joining world...` because he clicked Spectate at once): `Game over!` / `[ADMIN] ElRichMC ☠ fell out of the world` / `Score: 225382` / buttons `Spectate world`, `Title screen`.
  - Chat: red `Este es el comienzo del sufrimiento eterno de` / `ElRichMC. ¡HA SIDO PERMABANEADO!` (name in dark red) / `ElRichMC. Eso no ha sido muy ey ey ey de tu parte` / `[ADMIN] ElRichMC ☠ fell out of the world` (on iLuh's Spanish client: `[ADMIN] ElRichMC ☠ se ha caído al vacío`, then yellow `ElRichMC left the game`).
  - Title: `¡Permadeath!` (red, with a pink/purple glitch-noise fill) / `ElRichMC ha muerto`.
  - Kick: `Connection Lost` / `Has sido PERMABANEADO` / `Back to server list`.
- **Setting [SEEN]:** The End, inside an **End City**: purpur-block hallways, end-stone-brick ceiling details, a wooden ladder on the wall, a red shulker box (red block) on the floor next to a glowing pale-cyan block, and a dark (black/teal) shulker or ender chest. Through the openings are End void and a hanging end-ship/tower silhouette. Under the city there is only black void, with the gray undersides of the End islands visible above him as he falls.
- **Gear/HUD [SEEN]:** 10 red hearts plus an extra row of 3 red hearts (13 total), armor 10/10, XP 20, full hunger. Totem of Undying in the OFFHAND (visible in the left hand, and in the offhand slot of the inventory the whole time). Main hand: pickaxe (cyan/purple, enchanted; its cyan italic name tooltip is `"La última esperanza"`). Hotbar: diamond sword, bow, pickaxe, 58 firework rockets, 52 golden carrots, Potion of Slow Falling, 16 ender pearls, pink splash potion, totem. Armor includes the custom chestplate `Infernal Netherite Chestplate` (Protection IV, Color #FF0000, +2 Armor Toughness, +8 Armor, Unbreakable, `minecraft:leather_chestplate`, NBT: 7 tag(s)).
- **Beat sheet (main = compilation; KR = Pabl0WL lead-up):**
  1. (KR 0:00–0:08) [SEEN] Rich walks through end-stone-brick and purpur rooms of the End City. At KR 0:01 his inventory shows effects `Slow Falling 0:02` and `Resistance 0:02` and a tooltip `Machote del Machote` (Efficiency V, Silk Touch, `minecraft:diamond_axe`).
  2. (KR 0:09–0:22) [SEEN] killercreeper_55 (`[MIEMBRO] killercreeper_55` nametag with a red skull icon; purple armor, holding a golden item) is in the purpur room next to the red shulker box and the dark chest. Rich looks around the room and at a floor pit with a small purple item in it.
  3. (KR 0:30–0:37) [SEEN] Rich opens an Ender Chest and hovers over a `Shulker Box` whose tooltip reads `Potion of Slow Falling x1` (×5 lines) `and 17 more`, then places the shulker box on the floor.
  4. 20:04.5–20:05.5 [SEEN] (compilation footage starts) Killer walks toward the camera down the purpur hallway past the red box. Rich turns to the End City exterior.
  5. 20:06.0–20:06.5 [SEEN] The Shulker Box GUI is full of potions, with tooltip `Potion of Slow Falling / Slow Falling (4:00)`. He takes one.
  6. 20:07–20:09.75 [SEEN] He selects the pickaxe (`"La última esperanza"`) and looks down the hallway: the red box and glowing block on the floor, Killer standing at the far end by a ladder. [SUBS 20:04] "Venga, anda, venga, anda. Mira, ¿sabes qué? Prefiero suicidarme. Adiós, killer." [SUBS 20:09] "Ha estado muy hacerte. Adiós."
  7. 20:10.25–20:11.15 [SEEN] **He looks straight down and mines a purpur floor block** right beside the red box and glowing block. The block cracks and breaks into a black square hole with debris, and the void shows through.
  8. 20:11.25–20:11.4 [SEEN] He drops through the hole. Purpur edges slide past, then black with floating block particles. His hearts are still full (13).
  9. 20:11.5–20:13.5 [SEEN] He scrolls past `Golden Carrot` to `Potion of Slow Falling` and **drinks it while falling through black void**. The potion bottle is raised in the centre, and the gray undersides of the End islands hang above. [SUBS 20:12] "No lo he visto, pero te has tirado. No," [SUBS 20:15] "me muero, me muero, me muero, me muero, me muero." [SUBS 20:18] "G."
  10. 20:13.6–20:14.5 [SEEN] `Glass Bottle` (empty), then he scrolls to `Firework Rocket`.
  11. 20:14.75–20:19.1 [SEEN] **He opens his inventory mid-fall** over a black background. Effects: `Slow Falling 3:58` counting down to `3:54`, and `Resistance 0:02` → `0:00` (gone by 20:18.1). He hovers over the `Infernal Netherite Chestplate` (20:15.0). The chestplate slot looks empty for about 2 s, and the character preview's torso turns red again from 20:17.7 (he seems to re-equip it). Tooltips follow: `Golden Apple` (about 20:16.5), `Panic Potion / Instant Health V / minecraft:splash_potion` (20:16.75, 20:18.2–20:18.5), and `Totem of Undying / minecraft:totem_of_undying` (20:17.5–20:18.1). The offhand slot keeps its totem. The HUD hearts are hidden behind the GUI.
  12. 20:19.2 [SEEN] **Death:** the faded `Game over!` screen with `fell out of the world` and `Score: 225382`, already showing `Joining world...`.
  13. 20:19.5–20:21.0 [SEEN] Spectator view: a room of yellow-and-black hazard-stripe walls, a blue block wall, a dark red brick wall and a pale cyan glass-grid floor, with a small gray figure in the distance. Big glitchy `¡Permadeath!` / `ElRichMC ha muerto` and the four chat lines. [SUBS 20:20] "¿Qué ha pasado?" [SUBS 20:24] "No tenía la salida."
  14. 20:21.25–21:04 [SEEN] Kick screen (with a Mojang reload 20:22–20:24), static apart from follower alerts popping in. [SUBS 20:34] "No me jodas, tío. En serio, al menos lo he dicho y ha quedado bien." [SUBS 20:43] "Ostras, ya quiero ver las reacciones, las reacciones de los demás." [SUBS 20:47] "No, tío, no me jodas, tí bro." [SUBS 20:51] "Ay, qué pena, tío." [SUBS 20:55] "no tenías las elitras, no tenías slow falling. Me tomar el slow falling para que vies cayendo y no tenía que seguir las fuerzas." [SUBS 21:03] "Pero si hay un montón de altura, tío."
- **Multi-POV breakdown (p7SdaB-a9Ls) [SEEN]:**
  - 0:00–0:04: text cards `Ya se que es 2021 pero como quiera quería subirlo xddde` and `Creditos De Los Creadores En La Descripción`. The grid starts at 0:04.5. Each quadrant is identified by the `¡Permadeath! / <name> ha muerto` subtitle its own client shows. **Each client printed its OWN player's name in the subtitle, not ElRichMC's**, while chat correctly names ElRichMC.
  - **Top-left = ElRichMC** (same footage as the compilation; a white "H" at the quadrant's top-right). 0:04.5–0:06.5 purpur hallway with red box and glowing block, Killer at the far end. 0:06.5–0:07 digs the floor hole. 0:07.5 falls into black. 0:08–0:09.5 drinks Slow Falling above the End island undersides. 0:10 `Firework Rocket`. 0:10.5–0:14.5 inventory (`Slow Falling`/`Resistance` effects, tooltips `Ender Chest`, `Infernal Netherite Chestplate`, `Panic Potion`, `Totem of Undying`). 0:15.0 `Game over!` + `Joining world...`. 0:15.5–0:16.5 hazard-stripe room, `ElRichMC ha muerto`. 0:17.5 onward: Mojang loading screen.
  - **Top-right = Shadoune666** (webcam top-left of the quadrant: young man with curly brown hair in a gaming chair, `Subgoal : 371 / 400`). He is travelling in the Nether along a long light-blue packed-ice road studded with rows of dark blocks, inside a tunnel of lumpy red-brown flesh-like netherrack texture, with torches on the walls. Totem in the left hand, blue/purple pickaxe in the right. At 0:12.5–0:13 he passes a sign reading `CASA DE HARDYLUSKI`. At 0:15.5 his screen shows `¡Permadeath!` / `Shadoune666 ha muerto` plus the chat lines (English `fell out of the world`). Webcam: he stares at the screen, calm. A tab-list-style health bar box appears top-centre.
  - **Bottom-left = iLuh** (webcam bottom-right: dark hair, beard, headset). F3 is on while he flies with elytra over the outer End islands in the void, following a purple-armored elytra player ahead (identity unknown). At 0:07.5 his inventory shows effects `Absorción` and `Caída lenta` and a tooltip `Tarta de calabaza`; the client is in Spanish. At 0:15.0 chat shows the red lines and `[ADMIN] ElRichMC ☠ se ha caído al vacío`. At 0:15.5 `¡Permadeath!` / `iLuh ha muerto`. Webcam 0:16–0:17: **eyes wide, mouth open, leaning in**. At 0:17.5–0:19.5 he opens chat, showing the conversation just before: `[ADMIN] ElRichMC > qué suerte!`, `iLuh > xDDDDD…`, `iLuh > no te creo`, `Shadoune666 > Es un cofre con solo un pico entonces? xD`, `iLuh > un cofre de una torre`, `Shadoune666 > Funciona picar el bloque de Netherite con pico de Netherite?`, `[ADMIN] ElRichMC > no`, `Shadoune666 > Ah vale ok!`, then the death lines and `ElRichMC left the game`. At 0:20 a yellow vertical object is in the centre of his view (unidentified).
  - **Bottom-right = killercreeper_55** (no webcam; a "Last Sub" box top-left and green bars top-right). He is in the SAME End City: 0:05.5–0:06 looking down a purpur corridor with Rich standing at the far end. 0:07–0:08.5 inventory. 0:09–0:11.5 walks to the red box and dark chest (red particles as he breaks or uses it). 0:12–0:14 Ender Chest GUI with tooltip `Red Shulker Box: Infernal Netherite x1, Infernal Netherite x1, Panic Potion x1, Panic Potion x1, Hacha de Netherite x1, and 22 more`. 0:14.5 the tab list (`Luh`, `killercreeper_55`, `Shadoune666`, `[ADMIN] ElRichMC`) and a dark shulker box on the floor. 0:15.5–0:20 `¡Permadeath!` / `killercreeper_55 ha muerto` while he looks around the empty purpur room where Rich had been. Chat shows the English death lines and `ElRichMC left the game`.
  - Auto-subs of the MP video are unusable ASR ("a mi casa no la vista", "no tenía nada").
- **Frames:** `frames/32_rich_a_digs_hole_purpur.jpg` (hole mined in the purpur floor beside the red box and glowing block), `frames/32_rich_b_slowfalling_void.jpg` (drinking Slow Falling in the void under the End islands), `frames/32_rich_c_permadeath_title_chat.jpg` (hazard-stripe spectator room, title, chat), `frames/32_rich_d_multipov_grid.jpg` (the 4-POV grid at the moment of the titles).
- **Notes/uncertainties:** The footage shows ElRichMC **deliberately** mining through the End City floor into the void after saying "Prefiero suicidarme. Adiós, killer." He drinks Slow Falling and then spends his last 4.5 s inside the inventory menu. Why he did it (a stunt, a planned escape with fireworks or slow falling, or a real farewell) is not clear from the footage. The post-death subs ("no tenías las elitras…", "Pero si hay un montón de altura") suggest he or someone on call expected to survive the fall, but the ASR is garbled and I can't identify the speakers. The multi-POV auto-subs give no usable reaction speech, and the Pabl0WL "reacción Killercreeper55" video only has Rich's visuals; its audio could not be checked (ASR only). The void kills through the totem, which matches the wiki's "No Activado (Vacío)". The 13-heart display (an extra red row) is as seen and not explained. The small gray figure in the spectator room is unidentified.

---

## Days 59–60 (#33–#39): the end of the server

### #33 — EsVandal
- **Wiki:** death #33, "Muerte por Wither Skeleton Emperador", time 22:58:41, totem "Consumido". **Date conflict inside the wiki:** the list section says 16/05/2020 and the table says 23/05/2020. Custom message listed: "Has sido promocionado al rango boomer". [WIKI]
- **Footage:** GersoonSG compilation, chapter "EsVandal": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1270 (21:10–21:35; gameplay 21:10–21:20, then loading and kick screens). POV = EsVandal's own client: his HUD, no webcam, no stream overlay except a Twitch alert on the kick screen (frog emote, "KarionSiand OwOed! x10", message "acabo de ver en la RAE que se acepta demoniaco con tilde o sin tilde"). Spanish game language. [SEEN]
- **Exact death message [SEEN]:**
  - Game-over screen: `¡Se acabó!` / `[MIEMBRO] EsVandal (red skull icon) ha muerto por un flechazo de Esqueleto Wither` / `Puntuación: 76180` / buttons "Observar mundo", "Menú principal" (with "Entrando al mundo…" already on top, because he clicked Observe at once).
  - Chat: red `Este es el comienzo del sufrimiento eterno de EsVandal. ¡HA SIDO PERMABANEADO!` / grey `EsVandal, Has sido promocionado al rango boomer` / `[MIEMBRO] EsVandal (skull) ha muerto por un flechazo de Esqueleto Wither`.
  - Title: `¡Permadeath!` / `EsVandal ha muerto`. Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / "Volver a la lista de servidores".
  - The on-screen cause is "Esqueleto Wither" (arrow). The word "Emperador" does not appear anywhere on screen.
- **Setting [SEEN]:** **Nether**, very dark. A dark nether-brick walkway or bridge runs straight ahead, with dark red netherrack walls and ceiling. A higher netherrack ledge with **fire** burning on it, a speckled tan-orange block (glowstone-like) on the right, and small grey smoke squares drifting.
- **Gear/HUD [SEEN]:** full armor (10 icons). Health: 10 red hearts plus a second row of 3 red hearts (13 hearts). XP level 34, full hunger. **Totem of Undying in the off-hand** (left hand and off-hand slot). Right hand: **purple enchanted bow** (slot 3 selected). Hotbar: purple sword, purple sword, bow, a blue rectangular item, purple pickaxe, ×55 food (bread/pie-like), ×12 golden apples (tooltip "Manzana dorada"), ×50 dark oak logs (tooltip "Tronco de roble oscuro"), a light-blue tool. One status icon top-right (teal shield); after the totem, a grey armor icon and a red heart also appear.
- **Beat sheet:**
  1. 21:10–21:13 [SEEN] Looking up the dark nether-brick walkway, bow drawn in the right hand, totem in the left. Small grey smoke squares puff in the air ahead (21:11). Health full (13 hearts).
  2. 21:14–21:14.5 [SEEN] Fire appears on the ledge ahead. The tan-orange speckled block is to the right.
  3. 21:14.75–21:15.25 [SEEN] On the ledge at the left, beside the fire, a **teal/cyan humanoid mob holding a bow** stands facing him. It glows bright against the dark. He still has full health.
  4. 21:15.5–21:16.0 [SEEN] He turns right. A **pale pink/lavender humanoid holding a dark sword** stands at the far right edge on the ledge.
  5. 21:16.25 [SEEN] A **burning figure** (flames on top, lavender body) is above the crosshair, toward the ledge. Health still full.
  6. 21:16.5 [SEEN] The screen fills with orange **fire overlay** (he is burning). The **totem pops**: the totem flies up to the center. Health drops at once to **1 red heart + 4 gold absorption hearts**, the rest empty. So he took a huge hit from full.
  7. 21:16.7–21:17.75 [SEEN] The big totem stays in the center while he burns. Green particles. The hearts flash pink (regeneration) and then keep falling back to 1–2 red. [SUBS 21:17] "Fuck."
  8. 21:17.9–21:18.9 [SEEN] Still burning. He scrolls to "Tronco de roble oscuro" (dark oak logs) and looks down at the dark floor. Health hovers at 2–4 red + 4 gold.
  9. 21:19.1 [SEEN] He switches to **golden apple** (tooltip "Manzana dorada"). Still burning, 3–4 red + 4 gold hearts.
  10. 21:19.25 [SEEN] HUD gone. The chat death lines appear over the dark nether-brick.
  11. 21:19.5 [SEEN] `¡Se acabó!` screen, instantly covered by "Entrando al mundo…".
  12. 21:19.75–21:21 [SEEN] **¡Permadeath! / EsVandal ha muerto** over an Overworld view: a dirt/gravel slope, blue sky, a dark bow-like object in the foreground (spectating another player). Then it fades.
  13. 21:22–21:24.9 [SEEN] MOJANG loading screen. 21:25–21:35 kick screen with the frog alert. [SUBS 21:28] "Acabo de ver en la RAE que se acepta demoníaco con tilde o sin tilde."
- **Frames:** `frames/33_esvandal_a_teal_archer_fire.jpg`, `frames/33_esvandal_b_totem_pop_burning.jpg`, `frames/33_esvandal_d_se_acabo_screen.jpg`, `frames/33_esvandal_c_permadeath_title_chat.jpg`
- **Notes/uncertainties:** No arrow is visible in any frame. The kill is known only from the message. Which of the three mobs is the "Wither Skeleton Emperador" is not certain. The teal bow-holder (beat 3) fits "flechazo" best, but that is an inference. The teal, pink and burning figures are too small and dark to identify. After the totem he dies about 3 s later while burning. The last damage source (fire or another arrow) can't be seen. There's no webcam, so no visible reaction apart from SUBS "Fuck." This death is on a different day from #34–#38.

### #34 — Kakytron
- **Wiki:** death #34, 24/05/2020 14:58:18, "Muerte por Ender Quantum Creeper". Totem: "No Equipado (Por falta de slots)". Custom message: "Ahora por fin descansa en paz". [WIKI]
- **Footage:** GersoonSG compilation, chapter "Kakytron": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1295 (21:35–22:01; ban card 21:35–21:38.75, gameplay 21:39–21:46, aftermath to 22:00). **POV is NOT Kakytron's.** It is a third, invisible player/streamer (green text "You are invisible to other players!", no hotbar or hearts, no webcam). Overlay: a purple sub-alert banner top-left ("birir ×5", later "richardfogeman", "PanRuiz"), "Cheerleader: Kiritowasabi 150000" / "Donuts Máximus: Wendingo1319 101€" top-right, a community bar "27/300 Hacemos un cambio de dificultad juntos 2185 / 3000", a white scroll "Último seguidor…" with a red seal and a dancing banana bottom-right, a glass icon bottom-left. It is the same overlay as the bottom-left "third POV" in the CrisGreen and Luh supplementary videos. [SEEN]
  - **POV identification (overlay comparison) [SEEN]:** this overlay is the same as **ElRichMC's stream**: "Cheerleader: Kiritowasabi 150000", "Donuts Máximus: Wendingo1319 101€", the "Hacemos un cambio de dificultad juntos" bar, the "para obtener Life Orb" timer, the white scroll and the banana. The same overlay appears in ElRichMC's own death (#32) and in OmniRich's (#39, where chat reads "[ADMIN] OmniRich"). So the invisible spectator is **ElRichMC after his death (as admin/OmniRich)**. This fits [DOC 1:08:46] "se puede ver desde el POV de Rich" and the `[ADMIN] Omnirich` line in the third POV of the Luh multi-POV.
- **Exact death message [SEEN]:**
  - Ban card (21:35–21:38.75): "PERMADEATH" logo, a black-and-white skin face, "Et hoc est inferum. Moritur an supergreditur." (script), `Kakytron ha sido PERMABANEADO` / `24-05-2020 | 14:58:18 UTC` / `Muerte por ENDER QUANTUM CREEPER`.
  - Chat (21:45 on): red `Este es el comienzo del sufrimiento eterno de Kakytron. ¡HA SIDO PERMABANEADO!` / `Ahora por fin descansa en paz.` / `[MIEMBRO] Kakytron (red skull icon) was blown up by Ender Quantum Creeper` / yellow `Kakytron left the game` / `Saved screenshot as 2020-05-24_16.58.19.png` / red `¡Comienza el Death Train con duración de 10 horas!` (the digit could be 10 or 18; it looks like 10).
  - Title: `¡Permadeath!` / `Kakytron ha muerto`.
  - No Game-over screen (not his POV).
- **Setting [SEEN]:** Overworld, daytime, overcast blue-grey sky at first, with small blue/purple specks drifting through the air (rain or particles). A flat sandy/dry-grass plain with a low dirt wall and torches. On the horizon a dark blocky object with a flat pale top (unidentified). Then a thick **bamboo** grove, and inside it a large **stone-brick plaza**: a sandstone path lined with lamp posts (lanterns), dark wooden arches/fences, pumpkin-faced posts by the entrance, leading to a **stone-brick house** with many dark-framed windows. Boss bar `07:31:49` → `07:31:43 para obtener Life Orb` at death.
- **Gear/HUD:** Kakytron is seen only from outside: **purple armor** (full body) and a green "[MIEMBRO] Kakytron" nametag with a red icon. His hotbar, hearts and totem are not visible. [SEEN]
- **Beat sheet:**
  1. 21:38.9–21:39.75 [SEEN] The invisible camera flies low over the sandy plain toward a dirt wall. The dark object sits on the horizon.
  2. 21:40–21:41 [SEEN] It pushes through the bamboo. Through the stalks: the stone plaza, the sandstone path and the house. [SUBS 21:41] "¡Ostras! ¡Ostras! Kaki, kaki, no, Kaki,"
  3. 21:41.75–21:42.25 [SEEN] The camera is right behind **Kakytron**: his purple body and big nametag "[MIEMBRO] Kakytron" fill the bottom of the frame. He walks up the sandstone path toward the house.
  4. 21:42.5–21:44.5 [SEEN] Camera rises to a high angle behind him. He walks steadily up the path between the arches and lamp posts toward the front door.
  5. 21:44.6–21:45.1 [SEEN] He reaches the doorway between the two pumpkin-faced posts. At 21:45.0 a **green patch** shows in the doorway next to his purple figure (too small to identify).
  6. 21:45.2–21:45.4 [SEEN] He is gone into or through the doorway. Only a small red dot is visible there.
  7. 21:45.5 [SEEN] **The whole front of the house is blown out** in one frame: a crater of broken stone brick, the sandstone floor exposed, rubble, and **a cluster of bright green blocks/items** in the foreground of the hole. [SUBS 21:46] "no."
  8. 21:45.7 [SEEN] A white smoke puff at the lower left. The ¡Permadeath! title starts fading in.
  9. 21:46–21:51 [SEEN] **¡Permadeath! / Kakytron ha muerto** over the crater. The chat lines appear (21:45 on).
  10. 21:52–22:00 [SEEN] Static view of the crater. The green cluster is still sitting in the hole. The chat shows the "Saved screenshot…" and "Death Train" lines.
- **Frames:** `frames/34_kakytron_a_ban_card.jpg`, `frames/34_kakytron_b_walking_plaza.jpg`, `frames/34_kakytron_c_doorway_last_frame.jpg`, `frames/34_kakytron_d_crater_chat.jpg`, `frames/34_kakytron_e_permadeath_title_crater.jpg`
- **Notes/uncertainties:** This is a third-person spectator view from far away. The creeper itself is not clearly visible; the green patch at the door (beat 5) is the only candidate, and I can't identify it. There is no flash frame; the house goes from intact to crater between 21:45.4 and 21:45.5. The green cluster in the crater could be dropped items or blocks; I can't tell. The screenshot filename (16.58.19 local time) fits the wiki time 14:58:18 UTC. The watching streamer's voice (SUBS) warns "Kaki" several seconds before the blast.

### #35 — CrisGreen (Crisgreen)
- **Wiki:** death #35, 24/05/2020 15:32:41, "Muerte por Ender Quantum Creeper". Totem: "No Equipado (Por falta de slots)". Custom message: "Ahora por fin descansa en paz". [WIKI]
- **Footage:** GersoonSG compilation, chapter "CrisGreen": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1321 (22:01–22:36; ban card 22:01–22:04.75, gameplay 22:05–22:11, reaction to 22:35). POV = CrisGreen's own stream: webcam in a green neon frame labelled "CG" at the left under the Twitch chat (young man, dark hair, headphones, maroon hoodie, boom mic). The chat is spamming "WITHER", "Witherss", "criss el witer", "Todos con el stream del locoMC abierto", "pasen rapido". [SEEN]
- **Supplementary:** "Muerte de Crisgreen en Permadeath Desde Todas Las Perspectivas" (Zzzz ElCanal) https://www.youtube.com/watch?v=02yEAFKWuKA&t=27 (0:27–0:33). Three quadrants: top-left = Cris (same as the compilation), top-right = **Shadoune's stream** (same "Subgoal : 390 / 400" overlay as #36), bottom-left = a third, invisible player watching from the corridor behind them (green text "You are invisible to other players!"). Supplementary time ≈ compilation time − 21:40 (the boss-bar values match). [SEEN]
- **Exact death message [SEEN]:**
  - Ban card (22:01–22:04.75): "PERMADEATH" logo, a pale grey skin face with black eyes, the script Latin line, `CrisGreen ha sido PERMABANEADO` / `24-05-2020 | 15:32:41 UTC` / `Muerte por ENDER QUANTUM CREEPER`.
  - Chat (22:10.5 on): red `Este es el comienzo del sufrimiento eterno de Crisgreen. ¡HA SIDO PERMABANEADO!` / grey `Ahora por fin descansa en paz.` / `[MIEMBRO] Crisgreen (red skull icon) was blown up by Ender Quantum Creeper`.
  - There is no "Game over!" screen and no ¡Permadeath! title in his own POV. The screen goes white, then "Loading terrain…", then MOJANG, then `Connection Lost` / `…tion: java.io.IOException: Se ha forzado la interrupción de una conexión existente por el host remoto` / "Back to server list" (not the usual "Has sido PERMABANEADO").
  - The ¡Permadeath! / `Crisgreen ha muerto` title is visible in the supplementary's other two POVs (0:32–0:37).
- **Setting [SEEN]:** Overworld base. A long, narrow corridor with white/sand-colored walls, gravel edges and a flowing blue water channel with brown stepping blocks down the middle. Signs on the walls, skull-and-crossbones pictures near the ceiling. At the end of the corridor is an **obsidian Nether portal**. Cris and Shadoune are standing **inside the portal** (purple swirl across the screen). Boss bar `06:57:24` → `06:57:19 para obtener Life Orb`. Action bar `Quedan 04:34:07` → `04:34:02 de tormenta`.
- **Gear/HUD [SEEN]:** full armor (10 icons), 1 gold absorption heart above 10 red hearts, and a gold heart at the end of the row. XP level 82, full hunger. Right hand: a **purple shield**, held up most of the time. Left (off) hand: a teal hook-shaped item. The off-hand slot indicator left of the hotbar shows the teal "X" blocked-slot icon, the same as the two blocked slots at the right end of his hotbar, which fits the wiki's "falta de slots". Hotbar: purple sword, purple shield (selected), ×61 brown item, ×51 yellow/orange item, ×52 golden apples, a diamond, a purple pickaxe, 2 teal X slots. Two status icons top-right (armor/shield).
- **Beat sheet:**
  1. 22:05.0–22:05.75 [SEEN] Inside the purple portal swirl, face-to-face with **Shadoune** (purple armor, black face with red markings; his huge green nametag "[MIEMBRO] Sha…" floats across the top of the screen). Cris holds his shield up. A pink swirl particle drifts by. [SUBS 22:05] "Bueno,"
  2. 22:05.75–22:06.75 [SEEN] Shadoune eats a golden apple (yellow crumbs at his face) and holds a dark-red rod-like item.
  3. 22:07.0–22:07.75 [SEEN] Shadoune switches to a glinting purple sword. Cris's shield drops lower. [SUBS 22:07] "com voy suerte."
  4. 22:08.0–22:09.75 [SEEN] Shadoune now holds a long blue-and-gold item diagonally (trident-like; not certain). A faint pale pixel-outline swirl passes left of center. Webcam 22:08.75–22:09.25: Cris lifts a hand to his head. His health is full throughout.
  5. 22:10.0–22:10.25 [SEEN] The view lurches: purple and red smear, Shadoune very close. The last frame with HUD still shows full health.
  6. 22:10.5 [SEEN] HUD gone. The chat death lines appear. Green and yellow diamond particles float in the purple portal (they look like totem particles; see supplementary, Shadoune pops a totem at this moment). So he died in one hit from full health.
  7. 22:10.75–22:11.0 [SEEN] His camera now shows the corridor from above: the water channel and stepping blocks, with **brown block debris and a splash flying** (explosion aftermath). [SUBS 22:11] "Ah."
  8. 22:11.25 [SEEN] The game window goes white (a black triangle icon, the boss bar and chat still drawn), then "Loading terrain…" (22:11.5–22:12.75), MOJANG (22:13–22:15), and the IOException kick screen (22:16–22:23). Webcam: he grabs his head and rocks.
  9. 22:24–22:35 [SEEN] Full-screen webcam: he laughs, leans in, waves his hands, grins. [SUBS 22:24] "What?" [SUBS 22:25] "No moriste, ¿no? Porque te escuché el tótem." [SUBS 22:29] "Sí, nice. Bueno, al menos se quedó vivo." [SUBS 22:33] "Bueno, amigos."
  10. Supplementary, bottom-left third POV [SEEN]: 0:27–0:29 Shadoune ("[MIEMBRO] Shadoune666" tag) and Crisgreen stand in the portal at the end of the corridor. At **0:30.25–0:30.5** a **gold/orange nametag starting "Ende…"** overlaps "[MIEMBRO] Crisgreen", and **a translucent, shimmering blue-white blocky figure** is inside the portal right next to Cris (who has his shield out). 0:31.0: chat death lines. 0:31.25: debris and a red block fly. 0:31.5–0:31.75: the view is now in red netherrack surroundings full of white explosion smoke puffs.
  11. Supplementary, top-right (Shadoune's POV) [SEEN]: 0:30.75 a thin pale shape and the "Crisgreen" tag in the purple swirl. 0:31.0–0:31.25 **Shadoune's totem pops** (totem figure, green particles). 0:31.5 white smoke circles and crescents. 0:31.75–0:32.25 he is in the dark red Nether with "¡Permadeath! / Crisgreen ha muerto". So Shadoune survived this same blast with a totem.
- **Frames:** `frames/35_crisgreen_h_ban_card.jpg`, `frames/35_crisgreen_a_portal_shield_shadoune.jpg`, `frames/35_crisgreen_b_last_frame_alive.jpg`, `frames/35_crisgreen_c_deathcam_debris_chat.jpg`, `frames/35_crisgreen_d_webcam_reaction.jpg`, `frames/35_crisgreen_e_sup_spectator_nametag_ende.jpg` (supplementary), `frames/35_crisgreen_f_sup_spectator_explosion.jpg` (supplementary), `frames/35_crisgreen_g_sup_shadoune_totem_pop_same_blast.jpg` (supplementary)
- **Notes/uncertainties:** In Cris's own POV the creeper is never clearly visible; the purple portal swirl covers everything. The only view of it is the supplementary third POV: a shimmering translucent figure with an "Ende…" tag, very likely "Ender Quantum Creeper" going by the death message, but the tag is cut off by the overlapping name. The explosion itself (flash or smoke) isn't visible in Cris's POV, only debris afterwards. Whether the third POV went through the portal or the blast reached the Nether side can't be told. Speaker of the SUBS 22:24–22:33 lines: probably Cris, talking to Shadoune; not verified.

### #36 — Shadoune (Shadoune666)
- **Wiki:** death #36, 24/05/2020 15:37:14, "Muerte por Ahogarse", totem "Consumido". Custom message listed: "Oui Oui, la baguette est bien mort". [WIKI]
- **Footage:** GersoonSG compilation, chapter "Shadoune": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1356 (22:36–23:04; ban card 22:36–22:39, gameplay 22:40–22:48). POV = Shadoune's own stream: webcam top-left in a red frame (young man, headphones, white T-shirt, gaming chair), "Subgoal : 390 / 400" overlay with a red hooded-avatar icon, "+1 FOLLOW" alerts (marcogre311, abrahamcetejaja). [SEEN]
- **Supplementary checked:** "Post mortem de Shadoune en Permadeath" (Shadoune666 Clips) https://www.youtube.com/watch?v=jFj7oYbI7-Q&t=0 (0:00–0:26). It does **not** show his death. It shows an earlier daytime event in a village: a big pink/red mob, a totem pop, the chat line `[MIEMBRO] Shadoune666 has reached the goal [Postmortal]` and a toast "Goal Reached! / Postmortal". He is alive at the end. Not usable for the death. [SEEN]
- **Exact death message [SEEN]:**
  - Ban card (22:36–22:39): big "PERMADEATH" logo, black square face with white eyes, a script line that reads roughly "Et hoc est inferum. Moritur an supergreditur." (script font, hard to read), then `Shadoune666 ha sido PERMABANEADO` / `24-05-2020 | 15:37:14 UTC` / `Muerte por AHOGARSE`.
  - Chat (22:47–22:48): `Shadoune666 ha consumido 93 tótem. (Probabilidad: 27 < 93)` / red `Este es el comienzo del sufrimiento eterno de Shadoune666. ¡HA SIDO PERMABANEADO!` / grey `Shadoune666, Oui, oui, la baguette est bien mort` / `[MIEMBRO] Shadoune666 (red skull icon) drowned`.
  - Title: `¡Permadeath!` / `Shadoune666 ha muerto`.
  - No "Game over!" screen appears in the cut. The screen goes dark and then the title plays. After that the Minecraft "MOJANG" loading screen appears, so the client was kicked or restarted.
- **Setting [SEEN]:** It starts inside a purple Nether-portal swirl (22:40–22:42). Then a dark area at night: black obsidian pillars, pink blocks (wool/concrete-like), a tall see-through grid tower like glass/iron bars with a light staircase inside, and lots of blue water. He ends underwater: murky blue, seagrass/kelp, a sandy floor and a sandstone-colored wall. Status icons top-right before the totem: red, armor-blue, sword (strength), shield, heart, golden-bow icons. After the totem only a grey icon, a red heart and a key/wrench icon remain. Boss bar `06:52:54 para obtener Life Orb`. Action bar `Quedan 09:29:37 de tormenta`.
- **Gear/HUD [SEEN]:** full armor bar (10 icons), 2–3 gold absorption hearts above 10 red hearts, XP level 60, full hunger. Left (off) hand: **Totem of Undying** (tan figure, green eyes). Right hand: a **shield** (wood face, grey rim), held up for most of the clip. Hotbar: purple (enchanted) sword, shield (selected, white/red/blue icon), ender pearls ×15, an item named "Festín" (tooltip), ×56 grey blocks, ×59 yellow round item (golden apple?), a purple potion, a totem icon, one more item.
- **Beat sheet:**
  1. 22:40–22:42 [SEEN] Screen full of purple portal swirl, with bumpy pinkish-purple blocks (netherrack-like, tinted by the portal) on the left. He is in or passing through a Nether portal. Shield raised on the right, totem in the left hand.
  2. 22:42.25–22:42.5 [SEEN] Dark loading moment (dimension change).
  3. 22:42.75–22:43 [SEEN] New area: grey night sky, flat dark ground with small colorful builds in the distance. A blurred blue-white crystalline shape flashes at the left edge. A spiral particle floats nearby.
  4. 22:43.25–22:43.75 [SEEN] Glass/iron-grid tower, pink blocks, obsidian pillar, water. **Purple square debris and big white smoke puffs with white crescent shapes** burst across the screen, like an explosion. More status-effect icons appear top-right.
  5. 22:44–22:45 [SEEN] He faces a black obsidian pillar with water behind it. White and purple particles drift around. Health: 1 red heart + 2 gold absorption hearts. The rest of the red row flickers.
  6. 22:45.25 [SEEN] Chat: `Shadoune666 ha consumido 93 tótem. (Probabilidad: 27 < 93)`. **Totem pop**: the totem flies up to the center of the screen over a bright grey background, with green diamond and yellow particles. HUD: 1 red heart + 4 gold hearts.
  7. 22:46.0 [SEEN] Totem still in the center. Behind it is a large grey blocky puff with dark swirl markings (looks like the explosion particle). A white crescent at the right. Hearts flash pink (regeneration).
  8. 22:46.2–22:46.5 [SEEN] He scrolls the hotbar ("Festín", then "Ender Pearl" selected). He is now **underwater**: blue tint, seagrass. Hearts drop to 1 red plus flashing empty containers, and the gold hearts go from 4 to 2. **No air-bubble bar is visible in the HUD**.
  9. 22:46.75 [SEEN] Underwater, murky. Sandy floor, seagrass, a sandstone wall at the left, a small yellow particle. "+1 FOLLOW abrahamcetejaja" alert.
  10. 22:47.0–22:47.5 [SEEN] Screen goes dark with no HUD. The chat death lines appear.
  11. 22:47.75–22:49 [SEEN] **¡Permadeath! / Shadoune666 ha muerto** over a dark grassy Overworld field with torches and a pink block wall at the right (spectator view). Then it fades out.
  12. 22:50–22:55 [SEEN] MOJANG loading screen. Webcam: he stares, then puts a hand over his mouth and chin. [SUBS 22:47] "Ya doné. No, concentrate." [SUBS 22:50] "No, el conduit no funcionó. El conduit no funcionó." [SUBS 22:54] "El conduit no funcionó."
  13. 22:56–22:59 [SEEN] Black card: "Killercreeper was blown up by ENder Quantum Creeper" (next chapter's title).
- **Frames:** `frames/36_shadoune_a_portal_shield_totem.jpg`, `frames/36_shadoune_b_flooded_area_obsidian.jpg`, `frames/36_shadoune_c_totem_pop_grey_shape.jpg`, `frames/36_shadoune_d_underwater_last_seconds.jpg`, `frames/36_shadoune_e_permadeath_title_chat.jpg`
- **Notes/uncertainties:** The kill is "drowned", but the footage shows no air-bubble bar, and he dies within about 2 s of going underwater after the totem pop. I can't see what drained his health. The white puffs, purple debris and grey puff (beats 4 and 7) look like explosions, but no mob is clearly visible. The hearts are already very low before the totem (beat 5). The script line on the ban card is uncertain. His own words (SUBS) say a conduit "didn't work". He starts the clip coming out of a Nether portal (see the continuity note in #35).

### #37 — Killercreeper55 (killercreeper_55)
- **Wiki:** death #37, 24/05/2020 20:43:39, "Muerte por Ender Quantum Creeper". Totem: "No Equipado (Equipaba su medalla en la mano derecha por la falta de slots, pero en el ultimo segundo se puso el escudo, y tuvo tiempo de usarlo)". Custom message: "Más conocido como el jugador permabaneado". [WIKI]
- **Footage:** GersoonSG compilation, chapter "Killercreeper55": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1376 (22:56–23:28; title card 22:56–23:00, gameplay 23:00–23:10). POV = Killercreeper's own stream. **No webcam.** Overlay: "Last Sub: foxelz / Sub goal: 218/200" top-left, a green follower list top-right, and two small decorative figures bottom-right (a black-suited figure with a white head, and a creeper). [SEEN]
- **Exact death message [SEEN]:**
  - Title card (compilation edit): `Killercreeper was blown up by ENder Quantum Creeper` (white on black, sic "ENder").
  - Game-over screen: `Game over!` / `[MIEMBRO] killercreeper_55 (red skull icon) was blown up by Ender Quantum Creeper` / `Score: 116254` / buttons "Spectate world", "Title screen".
  - Chat: red `Este es el comienzo del sufrimiento eterno de killercreeper_55. ¡HA SIDO PERMABANEADO!` / grey `KillerCreeper55, Más conocido como el jugador permabaneado` / `[MIEMBRO] killercreeper_55 (skull) was blown up by Ender Quantum Creeper`.
  - Title: `¡Permadeath!` / `killercreeper_55 ha muerto`. Kick screen: `Connection Lost` / `Has sido PERMABANEADO` / "Back to server list".
- **Setting [SEEN]:** Overworld base interior at night during a storm (rain and snow outside). A long storage hall: stone-brick walls and floor, walls of light-blue ice, dark log pillars, diagonal spruce-plank beams overhead, rows of double chests, item frames holding purple items, lanterns and torches, a wall of small boxy dark/white cells at the far end. Boss bar `01:46:31 para obtener Life Orb`. Action bar `Quedan 09:23:2x de tormenta`.
- **Gear/HUD [SEEN]:** full armor (10 icons), 1 gold absorption heart above 10 red hearts, and a gold heart at the end of the row. Full hunger. Status icons top-right: shield, blue orb, blue up-arrow (jump?), red icon, sword. Hotbar: teal "X" blocked slot, purple sword, purple pickaxe, purple bow, golden apples (tooltip "Golden Apple"), **"Medalla de Superviviente"** (brown and green, totem-shaped), a purple **shield**, a diamond, teal "X" blocked slots. The off-hand slot left of the hotbar also shows the teal X icon. In his left hand there is a teal hook-shaped item, apparently that blocked-slot item, so he could not put a totem in the off-hand.
- **Beat sheet:**
  1. 23:00–23:03 [SEEN] He looks up at the ice walls and plank beams, holding a golden apple (tooltip "Golden Apple"). A faint olive-yellow ring/spiral particle floats in the air. [SUBS 23:02] "Ah, mira, un creeper. Hala."
  2. 23:04–23:05 [SEEN] He walks down the storage hall past the chests.
  3. 23:05.25 [SEEN] Switches to slot 6. Tooltip `Medalla de Superviviente` (flanked by red icons). The medal (brown and green figure) is now in his right hand. [SUBS 23:05] "Ah, mira, otro creeper."
  4. 23:06.75–23:07.25 [SEEN] At the far end of the hall, by a dark log pillar, a **pale blue-white, shimmering, see-through figure** appears at floor level with sparkly particles. It walks toward him.
  5. 23:07.5–23:08.5 [SEEN] The figure keeps closing in: blocky, glassy, light blue, just left of and then under the crosshair, at mid distance. His hearts stay full.
  6. 23:08.7–23:08.8 [SEEN] He scrolls to slot 7. Tooltip **`Shield`**. The shield comes up at the right edge as he turns toward the chests. The figure is still close, center-right. Hearts are full (10 + absorption).
  7. 23:08.9 [SEEN] HUD gone. The chat death lines appear. No explosion frame is visible at 4 fps or 10 fps.
  8. 23:09.0 [SEEN] **Game over!** screen with a red tint (text above). He died in one hit from full health.
  9. 23:09.25–23:09.5 [SEEN] Dark screen (Spectate clicked).
  10. 23:09.75–23:10.75 [SEEN] Spectator view of the storm from above: rain and snow streaks, a dark landscape with colorful builds at the right. Then **¡Permadeath! / killercreeper_55 ha muerto** over light-blue ice blocks, a water channel and a glass block. The camera then drifts through black and ice-blue block fragments.
  11. 23:11–23:14.9 [SEEN] MOJANG loading screen. [SUBS 23:11] "Ya está."
  12. 23:15–23:27 [SEEN] "Connection Lost / Has sido PERMABANEADO". From 23:18 a resub alert: "spider_marc se ha ressucrito por 2 meses!". [SUBS 23:22] "¿Qué demonios está pasando aquí? Muchas gracias por resuscribirte. Ahora me voy para atrás."
  13. 23:29–23:31 [SEEN] Black card "Luh se a ahogado" (next chapter's title).
- **Frames:** `frames/37_killercreeper_a_medal_in_hand_storeroom.jpg`, `frames/37_killercreeper_b_glowing_figure_approaching.jpg`, `frames/37_killercreeper_c_shield_last_frame.jpg`, `frames/37_killercreeper_d_gameover.jpg`, `frames/37_killercreeper_e_permadeath_title_aftermath.jpg`
- **Notes/uncertainties:** The glowing figure is too blurry at 480p to confirm it is a creeper shape. The death message names "Ender Quantum Creeper", and this pale, glassy, shimmering look is the only mob visible, so it is probably the Ender Quantum Creeper, but that is an inference. The switch to the shield is visible (tooltip "Shield" about 0.2 s before death). Whether the shield actually blocked anything can't be seen. No explosion particles are shown because the cut goes straight to Game over. The "creeper" lines in SUBS 23:02/23:05 don't match a creeper I can see in the frames.

### #38 — Luh (iLuh)
- **Wiki:** death #38, 24/05/2020 20:50:35, "Muerte por Ahogarse", totem "Consumido". Custom message: "HDluh. Código Luh-XD en el cementerio del server". [WIKI]
- **Footage:** GersoonSG compilation, chapter "Luh": https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1409 (23:29–24:40; title card 23:29–23:31, gameplay 23:33–23:50, reaction until 24:17, then an unrelated "PERMADEATH FAN SERVER 31/05/2020" card 24:18–24:40). POV = Luh's own stream: webcam bottom-right (bearded man with moustache, black headphones, dark patterned shirt), "CORSAIR"/"elgato" logos top-right, and **Minecraft's on-screen sound subtitles** (Spanish) at the right. [SEEN]
- **Supplementary:** "Muerte de LUH en Permadeath Desde Todas las Prespectivas" (Zzzz ElCanal) https://www.youtube.com/watch?v=VM3wGy73K7M&t=27 (0:27–0:45). Its quadrants: top-left = Luh (same as the compilation); top-right (from 0:27) = a webcam streamer with a "Subgoal : 392 / 400" overlay (same style as Shadoune's stream) showing Luh's gameplay, so a reaction/re-stream; bottom-left = a third player looking down on the library from high up (no webcam; a tab/boss line `[ADMIN] Omnirich` and hearts at the top). [SEEN]
- **Exact death message [SEEN]:**
  - Title card (compilation edit): `Luh se a ahogado` (sic).
  - Chat (Spanish client): `iLuh ha consumido 93 tótem. (Probabilidad: 14 < 93)` / red `Este es el comienzo del sufrimiento eterno de iLuh. ¡HA SIDO PERMABANEADO!` / `HDluh, Código Luh-XD en el cementerio del server` / `[MIEMBRO] iLuh (red skull icon) se ha ahogado` / `Tu cama ya no está o se encuentra obstruida`.
  - Same event in the supplementary third POV (English client): `[MIEMBRO] iLuh (skull) drowned`.
  - Title: `¡Permadeath!` / `iLuh ha muerto`. Kick screen: `Conexión perdida` / `Has sido PERMABANEADO` / "Volver a la lista de servidores".
- **Setting [SEEN]:** Overworld, night, heavy rain (storm). A library/enchanting room on a high platform: bookshelves, an enchanting table, an anvil, double chests, spruce walls covered with item frames, a floor of light cyan blocks with grey button/plate-like squares, red beds, open to the sky. From above (supplementary) the room is a wooden and cyan platform next to a tall cyan beacon-like beam, and below it lie green grassland with ponds. He lands in a shallow pond with tall grass and seagrass next to a lime-green block wall. Boss bar `01:39:44 para obtener Life Orb` counting down to `01:39:27` at death. Action bar `Quedan 14:16:2x de tormenta`.
- **Gear/HUD [SEEN]:** **only 4 hearts** (max health reduced), **no armor bar visible**, XP level 38, full hunger. **Totem of Undying in the off-hand** (left hand, also shown in the off-hand slot). Hotbar: purple sword, purple pickaxe, purple bow, a dark shield (selected), a purple tool, potions ×5 (later ×17), ×32 red item (later ×64), ×64 yellow item, ×15 dark blocks. Status icons top-right: eye (night vision?), blue up-arrow, red icon, sword, shield, red heart, a golden tool.
- **Beat sheet:**
  1. 23:33–23:44 [SEEN] He stands by the chests facing the enchanting table. A **blurred, pixelated grey-brown shape** drifts over the chests and around the room (23:36–23:44). A **black tall figure** hangs near the ceiling at the top edge (23:38–23:40). Sound subtitles: "Burbujas de un soporte p…", "Pasos", "Blaze chisporrotea", "Lluvia", later "Enderman se te…", "Vagoneta". [SUBS 23:33] "Y eres uno de los pocos jugadores que después de un post mortal está vivo, que normalmente no ocurre." [SUBS 23:40] "¿Te vas a creer? ¿Te crees que no me sé la casta de la de la misilidad? A ver, est Vale, aquí está. Ya, ya."
  2. 23:45.25–23:45.75 [SEEN] He turns. A **pale-blue shimmering figure** is visible high up at the top of the wall, and a blue sparkle hangs in the air.
  3. 23:46.25 [SEEN] He **raises the shield** (big wooden rectangle in the center). A shimmering light-blue figure is inside the room near the enchanting table and chests (23:46.5–23:47.0), with blue particles. Subtitles: "Siseo de c…", "Enderman se te…".
  4. 23:47.25–23:47.5 [SEEN] He backs toward the open side of the room with the shield up. Heavy rain against the dark sky, a stone wall at the right. Subtitles: "Bloqueo con e[scudo]", "Creeper h…", "Marco desc…", "Bloque ro[to]".
  5. 23:47.75 [SEEN] Subtitle **"Explosión"**. A magenta particle burst, dark-red items and a brown shape fly up at the lower center.
  6. 23:48.0 [SEEN] **Explosion**: big white and grey smoke balls fill the upper half, a dark-red block and a purple sword/arrow-like item fly past. Hearts are still 4. Hotbar counts jump (potions 5→17, red item 32→64). Subtitle "Objeto recogido".
  7. 23:48.25 [SEEN] He is **thrown into the air**: rain streaks, purple particles above, dark sky, green fields far below, a large cyan block mass at the top right. Subtitle "Leve impacto contra el suelo".
  8. 23:48.5 [SEEN] Falling toward the rainy grassland.
  9. 23:48.75 [SEEN] He lands **in water**: tall grass, seagrass, a lime-green wall at the right. Subtitles "Salpicadura", "Nadando". The **air-bubble bar appears full (10)**.
  10. 23:48.8–23:49.1 [SEEN] The **air bubbles drain from 10 to 2 to 0 in about 0.3 s**. The hearts flash as damage lands.
  11. 23:49.25–23:49.3 [SEEN] **Totem pops**: subtitle "Tótem activado", chat `iLuh ha consumido 93 tótem…`, the totem rises in the center-right, purple and green particles and bubbles swirl. HUD: 1 red heart + 3 empty + 4 gold absorption hearts.
  12. 23:49.5 [SEEN] The screen darkens with the totem still on screen, and the HUD fades. He is dead about 0.2 s after the totem.
  13. 23:49.75–23:51.25 [SEEN] Spectator view: rainy night grassland, the totem animation still finishing in the center, the chat death lines, then **¡Permadeath! / iLuh ha muerto**. Subtitles "Jugador muere", "Blaze muere", "Yunque al caer". Webcam: he smiles. [SUBS 23:50] "Perfecto, tío. Muchas gracias por eh el código, tío."
  14. 23:52–24:17 [SEEN] MOJANG loading screen, then the kick screen. Webcam: he laughs with his hand on his forehead, and a "x10 bits por parte de carlosma…" alert. [SUBS 24:01] "Ha sido un placer, Rich. De verdad, me lo pasado muy bien, ¿eh? Te lo juro. No es broma, ¿eh? Me lo pasado super bien, tío. Ha estado muy guapo, tío." [SUBS 24:11] "Ya valió, tío."
  15. Supplementary, third POV (0:32–0:37) [SEEN]: from high above, the library and bed platform next to the beacon beam. At 0:34.25 the scene jolts (dark purple debris, a burst of rain streaks), then **white smoke puffs and a white crescent** appear over the library at 0:34.75–0:35.5, with small fires. Chat then shows the totem line.
- **Frames:** `frames/38_luh_a_shimmering_figure_library.jpg`, `frames/38_luh_b_shield_up_figure_in_room.jpg`, `frames/38_luh_c_explosion_smoke.jpg`, `frames/38_luh_d_flung_into_rain.jpg`, `frames/38_luh_e_underwater_totem_pop.jpg`, `frames/38_luh_f_permadeath_title_chat.jpg`, `frames/38_luh_g_sup_aerial_explosion_smoke.jpg` (supplementary), `frames/38_luh_h_sup_three_pov_before.jpg` (supplementary)
- **Notes/uncertainties:** The official cause is drowning, but the visible chain is: a shimmering light-blue mob comes into the library, then an **explosion** (white smoke, "Explosión" subtitle), which launches him off the platform into a pond. There he loses all air almost instantly, the totem pops, and he still dies. The blurry grey-brown shape and the black figure (beat 1) can't be identified. The subtitles mention an Enderman teleporting and a creeper hissing ("Creeper h…"/"Siseo de c…"), but the words are cut off. The on-screen name is "iLuh". The red-skull icon in chat is part of the server's death line.

### Day-60 continuity (#34–#38, 24/05/2020)
Only what is visible [SEEN] or in the wiki [WIKI] is listed; no interpretation.
- **None of these deaths happen in the End.** #33 is in the Nether (another day). #34 is at an Overworld stone plaza in a bamboo grove, in daylight. #35 is in an Overworld corridor, inside a Nether portal. #36 happens after passing through a portal, in a flooded area at night. #37 is in an Overworld storage hall at night during a storm. #38 is in an Overworld library on a high platform at night during a storm. [SEEN]
- **#35 CrisGreen and #36 Shadoune are linked.** In the CrisGreen multi-POV (https://www.youtube.com/watch?v=02yEAFKWuKA&t=27) both stand in the same obsidian portal at the end of the water-channel corridor. The blast that kills Cris makes **Shadoune pop a totem** (his POV at 0:31). Shadoune's own chapter (#36) opens inside a purple portal. His boss bar reads `06:52:54` versus Cris's `06:57:19`, a 4.5-minute gap that matches the wiki times 15:32:41 vs 15:37:14. In #36 he pops a second totem ("Probabilidad: 27 < 93") and dies about 2 s later, underwater. [SEEN][WIKI]
- **The same third "invisible" streamer POV appears three times.** The same overlay (purple sub banner, "Cheerleader: Kiritowasabi 150000", "Donuts Máximus: Wendingo1319", the "Hacemos un cambio de dificultad juntos" bar, white "Último seguidor" scroll, dancing banana, green "You are invisible to other players!") is the **entire POV of #34 Kakytron** and the bottom-left quadrant of both the #35 and #38 multi-POV videos. [SEEN] Overlay comparison identifies it as **ElRichMC's stream**: he was dead since day 56 and spectating invisibly as admin/OmniRich (see #34).
- **The same mob look recurs.** A **pale blue-white, translucent, shimmering blocky figure** shows up right before the blast in #35 (supplementary third POV, with a gold nametag starting "Ende…"), in #37 (walking down the storage hall) and in #38 (inside the library). #37's message names the "Ender Quantum Creeper". #38's official cause is drowning after being blown into a pond. In #34 no such figure is clearly visible. [SEEN]
- **Explosion look.** In #34, #35 (supplementary), #36 and #38 the blasts show **large white/grey smoke balls and white crescent shapes**, plus flying block debris (#34: the house front is removed in one frame). [SEEN]
- **Timing between #37 and #38.** Both are at night in a storm. Killercreeper's boss bar reads `01:46:31` and Luh's `01:39:27` (about 7 min), which matches the wiki 20:43:39 vs 20:50:35. Their bases look different (ice-walled storage hall vs a library on a high platform). Nothing on screen shows whether they are the same base. [SEEN][WIKI]
- **Storm ("tormenta") countdown values** (just recorded, not interpreted): #35 `04:34:0x`; #36 `09:29:3x`; #37 `09:23:2x`; #38 `14:16:2x`. Kakytron's chat (#34) shows `¡Comienza el Death Train con duración de 10 horas!`. [SEEN]

### #39 — OmniRich ([ADMIN] OmniRich, played by ElRichMC after his own death)
- **Wiki:** death #39 and the last death of the series, listed as 5/06/2020 14:30:20, "Muerte por Vex", totem "No Equipado". [WIKI] **Date conflict:** the chat in this clip shows screenshots saved as `2020-05-24_22.54.16.png` … `2020-05-24_22.58.47.png` [SEEN], and both YouTube uploads are dated 25/05/2020. The death therefore happened on the night of **24/05/2020 around 23:00**, not on 5/06.
- **Context [SOURCE: Shem's description]:** "OmniRich juega Permadeath para intentarle enseñar a los demás jugadores cómo deberían haberlo hecho y muere jajaja". The Twitch sources credited are Luh, ElRichMC and Shadoune666.
- **Footage:**
  - Shem, "PERMADEATH - MU3RT3 DE OMNIRICH": https://www.youtube.com/watch?v=fD_eMUi4axs&t=160 (death at about 2:53; whole video 3:32).
  - Same stream POV in Pollo XD, "Muerte de OmniRich el último *Permadeath*": https://www.youtube.com/watch?v=3M61zZRgG2c&t=150 (death at about 2:43).
  - POV = ElRichMC's Twitch stream. No webcam. Top overlay "01:2x:xx para obtener Life Orb", "Cheerleader: Miritowasabi 150000", "Donuts Máximus: Wendingo1319 101€", a sub-goal bar "Hacemos un cambio de dificultad juntos". A dancing-banana alert and a follower scroll sit bottom-right. [SEEN]
- **Exact death message [SEEN]:**
  - Game-over screen: flashes for about 0.1 s ("Game over!" is legible only faintly, under "Joining world…").
  - Chat (red): `Este es el comienzo del sufrimiento eterno de <name>. ¡HA SIDO PERMABANEADO!`, then grey `Ahora por fin descansa en paz.`, then `[ADMIN] OmniRich was slain by Vex`.
  - Title: `¡Permadeath!` / `OmniRich ha muerto`.
  - Kick screen: `Connection Lost` / `Has sido PERMABANEADO` / "Back to server list".
- **Setting [SEEN]:**
  - Most of the clip is in the Nether: he walks along a long "highway" of blue/packed ice with dark slabs spaced along it, running through a dark netherrack tunnel lit by torches. He passes wooden fences, trapdoors and a sign reading "Aldea de Crisgreen" (1:04).
  - He then goes through an obsidian Nether portal (purple swirl) and comes out in the **Overworld in daylight** on a huge floor of white square tiles with teal grout (an ice/packed-ice-looking texture). A large brick-and-wood build with scaffolding/glass stands in the distance, with a few trees.
  - After death the spectator camera shows grass, a river with sand banks, pink blocks and small houses next to the portal.
- **Gear/HUD [SEEN]:**
  - Only **2 hearts** on the health bar, full hunger, XP level 43.
  - Holds a raised **shield** (lower-left of the view). He took it from the creative inventory: tooltip "Shield / Combat" at 0:10.
  - Hotbar: diamond, a light-blue item, golden carrots (61), golden carrots (64), milk bucket, a sign-like item in the last slot.
  - Effects he gave himself via commands: "Applied effect Slow Falling to [ADMIN] OmniRich", "Gave 128 [Golden Carrot]", "Gave 1 [Milk Bucket]".
- **Beat sheet (Shem video timestamps):**
  1. 0:08–0:12 [SEEN] In the creative inventory he searches "shi" and picks a **Shield**. The chat log shows admin commands: game mode Creative/Spectator, "Removed effect Blindness from [ADMIN] OmniRich", "Teleported [ADMIN] OmniRich to 0.5, 120.0, 0.5", and finally "Set own game mode to Survival Mode".
  2. 0:14–1:30 [SEEN] He walks the Nether ice highway with his shield up. At 0:54 he types `/effect … slow_falling` ("Applied effect Slow Falling"). At about 1:30 he `/give`s himself 128 golden carrots. [SUBS 1:03–1:14] "…aguantar los 10 días que hay que aguantar porque el día 70 y cosas guays… es como si todo el mundo se hubiese muerto por gatos supernova básicamente…"
  3. 2:18–2:19 [SEEN] Over the ice road, a pale grey, semi-transparent **winged mob** (cube-like head, wing/limb spokes) flies straight into the camera and partly through the ice blocks, then drifts away. His 2 hearts don't change. The mob isn't named on screen; its look and block-clipping fit a Vex.
  4. [SUBS 2:19–2:21, verbatim ASR] "vale me ha metido esa pues ahora como de leche que siempre había que llevar una". This comes right after the winged mob passed; "como de leche" is probably "cubo de leche". 2:30 [SEEN] "Gave 1 [Milk Bucket] to [ADMIN] OmniRich".
  5. 2:46–2:51 [SEEN] He walks into a Nether portal. The screen becomes the purple portal swirl, then "Joining world…".
  6. 2:52.25 [SEEN] Arrives in the Overworld in bright daylight, shield raised, standing beside the obsidian portal on the white-tiled floor.
  7. 2:53.0–2:53.7 [SEEN] He turns right across the tiled plaza. At 2:53.6 a small **reddish winged figure (the Vex)** dives diagonally out of the sky at the upper right toward him.
  8. 2:53.8 [SEEN] Instant death: a faint "Game over!" and then "Joining world…" (he clicks Spectate at once). With 2 hearts it took a single hit.
  9. 2:54.1–2:55.8 [SEEN] Spectator camera floats above grass next to the obsidian portal. **¡Permadeath!** / "OmniRich ha muerto" fades in over a river landscape. The red chat lines appear bottom-left.
  10. 2:56–2:59 [SEEN] White Mojang loading screen (client restart/relog). 3:00–3:27 "Connection Lost / Has sido PERMABANEADO". [SUBS 2:56–3:00] "para nada… excesivo… desde fuerza 3" [SUBS 3:17–3:24] "claro, ahí lo que habría que haber hecho es ir volando, es otro error mío, ahí habría que ir volando o con invisibilidad…"
- **Frames:** `frames/39_omnirich_a_exits_portal_overworld.jpg`, `frames/39_omnirich_b_vex_dives.jpg`, `frames/39_omnirich_c_permadeath_title.jpg`, `frames/39_omnirich_x_nether_winged_mob.jpg` (the earlier winged mob in the Nether)
- **Notes/uncertainties:** The Vex is on screen for only about 0.2 s before death, so its sword and pose can't be made out. "Fuerza 3" (Strength III) comes from the subtitles only.

## Deaths WITHOUT footage, or with gaps (what the animator will have to fill in)

### No footage of the death exists or was found
| # | Player | Why | Only reference available |
|---|---|---|---|
| 4 | Kaumaru | He wasn't recording ("no lo tengo grabado") [SUBS]. His search for other footage found nothing. | His verbal reconstruction in the compilation (1:55–2:59): lit area with cave-spider spawners; he removes a block, a cave spider with strength and speed spawns in the dark gap, and he can't outrun it. [SUBS][DOC 26:37] |
| 16 | OutConsumer | Not live and not recording [DOC 18:27]. A video titled "no hay clip" confirms it. | His own account (compilation 8:59–9:58, and https://www.youtube.com/watch?v=sNUN7IudvV4): no armor, fell into a pit of about 10 chickens (hostile since day 20), fled by digging upward, the totem popped and he had no time to equip another. [SUBS] |
| 20 | Paracetamor | Off-stream. | Her tweets (compilation 12:22): "He tirado una enderpearl al portal y he caído al vacío". [DOC 25:03]: in the End, the main island hadn't loaded. Untried leads: her explanation video https://www.youtube.com/watch?v=rWOVX3sZzbo (10 min) and https://www.youtube.com/watch?v=l4_7OhR4lRY (24 s). |
| 10, 14, 15, 24, 29, 30 | LiliCross, Perxitaa, AlexElCapo, BarbeQ, Th3Antonio, CooLifeGame | AFK/inactivity bans, not deaths. | Only ban cards, captions and tweets (quoted in their sections). |
| — | MrCarlosNoob (1st death, in-game suicide, revived hours later) and Kakytron (1st death on day 40, fall caused by a plugin bug, revived) | Not in the official list because they were revived. Not searched for; per [DOC 43:40] Kakytron was not recording. | [DOC 29:12], [DOC 43:40]; follow-up video https://www.youtube.com/watch?v=7i83fhYvBZo |

### Footage exists, but the key element is NOT visible
- **#3 Cecililla**: the creeper never appears. She faces a wall at full health, then the death screen.
- **#5 Felipez360**: third person from a teammate's stream. The fight and totem are visible, but the final hit and the vanilla message are hidden behind the webcam.
- **#11 RubikYT / #17 RanguGamer**: invisible mobs (only white outlines and red eyes). The killing hit isn't visible.
- **#12 Zeling**: the giant magma cube is never clearly framed (only an orange mass right up against the camera).
- **#18 FrigoAdri**: the Ender Creeper is off-screen. Full health, then death.
- **#19 Folagor / #23 Mikecrack / #27 Nia**: the totem hit is visible (Mikecrack: a fireball), but not the final hit.
- **#21 Gona89**: the explosion shows only as grey smoke beside a shulker.
- **#25 Cibergun**: no ghast anywhere; the totem pops with an enderman in his face.
- **#28 Hardyluski**: **the Gato Supernova never appears.** Full hearts in the night sky, then a hard cut to the death screen.
- **#33 EsVandal**: the arrow is never seen. Three candidate mobs are hard to identify (teal archer, pink/lavender swordsman, burning figure).
- **#34 Kakytron**: distant spectator view (ElRichMC). The creeper is at most a green patch at the door; the house goes from intact to crater between two frames.
- **#36 Shadoune666**: an explosion is visible and he goes underwater, but no air bar ever shows. The drowning isn't visible as such.

## Cross-reference: Rubik's documentary "La Historia Completa de Permadeath" (May 2026)
Source: https://www.youtube.com/watch?v=QhHMTOs40mo (81 min, 763k views, includes interviews with the players and most death clips).
Everything below is narration from the documentary's auto-transcript, marked [DOC]. It is NOT a visual confirmation. Use it for context and to find footage. Timestamps are the documentary's.

| # | Player | Wiki day | DOC timestamp | What the documentary says [DOC] |
|---|---|---|---|---|
| 1–3 | Alvaro845, TheGamerMaldito, Cecililla | 0 | [1:02](https://www.youtube.com/watch?v=QhHMTOs40mo&t=62) | All three died on day 1. The clip plays "me ha caído un creeper de arriba, tío". |
| 4 | Kaumaru | 10 | [3:37](https://www.youtube.com/watch?v=QhHMTOs40mo&t=217), [26:37](https://www.youtube.com/watch?v=QhHMTOs40mo&t=1597) | First victim of the day-10 spiders (1–3 potion effects each). He did not record it. He removed a block in a lit cave-spider spawner area, a dark gap appeared, and a cave spider with strength + speed spawned in it. Counted as one of three "bug deaths" and not revived. |
| 5 | Felipez360 | 10 | [4:13](https://www.youtube.com/watch?v=QhHMTOs40mo&t=253) | Went to rescue Zeling (trapped in her poorly lit base, with Th3Antonio). He fought a spider head-on (Resistance IV + Regeneration III), lost a totem, tried to flee and died. Shouts "vete vete vete… Felipe, Felipe". |
| 6–7 | Ibai, ReventXzz | 11 | [7:19](https://www.youtube.com/watch?v=QhHMTOs40mo&t=439) | G2 group, returning after about 10 days away, with little gear; both died in caves. Clip audio: "Agua. [grito] … hay una… me one-shotó". |
| 8 | AKAWonder | 12 | [7:35](https://www.youtube.com/watch?v=QhHMTOs40mo&t=455) | Killed by a Blaze, "de una manera un poco desafortunada". Audio: "¿Por qué me quitan tanto ahora? Sal de aquí… me muero, me muero, me morí." |
| 9 | Ander | 18 | [8:05](https://www.youtube.com/watch?v=QhHMTOs40mo&t=485) | A spider kills him in three hits with no time to react. Audio: "Una araña, una araña… me mata. ¡Lárgate! ¡Lárgate!" |
| 11 | RubikYT | 25 | [13:16](https://www.youtube.com/watch?v=QhHMTOs40mo&t=796) | Farming a two-cave-spider spawner from a small cube with stairs leaving a one-block gap. While he re-placed the last stair, a cave spider slipped in. He knocked it out through the gap with a knockback sword, but had no time to block up or swap in a totem. |
| 12 | Zeling | 26 | [14:34](https://www.youtube.com/watch?v=QhHMTOs40mo&t=874) | Giga Magma Cube, which has giant jumps and heavy damage. Audio: "Necesito ayuda, por favor… es que no se puede." |
| 13 | Tonacho | 26 | [14:49](https://www.youtube.com/watch?v=QhHMTOs40mo&t=889) | Giga Slime; he was in water and couldn't move away. Audio: "Dios, Dios, Dios. No, no, no… me mata." |
| 16 | OutConsumer | 30 | [18:27](https://www.youtube.com/watch?v=QhHMTOs40mo&t=1107) | **Not recorded** (not live, not recording). In his own words: he took his armor off, was throwing food to the chickens, and fell into the chicken pit (7–10 hostile chickens). |
| 17 | RanguGamer | 30 | [17:26](https://www.youtube.com/watch?v=QhHMTOs40mo&t=1046) | Silverfish in the Stronghold during the group dragon event. Audio: "me ha dado, me ha dado… Ah, me mató. Qué mal, tío." |
| 18 | FrigoAdri | 30 | [21:25](https://www.youtube.com/watch?v=QhHMTOs40mo&t=1285) | On first entering the End, Ender Creepers (charged, teleporting) exploded next to CrisGreen and FrigoAdri. CrisGreen's totem worked; Frigo's failed (1% failure rule). |
| 19 | Folagor | 32 | [23:45](https://www.youtube.com/watch?v=QhHMTOs40mo&t=1425) | On the End main island, invisible with no armor, he was writing a tribute sign for Frigo. A Ghast spawned very close on the right and saw him. The totem popped and removed his effects, then three ghasts shot him. |
| 20 | Paracetamor | 32 | [25:03](https://www.youtube.com/watch?v=QhHMTOs40mo&t=1503) | Off-stream. After Folagor died she turned back and threw an ender pearl from a small staircase. The main island hadn't loaded, so she teleported into the void ("bug"). |
| 21 | Gona89 | 34 | [27:23](https://www.youtube.com/watch?v=QhHMTOs40mo&t=1643) | End City, explosive shulkers killed by bow from far. He heard explosions, ran, and the explosions kept going and killed him. Audio: "Vale, cuidado, explosiones significa que se están muriendo." |
| 22 | MrCarlosNoob | 34 | [29:12](https://www.youtube.com/watch?v=QhHMTOs40mo&t=1752) | "Moría por segunda vez, esta vez por araña de cueva". He had previously killed himself in-game and was revived hours later (confirmed in the follow-up video 7i83fhYvBZo). Audio: "No, no, no, no…" |
| 23 | Mikecrack | 35 | [34:15](https://www.youtube.com/watch?v=QhHMTOs40mo&t=2055) | Live on YouTube: with elytra and rockets he flew among End ghasts ("mientras esté en el aire no puedo morir"). While killing a ghast he accidentally landed on an island; a ghast behind him popped his totem, and a second fireball hit the island and its blast killed him. |
| 25 | Cibergun | 36 | [36:04](https://www.youtube.com/watch?v=QhHMTOs40mo&t=2164) | Walking in the End while on a call with Shadoune, his invisibility ran out and he got blown up. Audio: "no no no no, ciber no." |
| 26 | Alkapone | 38 | [36:19](https://www.youtube.com/watch?v=QhHMTOs40mo&t=2179) | After losing a totem in an End City he flew off with elytra, dove badly, and took his armor off before landing. Audio: "Huye, huye… Vecina, me voy a morir, vecina." |
| 27 | Nia (Lakshart) | 38 | [37:09](https://www.youtube.com/watch?v=QhHMTOs40mo&t=2229) | To get the "Sin piedad" achievement she killed a shulker with TNT. The TNT hurt an enderman, which aggroed and hit her; the totem popped and stripped her invisibility and armor. A ghast spawned in front and a fireball finished her. |
| 28 | Hardyluski | 44 | [47:51](https://www.youtube.com/watch?v=QhHMTOs40mo&t=2871) | Flying with elytra searching for The Beginning portal, he got the Supernova Cat warning and flew the opposite way. The blast killed him instantly and the offhand totem failed (3% rule). Audio: "No, Hardy, ¿qué ha pasado? Te ha matado el gato." |
| 29–30 | Th3Antonio, CooLifeGame | 50 | [49:39](https://www.youtube.com/watch?v=QhHMTOs40mo&t=2979) | AFK/inactivity bans announced on Twitter. Antonio had agreed to it (LoL Solo Q Challenge); CooLifeGame disputed his. |
| 31 | BriiHD (ElBrean) | 50 | [51:57](https://www.youtube.com/watch?v=QhHMTOs40mo&t=3117) | Farming gold in the gold farm when a Ghast spawned silently. He heard it and tried to flee. With no End Relic he had no offhand totem, and one fireball killed him. |
| 32 | ElRichMC | 56 | [1:02:30](https://www.youtube.com/watch?v=QhHMTOs40mo&t=3750) | In The Beginning with KillerCreeper55, sorting inventories. As a joke ("prefiero suicidarme. Adiós, killer") he dug a block and dropped into the void, drinking Slow Falling only on the way down. He tried to open elytra that weren't equipped, panicked, couldn't find them in time, and died. Audio: "No, me muero, me muero, me muero…" |
| 33 | EsVandal | 59 | [1:05:08](https://www.youtube.com/watch?v=QhHMTOs40mo&t=3908) | Nether Fortress, hunting an "infernal"/Emperor Wither Skeleton (Power-100 bow). The first arrow nearly killed him; he fled without blocking behind himself and a second arrow finished him. Audio: "Fuck." |
| 34 | Kakytron | 60 | [1:08:16](https://www.youtube.com/watch?v=QhHMTOs40mo&t=4096) | Walking back home, an Ender Quantum Creeper hidden behind a column (visible from Rich's spectator POV) exploded. He had no inventory space or totem. Note: Kakytron had died once on day 40 (a script bug removed the block under him) and was revived. |
| 35 | CrisGreen | 60 | [1:11:07](https://www.youtube.com/watch?v=QhHMTOs40mo&t=4267) | With Shadoune, going to Kakytron's base to get his loot. Crossing a Nether portal, a creeper teleported in and exploded. Cris couldn't hold a totem (slots locked). Audio: "Okay, yo voy. Suerte. What?" |
| 36 | Shadoune666 | 60 | [1:12:23](https://www.youtube.com/watch?v=QhHMTOs40mo&t=4343) | He panicked through the Nether corridors, went back through the portal, dodged one creeper, and another exploded behind him (the totem worked). He fell into the water a few blocks from his base, the conduit effect didn't apply (the totem cleared it), and he drowned. Audio: "El conduit no funcionó." |
| 37 | KillerCreeper55 | 60 | [1:16:16](https://www.youtube.com/watch?v=QhHMTOs40mo&t=4576) | Joined around 20:00. He went to the exit of his chest area, saw a creeper, ran, met another creeper and died. Audio: "Ah, mira, un creeper. Hala. Ah, mira, otro creeper. Bueno, ya está." |
| 38 | Luh | 60 | [1:17:17](https://www.youtube.com/watch?v=QhHMTOs40mo&t=4637) | Invisible in his dome base over the ocean. One creeper teleported in and he broke the block under it. Earlier he had used his first totem after breaking string by hand (new 8-heart rule). When his invisibility ran out, another creeper teleported inside and killed him; his base was destroyed. This was the end of Permadeath. |
| 39 | OmniRich | 60 | — | Not covered in the documentary. See the OmniRich section above. |

Other context [DOC]: Permadeath was meant to reach day 110, but day 60 (24/05/2020) was the last. The day-60 changes that caused the wipe were creepers spawning on many more block types regardless of light (suggested by Mikecrack), faster creeper explosions, the "Life Orb" within 8 h or lose 8 hearts, and nearly all inventory slots removed until you crafted the "Reliquia del Comienzo".

## Sources

**Videos (footage actually analysed):**
- GersoonSG, "TODAS LAS MU3RT3S PERMADEATH" (24/05/2020), the main compilation: https://www.youtube.com/watch?v=vYTcFdeAxE0
- Multi-POV (Zzzz ElCanal):
  - ElRichMC https://www.youtube.com/watch?v=p7SdaB-a9Ls
  - CrisGreen https://www.youtube.com/watch?v=02yEAFKWuKA
  - Luh https://www.youtube.com/watch?v=VM3wGy73K7M
  - Gona89 https://www.youtube.com/watch?v=1qqbHzD_PFU
- Pabl0WL:
  - ElRichMC + Killer https://www.youtube.com/watch?v=m_5s5wBMvHc
  - Hardy https://www.youtube.com/watch?v=iCMUz5x4HAE
  - Rubik https://www.youtube.com/watch?v=ZrrSQuVLYQA
  - Felipez (Killer's view) https://www.youtube.com/watch?v=Oi7ijuDSu2A
- Shem:
  - Hardy https://www.youtube.com/watch?v=K1Hh8JZSTIE
  - OmniRich https://www.youtube.com/watch?v=fD_eMUi4axs
- Pollo XD, OmniRich: https://www.youtube.com/watch?v=3M61zZRgG2c
- Checked and ruled out (no death footage):
  - Shadoune "Post mortem" https://www.youtube.com/watch?v=jFj7oYbI7-Q
  - OutConsumer https://www.youtube.com/watch?v=veU5BYpTKdA
  - Paracetamor https://www.youtube.com/watch?v=LyOlXUZ_c4A
- Used for transcript only: OutConsumer's explanation https://www.youtube.com/watch?v=sNUN7IudvV4

**Context (text/narration, not footage):**
- Rubik, "La Historia Completa de Permadeath" (May 2026): https://www.youtube.com/watch?v=QhHMTOs40mo, and the follow-up "Los jugadores de Permadeath hablan 6 años después": https://www.youtube.com/watch?v=7i83fhYvBZo
- Wikis:
  - https://permadeath.fandom.com/es/wiki/Muertes
  - https://permadeath-wiki.fandom.com/es/wiki/Permadeath
  - https://permadeath-wiki.fandom.com/es/wiki/ElRichMC
  - https://permadeath-wiki.fandom.com/es/wiki/OmniRich
  - Local copies are in `wiki/`.
- Bolavip (Permadeath 2 delayed to 2022): https://bolavip.com/gamer/La-serie-de-Minecraft-Permadeath-2-se-retrasa-hasta-2022-20210601-0029.html

**Local files:** `frames/` (reference frames, NN_player_…), `clips/` (low-res downloads), `subs/` (auto-subs; `subs/gersoon_all.txt` is the compilation's timed transcript), `sheets/` (working contact sheets), `parts/` (the per-batch sections this document was built from).
