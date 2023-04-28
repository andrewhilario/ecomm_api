import express from 'express';
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser
} from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//UPDATE USER
router.put('/updateUser/:id', verifyUser, updateUser);
// GET ALL USERS
router.get('/getAllUser', getAllUser);
//GET USER BY ID
router.get('/getUser/:id', verifyUser, getUser);
// DELETE USER
router.delete('/deleteUser/:id', verifyUser, deleteUser);

export default router;
