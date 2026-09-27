import Hero from "./components/Hero";
import FakedTerminal from "./components/FakedTerminal";
import ModesShowcase from "./components/ModesShowcase";
import FeaturesGrid from "./components/FeaturesGrid";
import SafetyStrip from "./components/SafetyStrip";

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

        <section
          id="features"
          aria-label="Features"
          className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Everything the README promises, nothing it doesn&apos;t
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
              Six cards, each traced to a README fact. The rest lives in the
              docs it came from.
            </p>
            <FeaturesGrid />
          </div>
        </section>

        <section
          id="safety"
          aria-label="Safety"
          className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Edits you can trust
            </h2>
            <SafetyStrip />
          </div>
        </section>
      </main>
    </div>
  );
}
