import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById
} from '../controllers/orderController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE ORDER
router.post('/createOrder', verifyUser, createOrder);
// UPDATE ORDER
// GET ORDER ID
router.get('/getOrder/:id', verifyUser, getOrderById);
// GET ALL ORDER
router.get('/getAllOrders', verifyUser, getAllOrders);
// DELETE ORDER

export default router;
