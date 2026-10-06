"use client";

import { motion } from "motion/react";
import { GITHUB_URL } from "../lib/links";
import { INSTALL_COMMAND } from "../lib/links";

export default function CtaSection() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
      >
        Ready to get started?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="max-w-xl text-base leading-relaxed text-zinc-400"
      >
        Install ViCode globally and run it inside your project directory.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        className="flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
      >
        <div className="flex flex-1 items-center gap-3 rounded-lg border border-zinc-800 bg-black px-4 py-3">
          <span className="select-none text-zinc-500 font-mono text-sm">$</span>
          <span className="font-mono text-sm text-zinc-100">{INSTALL_COMMAND}</span>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-zinc-800 bg-zinc-900 px-5 py-3 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50"
        >
          View on GitHub
        </a>
      </motion.div>
    </div>
  );
}
