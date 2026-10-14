
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'
import dayjs from 'dayjs'

const ProductInfo = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`)
        setProduct(response.data) // 응답 데이터로 상태 업데이트
      } catch (error) {
        console.error('상품 상세 조회 에러:', error)
      }
    }
    fetchProduct()
  }, [id])

  return (
    <div className='product-info'>
      <h2>상품 정보</h2>
      {product ? (
        <div className='product-details'>
          <p>상품 ID: {product.id}</p>
          <p>상품명: {product.product_name}</p>
          <p>가격: {product.price}원</p>
          <p>등록일: {dayjs(product.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
      ) : (
        <p>상품 정보를 불러오는 중입니다...</p>
      )}

      <div className='edit-buttons'>
        <button onClick={() => navigate(`/products/update/${id}`)}>수정</button>
        <button onClick={async () => {
          if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
              await api.delete(`/products/${id}`)
              alert('상품이 삭제되었습니다.')
              navigate('/products')
            } catch (error) {
              console.error('상품 삭제 에러:', error)
              alert('상품 삭제 중 오류가 발생했습니다.')
            }
          }
        }}>삭제</button>
        <button onClick={() => navigate('/products')}>목록</button>
      </div>
    </div>
  )
}

export default ProductInfo