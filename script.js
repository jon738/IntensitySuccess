// --- Mobile Menu Toggle ---
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// --- Dynamic Year in Footer ---
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Scroll Reveal Animation ---
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - revealPoint) el.classList.add('show');
  });
}
// --- Add 'scrolled' class when page is scrolled ---
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

(() => {
  /* -------- Scroll reveal for .reveal -------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('show');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: reveal everything if IO isn't supported
    revealEls.forEach((el) => el.classList.add('show'));
  }

  /* -------- KPI counters (run when Outcomes enters view) -------- */
  const startCounters = (root = document) => {
    root.querySelectorAll('.kpi-number').forEach((el) => {
      const target = +el.dataset.target;
      let current = 0;
      const step = Math.max(1, Math.round(target / 60));

      const tick = () => {
        current += step;
        if (current < target) {
          el.textContent = current;
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      };
      tick();
    });
  };

  const outcomes = document.getElementById('outcomes');
  if (outcomes && 'IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            startCounters(outcomes);
            counterObs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    counterObs.observe(outcomes);
  } else {
    // Fallback if no IO
    startCounters();
  }

  /* -------- Header scrolled state -------- */
  const onScroll = () => {
    if (window.scrollY > 6) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  /* -------- Footer year -------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

  
// ===== Staggered reveal for FAQ cards =====
(function () {
  const items = Array.from(document.querySelectorAll('#faq .faq.reveal'));
  if (!('IntersectionObserver' in window) || items.length === 0) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger by index (90ms steps)
        const i = items.indexOf(entry.target);
        entry.target.style.transitionDelay = `${i * 90}ms`;
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, threshold: 0.15 });

  items.forEach(el => obs.observe(el));
})();
