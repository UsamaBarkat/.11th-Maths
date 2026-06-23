/* ============================================================
   lessons.js — Loaded on lesson pages only
   Handles:
     1. Interactive MCQs (click to check answer, color feedback)
     2. Show / Hide answer for short questions
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── PART 0: READING PROGRESS BAR ─────────────────────────────
     Thin bar at the very top that fills as you scroll the lesson.
     Created in JS so no markup is needed on each lesson page.
  */
  (function () {
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.appendChild(bar);
    function update() {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const pct = scrollable > 0 ? (h.scrollTop || document.body.scrollTop) / scrollable * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* ── PART 1: MCQs ─────────────────────────────────────────────
     HTML structure expected:
       <div class="mcq-card">
         <p class="q-text">Q1. ...</p>
         <ul class="mcq-options">
           <li><button class="mcq-opt" data-correct="false">(a) ...</button></li>
           <li><button class="mcq-opt" data-correct="true">(b) ...</button></li>
           ...
         </ul>
         <div class="mcq-feedback"></div>
       </div>
  */

  document.querySelectorAll('.mcq-card').forEach(function (card) {
    const opts     = card.querySelectorAll('.mcq-opt');
    const feedback = card.querySelector('.mcq-feedback');

    opts.forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (opt.disabled) return; // already answered

        const isCorrect = opt.getAttribute('data-correct') === 'true';

        // Disable all options — can't change answer
        opts.forEach(function (o) {
          o.disabled = true;
          // Always reveal which answer was correct
          if (o.getAttribute('data-correct') === 'true') {
            o.classList.add('correct');
          }
        });

        // Mark chosen option wrong (if it was)
        if (!isCorrect) {
          opt.classList.remove('correct');
          opt.classList.add('wrong');
        }

        // Show feedback message
        if (feedback) {
          feedback.classList.add('show');
          if (isCorrect) {
            feedback.textContent = '✅ Correct! Well done.';
            feedback.classList.add('correct');
            feedback.classList.remove('wrong');
          } else {
            feedback.textContent = '❌ Not quite — the correct answer is highlighted in green.';
            feedback.classList.add('wrong');
            feedback.classList.remove('correct');
          }
        }
      });
    });
  });

  /* ── PART 2: SHOW/HIDE ANSWERS ───────────────────────────────
     HTML structure expected:
       <div class="short-q-card">
         <p class="q-text">Q4. ...</p>
         <button class="reveal-btn">Show Answer</button>
         <div class="answer-box">Answer text here.</div>
       </div>
  */

  document.querySelectorAll('.reveal-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      // The answer box is always the next sibling element after the button
      const answerBox = btn.nextElementSibling;
      if (!answerBox) return;

      if (answerBox.classList.contains('visible')) {
        answerBox.classList.remove('visible');
        btn.textContent = 'Show Answer';
      } else {
        answerBox.classList.add('visible');
        btn.textContent = 'Hide Answer';
      }
    });
  });

}); // end DOMContentLoaded
