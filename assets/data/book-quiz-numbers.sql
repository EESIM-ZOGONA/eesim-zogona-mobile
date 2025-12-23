-- Questions pour le livre des Nombres
-- Le voyage d'Israël dans le désert

-- Le recensement (Chapitres 1-2)
INSERT OR IGNORE INTO book_quiz_questions (id, book_id, question, options, correct_answer, explanation, verse_ref) VALUES
('num_001', 'NUM', 'Dans quel désert le livre des Nombres commence-t-il ?', '["Le désert de Paran","Le désert du Sinaï","Le désert de Shur","Le désert de Tsîn"]', 1, 'L''Éternel parla à Moïse dans le désert du Sinaï, dans la tente d''assignation.', 'Nombres 1:1'),
('num_002', 'NUM', 'Quel était le but du premier recensement ?', '["Collecter des impôts","Compter tous les hommes de 20 ans et plus, propres à la guerre","Distribuer la terre","Organiser les fêtes"]', 1, 'Le recensement comptait tous les hommes de vingt ans et au-dessus, propres au service militaire.', 'Nombres 1:3'),
('num_003', 'NUM', 'Quelle tribu n''a pas été comptée avec les autres pour le service militaire ?', '["Juda","Benjamin","Lévi","Éphraïm"]', 2, 'La tribu de Lévi ne fut pas comptée car elle était consacrée au service du tabernacle.', 'Nombres 1:47-49'),
('num_004', 'NUM', 'Combien d''hommes propres au service militaire y avait-il en tout ?', '["500 000","603 550","700 000","1 000 000"]', 1, 'Le total était de 603 550 hommes.', 'Nombres 1:46'),
('num_005', 'NUM', 'Quelle tribu était la plus nombreuse ?', '["Ruben","Juda","Dan","Manassé"]', 1, 'Juda était la tribu la plus nombreuse avec 74 600 hommes.', 'Nombres 1:27'),
('num_006', 'NUM', 'Comment les tribus campaient-elles autour du tabernacle ?', '["En cercle","En carré, trois tribus de chaque côté","En ligne droite","Sans ordre"]', 1, 'Les tribus campaient en carré autour de la tente d''assignation, trois de chaque côté.', 'Nombres 2:2'),
('num_007', 'NUM', 'Quelle tribu campait à l''est, face à l''entrée du tabernacle ?', '["Lévi","Juda","Ruben","Dan"]', 1, 'Juda campait à l''orient, à l''est, avec Issacar et Zabulon.', 'Nombres 2:3'),

-- Les Lévites (Chapitres 3-4)
('num_008', 'NUM', 'À la place de qui les Lévites étaient-ils pris ?', '["À la place des sacrificateurs","À la place de tous les premiers-nés d''Israël","À la place des anciens","À la place des guerriers"]', 1, 'Les Lévites furent pris à la place de tous les premiers-nés parmi les enfants d''Israël.', 'Nombres 3:12'),
('num_009', 'NUM', 'Combien y avait-il de clans lévitiques ?', '["Deux","Trois: Guershon, Kehath et Merari","Quatre","Douze"]', 1, 'Il y avait trois familles lévitiques: Guershonites, Kehathites et Merarites.', 'Nombres 3:17'),
('num_010', 'NUM', 'De quoi les Kehathites étaient-ils responsables ?', '["Des tentures","Des objets les plus saints: l''arche, la table, le chandelier, les autels","Des cordes et piquets","De la nourriture"]', 1, 'Les Kehathites avaient la charge des objets les plus saints.', 'Nombres 3:31'),
('num_011', 'NUM', 'Qui pouvait toucher les objets saints avant leur transport ?', '["N''importe quel Lévite","Seulement Aaron et ses fils","Tout le peuple","Les anciens"]', 1, 'Seuls Aaron et ses fils pouvaient couvrir les objets saints avant que les Kehathites les portent.', 'Nombres 4:15'),
('num_012', 'NUM', 'Quelle était la tranche d''âge pour le service actif des Lévites ?', '["20 à 50 ans","25 à 50 ans","30 à 50 ans","18 à 60 ans"]', 2, 'Les Lévites servaient de trente à cinquante ans.', 'Nombres 4:3'),
('num_013', 'NUM', 'Que se passait-il si un Kehathite touchait un objet saint ?', '["Il était béni","Il mourrait","Il devenait sacrificateur","Rien"]', 1, 'Les Kehathites ne devaient pas toucher les choses saintes sous peine de mort.', 'Nombres 4:15'),

-- Lois diverses (Chapitres 5-6)
('num_014', 'NUM', 'Que devait faire une personne soupçonnée d''infidélité conjugale ?', '["Rien de spécial","Boire les eaux amères devant le sacrificateur","Être bannie","Offrir un sacrifice"]', 1, 'La femme soupçonnée d''infidélité devait subir l''épreuve des eaux amères.', 'Nombres 5:18-22'),
('num_015', 'NUM', 'Qu''est-ce qu''un Naziréen ?', '["Un habitant de Nazareth","Une personne consacrée à Dieu par un vœu spécial","Un sacrificateur","Un prophète"]', 1, 'Le naziréen était quelqu''un qui se consacrait à l''Éternel par un vœu spécial.', 'Nombres 6:2'),
('num_016', 'NUM', 'Quelles trois choses un Naziréen devait-il éviter ?', '["Travail, voyage, mariage","Vin, se couper les cheveux, toucher un mort","Pain, viande, poisson","Parler, rire, pleurer"]', 1, 'Le naziréen devait s''abstenir de vin, ne pas couper ses cheveux et éviter tout contact avec un mort.', 'Nombres 6:3-7'),
('num_017', 'NUM', 'Quelle bénédiction célèbre se trouve dans Nombres 6 ?', '["La bénédiction de Melchisédek","La bénédiction aaronique","La bénédiction de Moïse","La bénédiction de Jacob"]', 1, 'Que l''Éternel te bénisse et te garde! Que l''Éternel fasse luire sa face sur toi...', 'Nombres 6:24-26'),
('num_018', 'NUM', 'Combien de fois le nom de l''Éternel est-il mentionné dans la bénédiction aaronique ?', '["Une fois","Deux fois","Trois fois","Quatre fois"]', 2, 'Le nom de l''Éternel est mentionné trois fois dans cette bénédiction.', 'Nombres 6:24-26'),

-- Les offrandes des chefs (Chapitre 7)
('num_019', 'NUM', 'Combien de jours dura la dédicace de l''autel ?', '["Sept jours","Douze jours","Quatorze jours","Quarante jours"]', 1, 'Chaque chef apporta son offrande pendant douze jours, un par tribu.', 'Nombres 7:10-88'),
('num_020', 'NUM', 'Que chaque chef tribal apportait-il de semblable ?', '["Des offrandes différentes","Les mêmes offrandes: plat d''argent, coupe d''argent, animaux","Des quantités variées","Des dons symboliques"]', 1, 'Chaque chef apportait les mêmes offrandes: un plat d''argent, une coupe d''argent et des animaux.', 'Nombres 7:13-88'),
('num_021', 'NUM', 'Quel était le total des animaux offerts pendant la dédicace de l''autel ?', '["12 de chaque","12 taureaux, 12 béliers, 12 agneaux, 12 boucs","100 de chaque","Nombres non précisés"]', 1, 'Le total incluait 12 de chaque type d''animal, un par tribu.', 'Nombres 7:87-88'),

-- Le chandelier et la consécration des Lévites (Chapitre 8)
('num_022', 'NUM', 'Comment les Lévites devaient-ils être purifiés ?', '["Par l''eau seulement","Par aspersion d''eau, rasage du corps et lavage des vêtements","Par le feu","Par le sang"]', 1, 'Les Lévites étaient aspergés d''eau, rasaient tout leur corps et lavaient leurs vêtements.', 'Nombres 8:7'),
('num_023', 'NUM', 'Que devaient faire les enfants d''Israël avec les Lévites lors de leur consécration ?', '["Les ignorer","Poser leurs mains sur eux","Les porter","Les éviter"]', 1, 'Les enfants d''Israël posèrent leurs mains sur les Lévites.', 'Nombres 8:10'),
('num_024', 'NUM', 'À quel âge les Lévites cessaient-ils le service actif ?', '["À 40 ans","À 50 ans","À 60 ans","À 70 ans"]', 1, 'À partir de cinquante ans, le Lévite cessait le service actif.', 'Nombres 8:25'),

-- La Pâque et la nuée (Chapitre 9)
('num_025', 'NUM', 'Que faire pour ceux qui étaient impurs lors de la Pâque ?', '["Ils ne pouvaient pas la célébrer","Ils pouvaient la célébrer le mois suivant","Ils étaient exclus pour toujours","Ils devaient attendre l''année suivante"]', 1, 'Ceux qui étaient impurs pouvaient célébrer la Pâque le quatorzième jour du deuxième mois.', 'Nombres 9:10-11'),
('num_026', 'NUM', 'Qu''est-ce qui guidait le peuple dans le désert de jour ?', '["Moïse seul","Une colonne de nuée","Le soleil","Les étoiles"]', 1, 'La nuée couvrait le tabernacle le jour.', 'Nombres 9:15-16'),
('num_027', 'NUM', 'Qu''est-ce qui apparaissait la nuit au-dessus du tabernacle ?', '["L''obscurité","L''apparence d''un feu","La lune","Rien de spécial"]', 1, 'La nuit, la nuée avait l''apparence d''un feu.', 'Nombres 9:16'),
('num_028', 'NUM', 'Comment le peuple savait-il quand partir ou s''arrêter ?', '["Par la voix de Moïse","Par le mouvement de la nuée","Par un calendrier","Par les saisons"]', 1, 'Quand la nuée s''élevait, ils partaient; quand elle s''arrêtait, ils campaient.', 'Nombres 9:17-18'),

-- Les trompettes d'argent (Chapitre 10)
('num_029', 'NUM', 'Combien de trompettes d''argent Moïse devait-il faire ?', '["Une","Deux","Sept","Douze"]', 1, 'L''Éternel ordonna de faire deux trompettes d''argent.', 'Nombres 10:2'),
('num_030', 'NUM', 'À quoi servaient les trompettes ?', '["À la musique seulement","À convoquer l''assemblée et donner le signal du départ","À effrayer les ennemis","Aux fêtes uniquement"]', 1, 'Les trompettes servaient à convoquer l''assemblée et à faire lever les camps.', 'Nombres 10:2'),
('num_031', 'NUM', 'Qui avait le droit de sonner des trompettes ?', '["Tout le peuple","Les sacrificateurs, fils d''Aaron","Les Lévites","Les chefs de tribu"]', 1, 'Ce sont les sacrificateurs, fils d''Aaron, qui devaient sonner des trompettes.', 'Nombres 10:8'),
('num_032', 'NUM', 'Qui était le beau-père de Moïse mentionné au départ du Sinaï ?', '["Jéthro","Hobab, fils de Réuel","Aaron","Caleb"]', 1, 'Moïse parla à Hobab, fils de Réuel le Madianite, beau-père de Moïse.', 'Nombres 10:29'),

-- Les murmures et Tabeéra (Chapitre 11)
('num_033', 'NUM', 'Pourquoi l''endroit fut-il appelé Tabeéra ?', '["Le peuple y trouva de l''eau","Le feu de l''Éternel brûla parmi eux à cause de leurs murmures","C''était un lieu de repos","Pour honorer un chef"]', 1, 'Le feu de l''Éternel brûla parmi eux, consumant une partie du camp à cause de leurs plaintes.', 'Nombres 11:1-3'),
('num_034', 'NUM', 'De quoi le peuple se plaignait-il à Kibroth-Hattaava ?', '["Du manque d''eau","Du désir de viande et de la nourriture d''Égypte","Du chemin trop long","De Moïse"]', 1, 'Ils se souvinrent des poissons, concombres, melons et autres aliments d''Égypte et réclamèrent de la viande.', 'Nombres 11:4-6'),
('num_035', 'NUM', 'Comment le peuple décrivait-il la manne ?', '["Délicieuse","Nos yeux ne voient que cette manne","Variée","Abondante"]', 1, 'Le peuple disait: maintenant notre âme est desséchée; nos yeux ne voient que cette manne.', 'Nombres 11:6'),
('num_036', 'NUM', 'Combien d''anciens Dieu dit-il à Moïse de rassembler pour l''aider ?', '["Douze","Quarante","Soixante-dix","Cent"]', 2, 'Dieu dit de rassembler soixante-dix anciens d''Israël.', 'Nombres 11:16'),
('num_037', 'NUM', 'Que fit l''Esprit sur les soixante-dix anciens ?', '["Rien","Il reposa sur eux et ils prophétisèrent","Ils furent guéris","Ils furent transformés"]', 1, 'L''Esprit reposa sur eux et ils prophétisèrent.', 'Nombres 11:25'),
('num_038', 'NUM', 'Deux hommes prophétisèrent dans le camp au lieu de la tente. Qui étaient-ils ?', '["Aaron et Hur","Eldad et Médad","Caleb et Josué","Nadab et Abihu"]', 1, 'Eldad et Médad prophétisèrent dans le camp.', 'Nombres 11:26'),
('num_039', 'NUM', 'Quelle fut la réponse de Moïse quand Josué voulut les empêcher ?', '["Qu''on les arrête","Que tout le peuple de l''Éternel fût prophète!","Qu''ils viennent à la tente","Silence"]', 1, 'Moïse dit: Puisse tout le peuple de l''Éternel être composé de prophètes!', 'Nombres 11:29'),
('num_040', 'NUM', 'Comment Dieu envoya-t-il des cailles ?', '["En petite quantité","Un vent poussa des cailles sur un jour de marche autour du camp, sur deux coudées de hauteur","Quelques-unes par jour","Par miracle instantané"]', 1, 'Un vent poussa des cailles en si grande quantité qu''elles couvraient le sol sur deux coudées.', 'Nombres 11:31'),
('num_041', 'NUM', 'Que signifie Kibroth-Hattaava ?', '["Lieu de repos","Sépulcres de la convoitise","Camp des justes","Source d''eau"]', 1, 'Ce lieu fut appelé Kibroth-Hattaava (sépulcres de la convoitise) car le peuple convoiteur y mourut.', 'Nombres 11:34'),

-- Marie et Aaron contre Moïse (Chapitre 12)
('num_042', 'NUM', 'Pourquoi Marie et Aaron parlèrent-ils contre Moïse ?', '["Son leadership","À cause de sa femme éthiopienne et car ils voulaient la même autorité","Sa décision sur les cailles","Son âge"]', 1, 'Ils critiquèrent Moïse à cause de sa femme éthiopienne et questionnèrent son autorité.', 'Nombres 12:1-2'),
('num_043', 'NUM', 'Comment Moïse est-il décrit dans ce chapitre ?', '["Fier","L''homme le plus humble sur la terre","Sévère","Impatient"]', 1, 'Moïse était un homme très humble, plus qu''aucun homme sur la face de la terre.', 'Nombres 12:3'),
('num_044', 'NUM', 'Comment Dieu dit-il qu''il parlait à Moïse ?', '["Par des songes","Bouche à bouche, non par énigmes","Par des anges","Par le tonnerre"]', 1, 'Dieu parlait à Moïse bouche à bouche, clairement et non par énigmes.', 'Nombres 12:8'),
('num_045', 'NUM', 'Quelle punition Marie reçut-elle ?', '["L''exil","La lèpre blanche comme la neige","La cécité","La mort"]', 1, 'Marie devint lépreuse, blanche comme la neige.', 'Nombres 12:10'),
('num_046', 'NUM', 'Combien de temps Marie fut-elle exclue du camp ?', '["Trois jours","Sept jours","Quatorze jours","Quarante jours"]', 1, 'Marie fut exclue du camp pendant sept jours.', 'Nombres 12:14-15'),

-- Les espions (Chapitre 13)
('num_047', 'NUM', 'Combien d''espions furent envoyés explorer Canaan ?', '["Deux","Dix","Douze","Vingt"]', 2, 'Douze espions furent envoyés, un de chaque tribu.', 'Nombres 13:2'),
('num_048', 'NUM', 'Combien de temps les espions restèrent-ils dans le pays ?', '["Une semaine","Quarante jours","Trois mois","Un an"]', 1, 'Ils explorèrent le pays pendant quarante jours.', 'Nombres 13:25'),
('num_049', 'NUM', 'Qu''est-ce que les espions rapportèrent de la vallée d''Eschcol ?', '["De l''or","Une grappe de raisin portée à deux, des grenades et des figues","De l''eau","Des pierres précieuses"]', 1, 'Ils coupèrent une grappe de raisin qu''ils portèrent à deux, avec des grenades et des figues.', 'Nombres 13:23'),
('num_050', 'NUM', 'Comment les dix espions décrivirent-ils les habitants de Canaan ?', '["Faibles et peu nombreux","Des géants, fils d''Anak, devant qui nous étions comme des sauterelles","Amicaux","Malades"]', 1, 'Ils parlèrent de géants, fils d''Anak, et dirent: nous étions à nos yeux comme des sauterelles.', 'Nombres 13:33'),
('num_051', 'NUM', 'Quels deux espions eurent un rapport positif ?', '["Ruben et Siméon","Josué et Caleb","Aaron et Hur","Moïse et Aaron"]', 1, 'Josué et Caleb encouragèrent le peuple à monter conquérir le pays.', 'Nombres 13:30; 14:6-9'),

-- La rébellion et le jugement (Chapitre 14)
('num_052', 'NUM', 'Comment le peuple réagit-il au rapport des dix espions ?', '["Avec courage","En pleurant toute la nuit et voulant retourner en Égypte","Avec foi","En priant"]', 1, 'Toute l''assemblée pleura et murmura, voulant retourner en Égypte.', 'Nombres 14:1-4'),
('num_053', 'NUM', 'Que voulait faire le peuple à Josué et Caleb ?', '["Les honorer","Les lapider","Les écouter","Les nommer chefs"]', 1, 'Toute l''assemblée parlait de les lapider.', 'Nombres 14:10'),
('num_054', 'NUM', 'Quelle punition Dieu prononça-t-il contre cette génération ?', '["Une semaine de jeûne","Quarante ans d''errance dans le désert et mort de tous les adultes","Une année de pénitence","Trois mois de marche supplémentaires"]', 1, 'Ils erreront quarante ans dans le désert et tous les adultes de plus de 20 ans mourront.', 'Nombres 14:33-35'),
('num_055', 'NUM', 'Combien de temps pour chaque jour d''exploration ?', '["Un mois par jour","Une année par jour","Une semaine par jour","Un jour par jour"]', 1, 'Une année pour chaque jour, soit quarante années de punition pour quarante jours d''exploration.', 'Nombres 14:34'),
('num_056', 'NUM', 'Que firent certains Israélites après avoir entendu le jugement ?', '["Ils obéirent","Ils montèrent quand même attaquer malgré l''avertissement de Moïse","Ils prièrent","Ils jeûnèrent"]', 1, 'Ils montèrent présomptueusement et furent battus par les Amalécites et les Cananéens.', 'Nombres 14:44-45'),

-- Korach, Dathan et Abiram (Chapitre 16)
('num_057', 'NUM', 'Qui était Korach ?', '["Un Rubenite","Un Lévite de la famille de Kehath","Un sacrificateur","Un étranger"]', 1, 'Korach était fils de Yitsehar, fils de Kehath, fils de Lévi.', 'Nombres 16:1'),
('num_058', 'NUM', 'Combien d''hommes se joignirent à la rébellion de Korach ?', '["50","100","250 chefs de l''assemblée","500"]', 2, 'Deux cent cinquante hommes, chefs de l''assemblée, se joignirent à eux.', 'Nombres 16:2'),
('num_059', 'NUM', 'Quelle était l''accusation de Korach contre Moïse et Aaron ?', '["Mauvais leadership","Vous vous élevez au-dessus de l''assemblée, car tous sont saints","Corruption","Faiblesse"]', 1, 'Ils accusaient Moïse et Aaron de s''élever au-dessus de l''assemblée de l''Éternel.', 'Nombres 16:3'),
('num_060', 'NUM', 'Comment la terre engloutit-elle les rebelles ?', '["Par un tremblement de terre normal","La terre ouvrit sa bouche et les engloutit vivants","Par une inondation","Par un glissement de terrain"]', 1, 'La terre ouvrit sa bouche et les engloutit avec leurs familles et leurs biens.', 'Nombres 16:32'),
('num_061', 'NUM', 'Que devint le sort des 250 hommes avec les encensoirs ?', '["Ils furent pardonnés","Un feu de l''Éternel les consuma","Ils s''enfuirent","Ils se repentirent"]', 1, 'Un feu sortit de devant l''Éternel et les consuma.', 'Nombres 16:35'),
('num_062', 'NUM', 'Que fit-on avec les encensoirs des rebelles ?', '["On les jeta","On en fit un revêtement pour l''autel comme avertissement","On les enterra","On les fondit"]', 1, 'Ils furent martelés pour faire un revêtement de l''autel comme mémorial.', 'Nombres 16:38-40'),

-- Le bâton d'Aaron (Chapitre 17)
('num_063', 'NUM', 'Combien de bâtons furent placés devant l''arche ?', '["Un","Trois","Douze, un par tribu","Vingt"]', 2, 'Douze bâtons furent placés, un pour chaque tribu, le nom du chef inscrit dessus.', 'Nombres 17:2'),
('num_064', 'NUM', 'Quel bâton fleurit miraculeusement ?', '["Celui de Moïse","Celui d''Aaron pour la tribu de Lévi","Celui de Juda","Celui de Ruben"]', 1, 'Le bâton d''Aaron pour la maison de Lévi fleurit.', 'Nombres 17:8'),
('num_065', 'NUM', 'Que produisit le bâton d''Aaron ?', '["Des feuilles seulement","Des boutons, des fleurs et des amandes mûres","Des figues","Des raisins"]', 1, 'Il produisit des boutons, donna des fleurs et porta des amandes mûres.', 'Nombres 17:8'),
('num_066', 'NUM', 'Où le bâton d''Aaron fut-il conservé ?', '["Dans une tente spéciale","Devant l''arche du témoignage","Chez Aaron","Enterré"]', 1, 'Le bâton fut remis devant le témoignage pour être conservé.', 'Nombres 17:10'),

-- Le serpent d'airain (Chapitre 21)
('num_067', 'NUM', 'Pourquoi Dieu envoya-t-il des serpents brûlants ?', '["Pour tester le peuple","À cause des murmures du peuple contre Dieu et Moïse","Pour les guider","Pour les nourrir"]', 1, 'Le peuple murmura contre Dieu et Moïse à cause du voyage, alors Dieu envoya des serpents.', 'Nombres 21:5-6'),
('num_068', 'NUM', 'Quel remède Dieu donna-t-il pour les morsures de serpent ?', '["Un médicament","Un serpent d''airain élevé sur une perche","Une prière spéciale","De l''eau bénite"]', 1, 'Moïse fit un serpent d''airain et le plaça sur une perche; quiconque le regardait vivait.', 'Nombres 21:9'),
('num_069', 'NUM', 'Comment le serpent d''airain préfigure-t-il le Nouveau Testament ?', '["Il ne le fait pas","Jésus a comparé son élévation sur la croix au serpent élevé","Par sa couleur","Par sa forme"]', 1, 'Jésus dit: comme Moïse éleva le serpent, ainsi le Fils de l''homme doit être élevé.', 'Jean 3:14-15'),

-- Balaam (Chapitres 22-24)
('num_070', 'NUM', 'Qui était Balaam ?', '["Un sacrificateur","Un prophète païen de Pethor","Un roi","Un guerrier"]', 1, 'Balaam, fils de Béor, était un devin de Pethor près de l''Euphrate.', 'Nombres 22:5'),
('num_071', 'NUM', 'Pourquoi Balak appela-t-il Balaam ?', '["Pour bénir Israël","Pour maudire Israël car il avait peur d''eux","Pour négocier la paix","Pour faire alliance"]', 1, 'Balak, roi de Moab, voulait que Balaam maudisse Israël.', 'Nombres 22:6'),
('num_072', 'NUM', 'Quelle fut la première réponse de Dieu à Balaam ?', '["Va et maudis","Tu n''iras pas et tu ne maudiras pas ce peuple, car il est béni","Attends","Fais ce que tu veux"]', 1, 'Dieu dit de ne pas y aller car le peuple est béni.', 'Nombres 22:12'),
('num_073', 'NUM', 'Qu''arriva-t-il à l''ânesse de Balaam sur le chemin ?', '["Elle mourut","Elle vit l''ange de l''Éternel et parla","Elle s''enfuit","Rien de spécial"]', 1, 'L''ânesse vit l''ange avec une épée, s''écarta trois fois et finalement parla à Balaam.', 'Nombres 22:23-28'),
('num_074', 'NUM', 'Combien de fois Balak fit-il offrir des sacrifices pour que Balaam maudisse Israël ?', '["Une fois","Deux fois","Trois fois","Quatre fois"]', 2, 'Trois fois Balak prépara des autels et des sacrifices.', 'Nombres 23:1,14,29'),
('num_075', 'NUM', 'Que fit Balaam au lieu de maudire Israël ?', '["Il le maudit comme demandé","Il bénit Israël chaque fois","Il garda le silence","Il s''enfuit"]', 1, 'Chaque fois, Balaam prononça une bénédiction sur Israël au lieu d''une malédiction.', 'Nombres 23:11,20; 24:10'),
('num_076', 'NUM', 'Quelle prophétie messianique Balaam prononça-t-il ?', '["Aucune","Un astre sort de Jacob, un sceptre s''élève d''Israël","Un temple sera construit","La mer s''ouvrira"]', 1, 'Il prophétisa: Un astre sort de Jacob, un sceptre s''élève d''Israël.', 'Nombres 24:17'),

-- Le péché à Baal-Péor (Chapitre 25)
('num_077', 'NUM', 'Quel péché Israël commit-il à Shittim ?', '["Idolâtrie et immoralité avec les femmes moabites","Vol","Meurtre","Rébellion contre Moïse"]', 0, 'Israël se livra à l''idolâtrie de Baal-Péor et à l''immoralité avec les femmes moabites.', 'Nombres 25:1-3'),
('num_078', 'NUM', 'Combien moururent dans la plaie à cause de ce péché ?', '["1 000","10 000","24 000","100 000"]', 2, 'Vingt-quatre mille personnes moururent de cette plaie.', 'Nombres 25:9'),
('num_079', 'NUM', 'Qui arrêta la plaie par son action zélée ?', '["Moïse","Aaron","Phinées, fils d''Éléazar","Josué"]', 2, 'Phinées transperça un Israélite et une Madianite et la plaie s''arrêta.', 'Nombres 25:7-8'),
('num_080', 'NUM', 'Quelle récompense Phinées reçut-il ?', '["De l''or","L''alliance perpétuelle du sacerdoce","Le leadership","Une terre"]', 1, 'Dieu lui donna l''alliance d''un sacerdoce perpétuel pour lui et ses descendants.', 'Nombres 25:12-13'),

-- Le deuxième recensement (Chapitre 26)
('num_081', 'NUM', 'Pourquoi un deuxième recensement fut-il effectué ?', '["Pour les impôts","Pour distribuer la terre de Canaan selon les familles","Pour une guerre","Par curiosité"]', 1, 'Le recensement servait à répartir la terre en héritage selon le nombre.', 'Nombres 26:53-54'),
('num_082', 'NUM', 'Combien d''hommes propres au combat y avait-il dans ce second recensement ?', '["650 000","601 730","603 550","550 000"]', 1, 'Le total était de 601 730 hommes.', 'Nombres 26:51'),
('num_083', 'NUM', 'Qui étaient les seuls survivants de la première génération, avec Moïse ?', '["Aaron et Miriam","Josué et Caleb","Éléazar et Ithamar","Hur et Aaron"]', 1, 'Josué et Caleb étaient les seuls survivants de ceux recensés au Sinaï.', 'Nombres 26:65'),

-- Les filles de Tselophchad (Chapitre 27)
('num_084', 'NUM', 'Pourquoi les filles de Tselophchad vinrent-elles voir Moïse ?', '["Pour se plaindre","Pour réclamer l''héritage de leur père mort sans fils","Pour un mariage","Pour un conflit"]', 1, 'Leur père était mort sans fils et elles demandaient sa part d''héritage.', 'Nombres 27:3-4'),
('num_085', 'NUM', 'Quelle fut la décision concernant leur demande ?', '["Refusée","Dieu approuva et établit une nouvelle loi d''héritage","Reportée","Ignorée"]', 1, 'Dieu dit que leur demande était juste et établit une loi pour les cas similaires.', 'Nombres 27:7'),
('num_086', 'NUM', 'Qui fut désigné pour succéder à Moïse ?', '["Aaron","Caleb","Josué fils de Nun","Éléazar"]', 2, 'Josué, fils de Nun, homme en qui réside l''Esprit, fut désigné comme successeur.', 'Nombres 27:18'),
('num_087', 'NUM', 'Comment Josué fut-il établi comme successeur ?', '["Par vote","Moïse lui imposa les mains devant le sacrificateur et l''assemblée","Par proclamation","Par tirage au sort"]', 1, 'Moïse lui imposa les mains devant Éléazar et toute l''assemblée.', 'Nombres 27:22-23'),

-- Vœux (Chapitre 30)
('num_088', 'NUM', 'Qui pouvait annuler le vœu d''une jeune femme vivant chez son père ?', '["Personne","Son père, s''il s''opposait le jour où il l''apprenait","Ses frères","Les anciens"]', 1, 'Le père pouvait annuler le vœu s''il s''y opposait le jour où il l''apprenait.', 'Nombres 30:5'),
('num_089', 'NUM', 'Qui pouvait annuler le vœu d''une femme mariée ?', '["Personne","Son mari, s''il s''opposait le jour où il l''apprenait","Son père","Les sacrificateurs"]', 1, 'Le mari pouvait annuler le vœu s''il s''y opposait le jour où il l''apprenait.', 'Nombres 30:8'),

-- Vengeance contre Madian (Chapitre 31)
('num_090', 'NUM', 'Pourquoi Israël attaqua-t-il Madian ?', '["Pour conquérir leur terre","Pour venger la séduction qui avait causé le péché de Baal-Péor","Pour leur richesse","Par ordre de Balak"]', 1, 'L''attaque était une vengeance pour l''incident de Baal-Péor causé par les Madianites.', 'Nombres 31:1-3'),
('num_091', 'NUM', 'Combien de soldats furent envoyés contre Madian ?', '["1 000","12 000 (mille par tribu)","24 000","100 000"]', 1, 'Douze mille hommes armés, mille par tribu, furent envoyés.', 'Nombres 31:4-5'),
('num_092', 'NUM', 'Qui mourut parmi les rois Madianites ?', '["Un seul roi","Cinq rois et le prophète Balaam","Trois rois","Aucun roi"]', 1, 'Cinq rois de Madian et Balaam, fils de Béor, furent tués.', 'Nombres 31:8'),
('num_093', 'NUM', 'Combien de soldats israélites moururent dans cette bataille ?', '["Beaucoup","Aucun - pas un seul homme ne manquait","Mille","Cent"]', 1, 'Pas un seul homme ne manquait au dénombrement après la bataille.', 'Nombres 31:49'),

-- Les tribus transjordaniennes (Chapitre 32)
('num_094', 'NUM', 'Quelles tribus demandèrent à s''établir à l''est du Jourdain ?', '["Juda et Benjamin","Ruben, Gad et demi-Manassé","Lévi et Siméon","Dan et Nephtali"]', 1, 'Ruben, Gad et la demi-tribu de Manassé demandèrent le territoire transjordanien.', 'Nombres 32:1-5'),
('num_095', 'NUM', 'Pourquoi ces tribus voulaient-elles cette terre ?', '["Elle était plus belle","C''était bon pour leurs nombreux troupeaux","Pour éviter la guerre","Par paresse"]', 1, 'Le pays était excellent pour les troupeaux, et ils avaient beaucoup de bétail.', 'Nombres 32:1-4'),
('num_096', 'NUM', 'Quelle condition Moïse posa-t-il pour leur demande ?', '["Payer un tribut","Leurs hommes devaient traverser en armes pour combattre avec les autres","Donner la moitié de leurs troupeaux","Renoncer à l''héritage"]', 1, 'Leurs hommes devaient traverser le Jourdain et combattre jusqu''à la conquête complète.', 'Nombres 32:20-22'),

-- Étapes du voyage (Chapitre 33)
('num_097', 'NUM', 'Qui nota les étapes du voyage d''Israël ?', '["Aaron","Moïse, sur l''ordre de l''Éternel","Josué","Les anciens"]', 1, 'Moïse nota les stations du voyage selon l''ordre de l''Éternel.', 'Nombres 33:2'),
('num_098', 'NUM', 'Combien d''étapes ou stations sont mentionnées dans ce chapitre ?', '["20","42","50","100"]', 1, 'Quarante-deux stations sont énumérées depuis l''Égypte jusqu''aux plaines de Moab.', 'Nombres 33:1-49'),

-- Limites du pays et villes de refuge (Chapitres 34-35)
('num_099', 'NUM', 'Combien de villes de refuge devait-il y avoir ?', '["Trois","Six (trois de chaque côté du Jourdain)","Douze","Une par tribu"]', 1, 'Il y avait six villes de refuge: trois à l''est et trois à l''ouest du Jourdain.', 'Nombres 35:13-14'),
('num_100', 'NUM', 'Qui pouvait se réfugier dans les villes de refuge ?', '["Tout criminel","Celui qui avait tué quelqu''un involontairement","Les voleurs","Les rebelles"]', 1, 'Ces villes protégeaient ceux qui avaient tué quelqu''un involontairement.', 'Nombres 35:11'),
('num_101', 'NUM', 'Jusqu''à quand le meurtrier involontaire devait-il rester dans la ville de refuge ?', '["Sept ans","Jusqu''à la mort du grand sacrificateur","Quarante ans","Toute sa vie"]', 1, 'Il devait y rester jusqu''à la mort du grand sacrificateur en fonction.', 'Nombres 35:25'),
('num_102', 'NUM', 'Combien de témoins fallait-il pour condamner un meurtrier ?', '["Un seul suffit","Au moins deux témoins","Trois témoins","Quatre témoins"]', 1, 'Il fallait au moins deux témoins pour condamner quelqu''un à mort.', 'Nombres 35:30'),

-- Mariage des héritières (Chapitre 36)
('num_103', 'NUM', 'Quelle restriction fut ajoutée pour les filles de Tselophchad ?', '["Ne pas se marier","Elles devaient épouser quelqu''un de leur tribu","Donner leur héritage","Quitter le pays"]', 1, 'Elles devaient épouser quelqu''un de leur propre tribu pour que l''héritage reste dans la tribu.', 'Nombres 36:6'),
('num_104', 'NUM', 'Quel était le but de cette loi ?', '["Contrôler les mariages","Empêcher le transfert d''héritage d''une tribu à l''autre","Limiter la richesse","Créer des alliances"]', 1, 'La loi visait à ce que l''héritage ne passe pas d''une tribu à une autre.', 'Nombres 36:7'),
('num_105', 'NUM', 'Les filles de Tselophchad obéirent-elles ?', '["Non","Oui, elles épousèrent des hommes de la tribu de Manassé","Partiellement","On ne sait pas"]', 1, 'Elles épousèrent les fils de leurs oncles dans la tribu de Manassé.', 'Nombres 36:11-12');

-- Mise à jour du nombre de questions pour Nombres
UPDATE book_quizzes SET question_count = (SELECT COUNT(*) FROM book_quiz_questions WHERE book_id = 'NUM') WHERE book_id = 'NUM';
