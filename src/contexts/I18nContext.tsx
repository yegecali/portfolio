import React, { createContext, useCallback, useContext, useState } from "react";
import type { LangCode, Locale } from "@/lib/i18n/types";
import { es } from "@/lib/i18n/es";
import { en } from "@/lib/i18n/en";

const LOCALES: Record<LangCode, Locale> = { es, en };
const STORAGE_KEY = "portfolio_lang";

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

  return (
    <I18nContext.Provider value={{ lang, setLang, t: LOCALES[lang] }}>
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
