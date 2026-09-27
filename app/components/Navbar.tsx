import Link from "next/link";
import { GITHUB_URL, NPM_URL } from "../lib/links";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          aria-label="ViCode home"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-zinc-100"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 font-mono text-sm text-emerald-400"
          >
            &gt;_
          </span>
          <span>
            ViCode
            <span className="ml-2 hidden rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[11px] font-normal text-zinc-400 sm:inline">
              Terminal AI coding agent
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="#install"
            className="rounded-md bg-emerald-500 px-3 py-1.5 font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            Install
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Star ViCode"
            className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50"
          >
            ★ Star
          </a>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="npm vicode-ai package"
            className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50"
          >
            npm
          </a>
        </div>
      </nav>
    </header>
  );
}
