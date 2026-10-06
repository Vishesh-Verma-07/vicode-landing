"use client";

"use client";

import { motion } from "motion/react";

const VALUES = [
  {
    title: "Stay in control",
    body: "You approve the plan, decide the direction, and choose when to build.",
  },
  {
    title: "Avoid wasted work",
    body: "Catch ambiguity early in Discuss, solidify it in Plan, and execute with precision in Build.",
  },
  {
    title: "Fits your repo",
    body: "No boilerplate generation that goes against your conventions. ViCode reads your codebase and adapts.",
  },
  {
    title: "Built for engineers",
    body: "Minimal fluff, security conscious, and designed to get out of your way whilst still being a thought partner.",
  },
];

export default function ValuesSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Why ViCode
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          Built for engineers who want a thought partner, not a magic box.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {VALUES.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
              delay: index * 0.08,
            }}
            className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-black p-5 transition-colors hover:border-zinc-700"
          >
            <h3 className="font-mono text-sm font-semibold text-emerald-400">
              {value.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              {value.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
