import { createPageMetadata } from "@/src/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    page: "test",
    path: "/test",
  });
}

export default async function NextjsPage() {
  return (
    <div>
      <h1>TEST</h1>
    </div>
  );
}
