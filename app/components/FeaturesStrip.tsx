"use client";

import { motion } from "motion/react";

interface Feature {
  label: string;
  description: string;
}

const FEATURES: Feature[] = [
  { label: "Repo-aware", description: "Reads your codebase and follows existing conventions" },
  { label: "Plan-first", description: "Explicit plans you review before any code is written" },
  { label: "Git-safe", description: "No commits, pushes, or amendments without your request" },
  { label: "Skill-extensible", description: "Markdown skills inject custom system prompt layers" },
  { label: "Terminal-native", description: "Built for the CLI — no browser UI required" },
  { label: "Concise by design", description: "Minimal output, maximum signal in every interaction" },
];

export default function FeaturesStrip() {
  return (
    <section aria-labelledby="features-heading" className="border-t border-border py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-3 text-center max-w-2xl mx-auto"
        >
          <span className="font-mono text-sm text-text-secondary">CAPABILITIES</span>
          <h2 id="features-heading" className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            Built for the way you work
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10"
        >
          {FEATURES.map((feature, index) => (
            <motion.article
              key={feature.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.06 }}
              className="flex flex-col gap-2 rounded-lg border border-border bg-background-elevated/50 p-5 transition-colors hover:border-border-strong"
            >
              <h3 className="font-mono text-sm font-semibold text-accent">
                {feature.label}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}