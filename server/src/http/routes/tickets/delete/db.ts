import { pool } from "@/db/utils/pool";
import type { PublicTicket } from "../utils/types";

export const deleteTicketFromDB = async ({
  ticketId,
  userId,
}: {
  ticketId: string;
  userId: string;
}): Promise<PublicTicket | null> => {
  const result = await pool.query<PublicTicket>(
    `
    DELETE FROM tickets
    WHERE id = $1
      AND created_by_user_id = $2
    RETURNING
      id,
      subject,
      description,
      status,
      created_at,
      updated_at
    `,
    [ticketId, userId],
  );

  return result.rows[0] ?? null;
};
