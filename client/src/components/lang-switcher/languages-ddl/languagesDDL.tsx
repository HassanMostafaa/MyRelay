"use client";

import { cn } from "@/src/lib/utils";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLangSwitcher } from "../utils/useLangSwitcher";

const localeLabels: Record<string, string> = {
  ar: "العربيه",
  en: "English",
  fr: "Français",
};

const getLocaleLabel = (nextLocale: string) => {
  const customLabel = localeLabels[nextLocale];

  if (customLabel) {
    return customLabel;
  }

  if (typeof Intl.DisplayNames !== "function") {
    return nextLocale.toUpperCase();
  }

  const languageNames = new Intl.DisplayNames([nextLocale], {
    type: "language",
  });

  return languageNames.of(nextLocale) ?? nextLocale.toUpperCase();
};

export const LanguagesDDL = () => {
  const { availableLocales, locale, switchLocale } = useLangSwitcher();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (nextLocale: string) => {
    setOpen(false);
    switchLocale(nextLocale);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((previous) => !previous)}
        className="inline-flex items-center gap-2 bg-background/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] transition-all hover:scale-102 active:scale-98"
      >
        <Languages size={16} />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute inset-e-0 top-full z-50 mt-2 min-w-56 border border-border bg-card backdrop-blur-lg p-2 shadow-sm"
        >
          <div className="flex flex-col gap-2">
            {availableLocales.map((nextLocale) => {
              const active = nextLocale === locale;

              return (
                <button
                  key={nextLocale}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => handleSelect(nextLocale)}
                  className={cn(
                    "inline-flex items-center justify-between gap-3 border border-transparent bg-background/65 px-3 py-2 text-start text-xs font-semibold text-foreground transition-all hover:border-border hover:bg-background",
                    active && "border-border bg-background",
                  )}
                >
                  <span>{getLocaleLabel(nextLocale)}</span>
                  {active ? <Check size={14} className="text-primary" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
