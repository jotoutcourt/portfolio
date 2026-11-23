/*
 * Données de la page /ch-dreux  —  c'est LE fichier à éditer.
 *
 * - Tout texte entre crochets, ex. [MON RÔLE], est un placeholder : il est surligné en jaune
 *   en local (ou avec ?brouillon dans l'URL) pour être repéré facilement, puis affiché tel quel en ligne.
 * - Ajouter / retirer / réordonner un projet = ajouter, supprimer ou déplacer un bloc { ... } dans PROJECTS.
 *   L'ordre d'affichage dans une section suit l'ordre du tableau.
 * - section : 'print' | 'video' | 'web' | 'social' | 'events' | 'internal'
 * - media.type :
 *     'image'        { src, alt, fit: 'cover' | 'contain' }
 *     'youtube'      { youtubeId, list (optionnel), poster, alt (de la vignette) }
 *     'vimeo'        { vimeoId, poster }
 *     'video'        { src, poster }             (fichier hébergé, mp4)
 *     'placeholder'  { label }                   (aucun visuel pour l'instant)
 * - page (optionnel) : chemin de la page dédiée au projet (copie sans menus dans /ch-dreux/...). Sans `page`, la carte n'est pas cliquable.
 * - Chaque image DOIT avoir un alt (texte alternatif) : décris ce que l'on voit.
 * - Les images/vidéos pointent vers les fichiers existants de /assets/ (aucune copie).
 */
window.CH_DREUX = {

  intro:
    "Ce dossier présente des réalisations choisies pour leur proximité avec les missions du poste " +
    "que vous proposez.",

  // Optionnel : si introLink.label apparaît tel quel dans le texte ci-dessus, il devient un lien cliquable vers href.
  // introLink: { label: '...', href: '...' },

  // Fiche d'identité affichée à droite du titre (infos du CV). Lignes : { label, value } ; value peut être un lien via href.
  profile: {
    photo: '/ch-dreux/jordan.jpg',
    alt: 'Portrait de Jordan Join, en chemise blanche.',
    name: 'Jordan Join',
    role: 'Création publicitaire · Direction artistique · Marketing · Communication',
    lines: [
      { label: 'Âge',        value: '30 ans' },
      { label: 'Ville',      value: 'Lyon · Permis B' },
      { label: 'Poste actuel', value: 'Responsable marketing et communication, laboratoire Labrha (depuis mars 2024)' },
      { label: 'Formation',  value: 'Master 2 Direction artistique — Sup de Pub, INSEEC Lyon (2023)' },
      { label: 'Téléphone',  value: '06 19 84 27 99', href: 'tel:+33619842799' },
      { label: 'Email',      value: 'jordan.join@icloud.com', href: 'mailto:jordan.join@icloud.com' }
    ]
  },

  sections: [
    // all (optionnel) : ligne « Retrouvez tous mes projets… » sous la section, vers l'ancre de jordan-join.fr/projets
    { id: 'print',    title: 'Print et identité visuelle', lead: "Identité visuelle, packagings, livrets et supports d'information.", all: { anchor: 'cat-print', label: 'print' } },
    { id: 'video',    title: 'Vidéo',                      lead: "Production de vidéos pour informer et valoriser.", all: { anchor: 'cat-video', label: 'vidéo' } },
    { id: 'web',      title: 'Sites web',                  lead: "Conception et refonte de sites internet.", all: { anchor: 'cat-web', label: 'sites web' } },
    { id: 'social',   title: 'Réseaux sociaux',            lead: "Stratégie éditoriale et création de contenus.", all: { anchor: 'cat-social', label: 'réseaux sociaux' } },
    { id: 'events',   title: 'Événementiel',               lead: "Organisation d'événements et de présences institutionnelles.", all: { anchor: 'cat-event', label: 'événementiel' } },
    { id: 'internal', title: 'Communication interne',      lead: "Formations et lettres à destination des équipes." }
  ],

  projects: [

    /* ───────────── PRINT ET IDENTITÉ VISUELLE ───────────── */
    {
      id: 'tenofort',
      section: 'print',
      title: 'Tenofort — complément alimentaire',
      page: '/ch-dreux/tenofort/',
      tag: 'Laboratoire Labrha',
      context: "Campagne d'affiches pour promouvoir Tenofort, un complément alimentaire destiné aux sportifs.",
      role: "Réalisation des affiches pour promouvoir le produit : concept « La force derrière chaque geste » et déclinaisons print et digitales.",
      result: "Une série d'affiches qui met le produit en valeur, déclinée en print et en digital.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/tenofort.mp4', poster: '/ch-dreux/tuiles/tenofort.jpg',
        alt: "Animation Tenofort : une affiche de la campagne, un coureur de trail dans la brume."
      }
    },
    {
      id: 'livrets',
      section: 'print',
      title: 'Livrets de la gamme compléments alimentaires',
      page: '/ch-dreux/gamme-complements/',
      tag: 'Laboratoire Labrha',
      context: "Compléments alimentaires articulaires (Tenofort, Cuivramine) : des supports destinés à la fois aux professionnels de santé et aux patients.",
      role: "Refonte de la charte graphique et des documents de la gamme (livrets, affiches), avec une contrainte : conserver des étiquettes produit assez anciennes. Mise à jour et digitalisation des supports commerciaux destinés aux professionnels de santé.",
      result: "Une gamme homogène, dont les livrets sont utilisés auprès des professionnels de santé comme des patients.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/livrets.mp4', poster: '/ch-dreux/tuiles/livrets.jpg',
        alt: "Animation des livrets : le livret Tenofort, vert, présenté en perspective."
      }
    },
    {
      id: 'pandora',
      section: 'print',
      title: 'Pandora — gamme de dispositifs médicaux',
      page: '/ch-dreux/pandora/',
      tag: 'Laboratoire Labrha',
      context: "Gamme de dispositifs médicaux de viscosupplémentation (traitement de l'arthrose), soumise à la réglementation européenne sur les dispositifs médicaux (MDR 2017/745).",
      role: "Création de la charte graphique et de l'univers de marque (packagings, notices, cartes d'implants), puis préparation du lancement : communication auprès des prescripteurs, outils pour les commerciaux, landing pages.",
      result: "Un univers de marque cohérent, décliné sur l'ensemble des supports de la gamme, de l'emballage aux outils commerciaux.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/pandora.mp4', poster: '/ch-dreux/tuiles/pandora.jpg',
        alt: "Animation Pandora : la boîte violette du viscosupplément et une goutte de gel."
      }
    },
    {
      id: 'vasculyon-id',
      section: 'print',
      title: 'Vasculyon — identité visuelle',
      page: '/ch-dreux/vasculyon-id/',
      tag: 'Cabinet de chirurgie vasculaire · mission freelance',
      context: "Cabinet de chirurgie vasculaire et endovasculaire (Lyon, Vienne, Vénissieux) : logo, charte et supports médicaux institutionnels.",
      role: "Conception de l'identité visuelle complète : logo à double lecture (réseau vasculaire et fleuves lyonnais), charte graphique et supports.",
      result: "Une identité qui inspire confiance aux patients comme aux médecins, reprise sur le site et les supports du cabinet.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/vasculyon-identite.mp4', poster: '/ch-dreux/tuiles/vasculyon-identite.jpg',
        alt: "Animation Vasculyon : des praticiens en tenue de bloc opératoire."
      }
    },
    {
      id: 'vogalib',
      section: 'print',
      title: 'Vogalib — supports de communication',
      page: '/ch-dreux/vogalib/',
      tag: "Projet d'école",
      context: "Projet d'école : imaginer une campagne print estivale pour un produit peu glamour, le Vogalib.",
      role: "Conception de la campagne estivale « Good Vagues Only » : concept, direction artistique, affiche et déclinaisons.",
      result: "Une campagne qui donne un ton léger et estival à un produit qui ne s'y prête pas.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/vogalib.mp4', poster: '/ch-dreux/tuiles/vogalib.jpg',
        alt: "Animation Vogalib : un estomac stylisé sur lequel surfe un petit personnage."
      }
    },
    {
      id: 'metz-affiches',
      section: 'print',
      title: "Play With Metz — campagne « Lumières d'Europe »",
      page: '/ch-dreux/metz/',
      tag: 'Eurométropole de Metz',
      context: "Série d'affiches pour la promotion touristique de Metz autour des festivals de lumière.",
      role: "Direction artistique de la campagne estivale : identité visuelle, affiches et dispositifs d'affichage urbain.",
      result: "Campagne estivale de 2022.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/play-with-metz.mp4', poster: '/ch-dreux/tuiles/play-with-metz.jpg',
        alt: "Animation Play With Metz : la façade de la cathédrale de Metz illuminée de nuit."
      }
    },

    /* ───────────── VIDÉO ───────────── */
    {
      id: 'f3df-3d',
      section: 'video',
      title: "« La 3D c'est pas sorcier » — série vidéo",
      page: '/ch-dreux/f3df/',
      tag: "Entreprise d'impression 3D",
      context: "Série de 5 vidéos pédagogiques reprenant les codes de l'émission « C'est pas sorcier », appliqués à l'impression 3D.",
      role: "Écriture, tournage et montage des épisodes, sur le modèle de l'émission « C'est pas sorcier ».",
      result: "5 épisodes publiés sur la chaîne YouTube de l'entreprise.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/f3df-3d.mp4', poster: '/ch-dreux/tuiles/f3df-3d.jpg',
        alt: "Animation : un ingénieur en fabrication additive en blouse blanche s'exprime face caméra dans un atelier d'impression 3D."
      },
      link: { label: 'Voir la série complète sur YouTube', href: 'https://www.youtube.com/playlist?list=PL2CHMYGVYwZPm5mbNN0n8H8RynHfGQmTO' }
    },
    {
      id: 'metz-film',
      section: 'video',
      title: 'Play With Metz — film de campagne',
      page: '/ch-dreux/metz/#s-video',
      tag: 'Eurométropole de Metz',
      context: "Film de la campagne de promotion touristique de Metz.",
      role: "Écriture des textes, choix des lieux de tournage, brief du motion design et coordination.",
      result: "Un film diffusé en ligne en complément de l'affichage urbain.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/play-with-metz-film.mp4', poster: '/ch-dreux/tuiles/play-with-metz-film.jpg',
        alt: "Animation : extrait du film de campagne Play With Metz, vue aérienne de danseurs sur un pavage et lettres blanches au sol."
      }
    },

    /* ───────────── SITES WEB ───────────── */
    {
      id: 'labrha-site',
      section: 'web',
      title: 'Refonte du site internet de Labrha',
      page: '/ch-dreux/labrha-site/',
      tag: 'Laboratoire Labrha',
      context: "Site vitrine et boutique en ligne d'un laboratoire spécialisé en rhumatologie : modernisation de l'image, hiérarchisation des informations et navigation simplifiée.",
      role: "Pilotage et réalisation de la refonte complète du site (WordPress), ainsi que gestion de la boutique en ligne.",
      result: "Un site modernisé à la navigation simplifiée, et une boutique en ligne gérée au quotidien.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/labrha-site.mp4', poster: '/ch-dreux/tuiles/labrha-site.jpg',
        alt: "Animation : micro-algues vues au microscope, visuel du site internet du laboratoire Labrha."
      },
      link: { label: 'Visiter le site', href: 'https://www.laboratoire-labrha.fr/' }
    },
    {
      id: 'vasculyon-site',
      section: 'web',
      title: 'Vasculyon — site web',
      page: '/ch-dreux/vasculyon/',
      tag: 'Cabinet de chirurgie vasculaire · mission freelance',
      context: "Site d'un cabinet de chirurgie vasculaire et endovasculaire (Lyon, Vienne, Vénissieux), destiné aux patients, aux médecins adresseurs et aux futurs praticiens.",
      role: "Conception UX/UI et développement du site : structure, design et intégration, avec une prise de rendez-vous facilitée.",
      result: "Site en ligne (vasculyon.fr) présentant les trois praticiens et les trois lieux de consultation.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/vasculyon-site.mp4', poster: '/ch-dreux/tuiles/vasculyon-site.jpg',
        alt: "Animation : page d'accueil du site Vasculyon, équipe chirurgicale au bloc et titre « Chirurgie vasculaire et endovasculaire »."
      },
      link: { label: 'Visiter le site', href: 'https://vasculyon.fr' }
    },

    /* ───────────── RÉSEAUX SOCIAUX ───────────── */
    {
      id: 'labrha-reseaux',
      section: 'social',
      title: 'Réseaux sociaux du laboratoire Labrha',
      page: '/ch-dreux/labrha-reseaux/',
      tag: 'Laboratoire Labrha',
      context: "Compte Instagram du laboratoire : posts éducatifs, présentations de produits et communication institutionnelle.",
      role: "Conception et réalisation des visuels, définition du plan éditorial et du calendrier de publication, suivi des performances.",
      result: "Une ligne éditoriale cohérente avec l'identité du laboratoire, ajustée grâce à l'analyse des performances.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/labrha-reseaux.mp4', poster: '/ch-dreux/tuiles/labrha-reseaux.jpg',
        alt: "Animation : publication vidéo pour les réseaux sociaux du laboratoire Labrha, autour d'un complément pour les articulations."
      }
    },
    {
      id: 'f3df-reseaux',
      section: 'social',
      title: 'F3DF — réseaux sociaux',
      page: '/ch-dreux/f3df/',
      tag: "Entreprise d'impression 3D",
      context: "Stratégie et création de contenus pour les réseaux sociaux d'une entreprise d'impression 3D.",
      role: "Community management : animation du compte Instagram, définition de la ligne éditoriale et création des visuels produits.",
      result: "Un compte Instagram (@f3dfr) animé avec une identité visuelle homogène.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/f3df-reseaux.mp4', poster: '/ch-dreux/tuiles/f3df-reseaux.jpg',
        alt: "Animation : publication « Introduction à la fabrication additive, 7 jours gratuits » avec une pièce orange imprimée en 3D."
      }
    },

    /* ───────────── ÉVÉNEMENTIEL ───────────── */
    {
      id: 'salons-labrha',
      section: 'events',
      title: 'Salons Labrha — stands et PLV',
      page: '/ch-dreux/salons-labrha/',
      tag: 'Laboratoire Labrha',
      context: "Conception et réalisation de la PLV et des supports du laboratoire pour ses salons et congrès : habillage de stand, visuels, écrans lumineux, brochures et présentoirs.",
      role: "Création et réalisation de la PLV et des supports (habillage et visuels de stand, brochures, goodies), puis coordination du stand et accueil des professionnels de santé.",
      result: "Une présence du laboratoire renforcée auprès des professionnels de santé.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/salons-labrha.mp4', poster: '/ch-dreux/tuiles/salons-labrha.jpg',
        alt: "Animation : le stand du laboratoire Labrha dans un hall de salon, des visiteurs passent devant."
      }
    },
    {
      id: 'graille',
      section: 'events',
      title: "Graille — spot d'inauguration",
      page: '/ch-dreux/graille/#s-videos',
      tag: 'Start-up food, Lyon',
      context: "Spot vidéo pour l'inauguration d'un distributeur de plats frais dans un établissement d'enseignement supérieur lyonnais (UCLY).",
      role: "Réalisation du spot vidéo : tournage, montage et couverture de l'inauguration.",
      result: "Un spot diffusé à l'occasion de l'inauguration du distributeur.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/graille.mp4', poster: '/ch-dreux/tuiles/graille.jpg',
        alt: "Animation : illustration d'une mascotte de plat au volant d'une voiture orange, pour le spot Graille."
      }
    },

    /* ───────────── COMMUNICATION INTERNE ───────────── */
    {
      id: 'lettre-hebdo',
      section: 'internal',
      title: 'Lettre hebdomadaire',
      page: '/ch-dreux/lettre-hebdo/',
      tag: 'Laboratoire Labrha',
      context: "Lettres d'information hebdomadaires à destination des équipes, sous forme de présentation animée consultable en ligne. Les informations privées ont été effacées.",
      role: "Rédaction, mise en page et diffusion de la lettre chaque semaine.",
      result: "Un rendez-vous régulier qui tient les équipes informées de la vie du laboratoire.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/lettre-hebdo.mp4', poster: '/ch-dreux/tuiles/lettre-hebdo.jpg',
        alt: "Animation : un avion en papier vert traverse l'écran, visuel de la lettre d'information hebdomadaire."
      }
    },
    {
      id: 'formation-cyber',
      section: 'internal',
      title: 'Formation à la vigilance web et à la cybersécurité',
      page: '/ch-dreux/formation-cybersecurite/',
      tag: "Laboratoire Labrha",
      context: "Formation obligatoire destinée aux équipes : origines des cybermenaces, reconnaissance des courriels frauduleux, mots de passe et bons réflexes du quotidien.",
      role: "Conception et réalisation de A à Z : contexte, exemples concrets, exercices de détection de faux courriels et quiz d'évaluation final.",
      result: "Un parcours complet de 47 pages, du contexte jusqu'à l'évaluation, pour sensibiliser l'ensemble des équipes.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/formation-cybersecurite.mp4', poster: '/ch-dreux/tuiles/formation-cybersecurite.jpg',
        alt: "Animation : un cambrioleur masqué emporte un sac marqué d'un arobase devant la pyramide du Louvre, visuel de la formation cybersécurité."
      }
    },
    {
      id: 'formation-photo',
      section: 'internal',
      title: 'Formation à la photographie',
      page: '/ch-dreux/formation-photo/',
      tag: 'Brasserie 1755 · Bourgoin',
      context: "Former les équipes à photographier elles-mêmes leurs créations, leurs plats et leurs lieux, pour alimenter chaque semaine les réseaux sociaux de la brasserie.",
      role: "Conception du plan de communication et du guide de prise de vue (lumière, angles, plans, profondeur), puis animation de la formation auprès des équipes.",
      result: "Des équipes autonomes pour produire le contenu hebdomadaire des réseaux sociaux de la brasserie.",
      media: {
        type: 'loop', src: '/ch-dreux/tuiles/formation-photo.mp4', poster: '/ch-dreux/tuiles/formation-photo.jpg',
        alt: "Animation : une personne photographie un plat avec son téléphone dans une cuisine de restaurant."
      }
    }
  ],

  press: {
    title: 'Relations presse',
    text: "Concernant les relations presse, mon parcours m’a surtout conduit vers la création de contenus, le marketing digital (campagnes publicitaires, réseaux sociaux, SEO) et la communication de marque. Je n’ai donc pas encore de retombées presse à vous présenter. J’ai en revanche une solide pratique de la production de contenus éditoriaux : rédaction d’articles de blog, notamment pour le laboratoire Labrha, ainsi que conception, tournage et montage de vidéos pédagogiques et d’interviews autour d’un dispositif médical, que vous retrouverez dans mon portfolio. Ces compétences (vulgariser un sujet de santé, préparer un interlocuteur, produire des contenus prêts à diffuser et savoir les faire rayonner auprès des bons publics) sont directement mobilisables dans une démarche de relations presse.",
    items: [
      // Articles rédigés pour F3DF (2021)
      { title: "Nouveau flux de travail dans Revit avec l'iPhone 12 Pro et la technologie Lidar", note: 'F3DF, 2021', href: 'https://www.f3df.com/nouveau-flux-de-travail-dans-revit-grace-a-liphone-12-pro-et-la-technologie-lidar/' },
      { title: "L'impression 3D révolutionne l'accès au monde de la santé : le premier stéthoscope connecté présenté par WeMed", note: 'F3DF, 2021', href: 'https://www.f3df.com/impression-3d-revolutionne-acces-monde-sante/' },
      { title: 'Orthèses et prothèses 3D : au service des patients', note: 'F3DF, 2021', href: 'https://www.f3df.com/impression-3d-service-bien-etre-patients/' },
      { title: 'Femmes & impression 3D : témoignage de Mathilde Berchon', note: 'F3DF, 2021', href: 'https://www.f3df.com/femmes-et-impression-3d-temoignage-de-mathilde-berchon/' },
      { title: 'Comment la 3D vient-elle au service du marketing ?', note: 'F3DF, 2021', href: 'https://www.f3df.com/3d-service-marketing-trottinette/' },
      // Articles de blog rédigés pour le laboratoire Labrha
      { title: 'Lady Gaga : quand la pop vient mettre en lumière la fibromyalgie', note: 'Laboratoire Labrha', href: 'https://www.laboratoire-labrha.fr/blog/lady-gaga-vient-mettre-en-lumiere-la-fibromyalgie/' },
      { title: 'Femmes et rhumatologie : spécificités et inégalités', note: 'Laboratoire Labrha', href: 'https://www.laboratoire-labrha.fr/blog/rhumatologie-specificites-hormonales-et-inegalites-de-diagnostic/' },
      { title: 'La capsaïcine : son histoire et ses bienfaits', note: 'Laboratoire Labrha', href: 'https://www.laboratoire-labrha.fr/blog/la-capsaicine-son-histoire/' }
    ]

  },

  contact: {
    name: 'Jordan Join',
    email: 'jordan.join@icloud.com',
    phone: '06 19 84 27 99'
  },

  downloads: {
    cv: '/assets/cv-jordan-join.pdf',
    // Page du CV interactif sur le site : cible du bouton « Voir mon CV » (le PDF reste pour « Télécharger »).
    cvPage: '/parcours.html',
    // Lettre de motivation : dépose le PDF dans /assets/ puis renseigne son chemin (ex : '/assets/lettre-motivation-jordan-join.pdf').
    // Tant que ce champ est vide, les boutons « Voir / Télécharger ma lettre de motivation » s'affichent désactivés.
    letter: '/assets/lettre-motivation-jordan-join.pdf',
    // Page animée de la lettre : cible du bouton « Voir ma lettre de motivation » (le PDF reste pour « Télécharger »).
    letterPage: '/ch-dreux/lettre-de-motivation/',
    // Dépose le PDF du portfolio dans /assets/ puis renseigne son chemin ici (ex : '/assets/portfolio-jordan-join.pdf').
    // Tant que ce champ est vide, le bouton s'affiche désactivé.
    portfolio: ''
  }
};
