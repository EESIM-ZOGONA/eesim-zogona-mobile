import { useState, useEffect, useMemo, useCallback } from 'react';
import { Meditation, MeditationCategory } from '../types';

// Mock data - méditations quotidiennes
const mockMeditations: Meditation[] = [
  {
    id: '1',
    title: 'La confiance en Dieu',
    verse: 'Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta sagesse.',
    verseRef: 'Proverbes 3:5',
    content: 'Dans un monde rempli d\'incertitudes, la confiance en Dieu reste notre ancre. Aujourd\'hui, nous sommes invités à déposer nos soucis, nos projets et nos craintes entre les mains de Celui qui connaît la fin depuis le commencement.',
    reflection: 'Sur quoi ou sur qui as-tu tendance à t\'appuyer dans les moments difficiles ? Prends un moment pour identifier ces béquilles humaines et choisis consciemment de te tourner vers Dieu.',
    prayer: 'Seigneur, je reconnais que ma sagesse est limitée. Aide-moi à Te faire confiance pleinement, même quand je ne comprends pas Ton plan. Dirige mes pas aujourd\'hui. Amen.',
    date: '2024-12-21',
    author: 'Pasteur Jean',
    category: 'foi',
  },
  {
    id: '2',
    title: 'La paix qui surpasse toute intelligence',
    verse: 'Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.',
    verseRef: 'Philippiens 4:6',
    content: 'L\'anxiété est l\'un des plus grands défis de notre époque. Pourtant, Dieu nous offre une alternative : la prière accompagnée de gratitude. Cette combinaison puissante transforme notre perspective.',
    reflection: 'Quelles sont les choses qui te causent de l\'anxiété en ce moment ? Prends le temps de les nommer devant Dieu, puis remercie-Le pour au moins trois bénédictions dans ta vie.',
    prayer: 'Père céleste, je dépose devant Toi mes inquiétudes. Je choisis de Te remercier pour Ta fidélité. Remplis mon cœur de Ta paix qui dépasse ma compréhension. Amen.',
    date: '2024-12-22',
    author: 'Pasteur Marie',
    category: 'paix',
  },
  {
    id: '3',
    title: 'La force dans la faiblesse',
    verse: 'Ma grâce te suffit, car ma puissance s\'accomplit dans la faiblesse.',
    verseRef: '2 Corinthiens 12:9',
    content: 'Paradoxalement, c\'est dans nos moments de plus grande faiblesse que la puissance de Dieu peut se manifester le plus clairement. Notre insuffisance devient le terrain où Sa suffisance brille.',
    reflection: 'Y a-t-il une faiblesse ou une limitation que tu essaies de cacher ? Comment cette faiblesse pourrait-elle devenir une opportunité pour la grâce de Dieu ?',
    prayer: 'Seigneur, je reconnais mes faiblesses devant Toi. Que Ta force se manifeste à travers mes limitations. Aide-moi à me glorifier de mes faiblesses pour que Ta puissance repose sur moi. Amen.',
    date: '2024-12-23',
    author: 'Pasteur Jean',
    category: 'foi',
  },
  {
    id: '4',
    title: 'L\'amour inconditionnel',
    verse: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.',
    verseRef: 'Jean 3:16',
    content: 'L\'amour de Dieu n\'est pas basé sur nos performances. Il nous a aimés alors que nous étions encore pécheurs. Cet amour transformateur nous invite à aimer les autres de la même manière.',
    reflection: 'Comment as-tu expérimenté l\'amour inconditionnel de Dieu récemment ? Y a-t-il quelqu\'un dans ta vie qui a besoin de recevoir cet amour à travers toi ?',
    prayer: 'Merci Père pour Ton amour inépuisable. Aide-moi à recevoir pleinement cet amour et à le partager avec ceux qui m\'entourent. Que mon amour pour les autres soit le reflet du Tien. Amen.',
    date: '2024-12-24',
    author: 'Pasteur Marie',
    category: 'amour',
  },
  {
    id: '5',
    title: 'Lumière du monde',
    verse: 'Je suis la lumière du monde; celui qui me suit ne marchera pas dans les ténèbres, mais il aura la lumière de la vie.',
    verseRef: 'Jean 8:12',
    content: 'En cette période de Noël, nous célébrons la venue de la Lumière dans notre monde. Jésus dissipe les ténèbres de nos vies et nous appelle à refléter cette lumière autour de nous.',
    reflection: 'Dans quels domaines de ta vie as-tu besoin que la lumière de Christ vienne éclairer ? Comment peux-tu être lumière pour quelqu\'un aujourd\'hui ?',
    prayer: 'Seigneur Jésus, Lumière du monde, viens illuminer les recoins sombres de ma vie. Fais de moi un porteur de Ta lumière dans un monde qui en a tant besoin. Amen.',
    date: '2024-12-25',
    author: 'Pasteur Jean',
    category: 'esperance',
  },
  {
    id: '6',
    title: 'Nouveaux départs',
    verse: 'Si quelqu\'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées; voici, toutes choses sont devenues nouvelles.',
    verseRef: '2 Corinthiens 5:17',
    content: 'Chaque jour est une opportunité de nouveau départ avec Dieu. Peu importe ce qui s\'est passé hier, Sa miséricorde se renouvelle chaque matin. Tu peux avancer sans être enchaîné par ton passé.',
    reflection: 'De quelles "choses anciennes" as-tu besoin de te libérer ? Quelles nouvelles choses Dieu veut-Il faire dans ta vie ?',
    prayer: 'Père, merci pour les nouveaux départs que Tu offres. Aide-moi à laisser derrière moi ce qui m\'empêche d\'avancer et à embrasser la nouveauté de vie en Christ. Amen.',
    date: '2024-12-26',
    author: 'Pasteur Marie',
    category: 'esperance',
  },
  {
    id: '7',
    title: 'La prière persévérante',
    verse: 'Demandez, et l\'on vous donnera; cherchez, et vous trouverez; frappez, et l\'on vous ouvrira.',
    verseRef: 'Matthieu 7:7',
    content: 'Dieu nous invite à persévérer dans la prière. Ce n\'est pas parce que nous devons Le convaincre, mais parce que la prière transforme notre cœur et aligne notre volonté sur la Sienne.',
    reflection: 'Pour quelle situation pries-tu depuis longtemps ? Qu\'est-ce que cette attente t\'apprend sur toi-même et sur Dieu ?',
    prayer: 'Seigneur, donne-moi la persévérance dans la prière. Que je ne me décourage pas mais que je continue à frapper à Ta porte avec foi, sachant que Tu entends et que Tu réponds. Amen.',
    date: '2024-12-27',
    author: 'Pasteur Jean',
    category: 'priere',
  },
  {
    id: '8',
    title: 'Le pardon libérateur',
    verse: 'Pardonnez-vous réciproquement, comme Dieu vous a pardonné en Christ.',
    verseRef: 'Éphésiens 4:32',
    content: 'Le pardon n\'est pas un sentiment, c\'est une décision. Quand nous pardonnons, nous nous libérons nous-mêmes des chaînes de l\'amertume et nous reflétons la grâce que Dieu nous a accordée.',
    reflection: 'Y a-t-il quelqu\'un que tu as besoin de pardonner aujourd\'hui ? Rappelle-toi que pardonner ne signifie pas approuver ce qui s\'est passé, mais choisir de ne plus être prisonnier du passé.',
    prayer: 'Père, aide-moi à pardonner comme Tu m\'as pardonné. Libère mon cœur de toute amertume et remplis-le de Ta grâce. Amen.',
    date: '2024-12-28',
    author: 'Pasteur Marie',
    category: 'pardon',
  },
  {
    id: '9',
    title: 'La sagesse divine',
    verse: 'Si quelqu\'un d\'entre vous manque de sagesse, qu\'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.',
    verseRef: 'Jacques 1:5',
    content: 'La sagesse de Dieu n\'est pas réservée à une élite. Elle est disponible pour tous ceux qui la demandent avec foi. Cette sagesse nous guide dans nos décisions quotidiennes et nous aide à vivre selon Sa volonté.',
    reflection: 'Dans quelle situation as-tu besoin de la sagesse de Dieu aujourd\'hui ? As-tu pris le temps de la Lui demander ?',
    prayer: 'Seigneur, je reconnais que j\'ai besoin de Ta sagesse. Accorde-moi le discernement pour prendre les bonnes décisions et la compréhension pour voir les choses selon Ta perspective. Amen.',
    date: '2024-12-29',
    author: 'Pasteur Jean',
    category: 'sagesse',
  },
  {
    id: '10',
    title: 'L\'espérance inébranlable',
    verse: 'Or, l\'espérance ne trompe point, parce que l\'amour de Dieu est répandu dans nos cœurs par le Saint-Esprit qui nous a été donné.',
    verseRef: 'Romains 5:5',
    content: 'L\'espérance chrétienne n\'est pas un vœu pieux mais une certitude ancrée dans les promesses de Dieu. Même dans les temps difficiles, nous pouvons garder espoir car notre Dieu est fidèle.',
    reflection: 'Qu\'est-ce qui menace ton espérance aujourd\'hui ? Comment peux-tu te rappeler les promesses de Dieu dans cette situation ?',
    prayer: 'Père, renouvelle mon espérance. Que je me souvienne de Ta fidélité passée et que je fasse confiance à Tes promesses pour l\'avenir. Remplis-moi de Ton Esprit et de Son amour. Amen.',
    date: '2024-12-30',
    author: 'Pasteur Marie',
    category: 'esperance',
  },
];

interface UseMeditationsOptions {
  category?: MeditationCategory;
  search?: string;
  page?: number;
  limit?: number;
  showAll?: boolean;
}

interface UseMeditationsReturn {
  meditations: Meditation[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
  todayMeditation: Meditation;
  categories: { key: MeditationCategory; label: string }[];
}

const ITEMS_PER_PAGE = 5;

const categoryLabels: Record<MeditationCategory, string> = {
  foi: 'Foi',
  amour: 'Amour',
  pardon: 'Pardon',
  priere: 'Prière',
  esperance: 'Espérance',
  sagesse: 'Sagesse',
  paix: 'Paix',
};

export function useMeditations(options?: UseMeditationsOptions): UseMeditationsReturn {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);

  const { category, search, limit = ITEMS_PER_PAGE, showAll = false } = options || {};

  // Get today's meditation based on day of year
  const todayMeditation = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return mockMeditations[dayOfYear % mockMeditations.length];
  }, []);

  // Filter meditations based on category and search
  const filteredMeditations = useMemo(() => {
    let result = [...mockMeditations];

    if (category) {
      result = result.filter((m) => m.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(searchLower) ||
          m.verse.toLowerCase().includes(searchLower) ||
          m.verseRef.toLowerCase().includes(searchLower) ||
          m.content.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [category, search]);

  // Paginated meditations
  const paginatedMeditations = useMemo(() => {
    if (showAll) {
      return filteredMeditations;
    }
    return filteredMeditations.slice(0, page * limit);
  }, [filteredMeditations, page, limit, showAll]);

  const hasMore = !showAll && paginatedMeditations.length < filteredMeditations.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  const refresh = useCallback(() => {
    setLoading(true);
    setPage(1);
    // Simulate API call
    setTimeout(() => {
      setMeditations(mockMeditations);
      setLoading(false);
    }, 500);
  }, []);

  // Initial load
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMeditations(mockMeditations);
      setLoading(false);
    }, 300);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [category, search]);

  const categories = useMemo(() => {
    return Object.entries(categoryLabels).map(([key, label]) => ({
      key: key as MeditationCategory,
      label,
    }));
  }, []);

  return {
    meditations: paginatedMeditations,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    todayMeditation,
    categories,
  };
}
