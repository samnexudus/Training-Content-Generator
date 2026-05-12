# Nexudus Content Generator

A Claude Code plugin for the Nexudus Academy training team. Generates first-draft external product updates for new and updated Nexudus features.

## What it does

When a new feature is released, paste in the Figma design notes, Basecamp to-do, or any feature description — and the plugin generates a polished first draft of an **External Product Update** as a `.docx` file.

The update is written for space operators and customers (benefit-led, direct, instructional) and is used internally by the training team as the primary content output.

## How to use

Say:

> "Generate content" or "Generate outputs"

The plugin will:
1. Ask which output types you want (Product Update, Webinar Brief, Video Script, Training Script, Academy Lesson)
2. Ask you to paste the source material — Basecamp text, a product brief, release notes, or your own description
3. Pull real plan, resource, and member names from your Nexudus staging account via the CLI
4. Ask any remaining type-specific questions
5. Check `examples/` for a real example to use as a style reference
6. Generate and save `.docx` files to `~/Desktop/Nexudus Content/[Feature Name]/`

You can paste source material in any form — Basecamp text, a feature brief, screenshots, or your own description.

## Example library

Drop real product updates into `examples/product-updates/` — they become the primary style reference for new content:

```
examples/
└── product-updates/    ← drop .docx, .md, or .pdf examples here
```

The plugin picks the single most relevant example based on feature type and complexity, then uses it as the style guide for the new update.

## Features

### Inputs
- Paste Basecamp to-do text
- Upload PDF feature briefs
- Describe the feature in your own words
- Share screenshots

### Style references
- ✅ **Local example library** — real examples in `examples/product-updates/` used as primary style guide
- ✅ **Reference template** — `skills/generate-content/reference/product-update-format.md` as fallback

### Live context
- ✅ **Nexudus CLI integration** — pulls real plan names, resource names, member data, and business settings from your training environment

### Output
- Generates a `.docx` file ready for peer review
- Saves to a folder you specify (defaults to `~/Desktop/Nexudus Content/[Feature Name]/`)

## Files

```
nexudus-content-generator/
├── .claude-plugin/
│   └── plugin.json                          # Plugin manifest
├── examples/
│   └── product-updates/                     # Real product update examples (style guides)
├── skills/
│   └── generate-content/
│       ├── SKILL.md                         # Skill — input collection and output generation
│       └── reference/
│           ├── docx-generation.md           # python-docx boilerplate and helpers
│           ├── product-update-format.md     # Format rules and opening paragraph structure
│           ├── webinar-brief-template.md    # Webinar brief structure
│           ├── video-script-template.md     # Video script structure
│           ├── training-script-template.md  # Training script structure
│           ├── academy-lesson-template.md   # Academy lesson structure
│           ├── nexudus-product-context.md   # Product terminology and nav paths
│           ├── real-examples-summary.md     # Patterns extracted from real product updates
│           ├── format-quick-check.md        # Pre-save validation checklist
│           └── cli-context-guide.md         # CLI commands for live data enrichment
├── agents/
│   └── content-writer.md                    # Content writer agent persona
└── README.md
```

## Installation

### For teammates (recommended)

In Claude Code, run these two commands once:

```
/plugin marketplace add samnexudus/Training-Content-Generator
/plugin install nexudus-content-generator@nexudus-training
```

The first command adds this GitHub repo as a "marketplace" (a catalog of plugins).
The second installs the plugin from it.

After install, trigger the generator any time with:

> "Generate content" or "Generate outputs"

### Staying up to date

Auto-updates are **on by default** for git-based marketplaces — you'll be notified when a new version is available.

To refresh manually:

```
/plugin marketplace update nexudus-training
```

### For local development

Clone the repo, then add it as a local marketplace:

```
/plugin marketplace add /absolute/path/to/Training-Content-Generator
/plugin install nexudus-content-generator@nexudus-training
```

Edit files in place — changes apply on the next Claude Code session reload.

## Prerequisites — one-time setup per machine

Before generating your first piece of content, make sure these are in place. The plugin will tell you if anything is missing, but it's faster to check up front.

**Required**

- **Python 3** — pre-installed on macOS. Check with `python3 --version`.
- **`python-docx`** — the library that writes the `.docx` files. Install once:
  ```bash
  pip3 install python-docx
  ```

**Recommended**

- **Nexudus CLI** — pulls real plan, resource, and member names from your staging account so generated examples use realistic data instead of placeholders. Without it, demo steps will fall back to generic names.

**Notes for the team**

- Source material is always provided by pasting — Basecamp text, a feature brief, your own description, or screenshots all work.
- The `~/Desktop/Nexudus Content/` output folder is created automatically the first time you generate content.

## Version

v0.3.0 — Focused on external product updates as the single output type
