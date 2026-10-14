import express from 'express'
import mysql from 'mysql2'

const app = express(); // express 앱 생성
const PORT = 8000

// mysql 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'jsuser',
  password: 'pwjs',
  database: 'jsdb'
});

// mysql 연결
db.connect((err) => {
  if(err){
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Database가 연결되었습니다.');
})

// 기본 라우트 설정
app.get("/", (req, res) => {
  res.send("<h2>rest api - 상품</h2>");
});

// 상품 목록
app.get("/api/products", (req, res) => {
  const sql = 'SELECT * FROM product';
  db.query(sql, (err, results) => {
    if(err){
      console.log("상품 조회 에러: ", err);
      res.status(500).send("상품 조회 중 오류가 발생했습니다.");
      return;
    }
    res.json(results);  //json 형태로 응답
  });
});

// 요청 본문을 JSON 형태로 파싱하기 위한 미들웨어
app.use(express.json());

// 상품 등록
app.post("/api/products", (req, res) => {
  const {productName, price} = req.body; // 요청 본문에서 상품명과 가격 추출
  const sql = 'INSERT INTO product(product_name, price) VALUES (?, ?)';
  db.query(sql, [productName, price], (err, results) => {
    if(err){
      console.error("상품 등록 에러: ", err);
      res.status(500).send("상품 등록 중 오류가 발생했습니다.");
      return;
    }
    res.status(201).send("상품이 성공적으로 등록되었습니다.");
  });
});

// 상품 정보(상세보기)
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id; //URL 경로에서 상품 ID 추출
  const sql = 'SELECT * FROM product WHERE id = ?';
  db.query(sql, [productId], (err, results) => {
    if(err){
      console.log("상품 조회 에러: ", err);
      res.status(500).send("상품 조회 중 오류가 발생했습니다.");
      return;
    }
    res.json(results[0]);  //첫 번째 결과만 json 형태로 응답
  });
});

// 상품 삭제
app.delete("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "DELETE FROM product WHERE id = ?";
  db.query(sql, [productId], (err, results) => {
    if(err){
      console.error("상품 삭제 에러: ", err);
      res.send("상품 삭제 중 오류 발생!");
      return;
    }
    res.send("상품이 성공적으로 삭제되었습니다.");
  })
})

// 상품 수정
app.put("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const { productName, price } = req.body; // 요청 본문에서 상품명과 가격 추출
  const sql = "UPDATE product SET product_name = ?, price = ? WHERE id = ?";
  db.query(sql, [productName, price, productId], (err, results) => {
    if(err){
      console.error("상품 삭제 에러: ", err);
      res.send("상품 삭제 중 오류 발생!");
      return;
    }
    res.send("상품이 성공적으로 수정되었습니다.");
  });
})

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행중... http://localhost:${PORT}`);
});