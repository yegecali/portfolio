import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { api, API_BASE_URL } from "@/lib/api";

// ── Helpers ───────────────────────────────────────────────────────────────────

function mockFetch(
  status: number,
  body: unknown,
  init?: ResponseInit,
): void {
  const response = new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("api.getPortfolio", () => {
  beforeEach(() => {
    vi.stubGlobal("AbortSignal", {
      timeout: AbortSignal.timeout.bind(AbortSignal),
      any: AbortSignal.any.bind(AbortSignal),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls the correct URL", async () => {
    mockFetch(200, { lang: "en", personal: {}, hero: {}, about: {}, nav: [], experiences: [], projects: [], technologies: [], spoken_languages: [] });
    await api.getPortfolio("en");
    const [url, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit & { signal?: AbortSignal }];
    expect(url).toBe(`${API_BASE_URL}/api/portfolio/en`);
    expect(init.signal).toBeDefined();
    expect(init.signal?.aborted).toBe(false);
  });

  it("passes the caller's AbortSignal to fetch", async () => {
    mockFetch(200, { lang: "en", personal: {}, hero: {}, about: {}, nav: [], experiences: [], projects: [], technologies: [], spoken_languages: [] });
    const controller = new AbortController();
    await api.getPortfolio("en", controller.signal);
    const [, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit & { signal?: AbortSignal }];
    expect(init.signal).toBeDefined();
  });

  it("throws with status code on non-2xx response", async () => {
    mockFetch(500, {});
    await expect(api.getPortfolio("en")).rejects.toThrow("500");
  });

  it("includes backend detail in error message", async () => {
    mockFetch(422, { detail: "Validation failed" });
    await expect(api.getPortfolio("en")).rejects.toThrow("Validation failed");
  });

  it("throws AbortError when signal is already aborted", async () => {
    const controller = new AbortController();
    controller.abort();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(Object.assign(new Error("aborted"), { name: "AbortError" })),
    );

    await expect(api.getPortfolio("en", controller.signal)).rejects.toMatchObject({
      name: "AbortError",
    });
  });
});

describe("api.health", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns status and version on success", async () => {
    mockFetch(200, { status: "ok", version: "1.0.0" });
    const result = await api.health();
    expect(result).toEqual({ status: "ok", version: "1.0.0" });
  });

  it("throws on non-2xx response without detail", async () => {
    mockFetch(503, {});
    await expect(api.health()).rejects.toThrow("failed: 503");
  });
});
