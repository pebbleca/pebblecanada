#!/usr/bin/env python3
"""
Scrape recent posts from Pebble Canada's public LinkedIn page
and update assets/js/linkedin-posts.js.

Uses Playwright (headless Chromium) to render the JS-heavy page.
Designed to run inside a GitHub Action on a daily cron schedule.

No API keys or paid subscriptions required — reads the publicly
visible company posts page.

Usage:
  pip install playwright
  playwright install chromium
  python tools/scrape-linkedin.py
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("ERROR: pip install playwright && playwright install chromium")
    sys.exit(1)

# ─── Config ──────────────────────────────────────────────────────────────

COMPANY_SLUG = "pebblecanada"
COMPANY_URL = f"https://www.linkedin.com/company/{COMPANY_SLUG}/posts/"
POSTS_FILE = Path(__file__).resolve().parent.parent / "assets" / "js" / "linkedin-posts.js"
MAX_POSTS = 15


# ─── Scraper ─────────────────────────────────────────────────────────────

def scrape_posts():
    """Launch headless Chromium, load the company page, extract posts."""
    posts = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1280, "height": 900},
            locale="en-US",
        )
        page = context.new_page()

        print(f"Loading {COMPANY_URL} ...")
        try:
            page.goto(COMPANY_URL, wait_until="domcontentloaded", timeout=30000)
            # Wait for post content to appear
            page.wait_for_timeout(5000)

            # Scroll down to load more posts
            for _ in range(3):
                page.evaluate("window.scrollBy(0, 1000)")
                page.wait_for_timeout(2000)

        except Exception as e:
            print(f"Page load error: {e}")
            # Try to work with whatever loaded
            pass

        # ── Strategy 1: Look for feed update containers ──
        # LinkedIn wraps each post in elements with data-urn attributes
        # or in div.feed-shared-update-v2 containers
        selectors_to_try = [
            "div.feed-shared-update-v2",
            "div[data-urn*='activity']",
            "div[data-urn*='share']",
            "article.feed-shared-update-v2",
            "div.update-components-text",
        ]

        post_elements = []
        for sel in selectors_to_try:
            post_elements = page.query_selector_all(sel)
            if post_elements:
                print(f"Found {len(post_elements)} posts with selector: {sel}")
                break

        if not post_elements:
            # ── Strategy 2: Get all visible text blocks that look like posts ──
            print("Standard selectors didn't match. Trying text extraction...")
            html = page.content()
            browser.close()
            posts = extract_posts_from_html(html)
            return posts

        for el in post_elements[:MAX_POSTS]:
            try:
                post_data = extract_post_from_element(page, el)
                if post_data:
                    posts.append(post_data)
            except Exception as e:
                print(f"  Skipping post: {e}")
                continue

        browser.close()

    return posts


def extract_post_from_element(page, el):
    """Extract text, date, and URL from a single post element."""
    # Get post text
    text_el = el.query_selector(
        "span.break-words, "
        "div.update-components-text span, "
        "div.feed-shared-text span, "
        "span[dir='ltr']"
    )
    text = ""
    if text_el:
        text = text_el.inner_text().strip()
    else:
        # Fallback: get all text from the element
        text = el.inner_text().strip()
        # Take first meaningful paragraph
        lines = [l.strip() for l in text.split("\n") if len(l.strip()) > 30]
        text = lines[0] if lines else ""

    if not text or len(text) < 20:
        return None

    # Trim to 200 chars
    if len(text) > 200:
        text = text[:197].rsplit(" ", 1)[0] + "..."

    # Escape for JS
    text = text.replace("\\", "\\\\").replace("'", "\\'")

    # Get post date
    date_el = el.query_selector(
        "span.update-components-actor__sub-description span[aria-hidden='true'], "
        "time, "
        "span.feed-shared-actor__sub-description"
    )
    date_text = ""
    if date_el:
        date_text = date_el.inner_text().strip()

    date_str = parse_linkedin_date(date_text)

    # Get post URL from the activity URN
    urn = el.get_attribute("data-urn") or ""
    url = urn_to_url(urn)

    if not url:
        # Try to find a link within the post to itself
        link_el = el.query_selector(
            "a[href*='feed/update'], "
            "a[href*='activity']"
        )
        if link_el:
            href = link_el.get_attribute("href") or ""
            if href:
                url = href if href.startswith("http") else f"https://www.linkedin.com{href}"

    if not url:
        url = f"https://www.linkedin.com/company/{COMPANY_SLUG}"

    return {"date": date_str, "text": text, "url": url}


def extract_posts_from_html(html):
    """Fallback: extract posts from raw HTML using regex patterns."""
    posts = []

    # Look for activity URNs and nearby text content
    activity_pattern = re.findall(
        r'data-urn="urn:li:activity:(\d+)"', html
    )

    # Also try to find post text blocks
    text_blocks = re.findall(
        r'<span[^>]*dir="ltr"[^>]*>([^<]{40,300})</span>', html
    )

    for i, text in enumerate(text_blocks[:MAX_POSTS]):
        text = re.sub(r'<[^>]+>', '', text).strip()
        if len(text) < 20:
            continue
        if len(text) > 200:
            text = text[:197].rsplit(" ", 1)[0] + "..."
        text = text.replace("\\", "\\\\").replace("'", "\\'")

        activity_id = activity_pattern[i] if i < len(activity_pattern) else ""
        url = (
            f"https://www.linkedin.com/feed/update/urn:li:activity:{activity_id}"
            if activity_id
            else f"https://www.linkedin.com/company/{COMPANY_SLUG}"
        )

        posts.append({
            "date": datetime.now().strftime("%b %d, %Y"),
            "text": text,
            "url": url,
        })

    return posts


def parse_linkedin_date(date_text):
    """Convert LinkedIn relative dates ('2d', '1w', '3mo') to formatted dates."""
    if not date_text:
        return datetime.now().strftime("%b %d, %Y")

    date_text = date_text.strip().lower()

    # LinkedIn shows relative time: "2d", "1w", "3mo", "1yr", "5h"
    from datetime import timedelta

    now = datetime.now()

    match = re.match(r"(\d+)\s*h", date_text)
    if match:
        delta = timedelta(hours=int(match.group(1)))
        return (now - delta).strftime("%b %d, %Y")

    match = re.match(r"(\d+)\s*d", date_text)
    if match:
        delta = timedelta(days=int(match.group(1)))
        return (now - delta).strftime("%b %d, %Y")

    match = re.match(r"(\d+)\s*w", date_text)
    if match:
        delta = timedelta(weeks=int(match.group(1)))
        return (now - delta).strftime("%b %d, %Y")

    match = re.match(r"(\d+)\s*mo", date_text)
    if match:
        delta = timedelta(days=int(match.group(1)) * 30)
        return (now - delta).strftime("%b %d, %Y")

    match = re.match(r"(\d+)\s*yr", date_text)
    if match:
        delta = timedelta(days=int(match.group(1)) * 365)
        return (now - delta).strftime("%b %d, %Y")

    # If it looks like an absolute date, return as-is
    return date_text if len(date_text) > 5 else now.strftime("%b %d, %Y")


def urn_to_url(urn):
    """Convert a LinkedIn URN to a direct post URL."""
    if not urn:
        return ""
    if "activity:" in urn:
        activity_id = urn.split("activity:")[-1]
        return f"https://www.linkedin.com/feed/update/urn:li:activity:{activity_id}"
    if "share:" in urn:
        share_id = urn.split("share:")[-1]
        return f"https://www.linkedin.com/feed/update/urn:li:share:{share_id}"
    if "ugcPost:" in urn:
        ugc_id = urn.split("ugcPost:")[-1]
        return f"https://www.linkedin.com/feed/update/urn:li:ugcPost:{ugc_id}"
    return ""


# ─── Write JS File ──────────────────────────────────────────────────────

def write_posts_js(posts):
    """Write scraped posts to linkedin-posts.js, preserving the ticker renderer."""
    existing = POSTS_FILE.read_text(encoding="utf-8")

    # Extract the ticker renderer code (everything from the IIFE onwards)
    ticker_match = re.search(r'/\* ─── Ticker Renderer.*', existing, re.DOTALL)
    ticker_code = ticker_match.group(0) if ticker_match else ""

    # Build entries
    entries = []
    for p in posts:
        entries.append(
            "  {\n"
            f"    date: '{p['date']}',\n"
            f"    text: '{p['text']}',\n"
            f"    url: '{p['url']}'\n"
            "  }"
        )

    header = (
        "/**\n"
        " * Pebble Canada — LinkedIn Post Feed\n"
        " * ====================================\n"
        f" * Auto-updated: {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}\n"
        " * Source: Scraped from public LinkedIn company page\n"
        " */\n"
    )

    js_content = (
        header +
        "var PEBBLE_LI_POSTS = [\n" +
        ",\n".join(entries) + "\n" +
        "];\n\n" +
        ticker_code
    )

    POSTS_FILE.write_text(js_content, encoding="utf-8")
    print(f"Wrote {len(posts)} posts to {POSTS_FILE}")


# ─── Main ────────────────────────────────────────────────────────────────

def main():
    print("Scraping LinkedIn posts for Pebble Canada...")
    posts = scrape_posts()

    if not posts:
        print("No posts scraped. Keeping existing file unchanged.")
        return

    print(f"Scraped {len(posts)} posts")
    for i, p in enumerate(posts):
        print(f"  {i+1}. [{p['date']}] {p['text'][:60]}...")

    write_posts_js(posts)
    print("Done.")


if __name__ == "__main__":
    main()
