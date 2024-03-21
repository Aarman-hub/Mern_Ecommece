import express from "express";
import {
  createProduct,
  deleteProduct,
  filteredProducts,
  getProduct,
  getProducts,
  listProducts,
  productByCategory,
  productPhoto,
  productsCount,
  relatedProduct,
  searchProduct,
  updateProduct,
} from "../controllers/product.js";
import { isAdmin, requireSign } from "../middleware/auth.js";
import formidable from "express-formidable";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", requireSign, isAdmin, formidable(), createProduct);
router.get("/product/:slug", getProduct);
router.get("/product/photo/:id", productPhoto);
router.put("/product/:id", requireSign, isAdmin, formidable(), updateProduct);
router.delete("/product/:id", requireSign, isAdmin, deleteProduct);
router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", searchProduct);
router.get('/related-product/:productId/:categoryId', relatedProduct);
router.get('/product-by-category/:slug', productByCategory);

export default router;
