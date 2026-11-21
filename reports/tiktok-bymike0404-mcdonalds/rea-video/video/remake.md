---
videomd: 1
part: remake
tokens: 5623
---

## Remake plan

### Step by step

This is a motion-graphics explainer. Do the steps in this order; the detail for each is in the matching subsection below.

1. **Write the content**: write yours in the same 10 steps as the original (narrative line under “Content and structure”)
2. **Collect material**: the real material in the picture (logo / brand mark, product photo) needs the original files, listed under “What to prepare”
3. **Voice**: the original is TTS voice-over; record it yourself or use TTS
4. **Motion graphics**: have the agent run `rea-video code-remake` for an editable first version and change the text and pictures on top of it rather than starting from scratch; the first version is only a start, where it differs from the original is under “Code build”
5. **Music**: find a track at the same tempo and mood (source: to confirm, about 142 BPM, F major)
6. **Sound effects**: 3; place similar ones from a library at the times under “Sound”
7. **Put it together and compare**: hand the shots you made to the agent; `rea-video remake` places them on the original timeline, keeps the original where yours are missing, and renders a side-by-side comparison with the original

**1 3D render shot → 1 generation unit, 1 Seedance 2.0 call (plus 1 shot reusing the same clip, just cut); code render / screen capture 14 shots → 1 code project (2 parts)**

### Generation units

- Grouping: consecutive shots share a call where they fit, ≤15s per call; a long stretch is cut at a scene change first
- Inputs: the source stretch, subtitles erased, is the reference video; the model follows its shots, camera and pacing
- Audio: the model can generate action sound effects and ambience along with the picture; voice-over is better done as separate TTS and mixed in, so copy and timing stay editable

| Unit | Shots | Time | Length | Feed | Prompt |
|---|---|---|---|---|---|
| G1 | #1 | 0.0–1.7s | 1.7s | reference video | draft |

**G1 · shots #1 · 1.7s · remix of the source**

| Input | Needed | From | Why |
|---|---|---|---|
| text prompt | yes | see the prompt below | final version in this model's format (remake/prompts.json) |
| reference video | yes | `@视频1` source 0.0–1.7s (subtitles and stickers erased) | the model copies its cuts, camera and action and makes the stretch in one go |

Draft prompt (generic; rewrite it in Seedance 2.0's format into remake/prompts.json before generating):

```text
@视频1 is the source: follow its shots (count, length, size, camera, movement, action and cutting rhythm) and change only what is written below. 2048:1080; night / low-light ambient, no dedicated fill, soft light (almost no lit / shadow edge), warm (about 3000–4000K), background clearly blurred (shallow depth of field / portrait mode). No subtitles, captions or watermarks in the picture.
Centered medium shot, slow push-in. A red Happy Meal box on a round pedestal rotates from side view to front view under two arch-shaped yellow spotlights, tilts back, and a cheeseburger pops out and rises above the box, glowing.
```

### Code composition

Rebuild it as one project in an HTML video framework (such as HyperFrames or Remotion): cuts, transitions and each shot's key frames from "Rhythm and key frames", layout, colours and elements from the scenes below. Text and UI are 100% controllable, changing copy is a data change, and an AI coding assistant can write the project.

`rea-video code-remake <breakdown folder>` only makes a quick draft: it renders `code/remake.mp4` from each scene's sampled points / cut-out, motion and background glow and scores it. Particles, point clouds and data visualisations on a dark ground come close; an illustrated character's acting and morph transitions do not.

- Part 1: shots #2–#8 (1.7–10.4s)
- Part 2: shots #10–#16 (10.5–21.4s)

Remake assets (all in the report folder; hand them over together with the data below to whoever writes the code, or to an LLM):
- `shots/shot_XXX_first.jpg` / `_last.jpg`: first / last frame of each shot at full size, for layout, type size and margins
- `shots/shot_XXX_strip.jpg`: key frames about every 0.5 s, to follow the animation
- `shots/shot_XXX_elements.jpg` and `_el_NN.jpg` / `_st_NN.jpg` / `_ly_NN.jpg`: full-size crop of every element once settled, numbered as in the motion timeline; redraw shapes from them, cut out icons, logos and illustrations that cannot be redrawn
- `packaging/overlays.ass`, `packaging/timeline.json`: timing, position and colour of the text

How to build the pictures (by the measured picture type):
- vector shapes: SVG shapes + interpolate() / spring() keyframes, positions and timing measured from the frame
- kinetic type: Word-by-word spring() entrances (offset + scale + opacity), highlight boxes on key words; match font, size and leading from the frame
- gradients / colour fields: CSS linear / radial gradients, or a few large circles with filter: blur() drifting slowly; glass cards with backdrop-filter
- procedural colour field: GLSL fragment shader (fractal / noise / plasma) via Three.js ShaderMaterial or a WebGL canvas, time passed as a uniform each frame

| Shot | Time | Build | Picture | Camera | Colours | On-screen text |
|---|---|---|---|---|---|---|
| #2 | 1.7–2.2s | vector shapes | Hard pop from the rising burger into a white star-shaped comic burst on a red/yellow sunburst. Burger ingredients and fries explode outward and spin, then the frame whip-pans right with motion blur into the red question-mark scene. | push in 69%/s, picture drifts left, rotates | red, orange | — |
| #3 | 2.2–3.6s | kinetic type | Deep red background with a large darker question mark. White 'Somebody say' animates in word by word, then 'McDonald's' in big bold yellow slides in under it, while golden fries and a large fry stick fly diagonally across the frame. At ~3.3s a dark rounded rectangle opens in the centre and grows into the yellow web card (zoom transition). | push in 12%/s, picture drifts left | ground #85011b · #bc0f29 #a20624 #f2d373 #eda528 · drawn #f4d570 #fae8d2 #f3b018 #e48d73 | Big |
| #4 | 3.6–5.9s | kinetic type | Yellow rounded web-page card with soft drop shadow on a dark red vignette background, nav bar and red M logo tile at top. The card zooms up to fill most of the frame, then the hero product swaps on beat: Daily Double -> Double Quarter Pounder with Cheese -> McDouble -> Pounder with Cheese -> Big Mac, each with large white stacked type on the right. Ends with the card scaling up and blurring out. | push in 6%/s, picture drifts up | ground #700619 · #f6c64e #efd192 #d5af66 #9b694d · drawn #f6c654 #e8be10 #efd49a #fdf9ee | with / Cheese / M / Our Menu / Dowload App / McDelive |
| #5 | 5.9–6.6s | gradients / colour fields | Empty dark red vignette with a large yellow arrow cursor in the centre; the Order Now card slides in diagonally from the top-left corner toward the cursor. | pull out 26%/s, picture drifts right | ground #6f0d12 · #851015 #f7c855 #efc413 · drawn #f9c751 #f8ce0c #ed8e10 #e7d7c4 | NOW |
| #6 | 6.6–7.9s | gradients / colour fields | Close-up of the yellow card with a large red pill button 'Order Now'. The yellow cursor enters bottom-right, moves onto the button and clicks; the button squashes, the card shrinks and the button flies to the centre with motion blur. | pull out 14%/s, picture drifts right | ground #6d0e13 · #eac010 #f6c751 #7e1317 #c02f1d · drawn #eac00a #f9c74f #f8e111 | — |
| #7 | 7.9–9.2s | kinetic type | Hard cut on the click to a big yellow cartoon McDonald's fries box/bag (black outline, purple Golden Arches) bouncing in the centre over spinning red and yellow sunburst rays. White bold text 'just' then 'eat' pops in under it on the beat. | static frame, elements move inside it | ground #6c1016 · #801214 #f6ce35 #eaab12 #99452a · drawn #f8cf2a #f0af0b #f9d873 | just eat / M / i'm lovin' it |
| #8 | 9.2–10.4s | procedural colour field | Flat McDonald's red end card, small yellow Golden Arches with 'i'm lovin' it' under it, centred, with a slow subtle scale. At the end the logo blurs/streaks down into the next loop. | push in 7%/s, picture drifts left | ground #c30f14 · #cd5319 #a92213 #961310 #7c1010 · drawn #ebb80e #db722a #7f0f10 #f5b5b9 | M / i'm lovin' it |
| #10 | 10.5–11.1s | kinetic type | Same ingredient burst on sunburst as shot 2, ending in the whip-pan. | push in 68%/s, picture drifts left, rotates | red, orange | Somebody / W |
| #11 | 11.1–14.7s | kinetic type | Repeat of shots 3+4 combined: 'Somebody say McDonald's' kinetic type with flying fries (11.07-12.3s), zoom into the yellow web card (12.3-12.6s), product carousel Big Mac -> Daily Double -> Double Quarter Pounder with Cheese -> McDouble -> Pounder with Cheese -> Big Mac, then defocus blur out. | push in 6%/s, picture drifts left | ground #710719 · #f4c64b #f0d791 #b28448 #8d5a3d · drawn #f5c555 #eab812 #f0d39d #fdf5ec | M / Our Menu / Dowload App / McDelivery / About Our Foo / About Our Food |
| #12 | 14.7–15.4s | gradients / colour fields | Same as shot 5: cursor on dark red, card slides in from top-left. | pull out 26%/s, picture drifts right, rotates | ground #6b0f12 · #831115 #8a1116 #781013 #f7c855 · drawn #f9c851 #f7ce0c #ed8e0f #e7d7c3 | r Now |
| #13 | 15.4–16.8s | gradients / colour fields | Same as shot 6: cursor clicks the red 'Order Now' button. | pull out 15%/s, picture drifts right | ground #6d0e13 · #eac010 #f6c751 #7e1317 #c02f1d · drawn #ecc40b #f8c74f | Order Now |
| #14 | 16.8–18.0s | kinetic type | Same as shot 7: cartoon M fries box on sunburst, 'just eat'. | static frame, elements move inside it | ground #6c1016 · #801214 #f5cd2d #eaab18 #99452a · drawn #f7cb29 #eca80c #f6d270 | M |
| #15 | 18.0–19.4s | procedural colour field | Same McDonald's 'i'm lovin' it' red end card as shot 8. | push in 7%/s, picture drifts left | ground #c21416 · #c30f11 · drawn #ebbc0d #eb8160 #facbcf #bb671b | M / i'm lovin' it |
| #16 | 19.4–21.4s | procedural colour field | Hard cut to the creator's own logo: a yellow line-art face of a boy with a side fringe, winking and smiling, centred on McDonald's red, held for 2s. | static | ground #c21413 · #c30f11 #e9bf0e · drawn #eabf0a #fc9a33 #d58007 #f26f2f | — |

**Picture scenes** (a new scene whenever what is drawn moves or changes shape as a whole inside a shot. `frames/` holds first / middle / last full-size frames per scene, `scene_XX_layer.png` the drawn layer of the middle frame (background and text removed, alpha by how strongly it stands out), `frames/points/scene_XX.json` samples of that layer, one `x y r g b a` per row with x, y in 0–1. Place particles, trace lines or redraw shapes from these instead of guessing from a description. `track` in `frames/scenes.json` follows the layer's centre and spread over time)

| Scene | Shot | Time | Ground | Background glow | Drawn colours | Pieces | Area (x0 y0 x1 y1) | Motion |
|---|---|---|---|---|---|---|---|---|
| scene_02 | #5 | 5.9–6.6s | #780f12 | #ecb93f, centre (0.18, 0.22), radius 0.16 | #f7c753 #eac20b | 5 | 0.01 0.01 0.35 0.43 | — |
| scene_03 | #6 | 6.6–7.9s | #821016 | #f9c84f, centre (0.39, 0.38), radius 0.34 | #ebc30a #f8c851 | 4 | 0.03 0.06 0.82 0.82 | pans (-4.8%, -4.3%)/s, points wander |
| scene_05 | #12 | 14.7–15.4s | #780f12 | #edba3f, centre (0.17, 0.20), radius 0.15 | #f9c851 #ebbd0c #ebdec0 | 3 | 0.01 0.03 0.45 0.40 | zoom out 18%/s, turns anticlockwise 10.1°/s, pans (+4.6%, +11.0%)/s |
| scene_06 | #13 | 15.4–16.8s | #821015 | #f9c84f, centre (0.39, 0.38), radius 0.34 | #ebc30a #f8c851 | 7 | 0.03 0.06 0.82 0.82 | zoom out 5%/s, turns clockwise 4.8°/s, pans (-3.4%, -5.6%)/s |
| scene_07 | #16 | 19.4–21.4s | #c50d15 | #d76410, centre (0.52, 0.43), radius 0.08 | #eac20a #f3a91f | 7 | 0.42 0.33 0.58 0.54 | near still |

When built, score it with `rea-video compare original remake --scenes frames/scenes.json -o dir` (each side's drawn layer is taken against its own ground, so a new ground colour still compares) and fix the lowest-scoring scenes first, from `compare_worst.jpg`.

Per-shot motion timeline (measured: positions in % of frame width / height, colours sampled once the element settles; read together with the key-frame strip)

**Motion #2 1.7–2.2s · 0 events**

- No element motion measured (still picture or only slight changes)

**Motion #3 2.2–3.6s (whip pan in) · 1 events**

- Ground #85011b; other main colours #bc0f29 #a20624 #f2d373 #eda528; drawn layer #f4d570 #fae8d2 #f3b018 #e48d73
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- [crop L1](shots/shot_003_ly_01.jpg) [crop L2](shots/shot_003_ly_02.jpg) · Continuous layer: 45% of the frame moves through the whole shot (x 4%–100%, y 4%–100%), e.g. drifting gradients, particle flow, breathing glow
1. 2.30–2.97s · middle right (x 73%–100%, y 0%–70%) · changes, moves leftward, ease-out · #91001e · [crop](shots/shot_003_el_01.jpg)

**Motion #4 3.6–5.9s (zoom in) · 0 events**

- Ground #700619; other main colours #f6c64e #efd192 #d5af66 #9b694d; drawn layer #f6c654 #e8be10 #efd49a #fdf9ee
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- [crop L1](shots/shot_004_ly_01.jpg) [crop L2](shots/shot_004_ly_02.jpg) · Continuous layer: 51% of the frame moves through the whole shot (x 9%–91%, y 4%–100%), e.g. drifting gradients, particle flow, breathing glow

**Motion #5 5.9–6.6s (blur in) · 0 events**

- Ground #6f0d12; other main colours #851015 #f7c855 #efc413; drawn layer #f9c751 #f8ce0c #ed8e10 #e7d7c4
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- [crop L1](shots/shot_005_ly_01.jpg) [crop L2](shots/shot_005_ly_02.jpg) · Continuous layer: 6% of the frame moves through the whole shot (x 0%–56%, y 0%–70%), e.g. drifting gradients, particle flow, breathing glow

**Motion #6 6.6–7.9s · 0 events**

- Ground #6d0e13; other main colours #eac010 #f6c751 #7e1317 #c02f1d; drawn layer #eac00a #f9c74f #f8e111
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- S1. never moves: shape / text block · x 0%–9%, y 0%–8% · #f9c74f · [crop](shots/shot_006_st_01.jpg)
- S2. never moves: shape / text block · x 62%–80%, y 0%–38% · #f9c74f · [crop](shots/shot_006_st_02.jpg)
- S3. never moves: shape / text block · x 93%–100%, y 0%–19% · #640a0f · [crop](shots/shot_006_st_03.jpg)
- S4. never moves: shape / text block · x 0%–62%, y 4%–34% · #eac00a · [crop](shots/shot_006_st_04.jpg)
- S5. never moves: shape / text block · x 0%–40%, y 21%–77% · #f9c74f · [crop](shots/shot_006_st_05.jpg)
- S6. never moves: shape / text block · x 78%–80%, y 43%–55% · #eac00a · [crop](shots/shot_006_st_06.jpg)
- S7. never moves: shape / text block · x 20%–64%, y 64%–77% · #eac00a · [crop](shots/shot_006_st_07.jpg)
- S8. never moves: shape / text block · x 0%–5%, y 94%–100% · #630a0f · [crop](shots/shot_006_st_08.jpg)
- [crop L1](shots/shot_006_ly_01.jpg) [crop L2](shots/shot_006_ly_02.jpg) · Continuous layer: 36% of the frame moves through the whole shot (x 0%–89%, y 0%–96%), e.g. drifting gradients, particle flow, breathing glow

**Motion #7 7.9–9.2s (zoom in) · 2 events**

- Ground #6c1016; other main colours #801214 #f6ce35 #eaab12 #99452a; drawn layer #f8cf2a #f0af0b #f9d873
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- [crop L1](shots/shot_007_ly_01.jpg) [crop L2](shots/shot_007_ly_02.jpg) · Continuous layer: 61% of the frame moves through the whole shot (x 0%–100%, y 0%–91%), e.g. drifting gradients, particle flow, breathing glow
1. 8.00–8.80s · middle right (x 64%–76%, y 35%–56%) · changes, moves downward, ease-out · #881015 · [crop](shots/shot_007_el_01.jpg)
2. 8.07–8.33s · bottom right (x 60%–100%, y 74%–100%) · changes, moves downward, ease-out · #f7ca28 · [crop](shots/shot_007_el_02.jpg)

**Motion #8 9.2–10.4s · 0 events**

- Ground #c30f14; other main colours #cd5319 #a92213 #961310 #7c1010; drawn layer #ebb80e #db722a #7f0f10 #f5b5b9
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- S1. never moves: shape / text block · x 47%–53%, y 42%–55% · #eac00a · [crop](shots/shot_008_st_01.jpg)
- [crop L1](shots/shot_008_ly_01.jpg) [crop L2](shots/shot_008_ly_02.jpg) · Continuous layer: 4% of the frame moves through the whole shot (x 42%–58%, y 35%–65%), e.g. drifting gradients, particle flow, breathing glow

**Motion #10 10.5–11.1s · 0 events**

- No element motion measured (still picture or only slight changes)

**Motion #11 11.1–14.7s (whip pan in) · 1 events**

- Ground #710719; other main colours #f4c64b #f0d791 #b28448 #8d5a3d; drawn layer #f5c555 #eab812 #f0d39d #fdf5ec
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- [crop L1](shots/shot_011_ly_01.jpg) [crop L2](shots/shot_011_ly_02.jpg) · Continuous layer: 59% of the frame moves through the whole shot (x 9%–91%, y 4%–100%), e.g. drifting gradients, particle flow, breathing glow
1. 13.67–14.13s · middle (x 18%–84%, y 17%–91%) · changes, moves rightward, ease-in-out · #e4c04f · text “Somebody say / McDonalc / McDonard'” · [crop](shots/shot_011_el_01.jpg)

**Motion #12 14.7–15.4s (blur in) · 0 events**

- Ground #6b0f12; other main colours #831115 #8a1116 #781013 #f7c855; drawn layer #f9c851 #f7ce0c #ed8e0f #e7d7c3
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- [crop L1](shots/shot_012_ly_01.jpg) [crop L2](shots/shot_012_ly_02.jpg) · Continuous layer: 6% of the frame moves through the whole shot (x 0%–56%, y 0%–70%), e.g. drifting gradients, particle flow, breathing glow

**Motion #13 15.4–16.8s · 0 events**

- Ground #6d0e13; other main colours #eac010 #f6c751 #7e1317 #c02f1d; drawn layer #ecc40b #f8c74f
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- S1. never moves: shape / text block · x 0%–9%, y 0%–8% · #f9c74f · [crop](shots/shot_013_st_01.jpg)
- S2. never moves: shape / text block · x 62%–80%, y 0%–38% · #f9c74f · [crop](shots/shot_013_st_02.jpg)
- S3. never moves: shape / text block · x 93%–100%, y 0%–27% · #630a0f · [crop](shots/shot_013_st_03.jpg)
- S4. never moves: shape / text block · x 0%–62%, y 4%–34% · #eac00a · [crop](shots/shot_013_st_04.jpg)
- S5. never moves: shape / text block · x 0%–40%, y 21%–77% · #f9c74f · [crop](shots/shot_013_st_05.jpg)
- S6. never moves: shape / text block · x 78%–80%, y 43%–55% · #eac00a · [crop](shots/shot_013_st_06.jpg)
- S7. never moves: shape / text block · x 20%–64%, y 64%–77% · #eac00a · [crop](shots/shot_013_st_07.jpg)
- S8. never moves: shape / text block · x 0%–7%, y 94%–100% · #630a0f · [crop](shots/shot_013_st_08.jpg)
- [crop L1](shots/shot_013_ly_01.jpg) [crop L2](shots/shot_013_ly_02.jpg) · Continuous layer: 36% of the frame moves through the whole shot (x 0%–89%, y 0%–96%), e.g. drifting gradients, particle flow, breathing glow

**Motion #14 16.8–18.0s · 2 events**

- Ground #6c1016; other main colours #801214 #f5cd2d #eaab18 #99452a; drawn layer #f7cb29 #eca80c #f6d270
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- [crop L1](shots/shot_014_ly_01.jpg) [crop L2](shots/shot_014_ly_02.jpg) · Continuous layer: 61% of the frame moves through the whole shot (x 0%–100%, y 0%–91%), e.g. drifting gradients, particle flow, breathing glow
1. 16.83–17.63s · middle right (x 64%–76%, y 35%–56%) · changes, moves downward, ease-out · #881015 · [crop](shots/shot_014_el_01.jpg)
2. 16.90–17.17s · bottom right (x 60%–100%, y 74%–100%) · changes, moves downward, ease-out · #f7ca26 · [crop](shots/shot_014_el_02.jpg)

**Motion #15 18.0–19.4s · 0 events**

- Ground #c21416; other main colours #c30f11; drawn layer #ebbc0d #eb8160 #facbcf #bb671b
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- S1. never moves: shape / text block · x 47%–53%, y 42%–55% · #eac008 · [crop](shots/shot_015_st_01.jpg)
- [crop L1](shots/shot_015_ly_01.jpg) [crop L2](shots/shot_015_ly_02.jpg) · Continuous layer: 4% of the frame moves through the whole shot (x 42%–58%, y 35%–65%), e.g. drifting gradients, particle flow, breathing glow

**Motion #16 19.4–21.4s · 1 events**

- Ground #c21413; other main colours #c30f11 #e9bf0e; drawn layer #eabf0a #fc9a33 #d58007 #f26f2f
Element crops (numbers match the motion list below; L = the continuously moving layer mid-shot and at the end, S = elements that never move), full-size files in `shots/`:

- S1. never moves: shape / text block · x 51%–58%, y 38%–47% · #eac00a · [crop](shots/shot_016_st_01.jpg)
1. 19.50–19.77s · middle (x 40%–62%, y 30%–70%) · changes, ease-out · #ce3f12 · [crop](shots/shot_016_el_01.jpg)

### Real material in the picture (the original files are needed)

4 shots, 8.67s (40%) contain real material (screen recordings, screenshots, photos, embedded video); a model cannot stand in for them:

- **product photo** (part of the frame): shots #4, #11, 6.0s in all
- **logo / brand mark** (part of the frame): shots #4, #8, #11, #15, 8.7s in all
