
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 8000;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'jsuser',
  password: 'pwjs',
  database: 'jsdb'
});

// MySQL 연결 확인
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

// CORS 설정 - 리엑트와 통신하기 위해 필요
app.use(cors({
  origin: 'http://localhost:5173', // 리엑트 앱이 실행되는 주소
}));

//상품 목록 조회 라우트 설정
app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM product';
  db.query(sql, (err, results) => {
    if (err) {
      // 에러 발생 시 500 상태 코드와 에러 메시지 반환
      console.error('상품 조회 에러:', err);
      res.status(500).send('상품 조회 중 오류가 발생했습니다.');
      return; // 즉시 종료
    }
    res.json(results); // 성공 시 상품 목록을 JSON 형식으로 반환
  });
});

// JSON 요청 본문을 파싱하기 위한 미들웨어 설정
app.use(express.json());

// 상품 등록 페이지 요청 라우트 설정
app.post('/api/products', (req, res) => {
  const { productName, price } = req.body; // 요청 본문에서 상품 이름과 가격 추출
  const sql = 'INSERT INTO product (product_name, price) VALUES (?, ?)';
  db.query(sql, [productName, price], (err, results) => {
    if (err) {
      // 에러 발생 시 500 상태 코드와 에러 메시지 반환  
      console.error('상품 등록 에러:', err);
      res.status(500).send('상품 등록 중 오류가 발생했습니다.');
      return; // 즉시 종료
    }
    res.status(201).send('상품이 성공적으로 등록되었습니다.'); 
  });
});

// 상품 상세 조회 라우트 설정
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id; // URL 경로에서 상품 ID 추출
  const sql = 'SELECT * FROM product WHERE id = ?';
  db.query(sql, [productId], (err, results) => {
    if (err) {
      console.error('상품 조회 에러:', err);
      res.status(500).send('상품 조회 중 오류가 발생했습니다.');
      return;
    }
    res.json(results[0]);
  });
});

// 상품 삭제 라우트 설정
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id; // URL 경로에서 상품 ID 추출
  const sql = 'DELETE FROM product WHERE id = ?';
  db.query(sql, [productId], (err, results) => {
    if (err) {
      console.error('상품 삭제 에러:', err);
      res.status(500).send('상품 삭제 중 오류가 발생했습니다.');
      return;
    }
    res.send('상품이 성공적으로 삭제되었습니다.');
  });
});

// 상품 수정 라우트 설정
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id; // URL 경로에서 상품 ID 추출
  const { productName, price } = req.body; // 요청 본문에서 상품 이름과 가격 추출
  const sql = 'UPDATE product SET product_name = ?, price = ? WHERE id = ?';
  db.query(sql, [productName, price, productId], (err, results) => {
    if (err) {
      console.error('상품 수정 에러:', err);
      res.status(500).send('상품 수정 중 오류가 발생했습니다.');
      return;
    }
    res.send('상품이 성공적으로 수정되었습니다.');
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
