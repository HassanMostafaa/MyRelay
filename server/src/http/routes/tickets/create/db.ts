import { pool } from "@/db/utils/pool";
import type { CreateTicketBody, PublicTicket } from "../utils/types";

export const createTicketInDB = async (
  body: CreateTicketBody,
): Promise<PublicTicket | null> => {
  try {
    const subject =
      body.ticket.subject && body.ticket.subject.trim().length > 0
        ? body.ticket.subject.trim()
        : null;

    const description = body.ticket.description.trim();

    const result = await pool.query<PublicTicket>(
      `
      INSERT INTO tickets (
        created_by_user_id,
        subject,
        description
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [body.userId, subject, description],
    );

    return result.rows[0] ?? null;
  } catch (err) {
    console.error("createTicketInDB error:", err);
    return null;
  }
};
