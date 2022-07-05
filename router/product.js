import express from "express";
import {
    createProduct,
    deleteProduct,
    deleteProducts,
    getProduct,
    getProducts,
    updateProduct
} from "../controller/product.js";
import {admin} from "../middleware/authMiddleware.js";

const router = express.Router();


// 제품 불러오기
router.get('/', getProducts);

// 제품 불러오기(디테일)
router.get('/:id', getProduct);

// 제품 등록
router.post('/', admin, createProduct);

// 제품 수정
router.put('/:id', admin, updateProduct);

// 전체 삭제
router.delete('/',admin, deleteProducts);

// 디테일 삭제
router.delete('/:id',admin, deleteProduct);


export default router;