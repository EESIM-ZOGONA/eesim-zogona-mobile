-- Questions complètes pour le livre de la Genèse
-- Chapitres 1-50 couverts

-- Suppression des anciennes questions de Genèse pour éviter les doublons
DELETE FROM book_quiz_questions WHERE book_id = 'GEN';

-- Mise à jour du nombre de questions
UPDATE book_quizzes SET question_count = 60, difficulty = 'medium' WHERE book_id = 'GEN';

-- LA CRÉATION (Chapitres 1-2)
INSERT INTO book_quiz_questions (id, book_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, verse_ref) VALUES
('gen_001', 'GEN', 'Au commencement, qu''est-ce que Dieu a créé ?', 'L''homme et la femme', 'Les cieux et la terre', 'Les animaux', 'La lumière', 1, 'Le premier verset de la Bible établit que Dieu est le Créateur de tout.', 'Genèse 1:1'),
('gen_002', 'GEN', 'Quel était l''état de la terre au commencement ?', 'Belle et ordonnée', 'Informe et vide', 'Pleine de vie', 'Couverte de forêts', 1, 'La terre était informe et vide, et les ténèbres couvraient l''abîme.', 'Genèse 1:2'),
('gen_003', 'GEN', 'Quelle fut la première parole de Dieu ?', 'Que la terre produise', 'Que la lumière soit', 'Qu''il y ait des astres', 'Que les eaux se rassemblent', 1, 'Dieu dit : Que la lumière soit ! Et la lumière fut.', 'Genèse 1:3'),
('gen_004', 'GEN', 'Quel jour Dieu créa-t-il la lumière ?', 'Le premier jour', 'Le deuxième jour', 'Le troisième jour', 'Le quatrième jour', 0, 'Le premier jour, Dieu créa la lumière et sépara la lumière des ténèbres.', 'Genèse 1:3-5'),
('gen_005', 'GEN', 'Qu''est-ce que Dieu créa le deuxième jour ?', 'Les animaux', 'L''étendue (le ciel)', 'Les plantes', 'Le soleil et la lune', 1, 'Dieu fit l''étendue et sépara les eaux d''en bas des eaux d''en haut.', 'Genèse 1:6-8'),
('gen_006', 'GEN', 'Quel jour Dieu créa-t-il les plantes ?', 'Le premier jour', 'Le deuxième jour', 'Le troisième jour', 'Le cinquième jour', 2, 'Le troisième jour, la terre produisit de la verdure et des arbres.', 'Genèse 1:11-13'),
('gen_007', 'GEN', 'Quel jour le soleil et la lune furent-ils créés ?', 'Le premier jour', 'Le troisième jour', 'Le quatrième jour', 'Le cinquième jour', 2, 'Le quatrième jour, Dieu fit les luminaires pour présider au jour et à la nuit.', 'Genèse 1:14-19'),
('gen_008', 'GEN', 'Quels êtres vivants Dieu créa-t-il le cinquième jour ?', 'Les animaux terrestres', 'Les oiseaux et les poissons', 'L''homme', 'Les insectes', 1, 'Le cinquième jour, Dieu créa les créatures marines et les oiseaux.', 'Genèse 1:20-23'),
('gen_009', 'GEN', 'Quel jour l''homme fut-il créé ?', 'Le quatrième jour', 'Le cinquième jour', 'Le sixième jour', 'Le septième jour', 2, 'Dieu créa l''homme le sixième jour, après les animaux terrestres.', 'Genèse 1:26-31'),
('gen_010', 'GEN', 'À l''image de qui l''homme fut-il créé ?', 'Des anges', 'De Dieu', 'Des animaux', 'Du soleil', 1, 'Dieu créa l''homme à son image, à l''image de Dieu il le créa.', 'Genèse 1:27'),
('gen_011', 'GEN', 'Que fit Dieu le septième jour ?', 'Il créa l''homme', 'Il se reposa', 'Il créa les étoiles', 'Il planta le jardin', 1, 'Dieu acheva son œuvre et se reposa le septième jour.', 'Genèse 2:2'),
('gen_012', 'GEN', 'De quoi Dieu forma-t-il l''homme ?', 'De l''eau', 'De la poussière de la terre', 'Du feu', 'De la lumière', 1, 'L''Éternel Dieu forma l''homme de la poussière de la terre.', 'Genèse 2:7'),
('gen_013', 'GEN', 'Comment Dieu donna-t-il la vie à l''homme ?', 'Par une parole', 'En soufflant dans ses narines', 'Par le toucher', 'Par la pluie', 1, 'Il souffla dans ses narines un souffle de vie.', 'Genèse 2:7'),
('gen_014', 'GEN', 'Comment s''appelait le jardin où Dieu plaça l''homme ?', 'Jardin de Gethsémané', 'Jardin d''Éden', 'Jardin du Paradis', 'Jardin de Babylone', 1, 'L''Éternel Dieu planta un jardin en Éden, du côté de l''orient.', 'Genèse 2:8'),
('gen_015', 'GEN', 'Combien de fleuves sortaient d''Éden ?', 'Un', 'Deux', 'Quatre', 'Sept', 2, 'Un fleuve sortait d''Éden et se divisait en quatre bras.', 'Genèse 2:10'),
('gen_016', 'GEN', 'Quel arbre était au milieu du jardin ?', 'L''arbre de la connaissance seulement', 'L''arbre de vie et l''arbre de la connaissance', 'L''arbre de vie seulement', 'Le figuier', 1, 'L''arbre de vie et l''arbre de la connaissance du bien et du mal.', 'Genèse 2:9'),
('gen_017', 'GEN', 'De quel arbre Adam ne devait-il pas manger ?', 'L''arbre de vie', 'L''arbre de la connaissance du bien et du mal', 'Le figuier', 'L''olivier', 1, 'Tu ne mangeras pas de l''arbre de la connaissance du bien et du mal.', 'Genèse 2:17'),
('gen_018', 'GEN', 'Quelle serait la conséquence de manger du fruit interdit ?', 'La maladie', 'La mort', 'La vieillesse', 'La faim', 1, 'Le jour où tu en mangeras, tu mourras certainement.', 'Genèse 2:17'),
('gen_019', 'GEN', 'Pourquoi Dieu créa-t-il la femme ?', 'Pour la beauté du jardin', 'Car il n''était pas bon que l''homme soit seul', 'Pour nommer les animaux', 'Pour garder le jardin', 1, 'Il n''est pas bon que l''homme soit seul; je lui ferai une aide.', 'Genèse 2:18'),
('gen_020', 'GEN', 'De quoi Dieu forma-t-il la femme ?', 'De la poussière', 'D''une côte d''Adam', 'De l''eau', 'D''un arbre', 1, 'L''Éternel Dieu forma une femme de la côte qu''il avait prise.', 'Genèse 2:22'),

-- LA CHUTE (Chapitre 3)
('gen_021', 'GEN', 'Quel animal était le plus rusé de tous ?', 'Le lion', 'Le serpent', 'Le renard', 'L''aigle', 1, 'Le serpent était le plus rusé de tous les animaux des champs.', 'Genèse 3:1'),
('gen_022', 'GEN', 'Que dit le serpent à Ève concernant le fruit ?', 'Tu mourras', 'Vous ne mourrez point', 'Tu seras malade', 'Tu dormiras', 1, 'Vous ne mourrez point; mais Dieu sait que vous serez comme des dieux.', 'Genèse 3:4-5'),
('gen_023', 'GEN', 'Que fit Adam quand Ève lui donna du fruit ?', 'Il refusa', 'Il en mangea', 'Il le jeta', 'Il le planta', 1, 'Elle en donna aussi à son mari, qui était auprès d''elle, et il en mangea.', 'Genèse 3:6'),
('gen_024', 'GEN', 'Que virent Adam et Ève après avoir mangé le fruit ?', 'Des anges', 'Qu''ils étaient nus', 'Le serpent', 'Dieu', 1, 'Les yeux de l''un et de l''autre s''ouvrirent, et ils connurent qu''ils étaient nus.', 'Genèse 3:7'),
('gen_025', 'GEN', 'Que firent Adam et Ève pour se couvrir ?', 'Des vêtements de laine', 'Des ceintures de feuilles de figuier', 'Des peaux d''animaux', 'Des vêtements de lin', 1, 'Ils cousirent des feuilles de figuier et se firent des ceintures.', 'Genèse 3:7'),
('gen_026', 'GEN', 'Où Adam et Ève se cachèrent-ils ?', 'Dans une grotte', 'Parmi les arbres du jardin', 'Sous l''eau', 'Derrière un rocher', 1, 'L''homme et sa femme se cachèrent parmi les arbres du jardin.', 'Genèse 3:8'),
('gen_027', 'GEN', 'Qui Adam accusa-t-il pour son péché ?', 'Le serpent', 'La femme que Dieu lui avait donnée', 'Lui-même', 'Les animaux', 1, 'La femme que tu as mise auprès de moi m''a donné de l''arbre.', 'Genèse 3:12'),
('gen_028', 'GEN', 'Quelle malédiction le serpent reçut-il ?', 'Marcher sur son ventre', 'Perdre sa voix', 'Devenir aveugle', 'Vivre dans l''eau', 0, 'Tu marcheras sur ton ventre et tu mangeras de la poussière.', 'Genèse 3:14'),
('gen_029', 'GEN', 'Quelle promesse Dieu fit-il concernant la descendance de la femme ?', 'Elle dominerait la terre', 'Elle écraserait la tête du serpent', 'Elle vivrait éternellement', 'Elle serait riche', 1, 'Il t''écrasera la tête, et tu lui blesseras le talon.', 'Genèse 3:15'),
('gen_030', 'GEN', 'Quel nom Adam donna-t-il à sa femme ?', 'Sara', 'Ève', 'Rachel', 'Myriam', 1, 'Adam donna à sa femme le nom d''Ève, car elle fut la mère de tous les vivants.', 'Genèse 3:20'),
('gen_031', 'GEN', 'De quoi Dieu fit-il des vêtements pour Adam et Ève ?', 'De feuilles', 'De peaux', 'De lin', 'De laine', 1, 'L''Éternel Dieu fit à Adam et à sa femme des habits de peau.', 'Genèse 3:21'),
('gen_032', 'GEN', 'Qui gardait l''entrée du jardin d''Éden ?', 'Un lion', 'Des chérubins avec une épée flamboyante', 'Un ange', 'Un mur de feu', 1, 'Il posta des chérubins et la flamme de l''épée tournoyante.', 'Genèse 3:24'),

-- CAÏN ET ABEL (Chapitre 4)
('gen_033', 'GEN', 'Qui était le premier fils d''Adam et Ève ?', 'Abel', 'Seth', 'Caïn', 'Énoch', 2, 'Adam connut Ève, sa femme; elle conçut et enfanta Caïn.', 'Genèse 4:1'),
('gen_034', 'GEN', 'Quel était le métier de Caïn ?', 'Berger', 'Laboureur', 'Chasseur', 'Forgeron', 1, 'Caïn était laboureur.', 'Genèse 4:2'),
('gen_035', 'GEN', 'Quel était le métier d''Abel ?', 'Laboureur', 'Berger', 'Pêcheur', 'Constructeur', 1, 'Abel était berger.', 'Genèse 4:2'),
('gen_036', 'GEN', 'Quelle offrande Abel apporta-t-il à Dieu ?', 'Des fruits de la terre', 'Des premiers-nés de son troupeau', 'De l''or', 'Du vin', 1, 'Abel offrit des premiers-nés de son troupeau et de leur graisse.', 'Genèse 4:4'),
('gen_037', 'GEN', 'Pourquoi Caïn était-il en colère ?', 'Abel l''avait insulté', 'Dieu n''avait pas agréé son offrande', 'Ses récoltes étaient mauvaises', 'Il était malade', 1, 'L''Éternel porta un regard favorable sur Abel et son offrande, mais pas sur Caïn.', 'Genèse 4:4-5'),
('gen_038', 'GEN', 'Que fit Caïn à son frère Abel ?', 'Il le vendit', 'Il le tua', 'Il le chassa', 'Il lui pardonna', 1, 'Caïn se jeta sur son frère Abel et le tua.', 'Genèse 4:8'),
('gen_039', 'GEN', 'Que répondit Caïn quand Dieu lui demanda où était Abel ?', 'Il est au champ', 'Je ne sais pas, suis-je le gardien de mon frère ?', 'Il est mort', 'Il est parti', 1, 'Suis-je le gardien de mon frère ?', 'Genèse 4:9'),
('gen_040', 'GEN', 'Quel signe Dieu mit-il sur Caïn ?', 'Une marque pour le protéger', 'Une cicatrice', 'Un tatouage', 'Une couronne', 0, 'L''Éternel mit un signe sur Caïn pour que personne ne le tue.', 'Genèse 4:15'),
('gen_041', 'GEN', 'Où Caïn s''établit-il ?', 'En Éden', 'Au pays de Nod', 'En Égypte', 'À Babylone', 1, 'Caïn s''éloigna de la face de l''Éternel et habita au pays de Nod.', 'Genèse 4:16'),
('gen_042', 'GEN', 'Quel fils Adam et Ève eurent-ils après Abel ?', 'Énoch', 'Seth', 'Mathusalem', 'Noé', 1, 'Adam connut encore sa femme; elle enfanta un fils et l''appela Seth.', 'Genèse 4:25'),

-- NOÉ ET LE DÉLUGE (Chapitres 5-9)
('gen_043', 'GEN', 'Qui est l''homme qui a vécu le plus longtemps selon la Bible ?', 'Adam', 'Noé', 'Mathusalem', 'Énoch', 2, 'Mathusalem vécut 969 ans, puis il mourut.', 'Genèse 5:27'),
('gen_044', 'GEN', 'Qu''arriva-t-il à Énoch ?', 'Il mourut jeune', 'Dieu le prit sans qu''il meure', 'Il fut tué', 'Il devint roi', 1, 'Énoch marcha avec Dieu; puis il ne fut plus, parce que Dieu le prit.', 'Genèse 5:24'),
('gen_045', 'GEN', 'Pourquoi Dieu décida-t-il d''envoyer le déluge ?', 'Pour créer les océans', 'La méchanceté des hommes était grande', 'Pour punir les animaux', 'Pour rafraîchir la terre', 1, 'L''Éternel vit que la méchanceté des hommes était grande sur la terre.', 'Genèse 6:5'),
('gen_046', 'GEN', 'Qui trouva grâce aux yeux de l''Éternel ?', 'Adam', 'Seth', 'Noé', 'Mathusalem', 2, 'Mais Noé trouva grâce aux yeux de l''Éternel.', 'Genèse 6:8'),
('gen_047', 'GEN', 'De quel bois Noé devait-il construire l''arche ?', 'Bois de cèdre', 'Bois de gopher', 'Bois d''olivier', 'Bois de chêne', 1, 'Fais-toi une arche de bois de gopher.', 'Genèse 6:14'),
('gen_048', 'GEN', 'Combien d''étages l''arche avait-elle ?', 'Un', 'Deux', 'Trois', 'Quatre', 2, 'Tu feras à l''arche un étage inférieur, un second et un troisième.', 'Genèse 6:16'),
('gen_049', 'GEN', 'Combien de personnes entrèrent dans l''arche ?', 'Quatre', 'Six', 'Huit', 'Douze', 2, 'Noé, ses trois fils, sa femme et les trois femmes de ses fils.', 'Genèse 7:13'),
('gen_050', 'GEN', 'Combien de couples d''animaux purs Noé prit-il ?', 'Un couple', 'Deux couples', 'Sept couples', 'Dix couples', 2, 'Tu prendras sept couples de tous les animaux purs.', 'Genèse 7:2'),
('gen_051', 'GEN', 'Combien de jours et nuits dura la pluie du déluge ?', '7 jours', '40 jours', '100 jours', '150 jours', 1, 'La pluie tomba sur la terre pendant 40 jours et 40 nuits.', 'Genèse 7:12'),
('gen_052', 'GEN', 'Quel oiseau Noé envoya-t-il d''abord ?', 'Une colombe', 'Un corbeau', 'Un aigle', 'Un moineau', 1, 'Il lâcha le corbeau, qui sortit, allant et revenant.', 'Genèse 8:7'),
('gen_053', 'GEN', 'Que rapporta la colombe la deuxième fois ?', 'Rien', 'Une branche d''olivier', 'Un fruit', 'Une fleur', 1, 'La colombe revint avec une feuille d''olivier dans le bec.', 'Genèse 8:11'),
('gen_054', 'GEN', 'Sur quelle montagne l''arche s''arrêta-t-elle ?', 'Mont Sinaï', 'Mont Ararat', 'Mont Morija', 'Mont Carmel', 1, 'L''arche s''arrêta sur les montagnes d''Ararat.', 'Genèse 8:4'),
('gen_055', 'GEN', 'Quel signe Dieu donna-t-il après le déluge ?', 'Une étoile', 'Un arc-en-ciel', 'Un tremblement de terre', 'Une nuée de feu', 1, 'J''ai placé mon arc dans la nue; il servira de signe d''alliance.', 'Genèse 9:13'),
('gen_056', 'GEN', 'Que promit Dieu après le déluge ?', 'De ne plus jamais détruire la terre par l''eau', 'De donner la pluie régulièrement', 'D''envoyer des anges', 'De créer de nouveaux animaux', 0, 'Je ne frapperai plus tout ce qui est vivant comme je l''ai fait.', 'Genèse 8:21'),

-- LA TOUR DE BABEL (Chapitre 11)
('gen_057', 'GEN', 'Quelle langue parlaient tous les hommes avant Babel ?', 'L''hébreu', 'Une seule et même langue', 'Le grec', 'Plusieurs langues', 1, 'Toute la terre avait une seule langue et les mêmes mots.', 'Genèse 11:1'),
('gen_058', 'GEN', 'Que voulaient construire les hommes à Babel ?', 'Un temple', 'Une tour qui atteigne le ciel', 'Un palais', 'Une muraille', 1, 'Bâtissons une ville et une tour dont le sommet touche au ciel.', 'Genèse 11:4'),
('gen_059', 'GEN', 'Comment Dieu arrêta-t-il la construction de la tour ?', 'Par un tremblement de terre', 'En confondant leur langage', 'Par le feu', 'Par une tempête', 1, 'L''Éternel confondit le langage de toute la terre.', 'Genèse 11:9'),
('gen_060', 'GEN', 'Que signifie le nom Babel ?', 'Grande ville', 'Confusion', 'Tour haute', 'Gloire', 1, 'On l''appela Babel, car c''est là que l''Éternel confondit le langage.', 'Genèse 11:9');
