/**
 * Mode-to-tools facts trace to the ViCode README Modes table:
 * build sees all six tools; discuss sees all but bash with writes
 * confined to a docs boundary; plan sees read tools only.
 */
export type ModeId = "build" | "discuss" | "plan";

export const ALL_TOOLS = [
  "read_file",
  "list_files",
  "search",
  "write_file",
  "edit_file",
  "bash",
] as const;

export const MODES: {
  id: ModeId;
  label: string;
  tag: string;
  tagClass: string;
  barClass: string;
  tools: readonly string[];
  behavior: string;
  scopeNote: string;
}[] = [
  {
    id: "build",
    label: "Build",
    tag: "[Build]",
    tagClass: "text-emerald-400",
    barClass: "border-l-emerald-400",
    tools: ALL_TOOLS,
    behavior:
      "Get the work done. The model reads, edits, and runs shell commands to work through the spec or tickets.",
    scopeNote: "All six tools visible — no mode confinement.",
  },
  {
    id: "discuss",
    label: "Discuss",
    tag: "[Discuss]",
    tagClass: "text-sky-300",
    barClass: "border-l-sky-300",
    tools: ["read_file", "list_files", "search", "write_file", "edit_file"],
    behavior:
      "A relentless one-question-at-a-time design interview. Decisions get captured as you go.",
    scopeNote:
      "Writes are confined to a docs boundary — CONTEXT.md, GLOSSARY.md, and docs/adr/**; any other write or edit is denied by mode.",
  },
  {
    id: "plan",
    label: "Plan",
    tag: "[Plan]",
    tagClass: "text-amber-300",
    barClass: "border-l-amber-300",
    tools: ["read_file", "list_files", "search"],
    behavior:
      "Analysis only. The model reads, lists, and searches, then ends each analysis with a concrete written plan.",
    scopeNote:
      "The model must never modify files or run shell commands — plans only.",
  },
];
