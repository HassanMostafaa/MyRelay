import { createPageMetadata } from "@/src/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    page: "security",
    path: "/security",
  });
}

export default async function NextjsPage() {
  return <div>protected security</div>;
}
