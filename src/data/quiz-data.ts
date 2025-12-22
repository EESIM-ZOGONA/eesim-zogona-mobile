import { Quiz, QuizQuestion, QuizCategory } from '../types';

// Questions par quiz
const questionsPersonnages: QuizQuestion[] = [
  {
    id: 'p1',
    question: 'Qui a construit l\'arche selon les instructions de Dieu ?',
    options: ['Abraham', 'Noé', 'Moïse', 'David'],
    correctAnswer: 1,
    explanation: 'Noé a construit l\'arche pour sauver sa famille et les animaux du déluge.',
    verseRef: 'Genèse 6:14',
  },
  {
    id: 'p2',
    question: 'Qui a été vendu comme esclave par ses frères ?',
    options: ['Moïse', 'David', 'Joseph', 'Benjamin'],
    correctAnswer: 2,
    explanation: 'Joseph a été vendu par ses frères jaloux et est devenu gouverneur d\'Égypte.',
    verseRef: 'Genèse 37:28',
  },
  {
    id: 'p3',
    question: 'Qui a tué le géant Goliath ?',
    options: ['Saül', 'Jonathan', 'David', 'Samuel'],
    correctAnswer: 2,
    explanation: 'David, encore jeune berger, a vaincu Goliath avec une fronde.',
    verseRef: '1 Samuel 17:50',
  },
  {
    id: 'p4',
    question: 'Qui a été avalé par un grand poisson ?',
    options: ['Pierre', 'Jonas', 'Élie', 'Daniel'],
    correctAnswer: 1,
    explanation: 'Jonas a été avalé par un grand poisson après avoir fui l\'appel de Dieu.',
    verseRef: 'Jonas 1:17',
  },
  {
    id: 'p5',
    question: 'Qui a reçu les dix commandements sur le mont Sinaï ?',
    options: ['Abraham', 'Jacob', 'Moïse', 'Aaron'],
    correctAnswer: 2,
    explanation: 'Moïse a reçu les tables de la loi directement de Dieu.',
    verseRef: 'Exode 20:1-17',
  },
];

const questionsAncienTestament: QuizQuestion[] = [
  {
    id: 'at1',
    question: 'Quel est le premier livre de la Bible ?',
    options: ['Exode', 'Psaumes', 'Genèse', 'Matthieu'],
    correctAnswer: 2,
    explanation: 'La Genèse est le premier livre de la Bible, racontant la création.',
    verseRef: 'Genèse 1:1',
  },
  {
    id: 'at2',
    question: 'Combien de jours Dieu a-t-il mis pour créer le monde ?',
    options: ['5 jours', '6 jours', '7 jours', '10 jours'],
    correctAnswer: 1,
    explanation: 'Dieu a créé le monde en 6 jours et s\'est reposé le 7ème jour.',
    verseRef: 'Genèse 2:2',
  },
  {
    id: 'at3',
    question: 'Qui était la femme d\'Abraham ?',
    options: ['Rachel', 'Rebecca', 'Sara', 'Léa'],
    correctAnswer: 2,
    explanation: 'Sara était l\'épouse d\'Abraham et la mère d\'Isaac.',
    verseRef: 'Genèse 17:15',
  },
  {
    id: 'at4',
    question: 'Combien de fils Jacob a-t-il eus ?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    explanation: 'Jacob a eu 12 fils qui sont devenus les 12 tribus d\'Israël.',
    verseRef: 'Genèse 35:22-26',
  },
  {
    id: 'at5',
    question: 'Quel fleuve les Israélites ont-ils traversé pour entrer en terre promise ?',
    options: ['Le Nil', 'L\'Euphrate', 'Le Jourdain', 'Le Tigre'],
    correctAnswer: 2,
    explanation: 'Sous la conduite de Josué, les Israélites ont traversé le Jourdain.',
    verseRef: 'Josué 3:17',
  },
];

const questionsNouveauTestament: QuizQuestion[] = [
  {
    id: 'nt1',
    question: 'Dans quelle ville Jésus est-il né ?',
    options: ['Nazareth', 'Jérusalem', 'Bethléem', 'Capernaüm'],
    correctAnswer: 2,
    explanation: 'Jésus est né à Bethléem, comme prophétisé par le prophète Michée.',
    verseRef: 'Matthieu 2:1',
  },
  {
    id: 'nt2',
    question: 'Combien de disciples Jésus a-t-il choisis ?',
    options: ['7', '10', '12', '14'],
    correctAnswer: 2,
    explanation: 'Jésus a choisi 12 disciples pour le suivre et répandre son message.',
    verseRef: 'Matthieu 10:1-4',
  },
  {
    id: 'nt3',
    question: 'Quel disciple a renié Jésus trois fois ?',
    options: ['Jean', 'Pierre', 'Jacques', 'Thomas'],
    correctAnswer: 1,
    explanation: 'Pierre a renié Jésus trois fois avant le chant du coq.',
    verseRef: 'Matthieu 26:75',
  },
  {
    id: 'nt4',
    question: 'Quel est le premier miracle de Jésus ?',
    options: ['Guérir un aveugle', 'Changer l\'eau en vin', 'Multiplier les pains', 'Marcher sur l\'eau'],
    correctAnswer: 1,
    explanation: 'Jésus a changé l\'eau en vin aux noces de Cana.',
    verseRef: 'Jean 2:1-11',
  },
  {
    id: 'nt5',
    question: 'Qui a baptisé Jésus ?',
    options: ['Pierre', 'Jean-Baptiste', 'André', 'Paul'],
    correctAnswer: 1,
    explanation: 'Jean-Baptiste a baptisé Jésus dans le Jourdain.',
    verseRef: 'Matthieu 3:13',
  },
];

const questionsVersets: QuizQuestion[] = [
  {
    id: 'v1',
    question: 'Complétez : "Car Dieu a tant aimé le monde qu\'il a donné son Fils unique..."',
    options: ['...pour nous sauver', '...afin que quiconque croit en lui ne périsse point', '...pour notre bonheur', '...pour notre salut'],
    correctAnswer: 1,
    explanation: 'C\'est l\'un des versets les plus connus de la Bible.',
    verseRef: 'Jean 3:16',
  },
  {
    id: 'v2',
    question: 'Complétez : "L\'Éternel est mon berger..."',
    options: ['...je ne manquerai de rien', '...il me protège', '...je suis en sécurité', '...je n\'ai peur de rien'],
    correctAnswer: 0,
    explanation: 'Le Psaume 23 est un psaume de confiance en Dieu.',
    verseRef: 'Psaume 23:1',
  },
  {
    id: 'v3',
    question: 'Complétez : "Je suis le chemin, la vérité et..."',
    options: ['...la lumière', '...la vie', '...l\'amour', '...la paix'],
    correctAnswer: 1,
    explanation: 'Jésus déclare être le seul chemin vers le Père.',
    verseRef: 'Jean 14:6',
  },
  {
    id: 'v4',
    question: 'Complétez : "Au commencement était la Parole..."',
    options: ['...et la Parole était avec Dieu', '...et Dieu créa le monde', '...et la lumière fut', '...et tout commença'],
    correctAnswer: 0,
    explanation: 'Le prologue de l\'évangile de Jean parle de Jésus comme la Parole.',
    verseRef: 'Jean 1:1',
  },
  {
    id: 'v5',
    question: 'Complétez : "Demandez, et l\'on vous donnera; cherchez, et vous trouverez..."',
    options: ['...priez et vous serez exaucés', '...frappez et l\'on vous ouvrira', '...croyez et vous recevrez', '...espérez et vous verrez'],
    correctAnswer: 1,
    explanation: 'Jésus encourage ses disciples à persévérer dans la prière.',
    verseRef: 'Matthieu 7:7',
  },
];

const questionsGeneral: QuizQuestion[] = [
  {
    id: 'g1',
    question: 'Combien de livres contient la Bible ?',
    options: ['39', '66', '73', '81'],
    correctAnswer: 1,
    explanation: 'La Bible protestante contient 66 livres : 39 dans l\'Ancien Testament et 27 dans le Nouveau.',
    verseRef: '',
  },
  {
    id: 'g2',
    question: 'Quel est le plus court verset de la Bible ?',
    options: ['Aimez-vous', 'Jésus pleura', 'Priez sans cesse', 'Soyez saints'],
    correctAnswer: 1,
    explanation: '"Jésus pleura" est le verset le plus court de la Bible.',
    verseRef: 'Jean 11:35',
  },
  {
    id: 'g3',
    question: 'Quel est le dernier livre de la Bible ?',
    options: ['Jude', 'Apocalypse', 'Malachie', '3 Jean'],
    correctAnswer: 1,
    explanation: 'L\'Apocalypse, écrite par Jean, est le dernier livre du Nouveau Testament.',
    verseRef: 'Apocalypse 22:21',
  },
  {
    id: 'g4',
    question: 'Qui a écrit la plupart des épîtres du Nouveau Testament ?',
    options: ['Pierre', 'Jean', 'Paul', 'Jacques'],
    correctAnswer: 2,
    explanation: 'L\'apôtre Paul a écrit 13 des 21 épîtres du Nouveau Testament.',
    verseRef: '',
  },
  {
    id: 'g5',
    question: 'Quel est le plus long chapitre de la Bible ?',
    options: ['Psaume 119', 'Psaume 89', 'Ésaïe 53', 'Genèse 1'],
    correctAnswer: 0,
    explanation: 'Le Psaume 119 compte 176 versets et célèbre la Parole de Dieu.',
    verseRef: 'Psaume 119',
  },
];

// Map des questions par catégorie
export const questionsByCategory: Record<QuizCategory, QuizQuestion[]> = {
  personnages: questionsPersonnages,
  ancien_testament: questionsAncienTestament,
  nouveau_testament: questionsNouveauTestament,
  versets: questionsVersets,
  general: questionsGeneral,
};

// Fonction pour obtenir les questions d'un quiz
export function getQuestionsForQuiz(quizId: string): QuizQuestion[] {
  const quiz = allQuizzes.find(q => q.id === quizId);
  if (!quiz) return [];
  return questionsByCategory[quiz.category] || [];
}

// Liste de tous les quiz avec le bon nombre de questions
export const allQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Les personnages de la Bible',
    description: 'Testez vos connaissances sur les grandes figures bibliques',
    category: 'personnages',
    difficulty: 'easy',
    questionCount: questionsPersonnages.length,
    timeLimit: 5,
  },
  {
    id: '2',
    title: 'L\'Ancien Testament',
    description: 'Questions sur la Genèse, l\'Exode et les prophètes',
    category: 'ancien_testament',
    difficulty: 'medium',
    questionCount: questionsAncienTestament.length,
    timeLimit: 10,
  },
  {
    id: '3',
    title: 'Les Évangiles',
    description: 'Découvrez combien vous connaissez la vie de Jésus',
    category: 'nouveau_testament',
    difficulty: 'easy',
    questionCount: questionsNouveauTestament.length,
    timeLimit: 8,
  },
  {
    id: '4',
    title: 'Versets à compléter',
    description: 'Complétez les versets bibliques célèbres',
    category: 'versets',
    difficulty: 'hard',
    questionCount: questionsVersets.length,
    timeLimit: 15,
  },
  {
    id: '5',
    title: 'Quiz général',
    description: 'Un mélange de questions sur toute la Bible',
    category: 'general',
    difficulty: 'medium',
    questionCount: questionsGeneral.length,
    timeLimit: 10,
  },
];

// Fonction pour obtenir les quiz par catégorie
export function getQuizzesByCategory(category: QuizCategory): Quiz[] {
  return allQuizzes.filter(quiz => quiz.category === category);
}
