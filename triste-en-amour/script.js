// ---------- POP-UP "ÉCOUTEZ" (liens plateformes par titre) ----------
const listenModal = document.getElementById('listenModal');
const listenModalTitle = document.getElementById('listenModalTitle');
const listenModalClose = document.getElementById('listenModalClose');
const listenModalToast = document.getElementById('listenModalToast');
let listenToastTimer = null;

document.querySelectorAll('.track-listen').forEach(btn => {
  btn.addEventListener('click', () => {
    listenModalTitle.textContent = btn.dataset.track;
    listenModalToast.classList.remove('show');
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

document.querySelectorAll('[data-platform-link]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
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
