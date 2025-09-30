// /api/src/db.ts

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT || "5432"),
  user: process.env.PG_USER || "traceroots",
  password: process.env.PG_PASSWORD || "secret",
  database: process.env.PG_DB || "tracedb",
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
