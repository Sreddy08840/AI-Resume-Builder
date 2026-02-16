import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function Home() {
  return (
    <AppShell>
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-8 py-10">
        <h1 className="text-5xl font-semibold tracking-tight">
          Build a Resume That Gets Read.
        </h1>
        <p className="text-lg leading-8 text-black/70">
          A clean, premium resume builder with a live preview.
        </p>
        <Link
          href="/builder"
          className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/90"
        >
          Start Building
        </Link>
      </div>
    </AppShell>
  );
}
