# Nexudus Content Generator

A Claude Code plugin for the Nexudus Academy training team. Generates first-draft training and product content for new and updated Nexudus features.

## What it does

When a new feature is released, either paste in the Figma design notes, Basecamp to-do, or any feature description — or name a branch and let it scan the code to work out what changed — and the tool generates a polished first draft of any combination of five content types, each saved as an `.html` file:

| Type | Audience | Output |
|---|---|---|
| Product Update | Space operators and customers (external) | `.html` |
| Webinar Brief | Training team and webinar hosts (internal) | `.html` |
| Video Script | Nexudus Unlocked YouTube series (external) | `.html` |
| Training Script | Internal micro-learning sessions | `.html` |
| Academy Lesson | Nexudus Academy LMS / Articulate Rise (internal or customer) | `.html` |

## How to use

Say:

> "Generate content" or "Generate outputs"

The plugin will:
1. Ask which output types you want (Product Update, Webinar Brief, Video Script, Training Script, Academy Lesson)
2. Gather the source material — either you paste it, or it scans a branch in one of the Nexudus repos
3. Pull real plan, resource, and member names from your Nexudus staging account via the CLI
4. Ask any remaining type-specific questions
5. Check `examples/` for a real example to use as a style reference
6. Generate and save `.html` files to `~/Desktop/Nexudus Content/[Feature Name]/`

### Two ways to provide source material

**Paste it.** Basecamp text, a feature brief, screenshots, or your own description all work.

**Scan a branch.** Name the branch (and optionally the repo) and the tool reads the git history itself:

> "Scan branch `feature/event-tickets` in the Admin Panel and create a product update"

It finds the branch across the repos in `~/Desktop/Nexudus Products/` (asking if it's ambiguous), confirms which base branch to compare against, diffs the two, extracts every user-visible change with exact UI labels from the i18n strings, and summarises its findings before generating. If the code doesn't carry enough context (e.g. a backend-only change with no UI), it tells you exactly what's missing and offers to take the rest from Basecamp, Figma descriptions, screenshots, or your own words — anything left unresolved is marked `[TBC]`.

## Example library

Drop real product updates into `examples/product-updates/` — they become the primary style reference for new content:

```
examples/
└── product-updates/    ← drop .docx, .md, or .pdf examples here
```

The plugin picks the single most relevant example based on feature type and complexity, then uses it as the style guide for the new update.

## Features

### Inputs
- Name a branch to scan (auto-detects the repo, diffs against a base branch you confirm)
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
- Generates `.html` files ready for peer review
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
│           ├── docx-generation.md           # HTML boilerplate and helpers (filename is legacy from a prior .docx output format)
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

- **Python 3** — pre-installed on macOS. Check with `python3 --version`. No extra packages needed — output is written directly as `.html` using Python's built-in file I/O.

**Recommended**

- **Nexudus CLI** — pulls real plan, resource, and member names from your staging account so generated examples use realistic data instead of placeholders. Without it, demo steps will fall back to generic names.

**Notes for the team**

- Source material can be pasted (Basecamp text, a feature brief, your own description, or screenshots) or pulled from a branch via scan mode. Branch scans need the relevant repo checked out under `~/Desktop/Nexudus Products/`.
- The `~/Desktop/Nexudus Content/` output folder is created automatically the first time you generate content.

## Version

v0.4.0 — Supports five content types (Product Update, Webinar Brief, Video Script, Training Script, Academy Lesson) with two input modes: pasted source material or branch scanning
