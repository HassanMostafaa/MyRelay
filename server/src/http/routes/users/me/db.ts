// src/http/routes/users/utils/db.ts

import { pool } from "@/db/utils/pool";
import type { PublicUser } from "../utils/types";

export const getVerifiedUserById = async (
  id: string,
): Promise<PublicUser | null> => {
  const result = await pool.query<PublicUser>(
    `
    SELECT 
      id,
      email,
      username,
      role,
      phone,
      country,
      city,
      date_of_birth,
      address,
      created_at,
      updated_at
    FROM users
    WHERE id = $1
    LIMIT 1
    `,
    [id],
  );

  return result.rows[0] ?? null;
};
