#!/usr/bin/env python3
"""
Add a single LinkedIn post to the ticker feed (linkedin-posts.js).

Usage:
  python tools/add-linkedin-post.py --url "https://..." --text "Post text here" [--date "Jul 15, 2026"]

Called by the GitHub Action workflow (.github/workflows/fetch-linkedin.yml)
when you trigger "Add LinkedIn Post" from the Actions tab.
"""

import argparse
import re
import sys
from datetime import datetime
from pathlib import Path

POSTS_FILE = Path(__file__).resolve().parent.parent / "assets" / "js" / "linkedin-posts.js"
MAX_POSTS = 15


def escape_for_js(text):
    """Escape text for use inside JS single-quoted strings."""
    text = text.replace("\\", "\\\\")
    text = text.replace("'", "\\'")
    text = text.replace("\n", " ")
    text = text.strip()
    if len(text) > 200:
        text = text[:197].rsplit(" ", 1)[0] + "..."
    return text


def main():
    parser = argparse.ArgumentParser(description="Add a LinkedIn post to the ticker")
    parser.add_argument("--url", required=True, help="Direct URL to the LinkedIn post")
    parser.add_argument("--text", required=True, help="Post text (first ~200 chars)")
    parser.add_argument("--date", default="", help="Post date (e.g. Jul 15, 2026). Defaults to today.")
    args = parser.parse_args()

    # Validate URL
    url = args.url.strip()
    if not url.startswith("http"):
        print(f"ERROR: URL must start with http: {url}")
        sys.exit(1)

    # Date
    date_str = args.date.strip()
    if not date_str:
        date_str = datetime.now().strftime("%b %d, %Y")

    # Escape text
    text = escape_for_js(args.text)

    # Read existing file
    if not POSTS_FILE.exists():
        print(f"ERROR: {POSTS_FILE} not found")
        sys.exit(1)

    content = POSTS_FILE.read_text(encoding="utf-8")

    # Build the new entry
    new_entry = (
        "  {\n"
        f"    date: '{date_str}',\n"
        f"    text: '{text}',\n"
        f"    url: '{url}'\n"
        "  }"
    )

    # Check for duplicate URL
    if url in content:
        print(f"Post already exists: {url}")
        print("Skipping.")
        return

    # Insert the new post at the top of the array
    # Find "var PEBBLE_LI_POSTS = [" and insert right after
    pattern = r"(var PEBBLE_LI_POSTS\s*=\s*\[)\s*\n"
    match = re.search(pattern, content)
    if not match:
        print("ERROR: Could not find PEBBLE_LI_POSTS array in file")
        sys.exit(1)

    insertion_point = match.end()
    content = content[:insertion_point] + new_entry + ",\n" + content[insertion_point:]

    # Trim to MAX_POSTS (count entries and remove extras from the end)
    entries = list(re.finditer(r"  \{[^}]+\}", content))
    if len(entries) > MAX_POSTS:
        # Remove entries from position MAX_POSTS onwards
        trim_start = entries[MAX_POSTS].start()
        # Find the closing bracket of the array
        array_end = content.index("];", trim_start)
        content = content[:trim_start] + content[array_end:]

    POSTS_FILE.write_text(content, encoding="utf-8")
    print(f"Added post: {date_str} — {text[:60]}...")
    print(f"Total posts in feed: {min(len(entries), MAX_POSTS)}")


if __name__ == "__main__":
    main()
