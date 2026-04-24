import { pool } from "@/db/utils/pool";

type CheckUsernameParams = {
  username: string;
};

type CheckUsernameResult = {
  username: string | null;
  exists: boolean;
  available: boolean;
};

export const checkUsername = async ({
  username,
}: CheckUsernameParams): Promise<CheckUsernameResult> => {
  const result = await pool.query<{ username: string }>(
    `
    SELECT username
    FROM users
    WHERE LOWER(username) = LOWER($1)
    LIMIT 1
    `,
    [username],
  );

  const matchedUsername = result.rows[0]?.username ?? null;
  const exists = Boolean(matchedUsername);

  return {
    username: matchedUsername,
    exists,
    available: !exists,
  };
};
