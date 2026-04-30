import { pool } from "@/db/utils/pool";
import type { PublicUser } from "../utils/types";

export const deleteUserFromDB = async (
  userId: string,
): Promise<PublicUser | null> => {
  const result = await pool.query<PublicUser>(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING
      id,
      email,
      username,
      role,
      phone,
      country,
      city,
      date_of_birth,
      address,
      email_verified,
      phone_verified,
      created_at,
      updated_at
    `,
    [userId],
  );

  return result.rows[0] ?? null;
};
