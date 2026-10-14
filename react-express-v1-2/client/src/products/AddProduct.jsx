
import { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  // const [productName, setProductName] = useState('')
  // const [price, setPrice] = useState('')
  const [formData, setFormData] = useState({
    productName: '',
    price: ''
  })
  // formData에서 productName과 price 추출
  const { productName, price } = formData
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    // 입력 필드의 name과 value 추출
    const { name, value } = e.target
    // formData의 해당 필드 업데이트
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // 폼 제출 시 페이지 새로고침 방지
    try {
      // 상품 등록 API 호출
      await api.post('/products', formData)
      alert('상품이 성공적으로 등록되었습니다.')
      navigate('/products') // 상품 목록 페이지로 이동
    } catch (error) {
      console.error('상품 등록 에러:', error)
      alert('상품 등록 중 오류가 발생했습니다.')
    }
  } 
  // 취소 버튼 클릭시 입력상자 초기화
  const handleCancel = () => {
    setFormData({
      productName: '',
      price: ''
    })
  }

  return (
    <div className='add-product'>
      <h2>상품 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">상품명</label>
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={handleInputChange}
            placeholder='상품명을 입력하세요'
          />
        </div>
        <div>
          <label htmlFor="price">가격</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
            placeholder='가격을 입력하세요'
          />
        </div>
        <button type="submit">등록</button>
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

export default AddProduct