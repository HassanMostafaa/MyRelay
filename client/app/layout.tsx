import { Playfair_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/src/components/main-layout/MainLayout";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { rtlLocales } from "@/i18n/routing";
import { cn } from "@/src/lib/utils";
import { ThemeProvider } from "@/src/components/theme-switcher/ThemeProvider";
import { getThemeScript } from "@/src/components/theme-switcher/utils/theme";
import { AuthInit } from "@/src/components/auth-init/AuthInit";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const rtl = rtlLocales.includes(locale);

  return (
    <html
      suppressHydrationWarning
      lang="en"
      dir={rtl ? "rtl" : "ltr"}
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        ibmPlexSans.variable,
        playfairDisplayHeading.variable,
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider />
          <AuthInit />
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
