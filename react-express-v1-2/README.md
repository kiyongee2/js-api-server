## 풀스택 개발(리엑트-Express)

### 1. 미리 만든 서버 폴더를 가져옴

### 2. client 폴더를 만들고 리엑트 설치
- npm create vite@latest .

### 3. 터미널 분할
- server 실행 : npx nodemon index
- client 실행 : npm run dev

### client에 라우터 설치
- npm install react-router-dom

### 클라이언트측 통신 - axios
- npm install axios
- api 폴더 하위에 api.js 작성
  // baseURL 설정: API 서버의 기본 URL을 지정
  const api = axios.create({
    baseURL: 'http://localhost:8000',
  })

### 서버 측 통신 - cors()
- npm install cors
  // CORS 설정 - 리엑트와 통신하기 위해 필요
  app.use(cors({
    origin: 'http://localhost:5137', 
  }));


### 상품 목록 데이터 가져오기 - rest api
api.get('/products')

### 상품 등록
api.post('/products', formData)

### 상품 정보
api.get(`/products/${id}`)

### 상품 삭제
api.delete(`/products/${id}`)

### 상품 수정
api.put(`/products/${id}`, formData)

