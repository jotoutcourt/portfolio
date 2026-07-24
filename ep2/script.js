// ---------- ÉCRAN DE VERROUILLAGE : devine le titre lettre par lettre via clavier virtuel (essais illimités) ----------
const loadingScreen = document.getElementById('loadingScreen');
const maskedTitleEl = document.getElementById('maskedTitle');
const keyboardEl = document.getElementById('keyboard');
const keyButtons = keyboardEl.querySelectorAll('.key');

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

if (hasUnlockedBefore()) {
  loadingScreen.remove();
} else {
  document.body.classList.add('locked');

  function renderMask() {
    maskedTitleEl.textContent = SECRET_TITLE
      .split('')
      .map(ch => (foundLetters.has(ch) ? ch : '_'))
      .join(' ');
  }
  renderMask();

  function unlockPage() {
    rememberUnlocked();
    maskedTitleEl.textContent = SECRET_TITLE;
    maskedTitleEl.classList.add('solved');
    keyboardEl.style.display = 'none';
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      document.body.classList.remove('locked');
      setTimeout(() => loadingScreen.remove(), 700);
    }, 900);
  }

  keyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const letter = btn.dataset.letter;
      if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;

      if (SECRET_TITLE.includes(letter)) {
        foundLetters.add(letter);
        btn.classList.add('correct');
        renderMask();
        if (SECRET_TITLE.split('').every(ch => foundLetters.has(ch))) {
          unlockPage();
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

function formatTime(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
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
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  progressFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
});

audio.addEventListener('ended', () => {
  iconPlay.style.display = 'block';
  iconPause.style.display = 'none';
  progressFill.style.width = '0%';
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  audio.currentTime = ratio * audio.duration;
});
