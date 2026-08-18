# Constitution — Class XI Hub

Rules that apply to every task in this repo. Read before acting.

## Principles

- The spec is the source of truth. Every non-trivial change has a spec in `specs/`. If the code and the spec disagree, the spec wins and the code gets fixed.
- Before editing anything, list the exact files you intend to touch and wait for approval. Then touch only those files.
- Reuse the pattern already in the repo. Do not introduce a second way of doing something that already has a way.
- If a task reveals the spec is wrong or silent, stop and fix the spec first. Do not improvise.

## Constraints

- This is a static site: plain HTML, CSS and vanilla JS. No build step, no Node, no npm, no bundler, no framework, no package.json. It must remain deployable by copying files.
- KaTeX from jsDelivr, pinned to 0.16.11, is the only permitted third-party library. Adding any other dependency requires my explicit approval.
- The live site is `class-xi-hub/` and the root `index.html`. Nothing else.
- FROZEN — never read as a pattern, never edit, never delete: `chemistry-lessons/`, `physics-xi/`, `1ComplexNumbers/`, `class-xi-hub/components/`, `class-xi-hub/js/search.js`.
- HIGH BLAST RADIUS — never edit without asking me first, and never as a side effect of another task: `class-xi-hub/css/style.css`, `css/subjects.css`, `css/lessons.css`, `js/main.js`, `js/lessons.js`. 69 pages depend on these.
- Never run a repo-wide find-and-replace. List every affected file and get approval first.
- Never use a CSS class or CSS variable that is not already defined in the loaded stylesheets. If a new one is genuinely needed, say so and stop.
- Do not create new documentation, progress, plan or summary files unless I ask. `PROGRESS.md` is the only progress tracker.
- Do not change navigation, headers, footers, styling or existing lessons while doing a content task.

## Definition of done

- Only the approved files changed. Report the full list at the end.
- Every CSS class and variable used on a changed page is defined somewhere loaded by that page.
- Every relative link and asset path on a changed page still resolves at that file's depth.
- Every MCQ card has exactly one `data-correct="true"`, lowercase, and every other option is `data-correct="false"`.
- No new console errors, no silently empty JS selectors.
