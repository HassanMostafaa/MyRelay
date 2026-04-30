import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, routing } from "@/i18n/routing";

const nextIntlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const localePrefixedWellKnown = new RegExp(
    `^/(${routing.locales.join("|")})/\\.well-known/`,
  );

  if (localePrefixedWellKnown.test(url.pathname)) {
    url.pathname = url.pathname.replace(localePrefixedWellKnown, "/.well-known/");
    return NextResponse.rewrite(url);
  }

  // Handle root path
  if (url.pathname === "/" || url.pathname === `/${defaultLocale}`) {
    const response = nextIntlMiddleware(req);
    response.cookies.set("NEXT_LOCALE", defaultLocale, {
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // Otherwise, let next-intl handle locale detection / redirect
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_vercel|_next|trpc|favicon.ico).*)",
  ],
};
