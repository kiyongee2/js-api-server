import axios from 'axios';

// axios 인스턴스 생성
// baseURL 설정: API 서버의 기본 URL을 지정
const api = axios.create({
  baseURL: 'http://localhost:8000',
})

export default api;