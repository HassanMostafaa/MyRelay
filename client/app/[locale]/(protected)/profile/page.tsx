import { ProfilePage } from "@/src/page/Profile/ProfilePage";
import { createPageMetadata } from "@/src/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    page: "profile",
    path: "/profile",
  });
}

export default async function NextjsPage() {
  return <ProfilePage />;
}
