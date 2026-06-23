// ---------- ECRAN DE CHARGEMENT ----------
const loadingScreen = document.getElementById('loadingScreen');
setTimeout(() => {
  loadingScreen.classList.add('fade-out');
  setTimeout(() => loadingScreen.remove(), 700);
}, 2700);

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

// ---------- PAROLES (sections plein écran) : écriture / effacement au scroll ----------
const lyricEls = document.querySelectorAll('.lyrics-section--single .lyric');
lyricEls.forEach(el => { el.dataset.fullText = el.textContent; });

const lyricMaxProgress = new Map();

function updateScrollLyrics() {
  const vh = window.innerHeight;
  lyricEls.forEach(el => {
    const section = el.closest('.lyrics-section--single');
    const rect = section.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const dist = Math.abs(center - vh / 2);
    const progress = Math.max(0, 1 - dist / (vh * 0.3));
    const maxProgress = Math.max(progress, lyricMaxProgress.get(el) || 0);
    lyricMaxProgress.set(el, maxProgress);
    const text = el.dataset.fullText;
    const visibleChars = Math.round(text.length * maxProgress);
    el.textContent = text.slice(0, visibleChars);
    el.classList.toggle('visible', maxProgress > 0.05);
  });
}

window.addEventListener('scroll', updateScrollLyrics, { passive: true });
updateScrollLyrics();

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

// ---------- PAROLES SOUS LE LECTEUR (synchronisées sur des timestamps précis) ----------
const currentLyricEl = document.getElementById('currentLyric');

// timestamps au format [minute, seconde]
function toSeconds(min, sec) { return min * 60 + sec; }

const syncedLyrics = [
  { time: toSeconds(0, 15), text: "T'aimer c'était comme, attraper un coup de soleil en plein été" },
  { time: toSeconds(0, 22), text: "Ça brûle en plein jour, t'en dors plus la nuit, ça disparaît lentement" },
  { time: toSeconds(0, 29), text: "T'aimer c'était comme, les fenêtres ouvertes, rouler à 130, ta main sur ma jambe" },
  { time: toSeconds(0, 36), text: "Comme le ciel en août, juste avant l'orage" },
  { time: toSeconds(0, 42), text: "Te perdre était bleu, comme un océan" },
  { time: toSeconds(0, 46), text: "Penser à toi est gris à chaque instant" },
  { time: toSeconds(0, 50), text: "T'oublier, c'était comme voir le soleil s'effacer sur ma peau" },
  { time: toSeconds(0, 56), text: "Oui t'aimer était rouge" },
  { time: toSeconds(1, 5), text: "Te toucher c'était comme, plonger dans l'eau froide après une journée à brûler" },
  { time: toSeconds(1, 12), text: "Te mémoriser c'était chanter chaque parole de ta chanson préférée" },
  { time: toSeconds(1, 19), text: "Nous engueuler c'était comme, le goût de la mer, sur ta peau salée" },
  { time: toSeconds(1, 27), text: "Et regretter c'était comme, me laisser sur le quai, des heures à pleurer" },
  { time: toSeconds(1, 33), text: "Te perdre était bleu comme un océan" },
  { time: toSeconds(1, 36), text: "Penser à toi est gris à chaque instant" },
  { time: toSeconds(1, 40), text: "T'oublier, c'était comme voir le soleil s'effacer sur ma peau" },
  { time: toSeconds(1, 47), text: "T'aimer était rouge" },
  { time: toSeconds(2, 3), text: "Je pense à toi en flash-backs, en échos" },
  { time: toSeconds(2, 6), text: "Je dois passer à autre chose, je dois \"let go\"" },
  { time: toSeconds(2, 9), text: "Mais ça fait des années que tout est ancré" },
  { time: toSeconds(2, 13), text: "Je ne veux pas effacer" },
  { time: toSeconds(2, 17), text: "Ton coup de soleil" },
  { time: toSeconds(2, 22), text: "Te perdre était bleu comme un océan" },
  { time: toSeconds(2, 25), text: "Penser à toi est gris à chaque instant" },
  { time: toSeconds(2, 28), text: "T'oublier, c'était comme voir le soleil s'effacer sur ma peau" },
  { time: toSeconds(2, 35), text: "Oui t'aimer était rouge" },
  { time: toSeconds(2, 44), text: "C'est pour ça que je sais qu'encore cet été" },
  { time: toSeconds(2, 48), text: "Tu me reviens, comme une brûlure" },
  { time: toSeconds(2, 58), text: "L'aimer c'était comme attraper un coup de soleil" },
  { time: toSeconds(3, 2), text: "en plein été" },
];

let currentLyricIndex = -1;

audio.addEventListener('timeupdate', () => {
  let idx = -1;
  for (let i = syncedLyrics.length - 1; i >= 0; i--) {
    if (audio.currentTime >= syncedLyrics[i].time) { idx = i; break; }
  }
  if (idx !== currentLyricIndex) {
    currentLyricIndex = idx;
    if (idx === -1) {
      currentLyricEl.classList.remove('shown');
    } else {
      currentLyricEl.classList.remove('shown');
      setTimeout(() => {
        currentLyricEl.textContent = syncedLyrics[idx].text;
        currentLyricEl.classList.add('shown');
      }, 150);
    }
  }
});

audio.addEventListener('seeked', () => { currentLyricIndex = -2; });
