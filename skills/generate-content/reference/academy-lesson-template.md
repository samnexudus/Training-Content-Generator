# Nexudus Academy Lesson — Template & Guidelines

> **Status: Skeleton** — This template will be refined once real lesson examples are added
> to `examples/academy-lessons/`. Check that folder first; if examples exist, use them as the
> primary style reference over this file.
>
> Content produced from this template is intended for import into **Articulate Rise 360**
> and exported as a **SCORM** package for the Nexudus Academy LMS.

---

## What is a Nexudus Academy lesson?

A self-paced e-learning module published in Rise (Articulate 360). Learners progress through
structured screens at their own pace. Lessons are exported as SCORM files and hosted in the
Nexudus Academy LMS.

**Audience:** [TBC — confirm: internal staff, customers, or both?]
**Typical length:** [TBC — confirm target completion time per lesson]
**Platform:** Articulate Rise 360 → SCORM 1.2 / SCORM 2004

---

## Rise lesson structure (standard)

Rise lessons are built from **blocks** arranged in a linear sequence. Each block maps to a
content type in Rise. Use the annotations below so the Rise author knows exactly what block
to create.

```
LESSON TITLE: [Feature Name] — [Short subtitle, e.g. "Setting up Virtual Offices"]

COURSE: [Course/module name this lesson belongs to, if known]
AUDIENCE: [Internal / Customer-facing / Both]
ESTIMATED TIME: [~X mins]
VERSION: [v1.0]

---

[COVER BLOCK]
Title: [Lesson title]
Subtitle: [One-line description of what this lesson covers]
Background image: [TBC / description of image to use]

---

[INTRO BLOCK — Text + Image or Video]
Heading: What you'll learn
Body:
By the end of this lesson, you'll be able to:
- [Objective 1 — action verb + outcome]
- [Objective 2]
- [Objective 3]

[Use 2–4 objectives. Action verbs: explain, demonstrate, identify, create, navigate, understand]

---

[SECTION DIVIDER]
Label: Learn

---

[CONTENT BLOCK — Text + Image]
Heading: What is [Feature]?
Body:
[2–3 sentences. Plain language. What the feature is, who it's for, where it lives.]

[IMAGE/GIF: describe what should be shown]

---

[CONTENT BLOCK — Numbered List or Accordion]
Heading: How [Feature] works
[Use accordion blocks for multi-step concepts; numbered list for linear steps]

Step 1 — [Step title]
[Step description. 1–2 sentences.]

Step 2 — [Step title]
[Step description.]

...

---

[SECTION DIVIDER]
Label: Do

---

[CONTENT BLOCK — Scenario / Labelled Graphic / Process]
Heading: Let's [action]
[Describe the interactive element type: scenario, labelled graphic, process block, etc.]
[TBC — confirm preferred Rise interaction types once examples are available]

---

[KNOWLEDGE CHECK — Quiz Block]
Question 1: [Question text]
Type: [Multiple choice / True-False / Fill in the blank]
Options:
- [Option A]
- [Option B] ← Correct
- [Option C]
Feedback (correct): "[Positive reinforcement + brief explanation]"
Feedback (incorrect): "[Corrective explanation]"

[Add 2–4 knowledge check questions per lesson as appropriate]

---

[SECTION DIVIDER]
Label: Summary

---

[SUMMARY BLOCK — Text]
Heading: What we covered
Body:
- [Key point 1]
- [Key point 2]
- [Key point 3]

---

[OUTRO BLOCK]
Heading: Next steps
Body:
[Optional — link to related lesson, product update, or support resource]
[TBC]

---

RISE AUTHOR NOTES:
- [Any specific Rise block types, theme settings, or interactions to use]
- [Any media assets needed and where to find them]
- [Any branching or conditional logic required]
```

---

## Writing guidelines for Rise content

### General

- **Write for self-paced reading** — learners have no trainer to clarify. Every sentence must
  stand alone.
- **One idea per screen/block** — don't overload a single block with multiple concepts.
- **Short paragraphs** — 2–3 sentences max per text body. Use bullets for lists.
- **Active voice, present tense** — same as all Nexudus content.

### Navigation paths and UI labels

Same rules as all other content types:
- Bold all navigation paths: **Settings > Companion Apps > NexBoard**
- Bold all UI elements used as actions: "Click **Save changes**"

### Knowledge checks

- Write questions that test application, not just recall
- ✅ "A member wants to check in via NexBoard. Which step comes first?"
- ❌ "What is NexBoard?"
- Always include corrective feedback for wrong answers — explain *why* the answer is wrong

### Tone

- **Friendly but focused** — slightly warmer than internal product updates (learner-facing)
- **No marketing language** — still instructional, not promotional
- **Encourage, don't condescend** — "Let's walk through..." not "Simply click..."

---

## File naming

`[Feature Name] - Academy Lesson.docx`

Example: `Virtual Offices - Academy Lesson.docx`

---

## Rise block type reference (common)

| Rise block | When to use |
|---|---|
| Text | General explanations, summaries |
| Numbered list | Step-by-step workflows |
| Labelled graphic | Annotating a screenshot of the UI |
| Accordion | Multi-concept sections learners expand |
| Scenario | Decision-based practice |
| Quiz | Knowledge checks at end of section |
| Divider | Section breaks (Learn / Do / Summary) |
| Video | Embedded walkthrough video |
| Button | Link to external resource (product update, docs) |

---

## Notes

- **This template is a starting point.** Once real examples are added to `examples/academy-lessons/`,
  update this file to reflect the actual Rise structure and conventions used by the team.
- Confirm target audience and lesson duration before generating.
- If the lesson includes a recorded video, generate a video script using
  `reference/video-script-template.md` first, then reference it in the Rise author notes.
