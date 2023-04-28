//Imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors());

//Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
};

//Middlewares

app.use(cookieParser());

app.use(express.json());

//Authentication Middleware
app.use('/api/auth', authRoutes);

// Product Middleware
app.use('/api/products', productRoutes);

//Category Middleware
app.use('/api/categories', categoryRoutes);

//User Middleware
app.use('/api/users', userRoutes);

//Order middleware
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || 'Something went wrong';

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack
  });
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection error');
});

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(4000, () => {
  console.log('Server on port 4000');
});
