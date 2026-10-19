"""Apply the reviewed content edits once, guarding the exact pre-review input."""
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
PATHS = ['interview-practice/os.md', 'interview-practice/answers-xiaolin/os.md', 'content/typed/os.json']
EXPECTED = set('V1-7 V1-11 V2-34 V2-38 V2-104 V2-107 V2-113 V2-131 V2-136 V2-159 V2-181 V2-189 V2-199 V2-200 V2-215 V2-216 V2-240 V3-8 V3-9 V3-13 V3-16 V3-21 V4-35 V4-53 V4-63 V4-123 V4-129 V4-135 V4-143 V4-154 V6-43 V6-44 V6-45 V6-47 V7-66 V7-67 V7-71 V7-73'.split())


def replace_entry(text, qid, body):
    assert isinstance(body, str) and body.strip() == body and '\n' not in body and '\r' not in body
    pattern = re.compile(r'(^- \*\*' + re.escape(qid) + r'\*\* )([^\r\n]*)', re.M)
    result, count = pattern.subn(lambda match: match[1] + body, text)
    assert count == 1, (qid, count)
    return result


def main():
    baseline = json.loads((HERE / 'baseline-hashes.json').read_text(encoding='utf-8'))
    raw = {name: (ROOT / name).read_bytes() for name in PATHS}
    for name, data in raw.items():
        assert hashlib.sha256(data).hexdigest() == baseline[name], f'Input changed: {name}'
    documents = {name: data.decode('utf-8') for name, data in raw.items()}
    typed = json.loads(documents[PATHS[2]])
    original_typed = json.loads(documents[PATHS[2]])
    by_id = {q['id']: q for chapter in typed['chapters'].values() for q in chapter['questions']}
    edits = []
    for name in ['patch-V1-V2.json', 'patch-V3-V4.json', 'patch-V6-V7.json']:
        edits.extend(json.loads((HERE / name).read_text(encoding='utf-8')))
    assert len(edits) == len(EXPECTED) == len({e['id'] for e in edits})
    assert {e['id'] for e in edits} == EXPECTED
    for edit in edits:
        assert set(edit) <= {'id', 'reason', 'question', 'typed', 'answer'}
        qid = edit['id']
        if 'question' in edit:
            documents[PATHS[0]] = replace_entry(documents[PATHS[0]], qid, edit['question'])
        if 'answer' in edit:
            documents[PATHS[1]] = replace_entry(documents[PATHS[1]], qid, edit['answer'])
        if 'typed' in edit:
            assert set(edit['typed']) <= {'stem', 'options'}
            question = by_id[qid]
            assert question['type'] != 'short', f'Short uses Markdown: {qid}'
            if 'options' in edit['typed']:
                old_options, new_options = question['options'], edit['typed']['options']
                assert [(o['key'], o['correct']) for o in old_options] == [(o['key'], o['correct']) for o in new_options]
            question.update(edit['typed'])
        question = by_id[qid]
        if question['type'] == 'fill':
            marker = '[填空题·有序]' if question['blankOrder'] == 'ordered' else '[填空题·无序]'
            assert edit.get('question') == marker + ' ' + question['stem']
            assert question['stem'].count('____') == question['blankCount']
    for chapter_id, chapter in typed['chapters'].items():
        old = original_typed['chapters'][chapter_id]
        assert chapter['status'] == old['status'] == 'draft'
        assert [(q['id'], q['type']) for q in chapter['questions']] == [(q['id'], q['type']) for q in old['questions']]
    # Preserve JSON indentation and the input's newline convention.
    newline = '\r\n' if '\r\n' in documents[PATHS[2]] else '\n'
    documents[PATHS[2]] = (json.dumps(typed, ensure_ascii=False, indent=2) + '\n').replace('\n', newline)
    backup = HERE / 'before'
    backup.mkdir(exist_ok=True)
    for name, label in zip(PATHS, ['os-questions.md', 'os-answers.md', 'os-typed.json']):
        target = backup / label
        assert not target.exists(), 'Already applied; refusing to overwrite the before snapshot'
        target.write_bytes(raw[name])
    for name in PATHS:
        (ROOT / name).write_bytes(documents[name].encode('utf-8'))
    (HERE / 'applied-patches.json').write_text(json.dumps(edits, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'appliedQuestionCount': len(edits), 'ids': [e['id'] for e in edits]}, ensure_ascii=False))


if __name__ == '__main__':
    main()
