# .docx Generation — Working Patterns

The plugin generates `.docx` files using **`python-docx`** (Python). This file contains the
boilerplate patterns proven to work for Product Updates, Webinar Briefs, Training Scripts,
Video Scripts, and Academy Lessons.

**Always use these patterns rather than re-inventing them.** They handle the things that go
wrong when generating Word docs from scratch: font fallbacks on Windows, list numbering,
table shading, and heading styles.

---

## Prerequisites check

Before generating, confirm `python-docx` is available:

```bash
python3 -c "import docx" 2>&1
```

If it errors, install it:

```bash
pip3 install python-docx
```

This is a one-time setup per machine. If the user is new to the plugin, mention this in the
final summary so they know what was installed.

---

## Output path

All files save to:

```
~/Desktop/Nexudus Content/[Feature Name]/
```

Create the directory if it doesn't exist (`os.makedirs(..., exist_ok=True)`).

---

## Boilerplate — page setup, fonts, heading styles

Use this opening block in **every** generator script. It produces US Letter, 1-inch margins,
Arial 12pt body, Arial black headings, and ensures the font sticks on Windows.

```python
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import os

OUT_DIR = os.path.expanduser("~/Desktop/Nexudus Content/[Feature Name]")
os.makedirs(OUT_DIR, exist_ok=True)
OUT = os.path.join(OUT_DIR, "[Feature Name] - [Output Type].docx")

doc = Document()

# Page setup — US Letter, 1-inch margins
for section in doc.sections:
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)
    section.left_margin = Inches(1)
    section.right_margin = Inches(1)

# Default font: Arial 12pt — apply at the style level AND patch rFonts directly,
# otherwise Word on Windows may fall back to Calibri.
style = doc.styles["Normal"]
style.font.name = "Arial"
style.font.size = Pt(12)
rPr = style.element.get_or_add_rPr()
rFonts = rPr.find(qn("w:rFonts"))
if rFonts is None:
    rFonts = OxmlElement("w:rFonts")
    rPr.append(rFonts)
for attr in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
    rFonts.set(qn(attr), "Arial")

# Heading styles — Arial, black, bold
for h, size in [("Heading 1", 20), ("Heading 2", 16), ("Heading 3", 13)]:
    st = doc.styles[h]
    st.font.name = "Arial"
    st.font.size = Pt(size)
    st.font.color.rgb = RGBColor(0, 0, 0)
    st.font.bold = True
    rpr = st.element.get_or_add_rPr()
    rf = rpr.find(qn("w:rFonts"))
    if rf is None:
        rf = OxmlElement("w:rFonts")
        rpr.append(rf)
    for a in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        rf.set(qn(a), "Arial")
```

---

## Helper functions — use these everywhere

```python
def mixed(parts):
    """Single paragraph with mixed bolding. parts = list of (text, bold) tuples."""
    p = doc.add_paragraph()
    for t, b in parts:
        r = p.add_run(t)
        r.bold = b
        r.font.name = "Arial"
        r.font.size = Pt(12)
    return p


def bullet(parts):
    """Bulleted list item with mixed bolding."""
    p = doc.add_paragraph(style="List Bullet")
    for t, b in parts:
        r = p.add_run(t); r.bold = b
        r.font.name = "Arial"; r.font.size = Pt(12)


def numbered(parts):
    """Numbered list item with mixed bolding."""
    p = doc.add_paragraph(style="List Number")
    for t, b in parts:
        r = p.add_run(t); r.bold = b
        r.font.name = "Arial"; r.font.size = Pt(12)


def callout_italic(text):
    """*Important to Note:* style callout."""
    p = doc.add_paragraph()
    r = p.add_run(text)
    r.italic = True
    r.font.name = "Arial"; r.font.size = Pt(12)


def media(text):
    """Grey italic media placeholder, e.g. [GIF — show ...]"""
    p = doc.add_paragraph()
    r = p.add_run(text)
    r.italic = True
    r.font.color.rgb = RGBColor(0x70, 0x70, 0x70)
    r.font.name = "Arial"; r.font.size = Pt(12)


def hr():
    """Horizontal rule via paragraph border."""
    p = doc.add_paragraph()
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bot = OxmlElement("w:bottom")
    bot.set(qn("w:val"), "single"); bot.set(qn("w:sz"), "6")
    bot.set(qn("w:space"), "1"); bot.set(qn("w:color"), "CCCCCC")
    pBdr.append(bot); pPr.append(pBdr)
```

---

## Bolding navigation paths and UI elements

Use `mixed()` for any paragraph that contains a bolded navigation path or UI element name.
Bold all of: navigation paths, button names used as actions, dropdown/field labels.

```python
# Step with bolded path and button
numbered([
    ("Navigate to ", False),
    ("Resources > Resource Rules", True),   # bolded path
    (".", False),
])

numbered([
    ("Click ", False),
    ("+ Add rule", True),                   # bolded action
    (".", False),
])
```

---

## Tables (used in Webinar Briefs)

Tables need correct shading (`ShadingType.CLEAR`, never `SOLID`), grey borders, and explicit
column widths.

```python
from docx.shared import Inches

def set_cell_shading(cell, color_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), color_hex)
    tcPr.append(shd)


def set_cell_borders(cell, color="CCCCCC", size="4"):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement("w:tcBorders")
    for edge in ("top", "left", "bottom", "right"):
        b = OxmlElement(f"w:{edge}")
        b.set(qn("w:val"), "single")
        b.set(qn("w:sz"), size)
        b.set(qn("w:color"), color)
        tcBorders.append(b)
    tcPr.append(tcBorders)


# Two-column table — typical webinar brief content table
table = doc.add_table(rows=1, cols=2)
table.autofit = False
hdr = table.rows[0]
hdr.cells[0].width = Inches(2)
hdr.cells[1].width = Inches(5.5)
for cell, label in zip(hdr.cells, ["Topic / Section", "Points to touch on"]):
    set_cell_shading(cell, "1F4E79")   # Nexudus blue header
    set_cell_borders(cell)
    p = cell.paragraphs[0]
    r = p.add_run(label); r.bold = True
    r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    r.font.name = "Arial"; r.font.size = Pt(11)
```

For metadata tables (label/value pairs), use `F2F2F2` shading on the label column.

---

## Working script structure

```python
# 1. Setup (page, fonts, headings) — copy boilerplate above
# 2. Helper functions — copy from above
# 3. Document content — call helpers in order:

doc.add_heading("[Feature Name]", level=1)

mixed([
    ("Opening paragraph with ", False),
    ("Resources > Resource Rules", True),
    (" bolded path.", False),
])

doc.add_heading("Admin Panel", level=2)
doc.add_heading("1. Sub-feature", level=3)

media("[GIF — show ...]")

mixed([("Description paragraph.", False)])

numbered([("Navigate to ", False), ("Path", True), (".", False)])
numbered([("Click ", False), ("Save changes", True), (".", False)])

callout_italic("Important to Note: ...")

# 4. Save
doc.save(OUT)
print(f"Saved: {OUT}")
```

---

## What NOT to do

- ❌ Don't write the .docx via raw XML — use `python-docx` helpers
- ❌ Don't use unicode bullets (`•`) in text — use `style="List Bullet"`
- ❌ Don't use `\n` for line breaks — each line is its own paragraph
- ❌ Don't set `WidthType.PERCENTAGE` on tables — use absolute widths in inches/DXA
- ❌ Don't skip the `rFonts` patching — Word on Windows will silently fall back to Calibri
- ❌ Don't try to use the `anthropic-skills:docx` skill to "produce" the file — it's a
  knowledge skill that returns instructions, not a tool that creates the file. Use these
  patterns directly.

---

## Where to run the script

Write the generator script to `/tmp/gen_[output_type].py` then run it with `python3`.
Don't keep the temporary script around — it's regenerated each time.
