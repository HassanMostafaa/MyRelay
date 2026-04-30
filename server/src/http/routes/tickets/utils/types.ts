export type TicketStatus = "open" | "assigned" | "resolved" | "closed";

export type Ticket = {
  id: string;

  created_by_user_id: string;
  assigned_agent_id: string | null;

  subject: string | null;
  description: string;

  status: TicketStatus;

  created_at: string;
  updated_at: string;

  resolved_at: string | null;
  closed_at: string | null;
};

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
