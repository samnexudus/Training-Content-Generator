# elearning-courses

The Nexudus Academy **SCORM course library** — a workspace that turns written
course content into ready-to-upload SCORM packages for the Nexudus Academy LMS.

Built on the open-source [Tessera](https://github.com/redmodd/tessera) SCORM
framework (`tessera-learn`). You don't need to know anything about Tessera to
use this workspace — everything below is all you need.

## What this tool does

You give it a **course spec** — a single JSON file describing a course's
lessons, text, images and quizzes — and it produces:

1. A browsable course made of Svelte pages (for reviewing and tweaking)
2. A **SCORM 2004 `.zip`** that you upload straight to the LMS

The specs are normally written by the **generate-content skill** (in
`../skills/generate-content/` at the repo root — Academy Lesson step), but any
valid JSON spec works — including hand-written ones. The spec schema lives in
`../skills/generate-content/reference/course-spec-format.md`.

## Repository layout

| Path | What it is |
|---|---|
| `specs/` | Canonical course specs, one JSON per course. The source of truth. |
| `courses/<name>/` | Generated course: pages, config, styles, assets. Rebuildable from its spec. |
| `../skills/generate-content/` | The content-generation skill (at the repo root): how courses/specs are written, brand & language preferences (`preferences.md`), and the spec schema. |
| `shared/` | Shared design system (imported as `$shared`). |
| `scripts/build-from-spec.mjs` | The generator: spec → course pages. |
| `AGENTS.md` | Authoring guide for AI assistants working in this repo. |

## Prerequisites

- Node.js 20+ and [pnpm](https://pnpm.io)
- `pnpm install` once, from the workspace root

## Quick start

```bash
pnpm install
pnpm dev <course>      # preview a course in the browser
```

## Creating a course

### From a spec (the normal path)

```bash
pnpm build-from-spec specs/<name>-course-spec.json
```

Scaffolds a new course, or updates an existing one. Rebuilds are
**preserve-tweaks**: only pages whose spec content changed are rewritten
(per-page hashes in `.build-state.json`), so manual edits to other pages
survive. Flags:

- `--force` — regenerate every generated page
- `--reset` — wipe the course's `pages/` tree first (adopting a hand-written
  course, or after a big spec restructure; manual tweaks inside `pages/` are lost)

### By hand

```bash
pnpm tessera new <name>            # scaffold an empty course
pnpm tessera duplicate <src> <to>  # copy an existing course
```

## Reviewing a course

1. **Live preview:** `pnpm dev <course>` starts a local server (URL printed in
   the terminal). Click through every page; quizzes are fully functional, so
   answer them to check the correct/incorrect feedback text.
2. **Readable outline:** the Academy Lesson HTML that accompanied the spec
   (in `~/Desktop/Nexudus Content/[Feature Name]/`) shows the whole course
   top-to-bottom in a browser.
3. **Static checks:** `pnpm check <course>` runs structural validation plus an
   accessibility audit. Fix every error before exporting.

## Editing course text

Edit the **spec**, not the generated pages — the spec is the single source of
truth:

1. Edit the wording in `specs/<name>-course-spec.json` (plain JSON strings).
   Bold button/UI names with inline `<strong>` HTML, never `**markdown**`.
2. Re-run `pnpm build-from-spec specs/<name>-course-spec.json` — only the
   affected pages are regenerated.
3. `pnpm check <course>`, then re-export if a package was already shipped.

Keep the copy of the spec in `~/Desktop/Nexudus Content/` in lockstep with the
one in `specs/`.

## Shipping a course

```bash
pnpm check <course>     # must pass: validation + a11y
pnpm export <course>    # builds the SCORM 2004 .zip
```

The zip lands in `courses/<name>/<name>-<version>.zip`. Upload it to the
Nexudus Academy LMS.

## Updating the framework

Ask your assistant to update the framework. The authoring guide has it check
the changelog and warn you about anything that resets learners' saved progress,
and ask whether to go on, before it edits a course. To update by hand, read the
[changelog](https://github.com/redmodd/tessera/blob/main/packages/tessera-learn/CHANGELOG.md)
first, then run `pnpm add tessera-learn@latest` from the workspace root.
