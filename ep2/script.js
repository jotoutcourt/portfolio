// ---------- ÉCRAN DE VERROUILLAGE : devine le titre lettre par lettre via clavier virtuel (essais illimités) ----------
const loadingScreen = document.getElementById('loadingScreen');
const maskedTitleEl = document.getElementById('maskedTitle');
const lockLabelEl = document.querySelector('.lock-label');
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

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    if (audio.currentTime < EXCERPT_START || audio.currentTime >= EXCERPT_END) {
      audio.currentTime = EXCERPT_START;
    }
    audio.play();
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
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
