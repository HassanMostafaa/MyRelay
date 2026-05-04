import { pool } from "@/db/utils/pool";
import type { PublicUser } from "../utils/types";

export const deleteUserFromDB = async (
  userId: string,
): Promise<PublicUser | null> => {
  const result = await pool.query<PublicUser>(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
    `,
    [userId],
  );

  return result.rows[0] ?? null;
};
