/* ============================================================
   EXTROPICA FRESH — "Royal Herbs"-style design interactions
   Vanilla JS, no dependencies. Mirrors the reference theme's
   preloader, sticky header, mobile menu, scroll-top & reveals.
   ============================================================ */

// ─── Preloader: hide once everything has loaded ───────────
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) setTimeout(() => pre.classList.add('loaded'), 250);
});

// ─── Sticky header on scroll ──────────────────────────────
const header = document.getElementById('header');
const scrollTopBtn = document.querySelector('.scroll-top');

function onScroll() {
  const y = window.scrollY;
  if (header) header.classList.toggle('sticky', y > 120);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('show', y > 400);
}
window.addEventListener('scroll', onScroll);
onScroll();

// ─── Scroll-to-top ────────────────────────────────────────
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// ─── Mobile menu open / close ─────────────────────────────
const mobileMenu   = document.querySelector('.mobile-menu');
const openBtn      = document.querySelector('.mobile-toggle');
const closeBtn     = document.querySelector('.mobile-panel .close-btn');
const backdrop     = document.querySelector('.mobile-backdrop');

function openMenu()  { mobileMenu && mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { mobileMenu && mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }

openBtn  && openBtn.addEventListener('click', openMenu);
closeBtn && closeBtn.addEventListener('click', closeMenu);
backdrop && backdrop.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-panel a').forEach(a =>
  a.addEventListener('click', closeMenu)
);

// ─── Reveal-on-scroll (IntersectionObserver) ──────────────
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => entry.target.classList.add('in'), delay * 1000);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
}

// ─── Active nav link by current page ──────────────────────
(function setActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-menu a, .mobile-panel a').forEach((a) => {
    const href = a.getAttribute('href');
    const li = a.closest('li');
    const isHome = (href === 'index.html' || href === '/') && (page === '' || page === 'index.html');
    if (href === page || isHome) {
      a.classList.add('active');
      if (li) li.classList.add('active');
    }
  });
})();

// ─── Contact form handler ─────────────────────────────────
const cForm = document.getElementById('contactForm');
if (cForm) {
  cForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = cForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      cForm.reset();
      btn.disabled = false;
      btn.textContent = 'Send Now';
      const msg = document.querySelector('.form-success');
      if (msg) msg.classList.add('show');
      setTimeout(() => msg && msg.classList.remove('show'), 5000);
    }, 1200);
  });
}
