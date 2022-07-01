import express from "express";
import {getOrder, getOrders, makeOrder} from "../controller/order.js";

const router = express.Router();


router.get('/', getOrders);

router.get('/:id', getOrder);

router.post('/',makeOrder);



export default router;