import { GITHUB_URL } from "../lib/links";

export default function SafetyStrip() {
  return (
    <div
      role="region"
      aria-label="Blast Radius safety"
      className="flex min-w-0 flex-col gap-4 overflow-hidden rounded-lg border border-zinc-800 bg-black p-4 sm:p-5"
    >
      <h3 className="font-mono text-sm font-semibold text-zinc-100">
        Blast Radius
      </h3>
      <p className="text-sm leading-relaxed text-zinc-400">
        What the model is allowed to touch without approval — in-project by
        default. Sensitive Paths and anything outside the Project Root pause
        for approval instead of running silently.
      </p>
      <ul className="flex flex-col gap-3 sm:gap-2">
        <li className="font-mono text-xs leading-relaxed text-zinc-400">
          <span className="text-zinc-200">Turn-scoped approval memory</span>{" "}
          — approve a path once and later calls to that path run without
          re-asking for the rest of the turn. This memory resets at the start
          of every turn, on session switch, and on a new session.
        </li>
        <li className="font-mono text-xs leading-relaxed text-zinc-400">
          <span className="text-zinc-200">Bash Allowlist re-check</span> — the
          allowlist is re-checked on every single call, and there is no
          turn-memory for bash approvals. An empty allowlist means every bash
          call asks.
        </li>
      </ul>
      <p className="font-mono text-xs text-zinc-500">
        How approval works, in the{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Approval docs in the ViCode README"
          className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-50"
        >
          README
        </a>
        .
      </p>
    </div>
  );
}
