# Builds index.html from the exported doc (doc.md) plus the usage snapshot (../costs/usage.json).
import html, json, re, datetime as dt
from pathlib import Path

HERE = Path(__file__).parent
md = (HERE / 'doc.md').read_text()
U = json.loads((HERE.parent / 'costs' / 'usage.json').read_text())

# ---------------------------------------------------------------- text fixes for the public page
FIX = [
    ('1 muerte revivida y 33 muertes en juego', '1 muerte revivida y 33 muertes en juego (32 jugadores y OmniRich)'),
    ('Las 33 muertes confirmadas tienen', 'Las 33 muertes confirmadas (32 jugadores y OmniRich) tienen'),
    ('| 33, más la primera de Kakytron (anulada) |', '| 33 (32 jugadores y OmniRich), más la primera de Kakytron (anulada) |'),
    ('(en `/home/franescob/Gaming`)', '(dentro de la carpeta del proyecto)'),
]
for a, b in FIX:
    assert md.count(a) == 1, a
    md = md.replace(a, b)
md = md.replace('\\~', '~').replace('\\]', ']')

# ---------------------------------------------------------------- the pipeline diagram (static copy of the doc widget)
def diagram():
    edge, ink, quiet, acc = '#7d7a86', '#ece8e1', '#a9a4ae', '#e0533d'
    def box(x, y, w, h, main=False):
        return (f"<rect x='{x}' y='{y}' width='{w}' height='{h}' rx='8' fill='{acc if main else 'none'}' "
                f"fill-opacity='{0.14 if main else 1}' stroke='{acc if main else edge}' stroke-width='{2 if main else 1.25}'/>")
    def t(x, y, s, big=False, color=None, anchor='start'):
        w = " font-size='13' font-weight='600'" if big else ''
        return f"<text x='{x}' y='{y}'{w} fill='{color or ink}' text-anchor='{anchor}'>{html.escape(s)}</text>"
    arrows = ['M380 128V160H200V192', 'M380 160H560V192', 'M200 280V304', 'M560 280V304', 'M200 376V400', 'M560 376V400', 'M560 472V496H380V520']
    parts = [f"<svg viewBox='0 0 760 600' role='img' aria-label='El video y la música salen del mismo guion' font-size='11.5' font-family='inherit'>",
             f"<defs><marker id='ar' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill='{edge}'/></marker></defs>",
             t(24, 32, 'El video y la música salen del mismo guion: cada frame es función del tiempo').replace("<text", "<text font-size='15' font-weight='600'", 1),
             f"<g fill='none' stroke='{edge}' stroke-width='1.25'>" + ''.join(f"<path d='{d}' marker-end='url(#ar)'/>" for d in arrows) + "<path d='M200 472V496H380'/></g>",
             t(290, 152, 'imagen: frames', color=quiet, anchor='middle'), t(470, 152, 'música: cues en JSON', color=quiet, anchor='middle'),
             box(160, 56, 440, 72), t(176, 80, 'timeline.js · 55 escenas en orden', True), t(176, 96, 'cada frame = función del tiempo: FILM.renderFrame(n)'), t(176, 112, 'las mismas marcas de tiempo mueven imagen y música'),
             box(40, 192, 320, 88), t(56, 216, '6 workers de Chromium headless', True), t(56, 232, 'GPU real: WebGL2 vía ANGLE'), t(56, 248, 'three.js → Canvas 2D → shader de post'), t(56, 264, 'cada worker renderiza un rango de frames'),
             box(400, 192, 320, 88), t(416, 216, '6 chunks de OfflineAudioContext', True), t(416, 232, 'ventanas de ~79 s sobre el mismo guion'), t(416, 248, 'cada evento suena en la ventana donde'), t(416, 264, 'empieza, con su cola completa'),
             box(40, 304, 320, 72), t(56, 328, 'ffmpeg libx264 por pipe', True), t(56, 344, 'JPEG del canvas · CRF 19 · preset slow'), t(56, 360, 'un segmento .mp4 por worker'),
             box(400, 304, 320, 72), t(416, 328, 'Node suma el PCM en float', True), t(416, 344, 'ffmpeg: acompressor + alimiter'), t(416, 360, 'una sola mezcla, sin cortes entre chunks'),
             box(40, 400, 320, 72), t(56, 424, 'concat -c copy → video_noaudio.mp4', True), t(56, 440, '18,7 min a 12,7 fps de media'), t(56, 456, 'un arreglo = re-renderizar un segmento'),
             box(400, 400, 320, 72), t(416, 424, 'score.wav', True), t(416, 440, '6 chunks en paralelo: ~14 min'), t(416, 456, 'en un solo hilo nunca terminaba'),
             box(160, 520, 440, 56, True), t(176, 544, 'mux + loudnorm (I = −14 LUFS)', True), t(176, 560, 'PERMADEATH_v2.mp4 · 7:47 · 14.015 frames · 1,6 GB'),
             '</svg>']
    return "<figure class='diagram'>" + ''.join(parts) + "<figcaption>Pipeline de render: una fuente, dos ramas, un mux.</figcaption></figure>"

# ---------------------------------------------------------------- tiny markdown → html (only what doc.md uses)
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    return s

def slug(s):
    s = s.lower()
    for a, b in zip('áéíóúñ', 'aeioun'): s = s.replace(a, b)
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def render(md):
    out, toc, lines, i = [], [], md.split('\n'), 0
    def lst(i):
        # parse a (possibly nested) list starting at line i
        ordered = bool(re.match(r'\s*\d+\. ', lines[i])); ind = len(lines[i]) - len(lines[i].lstrip())
        items, tag = [], 'ol' if ordered else 'ul'
        while i < len(lines) and lines[i].strip():
            l = lines[i]; cur = len(l) - len(l.lstrip())
            if cur > ind:
                sub, i = lst(i); items[-1] += sub; continue
            if cur < ind or not re.match(r'\s*(-|\d+\.) ', l): break
            items.append(inline(re.sub(r'^\s*(-|\d+\.) ', '', l))); i += 1
        return f'<{tag}>' + ''.join(f'<li>{x}</li>' for x in items) + f'</{tag}>', i
    while i < len(lines):
        l = lines[i]
        if not l.strip() or l.startswith('# ') or re.match(r'^[A-Z][a-z]{2} \d+, \d{4} · ', l): i += 1; continue
        if l.startswith('## '):
            h = l[3:].strip(); sid = slug(h); toc.append((sid, h))
            if len(toc) > 1: out.append('</section>')
            out.append(f"<section id='{sid}'><h2>{inline(h)}</h2>"); i += 1; continue
        if l.startswith('&#91;embedded content'):
            out.append(diagram()); i += 1; continue
        if l.startswith('```'):
            j = i + 1; buf = []
            while not lines[j].startswith('```'): buf.append(lines[j]); j += 1
            out.append('<pre><code>' + html.escape('\n'.join(buf)) + '</code></pre>'); i = j + 1; continue
        if l.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                if not re.match(r'^\|[\s\-|]+\|$', lines[i]): rows.append([c.strip() for c in lines[i].strip('|').split(' | ')])
                i += 1
            head, body = rows[0], rows[1:]
            out.append("<div class='tbl'><table><thead><tr>" + ''.join(f'<th>{inline(c)}</th>' for c in head) + '</tr></thead><tbody>' +
                       ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in body) + '</tbody></table></div>'); continue
        if re.match(r'\s*(-|\d+\.) ', l):
            h, i = lst(i); out.append(h); continue
        buf = []
        while i < len(lines) and lines[i].strip() and not re.match(r'(\s*(-|\d+\.) |\||```|## )', lines[i]): buf.append(lines[i]); i += 1
        out.append('<p>' + inline(' '.join(buf)) + '</p>')
    out.append('</section>')
    return '\n'.join(out), toc

# ---------------------------------------------------------------- cost + time section (from the usage snapshot)
ROLE = {
    'main': ('Sesión principal (yo)', 'Orquestación, motor, escenas, render, doc'),
    'a4dcb6b4412a8d4c7': ('Investigación · panorama', 'Ediciones, reglas, cambios, tuits'),
    'a9e28f79b6c3287b5': ('Investigación · muertes', 'Lanzó 4 sub-agentes'),
    'a2bc110c0af55f51c': ('↳ muertes · grupo', 'Sub-agente'), 'aa0dd14c82db0950d': ('↳ muertes · grupo', 'Sub-agente'),
    'a7dacfd04b5ed2416': ('↳ muertes · grupo', 'Sub-agente'), 'af9c18b09233ed2ff': ('↳ muertes · grupo', 'Sub-agente'),
    'a1ceb9fd9b0824a91': ('Investigación · skins', 'NameMC, Mojang, tarjetas'),
    'aa6ec9bc6ae818ba2': ('Investigación · recon visual', 'Lanzó 5 sub-agentes'),
    'a521b45bba063e132': ('↳ recon visual · lote A', 'Sub-agente'), 'aebd8fb3496c86c88': ('↳ recon visual · lote B', 'Sub-agente'),
    'af310306c07740eb3': ('↳ recon visual · lote C', 'Sub-agente'), 'ae9d3dcac210a9f74': ('↳ recon visual · lote D', 'Sub-agente'),
    'abe6c84dbdf2d8579': ('↳ recon visual · lote E', 'Sub-agente'),
    'a4f874c62d73636ea': ('2.ª pasada · Overworld y cuevas', '7 muertes · esfuerzo medio'),
    'abbffa3c84c23da2f': ('2.ª pasada · Nether y End A', '4 muertes · esfuerzo medio'),
    'aa96fe602e1e65b9c': ('2.ª pasada · End B', '4 muertes · esfuerzo medio'),
    'a65d93910bcfa2fcd': ('2.ª pasada · lote D', '6 muertes · esfuerzo medio-alto'),
    'adc249a27e4e1df82': ('2.ª pasada · lote E', '6 muertes · esfuerzo medio-alto'),
}
ORDER = list(ROLE)
P = U['price']
def n(x): return f'{x:,.0f}'.replace(',', '.')
def usd(x): return 'US$ ' + f'{x:,.2f}'.replace(',', 'X').replace('.', ',').replace('X', '.')
def mtok(x): return f'{x / 1e6:,.2f}'.replace(',', 'X').replace('.', ',').replace('X', '.') + ' M'
T = U['total']
tok_total = T['inp'] + T['cw'] + T['rd'] + T['out']
cost = dict(inp=T['inp'] * P['inp'] / 1e6, w5=T['w5'] * P['w5'] / 1e6, w1=T['w1'] * P['w1'] / 1e6, rd=T['rd'] * P['rd'] / 1e6, out=T['out'] * P['out'] / 1e6)
rows = sorted(U['rows'], key=lambda r: ORDER.index(r['name']))
local = lambda s: (dt.datetime.fromisoformat(s) - dt.timedelta(hours=3))
span0, span1 = local(U['span'][0]), local(U['span'][1])
wall = span1 - span0; active = dt.timedelta(seconds=U['active_s']); idle = wall - active
agents_time = sum((dt.datetime.fromisoformat(r['end']) - dt.datetime.fromisoformat(r['start']) for r in U['rows'] if r['name'] != 'main'), dt.timedelta())
hm = lambda d: (f"{int(d.total_seconds() // 3600)} h {int(d.total_seconds() % 3600 // 60):02d} min" if d.total_seconds() >= 3600 else f"{int(d.total_seconds() // 60)} min")
share_rd = cost['rd'] / T['usd'] * 100
searches = U['tools'].get('WebSearch', 0); fetches = U['tools'].get('WebFetch', 0)

cost_html = f"""
<section id='costo-tokens-y-tiempo'><h2>Costo, tokens y tiempo</h2>
<p>Todo el proyecto usó <strong>{mtok(tok_total)} tokens</strong> en <strong>{n(T['calls'])} llamadas</strong> a la API: la sesión principal más 18 subagentes. Al precio de lista de Claude Opus 5.5, eso equivale a <strong>{usd(T['usd'])}</strong>. Pasaron <strong>{hm(wall)}</strong> de reloj, de las {span0:%H:%M} a las {span1:%H:%M} (hora de Argentina).</p>
<div class='kpis'>
 <div><b>{usd(T['usd'])}</b><span>equivalente API</span></div>
 <div><b>{mtok(tok_total)}</b><span>tokens en total</span></div>
 <div><b>{hm(wall)}</b><span>de reloj</span></div>
 <div><b>{hm(agents_time)}</b><span>sumando los 18 subagentes</span></div>
</div>
<h3>Tokens y costo por tipo</h3>
<p>El {share_rd:.0f} % del costo son <strong>lecturas de caché</strong>: cada llamada relee el contexto acumulado. A $0,20 por millón son baratas, pero fueron {mtok(T['rd'])}.</p>
<div class='tbl'><table><thead><tr><th>Tipo</th><th>Tokens</th><th>Precio Opus 5.5 (por millón)</th><th>Costo</th></tr></thead><tbody>
<tr><td>Entrada sin caché</td><td>{n(T['inp'])}</td><td>US$ 4</td><td>{usd(cost['inp'])}</td></tr>
<tr><td>Escritura de caché (5 min)</td><td>{n(T['w5'])}</td><td>US$ 5</td><td>{usd(cost['w5'])}</td></tr>
<tr><td>Escritura de caché (1 h)</td><td>{n(T['w1'])}</td><td>US$ 8</td><td>{usd(cost['w1'])}</td></tr>
<tr><td>Lectura de caché</td><td>{n(T['rd'])}</td><td>US$ 0,20</td><td>{usd(cost['rd'])}</td></tr>
<tr><td>Salida</td><td>{n(T['out'])}</td><td>US$ 20</td><td>{usd(cost['out'])}</td></tr>
<tr class='sum'><td>Total</td><td>{n(tok_total)}</td><td></td><td>{usd(T['usd'])}</td></tr>
</tbody></table></div>
<h3>Por agente</h3>
<p>Son 19 filas: la sesión principal y los 18 subagentes. La investigación fue lo más caro después de la sesión principal: 13 agentes leyendo frames, tuits y wikis en paralelo. Todos corrieron en Opus 5.5 a velocidad estándar.</p>
<div class='tbl'><table class='num'><thead><tr><th>Agente</th><th>Qué hizo</th><th>Llamadas</th><th>Entrada + caché</th><th>Salida</th><th>Costo</th></tr></thead><tbody>
""" + ''.join(f"<tr{' class=sub' if ROLE[r['name']][0].startswith('↳') else ''}><td>{ROLE[r['name']][0]}</td><td>{ROLE[r['name']][1]}</td><td>{n(r['calls'])}</td><td>{mtok(r['inp'] + r['cw'] + r['rd'])}</td><td>{n(r['out'])}</td><td>{usd(r['usd'])}</td></tr>" for r in rows) + f"""
</tbody></table></div>
<h3>Tiempo</h3>
<div class='tbl'><table><thead><tr><th>Hora (AR)</th><th>Hito</th></tr></thead><tbody>
<tr><td>20:38</td><td>Pedido inicial</td></tr>
<tr><td>20:39 – 22:19</td><td>Investigación: 4 agentes y 9 sub-agentes en paralelo, mientras yo armaba el motor</td></tr>
<tr><td>22:11 – 22:44</td><td>Primeros renders: audio, video y la v1 (5:43)</td></tr>
<tr><td>23:07</td><td>Tu feedback de la v1</td></tr>
<tr><td>23:13 – 23:59</td><td>Segunda pasada con 5 subagentes</td></tr>
<tr><td>23:59 – 00:25</td><td>Render de la v2, parche del segmento 4 y mux final</td></tr>
<tr><td>00:35 – {span1:%H:%M}</td><td>Doc, costos, esta página, el repo de GitHub y el video en YouTube</td></tr>
</tbody></table></div>
<ul>
<li><strong>Tiempo con actividad</strong>: {hm(active)}. Cuento como pausa todo hueco de más de 10 minutos sin ninguna acción de ningún agente; hubo 3, que suman {hm(idle)}.</li>
<li><strong>Tiempo de máquina en renders</strong>: 58 minutos de video (v1, v1b, v2 y el parche) y 27 de audio. Buena parte corrió en paralelo con otro trabajo.</li>
<li><strong>Trabajo en paralelo</strong>: sumando la duración de cada subagente salen {hm(agents_time)}. Eso es más del doble del tiempo de reloj.</li>
</ul>
<h3>Qué no entra en la cuenta</h3>
<ul>
<li><strong>La compactación de contexto</strong> (1 vez, sobre ~968.000 tokens) no queda registrada en el transcript. Suma entre ~US$ 0,50 y ~US$ 4, según cuánto estuviera en caché.</li>
<li><strong>Las {searches} búsquedas web</strong> cuestan US$ 10 cada 1.000 ({usd(searches * 10 / 1000)}), más los tokens de esas búsquedas, que tampoco se registran.</li>
<li><strong>Las {fetches} lecturas de páginas web</strong> las resume un modelo chico aparte, y su uso tampoco se registra.</li>
<li><strong>Es un equivalente</strong>: suma el uso registrado a precio de lista de la API. Si la sesión corrió con una suscripción, el cobro real es otro.</li>
<li><strong>Foto al momento de generar esta página</strong>: lo que pase después (incluido publicarla) no está sumado.</li>
</ul>
<p class='muted'>Fuente: los transcripts de Claude Code (sesión y subagentes). Cada respuesta se cuenta una sola vez por su id de mensaje. Precios de <a href='https://platform.claude.com/docs/en/about-claude/pricing'>platform.claude.com/docs/en/about-claude/pricing</a>: Opus 5.5 cobra US$ 4 la entrada, US$ 5 y 8 las escrituras de caché de 5 min y 1 h, US$ 0,20 las lecturas de caché y US$ 20 la salida; el contexto de 1M va a tarifa estándar. Script: <code>costs/usage.py</code>.</p>
</section>"""

body, toc = render(md)
toc.append(('costo-tokens-y-tiempo', 'Costo, tokens y tiempo'))
toc.append(('links-y-recursos', 'Links y recursos'))

# ---------------------------------------------------------------- links (every YouTube source was checked with YouTube's oEmbed)
VIDEO = 'yK6PzUACrbg'
REPO = 'https://github.com/FrancoEscob/permadeath-film'
SITE = 'https://permadeath-making-of.vercel.app'
YT = json.loads((HERE / 'sources_youtube.json').read_text())
MAIN_YT = {'vYTcFdeAxE0': 'un capítulo por muerte: la base de cada recreación',
           'QhHMTOs40mo': 'contexto, fechas y las palabras de los jugadores',
           '7i83fhYvBZo': 'entrevistas a los jugadores'}
RICH_YT = [k for k, v in YT.items() if v['author'].startswith('ElRichMC')]
CLIPS = [k for k in YT if k not in MAIN_YT and k not in RICH_YT]
def a(url, text): return f"<a href='{html.escape(url, quote=True)}' target='_blank' rel='noopener'>{html.escape(text)}</a>"
def by(s): return f" <span class='by'>· {html.escape(s)}</span>"
def yt(k): return a(f'https://www.youtube.com/watch?v={k}', YT[k]['title']) + by(YT[k]['author'])
WIKI, WIKI2 = 'https://permadeath.fandom.com/es/wiki/', 'https://permadeath-wiki.fandom.com/es/wiki/'
GROUPS = [
    ('Este proyecto', [a(f'https://www.youtube.com/watch?v={VIDEO}', 'El video final en YouTube') + by('PERMADEATH video by Opus 5.5'),
                       a(REPO, 'El código en GitHub') + by('film, investigación, skins, esta página y el cálculo de costos'),
                       a(SITE, 'Esta página')]),
    ('Fuentes principales', [yt(k) + by(note) for k, note in MAIN_YT.items()]),
    ('Permadeath: sitios y datos', [
        a('https://www.youtube.com/@ElRichMC', 'Canal de YouTube de ElRichMC'),
        a('https://x.com/PermadeathSMP', '@PermadeathSMP en X') + ' · ' + a('https://web.archive.org/web/2020/https://twitter.com/PermadeathSMP', 'su archivo en el Wayback Machine') + by('de ahí salieron los 128 tuits, las tarjetas de muerte y las imágenes de cada cambio'),
        a(WIKI + 'Muertes', 'Wiki de Permadeath: Muertes') + ' · ' + a(WIKI + 'Participantes', 'Participantes') + ' · ' + a(WIKI + 'Cambios_de_dificultad', 'Cambios de dificultad'),
        a(WIKI2 + 'Permadeath', 'Permadeath Wiki') + by('otra wiki de fans, con páginas por día y por jugador'),
        a('https://twitchtracker.com/elrichmc/streams', 'TwitchTracker: directos de ElRichMC') + by('fechas de los directos'),
        a('https://bolavip.com/gamer/La-serie-de-Minecraft-Permadeath-2-se-retrasa-hasta-2022-20210601-0029.html', 'Bolavip: Permadeath 2 se retrasa') + by('2021'),
        a('https://www.spigotmc.org/resources/permadeathcore-%E2%98%A0%EF%B8%8F.78993/', 'PermaDeathCore en SpigotMC') + by('plugin de fans; no está confirmado que sea el del servidor'),
        a('https://github.com/seulloaca/Permadeath', 'seulloaca/Permadeath en GitHub') + by('recreación del plugin hecha por fans'),
    ]),
    ('Episodios de ElRichMC citados', [yt(k) for k in RICH_YT]),
    (f'Otros {len(CLIPS)} videos citados: POV de los jugadores, multi-POV, reacciones y explicaciones', [yt(k) for k in CLIPS]),
    ('Skins', [a('https://namemc.com/', 'NameMC') + by('historial de skins de cada cuenta'),
               a('https://minecraft.wiki/w/Mojang_API', 'API de Mojang') + by('nombre → UUID → skin actual')]),
    ('Herramientas', [a('https://claude.com/product/claude-code', 'Claude Code') + by('Claude Opus 5.5 y sus subagentes'),
                      a('https://threejs.org', 'three.js') + by('3D'), a('https://pptr.dev', 'Puppeteer') + by('maneja Chromium headless'),
                      a('https://www.chromium.org', 'Chromium'), a('https://ffmpeg.org', 'FFmpeg') + by('codificación y mezcla'),
                      a('https://vercel.com', 'Vercel') + by('hosting de esta página')]),
    ('Tipografías', [a('https://github.com/IdreesInc/Monocraft', 'Monocraft') + by('la letra de Minecraft'),
                     a('https://fonts.google.com/specimen/Caveat', 'Caveat') + by('las notas a mano'),
                     a('https://fonts.google.com/specimen/VT323', 'VT323'), a('https://fonts.google.com/specimen/Permanent+Marker', 'Permanent Marker'),
                     a('https://fonts.google.com/specimen/Cinzel', 'Cinzel'), a('https://fonts.google.com/specimen/Oswald', 'Oswald'),
                     a('https://fonts.google.com/specimen/Press+Start+2P', 'Press Start 2P'), a('https://fonts.google.com/specimen/UnifrakturCook', 'UnifrakturCook')]),
    ('Precios', [a('https://platform.claude.com/docs/en/about-claude/pricing', 'Precios de la API de Claude') + by('base del cálculo de costos')]),
]
def group(title, items):
    ul = '<ul class="links">' + ''.join(f'<li>{x}</li>' for x in items) + '</ul>'
    if len(items) > 12: return f"<details><summary>{html.escape(title)}</summary>{ul}</details>"
    return f'<h3>{html.escape(title)}</h3>{ul}'
links_html = ("<section id='links-y-recursos'><h2>Links y recursos</h2>"
              f"<p>Todo lo que usamos y que es público en internet. Los {len(YT)} videos de YouTube se verificaron uno por uno y siguen disponibles; otros 2 que citaba la investigación ya no lo están y no se enlazan. "
              "Las tarjetas de muerte, los tuits y los frames se usaron solo para contrastar datos: acá están los originales.</p>"
              + ''.join(group(t, i) for t, i in GROUPS) + '</section>')
GAL = [('title', 'Título 3D: PERMA / DEATH hecho de bloques, sobre la lava'), ('players', 'Presentación: cada jugador con su skin real'),
       ('decree', 'Decreto del día 40, con el Gato Supernova en el pedestal'), ('tonacho', 'Tonacho, día 26: salta el tótem'),
       ('rich', 'ElRichMC, día 56: el inventario copiado del frame real'), ('killer', 'KillerCreeper55, día 60: notas a mano sobre el Ender Quantum Creeper'),
       ('nia', 'Nia, día 38: el tótem salta entre endermen'), ('memorial', 'Memorial: 32 jugadores muertos y 6 baneados por inactividad')]
gallery = "<div class='gallery'>" + ''.join(f"<figure><img src='img/{f}.jpg' alt='{html.escape(c)}' loading='lazy' width='1280' height='720'><figcaption>{html.escape(c)}</figcaption></figure>" for f, c in GAL) + '</div>'

page = f"""<!doctype html>
<html lang='es'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>PERMADEATH · cómo se hizo el video</title>
<meta name='description' content='Making-of de un film de motion graphics sobre Permadeath hecho 100 % en código: investigación, skins reales, muertes redibujadas, música sintetizada, render y costos.'>
<meta property='og:title' content='PERMADEATH · cómo se hizo el video'><meta property='og:image' content='https://permadeath-making-of.vercel.app/img/title.jpg'><meta property='og:url' content='https://permadeath-making-of.vercel.app'><meta name='twitter:card' content='summary_large_image'>
<style>
@font-face{{font-family:MC;src:url(fonts/monocraft.ttf) format('truetype');font-display:swap}}
@font-face{{font-family:Hand;src:url(fonts/caveat700.woff2) format('woff2');font-display:swap}}
@font-face{{font-family:VT;src:url(fonts/vt323.woff2) format('woff2');font-display:swap}}
:root{{--bg:#0d0c0f;--panel:#16141a;--line:#2a2630;--ink:#ece8e1;--muted:#a9a4ae;--red:#e0533d;--gold:#f0b84a;--green:#6bd16b}}
*{{box-sizing:border-box}}html{{scroll-behavior:smooth}}
body{{margin:0;background:var(--bg);color:var(--ink);font:17px/1.65 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}}
a{{color:var(--gold)}}
header.hero{{position:relative;min-height:78vh;display:flex;align-items:flex-end;background:#000 url(img/title.jpg) center/cover no-repeat}}
header.hero::after{{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,12,15,.1) 0%,rgba(13,12,15,.55) 55%,var(--bg) 100%)}}
.hero .in{{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 24px 56px;width:100%}}
.kicker{{font-family:VT;font-size:26px;color:var(--gold);letter-spacing:.04em}}
h1{{font-family:MC;font-size:clamp(34px,6vw,68px);line-height:1.05;margin:.1em 0 .25em;color:#fff;text-shadow:4px 4px 0 #5a1208}}
h1 span{{color:var(--red)}}
.lede{{max-width:760px;font-size:19px;color:#ddd6cc}}
.hand{{font-family:Hand;font-size:30px;color:var(--gold);transform:rotate(-2deg);display:inline-block;margin-top:6px}}
.stats{{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}}
.stats span{{font-family:VT;font-size:22px;background:rgba(0,0,0,.55);border:2px solid #3b3542;padding:2px 12px}}
.wrap{{max-width:1100px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:230px minmax(0,1fr);gap:48px}}
nav.toc{{position:sticky;top:24px;align-self:start;font-size:14px;padding-top:40px}}
nav.toc b{{font-family:VT;font-size:22px;color:var(--muted);font-weight:400}}
nav.toc ol{{list-style:none;padding:0;margin:8px 0 0;counter-reset:s}}
nav.toc li{{counter-increment:s;margin:4px 0}}
nav.toc a{{color:var(--muted);text-decoration:none}}nav.toc a::before{{content:counter(s,decimal-leading-zero)' ';font-family:VT;color:var(--red)}}
nav.toc a:hover{{color:var(--ink)}}
main{{min-width:0;padding-bottom:80px}}
section{{padding-top:40px}}
h2{{font-family:MC;font-size:26px;line-height:1.25;margin:0 0 14px;padding-bottom:10px;border-bottom:2px solid var(--line)}}
h2::before{{content:'■ ';color:var(--red)}}
h3{{font-size:18px;margin:26px 0 8px;color:var(--gold)}}
p{{margin:0 0 14px}}ul,ol{{margin:0 0 16px;padding-left:22px}}li{{margin:4px 0}}li::marker{{color:var(--red)}}
strong{{color:#fff}}
code{{font-family:VT,ui-monospace,monospace;font-size:1.12em;background:#221f27;border:1px solid #332e3a;padding:0 5px;border-radius:3px;color:#ffd98a;word-break:break-word}}
pre{{background:#0a090c;border:1px solid var(--line);border-radius:6px;padding:14px 16px;overflow:auto}}
pre code{{background:none;border:0;padding:0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13.5px;color:#d9f2c8}}
.tbl{{overflow-x:auto;margin:0 0 18px;border:1px solid var(--line);border-radius:6px}}
table{{border-collapse:collapse;width:100%;font-size:14.5px}}
th{{text-align:left;background:#1d1a22;color:var(--gold);font-weight:600;padding:9px 12px;border-bottom:1px solid var(--line);white-space:nowrap}}
td{{padding:8px 12px;border-bottom:1px solid #221f27;vertical-align:top}}
tr:last-child td{{border-bottom:0}}tr:nth-child(even) td{{background:#121015}}
table.num td:nth-child(n+3){{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}}
tr.sub td:first-child{{color:var(--muted);padding-left:22px}}
tr.sum td{{font-weight:700;color:#fff;border-top:2px solid var(--line)}}
figure{{margin:0}}
.diagram{{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:12px;margin:8px 0 18px}}
.diagram svg{{width:100%;height:auto;display:block;font-family:system-ui,sans-serif}}
figcaption{{font-size:13px;color:var(--muted);margin-top:6px}}
.gallery{{max-width:1100px;margin:-10px auto 0;padding:0 24px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px}}
.gallery img{{width:100%;height:auto;display:block;border:2px solid #2d2833;image-rendering:auto}}
.gallery figcaption{{font-size:12.5px;line-height:1.35}}
.kpis{{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0 8px}}
.kpis div{{background:var(--panel);border:2px solid #3b3542;padding:12px 14px}}
.kpis b{{display:block;font-family:VT;font-size:34px;line-height:1;color:var(--gold);font-weight:400}}
.kpis span{{font-size:13px;color:var(--muted)}}
.muted{{color:var(--muted);font-size:14px}}
footer{{border-top:2px solid var(--line);color:var(--muted);font-size:14px;text-align:center;padding:28px 24px 40px;line-height:2}}
.cta{{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}}
.btn{{font-family:VT;font-size:24px;line-height:1.3;text-decoration:none;color:#fff;background:#2a2530;border:2px solid #4a4352;padding:4px 16px;box-shadow:inset -3px -3px 0 rgba(0,0,0,.35),inset 3px 3px 0 rgba(255,255,255,.12)}}
.btn:hover{{background:#3a3342}}.btn.red{{background:#8e1f12;border-color:#c43a26}}.btn.red:hover{{background:#a8281a}}
.watch{{max-width:1100px;margin:0 auto 34px;padding:0 24px}}
.frame{{position:relative;aspect-ratio:16/9;background:#000;border:3px solid #3b3542;box-shadow:0 20px 60px rgba(0,0,0,.6)}}
.frame iframe{{position:absolute;inset:0;width:100%;height:100%;border:0}}
.watch .cap{{font-size:13px;color:var(--muted);margin:8px 0 0}}
ul.links{{padding-left:20px}}ul.links li{{margin:6px 0;font-size:15.5px}}
.by{{color:var(--muted);font-size:14px}}
details{{margin:22px 0 8px;border:1px solid var(--line);border-radius:6px;padding:10px 14px;background:var(--panel)}}
summary{{cursor:pointer;color:var(--gold);font-weight:600}}
details[open] summary{{margin-bottom:8px}}
@media (max-width:900px){{header.hero::after{{background:linear-gradient(180deg,rgba(13,12,15,.55) 0%,rgba(13,12,15,.8) 50%,var(--bg) 100%)}}.wrap{{grid-template-columns:1fr}}nav.toc{{position:static;padding-top:24px}}.gallery{{grid-template-columns:repeat(2,1fr)}}.kpis{{grid-template-columns:repeat(2,1fr)}}}}
</style></head>
<body>
<header class='hero'><div class='in'>
 <div class='kicker'>MAKING-OF · 27/09/2026</div>
 <h1>PERMA<span>DEATH</span>:<br>cómo se hizo el video</h1>
 <p class='lede'>Un film de motion graphics de 7:47 sobre el servidor hardcore de ElRichMC, hecho 100 % en código. Las 33 muertes están redibujadas a partir de sus clips, los jugadores aparecen con sus skins reales y la música se sintetiza en el navegador. Ningún dato está inventado.</p>
 <div class='hand'>el frame manda.</div>
 <div class='stats'><span>1920×1080 · 30 fps</span><span>14.015 frames</span><span>55 escenas</span><span>38 jugadores</span><span>−14 LUFS</span><span>{usd(T['usd'])} equivalente API</span></div>
 <div class='cta'><a class='btn red' href='#video'>▶ Ver el video</a><a class='btn' href='https://www.youtube.com/watch?v={VIDEO}' target='_blank' rel='noopener'>YouTube</a><a class='btn' href='{REPO}' target='_blank' rel='noopener'>Código en GitHub</a></div>
</div></header>
<div class='watch' id='video'><div class='frame'><iframe src='https://www.youtube-nocookie.com/embed/{VIDEO}?rel=0' title='PERMADEATH video by Opus 5.5' loading='lazy' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe></div>
<p class='cap'>La versión final, 7:47. Mejor en pantalla grande y con sonido.</p></div>
{gallery}
<div class='wrap'>
<nav class='toc'><b>ÍNDICE</b><ol>{''.join(f"<li><a href='#{s}'>{html.escape(h)}</a></li>" for s, h in toc)}</ol></nav>
<main>
{body}
{cost_html}
{links_html}
</main></div>
<footer><a href='https://www.youtube.com/watch?v={VIDEO}' target='_blank' rel='noopener'>Video</a> · <a href='{REPO}' target='_blank' rel='noopener'>Código</a><br>PERMADEATH (ElRichMC, 2020) · film y making-of hechos con Claude Code (Opus 5.5) · Minecraft es una marca de Mojang/Microsoft; este es un proyecto de fans sin afiliación.</footer>
</body></html>"""
(HERE / 'index.html').write_text(page)
print('ok', len(page), 'bytes;', len(toc), 'sections;', usd(T['usd']), mtok(tok_total), hm(wall), hm(active), hm(agents_time))
