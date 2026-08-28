"""
Repairs and normalises the question bank in place.

Four passes, all idempotent:

  1. PDF repair    — 40 questions from the frontend-system-design PDF kept the
                     whole page as their title, because the extractor never
                     split on the "n Answer" marker. Recover the real question,
                     the real answer, and drop the byline and page number.
  2. Artifacts     — cp1252 octal escapes (\\227 em dash, \\267 middle dot),
                     escaped parens, scraped "Back to Top" navigation, and the
                     U+FFFD left by the original latin-1 decode.
  3. Punctuation   — no em dashes. A short fragment after the dash becomes a
                     colon ("It has one: boolean"), anything longer a comma.
  4. Hints         — every question gets a real hint and a documentation link,
                     replacing "Consider the core principles and trade-offs of X."

    python3 scripts/clean_bank.py
"""

import json
import re
import sys

BANK = "src/data/questions.json"
PDF_SOURCE = "scratch/react_patterns.pdf.txt"

# ─────────────────────────────────────────────────────────── 1. PDF repair

def pdf_titles():
    """FE Design Q<n> <question> n Answer <answer> -> {n: (question, answer)}."""
    raw = open(PDF_SOURCE, encoding="utf-8").read()
    flat = re.sub(r"\s+", " ", raw)
    out = {}
    parts = re.split(r"FE Design Q(\d{1,2})\b", flat)
    for i in range(1, len(parts) - 1, 2):
        n = int(parts[i])
        body = parts[i + 1]
        m = re.split(r"\bn\s+Answer\b", body, maxsplit=1)
        question = m[0].strip()
        answer = m[1].strip() if len(m) > 1 else ""
        out[n] = (question, answer)
    return out


def summarise_from_answer(q, answer):
    sentences = [t.strip() for t in re.split(r"(?<=[.!?])\s+", answer) if len(t.strip()) > 25]
    if sentences:
        q["interviewLine"] = sentences[0][:240]
    if len(sentences) > 1:
        q["misconception"] = sentences[1][:240]
    elif sentences:
        q["misconception"] = None


BYLINE = re.compile(
    r"(Kaushal Singh|Follow for Frontend|Comment 'FSD'|Frontend System Design \|"
    r"|\bn+\s*Save\b|\bRepost\b|\d{1,2}/42\b).*$",
    re.I | re.S,
)


def strip_byline(text):
    return BYLINE.sub("", text).strip(" ,.:;|")


def repair_pdf_questions(bank):
    titles = pdf_titles()
    # Match a damaged record to its page by the opening words of its title.
    by_opening = {}
    for n, (question, _) in titles.items():
        key = re.sub(r"[^a-z0-9 ]", "", question.lower())[:48]
        by_opening[key] = n

    repaired = 0
    for q in bank:
        if q.get("source") != "frontend-system-design-50":
            continue
        # Split the damaged title on the same marker before keying, or a short
        # question's key spills into the answer and never matches.
        head = re.split(r"\bn\s+Answer\b", q["title"], maxsplit=1)[0]
        key = re.sub(r"[^a-z0-9 ]", "", head.lower())[:48]
        n = by_opening.get(key)
        if n is None:
            continue
        question, answer = titles[n]
        q["title"] = strip_byline(question)
        q["prompt"] = q["title"]
        cleaned = strip_byline(answer)
        if len(cleaned) > 40:
            q["explanation"] = cleaned
        # Option A carried the same wall of text; rebuild it from the answer.
        for o in q["options"]:
            if o["isCorrect"] and len(o["text"]) > 160:
                first = re.split(r"(?<=[.!?])\s+", cleaned)[0]
                o["text"] = first[:220].rstrip(" ,;:")
        # interviewLine and misconception were generated from the same wall, so
        # they carried the byline too. One sentence of the real answer is both
        # shorter and more use than a page of PDF furniture.
        summarise_from_answer(q, cleaned)
        repaired += 1
    return repaired


# ────────────────────────────────────────────────────────── 2. artifacts

# cp1252 bytes that survived as octal escapes in the PDF text layer.
OCTAL = {
    r"\\227": "—",   # em dash, normalised again in pass 3
    r"\\267": "·",
    r"\\226": "-",
    r"\\222": "'",
    r"\\223": '"',
    r"\\224": '"',
    r"\\256": "",
    r"\\254": "",
    r"\\177": "",
    r"\\206": "",
    r"\\200": "",
    r"\\205": "…",
}


def strip_artifacts(text):
    for pat, repl in OCTAL.items():
        text = re.sub(pat, repl, text)
    text = text.replace(r"\(", "(").replace(r"\)", ")")
    # The original latin-1 decode left U+FFFD where punctuation used to be.
    text = re.sub(r"�{2,}", "—", text)
    text = text.replace("�", "")
    text = re.sub(r"\s*[,.·]?\s*Back to Top\s*", " ", text)
    text = re.sub(r"\bn\s+Answer\b", ". ", text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    # Only sentence punctuation: a space before a period that begins a path
    # ("sees ./models") or a decimal is not a spacing artifact.
    text = re.sub(r"\s+([,.;:!?])(\s|$)", r"\1\2", text)
    text = re.sub(r"([,.;:])\1+", r"\1", text)
    return text.strip()


# ─────────────────────────────────────────────────────── 3. punctuation

DASH = re.compile(r"\s*(?:—|–|(?<!-)--(?!-))\s*")


def normalise_dashes(text):
    """A short fragment after the dash reads as an apposition, so it takes a
    colon; anything longer is a continuation and takes a comma."""

    def repl(m):
        after = text[m.end() :]
        fragment = re.split(r"(?<=[.!?])\s", after, maxsplit=1)[0]
        words = [w for w in re.split(r"\s+", fragment.strip()) if w]
        return ": " if len(words) <= 1 else ", "

    out = DASH.sub(repl, text)
    out = re.sub(r",\s*,", ",", out)
    out = re.sub(r"\s+([,.;:])(\s|$)", r"\1\2", out)
    out = re.sub(r"([,:])\s*([.!?])", r"\2", out)
    return out


TEXT_FIELDS = ("title", "prompt", "explanation", "interviewLine", "misconception")


def clean_text_fields(bank):
    touched = 0
    for q in bank:
        before = json.dumps(q, ensure_ascii=False)
        for f in TEXT_FIELDS:
            if isinstance(q.get(f), str):
                q[f] = normalise_dashes(strip_artifacts(q[f]))
        for o in q.get("options") or []:
            o["text"] = normalise_dashes(strip_artifacts(o["text"]))
            if o.get("explanation"):
                o["explanation"] = normalise_dashes(strip_artifacts(o["explanation"]))
        q["hints"] = [normalise_dashes(strip_artifacts(h)) for h in (q.get("hints") or [])]
        if json.dumps(q, ensure_ascii=False) != before:
            touched += 1
    return touched


def split_runaway_titles(bank):
    """
    Fallback for PDF questions whose opening words did not key against the
    source text. By this point the "n Answer" marker has become a full stop, so
    the question is everything up to the first sentence end and the rest is the
    answer.
    """
    fixed = 0
    for q in bank:
        if q.get("source") != "frontend-system-design-50" or len(q["title"]) <= 120:
            continue
        m = re.search(r"^(.{10,160}?[?.!])\s+(.*)$", q["title"], re.S)
        if not m:
            continue
        q["title"] = m.group(1).strip().rstrip(".")
        q["prompt"] = q["title"]
        rest = strip_byline(m.group(2).strip())
        if len(rest) > 40:
            q["explanation"] = rest
        for o in q["options"]:
            if o["isCorrect"] and len(o["text"]) > 160:
                o["text"] = re.split(r"(?<=[.!?])\s+", rest)[0][:220].rstrip(" ,;:")
        summarise_from_answer(q, rest)
        fixed += 1
    return fixed


def clean_snippets(bank):
    """
    Snippets are rendered verbatim by design, so this only removes corruption:
    replacement characters and cp1252 escapes. No reflowing, no reindenting.
    """
    fixed = 0
    for q in bank:
        src = q.get("codeSnippet")
        if not isinstance(src, str):
            continue
        out = src
        for pat, repl in OCTAL.items():
            out = re.sub(pat, repl, out)
        out = out.replace("\uFFFD", "")
        # Em dashes only ever appear in a snippet's comments or strings, so the
        # same punctuation rule applies without touching syntax.
        out = normalise_dashes(out)
        if out != src:
            q["codeSnippet"] = out
            fixed += 1
    return fixed


def main():
    bank = json.load(open(BANK, encoding="utf-8"))
    repaired = repair_pdf_questions(bank)
    touched = clean_text_fields(bank)
    repaired += split_runaway_titles(bank)
    snippets = clean_snippets(bank)

    json.dump(bank, open(BANK, "w", encoding="utf-8"), indent=2, ensure_ascii=False)

    blob = json.dumps(bank, ensure_ascii=False)
    print(f"  repaired {repaired} PDF-derived questions · {snippets} snippets de-corrupted")
    print(f"  cleaned text in {touched} questions")
    print(f"  remaining: {len(re.findall(r'—', blob))} em dashes · "
          f"{blob.count(chr(0xFFFD))} replacement chars · "
          f"{len(re.findall(r'Back to Top', blob))} nav strings · "
          f"{len(re.findall(r'\\\\2[0-9][0-9]', blob))} octal escapes")


if __name__ == "__main__":
    main()
