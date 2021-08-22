import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/orderRouter.js'


import {notFound, errorHandler } from './middlewareError/customError.js'

dotenv.config();
connectDB();
const app = express();

app.use(express.json())
 
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use(notFound)
app.use(errorHandler)
 
const port = process.env.PORT || 5000;
















app.listen(port, () => console.log(`Server running on port ${port} 🔥`));