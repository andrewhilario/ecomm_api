import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts
} from '../controllers/productController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post('/createProduct', verifyAdmin, createProduct);
//UPDATE
router.put('/updateProduct/:id', verifyAdmin, updateProduct);
//DELETE
router.delete('/deleteProduct/:id', verifyAdmin, deleteProduct);
//GET
router.get('/getProduct/:id', getProduct);
//GET ALL
router.get('/getProducts', getAllProducts);

export default router;
