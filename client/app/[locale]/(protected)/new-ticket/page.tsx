import { NewTicketPage } from "@/src/page/New-Ticket/NewTicketPage";
import { createPageMetadata } from "@/src/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    page: "newTicket",
    path: "/new-ticket",
  });
}

export default async function NextjsPage() {
  return <NewTicketPage />;
}
