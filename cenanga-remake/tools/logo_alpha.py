"""Black-on-white logo JPG -> transparent PNG (ink = opaque, paper = clear).

The white snowflake inside the R becomes a see-through knockout, as in the artwork.
usage: python3 tools/logo_alpha.py public/img/logo_src.jpg public/img/logo.png
"""
import sys, numpy as np
from PIL import Image
g = np.array(Image.open(sys.argv[1]).convert('L')).astype(float)
paper = np.percentile(g, 95)                      # off-white of the JPG
a = np.clip((paper - g) / (paper - 20), 0, 1)     # 0 on paper, 1 on solid ink
a = np.where(a < 0.04, 0, a)
out = np.zeros(g.shape + (4,), np.uint8); out[..., 3] = (a * 255).astype(np.uint8)   # pure black ink
ys, xs = np.where(out[..., 3] > 10)
im = Image.fromarray(out[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
im.save(sys.argv[2]); print(sys.argv[2], im.size)
