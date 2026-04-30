import { Metadata } from "next";
import { defaultLocale, routing } from "@/i18n/routing";
import { getLocaleMessages } from "@/i18n/messages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type MetadataPageKey =
  | "home"
  | "about"
  | "login"
  | "register"
  | "newTicket"
  | "profile"
  | "security"
  | "test";

type CreatePageMetadataParams = {
  locale: string;
  page: MetadataPageKey;
  path?: string;
};

const getLocalizedPath = (locale: string, path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const isHomePage = path.length === 0 || normalizedPath === "/";

  if (locale === defaultLocale) {
    return isHomePage ? "/" : normalizedPath;
  }

  return isHomePage ? `/${locale}` : `/${locale}${normalizedPath}`;
};

const getOpenGraphLocale = (locale: string) => {
  switch (locale) {
    case "ar":
      return "ar_AE";
    case "fr":
      return "fr_FR";
    default:
      return "en_US";
  }
};

export const createPageMetadata = async ({
  locale,
  page,
  path = "",
}: CreatePageMetadataParams): Promise<Metadata> => {
  const resolvedLocale = routing.locales.includes(locale) ? locale : defaultLocale;
  const messages = getLocaleMessages(resolvedLocale);
  const { title, description } = messages.metadata.pages[page];
  const localizedPath = getLocalizedPath(resolvedLocale, path);
  const pageUrl = `${SITE_URL}${localizedPath}`;
  const languages = Object.fromEntries(
    routing.locales.map((currentLocale) => [
      currentLocale,
      `${SITE_URL}${getLocalizedPath(currentLocale, path)}`,
    ]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      images: "/brand/logo-emblem-large.png",
      url: pageUrl,
      locale: getOpenGraphLocale(resolvedLocale),
    },
    alternates: {
      canonical: pageUrl,
      languages,
    },
  };
};
