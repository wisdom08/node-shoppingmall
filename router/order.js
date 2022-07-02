import express from "express";
import {getOrder, getOrders, makeOrder} from "../controller/order.js";
import {admin, protect} from "../middleware/authMiddleware.js";
import asyncHandler from "express-async-handler";
import OrderModel from '../model/order.js'

const router = express.Router();

router.get('/myorder', protect, asyncHandler(async (req, res) => {
    // ordermodel 에서 접속한 사람의 정보 찾기
    const order = await OrderModel.find({user: req.user._id}).populate('product');

    console.log("=>(order.js:22) order", order);

    if (!order) {
        return res.json({
            message: 'no order',
        })
    }

    res.json({
        orderInfo: order
    })
}))

router.get('/', protect, admin, getOrders);

router.get('/:id', getOrder);

router.post('/', protect, makeOrder);

// todo 삭제

// todo 업데이트


export default router;