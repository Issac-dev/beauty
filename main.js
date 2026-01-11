gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

console.clear();

/* ======================================
   SMOOTH SCROLL SETUP (Create FIRST)
   ====================================== */
let smoother = ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
  wrapper: "#smooth-wrapper",
  content: "#smooth-content"
});

/* ======================================
   VIDEO BACKGROUND - SCROLL SYNC
   ====================================== */
const video = document.querySelector(".video-background");
const video2 = document.querySelector(".video-section-player");

/* ======================================
   HELPER: RUN ONCE
   ====================================== */
function once(el, event, fn, opts) {
  const onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

/* ======================================
   iOS VIDEO PRIMING (REQUIRED)
   ====================================== */
function primeVideo(videoEl) {
  if (!videoEl) return;

  videoEl.muted = true;
  videoEl.setAttribute("playsinline", "");
  videoEl.setAttribute("webkit-playsinline", "");
  videoEl.preload = "auto";

  once(document.documentElement, "touchstart", () => {
    videoEl.play().then(() => videoEl.pause()).catch(() => {});
  });
}

primeVideo(video);
primeVideo(video2);

/* ======================================
   VIDEO SCROLL SYNC (SAFE VERSION)
   ====================================== */
function setupVideoSync(videoEl, startTrigger, endTrigger) {
  function init() {
    if (!videoEl || !videoEl.duration) return;

    const st = {
      trigger: startTrigger,
      start: "top top",
      scrub: 0.5,
      markers: false,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        videoEl.currentTime = videoEl.duration * self.progress;
      }
    };

    // If the video is confined to its own section → long cinematic pin
    if (startTrigger === endTrigger) {
      st.end = () => "+=" + Math.round(window.innerHeight * 5);
      st.pin = true;
      st.pinSpacing = true;
      st.anticipatePin = 1;
    } else {
      st.endTrigger = endTrigger;
      st.end = "bottom bottom";
    }

    ScrollTrigger.create(st);
  }

  if (videoEl.readyState >= 1 && videoEl.duration) {
    init();
  } else {
    once(videoEl, "loadedmetadata", init);
  }
}

/* ======================================
   INIT VIDEO SCROLLING
   ====================================== */

// Hero video spans multiple sections
setupVideoSync(video, "#home", "#portfolio");

// Second video stays within its section
// if (video2) setupVideoSync(video2, "#video2-section", "#video2-section");

function setupPinnedVideo(videoEl, section, scrollLengthVH = 450) {
  if (!videoEl) return;

  function init() {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => "+=" + window.innerHeight * (scrollLengthVH / 100),
      scrub: 0.6,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,

      onUpdate: (self) => {
        videoEl.currentTime = videoEl.duration * self.progress;
      }
    });
  }

  if (videoEl.readyState >= 1) {
    init();
  } else {
    videoEl.addEventListener("loadedmetadata", init, { once: true });
  }
}

setupPinnedVideo(video2, "#video2-section", 500);

/* ======================================
   SCROLL ANIMATIONS
   ====================================== */

// If AOS is available, refresh to pick up added attributes
if (window.AOS) {
  AOS.refresh();
}

// Animate glass cards on scroll
gsap.utils.toArray(".glass-card").forEach((card, index) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "top 50%",
        scrub: false,
        markers: false
      }
    }
  );
});

// Stagger service items
gsap.utils.toArray(".service-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    { opacity: 0, x: 30 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        end: "top 55%",
        scrub: false
      }
    }
  );
});

// Portfolio items animation
gsap.utils.toArray(".portfolio-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    { opacity: 0, x: -30 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        end: "top 55%",
        scrub: false
      }
    }
  );
});

// Offering items animation
gsap.utils.toArray(".offering-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: index * 0.08,
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        end: "top 55%",
        scrub: false
      }
    }
  );
});

// Testimonial items animation
gsap.utils.toArray(".testimonial-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    { opacity: 0, x: -40 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      delay: index * 0.15,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "top 50%",
        scrub: false
      }
    }
  );
});

// Price cards animation
gsap.utils.toArray(".price-card").forEach((card, index) => {
  gsap.fromTo(
    card,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay: index * 0.12,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 55%",
        scrub: false
      }
    }
  );
});

// Contact form animation
gsap.fromTo(
  ".contact-card",
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".contact-card",
      start: "top 75%",
      end: "top 45%",
      scrub: false
    }
  }
);

/* ======================================
   HEADLINE ANIMATION
   ====================================== */
gsap.fromTo(
  ".headline .line.top",
  { y: 100, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "cubic.out",
    delay: 0.3
  }
);

gsap.fromTo(
  ".headline .line.bottom",
  { y: 100, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "cubic.out",
    delay: 0.5
  }
);

/* ======================================
   PARALLAX EFFECTS - REMOVED FOR PERFORMANCE
   ====================================== */
// Parallax effects disabled to improve scroll performance
// and prevent Firefox scroll-linked positioning warnings

/* ======================================
   TEXT REVEAL ANIMATION
   ====================================== */
gsap.utils.toArray(".reveall span").forEach((span, index) => {
  gsap.fromTo(
    span,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: span.parentElement,
        start: "top 80%",
        end: "top 50%",
        scrub: false
      }
    }
  );
});

/* ======================================
   BUTTON HOVER EFFECT
   ====================================== */
const buttons = document.querySelectorAll("button, .book-btn");
buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 1.05, duration: 0.3 });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, duration: 0.3 });
  });
  btn.addEventListener("click", () => {
    gsap.to(btn, { 
      scale: 0.95, 
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  });
});

/* ======================================
   ICON FLOAT ANIMATION
   ====================================== */
gsap.utils.toArray(".service-icon, .portfolio-icon").forEach((icon, index) => {
  gsap.to(icon, {
    y: -12,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: index * 0.2
  });
});

/* Rotate icons on hover */
document.querySelectorAll(".service-icon, .portfolio-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, { rotation: 360, duration: 0.6, ease: "back.out" });
  });
});

/* ======================================
   NAVIGATION LINK SMOOTH SCROLL
   ====================================== */
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("href");
    const section = document.querySelector(target);
    if (section) {
      gsap.to(window, {
        scrollTo: section,
        duration: 1.5,
        ease: "power3.inOut"
      });
    }
  });
});

/* ======================================
   SCROLL TO TOP INDICATOR
   ====================================== */
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav-content");
  if (window.scrollY > 100) {
    gsap.to(nav, { background: "rgba(255, 255, 255, 0.8)", duration: 0.3 });
  } else {
    gsap.to(nav, { background: "rgba(255, 255, 255, 0.6)", duration: 0.3 });
  }
});

/* ======================================
   CHECK ICON ANIMATION
   ====================================== */
gsap.utils.toArray(".check").forEach((check, index) => {
  gsap.fromTo(
    check,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      delay: index * 0.1,
      ease: "back.out",
      scrollTrigger: {
        trigger: check,
        start: "top 85%",
        end: "top 55%",
        scrub: false
      }
    }
  );
});
gsap.registerPlugin(ScrollTrigger);

/* ======================================
   TESTIMONIAL CAROUSEL INTERACTIONS
   - Buttons (prev/next)
   - Pointer drag + snap
   - Keyboard support
   - Autoplay with pause on interaction/visibility
   ====================================== */
(function () {
  const testimonialTrack = document.querySelector('.testimonial-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (!testimonialTrack) return;

  const cards = testimonialTrack.querySelectorAll('.testimonial-card');
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let gap = parseInt(getComputedStyle(testimonialTrack).gap) || 20;
  let cardWidth = cards[0] ? Math.round(cards[0].getBoundingClientRect().width) : 320;

  // keep sizes updated on resize
  window.addEventListener('resize', () => {
    gap = parseInt(getComputedStyle(testimonialTrack).gap) || 20;
    const cw = testimonialTrack.querySelector('.testimonial-card');
    if (cw) cardWidth = Math.round(cw.getBoundingClientRect().width);
  });

  // helpers for snapping and indexing (recalculate size on demand)
  function fullSize() { const cw = testimonialTrack.querySelector('.testimonial-card'); cardWidth = cw ? Math.round(cw.getBoundingClientRect().width) : cardWidth; return cardWidth + gap; }
  function currentIndex() { return Math.round(testimonialTrack.scrollLeft / fullSize()); }
  function scrollToIndex(i) { const clamped = Math.max(0, Math.min(i, cards.length - 1)); gsap.to(testimonialTrack, { scrollLeft: clamped * fullSize(), duration: 0.8, ease: 'power2.inOut' }); }

  // Button handlers
  if (nextBtn) nextBtn.addEventListener('click', () => {
    pauseAuto();
    scrollToIndex(currentIndex() + 1);
    resumeAutoAfterDelay();
  });
  if (prevBtn) prevBtn.addEventListener('click', () => {
    pauseAuto();
    scrollToIndex(currentIndex() - 1);
    resumeAutoAfterDelay();
  });

  // Pointer interactions: pause/resume only (loop handles motion)
  testimonialTrack.addEventListener('pointerdown', (e) => {
    pauseAuto();
    isDown = true;
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => {
    testimonialTrack.addEventListener(ev, (e) => {
      isDown = false;
      resumeLoopAfterDelay(600);
    });
  });

  // Keyboard navigation when track is focused: step one card
  testimonialTrack.setAttribute('tabindex', '0');
  testimonialTrack.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { pauseAuto(); stepLoop(-fullSize()); resumeLoopAfterDelay(700); }
    if (e.key === 'ArrowLeft') { pauseAuto(); stepLoop(fullSize()); resumeLoopAfterDelay(700); }
  });

  // CONTINUOUS LOOP (transform-driven)
  (function createContinuousLoop() {
    const track = testimonialTrack;
    if (!track) return;

    // if already initialized, skip
    if (track.querySelector('.testimonial-loop-wrap')) return;

    // collect existing cards and move them into a loop container
    const originalCards = Array.from(track.querySelectorAll('.testimonial-card'));
    if (originalCards.length === 0) return;

    const loop = document.createElement('div');
    loop.className = 'testimonial-loop';
    originalCards.forEach((c) => loop.appendChild(c));

    const clone = loop.cloneNode(true);

    const wrap = document.createElement('div');
    wrap.className = 'testimonial-loop-wrap';
    wrap.appendChild(loop);
    wrap.appendChild(clone);

    // clear track and add wrap
    track.innerHTML = '';
    track.appendChild(wrap);

    // sizing and behaviour
    let setWidth = loop.scrollWidth;
    let loopTween = null;
    const MIN_DURATION = 12; // seconds
    const PIXELS_PER_SECOND = 60; // speed

    function startLoop() {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // clear any pending resume
      if (resumeTimeout) { clearTimeout(resumeTimeout); resumeTimeout = null; }
      stopLoop();
      setWidth = loop.scrollWidth;
      if (!setWidth || setWidth <= 0) return;
      const duration = Math.max(MIN_DURATION, Math.round(setWidth / PIXELS_PER_SECOND));

      // normalize start position and create a repeating timeline that
      // animates to -setWidth then jumps back to 0 seamlessly (clone makes this invisible)
      gsap.set(wrap, { x: 0 });
      loopTween = gsap.timeline({ repeat: -1 })
        .to(wrap, { x: -setWidth, duration: duration, ease: 'linear' })
        .set(wrap, { x: 0 });
    }

    function stopLoop() {
      if (loopTween) { loopTween.kill(); loopTween = null; }
    }

    function pauseAuto() { stopLoop(); }
    function resumeLoopAfterDelay(ms = 800) { if (resumeTimeout) clearTimeout(resumeTimeout); resumeTimeout = setTimeout(startLoop, ms); }

    function stepLoop(delta) {
      stopLoop();
      const curX = parseFloat(gsap.getProperty(wrap, 'x')) || 0;
      let target = curX + delta;
      // normalize into range
      while (target < -setWidth) target += setWidth;
      while (target > 0) target -= setWidth;
      gsap.to(wrap, { x: target, duration: 0.6, ease: 'power2.out' });
    }

    // wire prev/next buttons
    if (nextBtn) nextBtn.addEventListener('click', () => { pauseAuto(); stepLoop(-fullSize()); resumeLoopAfterDelay(900); });
    if (prevBtn) prevBtn.addEventListener('click', () => { pauseAuto(); stepLoop(fullSize()); resumeLoopAfterDelay(900); });

    // pause on hover/focus
    track.addEventListener('mouseenter', pauseAuto);
    track.addEventListener('mouseleave', () => resumeLoopAfterDelay(600));
    track.addEventListener('focusin', pauseAuto);
    track.addEventListener('focusout', () => resumeLoopAfterDelay(600));

    // pause on visibility change
    document.addEventListener('visibilitychange', () => { if (document.hidden) pauseAuto(); else resumeLoopAfterDelay(600); });

    // restart on resize
    let resizeTimer = null;
    window.addEventListener('resize', () => { if (resizeTimer) clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { stopLoop(); startLoop(); }, 300); });

    // start
    // Start the continuous loop after a small delay so layout can stabilize
    setTimeout(() => { startLoop(); }, 300);

  })();

  // Ensure loop is running robustly: restart if needed after fonts/images/layout settle
  function ensureTestimonialLoopRunning() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    const wrap = track.querySelector('.testimonial-loop-wrap');
    if (!wrap) return; // not initialized yet
    const loop = wrap.querySelector('.testimonial-loop');
    if (!loop) return;

    // if there's already a running tween, don't restart
    const tweens = gsap.getTweensOf(wrap);
    if (tweens && tweens.length) return;

    // otherwise create a robust looping timeline
    let setWidth = loop.scrollWidth;
    if (!setWidth) {
      // try again shortly if sizes aren't ready
      setTimeout(ensureTestimonialLoopRunning, 250);
      return;
    }

    const MIN_DURATION = 12;
    const PIXELS_PER_SECOND = 60;
    const duration = Math.max(MIN_DURATION, Math.round(setWidth / PIXELS_PER_SECOND));

    gsap.set(wrap, { x: 0 });
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(wrap, { x: -setWidth, duration: duration, ease: 'linear' })
      .set(wrap, { x: 0 });
  }

  // Call after fonts load and on window load
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setTimeout(ensureTestimonialLoopRunning, 200));
  window.addEventListener('load', () => setTimeout(ensureTestimonialLoopRunning, 300));
  // safety retries
  setTimeout(ensureTestimonialLoopRunning, 800);
  setTimeout(ensureTestimonialLoopRunning, 2200);

  // Also ensure loop restarts when tab/window becomes visible or when user focuses
  document.addEventListener('visibilitychange', () => { if (!document.hidden) setTimeout(ensureTestimonialLoopRunning, 200); });
  window.addEventListener('focus', () => { setTimeout(ensureTestimonialLoopRunning, 200); });

  gsap.fromTo('.about-text', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.about', start: 'top 80%' } });
  gsap.fromTo('.about-img-placeholder', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.about', start: 'top 80%' } });

  gsap.utils.toArray('.testimonial-card .testimonial-text').forEach((t, idx) => {
    gsap.fromTo(t, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: idx * 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.testimonials', start: 'top 90%' } });
  });

  gsap.utils.toArray('.price-card').forEach((p, idx) => {
    gsap.fromTo(p, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: idx * 0.08, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 85%' } });
  });

})();

