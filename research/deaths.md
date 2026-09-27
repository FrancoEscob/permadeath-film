# Permadeath (ElRichMC): every player death, with sources

Research notes for the animated recreation. Compiled 2026-09-26.
Rule for the animation team: **only animate what is marked as seen or stated by a first-person source.** Anything marked UNVERIFIED, SINGLE-SOURCE or "open question" should not be drawn as fact.

---

## 0. Scope, editions, conventions

### Editions
- **Only one edition was ever played: Permadeath (1st edition, "PermadeathSMP").** It ran from 25/03/2020 to 24/05/2020 on Minecraft 1.15.2, hosted by KernelFreeze and organised by ElRichMC, with 38 players. The plan was to reach day 110 and enter the "Salón de la Fama / Hall of Fame". It ended on **day 60** with no survivors.
  - Official closing tweet, 24/05/2020 21:00 UTC: "¡ENHORABUENA, HABÉIS PERDIDO! Habéis tardado un total de 60 días en perder. 38 jugadores asesinados." https://x.com/PermadeathSMP/status/1264662676002742275
- **Permadeath 2 never happened.**
  - Teased 31/05/2020 ("2021 suena como un buen año para matar a más jugadores", https://x.com/PermadeathSMP/status/1267162955910709249).
  - Delayed to 2022, then put on hold indefinitely for lack of funding (Rich's thread, Nov 2022: https://x.com/ElRichMC/status/1595905696259883009).
  - 4th-anniversary tweet: "lejos de estar cancelado, hasta que se disponga de la financiación necesaria no se podrá producir" (https://x.com/PermadeathSMP/status/1772352321004896291).
  - Rich in 2026 said the project is "totalmente parado" (Rubik, https://www.youtube.com/watch?v=7i83fhYvBZo&t=1260).
  - YouTube videos titled "Permadeath 2", "Permadeath Bedrock", "Temporada 2" and similar are fan servers with no link to ElRichMC. They are excluded.
- **"#PermadeathSpinoff"**: on 31/05/2020 the official account posted an image reading "ElRichMC se enfrentará SOLO a TODOS los cambios. Cada aumento de dificultad se aplica cada 10 horas" (https://x.com/PermadeathSMP/status/1267163545084530689). No evidence was found that this spin-off was ever played, so it is **not treated as an edition**. The "OmniRich" death (section 39) is a different, one-off event on 24/05.

### Conventions
- **Times.** The official @PermadeathSMP death cards print `DD-MM-2020 | HH:MM:SS UTC`, and they really are UTC. Four independent checks agree:
  - Tweets usually went out 7–40 minutes after the card time.
  - Twitch clips of the deaths were created 13–40 s after the card time.
  - ElRichMC's screenshot filenames seen in chat match.
  - Hardyluski's "ha muerto mike" tweet came 2m18s after Mike's card time.
  - Spain was CET (UTC+1) until 28/03/2020 and CEST (UTC+2) from 29/03 onward. The fan wikis copy the UTC times without saying so, and Rubik's 2026 documentary reads them as if they were local time.
- **Day numbers** use the UTC date minus 25/03/2020 (Day 0). This matches the server's own count: AFK bans fire at 00:00:00 UTC, and "Mañana día 24/04/2020 es el día 30/110" (https://x.com/PermadeathSMP/status/1253303446440161287). A few late-night deaths therefore fall on the next calendar day in Spain (Ander, Mikecrack, EsVandal).
- **Death numbers "#N"** are the official death-card numbers. They include 6 AFK/inactivity bans, which are not deaths.
- **Source abbreviations** used below:
  - **CARD**: the official @PermadeathSMP card tweet, https://x.com/PermadeathSMP/status/<id>. All 38 cards were retrieved and read: `tweets/card01.jpg` … `card38.jpg`, `tweets/sheet1-3.jpg`.
  - **GERSOON**: the compilation "TODAS LAS MU3RT3S PERMADEATH" (24/05/2020), https://www.youtube.com/watch?v=vYTcFdeAxE0.
  - **RUBIK-DOC**: Rubik (a participant), "La Historia Completa de Permadeath" (May 2026, includes player interviews), https://www.youtube.com/watch?v=QhHMTOs40mo.
  - **RUBIK-6Y**: Rubik, "Los jugadores de Permadeath hablan 6 años después" (June 2026, first-person testimonies), https://www.youtube.com/watch?v=7i83fhYvBZo.
  - **WIKI-A**: https://permadeath.fandom.com/es/wiki/Muertes
  - **WIKI-B**: https://permadeath-wiki.fandom.com/es/wiki/Permadeath and its player pages. Both wikis are fan-made and unreliable on details.
- Transcripts, frame sheets and downloaded clips behind these notes are in `subs/` (`grpA`–`grpD`). A separate frame-by-frame visual beat sheet from the GersoonSG compilation is being built in `parts/` by another agent; use it alongside these notes.

### Mechanics relevant to the animation
- **Death feed** (seen in many clips):
  - Red chat line `El comienzo del sufrimiento infinito de <X> ha comenzado. ¡HA SIDO PERMABANEADO!` (early days), later `Este es el comienzo del sufrimiento eterno de <X>. ¡HA SIDO PERMABANEADO!`.
  - Then a grey custom joke line per player, then the vanilla death message.
  - A big title `¡Permadeath!` / `<X> ha muerto` shows for everyone, and the dead player gets the kick screen "Has sido PERMABANEADO".
  - The wikis add that a dragon roar and Rich's voice saying "Permadeath" are played (WIKI-A).
- **Death Train**: every real death starts a forced storm, "¡Comienza el Death Train con duración de N horas!". AFK bans do not start one (https://x.com/PermadeathSMP/status/1251894930944991239). From 19/04 the storm length resets every 25 days, and mobs get Strength I, Speed I and Resistance I during it (official image, https://x.com/PermadeathSMP/status/1251903907686690821). Durations actually seen in chat are quoted per death below; no others are inferred.
- **Totems**:
  - From day 30 they fail 1% of the time; from 28/04, 3%; from day 40 they also consume 2 per activation; from day 50, 5%; from day 60 ("¡7%!"), 7%.
  - The plugin prints each roll in chat, e.g. `X ha consumido un tótem. (Probabilidad: 56 != 99)` when it works and `(Probabilidad: 97 >= 97)` when it fails.
  - On day 55 each survivor received the **"Medalla del Superviviente"**, a totem that always works. Like any totem, it does nothing in the void.

---

## 1. Chronological index

| # | Player (MC name) | Day | Date, time UTC (Spain) | Official cause (CARD) | Place | Status |
|---|---|---|---|---|---|---|
| 1 | Alvaro845 | 0 | 25/03 19:15:18 (20:15 CET) | Creeper | Overworld cave, lava lake | CONFIRMED |
| 2 | TheGamerMaldito | 0 | 25/03 19:30:04 (20:30 CET) | Creeper | Overworld cave near a mineshaft | CONFIRMED |
| 3 | Cecililla | 0 | 25/03 21:29:16 (22:29 CET) | Creeper | Overworld strip-mine at Y 11 | CONFIRMED (cause); reason why disputed |
| 4 | Kaumaru | 10 | 04/04 16:50:27 (18:50) | Araña de cueva | Overworld cave-spider spawner area | SINGLE-SOURCE scene (off-stream) |
| 5 | Felipez360 | 10 | 04/04 20:19:39 (22:19) | Araña | Overworld, Th3Antonio and Zeling's base | CONFIRMED |
| 6 | Ibai (DONIBAILLANOS) | 11 | 05/04 17:23:54 (19:23) | Creeper | Overworld mineshaft | CONFIRMED |
| 7 | ReventXzz | 11 | 05/04 17:28:08 (19:28) | Araña de cueva | same mineshaft | CONFIRMED |
| 8 | AKAWonder | 12 | 06/04 01:17:26 (03:17) | Quemado por Blaze | Nether fortress, blaze-spawner room | CONFIRMED |
| 9 | Ander (4andeR) | 18 | 12/04 22:46:29 (00:46, 13/04) | Araña | Overworld mushroom island, night | CONFIRMED |
| R1 | MrCarlosNoob, 1st death (rolled back) | 20 | night 14→15/04, about 23:00–00:20 UTC | none (no card) | Overworld, jump from a tall pillar | CONFIRMED method; time disputed |
| 10 | LiliCross | 25 | 19/04 15:03:00 | AFK ban | n/a | not a death |
| 11 | RubikYT | 25 | 19/04 17:35:13 (19:35) | Araña de cueva | Overworld mineshaft, cave-spider spawner | CONFIRMED |
| 12 | Zeling (MitisyyLeDivorce) | 26 | 20/04 01:58:13 (03:58) | Magma Cube (Giga Magma Cube) | Nether wastes | CONFIRMED |
| 13 | Tonacho | 26 | 20/04 14:30:30 (16:30) | Slime (Giga Slime) | Overworld swamp at dawn | CONFIRMED |
| 14–15 | Perxitaa, AlexElCapo | 30 | 24/04 00:00:00 | AFK ban | n/a | not deaths |
| 16 | OutConsumer | 30 | 24/04 13:38:31 (15:38) | Pollo | Overworld, chicken pit at his base | CONFIRMED by his own words; no footage |
| 17 | RanguGamer | 30 | 24/04 17:20:36 (19:20) | Silverfish de la Muerte | Overworld stronghold | CONFIRMED |
| 18 | FrigoAdri | 30 | 24/04 18:22:16 (20:22) | Ender Creeper | End main island, before the boss fight | CONFIRMED |
| 19 | Folagor (Folagoro) | 32 | 26/04 20:54:43 (22:54) | Ender Ghast | End main island | CONFIRMED |
| 20 | Paracetamor | 32 | 26/04 20:58:49 (22:58) | Caer al vacío | End, gateway pearl into void | CONFIRMED by her words; no footage |
| 21 | Gona89 (Gona89_YT) | 34 | 28/04 17:03:26 (19:03) | Shulker explosivo | End City tower | CONFIRMED |
| 22 | MrCarlosNoob, final death | 34 | 28/04 17:23:34 (19:23) | Caída escapando de una araña de cueva | Overworld tunnel at a cave-spider spawner | CONFIRMED |
| 23 | Mikecrack | 35 | 29/04 22:49:47 (00:49, 30/04) | Ender Ghast | End outer islands | CONFIRMED |
| 24 | BarbeQ | 36 | 30/04 00:00:00 | AFK ban | n/a | not a death |
| 25 | Cibergun | 36 | 30/04 19:55:59 (21:55) | Ender Ghast | End midlands | CONFIRMED |
| 26 | Alkapone (Leyville) | 38 | 02/05 04:07:22 (06:07) | Caída | End City island, elytra dive | CONFIRMED |
| 27 | LakshartNia (Lakshart) | 38 | 02/05 18:22:00 (20:22) | Ender Ghast | End City | CONFIRMED |
| R2 | Kakytron, 1st death (revived) | 40 | 04/05, time unknown | none (no card) | Overworld, top of his obsidian tower | CONFIRMED method; time unknown |
| 28 | Hardyluski | 44 | 08/05 14:10:12 (16:10) | Gato Supernova | Overworld, in flight with elytra | CONFIRMED |
| 29–30 | Th3Antonio, CooLifeGame | 50 | 14/05 00:00:00 | AFK ban | n/a | not deaths |
| 31 | BriiHD (ElBrean) | 50 | 14/05 07:59:25 (09:59) | Ghast Demoníaco | Nether, his gold farm | CONFIRMED |
| 32 | ElRichMC | 56 | 20/05 19:23:55 (21:23) | Caer al vacío | The Beginning (void) | CONFIRMED |
| 33 | EsVandal | 59 | 23/05 22:58:41 (00:58, 24/05) | Wither Skeleton Emperador | Nether fortress | CONFIRMED |
| 34 | Kakytron | 60 | 24/05 14:58:18 (16:58) | Ender Quantum Creeper | Overworld, his base | CONFIRMED |
| 35 | CrisGreen | 60 | 24/05 15:32:41 (17:32) | Ender Quantum Creeper | Nether portal at their base | CONFIRMED; location disputed |
| 36 | Shadoune666 | 60 | 24/05 15:37:14 (17:37) | Ahogarse | Flooded area of his Overworld base | CONFIRMED |
| 37 | KillerCreeper55 (killercreeper_55) | 60 | 24/05 20:43:39 (22:43) | Ender Quantum Creeper | His base's chest hall | CONFIRMED |
| 38 | Luh (iLuh) | 60 | 24/05 20:50:35 (22:50) | Ahogarse | Swamp water under his base | CONFIRMED |
| 39 | "OmniRich" (ElRichMC's admin account), epilogue | 60 | 24/05 about 21:05 UTC (23:05) | Vex (no card) | Overworld, just out of a Nether portal | CONFIRMED event; not a participant death |

**Totals.** 38 official cards: 32 real deaths plus 6 AFK/inactivity bans. There are also 2 non-counted deaths (Carlos's first, undone by a rollback; Kakytron's first, revived) and 1 epilogue death (OmniRich), for **35 animatable death events**.

**Survivors:** none. Nobody was alive at the end. **Luh** was the last player standing and died on day 60 at 20:50:35 UTC; his card is the only gold one.

---

## 2. Deaths, one section each, in chronological order

### #1 Alvaro845
- **Player:** Alvaro845 (MC `Alvaro845`), YouTuber/streamer (Clash, TeamQueso).
- **When:** Day 0, 25/03/2020 19:15:18 UTC (20:15 CET). His stream overlay read "TIEMPO VIVO 02H:08M:21S" at death.
- **Cause:** Creeper. Overworld, a large cave around Y 11–12 with a lava lake and lava falls (ravine-like). Chat: "Alvaro845 was blown up by Creeper".
- **Circumstances (his own live footage):**
  1. Full iron armour, iron pickaxe, shield in the off-hand, water bucket and torches. He had claimed a village and tamed a dog earlier that day.
  2. He was pouring water on the lava lake to make obsidian, standing in the water because he believed mobs don't spawn there ("En el agua [no spawnean mobs]… por si acaso").
  3. At 45:48 a normal spider drops on him from above and hits him.
  4. At 45:49.5 a creeper falls from the upper right, flashes red from its own fall damage, lands beside him and explodes instantly.
  5. Game-over screen at 45:50.
- **Consequences:** The first death of the server, so the first Death Train storm. He laughed it off ("pues ya estaría") and ended the stream.
- **Sources:**
  - His stream: https://www.youtube.com/watch?v=PRUwDKGlHDQ&t=2742 (death 45:50). Quotes: 45:56 "no, me ha caído un creeper de arriba, tío"; 47:10 "me ha caído primero una araña y luego directamente [el creeper]".
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=6
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=55
  - CARD https://x.com/PermadeathSMP/status/1243215294228725760
  - WIKI-B player page.
- **Confidence:** CONFIRMED. The footage matches the wiki's spider-then-falling-creeper story.
- **Open:** Whether he had an iron sword (the wiki says so; at 40:25 he says he needs a sword "que verdaderamente haga algo de daño").

### #2 TheGamerMaldito
- **Player:** TheGamerMaldito (MC `TheGamerMaldito`).
- **When:** Day 0, 25/03/2020 19:30:04 UTC (20:30 CET), 15 minutes after Alvaro.
- **Cause:** Creeper. Overworld, a narrow tall cave at about Y 11 with lava pools and obsidian patches, next to an abandoned mineshaft (he had looted a chest minecart). Chat: "TheGamerMaldito ha explotado por Creeper".
- **Circumstances (his recorded video):**
  1. Full iron armour, iron sword and pickaxe, shield, water buckets.
  2. He knew about Alvaro's death and the storm and chose to stay underground.
  3. At 1:01:22 he said "en cuanto escuche algo caer levantamos el escudo".
  4. At about 1:06:29 he was mining a gravel wall with the iron pickaxe. A creeper dropped past him from a ledge above (red fall-damage flash). He turned and switched to the sword, and it exploded about 1 s later.
- **Reaction:** "ha sido instantáneo" (1:06:42); "no sabía que los escudos tenían un delay" (1:07:30); at 1:09:04 he insists the shield was up. His client showed a Java IOException disconnect instead of the ban screen.
- **Sources:**
  - His video https://www.youtube.com/watch?v=0yCjEmEntJE&t=3980
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=50
  - Mantrex reaction https://www.youtube.com/watch?v=rJtfanK4sYs
  - CARD https://x.com/PermadeathSMP/status/1243227776355885058
- **Confidence:** CONFIRMED.
- **Open:** The raised shield isn't clearly visible at 360p. He seems to have recorded rather than streamed.

### #3 Cecililla (CecilillaJuega)
- **Player:** Cecililla Juega (Peru), MC `Cecililla`, original team with Cibergun.
- **When:** Day 0, 25/03/2020 21:29:16 UTC (22:29 CET; 16:29 in Peru).
- **Cause:** Creeper. Overworld, a 1×2 strip-mine tunnel at Y 11 with obsidian patches, which had just broken into a small dark dirt/gravel cave pocket. Chat: "[MIEMBRO] Cecililla ha explotado por Creeper".
- **Circumstances (her live stream):**
  1. Iron armour, iron sword, stone and iron pickaxes, shield, water bucket; holding a torch.
  2. She was on a voice call with Cibergun. She found an abandoned mineshaft and said she'd go in with him rather than alone ("hay un lugar abierto pero no sé si ir… mejor vengo contigo").
  3. At 11:58: "al menos esta mina podemos encontrar diamantes en esta altura y es como más seguro".
  4. She was at full health until the instant of death. **The creeper never appears on screen**; it presumably came from behind. Death at 12:06.7.
- **Reaction:** "¿Qué ha pasado? Chicos, ¿cómo? ¿Cómo ha sido?" Her video description reads "GG Creeper silencioso".
- **Sources:**
  - Her EP2 https://www.youtube.com/watch?v=ib0vDFyj0q8&t=701
  - Context in EP1 https://www.youtube.com/watch?v=Eht6MSMjxaM
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=79
  - Tony Go https://www.youtube.com/watch?v=lljBTrQPa6Y
  - CARD https://x.com/PermadeathSMP/status/1243612769892601856
- **Confidence:** CONFIRMED for how she died. DISPUTED for why: WIKI-B's theory (a skeleton shot the creeper, or lag muted the hiss) has no support in the footage.
- **Open:** Whether Cibergun was physically nearby or only on the call.

### #4 Kaumaru (Kaumaru102)
- **Player:** Kaumaru102 (MC `Kaumaru`). The first victim of the day-10 change, which gave spiders 1–3 random potion effects.
- **When:** Day 10, 04/04/2020 16:50:27 UTC (18:50 CEST).
- **Cause:** Cave spider. Overworld, an area with cave-spider spawners that he had lit up.
- **Circumstances (his own later explanation only):**
  1. He removed one block, and for a split second the gap was unlit ("se ha generado un espacio negro").
  2. A cave spider with Strength and Speed spawned in it.
  3. He couldn't outrun it ("como Naruto pero multiplicado por 10") and it killed him ("me ha machacado").
- **Recording:** OFF-STREAM, no footage ("no lo tengo grabado"). His explanation clip was filmed in another world, so don't use its scenery.
- **Consequences:** An 11-hour Death Train; reaction clips say "duración de 11 horas" and Felipe's VOD says "11 horas de lluvia". It was later cited as one of three "bug deaths" and was not revived, because the bug was vanilla Minecraft rather than the plugin.
- **Sources:**
  - GERSOON (his explanation) https://www.youtube.com/watch?v=vYTcFdeAxE0&t=118
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=1597
  - Reaction clips https://www.youtube.com/watch?v=xHPh_iKEBhk and https://www.youtube.com/watch?v=NTUFmRdV8EY
  - Felipe's VOD https://www.youtube.com/watch?v=EcTKI1EnBkk&t=8006 ("justo cuando empezó la raid ha muerto Kaumaru")
  - CARD https://x.com/PermadeathSMP/status/1246484059313917955
- **Confidence:** SINGLE-SOURCE for the scene (his own words). Cause and time are confirmed by the CARD.
- **Open, do not animate as fact:**
  - The exact place: WIKI-B says a multiple dungeon; WIKI-A says two spawners under his house.
  - The effect levels: WIKI-B says Speed III and Strength IV.
  - His gear, and whether anyone was with him.

### #5 Felipez360
- **Player:** Felipez360. His MC name is `xXmineCr4fterXx` according to WIKI-B (not verified on screen). Original team with AlexElCapo and BriiHD.
- **When:** Day 10, 04/04/2020 20:19:39 UTC (22:19 CEST), at night, in the rain from Kaumaru's storm.
- **Cause:** Spider (normal size). Overworld, inside Th3Antonio and Zeling's stone-brick "castle" base by a river.
- **Circumstances:**
  - In his own 2026 account, Zeling had logged in stuck inside a wall and was suffocating, because Antonio had built where she logged out. The base was poorly lit, with no walls. Felipe rushed over to dig her out.
  - The footage from Antonio's and Zeling's views shows:
    1. Felipe in full diamond armour with a diamond sword, trading blows in a corridor (minecart rails, lecterns, villagers) with a spider that won't die.
    2. Zeling (`MitisyyLeDivorce`) is nearby.
    3. He flees through a wooden door into a side room and dies about 17 s after the fight is first seen.
  - Rubik and WIKI-B say he lost a totem first; the totem pop isn't visible at 360p.
- **Reaction:** Antonio yells "te mata, te mata… Felipe, Felipe, está muy chetada esa araña… vete, vete… Lol, Felipe". FrigoAdri's scream was memorable. Felipe's head was later put on a post in that corridor (Ander ep1, https://www.youtube.com/watch?v=et1nxz21oRw&t=568).
- **Sources:**
  - Th3Antonio POV in GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=185 (death about 3:29)
  - Tony Go https://www.youtube.com/watch?v=dqszys6ngPA&t=88
  - Zeling POV https://www.youtube.com/watch?v=8j6fZhRH-G4 (Twitch clip ReliableHungryPhoneImGlitch)
  - Felipe in RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=1035
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=253
  - CARD https://x.com/PermadeathSMP/status/1246560477645352962
- **Confidence:** CONFIRMED for place and mob.
- **DISPUTED:**
  - Spider effects: WIKI-B says Resistance III, Regeneration IV, Strength IV; Rubik says Resistance IV and Regeneration III. Not visible in the footage.
  - Recording: BriiHD remembers watching him live "ayudando a Frigo". The evidence says Felipe's own view was not recorded: his VOD EcTKI1EnBkk ends earlier, and his own account says he was helping Zeling.

### #6 Ibai
- **Player:** Ibai Llanos (MC `DONIBAILLANOS`, seen on screen), G2 team with Reven, Ander and BarbeQ.
- **When:** Day 11, 05/04/2020 17:23:54 UTC (19:23 CEST). His tweet "Ha sido un placer" went out at 17:26:09 UTC.
- **Cause:** Creeper. Overworld, an abandoned mineshaft (planks, fences, cobwebs, a looted chest minecart, flowing water). Chat: "DONIBAILLANOS fue reventado/a por Creeper", then "IbaiLlanos, Llano estás en el server, Ebay".
- **Circumstances (his own edited video):**
  - The G2 players had barely played in 10 days and came back poorly equipped.
  - Ibai had iron-level armour, a shield, an iron pickaxe in hand and a diamond sword on the hotbar.
  - He walked from a lit spot next to Ander (the `4andeR` nametag is beside him) into an unlit side tunnel.
  - At 11:32.5 a creeper appears out of the dark at arm's length, hisses, and he dies about 0.5 s later. Reven was elsewhere and only saw the chat.
- **Consequences:** "¡Comienza el Death Train con duración de 12 horas!" Chat reactions: ElRichMC "gg", iLuh "NOOOO".
- **Sources:**
  - His video https://www.youtube.com/watch?v=IlLBpLHX7Uw&t=692
  - Reven's view https://www.youtube.com/watch?v=04iWzduC6Vo&t=8
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=235
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=439
  - CARD https://x.com/PermadeathSMP/status/1246864466471530497
- **Confidence:** CONFIRMED.
- **Open:** The wiki's "he panicked" isn't visible, since the whole encounter lasts about 0.5 s. There is no clean quote from Ibai (his video has no captions).

### #7 ReventXzz (Reven)
- **Player:** Reven (MC `ReventXzz`), G2.
- **When:** Day 11, 05/04/2020 17:28:08 UTC (19:28 CEST), about 4 minutes after Ibai, in the same mineshaft.
- **Cause:** Cave spider. Chat: "ReventXzz ha sido víctima de Araña de cueva", then "Partida equivalente a un AFK en el LoL".
- **Circumstances:**
  1. Reven and Ander went after a spider they could hear: "Oigo araña… vamos a por ella, Ander".
  2. The cave spider came down the rail corridor.
  3. Reven had a shield, an enchanted diamond sword and an iron helmet. He swung once, and it killed him in one hit from full health.
- **Reaction:** "me ha one-shoteado… tenía una espada de diamante". Ander then tried to recover his friends' heads.
- **Sources:**
  - His POV in GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=261 (death about 4:34)
  - https://www.youtube.com/watch?v=04iWzduC6Vo&t=72
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=439
  - CARD https://x.com/PermadeathSMP/status/1246864720096788481
- **Confidence:** CONFIRMED.
- **Open:** Effect levels (WIKI-B says Speed III and Strength IV) and the rest of his armour aren't visible.

### #8 AKAWonder
- **Player:** AKAWonder (MC `AKAWonder`), a novice who had learned in Rich's series "De Noob a Pro 2".
- **When:** 06/04/2020 01:17:26 UTC (03:17 CEST), during the 12-hour storm. That is Day 12 by the UTC date, though in Spain it was the night of Day 11.
- **Cause:** Burned to death by Blazes. Nether fortress. Vanilla message: "AKAWonder se ha reducido a cenizas mientras luchaba contra Blaze"; CARD: "Quemado por BLAZE".
- **Circumstances (his own video):**
  1. The setting: a netherrack tunnel with a chest, an ender chest, a crafting table and a sign reading "Castillo Nyasuu / Ve con cuidado :3" (Nia's catchphrase). Beyond a wooden door is a netherrack room with a blaze spawner, a torch on it.
  2. He had come to mine quartz and gain XP to repair his pickaxe ("si yo aquí venía a reparar el pico", 19:38), then got lost ("no recuerdo la salida", 20:00).
  3. Full enchanted diamond armour, diamond sword, shield and bow.
  4. At 20:54–20:55 he raised the fire-resistance potion for about 1.5 s, then switched to the sword. The potion stays in the hotbar, so he never drank it.
  5. He fought blazes at the doorway, went into the spawner room, caught fire and burned down from about 21:06. At the end he tried to drink regeneration. Death at 21:27.
- **Reaction:** "¿Por qué me quitan tanto ahora?… sal de aquí… me muero, me muero, me morí… ¡si me tomé la poción!" Then "no me había tomado [la poción]". He then eats cereal on camera.
- **Sources:**
  - His video "COMO NO TOMAR POCIONES… FIN" https://www.youtube.com/watch?v=2HtNkQb43_s&t=1254
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=290
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=455
  - CARD https://x.com/PermadeathSMP/status/1246976907750641664
- **Confidence:** CONFIRMED.
- **Contradictions:** WIKI-B says he didn't know potions have a drinking delay and had gone for blaze rods. The footage shows an interrupted drink, and his own words say pickaxe repair and quartz.

### #9 Ander
- **Player:** Ander Cortés (MC `4andeR`), G2. After Ibai and Reven died, Nia and Zeling took him in.
- **When:** 12/04/2020 22:46:29 UTC. That is Day 18 by the server count, but 00:46 on 13/04 in Spain.
- **Cause:** Spider. Overworld, at night, on a mushroom island (mooshrooms visible) by the shore.
- **Circumstances (his own edited video):**
  1. He was with Lakshart (Nia) and MitisyyLeDivorce (Zeling) after a treasure-map/ocean trip (WIKI-B: looking for tridents).
  2. Phantoms were swarming and he was shooting them with an enchanted bow. ElRichMC asked in chat "¿dormimos?"; the game showed "Se necesitan 3 jugadores más durmiendo".
  3. At 12:33 a spider rushes him. His totem pops at 12:35.9 (advancement "[Post Mortem]").
  4. He dies about 0.6 s later: "4andeR ha sido víctima de Araña", score 5166, then "No es cortés irse antes de tiempo".
- **Quotes** (speaker attribution partly unclear): "Una araña, una araña… me mata… ¡lárgate, lárgate!… muévete al agua, nada en el agua".
- **Consequences:** Nia felt responsible (RUBIK-DOC).
- **Sources:**
  - His video "PERMADEATH | El final" https://www.youtube.com/watch?v=oeLcLRaezYg&t=753
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=336
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=485 ("en simplemente tres golpes")
  - CARD https://x.com/PermadeathSMP/status/1249472456252932096
- **Confidence:** CONFIRMED.
- **Open:** Only one spider is visible (WIKI-B says "hordas… arañas"). Who shouts "lárgate" and "al agua" is unclear.

### R1. MrCarlosNoob, first death (not counted: undone by a server rollback)
- **Player:** MrCarlosNoob (MC `MrCarlosnoob`, rank `[INVITADO+]`). He was the running-joke "invitado" and had not been added to the players' Discord.
- **When:** Night of 14→15/04/2020, day 20, right after the day-20 changes (which removed mob drops, among other things). He typed "estas 20 horas, lo siento", referring to the 20-hour storm his death would cause.
  - Nia says about 01:00 CEST and Folagor about 02:00 CEST, i.e. about 23:00–00:00 UTC.
  - The fan account @PermadeathDead posted "PERMABANEADO MrCarlosNoob" at 02:22 UTC on 15/04, the latest it could have happened.
  - No official card exists.
- **Cause:** A deliberate jump, fall damage. Overworld. Chat: "MrCarlosnoob fell from a high place".
- **Circumstances (his stream clip plus 720p frames):**
  1. At night he stood on a very tall pillar looking down at a red square in a forest (Folagor: "el poste donde se tiró").
  2. He whispered to Nia: "no quiero estar solo" / "no puedo hacer nada con el nuevo cambio" / "ni me preparé porque me enteré ayer" / "SOY ESCORIA".
  3. Later, in daylight, he typed "lo siento server" and "estas 20 horas, lo siento", waved at his webcam and stepped off.
  4. Kit: full health, armour, XP level 22, diamond sword, bow, diamond pickaxe, axe, torches, an unused water bucket. His off-hand was empty (no totem).
  5. He landed on grass near a Nether portal, a gold block and armour stands. The "¡Permadeath! MrCarlosNoob ha muerto" title and the ban screen followed.
- **Consequences:**
  - The death was undone the next morning. Rich tweeted "Me despierto y veo que @mrcarlosnoob ya la ha liado… ya está todo arreglado".
  - Per Nia and Folagor on stream this was a **server rollback** of about 11 hours, which cost other players their night's progress (Th3Antonio and Zeling are named). It was controversial.
  - The official account later tweeted that no one had died in the 24 h after the change, so the death doesn't count.
  - Carlos in 2026: "no es algo de lo que esté orgulloso y no lo volvería a hacer".
- **Sources:**
  - His clip https://www.youtube.com/watch?v=1MXKwq9bs3c (wave 0:05, fall 0:07–0:09, title 0:10)
  - Frames with the whispers https://www.youtube.com/watch?v=UeV62cCvU9c&t=75
  - Nia https://www.youtube.com/watch?v=IXmH2KQt8Ls&t=247
  - Folagor https://www.youtube.com/watch?v=GG8EDjoZv2k&t=882
  - https://x.com/ElRichMC/status/1250365046863134720
  - https://x.com/PermadeathDead/status/1250248178651344897
  - https://x.com/PermadeathSMP/status/1250529782636384263
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=34
  - WIKI-B "Caída" page.
- **Confidence:** Method CONFIRMED (video). Rollback CONFIRMED (two players). Exact time DISPUTED (about 01:00 vs about 02:00 CEST).
- **Open:** What the pillar was made of and where it stood; how long the rollback was.
- **Sensitivity note:** this is an on-stream in-game suicide that the player now regrets. Consider handling it with care, or omitting it.

### #10 LiliCross (AFK ban, not a death)
- **When:** 19/04/2020 15:03:00 UTC, day 25. CARD: "Baneada por AFK" (https://x.com/PermadeathSMP/status/1251893173145796608).
- **What happened:** WIKI-A says she agreed with the admin to be removed. It is the only AFK ban not at 00:00:00. WIKI-B says she stopped for work reasons as a nurse during COVID-19; single source, unverified.
- **Consequences:** No Death Train (official rule).

### #11 RubikYT
- **Player:** Rubik / Rusbi (MC `RubikYT`), "Imperio 31" team with Shadoune666 and CrisGreen.
- **When:** Day 25, 19/04/2020 17:35:13 UTC (19:35 CEST). This was the day of the surprise change: all spiders get 5 effects, and Netherite armour pieces drop from four new mobs.
- **Cause:** Cave spider. Overworld, an already-explored mineshaft cave with a double cave-spider spawner. Vanilla: "RubikYT was slain by Cave Spider".
- **Circumstances:**
  1. He was farming the spawner for the Netherite helmet (dropped by cave spiders).
  2. He built a cobblestone cubicle, using stairs to leave a one-block hitting slot. Rich, on his call, suggested replacing a fence with a full block.
  3. While re-placing the last cobblestone stair, a spider slipped in. The spiders show as **ghostly white outlines with red eyes** (Invisibility plus Glowing); some are on fire.
  4. He knocked it out through the gap with a knockback sword.
  5. His off-hand totem popped ("Postmortal"). He scrolled through bow and shield, then died without drinking his two healing potions or placing blocks.
- **Quotes:** "no he tirado las pociones de vida que tenía dos a mano; podría haberme puesto otro tótem tampoco lo he hecho". 2026: "Lo que tenía que hacer era conseguir bloques y tapar o directamente cambiarme un tótem".
- **Consequences:** The first death in 13 days. His custom line: "Muere en el PvE otra vez".
- **Sources:**
  - POV https://www.youtube.com/watch?v=8BTg0dVi8mM (0:00–0:12)
  - His last episode https://www.youtube.com/watch?v=nES2Op_6v8I&t=845
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=796
  - Pabl0WL reaction clip https://www.youtube.com/watch?v=ZrrSQuVLYQA
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=384
  - CARD https://x.com/PermadeathSMP/status/1251934909767221248
- **Confidence:** CONFIRMED.

### #12 Zeling
- **Player:** Zeling (MC `MitisyyLeDivorce`, read from chat), teamed with Th3Antonio.
- **When:** Day 26, 20/04/2020 01:58:13 UTC (03:58 CEST).
- **Cause:** Giga Magma Cube (a size-16 magma cube from the day-25 change). Nether wastes at about (-229, 59, 149). CARD: "Magma Cube"; chat: "MitisyyLeDivorce ha sido víctima de Cubo de magma", then "Ahora por fin descansa en paz…".
- **Circumstances (her POV):**
  1. A netherrack field with lava lakes, fire and zombie pigmen. She has a totem in her off-hand and a diamond sword.
  2. The Giga Magma Cube hits her and the totem pops (about 0:21 in the clip). She says "Antonio, me ha quitado el tótem… necesito ayuda, por favor".
  3. Antonio, on call and heading to her, answers (attribution inferred): "Estoy yendo, pero… es que no se puede… voy a morir yo ahora, pero voy a ayudarte".
  4. She flees west with a baked potato in hand and dies about 20 s later.
- **Consequences:** Shadoune typed "QUE ESTA PASABNDO".
- **Sources:**
  - Her POV https://www.youtube.com/watch?v=_qurp74T85c
  - https://www.youtube.com/watch?v=ETrWsHrgXAo&t=12 (1080p)
  - https://www.youtube.com/watch?v=pBMgnXKAfFM
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=419
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=874
  - CARD https://x.com/PermadeathSMP/status/1252248258862342144
- **Confidence:** CONFIRMED.
- **Open:** The killing blow isn't clearly visible. That Antonio later lost her head in lava is WIKI-B only.

### #13 Tonacho
- **Player:** Tonacho (MC `tonacho`).
- **When:** Day 26, 20/04/2020 14:30:30 UTC (16:30 CEST), about 5 minutes into his stream ("llevo 5 minutos de directo").
- **Cause:** Giga Slime (a size-15 slime). Overworld swamp at in-game dawn. Vanilla: "tonacho was slain by Slime"; custom line "Le han puesto mirando a Cuenca".
- **Circumstances (his POV):**
  1. He walks from a moonlit plain into a swamp as the sky turns red at dawn. On-screen sound subtitles show a creeper, a skeleton, "Swimming" and "Water flows".
  2. A giant slime fills the screen and his off-hand totem pops (0:21), leaving him at 1 heart.
  3. A spare totem sits unused in hotbar slot 8. A second hit kills him at the water's edge (0:26).
- **Quotes:** "Un slime gordo, tío. En el pantano, macho… amaneciendo". 2026: "creí yo primero que el slime me enganchara desde tan lejos… no fue a propósito".
- **Consequences:** Some claimed he died on purpose; he denies it.
- **Sources:**
  - POV https://www.youtube.com/watch?v=U-coqqYwluY&t=15
  - https://www.youtube.com/watch?v=IyFiMY2ztX8
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=453
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=600
  - CARD https://x.com/PermadeathSMP/status/1252248359919894528
- **Confidence:** CONFIRMED.
- **Open:** GERSOON's audio has "combo flecha" (arrows?), unverified. RUBIK-6Y's narration says "llegó al día 50", which is wrong: it was day 26.

### #14–#15 Perxitaa and AlexElCapo (AFK bans, not deaths)
- **When:** 24/04/2020 00:00:00 UTC, day 30.
- **CARDs:** https://x.com/PermadeathSMP/status/1253483110441914368 and https://x.com/PermadeathSMP/status/1253483601188003843
- **What happened:** RUBIK-DOC (https://www.youtube.com/watch?v=QhHMTOs40mo&t=946) says both simply stopped playing. It includes AlexElCapo explaining he doesn't like servers with obligations. No Death Train.

### #16 OutConsumer
- **Player:** OutConsumer ("Rock"; CARD name `Outconsumer`), living with Paracetamor.
- **When:** Day 30, 24/04/2020 13:38:31 UTC (15:38 CEST), a few hours before the dragon event. Since day 20 all passive mobs were hostile.
- **Cause:** Chickens. Overworld, the chicken pit at the base he shared with Paracetamor.
- **Circumstances (his own accounts, 2020 and 2026, which agree; no footage):**
  1. He was trying to gain XP levels before the dragon fight, and had taken off his Mending armour so the XP wouldn't go into repairs.
  2. He was throwing food to about 10 chickens from above, leaned over and fell into the pit.
  3. He fled instead of fighting ("he intentado escapar… he abierto un hueco para empezar a subir").
  4. His totem popped and he had no time to equip another. Each chicken hit did about 2–2.5 hearts.
  5. Paracetamor, far away mining gold in a badlands biome and on Discord, saw his health drop in the Tab list.
- **Consequences:** A storm started ("ha muerto Rock, por lo tanto hay tormenta"). Rich later left Paracetamor Rock's 3 totems. Custom line: "Se la han colado por el aro".
- **Sources:**
  - His explanation https://www.youtube.com/watch?v=sNUN7IudvV4 (0:00–2:58)
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=543
  - Paracetamor https://www.youtube.com/watch?v=pvYBVA6Ab9w&t=246
  - Folagor https://www.youtube.com/watch?v=iu5z08w6rdI&t=677
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=180
  - CARD https://x.com/PermadeathSMP/status/1253682260164980737
- **Confidence:** CONFIRMED (his own two consistent accounts, plus the CARD).
- **Visuals:** Not recorded ("no estaba en directo ni grabando"). The pit's shape, the number of chickens (he says 7–10) and the lighting are unknown.

### #17 RanguGamer
- **Player:** RanguGamer (MC `RanguGamer`), boss-fight role `[CONTROL]`.
- **When:** Day 30, 24/04/2020 17:20:36 UTC (19:20 CEST), during the group trip through the stronghold toward the End portal. The on-screen counter read "Quedan 03:36:54 de tormenta" (from OutConsumer's death).
- **Cause:** "Silverfish de la Muerte", a silverfish with the spiders' 5 random effects. Overworld stronghold.
- **Circumstances (his VOD):**
  1. He split from the group to find another door, so the silverfish wouldn't swarm the others.
  2. He was alone in a side room with a chest and wooden doors, placing torches.
  3. An invisible silverfish attacked. He had a shield in his off-hand but torches in his main hand.
  4. He scrolled to change item, landed on the bow and drew it instead of blocking. He died in about two hits. No totem was visible in his off-hand or hotbar.
- **Quote:** "No me dio tiempo. Me quería poner el escudo, pero me confundí. Cerrad la puerta. Lo siento." Custom line: "Comer niños no le confirió vida eterna".
- **Consequences:** The other players had to dodge rather than kill silverfish, to avoid chain spawns (RUBIK-DOC).
- **Sources:**
  - His VOD https://www.youtube.com/watch?v=aKwuY8XBVUs&t=4780 (death about 1:19:55, explanation 1:20:27)
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=607
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=1046
  - CARD https://x.com/PermadeathSMP/status/1253779340460019716
- **Confidence:** CONFIRMED.

### #18 FrigoAdri
- **Player:** FrigoAdri (MC `FrigoAdri`), boss-fight role `[CONTROL+]`.
- **When:** Day 30, 24/04/2020 18:22:16 UTC (20:22 CEST), seconds after arriving in the End for the Permadeath Demon (dragon) event. The totem-failure rule (1%) had been added that same day.
- **Cause:** A charged **Ender Creeper** explosion on the End main island. CARD: "Ender Creeper". In-game: "[CONTROL+] FrigoAdri ha explotado por Creeper" (Rich's English client: "was blown up by Creeper"). The "PERMADEATH DEMON" boss bar was already on screen, but the fight hadn't started.
- **Circumstances (his own POV):**
  1. First words: "lo primero que he hecho es mirar a un enderman".
  2. A nearby creeper blast hurt him about 1.8 s before death. Mikecrack, killercreeper_55 and Crisgreen were close; CrisGreen was blown to 2 hearts and survived thanks to his totem and the Netherite hearts.
  3. The fatal blast came from behind or the side. At 30 fps his off-hand totem is still visible in the last frame, with no totem animation: it failed the 1% roll.
  4. The hardcore screen "¡Se acabó!" appeared. He shouted "¡No se me ha activado el tótem!"
- **Consequences:**
  - "¡Comienza el Death Train con duración de 6 horas!", and the storm counter jumped from about 8:41 to about 14:38.
  - Mikecrack picked up his head and gave it to Nia.
  - The fight then went ahead with no more deaths. Frigo's custom line: "Se ha quedado congelado".
- **Sources:**
  - His POV https://www.youtube.com/watch?v=mNh23UVVN3Q&t=1000 (death about 16:57)
  - Rich's Ep13 https://www.youtube.com/watch?v=40_8agmCLuk&t=1540 (about 25:47)
  - Folagor https://www.youtube.com/watch?v=oTWf9XD9vmU&t=539
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=641
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=1285
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=330
  - CARD https://x.com/PermadeathSMP/status/1253779475411632129
- **Confidence:** CONFIRMED.
- **DISPUTED:**
  - WIKI-B's Permadeath Demon infobox lists Frigo as killed by the Demon. That is wrong: the CARD says Ender Creeper and the fight hadn't started.
  - A "Tótem activado" sound fires at the moment of death. His call attributes it to Mikecrack's totem; RUBIK-DOC says CrisGreen's.
  - Alkapone's theory that Frigo's totem popped on a first explosion is contradicted by the frames.

### #19 Folagor
- **Player:** Folagor03 (MC `Folagoro`), FrigoAdri's close friend.
- **When:** Day 32, 26/04/2020 20:54:43 UTC (22:54 CEST), live.
- **Cause:** Ender Ghast. End main island near the exit portal, "por donde había muerto Frigo". Chat: "Folagoro ha explotado por Ender Ghast", then "Failagor a partir de ahora".
- **Circumstances (his stream):**
  1. His chat voted 52% "sí" to enter the End. Rich escorted him through the stronghold portal with a "3, 2, 1".
  2. Kit: potions of invisibility, speed, slow falling and strength; **no armour** (the invisibility strategy); one totem in the off-hand, spares not on the hotbar; a shield in hand.
  3. He placed a tribute sign: "D.E.P / Hermano. / Te extrañaré. / Folagor…".
  4. While he was typing it, a ghast spawned very close on his right and saw him despite the invisibility. Its fireball popped his totem (the "Post mortem" advancement fired mid-typing), which cleared all his potion effects.
  5. Three ghasts then fired at him over lava patches, with endermen around. He died about 13 s later.
- **Quotes:** "¿Cómo me ha visto? … si estaba invisible". Later: "Mi gran error fue ponerme nervioso… pica hacia abajo".
- **Sources:**
  - His stream https://www.youtube.com/watch?v=xjWOccFfLUQ&t=230 (sign 3:56, pop about 3:57, death about 4:13)
  - Folagor reacting https://www.youtube.com/watch?v=DKZIQ_wSeKU
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=705
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=1425
  - CARD https://x.com/PermadeathSMP/status/1254520923107004416
- **Confidence:** CONFIRMED.

### #20 Paracetamor
- **Player:** Paracetamor ("Raquel", MC `paracetamor`; the card misspells it "Parecetamor"), a Minecraft beginner living with OutConsumer.
- **When:** Day 32, 26/04/2020 20:58:49 UTC (22:58 CEST), about 4 minutes after Folagor.
- **Cause:** Fell into the void in the End. CARD: "Caer al vacío".
- **Circumstances (her own account; off-stream, her only witness a moderator on Discord):**
  1. She had spent about an hour exploring the outer End islands with 88 minutes of invisibility, bridging and looking for an End City to loot on stream the next day.
  2. She saw Folagor's death in the Tab list and decided to head back to the main island rather than log off in the End.
  3. She built a small staircase up to an **End gateway** and threw an ender pearl into it.
  4. She came out falling into the void: "no había cargado a tiempo la isla principal". She threw another pearl upward and it hit nothing. She isn't sure whether she had slow falling.
  5. Her head was left in the void; "Creo que luego Rich fue a por ella". Rich's Ep15 is titled "MISIÓN IMPOSIBLE EN EL VACÍO" (https://www.youtube.com/watch?v=U2V6UXlHGPk); that it shows this retrieval is not verified.
- **Quote:** "Tiré la ender pearl y al salir… salí a la nada".
- **Consequences:** Not revived, because the bug was vanilla Minecraft rather than the plugin. That was controversial.
- **Sources:**
  - Her explanation https://www.youtube.com/watch?v=rWOVX3sZzbo&t=93
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=431
  - Folagor https://www.youtube.com/watch?v=xjWOccFfLUQ&t=739
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=1503
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=745
  - CARD https://x.com/PermadeathSMP/status/1254521106783928320
- **Confidence:** CONFIRMED (her own 2020 and 2026 accounts agree). No footage exists.
- **Disputed:** WIKI-B calls it a world-generation error; she and Rubik call it a vanilla pearl/gateway bug.

### #21 Gona89
- **Player:** Gona89 (MC `Gona89_YT`, rank `[MIEMBRO]`).
- **When:** Day 34, 28/04/2020 17:03:26 UTC (19:03 CEST), live. He had tweeted "Hoy cenaremos en el Valhalla" when going live.
- **Cause:** A chain of **explosive shulker** explosions on top of an End City tower. CARD: "Shulker explosivo"; vanilla "Gona89_YT blew up"; custom line "Verdaderamente lamentable".
- **Circumstances (his final episode):**
  1. Invisibility plus slow falling, no armour, totem equipped. The End City was open, at roughly X -1800 / Z -4100 (from auto-subs). He took the elytra first.
  2. He built a small shelter, shot shulkers from a distance with a bow, and used TNT on one.
  3. He climbed to the top ("arriba de todo, bloqueo"), planning to anger one shulker at a time and run down.
  4. At 22:23: "Cuidado, explosiones significa que se están muriendo".
  5. The shulkers set each other off in a chain as he started down. The totem failed its roll.
- **Consequences:** "¡Comienza el Death Train con duración de 10 horas!", stacked onto a storm already running (the counter then read about 11:07). Luh typed "NOOOOOOOOOO".
- **Quotes:**
  - 23:38 "no se ha activado el tótem… ha habido una cadena de explosiones… 1%"
  - 25:06 "mi plan era cabrear a algunos shulker… en la torre bajarme corriendo"
  - 2026: "una cadena masiva de explosiones… no me dio tiempo a ver la lógica"
- **Sources:**
  - His episode https://www.youtube.com/watch?v=e0FHVs22lVc&t=1330
  - Twitch clip from Carlos's stream, showing the chat: https://clips.twitch.tv/ToughDullTigerCoolStoryBob
  - Mikecrack, who was watching him live https://www.youtube.com/watch?v=6BsfzOAT3jo&t=462
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=1445
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=765
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=1643
  - Multi-POV https://www.youtube.com/watch?v=1qqbHzD_PFU (not reviewed)
  - CARD https://x.com/PermadeathSMP/status/1255198281778565121
- **Confidence:** CONFIRMED.
- **Open:** Whether the fatal blast came from a dying shulker's TNT or a bullet. In 2026 he remembers someone dying "delante de mi cara" 5–10 minutes earlier, but no death fits; it's a memory error.

### #22 MrCarlosNoob, final death
- **Player:** MrCarlosNoob (MC `MrCarlosnoob`, rank `[INVITADO]`).
- **When:** Day 34, 28/04/2020 17:23:34 UTC (19:23 CEST), 20 minutes after Gona, live. Stream title: "PERMADEATH, HOY ELYTRAS Y.... MUERTE?". His HUD showed "Quedan 10:47:31 de tormenta" (Gona's storm).
- **Cause:** Fall damage from his own **ender pearl** while fleeing a **cave spider**. Overworld stone tunnel at a cave-spider spawner. CARD: "Caída escapando de una araña de cueva"; vanilla "hit the ground too hard whilst trying to escape Cave Spider".
- **Circumstances (his Twitch clip):**
  1. He was farming spider eyes at a spawner ("aquí está el spawner… el truco es… poner la valla"). A **glowing** cave spider is in the tunnel.
  2. Full armour bar, poisoned hearts, a totem in the off-hand.
  3. At half a heart he selects an ender pearl and throws it a few blocks down the tunnel (the count goes 13 to 12).
  4. The pearl's landing damage kills him. The totem does not fire, a failed 3% roll per Gona: "también le falló el tótem".
- **Consequences:** Mikecrack narrated it live: "a medio corazón… murió por la enderpearl al tratar de huir de una araña de cueva". Custom line (WIKI-A): "Por esto hizo 18 h de esclavitud".
- **Sources:**
  - Twitch https://clips.twitch.tv/KitschyBrightJaguarGOWSkull
  - Mikecrack https://www.youtube.com/watch?v=6BsfzOAT3jo&t=384
  - Rubik reacting https://www.youtube.com/watch?v=G_LZu0f84C0&t=402
  - Gona https://www.youtube.com/watch?v=e0FHVs22lVc&t=1649
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=795
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=1752
  - CARD https://x.com/PermadeathSMP/status/1255200228409593857
- **Confidence:** CONFIRMED.
- **Resolved:** RUBIK-DOC's "araña de cueva" and the CARD's "caída escapando…" describe the same event.
- **Open:** The failed-roll chat line itself isn't visible in the clip. WIKI-B's claim that the spider eyes were for poison against shulkers is unverified.

### #23 Mikecrack
- **Player:** Mikecrack (MC `Mikecrack`, rank `[MIEMBRO]`), "Mikardy" team with Hardyluski. At the time he was the biggest Spanish-speaking YouTuber.
- **When:** Day 35, 29/04/2020 22:49:47 UTC (00:49 CEST on 30/04), **live on his YouTube channel**, alone.
- **Cause:** Ender Ghast. End outer islands. Vanilla: "Mikecrack was blown up by Ender Ghast"; custom line "El diamantito le sirvió de poco".
- **Circumstances (his livestream, edited as "#16 FINAL"):**
  1. He was heading far out (toward about +10,000) to find an unclaimed End City to blow up with TNT. His kit: "nos quitamos la armadura, nos ponemos las elytras, la calabaza" (a carved pumpkin on his head) and a huge stack of rockets.
  2. He showed viewers his method: fly among Ender Ghasts so they hit each other and can't hit him ("mientras esté volando… prácticamente soy inmortal"). He named the one risk himself: "hay una posibilidad de que me mate… que rebote la bala".
  3. While finishing a ghast he clipped the edge of an island. A ghast behind him fired and the first fireball popped his totem (roll "Probabilidad: 56").
  4. He tried to jump back over the void, but the second fireball hit the island next to him and the blast killed him.
- **Quote** (about 20:49–21:14): "Corre, Mike. No puede ser… No me lo puedo creer… por tocar suelo… creía que estaba encima del vacío… me he muerto por lo que dije".
- **Consequences:** Rich "gg", Shadoune "NOO", Nia "que". A Death Train started (duration unreadable). Hardy tweeted "ha muerto mike…" at 22:52:05 UTC (https://x.com/Hardyluski/status/1255630967844323328) and the next day streamed "MIKECRACK ha MUERTO. VAMOS A IR AL END".
- **Sources:**
  - His stream https://www.youtube.com/watch?v=6BsfzOAT3jo&t=1240
  - Rich's stream chat https://clips.twitch.tv/GracefulPeppyPoxDxCat
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=812
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=2100
  - CARD https://x.com/PermadeathSMP/status/1255639524971077638
- **Confidence:** CONFIRMED.
- **Open:**
  - Whether he was invisible or armoured at the moment of death; he took the armour off at the start.
  - The claim that Hardy fetched Mike's head and lost a totem is WIKI-B only.
  - His earlier near-deaths (the Efficiency V end-rod fall, pearl lag, the ender creeper in a hole) are in #15 (https://www.youtube.com/watch?v=gSs6GUmJx18). They are not this death.

### #24 BarbeQ (AFK ban, not a death)
- **When:** 30/04/2020 00:00:00 UTC, day 36. CARD: https://x.com/PermadeathSMP/status/1255641761428488192
- **What happened:** He stopped playing (RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=2150). No Death Train.

### #25 Cibergun
- **Player:** Cibergun (MC `cibergun`, rank `[MIEMBRO]`), Cecililla's former teammate.
- **When:** Day 36, 30/04/2020 19:55:59 UTC (21:55 CEST), live. Stream title: "De camino al END || Objetivo: Élitros + Shulker box".
- **Cause:** Ender Ghast. End midlands at about (1798, 59, -401) (debug screen). Chat: "cibergun ha explotado por Ender Ghast"; custom line "Ahora descansa en paz".
- **Circumstances (his own Twitch clip):**
  1. On a call with Shadoune, he was discussing an End City with no ship that looked unclaimed: "no me la voy a jugar ahora por shulkers… si no te interesa esta End City…".
  2. No armour. Invisibility showed 0:06 left. He was eating cooked cod, with endermen nearby, a totem in his off-hand, a spare totem on the hotbar and 14 pearls.
  3. The invisibility ran out while he talked. An Ender Ghast behind him fired and the totem popped (roll "47 != 99").
  4. He swapped to an ender pearl, then a slow-falling potion, while running. A second fireball, already in flight, killed him about 3 s later.
- **Quotes:** "se me ha pasado la poción hablando… lo siento". Shadoune apologised for distracting him.
- **Sources:**
  - His final episode https://www.youtube.com/watch?v=4Ts2lavzuOM&t=905
  - Twitch https://clips.twitch.tv/ProductiveDignifiedPepperSaltBae and https://clips.twitch.tv/EnchantingWimpySquirrelOneHand
  - Shem https://www.youtube.com/watch?v=GS0ZhCXPyP8
  - Folagor https://www.youtube.com/watch?v=w72BaIqJIHY&t=488
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=970
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=2164
  - CARD https://x.com/PermadeathSMP/status/1255967895185653766
- **Confidence:** CONFIRMED.

### #26 Alkapone
- **Player:** MYM_Alkapone (Mexico), MC **`Leyville`** (confirmed by "¡Permadeath! Leyville ha muerto"). His "vecina" (neighbour) was Nia.
- **When:** Day 38, 02/05/2020 04:07:22 UTC (06:07 CEST; 23:07 on 01/05 in Mexico). Shadoune was the only other person live.
- **Cause:** Fall damage ("Leyville fell from a high place"): an elytra dive onto an End City island. CARD: "Caída"; custom line "MYM: Malo Y Muerto".
- **Circumstances:**
  1. Earlier, in the same End City, two of his totems popped (rolls 44 and 0 != 99, "Postmortal"). WIKI-B says a ghast fireball and then an enderman; his words: "nos rompieron dos tótems que eran los que tenía".
  2. In chat, Nia wrote "Me tienes al otro lado de la pantalla SUDANDO". Shadoune wrote "Porfa cambia de estrategia XD… Si usas elytra, pon toda la armadura".
  3. He flew off, then came back. Seen on Shadoune's second monitor: Netherite helmet, leggings and boots plus elytra, Regeneration II 0:09, Invisibility 7:49, inventory open. Then a steep dive at the End City island.
  4. Last words: "Vecina, me voy a morir, vecina… no está aterrizando el agua". Nia typed "Vuelve a casa T_T"; Shadoune typed "LA VECINA".
  5. After death: "…por andar enfocado en ese [shulker] de abajo… caer en el agua y ya llegar invisible… la caída dura".
- **Consequences:** Shadoune fetched his head and read his testament (Twitch clip "Testamento Alka"). RUBIK-DOC: "Se muere de la peor manera posible".
- **Sources:**
  - His final episode https://www.youtube.com/watch?v=o00Sjz3Qc2E&t=1117
  - Shadoune's Twitch https://clips.twitch.tv/AgileStylishWoodcockRlyTho
  - Shem https://www.youtube.com/watch?v=cwchR013vcQ
  - Folagor https://www.youtube.com/watch?v=w72BaIqJIHY&t=640
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1004
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=2179
  - CARD https://x.com/PermadeathSMP/status/1256578584573104128
- **Confidence:** CONFIRMED for time, cause and username.
- **Open, don't animate as fact:**
  - That he took off his armour during the dive (RUBIK-DOC and WIKI-B). It fits "llegar invisible", but the armour was still on seconds earlier.
  - Whether there was water below him, and the dive height.

### #27 LakshartNia (Nia)
- **Player:** Lakshart Nia (MC `Lakshart`). She owned a cat for every dead player and had tutored AKA and Ander.
- **When:** Day 38, 02/05/2020 18:22:00 UTC (20:22 CEST), live.
- **Cause:** Ender Ghast (CARD, and chat "Lakshart ha explotado por Ender Ghast"). End City. Custom line: "Dice nyasu pero no tiene 7 vidas".
- **Circumstances:**
  1. She had entered the End with Luh. Moderator KernelCraft wrote in chat "no está permitido explorar con miembros que no sean de su equipo ^^", and they split up (Luh: "Por favor, Nia, no mueras").
  2. She needed only a shulker for the advancement "Sin piedad" (kill every hostile mob type). She lit TNT under one and got it: "Lakshart ha completado el desafío [Sin piedad]".
  3. The TNT had damaged an enderman, which went for her. The totem popped (roll 32 != 99), which removed her invisibility (she was without armour).
  4. She placed water and tried to dig down. A ghast spawned right in front of her (Rubik: where her pearl landed) and its fireball killed her.
- **Quotes:** "Sin piedad… sin piedad" (her Ep.7 at 20:53); "picar para abajo cuando me ha saltado el tótem, pero tenía [un ghast] delante" (21:43).
- **Consequences:** "¡Comienza el Death Train con duración de 14 horas!" Kakytron typed "NIAAAAAAAAAA"; Luh: "voy a por tu cabeza". This left 11 players, the end of the biggest wave of deaths (14 deaths or bans between days 30 and 38).
- **Sources:**
  - Her episode https://www.youtube.com/watch?v=fTgTzEPzK7Q&t=1250
  - Kakytron's stream https://clips.twitch.tv/DrabAgilePizzaTheRinger
  - Shem https://www.youtube.com/watch?v=JErUehJE7Bg
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=740
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=2229
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1068
  - CARD https://x.com/PermadeathSMP/status/1256690597085274114
- **Confidence:** CONFIRMED.
- **Resolved:** WIKI-A's player page says "Golpeada por Enderman…". The enderman popped the totem; the ghast made the kill.
- **Open:** Back-to-back advancements suggest Luh may have been at or near the same End City despite the split.

### R2. Kakytron, first death (revived; not counted)
- **Player:** Kakytron (MC `Kakytron`), team with EsVandal and RanguGamer.
- **When:** Day 40, 04/05/2020, right after the day-40 update (which added Supernova Cats). Time unknown; no card.
  - The changes were live by about 16:06–17:48 UTC.
  - @PermadeathSMP asked "¿Aún no ha muerto nadie?" at 19:09 UTC (https://x.com/PermadeathSMP/status/1257387006558076929), so the death was not counted.
- **Cause:** Fall damage caused by a plugin/script error. Overworld.
- **Circumstances (his own words):**
  1. To be safe from Supernova Cat explosions at the moment of the update, he built an obsidian bunker at the top of a very tall tower ("arriba del todo… una torre de obsidiana… me encerré allí rollo búnker").
  2. When he connected after the update, the block under him disappeared because of a script fault, and he fell to his death.
  3. He was not live or recording (RUBIK-DOC).
- **Consequences:** Rich and KernelFreeze confirmed it was the plugin's fault and revived him. On 05/05 he drew the fall in Paint on stream (a tall tower with a purple box on top, a fall line and a red splat at the base) and recovered his own "Cabeza de Kakytron" from a chest with EsVandal. The head proves it was a real in-game death.
- **Sources:**
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=1382
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=2620
  - Twitch https://clips.twitch.tv/MoldyEnergeticWoodcockArsonNoSexy (Paint drawing) and https://clips.twitch.tv/GenerousSlickStingrayMikeHogu (the head)
  - WIKI-B "Caída" page.
- **Confidence:** Mechanism CONFIRMED (his words, the doc, the wiki, the head). The date is effectively single-source; the time is unknown.
- **Open:** Height, and whether a totem was involved. His explanation video https://www.youtube.com/watch?v=vz_PlypyvBc could not be checked (blocked).

### #28 Hardyluski
- **Player:** Hardyluski (MC `Hardyluski`, rank `[MIEMBRO]`), Mikecrack's teammate.
- **When:** Day 44, 08/05/2020 14:10:12 UTC (16:10 CEST), live. His own Twitch clip "llegó la hora" was created at 14:10:31 UTC.
- **Cause:** A Supernova Cat explosion while flying with elytra. Overworld. Chat: "Hardyluski ha explotado por Gato"; custom line "Más bien EZylusky".
- **Circumstances (clip frames):**
  1. Night and rain. He is flying over savanna, then desert, then beach, searching for the portal to The Beginning.
  2. The red chat warning "Un gato supernova va a explotar en -2714, 67, -2915" is already on screen.
  3. He switches from a trident to rockets and climbs from about (-2977, 145, -2871) to (-2835, 251, -2651), with a totem in his off-hand and full health.
  4. About 12.5 s in, roughly 290 blocks horizontally from the announced point, he dies instantly.
  5. Chat: "Hardyluski ha consumido dos tótem. (Probabilidad: 97 >= 97)". That is the 3% failure, and it still consumed two totems.
- **Quotes:** Hardy: "Oh, ese sí que es mío". A second voice, probably Luh (his new day-40 "compañero"): "No, Hardy, ¿qué ha pasado? Te ha matado el gato".
- **Consequences:** Players stopped flying in the open (RUBIK-DOC).
- **Sources:**
  - Twitch https://clips.twitch.tv/TangentialCourageousEggnogRuleFive
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1096
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=2871
  - Pabl0WL https://www.youtube.com/watch?v=iCMUz5x4HAE
  - Shem https://www.youtube.com/watch?v=K1Hh8JZSTIE
  - CARD https://x.com/PermadeathSMP/status/1258791419306741762
- **Confidence:** CONFIRMED.
- **Open:** Who the second voice is. The cat itself isn't seen.

### #29–#30 Th3Antonio and CooLifeGame (AFK bans, not deaths)
- **When:** 14/05/2020 00:00:00 UTC, day 50.
- **CARDs:** https://x.com/PermadeathSMP/status/1260721661344731137 and https://x.com/PermadeathSMP/status/1260721722996731905
- **What happened** (RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=2979):
  - Antonio agreed to it because he was starting the LoL Solo Q Challenge.
  - CooLifeGame ("Jaky") disputed his ban: he said he had logged in 3 days earlier. The admins applied the "anti-sedentary" rule.
- No Death Train.

### #31 BriiHD
- **Player:** Brian / BriiHD (MC `ElBrean`). His teammates Felipez and AlexElCapo were gone, so he had played alone since day 10.
- **When:** Day 50, 14/05/2020 07:59:25 UTC (09:59 CEST), off-stream, the day the portal to The Beginning was due to be used.
- **Cause:** Demonic Ghast. Nether, at his zombie-pigman gold farm. Chat: "ElBrean was blown up by Ghast Demoníaco"; CARD: "Ghast Demoníaco".
- **Circumstances (his own 28-second recording):**
  1. He is on top of a large netherrack spawning platform full of diamond-armoured pigmen, looking down the kill shaft.
  2. His off-hand slot is locked (red X), because he had no End Relic, so no totem could be held there. He holds a bow, with full armour and 10 hearts.
  3. On-screen sound subtitles show "Ghast cries" and "Ghast shoots", then one hit kills him.
- **His words (2026):** "había una carpet que no puse… me spawneó un Ghast que no hizo ruido… me dio del tirón".
- **Consequences:** 7 players left.
- **Sources:**
  - His recording https://www.youtube.com/watch?v=L2DEZUisYKQ (description "Gracias Rich.")
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=902
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=3117
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1173
  - CARD https://x.com/PermadeathSMP/status/1260912991823974400
- **Confidence:** CONFIRMED.
- **Minor contradiction:** He says the ghast made no noise, but the on-screen subtitles show ghast sounds.

### #32 ElRichMC
- **Player:** ElRichMC (MC `ElRichMC`, rank `[ADMIN]`), the organiser, playing with KillerCreeper55 as his day-40 "compañero".
- **When:** Day 56, Wednesday 20/05/2020 19:23:55 UTC (21:23 CEST), live on Twitch.
- **Cause:** "[ADMIN] ElRichMC fell out of the world" (the void) in **The Beginning**, the custom dimension opened on day 50. It happened under a purpur/end-stone structure they were looting (WIKI-B calls it a "Zeppelin"). CARD: "Caer al vacío"; custom line "Eso no ha sido muy ey ey ey de tu parte".
- **Circumstances (Rich's and Killer's POV clips):**
  1. Rich and Killer (in purple armour) were in a purpur room with ladders, an ender chest and a shulker box of Slow Falling potions, swapping and sorting items. Killer offered him something.
  2. As a prank Rich said "Mira, ¿sabes qué? Prefiero suicidarme. Adiós, Killer. Ha estado muy bien conocerte", broke a floor block and dropped through into the void. He meant to save himself with the elytra and drank Slow Falling only after jumping, so it would look real.
  3. He selected fireworks, opened his inventory, took off his Infernal Netherite chestplate to free the chest slot and hovered over his "Panic Potion".
  4. **The elytra were in the top row of his inventory, 2nd slot, and he never put them on.** He panicked ("No, me muero, me muero, me muero…").
  5. He died about 8–9 s after the jump, with the Medalla del Superviviente in his off-hand. Totems don't work in the void.
- **Consequences:**
  - "¡Comienza el Death Train con duración de 6 horas!"
  - A quirk seen in multi-POV footage: each client's "¡Permadeath!" title showed that client's own name.
  - Some players wanted him revived; he refused: "esto es un error mío".
  - Fans debated whether it was staged; Rubik and Rich say it wasn't.
- **Sources:**
  - Rich's POV https://clips.twitch.tv/GeniusPerfectPoultryFrankerZ (jump 0:34, death 0:43)
  - Killer's POV https://clips.twitch.tv/RelentlessDependableBibimbapTooSpicy
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1204
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=3750
  - Rich explains https://www.youtube.com/watch?v=ngmHLcxbNPk&t=74 ("las tenía arriba, pues no las he visto… es mi culpa")
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=1180
  - Multi-POV https://www.youtube.com/watch?v=p7SdaB-a9Ls and https://www.youtube.com/watch?v=m_5s5wBMvHc
  - CARD https://x.com/PermadeathSMP/status/1263209896159383552
- **Confidence:** CONFIRMED.
- **Open:** What Killer offered him. Whether the Death Train pushed Killer out of The Beginning: Killer's view is back in the Overworld at night about 6 s later; that is an inference.
- Two clips titled as Rich's death (created 20/04 and 20/05 at 16:09 UTC) predate the real death, so they show something else. Don't use them.

### #33 EsVandal
- **Player:** EsVandal (MC `EsVandal`), team with Kakytron and RanguGamer.
- **When:** Day 59, 23/05/2020 22:58:41 UTC (00:58 CEST on 24/05; he remembers "a la 1 de la mañana"), live.
- **Cause:** Wither Skeleton Emperador (a gold-armoured wither skeleton with a Power 100 bow; 1 in 50 fortress wither skeletons). Nether fortress, on a nether-brick walkway over lava. Chat: "EsVandal ha muerto por un flechazo de Esqueleto Wither"; custom line "Has sido promocionado al rango boomer".
- **Circumstances:**
  1. He was hunting Emperors for their 50% Netherite-sword drop, bow selected and totem in the off-hand. Just before, he was chatting: "Acabo de ver en la RAE que se acepta demoníaco con tilde o sin tilde".
  2. One arrow popped his totem, with lava glow filling the screen.
  3. He switched to a dark oak log (probably to block) and then a golden apple.
  4. A second arrow killed him about 2 s later. Rubik says he didn't place blocks behind him and tried to run for a safe spot.
- **Quote (2026):** "me pilló como si me atropellara un camión… me mató de un segundo hit… por avaricia".
- **Sources:**
  - Twitch https://clips.twitch.tv/DirtySmoggySquirrelPunchTrees, https://clips.twitch.tv/AmazingFrigidSoybeanPoooound, https://clips.twitch.tv/SpineyThankfulBaguetteBabyRage
  - Shem https://www.youtube.com/watch?v=F60hAh4gadA
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1270
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=3908
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=1311
  - CARD https://x.com/PermadeathSMP/status/1264334359663980544
- **Confidence:** CONFIRMED for time, place and cause.
- **Open:** The shooter isn't distinguishable in the dark footage; the "Emperor" identification rests on the CARD, the doc, Shadoune and Vandal himself. Whether he touched lava is unknown.

### #34 Kakytron (final death)
- **Player:** Kakytron (MC `Kakytron`).
- **When:** Day 60, 24/05/2020 14:58:18 UTC (16:58 CEST). He was the first to connect after the day-60 changes. Those changes included creepers spawning on almost any block regardless of light (suggested by Mikecrack), faster creeper fuses, the Life Orb within 8 h or losing 8 hearts, and most inventory slots locked until you crafted the "Reliquia del Comienzo".
- **Cause:** Ender Quantum Creeper (a translucent, teleporting charged creeper). Overworld, at his own base. Vanilla: "Kakytron was blown up by Ender Quantum Creeper"; custom line "Ahora por fin descansa en paz…".
- **Circumstances (Rich's spectator POV):**
  1. He couldn't craft the new items; he was missing end stone for the Life Orb and had no free slots.
  2. His base: a large courtyard of grey stone slabs, a tall bamboo wall around it, and a pale sandstone path to a grey stone house.
  3. In purple armour he walked along the path to his doorway. The creeper, hidden from him by a column, exploded.
- **Quotes:** Rich: "¡Ostras! ¡Ostras! Kaki, Kaki, no, Kaki, no". Kaky in 2026: "Me mató un puñetero creeper… en mi propia casa… primero fue un golpe de realidad, pero después fue alivio".
- **Sources:**
  - Rich's POV https://clips.twitch.tv/DepressedSpookySashimiTBTacoRight
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1303
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=4096
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=1543
  - CARD https://x.com/PermadeathSMP/status/1264573313470398464
- **Confidence:** CONFIRMED.
- **Open:** No footage from Kaky's own view was found. Whether he was carrying the medal.

### #35 CrisGreen
- **Player:** CrisGreen (Argentina, MC `Crisgreen`), allied with Shadoune666 ("Imperio 31").
- **When:** Day 60, 24/05/2020 15:32:41 UTC (17:32 CEST). He had "just woken up".
- **Cause:** Ender Quantum Creeper inside a Nether portal. CARD: "Ender Quantum Creeper".
- **Circumstances (Rich's and Shadoune's POV clips):**
  1. Cris had no Reliquia del Comienzo, so 25 slots were locked, including the off-hand: he couldn't hold the medal.
  2. He and Shadoune had flooded their base with water as creeper protection. They set out via the Nether to fetch Kaky's dropped items (Kaky had a valuable totem).
  3. The portal room: a narrow corridor with white walls; a gravel floor under water, spawn-proofed with stone pressure plates; a joke sign "código esvandal en la tienda del FORTNITE"; a skull-and-crossbones painting.
  4. Shadoune stepped in first, holding the medal and eating a golden apple ("Okay, yo voy. Suerte."). Cris followed with his shield.
  5. While both were in the portal, a charged creeper tagged "Ender Quantum Creeper" appeared inside it and exploded. Cris died. Shadoune's medal popped and he arrived in the Nether with Regeneration II.
- **Consequences:** "¡Comienza el Death Train con duración de 10 horas!" Shadoune panicked ("No se vale…").
- **Quote (2026):** "estaba recién levantado… se entraba un portal como una persona normal y un creeper spawnea justo atrás y pum".
- **Sources:**
  - Rich's POV https://clips.twitch.tv/CrowdedRelievedAnteaterThisIsSparta
  - Shadoune's POV https://clips.twitch.tv/CorrectThoughtfulKumquatBibleThump
  - Shadoune's final episode https://www.youtube.com/watch?v=q8hq7Ptwalw&t=660
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1327
  - Multi-POV https://www.youtube.com/watch?v=02yEAFKWuKA
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=4267
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=1574
  - CARD https://x.com/PermadeathSMP/status/1264583771531157505
- **Confidence:** CONFIRMED for cause and time.
- **DISPUTED location:** RUBIK-DOC narrates it as reaching Kaky's portal, coming out of the Nether. The footage shows them leaving from the Overworld side, and the floor has water, which is impossible in the Nether. So it was their departure portal, most likely at their own base.

### #36 Shadoune666
- **Player:** Shadoune666 (French streamer playing in Spanish, MC `Shadoune666`), allied with CrisGreen.
- **When:** Day 60, 24/05/2020 15:37:14 UTC (17:37 CEST), about 4.5 minutes after Cris.
- **Cause:** Drowned ("Shadoune666 drowned"). The flooded area of his Overworld base, a few blocks from safety. CARD: "Ahogarse"; custom line "Oui, oui, la baguette est bien mort".
- **Circumstances:**
  1. After Cris died he ran through the Nether tunnels in a panic. Rich, typing as OmniRich, told him to grab the dead players' gear and craft the Life Orb.
  2. He decided to go home without Cris and went back through the portal. Charged creepers were waiting on the other side.
  3. He blocked or was shielded from one blast. Another went off behind him and popped a totem ("Probabilidad: 27 < 93").
  4. He fell into the water. The totem had wiped all his effects, including the conduit's water breathing, and drowning had been made much faster (×5 per the day-50 change list). The conduit didn't reapply in time and he drowned.
- **Quote:** "Ya, Doné, tranquilo, full focus, concéntrate. ¡No, el conduit no funcionó! El conduit no funcionó."
- **Sources:**
  - Rich's POV https://clips.twitch.tv/FuriousAntsyChinchillaThisIsSparta
  - His final episode https://www.youtube.com/watch?v=q8hq7Ptwalw&t=860
  - His tier-list video https://www.youtube.com/watch?v=d4GA6L9IkPY&t=1773
  - His day-60 explainer https://www.youtube.com/watch?v=1fTDJusg2T8&t=51
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1361
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=4343
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=1760
  - CARD https://x.com/PermadeathSMP/status/1264583852988735490
- **Confidence:** CONFIRMED.
- **Open:** His own Twitch clip of the moment returned an error; the frames used are from Rich's view and his edited episode.

### #37 KillerCreeper55
- **Player:** KillerCreeper55 (MC `killercreeper_55`), Rich's long-time friend and day-40 partner.
- **When:** Day 60, 24/05/2020 20:43:39 UTC (22:43 CEST). He had been travelling, and connected late and reluctantly, about 8 minutes before dying (his own estimate: "el stream más corto que hice nunca").
- **Cause:** Ender Quantum Creeper, in the chest hall of his own base. Custom line: "Más conocido como el jugador permabaneado".
- **Circumstances (his Twitch clips, frame by frame):**
  1. He had no Reliquia, so his off-hand was locked and he held the Medalla in his main hand.
  2. He moved between an ice-walled room with a trapdoor ceiling and a long stone-brick hall lined with chests, switching between his purple shield, a golden apple (he ate one) and the medal.
  3. A sparkling charged creeper appeared by a wooden pillar at the end of the hall.
  4. About 0.3 s before the blast he switched from "Medalla de Superviviente" to "Shield". The medal was no longer in hand, so it couldn't save him.
- **Quote:** "Ah, mira, un creeper. Hala. Ah, mira, otro creeper. Bueno, ya está." Afterwards he complained that the changes were impossible.
- **Sources:**
  - Twitch https://clips.twitch.tv/ConsiderateCulturedGaurShadyLulu and https://clips.twitch.tv/SpicySillyLeopardPlanking
  - Shem https://www.youtube.com/watch?v=gmYLUeSqgGE
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1384
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=4576
  - RUBIK-6Y https://www.youtube.com/watch?v=7i83fhYvBZo&t=1650
  - CARD https://x.com/PermadeathSMP/status/1264705266181963777
- **Confidence:** CONFIRMED.
- **Open:** One exploding creeper or two.

### #38 Luh (the last one)
- **Player:** Luh (MC `iLuh`), the last survivor. The only gold death card.
- **When:** Day 60, 24/05/2020 20:50:35 UTC (22:50 CEST), 7 minutes after Killer, live.
- **Cause:** An Ender Quantum Creeper blast followed by drowning. CARD: "Ahogarse"; custom line "HDluh. Código Luh-XD en el cementerio del server".
- **Circumstances:**
  1. His base: a small room over swamp water, with a diamond-block floor covered in stone buttons (spawn-proofing), bookshelves, chests and an enchanting table. Earlier he had used invisibility, elytra, slow falling and water-breathing potions to loot Shadoune's items, including the Reliquia.
  2. At 20:26 UTC he used his first totem of the whole series; Rubik says it was from breaking string by hand, under the new 8-heart rule. He drank another invisibility potion. Rich was in voice with him, advising.
  3. At the moment of death the HUD shows no invisibility icon ("se le acaba la invisibilidad", RUBIK-DOC).
  4. The in-game sound subtitles give the order: "Enderman se teletransporta" (a creeper teleporting in), a creeper hiss, "Bloqueo con escudo", "Explosión", "Leve impacto contra el suelo", "Salpicadura / Nadando" (night, storm rain, seagrass), "Tótem activado", "Jugador muere".
  5. So the blast knocked him out of the base into the water, a totem popped (clearing his effects), and he drowned seconds later.
- **Reaction:** He laughed ("me parto"). To Rich: "Muchas gracias por el código. Ha sido un placer, Rich." 10 minutes later the official account posted "¡ENHORABUENA, HABÉIS PERDIDO!".
- **Sources:**
  - Twitch "[Permadeath] Luh drowned" https://clips.twitch.tv/BreakableTacitChowderKappaPride
  - First totem https://clips.twitch.tv/ObliviousPlainClipsdadKevinTurtle
  - His final episode https://www.youtube.com/watch?v=V1tf8Y9NuVg&t=2130 (death about 35:40–35:57, not precisely pinned)
  - Shadoune https://www.youtube.com/watch?v=d4GA6L9IkPY&t=1975 and https://www.youtube.com/watch?v=1fTDJusg2T8&t=51
  - Multi-POV https://www.youtube.com/watch?v=VM3wGy73K7M
  - GERSOON https://www.youtube.com/watch?v=vYTcFdeAxE0&t=1416
  - RUBIK-DOC https://www.youtube.com/watch?v=QhHMTOs40mo&t=4637
  - CARD https://x.com/PermadeathSMP/status/1264705449246547969
- **Confidence:** CONFIRMED.
- **Resolved:** The CARD's "ahogarse" and the doc's "creeper" are both right, in sequence.

### 39. Epilogue: "OmniRich" (ElRichMC's admin account), not a participant death
- **Who:** `[ADMIN] OmniRich` was ElRichMC's admin/"ghost" account (from day 57 he appeared as a spectator "ghost"; Kaky's clip "OMNIRICH??" is from 21/05). Per WIKI-B (unverified), the character comes from his older series RageCraft II.
- **When:** 24/05/2020 at about 21:05:42 UTC (23:05 CEST), about 15 minutes after Luh. Evidence:
  - The Twitch clip "[Permadeath] OmniRich was slain by Vex" was created at 21:06:04 UTC.
  - Screenshot filenames 22.58.37 and 22.58.47 (Spain time) appear in chat just before.
  - The Life Orb countdown agrees.
  - **WIKI-A/B's "5/06/2020 14:30:20" has no support.**
- **Cause:** "[ADMIN] OmniRich was slain by Vex", then "Ahora por fin descansa en paz…" and a ban.
- **Circumstances:**
  1. After the event was lost, Rich switched the account to Survival by command, to show "cómo había que jugarlo".
  2. He removed blindness, cleared the weather and gave himself 128 golden carrots, a milk bucket and Slow Falling. The HUD shows about 2 hearts and no armour.
  3. He walked a Nether ice highway with a shield up (a sign "Aldea de Crisgreen" is passed).
  4. He came out of a portal onto a large white-tiled platform in the Overworld in daylight.
  5. A Vex dived from the sky and killed him within about 2 s.
- **Quote:** "Ahí lo que habría que haber hecho es ir volando… o con invisibilidad."
- **Sources:**
  - Twitch https://clips.twitch.tv/AdventurousFurtiveLeopardLeeroyJenkins
  - Shem https://www.youtube.com/watch?v=fD_eMUi4axs&t=160 (death about 2:53)
  - Pollo XD https://www.youtube.com/watch?v=3M61zZRgG2c&t=150
  - WIKI-B OmniRich page (wrong date and story)
- **Confidence:** CONFIRMED that it happened, and when.
- **UNVERIFIED:** WIKI-B's story (his villagers turned into Vindicators summoning Vexes) is a fan addition. Frame it as a post-game stunt, not a 39th player.

---

## 3. Contradictions (source vs source)
1. **ElRichMC date:** WIKI-A's list says 15/05/2020; its own table and the CARD say 20/05/2020 19:23:55 UTC (Day 56). **15/05 is a typo.**
2. **EsVandal date:** WIKI-A's list says 16/05; CARD says 23/05/2020 22:58:41 UTC (Day 59). **16/05 is a typo.**
3. **OmniRich date and story:** the wikis say 5/06/2020 14:30, villagers turned Vindicators. Footage and clip timestamps say 24/05/2020 about 21:05 UTC, killed by a Vex right out of a portal.
4. **FrigoAdri's killer:** WIKI-B's Permadeath Demon infobox says the Demon. CARD and footage say an Ender Creeper before the fight began. It is also disputed whose totem popped at the same instant (Mikecrack per Frigo's call vs CrisGreen per RUBIK-DOC). Alkapone's "Frigo's totem popped first" theory is contradicted by the frames.
5. **LakshartNia's killer:** WIKI-A's player page says "Golpeada por Enderman…" and WIKI-B's text stresses the enderman. CARD and chat say Ender Ghast. Resolved: the enderman popped the totem; the ghast killed her.
6. **MrCarlosNoob's final death:** RUBIK-DOC says "araña de cueva"; CARD says "caída escapando de una araña de cueva". Resolved: same event (pearl fall damage while fleeing).
7. **MrCarlosNoob's first death:** WIKI-B says "revivido"; Nia and Folagor say it was a server **rollback** of about 11 h. Time: about 01:00 CEST (Nia) vs about 02:00 CEST (Folagor).
8. **Luh:** CARD says drowned; RUBIK-DOC says a creeper killed him. Resolved: blast into water, totem, drowning.
9. **CrisGreen's location:** RUBIK-DOC says he died at Kaky's portal coming from the Nether. Footage shows their departure portal on the Overworld side (water on the floor).
10. **Felipez360:** spider effects (WIKI-B: Res III/Regen IV/Str IV; RUBIK-DOC: Res IV/Regen III). Whether his own view was live: BriiHD remembers watching him live "ayudando a Frigo"; Felipe says he was helping Zeling; his VOD ends before the death.
11. **Cecililla:** WIKI-B's "skeleton shot the creeper / lag muted the fuse" theory is not supported by her footage (the creeper is never seen).
12. **AKAWonder:** WIKI-B says he didn't know about the potion delay and went for blaze rods. Footage: the drink was interrupted, and he had come for quartz/XP to repair his pickaxe.
13. **Kaumaru's location:** "multiple dungeon" (WIKI-B) vs "two spawners under his house" (WIKI-A); effect levels unknown.
14. **Ibai:** WIKI-B implies open terrain and a panicked reaction; footage shows a mineshaft and a 0.5 s encounter.
15. **Paracetamor:** "world-generation error" (WIKI-B) vs "vanilla ender pearl/gateway bug" (her own account and RUBIK-DOC).
16. **Tonacho's day:** RUBIK-6Y's narration says "llegó al día 50"; CARD and every other source say Day 26.
17. **Alkapone:** "took off armour before landing" (RUBIK-DOC, WIKI-B) vs armour still on seconds before the dive (Shadoune's second-monitor view). Unresolved.
18. **BriiHD:** "a Ghast que no hizo ruido" (his memory) vs on-screen sound subtitles showing ghast cries and shots.
19. **Gona89:** his 2026 memory that someone died "in front of him" 5–10 minutes earlier; no death fits.
20. **Times:** the wikis and RUBIK-DOC present the card times as local ("Kaky a las 3, Shadoune a las 3:30, Killer a las 8 de la tarde"). They are UTC; Spain was 2 hours later.
21. **Day numbers for late-night deaths** (Ander 18 vs 19, Mikecrack 35 vs 36 by the Spanish calendar, EsVandal 59 vs 60): the server/UTC day is used here.

## 4. Unconfirmed or single-source (do NOT animate these details as fact)
- **No footage exists** for Kaumaru (#4), OutConsumer (#16), Paracetamor (#20) or Kakytron's first death (R2). Each rests on the player's own spoken account (plus the CARD, or for R2 the doc, the wiki and his recovered head). Location look, gear and mob count are unknown beyond what they said.
- **Kaumaru:** exact location (under his house vs a dungeon), spider effect levels, whether anyone was present.
- **Kakytron's first death:** exact time, tower height, whether a totem was involved.
- **MrCarlosNoob's first death:** exact time; pillar material and location; rollback length.
- **Felipez360:** the totem pop before death; the spider's effects; any Bane of Arthropods sword.
- **Ibai:** his own words (no captions available).
- **Mikecrack:** armour/invisibility state at the moment of death; Hardy fetching his head and losing a totem (WIKI-B only).
- **Alkapone:** removing his armour mid-dive; water below him; dive height.
- **LakshartNia:** whether Luh was physically nearby.
- **Zeling:** Antonio losing her head in lava afterwards (WIKI-B only). Also, which of Antonio's lines are his (inferred from the call).
- **Tonacho:** "combo flecha" (arrows involved?).
- **EsVandal:** the shooter isn't visible; "Emperor" rests on the CARD and testimony. Contact with lava unknown.
- **ElRichMC:** what Killer offered; whether the Death Train teleported Killer out of The Beginning.
- **Kakytron (final):** his own view; whether he carried the medal.
- **KillerCreeper55:** one or two exploding creepers.
- **Luh:** exact timestamps inside his final-episode VOD.
- **OmniRich:** WIKI-B's villager/Vindicator story; exact place.
- **LiliCross:** the reason for leaving (nurse during COVID) is WIKI-B only (and it is a ban, not a death).
- **Paracetamor's head retrieval** by Rich in Ep15 "MISIÓN IMPOSIBLE EN EL VACÍO": not verified.
- **Death Train durations** are known only where chat showed them: Kaumaru 11 h, Ibai 12 h, Carlos R1 20 h, Frigo 6 h, Gona 10 h, Nia 14 h, Rich 6 h, Cris 10 h. All others are unknown; don't invent them.
- **"#PermadeathSpinoff"** (Rich solo vs all changes): announced 31/05/2020, but no evidence it was ever played.
