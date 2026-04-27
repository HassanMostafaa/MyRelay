import { pool } from "@/db/utils/pool";
import type { User } from "../utils/types";

export const findUserByIdentifier = async (
  identifier: string,
): Promise<User | null> => {
  const result = await pool.query<User>(
    `
    SELECT id, email, username, password_hash, role
    FROM users
    WHERE LOWER(email) = LOWER($1)
       OR LOWER(username) = LOWER($1)
    LIMIT 1
    `,
    [identifier],
  );

  return result.rows[0] ?? null;
};
