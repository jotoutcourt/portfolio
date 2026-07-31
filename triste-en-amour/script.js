// ---------- ÉCRAN DE CHARGEMENT : annonce de l'EP, puis fondu simple vers le hero réel ----------
(function revealLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');

  // Retour depuis le formulaire "être prévenu·e" (FormSubmit redirige ici) :
  // on a déjà vu l'annonce il y a quelques secondes, pas besoin de la rejouer.
  if (new URLSearchParams(location.search).get('merci') === '1') {
    loadingScreen.remove();
    return;
  }

  const discoverBtn = document.getElementById('loadingDiscoverBtn');
  const loadingTitleEl = loadingScreen.querySelector('.loading-title');
  const heroTitleEl = document.querySelector('.hero-title');

  document.body.style.overflow = 'hidden';

  // Calcule où le titre du hero se trouve réellement, pour que le titre de
  // l'écran de chargement tombe pile au même endroit (les deux blocs n'ont
  // pas la même hauteur totale, donc leurs centres ne coïncident pas par défaut).
  const fromRect = loadingTitleEl.getBoundingClientRect();
  const toRect = heroTitleEl.getBoundingClientRect();
  const dx = toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2);
  const dy = toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2);
  const scale = toRect.width / fromRect.width;
  loadingTitleEl.style.setProperty('--tx', `${dx}px`);
  loadingTitleEl.style.setProperty('--ty', `${dy}px`);
  loadingTitleEl.style.setProperty('--ts', scale);
  loadingTitleEl.classList.add('loading-title--aligned');

  discoverBtn.addEventListener('click', () => {
    loadingScreen.classList.add('fade-out');
    document.body.style.overflow = '';
    setTimeout(() => loadingScreen.remove(), 2200);
  });
})();

// ---------- POP-UP "ÉCOUTEZ" (liens plateformes par titre) ----------
const listenModal = document.getElementById('listenModal');
const listenModalTitle = document.getElementById('listenModalTitle');
const listenModalClose = document.getElementById('listenModalClose');
const listenModalToast = document.getElementById('listenModalToast');
const listenModalLinks = document.querySelectorAll('.listen-modal-links [data-platform-link]');
let listenToastTimer = null;

// Liens réels par titre (Apple Music / Deezer arrivent dans quelques heures)
const TRACK_LINKS = {
  'Amoureux': {
    spotify: 'https://open.spotify.com/intl-fr/track/7pf77N1UBuvL91NOo2jC3M?si=609c0c873bdc49f1',
    youtube: 'https://music.youtube.com/playlist?list=OLAK5uy_kmf7w70wk0miD0MhYKLoxCTce93TY3Djc&si=PFJsVx72eJm1ZuTV',
    amazon: 'https://music.amazon.fr/albums/B0HC3FYWXP',
  },
  'Tinder': {
    spotify: 'https://open.spotify.com/intl-fr/track/6DSK1SpPeDvUnkaDDF0Mgj?si=c22cb11f7c054eb3',
    youtube: 'https://music.youtube.com/playlist?list=OLAK5uy_nnYyVUM17yU-FYye7K--ftTLKyrUEUaQk&si=_7wKXfGQIODkaauH',
    amazon: 'https://music.amazon.fr/tracks/B0HC49N1KD?marketplaceId=A13V1IB3VIYZZH&musicTerritory=FR&ref=dm_sh_srFuTwS3sJ6lCVbBh8G7fgD6m',
  },
  "L'amour (le vrai)": {
    spotify: 'https://open.spotify.com/intl-fr/track/2JQDPbsNCqDr4BjflVjoEP?si=d36ed6aab8e045c8',
  },
};

document.querySelectorAll('.track-listen').forEach(btn => {
  btn.addEventListener('click', () => {
    const track = btn.dataset.track;
    listenModalTitle.textContent = track;
    listenModalToast.classList.remove('show');

    const links = TRACK_LINKS[track] || {};
    listenModalLinks.forEach(link => {
      const url = links[link.dataset.platformLink];
      link.href = url || '#';
      const badge = link.querySelector('.soon-badge');
      if (badge) badge.style.display = url ? 'none' : '';
    });

    listenModal.classList.add('open');
  });
});

function closeListenModal() {
  listenModal.classList.remove('open');
}

listenModalClose.addEventListener('click', closeListenModal);
listenModal.addEventListener('click', (e) => {
  if (e.target === listenModal) closeListenModal();
});

listenModalLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') && link.getAttribute('href') !== '#') return; // vrai lien : laisser naviguer
    e.preventDefault();
    const isSpotify = link.dataset.platformLink === 'spotify';
    listenModalToast.textContent = isSpotify
      ? '🔔 pas encore dispo, on te préviendra !'
      : 'patience, le titre sera dispo dans quelques heures sur cette plateforme';
    listenModalToast.classList.add('show');
    clearTimeout(listenToastTimer);
    listenToastTimer = setTimeout(() => listenModalToast.classList.remove('show'), 2600);
  });
});

// ---------- FORMULAIRE "ÊTRE PRÉVENU·E" (envoi en AJAX, pas de rechargement de page) ----------
const notifyForm = document.getElementById('notifyForm');
const notifySuccess = document.getElementById('notifySuccess');
const notifyBtn = notifyForm.querySelector('.notify-btn');

notifyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  notifyBtn.disabled = true;
  notifyBtn.textContent = 'envoi...';

  fetch(notifyForm.action, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(notifyForm),
  })
    .then(res => {
      if (!res.ok) throw new Error('submit failed');
      notifyForm.style.display = 'none';
      notifySuccess.classList.add('show');
    })
    .catch(() => {
      notifyBtn.disabled = false;
      notifyBtn.textContent = 'réessayer';
    });
});
