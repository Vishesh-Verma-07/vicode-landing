import Hero from "./components/Hero";
import FakedTerminal from "./components/FakedTerminal";
import ModesShowcase from "./components/ModesShowcase";
import FeaturesGrid from "./components/FeaturesGrid";
import ValuesSection from "./components/ValuesSection";
import SafetyStrip from "./components/SafetyStrip";
import CommandsReference from "./components/CommandsReference";
import Faq from "./components/Faq";
import CtaSection from "./components/CtaSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-950 font-sans text-zinc-200">
      <main>
        <section
          id="install"
          aria-label="Install ViCode"
          className="relative overflow-hidden"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <div
              data-hero-layout
              className="flex flex-col gap-10 lg:flex-row lg:items-center"
            >
              <div className="min-w-0 flex-1">
                <Hero />
              </div>
              <FakedTerminal />
            </div>
          </div>
        </section>

        <section
          id="modes"
          aria-label="Modes"
          className="border-t border-zinc-800/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  Three modes, one workflow
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
                  ViCode keeps you in the driver&apos;s seat. Switch between modes to
                  set intent — no guessing if you&apos;re brainstorming or coding.
                </p>
              </div>
              <ModesShowcase />
            </div>
          </div>
        </section>

        <section
          id="features"
          aria-label="Features"
          className="border-t border-zinc-800/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  Built for the way you work
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
                  Every feature traces to what engineers actually need in a
                  terminal-native tool.
                </p>
              </div>
              <FeaturesGrid />
            </div>
          </div>
        </section>

        <section
          id="values"
          aria-label="Why ViCode"
          className="border-t border-zinc-800/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <ValuesSection />
          </div>
        </section>

        <section
          id="safety"
          aria-label="Safety"
          className="border-t border-zinc-800/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  Edits you can trust
                </h2>
              </div>
              <SafetyStrip />
            </div>
          </div>
        </section>

        <section
          id="commands"
          aria-label="Commands"
          className="border-t border-zinc-800/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  Daily use, predictable
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
                  Nine slash commands and five keys. That is the whole surface.
                </p>
              </div>
              <CommandsReference />
            </div>
          </div>
        </section>

        <section
          id="faq"
          aria-label="FAQ"
          className="border-t border-zinc-800/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  Honest answers only
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
                  Sourced from README limitations and requirements — nothing
                  invented.
                </p>
              </div>
              <Faq />
            </div>
          </div>
        </section>

        <section aria-label="Get Started" className="border-t border-zinc-800/60">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <CtaSection />
          </div>
        </section>
      </main>
    </div>
  );
}
