"""Build the Kopi Ratu 3D model inputs from the product photo.

Writes:
  public/textures/kopi-pouch-front.png   big pouch front, straightened, with the corner the sachets hide rebuilt
  public/textures/kopi-pouch-back.png    plain back: cream top, orange base
  public/textures/kopi-sachet-front.png  sachet front (both sachets share the same artwork)
  src/kopiRatuProfile.js                 sizes and placement in photo pixels

Run from the repository root:  python3 tools/extract_kopi_ratu.py
"""
import json
import numpy as np
from PIL import Image

SRC = "source/kopi-ratu-photo.jpg"
img = Image.open(SRC).convert("RGB")
px = np.array(img).astype(np.int32)

# --- Measurements in the photo (pixels) ---
POUCH = {"tl": (74, 44), "tr": (829, 46), "br": (742, 933), "bl": (124, 934)}
FRONT_SACHET = (555, 643, 840, 1047)   # x0, y0, x1, y1 (fully visible)
BACK_SACHET = (690, 563, 982, 971)     # partly hidden behind the front sachet
PANEL_BOTTOM = 830                     # white label panel bottom
FRAME_Y = 806                          # bottom of the thin dark-red frame inside the panel
# The pouch is shot from slightly above, so its right-hand verticals lean in toward the bottom.
LEAN = -0.064                          # px of x per px of y near the panel's right edge
def panel_right(y): return 677 + LEAN * (y - 575)
def frame_x(y): return 668 + LEAN * (y - 520)
ORANGE_FROM = 576                      # where the orange base starts beside the panel

# --- Rebuild the part of the pouch the sachets cover ---
pouch = px.copy()
H, W = px.shape[:2]
yy, xx = np.mgrid[0:H, 0:W]
hidden = ((xx >= FRONT_SACHET[0]) & (yy >= FRONT_SACHET[1])) | ((xx >= BACK_SACHET[0]) & (yy >= BACK_SACHET[1]))

cream_panel = np.array([243, 234, 229])
cream_pouch = np.array([234, 224, 214])
frame_red = np.array([112, 34, 36])
# Orange base: take each row's colour from the visible left side, so the shading matches.
orange_by_row = {}
raw = []
for y in range(ORANGE_FROM, H):
    strip = px[y, 132:182]
    raw.append(np.median(strip, axis=0) if strip[:, 0].mean() > 150 else np.array([205, 100, 5]))
raw = np.array(raw, float)
k = 25  # smooth down the column so the bean outlines on the left do not print as streaks
smooth = np.array([raw[max(0, i - k):i + k + 1].mean(axis=0) for i in range(len(raw))])
for i, y in enumerate(range(ORANGE_FROM, H)):
    orange_by_row[y] = smooth[i]

ys, xs = np.where(hidden)
for y, x in zip(ys, xs):
    if x < panel_right(y) and y < PANEL_BOTTOM:
        fx = frame_x(y)
        on_frame = (fx - 1 <= x <= fx + 1 and 455 <= y <= FRAME_Y + 1) or (
            FRAME_Y - 1 <= y <= FRAME_Y + 1 and x <= fx + 1)
        pouch[y, x] = frame_red if on_frame else cream_panel
    elif y >= ORANGE_FROM:
        pouch[y, x] = orange_by_row[y]
    else:
        pouch[y, x] = cream_pouch


def perspective_coeffs(dst, src):
    """Coefficients for PIL's PERSPECTIVE transform mapping output points `dst` to input points `src`."""
    A, b = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return np.linalg.solve(np.array(A, float), np.array(b, float)).tolist()


TW, TH = 1024, 1200
src = [POUCH["tl"], POUCH["tr"], POUCH["br"], POUCH["bl"]]
dst = [(0, 0), (TW, 0), (TW, TH), (0, TH)]
front = Image.fromarray(pouch.astype(np.uint8)).transform(
    (TW, TH), Image.PERSPECTIVE, perspective_coeffs(dst, src), Image.BICUBIC)
def with_cutout(im):
    """Photo background (near black) becomes transparent: rounded corners, serrated seals."""
    a = np.array(im.convert("RGB")).astype(np.int32)
    alpha = np.clip((a.max(axis=2) - 35) * 12, 0, 255).astype(np.uint8)
    return Image.fromarray(np.dstack([a.astype(np.uint8), alpha]), "RGBA")


front_rgba = with_cutout(front)
front_rgba.save("public/textures/kopi-pouch-front.png")
corner_alpha = np.array(front_rgba)[:, :, 3]

# Back: cream above the orange base, same proportions as the front.
orange_v = (ORANGE_FROM - POUCH["tl"][1]) / (POUCH["bl"][1] - POUCH["tl"][1])
back = np.zeros((TH, TW, 3), np.uint8)
back[:] = cream_pouch
for y in range(int(orange_v * TH), TH):
    py = int(ORANGE_FROM + (y - orange_v * TH) / TH * (POUCH["bl"][1] - POUCH["tl"][1]))
    back[y] = orange_by_row.get(min(py, H - 1), np.array([205, 100, 5]))
# Same outline as the front, mirrored because the back is seen from behind.
Image.fromarray(np.dstack([back, corner_alpha[:, ::-1]]), "RGBA").save("public/textures/kopi-pouch-back.png")

# Sachet
x0, y0, x1, y1 = FRONT_SACHET
with_cutout(Image.fromarray(px[y0:y1, x0:x1].astype(np.uint8)).resize(((x1 - x0) * 2, (y1 - y0) * 2), Image.LANCZOS)).save(
    "public/textures/kopi-sachet-front.png")

data = {
    "pouch": {"widthPx": POUCH["tr"][0] - POUCH["tl"][0], "heightPx": POUCH["bl"][1] - POUCH["tl"][1],
              "centreX": (POUCH["tl"][0] + POUCH["tr"][0]) / 2, "orangeV": orange_v},
    "frontSachet": {"x0": x0, "y0": y0, "x1": x1, "y1": y1},
    "backSachet": dict(zip(["x0", "y0", "x1", "y1"], BACK_SACHET)),
}
with open("src/kopiRatuProfile.js", "w") as f:
    f.write("// Generated by tools/extract_kopi_ratu.py from source/kopi-ratu-photo.jpg. Do not edit by hand.\n")
    f.write("export const kopiRatu = " + json.dumps(data, indent=1) + ";\n")
print("pouch texture", front.size, "orange from v =", round(orange_v, 3))
