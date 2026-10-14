## 웹 서버 만들기
- Language: Javascript
- Node.js 설치
- package.json 생성: npm init -y

### Express 설치
- Express: Node.js 기반에서 동작하는 웹 서버 프레임워크
- 설치 : npm install express

### index.js 생성
- import express from 'express'
- 서버 코드 작성(PORT: 8000)
- 서버 실행 : node index.js
- 오류: ES6 문법 사용(import)
  package.json에 "type": "module"로 변경
- 서버 자동 재실행 : nodemon 설치
  npm i nodemon
- 서버 실행 : nodemon index

### Restful API 
- 테스트 툴: postman 설치
  .GET(조회) - app.get(url), req.json(data)
  .POST(생성) - app.post(url), req.body(data)
                app.use(express.json()) 미들웨어 필수 설치
  .PUT(수정) - app.put(url)
  .DELETE(삭제) - app.delete(url)

### DB - MySQL WorkBench
-- jsuser 계정 및 비밀번호 생성
create user jsuser@localhost identified by 'pwjs';
-- jsdb 생성
create database jsdb;
-- 권한 부여
grant all privileges on jsdb.* to jsuser@localhost;

-- product 테이블 생성
create table product(
	id int auto_increment primary key,
  product_name varchar(20) not null,
  price int not null,
  created_at timestamp default current_timestamp
);

-- 상품 추가
insert into product(product_name, price) values('노트북', 12000000);

-- 상품 검색
select * from product;

#### mysql 라이브러리 설치 - index.js
- 설치
  npm install mysql2
- import mysql 'mysql2'

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

## MVC 패턴 (Model View Controller)
### 데이터베이스 환경 구축
- config(환경 설정 - 디렉터리) -> database.js 생성
  index.js -> db 연결 설정

### 프로젝트 계층 구조
1. repository 계층(디렉터리) -> productRepository.js
2. service 계층 -> productService.js
3. controller 계층 -> productController.js
4. route 계층 -> productRoute.js