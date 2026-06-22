/* ============================================================
   EXTROPICA FRESH — Signature design interactions
   Vanilla JS, no dependencies, no external requests.
   Scroll progress, sticky header, reveal-on-scroll, scroll-fill
   timeline, parallax band, magnetic buttons, menu, form modal.
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ─── Scroll progress + sticky header (one scroll handler) ── */
  var header = document.querySelector('.site-header');
  var progress = document.querySelector('.progress');
  var band = document.querySelector('.band-bg');
  var timeline = document.querySelector('.timeline');
  var fill = document.querySelector('.timeline-line .fill');
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step'));
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var docH = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    if (header) header.classList.toggle('solid', y > 40);

    // Parallax band background
    if (band && !reduce) {
      var bandSection = band.closest('.band');
      if (bandSection) {
        var rect = bandSection.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          var off = (rect.top - window.innerHeight / 2) * -0.12;
          band.style.transform = 'translateY(' + off + 'px)';
        }
      }
    }

    // Scroll-fill timeline
    if (timeline && fill) {
      var tRect = timeline.getBoundingClientRect();
      var trigger = window.innerHeight * 0.55;
      var total = tRect.height;
      var passed = trigger - tRect.top;
      var pct = Math.max(0, Math.min(1, passed / total));
      fill.style.height = (pct * 100) + '%';
      var litLine = tRect.top + total * pct;
      steps.forEach(function (s) {
        var node = s.querySelector('.node');
        if (!node) return;
        var nRect = node.getBoundingClientRect();
        s.classList.toggle('lit', nRect.top <= litLine + 4);
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ─── Active nav by current page ──────────────────────────── */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (href === page || (href === 'index.html' && (page === '' || page === 'index.html'))) {
      a.classList.add('active');
    }
  });

  /* ─── Mobile menu ─────────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (burger) burger.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('menu-open'));
  });
  document.querySelectorAll('.mobile-nav a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ─── Reveal on scroll (staggered) ────────────────────────── */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseFloat(entry.target.getAttribute('data-delay')) || 0;
          setTimeout(function () { entry.target.classList.add('in'); }, delay * 1000);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ─── Magnetic buttons (desktop only) ─────────────────────── */
  if (finePointer && !reduce) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + mx * 0.22 + 'px,' + my * 0.32 + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ─── Toast helper ────────────────────────────────────────── */
  function toast(msg) {
    var t = document.querySelector('.toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, 3500);
  }

  /* ─── Contact form (self-contained) ───────────────────────── */
  var form = document.getElementById('inquiryForm');
  var modal = document.getElementById('successModal');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.querySelector('span') : null;
      if (btn) btn.disabled = true;
      if (label) label.textContent = 'Sending…';
      setTimeout(function () {
        form.reset();
        if (btn) btn.disabled = false;
        if (label) label.textContent = 'Send Inquiry';
        if (modal) modal.classList.add('show');
        else toast('Thank you! Your inquiry has been received.');
      }, 1000);
    });
  }
  if (modal) {
    var close = modal.querySelector('[data-close]');
    if (close) close.addEventListener('click', function () { modal.classList.remove('show'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('show'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('show'); });
  }

  /* ─── Newsletter ──────────────────────────────────────────── */
  var news = document.querySelector('.news-form');
  if (news) {
    news.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = news.querySelector('input');
      var v = input ? input.value.trim() : '';
      if (v && v.indexOf('@') > -1) { toast('Thanks for subscribing!'); if (input) input.value = ''; }
      else { toast('Please enter a valid email address.'); }
    });
  }

  /* ─── Footer year ─────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
