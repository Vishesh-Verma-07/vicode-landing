/**
 * Feature-card facts trace to the ViCode README Features section.
 * Bodies stay short; excess detail links out to the README.
 */
export const FEATURES: {
  title: string;
  body: string;
  detail: string;
}[] = [
  {
    title: "Two-panel TUI",
    body: "A scrolling Chat Panel plus a Usage Panel with model, token totals (in/out), context usage, cost, and turn count.",
    detail: "token-by-token streaming · Esc cancels",
  },
  {
    title: "Six core tools",
    body: "Reads, lists, searches, writes, edits, and runs shell commands — every step visible as it happens.",
    detail: "read_file · list_files · search · write_file · edit_file · bash",
  },
  {
    title: "Approval + Bash Allowlist",
    body: "Ordinary in-project file operations run silently; Sensitive Paths and out-of-root targets pause for approval.",
    detail: "Allowlist re-checked on every call — no turn-memory for bash",
  },
  {
    title: "Context budgeting + auto-compaction",
    body: "History is projected to fit 70% of the context window; at 60% load older messages fold into a running summary.",
    detail: "largest results dropped first · /compact on demand",
  },
  {
    title: "Skills + layered config",
    body: "Markdown skill files inject extra System Prompt layers; project config overrides global config.",
    detail: ".vicode.json · ~/.vicode/config.json",
  },
  {
    title: "Session persistence",
    body: "Conversations auto-save as JSON inside the project and resume automatically on the next start.",
    detail: ".vicode/sessions/<id>.json",
  },
];
