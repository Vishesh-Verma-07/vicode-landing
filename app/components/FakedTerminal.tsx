"use client";

import { useEffect, useState } from "react";
import {
  AUTO_RESTART_MS,
  ELAPSED_LABEL,
  TERMINAL_STEPS,
  type TerminalStepId,
} from "../lib/terminal-script";

function StepContent({ id }: { id: TerminalStepId }) {
  switch (id) {
    case "prompt":
      return (
        <p>
          <span className="text-emerald-400">vicode [build] › </span>
          <span className="text-zinc-50">
            fix the login crash on empty password
          </span>
        </p>
      );
    case "search":
      return (
        <p>
          <span className="text-sky-300">search “login”</span>
          <span className="text-zinc-400"> — 3 matches in src/auth.ts</span>
        </p>
      );
    case "read":
      return (
        <p>
          <span className="text-sky-300">read src/auth.ts</span>
          <span className="text-zinc-400"> — 42 lines</span>
        </p>
      );
    case "diff":
      return (
        <div className="overflow-x-auto">
          <p className="text-zinc-500">--- a/src/auth.ts</p>
          <p className="text-zinc-500">+++ b/src/auth.ts</p>
          <p className="text-red-400">- login(user)</p>
          <p className="text-green-400">
            + if (!password) throw new Error(&quot;empty password&quot;)
          </p>
          <p className="text-green-400">+ login(user, password)</p>
        </div>
      );
    case "test":
      return (
        <p>
          <span className="select-none text-zinc-500">$ </span>
          <span className="text-emerald-400">npm test — 12 passing</span>
        </p>
      );
    case "approval":
      return (
        <p className="text-zinc-100">
          Allow bash test run?{" "}
          <span className="text-emerald-400">[y/n]: y</span>
        </p>
      );
    case "done":
      return (
        <p>
          <span className="text-emerald-400">✓ {ELAPSED_LABEL}</span>
          <span className="text-zinc-100"> — bug fixed, tests green</span>
        </p>
      );
  }
}

export default function FakedTerminal() {
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);

  const done =
    prefersReducedMotion || visibleCount >= TERMINAL_STEPS.length;
  const visibleSteps = prefersReducedMotion
    ? TERMINAL_STEPS
    : TERMINAL_STEPS.slice(0, visibleCount);

  useEffect(() => {
    if (prefersReducedMotion || paused || done) return;
    const prev = TERMINAL_STEPS[visibleCount - 1]?.revealAfterMs ?? 0;
    const next = TERMINAL_STEPS[visibleCount]?.revealAfterMs;
    if (next === undefined) return;
    const timer = setTimeout(
      () => setVisibleCount((count) => count + 1),
      next - prev,
    );
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, paused, done, visibleCount]);

  useEffect(() => {
    if (!done || prefersReducedMotion || paused) return;
    const restart = setTimeout(() => setVisibleCount(1), AUTO_RESTART_MS);
    return () => clearTimeout(restart);
  }, [done, prefersReducedMotion, paused]);

  function replay() {
    setVisibleCount(prefersReducedMotion ? TERMINAL_STEPS.length : 1);
  }

  return (
    <div
      role="region"
      aria-label="Simulated ViCode session"
      data-terminal
      data-paused={String(paused)}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-zinc-800 bg-black lg:max-w-md"
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </span>
        <p className="font-mono text-xs text-zinc-500">
          vicode — Faked Terminal
        </p>
      </div>

      <div className="flex min-w-0 flex-col gap-2 overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        {visibleSteps.map((step) => (
          <StepContent key={step.id} id={step.id} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800 px-4 py-2.5">
        <p className="font-mono text-xs text-zinc-500">
          Simulated session · scripted demo
        </p>
        {done && (
          <button
            type="button"
            onClick={replay}
            aria-label="Replay simulated session"
            className="rounded-md border border-zinc-700 px-3 py-1 font-mono text-xs text-zinc-200 transition-colors hover:border-zinc-500 hover:text-zinc-50"
          >
            Replay
          </button>
        )}
      </div>
    </div>
  );
}
