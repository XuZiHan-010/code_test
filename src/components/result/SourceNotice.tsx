/** 展示解答的页面都要带上的来源说明（FR-029） */
export function SourceNotice() {
  return (
    <aside className="border-l-2 border-rule pl-4 text-xs leading-6 text-ink-faint">
      题目和解答依据
      <a href="https://xiaolinnote.com/" target="_blank" rel="noreferrer" className="link mx-1">
        小林面试笔记
      </a>
      的公开文章整理（FastAPI 专题依据官方文档），每道题附有原文出处。解答是对原文的转述，其中的经验数字、产品命令和阈值以原文写作时为准，实际使用前请核对当前的官方资料。
    </aside>
  );
}
