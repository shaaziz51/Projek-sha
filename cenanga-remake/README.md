# JRM product ads — 17 s remakes

Rebuilds of the "REFRESH Orange" Pinterest ad's structure (same 12 shots, layout,
camera moves, transitions and cut points, time-compressed from 38.4 s to 17 s) for
JRM products. Built in code with [Remotion](https://www.remotion.dev). One set of
scenes, one config per product:

| Product | Config | Ad | Side-by-side with the original | Stills |
|---|---|---|---|---|
| JRM Cenanga Aromatherapy Oil | `src/products/cenanga.ts` | `out/cenanga_17s.mp4` | `out/cenanga_side_by_side.mp4` | `out/cenanga_same_moment_stills.jpg` |
| JRM Putik Telaga Dara Feminine Wash | `src/products/putik.ts` | `out/putik_17s.mp4` | `out/putik_side_by_side.mp4` | `out/putik_same_moment_stills.jpg` |

All ads are 1080×1920, 30 fps, 17.0 s. In the side-by-side the original is sped up 2.26× so the cuts line up.

## Edit and re-render

```bash
npm install
npm run render:putik                                    # -> out/putik_17s.mp4  (render:cenanga, or render for both)
bash tools/compare.sh /path/to/original.mp4 putik       # -> out/putik_side_by_side.mp4 + stills
npm run studio                                          # live preview / scrub in the browser
```

- **On-screen copy, colours, images and footage** for a product are all in its file in `src/products/`. Change a line and re-render; text that gets longer shrinks automatically to stay inside the frame.
- **Closing caption** ("Swipe to our profile... @Kak_sha_jrm") is `cta` in each product config: it shows from the "Order Now" shot through the end card (13.9–17.0 s). Set it to `null` to remove it.
- **Shared timing** (the 12 cut points) is in `src/copy.ts`; scenes are in `src/scenes.tsx`, helpers in `src/lib.tsx`.
- **Add a product:** copy `src/products/putik.ts`, change it, and add it to `PRODUCTS` in `src/copy.ts`. It appears as a new composition, and you add a `render:<name>` script like the existing ones.
- The render uses the pre-installed headless Chromium at `/opt/pw-browsers/...`; on your own machine, drop the `--browser-executable` flag from `package.json` and Remotion downloads its own.

## Shot map

Cut points are the original's frame numbers × 17 / 38.43.

| # | Time (s) | Original | Cenanga | Putik |
|---|---|---|---|---|
| 1 | 0.0–1.4 | Oranges fly in, "Designed to / Hydrate / & Revive!" | Mint + ice, "Designed to / **Relieve** / & Refresh!" | Betel + guava leaves, "Designed to / **Freshen** / & Protect!" |
| 2 | 1.4–2.6 | "Infused with Vitamin C" | "Infused with / Menthol & / Camphor" | "Infused with / Guava Leaf / Extract" |
| 3 | 2.6–3.9 | "Your zestful dose of energy is here!" | "Your cooling dose of relief is here!" | "Your gentle dose of freshness is here!" |
| 4 | 3.9–6.7 | Product reveal, "Meet the all-new", wordmark | Bottle + box, "Meet the all-new", Cenanga wordmark | Box + bottle, "Meet the improved", Putik wordmark |
| 5 | 6.7–7.9 | "Packed with essential electrolytes", Na / K / Mg | "...soothing herbal aromas", Menthol / Camphor / Cooling | "...natural herbal goodness", Guava Leaf / Mg / Herbal Blend |
| 6 | 7.9–8.9 | **Live:** tablet fizzing in a glass | **Stand-in:** bottle macro, ice drops and bursts | **Stand-in:** same, with the Putik bottle |
| 7 | 8.9–9.9 | **Live:** athlete drinking, "Tasty" > "Tangy" | **Stand-in:** tinted mint, "Cool" > "Aromatic" | **Stand-in:** tinted betel leaves, "Cooling" > "Refreshing" |
| 8 | 9.9–10.5 | **Live:** athlete punching, "Instant Energy" | **Stand-in:** tinted ice, "Instant Relief" | **Stand-in:** tinted guava leaves, "Long-Lasting Freshness" |
| 9 | 10.5–12.8 | Tube + 5 benefit callouts | Headache, Nausea, Wind, Breathing, Massage | Itching, Discharge, Odour Control, pH Balanced, Post-Natal Care |
| 10 | 12.8–13.9 | "With Ultimate Rehydration Made For All!" | "With Ultimate Freshness Made For Every Day!" | "Cooling Sensation That Lasts Longer & Refreshing!" (your tagline) |
| 11 | 13.9–15.9 | Tilted tubes + "Order Now" | Tilted bottles + "Order Now" | Tilted bottles + "Order Now" |
| 12 | 15.9–17.0 | food strong logo | JRM Holistik logo | JRM Holistik logo |
| + | 13.9–17.0 | — | Caption card: "Swipe to our profile and buy it on the showcase. @Kak_sha_jrm" | same |

Cenanga's "Made For All!" became "Made For Every Day!" because it contains menthol and camphor,
and the notes say to use it on children and babies only with care.

## Replacing the three live-action stand-ins (shots 6–8)

Put a clip in `public/footage/` and name it under `footage` in the product's config
(e.g. `shot06: 'footage/putik_shot06.mp4'`). Text and the brand tint stay on top. On-screen lengths:
6 = 1.03 s, 7 = 0.97 s, 8 = 0.67 s; shoot or generate about 3 s each and trim.

### Cenanga

Shooting plan (a phone is fine):
- **Shot 6 (macro):** roll the bottle across an inner wrist or temple, white background, soft backlight, slow push-in.
- **Shot 7 (medium close-up):** a tired person at a desk or in a car rubs oil onto their temple and exhales.
- **Shot 8 (close-up):** the same person, eyes closed, takes a deep breath and opens them refreshed.

AI-video prompts (attach the product photo as the reference image):
- Shot 6: `Macro close-up on a white seamless background: a hand rolls a frosted white roll-on bottle with a gold cap across the inside of a wrist, leaving a thin glossy line of oil; soft backlight, shallow depth of field, slow push-in.`
- Shot 7: `Medium close-up, slightly low angle: a tired woman in a car passenger seat rubs aromatherapy oil onto her temple with two fingers and exhales slowly, eyes half closed; soft side light, dim background, gentle handheld drift.`
- Shot 8: `Close-up, eye level: the same woman takes a deep breath with eyes closed, then opens them and looks into the camera, relaxed and refreshed; hair moves slightly in a breeze; soft side light, slight push-in.`

### Putik

Keep these product-only or gently lifestyle; no intimate close-ups.

Shooting plan:
- **Shot 6 (macro):** a hand presses the gold pump and a clear gel pools in the palm, water droplets around; cream background, soft backlight, slow push-in.
- **Shot 7 (medium close-up):** a woman in a soft robe in a bright bathroom, fresh and relaxed, eyes closing as she smiles.
- **Shot 8 (close-up):** the same woman, a calm confident smile to camera.

AI-video prompts:
- Shot 6: `Macro close-up on a cream background: a hand presses the gold pump of an olive-green glass bottle and a clear gel pools in the palm, tiny water droplets on the bottle; soft backlight, shallow depth of field, slow push-in.`
- Shot 7: `Medium close-up: a woman in a soft white robe in a bright, clean bathroom closes her eyes and smiles, looking fresh and relaxed; morning window light, gentle handheld drift.`
- Shot 8: `Close-up, eye level: the same woman opens her eyes and gives a calm, confident smile to the camera; soft window light, slight push-in.`

## Assets

- `public/img/` (Cenanga, plus shared items): your product shot (already transparent), bottle and box split from it, the Cenanga wordmark cut from the packaging (`tools/brand_crops.py`), the ice cube (`tools/ice_matte.py`), mint, camphor and candy cut-outs (`tools/cutout.py`), and the shared JRM Holistik end-card logo (`logo_src.jpg`, made transparent by `tools/logo_alpha.py`).
- `public/putik/img/`: the Putik product shot (already transparent), the bottle split from the box (`tools/split_putik.py`), the Putik wordmark (`tools/brand_crops.py public/putik/img/product_src.webp 352,262,690,472 public/putik/img/wordmark.png 1.5 2`), betel, tea-leaf and guava cut-outs (`tools/cutout.py ... green`), and a round crop of the flower photo for the "Herbal Blend" coin. That photo is only 400×300, so it's too small to use full-screen.
- `public/audio/`: placeholder music (about 100 BPM, F major, like the original) and dings / whooshes at the original's cue points, synthesised by `tools/make_audio.py`, so there are no licensing issues. Both ads share it; swap in a licensed track before publishing if you prefer.
- Fonts: Nunito via `@fontsource` (Open Font License).
