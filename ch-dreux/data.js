/*
 * Données de la page /ch-dreux  —  c'est LE fichier à éditer.
 *
 * - Tout texte entre crochets, ex. [MON RÔLE], est un placeholder : il est surligné en jaune
 *   en local (ou avec ?brouillon dans l'URL) pour être repéré facilement, puis affiché tel quel en ligne.
 * - Ajouter / retirer / réordonner un projet = ajouter, supprimer ou déplacer un bloc { ... } dans PROJECTS.
 *   L'ordre d'affichage dans une section suit l'ordre du tableau.
 * - section : 'print' | 'video' | 'digital' | 'events'
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
    "que vous proposez. Vous pouvez retrouver l'ensemble de mes projets sur mon site jordan-join.fr/projets",

  // Le libellé ci-dessus (identique, mot pour mot) devient un lien cliquable vers href.
  introLink: { label: 'jordan-join.fr/projets', href: 'https://jordan-join.fr/projets.html' },

  sections: [
    { id: 'print',   title: 'Print et identité visuelle',  lead: "Identité visuelle, affiches et supports d'information." },
    { id: 'video',   title: 'Photo et vidéo',              lead: "Production d'images et de vidéos pour informer et valoriser." },
    { id: 'digital', title: 'Digital et réseaux sociaux',  lead: "Site internet et réseaux sociaux." },
    { id: 'events',  title: 'Événementiel',                lead: "Organisation d'événements et de présences institutionnelles." },
    { id: 'internal', title: 'Communication interne',      lead: "Guides et lettres à destination des équipes." }
  ],

  projects: [

    /* ───────────── PRINT ET IDENTITÉ VISUELLE ───────────── */
    {
      section: 'print',
      title: 'Pandora — gamme de dispositifs médicaux',
      page: '/ch-dreux/pandora/',
      tag: 'Laboratoire Labrha',
      context: "Gamme de dispositifs médicaux de viscosupplémentation (traitement de l'arthrose), soumise à la réglementation européenne sur les dispositifs médicaux (MDR 2017/745).",
      role: "Création de la charte graphique et de l'univers de marque (packagings, notices, cartes d'implants), puis préparation du lancement : communication auprès des prescripteurs, outils pour les commerciaux, landing pages.",
      result: '[RÉSULTAT]',
      media: {
        type: 'image', src: '/assets/pandoviolet.png', fit: 'contain',
        alt: "Boîte de la gamme Pandora 1, violette, portant la mention « Viscosupplément linéaire », « 1 x 4,8 mL » et « Made in France », avec le logo du laboratoire Labrha."
      }
    },
    {
      section: 'print',
      title: 'Gamme compléments alimentaires — refonte de la charte',
      page: '/ch-dreux/gamme-complements/',
      tag: 'Laboratoire Labrha',
      context: "Compléments alimentaires articulaires (Tenofort, Cuivramine) : des supports destinés à la fois aux professionnels de santé et aux patients.",
      role: "Refonte de la charte graphique de la gamme et conception des supports (livrets, affiches) ; mise à jour et digitalisation des supports commerciaux de terrain destinés aux professionnels de santé.",
      result: '[RÉSULTAT]',
      media: {
        type: 'image', src: '/assets/cuivramock.png', fit: 'contain',
        alt: "Livret Cuivramine, couverture et double page intérieure : titre « Un concentré d'efficacité », visuel du produit et encarts pédagogiques sur fond bleu."
      }
    },
    {
      section: 'print',
      title: "Visit Metz — campagne « Lumières d'Europe »",
      page: '/ch-dreux/metz/',
      tag: 'Eurométropole de Metz',
      context: "Série d'affiches pour la promotion touristique de Metz autour des festivals de lumière.",
      role: '[MON RÔLE]',
      result: '[RÉSULTAT]',
      media: {
        type: 'image', src: '/assets/metz-lumieres-1.webp', fit: 'contain',
        alt: "Affiche Visit Metz : « À Metz, même la lumière nous joue des tours », projection lumineuse colorée sur la façade de la cathédrale de Metz, de nuit."
      }
    },

    /* ───────────── PHOTO ET VIDÉO ───────────── */
    {
      section: 'video',
      title: "« La 3D c'est pas sorcier » — série vidéo",
      page: '/ch-dreux/f3df/',
      tag: "Entreprise d'impression 3D",
      context: "Série de 5 vidéos pédagogiques reprenant les codes de l'émission « C'est pas sorcier », appliqués à l'impression 3D.",
      role: '[MON RÔLE]',
      result: '[RÉSULTAT]',
      media: {
        type: 'youtube', youtubeId: 'gmpNNYtjunM', list: 'PL2CHMYGVYwZPm5mbNN0n8H8RynHfGQmTO',
        poster: '/assets/f3df.png',
        alt: "Plan rapproché d'une tête d'impression 3D, éclairée en rouge et turquoise."
      },
      link: { label: 'Voir la série complète sur YouTube', href: 'https://www.youtube.com/playlist?list=PL2CHMYGVYwZPm5mbNN0n8H8RynHfGQmTO' }
    },
    {
      section: 'video',
      title: 'Graille — spot produit « Cacahuète 3 chocolats »',
      page: '/ch-dreux/graille/#s-videos',
      tag: 'Start-up food, Lyon',
      context: "Distributeurs de plats faits maison, cuisinés frais chaque matin, destinés aux étudiants des écoles lyonnaises : spot vidéo de présentation d'un produit.",
      role: '[MON RÔLE]',
      result: '[RÉSULTAT]',
      media: { type: 'video', src: '/assets/pubchoco.mp4', poster: '/ch-dreux/posters/graille-produit.jpg' }
    },
    {
      section: 'video',
      title: '[TITRE PROJET PHOTO / REPORTAGE]',
      tag: '[ORGANISATION]',
      context: '[CONTEXTE]',
      role: '[MON RÔLE]',
      result: '[RÉSULTAT]',
      media: { type: 'placeholder', label: '[PHOTO OU REPORTAGE À AJOUTER]' }
    },

    /* ───────────── DIGITAL ET RÉSEAUX SOCIAUX ───────────── */
    {
      section: 'digital',
      title: 'Refonte du site internet de Labrha',
      page: '/ch-dreux/labrha-site/',
      tag: 'Laboratoire Labrha',
      context: "Site vitrine et boutique en ligne d'un laboratoire spécialisé en rhumatologie : modernisation de l'image, hiérarchisation des informations et navigation simplifiée.",
      role: "Pilotage et réalisation de la refonte complète du site (WordPress), ainsi que gestion de la boutique en ligne.",
      result: '[RÉSULTAT]',
      media: {
        type: 'image', src: '/assets/labrhars1.png', fit: 'contain',
        alt: "Visuel promotionnel « Rendez-nous visite » montrant, sur un ordinateur portable, la boutique en ligne du laboratoire Labrha."
      },
      link: { label: 'Visiter le site', href: 'https://www.laboratoire-labrha.fr/' }
    },
    {
      section: 'digital',
      title: 'Réseaux sociaux du laboratoire Labrha',
      page: '/ch-dreux/labrha-reseaux/',
      tag: 'Laboratoire Labrha',
      context: "Compte Instagram du laboratoire : posts éducatifs, présentations de produits et communication institutionnelle.",
      role: "Conception et réalisation des visuels, définition du plan éditorial et du calendrier de publication, suivi des performances.",
      result: '[RÉSULTAT]',
      media: {
        type: 'image', src: '/assets/labrhars3.png', fit: 'contain',
        alt: "Publication Instagram : « Et si votre assiette pouvait soulager vos articulations ? », autour d'une assiette de poulet grillé et de légumes."
      }
    },
    {
      section: 'digital',
      title: 'Vasculyon — identité visuelle et site web',
      page: '/ch-dreux/vasculyon/',
      tag: 'Cabinet de chirurgie vasculaire · mission freelance',
      context: "Cabinet de chirurgie vasculaire et endovasculaire (Lyon, Vienne, Vénissieux) : une identité visuelle et un site destinés aux patients, aux médecins adresseurs et aux futurs praticiens.",
      role: '[MON RÔLE]',
      result: '[RÉSULTAT]',
      media: {
        type: 'image', src: '/assets/vasculyonweb.jpg', fit: 'cover',
        alt: "Page d'accueil du site Vasculyon : équipe chirurgicale au bloc opératoire, titre « Chirurgie vasculaire et endovasculaire » et trois praticiens avec un bouton de prise de rendez-vous."
      }
    },

    /* ───────────── ÉVÉNEMENTIEL ───────────── */
    {
      section: 'events',
      title: 'Eurovisco — 3 éditions',
      tag: 'Laboratoire Labrha',
      context: "Événement annuel organisé à Lyon, réunissant une dizaine de rhumatologues du monde entier pour débattre d'un nouveau sujet à chaque édition.",
      role: "Organisation de 3 éditions. [PRÉCISER : programme, invitations, logistique, accueil, communication…]",
      result: '[RÉSULTAT]',
      media: { type: 'placeholder', label: '[PHOTO OU VISUEL EUROVISCO À AJOUTER]' }
    },
    {
      section: 'events',
      title: 'Congrès internationaux — dont Medica',
      tag: 'Laboratoire Labrha',
      context: "Présence du laboratoire sur de nombreux congrès internationaux, dont Medica.",
      role: "Organisation de la présence du laboratoire. [PRÉCISER : stand, supports, prospection, équipe sur place…]",
      result: '[RÉSULTAT]',
      media: { type: 'placeholder', label: '[PHOTO OU VISUEL DE CONGRÈS À AJOUTER]' }
    },
    {
      section: 'events',
      title: "Graille — spot d'inauguration",
      page: '/ch-dreux/graille/#s-videos',
      tag: 'Start-up food, Lyon',
      context: "Spot vidéo pour l'inauguration d'un distributeur de plats frais dans un établissement d'enseignement supérieur lyonnais (UCLY).",
      role: '[MON RÔLE]',
      result: '[RÉSULTAT]',
      media: { type: 'video', src: '/assets/vide%CC%81opubgraille.mp4', poster: '/ch-dreux/posters/graille-inauguration.jpg' }
    },

    /* ───────────── COMMUNICATION INTERNE ───────────── */
    {
      section: 'internal',
      title: 'Guide de photographie pour les équipes',
      tag: 'Brasserie 1755 · Bourgoin',
      context: "Guide de photographie destiné aux équipes de la brasserie 1755, à Bourgoin.",
      role: '[MON RÔLE]',
      result: '[RÉSULTAT]',
      media: { type: 'placeholder', label: '[APERÇU DU GUIDE À AJOUTER]' }
    },
    {
      section: 'internal',
      title: 'Lettre hebdomadaire',
      tag: 'Laboratoire Labrha',
      context: "Lettres hebdomadaires de communication interne du laboratoire.",
      role: '[MON RÔLE]',
      result: '[RÉSULTAT]',
      media: { type: 'placeholder', label: "[APERÇU D'UNE LETTRE À AJOUTER]" }
    }
  ],

  press: {
    title: 'Relations presse',
    text: "[RELATIONS PRESSE — texte à rédiger : exemples de communiqués, dossiers de presse, interactions avec les médias, retombées.]",
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
    // Dépose le PDF du portfolio dans /assets/ puis renseigne son chemin ici (ex : '/assets/portfolio-jordan-join.pdf').
    // Tant que ce champ est vide, le bouton s'affiche désactivé.
    portfolio: ''
  }
};
