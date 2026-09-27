import { INSTALL_COMMAND } from "./links";

export type InstallManager = "npm" | "bun" | "yarn" | "pnpm" | "npx";

export const INSTALL_TABS: { id: InstallManager; label: string; command: string }[] = [
  { id: "npm", label: "npm", command: INSTALL_COMMAND },
  { id: "bun", label: "bun", command: "bun add -g vicode-ai" },
  { id: "yarn", label: "yarn", command: "yarn global add vicode-ai" },
  { id: "pnpm", label: "pnpm", command: "pnpm add -g vicode-ai" },
  { id: "npx", label: "npx", command: "npx vicode-ai@latest" },
];
