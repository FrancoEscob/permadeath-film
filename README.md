# PERMADEATH · un film hecho 100 % en código

Un video de motion graphics de 7:47 sobre **Permadeath**, el servidor hardcore de ElRichMC (25/03 al 24/05/2020). No usa metraje ni modelos de video: todo sale de HTML, JavaScript, three.js y WebAudio, y se exportó frame a frame a MP4.

- **Video**: https://www.youtube.com/watch?v=yK6PzUACrbg
- **Cómo se hizo** (proceso, aprendizajes, costos y fuentes): https://permadeath-making-of.vercel.app

Lo hizo Claude Code (Claude Opus 5.5) con subagentes. La regla fue no inventar nada: cada muerte se contrastó con los frames de su clip, y lo que no se pudo confirmar quedó anotado en [`FACTS.md`](FACTS.md) y no se animó como hecho.

## Qué hay en el repo

| Ruta | Qué es |
| --- | --- |
| [`FACTS.md`](FACTS.md) | Cada muerte y cambio con su fuente, las 11 contradicciones entre fuentes, cómo se resolvieron y los pendientes |
| [`film/`](film) | El film: motor, 55 escenas, una muerte por archivo, sintetizador y partitura, scripts de render ([README](film/README.md)) |
| [`film/AGENT_GUIDE.md`](film/AGENT_GUIDE.md) | Las reglas que siguieron los subagentes de la segunda pasada |
| [`assets/skins/`](assets/skins) | Las skins reales de los jugadores y cómo se verificó cada una ([SKINS.md](assets/skins/SKINS.md)) |
| [`research/`](research) | Notas de investigación: fichas por muerte, cronología, tuits oficiales recuperados (JSON), copias de texto de las wikis |
| [`permadeath-making-of/`](permadeath-making-of) | La página del making-of (`build.py` la genera desde el doc y los costos) |
| [`costs/`](costs) | Script que suma tokens y costo de la sesión y de sus 18 subagentes |

## Cómo correrlo

Hace falta Node, Chromium en `/usr/bin/chromium`, ffmpeg y una GPU con WebGL2.

```
cd film && npm install && cd ..
python3 -m http.server 8000       # desde la raíz; abrir http://localhost:8000/film/index.html?t=120 (segundos)
cd film
node render.mjs --workers 6       # → ../out/video_noaudio.mp4
node render_audio.mjs 6           # → ../out/score.wav
ffmpeg -i ../out/video_noaudio.mp4 -i ../out/score.wav -map 0:v -map 1:a -c:v copy \
  -af loudnorm=I=-14:TP=-1.0:LRA=11 -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart ../out/PERMADEATH_v2.mp4
```

Cada frame es una función del tiempo, así que se puede renderizar cualquier rango (`--from` / `--to`) y reemplazar solo ese segmento.

## Qué no está en el repo

- **Los renders** (`out/`, unos 13 GB). El video final está en YouTube.
- **El material de terceros que se bajó solo para investigar**: clips de YouTube, audio, frames, subtítulos automáticos e imágenes de tuits. Es de sus creadores. En `FACTS.md`, en `research/*.md` y en la página del making-of están los links a cada original.

## Créditos

- Permadeath es de ElRichMC y sus participantes. Las skins pertenecen a cada jugador.
- Fuentes: GersoonSG ("TODAS LAS MU3RT3S PERMADEATH"), el documental de Rubik, las wikis de Fandom, @PermadeathSMP y los clips de cada jugador. La lista completa está en la página del making-of.
- Tipografías: Monocraft (OFL), Caveat, VT323, Permanent Marker, Cinzel, Oswald, Press Start 2P y UnifrakturCook (Google Fonts).
- three.js (MIT), puppeteer-core y ffmpeg.
- Minecraft es una marca de Mojang/Microsoft. Este es un proyecto de fans sin afiliación.
