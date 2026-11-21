---
videomd: 1
part: remake
tokens: 4403
---

## Remake plan

### Step by step

This is a motion-graphics explainer. Do the steps in this order; the detail for each is in the matching subsection below.

1. **Write the content**: write yours in the same 3 steps as the original (narrative line under “Content and structure”)
2. **Collect material**: the real material in the picture (photo, product photo, logo / brand mark) needs the original files, listed under “What to prepare”
3. **Motion graphics**: have the agent make an editable first version and change the text and pictures on top of it rather than starting from scratch; the first version is only a start, where it differs from the original is under “Code build”
4. **Subtitles and styled text**: import `packaging/subtitles.srt` and replace the words; timing and style under “Packaging layer”
5. **Music**: find a track at the same tempo and mood (source: to confirm, about 120 BPM)
6. **Sound effects**: 9; place similar ones from a library at the times under “Sound”
7. **Put it together and compare**: hand the shots you made to the agent; it places them on the original timeline, keeps the original where yours are missing, and renders a side-by-side comparison with the original

**code render / screen capture 5 shots → 1 code project**

### Code composition

Rebuild it as one project in an HTML video framework (such as HyperFrames or Remotion): cuts, transitions and each shot's key frames from "Rhythm and key frames", layout, colours and elements from the scenes below. Text and UI are 100% controllable, changing copy is a data change, and an AI coding assistant can write the project.

`rea-video code-remake <breakdown folder>` only makes a quick draft: it renders `code/remake.mp4` from each scene's sampled points / cut-out, motion and background glow and scores it. Particles, point clouds and data visualisations on a dark ground come close; an illustrated character's acting and morph transitions do not.

- Part 1: shots #1–#5 (0.0–27.9s)

Remake assets (all in the report folder; hand them over together with the data below to whoever writes the code, or to an LLM):
- `shots/shot_XXX_first.jpg` / `_last.jpg`: first / last frame of each shot at full size, for layout, type size and margins
- `shots/shot_XXX_strip.jpg`: key frames about every 0.5 s, to follow the animation
- `shots/shot_XXX_elements.jpg` and `_el_NN.jpg` / `_st_NN.jpg` / `_ly_NN.jpg`: full-size crop of every element once settled, numbered as in the motion timeline; redraw shapes from them, cut out icons, logos and illustrations that cannot be redrawn
- `packaging/overlays.ass`, `packaging/timeline.json`: timing, position and colour of the text

How to build the pictures (by the measured picture type):
- UI / document: HTML / CSS cards and layout matched to the frame (radius, shadow, type sizes), elements enter with spring(); a real UI can be screen-recorded
- kinetic type: Word-by-word spring() entrances (offset + scale + opacity), highlight boxes on key words; match font, size and leading from the frame
- gradients / colour fields: CSS linear / radial gradients, or a few large circles with filter: blur() drifting slowly; glass cards with backdrop-filter

| Shot | Time | Build | Picture | Camera | Colours | On-screen text |
|---|---|---|---|---|---|---|
| #1 | 0.0–4.8s | UI / document | Split-screen product card for the 'Hazelnut cream & milk chocolate' flavour. Background: brown (#8B3A1A-ish) left / dark green right, split at roughly 1/3 width. Left panel: a column of whole hazelnuts with two green hazelnut leaves stacked in a tall column, with a slight drift/scale. Right panel: white pouch with green accents, 'Waffle Cones, filled with hazelnut cream & milk chocolate' which slides out from behind the seam, tilts about 10-15 degrees, holds, then slides back behind the seam before the transition. Fixed overlays: 'Just the Fun Part' white logo top-right, white 'Filled with / <flavour>' caption in a rounded hand-lettered font bottom-left, circular 'Real Belgian Chocolate' badge bottom-right. Transition in: the next colour panels wipe in as sliding rectangular blocks (panel wipe, about 0.3 s). | static frame, elements move inside it | ground #853a17 · #02572b #e8edf0 #4f200e #b7bdad · drawn #edefee #bdb79b #c07845 #103f1e | & Milk chocolate / Just the / fun / PART |
| #2 | 4.8–10.9s | kinetic type | Split-screen product card for the 'Pumpkin spice white chocolate' flavour. Background: tan/beige left / orange right, split at roughly 1/3 width. Left panel: cubes of pumpkin, cinnamon sticks and white chocolate chunks stacked in a tall column, with a slight drift/scale. Right panel: white pouch with orange Halloween graphics (pumpkins, bats), 'Pumpkin spice white chocolate' which slides out from behind the seam, tilts about 10-15 degrees, holds, then slides back behind the seam before the transition. Fixed overlays: 'Just the Fun Part' white logo top-right, white 'Filled with / <flavour>' caption in a rounded hand-lettered font bottom-left, circular 'Real Belgian Chocolate' badge bottom-right. Transition in: the next colour panels wipe in as sliding rectangular blocks (panel wipe, about 0.3 s). | static frame, elements move inside it | ground #c1a66f · #f37d05 #eeeae7 #d56718 #e4c9aa · drawn #f3eeea #e4c69a #dd5a09 #8f4115 | Just the / fun / Justthe / PART |
| #3 | 10.9–15.6s | gradients / colour fields | Split-screen product card for the 'Dark chocolate & marshmallow' flavour. Background: pale pink left / coral red right, split at roughly 1/3 width. Left panel: a column of white marshmallow cubes stacked in a tall column, with a slight drift/scale. Right panel: red pouch, 'S'mores Waffle Cones', dark chocolate & marshmallow which slides out from behind the seam, tilts about 10-15 degrees, holds, then slides back behind the seam before the transition. Fixed overlays: 'Just the Fun Part' white logo top-right, white 'Filled with / <flavour>' caption in a rounded hand-lettered font bottom-left, circular 'Real Belgian Chocolate' badge bottom-right. Transition in: the next colour panels wipe in as sliding rectangular blocks (panel wipe, about 0.3 s). | static frame, elements move inside it | ground #e74c57 · #9b0512 #e8cace #e7e3e6 #d3888a · drawn #dd4c54 #eacdd0 #f1ecef #73241e | Justthe / Just the / fun / PART |
| #4 | 15.6–20.8s | UI / document | Split-screen product card for the 'Peppermint dark chocolate' flavour. Background: dark red left / green right (Christmas colours), split at roughly 1/3 width. Left panel: a column of dark chocolate shards with fresh mint sprigs top and bottom stacked in a tall column, with a slight drift/scale. Right panel: white pouch with red/green Christmas graphics, 'Peppermint dark chocolate' which slides out from behind the seam, tilts about 10-15 degrees, holds, then slides back behind the seam before the transition. Fixed overlays: 'Just the Fun Part' white logo top-right, white 'Filled with / <flavour>' caption in a rounded hand-lettered font bottom-left, circular 'Real Belgian Chocolate' badge bottom-right. Transition in: the next colour panels wipe in as sliding rectangular blocks (panel wipe, about 0.3 s). | static frame, elements move inside it | ground #0c6443 · #9b0512 #471b17 #e4e2e5 #6f3932 · drawn #efedef #5c983b #790811 #beaea8 | Just the / fun / Justthe / PART |
| #5 | 20.8–27.9s | gradients / colour fields | End card / slogan. Starts with the peppermint scene being wiped off by a solid deep-red panel (about 20.84-20.9 s). Kinetic typography on deep red (#9A0010-ish): white rounded hand-lettered words fly in one by one, oversized, rotated, with motion blur, then shrink and settle into a centred lock-up: 'Only The Best Part / Of The / Sundae Cone!' (Only ~21.0 s, The ~22.6 s, Best Part ~23.5 s, Of The ~24.3 s, Sundae Cone! ~25.4-26.6 s). A white smile curve (the logo's smile) pops in under the text around 27.5 s, then the panels wipe straight back into the hazelnut scene (27.7-27.88 s) so the video loops seamlessly. | static frame, elements move inside it | ground #980510 · #9d0611 #fbf7fa #ac3542 #be6771 · drawn #fefbfd #f2d1d6 #e3a3ab #c7717c | Just the / PART |

**Picture scenes** (a new scene whenever what is drawn moves or changes shape as a whole inside a shot. `frames/` holds first / middle / last full-size frames per scene, `scene_XX_layer.png` the drawn layer of the middle frame (background and text removed, alpha by how strongly it stands out), `frames/points/scene_XX.json` samples of that layer, one `x y r g b a` per row with x, y in 0–1. Place particles, trace lines or redraw shapes from these instead of guessing from a description. `track` in `frames/scenes.json` follows the layer's centre and spread over time)

| Scene | Shot | Time | Ground | Background glow | Drawn colours | Pieces | Area (x0 y0 x1 y1) | Motion |
|---|---|---|---|---|---|---|---|---|
| scene_01 | #1 | 0.0–2.8s | #683c1b | #677f5e, centre (0.52, 0.60), radius 0.21 | #233817 #b97543 #e6cca9 | 317 | 0.09 0.06 0.58 0.94 | turns anticlockwise 1.6°/s, pans (-1.6%, +0.1%)/s, points wander |
| scene_02 | #1 | 2.8–4.8s | #683c1c | #aec0b2, centre (0.68, 0.47), radius 0.25 | #e9eceb #0e5826 #cd9264 | 82 | 0.38 0.04 0.88 0.96 | morphs in from the last scene, pans (-0.7%, +0.1%)/s, points wander |
| scene_03 | #2 | 4.8–8.3s | #d38f3c | #c9b788, centre (0.21, 0.70), radius 0.29 | #de580d #e1cd9b #913412 | 224 | 0.10 0.29 0.59 0.70 | turns anticlockwise 0.7°/s, pans (-0.5%, -0.1%)/s |
| scene_04 | #2 | 8.3–10.9s | #d48f3a | #e3c7b1, centre (0.63, 0.55), radius 0.22 | #eeece9 #a84a0e #d7bd85 | 103 | 0.40 0.28 0.90 0.74 | morphs in from the last scene, turns anticlockwise 2.2°/s, pans (-2.0%, -0.1%)/s, points wander |
| scene_05 | #3 | 10.9–15.6s | #e39eac | #da3852, centre (0.73, 0.51), radius 0.54 | #db3a54 #e8d7da | 21 | 0.41 0.02 0.59 0.98 | turns clockwise 1.0°/s, pans (-0.9%, +0.2%)/s |
| scene_06 | #4 | 15.6–17.9s | #436d40 | #8b0012, centre (0.24, 0.44), radius 0.49 | #8c0013 #370b0b #84c944 | 132 | 0.01 0.04 0.50 0.96 | turns clockwise 2.2°/s, pans (+1.4%, -0.2%)/s |
| scene_07 | #4 | 17.9–20.8s | #523229 | #c6b8b8, centre (0.68, 0.46), radius 0.26 | #187042 | 6 | 0.50 0.01 0.68 0.99 | morphs in from the last scene, zoom in 3%/s, turns anticlockwise 10.6°/s, pans (-5.4%, +0.5%)/s, points wander |
| scene_08 | #5 | 20.8–22.8s | #8c0012 | #cb8790, centre (0.65, 0.44), radius 0.22 | — | — | — | — |
| scene_09 | #5 | 22.8–24.6s | #8c0012 | #a02333, centre (0.59, 0.41), radius 0.22 | — | — | — | morphs in from the last scene, zoom out 67%/s, pans (+12.4%, -2.7%)/s |
| scene_10 | #5 | 24.6–27.9s | #8c0012 | #b95d69, centre (0.54, 0.48), radius 0.22 | — | — | — | morphs in from the last scene, zoom in 133%/s, turns anticlockwise 151.0°/s, pans (+6.1%, +4.7%)/s |

When built, score it with `rea-video compare original remake --scenes frames/scenes.json -o dir` (each side's drawn layer is taken against its own ground, so a new ground colour still compares) and fix the lowest-scoring scenes first, from `compare_worst.jpg`.

Per-shot motion timeline (measured: positions in % of frame width / height, colours sampled once the element settles; read together with the key-frame strip)

**Motion #1 0.0–4.8s · 3 events**

- Ground #853a17; other main colours #02572b #e8edf0 #4f200e #b7bdad; drawn layer #edefee #bdb79b #c07845 #103f1e
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- S1. never moves: shape / text block · x 76%–84%, y 12%–16% · #02572c · text “fun / PART” · [crop](shots/shot_001_st_01.jpg)
- S2. never moves: shape / text block · x 58%–62%, y 64%–66% · #016532 · [crop](shots/shot_001_st_02.jpg)
- S3. never moves: shape / text block · x 13%–20%, y 82%–84% · #853a16 · text “Filled with” · [crop](shots/shot_001_st_03.jpg)
- S4. never moves: shape / text block · x 22%–27%, y 82%–84% · #853a16 · text “Filled with / Hazelnut cream” · [crop](shots/shot_001_st_04.jpg)
- [crop L1](shots/shot_001_ly_01.jpg) [crop L2](shots/shot_001_ly_02.jpg) · Continuous layer: 26% of the frame moves through the whole shot (x 9%–89%, y 6%–90%), e.g. drifting gradients, particle flow, breathing glow
1. 0.07–2.87s · middle left (x 2%–62%, y 26%–72%) · changes, unfolds leftward (draw-on / grow / wipe), ease-in-out · #895c2f · text “CONES / milk chocolate / IZED” · [crop](shots/shot_001_el_01.jpg)
2. 2.73–4.53s · middle right (x 56%–93%, y 30%–74%) · changes, moves upward, linear · #afbdac · text “CONES / milk chocolate / +the” · [crop](shots/shot_001_el_02.jpg)
3. 4.47–4.73s · bottom (x 0%–100%, y 85%–100%) · changes, moves rightward, ease-in · #dca26a · text “Hazelnut cream / & Milk chocolate / Chocolate” · [crop](shots/shot_001_el_03.jpg)

**Motion #2 4.8–10.9s (wipe in) · 3 events**

- Ground #c1a66f; other main colours #f37d05 #eeeae7 #d56718 #e4c9aa; drawn layer #f3eeea #e4c69a #dd5a09 #8f4115
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- S1. never moves: shape / text block · x 0%–71%, y 55%–100% · #f67d02 · text “te chocolate / IZED / Filled with” · [crop](shots/shot_002_st_01.jpg)
- S2. never moves: shape / text block · x 58%–62%, y 64%–66% · #ec8233 · [crop](shots/shot_002_st_02.jpg)
- S3. never moves: shape / text block · x 0%–7%, y 99%–100% · #bba169 · [crop](shots/shot_002_st_03.jpg)
- [crop L1](shots/shot_002_ly_01.jpg) [crop L2](shots/shot_002_ly_02.jpg) · Continuous layer: 24% of the frame moves through the whole shot (x 9%–89%, y 6%–90%), e.g. drifting gradients, particle flow, breathing glow
1. 4.87–5.00s · top (x 0%–71%, y 0%–55%) · changes, moves upward, instant · #c3a66e · text “CONES / te chocolate / colate” · [crop](shots/shot_002_el_01.jpg)
2. 5.47–7.87s · middle (x 4%–76%, y 26%–55%) · changes, moves rightward, ease-in-out · #e4a15b · text “CONES / te chocolate / colate” · [crop](shots/shot_002_el_02.jpg)
3. 5.53–7.80s · middle left (x 16%–38%, y 57%–74%) · changes, scales up, ease-in-out · #cfa24d · [crop](shots/shot_002_el_03.jpg)

**Motion #3 10.9–15.6s (wipe in) · 2 events**

- Ground #e74c57; other main colours #9b0512 #e8cace #e7e3e6 #d3888a; drawn layer #dd4c54 #eacdd0 #f1ecef #73241e
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- S1. never moves: vertical line · x 49%–51%, y 0%–28% · #edcdd1 · [crop](shots/shot_003_st_01.jpg)
- S2. never moves: shape / text block · x 78%–82%, y 11%–16% · #fff9fc · text “PART / fun” · [crop](shots/shot_003_st_02.jpg)
- S3. never moves: vertical line · x 49%–51%, y 71%–100% · #edcdd1 · [crop](shots/shot_003_st_03.jpg)
- [crop L1](shots/shot_003_ly_01.jpg) [crop L2](shots/shot_003_ly_02.jpg) · Continuous layer: 20% of the frame moves through the whole shot (x 11%–89%, y 6%–90%), e.g. drifting gradients, particle flow, breathing glow
1. 10.95–11.01s · middle (x 24%–49%, y 0%–100%) · disappears, instant · #c3a66e · text “Dark chocolate / & Marshmallow” · [crop](shots/shot_003_el_01.jpg)
2. 13.21–15.35s · middle right (x 56%–93%, y 29%–73%) · changes, moves rightward, linear · #e07467 · text “NES / ARSMMALLOW / ELGI” · [crop](shots/shot_003_el_02.jpg)

**Motion #4 15.6–20.8s (wipe in) · 2 events**

- Ground #0c6443; other main colours #9b0512 #471b17 #e4e2e5 #6f3932; drawn layer #efedef #5c983b #790811 #beaea8
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- [crop L1](shots/shot_004_ly_01.jpg) [crop L2](shots/shot_004_ly_02.jpg) · Continuous layer: 29% of the frame moves through the whole shot (x 9%–89%, y 6%–90%), e.g. drifting gradients, particle flow, breathing glow
1. 15.71–15.77s · middle (x 49%–67%, y 0%–100%) · changes, instant · #126544 · text “nes / OCOLATE / ZED” · [crop](shots/shot_004_el_01.jpg)
2. 19.37–20.77s · middle left (x 4%–40%, y 26%–65%) · changes, unfolds leftward (draw-on / grow / wipe), ease-in · #602b23 · [crop](shots/shot_004_el_02.jpg)

**Motion #5 20.8–27.9s (wipe in) · 0 events**

- Ground #980510; other main colours #9d0611 #fbf7fa #ac3542 #be6771; drawn layer #fefbfd #f2d1d6 #e3a3ab #c7717c
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- [crop L1](shots/shot_005_ly_01.jpg) [crop L2](shots/shot_005_ly_02.jpg) · Continuous layer: 5% of the frame moves through the whole shot (x 27%–96%, y 39%–54%), e.g. drifting gradients, particle flow, breathing glow

### Real material in the picture (the original files are needed)

4 shots, 20.84s (75%) contain real material (screen recordings, screenshots, photos, embedded video); a model cannot stand in for them:

- **product photo** (part of the frame): shots #1–#4, 20.8s in all
- **photo** (part of the frame): shots #1–#4, 20.8s in all
- **logo / brand mark** (part of the frame): shots #1–#4, 20.8s in all
