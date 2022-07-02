import express from "express";
import {login, register, getInfo} from "../controller/user.js";
import asyncHandler from "express-async-handler";
import {admin, protect} from "../middleware/authMiddleware.js";
import UserModel from '../model/user.js';

const router = express.Router();

// my profile 불러오기
router.get('/info', protect, getInfo)

router.post("/",register)

router.post("/login", login)

router.get('/all', protect, admin, asyncHandler(async (req, res) => {
    const users = await UserModel.find();
    res.json(users)
}))



export default router;