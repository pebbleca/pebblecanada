/**
 * Pebble Canada — Language Switcher (powered by Google Translate)
 *
 * Injects an EN | FR toggle into .ms-nav.
 * All translation is handled automatically by Google Translate —
 * no manual dictionary or data-i18n attributes required.
 *
 * How it works:
 *   FR click → sets  googtrans=/en/fr cookie → reloads → GT auto-translates
 *   EN click → clears googtrans cookie        → reloads → page shows in English
 */
(function () {
  'use strict';

  /* ── Suppress Google Translate's own UI chrome ────────────────────────────
     GT injects a top banner and tooltip elements we don't want.  */
  function injectStyles () {
    var s = document.createElement('style');
    s.id = 'pc-gt-styles';
    s.textContent =
      /* Hide top translate bar */
      '.goog-te-banner-frame{display:none!important}' +
      /* Prevent GT from pushing body down */
      'body{top:0!important;position:static!important}' +
      /* Hide floating tooltip */
      '#goog-gt-tt,.goog-tooltip,.goog-tooltip:hover{display:none!important}' +
      /* Remove yellow highlight on translated text */
      '.goog-text-highlight{background:transparent!important;box-shadow:none!important}' +
      /* Hide any remaining GT widget chrome (class name varies by GT version) */
      '.VIpgJd-ZVi9od-aZ2wEe-wOHMyf,.VIpgJd-ZVi9od-l4eHX-hSRGPd{display:none!important}';
    document.head.appendChild(s);
  }

  /* ── Bootstrap the (hidden) Google Translate widget ──────────────────────
     We initialise GT with autoDisplay:false so it never renders its own UI;
     we drive everything through our custom EN / FR buttons.               */
  window.googleTranslateElementInit = function () {
    /* global google */
    new google.translate.TranslateElement({
      pageLanguage:     'en',
      includedLanguages: 'fr',
      autoDisplay:       false
    }, 'pc-gt-el');
  };

  function bootGoogleTranslate () {
    /* Hidden container required by the GT widget API */
    var el = document.createElement('div');
    el.id    = 'pc-gt-el';
    el.style.cssText = 'display:none;position:absolute;top:-9999px;left:-9999px';
    document.body.appendChild(el);

    /* Load GT script asynchronously */
    var sc = document.createElement('script');
    sc.src   = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    sc.async = true;
    document.body.appendChild(sc);
  }

  /* ── Language detection & switching via googtrans cookie ──────────────── */
  function getLang () {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
    return (m && m[1] && m[1].indexOf('/fr') !== -1) ? 'fr' : 'en';
  }

  function setLang (lang) {
    if (lang === 'fr') {
      document.cookie = 'googtrans=/en/fr; path=/; SameSite=Lax';
    } else {
      /* Expire the cookie on both root path and with explicit hostname */
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=' + location.hostname;
    }
    window.location.reload();
  }

  /* ── Inject EN | FR toggle buttons into .ms-nav ──────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    bootGoogleTranslate();

    var nav = document.querySelector('.ms-nav');
    if (!nav) return;

    var lang = getLang();

    /* Build the toggle wrapper */
    var wrap = document.createElement('div');
    wrap.className = 'ms-nav__lang';

    /* EN button */
    var enBtn = document.createElement('button');
    enBtn.type      = 'button';
    enBtn.id        = 'lang-en';
    enBtn.className = 'lang-btn' + (lang === 'en' ? ' active' : '');
    enBtn.setAttribute('aria-label', 'View site in English');
    enBtn.setAttribute('aria-pressed', String(lang === 'en'));
    enBtn.textContent = 'EN';

    /* Divider */
    var sep = document.createElement('span');
    sep.className = 'lang-divider';
    sep.setAttribute('aria-hidden', 'true');
    sep.textContent = '|';

    /* FR button */
    var frBtn = document.createElement('button');
    frBtn.type      = 'button';
    frBtn.id        = 'lang-fr';
    frBtn.className = 'lang-btn' + (lang === 'fr' ? ' active' : '');
    frBtn.setAttribute('aria-label', 'Voir le site en français');
    frBtn.setAttribute('aria-pressed', String(lang === 'fr'));
    frBtn.textContent = 'FR';

    /* Wire up click events */
    enBtn.addEventListener('click', function () {
      if (getLang() !== 'en') setLang('en');
    });
    frBtn.addEventListener('click', function () {
      if (getLang() !== 'fr') setLang('fr');
    });

    wrap.appendChild(enBtn);
    wrap.appendChild(sep);
    wrap.appendChild(frBtn);
    nav.appendChild(wrap);
  });

}());
