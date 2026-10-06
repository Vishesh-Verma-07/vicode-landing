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
  title: "ViCode — Terminal AI coding partner",
  description:
    "ViCode is a conversational CLI coding partner. Install with npm install -g vicode-ai and build with control from your terminal.",
  openGraph: {
    title: "ViCode — Terminal AI coding partner",
    description:
      "Install ViCode with npm install -g vicode-ai. A conversational CLI coding partner for terminal-first developers.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ViCode — Terminal AI coding partner",
    description:
      "Install ViCode with npm install -g vicode-ai. A conversational CLI coding partner for terminal-first developers.",
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
