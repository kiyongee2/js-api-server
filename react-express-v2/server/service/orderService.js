import * as repository from '../repository/orderRepository.js';

// 모든 주문 조회 서비스
export const getAllOrders = async () => {
  // repository의 getAllOrders 함수 호출
  return await repository.getAllOrders();
}

// 주문 추가 서비스
export const addOrder = async (order) => {
  // repository의 addOrder 함수 호출
  return await repository.addOrder(order);
}

// 주문 조회 (ID 기준) 서비스
export const getOrderById = async (id) => {
  // repository의 getOrderById 함수 호출
  return await repository.getOrderById(id);
}