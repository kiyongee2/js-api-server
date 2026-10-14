import pool from '../config/database.js';

// 모든 주문 조회
export const getAllOrders = async () => {
  const [rows] = await pool.query("SELECT * FROM orders");
  return rows;
}

// 주문 추가
export const addOrder = async (order) => {
  const { userId, productId, quantity, totalPrice, orderDate } = order;
  const [result] = await pool.query(
    "INSERT INTO orders (user_id, product_id, quantity, total_price, order_date) VALUES (?, ?, ?, ?, ?)",
    [userId, productId, quantity, totalPrice, orderDate]
  );
  return result.insertId; // 추가된 주문의 ID 반환
}

// 주문 조회 (ID 기준)
export const getOrderById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
  return rows[0]; // 조회된 주문 반환 (없으면 undefined)
}
