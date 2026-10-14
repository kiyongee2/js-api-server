import * as service from '../service/orderService.js';

// 모든 주문 조회 API
export const getAllOrders = async (req, res) => {
  try {
    const orders = await service.getAllOrders();
    res.status(200).json(orders); // 조회된 주문 목록 반환
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // 서버 오류
  }
};

// 주문 조회 (ID 기준) API
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await service.getOrderById(id);
    if (order) {
      res.status(200).json(order); // 주문 정보 반환
    } else {
      res.status(404).json({ message: 'Order not found' }); // 주문 없음
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // 서버 오류
  }
};

// 주문 추가 API
export const addOrder = async (req, res) => {
  const order = req.body; // 요청 본문에서 주문 정보 추출
  try {
    const orderId = await service.addOrder(order);
    res.status(201).json({ id: orderId }); // 추가된 주문 ID 반환
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // 서버 오류
  }
};