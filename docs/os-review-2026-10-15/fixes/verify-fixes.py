"""Verify stability and sources against preserved pre-fix inputs."""
import hashlib
import json
import re
import sys
import urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote, urldefrag

from bs4 import BeautifulSoup

from importlib.util import module_from_spec, spec_from_file_location

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
spec = spec_from_file_location('apply_os_patches', HERE / 'apply-patches.py')
module = module_from_spec(spec)
spec.loader.exec_module(module)


def load(name):
    return json.loads((HERE / name).read_text(encoding='utf-8'))


def entries(text):
    return dict(re.findall(r'^- \*\*(V\d+-\d+)\*\* ([^\r\n]*)', text, re.M))


def main():
    current_typed = json.loads((ROOT / module.PATHS[2]).read_text(encoding='utf-8'))
    before_typed = load('before/os-typed.json')
    before_q = entries((HERE / 'before/os-questions.md').read_text(encoding='utf-8'))
    before_a = entries((HERE / 'before/os-answers.md').read_text(encoding='utf-8'))
    current_q = entries((ROOT / module.PATHS[0]).read_text(encoding='utf-8'))
    current_a = entries((ROOT / module.PATHS[1]).read_text(encoding='utf-8'))
    old = {q['id']: q for c in before_typed['chapters'].values() for q in c['questions']}
    new = {q['id']: q for c in current_typed['chapters'].values() for q in c['questions']}
    assert list(before_q) == list(before_a) == list(current_q) == list(current_a) == list(old) == list(new)
    assert len(new) == 716
    for key, chapter in current_typed['chapters'].items():
        assert chapter['status'] == before_typed['chapters'][key]['status'] == 'draft'
    changes = []
    for qid, question in new.items():
        assert question['type'] == old[qid]['type']
        assert [(o['key'], o['correct']) for o in question.get('options', [])] == [(o['key'], o['correct']) for o in old[qid].get('options', [])]
        if question['type'] == 'fill':
            marker = '[填空题·有序]' if question['blankOrder'] == 'ordered' else '[填空题·无序]'
            assert current_q[qid] == marker + ' ' + question['stem']
            assert question['stem'].count('____') == question['blankCount'] == old[qid]['blankCount']
            assert question['blankOrder'] == old[qid]['blankOrder']
        b = {'question': before_q[qid], 'typed': old[qid], 'answer': before_a[qid]}
        a = {'question': current_q[qid], 'typed': question, 'answer': current_a[qid]}
        if b != a:
            changes.append({'id': qid, 'before': b, 'after': a})
        # Existing original citations may not be dropped by a wording fix.
        original = set(re.findall(r'\]\((https://xiaolincoding.com/[^)]+)\)', before_a[qid]))
        after = set(re.findall(r'\]\((https://xiaolincoding.com/[^)]+)\)', current_a[qid]))
        assert original <= after, qid
    assert {c['id'] for c in changes} == module.EXPECTED
    baseline = load('baseline-hashes.json')
    modified = [f for f, digest in baseline.items() if hashlib.sha256((ROOT / f).read_bytes()).hexdigest() != digest]
    assert set(modified) <= set(module.PATHS) | {'interview-practice/README.md'}
    pages = {}
    for answer in current_a.values():
        for url in re.findall(r'\]\((https?://[^)]+)\)', answer):
            page, fragment = urldefrag(url)
            pages.setdefault(page, set()).add(unquote(fragment))
    sources = HERE / 'sources'
    sources.mkdir(exist_ok=True)
    cached = {item['url']: item for item in load('source-manifest.json')} if '--cached-sources' in sys.argv else {}

    def check_page(item):
        page, fragments = item
        if cached:
            data = (HERE / cached[page]['snapshot']).read_bytes()
            assert hashlib.sha256(data).hexdigest() == cached[page]['sha256']
            status = cached[page]['status']
        else:
            request = urllib.request.Request(page, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(request, timeout=40) as response:
                data = response.read()
                status = response.status
        soup = BeautifulSoup(data, 'html.parser')
        ids = {tag['id'] for tag in soup.select('[id]')} | {tag['name'] for tag in soup.select('[name]')}
        missing = sorted(f for f in fragments if f and f not in ids)
        title = soup.title.get_text(' ', strip=True) if soup.title else ''
        assert status == 200 and title and not missing, (page, status, title, missing)
        if 'xiaolincoding.com' in page:
            assert '操作系统面试题' in title
        filename = hashlib.sha256(page.encode()).hexdigest()[:12] + '.html'
        (sources / filename).write_bytes(data)
        return {'url': page, 'status': status, 'title': title, 'checkedAnchors': sorted(f for f in fragments if f), 'missingAnchors': missing, 'snapshot': 'sources/' + filename, 'sha256': hashlib.sha256(data).hexdigest()}

    with ThreadPoolExecutor(max_workers=4) as pool:
        manifest = list(pool.map(check_page, sorted(pages.items())))
    result = {
        'checkedAt': datetime.now(timezone.utc).isoformat(), 'questionCount': len(new),
        'changedCount': len(changes), 'unchangedCount': len(new)-len(changes),
        'changedIds': [c['id'] for c in changes], 'idOrderTypeAndCorrectSetsPreserved': True,
        'draftChapters': len(current_typed['chapters']),
        'types': dict(Counter(q['type'] for q in new.values())),
        'fillsSynchronized': sum(q['type'] == 'fill' for q in new.values()),
        'modifiedContentFiles': modified,
        'postFixSha256': {f: hashlib.sha256((ROOT / f).read_bytes()).hexdigest() for f in module.PATHS},
        'sourcePagesChecked': len(manifest), 'sourceAnchorsChecked': sum(len(p['checkedAnchors']) for p in manifest),
        'sourceMode': 'rechecked saved HTTP snapshots' if cached else 'live HTTP',
    }
    for name, value in [('before-after.json', changes), ('source-manifest.json', manifest), ('checks-after.json', result)]:
        (HERE / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
