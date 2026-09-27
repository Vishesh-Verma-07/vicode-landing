import { INSTALL_COMMAND } from "./lib/links";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-950 font-sans text-zinc-200">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 overflow-x-clip px-4 py-16 sm:px-6">
        <section
          id="install"
          aria-label="Install ViCode"
          className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6"
        >
          <p className="font-mono text-sm text-zinc-400">
            <span className="text-emerald-400">$</span> Terminal AI coding agent
            that lives in your project directory
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">
            ViCode — install and fix bugs from your terminal
          </h1>
          <p className="mt-4 rounded-md border border-zinc-800 bg-black px-4 py-3 font-mono text-sm text-zinc-100">
            <span className="select-none text-zinc-500">$ </span>
            {INSTALL_COMMAND}
          </p>
        </section>
      </main>
    </div>
  );
}
