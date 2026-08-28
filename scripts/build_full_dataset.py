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

def parse_mhtml_file(path):
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
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    return text[:60].strip('-')

def determine_metadata(title, body_text):
    combined = (title + ' ' + body_text).lower()
    
    # Category
    category = 'react'
    if any(k in combined for k in ['next.js', 'nextjs', 'app router', 'server component', 'rsc', 'server action']):
        category = 'nextjs'
    elif any(k in combined for k in ['typescript', 'generic', 'interface vs type', 'narrowing', 'type predicate', 'infer', 'satisfies']):
        category = 'typescript'
    elif any(k in combined for k in ['system design', 'micro-frontend', 'architecture', 'scalability', 'design system', 'caching layer', 'offline']):
        category = 'system_design'
    elif any(k in combined for k in ['dsa', 'algorithm', 'binary search', 'two sum', 'interval', 'majority element', 'lru', 'stack', 'queue']):
        category = 'algorithms'
    elif any(k in combined for k in ['closure', 'event loop', 'microtask', 'hoisting', 'prototype', 'coercion', 'temporal dead zone', 'promise.all']):
        category = 'javascript'
    elif any(k in combined for k in ['performance', 'bundle', 'waterfall', 'memo', 'rerender', 'tree shaking', 'lazy load']):
        category = 'performance'

    # Subject
    subject = 'hooks'
    if 'hook' in combined or 'useeffect' in combined or 'usestate' in combined or 'usememo' in combined or 'useref' in combined or 'usecallback' in combined or 'usecontext' in combined:
        subject = 'hooks'
    elif 'key' in combined or 'render' in combined or 'virtual dom' in combined or 'reconciliation' in combined or 'fiber' in combined or 'fragment' in combined:
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

    # Level
    level = 'junior'
    if any(k in combined for k in ['fiber', 'concurrency', 'tearing', 'micro-frontend', 'system design', 'lru', 'internals', 'infer', 'distributive', 'server action security', '100,000']):
        level = 'senior'
    elif any(k in combined for k in ['custom hook', 'useeffect cleanup', 'race condition', 'abortcontroller', 'memoization', 'generic', 'predicate', 'portal', 'error boundary', 'rsc', 'optimistic']):
        level = 'intermediate'

    # Type
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

print('Script loaded.')
