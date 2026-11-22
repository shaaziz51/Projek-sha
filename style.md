# Paper Cutout Style Guide (Vox-inspired)

Based on 5 reference screenshots: Tower Bridge, Dior runway, Christian Dior, "VOX-STYLE" presenter, "THE CLASH".
The look: **real photos cut out with scissors and pasted onto layered newspaper, with one loud accent colour.**

> Screenshots are still frames, so the **Motion** section is inferred from the layering and cues in the
> frames (stickers, tape, torn edges, word captions), not measured from playback.

> Use your own badge (e.g. JRM / Mega Ratu) in place of the "Vox" logo. The Vox name and logo are their trademark.

---

## 1. Canvas & layout

| Format | Size | Used for |
|---|---|---|
| Vertical (main) | 1080 × 1920 (9:16) | Reels / Shorts / TikTok |
| Landscape | 1920 × 1080 (16:9) | "THE CLASH"-type scenes |

Your talking-head source is 576 × 1152 (1:2). Scale it to 1080 width and let the paper background fill the extra height.

- **Safe area:** keep text 80 px from left/right edges, 200 px from top, 300 px from bottom (platform UI).
- **Composition:** one hero cutout fills **55–75 % of frame height**, centred or slightly off-centre.
  Background collage fills every pixel, with no flat empty space.
- **Depth:** 4–6 overlapping layers (see §5). Things overlap the frame edges and each other on purpose.

---

## 2. Colour palette

| Role | Hex | Where seen |
|---|---|---|
| **Accent yellow** | `#FFD400` | Cutout outlines, logo badge, tape, runway strip, paint blob |
| Ink black | `#141414` | Headlines, logo text, suit/skirt shadows |
| Newsprint cream | `#EAE0CC` | Clippings, paper cards |
| Aged paper / sepia | `#C9B48E` | Torn background scraps, parchment sketches |
| Dark newsprint grey | `#3A3A3A` | "VOX-STYLE" background |
| Sticker white | `#FFFFFF` | Cut-out borders, torn-paper edges, captions |
| Sky blue (secondary) | `#7FB2E5` | Torn sky strip, Tower Bridge clippings |
| Clash red (alt accent) | `#D3202A` | "THE CLASH" banner, player outlines, red stripe |

**Rules**
- **One accent per video**: yellow by default, red for conflict/versus stories. Don't mix them in one frame.
- Background photos are **desaturated or full B/W**. Only the hero subject keeps real colour (Dior runway) or
  stays B/W against a coloured element (presenter on blue sky).
- Grade: warm, slightly faded blacks, lifted shadows, a little sepia in the paper.

---

## 3. Typography

Commercial fonts in the references are approximated with free Google Fonts.

| Element | Look in reference | Free font | Size @1080 wide | Notes |
|---|---|---|---|---|
| Masthead / logo | Heavy high-contrast serif with italic swash ("Vox") | **Abril Fatface** or **Playfair Display Black Italic** | 200–260 px | Black on paper, or black on yellow badge |
| Headline ("TOWER BRIDGE", "THE CLASH") | Bold condensed newspaper serif, ALL CAPS | **Playfair Display Black** / **DM Serif Display** | 140–180 px | Tracking −10 to 0, line height 0.9, 1–2 lines, centred |
| Label on tape ("VOX-STYLE") | Bold serif caps on yellow tape | **Playfair Display ExtraBold** | 70–90 px | Tracking +40, tape tilted −3° to −6° |
| Newspaper filler ("LATE EDITION…", "CUT, PASTE, PRINT, REPEAT") | Condensed serif, worn print | **Old Standard TT Bold** / **Playfair Display** | 90–120 px | 30–50 % opacity, cropped by frame edges |
| Clipping body text | Small columns, typewriter feel | **Special Elite** / **Courier Prime** | 22–30 px | Decoration only, doesn't need to be readable |
| **Spoken captions** | Small clean white sans, 1–2 words | **Inter SemiBold** / **Montserrat SemiBold** | 56–64 px | White `#FFFFFF`, soft shadow `0 2px 6px rgba(0,0,0,.6)`, lowercase as spoken |

**Captions**
- Show **1–3 words at a time**, timed to speech ("really easy", "cutout", "Bridge").
- Centre of frame, **at the subject's chest height (≈ 45–55 % from top)**, not at the bottom.
- No box or background, just white text with a shadow.

---

## 4. Paper & texture kit

- **Newspaper scraps:** aged clippings with headlines, columns, small photos, maps. Torn (never cut straight),
  rotated −8° to +8°.
- **Torn edges:** white fibrous rip edge 8–20 px wide on every torn piece (see sky strip in "VOX-STYLE").
- **Sketches / plans:** pencil fashion drawings, sewing patterns, blueprints, on parchment.
- **Props as cutouts:** cards ("DIOR PARIS"), perfume, fabric swatches, camera, flags, labels.
- **Tape:** semi-transparent yellow or beige masking tape, 120–200 px long, jagged ends, holding the corners of pieces.
- **Paint shapes:** rough yellow circle or brush blob behind the subject's head/shoulder.
- **Overlay on top of everything:**
  - Paper grain texture, multiply, 15–25 %
  - Film grain / noise, 5–8 %
  - Light vignette, 10–15 %
  - Optional halftone dots on B/W photos

---

## 5. Cutout treatment (the signature)

| Layer (back → front) | Content |
|---|---|
| 1 | Base paper / newspaper wall (B/W or sepia) |
| 2 | Torn colour strip or scene photo (sky, runway, room) |
| 3 | Scraps, sketches, cards, maps |
| 4 | Paint blob / coloured shape |
| 5 | **Hero cutout** |
| 6 | Tape, labels, headline, logo badge, captions |
| 7 | Grain / texture overlay |

**Hero cutout border options**
- **Sticker white:** solid white stroke **10–14 px**, plus drop shadow `x 4, y 8, blur 16, black 45 %` (Tower Bridge, presenter).
- **Accent outline:** solid yellow `#FFD400` stroke **8–12 px**, no white (Dior shots). Use red `#D3202A` with a soft
  red outer glow for "clash" scenes.
- Border edges are slightly irregular (hand-cut), never a perfect vector stroke.
- The subject can **break out of** its background piece (head or arm over the torn strip edge).

---

## 6. Motion (inferred)

Stop-motion paper feel: things are **placed by hand**, not slid smoothly.

**Frame rate trick:** render at 25/30 fps but animate paper elements **on twos (12–15 fps)** for a stop-motion look.
Leave the talking-head footage at full frame rate.

| Element | Animation | Timing |
|---|---|---|
| Hero cutout in | Scale 0 % → 108 % → 100 %, rotate −4° → 0°, white flash on the border | 6–8 frames, back-out ease |
| Paper scraps in | Drop in from off-frame with a small overshoot, land at a random tilt | Stagger 2–3 frames each |
| Tape | "Slap" on: scale 120 % → 100 % in 2 frames, small shake | 2–4 frames |
| Headline | Words slam in one by one (scale 130 % → 100 %) or pop up line by line | 4 frames per word |
| Captions | Hard cut per word group, optional 90 % → 100 % pop | 2–3 frames, synced to speech |
| Idle (while holding) | Very slow push-in 100 % → 105 % across the shot, plus ±0.5° paper wobble on twos | Whole shot |
| Parallax | Background moves slowest, cutout faster, tape/labels fastest | Use during push-ins |
| Scene change | **Torn-paper wipe** (a ripped sheet slides across) or a new layer of paper slapped over the frame | 8–12 frames |
| Emphasis | Accent paint blob scribbles in behind the subject, or the outline flickers yellow ↔ white twice | 6 frames |

**Sound design (optional):** paper rustle on wipes, tape rip on labels, a soft "thwack" when cutouts land.

---

## 7. Applying it to the Mega Ratu talking head

- **Presenter:** cut out of the studio background, **10 px yellow outline**, placed on a torn cream-newsprint wall.
  Keep her in colour and make the background B/W/sepia.
- **Product:** a Mega Ratu bottle and box cutout with a white sticker border, popping in when the product is named.
- **Ingredient cards:** when she lists akar serapat, kacip fatimah, jarum emas, kunyit hitam, show each as a small
  torn clipping with a botanical sketch plus a yellow tape label (Playfair ExtraBold caps).
- **Headline cards (Malay):** e.g. **"HABIS PANTANG"**, **"JAGA HORMON"** in Playfair Black, slamming in word by word.
- **Badge:** your own logo (e.g. JRM) in a yellow box, top-right, about 15 % of frame width, in place of the Vox badge.
- **Captions:** Malay, 1–3 words, white Inter SemiBold 60 px at chest height.

---

## 8. Quick checklist

- [ ] Real photo cutouts with a white or yellow outline and a drop shadow
- [ ] Torn (not cut) paper edges everywhere
- [ ] B/W or sepia background, one accent colour only
- [ ] Bold black serif headlines, ALL CAPS
- [ ] 1–3 word white sans captions mid-frame
- [ ] Grain and paper texture over everything
- [ ] Stop-motion timing (on twos), overshoot pops, torn-paper transitions
