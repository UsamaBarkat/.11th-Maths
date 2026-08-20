# SVG Diagram Conventions

Status: binding, from 20 Aug 2026.

Applies to **every inline SVG diagram in this repo**, not only Mathematics Unit 3.
Companion to `specs/001-add-a-chapter/spec.md`; enforces FR-12 (closed CSS vocabulary)
for diagrams specifically.

---

## Decisions recorded 20 Aug 2026

**1. Second colour — approved.**
`style="color: var(--accent)"` is permitted on an `<svg>` root or a `<g>`, **that single
declaration only**. It introduces no class and no variable, and `--accent` is already defined
and subject-scoped. Use it for the **resultant / answer vector**, so it reads distinctly from
its components. **Nowhere else.**

**2. Right-hand rule — approved substitution.**
Fig 3.22(b), Fig 3.33 and Fig 3.34 use the **curl-arrow substitution**: a circular curl-arrow
around the axis plus a straight arrow for the thumb direction, with the caption spelling out
the rule in words. **No human hand is drawn.** The substitution must be **stated in the figure
caption region**, so the page is honest about departing from the printed book.

**3. `PROGRESS.md` is in scope for a chapter delivery.**
Confirmed against FR-7. A Unit 3 lesson delivery is **11 files**, not 10. The spec is the
source of truth.

**4. Chrome on modified index pages — preserved, not canonicalised.**
A chapter index is an **existing page being modified**, not a page being created. Touch only
the lesson-list region. **Preserve its header and footer byte-for-byte, off-pattern or not.**
Do not canonicalise them here — that belongs to the deferred chrome spec.
**FR-8 binds pages you create; it does not license editing chrome on pages you modify.**

---

## The binding technical constraint

**`var()` does not work in SVG presentation attributes.** `fill="var(--accent)"` silently
fails to paint in Chrome, Firefox and Safari — presentation attributes are not full CSS value
slots. The only two theme-aware mechanisms available without new CSS are:

1. **`currentColor`** — valid in presentation attributes everywhere, and inherits the CSS
   `color` of the nearest ancestor.
2. A `style="color: …"` **attribute** (distinct from a `<style>` block), permitted only as
   described in Decision 1.

`.diagram` sets no `color`, so text inside it inherits `body` -> `var(--text)`. Therefore
`currentColor` inside `.diagram` resolves to `var(--text)`, which already flips correctly
between themes. This gives one guaranteed theme-safe ink colour with zero styling.

**The house style is monochrome-by-default**, differentiating by *shape* rather than hue —
which is how technical maths figures are normally drawn anyway. The accent colour of
Decision 1 is the single permitted exception.

---

## Variables used — exact list

| Mechanism | Resolves to | Where |
|---|---|---|
| `currentColor` | `var(--text)` | every stroke, every arrowhead, every `<text>` |
| `currentColor` + `fill-opacity="0.08"` | tint of `var(--text)` | shaded planes, parallelogram / parallelepiped faces |
| `style="color: var(--accent)"` | `var(--accent)` | resultant / answer vector only (Decision 1) |
| `var(--surface-2)` | — | already the `.diagram` background; paint **no** opaque fills so it shows through |
| `var(--text-muted)` | — | already applied by the existing `.diagram .cap` rule to captions |

No other variable is touched. **No new class, no new variable, no `<style>` block.**

---

## The conventions

| Aspect | Rule |
|---|---|
| **viewBox** | `0 0 640 360` (16:9) for standard figures; `0 0 640 460` for tall 3-D constructions; `0 0 320 360` for narrow single-vector figures placed side by side. Only these three. |
| **Sizing** | `viewBox` plus matching `width` / `height` attributes, no CSS. Diagrams therefore **scroll** on narrow screens via `.diagram`'s existing `overflow-x:auto` — identical to how the Chemistry ASCII diagrams already behave. |
| **Container** | `<div class="diagram"><svg …></svg><div class="cap">Fig 3.1 — caption</div></div>`. Both classes already exist. |
| **Stroke widths** | Vectors / primary `2`; construction and axes `1.5`; dashed projection / helper lines `1` with `stroke-dasharray="4 4"`; hidden edges of 3-D solids `1` with `stroke-dasharray="5 4"`. |
| **Line caps** | `stroke-linecap="round"`, `stroke-linejoin="round"` on all paths. |
| **Arrowheads** | One `<marker>` per page, `markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"`, containing `<path d="M0,0 L9,3.5 L0,7 z" fill="currentColor"/>`. **IDs namespaced per figure** — `id="ar-l3f22a"` — because duplicate marker IDs on one page silently resolve to the first definition. |
| **Text** | `font-size="14"` for labels, `"12"` for axis ticks and small annotations. `font-family` **omitted** so it inherits `var(--font)` from body. `fill="currentColor"`. |
| **Label placement** | Vector labels offset 10 units perpendicular to the arrow at its midpoint. Point labels (A, B, O, P) offset 12 units radially outward from the point. Never overlapping a stroke. |
| **Points** | `<circle r="3" fill="currentColor">` for a marked point; `r="3.5" fill="none" stroke-width="1.5"` for an open / construction point. |
| **Axes** | Drawn as arrowed lines from origin, `stroke-width="1.5"`, labelled `x`, `y`, `z` at the arrow tip with `font-size="12"`. Origin marked `O`. Negative directions (`x'`, `y'`, `z'`) dashed at `1`. |
| **Angles** | Arc of radius 26 from the vertex, `stroke-width="1.5"`, `fill="none"`, with the symbol (θ, α, β, γ) placed at radius 38 on the arc bisector. **Right angles** use the square-corner convention: a 10×10 open square, never an arc. |
| **Shaded regions** | `fill="currentColor" fill-opacity="0.08"` plus a `1.5` stroke. **Never an opaque fill** — that is what keeps them legible in dark mode. |

---

## Diagram types that cannot be drawn under these constraints

**Three: Fig 3.22(b), Fig 3.33, Fig 3.34.** All three are the right-hand rule, and all three
depend on a **drawn human hand** with curled fingers and an extended thumb. A recognisable
hand is not achievable at acceptable quality in hand-authored SVG paths, and importing artwork
would add an asset the constitution does not permit.

**Resolved by Decision 2** — the curl-arrow substitution, which is fully drawable under this
style and must be disclosed in the caption region.

Any future diagram that cannot be expressed under these conventions is reported and the work
stops, per FR-12. It is never solved by adding a class, a variable, or a `<style>` block.
