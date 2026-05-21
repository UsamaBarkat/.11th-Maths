# Project Context — Class XI Learning Hub

**Last Updated:** 2026-05-21
**Version:** 1.0 (Initial Build)

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

### Chemistry (8 Chapters)
| # | Chapter | Status |
|---|---------|--------|
| 1 | Introduction to Fundamental Concepts of Chemistry | 🟡 In Progress (Lesson 1 done) |
| 2 | The Three States of Matter | ⏳ Not Started |
| 3 | Atomic Structure | ⏳ Not Started |
| 4 | Chemical Bonding | ⏳ Not Started |
| 5 | Energetics of Chemical Reactions | ⏳ Not Started |
| 6 | Chemical Equilibrium | ⏳ Not Started |
| 7 | Solutions and Electrolytes | ⏳ Not Started |
| 8 | Chemical Kinetics | ⏳ Not Started |

Chapter 1 expected lessons (7 total):
1. What is Chemistry? ✅
2. Physical and Chemical Properties of Matter ⏳
3. Elements, Compounds, and Mixtures ⏳
4. Atomic Mass, Molecular Mass, and Mole Concept ⏳
5. Chemical Formula and Chemical Equations ⏳
6. Stoichiometry ⏳
7. Limiting Reagent and Percentage Yield ⏳

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

## Design Decisions (Already Made — Don't Change Without Reason)

### Color Scheme
Light mode: BG `#ffffff`, text `#1a1a1a`, muted `#666666`, border `#e5e5e5`
Dark mode: BG `#0f0f0f`, cards `#1a1a1a`, text `#e5e5e5`, border `#2a2a2a`

Subject accent colors (set via `data-subject="X"` on `<html>` tag):
- Chemistry: `#2d8659` (green)
- Mathematics: `#1e40af` (blue)
- Physics: `#7c3aed` (purple)
- English: `#ea580c` (orange)

### Layout
- Max content width: 800px for lesson pages, 1200px for homepage/subject pages
- Font: system stack — `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`
- Line height: 1.7 for body, 1.3 for headings
- Mobile-first design

### Lesson Structure (6 Steps — Never Change This Order)
1. 🎯 Hook — Real-life engaging intro
2. 📖 Core Concept — Textbook def + easy version, tables, ASCII diagrams
3. 💡 Examples — Numbered list with real-life examples
4. ⚠️ Confusions — Warning boxes for common mistakes
5. ✏️ Practice — Interactive MCQs + short questions with hidden answers
6. 📝 Summary — 3-point bullet summary box

### Special Elements
- Blue left-border box = textbook definition
- Green left-border box = easy explanation
- Orange left-border box = confusion/warning
- Green background box = summary
- `data-correct="true/false"` on MCQ option buttons (used by lessons.js)
- `show-answer-btn` + `sq-answer` pattern for short questions

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

## Current Stats (as of 2026-05-21)

- Total lessons completed: **4**
- Chemistry: 1 lesson done
- Mathematics: 3 lessons done (Unit 1 complete)
- Physics: 0 lessons done
- English: 0 lessons done
