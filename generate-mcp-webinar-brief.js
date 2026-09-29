const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
  ExternalHyperlink, LevelFormat, Header, Footer, PageNumber
} = require('/opt/homebrew/lib/node_modules/docx');
const fs = require('fs');

// Colours
const ORANGE = "E8500A";
const LIGHT_GREY_BG = "F5F5F5";
const MID_GREY_BG = "EEEEEE";
const DARK_TEXT = "1A1A1A";
const WHITE = "FFFFFF";

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

function cell(children, opts = {}) {
  return new TableCell({
    borders: opts.noBorder ? noBorders : borders,
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    verticalAlign: VerticalAlign.TOP,
    children,
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({
      text,
      bold: opts.bold || false,
      size: opts.size || 20,
      font: "Arial",
      color: opts.color || DARK_TEXT,
      italics: opts.italic || false,
    })],
    spacing: { before: opts.spaceBefore || 0, after: opts.spaceAfter || 40 },
    alignment: opts.align || AlignmentType.LEFT,
  });
}

function h1(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 28, font: "Arial", color: ORANGE })],
    spacing: { before: 200, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E8500A", space: 4 } },
  });
}

function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, size: opts.size || 20, font: "Arial", color: DARK_TEXT, bold: opts.bold || false })],
    spacing: { before: 20, after: 20 },
  });
}

function subbullet(text) {
  return new Paragraph({
    numbering: { reference: "subbullets", level: 1 },
    children: [new TextRun({ text, size: 20, font: "Arial", color: DARK_TEXT })],
    spacing: { before: 20, after: 20 },
  });
}

function sectionRow(topic, points) {
  return new TableRow({
    children: [
      cell([p(topic, { bold: true, size: 20 })], { width: 2800, fill: MID_GREY_BG }),
      cell(points, { width: 6560 }),
    ],
  });
}

function metaRow(label, valueChildren) {
  return new TableRow({
    children: [
      cell([p(label, { bold: true, size: 20 })], { width: 2200, fill: LIGHT_GREY_BG }),
      cell(valueChildren, { width: 7160 }),
    ],
  });
}

function linkedText(text, url) {
  return new Paragraph({
    children: [new ExternalHyperlink({
      link: url,
      children: [new TextRun({ text, style: "Hyperlink", font: "Arial", size: 20 })],
    })],
    spacing: { before: 0, after: 40 },
  });
}

function divider() {
  return new Paragraph({
    children: [],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC", space: 1 } },
    spacing: { before: 120, after: 120 },
  });
}

// ── TITLE ──────────────────────────────────────────────────────────────────

const titleBlock = [
  new Paragraph({
    children: [new TextRun({ text: "Nexudus MCP Server", bold: true, size: 52, font: "Arial", color: WHITE })],
    spacing: { before: 0, after: 60 },
    shading: { fill: ORANGE, type: ShadingType.CLEAR },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Webinar Brief", size: 28, font: "Arial", color: WHITE })],
    spacing: { before: 0, after: 0 },
    shading: { fill: ORANGE, type: ShadingType.CLEAR },
  }),
];

// ── METADATA TABLE ─────────────────────────────────────────────────────────

const metaTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2200, 7160],
  rows: [
    metaRow("Topic", [p("Nexudus MCP Server")]),
    metaRow("Marketing Name", [p("Ask Your Space Anything: Introducing the Nexudus MCP Server")]),
    metaRow("Date and Time", [p("To be confirmed")]),
    metaRow("Hosts", [p("To be confirmed")]),
    metaRow("Basecamp To-Do List", [p("To be updated")]),
  ],
});

// ── NOTE FOR HOSTS ─────────────────────────────────────────────────────────

const noteForHosts = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [9360],
  rows: [
    new TableRow({
      children: [
        cell([
          p("Note for hosts:", { bold: true, size: 20 }),
          p("Below is a list of points that we, the Training Team, believe should be covered. Between yourselves, you can change the order, add more points, etc. We are here to help you with the structure and delivery, but ultimately, we do not want to give you a full script that you just read out.", { size: 20, italic: true }),
        ], { fill: "FFF3E0" }),
      ],
    }),
  ],
});

// ── KEY DATES ──────────────────────────────────────────────────────────────

const datesTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [3000, 6360],
  rows: [
    new TableRow({
      children: [
        cell([p("Milestone", { bold: true, size: 20 })], { fill: ORANGE, width: 3000 }),
        cell([p("Date", { bold: true, size: 20, color: WHITE })], { fill: ORANGE, width: 6360 }),
      ],
    }),
    new TableRow({ children: [cell([p("Slides Due")], { width: 3000 }), cell([p("To be confirmed")], { width: 6360 })] }),
    new TableRow({ children: [cell([p("Practice Session 1")], { width: 3000 }), cell([p("To be confirmed")], { width: 6360 })] }),
    new TableRow({ children: [cell([p("Practice Session 2")], { width: 3000 }), cell([p("To be confirmed")], { width: 6360 })] }),
  ],
});

// ── RESOURCES ──────────────────────────────────────────────────────────────

const resourcesBlock = [
  p("Resources:", { bold: true }),
  bullet("Nexudus Webinar Guidelines 2025"),
  bullet("MCP Server — learn.nexudus.com/mcp/overview"),
  bullet("Nexudus MCP Server — mcp.nexudus.com"),
];

// ── MAIN CONTENT TABLE ─────────────────────────────────────────────────────

const headerRow = new TableRow({
  children: [
    cell([p("Topic / Section", { bold: true, color: WHITE })], { width: 2800, fill: ORANGE }),
    cell([p("Points to touch on", { bold: true, color: WHITE })], { width: 6560, fill: ORANGE }),
  ],
});

const contentTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2800, 6560],
  rows: [
    headerRow,

    // Introductions
    sectionRow("Introductions", [
      bullet("Host names and job titles"),
      bullet("Brief background — who they are and their connection to the product"),
    ]),

    // Housekeeping
    sectionRow("Housekeeping", [
      bullet("Webinar length (~45 minutes including Q&A)"),
      bullet("How to ask questions — use the Q&A panel, not the chat"),
      bullet("Session will be recorded and shared"),
    ]),

    // Benefits / Feature Overview
    sectionRow("Benefits /\nFeature Overview", [
      p("Explain:", { bold: true }),
      bullet("The Nexudus MCP Server is a new, hosted service that lets AI assistants — like Claude and ChatGPT — connect directly to a Nexudus account and carry out real tasks using plain English"),
      bullet("No installation needed: operators just point their AI client at https://mcp.nexudus.com"),
      bullet("Lowers the barrier to entry — non-technical staff can now query data, create bookings, look up members, and run reports without touching the admin panel"),
      bullet("Works across multiple AI platforms: Claude.ai, Claude Desktop, ChatGPT, VS Code with GitHub Copilot, and any other MCP-compatible client"),
      bullet("Available now for all Nexudus accounts — no additional cost"),
      p(""),
      p("Key message:", { bold: true }),
      bullet("APIs were built for developers. MCP servers are built for AI assistants — and through them, for everyone else"),
    ]),

    // What is MCP?
    sectionRow("What is MCP?", [
      p("Explain:", { bold: true }),
      bullet("MCP stands for Model Context Protocol — an open standard that lets AI assistants securely connect to external software and take actions on behalf of the user"),
      bullet("Think of it like USB-C for AI: one universal connector that works across many different tools and platforms"),
      bullet("Anthropic introduced the standard; it is now widely adopted across the industry"),
      bullet("The Nexudus MCP Server is built on this standard — so it works with Claude, ChatGPT, Copilot, and future MCP-compatible clients without extra engineering"),
      p(""),
      p("How it compares to the Nexudus CLI:", { bold: true }),
      bullet("Both connect AI tools to Nexudus — but they serve different audiences"),
      bullet("The CLI is for developers and technical users: requires local installation, commands, and syntax knowledge"),
      bullet("The MCP server is for everyone: just a URL, a browser login, and plain English"),
      bullet("The CLI remains the better choice for scripting, automation, and engineering work — the MCP server opens conversational access to space operators, location managers, and support staff"),
    ]),

    // What can you do?
    sectionRow("What Can You Do with It?", [
      p("Explain:", { bold: true }),
      bullet("The MCP server gives the AI access to over 200 entity types in Nexudus — every record type operators work with day to day"),
      bullet("Ask questions in plain English: “Show me today’s bookings for the Call Booths”, “List all overdue invoices”"),
      bullet("Create and update records: “Create a booking for the HDMI Room tomorrow at 2pm for one hour”"),
      bullet("Run reports and summaries: “Summarise this week’s occupancy by resource type”"),
      bullet("Run operations: “Check in [member] for today”, “Activate the pending contract for [member]”"),
      p(""),
      p("Key safeguard to highlight:", { bold: true }),
      bullet("The AI will never take write actions — create, update, delete — without asking for user confirmation first"),
      bullet("This is built into how the MCP server works; it is not just a UI prompt"),
    ]),

    // How to Connect
    sectionRow("How to Connect\n(Live Demo)", [
      p("Explain:", { bold: true }),
      bullet("The server is hosted at https://mcp.nexudus.com — there is nothing to install"),
      bullet("Users sign in with their existing Nexudus credentials via a standard OAuth browser window"),
      bullet("The password goes directly to Nexudus — the AI client never sees it"),
      bullet("Nexudus issues a short-lived access token (8 hours); after that, users re-authenticate"),
      bullet("The AI inherits the exact permissions of the logged-in Nexudus account — no privilege escalation, no separate access configuration needed"),
      p(""),
      p("Demonstrate:", { bold: true }),
      subbullet("Open claude.ai and sign in"),
      subbullet("Go to Settings > Connectors (or Integrations, depending on plan)"),
      subbullet("Click Add custom connector"),
      subbullet("Enter Name: Nexudus and URL: https://mcp.nexudus.com, click Save"),
      subbullet("Walk through the browser login window — show that Nexudus credentials go directly to Nexudus"),
      subbullet("Show the connector status change to Connected"),
      subbullet("Point out: no password is stored — only a session token"),
    ]),

    // Live Examples
    sectionRow("Live Examples\n(Demo)", [
      p("Demonstrate:", { bold: true }),
      subbullet("First query: type “List my Nexudus locations” — show Claude calling the tool and returning real data"),
      subbullet("Scenario 1 — Bookings: “What bookings do we have today for the Call Booths?” — show how the AI constructs the query"),
      subbullet("Scenario 2 — Member lookup: “Find any members on the Hot-desk plan who haven’t checked in this month”"),
      subbullet("Scenario 3 — Create a record: “Create a booking for the HDMI Room tomorrow at 2pm for one hour”"),
      subbullet("On Scenario 3: pause before confirming — highlight the confirmation step clearly. This is the key operator safeguard"),
      p(""),
      p("Key message:", { bold: true }),
      bullet("Every write action surfaces a summary for the user to review and approve — the AI does not act unilaterally"),
    ]),

    // Security & Data Handling
    sectionRow("Security &\nData Handling", [
      p("Explain:", { bold: true }),
      bullet("The MCP server logs: the type of operation, the entity type, success/failure, and duration — nothing more"),
      bullet("It does NOT log: field values, member names, booking dates, prices, or any response data"),
      bullet("PII redaction: by default, personal data (names, emails, phone numbers, addresses) is automatically anonymised before it reaches the AI provider — already in the Nexudus CLI, coming to MCP server"),
      bullet("The AI inherits the logged-in user’s exact permissions — every action appears in the Nexudus audit trail under that user’s account"),
      bullet("Sessions are temporary by design — 8 hours, then re-authenticate; disconnecting immediately invalidates the token"),
      p(""),
      p("Operator responsibility:", { bold: true }),
      bullet("Data typed directly into an AI prompt is processed by the AI provider under their own privacy policy"),
      bullet("Recommend: use enterprise or business tiers of AI tools (Claude for Work, ChatGPT Enterprise) — these contractually disable training on input data"),
      bullet("Advise operators not to paste sensitive member data into AI prompts unless using an enterprise plan with appropriate data processing agreements"),
      bullet("For automated or unattended workflows, the Nexudus CLI is the safer choice"),
    ]),

    // Supported Clients
    sectionRow("Supported AI Clients", [
      p("Explain:", { bold: true }),
      bullet("Claude.ai (web) — requires a paid plan: Pro, Team, or Enterprise"),
      bullet("Claude Desktop — free to install; requires a Claude.ai account"),
      bullet("Claude Code — the developer CLI"),
      bullet("ChatGPT — requires Plus, Pro, Business, Enterprise, or Edu; Developer mode must be enabled"),
      bullet("VS Code with GitHub Copilot — configured via MCP settings in the editor"),
      bullet("Any client supporting OAuth 2.0, streamable HTTP transport, and the Tools protocol"),
      p(""),
      bullet("Note: MCP support across AI clients is expanding — this list reflects what is officially tested and documented at launch"),
    ]),

    // Live Q&A
    sectionRow("Live Q&A", [
      p("Anticipated questions:", { bold: true }),
      bullet("Does this cost extra? No — included in all Nexudus subscriptions"),
      bullet("Can the AI access data I’m not supposed to see? No — it inherits your exact account permissions"),
      bullet("Is the AI being trained on our Nexudus data? No — it only sees data temporarily to answer a request"),
      bullet("What if the AI makes a mistake and changes something? Write actions require user confirmation — the AI will always surface a summary before acting"),
      bullet("How is this different from the Nexudus CLI? The CLI is for developers and automation; the MCP server is for conversational use by non-technical staff"),
      bullet("Can I use it with tools other than Claude? Yes — any MCP-compatible client works, including ChatGPT and VS Code Copilot"),
    ]),

    // Wrap Up
    sectionRow("Wrap Up", [
      bullet("Thank attendees for joining"),
      bullet("Remind them the recording will be shared"),
      bullet("Point to learn.nexudus.com/mcp/overview for the full guide"),
      bullet("Direct questions to the Nexudus Support team"),
    ]),
  ],
});

// ── DOCUMENT ───────────────────────────────────────────────────────────────

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 240 } } },
        }],
      },
      {
        reference: "subbullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 360, hanging: 240 } } } },
          { level: 1, format: LevelFormat.DECIMAL, text: "%2.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        ],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "Nexudus MCP Server — Webinar Brief", size: 16, font: "Arial", color: "888888" }),
          ],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "Nexudus Training Team  |  Internal document  |  Page ", size: 16, font: "Arial", color: "888888" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Arial", color: "888888" }),
          ],
        })],
      }),
    },
    children: [
      ...titleBlock,
      new Paragraph({ children: [], spacing: { before: 240, after: 0 } }),
      metaTable,
      new Paragraph({ children: [], spacing: { before: 240, after: 0 } }),
      divider(),
      noteForHosts,
      divider(),
      h1("Key Dates"),
      datesTable,
      new Paragraph({ children: [], spacing: { before: 240, after: 0 } }),
      h1("Resources"),
      ...resourcesBlock,
      divider(),
      h1("Session Run of Show"),
      new Paragraph({ children: [], spacing: { before: 80, after: 80 } }),
      contentTable,
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/Users/oliviaservantefreeman/Desktop/Nexudus MCP Server - Webinar Brief.docx', buf);
  console.log('Done');
});
