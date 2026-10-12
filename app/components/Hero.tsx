"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { GITHUB_URL } from "../lib/links";
import { INSTALL_COMMAND } from "../lib/links";

type DemoPhase = "discuss" | "plan" | "build";

interface TerminalLine {
  type: "prompt" | "user" | "assistant" | "status" | "plan" | "build" | "success" | "dim";
  content: string;
  delay?: number;
}

const DEMO_SCRIPT: Record<DemoPhase, TerminalLine[]> = {
  discuss: [
    { type: "prompt", content: "vicode", delay: 0 },
    { type: "status", content: "DISCUSS", delay: 300 },
    { type: "user", content: "> I want to add authentication to my API.", delay: 800 },
    { type: "assistant", content: "Let's clarify a few things first. Are you using sessions or JWTs? And should authentication apply to every route or only selected endpoints?", delay: 1500 },
  ],
  plan: [
    { type: "prompt", content: "vicode", delay: 0 },
    { type: "plan", content: "PLAN", delay: 300 },
    { type: "status", content: "Proposed plan", delay: 600 },
    { type: "plan", content: "01  Inspect the existing API structure", delay: 900 },
    { type: "plan", content: "02  Define the authentication flow", delay: 1200 },
    { type: "plan", content: "03  Implement middleware and protected routes", delay: 1500 },
    { type: "plan", content: "04  Verify the changes", delay: 1800 },
    { type: "assistant", content: "Plan ready for your review.", delay: 2200 },
  ],
  build: [
    { type: "prompt", content: "vicode", delay: 0 },
    { type: "build", content: "BUILD", delay: 300 },
    { type: "status", content: "Executing approved plan...", delay: 600 },
    { type: "success", content: "✓ Middleware updated", delay: 1000 },
    { type: "success", content: "✓ Protected routes implemented", delay: 1400 },
    { type: "success", content: "✓ Existing conventions preserved", delay: 1800 },
    { type: "assistant", content: "Changes ready for review.", delay: 2200 },
  ],
};

const PHASE_LABELS: Record<DemoPhase, { label: string; color: string }> = {
  discuss: { label: "DISCUSS", color: "text-discuss" },
  plan: { label: "PLAN", color: "text-plan" },
  build: { label: "BUILD", color: "text-build" },
};

const PHASE_ORDER: DemoPhase[] = ["discuss", "plan", "build"];

function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function TerminalDemo({
  phase,
  prefersReducedMotion,
}: {
  phase: DemoPhase;
  prefersReducedMotion: boolean;
}) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>(() => {
    if (prefersReducedMotion) {
      return DEMO_SCRIPT[phase];
    }
    return [];
  });
  const [isAnimating, setIsAnimating] = useState(!prefersReducedMotion);
  const animationRef = useRef(0);
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTimeout(() => {
        setVisibleLines(DEMO_SCRIPT[phase]);
        setIsAnimating(false);
      }, 0);
      return;
    }

    const lines = DEMO_SCRIPT[phase];
    animationRef.current += 1;
    const currentAnimation = animationRef.current;

    let cancelled = false;

    const runAnimation = async () => {
      setVisibleLines([]);
      setIsAnimating(true);

      for (let i = 0; i < lines.length; i++) {
        if (cancelled || animationRef.current !== currentAnimation) return;
        await new Promise(resolve => setTimeout(resolve, lines[i].delay || 300));
        if (cancelled || animationRef.current !== currentAnimation) return;
        setVisibleLines(prev => [...prev, lines[i]]);
      }
      if (!cancelled && animationRef.current === currentAnimation) {
        setIsAnimating(false);
      }
    };

    runAnimation();

    return () => {
      cancelled = true;
    };
  }, [phase, prefersReducedMotion]);

  const currentPhaseInfo = PHASE_LABELS[phase];

  return (
    <div className="terminal-window" data-terminal>
      <div className="terminal-titlebar">
        <span className="terminal-dot terminal-dot-close" aria-hidden="true" />
        <span className="terminal-dot terminal-dot-minimize" aria-hidden="true" />
        <span className="terminal-dot terminal-dot-maximize" aria-hidden="true" />
        <span className="font-mono text-xs text-text-muted ml-2">vicode</span>
        <span className="font-mono text-xs text-text-muted mx-2">~/project</span>
      </div>

      <div className="terminal-body min-h-[320px] max-h-[480px] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4 font-mono text-xs text-text-muted">
          <span className={`animate-pulse-subtle ${currentPhaseInfo.color}`}>●</span>
          <span>{currentPhaseInfo.label}</span>
          <span className="text-border">|</span>
          <span>Tab to cycle modes</span>
        </div>

        <div className="font-mono text-sm leading-relaxed" role="log" aria-live="polite" aria-label="ViCode demo session">
          {visibleLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: prefersReducedMotion ? 0 : index * 0.05 }}
              className={`${line.type} whitespace-pre-wrap break-all`}
            >
              {line.content}
            </motion.div>
          ))}
          {isAnimating && !prefersReducedMotion && (
            <motion.span
              className="terminal-prompt animate-pulse-subtle"
              aria-hidden="true"
            >
              █
            </motion.span>
          )}
        </div>
      </div>

      <div className="terminal-titlebar border-t border-border">
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            {PHASE_ORDER.map((p) => (
              <button
                key={p}
                onClick={() => {}}
                className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                  phase === p
                    ? "bg-accent-bg text-accent border border-accent-border"
                    : "text-text-muted hover:text-text-secondary"
                }`}
                aria-pressed={phase === p}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-text-muted ml-auto">
            Simulated demo · Not a live session
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [currentPhase, setCurrentPhase] = useState<DemoPhase>("discuss");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialReducedMotion);
  const [cycleCount, setCycleCount] = useState(0);
  const phaseIndexRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const timer = setTimeout(() => {
      const nextIndex = (phaseIndexRef.current + 1) % PHASE_ORDER.length;
      phaseIndexRef.current = nextIndex;
      setCurrentPhase(PHASE_ORDER[nextIndex]);
      if (nextIndex === 0) {
        setCycleCount(c => c + 1);
      }
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [currentPhase, prefersReducedMotion, cycleCount]);

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
    <section aria-labelledby="hero-heading" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-mono text-sm text-text-secondary"
            >
              AN OPEN-SOURCE CLI CODING PARTNER
            </motion.p>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            >
              Think it through.
              <br />
              <span className="text-accent">Then build it.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              className="max-w-xl text-base leading-relaxed text-text-secondary"
            >
              From a rough idea to a reviewed plan to working code. ViCode helps you think clearly, build deliberately, and stay in control at every step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button
                onClick={copyInstallCommand}
                className="rounded-md bg-accent px-6 py-3 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim focus-visible-ring"
              >
                Get Started
              </button>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border bg-background-elevated px-6 py-3 font-mono text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary text-center"
              >
                Explore on GitHub
              </a>
            </motion.div>

            {copyState !== "idle" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs"
              >
                {copyState === "copied" && <span className="text-accent">Copied to clipboard</span>}
                {copyState === "error" && <span className="text-red-400">Failed to copy</span>}
              </motion.p>
            )}

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
              className="font-mono text-xs text-text-muted tracking-wider uppercase"
            >
              OPEN SOURCE · TERMINAL NATIVE · DEVELOPER CONTROLLED
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="relative"
          >
            <TerminalDemo phase={currentPhase} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}