import * as controller from '../controller/orderController.js';
import express from 'express';

const router = express.Router(); // 라우터 생성

// 모든 주문 조회 라우트 - get 메서드 사용
router.get('/', controller.getAllOrders);

// 주문 추가 라우트 - post 메서드 사용
router.post('/', controller.addOrder);

// 주문 조회 (ID 기준) 라우트 - get 메서드 사용
router.get('/:id', controller.getOrderById);

export default router; // 라우터 내보내기
