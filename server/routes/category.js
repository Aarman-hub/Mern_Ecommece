import express from 'express';
import { createCategory, deleteCategory, getCategory, productsByCategory, updateCategory } from '../controllers/category.js';
import { isAdmin, requireSign } from '../middleware/auth.js';


const router = express.Router();


router.get('/categories', getCategory);
router.post('/category', requireSign, isAdmin, createCategory);
router.put('/category/:id',requireSign, isAdmin, updateCategory);
router.delete('/category/:id',requireSign, isAdmin, deleteCategory);
router.get('/product-by-category/:slug', productsByCategory);


export default router;