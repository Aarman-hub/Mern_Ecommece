import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, productPhoto, updateProduct } from '../controllers/product.js';
import { isAdmin, requireSign } from '../middleware/auth.js';
import formidable from 'express-formidable';

const router = express.Router();


router.get('/products', getProducts);
router.post("/products", requireSign, isAdmin, formidable(), createProduct);
router.get("/product/:slug", getProduct);
router.get("/product/photo/:id", productPhoto)
router.put("/product/:id", requireSign, isAdmin, formidable(), updateProduct);
router.delete('/product/:id', requireSign, isAdmin, deleteProduct);


export default router;