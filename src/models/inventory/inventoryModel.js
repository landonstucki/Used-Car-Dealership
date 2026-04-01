import pool from "../../config/db.js";

async function getSortedVehicles(sortBy = "make") {
  const validSorts = ["make", "price", "year", "category_name"];
  const safeSort = validSorts.includes(sortBy) ? sortBy : "make";

  const sql = `
    SELECT v.*, c.category_name
    FROM vehicles v
    JOIN categories c
      ON v.category_id = c.category_id
    ORDER BY ${safeSort}, v.model;
  `;

  const result = await pool.query(sql);
  return result.rows;
}

async function getVehicleById(slug) {
  const sql = `
    SELECT v.*, c.category_name
    FROM vehicles v
    JOIN categories c
      ON v.category_id = c.category_id
    WHERE v.slug = $1;
  `;

  const result = await pool.query(sql, [slug]);
  return result.rows[0] || null;
}

export { getSortedVehicles, getVehicleById };