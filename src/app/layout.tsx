import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./appearance.css";
import { appearanceScript } from "@/lib/appearance";

export const metadata: Metadata = {
  title: { default: "面试题练习册", template: "%s · 面试题练习册" },
  description: "按章节练习大模型、Agent、Claude Code 与 Codex 面试题，自动评分并记录错题。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f7f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: appearanceScript }} /></head>
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#main-content">跳转到主要内容</a>
        {children}
      </body>
    </html>
  );
}
