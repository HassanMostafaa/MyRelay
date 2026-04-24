"use client";

import { Languages } from "lucide-react";

import { useLangSwitcher } from "./utils/useLangSwitcher";
import { Button } from "@/src/components/button/Button";
import { LanguagesDDL } from "./languages-ddl/languagesDDL";

export const LangSwitcher = () => {
  const { availableLocales, isDropdown, locale, switchLocale, targetLocale } =
    useLangSwitcher();

  if (availableLocales.length < 2) return null;

  if (!isDropdown) {
    return (
      <Button
        className="border-0!"
        onClick={() => switchLocale(targetLocale ?? locale)}
      >
        <Languages size={16} /> {(targetLocale ?? locale).toUpperCase()}
      </Button>
    );
  }

  return <LanguagesDDL />;
};
