-- Questions pour le livre du Lévitique
-- Contient les lois et rituels donnés à Israël

-- L'holocauste (Chapitre 1)
INSERT OR IGNORE INTO book_quiz_questions (id, book_id, question, options, correct_answer, explanation, verse_ref) VALUES
('lev_001', 'LEV', 'Quel animal devait être offert en holocauste du gros bétail ?', '["Un bœuf femelle","Un mâle sans défaut","Un animal avec un défaut mineur","N''importe quel animal"]', 1, 'L''holocauste devait être un mâle sans défaut du gros bétail.', 'Lévitique 1:3'),
('lev_002', 'LEV', 'Où l''holocauste devait-il être offert ?', '["N''importe où","Devant l''entrée de la tente d''assignation","Sur une montagne","Près d''un fleuve"]', 1, 'L''animal devait être présenté à l''entrée de la tente d''assignation.', 'Lévitique 1:3'),
('lev_003', 'LEV', 'Que devait faire celui qui offrait l''holocauste avec sa main ?', '["Laver l''animal","Poser sa main sur la tête de l''animal","Lever la main vers le ciel","Frapper l''animal"]', 1, 'Il devait poser sa main sur la tête de l''holocauste pour que celui-ci soit agréé.', 'Lévitique 1:4'),
('lev_004', 'LEV', 'Qui devait répandre le sang autour de l''autel ?', '["Moïse","Aaron","Les sacrificateurs, fils d''Aaron","Le peuple"]', 2, 'Les sacrificateurs, fils d''Aaron, devaient répandre le sang autour de l''autel.', 'Lévitique 1:5'),
('lev_005', 'LEV', 'Comment l''holocauste est-il décrit ?', '["Un sacrifice ordinaire","Un sacrifice d''agréable odeur à l''Éternel","Un simple rituel","Une tradition humaine"]', 1, 'L''holocauste est décrit comme un sacrifice consumé, d''agréable odeur à l''Éternel.', 'Lévitique 1:9'),
('lev_006', 'LEV', 'Si quelqu''un offrait un holocauste du menu bétail, quel animal pouvait-il offrir ?', '["Un agneau ou un chevreau","Un veau","Un taureau","Un chameau"]', 0, 'On pouvait offrir un agneau ou un chevreau du menu bétail.', 'Lévitique 1:10'),
('lev_007', 'LEV', 'Où devait-on égorger l''holocauste du menu bétail ?', '["À l''est de l''autel","Au côté nord de l''autel","À l''ouest de l''autel","Au sud de l''autel"]', 1, 'L''animal devait être égorgé au côté septentrional (nord) de l''autel.', 'Lévitique 1:11'),
('lev_008', 'LEV', 'Quels oiseaux pouvaient être offerts en holocauste ?', '["Des aigles ou des corbeaux","Des tourterelles ou des jeunes pigeons","Des colombes ou des moineaux","N''importe quel oiseau"]', 1, 'On pouvait offrir des tourterelles ou des jeunes pigeons.', 'Lévitique 1:14'),

-- L'offrande de grain (Chapitre 2)
('lev_009', 'LEV', 'De quoi était composée l''offrande de grain ?', '["De viande","De fleur de farine avec huile et encens","De fruits","De vin"]', 1, 'L''offrande était de fleur de farine sur laquelle on versait de l''huile et de l''encens.', 'Lévitique 2:1'),
('lev_010', 'LEV', 'Quelle partie de l''offrande de grain devait être brûlée sur l''autel ?', '["La totalité","Le quart","Une poignée","La moitié"]', 2, 'Le sacrificateur devait prendre une poignée comme mémorial et la brûler sur l''autel.', 'Lévitique 2:2'),
('lev_011', 'LEV', 'À qui appartenait le reste de l''offrande de grain ?', '["Au peuple","À celui qui l''avait offerte","À Aaron et à ses fils","Aux Lévites"]', 2, 'Le reste appartenait à Aaron et à ses fils comme chose très sainte.', 'Lévitique 2:3'),
('lev_012', 'LEV', 'Quel ingrédient ne devait jamais être utilisé dans une offrande à l''Éternel ?', '["Le sel","L''huile","Le levain","La farine"]', 2, 'Aucune offrande ne devait être faite avec du levain.', 'Lévitique 2:11'),
('lev_013', 'LEV', 'Quel ingrédient devait toujours accompagner les offrandes ?', '["Le miel","Le levain","Le sel","Le vin"]', 2, 'Le sel de l''alliance devait accompagner toutes les offrandes.', 'Lévitique 2:13'),
('lev_014', 'LEV', 'Comment devait être préparée l''offrande des prémices ?', '["Crue","Des épis rôtis au feu, du grain nouveau broyé","Avec du levain","Sans huile"]', 1, 'L''offrande des prémices était des épis rôtis au feu et du grain nouveau broyé.', 'Lévitique 2:14'),

-- Le sacrifice de communion (Chapitre 3)
('lev_015', 'LEV', 'Quelle partie de l''animal était réservée à l''Éternel dans le sacrifice de communion ?', '["La chair","Toute la graisse","Les pattes","La peau"]', 1, 'Toute la graisse appartenait à l''Éternel comme nourriture consumée.', 'Lévitique 3:16'),
('lev_016', 'LEV', 'Quelles étaient les deux choses que les Israélites ne devaient jamais manger ?', '["Le pain et le vin","La graisse et le sang","La viande et le poisson","Les fruits et les légumes"]', 1, 'Ils ne devaient manger ni graisse ni sang - c''était une loi perpétuelle.', 'Lévitique 3:17'),
('lev_017', 'LEV', 'Pour le sacrifice de communion, quel type d''animal pouvait être offert ?', '["Seulement mâle","Seulement femelle","Mâle ou femelle","Seulement jeune"]', 2, 'Pour le sacrifice de communion, on pouvait offrir un animal mâle ou femelle.', 'Lévitique 3:1'),

-- Le sacrifice pour le péché (Chapitre 4)
('lev_018', 'LEV', 'Quel sacrifice devait offrir le sacrificateur s''il avait péché ?', '["Un agneau","Un jeune taureau sans défaut","Un bouc","Une colombe"]', 1, 'Le sacrificateur devait offrir un jeune taureau sans défaut pour son péché.', 'Lévitique 4:3'),
('lev_019', 'LEV', 'Combien de fois le sacrificateur devait-il asperger le sang devant le voile du sanctuaire ?', '["Trois fois","Cinq fois","Sept fois","Une fois"]', 2, 'Il devait asperger du sang sept fois devant l''Éternel.', 'Lévitique 4:6'),
('lev_020', 'LEV', 'Où devait être brûlé le taureau du sacrifice pour le péché du sacrificateur ?', '["Sur l''autel","Hors du camp, dans un lieu pur","Dans la tente","N''importe où"]', 1, 'Le taureau devait être brûlé hors du camp, dans un lieu pur.', 'Lévitique 4:12'),
('lev_021', 'LEV', 'Quel animal l''assemblée devait-elle offrir pour un péché collectif ?', '["Un agneau","Un bouc","Un jeune taureau","Une tourterelle"]', 2, 'L''assemblée devait offrir un jeune taureau pour le sacrifice d''expiation.', 'Lévitique 4:14'),
('lev_022', 'LEV', 'Quel animal un chef devait-il offrir pour son péché ?', '["Un taureau","Un bouc mâle sans défaut","Une chèvre","Un agneau femelle"]', 1, 'Un chef devait offrir un bouc mâle sans défaut.', 'Lévitique 4:23'),
('lev_023', 'LEV', 'Quel animal une personne du peuple devait-elle offrir pour un péché involontaire ?', '["Un taureau","Un bouc mâle","Une chèvre ou un agneau femelle sans défaut","Un pigeon"]', 2, 'Une personne du peuple devait offrir une chèvre ou une brebis femelle sans défaut.', 'Lévitique 4:28,32'),

-- Le sacrifice de culpabilité (Chapitre 5)
('lev_024', 'LEV', 'Si quelqu''un n''avait pas les moyens d''offrir un agneau, que pouvait-il offrir ?', '["Rien","Deux tourterelles ou deux pigeons","De l''argent","Des fruits"]', 1, 'Il pouvait offrir deux tourterelles ou deux jeunes pigeons.', 'Lévitique 5:7'),
('lev_025', 'LEV', 'Si quelqu''un était trop pauvre même pour des oiseaux, que pouvait-il offrir ?', '["Il était exempté","Un dixième d''épha de fleur de farine","De l''eau","Des herbes"]', 1, 'Il pouvait offrir un dixième d''épha de fleur de farine sans huile ni encens.', 'Lévitique 5:11'),
('lev_026', 'LEV', 'Quelle était la pénalité pour avoir commis une infidélité envers les choses saintes ?', '["La mort","Un cinquième en plus de la valeur estimée","Exclusion du camp","Jeûne"]', 1, 'Il devait restituer la valeur plus un cinquième et offrir un bélier.', 'Lévitique 5:16'),

-- Lois sur les sacrifices (Chapitres 6-7)
('lev_027', 'LEV', 'Combien de temps le feu devait-il brûler sur l''autel ?', '["Seulement le jour","Seulement la nuit","Il ne devait jamais s''éteindre","Pendant les sabbats"]', 2, 'Le feu devait brûler continuellement sur l''autel, il ne devait point s''éteindre.', 'Lévitique 6:13'),
('lev_028', 'LEV', 'Où les sacrificateurs devaient-ils manger les parties saintes des sacrifices ?', '["N''importe où","Dans un lieu saint, le parvis de la tente","Chez eux","Sur l''autel"]', 1, 'Les parties saintes devaient être mangées dans un lieu saint.', 'Lévitique 6:16'),
('lev_029', 'LEV', 'Que devait-il arriver à un ustensile de terre dans lequel le sacrifice avait été cuit ?', '["Être réutilisé","Être brisé","Être donné","Être vendu"]', 1, 'Le vase de terre devait être brisé.', 'Lévitique 6:28'),
('lev_030', 'LEV', 'Dans le sacrifice de communion, combien de temps avait-on pour manger la viande d''un sacrifice de louange ?', '["Trois jours","Le jour même","Sept jours","Une semaine"]', 1, 'La viande du sacrifice de louange devait être mangée le jour même.', 'Lévitique 7:15'),
('lev_031', 'LEV', 'Quelle était la punition pour quelqu''un qui mangeait la graisse d''un animal sacrifié ?', '["Une amende","Être retranché de son peuple","Travaux forcés","Un avertissement"]', 1, 'Quiconque mangeait de la graisse serait retranché de son peuple.', 'Lévitique 7:25'),
('lev_032', 'LEV', 'Quelle partie du sacrifice de communion appartenait au sacrificateur ?', '["La tête","La poitrine et la cuisse droite","Tout l''animal","La graisse"]', 1, 'La poitrine balancée et la cuisse élevée appartenaient au sacrificateur.', 'Lévitique 7:31-34'),

-- Consécration d'Aaron et ses fils (Chapitres 8-9)
('lev_033', 'LEV', 'Combien de jours dura la consécration d''Aaron et de ses fils ?', '["Trois jours","Sept jours","Un jour","Quarante jours"]', 1, 'La consécration dura sept jours, pendant lesquels ils devaient rester à l''entrée de la tente.', 'Lévitique 8:33'),
('lev_034', 'LEV', 'Avec quoi Moïse a-t-il oint le tabernacle et tout ce qu''il contenait ?', '["De l''eau","De l''huile d''onction","Du sang","Du parfum"]', 1, 'Moïse prit l''huile d''onction et oignit le tabernacle et tout ce qu''il contenait.', 'Lévitique 8:10'),
('lev_035', 'LEV', 'Que s''est-il passé quand Aaron a offert le premier sacrifice après sa consécration ?', '["Une tempête","La gloire de l''Éternel apparut et un feu consuma l''holocauste","Un tremblement de terre","Une pluie"]', 1, 'La gloire de l''Éternel apparut et le feu sortit de devant l''Éternel et consuma l''holocauste.', 'Lévitique 9:23-24'),
('lev_036', 'LEV', 'Comment le peuple a-t-il réagi en voyant le feu de l''Éternel ?', '["Ils ont fui","Ils ont poussé des cris de joie et se sont prosternés","Ils ont murmuré","Ils sont restés silencieux"]', 1, 'Tout le peuple poussa des cris de joie et ils tombèrent sur leur face.', 'Lévitique 9:24'),

-- Nadab et Abihu (Chapitre 10)
('lev_037', 'LEV', 'Qui étaient Nadab et Abihu ?', '["Des Lévites","Les fils d''Aaron","Les frères de Moïse","Des anciens d''Israël"]', 1, 'Nadab et Abihu étaient les deux fils aînés d''Aaron.', 'Lévitique 10:1'),
('lev_038', 'LEV', 'Quel péché Nadab et Abihu ont-ils commis ?', '["Voler les offrandes","Offrir un feu étranger que l''Éternel n''avait pas ordonné","Blasphémer","Désobéir à Moïse"]', 1, 'Ils ont offert devant l''Éternel un feu étranger, ce qu''il ne leur avait point ordonné.', 'Lévitique 10:1'),
('lev_039', 'LEV', 'Que leur est-il arrivé ?', '["Ils ont été bannis","Un feu sortit de devant l''Éternel et ils moururent","Ils furent frappés de lèpre","Rien"]', 1, 'Un feu sortit de devant l''Éternel et les consuma, et ils moururent devant l''Éternel.', 'Lévitique 10:2'),
('lev_040', 'LEV', 'Qu''est-ce que Moïse a interdit aux sacrificateurs de boire avant d''entrer dans la tente d''assignation ?', '["De l''eau","Du vin ou des boissons enivrantes","Du lait","Du jus de fruit"]', 1, 'Moïse leur interdit de boire du vin ou des boissons enivrantes avant d''entrer dans la tente.', 'Lévitique 10:9'),
('lev_041', 'LEV', 'Qui a emporté les corps de Nadab et Abihu hors du camp ?', '["Aaron","Moïse","Leurs cousins Mischaël et Eltsaphan","Les anciens"]', 2, 'Mischaël et Eltsaphan, leurs cousins, les emportèrent hors du camp.', 'Lévitique 10:4-5'),

-- Lois alimentaires (Chapitre 11)
('lev_042', 'LEV', 'Quels critères rendaient un animal terrestre pur à manger ?', '["Avoir des cornes et manger de l''herbe","Avoir le sabot fendu et ruminer","Avoir quatre pattes","Vivre dans la forêt"]', 1, 'L''animal devait avoir le sabot fendu et ruminer pour être pur.', 'Lévitique 11:3'),
('lev_043', 'LEV', 'Pourquoi le porc était-il considéré impur ?', '["Il ne rumine pas bien qu''ayant le sabot fendu","Il vit dans la boue","Il est trop gras","Il mange n''importe quoi"]', 0, 'Le porc a le sabot fendu mais il ne rumine pas, donc il est impur.', 'Lévitique 11:7'),
('lev_044', 'LEV', 'Pourquoi le chameau était-il considéré impur ?', '["Il est trop grand","Il rumine mais n''a pas le sabot fendu","Il vit dans le désert","Il porte des charges"]', 1, 'Le chameau rumine mais n''a pas le sabot fendu, donc il est impur.', 'Lévitique 11:4'),
('lev_045', 'LEV', 'Quels critères rendaient un poisson pur à manger ?', '["Vivre en eau douce","Avoir des nageoires et des écailles","Être petit","Vivre en groupe"]', 1, 'Le poisson devait avoir des nageoires et des écailles pour être pur.', 'Lévitique 11:9'),
('lev_046', 'LEV', 'Parmi ces oiseaux, lequel était considéré impur ?', '["La colombe","Le pigeon","L''aigle","La caille"]', 2, 'L''aigle était parmi les oiseaux impurs qui ne devaient pas être mangés.', 'Lévitique 11:13'),
('lev_047', 'LEV', 'Quels insectes pouvaient être mangés ?', '["Tous les insectes","Aucun insecte","Les sauterelles et criquets ayant des jambes pour sauter","Les fourmis"]', 2, 'On pouvait manger les insectes ailés ayant des jambes au-dessus des pieds pour sauter.', 'Lévitique 11:21-22'),
('lev_048', 'LEV', 'Que devait faire quelqu''un qui touchait le cadavre d''un animal impur ?', '["Rien","Être impur jusqu''au soir","Offrir un sacrifice","Quitter le camp"]', 1, 'Il était impur jusqu''au soir.', 'Lévitique 11:24'),
('lev_049', 'LEV', 'Pourquoi Dieu a-t-il donné ces lois alimentaires selon le texte ?', '["Pour tester le peuple","Pour que le peuple soit saint car Dieu est saint","Pour des raisons économiques","Par caprice"]', 1, 'Car je suis l''Éternel votre Dieu; vous vous sanctifierez et serez saints, car je suis saint.', 'Lévitique 11:44'),

-- Purification après l'accouchement (Chapitre 12)
('lev_050', 'LEV', 'Combien de jours une femme était-elle impure après avoir accouché d''un garçon ?', '["Trois jours","Sept jours","Quatorze jours","Quarante jours"]', 1, 'Elle était impure pendant sept jours après la naissance d''un garçon.', 'Lévitique 12:2'),
('lev_051', 'LEV', 'Quand le garçon devait-il être circoncis ?', '["Le premier jour","Le septième jour","Le huitième jour","Le quatorzième jour"]', 2, 'Le huitième jour, l''enfant devait être circoncis.', 'Lévitique 12:3'),
('lev_052', 'LEV', 'Combien de temps supplémentaire une femme restait-elle en purification après un garçon ?', '["Sept jours","Trente-trois jours","Quarante jours","Soixante-six jours"]', 1, 'Elle restait trente-trois jours à se purifier de son sang.', 'Lévitique 12:4'),
('lev_053', 'LEV', 'Quelle était la différence pour l''accouchement d''une fille ?', '["Pas de différence","Temps double d''impureté et de purification","Moins de temps","Pas de sacrifice requis"]', 1, 'Pour une fille, l''impureté était de deux semaines et la purification de soixante-six jours.', 'Lévitique 12:5'),

-- La lèpre (Chapitres 13-14)
('lev_054', 'LEV', 'Qui devait examiner les maladies de peau suspectes ?', '["Moïse","Le malade lui-même","Le sacrificateur","Les anciens"]', 2, 'Le sacrificateur devait examiner le mal sur la peau.', 'Lévitique 13:3'),
('lev_055', 'LEV', 'Combien de temps une personne suspecte de lèpre était-elle mise en isolement initial ?', '["Trois jours","Sept jours","Quatorze jours","Quarante jours"]', 1, 'Le sacrificateur l''enfermait pendant sept jours.', 'Lévitique 13:4'),
('lev_056', 'LEV', 'Que devait crier un lépreux quand il marchait ?', '["À l''aide!","Je suis malade","Impur! Impur!","Éloignez-vous"]', 2, 'Il devait crier: Impur! Impur!', 'Lévitique 13:45'),
('lev_057', 'LEV', 'Où devait habiter une personne lépreuse ?', '["Dans sa maison","Hors du camp, à l''écart","Avec les autres lépreux","Dans le temple"]', 1, 'Le lépreux devait habiter seul, sa demeure était hors du camp.', 'Lévitique 13:46'),
('lev_058', 'LEV', 'Que devait-on faire des vêtements atteints de lèpre ?', '["Les laver","Les brûler au feu","Les enterrer","Les donner"]', 1, 'Le vêtement atteint de lèpre devait être brûlé au feu.', 'Lévitique 13:52'),
('lev_059', 'LEV', 'Quels oiseaux étaient utilisés dans la purification d''un lépreux guéri ?', '["Des aigles","Deux oiseaux purs et vivants","Des corbeaux","Des moineaux"]', 1, 'On prenait deux oiseaux purs et vivants pour la purification.', 'Lévitique 14:4'),
('lev_060', 'LEV', 'Que faisait-on avec l''un des deux oiseaux ?', '["On le gardait","On l''égorgeait au-dessus d''eau vive dans un vase de terre","On le mangeait","On le brûlait"]', 1, 'L''un des oiseaux était égorgé sur de l''eau vive dans un vase de terre.', 'Lévitique 14:5'),
('lev_061', 'LEV', 'Que faisait-on avec le second oiseau ?', '["On le sacrifiait aussi","On le lâchait dans les champs","On le gardait","On le brûlait"]', 1, 'L''oiseau vivant était lâché dans les champs.', 'Lévitique 14:7'),
('lev_062', 'LEV', 'Sur quelles parties du corps du lépreux purifié mettait-on du sang et de l''huile ?', '["Les mains seulement","L''oreille droite, le pouce droit et l''orteil droit","Le front","Partout"]', 1, 'On mettait du sang et de l''huile sur l''oreille droite, le pouce droit et l''orteil droit.', 'Lévitique 14:14,17'),

-- Impuretés corporelles (Chapitre 15)
('lev_063', 'LEV', 'Tout ce que touchait une personne ayant un écoulement corporel devenait quoi ?', '["Sacré","Impur","Béni","Normal"]', 1, 'Tout ce que touchait une personne avec un écoulement devenait impur.', 'Lévitique 15:4'),
('lev_064', 'LEV', 'Combien de jours après la cessation d''un écoulement devait-on attendre avant la purification ?', '["Trois jours","Sept jours","Quatorze jours","Immédiatement"]', 1, 'Sept jours après la cessation de l''écoulement.', 'Lévitique 15:13'),

-- Le Jour des Expiations (Chapitre 16)
('lev_065', 'LEV', 'Quand Aaron pouvait-il entrer dans le lieu très saint ?', '["Tous les jours","Chaque sabbat","Une fois par an, au jour des expiations","Jamais"]', 2, 'Aaron ne pouvait entrer qu''une fois par an, au jour des expiations.', 'Lévitique 16:2'),
('lev_066', 'LEV', 'Quels animaux Aaron devait-il prendre pour le jour des expiations ?', '["Un taureau pour lui et deux boucs pour le peuple","Deux agneaux","Un bélier","Des colombes"]', 0, 'Un jeune taureau pour le sacrifice d''expiation pour lui-même et deux boucs pour le peuple.', 'Lévitique 16:3,5'),
('lev_067', 'LEV', 'Comment les deux boucs étaient-ils désignés pour leurs rôles ?', '["Par leur taille","Par le sort","Par leur couleur","Par leur âge"]', 1, 'Aaron jetait le sort sur les deux boucs pour déterminer lequel serait pour l''Éternel et lequel pour Azazel.', 'Lévitique 16:8'),
('lev_068', 'LEV', 'Que faisait-on avec le bouc pour Azazel ?', '["On le sacrifiait","On l''envoyait vivant dans le désert après confession des péchés","On le gardait","On le brûlait"]', 1, 'Le bouc portant les péchés du peuple était envoyé dans le désert vers Azazel.', 'Lévitique 16:21-22'),
('lev_069', 'LEV', 'Avec quoi Aaron devait-il remplir le lieu très saint avant d''y entrer ?', '["De lumière","De fumée d''encens","D''eau","De prières"]', 1, 'La nuée de parfum de l''encens devait couvrir le propitiatoire.', 'Lévitique 16:13'),
('lev_070', 'LEV', 'Combien de fois Aaron devait-il faire l''aspersion du sang sur le propitiatoire ?', '["Trois fois","Sept fois","Une fois","Dix fois"]', 1, 'Il faisait l''aspersion du sang avec son doigt sept fois.', 'Lévitique 16:14'),
('lev_071', 'LEV', 'Quel mois et quel jour avait lieu le jour des expiations ?', '["Le premier jour du premier mois","Le dixième jour du septième mois","Le quinzième jour du troisième mois","Le dernier jour de l''année"]', 1, 'Le dixième jour du septième mois.', 'Lévitique 16:29'),
('lev_072', 'LEV', 'Que devait faire le peuple ce jour-là ?', '["Célébrer avec des festins","Humilier leurs âmes et ne faire aucun travail","Travailler normalement","Voyager"]', 1, 'Le peuple devait humilier son âme et ne faire aucun travail.', 'Lévitique 16:29'),

-- Le sang et sa sainteté (Chapitre 17)
('lev_073', 'LEV', 'Pourquoi était-il interdit de manger du sang ?', '["C''est dégoûtant","L''âme de la chair est dans le sang","C''est impropre","Pour raison d''hygiène"]', 1, 'Car l''âme de la chair est dans le sang, et Dieu l''a donné sur l''autel pour faire expiation.', 'Lévitique 17:11'),
('lev_074', 'LEV', 'Que devait-on faire avec le sang d''un animal chassé ?', '["Le boire","Le jeter","Le répandre et le couvrir de poussière","L''offrir en sacrifice"]', 2, 'Il devait répandre le sang et le couvrir de poussière.', 'Lévitique 17:13'),

-- Lois sur la sainteté sexuelle (Chapitre 18)
('lev_075', 'LEV', 'Quelles pratiques les Israélites ne devaient-ils pas suivre ?', '["Les pratiques de Babylone","Les pratiques d''Égypte et de Canaan","Les pratiques des Philistins","Les pratiques des Moabites"]', 1, 'Ils ne devaient pas suivre les pratiques du pays d''Égypte ni du pays de Canaan.', 'Lévitique 18:3'),
('lev_076', 'LEV', 'Quelle pratique abominable liée à Moloc est interdite ?', '["Faire des images","Faire passer ses enfants par le feu","Consulter les morts","Manger des choses sacrifiées"]', 1, 'Il était interdit de faire passer ses enfants par le feu à Moloc.', 'Lévitique 18:21'),

-- Lois de sainteté diverses (Chapitre 19)
('lev_077', 'LEV', 'Quel commandement résume les lois sur les relations avec le prochain ?', '["Évitez les conflits","Tu aimeras ton prochain comme toi-même","Soyez prudents","Ne parlez pas aux étrangers"]', 1, 'Tu aimeras ton prochain comme toi-même - ce commandement résume les lois relationnelles.', 'Lévitique 19:18'),
('lev_078', 'LEV', 'Que devait-on laisser dans les champs lors de la moisson ?', '["Rien","Les coins des champs et la glanure pour les pauvres","La meilleure part","La moitié"]', 1, 'Il fallait laisser les coins du champ et ce qui tombait pour le pauvre et l''étranger.', 'Lévitique 19:9-10'),
('lev_079', 'LEV', 'Quelle était l''attitude requise envers les personnes âgées ?', '["Les ignorer","Se lever devant les cheveux blancs et honorer le vieillard","Les éviter","Les critiquer"]', 1, 'Tu te lèveras devant les cheveux blancs et tu honoreras la personne du vieillard.', 'Lévitique 19:32'),
('lev_080', 'LEV', 'Comment devait-on traiter l''étranger ?', '["Avec suspicion","Comme un étranger qu''il était","Comme un des vôtres, en l''aimant comme soi-même","Avec indifférence"]', 2, 'L''étranger devait être traité comme l''un des vôtres, et aimé comme soi-même.', 'Lévitique 19:34'),
('lev_081', 'LEV', 'Qu''est-ce qui était interdit concernant les poids et mesures ?', '["Rien de spécial","Avoir des balances fausses et des mesures injustes","Peser en public","Utiliser plusieurs unités"]', 1, 'Il était interdit d''avoir des balances fausses, des poids faux et des mesures fausses.', 'Lévitique 19:35-36'),

-- Peines capitales (Chapitre 20)
('lev_082', 'LEV', 'Quelle était la peine pour quelqu''un qui offrait ses enfants à Moloc ?', '["L''exil","La mort par lapidation","Une amende","L''exclusion temporaire"]', 1, 'Le peuple du pays devait le lapider.', 'Lévitique 20:2'),
('lev_083', 'LEV', 'Quelle était la peine pour consulter des médiums ou spirites ?', '["Rien","Être retranché du peuple","Un sacrifice","Une prière"]', 1, 'Quiconque consulte les spirites serait retranché du milieu de son peuple.', 'Lévitique 20:6'),

-- Règles pour les sacrificateurs (Chapitres 21-22)
('lev_084', 'LEV', 'Qui un sacrificateur ne pouvait-il pas épouser ?', '["Une veuve","Une femme divorcée, prostituée ou déshonorée","Une étrangère","Une femme plus âgée"]', 1, 'Le sacrificateur ne pouvait épouser une prostituée, une femme déshonorée ou divorcée.', 'Lévitique 21:7'),
('lev_085', 'LEV', 'Quel sacrificateur avait des restrictions encore plus strictes ?', '["Le sacrificateur âgé","Le grand sacrificateur","Le plus jeune","Celui qui servait dehors"]', 1, 'Le grand sacrificateur avait des restrictions supplémentaires, ne pouvant même pas épouser une veuve.', 'Lévitique 21:13-14'),
('lev_086', 'LEV', 'Quels défauts physiques empêchaient un descendant d''Aaron de servir à l''autel ?', '["Aucun défaut n''importait","Aveuglement, claudication, ou autres difformités","Seulement la cécité","Seulement les membres manquants"]', 1, 'Divers défauts physiques empêchaient le service à l''autel, bien qu''il pût manger des choses saintes.', 'Lévitique 21:17-23'),
('lev_087', 'LEV', 'Quels animaux ne pouvaient pas être offerts en sacrifice ?', '["Les animaux domestiques","Les animaux avec des défauts","Les jeunes animaux","Les animaux blancs"]', 1, 'Les animaux avec des défauts (aveugles, estropiés, mutilés) ne pouvaient être offerts.', 'Lévitique 22:22'),

-- Les fêtes de l'Éternel (Chapitre 23)
('lev_088', 'LEV', 'Quel jour hebdomadaire était une sainte convocation ?', '["Le premier jour","Le cinquième jour","Le septième jour, le sabbat","Le troisième jour"]', 2, 'Le septième jour est le jour du repos, une sainte convocation.', 'Lévitique 23:3'),
('lev_089', 'LEV', 'Quand avait lieu la Pâque ?', '["Le premier jour du premier mois","Le quatorzième jour du premier mois, au crépuscule","Le dernier jour de l''année","Le dixième jour du septième mois"]', 1, 'Le quatorzième jour du premier mois, entre les deux soirs, c''est la Pâque de l''Éternel.', 'Lévitique 23:5'),
('lev_090', 'LEV', 'Combien de jours durait la fête des pains sans levain ?', '["Un jour","Trois jours","Sept jours","Quatorze jours"]', 2, 'La fête des pains sans levain durait sept jours.', 'Lévitique 23:6'),
('lev_091', 'LEV', 'Que devait-on apporter le lendemain du sabbat pendant la fête des pains sans levain ?', '["Un agneau","Une gerbe des prémices de la moisson","Du vin","Du pain"]', 1, 'Une gerbe, prémices de votre moisson, devait être apportée au sacrificateur.', 'Lévitique 23:10'),
('lev_092', 'LEV', 'Combien de jours après la gerbe des prémices avait lieu la Pentecôte ?', '["Sept jours","Quarante jours","Cinquante jours","Soixante-dix jours"]', 2, 'Depuis le lendemain du sabbat, on comptait cinquante jours jusqu''à la Pentecôte.', 'Lévitique 23:15-16'),
('lev_093', 'LEV', 'Qu''offrait-on à la Pentecôte ?', '["Un agneau sans levain","Deux pains avec du levain, prémices de la nouvelle récolte","Des fruits","Du vin"]', 1, 'On offrait deux pains avec du levain, prémices à l''Éternel.', 'Lévitique 23:17'),
('lev_094', 'LEV', 'Quand avait lieu la fête des Trompettes ?', '["Le premier jour du premier mois","Le premier jour du septième mois","Le quinzième jour du septième mois","Le dixième jour"]', 1, 'Le premier jour du septième mois était un jour de repos, un mémorial au son des trompettes.', 'Lévitique 23:24'),
('lev_095', 'LEV', 'Combien de jours durait la fête des Tabernacles ?', '["Trois jours","Sept jours","Quatorze jours","Quarante jours"]', 1, 'La fête des Tabernacles durait sept jours.', 'Lévitique 23:34'),
('lev_096', 'LEV', 'Que devaient faire les Israélites pendant la fête des Tabernacles ?', '["Jeûner","Habiter dans des cabanes de branchages","Rester chez eux","Voyager"]', 1, 'Ils devaient demeurer dans des cabanes pendant sept jours.', 'Lévitique 23:42'),

-- Le pain de proposition et le blasphémateur (Chapitre 24)
('lev_097', 'LEV', 'Combien de pains de proposition devait-il y avoir sur la table pure ?', '["Sept pains","Douze pains en deux rangées de six","Dix pains","Quatre pains"]', 1, 'Il devait y avoir douze pains disposés en deux rangées de six.', 'Lévitique 24:5-6'),
('lev_098', 'LEV', 'Quelle était la peine pour le blasphème du nom de l''Éternel ?', '["L''exil","La mort par lapidation","Une amende","L''exclusion"]', 1, 'Celui qui blasphémait le nom de l''Éternel devait être mis à mort par lapidation.', 'Lévitique 24:16'),
('lev_099', 'LEV', 'Quel principe de justice est énoncé dans ce chapitre ?', '["La grâce prime","Œil pour œil, dent pour dent","Pardon pour tout","La miséricorde avant tout"]', 1, 'Fracture pour fracture, œil pour œil, dent pour dent - le châtiment équivalent au dommage.', 'Lévitique 24:20'),

-- L'année sabbatique et le Jubilé (Chapitre 25)
('lev_100', 'LEV', 'Tous les combien d''années la terre devait-elle observer un repos ?', '["Chaque année","Tous les sept ans","Tous les dix ans","Tous les cinquante ans"]', 1, 'La septième année, la terre devait observer un sabbat de repos.', 'Lévitique 25:4'),
('lev_101', 'LEV', 'Qu''était l''année du Jubilé ?', '["La 25ème année","La 49ème année","La 50ème année après 7 sabbats d''années","La 100ème année"]', 2, 'Après sept sabbats d''années (49 ans), la cinquantième année était le Jubilé.', 'Lévitique 25:10'),
('lev_102', 'LEV', 'Que se passait-il pendant l''année du Jubilé ?', '["Grand festin","Chacun retournait dans sa propriété et les esclaves étaient libérés","Grande fête","Voyage obligatoire"]', 1, 'Les terres retournaient à leurs propriétaires originaux et les esclaves hébreux étaient libérés.', 'Lévitique 25:10'),
('lev_103', 'LEV', 'Pouvait-on vendre définitivement la terre en Israël ?', '["Oui","Non, car la terre appartient à l''Éternel","Seulement aux étrangers","Seulement aux Lévites"]', 1, 'Les terres ne pouvaient être vendues définitivement car la terre appartient à l''Éternel.', 'Lévitique 25:23'),
('lev_104', 'LEV', 'Comment devait-on traiter un Israélite devenu pauvre et vendu à son frère ?', '["Comme un esclave ordinaire","Comme un serviteur à gages jusqu''au Jubilé","Comme un étranger","Sans considération"]', 1, 'Il devait être traité comme un serviteur à gages et libéré au Jubilé.', 'Lévitique 25:39-40'),

-- Bénédictions et malédictions (Chapitre 26)
('lev_105', 'LEV', 'Quelle promesse Dieu fait-il si le peuple obéit à ses commandements ?', '["Richesse seulement","Pluie en sa saison, récoltes abondantes, paix et sécurité","Rien de spécial","Victoire sur tous les ennemis uniquement"]', 1, 'Dieu promettait la pluie en sa saison, des récoltes abondantes, la paix et la sécurité.', 'Lévitique 26:3-6'),
('lev_106', 'LEV', 'Combien d''ennemis cinq Israélites pourraient-ils poursuivre selon la promesse ?', '["Dix","Cinquante","Cent","Mille"]', 2, 'Cinq d''entre vous poursuivront cent ennemis.', 'Lévitique 26:8'),
('lev_107', 'LEV', 'Quelles malédictions viendraient sur le peuple désobéissant ?', '["Seulement des maladies","Terreur, maladie, défaite, famine, bêtes sauvages","Seulement l''exil","Rien de grave"]', 1, 'Les malédictions incluaient terreur, maladie, défaite, famine, bêtes sauvages et exil.', 'Lévitique 26:14-39'),
('lev_108', 'LEV', 'Même si le peuple était puni, que promettait Dieu ?', '["Abandon total","Se souvenir de son alliance s''ils confessaient leurs péchés","Destruction complète","Les oublier"]', 1, 'Dieu promettait de se souvenir de son alliance et de ne pas les rejeter totalement.', 'Lévitique 26:42-45'),

-- Les vœux et les dîmes (Chapitre 27)
('lev_109', 'LEV', 'Comment les personnes pouvaient-elles être évaluées pour un vœu ?', '["Par leur richesse","Selon l''âge et le sexe en sicles d''argent","Par leur position sociale","Par leur sagesse"]', 1, 'L''évaluation dépendait de l''âge et du sexe de la personne.', 'Lévitique 27:3-7'),
('lev_110', 'LEV', 'Quelle fraction devait être ajoutée si quelqu''un rachetait sa dîme ?', '["Un dixième","Un cinquième","Un quart","La moitié"]', 1, 'S''il la rachetait, il devait ajouter un cinquième à la valeur.', 'Lévitique 27:31'),
('lev_111', 'LEV', 'Qu''est-ce qui était interdit de vouer car appartenant déjà à l''Éternel ?', '["Les arbres","Les premiers-nés du bétail","L''or","Les vêtements"]', 1, 'Les premiers-nés appartenant déjà à l''Éternel ne pouvaient être voués.', 'Lévitique 27:26'),
('lev_112', 'LEV', 'Quelle portion de toutes les récoltes et du bétail appartenait à l''Éternel ?', '["Un cinquième","Un quart","La dîme (un dixième)","La moitié"]', 2, 'Toute dîme de la terre et des troupeaux appartient à l''Éternel.', 'Lévitique 27:30,32');

-- Mise à jour du nombre de questions pour Lévitique
UPDATE book_quizzes SET question_count = (SELECT COUNT(*) FROM book_quiz_questions WHERE book_id = 'LEV') WHERE book_id = 'LEV';
