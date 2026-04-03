import pool from '../../config/db.js';

const createContactMessage = async ({
  user_id = null,
  name,
  email,
  subject,
  message
}) => {
  const sql = `
    INSERT INTO contact_messages (
      user_id,
      name,
      email,
      subject,
      message
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    user_id,
    name,
    email,
    subject,
    message
  ]);

  return result.rows[0];
};

const getAllContactMessages = async () => {
  const sql = `
    SELECT *
    FROM contact_messages
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(sql);
  return result.rows;
};

const getContactMessageById = async (message_id) => {
  const sql = `
    SELECT *
    FROM contact_messages
    WHERE message_id = $1;
  `;

  const result = await pool.query(sql, [message_id]);
  return result.rows[0];
};

const getMessagesByUserId = async (user_id) => {
  const sql = `
    SELECT *
    FROM contact_messages
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(sql, [user_id]);
  return result.rows;
};

const respondToContactMessage = async ({
  message_id,
  response,
  responded_by,
  status = 'closed'
}) => {
  const sql = `
    UPDATE contact_messages
    SET
      response = $1,
      responded_by = $2,
      status = $3,
      responded_at = CURRENT_TIMESTAMP
    WHERE message_id = $4
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    response,
    responded_by,
    status,
    message_id
  ]);

  return result.rows[0];
};

export {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  getMessagesByUserId,
  respondToContactMessage
};