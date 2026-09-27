import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import ModesShowcase from "@/app/components/ModesShowcase";
import Home from "@/app/page";

/**
 * Page-level behavioral seam for issue #5 (Modes hero showcase).
 * Asserts only externally visible behavior a Terminal-first Developer can observe.
 * Tool-to-Mode facts trace to the ViCode README Modes table.
 */
describe("modes hero showcase (issue #5)", () => {
  it("build, discuss, and plan are each selectable with distinct tools and behavior", () => {
    render(<ModesShowcase />);

    // Build sees all six tools
    fireEvent.click(screen.getByRole("tab", { name: /build mode/i }));
    expect(screen.getByRole("tab", { name: /build mode/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText(/\[Build\]/)).toBeInTheDocument();
    expect(screen.getByText(/\[Build\]/).className).toMatch(/emerald/);
    const buildTools = screen.getByRole("list", {
      name: /tools visible in build/i,
    });
    for (const tool of [
      "read_file",
      "list_files",
      "search",
      "write_file",
      "edit_file",
      "bash",
    ]) {
      expect(buildTools.textContent).toMatch(new RegExp(tool));
    }

    // Discuss sees all but bash, with its interview behavior
    fireEvent.click(screen.getByRole("tab", { name: /discuss mode/i }));
    expect(screen.getByText(/\[Discuss\]/)).toBeInTheDocument();
    expect(screen.getByText(/\[Discuss\]/).className).toMatch(/sky/);
    const discussTools = screen.getByRole("list", {
      name: /tools visible in discuss/i,
    });
    expect(discussTools.textContent).toMatch(/read_file/);
    expect(discussTools.textContent).not.toMatch(/bash/);
    expect(screen.getByText(/one-question-at-a-time/i)).toBeInTheDocument();

    // Plan sees only read tools, with analysis-only behavior
    fireEvent.click(screen.getByRole("tab", { name: /plan mode/i }));
    expect(screen.getByText(/\[Plan\]/)).toBeInTheDocument();
    expect(screen.getByText(/\[Plan\]/).className).toMatch(/amber/);
    const planTools = screen.getByRole("list", {
      name: /tools visible in plan/i,
    });
    expect(planTools.textContent).toMatch(/read_file/);
    expect(planTools.textContent).toMatch(/list_files/);
    expect(planTools.textContent).toMatch(/search/);
    expect(planTools.textContent).not.toMatch(/write_file/);
    expect(planTools.textContent).not.toMatch(/bash/);
  });

  it("tab-cycling moves across modes and updates the visible mode tag", () => {
    render(<ModesShowcase />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((t) => t.textContent)).toEqual([
      "Build",
      "Discuss",
      "Plan",
    ]);
    // Every mode stays keyboard-reachable so Tab traverses build → discuss → plan
    for (const tab of tabs) {
      expect(tab.tabIndex).toBeGreaterThanOrEqual(0);
    }

    // Arrow cycling moves selection and the visible Mode tag together
    fireEvent.click(screen.getByRole("tab", { name: /build mode/i }));
    fireEvent.keyDown(
      screen.getByRole("tablist", { name: /vicode modes/i }),
      { key: "ArrowRight" },
    );
    expect(screen.getByRole("tab", { name: /discuss mode/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText(/\[Discuss\]/)).toBeInTheDocument();

    // Cycling wraps around the end of the list
    fireEvent.click(screen.getByRole("tab", { name: /plan mode/i }));
    fireEvent.keyDown(
      screen.getByRole("tablist", { name: /vicode modes/i }),
      { key: "ArrowRight" },
    );
    expect(screen.getByRole("tab", { name: /build mode/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText(/\[Build\]/)).toBeInTheDocument();
  });

  it("discuss mode confinement to the docs boundary is stated honestly", () => {
    render(<ModesShowcase />);

    fireEvent.click(screen.getByRole("tab", { name: /discuss mode/i }));
    expect(screen.getByText(/docs boundary/i)).toBeInTheDocument();
    expect(screen.getByText(/CONTEXT\.md/)).toBeInTheDocument();
    expect(screen.getByText(/GLOSSARY\.md/)).toBeInTheDocument();
    expect(screen.getByText(/docs\/adr/)).toBeInTheDocument();
    expect(screen.getByText(/denied by mode/i)).toBeInTheDocument();
  });

  it("plan mode analysis-only nature is stated honestly", () => {
    render(<ModesShowcase />);

    fireEvent.click(screen.getByRole("tab", { name: /plan mode/i }));
    expect(screen.getByText(/analysis only/i)).toBeInTheDocument();
    expect(
      screen.getByText(/never modify files or run shell commands/i),
    ).toBeInTheDocument();
  });

  it("page exposes the modes showcase as its own section", () => {
    const { container } = render(<Home />);

    const modes = container.querySelector("#modes");
    expect(modes).not.toBeNull();
    expect(modes!.querySelector('[role="tablist"]')).not.toBeNull();
    expect(modes!.textContent).toMatch(/\[Build\]/);
    // Hero install area is still intact
    expect(container.querySelector("#install")).not.toBeNull();
  });
});
