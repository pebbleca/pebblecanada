/**
 * Pebble Canada — LinkedIn Post Feed
 * ====================================
 * This file is auto-updated by the GitHub Action in
 * .github/workflows/fetch-linkedin.yml
 *
 * Manual updates: add entries to the top of the array.
 * Each post needs: date, text, url (direct link to the LinkedIn post).
 */
var PEBBLE_LI_POSTS = [
  {
    date: 'Jul 15, 2026',
    text: 'AI adoption in Canadian enterprises is accelerating — but governance frameworks aren\'t keeping pace. Our latest analysis examines what regulated-sector organizations need to prioritize now.',
    url: 'https://linkedin.com/company/pebblecanada'
  },
  {
    date: 'Jul 12, 2026',
    text: 'Canada\'s critical minerals workforce gap is widening. With $30B+ in planned mining investments and an estimated 100,000 new workers needed, offshore workforce models are becoming essential.',
    url: 'https://linkedin.com/company/pebblecanada'
  },
  {
    date: 'Jul 9, 2026',
    text: 'NORAD modernization is creating new opportunities for Canadian defence contractors — but operating above the 60th parallel comes with unique logistics and infrastructure challenges.',
    url: 'https://linkedin.com/company/pebblecanada'
  },
  {
    date: 'Jul 5, 2026',
    text: 'Cross-border supply chain risk is forcing Canadian operators to diversify beyond the U.S. corridor. CPTPP and Indo-Pacific trade routes are gaining traction as viable alternatives.',
    url: 'https://linkedin.com/company/pebblecanada'
  },
  {
    date: 'Jul 1, 2026',
    text: 'Happy Canada Day! Proud to be building capability across technology, defence, logistics, and workforce for Canadian organizations. Here\'s to another year of growth and impact.',
    url: 'https://linkedin.com/company/pebblecanada'
  },
  {
    date: 'Jun 27, 2026',
    text: 'Agentic AI is moving beyond chatbots into autonomous multi-step workflows. For government and defence, this raises critical questions about accountability, oversight, and human-in-the-loop design.',
    url: 'https://linkedin.com/company/pebblecanada'
  },
  {
    date: 'Jun 23, 2026',
    text: 'Defence procurement in Canada doesn\'t have to be opaque. Our practical guide breaks down ITTs, RFPs, standing offers, and what suppliers need to know to compete effectively.',
    url: 'https://linkedin.com/company/pebblecanada'
  },
  {
    date: 'Jun 18, 2026',
    text: 'Digital presence isn\'t optional for B2B companies anymore. We\'re helping Canadian firms grow their LinkedIn and social reach with AI-powered content strategies. Plans start at $150/month.',
    url: 'https://linkedin.com/company/pebblecanada'
  }
];

/* ─── Ticker Renderer (auto-scroll + drag) ─────────────────────────────── */
(function () {
  'use strict';

  function buildCard(post) {
    var card = document.createElement('a');
    card.className = 'pc-li-card';
    card.href = post.url;
    card.target = '_blank';
    card.rel = 'noopener';

    card.innerHTML =
      '<div class="pc-li-card-date">' + post.date + '</div>' +
      '<div class="pc-li-card-text">' + post.text + '</div>' +
      '<div class="pc-li-card-cta">View on LinkedIn <span>→</span></div>';

    return card;
  }

  function initTicker() {
    var track = document.getElementById('liTicker');
    if (!track || typeof PEBBLE_LI_POSTS === 'undefined') return;

    var posts = PEBBLE_LI_POSTS;
    if (!posts.length) return;

    // Build cards 3x for seamless looping in both directions
    var fragment = document.createDocumentFragment();
    for (var round = 0; round < 3; round++) {
      for (var i = 0; i < posts.length; i++) {
        fragment.appendChild(buildCard(posts[i]));
      }
    }
    track.appendChild(fragment);

    // ── Measurements ──
    var cardWidth = 320 + 20; // card width + gap
    var setWidth = posts.length * cardWidth; // width of one full set
    var scrollSpeed = 0.6; // pixels per frame (~36px/s at 60fps)

    // Remove CSS animation — we drive it with JS now
    track.style.animation = 'none';
    track.style.transform = 'translateX(0px)';

    // Start in the middle set so we can drag backwards
    var pos = -setWidth;
    track.style.transform = 'translateX(' + pos + 'px)';

    // ── Auto-scroll state ──
    var rafId = null;
    var autoScrolling = true;

    function autoScroll() {
      if (!autoScrolling) return;
      pos -= scrollSpeed;
      // Seamless loop: if we've scrolled past two full sets, jump back one set
      if (pos <= -setWidth * 2) {
        pos += setWidth;
      }
      // If dragged right past the start, jump forward one set
      if (pos >= 0) {
        pos -= setWidth;
      }
      track.style.transform = 'translateX(' + pos + 'px)';
      rafId = requestAnimationFrame(autoScroll);
    }

    rafId = requestAnimationFrame(autoScroll);

    // ── Drag state ──
    var isDragging = false;
    var didDrag = false;
    var startX = 0;
    var startPos = 0;
    var velocity = 0;
    var lastX = 0;
    var lastTime = 0;
    var momentumId = null;

    function wrapPos() {
      if (pos <= -setWidth * 2) pos += setWidth;
      if (pos >= 0) pos -= setWidth;
    }

    function onDragStart(clientX) {
      isDragging = true;
      didDrag = false;
      autoScrolling = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      if (momentumId) { cancelAnimationFrame(momentumId); momentumId = null; }
      startX = clientX;
      startPos = pos;
      lastX = clientX;
      lastTime = Date.now();
      velocity = 0;
      track.style.cursor = 'grabbing';
    }

    function onDragMove(clientX) {
      if (!isDragging) return;
      var dx = clientX - startX;
      if (Math.abs(dx) > 5) didDrag = true;
      pos = startPos + dx;
      wrapPos();
      // Track velocity for momentum
      var now = Date.now();
      var dt = now - lastTime;
      if (dt > 0) {
        velocity = (clientX - lastX) / dt; // px per ms
      }
      lastX = clientX;
      lastTime = now;
      track.style.transform = 'translateX(' + pos + 'px)';
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = 'grab';

      // Apply momentum
      var friction = 0.95;
      var momentumVel = velocity * 16; // convert to px per frame

      function momentumStep() {
        if (Math.abs(momentumVel) < 0.3) {
          // Momentum done — resume auto-scroll
          autoScrolling = true;
          rafId = requestAnimationFrame(autoScroll);
          return;
        }
        pos += momentumVel;
        momentumVel *= friction;
        wrapPos();
        track.style.transform = 'translateX(' + pos + 'px)';
        momentumId = requestAnimationFrame(momentumStep);
      }

      if (Math.abs(velocity) > 0.1) {
        momentumId = requestAnimationFrame(momentumStep);
      } else {
        // No momentum — resume auto-scroll after short pause
        setTimeout(function () {
          autoScrolling = true;
          rafId = requestAnimationFrame(autoScroll);
        }, 2000);
      }
    }

    // ── Mouse events ──
    track.addEventListener('mousedown', function (e) {
      e.preventDefault();
      onDragStart(e.clientX);
    });

    window.addEventListener('mousemove', function (e) {
      if (isDragging) {
        e.preventDefault();
        onDragMove(e.clientX);
      }
    });

    window.addEventListener('mouseup', function () {
      onDragEnd();
    });

    // Prevent link clicks after a drag
    track.addEventListener('click', function (e) {
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // ── Touch events ──
    track.addEventListener('touchstart', function (e) {
      onDragStart(e.touches[0].clientX);
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      if (isDragging) {
        onDragMove(e.touches[0].clientX);
      }
    }, { passive: true });

    track.addEventListener('touchend', function () {
      onDragEnd();
    });

    // ── Pause auto-scroll on hover (without drag) ──
    var section = track.closest('.pc-li-ticker-section');
    if (section) {
      section.addEventListener('mouseenter', function () {
        if (!isDragging && autoScrolling) {
          autoScrolling = false;
          if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        }
      });
      section.addEventListener('mouseleave', function () {
        if (!isDragging) {
          autoScrolling = true;
          rafId = requestAnimationFrame(autoScroll);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTicker);
  } else {
    initTicker();
  }
})();
