import { pool } from "@/db/utils/pool";
import type { PublicUser, UserRole } from "../utils/types";

export type UpdateUserBody = {
  id: string;
  email?: string;
  username?: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  date_of_birth?: string | null;
  address?: string | null;
  avatar_url?: string | null;
  role?: UserRole;
};

export const updateUserInDB = async ({
  body,
  canUpdateRole,
}: {
  body: UpdateUserBody;
  canUpdateRole: boolean;
}): Promise<PublicUser | null> => {
  const result = await pool.query<PublicUser>(
    `
    UPDATE users
    SET
      email = COALESCE($2, email),
      username = COALESCE($3, username),
      first_name = COALESCE($4, first_name),
      last_name = COALESCE($5, last_name),
      phone = COALESCE($6, phone),
      country = COALESCE($7, country),
      city = COALESCE($8, city),
      date_of_birth = COALESCE($9, date_of_birth),
      address = COALESCE($10, address),
      avatar_url = COALESCE($11, avatar_url),
      role = CASE
        WHEN $12::boolean THEN COALESCE($13::user_role, role)
        ELSE role
      END
    WHERE id = $1
    RETURNING
      id,
      email,
      username,
      first_name,
      last_name,
      role,
      phone,
      email_verified,
      phone_verified,
      country,
      city,
      date_of_birth,
      address,
      avatar_url,
      created_at,
      updated_at
    `,
    [
      body.id,
      body.email?.trim() || null,
      body.username?.trim() || null,
      body.first_name ?? null,
      body.last_name ?? null,
      body.phone ?? null,
      body.country ?? null,
      body.city ?? null,
      body.date_of_birth ?? null,
      body.address ?? null,
      body.avatar_url ?? null,
      canUpdateRole,
      body.role ?? null,
    ],
  );

  return result.rows[0] ?? null;
};
