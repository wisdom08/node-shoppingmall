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

    if (!order) {
        res.status(400)
        throw new Error('no order');
    }

    res.json({
        msg: "order detail get",
        order
    })
})

const makeOrder =  asyncHandler(async (req, res) => {

    const {product, quantity} = req.body;
    const newOrder = new OrderModel({
        product, quantity,
        user: req.user._id
    })

    const createOrder = await newOrder.save();

    res.json({
        msg: 'order post',
        order: createOrder
    })
})

const deleteOne = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await OrderModel.findByIdAndRemove(id);

    res.json({
        msg: `deleted ${id}`
    })
})

const deleteAll = asyncHandler(async (req, res) => {
    await OrderModel.deleteMany();
    res.json({
        msg: 'delete cart'
    })
});

const updateCart = asyncHandler(async (req, res) => {
    const {product, user, quantity} = req.body;
    const orderId = req.params.id;

    const order = await OrderModel.findById(orderId);
    if (order) {
        order.product = product || order.product;
        order.user = user || order.user;
        order.quantity = quantity || order.quantity;

        const updatedOrder = await order.save();
        res.json({
            msg: `updated ${orderId}`,
            order: updatedOrder,
        })
    } else {
        res.status(404);
        throw new Error('order not found');
    }
});

const getMyOrder = asyncHandler(async (req, res) => {
    const order = await OrderModel.find({user: req.user._id}).populate('product');

    if (!order) {
        return res.json({
            message: 'no order',
        })
    }

    res.json({
        orderInfo: order
    })
});

export {getOrder, getOrders, makeOrder, deleteOne, deleteAll, updateCart, getMyOrder};