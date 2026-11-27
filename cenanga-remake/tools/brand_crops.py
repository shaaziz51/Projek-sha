"""Crop brand marks off the product shot and turn the white packaging behind them transparent.

alpha = how far a pixel is from white; colour is un-premultiplied against white,
so gold / navy / green ink keeps its true colour on any background.
"""
import sys, numpy as np
from PIL import Image
src = Image.open(sys.argv[1]).convert('RGBA')
def unwhite(box, path, boost=1.6, scale=1):
    c = np.array(src.crop(box)).astype(float)
    rgb, a0 = c[..., :3], c[..., 3:] / 255
    rgb = rgb * a0 + 255 * (1 - a0)                    # flatten on white
    edge = np.r_[rgb[:4].reshape(-1, 3), rgb[-4:].reshape(-1, 3), rgb[:, :4].reshape(-1, 3), rgb[:, -4:].reshape(-1, 3)]
    paper = np.median(edge, 0)                          # the packaging's own off-white
    dist = (paper.min() - rgb.min(2)) / paper.min()
    a = np.clip((dist - 0.07) * boost * 1.1, 0, 1)
    col = np.where(a[..., None] > 0, (rgb - paper * (1 - a[..., None])) / np.maximum(a[..., None], 1e-3), 0)
    out = np.dstack([np.clip(col, 0, 255), a * 255]).astype(np.uint8)
    ys, xs = np.where(out[..., 3] > 10)
    im = Image.fromarray(out[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
    if scale != 1:
        im = im.resize((im.width * scale, im.height * scale), Image.LANCZOS)
    im.save(path); print(path, im.size)
# x ranges are in the 1293x1216 product shot; the box face starts ~x=600
unwhite((662, 300, 980, 540), 'public/img/wordmark.png', boost=1.5, scale=2)
# end-card logo now comes from the supplied JRM Holistik artwork: see tools/logo_alpha.py
