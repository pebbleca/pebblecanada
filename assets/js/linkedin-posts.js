/**
 * Pebble Canada — LinkedIn Post Feed
 * ====================================
 * Add new posts to the top of the array. The ticker auto-scrolls them.
 * Each post needs: date, text (first ~200 chars), url (LinkedIn post link),
 * and optionally: likes, comments, tag.
 *
 * To add a new post:
 *   1. Copy a LinkedIn post's text (first couple sentences)
 *   2. Get the post URL (click "..." → "Copy link to post")
 *   3. Add an entry at the top of the array below
 *   4. Push to GitHub — done
 */
var PEBBLE_LI_POSTS = [
  {
    date: 'Jul 15, 2026',
    text: 'AI adoption in Canadian enterprises is accelerating — but governance frameworks aren\'t keeping pace. Our latest analysis examines what regulated-sector organizations need to prioritize now.',
    url: 'https://linkedin.com/company/pebblecanada',
    likes: 24,
    comments: 5,
    tag: 'AI Strategy'
  },
  {
    date: 'Jul 12, 2026',
    text: 'Canada\'s critical minerals workforce gap is widening. With $30B+ in planned mining investments and an estimated 100,000 new workers needed, offshore workforce models are becoming essential.',
    url: 'https://linkedin.com/company/pebblecanada',
    likes: 31,
    comments: 8,
    tag: 'Workforce'
  },
  {
    date: 'Jul 9, 2026',
    text: 'NORAD modernization is creating new opportunities for Canadian defence contractors — but operating above the 60th parallel comes with unique logistics and infrastructure challenges.',
    url: 'https://linkedin.com/company/pebblecanada',
    likes: 18,
    comments: 3,
    tag: 'Defence'
  },
  {
    date: 'Jul 5, 2026',
    text: 'Cross-border supply chain risk is forcing Canadian operators to diversify beyond the U.S. corridor. CPTPP and Indo-Pacific trade routes are gaining traction as viable alternatives.',
    url: 'https://linkedin.com/company/pebblecanada',
    likes: 27,
    comments: 6,
    tag: 'Logistics'
  },
  {
    date: 'Jul 1, 2026',
    text: 'Happy Canada Day! Proud to be building capability across technology, defence, logistics, and workforce for Canadian organizations. Here\'s to another year of growth and impact.',
    url: 'https://linkedin.com/company/pebblecanada',
    likes: 42,
    comments: 11,
    tag: 'Pebble'
  },
  {
    date: 'Jun 27, 2026',
    text: 'Agentic AI is moving beyond chatbots into autonomous multi-step workflows. For government and defence, this raises critical questions about accountability, oversight, and human-in-the-loop design.',
    url: 'https://linkedin.com/company/pebblecanada',
    likes: 35,
    comments: 9,
    tag: 'AI Strategy'
  },
  {
    date: 'Jun 23, 2026',
    text: 'Defence procurement in Canada doesn\'t have to be opaque. Our practical guide breaks down ITTs, RFPs, standing offers, and what suppliers need to know to compete effectively.',
    url: 'https://linkedin.com/company/pebblecanada',
    likes: 22,
    comments: 4,
    tag: 'Procurement'
  },
  {
    date: 'Jun 18, 2026',
    text: 'Digital presence isn\'t optional for B2B companies anymore. We\'re helping Canadian firms grow their LinkedIn and social reach with AI-powered content strategies. Plans start at $150/month.',
    url: 'https://linkedin.com/company/pebblecanada',
    likes: 19,
    comments: 7,
    tag: 'Grow'
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
      '<div class="pc-li-card-footer">' +
        '<span>❤️ ' + (post.likes || '') + '</span>' +
        '<span>💬 ' + (post.comments || '') + '</span>' +
        (post.tag ? '<span class="pc-li-card-tag">' + post.tag + '</span>' : '') +
      '</div>';

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
