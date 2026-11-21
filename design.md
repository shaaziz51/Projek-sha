# Kopi Ratu — design choices

## Typography

| Use | Font | Weights | Stands in for |
|---|---|---|---|
| **Titles**: headlines, big words, the product name | **Chicle** | Regular (400) | the "Bloom" lettering sample (source/brand/font-sample-bloom.jpg) |
| **Text**: body copy, quotes, captions, buttons | **Gelasio** | Regular (400), Italic, Bold (700) | Georgia (source/brand/font-sample-georgia.jpg) |
| Optional accent: one word at a time, never a full title | Sansita Swashed | ExtraBold (800) | the curled "B" of the Bloom sample |

Rules

- Chicle for titles, Gelasio for text. Do not set body text in Chicle or titles in Gelasio.
- Use the accent font for at most one word per screen or layout.
- Fallbacks: titles `"Chicle", Georgia, serif`; text `"Gelasio", Georgia, serif`. On a computer that has
  Georgia installed, Georgia may stand in for Gelasio (same shapes and spacing).

CSS

```css
font-family: "Chicle", Georgia, serif;   /* titles */
font-family: "Gelasio", Georgia, serif;  /* text */
```

Licence: all three fonts are free for commercial use under the SIL Open Font License 1.1 (video, social,
packaging, print, web, logos; you may embed them; you may not sell the font files on their own).

Files: web fonts and licence texts in `design/fonts/`. Desktop (TTF) downloads:

- Chicle: https://fonts.google.com/specimen/Chicle
- Gelasio: https://fonts.google.com/specimen/Gelasio
- Sansita Swashed: https://fonts.google.com/specimen/Sansita+Swashed

Specimens: `design/fonts/kopi-ratu-font-pairing.png`, `design/fonts/kopi-ratu-fonts-pilihan.png`.
