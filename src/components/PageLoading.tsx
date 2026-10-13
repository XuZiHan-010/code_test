/** 页面内容还在加载时的占位 */
export function PageLoading({ label = "正在加载…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="py-16 text-center text-sm text-ink-faint">
      <span className="mr-2 inline-block h-3 w-3 animate-pulse rounded-full bg-rule align-middle" />
      {label}
    </div>
  );
}
