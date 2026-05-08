import { MyTicketsPage } from "@/src/page/My-Tickets/MyTicketsPage";
import { createPageMetadata } from "@/src/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    page: "myTickets",
    path: "/my-tickets",
  });
}

export default function NextjsMyTicketsPage() {
  return <MyTicketsPage />;
}
