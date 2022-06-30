import asyncHandler from "express-async-handler";
import productModel from "../model/product.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await productModel.find();
    res.json({
        msg: "product total get",
        count: products.length,
        products
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)
    res.json({
        msg: "product detail get",
        product
    })
})

const createProduct = asyncHandler(async (req, res) => {
    const {title, price, category, brand, desc} = req.body;

    const newProduct = new productModel({
        title, price, category, brand, desc
    })

    const createProduct = await newProduct.save();

    res.json({
        msg: "product post",
        product: createProduct
    })
});

const updateProduct = asyncHandler(async (req, res) => {
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
});

const deleteProducts = asyncHandler(async (req, res) => {
    await productModel.deleteMany();
    res.json({
        msg: "product delete"
    })
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    console.log('@', product);
    if (product) {
        await product.remove();
        res.json({
            msg: "product detail delete",
        })
    } else {
        res.json({
            msg: `product not found by ${req.params.id}`
        })
    }


});

export {getProducts, getProduct, createProduct, updateProduct, deleteProducts, deleteProduct}