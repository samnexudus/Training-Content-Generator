# Format Quick-Check — Run Before Every Output

**Run this checklist on every output before saving. If any item fails, fix it.**

## Opening paragraph

- [ ] Leads with the benefit to the operator or member — not the mechanics
- [ ] Includes: feature name + what it does + who benefits + where it lives
- [ ] 2–3 sentences max
- [ ] ✅ "Space operators can now view a full history of benefit usage directly from the member record — no more digging through invoices."
- [ ] ❌ "This document covers the new benefit history feature in the Admin Panel."

## Navigation paths

- [ ] Every path is **bolded with `>` separator**: `**Settings > Section > Page**`
- [ ] Paths match exact UI labels — not abbreviated, not paraphrased
- [ ] No internal shorthand — always spell out: Admin Panel, Members Portal, Virtual Office
- [ ] ✅ `**Operations > Bookings**`
- [ ] ❌ `**Ops > Bookings**` or `**AP > Bookings**`

## UI element references

- [ ] Button/toggle/tab names are **bolded when used as actions**: "Click **Save changes**"
- [ ] ✅ "Click **Save changes** to apply the new rule."
- [ ] ❌ "Click the save button" or "save changes"

## Steps

- [ ] Multi-step workflows are **numbered** (not bulleted)
- [ ] ✅
  ```
  1. Navigate to **Settings > Section**.
  2. Click **Save changes**.
  ```
- [ ] ❌
  ```
  • Navigate to **Settings > Section**
  • Click **Save changes**
  ```

## Descriptions and lists

- [ ] Feature descriptions are **bulleted** (not numbered)
- [ ] ✅
  ```
  - Refreshed UI
  - New booking options
  - Payment via QR code
  ```
- [ ] ❌
  ```
  1. Refreshed UI
  2. New booking options
  ```

## Media placeholders

- [ ] Every major section has **at least one** media placeholder
- [ ] Format: `[GIF — show [what it demonstrates]]` or `[SCREENSHOT — [what to show]]`
- [ ] ✅ `[GIF — show a member making a booking from NexBoard]`
- [ ] ❌ `[Image to be added]` or just `[GIF]`

## Tone — eliminate these

- [ ] ❌ Marketing language: "exciting", "revolutionise", "cutting-edge", "powerful"
- [ ] ❌ Passive voice: "The booking will be created" → "The system creates the booking"
- [ ] ❌ Vague instructions: "proceed to navigate towards" → "Navigate to"
- [ ] ❌ Unnecessary hedging: "try to", "you might", "if you want to"
- [ ] ❌ Generic examples: "select a resource" → name the real resource
- [ ] ❌ Internal shorthand: AP, MP, VO

## Tone — ensure these

- [ ] ✅ Benefit-led opening — what does this mean for the operator/member?
- [ ] ✅ Direct action verbs: "Click", "Enter", "Select", "Navigate"
- [ ] ✅ Second person: "You can...", "Space operators can..."
- [ ] ✅ Present tense: "The system creates", not "will create"
- [ ] ✅ Concise: no filler words, no fluff
- [ ] ✅ Consistent terminology: use exact field/button names every time

## Callouts

- [ ] Important notes: `*Important to Note: [text]*`
- [ ] General notes: `**Note:** [text]`
- [ ] Warnings: `**⚠ Important:** [text]`
- [ ] Unresolved items: `**[TBC]** — [text]`
- [ ] ✅ `*Important to Note: Contracts stay paused until beneficiaries pass verification.*`
- [ ] ❌ `NOTE: Contracts stay paused...` or `Important: Contracts...`

## Section headings

- [ ] H3 for major areas: `### Admin Panel`
- [ ] H4 for individual features: `#### 1. Resource Booking`
- [ ] Features numbered 1–N when there are multiple in one area
- [ ] ✅
  ```
  ### Admin Panel
  #### 1. Feature One
  #### 2. Feature Two

  ### Members Portal
  #### 1. Feature Three
  ```

## Content

- [ ] No invented details — unknowns are `[TBC]`
- [ ] File name: `[Feature Name] - Product Update.docx`
- [ ] ✅ `NexBoard - Product Update.docx`
- [ ] ❌ `nxb-prod-update.docx` or `NexBoard Product Update v1.docx`

---

## When output fails checks

1. **Identify the failure** — which rule broke?
2. **Fix it** — don't save yet
3. **Re-check** — run checklist again
4. **Then save**

---

## If you're unsure

1. Check `examples/product-updates/` — find the closest real example
2. If no example exists, use `reference/product-update-format.md`
3. Copy the exact format, fill in your content, re-check against this list
