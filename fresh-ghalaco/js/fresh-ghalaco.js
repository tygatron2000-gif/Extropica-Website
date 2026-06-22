/* ============================================================
   EXTROPICA FRESH — "Fresh Ghala"-style design interactions
   Vanilla JS, no dependencies, no external requests. Mirrors the
   reference theme: mobile nav, sticky header, scroll reveals,
   toast, newsletter, and a self-contained form success modal.
   ============================================================ */

// ─── Mobile menu toggle ───────────────────────────────────
const mobileBtn  = document.getElementById('mobileMenuBtn');
const navLinksEl = document.getElementById('navLinks');
if (mobileBtn && navLinksEl) {
  mobileBtn.addEventListener('click', () => navLinksEl.classList.toggle('active'));
  navLinksEl.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinksEl.classList.remove('active'))
  );
}

// ─── Smooth-scroll for any in-page anchors ────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Sticky header shadow on scroll ───────────────────────
const headerEl = document.querySelector('header');
if (headerEl) {
  const onScroll = () => headerEl.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// ─── Active nav link by current page ──────────────────────
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || a.classList.contains('btn-nav-cta')) return;
    const isHome = (href === 'index.html') && (page === '' || page === 'index.html');
    if (href === page || isHome) a.classList.add('active');
  });
})();

// ─── Toast helper ─────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('toastMsg');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── Contact form (self-contained, no external POST) ──────
const inquiryForm  = document.getElementById('inquiryForm');
const successModal = document.getElementById('successModal');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const label = btn ? btn.querySelector('span') : null;
    if (btn) btn.disabled = true;
    if (label) label.textContent = 'Sending…';
    setTimeout(() => {
      inquiryForm.reset();
      if (btn) btn.disabled = false;
      if (label) label.textContent = 'Send Inquiry';
      if (successModal) successModal.classList.add('active');
      else showToast('Thank you! Your inquiry has been received.');
    }, 1100);
  });
}

// ─── Success modal close ──────────────────────────────────
if (successModal) {
  const closeBtn = document.getElementById('closeSuccessModal');
  closeBtn && closeBtn.addEventListener('click', () => successModal.classList.remove('active'));
  successModal.addEventListener('click', (e) => { if (e.target === successModal) successModal.classList.remove('active'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') successModal.classList.remove('active'); });
}

// ─── Newsletter subscribe (front-end only) ────────────────
const newsBtn = document.getElementById('newsBtn');
if (newsBtn) {
  newsBtn.addEventListener('click', () => {
    const input = document.getElementById('newsEmail');
    const val = input ? input.value.trim() : '';
    if (val && val.includes('@')) {
      showToast('Thanks for subscribing!');
      if (input) input.value = '';
    } else {
      showToast('Please enter a valid email address.');
    }
  });
}

// ─── Current year in footer ───────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Reveal-on-scroll (IntersectionObserver) ──────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.category-card, .feature-card, .stat-block, .process-step, .reach-stat-card, .cert-item, .region-item, .about-image-wrap, .about-text').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
