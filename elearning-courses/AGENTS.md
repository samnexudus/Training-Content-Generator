# SCORM course library: authoring guide

This is the Nexudus **SCORM generator** workspace, built on the open-source
[Tessera](https://tesseralearn.dev) framework (Tessera is only the underlying
engine — refer to this tool as "the SCORM generator" or "the SCORM course
library"). It owns the dependencies once and holds many courses under
`courses/`, with a shared design system in `shared/` (imported as `$shared`).
The authoring guide ships with the framework. Run `pnpm install`, then read
`node_modules/tessera-learn/AGENTS.md` before generating or editing course
content. It routes specialised tasks to the reference files in
`node_modules/tessera-learn/docs/`.

@./node_modules/tessera-learn/AGENTS.md

**Open this workspace folder** (not an individual course) so this guide is in
scope. Add a course with `pnpm tessera new <name>`; run a command against one with
`pnpm dev <name>` (or cd into its folder and run `npx tessera dev`). The framework guide always
matches your installed `tessera-learn` version, so there's nothing to keep in sync
above this line.

---

## Project notes

- **What this workspace is**: the AI-maintained version of Nexudus Academy
  courses. Content is authored by the generate-content skill (in
  `../skills/generate-content/` at the repo root), which writes an Academy
  Lesson as both a human-readable `.html` (source for the manually-maintained
  Articulate Rise course) and a machine-readable `course-spec.json` (kept in
  `specs/` here). This workspace consumes the spec; the written text goes in
  verbatim — never re-draft or paraphrase it.
- **Brand defaults** (fonts, colours, tone for SCORM courses): the plugin's
  `../skills/generate-content/preferences.md`. The generator applies the brand
  values automatically; edit that file to change them.
- **Export standard**: SCORM 2004 (`export.standard: 'scorm2004'`) is the
  default for every course. Keep it unless told otherwise.
- **Course naming**: one course = one folder under `courses/`, named after the
  course (kebab-case). No prefixes or suffixes distinguishing AI-built from
  hand-built courses — the Rise courses live in Articulate, not here.
- **Review**: the training team signs off on the Academy Lesson HTML before a
  course is built or rebuilt. Surface every `[TBC]` and `[PROMPT — …]` marker
  from the spec in your summary; never silently drop them.

## Building SCORM courses from a course spec

Triggered by "build course", "build the course from [file]", or "create the
SCORM course for [course name]". The spec schema lives in this repo at
`../skills/generate-content/reference/course-spec-format.md` — read it if you
need to recall field names.

### Procedure

1. Read the `course-spec.json`. Confirm the course name and version with the
   user if the request didn't name a file.
2. From the workspace root, run the generator:
   `pnpm build-from-spec <path/to/course-spec.json>`. It scaffolds new courses
   (config, layout, styles) or updates existing ones. It is preserve-tweaks:
   only pages whose spec content changed are rewritten (per-page hashes in
   `.build-state.json`), so manual edits survive rebuilds. `--force` regenerates
   every generated page; `--reset` wipes `pages/` first (adopting a
   hand-written course or after a big restructure).
3. When real screenshot assets land in `assets/`, update the `image` block
   `src` values in the spec (filename only) and re-run the generator.
4. Run `pnpm check <course>`. Fix every error; treat warnings as defects.
5. `pnpm export <course>` — report the `.zip` path.

The structure and mapping below document what the generator does; consult them
when editing generated pages by hand or debugging generator output.

### Spec → course structure

- `cover` → first page of the first section: intro paragraph, objectives list,
  the standard disclaimer text, version number.
- Each entry in `lessons[]` → one **lesson** (folder with numeric prefix,
  e.g. `01-creating-a-ticketed-event/`). Split a lesson into multiple pages if
  it grows past ~3–4 screens of content; keep `_meta.js` titles matching the
  spec wording.
- The Summary lesson maps like any other: its `quote` block restates the
  objectives, its `video` block is the Airtable feedback form (embed via
  `<iframe>` with `title` and fixed height, mirroring the HTML version). The
  generator adds the "Course feedback" heading + intro line directly above
  that form automatically — don't write them into the spec or page by hand.
  The course header shows only the course title (no lesson/page counter).

### Block → component mapping

| Spec block | SCORM generator rendering |
|---|---|
| `text` | Page prose. Inline HTML (`<strong>`, `<em>`) works in Svelte markup as-is. |
| `heading` | `<h2>`/`<h3>` matching `level`. Never skip heading levels. |
| `image` | `<Image src="$assets/<file>" alt="…" caption="…">` from `tessera-learn`. While `src` is still a `[SCREENSHOT — …]` placeholder, render a styled placeholder box containing the description instead, and list it in your summary. When a real asset lands in `assets/`, swap in the `<Image>`. |
| `process` | Numbered-step walkthrough: an ordered list inside a bordered card (plain markup is fine), or a custom `components/Process.svelte` if reused across lessons. Intro and summary lines around the steps. |
| `accordion` | `<Accordion>` + `<AccordionItem>` from `tessera-learn`, one item per `items[]` entry. |
| `callout` | `<Callout type={tone}>` from `tessera-learn`. |
| `quote` | Blockquote / styled pull-quote. |
| `video` | YouTube/Vimeo URL → `<Video src title>` (add `transcript` if available); direct file → `$assets/` path with `tracks` or `transcript`; the Airtable form → raw `<iframe>` with `title` and explicit width/height. |
| `quiz` | One **quiz page**: `pageConfig = { quiz: { graded: true, maxAttempts } }` plus question components at page root (no `<Quiz>` wrapper). See below. |

### Quiz questions

| Spec kind | Component |
|---|---|
| `multiple-choice` | `<MultipleChoice question options correct={correctIndex} correctFeedback incorrectFeedback>` |
| `true-false` | `<MultipleChoice>` with `options={['True', 'False']}`, `correct` = `answer ? 0 : 1` |
| `fill-in-blank` | `<FillInTheBlank question answers caseSensitive>` |
| `matching` | `<Matching question pairs>` |

Keep the spec's `id` values (already valid: letters/digits/inner underscores).
Pass `correctFeedback`/`incorrectFeedback` from the spec — corrective feedback
on every question is mandatory. Quiz pages are where the course score comes
from; leave `graded: true` as the spec dictates.

### Media placeholders

Spec `image`/`video` blocks whose `src` is a `[SCREENSHOT — …]` / `[GIF — …]`
description are pending assets. Build the placeholder now, capture the real
asset later into `courses/<name>/assets/`, update the spec's `src` to the
filename, and rebuild. Always list pending assets in the final summary.
