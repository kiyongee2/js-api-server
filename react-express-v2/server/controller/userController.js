import * as service from '../service/userService.js';

// 사용자 조회 (username 기준) API
export const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await service.getUserByUsername(username); 
    if (user) {
      res.status(200).json(user); // 사용자 정보 반환
    } else {
      res.status(404).json({ message: 'User not found' }); // 사용자 없음
    } 
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // 서버 오류
  }
};

// 사용자 추가 API
export const addUser = async (req, res) => {
  const user = req.body; // 요청 본문에서 사용자 정보 추출
  try {
    const userId = await service.addUser(user); 
    res.status(201).json({ id: userId }); // 추가된 사용자 ID 반환
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // 서버 오류
  }
};

// 사용자 조회 (ID 기준) API  
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await service.getUserById(id);
    if (user) {
      res.status(200).json(user); // 사용자 정보 반환
    } else {
      res.status(404).json({ message: 'User not found' }); // 사용자 없음
    } 
  } catch (error) { 
    res.status(500).json({ message: 'Internal server error' }); // 서버 오류
  }
};
