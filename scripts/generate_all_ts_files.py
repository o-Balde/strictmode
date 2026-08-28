import os
import json

def to_ts_string(val, indent_level=0):
    indent = "  " * indent_level
    if val is None:
        return "undefined"
    elif isinstance(val, bool):
        return "true" if val else "false"
    elif isinstance(val, (int, float)):
        return str(val)
    elif isinstance(val, str):
        # Escape string safely
        escaped = json.dumps(val)
        return escaped
    elif isinstance(val, list):
        if not val:
            return "[]"
        items = ",\n".join(f"{indent}  {to_ts_string(item, indent_level + 1)}" for item in val)
        return f"[\n{items}\n{indent}]"
    elif isinstance(val, dict):
        if not val:
            return "{}"
        items = []
        for k, v in val.items():
            if v is not None:
                items.append(f"{indent}  {k}: {to_ts_string(v, indent_level + 1)}")
        joined = ",\n".join(items)
        return f"{{\n{joined}\n{indent}}}"
    return "undefined"

def main():
    with open('src/data/questions.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)

    groups = {
        'react-hooks.ts': ('REACT_HOOKS_QUESTIONS', []),
        'react-rendering.ts': ('REACT_RENDERING_QUESTIONS', []),
        'typescript.ts': ('TYPESCRIPT_QUESTIONS', []),
        'nextjs-rsc.ts': ('NEXTJS_RSC_QUESTIONS', []),
        'javascript-core.ts': ('JAVASCRIPT_CORE_QUESTIONS', []),
        'performance.ts': ('PERFORMANCE_QUESTIONS', []),
        'system-design.ts': ('SYSTEM_DESIGN_QUESTIONS', []),
        'algorithms-dsa.ts': ('ALGORITHMS_DSA_QUESTIONS', []),
        'live-coding.ts': ('LIVE_CODING_QUESTIONS', []),
        'fix-the-bug.ts': ('FIX_THE_BUG_QUESTIONS', []),
        'puzzles.ts': ('PUZZLE_QUESTIONS', [])
    }

    for q in questions:
        qtype = q.get('type')
        cat = q.get('category')
        sub = q.get('subject')

        if qtype == 'live_code':
            groups['live-coding.ts'][1].append(q)
        elif qtype == 'fix':
            groups['fix-the-bug.ts'][1].append(q)
        elif qtype == 'puzzle':
            groups['puzzles.ts'][1].append(q)
        elif cat == 'algorithms' or sub == 'data-structures':
            groups['algorithms-dsa.ts'][1].append(q)
        elif cat == 'nextjs' or sub == 'server-components':
            groups['nextjs-rsc.ts'][1].append(q)
        elif cat == 'typescript' or sub in ['generics', 'narrowing', 'types']:
            groups['typescript.ts'][1].append(q)
        elif cat == 'performance' or sub == 'performance':
            groups['performance.ts'][1].append(q)
        elif cat == 'system_design' or sub in ['system-architecture', 'data-fetching', 'state-management']:
            groups['system-design.ts'][1].append(q)
        elif cat == 'javascript' or sub in ['closures', 'event-loop', 'async-await', 'design-patterns']:
            groups['javascript-core.ts'][1].append(q)
        elif sub == 'hooks':
            groups['react-hooks.ts'][1].append(q)
        else:
            groups['react-rendering.ts'][1].append(q)

    os.makedirs('src/data/questions', exist_ok=True)

    for filename, (const_name, qlist) in groups.items():
        filepath = os.path.join('src/data/questions', filename)
        ts_code = f"import {{ QuizQuestion }} from '../types';\n\n"
        ts_code += f"export const {const_name}: QuizQuestion[] = {to_ts_string(qlist, 0)};\n"

        with open(filepath, 'w', encoding='utf-8') as out:
            out.write(ts_code)

        print(f"Wrote {filepath}: {len(qlist)} questions ({os.path.getsize(filepath)} bytes)")

    print("\nAll TypeScript question modules successfully generated and updated!")

if __name__ == '__main__':
    main()
