"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigations";
import { routing } from "@/i18n/routing";

const getTargetLocale = (locale: string, availableLocales: readonly string[]) => {
  const currentLocaleIndex = availableLocales.indexOf(locale);

  if (currentLocaleIndex === -1) {
    return availableLocales[0] ?? locale;
  }

  return (
    availableLocales[(currentLocaleIndex + 1) % availableLocales.length] ?? locale
  );
};

export const useLangSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const availableLocales = routing.locales;
  const targetLocale =
    availableLocales.length === 2
      ? getTargetLocale(locale, availableLocales)
      : null;

  const switchLocale = (nextLocale: string) => {
    if (!nextLocale || nextLocale === locale) {
      return;
    }

    router.replace(pathname, { locale: nextLocale });
  };

  return {
    availableLocales,
    isDropdown: availableLocales.length > 2,
    locale,
    targetLocale,
    switchLocale,
  };
};
