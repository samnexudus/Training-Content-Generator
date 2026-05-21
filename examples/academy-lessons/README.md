# Academy Lessons

This folder is the example library for Academy Lesson generation.

**Currently empty.** The generator uses `skills/generate-content/reference/academy-lesson-template.md`
as its primary reference for Academy Lesson structure and writing style. That template was
written directly from analysis of 7 published Nexudus Academy SCORM packages.

## Reference SCORM packages

The source SCORM exports used to build the template are stored at:

`~/Desktop/SCORM References/`

| File | Course |
|---|---|
| `bookings-scorm2004_4-QFsZP1Pt.zip` | Bookings |
| `fa-qs-scorm2004_4-se4sufZu.zip` | FAQs |
| `introduction-to-nexudus-scorm2004_4-STivtHD7.zip` | Introduction to Nexudus |
| `members-portal-scorm2004_4-VHCUKNBF.zip` | Members Portal |
| `payment-integrations-scorm2004_4-pnHoPV-8.zip` | Payment Integrations |
| `payments-scorm2004_4-VUT35LOu.zip` | Payments |
| `resources-scorm2004_4-htb5hPbw.zip` | Resources |

## What to add here

Drop `.docx`, `.md`, or `.txt` source content outlines into this folder and they will be
used as additional style references. The model can read these directly — unlike the SCORM ZIPs,
which require unpacking and decoding.
