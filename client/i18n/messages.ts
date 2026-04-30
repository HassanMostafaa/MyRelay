import arMessages from "./messages/ar.json";
import enMessages from "./messages/en.json";
import frMessages from "./messages/fr.json";
import { defaultLocale } from "./routing";

export const localeMessages = {
  ar: arMessages,
  en: enMessages,
  fr: frMessages,
} as const;

export const getLocaleMessages = (locale: string) => {
  return localeMessages[
    (locale in localeMessages ? locale : defaultLocale) as keyof typeof localeMessages
  ];
};
