#!/bin/bash
# Prépare des versions légères des visuels pour le PDF (sinon le PDF dépasse 150 Mo).
# Usage (depuis la racine du site) : bash portfolio-pdf/optimize.sh
# - images sans transparence : JPEG q85, côté long max 1100 px (700 px pour les grilles de posts)
# - images avec transparence : PNG, côté long max 900 px
# Écrit portfolio-pdf/img/opt/<nom> et portfolio-pdf/img/opt/map.js (correspondance chemin d'origine -> chemin allégé).
set -e
OUT=portfolio-pdf/img/opt; mkdir -p "$OUT"
LIST=$(cat <<'L'
/ch-dreux/jordan.jpg
/assets/tenofort-affiche-trail.jpg /assets/vogalib-affiche.jpg /assets/metz-lumieres-1.webp /assets/pandoviolet.png /assets/grs6.png /portfolio-pdf/img/real/labrha-site-01.jpg
/assets/tenofort.png /assets/tenofort-affiche-tennis.jpg /assets/tenofort-affiche-natation.jpg /assets/tenofort-affiche-boxe.jpg /assets/mockteno.png
/assets/gingembre.png /assets/prele.png /assets/spiru.png /assets/ginseng.png /assets/flyertenorecto.png /assets/flyertenoverso.png /assets/teno.png
/assets/cuivrarecto.png /assets/cuivraverso.png /assets/cuivra.png.png /assets/cuivramock.png /assets/pandora.png /assets/pandobleu.png /assets/pandorose.png
/assets/pandobat.png /assets/pandonotice1.png /assets/pandonotice2.png /assets/pandoblister.png /assets/pandophoto1.png /assets/pandophoto2.png /assets/pandophoto3.png /assets/pandophoto4.png
/assets/vasculogocolor.png /assets/vasculogowhite.png /assets/vasculogoblack.png /assets/vasculivretface.png /assets/vasculivretgauche.png /assets/vasculivretdroit.png
/assets/vascublouse.png /assets/vascuphoto1.png /assets/vascuphoto2.png /assets/vogalib-affiche-abribus.jpg /assets/metzm.png /assets/metzville1.png /assets/metzville2.png
/assets/metzmood.png /assets/metzg.png /assets/metzg2.jpg /assets/metza1.png /assets/Metza2.png /assets/metz-lumieres-2.webp /assets/metz-lumieres-3.webp /assets/metz-lumieres-4.webp
/portfolio-pdf/img/f3df-3d.jpg /portfolio-pdf/img/metz-film.jpg /portfolio-pdf/img/salons-labrha.jpg
/portfolio-pdf/img/real/labrha-site-02.jpg /portfolio-pdf/img/real/labrha-site-03.jpg /portfolio-pdf/img/real/labrha-site-04.jpg /portfolio-pdf/img/real/labrha-site-05.jpg
/portfolio-pdf/img/real/labrha-site-06.jpg /portfolio-pdf/img/real/labrha-site-07.jpg /portfolio-pdf/img/real/labrha-site-08.jpg /portfolio-pdf/img/real/vasculyon-site-01.jpg /portfolio-pdf/img/real/vasculyon-site-02.jpg
/assets/intergraille1.png /assets/intergraille2.png /assets/intergraille3.png /assets/glv1.png /assets/grailleressort1.png /assets/clem1.png /assets/grailleuni.png /assets/avecamour1.png
/assets/gang1.png /assets/dontmess1.png /assets/contrastegraille.png /assets/coursepoursuite.png /assets/pelo2.png /assets/grs20.png /assets/grs24.png /assets/gourdegraille.jpg /assets/piment.png
/assets/graillesquad1.png /assets/collantgraille1.png /assets/collantgraille2.png /assets/collantgraille3.png /assets/newecole1.png /assets/newecole2.png /assets/newecole3.png
/assets/menu1.png /assets/menu2.png /assets/fidelite.jpg /assets/grs1.png /assets/grs2.png /assets/grs3.png /assets/grs5.png /assets/grs8.png /assets/grs9.png /assets/grs15.png /assets/grs16.png /assets/grs17.png /assets/grs19.png /assets/grs25.png /assets/grs26.png
/ch-dreux/posters/lettre-labrha-1.jpg /ch-dreux/posters/lettre-labrha-2.jpg /ch-dreux/posters/formation-cyber.jpg /ch-dreux/posters/formation-photo-1755.jpg
L
)
for i in $(seq 1 34); do LIST="$LIST /assets/labrhars$i.png"; done
for i in $(seq 1 35); do LIST="$LIST /assets/f3dfrs$i.png"; done
echo "window.IMG_MAP = {" > "$OUT/map.js"
for p in $LIST; do
  f=".$p"; [ -f "$f" ] || { echo "manquant : $f" >&2; continue; }
  b=$(basename "$f"); b="${b%.*}"
  # transparence réelle ? (canal alpha dont le minimum est < 250)
  fmt=$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of csv=p=0 "$f"); HASA=0
  case "$fmt" in rgba|ya8|argb|bgra|ya16le|rgba64be|pal8)
    m=$(ffmpeg -v info -i "$f" -vf "alphaextract,signalstats,metadata=print:key=lavfi.signalstats.YMIN" -f null - 2>&1 | grep -o "YMIN=[0-9.]*" | head -1 | cut -d= -f2)
    awk -v m="${m:-255}" 'BEGIN{ exit !(m < 250) }' && HASA=1 ;; esac
  MAXJ=1000; MAXA=800
  case "$b" in f3dfrs*|labrhars*|grs*) MAXJ=700; MAXA=700;; esac
  if [ "$HASA" = 1 ]; then
    ffmpeg -v error -y -i "$f" -vf "scale='min($MAXA,iw)':'min($MAXA,ih)':force_original_aspect_ratio=decrease" -frames:v 1 -update 1 "$OUT/$b.png"; ext=png
  else
    ffmpeg -v error -y -i "$f" -vf "scale='min($MAXJ,iw)':'min($MAXJ,ih)':force_original_aspect_ratio=decrease" -frames:v 1 -update 1 -q:v 6 "$OUT/$b.jpg"; ext=jpg
  fi
echo "  \"$p\": \"/portfolio-pdf/img/opt/$b.$ext\"," >> "$OUT/map.js"
done
echo "};" >> "$OUT/map.js"
du -sh "$OUT"
