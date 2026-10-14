import * as controller from "../controller/productController.js";
import express from "express";

const router = express.Router(); // 라우터 생성

// 모든 상품 조회 라우트 - get 메서드 사용
router.get("/", controller.getAllProducts);

// 상품 추가 라우트 - post 메서드 사용
router.post("/", controller.addProduct);

// 상품 조회 (ID 기준) 라우트 - get 메서드 사용
router.get("/:id", controller.getProductById);

export default router;

