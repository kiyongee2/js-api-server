### 웹서버 만들기(DB 연동)
#### 프로젝트 제작
- Node js/JavaScript 설정 파일: package.json 생성
  npm init -y

- index.js 파일 생성
- Express 프레임워크 설치
  npm install express

- 서버 자동 실행  : nodemon 설치
  npm i nodemon
  package.json 설정
  "start": "nodemon index.js",
  실행 명령어 - nodemon index

### PostgreSQL 연동
#### 라이브러리 설치
- npm install pg

- 상품 테이블 생성
CREATE TABLE product (
    id          SERIAL PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    price       NUMERIC(10) NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- 상품 추가
insert into product(product_name, price) values('노트북', 12000000);

-- 상품 검색
select * from product;

### .env 환경
- npm install dotenv

- index.js
import 'dotenv/config';

// PostgreSQL 데이터베이스 연결 설정 (.env 환경변수 사용)
const db = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:     Number(process.env.DB_PORT),
});


