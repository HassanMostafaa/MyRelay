import { ProfileEditDetailsPage } from "@/src/page/Profile/Edit-Details/ProfileEditDetailsPage";
import { createPageMetadata } from "@/src/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    page: "profileEditDetails",
    path: "/profile/edit-details",
  });
}

export default function NextjsPage() {
  return <ProfileEditDetailsPage />;
}
