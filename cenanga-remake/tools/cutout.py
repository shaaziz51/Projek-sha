"""Cut out the user's product/ingredient photos into transparent PNGs."""
import sys, numpy as np, cv2
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
I = sys.argv[3:] and sys.argv[3]
def save(rgb, alpha, path):
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
    ys, xs = np.where(alpha > 8)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    rgba = np.dstack([rgb, alpha])[y0:y1, x0:x1]
    Image.fromarray(rgba).save(path)
def border_fill(bg):
    """keep only background components connected to the image border"""
    n, lab = cv2.connectedComponents(bg.astype(np.uint8))
    edge = set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])) - {0}
    return np.isin(lab, list(edge))
rgb = np.array(Image.open(src).convert('RGB'))
hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
s, v = hsv[..., 1].astype(int), hsv[..., 2].astype(int)
mode = I
if mode == 'checker':      # neutral light-grey/white checkerboard
    bg = (s < 18) & (v > 212)
    bg = border_fill(bg)
    fg = ~bg
    fg = cv2.morphologyEx(fg.astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    # fill holes inside the object
    n, lab = cv2.connectedComponents(fg)
    big = max(range(1, n), key=lambda k: (lab == k).sum())
    fg = (lab == big).astype(np.uint8)
    cnts, _ = cv2.findContours(fg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    fg = cv2.drawContours(np.zeros_like(fg), cnts, -1, 1, -1)
    fg = cv2.erode(fg, np.ones((3, 3), np.uint8))
    save(rgb, fg * 255, out)
elif mode == 'green':      # leaves on white or checker: keep saturated green
    fg = ((s > 45) & (v > 25)).astype(np.uint8)
    fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(fg)
    keep = [k for k in range(1, n) if st[k, 4] > 400]
    fg = np.isin(lab, keep).astype(np.uint8)
    cnts, _ = cv2.findContours(fg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    fg = cv2.drawContours(np.zeros_like(fg), cnts, -1, 1, -1)
    save(rgb, fg * 255, out)
elif mode == 'circle':     # round candy: fit circle to the red stripes
    red = ((hsv[..., 0] < 10) | (hsv[..., 0] > 170)) & (s > 90)
    ys, xs = np.where(red)
    (cx, cy), r = cv2.minEnclosingCircle(np.c_[xs, ys].astype(np.float32))
    a = np.zeros(rgb.shape[:2], np.uint8)
    cv2.circle(a, (int(cx), int(cy)), int(r) - 2, 255, -1, lineType=cv2.LINE_AA)
    save(rgb, a, out)
