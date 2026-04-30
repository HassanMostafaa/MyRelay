import { routing, rtlLocales } from "@/i18n/routing";
import { getLocaleMessages } from "@/i18n/messages";
import { AuthInit } from "@/src/components/auth-init/AuthInit";
import { MainLayout } from "@/src/components/main-layout/MainLayout";
import { ThemeProvider } from "@/src/components/theme-switcher/ThemeProvider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function LocaleLayoutContent({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: string;
}>) {
  const rtl = rtlLocales.includes(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={getLocaleMessages(locale)}>
      <ThemeProvider />
      <AuthInit />
      <div dir={rtl ? "rtl" : "ltr"}>
        <MainLayout>{children}</MainLayout>
      </div>
    </NextIntlClientProvider>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <Suspense fallback={null}>
      <LocaleLayoutContent locale={locale}>{children}</LocaleLayoutContent>
    </Suspense>
  );
}
