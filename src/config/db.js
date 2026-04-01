import 'dotenv/config';
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2, // leave 1 slot for pgAdmin login
});

export default pool;