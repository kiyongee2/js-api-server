import * as repository from '../repository/userRepository.js';

// 사용자 조회 (username 기준) 서비스
export const getUserByUsername = async (username) => {
  // repository의 getUserByUsername 함수 호출
  return await repository.getUserByUsername(username);
}

// 사용자 추가 서비스
export const addUser = async (user) => {
  // repository의 addUser 함수 호출
  return await repository.addUser(user);
}

// 사용자 조회 (ID 기준) 서비스
export const getUserById = async (id) => {
  // repository의 getUserById 함수 호출
  return await repository.getUserById(id);
}