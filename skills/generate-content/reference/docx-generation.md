# HTML Generation — Working Patterns

All content types (Product Update, Webinar Brief, Video Script, Training Script, Academy Lesson)
are generated as `.html` files using Python's built-in file I/O. No external dependencies required.

**Always use these patterns rather than re-inventing them.** They handle typography, navigation
path bolding, callout styles, table formatting, and media placeholders consistently across all
output types.

---

## Prerequisites check

No dependencies needed. Python 3 is sufficient:

```bash
python3 --version
```

---

## Output path

All files save to:

```
~/Desktop/Nexudus Content/[Feature Name]/
```

Create the directory if it doesn't exist (`os.makedirs(..., exist_ok=True)`).

---

## Boilerplate — page setup, fonts, base styles

Use this opening block in **every** generator script.

```python
import os

FEATURE = "[Feature Name]"
OUT_DIR = os.path.expanduser(f"~/Desktop/Nexudus Content/{FEATURE}")
os.makedirs(OUT_DIR, exist_ok=True)
OUT = os.path.join(OUT_DIR, f"{FEATURE} - [Output Type].html")

CSS = """
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #111;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
}
h1 { font-size: 24px; font-weight: bold; margin: 0 0 16px; }
h2 { font-size: 20px; font-weight: bold; margin: 32px 0 12px; }
h3 { font-size: 17px; font-weight: bold; margin: 24px 0 10px; }
h4 { font-size: 14px; font-weight: bold; margin: 20px 0 8px; }
p  { margin: 0 0 12px; }
ul, ol { margin: 0 0 12px 24px; }
li { margin-bottom: 4px; }
strong { font-weight: bold; }
em { font-style: italic; }
hr { border: none; border-top: 1px solid #CCC; margin: 24px 0; }
.notes {
    background: #F9F9F9;
    border-left: 4px solid #CCC;
    padding: 12px 16px;
    margin-bottom: 24px;
    font-size: 13px;
}
.notes p { margin-bottom: 6px; }
.callout {
    border-left: 4px solid #1F4E79;
    padding: 8px 12px;
    margin: 12px 0;
    font-style: italic;
    color: #333;
}
.media {
    color: #707070;
    font-style: italic;
    margin: 8px 0 12px;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 13px;
}
th {
    background: #1F4E79;
    color: #FFF;
    font-weight: bold;
    text-align: left;
    padding: 8px 10px;
    border: 1px solid #CCC;
}
td {
    padding: 8px 10px;
    border: 1px solid #CCC;
    vertical-align: top;
}
tr:nth-child(even) td { background: #F2F2F2; }
.meta-table td:first-child {
    background: #F2F2F2;
    font-weight: bold;
    width: 200px;
}
"""

lines = []

def write_file():
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{FEATURE}</title>
<style>{CSS}</style>
</head>
<body>
{"".join(lines)}
</body>
</html>"""
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Saved: {OUT}")
```

---

## Helper functions — use these everywhere

```python
import html as html_lib

def esc(text):
    """Escape special HTML characters."""
    return html_lib.escape(str(text))


def h(level, text):
    lines.append(f"<h{level}>{esc(text)}</h{level}>\n")


def p(parts):
    """Paragraph with mixed bold. parts = list of (text, bold) tuples."""
    inner = "".join(f"<strong>{esc(t)}</strong>" if b else esc(t) for t, b in parts)
    lines.append(f"<p>{inner}</p>\n")


def bullet_list(items):
    """Bulleted list. Each item is a list of (text, bold) tuples."""
    lines.append("<ul>\n")
    for item in items:
        inner = "".join(f"<strong>{esc(t)}</strong>" if b else esc(t) for t, b in item)
        lines.append(f"  <li>{inner}</li>\n")
    lines.append("</ul>\n")


def numbered_list(items):
    """Numbered list. Each item is a list of (text, bold) tuples."""
    lines.append("<ol>\n")
    for item in items:
        inner = "".join(f"<strong>{esc(t)}</strong>" if b else esc(t) for t, b in item)
        lines.append(f"  <li>{inner}</li>\n")
    lines.append("</ol>\n")


def callout(text):
    """*Important to Note:* style callout — left-bordered italic block."""
    lines.append(f'<div class="callout">{esc(text)}</div>\n')


def media(text):
    """Grey italic media placeholder, e.g. [GIF — show ...]"""
    lines.append(f'<p class="media">{esc(text)}</p>\n')


def hr():
    lines.append("<hr>\n")


def notes_block(pairs):
    """Internal notes block at the top. pairs = list of (label, value) tuples."""
    lines.append('<div class="notes">\n')
    for label, value in pairs:
        lines.append(f"  <p><strong>{esc(label)}</strong> {esc(value)}</p>\n")
    lines.append('</div>\n')
```

---

## Bolding navigation paths and UI elements

Use the `parts` tuple pattern — `(text, bold)` — in `p()`, `bullet_list()`, and `numbered_list()`:

```python
p([("Navigate to ", False), ("Settings > Network > Settings Templates", True), (".", False)])

numbered_list([
    [("Navigate to ", False), ("Settings > Network > Settings Templates", True), (".", False)],
    [("Click ", False), ("+ New template", True), (".", False)],
    [("Click ", False), ("Save", True), (".", False)],
])
```

---

## Tables

### Content table (e.g. Webinar Brief)

```python
def content_table(headers, rows):
    """
    headers: list of column header strings
    rows: list of lists of HTML strings (pre-escaped or raw HTML)
    """
    lines.append("<table>\n<thead><tr>\n")
    for h_text in headers:
        lines.append(f"  <th>{esc(h_text)}</th>\n")
    lines.append("</tr></thead>\n<tbody>\n")
    for row in rows:
        lines.append("<tr>\n")
        for cell in row:
            lines.append(f"  <td>{cell}</td>\n")
        lines.append("</tr>\n")
    lines.append("</tbody></table>\n")
```

### Metadata table (label / value pairs)

```python
def meta_table(pairs):
    """Label-value pairs with shaded label column."""
    lines.append('<table class="meta-table">\n<tbody>\n')
    for label, value in pairs:
        lines.append(f"<tr><td>{esc(label)}</td><td>{esc(value)}</td></tr>\n")
    lines.append("</tbody></table>\n")
```

---

## Working script structure

```python
# 1. Setup (CSS, helpers, output path) — copy boilerplate above
# 2. Build document content using helpers:

notes_block([
    ("Figma:", "https://www.figma.com/..."),
    ("Basecamp:", "[TBC]"),
    ("Session recording:", "[TBC]"),
])

h(1, "Feature Name: Product Update")

p([("Opening paragraph. ", False), ("Bold path example", True), (".", False)])

h(2, "Admin Panel")
h(3, "1. Sub-feature")

media("[GIF — show ...]")

p([("Description of what this does and why it matters.", False)])

numbered_list([
    [("Navigate to ", False), ("Settings > Section", True), (".", False)],
    [("Click ", False), ("Save changes", True), (".", False)],
])

callout("Important to Note: Relevant behavioural note here.")

hr()

# 3. Write file
write_file()
```

---

## What NOT to do

- ❌ Don't hardcode bullet characters (`•`, `–`) — use `<ul>` / `<ol>`
- ❌ Don't use `\n` inside HTML strings for line breaks — use separate helper calls
- ❌ Don't build raw HTML strings without escaping user content — always use `esc()`
- ❌ Don't use inline `style=""` attributes — all styles are in the CSS block at the top
- ❌ Don't produce `.docx` files — all output is `.html`

---

## Where to run the script

Write the generator script to `/tmp/gen_[output_type].py` then run it with `python3`.
Don't keep the temporary script around — it's regenerated each time.
