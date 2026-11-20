/* Réglage d'une candidature, porté par l'adresse : /ch-dreux/?c=<réglage>
 * Le réglage est un petit objet JSON encodé en base64 « URL-safe ». Rien n'est stocké côté serveur :
 * le lien contient tout. Il est produit par la page /candidature-admin/ et lu ici, côté visiteur.
 *
 * Forme (tous les champs sont facultatifs) :
 *   { v:1, job:'Intitulé du poste', org:'Organisme', intro:'Texte d'intro',
 *     p:['id-projet', …]       // projets affichés, dans l'ordre (ids de data.js)
 *     s:['print','video', …]   // ordre des catégories
 *     press:{ text:'…' }       // bloc relations presse (absent = masqué)
 *     letter:{ date, post, hello, paras:['…'], closing }   // lettre de motivation (absente = boutons masqués)
 *   }
 */
(function () {
  function toB64(s) {
    var bytes = new TextEncoder().encode(s), bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function fromB64(b) {
    b = String(b).replace(/-/g, '+').replace(/_/g, '/');
    while (b.length % 4) b += '=';
    var bin = atob(b), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  function encode(obj) { return toB64(JSON.stringify(obj)); }
  function decode(raw) { try { var o = JSON.parse(fromB64(raw)); return o && typeof o === 'object' ? o : null; } catch (e) { return null; } }

  var m = /[?&]c=([^&#]+)/.exec(location.search), raw = m ? decodeURIComponent(m[1]) : '';
  var store = { get: function () { try { return localStorage.getItem('chCfgLast') || ''; } catch (e) { return ''; } },
                set: function (v) { try { v ? localStorage.setItem('chCfgLast', v) : localStorage.removeItem('chCfgLast'); } catch (e) {} } };

  window.CH_CFG = {
    raw: raw,                          /* réglage brut de l'adresse (vide = candidature par défaut) */
    cfg: raw ? decode(raw) : null,     /* réglage décodé, ou null */
    encode: encode,
    decode: decode,
    store: store,
    /* Réglage à reporter sur les liens internes : celui de l'adresse, sinon le dernier vu sur cet appareil. */
    carry: function () { return raw || store.get(); }
  };
})();
