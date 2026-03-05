/**
 * Pebble Canada — Site Search
 * Client-side search modal with real-time results.
 * Depends on: search-data.js (PEBBLE_SEARCH_INDEX)
 */
(function () {
  'use strict';

  /* ── Inject modal HTML ──────────────────────────────────────────────────── */
  var modalHTML = [
    '<div id="pc-search-overlay" role="dialog" aria-modal="true" aria-label="Site search" hidden>',
    '  <div id="pc-search-box">',
    '    <div id="pc-search-header">',
    '      <svg id="pc-search-icon-inner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    '      <input id="pc-search-input" type="search" placeholder="Search Pebble Canada..." autocomplete="off" aria-label="Search" aria-controls="pc-search-results" aria-autocomplete="list">',
    '      <button id="pc-search-close" type="button" aria-label="Close search">',
    '        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    '      </button>',
    '    </div>',
    '    <div id="pc-search-results" role="listbox" aria-label="Search results"></div>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.addEventListener('DOMContentLoaded', function () {
    /* Inject modal */
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    /* Inject search button into nav — after lang toggle (which lang.js appends last) */
    var nav = document.querySelector('.ms-nav');
    if (nav) {
      var searchBtn = document.createElement('button');
      searchBtn.className = 'pc-search-btn';
      searchBtn.type = 'button';
      searchBtn.setAttribute('aria-label', 'Search site');
      searchBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
      searchBtn.addEventListener('click', function () { window.openSearch(); });
      nav.appendChild(searchBtn);
    }

    var overlay  = document.getElementById('pc-search-overlay');
    var input    = document.getElementById('pc-search-input');
    var results  = document.getElementById('pc-search-results');
    var closeBtn = document.getElementById('pc-search-close');

    /* ── Open / close ─────────────────────────────────────────────────────── */
    window.openSearch = function () {
      overlay.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { input.focus(); }, 50);
      renderResults('');
    };

    function closeSearch() {
      overlay.setAttribute('hidden', '');
      document.body.style.overflow = '';
      input.value = '';
      results.innerHTML = '';
    }

    closeBtn.addEventListener('click', closeSearch);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
    });

    /* ── Search logic ─────────────────────────────────────────────────────── */
    input.addEventListener('input', function () {
      renderResults(this.value.trim());
    });

    function stripHTML(str) {
      return str.replace(/<[^>]*>/g, '');
    }

    function highlight(text, query) {
      if (!query) return text;
      var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return text.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark>$1</mark>');
    }

    function score(page, section, query) {
      var q = query.toLowerCase();
      var points = 0;
      if (page.title.toLowerCase().indexOf(q) !== -1)       points += 10;
      if (section.heading.toLowerCase().indexOf(q) !== -1)  points += 6;
      if (section.body.toLowerCase().indexOf(q) !== -1)     points += 2;
      if (page.description.toLowerCase().indexOf(q) !== -1) points += 3;
      return points;
    }

    function getSnippet(body, query) {
      var plain = stripHTML(body);
      if (!query) return plain.substring(0, 120) + (plain.length > 120 ? '…' : '');
      var idx = plain.toLowerCase().indexOf(query.toLowerCase());
      if (idx === -1) return plain.substring(0, 120) + (plain.length > 120 ? '…' : '');
      var start = Math.max(0, idx - 40);
      var end   = Math.min(plain.length, idx + query.length + 80);
      return (start > 0 ? '…' : '') + plain.substring(start, end) + (end < plain.length ? '…' : '');
    }

    function renderResults(query) {
      results.innerHTML = '';

      /* Show browse tiles when empty */
      if (!query) {
        var browse = document.createElement('div');
        browse.id = 'pc-search-browse';
        browse.innerHTML = '<p class="pc-search-hint">Browse pages</p>';
        var tiles = document.createElement('div');
        tiles.className = 'pc-search-tiles';
        PEBBLE_SEARCH_INDEX.forEach(function (page) {
          var a = document.createElement('a');
          a.href = page.url;
          a.className = 'pc-search-tile';
          a.innerHTML = '<span class="pc-tile-title">' + page.title + '</span>' +
                        '<span class="pc-tile-desc">' + page.description + '</span>';
          tiles.appendChild(a);
        });
        browse.appendChild(tiles);
        results.appendChild(browse);
        return;
      }

      /* Collect and rank matches */
      var matches = [];
      PEBBLE_SEARCH_INDEX.forEach(function (page) {
        page.sections.forEach(function (section) {
          var s = score(page, section, query);
          if (s > 0) {
            matches.push({ page: page, section: section, score: s });
          }
        });
      });

      matches.sort(function (a, b) { return b.score - a.score; });

      /* Dedupe: max 2 results per page */
      var pageCounts = {};
      matches = matches.filter(function (m) {
        var key = m.page.url;
        pageCounts[key] = (pageCounts[key] || 0) + 1;
        return pageCounts[key] <= 2;
      });

      if (matches.length === 0) {
        results.innerHTML = '<p class="pc-search-empty">No results found for <strong>"' + query + '"</strong></p>';
        return;
      }

      var list = document.createElement('ul');
      list.className = 'pc-search-list';
      list.setAttribute('role', 'listbox');

      matches.forEach(function (m) {
        var snippet  = getSnippet(m.section.body, query);
        var li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.innerHTML =
          '<a href="' + m.page.url + '" class="pc-result-link">' +
            '<span class="pc-result-page">' + highlight(m.page.title, query) + '</span>' +
            '<span class="pc-result-section">' + highlight(m.section.heading, query) + '</span>' +
            '<span class="pc-result-snippet">' + highlight(snippet, query) + '</span>' +
          '</a>';
        list.appendChild(li);
      });

      results.appendChild(list);
    }
  });
})();
