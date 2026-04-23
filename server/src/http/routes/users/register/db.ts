// src/http/routes/register/db.ts
import { Pool } from "pg";
import type { PublicUser } from "../utils/types";
import { pool } from "@/db/utils/pool";

type CreateUserParams = {
  email: string;
  username: string;
  passwordHash: string;
};

export const createUser = async ({
  email,
  username,
  passwordHash,
}: CreateUserParams): Promise<PublicUser | undefined> => {
  const result = await pool.query<PublicUser>(
    `
    INSERT INTO users (email, username, password_hash)
    VALUES ($1, $2, $3)
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
      created_at,
      updated_at
    `,
    [email, username, passwordHash],
  );

  return result.rows[0];
};
