#!/usr/bin/env python3
"""
Pebble Canada — Automated FR Translation for lang.js
=====================================================
Parses lang.js, finds EN keys missing from FR (or with updated EN values),
translates them via Claude API, and writes them back with proper Unicode escaping.

Usage:
  python tools/translate.py                  # Translate missing keys only
  python tools/translate.py --all            # Re-translate ALL keys (full refresh)
  python tools/translate.py --dry-run        # Show what would be translated, don't write
  python tools/translate.py --key "nav-home" # Translate a specific key only

Requirements:
  pip install anthropic

Setup:
  export ANTHROPIC_API_KEY="sk-ant-..."
"""

import re
import os
import sys
import json
import argparse
from pathlib import Path

# ─── Configuration ───────────────────────────────────────────────────────────

LANG_JS_PATH = Path(__file__).resolve().parent.parent / "assets" / "js" / "lang.js"
MODEL = "claude-sonnet-4-20250514"
BATCH_SIZE = 40  # keys per API call (keeps prompts manageable)

# ─── Parsing ─────────────────────────────────────────────────────────────────

def extract_translations(js_text, section):
    """
    Extract key-value pairs from the EN or FR section of lang.js.
    Returns dict of {key: value} with values as raw JS string content
    (unescaped Unicode like \\u00e9 is kept as-is in the string).
    """
    # Find the section: T.en = { ... } or T.fr = { ... }
    # The structure is:  en: { ... }, fr: { ... }
    pattern = rf"(?:^|\n)\s*{section}\s*:\s*\{{"
    match = re.search(pattern, js_text)
    if not match:
        print(f"ERROR: Could not find '{section}' section in lang.js")
        sys.exit(1)

    start = match.end()
    # Walk forward counting braces to find the matching close
    depth = 1
    i = start
    while i < len(js_text) and depth > 0:
        ch = js_text[i]
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
        elif ch == "'":
            # Skip string content
            i += 1
            while i < len(js_text) and js_text[i] != "'":
                if js_text[i] == '\\':
                    i += 1  # skip escaped char
                i += 1
        i += 1

    section_text = js_text[start:i - 1]

    # Parse key: 'value' pairs
    # Keys are like 'some-key': 'some value',
    translations = {}
    # Match: 'key': 'value'  (handles escaped quotes inside values)
    pair_pattern = r"'([^']+)'\s*:\s*'((?:[^'\\]|\\.)*)'"
    for m in re.finditer(pair_pattern, section_text):
        key = m.group(1)
        value = m.group(2)
        translations[key] = value

    return translations


def find_section_end(js_text, section):
    """Find the character position just before the closing } of a section."""
    pattern = rf"(?:^|\n)\s*{section}\s*:\s*\{{"
    match = re.search(pattern, js_text)
    if not match:
        return -1

    start = match.end()
    depth = 1
    i = start
    while i < len(js_text) and depth > 0:
        ch = js_text[i]
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
        elif ch == "'":
            i += 1
            while i < len(js_text) and js_text[i] != "'":
                if js_text[i] == '\\':
                    i += 1
                i += 1
        i += 1

    # i is now one past the closing }, we want the position of the }
    return i - 1


# ─── Unicode Escaping ────────────────────────────────────────────────────────

def escape_for_js(text):
    """
    Convert non-ASCII characters to \\uXXXX escape sequences for safe
    embedding in a JS single-quoted string. Also escapes single quotes.
    """
    result = []
    for ch in text:
        code = ord(ch)
        if ch == "'":
            result.append("\\'")
        elif ch == "\\":
            result.append("\\\\")
        elif code > 127:
            result.append(f"\\u{code:04x}")
        else:
            result.append(ch)
    return "".join(result)


# ─── Translation ─────────────────────────────────────────────────────────────

def translate_batch(keys_and_values, anthropic_client):
    """
    Translate a batch of EN key-value pairs to Canadian French using Claude.
    Returns dict of {key: fr_value} with Unicode-escaped values.
    """
    # Unescape the EN values for the prompt so Claude sees real text
    items = []
    for key, en_val in keys_and_values:
        # Decode JS unicode escapes for the prompt
        decoded = en_val.encode('raw_unicode_escape').decode('unicode_escape')
        items.append({"key": key, "en": decoded})

    prompt = f"""You are translating website content for Pebble Canada (pebblecanada.ca), a Canadian professional services firm. Translate each English value to **Canadian French**.

Rules:
1. Use Canadian French conventions (e.g. "courriel" not "e-mail", keep $ amounts as-is)
2. Preserve ALL HTML tags exactly (<strong>, <a href="...">, <br>, &amp; etc.) — do not translate URLs or HTML attributes
3. Keep proper nouns in English: "Pebble Canada", "NORAD", "NATO", "CPTPP", etc.
4. Use formal register (vous, not tu)
5. For short UI labels (nav items, buttons), keep them concise
6. Use proper French punctuation (espace insécable before : ; ! ?)

Return a JSON object mapping each key to its French translation. Return ONLY the JSON, no markdown fences.

Items to translate:
{json.dumps(items, ensure_ascii=False, indent=2)}"""

    response = anthropic_client.messages.create(
        model=MODEL,
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )

    # Parse the response
    response_text = response.content[0].text.strip()
    # Remove markdown fences if present
    if response_text.startswith("```"):
        response_text = re.sub(r"^```(?:json)?\s*\n?", "", response_text)
        response_text = re.sub(r"\n?```\s*$", "", response_text)

    try:
        translations = json.loads(response_text)
    except json.JSONDecodeError as e:
        print(f"ERROR: Failed to parse Claude response as JSON: {e}")
        print(f"Response was:\n{response_text[:500]}")
        sys.exit(1)

    # Escape for JS embedding
    result = {}
    for key, fr_val in translations.items():
        result[key] = escape_for_js(fr_val)

    return result


# ─── File Writing ────────────────────────────────────────────────────────────

def insert_translations(js_text, new_fr_keys):
    """
    Insert new FR translations at the end of the fr: {} section in lang.js.
    """
    insert_pos = find_section_end(js_text, "fr")
    if insert_pos == -1:
        print("ERROR: Could not find fr section end")
        sys.exit(1)

    # Build the new lines
    lines = ["\n      /* ── Auto-translated ── */\n"]
    for key, value in new_fr_keys.items():
        lines.append(f"      '{key}': '{value}',\n")

    insert_text = "".join(lines)

    # Insert before the closing }
    # Walk backwards from insert_pos to find the last non-whitespace
    return js_text[:insert_pos] + insert_text + js_text[insert_pos:]


def update_translations(js_text, updated_fr_keys):
    """
    Update existing FR translations in lang.js.
    """
    for key, new_value in updated_fr_keys.items():
        # Find and replace the existing key-value pair
        pattern = rf"('{re.escape(key)}'\s*:\s*')((?:[^'\\]|\\.)*)'(\s*,)"
        replacement = rf"\g<1>{new_value}'\3"
        js_text = re.sub(pattern, replacement, js_text, count=1)

    return js_text


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Auto-translate lang.js EN→FR via Claude API")
    parser.add_argument("--all", action="store_true", help="Re-translate ALL keys (full refresh)")
    parser.add_argument("--dry-run", action="store_true", help="Show what would change, don't write")
    parser.add_argument("--key", type=str, help="Translate a specific key only")
    parser.add_argument("--file", type=str, default=str(LANG_JS_PATH), help="Path to lang.js")
    args = parser.parse_args()

    lang_path = Path(args.file)
    if not lang_path.exists():
        print(f"ERROR: {lang_path} not found")
        sys.exit(1)

    # Check for API key
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key and not args.dry_run:
        print("ERROR: Set ANTHROPIC_API_KEY environment variable")
        print("  export ANTHROPIC_API_KEY='sk-ant-...'")
        sys.exit(1)

    js_text = lang_path.read_text(encoding="utf-8")

    # Parse both sections
    en_keys = extract_translations(js_text, "en")
    fr_keys = extract_translations(js_text, "fr")

    print(f"EN keys: {len(en_keys)}")
    print(f"FR keys: {len(fr_keys)}")

    # Determine what needs translating
    if args.key:
        if args.key not in en_keys:
            print(f"ERROR: Key '{args.key}' not found in EN section")
            sys.exit(1)
        to_translate = [(args.key, en_keys[args.key])]
        mode = "update" if args.key in fr_keys else "insert"
    elif args.all:
        to_translate = list(en_keys.items())
        mode = "update_all"
    else:
        # Find missing keys
        missing = [(k, v) for k, v in en_keys.items() if k not in fr_keys]
        to_translate = missing
        mode = "insert"

    if not to_translate:
        print("\nAll EN keys already have FR translations. Nothing to do.")
        print("Use --all to force re-translation of everything.")
        return

    print(f"\nKeys to translate: {len(to_translate)}")

    if args.dry_run:
        print("\n--- DRY RUN (no changes will be made) ---")
        for key, val in to_translate:
            decoded = val.encode('raw_unicode_escape').decode('unicode_escape')
            status = "MISSING" if key not in fr_keys else "UPDATE"
            print(f"  [{status}] {key}: {decoded[:80]}{'...' if len(decoded) > 80 else ''}")
        return

    # Initialize Anthropic client
    try:
        from anthropic import Anthropic
    except ImportError:
        print("ERROR: anthropic package not installed")
        print("  pip install anthropic")
        sys.exit(1)

    client = Anthropic(api_key=api_key)

    # Translate in batches
    all_translations = {}
    for i in range(0, len(to_translate), BATCH_SIZE):
        batch = to_translate[i:i + BATCH_SIZE]
        batch_num = (i // BATCH_SIZE) + 1
        total_batches = (len(to_translate) + BATCH_SIZE - 1) // BATCH_SIZE
        print(f"\nTranslating batch {batch_num}/{total_batches} ({len(batch)} keys)...")

        translated = translate_batch(batch, client)
        all_translations.update(translated)
        print(f"  Translated {len(translated)} keys")

    # Apply translations to lang.js
    if mode == "insert":
        js_text = insert_translations(js_text, all_translations)
    elif mode == "update_all":
        # Split into updates (existing) and inserts (new)
        updates = {k: v for k, v in all_translations.items() if k in fr_keys}
        inserts = {k: v for k, v in all_translations.items() if k not in fr_keys}
        if updates:
            js_text = update_translations(js_text, updates)
        if inserts:
            js_text = insert_translations(js_text, inserts)
    elif mode == "update":
        if args.key in fr_keys:
            js_text = update_translations(js_text, all_translations)
        else:
            js_text = insert_translations(js_text, all_translations)

    # Write back
    lang_path.write_text(js_text, encoding="utf-8")
    print(f"\nWrote updated lang.js ({len(all_translations)} translations)")
    print("Review the changes with: git diff assets/js/lang.js")


if __name__ == "__main__":
    main()
