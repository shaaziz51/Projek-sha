"""Split the Putik product shot into the bottle alone (it stands in front of the box)."""
import numpy as np, cv2
from PIL import Image
im = np.array(Image.open('public/putik/img/product_src.webp').convert('RGBA'))
x0 = 707   # bottle body starts ~695 but the box edge and its shadow sit under it; cut inside
c = im[:, x0:].copy()
rgb = c[..., :3].astype(int); a = c[..., 3]
hsv = cv2.cvtColor(c[..., :3], cv2.COLOR_RGB2HSV)
cream = (hsv[..., 2] > 140) & (hsv[..., 1] < 95)                  # box paper, incl. its shaded edge
boxleaf = (hsv[..., 0] > 30) & (hsv[..., 0] < 60) & (hsv[..., 1] > 120) & (hsv[..., 2] > 90)  # bright leaf print
cand = ((cream | boxleaf) & (a > 10)).astype(np.uint8)
n, lab = cv2.connectedComponents(cand)
edge = set(np.unique(lab[:, :3])) - {0}                          # touching the cut on the left
kill = np.isin(lab, list(edge))
c[..., 3] = np.where(kill, 0, a)
# keep the biggest opaque blob (the bottle)
m = (c[..., 3] > 10).astype(np.uint8)
n, lab, st, _ = cv2.connectedComponentsWithStats(m)
c[..., 3] = np.where(lab == 1 + np.argmax(st[1:, 4]), c[..., 3], 0)
c[:, :4, 3] = (c[:, :4, 3] * (np.arange(4) / 4)[None, :]).astype(np.uint8)   # feather the cut edge
ys, xs = np.where(c[..., 3] > 10)
out = Image.fromarray(c[ys.min():ys.max() + 1, xs.min():xs.max() + 1]); out.save('public/putik/img/bottle.png'); print('bottle', out.size)
full = Image.fromarray(im); a2 = np.array(full)[..., 3]; ys, xs = np.where(a2 > 10)
full.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)).save('public/putik/img/product.png'); print('product saved')
