/* Les pages projet s'ouvrent dans un nouvel onglet depuis /ch-dreux.
   Le lien « Retour » referme alors cet onglet (ce qui ramène sur la candidature) ;
   si le navigateur refuse de le fermer (page ouverte directement), il garde son comportement normal. */
(function () {
  var links = document.querySelectorAll('a[href="/ch-dreux/"], a[href^="/ch-dreux/#"]');
  Array.prototype.forEach.call(links, function (a) {
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
