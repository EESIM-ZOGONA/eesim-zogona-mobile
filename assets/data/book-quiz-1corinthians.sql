-- Questions pour 1 Corinthiens (1CO)
-- 90+ questions couvrant les 16 chapitres

-- Chapitre 1: Salutations et divisions dans l'église
INSERT OR IGNORE INTO book_quiz_questions (id, book_id, question, options, correct_answer, explanation) VALUES
('1co_001', '1CO', 'À quelle église Paul adresse-t-il cette lettre?', '["L''église de Rome","L''église de Corinthe","L''église d''Éphèse","L''église de Philippes"]', 0, '1 Corinthiens 1:2 - Paul écrit à l''église de Dieu qui est à Corinthe.'),
('1co_002', '1CO', 'Qui est mentionné comme co-auteur de cette lettre avec Paul?', '["Sosthène","Timothée","Silas","Barnabas"]', 0, '1 Corinthiens 1:1 - Sosthène, le frère, est mentionné avec Paul.'),
('1co_003', '1CO', 'Quel problème majeur Paul aborde-t-il au début de la lettre?', '["L''idolâtrie","Les divisions","L''immoralité","La pauvreté"]', 1, '1 Corinthiens 1:10-12 - Paul parle des divisions parmi les Corinthiens.'),
('1co_004', '1CO', 'Les Corinthiens disaient appartenir à qui selon Paul?', '["Paul, Apollos, Céphas ou Christ","Pierre, Jacques et Jean","Moïse et Élie","Les douze apôtres"]', 0, '1 Corinthiens 1:12 - Certains disaient: Je suis de Paul, d''Apollos, de Céphas, de Christ.'),
('1co_005', '1CO', 'Paul dit que Christ ne l''a pas envoyé pour baptiser mais pour quoi?', '["Guérir les malades","Annoncer l''Évangile","Faire des miracles","Établir des églises"]', 1, '1 Corinthiens 1:17 - Christ m''a envoyé pour annoncer l''Évangile.'),
('1co_006', '1CO', 'La prédication de la croix est une folie pour qui selon Paul?', '["Les Juifs","Les Grecs","Ceux qui périssent","Les disciples"]', 2, '1 Corinthiens 1:18 - La parole de la croix est une folie pour ceux qui périssent.'),

-- Chapitre 2: La sagesse de Dieu
('1co_007', '1CO', 'Comment Paul dit-il être venu à Corinthe?', '["Avec éloquence et sagesse","Dans la faiblesse et la crainte","Avec puissance et autorité","En grand nombre"]', 1, '1 Corinthiens 2:3 - J''ai été auprès de vous dans un état de faiblesse, de crainte et de grand tremblement.'),
('1co_008', '1CO', 'Qu''est-ce que l''œil n''a pas vu et l''oreille n''a pas entendu selon Paul?', '["Les souffrances de Christ","Ce que Dieu a préparé pour ceux qui l''aiment","La gloire du temple","Les mystères de la loi"]', 1, '1 Corinthiens 2:9 - Ce que Dieu a préparé pour ceux qui l''aiment.'),
('1co_009', '1CO', 'Qui sonde les profondeurs de Dieu?', '["Les anges","Les prophètes","L''Esprit de Dieu","Les apôtres"]', 2, '1 Corinthiens 2:10 - L''Esprit sonde tout, même les profondeurs de Dieu.'),
('1co_010', '1CO', 'L''homme naturel ne reçoit pas les choses de l''Esprit de Dieu car elles lui paraissent:', '["Difficiles","Une folie","Inutiles","Étrangères"]', 1, '1 Corinthiens 2:14 - Elles sont une folie pour lui.'),

-- Chapitre 3: Collaborateurs de Dieu
('1co_011', '1CO', 'Paul dit avoir nourri les Corinthiens avec du lait et non de la nourriture solide. Pourquoi?', '["Ils étaient malades","Ils étaient encore charnels","Ils étaient trop nombreux","C''était la coutume"]', 1, '1 Corinthiens 3:2-3 - Vous étiez encore charnels.'),
('1co_012', '1CO', 'Quel rôle Paul s''attribue-t-il par rapport à Apollos dans l''œuvre de Dieu?', '["J''ai planté, Apollos a arrosé","J''ai construit, Apollos a décoré","J''ai enseigné, Apollos a baptisé","J''ai fondé, Apollos a dirigé"]', 0, '1 Corinthiens 3:6 - J''ai planté, Apollos a arrosé, mais Dieu a fait croître.'),
('1co_013', '1CO', 'Qui fait croître selon Paul?', '["Le planteur","Celui qui arrose","Dieu","L''église"]', 2, '1 Corinthiens 3:7 - C''est Dieu qui fait croître.'),
('1co_014', '1CO', 'Paul dit que les croyants sont le temple de qui?', '["Christ","Dieu","L''Esprit","Les apôtres"]', 1, '1 Corinthiens 3:16 - Vous êtes le temple de Dieu.'),
('1co_015', '1CO', 'Quel fondement a été posé selon Paul?', '["Les prophètes","Les apôtres","Jésus-Christ","La loi de Moïse"]', 2, '1 Corinthiens 3:11 - Ce fondement, c''est Jésus-Christ.'),
('1co_016', '1CO', 'Par quoi l''œuvre de chacun sera-t-elle révélée?', '["Par le jugement","Par le feu","Par les anges","Par les hommes"]', 1, '1 Corinthiens 3:13 - Le feu éprouvera l''œuvre de chacun.'),

-- Chapitre 4: Les apôtres serviteurs de Christ
('1co_017', '1CO', 'Comment Paul veut-il qu''on le considère?', '["Comme un chef","Comme serviteur de Christ et administrateur des mystères de Dieu","Comme un prophète","Comme un roi"]', 1, '1 Corinthiens 4:1 - Qu''on nous considère comme des serviteurs de Christ.'),
('1co_018', '1CO', 'Qu''est-ce qui est requis des administrateurs selon Paul?', '["La richesse","La fidélité","L''éloquence","La force"]', 1, '1 Corinthiens 4:2 - Ce qu''on demande des administrateurs, c''est que chacun soit trouvé fidèle.'),
('1co_019', '1CO', 'Paul dit que les apôtres sont devenus un spectacle pour qui?', '["Le monde, les anges et les hommes","Les Juifs seulement","Les païens","Les dirigeants"]', 0, '1 Corinthiens 4:9 - Nous sommes devenus un spectacle au monde, aux anges et aux hommes.'),
('1co_020', '1CO', 'Combien de pères les Corinthiens ont-ils en Christ selon Paul?', '["Plusieurs","Douze","Un seul","Aucun"]', 2, '1 Corinthiens 4:15 - Vous n''avez pas plusieurs pères, car c''est moi qui vous ai engendrés en Jésus-Christ.'),

-- Chapitre 5: L'immoralité dans l'église
('1co_021', '1CO', 'Quel péché grave était présent dans l''église de Corinthe?', '["Le vol","Un homme vivait avec la femme de son père","Le meurtre","L''idolâtrie"]', 1, '1 Corinthiens 5:1 - Quelqu''un a la femme de son père.'),
('1co_022', '1CO', 'Que devaient faire les Corinthiens avec le pécheur impénitent?', '["Le pardonner immédiatement","L''exclure de leur milieu","Le nommer ancien","L''ignorer"]', 1, '1 Corinthiens 5:13 - Ôtez le méchant du milieu de vous.'),
('1co_023', '1CO', 'Paul compare le péché à quoi qui fait lever toute la pâte?', '["L''eau","Le sel","Le levain","L''huile"]', 2, '1 Corinthiens 5:6-7 - Un peu de levain fait lever toute la pâte.'),
('1co_024', '1CO', 'Christ notre Pâque a été quoi selon Paul?', '["Glorifié","Sacrifié","Exalté","Couronné"]', 1, '1 Corinthiens 5:7 - Christ, notre Pâque, a été immolé.'),

-- Chapitre 6: Procès entre croyants et immoralité sexuelle
('1co_025', '1CO', 'Devant qui les Corinthiens portaient-ils leurs différends?', '["Les anciens de l''église","Les infidèles (tribunaux païens)","Les apôtres","Les prophètes"]', 1, '1 Corinthiens 6:1 - Quelqu''un de vous ose porter sa cause devant les infidèles.'),
('1co_026', '1CO', 'Les saints jugeront quoi selon Paul?', '["Les nations","Le monde","Les anges","Toutes ces réponses"]', 3, '1 Corinthiens 6:2-3 - Les saints jugeront le monde et les anges.'),
('1co_027', '1CO', 'Le corps n''est pas pour l''impudicité mais pour qui?', '["L''église","Le Seigneur","Le mariage","La société"]', 1, '1 Corinthiens 6:13 - Le corps est pour le Seigneur.'),
('1co_028', '1CO', 'Vos corps sont les membres de qui?', '["L''église","Christ","La société","Les apôtres"]', 1, '1 Corinthiens 6:15 - Vos corps sont des membres de Christ.'),
('1co_029', '1CO', 'Votre corps est le temple de qui?', '["Dieu","Christ","Le Saint-Esprit","Les anges"]', 2, '1 Corinthiens 6:19 - Votre corps est le temple du Saint-Esprit.'),
('1co_030', '1CO', 'À quel prix avez-vous été rachetés?', '["L''or et l''argent","Le sang de Christ (un grand prix)","Les sacrifices","Les œuvres"]', 1, '1 Corinthiens 6:20 - Vous avez été rachetés à un grand prix.'),

-- Chapitre 7: Le mariage
('1co_031', '1CO', 'Que dit Paul concernant le mariage pour éviter l''impudicité?', '["Chaque homme devrait avoir sa femme","Le célibat est obligatoire","Le mariage est interdit","Il faut attendre la vieillesse"]', 0, '1 Corinthiens 7:2 - Que chacun ait sa femme, et chaque femme son mari.'),
('1co_032', '1CO', 'Paul souhaiterait que tous soient comme lui. Comment était-il?', '["Marié","Célibataire","Veuf","Divorcé"]', 1, '1 Corinthiens 7:7-8 - Paul était célibataire et souhaitait que tous soient comme lui.'),
('1co_033', '1CO', 'Que dit Paul aux célibataires et aux veuves?', '["Ils doivent se marier","Il leur est bon de rester comme lui","Ils doivent servir au temple","Ils sont maudits"]', 1, '1 Corinthiens 7:8 - Il leur est bon de rester comme moi.'),
('1co_034', '1CO', 'Une femme mariée à un non-croyant doit-elle le quitter?', '["Oui, immédiatement","Non, si le mari consent à rester","Oui, après un an","Cela dépend des circonstances"]', 1, '1 Corinthiens 7:13 - Si elle a un mari non-croyant qui consent à habiter avec elle, qu''elle ne le répudie pas.'),
('1co_035', '1CO', 'Que chacun marche selon la condition dans laquelle il a été:', '["Né","Baptisé","Appelé","Élevé"]', 2, '1 Corinthiens 7:17 - Que chacun marche selon la part que le Seigneur lui a faite.'),

-- Chapitre 8: Les viandes sacrifiées aux idoles
('1co_036', '1CO', 'La connaissance enfle, mais qu''est-ce qui édifie?', '["La sagesse","L''amour","La foi","L''espérance"]', 1, '1 Corinthiens 8:1 - La connaissance enfle, mais l''amour édifie.'),
('1co_037', '1CO', 'Quel danger Paul mentionne-t-il concernant la liberté de manger des viandes sacrifiées?', '["Devenir impur","Faire tomber les faibles","Perdre le salut","Offenser les païens"]', 1, '1 Corinthiens 8:9 - Prenez garde que votre liberté ne devienne une pierre d''achoppement pour les faibles.'),
('1co_038', '1CO', 'Si manger de la viande scandalise mon frère, que fera Paul?', '["Il mangera quand même","Il ne mangera jamais de viande","Il mangera en secret","Il fera ce qu''il veut"]', 1, '1 Corinthiens 8:13 - Je ne mangerai jamais de viande, afin de ne pas scandaliser mon frère.'),

-- Chapitre 9: Les droits de l'apôtre
('1co_039', '1CO', 'Paul affirme-t-il avoir vu le Seigneur Jésus?', '["Oui","Non","Il ne le mentionne pas","Seulement en vision"]', 0, '1 Corinthiens 9:1 - N''ai-je pas vu Jésus notre Seigneur?'),
('1co_040', '1CO', 'Paul avait-il le droit de vivre de l''Évangile?', '["Non","Oui, mais il n''en a pas usé","Oui, et il l''a fait","Seulement à Corinthe"]', 1, '1 Corinthiens 9:14-15 - Le Seigneur a ordonné que ceux qui annoncent l''Évangile vivent de l''Évangile, mais je n''ai usé d''aucun de ces droits.'),
('1co_041', '1CO', 'Pourquoi Paul s''est-il fait tout à tous?', '["Pour être populaire","Pour en sauver quelques-uns","Pour voyager","Pour sa gloire"]', 1, '1 Corinthiens 9:22 - Je me suis fait tout à tous, afin d''en sauver de toute manière quelques-uns.'),
('1co_042', '1CO', 'À quoi Paul compare-t-il la vie chrétienne dans une course?', '["Un marathon","Une course où tous courent mais un seul obtient le prix","Un relais","Une promenade"]', 1, '1 Corinthiens 9:24 - Tous courent, mais un seul remporte le prix. Courez de manière à le remporter.'),
('1co_043', '1CO', 'Quelle couronne recevrons-nous contrairement aux athlètes?', '["Une couronne d''or","Une couronne incorruptible","Une couronne de laurier","Une couronne d''argent"]', 1, '1 Corinthiens 9:25 - Eux, pour une couronne corruptible; nous, pour une incorruptible.'),
('1co_044', '1CO', 'Paul dit traiter durement son corps. Pourquoi?', '["Pour la santé","De peur d''être disqualifié après avoir prêché","Pour impressionner","Par tradition"]', 1, '1 Corinthiens 9:27 - Je traite durement mon corps, de peur d''être moi-même disqualifié.'),

-- Chapitre 10: Exemples d'Israël et la Cène du Seigneur
('1co_045', '1CO', 'Nos pères ont tous été sous la nuée et ont tous passé à travers quoi?', '["Le désert","La mer","Le Jourdain","Les montagnes"]', 1, '1 Corinthiens 10:1 - Ils ont tous passé au travers de la mer.'),
('1co_046', '1CO', 'Le rocher qui suivait les Israélites était qui selon Paul?', '["Moïse","Un ange","Christ","Élie"]', 2, '1 Corinthiens 10:4 - Ce rocher était Christ.'),
('1co_047', '1CO', 'Ces événements sont arrivés pour servir de quoi pour nous?', '["Divertissement","Exemples (avertissements)","Histoires","Légendes"]', 1, '1 Corinthiens 10:11 - Ces choses sont arrivées pour nous servir d''exemples.'),
('1co_048', '1CO', 'Dieu est fidèle et ne permettra pas que vous soyez tentés au-delà de:', '["Vos forces","Votre foi","Ce que vous pouvez supporter","Votre intelligence"]', 2, '1 Corinthiens 10:13 - Il ne permettra pas que vous soyez tentés au-delà de vos forces.'),
('1co_049', '1CO', 'La coupe de bénédiction est la communion au quoi de Christ?', '["Corps","Sang","Esprit","Nom"]', 1, '1 Corinthiens 10:16 - La coupe de bénédiction est la communion au sang de Christ.'),
('1co_050', '1CO', 'Que nous soyons plusieurs, nous formons un seul quoi?', '["Temple","Corps","Peuple","Royaume"]', 1, '1 Corinthiens 10:17 - Nous qui sommes plusieurs, sommes un seul corps.'),
('1co_051', '1CO', 'Faites tout pour la gloire de qui?', '["L''église","Les apôtres","Dieu","Nous-mêmes"]', 2, '1 Corinthiens 10:31 - Faites tout pour la gloire de Dieu.'),

-- Chapitre 11: Le voile et la Cène
('1co_052', '1CO', 'Le chef de tout homme est Christ, le chef de la femme est l''homme, et le chef de Christ est:', '["L''Esprit","Dieu","Le Père","Personne"]', 1, '1 Corinthiens 11:3 - Le chef de Christ, c''est Dieu.'),
('1co_053', '1CO', 'La femme est la gloire de qui selon Paul?', '["Dieu","Elle-même","L''homme","Christ"]', 2, '1 Corinthiens 11:7 - La femme est la gloire de l''homme.'),
('1co_054', '1CO', 'Que commémore la Cène du Seigneur?', '["La création","L''exode","La mort du Seigneur","La résurrection"]', 2, '1 Corinthiens 11:26 - Vous annoncez la mort du Seigneur jusqu''à ce qu''il vienne.'),
('1co_055', '1CO', 'Que doit faire l''homme avant de manger le pain et boire la coupe?', '["Jeûner","S''examiner lui-même","Se laver les mains","Prier à haute voix"]', 1, '1 Corinthiens 11:28 - Que chacun s''examine soi-même.'),
('1co_056', '1CO', 'Que risque celui qui mange et boit indignement?', '["La pauvreté","Le jugement sur lui-même","L''exil","Rien"]', 1, '1 Corinthiens 11:29 - Il mange et boit un jugement contre lui-même.'),
('1co_057', '1CO', 'Pourquoi beaucoup parmi vous sont-ils malades selon Paul?', '["Le climat","Ils ne discernent pas le corps du Seigneur","La nourriture","Les démons"]', 1, '1 Corinthiens 11:30 - C''est pour cela qu''il y a parmi vous beaucoup d''infirmes et de malades.'),

-- Chapitre 12: Les dons spirituels
('1co_058', '1CO', 'Nul ne peut dire "Jésus est Seigneur" si ce n''est par:', '["La volonté","L''intelligence","Le Saint-Esprit","L''éducation"]', 2, '1 Corinthiens 12:3 - Nul ne peut dire: Jésus est le Seigneur! si ce n''est par le Saint-Esprit.'),
('1co_059', '1CO', 'Il y a diversité de dons mais le même:', '["Apôtre","Esprit","Évangile","Temple"]', 1, '1 Corinthiens 12:4 - Il y a diversité de dons, mais le même Esprit.'),
('1co_060', '1CO', 'À chacun la manifestation de l''Esprit est donnée pour:', '["L''orgueil","L''utilité commune","La division","La compétition"]', 1, '1 Corinthiens 12:7 - À chacun la manifestation de l''Esprit est donnée pour l''utilité commune.'),
('1co_061', '1CO', 'Combien de corps avons-nous en tant qu''église selon Paul?', '["Plusieurs","Un seul","Douze","Autant que de membres"]', 1, '1 Corinthiens 12:12 - Comme le corps est un, ainsi en est-il de Christ.'),
('1co_062', '1CO', 'Par un seul Esprit, nous avons tous été baptisés en un seul:', '["Temple","Corps","Lieu","Groupe"]', 1, '1 Corinthiens 12:13 - Nous avons tous été baptisés dans un seul Esprit, pour former un seul corps.'),
('1co_063', '1CO', 'L''œil peut-il dire à la main "Je n''ai pas besoin de toi"?', '["Oui","Non","Parfois","Cela dépend"]', 1, '1 Corinthiens 12:21 - L''œil ne peut pas dire à la main: Je n''ai pas besoin de toi.'),
('1co_064', '1CO', 'Dieu a placé quels ministères en premier dans l''église?', '["Les prophètes","Les apôtres","Les docteurs","Les évangélistes"]', 1, '1 Corinthiens 12:28 - Dieu a établi dans l''Église premièrement des apôtres.'),
('1co_065', '1CO', 'Tous sont-ils apôtres? Tous sont-ils prophètes?', '["Oui","Non","Seulement les hommes","Seulement les anciens"]', 1, '1 Corinthiens 12:29 - Tous sont-ils apôtres? Tous sont-ils prophètes? Non.'),

-- Chapitre 13: L'amour
('1co_066', '1CO', 'Sans l''amour, si je parle les langues des hommes et des anges, je suis comme:', '["Un sage","Un airain qui résonne","Un prophète","Un roi"]', 1, '1 Corinthiens 13:1 - Je suis un airain qui résonne, ou une cymbale qui retentit.'),
('1co_067', '1CO', 'Sans l''amour, même si j''ai toute la foi pour déplacer des montagnes, je suis:', '["Béni","Rien","Puissant","Sage"]', 1, '1 Corinthiens 13:2 - Si je n''ai pas l''amour, je ne suis rien.'),
('1co_068', '1CO', 'L''amour est patient, l''amour est:', '["Exigeant","Bon","Sévère","Distant"]', 1, '1 Corinthiens 13:4 - L''amour est patient, il est plein de bonté.'),
('1co_069', '1CO', 'L''amour ne fait pas quoi?', '["Le bien","Ce qui est mal (il ne s''irrite pas, ne soupçonne pas le mal)","Des miracles","Des promesses"]', 1, '1 Corinthiens 13:5 - Il ne s''irrite point, il ne soupçonne point le mal.'),
('1co_070', '1CO', 'Quand viendra ce qui est parfait, ce qui est partiel sera:', '["Amélioré","Aboli","Gardé","Multiplié"]', 1, '1 Corinthiens 13:10 - Quand ce qui est parfait sera venu, ce qui est partiel disparaîtra.'),
('1co_071', '1CO', 'Maintenant nous voyons au moyen d''un miroir, de manière obscure, mais alors nous verrons:', '["Partiellement","Face à face","De loin","Dans un rêve"]', 1, '1 Corinthiens 13:12 - Maintenant nous voyons au moyen d''un miroir, d''une manière obscure, mais alors ce sera face à face.'),
('1co_072', '1CO', 'Maintenant ces trois choses demeurent: la foi, l''espérance, l''amour. Laquelle est la plus grande?', '["La foi","L''espérance","L''amour","Elles sont égales"]', 2, '1 Corinthiens 13:13 - La plus grande de ces choses, c''est l''amour.'),

-- Chapitre 14: Prophétie et langues
('1co_073', '1CO', 'Quel don Paul préfère-t-il à celui des langues?', '["Les miracles","La prophétie","La guérison","La sagesse"]', 1, '1 Corinthiens 14:1-5 - Aspirez surtout à prophétiser.'),
('1co_074', '1CO', 'Celui qui parle en langue édifie qui?', '["L''église","Lui-même","Les non-croyants","Les anges"]', 1, '1 Corinthiens 14:4 - Celui qui parle en langue s''édifie lui-même.'),
('1co_075', '1CO', 'Celui qui prophétise édifie qui?', '["Lui-même","L''église","Seulement les anciens","Les anges"]', 1, '1 Corinthiens 14:4 - Celui qui prophétise édifie l''Église.'),
('1co_076', '1CO', 'Paul préférerait dire combien de paroles intelligibles plutôt que dix mille en langue?', '["Cent","Mille","Cinq","Dix"]', 2, '1 Corinthiens 14:19 - J''aime mieux dire cinq paroles avec mon intelligence que dix mille paroles en langue.'),
('1co_077', '1CO', 'Que tout se fasse pour:', '["La gloire personnelle","L''édification","Le spectacle","La compétition"]', 1, '1 Corinthiens 14:26 - Que tout se fasse pour l''édification.'),
('1co_078', '1CO', 'Dieu n''est pas un Dieu de désordre mais de:', '["Puissance","Paix","Jugement","Colère"]', 1, '1 Corinthiens 14:33 - Dieu n''est pas un Dieu de désordre, mais de paix.'),
('1co_079', '1CO', 'Que tout se fasse avec:', '["Émotion","Bienséance et ordre","Hâte","Spontanéité"]', 1, '1 Corinthiens 14:40 - Que tout se fasse avec bienséance et avec ordre.'),

-- Chapitre 15: La résurrection
('1co_080', '1CO', 'Quel est l''Évangile que Paul a reçu et transmis en premier?', '["Christ est mort pour nos péchés, a été enseveli et est ressuscité","Aimez-vous les uns les autres","Repentez-vous","Soyez baptisés"]', 0, '1 Corinthiens 15:3-4 - Christ est mort pour nos péchés, selon les Écritures; il a été enseveli, et il est ressuscité le troisième jour.'),
('1co_081', '1CO', 'À combien de frères Christ est-il apparu en une seule fois après sa résurrection?', '["Douze","Cent","Plus de cinq cents","Quarante"]', 2, '1 Corinthiens 15:6 - Il est apparu à plus de cinq cents frères à la fois.'),
('1co_082', '1CO', 'Comment Paul se décrit-il parmi les apôtres?', '["Le plus grand","Le moindre, comme un avorton","Le premier","Égal aux autres"]', 1, '1 Corinthiens 15:8-9 - Je suis le moindre des apôtres, je ne suis pas digne d''être appelé apôtre.'),
('1co_083', '1CO', 'Si Christ n''est pas ressuscité, notre foi est:', '["Forte","Vaine","Suffisante","Complète"]', 1, '1 Corinthiens 15:14 - Si Christ n''est pas ressuscité, notre prédication est vaine, et votre foi aussi est vaine.'),
('1co_084', '1CO', 'En Adam tous meurent, de même en Christ tous seront:', '["Jugés","Vivifiés (rendus vivants)","Punis","Oubliés"]', 1, '1 Corinthiens 15:22 - Comme tous meurent en Adam, de même aussi tous revivront en Christ.'),
('1co_085', '1CO', 'Le dernier ennemi qui sera détruit est:', '["Satan","Le péché","La mort","La maladie"]', 2, '1 Corinthiens 15:26 - Le dernier ennemi qui sera détruit, c''est la mort.'),
('1co_086', '1CO', 'On sème un corps corruptible, il ressuscite:', '["Corruptible","Incorruptible","Spirituel","Identique"]', 1, '1 Corinthiens 15:42 - On est semé dans la corruption, on ressuscite dans l''incorruptibilité.'),
('1co_087', '1CO', 'Le premier homme Adam devint une âme vivante. Le dernier Adam est devenu un esprit:', '["Mort","Vivifiant","Humain","Terrestre"]', 1, '1 Corinthiens 15:45 - Le dernier Adam est devenu un esprit vivifiant.'),
('1co_088', '1CO', 'Nous ne mourrons pas tous, mais tous nous serons:', '["Jugés","Transformés","Punis","Oubliés"]', 1, '1 Corinthiens 15:51 - Nous ne mourrons pas tous, mais tous nous serons transformés.'),
('1co_089', '1CO', 'En un instant, en un clin d''œil, à la dernière:', '["Heure","Trompette","Minute","Parole"]', 1, '1 Corinthiens 15:52 - En un instant, en un clin d''œil, à la dernière trompette.'),
('1co_090', '1CO', 'Ô mort, où est ta victoire? Ô mort, où est ton:', '["Pouvoir","Aiguillon","Royaume","Armée"]', 1, '1 Corinthiens 15:55 - Ô mort, où est ta victoire? Ô mort, où est ton aiguillon?'),
('1co_091', '1CO', 'L''aiguillon de la mort c''est le péché, et la puissance du péché c''est:', '["Satan","La loi","La chair","Le monde"]', 1, '1 Corinthiens 15:56 - L''aiguillon de la mort, c''est le péché; et la puissance du péché, c''est la loi.'),
('1co_092', '1CO', 'Soyez fermes, inébranlables, travaillant toujours plus à l''œuvre du Seigneur, sachant que votre travail n''est pas:', '["Difficile","Vain","Facile","Terminé"]', 1, '1 Corinthiens 15:58 - Votre travail ne sera pas vain dans le Seigneur.'),

-- Chapitre 16: Instructions finales
('1co_093', '1CO', 'Quel jour Paul recommande-t-il de mettre de côté une offrande?', '["Le sabbat","Le premier jour de la semaine","Le dernier jour du mois","Chaque jour"]', 1, '1 Corinthiens 16:2 - Que chacun de vous, le premier jour de la semaine, mette à part ce qu''il pourra.'),
('1co_094', '1CO', 'Où Paul voulait-il passer l''hiver?', '["Rome","Éphèse","Corinthe","Jérusalem"]', 2, '1 Corinthiens 16:6 - C''est peut-être chez vous que je passerai l''hiver.'),
('1co_095', '1CO', 'Une porte grande et efficace s''est ouverte pour Paul, mais il y a beaucoup de:', '["Amis","Adversaires","Richesses","Disciples"]', 1, '1 Corinthiens 16:9 - Une porte grande et d''un accès efficace m''est ouverte, et les adversaires sont nombreux.'),
('1co_096', '1CO', 'Qui Paul recommande-t-il aux Corinthiens de bien recevoir?', '["Apollos","Timothée","Barnabas","Silas"]', 1, '1 Corinthiens 16:10 - Si Timothée arrive, veillez à ce qu''il soit sans crainte parmi vous.'),
('1co_097', '1CO', 'Quel mot araméen Paul utilise-t-il signifiant "Notre Seigneur, viens"?', '["Amen","Alléluia","Maranatha","Hosanna"]', 2, '1 Corinthiens 16:22 - Maranatha (Notre Seigneur, viens!).'),
('1co_098', '1CO', 'Veillez, demeurez fermes dans la foi, soyez des hommes, et:', '["Reposez-vous","Fortifiez-vous","Attendez","Fuyez"]', 1, '1 Corinthiens 16:13 - Veillez, demeurez fermes dans la foi, soyez des hommes, fortifiez-vous.'),
('1co_099', '1CO', 'Que tout ce que vous faites se fasse avec:', '["Rapidité","Amour","Force","Sagesse"]', 1, '1 Corinthiens 16:14 - Que tout ce que vous faites se fasse avec amour.');
