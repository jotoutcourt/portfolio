// ---------- FORMULAIRE "ÊTRE PRÉVENU·E" ----------
const notifyForm = document.getElementById('notifyForm');
const notifySuccess = document.getElementById('notifySuccess');

if (new URLSearchParams(location.search).get('merci') === '1') {
  notifyForm.style.display = 'none';
  notifySuccess.classList.add('show');
}
