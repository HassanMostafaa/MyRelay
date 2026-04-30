import { AboutPage } from "@/src/page/About/AboutPage";
import { createPageMetadata } from "@/src/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    page: "about",
    path: "/about",
  });
}

export default function NextjsAboutPage() {
  return <AboutPage />;
}
