#!/usr/bin/env node
/**
 * build-from-spec.mjs — generate a Tessera course from a Nexudus course spec.
 *
 * Usage:
 *   pnpm build-from-spec <path/to/course-spec.json> [--force]
 *
 * Reads the machine-readable course spec (see
 * ../skills/generate-content/reference/course-spec-format.md at the repo root)
 * and emits the Svelte pages, _meta.js files, course.config.js, layout.svelte
 * and styles/custom.css for one course under courses/<kebab-name>/.
 *
 * Rebuild behaviour (preserve-tweaks):
 *   A .build-state.json next to course.config.js records a hash of the spec
 *   content that produced each page. On re-run, pages whose spec content is
 *   unchanged are left untouched, so manual tweaks survive rebuilds. Pages
 *   whose spec content changed are regenerated. Pass --force to regenerate
 *   every generated page regardless of the hash. Files the generator never
 *   writes (layout.svelte, styles/, ad-hoc components/) are never touched.
 *
 *   --reset wipes the course's entire pages/ tree first and rebuilds from
 *   scratch (use when adopting a previously hand-written course, or after a
 *   big spec restructure). Manual tweaks inside pages/ are lost.
 */

import { createHash, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const coursesRoot = join(workspaceRoot, 'courses');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const force = args.includes('--force');
const reset = args.includes('--reset');
const specArg = args.find((a) => !a.startsWith('--'));
if (!specArg) {
  console.error('Usage: pnpm build-from-spec <path/to/course-spec.json> [--force] [--reset]');
  process.exit(1);
}
const specPath = resolve(specArg);
if (!existsSync(specPath)) {
  console.error(`Spec not found: ${specPath}`);
  process.exit(1);
}
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
if (spec.format !== 'nexudus-course-spec') {
  console.error(`Not a Nexudus course spec (format: ${JSON.stringify(spec.format)}).`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const kebab = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Serialise a JS value as a Svelte attribute value. Strings stay bare (Svelte
 *  treats a quoted attr value as a string); other values are wrapped in {} so
 *  Svelte parses them as expressions. */
const jsAttr = (v) => {
  if (typeof v !== 'string') return `{${jsExpr(v)}}`;
  if (v.includes("'") && !v.includes('"')) return `"${v}"`;
  return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
};

/** Serialise a JS value as a Svelte expression (for use inside {}). */
const jsExpr = (v) => {
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) return `[${v.map(jsExpr).join(', ')}]`;
  if (v !== null && typeof v === 'object')
    return `{ ${Object.entries(v)
      .map(([k, val]) => `${k}: ${jsExpr(val)}`)
      .join(', ')} }`;
  const s = String(v);
  if (s.includes("'") && !s.includes('"')) return `"${s}"`;
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
};

/** Make a raw HTML string safe inside Svelte markup. Literal HTML tags are fine
 *  for Svelte; braces are not (Liquid examples like {{ x }} or {% if %} would be
 *  parsed as template expressions), so they become numeric entities. */
const svelteSafe = (html) =>
  String(html)
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');

/** Render inline-HTML text as a block-level element. */
const textBlock = (html) => {
  const h = svelteSafe(html);
  if (/^\s*<(p|ul|ol|blockquote)\b/i.test(h)) return h;
  return `<p>${h}</p>`;
};

const hashOf = (value) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0, 16);

// ---------------------------------------------------------------------------
// Block → Svelte renderers (return { lines, imports, css })
// ---------------------------------------------------------------------------

const renderImage = (b) => {
  const src = b.src ?? '';
  if (src.startsWith('[SCREENSHOT')) {
    const desc = src.replace(/^\[SCREENSHOT\s*[—–-]\s*/, '').replace(/\]$/, '');
    return {
      lines: [
        '<div class="asset-placeholder">',
        '  <span class="asset-placeholder__label">Screenshot pending</span>',
        `  <p>${svelteSafe(desc)}</p>`,
        '</div>',
      ],
      imports: new Set(),
      // Closing braces are inlined because the page assembler dedupes
      // identical CSS lines, which would swallow a bare "}" line.
      css: [
        '.asset-placeholder { border: 1px dashed var(--tessera-border); border-radius: 6px; padding: var(--tessera-spacing-md) var(--tessera-spacing-lg); background: var(--tessera-bg-secondary); }',
        '.asset-placeholder__label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--tessera-text-light); margin-bottom: 0.25rem; }',
      ],
    };
  }
  const resolved = /^https?:\/\//.test(src) ? src : `$assets/${src}`;
  const lines = ['<Image', `  src=${jsAttr(resolved)}`];
  if (b.decorative) lines.push('  decorative');
  else lines.push(`  alt=${jsAttr(b.alt ?? '')}`);
  if (b.caption) lines.push(`  caption=${jsAttr(b.caption)}`);
  lines.push('/>');
  return { lines, imports: new Set(['Image']), css: [] };
};

const renderAccordion = (b) => {
  const lines = ['<Accordion>'];
  for (const item of b.items ?? []) {
    lines.push(`  <AccordionItem title=${jsAttr(item.title)}>`, textBlock(item.html), '  </AccordionItem>');
  }
  lines.push('</Accordion>');
  return { lines, imports: new Set(['Accordion', 'AccordionItem']), css: [] };
};

const renderCallout = (b) => ({
  lines: [`<Callout type="${b.tone ?? 'info'}">`, textBlock(b.html), '</Callout>'],
  imports: new Set(['Callout']),
  css: [],
});

/** Convert **bold** markers in plain-text process steps to <strong>. */
const boldToStrong = (text) =>
  String(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

const renderProcess = (b) => {
  const lines = [];
  if (b.intro) lines.push(textBlock(boldToStrong(b.intro)));
  lines.push('<ol class="process">');
  for (const step of b.steps ?? []) {
    const inner = svelteSafe(boldToStrong(step));
    lines.push(inner.length > 72 ? `  <li>\n    ${inner}\n  </li>` : `  <li>${inner}</li>`);
  }
  lines.push('</ol>');
  if (b.summary) lines.push(textBlock(boldToStrong(b.summary)));
  return { lines, imports: new Set(), css: ['.process li {', '  margin-bottom: 0.5rem;', '}'] };
};

const renderQuote = (b) => ({
  lines: ['<blockquote class="recap">', textBlock(b.html), '</blockquote>'],
  imports: new Set(),
  css: [
    '.recap {',
    '  border-left: 4px solid var(--tessera-primary);',
    '  padding-left: var(--tessera-spacing-md);',
    '  margin-left: 0;',
    '}',
  ],
});

const renderVideo = (b) => {
  const src = b.src ?? '';
  if (/airtable\.com\/embed/i.test(src)) {
    return {
      lines: [
        '<iframe',
        `  src=${jsAttr(src)}`,
        `  title=${jsAttr(b.title ?? 'Embedded form')}`,
        '  width="100%"',
        '  height="600px"',
        '  frameborder="0"',
        '></iframe>',
      ],
      imports: new Set(),
      css: [],
    };
  }
  const resolved = /^https?:\/\//.test(src) ? src : `$assets/${src}`;
  const lines = ['<Video', `  src=${jsAttr(resolved)}`];
  if (b.title) lines.push(`  title=${jsAttr(b.title)}`);
  lines.push('/>');
  return { lines, imports: new Set(['Video']), css: [] };
};

const renderQuestion = (q, imports) => {
  const fb = `  correctFeedback=${jsAttr(q.correctFeedback ?? '')}
  incorrectFeedback=${jsAttr(q.incorrectFeedback ?? '')}`;
  if (q.kind === 'multiple-choice') {
    imports.add('MultipleChoice');
    return [
      '<MultipleChoice',
      `  id=${jsAttr(q.id)}`,
      `  question=${jsAttr(q.prompt)}`,
      `  options=${jsAttr(q.options)}`,
      `  correct=${q.correctIndex}`,
      fb,
      '/>',
    ];
  }
  if (q.kind === 'true-false') {
    imports.add('MultipleChoice');
    return [
      '<MultipleChoice',
      `  id=${jsAttr(q.id)}`,
      `  question=${jsAttr(q.prompt)}`,
      `  options=${jsAttr(['True', 'False'])}`,
      `  correct=${q.answer ? 1 : 0}`,
      fb,
      '/>',
    ];
  }
  if (q.kind === 'fill-in-blank') {
    imports.add('FillInTheBlank');
    return [
      '<FillInTheBlank',
      `  id=${jsAttr(q.id)}`,
      `  question=${jsAttr(q.prompt)}`,
      `  answers=${jsAttr(q.answers)}`,
      `  caseSensitive=${!!q.caseSensitive}`,
      fb,
      '/>',
    ];
  }
  if (q.kind === 'matching') {
    imports.add('Matching');
    return [
      '<Matching',
      `  id=${jsAttr(q.id)}`,
      `  question=${jsAttr(q.prompt)}`,
      `  pairs=${jsAttr(q.pairs)}`,
      fb,
      '/>',
    ];
  }
  throw new Error(`Unknown quiz question kind: ${q.kind} (id ${q.id})`);
};

const renderBlock = (b, imports) => {
  switch (b.type) {
    case 'text':
      return { lines: textBlock(b.html).split('\n'), imports, css: [] };
    case 'heading':
      return { lines: [`<h${b.level ?? 2}>${svelteSafe(b.text)}</h${b.level ?? 2}>`], imports, css: [] };
    case 'image':
      return renderImage(b);
    case 'accordion':
      return renderAccordion(b);
    case 'callout':
      return renderCallout(b);
    case 'process':
      return renderProcess(b);
    case 'quote':
      return renderQuote(b);
    case 'video':
      return renderVideo(b);
    default:
      throw new Error(`Unknown block type: ${b.type}`);
  }
};

// ---------------------------------------------------------------------------
// Page assembly
// ---------------------------------------------------------------------------

/** Split a lesson's non-quiz blocks into pages (~maxBlocks per page, preferring breaks before headings). */
const chunkBlocks = (blocks, maxBlocks = 9) => {
  const chunks = [];
  let current = [];
  for (let i = 0; i < blocks.length; i++) {
    current.push(blocks[i]);
    const atLimit = current.length >= maxBlocks;
    const nextIsHeading = blocks[i + 1]?.type === 'heading';
    const lastIsHeading = blocks[i].type === 'heading';
    if (atLimit || (nextIsHeading && !lastIsHeading && current.length >= 4)) {
      chunks.push(current);
      current = [];
    }
  }
  if (current.length) chunks.push(current);
  return chunks;
};

const pageNameFor = (chunk, fallback) => {
  const heading = chunk.find((b) => b.type === 'heading');
  return kebab(heading?.text ?? fallback) || kebab(fallback);
};

/** Truncate a page-name slug so numbered dirs stay filesystem-friendly. */
const slug = (s) => (s.length > 40 ? s.slice(0, 40).replace(/-+$/, '') : s);

const buildPage = ({ h1, title, bodyLines, imports, css, quiz }) => {
  const importLine = imports.size
    ? `\n<script>\n  import { ${[...imports].sort().join(', ')} } from 'tessera-learn';\n</script>\n`
    : '';
  const quizConfig = quiz
    ? `,
    quiz: { graded: ${!!quiz.graded}, maxAttempts: ${quiz.maxAttempts ?? 3} }`
    : '';
  const style = css.length
    ? `\n<style>\n${[...new Set(css)].join('\n')}\n</style>`
    : '';
  return `<script module>
  export const pageConfig = { title: ${jsExpr(title)}${quizConfig} };
</script>
${importLine}
<h1>${svelteSafe(h1)}</h1>

${bodyLines.join('\n')}
${style}
`;
};

// ---------------------------------------------------------------------------
// Course planning
// ---------------------------------------------------------------------------

const courseName = spec.courseName;
const courseDir = join(coursesRoot, kebab(courseName));
const isNewCourse = !existsSync(join(courseDir, 'course.config.js'));

const isSummaryLesson = (title) => /^summary$/i.test(String(title).trim());

const planPages = () => {
  const planned = [];
  const lessons = spec.lessons ?? [];
  const contentLessons = lessons.filter((l) => !isSummaryLesson(l.title));
  const summaryLesson = lessons.find((l) => isSummaryLesson(l.title));
  const version = spec.version ?? '';

  // Section 01 — cover page.
  {
    const cover = spec.cover ?? {};
    const lines = [
      textBlock(cover.intro ?? ''),
      '',
      '<h2>By the end of this course, you will be able to:</h2>',
      '',
      '<ul>',
      ...(cover.objectives ?? []).map((o) => `  <li>${svelteSafe(o)}</li>`),
      '</ul>',
    ];
    if (cover.disclaimer) {
      lines.push('', '<Callout type="info">', textBlock(cover.disclaimer), '</Callout>');
    }
    if (version) lines.push('', `<p class="version">Version ${svelteSafe(version)}</p>`);
    planned.push({
      section: { dir: '01-getting-started', title: 'Introduction' },
      page: {
        dir: '01-overview',
        title: 'Overview',
        hash: hashOf({ cover: spec.cover, version }),
        content: buildPage({
          h1: courseName,
          title: 'Overview',
          bodyLines: lines,
          imports: new Set(cover.disclaimer ? ['Callout'] : []),
          css: version ? ['.version {', '  color: var(--tessera-text-light);', '  font-size: 0.875rem;', '}'] : [],
        }),
      },
    });
  }

  // Content lessons → sections 02..N.
  contentLessons.forEach((lesson, idx) => {
    const section = {
      dir: `${String(idx + 2).padStart(2, '0')}-${kebab(lesson.title) || 'lesson-' + (idx + 1)}`,
      title: lesson.title,
    };
    const allBlocks = lesson.blocks ?? [];
    const quiz = allBlocks.find((b) => b.type === 'quiz');
    let bodyBlocks = allBlocks.filter((b) => b.type !== 'quiz');
    // A "Knowledge Check" heading immediately preceding the quiz is the quiz
    // page's own title, not a content section.
    if (quiz && bodyBlocks.length && /knowledge check/i.test(bodyBlocks[bodyBlocks.length - 1]?.text ?? '')) {
      bodyBlocks = bodyBlocks.slice(0, -1);
    }
    const chunks = chunkBlocks(bodyBlocks);

    chunks.forEach((chunk, ci) => {
      const hasOwnHeading = chunk.some((b) => b.type === 'heading');
      const isLast = ci === chunks.length - 1 && !quiz;
      const fallback = chunks.length === 1 ? lesson.title : isLast ? 'More' : `Part ${ci + 1}`;
      const name = hasOwnHeading ? pageNameFor(chunk, fallback) : fallback;
      const imports = new Set();
      const rendered = chunk.map((b) => renderBlock(b, imports));
      for (const r of rendered) for (const i of r.imports) imports.add(i);
      planned.push({
        section,
        page: {
          dir: `${String(ci + 1).padStart(2, '0')}-${slug(name)}`,
          title: lesson.title,
          hash: hashOf(chunk),
          content: buildPage({
            h1: lesson.title,
            title: lesson.title,
            bodyLines: rendered.flatMap((r) => r.lines),
            imports,
            css: rendered.flatMap((r) => r.css),
          }),
        },
      });
    });

    if (quiz) {
      const imports = new Set();
      for (const q of quiz.questions ?? []) renderQuestion(q, imports);
      planned.push({
        section,
        page: {
          dir: `${String(chunks.length + 1).padStart(2, '0')}-knowledge-check`,
          title: 'Knowledge Check',
          hash: hashOf([quiz]),
          content: buildPage({
            h1: 'Knowledge Check',
            title: 'Knowledge Check',
            bodyLines: (quiz.questions ?? []).flatMap((q) => renderQuestion(q, imports)),
            imports,
            css: [],
            quiz,
          }),
        },
      });
    }
  });

  // Final section — Summary. The "Course feedback" heading + intro always sit
  // directly above the feedback form (video block), even when the spec lists
  // the video block earlier.
  if (summaryLesson) {
    const section = {
      dir: `${String(contentLessons.length + 2).padStart(2, '0')}-summary`,
      title: 'Summary',
    };
    const blocks = summaryLesson.blocks ?? [];
    const imports = new Set();
    const rendered = blocks.map((b) => renderBlock(b, imports));
    const feedbackLines = [
      '<h2>Course feedback</h2>',
      '',
      '<p>If you have any feedback on this course, please let us know using the form below.</p>',
    ];
    const bodyLines = [];
    const css = [];
    blocks.forEach((b, i) => {
      if (b.type === 'video') {
        bodyLines.push(...feedbackLines, ...rendered[i].lines);
      } else {
        bodyLines.push(...rendered[i].lines);
      }
      css.push(...rendered[i].css);
    });
    planned.push({
      section,
      page: {
        dir: '01-recap',
        title: 'Recap',
        hash: hashOf(blocks),
        content: buildPage({
          h1: 'Summary',
          title: 'Summary',
          bodyLines,
          imports,
          css,
        }),
      },
    });
  }

  return planned;
};

// ---------------------------------------------------------------------------
// Scaffolding for new courses
// ---------------------------------------------------------------------------

const LAYOUT_TEMPLATE = `<script>
  import '$shared/tokens.css';
  import { useNavigation } from 'tessera-learn';

  let { page } = $props();
  const nav = useNavigation();
</script>

<div class="course">
  <header>
    <h1>{{COURSE_TITLE}}</h1>
  </header>

  <main>
    {@render page()}
  </main>

  <footer>
    <button
      class="nav-btn"
      disabled={!nav.canGoPrev}
      onclick={() => nav.prev()}
    >
      ← Previous
    </button>
    <button
      class="nav-btn nav-btn--primary"
      disabled={!nav.canGoNext}
      onclick={() => nav.next()}
    >
      Next →
    </button>
  </footer>
</div>

<style>
  .course {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--tessera-spacing-md);
    padding: var(--tessera-spacing-md) var(--tessera-spacing-xl);
    border-bottom: 1px solid var(--tessera-border);
  }

  header h1 {
    margin: 0;
    font-size: 1.125rem;
  }

  main {
    flex: 1;
    width: 100%;
    max-width: var(--tessera-content-max-width);
    margin: 0 auto;
    padding: var(--tessera-spacing-xl);
  }

  footer {
    display: flex;
    justify-content: space-between;
    gap: var(--tessera-spacing-md);
    padding: var(--tessera-spacing-md) var(--tessera-spacing-xl);
    border-top: 1px solid var(--tessera-border);
  }

  .nav-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    background: var(--tessera-bg);
    color: var(--tessera-text);
    cursor: pointer;
    transition:
      background var(--tessera-transition-fast),
      border-color var(--tessera-transition-fast);
  }

  .nav-btn:hover:not(:disabled) {
    background: var(--tessera-bg-secondary);
  }

  .nav-btn--primary {
    border-color: transparent;
    /* Brand orange #FE4D00 + white text is only 3.35:1 (below WCAG 4.5:1),
     * so the default button colour is a darkened brand orange (#C73E00 =
     * 5.1:1). Override --tessera-primary-button in styles/custom.css when a
     * different brand colour keeps white text legible. */
    background: var(--tessera-primary-button, #c73e00);
    color: #fff;
  }

  .nav-btn--primary:hover:not(:disabled) {
    background: var(--tessera-primary-button-hover, #a83300);
  }

  .nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
`;

// Brand defaults from ../skills/generate-content/preferences.md (SCORM eLearning
// courses): Parkinsans for display, Poppins for body, #FE4D00 core brand colour.
const CUSTOM_CSS_TEMPLATE = `/* Course-level CSS overrides.
 * Imported automatically by Tessera. Use this file for tweaks on top of the
 * default theme. Brand values come from
 * ../skills/generate-content/preferences.md at the repo root.
 */
@import url('https://fonts.googleapis.com/css2?family=Parkinsans:wght@400;500;600&family=Poppins:wght@400;500;600&display=swap');

:root {
  /* Body font: Poppins (Regular–Semi-Bold); fallback stack if the LMS
   * blocks external font requests. Display font: Parkinsans for headings,
   * subheadings, accents, and buttons. */
  --tessera-font-family: 'Poppins', Arial, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
.nav-btn {
  font-family: 'Parkinsans', Arial, sans-serif;
}
`;

const scaffoldNewCourse = () => {
  mkdirSync(join(courseDir, 'pages'), { recursive: true });
  mkdirSync(join(courseDir, 'styles'), { recursive: true });
  writeFileSync(
    join(courseDir, 'course.config.js'),
    `export default {
  title: ${jsExpr(courseName)},
  id: 'urn:uuid:${randomUUID()}',
  language: 'en',
  navigation: { mode: 'free' },
  completion: { mode: 'percentage', percentageThreshold: 100 },
  scoring: { passingScore: 70 },
  branding: {
    primaryColor: '#FE4D00',
  },
  export: { standard: 'scorm2004' },
};
`,
  );
  writeFileSync(join(courseDir, 'layout.svelte'), LAYOUT_TEMPLATE.replaceAll('{{COURSE_TITLE}}', courseName));
  writeFileSync(join(courseDir, 'styles/custom.css'), CUSTOM_CSS_TEMPLATE);
};

// ---------------------------------------------------------------------------
// Apply plan (preserve-tweaks)
// ---------------------------------------------------------------------------

const STATE_FILE = '.build-state.json';

const loadState = () => {
  try {
    return JSON.parse(readFileSync(join(courseDir, STATE_FILE), 'utf8'));
  } catch {
    return { pages: {} };
  }
};

const saveState = (state) => {
  writeFileSync(join(courseDir, STATE_FILE), JSON.stringify(state, null, 2) + '\n');
};

const applyPlan = (planned, state) => {
  const report = { created: [], updated: [], preserved: [], removed: [] };
  const seenPaths = new Set();

  for (const { section, page } of planned) {
    const sectionPath = join(courseDir, 'pages', section.dir);
    const pagePath = join(sectionPath, page.dir);
    const relPath = `pages/${section.dir}/${page.dir}`;
    seenPaths.add(relPath);

    const svelteFile = join(pagePath, `${page.dir.split('-').pop()}.svelte`);
    const metaContent = `export default { title: ${jsExpr(page.title)}, pages: [${jsExpr(
      page.dir.split('-').pop(),
    )}] };\n`;

    if (force || !existsSync(svelteFile)) {
      mkdirSync(pagePath, { recursive: true });
      writeFileSync(join(pagePath, '_meta.js'), metaContent);
      writeFileSync(svelteFile, page.content);
      report[force ? 'updated' : 'created'].push(`${relPath}/`);
    } else if (state.pages[relPath] !== page.hash) {
      writeFileSync(join(pagePath, '_meta.js'), metaContent);
      writeFileSync(svelteFile, page.content);
      report.updated.push(`${relPath}/`);
    } else {
      report.preserved.push(`${relPath}/`);
    }

    const sectionMeta = join(sectionPath, '_meta.js');
    const sectionMetaContent = `export default { title: ${jsExpr(section.title)} };\n`;
    if (!existsSync(sectionMeta) || readFileSync(sectionMeta, 'utf8') !== sectionMetaContent) {
      writeFileSync(sectionMeta, sectionMetaContent);
    }
    state.pages[relPath] = page.hash;
  }

  // Remove page folders the spec no longer produces (only folders we manage).
  for (const relPath of Object.keys(state.pages)) {
    if (seenPaths.has(relPath)) continue;
    const abs = join(courseDir, relPath);
    if (existsSync(abs)) {
      rmSync(abs, { recursive: true, force: true });
      report.removed.push(`${relPath}/`);
    }
    delete state.pages[relPath];
  }
  // Prune empty sections.
  for (const entry of readdirSync(join(courseDir, 'pages'))) {
    const sectionPath = join(courseDir, 'pages', entry);
    if (statSync(sectionPath).isDirectory() && readdirSync(sectionPath).length === 0) {
      rmSync(sectionPath, { recursive: true, force: true });
    }
  }

  return report;
};

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

if (isNewCourse) {
  scaffoldNewCourse();
  console.log(`Scaffolded new course: courses/${kebab(courseName)}/`);
} else if (reset) {
  rmSync(join(courseDir, 'pages'), { recursive: true, force: true });
  console.log('Reset: removed existing pages/ tree.');
}

// Keep brand defaults in sync for existing courses without clobbering manual
// tweaks: update a stale primaryColor, and write the branded custom.css only
// when the file is missing or still the plain boilerplate.
const BRAND_PRIMARY = '#FE4D00';
const configPath = join(courseDir, 'course.config.js');
if (!isNewCourse && existsSync(configPath)) {
  const config = readFileSync(configPath, 'utf8');
  const updated = config.replace(
    /primaryColor:\s*['"]#[0-9a-fA-F]{3,8}['"]/,
    `primaryColor: '${BRAND_PRIMARY}'`,
  );
  if (updated !== config) {
    writeFileSync(configPath, updated);
    console.log(`Branding: primaryColor → ${BRAND_PRIMARY}`);
  }
}
const cssPath = join(courseDir, 'styles', 'custom.css');
const PLAIN_CSS_MARKER = 'Use this file for tweaks on top of the';
if (
  !existsSync(cssPath) ||
  (readFileSync(cssPath, 'utf8').includes(PLAIN_CSS_MARKER) &&
    !readFileSync(cssPath, 'utf8').includes('Parkinsans'))
) {
  writeFileSync(cssPath, CUSTOM_CSS_TEMPLATE);
  console.log('Branding: wrote styles/custom.css (fonts + brand defaults)');
}

const planned = planPages();
const state = loadState();
const report = applyPlan(planned, state);
saveState(state);

console.log(`Course: ${courseName}`);
console.log(`  created:   ${report.created.length ? report.created.join(', ') : '—'}`);
console.log(`  updated:   ${report.updated.length ? report.updated.join(', ') : '—'}`);
console.log(`  preserved: ${report.preserved.length ? report.preserved.join(', ') : '—'}`);
console.log(`  removed:   ${report.removed.length ? report.removed.join(', ') : '—'}`);
console.log('\nNext: pnpm check ' + kebab(courseName) + ' && pnpm export ' + kebab(courseName));
