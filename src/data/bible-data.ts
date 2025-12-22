import { BibleBook, BibleVerse } from '../types';

// Liste des livres de la Bible
export const bibleBooks: BibleBook[] = [
  // Ancien Testament
  { id: 'gen', name: 'Genèse', abbrev: 'Gn', chapters: 50, testament: 'old' },
  { id: 'exo', name: 'Exode', abbrev: 'Ex', chapters: 40, testament: 'old' },
  { id: 'lev', name: 'Lévitique', abbrev: 'Lv', chapters: 27, testament: 'old' },
  { id: 'num', name: 'Nombres', abbrev: 'Nb', chapters: 36, testament: 'old' },
  { id: 'deu', name: 'Deutéronome', abbrev: 'Dt', chapters: 34, testament: 'old' },
  { id: 'jos', name: 'Josué', abbrev: 'Jos', chapters: 24, testament: 'old' },
  { id: 'jdg', name: 'Juges', abbrev: 'Jg', chapters: 21, testament: 'old' },
  { id: 'rut', name: 'Ruth', abbrev: 'Rt', chapters: 4, testament: 'old' },
  { id: '1sa', name: '1 Samuel', abbrev: '1S', chapters: 31, testament: 'old' },
  { id: '2sa', name: '2 Samuel', abbrev: '2S', chapters: 24, testament: 'old' },
  { id: '1ki', name: '1 Rois', abbrev: '1R', chapters: 22, testament: 'old' },
  { id: '2ki', name: '2 Rois', abbrev: '2R', chapters: 25, testament: 'old' },
  { id: '1ch', name: '1 Chroniques', abbrev: '1Ch', chapters: 29, testament: 'old' },
  { id: '2ch', name: '2 Chroniques', abbrev: '2Ch', chapters: 36, testament: 'old' },
  { id: 'ezr', name: 'Esdras', abbrev: 'Esd', chapters: 10, testament: 'old' },
  { id: 'neh', name: 'Néhémie', abbrev: 'Né', chapters: 13, testament: 'old' },
  { id: 'est', name: 'Esther', abbrev: 'Est', chapters: 10, testament: 'old' },
  { id: 'job', name: 'Job', abbrev: 'Jb', chapters: 42, testament: 'old' },
  { id: 'psa', name: 'Psaumes', abbrev: 'Ps', chapters: 150, testament: 'old' },
  { id: 'pro', name: 'Proverbes', abbrev: 'Pr', chapters: 31, testament: 'old' },
  { id: 'ecc', name: 'Ecclésiaste', abbrev: 'Ec', chapters: 12, testament: 'old' },
  { id: 'sng', name: 'Cantique', abbrev: 'Ct', chapters: 8, testament: 'old' },
  { id: 'isa', name: 'Ésaïe', abbrev: 'Es', chapters: 66, testament: 'old' },
  { id: 'jer', name: 'Jérémie', abbrev: 'Jr', chapters: 52, testament: 'old' },
  { id: 'lam', name: 'Lamentations', abbrev: 'Lm', chapters: 5, testament: 'old' },
  { id: 'ezk', name: 'Ézéchiel', abbrev: 'Ez', chapters: 48, testament: 'old' },
  { id: 'dan', name: 'Daniel', abbrev: 'Dn', chapters: 12, testament: 'old' },
  { id: 'hos', name: 'Osée', abbrev: 'Os', chapters: 14, testament: 'old' },
  { id: 'jol', name: 'Joël', abbrev: 'Jl', chapters: 3, testament: 'old' },
  { id: 'amo', name: 'Amos', abbrev: 'Am', chapters: 9, testament: 'old' },
  { id: 'oba', name: 'Abdias', abbrev: 'Ab', chapters: 1, testament: 'old' },
  { id: 'jon', name: 'Jonas', abbrev: 'Jon', chapters: 4, testament: 'old' },
  { id: 'mic', name: 'Michée', abbrev: 'Mi', chapters: 7, testament: 'old' },
  { id: 'nam', name: 'Nahum', abbrev: 'Na', chapters: 3, testament: 'old' },
  { id: 'hab', name: 'Habacuc', abbrev: 'Ha', chapters: 3, testament: 'old' },
  { id: 'zep', name: 'Sophonie', abbrev: 'So', chapters: 3, testament: 'old' },
  { id: 'hag', name: 'Aggée', abbrev: 'Ag', chapters: 2, testament: 'old' },
  { id: 'zec', name: 'Zacharie', abbrev: 'Za', chapters: 14, testament: 'old' },
  { id: 'mal', name: 'Malachie', abbrev: 'Ml', chapters: 4, testament: 'old' },
  // Nouveau Testament
  { id: 'mat', name: 'Matthieu', abbrev: 'Mt', chapters: 28, testament: 'new' },
  { id: 'mrk', name: 'Marc', abbrev: 'Mc', chapters: 16, testament: 'new' },
  { id: 'luk', name: 'Luc', abbrev: 'Lc', chapters: 24, testament: 'new' },
  { id: 'jhn', name: 'Jean', abbrev: 'Jn', chapters: 21, testament: 'new' },
  { id: 'act', name: 'Actes', abbrev: 'Ac', chapters: 28, testament: 'new' },
  { id: 'rom', name: 'Romains', abbrev: 'Rm', chapters: 16, testament: 'new' },
  { id: '1co', name: '1 Corinthiens', abbrev: '1Co', chapters: 16, testament: 'new' },
  { id: '2co', name: '2 Corinthiens', abbrev: '2Co', chapters: 13, testament: 'new' },
  { id: 'gal', name: 'Galates', abbrev: 'Ga', chapters: 6, testament: 'new' },
  { id: 'eph', name: 'Éphésiens', abbrev: 'Ep', chapters: 6, testament: 'new' },
  { id: 'php', name: 'Philippiens', abbrev: 'Ph', chapters: 4, testament: 'new' },
  { id: 'col', name: 'Colossiens', abbrev: 'Col', chapters: 4, testament: 'new' },
  { id: '1th', name: '1 Thessaloniciens', abbrev: '1Th', chapters: 5, testament: 'new' },
  { id: '2th', name: '2 Thessaloniciens', abbrev: '2Th', chapters: 3, testament: 'new' },
  { id: '1ti', name: '1 Timothée', abbrev: '1Tm', chapters: 6, testament: 'new' },
  { id: '2ti', name: '2 Timothée', abbrev: '2Tm', chapters: 4, testament: 'new' },
  { id: 'tit', name: 'Tite', abbrev: 'Tt', chapters: 3, testament: 'new' },
  { id: 'phm', name: 'Philémon', abbrev: 'Phm', chapters: 1, testament: 'new' },
  { id: 'heb', name: 'Hébreux', abbrev: 'Hé', chapters: 13, testament: 'new' },
  { id: 'jas', name: 'Jacques', abbrev: 'Jc', chapters: 5, testament: 'new' },
  { id: '1pe', name: '1 Pierre', abbrev: '1P', chapters: 5, testament: 'new' },
  { id: '2pe', name: '2 Pierre', abbrev: '2P', chapters: 3, testament: 'new' },
  { id: '1jn', name: '1 Jean', abbrev: '1Jn', chapters: 5, testament: 'new' },
  { id: '2jn', name: '2 Jean', abbrev: '2Jn', chapters: 1, testament: 'new' },
  { id: '3jn', name: '3 Jean', abbrev: '3Jn', chapters: 1, testament: 'new' },
  { id: 'jud', name: 'Jude', abbrev: 'Jd', chapters: 1, testament: 'new' },
  { id: 'rev', name: 'Apocalypse', abbrev: 'Ap', chapters: 22, testament: 'new' },
];

// Quelques versets exemple (Jean 3 pour démonstration)
export const sampleVerses: Record<string, BibleVerse[]> = {
  'jhn_3': [
    { book: 'Jean', chapter: 3, verse: 1, text: "Mais il y eut un homme d'entre les pharisiens, nommé Nicodème, un chef des Juifs," },
    { book: 'Jean', chapter: 3, verse: 2, text: "qui vint, lui, auprès de Jésus, de nuit, et lui dit: Rabbi, nous savons que tu es un docteur venu de Dieu; car personne ne peut faire ces miracles que tu fais, si Dieu n'est avec lui." },
    { book: 'Jean', chapter: 3, verse: 3, text: "Jésus lui répondit: En vérité, en vérité, je te le dis, si un homme ne naît de nouveau, il ne peut voir le royaume de Dieu." },
    { book: 'Jean', chapter: 3, verse: 4, text: "Nicodème lui dit: Comment un homme peut-il naître quand il est vieux? Peut-il rentrer dans le sein de sa mère et naître?" },
    { book: 'Jean', chapter: 3, verse: 5, text: "Jésus répondit: En vérité, en vérité, je te le dis, si un homme ne naît d'eau et d'Esprit, il ne peut entrer dans le royaume de Dieu." },
    { book: 'Jean', chapter: 3, verse: 6, text: "Ce qui est né de la chair est chair, et ce qui est né de l'Esprit est esprit." },
    { book: 'Jean', chapter: 3, verse: 7, text: "Ne t'étonne pas que je t'aie dit: Il faut que vous naissiez de nouveau." },
    { book: 'Jean', chapter: 3, verse: 8, text: "Le vent souffle où il veut, et tu en entends le bruit; mais tu ne sais d'où il vient, ni où il va. Il en est ainsi de tout homme qui est né de l'Esprit." },
    { book: 'Jean', chapter: 3, verse: 9, text: "Nicodème lui dit: Comment cela peut-il se faire?" },
    { book: 'Jean', chapter: 3, verse: 10, text: "Jésus lui répondit: Tu es le docteur d'Israël, et tu ne sais pas ces choses!" },
    { book: 'Jean', chapter: 3, verse: 11, text: "En vérité, en vérité, je te le dis, nous disons ce que nous savons, et nous rendons témoignage de ce que nous avons vu; et vous ne recevez pas notre témoignage." },
    { book: 'Jean', chapter: 3, verse: 12, text: "Si vous ne croyez pas quand je vous ai parlé des choses terrestres, comment croirez-vous quand je vous parlerai des choses célestes?" },
    { book: 'Jean', chapter: 3, verse: 13, text: "Personne n'est monté au ciel, si ce n'est celui qui est descendu du ciel, le Fils de l'homme qui est dans le ciel." },
    { book: 'Jean', chapter: 3, verse: 14, text: "Et comme Moïse éleva le serpent dans le désert, il faut de même que le Fils de l'homme soit élevé," },
    { book: 'Jean', chapter: 3, verse: 15, text: "afin que quiconque croit en lui ait la vie éternelle." },
    { book: 'Jean', chapter: 3, verse: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
    { book: 'Jean', chapter: 3, verse: 17, text: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui." },
    { book: 'Jean', chapter: 3, verse: 18, text: "Celui qui croit en lui n'est point jugé; mais celui qui ne croit pas est déjà jugé, parce qu'il n'a pas cru au nom du Fils unique de Dieu." },
    { book: 'Jean', chapter: 3, verse: 19, text: "Et ce jugement c'est que, la lumière étant venue dans le monde, les hommes ont préféré les ténèbres à la lumière, parce que leurs oeuvres étaient mauvaises." },
    { book: 'Jean', chapter: 3, verse: 20, text: "Car quiconque fait le mal hait la lumière, et ne vient point à la lumière, de peur que ses oeuvres ne soient dévoilées;" },
    { book: 'Jean', chapter: 3, verse: 21, text: "mais celui qui agit selon la vérité vient à la lumière, afin que ses oeuvres soient manifestées, parce qu'elles sont faites en Dieu." },
  ],
  'psa_23': [
    { book: 'Psaumes', chapter: 23, verse: 1, text: "L'Éternel est mon berger: je ne manquerai de rien." },
    { book: 'Psaumes', chapter: 23, verse: 2, text: "Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles." },
    { book: 'Psaumes', chapter: 23, verse: 3, text: "Il restaure mon âme, Il me conduit dans les sentiers de la justice, À cause de son nom." },
    { book: 'Psaumes', chapter: 23, verse: 4, text: "Quand je marche dans la vallée de l'ombre de la mort, Je ne crains aucun mal, car tu es avec moi: Ta houlette et ton bâton me rassurent." },
    { book: 'Psaumes', chapter: 23, verse: 5, text: "Tu dresses devant moi une table, En face de mes adversaires; Tu oins d'huile ma tête, Et ma coupe déborde." },
    { book: 'Psaumes', chapter: 23, verse: 6, text: "Oui, le bonheur et la grâce m'accompagneront Tous les jours de ma vie, Et j'habiterai dans la maison de l'Éternel Jusqu'à la fin de mes jours." },
  ],
  'gen_1': [
    { book: 'Genèse', chapter: 1, verse: 1, text: "Au commencement, Dieu créa les cieux et la terre." },
    { book: 'Genèse', chapter: 1, verse: 2, text: "La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux." },
    { book: 'Genèse', chapter: 1, verse: 3, text: "Dieu dit: Que la lumière soit! Et la lumière fut." },
    { book: 'Genèse', chapter: 1, verse: 4, text: "Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres." },
    { book: 'Genèse', chapter: 1, verse: 5, text: "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour." },
    { book: 'Genèse', chapter: 1, verse: 6, text: "Dieu dit: Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux." },
    { book: 'Genèse', chapter: 1, verse: 7, text: "Et Dieu fit l'étendue, et il sépara les eaux qui sont au-dessous de l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et cela fut ainsi." },
    { book: 'Genèse', chapter: 1, verse: 8, text: "Dieu appela l'étendue ciel. Ainsi, il y eut un soir, et il y eut un matin: ce fut le second jour." },
  ],
};

// Fonction pour obtenir les versets d'un chapitre
export function getChapterVerses(bookId: string, chapter: number): BibleVerse[] {
  const key = `${bookId}_${chapter}`;
  return sampleVerses[key] || [];
}

// Fonction pour obtenir les livres par testament
export function getBooksByTestament(testament: 'old' | 'new'): BibleBook[] {
  return bibleBooks.filter(book => book.testament === testament);
}

// Fonction pour obtenir un livre par son ID
export function getBookById(bookId: string): BibleBook | undefined {
  return bibleBooks.find(book => book.id === bookId);
}

// Verset du jour (mock)
export function getDailyVerse(): BibleVerse {
  const verses = [
    { book: 'Jean', chapter: 3, verse: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
    { book: 'Psaumes', chapter: 23, verse: 1, text: "L'Éternel est mon berger: je ne manquerai de rien." },
    { book: 'Proverbes', chapter: 3, verse: 5, text: "Confie-toi en l'Éternel de tout ton coeur, Et ne t'appuie pas sur ta sagesse." },
    { book: 'Jérémie', chapter: 29, verse: 11, text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance." },
    { book: 'Philippiens', chapter: 4, verse: 13, text: "Je puis tout par celui qui me fortifie." },
  ];
  const today = new Date().getDate();
  return verses[today % verses.length];
}
