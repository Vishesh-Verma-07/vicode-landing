/**
 * Slash-command and shortcut facts trace to the ViCode README
 * Slash commands and Key shortcuts sections.
 */
export const SLASH_COMMANDS: { command: string; description: string }[] = [
  { command: "/help", description: "List available commands" },
  { command: "/session", description: "Switch to a saved session" },
  {
    command: "/new",
    description: "Save the current session and start a new one",
  },
  {
    command: "/exit",
    description: "Stop any response in progress, save the session and quit",
  },
  {
    command: "/model",
    description: "Switch the LLM model mid-session",
  },
  {
    command: "/skill",
    description: "Load a skill Markdown file as a System Prompt layer",
  },
  { command: "/home", description: "Return to the Welcome Screen" },
  {
    command: "/key",
    description: "Set, change, or remove your OpenRouter API key",
  },
  {
    command: "/compact",
    description: "Fold older messages into a summary and keep the context window lean",
  },
];

export const KEY_SHORTCUTS: { keys: string; action: string }[] = [
  { keys: "Tab", action: "Cycle the Mode (build → discuss → plan)" },
  { keys: "y / n", action: "Approve / reject a pending tool call" },
  { keys: "Esc", action: "Cancel the in-progress response" },
  { keys: "Enter", action: "Submit the message" },
  { keys: "↑ / ↓", action: "Recall Input History" },
];
