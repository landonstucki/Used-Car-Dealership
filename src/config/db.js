import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

console.log('DB_URL exists:', !!process.env.DB_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;