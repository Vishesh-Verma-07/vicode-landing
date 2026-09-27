import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "font-sans" }),
  Geist_Mono: () => ({ variable: "font-mono" }),
}));

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
import { metadata } from "@/app/layout";
import { GITHUB_URL, NPM_URL } from "@/app/lib/links";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Home from "@/app/page";

/**
 * Page-level behavioral seam for the ViCode landing shell (issue #2).
 * Asserts only externally visible behavior a Terminal-first Developer can observe.
 */
describe("landing shell (issue #2)", () => {
  it("metadata names ViCode as a Terminal AI coding agent with install intent", () => {
    const title =
      typeof metadata.title === "string"
        ? metadata.title
        : // Metadata title can be string | TemplateString; stringify for assertion
          JSON.stringify(metadata.title);
    expect(title).toMatch(/ViCode/i);
    expect(title).toMatch(/Terminal AI coding agent/i);
    expect(title).toMatch(/install/i);
    expect(metadata.description).toMatch(/Terminal AI coding agent/i);
    expect(metadata.description).toMatch(/npm install -g vicode-ai/i);
  });

  it("navbar exposes logo, Install anchor, GitHub Star target, and npm target", () => {
    render(<Navbar />);
    expect(
      screen.getByRole("link", { name: /vicode home/i }),
    ).toBeInTheDocument();
    const install = screen.getByRole("link", { name: /install/i });
    expect(install).toHaveAttribute("href", "#install");
    const star = screen.getByRole("link", { name: /github.*star/i });
    expect(star).toHaveAttribute("href", GITHUB_URL);
    expect(star).toHaveAttribute("target", "_blank");
    const npm = screen.getByRole("link", { name: /npm/i });
    expect(npm).toHaveAttribute("href", NPM_URL);
    expect(npm).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("footer exposes MIT license, author Vishesh Verma, and GitHub/npm targets", () => {
    render(<Footer />);
    expect(screen.getByText(/MIT/i)).toBeInTheDocument();
    expect(screen.getByText(/Vishesh Verma/i)).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain(GITHUB_URL);
    expect(hrefs).toContain(NPM_URL);
  });

  it("page renders dark-only terminal shell with mono code typography and install anchor", () => {
    const { container } = render(<Home />);
    // Dark-only shell: near-black background token on the top-level wrapper
    const shell = container.firstElementChild as HTMLElement;
    expect(shell.className).toMatch(/bg-zinc-950|bg-black|bg-\[#09090b\]/);
    // Mono code typography must be present for terminal honesty
    expect(container.querySelector(".font-mono")).not.toBeNull();
    // Install anchor target for the navbar CTA
    expect(container.querySelector("#install")).not.toBeNull();
    // No light-mode styling leaks
    expect(container.innerHTML).not.toMatch(/bg-white|bg-zinc-50|dark:/);
  });
});
