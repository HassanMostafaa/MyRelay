import { pool } from "@/db/utils/pool";
import type { PublicTicket } from "../../tickets/utils/types";

type GetMyTicketsFromDBInput = {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
};

type GetMyTicketsFromDBResult = {
  tickets: PublicTicket[];
  total: number;
  pageNumber: number;
  pageSize: number;
  pageCount: number;
};

export const getMyTicketsFromDB = async ({
  userId,
  pageNumber = 1,
  pageSize = 10,
}: GetMyTicketsFromDBInput): Promise<GetMyTicketsFromDBResult> => {
  const safePage = Math.max(1, pageNumber);
  const safePageSize = Math.min(Math.max(1, pageSize), 100);
  const offset = (safePage - 1) * safePageSize;

  const [ticketsResult, countResult] = await Promise.all([
    pool.query<PublicTicket>(
      `
        SELECT
          id,
          subject,
          description,
          status,
          created_at,
          updated_at
        FROM tickets
        WHERE created_by_user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
        OFFSET $3
      `,
      [userId, safePageSize, offset],
    ),

    pool.query<{ count: string }>(
      `
        SELECT COUNT(*)::text AS count
        FROM tickets
        WHERE created_by_user_id = $1
      `,
      [userId],
    ),
  ]);

  const total = Number(countResult.rows[0]?.count ?? 0);

  return {
    tickets: ticketsResult.rows,
    total,
    pageNumber: safePage,
    pageSize: safePageSize,
    pageCount: Math.ceil(total / safePageSize),
  };
};
