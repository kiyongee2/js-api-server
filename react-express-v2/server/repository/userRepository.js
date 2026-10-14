import pool from '../config/database.js';

// 사용자 조회 (username 기준)
export const getUserByUsername = async (username) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ?", 
    [username]
  );
  return rows[0]; // 조회된 사용자 반환 (없으면 undefined)
}

// 사용자 추가
export const addUser = async (user) => {
  const { username, password, email } = user; // 사용자 객체에서 속성 추출
  const [result] = await pool.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, password, email]
  );
  return result.insertId; // 추가된 사용자의 ID 반환
}

// 사용자 조회 (ID 기준)
export const getUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE id = ?", 
    [id]
  );
  return rows[0]; // 조회된 사용자 반환 (없으면 undefined)
}