import { Playfair_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { getThemeScript } from "@/src/components/theme-switcher/utils/theme";

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
  return (
    <html
      suppressHydrationWarning
      lang="en"
      dir="ltr"
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
      <body>{children}</body>
    </html>
  );
}
