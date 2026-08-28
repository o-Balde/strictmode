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

def build_all_questions():
    all_qs = []
    seen_slugs = set()

    def add_question(q):
        if not q.get('id'):
            q['id'] = slugify(q['title'])
        if q['id'] in seen_slugs:
            # deduplicate or suffix
            idx = 2
            while f"{q['id']}-{idx}" in seen_slugs:
                idx += 1
            q['id'] = f"{q['id']}-{idx}"
        seen_slugs.add(q['id'])
        all_qs.append(q)

    # 1. Load existing high quality base questions from src/data/questions/
    existing_files = [
        'react-hooks.ts',
        'react-rendering.ts',
        'typescript.ts',
        'nextjs-rsc.ts',
        'javascript-core.ts',
        'performance.ts',
        'system-design.ts',
        'live-coding.ts',
        'fix-the-bug.ts',
        'puzzles.ts',
        'algorithms-dsa.ts'
    ]

    for ef in existing_files:
        p = os.path.join('src/data/questions', ef)
        if os.path.exists(p):
            with open(p, 'r', encoding='utf-8') as fp:
                txt = fp.read()
            m = re.search(r'export const \w+:\s*QuizQuestion\[\]\s*=\s*(\[[\s\S]*\]);?\s*$', txt)
            if m:
                # parse JSON-compatible subset or eval via node
                pass

    print('Starting extraction across 7 sources...')
    return seen_slugs

if __name__ == '__main__':
    build_all_questions()
