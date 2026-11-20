/* Contenu du PDF « Portfolio » : pour chaque projet, les pages à produire, avec les textes repris des pages projet
 * (du brief au résultat). Les références internes (« Réf. … »), tampons « VALIDÉ » et noms de médecins ne sont pas repris.
 *
 * Types de page :
 *   intro : { t:'intro', kv:[[libellé, valeur]…], pull:'phrase d'accroche', hero:{src, cap, bg} }
 *   text  : { t:'text', label, title, paras:[…], cards:[{t,d}], chips:[{l, items:[…]}], imgs:[{src,cap,bg}] }
 *   grid  : { t:'grid', label, intro, items:[{src,cap,bg}], cols, rows, fit:'contain'|'cover' }
 * Les images viennent des projets (assets/…), pas des miniatures animées.
 */
(function () {
  var A = function (n) { return '/assets/' + n; };
  var R = function (n) { return '/portfolio-pdf/img/real/' + n; };
  var NAVY = '#0d1b4b', GREY = '#f0f0f0';
  function seq(prefix, from, to, cap) { var o = []; for (var i = from; i <= to; i++) o.push({ src: A(prefix + i + '.png') }); return o; }

  window.PDF_CONTENT = {

    'tenofort': { pages: [
      { t: 'intro', pull: "L’enjeu : rendre visible ce qui est invisible.",
        kv: [['Client', 'Labrha'], ['Produit', 'Tenofort'], ['Cible', 'Sportifs · Fort impact articulaire'], ['Format', 'Campagne affiches print & digitale'],
             ['Objectif', 'Rendre visible ce qui est invisible — positionner Tenofort comme le complément indispensable de chaque sportif exposé aux contraintes tendineuses.']],
        hero: { src: A('tenofort-affiche-trail.jpg'), cap: 'Affiche Trail' } },
      { t: 'text', label: 'L’insight', title: 'Les tendons.',
        paras: ['Dans le sport, on célèbre les victoires, les records, la puissance. Mais derrière chaque geste spectaculaire se cache une mécanique que personne ne voit.',
                'Les tendons : ils absorbent les chocs, transmettent la force, rendent chaque performance possible — et restent systématiquement ignorés jusqu’au jour où ils lâchent.',
                '« La force derrière chaque geste »'],
        label2: 'Le parti pris créatif', title2: 'La force derrière chaque geste',
        paras2: ['Mettre en scène des sportifs dans l’effort — tennis, trail, natation, boxe — et révéler discrètement le produit, comme la mécanique cachée derrière la performance.'],
        chips: [{ l: 'Palette visuelle', items: ['Terre battue', 'Brume', 'Nuit', 'Tenofort'] },
                { l: 'Direction typographique', items: ['TENOFORT — Condensé · Capitales · Impact', 'Chiffres factuels en serif'] },
                { l: 'Territoire visuel', items: ['Sportif', 'Factuel', 'Invisible → visible', 'Force silencieuse', 'Anatomique', 'Effort réel'] }],
        imgs: [{ src: A('tenofort.png'), cap: '' }] },
      { t: 'grid', label: 'Les chiffres clés', cols: 4, rows: 1,
        intro: 'Chaque affiche repose sur un chiffre fort ancré dans la réalité sportive — des données qui traduisent l’effort invisible des tendons.',
        items: [{ src: A('tenofort-affiche-tennis.jpg'), cap: 'Tennis — 250 revers par match' }, { src: A('tenofort-affiche-trail.jpg'), cap: 'Trail — 1 500 foulées par km' },
                { src: A('tenofort-affiche-natation.jpg'), cap: 'Natation — 40 tractions par 50 m' }, { src: A('tenofort-affiche-boxe.jpg'), cap: 'Boxe — 80 coups par round' }] }
    ] },

    'livrets': { pages: [
      { t: 'intro', pull: '2 cibles, 1 livret : trouver l’équilibre.',
        kv: [['Client', 'Labrha — Laboratoire'], ['Catégorie', 'Compléments alimentaires articulaires'], ['Produits', 'Tenofort · Cuivramine'], ['Format', 'Livrets recto / verso'],
             ['Cibles', 'Professionnels de santé (prescripteurs) & patients — double lectorat sur le même support.'],
             ['Objectif', 'Concevoir des livrets qui vulgarisent les informations scientifiques, valorisent les ingrédients actifs et convainquent aussi bien le médecin que le patient, tout en respectant les règles de communication sur les compléments alimentaires.']],
        hero: { src: A('mockteno.png'), cap: 'Livret Tenofort' } },
      { t: 'text', label: 'L’insight', title: 'Science lisible, bénéfice visible.',
        paras: ['Un professionnel de santé lit des données cliniques. Un patient cherche à comprendre. Le même livret doit parler aux deux — sans sacrifier la rigueur pour l’un, ni la clarté pour l’autre.',
                'Chaque livret est structuré en deux registres complémentaires : la preuve scientifique pour le prescripteur, le bénéfice concret pour le patient. Une hiérarchie visuelle claire, des pictogrammes et des call-to-action rendent chaque face du support autonome et immédiatement lisible.'],
        label2: 'Les actifs',
        paras2: ['La composition naturelle, c’est le cœur du produit — et la mettre en valeur n’est pas optionnel. Les cibles ne sont pas seulement des patients en recherche d’efficacité : ce sont aussi des personnes qui ont fait le choix du naturel, qui lisent les étiquettes et qui veulent comprendre ce qu’elles prennent. Chaque ingrédient est donc présenté avec son nom, son origine et son rôle — pour que la formule devienne un argument, pas juste une liste.'],
        imgs: [{ src: A('gingembre.png'), cap: 'Gingembre — Zingiber officinale' }, { src: A('prele.png'), cap: 'Prêle — Equisetum arvense' },
               { src: A('spiru.png'), cap: 'Spiruline — Arthrospira platensis' }, { src: A('ginseng.png'), cap: 'Ginseng — Panax ginseng' }], imgCols: 2 },
      { t: 'grid', label: 'Tenofort — complément articulaire', cols: 2, rows: 2,
        items: [{ src: A('flyertenorecto.png'), cap: 'Recto' }, { src: A('flyertenoverso.png'), cap: 'Verso' }, { src: A('teno.png'), cap: 'Le produit' }, { src: A('mockteno.png'), cap: 'Le livret' }] },
      { t: 'grid', label: 'Cuivramine — complément articulaire', cols: 2, rows: 2,
        items: [{ src: A('cuivrarecto.png'), cap: 'Recto' }, { src: A('cuivraverso.png'), cap: 'Verso' }, { src: A('cuivra.png.png'), cap: 'Le produit' }, { src: A('cuivramock.png'), cap: 'Le livret' }] }
    ] },

    'pandora': { pages: [
      { t: 'intro', pull: 'CE marqué MDR 2017/745 + 3 références distinctes.',
        kv: [['Client', 'Labrha'], ['Produit', 'Pandora — Dispositif médical viscosupplémentation'], ['Indication', 'Traitement de l’arthrose'], ['Gamme', 'Pandora 3 · Pandora One · PandoraCross'],
             ['Périmètre', 'Packagings boîtes · Notices réglementaires · Blisters · Cartes d’implants — conformité MDR 2017/745'],
             ['Objectif', 'Créer une identité visuelle forte et cohérente sur l’ensemble de la gamme, respectant les contraintes réglementaires strictes des dispositifs médicaux, tout en se démarquant sur le marché de la rhumatologie.']],
        hero: { src: A('pandoviolet.png'), cap: 'Pandora One' } },
      { t: 'text', label: 'L’insight', title: 'Une empreinte, trois identités.',
        paras: ['Un dispositif médical injecté dans l’articulation — en cabinet, chez son médecin, son rhumatologue ou son médecin du sport. Le patient, le prescripteur, le pharmacien : trois regards différents sur la même boîte. Le design doit parler à chacun.',
                'Le motif reprend la forme caractéristique laissée lors du processus de réticulation du gel d’acide hyaluronique — signature propre à Labrha. Trois couleurs distinctes ancrent chaque référence dans son territoire visuel, pour une identification immédiate en cabinet comme en officine.'],
        label2: 'L’univers graphique', title2: 'L’empreinte de la réticulation',
        paras2: ['Le motif reprend la forme laissée lors du processus de réticulation du gel d’acide hyaluronique — une signature propre à Labrha. Décliné en trois coloris, il devient l’empreinte visuelle de toute la gamme et différencie immédiatement chaque référence.',
                 'Code couleur différenciant : là où tous nos concurrents misent sur le blanc et le beige, nous avons choisi la couleur. Voir la boîte, c’est savoir que c’est Pandora. Une identité visuelle forte, immédiatement reconnaissable, qui revendique une image premium et élimine toute confusion entre références.'],
        chips: [{ l: 'Palette produit — trois références', items: ['Pandora 3 — Solution 3 ml · Arthrose du genou', 'Pandora One — Solution 1 ml · Petites articulations', 'PandoraCross — Formulation cross-linkée'] }],
        imgs: [{ src: A('pandora.png'), cap: '' }] },
      { t: 'grid', label: 'Les boîtes', cols: 3, rows: 1,
        items: [{ src: A('pandoviolet.png'), cap: 'Pandora One' }, { src: A('pandobleu.png'), cap: 'Pandora 3' }, { src: A('pandorose.png'), cap: 'PandoraCross' }] },
      { t: 'grid', label: 'Bon à tirer, notices et blister', cols: 4, rows: 1,
        intro: 'Packagings : 3 boîtes × 2 formats (réf. + langue) · Notices : multilingues, conformes MDR 2017/745 · Blisters : conditionnement primaire × 3 références · Cartes d’implants : traçabilité patient, obligatoire pour un dispositif médical implantable.',
        items: [{ src: A('pandobat.png'), cap: 'BAT — vue à plat' }, { src: A('pandonotice1.png'), cap: 'Notice réglementaire' }, { src: A('pandonotice2.png'), cap: 'Notice réglementaire' }, { src: A('pandoblister.png'), cap: 'Blister — conditionnement primaire' }] },
      { t: 'grid', label: 'Visuels de la gamme', cols: 2, rows: 2, fit: 'cover',
        items: [{ src: A('pandophoto1.png') }, { src: A('pandophoto2.png') }, { src: A('pandophoto3.png') }, { src: A('pandophoto4.png') }] }
    ] },

    'vasculyon-id': { pages: [
      { t: 'intro', pull: 'Expertise médicale + ancrage lyonnais.',
        kv: [['Clients', 'Praticiens du cabinet'], ['Cabinet', 'Vasculyon — Chirurgie vasculaire & endovasculaire'], ['Sites', 'Lyon · Vienne · Vénissieux'], ['Périmètre', 'Identité visuelle complète + site web'],
             ['Objectif', 'Créer une marque médicale mémorable ancrée dans son territoire lyonnais, capable d’inspirer confiance à trois profils distincts : patients, médecins adresseurs et nouveaux consultants.']],
        hero: { src: A('vasculogocolor.png'), cap: 'Le logo' } },
      { t: 'text', label: 'L’insight', title: 'Un logo, deux lectures.',
        paras: ['La chirurgie vasculaire est une discipline invisible — les patients ne choisissent pas leur chirurgien comme on choisit un restaurant. Ils cherchent confiance, compétence, et un ancrage local rassurant.',
                'La réponse créative tient en une seule image : un symbole qui dit à la fois « spécialiste médical » et « lyonnais », sans avoir à choisir entre les deux. Réseau vasculaire = Rhône & Saône.'],
        label2: 'L’identité visuelle', title2: 'La double lecture',
        paras2: ['Le symbole s’inspire simultanément du réseau vasculaire humain et des deux fleuves de Lyon. Leur confluence symbolise circulation, flux et équilibre — au cœur de la mission du cabinet.'],
        cards: [{ t: 'Lecture médicale', d: 'Les lignes organiques évoquent le réseau vasculaire humain. Le dégradé bleu → violet → rouge distingue visuellement veines et artères.' },
                { t: 'Lecture lyonnaise', d: 'Les mêmes lignes fluides tracent la confluence du Rhône et de la Saône — identité géographique forte, signe d’appartenance au territoire.' }],
        chips: [{ l: 'Palette de marque', items: ['Veines', 'Transition', 'Artères', 'Marine'] }, { l: 'Typographie du logo', items: ['VASCULYON — Trajan Pro · Serif · Capitales', 'Élégance médicale, ancrage classique'] }] },
      { t: 'grid', label: 'Le logo — trois déclinaisons', cols: 3, rows: 1,
        items: [{ src: A('vasculogocolor.png'), cap: 'Couleur' }, { src: A('vasculogowhite.png'), cap: 'Blanc', bg: NAVY }, { src: A('vasculogoblack.png'), cap: 'Noir', bg: GREY }] },
      { t: 'grid', label: 'Plaquette médicale', cols: 3, rows: 1,
        items: [{ src: A('vasculivretface.png'), cap: 'Couverture' }, { src: A('vasculivretgauche.png'), cap: 'Intérieur — page gauche' }, { src: A('vasculivretdroit.png'), cap: 'Intérieur — page droite' }] },
      { t: 'grid', label: 'Textile — blouses brodées', cols: 3, rows: 1, fit: 'cover',
        intro: 'L’identité Vasculyon déclinée sur les tenues des praticiens — broderie fil de couleur sur fond sombre. La marque portée au quotidien, au bloc opératoire comme en consultation.',
        items: [{ src: A('vascublouse.png'), cap: 'Blouse brodée' }, { src: A('vascuphoto1.png') }, { src: A('vascuphoto2.png') }] }
    ] },

    'vogalib': { pages: [
      { t: 'intro', pull: 'Briser les codes de la pharma.',
        kv: [['Cadre', 'Projet d’école · produit imposé'], ['Produit', 'Vogalib 7,5 mg'], ['Cible', 'Jeunes actifs · Saison estivale'], ['Format', 'Campagne affiche & déclinaisons'],
             ['Objectif', 'Communiquer sur l’efficacité du produit de façon décalée et mémorable, en évitant les codes froids et cliniques habituels de la communication pharma.']],
        hero: { src: A('vogalib-affiche.jpg'), cap: 'Affiche « Good Vagues Only* »' } },
      { t: 'text', label: 'L’insight', title: 'Parler aux vivants.',
        paras: ['Les médicaments anti-nausées s’adressent aux malades, dans l’urgence et l’inconfort. Mais leur cible, ce sont aussi des gens qui veulent juste profiter de leur été.',
                'La communication pharma parle à des patients. Vogalib peut parler à des surfeurs, des festivaliers, des voyageurs — et leur dire que rien ne les arrête. « Good Vagues Only »'],
        label2: 'Le parti pris créatif', title2: 'Good Vagues Only*',
        paras2: ['Détourner « Good Vibes Only » pour ancrer immédiatement Vogalib dans l’univers estival. L’estomac devient un océan à dompter, le surfeur incarne la légèreté après traitement.'],
        chips: [{ l: 'Palette de la campagne', items: ['Apaisement', 'Profondeur', 'Nausée', 'Légèreté'] },
                { l: 'Registre visuel', items: ['Minimaliste · Flat · Vectoriel', 'Surfeur = silhouette en ligne, planche = cachet'] },
                { l: 'Territoire créatif', items: ['Estival', 'Décalé', 'Anti-pharma', 'Métaphore', 'Packaging → affiche', 'Déclinable'] }],
        imgs: [{ src: A('vogalib-affiche-abribus.jpg'), cap: 'En situation — affichage urbain' }] },
      { t: 'text', label: 'Les piliers du concept', title: 'Trois éléments structurent le concept.',
        paras: ['Trois éléments structurent le concept et assurent sa cohérence visuelle et mémorielle.'],
        cards: [{ t: 'L’accroche — Good Vagues Only*', d: 'Détournement de « Good Vibes Only » — immédiatement lisible, estival, mémorable. L’astérisque renvoie au discours légal, intrigué dans l’univers de la publicité pharma.' },
                { t: 'La métaphore — Estomac Océan', d: 'L’estomac devient un terrain de surf. Les nausées sont des vagues à dompter. Le surfeur minimaliste — dont la planche évoque le cachet — incarne la légèreté de l’après-traitement.' },
                { t: 'La continuité — Pack → Affiche', d: 'Les vagues de l’affiche reprennent directement le motif graphique du packaging Vogalib. La campagne prolonge l’univers produit plutôt que de le trahir.' }],
        note: 'Nausée légère → nausée intense : les différentes nuances de rouge représentent les seuils de la nausée — Vogalib en traite tous les niveaux. Le bleu, c’est la promesse : l’apaisement.' }
    ] },

    'metz-affiches': { pages: [
      { t: 'intro', pull: 'La ville comme scène, les rues comme affiche.',
        kv: [['Client', 'Ville de Metz'], ['Catégorie', 'Communication événementielle'], ['Période', 'Été 2022'], ['Formats', 'Affichage urbain · Street art éphémère'],
             ['Cibles', 'Habitants de Metz & visiteurs — créer un sentiment de fête, de fierté locale et d’envie de participer aux événements de l’été.'],
             ['Objectif', 'Concevoir une identité visuelle estivale forte, ancrée dans l’imaginaire messin, festive et distinctive. Transformer la ville elle-même en terrain de jeu le temps de l’été.']],
        hero: { src: A('metzm.png'), cap: 'Affichage urbain' } },
      { t: 'text', label: 'Le territoire', title: 'La ville comme terrain de jeu.',
        paras: ['Metz, ville d’art et d’histoire aux bords de la Moselle — architecture dorée, cathédrale de lumière, espaces verts généreux. Un cadre qui n’a pas besoin d’être inventé — juste révélé.'],
        label2: 'Le parti pris',
        paras2: ['L’idée centrale : ne pas seulement communiquer sur les événements, mais intégrer la communication dans l’espace urbain lui-même. Le street art éphémère transforme chaque mur, chaque sol, chaque coin de rue en invitation à la fête.',
                 'Des interventions visuelles disposées aux carrefours stratégiques de la ville créent un parcours de découverte qui surprend et donne envie de déambuler. Metz devient elle-même le média.'],
        imgs: [{ src: A('metzville1.png') }, { src: A('metzville2.png') }, { src: A('metzmood.png'), cap: 'Street art éphémère' }], imgCols: 3, imgsBelow: true },
      { t: 'text', label: 'La légende', title: 'Tu connais le Graouilli ?',
        paras: ['Serpent monstrueux sorti des ruines de l’Amphithéâtre romain, le Graouilli est la créature fondatrice du folklore messin. Sa légende traverse les siècles — mais la connais-tu vraiment ?'],
        chips: [{ l: 'Quiz interactif — Qu’est-ce que le Graouilli ?', items: ['Un géant de pierre', 'Un serpent-dragon monstrueux', 'Une sorcière maléfique', 'Un loup-garou des forêts messines'] }],
        imgs: [{ src: A('metzg.png') }, { src: A('metzg2.jpg') }], imgCols: 2, imgsBelow: true },
      { t: 'grid', label: 'Réalisations — affiches Play With Metz', cols: 2, rows: 1, items: [{ src: A('metza1.png'), cap: 'Affiche 01' }, { src: A('Metza2.png'), cap: 'Affiche 02' }] },
      { t: 'grid', label: 'Réalisations — campagne Lumières d’Europe', cols: 4, rows: 1,
        items: [{ src: A('metz-lumieres-1.webp'), cap: 'Lumières d’Europe 01' }, { src: A('metz-lumieres-2.webp'), cap: 'Lumières d’Europe 02' }, { src: A('metz-lumieres-3.webp'), cap: 'Lumières d’Europe 03' }, { src: A('metz-lumieres-4.webp'), cap: 'Lumières d’Europe 04' }] }
    ] },

    'metz-film': { pages: [
      { t: 'intro', pull: 'Metz Estival — le film.',
        kv: [['Client', 'Ville de Metz'], ['Période', 'Été 2022'], ['Format', 'Film de la campagne de promotion touristique'], ['Mon rôle', 'Écriture des textes, choix des lieux de tournage, brief du motion design et coordination.']],
        hero: { src: '/portfolio-pdf/img/metz-film.jpg', cap: 'Extrait du film' } }
    ] },

    'f3df-3d': { pages: [
      { t: 'intro', pull: 'La 3D, c’est pas sorcier.',
        kv: [['Client', 'F3DF — impression 3D · freelance 2022'], ['Format', 'Série de 5 vidéos'],
             ['Concept', 'Une série de vidéos reprenant les codes de la célèbre émission « C’est pas sorcier », appliqués cette fois à l’impression 3D.'],
             ['Épisodes', 'Épisode 01 · Épisode 02 · Épisode 03 · Épisode 04 · Épisode 05'],
             ['Mon rôle', 'Écriture, tournage et montage des épisodes, sur le modèle de l’émission « C’est pas sorcier ».']],
        hero: { src: '/portfolio-pdf/img/f3df-3d.jpg', cap: 'Extrait d’un épisode' } }
    ] },

    'f3df-reseaux': { pages: [
      { t: 'text', label: 'F3DF — Freelance 2022', wideImgs: true, title: 'Community management & direction artistique',
        cards: [{ t: 'Visuels produits', d: 'Création de contenus Instagram mettant en valeur les créations et services d’impression 3D de F3DF.' },
                { t: 'Community Management', d: 'Animation du compte Instagram, gestion de la ligne éditoriale et engagement de la communauté.' },
                { t: 'Format carré', d: 'Posts au format carré historique d’Instagram — l’ère avant le format portrait 9:16.' }],
        imgs: [{ src: A('f3dfrs3.png'), cap: '' }], imgCols: 1 },
      { t: 'grid', label: 'Feed Instagram — @f3dfr (1/2)', cols: 6, rows: 3, items: seq('f3dfrs', 1, 18) },
      { t: 'grid', label: 'Feed Instagram — @f3dfr (2/2)', cols: 6, rows: 3, items: seq('f3dfrs', 19, 35) }
    ] },

    'labrha-reseaux': { pages: [
      { t: 'text', label: 'Responsable marketing & communication — 2024 — aujourd’hui', wideImgs: true, title: 'Réseaux sociaux — laboratoire Labrha',
        cards: [{ t: 'Création de contenus', d: 'Conception et réalisation de l’ensemble des visuels Instagram — posts éducatifs, présentations produits, communications institutionnelles.' },
                { t: 'Stratégie & planning', d: 'Définition du plan éditorial, calendrier de publication et analyse des performances pour optimiser la visibilité du laboratoire.' },
                { t: 'Univers de marque', d: 'Mise en cohérence de la direction artistique RS avec l’identité visuelle globale du laboratoire Labrha.' }],
        imgs: [{ src: A('labrhars1.png'), cap: '' }], imgCols: 1 },
      { t: 'grid', label: 'Feed Instagram — @labrha_laboratoire (1/2)', cols: 6, rows: 3, items: seq('labrhars', 1, 18) },
      { t: 'grid', label: 'Feed Instagram — @labrha_laboratoire (2/2)', cols: 6, rows: 3, items: seq('labrhars', 19, 34) }
    ] },

    'labrha-site': { pages: [
      { t: 'text', label: '01 — Homepage', wideImgs: true, title: 'Refonte du site',
        paras: ['Refonte complète du site web de Labrha, spécialiste des compléments alimentaires dédiés à la rhumatologie. L’objectif : moderniser l’image de la marque tout en améliorant l’expérience utilisateur et la lisibilité des contenus.',
                'Le travail s’est concentré sur une interface plus claire, une hiérarchisation plus efficace des informations et une navigation simplifiée afin de faciliter l’accès aux différents services proposés.',
                'Cette refonte a également permis de renforcer l’identité visuelle de Labrha à travers un design plus contemporain, cohérent avec son positionnement et ses ambitions digitales.'],
        imgs: [{ src: R('labrha-site-01.jpg'), cap: 'Page d’accueil' }, { src: R('labrha-site-02.jpg'), cap: 'Blog' }], imgCols: 1 },
      { t: 'text', label: '02 — Fiche produit', wideImgs: true, title: 'Pages produits',
        paras: ['Les pages produits ont été conçues pour offrir une lecture claire et structurée de l’information. Chaque section met en avant les bénéfices du produit, ses caractéristiques principales ainsi que les éléments de réassurance nécessaires pour accompagner la décision d’achat.',
                'L’objectif : simplifier la compréhension des produits tout en valorisant leur efficacité, grâce à une hiérarchisation précise des contenus et une mise en page pensée pour guider naturellement l’utilisateur dans sa navigation.'],
        imgs: [{ src: R('labrha-site-03.jpg') }, { src: R('labrha-site-04.jpg') }, { src: R('labrha-site-05.jpg') }], imgCols: 2, mosaic: true },
      { t: 'text', label: '03 — Diagnostic', wideImgs: true, title: 'Outil de diagnostic',
        paras: ['Conception et développement d’un outil complet de diagnostic en ligne, conçu pour accompagner les visiteurs dans leur parcours en analysant leurs besoins afin de les orienter vers le produit le plus adapté.',
                'Pensé comme un véritable guide interactif, cet outil simplifie la prise de décision et permet d’offrir une expérience plus personnalisée, tout en valorisant l’expertise de la marque.'],
        imgs: [{ src: R('labrha-site-06.jpg') }, { src: R('labrha-site-07.jpg') }, { src: R('labrha-site-08.jpg') }], imgCols: 2, mosaic: true }
    ] },

    'vasculyon-site': { pages: [
      { t: 'text', label: 'Brief', wideImgs: true, title: 'Site web du cabinet',
        paras: ['Conception et développement du site web de Vasculyon, centre spécialisé en chirurgie vasculaire et endovasculaire, regroupant trois praticiens à Lyon, Vienne et Vénissieux.',
                'L’objectif : créer une plateforme claire et accessible permettant de présenter l’expertise du centre, ses différentes prises en charge et de faciliter la prise de rendez-vous pour les patients.'],
        label2: 'Réalisation',
        paras2: ['Le travail s’est concentré sur une structure simple et lisible, conçue pour répondre aux besoins d’un public médical et non-médical : patients en recherche d’informations, médecins adresseurs et nouveaux consultants.',
                 'L’identité digitale sobre et professionnelle — palette navy, typographie structurée, iconographie médicale — renforce la dimension de confiance indispensable dans le secteur de la santé, tout en maintenant une navigation intuitive et accessible.'],
        imgs: [{ src: R('vasculyon-site-01.jpg'), cap: 'Page d’accueil' }, { src: R('vasculyon-site-02.jpg'), cap: 'Expertise' }], imgCols: 1 }
    ] },

    'salons-labrha': { pages: [
      { t: 'intro', pull: 'Salons et congrès — stands et PLV.',
        kv: [['Client', 'Laboratoire Labrha'], ['Format', 'Conception et réalisation de la PLV et des supports du laboratoire pour ses salons et congrès : habillage de stand, visuels, écrans lumineux, brochures et présentoirs.'],
             ['Mon rôle', 'Création et réalisation de la PLV et des supports (habillage et visuels de stand, brochures, goodies), puis coordination du stand et accueil des professionnels de santé.']],
        hero: { src: '/portfolio-pdf/img/salons-labrha.jpg', cap: 'Stand du laboratoire' } }
    ] },

    'graille': { pages: [
      { t: 'intro', title: 'Graille — communication & direction artistique', pull: 'Faire de la pause déj un truc cool.',
        kv: [['Client', 'Graille — Start-up food, Lyon'], ['Concept', 'Distributeurs de plats faits maison, cuisinés frais chaque matin'], ['Cibles', 'Étudiants — grandes écoles lyonnaises (UCLY, INSEEC…)'],
             ['Livrables', 'RS · UI/UX · Vidéo · Merch · Print · Affiches'],
             ['Objectif', 'Faire connaître les distributeurs au sein des écoles, créer une communauté autour de la marque, préparer et accompagner les inaugurations dans les nouvelles écoles, construire une identité visuelle forte et désirable.'],
             ['Scope', 'Alternance en master 2 — stratégie de contenu, campagnes d’inauguration, refonte de l’interface distributeur, collection de merch étudiante, vidéos publicitaires produit.']],
        hero: { src: A('grs6.png'), cap: '' } },
      { t: 'grid', label: 'Réseaux sociaux — feed et stories Instagram', cols: 6, rows: 2,
        intro: 'Contenus quotidiens pour une communauté d’étudiants — annonces produit, humeur du jour, temps forts et culture Graille. 15 stories conçues pour être vues en plein écran — formats verticaux, animations, teasing de nouveaux produits et événements d’inauguration.',
        items: ['grs1', 'grs2', 'grs3', 'grs5', 'grs8', 'grs9', 'grs15', 'grs16', 'grs17', 'grs19', 'grs25', 'grs26'].map(function (n) { return { src: A(n + '.png') }; }) },
      { t: 'grid', label: 'Interface distributeur — refonte UX / UI', cols: 3, rows: 1,
        intro: 'Reprise complète de l’écran de commande des distributeurs — hiérarchie visuelle, lisibilité en condition réelle (debout, en mouvement), et expérience d’achat fluide pour l’étudiant pressé.',
        items: [{ src: A('intergraille1.png'), cap: 'Accueil' }, { src: A('intergraille2.png'), cap: 'Sélection produit' }, { src: A('intergraille3.png'), cap: 'Paiement & confirmation' }] },
      { t: 'grid', label: 'Collections & merch — de la tête aux pieds', cols: 6, rows: 2,
        intro: 'T-shirts, sweats et accessoires qui transforment les étudiants en ambassadeurs de la marque : Graille la vie · Graille ressort · Clémentine Graille · Style université · Tampon fait avec amour · Gang de tomate · Don’t mess with food · Contraste · Course poursuite · Eh pelo (argot lyonnais).',
        items: ['glv1.png', 'grailleressort1.png', 'clem1.png', 'grailleuni.png', 'avecamour1.png', 'gang1.png', 'dontmess1.png', 'contrastegraille.png', 'coursepoursuite.png', 'pelo2.png', 'grs20.png', 'grs24.png'].map(function (n) { return { src: A(n) }; }) },
      { t: 'grid', label: 'Goodies & accessoires', cols: 6, rows: 1,
        intro: 'Gourde, chaussette piment, Graille Squad, planche d’autocollants pour les ordis étudiants.',
        items: [{ src: A('gourdegraille.jpg'), cap: 'Gourde' }, { src: A('piment.png'), cap: 'Chaussette piment' }, { src: A('graillesquad1.png'), cap: 'Graille Squad' },
                { src: A('collantgraille1.png'), cap: 'Autocollants' }, { src: A('collantgraille2.png') }, { src: A('collantgraille3.png') }] },
      { t: 'grid', label: 'Affiches, menu & fidélité', cols: 6, rows: 1,
        intro: 'Arrivée dans une nouvelle école — affiches ; planches menu et carte de fidélité.',
        items: [{ src: A('newecole1.png') }, { src: A('newecole2.png') }, { src: A('newecole3.png') }, { src: A('menu1.png'), cap: 'Menu' }, { src: A('menu2.png'), cap: 'Menu' }, { src: A('fidelite.jpg'), cap: 'Carte de fidélité' }] }
    ] },

    'lettre-hebdo': { pages: [
      { t: 'intro', pull: 'Un rendez-vous régulier avec les équipes.',
        kv: [['Client', 'Laboratoire Labrha — communication interne'], ['Format', 'Lettres d’information hebdomadaires à destination des équipes, sous forme de présentation animée consultable en ligne'],
             ['Mon rôle', 'Rédaction, mise en page et diffusion de la lettre chaque semaine.'], ['Résultat', 'Un rendez-vous régulier qui tient les équipes informées de la vie du laboratoire.']],
        hero: { src: '/ch-dreux/posters/lettre-labrha-1.jpg', cap: 'Lettre d’information — exemple 1' } },
      { t: 'grid', label: 'Deux exemples de lettres', cols: 2, rows: 1,
        items: [{ src: '/ch-dreux/posters/lettre-labrha-1.jpg', cap: 'Exemple 1' }, { src: '/ch-dreux/posters/lettre-labrha-2.jpg', cap: 'Exemple 2' }] }
    ] },

    'formation-cyber': { pages: [
      { t: 'intro', pull: 'Un parcours complet, du contexte à l’évaluation.',
        kv: [['Client', 'Laboratoire Labrha — communication interne'],
             ['Format', 'Formation obligatoire « Vigilance sur le web et cybersécurité » (2025) à destination des équipes : origines des cybermenaces, menaces principales, reconnaissance des courriels frauduleux, mots de passe et bons réflexes du quotidien.'],
             ['Mon rôle', 'Conception et réalisation de A à Z : contexte, exemples concrets, exercices de détection de faux courriels et quiz d’évaluation final.'],
             ['Résultat', 'Un parcours complet de 47 pages, du contexte jusqu’à l’évaluation, pour sensibiliser l’ensemble des équipes.']],
        hero: { src: '/ch-dreux/posters/formation-cyber.jpg', cap: 'Première page de la formation' } }
    ] },

    'formation-photo': { pages: [
      { t: 'intro', pull: 'Des équipes autonomes pour produire du contenu.',
        kv: [['Client', 'Brasserie 1755 · Bourgoin — communication interne'],
             ['Format', 'Former les équipes à photographier elles-mêmes leurs créations, leurs plats et leurs lieux, pour alimenter chaque semaine les réseaux sociaux de la brasserie.'],
             ['Mon rôle', 'Conception du plan de communication et du guide de prise de vue (lumière, angles, plans, profondeur), puis animation de la formation auprès des équipes.'],
             ['Résultat', 'Des équipes autonomes pour produire le contenu hebdomadaire des réseaux sociaux de la brasserie.']],
        hero: { src: '/ch-dreux/posters/formation-photo-1755.jpg', cap: 'Plan de communication' } }
    ] }
  };
})();
