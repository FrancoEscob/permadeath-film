// Participants (official announcement rounds of @PermadeathSMP, 15–25/03/2020) and in-game names.
// Sources: research/overview.md §2 (rounds + IGN evidence), FACTS.md.
const S = ign => `../assets/skins/${ign.toLowerCase()}.png`;

export const PLAYERS = [
  // host
  { id: 'elrich', name: 'ElRichMC', user: 'ElRichMC', tag: 'EL ANFITRIÓN', skin: S('ElRichMC') },
  // ronda 1 · 15/03
  { id: 'felipez', name: 'Felipez360', user: 'xXmineCr4fterXx', tag: 'ANUNCIO 1 · 15/03', skin: S('xXmineCr4fterXx') },
  { id: 'paracetamor', name: 'Paracetamor', user: 'paracetamor', tag: 'ANUNCIO 1 · 15/03', skin: S('paracetamor') },
  { id: 'coolife', name: 'CooLifeGame', user: 'JackyMaster', tag: 'ANUNCIO 1 · 15/03', skin: S('JackyMaster') },
  { id: 'outconsumer', name: 'Outconsumer', user: 'RealOutconsumer', tag: 'ANUNCIO 1 · 15/03', skin: S('RealOutconsumer') },
  { id: 'maldito', name: 'TheGamerMaldito', user: 'TheGamerMaldito', tag: 'ANUNCIO 1 · 15/03', skin: S('TheGamerMaldito') },
  // ronda 2 · 17/03
  { id: 'tonacho', name: 'Tonacho', user: 'tonacho', tag: 'ANUNCIO 2 · 17/03', skin: S('tonacho') },
  { id: 'lili', name: 'LiliCross', user: 'LiliCross', tag: 'ANUNCIO 2 · 17/03', skin: S('LiliCross') },
  { id: 'brii', name: 'BriiHD', user: 'ElBrean', tag: 'ANUNCIO 2 · 17/03', skin: S('ElBrean') },
  { id: 'gona', name: 'Gona89', user: 'Gona89_YT', tag: 'ANUNCIO 2 · 17/03', skin: S('Gona89_YT') },
  { id: 'kaumaru', name: 'Kaumaru', user: 'Kaumaru', tag: 'ANUNCIO 2 · 17/03', skin: S('Kaumaru') },
  // ronda 3 · 20/03
  { id: 'frigo', name: 'FrigoAdri', user: 'FrigoAdri', tag: 'ANUNCIO 3 · 20/03', skin: S('FrigoAdri') },
  { id: 'cibergun', name: 'Cibergun', user: 'cibergun', tag: 'ANUNCIO 3 · 20/03', skin: S('cibergun') },
  { id: 'aka', name: 'AKAWonder', user: 'AKAWonder', tag: 'ANUNCIO 3 · 20/03', skin: S('AKAWonder') },
  { id: 'nia', name: 'Nia', user: 'Lakshart', tag: 'ANUNCIO 3 · 20/03', skin: S('Lakshart') },
  { id: 'shadoune', name: 'Shadoune666', user: 'Shadoune666 · skin actual (la de 2020 no se conserva)', tag: 'ANUNCIO 3 · 20/03', skin: S('Shadoune666'), cardOnly: true },
  // ronda 4 · 22/03
  { id: 'alvaro', name: 'Alvaro845', user: 'Alvaro845', tag: 'ANUNCIO 4 · 22/03', skin: S('Alvaro845') },
  { id: 'crisgreen', name: 'Crisgreen', user: 'Crisgreen', tag: 'ANUNCIO 4 · 22/03', skin: S('Crisgreen') },
  { id: 'hardy', name: 'Hardyluski', user: 'Hardyluski', tag: 'ANUNCIO 4 · 22/03', skin: S('Hardyluski') },
  { id: 'cecililla', name: 'Cecililla', user: 'Cecililla', tag: 'ANUNCIO 4 · 22/03', skin: S('Cecililla') },
  { id: 'rubik', name: 'Rubik', user: 'RubikYT', tag: 'ANUNCIO 4 · 22/03', skin: S('RubikYT') },
  // ronda 5 · 24/03
  { id: 'mikecrack', name: 'Mikecrack', user: 'Mikecrack', tag: 'ANUNCIO 5 · 24/03', skin: S('Mikecrack') },
  { id: 'alex', name: 'AlexElCapo', user: 'EvilAFM', tag: 'ANUNCIO 5 · 24/03', skin: S('EvilAFM') },
  { id: 'alkapone', name: 'Alkapone', user: 'Leyville', tag: 'ANUNCIO 5 · 24/03', skin: S('Leyville') },
  { id: 'folagor', name: 'Folagor', user: 'Folagoro', tag: 'ANUNCIO 5 · 24/03', skin: S('Folagoro') },
  // ronda 6 · 24/03
  { id: 'kakytron', name: 'Kakytron', user: 'Kakytron', tag: 'ANUNCIO 6 · 24/03', skin: S('Kakytron') },
  { id: 'killer', name: 'KillerCreeper55', user: 'killercreeper_55', tag: 'ANUNCIO 6 · 24/03', skin: S('killercreeper_55') },
  { id: 'luh', name: 'Luh', user: 'iLuh', tag: 'ANUNCIO 6 · 24/03', skin: S('iLuh') },
  { id: 'rangu', name: 'RanguGamer', user: 'RanguGamer', tag: 'ANUNCIO 6 · 24/03', skin: S('RanguGamer') },
  { id: 'antonio', name: 'Th3Antonio', user: 'Th3Antonio', tag: 'ANUNCIO 6 · 24/03', skin: S('Th3Antonio') },
  { id: 'zeling', name: 'Zeling', user: 'MitisyyLeDivorce', tag: 'ANUNCIO 6 · 24/03', skin: S('MitisyyLeDivorce') },
  { id: 'vandal', name: 'EsVandal', user: 'EsVandal', tag: 'ANUNCIO 6 · 24/03', skin: S('EsVandal') },
  // ronda 7 · "LA G2 SQUAD"
  { id: 'ibai', name: 'Ibai', user: 'DONIBAILLANOS', tag: 'LA G2 SQUAD · 24/03', skin: S('DONIBAILLANOS') },
  { id: 'revent', name: 'Reven', user: 'ReventXzz', tag: 'LA G2 SQUAD · 24/03', skin: S('ReventXzz') },
  { id: 'ander', name: 'Ander', user: '4andeR', tag: 'LA G2 SQUAD · 24/03', skin: S('4andeR') },
  { id: 'barbeq', name: 'BarbeQ', user: 'cuenta sin confirmar · cara de su tarjeta oficial', tag: 'LA G2 SQUAD · 24/03', skin: '../assets/skins/card_barbeq.png', cardOnly: true },
  // última hora
  { id: 'perxitaa', name: 'Perxitaa', user: 'cuenta sin confirmar · cara de su tarjeta oficial', tag: 'ANUNCIO EXTRA · 25/03', skin: '../assets/skins/card_perxitaa.png', cardOnly: true },
  { id: 'mrcarlos', name: 'MrCarlosNoob', user: 'MrCarlosnoob', tag: '', skin: S('MrCarlosnoob') },
];
// not a participant: ElRichMC's admin character (seen only in first person)
export const EXTRA = [{ id: 'omnirich', name: 'OmniRich', user: 'OmniRich', skin: S('OmniRich') }, { id: 'nobody', name: '?', user: '', skin: null }];
