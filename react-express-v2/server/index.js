import express from 'express';
import cors from 'cors';
import pool from './config/database.js';
import productRouter from './route/productRoute.js';
import userRouter from './route/userRoute.js';
import orderRouter from './route/orderRoute.js';

const app = express();

// CORS 설정 - 리엑트와 통신하기 위해 필요
app.use(cors({
  origin: 'http://localhost:5173', // 리엑트 앱이 실행되는 주소
}));

// 서버 포트 설정
const PORT = 8000;

// 데이터베이스 연결 설정 
const dbConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('데이터베이스가 연결되었습니다.');
    connection.release(); // 연결을 해제하여 풀에 반환합니다.
  } catch (error) {
    console.error('데이터베이스가 연결되지 않았습니다:', error);
  } 
};

dbConnection(); // 데이터베이스 연결 확인 함수 호출

// JSON 요청 본문을 파싱하기 위한 미들웨어 설정
app.use(express.json());

// 기본 라우트 설정
// http://localhost:8000
app.get('/', (req, res) => {
  res.send('<h2>MVC 패턴 기반 Node.js Express 서버</h2>');
});

// 상품 라우트 설정
app.use('/products', productRouter);

// 사용자 라우트 설정
app.use('/users', userRouter);

// 주문 라우트 설정
app.use('/orders', orderRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
