import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { GuideMarkdown } from "@/components/guide/GuideMarkdown";
import { PageLoading } from "@/components/PageLoading";
import { parseBlocks } from "@/lib/markdown";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { getCatalog } from "@/server/content/catalog";

async function GuideContent({ params }: { params: Promise<{ slug: string }> }) {
  await requireUserOrRedirect();
  const { slug } = await params;
  const guide = getCatalog().getGuide(slug);
  if (!guide) notFound();

  // 目录：写了 {#id} 的 ## 标题（没有 id 的无法跳转，不列入）
  const toc = parseBlocks(guide.markdown).flatMap((block) =>
    block.t === "heading" && block.level === 2 && block.id ? [{ id: block.id, text: block.text }] : [],
  );
  const tocLinks = (
    <ol className="space-y-1.5 text-sm leading-6">
      {toc.map((item) => (
        <li key={item.id}>
          <Link href={`#${item.id}`} className="text-ink-soft hover:text-accent">
            {item.text}
          </Link>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="rise">
      <p className="eyebrow mb-2">
        <Link href="/practice" className="hover:text-ink">
          做题模式
        </Link>
        <span className="mx-2">/</span>
        复习资料
      </p>
      <h1 className="title">{guide.title}</h1>

      <div className="mt-8 gap-8 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)]">
        {toc.length > 1 && (
          <>
            <details className="sheet mb-6 px-4 py-3 lg:hidden">
              <summary className="cursor-pointer text-sm font-bold">目录</summary>
              <div className="mt-3">{tocLinks}</div>
            </details>
            <nav aria-label="目录" className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto border-l-2 border-rule pl-4">
                <p className="eyebrow mb-3">Contents</p>
                {tocLinks}
              </div>
            </nav>
          </>
        )}
        <article className={`sheet min-w-0 px-5 py-6 sm:px-8 ${toc.length > 1 ? "" : "lg:col-span-2"}`}>
          <GuideMarkdown markdown={guide.markdown} omitTitle />
        </article>
      </div>
    </div>
  );
}

export default function GuidePage(props: PageProps<"/guides/[slug]">) {
  return (
    <Suspense fallback={<PageLoading />}>
      <GuideContent params={props.params} />
    </Suspense>
  );
}
