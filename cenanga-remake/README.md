# JRM Cenanga Aromatherapy Oil — 17 s remake

A rebuild of the "REFRESH Orange" Pinterest ad's structure (same 12 shots, layout,
camera moves, transitions and cut points, time-compressed from 38.4 s to 17 s),
recut for **JRM Cenanga Aromatherapy Oil**. Built in code with [Remotion](https://www.remotion.dev).

| Output | What it is |
|---|---|
| `out/cenanga_17s.mp4` | The rebuilt ad, 1080×1920, 30 fps, 17.0 s |
| `out/side_by_side.mp4` | Original (sped up 2.26× so the cuts line up) next to the rebuild |
| `out/same_moment_stills.jpg` | One original / rebuild pair from the middle of every shot |

## Edit and re-render

```bash
npm install
npm run render                                   # -> out/cenanga_17s.mp4
bash tools/compare.sh /path/to/original.mp4      # -> out/side_by_side.mp4 + stills
npm run studio                                   # live preview / scrub in the browser
```

- **All on-screen copy, colours and cut points** live in `src/copy.ts`. Change a line there and re-render.
- Scenes are in `src/scenes.tsx` (one component per shot), shared pieces in `src/lib.tsx`.
- The render uses the pre-installed headless Chromium at `/opt/pw-browsers/...`; on your own machine, drop the `--browser-executable` flag from `package.json` and Remotion downloads its own.

## Shot map

Cut points are the original's frame numbers × 17 / 38.43.

| # | Time (s) | Original | Rebuild | Built with |
|---|---|---|---|---|
| 1 | 0.0–1.4 | Oranges fly in, "Designed to / Hydrate / & Revive!" | Mint + ice fly in, "Designed to / **Relieve** / & Refresh!" | Code |
| 2 | 1.4–2.6 | "Infused with Vitamin C", orange slices, tablets | "Infused with / Menthol & / Camphor", mint, ice, peppermint candies | Code |
| 3 | 2.6–3.9 | "Your zestful dose of energy is here!" one word at a time | "Your cooling dose of relief is here!" | Code |
| 4 | 3.9–6.7 | Product reveal with juice splash, "Meet the all-new", wordmark | Bottle + box reveal with frost burst, "Meet the all-new", Cenanga wordmark | Code |
| 5 | 6.7–7.9 | "Packed with essential electrolytes", Na / K / Mg coins | "Packed with soothing herbal aromas", Menthol / Camphor / Cooling coins | Code |
| 6 | 7.9–8.9 | **Live:** tablet fizzing in a glass (macro, push-in) | **Stand-in:** macro push-in on the bottle, ice cube drops and bursts | Code (replace with footage) |
| 7 | 8.9–9.9 | **Live:** athlete drinking, mustard tint, "Tasty" > "Tangy" | **Stand-in:** tinted mint close-up, "Cool" > "Aromatic" | Code (replace with footage) |
| 8 | 9.9–10.5 | **Live:** athlete punching, tint, "Instant Energy" | **Stand-in:** tinted ice close-up, "Instant Relief" | Code (replace with footage) |
| 9 | 10.5–12.8 | Tube + 5 benefit callouts with arrows | Bottle + 5 callouts from your product notes | Code |
| 10 | 12.8–13.9 | "With Ultimate Rehydration Made For All!" typed on texture | "With Ultimate Freshness Made For Every Day!" | Code |
| 11 | 13.9–15.9 | Tilted tubes + "Order Now", wipe | Tilted bottles + "Order Now", wipe | Code |
| 12 | 15.9–17.0 | food strong logo | JRM Skin Care logo | Code |

"Made For All!" became "Made For Every Day!" because the product contains menthol and camphor and
the notes say to use it on children and babies only with care.

## Replacing the three live-action stand-ins (shots 6–8)

Put a clip in `public/footage/` and name it in `FOOTAGE` in `src/copy.ts`
(e.g. `shot06: 'footage/shot06.mp4'`). The text and the olive tint stay on top. Shot lengths:
6 = 1.03 s, 7 = 0.97 s, 8 = 0.67 s; shoot or generate about 3 s each and trim.

**Shoot it yourself (phone is fine):**
- **Shot 6 (macro demo):** roll the bottle across an inner wrist or temple, very close, white background, soft window light from behind, slow push-in.
- **Shot 7 (medium close-up):** someone tired at a desk or in a car rubs the oil onto their temple and exhales. Side light, darker background; it gets tinted anyway.
- **Shot 8 (close-up):** the same person, eyes closed, takes a deep breath and opens their eyes refreshed, facing the camera.

**Or generate with an AI video model** (attach your product photo as the reference image):
- Shot 6: `Macro close-up on a white seamless background: a hand rolls a frosted white roll-on bottle with a gold cap across the inside of a wrist, leaving a thin glossy line of oil; soft backlight, shallow depth of field, slow push-in.`
- Shot 7: `Medium close-up, slightly low angle: a tired woman in a car passenger seat rubs aromatherapy oil onto her temple with two fingers and exhales slowly, eyes half closed; soft side light, dim background, gentle handheld drift.`
- Shot 8: `Close-up, eye level: the same woman takes a deep breath with eyes closed, then opens them and looks into the camera, relaxed and refreshed; hair moves slightly in a breeze; soft side light, slight push-in.`

## Assets

- `public/img/`: your product shot (already transparent), bottle and box split from it, and the Cenanga wordmark and JRM logo cut from the packaging (`tools/brand_crops.py`). The ice cube (`tools/ice_matte.py`), mint, camphor leaves and candy (`tools/cutout.py`) are cut-outs of the photos you supplied. Higher-resolution or vector logo files would make shots 4 and 12 sharper.
- `public/audio/`: placeholder music (about 100 BPM, F major, like the original) and dings / whooshes at the original's cue points, synthesised by `tools/make_audio.py`, so there are no licensing issues. Swap in a licensed track before publishing if you prefer.
- Fonts: Nunito via `@fontsource` (Open Font License).
