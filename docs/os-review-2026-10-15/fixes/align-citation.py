"""Normalize V2-216's citation label without passing Chinese through shell pipes."""
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
path = ROOT / 'interview-practice/answers-xiaolin/os.md'
raw = path.read_bytes().decode('utf-8')
pattern = re.compile(r'(^- \*\*V2-216\*\* )([^\r\n]*)', re.M)
old = pattern.search(raw)[2]
new = re.sub(r'\[\?+\]\([^)]+\)$', '', old)
new = new.replace('核对来源为原文同节的响应比公式图。', '')
url = re.search(r'\[原文[^]]*\]\(([^)]+)\)', new)[1]
label = '[核对来源：原文同节响应比公式](' + url + ')'
if label not in new:
    new += label
assert '[?' not in new
path.write_bytes(pattern.sub(lambda match: match[1] + new, raw).encode('utf-8'))
for name in ['patch-V1-V2.json', 'applied-patches.json']:
    file = HERE / name
    data = json.loads(file.read_text(encoding='utf-8'))
    next(edit for edit in data if edit['id'] == 'V2-216')['answer'] = new
    file.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(new)
