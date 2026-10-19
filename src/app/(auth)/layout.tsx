import { AppearanceSettings } from "@/components/AppearanceSettings";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="auth-shell">
      <div className="auth-settings"><AppearanceSettings /></div>
      <section className="auth-form-panel">
        <p className="mb-8 text-center text-sm font-bold text-ink-soft">面试题练习册</p>
        {children}
      </section>
    </main>
  );
}
