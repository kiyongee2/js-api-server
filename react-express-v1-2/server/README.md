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
- 서버 자동 실행 : nodemon 설치 : npm i nodemon
  package.json에 "type": "module"로 변경

### mysql 라이브러리 설치
#### 설치
 - npm install mysql2

### mysql 설치 및 워크벤치 설정
- mysql 8.4 
- workbench 설치

### root 계정에서 jsuser 계정 및 db 만들기
-- jsuser 계정 생성
create user jsuser@localhost identified by 'pwjs';

-- jsdb 생성
create database jsdb;

-- 권한 부여
grant all privileges on jsdb.* to jsuser@localhost;

### jsdb에서 테이블 만들기
-- product 테이블 생성
create table product(
	id int auto_increment primary key,
    product_name varchar(20) not null,
    price int not null,
    created_at timestamp default current_timestamp
);

-- 상품 추가
insert into product(product_name, price) values('무선마우스', 30000);

-- 상품 검색
select * from product;

