# Codebase Research — `.11th-Maths`

Status: findings only, as of 17 Aug 2026. Not a plan. Not a decision record.

Produced by a four-agent read-only research pass (architecture, content pipeline,
inconsistencies, fragility), with the load-bearing claims verified directly afterwards.
No files were written, edited or deleted during the research.

---

## Correction to the brief

This is **not** a Next.js app. There is no `package.json`, no router, no JSX/TSX, no build
step, no `node_modules`. It is **84 hand-written `.html` files** plus 5 `.css`, 5 `.js`,
10 `.md`. The Next.js projects on this disk are `D:\AI-300\Mafia Wars` and
`D:\AI-300\S.web\solace-by-fia` — different products.

Everything below describes the static site as it actually exists.

---

## AREA 1 — ARCHITECTURE

**Stack:** static HTML + CSS + vanilla JS. No framework, no bundler, no templating, no
build. Every URL maps 1:1 to a file on disk. All links relative — zero root-absolute
links — so it runs from `file://` or any static host unmodified.

**This is not one site. It is three sites plus a landing page**, each with its own
duplicated CSS/JS spine:

| Sub-site | Pages | Own CSS | Own JS | Status |
|---|---|---|---|---|
| `class-xi-hub/` | 68 | `style.css`, `subjects.css`, `lessons.css` | `main.js`, `lessons.js`, `search.js` | **Current** |
| `physics-xi/` | 2 | `css/style.css` (489 ln) | `js/main.js` | Current, 1 of 14 units built |
| `chemistry-lessons/` | 10 | `css/style.css` (804 ln) | `js/script.js` | **Abandoned, unreachable** |
| root `index.html` | 1 | inline `<style>` | none | Current |

Three different files are named `css/style.css`; two are named `js/main.js`.

**Styling:** three separate, incompatible design-token systems (three different `:root`
blocks with different variable names). Dark mode is `[data-theme="dark"]` + localStorage
everywhere, but with **conflicting defaults and keys** — `class-xi-hub` defaults *dark*
under key `theme`, `chemistry-lessons` defaults *light* under the same key `theme`,
`physics-xi` uses key `phy-theme`. Theme does not carry between sub-sites.

**Notable:** `--font: "Inter"` and `--mono: "JetBrains Mono"` are declared in all three
token sets and **loaded nowhere** — no `@font-face`, no Google Fonts link. Every page
silently falls back to system fonts.

**Dependencies:** exactly one third-party library, KaTeX from jsDelivr — pinned at
**0.16.9** in three maths lessons and **0.16.11** in `physics-xi`. No analytics, no fonts,
no images.

**Deploy config: none in the repo.** No `.github/`, no `vercel.json`, no `netlify.toml`,
no `CNAME`. Hosting exists only in prose, and the prose contradicts itself:
`PROJECT_CONTEXT.md` says `learnwithusama.vercel.app`, `class-xi-hub/README.md` says
`class-xi-hub.vercel.app`.

**Three `.gitignore` files**, two of which ignore `node_modules/` "in case someone
accidentally runs npm here."

---

## AREA 2 — CONTENT PIPELINE

### Is the content DATA or CODE?

**It is CODE. Unambiguously.**

Verified directly, not inferred:

- **Zero data files.** Whole-repo extension census: 84 html, 10 md, 5 js, 5 css,
  **1 json** — and that one JSON is `.claude/settings.local.json` (tool permissions,
  gitignored). No YAML, no MDX, no `content/` directory, no database.
- **Zero runtime data loading.** Every `.js` and `.html` was grepped for `fetch(`,
  `XMLHttpRequest` and `.json`. **The only hit in the entire repo is a comment** in dead
  code — `class-xi-hub/js/search.js:9`, which reads: *"Build a lessons-index.json (list of
  all lessons + keywords)"*. The data layer was planned and never built.
- **Every sentence of teaching prose, every table cell, every quiz answer is typed as HTML
  markup inside its page file.**
- **`components/` is not a component system.** `components/header.html:3` states it
  outright: *"This is NOT automatically included — HTML doesn't support includes."* It is a
  copy-paste clipboard. Nothing imports it.

Presentation and content are fused at the character level. A single sentence of chemistry
is inseparable from four nested `<div>`s and a hand-picked emoji:

```html
<div class="callout know">
  <div class="callout-icon">💡</div>
  <div class="callout-body">
    <div class="callout-title">Why noble gases don't bond</div>
    <p>Atoms of almost all elements have an <strong>incomplete outer shell</strong>…</p>
```

There is no seam — no front-matter, no `{{ }}`, no slot, no partial — at which content
could be lifted out. To restyle callouts globally today you must edit 24 lesson files.

### Content inventory

| Subject | Built | Placeholder |
|---|---|---|
| Chemistry | Ch 1 (7 lessons + exercise), Ch 2 (6 lessons, no exercise), Ch 3 (7 lessons + exercise) | Ch 4–12 |
| Mathematics | Unit 1 (3 lessons) | Units 2–12 |
| Physics | none in hub; `physics-xi` Unit 1 as one 1,064-line file | Ch 1–10 hub, Units 2–14 physics-xi |
| English | none | all 4 sections |

**Verified counts: 23 real lesson files + 2 exercises.** 41 "coming soon" placeholders.
13 physics-xi units have no file at all — they are `href="#"` rows hardcoded in the index.

### One lesson, traced end to end

`class-xi-hub/subjects/chemistry/chapter-3/lesson-1.html` (655 lines). The browser loads
**six files, no network calls**:

| # | File | Contributes |
|---|---|---|
| 1 | `lesson-1.html` | **100% of the lesson** — all prose, Table 3.1, 3 ASCII diagrams, 5 MCQs + their answers, 4 reveal-questions + answer text |
| 2 | `css/style.css` (264 ln) | tokens, reset, header, footer |
| 3 | `css/subjects.css` (256 ln) | the green accent, via `html[data-subject="chemistry"]` |
| 4 | `css/lessons.css` (313 ln) | every content-block class (`.def-box`, `.callout`, `.mcq-card`, `.eq`, `.diagram`…) |
| 5 | `js/main.js` (48 ln) | dark mode only |
| 6 | `js/lessons.js` (109 ln) | progress bar, MCQ engine, reveal buttons |

Lesson text lives in lines 45–637. Quiz answers live in two places, both in the same file:
`data-correct="true"` on one button per card, and literal text inside
`<div class="answer-box">`. Both are fully present in View Source — unavoidable without a
server, but worth knowing for a study site.

**The JS↔HTML contract:** `lessons.js` scopes to `.mcq-card`, finds `.mcq-opt`,
string-compares `data-correct === 'true'`, writes into `.mcq-feedback`. The reveal feature
is worse — it finds the answer by **`btn.nextElementSibling`**, positionally, not by class.
Insert anything between the button and its answer box and the feature silently breaks.

**Three mutually incompatible quiz conventions exist** across the three sub-sites
(`.mcq-card`/`.mcq-opt`/`.reveal-btn` vs `.mcq`/`.mcq-option`/`.show-answer-btn` vs native
`<details>`). A lesson authored for one will not function in another.

### Boilerplate ratio

Page chrome is ~61 lines per lesson (**9%**), of which 58 lines are byte-identical between
any two lessons. But roughly **48% of every lesson file is structural wrapper markup**
drawn from a closed vocabulary of ~25 classes. Repo-wide, 68 files carry the verbatim
header block and 69 repeat the footer — about 4,100 lines of copy-pasted chrome, roughly
the size of an entire chapter.

---

## AREA 3 — INCONSISTENCIES

**Two chemistry sites with conflicting chapter numbering.** `chemistry-lessons/` is
unreachable from the homepage but still present, and its syllabus disagrees with the live
one:

| Ch # | `chemistry-lessons/` | `class-xi-hub/` |
|---|---|---|
| 1 | Introduction to Fundamental Concepts | **Stoichiometry** |
| 2 | The Three States of Matter | **Atomic Structure** |
| 3 | **Atomic Structure** | Theories of Covalent Bonding |

"Atomic Structure" is chapter 3 in one and chapter 2 in the other.

**Two contradictory Physics syllabi, both linked from the homepage.**
`class-xi-hub/subjects/physics/` lists 10 chapters starting "The Scope of Physics";
`physics-xi/` lists 14 units starting "Measurements". **Not one chapter title overlaps.**

**Lesson counts stated in five places, all disagreeing.** Verified on the homepage:

```
class-xi-hub/index.html:51   <div class="stat-number">8</div>
class-xi-hub/index.html:83   <span><strong>8</strong> lessons done</span>
```

Actual chemistry content is **20 lessons + 2 exercises**. `PROGRESS.md` says 22,
`PROJECT_CONTEXT.md` says 8 and marks Chapters 2 and 3 "⏳ Not Started" (both are fully
built), `README.md` says 1. The homepage understates the site by ~64%.

**Footer text has already fragmented.** Verified by grep:

```
 36  Built with patience and curiosity · <strong>Usama</strong> · Class XI · Sindh Board · 2026
 28  Built with patience and curiosity · Usama · 2026
 10  Built by Usama · Class XI FSc · Sindh Board · 2026
  3  Built with patience and curiosity · Usama · Class XI FSc · 2026
  2  Built with patience and curiosity · Usama · Class XI FSc · Sindh Board · 2026
```

Five to six variants depending on how you count. **This is the fossil record of the ripple
problem** — someone edited the footer, the edit reached a subset, and now no single
find-and-replace can fix it. `components/footer.html` exists and is loaded by nothing.

**Broken CSS variables, live today.** Verified: `--bg-secondary`, `--radius`,
`--accent-dark`, `--accent-light` are used in the Mathematics unit-1 lessons and **defined
in zero CSS files** — the June redesign renamed them to `--surface-2` and `--r`. So
`.ex-card { background: var(--bg-secondary); border-radius: var(--radius); }` renders
transparent with square corners right now. Sixteen CSS classes are used in
`mathematics/unit-1/` and never defined anywhere.

**Dead files:** `js/search.js` (15 lines, referenced by zero pages), all three
`components/*.html`, the entire `chemistry-lessons/` tree, `1ComplexNumbers/*.md` (the
hand-written source notes that were manually re-typed into the maths lessons), and
`chemsitry chapter 2.pdf` (11 MB, misspelled, untracked).

**Convention drift across chapters:** Chemistry Ch 1 has 6 sections per lesson, Ch 2 has 8,
Ch 3 has **13**. Ch 3 abandoned the "6 Steps — Never Change This Order" template documented
in `PROJECT_CONTEXT.md:189` in favour of following the textbook's own subsections. Ch 2 has
no exercise; Ch 1 and 3 do. Ch 2's last lesson navigates to the chapter index; Ch 1 and 3
navigate to the exercise.

---

## AREA 4 — FRAGILITY

### The shared spine, by blast radius

| File | HTML files referencing it | Failure mode |
|---|---|---|
| `class-xi-hub/css/style.css` | **69** | 37 `:root` vars feeding **214 `var()` consumers**; unscoped `body`/`a`/`p`/`h1-h4`/`*`; `.container` (281 elements). One stray `}` silently discards every rule after it. |
| `class-xi-hub/css/subjects.css` | **69** | the 8 `[data-subject]` rules are the only thing giving each subject its colour |
| `class-xi-hub/js/main.js` | **69** | dark mode; guarded by `if (btn)` so all failures are silent |
| `class-xi-hub/css/lessons.css` | 26 | all lesson-body styling + unscoped bare `table`/`thead`/`tbody` |
| `class-xi-hub/js/lessons.js` | 26 | 108 MCQ cards, 156 reveal buttons |

Single highest-leverage lines: `--accent` (47 consuming rules), `--font` (typeface of the
whole site from one declaration), `--max-wide` (page width of 81 pages).

### Silent-failure contracts

Every HTML↔JS contract is enforced by **nothing**. A misspelled class returns an empty
NodeList; the loop never runs; **no error, no console output, page looks completely
normal.** There is not a single `console.warn`, `throw`, or value check in the codebase.

The most dangerous: **445 `data-correct` attributes (112 true, 333 false)** — verified —
checked by strict string compare `=== 'true'`. Type `data-correct="True"` on the one correct
option and the student who picks the right answer gets a red ❌ while the feedback text
claims the correct answer is highlighted in green — and nothing is green. Undetectable
without clicking that exact option.

Also silent: `data-subject="maths"` instead of `"mathematics"` matches no rule, so the page
renders in chemistry green; `.reading-progress` is injected by JS and appears in zero HTML
files, so renaming it in either file makes it vanish untraceably.

### Path fragility

Four distinct depth levels produce four prefix conventions for the same asset. **735 total
links; 692 (94%) are position-dependent**, of which 334 use the identical string
`../../../`. Moving one lesson file one level down silently invalidates all 5 asset links
plus ~12 nav links at once — the page renders as unstyled raw HTML. A bulk find-and-replace
intended for one depth corrupts the other three.

**Good news, verified:** all 81 live pages currently resolve 100% cleanly, including case.
The only broken links are the `[REPLACE: …]` placeholders in `components/`.

### No safety net whatsoever

No tests, no HTML validation, no link checker, no linter, no CI, no `.github/` directory, no
pre-commit hook, no build step. The only config files are `.claude/settings.local.json` and
three `.gitignore`s.

---

## DIRECTORY MAP

```
.11th-Maths/
├── index.html ................ Landing page; links ONLY to class-xi-hub + physics-xi. Self-styled via inline <style>.
├── README.md ................. STALE (Apr 2026). Describes a Maths-only Markdown repo; claims "0/12 chapters".
├── chapters-and-progress.md .. STALE. Second, competing progress tracker; all 12 units unchecked.
├── resources.md .............. Stale link list.
├── chemsitry chapter 2.pdf ... Orphan 11 MB binary. Misspelled, untracked, superseded by D:\AI-300\Books\.
│
├── 1ComplexNumbers/ .......... ABANDONED. 3 .md files — the hand-written source of the 3 live maths lessons.
│
├── chemistry-lessons/ ........ ABANDONED v1 chemistry site. Unreachable from homepage. Own CSS+JS, conflicting syllabus.
│   ├── css/style.css ......... 804 lines, independent design system
│   ├── js/script.js .......... 141 lines, legacy MCQ/dark-mode engine with different class names
│   └── chapters/1..8/ ........ 1 real lesson, 7 placeholders
│
├── physics-xi/ ............... Standalone v3 Physics tutorial. Sidebar layout, KaTeX. 1 of 14 units built.
│   ├── css/style.css ......... 489 lines, third independent design system
│   ├── js/main.js ............ theme (key 'phy-theme') + sidebar + KaTeX bootstrap
│   └── chapters/chapter-1.html  Entire unit in one 1,064-line file
│
└── class-xi-hub/ ............. THE CURRENT SITE. 68 pages.
    ├── index.html ............ 4 subject cards + hardcoded stat counters (currently wrong)
    ├── PROGRESS.md ........... Hand-maintained tally, not derived from filesystem
    ├── PROJECT_CONTEXT.md .... Authoring conventions; stale on chapter status and class names
    ├── README.md ............. Third progress claim, disagrees with the other two
    ├── css/style.css ......... 264 ln — tokens + reset + chrome. 69 pages depend on it.
    ├── css/subjects.css ...... 256 ln — per-subject accents + index-page layouts
    ├── css/lessons.css ....... 313 ln — all lesson content blocks
    ├── js/main.js ............ 48 ln — dark mode only
    ├── js/lessons.js ......... 109 ln — progress bar + MCQ engine + reveal buttons
    ├── js/search.js .......... DEAD. 15 lines, one console.log, referenced by nothing.
    ├── components/ ........... DEAD. header/footer/lesson-template .html — copy-paste snippets, never included.
    └── subjects/
        ├── chemistry/ ........ 12 chapters; 1-3 built (20 lessons + 2 exercises), 4-12 placeholders
        ├── mathematics/ ...... 12 units; unit-1 built (3 lessons, uses KaTeX + broken CSS vars)
        ├── physics/ .......... 10 chapters, ALL placeholders — and a different syllabus from physics-xi/
        └── english/ .......... 4 sections, ALL placeholders
```

---

## THE "ADD A CHAPTER" WORKFLOW AS IT EXISTS TODAY

Reconstructed from `git show --stat` on the two clean chapter commits (`64389ea` Chapter 2,
`1ea64b6` Chapter 3), cross-checked against `PROJECT_CONTEXT.md:214-227`.

**Chapter 3 = 11 files changed, 4,903 insertions.** Chapter 2 = 9 files, 3,265 insertions.
The shape is invariant:

| Step | Action | Mechanical? |
|---|---|---|
| 1 | Read the source PDF; render pages to images (body text is vector outlines, so no text layer) | Judgement |
| 2 | Decide the lesson split | Judgement |
| 3 | **Create `lesson-1..N.html`** — ~600 lines each. Copy the 61-line chrome, hand-wrap every paragraph in `<p>`, every definition in a 5-line `.def-box`, every callout in a 7-line nest, hand-place `data-correct="true"` | New content, but ~48% of each file is repetitive wrapper markup |
| 4 | **Create `exercise.html`** (skipped for Ch 2) | Same |
| 5 | **Rewrite `chapter-N/index.html`** — delete the `.coming-soon-page` block, stamp out N near-identical 8-line `.lesson-row` blocks | ~60% mechanical |
| 6 | **Flip the badge in `subjects/chemistry/index.html`** — remove `coming-soon` class, swap `badge-soon`→`badge-progress`, retype the count | **100% mechanical, byte-identical shape every time** |
| 7 | **Append to `PROGRESS.md`** — a table of N identically-shaped rows, a checklist of N `- [x]` lines, delete from "NOT STARTED", rewrite "NEXT UP" | ~90% mechanical |
| 8 | *(documented but never actually done)* Update `class-xi-hub/index.html` stat counters | Skipped both times |

**Step 8 is the smoking gun.** `PROJECT_CONTEXT.md:214-227` mandates it.
`git log -- class-xi-hub/index.html` shows the file was last touched at the redesign commit
— neither chapter commit touched it. That is why the homepage says 8 lessons when there are
20. **The fourth and fifth places a number is duplicated are the ones that rot.**

Neither chapter commit touched any CSS or JS. That part is genuinely healthy: the styling
contract has been stable since the redesign.

---

## TOP 5 STRUCTURAL PROBLEMS, BY PAIN

**1. Content is code, with no seam to separate it.**
Every fact lives inside presentation markup, in a file that also carries navigation,
breadcrumbs, prev/next links and asset paths. There is no data layer, no template engine, no
include mechanism — verified, not assumed: zero JSON data files, zero `fetch`, and
`components/header.html:3` says includes are impossible. Consequences: ~4,900 hand-authored
lines per chapter; a global restyle means editing 24 files; content cannot be reused,
validated, counted or queried; and the same information (a lesson title) is retyped in up to
22 places. **This is the root cause of problems 2–5.**

**2. No include mechanism, so the shared chrome is physically duplicated 70–81 times.**
The header is copy-pasted into 68+ pages; the footer into 81. It has *already* fragmented
into five-plus variants — that is empirical proof, not a prediction. And
`components/footer.html` is a decoy: it looks authoritative, is loaded by nothing, so editing
it changes nothing while appearing to be the correct fix. This is the specific mechanism
behind "a small prompt caused site-wide changes": any global text edit must touch 81 files or
it creates variant six.

**3. Four competing site trees with contradictory syllabi, two of them live on the homepage.**
`class-xi-hub/subjects/physics/` (10 chapters, "The Scope of Physics") and `physics-xi/`
(14 units, "Measurements") are both linked from the root page and share not one chapter
title. `chemistry-lessons/` is unreachable but still present with "Atomic Structure" numbered
as chapter 3 instead of 2. Any restructure that merges trees will silently collide. Three
files are named `css/style.css`; an instruction to "fix style.css" has three valid targets,
the largest loaded by 69 pages.

**4. Every HTML↔JS contract fails silently, and there is no safety net at all.**
445 `data-correct` attributes checked by exact string match; a `"True"` typo teaches the
student that the right answer is wrong, with no error anywhere. `nextElementSibling` binds
reveal buttons positionally, so reordering markup for readability breaks them invisibly.
`data-subject` typos silently render the wrong colour. Against this: no tests, no HTML
validation, no link checker, no linter, no CI, no build step. Every class of error above
reaches production looking perfectly normal.

**5. State duplicated across five documents that all disagree, plus 94% position-dependent links.**
Chemistry lesson count is 8 / 22 / 8 / 1 / **20 (actual)** across `index.html`,
`PROGRESS.md`, `PROJECT_CONTEXT.md`, `README.md` and reality. The chapter list exists in four
places, two of which still carry the discarded 8-chapter syllabus. Separately, 692 of 735
links hardcode their depth, 334 with the identical `../../../` — so moving any directory
breaks ~17 links per file with nothing to catch it. Already broken today and invisible: four
CSS variables used in the maths lessons that no stylesheet defines.

---

## OPEN QUESTIONS THAT COULD NOT BE ANSWERED FROM THE CODE

1. **Which Physics syllabus is correct** — the hub's 10 chapters or `physics-xi`'s 14 units?
   Both claim Sindh Textbook Board. The code cannot adjudicate; the actual textbook can.
2. **Is `physics-xi/` a deliberate design direction or an abandoned experiment?** It is newer
   than the hub's physics folder, better built (1 real unit vs 0), and uses a sidebar layout
   the hub does not have. Intent is unrecoverable from git.
3. **Is `chemistry-lessons/` safe to delete?** Nothing links to it and its syllabus is wrong,
   but only the owner knows whether anything in its 512-line Chapter 1 lesson is worth
   salvaging.
4. **Where is the site actually deployed?** No deploy config in-repo; two contradictory
   Vercel URLs in the docs; no way to tell from the code whether either is live, or whether
   Vercel is wired to this repo at all.
5. **Which progress document is authoritative** — `PROGRESS.md`, `PROJECT_CONTEXT.md`,
   `README.md`, or `chapters-and-progress.md`? All four are maintained by hand and none
   matches the filesystem.
6. **Is the 6-step lesson template still the intended standard?** `PROJECT_CONTEXT.md` says
   "Never Change This Order", but Chapter 3 deliberately departed from it to follow the
   textbook's own structure — and reads better for it. Which is the target for Maths?
7. **Is exposing quiz answers in View Source acceptable?** Unavoidable on a static host, but
   it affects whether a data layer would need a server.
8. **What is the intended Maths scope?** `1ComplexNumbers/*.md` are markdown source notes
   that were manually re-typed into HTML. Whether future Maths chapters start as markdown
   again materially changes what the content layer needs to accept.
9. **Are the KaTeX version split and hand-rolled `.eq`/`.frac` chemistry equations
   intentional?** Three different maths-rendering strategies coexist; whether Maths notes
   should standardise on KaTeX is a call the code cannot make.

### Answers given by the repo owner, 17 Aug 2026

- **Build step: NO.** Static HTML only, permanently. Recorded in `CLAUDE.md`.
- **`chemistry-lessons/` and `physics-xi/`:** keep on disk, frozen. Not deleted, not edited,
  not used as a pattern. *(Resolves questions 2 and 3.)*
- **Maths content source:** the owner hands over the printed chapter; the lesson pages and
  worked exercise solutions are authored from that. *(Resolves question 8.)*
- **The remaining open questions stay open** — 1, 4, 5, 6, 7 and 9.
