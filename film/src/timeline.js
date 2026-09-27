// The whole film, in order. Every on-screen fact comes from FACTS.md.
import { vignette } from './vignette.js';
import { coldOpen, titleCard } from './scenes/opening.js';
import { title3d } from './scenes/title3d.js';
import { playersScene } from './scenes/players.js';
import { banCard, memorial, card } from './scenes/chronicle.js';
import { decree2 } from './scenes/decree2.js';
import { tweetsScene } from './scenes/tweets.js';
import { PLAYERS } from './data.js';

import d01 from './deaths/d01_alvaro.js';
import d02 from './deaths/d02_maldito.js';
import d03 from './deaths/d03_cecililla.js';
import d04 from './deaths/d04_kaumaru.js';
import d05 from './deaths/d05_felipez.js';
import d06 from './deaths/d06_ibai.js';
import d07 from './deaths/d07_revent.js';
import d08 from './deaths/d08_aka.js';
import d09 from './deaths/d09_ander.js';
import d11 from './deaths/d11_rubik.js';
import d12 from './deaths/d12_zeling.js';
import d13 from './deaths/d13_tonacho.js';
import d16 from './deaths/d16_outconsumer.js';
import d17 from './deaths/d17_rangu.js';
import d18 from './deaths/d18_frigo.js';
import d19 from './deaths/d19_folagor.js';
import d20 from './deaths/d20_paracetamor.js';
import d21 from './deaths/d21_gona.js';
import d22 from './deaths/d22_mrcarlos.js';
import d23 from './deaths/d23_mikecrack.js';
import d25 from './deaths/d25_cibergun.js';
import d26 from './deaths/d26_alkapone.js';
import d27 from './deaths/d27_nia.js';
import d28 from './deaths/d28_hardy.js';
import d31 from './deaths/d31_brii.js';
import d32 from './deaths/d32_rich.js';
import d33 from './deaths/d33_vandal.js';
import d34 from './deaths/d34_kakytron.js';
import d35 from './deaths/d35_cris.js';
import d36 from './deaths/d36_shadoune.js';
import d37 from './deaths/d37_killer.js';
import d38 from './deaths/d38_luh.js';
import d39 from './deaths/d39_omnirich.js';
import dKaky1 from './deaths/d_kakytron_first.js';

// bans (no in-game death): ban card seen in the GersoonSG compilation
const BANS = [
  { n: 10, player: 'lili', name: 'LiliCross', day: 25, date: '19/04/2020' },
  { n: 14, player: 'perxitaa', name: 'Perxitaa', day: 30, date: '24/04/2020' },
  { n: 15, player: 'alex', name: 'AlexElCapo', day: 30, date: '24/04/2020' },
  { n: 24, player: 'barbeq', name: 'BarbeQ', day: 36, date: '30/04/2020' },
  { n: 29, player: 'antonio', name: 'Th3Antonio', day: 50, date: '14/05/2020' },
  { n: 30, player: 'coolife', name: 'CooLifeGame', day: 50, date: '14/05/2020' },
];

export async function buildTimeline(assets) {
  const DEATHS = [d01, d02, d03, d04, d05, d06, d07, d08, d09, d11, d12, d13, d16, d17, d18, d19, d20, d21, d22, d23, d25, d26, d27, d28, d31, d32, d33, d34, d35, d36, d37, d38];
  // ribbon entries: deaths + bans, with a fractional day so same-day entries stack in order
  const all = [...DEATHS.map(d => ({ ...d })), ...BANS.map(b => ({ ...b, ban: true }))].sort((a, b) => a.n - b.n);
  all.forEach(e => { e.dayF = e.day + e.n * .001; });
  const byN = Object.fromEntries(all.map(e => [e.n, e]));
  const V = d => vignette(assets, byN[d.n], all);
  const B = (day, date, ns, note) => banCard(assets, { day, date, list: ns.map(n => byN[n]), deaths: all, note });

  const S = [];
  // ---------------------------------------------------------------- opening
  S.push(coldOpen({ lines: [
    { t: 1.2, s: '25 de marzo de 2020.' },
    { t: 2.9, s: '38 creadores. Un servidor de Minecraft.' },
    { t: 5.0, s: 'UNA SOLA VIDA.', red: true, big: true },
  ] }));
  S.push(title3d({ sub: 'CRÓNICA DE LOS 60 DÍAS', dur: 7 }));
  S.push(tweetsScene({ id: 'rules', dur: 9.5, title: 'LAS REGLAS', items: [
    { t: .5, y: 330, w: 1250, date: '25 mar. 2020', body: '➜ Si un jugador muere, es baneado permanentemente.', hl: 'baneado permanentemente' },
    { t: 2.4, y: 560, w: 1250, date: '24 mar. 2020', body: 'CADA 10 días la dificultad del servidor AUMENTARÁ.', hl: 'AUMENTARÁ' },
    { t: 4.4, y: 790, w: 1250, date: '25 mar. 2020', body: '➜ Si un jugador logra sobrevivir 110 días entrará en el SALÓN DE LA FAMA', hl: '110 días', out: 6.8 },
    { t: 7.0, y: 790, w: 1250, date: '19 abr. 2020', body: 'El Death Train solo comienza cuando alguien muere', hl: 'Death Train' },
  ] }));
  // ---------------------------------------------------------------- the players
  S.push(playersScene(assets, PLAYERS, { shot: 1.0, intro: 3.5, outro: 5.5 }));

  // ---------------------------------------------------------------- the chronicle
  S.push(card({ id: 'act1', dur: 3, lines: [
    { t: .2, s: 'DÍA 0', font: '900 150px Cinzel', y: 470, glow: '#ff2a10' },
    { t: .8, s: '25 de marzo de 2020 · 18:00 · el servidor abre', font: '700 40px Cinzel', y: 600, color: '#ff8a6a' },
  ], cues: [{ t: 0, type: 'boom', gain: .8 }], transIn: { mode: 1, dur: .6 } }));
  S.push(V(d01), V(d02), V(d03));
  S.push(decree2(assets, { day: 10, prev: 0, date: '@PermadeathSMP · 3 de abril de 2020', deaths: all,
    quote: '"3 muertes no son suficientes...\n¡SUBAMOS LA DIFICULTAD E INCREMENTEMOS EL DOLOR!"',
    items: [
      { icon: 'spider', text: '¡Todas las **arañas** ahora tienen efectos de poción! Entre **1 y 3**' },
      { icon: 'mobs', text: '**Doble** de mobs' },
      { icon: 'bed', text: 'Mínimo **4 jugadores** para pasar la noche' },
    ] }));
  S.push(V(d04), V(d05), V(d06), V(d07), V(d08), V(d09));
  S.push(decree2(assets, { day: 20, prev: 10, date: '@PermadeathSMP · 13 de abril de 2020', deaths: all, items: [
    { icon: 'moon', text: 'Ciclo de día y noche constante: ~~no puedes saltar la noche~~' },
    { icon: 'angry', text: 'Todos los **mobs pacíficos** ahora son **agresivos** y los pigmans están cabreados de antemano' },
    { icon: 'skeleton', text: 'Las arañas tienen de **3 a 5** efectos y aparecen con un **esqueleto** encima' },
    { icon: 'phantom', text: 'Todos los **Phantoms** son ahora de tamaño **9** y doble de vida' },
  ] }));
  S.push(banCard(assets, { id: 'rollback_mrcarlos', day: 20, date: '14–15/04/2020', list: [{ player: 'mrcarlos', name: 'MrCarlosNoob' }], title: 'SU PRIMERA MUERTE NO CONTÓ', stamp: 'ROLLBACK', note: 'Un rollback del servidor la deshizo. No tiene tarjeta oficial.', dur: 3.4 }));
  S.push(decree2(assets, { day: 25, prev: 20, headline: 'AUMENTO SORPRESA', date: '@PermadeathSMP · 19 de abril de 2020', deaths: all, items: [
    { icon: 'storm', text: '**Reset del Death Train**: cada 25 días se vuelve más peligroso' },
    { icon: 'spider', text: 'Todas las arañas tienen ahora **5 efectos**' },
    { icon: 'gslime', text: '**GigaSlimes** · **Giga MagmaCubes** · **Ghast Demoníacos**' },
    { icon: 'netherite', text: '¡Armadura de **Netherite** desbloqueada!' },
  ] }));
  S.push(B(25, '19/04/2020', [10], 'LiliCross pidió el ban: ya no tenía tiempo para jugar'));
  S.push(V(d11), V(d12), V(d13));
  S.push(decree2(assets, { day: 30, prev: 25, date: '@PermadeathSMP · 24 de abril de 2020 · se abre el End', deaths: all, items: [
    { icon: 'dragon', text: 'La batalla contra la **Dragona** está completamente modificada' },
    { icon: 'totem', text: 'Los **Tótems** tienen un **99%** de activarse y un ~~1% de fallar~~' },
    { icon: 'charged', text: 'Los **Creepers** son ahora **Eléctricos** · los Shulkers son **Shulkers Explosivos**' },
    { icon: 'silverfish', text: 'Los **Silverfish** tienen **5 efectos** de la misma lista que las arañas' },
    { icon: 'endeye', text: 'Aparecen **Ender Ghasts** y **Ender Creepers** en el End' },
  ] }));
  S.push(B(30, '24/04/2020', [14, 15]));
  S.push(V(d16), V(d17), V(d18), V(d19), V(d20), V(d21), V(d22), V(d23));
  S.push(B(36, '30/04/2020', [24]));
  S.push(V(d25), V(d26), V(d27));
  S.push(decree2(assets, { day: 40, prev: 30, date: '@PermadeathSMP · 4 de mayo de 2020', deaths: all, items: [
    { icon: 'heart', text: 'Todos los jugadores pierden **4 contenedores de vida** · se eliminan **5 slots**' },
    { icon: 'totem', text: 'Los Tótems tienen un ~~3% de fallar~~ y al activarse se consumen **2**' },
    { icon: 'cat', text: 'Los gatos son ahora **Gatos Supernova**: su explosión es capaz de ~~arrasar una base entera~~' },
    { icon: 'portal', text: 'Se ha generado en algún lugar del mundo un portal a **"The Beginning"**' },
  ] }));
  S.push(vignette(assets, { ...dKaky1, dayF: 40 }, all));
  S.push(V(d28));
  S.push(decree2(assets, { day: 50, prev: 40, date: '@PermadeathSMP · 14 de mayo de 2020', deaths: all, items: [
    { icon: 'totem', text: 'Los Tótems tienen un ~~5% de fallar~~' },
    { icon: 'pick', text: 'Picar bloques quita **medio corazón** · te ahogas **5 veces** más rápido' },
    { icon: 'charged', text: 'Los Creepers Energéticos son ahora **Quantum Creepers**' },
    { icon: 'chicken', text: 'Los **Pollos** son ahora **Silverfish**' },
  ] }));
  S.push(B(50, '14/05/2020', [29, 30], 'CooLifeGame: "Me baneó el plugin por no jugar un número de horas mínimas"'));
  S.push(V(d31), V(d32), V(d33));
  S.push(decree2(assets, { day: 60, prev: 50, headline: 'EL ÚLTIMO DÍA', date: '@PermadeathSMP · 19 y 24 de mayo de 2020', deaths: all, items: [
    { icon: 'creeper', face: 'mikecrack', text: '¡Un muerto (**Mikecrack**) ha sugerido que los **CREEPERS** spawneen en muchos más bloques y ~~sin importar la luz~~!' },
    { icon: 'endeye', text: 'Los Ender Creepers ya no existen: ahora son **Ender Quantum Creepers**' },
    { icon: 'totem', text: 'Cuando se usa un Tótem se gastan **3** · ahora tienen un ~~7% de fallar~~' },
    { icon: 'bubble', text: 'Te ahogas **10 veces** más rápido' },
    { icon: 'orb', text: 'Los jugadores tienen **8 horas HOY** para obtener el **Orbe de Vida**' },
  ] }));
  S.push(V(d34), V(d35), V(d36), V(d37), V(d38));
  // ---------------------------------------------------------------- the end
  S.push(tweetsScene({ id: 'lost', dur: 6.5, storm: true, items: [
    { t: .6, y: H2(), w: 1300, size: 56, date: '24 may. 2020 · 21:00 UTC', body: '¡ENHORABUENA, HABÉIS PERDIDO!\n\nHabéis tardado un total de 60 días en perder.\n38 jugadores asesinados.', hl: 'HABÉIS PERDIDO' },
  ] }));
  S.push(card({ id: 'omni_intro', dur: 3.2, storm: true, lines: [
    { t: .2, s: 'Esa misma noche,', font: '700 46px Cinzel', y: 470 },
    { t: 1.0, s: 'ElRichMC volvió a entrar con OmniRich, su personaje admin.', font: '700 40px Cinzel', y: 560, color: '#ff8a6a' },
  ], transIn: { mode: 2, dur: .5 } }));
  S.push(vignette(assets, { ...d39, dayF: 60.039 }, all));
  S.push(memorial(assets, { dur: 15, entries: all.map(e => ({ player: e.player, name: e.name, short: e.name.length > 11 ? e.name.slice(0, 10) + '…' : e.name, day: e.day, ban: !!e.ban })), lines: [
    { t: 2.5, s: '60 días · 32 muertes · 6 baneos por inactividad', font: '700 44px Cinzel' },
    { t: 7.5, s: 'Nadie llegó al día 110.', font: '700 50px Cinzel', color: '#ff6a4a' },
    { t: 11, s: 'Permadeath 2 fue anunciado. Todavía no llegó.', font: '700 40px Cinzel', color: '#cbb89a' },
  ] }));
  S.push(card({ id: 'credits', dur: 7, lines: [
    { t: .3, s: 'PERMADEATH', font: '900 110px Cinzel', y: 400, glow: '#ff2a10', spacing: 10 },
    { t: 1.0, s: 'un servidor de ElRichMC · 25/03 – 24/05/2020', font: '700 34px Cinzel', y: 510, color: '#ff8a6a' },
    { t: 2.0, s: 'Recreaciones dibujadas a partir de los clips de los propios jugadores.', font: '400 34px Oswald', y: 640, color: '#cbb89a' },
    { t: 2.6, s: 'Fuentes: compilado de GersoonSG, wiki de Permadeath, @PermadeathSMP y el documental de Rubik — ver FACTS.md', font: '400 30px Oswald', y: 695, color: '#9a8a80' },
    { t: 3.2, s: 'Hecho 100% en código: HTML, JavaScript, three.js y WebAudio. Sin metraje ni modelos de video.', font: '400 30px Oswald', y: 745, color: '#9a8a80' },
  ], cues: [{ t: 0, type: 'bell', note: 'D3', gain: .2 }] }));
  return S;
}
function H2() { return 540; }
