import express from "express";
import {login, register, getInfo, updateUser, getAllUsers} from "../controller/user.js";
import {admin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// my profile 불러오기
router.get('/info', protect, getInfo)

router.post("/",register)

router.post("/login", login)

// 전체 유저 조회
router.get('/all', protect, admin, getAllUsers)

// 유저 정보 수정(전체 데이터)
router.put('/', protect, updateUser)

export default router;