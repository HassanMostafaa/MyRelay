import { readFile } from "node:fs/promises";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const pool = new Pool({
  connectionString,
});

async function runSchema() {
  const sql = await readFile("src/db/schema.sql", "utf-8");

  await pool.query(sql);

  console.log("Schema executed successfully");
  await pool.end();
}

runSchema().catch((err) => {
  console.error(err);
  process.exit(1);
});
