import express from "express";
import {
    createProduct,
    deleteProduct,
    deleteProducts,
    getProduct,
    getProducts,
    updateProduct
} from "../controller/product.js";

const router = express.Router();


// 제품 불러오기
router.get('/', getProducts);

// 제품 불러오기(디테일)
router.get('/:id', getProduct);

// 제품 등록
router.post('/', createProduct);

// 제품 수정
router.put('/:id', updateProduct);

// 전체 삭제
router.delete('/', deleteProducts);

// 디테일 삭제
router.delete('/:id', deleteProduct);


export default router;