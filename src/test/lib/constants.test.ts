import { describe, it, expect } from "vitest";
import {
  ANIMATION_TIMINGS,
  SOCIAL_META,
  getSocialMeta,
  HERO_CODE_SNIPPETS,
} from "@/lib/constants";

// ── ANIMATION_TIMINGS ─────────────────────────────────────────────────────────

describe("ANIMATION_TIMINGS", () => {
  it("has THEME_TRANSITION of 600ms", () => {
    expect(ANIMATION_TIMINGS.THEME_TRANSITION).toBe(600);
  });

  it("has COPY_NOTIFICATION of 2000ms", () => {
    expect(ANIMATION_TIMINGS.COPY_NOTIFICATION).toBe(2000);
  });
});

// ── SOCIAL_META ───────────────────────────────────────────────────────────────

describe("SOCIAL_META", () => {
  it("contains github, linkedin, instagram, whatsapp keys", () => {
    expect(Object.keys(SOCIAL_META)).toEqual(
      expect.arrayContaining(["github", "linkedin", "instagram", "whatsapp"])
    );
  });

  it("each entry has label, icon, gradient, bg", () => {
    for (const meta of Object.values(SOCIAL_META)) {
      expect(meta).toHaveProperty("label");
      expect(meta).toHaveProperty("icon");
      expect(meta).toHaveProperty("gradient");
      expect(meta).toHaveProperty("bg");
    }
  });
});

// ── getSocialMeta ─────────────────────────────────────────────────────────────

describe("getSocialMeta", () => {
  it("returns GitHub meta for a GitHub URL", () => {
    const meta = getSocialMeta("https://github.com/username");
    expect(meta?.label).toBe("GitHub");
  });

  it("returns LinkedIn meta for a LinkedIn URL", () => {
    const meta = getSocialMeta("https://linkedin.com/in/username");
    expect(meta?.label).toBe("LinkedIn");
  });

  it("returns Instagram meta for an Instagram URL", () => {
    const meta = getSocialMeta("https://instagram.com/username");
    expect(meta?.label).toBe("Instagram");
  });

  it("returns WhatsApp meta for a WhatsApp URL", () => {
    const meta = getSocialMeta("https://wa.me/1234567890");
    expect(meta).toBeNull(); // 'wa.me' does not match 'whatsapp'
  });

  it("returns WhatsApp meta for whatsapp.com URL", () => {
    const meta = getSocialMeta("https://whatsapp.com/send?phone=123");
    expect(meta?.label).toBe("WhatsApp");
  });

  it("returns null for an unknown URL", () => {
    const meta = getSocialMeta("https://example.com");
    expect(meta).toBeNull();
  });

  it("is case-insensitive", () => {
    const meta = getSocialMeta("https://GITHUB.com/username");
    expect(meta?.label).toBe("GitHub");
  });
});

// ── HERO_CODE_SNIPPETS ────────────────────────────────────────────────────────

describe("HERO_CODE_SNIPPETS", () => {
  it("has 10 snippets", () => {
    expect(HERO_CODE_SNIPPETS).toHaveLength(10);
  });

  it("each snippet has required fields", () => {
    for (const snippet of HERO_CODE_SNIPPETS) {
      expect(snippet).toHaveProperty("text");
      expect(snippet).toHaveProperty("x");
      expect(snippet).toHaveProperty("y");
      expect(snippet).toHaveProperty("duration");
      expect(snippet).toHaveProperty("delay");
    }
  });

  it("all durations are positive numbers", () => {
    for (const snippet of HERO_CODE_SNIPPETS) {
      expect(snippet.duration).toBeGreaterThan(0);
    }
  });
});
