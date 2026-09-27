# PERMADEATH: crónica de los 60 días (motion graphics en código)

Un solo `index.html` con JavaScript, Canvas 2D, three.js y WebAudio. No usa metraje ni modelos de video: cada cuadro es una función pura del tiempo, así que se renderiza fuera de orden y en paralelo.

- `src/timeline.js`: la película, escena por escena.
- `src/deaths/dNN_*.js`: una recreación por muerte. El comentario de cabecera dice qué se vio en el clip y la fuente.
- `src/gl.js`: shader "tinta y acuarela" de las recreaciones (contornos por profundidad con temblor, tramado, papel).
- `src/skin3d.js`: modelo de jugador a partir del PNG de skin (UV reales de Minecraft, capa overlay, slim/classic).
- `src/voxel.js` y `src/mobs.js`: mundos y mobs con texturas pintadas en código.
- `src/audio/`: sintetizador y partitura generada desde los cues del timeline.
- Hechos y fuentes: `../FACTS.md`.

## Render
```
npm install                      # puppeteer-core, three, fuentes
node render.mjs --workers 6      # -> ../out/video_noaudio.mp4 (Chromium headless + ffmpeg)
node render_audio.mjs 6          # -> ../out/score.wav (partitura por tramos en paralelo)
ffmpeg -i ../out/video_noaudio.mp4 -i ../out/score.wav -map 0:v -map 1:a -c:v copy \
  -af loudnorm=I=-14:TP=-1.0:LRA=11 -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart ../out/PERMADEATH_v2.mp4
```
Previsualización: abrir `index.html` servido por un servidor local (`?t=segundos` para saltar), o `tools/preview.sh <escena> <t1,t2,...>` para hojas de contacto.
