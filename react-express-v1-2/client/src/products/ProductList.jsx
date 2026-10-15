import api from '../api/api'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const ProductList = () => {
  // 전체 상품 목록 상태 관리
  const [products, setProducts] = useState([]);

  // 검색 키워드 상태 관리
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    // fetchProducts 함수 정의: API 호출 및 상태 업데이트
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products')
        setProducts(response.data) // 응답 데이터로 상태 업데이트
      } catch (error) {
        console.error('상품 목록 조회 에러:', error)
      }
    }
    fetchProducts() // 상품 목록 조회 함수 호출
  }, []);

  // 검색 키워드에 따라 필터링된 상품 목록
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="product-list">
      {/* 검색 기능 */}
    <div className="search-bar">
      <input
        type="text"
        placeholder="상품명으로 검색"
        onChange={(e) => setSearchKeyword(e.target.value)} 
      />
    </div>

      {/* 상품 목록 테이블 */}
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품명</th>
            <th>가격</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <Link to={`/products/${product.id}`}>{product.product_name}</Link>
              </td>
              <td>{product.price}원</td>
              <td>{dayjs(product.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='btn-add'>
        <Link to="/products/new"><button>상품 등록</button></Link>
      </div>
    </div>
  )
}

export default ProductList