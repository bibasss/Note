import { log } from "console";
import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "password",
  host: process.env.PG_HOST || "localhost",
  port: Number(process.env.PG_PORT) || 5432,
  database: process.env.PG_DATABASE || "testdb",
});

export async function connectDB() {
  try {
    await pool.connect();
  } catch (err) {
    console.error("error connection to PostgreSQL, database: {database}:", err);
    process.exit(1);
  }
}