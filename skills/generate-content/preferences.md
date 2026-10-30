# Content Preferences — SCORM eLearning courses

User-maintained overrides for the Training Content Generator. **These preferences apply
only to SCORM eLearning courses** (the Academy Lesson spec + the AI-maintained Tessera
course). They do NOT apply to the other output types (Product Update, Webinar Brief,
Video Script, Training Script) — those keep the built-in defaults in `SKILL.md` and the
reference templates.

**Read this file at the start of every course build** (before Step 1) and let these
values override the defaults in `SKILL.md`, the reference templates, and the Tessera
workspace `AGENTS.md`. Blank or missing fields fall back to the built-in defaults.

## Language & tone

- Tone: informative, friendly, plain English — not technical
- Audience: [e.g. space operators, no prior Nexudus training assumed]
- Formality: professional but approachable; contractions fine
- Voice: second person ("you"), present tense
- Terminology: [e.g. always "space operator", never "admin"; always "Members Portal", never "member site"]
- Avoid: [e.g. marketing superlatives ("seamless", "powerful"), jargon, US spellings]
- Sentence length: short sentences; one idea per sentence

## Design (SCORM / Tessera courses)

### Fonts

- **Primary display font:** [Parkinsans](https://fonts.google.com/specimen/Parkinsans)
  - Use for: headings, subheadings, accents, and buttons
  - Available weights: Regular to Semi-Bold only (do not request Bold or heavier)
- **Body font:** [Poppins](https://fonts.google.com/specimen/Poppins)
  - Use for: paragraph text, small copy, captions
  - Available weights: Regular to Semi-Bold only (do not request Bold or heavier)
- Fallback stack: Arial, sans-serif (in case an LMS cannot load the web fonts)
- Loading: embed via Google Fonts (`<link>` in the course layout); if the LMS blocks
  external requests, the fallback stack applies

### Colours

- **Core brand colour:** `#FE4D00` (Orange) — primary accent, buttons, key highlights
- Alternative brand colours (use for secondary accents, callouts, quiz feedback,
  section differentiation): see [branding-colours.png](./reference/branding-colours.png)

| Family | Pale | Light | Medium | Base | Dark |
|---|---|---|---|---|---|
| Orange | #FFF2EC | #FFDACC | #FF6E2F | **#FE4D00** | #723031 |
| Blue   | #F1A4FF | #C5CCFF | #8694FF | #5757F4 | #212C6A |
| Green  | #E0FFF0 | #9AE9B8 | #70CF94 | #28B95F | #00703E |
| Pink   | #FFF0F5 | #FFCCDF | #FF84B5 | #FF4F95 | #6D1A3B |

- Usage guidance:
  - `#FE4D00` is the single dominant brand colour — keep it for the most important
    elements (primary buttons, headings accents, progress indicators)
  - Use the **Pale** shades as backgrounds (callout boxes, alternating rows)
  - Use **Light/Medium** shades for borders, dividers, and secondary accents
  - Use **Dark** shades sparingly for text on light backgrounds where black is too harsh
  - Pick one alternative family per course for consistency (e.g. Blue for info,
    Green for success/correct, Pink for warnings/incorrect) unless the content needs more
- **Contrast rule:** white text on `#FE4D00` is only 3.35:1 — below the WCAG 4.5:1
  minimum. Primary buttons therefore use the darkened brand orange `#C73E00`
  (5.1:1 with white); `#FE4D00` stays for accents, borders, and black text on white
  (6.28:1). If you pick a different core colour, check white-text contrast before
  using it as a button background

### Layout

- Max width: 900px, centred
- Page padding: 40px
- Table borders: 1px solid, use a Light shade of the course's accent family (or #CCCCCC neutral)
- Alternating table rows: white / Pale shade of the course's accent family
- Callout styles:
  - **Note:** Pale-shade background box, 1px Light-shade border
  - **Important:** white background with a 4px left border in `#FE4D00`
- Logo/branding: [none / path or URL]

## Course defaults (Academy Lesson + Tessera)

- Default version number: v2.01
- SCORM version: SCORM 2004 4th Edition
- Quiz: test application over recall; 5–6 questions per content lesson; corrective feedback on every question
- Interaction types: Process for workflows, Accordion for multi-concept sections
- Cover page objectives: 3 bullets, action verb + outcome
- Summary lesson: restate objectives + Airtable feedback form
- Standard disclaimer: "The content and images in this course are accurate as of publication but may change over time. Images are for illustration only and may differ from what appears on your system."
- Tessera theme: primaryColor `#FE4D00`, passing score 70%

## Screenshots

- Style: [e.g. full window, real Kalkio Flex data, no redaction needed]
- Naming: kebab-case, feature-prefixed (e.g. dt-list.png)
- Asset cache: `~/Desktop/Nexudus Content/[Feature Name]/assets/` — reuse an existing shot for the same screen instead of recapturing
