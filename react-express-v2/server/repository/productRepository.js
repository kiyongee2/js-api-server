import pool from "../config/database.js";

// 모든 상품 조회
export const getAllProducts = async () => {
  // 데이터베이스에서 모든 상품을 조회하는 쿼리를 실행합니다.
  // 쿼리 결과에서 행 데이터를 추출합니다.
  const [rows] = await pool.query("SELECT * FROM products"); 
  return rows;
}

// 상품 추가
export const addProduct = async (product) => {
  const { name, price, description, image } = product; // 상품 객체에서 속성 추출
  const [result] = await pool.query(
    "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
    [name, price, description, image]
  );
  return result.insertId; // 추가된 상품의 ID 반환
} 

// 상품 조회 (ID 기준)
export const getProductById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0]; // 조회된 상품 반환 (없으면 undefined)
}
