#!/usr/bin/env bash
# Side-by-side: original (time-compressed to 17 s so cuts line up) | rebuild, with shot labels.
# usage: bash tools/compare.sh /path/to/original.mp4 [cenanga|putik]
set -euo pipefail
ORIG="$1"; NAME="${2:-cenanga}"; REB=out/${NAME}_17s.mp4; SBS=out/${NAME}_side_by_side.mp4; STILLS=out/${NAME}_same_moment_stills.jpg; export SBS STILLS;
LABEL=$(python3 -c "import sys;print({'cenanga':'JRM Cenanga','putik':'JRM Putik Telaga Dara'}.get(sys.argv[1],sys.argv[1]))" "$NAME"); FB=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$ORIG")
LABELS=$(python3 - <<PY
cuts=[0,42,78,116,201,236,267,296,316,383,418,477,510]
print(','.join(f"drawtext=fontfile=$FB:text='SHOT {i+1}':fontsize=30:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=10:x=(w-tw)/2:y=h-60:enable='between(t,{cuts[i]/30:.3f},{cuts[i+1]/30-0.001:.3f})'" for i in range(12)))
PY
)
SPEED=$(python3 -c "print(round($D/17,2))")
ffmpeg -y -loglevel error -i "$ORIG" -i "$REB" -filter_complex "\
[0:v]setpts=PTS*17/$D,fps=30,scale=720:1280,setsar=1[o];[1:v]scale=720:1280,setsar=1[r];\
[o][r]hstack=inputs=2,pad=1440:1360:0:80:color=0x10241a[s];\
[s]drawtext=fontfile=$FB:text='ORIGINAL  (sped up ${SPEED}x to 17 s)':fontsize=30:fontcolor=white:x=(720-tw)/2:y=26,\
drawtext=fontfile=$FB:text='REBUILD  -  $LABEL, 17 s':fontsize=30:fontcolor=0xbfe6a0:x=720+(720-tw)/2:y=26,$LABELS[v]" \
  -map "[v]" -map 1:a -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -c:a aac -b:a 160k -t 17 -movflags +faststart "$SBS"
python3 - <<'PY'
import cv2
from PIL import Image, ImageDraw, ImageFont
cuts=[0,42,78,116,201,236,267,296,316,383,418,477,510]
import os
cap=cv2.VideoCapture(os.environ['SBS']); W,H,pad=220,391,6
sheet=Image.new('RGB',(6*(2*W+pad)+pad,2*(H+40)+pad),(16,36,26)); d=ImageDraw.Draw(sheet)
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18)
for i in range(12):
    cap.set(cv2.CAP_PROP_POS_FRAMES,(cuts[i]+cuts[i+1])//2+(6 if i==1 else 0)); ok,f=cap.read()
    im=Image.fromarray(cv2.cvtColor(f,cv2.COLOR_BGR2RGB)); x=pad+(i%6)*(2*W+pad); y=pad+(i//6)*(H+40)
    d.text((x+4,y+6),f'SHOT {i+1}  {cuts[i]/30:.1f}-{cuts[i+1]/30:.1f}s',fill='white',font=font)
    sheet.paste(im.crop((0,80,720,1360)).resize((W,H)),(x,y+34)); sheet.paste(im.crop((720,80,1440,1360)).resize((W,H)),(x+W,y+34))
sheet.save(os.environ['STILLS'],quality=88)
PY
echo "wrote $SBS $STILLS"
