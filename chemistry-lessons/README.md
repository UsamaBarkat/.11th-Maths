# My Class XI Chemistry — Sindh Board

A personal chemistry revision website built by Usama, with lessons taught by Claude.

**Live site:** [https://YOUR-USERNAME.github.io/chemistry-lessons](https://YOUR-USERNAME.github.io/chemistry-lessons)
*(replace YOUR-USERNAME after you set up GitHub Pages)*

---

## What This Is

A static website that acts as my permanent chemistry notebook. Every lesson I learn
gets saved here so I can revise anytime, anywhere — no internet required (just open
the HTML files).

## Folder Structure

```
chemistry-lessons/
├── index.html                 # Homepage — all 8 chapter cards
├── css/style.css              # All styling (dark mode, cards, tables, MCQs)
├── js/script.js               # Dark mode toggle + MCQ interactivity
├── chapters/
│   ├── chapter-1/
│   │   ├── index.html         # Chapter overview + lesson list
│   │   ├── lesson-1.html      # "What is Chemistry?"
│   │   └── lesson-2.html      # (added when ready)
│   ├── chapter-2/ to chapter-8/
│       └── index.html         # "Coming soon" placeholders
├── assets/                    # Future images and diagrams
└── README.md
```

## How to Open Locally

1. Download or clone this repository
2. Open `index.html` in any browser (Chrome, Firefox, Edge)
3. No server needed — everything is plain HTML/CSS/JS

## How to Add a New Lesson

After getting a new lesson from Claude, follow these steps:

### Step 1 — Create the lesson file
Copy `chapters/chapter-1/lesson-1.html` as a template.
Save it as `chapters/chapter-X/lesson-N.html` (replace X and N).

Update these parts in the new file:
- `<title>` tag — change lesson name
- Progress indicator at the top
- Lesson title (`<h1>`)
- All 6 sections: Hook, Core Concept, Examples, Confusions, Practice, Summary
- Navigation buttons at the bottom (prev/next links)

### Step 2 — Update the chapter index page
Open `chapters/chapter-X/index.html`.
Find the locked lesson item for the new lesson and:
- Change `<div class="lesson-item locked">` → `<a href="lesson-N.html" class="lesson-item">`
- Change `</div>` at the bottom → `</a>`
- Update the lesson title and description

### Step 3 — Update homepage if needed
If this is the first lesson in a new chapter, open `index.html` and:
- Change `coming-soon` class to `started` on that chapter's card
- Update the status text

---

## Lesson Page Structure (6 Steps)

Every lesson follows this exact format:

| Step | Section | Purpose |
|------|---------|---------|
| 1 | 🎯 Hook | Real-life example to grab attention |
| 2 | 📖 Core Concept | Textbook + easy definitions, tables, diagrams |
| 3 | 💡 Real-Life Examples | 5–6 everyday examples |
| 4 | ⚠️ Common Confusions | Warning boxes for common mistakes |
| 5 | ✏️ Practice | Interactive MCQs + short questions with hidden answers |
| 6 | 📝 Summary | 3-point summary box |

---

## Tech Stack

- **HTML5** — semantic tags only
- **CSS3** — plain CSS, no frameworks
- **Vanilla JavaScript** — dark mode + MCQ interactivity only
- **No build tools** — just open in browser

## Chapters (Sindh Board Class XI)

1. Introduction to Fundamental Concepts of Chemistry ✅
2. The Three States of Matter ⏳
3. Atomic Structure ⏳
4. Chemical Bonding ⏳
5. Energetics of Chemical Reactions ⏳
6. Chemical Equilibrium ⏳
7. Solutions and Electrolytes ⏳
8. Chemical Kinetics ⏳
