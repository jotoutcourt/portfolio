/* Réglage d'une candidature, porté par l'adresse : /ch-dreux/?c=<réglage>
 * Le réglage est un petit objet JSON, compressé puis encodé en base64 « URL-safe ». Rien n'est stocké côté serveur :
 * le lien contient tout. Il est produit par la page /candidature-admin/ et lu ici, côté visiteur.
 *
 * Deux formats sont lus :
 *   - « ~… »  : JSON compressé (deflate) puis base64url   → liens courts (format actuel)
 *   - « eyJ… » : JSON en base64url, sans compression       → anciens liens (toujours valides)
 *
 * Forme du JSON (tous les champs sont facultatifs) :
 *   { v:1, job:'Intitulé du poste', org:'Organisme', intro:'Texte d'intro',
 *     p:['id-projet', …]       // projets affichés, dans l'ordre (ids de data.js) ; absent = tous
 *     s:['print','video', …]   // ordre des catégories ; absent = ordre d'origine
 *     press:{ text:'…' }       // bloc relations presse (absent = masqué ; sans text = texte d'origine)
 *     letter:{ date, post, hello, paras:['…'], closing }   // lettre de motivation (absente = boutons masqués)
 *   }
 */
(function () {
  /* ───── base64url ⇄ octets ───── */
  function bytesToB64(bytes) {
    var bin = '';
    for (var i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64ToBytes(b) {
    b = String(b).replace(/-/g, '+').replace(/_/g, '/');
    while (b.length % 4) b += '=';
    var bin = atob(b), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  /* ───── décompression « deflate » brute, synchrone (lecture des liens) ───── */
  var LBASE = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
  var LEXT  = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
  var DBASE = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
  var DEXT  = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
  var CLORD = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];

  function huff(lengths, n) {                  /* table canonique : nombre de codes par longueur + symboles triés */
    var count = new Array(16), offs = new Array(16), symbol = new Array(n), i;
    for (i = 0; i < 16; i++) count[i] = 0;
    for (i = 0; i < n; i++) count[lengths[i]]++;
    count[0] = 0; offs[1] = 0;
    for (i = 1; i < 15; i++) offs[i + 1] = offs[i] + count[i];
    for (i = 0; i < n; i++) if (lengths[i]) symbol[offs[lengths[i]]++] = i;
    return { count: count, symbol: symbol };
  }
  function inflate(data) {
    var pos = 0, bitbuf = 0, bitcnt = 0, out = [];
    function bits(need) {
      var val = bitbuf;
      while (bitcnt < need) {
        if (pos >= data.length) throw new Error('fin de données');
        val |= data[pos++] << bitcnt; bitcnt += 8;
      }
      bitbuf = val >>> need; bitcnt -= need;
      return val & ((1 << need) - 1);
    }
    function decode(h) {
      var code = 0, first = 0, index = 0, len, c;
      for (len = 1; len <= 15; len++) {
        code |= bits(1); c = h.count[len];
        if (code - c < first) return h.symbol[index + (code - first)];
        index += c; first += c; first <<= 1; code <<= 1;
      }
      throw new Error('code invalide');
    }
    function codes(lh, dh) {
      for (;;) {
        var sym = decode(lh), len, dist, i;
        if (sym < 256) out.push(sym);
        else if (sym === 256) return;
        else {
          sym -= 257; if (sym >= 29) throw new Error('longueur invalide');
          len = LBASE[sym] + bits(LEXT[sym]);
          sym = decode(dh); dist = DBASE[sym] + bits(DEXT[sym]);
          if (dist > out.length) throw new Error('distance invalide');
          for (i = 0; i < len; i++) out.push(out[out.length - dist]);
        }
      }
    }
    var fixedL, fixedD, last, type, i;
    do {
      last = bits(1); type = bits(2);
      if (type === 0) {
        bitbuf = 0; bitcnt = 0;
        var len = data[pos] | (data[pos + 1] << 8); pos += 4;
        for (i = 0; i < len; i++) out.push(data[pos++]);
      } else if (type === 1) {
        if (!fixedL) {
          var l = [];
          for (i = 0; i < 144; i++) l[i] = 8; for (; i < 256; i++) l[i] = 9; for (; i < 280; i++) l[i] = 7; for (; i < 288; i++) l[i] = 8;
          fixedL = huff(l, 288);
          var d = []; for (i = 0; i < 30; i++) d[i] = 5; fixedD = huff(d, 30);
        }
        codes(fixedL, fixedD);
      } else if (type === 2) {
        var nlen = bits(5) + 257, ndist = bits(5) + 1, ncode = bits(4) + 4, lengths = [], idx = 0;
        for (i = 0; i < 19; i++) lengths[i] = 0;
        for (i = 0; i < ncode; i++) lengths[CLORD[i]] = bits(3);
        var clh = huff(lengths, 19); lengths = [];
        while (idx < nlen + ndist) {
          var sym = decode(clh), prev = 0, rep;
          if (sym < 16) lengths[idx++] = sym;
          else {
            if (sym === 16) { prev = lengths[idx - 1]; rep = 3 + bits(2); }
            else if (sym === 17) rep = 3 + bits(3);
            else rep = 11 + bits(7);
            while (rep--) lengths[idx++] = prev;
          }
        }
        codes(huff(lengths.slice(0, nlen), nlen), huff(lengths.slice(nlen), ndist));
      } else throw new Error('bloc invalide');
    } while (!last);
    return new Uint8Array(out);
  }

  /* ───── encodage / décodage du réglage ───── */
  function toLegacy(obj) { return bytesToB64(new TextEncoder().encode(JSON.stringify(obj))); }
  /* Encodage compressé (asynchrone : utilisé par la page d'administration). Repli : ancien format. */
  function encodeAsync(obj) {
    var bytes = new TextEncoder().encode(JSON.stringify(obj)), legacy = bytesToB64(bytes);
    if (typeof CompressionStream === 'undefined') return Promise.resolve(legacy);
    var cs = new CompressionStream('deflate-raw'), w = cs.writable.getWriter();
    w.write(bytes); w.close();
    return new Response(cs.readable).arrayBuffer().then(function (buf) {
      var packed = '~' + bytesToB64(new Uint8Array(buf));
      return packed.length < legacy.length ? packed : legacy;
    }, function () { return legacy; });
  }
  function decode(raw) {
    try {
      raw = String(raw);
      var bytes = raw.charAt(0) === '~' ? inflate(b64ToBytes(raw.slice(1))) : b64ToBytes(raw);
      var o = JSON.parse(new TextDecoder().decode(bytes));
      return o && typeof o === 'object' ? o : null;
    } catch (e) { return null; }
  }

  /* Lien court : une page /c/<nom>/ peut porter son réglage dans window.CH_PRESET (voir snippets/candidature-lien-court.md) */
  var m = /[?&]c=([^&#]+)/.exec(location.search), raw = m ? decodeURIComponent(m[1]) : (window.CH_PRESET || '');
  var store = { get: function () { try { return localStorage.getItem('chCfgLast') || ''; } catch (e) { return ''; } },
                set: function (v) { try { v ? localStorage.setItem('chCfgLast', v) : localStorage.removeItem('chCfgLast'); } catch (e) {} } };

  window.CH_CFG = {
    raw: raw,                          /* réglage brut de l'adresse (vide = candidature par défaut) */
    cfg: raw ? decode(raw) : null,     /* réglage décodé, ou null */
    encode: toLegacy,                  /* synchrone, ancien format (non compressé) */
    encodeAsync: encodeAsync,          /* compressé (préféré) */
    decode: decode,
    store: store,
    /* Réglage à reporter sur les liens internes : celui de l'adresse, sinon le dernier vu sur cet appareil. */
    carry: function () { return raw || store.get(); }
  };
})();
