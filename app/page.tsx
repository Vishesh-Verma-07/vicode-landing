import type { Metadata } from "next";
import Hero from "./components/Hero";
import WorkflowSection from "./components/WorkflowSection";
import PhilosophySection from "./components/PhilosophySection";
import FeaturesStrip from "./components/FeaturesStrip";
import InstallCTA from "./components/InstallCTA";

export const metadata: Metadata = {
  title: "ViCode — Think it through. Then build it.",
  description:
    "ViCode is an open-source conversational CLI coding partner. Discuss ideas, plan solutions, and build with intent — all from your terminal.",
  openGraph: {
    title: "ViCode — Think it through. Then build it.",
    description:
      "ViCode is an open-source conversational CLI coding partner. Discuss ideas, plan solutions, and build with intent — all from your terminal.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ViCode — Think it through. Then build it.",
    description:
      "ViCode is an open-source conversational CLI coding partner. Discuss ideas, plan solutions, and build with intent — all from your terminal.",
  },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans text-text-primary">
      <main className="flex-1">
        <Hero />
        <WorkflowSection />
        <PhilosophySection />
        <FeaturesStrip />
        <InstallCTA />
      </main>
    </div>
  );
}