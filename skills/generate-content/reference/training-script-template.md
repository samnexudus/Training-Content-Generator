# Nexudus Training Script — Template & Guidelines

Training scripts are **full word-for-word scripts** used by the Nexudus training team to run
internal micro-learning sessions. They are not bullet-point outlines — they include full spoken
dialogue, in-line trainer notes, and interactive elements including Kahoot quizzes.

Real examples are in `examples/training-scripts/`. Load one before generating — it takes
precedence over this template.

---

## Document structure

```
[TOPIC NAME]

Session dates:
[Date(s) — e.g., "8th July 2025 – 10th July 2025" or "TBC"]

Objectives:

Learners will be able to:
- [Objective 1 — action verb + outcome]
- [Objective 2]
- [Objective 3]
[3–5 objectives. Use Bloom's verbs: explain, demonstrate, identify, create, navigate, understand,
build, perform.]

Considerations for this session:
- [Reference to related product update — e.g., "Virtual Offices Product Update"]
- [Reference to slide deck — e.g., "Virtual Offices.pptx"]
- [Any integrations that must be active — e.g., "Ensure Dropbox Sign is active within training accounts"]
- [Any pre-existing data needed — e.g., "Ensure data exists for: Resource with Products"]

Set-up required before each session:
- [Specific items the trainer must create or configure before the session begins]
- [e.g., "Pre-created document templates with a few missing fields — will be added during the session"]
- [e.g., "Generic Marketing Document"]
[If no setup required, omit this section.]

---

Script:

Intro

[Full spoken intro — trainer reads this aloud. 3–5 sentences. Cover: welcome, topic focus,
session structure overview, objectives recap.]

Example:
"Thanks, everybody for joining today. Our focus in this session will be [topic]. By the end of
the session, you will be able to: [restate objectives]. The session will be split into [N] sections:
[brief list]."

---

Section 1: Learn ([time estimate] minutes)

[Topic area 1 heading]

[Bullet points summarising what to cover — written as trainer notes and/or spoken explanations.
For conceptual topics, write the full explanation the trainer will deliver. For step-by-step
demos, write numbered steps. Mix as appropriate.]

[Where audience participation is planned:]
Audience Question: [Question to ask the group]
Answer: [Expected answer — for trainer reference]

[Where a trainer note is needed:]
Trainer note: [Instruction to the trainer, not spoken aloud — e.g., "Swap to one of the
pre-created templates and add merge fields"]

---

Section 2: Do ([time estimate] minutes)

[Full demonstration steps. Numbered. Bold all UI elements and navigation paths.]

[Include Highlight notes for key demo moments:]
[Highlight: [What specifically to show or draw attention to during this step]]

Scenario [N]: [Persona / task description]
1. [Step 1]
2. [Step 2]
...

[Trainer notes inline as needed]

---

Section 3: Apply ([time estimate] minutes)

[Activity description — what learners do themselves, or interactive element like Kahoot.]

[For Kahoot quizzes, include all questions with answer options and mark the correct answer:]

Kahoot Quiz:

1. [Question text]?
   a. [Option A]
   b. [Option B] ← Correct
   c. [Option C]
   d. [Option D]

2. [Question text]?
   a. [Option A] ← Correct
   b. [Option B]
   c. [Option C]
   d. [Option D]

[Continue for all questions — typically 8–10 for a full session.]

[For hands-on activities instead of Kahoot:]
Activity:
[Description of what learners do. Be specific — name the exact task, data to use, and
outcome to achieve.]
```

---

## Section timing guide

| Session length | Learn | Do | Apply |
|---|---|---|---|
| 30 min | 10 min | 15 min | 5 min |
| 45 min | 15 min | 20 min | 10 min |
| 60 min | 20 min | 30 min | 10 min |

---

## Writing the script

### Intro
- Write as full spoken text — the trainer reads it directly
- Cover: greeting, topic, what the session will involve, objectives
- Keep it to 3–5 sentences — don't over-explain before starting

### Learn section
- Mix of spoken explanation and trainer notes
- For conceptual content (what is X, why does it exist): write full sentences the trainer can speak
- For demo setup or transitions: use `Trainer note:` prefix — not spoken aloud
- Audience questions are good here: write the question and the expected answer for trainer reference

### Do section
- Full numbered steps for every demo
- Bold all navigation paths: **CRM > Document Templates**
- Bold all UI elements used as actions: "Click **+ Add template**"
- `[Highlight: ...]` annotations tell the trainer what to draw attention to
- Trainer notes for anything the trainer should know but not say aloud

### Apply section — Kahoot vs. activity
- **Kahoot** is preferred for knowledge-check endings — include all questions with 4 options each,
  mark the correct answer
- **Hands-on activity** when the session is more practical — describe exactly what learners build
  or complete
- Both can be included: Kahoot first, then optional activity

---

## Objectives — verb bank

| Verb | Use for |
|---|---|
| Explain | Conceptual understanding — "Explain what virtual offices are" |
| Demonstrate | Show how to use a feature — "Demonstrate how to create a VO contract" |
| Identify | Recognise or locate — "Identify where identity checks are managed" |
| Create | Build or configure — "Create a document template from scratch" |
| Navigate | Find a section — "Navigate the Members Portal VO onboarding" |
| Understand | Grasp purpose/benefit — "Understand the benefits for space operators" |
| Build | Assemble something complex — "Build and send a proposal" |
| Perform | Execute a process — "Perform a one-off identity check" |

---

## Tone and voice

- **Direct and instructional** — this is a script, not a presentation abstract
- **Second person for demo steps** — "Click **Save changes**"
- **First person for spoken intro** — "Thanks for joining today"
- **Trainer notes are imperative** — "Show the AP Dashboard", "Swap to pre-created template"
- **No marketing language** — same rules as all other content types
- **Consistent UI terminology** — exact labels, exact paths

---

## Kahoot question guidelines

- **8–10 questions** for a 45–60 min session; **5–6** for shorter sessions
- Test application, not just recall — "What should you do when X?" not "What is X?"
- All 4 options should be plausible — avoid obviously wrong distractors
- Mark the correct answer with `← Correct`
- Questions should cover all main topics from the Learn + Do sections

---

## File naming

`[Feature Name] - Training Script.docx`

Examples:
- `Virtual Offices - Training Script.docx`
- `CRM - Training Script.docx`
- `Access Control - Training Script.docx`
