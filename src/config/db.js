import 'dotenv/config';
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 1, // leave 1 slot for pgAdmin login
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 10000
  
});

export default pool;