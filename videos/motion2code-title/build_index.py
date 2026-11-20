"""Writes index.html: the 'Mega Ratu & Kopi Ratu' title rebuilt as inline SVG + one GSAP timeline.

The letters are the source font's own glyph outlines (DejaVu Serif Bold, 112 px), converted to SVG paths,
so the page needs no web font. Positions use the same layout as the source: each letter drawn at the
pen position of the text before it, the line centred on the 1920x1080 stage.

Timing (measured from source.mp4 frame by frame, see README.md):
  letter i fades in linearly over 0.12 s from 0.4 + 0.15*i s; the cursor sits after the newest letter,
  then blinks on a 0.8 s cycle once typing is done.

Run from this folder:  python3 build_index.py
"""
import json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import ImageFont

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SIZE = 112
TEXT = "Mega Ratu & Kopi Ratu"
W, H = 1920, 1080

pil = ImageFont.truetype(FONT, SIZE)
asc, desc = pil.getmetrics()
x0 = (W - pil.getlength(TEXT)) / 2
y0 = (H - (asc + desc)) / 2
baseline = y0 + asc
xs = [x0 + pil.getlength(TEXT[:i]) for i in range(len(TEXT))]
# Cursor x after k letters (k = 0..len): the pen position after the k-th letter.
cursor_x = [x0] + [xs[k - 1] + pil.getlength(TEXT[k - 1]) for k in range(1, len(TEXT) + 1)]

tt = TTFont(FONT)
cmap = tt.getBestCmap()
gs = tt.getGlyphSet()
upem = tt["head"].unitsPerEm
s = SIZE / upem

letters = []
for i, ch in enumerate(TEXT):
    if ch == " ":
        continue
    pen = SVGPathPen(gs)
    gs[cmap[ord(ch)]].draw(pen)
    letters.append(
        f'    <path id="l{i:02d}" class="letter" data-i="{i}" data-char="{ch}" '
        f'transform="translate({xs[i]:.3f} {baseline:.3f}) scale({s:.6f} {-s:.6f})" '
        f'fill="{ "#D39F44" if ch == "&" else "#F3E5CC" }" opacity="0" d="{pen.getCommands()}"/>'  # sampled colours
    )

html = open("index.template.html", encoding="utf-8").read()
html = html.replace("<!--LETTERS-->", "\n".join(letters))
html = html.replace("/*CURSOR_X*/", json.dumps([round(x, 3) for x in cursor_x]))
html = html.replace("/*CURSOR_Y*/", f"{int(y0 + 20)}")  # the source draws it on whole pixels
html = html.replace("/*CURSOR_H*/", f"{asc + desc - 29}")
html = html.replace("/*COUNT*/", str(len(TEXT)))
open("index.html", "w", encoding="utf-8").write(html)
print(f"index.html: {len(letters)} glyphs, x0={x0:.2f}, baseline={baseline:.2f}, cursor y={y0 + 20:.1f}")
