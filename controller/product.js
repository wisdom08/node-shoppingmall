import asyncHandler from "express-async-handler";
import ProductModel from "../model/product.js";

const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const count = await ProductModel.countDocuments({...keyword});

    const products = await ProductModel.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    ;

    res.json({
        msg: "product total get",
        count: products.length,
        products,
        page,
        pages: Math.ceil(count / pageSize),
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('no product');
    }

    res.json({
        msg: "product detail get",
        product
    });
})

const createProduct = asyncHandler(async (req, res) => {
    const {title, price, category, brand, desc} = req.body;

    const newProduct = new ProductModel({
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
    const product = await ProductModel.findById(req.params.id);

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
    await ProductModel.deleteMany();
    res.json({
        msg: "product delete"
    })
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
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