# generate-content

Generate training and product content for Nexudus features. Supports five output types — one feature input can produce multiple outputs in a single session.

## Content types

| Type | Audience | Output |
|---|---|---|
| Product Update | Space operators and customers (external) | `.docx` |
| Webinar Brief | Training team and webinar hosts (internal) | `.docx` |
| Video Script | Nexudus Unlocked YouTube series (external) | `.docx` |
| Training Script | Internal micro-learning sessions | `.docx` |
| Academy Lesson | Nexudus Academy LMS / Articulate Rise (internal or customer) | `.docx` |

## Trigger phrases

- "generate content", "generate outputs", "create content for [feature]"
- "product update", "write a product update", "draft a product update"
- "webinar brief", "generate a brief", "create a webinar brief"
- "video script", "unlocked script", "write a video script"
- "training script", "write a training script"
- "academy lesson", "create an academy lesson"

---

## STEP 1 — Ask which content types to generate

Always ask this first, before requesting any source material:

> "Which content would you like me to generate? I can produce any or all of the following:
>
> 1. **Product Update** — external-facing doc for operators and customers
> 2. **Webinar Brief** — host guide for the training team and webinar hosts
> 3. **Video Script** — Nexudus Unlocked script with screen cues and narration
> 4. **Training Script** — full internal session script with trainer notes and Kahoot
> 5. **Academy Lesson** — structured lesson outline for Articulate Rise / SCORM
>
> You can choose one or several."

Wait for confirmation before proceeding to Step 2.

---

## STEP 2 — Gather feature input

Once the content types are confirmed, ask for the source material:

> "Please paste the source material for this feature — this can be Basecamp text, a product brief, release notes, or your own description. The more detail the better."

If the user wants to pull notes directly from a FigJam board, ask them to paste the content — direct FigJam reads are not currently supported by this plugin.

### Pull CLI context (run as soon as source material is received)

```bash
nexudus resources list --agent    # Real resource names for demo steps
nexudus coworkers list --agent    # Real member names for scenarios and activities
nexudus tariffs list --agent      # Real plan names for examples
```

Use this data throughout all content types to make examples and demo steps specific rather than generic.

---

## STEP 3 — Ask type-specific questions

For each selected content type, ask all required questions in a **single message** before generating anything. If multiple types are selected, ask all questions for all types together. Wait for the user's response before generating any output.

Tell the user they can leave any field blank and it will be marked `[TBC]`.

---

### Product Update — questions to ask

```
**Product Update**
- Basecamp link(s):
- Figma link(s):
- Session recording URL (if available):
- Format: long version, high-level summary, or both?
- Any unresolved items or unknowns I should flag as [TBC]?
```

---

### Webinar Brief — questions to ask

```
**Webinar Brief**
- Topic: [I'll suggest one — confirm or correct]
- Marketing Name: [I'll suggest one — confirm or correct]
- Date and Time: e.g. "Wednesday 24 September, 5–5:30pm"
- Hosts: full name, email address, and job title for each host
- Moderators: name(s), or leave blank if none
- Basecamp To-Do List: URL (or "To be updated")
- Slides Due:
- Practice Session 1:
- Practice Session 2:
- Any additional resource links (product update, Knowledge Base articles)?
```

Before asking, suggest a **Topic** and **Marketing Name** derived from the feature input so the user only needs to confirm or correct them.

---

### Video Script — questions to ask

```
**Video Script**
- Are there any known GIF or MP4 filenames to reference in screen cues?
- Should I include a YouTube description section at the end?
- Any specific section order or topics to prioritise?
```

Feature name and section breakdown are derived from the feature input — no need to ask.

---

### Training Script — questions to ask

```
**Training Script**
- Session date(s): e.g. "8th–10th July 2025" or "TBC"
- Session length: 30, 45, or 60 minutes?
- Integrations that must be active during the session:
- Pre-existing data or setup required before the session:
- End with Kahoot quiz, hands-on activity, or both?
- If Kahoot: any specific topics to test? (default: covers all main sections)
```

---

### Academy Lesson — questions to ask

```
**Academy Lesson**
- Course or module this lesson belongs to (if known):
- Audience: internal staff, customers, or both?
- Target completion time (minutes):
- SCORM version: 1.2 or 2004?
- Will this lesson include a recorded walkthrough video?
- Preferred Rise interaction types (accordion, scenario, labelled graphic, etc.)? Leave blank to use defaults.
```

---

## STEP 4 — Generate

Once all answers are received, generate the selected outputs. If multiple types were requested, produce them in the order listed in Step 2. Save all files to `~/Desktop/Nexudus Content/[Feature Name]/`.

### Generation mechanism

**Always** generate `.docx` files by writing a Python script that uses `python-docx`. Do not try to use the `anthropic-skills:docx` skill to produce the file — it is a knowledge skill that returns instructions, not a tool that creates files for you.

Before writing the script, run a one-time dependency check:

```bash
python3 -c "import docx" 2>&1
```

If it errors, install:

```bash
pip3 install python-docx
```

Mention any install in your final summary so the user knows.

**Load `reference/docx-generation.md` before writing any generator script.** It contains the
boilerplate (page setup, font fallbacks, heading styles, helper functions, table patterns)
that has been proven to produce correctly-formatted output. Copy those patterns rather than
re-inventing them — getting fonts, list numbering, and table shading right from scratch is
slow and error-prone.

Write each generator script to `/tmp/gen_[output_type].py`, run it with `python3`, then move
on. One script per output type.

Follow the per-type generation instructions below.

---

## Product Update — generation

**Load before generating:**
- `reference/docx-generation.md` — `python-docx` boilerplate and helpers (always)
- `reference/product-update-format.md` — format rules and patterns
- `reference/nexudus-product-context.md` — terminology and navigation conventions
- One example from `examples/product-updates/` — pick the closest match by feature scope

**Opening paragraph pattern:**
> "[Feature name] gives [space operators / members] [key benefit]. [What it is and where to find it.] [Pricing or how to get started if applicable.]"

**Document structure:**
```
Notes:
[Basecamp link]
[Figma link]
[Session recording]

[FEATURE NAME]

[Opening paragraph — 2–3 sentences]

### [Major area — e.g., Admin Panel]

#### [1. Feature Name]
[GIF — show [description]]

[1–2 sentence description of what this does and why it matters]

1. Navigate to **[Path]**.
2. Click **[Action]**.
3. Click **Save changes**.

**Note:** [Any important callout]
```

**Rules:**
- Bold all navigation paths: **Settings > Section > Page**
- Bold all UI element names used as actions: "Click **Save changes**"
- Numbered lists for workflows; bullet lists for feature descriptions
- `[GIF — show [description]]` for every major section
- `*Important to Note:*` for significant behavioural notes
- `**⚠ Important:**` for deprecation or breaking changes
- `[TBC]` for anything unconfirmed
- Open feature updates with "Previously, [old behaviour]. [Feature] now..."
- Never use internal shorthand — spell out Admin Panel, Members Portal, Virtual Office

**Validate against `reference/format-quick-check.md` before saving.**

**File naming:** `[Feature Name] - Product Update.docx`

---

## Webinar Brief — generation

**Load before generating:**
- `reference/docx-generation.md` — `python-docx` boilerplate, table helpers (always)
- `reference/webinar-brief-template.md` — structure and writing guidelines
- One example from `examples/webinar-briefs/` — pick the closest match by feature type

**Document structure** (in order):
1. Title: `[Feature Name] Webinar Brief`
2. Metadata table (Topic, Marketing Name, Date and Time, Hosts, Moderators, Basecamp To-Do List)
3. Italic note for hosts (verbatim — see template)
4. Key dates table (Slides Due, Practice Session 1, Practice Session 2)
5. Resources (bulleted list)
6. Main content table — two columns: **Topic/Section** | **Points to touch on**

**Main content table standard sections:**
- Introductions
- Housekeeping (Duration, Q&A, Recording)
- Benefits / Feature Overview
- [Feature-specific sections derived from input — use Explain: and Demonstrate: pattern]
- Live Q&A
- Wrap up

Use real resource and member names from CLI data in all Demonstrate: steps.

**docx formatting:**
- Header row: `#1F4E79` background, white bold text
- Alternating row shading: white / `#F2F2F2` (ShadingType.CLEAR — never SOLID)
- All table borders: `#CCCCCC` single
- Left column 2500 DXA, right column 6860 DXA, total 9360 DXA
- "Explain:" and "Demonstrate:" labels bold; numbered demo steps restart at 1 per row
- Metadata table: left column `#F2F2F2` shading, bold labels

**File naming:** `[Feature Name] - Webinar Brief.docx`

---

## Video Script — generation

**Load before generating:**
- `reference/docx-generation.md` — `python-docx` boilerplate and helpers (always)
- `reference/video-script-template.md` — structure, narration rules, screen cue formats
- One example from `examples/video-scripts/` — pick the closest match

**Standard structure:**
```
[FEATURE NAME] Unlocked Video Script

[INTRO - Unlocked clip]
[Orange Slide - [Feature Name]]

Hello and welcome to Nexudus Unlocked!

[White slide with intro text]
[2–3 sentence overview]

---

[White screen: [Section heading]]
[On-screen cue]
[Narration]

[Repeat sections as needed]

---

[Outro]
That's about it for this Nexudus Unlocked! As always, if you have any questions, please reach out to our Support team or check out our Knowledge Base, help.nexudus.com.

---

[YouTube description — if requested]
```

**Narration rules:**
- Write for the ear — ≤20 words per sentence, present tense, second person
- One action per beat — split compound actions into separate sentences
- Contractions are fine; no marketing language
- Bold navigation paths and UI elements exactly as in product updates
- Use the standard close line verbatim — do not paraphrase

**File naming:** `[Feature Name] - Unlocked Video Script.docx`

---

## Training Script — generation

**Load before generating:**
- `reference/docx-generation.md` — `python-docx` boilerplate and helpers (always)
- `reference/training-script-template.md` — structure, timing guide, Kahoot guidelines
- One example from `examples/training-scripts/` — pick the closest match

**Document structure:**
```
[TOPIC NAME]

Session dates: [dates]

Objectives:
Learners will be able to:
- [Objective 1 — action verb + outcome]
- [2–5 objectives total]

Considerations for this session:
- [Related product update reference]
- [Slide deck reference]
- [Required integrations]
- [Pre-existing data needed]

Set-up required before each session:
- [Specific setup tasks]

---

Script:

Intro
[Full spoken intro — 3–5 sentences]

Section 1: Learn ([X] minutes)
[Explanations, audience questions, trainer notes]

Section 2: Do ([X] minutes)
[Numbered demo steps, Highlight annotations, Trainer notes]

Section 3: Apply ([X] minutes)
[Kahoot quiz and/or hands-on activity]
```

**Timing guide:**

| Session length | Learn | Do | Apply |
|---|---|---|---|
| 30 min | 10 min | 15 min | 5 min |
| 45 min | 15 min | 20 min | 10 min |
| 60 min | 20 min | 30 min | 10 min |

**Kahoot:** 8–10 questions for 45–60 min; 5–6 for shorter sessions. All 4 options plausible. Mark correct answer with `← Correct`. Test application, not just recall.

Use real resource and member names from CLI data in all demo steps and activity scenarios.

**File naming:** `[Feature Name] - Training Script.docx`

---

## Academy Lesson — generation

**Load before generating:**
- `reference/docx-generation.md` — `python-docx` boilerplate and helpers (always)
- `reference/academy-lesson-template.md` — Rise block structure and writing guidelines
- Check `examples/academy-lessons/` — note: these are SCORM ZIPs, not editable docs. Use as scope/topic reference only.

**Document structure** (Rise block outline):
```
LESSON TITLE: [Feature Name] — [Short subtitle]
COURSE: [course name]
AUDIENCE: [Internal / Customer-facing / Both]
ESTIMATED TIME: [~X mins]
VERSION: v1.0

[COVER BLOCK] — title, subtitle, background image note
[INTRO BLOCK] — objectives (2–4, action verb + outcome)
[SECTION DIVIDER] — Learn
[CONTENT BLOCK(S)] — explanations, with image/GIF notes
[SECTION DIVIDER] — Do
[INTERACTION BLOCK(S)] — scenario, labelled graphic, or process
[KNOWLEDGE CHECK] — 2–4 quiz questions with feedback
[SECTION DIVIDER] — Summary
[SUMMARY BLOCK] — key points
[OUTRO BLOCK] — next steps and resource links
```

**Knowledge check questions:** test application, not recall. Always include corrective feedback for wrong answers.

**File naming:** `[Feature Name] - Academy Lesson.docx`

---

## Shared docx formatting standards

Apply to all output types:

- **Page:** US Letter (12240 × 15840 DXA), 1-inch margins (1440 DXA each side)
- **Font:** Arial, 12pt default
- **Title:** Heading 1 style
- **Lists:** LevelFormat.BULLET / LevelFormat.DECIMAL with numbering config — never unicode bullets or `\n`
- **Tables:** WidthType.DXA always (never PERCENTAGE); cell margins top/bottom 80, left/right 120; ShadingType.CLEAR (never SOLID)
- **PageBreak:** must be inside a Paragraph element
- **Bold:** all navigation paths and UI element names used as actions

---

## STEP 5 — Present summary

After all files are saved, report:
1. File path(s)
2. Any fields still marked `[TBC]` that need filling
3. Any demo steps using placeholder data (prompt to confirm real environment details)
4. Any media placeholders (`[GIF — ...]`, `[SCREENSHOT — ...]`) that need assets captured
