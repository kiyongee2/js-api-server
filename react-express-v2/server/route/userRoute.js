import * as controller from '../controller/userController.js';
import express from 'express';

const router = express.Router(); // 라우터 생성

// 사용자 조회 (username 기준) 라우트 - get 메서드 사용
router.get('/:username', controller.getUserByUsername);

// 사용자 조회 (ID 기준) 라우트 - get 메서드 사용
router.get('/id/:id', controller.getUserById);

// 사용자 추가 라우트 - post 메서드 사용
router.post('/', controller.addUser);

export default router; // 라우터 내보내기