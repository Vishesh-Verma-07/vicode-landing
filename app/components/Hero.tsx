"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GITHUB_URL } from "../lib/links";
import { INSTALL_TABS, type InstallManager } from "../lib/install";

type CopyState = "idle" | "copied" | "manual";

export default function Hero() {
  const [managerId, setManagerId] = useState<InstallManager>("npm");
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const active =
    INSTALL_TABS.find((tab) => tab.id === managerId) ?? INSTALL_TABS[0];

  async function copyInstallCommand() {
    const command = active.command;
    try {
      const clipboard = navigator?.clipboard;
      if (clipboard?.writeText) {
        await clipboard.writeText(command);
        setCopyState("copied");
        return;
      }
      const textarea = document.createElement("textarea");
      textarea.value = command;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopyState(ok ? "copied" : "manual");
    } catch {
      setCopyState("manual");
    }
  }

  return (
    <section aria-label="Install ViCode" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-mono text-sm text-zinc-400"
        >
          <span className="text-emerald-400">$</span> Terminal AI coding partner
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
        >
          ViCode — think through problems, build solutions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="max-w-2xl text-base leading-relaxed text-zinc-400"
        >
          A conversational CLI coding partner built to help you think through
          problems, create a plan, and build the solution with you in control
          every step of the way.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        className="flex flex-col gap-3"
      >
        <div
          role="tablist"
          aria-label="Package manager"
          className="flex flex-wrap gap-2"
        >
          {INSTALL_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={managerId === tab.id}
              aria-label={`${tab.label} install`}
              onClick={() => {
                setManagerId(tab.id);
                setCopyState("idle");
              }}
              className={`rounded-md border px-3 py-1.5 font-mono text-sm transition-colors ${
                managerId === tab.id
                  ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-zinc-800 bg-black p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="overflow-x-auto font-mono text-sm text-zinc-100">
            <span className="select-none text-zinc-500">$ </span>
            {active.command}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              type="button"
              onClick={copyInstallCommand}
              aria-label="Copy install command"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="rounded-md bg-emerald-500 px-4 py-2 font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              Copy
            </motion.button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Star ViCode"
              className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50"
            >
              ★ Star
            </a>
          </div>
        </div>

        <p role="status" aria-live="polite" className="min-h-5 font-mono text-sm">
          {copyState === "copied" && (
            <span className="text-emerald-400">Copied to clipboard</span>
          )}
          {copyState === "manual" && (
            <span className="text-amber-300">
              Copy manually: {active.command}
            </span>
          )}
        </p>
      </motion.div>

      <motion.ul
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
        aria-label="Requirements"
        className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-sm text-zinc-400 sm:flex-row sm:flex-wrap sm:gap-x-6"
      >
        <li>
          <span className="text-zinc-200">Node 22+</span> required
        </li>
        <li>
          <span className="text-zinc-200">OpenRouter API key</span> required
        </li>
        <li>
          <span className="text-zinc-200">bash on PATH</span> required on
          Windows (Git Bash or WSL)
        </li>
      </motion.ul>
    </section>
  );
}
