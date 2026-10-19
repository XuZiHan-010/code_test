"""Verify review indexes, findings counts, evidence links and source integrity.

Run from repository root after audit.ts and build-index.py. Only writes this
review's final-verification.json; never edits bank sources or review reports.
"""
import hashlib
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent
index = {r["id"]: r for r in json.loads((root / "question-index.json").read_text(encoding="utf8"))}
questions = {q["id"]: q for q in json.loads((root / "questions.json").read_text(encoding="utf8"))}
findings = json.loads((root / "findings.json").read_text(encoding="utf8"))
checks = json.loads((root / "checks.json").read_text(encoding="utf8"))
initial_hashes = {
    "interview-practice/docker.md": "5fa488b163d55740efb8abec4764741fe469d994ebb125212e12faab4e5fc178",
    "interview-practice/answers-xiaolin/docker.md": "1412e5e5eed40c1f3e3677f3184390a7524d1d1da4a72132c756de1385975343",
    "content/typed/docker.json": "6cf92ca93b841e36296e493a73e69eb89b0dff50df546233a4026f401a9df685",
}
current_hashes = {file: hashlib.sha256(Path(file).read_bytes()).hexdigest() for file in initial_hashes}
assert initial_hashes == current_hashes == checks["hashes"]
review_counts = {}
all_reviewed = []
for file, expected_count, layout in [("Y1-review.md", 65, "standard"), ("Y2-review.md", 62, "y2"), ("Y3-Y4-review.md", 125, "standard")]:
    text = (root / file).read_text(encoding="utf8")
    heading = re.search(r"^## .*逐题审查索引.*$", text, re.M)
    assert heading, file
    rows = re.findall(r"^\| (Y\d+-\d+) \| (.+)$", text[heading.end():], re.M)
    ids = [r[0] for r in rows]
    assert len(ids) == len(set(ids)) == expected_count, file
    expected_ids = [i for i in index if (i.startswith("Y1-") if file.startswith("Y1") else i.startswith("Y2-") if file.startswith("Y2") else i.startswith(("Y3-", "Y4-")))]
    assert ids == expected_ids, file
    for id, row in rows:
        cells = [c.strip() for c in row.split("|")]
        if layout == "y2":
            q_line, typed_line, answer_cell = cells[0], cells[1], cells[2]
        else:
            answer_cell, q_line, typed_line = cells[0], cells[1], cells[2]
        assert all(int(n) == index[id]["questionLine"] == index[id]["answerLine"] for n in q_line.split("/")), (id, q_line)
        assert int(typed_line) == index[id]["typedLine"], (id, typed_line)
        q = questions[id]
        if q["type"] in ("single", "multiple"):
            actual = "".join(o["key"] for o in q["options"] if o["correct"])
            found = re.search(r"(?:单选|多选)[： ]*([A-F/、]+)", answer_cell)
            assert found and re.sub(r"[/、]", "", found[1]) == actual, (id, answer_cell, actual)
        elif q["type"] == "fill":
            assert "填空" in answer_cell and str(q["blankCount"]) in answer_cell
            assert ("无序" if q["blankOrder"] == "unordered" else "有序") in answer_cell
        else:
            assert "简答" in answer_cell
    review_counts[file] = len(ids)
    all_reviewed.extend(ids)
assert len(all_reviewed) == len(set(all_reviewed)) == len(index) == 252
affected_ids = {id for g in findings["groups"] for id in g["primaryQuestionIds"] + g["relatedExplanationIds"]}
assert affected_ids <= questions.keys()
assert findings["groupCount"] == len(findings["groups"]) == 16
assert findings["affectedQuestionCount"] == len(affected_ids) == 44
for group in findings["groups"]:
    report = (root / group["report"]).read_text(encoding="utf8")
    assert f"### {group['section']}：" in report
    assert all(id in report for id in group["primaryQuestionIds"] + group["relatedExplanationIds"])

broken_links = []
for doc in [root.parent / "docker-review-2026-10-16.md", *(root / f for f in review_counts)]:
    for link in re.findall(r"\]\(([^)]+)\)", doc.read_text(encoding="utf8")):
        if "://" in link or link.startswith("#"):
            continue
        target = doc.parent / link.split("#")[0]
        if not target.exists() and target != root / "final-verification.json":
            broken_links.append({"document": doc.name, "target": link})
assert not broken_links, broken_links

result = {
    "date": "2026-10-16",
    "reviewIndexCounts": review_counts,
    "reviewedUniqueQuestions": len(set(all_reviewed)),
    "indexOrderAndSourceLineNumbersMatch": True,
    "indexTypesAndCorrectKeysAndFillConfigurationMatch": True,
    "mustFixGroups": len(findings["groups"]),
    "affectedUniqueQuestionsIncludingExplanationUpdates": len(affected_ids),
    "affectedByChapter": {chapter: len([id for id in affected_ids if id.startswith(chapter + "-")]) for chapter in ("Y1", "Y2", "Y3", "Y4")},
    "bankSourceFilesUnchanged": True,
    "initialSha256": initial_hashes,
    "finalSha256": current_hashes,
    "brokenLocalEvidenceLinks": broken_links,
    "commandsAlreadyExecuted": {
        "contentValidateWithDrafts": {"exitCode": 0, "questionCount": 7247, "warnings": ["V14 R3-139"]},
        "unitTests": {"exitCode": 0, "filesPassed": 9, "testsPassed": 103},
        "dockerAudit": {"exitCode": 0, "errors": 0, "warnings": 0},
        "sourceIndex": {"exitCode": 0, "sections": 22, "questions": 252},
    },
    "limits": ["结构与材料检查不替代人工语义审核", "未运行Docker示例或清理资源", "未调用DeepSeek", "未运行生产构建、数据库集成测试或浏览器端到端测试", "章节状态仍为draft"],
}
(root / "final-verification.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
print("PASS: 252 review rows; source lines, types, answer keys and fill configurations match; 16 finding groups / 44 unique IDs; source hashes unchanged.")
