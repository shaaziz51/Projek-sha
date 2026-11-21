# Kopi Ratu — design

The brand, the design words, the type, and what the design references teach, in one place.
Colours marked *measured* were sampled from the image pixels, not guessed.

---

## 1. Brand

**Product.** Kopi Ratu by JRM Holistik: a pre-mixed herbal coffee in a stand-up pouch and single-serve
sachets. Pack tagline: **"Inspiring Addiction"**. Sister product: Mega Ratu (botanical drink, box and bottle).

**Logo.** JRM Holistik (`source/brand/jrm-holistik-logo.jpg`). Use the brand's own file, never a redraw.
On light grounds in maroon ink `#54232F`; on dark grounds in Mega Ratu gold `#F2D49B` or cream.

**What we can say** (from the pack and the client's brief only; nothing else is claimed):

- Ingredients: Ginkgo Biloba, Ginseng, Bacopa Monnieri & Black Cohosh *(Black Cohosh is from the brief; it is
  not on the pouch photo we have, so confirm before print)*.
- Benefits, in the client's words: **"Good for focus, stamina & emotion/stress."**
- Pack facts: 15 servings per pouch, 20 g per serving; "Rasa: Rendah / Low Sugar: Kurang Manis".
- Customer reviews: quote them word for word, with the screenshot as proof (`source/kopi-ratu-v2/reviews/`).
- Call to action: **"Grab now to boost your stamina on @Kak_sha_jrm TikTok showcase now!"**

**Voice.** Malay first, the way customers write ("ptg", "dgn", "mmg"); short English for the punchy lines.
Warm and direct, never clinical.

### Colours

| Token | Hex | Role |
|---|---|---|
| `--kopi-gold` | `#E1B377` | Kopi Ratu brand gold; grounds, gradients (white → gold) |
| `--white` | `#FFFFFF` | Gradient start, cards |
| `--ink` | `#54232F` | Brand maroon: text, logo, call-to-action buttons |
| `--cream` | `#FFF9F0` | Brand accent: light grounds, text on maroon |
| `--paper` | `#F2E6CF` | Warm paper ground (videos v2 and v3) |
| `--pouch-red` | `#94050D` | *Measured* from the "KOPI RATU" lettering on the pouch: big titles |
| `--olive` | `#5C6631` | Pour scene ground (from the green espresso reference) |
| `--mega-wine` | `#450A10` → `#460C23` | Mega Ratu ground gradient |
| `--mega-gold` | `#F2D49B` | Mega Ratu text and logo |

---

## 2. Design words

*Proposed from your briefs and these references. Change or cut any that are not yours.*

1. **Warm.** Gold, cream, maroon, wine; never cold greys or pure black.
2. **Royal, soft.** *Ratu* is a queen: premium and confident, but rounded and friendly, not stiff.
3. **Retro-soft.** The 1970s "Bloom" lettering: bulbous, curly, playful.
4. **Herbal and real.** Real product photos, real coffee, real ingredients, real customers. Nothing invented.
5. **Airy glass.** From the references: frosted panels floating over a scene, lots of breathing room.

---

## 3. Typography

| Use | Font | Weights | Stands in for |
|---|---|---|---|
| **Titles**: headlines, big words, the product name | **Chicle** | Regular (400) | the "Bloom" lettering sample |
| **Text**: body, quotes, captions, labels, buttons | **Gelasio** | Regular, Italic, Bold | Georgia |
| Optional accent: one word at a time, never a full title | Sansita Swashed | ExtraBold (800) | the curled "B" of the Bloom sample |

- Chicle for titles, Gelasio for text; never swapped. At most one accent word per layout.
- Fallbacks: titles `"Chicle", Georgia, serif`; text `"Gelasio", Georgia, serif`.
- All three are free for commercial use (SIL Open Font License 1.1). Files and licences: `design/fonts/`.
- The references set their UI labels in a light geometric sans. We keep to our three fonts and get the same
  airy feel from Gelasio at small sizes with generous letter-spacing, not by adding a fourth font.

---

## 4. The references and what each teaches

Files in `source/design-references/`.

### 1 · Rose glass cards — `ref-1-rose-glass-cards.jpg`
- Frosted rose panels (*measured* `#CB9D97`) floating over pale rose clay shapes (`#DFBCB8`, `#DCD6D5`).
- One **solid** card in a deeper tone (*measured* `#C46465`) anchors the group of glass cards.
- Text is **warm taupe-brown, not black** (*measured* `#5F4542`).
- A big date set in a **light** weight ("Wed / 24th"), then small details: size contrast does the work.
- Call to action: a **dark pill** (*measured* `#2B2A2A`) with a **round arrow button** attached.
- A tall inner glass column inside a card, with the 3D object showing beside it.

### 2 · Pink desert glass — `ref-2-pink-desert-glass.jpg`
- The same card system over a **surreal photo**: pink desert, a glossy pink sphere (`#C97C86`, `#DE9AA3`).
- Three card materials side by side: frosted glass, **solid white** (`#FFFFFF`), **solid near-black**
  (*measured* `#1E1E1E`).
- Hierarchy by **tone**: "Jan" near-black (`#1F1F1F`), "2025" light grey (*measured* `#B5B4B4`).
- A blurred sphere behind the glass gives depth without clutter.

### 3 · Glass UI kit — `ref-3-glass-ui-kit.jpg`
- Buttons, fields, dropdown, toggle and tabs as **frosted plates** on a warm taupe ground (`#A6988C`).
- Each plate: a hairline light border, a bright highlight along its top edge, a soft shadow falling below.
- Hierarchy by **weight**: the primary action bold ("Launch", "Premium plan"), secondary regular.

### 4 · PlantFashion — `ref-4-plantfashion.jpg`
- **One large frosted panel** over a full-bleed photo of leaves (`#586F52`, `#7F9D71`).
- A big **serif** headline in white, left-aligned over three lines; small body text under it.
- A **white pill** call to action.
- A **real plant breaks out of the panel's edge**: the product crosses the glass, which makes it feel 3D.

### 5 · Pure Pomegranate juice — `ref-5-pomegranate-juice.jpg`
- The same pattern with the product: the panel is tinted by the blurred photo behind it
  (*measured* `#A06A81`), and the **pomegranate breaks the panel** (*measured* `#811822`).
- Bold white headline with a **vertical white bar** beside it; a short benefit line along the bottom.
- White pill call to action; a short top navigation in small type.

### The system they share
- **Layout.** One frosted panel (or a group of 2–3 cards) floating over a photo or 3D scene that belongs to
  the product. Text in a left column; the product on the right, **crossing the panel's edge**.
- **Glass.** Background blur 24–40 px; white (or tinted) fill at 18–35 % opacity; a 1 px light border
  at 35–50 %; corner radius 24–32 px; a soft shadow below (`0 20px 40px rgba(0,0,0,.12)`).
- **Colour.** One colour family per piece, taken from the product or scene, plus white, plus one dark for the
  call to action. No pure black: near-black or a deep brand tone.
- **Type.** A very large headline against very small text; generous spacing; left-aligned.
- **Call to action.** A pill, dark on light or white on dark, often with a round arrow button attached.

---

## 5. Applying it to Kopi Ratu

- **Scene.** Real coffee and the pouch's coffee-berry art, blurred, or the warm `--paper` / `--kopi-gold`
  ground. For Mega Ratu, the wine gradient.
- **Glass.** Panels tinted gold or cream (`--kopi-gold` / `--cream` at 25–35 %); for Mega Ratu, wine glass
  with gold text.
- **Product.** The real pouch or cup photo breaks the panel's edge, as the plant and pomegranate do.
- **Type.** Titles in Chicle, `--pouch-red` or `--ink` (white or cream on dark scenes); text in Gelasio,
  `--ink`, never pure black.
- **Call to action.** A maroon pill (`--ink`) with cream text and a round arrow button.
- **Reviews.** Each review as a small glass card: the quote big in Chicle, the screenshot inside the card.
- **Vertical video (TikTok, Reels, Shorts).** All words and the product stay inside the clear band:
  288–1248 px down, 120–888 px across on 1080×1920 (no further right than 780 px below 840 px down).

### Tokens

```css
:root {
  --kopi-gold: #E1B377;  --white: #FFFFFF;  --ink: #54232F;  --cream: #FFF9F0;
  --paper: #F2E6CF;      --pouch-red: #94050D;  --olive: #5C6631;
  --mega-wine-a: #450A10;  --mega-wine-b: #460C23;  --mega-gold: #F2D49B;

  --font-title: "Chicle", Georgia, serif;
  --font-text: "Gelasio", Georgia, serif;
  --font-accent: "Sansita Swashed", Georgia, serif;

  --glass-fill: rgba(255, 249, 240, 0.28);
  --glass-border: rgba(255, 255, 255, 0.45);
  --glass-blur: 32px;
  --glass-radius: 28px;
  --glass-shadow: 0 20px 40px rgba(84, 35, 47, 0.12);
}
```

### Don't
- Pure black text or buttons; cold blue-greys.
- More than three fonts, or the accent font for a whole headline.
- Claims beyond the pack, the brief or customers' own words.
- Drawn or mocked-up products where the real photo exists.

---

## 6. Files

| What | Where |
|---|---|
| Brand assets (logo, font samples, product photo) | `source/brand/` |
| Pouch, back and side photos | `source/` |
| Customer reviews | `source/kopi-ratu-v2/reviews/` |
| Earlier poster references | `source/references/`, `source/kopi-ratu-v2/references/` |
| These design references | `source/design-references/` |
| Fonts and licences, specimens | `design/fonts/` |
