"use client";

import { motion } from "motion/react";

interface Principle {
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Plan before implementation",
    description: "ViCode gives you the opportunity to review the direction before execution begins. Every plan is explicit, reviewable, and requires your approval before any code is written.",
  },
  {
    title: "Your repository sets the rules",
    description: "Work with existing conventions, patterns, and utilities rather than imposing unnecessary boilerplate. ViCode reads your codebase and adapts to your style.",
  },
  {
    title: "You decide what happens next",
    description: "ViCode does not commit, push, or amend Git changes without your explicit request. Every destructive action pauses for your confirmation.",
  },
];

export default function PhilosophySection() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-heading" className="border-t border-border py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="font-mono text-sm text-text-secondary">PHILOSOPHY</span>
            <h2 id="philosophy-heading" className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Your agent. Your decisions.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary max-w-xl">
              Automation should move your work forward, not take control away from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="space-y-8"
          >
            {PRINCIPLES.map((principle) => (
              <article
                key={principle.title}
                className="flex flex-col gap-2 rounded-lg border border-border bg-background-elevated/50 p-6 transition-colors hover:border-border-strong"
              >
                <h3 className="font-mono text-sm font-semibold text-text-primary">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {principle.description}
                </p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}