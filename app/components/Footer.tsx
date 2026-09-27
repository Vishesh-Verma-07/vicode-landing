import { GITHUB_URL, NPM_URL } from "../lib/links";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#09090b]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-8 font-mono text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="text-zinc-200">ViCode</span> — Terminal AI coding
          agent · MIT license · by Vishesh Verma
        </p>
        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ViCode on GitHub"
            className="transition-colors hover:text-zinc-100"
          >
            GitHub
          </a>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ViCode on npm"
            className="transition-colors hover:text-zinc-100"
          >
            npm
          </a>
        </div>
      </div>
    </footer>
  );
}
