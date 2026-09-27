import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";

import FakedTerminal from "@/app/components/FakedTerminal";
import Home from "@/app/page";

/**
 * Page-level behavioral seam for issue #4 (Faked Terminal bug-fix loop).
 * Asserts only externally visible behavior a Terminal-first Developer can observe.
 */
describe("faked terminal bug-fix loop (issue #4)", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  async function advance(ms: number) {
    // Advance in 1s chunks so each chained timeout's React state update
    // flushes before the next timeout is scheduled.
    for (let elapsed = 0; elapsed < ms; elapsed += 1000) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(Math.min(1000, ms - elapsed));
      });
    }
  }

  function mockReducedMotion(matches: boolean) {
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn().mockImplementation((query: string) => ({
        matches,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
      configurable: true,
    });
  }

  it("narrative shows prompt, search/read activity, colored diff, test run, approval y/n, and done with elapsed time", () => {
    mockReducedMotion(true);
    render(<FakedTerminal />);

    // Typed prompt that starts the bug-fix arc
    expect(screen.getByText(/fix the login crash/i)).toBeInTheDocument();
    // Tool activity: search calls and file read
    expect(screen.getByText(/search.*login/i)).toBeInTheDocument();
    expect(screen.getByText(/read.*auth/i)).toBeInTheDocument();
    // Unified diff with green/red coloring
    const added = screen.getByText(/\+\s*if \(!password\)/i);
    const removed = screen.getByText(/-\s*login\(user\)/i);
    expect(added.className).toMatch(/green/);
    expect(removed.className).toMatch(/red/);
    // Shell test step
    expect(screen.getByText(/npm test.*passing|passing.*tests/i)).toBeInTheDocument();
    // Approval prompt answered with y
    expect(screen.getByText(/\[y\/n\].*y/i)).toBeInTheDocument();
    // Done state with elapsed time
    expect(screen.getByText(/done in 25/i)).toBeInTheDocument();
  });

  it("loop completes in about 25 seconds and offers replay without reload", async () => {
    mockReducedMotion(false);
    vi.useFakeTimers();
    const { container } = render(<FakedTerminal />);

    // Loop starts with the prompt, done state not yet reached
    expect(screen.getByText(/fix the login crash/i)).toBeInTheDocument();
    await advance(5000);
    expect(screen.queryByText(/done in 25/i)).not.toBeInTheDocument();

    // About 25 seconds in, the loop reaches done and offers replay
    await advance(20000);
    expect(screen.getByText(/done in 25/i)).toBeInTheDocument();
    const replay = screen.getByRole("button", { name: /replay/i });
    expect(replay).toBeInTheDocument();

    // Replay restarts the loop in place, without reload
    fireEvent.click(replay);
    expect(screen.queryByText(/done in 25/i)).not.toBeInTheDocument();
    expect(screen.getByText(/fix the login crash/i)).toBeInTheDocument();
    expect(container.querySelector("[data-terminal]")).not.toBeNull();
  });

  it("pause on hover freezes the loop until hover ends", async () => {
    mockReducedMotion(false);
    vi.useFakeTimers();
    render(<FakedTerminal />);

    const terminal = screen.getByRole("region", { name: /simulated.*session/i });
    fireEvent.mouseEnter(terminal);
    expect(terminal).toHaveAttribute("data-paused", "true");

    // Time passes while paused: the loop must not reach done
    await advance(30000);
    expect(screen.queryByText(/done in 25/i)).not.toBeInTheDocument();

    // Hover ends: the loop resumes and completes
    fireEvent.mouseLeave(terminal);
    expect(terminal).toHaveAttribute("data-paused", "false");

    // Keyboard focus pauses the loop the same way hover does
    fireEvent.focus(terminal);
    expect(terminal).toHaveAttribute("data-paused", "true");
    fireEvent.blur(terminal);
    expect(terminal).toHaveAttribute("data-paused", "false");

    await advance(30000);
    expect(screen.getByText(/done in 25/i)).toBeInTheDocument();
  });

  it("reduced-motion renders the static final frame immediately", () => {
    mockReducedMotion(true);
    vi.useFakeTimers();
    render(<FakedTerminal />);

    // No timers advance, yet the full narrative and done state are visible
    expect(screen.getByText(/fix the login crash/i)).toBeInTheDocument();
    expect(screen.getByText(/done in 25/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /replay/i }),
    ).toBeInTheDocument();
  });

  it("component is clearly simulated and never claims a live capture", () => {
    mockReducedMotion(true);
    render(<FakedTerminal />);

    expect(screen.getByText(/simulated session/i)).toBeInTheDocument();
    expect(screen.queryByText(/live session capture/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/live capture/i)).not.toBeInTheDocument();
  });

  it("page exposes the terminal next to the hero with a stacked mobile layout", () => {
    mockReducedMotion(true);
    const { container } = render(<Home />);

    const install = container.querySelector("#install");
    expect(install).not.toBeNull();
    // Terminal region lives inside the install hero area
    expect(install!.querySelector("[data-terminal]")).not.toBeNull();
    // Hero copy is still present above the terminal
    expect(install!.textContent).toMatch(/npm install -g vicode-ai/i);
    // Stacked on mobile: vertical flex column that only rows on large screens
    const layout = install!.querySelector("[data-hero-layout]");
    expect(layout).not.toBeNull();
    expect(layout!.className).toMatch(/flex-col/);
    // No horizontal overflow from the terminal
    const terminal = install!.querySelector("[data-terminal]") as HTMLElement;
    expect(terminal.className).toMatch(/overflow-hidden|min-w-0/);
  });
});
