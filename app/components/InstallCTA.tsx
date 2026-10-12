"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GITHUB_URL } from "../lib/links";
import { INSTALL_COMMAND } from "../lib/links";

export default function InstallCTA() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyInstallCommand() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2000);
    }
  }

  return (
    <section id="install" aria-labelledby="install-heading" className="border-t border-border py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto"
        >
          <h2 id="install-heading" className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Less guessing. More intentional building.
          </h2>
          <p className="text-base leading-relaxed text-text-secondary">
            Bring a thought partner into your terminal and stay in control of every step.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-md">
            <div className="relative flex items-center gap-3 rounded-lg border border-border bg-background-elevated px-4 py-3">
              <span className="select-none text-text-muted font-mono text-sm">$</span>
              <span className="font-mono text-sm text-text-primary flex-1 text-left">{INSTALL_COMMAND}</span>
              <button
                onClick={copyInstallCommand}
                type="button"
                className="shrink-0 rounded-md border border-border bg-background px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-accent-border hover:text-accent focus-visible-ring"
                aria-label="Copy install command"
              >
                {copyState === "copied" ? (
                  <span className="text-accent">Copied!</span>
                ) : copyState === "error" ? (
                  <span className="text-red-400">Failed</span>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
            <p className="font-mono text-xs text-text-muted text-center">
              Install globally, then run <code className="text-text-secondary">vicode</code> inside your project.
            </p>
          </div>

          <motion.a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="rounded-md border border-border bg-background-elevated px-6 py-3 font-mono text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
          >
            View on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}