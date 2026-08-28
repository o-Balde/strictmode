"""
Extract question material from the MHTML sources in _REFERENCES/_QUIZ/.

The earlier pass decoded these archives without a charset (they declare none)
and so wrote U+FFFD all through the bank's prose. Everything here decodes as
UTF-8 explicitly and strips the site chrome each publisher wraps its content in.

Output is intermediate JSON under scratch/extracted/ — raw material for
authoring question records, not question records itself.

    python3 scripts/extract_quiz_sources.py
"""

import email
import email.policy
import json
import os
import re
import sys
from html.parser import HTMLParser

QUIZ_DIR = "_REFERENCES/_QUIZ"
OUT_DIR = "scratch/extracted"

BLOCK_TAGS = {
    "h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote",
    "tr", "dt", "dd", "div", "section", "br",
}
SKIP_TAGS = {"script", "style", "noscript", "svg", "head", "nav", "footer"}

PRE_MARK = "\x00PRE\x00"
HEAD_MARK = "\x00H"   # followed by the heading level and a NUL, e.g. "\x00H2\x00"


class _TextExtractor(HTMLParser):
    """Flatten HTML to lines, keeping <pre> blocks intact and marked."""

    HEADINGS = {"h1", "h2", "h3", "h4"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lines = []
        self._buf = []
        self._skip = 0
        self._pre = 0
        self._head = []

    def _flush(self):
        text = "".join(self._buf)
        self._buf = []
        if self._pre:
            body = text.strip("\n")
            if body.strip():
                self.lines.append(PRE_MARK + body)
        else:
            collapsed = re.sub(r"[ \t\xa0]+", " ", text).strip()
            if collapsed:
                if self._head:
                    collapsed = f"{HEAD_MARK}{self._head[-1][1]}\x00{collapsed}"
                self.lines.append(collapsed)

    def handle_starttag(self, tag, attrs):
        if tag in SKIP_TAGS:
            self._skip += 1
        elif tag == "pre":
            self._flush()
            self._pre += 1
        elif tag in BLOCK_TAGS:
            self._flush()
            if tag in self.HEADINGS:
                self._head.append((tag, tag[1]))

    def handle_endtag(self, tag):
        if tag in SKIP_TAGS:
            self._skip = max(0, self._skip - 1)
        elif tag == "pre":
            self._flush()
            self._pre = max(0, self._pre - 1)
        elif tag in BLOCK_TAGS:
            self._flush()
            if tag in self.HEADINGS and self._head:
                self._head.pop()

    def handle_data(self, data):
        if not self._skip:
            self._buf.append(data)

    def close(self):
        super().close()
        self._flush()


def mhtml_lines(path):
    """Largest text/html part of an MHTML archive, flattened to lines."""
    with open(path, "rb") as fh:
        msg = email.message_from_binary_file(fh, policy=email.policy.default)

    best = []
    for part in msg.walk():
        if part.get_content_type() != "text/html":
            continue
        raw = part.get_payload(decode=True) or b""
        # These archives declare no charset; every source page is UTF-8.
        parser = _TextExtractor()
        try:
            parser.feed(raw.decode("utf-8", errors="replace"))
            parser.close()
        except Exception:
            continue
        if len(parser.lines) > len(best):
            best = parser.lines
    return best


def find_source(prefix):
    for name in sorted(os.listdir(QUIZ_DIR)):
        if name.startswith(prefix):
            return os.path.join(QUIZ_DIR, name)
    raise SystemExit(f"no source file starting with {prefix!r}")


def is_code(line):
    return line.startswith(PRE_MARK)


HEAD_RE = re.compile(r"^\x00H(\d)\x00")


def heading_level(line):
    """1-4 for a heading line, None otherwise."""
    m = HEAD_RE.match(line)
    return int(m.group(1)) if m else None


def plain(line):
    return HEAD_RE.sub("", line, count=1)


def code_of(line):
    # CoderPad appends a language label to every snippet.
    body = line[len(PRE_MARK):]
    return re.sub(r"Code language:.*$", "", body).rstrip()


# --- DEV Community: "N. Title" then prose, then "Answer:" ------------------

DEV_NOISE = re.compile(
    r"^(Enter fullscreen mode|Exit fullscreen mode|Top comments|Code of Conduct|"
    r"Report abuse|Add Comment|Sign up|Log in|Follow|Subscribe|More from|"
    r"Read next|Discussion \(|Templates|Personal Trusted User|Create template|"
    r"Are you sure you want to hide this comment)",
    re.I,
)


def parse_dev_numbered(lines, expected):
    """Sources that number their questions as a top-level list."""
    heading = re.compile(r"^(\d{1,2})[\.\)]\s+(\S.*)$")

    starts = []
    for i, line in enumerate(lines):
        # Only a top-level heading starts a question. These pages also number
        # sub-points (as <h4>) inside an answer.
        level = None if is_code(line) else heading_level(line)
        if level is None or level > 2:
            continue
        m = heading.match(plain(line))
        if not m:
            continue
        n = int(m.group(1))
        title = m.group(2).strip()
        # Only accept a heading that continues the run 1,2,3,… — these pages
        # also contain numbered lists *inside* an answer.
        want = len(starts) + 1
        if n == want and len(title) > 12:
            starts.append((i, n, title))
        if len(starts) == expected:
            break

    items = []
    for idx, (start, number, title) in enumerate(starts):
        end = starts[idx + 1][0] if idx + 1 < len(starts) else len(lines)
        body = lines[start + 1:end]

        topic = difficulty = None
        prompt_parts, answer_parts, code, answer_code = [], [], [], []
        in_answer = False

        for raw in body:
            if is_code(raw):
                (answer_code if in_answer else code).append(code_of(raw))
                continue
            line = plain(raw)
            if DEV_NOISE.match(line):
                continue
            m = re.match(r"^Topic:\s*(.+?)\s*[·|]\s*Difficulty:\s*\W*\s*(\w+)", line)
            if m:
                topic, difficulty = m.group(1).strip(), m.group(2).strip()
                continue
            if re.match(r"^Answer:?$", line, re.I):
                in_answer = True
                continue
            if line.startswith("📖") or line.startswith("🔗"):
                continue
            (answer_parts if in_answer else prompt_parts).append(line)

        items.append({
            "number": number,
            "title": title,
            "topic": topic,
            "difficulty": difficulty,
            "prompt": "\n".join(prompt_parts).strip(),
            "answer": "\n".join(answer_parts).strip(),
            "code": code,
            "answerCode": answer_code,
        })
    return items


# --- CoderPad: level sections, then "Question:" / "Answer:" pairs ----------

def parse_coderpad(lines):
    level_of = None
    items = []
    current = None
    field = None

    level_heading = re.compile(
        r"^(Junior|Intermediate|Senior)\s+TypeScript interview questions\s*$", re.I
    )
    stop_heading = re.compile(r"^Interview best practices", re.I)

    started = False
    for raw in lines:
        line = raw if is_code(raw) else plain(raw)
        if not is_code(line):
            m = level_heading.match(line)
            if m:
                level_of = m.group(1).lower()
                started = True
                continue
            if stop_heading.match(line):
                break
        if not started:
            continue

        if not is_code(line) and re.match(r"^Question:?$", line, re.I):
            if current and current["prompt"]:
                items.append(current)
            current = {
                "level": level_of, "prompt": [], "answer": [],
                "code": [], "answerCode": [],
            }
            field = "prompt"
            continue
        if not is_code(line) and re.match(r"^Answer:?$", line, re.I):
            if current:
                field = "answer"
            continue
        if current is None:
            continue

        if is_code(line):
            current["code" if field == "prompt" else "answerCode"].append(code_of(line))
        else:
            current[field].append(line)

    if current and current["prompt"]:
        items.append(current)

    out = []
    for it in items:
        prompt = "\n".join(it["prompt"]).strip()
        out.append({
            "level": it["level"],
            "title": prompt.split("\n")[0][:120],
            "prompt": prompt,
            "answer": "\n".join(it["answer"]).strip(),
            "code": it["code"],
            "answerCode": it["answerCode"],
        })
    return out


# --- Post-passes for sources that do not use an "Answer:" separator --------

# The advanced-JS source marks its sections with emoji headings instead.
JS_SECTION = re.compile(r"^(?:\u2705\s*Output|\U0001F9E0\s*Explanation|\U0001F511\s*Core Concept|"
                        r"\u26A0\uFE0F?\s*\w+|\U0001F4A1\s*\w+)")


def split_emoji_sections(items):
    """advanced-javascript-6: '<question>' then 'Output' / 'Explanation' blocks."""
    for it in items:
        lines = it["prompt"].split("\n")
        question, explanation = [], []
        in_answer = False
        for line in lines:
            if JS_SECTION.match(line):
                in_answer = True
                continue
            (explanation if in_answer else question).append(line)
        it["prompt"] = "\n".join(question).strip()
        it["answer"] = "\n".join(explanation).strip()
    return items


def title_is_the_question(items):
    """react-17-2025: the heading asks it, everything below answers it."""
    for it in items:
        if not it["answer"]:
            it["answer"] = it["prompt"]
            it["prompt"] = it["title"]
    return items


SOURCES = [
    ("tricky-typescript-12", "12 Tricky", parse_dev_numbered, 12, None),
    ("react-17-2025", "17 React", parse_dev_numbered, 17, title_is_the_question),
    ("advanced-javascript-6", "6 Advanced", parse_dev_numbered, 6, split_emoji_sections),
    ("coderpad-typescript", "25+ TypeScript", parse_coderpad, None, None),
]


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    summary = []
    for key, prefix, parser, expected, post in SOURCES:
        path = find_source(prefix)
        lines = mhtml_lines(path)
        items = parser(lines, expected) if expected is not None else parser(lines)
        if post:
            items = post(items)
        with open(os.path.join(OUT_DIR, f"{key}.json"), "w") as fh:
            json.dump({"source": key, "file": os.path.basename(path), "items": items},
                      fh, indent=2, ensure_ascii=False)
        bad = sum(json.dumps(items, ensure_ascii=False).count("�") for _ in [0])
        summary.append((key, len(items), bad))
        print(f"  {len(items):3d} items  {key:24s} ({os.path.basename(path)[:44]})")

    total = sum(n for _, n, _ in summary)
    broken = sum(b for _, _, b in summary)
    print(f"\n  {total} items extracted · {broken} replacement characters")
    if broken:
        print("  WARNING: decoding still lossy", file=sys.stderr)


if __name__ == "__main__":
    main()
