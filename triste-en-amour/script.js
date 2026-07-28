// ---------- COMPTE À REBOURS : vendredi 31 juillet, minuit et une seconde ----------
const cdDays = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMinutes = document.getElementById('cdMinutes');
const cdSeconds = document.getElementById('cdSeconds');
const countdownLabelEl = document.querySelector('.countdown-label');
const RELEASE_DATE = new Date(2026, 6, 31, 0, 0, 1);

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = RELEASE_DATE.getTime() - Date.now();
  if (diff <= 0) {
    countdownLabelEl.textContent = 'les indices sont là !';
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
