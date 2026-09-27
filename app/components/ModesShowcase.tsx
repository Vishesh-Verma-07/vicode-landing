"use client";

import { useRef, useState } from "react";
import { MODES, type ModeId } from "../lib/modes";

export default function ModesShowcase() {
  const [modeId, setModeId] = useState<ModeId>("build");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = MODES.find((mode) => mode.id === modeId) ?? MODES[0];
  const activeIndex = MODES.findIndex((mode) => mode.id === modeId);

  function select(index: number) {
    const wrapped = (index + MODES.length) % MODES.length;
    setModeId(MODES[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(MODES.length - 1);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        role="tablist"
        aria-label="ViCode Modes"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {MODES.map((mode, index) => (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={modeId === mode.id}
            aria-label={`${mode.label} mode`}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => setModeId(mode.id)}
            onFocus={() => setModeId(mode.id)}
            className={`rounded-md border px-4 py-1.5 font-mono text-sm transition-colors ${
              modeId === mode.id
                ? "border-zinc-500 bg-zinc-800 text-zinc-50"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <p className="font-mono text-sm" aria-live="polite">
        <span className="select-none text-zinc-500">vicode </span>
        <span data-mode-tag className={active.tagClass}>
          {active.tag}
        </span>
        <span className="select-none text-zinc-500"> ›</span>
      </p>

      <div
        className={`flex flex-col gap-3 rounded-lg border border-zinc-800 border-l-4 bg-black p-4 ${active.barClass}`}
      >
        <p className="text-base leading-relaxed text-zinc-300">
          {active.behavior}
        </p>
        <p className="font-mono text-sm leading-relaxed text-zinc-400">
          {active.scopeNote}
        </p>
        <ul
          aria-label={`Tools visible in ${active.id} mode`}
          className="flex flex-wrap gap-2"
        >
          {active.tools.map((tool) => (
            <li
              key={tool}
              className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-200"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>

      <p className="font-mono text-xs text-zinc-500">
        Tab through the modes — in the ViCode CLI, the Tab key cycles build →
        discuss → plan.
      </p>
    </div>
  );
}
