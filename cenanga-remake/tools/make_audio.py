"""Royalty-free placeholder music bed + SFX for the 17 s cut (pure numpy synthesis).

Music: ~100 BPM, F major (F - Dm - Bb - C), pad + pluck arpeggio + bass + light drums.
SFX at the original cue points scaled to 17 s: dings 0.03 s / 1.37 s, whooshes 13.62 s / 14.11 s.
Swap public/audio/music.wav for a licensed track before publishing if you prefer.
"""
import numpy as np, wave
SR, DUR, BPM = 44100, 17.0, 100
N = int(SR * DUR); t = np.arange(N) / SR; beat = 60 / BPM
rng = np.random.default_rng(7)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def env(n, a, r):
    e = np.ones(n); ai = int(a * SR); e[:ai] = np.linspace(0, 1, ai) if ai else 1
    e *= np.exp(-np.arange(n) / SR / r) if r else 1; return e
def add(buf, start, sig, gain):
    i = int(start * SR); j = min(N, i + len(sig))
    if i < N: buf[i:j] += sig[:j - i] * gain
def lowpass(x, a):   # one-pole
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x): acc += a * (v - acc); y[i] = acc
    return y
chords = [[53, 57, 60], [50, 53, 57], [46, 50, 53], [48, 52, 55]]   # F Dm Bb C
mus = np.zeros(N)
bar = 4 * beat
for b in range(int(DUR / bar) + 1):
    ch = chords[b % 4]; t0 = b * bar
    n = int(bar * SR) + int(0.3 * SR); tt = np.arange(n) / SR
    pad = sum(np.sin(2 * np.pi * hz(m + 12) * tt) + 0.3 * np.sin(2 * np.pi * hz(m + 12) * 2.003 * tt) for m in ch)
    e = np.minimum(1, tt / 0.25) * np.minimum(1, (n / SR - tt) / 0.3)
    add(mus, t0, pad * e, 0.045)
    for k in range(8):                                   # 8th-note pluck arpeggio
        m = ch[[0, 1, 2, 1, 0, 2, 1, 2][k]] + 24
        ln = int(0.5 * SR); tt2 = np.arange(ln) / SR
        s = (np.sin(2 * np.pi * hz(m) * tt2) + 0.25 * np.sin(2 * np.pi * hz(m) * 3 * tt2)) * env(ln, 0.004, 0.16)
        add(mus, t0 + k * beat / 2, s, 0.07 if k % 2 == 0 else 0.05)
    for k in (0, 2):                                     # bass
        ln = int(beat * 1.8 * SR); tt2 = np.arange(ln) / SR
        s = np.tanh(1.5 * np.sin(2 * np.pi * hz(ch[0] - 12) * tt2)) * env(ln, 0.01, 0.6)
        add(mus, t0 + k * beat, s, 0.16)
drums = np.zeros(N)
for i in range(int(DUR / beat) + 1):
    tb = i * beat
    ln = int(0.35 * SR); tt = np.arange(ln) / SR
    if i % 2 == 0:                                       # kick
        f = 50 + 90 * np.exp(-tt * 30); ph = 2 * np.pi * np.cumsum(f) / SR
        add(drums, tb, np.sin(ph) * np.exp(-tt * 9), 0.5)
    else:                                                # clap
        nz = rng.standard_normal(ln); nz = nz - lowpass(nz, 0.25)
        add(drums, tb, nz * np.exp(-tt * 22), 0.12)
    for h in (0, 0.5):                                   # hats
        ln2 = int(0.06 * SR); nz = rng.standard_normal(ln2); nz = nz - lowpass(nz, 0.6)
        add(drums, tb + h * beat, nz * np.exp(-np.arange(ln2) / SR * 70), 0.05 if h else 0.035)
mix = mus + drums
fade = np.minimum(1, t / 0.05) * np.clip((DUR - t) / 1.4, 0, 1) ** 1.5
mix *= fade
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix *= 0.85 / np.abs(mix).max()
sfx = np.zeros(N)
def ding(at):
    ln = int(1.2 * SR); tt = np.arange(ln) / SR
    s = sum(a * np.sin(2 * np.pi * f * tt) * np.exp(-tt * d) for f, a, d in [(1760, 1, 4), (2637, .5, 6), (3520, .3, 9), (5274, .15, 14)])
    add(sfx, at, s * np.minimum(1, tt / 0.002), 0.35)
def whoosh(at, dur=0.45):
    ln = int(dur * SR); tt = np.arange(ln) / SR
    nz = rng.standard_normal(ln); out = np.empty(ln); acc = 0.0
    for i in range(ln):
        a = 0.02 + 0.25 * np.sin(np.pi * tt[i] / dur) ** 2; acc += a * (nz[i] - acc); out[i] = acc
    out = out - lowpass(out, 0.02)
    add(sfx, at, out * np.sin(np.pi * tt / dur) ** 2, 1.6)
for at in (0.03, 1.37): ding(at)
for at in (13.62, 14.11): whoosh(at)
sfx *= 0.8 / max(1e-9, np.abs(sfx).max())
def save(x, path):
    w = wave.open(path, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); w.close(); print(path)
save(mix, 'public/audio/music.wav'); save(sfx, 'public/audio/sfx.wav')
