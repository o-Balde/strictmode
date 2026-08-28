"""
Merge the authored question sets into src/data/questions.json.

questions.json is the source of truth for the bank; generate_all_ts_files.py
routes it into the per-topic modules under src/data/questions/. So new material
is added here and regenerated, never hand-edited into the .ts files.

Idempotent: re-running replaces any previously merged record with the same id
rather than appending a duplicate.

    python3 scripts/merge_authored_questions.py
"""

import hashlib
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "authored"))

import advanced_javascript
import coderpad_typescript
import react_17
import tricky_typescript
import typescript_masterclass

BANK = "src/data/questions.json"

MODULES = [
    tricky_typescript,
    coderpad_typescript,
    react_17,
    advanced_javascript,
    typescript_masterclass,
]

VALID_LEVELS = {"junior", "intermediate", "senior"}
VALID_TYPES = {"concept", "output", "puzzle", "live_code", "fix"}
VALID_CATEGORIES = {
    "react", "typescript", "nextjs", "javascript",
    "performance", "system_design", "algorithms",
}
VALID_SUBJECTS = {
    "hooks", "rendering-keys", "generics", "narrowing", "state-management",
    "server-components", "performance", "closures", "event-loop", "async-await",
    "types", "design-patterns", "data-fetching", "concurrency",
    "system-architecture", "data-structures",
}
VALID_LANGS = {"typescript", "javascript", "tsx", "jsx", "css", "json"}


def rotate(options, seed):
    """
    Rotate an authored option list by a stable amount derived from the question
    id, then relabel A-D by position.

    Authoring naturally puts the correct answer wherever the explanation reads
    best, which clusters it. The whole pre-existing bank has its answer at A on
    every single question, which makes it answerable without reading. Rotating
    by a hash keeps the spread even and is reproducible across runs.
    """
    digest = hashlib.sha256(seed.encode("utf-8")).digest()
    shift = digest[0] % len(options)
    rotated = options[shift:] + options[:shift]
    labels = ["A", "B", "C", "D"]
    return [{**opt, "id": labels[i]} for i, opt in enumerate(rotated)]


def build(module):
    """Expand a module's compact records into full QuizQuestion objects."""
    out = []
    for q in module.QUESTIONS:
        options = rotate(
            [
                {"id": oid, "text": text, "isCorrect": correct, "explanation": why}
                for oid, text, correct, why in q["options"]
            ],
            q["id"],
        )
        correct_id = next(o["id"] for o in options if o["isCorrect"])

        record = {
            "id": q["id"],
            "title": q["title"],
            "prompt": q["prompt"],
            "level": q.get("level", getattr(module, "LEVEL", "intermediate")),
            "type": q.get("type", "concept"),
            "category": q.get("category", module.CATEGORY),
            "subject": q["subject"],
            "tags": q["tags"],
            "codeSnippet": q.get("codeSnippet"),
            "codeLanguage": q.get("lang", getattr(module, "LANG", "typescript")),
            "options": options,
            "correctAnswer": correct_id,
            "explanation": q["explanation"],
            "interviewLine": q["interviewLine"],
            "misconception": q.get("misconception"),
            "hints": q.get("hints", []),
            "source": module.SOURCE,
            "estimatedMinutes": q.get("minutes", 2),
        }
        out.append(record)
    return out


def validate(records, existing_ids):
    errors = []
    seen = set()
    for q in records:
        where = q["id"]
        if q["id"] in seen:
            errors.append(f"{where}: duplicate id within the authored set")
        seen.add(q["id"])
        if q["level"] not in VALID_LEVELS:
            errors.append(f"{where}: bad level {q['level']!r}")
        if q["type"] not in VALID_TYPES:
            errors.append(f"{where}: bad type {q['type']!r}")
        if q["category"] not in VALID_CATEGORIES:
            errors.append(f"{where}: bad category {q['category']!r}")
        if q["subject"] not in VALID_SUBJECTS:
            errors.append(f"{where}: bad subject {q['subject']!r}")
        if q["codeLanguage"] not in VALID_LANGS:
            errors.append(f"{where}: bad codeLanguage {q['codeLanguage']!r}")
        if len(q["options"]) != 4:
            errors.append(f"{where}: {len(q['options'])} options, expected 4")
        if sum(1 for o in q["options"] if o["isCorrect"]) != 1:
            errors.append(f"{where}: not exactly one correct option")
        if [o["id"] for o in q["options"]] != ["A", "B", "C", "D"]:
            errors.append(f"{where}: option ids must be A-D in order")
        for field in ("title", "prompt", "explanation", "interviewLine"):
            if not q[field].strip():
                errors.append(f"{where}: empty {field}")
        # The bank's earlier pass left scraped navigation and mojibake in its
        # prose; nothing new should reintroduce either.
        blob = json.dumps(q, ensure_ascii=False)
        if "�" in blob:
            errors.append(f"{where}: contains a replacement character")
        if "Back to Top" in blob:
            errors.append(f"{where}: contains scraped navigation text")
    return errors


def main():
    with open(BANK, encoding="utf-8") as fh:
        bank = json.load(fh)

    authored = []
    for module in MODULES:
        authored.extend(build(module))

    existing = {q["id"] for q in bank}
    errors = validate(authored, existing)
    if errors:
        print("validation failed:")
        for e in errors:
            print("  -", e)
        raise SystemExit(1)

    # Idempotent merge: replace by id, otherwise append.
    by_id = {q["id"]: q for q in authored}
    merged = [by_id.pop(q["id"], q) for q in bank]
    added = [q for q in authored if q["id"] in by_id]
    merged.extend(added)

    with open(BANK, "w", encoding="utf-8") as fh:
        json.dump(merged, fh, indent=2, ensure_ascii=False)

    print(f"  bank: {len(bank)} -> {len(merged)} questions ({len(added)} added, "
          f"{len(authored) - len(added)} updated in place)")
    for module in MODULES:
        n = sum(1 for q in authored if q["source"] == module.SOURCE)
        print(f"    {n:3d}  {module.SOURCE}")


if __name__ == "__main__":
    main()
