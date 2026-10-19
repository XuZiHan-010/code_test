import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { parseBlocks, type Block, type Inline } from "@/lib/markdown";

/**
 * 把复习资料的 Markdown 渲染成页面。节点逐个生成 React 元素，文本由 React 转义，
 * 不使用 dangerouslySetInnerHTML。
 */

function Inlines({ nodes }: { nodes: Inline[] }): ReactNode {
  return nodes.map((node, index) => {
    switch (node.t) {
      case "text":
        return <Fragment key={index}>{node.text}</Fragment>;
      case "strong":
        return (
          <strong key={index} className="font-bold text-ink">
            <Inlines nodes={node.children} />
          </strong>
        );
      case "code":
        return (
          <code key={index} className="rounded-md bg-paper-deep px-1.5 py-0.5 font-mono text-[0.9em] break-words text-ink">
            {node.text}
          </code>
        );
      case "link":
        return node.href.startsWith("http") ? (
          <a key={index} href={node.href} target="_blank" rel="noreferrer" className="link">
            <Inlines nodes={node.children} /> ↗
          </a>
        ) : (
          <Link key={index} href={node.href} className="link">
            <Inlines nodes={node.children} />
          </Link>
        );
    }
  });
}

const HEADING_CLASS = {
  1: "mt-10 mb-4 font-head text-3xl leading-tight font-bold",
  2: "mt-10 mb-4 border-b border-rule pb-2 font-head text-2xl leading-tight font-bold",
  3: "mt-7 mb-3 font-head text-lg leading-snug font-bold text-accent",
} as const;

function BlockView({ block }: { block: Block }): ReactNode {
  switch (block.t) {
    case "heading": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3";
      return (
        // 顶部导航是吸顶的，跳转到锚点时留出空间
        <Tag id={block.id} className={`${HEADING_CLASS[block.level]} scroll-mt-20`}>
          <Inlines nodes={block.children} />
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p className="my-4 leading-8">
          <Inlines nodes={block.children} />
        </p>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className={`my-4 space-y-1.5 pl-6 leading-8 marker:text-accent ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item, index) => (
            <li key={index}>
              <Inlines nodes={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "table":
      return (
        <div className="my-5 overflow-x-auto border border-rule" tabIndex={0} role="region" aria-label="表格，可横向滚动">
          <table className="w-full min-w-max border-collapse text-left text-sm leading-6">
            <thead className="bg-paper-deep">
              <tr>
                {block.header.map((cell, index) => (
                  <th key={index} scope="col" className="border-b border-rule px-3 py-2 font-bold whitespace-nowrap">
                    <Inlines nodes={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-rule last:border-b-0">
                  {row.map((cell, index) => (
                    <td key={index} className="px-3 py-2 align-top">
                      <Inlines nodes={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "quote":
      return (
        <aside className="my-5 border-l-4 border-accent bg-paper px-4 py-1 [&>*:first-child]:mt-3 [&>*:last-child]:mb-3">
          <Blocks blocks={block.blocks} />
        </aside>
      );
    case "code":
      return (
        <pre className="my-4 overflow-x-auto border border-rule bg-paper px-4 py-3 font-mono text-sm leading-6">
          <code>{block.text}</code>
        </pre>
      );
  }
}

function Blocks({ blocks }: { blocks: Block[] }): ReactNode {
  return blocks.map((block, index) => <BlockView key={index} block={block} />);
}

export function GuideMarkdown({
  markdown,
  omitTitle = false,
}: {
  markdown: string;
  /** 页面自己已经显示了资料标题时，去掉正文开头的 # 标题 */
  omitTitle?: boolean;
}) {
  const blocks = parseBlocks(markdown);
  const visible = omitTitle && blocks[0]?.t === "heading" && blocks[0].level === 1 ? blocks.slice(1) : blocks;
  return (
    <div className="[&>*:first-child]:mt-0">
      <Blocks blocks={visible} />
    </div>
  );
}
