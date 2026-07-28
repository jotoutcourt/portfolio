// ---------- COMPTE À REBOURS : sortie le 4 septembre ----------
const cdDays = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMinutes = document.getElementById('cdMinutes');
const cdSeconds = document.getElementById('cdSeconds');
const RELEASE_DATE = new Date(2026, 8, 4, 0, 0, 0);

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = RELEASE_DATE.getTime() - Date.now();
  if (diff <= 0) {
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

// ---------- FORMULAIRE "ÊTRE PRÉVENU·E" ----------
const notifyForm = document.getElementById('notifyForm');
const notifySuccess = document.getElementById('notifySuccess');

if (new URLSearchParams(location.search).get('merci') === '1') {
  notifyForm.style.display = 'none';
  notifySuccess.classList.add('show');
}
