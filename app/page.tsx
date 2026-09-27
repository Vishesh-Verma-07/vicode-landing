import Hero from "./components/Hero";
import FakedTerminal from "./components/FakedTerminal";
import ModesShowcase from "./components/ModesShowcase";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-950 font-sans text-zinc-200">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 overflow-x-clip px-4 py-16 sm:px-6">
        <section
          id="install"
          aria-label="Install ViCode"
          className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6"
        >
          <div
            data-hero-layout
            className="flex flex-col gap-8 lg:flex-row lg:items-start"
          >
            <div className="min-w-0 flex-1">
              <Hero />
            </div>
            <FakedTerminal />
          </div>
        </section>

        <section
          id="modes"
          aria-label="Modes"
          className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Modes govern each turn
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
              Build, discuss, and plan scope which tools the model can even
              see. The active Mode is marked by a colored Mode tag, in the CLI
              and here.
            </p>
            <ModesShowcase />
          </div>
        </section>
      </main>
    </div>
  );
}
