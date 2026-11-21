# Reference study: Apple-style UI logo animation

`apple-ui-animation.mp4`: 12.6 s, 720×1280 (9:16), 30 fps, with sound. **One continuous shot, no cuts.**
Checked every frame; times come from measured frame-to-frame change and object tracking, not guesses.

Contact sheets in `sheets/`:
- `movement-map.png`: one tile per movement, labelled with its time and name.
- `dense_*.png`: every 0.1 s of the video (126 frames on three sheets).

## Every movement

| # | Time (s) | Movement | What happens |
|---|---|---|---|
| 1 | 0.00–0.20 | **Logo drops in** | White app-icon logo falls from the top (y 191 → 683 px) with motion blur, growing 51 → 91 px |
| 2 | 0.20–0.60 | **Bounce and settle** | Overshoots below centre, springs back up (to y 616), lands at centre; grows to full size (116 px) |
| 3 | 0.60–1.15 | **Hold** | Logo still, with a soft white glow |
| 4 | 1.17–1.50 | **Card unfolds** | A dark glass pill opens out of the logo, tilted about −5°; the frame's bright area doubles |
| 5 | 1.20–2.00 | **Icon 3D spin** | The logo flips on its own axis while the card wobbles and levels out (level by 1.7) |
| 6 | 2.03–2.23 | **Slide left** | Icon slides from the centre to the card's left end (x 405 → 178 px), fast, in 0.2 s |
| 7 | 2.10–2.80 | **Details reveal** | "Guiding horizon" slides out from under the icon; then "video editing agency", the orange stars filling one by one, "(4.5) 1.3kRating", and the "chat" button growing from a dot |
| 8 | 2.80–3.80 | **Hold header** | The complete header card, nearly still |
| 9 | 3.83–4.20 | **Header rises** | Header lifts towards the top; the first service card appears small at the bottom |
| 10 | 4.10–5.60 | **Stack builds** | Four service cards rise from the bottom one by one, about 0.3 s apart, each growing as it lands: Video Editing (laptop), Color Grading (colour wheel), Motion Graphics (red sphere), Sound Design (headphones). Each label wipes in after its card lands |
| 11 | 5.60–6.65 | **Hold full list** | Five cards. Each 3D icon is bigger than its card and breaks out of its left edge |
| 12 | 6.67–7.20 | **Float** | The whole stack sways gently, so the hold never looks frozen |
| 13 | 7.30–7.75 | **Absorb #1, red flash** | Video Editing flies up into the header; the header flashes red (#DE4B4D) and tilts; the whole frame glows red |
| 14 | 7.75–8.15 | **Absorb #2, amber** | Color Grading is absorbed; amber/yellow flash; the header tilts the other way |
| 15 | 8.15–8.45 | **Absorb #3, green** | Motion Graphics is absorbed; green flash (#53D95F) |
| 16 | 8.45–9.00 | **Absorb #4, magenta** | Sound Design is absorbed; magenta flash (#DA87D0) with a green glow; the header swings, then calms |
| 17 | 9.00–9.45 | **Settle** | Header back at the centre, neutral grey again |
| 18 | 9.47–9.87 | **Slide right** | The icon slides back across the card to its right end, covering the text (reverse of #6) |
| 19 | 9.97–10.30 | **Card retracts** | The pill shrinks back into the icon (reverse of #4); the icon returns to the centre |
| 20 | 10.30–11.30 | **Hold and glint** | Logo alone, as at 0.6 s; light glints across the icon |
| 21 | 11.33–11.60 | **Shrink out** | Logo shrinks to a point and vanishes (141 → 51 px → 0) |
| 22 | 11.60–12.60 | **Black hold** | Empty black frame; the last frame matches the first, so it loops |

## What makes it work

- **One object tells the whole story.** The logo becomes a card, the card grows a list, the list folds back
  into the card, and the card folds back into the logo. Every move is caused by the one before it.
- **Symmetry.** The second half plays the first half backwards (#18 reverses #6, #19 reverses #4, #21 reverses #1),
  so the film feels complete and loops cleanly.
- **Rhythm.** Fast moves of 0.2–0.5 s, each followed by a 0.5–1 s hold. The busiest moment (7.3–9.0 s, four
  colour flashes about 0.35 s apart) sits two-thirds of the way in.
- **Look.** Near-black ground (#020202), frosted dark-glass cards, white logo with a glow, small white type,
  one blue button ("chat"/"collect"), orange stars. Colour appears only in the 3D icons and the four flashes.
- **Depth.** The 3D icons are larger than their cards and break out of the cards' edges. Cards tilt in 3D
  when hit. There's soft glow and motion blur on fast moves.

## Borrowing it for Kopi Ratu

- **Opening:** the JRM Holistik mark drops in and bounces, then unfolds into a glass header card: "Kopi Ratu",
  "Inspiring Addiction", five stars and a "Grab now" pill.
- **Middle:** the stack is the four premium ingredients (Ginkgo Biloba, Ginseng, Bacopa Monnieri, Black Cohosh),
  each with a real ingredient or coffee photo breaking out of the card's left edge.
- **Peak:** the cards fly into the header, each flashing a brand colour (gold #E1B377, pouch red #94050D,
  olive #5C6631, wine #450A10).
- **Ending:** the card folds back into the logo, and the logo shrinks out, so it loops for TikTok.
- **Ground:** to match design.md (warm, never pure black), use the deep wine (#450A10) or a dark coffee brown
  instead of black.
