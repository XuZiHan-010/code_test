"""对修前快照与当前 Redis 内容做一次性结构核验，并刷新逐题证据。"""
import json
import re
from collections import Counter
from pathlib import Path
from urllib.parse import unquote

base = Path(__file__).resolve().parent
root = base.parents[2]
paths = ['content/typed/redis.json','interview-practice/redis.md','interview-practice/answers-xiaolin/redis.md']
before = [p.read_text(encoding='utf-8') for p in [base/'before'/p for p in paths]]
after = [(root/p).read_text(encoding='utf-8') for p in paths]
old, new = json.loads(before[0]), json.loads(after[0])
def questions(d):
    return [q for c in d['chapters'].values() for q in c['questions']]
oq, nq = questions(old), questions(new)
ids = [q['id'] for q in nq]
assert len(ids) == len(set(ids)) == 774
assert [q['id'] for q in oq] == ids
assert list(old['chapters']) == list(new['chapters'])
assert all(c['status'] == 'draft' for c in new['chapters'].values())
def lines(text):
    return dict(re.findall(r'^- \*\*(O\d+-\d+)\*\* (.*)$', text, re.M))
op, oa = lines(before[1]), lines(before[2])
np, na = lines(after[1]), lines(after[2])
assert list(np) == list(na) == ids
for q in nq:
    if q['type'] == 'fill':
        marker = '[填空题·有序] ' if q['blankOrder'] == 'ordered' else '[填空题·无序] '
        assert np[q['id']] == marker + q['stem'], q['id']
        assert q['stem'].count('____') == q['blankCount']
    if q['type'] in ['single','multiple']:
        opts = q['options']
        assert [o['key'] for o in opts] == list('ABCDEF'[:len(opts)])
        assert len(set(o['text'] for o in opts)) == len(opts)
        correct = sum(o['correct'] for o in opts)
        assert (len(opts) == 4 and correct == 1) if q['type'] == 'single' else (4 <= len(opts) <= 6 and 2 <= correct < len(opts))
source = (base.parent/'source.html').read_text(encoding='utf-8')
anchors = set(re.findall(r'\bid="([^"]+)"',source))
for id, text in na.items():
    for link in re.findall(r'\]\((https://xiaolincoding.com/interview/redis.html#[^)]+)\)', text):
        assert unquote(link.split('#',1)[1]) in anchors, (id,link)
    assert re.findall(r'\[原文§[^]]+\]\([^)]+\)', text) == re.findall(r'\[原文§[^]]+\]\([^)]+\)',oa[id]), id
evidence = json.loads((base/'before-after.json').read_text(encoding='utf-8'))
byid = {q['id']:q for q in nq}
for c in evidence['questions']:
    c['after'] = {'typed':byid[c['id']], 'paper':np[c['id']], 'answer':na[c['id']]}
    if c['id'] == 'O6-75':
        reason = '补全三个干扰命令的语法及职责，使选项长度不泄露正确项'
        if reason not in c['reasons']:
            c['reasons'].append(reason)
    if c['id'] in ['O2-38','O4-38','O7-76','O7-161','O7-216','O7-241']:
        reason = '简答解析改为自然直接回答，不再依赖已移除的选项'
        if reason not in c['reasons']:
            c['reasons'].append(reason)
    c['reasons'] = list(dict.fromkeys(c['reasons']))
(base/'before-after.json').write_text(json.dumps(evidence, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')
actual = {q['id'] for p,q in zip(oq,nq) if p != q or op[q['id']] != np[q['id']] or oa[q['id']] != na[q['id']]}
assert actual == {c['id'] for c in evidence['questions']}
result = {'questionCount':len(ids),'changedQuestionCount':len(actual),'chapters':len(new['chapters']),'status':'all draft','counts':dict(Counter(q['type'] for q in nq)),'singleCorrectPositions':dict(Counter(o['key'] for q in nq if q['type']=='single' for o in q['options'] if o['correct'])),'fillSynchronization':'90/90','idsAndOrder':'unchanged','originalCitations':'unchanged; all source anchors exist','remainingTwoCorrectMultiple':[q['id'] for q in nq if q['type']=='multiple' and sum(o['correct'] for o in q['options'])==2]}
(base/'implementation-checks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))
