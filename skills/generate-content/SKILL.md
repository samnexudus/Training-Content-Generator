# generate-content

Generate training and product content for Nexudus features. Supports five output types — one feature input can produce multiple outputs in a single session.

## Content types

| Type | Audience | Output |
|---|---|---|
| Product Update | Space operators and customers (external) | `.html` |
| Webinar Brief | Training team and webinar hosts (internal) | `.html` |
| Video Script | Nexudus Unlocked YouTube series (external) | `.html` |
| Training Script | Internal micro-learning sessions | `.html` |
| Academy Lesson | Nexudus Academy LMS / Articulate Rise (internal or customer) | `.html` |

## Trigger phrases

- "generate content", "generate outputs", "create content for [feature]"
- "product update", "write a product update", "draft a product update"
- "webinar brief", "generate a brief", "create a webinar brief"
- "video script", "unlocked script", "write a video script"
- "training script", "write a training script"
- "academy lesson", "create an academy lesson"
- Branch-scan mode: "scan branch [name]", "check what changed on [branch]", "generate a [content type] from branch [name]", "look at branch [name] and create [content type]"

---

## STEP 1 — Ask which content types to generate

Always ask this first, before requesting any source material — even if the user already named a content type in their request, present the full list so they can confirm or add more:

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

Once the content types are confirmed, determine which input mode applies:

- **Mode A — Paste source material:** the user pastes Basecamp text, a product brief, release notes, screenshots, or their own description.
- **Mode B — Scan a branch:** the user names a branch (and optionally a repo and content type) and asks you to scan the code to work out what changed.

If it's unclear which mode the user wants, ask:

> "Would you like to paste the source material (Basecamp text, a product brief, release notes, or your own description), or should I scan a branch in one of the Nexudus repos to work out what changed?"

---

### Mode A — Paste source material

Ask for the source material:

> "Please paste the source material for this feature — this can be Basecamp text, a product brief, release notes, or your own description. The more detail the better."

If the user wants to pull notes directly from a FigJam board, ask them to paste the content — direct FigJam reads are not currently supported by this plugin.

---

### Mode B — Scan a branch

**Load `reference/pr-source-guide.md` before doing anything else in this mode.** It is the single source of truth for how to read a change set: which repo maps to which product surface, the reading order (description → changed files → diff), how to resolve exact UI labels from i18n strings, and the caveats for feature flags, backend-only changes, and multi-feature branches.

#### B1 — Locate the branch

Repos live in `~/Desktop/Nexudus Products/`:

| Repo | Product surface |
|---|---|
| `nexudus-coworking-admin-v3.2` | Admin Panel |
| `nexudus-coworking-ecommerce` | Members Portal |
| `Nexudus.Coworking` | Backend / API |

- If the user named the repo, use it. Otherwise auto-detect: check each repo for the branch (`git fetch origin && git branch -a | grep <branch-name>`).
- Found in exactly one repo → proceed with it.
- Found in multiple repos, or none → ask the user which repo to scan (or whether the branch name is slightly different).

#### B2 — Confirm the base branch

Never assume the base branch. Ask:

> "Which branch should I compare against — the one this feature was branched from (e.g. `main`, `develop`, or a release branch)?"

#### B3 — Run the scan

```bash
cd ~/Desktop/Nexudus\ Products/<repo>
git fetch origin
git log origin/<base>..<branch> --oneline --stat   # commit messages + file map
git diff origin/<base>...<branch> --stat           # cumulative file list
git diff origin/<base>...<branch> -- <specific files>   # targeted diffs only
```

Treat the **cumulative diff as one change set**, not per-commit. Use the commit messages (subjects = intent, bodies = detail) as the substitute for a PR description. Follow the pr-source-guide reading order: description/commits first, changed-file list second, targeted diffs third. Stop reading deeper once you can name every user-visible change.

Extract:

- Feature name (for file naming and headings)
- Every user-visible change, grouped by product surface
- Exact UI labels resolved from i18n strings (per the guide)
- Navigation paths built from route structure + `reference/nexudus-product-context.md`
- The operator-facing "why" — what problem the update solves (see "The core question" in Step 4). If commit messages don't state it and it can't be safely inferred from the change, leave the `[PROMPT — ...]` placeholder in the draft rather than guessing
- Feature flags, rollout notes, and linked tickets/URLs found in commit messages

If the branch isn't in the local checkout, follow the guide's "Unmerged or un-pulled PRs and branches" section; if that fails too, fall back to Mode A and ask the user to paste the material.

#### B4 — Present findings, then check for gaps

Summarise what the scan found (feature name, surfaces affected, key user-visible changes) and confirm it matches the user's expectation before proceeding to Step 3.

**Insufficient-context fallback:** assess whether the code provides enough context for the requested content type(s). Typical gaps: a backend-only change with no UI labels, vague commit messages, a missing operator-facing benefit, or no way to tell what the feature looks like. If there are gaps, do NOT guess. Instead:

1. Tell the user exactly what's missing — e.g. "The diff shows a new API endpoint but no UI changes, so I can't write demo steps for a Product Update."
2. Offer them the option to supply more information from another source: Basecamp text or links, Figma design descriptions, screenshots, or their own description.
3. If they supply it, merge that material with the code findings and continue. If they decline, generate with `[TBC]` markers on the gaps and flag them in the Step 5 summary.

---

### Pull CLI context (run as soon as source material is received, in either mode)

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

**In branch-scan mode (Mode B), skip any question whose answer was already extracted from the code** — e.g. Basecamp/Figma links found in commit messages, or UI details and navigation paths resolved from the diff. Only ask for fields the code cannot provide: dates, hosts, session length, marketing names, quiz topics, course structure choices. Note in the message which fields were auto-filled so the user can correct them if needed.

---

### Product Update — questions to ask

```
**Product Update**
- Basecamp link(s): (Mode B: use any found in commit messages; otherwise ask)
- Figma link(s): (Mode B: use any found in commit messages; otherwise ask)
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
- Course name (what should the course be called?):
- How many content lessons? (e.g. one lesson covering everything, or split by topic):
- Version number (default: v2.01):
- Will this lesson include a recorded walkthrough video?
- Any specific Rise interaction types to use or avoid? (defaults: Process for workflows, Accordion for multi-concept sections)
```

---

## STEP 4 — Generate

Once all answers are received, generate the selected outputs. If multiple types were requested, produce them in the order listed in Step 2. Save all files to `~/Desktop/Nexudus Content/[Feature Name]/`.

### Generation mechanism

**Always** generate `.html` files by writing a Python script that writes HTML directly to disk. No external dependencies are required — Python's built-in file I/O is sufficient.

**Load `reference/docx-generation.md` before writing any generator script.** Despite the filename, it now contains the HTML boilerplate (page layout, Nexudus typography, helper patterns, table structure) that produces correctly-formatted output. Copy those patterns rather than re-inventing them.

Write each generator script to `/tmp/gen_[output_type].py`, run it with `python3`, then move on. One script per output type.

Follow the per-type generation instructions below.

### The core question: "What does this update solve?"

Product Update, Webinar Brief, Video Script, and Training Script outputs must each answer **what problem or pain point the update is trying to solve** — not just what it does. Determine the answer in this order:

1. **From the source material** — PR/commit messages, Basecamp text, or pasted briefs often state the intent ("fixes the issue where...", "operators were struggling to..."). Use it.
2. **Inferred from the code change** — a fix or constraint removal implies the pain (e.g. a new validation on an import screen implies bad data was getting through). Only use this when the inference is safe and obvious; frame it as the benefit, not speculation.
3. **Neither works** — leave a visible prompt in the drafted content at the spot where the answer belongs: `[PROMPT — What does this update solve? Add one or two sentences on the problem this addresses for the reader.]` Do NOT invent an answer. List every such prompt in the Step 5 summary and offer to fold the user's answer into the file once they provide it.

Worked example (inference): a branch adds a duplicate-email warning to the customer creation form → "Previously, operators could accidentally create two accounts for the same customer. Duplicate Accounts Warning now flags a matching email address before the record is saved."

---

## Product Update — generation

**Load before generating:**
- `reference/docx-generation.md` — `python-docx` boilerplate and helpers (always)
- `reference/product-update-format.md` — format rules and patterns
- `reference/nexudus-product-context.md` — terminology and navigation conventions
- One example from `examples/product-updates/` — pick the closest match by feature scope

**Opening paragraph pattern:**
> "[Feature name] gives [space operators / members] [key benefit]. [What it is and where to find it.] [Pricing or how to get started if applicable.]"

The opening paragraph must answer **what problem this update solves** (see "The core question" above). If the source material doesn't carry the answer and it can't be safely inferred from the change, insert the `[PROMPT — ...]` placeholder after the opening paragraph instead of guessing.

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

**File naming:** `[Feature Name] - Product Update.html`

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
- Benefits / Feature Overview — must open by answering **what problem this update solves** (see "The core question" above); if unknown, insert the `[PROMPT — ...]` placeholder in this row
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

**File naming:** `[Feature Name] - Webinar Brief.html`

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
[2–3 sentence overview — must include what problem this update solves (see "The core question" above); if unknown, insert the [PROMPT — ...] placeholder here]

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

**File naming:** `[Feature Name] - Unlocked Video Script.html`

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
[Full spoken intro — 3–5 sentences, including what problem this update solves (see "The core question" above); if unknown, insert the [PROMPT — ...] placeholder here]

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

**File naming:** `[Feature Name] - Training Script.html`

---

## Academy Lesson — generation

**Load before generating:**
- `reference/docx-generation.md` — `python-docx` boilerplate and helpers (always)
- `reference/academy-lesson-template.md` — Rise block structure, writing guidelines, and real examples

**Document structure** (Rise block outline):

Every course has a **course cover page**, one or more **content lessons**, and a fixed **Summary lesson** at the end.

```
COURSE: [Course name]
SCORM VERSION: SCORM 2004 4th Edition
VERSION: v2.XX
FILE: [Course Name] - Academy Lesson.docx

---

COURSE COVER PAGE
[1–2 sentences on what the feature is and why it matters]
By the end of this course, you will be able to:
- [Objective 1 — action verb + outcome]
- [Objective 2]
Click Start to begin!
The content and images in this course are accurate as of publication but may change over time.
Images are for illustration only and may differ from what appears on your system.
Version [X.XX]

---

LESSON [N]: [Topic name]

  [TEXT BODY] — overview paragraph
  [TEXT HEADING] — sub-topic heading
  [TEXT BODY] — explanation (2–4 sentences per block)
  [IMAGE] — screenshot + descriptive caption
  [INTERACTIVE — INTERACTIVE:PROCESS] — step-by-step workflow (with INTRO + numbered steps + SUMMARY)
  [INTERACTIVE — INTERACTIVE:ACCORDION] — expandable multi-concept sections
  [TEXT HEADING] Knowledge Check
  [TEXT BODY] — hands-on activity prompt, OR [KNOWLEDGE CHECK / QUIZ] — quiz questions with feedback

--- (repeat for each content lesson)

LESSON: Summary  ← always the final lesson, always titled "Summary"

  [QUOTE] You should now be able to: [restate objectives]
  [VIDEO/MULTIMEDIA] <iframe src="https://airtable.com/embed/appdInia1qyUjAidC/paghPEvcF3ZihmLQt/form?prefill_Course+Name=[URL-encoded name]" frameborder="0" width="100%" height="600px"></iframe>
  [CONTINUE] FINISH COURSE
```

**Knowledge check rules:** test application, not recall. 5–12 questions depending on lesson length. Types: multiple choice, true/false, fill-in-blank, matching. Always include corrective feedback for wrong answers. Mark correct answer with ✓.

**File naming:** `[Course Name] - Academy Lesson.html`

---

## Shared HTML formatting standards

Apply to all output types:

- **Font:** Arial (with sans-serif fallback), 14px default body
- **Title:** `<h1>` — bold, black
- **Headings:** `<h2>`, `<h3>`, `<h4>` — Arial, bold, black
- **Lists:** standard `<ul>` / `<ol>` — never hardcoded bullet characters
- **Tables:** full-width, collapsed borders, `#CCCCCC` border colour, `#F2F2F2` alternating row shading
- **Bold:** all navigation paths and UI element names used as actions — wrap in `<strong>`
- **Callouts:** italic paragraphs with a left border for *Important to Note* style notes
- **Media placeholders:** grey italic `<p>` tags, e.g. `[GIF — show ...]`
- **Page width:** max 900px, centred, with 40px padding

---

## STEP 5 — Present summary

After all files are saved, report:
1. File path(s)
2. Any fields still marked `[TBC]` that need filling
3. Any `[PROMPT — What does this update solve? ...]` placeholders left in the content — ask the user for the answer and offer to fold it into the file(s)
4. Any demo steps using placeholder data (prompt to confirm real environment details)
5. Any media placeholders (`[GIF — ...]`, `[SCREENSHOT — ...]`) that need assets captured
