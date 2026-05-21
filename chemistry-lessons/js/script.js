/* ============================================================
   script.js — JavaScript for Usama's Chemistry Notebook
   Two jobs:
     1. Dark mode toggle (remembers preference using localStorage)
     2. Interactive MCQs and "Show Answer" short questions
   ============================================================ */

/* ---- PART 1: DARK MODE ----------------------------------------

   How it works:
   - We add data-theme="dark" to <html> tag to switch to dark mode
   - CSS in style.css reads [data-theme="dark"] to change all colors
   - localStorage saves the user's preference so it persists between visits
*/

// Run as soon as the page loads (before any buttons are clicked)
document.addEventListener('DOMContentLoaded', function () {

  // --- 1a. Apply saved theme preference ---
  // Check if user previously chose dark mode
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // --- 1b. Find the dark mode button and set its initial label ---
  const btn = document.getElementById('dark-mode-btn');
  if (btn) {
    updateDarkModeBtn(btn);

    // Toggle dark mode when button is clicked
    btn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      updateDarkModeBtn(btn);
    });
  }

  // --- 1c. Also handle any toggles with class .dark-toggle (alternate buttons) ---
  document.querySelectorAll('.dark-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      // Update all toggle buttons on the page
      document.querySelectorAll('.dark-toggle').forEach(updateDarkModeBtn);
      if (btn) updateDarkModeBtn(btn);
    });
  });

  /* ---- PART 2: MCQs (Multiple Choice Questions) -----------------

     How it works:
     - Each option is a <button class="mcq-option"> with data-correct="true/false"
     - When clicked, we mark it correct or wrong
     - Disable all other options so they can't click again
     - Show a feedback message below the question
  */
  document.querySelectorAll('.mcq').forEach(function (mcq) {
    const options  = mcq.querySelectorAll('.mcq-option');
    const feedback = mcq.querySelector('.mcq-feedback');

    options.forEach(function (option) {
      option.addEventListener('click', function () {
        // Prevent double-clicking
        if (option.disabled) return;

        const isCorrect = option.getAttribute('data-correct') === 'true';

        // Disable all options so user can't change answer
        options.forEach(function (o) {
          o.disabled = true;
          // Highlight the correct answer regardless of what was chosen
          if (o.getAttribute('data-correct') === 'true') {
            o.classList.add('correct');
          }
        });

        // If wrong, also mark this option as wrong
        if (!isCorrect) {
          option.classList.add('wrong');
        }

        // Show feedback message
        if (feedback) {
          feedback.classList.add('show');
          if (isCorrect) {
            feedback.textContent = '✅ Correct! Well done.';
            feedback.classList.add('correct-msg');
          } else {
            feedback.textContent = '❌ Not quite. The correct answer is highlighted in green.';
            feedback.classList.add('wrong-msg');
          }
        }
      });
    });
  });

  /* ---- PART 3: SHORT QUESTIONS (Show/Hide Answer) ---------------

     How it works:
     - Each short question has a <button class="show-answer-btn">
     - The answer is in <div class="sq-answer"> (hidden by default via CSS)
     - Clicking the button toggles the answer visibility
  */
  document.querySelectorAll('.show-answer-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Find the answer box that follows this button
      const answerBox = btn.nextElementSibling;
      if (!answerBox) return;

      if (answerBox.classList.contains('visible')) {
        // Hide it
        answerBox.classList.remove('visible');
        btn.textContent = 'Show Answer';
      } else {
        // Show it
        answerBox.classList.add('visible');
        btn.textContent = 'Hide Answer';
      }
    });
  });

}); // end DOMContentLoaded

/* Helper: update the button's emoji and label based on current theme */
function updateDarkModeBtn(btn) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}
