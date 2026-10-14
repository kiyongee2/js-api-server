// 비동기 처리를 위해 mysql2의 promise 버전을 임포트합니다.
// 비동기 - await 구문을 사용하여 데이터베이스 연결을 관리할 수 있습니다.
import mysql from 'mysql2/promise';

// 데이터베이스 연결 설정을 정의합니다.
const pool = mysql.createPool({
  host: 'localhost',
  user: 'jsuser',
  password: 'pwjs',
  database: 'tsdb',
  waitForConnections: true, // 연결 요청이 들어오면 대기하도록 설정합니다.
  connectionLimit: 10, // 최대 연결 수를 10으로 설정합니다.
  queueLimit: 0, // 대기열 제한을 0으로 설정하여 무제한 대기를 허용합니다.
});

// table은 mysql에서 products로 생성되어 있습니다.

// 데이터베이스 연결 풀을 내보냅니다.
export default pool;

/*create table products(
	id int auto_increment primary key,
    name varchar(20) not null,
    price int not null,
    description text,
    image varchar(255),
    created_at timestamp default current_timestamp
);*/

/*alter table products add column image varchar(255);*/

/*create table users(
	id int auto_increment primary key,
    username varchar(50) not null unique,
    password varchar(255) not null,
    email varchar(100) not null,
    role varchar(20) not null default 'user'
);*/

/*alter table users add column email varchar(100) not null;*/

/*create table orders(
	id int auto_increment primary key,
    user_id varchar(50) not null,
    product_id int not null,
    quantity int not null,
    total_price int not null,
    order_date date not null,
    foreign key (user_id) references users(username),
    foreign key (product_id) references products(id)
);*/