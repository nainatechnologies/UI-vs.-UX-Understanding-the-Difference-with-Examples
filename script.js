/* ==========================================================================
   Design & Tech Insights — Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById('reading-progress-bar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    }

    // Back to top button visibility
    const backToTop = document.getElementById('back-to-top-btn');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // ScrollSpy for Table of Contents
    highlightToc();
  });

  // 2. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isExpanded = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close drawer when link clicked
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 4. Functional Interactive Quiz with Live Scoring & Dynamic Feedback
  const quizData = {
    "1": {
      correctAnswer: "UI Design",
      correctText: "Selecting accessible color palettes, font scales, and WCAG contrast ratios falls directly under visual presentation and interface styling.",
      wrongText: "While accessibility benefits user experience, choosing color palettes, font hierarchies, and contrast ratios is a UI design responsibility."
    },
    "2": {
      correctAnswer: "UX Design",
      correctText: "Analyzing user friction, tracking funnel drop-offs, and optimizing task completion flows are core UX research responsibilities.",
      wrongText: "UI handles the visual layout, but diagnosing why users abandon an onboarding funnel during verification is behavioral UX research."
    },
    "3": {
      correctAnswer: "UI Design",
      correctText: "Crafting spring-physics transitions, interactive micro-animations, and visual feedback states belongs to UI motion craftsmanship.",
      wrongText: "While fluid interactions improve experience, crafting the actual spring-physics easing curves and micro-interaction styling is UI craftsmanship."
    },
    "4": {
      correctAnswer: "UX Design",
      correctText: "Card sorting, mental model mapping, and organizing information architecture (IA) are fundamental UX strategy.",
      wrongText: "UI styles the menu visuals and icons, but structuring categories based on user mental models and card sorting is UX information architecture."
    }
  };

  let score = 0;
  const userAnswers = {}; // tracks qIndex -> isCorrect boolean
  const totalQuestions = document.querySelectorAll('.quiz-question-box').length;
  const scoreDisplay = document.getElementById('quiz-score-display');
  const finalResultBanner = document.getElementById('quiz-final-result');
  const finalResultText = document.getElementById('quiz-final-text');
  const restartQuizBtn = document.getElementById('btn-restart-quiz');

  function updateScoreDisplay() {
    score = Object.values(userAnswers).filter(val => val === true).length;
    const answeredCount = Object.keys(userAnswers).length;

    if (scoreDisplay) {
      scoreDisplay.textContent = `Score: ${score} / ${totalQuestions}`;
    }

    if (answeredCount === totalQuestions && finalResultBanner) {
      finalResultBanner.classList.add('show');
      const percentage = Math.round((score / totalQuestions) * 100);
      let message = '';
      if (percentage >= 75) {
        message = `🎉 Outstanding! You scored ${score}/${totalQuestions} (${percentage}%). You have an excellent grasp of UI visual craftsmanship and UX behavioral strategy!`;
      } else if (percentage >= 50) {
        message = `👍 Good job! You scored ${score}/${totalQuestions} (${percentage}%). You understand the essentials—review the real-world case studies to master edge cases!`;
      } else {
        message = `📚 You scored ${score}/${totalQuestions} (${percentage}%). Review the comparison matrix and iceberg diagram to solidify your foundation!`;
      }
      if (finalResultText) {
        finalResultText.textContent = message;
      }
    }
  }

  const quizButtons = document.querySelectorAll('.quiz-btn');
  quizButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentQuestion = btn.closest('.quiz-question-box');
      const qIndex = parentQuestion.getAttribute('data-q-index');
      const answer = btn.getAttribute('data-answer');
      const explanation = parentQuestion.querySelector('.quiz-explanation');
      const qData = quizData[qIndex];

      // Reset button styles in this question
      parentQuestion.querySelectorAll('.quiz-btn').forEach(b => {
        b.classList.remove('btn-is-correct', 'btn-is-wrong');
        b.style.borderColor = '';
        b.style.background = '';
        b.style.color = '';
      });

      if (answer === 'correct') {
        btn.classList.add('btn-is-correct');
        userAnswers[qIndex] = true;

        if (explanation && qData) {
          explanation.className = 'quiz-explanation show correct-box';
          explanation.innerHTML = `
            <div class="feedback-status status-correct">
              <i class="fa-solid fa-circle-check"></i> Correct! (${qData.correctAnswer})
            </div>
            <p class="feedback-detail">${qData.correctText}</p>
          `;
        }
      } else {
        btn.classList.add('btn-is-wrong');
        userAnswers[qIndex] = false;

        if (explanation && qData) {
          explanation.className = 'quiz-explanation show wrong-box';
          explanation.innerHTML = `
            <div class="feedback-status status-wrong">
              <i class="fa-solid fa-circle-xmark"></i> Incorrect! The correct answer is <strong>${qData.correctAnswer}</strong>.
            </div>
            <p class="feedback-detail">${qData.wrongText}</p>
          `;
        }
      }

      updateScoreDisplay();
    });
  });

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      for (const key in userAnswers) {
        delete userAnswers[key];
      }
      if (scoreDisplay) {
        scoreDisplay.textContent = `Score: 0 / ${totalQuestions}`;
      }
      if (finalResultBanner) {
        finalResultBanner.classList.remove('show');
      }

      document.querySelectorAll('.quiz-question-box').forEach(q => {
        q.querySelectorAll('.quiz-btn').forEach(b => {
          b.classList.remove('btn-is-correct', 'btn-is-wrong');
          b.style.borderColor = '';
          b.style.background = '';
          b.style.color = '';
        });
        const exp = q.querySelector('.quiz-explanation');
        if (exp) {
          exp.className = 'quiz-explanation';
          exp.innerHTML = '';
        }
      });
    });
  }

  // 4b. Quiz Button Toggle (Displays Quiz Questions on Click)
  const toggleQuizBtn = document.getElementById('btn-toggle-quiz');
  const quizQuestionsWrapper = document.getElementById('quiz-questions-wrapper');

  if (toggleQuizBtn && quizQuestionsWrapper) {
    toggleQuizBtn.addEventListener('click', () => {
      const isVisible = quizQuestionsWrapper.classList.toggle('show-quiz');
      if (isVisible) {
        toggleQuizBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Hide Quiz';
        toggleQuizBtn.classList.add('active');
      } else {
        toggleQuizBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i> Start Quiz (4 Questions)';
        toggleQuizBtn.classList.remove('active');
      }
    });
  }

  // 5. Section ScrollSpy (Synchronizes Sidebar TOC, Top Navbar, & Mobile Menu)
  function highlightToc() {
    const sections = document.querySelectorAll('.content-section-card[id], .brandx-hero-banner[id]');
    const tocLinks = document.querySelectorAll('.toc-link');
    const navLinks = document.querySelectorAll('.header-nav .nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');
    let currentId = 'intro';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // When the top of the section is within 180px of top of viewport
      if (rect.top <= 180) {
        currentId = section.getAttribute('id');
      }
    });

    // Update Sidebar Table of Contents
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    // Map section IDs to corresponding top navigation items
    let activeNavHref = `#${currentId}`;
    if (currentId === 'iceberg-analogy') {
      activeNavHref = '#ui-vs-ux';
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === activeNavHref) {
        link.classList.add('active');
      }
    });

    // Update Mobile Drawer Links
    mobileLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  // 6. Social Share Handlers
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const platform = btn.getAttribute('data-platform');
      const pageUrl = encodeURIComponent(window.location.href);
      const pageTitle = encodeURIComponent('UI vs. UX: Understanding the Difference with Examples | Design & Tech Insights');

      if (platform === 'copy') {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fa fa-check"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        });
      } else if (platform === 'twitter') {
        e.preventDefault();
        window.open(`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`, '_blank', 'width=600,height=400');
      } else if (platform === 'facebook') {
        e.preventDefault();
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank', 'width=600,height=500');
      } else if (platform === 'linkedin') {
        e.preventDefault();
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`, '_blank', 'width=600,height=500');
      } else if (platform === 'whatsapp') {
        e.preventDefault();
        window.open(`https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`, '_blank');
      }
    });
  });

  // 7. Interactive Comment Submission Simulation
  const commentForm = document.getElementById('comment-form');
  const commentList = document.getElementById('comment-list');
  const commentCountEl = document.getElementById('comments-count');

  if (commentForm && commentList) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const authorInput = document.getElementById('comment-name');
      const messageInput = document.getElementById('comment-message');

      const author = authorInput.value.trim() || 'Reader';
      const message = messageInput.value.trim();

      if (!message) return;

      const initials = author.substring(0, 2).toUpperCase();
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newComment = document.createElement('li');
      newComment.className = 'comment-item';
      newComment.innerHTML = `
        <div class="comment-avatar">${initials}</div>
        <div class="comment-body">
          <div class="comment-author-name">
            ${escapeHtml(author)}
            <span class="comment-date">(${dateStr})</span>
          </div>
          <p class="comment-text">${escapeHtml(message)}</p>
          <button class="comment-reply-btn" type="button">Reply</button>
        </div>
      `;

      commentList.appendChild(newComment);
      messageInput.value = '';
      authorInput.value = '';

      if (commentCountEl) {
        const currentCount = parseInt(commentCountEl.textContent || '2', 10);
        commentCountEl.textContent = (currentCount + 1).toString();
      }

      newComment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // 8. Working Footer Newsletter Form
  const newsletterForm = document.getElementById('footer-newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        if (newsletterFeedback) {
          newsletterFeedback.style.display = 'block';
          newsletterFeedback.textContent = `✓ Success! ${emailInput.value} has been subscribed to Design & Tech Insights.`;
        }
        emailInput.value = '';
      }
    });
  }

  // 9. Blogger Code Export Modal
  const openModalBtn = document.getElementById('open-export-modal-btn');
  const modalBackdrop = document.getElementById('export-modal');
  const closeModalBtn = document.getElementById('close-export-modal-btn');
  const copyModalCodeBtn = document.getElementById('btn-copy-modal-code');
  const modalTabs = document.querySelectorAll('.modal-tab-btn');
  const codeBox = document.getElementById('modal-code-display');

  if (openModalBtn && modalBackdrop) {
    openModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.add('active');
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        modalBackdrop.classList.remove('active');
      });
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });

    modalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        modalTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const format = tab.getAttribute('data-tab');

        if (format === 'blogger-html') {
          fetchBloggerSnippet();
        } else if (format === 'markdown') {
          showMarkdownSnippet();
        }
      });
    });

    if (copyModalCodeBtn && codeBox) {
      copyModalCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeBox.textContent).then(() => {
          const originalText = copyModalCodeBtn.innerHTML;
          copyModalCodeBtn.innerHTML = '<i class="fa fa-check"></i> Copied to Clipboard!';
          setTimeout(() => {
            copyModalCodeBtn.innerHTML = originalText;
          }, 2000);
        });
      });
    }
  }

  function fetchBloggerSnippet() {
    if (window.bloggerSnippetCache) {
      codeBox.textContent = window.bloggerSnippetCache;
      return;
    }
    fetch('blogger-post-content.html')
      .then(res => res.text())
      .then(html => {
        window.bloggerSnippetCache = html;
        codeBox.textContent = html;
      })
      .catch(() => {
        codeBox.textContent = `<!-- Blogger HTML View -->\n<div class="bx-post-wrap">\n  <h2>UI vs. UX: Understanding the Difference with Examples</h2>\n  <p>Copy from blogger-post-content.html for the complete template code.</p>\n</div>`;
      });
  }

  function showMarkdownSnippet() {
    codeBox.textContent = `# UI vs. UX: Understanding the Difference with Examples

## Quick Summary
- **UI (User Interface)** is the visual touchpoint: screens, buttons, colors, typography, and micro-interactions.
- **UX (User Experience)** is the internal journey: ease of navigation, user research, wireframing, architecture, and problem-solving.

## The Iceberg Analogy
- **UI (Surface Level)**: Visual hierarchy, layout, color palette, responsive animations.
- **UX (Below the Surface)**: User research, user testing, information architecture, journey maps.

## Real World Examples
1. **SwiftRide / Uber**: UI is the dark-mode polished map and pulsating car icons; UX is arriving safely in 4 minutes with transparent surge pricing.
2. **Spotify**: UI is the fluid audio equalizer and album cover glow; UX is the Discover Weekly recommendation engine.
`;
  }

  // Preload snippet
  fetchBloggerSnippet();

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }
});
