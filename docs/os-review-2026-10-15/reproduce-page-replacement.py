"""Sequence transcribed from source.html's OPT diagram, viewed during review."""
import json
from pathlib import Path

SEQUENCE = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]
CAPACITY = 3


def simulate(policy):
    pages, faults, replacements, trace = [], 0, 0, []
    for index, page in enumerate(SEQUENCE):
        hit = page in pages
        if not hit:
            faults += 1
            if len(pages) == CAPACITY:
                replacements += 1
                if policy == 'OPT':
                    future = SEQUENCE[index + 1:]
                    victim = max(pages, key=lambda p: future.index(p) if p in future else float('inf'))
                elif policy == 'FIFO':
                    victim = pages[0]
                else:
                    victim = min(pages, key=lambda p: max(i for i in range(index) if SEQUENCE[i] == p))
                pages.remove(victim)
            pages.append(page)
        trace.append({'page': page, 'fault': not hit, 'resident': pages.copy()})
    return {'faults': faults, 'replacements': replacements, 'trace': trace}


results = {policy: simulate(policy) for policy in ['OPT', 'FIFO', 'LRU']}
assert [results[p]['faults'] for p in results] == [7, 10, 9]
assert [results[p]['replacements'] for p in results] == [4, 7, 6]
output = {'sequence': SEQUENCE, 'initiallyEmptyFrames': CAPACITY, 'results': results}
Path(__file__).with_name('page-replacement-results.json').write_text(json.dumps(output, indent=2) + '\n', encoding='utf-8')
print(json.dumps({p: {k: v for k, v in r.items() if k != 'trace'} for p, r in results.items()}))
