# Mega Ratu test 02 — motion plan (as built)

15 s, 1080 × 1920, 30 fps → `videos/mega-ratu-test-02.mp4`. Built from Mega Ratu test (`videos/mega-ratu-test/`),
with the same reference motion (`videos/reference-motion/TRANSITIONS.md`) for 0–9 s. Words come from the Mega
Ratu box; the tagline is the client's.

## What changed from test 01

| Seconds | Change |
|---|---|
| all | **Title font: Mersiqual** (`--font-title`). Its file isn't in the project yet, so Chicle shows until `assets/fonts/mersiqual.woff2` is added |
| 7.67–8.10 | **Ground floods to beige → rosy brown** (`#F5F5DC` → `#BC8F8F`): a circle opening from the header as the first ingredient merges (0.43 s, smooth start and stop) |
| 7.67–8.84 | **The bottle grows with each merged ingredient** to 150, 200, 250 and **300 %** of its docked size (238 → 714 px), each step a springy pop (0.17 s) on the card's arrival. It steps from the card's left end to the centre at the same time. The card's words leave at 8.07, once the bottle starts covering them |
| 9.43–9.83 | The card stretches, then **folds into the grown bottle** (T16's fold; the bottle is already in the centre, so T15's slide is skipped) |
| 10.30–10.85 | The 3D box springs out from behind the bottle (as in test 01) |
| 10.85–11.55 | **The box bursts open:** a cream flash; its six faces fly outward, tumbling, and shrink away; **nine 3D ingredients** (3 grape clusters, 3 strawberries, 3 seed groups) shoot out of it, fast then slowing (0.55 s), spinning, and float around the bottle |
| 10.85–11.20 | **Ground bursts to linen → rosy pink** (`#FAF0E6` → `#F4C2C2`): a circle opening from the box |
| 11.90–12.25 | The ingredients fly off the edges (speeding up) as **the grape picture fades in** (and settles from 108 % to 100 %). The bottle glides to the centre and settles to 540 px |
| 12.20–12.80 | **JRM Holistik logo** (maroon `#54232F`, for contrast on linen) drops in on top and bounces (T1–T2) |
| 12.95–13.25 | **"drink your inner beauty"** wipes in under the bottle (title font, maroon), then everything holds to 15.0 |

## End card layout

The picture (`source/mega-ratu-end-background.jpg`) is enlarged 7.5 % and raised 140 px, so its open linen centre
lines up with TikTok's clear area. Logo at y 470 (300 px wide), bottle at y 860 (540 px tall), tagline at y 1158
(one line, 50 px), all centred at x 540 and inside 288–1248 px down.

## Still open

- **Mersiqual font file:** needed, with a licence that allows commercial use.
- **The picture has a "Шедеврум" mark** (the AI image app it came from) in the bottom-right corner. A copy
  without it would be cleaner; it sits under TikTok's buttons anyway.
