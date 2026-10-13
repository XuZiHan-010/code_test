import { AppNav } from "@/components/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:py-10">{children}</main>
    </>
  );
}
