"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { GITHUB_URL, NPM_URL } from "../lib/links";

const NAV_LINKS = [
  { href: "#modes", label: "Modes" },
  { href: "#features", label: "Features" },
  { href: "#commands", label: "Commands" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          aria-label="ViCode home"
          className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-zinc-100"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 font-mono text-sm text-emerald-400"
          >
            &gt;_
          </span>
          <span className="flex items-center gap-2">
            ViCode
            <span className="hidden rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[11px] font-normal text-zinc-400 sm:inline">
              Terminal AI coding partner
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 font-mono text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="#install"
            className="rounded-md bg-emerald-500 px-3 py-1.5 font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            Install
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Star ViCode"
            className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50"
          >
            ★ Star
          </a>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="npm vicode-ai package"
            className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50"
          >
            npm
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 transition-colors hover:text-zinc-100 sm:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
          >
            {open ? (
              <path d="M4 4l8 8M12 4l-8 8" />
            ) : (
              <path d="M2 4h12M2 8h12M2 12h12" />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-zinc-800 sm:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 font-mono text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-zinc-800 pt-3">
                <Link
                  href="#install"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-emerald-500 px-3 py-2 text-center font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
                >
                  Install
                </Link>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-center font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50"
                >
                  ★ Star
                </a>
                <a
                  href={NPM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-center font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50"
                >
                  npm
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
