import express from 'express';

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory
} from '../controllers/categoryController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post('/createCategory', verifyAdmin, createCategory);

// UPDATE
router.put('/updateCategory/:id', verifyAdmin, updateCategory);

//DELETE CATEGORY
router.delete('/deleteCategory/:id', verifyAdmin, deleteCategory);

// GET BY ID
router.get('/getCategory/:id', getCategory);

// GET ALL
router.get('/getCategories', getAllCategories);

export default router;
