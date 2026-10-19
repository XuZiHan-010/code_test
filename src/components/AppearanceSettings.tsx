"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "quiz-appearance";

export function AppearanceSettings() {
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function sync() {
      setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    }
    sync();
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      const value = event.newValue === "dark" ? "dark" : "light";
      applyTheme(value);
      setTheme(value);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  function choose(value: "light" | "dark") {
    applyTheme(value);
    setTheme(value);
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* Still works for this visit. */ }
  }

  return (
    <div className="appearance-settings" ref={root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={trigger} type="button" className="settings-trigger" aria-label="设置" aria-expanded={open} aria-controls="appearance-panel" onClick={() => setOpen(!open)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="m9 3-.6 2.2-2 .9-2.1-.6-2 3.5 1.6 1.6v2.8L2.3 15l2 3.5 2.1-.6 2 .9L9 21h4l.6-2.2 2-.9 2.1.6 2-3.5-1.6-1.6v-2.8L19.7 9l-2-3.5-2.1.6-2-.9L13 3Z" transform="translate(1 0)" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
      {open && (
        <section id="appearance-panel" aria-label="外观设置" className="settings-panel">
          <h2 className="font-bold text-ink">外观设置</h2>
          <p className="mt-1 mb-4 text-xs text-ink-soft">选择适合你的阅读方式</p>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="配色模式">
            <button type="button" className="theme-choice" aria-pressed={theme === "light"} onClick={() => choose("light")}><span aria-hidden="true">☀</span> 浅色</button>
            <button type="button" className="theme-choice" aria-pressed={theme === "dark"} onClick={() => choose("dark")}><span aria-hidden="true">☾</span> 深色</button>
          </div>
        </section>
      )}
    </div>
  );
}

function applyTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? "#141b1a" : "#f6f7f4";
}
