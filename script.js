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
