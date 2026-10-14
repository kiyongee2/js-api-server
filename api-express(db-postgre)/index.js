//ES6 module 구문 (불러오기)
import 'dotenv/config'; // .env 파일 로드 (최상단에 위치해야 함)
import express from 'express';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 8000;

// PostgreSQL 데이터베이스 연결 설정 (.env 환경변수 사용)
const db = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:     Number(process.env.DB_PORT),
});

// POST 요청의 본문을 파싱하기 위한 미들웨어 설정
app.use(express.json());

// 기본 주소 요청(root route) 처리
//http://localhost:8000/
app.get("/", (req, res) => {
  res.send("<h1>서버 메인페이지</h1>"); //클라이언트에 응답 보내기
})

// 상품 목록 페이지 요청 처리
// http://localhost:8000/products
app.get("/products", async (req, res) => {
  try {
    const sql = "SELECT * FROM product"; //SQL 쿼리문 작성
    const result = await db.query(sql);
    console.log('쿼리 실행 결과:', result.rows);
    res.json(result.rows); //결과를 JSON 형식으로 클라이언트에 응답
  } catch (err) {
    console.error('쿼리 실행 오류:', err);
    res.status(500).send('서버 오류');
  }
});

// 상품 등록 페이지 요청 처리
// http://localhost:8000/products
app.post("/products", async (req, res) => {
  const {productName, price} = req.body; //POST 요청 데이터 받기
  //'$1', '$2' 위치에 값이 바인딩 됨(보안상 안전)
  const sql = "INSERT INTO product(product_name, price) VALUES($1, $2)";
  try {
    await db.query(sql, [productName, price]);
    res.status(201).send("상품 등록 완료!!");
  } catch (err) {
    console.error('쿼리 실행 오류:', err);
    res.status(500).send('서버 오류');
  }
});

// 상품 상세 페이지 요청 처리
// http://localhost:8000/products/1
app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM product WHERE id = $1";
  try {
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0) {
      res.status(404).send('상품을 찾을 수 없습니다.');
      return;
    }
    res.json(result.rows); //결과를 JSON 형식으로 클라이언트에 응답
  } catch (err) {
    console.error('쿼리 실행 오류:', err);
    res.status(500).send('서버 오류');
  }
});

// 상품 수정 페이지 요청 처리 - PUT 메서드
// http://localhost:8000/products/1
app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const {productName, price} = req.body;
  const sql = "UPDATE product SET product_name = $1, price = $2 WHERE id = $3";
  try {
    await db.query(sql, [productName, price, id]);
    res.send("상품 수정 완료!!");
  } catch (err) {
    console.error('쿼리 실행 오류:', err);
    res.status(500).send('서버 오류');
  }
});

// 상품 삭제 페이지 요청 처리 - DELETE 메서드
// http://localhost:8000/products/1
app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM product WHERE id = $1";
  try {
    await db.query(sql, [id]);
    res.send("상품 삭제 완료!!");
  } catch (err) {
    console.error('쿼리 실행 오류:', err);
    res.status(500).send('서버 오류');
  }
});

//서버 실행
app.listen(PORT, () => {
  console.log(`서버가 실행되었습니다. http://localhost:${PORT}`);
})