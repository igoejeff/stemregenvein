/* ================================================================
   ATLANTA MEDICAL CLINIC — MAIN JAVASCRIPT
   Interactivity, animations, form handling, scroll effects
   ================================================================ */

'use strict';

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileNav();
  initScrollAnimations();
  initCounterAnimation();
  initFormHandler();
  initBackToTop();
  initSmoothScroll();
  initVideoPlaceholder();
});

/* ================================================================
   NAV SCROLL EFFECT
================================================================ */
function initNavScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ================================================================
   MOBILE NAV TOGGLE + DESKTOP DROPDOWN (click-based)
================================================================ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay   = document.getElementById('mobile-nav-overlay');

  // ── Mobile hamburger ──
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
    });
  }

  // ── Desktop dropdown: click to open/close ──
  document.querySelectorAll('.has-dropdown').forEach((item) => {
    const trigger = item.querySelector('a');
    const dropdown = item.querySelector('.nav-dropdown');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('open');

      // Close all other open dropdowns first
      document.querySelectorAll('.has-dropdown.open').forEach((el) => {
        el.classList.remove('open');
      });

      // Toggle this one
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ── Click outside to close any open dropdown ──
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown.open').forEach((el) => {
        el.classList.remove('open');
      });
    }
  });

  // ── Close dropdown when a dropdown link is clicked ──
  document.querySelectorAll('.nav-dropdown a').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.has-dropdown.open').forEach((el) => {
        el.classList.remove('open');
      });
    });
  });

  // ── Escape key closes everything ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.has-dropdown.open').forEach((el) => {
        el.classList.remove('open');
      });
      closeMobileNav();
    }
  });
}

function openMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay   = document.getElementById('mobile-nav-overlay');

  hamburger && hamburger.classList.add('active');
  mobileNav && mobileNav.classList.add('open');
  overlay   && overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay   = document.getElementById('mobile-nav-overlay');

  hamburger && hamburger.classList.remove('active');
  mobileNav && mobileNav.classList.remove('open');
  overlay   && overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Make closeMobileNav global so inline onclick works
window.closeMobileNav = closeMobileNav;

/* ================================================================
   SCROLL ANIMATIONS (Intersection Observer)
================================================================ */
function initScrollAnimations() {
  const animatedEls = document.querySelectorAll(
    '.fade-in-up, .fade-in-left, .fade-in-right'
  );

  if (!animatedEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger cards a little
          const delay = entry.target.style.getPropertyValue('--delay') || '0s';
          const ms = delay ? parseFloat(delay) * 1000 : 0;
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, ms + 100);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animatedEls.forEach((el) => observer.observe(el));
}

/* ================================================================
   COUNTER ANIMATION (stats ribbon)
================================================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000; // ms
  const start    = performance.now();

  const tick = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = Math.floor(ease * target);
    el.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString();
    }
  };

  requestAnimationFrame(tick);
}

/* ================================================================
   FORM HANDLER
================================================================ */
function initFormHandler() {
  const form    = document.getElementById('consult-form');
  const success = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    // Disable submit button and show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const original  = submitBtn.innerHTML;
    submitBtn.disabled  = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    // Collect form data
    const data = {
      fname:     form.fname.value.trim(),
      lname:     form.lname.value.trim(),
      phone:     form.phone.value.trim(),
      email:     form.email.value.trim(),
      concern:   form.concern.value,
      insurance: form.insurance.value.trim(),
      message:   form.message.value.trim(),
    };

    try {
      // Save to RESTful Table API
      await fetch('tables/consultations', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
    } catch (err) {
      // Continue to show success even if API fails
      console.warn('API save failed, showing success anyway:', err);
    }

    // Short delay for UX
    await sleep(800);

    // Show success state
    form.style.display      = 'none';
    success.style.display   = 'block';

    // Scroll to success message
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function validateForm(form) {
  let valid = true;

  // Clear prior errors
  form.querySelectorAll('.error').forEach((el) => el.classList.remove('error'));
  form.querySelectorAll('.field-error').forEach((el) => el.remove());

  const required = form.querySelectorAll('[required]');
  required.forEach((field) => {
    if (field.type === 'checkbox') {
      if (!field.checked) {
        markError(field, 'Please check this box to continue.');
        valid = false;
      }
    } else if (!field.value.trim()) {
      markError(field, 'This field is required.');
      valid = false;
    }
  });

  // Email validation
  const emailField = form.querySelector('#email');
  if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
    markError(emailField, 'Please enter a valid email address.');
    valid = false;
  }

  return valid;
}

function markError(field, message) {
  field.classList.add('error');
  const msg = document.createElement('span');
  msg.className  = 'field-error';
  msg.style.cssText = 'color:#e74c3c;font-size:0.78rem;margin-top:4px;display:block;';
  msg.textContent = message;

  if (field.type === 'checkbox') {
    field.closest('.form-group').appendChild(msg);
  } else {
    field.after(msg);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ================================================================
   BACK TO TOP BUTTON
================================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================================================================
   SMOOTH SCROLL FOR NAV LINKS
================================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const header = document.getElementById('site-header');
      const offset = header ? header.offsetHeight + 8 : 80;

      const top =
        target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ================================================================
   ACTIVE NAV HIGHLIGHT on scroll
================================================================ */
window.addEventListener(
  'scroll',
  debounce(() => {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = '#' + section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }, 100),
  { passive: true }
);

// Add active nav link style
const navStyle = document.createElement('style');
navStyle.textContent = `.main-nav a.active { color: var(--blue) !important; background: var(--blue-light) !important; }`;
document.head.appendChild(navStyle);

/* ================================================================
   UTILITY — Debounce
================================================================ */
function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

/* ================================================================
   VIDEO PLACEHOLDER — Scroll float + play modal
================================================================ */
function initVideoPlaceholder() {
  const placeholder = document.getElementById('hero-video-placeholder');
  const playBtn     = document.getElementById('video-play-btn');
  if (!placeholder) return;

  /* ── Floating shadow deepens as user scrolls past hero ── */
  window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    // Once video column starts scrolling out of its parent hero, add floating class
    if (heroBottom < window.innerHeight * 0.8) {
      placeholder.classList.add('is-floating');
    } else {
      placeholder.classList.remove('is-floating');
    }
  }, { passive: true });

  /* ── Play button — shows a "coming soon" modal until real video is added ── */
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      showVideoModal();
    });
  }
}

function showVideoModal() {
  /* Remove any existing modal */
  const existing = document.getElementById('video-modal');
  if (existing) { existing.remove(); }

  const modal = document.createElement('div');
  modal.id = 'video-modal';
  modal.innerHTML = `
    <div class="vmodal-backdrop" id="vmodal-backdrop"></div>
    <div class="vmodal-box vmodal-box--video">
      <button class="vmodal-close" id="vmodal-close" aria-label="Close"><i class="fas fa-times"></i></button>
      <div class="vmodal-video-wrap">
        <video
          id="clinic-video-player"
          controls
          autoplay
          playsinline
          webkit-playsinline
          preload="metadata"
          poster="images/video-poster.jpg"
          style="width:100%;height:100%;display:block;background:#000;"
        >
          <source src="https://www.genspark.ai/api/files/s/U2MEeXrY" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="vmodal-video-footer">
        <span><i class="fas fa-circle-play"></i> Atlanta Medical Clinic — Vein Treatment</span>
        <a href="#schedule" class="btn-primary btn-sm vmodal-cta" onclick="document.getElementById('video-modal').remove()">
          <i class="fas fa-calendar-check"></i> Book Free Consultation
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  /* Animate in */
  requestAnimationFrame(() => modal.classList.add('vmodal-open'));

  /* Close handlers — also pause video */
  function closeModal() {
    const vid = document.getElementById('clinic-video-player');
    if (vid) vid.pause();
    modal.remove();
  }
  document.getElementById('vmodal-backdrop').addEventListener('click', closeModal);
  document.getElementById('vmodal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', function escClose(e) {
    if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escClose); }
  });
}
