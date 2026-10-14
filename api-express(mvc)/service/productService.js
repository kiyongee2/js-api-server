import * as repository from "../repository/productRepository.js";

// 모든 상품 조회 서비스
export const getAllProducts = async () => {
  // repository의 getAllProducts 함수 호출
  return await repository.getAllProducts(); 
}

// 상품 추가 서비스
export const addProduct = async (product) => {
  // repository의 addProduct 함수 호출
  return await repository.addProduct(product);
}

// 상품 조회 (ID 기준) 서비스
export const getProductById = async (id) => {
  // repository의 getProductById 함수 호출
  return await repository.getProductById(id);
}

