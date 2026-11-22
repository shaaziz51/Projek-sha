# Art assets

| File | What it is |
|---|---|
| `original/paper_art_01.webp` | Gemini paper-art image, as supplied |
| `presenter_vox-style_cutout.png` | Same image with the white backdrop removed (transparent PNG); keeps the white sticker border, tape and table |
| `tape_vox-style.png` | Yellow torn-paper tape on its own, with the original "VOX-STYLE" text |
| `tape_blank.png` | Same tape with the text removed, for your own words |
| `fonts/playfair-display-latin-{800,900}-normal.woff` | Playfair Display (SIL Open Font License, see `fonts/OFL-LICENSE.txt`) |
| `scripts/cut.py` | Backdrop removal (edge flood-fill of the backdrop tone, plus a grey pass below the tape) |
| `scripts/tape.py` | Tape extraction and text removal |
| `scripts/gfx.py` | Renders the animated tape titles onto the video (edit `CUES` to change words or timing) |

Used in `output/talking_head_graphics.mp4`. Tape titles, times in the cleaned video:

| Time (s) | Tape |
|---|---|
| 3.4–5.6 | HORMON BERUBAH? |
| 9.2–11.3 | MEGA RATU |
| 19.15–21.5 | LEPAS HABIS PANTANG |
| 26.5–27.85 | RASA BUAH BERI |
| 27.9 / 28.5 / 29.6–31.8 | AKAR SERAPAT · KACIP FATIMAH · JARUM EMAS (stacked, each appears when spoken) |
| 35.0–37.0 | KUNYIT HITAM |
| 47.1–49.0 | JAGA HORMON |
| 54.3–end | MEGA RATU |

Motion follows `style.md`: 4-frame slap-in with overshoot, stop-motion wobble on twos while holding, 3-frame drop-out.
