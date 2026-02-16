import Link from "next/link";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="print-hide sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold tracking-tight">AI Resume Builder</div>
          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link className="hover:underline underline-offset-4" href="/builder">
              Builder
            </Link>
            <Link className="hover:underline underline-offset-4" href="/preview">
              Preview
            </Link>
            <Link className="hover:underline underline-offset-4" href="/proof">
              Proof
            </Link>
          </nav>
          <div className="text-xs font-semibold text-black/60">Premium</div>
        </div>
      </div>

      <div className="print-root mx-auto w-full max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
