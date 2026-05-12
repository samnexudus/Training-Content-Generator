# Academy Lessons

This folder is the example library for Academy Lesson generation.

**Currently empty by design.** The original SCORM `.zip` exports from Articulate Rise
have been removed from the repo because they:

- can't be parsed by the model for style or structure (they're compiled HTML/JS bundles)
- add ~100 MB of dead weight to every `/plugin install`
- were only ever a reference for humans

## What to add here instead

`.docx`, `.md`, `.txt`, or `.pdf` files containing the **source content** that goes into a
Rise lesson — block outlines, narration scripts, knowledge-check questions, etc. The model
*can* read these and use them as a style reference for new Academy Lessons.

If you have access to the live Rise account or a shared drive of academy source content,
drop a few representative examples in here and they'll automatically be picked up.

## What lives outside this repo

- **SCORM packages** — Articulate Rise account (talk to the training team for access)
- **Compiled Academy modules** — Nexudus Academy LMS

## Template fallback

Until real examples are added, the generator falls back to:

`skills/generate-content/reference/academy-lesson-template.md`
