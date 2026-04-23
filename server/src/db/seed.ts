import { Pool } from "pg";
import bcrypt from "bcrypt";

export const dbConnectionString = process.env.DATABASE_URL;

if (!dbConnectionString) {
  throw new Error("DATABASE_URL is missing");
}

const pool = new Pool({
  connectionString: dbConnectionString,
});

async function seed() {
  const email = process.env.ADMIN_EMAIL;
  const username = process.env.ADMIN_USERNAME;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!email || !username || !plainPassword) {
    throw new Error("Admin env variables are missing");
  }

  const passwordHash = await bcrypt.hash(plainPassword, 12);

  await pool.query(
    `
  INSERT INTO users (email, username, password_hash, role)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (email) DO UPDATE
  SET 
    username = EXCLUDED.username,
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role
  `,
    [email, username, passwordHash, "admin"],
  );
  console.log("Admin user seeded with hashed password");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
