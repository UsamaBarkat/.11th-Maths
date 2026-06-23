# Project Context — Class XI Learning Hub

**Last Updated:** 2026-06-23
**Version:** 2.0 (Visual redesign + Chemistry Ch.1 Stoichiometry rebuilt from the real textbook)

---

## What This Project Is

A personal multi-subject learning hub for Usama, a Class XI (HSSC Part-I) student at Sindh Textbook Board, Pakistan. Usama learns each subject lesson-by-lesson from Claude (claude.ai chat) and saves every lesson on this website so he can revise for Sindh Board exams anytime, anywhere.

**Deployment:** Vercel (auto-deploys on every push to main branch)
**Live URL:** `https://learnwithusama.vercel.app`
**Note:** Root `index.html` at repo root auto-redirects to `class-xi-hub/index.html`

---

## About Usama

- Class XI, Sindh Textbook Board, Pakistan
- Zero coding experience — complete beginner
- Learns by trying, prefers plain English explanations
- Needs step-by-step guidance when code is involved
- 4 subjects: Chemistry, Mathematics, Physics, English

---

## Tech Stack

- **HTML5** — semantic tags (article, section, header, nav, main)
- **CSS3** — plain CSS, no frameworks, 3 files (style.css, subjects.css, lessons.css)
- **Vanilla JS** — only for dark mode, MCQs, show/hide answers
- **No build tools** — just open HTML files in browser, or serve via GitHub Pages

---

## Folder Structure

```
class-xi-hub/
├── index.html                          ← Homepage (4 subject cards)
├── PROJECT_CONTEXT.md                  ← THIS FILE (always read first)
├── CLAUDE.md                           ← Claude Code memory
├── PROGRESS.md                         ← Lesson completion tracker
├── README.md                           ← Public project info
├── .gitignore
│
├── css/
│   ├── style.css                       ← Base styles, variables, dark mode, header, footer
│   ├── subjects.css                    ← Subject color themes + card/list layouts
│   └── lessons.css                     ← Lesson page elements (boxes, MCQs, etc.)
│
├── js/
│   ├── main.js                         ← Dark mode toggle
│   ├── lessons.js                      ← MCQ interactivity + show/hide answers
│   └── search.js                       ← Search (future feature, placeholder now)
│
├── components/
│   ├── header.html                     ← Header snippet (reference only, not auto-included)
│   ├── footer.html                     ← Footer snippet (reference only)
│   └── lesson-template.html            ← Copy this to create new lessons
│
├── subjects/
│   ├── chemistry/
│   │   ├── index.html                  ← Chemistry overview + 8 chapters
│   │   ├── chapter-1/
│   │   │   ├── index.html              ← Chapter 1 lesson list
│   │   │   └── lesson-1.html          ← ✅ "What is Chemistry?" (DONE)
│   │   └── chapter-2 to 8/
│   │       └── index.html             ← Coming soon placeholders
│   │
│   ├── mathematics/
│   │   ├── index.html                  ← Math overview + 12 units
│   │   └── unit-1 to 12/
│   │       └── index.html             ← Coming soon placeholders
│   │
│   ├── physics/
│   │   ├── index.html                  ← Physics overview + 10 chapters
│   │   └── chapter-1 to 10/
│   │       └── index.html             ← Coming soon placeholders
│   │
│   └── english/
│       ├── index.html                  ← English overview + 4 sections
│       ├── prose/index.html
│       ├── poetry/index.html
│       ├── grammar/index.html
│       └── composition/index.html
│
└── assets/
    ├── icons/                          ← SVG icons (future)
    └── images/                         ← Diagrams (future)
```

---

## Full Syllabus

### Chemistry (12 Chapters — real Sindh Textbook Board book)
| # | Chapter | Status |
|---|---------|--------|
| 1 | Stoichiometry | ✅ Done (7 lessons + solved exercise) |
| 2 | Atomic Structure | ⏳ Not Started |
| 3 | Theories of Covalent Bond and Shapes of Molecules | ⏳ Not Started |
| 4 | States of Matter: Gases | ⏳ Not Started |
| 5 | States of Matter: Liquids | ⏳ Not Started |
| 6 | States of Matter: Solids | ⏳ Not Started |
| 7 | Chemical Equilibrium | ⏳ Not Started |
| 8 | Acids, Bases and Salts | ⏳ Not Started |
| 9 | Chemical Kinetics | ⏳ Not Started |
| 10 | Solution and Colloids | ⏳ Not Started |
| 11 | Thermochemistry | ⏳ Not Started |
| 12 | Electrochemistry | ⏳ Not Started |

> **Note:** The earlier 8-chapter list ("Introduction to Fundamental Concepts" etc.)
> did not match the real textbook and was replaced on 2026-06-23 using the actual
> `chapter1.pdf` scan. Chapter titles above come straight from the book's contents page.

Chapter 1 (Stoichiometry) lessons — all done:
1. The Mole & Avogadro's Number ✅
2. Mole Conversions (mole ↔ mass / particles / volume) ✅
3. Stoichiometric Calculations (mass–mass, mass–volume, volume–volume) ✅
4. Rounding off Data ✅
5. Exponential (Scientific) Notation ✅
6. Limiting Reactant ✅
7. Theoretical, Practical & Percent Yield ✅
+ `exercise.html` — fully solved chapter exercise ✅

### Mathematics (12 Units)
| # | Unit | Status |
|---|------|--------|
| 1 | Complex Numbers | ✅ Done — 3 lessons |
| 2 | Matrices and Determinants | ⏳ Not Started |
| 3 | Vectors | ⏳ Not Started |
| 4 | Sequences and Series | ⏳ Not Started |
| 5 | Miscellaneous Series | ⏳ Not Started |
| 6 | Permutation, Combination and Probability | ⏳ Not Started |
| 7 | Mathematical Induction and Binomial Theorem | ⏳ Not Started |
| 8 | Functions and Graphs | ⏳ Not Started |
| 9 | Linear Programming | ⏳ Not Started |
| 10 | Trigonometric Identities of Sum and Difference of Angles | ⏳ Not Started |
| 11 | Application of Trigonometry | ⏳ Not Started |
| 12 | Graphs of Trigonometric and Inverse Trigonometric Functions | ⏳ Not Started |

### Physics (10 Chapters)
| # | Chapter | Status |
|---|---------|--------|
| 1 | The Scope of Physics | ⏳ Not Started |
| 2 | Scalars and Vectors | ⏳ Not Started |
| 3 | Motion | ⏳ Not Started |
| 4 | Motion in Two Dimensions | ⏳ Not Started |
| 5 | Torque, Angular Momentum and Equilibrium | ⏳ Not Started |
| 6 | Gravitation | ⏳ Not Started |
| 7 | Work, Power and Energy | ⏳ Not Started |
| 8 | Wave Motion and Sound | ⏳ Not Started |
| 9 | Nature of Light | ⏳ Not Started |
| 10 | Geometrical Optics | ⏳ Not Started |

### English (4 Sections)
| Section | Status |
|---------|--------|
| Prose (Book One — Stories and Essays) | ⏳ Not Started |
| Poetry (Book Two) | ⏳ Not Started |
| Grammar (Tenses, Parts of Speech, etc.) | ⏳ Not Started |
| Composition (Letters, Essays, Translation) | ⏳ Not Started |

---

## Design Decisions (Redesigned 2026-06-23 — Don't Change Without Reason)

> The whole site was visually redesigned on 2026-06-23 (softer surfaces, layered
> shadows, gradient heroes, pill buttons/badges, sticky reading-progress bar, and new
> math/chemistry components). All design lives in the 3 CSS files via **CSS variables**
> in `style.css` (`:root` + `[data-theme="dark"]`). Class names were kept stable so every
> existing page (Math, Physics, English) picked up the new look automatically.

### Color Scheme (design tokens in `style.css`)
Light: `--bg #f7f8fa`, `--surface #ffffff`, `--text #16181d`, `--text-muted #5b6472`, `--border #e6e9ee`
Dark (DEFAULT): `--bg #0b0d11`, `--surface #14171d`, `--text #e8eaf0`, `--border #262b34`

Subject accents (set via `data-subject="X"` on `<html>`; defined in `subjects.css`):
- Chemistry: green · Mathematics: blue · Physics: purple · English: orange
- Each has a dark-mode variant (brighter). Tokens used: `--accent`, `--accent-soft`, `--accent-strong`.

### Layout
- Max width: `--max-content` 820px (lessons), `--max-wide` 1180px (home/subject)
- Font stack starts with Inter (falls back to system); mono for formulas
- Radius/shadow scale + `--ease` are tokens; respects `prefers-reduced-motion`

### Lesson Structure (6 Steps — Never Change This Order)
1. 🎯 Hook — Real-life engaging intro (`.hook-text`)
2. 📖 Core Concept — Textbook def + easy version, tables, diagrams
3. 💡 Examples — real-life list OR worked-example cards
4. ⚠️ Confusions — Warning boxes for common mistakes
5. ✏️ Practice — Interactive MCQs + short questions with hidden answers
6. 📝 Summary — 3-point summary box

### Special Elements (CSS classes)
- `.def-box` (blue) = textbook definition · `.def-box.easy` (green) = easy version
- `.confusion-box` (amber) = common confusion/warning · `.summary-box` = summary
- `.callout` + `.note` / `.tip` / `.know` = coloured info callouts (icon + body)
- **Math/chemistry (added 2026-06-23):**
  - `.eq` = centred display equation (`.eq.lead` for an accent border)
  - `.frac` with `.num` / `.den` = stacked fraction
  - `.fx` = inline highlighted formula/symbol; use `<sub>`/`<sup>` for chem
  - `.rxn` with `<span class="arrow">→</span>` = chemical reaction (arrow can hold `<small>heat</small>`)
  - `.example` → `.example-head` (`.example-tag`) + `.example-body` (`.step-label`, `.ans`/`.ans-label`) = worked-example card
  - `ol.steps` = numbered step list with badges · `.chip` = key-term pill
- `data-correct="true/false"` on `.mcq-opt` buttons (handled by `lessons.js`)
- `.reveal-btn` + next-sibling `.answer-box` = show/hide answer (handled by `lessons.js`)
- `lessons.js` also injects the sticky `.reading-progress` bar on every lesson page

---

## How to Add a New Lesson

When Usama provides lesson content:

1. **Read** this file + `PROGRESS.md` to find out what number the new lesson should be
2. **Copy** `components/lesson-template.html`
3. **Save** to correct path: `subjects/SUBJECT/chapter-N/lesson-N.html`
4. **Fill in** all 6 sections with Usama's lesson content
5. **Update** the chapter's `index.html`:
   - Find the locked `<div class="lesson-item locked">` for that lesson
   - Change `div` to `a` tag with correct `href`
   - Remove `locked` class
6. **Update** subject's `index.html` — increment lesson count in chapter row
7. **Update** homepage `index.html` — update "X lessons completed" on subject card
8. **Update** `PROGRESS.md` — mark lesson done with today's date
9. **Tell Usama** a one-line summary of what was done

---

## Current Stats (as of 2026-06-23)

- Total lessons completed: **11**
- Chemistry: 8 done — Chapter 1 (Stoichiometry) complete: 7 lessons + solved exercise
- Mathematics: 3 lessons done (Unit 1 complete)
- Physics: 0 lessons done
- English: 0 lessons done
