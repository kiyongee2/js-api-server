import axios from 'axios'

// baseURL 설정: API 서버의 기본 URL을 지정
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

export default api

