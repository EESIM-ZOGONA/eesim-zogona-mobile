import { Event, Hymn, Prediction, Video, Playlist, WeeklyProgram, QuickAction, ProgramActivity } from '../types';

export const mockQuickActions: QuickAction[] = [
  { id: '1', title: 'Cantiques', icon: 'musical-notes', route: 'HymnsTab' },
  { id: '2', title: 'TV', icon: 'tv', route: 'TVTab' },
  { id: '3', title: 'Programme', icon: 'calendar', route: 'ProgramTab' },
  { id: '4', title: 'Dons', icon: 'gift', route: 'Donations' },
  { id: '5', title: 'Bible', icon: 'book', route: 'Bible' },
  { id: '6', title: 'Priere', icon: 'hand-left', route: 'Prayer' },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Grande Croisade Evangelique 2025',
    description: 'Venez nombreux pour celebrer la gloire de Dieu lors de cette grande croisade d\'evangelisation organisee par l\'EE/SIM Zogona. Theme: "Christ notre esperance".',
    date: '15 Jan 2025',
    time: '09:00',
    location: 'Temple Central EE/SIM Zogona, Ouagadougou',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
    category: 'evangelisation',
  },
  {
    id: '2',
    title: 'Nuit de louange et adoration',
    description: 'Une nuit entiere dediee a la louange et a l\'adoration de notre Seigneur Jesus-Christ. Venez avec vos instruments et vos voix pour magnifier le Seigneur.',
    date: '20 Jan 2025',
    time: '21:00',
    location: 'Temple Central EE/SIM Zogona, Ouagadougou',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    category: 'culte',
  },
  {
    id: '3',
    title: 'Seminaire de formation des jeunes leaders',
    description: 'Programme de formation pour les jeunes leaders de l\'eglise. Theme: "Servir avec excellence dans le ministere".',
    date: '25 Jan 2025',
    time: '14:00',
    location: 'Salle de conference EE/SIM Zogona',
    imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
    category: 'formation',
  },
  {
    id: '4',
    title: 'Journee de jeune et priere nationale',
    description: 'Journee speciale de jeune et priere pour le Burkina Faso, pour la paix et la reconciliation nationale.',
    date: '30 Jan 2025',
    time: '06:00',
    location: 'Temple Central EE/SIM Zogona, Ouagadougou',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    category: 'jeune',
  },
];

export const mockHymns: Hymn[] = [
  {
    id: '1',
    number: 1,
    title: 'A Toi la Gloire',
    lyrics: 'A toi la gloire, O Ressuscite!\nA toi la victoire pour l\'eternite!\nBrillant de lumiere, l\'ange est descendu,\nIl roule la pierre du tombeau vaincu.\n\nRefrain:\nA toi la gloire, O Ressuscite!\nA toi la victoire pour l\'eternite!\n\nVois-le paraitre: c\'est lui, c\'est Jesus,\nTon Sauveur, ton Maitre, oh! ne doute plus!\nSois dans l\'allegresse, peuple du Seigneur,\nEt redis sans cesse que Christ est vainqueur.',
    category: 'louange',
    author: 'Edmond Budry',
  },
  {
    id: '2',
    number: 2,
    title: 'Quel Ami Fidele et Tendre',
    lyrics: 'Quel ami fidele et tendre nous avons en Jesus Christ,\nToujours pret a nous entendre, a repondre a notre cri!\nIl connait nos defaillances, nos chutes de chaque jour,\nSevere en ses exigences, il est riche en son amour.\n\nNous les portons seuls, que de peines!\nNous succombons sous leur poids;\nIl faut a Jesus les dire pour qu\'il nous donne sa paix.',
    category: 'adoration',
    author: 'Joseph Scriven',
  },
  {
    id: '3',
    number: 3,
    title: 'Tel Que Je Suis',
    lyrics: 'Tel que je suis, sans rien a moi,\nSinon ton sang verse pour moi,\nEt ta voix qui m\'appelle a toi,\nAgneau de Dieu, je viens, je viens!\n\nTel que je suis, bien vacillant,\nEn proie au doute a chaque instant,\nLuttant en moi contre Satan,\nAgneau de Dieu, je viens, je viens!',
    category: 'communion',
  },
  {
    id: '4',
    number: 4,
    title: 'Oh! Quel Beau Jour',
    lyrics: 'Oh! quel beau jour, jour de delivrance,\nQuand mon Sauveur vint me chercher!\nMon ame etait dans la souffrance,\nIl m\'a trouve, m\'a releve.\n\nRefrain:\nOh! gloire a Dieu! Gloire a Dieu!\nMon coeur est rempli de bonheur.\nOh! gloire a Dieu! Gloire a Dieu!\nJesus est mon Liberateur.',
    category: 'louange',
  },
  {
    id: '5',
    number: 5,
    title: 'Dieu Est Amour',
    lyrics: 'Dieu est amour, Dieu est amour,\nVoila le cri que Jesus fait entendre.\nDieu est amour, Dieu est amour,\nIl veut nous sauver, il veut nous prendre.\n\nVenez a lui, vous qui peinez,\nVous qui portez un lourd fardeau.\nJesus vous appelle, venez,\nIl vous donnera le repos.',
    category: 'adoration',
  },
  {
    id: '6',
    number: 6,
    title: 'Christ est Ressuscite',
    lyrics: 'Christ est ressuscite! Louez le Seigneur!\nMort il est descendu aux lieux des douleurs,\nMais puissant et vainqueur des portes d\'enfer,\nIl monta pour ouvrir les portes des cieux.\n\nChrist est ressuscite! Christ est ressuscite!\nAlleluia! Alleluia! Il est vivant!',
    category: 'paques',
  },
];

export const mockPredications: Prediction[] = [
  {
    id: '1',
    title: 'La Foi qui Deplace les Montagnes',
    content: 'En verite je vous le dis, si vous avez de la foi comme un grain de moutarde, vous direz a cette montagne: Transporte-toi d\'ici la, et elle se transportera; rien ne vous sera impossible. - Message du Pasteur lors du culte dominical.',
    author: 'Pasteur Principal',
    date: '10 Jan 2025',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
  },
  {
    id: '2',
    title: 'L\'Amour du Prochain',
    content: 'Tu aimeras le Seigneur, ton Dieu, de tout ton coeur, de toute ton ame, et de toute ta pensee. C\'est le premier et le plus grand commandement. Et voici le second, qui lui est semblable: Tu aimeras ton prochain comme toi-meme.',
    author: 'Pasteur Associe',
    date: '08 Jan 2025',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
  },
  {
    id: '3',
    title: 'La Paix de Dieu',
    content: 'Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre coeur ne se trouble point, et ne s\'alarme point.',
    author: 'Evangeliste',
    date: '05 Jan 2025',
  },
];

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Culte Dominical - La Puissance de la Priere',
    description: 'Message du Pasteur Principal sur l\'importance de la priere dans notre vie quotidienne. Theme: "Priez sans cesse".',
    thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '1:23:45',
    views: 15420,
    likes: 892,
    publishedAt: '2025-01-10',
    playlistId: '1',
  },
  {
    id: '2',
    title: 'Etude Biblique - Le Livre de Jean Chapitre 3',
    description: 'Etude approfondie du livre de Jean chapitre 3: La nouvelle naissance expliquee par Jesus a Nicodeme.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '45:30',
    views: 8750,
    likes: 456,
    publishedAt: '2025-01-08',
    playlistId: '2',
  },
  {
    id: '3',
    title: 'Louange et Adoration - Chorale EE/SIM Zogona',
    description: 'Compilation des meilleurs moments de louange de notre chorale. Venez magnifier le Seigneur avec nous.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '58:20',
    views: 12300,
    likes: 1024,
    publishedAt: '2025-01-05',
    playlistId: '3',
  },
  {
    id: '4',
    title: 'Temoignages - La Grace de Dieu dans nos vies',
    description: 'Temoignages de freres et soeurs de l\'EE/SIM Zogona sur la grace de Dieu dans leur vie quotidienne.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '32:15',
    views: 5600,
    likes: 389,
    publishedAt: '2025-01-03',
    playlistId: '4',
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Cultes Dominicaux',
    description: 'Retrouvez tous les cultes du dimanche de l\'EE/SIM Zogona',
    thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
    videoCount: 52,
    videos: mockVideos.filter(v => v.playlistId === '1'),
  },
  {
    id: '2',
    title: 'Etudes Bibliques',
    description: 'Etudes approfondies de la Parole de Dieu',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
    videoCount: 24,
    videos: mockVideos.filter(v => v.playlistId === '2'),
  },
  {
    id: '3',
    title: 'Chorale EE/SIM Zogona',
    description: 'Moments de louange et d\'adoration de notre chorale',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    videoCount: 36,
    videos: mockVideos.filter(v => v.playlistId === '3'),
  },
  {
    id: '4',
    title: 'Temoignages',
    description: 'Temoignages de la grace de Dieu',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
    videoCount: 18,
    videos: mockVideos.filter(v => v.playlistId === '4'),
  },
];

export const mockWeeklyProgram: WeeklyProgram[] = [
  {
    id: '1',
    day: 'dimanche',
    activities: [
      { id: '1a', title: 'Lecon du Dimanche', time: '08:00 - 09:00', description: 'Enseignement biblique pour tous', location: 'Temple Central EE/SIM Zogona' },
      { id: '1b', title: 'Grand Culte', time: '09:00 - 11:00', description: 'Culte d\'adoration et de la Parole', location: 'Temple Central EE/SIM Zogona' },
    ],
  },
  {
    id: '2',
    day: 'lundi',
    activities: [],
  },
  {
    id: '3',
    day: 'mardi',
    activities: [
      { id: '3a', title: 'Priere d\'ensemble', time: '19:00', description: 'Priere communautaire', location: 'Temple Central EE/SIM Zogona' },
    ],
  },
  {
    id: '4',
    day: 'mercredi',
    activities: [
      { id: '4a', title: 'Intercession', time: '13:00', description: 'Priere d\'intercession', location: 'Temple Central EE/SIM Zogona' },
    ],
  },
  {
    id: '5',
    day: 'jeudi',
    activities: [],
  },
  {
    id: '6',
    day: 'vendredi',
    activities: [
      { id: '6a', title: 'Etude biblique', time: '19:00', description: 'Etude approfondie de la Parole de Dieu', location: 'Temple Central EE/SIM Zogona' },
    ],
  },
  {
    id: '7',
    day: 'samedi',
    activities: [
      { id: '7a', title: 'Repetition Chorale', time: '14:00 - 17:00', description: 'Repetition de la chorale EE/SIM Zogona', location: 'Temple Central EE/SIM Zogona' },
    ],
  },
];

export const churchInfo = {
  name: 'EE/SIM Zogona',
  address: 'Rue 13.29, Porte 80, Zogona',
  postalAddress: '01 BP 1552 Ouagadougou 01',
  phone: '+226 25 36 28 89',
  phone2: '+226 78 50 31 73',
  email: 'contact@eesimzogona.org',
  website: 'https://eesimzogona.org',
  youtube: 'https://youtube.com/@eesimzogona',
};

export const scheduleHighlights = [
  { id: '1', title: 'Grand Culte', day: 'Dim.', time: '9h-11h', icon: 'people' },
  { id: '2', title: 'Lecon du Dimanche', day: 'Dim.', time: '8h-9h', icon: 'book' },
  { id: '3', title: 'Etude biblique', day: 'Ven.', time: '19h', icon: 'library' },
  { id: '4', title: 'Priere d\'ensemble', day: 'Mar.', time: '19h', icon: 'hand-left' },
  { id: '5', title: 'Intercession', day: 'Mer.', time: '13h', icon: 'heart' },
];

// Helper to get dates for this week
const getDateForDay = (dayOffset: number): Date => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  const targetDate = new Date(monday);
  targetDate.setDate(monday.getDate() + dayOffset);
  return targetDate;
};

export const mockProgramActivities: ProgramActivity[] = [
  {
    id: '1',
    title: 'Priere Matinale',
    startTime: '06:00',
    endTime: '07:00',
    description: 'Commencez la semaine par la priere. Moment de communion avec Dieu pour chercher sa face et sa direction.',
    location: undefined,
    category: 'priere',
    isOnline: true,
    date: getDateForDay(0), // Lundi
  },
  {
    id: '2',
    title: 'Etude Biblique',
    startTime: '19:00',
    endTime: '20:30',
    description: 'Etude approfondie de la Parole de Dieu. Cette semaine: Les Beatitudes (Matthieu 5).',
    location: 'Salle Principale',
    category: 'etude',
    date: getDateForDay(1), // Mardi
  },
  {
    id: '3',
    title: 'Repetition Chorale',
    startTime: '18:00',
    endTime: '20:00',
    description: 'Preparation des chants pour le culte dominical.',
    location: 'Salle Annexe',
    category: 'chorale',
    date: getDateForDay(2), // Mercredi
  },
  {
    id: '4',
    title: 'Veillee de Priere',
    startTime: '21:00',
    endTime: '00:00',
    description: 'Nuit de priere et d\'intercession pour l\'eglise, la nation et les nations.',
    location: 'Grand Auditorium',
    category: 'priere',
    isImportant: true,
    date: getDateForDay(4), // Vendredi
  },
  {
    id: '5',
    title: 'Premier Culte',
    startTime: '07:30',
    endTime: '09:30',
    description: 'Premier service de celebration dominicale.',
    location: 'Sanctuaire',
    category: 'culte',
    date: getDateForDay(6), // Dimanche
  },
  {
    id: '6',
    title: 'Culte d\'Adoration',
    startTime: '10:00',
    endTime: '12:30',
    description: 'Service principal avec louange, adoration et predication de la Parole.',
    location: 'Sanctuaire',
    category: 'culte',
    date: getDateForDay(6), // Dimanche
  },
];
