import { SLASH_COMMANDS, KEY_SHORTCUTS } from "../lib/commands";

export default function CommandsReference() {
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <ul
        aria-label="Slash commands"
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
      >
        {SLASH_COMMANDS.map((item) => (
          <li
            key={item.command}
            className="flex min-w-0 flex-col gap-1 rounded-lg border border-zinc-800 bg-black p-3"
          >
            <span className="font-mono text-sm font-semibold text-emerald-400">
              {item.command}
            </span>
            <span className="text-sm leading-relaxed text-zinc-400">
              {item.description}
            </span>
          </li>
        ))}
      </ul>
      <p className="font-mono text-xs leading-relaxed text-zinc-500">
        Only the first word of an input is treated as a command — `/help me` runs `/help`.
      </p>
      <ul
        aria-label="Key shortcuts"
        className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-black p-4"
      >
        {KEY_SHORTCUTS.map((hint) => (
          <li
            key={hint.keys}
            className="flex min-w-0 flex-wrap items-baseline gap-x-3 font-mono text-xs leading-relaxed"
          >
            <span className="rounded border border-zinc-700 px-1.5 py-0.5 text-zinc-200">
              {hint.keys}
            </span>
            <span className="text-zinc-400">{hint.action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
