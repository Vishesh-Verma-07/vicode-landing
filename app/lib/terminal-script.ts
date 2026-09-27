export type TerminalStepId =
  | "prompt"
  | "search"
  | "read"
  | "diff"
  | "test"
  | "approval"
  | "done";

/**
 * Absolute reveal time of each narrative beat after the loop starts.
 * The prompt is the opening frame (0ms); the arc paces the remaining
 * beats so the done state lands at TOTAL_LOOP_MS (~25 seconds).
 */
export const TERMINAL_STEPS: { id: TerminalStepId; revealAfterMs: number }[] = [
  { id: "prompt", revealAfterMs: 0 },
  { id: "search", revealAfterMs: 4000 },
  { id: "read", revealAfterMs: 8000 },
  { id: "diff", revealAfterMs: 13000 },
  { id: "test", revealAfterMs: 17000 },
  { id: "approval", revealAfterMs: 21000 },
  { id: "done", revealAfterMs: 25000 },
];

export const TOTAL_LOOP_MS =
  TERMINAL_STEPS[TERMINAL_STEPS.length - 1].revealAfterMs;

export const AUTO_RESTART_MS = 6000;

export const ELAPSED_LABEL = `done in ${(TOTAL_LOOP_MS / 1000).toFixed(1)}s`;
