import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productcontroller.js";

const router = express.Router();

// ✅ CREATE PRODUCT
router.post('/', createProduct);

// ✅ GET ALL PRODUCTS
router.get('/', getProducts);

// ✅ GET SINGLE PRODUCT (IMPORTANT: always after /)
router.get('/:id', getProductById);

// ✅ UPDATE PRODUCT
router.put('/:id', updateProduct);

// ✅ DELETE PRODUCT
router.delete('/:id', deleteProduct);


export default router;