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
    if (m.type === 'embed') return m.embedUrl;   /* page publique intégrable (ex. Canva ?embed) */
    if (m.type === 'youtube') {
      return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(m.youtubeId) +
        '?autoplay=1&rel=0' + (m.list ? '&list=' + encodeURIComponent(m.list) : '');
    }
    return 'https://player.vimeo.com/video/' + encodeURIComponent(m.vimeoId) + '?autoplay=1&dnt=1';
  }

  function buildMedia(p) {
    var m = p.media || { type: 'placeholder' };
    var box = h('div', { class: 'media media--' + m.type });

    if (m.type === 'image') {
      if (!m.alt) console.warn('[ch-dreux] alt manquant pour : ' + p.title);
      box.setAttribute('data-fit', m.fit || 'cover');
      box.appendChild(h('img', { src: m.src, alt: m.alt || '', loading: 'lazy', decoding: 'async' }));

    } else if (m.type === 'youtube' || m.type === 'vimeo' || m.type === 'embed') {
      var what = m.type === 'embed' ? (m.noun || 'Lettre') : 'Vidéo';
      var btn = h('button', { type: 'button', class: 'play', 'aria-label': (m.type === 'embed' ? 'Lire : ' : 'Lire la vidéo : ') + p.title }, [
        m.poster ? h('img', { src: m.poster, alt: '', loading: 'lazy', decoding: 'async' }) : null,
        playIcon()
      ]);
      btn.addEventListener('click', function () {
        var frame = h('iframe', {
          src: embedUrl(m),
          title: what + ' : ' + p.title,
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
    var heading = fill(h('h3', { id: titleId }), p.title);
    if (p.page) {
      /* Lien étiré : toute la carte est cliquable, mais un seul lien est annoncé aux lecteurs d'écran. */
      var label = heading.textContent;
      heading.textContent = '';
      heading.appendChild(h('a', { class: 'card-title-link', href: p.page }, [label]));
    }
    var body = h('div', { class: 'card-body' }, [
      p.tag ? fill(h('p', { class: 'tag' }), p.tag) : null,
      heading,
      h('dl', { class: 'facts' }, [
        fact('Contexte', p.context),
        fact('Mon rôle', p.role),
        fact('Résultat', p.result)
      ]),
      p.page ? h('span', { class: 'card-more', 'aria-hidden': 'true', text: 'Voir le projet →' }) : null
    ]);
    if (p.link) {
      body.appendChild(h('a', { class: 'card-link', href: p.link.href, target: '_blank', rel: 'noopener noreferrer' }, [
        p.link.label, h('span', { class: 'sr-only', text: ' (nouvel onglet)' })
      ]));
    }
    return h('article', { class: 'card', 'aria-labelledby': titleId }, [buildMedia(p), body]);
  }

  /* ───────── défilement horizontal (une seule ligne par section) ───────── */
  function chevron(dir) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = doc.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var p = doc.createElementNS(ns, 'path');
    p.setAttribute('d', dir === 'prev' ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19');
    svg.appendChild(p);
    return svg;
  }

  function buildArrows(track, title) {
    var prev = h('button', { type: 'button', class: 'arrow', 'data-dir': '-1', 'aria-controls': track.id, 'aria-label': 'Projets précédents : ' + title }, [chevron('prev')]);
    var next = h('button', { type: 'button', class: 'arrow', 'data-dir': '1', 'aria-controls': track.id, 'aria-label': 'Projets suivants : ' + title }, [chevron('next')]);
    return h('div', { class: 'arrows' }, [
      h('span', { class: 'swipe-hint', 'aria-hidden': 'true' }, [
        h('span', { class: 'swipe-count' }), ' Faites défiler ', h('span', { class: 'swipe-arrow', text: '→' })
      ]),
      prev, next
    ]);
  }

  function wireTrack(track, arrows) {
    var buttons = arrows.querySelectorAll('.arrow');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      arrows.hidden = max <= 2;                       /* tout tient à l'écran : pas de flèches */
      buttons[0].disabled = track.scrollLeft <= 2;
      buttons[1].disabled = track.scrollLeft >= max - 2;
      track.classList.toggle('has-more', max > 2 && track.scrollLeft < max - 2);
      var cards = track.querySelectorAll('.card'), tl = track.getBoundingClientRect(), first = -1, last = -1;
      Array.prototype.forEach.call(cards, function (c, i) {
        var r = c.getBoundingClientRect();
        if (r.left >= tl.left - 4 && r.right <= tl.right + 4) { if (first < 0) first = i; last = i; }
      });
      var cnt = arrows.querySelector('.swipe-count');
      if (cnt && first >= 0) cnt.textContent = (first === last ? (first + 1) : (first + 1) + '–' + (last + 1)) + ' sur ' + cards.length + ' ·';
    }

    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () {
        var first = track.querySelector('.card');
        var step = first ? first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || 24) : track.clientWidth * 0.85;
        var visible = Math.max(1, Math.floor(track.clientWidth / step));
        track.scrollBy({ left: Number(b.getAttribute('data-dir')) * visible * step, behavior: reduce ? 'auto' : 'smooth' });
      });
    });

    /* Invite : à la première apparition, le carrousel avance un peu puis revient (désactivé si mouvement réduit). */
    if (!reduce && 'IntersectionObserver' in window) {
      var cancelled = false, nudged = false;
      ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(function (ev) {
        track.addEventListener(ev, function () { cancelled = true; }, { passive: true });
      });
      var io = new IntersectionObserver(function (es) {
        if (nudged || !es[0].isIntersecting) return;
        nudged = true; io.disconnect();
        setTimeout(function () {
          if (cancelled || track.scrollWidth - track.clientWidth <= 2 || track.scrollLeft > 2) return;
          var dist = Math.min(72, track.scrollWidth - track.clientWidth), t0 = null, dur = 1100;
          track.style.scrollSnapType = 'none';
          (function step(ts) {
            if (t0 === null) t0 = ts;
            var k = Math.min(1, (ts - t0) / dur);
            if (cancelled) { track.style.scrollSnapType = ''; return; }
            track.scrollLeft = dist * Math.sin(Math.PI * k);
            if (k < 1) requestAnimationFrame(step); else { track.scrollLeft = 0; track.style.scrollSnapType = ''; }
          })(performance.now());
        }, 500);
      }, { threshold: 0.6 });
      io.observe(track);
    }
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
    update();
  }

  /* ───────── rendu ───────── */
  var introEl = doc.getElementById('intro');
  var il = D.introLink;
  var at = il ? D.intro.indexOf(il.label) : -1;
  if (at > -1) {
    fill(introEl, D.intro.slice(0, at));
    introEl.appendChild(h('a', { href: il.href, target: '_blank', rel: 'noopener noreferrer' }, [
      il.label, h('span', { class: 'sr-only', text: ' (nouvel onglet)' })
    ]));
    fill(introEl, D.intro.slice(at + il.label.length));
  } else {
    fill(introEl, D.intro);
  }

  /* Boutons « Voir / Télécharger » (CV et lettre de motivation) */
  function docButtons() {
    function pair(file, viewLabel, dlLabel, viewHref) {
      if (!file) {
        return [viewLabel, dlLabel].map(function (t) {
          return h('button', { class: 'pbtn', type: 'button', disabled: true, title: 'Bientôt disponible', text: t });
        });
      }
      return [
        h('a', { class: 'pbtn pbtn--view', href: viewHref || file, target: '_blank', rel: 'noopener noreferrer', text: viewLabel }),
        h('a', { class: 'pbtn', href: file, download: true, text: dlLabel })
      ];
    }
    var box = h("div", { class: "hero-docs" });
    pair(D.downloads.cv, 'Voir mon CV', 'Télécharger mon CV', D.downloads.cvPage).concat(
      pair(D.downloads.letter, 'Voir ma lettre de motivation', 'Télécharger ma lettre de motivation')
    ).forEach(function (b) { box.appendChild(b); });
    return box;
  }

  /* Fiche d'identité (infos du CV) */
  var pr = D.profile, profileEl = doc.getElementById('profile');
  if (pr && profileEl) {
    var dl = h('dl', { class: 'profile-list' });
    pr.lines.forEach(function (l) {
      dl.appendChild(h('div', null, [
        h('dt', { text: l.label }),
        h('dd', null, [l.href ? h('a', { href: l.href, text: l.value }) : l.value])
      ]));
    });
    profileEl.appendChild(h('img', { class: 'profile-photo', src: pr.photo, alt: pr.alt, width: '520', height: '650', decoding: 'async' }));
    profileEl.appendChild(h('div', { class: 'profile-body' }, [
      h('p', { class: 'profile-name', text: pr.name }),
      h('p', { class: 'profile-role', text: pr.role }),
      dl
    ]));
    var heroText = doc.querySelector(".hero-text");
    if (heroText) {
      /* Bouton d'invite juste sous l'intro, avant le sommaire */
      var cue = h("a", { class: "scroll-cue", href: "#realisations" }, [
        "Découvrir mes réalisations ",
        h("span", { "aria-hidden": "true", text: "↓" })
      ]);
      var tocEl = heroText.querySelector("#toc");
      heroText.insertBefore(cue, tocEl);
      heroText.appendChild(docButtons());
    }
  } else if (profileEl) { profileEl.remove(); }

  var sectionsRoot = doc.getElementById('sections');
  var toc = h('ul');
  D.sections.forEach(function (s) {
    var items = D.projects.filter(function (p) { return p.section === s.id; });
    if (!items.length) return;
    var hid = 'sec-' + s.id;
    var track = h('div', { class: 'track', id: s.id + '-track', tabindex: '0', role: 'region', 'aria-label': s.title + ' : projets' });
    items.forEach(function (p, i) { track.appendChild(buildCard(p, s.id + '-' + (i + 1))); });
    var arrows = buildArrows(track, s.title);
    sectionsRoot.appendChild(h('section', { class: 'block', id: s.id, 'aria-labelledby': hid }, [
      h('div', { class: 'block-head' }, [
        h('div', null, [
          h('h2', { id: hid, text: s.title }),
          s.lead ? h('p', { class: 'lead', text: s.lead }) : null
        ]),
        arrows
      ]),
      track,
      s.all ? h('p', { class: 'section-all' }, [
        h('a', {
          href: 'https://jordan-join.fr/projets.html#' + s.all.anchor, target: '_blank', rel: 'noopener noreferrer',
          text: 'Retrouvez tous mes projets de la catégorie ' + s.all.label + ' →'
        })
      ]) : null
    ]));
    wireTrack(track, arrows);
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

  /* Les sections sont créées par le script : on rejoue le saut vers l'ancre (ex. retour depuis une page projet). */
  if (location.hash.length > 1) {
    var target = doc.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
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
