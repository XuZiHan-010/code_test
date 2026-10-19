import { AppNav } from "@/components/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-12">{children}</main>
    </>
  );
}
