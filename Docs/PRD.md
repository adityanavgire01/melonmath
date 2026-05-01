# melon math — product requirements document

**version:** 1.0 (MVP)
**date:** 2026-05-01
**status:** draft

---

## 1. overview

melon math is a timed mental math training platform. the core experience mirrors monkeytype's focused, distraction-free loop: pick a mode, set a duration, solve as many problems as possible before the timer runs out, review your stats. the goal is to make math practice feel competitive and addictive rather than educational and slow.

the MVP ships two modes: **arithmetic** (add, subtract, multiply, divide) and **matrix multiplication**. no accounts, no backend, no persistence — pure client-side.

---

## 2. goals

| goal | description |
|---|---|
| fast loop | from landing to first problem in under 2 clicks |
| accurate metrics | cpm and accuracy calculated correctly and displayed live |
| clean ui | matches the design system — dark, monospaced, pill-shaped, lowercase |
| deployable | ships to vercel as a static react app |

## 3. non-goals (MVP)

- user accounts, login, or saved history
- global or friend leaderboards
- calculus or algebra modes
- mobile-first layout (desktop-first is fine; basic responsiveness is acceptable)
- backend of any kind

---

## 4. tech stack

| layer | choice | reason |
|---|---|---|
| framework | react + vite | lightweight, fast dev server, no SSR needed |
| language | typescript | catches bugs in state/type logic early |
| styling | tailwind css | utility-first, pairs well with design token values from DESIGN.md |
| font | jetbrains mono (google fonts) | required by design system |
| routing | react router v6 | simple client-side routing for mode pages |
| state | react context + useReducer | no external lib needed at MVP scale |
| hosting | vercel | zero-config deploy for vite/react |

---

## 5. user stories

### core loop

- as a user, i can select an operation type (add / sub / mul / div) and a timer duration (15 / 30 / 60s) before starting
- as a user, i see one problem at a time and type my answer; pressing enter submits it
- as a user, i see live stats (timer counting down, current cpm, running accuracy) while solving
- as a user, when the timer ends i see a results screen with final cpm, accuracy, total answered, and correct/incorrect counts
- as a user, i can press tab + enter (or a restart button) to immediately start a new session with the same settings

### matrix mode

- as a user, i can switch to matrix mode from the nav
- as a user, i see a matrix multiplication problem with input cells for each answer cell in the result matrix
- as a user, i tab between cells and press enter to submit the full matrix
- as a user, incorrect cells are highlighted; i stay on the problem until i get it right (or skip)

### ux / navigation

- as a user, i can switch between arithmetic and matrix via the top nav at any time (resets the session)
- as a user, i can see keyboard shortcuts hinted at the bottom of the screen
- as a user, all text on the platform is lowercase

---

## 6. feature specifications

### 6.1 arithmetic mode

**problem generation**
- numbers are generated with `Math.random()` scaled to a difficulty range per operation:
  - add: two numbers 1–99
  - subtract: two numbers 1–99, always `a ≥ b` (no negatives in MVP)
  - multiply: two numbers 2–12 (times-table range for speed)
  - divide: generate `a × b` first (2–12), present as `result ÷ a`, answer is `b` (always whole number)
- new problem generated immediately on correct submission

**input behavior**
- single text input, autofocused on start
- submits on `enter` key
- correct answer: brief green flash on the problem, instantly load next problem, clear input
- wrong answer: brief red flash, input clears, problem stays (attempt counted as incorrect)
- no autocomplete, no spell-check (`autoComplete="off"`, `autoCorrect="off"`)

**timer**
- user selects 15 / 30 / 60 seconds before starting (default: 30)
- timer starts on first keystroke (not on page load)
- countdown displayed live as `NNs` (e.g. `24s`)
- when timer hits 0, input is disabled and results overlay appears

**live stats bar** (shown during session)
- `timer` — countdown in seconds
- `cpm` — correct answers per minute, calculated as `(correct / elapsed_seconds) × 60`, updated on every submission; shows `—` until first correct answer
- `acc` — accuracy as `(correct / total_attempts) × 100`, rounded to nearest integer

**results screen**
- displayed as an overlay or dedicated section after timer ends
- shows: final cpm, accuracy %, problems answered, correct, incorrect
- "restart" button (or tab + enter shortcut) resets session with same settings

### 6.2 matrix mode

**problem generation**
- 2×2 matrices only in MVP
- matrix a: values randomly 1–9 via `Math.random()`
- matrix b: values randomly 1–9
- result matrix computed client-side; all values guaranteed to fit in 3 digits

**input behavior**
- result matrix rendered as a 2×2 grid of input cells
- tab / shift+tab to move between cells
- enter submits the full matrix
- on submit: each cell checked individually
  - all correct: brief green flash, load next problem, cpm increments by 1
  - any incorrect: highlight wrong cells in red, correct cells in green; user can fix and resubmit
- a "skip" option (via a keybind, e.g. `ctrl+enter`) skips the current problem without scoring

**timer and stats**
- same 15 / 30 / 60 selection as arithmetic
- cpm = full matrix submissions (not individual cells) per minute
- timer starts on first cell keystroke

### 6.3 navigation

- top bar: `melon math` logo (left) + mode links: `arithmetic` | `calculus` (disabled, grayed out) | `algebra` (disabled) | `matrix` (right)
- active mode is highlighted with the pill chip style from design system
- right side icons: keyboard shortcuts modal, settings (stub for MVP), info modal
- switching modes resets any active session without confirmation

### 6.4 keyboard shortcuts

| key | action |
|---|---|
| `enter` | submit answer (arithmetic) / submit matrix |
| `tab` | move to next matrix cell |
| `tab + enter` | restart session |
| `ctrl + enter` | skip problem (matrix only) |
| `esc` | close any open modal |

---

## 7. metrics definition

### cpm (correct calculations per minute)

```
cpm = (correct_answers / elapsed_seconds) × 60
```

- **arithmetic:** each correctly answered problem = 1 correct answer
- **matrix:** each fully correct matrix submission = 1 correct answer
- displayed live, rounded to nearest integer
- on results screen: shown as the final value at session end

### accuracy (acc)

```
acc = (correct_submissions / total_submission_attempts) × 100
```

- each `enter` press (or matrix submit) counts as one attempt
- wrong answer on same problem counts as a new attempt each time
- displayed as `NN%`, always integer

---

## 8. screens & components

```
app
├── layout
│   ├── navbar              (logo, mode links, icon buttons)
│   └── footer              (github, discord, support, terms — static links)
├── pages
│   ├── arithmetic-page     (mode selector, stats bar, problem display, input)
│   └── matrix-page         (mode selector, stats bar, matrix display, cell inputs)
└── components
    ├── mode-selector        (add/sub/mul/div pills + timer duration pills)
    ├── stats-bar            (timer, cpm, acc — live)
    ├── arithmetic-problem   (large number display + operator + input)
    ├── matrix-problem       (two matrices + operator + result input grid)
    ├── results-overlay      (final stats + restart prompt)
    ├── keyboard-hint        (bottom hint text, e.g. "tab + enter to restart")
    └── modal                (generic modal shell for shortcuts / info)
```

---

## 9. design system application

all values sourced from `DESIGN.md`. key mappings:

| token | value | used for |
|---|---|---|
| `background` | `#111509` | page background |
| `primary` | `#c2ff43` | active state, correct flash, cta buttons |
| `on-surface` | `#e1e4d1` | main body text |
| `on-surface-variant` | `#c3caae` | inactive labels, hints |
| `surface-container` | `#1d2115` | card / mode-selector background |
| `outline-variant` | `#434935` | dividers, inactive borders |
| `error` | `#ffb4ab` | wrong answer flash, incorrect cell highlight |
| font | jetbrains mono | all text |
| border-radius buttons | `9999px` (pill) | all buttons and mode chips |
| border-radius inputs | `1.5rem` (rounded-xl) | answer input field |
| border-radius cards | `1rem` (rounded-lg) | mode selector container |

**text casing:** all ui text is lowercase — labels, nav items, buttons, hints, results. no exceptions.

**problem text size:** math problems (numbers + operator) render at ~20% larger than surrounding body text, per design spec.

---

## 10. project structure

```
melonmath/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── ModeSelector.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── ResultsOverlay.tsx
│   │   │   ├── KeyboardHint.tsx
│   │   │   └── Modal.tsx
│   │   └── problem/
│   │       ├── ArithmeticProblem.tsx
│   │       └── MatrixProblem.tsx
│   ├── pages/
│   │   ├── ArithmeticPage.tsx
│   │   └── MatrixPage.tsx
│   ├── hooks/
│   │   ├── useTimer.ts
│   │   ├── useArithmetic.ts
│   │   └── useMatrix.ts
│   ├── utils/
│   │   ├── generateArithmetic.ts
│   │   └── generateMatrix.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── DESIGN.md
├── Docs/
│   └── PRD.md
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## 11. out of scope (future)

| feature | notes |
|---|---|
| user accounts | login, history, personal bests |
| leaderboards | global / friends |
| calculus mode | derivatives, integrals |
| algebra mode | solve for x, simplify expressions |
| mobile layout | swipe-optimized input |
| difficulty settings | easy / medium / hard number ranges |
| streak / xp system | gamification layer |

---

## 12. decisions log

| # | question | decision |
|---|---|---|
| 1 | should skipping a problem in matrix mode count as an incorrect attempt? | **no** — skip is neutral, not scored |
| 2 | should cpm in matrix count each cell individually rather than per-matrix? | **per matrix submission** — one full correct matrix = 1 cpm tick |
| 3 | footer links (github, discord, support, terms) — real or placeholder? | **placeholder for now** — include `href="#"` stubs, wire up later |
