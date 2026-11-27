"""Difference matte against a reconstructed checkerboard.

For JPGs where the 'transparent' checkerboard was baked into the pixels.
The grid is fitted (fractional square size + phase) on the image border,
re-synthesised over the whole frame, and alpha = difference from it.
"""
import sys
import numpy as np
import cv2
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
rgb = np.array(Image.open(src).convert('RGB')).astype(float)
g = rgb.mean(2)
H, W = g.shape

border = np.zeros((H, W), bool)
border[:20] = border[-20:] = True
border[:, :20] = border[:, -20:] = True
dark = g < g[border].mean()


def fit1d(profile):
    """best (score, square size, phase) for a 1-D alternating pattern"""
    idx = np.arange(len(profile))
    best = None
    for size in np.arange(12.0, 18.0, 0.01):
        for off in np.arange(0, 2 * size, 0.25):
            pat = (((idx + off) // size) % 2).astype(bool)
            sc = (pat == profile).mean()
            sc = max(sc, 1 - sc)
            if best is None or sc > best[0]:
                best = (sc, size, off)
    return best


_, sx, ox = fit1d(dark[5])
_, sy, oy = fit1d(dark[:, 5])
yy, xx = np.mgrid[0:H, 0:W].astype(float)
par = ((((xx + ox) // sx) + ((yy + oy) // sy)) % 2).astype(bool)
if (dark[border] == par[border]).mean() < 0.5:
    par = ~par
print('grid', round(sx, 2), round(sy, 2), 'border agreement', round((dark[border] == par[border]).mean(), 3))

c_dark = rgb[border & par].mean(0)
c_light = rgb[border & ~par].mean(0)
board = np.where(par[..., None], c_dark, c_light)
d = cv2.GaussianBlur(np.abs(rgb - board).max(2), (0, 0), 1.2)

obj = (d > 12).astype(np.uint8)
obj = cv2.morphologyEx(obj, cv2.MORPH_CLOSE, np.ones((11, 11), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(obj)
obj = (lab == 1 + np.argmax(st[1:, 4])).astype(np.uint8)
cnts, _ = cv2.findContours(obj, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
hull = cv2.convexHull(max(cnts, key=cv2.contourArea))  # ice cube is convex: closes notches
fill = cv2.fillConvexPoly(np.zeros_like(obj), hull, 1)
fill = cv2.erode(fill, np.ones((3, 3), np.uint8))

# remove checker modulation that shows through the translucent parts
flat = (c_dark + c_light) / 2
# the ice is partly opaque, so the checker shows through at a varying strength:
# estimate its local amplitude by projecting the high-passed image on the grid
p = np.where(par, -1.0, 1.0)                       # +1 on light squares
hp = g - cv2.GaussianBlur(g, (0, 0), 8)
amp = cv2.GaussianBlur(hp * p, (0, 0), 10)         # local amplitude (p*p == 1)
amp = np.clip(amp, 0, None)[..., None]
rgb = np.clip(rgb - amp * p[..., None], 0, 255)
soft = np.clip((d - 6) * 8, 0, 255)
alpha = np.where(fill > 0, np.maximum(soft, 225), 0).astype(np.uint8)
alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
ys, xs = np.where(alpha > 8)
o = np.dstack([rgb.astype(np.uint8), alpha])[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
Image.fromarray(o).save(out)
print('saved', out, o.shape)
