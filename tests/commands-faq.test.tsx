import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { existsSync } from "node:fs";
import path from "node:path";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "font-sans" }),
  Geist_Mono: () => ({ variable: "font-mono" }),
}));

import { metadata } from "@/app/layout";
import CommandsReference from "@/app/components/CommandsReference";
import Faq from "@/app/components/Faq";
import Home from "@/app/page";

/**
 * Page-level behavioral seam for issue #7 (Commands + FAQ + ship check).
 * Asserts only externally visible behavior a Terminal-first Developer can observe.
 * Command, shortcut, and FAQ facts trace to the ViCode README.
 */
describe("commands + faq + ship check (issue #7)", () => {
  it("slash-commands reference matches README behavior including first-word parsing", () => {
    const { container } = render(<CommandsReference />);
    const text = container.textContent ?? "";

    // All nine README slash commands are listed
    for (const command of [
      "/help",
      "/session",
      "/new",
      "/exit",
      "/model",
      "/skill",
      "/home",
      "/key",
      "/compact",
    ]) {
      expect(text).toMatch(new RegExp(command));
    }
    // First-word command parsing is taught honestly
    expect(screen.getByText(/first word/i)).toBeInTheDocument();
    expect(screen.getByText(/\/help me.*runs `\/help`/i)).toBeInTheDocument();
  });

  it("key-hint aids match README shortcuts", () => {
    const { container } = render(<CommandsReference />);
    const text = container.textContent ?? "";

    expect(text).toMatch(/Tab.*cycle|Cycle.*Tab/i);
    expect(text).toMatch(/y.*n.*approv|approv.*y.*n/i);
    expect(text).toMatch(/Esc.*cancel|cancel.*Esc/i);
  });

  it("FAQ answers README-sourced honesty questions", () => {
    const { container } = render(<Faq />);
    const text = container.textContent ?? "";

    // Cost display limits
    expect(text).toMatch(/eight.*models/i);
    expect(text).toMatch(/\$0\.00/);
    // Context meter warmth
    expect(text).toMatch(/warm.*cache|cache.*warm/i);
    expect(text).toMatch(/200k/);
    // Session pruning
    expect(text).toMatch(/cannot be deleted from the UI/i);
    expect(text).toMatch(/\.vicode\/sessions/);
    // Windows bash need
    expect(text).toMatch(/Git Bash or WSL/i);
  });

  it("share metadata and favicon are present with no template leftovers", () => {
    const title =
      typeof metadata.title === "string"
        ? metadata.title
        : JSON.stringify(metadata.title);
    expect(title).toMatch(/ViCode/i);
    expect(title).toMatch(/Terminal AI coding agent/i);
    expect(metadata.description).toMatch(/npm install -g vicode-ai/i);
    expect(JSON.stringify(metadata.openGraph)).toMatch(/website/);

    // Custom ViCode icon ships as the favicon
    expect(existsSync(path.resolve(__dirname, "../app/icon.svg"))).toBe(true);
    // Scaffold template assets are gone
    expect(existsSync(path.resolve(__dirname, "../app/favicon.ico"))).toBe(
      false,
    );
    for (const leftover of [
      "file.svg",
      "globe.svg",
      "next.svg",
      "vercel.svg",
      "window.svg",
    ]) {
      expect(existsSync(path.resolve(__dirname, "../public", leftover))).toBe(
        false,
      );
    }
  });

  it("page assembles commands and faq with no mobile-overflow regressions", () => {
    const { container } = render(<Home />);

    const commands = container.querySelector("#commands");
    expect(commands).not.toBeNull();
    expect(commands!.textContent).toMatch(/\/compact/);

    const faq = container.querySelector("#faq");
    expect(faq).not.toBeNull();
    expect(faq!.textContent).toMatch(/\$0\.00/);

    // All prior slices stay assembled
    for (const id of ["#install", "#modes", "#features", "#safety"]) {
      expect(container.querySelector(id)).not.toBeNull();
    }
    // Mobile guards: stacked layout tokens, no light-mode leaks
    expect(container.innerHTML).toMatch(/flex-col/);
    expect(container.innerHTML).toMatch(/min-w-0/);
    expect(container.innerHTML).not.toMatch(/bg-white|bg-zinc-50|dark:/);
  });
});
