// ---------- ÉCRAN DE CHARGEMENT : annonce de l'EP, puis glisse vers le hero réel ----------
(function revealLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');

  document.body.style.overflow = 'hidden';

  // Fait glisser chaque ligne (kicker / titre / artiste) exactement à la place
  // de son équivalent dans le vrai hero, en un seul mouvement synchronisé.
  function flip(fromEl, toEl, extraStyle) {
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    const dx = toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2);
    const dy = toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2);
    const scale = toRect.width / fromRect.width;
    fromEl.style.transition = 'transform 1s cubic-bezier(.4,0,.2,1), color 0.7s ease';
    fromEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    if (extraStyle) Object.assign(fromEl.style, extraStyle);
  }

  const discoverBtn = document.getElementById('loadingDiscoverBtn');
  const soonEl = loadingScreen.querySelector('.loading-soon');

  discoverBtn.addEventListener('click', () => {
    discoverBtn.disabled = true;
    discoverBtn.style.transition = 'opacity 0.4s ease';
    discoverBtn.style.opacity = '0';
    soonEl.style.transition = 'opacity 0.4s ease';
    soonEl.style.opacity = '0';

    flip(loadingScreen.querySelector('.loading-kicker'), document.querySelector('.hero-kicker'), { color: 'var(--amber)' });
    flip(loadingScreen.querySelector('.loading-title'), document.querySelector('.hero-title'), { color: 'var(--cream-text)' });
    flip(loadingScreen.querySelector('.loading-artist'), document.querySelector('.hero-artist'), { color: 'var(--amber)' });
    loadingScreen.querySelector('.loading-mockup').style.opacity = '0';

    loadingScreen.classList.add('bg-fade');

    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      document.body.style.overflow = '';
      setTimeout(() => loadingScreen.remove(), 600);
    }, 1100);
  });
})();

// ---------- POP-UP "ÉCOUTEZ" (liens plateformes par titre) ----------
const listenModal = document.getElementById('listenModal');
const listenModalTitle = document.getElementById('listenModalTitle');
const listenModalClose = document.getElementById('listenModalClose');
const listenModalToast = document.getElementById('listenModalToast');
const listenModalLinks = document.querySelectorAll('.listen-modal-links [data-platform-link]');
let listenToastTimer = null;

// Liens réels par titre (Apple Music / Deezer / Amazon Music arrivent dans quelques heures)
const TRACK_LINKS = {
  'Amoureux': {
    spotify: 'https://open.spotify.com/intl-fr/track/7pf77N1UBuvL91NOo2jC3M?si=609c0c873bdc49f1',
    youtube: 'https://music.youtube.com/playlist?list=OLAK5uy_kmf7w70wk0miD0MhYKLoxCTce93TY3Djc&si=PFJsVx72eJm1ZuTV',
  },
  'Tinder': {
    spotify: 'https://open.spotify.com/intl-fr/track/6DSK1SpPeDvUnkaDDF0Mgj?si=c22cb11f7c054eb3',
    youtube: 'https://music.youtube.com/playlist?list=OLAK5uy_nnYyVUM17yU-FYye7K--ftTLKyrUEUaQk&si=_7wKXfGQIODkaauH',
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

// ---------- FORMULAIRE "ÊTRE PRÉVENU·E" ----------
const notifyForm = document.getElementById('notifyForm');
const notifySuccess = document.getElementById('notifySuccess');

if (new URLSearchParams(location.search).get('merci') === '1') {
  notifyForm.style.display = 'none';
  notifySuccess.classList.add('show');
}
