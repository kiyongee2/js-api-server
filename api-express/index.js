import express from 'express';

const app = express();
const PORT = 8000;

// 요청 본문(JSON/form-data)을 파싱하기 위한 미들웨어
app.use(express.json());

// 모든 요청 로깅 - 요청 URL을 콘솔에 출력
app.use((req, res, next) => {
  console.log(`${req.url}`);
  next();
});

// 웹 브라우저 요청
// 루트 경로에 대한 GET 요청 처리 - http://localhost:8000/
app.get('/', (req, res) => {
  res.send('Hello Express!'); // 클라이언트에게 응답(문자열 전송)
});

// restful API - 상품 목록, 상품 등록
// http 메서드 - get, post, put, delete
// get 요청 - http://localhost:8000/products
app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: '노트북', price: 1000000 },
    { id: 2, name: '모니터', price: 300000 },
  ];
  res.json(products); // 클라이언트에게 JSON 형식으로 응답
});

// post 요청 - http://localhost:8000/products
// postman 도구로 테스트 가능
app.post('/products', (req, res) => {
  console.log('요청 본문:', req.body);
  res.send('상품 등록 완료');
});

//서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행중.. 포트: ${PORT}`);  
});