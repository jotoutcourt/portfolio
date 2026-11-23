/* Les pages projet s'ouvrent dans un nouvel onglet depuis /ch-dreux.
   Le lien « Retour » referme alors cet onglet (ce qui ramène sur la candidature) ;
   si le navigateur refuse de le fermer (page ouverte directement), il garde son comportement normal. */
(function () {
  var links = document.querySelectorAll('a[href="/ch-dreux/"], a[href^="/ch-dreux/#"]');
  /* Candidature personnalisée (?c=…) : « Retour » garde le même réglage, sinon on retomberait sur la version par défaut. */
  var base = location.pathname.indexOf('/candidature/') === 0 ? '/candidature/' : '/ch-dreux/';
  var carried = '';
  try { var mm = /[?&]c=([^&#]+)/.exec(location.search); carried = mm ? decodeURIComponent(mm[1]) : (localStorage.getItem('chCfgLast') || ''); } catch (e) {}
  Array.prototype.forEach.call(links, function (a) {
    if (carried) {
      var hr0 = a.getAttribute('href'), ix = hr0.indexOf('#');
      a.setAttribute('href', base + '?c=' + encodeURIComponent(carried) + (ix > -1 ? hr0.slice(ix) : ''));
    } else if (base !== '/ch-dreux/') {
      a.setAttribute('href', a.getAttribute('href').replace('/ch-dreux/', base));
    }
    a.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (history.length > 1) return;
      e.preventDefault();
      var href = a.getAttribute('href');
      window.close();
      setTimeout(function () { location.href = href; }, 200);
    });
  });
})();

/* Lien direct vers une section (ex. /ch-dreux/metz/#s-video) : les images au-dessus se chargent en différé et
   décalent la page, ce qui fait « rater » la cible. On les charge d'emblée et on recale la page à mesure
   qu'elles arrivent, tant que le visiteur n'a pas lui-même fait défiler la page. */
(function () {
  var id = decodeURIComponent(location.hash.slice(1));
  var target = id && document.getElementById(id);
  if (!target) return;
  var moved = false, queued = false, t0 = Date.now();
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (ev) {
    window.addEventListener(ev, function () { moved = true; }, { passive: true });
  });
  function go() { queued = false; if (!moved && Date.now() - t0 < 8000) target.scrollIntoView({ block: 'start', behavior: 'instant' }); }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(go); } }
  Array.prototype.forEach.call(document.querySelectorAll('img'), function (i) {
    if (i.loading === 'lazy') i.loading = 'eager';
    if (!i.complete) i.addEventListener('load', queue);
  });
  go();
  window.addEventListener('load', function () { go(); setTimeout(go, 500); });
})();
