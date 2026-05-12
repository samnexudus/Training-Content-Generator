# Examples Library

This folder holds real examples of Nexudus training content. They serve as style guides, tone references, and structural inspiration when generating new content.

## How the skill uses these files

Before generating any output, the `generate-content` skill loads relevant examples from this folder to:
- Match the established tone and voice
- Mirror section structure and formatting conventions
- Apply consistent terminology and UI label patterns

The more examples you add, the better-calibrated the output becomes.

## Folder structure

```
examples/
├── product-updates/
│   ├── internal/      # Internal team-facing updates (Basecamp notice board)
│   └── external/      # Customer and lead-facing updates (public/marketing tone)
├── training-scripts/  # Internal micro-learning session scripts
├── webinar-briefs/    # Customer-facing webinar outlines and scripts
├── video-scripts/     # Scripts for recorded feature walkthrough videos
└── academy-lessons/   # Nexudus Academy lesson outlines (Rise/SCORM content)
```

## How to add examples

1. Drop the file into the correct subfolder (`.docx`, `.md`, `.pdf`, or `.txt` all work)
2. Name it clearly: `[Feature Name] - [Output Type].[ext]`
   - e.g. `NexBoard 2.0 - Product Update.docx`
   - e.g. `Virtual Offices - Training Script.md`
3. No other setup needed — the skill picks them up automatically

## Planned integrations (future)

- **Google Drive** — sync examples directly from a shared team folder
- **Articulate Rise** — pull Academy lesson structure live from your Rise account
