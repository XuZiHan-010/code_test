"""Reproduce the OS review inputs and mechanical checks; never edits the bank."""
import hashlib
import json
import re
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote, urldefrag

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
FILES = ['interview-practice/os.md', 'interview-practice/answers-xiaolin/os.md', 'content/typed/os.json']


def entries(path):
    text = (ROOT / path).read_text(encoding='utf-8')
    rows = []
    section = ''
    for number, line in enumerate(text.splitlines(), 1):
        if line.startswith('### '):
            section = line[4:]
        match = re.match(r'- \*\*(V\d+-\d+)\*\* (.*)', line)
        if match:
            rows.append({'id': match[1], 'text': match[2], 'section': section, 'line': number})
    return rows


def main():
    OUT.mkdir(exist_ok=True)
    qrows, arows = entries(FILES[0]), entries(FILES[1])
    questions, answers = {q['id']: q for q in qrows}, {a['id']: a for a in arows}
    typed = json.loads((ROOT / FILES[2]).read_text(encoding='utf-8'))
    url = 'https://xiaolincoding.com/interview/os.html'
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(request, timeout=45) as response:
        html = response.read().decode('utf-8')
        status = response.status
    (OUT / 'source.html').write_text(html, encoding='utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    main_content = soup.select_one('main') or soup
    (OUT / 'source.txt').write_text(main_content.get_text('\n', strip=True), encoding='utf-8')
    headings = [{'level': h.name, 'id': h.get('id', ''), 'text': h.get_text(' ', strip=True).removeprefix('# ').strip()} for h in main_content.select('h2, h3')]
    (OUT / 'source-headings.json').write_text(json.dumps(headings, ensure_ascii=False, indent=2), encoding='utf-8')
    ids = {tag['id'] for tag in soup.select('[id]')}
    merged, chapter_checks, fill_errors = [], {}, []
    for chapter_id, chapter in typed['chapters'].items():
        rows = []
        for item in chapter['questions']:
            question, answer = questions[item['id']], answers[item['id']]
            row = {**item, 'originalStem': question['text'], 'section': question['section'], 'answer': answer['text'], 'questionLine': question['line'], 'answerLine': answer['line']}
            rows.append(row)
            if item['type'] == 'fill':
                marker = '[填空题·有序]' if item['blankOrder'] == 'ordered' else '[填空题·无序]'
                if question['text'] != marker + ' ' + item['stem'] or item['stem'].count('____') != item['blankCount']:
                    fill_errors.append(item['id'])
        merged.extend(rows)
        source_sections = {row['section'] for row in rows}
        chapter_checks[chapter_id] = {'status': chapter['status'], 'count': len(rows), 'types': dict(Counter(row['type'] for row in rows)), 'sections': len(source_sections)}
        lines = []
        for row in rows:
            lines += [f"### {row['id']} ({row['type']}) {row['section']}", row.get('stem', row['originalStem'])]
            if row['type'] == 'fill':
                lines.append(f"空数 {row['blankCount']}；顺序 {row['blankOrder']}")
            lines.extend(f"{o['key']} {'[正确]' if o['correct'] else '[错误]'} {o['text']}" for o in row.get('options', []))
            lines += ['解答：' + re.sub(r'\[([^\]]+)\]\(https?://[^)]+\)', r'[\1]', row['answer']), '']
        (OUT / f'{chapter_id}-questions.txt').write_text('\n'.join(lines), encoding='utf-8')
    references = set(re.findall(r'\]\((https?://[^)]+)\)', (ROOT / FILES[1]).read_text(encoding='utf-8')))
    missing_anchors, other_pages = [], []
    for reference in sorted(references):
        page, anchor = urldefrag(reference)
        if page != url:
            other_pages.append(reference)
        elif anchor and unquote(anchor) not in ids:
            missing_anchors.append(reference)
    source_titles = {h['text'] for h in headings if h['level'] == 'h3'}
    local_titles = {q['section'] for q in qrows}
    typed_ids = [q['id'] for q in merged]
    exact_stems = Counter(q.get('stem', q['originalStem']) for q in merged)
    checks = {
        'checkedAt': datetime.now(timezone.utc).isoformat(),
        'inputSha256': {f: hashlib.sha256((ROOT / f).read_bytes()).hexdigest() for f in FILES},
        'source': {'url': url, 'status': status, 'title': soup.title.get_text() if soup.title else '', 'sha256': hashlib.sha256(html.encode('utf-8')).hexdigest()},
        'chapters': chapter_checks,
        'totals': dict(Counter(q['type'] for q in merged)),
        'sameIdOrder': [q['id'] for q in qrows] == [a['id'] for a in arows] == typed_ids,
        'duplicateIds': {name: [k for k,v in Counter(values).items() if v > 1] for name, values in [('questions', [q['id'] for q in qrows]), ('answers', [a['id'] for a in arows]), ('typed', typed_ids)]},
        'fillSyncErrors': fill_errors,
        'singlePositions': dict(Counter(o['key'] for q in merged if q['type'] == 'single' for o in q['options'] if o['correct'])),
        'duplicateExactStems': [stem for stem, count in exact_stems.items() if count > 1],
        'references': {'unique': len(references), 'missingAnchors': missing_anchors, 'otherPages': other_pages},
        'headings': {'sourceH2': sum(h['level'] == 'h2' for h in headings), 'sourceH3': len(source_titles), 'localH3': len(local_titles), 'sourceOnly': sorted(source_titles-local_titles), 'localOnly': sorted(local_titles-source_titles)},
    }
    (OUT / 'questions.json').write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT / 'checks.json').write_text(json.dumps(checks, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(checks, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
