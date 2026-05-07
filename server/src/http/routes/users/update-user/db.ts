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
  const returningFields = `
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
  `;
  const values: unknown[] = [body.id];
  const setClauses: string[] = [];
  const hasOwnProperty = (key: keyof UpdateUserBody) =>
    Object.prototype.hasOwnProperty.call(body, key);
  const addSetClause = (column: string, value: unknown, cast?: string) => {
    values.push(value);

    const placeholder = `$${values.length}${cast ? `::${cast}` : ""}`;

    setClauses.push(`${column} = ${placeholder}`);
  };
  const normalizeText = (value: string | null | undefined) => {
    if (value === undefined) {
      return undefined;
    }

    if (value === null) {
      return null;
    }

    const normalized = value.trim();

    return normalized.length > 0 ? normalized : null;
  };

  if (hasOwnProperty("email")) {
    addSetClause("email", normalizeText(body.email));
  }

  if (hasOwnProperty("username")) {
    addSetClause("username", normalizeText(body.username));
  }

  if (hasOwnProperty("first_name")) {
    addSetClause("first_name", normalizeText(body.first_name));
  }

  if (hasOwnProperty("last_name")) {
    addSetClause("last_name", normalizeText(body.last_name));
  }

  if (hasOwnProperty("phone")) {
    addSetClause("phone", normalizeText(body.phone));
  }

  if (hasOwnProperty("country")) {
    addSetClause("country", normalizeText(body.country));
  }

  if (hasOwnProperty("city")) {
    addSetClause("city", normalizeText(body.city));
  }

  if (hasOwnProperty("date_of_birth")) {
    addSetClause("date_of_birth", normalizeText(body.date_of_birth));
  }

  if (hasOwnProperty("address")) {
    addSetClause("address", normalizeText(body.address));
  }

  if (hasOwnProperty("avatar_url")) {
    addSetClause("avatar_url", normalizeText(body.avatar_url));
  }

  if (canUpdateRole && body.role) {
    addSetClause("role", body.role, "user_role");
  }

  if (setClauses.length === 0) {
    const currentUserResult = await pool.query<PublicUser>(
      `
      SELECT
        ${returningFields}
      FROM users
      WHERE id = $1
      `,
      [body.id],
    );

    return currentUserResult.rows[0] ?? null;
  }

  setClauses.push("updated_at = NOW()");

  const result = await pool.query<PublicUser>(
    `
    UPDATE users
    SET
      ${setClauses.join(",\n      ")}
    WHERE id = $1
    RETURNING
      ${returningFields}
    `,
    values,
  );

  return result.rows[0] ?? null;
};
