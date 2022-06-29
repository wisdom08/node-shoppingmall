import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();




// CRUD
router.get('/', asyncHandler(async (req, res) => {
    res.json({
        msg: "product total get"
    })
}));

router.get('/:id', asyncHandler(async (req, res) => {

    res.json({
        msg: "product detail get"
    })
}));


router.post('/', asyncHandler(async (req, res) => {
    const {name, price} = req.body;
    const newProduct = {
        name,
        price
    }
    res.json({
        msg: "product post",
        product: newProduct
    })
}));

router.put('/:id', asyncHandler(async (req, res) => {
    res.json({
        msg: "product put"
    })
}));


router.delete('/', asyncHandler(async (req, res) => {
    res.json({
        msg: "product delete"
    })
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    res.json({
        msg: "product detail delete"
    })
}));


export default router;