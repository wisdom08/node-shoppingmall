import asyncHandler from "express-async-handler";
import OrderModel from "../model/order.js";

const getOrders = asyncHandler(async(req, res) => {
    const orders = await OrderModel.find().populate("product");
    res.json({
        msg: "order total get",
        orders
    })
})

const getOrder = asyncHandler(async(req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.json({
        msg: "order detail get",
        order
    })
})

const makeOrder =  asyncHandler(async (req, res) => {

    const {product, quantity} = req.body;
    const newOrder = new OrderModel({
        product, quantity
    })

    const createOrder = await newOrder.save();

    res.json({
        msg: 'order post',
        order: createOrder
    })
})

export {getOrder, getOrders, makeOrder};