import pool from '../../config/db.js';

async function createServiceRequest({ user_id, vehicle_id, service_type, description }) {
  const sql = `
    INSERT INTO service_requests (user_id, vehicle_id, service_type, description, status)
    VALUES ($1, $2, $3, $4, 'Submitted')
    RETURNING *;
  `;

  const values = [user_id, vehicle_id, service_type, description];
  const result = await pool.query(sql, values);
  return result.rows[0];
}

async function getServiceRequestsByUserId(userId) {
  const sql = `
    SELECT
      sr.*,
      v.make,
      v.model,
      v.year,
      v.slug
    FROM service_requests sr
    JOIN vehicles v
      ON sr.vehicle_id = v.vehicle_id
    WHERE sr.user_id = $1
    ORDER BY sr.created_at DESC;
  `;

  const result = await pool.query(sql, [userId]);
  return result.rows;
}

async function getAllServiceRequests() {
  const sql = `
    SELECT
      sr.*,
      u.name AS user_name,
      u.email,
      v.make,
      v.model,
      v.year,
      v.slug
    FROM service_requests sr
    JOIN users u
      ON sr.user_id = u.user_id
    JOIN vehicles v
      ON sr.vehicle_id = v.vehicle_id
    ORDER BY sr.created_at DESC;
  `;

  const result = await pool.query(sql);
  return result.rows;
}

async function updateServiceRequest(requestId, { status, admin_notes }) {
  const sql = `
    UPDATE service_requests
    SET status = $1,
        admin_notes = $2,
        updated_at = CURRENT_TIMESTAMP
    WHERE request_id = $3
    RETURNING *;
  `;

  const values = [status, admin_notes, requestId];
  const result = await pool.query(sql, values);
  return result.rows[0] || null;
}

export {
  createServiceRequest,
  getServiceRequestsByUserId,
  getAllServiceRequests,
  updateServiceRequest
};