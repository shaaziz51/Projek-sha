import subprocess, sys
from PIL import Image, ImageDraw, ImageFont

W, H, FPS, DUR = 1920, 1080, 30, 5
TEXT = "Mega Ratu & Kopi Ratu"
OUT = sys.argv[1]
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 112)

BG = (28, 18, 12)        # dark coffee
FG = (245, 230, 205)     # cream
ACCENT = (212, 160, 70)  # gold for "&"

# Fixed layout: position each letter where it sits in the full line, so text never shifts.
full_w = font.getlength(TEXT)
asc, desc = font.getmetrics()
x0 = (W - full_w) / 2
y0 = (H - (asc + desc)) / 2
xs = [x0 + font.getlength(TEXT[:i]) for i in range(len(TEXT))]

start, step, fade = 0.4, 0.15, 0.12   # typing ends ~3.6s, then holds
total = FPS * DUR
ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
    "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p",
    "-crf", "18", "-movflags", "+faststart", OUT], stdin=subprocess.PIPE)

def mix(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

for f in range(total):
    t = f / FPS
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    shown = 0
    for i, ch in enumerate(TEXT):
        a = (t - (start + i * step)) / fade
        if a <= 0: break
        shown = i + 1
        col = ACCENT if ch == "&" else FG
        d.text((xs[i], y0), ch, font=font, fill=mix(BG, col, min(a, 1.0)))
    # blinking cursor right after the last visible letter
    if int(t * 2.5) % 2 == 0 or shown < len(TEXT):
        cx = (xs[shown - 1] + font.getlength(TEXT[shown - 1])) if shown else x0
        d.rectangle([cx + 10, y0 + 20, cx + 18, y0 + asc + desc - 10], fill=ACCENT)
    ff.stdin.write(img.tobytes())
ff.stdin.close(); ff.wait()
