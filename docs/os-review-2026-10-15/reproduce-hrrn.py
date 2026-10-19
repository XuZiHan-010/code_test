"""Check the omitted zero-wait boundary using the source diagram's formula."""
import json
from fractions import Fraction
from pathlib import Path


def ratio(wait, service):
    return Fraction(wait + service, service)


cases = [
    {'wait': wait, 'shortService': 2, 'longService': 3,
     'shortRatio': str(ratio(wait, 2)), 'longRatio': str(ratio(wait, 3)),
     'shortStrictlyHigher': ratio(wait, 2) > ratio(wait, 3)}
    for wait in [0, 6]
]
assert cases[0]['shortRatio'] == cases[0]['longRatio'] == '1'
assert cases[1]['shortStrictlyHigher']
result = {'formula': '(waitingTime + serviceTime) / serviceTime', 'cases': cases}
Path(__file__).with_name('hrrn-results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(json.dumps(result))
