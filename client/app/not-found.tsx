import { defaultLocale } from "@/i18n/routing";
import { getLocaleMessages } from "@/i18n/messages";
import { AuthInit } from "@/src/components/auth-init/AuthInit";
import { MainLayout } from "@/src/components/main-layout/MainLayout";
import { NotFoundPage } from "@/src/page/NotFound/NotFoundPage";
import { ThemeProvider } from "@/src/components/theme-switcher/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";

function GlobalNotFoundContent() {
  return (
    <NextIntlClientProvider
      locale={defaultLocale}
      messages={getLocaleMessages(defaultLocale)}
    >
      <ThemeProvider />
      <AuthInit />
      <MainLayout>
        <NotFoundPage />
      </MainLayout>
    </NextIntlClientProvider>
  );
}

export default function GlobalNotFoundPage() {
  return (
    <Suspense fallback={null}>
      <GlobalNotFoundContent />
    </Suspense>
  );
}
