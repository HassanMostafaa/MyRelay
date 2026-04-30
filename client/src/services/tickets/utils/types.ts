export type TicketStatus = "open" | "assigned" | "resolved" | "closed";

export type CreateTicketBody = {
  ticket: { subject: string; description: string };
  userId: string;
};
export type PublicTicket = {
  id: string;

  subject: string | null;
  description: string;

  status: TicketStatus;

  created_at: string;
  updated_at: string;
};
