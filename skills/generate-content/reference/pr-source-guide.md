# PR Source Guide — Extracting Feature Content from Pull Requests and Branches

When the user names a specific PR or branch as the source for training content, use this guide to extract everything needed before generating. A change set tells you *what changed mechanically*; the product update format still needs the *operator-facing benefit* — ask the user for that in one line if the commit messages or PR description don't carry it.

## Branch mode

The same reading order and label-resolution rules below apply whether the source is a single PR or a whole branch. Differences:

- **Change set:** use the cumulative diff against the base branch, not per-commit diffs. Treat the branch as one change set: `git diff origin/<base>...<branch>`.
- **Description substitute:** commit messages stand in for the PR description. Subjects give intent; bodies may carry detail, ticket links, or rollout notes. Run `git log origin/<base>..<branch> --oneline --stat` first to get both the message list and a per-commit file map in one pass.
- **Many commits:** reverts, fixups, and refactor commits are noise. The cumulative diff already netting them out is authoritative — read individual commits only when the cumulative diff is ambiguous (e.g. to recover a feature name from an early commit message).
- **Base branch:** never assume it — confirm with the user which branch the feature was branched from.
- **Unpulled branches:** `git fetch origin <branch>` pulls just that branch without checking it out. If the remote branch doesn't exist, fall back to asking the user to paste the material.

## Which repo = which product surface

| Repo (in `~/Desktop/Nexudus Products/`) | Product surface | What you'll find |
|---|---|---|
| `nexudus-coworking-admin-v3.2` | **Admin Panel** | React app. UI components, i18n strings, routes |
| `nexudus-coworking-ecommerce` | **Members Portal** | React/Next app. UI components, i18n strings, `api/` route handlers |
| `Nexudus.Coworking` | **Backend / API** | SQL migrations and server code. No UI labels here |

If a feature spans repos (e.g. new Admin Panel screen backed by a new API), the user may give you more than one PR. Generate one section per product surface.

## Reading order: description → changed files → diff

Work in this order; stop reading deeper once you can name every user-visible change.

### 1. PR title and description (first)

The description usually states intent, links the ticket, and sometimes notes pricing, feature flags, or rollout timing. Extract:

- Feature name (for file naming and headings)
- The "why" — operator/member benefit (if absent, ask the user for a one-liner)
- Any linked tickets, Figma links, or session recordings
- Rollout notes: feature flags, phased release, "to be posted before the release"

### 2. Changed files list (second)

Before reading any diff, scan the file list to map the shape of the change:

- New page/route files → a new screen exists (needs its own H4 section and navigation path)
- Modified existing page → an existing feature changed (use the "Previously, [old behaviour]. [Feature] now..." pattern)
- i18n/translation JSON changes → free source of exact UI labels (see below)
- Test-only or config-only files → usually not user-visible; note but don't write sections for them
- Files under `src/services`, `xhr/`, `api/` → backend wiring; supports a section only if a paired UI change exists

### 3. Diff (third, targeted)

Read diffs only for the files that matter:

- Page/component files → identify buttons, toggles, tabs, form fields, and the flow order
- Route definitions → the URL/section where the feature lives (feeds navigation paths)
- i18n JSON → the authoritative label text (see below)

Skip diffs for generated files, lockfiles, snapshots, and pure refactors.

## Finding real UI labels in frontend code

Never paraphrase a button or heading — pull the exact label. Both frontend repos use i18next.

### Members Portal (`nexudus-coworking-ecommerce`)

- Translation strings live in `public/locales/<lang>/` — use the `en` (or `en-GB`) folder
- Component code references keys like `t("some.nested.key")` — find the key in the locale JSON, use the English value as the label

### Admin Panel (`nexudus-coworking-admin-v3.2`)

- Translation strings live in `src/public/assets/locales/<lang>/` — main file is `translation.json`, plus per-area files such as `workplaces.json`
- Same approach: locate the `t("...")` key in component code, resolve it in the locale JSON

### Rules

- Use the English string exactly as written — do not capitalise or reword it
- If a label uses ICU placeholders (e.g. `{count} bookings`), pick a realistic concrete example for the demo steps
- If a label can't be resolved (key missing, dynamic label), mark it `[TBC]` rather than guessing
- For navigation paths, combine the route/section structure with the top-level section names from `reference/nexudus-product-context.md` (CRM, Operations, Inventory, Settings, Reports)

## Caveats

### Feature flags

A feature behind a flag may not exist in the standard Nexudus Academy training environment. If the diff shows a flag check (search for `flag`, `feature`, `toggle` in the changed code):

- Ask the user whether the flag is on in the training environment
- If unknown, add: `**[TBC]** — Confirm [feature] is enabled in the training environment before demoing.`
- Do not run CLI commands expecting data that a gated feature would create

### Backend-only PRs

`Nexudus.Coworking` (and `api/`-only changes in the frontend repos) contain no UI labels. For these:

- Rely on the PR description plus the user's one-line "why"
- Keep demo steps minimal or generic until the paired frontend PR lands
- If the user still wants content, generate the explanatory sections and mark all UI steps `[TBC]`

### PRs that bundle multiple features

Sprint PRs often ship several unrelated changes. Before generating:

- Split the PR into distinct user-visible features (a new screen, a changed flow, a new setting are separate features even if one PR)
- Give each feature its own H4 sub-section within the appropriate H3 surface
- Number them 1–N
- If the PR is genuinely one big feature with many parts, group by surface (Admin Panel / Members Portal) instead

### Unmerged or un-pulled PRs and branches

If the PR or branch isn't in the local checkout:

- Merged PRs: `git log --all --grep="<PR title>"` or check out the merge commit
- Unmerged PRs: `git fetch origin pull/<PR number>/head` then inspect the fetched ref
- Remote branches: `git fetch origin <branch>` then diff against the base (no checkout needed)
- If none of these work, ask the user to paste the PR description and diff

## Checklist before generating

- [ ] Every user-visible change in the PR has a section (or a documented reason for exclusion)
- [ ] All UI labels resolved from i18n strings or marked `[TBC]`
- [ ] Navigation paths built from route structure + product context conventions
- [ ] Operator-facing benefit captured (from PR description or the user's one-liner)
- [ ] Feature flags checked; training-environment assumptions noted
- [ ] Multi-feature PRs split into numbered sub-sections
