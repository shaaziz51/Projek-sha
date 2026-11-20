# Mega Ratu & Kopi Ratu title — Motion2Code rebuild

`source.mp4` (the first title video, 1920×1080, 30 fps, 5.0 s) rebuilt as inline SVG driven by one GSAP timeline.

| File | What it is |
|---|---|
| `index.html` | The rebuild. Plays and loops by itself; `index.html?t=2.5` freezes at 2.5 s. |
| `compare.html` | Source video and rebuild side by side in the browser, synced, with frame stepping. |
| `side_by_side.mp4` | Proof video: original on the left, rebuild on the right, 30 fps. |
| `anim.mp4` | The rebuild rendered at 30 fps through `anim.seek`. |
| `build_index.py` + `index.template.html` | Generate `index.html`: the letters are the source font's glyph outlines (DejaVu Serif Bold, 112 px) as SVG paths. Edit the template, then run `python3 build_index.py`. |
| `study/sheet.png` | Contact sheet of the source, one tile every 0.5 s. |

## Shot list (measured from the source, frame by frame)

| Time | What happens |
|---|---|
| 0–0.4 s | Empty stage, gold cursor at the start of the line |
| 0.4–3.52 s | Character *i* fades in linearly over 0.12 s from 0.4 + 0.15·*i* s; the cursor jumps to just after the newest character |
| 3.4–4.5 s | Full title holds; the cursor blinks on a 0.8 s cycle (off 3.6, on 4.0, off 4.4) |
| 4.5–4.8 s | **Added for the loop:** the title fades out while the cursor is off |
| 4.8–5.0 s | Opening frame: cursor back at the start, as at 0 s |

Colours sampled from the video: ground `#1A0F0A`, letters `#F3E5CC`, ampersand `#D39F44`, cursor `#D4A046`.

## Checks

- Every frame from 0 to 4.5 s compared with the source at the same frame number: the letter fade matches within
  0.02 opacity on each frame, and every cursor jump lands on the same frame as in the source.
- `frame_diff.py` (every 0.5 s and every 1/30 s): at most 0.31 mean difference (0–255) before 4.5 s; the only large
  differences are the added loop return, 4.5–5.0 s.
- `check_anim.py --runtime`: ok — seam 0.0, determinism 0.0, no console errors, no network beyond GSAP.

## How it differs from the source

- 4.5–5.0 s: the source holds the full title to the end; the rebuild fades it out and returns to the empty opening
  frame so the loop is seamless. Remove the return in `index.template.html` (`RETURN_FADE`, `HOME`) to hold instead.
- Letter edges are antialiased by the browser instead of the original renderer, so edges differ by a fraction of a
  pixel.
