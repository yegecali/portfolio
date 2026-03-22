import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useActiveSection from "@/hooks/useActiveSection";

// ── IntersectionObserver mock that acts as a real constructor ─────────────────

type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

const observerInstances: MockIntersectionObserver[] = [];

class MockIntersectionObserver {
  private cb: IOCallback;
  observed = new Set<Element>();

  constructor(cb: IOCallback) {
    this.cb = cb;
    observerInstances.push(this);
  }

  observe(el: Element) {
    this.observed.add(el);
  }
  unobserve(el: Element) {
    this.observed.delete(el);
  }
  disconnect() {
    this.observed.clear();
  }
  takeRecords() { return []; }

  /** Test helper: simulate an intersection entry. */
  trigger(el: Element, ratio: number) {
    this.cb([{ target: el, intersectionRatio: ratio } as IntersectionObserverEntry]);
  }
}

beforeEach(() => {
  observerInstances.length = 0;
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.stubGlobal("IntersectionObserver", class {
    observe = vi.fn(); unobserve = vi.fn(); disconnect = vi.fn(); takeRecords = vi.fn(() => []);
  });
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("useActiveSection", () => {
  it("initialises with the first id", () => {
    const { result } = renderHook(() => useActiveSection(["hero", "about"]));
    expect(result.current).toBe("hero");
  });

  it("returns empty string when ids array is empty", () => {
    const { result } = renderHook(() => useActiveSection([]));
    expect(result.current).toBe("");
  });

  it("switches to the section with the highest ratio", () => {
    const hero = document.createElement("div");
    hero.id = "hero";
    const about = document.createElement("div");
    about.id = "about";
    document.body.appendChild(hero);
    document.body.appendChild(about);

    const { result } = renderHook(() => useActiveSection(["hero", "about"]));

    // Each element gets its own observer instance
    act(() => {
      for (const inst of observerInstances) {
        if (inst.observed.has(hero)) inst.trigger(hero, 0.2);
        if (inst.observed.has(about)) inst.trigger(about, 0.8);
      }
    });

    expect(result.current).toBe("about");

    document.body.removeChild(hero);
    document.body.removeChild(about);
  });

  it("does not change active when all ratios are 0", () => {
    const hero = document.createElement("div");
    hero.id = "hero";
    document.body.appendChild(hero);

    const { result } = renderHook(() => useActiveSection(["hero", "about"]));

    act(() => {
      for (const inst of observerInstances) {
        if (inst.observed.has(hero)) inst.trigger(hero, 0);
      }
    });

    // No section with ratio > 0, active remains initial "hero"
    expect(result.current).toBe("hero");

    document.body.removeChild(hero);
  });
});
