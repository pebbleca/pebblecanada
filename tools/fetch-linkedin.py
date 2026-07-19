#!/usr/bin/env python3
"""
Fetch recent posts from Pebble Canada's LinkedIn page and update linkedin-posts.js.

Requirements:
  pip install requests

Setup (one-time):
  1. Go to https://developer.linkedin.com → Create App
  2. Under Products, request "Community Management API"
  3. In Auth tab, add redirect URL: https://localhost:8080/callback
  4. Note your Client ID and Client Secret
  5. Generate an access token (see below) and store as GitHub secret: LINKEDIN_ACCESS_TOKEN
  6. Store your org ID as GitHub secret: LINKEDIN_ORG_ID

Generating an access token:
  Visit this URL in your browser (replace CLIENT_ID):
  https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=CLIENT_ID&redirect_uri=https://localhost:8080/callback&scope=r_organization_social

  After approving, you'll be redirected to a URL with ?code=AUTH_CODE.
  Then exchange it:
    curl -X POST https://www.linkedin.com/oauth/v2/accessToken \\
      -d grant_type=authorization_code \\
      -d code=AUTH_CODE \\
      -d client_id=CLIENT_ID \\
      -d client_secret=CLIENT_SECRET \\
      -d redirect_uri=https://localhost:8080/callback

  The response contains access_token (valid 60 days) and refresh_token (valid 365 days).
  Store the refresh_token as LINKEDIN_REFRESH_TOKEN in GitHub secrets for auto-renewal.

Usage:
  python tools/fetch-linkedin.py
"""

import os
import sys
import json
import re
from datetime import datetime
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: pip install requests")
    sys.exit(1)

# ─── Config ──────────────────────────────────────────────────────────────

POSTS_FILE = Path(__file__).resolve().parent.parent / "assets" / "js" / "linkedin-posts.js"
MAX_POSTS = 15
API_BASE = "https://api.linkedin.com/rest"

# ─── Token Refresh ───────────────────────────────────────────────────────

def refresh_access_token():
    """Refresh the access token using the refresh token."""
    refresh_token = os.environ.get("LINKEDIN_REFRESH_TOKEN")
    client_id = os.environ.get("LINKEDIN_CLIENT_ID")
    client_secret = os.environ.get("LINKEDIN_CLIENT_SECRET")

    if not all([refresh_token, client_id, client_secret]):
        return None

    resp = requests.post("https://www.linkedin.com/oauth/v2/accessToken", data={
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret,
    })

    if resp.status_code == 200:
        data = resp.json()
        print(f"Token refreshed, expires in {data.get('expires_in', '?')}s")
        return data["access_token"]

    print(f"Token refresh failed: {resp.status_code} {resp.text}")
    return None


# ─── LinkedIn API ────────────────────────────────────────────────────────

def fetch_posts(access_token, org_id):
    """Fetch recent posts from the LinkedIn organization page."""
    headers = {
        "Authorization": f"Bearer {access_token}",
        "LinkedIn-Version": "202405",
        "X-Restli-Protocol-Version": "2.0.0",
    }

    # Fetch posts authored by the organization
    url = f"{API_BASE}/posts"
    params = {
        "author": f"urn:li:organization:{org_id}",
        "q": "author",
        "count": MAX_POSTS,
        "sortBy": "LAST_MODIFIED",
    }

    resp = requests.get(url, headers=headers, params=params)

    if resp.status_code == 401:
        # Try refreshing token
        new_token = refresh_access_token()
        if new_token:
            headers["Authorization"] = f"Bearer {new_token}"
            resp = requests.get(url, headers=headers, params=params)
            # Write new token back for future use
            token_path = Path(__file__).parent / ".linkedin-token"
            token_path.write_text(new_token)

    if resp.status_code != 200:
        print(f"ERROR: LinkedIn API returned {resp.status_code}")
        print(resp.text[:500])
        sys.exit(1)

    data = resp.json()
    posts = []

    for element in data.get("elements", []):
        # Extract text content
        commentary = element.get("commentary", "")
        if not commentary:
            continue

        # Clean up the text — first 200 chars
        text = commentary.strip()
        if len(text) > 200:
            text = text[:197].rsplit(" ", 1)[0] + "..."

        # Escape single quotes for JS
        text = text.replace("'", "\\'")

        # Get the post date
        created = element.get("createdAt", 0)
        if created:
            dt = datetime.fromtimestamp(created / 1000)
            date_str = dt.strftime("%b %d, %Y")
        else:
            date_str = datetime.now().strftime("%b %d, %Y")

        # Build the direct post URL
        post_id = element.get("id", "")
        # Post URN format: urn:li:share:12345 or urn:li:ugcPost:12345
        if "share:" in post_id:
            share_id = post_id.split("share:")[-1]
            post_url = f"https://www.linkedin.com/feed/update/urn:li:share:{share_id}"
        elif "ugcPost:" in post_id:
            ugc_id = post_id.split("ugcPost:")[-1]
            post_url = f"https://www.linkedin.com/feed/update/urn:li:ugcPost:{ugc_id}"
        elif "activity:" in post_id:
            activity_id = post_id.split("activity:")[-1]
            post_url = f"https://www.linkedin.com/feed/update/urn:li:activity:{activity_id}"
        else:
            post_url = "https://linkedin.com/company/pebblecanada"

        posts.append({
            "date": date_str,
            "text": text,
            "url": post_url,
        })

    return posts


# ─── Write JS File ──────────────────────────────────────────────────────

def write_posts_js(posts):
    """Write the posts array to linkedin-posts.js, preserving the ticker code."""
    # Read existing file to get the ticker renderer code
    existing = POSTS_FILE.read_text(encoding="utf-8")

    # Extract the ticker renderer (everything from the IIFE onwards)
    ticker_match = re.search(r'/\* ─── Ticker Renderer.*', existing, re.DOTALL)
    ticker_code = ticker_match.group(0) if ticker_match else ""

    # Build the new posts array
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
        " * Source: LinkedIn Community Management API\n"
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
    access_token = os.environ.get("LINKEDIN_ACCESS_TOKEN")
    org_id = os.environ.get("LINKEDIN_ORG_ID")

    if not access_token:
        print("ERROR: Set LINKEDIN_ACCESS_TOKEN environment variable")
        print("See the docstring at the top of this file for setup instructions.")
        sys.exit(1)

    if not org_id:
        print("ERROR: Set LINKEDIN_ORG_ID environment variable")
        print("Find your org ID at: https://www.linkedin.com/company/pebblecanada/admin/")
        print("It's the number in the URL or in Page Settings.")
        sys.exit(1)

    print(f"Fetching posts for org {org_id}...")
    posts = fetch_posts(access_token, org_id)

    if not posts:
        print("No posts found. Keeping existing file.")
        return

    write_posts_js(posts)
    print("Done.")


if __name__ == "__main__":
    main()
