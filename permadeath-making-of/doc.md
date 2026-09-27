# PERMADEATH: cómo se hizo el video

Sep 27, 2026 · @Creator Founder

## Resumen

Un film de motion graphics de 7:47 sobre Permadeath, el servidor hardcore de ElRichMC (25/03 al 24/05/2020), hecho 100% en código: HTML, JavaScript, three.js y WebAudio, sin metraje ni modelos de video. Se exportó frame a frame a MP4 (1920×1080, 30 fps, 14.015 frames, audio AAC a −14 LUFS, 1,6 GB).

- **Estructura**: apertura con el corazón hardcore y la pantalla de kick, título 3D de bloques, las reglas oficiales, presentación de los 38 jugadores con sus skins reales, crónica día por día y memorial final.
- **Crónica**: 7 decretos de dificultad, 6 baneos por inactividad, 1 muerte anulada por rollback, 1 muerte revivida y 33 muertes en juego, cada una recreada como un dibujo animado.
- **Iteraciones**: la v1 duró 5:43. La v2 sumó explicaciones dibujadas a mano, cámara lenta, mejor física, decretos rediseñados y una partitura más épica.
- **Archivo final**: `out/PERMADEATH_v2.mp4`; fuentes y pendientes en `FACTS.md`.

## El encargo y las reglas

La regla central fue no inventar: ninguna muerte, día o causa aparece en pantalla sin una fuente contrastada. Lo que no se pudo confirmar va a `FACTS.md` y no se anima como hecho.

- **Pedido**: investigar Permadeath (participantes, tiempos, historia, cada muerte, cada cambio) y hacer un video épico con presentación, timeline y cada muerte recreada.
- **Presentación**: con las skins reales de los jugadores.
- **Muertes**: recontadas en un estilo animado propio, como si se hubiera visto el clip y se lo volviera a contar en dibujo.
- **Libertad creativa**: estilo, música, estructura y duración los decidía yo.
- **Freno obligatorio**: solo si dos fuentes se contradecían sobre quién, cuándo o cómo, o si no se podía seguir sin inventar un dato. No hizo falta frenar: cada contradicción se resolvió con una fuente primaria.
- **"Done"**: skins reales en la presentación, todas las muertes confirmadas recreadas, cero datos inventados y un MP4 que se reproduce.

## Investigación con subagentes

La investigación se partió en 4 subagentes en paralelo. Antes de dibujar cada muerte, extraje yo mismo los frames del clip original con ffmpeg y los miré uno por uno.

| Subagente | Qué trajo | Fuente principal |
| --- | --- | --- |
| Panorama | Ediciones, 38 participantes con su nombre en juego, cambios día por día, hitos | 128 tuits de @PermadeathSMP recuperados del Wayback Machine, con sus imágenes oficiales |
| Muertes | Tabla cronológica con fecha UTC, causa, lugar, contexto y confianza | Las 38 tarjetas oficiales de muerte + clips de los jugadores |
| Skins | El PNG real de cada jugador y su época | NameMC (historial) + API de Mojang |
| Recon visual | Ficha cuadro a cuadro de cada clip: mensaje exacto, escenario, HUD, secuencia | Compilado de GersoonSG "TODAS LAS MU3RT3S PERMADEATH", un capítulo por muerte |

- **Otras fuentes**: el documental de Rubik "La Historia Completa de Permadeath" (2026), las wikis de fans y videos multi-POV.
- **Método de contraste**: una herramienta propia (`tools/vframes.py`) arma hojas de contacto con los segundos exactos de cada clip. Con ellas verifiqué el mensaje de muerte, el escenario y lo que se ve en los últimos segundos.
- **Las muertes sin clip** (Kaumaru, OutConsumer, Paracetamor) se reconstruyeron solo con sus propias palabras: su video, su directo, sus tuits y sus entrevistas en el documental.

## FACTS.md y las contradicciones

`FACTS.md` es el contrato del video. Nada se anima como hecho si no está en al menos una fuente primaria (el clip o la tarjeta oficial) contrastada con los frames. Lo que no se pudo confirmar va a "Pendientes" y no sale en pantalla.

Aparecieron 11 contradicciones entre fuentes. Ninguna quedó abierta sobre quién murió, cuándo o cómo, así que no hizo falta frenar a preguntar. La regla fue siempre la misma: **manda lo que se ve en pantalla** (tarjeta oficial, mensaje de muerte, frames).

| # | Quién / qué | Choque | Resolución |
| --- | --- | --- | --- |
| 1 | OmniRich, fecha | Wiki: 05/06/2020 | Capturas guardadas en el clip (`2020-05-24_22.5x`, hora local UTC+2): **24/05, ≈21:00 UTC** |
| 2 | ElRichMC, fecha | Prosa de la wiki 15/05, tabla 20/05 | Tarjeta: **20-05-2020** |
| 3 | EsVandal, fecha | Prosa 16/05, tabla 23/05 | Tarjeta: **23-05-2020** |
| 4 | Luh, causa | Wiki "ahogarse", documental "creeper" | El clip muestra las dos cosas en cadena: explosión y luego se ahoga |
| 5 | MrCarlosNoob | "Caída" vs "araña de cueva" | Manda el mensaje: caída mientras escapaba |
| 6 | Día de las primeras muertes | Documental: "día 1" | Contador del servidor: **DÍA 0** (25/03) |
| 7 | FrigoAdri | Wiki: Permadeath Demon | Tarjeta y mensaje: Ender Creeper |
| 8 | Nia | Wiki "Enderman", tarjeta "Ender Ghast" | Se dibuja lo visto (tótem entre endermen) y el mensaje oficial |
| 9 | CrisGreen, lugar | Documental: portal al salir del Nether | Footage: pasillo con canal de agua, lado Overworld |
| 10 | Horas | Hora española vs UTC | Todo en UTC + contador del servidor |
| 11 | Ander, lugar | Agente: "isla de champiñones" | El clip: pasto, arena y río de noche |

Los casos dudosos se animaron sin inventar:

- **Cecililla**: el creeper nunca aparece en cámara, así que tampoco en el dibujo. La explosión llega desde fuera de cuadro.
- **Hardyluski**: el Gato Supernova nunca se ve. Se dibujan el vuelo y la explosión repentina, sin el gato.
- **Golpes finales no visibles** (Folagor, Mikecrack, Cibergun, Nia, EsVandal): se muestra hasta el último frame y el remate queda como destello, según el mensaje oficial.
- **Muertes que no contaron**: la de MrCarlos (deshecha por rollback) se menciona sin recrearla. La primera de Kakytron (bug del script) va como boceto con sello "MUERTE ANULADA".
- **Baneos por AFK**: no hubo muerte, así que van en una tarjeta de "permabaneados por inactividad".

Quedaron 10 pendientes que no salen en pantalla. Por ejemplo: la duración del Death Train en cada muerte, el "combo flecha" de Tonacho (solo es su relato), si a KillerCreeper lo mató uno o dos creepers, y qué figura era el Emperador en el clip de EsVandal.

## Stack técnico

Todo el video es una página web que se renderiza sola. No hay footage, ni modelos de video, ni samples: la imagen sale de three.js y Canvas 2D, y la música se sintetiza en el navegador.

&#91;embedded content: pipeline de render · una fuente, dos ramas, un mux\]

La línea de tiempo alimenta dos ramas que corren por separado y se juntan recién en el mux final.

- **Determinismo**: nada depende de un reloj real, todo lo que se mueve depende del número de frame. Por eso 6 workers pueden renderizar rangos distintos y el resultado pega sin costuras. También permite re-renderizar un solo segmento para arreglar una escena.
- **Motor**: Chromium 152 headless controlado con puppeteer-core, con la GPU AMD real.
- **Capas por frame**: escena 3D (three.js) → composición 2D (textos, notas, HUD) → shader de post (grano, aberración cromática, viñeta, destello, temblor, glitch, letterbox y transiciones de quemado, tinta y corte).
- **Captura**: `canvas.toDataURL` en JPEG, por pipe directo a ffmpeg. No se guardan frames sueltos en disco.
- **Audio**: el mismo `FILM.cuesJSON()` que usa la imagen le dice a la música dónde caen los impactos, los decretos y las cámaras lentas.
- **Archivos clave**: `film/src/main.js` (arranque y API `FILM`), `film/src/timeline.js` (las 55 escenas), `film/render.mjs` (video) y `film/render_audio.mjs` (audio).

## Dirección de arte

El video habla con dos lenguajes visuales. Lo "oficial" (presentación, título, decretos, tuits) es Minecraft limpio: vóxeles en 3D y tipografía del juego. Las muertes, en cambio, son un **relato dibujado**: tinta y aguada sobre papel, como alguien que vio el clip y lo vuelve a contar a mano.

**El shader "ink & wash"** (`film/src/gl.js`, `renderInk`) convierte cualquier escena 3D en dibujo:

- **Filtro Kuwahara**: aplana las texturas de bloque en manchas de aguada sin perder los bordes.
- **Líneas de tinta**: salen de la profundidad (Sobel) y de un laplaciano. Tiemblan ("boil") a 8 fps, como una animación dibujada cuadro a cuadro.
- **Trama de sombreado** en las zonas oscuras, fibra de papel, manchas y bordes de página quemados.
- **Tinta roja**: es el único color saturado y se reserva para la lava y el fuego.

**El modo "boceto a lápiz"** se usa para las muertes sin clip (Kaumaru, OutConsumer, Paracetamor y la primera de Kakytron). Se ve distinto a propósito, para que quede claro que es una reconstrucción a partir de lo que ellos mismos contaron.

**Las notas a mano** son la firma de la segunda pasada:

- Texto en Caveat que se escribe letra por letra.
- Flechas, círculos y subrayados que se trazan en vivo y siguen al objeto en 3D (se proyecta su posición en cada frame).

**La cámara lenta** re-mapea el tiempo de la escena: la imagen pierde color (35 % monocromo), entran franjas de cine y la música baja a latidos.

**Los decretos** (cambios de dificultad) son motion graphics con tipografía de Minecraft:

- Un cuentakilómetros que gira hasta el día nuevo y un titular que se escribe con glitch.
- Tooltips del juego con códigos de color (dorado y rojo tachado).
- Un pedestal 3D con el mob de cada cambio, sobre un fondo de texturas del juego en mosaico.

**Tipografías**: Monocraft (Minecraft), Cinzel (épica), Fraktur, VT323 (terminal), Oswald, Caveat (mano) y Permanent Marker.

**Momentos épicos fuera de las muertes**: el título "PERMA / DEATH" hecho de bloques que sube desde la lava entre rayos, y el anillo con los 38 jugadores y sus skins reales.

## Skins reales

Cada jugador aparece con la skin que llevaba **cuando murió**, no con la de hoy. La prueba es su tarjeta oficial de muerte: @PermadeathSMP la tuiteó dentro del día y muestra la cara 8×8 del jugador en escala de grises.

**Cómo se verificó:**

1. Nombre de juego → UUID con la API de Mojang.
2. Historial de texturas de la cuenta en NameMC. NameMC bloquea curl con Cloudflare, así que los PNG se bajaron desde una sesión de navegador real.
3. Se comparó la cara de cada textura con la de la tarjeta, píxel por píxel en luminancia. Coincidencia = diferencia máxima menor a 1 nivel sobre 255.

| Resultado | Jugadores | Cómo aparece en el video |
| --- | --- | --- |
| Cara idéntica a la tarjeta | 33 de 38 | Skin completa |
| Muy parecida, no idéntica | FrigoAdri, Cibergun | La textura más parecida |
| Solo existe la skin actual | Shadoune666 | Rotulado "skin actual (la de 2020 no se conserva)" |
| Cuenta sin confirmar | Perxitaa, BarbeQ | Solo la cara 8×8 extraída de su tarjeta, cuerpo en sombra |

**Trampas encontradas:**

- Hay cuentas que hoy tienen el mismo nombre pero no son los jugadores de 2020 (por ejemplo `Luh`, `IbaiLlanos`, `alexelcapo`). Por eso se fue siempre por UUID y tarjeta, nunca por nombre.
- Varios jugadores usan la misma cabeza en muchas skins (Mikecrack, ElRichMC, CrisGreen, KillerCreeper55, Rubik). La tarjeta prueba la cara, no el cuerpo, así que se eligió la textura más cercana a la fecha de la muerte.
- Algunas tarjetas no coinciden con la primera textura que registró NameMC: el jugador había vuelto a una skin vieja, y NameMC registra cada textura una sola vez.

**El modelo 3D** (`film/src/skin3d.js`) arma el jugador directo desde el PNG:

- Las UV de Minecraft, con la capa de ropa encima.
- Detección de brazos finos (modelo "slim").
- Soporte de skins viejas de 64×32, con los miembros espejados.
- La regla de Minecraft para esas skins viejas: si la capa del sombrero es opaca entera, se ignora. Sin esa regla, el sombrero tapaba la cara de esos jugadores.

El registro completo (UUID, fuente y evidencia de cada archivo) está en `assets/skins/SKINS.md`.

## Recreación de las muertes

Las 33 muertes confirmadas tienen cada una su viñeta dibujada, de 7 a 10,7 segundos. A eso se suma la primera muerte de Kakytron, que fue anulada y aparece como boceto con sello. Los 6 baneos por AFK no se recrean porque no hubo muerte: aparecen como tarjeta de "permabaneado".

**Cada muerte es un módulo** (`film/src/deaths/dNN_jugador.js`) con la misma forma:

- **Datos**: número, jugador, día, fecha, momento del impacto y duración.
- **`chat`**: los mensajes del chat, textuales del clip (el mensaje vanilla y la frase de muerte personalizada).
- **`slow`**: los tramos en cámara lenta.
- **`build()`**: arma el mundo en vóxeles, los mobs y al jugador con su skin. Devuelve:
  - `cues` (sonidos), `hearts` (la vida en el HUD) y `notes` (las explicaciones dibujadas).
  - `overlay` (HUD 2D: hotbar, tooltips, citas).
  - `update(t)`, que ubica cámara, jugador y mobs para cada instante.

**El ciclo de cada muerte:**

1. La ficha visual del clip (`research/parts/`), cuadro a cuadro.
2. Un agente, o yo, escribe el módulo siguiendo `film/AGENT_GUIDE.md`.
3. `tools/preview.sh` renderiza frames sueltos y `tools/vframes.py` arma la hoja del clip real para compararlos lado a lado.
4. Se corrige y se vuelve a comparar.

**Ejemplos de cómo el clip manda sobre el dibujo:**

| Muerte | Lo que muestra el clip | Cómo quedó dibujado |
| --- | --- | --- |
| #3 Cecililla | El creeper nunca entra en cuadro | La explosión llega desde fuera de cuadro, con un rótulo que lo dice |
| #13 Tonacho | Pantano al amanecer, slime gigante, tótem, dos slimes y un creeper | El mismo encuadre. No hay esqueletos: el "combo flecha" es solo su relato |
| #32 ElRichMC | En el frame de 20:15 la élitra está en su inventario | Inventario replicado casilla por casilla, con la nota "¡la élitra estaba aquí!" |
| #37 KillerCreeper55 | Salón de hielo y cofres, medalla en la mano, tooltip "Shield" 0,2 s antes de morir | El mismo salón y la misma hotbar. El escudo sube tarde y una nota lo marca |

**Piezas compartidas** (`film/src/deaths/common.js`):

- `groundAt`: pega jugadores y mobs al suelo real del mundo. Antes, algunos flotaban o se hundían.
- `creeperFuse` y `walkCreeper`: el creeper camina, parpadea en blanco y se hincha antes de explotar.
- `totemPop`: el tótem salta en 2D encima de la imagen, con su textura real de 16×16 y giro, como en el juego.
- `hop`: el salto con aplastamiento de los slimes.

Después de cada impacto la viñeta sigue 1 segundo más (1,6 en las anuladas) para que se alcance a leer el mensaje de muerte.

## Música y sonido

Toda la banda sonora está sintetizada en el navegador, sin un solo sample. Se genera a partir de la lista de escenas y de los cues del propio video, así que cada golpe cae en su frame exacto.

**El sintetizador** (`film/src/audio/synth.js`) tiene 25 voces hechas con osciladores, ruido y envolventes. Entre ellas: bombo, braam de cine, coro con formantes de vocales, campanas, piano, trémolo de cuerdas, redoble de timbales, rugido, platillo, truenos, lluvia y latido.

**La base** (`film/src/audio/score.js`) está en re menor a 120 BPM, con un acorde cada 2 segundos:

- Pad, bajo sub, un ostinato de cuerdas pulsadas y batería. Cada 4 compases entra un redoble de taikos.
- La intensidad **sube con cada decreto**: el ostinato pasa de corcheas a semicorcheas y los filtros se abren.
- Desde el día 30 entran tambores de guerra. Desde el día 40 la progresión cambia a una más oscura, con semitonos (re → mi♭ → re → do♯).

**Lo que suena en cada momento clave:**

| Momento | Qué suena |
| --- | --- |
| Arranca una muerte | Whoosh y trémolo de cuerdas. Un redoble de timbales crece hasta el impacto |
| El impacto | **Silencio total de la base** 1,6 s. Suena solo el golpe según la causa (explosión, vacío, ahogo, flecha o golpe), con braam, coro y platillo |
| "¡Permadeath!" | Rugido sintetizado, campana y coro |
| Cámara lenta | Se corta la base. Quedan latidos cada 0,55 s, un barrido grave y un sub |
| Decreto | Riser, boom, platillo, braam, coro y campana. Cada regla nueva trae un golpe de metales que sube (re, fa, sol, la, do) |
| Memorial | Piano solo sobre un pad, con coro al final |

**El truco que más rindió** fue el silencio antes del golpe. La base se apaga justo en el impacto y en las cámaras lentas. Eso hace que cada muerte pegue más fuerte que si sumara capas.

**La mezcla final:**

1. Los 6 chunks se suman en float.
2. ffmpeg aplica `acompressor` y `alimiter`.
3. En el mux, `loudnorm` a −14 LUFS, el nivel de YouTube.

La suma cruda llegaba a un pico de 2,25 (más del doble del máximo). Sin el limitador, cada explosión habría saturado.

## Render y exportación

El MP4 sale en tres comandos: video, audio y mux. Cada rama se reparte en 6 procesos paralelos. En una sola PC, el video tardó 18,7 minutos y el audio 13,75.

```
node render.mjs --workers 6      # → out/video_noaudio.mp4
node render_audio.mjs 6          # → out/score.wav
ffmpeg -i out/video_noaudio.mp4 -i out/score.wav -map 0:v -map 1:a -c:v copy \
  -af loudnorm=I=-14:TP=-1.0:LRA=11 -c:a aac -b:a 256k -ar 48000 \
  -shortest -movflags +faststart out/PERMADEATH_v2.mp4
```

**Video** (`film/render.mjs`):

- Abre 6 páginas de Chromium headless, con la GPU habilitada y sin throttling de pestañas en segundo plano.
- Cada página recibe un rango de frames. Por cada frame llama a `FILM.renderFrame(n)`, saca el canvas en JPEG (calidad 0,96) y lo manda por pipe a su ffmpeg.
- ffmpeg codifica en H.264: preset slow, CRF 19, yuv420p, 30 fps.
- Al final, `concat -c copy` une los 6 segmentos sin volver a codificar.

**Audio** (`film/render_audio.mjs`): 6 ventanas de \~79 s en paralelo. Node junta el PCM y ffmpeg comprime y limita.

**Arreglos sin re-renderizar todo:** para corregir una escena se renderiza solo su rango (`--from`/`--to`), se reemplaza ese segmento y se vuelve a concatenar. Así se arregló la muerte de ElRichMC en v2: se reemplazó solo el segmento 4.

**Problemas que aparecieron y cómo se resolvieron:**

| Problema | Causa | Solución |
| --- | --- | --- |
| El audio en un solo hilo no terminaba nunca | Casi 8 minutos de partitura en un solo `OfflineAudioContext` | Partirlo en 6 ventanas por tiempo de inicio y sumarlas |
| Abrir 6 páginas daba timeout | Cada página construía las 55 escenas al cargar | Construir cada viñeta recién al usarla, abrir las páginas de a una y subir el timeout a 900 s |
| Colores que no coincidían con la paleta en el shader de tinta | Mezcla de espacios de color lineal y sRGB | Corregir con pow(1/2,2) y pasar los colores crudos |
| Las previews de los agentes se pisaban | Todas escribían en la misma carpeta temporal | Una carpeta temporal por llamada |

**Verificación del MP4 final:**

- Se decodificó completo con ffmpeg sin errores.
- Tiene 14.015 frames.
- No hay saltos en las uniones de segmentos.
- La sonoridad medida es −14 LUFS.

## Segunda pasada con 5 subagentes

La v1 (5:43) gustó, y la segunda pasada fue de pulido. Se atendió una lista de pedidos concretos del feedback y se repartieron 27 muertes entre 5 subagentes. Yo me quedé con los sistemas compartidos y las 7 muertes que requerían fuentes nuevas.

**Lo que pediste y dónde quedó:**

- **Física y composición**: `groundAt` para que nadie flote, y cámaras reencuadradas escena por escena.
- **Arañas** paradas sobre sus patas, **creepers** que se acercan, parpadean y explotan, **slimes** con cara.
- **Tótem** con su textura real y su giro, en 2D sobre la imagen.
- **Tiempo para leer**: 1 s más después de cada muerte.
- **Explicaciones dibujadas en todas las muertes**, trazadas en vivo, y cámara lenta en los momentos clave.
- **Decretos** con motion graphics y tipografía de Minecraft, y **música más épica** en muertes y decretos.

**Reparto:**

| Subagente | Muertes | Esfuerzo |
| --- | --- | --- |
| Overworld y cuevas | Alvaro, TheGamerMaldito, Ibai, Reven, Ander, Tonacho, RanguGamer | medio |
| Nether y End A | AKAWonder, FrigoAdri, Gona, EsVandal | medio |
| End B | Mikecrack, Cibergun, Alkapone, Nia | medio |
| Lote D | Cecililla, Felipez, Rubik, Zeling, Folagor, MrCarlos | medio-alto |
| Lote E | Brii, Kakytron, CrisGreen, KillerCreeper55, Luh, OmniRich | medio-alto |
| Yo | Kaumaru, OutConsumer, Paracetamor, Hardy, ElRichMC, Shadoune y la primera de Kakytron | — |

Los agentes arrancaron en esfuerzo medio. Cuando pediste medio-alto según la complejidad, los lotes D y E salieron así. Ninguno usó el máximo.

**Lo que hizo que 5 agentes pudieran trabajar a la vez sin romperse entre sí:**

- **`film/AGENT_GUIDE.md`** con reglas duras: datos solo de `research/parts` y `FACTS.md`, cada uno edita solo sus archivos, todos pegados al suelo con `groundAt`. También documenta la API de notas y de cámara lenta.
- **Sistemas compartidos en manos de uno solo**: notas, cámara lenta, tótem 2D, mobs y el motor de viñetas los toqué solo yo. Los agentes los usaron sin modificarlos.
- **Previews aisladas**: `preview.sh` usa una carpeta temporal por llamada.

**Lo que igual falló:**

- Un error de sintaxis de un agente rompió por un rato las previews de todos, porque todas cargan el mismo timeline.
- El compañero sin identificar de Ander salía con la skin de OmniRich. Se cambió por una silueta genérica.
- En la muerte de ElRichMC, las notas se superponían. Se corrigieron los tiempos y se re-renderizó solo ese segmento.

El resultado es la v2: 7:47, con todas las muertes revisadas contra sus frames.

## Aprendizajes

Lo más valioso no fue técnico: fue decidir que **el frame manda** y dejar por escrito qué no se sabe. Todo lo demás se apoya en eso.

**Investigación**

- **El clip le gana a la wiki.** Las 11 contradicciones se resolvieron mirando un frame o una tarjeta. La wiki incluso se contradice sola: la prosa dice una fecha y la tabla otra.
- **Las tarjetas oficiales de muerte fueron la mejor fuente.** En una sola imagen traen fecha y hora UTC, causa y la cara del skin.
- **"No se sabe" también es un dato.** Cada caso dudoso tiene su convención visual: boceto a lápiz, explosión desde fuera de cuadro o sello de "anulada". Así el video cierra sin inventar nada.
- **Las palabras del propio jugador desbloquean casos sin clip.** Paracetamor (el gateway) y el búnker de Kakytron salieron de sus entrevistas en el documental.

**Código y producción**

- **Determinismo desde el día uno.** Que cada frame dependa solo del tiempo es lo que permitió 6 workers, parches de un solo segmento y previews idénticas al render final.
- **Un motor compartido y módulos chicos.** Una muerte es un archivo de 122 líneas de media encima del motor de viñetas. Eso escaló a 33 escenas y a 5 agentes.
- **El ciclo de corrección más rápido:** frames sueltos del render al lado de la hoja de frames del clip real. No hace falta renderizar el video para ver si una escena está bien.
- **Construir las escenas solo cuando se usan.** Construirlas todas al cargar trababa el arranque del render.

**Agentes**

- **Reglas escritas y dueños de archivo claros** valen más que prompts largos. Con `AGENT_GUIDE.md` y un archivo por agente no hubo conflictos de edición.
- **Los sistemas compartidos no se delegan.** Cuando todos dependen del mismo motor, un error de uno frena a todos.
- **Esfuerzo medio alcanza** para arreglos puntuales. Medio-alto sirve para lotes que suman notas y cámara lenta.

**Audio**

- **Audio largo = ventanas por tiempo de inicio con cola completa, y después sumar.** La mezcla es exacta y se paraleliza.
- **El silencio pega más que otra capa.** Cortar la base justo en el impacto le dio a cada muerte más peso que cualquier braam.

**Creativo**

- **Dos lenguajes visuales separan hecho de relato.** Lo oficial va en Minecraft limpio. La muerte es un recuerdo dibujado.
- **Las notas a mano convierten el espectáculo en explicación.** Pero tienen que anclarse al objeto 3D; si no, flotan desconectadas de la acción.

## Números y archivos

El video final dura 7:47, pesa 1,57 GB y salió de unas 8.500 líneas de código propio.

| Dato | Valor |
| --- | --- |
| Duración | 7:47 (467,17 s) |
| Imagen | 1920×1080, 30 fps, 14.015 frames, H.264 a \~26,8 Mb/s |
| Sonido | AAC 256 kb/s, 48 kHz, −14 LUFS |
| Escenas | 55 |
| Muertes recreadas | 33, más la primera de Kakytron (anulada) |
| Baneos por AFK | 6, en 4 tarjetas |
| Decretos | 7 (días 10, 20, 25, 30, 40, 50 y 60) |
| Jugadores con skin | 38, más OmniRich |
| Contradicciones resueltas | 11 |
| Tuits oficiales recuperados | 128 |
| Subagentes | 9: 4 de investigación y 5 de segunda pasada |
| Código propio | \~8.500 líneas (sin contar three.js) |
| Tiempo de render | 18,7 min de video y 13,75 min de audio |

**Dónde está cada cosa** (en `/home/franescob/Gaming`):

| Ruta | Qué es |
| --- | --- |
| `out/PERMADEATH_v2.mp4` | El video final |
| `FACTS.md` | Hechos, fuentes, contradicciones y pendientes |
| `film/README.md` | Cómo previsualizar y renderizar |
| `film/AGENT_GUIDE.md` | Reglas para los subagentes |
| `film/src/timeline.js` | El orden de las 55 escenas |
| `film/src/vignette.js` | El motor de las viñetas de muerte |
| `film/src/deaths/` | Una muerte por archivo |
| `film/src/scenes/` | Intro, título, jugadores, decretos, tarjetas y memorial |
| `film/src/audio/` | Sintetizador y partitura |
| `assets/skins/SKINS.md` | Origen y evidencia de cada skin |
| `research/` | Notas, frames y evidencia |

Quedan dos exportaciones viejas en `out/`: `PERMADEATH.mp4` (v1, 1,22 GB) y `permadeath_v1.mp4` (4,92 GB). No las borré.

## Posibles mejoras

Lo que más sumaría ahora es cerrar pendientes con más clips multi-POV. Después vienen las versiones para distribuir. Nada de esto hace falta para que el video actual sea correcto.

**Datos que se podrían confirmar**

- **Clips de otros jugadores del mismo momento**: podrían mostrar el primer golpe de Folagor, Cibergun y Alkapone, si a KillerCreeper55 lo mató uno o dos creepers, y la duración del Death Train en cada muerte.
- **La skin de 2020 de Shadoune666**: buscarla en miniaturas y videos viejos suyos.
- **Las cuentas de Perxitaa y BarbeQ**: buscar su nombre en la lista de jugadores (tab) de algún clip, para usar su skin completa en vez de solo la cara.

**Distribución**

- **Capítulos de YouTube automáticos**: el timeline ya sabe dónde empieza cada escena (`tools/info.mjs`).
- **Subtítulos en inglés**: las notas y citas son datos con tiempos, así que se puede generar un `.srt` directo desde el código.
- **Un corte vertical para Shorts o TikTok** con 3 o 4 muertes. El motor ya permite renderizar cualquier rango, pero habría que recomponer los encuadres a 9:16.
- **Una versión liviana para compartir**: el master a \~26,8 Mb/s es ideal para subir, pero pesado para mandar por chat.

**Técnica**

- **Render más rápido**: hoy va a 12,7 fps de media. No medí si el límite es la GPU, la codificación JPEG o el x264 en preset slow. Medirlo diría si conviene sumar workers en otra máquina (la idea del VPS) o solo bajar el preset.
- **Un chequeo automático de escenas**: que falle si alguien flota, si una nota se sale de cuadro o si dos notas se pisan. Hoy eso se revisa a ojo en las previews.
