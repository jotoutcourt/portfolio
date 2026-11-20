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
      { label: 'Âge',        value: '29 ans' },
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
    { id: 'events',   title: 'Événementiel',               lead: "Organisation d'événements et de présences institutionnelles." },
    { id: 'internal', title: 'Communication interne',      lead: "Formations et lettres à destination des équipes." }
  ],

  projects: [

    /* ───────────── PRINT ET IDENTITÉ VISUELLE ───────────── */
    {
      section: 'print',
      title: 'Tenofort — complément alimentaire',
      page: '/ch-dreux/tenofort/',
      tag: 'Laboratoire Labrha',
      context: "Direction artistique complète d'un complément alimentaire destiné aux sportifs : identité, packaging et supports print.",
      role: "Direction artistique de la campagne : concept « La force derrière chaque geste », affiches et déclinaisons print et digitales.",
      result: "Concept validé par le laboratoire en 2024.",
      media: {
        type: 'image', src: '/assets/tenofort.png', fit: 'cover',
        alt: "Visuel du projet Tenofort, complément alimentaire pour les sportifs, présentant le packaging du produit."
      }
    },
    {
      section: 'print',
      title: 'Livrets de la gamme compléments alimentaires',
      page: '/ch-dreux/gamme-complements/',
      tag: 'Laboratoire Labrha',
      context: "Compléments alimentaires articulaires (Tenofort, Cuivramine) : des supports destinés à la fois aux professionnels de santé et aux patients.",
      role: "Refonte de la charte graphique de la gamme et conception des supports (livrets, affiches) ; mise à jour et digitalisation des supports commerciaux de terrain destinés aux professionnels de santé.",
      result: "Une gamme homogène, dont les livrets sont utilisés auprès des professionnels de santé comme des patients.",
      media: {
        type: 'image', src: '/assets/cuivramock.png', fit: 'contain',
        alt: "Livret Cuivramine, couverture et double page intérieure : titre « Un concentré d'efficacité », visuel du produit et encarts pédagogiques sur fond bleu."
      }
    },
    {
      section: 'print',
      title: 'Pandora — gamme de dispositifs médicaux',
      page: '/ch-dreux/pandora/',
      tag: 'Laboratoire Labrha',
      context: "Gamme de dispositifs médicaux de viscosupplémentation (traitement de l'arthrose), soumise à la réglementation européenne sur les dispositifs médicaux (MDR 2017/745).",
      role: "Création de la charte graphique et de l'univers de marque (packagings, notices, cartes d'implants), puis préparation du lancement : communication auprès des prescripteurs, outils pour les commerciaux, landing pages.",
      result: "Un univers de marque cohérent, décliné sur l'ensemble des supports de la gamme, de l'emballage aux outils commerciaux.",
      media: {
        type: 'image', src: '/assets/pandoviolet.png', fit: 'contain',
        alt: "Boîte de la gamme Pandora 1, violette, portant la mention « Viscosupplément linéaire », « 1 x 4,8 mL » et « Made in France », avec le logo du laboratoire Labrha."
      }
    },
    {
      section: 'print',
      title: 'Vasculyon — identité visuelle',
      page: '/ch-dreux/vasculyon-id/',
      tag: 'Cabinet de chirurgie vasculaire · mission freelance',
      context: "Cabinet de chirurgie vasculaire et endovasculaire (Lyon, Vienne, Vénissieux) : logo, charte et supports médicaux institutionnels.",
      role: "Conception de l'identité visuelle complète : logo à double lecture (réseau vasculaire et fleuves lyonnais), charte graphique et supports.",
      result: "Une identité qui inspire confiance aux patients comme aux médecins, reprise sur le site et les supports du cabinet.",
      media: {
        type: 'image', src: '/assets/vasculyonbloc.png', fit: 'cover',
        alt: "Identité visuelle du cabinet Vasculyon : logo et déclinaisons sur supports institutionnels."
      }
    },
    {
      section: 'print',
      title: 'Vogalib — supports de communication',
      page: '/ch-dreux/vogalib/',
      tag: "Sanofi Consumer Healthcare",
      context: "Direction artistique et supports print pour un médicament : brochures, PLV et communication institutionnelle.",
      role: "Conception de la campagne estivale « Good Vagues Only » : concept, direction artistique, affiche et déclinaisons.",
      result: "Concept validé par le client en 2024.",
      media: {
        type: 'image', src: '/assets/vogalib.png', fit: 'cover',
        alt: "Visuel du projet Vogalib : supports de communication print pour un médicament."
      }
    },
    {
      section: 'print',
      title: "Play With Metz — campagne « Lumières d'Europe »",
      page: '/ch-dreux/metz/',
      tag: 'Eurométropole de Metz',
      context: "Série d'affiches pour la promotion touristique de Metz autour des festivals de lumière.",
      role: "Direction artistique de la campagne estivale : identité visuelle, affiches et dispositifs d'affichage urbain.",
      result: "Campagne validée pour l'été 2024.",
      media: {
        type: 'image', src: '/assets/metz-lumieres-1.webp', fit: 'contain',
        alt: "Affiche Visit Metz : « À Metz, même la lumière nous joue des tours », projection lumineuse colorée sur la façade de la cathédrale de Metz, de nuit."
      }
    },

    /* ───────────── VIDÉO ───────────── */
    {
      section: 'video',
      title: "« La 3D c'est pas sorcier » — série vidéo",
      page: '/ch-dreux/f3df/',
      tag: "Entreprise d'impression 3D",
      context: "Série de 5 vidéos pédagogiques reprenant les codes de l'émission « C'est pas sorcier », appliqués à l'impression 3D.",
      role: "Écriture, tournage et montage des épisodes, sur le modèle de l'émission « C'est pas sorcier ».",
      result: "5 épisodes publiés sur la chaîne YouTube de l'entreprise.",
      media: {
        type: 'youtube', youtubeId: 'gmpNNYtjunM', list: 'PL2CHMYGVYwZPm5mbNN0n8H8RynHfGQmTO',
        poster: '/assets/f3df.png',
        alt: "Plan rapproché d'une tête d'impression 3D, éclairée en rouge et turquoise."
      },
      link: { label: 'Voir la série complète sur YouTube', href: 'https://www.youtube.com/playlist?list=PL2CHMYGVYwZPm5mbNN0n8H8RynHfGQmTO' }
    },
    {
      section: 'video',
      title: 'Play With Metz — film de campagne',
      page: '/ch-dreux/metz/#s-real',
      tag: 'Eurométropole de Metz',
      context: "Film de la campagne de promotion touristique de Metz.",
      role: "Réalisation et montage du film de la campagne.",
      result: "Un film diffusé en ligne en complément de l'affichage urbain.",
      media: {
        type: 'youtube', youtubeId: 'GDNlsrFAnxE',
        poster: '/assets/metz.png',
        alt: "Visuel de la campagne Play With Metz."
      }
    },

    /* ───────────── SITES WEB ───────────── */
    {
      section: 'web',
      title: 'Refonte du site internet de Labrha',
      page: '/ch-dreux/labrha-site/',
      tag: 'Laboratoire Labrha',
      context: "Site vitrine et boutique en ligne d'un laboratoire spécialisé en rhumatologie : modernisation de l'image, hiérarchisation des informations et navigation simplifiée.",
      role: "Pilotage et réalisation de la refonte complète du site (WordPress), ainsi que gestion de la boutique en ligne.",
      result: "Un site modernisé à la navigation simplifiée, et une boutique en ligne gérée au quotidien.",
      media: {
        type: 'image', src: '/assets/labrhars1.png', fit: 'contain',
        alt: "Visuel promotionnel « Rendez-nous visite » montrant, sur un ordinateur portable, la boutique en ligne du laboratoire Labrha."
      },
      link: { label: 'Visiter le site', href: 'https://www.laboratoire-labrha.fr/' }
    },
    {
      section: 'web',
      title: 'Vasculyon — site web',
      page: '/ch-dreux/vasculyon/',
      tag: 'Cabinet de chirurgie vasculaire · mission freelance',
      context: "Site d'un cabinet de chirurgie vasculaire et endovasculaire (Lyon, Vienne, Vénissieux), destiné aux patients, aux médecins adresseurs et aux futurs praticiens.",
      role: "Conception UX/UI et développement du site : structure, design et intégration, avec une prise de rendez-vous facilitée.",
      result: "Site en ligne (vasculyon.fr) présentant les trois praticiens et les trois lieux de consultation.",
      media: {
        type: 'image', src: '/assets/vasculyonweb.jpg', fit: 'cover',
        alt: "Page d'accueil du site Vasculyon : équipe chirurgicale au bloc opératoire, titre « Chirurgie vasculaire et endovasculaire » et trois praticiens avec un bouton de prise de rendez-vous."
      },
      link: { label: 'Visiter le site', href: 'https://vasculyon.fr' }
    },

    /* ───────────── RÉSEAUX SOCIAUX ───────────── */
    {
      section: 'social',
      title: 'Réseaux sociaux du laboratoire Labrha',
      page: '/ch-dreux/labrha-reseaux/',
      tag: 'Laboratoire Labrha',
      context: "Compte Instagram du laboratoire : posts éducatifs, présentations de produits et communication institutionnelle.",
      role: "Conception et réalisation des visuels, définition du plan éditorial et du calendrier de publication, suivi des performances.",
      result: "Une ligne éditoriale cohérente avec l'identité du laboratoire, ajustée grâce à l'analyse des performances.",
      media: {
        type: 'image', src: '/assets/labrhars3.png', fit: 'contain',
        alt: "Publication Instagram : « Et si votre assiette pouvait soulager vos articulations ? », autour d'une assiette de poulet grillé et de légumes."
      }
    },
    {
      section: 'social',
      title: 'F3DF — réseaux sociaux',
      page: '/ch-dreux/f3df/',
      tag: "Entreprise d'impression 3D",
      context: "Stratégie et création de contenus pour les réseaux sociaux d'une entreprise d'impression 3D.",
      role: "Community management : animation du compte Instagram, définition de la ligne éditoriale et création des visuels produits.",
      result: "Un compte Instagram (@f3dfr) animé avec une identité visuelle homogène.",
      media: {
        type: 'image', src: '/assets/f3dfrs1.png', fit: 'contain',
        alt: "Publication Instagram de l'entreprise F3DF, spécialisée dans l'impression 3D."
      }
    },

    /* ───────────── ÉVÉNEMENTIEL ───────────── */
    {
      section: 'events',
      title: 'Salons Labrha — dont Medica',
      tag: 'Laboratoire Labrha',
      context: "Présence du laboratoire sur des salons et congrès, dont Medica.",
      role: "Préparation et animation de la présence du laboratoire : supports, coordination du stand et accueil des professionnels de santé.",
      result: "Une présence du laboratoire renforcée auprès des professionnels de santé.",
      media: { type: 'placeholder', label: '[PHOTOS DE SALONS LABRHA À AJOUTER]' }
    },
    {
      section: 'events',
      title: "Graille — spot d'inauguration",
      page: '/ch-dreux/graille/#s-videos',
      tag: 'Start-up food, Lyon',
      context: "Spot vidéo pour l'inauguration d'un distributeur de plats frais dans un établissement d'enseignement supérieur lyonnais (UCLY).",
      role: "Réalisation du spot vidéo : tournage, montage et couverture de l'inauguration.",
      result: "Un spot diffusé à l'occasion de l'inauguration du distributeur.",
      media: { type: 'video', src: '/assets/vide%CC%81opubgraille.mp4', poster: '/ch-dreux/posters/graille-inauguration.jpg' }
    },

    /* ───────────── COMMUNICATION INTERNE ───────────── */
    {
      section: 'internal',
      title: 'Lettre hebdomadaire',
      page: '/ch-dreux/lettre-hebdo/',
      tag: 'Laboratoire Labrha',
      context: "Lettres d'information hebdomadaires à destination des équipes, sous forme de présentation animée consultable en ligne.",
      role: "Rédaction, mise en page et diffusion de la lettre chaque semaine.",
      result: "Un rendez-vous régulier qui tient les équipes informées de la vie du laboratoire.",
      media: {
        type: 'image', src: '/ch-dreux/posters/lettre-labrha-1.jpg', fit: 'cover',
        alt: "Couverture de la lettre d'information du laboratoire, semaine 48 : titre « Lettre d'information » sur fond bleu, avec un avion en papier."
      }
    },
    {
      section: 'internal',
      title: 'Formation à la vigilance web',
      tag: "Laboratoire Labrha",
      context: "Formation de sensibilisation des équipes aux risques courants sur internet : courriels frauduleux, mots de passe, usages prudents.",
      role: "Conception et animation de la formation auprès des équipes.",
      result: "Des équipes sensibilisées aux bons réflexes face à l'hameçonnage et aux mots de passe faibles.",
      media: { type: 'placeholder', label: '[SUPPORT DE LA FORMATION À AJOUTER]' }
    },
    {
      section: 'internal',
      title: 'Formation à la photographie',
      tag: 'Brasserie 1755 · Bourgoin',
      context: "Formation et guide de photographie destinés aux équipes de la brasserie 1755, à Bourgoin.",
      role: "Rédaction du guide et animation de la formation : cadrage, lumière et bonnes pratiques pour des photos exploitables.",
      result: "Des équipes capables de produire elles-mêmes des photos pour leur communication.",
      media: { type: 'placeholder', label: '[APERÇU DU GUIDE À AJOUTER]' }
    }
  ],

  press: {
    title: 'Relations presse',
    text: "Concernant les relations presse, je préfère être transparent : mes expériences m’ont surtout amené à travailler la création de contenus, le digital et la communication de marque, et je n’ai pas encore piloté de relations presse avec des retombées à vous présenter. J’ai en revanche conçu et réalisé des contenus vidéo pédagogiques et des interviews, notamment autour d’un dispositif médical, que vous trouverez dans mon portfolio. Je serai heureux de vous présenter lors de l’entretien la manière dont j’envisage les relations presse pour le Centre Hospitalier.",
    // Exemples à ajouter, un bloc par élément : { title: '...', note: '...', href: '/chemin/vers/fichier.pdf' }
    items: []
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
