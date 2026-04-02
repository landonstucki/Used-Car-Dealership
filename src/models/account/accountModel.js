import pool from '../../config/db.js';

async function createUser({ name, email, password, role = 'user' }) {
  const sql = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, name, email, role, created_at;
  `;

  const values = [name, email, password, role];
  const result = await pool.query(sql, values);
  return result.rows[0];
}

async function getUserByEmail(email) {
  const sql = `
    SELECT user_id, name, email, password, role, created_at
    FROM users
    WHERE email = $1;
  `;

  const result = await pool.query(sql, [email]);
  return result.rows[0] || null;
}

async function getUserById(userId) {
  const sql = `
    SELECT user_id, name, email, role, created_at
    FROM users
    WHERE user_id = $1;
  `;

  const result = await pool.query(sql, [userId]);
  return result.rows[0] || null;
}

async function getAllUsers() {
  const sql = `
    SELECT user_id, name, email, role, created_at
    FROM users
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(sql);
  return result.rows;
}

async function updateUserRole(user_id, role) {
  const sql = `
    UPDATE users
    SET role = $1
    WHERE user_id = $2
    RETURNING user_id, name, email, role, created_at;
  `;

  const result = await pool.query(sql, [role, user_id]);
  return result.rows[0] || null;
}

async function deleteUser(user_id) {
  const sql = `
    DELETE FROM users
    WHERE user_id = $1
    RETURNING user_id, name, email, role;
  `;

  const result = await pool.query(sql, [user_id]);
  return result.rows[0] || null;
}


export { createUser, getUserByEmail, getUserById, getAllUsers, deleteUser, updateUserRole };