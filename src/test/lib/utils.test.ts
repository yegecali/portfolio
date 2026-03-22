import { describe, it, expect, vi, beforeEach } from "vitest";
import { mergeClasses, copyTextToClipboard, scrollToSection } from "@/lib/utils";

// ── mergeClasses ──────────────────────────────────────────────────────────────

describe("mergeClasses", () => {
  it("joins multiple class strings", () => {
    expect(mergeClasses("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(mergeClasses("a", undefined, false, "b")).toBe("a b");
  });

  it("returns empty string when all values are falsy", () => {
    expect(mergeClasses(undefined, false)).toBe("");
  });

  it("handles a single class", () => {
    expect(mergeClasses("only")).toBe("only");
  });
});

// ── copyTextToClipboard ───────────────────────────────────────────────────────

describe("copyTextToClipboard", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("calls navigator.clipboard.writeText with the provided text", async () => {
    await copyTextToClipboard("hello");
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("throws when clipboard API is not available", async () => {
    // @ts-expect-error deliberately removing clipboard
    delete navigator.clipboard;
    await expect(copyTextToClipboard("x")).rejects.toThrow(
      "Clipboard API not available"
    );
  });
});

// ── scrollToSection ───────────────────────────────────────────────────────────

describe("scrollToSection", () => {
  it("strips leading # and calls scrollIntoView", () => {
    const el = document.createElement("div");
    el.id = "about";
    document.body.appendChild(el);
    const spy = vi.spyOn(el, "scrollIntoView");

    scrollToSection("#about");

    expect(spy).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("works with id without # prefix", () => {
    const el = document.createElement("div");
    el.id = "skills";
    document.body.appendChild(el);
    const spy = vi.spyOn(el, "scrollIntoView");

    scrollToSection("skills");

    expect(spy).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("does nothing when element is not found", () => {
    expect(() => scrollToSection("#nonexistent")).not.toThrow();
  });
});
