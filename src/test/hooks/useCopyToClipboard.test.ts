import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("initialises with copiedKey as null", () => {
    const { result } = renderHook(() =>
      useCopyToClipboard<"email" | "phone">()
    );
    expect(result.current.copiedKey).toBeNull();
  });

  it("sets copiedKey after successful copy", async () => {
    const { result } = renderHook(() =>
      useCopyToClipboard<"email" | "phone">()
    );

    await act(async () => {
      await result.current.copy("test@example.com", "email");
    });

    expect(result.current.copiedKey).toBe("email");
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "test@example.com"
    );
  });

  it("resets copiedKey to null after COPY_NOTIFICATION ms", async () => {
    const { result } = renderHook(() =>
      useCopyToClipboard<"email" | "phone">()
    );

    await act(async () => {
      await result.current.copy("test@example.com", "email");
    });

    expect(result.current.copiedKey).toBe("email");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copiedKey).toBeNull();
  });

  it("shows alert on copy failure", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("denied")),
      },
    });
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { result } = renderHook(() => useCopyToClipboard<string>());

    await act(async () => {
      await result.current.copy("text", "key");
    });

    expect(alertSpy).toHaveBeenCalledWith("No se pudo copiar");
    expect(result.current.copiedKey).toBeNull();
  });
});
