import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'

const UpdateProduct = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    productName: '',
    price: ''
  })
  const { productName, price } = formData
  const navigate = useNavigate()

  // 컴포넌트가 마운트될 때 상품 정보를 조회하여 폼에 초기값 설정
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`)
        setFormData({
          productName: response.data.product_name,
          price: response.data.price
        })
      } catch (error) {
        console.error('상품 조회 에러:', error)
      }
    }
    fetchProduct()
  }, [id])

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/products/${id}`, formData)
      alert('상품이 성공적으로 수정되었습니다.')
      navigate(`/products/${id}`)
    } catch (error) {
      console.error('상품 수정 에러:', error)
      alert('상품 수정 중 오류가 발생했습니다.')
    }
  }

  const handleCancel = () => {
    setFormData({
      productName: '',
      price: ''
    })
  }

  return (
    <div className='update-product'>
      <h2>상품 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">상품명</label>
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">가격</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">수정</button>
        <button 
          type="button" 
          onClick={handleCancel}
          style={{background: '#aaa', color: '#fff'}}
        >
          취소
        </button>
      </form>
    </div>
  )
}

export default UpdateProduct
