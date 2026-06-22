/* ============================================
   EXTROPICA FRESH — Main JavaScript
   ============================================ */

// ─── Navbar scroll effect ───────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ─── Hamburger menu ─────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  // close on link click
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    })
  );
}

// ─── Active nav link ─────────────────────────
function setActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}
setActiveLink();

// ─── Scroll Reveal (Intersection Observer) ──
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger children slightly
        setTimeout(() => entry.target.classList.add('visible'), 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

// ─── Animated counters (home hero) ──────────
function animateCounter(el, target, suffix = '', duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

function startCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    animateCounter(el, target, suffix);
  });
}

// trigger counters when hero is visible
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounters();
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(heroStats);
}

// ─── Product filter (products page) ─────────
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? '' : 'none';
      if (matches) {
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        });
      }
    });
  });
});

// ─── Contact form ────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Inquiry';
      const success = document.querySelector('.form-success');
      if (success) success.classList.add('show');
      setTimeout(() => success && success.classList.remove('show'), 5000);
    }, 1400);
  });
}

// ─── CSS animation keyframe for filter ───────
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
