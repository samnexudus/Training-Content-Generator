# Nexudus Feature One-Pager — Format Reference

**Branding:** every one-pager must follow the **`nexudus-branding`** skill (visual identity: logo, colours, typography, icons) and the **`nexudus-brand-voice`** skill (tone of voice). Load both before generating. Where this file and those skills agree, treat them as one system; where this file is silent, the branding skill wins.

## What a one-pager is (and isn't)

A one-pager is a **single A4 landscape page** that sells a feature. Its job is to make a reader
(sales rep, onboarding trainer, or space operator) understand **what the feature does, what it's
good for, and why it matters** in under a minute — without reading a document.

| | One-Pager | Product Update |
|---|---|---|
| Goal | Highlight features, capabilities, selling points | Teach how to use the feature |
| Steps | **None** — no numbered workflows | Numbered steps with bolded paths |
| Length | Exactly one A4 landscape page | As long as the feature needs |
| Copy per point | 1–2 sentences max | Full paragraphs allowed |
| Visuals | Icons only (no screenshots) | GIFs / screenshots per section |
| Reader outcome | "I can explain this feature to someone" | "I can do this in the Admin Panel" |

**Hard rule: if you find yourself writing "Navigate to… click… then…" — stop. That belongs in a
Product Update, not a one-pager.** A one-pager may name *where* a feature lives (a bolded path as
a single line), but never walk through it.

## Audience

Written so it works for **both** audiences in one document:

- **Internal** — sales and onboarding teams who need to talk the feature up confidently
- **External** — space operators who need to see the value fast

Operator-friendly throughout: lead with what it means for their space, use plain English, spell
out Admin Panel / Members Portal / Virtual Office. No marketing superlatives ("seamless",
"powerful", "game-changing") — the selling comes from concrete capability, not adjectives.

## Page layout (A4 landscape, print-ready)

The page is a fixed-size `297mm × 210mm` sheet, centred on screen and print-clean. Structure,
top to bottom:

```
┌──────────────────────────────────────────────────────────────────────┐
│ [EYEBROW — "What's new/changed in Admin Panel v5"] [Nexudus logo]    │
│                                                                      │
│ [topic icon] [FEATURE NAME — large H1]                               │
│ [Tagline — one sentence, the headline benefit. Max ~15 words.]       │
├──────────────────────────────────────────────────────────────────────┤
│ [KEY BENEFITS — 3–4 short benefit statements, side by side,         │
│  each ≤ 8 words, optionally with a leading number or icon]          │
├──────────────────────────────────────────────────────────────────────┤
│ [CAPABILITIES — a content-led number of cards, in a balanced grid]   │
│ [icon + title + concise description/bullets]                        │
├──────────────────────────────────────────────────────────────────────┤
│ [FOOTER — left: product surface + version/date · right: learn.nexudus.com] │
└──────────────────────────────────────────────────────────────────────┘
```

### 1. Eyebrow + logo (top-right)

- Admin Panel v5 eyebrow: use the exact phrase **"What's new in Admin Panel v5"** for a new
  feature, and **"What's changed in Admin Panel v5"** for an existing feature that has been
  updated, redesigned, or improved. Decide from the source material; do not label a redesign as
  new. For other product surfaces, retain the corresponding new/changed distinction and name the
  correct surface.
- Render the eyebrow using the exact requested title case in Nexudus Orange (`#FE4D00`),
  Poppins Semi-Bold, with clear contrast against the feature title. Keep it readable and do not
  let the logo overlap it.
- **Nexudus logo, top-right of the header row** (per the `nexudus-branding` skill):
  - Use the **primary orange wordmark** (`#FE4D00`) on this light background. Never recolour,
    rotate, stretch, or apply effects. Keep left/right sides perpendicular.
  - Minimum size: **125px wide** on screen / **30mm** in print. On A4 landscape a ~40–48px-tall
    logo comfortably clears the print minimum — do not shrink below it.
  - **Clear space:** keep a margin of 1× the width of the "N" free on all four sides; no other
    element (eyebrow, rule, card) may enter it.
  - **Implementation asset:** `reference/assets/nexudus-logo-orange.png` (bundled orange PNG,
    `2494 × 438`). Copy it to the generated feature folder at
    `assets/nexudus-logo-orange.png`, then reference it with a relative image path. Retain the
    original aspect ratio and do not recreate the logo as text, an SVG approximation, or favicon.
  - The favicon is **not** a substitute for the logo.

### 2. Feature name + tagline

- **Topic icon:** place one small, subject-specific icon or simple graphic beside the feature
  title. It should make the page topic recognizable at a glance (for example, a document/page
  icon for document templates or connected nodes for Workflows), not merely decorate the page.
  Use an inline SVG in Nexudus Orange (`#FE4D00`) on a pale-orange `#FFF2EC` chip, matching the
  capability icon style. Keep it roughly 12–16mm, aligned to the title, and distinct from the
  individual capability icons. Use a simple, relevant glyph; no screenshots, external icon
  libraries, or complex illustration.
- **Feature name:** H1, Parkinsans Semi-Bold, 36–42px, Text Grey `#535060` or Navy `#212C6A`.
  Use the official feature name — no version numbers. (The branding type scale runs to 54px for
  full-page heroes; a one-pager's denser layout steps down to 36–42px — same family and weight.)
- **Tagline:** one sentence stating the headline benefit, Poppins Regular, 16–18px, Text Grey
  `#535060`. This is the single most important line on the page. It must answer "why should I
  care?" — not "what is it called?".
  - ✅ "Give members a full history of every benefit they've used — straight from their record."
  - ❌ "This release adds a new benefit history view to the Admin Panel."
  - Max ~15 words. If the benefit is unknown, insert `[PROMPT — What does this update solve? ...]`
    (see "The core question" in SKILL.md) — never invent one.

### 3. Key benefits

- Use 3–4 benefit statements laid out side by side under a thin divider.
- Each statement: **≤ 8 words**, Poppins Semi-Bold, Navy `#212C6A`, noun-phrase or verb-phrase,
  no full sentences. A short supporting line may be added where useful; keep it brief, wrap it
  within its column, and avoid letting it push the benefit beyond the divider.
- Optionally prefix one with a concrete number when the source material supports it
  (e.g. "Saves 20+ minutes per import"). Only use real figures from the source — never invented.
- These are the **selling points**: choose the strongest three or four things a customer should
  understand first.
- Orange must appear in the design (branding rule): if nothing else carries it, use a benefit
  number or the eyebrow as the orange anchor. Never build the page from supplementary colours alone.

### 4. Capabilities

- Choose the number of capability items from the feature's actual scope. There is no fixed
  four-item or six-item limit: include each distinct customer-relevant capability, and combine
  closely related details rather than omitting useful functionality.
- Arrange items in a balanced grid that suits the count and amount of copy. Use two columns for
  a small set and three columns when that makes a larger set easier to scan; distribute items
  evenly across rows. Items may use short bullets when several distinct capabilities belong to
  that section. Keep the document to one A4 landscape page by tightening or shortening copy
  before shrinking type below readable sizes.
- Each item contains, in order:
  1. **Icon** — see "Icons" below
  2. **Card title** — the capability name, Parkinsans Semi-Bold, 16–18px, Navy `#212C6A`
     (e.g. "Usage timeline", "Filter by plan"). Sentence case, not all caps.
  3. **Description** — concise prose or 2–4 short bullets, Poppins Regular, Text Grey `#535060`.
     State what it does and the benefit in plain English. No steps. Use bullets where they improve
     scanning; do not repeat the title or the key-benefit statements.
  4. **Where line (optional)** — a single bolded navigation path showing where the feature lives,
     e.g. "**CRM > Customer record > Benefits**". One line only; never expand into instructions.
- Card styling: white background, 1px border in a light neutral, 12px border radius, subtle
  internal padding. Keep cards visually aligned and use the available page area evenly, without
  large empty gaps between content and card edges.
- Prevent overflow at every viewport and print size: use `min-width: 0` on grid children and
  `minmax(0, 1fr)` for flexible grid tracks; allow headings and copy to wrap naturally
  (`overflow-wrap: anywhere` where needed). Check that long titles, bullets, and the last benefit
  remain inside the sheet and divider/border edges.
- Card copy rules:
  - Active voice, present tense, second person or "operators/members"
  - One idea per card — if a card needs "and" twice, split it
  - No marketing adjectives; let the capability speak (brand voice: Confidence + Trust —
    state facts, avoid exaggerated claims)
  - Spell out product names (Admin Panel, Members Portal, Virtual Office)

### 5. Footer

- Left: product surface and context, e.g. "Admin Panel v5 · Released [Month Year]" or "[TBC]" if
  the date is unconfirmed.
- Right: "learn.nexudus.com"
- Small, Text Grey `#535060`, Poppins Regular, 12px.

## Icons

**No screenshots, no images, no external icon libraries.** Every icon is an inline SVG so the file
stays self-contained and prints identically everywhere.

- Use a fixed set of simple line-style glyphs (24×24 viewBox, `stroke-width: 2`, round caps,
  currentColor): check-circle, bolt, calendar, chart-bars, shield, gear, user, users, link,
  globe, clock, tag, layers, search.
- Colour per the branding skill's icon rules ("primary message support"): **white background,
  core orange icon** — i.e. orange `#FE4D00` glyph on a pale-orange `#FFF2EC` circular chip (40px)
  behind it. Minimum rendered size 16px; never stretch, skew, or crop.
- Pick the icon that matches the card's meaning — don't repeat the same icon twice on one page
  unless the feature genuinely has repeated sub-caps.
- If no glyph fits, use a plain Semi-Bold initial in orange inside the chip (e.g. "AI" for an AI
  feature).
- The My Icons Figma library is the team's canonical source; the inline SVGs here are stand-ins
  for generated files only.

## Brand palette quick reference (from `nexudus-branding`)

| Role | Colour | Hex |
|---|---|---|
| Hero accent — must appear | Nexudus Orange | `#FE4D00` |
| Headings, value-bar text | Navy | `#212C6A` |
| Body copy, footer | Text Grey | `#535060` |
| Page background | White | `#FDFDFD` |
| Icon chip background | Pale orange tint | `#FFF2EC` |

Approved text/background pairs only: white on navy, white on orange, navy on white, Text Grey on
white, orange on white (headings only). Never orange-on-navy, navy-on-orange, or grey-on-navy.
Fonts: **Parkinsans** (display/headings, Regular–Semi-Bold only) + **Poppins** (body,
Regular–Semi-Bold only), both via Google Fonts with an `Arial, sans-serif` fallback stack. Never
mix the two families in the same line; never use Bold/Extra-Bold weights.

## Print CSS

Every one-pager generator script must include (brand fonts loaded from Google Fonts, with an
`Arial, sans-serif` fallback for offline/print):

```css
@import url('https://fonts.googleapis.com/css2?family=Parkinsans:wght@400;600&family=Poppins:wght@400;500;600&display=swap');

@page { size: A4 landscape; margin: 0; }
body { background: #ECECEC; font-family: 'Poppins', Arial, sans-serif; }
.sheet {
    width: 297mm; height: 210mm;
    padding: 12mm 14mm;
    background: #FDFDFD;
    display: flex; flex-direction: column;
    margin: 0 auto;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    overflow: hidden;
}
h1, h2, h3, .card-title, .eyebrow { font-family: 'Parkinsans', Arial, sans-serif; }
@media print {
    body { background: #fff; }
    .sheet { box-shadow: none; margin: 0; }
}
```

On screen, centre the sheet on a light grey backdrop with a subtle shadow so it reads as a printed
page. All content must fit the fixed sheet — if it overflows, first tighten copy and rebalance
the grid, not the font size or layout constraints. Never allow scrolling inside the sheet
(`overflow: hidden` enforces this), and verify rendered bounds rather than relying on clipping.
Use `minmax(0, 1fr)` grid tracks, `min-width: 0` on grid children, and natural text wrapping so
headings and copy remain within benefit columns, capability panels, and page edges. Balance
vertical spacing to avoid both cramped content and large unused areas.

## Tone — quick rules

Follow the **`nexudus-brand-voice`** skill in full; the points below are the one-pager-specific
subset that matters most:

- Selling ≠ promotional. Concrete capability beats adjectives: "Bulk-import customers with a
  single CSV" beats "Powerful bulk import". (Brand voice: Trust — stick to facts, no exaggerated
  claims.)
- Benefit-led: every card answers "so what?" within its two sentences.
- Warm and confident, not hype: write like a trusted colleague explaining the feature, not a
  press release. No superlatives, no exclamation marks.
- Consistent terminology per `nexudus-product-context.md`: customer (not coworker), plan (not
  tariff), spelled-out product names.
- `[TBC]` for anything unconfirmed (dates, pricing, availability).
- `[PROMPT — ...]` where the benefit is missing from source material — never guess.

## File naming

`[Feature Name] - One-Pager.html` — saved to `~/Desktop/Nexudus Content/[Feature Name]/` like all
other output types.

## Worked skeleton (for calibration)

```
EYEBROW:      What's new in Admin Panel v5
H1:           Benefit Use History
Tagline:      See exactly which benefits each member has used — and when — without opening invoices.

KEY BENEFITS: Full usage timeline · Filter by benefit type · Export for billing disputes

CARDS:
  [chart]  Usage timeline          Every benefit use shown chronologically on the customer
                                    record, with amount and date.
                                    Where: CRM > Customer record > Benefits
  [search] Filter & search         Narrow the history by benefit type, date range, or
                                    invoice.
  [gear]   Exports                 Download the history as CSV for billing or support queries.

FOOTER:       Admin Panel v5 · Released [TBC]          learn.nexudus.com
```
