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
