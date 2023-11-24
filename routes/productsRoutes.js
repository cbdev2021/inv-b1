import express from 'express';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductByUserId,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas para tipos de valor
router.post('/add-product', protect, addProduct);
router.put('/update-product/:id', protect, updateProduct);
router.delete('/delete-product/:id', protect, deleteProduct);
router.get('/get-product/:id', protect, getProduct);
router.get('/get-products/:idUsuario', protect, getProductByUserId);

export default router;
