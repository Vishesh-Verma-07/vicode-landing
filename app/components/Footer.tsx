import Link from "next/link";
import { GITHUB_URL } from "../lib/links";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 font-mono text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <p className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background-elevated font-mono text-xs text-accent">
              {">&_"}
            </span>
            <span className="text-text-primary">ViCode</span>
          </p>
          <p className="text-text-muted">Think it through. Then build it.</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <nav aria-label="Footer navigation" className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <Link href="#product" className="transition-colors hover:text-text-primary">Product</Link>
            <Link href="#philosophy" className="transition-colors hover:text-text-primary">Philosophy</Link>
          </nav>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ViCode on GitHub"
            className="transition-colors hover:text-text-primary"
          >
            GitHub
          </a>
          <span className="text-text-muted hidden sm:inline">MIT License</span>
        </div>
      </div>
    </footer>
  );
}