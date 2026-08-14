// Dr. Egarter-Scheiflinger — main.js
document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile navigation toggle --- */
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.nav-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var isOpen = panel.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        panel.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) {
        panel.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* --- Announcement popup --- */
  var announcementModal = document.getElementById('announcement-modal');
  if (announcementModal) {
    var announcementText = announcementModal.getAttribute('data-announcement-text');
    var dismissedText = localStorage.getItem('dismissedAnnouncement');
    var closeAnnouncement = function () {
      announcementModal.classList.remove('is-visible');
      localStorage.setItem('dismissedAnnouncement', announcementText);
    };
    if (announcementText && announcementText !== dismissedText) {
      announcementModal.classList.add('is-visible');
    }
    var announcementClose = announcementModal.querySelector('.announcement-modal-close');
    if (announcementClose) {
      announcementClose.addEventListener('click', closeAnnouncement);
    }
    announcementModal.addEventListener('click', function (e) {
      if (e.target === announcementModal) closeAnnouncement();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && announcementModal.classList.contains('is-visible')) {
        closeAnnouncement();
      }
    });
  }

  /* --- Hero slideshow --- */
  var slideshow = document.querySelector('.hero-slideshow');
  if (slideshow) {
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll('.hero-slide'));
    var dotsWrap = slideshow.querySelector('.hero-slideshow-dots');
    var current = 0;
    var timer;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (dotsWrap && slides.length > 1) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Bild ' + (i + 1) + ' von ' + slides.length + ' anzeigen');
        if (i === 0) dot.classList.add('is-active');
        dot.addEventListener('click', function () { goTo(i); resetTimer(); });
        dotsWrap.appendChild(dot);
      });
    }
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function goTo(index) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = index;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
    }

    function next() { goTo((current + 1) % slides.length); }

    function resetTimer() {
      clearInterval(timer);
      if (!reduceMotion && slides.length > 1) {
        timer = setInterval(next, 6500);
      }
    }

    if (slides.length > 1) {
      resetTimer();
      slideshow.addEventListener('mouseenter', function () { clearInterval(timer); });
      slideshow.addEventListener('mouseleave', resetTimer);
      slideshow.addEventListener('focusin', function () { clearInterval(timer); });
      slideshow.addEventListener('focusout', resetTimer);
    }
  }

  /* --- Horizontal scroll arrows (Werdegang, Diplome, Weitere Ausbildungen) --- */
  document.querySelectorAll('.h-scroll-wrap').forEach(function (wrap) {
    var track = wrap.querySelector('.h-scroll-track');
    var prev = wrap.querySelector('.h-scroll-prev');
    var next = wrap.querySelector('.h-scroll-next');
    if (!track) return;
    function scrollByAmount(dir) {
      track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { scrollByAmount(-1); });
    if (next) next.addEventListener('click', function () { scrollByAmount(1); });
  });

  /* --- Cookie banner --- */
  var cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    var acceptBtn = cookieBanner.querySelector('.cookie-accept');
    var consent = null;
    try { consent = localStorage.getItem('cookieConsent'); } catch (e) {}
    if (!consent) {
      cookieBanner.classList.add('is-visible');
    }
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        cookieBanner.classList.remove('is-visible');
        try { localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}
      });
    }
  }

  /* --- Footer year --- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
