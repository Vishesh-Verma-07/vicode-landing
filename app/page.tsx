import Hero from "./components/Hero";
import FakedTerminal from "./components/FakedTerminal";

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
      </main>
    </div>
  );
}
