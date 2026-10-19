import json, re, difflib
from pathlib import Path
from collections import Counter

root = Path.cwd()
out = root / 'docs/network-review-2026-10-15/fixes'
baseline = Path((out / 'baseline-path.txt').read_text(encoding='utf-8').strip())
paths = ['content/typed/network.json', 'interview-practice/network.md', 'interview-practice/answers-xiaolin/network.md']
def read(path): return path.read_bytes().decode('utf-8')
def write(path, text): path.write_bytes(text.encode('utf-8'))
for name in paths:
    assert (root/name).read_bytes() == (baseline/name).read_bytes(), f'外部修改需合并：{name}'
changes = sum([json.loads(read(out/f))['changes'] for f in ['T2.json','T3.json','remaining.json']], [])
assert len({c['id'] for c in changes}) == len(changes) == 39
bank = json.loads(read(root/paths[0]))
original = json.loads(read(root/paths[0]))
questions = {q['id']: q for ch in bank['chapters'].values() for q in ch['questions']}
md = [read(root/p) for p in paths[1:]]
def line(text, id):
    matches = re.findall(r'^- \*\*'+re.escape(id)+r'\*\* (.*)\r?$', text, re.M)
    assert len(matches)==1, id
    return matches[0].rstrip('\r')
records = []
for c in changes:
    id = c['id']; q = questions[id]
    before = {'typed': json.loads(json.dumps(q)), 'question': line(md[0],id), 'answer': line(md[1],id)}
    fields = c.get('typed', {})
    assert set(fields) <= {'stem','options','blankOrder'}
    if 'options' in fields:
        assert [(o['key'],o['correct']) for o in fields['options']] == [(o['key'],o['correct']) for o in q['options']], id
    assert q['type'] != 'short' or 'stem' not in fields
    q.update(fields)
    for i, field in enumerate(['question','answer']):
        if field in c:
            md[i], count = re.subn(r'(^- \*\*'+re.escape(id)+r'\*\* )[^\r\n]*', lambda m: m[1]+c[field], md[i], flags=re.M)
            assert count==1
    if q['type']=='fill':
        marker = '[填空题·有序] ' if q['blankOrder']=='ordered' else '[填空题·无序] '
        assert line(md[0],id)==marker+q['stem'], id
    after = {'typed': q.copy(), 'question':line(md[0],id),'answer':line(md[1],id)}
    assert before != after, id
    records.append({'id':id,'reason':c['reason'],'before':before,'after':after})
raw = read(root/paths[0]); newline = '\r\n' if '\r\n' in raw else '\n'
rendered = json.dumps(original, ensure_ascii=False, indent=2).replace('\n',newline)+newline
assert rendered == raw, 'JSON序列化与原格式不一致'
write(root/paths[0], json.dumps(bank,ensure_ascii=False,indent=2).replace('\n',newline)+newline)
for p,text in zip(paths[1:],md): write(root/p,text)
write(out/'before-after.json',json.dumps({'changes':records},ensure_ascii=False,indent=2)+'\n')
assert [q['id'] for ch in original['chapters'].values() for q in ch['questions']] == list(questions)
assert Counter(q['type'] for q in questions.values()) == Counter(single=457,multiple=60,fill=101,short=38)
assert all(ch['status']=='draft' for ch in bank['chapters'].values())
for id,q in questions.items():
    if q['type']=='fill':
        marker = '[填空题·有序] ' if q['blankOrder']=='ordered' else '[填空题·无序] '
        assert line(md[0],id)==marker+q['stem'] and q['stem'].count('____')==q['blankCount'], id

docpaths = ['interview-practice/README.md','CLAUDE.md','docs/network-review-2026-10-15.md'] + ['docs/network-review-2026-10-15/'+f for f in ['findings-T2.md','findings-T3.md','findings-T1-T4-T5-T6.md']]
docbefore = {p:read(root/p) for p in docpaths}
summary = '# 网络题库修复记录（2026-10-15）\n\n本轮已修复 39 个题号，原审查报告保留为修前历史证据。11 道优先题及关联条件、引用、措辞问题已同步到题卷、参考答案和题型数据；656 题题号、题序及题型数量不变，6 章仍为 `draft`。这不代表项目所有者人工抽查或模型评分实测通过。\n\n原文技术勘误涉及 T2-150、T2-289、T3-194、T5-56、T5-57，参考答案已注明原文说法并附官方核对来源。\n\n| 题号 | 状态 | 修复说明 |\n| --- | --- | --- |\n'
summary += ''.join(f"| {c['id']} | 已修复 | {c['reason'].replace('|','／')} |\n" for c in changes)
summary += '\n完整修前与修后内容见 [before-after.json](before-after.json)，整合验证见 [integration-report.md](integration-report.md)。原 checks.json 为修前证据，未覆盖。\n'
write(out/'fix-summary.md',summary)
paragraph = '2026-10-15 按[网络审查报告](../docs/network-review-2026-10-15.md)修订计算机网络专题 39 个题号：修复 11 道优先题，并补全其他题目的条件、引用和措辞。原文技术勘误共 5 题：DNS 职责（T2-150）、NGINX least_time 版本范围（T2-289）、快速重传与乱序误判（T3-194）、write 成功短写及 errno（T5-56、T5-57），答案注明原文说法并附官方核对链接。656 题的题号、题序和题型数量保持单选 457、多选 60、填空 101、简答 38，6 章仍为 `draft`，尚待项目所有者抽查。逐题状态与核对记录见[修复清单](../docs/network-review-2026-10-15/fixes/fix-summary.md)。\n\n'
readme = docbefore[docpaths[0]]
anchor = '解答是对原文的转述，不是对原文说法的独立核实。'
assert readme.count(anchor)==1
write(root/docpaths[0],readme.replace(anchor,paragraph+anchor))
claude = docbefore['CLAUDE.md'].replace('全部 184 章','全部 190 章')
anchor = '## 技术栈与结构'
claude = claude.replace(anchor,'2026-10-15 网络专题按审查报告修订 39 题，656 题题号、题序和题型数量不变，6 章仍为 `draft`；详情见 [修复清单](docs/network-review-2026-10-15/fixes/fix-summary.md) 和 [审查报告](docs/network-review-2026-10-15.md)。\n\n'+anchor)
claude = claude.replace('均记录在 `README.md`。','网络专题本轮另处理 5 题（T2-150、T2-289、T3-194、T5-56、T5-57），均记录在 `README.md` 和 [网络修复清单](docs/network-review-2026-10-15/fixes/fix-summary.md)。')
write(root/'CLAUDE.md',claude)
for p in docpaths[2:]:
    text = docbefore[p]
    link = 'network-review-2026-10-15/fixes/fix-summary.md' if p.endswith('network-review-2026-10-15.md') else 'fixes/fix-summary.md'
    note = f'\n> 修复状态（2026-10-15）：本报告所列确认问题及条件、引用、措辞修订已应用，涉及 39 个题号；逐项已修状态见[修复清单]({link})。以下原审查内容保留为修前历史证据，不能视作当前未修问题。章节仍为 draft，尚待项目所有者抽查；未宣称模型评分实测通过。\n'
    first,rest = text.split('\n',1)
    write(root/p,first+'\n'+note+'\n'+rest)
diff = ''
for p in paths+docpaths:
    old = read(baseline/p) if (baseline/p).exists() else docbefore[p]
    diff += ''.join(difflib.unified_diff(old.splitlines(True),read(root/p).splitlines(True),fromfile='before/'+p,tofile='after/'+p))
diff += ''.join(difflib.unified_diff([],summary.splitlines(True),fromfile='/dev/null',tofile='after/docs/network-review-2026-10-15/fixes/fix-summary.md'))
write(out/'content-fix.diff',diff)
print('Applied',len(records),'changes; questions',len(questions),'types',dict(Counter(q['type'] for q in questions.values())))
