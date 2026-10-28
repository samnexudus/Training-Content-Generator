# Course Spec Format (`course-spec.json`)

Machine-readable blueprint of an Academy Lesson, written alongside the human-readable `[Course Name] - Academy Lesson.html`. It is the handoff document for building the AI-maintained Tessera course — the builder consumes this file, not the HTML.

**Rules:**
- Valid JSON (double quotes, no comments, no trailing commas).
- Written by the Academy Lesson generation step; keep it in lockstep with the HTML. If you edit one, edit the other.
- Text fields carry the same wording as the HTML, including `[TBC]` markers and `[PROMPT — …]` placeholders. The builder must surface those, never silently drop them.
- One file per course: `~/Desktop/Nexudus Content/[Feature Name]/[Course Name] - course-spec.json`

## Top-level shape

```json
{
  "format": "nexudus-course-spec",
  "formatVersion": 1,
  "courseName": "Event Tickets",
  "scormVersion": "SCORM 2004 4th Edition",
  "version": "v2.01",
  "cover": {
    "intro": "Event Tickets lets space operators sell tickets for events held in their space.",
    "objectives": [
      "Create a ticketed event in the Admin Panel",
      "Configure pricing and capacity for each ticket type",
      "View ticket sales reports"
    ],
    "disclaimer": "The content and images in this course are accurate as of publication but may change over time. Images are for illustration only and may differ from what appears on your system."
  },
  "lessons": [
    {
      "title": "Creating a Ticketed Event",
      "blocks": [ /* ordered blocks, see below */ ]
    }
  ]
}
```

- `courseName` — becomes the Tessera course title and (kebab-cased) folder name.
- `lessons` — content lessons in order. The final lesson is always the Summary lesson, built from the standard template (objectives restated + Airtable feedback form); represent it as a normal lesson with `quote` and `video` blocks so the builder treats it uniformly.
- `scormVersion` / `version` — informational; the Tessera export standard is set in the workspace, not here.

## Block types

Blocks appear in `lessons[].blocks` in display order.

### `text`

```json
{ "type": "text", "html": "<p>Overview paragraph…</p>" }
```

Prose from a `[TEXT BODY]` block. Keep inline HTML (`<strong>`, `<em>`); Svelte pages accept it. Multiple consecutive `[TEXT BODY]` blocks stay as separate `text` blocks.

### `heading`

```json
{ "type": "heading", "level": 2, "text": "Configuring ticket types" }
```

From `[TEXT HEADING]`. Level 2 for sub-topic headings within a lesson; level 3 for smaller groupings. Never skip levels (validator warns).

### `image`

```json
{ "type": "image", "src": "[SCREENSHOT — show the Events page with a new event selected]", "alt": "Events page in the Admin Panel" }
```

From `[IMAGE]` blocks. While the asset hasn't been captured yet, `src` holds the placeholder description exactly as written in the HTML. When a real file lands in `courses/<name>/assets/`, replace `src` with the filename (e.g. `"events-page.png"`). `alt` is required — write descriptive alt text even when the HTML only has a caption; use `"decorative": true` instead of `alt` only if the image is purely ornamental.

### `process`

```json
{
  "type": "process",
  "intro": "Follow these steps to create a ticketed event.",
  "steps": [
    "Navigate to **Events > All events**.",
    "Click **Create event**.",
    "Tick **Sell tickets** and save."
  ],
  "summary": "Your event now appears in the member booking flow."
}
```

From `[INTERACTIVE — INTERACTIVE:PROCESS]`. Numbered workflow steps; bold UI labels survive as markdown-free plain text or inline HTML.

### `accordion`

```json
{
  "type": "accordion",
  "items": [
    { "title": "Ticket types", "html": "<p>Standard, VIP and early-bird…</p>" },
    { "title": "Capacity rules", "html": "<p>Capacity is per ticket type…</p>" }
  ]
}
```

From `[INTERACTIVE — INTERACTIVE:ACCORDION]`. Expandable multi-concept sections.

### `callout`

```json
{ "type": "callout", "tone": "important", "html": "<p>Ticket sales are final once the event starts.</p>" }
```

For *Important to Note* / ⚠ notes. `tone`: `"info"` | `"warning"` | `"tip"` | `"important"`.

### `quote`

```json
{ "type": "quote", "html": "<p>You should now be able to:</p><ul><li>Create a ticketed event…</li></ul>" }
```

Used by the Summary lesson to restate objectives.

### `video`

```json
{ "type": "video", "src": "https://airtable.com/embed/appdInia1qyUjAidC/paghPEvcF3ZihmLQt/form?prefill_Course+Name=Event+Tickets", "title": "Course feedback form" }
```

From `[VIDEO/MULTIMEDIA]` blocks, including the Summary lesson's Airtable feedback iframe. For YouTube/Vimeo embeds put the watch URL in `src`; for direct files the filename goes in `assets/` and `src` is that filename.

### `quiz`

```json
{
  "type": "quiz",
  "graded": true,
  "maxAttempts": 3,
  "questions": [
    {
      "id": "q1",
      "kind": "multiple-choice",
      "prompt": "Where do operators create a ticketed event?",
      "options": ["Events > All events", "Settings > Billing", "Members > Bookings"],
      "correctIndex": 0,
      "correctFeedback": "Correct — events live under Events > All events.",
      "incorrectFeedback": "Not quite — check the Events area of the Admin Panel."
    },
    {
      "id": "q2",
      "kind": "true-false",
      "prompt": "Capacity limits apply per ticket type.",
      "answer": true,
      "correctFeedback": "Correct.",
      "incorrectFeedback": "Each ticket type has its own capacity."
    },
    {
      "id": "q3",
      "kind": "fill-in-blank",
      "prompt": "The toggle that enables ticket sales is called ______.",
      "answers": ["Sell tickets"],
      "caseSensitive": false,
      "correctFeedback": "Correct.",
      "incorrectFeedback": "It's the Sell tickets toggle on the event form."
    },
    {
      "id": "q4",
      "kind": "matching",
      "prompt": "Match each ticket concept to its definition.",
      "pairs": [
        { "left": "Capacity", "right": "Maximum number of tickets of one type" },
        { "left": "Early-bird", "right": "Discounted price before a cutoff date" }
      ],
      "correctFeedback": "Well matched.",
      "incorrectFeedback": "Review the ticket type settings."
    }
  ]
}
```

From `[KNOWLEDGE CHECK / QUIZ]` blocks. Rules carried over from the Academy Lesson generation: test application, not recall; 5–12 questions per lesson; corrective feedback on every question (both `correctFeedback` and `incorrectFeedback` are required fields here).

Question kinds and their field contracts:

| kind | Required fields | Notes |
|---|---|---|
| `multiple-choice` | `prompt`, `options[]`, `correctIndex`, feedback | `correctIndex` is 0-based into `options` |
| `true-false` | `prompt`, `answer` (boolean), feedback | Maps to a two-option multiple choice at build time |
| `fill-in-blank` | `prompt`, `answers[]`, feedback | Distinct spellings only; `caseSensitive` defaults false |
| `matching` | `prompt`, `pairs[{left,right}]`, feedback | Right column shuffles automatically at build time |

`id` values: letters, digits and inner underscores only (e.g. `q1`, `final_2`). Unique within the quiz.

## Hands-on activities

If a knowledge check is a hands-on activity prompt rather than a scored quiz, emit a `text` block (the activity instructions) plus a `callout` with `tone: "tip"` — do not emit a `quiz` block.

## What the builder does with this file

See the "Building Tessera courses from a course spec" section in `AGENTS.md` of the `elearning-courses` workspace. In short: one spec → one course folder under `courses/<kebab-case courseName>/`, blocks mapped to Svelte pages and Tessera components, then `pnpm check` + `pnpm export`.
