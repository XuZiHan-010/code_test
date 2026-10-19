"""Build review evidence from the downloaded source and runtime question snapshot.

Run from the repository root after audit.ts. Requires beautifulsoup4.
Only writes files below this review directory.
"""
import json
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit

from bs4 import BeautifulSoup

root = Path(__file__).resolve().parent
questions = json.loads((root / "questions.json").read_text(encoding="utf8"))
soup = BeautifulSoup((root / "source.html").read_text(encoding="utf8"), "html.parser")
main = soup.select_one(".theme-default-content")
assert main is not None
sections = []
for heading in main.select("h2"):
    title = heading.get_text(" ", strip=True).removeprefix("# ")
    blocks = []
    for sibling in heading.next_siblings:
        if getattr(sibling, "name", None) == "h2":
            break
        if getattr(sibling, "name", None):
            blocks.append(sibling.get_text(" ", strip=True))
    linked = [q for q in questions if any(unquote(urlsplit(c["url"]).fragment) == heading["id"] for c in q["citations"])]
    sections.append({"title": title, "anchor": heading["id"], "questionIds": [q["id"] for q in linked], "text": "\n\n".join(blocks)})
assert len(sections) == 22
assert all(s["questionIds"] for s in sections)
assert {i for s in sections for i in s["questionIds"]} == {q["id"] for q in questions}
titles = {s["anchor"]: s["title"] for s in sections}
section_mismatches = [q["id"] for q in questions for citation in q["citations"] if q["section"] != titles[unquote(urlsplit(citation["url"]).fragment)]]
assert not section_mismatches, section_mismatches
(root / "sections.json").write_text(json.dumps(sections, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
(root / "source-blocks.txt").write_text("\n\n".join("## " + s["title"] + "\n" + s["text"] for s in sections) + "\n", encoding="utf8")

files = {
    "questionLine": Path("interview-practice/docker.md"),
    "answerLine": Path("interview-practice/answers-xiaolin/docker.md"),
    "typedLine": Path("content/typed/docker.json"),
}
lines = {}
for key, file in files.items():
    pattern = r'"id": "(Y\d+-\d+)"' if key == "typedLine" else r"^- \*\*(Y\d+-\d+)\*\*"
    lines[key] = {m[1]: n for n, line in enumerate(file.read_text(encoding="utf8").splitlines(), 1) if (m := re.search(pattern, line))}
index = [{"id": q["id"], "chapterId": q["chapterId"], "type": q["type"], "section": q["section"], **{key: value[q["id"]] for key, value in lines.items()}} for q in questions]
(root / "question-index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
(root / "source-coverage-checks.json").write_text(json.dumps({"sourceSectionCount": len(sections), "questionCount": len(questions), "uncitedSections": [s["title"] for s in sections if not s["questionIds"]], "sectionTitleMismatches": section_mismatches}, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
print(f"Indexed {len(sections)} source sections and {len(index)} questions; all source sections cited.")
