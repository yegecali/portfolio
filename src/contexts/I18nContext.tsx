import React, { createContext, useCallback, useContext, useState } from "react";
import type { LangCode, Locale } from "@/lib/i18n/types";
import { es } from "@/lib/i18n/es";
import { en } from "@/lib/i18n/en";
import { readAdminConfig } from "@/lib/adminOverrides";

const LOCALES: Record<LangCode, Locale> = { es, en };
const STORAGE_KEY = "portfolio_lang";

/** Apply any admin-saved overrides on top of the raw locale. */
function applyOverrides(locale: Locale): Locale {
  const cfg = readAdminConfig();
  const lang = locale.lang;
  const heroOvr = cfg.hero?.[lang] ?? {};
  const aboutOvr = cfg.about?.[lang] ?? {};

  const paragraphs = [...locale.about.paragraphs];
  if (aboutOvr.paragraph0 !== undefined) paragraphs[0] = aboutOvr.paragraph0;
  if (aboutOvr.paragraph1 !== undefined) paragraphs[1] = aboutOvr.paragraph1;
  if (aboutOvr.paragraph2 !== undefined) paragraphs[2] = aboutOvr.paragraph2;

  return {
    ...locale,
    hero: { ...locale.hero, ...heroOvr },
    about: {
      ...locale.about,
      paragraphs,
      closing: aboutOvr.closing ?? locale.about.closing,
    },
  };
}

function detectInitialLang(): LangCode {
  const stored = localStorage.getItem(STORAGE_KEY) as LangCode | null;
  if (stored && stored in LOCALES) return stored;
  const browser = navigator.language.slice(0, 2).toLowerCase();
  return browser === "es" ? "es" : "en";
}

// ── Context shape ─────────────────────────────────────────────────────────────

interface I18nContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: Locale;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<LangCode>(detectInitialLang);

  const setLang = useCallback((next: LangCode) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  }, []);

  const t = applyOverrides(LOCALES[lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useI18n = (): I18nContextType => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
};

export default I18nContext;
