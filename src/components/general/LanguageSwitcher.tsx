import { useI18n } from "@/hooks/useI18n";
import type { LangCode } from "@/lib/i18n/types";

const OPTIONS: Array<{ code: LangCode; flag: string; short: string }> = [
  { code: "es", flag: "🇵🇪", short: "ES" },
  { code: "en", flag: "🇺🇸", short: "EN" },
];

const LanguageSwitcher = () => {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-0.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100/60 dark:bg-gray-800/60 p-0.5">
      {OPTIONS.map(({ code, flag, short }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-label={`Switch to ${code.toUpperCase()}`}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
              active
                ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <span className="text-sm leading-none">{flag}</span>
            <span className="hidden sm:inline">{short}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
