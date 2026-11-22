"""Remove white / baked-in checkerboard backgrounds: near-white low-saturation pixels connected to the image border."""
import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

def cut(src, dst, bright=200, sat=22, erode=1, blur=1.0, crop=True, holes=False):
    im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.int16)
    mx, mn = a.max(2), a.min(2)
    cand = (mn >= bright) & ((mx - mn) <= sat)
    lab, n = ndi.label(cand)
    border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    bg = np.isin(lab, border[border > 0])
    fg = ~bg
    if holes:
        hole = (mn >= 225) & ((mx - mn) <= 18)
        hl, hn = ndi.label(hole)
        if hn:
            hs = ndi.sum(hole, hl, range(1, hn + 1))
            fg &= ~np.isin(hl, 1 + np.where(hs >= 25)[0])
    fg = ndi.binary_fill_holes(fg) if False else fg
    # drop tiny specks
    lab2, n2 = ndi.label(fg)
    if n2:
        sizes = ndi.sum(fg, lab2, range(1, n2 + 1))
        keep = np.isin(lab2, 1 + np.where(sizes >= max(200, sizes.max() * 0.002))[0])
        fg = keep
    if erode: fg = ndi.binary_erosion(fg, iterations=erode)
    alpha = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur))
    out = im.convert('RGBA'); out.putalpha(alpha)
    if crop:
        bb = alpha.point(lambda v: 255 if v > 8 else 0).getbbox(); out = out.crop(bb)
    out.save(dst); print(dst, out.size)

if __name__ == '__main__':
    IMG = sys.argv[1]; OUT = sys.argv[2]
    names = {'1':'elderberry_cluster','2':'elderberry_leaf','3':'blackberry_single','4':'blackberry_pair','5':'mulberry',
             '6':'raspberry_four','7':'raspberry_column','8':'blueberry_big','9':'blueberries','10':'grape_bunch',
             '11':'grape_small','12':'strawberry_heart','13':'strawberry_column'}
    for k, v in names.items():
        cut(f'{IMG}/{k}.jpg', f'{OUT}/{v}.png', holes=k in ('1','2','10','11'))
    cut(f'{IMG}/14.webp', f'{OUT}/box.png', bright=190, sat=25, erode=2)
    cut(f'{IMG}/15.webp', f'{OUT}/bottle.png', bright=190, sat=25, erode=2)
