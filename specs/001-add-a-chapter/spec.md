# Spec: Adding a Chapter's Lessons to `class-xi-hub`

Status: approved, 18 Aug 2026.

Behaviour and rules only. File layout, JS technique and CSS structure belong in a plan.
Research backing this spec: `specs/000-codebase-research/research.md`.

---

## Goal

Adding a chapter is the one workflow that runs over and over — twice for Chemistry already,
and now repeatedly for Mathematics. Today it is an undocumented eight-step manual sequence in
which the mechanical steps get skipped, which is why the homepage claims 8 lessons when 20
exist. This spec fixes what a correct chapter delivery *is*, so that a build either satisfies
it visibly or fails visibly.

---

## User scenarios

**A student opening a lesson page.** They land from the chapter index and immediately see
which lesson this is and how many are in the chapter. They read top to bottom: an opening
that tells them why the topic matters, the teaching body, then practice. Multiple-choice
questions respond on the first click — the chosen option turns green or red, the correct one
is always highlighted green, and feedback text appears. Short questions stay hidden until
"Show Answer" is pressed, and the answer that appears is the answer to *that* question. Every
equation is legible as an equation, never as raw `$x^2$` or a stray backslash. The page is
styled, the theme toggle works, and every link in the breadcrumb and the prev/next bar goes
where it says. Nothing on the page is broken in a way the student has to work around.

**The owner handing over a chapter.** They hand over the printed chapter and say which
subject and chapter number it is. They then receive, *before any file is touched*, the exact
list of files that will be created and modified. After approval, the work happens and they
get back a report listing precisely those files and nothing else. They can confirm
correctness by opening one lesson page, clicking one MCQ and one reveal button, and reading
the diff — without hunting through the site to see what else moved. The count of lessons
shown to a student on the subject page matches what is actually on disk.

---

## Functional requirements

**FR-1 — Lesson page section structure.**
Every lesson page is a sequence of `<section class="lesson-section">` blocks, each opening
with an `<h2>`. No content sits outside a `lesson-section` between the lesson header and the
lesson nav. Four invariants hold:

1. The first body section is the motivating opening — why this matters.
2. The summary of key points is the last section.
3. Practice — MCQs and/or short questions — comes immediately before the summary.
4. Every block is a `lesson-section` opening with an `<h2>`.

**The order of sections between the opening and practice is free.** A lesson follows its own
textbook's section structure. No fixed template is imposed, and no minimum or maximum section
count applies.

*Supersession:* `PROJECT_CONTEXT.md` documents a fixed six-step lesson order under the
heading "Never Change This Order". **That rule is superseded for all new work by this
requirement.** Previously published lessons are not restructured to match.

*Fails visibly:* a page whose summary is in the middle, or whose practice comes after the
summary, reads wrong on first scroll.

**FR-2 — Authoring pattern source.**
New lesson and exercise pages follow the **Chemistry lesson pattern** — the markup vocabulary
and page shape used by the delivered Chemistry chapter pages. This applies to every subject,
Mathematics included.

`class-xi-hub/subjects/mathematics/unit-1/` is **legacy-not-exemplar**: it is never read as a
pattern and never copied from, in whole or in part. It uses sixteen CSS classes and four CSS
custom properties that no stylesheet defines, and renders degraded today.

*Fails visibly:* a new Mathematics page containing any class or variable that appears in
`mathematics/unit-1` but in no stylesheet.

**FR-3 — Lesson identity is stated twice and must agree.**
Each lesson page states its position in the breadcrumb (`Lesson X of N`) and in the meta badge
(`Chapter C · Lesson X of N`). Both must carry the same X and the same N, and N must equal
the number of lesson pages actually delivered for that chapter. Exercise pages are not counted
in N.
*Fails visibly:* breadcrumb says "Lesson 3 of 6" while the badge says "of 7".

**FR-4 — Lesson navigation is complete and correct.**
Every lesson page ends with a nav bar containing a previous control, a link to the chapter
index, and a next control. On the first lesson the previous control is present but
non-interactive; on the last lesson the next control points to the chapter's exercise page if
one exists, otherwise to the chapter index. Every href resolves to a file that exists.
*Fails visibly:* clicking Next on the last lesson 404s or dead-ends.

**FR-5 — Chapter index page contents.**
When a chapter is delivered its index page must show: the chapter number, the chapter title, a
chapter overview paragraph, and one row per delivered lesson in order — each row carrying its
number, its title, and a one-line description. The exercise, if delivered, is the final row.
The placeholder "coming soon" block must be gone. Every row links to a file that exists. Each
lesson row's title must match the `<h1>` of the page it links to.
*Fails visibly:* a chapter index still showing "Coming Soon" after lessons ship, or a row
whose title disagrees with the page it opens.

**FR-6 — Subject index badge reflects what is on disk.**
On the subject index, the chapter's row must carry a status badge drawn only from
`badge-soon`, `badge-progress`, `badge-done` — the three defined in the loaded stylesheets —
and the `coming-soon` modifier class must be removed from the row once any lesson exists. The
badge's stated count must equal the number of lesson pages actually in that chapter's
directory, and must say whether an exercise is included.
*Fails visibly:* the subject page says "6 lessons" for a chapter containing 7 files, or a
delivered chapter still renders dimmed as coming-soon.

**FR-7 — One place for the aggregate count.**
Site-wide and per-subject **totals** of completed lessons may be stated in `PROGRESS.md` and
nowhere else. A chapter delivery updates `PROGRESS.md`. Per-chapter counts (FR-6) are
permitted because they are locally verifiable against one directory; site-wide aggregates are
not.

No chapter delivery may **create** a new location that states an aggregate.

Existing locations that state aggregates and are now wrong — `class-xi-hub/index.html` stat
counters, `PROJECT_CONTEXT.md`, `class-xi-hub/README.md`, `chapters-and-progress.md`, root
`README.md` — are **out of scope for this workflow and are not to be edited by it**.

*Fails visibly:* a diff for a chapter delivery that touches the homepage counters, or a new
page that prints a site-wide total.

**FR-8 — Header and footer text on new pages.**
Every page created by this workflow must carry the site header and the site footer in a single
canonical form, byte-identical to the form already used by the Chemistry chapter pages.
**Exactly one** header variant and **one** footer variant may be introduced by this workflow.
It may not invent a new wording, and it may not edit the header or footer of any existing page.
*Fails visibly:* a grep of the newly created files returns more than one distinct footer
string, or the new footer differs from the Chemistry chapter footer.

**FR-9 — MCQ correctness contract.**
Every MCQ card contains exactly one option with `data-correct="true"` and every other option
with `data-correct="false"`, both values lowercase, both attributes present on every option.
Every card contains a feedback container. Options are buttons carrying the MCQ option class.
*Fails visibly:* clicking the right answer marks it wrong, or nothing turns green, or no
feedback text appears.

**FR-10 — Reveal-answer structural contract.**
In every short-question block the answer container must be the **immediately following element
sibling** of the reveal button, with nothing between them — no paragraph, no comment-rendered
node, no wrapper.
*Fails visibly:* pressing "Show Answer" reveals nothing, or reveals the wrong element.

**FR-11 — Worked exercise solutions.**
Where a chapter's exercise is delivered, every question from the source exercise appears, in
the source's own order and numbering, and each carries a complete worked solution — not a bare
final answer.

A worked solution must contain: the question as printed in the source; the given data or
starting point; the intermediate steps in order, each labelled; and the final answer stated
explicitly. Where the source's own answer differs from the worked result, both are shown and
the discrepancy is stated.

Worked solutions use the **Chemistry worked-example and step vocabulary** — the example,
example-head, example-tag, example-body and step-label classes already defined in the loaded
stylesheets. Multiple-choice questions in an exercise additionally satisfy FR-9; reveal-answer
questions additionally satisfy FR-10.

*Fails visibly:* an exercise page showing answers with no working, or using a worked-example
class that no stylesheet defines.

**FR-12 — Closed CSS vocabulary.**
Every CSS class and every CSS custom property used on a page created by this workflow must
already be defined in a stylesheet that page loads. New classes and new variables may not be
introduced. If the content genuinely cannot be expressed in the existing vocabulary, the work
stops and the gap is reported.
*Fails visibly:* a block renders unstyled — transparent background, square corners, default
font — exactly as `mathematics/unit-1` does today.

**FR-13 — Mathematical notation.**
Notation expressible with the existing defined equation classes is written with them. Notation
that genuinely requires KaTeX uses KaTeX from jsDelivr pinned to **0.16.11** and no other
version, loaded per page. There is no exception to the pinned version. No other third-party
library may be added.
*Fails visibly:* a formula renders as literal `$…$` or `\(…\)` text on the page, or a page
loads a KaTeX version other than 0.16.11.

**FR-14 — Subject theming attribute.**
Every page created by this workflow declares its subject with one of exactly four values:
`chemistry`, `mathematics`, `physics`, `english`. No abbreviation, no capitalisation variant.
*Fails visibly:* a Mathematics page renders in Chemistry green.

**FR-15 — Path integrity at depth.**
Every relative asset path and every relative link on a created page must resolve from that
page's own directory depth. A page is not delivered until each one has been resolved against
the filesystem.
*Fails visibly:* the page renders as unstyled raw HTML.

**FR-16 — Change containment.**
The workflow declares its intended file list before editing and then touches only those files.
It never edits the frozen directories, never edits the five high-blast-radius shared files,
never performs a repo-wide find-and-replace, and never changes navigation, headers, footers,
styling or existing lessons as a side effect. The final report lists every file changed.
*Fails visibly:* the diff contains a file that was not on the approved list.

---

## Edge cases and rules

Each is drawn from a specific finding in `specs/000-codebase-research/research.md`, not
invented.

**A chapter with no exercise.** Chemistry Ch 2 shipped without one; Ch 1 and Ch 3 shipped with
one. This is legitimate. When absent: no exercise row on the chapter index, the last lesson's
Next control points to the chapter index instead, and the subject badge omits "+ exercise".
The chapter is still a complete delivery. An exercise added later is a separate delivery that
re-triggers FR-4, FR-5, FR-6 and FR-11.

**A lesson with no MCQs.** Permitted. A lesson may carry short questions only, or no practice
section at all if the source material has none. FR-9 applies only to cards that exist. FR-1's
ordering invariants are unaffected — if practice is absent, the summary still ends the page.

**A chapter whose lesson count changes after publishing.** Adding or removing a lesson
invalidates N in **two places per existing lesson page** (FR-3) plus the chapter index rows,
the prev/next chain, and the subject badge. Changing the count is therefore never a
single-file edit: the affected pages must be enumerated and approved before any edit, exactly
as a new delivery is.

**Equations: KaTeX versus plain text.** The hub stylesheets contain **zero** KaTeX rules —
verified. All KaTeX presentation comes from the CDN stylesheet, and any layout tuning around
it in `mathematics/unit-1` was done with per-page inline styles referencing variables that no
longer exist. Rule: prefer the defined equation classes; reach for KaTeX only when the
notation genuinely needs it; never patch KaTeX layout with new classes or new variables
(FR-12).

**A lesson at a different directory depth.** 94% of links in this repo are position-dependent
and 334 of them use the identical `../../../` string. A page one level deeper or shallower
than its siblings needs a different prefix for every asset and every nav link. Rule: a chapter
delivery keeps all its pages at one consistent depth, matching the existing convention for
that subject; if any page must sit at a different depth, its paths are recomputed for that
depth and re-resolved individually, and a find-and-replace is never used to do it.

**The `data-correct` casing failure.** The check is a strict string comparison against
`'true'`. `"True"`, `"TRUE"`, `1`, or a missing attribute all silently count as wrong, and the
student who picks correctly is told they are wrong while the feedback claims the correct
answer is green — with nothing green. There are already 445 of these attributes in the repo
and no validation anywhere. Rule: lowercase only, on every option, and verified by counting
per card rather than by eye.

**The reveal-button positional coupling.** The answer is located by "the next element
sibling", not by class. Inserting a hint, a note, or a wrapper between button and answer
breaks the feature silently — the button still animates, nothing appears. Rule: nothing may
ever be placed between them. Re-ordering markup for readability inside a short-question block
is prohibited.

**Using a CSS class no stylesheet defines.** Sixteen classes and four variables are used in
`mathematics/unit-1` and defined nowhere; those pages render degraded today and nothing
reported it. This is why FR-2 makes that directory legacy-not-exemplar and why FR-12 closes
the vocabulary.

---

## Out of scope

This workflow does **not**:

- Create, edit, delete or read as a pattern anything in `chemistry-lessons/`, `physics-xi/`,
  `1ComplexNumbers/`, `class-xi-hub/components/`, or `class-xi-hub/js/search.js`.
- Read as a pattern or copy from `class-xi-hub/subjects/mathematics/unit-1/` (FR-2).
- Edit `css/style.css`, `css/subjects.css`, `css/lessons.css`, `js/main.js` or `js/lessons.js`.
- Add, remove or restyle any CSS class or CSS variable.
- Introduce a build step, a package manager, a bundler, a framework, or any third-party
  library other than KaTeX 0.16.11.
- Repair the five-plus existing footer variants, the header variants, or the stale aggregate
  counters on the homepage.
- Upgrade the three `mathematics/unit-1` lessons from KaTeX 0.16.9 to 0.16.11.
- Repair the undefined classes and variables in `mathematics/unit-1`.
- Reconcile `PROJECT_CONTEXT.md`, `class-xi-hub/README.md`, root `README.md` or
  `chapters-and-progress.md` with reality, or decide which is authoritative.
- Resolve the two competing Physics syllabi, or touch anything under `subjects/physics/`.
- Change navigation structure, page chrome, theming, or dark-mode behaviour.
- Alter, re-split or re-order any previously published lesson.
- Commit, push, or deploy.
- Create any documentation, plan, summary or progress file other than the `PROGRESS.md` update
  required by FR-7.

---

## Acceptance criteria

Runnable by opening the delivered pages and reading the diff.

**By opening one lesson page in a browser:**

- [ ] The page is styled — not raw HTML — and the theme toggle switches it.
- [ ] Breadcrumb and meta badge state the same "Lesson X of N", and N equals the number of
      lesson files delivered.
- [ ] The first body section is the motivating opening; the summary is last; practice sits
      immediately before the summary.
- [ ] Every section block opens with an `<h2>`.
- [ ] Click a **wrong** MCQ option: it turns red, the correct one turns green, feedback text
      appears.
- [ ] Click a **correct** MCQ option on a different card: it turns green, feedback confirms
      correct.
- [ ] Click every "Show Answer": the answer to *that* question appears.
- [ ] No formula displays as literal `$…$`, `\(…\)` or a stray backslash.
- [ ] Browser console is clean — no errors.
- [ ] Every breadcrumb link, both nav controls and the chapter-overview link all load a real
      page.

**By opening the chapter index and the subject index:**

- [ ] The chapter index shows no "Coming Soon" block, and one row per delivered lesson plus
      the exercise if delivered.
- [ ] Every row title matches the `<h1>` of the page it opens.
- [ ] The subject row is no longer dimmed, and its badge count equals the number of lesson
      files on disk.

**By opening the exercise page, if one was delivered:**

- [ ] Every question from the source exercise is present, in the source's order and numbering.
- [ ] Every solution shows working — given data, labelled intermediate steps, explicit final
      answer — not a bare answer.
- [ ] Any discrepancy with the source's printed answer is stated on the page.

**By reading the diff:**

- [ ] Every changed file was on the approved list; no file outside it appears.
- [ ] No frozen path and none of the five high-blast-radius files appear.
- [ ] No `.css` or `.js` file appears at all.
- [ ] Each new page's `data-correct` attributes: one `true` per card, all lowercase, every
      option carries the attribute.
- [ ] Every class and `var(--…)` used in the new pages appears in one of the three loaded
      stylesheets.
- [ ] No class or variable used in the new pages was copied from `mathematics/unit-1`.
- [ ] The new pages contain exactly one distinct footer string and one distinct header block,
      matching the Chemistry chapter pages.
- [ ] `PROGRESS.md` is the only file in the diff stating an aggregate count.
- [ ] `class-xi-hub/index.html` does **not** appear in the diff.
- [ ] Any KaTeX reference is pinned to 0.16.11; no other external URL was added.

---

## Recorded decisions and deferred work

**Decided 18 Aug 2026:**

- **Section order is free** (FR-1). A lesson follows its own textbook's structure. The fixed
  six-step order in `PROJECT_CONTEXT.md` — "Never Change This Order" — is **superseded for all
  new work**. Existing lessons are not restructured.
- **Mathematics follows the Chemistry lesson pattern** (FR-2, FR-11).
  `mathematics/unit-1` is legacy-not-exemplar.
- **KaTeX is pinned to 0.16.11 with no exception** (FR-13).

**Deferred, not abandoned — each needs its own spec and approved file list:**

- **Canonicalising the existing chrome.** Five-plus footer variants across 81 pages, the
  header variants across 70+, and the stale aggregate counters in `class-xi-hub/index.html`,
  `PROJECT_CONTEXT.md`, `class-xi-hub/README.md`, `chapters-and-progress.md` and root
  `README.md`. Out of scope here (FR-7, FR-8) because the constitution forbids changing
  footers, headers and navigation during a content task and forbids repo-wide
  find-and-replace.
- **KaTeX version split, recorded.** The three `mathematics/unit-1` lessons load KaTeX
  **0.16.9**; all new work loads **0.16.11**. Upgrading those three lessons is **authorised as
  its own separate approved change** and is explicitly not part of any chapter delivery. Until
  it happens, two KaTeX versions coexist in the Mathematics subject tree.
- **Undefined classes and variables in `mathematics/unit-1`.** Sixteen classes, four
  variables. Those pages render degraded today. Repair is separate work.
