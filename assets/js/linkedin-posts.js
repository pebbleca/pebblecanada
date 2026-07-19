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

/* ─── Ticker Renderer ──────────────────────────────────────────────────── */
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

    // Build cards twice for seamless infinite loop
    var fragment = document.createDocumentFragment();
    for (var round = 0; round < 2; round++) {
      for (var i = 0; i < posts.length; i++) {
        fragment.appendChild(buildCard(posts[i]));
      }
    }
    track.appendChild(fragment);

    // Adjust animation speed based on number of posts
    var totalWidth = posts.length * (320 + 20); // card width + gap
    var speed = Math.max(30, totalWidth / 8); // ~8px/s
    track.style.animationDuration = speed + 's';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTicker);
  } else {
    initTicker();
  }
})();
