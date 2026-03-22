import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useScrolled from "@/hooks/useScrolled";

describe("useScrolled", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when page has not scrolled past threshold", () => {
    const { result } = renderHook(() => useScrolled(20));
    expect(result.current).toBe(false);
  });

  it("returns true after scrolling past the threshold", () => {
    const { result } = renderHook(() => useScrolled(20));

    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 50 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });

  it("returns false when scrollY equals threshold (not strictly greater)", () => {
    const { result } = renderHook(() => useScrolled(20));

    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 20 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(false);
  });

  it("uses default threshold of 20", () => {
    const { result } = renderHook(() => useScrolled());

    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 21 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });

  it("removes scroll listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useScrolled(20));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
