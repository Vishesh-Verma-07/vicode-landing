"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { GITHUB_URL } from "../lib/links";

const NAV_LINKS = [
  { href: "#product", label: "Product" },
  { href: "#philosophy", label: "Philosophy" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          aria-label="ViCode home"
          className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-text-primary"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background-elevated font-mono text-sm text-accent"
          >
            {">&_"}
          </span>
          <span>ViCode</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ViCode on GitHub"
            className="rounded-md border border-border bg-background-elevated px-3 py-1.5 font-mono text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
          >
            GitHub
          </a>
          <Link
            href="#install"
            className="rounded-md bg-accent px-3 py-1.5 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim"
          >
            Get ViCode
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-secondary transition-colors hover:text-text-primary sm:hidden"
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
            className="overflow-hidden border-t border-border sm:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 font-mono text-sm text-text-secondary transition-colors hover:bg-background-elevated hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-border bg-background-elevated px-3 py-2 text-center font-mono text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
                >
                  GitHub
                </a>
                <Link
                  href="#install"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-accent px-3 py-2 text-center font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-dim"
                >
                  Get ViCode
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}