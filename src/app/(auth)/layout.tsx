export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="rise w-full max-w-sm">
        <p className="eyebrow mb-3 text-center">Interview Workbook</p>
        <h1 className="title mb-8 text-center">面试题练习册</h1>
        <div className="sheet px-6 py-7 sm:px-8">{children}</div>
        <p className="mt-6 text-center text-xs leading-6 text-ink-faint">
          题目依据小林面试笔记的公开文章整理，每道题的解答都附原文出处。
        </p>
      </div>
    </main>
  );
}
