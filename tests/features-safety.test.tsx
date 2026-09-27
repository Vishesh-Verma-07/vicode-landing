import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

import FeaturesGrid from "@/app/components/FeaturesGrid";
import SafetyStrip from "@/app/components/SafetyStrip";
import { GITHUB_URL } from "@/app/lib/links";
import Home from "@/app/page";

/**
 * Page-level behavioral seam for issue #6 (Features grid + Blast Radius strip).
 * Asserts only externally visible behavior a Terminal-first Developer can observe.
 * Every claim traces to ViCode README facts.
 */
describe("features grid + blast radius strip (issue #6)", () => {
  it("grid covers the six README proof areas", () => {
    const { container } = render(<FeaturesGrid />);
    const grid = container.textContent ?? "";

    // TUI streaming
    expect(screen.getByText(/chat panel/i)).toBeInTheDocument();
    expect(screen.getByText(/token-by-token/i)).toBeInTheDocument();
    // Six tools
    for (const tool of [
      "read_file",
      "list_files",
      "search",
      "write_file",
      "edit_file",
      "bash",
    ]) {
      expect(grid).toMatch(new RegExp(tool));
    }
    // Approval plus allowlist
    expect(screen.getByText(/bash allowlist/i)).toBeInTheDocument();
    // Context budgeting plus auto-compaction
    expect(grid).toMatch(/70%/);
    expect(grid).toMatch(/60%/);
    // Skills plus layered config
    expect(screen.getByText(/skills/i)).toBeInTheDocument();
    expect(screen.getByText(/layered config/i)).toBeInTheDocument();
    // Session persistence
    expect(screen.getByText(/resume automatically/i)).toBeInTheDocument();

    // Exactly six cards
    expect(
      container.querySelectorAll("[data-feature-card]").length,
    ).toBe(6);
  });

  it("safety strip explains blast radius, memory resets, and per-call re-check", () => {
    render(<SafetyStrip />);
    const strip = screen.getByRole("region", { name: /blast radius/i });

    expect(strip.textContent).toMatch(/in-project by default/i);
    expect(strip.textContent).toMatch(/sensitive paths/i);
    // Turn-scoped memory reset conditions
    expect(strip.textContent).toMatch(/start of every turn/i);
    expect(strip.textContent).toMatch(/session switch/i);
    expect(strip.textContent).toMatch(/new session/i);
    // Allowlist re-check on every call
    expect(strip.textContent).toMatch(/re-checked on every/i);
  });

  it("claims stay honest: no invented pricing or unshipped provider support", () => {
    const features = render(<FeaturesGrid />);
    const safety = render(<SafetyStrip />);
    for (const { container } of [features, safety]) {
      const text = container.textContent ?? "";
      expect(text).not.toMatch(/\$\d/);
      expect(text).not.toMatch(/MCP/i);
      expect(text).not.toMatch(/claude|gpt-4|gemini/i);
    }
  });

  it("excess detail links out to the README instead of crowding the grid", () => {
    render(<FeaturesGrid />);
    const readme = screen.getByRole("link", { name: /readme/i });
    expect(readme).toHaveAttribute("href", GITHUB_URL);

    render(<SafetyStrip />);
    const safetyReadme = screen.getAllByRole("link", { name: /readme/i });
    expect(
      safetyReadme.some((link) => link.getAttribute("href") === GITHUB_URL),
    ).toBe(true);
  });

  it("page exposes features and safety as their own sections", () => {
    const { container } = render(<Home />);

    const features = container.querySelector("#features");
    expect(features).not.toBeNull();
    expect(features!.querySelectorAll("[data-feature-card]").length).toBe(6);

    const safety = container.querySelector("#safety");
    expect(safety).not.toBeNull();
    expect(safety!.textContent).toMatch(/blast radius/i);

    // Earlier sections stay intact
    expect(container.querySelector("#install")).not.toBeNull();
    expect(container.querySelector("#modes")).not.toBeNull();
  });
});
