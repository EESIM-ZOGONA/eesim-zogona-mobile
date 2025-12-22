-- =====================================================
-- CANTIQUES EESIM ZOGONA - Base de données SQLite COMPLETE
-- Total: 301 cantiques
-- =====================================================

-- Insertion du recueil
INSERT INTO hymn_books (id, name, description, language, total_hymns, created_at, updated_at)
VALUES (
  'eesim-zogona',
  'Cantiques EESIM Zogona',
  'Recueil de cantiques de l''Eglise Evangélique SIM Zogona - 301 cantiques',
  'fr',
  301,
  datetime('now'),
  datetime('now')
);

-- =====================================================
-- CANTIQUE 1: A celui qui nous a lavés
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-001', 'eesim-zogona', 1, 'A celui qui nous a lavés', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-001-v1', 'eesim-zg-001', 1, 'verse', 'A celui qui nous a lavés,
Qui nous a tant aimés,
Par son sang nous a rachetés,
Soit gloire, gloire!
Louange à jamais!'),
('eesim-zg-001-v2', 'eesim-zg-001', 2, 'verse', 'Chantons le cantique nouveau
A l''honneur de l''Agneau,
Qui sortit vainqueur du tombeau
Oui, gloire, gloire!
Louange à jamais!'),
('eesim-zg-001-v3', 'eesim-zg-001', 3, 'verse', 'Adorons le Triomphateur,
Jésus notre Sauveur vainqueur,
Sur ses ennemis glorieux,
Oui, gloire, gloire!
Louange à jamais!'),
('eesim-zg-001-v4', 'eesim-zg-001', 4, 'verse', 'Du ciel bientôt Il reviendra,
Et tout œil le verra,
Le monde entier l''adorera,
Oui, gloire, gloire!
Louange à jamais!');

-- =====================================================
-- CANTIQUE 2: A Dieu soit la gloire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-002', 'eesim-zogona', 2, 'A Dieu soit la gloire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-002-v1', 'eesim-zg-002', 1, 'verse', 'A Dieu soit la gloire
Par son grand Amour
Dans mon âme noire
S''est levé le jour.
Jésus, à ma place,
Mourut sur la Croix,
Il m''offre sa Grâce
Et je la reçois!'),
('eesim-zg-002-c1', 'eesim-zg-002', 2, 'chorus', 'Oh! venez au Père,
Jésus est la voie!
Gloire à Dieu! (bis)
Terre, écoute sa voix!
Gloire à Dieu! (bis)
Monde, réjouis-toi!'),
('eesim-zg-002-v2', 'eesim-zg-002', 3, 'verse', 'De Jésus la joie
Remplit notre cœur;
Tout notre bonheur,
Selon sa promesse,
Deuil se changera,
Quand en allégresse,
Quand Il reviendra.');

-- =====================================================
-- CANTIQUE 3: A la croix où mourut mon Sauveur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-003', 'eesim-zogona', 3, 'A la croix où mourut mon Sauveur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-003-v1', 'eesim-zg-003', 1, 'verse', 'A la croix où mourut mon Sauveur,
Brisé de douleur;
Là son sang purifia mon cœur.
A son nom la gloire! (ter)
Là son sang purifia mon cœur.
A son nom la gloire!'),
('eesim-zg-003-v2', 'eesim-zg-003', 2, 'verse', 'Quelle merveille! Il vint me Sauver;
Quand de sa croix je me fus chargé
En moi Jésus vint pour demeurer
A son nom la gloire! (ter)
En moi Jésus vint pour demeurer
A son nom la gloire!'),
('eesim-zg-003-v3', 'eesim-zg-003', 3, 'verse', 'O fontaine effaçant le péché,
Donnant la vie au cœur desséché!
Là, Jésus me retient attaché.
A son nom la gloire! (ter)
Là, Jésus me retient attaché.
A son nom la gloire!'),
('eesim-zg-003-v4', 'eesim-zg-003', 4, 'verse', 'Pauvre âme, viens aux pieds du Sauveur.
A la source ouverte à tout pécheur
Viens t''y plonger, trouver le bonheur.
A son nom la gloire! (ter)
Viens t''y plonger, trouver le bonheur.
A son nom la gloire!');

-- =====================================================
-- CANTIQUE 4: A la fin de mon voyage
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-004', 'eesim-zogona', 4, 'A la fin de mon voyage', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-004-v1', 'eesim-zg-004', 1, 'verse', 'A la fin de mon voyage
Oui je verrai mon Sauveur! (3 fois)
Je verrai mon Sauveur
Dans la cité de Dieu'),
('eesim-zg-004-c1', 'eesim-zg-004', 2, 'chorus', 'Quel bonheur, (4 fois)
A la fin de mon voyage
Oui je verrai mon Sauveur
Dans la cité de Dieu'),
('eesim-zg-004-v2', 'eesim-zg-004', 3, 'verse', 'A la fin de mon voyage
Oui je serai couronné, (3 fois)
Je serai couronné
Dans la cité de Dieu');

-- =====================================================
-- CANTIQUE 5: A toi la gloire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-005', 'eesim-zogona', 5, 'A toi la gloire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-005-v1', 'eesim-zg-005', 1, 'verse', 'A toi la gloire
O Ressuscité!
A toi la victoire
Pour l''éternité!
Brillant de lumière,
L''ange est descendu,
Il roule la pierre
Du tombeau vaincu.'),
('eesim-zg-005-c1', 'eesim-zg-005', 2, 'chorus', 'A toi la gloire
O Ressuscité!
A toi la victoire
Pour l''éternité!'),
('eesim-zg-005-v2', 'eesim-zg-005', 3, 'verse', 'Vois-le paraître:
C''est Lui, c''est Jésus,
Ton Sauveur, ton Maître!
Oh! ne doute plus!
Sois dans l''allégresse,
Peuple du Seigneur,
Et redis sans cesse
Que Christ est vainqueur.'),
('eesim-zg-005-v3', 'eesim-zg-005', 4, 'verse', 'Craindrais-je encore?
Il vit à jamais,
Celui que j''adore,
Le Prince de paix;
Il est ma victoire,
Mon puissant soutien,
Ma vie et ma gloire:
Non, je ne crains rien.');

-- =====================================================
-- CANTIQUE 6: A toi Seigneur je m'abandonne
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-006', 'eesim-zogona', 6, 'A toi Seigneur je m''abandonne', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-006-v1', 'eesim-zg-006', 1, 'verse', 'A toi Seigneur, je m''abandonne:
Ton regard amour et tendresse
Ma vie entière je te donne
Mes liens, mes rêves, mon passé.'),
('eesim-zg-006-v2', 'eesim-zg-006', 2, 'verse', 'Que puis-je te donner encore?
Les cieux, la terre sont à toi!
Un cœur qui t''aime et qui t''adore
Est plus que tout l''argent des rois.'),
('eesim-zg-006-v3', 'eesim-zg-006', 3, 'verse', 'Et si je t''aime, ô tendre Maître
Te suivre sans aucun détour,
A tous tes ordres me soumettre
Sera ma joie pour toujours.'),
('eesim-zg-006-v4', 'eesim-zg-006', 4, 'verse', 'Pour notre monde qui t''oublie,
Un monde pauvre en vrai bonheur,
Accepte, ô Christ, et multiplie
Le peu que vient t''offrir mon cœur.');

-- =====================================================
-- CANTIQUE 7: Alléluia Jésus est vivant
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-007', 'eesim-zogona', 7, 'Alléluia Jésus est vivant', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-007-c1', 'eesim-zg-007', 1, 'chorus', 'Alléluia, alléluia, alléluia.
Jésus est vivant (bis)'),
('eesim-zg-007-v1', 'eesim-zg-007', 2, 'verse', 'L''enfer fut détruit pour toujours,
Jésus a mis la mort sous ses pieds
Du combat de la vie
Il sortit vainqueur.'),
('eesim-zg-007-v2', 'eesim-zg-007', 3, 'verse', 'Le Diable rugira toujours,
Il nous créera des problèmes
Mais, il est impuissant
Car Christ est vivant');

-- =====================================================
-- CANTIQUE 8: Alléluia, Louez l'Eternel
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-008', 'eesim-zogona', 8, 'Alléluia, Louez l''Eternel', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-008-v1', 'eesim-zg-008', 1, 'verse', 'Alléluia, Louez l''Eternel
Car il est bon, car sa miséricorde
dure à toujours, dure à toujours, amen!
Dure à toujours, amen!'),
('eesim-zg-008-v2', 'eesim-zg-008', 2, 'verse', 'Non, pas à nous, Seigneur, pas à nous,
Mais à ton nom, à ton nom donne gloire,
Pour ton amour, pour ta fidélité,
Pour ta fidélité.'),
('eesim-zg-008-v3', 'eesim-zg-008', 3, 'verse', 'Oui, chaque jour, louons l''Eternel!
Il est pour nous le Dieu des délivrances,
Le Dieu puissant qui sauve de la mort,
Qui sauve de la mort.'),
('eesim-zg-008-v4', 'eesim-zg-008', 4, 'verse', 'Qu''un chant nouveau, joyeux monte au ciel
Vers notre Dieu, car sa parole est droite.
Il dit un mot, la chose s''accomplit.
La chose s''accomplit.'),
('eesim-zg-008-v5', 'eesim-zg-008', 5, 'verse', 'Ton trône, ô Dieu, subsiste à jamais.
Tu tiens en main le sceptre de justice.
Et moi, je dis: mon œuvre est pour le Roi,
Mon œuvre est pour le Roi.'),
('eesim-zg-008-v6', 'eesim-zg-008', 6, 'verse', 'Vous tous, venez, louez l''Eternel,
Vous ses enfants, vous toutes créatures,
Qui le servez sur terre et dans les cieux,
Sur terre et dans les cieux.');

-- =====================================================
-- CANTIQUE 9: Apportez à la maison du trésor (Mal 3:10-11)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-009', 'eesim-zogona', 9, 'Apportez à la maison du trésor', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-009-v1', 'eesim-zg-009', 1, 'verse', 'Apportez, oui, apportez
A la maison du trésor
Toutes les dîmes, les offrandes,
Afin qu''il y ait du pain.
Mettez-moi, oui, mettez-moi
De la sorte à l''épreuve,
Et vous verrez, vous verrez...
Dit l''Eternel des armées!'),
('eesim-zg-009-v2', 'eesim-zg-009', 2, 'verse', 'J''ouvrirai, oui, j''ouvrirai
Pour vous les écluses des cieux.
Je répandrai sur vous tous,
Mes bienfaits en abondance
Pour vous, je menacerai
Celui qui veut dévorer!
Il ne vous détruira pas
Les fruits de votre travail!');

-- =====================================================
-- CANTIQUE 10: Attaché à la croix
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-010', 'eesim-zogona', 10, 'Attaché à la croix', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-010-v1', 'eesim-zg-010', 1, 'verse', 'Quel Sauveur merveilleux je possède!
Il s''est sacrifié pour moi
Et, sa vie innocente, Il cède
Pour mourir sur l''infâme bois.'),
('eesim-zg-010-c1', 'eesim-zg-010', 2, 'chorus', 'Attaché à la croix pour moi, (bis)
Il a pris mon péché, Il m''a délivré,
Attaché à la croix pour moi'),
('eesim-zg-010-v2', 'eesim-zg-010', 3, 'verse', 'Il renonce à la gloire céleste
Pour le plan rédempteur de Dieu.
L''apparence est la plus modeste,
O quel prix pour me rendre heureux.'),
('eesim-zg-010-v3', 'eesim-zg-010', 4, 'verse', 'Maltraité, innocent, pour ma vie,
Pour mes iniquités, brisées,
Et chargé de mes maladies,
Il mourut pour guérir, sauver.'),
('eesim-zg-010-v4', 'eesim-zg-010', 5, 'verse', 'Le salut accompli pour ses frères,
Mon Sauveur se rendit au ciel,
Il revient! O profond mystère,
Mon bonheur sera éternel.');

-- =====================================================
-- CANTIQUE 11: Au-delà des montagnes
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-011', 'eesim-zogona', 11, 'Au-delà des montagnes', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-011-c1', 'eesim-zg-011', 1, 'chorus', 'Au-delà des montagnes,
Allez publier la nouvelle
Ce Sauveur merveilleux,
Jésus notre Maître
Est vraiment ressuscité!'),
('eesim-zg-011-v1', 'eesim-zg-011', 2, 'verse', 'Désormais, il faut vivre
L''aube d''un jour nouveau.
C''est lui qui nous délivre
De nos plus grands fardeaux, ô frères'),
('eesim-zg-011-v2', 'eesim-zg-011', 3, 'verse', 'Plus de craintes, de doutes,
Ce Sauveur merveilleux,
Chaque jour sur la route,
Nous rend victorieux, ô frères.'),
('eesim-zg-011-v3', 'eesim-zg-011', 4, 'verse', 'Maintenant dans la gloire,
Un jour, il reviendra,
Et fort de sa victoire,
Avec lui nous prendra, ô frères');

-- =====================================================
-- CANTIQUE 12: Au-delà des montagnes (Jésus est né)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-012', 'eesim-zogona', 12, 'Au-delà des montagnes (Jésus est né)', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-012-c1', 'eesim-zg-012', 1, 'chorus', 'Au-delà des montagnes,
Allez publier la nouvelle,
Au-delà des montagnes,
Proclamez Jésus est né.'),
('eesim-zg-012-v1', 'eesim-zg-012', 2, 'verse', 'Autrefois dans le doute,
Je cherchais nuit et jour,
Dieu m''a montré la route,
Je la suivrai toujours oh frères...'),
('eesim-zg-012-v2', 'eesim-zg-012', 3, 'verse', 'Autrefois dans le péché,
Je priais tous les jours,
Mais Dieu m''a pardonné
Je le louerai toujours, oh frères.'),
('eesim-zg-012-v3', 'eesim-zg-012', 4, 'verse', 'Je suis une sentinelle,
Surveillant la cité
Je dois veiller sur ma vie,
Car Dieu m''en a envoyé, oh frères.');

-- =====================================================
-- CANTIQUE 13: Avec des cris de joie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-013', 'eesim-zogona', 13, 'Avec des cris de joie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-013-c1', 'eesim-zg-013', 1, 'chorus', 'Avec des cris de joie
Ma bouche chantera,
J''élèverai mes mains
Et te célébrerai'),
('eesim-zg-013-v1', 'eesim-zg-013', 2, 'verse', 'Je connais le bonheur
A l''ombre de tes ailes.
Car tu es mon secours
Ta droite me soutient.'),
('eesim-zg-013-v2', 'eesim-zg-013', 3, 'verse', 'O Dieu, tu es mon Dieu,
Mon âme te recherche,
Et soupire après toi,
Sur ta terre aride.'),
('eesim-zg-013-v3', 'eesim-zg-013', 4, 'verse', 'Lorsque je pense à toi
Etendu sur ma couche,
Je médite sur toi,
Les veilles de la nuit.'),
('eesim-zg-013-v4', 'eesim-zg-013', 5, 'verse', 'J''aime te contempler,
Quand dans ton sanctuaire
Ta gloire resplendit,
Ta puissance se révèle');

-- =====================================================
-- CANTIQUE 14: Avec allégresse
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-014', 'eesim-zogona', 14, 'Avec allégresse', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-014-v1', 'eesim-zg-014', 1, 'verse', 'Avec allégresse
Marche vers le ciel
Regarder sans cesse
Notre Emmanuel.
Penser à la nouvelle,
Dans ces doux regards,
De l''âme fidèle,
C''est la plus belle part'),
('eesim-zg-014-v2', 'eesim-zg-014', 2, 'verse', 'Amis, bon courage!
L''étoile qui luit
Dissipe l''orage
Et la sombre nuit.
Veillons sur notre âme,
Jésus vient bientôt!
Lui seul nous réclame
Tous les cœurs en haut'),
('eesim-zg-014-c1', 'eesim-zg-014', 3, 'chorus', 'Frères, frères!
Les cœurs en haut!
Jésus vous appelle, (bis)
Il viendra bientôt.'),
('eesim-zg-014-v3', 'eesim-zg-014', 4, 'verse', 'Là tout est lumière,
Paix et sainteté,
Plus de deuil, de pleurs,
Tout est charité
Sur ces divins rivages
Jésus, ton amour
Est dans tous les cœurs'),
('eesim-zg-014-v4', 'eesim-zg-014', 5, 'verse', 'Les anges fidèles,
Les saints rachetés,
Troupes immortelles,
Disent tes bontés,
Jésus, Roi de gloire
Gage de Victoire,
Sauve le pécheur.');

-- =====================================================
-- CANTIQUE 15: Avec toi Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-015', 'eesim-zogona', 15, 'Avec toi Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-015-c1', 'eesim-zg-015', 1, 'chorus', 'Avec toi, Seigneur,
Nous serons vainqueurs,
Nous voici joyeux et
sûrs de ton amour.
Tu nous as appelés
dans la joie de ta présence,
Et c''est toi qui nous unis.'),
('eesim-zg-015-v1', 'eesim-zg-015', 2, 'verse', 'C''est toi qui nous unis,
Ton amour a fait de nous
Tu es vivant au milieu de nous!
Amen.'),
('eesim-zg-015-v2', 'eesim-zg-015', 3, 'verse', 'O Christ ressuscité,
Nous chantons la vie
Que tu nous donnes,
Tu es vivant au milieu de nous.'),
('eesim-zg-015-v3', 'eesim-zg-015', 4, 'verse', 'Tu donnes ton amour,
Ton Esprit fait vivre ton Eglise.
Tu es vivant au milieu de nous.');

-- =====================================================
-- CANTIQUE 16: Bénédictions
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-016', 'eesim-zogona', 16, 'Bénédictions', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-016-v1', 'eesim-zg-016', 1, 'verse', 'Voici, compagnons de notre voyage
Le moment de nous quitter,
Mais notre Seigneur avec nous reste
C''est Lui qui nous gardera!'),
('eesim-zg-016-c1', 'eesim-zg-016', 2, 'chorus', 'Alléluia, gloire à Dieu notre créateur!
Gloire à Jésus, notre Sauveur!
A l''Esprit-Saint qui habite en nos cœurs!
Alléluia, gloire au Seigneur!'),
('eesim-zg-016-v2', 'eesim-zg-016', 3, 'verse', 'Si nous étions seuls pour nous mettre en chemin,
Que seraient nos lendemains?
Mais notre Seigneur avec nous partira,
C''est lui qui nous soutiendra.'),
('eesim-zg-016-v3', 'eesim-zg-016', 4, 'verse', 'Que Notre Seigneur nous bénisse toujours
Et nous garde en son amour
Alors nous pourrons chaque jour demeurer
Vivre ensemble dans sa paix.');

-- =====================================================
-- CANTIQUE 17: Bientôt Jésus va nous prendre
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-017', 'eesim-zogona', 17, 'Bientôt Jésus va nous prendre', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-017-v1', 'eesim-zg-017', 1, 'verse', 'Bientôt Jésus va nous prendre
Auprès de lui dans le ciel;
Il nous a dit de l''attendre,
Jusqu''au jour de son appel.'),
('eesim-zg-017-c1', 'eesim-zg-017', 2, 'chorus', 'Nous aurons la victoire!
Nous vivrons avec Jésus dans le ciel!
A lui soit la gloire!
Oh! viens bientôt, Emmanuel!'),
('eesim-zg-017-v2', 'eesim-zg-017', 3, 'verse', 'Péchés, travaux et souffrance,
Cesseront pour toujours
Devant sa sainte présence,
Nous chanterons son amour.'),
('eesim-zg-017-v3', 'eesim-zg-017', 4, 'verse', 'Combattons avec courage,
Attendant ce jour heureux.
Et chantons dans l''orage,
Nous serons victorieux!');

-- =====================================================
-- CANTIQUE 18: Blanc plus blanc que la neige
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-018', 'eesim-zogona', 18, 'Blanc plus blanc que la neige', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-018-v1', 'eesim-zg-018', 1, 'verse', 'Jésus, par ton précieux sang,
Enlève mon iniquité.
Regarde-moi du haut des cieux,
Dis-moi que tu m''as pardonné.
J''ai longtemps erré, cœur rebelle.
Mais j''entends ta voix qui m''appelle
Au pied de la croix maintenant.
Tout confus, brisé, je me rends.'),
('eesim-zg-018-c1', 'eesim-zg-018', 2, 'chorus', 'Blanc, plus blanc que neige, (bis)
Lavé dans le sang de l''Agneau,
Je serai plus blanc que la neige.'),
('eesim-zg-018-v2', 'eesim-zg-018', 3, 'verse', 'Oh! le fardeau de mon péché,
Dieu très saint,
Je suis trop grand pour moi
Je suis par grâce délivré,
A cette heure, oh! réjouis-toi!
Seul tu peux calmer ma souffrance,
Toi seul peux m''offrir délivrance
Au pied de la croix maintenant.
Je me relève, triomphant!'),
('eesim-zg-018-v3', 'eesim-zg-018', 4, 'verse', 'Oh! Jésus, ton sang précieux
A lavé tous mes péchés,
Oui, tu m''as répondu des cieux,
Ton amour m''a tout pardonné,
Je le comprends et je puis croire
Qu''en toi j''ai complète victoire
Au pied de la croix maintenant,
Je me relève, triomphant!');

-- =====================================================
-- CANTIQUE 19: C'est encore jour de grâce
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-019', 'eesim-zogona', 19, 'C''est encore jour de grâce', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-019-v1', 'eesim-zg-019', 1, 'verse', 'C''est encore jour de grâce
Pour toi, pécheur endurci
Saisis l''instant qui passe
Pour venir au Sauveur.
Sur la croix du Calvaire,
Oh! Viens à lui mon frère
Pour être libre.'),
('eesim-zg-019-c1', 'eesim-zg-019', 2, 'chorus', 'Sa grâce incomparable
Voudrait t''ouvrir le ciel
Et donner au coupable
Le bonheur éternel,
Viens donc à l''amour suprême
De cet amour suprême
De Jésus, Roi des rois'),
('eesim-zg-019-v2', 'eesim-zg-019', 3, 'verse', 'Si l''ennemi te tente,
Oh! Ne l''écoute pas,
Refuse ses appels
Viens plein de confiance
Tu verras sa puissance
Régénérer ton cœur.'),
('eesim-zg-019-v3', 'eesim-zg-019', 4, 'verse', 'Notre vie est trop courte,
A la fin de cette vie,
Il te prendra la route
Qui marque son destin.
Prends le salut qu''il donne
Jésus pour la couronne.');

-- =====================================================
-- CANTIQUE 20: C'est mon corps
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-020', 'eesim-zogona', 20, 'C''est mon corps', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-020-v1', 'eesim-zg-020', 1, 'verse', 'Le Seigneur nous a aimés
Comme on n''a jamais aimé
Un enfant nous est donné
Dans cette ville de Bethléem
Les bergers l''ont reconnu
Et les mages sont venus
Ils ont vu le Fils de Dieu
Petit enfant.'),
('eesim-zg-020-c1', 'eesim-zg-020', 2, 'chorus', 'C''est mon corps
Prenez et mangez,
C''est mon sang
Prenez et buvez
Car Je Suis la vie
Et Je Suis l''amour
O Seigneur emporte moi
Dans ton séjour.'),
('eesim-zg-020-v2', 'eesim-zg-020', 3, 'verse', 'Le Seigneur nous a aimés
Comme on n''a jamais aimé
Pour les gens de son village,
C''est le fils du charpentier.
Il travaille de ses mains,
Comme l''ont fait tous ses voisins.
Il connaît le dur labeur
De son métier.'),
('eesim-zg-020-v3', 'eesim-zg-020', 4, 'verse', 'Le Seigneur nous a aimés
Comme on n''a jamais aimé
Aux travers et les années
Par les villes et les villages
Il révèle son amour clair,
Et nous parle de son père
Et nous fait retrouver espoir
En l''écoutant.'),
('eesim-zg-020-v4', 'eesim-zg-020', 5, 'verse', 'Le Seigneur nous a aimés
Comme on n''a jamais aimé
Son amour était si grand
Qu''il en mourut sur une croix
Son amour était si fort
Qu''il triompha de la mort
Il sortit de son tombeau
Libre et vainqueur.'),
('eesim-zg-020-v5', 'eesim-zg-020', 6, 'verse', 'Le Seigneur nous a aimés
Comme on n''a jamais aimé
Il rassemble tous ses gens
Les fait vivre de sa vie
Et tous les croyants du monde
Sont les membres de son corps
Rien ne peut les séparer
De son amour.');

-- =====================================================
-- CANTIQUE 21: C'est mon joyeux service
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-021', 'eesim-zogona', 21, 'C''est mon joyeux service', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-021-v1', 'eesim-zg-021', 1, 'verse', 'C''est mon joyeux service
D''offrir à Jésus-Christ,
En vivant sacrifices,
Mon corps et mon esprit.'),
('eesim-zg-021-c1', 'eesim-zg-021', 2, 'chorus', 'Accepte mon offrande,
Bien-aimé Fils de Dieu!
Et que sur moi descende
La flamme du saint lieu!');

-- =====================================================
-- CANTIQUE 22: C'est vers toi que je me tourne
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-022', 'eesim-zogona', 22, 'C''est vers toi que je me tourne', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-022-v1', 'eesim-zg-022', 1, 'verse', 'C''est vers toi que je me tourne,
Je veux marcher dans tes voies,
J''élève mes mains pour te rendre
Mon cœur désire te chanter,
Pour bénir et célébrer ton saint nom
Car tu es fidèle et bon.'),
('eesim-zg-022-c1', 'eesim-zg-022', 2, 'chorus', 'Seigneur, ô Seigneur,
Je veux te donner,
Seigneur, ô Seigneur
Ma vie à jamais.'),
('eesim-zg-022-v2', 'eesim-zg-022', 3, 'verse', 'Mes yeux contemplent ta gloire,
Ta vie anime ma foi.
La paix et la joie inondent mon cœur.
Toi seul fais tout mon bonheur.
Je veux proclamer
Qui chaque jour nous bénit.');

-- =====================================================
-- CANTIQUE 23: C'était un enfant malheureux
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-023', 'eesim-zogona', 23, 'C''était un enfant malheureux', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-023-v1', 'eesim-zg-023', 1, 'verse', 'C''était un enfant bien malheureux
Qui essayait de parler de ses parents
La vie pour lui était misère
Et souffrance n''a jamais
Il se demandait qui aimer et à qui se confier.'),
('eesim-zg-023-c1', 'eesim-zg-023', 2, 'chorus', 'Je lui parlais de Jésus Christ, qui aime
Et qui allège les fardeaux;
Il est le chemin la vérité et la vie éternelle.
Viens donc boire à sa source, mais il me dit:
Ce n''est qu''une histoire
L''histoire d''un homme (bis) qui n''a jamais aimé'),
('eesim-zg-023-v2', 'eesim-zg-023', 3, 'verse', 'Je l''ai vu un jour pleurer
Et dans cette amertume il me confia sa misère
Il était orphelin, tous ses parents
Etaient victimes de sa misère.
Il se demandait qui aimer. Et à qui se confier.');

-- =====================================================
-- CANTIQUE 24: C'est dans l'évangile
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-024', 'eesim-zogona', 24, 'C''est dans l''évangile', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-024-v1', 'eesim-zg-024', 1, 'verse', 'C''est dans l''Evangile qu''on trouve la vie
La paix, le pardon, le bonheur.
Ouvrons notre cœur à la grâce infinie
Donnant tant de biens aux pécheurs.'),
('eesim-zg-024-c1', 'eesim-zg-024', 2, 'chorus', 'Auprès du Seigneur avec lui sur la route
Marchons de tout cœur en chantant.
Il sauve, il guérit, et enlève le doute
Il vit, il est là maintenant.'),
('eesim-zg-024-v2', 'eesim-zg-024', 3, 'verse', 'Il monte en un endroit pour ôter la souillure,
Voilà c''est ici, Golgotha.
Un lieu de folie, un endroit de rupture,
Mais à la croix, le pardon est bien là.'),
('eesim-zg-024-v3', 'eesim-zg-024', 4, 'verse', 'Suivons le chemin qui plus loin nous entraîne
Au centre de la vérité,
Pendant que l''amour de Jésus nous enchaîne
Au règne de l''éternité.');

-- =====================================================
-- CANTIQUE 25: C'est la joie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-025', 'eesim-zogona', 25, 'C''est la joie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-025-c1', 'eesim-zg-025', 1, 'chorus', 'C''est la joie, c''est la joie, c''est la joie du ciel (bis)
Qui déborde de mon cœur Gloire à mon Sauveur!'),
('eesim-zg-025-v1', 'eesim-zg-025', 2, 'verse', 'Oh - la joie immense, infinie
De penser qu''on puisse sa vie
Voulez-vous venir,
Voir la recevoir en vous
Que vous la voulez-vous, aujourd''hui
La recevoir.');

-- =====================================================
-- CANTIQUE 26: Celui qui met en Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-026', 'eesim-zogona', 26, 'Celui qui met en Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-026-v1', 'eesim-zg-026', 1, 'verse', 'Celui qui met en Jésus
Une pleine confiance,
Jamais ne chancelle plus,
Complète est sa délivrance.'),
('eesim-zg-026-c1', 'eesim-zg-026', 2, 'chorus', 'Par la foi nous marcherons
Par la foi nous triomphons
Par la foi mon rédempteur
Me rendra plus que vainqueur!'),
('eesim-zg-026-v2', 'eesim-zg-026', 3, 'verse', 'Dans les jours d''adversité,
Quand on sent gronder l''orage,
Restant en sécurité
A Christ, je reprends courage!'),
('eesim-zg-026-v3', 'eesim-zg-026', 4, 'verse', 'Quand Satan veut te troubler,
Enlever ton espérance,
Ton passé te reprocher.
Que Christ soit ton assurance!'),
('eesim-zg-026-v4', 'eesim-zg-026', 5, 'verse', 'Par la foi je marcherai,
En comptant sur ses promesses.
Par lui je triompherai
En tout temps de mes détresses!');

-- =====================================================
-- CANTIQUE 27: Chantons du Sauveur la tendresse
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-027', 'eesim-zogona', 27, 'Chantons du Sauveur la tendresse', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-027-v1', 'eesim-zg-027', 1, 'verse', 'Chantons du Sauveur la tendresse
Sur la croix il est mort pour nous,
Il remplit nos cœurs d''allégresse,
Au ciel il nous invite tous.'),
('eesim-zg-027-c1', 'eesim-zg-027', 2, 'chorus', 'Je veux (oui, je veux) Chanter (mon Sauveur)
Je veux dire à tous mon bonheur,
Chantons (le Sauveur), bis
Chantons l''amour de Rédempteur!'),
('eesim-zg-027-v2', 'eesim-zg-027', 3, 'verse', 'Chantons du Sauveur la puissance,
C''est lui qui brisa nos liens,
Perdus, sans Dieu, sans espérance,
Il nous racheta, nous fit siens.'),
('eesim-zg-027-v3', 'eesim-zg-027', 4, 'verse', 'Chantons, remplis de confiance!
Chantons sans peur du lendemain,
En paix, gardés par sa puissance,
Conduits chaque jour par sa main'),
('eesim-zg-027-v4', 'eesim-zg-027', 5, 'verse', 'Chantons du Rédempteur la gloire!
Celui qui nous aime est le Roi!
Le Roi couronné de victoire,
A lui notre amour, notre foi!');

-- =====================================================
-- CANTIQUE 28: Chrétiens témoins de Christ
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-028', 'eesim-zogona', 28, 'Chrétiens témoins de Christ', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-028-v1', 'eesim-zg-028', 1, 'verse', 'Chrétiens, témoins de Christ
Ah, témoins de Christ
Témoins de Christ
Ah, ah, ah, témoins de Christ.
A notre Dieu.'),
('eesim-zg-028-v2', 'eesim-zg-028', 2, 'verse', 'Ami, l''heure a sonné
Ah, l''heure a sonné
Pour l''évangile
Ah ah ah, pour l''évangile.'),
('eesim-zg-028-v3', 'eesim-zg-028', 3, 'verse', 'Vouons tous nos talents
Ah, tous nos talents
A notre Dieu.
Ah, ah, ah, tous nos talents.');

-- =====================================================
-- CANTIQUE 29: Comme un petit enfant
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-029', 'eesim-zogona', 29, 'Comme un petit enfant', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-029-v1', 'eesim-zg-029', 1, 'verse', 'Comme un petit enfant qui découvre la vie,
Comme un petit oiseau qui sort de son nid,
Comme la fleur des champs, au printemps refleurit
Christ enfin, je te vois.'),
('eesim-zg-029-v2', 'eesim-zg-029', 2, 'verse', 'Sur ton chemin de douleur, souffrir et mourir pour moi,
J''ai vu couler ton sang les larmes sur la croix
Ô laisse ici les soupirs, et le son de ta voix
Qui me dit je t''aime plus que la vie.'),
('eesim-zg-029-v3', 'eesim-zg-029', 3, 'verse', 'Tu es là dans ma misère pour me montrer le chemin
Mes pas parmi les pierres, sont guidés par tes mains.
Chaque jour de ma prière je veux te louer sans fin.
Car tu es mon Seigneur.'),
('eesim-zg-029-v4', 'eesim-zg-029', 4, 'verse', 'Fait de tout homme ton frère. Tu verras comme c''est bon.
Tu répandras sur la terre l''espoir en son nom
Au travers de la prière très nombreux, ils viendront
Car j''ai mis, mon message en toi.');

-- =====================================================
-- CANTIQUE 30: Comme une terre altérée
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-030', 'eesim-zogona', 30, 'Comme une terre altérée', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-030-v1', 'eesim-zg-030', 1, 'verse', 'Comme une terre altérée
Soupire après l''eau du ciel,
Nous appelons la rosée
De ta grâce, Emmanuel!'),
('eesim-zg-030-c1', 'eesim-zg-030', 2, 'chorus', 'Fraîches rosées,
Descendez sur nous tous!
O divines ondées,
Venez, arrosez-nous!'),
('eesim-zg-030-v2', 'eesim-zg-030', 3, 'verse', 'Descends ô pluie abondante,
Coule à flots dans notre cœur,
Donne à l''âme languissante
Une nouvelle fraîcheur.'),
('eesim-zg-030-v3', 'eesim-zg-030', 4, 'verse', 'Ne laisse en nous rien d''aride
Qui ne soit pas fertilisé;
Que le cœur le plus avide
Soit pleinement arrosé'),
('eesim-zg-030-v4', 'eesim-zg-030', 5, 'verse', 'Oui, que les déserts fleurissent
Sous les bienfaisantes eaux,
Que les lieux secs reverdissent
Et portent des fruits nouveaux'),
('eesim-zg-030-v5', 'eesim-zg-030', 6, 'verse', 'Viens, ô salutaire pluie,
Esprit de grâce et de paix,
Répands en nous une vie
Qui ne tarisse jamais');

-- =====================================================
-- CANTIQUE 31: Compte les bienfaits de Dieu
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-031', 'eesim-zogona', 31, 'Compte les bienfaits de Dieu', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-031-v1', 'eesim-zg-031', 1, 'verse', 'Quand le vol de la tempête
Vient assombrir ton ciel bleu
Au lieu de baisser la tête.
Compte les bienfaits de Dieu.'),
('eesim-zg-031-c1', 'eesim-zg-031', 2, 'chorus', 'Compte les bienfaits de Dieu
Mets-les tous devant tes yeux,
Tu verras, en adorant,
Combien le nombre en est grand.'),
('eesim-zg-031-v2', 'eesim-zg-031', 3, 'verse', 'Quand sur la route glissante,
Tu crains de glisser
Pense à cette main puissante
Qui t''a fait tant de bienfaits.'),
('eesim-zg-031-v3', 'eesim-zg-031', 4, 'verse', 'Si tu perds dans l''adversité
Plus d''un cher et doux soutien
Pense au divin père
Qui là-haut te reste tien.'),
('eesim-zg-031-v4', 'eesim-zg-031', 5, 'verse', 'Bénis donc, bénis sans cesse
Ce Père qui chaque jour
Répand sur toi la richesse
De son merveilleux amour.');

-- =====================================================
-- CANTIQUE 32: Connais-tu de Dieu, le don
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-032', 'eesim-zogona', 32, 'Connais-tu de Dieu, le don', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-032-v1', 'eesim-zg-032', 1, 'verse', 'Connais-tu de Dieu, le don doux
De Jésus notre grand Sauveur?
Et le Saint-Esprit, et des glorieux,
C''est la vie et le bonheur'),
('eesim-zg-032-c1', 'eesim-zg-032', 2, 'chorus', 'Si tu savais comme il t''aime,
Sans tarder tu viendrais à lui,
Tu viendrais à l''heure même,
Tu viendrais dès aujourd''hui.'),
('eesim-zg-032-v2', 'eesim-zg-032', 3, 'verse', 'Connais-tu le prix du sang précieux
Qui coula sur le mont Calvaire?
Et de tes péchés, sans doute nombreux,
As-tu donc le pardon, mon frère?'),
('eesim-zg-032-v3', 'eesim-zg-032', 4, 'verse', 'Et de ton salut, es-tu bien certain
Que Jésus t''a sauvé par grâce?
Je m''en vais joyeux, le long du chemin,
Connaissant du sang l''efficace.'),
('eesim-zg-032-v4', 'eesim-zg-032', 5, 'verse', 'Si malade ton corps reste souffrant,
Crois à Jésus toujours le même;
Ce grand médecin, si compatissant,
Pour guérir jusqu''aux maux extrêmes.');

-- =====================================================
-- CANTIQUE 33: Connais-tu la bonne nouvelle?
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-033', 'eesim-zogona', 33, 'Connais-tu la bonne nouvelle?', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-033-v1', 'eesim-zg-033', 1, 'verse', 'Connais-tu dis-moi, la bonne nouvelle, (bis)
Pour nos péchés le grand sauveur,
Vint mourir comme un malfaiteur,
Vint mourir pour nos péchés, lui
Pour nos péchés, ce grand Sauveur
Vint mourir comme un malfaiteur.'),
('eesim-zg-033-c1', 'eesim-zg-033', 2, 'chorus', 'Connais-tu, dis-moi, la bonne nouvelle, (bis)
Qui la paix et le salut,
Reçois donc ce salut,
Reçois la paix et le salut.');

-- =====================================================
-- CANTIQUE 34: Connais-tu la bonne nouvelle? (Parfaite paix)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-034', 'eesim-zogona', 34, 'Parfaite paix', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-034-v1', 'eesim-zg-034', 1, 'verse', 'C''est le Christ venu régner sur la terre,
C''est le bonheur de l''heureuse rurale,
Il est devenu comme un enfant né d''une mère,
Pour demeurer dans son intimité.'),
('eesim-zg-034-c1', 'eesim-zg-034', 2, 'chorus', 'Parfaite paix. Repos si doux
Don précieux de mon céleste époux
Je suis à lui, il est à moi
Mon bien-aimé, mon Sauveur et mon Roi'),
('eesim-zg-034-v2', 'eesim-zg-034', 3, 'verse', 'J''ai pris plaisir à m''asseoir à son ombre
Près de sa croix, je goûte chaque jour
Les fruits exquis de ses bontés sans nombre
Et sa bannière sur moi, c''est l''amour.'),
('eesim-zg-034-v3', 'eesim-zg-034', 4, 'verse', 'Par ses attraits, le monde en vain me tente
De mon Sauveur, voulant me détacher,
Mais je le fuis, car mon âme fervente
Reste fidèle à son divin berger.');

-- =====================================================
-- CANTIQUE 35: Dans ce monde dépravé
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-035', 'eesim-zogona', 35, 'Dans ce monde dépravé', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-035-v1', 'eesim-zg-035', 1, 'verse', 'Dans ce monde dépravé c''est la dernière heure,
Dans ce monde dépravé il viendra des antéchrists
Car ils sont déjà parmi nous,
Mais soyez donc toujours prêts
Car votre Christ revient'),
('eesim-zg-035-v2', 'eesim-zg-035', 2, 'verse', 'Certains de ces hommes diront là-haut
Seigneur j''ai ressuscité des morts et en ton nom
Et d''autres diront Seigneur, Sauveur
J''ai guéri des malades Seigneur en ton nom
Mais que sera la réponse de Jésus'),
('eesim-zg-035-v3', 'eesim-zg-035', 3, 'verse', 'Allez loin d''ici je ne vous connais pas
Car vous êtes des pécheurs et des criminels
J''ai donné dîme tous les dimanches
Et j''ai donné l''argent à presque tous les pauvres
Allez loin d''ici je ne vous connais pas
Car vous êtes des pécheurs et des criminels.');

-- =====================================================
-- CANTIQUE 36: Dans le silence de la nuit
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-036', 'eesim-zogona', 36, 'Dans le silence de la nuit', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-036-v1', 'eesim-zg-036', 1, 'verse', 'Dans le silence de la nuit
Approchons de l''hôtellerie
L''enfant auprès de Marie,
Entrons sans bruit. (bis)'),
('eesim-zg-036-v2', 'eesim-zg-036', 2, 'verse', 'Aux lueurs d''un pâle flambeau.
Contemplons le petit enfant
Dans son humilité profonde.
Comme il est beau! (bis)'),
('eesim-zg-036-v3', 'eesim-zg-036', 3, 'verse', 'Hélas! ce doux enfant qui dort
Sera l''Agneau du sacrifice!
Si vous saviez par quel supplice
Et quelle mort! (bis)'),
('eesim-zg-036-v4', 'eesim-zg-036', 4, 'verse', 'Mages, bergers, accourez tous.
Et vous, peuples de toute race!
Par cet enfant Dieu vous fait grâce
Tous à genoux! (bis)'),
('eesim-zg-036-v5', 'eesim-zg-036', 5, 'verse', 'Le ciel lui-même est étonné!
Qu''un si grand amour se révèle!
Portons-en partout la nouvelle!
Jésus est né! (bis)');

-- =====================================================
-- CANTIQUE 37: Dans les champs
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-037', 'eesim-zogona', 37, 'Dans les champs', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-037-v1', 'eesim-zg-037', 1, 'verse', 'Dans les champs le berger veille
Aux premiers rayons du matin
Quand la brise à son oreille
Apporte un chant lointain, lointain,
L''appelle qui tout rayon
D''une splendeur sans seconde,
Pour révéler le mystère au monde
Du fond de l''immensité.'),
('eesim-zg-037-c1', 'eesim-zg-037', 2, 'chorus', 'Gloire à Dieu
Gloire à Dieu dans les hauts cieux!
Paix aux hommes, en tous lieux!
Pour cet enfant dans ses langes
Pour ce don si précieux,
Chantons tous, comme les anges,
Gloire à Dieu dans les hauts cieux!'),
('eesim-zg-037-v2', 'eesim-zg-037', 3, 'verse', 'Bergers, pourrez-vous comprendre
L''amour de Dieu tout-puissant,
Qui nous donna avec tendresse,
L''offrir qu''un faible enfant;
Un enfant qui dès souffrance,
Sauvant péchés du berceau;
Oui marchera sans défense
Vers la croix et le tombeau.');

-- =====================================================
-- CANTIQUE 38: Dans les cieux et sur la terre
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-038', 'eesim-zogona', 38, 'Dans les cieux et sur la terre', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-038-v1', 'eesim-zg-038', 1, 'verse', 'Dans les cieux et sur la terre
Il n''est aucun nom plus doux,
Aucun que mon cœur préfère
Au nom de Christ mort pour nous'),
('eesim-zg-038-c1', 'eesim-zg-038', 2, 'chorus', 'Quel beau nom! (bis)
Porte l''Oint de l''Eternel;
Quel beau nom! (bis)
que celui d''Emmanuel!'),
('eesim-zg-038-v2', 'eesim-zg-038', 3, 'verse', 'De quelque grand que soit un homme,
De quelque nom qu''on le nomme,
Qu''il soit prince ou qu''il soit roi,
Jésus est plus grand pour moi.');

-- =====================================================
-- CANTIQUE 39: Dans son amour
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-039', 'eesim-zogona', 39, 'Dans son amour', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-039-v1', 'eesim-zg-039', 1, 'verse', 'Dans son amour chaque heure de chaque jour
Jésus mon Sauveur veille sur moi'),
('eesim-zg-039-c1', 'eesim-zg-039', 2, 'chorus', 'Tique, tique-tac, tic tac
Tique-tique-tac, cou cou
Tique-tique-tique tique-tac (bis)'),
('eesim-zg-039-v2', 'eesim-zg-039', 3, 'verse', 'Quand je m''endors tout au long de la nuit
Jésus mon Sauveur veille sur moi (bis)'),
('eesim-zg-039-v3', 'eesim-zg-039', 4, 'verse', 'Quand je travaille tout au long de ce jour
Jésus mon Sauveur veille sur moi (bis)'),
('eesim-zg-039-v4', 'eesim-zg-039', 5, 'verse', 'Quand je m''éveille tôt à la fin du jour
Jésus mon Sauveur veille sur moi (bis)');

-- =====================================================
-- CANTIQUE 40: Debout jeunesse
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-040', 'eesim-zogona', 40, 'Debout jeunesse', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-040-v1', 'eesim-zg-040', 1, 'verse', 'Debout, jeunesse, lève-toi
Courageuse et vaillante
Accours à l''ordre de Jésus
L''âme heureuse et croyante!'),
('eesim-zg-040-c1', 'eesim-zg-040', 2, 'chorus', 'Il vit, il vit, il vit
Jésus est, ton Rédempteur vit!
Il vit, oui, ton rédempteur vit!'),
('eesim-zg-040-v2', 'eesim-zg-040', 3, 'verse', 'Si l''on te dit: Jeunesse, il faut
Jouir du temps qui passe
Non, rien n''est grand ni rien ne vaut,
La route que Dieu trace.'),
('eesim-zg-040-v3', 'eesim-zg-040', 4, 'verse', 'Dans notre monde en désarroi
Songe à ceux de ton âge
Jeunesse en a besoin de toi
Et de ton témoignage.'),
('eesim-zg-040-v4', 'eesim-zg-040', 5, 'verse', 'Garde en ton cœur un idéal! D''amour et de service
Pour arrêter le flot du mal, Sois prêt au sacrifice');

-- =====================================================
-- CANTIQUE 41: Debout sainte cohorte
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-041', 'eesim-zogona', 41, 'Debout sainte cohorte', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-041-v1', 'eesim-zg-041', 1, 'verse', 'Debout, sainte cohorte,
Soldats du Roi des rois!
Tenez d''une main forte
L''étendard de la croix!
Au sentier de la gloire
Jésus-Christ nous conduit,
De victoire en victoire
Il mène qui le suit.'),
('eesim-zg-041-c1', 'eesim-zg-041', 2, 'chorus', 'La trompette résonne;
Debout, vaillants soldats!
L''immortelle couronne
Est le prix des combats.
Si l''ennemi fait rage,
Soyez fermes et forts,
Redoublez de courage,
S''il redouble d''efforts'),
('eesim-zg-041-v2', 'eesim-zg-041', 3, 'verse', 'Debout pour la bataille,
Partez, n''hésitez pas!
Dieu lui-même vous taille
Regardez à Jésus!
Bientôt, près du rivage
Soldats, réveilles-vous!
Le triomphe est pour vous pour la gloire éternelle.'),
('eesim-zg-041-v3', 'eesim-zg-041', 4, 'verse', 'Debout, debout encore!
Luttez jusqu''au matin;
Déjà brille l''aurore
A l''horizon lointain.
Bientôt jetant nos armes
Aux pieds du Roi des rois!
Les chants après les larmes,
Le trône après la croix!');

-- =====================================================
-- CANTIQUE 42: Dieu créa l'homme
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-042', 'eesim-zogona', 42, 'Dieu créa l''homme', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-042-v1', 'eesim-zg-042', 1, 'verse', 'Dieu créa l''homme dans le jardin d''Eden (bis)
Il était seul dans l''Eden
Dieu par un personne
Pauvre Adam
Dieu lui proposa une aide éternelle
Dieu le fit tomber dans le sommeil
Il lui prit une cote dupe dans sa chair'),
('eesim-zg-042-v2', 'eesim-zg-042', 2, 'verse', 'Voila Eve. voilà Eve
Elle vient pour t''aider dans la tache dure (bis)
C''est ta compagne éternelle
Qui t''adera bien dans toutes tes peines
Par l''ordre de Dieu le créateur'),
('eesim-zg-042-v3', 'eesim-zg-042', 3, 'verse', 'Vivez en paix sur cette terre
Nous le promettons, le promettons, le promettons bien
Nous le promettons, nous le promettons,
Mais voici le serpent malin');

-- =====================================================
-- CANTIQUE 43: Dieu tout puissant
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-043', 'eesim-zogona', 43, 'Dieu tout puissant', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-043-v1', 'eesim-zg-043', 1, 'verse', 'Dieu tout-puissant quand mon cœur considère
Tout l''univers créé par ton pouvoir,
Le ciel d''azur, les éclairs, le tonnerre
Le clair matin ou les ombres du soir
De tout mon être jaillit en chant:
"Dieu tout puissant que tu es grand!" (bis)'),
('eesim-zg-043-v2', 'eesim-zg-043', 2, 'verse', 'Quand par les bois, où la forêt profonde,
J''erre et j''entends tous les oiseaux chanter;
Quand, sur les monts, la source avec son onde
Livre au zéphyr son chant claire et doré,
Mon cœur heureux, s''écrie à chaque instant:
"O Dieu d''amour, que tu es grand!"'),
('eesim-zg-043-v3', 'eesim-zg-043', 3, 'verse', 'Mais quand je songe, ô sublime mystère!
Que son Dieu le grand a pu penser à moi;
Que son cher Fils est devenu mon frère
Et qu''il mourut, victime sur du grand Roi,
De je suis seul saisi, le jour, la nuit, le jour:
"Que Tu es bon, ô Dieu d''amour!"'),
('eesim-zg-043-v4', 'eesim-zg-043', 4, 'verse', 'Quand mon sauveur, éclatant de lumière
Se lèvera de son trône là-haut du la terre
Je m''en irai vers les sphères divines au ciel,
"Rien n''est plus grand que ton amour" (bis)');

-- =====================================================
-- CANTIQUE 44: Divin sauveur toi qui vins sur la terre
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-044', 'eesim-zogona', 44, 'Divin sauveur toi qui vins sur la terre', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-044-v1', 'eesim-zg-044', 1, 'verse', 'Divin sauveur toi qui vins sur la terre
Pour y souffrir sur un infâme bois
Le cœur divin, j''apprécie du Calvaire,
Que ton Esprit m''enseigne ta Calvaire.'),
('eesim-zg-044-c1', 'eesim-zg-044', 2, 'chorus', 'Ta grâce infinie
Vaut mieux que la vie;
Mon cœur s''attache à toi,
Pour toujours avec foi!');

-- =====================================================
-- CANTIQUE 45: Ecoutez l'appel du Berger
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-045', 'eesim-zogona', 45, 'Ecoutez l''appel du Berger', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-045-v1', 'eesim-zg-045', 1, 'verse', 'Ecoutez l''appel du berger!
Il sait ses brebis en danger;
Il les appelle avec amour,
Espérant toujours leur retour.'),
('eesim-zg-045-c1', 'eesim-zg-045', 2, 'chorus', 'Cherchons-les! Cherchons-les!
Ne voulons-nous pas aller
Dire à tous ceux qui soit perdu
Que nous les vouons pour Jésus!'),
('eesim-zg-045-v2', 'eesim-zg-045', 3, 'verse', 'Mourant de froid, de soif, de faim,
Les brebis appellent en vain
Jésus pour les aider à se lever
Ne peut-il compter sur nous?'),
('eesim-zg-045-v3', 'eesim-zg-045', 4, 'verse', 'L''Eternel est près de ceux qui ont le cœur brisé
Et il sauve ceux qui ont un esprit abattu
Et quand les justes crient! L''Eternel les entend
Ceux qui ont pour refuge échappent au châtiment');

-- =====================================================
-- CANTIQUE 46: En mon cœur j'ai choisi
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-046', 'eesim-zogona', 46, 'En mon cœur j''ai choisi', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-046-v1', 'eesim-zg-046', 1, 'verse', 'En mon cœur j''ai choisi
De suivre Jésus-Christ (ter)
Oui pour toujours. (bis)'),
('eesim-zg-046-v2', 'eesim-zg-046', 2, 'verse', 'Si les amis s''en vont,
Qu''importe moi, j''irai!
Si mes amis s''en vont,
Qu''importe? j''irai!
Si mes amis s''en vont,
Qu''importe? moi, j''irai!
Oui pour toujours. (bis)'),
('eesim-zg-046-v3', 'eesim-zg-046', 3, 'verse', 'Au monde je dis "non"
Joyeux je prends ma croix.
Au monde je dis "non"
Joyeux je prends ma croix.
J''accepte. Je dis "oui"
Joyeux je prends ma croix.
Oui, pour toujours (bis)'),
('eesim-zg-046-v4', 'eesim-zg-046', 4, 'verse', 'Aujourd''hui, c''est le jour de grâce;
Ne compte pas sur demain.
Pendant que ton Sauveur passe, Saisis sa puissante main!');

-- =====================================================
-- CANTIQUE 47: En toi Seigneur les promesses
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-047', 'eesim-zogona', 47, 'En toi Seigneur les promesses', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-047-v1', 'eesim-zg-047', 1, 'verse', 'En toi, Seigneur les promesses
Que tu scellas de ton sang,
Sont pour nous, dans nos détresses
Le recours tout-puissant.'),
('eesim-zg-047-c1', 'eesim-zg-047', 2, 'chorus', 'Que les montagnes s''abaissent,
Que les cieux disparaissent,
Nous avons tes promesses,
Certaines en tout point'),
('eesim-zg-047-v2', 'eesim-zg-047', 3, 'verse', 'Confiant en la promesse
Abraham, l''homme de Dieu
Vers Morija sans faiblesse,
A marché, courageux.'),
('eesim-zg-047-v3', 'eesim-zg-047', 4, 'verse', 'Bien souvent dans le sentier
Notre chemin semble changer
Se change en cri de détresse'),
('eesim-zg-047-v4', 'eesim-zg-047', 5, 'verse', 'Persécuté par le monde
Mis à l''épreuve du feu,
Sur ton Dieu, seul se fonde
Sera victorieux'),
('eesim-zg-047-v5', 'eesim-zg-047', 6, 'verse', 'Si les humains t''abandonnent,
Crois en ton meilleur ami,
Crois en son amour t''environne,
Comme il te l''a promis');

-- =====================================================
-- CANTIQUE 48: Entends-tu? Jésus t'appelle
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-048', 'eesim-zogona', 48, 'Entends-tu? Jésus t''appelle', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-048-v1', 'eesim-zg-048', 1, 'verse', 'Entends-tu? Jésus t''appelle
Viens, ô pécheur il t''attend...
A cette voix si fidèle
Tu résistes trop souvent.'),
('eesim-zg-048-c1', 'eesim-zg-048', 2, 'chorus', 'Laisse entrer le Roi de gloire;
Ouvre ton cœur à Jésus,
Laisse entrer le Roi de gloire,
Hâte-toi ne tarde plus.'),
('eesim-zg-048-v2', 'eesim-zg-048', 3, 'verse', 'Pour le péché, pour le monde,
Jésus frappe, il frappe encore
Ouvre à ton Libérateur.
Il pour toi l''amour abonde
Du véritable bonheur!'),
('eesim-zg-048-v3', 'eesim-zg-048', 4, 'verse', 'Jésus frappe, il frappe encore
Ouvre à ton Libérateur.
Dès maintenant de son cœur
Qu''il illumine et colore.');

-- =====================================================
-- CANTIQUE 49: Entre tes mains j'abandonne
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-049', 'eesim-zogona', 49, 'Entre tes mains j''abandonne', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-049-v1', 'eesim-zg-049', 1, 'verse', 'Je n''ai plus peur de suivre
Sur le chemin de la croix,
C''est toi seul que je veux,
Je connais, j''y parviens,
Seigneur prends tout, Seigneur! (bis)
Sans rien garder, de le livre
Tout avec bonheur.'),
('eesim-zg-049-v2', 'eesim-zg-049', 2, 'verse', 'Je connais nuitée que moi-
Le pour mon bonheur suprême,
Tu veux me sauver de moi.
Oh! prends tout, Seigneur! (bis)
Prends mon corps et prends mon âme'),
('eesim-zg-049-v3', 'eesim-zg-049', 3, 'verse', 'Tous les besoins de mon cœur,
Le pour mon bonheur suprême,
Tu veux me sauver de moi.
Oh! prends tout, Seigneur! (bis)
Je ne vis plus pour moi-même.'),
('eesim-zg-049-v4', 'eesim-zg-049', 4, 'verse', 'Prends mon corps et prends mon
Que rien de mon soit à toi.
Que la divine flamme
Tout mal détruit par toi.
Oh! prends, tout, Seigneur! (bis)
Prends mon corps et prends mon
Règne sur mon cœur.');

-- =====================================================
-- CANTIQUE 50: Es-tu prêt
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-050', 'eesim-zogona', 50, 'Es-tu prêt', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-050-v1', 'eesim-zg-050', 1, 'verse', 'Bientôt le Seigneur va venir!
Bientôt le ciel il va t''ouvrir!
Es-tu prêt?
Es-tu prêt pour l''éternité?
Es-tu prêt?'),
('eesim-zg-050-c1', 'eesim-zg-050', 2, 'chorus', 'Es-tu prêt? (bis)
Es-tu prêt pour l''éternité?
Es-tu prêt?
Le Sauveur t''a-t-il racheté?
Es-tu prêt?'),
('eesim-zg-050-v2', 'eesim-zg-050', 3, 'verse', 'Bientôt l''appel retentira!
Bientôt la mort te surprendra!
Es-tu prêt?
Oh! devras-tu le condamner.
Es-tu prêt?'),
('eesim-zg-050-v3', 'eesim-zg-050', 4, 'verse', 'Bientôt Jésus va te juger!
Es-tu prêt?'),
('eesim-zg-050-v4', 'eesim-zg-050', 5, 'verse', 'Bientôt dans le ciel enlevés!
Es-tu prêt?
Tous les élus seront sauvés.
Es-tu prêt?');

-- =====================================================
-- CANTIQUE 51: Eveinou shalom alerem
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-051', 'eesim-zogona', 51, 'Eveinou shalom alerem', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-051-c1', 'eesim-zg-051', 1, 'chorus', 'Evenou shalom Alérem (ter)
Shalom, shalom, shalom Alérem'),
('eesim-zg-051-v1', 'eesim-zg-051', 2, 'verse', 'Nous vous annonçons la joie (ter)
La joie en Jésus.'),
('eesim-zg-051-v2', 'eesim-zg-051', 3, 'verse', 'Nous vous annonçons la paix,
La paix en Jésus.'),
('eesim-zg-051-v3', 'eesim-zg-051', 4, 'verse', 'Nous vous annonçons l''amour,
L''amour en Jésus.');

-- =====================================================
-- CANTIQUE 52: Grand Dieu nous te bénissons
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-052', 'eesim-zogona', 52, 'Grand Dieu nous te bénissons', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-052-v1', 'eesim-zg-052', 1, 'verse', 'Grand Dieu nous te bénissons
Nous célébrons tes louanges!
Les trônes et les puissances,
Toutes les vertus des cieux,
Disent tes magnificences,
Proclament dans leurs concerts:
Le grand Dieu de l''Univers. (bis)'),
('eesim-zg-052-v2', 'eesim-zg-052', 2, 'verse', 'Les saints et les bienheureux,
Les trônes et les puissances,
De concert avec les anges,
Nous t''adorons, ô grand Roi! (bis)'),
('eesim-zg-052-v3', 'eesim-zg-052', 3, 'verse', 'Saint, saint, saint, est l''Eternel,
Le Seigneur, Dieu des armées;
Son pouvoir est immortel;
Ses œuvres partout semées
Font éclater sa grandeur,
Sa majesté, sa splendeur, (bis)
Jusqu''au céleste séjour!'),
('eesim-zg-052-v4', 'eesim-zg-052', 4, 'verse', 'Sauve ton peuple Seigneur,
Et bénis ton héritage
Que ta gloire et ta splendeur
Soient à jamais son partage
Conduis-le par ton amour!
Jusqu''au céleste séjour! (bis)'),
('eesim-zg-052-v5', 'eesim-zg-052', 5, 'verse', 'Sauve ton peuple Seigneur,
Et bénis ton héritage
Que ta gloire et ta splendeur
Conduis-le par ton amour!
Jusqu''au céleste séjour! (bis)'),
('eesim-zg-052-v6', 'eesim-zg-052', 6, 'verse', 'Gloire soit au Saint-Esprit!
Gloire soit à Dieu le Père!
Gloire soit à Jésus-Christ,
Notre Sauveur, notre Frère!
Son immense charité
Dure à perpétuité (bis)');

-- =====================================================
-- CANTIQUE 53: Il est beau de louer le Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-053', 'eesim-zogona', 53, 'Il est beau de louer le Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-053-v1', 'eesim-zg-053', 1, 'verse', 'Il est beau de louer le Seigneur!
Il est beau de chanter en l''honneur de ton nom!
D''annoncer au matin la fidélité,
D''annoncer les nuits ta fidélité.'),
('eesim-zg-053-v2', 'eesim-zg-053', 2, 'verse', 'Tu me réjouis par tes œuvres, ô Eternel!
Et je chante avec l''ouvrage de tes mains.
Que tes œuvres sont grandes ô Eternel.
Que tes pensées sont profondes!'),
('eesim-zg-053-c1', 'eesim-zg-053', 3, 'chorus', 'Il est beau, il est beau (hommes, femmes)
De louer, de louer le Seigneur, le Seigneur!
Il est beau,
(Tous:) De chanter en l''honneur de ton nom!
D''annoncer au matin ta bonté.');

-- =====================================================
-- CANTIQUE 54: Il est né le Roi du monde
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-054', 'eesim-zogona', 54, 'Il est né le Roi du monde', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-054-v1', 'eesim-zg-054', 1, 'verse', 'Il est le Roi du monde
Il est né, le Libérateur!
Que la terre au ciel réponde
D''une voix, d''un même cœur.'),
('eesim-zg-054-c1', 'eesim-zg-054', 2, 'chorus', 'Dans l''étable misérable,
Contemplez ce nouveau-né
Dieu lui-même s''est penché.
A la terre, ô mystère!'),
('eesim-zg-054-v2', 'eesim-zg-054', 3, 'verse', 'A ses pieds, Roi sans couronne,
Jésus, courbons nos fronts!
La crèche est son trône,
C''est là que nous l''adorons. Ch'),
('eesim-zg-054-v3', 'eesim-zg-054', 4, 'verse', 'En notre âme vient renaître,
O Christ, elle a soif de toi!
Elle veut t''avoir pour maître
Humble enfant, glorieux Roi! Ch R. S');

-- =====================================================
-- CANTIQUE 55: Il est un roc séculaire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-055', 'eesim-zogona', 55, 'Il est un roc séculaire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-055-v1', 'eesim-zg-055', 1, 'verse', 'Il est un roc séculaire,
Que Dieu, pour mon cœur lassé
Comme un abri tutélaire
Au sein des flots a placé.'),
('eesim-zg-055-c1', 'eesim-zg-055', 2, 'chorus', 'Mon rocher, ma forteresse,
Mon asile Protecteur,
Mon recours dans la détresse
C''est Jésus, le Rédempteur!'),
('eesim-zg-055-v2', 'eesim-zg-055', 3, 'verse', 'A mes pieds l''océan gronde,
Le vent siffle autour de moi
Sur Christ, mon rocher, je fonde
Mon espérance et ma foi.
Mon rocher, etc.'),
('eesim-zg-055-v3', 'eesim-zg-055', 4, 'verse', 'En vain rugit la tempête,
Il sait calmer ses fureurs
J''attends sur le roc un être
Et le rocher c''est mon Sauveur,
Qu''il protège et qu''il abrite
Mon rocher, etc.'),
('eesim-zg-055-v4', 'eesim-zg-055', 5, 'verse', 'Jésus nous appelle,
Venez nous nous a dit voix
C''est abri! il peut comprendre
Tous ceux qui s''approchent
Qu''il protège et qu''il abrite
Mon rocher, etc.'),
('eesim-zg-055-v5', 'eesim-zg-055', 6, 'verse', 'Notre guerre est sainte,
Notre arme est la croix,
Contemplons des Rois.
Arrachons aux Fers.
Pour sauver leurs âmes,
O Christ! Tu mourras!
Mon rocher, etc.');

-- =====================================================
-- CANTIQUE 56: Il est vivant
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-056', 'eesim-zogona', 56, 'Il est vivant', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-056-v1', 'eesim-zg-056', 1, 'verse', 'Seigneur Jésus, il est vivant
Alléluia!'),
('eesim-zg-056-c1', 'eesim-zg-056', 2, 'chorus', 'Alléluia
La croix est devant moi
Je ne peux plus jamais retourner
Alléluia! Alléluia!
Alléluia!'),
('eesim-zg-056-v2', 'eesim-zg-056', 3, 'verse', 'Il n''a aime
Seigneur Jésus, il m''a aime
Alléluia!'),
('eesim-zg-056-v3', 'eesim-zg-056', 4, 'verse', 'Il m''a lavé
Seigneur Jésus, il m''a lavé
Alléluia!'),
('eesim-zg-056-v4', 'eesim-zg-056', 5, 'verse', 'Il m''a béni
Seigneur Jésus, il m''a béni
Alléluia!'),
('eesim-zg-056-v5', 'eesim-zg-056', 6, 'verse', 'Il m''a gardé
Seigneur Jésus, il m''a gardé
Alléluia!'),
('eesim-zg-056-v6', 'eesim-zg-056', 7, 'verse', 'Il est présent
Seigneur Jésus, il est présent
Alléluia!');

-- =====================================================
-- CANTIQUE 57: Il faut pour te suivre
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-057', 'eesim-zogona', 57, 'Il faut pour te suivre', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-057-v1', 'eesim-zg-057', 1, 'verse', 'Il faut pour te suivre,
Tout perdre d''abord.
On ne peut revivre
Qu''en passant la mort.
Bien-aimé du Père,
Tu mourras pour moi;
Je veux au Calvaire,
Mourir avec Toi'),
('eesim-zg-057-v2', 'eesim-zg-057', 2, 'verse', 'Mourir à moi-même,
N''être pas compris,
Et de ceux que j''aime
Souffrir le mépris,
Christ,
Sans regret, sans haine,
Renoncer à tout,
Et l''âme sereine,
Tenir jusqu''au bout.'),
('eesim-zg-057-v3', 'eesim-zg-057', 3, 'verse', 'Il faut quitter chaque ce qu''on
Savoir être mal jugé.
Dans la mort, par la foi
Jésus, Roi des rois, etc.');

-- =====================================================
-- CANTIQUE 58: Il naît et dans les cieux
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-058', 'eesim-zogona', 58, 'Il naît et dans les cieux', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-058-v1', 'eesim-zg-058', 1, 'verse', 'Il naît et dans les cieux
Sur son berceau
Un rayon de lumière
Le ciel s''ouvrit et comme éternel (bis)
L''ineffable apparition!
Dans mon panier les cieux
Contemplant son message beau
Comme il est beau!'),
('eesim-zg-058-c1', 'eesim-zg-058', 2, 'chorus', 'Rompu, monde perdu A l''espérance,
Car l''homme attendait la délivrance,
Car l''homme d''un n''a plus d''ennemi. (bis)
Noël est offert d''un enfant même nouveau.'),
('eesim-zg-058-v2', 'eesim-zg-058', 3, 'verse', 'Quand tout méconnaissant La grâce immense
Nous refusons Dieu l''amour éternel (bis)
Qui nous donne un Sauveur et nous ouvre le ciel!
Alléluia, Amen!  R. S');

-- =====================================================
-- CANTIQUE 59: Ils étaient 120 fidèles
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-059', 'eesim-zogona', 59, 'Ils étaient 120 fidèles', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-059-v1', 'eesim-zg-059', 1, 'verse', 'Ils étaient cent vingt fidèles
Le feu descendit,
Tous d''un même accord,
En langues de Pentecôte,
Persévérant avec zèle,
Gages de l''Esprit. (ch.)
Priant le Dieu fort.'),
('eesim-zg-059-c1', 'eesim-zg-059', 2, 'chorus', 'Seigneur, doux Maître,
C''est toi qui remplis mon être,
Aujourd''hui remplis ton être,
De ton Saint-Esprit.'),
('eesim-zg-059-v2', 'eesim-zg-059', 3, 'verse', 'Soudain dans la chambre haute
D''un nouveau zèle,
Ils vont proclamer,
Les splendeurs surmontées
Du Ressuscité.');

-- =====================================================
-- CANTIQUE 60: Ils ont mis le maître sur la croix
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-060', 'eesim-zogona', 60, 'Ils ont mis le maître sur la croix', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-060-v1', 'eesim-zg-060', 1, 'verse', 'Ils ont mis le maître sur la croix
Ils ont mis le maître sur la croix'),
('eesim-zg-060-c1', 'eesim-zg-060', 2, 'chorus', 'Oh! c''est ma faute. C''est toi qui
Il est coupé. Oh! c''est ma faute.
Qu''est-ce que Jésus-Christ m''envoie
Que Jésus me soutient.
Oh bonheur de le servir!
La Bible me le dit'),
('eesim-zg-060-v2', 'eesim-zg-060', 3, 'verse', 'Ils ont mis des épines à son front
Et des clous à ses poings, ses talons'),
('eesim-zg-060-v3', 'eesim-zg-060', 4, 'verse', 'A quoi bon ces trois années d''espoir
Ils l''ont mis au fond d''un grand trou noir'),
('eesim-zg-060-v4', 'eesim-zg-060', 5, 'verse', 'Aux heures de la nuit
Dans la tombe, on est heureux de vivre
Fou chacune aux tout semblent doux
Agneau de Dieu, qui veulent la terre
A la croix sanglante, pour l''amour
C''est pourquoi j''aime le Seigneur Jésus!
Jusqu''à la mort! etc.');

-- =====================================================
-- CANTIQUE 61: J'ai choisi de suivre Jésus Christ
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-061', 'eesim-zogona', 61, 'J''ai choisi de suivre Jésus Christ', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-061-v1', 'eesim-zg-061', 1, 'verse', 'En mon cœur, j''ai choisi de suivre Jésus-Christ,
En mon cœur, j''ai choisi de suivre Jésus,
En mon cœur, j''ai choisi de suivre Jésus-Christ.
Oui, pour toujours. (bis)'),
('eesim-zg-061-v2', 'eesim-zg-061', 2, 'verse', 'Si mes amis s''en vont,
Qu''importe? moi, j''irai!
Si mes amis s''en vont,
Qu''importe? j''irai!
Oui pour toujours. (bis)'),
('eesim-zg-061-v3', 'eesim-zg-061', 3, 'verse', 'Au monde je dis "non"
Joyeux je prends ma croix.
Au monde je dis "non"
Joyeux je prends ma croix.
Oui, pour toujours (bis)');

-- =====================================================
-- CANTIQUE 62: J'ai l'assurance de mon salut
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-062', 'eesim-zogona', 62, 'J''ai l''assurance de mon salut', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-062-v1', 'eesim-zg-062', 1, 'verse', 'J''ai l''assurance de mon salut,
Par la présence du Seigneur Jésus,
Son sang m''a lavé, m''a racheté,
Et l''Esprit Saint m''a régénéré.'),
('eesim-zg-062-c1', 'eesim-zg-062', 2, 'chorus', 'C''est mon histoire, c''est mon chant, (bis)
Louer mon Sauveur le jour durant'),
('eesim-zg-062-v2', 'eesim-zg-062', 3, 'verse', 'Parfait repos et parfait bonheur,
En moi, mon Sauveur, j''ai la paix du cœur.
Je veille en attendant son retour.
Je suis comblé, sûr de son amour!'),
('eesim-zg-062-v3', 'eesim-zg-062', 4, 'verse', 'J''ai cette assurance,
Ce pardon qu''il m''apportera.
Je sais mon cœur il le voulait.
O Jésus, à main puissante
M''a sauve de mon tombeau,
Et tu combles mon attente.
Par le don d''un cœur nouveau');

-- =====================================================
-- CANTIQUE 63: J'ai longtemps erré sans guide
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-063', 'eesim-zogona', 63, 'J''ai longtemps erré sans guide', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-063-v1', 'eesim-zg-063', 1, 'verse', 'J''ai longtemps erré sans guide,
Allégé de l''aurore
Moi, brisé! Mon cœur avide
Ne trouvait pas la douleur.
Or sans la main puissante,
M''arrête sur cette pente
M''arrête sur cette pente
Par le don d''un cœur nouveau'),
('eesim-zg-063-v2', 'eesim-zg-063', 2, 'verse', 'Un sauveur, Jésus lui-même,
Il me dit: <<Pécheur, je t''aime>>
Il a versé mon sang pour toi.>>
O Jésus, ta main puissante
M''a sauvé de mon tombeau,
Et tu combles mon attente.
Par le don d''un cœur nouveau'),
('eesim-zg-063-v3', 'eesim-zg-063', 3, 'verse', 'Dans mon cœur impur, infirme,
Je reçus le Saint-Esprit,
Et se soins divins m''affirme
Moins je suis à Jésus-Christ.
O Jésus, ta main puissante
M''a sauvé de mon tombeau,
Et tu combles mon attente
Par le don d''un cœur nouveau'),
('eesim-zg-063-v4', 'eesim-zg-063', 4, 'verse', 'A ce Jésus qui me donne
Et sa paix et son amour,
A Jésus je m''abandonne
Désormais et sans retour.');

-- =====================================================
-- CANTIQUE 64: J'ai soif de ta présence
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-064', 'eesim-zogona', 64, 'J''ai soif de ta présence', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-064-v1', 'eesim-zg-064', 1, 'verse', 'J''ai soif de ta présence,
Divin chef de ma foi,
Dans ma faiblesse immense
Que ferais-je sans toi?
Ma force et ma vie!'),
('eesim-zg-064-c1', 'eesim-zg-064', 2, 'chorus', 'Chaque jour à chaque heure
Oh! j''ai besoin de toi;
Viens Jésus, et demeure
Auprès de moi.'),
('eesim-zg-064-v2', 'eesim-zg-064', 3, 'verse', 'Des ennemis, dans l''ombre
Rodent autour de moi
Accablé par le nombre
Que ferais-je sans toi?'),
('eesim-zg-064-v3', 'eesim-zg-064', 4, 'verse', 'Pendant les jours d''orage,
D''obscurité, d''effroi;
Quand faiblit mon courage,
Que ferais-je sans toi?'),
('eesim-zg-064-v4', 'eesim-zg-064', 5, 'verse', 'O Jésus! ta présence, C''est la vie et la paix,
La paix dans la souffrance, Et la vie à jamais.');

-- =====================================================
-- CANTIQUE 65: J'entends ta douce voix
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-065', 'eesim-zogona', 65, 'J''entends ta douce voix', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-065-v1', 'eesim-zg-065', 1, 'verse', 'J''entends ta douce voix
Jésus, je viens à Toi,
Je viens, ô Sauveur, me jeter
Dans le sang de la Croix!
Tiens-moi près de la Croix!
Jésus Roi des rois etc.'),
('eesim-zg-065-c1', 'eesim-zg-065', 2, 'chorus', 'Jésus, Roi des rois,
Elle prendre en moi,
Qui mourut pour moi.
Je veux mourir avec Toi
De l''amour de la Croix!
Avec toi sur la Croix.'),
('eesim-zg-065-v2', 'eesim-zg-065', 3, 'verse', 'J''entends ta douce voix
Qui me dit: <<je m''unis>> ou <<à toi>>
Je crois, Seigneur, c''est par la foi.
Tiens-moi près de la Croix!
Jésus, Roi des rois, etc.'),
('eesim-zg-065-v3', 'eesim-zg-065', 4, 'verse', 'J''entends ta douce voix
Seigneur, que je m''unisse à toi
Dans la mort, par la foi
Jésus, Roi des rois, etc.');

-- =====================================================
-- CANTIQUE 66: J'ai cherché l'Eternel
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-066', 'eesim-zogona', 66, 'J''ai cherché l''Eternel', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-066-v1', 'eesim-zg-066', 1, 'verse', 'J''ai cherché l''Eternel, Et il m''a répondu
Il m''a délivré de toutes mes frayeurs.
J''ai cherché l''Eternel, Et il m''a répondu
Je le bénirai en tout temps, en tout lieu');

-- =====================================================
-- CANTIQUE 67: J'ai la joie de Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-067', 'eesim-zogona', 67, 'J''ai la joie de Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-067-v1', 'eesim-zg-067', 1, 'verse', 'J''ai l''amour de Jésus, (bis)
L''amour de Jésus
L''amour de Jésus dans mon cœur.'),
('eesim-zg-067-v2', 'eesim-zg-067', 2, 'verse', 'J''ai la joie de Jésus, (bis)
La joie de Jésus,
La joie de Jésus dans mon cœur.'),
('eesim-zg-067-v3', 'eesim-zg-067', 3, 'verse', 'J''ai la paix de Jésus, (bis)
La paix de Jésus,
La paix de Jésus dans mon cœur.'),
('eesim-zg-067-v4', 'eesim-zg-067', 4, 'verse', 'J''ai la vie de Jésus (bis)
La vie de Jésus,
La vie de Jésus dans mon cœur.');

-- =====================================================
-- CANTIQUE 68: J'ai trouvé un précieux livre
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-068', 'eesim-zogona', 68, 'J''ai trouvé un précieux livre', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-068-v1', 'eesim-zg-068', 1, 'verse', 'J''ai trouvé un précieux livre
Qui m''enseigne comment vivre
Qui me dit comment un jour aller au ciel
Dans ses pages j''ai trouvé le chemin, la vérité
M''éclairant sur tout ce qui est éternel.'),
('eesim-zg-068-c1', 'eesim-zg-068', 2, 'chorus', 'Oh, cher livre, précieux livre
Que j''aime à relire les pages sacrées
Je sais que je le trouve en toi
Est nécessaire à ma foi
Tu es la lumière éclairant mon sentier'),
('eesim-zg-068-v2', 'eesim-zg-068', 3, 'verse', 'J''aime lire l''Evangile
Aux paroles si faciles
Qu''un petit enfant reçoit parfaitement
voir Jésus en Galilée
Auprès du lac appeler
Les quatre pêcheurs aussitôt le suivant');

-- =====================================================
-- CANTIQUE 69: Je chante pour Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-069', 'eesim-zogona', 69, 'Je chante pour Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-069-v1', 'eesim-zg-069', 1, 'verse', 'Je chante pour Jésus,
Partout où je vais,
Et si au monde entier
Tout ce qu''il a fait.
Jésus m''a sauvé
Et du seul au ciel me
Je chante pour Jésus,
Partout où je vais.'),
('eesim-zg-069-v2', 'eesim-zg-069', 2, 'verse', 'Je chante pour Jésus,
Dans la sombre nuit
Quand je me conduis,
Et il vit au ciel où je
Je chante pour Jésus
Partout où je vais.'),
('eesim-zg-069-c1', 'eesim-zg-069', 3, 'chorus', 'Pour toi seul mon âme,
Jésus est la vie,
Et il œuvre aujourd''hui
La porte du paradis.');

-- =====================================================
-- CANTIQUE 70: Je te chante une mélodie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-070', 'eesim-zogona', 70, 'Je te chante une mélodie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-070-v1', 'eesim-zg-070', 1, 'verse', 'Je te chante, je te chante (ter)
Une mélodie Seigneur
Alléluia, gloire à toi Seigneur.'),
('eesim-zg-070-c1', 'eesim-zg-070', 2, 'chorus', 'Alléluia, Alléluia (ter)
Gloire à toi Seigneur!
Alléluia, gloire à toi Seigneur'),
('eesim-zg-070-v2', 'eesim-zg-070', 3, 'verse', 'Jésus Christ, Jésus Christ (ter)
Est vraiment ressuscité!
Alléluia, gloire à toi Seigneur.'),
('eesim-zg-070-v3', 'eesim-zg-070', 4, 'verse', 'Par ton nom, par ton nom (ter)
Nous avons la victoire!
Alléluia, gloire à toi Seigneur.'),
('eesim-zg-070-v4', 'eesim-zg-070', 5, 'verse', 'Tous unis, tout unis (ter)
Nous aimons Jésus Christ!
Alléluia, gloire à toi Seigneur');

-- =====================================================
-- CANTIQUE 71: Je m'approche de toi
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-071', 'eesim-zogona', 71, 'Je m''approche de toi', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-071-v1', 'eesim-zg-071', 1, 'verse', 'Je m''approche de toi, (bis)
Source de vie,
Mon Sauveur, bénis-moi!'),
('eesim-zg-071-v2', 'eesim-zg-071', 2, 'verse', 'Fais silence en mon cœur (bis)
Viens et me parle (bis)
O mon divin Sauveur!'),
('eesim-zg-071-v3', 'eesim-zg-071', 3, 'verse', 'Rends-moi conforme à Toi, (bis)
Divin Modèle,
Mets ton image en moi!'),
('eesim-zg-071-v4', 'eesim-zg-071', 4, 'verse', 'Rends-moi bouillant, Seigneur, (bis)
Pour ton service, (bis)
Chef de mon cœur!'),
('eesim-zg-071-v5', 'eesim-zg-071', 5, 'verse', 'Et quand tu reviendras (bis)
Dans tes milices (bis)
Tu me retrouveras. A. Pélaz');

-- =====================================================
-- CANTIQUE 72: Je monte la haut
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-072', 'eesim-zogona', 72, 'Je monte la haut', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-072-v1', 'eesim-zg-072', 1, 'verse', 'Je monte là -haut (bis)
Dans la place préparée, (bis)
La joie, la paix, le bonheur sont là, (ter)
Car le péché n''y vient pas'),
('eesim-zg-072-v2', 'eesim-zg-072', 2, 'verse', 'Je monte la-haut (bis)
Dans la place préparée (bis)
Là, tout est si merveilleux,
Plus le tristesse,
Pas de larmes, de douleur,
Plus le tristesse,
Pas de guerre, plus de faim
Et pas de voleur,
Et pas de crainte, de nuit,
Et pas de chaleur,
Et tu n''es plus seul pécheur.'),
('eesim-zg-072-v3', 'eesim-zg-072', 3, 'verse', 'Ne veux-tu pas monter (bis)
Dans cette place préparée, (bis)
C''est un déjà prêt pour toi,
Confesses tes péchés,
et ne pêche plus
Suis Jésus croit en lui,
et ne doute plus.
Parle de lui, prie toujours,
Et écoute sa voix.
Et Jésus te recevra.');

-- =====================================================
-- CANTIQUE 73: Je sais
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-073', 'eesim-zogona', 73, 'Je sais', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-073-v1', 'eesim-zg-073', 1, 'verse', 'Je ne sais pourquoi dans sa grâce
Jésus m''a tant aimé,
Pourquoi par son sang il efface
Ma dette, mes péchés.'),
('eesim-zg-073-c1', 'eesim-zg-073', 2, 'chorus', 'Je ne sais comment la lumière
Eclaire tout mon cœur
Comment je conquiers ma misère
Mon péché, mon malheur'),
('eesim-zg-073-v2', 'eesim-zg-073', 3, 'verse', 'Je ne sais quelle est la mesure
De joie et de douleur
Que pour moi permet sa main sûre.
Réservé mon Sauveur.'),
('eesim-zg-073-v3', 'eesim-zg-073', 4, 'verse', 'Je ne sais Quand de la victoire, L''heure enfin sonnera,
Quand l''Agneau, Epoux, dans sa gloire, Avec lui me prendra.');

-- =====================================================
-- CANTIQUE 74: Je veux monter
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-074', 'eesim-zogona', 74, 'Je veux monter', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-074-v1', 'eesim-zg-074', 1, 'verse', 'Je veux monter sur la montagne,
Et mon Sauveur me l''accorde
Avec lui je veux m''élever
Sur les plus hauts sommets'),
('eesim-zg-074-c1', 'eesim-zg-074', 2, 'chorus', 'C''est-là que l''on rencontre Dieu,
Avec lui je veux m''élever
Sur les plus hauts sommets
Le Saint-Esprit me guidera,
Et Jésus me consolera.'),
('eesim-zg-074-v2', 'eesim-zg-074', 3, 'verse', 'Si les cailloux me font mal
Sur la montagne,
Le Saint-Esprit me guidera,
Et Jésus me consolera.');

-- =====================================================
-- CANTIQUE 75: Je voudrais avoir un ami
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-075', 'eesim-zogona', 75, 'Je voudrais avoir un ami', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-075-c1', 'eesim-zg-075', 1, 'chorus', 'Je voudrais avoir un ami
Je voudrais avoir un ami chez moi
Je voudrais avoir un ami
Un véritable ami.'),
('eesim-zg-075-v1', 'eesim-zg-075', 2, 'verse', 'Des copains à tous les coins de rue
Qui voudraient n''en mettre plein la vue.
Et ce tout ce que je suis repue
Mais pas un seul ami.'),
('eesim-zg-075-v2', 'eesim-zg-075', 3, 'verse', 'Quand le soir je suis seul
Bien souvent j''ai le cœur
Très froid
Trop souvent ami qui le cœur qui s''ennui'),
('eesim-zg-075-v3', 'eesim-zg-075', 4, 'verse', 'Jésus-Christ n''est fait mon mile
Pour tous toi il fit frappe encore
Jésus-Christ, malgré ton trop
Est ton meilleur ami.');

-- =====================================================
-- CANTIQUE 76: Jésus revient
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-076', 'eesim-zogona', 76, 'Jésus revient', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-076-v1', 'eesim-zg-076', 1, 'verse', 'Quelle joyeuse espérance!
Jésus-Christ tient d''avance
Je le vois en la lumière
Et de voir par la lumière
L''ineffable apparition!
Comme on soupiré au monde'),
('eesim-zg-076-c1', 'eesim-zg-076', 2, 'chorus', 'Jésus revient
Quel bonheur!
Jésus vient
Prendre avec lui les rachetés
Il lui rendra gloire.'),
('eesim-zg-076-v2', 'eesim-zg-076', 3, 'verse', 'Les ombres de la nuit couvrant
Déjà le jour du salut
Main pour les rachetés
S''ouvre la paradis des élus
Voûte venir dans le monde
Le règne de la terreur,
Mais au cœur que grande joie
Un chant résonne en mon cœur.'),
('eesim-zg-076-v3', 'eesim-zg-076', 4, 'verse', 'Si la nuit vient sur ce monde
Le jour aussi apparaît
Dans le même jour languissant et plus
Tout s''accomplirent pour mon âme
Dans la présence du Roi
Déjà mon amour proclame
Tout ce que j''ai en a.');

-- =====================================================
-- CANTIQUE 77: Jésus a tout quitté
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-077', 'eesim-zogona', 77, 'Jésus a tout quitté', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-077-v1', 'eesim-zg-077', 1, 'verse', 'Jésus a tout quitté
Pour venir sur la terre
Le chercher, te sauver
Pauvre pécheur perdu
Celui qui se chargea de toute ta misère
Jésus le seul sauveur du monde
Le connais-tu?
Jésus le seul Sauveur.'),
('eesim-zg-077-v2', 'eesim-zg-077', 2, 'verse', 'Sais-tu ce qu''il souffrit,
En mourant au calvaire,
Sur le bois attaché
Et si cruel endurer
Il paya le seul humaine. De ton péché?
Jésus le seul Sauveur du monde.
Le connais-tu?
Jésus le seul sauveur.'),
('eesim-zg-077-v3', 'eesim-zg-077', 3, 'verse', 'Pécheur perdu répond
Au Sauveur qui t''invite
Viens goûter le bonheur
Qu''il donne à ses élus
Réponds dès aujourd''hui
Jésus le seul Sauveur du monde
Crois en Jésus
Jésus le seul sauveur.');

-- =====================================================
-- CANTIQUE 78: Jésus Christ est ma sagesse
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-078', 'eesim-zogona', 78, 'Jésus Christ est ma sagesse', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-078-v1', 'eesim-zg-078', 1, 'verse', 'Jésus Christ est ma sagesse
Il éclaire mon chemin,
Et je marche, en ma faiblesse,
Conduit par sa sûre main.'),
('eesim-zg-078-c1', 'eesim-zg-078', 2, 'chorus', 'Il éclaire mon chemin, (bis)
Et je marche en ma faiblesse,
Conduit par sa sûre main.'),
('eesim-zg-078-v2', 'eesim-zg-078', 3, 'verse', 'Jésus-Christ me sanctifie;
Au divin Cep attaché,
Je reçois de lui la vie
Qui m''affranchit du péché.'),
('eesim-zg-078-v3', 'eesim-zg-078', 4, 'verse', 'Jésus, en payant sa dette,
Vers lui, pour ceux remplis de peines
Lui, pauvre et grand au péché
Et déjà ma place est prête
Au ciel, pour l''éternité.');

-- =====================================================
-- CANTIQUE 79: Jésus est au milieu de nous
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-079', 'eesim-zogona', 79, 'Jésus est au milieu de nous', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-079-v1', 'eesim-zg-079', 1, 'verse', 'Jésus est au milieu de nous,
Son regard s''abaisse sur nous,
Sa douce voix, l''entendez-vous?
Je veux vous bénir tous! (bis)
Je veux vous sauver tous!'),
('eesim-zg-079-v2', 'eesim-zg-079', 2, 'verse', 'Jésus est au milieu de nous,
Son regard s''abaisse sur nous,
Sa douce voix, l''entendez-vous?
Sa douce voix, l''entendez!
Je veux vous sauver tous!'),
('eesim-zg-079-v3', 'eesim-zg-079', 3, 'verse', 'Jésus est au milieu de nous, Son regard s''abaisse sur nous,
Sa douce voix, l''entendez-vous? Oh! je vous aime tous! (bis)'),
('eesim-zg-079-v4', 'eesim-zg-079', 4, 'verse', 'Jésus me recevra, (bis)
Me recevra, (bis)
Dans le ciel!'),
('eesim-zg-079-v5', 'eesim-zg-079', 5, 'verse', 'Jésus me satisfait. (bis)
Me satisfait, (bis)
Pour toujours.'),
('eesim-zg-079-v6', 'eesim-zg-079', 6, 'verse', 'Gloire, gloire à Jésus! (bis)
Gloire à Jésus! (bis)
A jamais!');

-- =====================================================
-- CANTIQUE 80: Jésus est né! Venez berger et mages
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-080', 'eesim-zogona', 80, 'Jésus est né! Venez berger et mages', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-080-v1', 'eesim-zg-080', 1, 'verse', 'Jésus est né! Venez berger et mages,
Anges du ciel, portons-lui nos hommages.
Oui, gloire soit dans les cieux! Paix en tous lieux'),
('eesim-zg-080-v2', 'eesim-zg-080', 2, 'verse', 'Voilà l''Enfant qui doit sauver le monde:
Qu''il fasse éclat et qu''elle paix profonde,
Rayonne autour l''étoile de l''Dieu d''amour!'),
('eesim-zg-080-v3', 'eesim-zg-080', 3, 'verse', 'A lui vouloir notre délivrance
Naître ignoré, pauvre et sans apparence.
A lui! tout ce qui plaît
à Ce Roi désarmant
Formé par la détresse.
A Toi la croix
O bon Sauveur
Alléluia à lui!'),
('eesim-zg-080-v4', 'eesim-zg-080', 4, 'verse', 'Tout ce qui plaît
A lui notre Roi sans couronne,
Le cœur et qu''il te glorifie,
Non pour un jour, mais pour toute la vie
Et et à toi - Sois en Roi!');

-- =====================================================
-- CANTIQUE 81: Jésus ne change pas
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-081', 'eesim-zogona', 81, 'Jésus ne change pas', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-081-v1', 'eesim-zg-081', 1, 'verse', 'Jésus ne change pas (bis)
Ne change pas, (bis)
Non, jamais!'),
('eesim-zg-081-v2', 'eesim-zg-081', 2, 'verse', 'Jésus m''a pardonné, (bis)
M''a pardonné (bis)
Pour toujours.'),
('eesim-zg-081-v3', 'eesim-zg-081', 3, 'verse', 'Jésus me satisfait. (bis)
Me satisfait, (bis)
Pour toujours.'),
('eesim-zg-081-v4', 'eesim-zg-081', 4, 'verse', 'Jésus me recevra, (bis)
Me recevra, (bis)
Dans le ciel!'),
('eesim-zg-081-v5', 'eesim-zg-081', 5, 'verse', 'Toujours près de Jésus,
Près de Jésus, (bis)
Toujours près de Jésus,
Près de Jésus.'),
('eesim-zg-081-v6', 'eesim-zg-081', 6, 'verse', 'Gloire, gloire à Jésus! (bis)
Gloire à Jésus! (bis)
A jamais!');

-- =====================================================
-- CANTIQUE 82: Jésus quitta le trône de son Père
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-082', 'eesim-zogona', 82, 'Jésus quitta le trône de son Père', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-082-v1', 'eesim-zg-082', 1, 'verse', 'Jésus quitta le trône de son Père
Et descendit ici-bas sur la terre,
Il accepte la crèche pour berceau,
Lui, roi des rois,
Le Fils du Dieu très haut!'),
('eesim-zg-082-c1', 'eesim-zg-082', 2, 'chorus', 'Oh! oui c''est lui,
Oh! oui c''est lui,
Il est cela oui,
Que Jésus m''aime!
Oh bonheur suprême
La Bible me le dit.'),
('eesim-zg-082-v2', 'eesim-zg-082', 3, 'verse', 'En tous lieux portant la délivrance,
Faisant le bien, Guérissant la souffrance,
Il pardonnait aux pécheurs repentants
Il bénissait jusqu''aux petits enfants.'),
('eesim-zg-082-v3', 'eesim-zg-082', 4, 'verse', 'Il fut cloué sur la croix méprisable,
Lui, juste et saint, mourut pour moi coupable,
Pour me Sauver, son sang fut répandu,
C''est pourquoi j''aime le Seigneur Jésus!'),
('eesim-zg-082-v4', 'eesim-zg-082', 5, 'verse', 'Plus que vainqueur il sortit de la tombe,
Gloire à l''Agneau, divin Sauveur du monde!
Il règne au ciel, intercède pour moi,
Et vient bientôt me chercher je le crois!');

-- =====================================================
-- CANTIQUE 83: Jusqu''à la mort
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-083', 'eesim-zogona', 83, 'Jusqu''à la mort', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-083-v1', 'eesim-zg-083', 1, 'verse', 'Jusqu''à la mort nous te serons fidèles
Jusqu''à la mort tu seras notre Roi,
Sous ton drapeau, Jésus, tu nous appelles;
Nous y mourons en luttant avec foi!'),
('eesim-zg-083-c1', 'eesim-zg-083', 2, 'chorus', 'Jusqu''à la mort! C''est notre cri de guerre,
Le libre cri d''un peuple racheté;
Jusqu''à la mort, nous aurons pour bannière
Ta croix sanglante, ô Christ ressuscité!'),
('eesim-zg-083-v2', 'eesim-zg-083', 3, 'verse', 'Pour toi, Jésus, on est heureux de vivre
Tous les chagrins avec toi semblent doux
Agneau de Dieu, qui ne voudrait te suivre
Jusqu''à la mort, toi qui mourus pour nous!'),
('eesim-zg-083-v3', 'eesim-zg-083', 4, 'verse', 'Jusqu''à la mort, soumis à ta puissance,
Nous voulons vivre et mourir sous tes lois,
Toi qui pour nous poussas l''obéissance
Jusqu''à la mort, et à la mort de la croix.'),
('eesim-zg-083-v4', 'eesim-zg-083', 5, 'verse', 'Mais, ô Sauveur! tu sais notre faiblesse,
Nous trébuchons souvent en chemin
Si tu ne viens accomplir ta promesse
Jusqu''à la mort nous tenant par la main.');

-- =====================================================
-- CANTIQUE 84: L''amour de Dieu
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-084', 'eesim-zogona', 84, 'L''amour de Dieu', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-084-v1', 'eesim-zg-084', 1, 'verse', 'Que ton Esprit nous guide et nous anime
Et que, sa flamme embrasant tous nos cœurs
Nous devenions pour toi, sainte victime,
Sur la mort même un peuple de vainqueurs.'),
('eesim-zg-084-v2', 'eesim-zg-084', 2, 'verse', 'L''amour de Dieu de loin surpasse
Ce que peut dire un cœur humain,
Et plus grand que les espaces,
Autrement il l''atteint toujours,
Pour le péché de notre monde,
Dieu nous donna Jésus,
Il nous pardona, grâce profonde,
Il lava les perdus.'),
('eesim-zg-084-c1', 'eesim-zg-084', 3, 'chorus', 'L''amour de Dieu, si fort, si tendre,
Est un amour sans fin;
C''est le chant que font entendre
Les anges et les saints.'),
('eesim-zg-084-v3', 'eesim-zg-084', 4, 'verse', 'Versez de l''encre dans les ondes,
Changez le ciel en parchemin
Tendez la plume à tout le monde
Et que chacun soit écrivain
Ferait tarir tout l''encre du Père
Sur remplir la place entière
Sur des divins rouleaux.'),
('eesim-zg-084-v4', 'eesim-zg-084', 5, 'verse', 'Et que le monde un jour chancelle
Avec ses trônes et ses rois,
Quand trembleront tous les rebelles,
Soudain saisis d''un grand effroi,
De Dieu l''amour que rien ne lasse
Pour nous encore vivra;
C''est le miracle de la grâce.
Amen! alléluia!');

-- =====================================================
-- CANTIQUE 85: L''enfant prodigue
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-085', 'eesim-zogona', 85, 'L''enfant prodigue', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-085-v1', 'eesim-zg-085', 1, 'verse', 'L''enfant prodigue s''adresse un jour à son père
Cher papa, donne-moi ma part d''héritage'),
('eesim-zg-085-c1', 'eesim-zg-085', 2, 'chorus', 'Fait attention!
Les échos du monde passent vite
Cherchez ton bonheur auprès de Dieu
Et tu seras dans la joie'),
('eesim-zg-085-v2', 'eesim-zg-085', 3, 'verse', 'Aujourd''hui Jésus t''appelle
Veux-tu lui donner ta vie
Ne fais plus oh mon frère, le bonheur c''est Jésus
Son père sans le malheur qui l''attend, vite lui dit,
Toi mon fils, veux-tu en aller, oui alors pars,
Mon Père j''ai péché contre le ciel
Et contre toi "je reviens"'),
('eesim-zg-085-v3', 'eesim-zg-085', 4, 'verse', 'Le Christ
Je veux te servir pour toujours');

-- =====================================================
-- CANTIQUE 86: L''esprit content, c''est un trésor
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-086', 'eesim-zogona', 86, 'L''esprit content, c''est un trésor', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-086-v1', 'eesim-zg-086', 1, 'verse', 'L''esprit content, c''est un trésor
Des plus précieux que tu connais,
Car il vaut mieux que tout votre or
D''un monde beaucoup
Contentement passe richesse.
Il ne dépend ni de l''argent
Ni d''aucun bien, ni d''un ciel bleu,
De rien enfin, de personne,
L''esprit content Jésus le donne.'),
('eesim-zg-086-v2', 'eesim-zg-086', 2, 'verse', 'A qui devient enfant de Dieu
Échoit le vrai bien qu''il souhaite.
Le reste importe si peu
Pourquoi faut-il qu''on s''inquiète?
Celui qui croit se sent le droit
D''avoir qu''il aime et se réjouit;
Tandis qu''ailleurs, en toute
L''esprit content s''élève la voûte.'),
('eesim-zg-086-v3', 'eesim-zg-086', 3, 'verse', 'L''esprit content sait voir un jour
De Dieu guider les choses
Où les épines sont pour
Il aime à découvrir les roses
Et là où craint le lendemain
Il ne vit, lui que le bonheur,
Dans l''assurance bien au cœur,
Qu''à chaque jour suffit sa peine.'),
('eesim-zg-086-v4', 'eesim-zg-086', 4, 'verse', 'Ce privilège du chrétien,
L''esprit content quoi qu''il arrive,
C''est veux! Retiens-le bien,
Que nul ne te l''enlève,
T''empreigne alors de ton esprit
D''honneur Dieu et ton sort,
A l''en blâmer se trouve
Oh! importe! Le Seigneur t''approuve.');

-- =====================================================
-- CANTIQUE 87: La cloche de Dieu
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-087', 'eesim-zogona', 87, 'La cloche de Dieu', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-087-v1', 'eesim-zg-087', 1, 'verse', 'La cloche vive de Dieu nous appelle
Allons-y prier Jésus'),
('eesim-zg-087-v2', 'eesim-zg-087', 2, 'verse', 'Toi mon frère, toi aussi
Allons-y prier Jésus'),
('eesim-zg-087-v3', 'eesim-zg-087', 3, 'verse', 'Toi mon oncle, oh! cousin
Allons-y prier Jésus'),
('eesim-zg-087-v4', 'eesim-zg-087', 4, 'verse', 'A Toi mon frère oh! ma sœur
Allons-y prier Jésus'),
('eesim-zg-087-v5', 'eesim-zg-087', 5, 'verse', 'Toi mon ami, toi aussi
Allons-y prier Jésus'),
('eesim-zg-087-v6', 'eesim-zg-087', 6, 'verse', 'La cloche de Dieu nous appelle
Allons-y prier Jésus'),
('eesim-zg-087-v7', 'eesim-zg-087', 7, 'verse', 'Toi mon mari oh, ma femme
Allons-y prier Jésus');

-- =====================================================
-- CANTIQUE 88: La force est en Christ
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-088', 'eesim-zogona', 88, 'La force est en Christ', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-088-v1', 'eesim-zg-088', 1, 'verse', 'Veux-tu briser du péché le pouvoir?
La force est en Christ! (bis)
Veux-tu sans cesse la force recevoir?
La force est dans le sang de Christ!'),
('eesim-zg-088-c1', 'eesim-zg-088', 2, 'chorus', 'Je suis fort, fort! oui,
plus que vainqueur, Par le sang
de Jésus,
Je suis fort, fort! oui, plus que
Par le sang de Jésus, mon
Sauveur.'),
('eesim-zg-088-v2', 'eesim-zg-088', 3, 'verse', 'Veux-tu braver et la mort et l''enfer?
La force est en Christ! (bis)
Jésus, d''un mot fait tomber tous les fers,
La force est dans le sang de Christ!'),
('eesim-zg-088-v3', 'eesim-zg-088', 4, 'verse', 'Veux-tu marcher toujours par,
triomphant?
La force est en Christ!
Pour le garder, Jésus est tout-puissant;
La force est dans le sang de Christ!');

-- =====================================================
-- CANTIQUE 89: La moisson passe
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-089', 'eesim-zogona', 89, 'La moisson passe', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-089-v1', 'eesim-zg-089', 1, 'verse', 'Des millions vivent dans l''obscurité
Sans espoir, sans joie, sans réconcilier
Nous portons le fardeau de leurs péchés
Ne sauriez-tu attendre après la mort.'),
('eesim-zg-089-c1', 'eesim-zg-089', 2, 'chorus', 'La moisson passe, voici la nuit
Des millions meurent, entends leurs cris
Hâte-toi frère de les chercher
Pour eux le sang de Christ a coulé.'),
('eesim-zg-089-v2', 'eesim-zg-089', 3, 'verse', 'Ils crient vers les dieux de bois, de pierre
Et leurs idoles ne peuvent les sauver
Et nul ne répond à leur prière
Ils passent ainsi dans l''Éternité'),
('eesim-zg-089-v3', 'eesim-zg-089', 4, 'verse', 'Pour sauver les perdus et les mourants
Donne tout à Christ, en et d''âmes saints
Sa voix t''appelle, réponds promptement
Travaille vite car la nuit vient.');

-- =====================================================
-- CANTIQUE 90: La nature a proclamé
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-090', 'eesim-zogona', 90, 'La nature a proclamé', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-090-v1', 'eesim-zg-090', 1, 'verse', 'La nature a proclamé et les oiseaux approuvent
Que Jésus est le prince et son père, le roi'),
('eesim-zg-090-c1', 'eesim-zg-090', 2, 'chorus', 'Chantez chantez chantez avec la nature
Chantez chantez chantez sa puissance'),
('eesim-zg-090-v2', 'eesim-zg-090', 3, 'verse', 'Les étoiles chantaient la lune et le soleil
Que Jésus est Seigneur magnifique est son nom'),
('eesim-zg-090-v3', 'eesim-zg-090', 4, 'verse', 'L''univers chantait écoutez ces merveilles
Dieu le créateur du monde magnifique est son nom');

-- =====================================================
-- CANTIQUE 91: La trinité
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-091', 'eesim-zogona', 91, 'La trinité', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-091-v1', 'eesim-zg-091', 1, 'verse', 'Nous t''adorons, notre créateur,
Nous te louons, notre bon Sauveur
Nous te bénissons, oh Consolateur.
Nous te suivons, avec tous nos cœurs
Oh, oui seigneur'),
('eesim-zg-091-v2', 'eesim-zg-091', 2, 'verse', 'Ici-bas c''est les combats et les pleurs,
Mais là-haut c''est l''Éternel bonheur.'),
('eesim-zg-091-v3', 'eesim-zg-091', 3, 'verse', 'Ici, la mort elle n''a plus de force
Car Jésus a ouvert du ciel la porte.'),
('eesim-zg-091-v4', 'eesim-zg-091', 4, 'verse', 'Ici-bas la souffrance, la moquerie
Là-haut joie éternelle au paradis...');

-- =====================================================
-- CANTIQUE 92: La vérité, le chemin, la vie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-092', 'eesim-zogona', 92, 'La vérité, le chemin, la vie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-092-v1', 'eesim-zg-092', 1, 'verse', 'Né de la poussière et d''éternité,
Il a le cœur avide De vraie liberté,
J''ai suivi ce guide: Nomme Vérité'),
('eesim-zg-092-c1', 'eesim-zg-092', 2, 'chorus', 'Il est la Vérité, le Chemin, et la Vie,
On ne vient au Père que par Lui. (bis)'),
('eesim-zg-092-v2', 'eesim-zg-092', 3, 'verse', 'Tu ne comprenais pas.
Du ne pardonne pas,
Ca n''existe pas,
Un roi qui s''officie,
Devant ses sujets,
Couronné d''épines...
A toi de juger.');

-- =====================================================
-- CANTIQUE 93: La vie est belle
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-093', 'eesim-zogona', 93, 'La vie est belle', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-093-c1', 'eesim-zg-093', 1, 'chorus', 'La vie est belle
Le temps est bien beau
Mais bientôt le monde va passer'),
('eesim-zg-093-v1', 'eesim-zg-093', 2, 'verse', 'Préparez chrétien
Sera-tu parmi les bons
Parmi les saints'),
('eesim-zg-093-v2', 'eesim-zg-093', 3, 'verse', 'Es-tu prêt chrétien
Veux-tu louer ton Dieu (Bis)
Veux-tu t''attacher
A sa Sainte parole'),
('eesim-zg-093-v3', 'eesim-zg-093', 4, 'verse', 'Les voitures passeront
Les villas passeront (Bis)
Les plaisirs passeront
Les loisirs passeront'),
('eesim-zg-093-v4', 'eesim-zg-093', 5, 'verse', 'Seras-tu parmi les bons
Parmi les mauvais (Bis)
Parmi les belles
Parmi les rejetés');

-- =====================================================
-- CANTIQUE 94: La voix de Christ nous appelle
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-094', 'eesim-zogona', 94, 'La voix de Christ nous appelle', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-094-v1', 'eesim-zg-094', 1, 'verse', 'La voix de Christ nous appelle;
Il est temps de s''éveiller;
«La moisson est vaste et belle!
Qui veut pour moi travailler?»
C''est ton Sauveur, ô mon frère
Dont l''appel s''adresse à toi.
Réponds-lui, d''un cœur sincère
«Me voici, Maître, prends-moi!»'),
('eesim-zg-094-v2', 'eesim-zg-094', 2, 'verse', 'Sans franchir les mers bruyantes,
Tu peux annoncer Jésus,
Que d''âmes insouciantes,
De cœurs souffrants et perdus!
Autour de nous l''œuvre est grande,
Mais petite est notre foi.
A Jésus qui nous commande
Répondons: «Maître, aide-moi!»'),
('eesim-zg-094-v3', 'eesim-zg-094', 3, 'verse', 'Si un sublime langage
Tu n''as pu parler jamais,
Tu peux rendre témoignage,
Qu''en Jésus tu trouves paix.
A ton frère qui s''égare,
Ce que Christ a fait pour toi
Dis-lui: «Maître, prends-moi!»'),
('eesim-zg-094-v4', 'eesim-zg-094', 4, 'verse', 'Mais que nul de nous n''oublie!
Dire encore: «Je ne puis rien!»
De faire et d''aimer le bien,
Jésus, donne, amour! foi, zèle,
Puis notre fidèle
Nous dirons: «Maître, prends-moi!»');

-- =====================================================
-- CANTIQUE 95: La voix du Seigneur m''appelle
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-095', 'eesim-zogona', 95, 'La voix du Seigneur m''appelle', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-095-v1', 'eesim-zg-095', 1, 'verse', 'La voix du Seigneur m''appelle
Prends ta croix et viens, suis moi!
Je réponds: «Sauveur fidèle,
Me voici, je suis à Toi.»'),
('eesim-zg-095-c1', 'eesim-zg-095', 2, 'chorus', 'Jusqu''au bout je veux te suivre,
Dans les bons, les mauvais jours,
A toi pour mourir, pour vivre,
A toi, Jésus, pour toujours.'),
('eesim-zg-095-v2', 'eesim-zg-095', 3, 'verse', 'Mais le chemin du Calvaire
Est étroit et périlleux.
C''est un chemin solitaire,
Difficile et ténébreux.'),
('eesim-zg-095-v3', 'eesim-zg-095', 4, 'verse', 'Il faut quitter ceux qu''on aime
Savoir être mal jugé,
Endurer l''injure même,
Du monde être méprisé.'),
('eesim-zg-095-v4', 'eesim-zg-095', 5, 'verse', 'Alors, perdre sa propre vie,
Consentir à n''être rien,
N''avoir qu''une seule envie:
Aimer Jésus, le seul bien!'),
('eesim-zg-095-v5', 'eesim-zg-095', 6, 'verse', 'Jésus donne grâce et gloire
Pour te suivre pas à pas
Avec lui, joie et victoire,
Paix et bonheur ici-bas.');

-- =====================================================
-- CANTIQUE 96: Le ciel est ma patrie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-096', 'eesim-zogona', 96, 'Le ciel est ma patrie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-096-v1', 'eesim-zg-096', 1, 'verse', 'Le ciel est ma patrie,
Jésus dans son amour,
M''accueille jour par jour,
Dans sa douleur
Mais là-haut, pure lumière
Je dirai ta bonheur'),
('eesim-zg-096-v2', 'eesim-zg-096', 2, 'verse', 'Le ciel est ma patrie,
Si tout nous sourit,
Si ma joie est meurtrie
Doit pleurer et gémir
Je rouvrais quand même
Tout le long du chemin
Car au bonheur suprême
Tu m''aimes par la main.'),
('eesim-zg-096-v3', 'eesim-zg-096', 3, 'verse', 'Le ciel est ma patrie,
Avec tous les élus,
L''âme heureuse, ravie
Je te verrai Jésus
Je verrai ce que j''aime
Et pour l''éternité
Dans un bonheur suprême.
Je dirai ta bonté.');

-- =====================================================
-- CANTIQUE 97: Le figuier
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-097', 'eesim-zogona', 97, 'Le figuier', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-097-v1', 'eesim-zg-097', 1, 'verse', 'Quand le figuier refleurira (bis)
Le Seigneur reviendra
En Israël pays promis
En Israël pays choisi.'),
('eesim-zg-097-v2', 'eesim-zg-097', 2, 'verse', 'Dans sa colère pour un moment (bis)
Mis à dispersé
Loin d''Israël pays promis
Loin d''Israël pays béni'),
('eesim-zg-097-v3', 'eesim-zg-097', 3, 'verse', 'Dieu a dit à la fin des temps (bis)
Il les rassemblera
En Israël pays promis
En Israël pays choisi.');

-- =====================================================
-- CANTIQUE 98: Le monde nous envie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-098', 'eesim-zogona', 98, 'Le monde nous envie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-098-v1', 'eesim-zg-098', 1, 'verse', 'Oh voyez combien le monde nous envie
La joie et la paix inondent notre cœur
C''est la gloire du Seigneur qui vit en elle
Et qui nous remplit de son parfait bonheur'),
('eesim-zg-098-v2', 'eesim-zg-098', 2, 'verse', 'Les joies du monde ne sont pas pour nous,
Mais le repos du Seigneur est plus doux.'),
('eesim-zg-098-v3', 'eesim-zg-098', 3, 'verse', 'Le monde avec ses convoitises passe
Mais chez Dieu nous avons une place.'),
('eesim-zg-098-v4', 'eesim-zg-098', 4, 'verse', 'Mon ami, as-tu peur de la mort
Alors restez à Jésus ton sort.');

-- =====================================================
-- CANTIQUE 99: Le Seigneur est avec nous (Jésus azali awa)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-099', 'eesim-zogona', 99, 'Le Seigneur est avec nous', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-099-v1', 'eesim-zg-099', 1, 'verse', 'Le Seigneur est avec nous (bis)
Le Seigneur est avec nous dans ce lieu
Le Seigneur est avec nous, (bis)
Le Seigneur est avec nous dans ce lieu.'),
('eesim-zg-099-c1', 'eesim-zg-099', 2, 'chorus', 'Alléluia, alléluia,
Alléluia, gloire à Dieu! (bis)'),
('eesim-zg-099-v2', 'eesim-zg-099', 3, 'verse', 'Yesu azali awa, (bis)
Yesu azali awa na biso.
Yesu azali awa, (bis)
Yesu azali awa na biso.'),
('eesim-zg-099-v3', 'eesim-zg-099', 4, 'verse', 'Biso tokosepela, (bis)
Biso tokosepela na Yesu'),
('eesim-zg-099-v4', 'eesim-zg-099', 5, 'verse', 'Soyons vraiment dans la joie, (bis)
Soyons vraiment dans la joie en Jésus
Soyons vraiment dans la joie, (bis)
Soyons vraiment dans la joie en ce lieu.');

-- =====================================================
-- CANTIQUE 100: Le signal de la victoire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-100', 'eesim-zogona', 100, 'Le signal de la victoire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-100-v1', 'eesim-zg-100', 1, 'verse', 'Le signal de la victoire
Déjà brille aux cieux
La couronne de la gloire
Paraît à nos yeux.'),
('eesim-zg-100-c1', 'eesim-zg-100', 2, 'chorus', 'Je viens, combattre encore!
Dit Jésus à tous.
Oui, mon Sauveur, je t''implore,
Je lutte à genoux.'),
('eesim-zg-100-v2', 'eesim-zg-100', 3, 'verse', 'Suivons, amis, la bannière
Du Sauveur béni
Et que notre armée entière
Se range à sa voix'),
('eesim-zg-100-v3', 'eesim-zg-100', 4, 'verse', 'Rude et longue est la mêlée:
Voici le secours!
Dans nos mains prenons l''épée
Qui vainquait toujours!');

-- =====================================================
-- CANTIQUE 101: Les jours c''est sont longs
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-101', 'eesim-zogona', 101, 'Les jours c''est sont longs', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-101-v1', 'eesim-zg-101', 1, 'verse', 'Les jours sont longs, nouvelle joie
Et la paix en moi au départ,
Et pour toujours jusqu''au mort
Et je vis par lui ma sor'),
('eesim-zg-101-v2', 'eesim-zg-101', 2, 'verse', 'Je vis pour Jésus jour après jour
Je lis ma Bible, je le prie
Je sais qu''il conduit ma vie
Je vis pour Jésus jour après jour');

-- =====================================================
-- CANTIQUE 102: Les murs de Jéricho
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-102', 'eesim-zogona', 102, 'Les murs de Jéricho', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-102-v1', 'eesim-zg-102', 1, 'verse', 'Nous allons faire le tour
De la ville, de la ville.
Nous allons faire le tour
De la ville de Jéricho'),
('eesim-zg-102-c1', 'eesim-zg-102', 2, 'chorus', 'Jéricho, Jéricho
Il faut que ces murs tombent
Jéricho, Jéricho
Josué nous l''a dit'),
('eesim-zg-102-v2', 'eesim-zg-102', 3, 'verse', 'Après le premier jour,
Les murailles, les murailles
Après le premier jour,
Les murailles n''ont pas bougé'),
('eesim-zg-102-v3', 'eesim-zg-102', 4, 'verse', 'Après le deuxième jour,
Les murailles, les murailles
Après le deuxième jour,
Les murailles n''ont pas bougé'),
('eesim-zg-102-v4', 'eesim-zg-102', 5, 'verse', 'Après le troisième jour...'),
('eesim-zg-102-v5', 'eesim-zg-102', 6, 'verse', 'Après le quatrième jour...'),
('eesim-zg-102-v6', 'eesim-zg-102', 7, 'verse', 'Après le cinquième jour...'),
('eesim-zg-102-v7', 'eesim-zg-102', 8, 'verse', 'Après le sixième jour...'),
('eesim-zg-102-v8', 'eesim-zg-102', 9, 'verse', 'Après le septième jour
Les murailles, les murailles
Après le septième jour
Les murailles sont écroulées'),
('eesim-zg-102-c2', 'eesim-zg-102', 10, 'chorus', 'Jéricho, Jéricho
Les grands murs sont en ruines
Jéricho, Jéricho
Dieu nous l''avait prédit');

-- =====================================================
-- CANTIQUE 103: Les yeux fixés sur Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-103', 'eesim-zogona', 103, 'Les yeux fixés sur Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-103-v1', 'eesim-zg-103', 1, 'verse', 'Les yeux fixés sur Jésus. Je le suis pas à pas
Car en lui j''ai le saint qui va à Golgotha
Son Saint-Esprit ne quitte pas ce qu''il dit de ce le dit');

-- =====================================================
-- CANTIQUE 104: Lion de Juda sur le trône
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-104', 'eesim-zogona', 104, 'Lion de Juda sur le trône', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-104-v1', 'eesim-zg-104', 1, 'verse', 'Lion de Juda sur le trône
Tu viens établir ton royaume.
Toi, le Roi des rois,
Le prince de paix,
Que ton règne dure à jamais.'),
('eesim-zg-104-c1', 'eesim-zg-104', 2, 'chorus', 'Gloire au grand Roi. (hommes)
Gloire au grand Roi. (femmes)
Gloire au grand Roi.'),
('eesim-zg-104-v2', 'eesim-zg-104', 3, 'verse', 'Lion de Juda, tu règnes
Ferme les peuples par les liens,
Livre ta croix ton pain,
Aux mains des mécréants
Maître ressuscité triomphant
Alléluia (alléluia). Joh!'),
('eesim-zg-104-v3', 'eesim-zg-104', 4, 'verse', 'Lion de Juda, viens bientôt
Etablir un monde nouveau
Que révèle enfin
Le chant de joie
L''univers que tu rachetas
Maranatha, (maranatha) oh!
Tu es mon Roi!'),
('eesim-zg-104-v4', 'eesim-zg-104', 5, 'verse', '(Reprendre 1er couplet)
Tu es mon Roi! Alléluia! (Tous)
Tu es mon Roi!');

-- =====================================================
-- CANTIQUE 105: Loin le plus loin
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-105', 'eesim-zogona', 105, 'Loin le plus loin', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-105-c1', 'eesim-zg-105', 1, 'chorus', 'Loin le plus loin Oo loin le plus loin
Je veux toujours me tenir éloigné De mon noir passé'),
('eesim-zg-105-v1', 'eesim-zg-105', 2, 'verse', 'Mon ami pourquoi ne viens pas? Oui Seigneur?
Sur le mont où j''ai payé pour toi? Je viens Seigneur. Ref.
O Chrétien voudrais-tu retourner Oui Seigneur?
Dans la boue d''où je t''ai retiré Ou non Seigneur. Réf.'),
('eesim-zg-105-v2', 'eesim-zg-105', 3, 'verse', 'A Golgotha colline sinistre en forme de crâne
J''ai commis un sort affreux Une mort atroce
J''ai étouffé sous le poids dérangé de tes péchés'),
('eesim-zg-105-v3', 'eesim-zg-105', 4, 'verse', 'J''ai pris ton rôle Oô j''ai pris ton rôle
Pour te sauver de l''enfer éternel. Je t''ai remplacé.');

-- =====================================================
-- CANTIQUE 106: Lorsqu''on est jeune
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-106', 'eesim-zogona', 106, 'Lorsqu''on est jeune', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-106-v1', 'eesim-zg-106', 1, 'verse', 'Lorsqu''on est jeune
on aime et on rit,
On rêve de grands exploits.
Oui aime, oh jouit, dont nous sourit,
Mais n''oubliez pas faire un choix.'),
('eesim-zg-106-v2', 'eesim-zg-106', 2, 'verse', 'Vous les amis qui quel sens
a pour vous est
La vie et son dur combat?
En Christ nous trouvez la clé de ce tout,
Sa grâce affermit nos pas.'),
('eesim-zg-106-v3', 'eesim-zg-106', 3, 'verse', 'Vous les amis, pourquoi
cette peur,
Quand passe soudain la mort.
Christ c''est le grand vainqueur
Il peut rendre libre et fort.'),
('eesim-zg-106-c1', 'eesim-zg-106', 4, 'chorus', 'Jésus, "oh Jésus, en Dieu,
ton Roi,
C''est lui qui nous même
Un monde qui soit meilleur!
C''est Christ, le seul vrai Sauveur.');

-- =====================================================
-- CANTIQUE 107: Moïse
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-107', 'eesim-zogona', 107, 'Moïse', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-107-v1', 'eesim-zg-107', 1, 'verse', 'Un jour à la cour égyptienne, Moïse
Elevé comme un roi,
Pensant à ses frères qui peinaient
De son Dieu entendait la voix.'),
('eesim-zg-107-c1', 'eesim-zg-107', 2, 'chorus', 'Moïse, Moïse écoute mon appel,
Qu''il se transforme en un serpent,
Moïse, Moïse, va délivrer Israel.'),
('eesim-zg-107-v2', 'eesim-zg-107', 3, 'verse', 'Plus tard loin de la cour royale,
Tu prendras de l''eau dans le Nil
D''un buisson qui brûlait ne s''était,
Tu la verseras.
L''appelait.
Moïse ôte tes sandales,
Et l''eau que tout pied foule est saint.'),
('eesim-zg-107-v3', 'eesim-zg-107', 4, 'verse', 'Va retourne auprès de tes frères,
Dis-leur que je veux les sauver,
Nul ne restera en arrière,
Car tu vas les voir libérés.'),
('eesim-zg-107-v4', 'eesim-zg-107', 5, 'verse', 'Va jette ton bâton à terre,
Qu''il se transforme en un serpent,
A ta main se courbe de lèpre
Puis redevienne comme avant.'),
('eesim-zg-107-v5', 'eesim-zg-107', 6, 'verse', 'Tu prendras de l''eau dans le Nil
Et versera.
A terre tu la verseras.
Et l''Eau tout pourra être à l''abreuve,
En sang tout se changera.');

-- =====================================================
-- CANTIQUE 108: Ma vie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-108', 'eesim-zogona', 108, 'Ma vie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-108-v1', 'eesim-zg-108', 1, 'verse', 'Ma vie est remplie de roses
C''est un grand jardin fleuri
Je ne désire autre chose,
Que ce qui te glorifie. (bis)'),
('eesim-zg-108-v2', 'eesim-zg-108', 2, 'verse', 'Ma vie est bien peu de chose
Face à ton grand infini.
Mais je sais qu''elle repose
Sur l''amour et la folie. (bis)'),
('eesim-zg-108-v3', 'eesim-zg-108', 3, 'verse', 'Ma vie est un long poème
Qui s''élève en te voyant,
Il commence par un "je t''aime",
Et jamais il ne finira.'),
('eesim-zg-108-v4', 'eesim-zg-108', 4, 'verse', 'Ma vie est un long fleuve
Où mon soleil va et vient,
Mais dans ce périple il pleuve
Il ne l''arrête de ma vie. (bis)');

-- =====================================================
-- CANTIQUE 109: Ma vie n''est pas facile
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-109', 'eesim-zogona', 109, 'Ma vie n''est pas facile', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-109-v1', 'eesim-zg-109', 1, 'verse', 'Ma vie n''est pas facile
Car au bout du voyage
Bien des tempêtes soufflent sur ma vie.
Ma vie n''est pas facile
Mais mon Dieu m''encourage
Renouvelant chaque jour ma joie'),
('eesim-zg-109-c1', 'eesim-zg-109', 2, 'chorus', 'Non, non ma vie n''est pas facile (2)
Mais Christ marche avec moi
Il me tient la main débile
Et de mon fardeau porte le poids.'),
('eesim-zg-109-v2', 'eesim-zg-109', 3, 'verse', 'Ma vie n''est pas facile
Mes ennemis conspirent
Mais Jésus assainis le sol fertile
Que rien ne peut plus nuire
Jésus aplanit tous sous mes'),
('eesim-zg-109-v3', 'eesim-zg-109', 4, 'verse', 'Quand mon cœur est lassé
Mais le chemin est sombre
Vers le bût où je les regards
Vers la sainte cité
Où règne point ombre
Car dans la joie du ciel j''ai ma pas.');

-- =====================================================
-- CANTIQUE 110: Maranatha
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-110', 'eesim-zogona', 110, 'Maranatha', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-110-v1', 'eesim-zg-110', 1, 'verse', 'Maranatha! viens Seigneur viens
Seigneur Jésus nous tendons
Les mains vers toi
Maranatha! viens Seigneur viens
Et où tu es oh prends nous avec toi
Au grand jour de l''Éternel.'),
('eesim-zg-110-v2', 'eesim-zg-110', 2, 'verse', 'Je suis dans la joie quand on me dit
Allons à la maison du Seigneur
Les peines sont finies,
Au grand jour de l''Éternel.'),
('eesim-zg-110-v3', 'eesim-zg-110', 3, 'verse', 'Je lève les yeux vers les montagnes, d''où me viendra le secours
Le secours me vient de Dieu, Qui a fait la terre et les cieux');

-- =====================================================
-- CANTIQUE 111: Matelots en voyage
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-111', 'eesim-zogona', 111, 'Matelots en voyage', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-111-v1', 'eesim-zg-111', 1, 'verse', 'Matelots en voyage,
S''il survient un orage
Pensons alors clivage'),
('eesim-zg-111-c1', 'eesim-zg-111', 2, 'chorus', 'Notre port (bis) est au ciel
Notre port (bis) est au ciel (bis)'),
('eesim-zg-111-v2', 'eesim-zg-111', 3, 'verse', 'Que rien ne nous dérive
Vers les biens temporels,
Leur petit est faiblesses
Et décherçons qu''une rive; (bis)'),
('eesim-zg-111-v3', 'eesim-zg-111', 4, 'verse', 'Sur Jésus, douce étoile
D''un éclat immortel,
Que jamais ne ma voile,
Dirigeons notre voile; (bis)'),
('eesim-zg-111-v4', 'eesim-zg-111', 5, 'verse', 'Ch. Quand le port (bis) est au ciel
Quand le port (bis) est au ciel
Quand le port est au ciel (bis)');

-- =====================================================
-- CANTIQUE 112: Merci Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-112', 'eesim-zogona', 112, 'Merci Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-112-v1', 'eesim-zg-112', 1, 'verse', 'Merci, Seigneur, pour la lumière,
Merci pour les clairs matins,
Merci pour l''enfance entière,
Pour tes soins assidus.'),
('eesim-zg-112-v2', 'eesim-zg-112', 2, 'verse', 'Merci, Seigneur, pour tous mes
frères,
Merci pour ma vie dans cette
Merci par « l''amour » s''attire,
Tu veux pardonner'),
('eesim-zg-112-v3', 'eesim-zg-112', 3, 'verse', 'Merci, Seigneur, pour toute joie
Merci pour moi et des vois travail.
Merci car ton souci et de pîté,
Tu prends mes fardeaux.'),
('eesim-zg-112-v4', 'eesim-zg-112', 4, 'verse', 'Merci, Seigneur pour la vieillesse,
Merci pour les petits enfants,
Merci pour toutes tes promesses,
Pour les soins aimants.'),
('eesim-zg-112-v5', 'eesim-zg-112', 5, 'verse', 'Merci, Seigneur, pour ta parole
Merci par elle tu m''as instruis
Merci, car elle est ma boussole,
Elle me conduit.'),
('eesim-zg-112-v6', 'eesim-zg-112', 6, 'verse', 'Merci, Seigneur, pour ton parfait salut.
Merci dont que tu dispensés
Merci dont que tu dispensés
A tous tes élus.');

-- =====================================================
-- CANTIQUE 113: Merveilleux amour
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-113', 'eesim-zogona', 113, 'Merveilleux amour', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-113-v1', 'eesim-zg-113', 1, 'verse', 'Oh! Le grand amour de Dieu
Si vaste infini en Dieu
Voyes le Christ, le Fils de Dieu
Pour nous donnant sa vie!
Oh! l''amour si grand du Seigneur
Il doit mourir pour des pécheurs!'),
('eesim-zg-113-c1', 'eesim-zg-113', 2, 'chorus', 'Merveilleux amour
Amour de Dieu pour moi,
Merveilleux amour
De Jésus sur la croix!
Vaste autant que les océans,
Profond plus que les mers,
Haut, plus haut que l''azur des cieux
Est son amour.'),
('eesim-zg-113-v2', 'eesim-zg-113', 3, 'verse', 'Oh! le grand amour de Dieu
A moi si faible et prise péché!
Affranchi par l''Esprit de Dieu
Jésus descend sur moi Maître,
Je oh! quel grand ce proclame!
Il a donné Dieu je proclame amour pour Dieu
Aux pécheurs sa précieuse voix foi,
Et du Christ, louanges éternelles'),
('eesim-zg-113-v3', 'eesim-zg-113', 4, 'verse', 'La mort et l''immortel amour!');

-- =====================================================
-- CANTIQUE 114: Miséricorde insondable
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-114', 'eesim-zogona', 114, 'Miséricorde insondable', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-114-v1', 'eesim-zg-114', 1, 'verse', 'Miséricorde insondable!
Dieu peut-il tout pardonner?
Absoudre un si grand coupable,
Et mes péchés oublier?'),
('eesim-zg-114-c1', 'eesim-zg-114', 2, 'chorus', 'Jésus, je viens; je viens à toi!
Tel que je suis je viens à toi!
Jésus, je viens; je viens à toi!
Tel que je suis, prends-moi!'),
('eesim-zg-114-v2', 'eesim-zg-114', 3, 'verse', 'Longtemps j''ai, loin de sa face,
Provoqué son saint courroux,
Ferme mon cœur à sa grâce,
Béni je sois devant lui,
Jésus, je viens! etc.'),
('eesim-zg-114-v3', 'eesim-zg-114', 4, 'verse', 'O Jésus! à toi je cède,
Je veux être libéré;
De tout péché qui m''obsède
Etre à jamais délivré.
Jésus, je viens! etc.'),
('eesim-zg-114-v4', 'eesim-zg-114', 5, 'verse', 'Alléluia! plus de doute,
Mon fardeau est enlevé,
Pour le ciel je suis en route,
Heureux pour l''éternité.');

-- =====================================================
-- CANTIQUE 115: Mon âme apporte au Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-115', 'eesim-zogona', 115, 'Mon âme apporte au Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-115-v1', 'eesim-zg-115', 1, 'verse', 'Mon âme apporte au Seigneur
Ta prière c''est l''encensoir,
Tu le poste qu''il porte la gloire
De lui apporte ce que
De l''espace nuit de son nom
(Roi du ciel Dieu)'),
('eesim-zg-115-c1', 'eesim-zg-115', 2, 'chorus', 'Toi l''approches du Roi,
Jésus, rappelle-toi,
Que tout-puissant est ton Dieu
Et qu''il fait tout ce qu''il veut.'),
('eesim-zg-115-v2', 'eesim-zg-115', 3, 'verse', 'Souviens-toi que le ruisseau
De l''Éternel est plein d''eau
Vois, d''une source qui jaillit,
Vivifie et rafraîchit...
D''abord ôte de ton plainte
Mon péchée, Ô mon Sauveur
Libère-moi par ton sang
De ce fardeau si pesant (Ch)'),
('eesim-zg-115-v3', 'eesim-zg-115', 4, 'verse', 'Révèle en-moi ton pouvoir,
Tout ce que tu veux de moi,
augmente, augmente ma foi!
Nourris-moi de ton amour
Que j''en vive chaque jour,
Oui, sois mon guide, mon gardien.
Oh! Tiens ma main dans la main! (ch)');

-- =====================================================
-- CANTIQUE 116: Mon âme exalte le Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-116', 'eesim-zogona', 116, 'Mon âme exalte le Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-116-v1', 'eesim-zg-116', 1, 'verse', 'Mon âme exalte le Seigneur,
Et mon esprit se réjouit en Dieu
Mon Sauveur
Parce qu''il a jeté les yeux
la bassesse de sa servante.'),
('eesim-zg-116-v2', 'eesim-zg-116', 2, 'verse', 'Car voici désormais toutes les
générations, me diront bienheureuse
Car le Tout-Puissant a fait
Pour moi de grandes choses.
Mon âme exalte le Seigneur
Son nom est saint et sa miséricorde
S''étend d''âge en âge sur ceux
Qui le craignent.');

-- =====================================================
-- CANTIQUE 117: Mon cœur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-117', 'eesim-zogona', 117, 'Mon cœur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-117-v1', 'eesim-zg-117', 1, 'verse', 'Mon cœur voudrait t''aimer,
Assez t''aimer
Pour pouvoir accepter,
Tout accepter:
La souffrance et la peine,
L''injustice et la haine.
Je veux assez t''aimer
Pour tout accepter'),
('eesim-zg-117-v2', 'eesim-zg-117', 2, 'verse', 'Mon cœur voudrait t''aimer
Assez t''aimer,
Pour pouvoir accepter,
Tout accepter,
Quand je ne puis t''entendre,
Accepter sans comprendre.
Je veux assez t''aimer
Pour tout accepter');

-- =====================================================
-- CANTIQUE 118: Mon Dieu est si bon
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-118', 'eesim-zogona', 118, 'Mon Dieu est si bon', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-118-v1', 'eesim-zg-118', 1, 'verse', 'Mon Dieu est si bon,
Mon Dieu est si bon
Quoiqu''en moi de raison');

-- =====================================================
-- CANTIQUE 119: Mon Dieu plus près de toi
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-119', 'eesim-zogona', 119, 'Mon Dieu plus près de toi', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-119-v1', 'eesim-zg-119', 1, 'verse', 'Mon Dieu plus près de toi
Plus près de toi,
C''est le cri de ma foi,
Plus près de toi.');

-- =====================================================
-- CANTIQUE 120: Ne crains rien je t''aime
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-120', 'eesim-zogona', 120, 'Ne crains rien je t''aime', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-120-v1', 'eesim-zg-120', 1, 'verse', 'Ne crains rien je t''aime
Car le Fils de Dieu te répond ainsi.');

-- =====================================================
-- CANTIQUE 121: Noël, Noël chantons Noël
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-121', 'eesim-zogona', 121, 'Noël, Noël chantons Noël', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-121-v1', 'eesim-zg-121', 1, 'verse', 'Grand'' Dieu, tu es le Fils de Dieu,
Elu appelant.
Viens boire au lieu du Sauveur,
Doux et si plaisiant.'),
('eesim-zg-121-c1', 'eesim-zg-121', 2, 'chorus', 'Oh Noël! Noël! Chantons Noël!
Pour Dieu et les hommes,
Pour nous aujourd''hui c''est Noël!
Noël pour notre salut!');

-- =====================================================
-- CANTIQUE 122: Nombreux comme la sable des plages
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-122', 'eesim-zogona', 122, 'Nombreux comme la sable des plages', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-122-v1', 'eesim-zg-122', 1, 'verse', 'Nombreux comme le sable des plages
Tes bienfaits oh glorieux
Tu m''offres un si grand héritage
Et tes bienfaits sont si précieux.'),
('eesim-zg-122-v2', 'eesim-zg-122', 2, 'verse', 'Nombreux comme le sable des plages ! etc
Comme il pleut en trois foires,
Aussi nombreux que la voûte des deux
Est son amour pour moi.');

-- =====================================================
-- CANTIQUE 123: Notre divin et Maître
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-123', 'eesim-zogona', 123, 'Notre divin et Maître', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-123-v1', 'eesim-zg-123', 1, 'verse', 'C''est fait, tout est accompli,
Le Fils de Dieu est au Calvaire,
Son sang coula sur le Calvaire,
Il est à moi, je suis à lui,
Quel beau jour ce sera!');

-- =====================================================
-- CANTIQUE 124: Nous allons de villes en villages
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-124', 'eesim-zogona', 124, 'Nous allons de villes en villages', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-124-c1', 'eesim-zg-124', 1, 'chorus', 'Nous allons de villes en villages
Nous servons notre Père les Dieu suprême
Nous avons vécu les bons hommes');

-- =====================================================
-- CANTIQUE 125: Nous venons dans ta maison
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-125', 'eesim-zogona', 125, 'Nous venons dans ta maison', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-125-v1', 'eesim-zg-125', 1, 'verse', 'Nous venons dans ta maison
Et nous nous assemblons pour t''adorer.
Nous venons dans ta maison
Et nous nous assemblons pour t''adorer Jésus,
T''adorer, te louer, Seigneur!'),
('eesim-zg-125-v2', 'eesim-zg-125', 2, 'verse', 'Tu nous donnes ta justice
Et tu nous affranchis, pour t''adorer. (bis)
Et tu nous affranchis, pour t''adorer Jésus,
T''adorer, te louer, Seigneur!'),
('eesim-zg-125-v3', 'eesim-zg-125', 3, 'verse', 'Nous levons nos mains vers toi (bis)
Et nous te contemplons, pour t''adorer.
Et nous te contemplons, pour t''adorer Jésus,
T''adorer, te louer, Seigneur!'),
('eesim-zg-125-v4', 'eesim-zg-125', 4, 'verse', 'Nous élevons des mains pures
Et nous nous approchons, pour t''adorer. (bis)
Et nous nous approchons, pour t''adorer Jésus,
T''adorer, te louer, Seigneur!');

-- =====================================================
-- CANTIQUE 126: O jour heureux
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-126', 'eesim-zogona', 126, 'O jour heureux', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-126-v1', 'eesim-zg-126', 1, 'verse', 'O jour heureux, jour de bonheur,
Lumière, paix, joie ineffable!
Au Fils de Dieu, saint, adorable,
A Jésus, j''ai donné mon cœur.'),
('eesim-zg-126-c1', 'eesim-zg-126', 2, 'chorus', 'Quel beau jour! Quel beau jour!
Oui d''un Sauveur j''ai reçu l''amour!
Jésus, dans ma nouvelle patrie,
Il m''accueille et tout prix.
Quel beau jour! Quel beau jour!
Oui d''un Sauveur j''ai le l''amour.'),
('eesim-zg-126-v2', 'eesim-zg-126', 3, 'verse', 'Oh! comprenez mon bonheur soit
C''est en Jésus Dieu de paix,
La vie éternelle il la donne;
Pourquoi donc le craindrai-je? O mon!'),
('eesim-zg-126-v3', 'eesim-zg-126', 4, 'verse', 'Au ciel des chants ont retenti!
Alléluia! demande aux anges;
Entonnons de saintes louanges,
Car un pécheur s''est converti.');

-- =====================================================
-- CANTIQUE 127: O toi dont les bienfaits
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-127', 'eesim-zogona', 127, 'O toi dont les bienfaits', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-127-v1', 'eesim-zg-127', 1, 'verse', 'O toi dont les bienfaits!
O Dieu de paix
Pour tous tes présents
S''unissent les enfants;
Ecoute leurs accents reconnaissants'),
('eesim-zg-127-v2', 'eesim-zg-127', 2, 'verse', 'Pour combler les faveurs;
O Dieu, rends-nous meilleurs!
Change nos cœurs
Nous voulons te bénir
Nous voulons te servir,
Et mettre à t''obéir
Notre plaisir.');

-- =====================================================
-- CANTIQUE 128: O vous qui n''avez pas la paix
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-128', 'eesim-zogona', 128, 'O vous qui n''avez pas la paix', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-128-v1', 'eesim-zg-128', 1, 'verse', 'O vous qui n''avez pas la paix
Pure, profonde et pour jamais;
Venez, Jésus chargé.'),
('eesim-zg-128-v2', 'eesim-zg-128', 2, 'verse', 'Qu''à toi seul remplit un cœur
Il déborde de bonheur,
Il offre ne t''atteint plus,
Jésus, Jésus, Jésus!'),
('eesim-zg-128-v3', 'eesim-zg-128', 3, 'verse', 'Vous qui tombez à chaque pas
Venez, Jésus délivre;
Celui qui se jette en ses bras
Peut le suivre et vivre.'),
('eesim-zg-128-v4', 'eesim-zg-128', 4, 'verse', 'Vous tous qui souffrent isolés
Venez, Jésus vous aime.
Pour le troupeau des esseulés
Il s''offrit lui-même.');

-- =====================================================
-- CANTIQUE 129: O quel bonheur de le connaître
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-129', 'eesim-zogona', 129, 'O quel bonheur de le connaître', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-129-v1', 'eesim-zg-129', 1, 'verse', 'Oh! Quel bonheur de le connaître.
L''ami qui ne saurait changer,
De l''avoir ici-bas pour Maître,
Pour défenseur et pour berger!'),
('eesim-zg-129-c1', 'eesim-zg-129', 2, 'chorus', 'Chantons, chantons d''un cœur joyeux
Le grand amour du Rédempteur,
Qui vint à nous du haut des cieux
Et nous sauva de toute erreur.'),
('eesim-zg-129-v2', 'eesim-zg-129', 3, 'verse', 'Dans la misère et l''ignorance
Nous nous débattions chrétiens garçons
Dans un cœur, l''âme en ma conscience,
Quand à nous vint le Fils de roi.'),
('eesim-zg-129-v3', 'eesim-zg-129', 4, 'verse', 'Il nous apporte la lumière,
La victoire et liberté;
Pour toujours chasser la faim.
Par à nos pieds dans l''épreuve
De ses pieds sur notre chemin.');

-- =====================================================
-- CANTIQUE 130: Oh toi qui cherche la paix
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-130', 'eesim-zogona', 130, 'Oh toi qui cherche la paix', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-130-v1', 'eesim-zg-130', 1, 'verse', 'Oh toi qui cherche la paix
Le monde ne peut te la donner
en Jésus la connais
Lui seul peut te donner la vraie paix.'),
('eesim-zg-130-c1', 'eesim-zg-130', 2, 'chorus', 'Mon ami comment recherches-tu la paix
Dans les plaisirs, la paix, s''éloigne
En fuyant Dieu, la paix s''éteint
Tu reviendras à Jésus qui t''invite
Suite à son salut.');

-- =====================================================
-- CANTIQUE 131: Oh La paix que Jésus donne
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-131', 'eesim-zogona', 131, 'Oh La paix que Jésus donne', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-131-v1', 'eesim-zg-131', 1, 'verse', 'Oh la paix que Jésus donne,
C''est la paix que Jésus donne,
Toi à ton chemin rayonne
Vers et son mon Maître
Vient donner dans un cœur'),
('eesim-zg-131-v2', 'eesim-zg-131', 2, 'verse', 'Sa puissance souveraine
Maintenant règne sur moi,
Du péché brise la chaîne,
Me rend vainqueur par la foi.'),
('eesim-zg-131-v3', 'eesim-zg-131', 3, 'verse', 'Et tranquillement j''avance,
M''appuyant sur mon Sauveur.
Sa douce présence
Me donne le vrai bonheur.');

-- =====================================================
-- CANTIQUE 132: Oh Qu''il est doux pour des frères
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-132', 'eesim-zogona', 132, 'Oh Qu''il est doux pour des frères', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-132-c1', 'eesim-zg-132', 1, 'chorus', 'Oh Qu''il est doux pour des frères
De demeurer ensemble,
Dans l''unité, dans la prière,
C''est le ciment qui rassemble.'),
('eesim-zg-132-v1', 'eesim-zg-132', 2, 'verse', 'C''est comme l''onction
Qui descend sur la tête,
Qui descend d''Aaron,
Et la robe de prêtre. (ch)'),
('eesim-zg-132-v2', 'eesim-zg-132', 3, 'verse', 'C''est comme l''Hermon
Qui baigne de la rosée.
Les monts de Sion
Dans la fraîche ondée. (ch)'),
('eesim-zg-132-v3', 'eesim-zg-132', 4, 'verse', 'C''est la que descend,
Sur son peuple qui prie,
Le souffle puissant
Du Saint-Esprit de vie. (ch)');

-- =====================================================
-- CANTIQUE 133: On l''appellera Emmanuel
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-133', 'eesim-zogona', 133, 'On l''appellera Emmanuel', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-133-v1', 'eesim-zg-133', 1, 'verse', 'Dans une étable, un enfant nous est né
Regardez, oh qu''il est mignon et!
On l''appellera Emmanuel,
Dieu avec nous, Noël, Noël!'),
('eesim-zg-133-v2', 'eesim-zg-133', 2, 'verse', 'Dans une crèche, le Fils nous est donné,
Il règnera sur les nations.
On l''appellera Emmanuel,
Dieu avec nous, Noël, Noël!'),
('eesim-zg-133-v3', 'eesim-zg-133', 3, 'verse', 'Peuples du monde, approchez-vous de lui,
Car Dieu il est venu pour nous sauver!
On l''appellera Emmanuel,
Dieu avec nous, Noël, Noël!');

-- =====================================================
-- CANTIQUE 134: On n''a pas le temps
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-134', 'eesim-zogona', 134, 'On n''a pas le temps', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-134-c1', 'eesim-zg-134', 1, 'chorus', 'Dans ce monde qui, souvent, Tourne trop vite,
On n''a pas le temps de penser à Dieu,
A ce Dieu qui jour après jour, Nous invite,
A prendre place près de lui, Dans les cieux.'),
('eesim-zg-134-v1', 'eesim-zg-134', 2, 'verse', 'On n''a pas le temps (pas le temps)
Quand on a 20 ans.
Alors qu''on respire (pas le temps)
La fureur de vivre.
On n''a pas le temps (pas le temps)
Quand on a 40 ans,
On pense souvent à sa femme
Et ses enfants.'),
('eesim-zg-134-v2', 'eesim-zg-134', 3, 'verse', 'On n''a pas le temps (pas le temps)
Quand on a 60 ans,
On est malheureux (pas le temps)
Et l''on se sent vieux (pas le temps)
On n''a pas le temps (pas le temps)
Quand on a 100 ans,
On voudrait bien croire
Mais alors il est trop tard.');

-- =====================================================
-- CANTIQUE 135: Où cherchez-vous le bonheur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-135', 'eesim-zogona', 135, 'Où cherchez-vous le bonheur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-135-v1', 'eesim-zg-135', 1, 'verse', 'Où cherchez-vous le bonheur...
En vain où tout passe?
Pauvre cœur...
Pour votre Sauveur,
N''avez-vous point de place? bis'),
('eesim-zg-135-v2', 'eesim-zg-135', 2, 'verse', 'S''il a souffert, c''est pour vous,
Oh! merveilleuse grâce!
Lorsqu''il luttait à genoux,
Dieu lui voilait sa face.
Ah! de sa sublime croix,
Qui vous dit: Pauvre pécheur,
N''as-tu point de place? bis
N''avez-vous point de place? bis');

-- =====================================================
-- CANTIQUE 136: Oui le bonheur et la grâce
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-136', 'eesim-zogona', 136, 'Oui le bonheur et la grâce', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-136-v1', 'eesim-zg-136', 1, 'verse', 'Pèlerin, j''errais loin de mon père,
Dans fond de la nuit du péché,
Maintenant je vis dans la lumière
Du bon berger qui m''a retrouvé.'),
('eesim-zg-136-c1', 'eesim-zg-136', 2, 'chorus', 'Oui, le bonheur et la grâce m''accompagneront (bis)
Tous les jours, tous les jours de ma vie.
J''habiterai dans la maison de l''Éternel,
J''habiterai dans la maison du Père.
Oui, le bonheur et la grâce m''accompagneront,
Tous les jours, tous les jours de ma vie (bis)'),
('eesim-zg-136-v2', 'eesim-zg-136', 3, 'verse', 'Il me conduit près des sources calmes,
Je me repose dans son amour.
Chaque jour il restaure mon âme,
Et dans ses sentiers j''ai le secours.'),
('eesim-zg-136-v3', 'eesim-zg-136', 4, 'verse', 'Dans la vallée de l''ombre
de la mort,
Je ne crains aucun mal, Tu es là;
Je suis environs de ton bras fort,
Et ma coupe déborde de joie!');

-- =====================================================
-- CANTIQUE 137: Par amour
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-137', 'eesim-zogona', 137, 'Par amour', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-137-v1', 'eesim-zg-137', 1, 'verse', 'Par et, saint le Fils de Dieu
Laissant la gloire de son royaume,
Prit la forme d''un simple homme
Pour nous ouvrir les portes des cieux
Justice du Père, Dieu regardant avec amour
L''humanité dans sa misère, Envoya son Fils un jour'),
('eesim-zg-137-c1', 'eesim-zg-137', 2, 'chorus', 'Mais nous l''avons saisi,
Avec cloué sur la croix
Et nous l''avons laissé souffrir... Mourir sur cette:
Son sang coula sur la terre ce jour la
Payant le compte du monde, Qui ainsi le traita'),
('eesim-zg-137-v2', 'eesim-zg-137', 2, 'verse', 'Parmi les hommes, Paix sur la terre,
C''est ce que les anges chantèrent;
Amour et miséricorde,
Du cœur de notre Dieu débordent'),
('eesim-zg-137-v3', 'eesim-zg-137', 3, 'verse', 'C''est avec joie qu''il vient enlever tous nos fardeaux
C''est avec joie qu''il vient pour nous libérer;
C''est dans la paix qu''il vient nous donner le vrai repos
C''est par amour qu''il met en nous sa beauté.');

-- =====================================================
-- CANTIQUE 138: Par les monts, les plaines, les vallées
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-138', 'eesim-zogona', 138, 'Par les monts, les plaines, les vallées', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-138-v1', 'eesim-zg-138', 1, 'verse', 'Par les monts, les plaines, les
vallées
Un ami me parle et m''appelle.
Ses bontés pour moi sont dévoilées
Et sa voix me soutient jour et nuit.
Le berger qui s''est donné lui-même
Maintenant vit pour l''Éternité
Ses brebis il connaît et les aime
Dans sa grande fidélité. (bis)'),
('eesim-zg-138-v2', 'eesim-zg-138', 2, 'verse', 'Il connaît les besoins de mon âme,
Nous chute de chaque jour.
Sévère en ses exigences,
Il est riche en son amour.'),
('eesim-zg-138-v3', 'eesim-zg-138', 3, 'verse', 'Tendre ami, Jésus mon espérance,
Avec toi, je suivrai mon chemin.
A travers la joie et la souffrance,
J''ai la paix quand tu tais ma main.
Et bientôt, lorsque sonnera l''heure
De partir pour le céleste lieu
Dans les bras tendre ami que je meure,
Pour me réveiller près de Dieu. (bis)');

-- =====================================================
-- CANTIQUE 139: Par tous les saints glorifiés
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-139', 'eesim-zogona', 139, 'Par tous les saints glorifiés', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-139-v1', 'eesim-zg-139', 1, 'verse', 'Par les saints louange
Par les célestes anges
Que les chanting des anges
S''unissent à l''Agneau (ter) sacrifié'),
('eesim-zg-139-v2', 'eesim-zg-139', 2, 'verse', 'C''est par lui qui justifié
Plus pécheur de demande gêné
Plus pécheur devant sa face,
Gloire à l''Agneau (ter) sacrifié'),
('eesim-zg-139-v3', 'eesim-zg-139', 3, 'verse', 'Par le Père magnifié
Tout a avec lui rend hommage
L''Agneau règnera d''âge en âge,
Gloire à l''Agneau (ter) sacrifié'),
('eesim-zg-139-v4', 'eesim-zg-139', 4, 'verse', 'Par son Esprit vivifié,
Je veux jusqu''à ma dernière heure
Chanter l''amour qui seul demeure,
Gloire à l''Agneau (ter) sacrifié');

-- =====================================================
-- CANTIQUE 140: Partout, la joie de Noël
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-140', 'eesim-zogona', 140, 'Partout, la joie de Noël', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-140-c1', 'eesim-zg-140', 1, 'chorus', 'Ah! Si le monde pouvait chanter,
Chanter ce jour de Noël,
Ah! si tout le monde pouvait fêter
Le Sauveur venu du ciel...'),
('eesim-zg-140-v1', 'eesim-zg-140', 2, 'verse', 'Pour les parents, pour les enfants,
Oui, pour chacun ce serait la vraie joie!
Dans les hôpitaux, dans les foyers,
Partout viendrait la paix de Noël. (Réf)'),
('eesim-zg-140-v2', 'eesim-zg-140', 3, 'verse', 'Pour nos amis, nos ennemis,
Oui, pour chacun ce serait la vraie joie!
Dans les prisons, les hôpitaux,
Partout viendrait la paix de Noël. (Ref)'),
('eesim-zg-140-v3', 'eesim-zg-140', 4, 'verse', 'Pour nos amis, nos ennemis,
Oui, pour chacun ce serait la vraie joie!
Dans le pays, ou loin d''ici,
Partout viendrait la paix de Noël. (Ref)');

-- =====================================================
-- CANTIQUE 141: Pour cet immense bonheur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-141', 'eesim-zogona', 141, 'Pour cet immense bonheur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-141-v1', 'eesim-zg-141', 1, 'verse', 'Pour cet immense bonheur, alléluia!
Que tu as mis dans mon cœur, alléluia!
Je veux te chanter Seigneur, alléluia!
Oui, Jésus est mon Sauveur, alléluia!
Je te redis encore une fois, alléluia!
Que pour moi Jésus est mort, alléluia!'),
('eesim-zg-141-v2', 'eesim-zg-141', 2, 'verse', 'Voilà pourquoi je l''adore, alléluia!
Lui seul est mon trésor, alléluia!
Que chaque jour à chaque heure alléluia!
En moi tu as ta demeure, alléluia!
Que ma vie soit une fleur, alléluia!
Un parfum pour toi Seigneur, alléluia!');

-- =====================================================
-- CANTIQUE 142: Pour transformer une vie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-142', 'eesim-zogona', 142, 'Pour transformer une vie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-142-v1', 'eesim-zg-142', 1, 'verse', 'Pour transformer une vie, construire une maison
Pour transformer une vie, il faut un très bon maçon
Il faut bien le choisir mais il faut aussi
Afin de maintenir ce qu''on a décidé'),
('eesim-zg-142-v2', 'eesim-zg-142', 2, 'verse', 'Afin de maintenir ce qu''on a décidé
Marcher vers l''avenir Jésus à tes côtés
Marcher vers l''avenir Jésus à tes côtés
Il saura te conduire dans son éternité
Il va bientôt revenir alors seras-tu prêt?
Pour transformer une vie construire une maison
Pour transformer une vie Jésus est le seul maçon.');

-- =====================================================
-- CANTIQUE 143: Pourquoi crains-tu mon âme?
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-143', 'eesim-zogona', 143, 'Pourquoi crains-tu mon âme?', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-143-v1', 'eesim-zg-143', 1, 'verse', 'Pourquoi crains-tu mon âme? (bis)
Au fond de la souffrance?
Le Seigneur est là!
Un appui, ton instance,
J''élève en haut,
J''élève les yeux,
Il est la délivrance,
Il est la seule paix.
Mon âme ne crains rien.'),
('eesim-zg-143-v2', 'eesim-zg-143', 2, 'verse', 'Qu''il me faille affronter,
Tourments, combats, épreuves
Passer par le creuset,
Où l''on affine l''or,
Errer dans la fournaise
Ou traverser les fleuves.
Il reste mon trésor.'),
('eesim-zg-143-v3', 'eesim-zg-143', 3, 'verse', 'Non je ne craindrai rien!
Ni Satan, ni le monde,
La pauvreté, du bien bon berger.
Au charité à moi profonde,
A l''abri du danger.'),
('eesim-zg-143-v4', 'eesim-zg-143', 4, 'verse', 'Mon Dieu, je ne te présente
Rien que le sang de Jésus
Rien ce ni me contente,
Rien que le sang de Jésus! Ch.'),
('eesim-zg-143-v5', 'eesim-zg-143', 5, 'verse', 'Je n''ai pour toute espérance
Rien que le sang de Jésus
Appui! pour confiance,
Rien que le sang de Jésus!');

-- =====================================================
-- CANTIQUE 144: Publiez bien haut la grande nouvelle
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-144', 'eesim-zogona', 144, 'Publiez bien haut la grande nouvelle', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-144-v1', 'eesim-zg-144', 1, 'verse', 'Publiez bien haut la grande nouvelle
Le ciel est ouvert à tout être humain.
La route est tracée, un guide fidèle
Vous conduira par la main jusqu''à la fin.'),
('eesim-zg-144-c1', 'eesim-zg-144', 2, 'chorus', 'Le salut pour tous le salut par grâce.
A tous est offert, à tous est donné
Oh! Venez, pécheurs, venez, le temps passe.
Et vous serez pardonnés.'),
('eesim-zg-144-v2', 'eesim-zg-144', 3, 'verse', 'Publiez bien haut la grande nouvelle:
Le sang de la croix a tout effacé
Où que vous soyez, c''est vous qu''il appelle,
Vous qui l''avez offensé.'),
('eesim-zg-144-v3', 'eesim-zg-144', 4, 'verse', 'Publiez bien haut la grande nouvelle:
Au loin comme au près faites-la connaître,
Partout où se trouve une âme rebelle,
Un pécheur à secourir. Ch.');

-- =====================================================
-- CANTIQUE 145: Qu''il fait bon à ton service
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-145', 'eesim-zogona', 145, 'Qu''il fait bon à ton service', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-145-v1', 'eesim-zg-145', 1, 'verse', 'Qu''il fait bon à ton service
Jésus mon Sauveur!
Qu''il est doux le sacrifice
Qui m''offre mon cœur!'),
('eesim-zg-145-c1', 'eesim-zg-145', 2, 'chorus', 'Prends, ô Jésus, prends ma vie,
Elle est toute à toi
Et dans la grâce infinie,
Elle me conduit.'),
('eesim-zg-145-v2', 'eesim-zg-145', 3, 'verse', 'Mon désir mon suprême,
Rien je ne veux et je n''aime
Que ta volonté.'),
('eesim-zg-145-v3', 'eesim-zg-145', 4, 'verse', 'Comme l''ange au rai rapide
Je veux toujours obéir,
Les yeux fixés sur mon guide,
Toujours obéir.');

-- =====================================================
-- CANTIQUE 146: Quand j''ai le cœur tourmenté
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-146', 'eesim-zogona', 146, 'Quand j''ai le cœur tourmenté', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-146-v1', 'eesim-zg-146', 1, 'verse', 'Quand j''ai le cœur tourmenté,
Je lève ma voix est revenue.
Quand un ami m''a quitté,
Pour le monde dans sa vie
Je lève les yeux vers Jésus,
Je lève les yeux vers Jésus.'),
('eesim-zg-146-c1', 'eesim-zg-146', 2, 'chorus', 'Vers le ciel, vers Jésus, (bis)
Je lève les yeux vers Jésus,
Je lève les yeux vers Jésus.'),
('eesim-zg-146-v2', 'eesim-zg-146', 2, 'verse', 'Quand l''espoir est revenue.
Je lève les yeux vers le ciel.
Pour la paix du genre humain.
Je lève les yeux vers le ciel
Je lève les yeux vers Jésus,
Je lève les yeux vers Jésus.');

-- =====================================================
-- CANTIQUE 147: Quand je vois la vie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-147', 'eesim-zogona', 147, 'Quand je vois la vie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-147-v1', 'eesim-zg-147', 1, 'verse', 'Quand je vois la vie, joyeux je m''écris
Chante et prie (bis)
Car tous mes péchés Jésus les a pris
Chante et prie (bis)'),
('eesim-zg-147-c1', 'eesim-zg-147', 2, 'chorus', 'Chante, chante, chante et prie (ter)
Oh qu''elle est belle la vie'),
('eesim-zg-147-v2', 'eesim-zg-147', 3, 'verse', 'A Jésus je vais chaque matin
Chante et prie (bis)
Il est toujours là il me tient la main
Chante et prie (bis) Réf.');

-- =====================================================
-- CANTIQUE 148: Quand Jésus suivit le chemin de la croix
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-148', 'eesim-zogona', 148, 'Quand Jésus suivit le chemin de la croix', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-148-v1', 'eesim-zg-148', 1, 'verse', 'Quand Jésus suivit le chemin de la croix.
C''était pour moi (bis) bis
Pour me délivrer de mon terrible sort
Jésus est mort pour moi.'),
('eesim-zg-148-v2', 'eesim-zg-148', 2, 'verse', 'Quand Jésus suivit le chemin de la croix
C''était pour toi (bis)
Pour te délivrer de ton terrible sort
Jésus est mort pour toi.'),
('eesim-zg-148-v3', 'eesim-zg-148', 3, 'verse', 'Quand Jésus suivit le chemin de la croix
C''était pour lui (bis)
Pour le délivrer de son terrible sort
Jésus est mort pour lui.'),
('eesim-zg-148-v4', 'eesim-zg-148', 4, 'verse', 'Jésus est mort pour......
C''était pour nous......
C''était pour vous......');

-- =====================================================
-- CANTIQUE 149: Quand les trompettes célestes
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-149', 'eesim-zogona', 149, 'Quand les trompettes célestes', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-149-v1', 'eesim-zg-149', 1, 'verse', 'Quand les trompettes célestes
Sonneront la fin des temps,
Quand poindra l''aurore du jour éternel
Quand les livres s''ouvriront la haut
Pour le grand jugement,
Pourrons-nous répondre à l''appel.
Je suis prêt. (Je suis prêt)!'),
('eesim-zg-149-c1', 'eesim-zg-149', 2, 'chorus', 'Quand viendra l''heure suprême, j''ter
Quand retentira l''appel, Je suis prêt.'),
('eesim-zg-149-v2', 'eesim-zg-149', 3, 'verse', 'Oh! le glorieux réveil,
Quand les morts en Christ reviendront,
Quand ses bien-aimés prendront place
Au festin, (au festin)
Vers les hymnes de victoire
Vers l''Agneau s''élèveront,
Pour y joindre ta voix sans fin.
Es-tu prêt? (es-tu prêt?)');

-- =====================================================
-- CANTIQUE 150: Que c''est merveilleux
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-150', 'eesim-zogona', 150, 'Que c''est merveilleux', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-150-v1', 'eesim-zg-150', 1, 'verse', 'Que c''est merveilleux, merveilleux,
D''abandonner le monde, de suivre Dieu.
Devenir l''ami du Seigneur Jésus,
Que c''est merveilleux, merveilleux!'),
('eesim-zg-150-v2', 'eesim-zg-150', 2, 'verse', 'Que c''est merveilleux, merveilleux,
D''être libéré de mes péchés.
Devenir le fils de Seigneur Jésus,
Que c''est merveilleux, merveilleux!'),
('eesim-zg-150-v3', 'eesim-zg-150', 3, 'verse', 'Que c''est merveilleux, merveilleux!
D''être né de Dieu et justifié
Par le sang de Christ, du Seigneur Jésus,
Que c''est merveilleux, merveilleux!');

-- =====================================================
-- CANTIQUE 151: Quel ami fidèle et tendre
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-151', 'eesim-zogona', 151, 'Quel ami fidèle et tendre', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-151-v1', 'eesim-zg-151', 1, 'verse', 'Quel ami fidèle et tendre
Nous avons en Jésus-Christ,
Toujours prêt à nous entendre,
A répondre à notre cri!'),
('eesim-zg-151-v2', 'eesim-zg-151', 2, 'verse', 'Quel ami fidèle et tendre
Nous avons en Jésus-Christ,
Il connaît nos défaillances,
Nos chutes de chaque jour.
Sévère en ses exigences,
Il est riche en son amour.'),
('eesim-zg-151-v3', 'eesim-zg-151', 3, 'verse', 'Quel ami fidèle et tendre
Nous avons en Jésus-Christ,
Quand sommes-nous encor à craindre
Disons-lui tout nos crier,
Bientôt ses paroles saintes,
Nous rendons le vrai bonheur.'),
('eesim-zg-151-v4', 'eesim-zg-151', 4, 'verse', 'Quel ami fidèle et tendre
Nous avons en Jésus-Christ,
Nous avons en Jésus-Christ
Toujours prêt à nous comprendre
A vaincre, en le conquérant
S''il nous voit vrais et sincères
A chercher la sainteté.
Il écoute nos prières
Et nous met en liberté.');

-- =====================================================
-- CANTIQUE 152: Que donc dans le ciel est semblable à toi
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-152', 'eesim-zogona', 152, 'Que donc dans le ciel est semblable à toi', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-152-c1', 'eesim-zg-152', 1, 'chorus', 'Qui donc dans le ciel
est semblable à toi? toi, (bis)
C''est toi puissant comme Roi. (bis)'),
('eesim-zg-152-v1', 'eesim-zg-152', 2, 'verse', 'Tu es Adonaï Shamna,
Qui tu entends, tu réponds.
Tu es Adonaï Shladon,
Dieu pour pour tous les hommes.'),
('eesim-zg-152-v2', 'eesim-zg-152', 3, 'verse', 'El Shaddaï, Dieu tout puissant,
Tu protèges, Et Tu nourris,
El Olam, Dieu Éternel,
El Haï, tu es vivant.');

-- =====================================================
-- CANTIQUE 153: Qui me relève dans mes chutes?
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-153', 'eesim-zogona', 153, 'Qui me relève dans mes chutes?', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-153-v1', 'eesim-zg-153', 1, 'verse', 'Qui me relève dans mes chutes?
C''est Jésus-Christ
Qui combat pour moi dans mes luttes?
C''est Jésus-Christ
Je suis parle, je veux croire
Que je pris lutter pour sa gloire,
Car mon bonheur, ma victoire,
C''est Jésus-Christ.'),
('eesim-zg-153-v2', 'eesim-zg-153', 2, 'verse', 'Je vais à mon Père, et ma voie
Je suis bienheureux, et ma joie
C''est Jésus-Christ
Et même dans la souffrance,
Mon cœur parle, j''ai mis ma confiance
En Jésus-Christ.'),
('eesim-zg-153-v3', 'eesim-zg-153', 3, 'verse', 'Sauvé! ne me glorifie
Qu''en Jésus glorifie
Pour la terre et le ciel, ma vie
C''est Jésus-Christ.');

-- =====================================================
-- CANTIQUE 154: Rédempteur adorable
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-154', 'eesim-zogona', 154, 'Rédempteur adorable', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-154-v1', 'eesim-zg-154', 1, 'verse', 'Rédempteur adorable
Sur ta croix attachée.
Toutes ces meurtrières,
Comprends-le c''est pour toi.
J''ai été la souffrance,
J''ai porté ta langueur,
Contemple en assurance
Ta grande libérateur.'),
('eesim-zg-154-v2', 'eesim-zg-154', 2, 'verse', 'Le sang de tes blessures.
Ma couronne de roi,
Toutes ces meurtrières,
Comprends-le c''est pour toi.
J''ai subi la souffrance,
J''ai porté ta langueur,
Contemple en assurance
Ta grande libérateur.');

-- =====================================================
-- CANTIQUE 155: Reste avec nous Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-155', 'eesim-zogona', 155, 'Reste avec nous Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-155-v1', 'eesim-zg-155', 1, 'verse', 'Reste avec nous Seigneur, le jour décline,
La nuit s''approche et nous menace tous;
Nous implorons ta présence divine;
Reste avec nous, Seigneur, reste avec nous.'),
('eesim-zg-155-v2', 'eesim-zg-155', 2, 'verse', 'En toi nos cœurs ont salué leur Maître,
Et notre âme à trouver son Epoux,
A ta lumière elle se sent renaître;
Reste avec nous, Seigneur, reste avec nous.'),
('eesim-zg-155-v3', 'eesim-zg-155', 3, 'verse', 'Dans nos combats si ta main nous délaisse
Satan vainqueur nous tiendra sous ses coups;
Que ta puissance arme notre faiblesse.
Reste avec nous, Seigneur, reste avec nous.'),
('eesim-zg-155-v4', 'eesim-zg-155', 4, 'verse', 'Sous ton regard la joie est sainte et bonne,
Près de ton cœur les pleurs même sont doux;
Soit que ta main nous couronne,
Reste avec nous, Seigneur, reste avec nous.');

-- =====================================================
-- CANTIQUE 156: Retour d''Emmanuel
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-156', 'eesim-zogona', 156, 'Retour d''Emmanuel', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-156-c1', 'eesim-zg-156', 1, 'chorus', 'Reviens Emmanuel, Emmanuel, Emmanuel
Reviens Emmanuel, Emmanuel, Reviens.'),
('eesim-zg-156-v1', 'eesim-zg-156', 2, 'verse', 'Entends-tu la voix qui t''appelle (ter) Aujourd''hui
Reconnais-tu la voix qui t''appelle (ter) Aujourd''hui
C''est Jésus, Jésus qui t''appelle (ter) Aujourd''hui
Oh Seigneur je veux te suivre (ter) Pour la vie.');

-- =====================================================
-- CANTIQUE 157: Rien ne peut sauver mon âme
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-157', 'eesim-zogona', 157, 'Rien ne peut sauver mon âme', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-157-v1', 'eesim-zg-157', 1, 'verse', 'Rien ne peut sauver mon âme
Rien que le sang de Jésus! (bis)
Pour crier che me réclame,
Rien que le sang de Jésus!'),
('eesim-zg-157-c1', 'eesim-zg-157', 2, 'chorus', 'Précieux sang de l''Agneau,
Qui me donne un cœur nouveau;
Rien d''autre, je ne veux plus
Rien que le sang de Jésus!'),
('eesim-zg-157-v2', 'eesim-zg-157', 3, 'verse', 'Pour mon pardon je ne puis
Rien que le sang de Jésus
Pour mon salut et ma croix
Rien que le sang de Jésus! Ch.'),
('eesim-zg-157-v3', 'eesim-zg-157', 4, 'verse', 'Je ne veux pour ma justice
Rien que le sang de Jésus
Qui me rendra Dieu propice?
Rien que le sang de Jésus! Ch.');

-- =====================================================
-- CANTIQUE 158: Salut blanche étoile
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-158', 'eesim-zogona', 158, 'Salut blanche étoile', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-158-v1', 'eesim-zg-158', 1, 'verse', 'Salut, blanche étoile,
Au plus haut du ciel!
Rayonne sans voile:
Splendeur de Noël!
Venez, tendre enfance (bis)
Qu''un chant d''espérance
De vos cœurs s''élance
Jusqu''à l''Éternel.'),
('eesim-zg-158-v2', 'eesim-zg-158', 2, 'verse', 'Ardente jeunesse,
Louez le Seigneur,
Repoussez vieillesse,
N''ayez plus de peur!
Se fait notre frère,
Dieu même, ô mystère,
Il vient la serre
Du sauveur venir!'),
('eesim-zg-158-v3', 'eesim-zg-158', 3, 'verse', 'Le fils est adorable
Lui le Roi des rois,
N''eut dans une étable,
Meurt sur une croix:
Sa grâce fidèle
Pardonne au rebelle
Jésus nous appelle,
Écoutons sa voix.'),
('eesim-zg-158-v4', 'eesim-zg-158', 4, 'verse', 'Salut, blanche étoile,
Au plus haut du ciel!
Rayonne sans voile,
Splendeur de Noël!
Ta clarté pure (bis)
En l''eau des ombilier
Du sauveur éternel!');

-- =====================================================
-- CANTIQUE 159: Sans attendre
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-159', 'eesim-zogona', 159, 'Sans attendre', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-159-v1', 'eesim-zg-159', 1, 'verse', 'Sans attendre, je veux tendre
Au bonheur promis;
Qui s''élance, qui s''avance
Obtiendra le prix.
Nuit, Jour!
Quand je prie Dieu m''entend;
On m''attaque, il me défend;
Donc en route, point de doute,
Le but est grand!'),
('eesim-zg-159-v2', 'eesim-zg-159', 2, 'verse', 'Près du trône Je m''incline,
Attend tu vaincu là,
Je dit le Seigneur:
De d''obéir, soyons ferme,
Pour d''être inédit, demeurer,
Le fidèle nous consiste
A régner aux cieux capital.'),
('eesim-zg-159-v3', 'eesim-zg-159', 3, 'verse', 'D''un pas ferme, jusqu''au terme
Il faut s''avancer
Dieu m''observe, qu''il préserve
Mon pied de glisser.
Que ce monde et ces attraits
Ne me séduisent jamais!
Si sa haine se déchaîne,
Que je sois en paix!'),
('eesim-zg-159-v4', 'eesim-zg-159', 4, 'verse', 'Dieu de grâce, que ta face
Luise en mon chemin!
Pour le tendre, viens me prendre
Par la forte main.
Toute puissance est à toi,
Subviens à ma faible foi
Jésus, Roi de feu.');

-- =====================================================
-- CANTIQUE 160: Seigneur ce que je réclame
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-160', 'eesim-zogona', 160, 'Seigneur ce que je réclame', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-160-v1', 'eesim-zg-160', 1, 'verse', 'Seigneur, ce que je réclame,
C''est le riche don d''amour!
Que cette céleste flamme
En mon brûle nuit et jour!
Cet amour, si fort, si tendre,
Amour qui supporte tout,
Qui ne veut pas se défendre,
Prêt à souffrir jusqu''au bout.'),
('eesim-zg-160-v2', 'eesim-zg-160', 2, 'verse', 'Pour les autres il s''oublie,
Il ne peut être envieux,
Jamais il n''est orgueilleux.
Cet amour peut vaincre et fondre
Les cœurs méchants, glacés,
Ils ne pourrons lui répondre:
L''amour les a terrassés.'),
('eesim-zg-160-v3', 'eesim-zg-160', 3, 'verse', 'Devant la vaste souffrance
Qui s''étend de jour en jour,
Il faut un remède immense,
Il faut un immense amour.'),
('eesim-zg-160-v4', 'eesim-zg-160', 4, 'verse', 'Que jusqu''à la mort fidèle,
Priant, luttant en tout lieu,
Ma vie entière révèle
L''amour sublime de Dieu.');

-- =====================================================
-- CANTIQUE 161: Seigneur fait de nous des ouvriers de paix
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-161', 'eesim-zogona', 161, 'Seigneur fait de nous des ouvriers de paix', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-161-c1', 'eesim-zg-161', 1, 'chorus', 'Seigneur, fait de nous
Des Seigneur de paix
Des ouvriers de paix
Seigneur, fait de nous
Des Seigneur de paix
Des bâtisseurs d''amour'),
('eesim-zg-161-v1', 'eesim-zg-161', 2, 'verse', 'Là où demeure la haine
Que nous apportions l''amour
La où se trouve l''offense,
Que nous mettions le pardon.'),
('eesim-zg-161-v2', 'eesim-zg-161', 3, 'verse', 'Là où s''attarde le doute,
Que nous apportions la foi,
Sur les chemins du désespoir,
Que nous portions l''espérance.'),
('eesim-zg-161-v3', 'eesim-zg-161', 4, 'verse', 'Donne-nous de consoler,
Plutôt que d''être consolé.
Donne-nous de comprendre,
Plutôt que d''être compris.'),
('eesim-zg-161-v4', 'eesim-zg-161', 5, 'verse', 'Car il faut savoir donner,
Pour pouvoir être comblé,
Car il faut s''oublier soi,
Pour pouvoir se retrouver.');

-- =====================================================
-- CANTIQUE 162: Seigneur par tes bontés
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-162', 'eesim-zogona', 162, 'Seigneur par tes bontés', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-162-v1', 'eesim-zg-162', 1, 'verse', 'Seigneur, par tes bontés, je jouis de la vie.
Tu sauve ma vie du néant, tu effaces tout mon passé.'),
('eesim-zg-162-v2', 'eesim-zg-162', 2, 'verse', 'Seigneur, par tes bontés, je jouis de la vie.
Sur mon cœur nouveau devenu blanc... tu inscris ta vérité.'),
('eesim-zg-162-v3', 'eesim-zg-162', 3, 'verse', 'Seigneur par tes bontés, je jouis de la vie.
Sur mon cœur nouveau devenu blanc, tu inscris ta liberté.'),
('eesim-zg-162-v4', 'eesim-zg-162', 4, 'verse', 'Seigneur par tes bontés, je jouis de la vie et ta fidèle.
Ce n''est pas la mort, mais le vivant qui ici est éternel.'),
('eesim-zg-162-v5', 'eesim-zg-162', 5, 'verse', 'Seigneur par tes bontés, je jouis de la vie.
Ce n''est pas la mort, mais le vivant, qui loue ton éternité.'),
('eesim-zg-162-v6', 'eesim-zg-162', 6, 'verse', 'Seigneur par tes bontés, je jouis de la vie.
Que résonnent tous les instruments, pour célébrer la beauté.');

-- =====================================================
-- CANTIQUE 163: Semons dès l''aurore
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-163', 'eesim-zogona', 163, 'Semons dès l''aurore', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-163-v1', 'eesim-zg-163', 1, 'verse', 'Semons dès l''aurore (bis)
Quand le soleil luit
Et semons encore (bis)
Lorsque vient la nuit
Dieu peut faire éclore
La fleur et le fruit'),
('eesim-zg-163-c1', 'eesim-zg-163', 2, 'chorus', 'Bon courage, amis (bis)
Nous irons joyeux cueillir
Et dur les épis (bis)'),
('eesim-zg-163-v2', 'eesim-zg-163', 3, 'verse', 'Semons pour le maître (bis)
Parions du Sauveur
Semons, car peut-être (bis)
Un pauvre pécheur
Par nous pourra connaître
Au seul vrai bonheur.'),
('eesim-zg-163-v3', 'eesim-zg-163', 4, 'verse', 'La tâche est immense
Et dur le terrain,
Mais bonne espérance
Nul travail n''est vain
De Dieu la puissance
Fait germer le grain.');

-- =====================================================
-- CANTIQUE 164: Sentinelle vigilante
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-164', 'eesim-zogona', 164, 'Sentinelle vigilante', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-164-v1', 'eesim-zg-164', 1, 'verse', 'Sentinelle vigilante
Qu''en est-il donc de la nuit?
"Dis à l''âme somnolente
Que déjà le matin luit!"'),
('eesim-zg-164-c1', 'eesim-zg-164', 2, 'chorus', 'La nuit passe,
le matin du grand jour luit!
Sentinelle, sois au poste
Jour et nuit.'),
('eesim-zg-164-v2', 'eesim-zg-164', 3, 'verse', 'Les gardes sur la muraille
Nous l''ont dit, entendez-vous?
Au loin gronde la bataille,
Tout est sombre autour de nous.ch'),
('eesim-zg-164-v3', 'eesim-zg-164', 4, 'verse', 'Point de repos de relâche,
Rachetés de l''Éternel,
Travaillez à votre tâche,
Car Jésus revient du ciel! Ch.');

-- =====================================================
-- CANTIQUE 165: Si tu bois au torrent
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-165', 'eesim-zogona', 165, 'Si tu bois au torrent', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-165-v1', 'eesim-zg-165', 1, 'verse', 'Si tu bois au torrent
Il te rafraîchira,
Si tu bois au torrent,
Tu te relèveras. (bis)'),
('eesim-zg-165-v2', 'eesim-zg-165', 2, 'verse', 'Quand souvent sur la route,
Tu te sens fatigué,
Dans la lutte ou le doute.
Où quand tu es tenté. Ch.');

-- =====================================================
-- CANTIQUE 166: Si vous savez quel sauveur je possède
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-166', 'eesim-zogona', 166, 'Si vous savez quel sauveur je possède', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-166-v1', 'eesim-zg-166', 1, 'verse', 'Si vous saviez quel sauveur je possède!
Il est l''ami le plus doux de tous;
Pour moi, voici le Père, il intercède:
Oh! je voudrais qu''il fût aussi pour vous!'),
('eesim-zg-166-c1', 'eesim-zg-166', 2, 'chorus', 'Mon Sauveur vous aime:
Ah! Cherchez en lui,
Votre ami suprême,
Votre seul appui!'),
('eesim-zg-166-v2', 'eesim-zg-166', 3, 'verse', 'Si vous saviez la paix douce et profonde
Que ce Sauveur en mon âme apporte!
Pour donner cette paix, que de ce monde
Elle jaillit pour de Golgotha. (Ch)'),
('eesim-zg-166-v3', 'eesim-zg-166', 4, 'verse', 'Si vous saviez quelle douce espérance
Le Dieu de paix fait rayonner des cieux,
Combien sa voix sait calmer la souffrance,
Et son regard rendre le cœur joyeux ! (Ch.)'),
('eesim-zg-166-v4', 'eesim-zg-166', 5, 'verse', 'Quand vous saurez
combien son amie
Quand vous saurez
combien il vous aime
Mais avec cette amie-là
Alléluia (ch) Ch.');

-- =====================================================
-- CANTIQUE 167: Souviens toi du calvaire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-167', 'eesim-zogona', 167, 'Souviens toi du calvaire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-167-v1', 'eesim-zg-167', 1, 'verse', 'Souviens-toi du Calvaire:
De l''angoisse solitaire
Du combat solitaire
Qu''il a livré pour toi.'),
('eesim-zg-167-c1', 'eesim-zg-167', 2, 'chorus', 'Cède, cède donc ton cœur (bis)
à ton Sauveur'),
('eesim-zg-167-v2', 'eesim-zg-167', 3, 'verse', 'Souviens-toi mon Seigneur,
Blessant son noble front,
Des compassions divines
Supportant chaque affront.'),
('eesim-zg-167-v3', 'eesim-zg-167', 4, 'verse', 'Pense à son agonie,
Pour toi, par son amour,
Sa tendresse infinie
Devait briser son cœur.'),
('eesim-zg-167-v4', 'eesim-zg-167', 5, 'verse', 'Crois, oh! crois à sa grâce,
Ne désespère plus,
Tourne vers Jésus ta face,
Tout par lui sera réparé. ch.');

-- =====================================================
-- CANTIQUE 168: Sur la Volta
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-168', 'eesim-zogona', 168, 'Sur la Volta', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-168-v1', 'eesim-zg-168', 1, 'verse', 'Sur la Volta solitaire
Je vais chantant
Voix du ciel, voix de la terre
Rendez mon cœur content.'),
('eesim-zg-168-c1', 'eesim-zg-168', 2, 'chorus', 'O la merveilleuse histoire
Dieu Christ mort pour moi.
Jésus est le Roi de gloire
Et je suis fils du roi.'),
('eesim-zg-168-v2', 'eesim-zg-168', 3, 'verse', 'Car tout parle de la vie,
Divin rédempteur de la vie,
Oh je vois l''Unité à moi
Pour me le Saint, et mon.'),
('eesim-zg-168-v3', 'eesim-zg-168', 4, 'verse', 'Fini l''homme éclaircisse
Le Dieu d''un mélodieux;
Transforme l''homme, homme
Change le jouit et la vie
Plus de réside et joie,
Plus de nouveau soit
Pour eux chantez son
Jésus a vainsi la mort.');

-- =====================================================
-- CANTIQUE 169: Sur le chemin, va sans peur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-169', 'eesim-zogona', 169, 'Sur le chemin, va sans peur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-169-v1', 'eesim-zg-169', 1, 'verse', 'Sur le chemin va sans peur.
Car Jésus est devant toi.
Il veut être ton Sauveur,
Oh! suis-le, Oh suis-le par la foi.'),
('eesim-zg-169-c1', 'eesim-zg-169', 2, 'chorus', 'Et maintenant saisie la main
de ton Sauveur,
Car lui seul te donne
L''éternel bonheur.
Car il a donné sa vie sur la croix
Oh! suis-le, Oh! suis-le par la foi.'),
('eesim-zg-169-v2', 'eesim-zg-169', 3, 'verse', 'Et si tu tombes en chemin,
Regarde à Jésus toi non,
Il est dans la peine et il l''aime
Et il prie, et il prie pour toi.'),
('eesim-zg-169-v3', 'eesim-zg-169', 4, 'verse', 'Un jour Jésus reviendra
Oh! quel immense bonheur
Dans son ciel il te prendra
Bénis-le, bénis-le dans ton cœur.');

-- =====================================================
-- CANTIQUE 170: Sur le mont du calvaire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-170', 'eesim-zogona', 170, 'Sur le mont du calvaire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-170-v1', 'eesim-zg-170', 1, 'verse', 'Sur le mont du Calvaire, il était une croix
Où Jésus souffrit me de douleurs.
Oui, c''est qu''il mourus, c''est une infâme bois
Pour sauver le plus vil des pécheurs.'),
('eesim-zg-170-c1', 'eesim-zg-170', 2, 'chorus', 'Cette croix, bois maudit du Calvaire,
Je la prends de mon grand amour,
Et par elle en la maison de Père,
Jésus me recevra toujours!'),
('eesim-zg-170-v2', 'eesim-zg-170', 3, 'verse', 'Cette croix où Jésus, monde est rejeté,
C''est pour moi le plus grand des attraits.
C''est la voie, clair, châtié, mon Sauveur a porté
Mes fardeaux, mes douleurs, mes forfaits. (réf)'),
('eesim-zg-170-v3', 'eesim-zg-170', 4, 'verse', 'A la croix de Jésus, donne précieux sang
De son Père il fut abandonné
De la mort et l''enfer, son combat triomphant
Fait de moi un enfant bien-aimé. (Réf)'),
('eesim-zg-170-v4', 'eesim-zg-170', 5, 'verse', 'M''appuyer avec foi, sur la croix de Jésus,
Oui, c''est y marcher le croix parfois, heureux (bis)
Jusqu''au jour merveilleux, où parmi les élus,
Je le ciel le pourrai l''exalter! (Réf)');

-- =====================================================
-- CANTIQUE 171: Sur toi, je me repose
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-171', 'eesim-zogona', 171, 'Sur toi, je me repose', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-171-c1', 'eesim-zg-171', 1, 'chorus', 'Sur toi je me repose,
Moi-même en sacrifice
immole devant desservais,
Seigneur, à ton service.
Me voici pour jamais!'),
('eesim-zg-171-v1', 'eesim-zg-171', 2, 'verse', 'Oh! j''implore ta richesse
Puisque tu m''aimes,
Tu n''a plus part de richesse
Qui ne soit pour les tiens. réf.'),
('eesim-zg-171-v2', 'eesim-zg-171', 3, 'verse', 'O Jésus mon Sauveur!
Fais-il donc autre chose
Pour en pouvoir pécher?
Conduit par la lumière,
Garde par ton amour,
Vers la maison du Père.
Marchande de jour en jour... réf.'),
('eesim-zg-171-v3', 'eesim-zg-171', 4, 'verse', 'Mais tu m''as pardonné;
Sainte, et vivante offrande
Pour tout tu t''es donné.
Par le sang de la croix,
Mon âme devant pour,
Tu l''a dit, je le crois! réf.'),
('eesim-zg-171-v4', 'eesim-zg-171', 5, 'verse', 'Au plus fort de l''orage
Tu restes près de moi,
Et soutenant ma foi,
C''est dans ton cœur qu''il m''aime
Tu me sais me cacher,
En vain Satan lui-même. réf.');

-- =====================================================
-- CANTIQUE 172: Sur toi, sauveur qui se fonde
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-172', 'eesim-zogona', 172, 'Sur toi, sauveur qui se fonde', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-172-v1', 'eesim-zg-172', 1, 'verse', 'Sur toi, Sauveur, qui se fonde,
Peut au péché résister
L''effort du monde
Pour le tenter
Est comme l''onde (bis)
Contre un rocher.'),
('eesim-zg-172-v2', 'eesim-zg-172', 2, 'verse', 'Quelle est, ô Dieu! la puissance
D''un seul désir, d''un penchant!
Sans vigilance
Le plus vaillant
Tombe et l''offense
En un moment. (bis)'),
('eesim-zg-172-v3', 'eesim-zg-172', 3, 'verse', 'Ton juge, ne pas conquérir,
Ah! dans ton ciel aujourd''hui
Sois mon rocher, (bis)
Dans l''éternité
Dieu reviens mon port,
Deviens mon port.
Même la mort. (bis)'),
('eesim-zg-172-v4', 'eesim-zg-172', 4, 'verse', 'Qu''en toi ma paix soit assurée
Sois mon rocher, (bis) Dieu sois fort,
Dans l''éternité
Dieu vive pour toi. (bis)');

-- =====================================================
-- CANTIQUE 173: Te ressembler Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-173', 'eesim-zogona', 173, 'Te ressembler Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-173-c1', 'eesim-zg-173', 1, 'chorus', 'Te ressembler Jésus, c''est mon espoir suprême.
Penser, agir, aimer, toujours plus comme toi:
Te ressembler, Jésus, c''est mon suprême,
Par ton Esprit rends-moi, semblable à toi.'),
('eesim-zg-173-v1', 'eesim-zg-173', 2, 'verse', 'Autrefois rempli d''ambition mes rêves,
C''était jouir de la vie,
Mais j''ai trouvé Jésus, mon chant s''élève,
Plus noble et plus par, aussi. (ch)'),
('eesim-zg-173-v2', 'eesim-zg-173', 3, 'verse', 'Quoi qu''il m''en coûte j''ai choisi la vie,
Mon idéal est Jésus Christ
Lui ressembler sera ma seule envie,
Rien d''autre ne compte plus. (ch)');

-- =====================================================
-- CANTIQUE 174: Tel que je suis
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-174', 'eesim-zogona', 174, 'Tel que je suis', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-174-v1', 'eesim-zg-174', 1, 'verse', 'Tel que je suis, sans rien à moi,
Je viens vers toi à l''appel à toi,
La voix m''appelle à toi,
Agneau de Dieu, je viens, je viens!'),
('eesim-zg-174-v2', 'eesim-zg-174', 2, 'verse', 'Tel que je suis, bien vacillant,
En proie au doute à chaque instant,
Lutte au-dedans, crainte dehors,
Agneau de Dieu, je viens, je viens!'),
('eesim-zg-174-v3', 'eesim-zg-174', 3, 'verse', 'Tel que je suis, ton cœur est prêt
A recevoir le mien qui naît
Pour tout changer, je te ai n''est!
Agneau de Dieu, je viens, je viens!'),
('eesim-zg-174-v4', 'eesim-zg-174', 4, 'verse', 'Tel que je suis, ton grand amour
A tout pardonne sans retour!
Je veux être à toi dès ce jour!
Agneau de Dieu, je viens, je viens!');

-- =====================================================
-- CANTIQUE 175: Toi qui disposes
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-175', 'eesim-zogona', 175, 'Toi qui disposes', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-175-v1', 'eesim-zg-175', 1, 'verse', 'Toi qui disposes
De toutes choses
Et tous les donne chaque jour,
Reçois, ô Père! Notre prière
De reconnaissance d''amour.'),
('eesim-zg-175-v2', 'eesim-zg-175', 2, 'verse', 'La don suprême
Que ta main même
C''est ton pardon, c''est ta paix;
Tu la clémence
Ta bienveillance
Et le plus grand de tes bienfaits.'),
('eesim-zg-175-v3', 'eesim-zg-175', 3, 'verse', 'Que, par la grâce, L''instant qui passe
Serve à nous rapprocher de toi!
Ni qu''à chaque heure. Vers ta demeure
Nos cœurs s''élèvent par la foi!');

-- =====================================================
-- CANTIQUE 176: Tous unis 70
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-176', 'eesim-zogona', 176, 'Tous unis 70', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-176-v1', 'eesim-zg-176', 1, 'verse', 'Tous unis dans l''Esprit, (bis) Réf : Elie monde saura que
Tous unis en Jésus (bis) Nous sommes chrétiens
Nous prions que bientôt Par l''amour dont
Ce qui divise ne soit plus Nos actes sont empreints.'),
('eesim-zg-176-v2', 'eesim-zg-176', 2, 'verse', 'Nous marchons côte à côte (bis)
Et la main dans la main (bis)
A la table du roi,
Nous partageons le même pain.'),
('eesim-zg-176-v3', 'eesim-zg-176', 3, 'verse', 'Gloire au Père Créateur De la terre et des cieux
Gloire au Fils Éternel Rédempteur glorieux.
Rendons gloire à l''Esprit
Qui verse en nous l''amour de Dieu.'),
('eesim-zg-176-v4', 'eesim-zg-176', 4, 'verse', 'D''un seul cœur nous voulons
Travailler pour Jésus (bis)
Proclamer à tout homme
Nul n''offre le salut.');

-- =====================================================
-- CANTIQUE 177: Tout joyeux bénissons le Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-177', 'eesim-zogona', 177, 'Tout joyeux bénissons le Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-177-v1', 'eesim-zg-177', 1, 'verse', 'Tout joyeux bénissons le Seigneur
Chantons et célébrons Seigneur,
Adorons avec joie, le Sauveur
Nous joignant aux célestes phalanges.'),
('eesim-zg-177-c1', 'eesim-zg-177', 2, 'chorus', 'Gloire à Dieu! Gloire à Dieu!
Que ce chant retentisse en tout lieu!'),
('eesim-zg-177-v2', 'eesim-zg-177', 2, 'verse', 'Dieu, dans son incomparable amour,
Du ciel envoya son Fils unique,
Et la terre et les cieux, encore ce jour,
S''unissent pour chanter ce cantique. Ch.'),
('eesim-zg-177-v3', 'eesim-zg-177', 3, 'verse', 'Le châtiment qui produisit la paix,
Jésus-Christ il a subi pour mon âme;
Il voulut expier mes tous forfaits,
En mourant, lui, sur le bois infâme. Ch.');

-- =====================================================
-- CANTIQUE 178: Tu es Seigneur le lot de mon cœur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-178', 'eesim-zogona', 178, 'Tu es Seigneur le lot de mon cœur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-178-c1', 'eesim-zg-178', 1, 'chorus', 'Tu es Seigneur le lot de ma héritage
En toi Seigneur j''ai mis mon bonheur
Toi mon seul partage'),
('eesim-zg-178-v1', 'eesim-zg-178', 2, 'verse', 'Je pense à toi le jour, la nuit, oh Seigneur
Et c''est ta main qui me conduit oh Seigneur
Vers les faux dieux je n''irai pas oh Seigneur
Mon cœur ne veut servir que toi oh Seigneur'),
('eesim-zg-178-v2', 'eesim-zg-178', 3, 'verse', 'Sur tes yeux si toujours fixés, oh Seigneur
Je chante et marche en sureté oh Seigneur
Que peut la mort ou m''épouvanter, oh Seigneur
Car du tombeau je dois surgir oh Seigneur'),
('eesim-zg-178-v3', 'eesim-zg-178', 4, 'verse', 'Devant ta face il n''est que joie oh Seigneur
Joie débordante auprès de toi oh Seigneur.');

-- =====================================================
-- CANTIQUE 179: Tu peux naître de nouveau
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-179', 'eesim-zogona', 179, 'Tu peux naître de nouveau', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-179-v1', 'eesim-zg-179', 1, 'verse', 'Tu peux naître de nouveau,
Tu peux tout recommencer,
Balayer les vies passées, (bis)
Repartir à zéro berger
Avec Jésus pour berger.'),
('eesim-zg-179-v2', 'eesim-zg-179', 2, 'verse', 'Tu peux boire de cette eau,
source de la grâce.
Tu peux a la guérisse. (bis)
Source de la grâce cette, (bis)
Source de l''éternité.'),
('eesim-zg-179-v3', 'eesim-zg-179', 3, 'verse', 'Tu peux être pardonné
Car par les péchés passés
A Jésus tout paix.
Tu peux recevoir la paix (bis)
Source de la liberté
Et repartir à zéro, (bis)
Avec Jésus pour berger.');

-- =====================================================
-- CANTIQUE 180: Tu veux Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-180', 'eesim-zogona', 180, 'Tu veux Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-180-v1', 'eesim-zg-180', 1, 'verse', 'Tu veux Seigneur un cœur purifié, Donne-le moi, divin crucifié,
Il m''a puisque tu me l''as promis
Par ton Esprit,
Rends-moi pur comme toi.'),
('eesim-zg-180-v2', 'eesim-zg-180', 2, 'verse', 'Jésus à toi, j''appartieras pour jamais. 2. Jésus du ciel, où ton trône est assis,
Vers en mon âme tes doux bienfaits Montre la route à mes pas indécis,
Pour briser toute idole. C''est à toi que je crie,
Par ton Esprit, Par ton Esprit,
Rends-moi pur comme toi. Rends-moi pur comme toi. (ch)');

-- =====================================================
-- CANTIQUE 181: Un autre monde m''attend là-haut
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-181', 'eesim-zogona', 181, 'Un autre monde m''attend là-haut', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-181-v1', 'eesim-zg-181', 1, 'verse', 'Un autre monde m''attend là-haut, là-haut (bis)
Mon Sauveur va me préparer un lieu.
Un autre monde m''attend là-haut. (bis)'),
('eesim-zg-181-v2', 'eesim-zg-181', 2, 'verse', 'Es-tu déjà inscrit là-haut, la-haut! (bis)
Mon Sauveur veut te préparer un lieu.
Es-tu déjà inscrit là-haut! (bis)');

-- =====================================================
-- CANTIQUE 182: Un beau jour
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-182', 'eesim-zogona', 182, 'Un beau jour', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-182-v1', 'eesim-zg-182', 1, 'verse', 'Un beau jour le monde sera confondu
On nous cherchera partout disparus
Car nous qui sommes sauvés
Et marchons en sainteté
En un clin d''œil nous serons enlevés.'),
('eesim-zg-182-c1', 'eesim-zg-182', 2, 'chorus', 'Enlevés (bis)
En un clin d''œil nous serons tous enlevés.
Enlevés (bis)
Auprès de Jésus nous serons enlevés.'),
('eesim-zg-182-v2', 'eesim-zg-182', 3, 'verse', 'La trompette du Seigneur résonnera
La voix de l''archange retentira
Jésus viendra sur la nuée.
Tous ensembles à sa venue
En un clin d''œil nous serons enlevés.'),
('eesim-zg-182-v3', 'eesim-zg-182', 4, 'verse', 'Nous ne devancerons pas ceux qui sont morts
Ils sortiront de leur tombe d''abord
Mais je vous dis un secret
A vous tous qui êtes prêts
En un clin d''œil nous serons enlevés.'),
('eesim-zg-182-v4', 'eesim-zg-182', 5, 'verse', 'Alors nous revêtirons des corps nouveaux
Immortels, fils et du très-haut.
Triomphant nous chanterons
Mort où est ton aiguillon.');

-- =====================================================
-- CANTIQUE 183: Un chrétien, je croyais être
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-183', 'eesim-zogona', 183, 'Un chrétien, je croyais être', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-183-v1', 'eesim-zg-183', 1, 'verse', 'Un chrétien, je croyais être,
Mais il manquait le bonheur,
Que Jésus, mon divin Maître,
Vient apporter dans mon cœur.'),
('eesim-zg-183-v2', 'eesim-zg-183', 2, 'verse', 'Oh! la paix que Jésus donne,
Je la connaissais rayonne,
Tout sur mon chemin rayonne,
Depuis qu''il est dans mon cœur.'),
('eesim-zg-183-v3', 'eesim-zg-183', 3, 'verse', 'Sa puissance souveraine
Maintenant règne sur moi,
Du péché brise la chaîne,
Me rend vainqueur par la foi. Ch.'),
('eesim-zg-183-v4', 'eesim-zg-183', 4, 'verse', 'Et tranquillement j''avance,
M''appuyant sur mon Sauveur.
Sa adorable présence
Me donne le vrai bonheur! Ch.');

-- =====================================================
-- CANTIQUE 184: Un chrétien, je voudrais être
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-184', 'eesim-zogona', 184, 'Un chrétien, je voudrais être', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-184-v1', 'eesim-zg-184', 1, 'verse', 'Un chrétien je voudrais être
Dedans mon cœur,
Dedans mon cœur.
Un chrétien je voudrais être
Dedans mon cœur (3)
Dedans mon cœur.'),
('eesim-zg-184-v2', 'eesim-zg-184', 2, 'verse', 'Plus aimant je voudrais être,
Donne-moi, Seigneur de l''être.'),
('eesim-zg-184-v3', 'eesim-zg-184', 3, 'verse', 'Pur et saint je voudrais être,
Donne-moi Seigneur de l''être.'),
('eesim-zg-184-v4', 'eesim-zg-184', 4, 'verse', 'Tel Judas je ne veux être,
Guide- moi, Seigneur de l''être.'),
('eesim-zg-184-v5', 'eesim-zg-184', 5, 'verse', 'Tel Jésus je voudrais être,
Donne-moi, Seigneur de l''être.');

-- =====================================================
-- CANTIQUE 185: Un vêtement blanc
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-185', 'eesim-zogona', 185, 'Un vêtement blanc', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-185-v1', 'eesim-zg-185', 1, 'verse', 'Un vêtement blanc, une harpe d''or
Un beau palais, une couronne
La sainte joie, le vrai trésor
Là-haut le Sauveur donne
Car Jésus est mon Sauveur, il a
Payé ma dette sur le calvaire
Il m''a dans son grand amour sauvé du péché
Je vis dans sa sainte lumière');

-- =====================================================
-- CANTIQUE 186: Une bonne nouvelle
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-186', 'eesim-zogona', 186, 'Une bonne nouvelle', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-186-v1', 'eesim-zg-186', 1, 'verse', 'Une bonne nouvelle
Descend des cieux:
Pécheur, Jésus t''appelle
Viens, lève yeux
Chargé de la misère
De tes péchés confis
Viens à Jésus, mon frère,
Viens à Jésus!'),
('eesim-zg-186-v2', 'eesim-zg-186', 2, 'verse', 'Le fils de Dieu lui-même
Vois son amour suprême
Au dur long de la mission
Dans son âme affligée
le mal ne règne plus,
Viens à Jésus!'),
('eesim-zg-186-v3', 'eesim-zg-186', 3, 'verse', 'C''est lui que Jésus lave
Ta souillure
Il te décris ô victoire!
Et tu peux chanter: Gloire!
Gloire à Jésus!'),
('eesim-zg-186-v4', 'eesim-zg-186', 4, 'verse', 'Viens, où que rien ne t''arrête,
Viens à l''instant,
La délivrance est prête
Pour tout péchant
Les yeux se periullt, perdu,
Que ton cœur se confie;
Viens à Jésus!');

-- =====================================================
-- CANTIQUE 187: Veille toujours
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-187', 'eesim-zogona', 187, 'Veille toujours', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-187-v1', 'eesim-zg-187', 1, 'verse', 'Veille au matin, quand un ciel sans nuages
Semble annoncer un jour calme et serein,
C''est dans ton cœur que peut gronder l''orage
Qui fait tomber le pèlerin'),
('eesim-zg-187-c1', 'eesim-zg-187', 2, 'chorus', 'Veille au matin,
veille le soir,
Veille et prie... toujours.'),
('eesim-zg-187-v2', 'eesim-zg-187', 3, 'verse', 'Veille à midi,
quand les bruits de la terre
font oublier le céleste séjour;
Trouve un instant pour être solitaire
Dans la prière et dans l''amour'),
('eesim-zg-187-v3', 'eesim-zg-187', 4, 'verse', 'Veille le soir, quand se fait le
silence avant avec sa divine
Clôture en cet souci tout souci.'),
('eesim-zg-187-v4', 'eesim-zg-187', 5, 'verse', 'Veille toujours, en tous lieux,
Ce n''est l''ennemi la guette
Ah, c''est alors rappelle,
Pour se glisser dans la sainte
Oui deviez regner le Tout-Puissant.');

-- =====================================================
-- CANTIQUE 188: Vers toi monte notre hommage
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-188', 'eesim-zogona', 188, 'Vers toi monte notre hommage', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-188-v1', 'eesim-zg-188', 1, 'verse', 'Vers toi monte notre hommage.
Fils de Dieu jusqu''à Sauveur,
Qui d''enfance en d''âge en âge
Le règne du pécheur.'),
('eesim-zg-188-c1', 'eesim-zg-188', 2, 'chorus', 'Loué soit son amour,
Louis soient à jamais
ton nom, Jésus,
ta gloire et tes bienfaits
Loué soit ton amour,
Ton nom, ta gloire
et tes bienfaits'),
('eesim-zg-188-v2', 'eesim-zg-188', 3, 'verse', 'De toi vient la délivrance:
Tu payas notre rançon,
C''est en toi qui l''espérance,
La paix et la guérison.'),
('eesim-zg-188-v3', 'eesim-zg-188', 4, 'verse', 'Oh! qu''heureux la la bannière
Est le peuple racheté
Qui marche, dans la lumière.
Vers la céleste cité. Chœur.'),
('eesim-zg-188-v4', 'eesim-zg-188', 5, 'verse', 'Par la divine Parole,
Tu l''enseignes, tu le console,
Et, par l''Esprit qui console,
Sûrement le conduis. Chœur.'),
('eesim-zg-188-v5', 'eesim-zg-188', 6, 'verse', 'Bientôt - glorieuse attente!
Tu combleras tous nos vœux,
Sur la nue étincelante,
Tu viendras a nos yeux des cieux.
Chœur.');

-- =====================================================
-- CANTIQUE 189: Viens à la croix, âme perdue
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-189', 'eesim-zogona', 189, 'Viens à la croix, âme perdue', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-189-v1', 'eesim-zg-189', 1, 'verse', 'Viens à la croix, âme perdue,
Brebis sans berger;
Tu verras une main tendue
Pour te sauver'),
('eesim-zg-189-v2', 'eesim-zg-189', 2, 'verse', 'Viens à la croix, âme souillée,
Par le Tentateur;
La tu la victoire assurée
Dans le Seigneur.'),
('eesim-zg-189-v3', 'eesim-zg-189', 3, 'verse', 'Viens à la croix, âme affaiblie.
De pesants fardeaux
La tu trouveras, soulagée,
Le vrai repos.'),
('eesim-zg-189-v4', 'eesim-zg-189', 4, 'verse', 'Viens à la croix, âme affaiblie
Chrétien chancelant,
La se trouvent force, énergie,
Secours Puissant.'),
('eesim-zg-189-v5', 'eesim-zg-189', 5, 'verse', 'Viens à la croix, âme anxieuse,
Par le Tentateur;
La tu la victoire assurée
Dans le Seigneur.'),
('eesim-zg-189-v6', 'eesim-zg-189', 6, 'verse', 'Dans tes soucis, tes deuils, tes joies,
Entends cette voix
Qui te dit: Viens dans tes alarmes
Viens à la croix!');

-- =====================================================
-- CANTIQUE 190: Vivre près de mon sauveur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-190', 'eesim-zogona', 190, 'Vivre près de mon sauveur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-190-v1', 'eesim-zg-190', 1, 'verse', 'Vivre près de mon Sauveur, c''est le désir
De mon cœur, je jouis du vrai bonheur,
En marchant près de toi chaque jour....'),
('eesim-zg-190-v2', 'eesim-zg-190', 2, 'verse', 'Je suis faible tu es fort, tu veux ma foi,
Et non l''effort, je suis vainqueur de la mort
En marchant près de toi chaque jour....'),
('eesim-zg-190-v3', 'eesim-zg-190', 3, 'verse', 'Dans mon voyage ici-bas, qui me garde des
Faux-pas, me soutient quand je suis las
C''est bien toi, Jésus, oui rien que toi....'),
('eesim-zg-190-v4', 'eesim-zg-190', 4, 'verse', 'Dans le doute et le péché, qui pourra me
Relever, Satan ne peut triompher,
Quand je reste caché en mon Sauveur'),
('eesim-zg-190-v5', 'eesim-zg-190', 5, 'verse', 'Ici je n''ai rien que toi Je t''accepte par la foi
Je ne vis plus sous la loi
Car Jésus est mon sauveur et mon ami...');

-- =====================================================
-- CANTIQUE 191: Voici je viens bientôt
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-191', 'eesim-zogona', 191, 'Voici je viens bientôt', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-191-c1', 'eesim-zg-191', 1, 'chorus', 'Voici je viens bientôt a dit le Seigneur!
Voici je viens bientôt veillez et priez. (bis)'),
('eesim-zg-191-v1', 'eesim-zg-191', 2, 'verse', 'Mes amis vous ne savez ni le jour ni l''heure,
Pour cela gardez la foi veillez et prier. (bis)'),
('eesim-zg-191-v2', 'eesim-zg-191', 3, 'verse', 'En attendant ce beau jour parlons du Sauveur
Toi mon frère, et toi ma, sœur soit un vrais témoin. (bis)');

-- =====================================================
-- CANTIQUE 192: Voici Noël, oh quel heureux jour
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-192', 'eesim-zogona', 192, 'Voici Noël, oh quel heureux jour', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-192-v1', 'eesim-zg-192', 1, 'verse', 'Voici Noël, oh quel heureux jour,
Oui nous chantons tous ce jour.
O Jésus Christ vint sur la terre
Pour nous sauver, oh quel mystère'),
('eesim-zg-192-v2', 'eesim-zg-192', 2, 'verse', 'Quel amour il nous montra.
En naissant, il nous sauva.
Oh, quels cris d''allégresse,
jaillissant de nos cœurs.'),
('eesim-zg-192-v3', 'eesim-zg-192', 3, 'verse', 'Oh, viens mon frère, viens te ce Sauveur.
Et toi, ma sœur donne lui ton cœur.
Ne remets pas au lendemain
Car demain ne t''appartient pas.');

-- =====================================================
-- CANTIQUE 193: Voici Noël, o douce nuit
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-193', 'eesim-zogona', 193, 'Voici Noël, o douce nuit', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-193-v1', 'eesim-zg-193', 1, 'verse', 'Voici Noël, ô douces nuits!
L''étoile est là qui nous conduit:
Allons donc tous, avec les mages,
Porter à Jésus nos hommages,
Car l''enfant nous est né
Le Fils nous est donné!'),
('eesim-zg-193-v2', 'eesim-zg-193', 2, 'verse', 'Voici Noël, oh! Quel beau jour!
Jésus est né! Quel grand amour!
C''est pour nous qu''il vient sur la terre,
Qu''il prend sur lui notre misère.
Un Sauveur nous est né,
Le Fils nous est donné!'),
('eesim-zg-193-v3', 'eesim-zg-193', 3, 'verse', 'Voici Noël, ah! D''un seul cœur,
Joignons nos voix au divin Chœur
Qui proclame au ciel les louanges
De celui qu''annoncent les anges:
Oui, l''Enfant nous est né,
Le Fils nous est donné!'),
('eesim-zg-193-v4', 'eesim-zg-193', 4, 'verse', 'Voici Noël, ne craignons pas,
Car Dieu nous dit: « Paix ici-bas,
Bienveillance envers tous les hommes!»
Pour nous aussi, tels que nous sommes,
Un Sauveur nous est né,
Le Fils nous est donné!');

-- =====================================================
-- CANTIQUE 194: Voyez l''étendard céleste
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-194', 'eesim-zogona', 194, 'Voyez l''étendard céleste', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-194-v1', 'eesim-zg-194', 1, 'verse', 'Voyez l''étendard céleste
Qui s''agite au vent!
C''est un secours manifeste;
Frères, en avant!'),
('eesim-zg-194-c1', 'eesim-zg-194', 2, 'chorus', '<< Tenez ferme, car j''avance!>>
Amis, répondons:
<< O Jésus, notre espérance,
Par toi nous vaincrons!>>'),
('eesim-zg-194-v2', 'eesim-zg-194', 3, 'verse', 'Satan, prince de ce monde,
Redouble ses coups;
Notre faiblesse est profonde
Que deviendrons-nous? Ch.'),
('eesim-zg-194-v3', 'eesim-zg-194', 4, 'verse', 'Sur la montagne prochaine
Sonnent les clairons...
Au nom du grand Capitaine
Nous triompherons! Ch.'),
('eesim-zg-194-v4', 'eesim-zg-194', 5, 'verse', 'Le combat est long, peut-être; Elevons nos cœur!
Avec Jésus notre Maître, Nous serons vainqueurs! Ch.');

-- =====================================================
-- CHŒURS (195-301)
-- =====================================================

-- =====================================================
-- CANTIQUE 195: A Dieu soit la gloire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-195', 'eesim-zogona', 195, 'A Dieu soit la gloire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-195-v1', 'eesim-zg-195', 1, 'verse', 'A Dieu soit la gloire! (ter)
Pour les choses qu''il a faites.
Par sa puissance, il m''a relevé.
Pour les choses qu''il a faites.');

-- =====================================================
-- CANTIQUE 196: A toi nos cœurs
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-196', 'eesim-zogona', 196, 'A toi nos cœurs', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-196-v1', 'eesim-zg-196', 1, 'verse', 'A toi nos vies,
Christ Roi. Christ Roi. (hommes) (bis)
Nous marchons tous à la suite, marchons à la suite.
Christ notre Roi, Christ notre.');

-- =====================================================
-- CANTIQUE 197: As-tu vu Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-197', 'eesim-zogona', 197, 'As-tu vu Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-197-v1', 'eesim-zg-197', 1, 'verse', 'As-tu vu Jésus, l''as-tu rencontré?
L''as-tu tant cherché dans ton cœur?
Comme les gens à cherché
Comme les gens à Capharnaüm
Jésus est là tout près, il est le pain de vie.');

-- =====================================================
-- CANTIQUE 198: Autrefois
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-198', 'eesim-zogona', 198, 'Autrefois', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-198-v1', 'eesim-zg-198', 1, 'verse', 'Autrefois j''étais aveugle
Marchant dans les ténèbres
Mon Sauveur Jésus-Christ
Et dans sa grâce il m''a donné la force
Maintenant, je sais que j''irai au ciel.'),
('eesim-zg-198-c1', 'eesim-zg-198', 2, 'chorus', 'Alléluia, alléluia
Alléluia, alléluia
Alléluia, Amen (bis)');

-- =====================================================
-- CANTIQUE 199: Aux cailloux du torrent
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-199', 'eesim-zogona', 199, 'Aux cailloux du torrent', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-199-v1', 'eesim-zg-199', 1, 'verse', 'Aux cailloux du torrent,
Jette tous tes biens,
Et le Dieu tout-puissant,
T''offrira les siens.
Sa présence vaut mieux
Que tous les trésors,
Et le Roi des cieux
Te sera plus que d''or.'),
('eesim-zg-199-v2', 'eesim-zg-199', 2, 'verse', 'Aux cailloux du torrent,
A le don ôteras,
Sa présence vaut mieux
Que tout l''or.
Et le Roi des cieux
Est pour toujours avec moi.');

-- =====================================================
-- CANTIQUE 200: Avant son retour
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-200', 'eesim-zogona', 200, 'Avant son retour', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-200-v1', 'eesim-zg-200', 1, 'verse', 'Avant son retour glorifions-le (bis)
C''est Jésus qui est le Roi (bis)
Si tu veux oui ou non c''est lui qui est le Roi.
C''est Jésus qui est le Roi.');

-- =====================================================
-- CANTIQUE 201: Bats des mains
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-201', 'eesim-zogona', 201, 'Bats des mains', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-201-v1', 'eesim-zg-201', 1, 'verse', 'Bats des mains, peuple chrétien,
Car Dieu est Roi de la terre.
Bats des mains, de tout ton cœur!
Chante à Dieu de tout ton cœur!'),
('eesim-zg-201-v2', 'eesim-zg-201', 2, 'verse', 'Hosanna! Hosanna!
Car Dieu est Roi de la terre.
Gloire, gloire!
Chante à Dieu de tout ton cœur!');

-- =====================================================
-- CANTIQUE 202: Bénissez Dieu (deux voix)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-202', 'eesim-zogona', 202, 'Bénissez Dieu (deux voix)', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-202-v1', 'eesim-zg-202', 1, 'verse', 'Bénissez Dieu (Hommes)
(Femmes) Bénissez Dieu
Vous tous serviteur de Dieu
Qui vous tenez dans la maison de Dieu.
Levez vos mains vers le lieu très saint.
Bénissez Dieu, l''Éternel Dieu.');

-- =====================================================
-- CANTIQUE 203: C''est moi Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-203', 'eesim-zogona', 203, 'C''est moi Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-203-v1', 'eesim-zg-203', 1, 'verse', 'C''est moi, c''est moi
C''est moi, Seigneur
Qui ai besoin de chanter (bis)'),
('eesim-zg-203-v2', 'eesim-zg-203', 2, 'verse', 'Ni mon frère ni ma mère
Qui a besoin de prier (bis)
Mais c''est moi, Seigneur
Qui ai besoin de prier (bis)');

-- =====================================================
-- CANTIQUE 204: Campeur connais-tu Jésus Christ?
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-204', 'eesim-zogona', 204, 'Campeur connais-tu Jésus Christ?', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-204-v1', 'eesim-zg-204', 1, 'verse', 'Campeur connais-tu Jésus Christ?
Oui je le connais depuis
De tout mon cœur je suis sa parole
Pour être sauvé allé au paradis.');

-- =====================================================
-- CANTIQUE 205: Car ta bonté
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-205', 'eesim-zogona', 205, 'Car ta bonté', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-205-v1', 'eesim-zg-205', 1, 'verse', 'Car ta bonté vaut mieux que la vie,
Car ta bonté vaut mieux que la vie.
Mes lèvres célébreront les louanges,
Car ta bonté vaut mieux que la vie.'),
('eesim-zg-205-v2', 'eesim-zg-205', 2, 'verse', 'J''élèverai mes mains en ton nom,
J''élèverai mes mains en ton nom.
Mes lèvres célébreront tes louanges,
Car ta bonté vaut mieux que la vie.');

-- =====================================================
-- CANTIQUE 206: Car tu es Dieu (Dieu de gloire)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-206', 'eesim-zogona', 206, 'Car tu es Dieu (Dieu de gloire)', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-206-v1', 'eesim-zg-206', 1, 'verse', 'Car tu es Dieu au dessus de la terre.
Tu établis ton trône dans les cieux.
Car tu es Dieu au dessus de la terre.
Tu es Roi, tu es le seul vrai Dieu.
Dieu de gloire, Dieu de gloire.
Dieu de gloire, tu es Roi!');

-- =====================================================
-- CANTIQUE 207: Chantez au Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-207', 'eesim-zogona', 207, 'Chantez au Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-207-v1', 'eesim-zg-207', 1, 'verse', 'Chantez au Seigneur un chant nouveau,
Dansez en son honneur! (bis)
Jésus est le roi de gloire. (bis)
Il est le Seigneur des seigneurs!
Jésus est le roi de gloire
Notre libérateur!
Chantez au Seigneur un chant nouveau,
Dansez en son honneur! (bis)');

-- =====================================================
-- CANTIQUE 208: Cherchez le royaume de Dieu
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-208', 'eesim-zogona', 208, 'Cherchez le royaume de Dieu', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-208-v1', 'eesim-zg-208', 1, 'verse', 'Cherchez d''abord le royaume de Dieu
Et sa justice.
Et toutes choses vous seront données en plus.
Alléluia, alléluia
L''homme ne vivra pas de pain seulement,
Mais de toutes paroles,
Qui sortiraient de la bouche de Dieu,
Alléluia, alléluia.');

-- =====================================================
-- CANTIQUE 209: Dans le monde entier
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-209', 'eesim-zogona', 209, 'Dans le monde entier', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-209-v1', 'eesim-zg-209', 1, 'verse', 'Dans le monde entier,
Le Saint-Esprit agit
Dans le monde entier
Comme le prophète l''a dit'),
('eesim-zg-209-c1', 'eesim-zg-209', 2, 'chorus', 'Dans le monde entier
Le Seigneur répand sa gloire
Remplissant tout l''univers,
Comme l''eau couvre le fond des mers.'),
('eesim-zg-209-v2', 'eesim-zg-209', 3, 'verse', 'Au fond de mon cœur...
Le Saint-Esprit agit
Au fond de mon cœur,
Comme le prophète l''a dit'),
('eesim-zg-209-v3', 'eesim-zg-209', 4, 'verse', 'A Fada N''Gourma
Le Saint-Esprit agit
A Fada N''Gourma
Comme le prophète l''a dit.');

-- =====================================================
-- CANTIQUE 210: De Béthléhem à Golgotha
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-210', 'eesim-zogona', 210, 'De Béthléhem à Golgotha', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-210-v1', 'eesim-zg-210', 1, 'verse', 'De Béthléhem à la croix, de la crèche à Golgotha,
De ma misère à ma joie, il n''y a que toi Jésus.
O Jésus ton amour oui ton amour pour moi
Est si grand qu''il remplit tout mon cœur,
O Jésus ton amour oui ton amour moi moi.
Est si grand qu''il me remplit de bonheur
Cet amour qu''il m''a donné,
O je voudrais le partager, avec toi chanter.');

-- =====================================================
-- CANTIQUE 211: Envoie ta puissance
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-211', 'eesim-zogona', 211, 'Envoie ta puissance', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-211-v1', 'eesim-zg-211', 1, 'verse', 'Envoie ta puissance sur ton peuple
La puissance d''autre-fois
Ouvre les écluses, envoie la puissance
Sur tous ceux qui sont à toi.'),
('eesim-zg-211-v2', 'eesim-zg-211', 2, 'verse', 'Envoie sur chacun des langues de feu
Brûlant en nous le péché
Purifie nos âmes
Mets en nous ta flamme
O! Baptise-nous de feu.');

-- =====================================================
-- CANTIQUE 212: Eternel, fais moi connaître
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-212', 'eesim-zogona', 212, 'Eternel, fais moi connaître', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-212-v1', 'eesim-zg-212', 1, 'verse', 'Eternel, fais-moi connaître tes voies.
Enseigne moi tes sentiers,
Conduis-moi dans ta vérité, et instruis-moi,
Et instruis-moi. Car tu es le Dieu de mon salut.
Tu es le Dieu de mon salut.
Tu es toujours mon espérance.');

-- =====================================================
-- CANTIQUE 213: Gloire à ton nom, Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-213', 'eesim-zogona', 213, 'Gloire à ton nom, Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-213-v1', 'eesim-zg-213', 1, 'verse', 'Gloire à ton nom, Jésus! Gloire à ton nom, Jésus
Mon rocher, ma forteresse, mon libérateur.
Je me confie en toi! Gloire à ton nom Seigneur.');

-- =====================================================
-- CANTIQUE 214: Hier, aujourd''hui, pour jamais
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-214', 'eesim-zogona', 214, 'Hier, aujourd''hui, pour jamais', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-214-v1', 'eesim-zg-214', 1, 'verse', 'Hier, aujourd''hui, pour jamais Béni soit son nom.
Jésus ne change pas. Béni soit son nom.
Tout se flétrit ici bas, Béni soit son nom.
Jésus ne change pas. Tout se flétrit ici bas.
Jésus ne change pas.');

-- =====================================================
-- CANTIQUE 215: Il a dépouillé les dominations
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-215', 'eesim-zogona', 215, 'Il a dépouillé les dominations', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-215-v1', 'eesim-zg-215', 1, 'verse', 'Il a dépouillé les dominations et les autorités,
Et les a livrées publiquement,
publiquement en spectacle, (*)
En triomphant d''elles par la croix.
(Repète jusqu''au *)');

-- =====================================================
-- CANTIQUE 216: Il est un homme
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-216', 'eesim-zogona', 216, 'Il est un homme', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-216-v1', 'eesim-zg-216', 1, 'verse', 'Il est un homme dans la gloire,
C''est Jésus de Nazareth
Il peut marcher sur les vagues,
Il peut maîtriser les mers.'),
('eesim-zg-216-v2', 'eesim-zg-216', 2, 'verse', 'Il est assis dans la gloire
Et je sais qu''il prie pour moi,
Il est là-haut près du père,
Et bientôt il reviendra.');

-- =====================================================
-- CANTIQUE 217: Il m''a sauvé
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-217', 'eesim-zogona', 217, 'Il m''a sauvé', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-217-v1', 'eesim-zg-217', 1, 'verse', 'Il m''a sauve, Il m''a sauvé, béni soit son nom (ter)
Oh! Mon Sauveur, sois loué à perpétuité.'),
('eesim-zg-217-v2', 'eesim-zg-217', 2, 'verse', 'Dans son amour dans son amour, il m''a racheté (ter)
Oh! Mon Sauveur, sois loué à perpétuité.'),
('eesim-zg-217-v3', 'eesim-zg-217', 3, 'verse', 'Je le suivrai, je le suivrai, toujours avec joie (ter)
Oh! Mon Sauveur, sois loué à perpétuité.'),
('eesim-zg-217-v4', 'eesim-zg-217', 4, 'verse', 'Alléluia, alléluia! Béni soit son nom! (ter)
Oh! Mon Sauveur, sois loué à perpétuité.');

-- =====================================================
-- CANTIQUE 218: Il tient le monde
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-218', 'eesim-zogona', 218, 'Il tient le monde', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-218-v1', 'eesim-zg-218', 1, 'verse', 'Il tient le monde, dans sa main (ter)
Il tient le monde, dans sa main (ter)'),
('eesim-zg-218-v2', 'eesim-zg-218', 2, 'verse', 'Il tient toi et moi, dans sa main (ter)'),
('eesim-zg-218-v3', 'eesim-zg-218', 3, 'verse', 'Il tient les chrétiens...'),
('eesim-zg-218-v4', 'eesim-zg-218', 4, 'verse', 'Il tient les jeunes...'),
('eesim-zg-218-v5', 'eesim-zg-218', 5, 'verse', 'Il tient les petits enfants...');

-- =====================================================
-- CANTIQUE 219: Il vit
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-219', 'eesim-zogona', 219, 'Il vit', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-219-v1', 'eesim-zg-219', 1, 'verse', 'Il vit! Il vit! toujours il me conduit,
Et je puis dire par la foi.
Je sais qu''il vit en moi!'),
('eesim-zg-219-v2', 'eesim-zg-219', 2, 'verse', 'Il vit! Il vit! Jésus vit aujourd''hui
Je sais qu''il est près de moi
Sur le chemin étroit.');

-- =====================================================
-- CANTIQUE 220: J''aime la Bible
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-220', 'eesim-zogona', 220, 'J''aime la Bible', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-220-v1', 'eesim-zg-220', 1, 'verse', 'J''aime la Bible, car elle me dit
Tout ce que je dois faire;
J''aime la Bible, car elle me dit
D''aider le malheureux.'),
('eesim-zg-220-v2', 'eesim-zg-220', 2, 'verse', 'J''aime la Bible, car elle me dit
De bien aimer mon frère;
J''aime la Bible, car elle me dit
D''aider le malheureux.');

-- =====================================================
-- CANTIQUE 221: J''ai pris place
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-221', 'eesim-zogona', 221, 'J''ai pris place', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-221-v1', 'eesim-zg-221', 1, 'verse', 'J''ai pris place dans le train de
l''Evangile quitta la gare du péché.
Je roule sur les rails de la voie facile Sur la ligne Alléluia
Mon passeport c''est le sang de Jésus.
Toutes les frontières sont vaincues.
Je voyage dans un train tout plein de joie Vers la céleste cité.');

-- =====================================================
-- CANTIQUE 222: J''étais pauvre
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-222', 'eesim-zogona', 222, 'J''étais pauvre', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-222-v1', 'eesim-zg-222', 1, 'verse', 'J''étais pauvre, mais il m''a enrichi.
Etant riche, il s''est fait pauvre pour moi
Mon Sauveur bien-aimé expire pour mon péché
J''étais pauvre, mais il m''a enrichi.');

-- =====================================================
-- CANTIQUE 223: Je louerai l''Eternel
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-223', 'eesim-zogona', 223, 'Je louerai l''Eternel', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-223-v1', 'eesim-zg-223', 1, 'verse', 'Je louerai l''Eternel de tout mon cœur,
Je raconterai toutes tes merveilles,
Je chanterai ton nom
Je louerai l''Eternel de tout mon nom
Je ferai de toi le Sujet de ma joie.
Alléluia!');

-- =====================================================
-- CANTIQUE 224: Je m''écrie louer soit l''Eternel
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-224', 'eesim-zogona', 224, 'Je m''écrie louer soit l''Eternel', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-224-v1', 'eesim-zg-224', 1, 'verse', 'Je m''écrie louer soit l''Eternel
Et je suis délivré de tous mes ennemis
Je m''écrie louer soit l''Eternel
Et je suis délivré de mes ennemis'),
('eesim-zg-224-c1', 'eesim-zg-224', 2, 'chorus', 'Louer soit l''Eternel, Louer soit l''Eternel
Louer soit l''Eternel, Louer l''Eternel.');

-- =====================================================
-- CANTIQUE 225: Je n''ai ni argent ni or
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-225', 'eesim-zogona', 225, 'Je n''ai ni argent ni or', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-225-v1', 'eesim-zg-225', 1, 'verse', 'Je n''ai ni argent ni or.
Mais ce que j''ai, je te le donne.
Au nom puissant de Jésus Christ
De Nazareth, lève-toi et marche.
Marchant, sautant et louant Dieu,
Au nom puissant de Jésus-Christ
De Nazareth, lève-toi et marche.');

-- =====================================================
-- CANTIQUE 226: Je n''ai point honte Rom 1:16
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-226', 'eesim-zogona', 226, 'Je n''ai point honte Rom 1:16', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-226-v1', 'eesim-zg-226', 1, 'verse', 'Je n''ai point honte de l''Evangile
C''est une puissance de Dieu (bis)'),
('eesim-zg-226-v2', 'eesim-zg-226', 2, 'verse', 'Pour le salut de qui conque croit (bis)
Je n''ai point honte de l''Evangile
C''est une puissance de Dieu.');

-- =====================================================
-- CANTIQUE 227: Je sais
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-227', 'eesim-zogona', 227, 'Je sais', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-227-v1', 'eesim-zg-227', 1, 'verse', 'Je sais qu''un des beaux jours,
J''irai au paradis, chanter
Alléluia à mon Sauveur.'),
('eesim-zg-227-v2', 'eesim-zg-227', 2, 'verse', 'Je sais qu''un des beaux jours,
A l''Eternel j''irai paradis chanter
Alléluia à notre Dieu.'),
('eesim-zg-227-v3', 'eesim-zg-227', 3, 'verse', 'Lorsqu''il y a des montagnes
Même des feux sur ma route
Jésus est le seul maître qui
pour m''aimer'),
('eesim-zg-227-v4', 'eesim-zg-227', 4, 'verse', 'Je sais qu''un des beaux jours
J''irai au paradis chanter
Alléluia à notre Dieu.');

-- =====================================================
-- CANTIQUE 228: Je sais... mes yeux verront Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-228', 'eesim-zogona', 228, 'Je sais... mes yeux verront Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-228-v1', 'eesim-zg-228', 1, 'verse', 'Je sais qu''un jour mes yeux verront Jésus
Je sais qu''un jour mes yeux verront Jésus
Et marchant dans le chemin jusqu''au bout,
Par la foi et malgré tout,
Je sais qu''un jour mes yeux verront Jésus.');

-- =====================================================
-- CANTIQUE 229: Je serre ta parole
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-229', 'eesim-zogona', 229, 'Je serre ta parole', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-229-v1', 'eesim-zg-229', 1, 'verse', 'Je serre ta parole dans mon cœur De mes lèvres j''énumère
Afin de ne pas pécher contre toi. Les sentences de ta bouche
Béni sois-tu O Eternel! Enseigne-moi tes statuts.
Je serre la parole dans mon cœur
Afin de ne pas pécher contre toi.');

-- =====================================================
-- CANTIQUE 230: Je suis dans la joie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-230', 'eesim-zogona', 230, 'Je suis dans la joie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-230-v1', 'eesim-zg-230', 1, 'verse', 'Je suis dans la joie
Car j''ai connu Jésus, alléluia (Bis)
Alléluia, Jésus m''a sauvé
Osiana, gloire à son Saint-Nom.
Je suis dans la joie
Car Jésus m''a sauvé Alléluia!');

-- =====================================================
-- CANTIQUE 231: Je suis heureux
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-231', 'eesim-zogona', 231, 'Je suis heureux', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-231-v1', 'eesim-zg-231', 1, 'verse', 'Je suis heureux, et voici la raison,
Jésus m''a donné son plein pardon;
Et maintenant je chante tout le jour
De Jésus le merveilleux amour.
Mon cœur accablé par un pesant fardeau,
Par Jésus soulagé, a le vrai repos,
Et maintenant je chante tout le jour
De Jésus le merveilleux amour.');

-- =====================================================
-- CANTIQUE 232: Je suis plus riche qu''un millionnaire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-232', 'eesim-zogona', 232, 'Je suis plus riche qu''un millionnaire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-232-v1', 'eesim-zg-232', 1, 'verse', 'Je suis plus riche qu''un millionnaire
Dieu prend soin de moi (bis)
Adieu pauvreté adieu tracas
Je sais qu''en Jésus à tous
Mes besoins Dieu pourvoit
Je suis plus riche qu''un millionnaire
Dieu prend soin de moi');

-- =====================================================
-- CANTIQUE 233: Je t''aime de l''amour du Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-233', 'eesim-zogona', 233, 'Je t''aime de l''amour du Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-233-v1', 'eesim-zg-233', 1, 'verse', 'Je t''aime de l''amour du Seigneur
Oui, je t''aime de l''amour du Seigneur
Car je vois en toi la gloire de mon Roi
Oui je t''aime de l''amour du Seigneur.');

-- =====================================================
-- CANTIQUE 234: Je vais boire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-234', 'eesim-zogona', 234, 'Je vais boire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-234-v1', 'eesim-zg-234', 1, 'verse', 'Je vais boire à longs traits
Aux sources de la paix
Mon Sauveur est merveilleux pour moi
Sa gloire, je dirai, Son nom, j''exalterai
Mon Sauveur est merveilleux pour moi.'),
('eesim-zg-234-c1', 'eesim-zg-234', 2, 'chorus', 'Merveilleux, merveilleux,
Mon Sauveur est si merveilleux,
Où jaillit le flots puissant
Je vais boire constamment
Mon Sauveur est vraiment merveilleux.');

-- =====================================================
-- CANTIQUE 235: Jésus Christ est Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-235', 'eesim-zogona', 235, 'Jésus Christ est Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-235-v1', 'eesim-zg-235', 1, 'verse', 'Jésus Christ est Seigneur, il est Seigneur
Il est sorti du tombeau, il est confessera
Tout genou fléchira. Toute langue confessera
Que Jésus est Seigneur.');

-- =====================================================
-- CANTIQUE 236: Jésus divin Roi
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-236', 'eesim-zogona', 236, 'Jésus divin Roi', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-236-v1', 'eesim-zg-236', 1, 'verse', 'Jésus divin roi, que je sois pour toi
Comme un chant d''espérance, d''amour et de foi
Tu vis dans mon cœur, tu fais tout mon bonheur
Fais de ma vie une sainte harmonie.
Jésus divin roi, que je sois pour toi,
Comme un chant d''espérance d''amour et de foi.');

-- =====================================================
-- CANTIQUE 237: Jésus s''est levé
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-237', 'eesim-zogona', 237, 'Jésus s''est levé', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-237-v1', 'eesim-zg-237', 1, 'verse', 'Jésus s''est levé, Satan terrassé (bis)
Alléluia, (8 fois)');

-- =====================================================
-- CANTIQUE 238: Jésus, c''est le plus beau nom
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-238', 'eesim-zogona', 238, 'Jésus, c''est le plus beau nom', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-238-v1', 'eesim-zg-238', 1, 'verse', 'Jésus c''est le plus beau nom,
Merveilleux Sauveur, Seigneur de Gloire!
Emmanuel, Dieu est avec nous,
Source de joie, parole de vie.');

-- =====================================================
-- CANTIQUE 239: Jésus, nous t''adorons
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-239', 'eesim-zogona', 239, 'Jésus, nous t''adorons', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-239-v1', 'eesim-zg-239', 1, 'verse', 'Jésus, nous t''adorons! (bis)
Jésus, tu es souverain!
Tes œuvres t''acclament,
l''Église se proclame:
"O Jésus, tu es souverain!"');

-- =====================================================
-- CANTIQUE 240: Jeunes et vieux se réjouiront
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-240', 'eesim-zogona', 240, 'Jeunes et vieux se réjouiront', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-240-v1', 'eesim-zg-240', 1, 'verse', 'Jeunes et vieux se réjouiront ensemble
Les jeunes filles danseront de joie
Lai, lai, lai, lai, lai, lai, lai, lai, lai, lai
lai, lai, lai, lai, lai, lai, lai, lai, lai, lai.
Je changerai leur deuil en allégresse et je les consolerai.'),
('eesim-zg-240-v2', 'eesim-zg-240', 2, 'verse', 'Je leur donnerai la joie au lieu du chagrin,
Je leur donnerai la joie (bis)');

-- =====================================================
-- CANTIQUE 241: L''amour de Dieu
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-241', 'eesim-zogona', 241, 'L''amour de Dieu', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-241-v1', 'eesim-zg-241', 1, 'verse', 'L''amour de Dieu est si merveilleux (ter 3)
Oh quel amour!
Il est si haut qu''on ne peut le surmonter
Il est si bas qu''on ne peut le rabaisser
Il est si large qu''on ne peut le côtoyer
Oh quel amour!');

-- =====================================================
-- CANTIQUE 242: La grâce du Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-242', 'eesim-zogona', 242, 'La grâce du Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-242-v1', 'eesim-zg-242', 1, 'verse', 'La grâce du Seigneur est si merveilleuse,
Si merveilleuse, si merveilleuse,
La grâce du Seigneur est si merveilleuse,
Si merveilleuse, pour moi.'),
('eesim-zg-242-v2', 'eesim-zg-242', 2, 'verse', 'L''amour du Seigneur est si merveilleux,'),
('eesim-zg-242-v3', 'eesim-zg-242', 3, 'verse', 'La paix du Seigneur...'),
('eesim-zg-242-v4', 'eesim-zg-242', 4, 'verse', 'La joie du Seigneur...');

-- =====================================================
-- CANTIQUE 243: Le Seigneur Jésus en mourant
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-243', 'eesim-zogona', 243, 'Le Seigneur Jésus en mourant', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-243-v1', 'eesim-zg-243', 1, 'verse', 'Le Seigneur Jésus en mourant sur la croix
A sauvé le monde (bis)
Son sang saint, pur a lavé nos péchés
Et tous nous sommes sauvés'),
('eesim-zg-243-v2', 'eesim-zg-243', 2, 'verse', 'Unissons-nous en ce même lieu
Reconnaissons tous ses grands biens faits
Réjouissons-nous car nous sommes sauvés
Car Christ nous a purifiés.');

-- =====================================================
-- CANTIQUE 244: Les oiseaux chantant
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-244', 'eesim-zogona', 244, 'Les oiseaux chantant', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-244-v1', 'eesim-zg-244', 1, 'verse', 'Les oiseaux chantent dans le vent...
Le ciel bleu et l''air est pur,
Et Jésus-Christ est dans mon cœur.'),
('eesim-zg-244-v2', 'eesim-zg-244', 2, 'verse', 'Tu chanteras, joyeux aussi...
Car c''est lui seul qui purifie
Du péché nos cœurs endurcis.');

-- =====================================================
-- CANTIQUE 245: Lève-toi et marche (Acts 3:6)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-245', 'eesim-zogona', 245, 'Lève-toi et marche (Acts 3:6)', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-245-v1', 'eesim-zg-245', 1, 'verse', 'Je n''ai ni argent je n''ai ni or
Au nom de Christ lève-toi.
Lève-toi et marche (bis)
Au nom de Christ lève-toi.');

-- =====================================================
-- CANTIQUE 246: Louange, louange à Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-246', 'eesim-zogona', 246, 'Louange, louange à Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-246-v1', 'eesim-zg-246', 1, 'verse', 'Louange, louange,
Louange à Jésus, notre roi!
Qui pourra condamner ceux qui sont
délivrés et qui marchent dans la sainteté?');

-- =====================================================
-- CANTIQUE 247: Louez Dieu dans son sanctuaire
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-247', 'eesim-zogona', 247, 'Louez Dieu dans son sanctuaire', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-247-c1', 'eesim-zg-247', 1, 'chorus', 'Louez Dieu dans son sanctuaire,
Louez-le partout l''univers,
Louez Dieu dans son sanctuaire
Louez le pour ses hauts faits.'),
('eesim-zg-247-v1', 'eesim-zg-247', 2, 'verse', 'Que le luth et la harpe, et le tambourin,
Les cymbales sonores retentissent pour toi'),
('eesim-zg-247-v2', 'eesim-zg-247', 3, 'verse', 'Avec les danses et les cordes et le chalumeau:
Que tout ce qui respire loue le Seigneur!');

-- =====================================================
-- CANTIQUE 248: Mais moi je suivrai Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-248', 'eesim-zogona', 248, 'Mais moi je suivrai Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-248-v1', 'eesim-zg-248', 1, 'verse', 'Mais moi je suivrai toujours Jésus (bis)
Dans la joie, la souffrance et pour toute ma vie.
Moi, je suivrai toujours Jésus.');

-- =====================================================
-- CANTIQUE 249: Merci, merci Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-249', 'eesim-zogona', 249, 'Merci, merci Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-249-v1', 'eesim-zg-249', 1, 'verse', 'Merci, merci Jésus (ter)
De tout cœur (bis)'),
('eesim-zg-249-v2', 'eesim-zg-249', 2, 'verse', 'Je te loue Jésus (ter)
De tout cœur'),
('eesim-zg-249-v3', 'eesim-zg-249', 3, 'verse', 'Oui je t''aime, Jésus (ter)
de tout cœur. (bis)');

-- =====================================================
-- CANTIQUE 250: Merveilleux amour
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-250', 'eesim-zogona', 250, 'Merveilleux amour', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-250-v1', 'eesim-zg-250', 1, 'verse', 'Merveilleux amour, amour de Dieu pour moi!
Merveilleux amour, de Jésus sur la croix!
Vaste autant que les océans,
Profond plus que les mers,
Haut, plus haut que l''azur des cieux
Est son amour.');

-- =====================================================
-- CANTIQUE 251: Moi, j'ai confiance
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-251', 'eesim-zogona', 251, 'Moi, j''ai confiance', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-251-v1', 'eesim-zg-251', 1, 'verse', 'Moi, j''ai confiance en la bonté (bis)
En la bonté de l''Eternel (bis)
Je chanterai à l''Eternel, car il m''a fait du bien.');

-- =====================================================
-- CANTIQUE 252: Mon auto Jésus la guide
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-252', 'eesim-zogona', 252, 'Mon auto Jésus la guide', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-252-v1', 'eesim-zg-252', 1, 'verse', 'Mon auto Jésus la guide, Alléluia,
Avec lui je fais un chauffeur,
Danger, périls je ne les connais plus
Car je suis en voyage vers la maison du Père.
Avec lui je fais un chauffeur,
Mon auto Jésus la guide.');

-- =====================================================
-- CANTIQUE 253: Mon Dieu est si grand
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-253', 'eesim-zogona', 253, 'Mon Dieu est si grand', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-253-c1', 'eesim-zg-253', 1, 'chorus', 'Hé! Mon Dieu est si grand,
Si fort, et si puissant,
Rien n''est impossible à mon Dieu.'),
('eesim-zg-253-v1', 'eesim-zg-253', 2, 'verse', 'Les monts sont à lui,
Les vallées sont à lui,
Les cieux sont son oeuvre,
Lui aussi a fait les mers.');

-- =====================================================
-- CANTIQUE 254: Dieu règle parfaitement
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-254', 'eesim-zogona', 254, 'Dieu règle parfaitement', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-254-v1', 'eesim-zg-254', 1, 'verse', 'Dieu règle parfaitement
Toute chose, toute vie.
Reposons-nous sur lui,
En lui confiant demain.
Ce qu''il veut, ça doit se faire,
Ce qu''il dit ne peut manquer.
Dieu conduit à la fin,
Tout ce qu''il a commencé.');

-- =====================================================
-- CANTIQUE 255: Ne crains pas la tempête
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-255', 'eesim-zogona', 255, 'Ne crains pas la tempête', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-255-v1', 'eesim-zg-255', 1, 'verse', 'Ne crains pas la tempête,
Jésus veille pour toi.
Jésus commande aux flots.
Prends courage, crois
N''aie pas peur de la détresse,
Jésus calme les vents.
Jésus commande aux flots,
Il règne sur les temps.');

-- =====================================================
-- CANTIQUE 256: Ne crains point crois seulement
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-256', 'eesim-zogona', 256, 'Ne crains point crois seulement', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-256-v1', 'eesim-zg-256', 1, 'verse', 'Ne crains point, crois seulement (ter)
Regarde à moi, Seigneur,
Aie pitié de moi.');

-- =====================================================
-- CANTIQUE 257: Notre Dieu règne encore
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-257', 'eesim-zogona', 257, 'Notre Dieu règne encore', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-257-v1', 'eesim-zg-257', 1, 'verse', 'Notre Dieu règne encore! (bis)
Dieu, Créateur, règne encore!
Oui, je vis parce que Christ vit!
Mon Sauveur vit, je vis.'),
('eesim-zg-257-v2', 'eesim-zg-257', 2, 'verse', 'Notre Dieu règne encore! (bis)
Alors pourquoi s''inquiéter?
Dieu règne encore,
Oui, notre Dieu règne encore.');

-- =====================================================
-- CANTIQUE 258: Nous sommes soldats
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-258', 'eesim-zogona', 258, 'Nous sommes soldats', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-258-v1', 'eesim-zg-258', 1, 'verse', 'Nous sommes soldats de Jésus-Christ.
Notre combat c''est la foi.
Ne craignons pas Satan même s''il s''acharne contre nous.
Car Satan est déjà vaincu par Jésus-Christ.');

-- =====================================================
-- CANTIQUE 259: O comme j'aime Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-259', 'eesim-zogona', 259, 'O comme j''aime Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-259-v1', 'eesim-zg-259', 1, 'verse', 'O comme j''aime Jésus (ter)
Parce qu''il m''a aimé le premier.');

-- =====================================================
-- CANTIQUE 260: On t'a fait connaître
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-260', 'eesim-zogona', 260, 'On t''a fait connaître', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-260-v1', 'eesim-zg-260', 1, 'verse', 'On t''a fait connaître, ô homme,
Ce qui est bien, ce qui est bien.
Et ce que le Seigneur demande,
C''est que tu pratiques la justice,
C''est que tu aimes la miséricorde,
Et que tu marches humblement avec ton Dieu.');

-- =====================================================
-- CANTIQUE 261: Oui Jésus-Christ est tout pour moi
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-261', 'eesim-zogona', 261, 'Oui Jésus-Christ est tout pour moi', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-261-v1', 'eesim-zg-261', 1, 'verse', 'Oui Jésus-Christ est tout pour moi,
Ma vie, ma joie, mon tout!
Il est la raison de ma vie,
Il est mon tout, ma joie.
J''excellerai en toute grâce,
Poursuivrai toujours l''amour.
Puisque Christ marche devant moi,
J''entre le soir en paix bien sûr,
Gloire à mon divin roi.');

-- =====================================================
-- CANTIQUE 262: Où nous faisons parti
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-262', 'eesim-zogona', 262, 'Où nous faisons parti', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-262-v1', 'eesim-zg-262', 1, 'verse', 'Où nous faisons parti,
De la famille de Dieu,
Les héritiers de Dieu.
Nous partageons et nous aimons,
Nous servons Dieu,
Et combattons ensemble comme des frères.
(répéter)');

-- =====================================================
-- CANTIQUE 263: Oui, tu es digne
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-263', 'eesim-zogona', 263, 'Oui, tu es digne', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-263-v1', 'eesim-zg-263', 1, 'verse', 'Oui, tu es digne.
Tu es le Roi des rois, Christ est le souverain,
Elevé dans les cieux et l''alpha et l''oméga,
Commencement et fin.
Tu vis dans les siècles.
Toute langue confesse que tu es le Seigneur
En toi seul je trouve la vie.');

-- =====================================================
-- CANTIQUE 264: Par le nom de Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-264', 'eesim-zogona', 264, 'Par le nom de Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-264-v1', 'eesim-zg-264', 1, 'verse', 'Par le nom de Jésus,
Par le sang de Jésus, (bis)
Par le nom et le sang de Jésus,
J''ai la victoire, j''ai la victoire.');

-- =====================================================
-- CANTIQUE 265: Père je t'adore
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-265', 'eesim-zogona', 265, 'Père je t''adore', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-265-v1', 'eesim-zg-265', 1, 'verse', 'Père je t''adore,
Etends les cieux.
Saint-Esprit de Dieu je t''adore,
Je t''adore toute ma vie.');

-- =====================================================
-- CANTIQUE 266: Père unis-nous tous
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-266', 'eesim-zogona', 266, 'Père unis-nous tous', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-266-v1', 'eesim-zg-266', 1, 'verse', 'Père unis-nous tous
Oui tu fonds tous les coeurs réunis.
Père, dans ta présence là nous déposons
La tristesse et les soucis.');

-- =====================================================
-- CANTIQUE 267: Petit David
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-267', 'eesim-zogona', 267, 'Petit David', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-267-v1', 'eesim-zg-267', 1, 'verse', 'Petit David joue de la harpe,
Gloire! Gloire! Alléluia!
David, petit berger, vainc Goliath avec de petits cailloux.');

-- =====================================================
-- CANTIQUE 268: Pour tes bienfaits, Seigneur
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-268', 'eesim-zogona', 268, 'Pour tes bienfaits, Seigneur', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-268-c1', 'eesim-zg-268', 1, 'chorus', 'Pour tes bienfaits, Seigneur,
Reçois notre merci!
Seigneur, à toi l''honneur,
A toi soit la gloire,
A toi notre merci. (bis)'),
('eesim-zg-268-v1', 'eesim-zg-268', 2, 'verse', 'Pour la santé, Seigneur,
Reçois notre merci!'),
('eesim-zg-268-v2', 'eesim-zg-268', 3, 'verse', 'Pour le travail, Seigneur,
Reçois notre merci!'),
('eesim-zg-268-v3', 'eesim-zg-268', 4, 'verse', 'Pour les repas, Seigneur,
Reçois notre merci!');

-- =====================================================
-- CANTIQUE 269: Prosternez-vous
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-269', 'eesim-zogona', 269, 'Prosternez-vous', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-269-v1', 'eesim-zg-269', 1, 'verse', 'Prosternez-vous devant votre Roi,
Adorez-le de tout votre coeur.
Faites monter vers sa majesté
Des chants de gloire pour votre Roi des rois!');

-- =====================================================
-- CANTIQUE 270: Quand je sombrais
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-270', 'eesim-zogona', 270, 'Quand je sombrais', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-270-v1', 'eesim-zg-270', 1, 'verse', 'Quand je sombrais dans la boue du péché,
Je m''enfonçais par la mort, enlacé,
Et quand vaincu, j''étais désespéré,
Quel merveilleux Sauveur j''ai trouvé,
Christ m''a délivré.
Il m''a délivré.
Il m''a délivré.');

-- =====================================================
-- CANTIQUE 271: Quand je vois la bonté de Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-271', 'eesim-zogona', 271, 'Quand je vois la bonté de Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-271-v1', 'eesim-zg-271', 1, 'verse', 'Quand je vois la bonté de Jésus
Et tout ce qu''il a fait pour moi
Mon coeur crie à lui fort alléluia!
Gloire à Dieu, il est mon Roi.');

-- =====================================================
-- CANTIQUE 272: Quand je vois le ciel
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-272', 'eesim-zogona', 272, 'Quand je vois le ciel', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-272-v1', 'eesim-zg-272', 1, 'verse', 'Quand je vois le ciel
Oeuvre de tes doigts
La lune et les étoiles que tu créas (bis)
Qu''est donc l''homme, O Eternel (ter)
Que tu prennes garde à lui?
Quand je vois le ciel
Oeuvre de tes doigts
La lune et les étoiles que tu créas.');

-- =====================================================
-- CANTIQUE 273: Quand l'Esprit de Dieu
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-273', 'eesim-zogona', 273, 'Quand l''Esprit de Dieu', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-273-v1', 'eesim-zg-273', 1, 'verse', 'Quand l''Esprit de Dieu habite en moi
Je chante comme David
Je chante, je chante, je chante comme David, (bis)'),
('eesim-zg-273-v2', 'eesim-zg-273', 2, 'verse', 'Je prie... Je loue... Je danse...');

-- =====================================================
-- CANTIQUE 274: Quand les montagnes
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-274', 'eesim-zogona', 274, 'Quand les montagnes', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-274-c1', 'eesim-zg-274', 1, 'chorus', 'Mon amour, oui mon amour
Ne s''éloignera point de toi (bis)
(Répéter première strophe)'),
('eesim-zg-274-v1', 'eesim-zg-274', 2, 'verse', 'Quand les montagnes s''éloigneraient,
Quand les collines chancelleraient,
Quand les montagnes s''éloigneraient,
Dieu est tout comme il promet.');

-- =====================================================
-- CANTIQUE 275: Que la gloire du Seigneur (Canon)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-275', 'eesim-zogona', 275, 'Que la gloire du Seigneur (Canon)', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-275-v1', 'eesim-zg-275', 1, 'verse', 'Que la gloire du Seigneur, subsiste à jamais
Qu''il se réjouisse de ses oeuvres,
Je célébrerai le Seigneur tant que j''existerai,
Je célébrerai son nom tant que je vivrai.');

-- =====================================================
-- CANTIQUE 276: Que ma vie te glorifie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-276', 'eesim-zogona', 276, 'Que ma vie te glorifie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-276-v1', 'eesim-zg-276', 1, 'verse', 'Que ma vie te glorifie, te glorifie,
Que ma vie te glorifie, Seigneur.'),
('eesim-zg-276-v2', 'eesim-zg-276', 2, 'verse', 'Que ma langue te glorifie, te glorifie...');

-- =====================================================
-- CANTIQUE 277: Quel bonheur de marcher avec lui
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-277', 'eesim-zogona', 277, 'Quel bonheur de marcher avec lui', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-277-v1', 'eesim-zg-277', 1, 'verse', 'Quel bonheur de marcher avec lui (bis)
Il conduit tous mes pas de mon voyage ici bas.
Quel bonheur de marcher avec lui.');

-- =====================================================
-- CANTIQUE 278: Reçois favorablement
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-278', 'eesim-zogona', 278, 'Reçois favorablement', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-278-v1', 'eesim-zg-278', 1, 'verse', 'Reçois favorablement les paroles de ma bouche
Et les sentiments de mon coeur, O Seigneur (bis)
O Seigneur, O seigneur (Femmes, Hommes),
Mon rocher, mon rocher
O Seigneur
Ma vie, ma vie!
Reçois favorablement les paroles de ma bouche
Et les sentiments de mon coeur, O Seigneur.');

-- =====================================================
-- CANTIQUE 279: Réjouissez-vous toujours
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-279', 'eesim-zogona', 279, 'Réjouissez-vous toujours', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-279-v1', 'eesim-zg-279', 1, 'verse', 'Réjouissez-vous toujours dans le Seigneur (3)
Je le répète: Réjouissez-vous!');

-- =====================================================
-- CANTIQUE 280: Retour d'Emmanuel
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-280', 'eesim-zogona', 280, 'Retour d''Emmanuel', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-280-c1', 'eesim-zg-280', 1, 'chorus', 'Ref: Reviens Emmanuel, Emmanuel, Emmanuel
Reviens Emmanuel, Emmanuel, Reviens'),
('eesim-zg-280-v1', 'eesim-zg-280', 2, 'verse', 'Entends-tu la voix qui t''appelle
Reconnais-tu la voix qui t''appelle (ter) Aujourd''hui
C''est Jésus, Jésus qui t''appelle (ter) Aujourd''hui
Oh Seigneur écoute ma prière (ter) Pour la vie
Oh Seigneur je veux te suivre (ter) Aujourd''hui');

-- =====================================================
-- CANTIQUE 281: Roi des rois
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-281', 'eesim-zogona', 281, 'Roi des rois', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-281-v1', 'eesim-zg-281', 1, 'verse', 'Roi des rois, Seigneur des Seigneurs (bis)
Gloire! Alléluia!
Jésus prince de paix
Gloire! Alléluia! (bis)');

-- =====================================================
-- CANTIQUE 282: Sachez que je suis l'Eternel Dieu
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-282', 'eesim-zogona', 282, 'Sachez que je suis l''Eternel Dieu', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-282-v1', 'eesim-zg-282', 1, 'verse', 'Sachez que je suis l''Eternel Dieu (3)
Je suis l''Eternel qui te guéri. (3)
En toi, Seigneur, je me confie. (3)');

-- =====================================================
-- CANTIQUE 283: Saint, saint est l'Eternel
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-283', 'eesim-zogona', 283, 'Saint, saint est l''Eternel', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-283-v1', 'eesim-zg-283', 1, 'verse', 'Saint, saint est l''Eternel (bis)
Dieu tout puissant (bis)
Qui était et qui est et qui vient
Qui nous a délivré par son sang
A lui la gloire aux siècles (bis)
Des siècles, Amen!');

-- =====================================================
-- CANTIQUE 284: Seigneur, tu es notre joie
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-284', 'eesim-zogona', 284, 'Seigneur, tu es notre joie', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-284-v1', 'eesim-zg-284', 1, 'verse', 'Seigneur, tu es notre joie, notre vie, notre espérance,
Seigneur, tu es notre joie, notre espérance. Sans toi,
Seigneur, tu es notre joie; nous ne sommes rien. Sans toi,
Quand parfois dans notre vie, tout est froid et sans lumière,
Seigneur notre joie, notre joie.
C''est vers toi seul que nous conduit l''espoir d''être ton ami.
Seigneur notre joie, notre joie.
(Répéter première strophe, bis)');

-- =====================================================
-- CANTIQUE 285: Si je n'ai pas l'amour
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-285', 'eesim-zogona', 285, 'Si je n''ai pas l''amour', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-285-v1', 'eesim-zg-285', 1, 'verse', 'Si je donnais mon argent (bis)
Si je donnais tous mes biens, (bis)
Si je n''ai pas l''amour
Tout cela serait vain.');

-- =====================================================
-- CANTIQUE 286: Si tu confesse tes péchés
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-286', 'eesim-zogona', 286, 'Si tu confesse tes péchés', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-286-v1', 'eesim-zg-286', 1, 'verse', 'Si tu confesses tes péchés (ter)
Je te pardonnerai.
Le sang de Christ peut rendre pur (ter)
Le coeur le plus mauvais.
Je garderai ton coeur en paix (ter)
En moi confie-toi.
Dans ta faiblesse, mon enfant (ter)
Ma grâce te suffit.
Et si tu passes par le feu (ter)
Avec toi je serai.');

-- =====================================================
-- CANTIQUE 287: Si tu savais
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-287', 'eesim-zogona', 287, 'Si tu savais', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-287-v1', 'eesim-zg-287', 1, 'verse', 'Si tu savais comme il t''aime,
Pécheur, tu viendrais à Lui:
Tu viendrais à l''instant même,
Tu viendrais dès aujourd''hui!');

-- =====================================================
-- CANTIQUE 288: Ta parole est une lampe - Ps 119.105
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-288', 'eesim-zogona', 288, 'Ta parole est une lampe - Ps 119.105', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-288-v1', 'eesim-zg-288', 1, 'verse', 'Ta parole est une lampe à mes pieds,
Et une lumière (bis)
Ta parole est une lampe à mes pieds
Et une lumière sur mon sentier.');

-- =====================================================
-- CANTIQUE 289: Te ressembler, Jésus
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-289', 'eesim-zogona', 289, 'Te ressembler, Jésus', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-289-v1', 'eesim-zg-289', 1, 'verse', 'Te ressembler Jésus, c''est mon espoir suprême.
Penser, agir, aimer, toujours plus comme toi.
Te ressembler, Jésus, c''est mon espoir suprême.
Par ton Esprit rends-moi semblable à toi.');

-- =====================================================
-- CANTIQUE 290: Tendre Père
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-290', 'eesim-zogona', 290, 'Tendre Père', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-290-v1', 'eesim-zg-290', 1, 'verse', 'Tendre Père, j''aime te contempler. (bis)
Je t''offre ma vie, je chante ta gloire.
Tendre Père, j''aime te contempler.'),
('eesim-zg-290-v2', 'eesim-zg-290', 2, 'verse', 'Fils de Dieu j''aime exalter ton nom. (bis)
Tu m''aimes, tu m''aides, tu combles ma vie.
Fils de Dieu j''aime exalter ton nom.'),
('eesim-zg-290-v3', 'eesim-zg-290', 3, 'verse', 'Saint-Esprit, tu éclaires ma vie. (bis)
Tu diriges mes pas, Tu restes près de moi.
Saint-Esprit, tu éclaires ma vie.');

-- =====================================================
-- CANTIQUE 291: Tous ensemble amis (Canon à 4 voix)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-291', 'eesim-zogona', 291, 'Tous ensemble amis (Canon à 4 voix)', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-291-v1', 'eesim-zg-291', 1, 'verse', '1) Tous ensemble, amis, chantons d''un coeur joyeux,
Oui, chantons, louons notre Dieu;
2) Tous ensemble et d''un coeur joyeux,
Oui, chantons, louons notre Dieu;
3) Oui, chantons, louons notre Dieu;
4) Oui, chantons, louons notre Dieu,
Amen, Amen, Alléluia!');

-- =====================================================
-- CANTIQUE 292: Tout dit qu'il est merveilleux
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-292', 'eesim-zogona', 292, 'Tout dit qu''il est merveilleux', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-292-v1', 'eesim-zg-292', 1, 'verse', 'Tout dit qu''il est merveilleux: (bis)
La terre et la mer,
La splendeur des cieux
Oui, tout dit qu''il est merveilleux,
Je sais qu''il est merveilleux. (bis)
Il aime, il console il me rend heureux.
Oui, je sais qu''il est merveilleux.');

-- =====================================================
-- CANTIQUE 293: Toutes choses concourent au bien
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-293', 'eesim-zogona', 293, 'Toutes choses concourent au bien', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-293-v1', 'eesim-zg-293', 1, 'verse', 'Toutes choses concourent au bien
De ceux qui aiment Dieu,
De ceux qui sont appelés selon son dessein.
Toutes choses concourent au bien.
De ceux qui aiment Dieu,
Oui tout, tout, tout concourent à leur bien.');

-- =====================================================
-- CANTIQUE 294: Tu es ma gloire, tu relèves ma tête
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-294', 'eesim-zogona', 294, 'Tu es ma gloire, tu relèves ma tête', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-294-v1', 'eesim-zg-294', 1, 'verse', 'Tu es ma gloire, tu relèves ma tête (bis)
O Seigneur, tu es mon bouclier.
Tu es ma joie, tu relèves ma tête
Seigneur de ma voix je crie a toi, (3)
Et tu me réponds de ton saint lieu.
(Répéter première strophe)');

-- =====================================================
-- CANTIQUE 295: Tu es ma joie - Ps: 5
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-295', 'eesim-zogona', 295, 'Tu es ma joie - Ps: 5', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-295-v1', 'eesim-zg-295', 1, 'verse', 'Tu es ma joie, tu relèves ma tête.
Toi, Seigneur, tu es mon bouclier.
Tu es ma joie, tu relèves ma tête
Seigneur de ma voix je crie a toi (ter)
Et tu me réponds de ton Saint lieu...');

-- =====================================================
-- CANTIQUE 296: Un autre monde m'attend là-haut
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-296', 'eesim-zogona', 296, 'Un autre monde m''attend là-haut', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-296-v1', 'eesim-zg-296', 1, 'verse', 'Un autre monde m''attend là-haut, là-haut
Un autre monde m''attend là-haut (bis)
Mon Sauveur va me préparer un lieu (bis)
Un autre monde m''attend là-haut.');

-- =====================================================
-- CANTIQUE 297: Venez décharger
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-297', 'eesim-zogona', 297, 'Venez décharger', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-297-v1', 'eesim-zg-297', 1, 'verse', 'Venez décharger vos fardeaux,
Vos fardeaux aux pieds de Jésus.');

-- =====================================================
-- CANTIQUE 298: Vers Jésus lève les yeux
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-298', 'eesim-zogona', 298, 'Vers Jésus lève les yeux', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-298-v1', 'eesim-zg-298', 1, 'verse', 'Vers Jésus lève les yeux, contemple son visage merveilleux,
Et les choses de la terre pâliront peu à peu.
Si tu lèves vers Jésus les yeux.
Christ est pour moi un Sauveur admirable,
Un intercesseur, il n''a rien de comparable.
Son nom béni n''a rien de comparable.
Sur cette terre et là-haut dans les cieux.');

-- =====================================================
-- CANTIQUE 299: Viens Esprit du Dieu vivant
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-299', 'eesim-zogona', 299, 'Viens Esprit du Dieu vivant', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-299-v1', 'eesim-zg-299', 1, 'verse', 'Viens, Esprit du Dieu Vivant (bis)
Sonde moi, courbe moi.
Brise moi, remplis moi.
Viens, Esprit du Dieu Vivant
Sois le Maître en moi.');

-- =====================================================
-- CANTIQUE 300: Voici l'agneau de Dieu (Hymne de l'Unité)
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-300', 'eesim-zogona', 300, 'Voici l''agneau de Dieu (Hymne de l''Unité)', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-300-c1', 'eesim-zg-300', 1, 'chorus', 'Voici l''agneau de Dieu,
Ôté le péché de l''humanité (tous)
Voici le fils de Dieu,
Voici le pain librement pour accomplir sa volonté.
Il se donne librement en nourriture.
(En écho première strophe)'),
('eesim-zg-300-v1', 'eesim-zg-300', 2, 'verse', 'Son nom est Jésus, Jésus notre sauveur du péché.
Car il vient nous sauver, Jésus, Jésus,
Son nom vient tout sauver du péché.');

-- =====================================================
-- CANTIQUE 301: Voici, je vous donne
-- =====================================================
INSERT INTO hymns (id, book_id, number, title, created_at, updated_at)
VALUES ('eesim-zg-301', 'eesim-zogona', 301, 'Voici, je vous donne', datetime('now'), datetime('now'));

INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content) VALUES
('eesim-zg-301-v1', 'eesim-zg-301', 1, 'verse', 'Voici, je vous donne
Un commandement nouveau
Aimez-vous les uns les autres
Comme je vous ai aimés (bis)
A ceci tous connaîtront que vous êtes
Mes disciples
Si vous avez de l''amour.');
