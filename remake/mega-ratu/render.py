"""Mega Ratu remake of the reference ad: same timing, seam-swap motion, panel wipes and kinetic end card.

python3 -I render.py OUT.mp4 [--audio ref.mp4] [--test t1,t2,...]
"""
import argparse, math, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

HERE = Path(__file__).resolve().parent
CUT = HERE / 'cut'
W, H, FPS, DUR = 720, 1280, 25, 27.88
SEAM = W // 2
FONT = str(HERE / 'fonts/fontsource-chewy-5.3.0/chewy-latin-400-normal.ttf')

# ---------------------------------------------------------------- helpers
def hexrgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

def smooth(x):
    x = min(1.0, max(0.0, x)); return x * x * (3 - 2 * x)

def ease_out_back(x, k=1.6):
    x = min(1.0, max(0.0, x)); x -= 1; return 1 + (k + 1) * x ** 3 + k * x ** 2

def keyed(u, keys):
    """piecewise smoothstep through (u, value) keys"""
    if u <= keys[0][0]: return keys[0][1]
    for (u0, v0), (u1, v1) in zip(keys, keys[1:]):
        if u <= u1: return v0 + (v1 - v0) * smooth((u - u0) / (u1 - u0))
    return keys[-1][1]

def fit_h(im, h):
    return im.resize((max(1, round(im.width * h / im.height)), h), Image.LANCZOS)

def paste_center(layer, im, cx, cy):
    _safe_composite(layer, im, round(cx - im.width / 2), round(cy - im.height / 2))

def _safe_composite(layer, im, x, y):
    # alpha_composite needs the source fully inside: crop first
    x0, y0 = max(0, x), max(0, y); x1, y1 = min(layer.width, x + im.width), min(layer.height, y + im.height)
    if x1 <= x0 or y1 <= y0: return
    layer.alpha_composite(im.crop((x0 - x, y0 - y, x1 - x, y1 - y)), (x0, y0))

def clip_x(layer, keep):  # keep = 'left' | 'right'
    a = layer.getchannel('A'); d = ImageDraw.Draw(a)
    if keep == 'left': d.rectangle((SEAM, 0, W, H), fill=0)
    else: d.rectangle((0, 0, SEAM - 1, H), fill=0)
    layer.putalpha(a); return layer

def shadow(im, blur=14, opacity=0.35, offset=(10, 16)):
    a = im.getchannel('A').point(lambda v: int(v * opacity))
    pad = blur * 3
    sh = Image.new('RGBA', (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
    sa = Image.new('L', sh.size, 0); sa.paste(a, (pad, pad)); sa = sa.filter(ImageFilter.GaussianBlur(blur))
    sh.putalpha(sa)
    out2 = Image.new('RGBA', sh.size, (0, 0, 0, 0))
    _safe_composite(out2, sh, offset[0], offset[1]); _safe_composite(out2, im, pad, pad)
    return out2

# ---------------------------------------------------------------- assets
def ink_alpha(img, lo=60, hi=200):
    """black ink on white -> alpha mask (dark = opaque)"""
    g = img.convert('L')
    return g.point(lambda v: max(0, min(255, int((hi - v) * 255 / (hi - lo)))))

def load_assets(logo_src, halal_src):
    A = {p.stem: Image.open(p).convert('RGBA') for p in CUT.glob('*.png')}
    # JRM Holistik logo (black on white) -> single-colour logo, tinted per scene
    a = ink_alpha(Image.open(logo_src))
    logo = Image.new('RGBA', a.size, (255, 255, 255, 0)); logo.putalpha(a)
    A['logo_white'] = logo.crop(a.point(lambda v: 255 if v > 20 else 0).getbbox())
    # Malaysia halal mark: kept in its original black and white, trimmed to the round badge
    hi = Image.open(halal_src).convert('RGB')
    big = Image.new('L', (hi.width * 4, hi.height * 4), 0)
    ImageDraw.Draw(big).ellipse((12 * 4, 4 * 4, 730 * 4, 700 * 4), fill=255)
    m = big.resize(hi.size, Image.LANCZOS)  # anti-aliased circle
    hb = hi.convert('RGBA'); hb.putalpha(m)
    A['halal'] = hb.crop(m.getbbox())
    return A

def tint(im, rgb):
    out = Image.new('RGBA', im.size, rgb + (0,)); out.putalpha(im.getchannel('A')); return out

def collage(A, items, size=(360, 620)):
    c = Image.new('RGBA', size, (0, 0, 0, 0))
    for name, cx, cy, h, rot in items:
        im = fit_h(A[name], h)
        if rot: im = im.rotate(rot, resample=Image.BICUBIC, expand=True)
        _safe_composite(c, im, round(cx - im.width / 2), round(cy - im.height / 2))
    return c

def radial_bg(left, right, glow_left=0.0, glow_right=0.10):
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    img = np.zeros((H, W, 3), np.float32)
    img[:, :SEAM] = left; img[:, SEAM:] = right
    for side, g in (('l', glow_left), ('r', glow_right)):
        if not g: continue
        cx = W * 0.25 if side == 'l' else W * 0.75
        d = np.sqrt(((xx - cx) / (W * 0.45)) ** 2 + ((yy - H * 0.5) / (H * 0.42)) ** 2)
        k = np.clip(1 - d, 0, 1) ** 1.5 * g
        sl = slice(0, SEAM) if side == 'l' else slice(SEAM, W)
        img[:, sl] += (255 - img[:, sl]) * k[:, sl, None]
    # soft vignette
    d = np.sqrt(((xx - W / 2) / W) ** 2 + ((yy - H / 2) / H) ** 2)
    img *= (1 - 0.18 * np.clip(d - 0.25, 0, 1))[..., None]
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).convert('RGBA')

def text_block(lines, size, fill, lead=1.12, align='left'):
    f = ImageFont.truetype(FONT, size)
    ws = [f.getbbox(l)[2] for l in lines]; lh = int(size * lead)
    im = Image.new('RGBA', (max(ws) + 8, lh * len(lines) + 12), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for i, l in enumerate(lines):
        x = 0 if align == 'left' else (im.width - ws[i]) // 2
        d.text((x + 2, i * lh), l, font=f, fill=fill)
    return im

# ---------------------------------------------------------------- scenes
SCENES = [  # t0, t1
    (0.0, 4.80), (4.80, 10.88), (10.88, 15.64), (15.64, 20.84), (20.84, 27.88)]
# wipes: start, end, incoming scene index, direction the new picture comes FROM
WIPES = [(4.72, 5.02, 1, 'bottom'), (10.80, 11.16, 2, 'right'), (15.50, 15.74, 3, 'left'),
         (20.76, 20.92, 4, 'right'), (27.62, 27.88, 0, 'top')]
# seam swap: s=0 product hidden / pile spread, s=1 product out & tilted
S_KEYS = [(0.0, 0.5), (0.2, 0.0), (0.3, 0.0), (0.65, 1.0), (0.8, 1.0), (1.0, 0.5), (1.2, 0.3)]

class Flavour:
    def __init__(self, A, idx, left, right, pile, product_side, caption, cap_rgb, logo_rgb, glow, vis=0.15):
        self.idx, self.product_side, self.vis = idx, product_side, vis
        self.t0, self.t1 = SCENES[idx]
        gl, gr = (glow, 0.0) if product_side == 'left' else (0.0, glow)
        bg = radial_bg(hexrgb(left), hexrgb(right), gl, gr)
        # fixed overlays (same spots as the reference): logo top-right, caption bottom-left, badge bottom-right
        lg = tint(A['logo_white'], hexrgb(logo_rgb)); lg = lg.resize((190, round(lg.height * 190 / lg.width)), Image.LANCZOS)
        _safe_composite(bg, lg, 572 - lg.width // 2, 125 - lg.height // 2)
        cap = text_block(caption, 38, hexrgb(cap_rgb) + (255,), lead=1.08)
        _safe_composite(bg, cap, 70, 1024)
        hb = A['halal'].resize((150, round(A['halal'].height * 150 / A['halal'].width)), Image.LANCZOS)
        _safe_composite(bg, hb, 555 - hb.width // 2, 1072 - hb.height // 2)
        self.bg = bg
        self.pile = shadow(pile, blur=16, opacity=0.30, offset=(8, 14))
        self.prod = shadow(fit_h(A['bottle'], 610), blur=18, opacity=0.38, offset=(12, 18))
        self.prod_w = fit_h(A['bottle'], 610).width

    def frame(self, t):
        u = (t - self.t0) / (self.t1 - self.t0)
        s = keyed(u, S_KEYS)
        img = self.bg.copy()
        pw = self.pile.width
        # pile: sits against the seam on its own side and slides into the seam as s -> 1
        wob = -1.5 + 3.0 * min(max(u, 0), 1.2)
        scale = 1.0 + 0.03 * math.sin(math.pi * min(max(u, 0), 1))
        p = self.pile.rotate(wob, resample=Image.BICUBIC, expand=False)
        if scale != 1: p = p.resize((round(p.width * scale), round(p.height * scale)), Image.BICUBIC)
        vis = self.vis * W  # how much of the pile stays visible when the product is fully out
        pl = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        if self.product_side == 'right':      # pile on the left
            cx0 = SEAM + 7 - pw / 2; shift = (SEAM - vis) - (cx0 - pw / 2)
            paste_center(pl, p, cx0 + shift * s, H * 0.50); clip_x(pl, 'left')
        else:                                  # pile on the right
            cx0 = SEAM - 7 + pw / 2; shift = (cx0 + pw / 2) - (SEAM + vis)
            paste_center(pl, p, cx0 - shift * s, H * 0.50); clip_x(pl, 'right')
        img.alpha_composite(pl)
        # product (bottle): emerges from behind the seam and tilts
        ang = -6 + 16 * s  # clockwise degrees (reference pouch)
        out_off = 0.66 * W - SEAM          # centre offset from seam when fully out
        hide_off = -(self.prod_w / 2 + 40)  # centre offset when hidden behind the seam
        off = hide_off + (out_off - hide_off) * s
        pr = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        if self.product_side == 'right':
            im = self.prod.rotate(-ang, resample=Image.BICUBIC, expand=True)
            paste_center(pr, im, SEAM + off, H * 0.505); clip_x(pr, 'right')
        else:
            im = self.prod.rotate(ang, resample=Image.BICUBIC, expand=True)
            paste_center(pr, im, SEAM - off, H * 0.505); clip_x(pr, 'left')
        img.alpha_composite(pr)
        return img

class EndCard:
    WORDS = [('Drink', 21.05), ('your inner', 21.85), ('beauty,', 22.65),
             ('pretty on', 23.45), ('the inside', 24.25), ('and outside.', 25.05)]
    LINES = [['Drink', 'your inner', 'beauty,'], ['pretty on', 'the inside'], ['and outside.']]

    def __init__(self, A, bg_hex, glow_hex):
        self.t0, self.t1 = SCENES[4]
        yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
        base = np.array(hexrgb(bg_hex), np.float32); glow = np.array(hexrgb(glow_hex), np.float32)
        d = np.sqrt(((xx - W / 2) / (W * 0.62)) ** 2 + ((yy - H * 0.47) / (H * 0.40)) ** 2)
        k = np.clip(1 - d, 0, 1) ** 1.4
        self.bg = Image.fromarray((base + (glow - base) * k[..., None]).astype(np.uint8)).convert('RGBA')
        lg = A['logo_white']; self.logo = lg.resize((220, round(lg.height * 220 / lg.width)), Image.LANCZOS)
        self.box = shadow(fit_h(A['box'], 560), blur=20, opacity=0.45, offset=(14, 20))
        self.bottle = shadow(fit_h(A['bottle'], 600), blur=20, opacity=0.45, offset=(14, 20))
        # lock-up layout
        size = 50
        f = ImageFont.truetype(FONT, size)
        while max(f.getbbox(' '.join(l))[2] for l in self.LINES) > 640:
            size -= 2; f = ImageFont.truetype(FONT, size)
        self.size = size; lh = int(size * 1.18); y0 = 975
        self.slots = {}
        space = f.getbbox('a b')[2] - f.getbbox('ab')[2]
        for li, line in enumerate(self.LINES):
            ws = [f.getbbox(w)[2] for w in line]; tot = sum(ws) + space * (len(line) - 1)
            x = (W - tot) / 2
            for w, ww in zip(line, ws):
                self.slots[w] = (x + ww / 2, y0 + li * lh + size * 0.55); x += ww + space
        self.small = {w: self._word(w, size) for w, _ in self.WORDS}
        self.big = {}
        for w, _ in self.WORDS:
            bs = int(size * 2.4)
            while ImageFont.truetype(FONT, bs).getbbox(w)[2] > 640: bs -= 4
            self.big[w] = self._word(w, bs)
        self.rule_y = y0 + len(self.LINES) * lh + 24
        self.handle = self._word('@kak_sha_jrm on TikTok', 34)

    def _word(self, w, size):
        f = ImageFont.truetype(FONT, size); bb = f.getbbox(w)
        im = Image.new('RGBA', (bb[2] + 16, int(size * 1.4)), (0, 0, 0, 0))
        ImageDraw.Draw(im).text((8, int(size * 0.12)), w, font=f, fill=(255, 255, 255, 255))
        im = im.crop(im.getchannel('A').getbbox())
        return shadow(im, blur=max(4, size // 12), opacity=0.45, offset=(3, 5))

    def _pop(self, t, ts, dur=0.45):
        return ease_out_back((t - ts) / dur, 1.7) if t >= ts else 0.0

    def frame(self, t):
        img = self.bg.copy()
        # JRM logo drops in
        a = smooth((t - 21.15) / 0.4)
        if a > 0:
            lg = self.logo.copy(); lg.putalpha(lg.getchannel('A').point(lambda v: int(v * a)))
            _safe_composite(img, lg, (W - lg.width) // 2, int(105 - 30 * (1 - a)))
        # box + bottle pop in, side by side in the middle
        for im, cx, ts in ((self.box, 300, 20.98), (self.bottle, 432, 21.12)):
            k = self._pop(t, ts)
            if k <= 0.01: continue
            sc = 0.55 + 0.45 * k
            r = im.resize((max(1, round(im.width * sc)), max(1, round(im.height * sc))), Image.BICUBIC)
            paste_center(img, r, cx, 590 + 40 * (1 - min(k, 1)))
        # kinetic tagline: each group flies in big (rotated, blurred), holds centre, then shrinks into its slot
        stage = (W / 2, 1060)
        times = [ts for _, ts in self.WORDS] + [25.85]
        for i, (w, ts) in enumerate(self.WORDS):
            if t < ts: break
            nxt = times[i + 1]
            if t < ts + 0.24:      # fly in
                k = smooth((t - ts) / 0.24)
                rot = (22 if i % 2 == 0 else -22) * (1 - k)
                sc = 0.35 + 0.65 * k
                frames = []
                for j in range(3):  # cheap motion blur
                    kk = smooth((t - ts - 0.03 * j) / 0.24)
                    frames.append((rot * (1 + 0.15 * j), 0.35 + 0.65 * kk, 1 - 0.25 * j))
                for rr, ss, op in frames:
                    im = self.big[w].resize((max(1, round(self.big[w].width * ss)), max(1, round(self.big[w].height * ss))), Image.BICUBIC)
                    im = im.rotate(rr, resample=Image.BICUBIC, expand=True)
                    im.putalpha(im.getchannel('A').point(lambda v: int(v * op * min(1, k * 1.6))))
                    dx = (1 - ss) * 160 * (1 if i % 2 == 0 else -1)
                    paste_center(img, im, stage[0] + dx, stage[1] + (1 - ss) * 60)
            elif t < nxt:          # hold big
                paste_center(img, self.big[w], *stage)
            else:                  # shrink into the lock-up
                k = smooth((t - nxt) / 0.30)
                sx, sy = self.slots[w]
                cx = stage[0] + (sx - stage[0]) * k; cy = stage[1] + (sy - stage[1]) * k
                big, small = self.big[w], self.small[w]
                sc = (big.width + (small.width - big.width) * k) / big.width
                im = big.resize((max(1, round(big.width * sc)), max(1, round(big.height * sc))), Image.BICUBIC) if k < 1 else small
                paste_center(img, im, cx, cy)
        # gold rule draws on under the tagline (stands in for the reference's smile)
        k = smooth((t - 26.35) / 0.5)
        if k > 0:
            d = ImageDraw.Draw(img); half = 150 * k
            d.rounded_rectangle((W / 2 - half, self.rule_y, W / 2 + half, self.rule_y + 6), radius=3, fill=(232, 190, 70, 255))
        # TikTok handle fades up under the gold rule
        k = smooth((t - 26.75) / 0.4)
        if k > 0:
            h = self.handle.copy(); h.putalpha(h.getchannel('A').point(lambda v: int(v * k)))
            paste_center(img, h, W / 2, self.rule_y + 42 + 14 * (1 - k))
        return img

# ---------------------------------------------------------------- compositor
def wipe_mask(k, direction, stagger=0.18):
    """reveal mask for the incoming scene: two blocks (halves) with a small stagger"""
    m = Image.new('L', (W, H), 0); d = ImageDraw.Draw(m)
    def p(x): return smooth(x)
    if direction in ('bottom', 'top'):
        for i, (x0, x1) in enumerate(((0, SEAM), (SEAM, W))):
            kk = p((k - i * stagger) / (1 - stagger))
            hh = H * kk
            if direction == 'bottom': d.rectangle((x0, H - hh, x1, H), fill=255)
            else: d.rectangle((x0, 0, x1, hh), fill=255)
    else:
        for i, (y0, y1) in enumerate(((0, H // 2), (H // 2, H))):
            kk = p((k - i * stagger) / (1 - stagger))
            ww = W * kk
            if direction == 'right': d.rectangle((W - ww, y0, W, y1), fill=255)
            else: d.rectangle((0, y0, ww, y1), fill=255)
    return m

def build(A):
    pile2 = collage(A, [('grape_bunch', 190, 250, 470, 0), ('grape_small', 285, 445, 270, 10),
                        ('strawberry_heart', 120, 455, 250, -12), ('strawberry_column', 250, 120, 190, 15)])
    pile3 = collage(A, [('elderberry_cluster', 185, 175, 330, 0), ('blackberry_single', 150, 410, 260, -8),
                        ('blackberry_pair', 265, 520, 190, 6), ('elderberry_leaf', 285, 300, 210, 12)])
    pile4 = collage(A, [('raspberry_column', 215, 300, 580, 0), ('blueberries', 120, 230, 160, 0),
                        ('blueberry_big', 135, 470, 170, -6), ('raspberry_four', 285, 470, 220, 8),
                        ('blueberries', 290, 130, 120, 20)])
    box_pile = Image.new('RGBA', (240, 620), (0, 0, 0, 0)); b = fit_h(A['box'], 580)
    _safe_composite(box_pile, b, (240 - b.width) // 2, 20)
    scenes = [
        Flavour(A, 0, '#7B1E3A', '#F3DCE2', box_pile, 'right', ['Mega Ratu', 'Botanical drink', '300ml'], '#FFFFFF', '#5A0F2A', 0.35),
        Flavour(A, 1, '#F7DCE3', '#2E7D4F', pile2, 'left', ['Filled with', 'Grape', '& Strawberry'], '#6E0F2D', '#FFFFFF', 0.45, vis=0.34),
        Flavour(A, 2, '#EFE4F6', '#F2B33D', pile3, 'left', ['Berry goodness', 'Elderberry', '& Blackberry'], '#4A1460', '#3A0A2A', 0.45, vis=0.34),
        Flavour(A, 3, '#E2EEFB', '#BFEBD7', pile4, 'left', ['Berry goodness', 'Raspberry', '& Blueberry'], '#173A6B', '#173A6B', 0.45, vis=0.34),
        EndCard(A, '#5E0B27', '#A3264F'),
    ]
    return scenes

def render_t(scenes, t):
    cur = next(i for i, (a, b) in enumerate(SCENES) if a <= t < b) if t < DUR else 4
    img = scenes[cur].frame(t)
    for ws, we, inc, dirn in WIPES:
        if ws <= t < we:
            k = (t - ws) / (we - ws)
            out = scenes[(inc - 1) % 5].frame(t)
            inn = scenes[inc].frame(t - DUR if inc == 0 else t)  # loop: scene 1 just before its start pose
            img = Image.composite(inn, out, wipe_mask(k, dirn))
    return img.convert('RGB')

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('out'); ap.add_argument('--logo', required=True); ap.add_argument('--halal', required=True)
    ap.add_argument('--audio'); ap.add_argument('--test')
    a = ap.parse_args()
    A = load_assets(a.logo, a.halal); scenes = build(A)
    if a.test:
        for t in a.test.split(','):
            render_t(scenes, float(t)).save(f'{a.out}_{t}.png')
        return
    n = int(round(DUR * FPS))
    cmd = ['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-']
    if a.audio: cmd += ['-i', a.audio, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-shortest']
    cmd += ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'medium', '-movflags', '+faststart', a.out]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(n):
        p.stdin.write(render_t(scenes, i / FPS).tobytes())
        if i % 100 == 0: print(f'frame {i}/{n}', flush=True)
    p.stdin.close(); p.wait(); print('done', a.out)

if __name__ == '__main__':
    main()
