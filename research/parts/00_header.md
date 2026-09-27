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
