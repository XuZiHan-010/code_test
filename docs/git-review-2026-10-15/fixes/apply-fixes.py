"""Apply the reviewed content-only corrections from immutable before snapshots."""
import copy
import hashlib
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[3]
FIX = pathlib.Path(__file__).resolve().parent
PATHS = ['interview-practice/git.md', 'interview-practice/answers-xiaolin/git.md', 'content/typed/git.json']
original = {p: (FIX / 'before' / p).read_bytes() for p in PATHS}
checks = json.loads((ROOT / 'docs/git-review-2026-10-15/checks.json').read_text(encoding='utf-8'))
assert all(hashlib.sha256(original[p]).hexdigest() == checks['hashes'][p] for p in PATHS)
data = json.loads(original[PATHS[2]].decode('utf-8'))
before_data = copy.deepcopy(data)
questions = {q['id']: q for c in data['chapters'].values() for q in c['questions']}
question_lines = original[PATHS[0]].decode('utf-8').splitlines()
answer_lines = original[PATHS[1]].decode('utf-8').splitlines()
pattern = re.compile(r'^- \*\*(X\d+-\d+)\*\* (.*)$')
stems = {m[1]: m[2] for l in question_lines if (m := pattern.match(l))}
answers = {m[1]: m[2] for l in answer_lines if (m := pattern.match(l))}
citations = {k: v[v.index('[原文§'):] for k, v in answers.items()}
reasons = {}

def record(qid, reason):
    reasons.setdefault(qid, [])
    if reason not in reasons[qid]:
        reasons[qid].append(reason)

def stem(qid, text, reason):
    q = questions[qid]
    prefix = re.match(r'^\[填空题·[^]]+\] ', stems[qid])
    stems[qid] = (prefix[0] if prefix else '') + text
    if 'stem' in q:
        q['stem'] = text
    record(qid, reason)

def option(qid, key, text, reason):
    o = next(o for o in questions[qid]['options'] if o['key'] == key)
    o['text'] = text
    record(qid, reason)

def answer(qid, text, reason):
    answers[qid] = text + citations[qid]
    record(qid, reason)

def replace(qid, old, new, reason):
    assert old in answers[qid], (qid, old)
    answers[qid] = answers[qid].replace(old, new)
    record(qid, reason)

def note(qid, text, title, url):
    body = answers[qid]
    links = []
    while m := re.search(r'\s*(\[[^\]]+\]\(https?://[^\s)]+\))\s*$', body):
        links.insert(0, m[1])
        body = body[:m.start()]
    answers[qid] = body + f'（{text}）' + ''.join(links) + f'[核对来源：{title}]({url})'

INDEX = 'https://git-scm.com/docs/gitdatamodel#index'
RESTORE = 'https://git-scm.com/docs/git-restore#_description'
PULL = 'https://git-scm.com/docs/git-pull#_description'
MERGE = 'https://git-scm.com/docs/git-merge#_fast_forward_merge'
RESET = 'https://git-scm.com/docs/git-reset'
COMMIT = 'https://git-scm.com/docs/git-commit'
PUSH = 'https://git-scm.com/docs/git-push'
STASH = 'https://git-scm.com/docs/git-stash'

# X1: distinguish the logical staged snapshot from physical blob storage.
ix = '区分索引记录与 blob 内容本体'
option('X1-19', 'B', '记录待提交文件路径及内容对象 ID 的 .git/index 索引文件', ix)
replace('X1-19', '.git/index 是暂存区', '.git/index 是暂存区的索引文件，记录文件路径及内容对象 ID', ix)
stem('X1-20', 'git add 更新的暂存区索引通常保存在哪个文件？', ix)
answer('X1-20', '暂存区索引通常保存在 .git/index 中。git add 将文件内容写为 blob 对象，并更新索引中对应的路径和内容对象 ID；文件内容本体不直接保存在索引文件中。', ix)
option('X1-21', 'D', '不会生成 commit，只停留在暂存阶段', '消除提交后索引仍保留引用造成的干扰项歧义')
option('X1-22', 'A', '把工作区的修改加入暂存区，更新 .git/index 中的内容对象引用', ix)
option('X1-23', 'D', '记录待提交文件路径及内容对象 ID 的 .git/index 索引文件', ix)
option('X1-28', 'A', 'git add 更新暂存区索引，记录待提交文件的路径及内容对象 ID', ix)
option('X1-28', 'D', '工作区指的是 .git/index 索引文件', ix)
answer('X1-28', 'git add 更新暂存区索引，记录待提交版本的引用；远程仓库托管在远程服务器；git commit 根据暂存区内容生成本地提交。工作区是本地磁盘上可见、可修改的项目目录，不是索引文件；git push 同步本地 commit，不会直接推送尚未 add 的工作区修改。', ix)
replace('X1-29', '暂存区（Index / Stage）是 git add 之后文件快照暂存的地方，在 .git/index 里', '暂存区（Index / Stage）逻辑上表示待提交的快照，.git/index 索引记录文件路径及内容对象 ID，内容本体存为 blob 对象', ix)
for qid in ['X1-19', 'X1-20', 'X1-22', 'X1-23', 'X1-28', 'X1-29']:
    note(qid, '原文将 git add 后的文件快照描述为暂存在 .git/index 里；这里区分索引记录和 blob 内容本体', 'Git 索引数据模型', INDEX)

# Source-specific restore diagrams retain the original conceptual flow.
rs = '限定从本地提交恢复时需指定来源，澄清 restore 默认来自 index'
stem('X1-26', '在原文的反向数据流简图中，要从本地仓库的指定提交恢复工作区文件，可使用哪组命令（恢复时需指定提交来源）？', rs)
option('X1-26', 'D', 'git checkout 或 git restore（指定提交来源）', rs)
answer('X1-25', '从远程仓库获取更新用 git fetch 或 git pull。简图中的下一步若要从本地提交恢复工作区文件，应指定来源，如 git checkout <commit> -- <file> 或 git restore --source=<commit> <file>；裸 git restore <file> 默认从暂存区索引恢复工作区。git add、git push 属于正向数据流。', rs)
answer('X1-26', '从本地仓库的指定提交恢复工作区文件可用 git checkout <commit> -- <file> 或 git restore --source=<commit> <file>。裸 git restore <file> 默认以暂存区索引为来源。git fetch/pull 用于获取远程更新，git add/commit 属于正向数据流。', rs)
replace('X1-29', '本地仓库 --git checkout/restore--> 工作区', '本地仓库 --指定提交来源的 git checkout/restore--> 工作区；裸 git restore <file> 则默认从暂存区索引恢复工作区', rs)
for qid in ['X1-25', 'X1-26', 'X1-29']:
    note(qid, '原文简图写作“本地仓库 --git checkout/restore--> 工作区”，未注明恢复来源；这里补明指定提交与默认 index 来源的区别', 'git-restore 默认来源', RESTORE)

# Pull questions compare explicit merge and rebase modes; fetch-only stems stay short.
pl = '为 pull 的 fetch + merge 结论补足 merge 策略前提'
replace('X1-31', '是 git pull', '是采用 merge 策略的 git pull', pl)
stem('X1-32', '按原文的 merge 策略，git pull 等价于先执行 ____，再执行 ____（填写命令）。', pl)
replace('X1-32', '2 个空依次是', '在采用 merge 策略的前提下，2 个空依次是', pl)
replace('X1-33', 'git pull 会立刻合并', '采用 merge 策略的 git pull 会在拉取后继续合并', pl)
replace('X1-34', 'git pull 拉取后会立刻合并', '采用 merge 策略的 git pull 拉取后会继续合并', pl)
stem('X1-35', '按原文比较 fetch 与采用 merge 策略的 pull，下列说法哪些正确？', pl)
option('X1-35', 'B', '采用 merge 策略的 git pull 先拉取远程更新，再合并到当前分支', pl)
answer('X1-35', 'fetch 只下载到远程跟踪分支，不改动当前工作区和本地分支，之后可先查看再决定是否整合；本题采用 merge 策略的 pull 相当于 fetch 后执行 merge FETCH_HEAD。fetch 不会自动合并，而这种 pull 也不是只下载更新。', pl)
stem('X1-36', '比较采用 merge 策略的 git pull 与 git fetch：两者有什么区别？按原文，日常开发推荐怎么用？', pl)
replace('X1-36', 'git pull 等价于', '采用 merge 策略时，git pull 等价于', pl)
for qid in ['X1-31','X1-32','X1-33','X1-34','X1-35','X1-36']:
    note(qid, '原文此节将 git pull 概括为 fetch + merge；实际整合方式取决于参数和配置，本组明确采用 merge 策略', 'git-pull 策略', PULL)

# X2: reset --hard restores tracked content; it does not empty the directory.
hd = '将 hard 的“清空/撤销一切”收窄为目标提交的受跟踪内容恢复'
option('X2-4', 'C', '按目标提交恢复暂存区和工作区中的受跟踪内容，丢弃相应本地修改', hd)
replace('X2-4', '撤销一切是 --hard', '按目标提交恢复受跟踪内容并丢弃相应本地修改的是 --hard', hd)
option('X2-5', 'C', '工作区受跟踪内容已恢复到目标提交，需要重新写出原本的修改再提交', hd)
replace('X2-5', '工作区被清空的是 --hard', '--hard 会按目标提交恢复受跟踪内容，丢弃相应本地修改', hd)
stem('X2-6', '尚未 commit 或 stash 的受跟踪本地修改，在 git reset --hard 恢复目标提交之后会怎样？', hd)
answer('X2-6', '--hard 按目标提交恢复暂存区和工作区中的受跟踪内容，相应的未提交本地修改会丢失；这不等于清空整个项目目录。--soft 保留暂存区和工作区，--mixed 保留工作区。', hd)
option('X2-7', 'B', '--hard，按目标提交恢复受跟踪内容，丢弃相应本地修改', hd)
replace('X2-7', '--hard 会把工作区清空', '--hard 会按目标提交恢复受跟踪内容并丢弃相应本地修改', hd)
option('X2-8', 'A', '确认不需要将被覆盖的受跟踪本地修改时', hd)
replace('X2-8', '确认不需要本地所有改动时', '确认不需要将被覆盖的受跟踪本地修改时', hd)
option('X2-9', 'C', '--hard 回退 HEAD，并将暂存区和工作区中的受跟踪内容恢复到目标提交', hd)
replace('X2-9', '--hard 三个区域都回退', '--hard 回退 HEAD，并按目标提交恢复暂存区和工作区中的受跟踪内容', hd)
replace('X2-11', '--hard：三个区域都回退，相当于“撤销一切”，工作区也会被清空，最危险，没 commit 或 stash 的改动会直接丢失，只在确认不需要本地所有改动时才用。', '--hard：回退 HEAD，并将暂存区和工作区中的受跟踪内容恢复到目标提交，相应未提交的本地修改会丢失；这不是清空项目目录，也不表示无条件删除所有未跟踪文件，妨碍恢复受跟踪路径的未跟踪文件或目录可能被覆盖或移除。它最危险，只在确认不需要将被覆盖的本地修改时才用。', hd)
for qid in ['X2-4','X2-5','X2-6','X2-7','X2-8','X2-9','X2-11']:
    note(qid, '原文将 --hard 概括为“撤销一切”“工作区也清空”；准确范围是按目标提交恢复受跟踪内容，不能理解为清空整个目录', 'git-reset --hard', RESET)

# Amend message-only precondition and lease's reference-value comparison.
am = '为 amend 仅改消息补上无额外暂存修改的前提'
stem('X2-22', '暂存区没有额外修改时，只想修改最近一次 commit 的提交信息，应使用原文给出的哪条命令？', am)
replace('X2-22', '只改提交信息用', '暂存区没有额外修改时，只改提交信息可用', am)
replace('X2-30', '只改提交信息，用', '在暂存区没有额外修改时，只改提交信息可用', am)
for qid in ['X2-22','X2-30']:
    note(qid, '原文将 git commit --amend -m 的例子描述为“只改提交信息”，未说明暂存区前提；若已有额外暂存修改，也会带入新提交', 'git-commit --amend', COMMIT)
ls = 'lease 精确表述为远程引用与本地预期值比较'
option('X2-27', 'B', '仅在远程引用当前值仍符合本地预期值时，才允许覆盖', ls)
replace('X2-27', '它会检查远程有没有被别人推过新 commit', '它仅在远程引用当前值仍符合本地预期值时才允许覆盖；未显式指定预期值时，通常依据本地对应的远程跟踪引用', ls)
replace('X2-30', '会检查远程有没有被别人推过新 commit', '仅在远程引用当前值仍符合本地预期值时才允许覆盖；未显式指定预期值时，通常依据本地对应的远程跟踪引用', ls)
for qid in ['X2-27','X2-30']:
    note(qid, '原文说 --force-with-lease“检查远程有没有被别人推过新 commit”；它比较引用当前值与预期值，而非侦测所有历史推送事件', 'git-push --force-with-lease', PUSH)

# Restore index/worktree defaults and avoid describing file movement.
rt = '精确区分 restore 默认 index→工作树与 --staged 默认 HEAD→index'
option('X2-34', 'A', '把暂存区内容移入工作区并自动清空对应的索引条目', rt)
option('X2-34', 'B', '默认从暂存区索引恢复工作区文件，撤销相应未暂存修改', rt)
answer('X2-34', 'git restore <file> 默认从暂存区索引恢复工作区对应文件，撤销相应未暂存修改；不是在暂存区和 HEAD 之间任选来源。git restore --staged <file> 默认从 HEAD 恢复索引，工作区文件保持不变，并不是把内容移动后清空索引。', rt)
option('X2-35', 'D', '默认从 HEAD 恢复暂存区索引中的对应文件，工作区内容不变', rt)
answer('X2-35', 'git restore --staged <file> 默认从 HEAD 恢复暂存区索引中的对应文件，通常用于取消暂存，工作区内容不变；并不是把文件从暂存区移动到工作区。裸 git restore <file> 默认从索引恢复工作区文件。', rt)
option('X2-39', 'A', 'git restore 文件名默认从索引恢复工作区文件，撤销相应未暂存修改', rt)
option('X2-39', 'B', 'git restore --staged 文件名默认从 HEAD 恢复索引，工作区内容不变', rt)
answer('X2-39', 'restore 专门用于恢复文件：git restore <file> 默认从索引恢复工作区文件；git restore --staged <file> 默认从 HEAD 恢复索引，工作区内容不变。切换分支用 switch；restore 是 Git 2.23 引入的。', rt)
replace('X2-41', 'git restore 文件名撤销工作区修改，恢复到暂存区或 HEAD 的版本；git restore --staged 文件名把文件从暂存区撤回工作区，等价于老的 git reset HEAD 文件名', 'git restore <file> 默认从暂存区索引恢复工作区文件，撤销相应未暂存修改；git restore --staged <file> 默认从 HEAD 恢复索引，工作区内容不变，通常用于取消暂存，等价于老的 git reset HEAD <file>；若要选取其他提交作为恢复来源，需使用 --source', rt)
for qid in ['X2-34','X2-35','X2-39','X2-41']:
    note(qid, '原文把裸 restore 的来源写为“暂存区或 HEAD”，并将 --staged 描述为“把文件从暂存区撤回到工作区”；这里分别说明默认来源与实际恢复目标', 'git-restore 默认来源与目标', RESTORE)

# Stash deletion only follows successful application.
sp = 'stash pop 成功应用才删除，冲突时保留'
option('X2-45', 'B', 'pop 成功应用后从 stash 栈删除，冲突时保留；apply 应用后不删除', sp)
replace('X2-45', '取出后从 stash 栈删除', '成功应用后从 stash 栈删除，发生冲突时保留', sp)
replace('X2-46', 'pop 取出后会从栈中删除', 'pop 成功应用后会从栈中删除，冲突时保留', sp)
option('X2-50', 'B', 'git stash pop 成功应用后从 stash 栈中删除，冲突时保留', sp)
replace('X2-50', 'pop 取出后从栈中删除', 'pop 成功应用后从栈中删除，冲突时保留', sp)
replace('X2-52', '取出后从栈中删除', '成功应用后从栈中删除，冲突时 stash 保留', sp)
for qid in ['X2-45','X2-46','X2-50','X2-52']:
    note(qid, '原文以正常成功流程概括 pop“取出后会从 stash 栈中删除”；此处补明应用冲突时会保留 stash', 'git-stash pop', STASH)

# Sensitive history: --all pushes heads, tags need separate attention.
ss = '限定 --all 仅推分支，补上受影响标签处理与密钥轮换'
stem('X2-56', '清理历史后，按原文给出的命令，如何强制同步所有已重写的本地分支到远程（不含标签）？', ss)
option('X2-56', 'C', 'git push --force --all 强制同步所有已重写的本地分支', ss)
answer('X2-56', 'git push --force --all 可强制同步所有本地分支（refs/heads/），不包含标签。清理敏感历史还需处理并同步所有受影响的标签，确认相关引用不再指向旧敏感历史，并协调协作者重新 clone。', ss)
option('X2-59', 'B', '用 git push --force --all 同步已重写的分支，并另行处理和同步受影响的标签', ss)
replace('X2-59', 'git push --force --all 强推', 'git push --force --all 同步已重写的分支，并另行处理和同步受影响的标签', ss)
replace('X2-61', '清理完后必须 git push --force --all 强推覆盖远程，并让所有协作者重新 clone。', '清理后要协调同步所有受影响的分支和标签，确认相关引用不再指向旧敏感历史。git push --force --all 仅强制推送所有本地分支（refs/heads/），不包含标签；受影响的标签需要另行处理并同步。还要让所有协作者重新 clone，避免重新带回旧历史。', ss)
for qid in ['X2-56','X2-59','X2-61']:
    note(qid, '原文仅列 git push --force --all 作为清理后的同步步骤，遗漏标签；--all 只覆盖分支，不能当成已同步全部引用', 'git-push --all 与 --tags', PUSH)

# X3: a new merge commit requires a non-fast-forward merge (or --no-ff).
mg = '将新 merge commit 限定为非快进合并，补快进例外'
option('X3-1', 'A', '在非快进合并时，将两个分支上的提交历史连接到一个新的合并提交', mg)
option('X3-1', 'C', '在非快进合并时，创建新的合并提交来连接两个分支的提交历史', mg)
replace('X3-1', '把两个分支的提交历史合并成新提交、创建合并提交把历史连接起来的是 Merge', '在非快进合并时，用新合并提交连接两个分支的历史的是 Merge', mg)
replace('X3-2', '都是 Merge 的特点', '属于这里所比较的非快进 Merge 的特点', mg)
stem('X3-3', '按原文比较 Rebase 与非快进 Merge，执行这种 Merge 时 Git 会做什么？', mg)
replace('X3-3', '执行 Merge 时', '执行非快进 Merge 时', mg)
stem('X3-4', '按原文比较 Rebase 与非快进 Merge，后者合并后的提交历史有什么特点？', mg)
replace('X3-4', 'Merge 合并后的历史', '非快进 Merge 合并后的历史', mg)
replace('X3-5', '另外两项描述的是 Merge', '将两边修改纳入合并提交、用新提交连接历史，描述的是非快进 Merge', mg)
stem('X3-6', '按原文，执行非快进 Merge 后，两个分支的修改都会包含在哪里？', mg)
replace('X3-6', 'Merge 会创建', '非快进 Merge 会创建', mg)
stem('X3-7', '按原文，下列哪些属于非快进 Merge 的特点？', mg)
replace('X3-7', 'Merge 会创建', '非快进 Merge 会创建', mg)
replace('X3-8', '是 Merge 的特点', '是此处所比较的非快进 Merge 的特点', mg)
replace('X3-9', 'Merge（合并）则会创建', 'Merge（合并）在非快进合并或使用 --no-ff 强制生成合并提交时，会创建', mg)
for qid in [f'X3-{n}' for n in range(1,10)]:
    note(qid, '原文此节概括 Merge“会创建一个新的合并提交”；快进合并是例外，只前移分支引用，不创建新 merge commit', 'git-merge 快进合并', MERGE)
stem('X3-19', '使用 git 合并发生冲突后，应通过哪些命令和步骤解决冲突并完成合并？', '收窄为原文已展开的合并冲突后处理步骤')

# Explicit pull strategies and divergence conditions across both chapters.
stem('X3-20', '按原文的比较，明确采用 merge 策略的 git pull 等价于哪两个操作？', pl)
answer('X3-20', '明确采用 merge 策略时，git pull 相当于 fetch 后执行 merge；git pull --rebase 则是 fetch 后执行 rebase。', pl)
replace('X3-21', 'fetch + merge 是不带 --rebase 的 git pull', 'fetch + merge 对应明确采用 merge 策略的 git pull，不能仅凭省略 --rebase 判断策略', pl)
stem('X3-22', '按原文，本地和远程分支已经分叉、各有对方没有的新 commit 时，明确采用 merge 策略的 git pull 会怎样整合？', pl)
option('X3-22', 'D', '产生额外的 merge commit，保留并连接两边的分叉历史', pl)
answer('X3-22', '本地和远程已经分叉时，采用 merge 策略的 git pull 先 fetch，再生成 merge commit 连接并保留两边的历史；不是拉取才造成分叉。把本地提交在远程最新提交之后重放、得到线性历史，是本题比较的 rebase 策略。', pl)
replace('X3-23', '额外生成 merge commit 是普通 git pull 的结果', '在两边已经分叉时，采用 merge 策略的 git pull 会额外生成 merge commit', pl)
stem('X3-28', '按原文，本地与远程分支已分叉、各有对方没有的新 commit，且 git pull 明确采用 merge 策略。关于这次拉取与整合，下列哪些说法正确？', '把 merge 策略与双方已分叉的条件用于全部选项')
option('X3-28', 'B', '整合时会产生一个额外的 merge commit', pl)
option('X3-28', 'C', '保留两边已有的分叉历史，并增加合并节点将其连接', pl)
option('X3-28', 'E', '不会增加 merge commit，且能将两边历史变成单线历史', pl)
answer('X3-28', '在题设已分叉且采用 merge 策略的条件下，pull 先 fetch，再通过额外的 merge commit 连接两边已有的分叉历史。它不会把本地提交在远程最新提交之后重放，也不会把双方历史改成单线。能否快进属于另一种条件，不适用于本题。', pl)
replace('X3-29', '额外的 merge commit 是普通 git pull 的结果', '双方已分叉时，额外的 merge commit 对应采用 merge 策略的 git pull', pl)
stem('X3-30', '按原文比较两种策略：明确采用 merge 策略的 git pull 等价于 ____ 加 ____，git pull --rebase 等价于 ____ 加 ____。', pl)
replace('X3-30', '4 个空依次是', '本题明确比较 merge 策略与 rebase 策略，4 个空依次是', pl)
stem('X3-31', '比较 git pull 的 merge 策略与 git pull --rebase 的 rebase 策略：两者如何整合已分叉的历史？按原文推荐什么时候用哪种方式，有什么注意事项？', pl)
replace('X3-31', 'git pull = fetch + merge，本地和远程都有新 commit 时会产生一个额外的 merge commit，让提交历史出现分叉。', '明确采用 merge 策略时，git pull = fetch + merge；本地与远程已经分叉、各有对方没有的新 commit 时，会产生额外的 merge commit，连接并保留两边已有的分叉历史；若可快进则无需新 merge commit。', pl)
for qid in ['X3-20','X3-21','X3-22','X3-23','X3-28','X3-29','X3-30','X3-31']:
    note(qid, '原文把裸 git pull 概括为 fetch + merge；实际策略受参数及 pull.rebase 等配置影响，本组明确比较 merge 与 rebase 策略', 'git-pull 策略', PULL)

ff = '快进条件改为 main tip 是 feat/a tip 的祖先'
stem('X3-32', '将 feat/a 合入 main 时，Fast-Forward（快进）合并的条件是什么？', ff)
option('X3-32', 'C', 'main tip 是 feat/a tip 的祖先', ff)
answer('X3-32', '将 feat/a 合入 main 时，若当前 main 的 tip 是 feat/a tip 的祖先，就可以直接把 main 引用前移到 feat/a，完成快进，不产生新 merge commit。双方分叉、各有对方没有的提交时，不能这样快进。', ff)
replace('X3-41', '目标分支（如 main）和要合并的分支（如 feat/a）是直接上下游关系，也就是 main 从 feat/a 分出去之后没有新的 commit', '将 feat/a 合入 main 时，当前 main 的 tip 是 feat/a tip 的祖先', ff)

# X4: remove Clone exclusivity, and delete the invented tag-parameter rule.
cl = '删除只有 clone 才能本地编辑测试编译的绝对断言'
option('X4-19', 'D', '把仓库克隆到本地，便于在本地编辑、测试和编译代码', cl)
replace('X4-19', '只有 clone 下来的代码你才能在本地编辑、测试、编译', '把仓库克隆到本地后，便于在本地编辑、测试和编译代码', cl)
replace('X4-25', '只有 clone 下来的代码才能在本地编辑、测试、编译', '把仓库克隆到本地便于编辑、测试和编译代码', cl)
for qid in ['X4-19','X4-25']:
    note(qid, '原文说“只有 clone 下来的代码才能在本地编辑、测试、编译”；官方 archive 文档可导出并解压源码归档，据此可知本地源码不只来自 clone', 'git-archive 源码归档示例', 'https://git-scm.com/docs/git-archive#_examples')
answer('X4-41', '轻量标签只是一个指向 commit 的指针，没有额外的标签对象信息。作为独立对象存储并包含打标签者、日期、说明乃至 GPG 签名的是附注标签；原文示例使用 git tag -a v1.0 -m "Release version 1.0"。D 所说“必须同时带 -a 和 -m”本身也不成立：指定 -a 而不提供 -m/-F 时可在编辑器输入说明，只指定 -m 也可隐含 -a。', '删除解析自行添加的附注 tag 参数必须同时提供约束')
answers['X4-41'] += '[核对来源：git-tag 参数说明](https://git-scm.com/docs/git-tag#_description)'

# Remove option-position language before moving options, to avoid drift.
answer('X1-15', '--soft 保留暂存区和工作区的改动；--mixed 是默认模式；按原文撤回 push 的流程，需本地回退后再强制推送。--mixed 会回退暂存区，相关改动只保留在工作区；本地 reset 不会让远程自动回退。', '多选解析改为按内容说明，消除位置依赖')
answer('X1-45', 'git diff 默认对比工作区与暂存区；--cached 与 --staged 等价；git diff HEAD 对比工作区与 HEAD，原文称这是最常用的写法。--cached 对比的是暂存区与 HEAD，不是工作区与 HEAD；不带参数的 git diff 也不是对比暂存区与 HEAD。', '多选解析改为按内容说明，消除位置依赖')
replace('X3-60', '另两条是删除本地分支和远程分支', 'git branch -d 删除本地分支，git push origin --delete 删除远程分支', '多选解析按命令内容说明，消除顺序依赖')

# Deliberately varied permutations; each option keeps its corrected truth value.
permutations = {
    'X1-15': 'ADBEC', 'X1-28': 'DBACE', 'X1-35': 'EADBC',
    'X1-45': 'CADBE', 'X1-50': 'CADB',
    'X2-9': 'DABEC', 'X2-18': 'BDECA', 'X2-28': 'ACDEB',
    'X2-38': 'CAEDB', 'X2-39': 'DBEAC', 'X2-49': 'ADEBC',
    'X2-50': 'EBCDA', 'X2-59': 'CEAFBD',
    'X3-7': 'AEDCB', 'X3-8': 'DBACE', 'X3-18': 'CADEB',
    'X3-28': 'DEABC', 'X3-29': 'ABECD', 'X3-38': 'BEADC',
    'X3-39': 'EBCDA', 'X3-48': 'ACBD', 'X3-49': 'DABCE',
    'X3-59': 'CDBEA', 'X3-60': 'ADCB',
}
key_changes = []
for qid, order in permutations.items():
    q = questions[qid]
    old = {o['key']: o for o in q['options']}
    assert sorted(order) == sorted(old)
    old_correct = ''.join(k for k, o in old.items() if o['correct'])
    q['options'] = [old[k] for k in order]
    for i, o in enumerate(q['options']):
        o['key'] = chr(65 + i)
    new_correct = ''.join(o['key'] for o in q['options'] if o['correct'])
    assert new_correct != ''.join(chr(65+i) for i in range(len(new_correct)))
    key_changes.append((qid, old_correct, new_correct, order))
    record(qid, '多选选项重排（保留各内容真假属性）')

# Before writing, enforce shape/order/status and single-answer stability.
for c, chapter in data['chapters'].items():
    prev = before_data['chapters'][c]
    assert chapter['status'] == prev['status'] == 'draft'
    assert len(chapter['questions']) == len(prev['questions'])
    for old_q, new_q in zip(prev['questions'], chapter['questions']):
        assert (old_q['id'], old_q['type']) == (new_q['id'], new_q['type'])
        if new_q['type'] == 'single':
            assert [o['key'] for o in old_q['options'] if o['correct']] == [o['key'] for o in new_q['options'] if o['correct']]
        if new_q['type'] == 'fill':
            assert old_q['blankCount'] == new_q['blankCount']
            assert old_q['blankOrder'] == new_q['blankOrder']
            assert new_q['stem'].count('____') == new_q['blankCount']
            assert stems[new_q['id']].endswith(new_q['stem'])

def output_lines(lines, values):
    return '\n'.join('- **'+m[1]+'** '+values[m[1]] if (m := pattern.match(l)) else l for l in lines) + '\n'

def write_like_before(path, text):
    if b'\r\n' in original[path]:
        text = text.replace('\n', '\r\n')
    (ROOT / path).write_bytes(text.encode('utf-8'))

write_like_before(PATHS[0], output_lines(question_lines, stems))
write_like_before(PATHS[1], output_lines(answer_lines, answers))
write_like_before(PATHS[2], json.dumps(data, ensure_ascii=False, indent=2) + '\n')

changed = []
old_stems = {m[1]: m[2] for l in question_lines if (m := pattern.match(l))}
old_answers = {m[1]: m[2] for l in answer_lines if (m := pattern.match(l))}
old_questions = {q['id']: q for c in before_data['chapters'].values() for q in c['questions']}
for qid, q in questions.items():
    places = []
    if stems[qid] != old_stems[qid]: places.append('题卷')
    if answers[qid] != old_answers[qid]: places.append('答案')
    if q != old_questions[qid]: places.append('typed')
    if places:
        assert qid in reasons, qid
        changed.append((qid, places, reasons[qid]))

notes = [
    '# Git 题库修订实施记录（2026-10-15）', '',
    '本轮仅修改三份 Git 内容文件；审查前报告、checks/questions/source 快照保持不变。4 章保持 `draft`，252 个题号、题序、题型、填空空数及有序/无序不变。170 道单选的选项顺序和正确字母不变。没有执行 Git 提交、推送、标签、PR、reset 或 clean，也没有建立临时提交。', '',
    '## 修订前快照与哈希', '',
    '开工时三份现文件 SHA-256 均与原 checks.json 一致。`before/` 保留按原相对路径复制的原文件，创建时拒绝覆盖。', '',
    '| 文件 | SHA-256 |', '| --- | --- |',
]
notes += [f'| {p} | {hashlib.sha256(original[p]).hexdigest()} |' for p in PATHS]
notes += ['', '## 逐题变更', '', f'共 **{len(changed)}** 个题号发生实际变更，含仅选项重排的题目。', '', '| 题号 | 修改位置 | 内容 |', '| --- | --- | --- |']
notes += [f'| {qid} | {"、".join(places)} | {"；".join(rs)} |' for qid, places, rs in changed]
notes += ['', '## 24 道多选原/新正确 key 集合', '', '排列列按旧 key 说明各选项在新 A、B、C……位置的顺序；各个选项经过技术修订后的真假属性保持不变。X4 的 6 道多选未重排。', '', '| 题号 | 原正确 key | 新正确 key | 新顺序（旧 key） |', '| --- | --- | --- | --- |']
notes += [f'| {qid} | {old} | {new} | {order} |' for qid, old, new, order in key_changes]
notes += ['', '## 校验与边界', '',
    '- 编辑脚本在写入前检查：4 章均 draft；252 题题号、题序、题型保持；170 单选正确 key 不变；28 填空空数、blankOrder、typed 与 Markdown 题干同步；24 多选均不再为从 A 开始的连续前缀。',
    '- 原文技术勘误保留原文引用、括注原先说法并附 git-scm.com 官方“核对来源：”；X4-41 是解析自行增加的参数约束，直接删除错误并解释 D 的“必须”不成立。',
    '- X2-19 口诀、已排除的 gitignore 前导 /、工作流偏好不变；没有增加考点或改变题型。',
    '- 本轮为内容编辑，不新增镜像文案测试，不运行会覆盖审查前快照的 audit.ts；content:validate 的实际结果在执行后补记。',
]
(FIX / 'implementation-notes.md').write_text('\n'.join(notes)+'\n', encoding='utf-8')
print(json.dumps({'changedCount': len(changed), 'changedIds': [x[0] for x in changed], 'multipleKeyChanges': key_changes}, ensure_ascii=False, indent=2))
