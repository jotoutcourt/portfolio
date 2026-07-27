// ---------- ÉCRAN DE VERROUILLAGE : devine le titre lettre par lettre via clavier virtuel (essais illimités) ----------
const loadingScreen = document.getElementById('loadingScreen');
const maskedTitleEl = document.getElementById('maskedTitle');
const lockLabelEl = document.querySelector('.lock-label');
const lockHintEl = document.querySelector('.lock-hint');
const keyboardEl = document.getElementById('keyboard');
const keyButtons = keyboardEl.querySelectorAll('.key');
const heroTitleEl = document.querySelector('.sky-section h1');

const SECRET_TITLE = 'amoureux';
const UNLOCK_KEY = 'amoureux-ep2-unlocked';
const foundLetters = new Set();

function hasUnlockedBefore() {
  try {
    return localStorage.getItem(UNLOCK_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

function rememberUnlocked() {
  try {
    localStorage.setItem(UNLOCK_KEY, 'true');
  } catch (e) {
    // localStorage indisponible (navigation privée, etc.) : tant pis, on redemandera la prochaine fois
  }
}

function renderMask() {
  maskedTitleEl.textContent = SECRET_TITLE
    .split('')
    .map(ch => (foundLetters.has(ch) ? ch : '_'))
    .join('');
}

// Réécriture jolie (les lettres se resserrent) puis le titre glisse pile à la place du vrai
// titre du hero pendant que le fond bleu s'efface pour révéler le ciel + les nuages.
// Cette animation rejoue à chaque ouverture ; seule l'énigme (deviner via le clavier) ne revient qu'une fois.
function playRevealAnimation() {
  maskedTitleEl.textContent = SECRET_TITLE;
  maskedTitleEl.classList.add('solved');
  lockLabelEl.classList.add('fade-hide');
  lockHintEl.classList.add('fade-hide');
  keyboardEl.classList.add('fade-hide');

  setTimeout(() => {
    const fromRect = maskedTitleEl.getBoundingClientRect();
    const toRect = heroTitleEl.getBoundingClientRect();
    const dx = toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2);
    const dy = toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2);
    const scale = toRect.width / fromRect.width;

    maskedTitleEl.style.transition = 'transform 0.9s cubic-bezier(.4,0,.2,1)';
    maskedTitleEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;

    loadingScreen.classList.add('bg-fade');

    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      document.body.classList.remove('locked');
      setTimeout(() => loadingScreen.remove(), 500);
    }, 900);
  }, 650);
}

document.body.classList.add('locked');

if (hasUnlockedBefore()) {
  lockLabelEl.classList.add('fade-hide');
  lockHintEl.classList.add('fade-hide');
  keyboardEl.classList.add('fade-hide');
  SECRET_TITLE.split('').forEach(ch => foundLetters.add(ch));
  renderMask();
  setTimeout(playRevealAnimation, 500);
} else {
  renderMask();

  keyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const letter = btn.dataset.letter;
      if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;

      if (SECRET_TITLE.includes(letter)) {
        foundLetters.add(letter);
        btn.classList.add('correct');
        renderMask();
        if (SECRET_TITLE.split('').every(ch => foundLetters.has(ch))) {
          rememberUnlocked();
          playRevealAnimation();
        }
      } else {
        btn.classList.add('wrong');
      }
    });
  });
}

// ---------- NUAGES : dissipation au scroll ----------
const skySection = document.getElementById('skySection');
const cloudsDesktop = document.getElementById('cloudsDesktop');
const cloudsMobile = document.getElementById('cloudsMobile');

function updateClouds() {
  const rect = skySection.getBoundingClientRect();
  const vh = window.innerHeight;
  const progress = Math.min(Math.max(-rect.top / vh, 0), 1);
  const scale = 1 + progress * 0.6;
  const opacity = 0.35 * (1 - progress);
  const translateY = -progress * 120;

  [cloudsDesktop, cloudsMobile].forEach(el => {
    el.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`;
    el.style.opacity = opacity;
  });
}

window.addEventListener('scroll', updateClouds, { passive: true });
updateClouds();

// ---------- COMPTE À REBOURS : sortie le 31 juillet à minuit et une seconde ----------
const cdDays = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMinutes = document.getElementById('cdMinutes');
const cdSeconds = document.getElementById('cdSeconds');
const countdownEl = document.getElementById('countdown');
const RELEASE_DATE = new Date(2026, 6, 31, 0, 0, 1);

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = RELEASE_DATE.getTime() - Date.now();
  if (diff <= 0) {
    countdownEl.querySelector('.countdown-label').textContent = 'disponible !';
    cdDays.textContent = cdHours.textContent = cdMinutes.textContent = cdSeconds.textContent = '00';
    clearInterval(countdownTimer);
    return;
  }
  const totalSeconds = Math.floor(diff / 1000);
  cdDays.textContent = pad(Math.floor(totalSeconds / 86400));
  cdHours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
  cdMinutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
  cdSeconds.textContent = pad(totalSeconds % 60);
}

updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

// ---------- POP-UP "SORTIE LE 31 JUILLET" (boutons Spotify / Apple Music) ----------
const releaseToast = document.getElementById('releaseToast');
let toastTimer = null;

document.querySelectorAll('.cta-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    releaseToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => releaseToast.classList.remove('show'), 2600);
  });
});

// ---------- EASTER EGG : soulever la pochette ----------
const coverWrap = document.getElementById('coverWrap');
const coverImg = document.getElementById('coverImg');
const easterEggImg = document.getElementById('easterEggImg');

coverImg.addEventListener('click', () => {
  coverWrap.classList.toggle('lifted');
});

// ---------- EASTER EGG 2 : mini appli de rencontre (clic sur la flamme) ----------
const datingOverlay = document.getElementById('datingOverlay');
const datingStack = document.getElementById('datingStack');
const datingCards = Array.from(datingStack.querySelectorAll('.dating-card'));
const datingActions = document.getElementById('datingActions');
const nopeBtn = document.getElementById('nopeBtn');
const likeBtn = document.getElementById('likeBtn');
const datingMatch = document.getElementById('datingMatch');
const datingCloseBtn = document.getElementById('datingCloseBtn');
const matchPlayBtn = document.getElementById('matchPlayBtn');
const audioSurprise = document.getElementById('audioSurprise');

let datingIndex = 0;

function layoutDatingStack() {
  datingCards.forEach((card, i) => {
    const rel = i - datingIndex;
    card.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
    if (rel < 0) return; // déjà swipée, on la laisse hors champ
    if (rel === 0) {
      card.style.zIndex = 10;
      card.style.opacity = '1';
      card.style.transform = 'translate(0, 0) rotate(0deg)';
      card.style.pointerEvents = 'auto';
    } else if (rel === 1) {
      card.style.zIndex = 5;
      card.style.opacity = '0.7';
      card.style.transform = 'scale(0.95) translateY(14px)';
      card.style.pointerEvents = 'none';
    } else {
      card.style.zIndex = 1;
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9) translateY(28px)';
      card.style.pointerEvents = 'none';
    }
  });
}

function swipeActiveCard(direction) {
  const card = datingCards[datingIndex];
  if (!card) return;
  card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
  card.style.transform = `translate(${direction * 500}px, -30px) rotate(${direction * 22}deg)`;
  card.style.opacity = '0';
  card.style.pointerEvents = 'none';
  datingIndex++;
  setTimeout(() => {
    if (datingIndex >= datingCards.length) {
      datingActions.style.display = 'none';
      datingMatch.classList.add('show');
    } else {
      layoutDatingStack();
    }
  }, 200);
}

nopeBtn.addEventListener('click', () => swipeActiveCard(-1));
likeBtn.addEventListener('click', () => swipeActiveCard(1));

// Glisser la carte à la souris/au doigt
let dragStartX = 0;
let dragging = false;

function onDragStart(x, card) {
  dragging = true;
  dragStartX = x;
  card.classList.add('dragging');
}

function onDragMove(x, card) {
  if (!dragging) return;
  const dx = x - dragStartX;
  card.style.transform = `translate(${dx}px, 0) rotate(${dx / 18}deg)`;
}

function onDragEnd(x, card) {
  if (!dragging) return;
  dragging = false;
  card.classList.remove('dragging');
  const dx = x - dragStartX;
  if (Math.abs(dx) > 80) {
    swipeActiveCard(dx > 0 ? 1 : -1);
  } else {
    layoutDatingStack();
  }
}

datingCards.forEach(card => {
  card.addEventListener('mousedown', (e) => onDragStart(e.clientX, card));
  card.addEventListener('mousemove', (e) => onDragMove(e.clientX, card));
  window.addEventListener('mouseup', (e) => onDragEnd(e.clientX, card));

  card.addEventListener('touchstart', (e) => onDragStart(e.touches[0].clientX, card), { passive: true });
  card.addEventListener('touchmove', (e) => onDragMove(e.touches[0].clientX, card), { passive: true });
  card.addEventListener('touchend', (e) => onDragEnd(e.changedTouches[0].clientX, card));
});

function openDatingApp() {
  datingIndex = 0;
  datingActions.style.display = 'flex';
  datingMatch.classList.remove('show');
  datingCards.forEach(card => { card.style.transform = ''; card.style.opacity = ''; });
  layoutDatingStack();
  datingOverlay.classList.add('open');
}

// L'extrait surprise ne joue que de 0:26 à 0:39
const SURPRISE_START = 26;
const SURPRISE_END = 39;
const MATCH_BTN_LABEL = "Écouter un extrait de mon deuxième titre surprise !";

function resetSurpriseAudio() {
  audioSurprise.pause();
  audioSurprise.currentTime = SURPRISE_START;
  matchPlayBtn.textContent = MATCH_BTN_LABEL;
}

function closeDatingApp() {
  datingOverlay.classList.remove('open');
  resetSurpriseAudio();
}

easterEggImg.addEventListener('click', openDatingApp);
datingCloseBtn.addEventListener('click', closeDatingApp);

audioSurprise.addEventListener('loadedmetadata', () => {
  audioSurprise.currentTime = SURPRISE_START;
});

matchPlayBtn.addEventListener('click', () => {
  if (audioSurprise.paused) {
    if (audioSurprise.currentTime < SURPRISE_START || audioSurprise.currentTime >= SURPRISE_END) {
      audioSurprise.currentTime = SURPRISE_START;
    }
    audioSurprise.play().catch(() => {});
    matchPlayBtn.textContent = '⏸ En lecture...';
  } else {
    audioSurprise.pause();
    matchPlayBtn.textContent = MATCH_BTN_LABEL;
  }
});

audioSurprise.addEventListener('timeupdate', () => {
  if (audioSurprise.currentTime >= SURPRISE_END) {
    resetSurpriseAudio();
  }
});

audioSurprise.addEventListener('ended', resetSurpriseAudio);

// ---------- LECTEUR AUDIO ----------
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// L'audio ne joue que l'extrait 0:36 → 1:10 du morceau complet
const EXCERPT_START = 0;
const EXCERPT_END = 16;
const EXCERPT_LENGTH = EXCERPT_END - EXCERPT_START;

function formatTime(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function stopAtExcerptEnd() {
  audio.pause();
  audio.currentTime = EXCERPT_START;
  iconPlay.style.display = 'block';
  iconPause.style.display = 'none';
  progressFill.style.width = '0%';
  currentTimeEl.textContent = formatTime(0);
}

// ---------- COMPTEUR D'ÉCOUTES (partagé entre jordan-join.fr et faisonsdesbulles.com) ----------
const listenersCounterEl = document.getElementById('listenersCounter');
const LISTENS_NAMESPACE = 'amoureux-jo';
const LISTENS_KEY = 'ep2-listens';

function renderListenersCount(value) {
  const n = Number(value).toLocaleString('fr-FR');
  listenersCounterEl.textContent = `${n} personne${value > 1 ? 's ont' : ' a'} déjà écouté l'extrait`;
}

fetch(`https://abacus.jasoncameron.dev/get/${LISTENS_NAMESPACE}/${LISTENS_KEY}`)
  .then(r => r.json())
  .then(data => renderListenersCount(data.value))
  .catch(() => {});

let hasCountedListen = false;
function registerListen() {
  if (hasCountedListen) return;
  hasCountedListen = true;
  fetch(`https://abacus.jasoncameron.dev/hit/${LISTENS_NAMESPACE}/${LISTENS_KEY}`)
    .then(r => r.json())
    .then(data => renderListenersCount(data.value))
    .catch(() => {});
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    if (audio.currentTime < EXCERPT_START || audio.currentTime >= EXCERPT_END) {
      audio.currentTime = EXCERPT_START;
    }
    audio.play();
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
    registerListen();
  } else {
    audio.pause();
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
  }
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(EXCERPT_LENGTH);
  audio.currentTime = EXCERPT_START;
});

audio.addEventListener('timeupdate', () => {
  if (audio.currentTime >= EXCERPT_END) {
    stopAtExcerptEnd();
    return;
  }
  const elapsed = Math.max(0, audio.currentTime - EXCERPT_START);
  currentTimeEl.textContent = formatTime(elapsed);
  progressFill.style.width = `${(elapsed / EXCERPT_LENGTH) * 100}%`;
});

audio.addEventListener('ended', stopAtExcerptEnd);

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  audio.currentTime = EXCERPT_START + ratio * EXCERPT_LENGTH;
});
