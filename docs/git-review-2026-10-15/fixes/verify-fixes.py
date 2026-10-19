"""Read-only structural comparison against the immutable original content."""
import collections
import hashlib
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[3]
FIX = pathlib.Path(__file__).resolve().parent
PATHS = ['interview-practice/git.md', 'interview-practice/answers-xiaolin/git.md', 'content/typed/git.json']
before = json.loads((FIX / 'before' / PATHS[2]).read_text(encoding='utf-8'))
after = json.loads((ROOT / PATHS[2]).read_text(encoding='utf-8'))
old_questions = {q['id']: q for c in before['chapters'].values() for q in c['questions']}
questions = {q['id']: q for c in after['chapters'].values() for q in c['questions']}

def parse(path):
    return {m[1]: m[2] for line in path.read_text(encoding='utf-8').splitlines()
            if (m := re.match(r'^- \*\*(X\d+-\d+)\*\* (.*)$', line))}

md = parse(ROOT / PATHS[0])
answers = parse(ROOT / PATHS[1])
old_answers = parse(FIX / 'before' / PATHS[1])
assert list(questions) == list(md) == list(answers) == list(old_questions)
assert collections.Counter(q['type'] for q in questions.values()) == {'single': 170, 'multiple': 30, 'fill': 28, 'short': 24}
assert all(c['status'] == 'draft' for c in after['chapters'].values())
for qid, q in questions.items():
    old_q = old_questions[qid]
    assert q['type'] == old_q['type']
    if 'options' in q:
        assert len(q['options']) == len(old_q['options'])
        assert [o['key'] for o in q['options']] == list('ABCDEF'[:len(q['options'])])
    if q['type'] == 'single':
        assert [o['correct'] for o in q['options']] == [o['correct'] for o in old_q['options']]
    if q['type'] == 'fill':
        assert re.sub(r'^\[填空题·[^]]+\] ', '', md[qid]) == q['stem']
        assert q['blankOrder'] == old_q['blankOrder']
        assert q['blankCount'] == old_q['blankCount'] == q['stem'].count('____')
    for link in re.findall(r'\[原文[^\]]+\]\(https?://[^)]+\)', old_answers[qid]):
        assert link in answers[qid], qid
    assert re.search(r'\[原文[^\]]+\]\(https?://[^)]+\)(?:\[核对来源：[^\]]+\]\(https?://[^)]+\))*$', answers[qid]), qid
    if q['type'] == 'multiple' and not qid.startswith('X4-'):
        correct = ''.join(o['key'] for o in q['options'] if o['correct'])
        assert correct != 'ABCDEF'[:len(correct)], qid

checks = json.loads((ROOT / 'docs/git-review-2026-10-15/checks.json').read_text(encoding='utf-8'))
for path in PATHS:
    assert hashlib.sha256((FIX / 'before' / path).read_bytes()).hexdigest() == checks['hashes'][path]
    print(path, 'after SHA256', hashlib.sha256((ROOT / path).read_bytes()).hexdigest())
print('PASS: 252 IDs/order/types; 170 single truth positions; 28 fill count/order/stems; 24 multiple non-prefix; all original citations preserved and tail parseable; before snapshot hashes unchanged')
