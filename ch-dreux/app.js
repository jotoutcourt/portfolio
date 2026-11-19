/* Rendu de la page /ch-dreux à partir de data.js. Pas de dépendance, aucun appel tiers avant un clic sur une vidéo. */
(function () {
  'use strict';

  var D = window.CH_DREUX;
  if (!D) return;

  var doc = document;
  var isDraft = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) || /[?&]brouillon\b/.test(location.search);
  if (isDraft) doc.documentElement.classList.add('is-draft');

  /* ───────── utilitaires DOM ───────── */
  function h(tag, props, kids) {
    var n = doc.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v === false || v == null) return;
        if (k === 'class') n.className = v;
        else if (k === 'text') n.textContent = v;
        else n.setAttribute(k, v === true ? '' : v);
      });
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? doc.createTextNode(c) : c); });
    return n;
  }

  /* Remplit un nœud avec du texte en isolant les [PLACEHOLDERS] pour pouvoir les surligner. */
  function fill(node, str) {
    String(str == null ? '' : str).split(/(\[[^\]]+\])/).forEach(function (part) {
      if (!part) return;
      if (/^\[[^\]]+\]$/.test(part)) node.appendChild(h('span', { class: 'ph', text: part }));
      else node.appendChild(doc.createTextNode(part));
    });
    return node;
  }

  function slug(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  /* ───────── médias (chargement différé) ───────── */
  function playIcon() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = doc.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', 'play-icon');
    var c = doc.createElementNS(ns, 'circle');
    c.setAttribute('cx', '32'); c.setAttribute('cy', '32'); c.setAttribute('r', '30');
    var p = doc.createElementNS(ns, 'path');
    p.setAttribute('d', 'M26 20 L46 32 L26 44 Z');
    svg.appendChild(c); svg.appendChild(p);
    return svg;
  }

  function embedUrl(m) {
    if (m.type === 'youtube') {
      return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(m.youtubeId) +
        '?autoplay=1&rel=0' + (m.list ? '&list=' + encodeURIComponent(m.list) : '');
    }
    return 'https://player.vimeo.com/video/' + encodeURIComponent(m.vimeoId) + '?autoplay=1&dnt=1';
  }

  function buildMedia(p) {
    var m = p.media || { type: 'placeholder' };
    var box = h('div', { class: 'media media--' + m.type });
    if (m.ratio) box.style.aspectRatio = m.ratio;

    if (m.type === 'image') {
      if (!m.alt) console.warn('[ch-dreux] alt manquant pour : ' + p.title);
      box.setAttribute('data-fit', m.fit || 'cover');
      box.appendChild(h('img', { src: m.src, alt: m.alt || '', loading: 'lazy', decoding: 'async' }));

    } else if (m.type === 'youtube' || m.type === 'vimeo') {
      var btn = h('button', { type: 'button', class: 'play', 'aria-label': 'Lire la vidéo : ' + p.title }, [
        m.poster ? h('img', { src: m.poster, alt: '', loading: 'lazy', decoding: 'async' }) : null,
        playIcon()
      ]);
      btn.addEventListener('click', function () {
        var frame = h('iframe', {
          src: embedUrl(m),
          title: 'Vidéo : ' + p.title,
          allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen',
          allowfullscreen: true,
          referrerpolicy: 'strict-origin-when-cross-origin'
        });
        box.replaceChildren(frame);
        frame.focus();
      });
      box.appendChild(btn);

    } else if (m.type === 'video') {
      var v = h('video', { controls: true, preload: 'none', playsinline: true, poster: m.poster, 'aria-label': 'Vidéo : ' + p.title }, [
        h('source', { src: m.src, type: 'video/mp4' }),
        'Votre navigateur ne peut pas lire cette vidéo.'
      ]);
      box.appendChild(v);

    } else {
      box.setAttribute('role', 'img');
      box.setAttribute('aria-label', 'Visuel à ajouter');
      box.appendChild(fill(h('p', { class: 'media-ph' }), m.label || '[VISUEL À AJOUTER]'));
    }
    return box;
  }

  /* ───────── cartes ───────── */
  function fact(label, value) {
    return h('div', { class: 'fact' }, [
      h('dt', { text: label }),
      fill(h('dd'), value)
    ]);
  }

  function buildCard(p, id) {
    var titleId = id + '-t';
    var body = h('div', { class: 'card-body' }, [
      p.tag ? fill(h('p', { class: 'tag' }), p.tag) : null,
      fill(h('h3', { id: titleId }), p.title),
      h('dl', { class: 'facts' }, [
        fact('Contexte', p.context),
        fact('Mon rôle', p.role),
        fact('Résultat', p.result)
      ])
    ]);
    if (p.link) {
      body.appendChild(h('a', { class: 'card-link', href: p.link.href, target: '_blank', rel: 'noopener noreferrer' }, [
        p.link.label, h('span', { class: 'sr-only', text: ' (nouvel onglet)' })
      ]));
    }
    return h('article', { class: 'card', 'aria-labelledby': titleId }, [buildMedia(p), body]);
  }

  /* ───────── rendu ───────── */
  fill(doc.getElementById('intro'), D.intro);

  var sectionsRoot = doc.getElementById('sections');
  var toc = h('ul');
  D.sections.forEach(function (s) {
    var items = D.projects.filter(function (p) { return p.section === s.id; });
    if (!items.length) return;
    var hid = 'sec-' + s.id;
    var grid = h('div', { class: 'grid' });
    items.forEach(function (p, i) { grid.appendChild(buildCard(p, s.id + '-' + (i + 1))); });
    sectionsRoot.appendChild(h('section', { class: 'block', id: s.id, 'aria-labelledby': hid }, [
      h('h2', { id: hid, text: s.title }),
      s.lead ? h('p', { class: 'lead', text: s.lead }) : null,
      grid
    ]));
    toc.appendChild(h('li', null, [h('a', { href: '#' + s.id, text: s.title })]));
  });
  toc.appendChild(h('li', null, [h('a', { href: '#presse', text: D.press.title })]));
  toc.appendChild(h('li', null, [h('a', { href: '#contact', text: 'Contact' })]));
  doc.getElementById('toc').appendChild(toc);

  /* Relations presse */
  doc.getElementById('presse-title').textContent = D.press.title;
  fill(doc.getElementById('press-text'), D.press.text);
  var pl = doc.getElementById('press-list');
  (D.press.items || []).forEach(function (it) {
    var inner = it.href
      ? h('a', { href: it.href, target: '_blank', rel: 'noopener noreferrer', text: it.title })
      : fill(h('span'), it.title);
    pl.appendChild(h('li', null, [inner, it.note ? h('span', { class: 'note', text: ' — ' + it.note }) : null]));
  });
  if (!pl.children.length) pl.remove();

  /* Contact + téléchargements */
  var c = D.contact;
  doc.getElementById('contact-lines').appendChild(h('p', null, [
    h('strong', { text: c.name }), h('br'),
    h('a', { href: 'mailto:' + c.email, text: c.email }), h('br'),
    h('a', { href: 'tel:+33' + c.phone.replace(/\s+/g, '').replace(/^0/, ''), text: c.phone })
  ]));

  var dl = doc.getElementById('downloads');
  dl.appendChild(h('a', { class: 'btn', href: D.downloads.cv, download: true, text: 'Télécharger mon CV (PDF)' }));
  var portfolioMissing = !D.downloads.portfolio;
  if (portfolioMissing) {
    dl.appendChild(h('button', { class: 'btn btn--ghost', type: 'button', disabled: true, text: 'Télécharger le portfolio (PDF) — bientôt disponible' }));
  } else {
    dl.appendChild(h('a', { class: 'btn btn--ghost', href: D.downloads.portfolio, download: true, text: 'Télécharger le portfolio (PDF)' }));
  }

  /* Bandeau brouillon : uniquement en local ou avec ?brouillon (jamais visible par défaut en ligne) */
  if (isDraft) {
    var n = doc.querySelectorAll('.ph').length + (portfolioMissing ? 1 : 0);
    var bar = h('div', { class: 'draft-bar', role: 'status' }, [
      'Mode brouillon (visible en local ou avec ?brouillon) — ' + n + ' élément' + (n > 1 ? 's' : '') + ' à compléter dans data.js'
    ]);
    doc.body.insertBefore(bar, doc.body.firstChild);
  }
})();
