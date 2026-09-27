# PERMADEATH (ElRichMC, 2020): hechos, fuentes y pendientes

Registro de lo que muestra el video y de dónde sale cada dato. Regla del proyecto: **nada se anima como hecho si no está en al menos una fuente primaria (el clip o la tarjeta del compilado) contrastada por mí con los frames**. Lo que no se pudo confirmar va en "Pendientes / no animado".

> Investigación con subagentes. Las notas completas están en `research/parts/*.md` (fichas visuales por muerte), `research/overview.md` y `research/deaths.md`. Los frames de referencia están en `research/frames/`.
> El contraste propio lo hice extrayendo frames de los videos originales con ffmpeg (`film/tools/vframes.py`) y mirándolos uno por uno.

## Fuentes principales
- **[W] Wiki**: permadeath.fandom.com/es, página "Muertes" (tabla con fecha, hora, causa, n.º y tótem, más la lista de frases de muerte personalizadas). Copia cruda en `research/muertes_pd.json`. También permadeath-wiki.fandom.com/es (páginas por día y por jugador): `research/wiki/`.
- **[G] Compilado GersoonSG**: "TODAS LAS MU3RT3S PERMADEATH", 24/05/2020, https://www.youtube.com/watch?v=vYTcFdeAxE0. Tiene un capítulo por muerte: la tarjeta "X ha sido PERMABANEADO / fecha / causa" y el clip del POV del jugador.
- **[D] Documental de Rubik**: "La Historia Completa de Permadeath" (2026), https://www.youtube.com/watch?v=QhHMTOs40mo. Lo usé como contexto, no como fuente visual.
- Clips suplementarios (multi-POV y reacciones) citados en cada ficha.

## La serie
- Una sola edición oficial: **25/03/2020 → 24/05/2020**, 60 días de servidor (día 0 = 25/03/2020, día 60 = 24/05/2020). Minecraft **1.15.2**, alojado por KernelFreeze ("Permadeath 1.15.2, Hospedado por @KernelFreeze", visto en la lista de servidores del clip de Ander). [W][G][D]
- **38 jugadores** más **OmniRich**, el personaje admin con el que ElRichMC siguió jugando tras su muerte. [W][D]
- Morir = **permaban**. Al morir alguien, todos ven el título rojo **"¡Permadeath!" / "<jugador> ha muerto"**, el chat muestra "…sufrimiento eterno de <jugador>. ¡HA SIDO PERMABANEADO!" (el día 0 decía "…sufrimiento infinito… ha comenzado") y el jugador es expulsado con "Has sido PERMABANEADO". [W] + visto en casi todos los clips [G].
- **Death Train**: tras cada muerte se desata una tormenta. Lo vi en pantalla: "Comienza el Death Train con duración de 11 horas!" (muerte de Felipez, POV de killercreeper, video Oi7ijuDSu2A), "…con duración de 10 horas!" (Kakytron) y contadores "Quedan HH:MM:SS de tormenta" en varios clips. [G]
- El objetivo era llegar al día 110. La serie terminó el día 60, cuando murió el último superviviente (Luh), seguido esa noche por OmniRich. [D][W]
- Permadeath 2 se anunció, se atrasó y quedó postergado indefinidamente (sin financiación). [D] + nota de Bolavip (ver `research/parts/00_header.md`).

## Muertes y baneos (orden cronológico)
Día = día de servidor. "Mensaje" = el mensaje de muerte vanilla visto en pantalla. ✔ = frames contrastados por mí.

| # | Jugador (nombre en juego) | Día | Fecha · hora (UTC) | Causa [W] | Mensaje en pantalla [G] | Contraste |
|---|---|---|---|---|---|---|
| 1 | Alvaro845 | 0 | 25/03 19:15 | Creeper | `Alvaro845 was blown up by Creeper` | ✔ 0:16–0:18 |
| 2 | TheGamerMaldito | 0 | 25/03 19:30 | Creeper | `TheGamerMaldito ha explotado por Creeper` | ✔ 1:01 |
| 3 | Cecililla | 0 | 25/03 21:29 | Creeper | `Cecililla ha explotado por Creeper` (el creeper nunca se ve) | ✔ 1:34 |
| 4 | Kaumaru | 10 | 04/04 16:50 | Araña de cueva | — **sin clip**: tarjeta + su relato grabado | ✔ tarjeta |
| 5 | Felipez360 (xXmineCr4fterXx) | 10 | 04/04 20:19 | Araña (tótem consumido) | título "xXmineCr4fterXx ha muerto" (POV de Th3Antonio) | ✔ 3:21–3:29 |
| 6 | Ibai (DONIBAILLANOS) | 11 | 05/04 17:23 | Creeper | `DONIBAILLANOS fue reventado/a por Creeper` | ✔ 3:57–3:59 |
| 7 | ReventXzz | 11 | 05/04 17:28 | Araña de cueva | `ReventXzz ha sido víctima de Araña de cueva` | ✔ 4:32–4:35 |
| 8 | AKAWonder | 12 | 06/04 01:17 | Blaze | `AKAWonder se ha reducido a cenizas mientras luchaba contra Blaze` | ✔ 5:00–5:22 |
| 9 | Ander (4andeR) | 18 | 12/04 22:46 | Araña (tótem consumido) | `4andeR ha sido víctima de Araña` | ✔ 5:45–5:47 |
| 10 | LiliCross | 25 | 19/04 15:03 | **Baneo por AFK** (pedido por ella) | tarjeta + texto | ✔ 6:09–6:14 |
| 11 | RubikYT | 25 | 19/04 17:35 | Araña de cueva (tótem consumido) | `RubikYT was slain by Cave Spider` | ✔ 6:22–6:33 |
| 12 | Zeling (MitisyyLeDivorce) | 26 | 20/04 01:58 | Magma Cube (Giga) | `MitisyyLeDivorce ha sido víctima de Cubo de magma` | ✔ 7:06–7:10 |
| 13 | Tonacho | 26 | 20/04 14:30 | Slime (Giga) | `tonacho was slain by Slime` | ✔ 7:46–7:49 |
| 14 | Perxitaa | 30 | 24/04 00:00 | **Baneo por AFK** | tarjeta + texto | ✔ 8:38 |
| 15 | AlexElCapo | 30 | 24/04 00:00 | **Baneo por AFK** (voluntario, según sus tuits) | tarjeta + tuits | ✔ 8:47–8:52 |
| 16 | OutConsumer | 30 | 24/04 13:38 | Pollo | — **sin clip**: tarjeta + su relato en directo | ✔ tarjeta |
| 17 | RanguGamer | 30 | 24/04 17:20 | Silverfish de la Muerte | `RanguGamer ha sido víctima de Silverfish de la Muerte` | ✔ 10:09–10:18 |
| 18 | FrigoAdri | 30 | 24/04 18:22 | Ender Creeper (tótem no activado, 1%) | `FrigoAdri ha explotado por Creeper` | ✔ 10:40–10:47 |
| 19 | Folagor (Folagoro) | 32 | 26/04 20:54 | Ender Ghast (tótem consumido) | `Folagoro ha explotado por Ender Ghast` | ✔ 11:55–12:02 |
| 20 | Paracetamor | 32 | 26/04 20:58 | Caer al vacío | — **sin clip**: tarjeta + sus dos tuits | ✔ 12:19, 12:30 |
| 21 | Gona89 (Gona89_YT) | 34 | 28/04 17:03 | Shulker explosivo (tótem no activado, 1%) | `Gona89_YT ha explotado` | ✔ 12:54–12:56 |
| 22 | MrCarlosNoob | 34 | 28/04 17:23 | Caída escapando de araña de cueva | `MrCarlosnoob hit the ground too hard whilst trying to escape Cave Spider` | ✔ 13:11–13:16 |
| 23 | Mikecrack | 35 | 29/04 22:49 | Ender Ghast (tótem consumido) | `Mikecrack was blown up by Ender Ghast` | ✔ 14:59–15:02 |
| 24 | BarbeQ | 36 | 30/04 00:00 | **Baneo por AFK** | tarjeta | ✔ 15:59 |
| 25 | Cibergun | 36 | 30/04 19:55 | Ender Ghast (tótem consumido) | `cibergun ha explotado por Ender Ghast` | ✔ 16:06–16:23 |
| 26 | Alkapone (Leyville) | 38 | 02/05 04:07 | Caída (tótems consumidos) | `Leyville fell from a high place` | ✔ 16:40–17:32 |
| 27 | Nia (Lakshart) | 38 | 02/05 18:22 | Ender Ghast (tótem consumido) | `Lakshart ha explotado por Ender Ghast` | ✔ 17:53–18:00 |
| 28 | Hardyluski | 44 | 08/05 14:10 | Gato Supernova (tótem no activado, 3%) | `Hardyluski ha explotado por Gato` (el gato nunca se ve) | ✔ 18:15–18:27 |
| 29 | Th3Antonio | 50 | 14/05 00:00 | **Baneo por AFK** | tarjeta + texto | ✔ 18:42–18:47 |
| 30 | CooLifeGame | 50 | 14/05 00:00 | **Baneo por AFK** (mínimo de horas, según sus tuits) | tarjeta + tuits | ✔ 18:51 |
| 31 | BriiHD (ElBrean) | 50 | 14/05 07:59 | Ghast Demoníaco (sin tótem por falta de slots) | `ElBrean was blown up by Ghast Demoníaco` | ✔ 19:40–19:45 |
| 32 | ElRichMC | 56 | 20/05 19:23 | Caer al vacío | `ElRichMC fell out of the world` | ✔ 20:10–20:20 |
| 33 | EsVandal | 59 | 23/05 22:58 | Wither Skeleton Emperador (tótem consumido) | `EsVandal ha muerto por un flechazo de Esqueleto Wither` | ✔ tarjeta 21:06, 21:14–21:20 |
| 34 | Kakytron | 60 | 24/05 14:58 | Ender Quantum Creeper | `Kakytron was blown up by Ender Quantum Creeper` (POV espectador de Rich) | ✔ 21:42–21:52 |
| 35 | CrisGreen | 60 | 24/05 15:32 | Ender Quantum Creeper | `Crisgreen was blown up by Ender Quantum Creeper` | ✔ 22:05–22:11 |
| 36 | Shadoune666 | 60 | 24/05 15:37 | Ahogarse (tótem consumido) | `Shadoune666 drowned` | ✔ 22:43–22:47 |
| 37 | killercreeper_55 | 60 | 24/05 20:43 | Ender Quantum Creeper | `killercreeper_55 was blown up by Ender Quantum Creeper` | ✔ 23:07–23:09 |
| 38 | Luh (iLuh) | 60 | 24/05 20:50 | Ahogarse (tótem consumido) | `iLuh se ha ahogado` (una explosión lo lanza a un estanque) | ✔ 23:46–23:51 |
| 39 | OmniRich | 60 | 24/05 ≈21:00 (entre 20:59 y 21:05) | Vex | `OmniRich was slain by Vex` | ✔ Shem fD_eMUi4axs 2:52–2:55 |

Totales: **33 muertes en juego** (32 jugadores más OmniRich) y **6 baneos por inactividad**. Los 38 jugadores terminaron muertos o baneados.

## Contradicciones encontradas y cómo se resolvieron
Ninguna quedó abierta sobre quién murió, cuándo o cómo. Cada una se resolvió con una fuente primaria (el clip o la tarjeta oficial), así que no hizo falta frenar a consultar.
1. **OmniRich, fecha**: la tabla de la wiki dice 05/06/2020, pero el clip muestra capturas guardadas como `2020-05-24_22.5x` (hora local de Rich, UTC+2: la captura de Kakytron `16.58.19` coincide con su tarjeta 14:58:18 UTC) y los dos videos se subieron el 25/05/2020. Uso **24/05/2020, ≈21:00 UTC**. El agente de muertes lo ubica ≈21:05 UTC por los timestamps del clip. En pantalla no afirmo si fue antes o después del tuit de cierre (21:00:52 UTC). La historia de la wiki (aldeanos convertidos en vindicators) no tiene respaldo en el footage.
2. **ElRichMC, fecha**: la prosa de la wiki dice 15/05 y la tabla 20/05. La tarjeta del compilado dice **20-05-2020**.
3. **EsVandal, fecha**: la prosa de la wiki dice 16/05 y la tabla 23/05. La tarjeta dice **23-05-2020**.
4. **Luh, causa**: la wiki dice "Ahogarse" y el documental habla de un creeper. El clip muestra ambas cosas en cadena: figura celeste, explosión, sale despedido a un estanque y se ahoga (mensaje "se ha ahogado"). No hay conflicto.
5. **MrCarlosNoob**: la wiki dice "caída escapando de araña de cueva" y el documental "araña de cueva". Manda el mensaje en pantalla: caída mientras escapaba.
6. **Día de las primeras muertes**: el documental dice "día 1" en sentido coloquial; el contador del servidor es día 0 (25/03). Muestro "DÍA 0" y la fecha.
7. **FrigoAdri**: la página del jefe en la wiki dice que lo mató el Permadeath Demon; la tarjeta dice Ender Creeper y el mensaje en pantalla "ha explotado por Creeper". Manda el mensaje.
8. **Nia (Lakshart)**: la wiki dice "Enderman" y la tarjeta "Ender Ghast". El clip muestra el tótem saltando entre endermen y la muerte "ha explotado por Ender Ghast". Se dibuja lo que se ve, sin afirmar qué golpe fue de quién.
9. **CrisGreen, lugar**: el documental habla del portal de Kakytron al salir del Nether; el footage muestra un pasillo con canal de agua y portal (lado Overworld). Se dibuja lo del footage.
10. **Horas y días**: las tarjetas oficiales están en UTC (España = UTC+1 el día 0 y UTC+2 después). En pantalla uso UTC y el contador del servidor (día 0 = 25/03).
11. **Ander, lugar**: el agente de muertes dice "isla de champiñones"; el clip muestra pasto, arena y un río de noche. Se dibuja lo del clip.

## Cambios de dificultad y tuits oficiales que aparecen en pantalla
Todo lo que se muestra en los "decretos" y en los tuits recreados sale de las imágenes y textos oficiales de @PermadeathSMP, recuperados del Wayback Machine (`research/evidence/overview/permadeathsmp_tweets_2020-2021.json` y `change_images/`). Los miré uno por uno:
- **Reglas** (tuits del 24 y 25/03/2020 y del 19/04/2020): muerte = baneo permanente; "CADA 10 días la dificultad del servidor AUMENTARÁ"; sobrevivir 110 días = SALÓN DE LA FAMA; "El Death Train solo comienza cuando alguien muere".
- **Día 10**: arañas con entre 1 y 3 efectos de poción, doble de mobs, mínimo 4 jugadores para pasar la noche.
- **Día 20**: no se puede saltar la noche, los mobs pacíficos pasan a ser agresivos, arañas con 3 a 5 efectos y con esqueleto encima, Phantoms de tamaño 9 y doble de vida.
- **Día 25** (sorpresa): reset del Death Train, arañas con 5 efectos, GigaSlimes, Giga MagmaCubes y Ghast Demoníacos, armadura de Netherite desbloqueada.
- **Día 30**: dragona modificada, tótems con 1% de fallar, creepers eléctricos, shulkers explosivos, silverfish con 5 efectos, Ender Ghasts y Ender Creepers en el End.
- **Día 40**: −4 contenedores de vida, −5 slots, tótems con 3% de fallar que consumen 2, Gatos Supernova ("su poder de explosión es capaz de arrasar una base entera"), portal a "The Beginning".
- **Día 50**: tótems con 5% de fallar, picar bloques quita medio corazón, te ahogas 5 veces más rápido, Quantum Creepers, los pollos pasan a ser silverfish.
- **Día 60**: creepers en más bloques y sin importar la luz (sugerido por Mikecrack ya muerto; su cara aparece en la imagen oficial), Ender Quantum Creepers, tótems con 7% de fallar que consumen 3, Orbe de Vida en 8 horas.
- **Cierre** (24/05/2020 21:00 UTC): "¡ENHORABUENA, HABÉIS PERDIDO! Habéis tardado un total de 60 días en perder. 38 jugadores asesinados."
- **Rondas de anuncio de jugadores** (15, 17, 20, 22 y 24/03/2020): el orden de la presentación sigue esas 7 rondas.

## Muertes que no contaron
- **MrCarlosNoob, primera muerte (día 20, 14→15/04)**: fue deshecha por un rollback del servidor (según Nia y Folagor en directo; la duración de "unas 11 h" viene del agente y no la contrasté) y no tiene tarjeta oficial. El documental la confirma: "Después de haberlo intentado por primera vez, Carlos Noob moría por segunda vez". Fue un salto deliberado en directo, del que él mismo dijo en 2026 que se arrepiente. **Decisión:** se menciona en pantalla como "muerte anulada por un rollback", sin recrear el acto. Fuentes: `research/deaths.md` (dos jugadores lo dicen en directo) + trivia de la wiki.
- **Kakytron, primera muerte (día 40, 04/05, hora desconocida)**: un bug del script del plugin quitó el bloque bajo su búnker en una torre y lo revivieron. Fuentes: su propia entrevista en el documental de Rubik + trivia de la wiki. Se recrea como boceto a lápiz breve, con el rótulo "MUERTE ANULADA · SIN CLIP". Ni la hora ni la altura se muestran porque no se conocen.

## Cómo se animó cada caso dudoso (sin inventar)
- **Cecililla (#3)**: el creeper nunca aparece en cámara, así que tampoco aparece en el dibujo. La explosión llega desde fuera de cuadro, con el rótulo "EL CREEPER NUNCA APARECIÓ EN CÁMARA".
- **Kaumaru (#4), OutConsumer (#16), Paracetamor (#20)**: no hay clip. Se recrean en estilo "boceto a lápiz", distinto al resto, con el rótulo "SIN CLIP · SEGÚN SU PROPIO RELATO" y solo lo que ellos mismos contaron (Kaumaru en su video, OutConsumer en su directo, Paracetamor en sus tuits).
- **Hardyluski (#28)**: el Gato Supernova nunca se ve. Se dibuja el vuelo nocturno bajo la lluvia y la explosión repentina, sin el gato.
- **Golpes finales no visibles** (Folagor, Mikecrack, Cibergun, Nia, EsVandal): se muestra lo visto hasta el último frame. El impacto final se dibuja como destello y explosión o golpe, según el mensaje oficial, sin inventar de dónde vino.
- **Baneos por AFK**: no hubo muerte, así que no se recrea ninguna. Aparecen como tarjeta "PERMABANEADOS POR INACTIVIDAD".

## Segunda pasada: explicaciones dibujadas y su fuente
Las notas a mano, flechas y círculos que aparecen en cada muerte solo cuentan lo que está en el clip, en el mensaje de muerte o en las palabras del propio jugador. Los datos nuevos que agregué en esta pasada:
- **ElRichMC**: en el frame de 20:15 del compilado se ve **la élitra en su inventario** (fila 1, casilla 2, con barra de durabilidad). En 20:18.9 la casilla de la pechera está vacía y la pechera pasó a la cuadrícula. Réplica del inventario casilla por casilla en `film/src/deaths/inventory2d.js`. Nota en pantalla: "la élitra estaba en su inventario… no llegó a ponérsela" (frames + documental: "no las encontró a tiempo").
- **Paracetamor**: sus palabras en el documental de Rubik: "me hice mi escalerita, tiro una enderpearl y… mi personaje se hizo teleport pero cayendo al vacío". Rubik: "al lanzar un ender pearl a través de un gateway". Así queda resuelto el pendiente de "qué portal": **un gateway del End**.
- **Kakytron (primera muerte)**: sus palabras: "una torre de obsidiana y me encerré allí rollo búnker… por algún fallo del script… el bloque de abajo se desapareció y me caí… fue culpa del script… y me revivió". Rubik sobre el día 40: plataformas de obsidiana "a la máxima altura" por los Gatos Supernova. La forma exacta del búnker es esquemática.
- **Shadoune666**: el conduit sale de sus propias palabras ("el conduit no funcionó") y de Rubik. La regla "Te ahogas 10 veces más rápido" es oficial del día 60 (imagen de @PermadeathSMP). La ubicación del conduit en el dibujo es ilustrativa.
- **OutConsumer**: "sin armadura para sumar experiencia (mending)", "se cae al corral", "huye en vez de girarse", "abre un hueco para subir", "salta el tótem y no le da tiempo a poner otro": todo son sus palabras (compilado 8:59–9:58).
- **Kaumaru**: "zona de spawners… perfectamente iluminada", "quita un bloque… hueco oscuro… araña de cueva con fuerza y velocidad": sus palabras (compilado 1:55–2:59).
- **Cibergun**: "INVISIBLE · SIN ARMADURA" viene de su inventario en 16:06 (efecto Invisibilidad, casillas de armadura vacías).
- **EsVandal**: se dibujan flechas. El mensaje de muerte es "flechazo de Esqueleto Wither" y Rubik cuenta que una primera flecha casi lo mata y una segunda lo remató. Qué figura del clip fue el Emperador sigue sin identificarse.
- **Nia**: la bola de fuego del ghast que la mata se dibuja porque el mensaje oficial es "ha explotado por Ender Ghast" y en el clip se ve un ghast tras el tótem. El impacto final no se ve en el footage.
- **Decretos**: todos los textos salen de las imágenes oficiales de @PermadeathSMP (ver sección de cambios). El día 10 cita el tuit real: "3 muertes no son suficientes… ¡SUBAMOS LA DIFICULTAD E INCREMENTEMOS EL DOLOR!". Los mobs del pedestal 3D ilustran cada cambio.
- **Kakytron (#34)**: el creeper escondido detrás de una columna junto a la puerta viene del documental de Rubik ("se puede ver desde el POV de Rich como hay un creeper que él no ve porque se lo tapa una columna"). En el clip solo se ve una mancha verde en la puerta y después el cráter.
- **CrisGreen (#35)**: en el clip, la etiqueta del mob se lee "Ende…". En el dibujo va completa ("Ender Quantum Creeper"), como dice el mensaje de muerte.
- **Folagor (#19)**: empieza en la pantalla real de edición del cartel ("DEP / Hermano. / Te extrañaré. / Folagor_"). El golpe final no se ve en el clip y el dibujo lo dice con una nota.
- **Cámara lenta**: es un recurso de montaje, no un dato. No cambia el orden ni la causa de nada.

## Pendientes / no animado como hecho
- Duración del Death Train en cada muerte: solo se conoce donde se vio en el chat. En pantalla aparece únicamente en Felipez360 ("11 horas", POV de killercreeper) y Kakytron ("10 horas").
- Efectos exactos de la araña de Felipez360, y el golpe que le activó el tótem.
- "Combo flecha" de Tonacho: es solo su relato. En el dibujo aparecen creepers (se ven en el clip), no esqueletos.
- Si a KillerCreeper55 lo mató un creeper o dos.
- El gato de Hardy "a ~290 bloques" (dato de un solo agente, no contrastado por mí): no se muestra.
- Qué causó el primer golpe (el que activó el tótem) en Folagor, Cibergun y Alkapone: no se ve en el footage.
- A quién estaba dedicado el cartel "DEP / Hermano. / Te extrañaré. / Folagor_": el clip no lo dice. El documental dice que era para Frigo (una sola fuente); no se afirma en pantalla.
- ~~En Paracetamor, a qué portal intentaba llegar~~ → resuelto: un gateway del End (documental).
- En OutConsumer, la distribución del corral, la hora y el lugar: desconocidos. Solo se dibuja lo que contó (sin armadura, cae entre unos 10 pollos agresivos, huye cavando hacia arriba, salta el tótem, muere).
- Identidad exacta del "Wither Skeleton Emperador" entre las tres figuras que se ven en el clip de EsVandal: no es identificable.
- Skins: ver `assets/skins/SKINS.md` (época del skin, fuente de cada PNG).

## Skins de la presentación
- **33 de 38**: la cara de la skin coincide píxel por píxel con la cara de su tarjeta oficial de muerte (@PermadeathSMP, tuiteada dentro de las 24 h de cada muerte). Es decir, es la skin que llevaban cuando murieron. Fuente de los PNG: historial de NameMC (`s.namemc.com/i/…`) y API de Mojang. Detalle y UUID en `assets/skins/SKINS.md`.
- **FrigoAdri y Cibergun**: la cara se parece mucho a la de su tarjeta, pero no coincide píxel por píxel. De FrigoAdri se usa la textura de su historial más parecida a la tarjeta; de Cibergun, su skin actual.
- **Shadoune666**: solo se conserva su skin **actual** (la única registrada en NameMC, de 2023). No coincide con la cara de su tarjeta de 2020 (negra con ojos blancos). Se usa la actual y en la presentación se aclara "skin actual".
- **Perxitaa y BarbeQ**: su nombre de juego nunca se vio y ninguna cuenta con esos nombres coincide con la cara de sus tarjetas. Se muestran con **la cara 8×8 extraída de su tarjeta oficial** (`assets/skins/card_*.png`, cuerpo en sombra), rotulados "cuenta sin confirmar · cara de su tarjeta oficial".
- **OmniRich**: skin de la cuenta admin (NameMC). En su recreación solo aparece en primera persona, como en el clip.
