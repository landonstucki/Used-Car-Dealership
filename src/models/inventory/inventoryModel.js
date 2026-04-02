import pool from "../../config/db.js";

async function getSortedVehicles(sortBy = "make") {
  const validSorts = ["make", "price", "year", "category_name"];
  const safeSort = validSorts.includes(sortBy) ? sortBy : "make";

  const sql = `
    SELECT
      v.*,
      c.category_name,
      COALESCE(vi.image_path, v.image_path) AS image_path
    FROM vehicles v
    JOIN categories c
      ON v.category_id = c.category_id
    LEFT JOIN vehicle_images vi
      ON v.vehicle_id = vi.vehicle_id
      AND vi.is_primary = true
    ORDER BY ${safeSort}, v.model;
  `;

  const result = await pool.query(sql);
  return result.rows;
}

async function getVehicleById(slug) {
  const sql = `
    SELECT
      v.*,
      c.category_name,
      COALESCE(vi.image_path, v.image_path) AS image_path
    FROM vehicles v
    JOIN categories c
      ON v.category_id = c.category_id
    LEFT JOIN vehicle_images vi
      ON v.vehicle_id = vi.vehicle_id
      AND vi.is_primary = true
    WHERE v.slug = $1;
  `;

  const result = await pool.query(sql, [slug]);
  return result.rows[0] || null;
}

async function addVehicle({
  slug,
  year,
  make,
  model,
  price,
  mileage,
  color,
  category_id,
  image_path
}) {
  const sql = `
    INSERT INTO vehicles (
      slug,
      year,
      make,
      model,
      price,
      mileage,
      color,
      category_id,
      image_path
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *;
  `;

  const values = [
    slug,
    year,
    make,
    model,
    price,
    mileage,
    color,
    category_id,
    image_path
  ];

  const result = await pool.query(sql, values);
  return result.rows[0];
}

async function deleteVehicle(vehicle_id) {
  const sql = `
    DELETE FROM vehicles
    WHERE vehicle_id = $1
    RETURNING *;
  `;

  const result = await pool.query(sql, [vehicle_id]);
  return result.rows[0] || null;
}

export { getSortedVehicles, getVehicleById, addVehicle, deleteVehicle };