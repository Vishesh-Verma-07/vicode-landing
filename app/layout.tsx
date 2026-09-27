import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vicode.dev"),
  title: "ViCode — Terminal AI coding agent | Install with npm install -g vicode-ai",
  description:
    "ViCode is a Terminal AI coding agent that lives in your project directory. Install with npm install -g vicode-ai and fix bugs from your terminal.",
  openGraph: {
    title: "ViCode — Terminal AI coding agent",
    description:
      "Install ViCode with npm install -g vicode-ai. A Terminal AI coding agent for Terminal-first Developers.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ViCode — Terminal AI coding agent",
    description:
      "Install ViCode with npm install -g vicode-ai. A Terminal AI coding agent for Terminal-first Developers.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-200">
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
