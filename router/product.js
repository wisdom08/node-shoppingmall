import express from "express";
import asyncHandler from "express-async-handler";
import productModel from '../model/product.js';

const router = express.Router();




// 제품 불러오기
router.get('/', asyncHandler(async (req, res) => {
    const products = await productModel.find();
    res.json({
        msg: "product total get",
        count: products.length,
        products
    })
}));

// 제품 불러오기(디테일)
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)
    res.json({
        msg: "product detail get",
        product
    })
}));

// 제품 등록
router.post('/', asyncHandler(async (req, res) => {
    console.log('@', req.body);
    const {title, price, category, brand, desc} = req.body;

    const newProduct = new productModel({
        title, price, category, brand, desc
    })

    const createProduct = await newProduct.save();

    res.json({
        msg: "product post",
        product: createProduct
    })
}));

// 제품 수정
router.put('/:id', asyncHandler(async (req, res) => {
    const {title, price, category, brand, desc} = req.body;
    const product = await productModel.findById(req.params.id);

    if (product) {
        product.title = title || product.title;
        product.price = price || product.price;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.desc = desc || product.desc;
    }

    const updatedProduct = await product.save();

    res.json({
        msg: "product put",
        product: updatedProduct
    });
}));

// 전체 삭제
router.delete('/', asyncHandler(async (req, res) => {
    await productModel.deleteMany();
    res.json({
        msg: "product delete"
    })
}));

// 디테일 삭제
router.delete('/:id', asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    console.log('@', product);
    if(product) {
        await product.remove();
        res.json({
            msg: "product detail delete",
        })
    } else {
        res.json({
            msg: `product not found by ${req.params.id}`
        })
    }


}));


export default router;