"use client";

/**
 * 题目概览，做成答题卡上涂卡格的样子：已答的涂黑，当前题加圈。
 * 点一格跳到那道题。
 */
export function QuestionOverview({
  items,
  currentIndex,
  onJump,
}: {
  items: { id: string; answered: boolean }[];
  currentIndex: number;
  onJump: (index: number) => void;
}) {
  const answered = items.filter((item) => item.answered).length;

  return (
    <section aria-label="题目概览" className="sheet px-5 py-5 sm:px-6">
      <header className="mb-4 flex items-baseline justify-between">
        <h3 className="font-head text-base font-bold">答题卡</h3>
        <p className="text-sm text-ink-soft">
          已答 <span className="font-mono text-ink">{answered}</span> / {items.length}
          {answered < items.length && (
            <span className="ml-2 text-pen">还有 {items.length - answered} 题未答</span>
          )}
        </p>
      </header>
      <ol className="grid grid-cols-[repeat(auto-fill,minmax(2.75rem,1fr))] gap-2">
        {items.map((item, index) => {
          const current = index === currentIndex;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onJump(index)}
                aria-current={current ? "step" : undefined}
                aria-label={`第 ${index + 1} 题，${item.answered ? "已答" : "未答"}`}
                className={`flex h-11 w-full cursor-pointer items-center justify-center border font-mono font-bold text-sm transition-colors ${
                  item.answered
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-rule bg-card text-ink-soft hover:border-ink-faint"
                } ${current ? "ring-2 ring-pen ring-offset-2 ring-offset-card" : ""}`}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
