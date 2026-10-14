import * as service from "../service/productService.js";

// 모든 상품 조회 컨트롤러
export const getAllProducts = async (req, res) => {
  const products = await service.getAllProducts();  
  res.status(200).json(products); // 조회된 상품 데이터를 JSON 형식으로 응답
}

// 상품 추가 컨트롤러
export const addProduct = async (req, res) => {
  const product = req.body; // 요청 본문에서 상품 데이터 추출
  const insertId = await service.addProduct(product);  

  // 추가된 상품의 ID를 JSON 형식으로 응답
  res.status(201).json({ 
    message: "상품이 추가되었습니다.", 
    productId: insertId 
  }); 
}

// 상품 조회 (ID 기준) 컨트롤러
export const getProductById = async (req, res) => {
  const { id } = req.params; // URL 경로에서 상품 ID 추출
  const product = await service.getProductById(id);

  if (!product) {
    return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
  }

  res.status(200).json(product);
};