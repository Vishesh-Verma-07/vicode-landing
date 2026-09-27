import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...(props as object)}>
      {children}
    </a>
  ),
}));

import { GITHUB_URL } from "@/app/lib/links";
import Hero from "@/app/components/Hero";
import Home from "@/app/page";

/**
 * Page-level behavioral seam for issue #3 (Hero Copy-install CTA + install tabs).
 * Asserts only externally visible behavior a Terminal-first Developer can observe.
 */
describe("hero copy-install CTA + install tabs (issue #3)", () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    if (originalClipboard) {
      Object.defineProperty(navigator, "clipboard", {
        value: originalClipboard,
        configurable: true,
      });
    }
  });

  it("hero copy CTA copies the primary install command with visible confirmation", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<Hero />);

    const copyButton = screen.getByRole("button", { name: /copy.*install/i });
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("npm install -g vicode-ai");
    });
    expect(await screen.findByText(/copied/i)).toBeInTheDocument();
  });

  it("copy CTA falls back visibly when clipboard is unavailable", async () => {
    // Simulate non-secure context with no clipboard API
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    });

    render(<Hero />);

    const copyButton = screen.getByRole("button", { name: /copy.*install/i });
    fireEvent.click(copyButton);

    // Fallback must be visible and must not throw: clipboard is unavailable,
    // so the manual-copy hint with the command must appear.
    expect(await screen.findByText(/copy manually/i)).toBeInTheDocument();
    expect(screen.getAllByText(/npm install -g vicode-ai/i).length).toBeGreaterThanOrEqual(1);
  });

  it("install tabs switch across npm, bun, yarn, pnpm, and npx without losing copy", () => {
    render(<Hero />);

    const tablist = screen.getByRole("tablist", { name: /package manager/i });
    expect(tablist).toBeInTheDocument();

    const expected: Record<string, RegExp> = {
      npm: /npm install -g vicode-ai/i,
      bun: /bun add -g vicode-ai/i,
      yarn: /yarn global add vicode-ai/i,
      pnpm: /pnpm add -g vicode-ai/i,
      npx: /npx vicode-ai/i,
    };

    for (const [tabName, command] of Object.entries(expected)) {
      const tab = screen.getByRole("tab", { name: `${tabName} install` });
      fireEvent.click(tab);
      expect(tab).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText(command)).toBeInTheDocument();
      // Copy action survives every tab switch
      expect(
        screen.getByRole("button", { name: /copy.*install/i }),
      ).toBeInTheDocument();
    }
  });

  it("requirements strip states Node floor, OpenRouter key, and bash-on-PATH", () => {
    render(<Hero />);

    const requirements = screen.getByRole("list", { name: /requirements/i });
    expect(requirements.textContent).toMatch(/node.*22/i);
    expect(requirements.textContent).toMatch(/openrouter/i);
    expect(requirements.textContent).toMatch(/bash.*path/i);
  });

  it("secondary GitHub Star action is reachable from the hero", () => {
    render(<Hero />);

    const star = screen.getByRole("link", { name: /github.*star/i });
    expect(star).toHaveAttribute("href", GITHUB_URL);
    expect(star).toHaveAttribute("target", "_blank");
  });

  it("page exposes the hero inside the #install anchor", () => {
    const { container } = render(<Home />);
    const install = container.querySelector("#install");
    expect(install).not.toBeNull();
    expect(install!.textContent).toMatch(/npm install -g vicode-ai/i);
    // Hero copy + tabs must be reachable from the page seam
    expect(
      install!.querySelector('button[aria-label*="Copy" i], button'),
    ).not.toBeNull();
  });
});
