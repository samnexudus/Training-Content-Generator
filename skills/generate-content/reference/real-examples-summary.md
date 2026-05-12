# Real Product Update Examples — Pattern Reference

Patterns extracted from real product updates produced by the Nexudus team. Load an actual example from `examples/product-updates/` first — these summaries are a fallback when no close match exists.

---

## Example 1: NexBoard Product Update (full, multi-section)

**Structure used:**
- Notes section with Basecamp link
- Opening: 2 sentences — what the app is + what changed
- H3: "Admin Panel" section
- H4 numbered sub-sections: 1. Resource Booking, 2. Check-in, 3. End and Extend Bookings, 4. Ad-hoc Payments via QR Code, 5. Admin Panel Changes
- Bold navigation paths throughout
- GIF placeholder per feature
- Numbered steps per feature
- Italic "Important to Note:" callouts
- Note about app versioning (won't auto-update)

**Opening pattern:**
"[App name] is the Nexudus companion app that [what it does]. This document covers what has changed in the new [Feature] update. [Who is affected and how.]"

---

## Example 2: Updates to Events (multi-feature update)

**Structure used:**
- Notes section with multiple Basecamp links
- H3 sub-sections per feature area
- Mix of screenshots and GIFs
- `[UPPERCASE IN BRACKETS]` for media not yet captured
- "TBC" sections for unresolved questions
- Steps with bolded UI elements

---

## Example 3: Adoption Rate (long + high-level variants)

**Two versions for different audiences:**

**Long version:**
- Full detail, all steps, screenshots per section
- Notes: Basecamp + Figma + session recording links
- Nested bullets with sub-details
- Bold navigation paths, "Note:" callouts

**High-level version:**
- Same title
- Opening summary paragraph
- Shorter bullet-list format per feature (2–3 sentences instead of full steps)
- Used for exec/leadership audience

**Pattern:** Offer both variants for significant multi-section features.

---

## Example 4: Bulk Edit Improvements (pre-release)

**Notable elements:**
- "TO BE POSTED BEFORE THE RELEASE" banner at top
- Two separate numbered workflows (one per variant)
- MP4 video links alongside GIF links
- Very specific numbered steps

---

## Example 5: Display Benefit Use History (short, focused update)

**Structure used:**
- Single Basecamp link in notes
- Short opening (1 sentence)
- One GIF placeholder
- Bullet list of data fields included
- Note about timing/edge case behaviour

**Best for:** Small, single-feature updates

---

## Example 6: Drop-down Menu Refinement (context + how it works)

**Notable elements:**
- "How does it work now?" subheading — explains current behaviour before describing change
- "Where This Applies" section — lists all areas affected
- Single Basecamp link

**Pattern:** Use "How does it work now?" when a change might confuse people familiar with the old behaviour.

---

## Example 7: Global Branding — Resurfacing Update

**Notable elements:**
- "Resurfaced" note explaining this is a returning feature, not new
- Images embedded directly in doc
- Fee mention — pricing callout
- Deprecated feature warnings
- **⚠ Important:** warnings about deprecation timeline

**Pattern:** Use deprecation warning whenever old features are being replaced.

---

## Example 8: Booker Check-ins (feature-specific)

**Structure used:**
- Opening: what the feature is and who benefits
- "Previously..." sentence explaining old behaviour
- Narrative explanation of new behaviour
- Numbered steps with bolded UI elements
- Image/GIF placeholders with Google Drive links as reference
- Sub-sections for related changes

**Opening template:**
"Previously, [what the old behaviour was]. [Feature name] now allows [who] to [what they can do], [benefit]."

---

## Common patterns across all examples

### Media placeholder formats
```
[GIF — show [description]]
[SCREENSHOT — [description]]
[VIDEO — [description]]
[UPPERCASE IN BRACKETS]  ← when media is completely TBD
https://drive.google.com/... ← when media is captured and linked
```

### Navigation path format
```
**Settings > Companion Apps > NexBoard**
**CRM > Identity Checks**
**Operations > Deliveries > + Register delivery**
```

### Step format
```
1. Navigate to **[Path]**.
2. Click **[Button]**.
3. Toggle **[Option]** on/off.
4. Click **Save changes**.
```

### Callout formats
```
*Important to Note: [text]*
**Note:** [text]
**⚠ Important:** [text for warnings]
**[TBC]** — [text for unresolved items]
```

### "Previously..." pattern
```
*Previously, [old behaviour]. [Feature name] now [new behaviour].*
```
