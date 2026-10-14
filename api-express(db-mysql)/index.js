//ES6 module 구문 (불러오기)
import express from 'express';  
import mysql from 'mysql2';

const app = express();
const PORT = 8000;

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'jsuser',
  password: 'pwjs',
  database: 'jsdb'
});

// 데이터베이스 연결
db.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err);
    return;
  }
  console.log('데이터베이스에 연결되었습니다.');
});

// 기본 주소 요청(root route) 처리
//http://localhost:8000/
app.get("/", (req, res) => {
  res.send("<h1>서버 메인페이지</h1>"); //클라이언트에 응답 보내기
})

// 상품 목록 페이지 요청 처리
// http://localhost:8000/proucts
app.get("/products", (req, res) => {
  //res.send("<h1>상품 목록 페이지</h1>");
  const sql = "SELECT * FROM product"; //SQL 쿼리문 작성
  db.query(sql, (err, results) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      res.status(500).send('서버 오류');
      return; //즉시 종료
    }
    console.log('쿼리 실행 결과:', results);
    res.json(results); //결과를 JSON 형식으로 클라이언트에 응답
  });
});

// POST 요청의 본문을 파싱하기 위한 미들웨어 설정
app.use(express.json());

// 상품 등록 페이지 요청 처리
// http://localhost:8000/product
app.post("/products", (req, res) => {
  //res.send("상품 등록 완료!!");
  const {productName, price} = req.body; //POST 요청 데이터 받기
  //'?' 위치에 값이 바인딩 됨(보안상 안전)
  const sql = "INSERT INTO product(product_name, price) VALUES(?, ?)";
  db.query(sql, [productName, price], (err, results) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      res.status(500).send('서버 오류');
      return; //즉시 종료
    }
    res.status(201).send("상품 등록 완료!!");
  })
});

// 상품 상세 페이지 요청 처리
// http://localhost:8000/product/1
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM product WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      res.status(500).send('서버 오류');
      return; //즉시 종료
    }
    if (results.length === 0) {
      res.status(404).send('상품을 찾을 수 없습니다.');
      return;
    }
    res.json(results); //결과를 JSON 형식으로 클라이언트에 응답
  });
});

// 상품 수정 페이지 요청 처리 - PUT 메서드
// http://localhost:8000/products/1  
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const {productName, price} = req.body;
  const sql = "UPDATE product SET product_name = ?, price = ? WHERE id = ?";
  db.query(sql, [productName, price, id], (err, results) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);  
      res.status(500).send('서버 오류');
      return; //즉시 종료
    }
    res.send("상품 수정 완료!!");
  });
});

// 상품 삭제 페이지 요청 처리 - DELETE 메서드
// http://localhost:8000/products/1  
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM product WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      res.status(500).send('서버 오류');
      return; //즉시 종료
    }
    res.send("상품 삭제 완료!!");
  });
});

//서버 실행
app.listen(PORT, () => {
  console.log(`서버가 실행되었습니다. http://localhost:${PORT}`);
})