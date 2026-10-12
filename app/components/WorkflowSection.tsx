"use client";

import { motion } from "motion/react";

interface WorkflowStage {
  number: string;
  title: string;
  headline: string;
  description: string;
  color: string;
  terminalLines: { type: string; content: string }[];
}

const STAGES: WorkflowStage[] = [
  {
    number: "01",
    title: "Discuss",
    headline: "Start with the problem.",
    description: "Work through ideas, clarify requirements, and challenge assumptions before a single line of code is written.",
    color: "text-discuss",
    terminalLines: [
      { type: "prompt", content: "vicode" },
      { type: "status", content: "DISCUSS" },
      { type: "user", content: "> I need to add rate limiting to my API endpoints." },
      { type: "assistant", content: "Good call. A few questions first: Should limits apply per-user, per-IP, or per-API key? And what happens when a limit is exceeded — 429 with retry-after, or a custom response?" },
    ],
  },
  {
    number: "02",
    title: "Plan",
    headline: "Know the approach.",
    description: "Turn the conversation into actionable steps, review the trade-offs, and approve the direction before implementation begins.",
    color: "text-plan",
    terminalLines: [
      { type: "prompt", content: "vicode" },
      { type: "plan", content: "PLAN" },
      { type: "status", content: "Proposed plan" },
      { type: "plan", content: "01  Audit existing middleware stack" },
      { type: "plan", content: "02  Design rate-limit key strategy (IP + user tier)" },
      { type: "plan", content: "03  Implement Redis-backed sliding window" },
      { type: "plan", content: "04  Add 429 responses with Retry-After header" },
      { type: "plan", content: "05  Write integration tests" },
      { type: "assistant", content: "Plan ready for your review." },
    ],
  },
  {
    number: "03",
    title: "Build",
    headline: "Build with intent.",
    description: "Execute the approved plan through targeted code changes that respect your project's existing patterns and conventions.",
    color: "text-build",
    terminalLines: [
      { type: "prompt", content: "vicode" },
      { type: "build", content: "BUILD" },
      { type: "status", content: "Executing approved plan..." },
      { type: "success", content: "✓ middleware/rateLimit.ts created" },
      { type: "success", content: "✓ routes/api/users.ts updated" },
      { type: "success", content: "✓ tests/rateLimit.test.ts added" },
      { type: "success", content: "✓ Existing conventions preserved" },
      { type: "assistant", content: "Changes ready for review." },
    ],
  },
];

export default function WorkflowSection() {
  return (
    <section id="product" aria-labelledby="workflow-heading" className="border-t border-border py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-10 text-center lg:text-left max-w-3xl mx-auto lg:mx-0"
        >
          <span className="font-mono text-sm text-text-secondary">CORE WORKFLOW</span>
          <h2 id="workflow-heading" className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Three modes. One deliberate workflow.
          </h2>
          <p className="text-base leading-relaxed text-text-secondary">
            Good code starts with understanding the problem. ViCode keeps thinking, planning, and execution distinct, so you decide when it&apos;s time to build.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" aria-hidden="true" />
          
          <div className="grid gap-10 sm:grid-cols-3 relative">
            {STAGES.map((stage, index) => (
              <motion.article
                key={stage.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
                className="flex flex-col gap-6 relative lg:pb-10"
              >
                <div className="flex flex-col gap-2 text-center lg:text-left">
                  <span className={`font-mono text-xs font-medium ${stage.color}`}>
                    {stage.number} — {stage.title.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-text-primary">
                    {stage.headline}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary max-w-xs mx-auto lg:mx-0">
                    {stage.description}
                  </p>
                </div>

                <div className="terminal-window flex-1">
                  <div className="terminal-titlebar">
                    <span className="terminal-dot terminal-dot-close" aria-hidden="true" />
                    <span className="terminal-dot terminal-dot-minimize" aria-hidden="true" />
                    <span className="terminal-dot terminal-dot-maximize" aria-hidden="true" />
                    <span className="font-mono text-xs text-text-muted ml-2">vicode</span>
                    <span className="font-mono text-xs text-text-muted mx-2">[{stage.title.toLowerCase()}]</span>
                  </div>

                  <div className="terminal-body p-4 font-mono text-sm leading-relaxed">
                    <div className="space-y-1.5">
                      {stage.terminalLines.map((line, lineIndex) => (
                        <motion.div
                          key={lineIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: lineIndex * 0.08 }}
                          className={`${line.type} whitespace-pre-wrap break-all`}
                        >
                          {line.content}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}