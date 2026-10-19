export type ReferenceSegment =
  | { type: "text"; content: string }
  | { type: "code"; language: string; content: string };

const FENCE = /```([\w+-]*)\n([\s\S]*?)\n```/g;

/** 把参考答案按围栏代码块切开。围栏没有闭合时整段按文字处理。 */
export function splitReferenceAnswer(text: string): ReferenceSegment[] {
  const segments: ReferenceSegment[] = [];
  let last = 0;
  for (const match of text.matchAll(FENCE)) {
    const before = text.slice(last, match.index).trim();
    if (before) segments.push({ type: "text", content: before });
    segments.push({ type: "code", language: match[1], content: match[2] });
    last = match.index + match[0].length;
  }
  const rest = text.slice(last).trim();
  if (rest) segments.push({ type: "text", content: rest });
  return segments.length > 0 ? segments : [{ type: "text", content: text }];
}

/** 参考答案：文字照常换行，围栏代码块用等宽、可横向滚动的样式。 */
export function ReferenceAnswer({ text }: { text: string }) {
  return (
    <div className="space-y-3">
      {splitReferenceAnswer(text).map((segment, index) =>
        segment.type === "code" ? (
          <pre key={index} className="overflow-x-auto border border-rule bg-paper px-4 py-3 font-mono text-sm leading-6">
            <code>{segment.content}</code>
          </pre>
        ) : (
          <p key={index} className="leading-8 whitespace-pre-wrap">{segment.content}</p>
        ),
      )}
    </div>
  );
}
