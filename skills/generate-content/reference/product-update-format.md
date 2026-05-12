# Nexudus Product Update — Format Reference

## Audience

Product updates are written for **space operators and customers** — people who run coworking spaces or flexible offices using Nexudus. The tone is clear and benefit-led: it highlights what this means for their space and their members, while still being direct and instructional.

This update is used internally by the training team, but it is written from the operator's perspective throughout.

| Element | Rule |
|---|---|
| **Opening** | Lead with the benefit to the operator or member, not the mechanics |
| **Body** | Same step-by-step structure as any product update — numbered steps, bolded paths |
| **Tone** | Friendly and direct. Warmer than a pure internal brief, but no marketing language |
| **Jargon** | Spell out Admin Panel, Members Portal, Virtual Office — never AP, MP, VO |
| **Callouts** | Same formats — frame from the operator's perspective |

**Opening pattern:**
> "[Feature name] gives [space operators / members] [key benefit]. [What it is and where to find it.] [Optional: pricing or how to get started.]"

---

## Document structure

```
[NOTES SECTION — not published, for internal team use]
Basecamp link(s): [URL]
Figma link(s): [URL]
Session recording: [URL if available]

---

[TITLE]
Short, feature-name focused. No version numbers. Examples:
- "NexBoard: Product Update"
- "Adoption Rate"
- "Updates to Events"
- "Bulk Import Improvements"

[OPENING PARAGRAPH]
2–3 sentences. Lead with the benefit. Then what the feature is, who it's for, where it lives.

[BODY — one H3 section per major feature area, H4 sub-sections for individual changes]
```

---

## Opening paragraph examples

**NexBoard:**
> "Space operators can now turn any tablet into an interactive room display with NexBoard 2.0. Members can view availability, make bookings, check in, and pay for ad-hoc bookings directly from the board — no Admin Panel access needed. This update covers what's new in NexBoard and the related Admin Panel changes."

**Benefit pattern:**
Feature name + key benefit for operator/member + what it is and where it lives.

---

## Section & sub-section patterns

### H3 — Major area (e.g. Admin Panel, Members Portal, NexBoard App)

### H4 — Individual feature/change (numbered 1–N when there are multiple)

**Examples of H4 titles:**
- "1. Resource Booking"
- "2. Check-in"
- "3. End and Extend Bookings"
- "4. Ad-hoc Payments via QR Code"
- "5. Admin Panel Changes"

---

## Body content patterns

### Navigation paths
Always bolded with `>` separator. Always spell out in full — no abbreviations:
- **Settings > Companion Apps > NexBoard**
- **CRM > Identity Checks**
- **Operations > Deliveries**
- **Inventory > Products**

### Steps
Numbered list. Action verbs. UI elements bolded.
```
1. Navigate to **Settings > [Section]**.
2. Click **[Button name]**.
3. Toggle **[Option]** on/off.
4. Click **Save changes**.
```

### Callouts
```
*Important to Note: [Significant behavioural note — framed from operator perspective]*
**Note:** [General guidance]
**⚠ Important:** [Warning — deprecation, pricing, breaking change]
**[TBC]** — [Unresolved item]
```

### Media placeholders
```
[GIF — show [description of what the GIF should demonstrate]]
[SCREENSHOT — [what should be visible]]
[VIDEO — [what the video should show]]
```
When media is captured: link inline, e.g. `[GIF](https://drive.google.com/...)`

### "Previously..." pattern (when updating an existing feature)
> *Previously, [old behaviour]. [Feature name] now [new behaviour].*

### Deprecation / warnings
> **⚠ Important:** This feature will replace [old feature]. [Old feature] will be deprecated on [date].

### Long + high-level variants
For significant multi-section features, offer both:
- **Long version** — full steps and detail
- **High-level version** — summary bullets, 2–3 sentences per feature (for exec/leadership)

### "TBC" sections
> **[TBC]** — Awaiting confirmation from [team/person] on [detail].

### "TO BE POSTED BEFORE THE RELEASE" note
Add at the top of the document when timing is critical.

---

## Tone & voice

- **Benefit-led, not mechanics-led** — open with what this means for the operator, then how it works
- **Direct and instructional** — tells the reader exactly what to do
- **Concise** — no filler words, no fluff
- **Active voice** — "Click Save" not "Save should be clicked"
- **Present tense** — "The system creates a new profile" not "The system will create"
- **Second person** — "You can now..." / "Space operators can..."
- **No marketing language** — benefit-led does not mean promotional; no "exciting", "powerful", "revolutionary"
- **Spell out product names** — Admin Panel, Members Portal, Virtual Office — never AP, MP, VO

---

## Full example — NexBoard product update structure

```
Notes:
[Basecamp link]
[Figma link]

NexBoard: Product Update

Space operators can now give members full self-service access to room bookings and check-in
directly from any tablet. NexBoard 2.0 transforms room displays into interactive booking
terminals — members can view availability, make bookings, check in, and pay for ad-hoc
bookings on the spot. This update covers what's changed in NexBoard and the related
Admin Panel changes.

### Admin Panel

#### 1. Resource Booking
[GIF — show a member making a booking from NexBoard]

Members can now make bookings directly from the board without needing the Members Portal.

1. On the NexBoard screen, tap **Book**.
2. Select the time slot.
3. Confirm the booking.

**Note:** The booking appears immediately in the Admin Panel under **Operations > Bookings**.

#### 2. Check-in
[GIF — show check-in flow from NexBoard]

Members can check in to their booking directly from the board — no phone or portal required.

1. Tap **Check In** on the board.
2. The system confirms check-in and updates the booking status.

### NexBoard App
**Settings > Companion Apps > NexBoard**

NexBoard 2.0 is a completely separate app and will not update automatically.
Space operators must download the new app from the app store.
```

---

## Key differences: short vs. full updates

| Element | Short update | Full update |
|---|---|---|
| Opening | 1–2 sentences | 2–3 sentences |
| Sections | One flat section | H3/H4 hierarchy |
| Steps | Bullet list | Numbered steps |
| Media | 1 GIF/screenshot | Multiple per section |
| Notes | Minimal | Full Basecamp + Figma links |
| Variants | None | Long + high-level versions |
