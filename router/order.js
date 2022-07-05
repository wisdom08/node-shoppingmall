import express from "express";
import {deleteOne, deleteAll, getMyOrder, getOrder, getOrders, makeOrder, updateCart} from "../controller/order.js";
import {admin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/myorder', protect, getMyOrder)

router.get('/', protect, admin, getOrders);

router.get('/:id', getOrder);

router.post('/', protect, makeOrder);

router.delete('/:id', protect, deleteOne);

router.delete('/', protect, deleteAll)

router.put('/:id', protect, updateCart)


export default router;