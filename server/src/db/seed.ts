import { Pool } from "pg";
import bcrypt from "bcrypt";
import { pool } from "./utils/pool";

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
  INSERT INTO users (email, username, password_hash, role, first_name, last_name)
  VALUES ($1, $2, $3, $4, $5, $6)
  ON CONFLICT (email) DO UPDATE
  SET 
    username = EXCLUDED.username,
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name
  `,
    [email, username, passwordHash, "admin", "Admin", "Admin_l"],
  );
  console.log("Admin user seeded with hashed password");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
