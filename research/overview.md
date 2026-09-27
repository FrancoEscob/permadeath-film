# Permadeath (ElRichMC): research overview

Compiled 2026-09-26. Every claim has at least one URL. **(1 fuente)** marks claims backed by a single source.

## How to read this / source hierarchy

- **Tier 1 (primary, official):** tweets from the official account **@PermadeathSMP** (now renamed "Permadeath 2 SMP") and from @ElRichMC. Their text was fetched through the fxtwitter mirror API (`https://api.fxtwitter.com/PermadeathSMP/status/<id>`). The images (change announcements, death cards) were downloaded and read one by one. I found the tweet IDs through the Wayback Machine CDX index (`https://web.archive.org/cdx/search/cdx?url=twitter.com/PermadeathSMP/status/*`), which lists 128 archived tweets. A full JSON dump is at `research/evidence/overview/permadeathsmp_tweets_2020-2021.json`.
- **Tier 1b (primary, in-game footage):** in-game frames that I extracted and read myself: death titles "¡Permadeath! <nick> ha muerto", the day-30 tab list, and chat/whitelist messages. They come from:
  - ElRichMC, *Permadeath Ep1* — https://www.youtube.com/watch?v=aZSX5ik0Z6o
  - Rubik (a participant), *La Historia Completa de Permadeath*, uploaded 2026-05-20. It compiles clips from many players' POVs and includes interviews with players — https://www.youtube.com/watch?v=QhHMTOs40mo
  - The frames are saved in `research/evidence/overview/ingame_frames/`.
- **Tier 2 (secondary):** Rubik's narration and interviews (participant, 2026); TwitchTracker stream logs for ElRichMC's channel (https://twitchtracker.com/elrichmc/streams).
- **Tier 3 (fan-made, lower trust):** the two Fandom wikis, https://permadeath-wiki.fandom.com/es/wiki/Permadeath and https://permadeath.fandom.com/es/wiki/Permadeath_Wiki. Both contain errors (listed under Contradictions).

**Day numbering:** Day 0 = 25 Mar 2020, so Day N = 25 Mar + N days (for example, 24 May 2020 = Día 60).
- ElRichMC's Ep1 is titled "[DÍA 0/110]": https://www.youtube.com/watch?v=aZSX5ik0Z6o
- The final tweet says "60 días": https://x.com/PermadeathSMP/status/1264662676002742275

**Time zone:** death-card times are labelled "UTC". They line up with tweet timestamps (which are always UTC). For example, Kakytron died 14:58:18, and his card was tweeted at 15:05 UTC, after the day-60 changes were posted at 14:36 UTC. So I treat card times as UTC. Spanish local time was UTC+1 until 29 Mar 2020 and UTC+2 after that.

---

## 1. Editions

### 1.1 Permadeath (1st and only edition) — "PermadeathSMP"

| Field | Value | Sources |
|---|---|---|
| Announced | 2 Mar 2020: "PERMADEATH comenzará este marzo" | https://x.com/PermadeathSMP/status/1234271612314279937 |
| Planned length | "PERMADEATH será un proyecto que durará 110 días exactos" (15 Mar 2020) | https://x.com/PermadeathSMP/status/1239194801871994880 ; fan wiki https://permadeath-wiki.fandom.com/es/wiki/Permadeath |
| Start | 25 Mar 2020 at 18:00 Spanish time (CET, which is 17:00 UTC) | https://x.com/PermadeathSMP/status/1242541261321576449 ; https://x.com/PermadeathSMP/status/1242603675601821702 ; ElRichMC's Twitch stream "LA GRAN INAUGURACIÓN DE PERMADEATH" started 2020-03-25 16:54 on TwitchTracker, https://twitchtracker.com/elrichmc/streams |
| End | 24 May 2020 (Día 60). Last death: Luh, 20:50:35 UTC | Death card #38 https://x.com/PermadeathSMP/status/1264705449246547969 ; final tweet https://x.com/PermadeathSMP/status/1264662676002742275 |
| How it ended | **All 38 players dead or banned**, at day 60 of the planned 110. Official tweet (24 May 2020 21:00 UTC): "¡ENHORABUENA, HABÉIS PERDIDO! Habéis tardado un total de 60 días en perder. 38 jugadores asesinados." The account bio still reads "60/110 días sobrevividos. Todos los jugadores han muerto." There was **no winner by the rules**, because surviving 110 days was required. Fans and the fan wiki call Luh the "winner" / "último permaviviente" because he was the last to die. | https://x.com/PermadeathSMP/status/1264662676002742275 ; bio via https://api.fxtwitter.com/PermadeathSMP/status/1246200654516887558 ; https://permadeath-wiki.fandom.com/es/wiki/Permadeath ; Rubik 1:18:00–1:19:30 https://www.youtube.com/watch?v=QhHMTOs40mo&t=4680s |
| Minecraft version | **Java 1.15.2** (F3 screens in clips show "Minecraft 1.15.2 (1.15.2-OptiFine_HD_U_G1_pre13/vanilla)") | Fan wiki https://permadeath-wiki.fandom.com/es/wiki/Permadeath ; frames from Rubik's video at 28:22 (Gona89) and 36:26 (Cibergun), https://www.youtube.com/watch?v=QhHMTOs40mo&t=1702s |
| Mode | Hard / hardcore style. Death means a permanent ban ("permabaneado"). | https://x.com/PermadeathSMP/status/1242603675601821702 ; fan wiki |
| Organizer / tech | Created by ElRichMC. The fan wiki says it was "hosteado por KernelFreeze". In-game, the server moderator account shown as "[MOD] Kernelcraft" whitelisted everyone on day 0. That Kernelcraft = KernelFreeze is **not confirmed**. The Bedrock fan add-on credits "ElRichMC y Kernel Freeze" as creators of the original series. | https://permadeath-wiki.fandom.com/es/wiki/Permadeath ; ElRichMC Ep1 ~6:20 https://www.youtube.com/watch?v=aZSX5ik0Z6o&t=380s ; https://github.com/HaJuegos/Permadeath-SMP-Addon (Creditos.txt) |
| In-game days survived | 60 of 110 | final tweet above |
| Participants | 38 | final tweet above ; Rubik 0:19 |

### 1.2 Permadeath 2 — announced, **never produced** (as of 2026-09-26)

- **31 May 2020:** "2021 suena como un buen año para matar a más jugadores. #Permadeath2" with a "Permadeath 2" logo.
  - https://x.com/PermadeathSMP/status/1267162955910709249
  - ElRichMC announced it on stream. The Shem video says it was during his "Nano E3" (1 fuente for that detail): https://www.youtube.com/watch?v=dMuAa_pEs1o
  - The fan account says "Permadeath 2: 2021 ¿Minecraft 1.17?": https://x.com/ElRichMCFandom/status/1267236936172933123
- **31 May 2020:** a spin-off was also teased: "¿ElRichMC vs Permadeath Demon? … #PermadeathSpinoff". I found no evidence it was released (no YouTube video on ElRichMC's channel; no Twitch stream titled that on TwitchTracker).
  - https://x.com/PermadeathSMP/status/1267163545084530689
  - https://twitchtracker.com/elrichmc/streams
- **6 Sep 2020:** ElRichMC: "Vais a flipar con Permadeath 2 xD". https://x.com/ElRichMC/status/1302581583787036672
- **25 Mar 2021:** first-anniversary banner "para el futuro #Permadeath2SMP". https://x.com/PermadeathSMP/status/1375155766672384000
- **31 May 2021:** official statement image. Mojang's incomplete Caves & Cliffs release "obliga a aplazar Permadeath 2 a 2022"; the server would use 1.18, with "Wardens merodeando por la superficie desde el primer día".
  - https://x.com/PermadeathSMP/status/1399381883276890117
  - Image saved at `evidence/overview/permadeath2_update_2021-05-31.jpg`
- **24 Nov 2022:** ElRichMC thread "Un hilo sobre mis proyectos como Permadeath 2". It is about funding: thinking about a Kickstarter, and how hard it is to get money for creative projects. Only the first tweet was retrievable: https://x.com/ElRichMC/status/1595905696259883009
  - Later tweets in the thread, as quoted by a web-search snippet (**1 fuente, not read directly**): a team of 4 programmers, 3 mapmakers, 1 artist, 2 animators, 1 composer and 1 admin for 2 years; don't expect Permadeath 2 / UHC España until funding is solved.
  - Rubik's 2026 video independently summarises the thread as "grandísima financiación y tiempo de trabajo, por lo menos 2 años… aplazado indefinidamente": https://www.youtube.com/watch?v=QhHMTOs40mo&t=4740s
- **25 Mar 2024:** "Hoy se cumplen 4 años de Permadeath. Permadeath 2 es un proyecto extremadamente ambicioso, lejos de estar cancelado, hasta que se disponga de la financiación necesaria no se podrá producir el proyecto." https://x.com/PermadeathSMP/status/1772352321004896291
- **Status now:** not released, not officially cancelled. I found no official 2025/2026 update.
  - A search-engine summary claimed "Permadeath 2 would not arrive before 2028". **I could not find any source for this; treat it as unverified.**

**Conclusion:** only ONE Permadeath edition was ever played. No reboot or second season exists.

---

## 2. Participants (38)

### 2.1 Official announcement rounds (tweets with name images)

| Round | Date (UTC) | Twitter handles tagged / names in image | Tweet |
|---|---|---|---|
| 1 | 15 Mar 20:30 | @paracetamor, @Outconsumer, @GamerMaldito, @Felipez360, @CooLifeGame. Image: Felipez360, Paracetamor, CoolLifeGame, Outconsumer, TheGamerMaldito | https://x.com/PermadeathSMP/status/1239287925122248704 |
| 2 | 17 Mar 22:12 | @tonacho, @LiliCross_, @GonaInLive, @BriiHD, @Kaumaru102. Image: Tonacho, LiliCross, BriiHD, Gona89, Kaumaru | https://x.com/PermadeathSMP/status/1240038430295445509 |
| 3 | 20 Mar 15:22 | @FrigoAdri, @RogerGCX, @AKA_Wonder, @LakshartNia, @Shadoune666. Image: FrigoAdri, **Cibergun** (= @RogerGCX), AKAWonder, LakshartNia, Shadoune666 | https://x.com/PermadeathSMP/status/1241022427573948419 |
| 4 | 22 Mar 21:34 | @Alvaro845, @Hardyluski, @CecilillaJuega, @CrisGreen95, @RubikYT_. Image: Alvaro845, Crisgreen, Hardyluski, Cecililla, Rubik | https://x.com/PermadeathSMP/status/1241840691216625670 |
| 5 | 24 Mar 19:26 | @MikecrackYT, @ElRichMC, @alkapone, @EvilAFM, @FolagoR. Image: "Mickecrack" (sic), ElRichMC, **AlexElCapo** (= @EvilAFM), MYM Alkapone, Folagor | https://x.com/PermadeathSMP/status/1242533339694804993 |
| 6 | 24 Mar 21:19 | @kakytronco, @KillerCreeper55, @RanguGamer, @Th3AntonioGG, @ZeIing, @HDluh, @EsVandal. Image: Kakytron, KillerCreeper55, Luh, Rangu, Th3Antonio, ZeIing, EsVandal | https://x.com/PermadeathSMP/status/1242561720801001474 |
| 7 (last) | 24 Mar 21:43 | "LA G2 SQUAD": @IbaiLlanos, @G2Reven, @G2Ander, @G2BarbeQ. Image: G2Ibai, G2Reven, G2Ander, G2BarbeQ | https://x.com/PermadeathSMP/status/1242567735000924167 |
| extra | 25 Mar 00:06 | "Se nos ha olvidado anunciar a @Perxitaa y su fiel Invitado+" | https://x.com/PermadeathSMP/status/1242603675601821702 |

Rounds 1–7 total 36 names, plus Perxitaa makes 37. The 38th official death is **MrCarlosNoob**, who appears in no round. By elimination, he is probably Perxitaa's "Invitado+". **This is my inference and is not confirmed.**

**Start vs later:** all 38 were on the whitelist from day 0.
- ElRichMC's Ep1 shows "[MOD] Kernelcraft: Added … to the whitelist" for many players, then "Whitelist is now turned on" (~6:15–6:30): https://www.youtube.com/watch?v=aZSX5ik0Z6o&t=375s
- The G2 squad (Ibai, Reven, Ander, BarbeQ) was whitelisted on day 0 but barely played until about day 11 (Rubik 6:00–7:30): https://www.youtube.com/watch?v=QhHMTOs40mo&t=420s
- **No player joined late.** Two players were **revived** after deaths judged to be bugs:
  - MrCarlosNoob, early. Rubik: "Carlos Noob moría por segunda vez"; the fan wiki trivia also says he was revived.
  - Kakytron, on day 40. His fall was caused by the plugin script removing a block; Rubik includes Kakytron's own interview.
  - Sources: https://www.youtube.com/watch?v=QhHMTOs40mo&t=2640s ; https://permadeath-wiki.fandom.com/es/wiki/Permadeath (Trivia)
- The fan wiki also lists "OmniRich" as an admin alt who "joined around day 60" and died 5 Jun 2020 to a Vex. This is **fan-wiki only (1 fuente)** and is not part of the official 38. https://permadeath-wiki.fandom.com/es/wiki/OmniRich

### 2.2 Creator → Minecraft in-game username (what the server showed)

Source legend:
- **R** = Rubik video frame (timestamp given), https://www.youtube.com/watch?v=QhHMTOs40mo
- **E1** = ElRichMC Ep1 chat/whitelist frame, https://www.youtube.com/watch?v=aZSX5ik0Z6o
- **TAB** = the day-30 tab list at R 19:56, https://www.youtube.com/watch?v=QhHMTOs40mo&t=1196s
- **Card** = official death card (display name, not necessarily the account name)
- **Mojang** = whether the name resolves today at `https://api.mojang.com/users/profiles/minecraft/<name>`

**Warning for skins:** Mojang can only return the **current** skin of an account. Skins in 2020 may have differed, and accounts may have been renamed or re-registered. The death cards show grayscale 8×8 heads of the 2020 skins.

| # | Creator (YouTube/Twitch) | Twitter tagged | **In-game username (2020)** | Evidence | Mojang today |
|---|---|---|---|---|---|
| 1 | Alvaro845 | @Alvaro845 | **Alvaro845** | R 1:07 death title; E1 chat | exists `Alvaro845` |
| 2 | TheGamerMaldito | @GamerMaldito | **TheGamerMaldito** | R 1:11 chat "TheGamerMaldito ha explotado por Creeper"; E1 chat | exists |
| 3 | Cecililla (Cecililla Juega) | @CecilillaJuega | **Cecililla** | R 1:15 death title; E1 chat | exists |
| 4 | Kaumaru (Kaumaru102) | @Kaumaru102 | **Kaumaru** | E1 27:07 chat "Kaumaru has made the advancement" | exists |
| 5 | Felipez360 | @Felipez360 | **xXmineCr4fterXx** | R 4:20 death title; E1 whitelist | exists |
| 6 | Ibai (Ibai Llanos) | @IbaiLlanos | **DONIBAILLANOS** | R 7:27 death title; E1 whitelist | exists |
| 7 | Reven (G2Reven) | @G2Reven | **ReventXzz** | R 7:31 death title; E1 whitelist | exists |
| 8 | AKAWonder | @AKA_Wonder | **AKAWonder** | R 7:51 death title; E1 chat | exists |
| 9 | Ander (G2Ander) | @G2Ander | **4andeR** | R 8:14 death title; E1 1:40 "4andeR joined the game" | exists `4andeR` |
| 10 | LiliCross | @LiliCross_ | **LiliCross** | E1 29:42 chat | exists |
| 11 | Rubik (RubikYT) | @RubikYT_ | **RubikYT** | R 14:15 death title | exists |
| 12 | Zeling | @ZeIing | **MitisyyLeDivorce** | R 14:43 death title + chat "MitisyyLeDivorce ha sido víctima de Cubo de magma"; 2020 YouTube title "PERMADEATH \| MUERE Zeling (MitisyyLeDivorce)" https://www.youtube.com/watch?v=_Nz5OwFykx8 | **does NOT resolve now** (renamed or deleted; name history not checkable, NameMC/laby blocked) |
| 13 | Tonacho | @tonacho | **tonacho** | R 15:07 death title; E1 chat | exists |
| 14 | Perxitaa | @Perxitaa | **NOT CONFIRMED.** Only the card display name "Perxitaa" | Card #14 | `perxitaa` exists, but its link to the server is unverified |
| 15 | AlexElCapo | @EvilAFM | **EvilAFM** | E1 7:51 and 29:49 chat "EvilAFM has made the advancement" (Twitter @EvilAFM is tagged for the AlexElCapo slot) | not checked |
| 16 | Outconsumer | @Outconsumer | **RealOutconsumer** | E1 6:35 chat | not checked |
| 17 | RanguGamer (Rangu) | @RanguGamer | **RanguGamer** | R 17:48 death title; E1 whitelist | exists |
| 18 | FrigoAdri | @FrigoAdri | **FrigoAdri** | R 22:02 death title; TAB | exists |
| 19 | Folagor (Folagor03) | @FolagoR | **Folagoro** | R 24:20 death title "Folagoro ha muerto"; TAB | exists `Folagoro` |
| 20 | Paracetamor | @paracetamor | **paracetamor** | TAB; E1 7:46 "paracetamor joined the game" | exists |
| 21 | Gona89 (GonaInLive) | @GonaInLive | **Gona89_YT** | R 28:22 death title; TAB; E1 chat | exists `Gona89_YT` |
| 22 | MrCarlosNoob | @mrcarlosnoob | **MrCarlosnoob** | R 29:37 death title; TAB | exists |
| 23 | Mikecrack | @MikecrackYT | **Mikecrack** | TAB; E1 9:43 chat | exists |
| 24 | BarbeQ (G2BarbeQ) | @G2BarbeQ | **NOT CONFIRMED.** Only the card display name "BarbeQ" | Card #24 | `BarbeQ` exists, but its link to the server is unverified |
| 25 | Cibergun | @RogerGCX | **cibergun** | R 36:26 death title; TAB | exists (`Cibergun`) |
| 26 | Alkapone (MYM Alkapone) | @alkapone | **Leyville** | R 37:01 death title "Leyville ha muerto" (the overlay labels the clip "Alkapone"; chat "MYMALKAPONE, MYM: Malo y Muerto"); TAB | exists `Leyville` |
| 27 | Nia (LakshartNia) | @LakshartNia | **Lakshart** | TAB; E1 chat | exists `Lakshart` |
| 28 | Hardyluski | @Hardyluski | **Hardyluski** | TAB; E1 9:43 | exists |
| 29 | Th3Antonio | @Th3AntonioGG | **Th3Antonio** | E1 7:46 chat | exists |
| 30 | CooLifeGame ("Jacky" on Twitch) | @CooLifeGame | **JackyMaster** | TAB (JackyMaster in the [CONTROL] role); Rubik narration: "Cool Life Game o Jackie como se le conoce en Twitch" (R 50:00). The fan wiki lists "JackyMaster" among Permadeath Demon fight totem users. | exists |
| 31 | BriiHD (Bri) | @BriiHD | **ElBrean** | TAB; E1 7:46; Rubik: "Bri o El Bran en Minecraft" (R 39:20) | exists |
| 32 | ElRichMC | @ElRichMC | **ElRichMC** | R 64:09 death title; TAB ([MASTER]) | exists |
| 33 | EsVandal | @EsVandal | **EsVandal** | R 65:56 death title; TAB | exists |
| 34 | Kakytron | @kakytronco | **Kakytron** | R 69:16 death title; TAB | exists |
| 35 | Crisgreen | @CrisGreen95 | **Crisgreen** | TAB; E1 2:41 chat | exists |
| 36 | Shadoune666 | @Shadoune666 | **Shadoune666** | TAB; E1 chat | exists |
| 37 | KillerCreeper55 | @KillerCreeper55 | **killercreeper_55** | R 76:55 death title; TAB; E1 whitelist | exists (`KillerCreeper_55`). Note: `Killercreeper55` (no underscore) is a *different* account |
| 38 | Luh (HDluh / "iLuh") | @HDluh | **iLuh** | R 78:15 death title "iLuh ha muerto"; TAB | exists `iLuh` (`Luh` is a different account) |
| — | KernelFreeze? (admin) | — | **Kernelcraft** ([MOD]) | TAB; E1 whitelist messages | exists `kernelCraft` |

Day-30 tab list with roles for the Permadeath Demon fight (TAB, frame at R 19:56; crops in `evidence/overview/ingame_frames/rubik_19m56s_tablist_*.png`):
- [CONTROL+]: cibergun, Folagoro, FrigoAdri, iLuh, Kakytron, Lakshart, Leyville, MrCarlosnoob, paracetamor
- [CONTROL]: JackyMaster
- [DPS]: Gona89_YT, Hardyluski, Mikecrack, Shadoune666
- [MASTER]: ElRichMC
- [STRAT]: Crisgreen, ElBrean, EsVandal, killercreeper_55
- [MOD]: Kernelcraft

That is 20 players online. Th3Antonio, alive at that time, is absent (presumably offline).

Countries per the fan wiki (**1 fuente**): Shadoune666 (FR), CecilillaJuega (PE), CrisGreen (AR), rest ES. https://permadeath.fandom.com/es/wiki/Participantes. That page also lists "Manue1 Nava (ME)" and "Estebacraft (ME)", who appear in **no** official source; treat them as errors.

---

## 3. Rules and day-by-day changes

### 3.1 Core rules (official)

- "Si un jugador muere, es baneado permanentemente." The server opens at 18:00; members make content "cuando puedan/quieran". https://x.com/PermadeathSMP/status/1242603675601821702
- "Si se detectan malas acciones de un jugador será permabaneado." "Si un jugador se queda inactivo **9 DÍAS** será permabaneado." "Si un jugador logra sobrevivir 110 días entrará en el SALÓN DE LA FAMA, lo cuál le proporcionará muchas ventajas." https://x.com/PermadeathSMP/status/1242604676689940480
- "CADA 10 días la dificultad del servidor AUMENTARÁ." https://x.com/PermadeathSMP/status/1242541261321576449
- Every 25 days there are "cosas especiales" (surprise changes).
  - https://x.com/PermadeathSMP/status/1261010031211937793
  - The day-25 surprise was triggered because nobody died in the 24 h after the day-20 change: https://x.com/PermadeathSMP/status/1250529782636384263
- The Hall of Fame was to be revealed on day 100 to any survivors ("Si ningún jugador llega vivo nunca se anunciará"). https://x.com/PermadeathSMP/status/1264587168128872448
- **Death Train:** when a player dies, a storm starts for a set time. It does NOT trigger on AFK/inactivity bans.
  - "El Death Train solo comienza cuando alguien muere, cuando es banead@ por inactividad en el servidor no se activa el Death Train." https://x.com/PermadeathSMP/status/1251894930944991239
  - The in-game counter "Quedan HH:MM:SS de tormenta" is visible in the tab-list frame at R 19:56.
  - Duration: the base rule was never stated in a tweet I found, but the day-50 image says "Cada día que pasa aumenta 30min en vez de 60min". So before day 50 it grew by 1 hour per server day, and it reset at day 25 and day 50.
  - The public fan plugin implements exactly that: storm hours = day (days 0–24), = day−24 (25–49), 0.5 h at day 50, (day−49)×0.5 h (51–74), stacking with any storm already running. **Fan recreation, not the original code:** https://github.com/seulloaca/Permadeath/blob/main/main/src/main/java/tech/sebazcrc/permadeath/event/player/PlayerListener.java
- Death message format: in-game title "¡Permadeath! <nick> ha muerto", then chat "Este es el comienzo del sufrimiento eterno de <nick>. ¡HA SIDO PERMABANEADO!", a custom per-player joke line, and finally the vanilla death message. The disconnect screen reads "Has sido PERMABANEADO".
  - Frames: R 1:07, 7:31, 37:01 https://www.youtube.com/watch?v=QhHMTOs40mo&t=67s
  - Fan wiki (Muertes) lists the joke lines: https://permadeath.fandom.com/es/wiki/Muertes
- Changes were announced publicly on Twitter. The fan wiki says players got a Discord preview 5 days earlier (**1 fuente**); Rubik says the day-60 changes were announced 5 days before (they were tweeted on 19 May).

### 3.2 Day-by-day changes

All read directly from the official @PermadeathSMP images. Announcement timestamps are UTC. Contact sheets are in `evidence/overview/change_images/`.

**Día 0 (25 Mar 2020):** vanilla Java 1.15.2. The only additions are permadeath (ban on death) and the Death Train.
- https://x.com/PermadeathSMP/status/1242603675601821702
- Fan wiki: https://permadeath.fandom.com/es/wiki/Cambios_de_dificultad
- Rubik 1:48: "del día 2 al 9… totalmente vanilla"

**Día 10.** Posted 3 Apr 22:19 ("3 muertes no son suficientes… ¡SUBAMOS LA DIFICULTAD E INCREMENTEMOS EL DOLOR!"): https://x.com/PermadeathSMP/status/1246200654516887558
- Every spider gets 1–3 potion effects from: Velocidad III, Fuerza IV, Salto V, Brillo, Regeneración IV, Invisibilidad, Caída Lenta, Resistencia III.
- Double mobs ("Doble de Mobs").
- A minimum of 4 players must sleep to skip the night.

**Día 20.** Posted 13 Apr 20:43–20:50; went live 14 Apr about 16:00 UTC ("En DOS horas aumenta la dificultad", posted 13:58 UTC).
- Tweets: https://x.com/PermadeathSMP/status/1249800483151249410 , https://x.com/PermadeathSMP/status/1249801404065202181 , https://x.com/PermadeathSMP/status/1249802102291009536 , https://x.com/PermadeathSMP/status/1250060759075303432
- No drops from: Iron Golems, Pigmans, Ghasts, Guardianes, Magma Cubes, Endermans, Brujas, Wither Skeletons, Evokers, Phantoms, Slimes, Drowneds, Blazes.
- Constant day/night cycle; the night cannot be skipped.
- All peaceful mobs become aggressive, and pigmen are angry from the start. The official clarification lists: Peces, Caballos, Murciélagos, Abejas, Gatos, Pollos, Vacas, Delfines, Zorros, Llamas, Ocelotes, Pandas, Loros, Cerdos, Conejos, Ovejas, Golems de Nieve, Calamares, Tortugas, Aldeanos, Lobos + Zombie Pigmans. https://x.com/PermadeathSMP/status/1250087936542093312
- Spiders now have 3–5 effects.
- 1 in 100 Ravagers drops a Totem of Undying.
- All Phantoms are size 9 with double health.
- You can no longer help, or be helped by, players outside your team (raids, hunts, wither bosses…).
- Every spider spawns with a skeleton rider of one of 5 classes:
  - "Nada especial": full diamond, 10♥
  - Bow Punch XX: wither skeleton in chainmail, 20♥
  - Iron Axe Fire Aspect II: full iron, 10♥
  - Crossbow Sharpness XX: full gold, 20♥
  - Bow Power X: wither skeleton in leather, 20♥
- Event: on 14 Apr 18:30 a monument to the fallen was built at spawn ("Homenaje a los caídos"). https://x.com/PermadeathSMP/status/1249706037365669894

**Día 25, surprise ("Aumento de dificultad sorpresa").** Promised 15 Apr, revealed 19 Apr 16:02–16:16.
- Tweets: https://x.com/PermadeathSMP/status/1250529782636384263 , https://x.com/PermadeathSMP/status/1251903907686690821 , https://x.com/PermadeathSMP/status/1251905747220410368 , https://x.com/PermadeathSMP/status/1251907640525033482
- **RESET DEL DEATH TRAIN:** "Cada 25 días el Death Train se vuelve más peligroso y la cantidad de horas de tormenta en X día se reinicia como si fuese el día 0." During the Death Train all mobs get Fuerza I, Velocidad I and Resistencia I.
- All spiders now have 5 effects.
- Ravagers get Fuerza II and Speed I; they now drop totems 20% of the time.
- GIGASLIMES: slimes only spawn at size 15, with double health.
- GIGA MAGMACUBES: magma cubes only spawn at size 16.
- GHAST DEMONÍACOS: 40–60 health; fireball explosion power 3, 4 or 5.
- NETHERITE ARMOR unlocked. Pieces come from killing GigaSlimes, Giga MagmaCubes, Ghast Demoníacos and Arañas de Cueva. "La armadura de Netherite será completamente necesaria para poder sobrevivir más días."
  - Rubik says the full set gave +4 hearts (**1 fuente**).

**Día 30.** Posted 24 Apr 15:39–15:59, the day of the End opening and the dragon event.
- Tweets: https://x.com/PermadeathSMP/status/1253710272830803968 , https://x.com/PermadeathSMP/status/1253715210046767105 , https://x.com/PermadeathSMP/status/1253303446440161287 ("Por fin se desbloqueará el End y todo el servidor irá a matar a la dragona")
- New skeleton classes (all 20♥):
  - Esqueleto Guerrero: full diamond, Protección IV
  - Esqueleto Infernal: Diamond Axe, Fire Aspect X
  - Esqueleto Asesino: Crossbow Sharpness XXV, Speed II
  - Esqueleto Táctico: Bow Punch XXX, Power XXV
  - Esqueleto Pesadilla: Bow Power L
- Netherite armor can no longer be obtained.
- Community zones are closed except SPAWN.
- Totems: 99% activate, 1% fail.
- The dragon fight is completely modified.
- Special mobs now have special names.
- Squids become Guardians with Speed II.
- Bats become Blazes with Resistencia II.
- Creepers are charged ("Eléctricos").
- Pillagers are invisible and carry Quick Charge X crossbows.
- Skeletons become class skeletons, holding Daño II arrows in the off-hand.
- Pigmen wear diamond armor.
- Iron Golems get Velocidad IV.
- Endermen get Fuerza II.
- Silverfish get 5 effects from the spider list.
- Shulkers become Shulkers Explosivos, with a 20% shell drop.
- Ender Ghasts and Ender Creepers appear in the End.
- Announcements before day 40:
  - 28 Apr, "ANUNCIO — Próximamente para el día 40": totems will have a **3%** failure chance. https://x.com/PermadeathSMP/status/1255200454113406978
  - 1 May, "EVENTO ESPECIAL, sólo por hoy 18:00–22:00": x2 Shulker Shell drops. https://x.com/PermadeathSMP/status/1256252440774610944
  - 3 May, "Próximamente para el día 40": all players will lose 5 inventory slots. https://x.com/PermadeathSMP/status/1256993425506947072

**Día 40.** Posted 4 May 16:06–21:33 across 12 images.
- Tweets: https://x.com/PermadeathSMP/status/1257340928135704576 , https://x.com/PermadeathSMP/status/1257344597019242497 , https://x.com/PermadeathSMP/status/1257345623998808068 , https://x.com/PermadeathSMP/status/1257345674716348416 , https://x.com/PermadeathSMP/status/1257345993936384005 , https://x.com/PermadeathSMP/status/1257348233111703554 , https://x.com/PermadeathSMP/status/1257352310478573569 , https://x.com/PermadeathSMP/status/1257361435816005635 , https://x.com/PermadeathSMP/status/1257387006558076929 , https://x.com/PermadeathSMP/status/1257413913068605448 , https://x.com/PermadeathSMP/status/1257423054872985600
- Player and world rules:
  - Friendly fire enabled.
  - 5 inventory slots removed.
  - New rules against "sedentary and monotonous" play.
  - No strip-mining or branch-mining.
  - Torches and redstone torches can't be crafted.
  - Some new structures no longer generate.
  - **All players lose 4 life containers (hearts).**
  - Totems: 3% failure, and each activation consumes 2.
  - Elytras in End ships spawn broken.
  - Respawning the dragon spawns a Permadeath Demon; dragon's breath comes from Chorus Flowers.
  - Mobs spawn on Mushroom Islands.
  - Shulkers drop shells 2% of the time.
- Mob changes:
  - A % of Endermen spawn hostile.
  - Phantoms carry a Class Skeleton.
  - Creepers get Velocidad II and Resistencia II.
  - Iron Golems get Fuerza I.
  - Guardians get Resistencia II and Velocidad III, and their beam is twice as fast.
  - Spiders become Cave Spiders.
  - Zombies become Vindicators with Fuerza I and double health.
  - Dogs become Cats.
  - Cows, sheep, pigs, chickens and mooshrooms become Ravagers.
  - Nether Endermen become Ender Creepers.
  - Witches become "Brujas Imposibles": double health, Speed II, and potions of Daño Instantáneo IV, Veneno III (5 min) and Slowness V (20 s).
- Weather: a 1/10000 chance of 1 minute of Blindness when in rain. "El Death Train ahora es más peligroso que nunca."
- New items:
  - **Super Golden Apple+**: 8 gold ingots + golden apple. Gives 5 min of Health Boost I; can be eaten any time; not stackable.
  - **Hyper Golden Apple+**: 8 gold blocks + golden apple. Can be eaten once; gives +2 permanent life containers.
- **Gatos Supernova:** cats explode ("Su poder de explosión es capaz de arrasar una base entera").
- **Compañeros:** every player gets a teammate, namely the owner of the nearest bed to their own. Teammates can't share items but can save and help each other.
- **Reliquia del Fin:** 2 shulker shells + diamond block. Recovers the 5 lost slots and must always be carried. Shulker boxes can now be uncrafted into shells.
- A portal to **"The Beginning"** has been generated somewhere in the world ("Se recomienda a los jugadores buscarlo en grupo antes de 10 días").
- Ghasts Demoníacos become **Demonios Flotantes** 75% of the time. Their fireballs give Levitación 50 and Wither V for 20 s, and don't explode.
- **Pigman Jockeys:**
  - Pigman on a pig: the pig has 5 spider effects, 20 base damage and pink armor.
  - Pigman on a bee: the bee has 50♥; the pigman has yellow armor and 6 base damage.
  - Pigman on a ghast: the ghast isn't dangerous but teleports 80% of the time; the pigman has Velocidad IV and 4 base damage.
  - Pigman on a magma cube: half a heart; immune to projectiles.
- A stacked "boss" jockey:
  - **Jess la Emperatriz**: drops 2 golden apples, 120♥.
  - **Carlos el Esclavo**: drops 32 gold ingots, 75♥, full chainmail Protección II, wooden sword Empuje X.
  - **Ultra Ravager**: drops 1 totem, 250♥, Velocidad II and Fuerza II.

**Día 50** (25-day surprise + 10-day change). Delayed by "problemas técnicos" (https://x.com/PermadeathSMP/status/1260964238979477505); posted 14 May 16:05–20:07 and 15 May 15:16.
- Tweets: https://x.com/PermadeathSMP/status/1260964568358170625 , https://x.com/PermadeathSMP/status/1261010671262674946 , https://x.com/PermadeathSMP/status/1261011493887381506 , https://x.com/PermadeathSMP/status/1261013838784315395 , https://x.com/PermadeathSMP/status/1261015239249801223 , https://x.com/PermadeathSMP/status/1261016396412129283 , https://x.com/PermadeathSMP/status/1261017303568834565 , https://x.com/PermadeathSMP/status/1261019125855465474 , https://x.com/PermadeathSMP/status/1261023629766201345 , https://x.com/PermadeathSMP/status/1261025488245571584 , https://x.com/PermadeathSMP/status/1261314629353037825
- **Bacalao de la Muerte:** wooden sword Sharpness L, Knockback C.
- Gatos Supernova become **Gatos Galácticos**. They no longer explode, but on death they can summon any Permadeath mob, including a Gato Supernova or a Permadeath Demon.
- Crafting and survival rules:
  - Lava and water buckets can't be crafted.
  - Totems: 5% failure, and no longer obtainable from raids.
  - Raids give Hero of the Village for 5 min.
  - Mining a block costs half a heart.
  - Smelting iron or gold ore gives nuggets instead of ingots.
  - You drown 5× faster.
  - Soul sand gives Slowness II.
  - Random Levitation of 3–20 s at night in the Overworld.
  - It rains mobs in the Nether.
  - Higher chance of Blindness in rain.
  - **Survivors get medals on day 55.**
  - Mining Fatigue can't be removed with milk and lasts twice as long.
- Mob changes:
  - Hostile mobs get fire resistance.
  - Cave spiders can't have Glowing.
  - Charged ("Energéticos") creepers become Quantum Creepers, and 20% are Ender Creepers.
  - Phantoms become Giga Phantoms, with a 1/100 chance of spawning as 4 Ender Ghasts.
  - Chickens become Silverfish.
  - Salmon become invulnerable Pufferfish.
  - Ravagers become Ultra Ravagers but don't drop totems.
  - 20% of Pigmen are Pigman Jockeys (33% drops).
  - 1% of Illagers are Evokers.
  - Iron Golems get Resistencia II.
  - Drowned carry tridents.
  - Bees deal 15 hearts of base damage.
- Skeletons level up:
  - Guerrero: full diamond Protección IV, **50♥**
  - Infernal: Diamond Axe Fire Aspect XX, Sharpness XXV, 20♥
  - Asesino: Crossbow Sharpness L, Speed II, 20♥
  - Táctico: Bow Punch L, Power **XXXX**, 20♥
  - Pesadilla: Bow Power LX, **20♥**
- **Netherite Infernal armor:** 4 netherite infernal blocks in a cross around a netherite armor piece.
- **Death Train reset:** it now increases by 30 min per day instead of 60 min. During it, all mobs get Fuerza II, Velocidad II and Resistencia II, and "Durante los Death Train el mundo se convierte en modo UHC."
- Surprise changes:
  - The last 10 dead players can suggest 5 changes each; 1 will be chosen to annoy the living.
  - Sleeping has a 10% chance of resetting the Phantom counter.
  - Pumpkin pie becomes the best food (5 s of Saturation).
  - Spider eyes, rotten flesh, poisonous potatoes and pufferfish give their effects permanently when eaten.
  - Llama spit gives Veneno III for 30 s and Náusea for 10 s, with Empuje III.
  - Cave spiders give Veneno III and Náusea.
  - Polar bears explode.
  - Explosive shulkers are invulnerable.
  - Blazes have 100♥.
  - Phantoms have some potion effects.
  - Illagers carry diamond axes with Sharpness V.
  - Vexes get Resistencia III.
  - Giga MagmaCubes and Giga Slimes get double health.
- **GIGANTES** spawn in Plains: 300♥, drop "Arco de Gigante" (Power X), "Quitan mucha vida".
- **Netherite tools** available. They stop block-breaking from hurting you; the sword and axe deal more damage.
- **THE BEGINNING opens.** "No se dará ningún tipo de información a los jugadores. Solo se puede entrar a la dimensión si no hay un Death Train activo."
- Posted 15 May: **Wither Skeleton Emperador**, gold armor, Bow Power C + Punch V, 40♥, 50% drop of a netherite sword. 1 in 50 wither skeletons in a Nether Fortress is an Emperor. Arrows don't damage him.

**Día 55:** medals handed to survivors. ElRichMC stream on 19 May: "ENTREGA DE MEDALLAS A LOS SUPERVIVIENTES DE PERMADEATH DÍA 55 DE 110" (https://twitchtracker.com/elrichmc/streams). According to Rubik the medal was a totem with a 100% activation chance (**1 fuente for the effect**): https://www.youtube.com/watch?v=QhHMTOs40mo&t=3720s

**Día 60, pre-announced 19 May 18:26–19:37 ("Próximamente el día 60").**
- Tweets: https://x.com/PermadeathSMP/status/1262811894412443650 , https://x.com/PermadeathSMP/status/1262813474075394049 , https://x.com/PermadeathSMP/status/1262814637504036864 , https://x.com/PermadeathSMP/status/1262820851973586945 , https://x.com/PermadeathSMP/status/1262829633612939266
- New item: **Elytras de Netherite Infernal** (armor, armor toughness, and they count toward the full set).
- Using a totem consumes **3** instead of 2, and totems now have a **7%** failure chance.
- "Cada 60 minutos de juego se spawnea un Wither Boss en tus bloques."
- Iron Golems get Fuerza IV, Velocidad IV, Resistencia IV and fire resistance.
- Long list of further changes:
  - Creepers have a faster fuse.
  - 50% of Vindicators are Evokers with Resistencia III.
  - Giants and Emperor Skeletons are 4× more common but drop nothing.
  - You drown 10× faster.
  - All players lose 4 more life containers.
  - Mobs lose Fire Resistance but gain Fire Aspect II or Flame.
  - Ender pearl cooldown is doubled.
  - Ender Creepers are gone and become **Ender Quantum Creepers**.
  - Breaking a block by hand or with non-netherite tools costs 8 hearts (unless you have Protection IV).
  - Hostile Snow Golems spawn.
  - Vexes get Fuerza III and 7 base damage.
  - Guardians become Elder Guardians.
  - Drowned deal triple damage.
  - 25% of Phantom spawns are 4 Ender Ghasts.
  - Pigmen no longer spawn in the Nether.
  - Endermen get Fuerza X.
  - Vindicators get the cave-spider effects.
  - **Villagers become Vindicators, including players' villagers.**
  - Soul sand gives Slowness III for 30 s.
- 23 May, "EVENTO ESPECIAL", 18:30–20:30 CEST: explore and loot as many "Inicial Ytics" as you like (a pun on End Cities, text copied literally), but only chest contents can be taken. https://x.com/PermadeathSMP/status/1264232397782102018

**Día 60, on the day (24 May 14:36–15:29 UTC).**
- Tweets: https://x.com/PermadeathSMP/status/1264565933688999936 , https://x.com/PermadeathSMP/status/1264566541267410944 , https://x.com/PermadeathSMP/status/1264566827268616194 , https://x.com/PermadeathSMP/status/1264567222686621696 , https://x.com/PermadeathSMP/status/1264567465159385088 , https://x.com/PermadeathSMP/status/1264567888167481345 , https://x.com/PermadeathSMP/status/1264572383324770304 , https://x.com/PermadeathSMP/status/1264578936220127232 , https://x.com/PermadeathSMP/status/1264579248515428352
- "¡Un muerto ha sugerido que los CREEPERS spawneen en muchos más tipos de bloques y sin importar la luz!" The image shows **Mikecrack** as the dead player who suggested it.
- A second Hyper Golden Apple+ may be eaten.
- New item **Orbe de Vida**. Players had 8 hours "HOY" to get it, or lose 8 life containers when the timer ends. (In-game HUD: "HH:MM:SS para obtener Life Orb", frames R 69:16 and 76:55.)
- Pumpkin pie becomes the worst food: Daño Instantáneo IV.
- Temporary teams disappear; only original teams can do team activities.
- Players lose many more slots. New item **Reliquia del Comienzo** (4 shulker shells + 4 stacks of 32 diamond blocks + a diamond-like core) reverses the penalty.
- No artificial despawning of mobs. **No more totems can be obtained, ever.** No more loot in The Beginning.
- **Ultra Esqueletos:**
  - Guerrero: full Protección V + Bow Power L, 50♥
  - Infernal: Diamond Axe Fire Aspect XX, Sharpness C, 50♥
  - Asesino: Crossbow Sharpness C, Speed IV, 30♥
  - Táctico: Bow Punch L, Power CX, 30♥
  - Pesadilla: Bow Power CL, 30♥
  - Demoníaco: its shots explode, 50♥
  - Científico: arrows give 3 min of Slowness III, Debilidad I, Glowing and Veneno III; 50♥
  - Definitivo: Bow "Power XXXMMDCCLXV", Speed II, 1% spawn, never despawns, 200♥

---

## 4. Key history beats (non-death)

| Date (real) | Day | Event | Sources |
|---|---|---|---|
| 2 Mar 2020 | — | @PermadeathSMP created; "PERMADEATH comenzará este marzo" | https://x.com/PermadeathSMP/status/1234271612314279937 |
| 15–25 Mar 2020 | — | 7 participant rounds plus Perxitaa | see §2.1 |
| 25 Mar 2020, 18:00 CET | 0 | Server opens. ElRichMC's Twitch "LA GRAN INAUGURACIÓN DE PERMADEATH": avg 8,869, peak 10,987 viewers. His Ep1 on YouTube ("De los creadores de EliteCraft llega… PERMADEATH!") has 1,842,943 views as of 2026-09-26. | https://twitchtracker.com/elrichmc/streams ; https://www.youtube.com/watch?v=aZSX5ik0Z6o |
| 25 Mar 2020 | 0 | 3 deaths on day 1, all by creeper (Alvaro845 first) | cards #1–#3 (§5) |
| 14 Apr 2020 | 20 | Monument and cemetery for the fallen at spawn ("homenaje a los caídos") | https://x.com/PermadeathSMP/status/1249706037365669894 |
| 19 Apr 2020 | 25 | First "25-day" surprise; netherite armor introduced | §3.2 |
| 24 Apr 2020 | 30 | End unlocked; server-wide **Permadeath Demon** boss fight (modified dragon, 2 phases; ElRichMC as "MASTER" assigning roles). ElRichMC's stream "BATALLA CONTRA PERMADEATH DEMON - EVENTO DÍA 30": **avg 38,298 / peak 50,467 viewers**, the highest of the series on his channel. His YouTube Ep13 is titled "ENRAGED PERMADEATH DEMON - BOSS FIGHT FINAL [DÍA 30/110]". Rubik says nobody died during the fight itself. FrigoAdri died on entering the End (Ender Creeper, 1% totem failure), and RanguGamer died to silverfish in the stronghold that day. | https://x.com/PermadeathSMP/status/1253716255061741570 ; https://twitchtracker.com/elrichmc/streams ; https://www.youtube.com/watch?v=40_8agmCLuk ; Rubik 16:00–23:10 https://www.youtube.com/watch?v=QhHMTOs40mo&t=960s |
| 24 Apr–2 May 2020 | 30–38 | Deadliest stretch: 14 players out in 8 days (5 AFK/inactive plus deaths, mostly in the End) | cards #14–#27 ; Rubik 15:45 |
| 4 May 2020 | 40 | Biggest change batch (12 images); Gatos Supernova crater bases; Kakytron dies from a plugin bug and is revived | §3.2 ; Rubik 43:00–46:00 |
| 13 May 2020 | 49 | ElRichMC finds The Beginning portal around day 49–50 (stream "BUSCANDO EL PORTAL") | https://twitchtracker.com/elrichmc/streams ; Rubik 49:00 https://www.youtube.com/watch?v=QhHMTOs40mo&t=2940s |
| 14 May 2020 | 50 | Two AFK bans (Th3Antonio, who had agreed because of a LoL SoloQ Challenge; CooLifeGame, which was controversial) plus BriiHD's death leave **7 alive**. Day-50 changes delayed by technical problems. | cards #29–#31 ; https://x.com/PermadeathSMP/status/1260964238979477505 ; Rubik 49:50–53:30 |
| 16 May 2020 (approx.) | 52 | First entry to **The Beginning**: Crisgreen, Shadoune666, killercreeper_55 and ElRichMC. Shadoune went first; he was also first in the Nether and in The Beginning. | Rubik 55:50 (**1 fuente for the date**); fan wiki table "Primer Nether / Primer The Beginning: Shadoune666" https://permadeath-wiki.fandom.com/es/wiki/Permadeath |
| 18 May 2020 | 54 | Fan plugin **PermaDeathCore** published on SpigotMC by vo1d_dev (contributors MiKKey, SebazCRC). Page text: "Si buscabas el plugin que usaron en Permadeath enhorabuena, lo has encontrado." Whether it is the actual server plugin is **unconfirmed**; ElRichMC or KernelFreeze never endorsed it in any source I found. Later continued as "Permadeath Plugin" by Campucraft (28 Aug 2023; versions 1.15.2 / 1.16.5 / 1.20.1). | https://www.spigotmc.org/resources/permadeathcore-%E2%98%A0%EF%B8%8F.78993/ ; https://www.spigotmc.org/resources/permadeath-plugin-%E2%98%A0%EF%B8%8F.112343/ ; https://github.com/seulloaca/Permadeath |
| 19 May 2020 | 55 | Medals given to the 7 survivors; day-60 changes pre-announced | https://twitchtracker.com/elrichmc/streams ; §3.2 |
| 20 May 2020 | 56 | **ElRichMC dies** in The Beginning. He jumped into the void as a joke with KillerCreeper55 and wasn't wearing his elytra (live on stream). It was controversial: some thought it was staged; Rubik argues it was real. | card #32 https://x.com/PermadeathSMP/status/1263209896159383552 ; Rubik 62:45–65:05 https://www.youtube.com/watch?v=QhHMTOs40mo&t=3765s ; Twitch clip https://www.twitch.tv/elrichmc/clip/GeniusPerfectPoultryFrankerZ |
| 24 May 2020 | 60 | The day-60 changes (Mikecrack's creeper suggestion, Ender Quantum Creepers everywhere) kill all 5 remaining: Kakytron, Crisgreen, Shadoune666 (drowned when his conduit failed after a totem pop: "el conduit no funcionó"), killercreeper_55 (about 8 minutes after logging in) and iLuh (last; used his first totem of the series that day). ElRichMC's day-60 stream: avg 12,596 / peak 22,352. | cards #34–#38 ; Rubik 67:00–79:00 ; https://twitchtracker.com/elrichmc/streams |
| 24 May 2020 | 60 | Final tweet "¡ENHORABUENA, HABÉIS PERDIDO!…" with a screenshot of the giant **"F" monument** listing all 38 in death order (1º Alvaro845 … 38º iLuh) | https://x.com/PermadeathSMP/status/1264662676002742275 ; image `evidence/overview/final_monument_ranking.jpg` |
| 31 May 2020 | — | Permadeath 2 (2021) and a spin-off teased | §1.2 |
| 31 May 2021 | — | Permadeath 2 postponed to 2022 (1.18) | §1.2 |
| 24 Nov 2022 | — | ElRichMC thread on funding | §1.2 |
| 25 Mar 2024 | — | Official: "lejos de estar cancelado", needs funding | §1.2 |
| 25 Mar 2025 | — | 5th anniversary. Fan retrospectives (e.g., Colombo32 "5 años después… ¿Dónde están los jugadores?"); no official news found. | https://www.youtube.com/watch?v=V3w72dYRyDo |
| 20 May 2026 | — | Rubik (participant) uploads "La Historia Completa de Permadeath" (81 min, interviews with players; 763,769 views when checked) | https://www.youtube.com/watch?v=QhHMTOs40mo |
| 26 Sep 2026 | — | Paracetamor mentions Permadeath at Minecraft Live; ElRichMC thanks "Para" | https://x.com/ElRichMC/status/2103938047788056686 ; https://x.com/paracetamor/status/2103904108709089603 |

Other notes:
- ElRichMC's YouTube series has 17 episodes (Ep1 "[DÍA 0/110]" to Ep17 "SHULKER SHOCK 2 [DÍA 38/110]", uploaded 26 Mar–14 May 2020). Later days exist only as Twitch streams and clips.
  - https://www.youtube.com/playlist?list=PLQG2mWx8YwUgM9qAg59yNCOJJGEHLI5e_
  - Channel listing via yt-dlp (3,692 videos; only Ep1–17 contain "Permadeath")
- Fan-made derivatives: a Bedrock add-on (https://github.com/HaJuegos/Permadeath-SMP-Addon), datapacks on Planet Minecraft, and SpigotMC plugins. None are official.

---

## 5. Death list (official death cards, @PermadeathSMP)

Day = date − 25 Mar 2020. Times are as printed on the cards (UTC). Causes are as printed on the cards. The in-game nick column comes from §2.2.

| # | Player (card name) | In-game nick | Date | Time (UTC) | Day | Cause (card) | Card tweet |
|---|---|---|---|---|---|---|---|
| 1 | Alvaro845 | Alvaro845 | 25-03-2020 | 19:15:18 | 0 | Creeper | https://x.com/PermadeathSMP/status/1243215294228725760 |
| 2 | TheGamerMaldito | TheGamerMaldito | 25-03-2020 | 19:30:04 | 0 | Creeper | https://x.com/PermadeathSMP/status/1243227776355885058 |
| 3 | Cecililla | Cecililla | 25-03-2020 | 21:29:16 | 0 | Creeper | https://x.com/PermadeathSMP/status/1243612769892601856 |
| 4 | Kaumaru | Kaumaru | 04-04-2020 | 16:50:27 | 10 | Araña de cueva | https://x.com/PermadeathSMP/status/1246484059313917955 |
| 5 | Felipez360 | xXmineCr4fterXx | 04-04-2020 | 20:19:39 | 10 | Araña | https://x.com/PermadeathSMP/status/1246560477645352962 |
| 6 | Ibai | DONIBAILLANOS | 05-04-2020 | 17:23:54 | 11 | Creeper | https://x.com/PermadeathSMP/status/1246864466471530497 |
| 7 | ReventXzz | ReventXzz | 05-04-2020 | 17:28:08 | 11 | Araña de cueva | https://x.com/PermadeathSMP/status/1246864720096788481 |
| 8 | AKAWonder | AKAWonder | 06-04-2020 | 01:17:26 | 12 | Quemado por Blaze | https://x.com/PermadeathSMP/status/1246976907750641664 |
| 9 | Ander | 4andeR | 12-04-2020 | 22:46:29 | 18 | Araña | https://x.com/PermadeathSMP/status/1249472456252932096 |
| 10 | LiliCross | LiliCross | 19-04-2020 | 15:03:00 | 25 | Baneada por AFK | https://x.com/PermadeathSMP/status/1251893173145796608 |
| 11 | RubikYT | RubikYT | 19-04-2020 | 17:35:13 | 25 | Araña de cueva | https://x.com/PermadeathSMP/status/1251934909767221248 |
| 12 | Zeling | MitisyyLeDivorce | 20-04-2020 | 01:58:13 | 26 | Magma cube | https://x.com/PermadeathSMP/status/1252248258862342144 |
| 13 | Tonacho | tonacho | 20-04-2020 | 14:30:30 | 26 | Slime | https://x.com/PermadeathSMP/status/1252248359919894528 |
| 14 | Perxitaa | ? | 24-04-2020 | 00:00:00 | 30 | Baneado por AFK | https://x.com/PermadeathSMP/status/1253483110441914368 |
| 15 | AlexElCapo | EvilAFM | 24-04-2020 | 00:00:00 | 30 | Baneado por AFK | https://x.com/PermadeathSMP/status/1253483601188003843 |
| 16 | Outconsumer | RealOutconsumer | 24-04-2020 | 13:38:31 | 30 | Pollo | https://x.com/PermadeathSMP/status/1253682260164980737 |
| 17 | RanguGamer | RanguGamer | 24-04-2020 | 17:20:36 | 30 | Silverfish de la muerte | https://x.com/PermadeathSMP/status/1253779340460019716 |
| 18 | FrigoAdri | FrigoAdri | 24-04-2020 | 18:22:16 | 30 | Ender creeper | https://x.com/PermadeathSMP/status/1253779475411632129 |
| 19 | Folagor | Folagoro | 26-04-2020 | 20:54:43 | 32 | Ender ghast | https://x.com/PermadeathSMP/status/1254520923107004416 |
| 20 | Paracetamor ("Parecetamor" typo on card) | paracetamor | 26-04-2020 | 20:58:49 | 32 | Caer al vacío | https://x.com/PermadeathSMP/status/1254521106783928320 |
| 21 | Gona89 | Gona89_YT | 28-04-2020 | 17:03:26 | 34 | Shulker explosivo | https://x.com/PermadeathSMP/status/1255198281778565121 |
| 22 | MrCarlosNoob | MrCarlosnoob | 28-04-2020 | 17:23:34 | 34 | Caída escapando de una araña de cueva | https://x.com/PermadeathSMP/status/1255200228409593857 |
| 23 | Mikecrack | Mikecrack | 29-04-2020 | 22:49:47 | 35 | Ender ghast | https://x.com/PermadeathSMP/status/1255639524971077638 |
| 24 | BarbeQ | ? | 30-04-2020 | 00:00:00 | 36 | Ban por AFK | https://x.com/PermadeathSMP/status/1255641761428488192 |
| 25 | Cibergun | cibergun | 30-04-2020 | 19:55:59 | 36 | Ender ghast | https://x.com/PermadeathSMP/status/1255967895185653766 |
| 26 | Alkapone | Leyville | 02-05-2020 | 04:07:22 | 38 | Caída | https://x.com/PermadeathSMP/status/1256578584573104128 |
| 27 | Lakshart (Nia) | Lakshart | 02-05-2020 | 18:22:00 | 38 | Ender ghast | https://x.com/PermadeathSMP/status/1256690597085274114 |
| 28 | Hardyluski | Hardyluski | 08-05-2020 | 14:10:12 | 44 | Gato supernova | https://x.com/PermadeathSMP/status/1258791419306741762 |
| 29 | Th3Antonio | Th3Antonio | 14-05-2020 | 00:00:00 | 50 | Ban por AFK | https://x.com/PermadeathSMP/status/1260721661344731137 |
| 30 | CooLifeGame | JackyMaster | 14-05-2020 | 00:00:00 | 50 | Ban por AFK | https://x.com/PermadeathSMP/status/1260721722996731905 |
| 31 | BriiHD | ElBrean | 14-05-2020 | 07:59:25 | 50 | Ghast demoníaco | https://x.com/PermadeathSMP/status/1260912991823974400 |
| 32 | ElRichMC | ElRichMC | 20-05-2020 | 19:23:55 | 56 | Caer al vacío (The Beginning) | https://x.com/PermadeathSMP/status/1263209896159383552 |
| 33 | EsVandal | EsVandal | 23-05-2020 | 22:58:41 | 59 | Wither Skeleton Emperador | https://x.com/PermadeathSMP/status/1264334359663980544 |
| 34 | Kakytron | Kakytron | 24-05-2020 | 14:58:18 | 60 | Ender Quantum Creeper | https://x.com/PermadeathSMP/status/1264573313470398464 |
| 35 | CrisGreen | Crisgreen | 24-05-2020 | 15:32:41 | 60 | Ender Quantum Creeper | https://x.com/PermadeathSMP/status/1264583771531157505 |
| 36 | Shadoune666 | Shadoune666 | 24-05-2020 | 15:37:14 | 60 | Ahogarse | https://x.com/PermadeathSMP/status/1264583852988735490 |
| 37 | KillerCreeper55 | killercreeper_55 | 24-05-2020 | 20:43:39 | 60 | Ender Quantum Creeper | https://x.com/PermadeathSMP/status/1264705266181963777 |
| 38 | Luh (gold card) | iLuh | 24-05-2020 | 20:50:35 | 60 | Ahogarse | https://x.com/PermadeathSMP/status/1264705449246547969 |

Death-card contact sheets: `evidence/overview/death_cards/dc_1..4.jpg`.

Deaths by type: 32 deaths plus 6 AFK/inactivity bans (LiliCross, Perxitaa, AlexElCapo, BarbeQ, Th3Antonio, CooLifeGame). LiliCross's ban at 15:03 was agreed with the admin, per the fan wiki (**1 fuente**). Rubik: Perxitaa and AlexElCapo "abandonaron", and AlexElCapo explains he disliked the obligations of creator servers (R 16:05).

Bug deaths (Rubik, with player interviews; the fan wiki trivia broadly agrees):
- Kaumaru: a cave spider spawned in an unlit gap after removing a block. **Not revived.**
- Paracetamor: an ender pearl through the End gateway before the island loaded, then fell into the void. **Not revived.**
- Kakytron, day 40: a plugin script removed the block under his obsidian bunker. **Revived.**
- MrCarlosNoob: revived once earlier. Cause not documented in my sources; the fan wiki says "mal entendido fuera del juego".

---

## 6. Contradictions between sources

1. **ElRichMC death date:** fan wiki (permadeath.fandom "Muertes", list section) says 15/05/2020. The same page's table and the official card say **20-05-2020 19:23:55 UTC (day 56)**. https://permadeath.fandom.com/es/wiki/Muertes vs https://x.com/PermadeathSMP/status/1263209896159383552
2. **EsVandal death date:** the same wiki list says 16/05/2020; the official card says **23-05-2020 (day 59)**.
3. **Ibai in-game name:** permadeath-wiki's death-reason list says "Ibaillanos"; its infobox and the in-game title/whitelist say **DONIBAILLANOS**. (`IbaiLlanos` is a separate Mojang account.)
4. **Ander in-game name:** "4ndeR" (wiki list) vs **"4andeR"** (wiki infobox and in-game).
5. **Folagor:** wiki page title "Folagor03"; the in-game nick was **Folagoro**.
6. **LakshartNia vs Lakshart:** the Twitter handle and round image say LakshartNia; in-game it was **Lakshart**.
7. **KillerCreeper55 vs killercreeper_55:** the card and Twitter use KillerCreeper55; in-game it was **killercreeper_55**. These are two different Mojang accounts.
8. **Luh vs iLuh:** card "Luh", Twitter @HDluh; in-game **iLuh**. These are also different Mojang accounts.
9. **Day-10 spider effect "Salto":** permadeath.fandom "Cambios de dificultad" says "Salto 4"; its main page and the official image say **Salto V**.
10. **Day-50 Esqueleto Táctico:** wiki "Power XXX (40)"; official image **Power XXXX**.
11. **Day-50 Esqueleto Pesadilla health:** wiki "90 corazones"; official image **20♥**.
12. **28 Apr "3% totem" change:** the wiki calls it a day-30 surprise; the official image says "**Próximamente para el día 40**".
13. **Inactivity rule:** official tweet **9 days**; the fan wiki says both 9 and 10; Rubik says "más de 10 días".
14. **Hall of Fame:** fan wiki "Hall of Flame"; official "SALÓN DE LA FAMA" / "Hall of Fame".
15. **Kakytron's revived day-40 death:** fan wiki "error de generación de mundo"; Rubik and Kakytron's interview say "fallo del script / culpa del plugin".
16. **Edition duration:** fan wiki "60 días, 6 horas, 21 minutos y 33 segundos". Start at 18:00 CET (17:00 UTC) on 25 Mar and Luh's card at 20:50:35 UTC on 24 May give about **60 d 3 h 50 m**. The wiki figure can't be reproduced.
17. **Start-time tweet typo:** "MAÑANA DÍA 24 A LAS 18:00", corrected in a reply ("DÍA 25, DA IGUAL EL DÍA…"). https://x.com/PermadeathSMP/status/1242567735000924167 ; https://x.com/PermadeathSMP/status/1242568164787003399
18. **Zeling's killer:** the card says "Magma cube"; the fan wiki and Rubik say "Giga Magma Cube"; in-game chat says "Cubo de magma". These are consistent, since after day 25 all magma cubes were Giga.
19. **MrCarlosNoob's cause:** card "Caída escapando de una araña de cueva"; Rubik's narration "por araña de cueva". A minor wording difference.
20. **Fan-wiki participant list** includes "Manue1 Nava (ME)" and "Estebacraft (ME)". They appear in **no** official source and are not in the 38.
21. **Paracetamor's gender on the card:** "ha sido PERMABANEADA", with the name misspelled "Parecetamor". Only a typo.

## 7. Could NOT confirm

- **In-game usernames of Perxitaa and BarbeQ.** Neither appears in any chat, title or tab frame I could read (both were AFK-banned). Mojang accounts `perxitaa` and `BarbeQ` exist today, but nothing ties them to the server.
- **The Mojang UUID behind "MitisyyLeDivorce" (Zeling).** The name no longer resolves; NameMC and laby.net name history are blocked by bot protection. The current `Zeling` account may or may not be the same one.
- **Whether today's accounts are the same as in 2020** for any player (UUIDs weren't captured in 2020 sources), and what their 2020 skins looked like beyond the grayscale heads on the death cards.
- **Kernelcraft = KernelFreeze** (likely, but not stated anywhere I found).
- **Perxitaa's "Invitado+" = MrCarlosNoob** (inferred by elimination only).
- **The exact Death Train base formula** as officially stated. It is only implied by the day-25 and day-50 reset images; the fan plugin's formula is a reconstruction.
- **Whether PermaDeathCore (SpigotMC) is the actual server plugin.** Its page claims it; no statement from ElRichMC or KernelFreeze.
- **The full text of ElRichMC's Nov-2022 funding thread** (only the first tweet was retrieved; the team-size figures come from a search snippet).
- **"Permadeath 2 not before 2028"**: no source found.
- **Concurrent-viewer numbers for other participants' streams** (Mikecrack's death, Luh's final). I only have ElRichMC's channel numbers from TwitchTracker.
- **OmniRich** as a player (fan wiki only), and the fan wiki's team compositions and per-player totem counts. I didn't verify these.
- **Whether the "ElRichMC vs Permadeath Demon" spin-off** (teased 31 May 2020) was ever made.
