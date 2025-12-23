-- Book Quizzes - Ancien Testament
INSERT INTO book_quizzes (id, book_id, book_name, testament, question_count, difficulty) VALUES
('bq_gen', 'GEN', 'Genèse', 'old', 15, 'medium'),
('bq_exo', 'EXO', 'Exode', 'old', 15, 'medium'),
('bq_lev', 'LEV', 'Lévitique', 'old', 10, 'hard'),
('bq_num', 'NUM', 'Nombres', 'old', 10, 'hard'),
('bq_deu', 'DEU', 'Deutéronome', 'old', 10, 'medium'),
('bq_jos', 'JOS', 'Josué', 'old', 10, 'medium'),
('bq_jdg', 'JDG', 'Juges', 'old', 10, 'medium'),
('bq_rut', 'RUT', 'Ruth', 'old', 8, 'easy'),
('bq_1sa', '1SA', '1 Samuel', 'old', 12, 'medium'),
('bq_2sa', '2SA', '2 Samuel', 'old', 10, 'medium'),
('bq_1ki', '1KI', '1 Rois', 'old', 10, 'medium'),
('bq_2ki', '2KI', '2 Rois', 'old', 10, 'medium'),
('bq_1ch', '1CH', '1 Chroniques', 'old', 8, 'hard'),
('bq_2ch', '2CH', '2 Chroniques', 'old', 8, 'hard'),
('bq_ezr', 'EZR', 'Esdras', 'old', 8, 'hard'),
('bq_neh', 'NEH', 'Néhémie', 'old', 8, 'medium'),
('bq_est', 'EST', 'Esther', 'old', 10, 'easy'),
('bq_job', 'JOB', 'Job', 'old', 10, 'medium'),
('bq_psa', 'PSA', 'Psaumes', 'old', 15, 'medium'),
('bq_pro', 'PRO', 'Proverbes', 'old', 12, 'medium'),
('bq_ecc', 'ECC', 'Ecclésiaste', 'old', 8, 'medium'),
('bq_sng', 'SNG', 'Cantique', 'old', 6, 'hard'),
('bq_isa', 'ISA', 'Ésaïe', 'old', 12, 'medium'),
('bq_jer', 'JER', 'Jérémie', 'old', 10, 'hard'),
('bq_lam', 'LAM', 'Lamentations', 'old', 6, 'hard'),
('bq_ezk', 'EZK', 'Ézéchiel', 'old', 10, 'hard'),
('bq_dan', 'DAN', 'Daniel', 'old', 12, 'medium'),
('bq_hos', 'HOS', 'Osée', 'old', 6, 'hard'),
('bq_jol', 'JOL', 'Joël', 'old', 5, 'medium'),
('bq_amo', 'AMO', 'Amos', 'old', 6, 'hard'),
('bq_oba', 'OBA', 'Abdias', 'old', 4, 'hard'),
('bq_jon', 'JON', 'Jonas', 'old', 10, 'easy'),
('bq_mic', 'MIC', 'Michée', 'old', 6, 'medium'),
('bq_nam', 'NAM', 'Nahum', 'old', 4, 'hard'),
('bq_hab', 'HAB', 'Habakuk', 'old', 5, 'medium'),
('bq_zep', 'ZEP', 'Sophonie', 'old', 4, 'hard'),
('bq_hag', 'HAG', 'Aggée', 'old', 4, 'medium'),
('bq_zec', 'ZEC', 'Zacharie', 'old', 8, 'hard'),
('bq_mal', 'MAL', 'Malachie', 'old', 6, 'medium');

-- Book Quizzes - Nouveau Testament
INSERT INTO book_quizzes (id, book_id, book_name, testament, question_count, difficulty) VALUES
('bq_mat', 'MAT', 'Matthieu', 'new', 15, 'medium'),
('bq_mrk', 'MRK', 'Marc', 'new', 12, 'easy'),
('bq_luk', 'LUK', 'Luc', 'new', 15, 'medium'),
('bq_jhn', 'JHN', 'Jean', 'new', 15, 'medium'),
('bq_act', 'ACT', 'Actes', 'new', 15, 'medium'),
('bq_rom', 'ROM', 'Romains', 'new', 12, 'hard'),
('bq_1co', '1CO', '1 Corinthiens', 'new', 10, 'medium'),
('bq_2co', '2CO', '2 Corinthiens', 'new', 8, 'medium'),
('bq_gal', 'GAL', 'Galates', 'new', 8, 'medium'),
('bq_eph', 'EPH', 'Éphésiens', 'new', 10, 'medium'),
('bq_php', 'PHP', 'Philippiens', 'new', 8, 'easy'),
('bq_col', 'COL', 'Colossiens', 'new', 6, 'medium'),
('bq_1th', '1TH', '1 Thessaloniciens', 'new', 6, 'medium'),
('bq_2th', '2TH', '2 Thessaloniciens', 'new', 5, 'medium'),
('bq_1ti', '1TI', '1 Timothée', 'new', 8, 'medium'),
('bq_2ti', '2TI', '2 Timothée', 'new', 6, 'medium'),
('bq_tit', 'TIT', 'Tite', 'new', 5, 'medium'),
('bq_phm', 'PHM', 'Philémon', 'new', 4, 'easy'),
('bq_heb', 'HEB', 'Hébreux', 'new', 12, 'hard'),
('bq_jas', 'JAS', 'Jacques', 'new', 8, 'medium'),
('bq_1pe', '1PE', '1 Pierre', 'new', 8, 'medium'),
('bq_2pe', '2PE', '2 Pierre', 'new', 5, 'medium'),
('bq_1jn', '1JN', '1 Jean', 'new', 8, 'easy'),
('bq_2jn', '2JN', '2 Jean', 'new', 4, 'medium'),
('bq_3jn', '3JN', '3 Jean', 'new', 4, 'medium'),
('bq_jud', 'JUD', 'Jude', 'new', 5, 'medium'),
('bq_rev', 'REV', 'Apocalypse', 'new', 15, 'hard');

-- Questions pour Genèse
INSERT INTO book_quiz_questions (id, book_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, verse_ref) VALUES
('gen_q1', 'GEN', 'Au commencement, qu''est-ce que Dieu a créé ?', 'L''homme et la femme', 'Les cieux et la terre', 'Les animaux', 'Les plantes', 1, 'Le premier verset de la Bible annonce que Dieu a créé les cieux et la terre.', 'Genèse 1:1'),
('gen_q2', 'GEN', 'Quel jour Dieu a-t-il créé l''homme ?', 'Le troisième jour', 'Le cinquième jour', 'Le sixième jour', 'Le septième jour', 2, 'Dieu créa l''homme le sixième jour, après avoir créé les animaux.', 'Genèse 1:26-27'),
('gen_q3', 'GEN', 'De quoi Dieu a-t-il formé l''homme ?', 'De l''eau', 'De la poussière de la terre', 'Du feu', 'De la lumière', 1, 'Dieu forma l''homme de la poussière de la terre et souffla dans ses narines.', 'Genèse 2:7'),
('gen_q4', 'GEN', 'Comment s''appelait le jardin où Dieu plaça l''homme ?', 'Le jardin d''Israël', 'Le jardin de Gethsémané', 'Le jardin d''Éden', 'Le jardin de Babylone', 2, 'Dieu plaça Adam dans le jardin d''Éden pour le cultiver et le garder.', 'Genèse 2:8'),
('gen_q5', 'GEN', 'Quel était le nom de la femme d''Adam ?', 'Sara', 'Ruth', 'Ève', 'Rachel', 2, 'Adam appela sa femme Ève parce qu''elle fut la mère de tous les vivants.', 'Genèse 3:20'),
('gen_q6', 'GEN', 'Qui a tué Abel ?', 'Seth', 'Caïn', 'Adam', 'Noé', 1, 'Caïn tua son frère Abel par jalousie car Dieu avait agréé l''offrande d''Abel.', 'Genèse 4:8'),
('gen_q7', 'GEN', 'Combien de jours et de nuits a duré le déluge ?', '7 jours et 7 nuits', '40 jours et 40 nuits', '100 jours et 100 nuits', '12 jours et 12 nuits', 1, 'La pluie tomba sur la terre pendant 40 jours et 40 nuits.', 'Genèse 7:12'),
('gen_q8', 'GEN', 'Quel signe Dieu donna-t-il après le déluge ?', 'Une étoile', 'Un arc-en-ciel', 'Un nuage de feu', 'Un tremblement de terre', 1, 'L''arc-en-ciel est le signe de l''alliance entre Dieu et la terre.', 'Genèse 9:13'),
('gen_q9', 'GEN', 'Quel était le nom original d''Abraham ?', 'Isaac', 'Jacob', 'Abram', 'Israël', 2, 'Dieu changea le nom d''Abram en Abraham, signifiant père d''une multitude.', 'Genèse 17:5'),
('gen_q10', 'GEN', 'Qui était la femme d''Abraham ?', 'Agar', 'Sara', 'Rebecca', 'Léa', 1, 'Sara était la femme d''Abraham et la mère d''Isaac.', 'Genèse 17:15'),
('gen_q11', 'GEN', 'Quel fils Abraham devait-il sacrifier ?', 'Ismaël', 'Isaac', 'Jacob', 'Joseph', 1, 'Dieu demanda à Abraham d''offrir Isaac en sacrifice, mais il l''arrêta.', 'Genèse 22:2'),
('gen_q12', 'GEN', 'Combien de fils Jacob a-t-il eu ?', '10', '11', '12', '13', 2, 'Jacob eut 12 fils qui devinrent les 12 tribus d''Israël.', 'Genèse 35:22-26'),
('gen_q13', 'GEN', 'Comment Joseph fut-il vendu par ses frères ?', 'Comme esclave aux Égyptiens', 'Comme esclave aux Babyloniens', 'Comme serviteur au temple', 'Comme berger', 0, 'Les frères de Joseph le vendirent à des marchands Ismaélites.', 'Genèse 37:28'),
('gen_q14', 'GEN', 'Quel poste Joseph obtint-il en Égypte ?', 'Roi', 'Grand prêtre', 'Gouverneur', 'Chef de l''armée', 2, 'Pharaon établit Joseph gouverneur sur toute l''Égypte.', 'Genèse 41:41'),
('gen_q15', 'GEN', 'Qui était le plus jeune fils de Jacob ?', 'Joseph', 'Benjamin', 'Juda', 'Dan', 1, 'Benjamin était le plus jeune fils de Jacob et Rachel.', 'Genèse 35:18');

-- Questions pour Exode
INSERT INTO book_quiz_questions (id, book_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, verse_ref) VALUES
('exo_q1', 'EXO', 'Qui fut chargé de libérer les Israélites d''Égypte ?', 'Aaron', 'Moïse', 'Josué', 'Abraham', 1, 'Dieu appela Moïse depuis le buisson ardent pour libérer son peuple.', 'Exode 3:10'),
('exo_q2', 'EXO', 'Combien de plaies Dieu envoya-t-il sur l''Égypte ?', '7', '9', '10', '12', 2, 'Dieu envoya 10 plaies sur l''Égypte avant que Pharaon libère les Israélites.', 'Exode 7-12'),
('exo_q3', 'EXO', 'Quelle était la dernière plaie d''Égypte ?', 'Les ténèbres', 'Les sauterelles', 'La mort des premiers-nés', 'Les ulcères', 2, 'La mort des premiers-nés fut la dernière et plus terrible plaie.', 'Exode 12:29'),
('exo_q4', 'EXO', 'Quelle mer les Israélites ont-ils traversée ?', 'La mer Méditerranée', 'La mer Morte', 'La mer Rouge', 'La mer de Galilée', 2, 'Dieu ouvrit la mer Rouge pour que les Israélites passent à sec.', 'Exode 14:21-22'),
('exo_q5', 'EXO', 'Où Moïse a-t-il reçu les dix commandements ?', 'Mont Morija', 'Mont Sinaï', 'Mont des Oliviers', 'Mont Carmel', 1, 'Dieu donna la loi à Moïse sur le mont Sinaï.', 'Exode 19:20'),
('exo_q6', 'EXO', 'Qu''est-ce que les Israélites ont mangé dans le désert ?', 'Du pain et du vin', 'De la manne et des cailles', 'Des fruits et légumes', 'Du poisson', 1, 'Dieu leur donna la manne et des cailles pour les nourrir.', 'Exode 16:13-15'),
('exo_q7', 'EXO', 'Qui était le frère de Moïse ?', 'Josué', 'Caleb', 'Aaron', 'Éléazar', 2, 'Aaron était le frère aîné de Moïse et devint grand prêtre.', 'Exode 4:14'),
('exo_q8', 'EXO', 'Quelle idole les Israélites ont-ils fabriquée ?', 'Un serpent de bronze', 'Un veau d''or', 'Un lion d''argent', 'Un aigle de fer', 1, 'Pendant l''absence de Moïse, ils fabriquèrent un veau d''or.', 'Exode 32:4'),
('exo_q9', 'EXO', 'Comment Dieu guidait-il les Israélites le jour ?', 'Par une étoile', 'Par une colonne de nuée', 'Par un ange visible', 'Par le vent', 1, 'Dieu les guidait par une colonne de nuée le jour.', 'Exode 13:21'),
('exo_q10', 'EXO', 'Comment Dieu guidait-il les Israélites la nuit ?', 'Par la lune', 'Par une colonne de feu', 'Par les étoiles', 'Par une voix', 1, 'Une colonne de feu les éclairait et les guidait la nuit.', 'Exode 13:21'),
('exo_q11', 'EXO', 'Quel est le premier des dix commandements ?', 'Tu ne voleras point', 'Tu n''auras pas d''autres dieux devant ma face', 'Tu honoreras ton père et ta mère', 'Tu ne tueras point', 1, 'Le premier commandement établit l''unicité de Dieu.', 'Exode 20:3'),
('exo_q12', 'EXO', 'Qu''y avait-il dans l''arche de l''alliance ?', 'De l''or et de l''argent', 'Les tables de la loi', 'Des vêtements sacerdotaux', 'De la manne seulement', 1, 'L''arche contenait les tables de la loi données à Moïse.', 'Exode 25:16'),
('exo_q13', 'EXO', 'Comment s''appelait la sœur de Moïse ?', 'Myriam', 'Sara', 'Rachel', 'Déborah', 0, 'Myriam était la sœur de Moïse et d''Aaron.', 'Exode 15:20'),
('exo_q14', 'EXO', 'Qui fut le beau-père de Moïse ?', 'Pharaon', 'Jéthro', 'Aaron', 'Josué', 1, 'Jéthro était le prêtre de Madian et beau-père de Moïse.', 'Exode 3:1'),
('exo_q15', 'EXO', 'Quel était le nom de la femme de Moïse ?', 'Séphora', 'Agar', 'Tsippora', 'Rebecca', 0, 'Moïse épousa Séphora, fille de Jéthro.', 'Exode 2:21');

-- Questions pour Ruth
INSERT INTO book_quiz_questions (id, book_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, verse_ref) VALUES
('rut_q1', 'RUT', 'De quel pays Ruth était-elle originaire ?', 'Égypte', 'Moab', 'Édom', 'Assyrie', 1, 'Ruth était une Moabite qui épousa un Israélite.', 'Ruth 1:4'),
('rut_q2', 'RUT', 'Comment s''appelait la belle-mère de Ruth ?', 'Naomi', 'Orpa', 'Sara', 'Myriam', 0, 'Naomi était la belle-mère de Ruth.', 'Ruth 1:2'),
('rut_q3', 'RUT', 'Que dit Ruth à Naomi ?', 'Retourne dans ton pays', 'Ton peuple sera mon peuple', 'Je reste ici', 'Pars sans moi', 1, 'Ruth déclara son attachement indéfectible à Naomi et à son Dieu.', 'Ruth 1:16'),
('rut_q4', 'RUT', 'Dans quel champ Ruth est-elle allée glaner ?', 'Le champ de Naomi', 'Le champ de Boaz', 'Le champ du roi', 'Le champ public', 1, 'Ruth glana dans le champ de Boaz, parent de Naomi.', 'Ruth 2:3'),
('rut_q5', 'RUT', 'Qui était Boaz ?', 'Le roi d''Israël', 'Un parent de Naomi', 'Un prêtre', 'Un prophète', 1, 'Boaz était un homme riche, parent d''Élimélec, le mari de Naomi.', 'Ruth 2:1'),
('rut_q6', 'RUT', 'Que fit Boaz pour Ruth ?', 'Il la renvoya', 'Il l''épousa', 'Il la vendit', 'Il l''ignora', 1, 'Boaz racheta le champ et épousa Ruth selon la loi du lévirat.', 'Ruth 4:10'),
('rut_q7', 'RUT', 'Comment s''appelait le fils de Ruth et Boaz ?', 'David', 'Jessé', 'Obed', 'Salomon', 2, 'Obed fut le fils de Ruth et Boaz, grand-père de David.', 'Ruth 4:17'),
('rut_q8', 'RUT', 'De quel roi Ruth est-elle l''ancêtre ?', 'Saül', 'David', 'Salomon', 'Josias', 1, 'Ruth est l''arrière-grand-mère du roi David.', 'Ruth 4:22');

-- Questions pour Jonas
INSERT INTO book_quiz_questions (id, book_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, verse_ref) VALUES
('jon_q1', 'JON', 'Où Dieu a-t-il envoyé Jonas prêcher ?', 'Babylone', 'Jérusalem', 'Ninive', 'Égypte', 2, 'Dieu envoya Jonas à Ninive, grande ville païenne.', 'Jonas 1:2'),
('jon_q2', 'JON', 'Où Jonas a-t-il fui pour échapper à Dieu ?', 'En Égypte', 'À Tarsis', 'À Babylone', 'À Damas', 1, 'Jonas s''embarqua pour Tarsis, direction opposée à Ninive.', 'Jonas 1:3'),
('jon_q3', 'JON', 'Que firent les marins quand la tempête arriva ?', 'Ils prièrent leurs dieux', 'Ils dormirent', 'Ils rirent', 'Ils mangèrent', 0, 'Les marins effrayés crièrent chacun à son dieu.', 'Jonas 1:5'),
('jon_q4', 'JON', 'Que demanda Jonas aux marins ?', 'De prier', 'De le jeter à la mer', 'De continuer le voyage', 'De faire demi-tour', 1, 'Jonas leur dit de le jeter à la mer pour calmer la tempête.', 'Jonas 1:12'),
('jon_q5', 'JON', 'Qui avala Jonas ?', 'Un requin', 'Une baleine', 'Un grand poisson', 'Un monstre marin', 2, 'L''Éternel fit venir un grand poisson pour avaler Jonas.', 'Jonas 2:1'),
('jon_q6', 'JON', 'Combien de temps Jonas resta-t-il dans le poisson ?', '1 jour et 1 nuit', '2 jours et 2 nuits', '3 jours et 3 nuits', '7 jours et 7 nuits', 2, 'Jonas resta dans le ventre du poisson 3 jours et 3 nuits.', 'Jonas 2:1'),
('jon_q7', 'JON', 'Que fit Jonas dans le poisson ?', 'Il dormit', 'Il pria', 'Il pleura', 'Il se mit en colère', 1, 'Jonas pria l''Éternel du ventre du poisson.', 'Jonas 2:2'),
('jon_q8', 'JON', 'Que firent les habitants de Ninive ?', 'Ils se moquèrent', 'Ils se repentirent', 'Ils chassèrent Jonas', 'Ils ignorèrent le message', 1, 'Les Ninivites crurent à Dieu, proclamèrent un jeûne et se repentirent.', 'Jonas 3:5'),
('jon_q9', 'JON', 'Comment Jonas réagit-il au pardon de Ninive ?', 'Il fut joyeux', 'Il fut en colère', 'Il fut indifférent', 'Il pleura de joie', 1, 'Jonas fut très mécontent que Dieu pardonne à Ninive.', 'Jonas 4:1'),
('jon_q10', 'JON', 'Quelle plante Dieu fit-il pousser pour Jonas ?', 'Un olivier', 'Un ricin', 'Un figuier', 'Une vigne', 1, 'Dieu fit pousser un ricin pour donner de l''ombre à Jonas.', 'Jonas 4:6');

-- Questions pour Esther
INSERT INTO book_quiz_questions (id, book_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, verse_ref) VALUES
('est_q1', 'EST', 'Qui était le roi dans le livre d''Esther ?', 'Nabuchodonosor', 'Assuérus', 'Cyrus', 'Darius', 1, 'Assuérus (Xerxès I) régnait sur la Perse.', 'Esther 1:1'),
('est_q2', 'EST', 'Qui était le tuteur d''Esther ?', 'Son père', 'Mardochée', 'Le roi', 'Haman', 1, 'Mardochée était le cousin d''Esther et l''avait adoptée.', 'Esther 2:7'),
('est_q3', 'EST', 'Que devint Esther ?', 'Servante', 'Reine', 'Prêtresse', 'Esclave', 1, 'Esther fut choisie pour devenir reine à la place de Vashti.', 'Esther 2:17'),
('est_q4', 'EST', 'Qui voulait exterminer les Juifs ?', 'Le roi', 'Mardochée', 'Haman', 'Les princes', 2, 'Haman complota pour détruire tous les Juifs du royaume.', 'Esther 3:6'),
('est_q5', 'EST', 'Pourquoi Haman haïssait-il Mardochée ?', 'Mardochée l''avait insulté', 'Mardochée ne se prosternait pas devant lui', 'Mardochée lui avait volé', 'Mardochée était plus riche', 1, 'Mardochée refusait de se prosterner devant Haman.', 'Esther 3:5'),
('est_q6', 'EST', 'Que risquait Esther en allant voir le roi sans être appelée ?', 'L''exil', 'La prison', 'La mort', 'La destitution', 2, 'Toute personne entrant chez le roi sans être appelée risquait la mort.', 'Esther 4:11'),
('est_q7', 'EST', 'Que dit Esther avant d''aller voir le roi ?', 'Je prie d''abord', 'Si je dois mourir, je mourrai', 'Le roi m''aime', 'Je n''ai pas peur', 1, 'Esther demanda un jeûne de 3 jours avant d''aller voir le roi.', 'Esther 4:16'),
('est_q8', 'EST', 'Que prépara Haman pour Mardochée ?', 'Un cadeau', 'Une potence', 'Un festin', 'Une promotion', 1, 'Haman fit préparer une potence pour y pendre Mardochée.', 'Esther 5:14'),
('est_q9', 'EST', 'Qui fut pendu sur la potence ?', 'Mardochée', 'Esther', 'Haman', 'Le roi', 2, 'Haman fut pendu sur la potence qu''il avait préparée pour Mardochée.', 'Esther 7:10'),
('est_q10', 'EST', 'Quelle fête commémore la délivrance des Juifs ?', 'Pâque', 'Pourim', 'Hanoukka', 'Soukkot', 1, 'La fête de Pourim célèbre la délivrance des Juifs sous Esther.', 'Esther 9:26');

-- Questions pour Psaumes
INSERT INTO book_quiz_questions (id, book_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, verse_ref) VALUES
('psa_q1', 'PSA', 'Qui a écrit la majorité des Psaumes ?', 'Moïse', 'Salomon', 'David', 'Asaph', 2, 'David est l''auteur principal des Psaumes.', 'Psaume 23:1'),
('psa_q2', 'PSA', 'Comment commence le Psaume 23 ?', 'Louez l''Éternel', 'L''Éternel est mon berger', 'Je chanterai ta gloire', 'Au chef des chantres', 1, 'L''Éternel est mon berger, je ne manquerai de rien.', 'Psaume 23:1'),
('psa_q3', 'PSA', 'Quel psaume est le plus long de la Bible ?', 'Psaume 1', 'Psaume 119', 'Psaume 150', 'Psaume 23', 1, 'Le Psaume 119 compte 176 versets.', 'Psaume 119'),
('psa_q4', 'PSA', 'Combien de livres contient le livre des Psaumes ?', '3', '4', '5', '7', 2, 'Les Psaumes sont divisés en 5 livres.', 'Psaumes'),
('psa_q5', 'PSA', 'Quel psaume dit : "Les cieux racontent la gloire de Dieu" ?', 'Psaume 1', 'Psaume 8', 'Psaume 19', 'Psaume 23', 2, 'Le Psaume 19 célèbre la révélation de Dieu dans la création.', 'Psaume 19:1'),
('psa_q6', 'PSA', 'Combien de psaumes y a-t-il dans la Bible ?', '100', '120', '150', '175', 2, 'Le livre des Psaumes contient 150 psaumes.', 'Psaumes'),
('psa_q7', 'PSA', 'Quel psaume est un psaume de repentance de David ?', 'Psaume 1', 'Psaume 23', 'Psaume 51', 'Psaume 100', 2, 'David écrivit le Psaume 51 après son péché avec Bath-Shéba.', 'Psaume 51'),
('psa_q8', 'PSA', 'Quel psaume commence par "Heureux l''homme" ?', 'Psaume 1', 'Psaume 8', 'Psaume 19', 'Psaume 23', 0, 'Le Psaume 1 décrit le bonheur de celui qui médite la loi de Dieu.', 'Psaume 1:1'),
('psa_q9', 'PSA', 'Selon le Psaume 23, où Dieu nous conduit-il ?', 'Aux eaux agitées', 'Près des eaux paisibles', 'Dans le désert', 'Sur la mer', 1, 'L''Éternel nous conduit près des eaux paisibles.', 'Psaume 23:2'),
('psa_q10', 'PSA', 'Quel est le dernier verset du Psaume 150 ?', 'Amen', 'Que tout ce qui respire loue l''Éternel', 'Alléluia', 'Gloire à Dieu', 1, 'Que tout ce qui respire loue l''Éternel ! Louez l''Éternel !', 'Psaume 150:6'),
('psa_q11', 'PSA', 'Quel psaume Jésus cita-t-il sur la croix ?', 'Psaume 1', 'Psaume 22', 'Psaume 23', 'Psaume 51', 1, 'Jésus cria : Mon Dieu, mon Dieu, pourquoi m''as-tu abandonné ?', 'Psaume 22:1'),
('psa_q12', 'PSA', 'Dans le Psaume 23, que ne crains-je pas ?', 'La mort', 'Aucun mal', 'Les ennemis', 'La maladie', 1, 'Je ne crains aucun mal, car tu es avec moi.', 'Psaume 23:4'),
('psa_q13', 'PSA', 'Qui a écrit le Psaume 90 ?', 'David', 'Salomon', 'Moïse', 'Asaph', 2, 'Le Psaume 90 est attribué à Moïse.', 'Psaume 90:1'),
('psa_q14', 'PSA', 'Quel psaume dit "Que rendrai-je à l''Éternel" ?', 'Psaume 100', 'Psaume 116', 'Psaume 121', 'Psaume 150', 1, 'Que rendrai-je à l''Éternel pour tous ses bienfaits envers moi ?', 'Psaume 116:12'),
('psa_q15', 'PSA', 'D''où vient le secours selon le Psaume 121 ?', 'De Jérusalem', 'Du temple', 'De l''Éternel qui a fait les cieux et la terre', 'Des anges', 2, 'Mon secours vient de l''Éternel qui a fait les cieux et la terre.', 'Psaume 121:2');

-- Questions pour Daniel
INSERT INTO book_quiz_questions (id, book_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, verse_ref) VALUES
('dan_q1', 'DAN', 'Où Daniel fut-il déporté ?', 'En Égypte', 'À Babylone', 'En Assyrie', 'En Perse', 1, 'Daniel fut déporté à Babylone avec d''autres jeunes Judéens.', 'Daniel 1:1-6'),
('dan_q2', 'DAN', 'Que refusa de manger Daniel ?', 'Du pain', 'Les mets du roi', 'Des fruits', 'Du poisson', 1, 'Daniel refusa les mets du roi pour rester fidèle à la loi de Dieu.', 'Daniel 1:8'),
('dan_q3', 'DAN', 'Quel songe Daniel interpréta-t-il pour Nebucadnetsar ?', 'Un songe d''étoiles', 'Une statue aux pieds d''argile', 'Un songe de brebis', 'Un songe de guerre', 1, 'Daniel interpréta le songe de la grande statue.', 'Daniel 2:31-45'),
('dan_q4', 'DAN', 'Combien d''amis Daniel avait-il à Babylone ?', '2', '3', '4', '12', 1, 'Daniel avait 3 amis : Shadrac, Méshac et Abed-Nego.', 'Daniel 1:6'),
('dan_q5', 'DAN', 'Où les amis de Daniel furent-ils jetés ?', 'En prison', 'Dans une fosse aux lions', 'Dans une fournaise ardente', 'Dans un puits', 2, 'Ils furent jetés dans la fournaise pour avoir refusé d''adorer la statue.', 'Daniel 3:20'),
('dan_q6', 'DAN', 'Combien de personnes le roi vit-il dans la fournaise ?', '3', '4', '5', '7', 1, 'Le roi vit 4 personnes, la quatrième semblable à un fils des dieux.', 'Daniel 3:25'),
('dan_q7', 'DAN', 'Quelle écriture apparut sur le mur lors du festin de Belshatsar ?', 'Mene Tekel Upharsin', 'Gloire à Dieu', 'Repentez-vous', 'Le royaume est fini', 0, 'La main écrivit : Mene, Mene, Tekel, Upharsin.', 'Daniel 5:25'),
('dan_q8', 'DAN', 'Où Daniel fut-il jeté ?', 'En prison', 'Dans une fournaise', 'Dans une fosse aux lions', 'Dans le désert', 2, 'Daniel fut jeté dans la fosse aux lions pour avoir prié Dieu.', 'Daniel 6:16'),
('dan_q9', 'DAN', 'Combien de fois par jour Daniel priait-il ?', 'Une fois', 'Deux fois', 'Trois fois', 'Sept fois', 2, 'Daniel priait trois fois par jour tourné vers Jérusalem.', 'Daniel 6:10'),
('dan_q10', 'DAN', 'Que virent les accusateurs de Daniel le lendemain ?', 'Daniel mort', 'Daniel sain et sauf', 'La fosse vide', 'Les lions endormis', 1, 'Dieu envoya son ange fermer la gueule des lions.', 'Daniel 6:22'),
('dan_q11', 'DAN', 'Dans la vision de Daniel, combien de bêtes sortirent de la mer ?', '3', '4', '7', '10', 1, 'Daniel vit quatre grandes bêtes sortir de la mer.', 'Daniel 7:3'),
('dan_q12', 'DAN', 'Qui est l''Ancien des jours dans Daniel ?', 'Un ange', 'Dieu', 'Le Messie', 'Un prophète', 1, 'L''Ancien des jours représente Dieu le Père dans sa majesté.', 'Daniel 7:9');

-- Questions pour Proverbes
INSERT INTO book_quiz_questions (id, book_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, verse_ref) VALUES
('pro_q1', 'PRO', 'Qui a principalement écrit les Proverbes ?', 'David', 'Salomon', 'Moïse', 'Samuel', 1, 'La majorité des Proverbes sont attribués au roi Salomon.', 'Proverbes 1:1'),
('pro_q2', 'PRO', 'Quel est le commencement de la sagesse ?', 'La connaissance', 'La crainte de l''Éternel', 'L''étude', 'L''expérience', 1, 'La crainte de l''Éternel est le commencement de la sagesse.', 'Proverbes 9:10'),
('pro_q3', 'PRO', 'Que dit Proverbes sur la discipline ?', 'Elle est inutile', 'Elle est cruelle', 'Elle est le chemin de la vie', 'Elle est optionnelle', 2, 'La discipline est le chemin de la vie.', 'Proverbes 6:23'),
('pro_q4', 'PRO', 'Comment les Proverbes décrivent-ils la femme vertueuse ?', 'Rare et précieuse', 'Ordinaire', 'Sans valeur', 'Difficile', 0, 'Une femme vertueuse est plus précieuse que les perles.', 'Proverbes 31:10'),
('pro_q5', 'PRO', 'Que produisent les richesses mal acquises ?', 'Le bonheur', 'La paix', 'Aucun profit', 'La sagesse', 2, 'Les trésors de la méchanceté ne profitent pas.', 'Proverbes 10:2'),
('pro_q6', 'PRO', 'Selon Proverbes, que fait un enfant sage ?', 'Il joue beaucoup', 'Il fait la joie de son père', 'Il dort longtemps', 'Il mange bien', 1, 'Un fils sage fait la joie de son père.', 'Proverbes 10:1'),
('pro_q7', 'PRO', 'Que couvre l''amour selon Proverbes ?', 'Les erreurs', 'Toutes les fautes', 'Les mensonges', 'Les dettes', 1, 'L''amour couvre toutes les fautes.', 'Proverbes 10:12'),
('pro_q8', 'PRO', 'Où n''y a-t-il pas de direction ?', 'Sans conseils', 'Sans argent', 'Sans roi', 'Sans temple', 0, 'Quand il n''y a pas de direction, le peuple tombe.', 'Proverbes 11:14'),
('pro_q9', 'PRO', 'Qu''est-ce qui réjouit le cœur ?', 'L''or', 'Une bonne nouvelle', 'La nourriture', 'Le sommeil', 1, 'Une bonne nouvelle réjouit le cœur.', 'Proverbes 15:30'),
('pro_q10', 'PRO', 'Que vaut mieux qu''un ami éloigné ?', 'Un frère', 'Un voisin proche', 'Un parent', 'Un serviteur', 1, 'Mieux vaut un voisin proche qu''un frère éloigné.', 'Proverbes 27:10'),
('pro_q11', 'PRO', 'Que dit Proverbes sur la paresse ?', 'Elle est acceptable', 'Elle mène à la pauvreté', 'Elle est sagesse', 'Elle est recommandée', 1, 'La paresse fait tomber dans l''assoupissement.', 'Proverbes 19:15'),
('pro_q12', 'PRO', 'Selon Proverbes 22, comment élever un enfant ?', 'Sans discipline', 'Selon la voie qu''il doit suivre', 'Avec permissivité', 'Sans contrainte', 1, 'Instruis l''enfant selon la voie qu''il doit suivre.', 'Proverbes 22:6');
