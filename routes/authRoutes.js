import express from 'express';
import { login, register } from '../controllers/authController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/checkAuth', verifyToken, (req, res) => {
  res.send('You are authenticated');
});

router.get('/checkAuthUser/:id', verifyUser, (req, res, next) => {
  res.send('You are authenticated as a user and you can delete your account');
});
router.get('/checkAuthAdmin/:id', verifyAdmin, (req, res, next) => {
  res.send('You are authenticated as a admin and you can delete all accounts');
});

export default router;
