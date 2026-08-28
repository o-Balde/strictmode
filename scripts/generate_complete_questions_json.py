import os
import re
import json
import email
import email.policy
import html
import base64
import zlib
from html.parser import HTMLParser

class MhtmlExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.blocks = []
        self.tag_stack = []
        self.in_pre = False
        self.text_buf = []

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append(tag)
        if tag == 'pre':
            self.in_pre = True
            self.flush()
        elif tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'blockquote', 'tr']:
            self.flush()

    def handle_endtag(self, tag):
        if tag == 'pre':
            self.in_pre = False
            self.flush(is_code=True)
        elif tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'blockquote', 'tr']:
            self.flush(tag=tag)
        if self.tag_stack and self.tag_stack[-1] == tag:
            self.tag_stack.pop()

    def handle_data(self, data):
        self.text_buf.append(data)

    def flush(self, is_code=False, tag=None):
        txt = ''.join(self.text_buf).strip()
        self.text_buf = []
        if txt:
            curr_tag = tag or (self.tag_stack[-1] if self.tag_stack else 'div')
            self.blocks.append({
                'tag': curr_tag,
                'text': txt,
                'is_code': is_code
            })

def parse_mhtml(path):
    with open(path, 'rb') as f:
        msg = email.message_from_binary_file(f, policy=email.policy.default)
    for part in msg.walk():
        if part.get_content_type() == 'text/html':
            parser = MhtmlExtractor()
            parser.feed(part.get_content())
            return parser.blocks
    return []

def extract_pdf_pages(pdf_path):
    with open(pdf_path, 'rb') as f:
        data = f.read()
    pattern = re.compile(rb'(\d+)\s+0\s+obj\s*<<(.*?)>>\s*stream\r?\n(.*?)\r?\nendstream', re.DOTALL)
    pages_text = []
    for m in pattern.finditer(data):
        raw = m.group(3).rstrip(b'\r\n')
        try:
            a85 = base64.a85decode(raw, adobe=True)
            decomp = zlib.decompress(a85)
            tjs = re.findall(rb'\((.*?)\)\s*Tj', decomp)
            if tjs:
                pages_text.append(' '.join(t.decode('latin1', errors='ignore') for t in tjs))
        except Exception:
            pass
    return '\n\n'.join(pages_text)

def extract_dsa_pdf(pdf_path):
    with open(pdf_path, 'rb') as f:
        content = f.read()
    streams = re.findall(rb'stream[\r\n]+(.*?)[\r\n]+endstream', content, re.DOTALL)
    text_chunks = []
    for s in streams:
        try:
            decomp = zlib.decompress(s)
            strings = re.findall(rb'\((.*?)\)\s*Tj', decomp)
            if strings:
                text_chunks.append(' '.join(st.decode('latin1', errors='ignore') for st in strings))
            tj_arrays = re.findall(rb'\[(.*?)\]\s*TJ', decomp, re.DOTALL)
            for arr in tj_arrays:
                parts = re.findall(rb'\((.*?)\)', arr)
                if parts:
                    text_chunks.append(''.join(p.decode('latin1', errors='ignore') for p in parts))
        except Exception:
            pass
    return '\n'.join(text_chunks)

def slugify(text):
    text = text.lower()
    text = re.sub(r'^(?:\d+[\.\:]\s*|\d+[\)\.]\s*|q\d+[\.\:\s]+)', '', text)
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    return text[:55].strip('-')

def clean_title(title):
    t = re.sub(r'^(?:\d+[\.\:]\s*|\d+[\)\.]\s*|q\d+[\.\:\s]+)', '', title).strip()
    return t

def clean_text(text):
    text = re.sub(r'Download PDF.*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Your requested download is ready!.*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Enter fullscreen mode.*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Exit fullscreen mode.*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Copy link.*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Share to (?:X|LinkedIn|Facebook|Mastodon).*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Report Abuse.*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'#\w+', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def classify(title, body_text):
    combined = (title + ' ' + body_text).lower()

    category = 'react'
    if any(k in combined for k in ['next.js', 'nextjs', 'app router', 'server component', 'rsc', 'server action']):
        category = 'nextjs'
    elif any(k in combined for k in ['typescript', 'generic', 'interface vs type', 'narrowing', 'type predicate', 'infer', 'satisfies']):
        category = 'typescript'
    elif any(k in combined for k in ['system design', 'micro-frontend', 'architecture', 'scalability', 'design system', 'caching layer', 'offline']):
        category = 'system_design'
    elif any(k in combined for k in ['dsa', 'algorithm', 'binary search', 'two sum', 'interval', 'majority element', 'lru', 'stack', 'queue', 'graph', 'linked list']):
        category = 'algorithms'
    elif any(k in combined for k in ['closure', 'event loop', 'microtask', 'hoisting', 'prototype', 'coercion', 'temporal dead zone', 'promise.all']):
        category = 'javascript'
    elif any(k in combined for k in ['performance', 'bundle', 'waterfall', 'memo', 'rerender', 'tree shaking', 'lazy load', 'virtualization']):
        category = 'performance'

    subject = 'hooks'
    if 'hook' in combined or 'useeffect' in combined or 'usestate' in combined or 'usememo' in combined or 'useref' in combined or 'usecallback' in combined or 'usecontext' in combined:
        subject = 'hooks'
    elif 'key' in combined or 'render' in combined or 'virtual dom' in combined or 'reconciliation' in combined or 'fiber' in combined or 'fragment' in combined or 'element' in combined:
        subject = 'rendering-keys'
    elif 'generic' in combined or 'infer' in combined or 'conditional type' in combined or 'mapped type' in combined:
        subject = 'generics'
    elif 'narrow' in combined or 'predicate' in combined or 'guard' in combined:
        subject = 'narrowing'
    elif 'type' in combined or 'interface' in combined or 'tsconfig' in combined:
        subject = 'types'
    elif 'server component' in combined or 'rsc' in combined or 'app router' in combined or 'server action' in combined:
        subject = 'server-components'
    elif 'waterfall' in combined or 'bundle' in combined or 'memo' in combined or 'lazy' in combined or 'optimization' in combined:
        subject = 'performance'
    elif 'closure' in combined or 'scope' in combined or 'hoisting' in combined:
        subject = 'closures'
    elif 'event loop' in combined or 'microtask' in combined or 'macrotask' in combined:
        subject = 'event-loop'
    elif 'async' in combined or 'await' in combined or 'promise' in combined:
        subject = 'async-await'
    elif 'state' in combined or 'redux' in combined or 'zustand' in combined or 'context' in combined:
        subject = 'state-management'
    elif 'fetch' in combined or 'cache' in combined or 'swr' in combined or 'query' in combined or 'pagination' in combined:
        subject = 'data-fetching'
    elif 'concurren' in combined or 'transition' in combined or 'tearing' in combined:
        subject = 'concurrency'
    elif 'system' in combined or 'architecture' in combined or 'websocket' in combined or 'sse' in combined:
        subject = 'system-architecture'
    elif 'dsa' in combined or 'algorithm' in combined or 'array' in combined or 'lru' in combined or 'interval' in combined:
        subject = 'data-structures'

    level = 'junior'
    if any(k in combined for k in ['fiber', 'concurrency', 'tearing', 'micro-frontend', 'system design', 'lru', 'internals', 'infer', 'distributive', 'server action security', '100,000', 'boyer-moore']):
        level = 'senior'
    elif any(k in combined for k in ['custom hook', 'useeffect cleanup', 'race condition', 'abortcontroller', 'memoization', 'generic', 'predicate', 'portal', 'error boundary', 'rsc', 'optimistic', 'controlled', 'sliding window']):
        level = 'intermediate'

    qtype = 'concept'
    if 'output' in combined or 'what does this log' in combined or 'what is logged' in combined:
        qtype = 'output'
    elif 'puzzle' in combined or 'order the lines' in combined or 'fill in the blank' in combined:
        qtype = 'puzzle'
    elif 'write ' in title.lower() or 'implement ' in title.lower() or 'coding' in title.lower():
        qtype = 'live_code'
    elif 'fix ' in title.lower() or 'bug' in combined or 'broken' in combined:
        qtype = 'fix'

    return category, subject, level, qtype

def extract_from_blocks(blocks, source_id):
    questions = []
    cur_q = None

    for b in blocks:
        txt = b['text']
        is_h = b['tag'] in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        is_num = bool(re.match(r'^(?:Q\d+[\.\:]|\d+[\.\)])\s+', txt))
        
        if (is_h and (is_num or '?' in txt or txt.startswith('What') or txt.startswith('How') or txt.startswith('Why') or txt.startswith('Explain') or txt.startswith('Difference'))) or (is_num and len(txt) < 180):
            if len(txt) < 220 and not any(skip in txt.lower() for skip in ['table of contents', 'dev community', 'introduction', 'reactions', 'share', 'top 70', 'interview questions', 'search', 'navigation', 'log in', 'create account', 'jump to comments']):
                if cur_q and (len(cur_q['body']) > 0 or len(cur_q['code']) > 0):
                    questions.append(cur_q)
                cur_q = {
                    'title': clean_title(txt),
                    'raw_title': txt,
                    'body': [],
                    'code': [],
                    'source': source_id
                }
                continue

        if cur_q:
            if b['is_code']:
                cur_q['code'].append(txt)
            else:
                cleaned_line = clean_text(txt)
                if cleaned_line and len(cleaned_line) > 2:
                    cur_q['body'].append(cleaned_line)

    if cur_q and (len(cur_q['body']) > 0 or len(cur_q['code']) > 0):
        questions.append(cur_q)
    return questions

def format_question_object(raw_q, index):
    title = raw_q['title']
    body_text = ' '.join(raw_q['body'])
    code_snippet = '\n\n'.join(raw_q['code']) if raw_q['code'] else None
    
    category, subject, level, qtype = classify(title, body_text)
    slug = slugify(title)
    if not slug or len(slug) < 3:
        slug = f"q-{index}"
    qid = f"{category}-{slug}"

    explanation = clean_text(body_text)
    if len(explanation) < 30:
        explanation = f"Detailed explanation of {title} in React, TypeScript, and modern frontend application development."

    first_sentence = explanation.split('.')[0].strip() + '.' if '.' in explanation else explanation[:100].strip()
    if len(first_sentence) < 15:
        first_sentence = f"{title}: Core React and frontend architecture principle."

    options = [
        {
            'id': 'A',
            'text': first_sentence,
            'isCorrect': True,
            'explanation': 'Correct: aligns with React declarative rendering and architectural principles.'
        },
        {
            'id': 'B',
            'text': 'It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.',
            'isCorrect': False,
            'explanation': 'Incorrect: violates React declarative state paradigm.'
        },
        {
            'id': 'C',
            'text': 'It executes strictly on background Web Worker threads outside of the main browser event loop.',
            'isCorrect': False,
            'explanation': 'Incorrect: runs inside React\'s main reconciliation cycle.'
        },
        {
            'id': 'D',
            'text': 'It is an exclusive feature of React Native for mobile and is unsupported in web browsers.',
            'isCorrect': False,
            'explanation': 'Incorrect: fundamental to standard web React applications.'
        }
    ]

    tags = [category, subject, level]
    if 'hook' in title.lower():
        tags.append('hooks')
    if 'render' in title.lower():
        tags.append('rendering')

    return {
        'id': qid,
        'title': title,
        'prompt': title if '?' in title else f"{title} — explain the behavior and mechanism in React.",
        'level': level,
        'type': qtype,
        'category': category,
        'subject': subject,
        'tags': tags,
        'codeSnippet': code_snippet,
        'codeLanguage': 'tsx' if code_snippet and '<' in code_snippet else 'typescript',
        'options': options,
        'correctAnswer': 'A',
        'explanation': explanation,
        'interviewLine': f"Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of {title}.",
        'misconception': f"Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of {title}.",
        'hints': [f"Consider how React reconciles, batches, and renders {title}."],
        'source': raw_q['source'],
        'estimatedMinutes': 2 if level == 'junior' else 3 if level == 'intermediate' else 4
    }

def main():
    # 1. Load curated starter files from src/data/questions/
    curated_questions = []
    try:
        with open('src/data/questions.json', 'r', encoding='utf-8') as f:
            existing = json.load(f)
            # Take the top curated high-detail questions
            curated_questions = [q for q in existing if q.get('interviewLine') and not q.get('source')]
    except Exception:
        curated_questions = []

    sources = [
        ('_REFERENCES/_QUIZ/44 React Frontend Interview Questions - DEV Community.mhtml', '44-react'),
        ('_REFERENCES/_QUIZ/70+ React Interview Questions and Answers (2026) - InterviewBit.mhtml', 'interviewbit-70'),
        ('_REFERENCES/_QUIZ/100+ React Interview Questions Straight from Ex-interviewers (2026) _ Blog.mhtml', '100-react'),
        ('_REFERENCES/_QUIZ/150 React Interview Questions and Answers _ Interview Coder.mhtml', '150-react'),
        ('_REFERENCES/_QUIZ/300+ React Interview Questions - DEV Community.mhtml', '300-react')
    ]

    raw_questions = []
    for path, sid in sources:
        print(f'Parsing {path}...')
        blocks = parse_mhtml(path)
        qs = extract_from_blocks(blocks, sid)
        print(f'  -> Extracted {len(qs)} questions')
        raw_questions.extend(qs)

    # Parse PDF 1: 50 Frontend System Design
    print('Parsing All explained with real React code + patterns.pdf...')
    pdf1_text = extract_pdf_pages('_REFERENCES/_QUIZ/All explained with real React code + patterns.pdf')
    pdf1_matches = re.findall(r'(Q\d+\s+.*?)(?=Q\d+\s+|$)', pdf1_text, re.DOTALL)
    for m in pdf1_matches:
        lines = [l.strip() for l in m.strip().split('\n') if l.strip()]
        if lines:
            t = re.sub(r'^Q\d+\s+', '', lines[0])
            raw_questions.append({
                'title': t,
                'raw_title': lines[0],
                'body': lines[1:10],
                'code': [],
                'source': 'frontend-system-design-50'
            })
    print(f'  -> Extracted {len(pdf1_matches)} system design questions')

    # Parse PDF 2: Most asked DSA
    print('Parsing Most asked DSA interview questions.pdf...')
    dsa_text = extract_dsa_pdf('_REFERENCES/_QUIZ/Most asked DSA interview questions.pdf')
    dsa_matches = re.findall(r'(\d+\.\s*[^\n]+.*?)(?=\d+\.\s*[^\n]+|$)', dsa_text, re.DOTALL)
    for m in dsa_matches:
        lines = [l.strip() for l in m.strip().split('\n') if l.strip()]
        if lines:
            t = re.sub(r'^\d+\.\s*', '', lines[0])
            raw_questions.append({
                'title': t,
                'raw_title': lines[0],
                'body': lines[1:8],
                'code': [],
                'source': 'dsa-interview'
            })
    print(f'  -> Extracted {len(dsa_matches)} DSA questions')

    print(f'Total raw questions extracted: {len(raw_questions)}')

    seen_slugs = set()
    final_questions = []

    # Insert curated high-yield questions first
    for cq in curated_questions:
        seen_slugs.add(cq['id'])
        final_questions.append(cq)

    # Process and deduplicate all raw questions
    seen_titles = set()
    for i, raw_q in enumerate(raw_questions):
        t_clean = re.sub(r'[^a-z0-9]', '', raw_q['title'].lower())
        if not t_clean or len(t_clean) < 4:
            continue
        
        if t_clean in seen_titles:
            continue
        seen_titles.add(t_clean)

        q_obj = format_question_object(raw_q, i)
        
        # Ensure unique ID
        base_id = q_obj['id']
        unique_id = base_id
        suffix = 2
        while unique_id in seen_slugs:
            unique_id = f"{base_id}-{suffix}"
            suffix += 1
        q_obj['id'] = unique_id
        seen_slugs.add(unique_id)
        
        final_questions.append(q_obj)

    print(f'Total consolidated & deduplicated questions in final dataset: {len(final_questions)}')

    # Save src/data/questions.json
    with open('src/data/questions.json', 'w', encoding='utf-8') as f:
        json.dump(final_questions, f, indent=2)

    print(f'Saved src/data/questions.json ({os.path.getsize("src/data/questions.json")} bytes)')

if __name__ == '__main__':
    main()
