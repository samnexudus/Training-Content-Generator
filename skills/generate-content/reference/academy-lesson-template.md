# Nexudus Academy Lesson — Template & Guidelines

> **Grounded in real examples.** This template was written from analysis of 7 published
> Nexudus Academy SCORM packages (Bookings, FAQs, Introduction to Nexudus, Members Portal,
> Payment Integrations, Payments, Resources). Use it as the authoritative structural reference
> for all Academy Lesson generation.
>
> Content produced from this template is intended for rebuild in **Articulate Rise 360**
> and exported as a **SCORM 2004 4th Edition** package for the Nexudus Academy LMS.

---

## What is a Nexudus Academy lesson?

A self-paced e-learning module built in Articulate Rise 360. Learners progress through a
linear sequence of blocks at their own pace. Lessons are exported as SCORM 2004 (4th Edition)
packages and hosted in the Nexudus Academy LMS.

**Audience:** Customers (space operators and admins learning to use Nexudus)
**Typical length:** Varies by topic — FAQs is ~5 min, Bookings is ~30+ min
**Platform:** Articulate Rise 360 → SCORM 2004 4th Edition

---

## Course structure

Every course has this structure:

```
Course cover page  ← course-level, not a lesson
  └── Content lesson(s)  ← one per major topic area
  └── Summary lesson     ← always the final lesson, always titled "Summary"
```

The `.docx` output documents all lessons. The Rise author rebuilds the course in Rise from
this document.

---

## Course cover page

The course cover page is Rise's built-in cover. Write the course description as follows:

```
[What this course is about — 1–2 sentences on the feature/topic and why it matters]

By the end of this course, you will be able to:
- [Objective 1 — action verb + outcome]
- [Objective 2]
- [Objective 3]
[Use 2–5 objectives. Action verbs: create, manage, define, identify, differentiate, explain]

Click Start to begin!

The content and images in this course are accurate as of publication but may change over time.
Images are for illustration only and may differ from what appears on your system.

Version [X.XX]
```

**Pattern from real examples:**
> "FAQ articles are a convenient way to provide answers to common questions customers often
> have directly on the Members Portal and Passport app. Rather than an admin answering the same
> common questions, they can direct people to the FAQ section.
>
> By the end of this course, you will be able to create and publish FAQ articles to the Members
> Portal and Passport app.
>
> Click Start to begin!
>
> The content and images in this course are accurate as of publication but may change over time.
> Images are for illustration only and may differ from what appears on your system.
>
> Version 2.01"

---

## Content lesson structure

Each content lesson is a flat, sequential list of blocks. There are no explicit section dividers
(Learn/Do/Summary) within a lesson — structure is created by TEXT HEADING blocks.

### Standard content lesson block sequence

```
[TEXT BODY]
[Overview paragraph — what this lesson covers, 2–3 sentences]

[TEXT HEADING]
[First sub-topic heading]

[TEXT BODY]
[Explanation — 2–4 sentences. One idea per block. No overloading.]

[IMAGE]
[Caption: what to do / what this shows]

[TEXT HEADING]
[Second sub-topic heading]

[TEXT BODY]
[Explanation]

[INTERACTIVE — INTERACTIVE:PROCESS]  ← for step-by-step workflows
  [INTRO] [Optional intro text]
  [STEP 1] [Step text]
  [STEP 2] [Step text]
  ...
  [SUMMARY] [Optional summary text]

[TEXT HEADING]
[Third sub-topic heading]

[INTERACTIVE — INTERACTIVE:ACCORDION]  ← for multi-concept expand/collapse sections
  [ITEM] [Item title]
    [Item body — full explanation]
  [ITEM] [Item title]
    [Item body]

[TEXT HEADING]
Knowledge Check

[TEXT BODY] or [KNOWLEDGE CHECK / QUIZ]
[See Knowledge Check section below]
```

---

## Block type reference

| Block tag | Rise block | When to use |
|---|---|---|
| `[TEXT HEADING]` | Text block (heading) | Section titles within a lesson |
| `[TEXT BODY]` | Text block (body) | Explanations, context, notes |
| `[IMAGE]` | Image block | Screenshots — include caption describing what to do or what's shown |
| `[LIST]` | List block | Bulleted lists (3+ items); use text body for 1–2 items |
| `[INTERACTIVE — INTERACTIVE:PROCESS]` | Process block | Numbered step-by-step workflows |
| `[INTERACTIVE — INTERACTIVE:ACCORDION]` | Accordion block | Multi-concept sections learners expand |
| `[INTERACTIVE — INTERACTIVE:FLASHCARD]` | Flashcard block | Definitions, term/description pairs |
| `[INTERACTIVE — INTERACTIVE:LABELEDGRAPHIC]` | Labelled graphic | Annotating a screenshot with labelled hotspots |
| `[KNOWLEDGE CHECK / QUIZ]` | Quiz block | End-of-lesson knowledge check (full quiz) |
| `[VIDEO/MULTIMEDIA]` | Multimedia block | Embedded videos (YouTube, Loom) or iframes |
| `[QUOTE]` | Statement block | Used only in Summary lessons |
| `[CONTINUE]` | Divider | Section breaks; button label shown in brackets |

---

## Knowledge Check

Each content lesson ends with a Knowledge Check. Use one of two approaches:

### Approach 1 — Hands-on activity (preferred for practical topics)

```
[TEXT HEADING]
Knowledge Check

[TEXT BODY]
Now it's time to put into practice what you've learnt! [Describe a specific hands-on task
using the feature covered in this lesson — e.g., "Create a resource and add at least two
pricing rates. Then view the resource on the Members Portal."]
```

### Approach 2 — Quiz block (preferred for concept-heavy topics)

```
[KNOWLEDGE CHECK / QUIZ — [Quiz name]]  ([N] questions)
  Q: [Question text]
    - [Option A]
    - [Option B] ✓
    - [Option C]
    - [Option D]
    Feedback (correct): [Positive confirmation + brief explanation]
    Feedback (incorrect): [Corrective explanation — why the wrong answer is wrong]

  Q: True or False? [Statement]
    - True ✓
    - False
    Feedback: [Explanation]

  Q: Fill in the blank. [Sentence with gap]
    - [Accepted answer 1] ✓
    - [Accepted answer 2] ✓
    Feedback: [Explanation]
```

**Quiz rules:**
- 5–6 questions for shorter sessions; 8–12 for comprehensive lessons
- Question types: multiple choice, true/false, fill-in-blank, matching, drag-and-drop
- Test application, not recall — ask what a learner would *do*, not just what something *is*
- All wrong options must be plausible (no obvious filler)
- Always include corrective feedback on wrong answers
- Mark correct answers with ✓

---

## Summary lesson

The Summary lesson is always the final lesson in every course. It is always titled **"Summary"**
and always has exactly three blocks:

```
[QUOTE]
You should now be able to: [restate learning objectives from course cover — 1–2 sentences or
a short bulleted list]

[VIDEO/MULTIMEDIA]
<iframe src="https://airtable.com/embed/appdInia1qyUjAidC/paghPEvcF3ZihmLQt/form?prefill_Course+Name=[URL-encoded course name]" frameborder="0" width="100%" height="600px"></iframe>

[CONTINUE]
FINISH COURSE
```

**Real examples:**
> QUOTE: "You should now be able to create resources in the Admin Panel and define resource
> types and pricing."

> QUOTE: "You should now be able to:
> — Define general Nexudus terminology
> — Explain the differences between different elements of the Nexudus software platform"

The Airtable form is a feedback form. URL-encode the course name (spaces → `+`).
Example: `?prefill_Course+Name=Introduction+to+Nexudus`

---

## Full course document structure

```
COURSE: [Course name]
SCORM VERSION: SCORM 2004 4th Edition
AUDIENCE: Customers (space operators and admins)
VERSION: [v2.XX]
FILE: [Course Name] - Academy Lesson.docx

---

COURSE COVER PAGE
[Course description — see cover page section above]

---

LESSON 1: [Topic name]

  [TEXT BODY]
  [Overview paragraph]

  [TEXT HEADING]
  [Sub-topic 1]

  [TEXT BODY]
  [Explanation]

  [IMAGE]
  [Caption]

  [TEXT HEADING]
  [Sub-topic 2]

  ...

  [TEXT HEADING]
  Knowledge Check

  [TEXT BODY or KNOWLEDGE CHECK / QUIZ]
  [Hands-on activity or quiz questions]

---

LESSON 2: [Topic name — if multiple lessons needed]

  [Same pattern]

---

LESSON N: Summary

  [QUOTE]
  You should now be able to: [objectives]

  [VIDEO/MULTIMEDIA]
  <iframe src="https://airtable.com/embed/appdInia1qyUjAidC/paghPEvcF3ZihmLQt/form?prefill_Course+Name=[URL-encoded name]" frameborder="0" width="100%" height="600px"></iframe>

  [CONTINUE]
  FINISH COURSE
```

---

## Writing guidelines

### General
- **Second person, present tense** — "you can", "click", "select"
- **One idea per block** — don't overload a single text block with multiple concepts
- **Short paragraphs** — 2–4 sentences max per TEXT BODY block
- **Active voice** — same as all Nexudus content

### Navigation paths and UI labels
- Bold all navigation paths: **Settings > Booking and calendar settings > General tab**
- Bold all UI elements used as actions: "Click **Save changes**"
- Spell out full module names: **Operations module**, **Inventory module**, **Admin Panel**
- Never use shorthand: write "Members Portal" not "MP", "Admin Panel" not "AP"

### Interactive blocks
- Use PROCESS blocks for numbered how-to workflows (creating a record, placing a booking)
- Use ACCORDION blocks for multi-concept sections where each item is standalone (pricing tabs, limits tabs)
- Use LABELEDGRAPHIC for annotating complex UI screenshots
- Use FLASHCARD for term/definition pairs (e.g., terminology lesson)

### Images
- Include a descriptive caption for every IMAGE block
- Caption should tell the learner what they are looking at or what to do
- Placeholder format: `[IMAGE — show [description of what screenshot should show]]`

### Tone
- **Instructional but friendly** — warmer than product updates, still focused
- **Encourage without being patronising** — "Let's take a look at..." works; "Simply click..." does not
- **No marketing language** — still instructional, not promotional

---

## File naming

`[Course Name] - Academy Lesson.docx`

Examples:
- `FAQs - Academy Lesson.docx`
- `Resources - Academy Lesson.docx`
- `Bookings - Academy Lesson.docx`
